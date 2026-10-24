/**
 * Quote request endpoint: POST /ajanlatkeres (form on www.nhcargo.hu/kapcsolat/).
 *
 * Validates and cleans the submission on the server, filters spam (honeypot,
 * fill-in time), limits submissions per IP, then sends it as a plain-text email
 * through the company's Microsoft 365 (Microsoft Graph sendMail) to MAIL_TO, with
 * the visitor as Reply-To. Nothing is stored here and no personal data is logged;
 * the message only exists in the mailbox.
 *
 * Environment (see M365_BEALLITAS.md):
 *   MS_TENANT_ID, MS_CLIENT_ID, MS_CLIENT_SECRET – Entra app; send right only for MAIL_SENDER
 *   MAIL_SENDER – mailbox the email is sent from (info@nhcargo.hu)
 *   MAIL_TO     – recipient(s), comma-separated (default: MAIL_SENDER)
 */

const MAX_BODY_BYTES = 20 * 1024;
/** Submissions faster than this after the page loaded are treated as bots. */
const MIN_FILL_MS = 3000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

const config = {
  tenant: process.env.MS_TENANT_ID?.trim(),
  clientId: process.env.MS_CLIENT_ID?.trim(),
  clientSecret: process.env.MS_CLIENT_SECRET?.trim(),
  sender: process.env.MAIL_SENDER?.trim(),
  to: (process.env.MAIL_TO || process.env.MAIL_SENDER || '')
    .split(',')
    .map((a) => a.trim())
    .filter(Boolean),
  // Overridable for local tests against a mock server
  loginBase: process.env.MS_LOGIN_BASE || 'https://login.microsoftonline.com',
  graphBase: process.env.MS_GRAPH_BASE || 'https://graph.microsoft.com',
};

export const contactConfigured = Boolean(
  config.tenant && config.clientId && config.clientSecret && config.sender && config.to.length,
);

// ------------------------------------------------------------------ fields

const CARGO = { frozen: 'Fagyasztott', chilled: 'Hűtött', fresh: 'Friss', dry: 'Száraz áru', special: 'Speciális rakomány' };
const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]{1,64}@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;
const PHONE_RE = /^[0-9+()\-./\s]{6,30}$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** [name, label in the email, max length, required] – same limits as the form. */
const FIELDS = [
  ['last_name', 'Vezetéknév', 80, true],
  ['first_name', 'Keresztnév', 80, true],
  ['company', 'Cégnév', 120, false],
  ['email', 'E-mail', 120, true],
  ['phone', 'Telefon', 30, false],
  ['pickup_location', 'Felrakodás helye', 120, false],
  ['delivery_location', 'Lerakodás helye', 120, false],
  ['cargo_type', 'Áru típusa', 20, false],
  ['temperature', 'Hőmérsékleti igény', 60, false],
  ['preferred_date', 'Tervezett időpont', 10, false],
  ['message', 'Üzenet', 4000, true],
];

/** Plain text only: drop control and bidi/zero-width characters (keep line breaks in the message), trim. */
const INVISIBLE = '\u007F\u200B-\u200F\u2028-\u202E\u2066-\u2069';
const CONTROL_MULTI = new RegExp('[\u0000-\u0009\u000B-\u001F' + INVISIBLE + ']', 'g');
const CONTROL_SINGLE = new RegExp('[\u0000-\u001F' + INVISIBLE + ']', 'g');
function clean(value, multiline) {
  const s = String(value ?? '').normalize('NFC');
  const stripped = multiline ? s.replace(/\r\n?/g, '\n').replace(CONTROL_MULTI, '') : s.replace(CONTROL_SINGLE, ' ');
  return stripped.trim();
}

/** Returns { values } or { errors: [field names] }. */
export function validate(params) {
  const values = {};
  const errors = [];
  for (const [name, , max, required] of FIELDS) {
    const v = clean(params.get(name), name === 'message');
    if ((required && !v) || v.length > max) errors.push(name);
    values[name] = v;
  }
  if (values.email && !EMAIL_RE.test(values.email)) errors.push('email');
  if (values.phone && !PHONE_RE.test(values.phone)) errors.push('phone');
  if (values.cargo_type && !CARGO[values.cargo_type]) errors.push('cargo_type');
  if (values.preferred_date && !DATE_RE.test(values.preferred_date)) errors.push('preferred_date');
  if (params.get('consent') !== 'yes') errors.push('consent');
  values.language = params.get('language') === 'en' ? 'en' : 'hu';
  return errors.length ? { errors: [...new Set(errors)] } : { values };
}

function emailText(v) {
  const lines = FIELDS.filter(([name]) => name !== 'message').map(([name, label]) => {
    const value = name === 'cargo_type' ? CARGO[v[name]] || '' : v[name];
    return `${label}: ${value || '–'}`;
  });
  return [
    'Új ajánlatkérés érkezett a weboldalról (www.nhcargo.hu/kapcsolat/).',
    '',
    ...lines,
    `Nyelv: ${v.language === 'en' ? 'angol' : 'magyar'}`,
    '',
    'Üzenet:',
    v.message,
    '',
    '—',
    'Az adatkezelési tájékoztatót a küldő elfogadta. Válaszhoz használja a „Válasz” gombot (a válaszcím a küldő e-mail-címe).',
  ].join('\n');
}

// ------------------------------------------------------------------ Microsoft Graph

let token = { value: '', expires: 0 };

async function graphToken() {
  if (token.value && Date.now() < token.expires - 60_000) return token.value;
  const response = await fetch(`${config.loginBase}/${encodeURIComponent(config.tenant)}/oauth2/v2.0/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      scope: 'https://graph.microsoft.com/.default',
      grant_type: 'client_credentials',
    }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.access_token) throw new Error(`token request failed: ${response.status} ${data.error || ''}`);
  token = { value: data.access_token, expires: Date.now() + Number(data.expires_in || 3000) * 1000 };
  return token.value;
}

async function sendMail(v) {
  const name = `${v.last_name} ${v.first_name}`.trim();
  const subject = `Ajánlatkérés – ${name}${v.company ? ` (${v.company})` : ''}`.slice(0, 200);
  const response = await fetch(`${config.graphBase}/v1.0/users/${encodeURIComponent(config.sender)}/sendMail`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${await graphToken()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: {
        subject,
        body: { contentType: 'Text', content: emailText(v) },
        toRecipients: config.to.map((address) => ({ emailAddress: { address } })),
        replyTo: [{ emailAddress: { address: v.email, name } }],
      },
      saveToSentItems: false,
    }),
  });
  if (response.status !== 202) {
    if (response.status === 401) token = { value: '', expires: 0 };
    const detail = await response.text().catch(() => '');
    // Graph error codes only – never the submission itself
    throw new Error(`sendMail failed: ${response.status} ${detail.match(/"code":"([^"]+)"/)?.[1] || ''}`);
  }
}

// ------------------------------------------------------------------ rate limit

const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.start > WINDOW_MS) {
    hits.set(ip, { start: now, count: 1 });
    return false;
  }
  return ++entry.count > MAX_PER_WINDOW;
}
setInterval(() => {
  const now = Date.now();
  for (const [ip, e] of hits) if (now - e.start > WINDOW_MS) hits.delete(ip);
}, WINDOW_MS).unref();

// ------------------------------------------------------------------ handler

function readBody(req) {
  return new Promise((resolve, reject) => {
    if (Number(req.headers['content-length']) > MAX_BODY_BYTES)
      return reject(Object.assign(new Error('too large'), { status: 413 }));
    let size = 0;
    const chunks = [];
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size <= MAX_BODY_BYTES) chunks.push(chunk);
    });
    req.on('end', () =>
      size > MAX_BODY_BYTES
        ? reject(Object.assign(new Error('too large'), { status: 413 }))
        : resolve(Buffer.concat(chunks).toString('utf8')),
    );
    req.on('error', reject);
  });
}

/**
 * @param send     (status, body, headers) → response helper of server.mjs
 * @param origins  allowed browser origins (CORS), e.g. https://www.nhcargo.hu
 */
export async function handleContact(req, res, { send, origins, ip }) {
  const origin = req.headers.origin;
  const allowed = origin && origins.includes(origin);
  const cors = allowed ? { 'Access-Control-Allow-Origin': origin, Vary: 'Origin' } : { Vary: 'Origin' };

  if (req.method === 'OPTIONS') {
    return send(res, allowed ? 204 : 403, '', {
      ...cors,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type, Accept',
      'Access-Control-Max-Age': '86400',
    });
  }
  if (req.method !== 'POST') return send(res, 405, 'Method not allowed', { Allow: 'POST, OPTIONS' });
  // Browsers always send Origin on cross-site POSTs; anything else is not our form
  if (!allowed) return send(res, 403, 'Forbidden', cors);

  const wantsJson = (req.headers.accept || '').includes('application/json');
  const reply = (status, payload) => {
    if (wantsJson) return send(res, status, JSON.stringify(payload), { ...cors, 'Content-Type': 'application/json; charset=utf-8' });
    // Form submitted without JavaScript: back to the contact page with ?sent=1 / ?error=1
    const back = new URL(safeReferer(req, origins) || `${origins[0]}/kapcsolat/`);
    back.search = payload.ok ? 'sent=1' : 'error=1';
    back.hash = 'quote-form';
    return send(res, 303, '', { ...cors, Location: back.href });
  };

  if (!contactConfigured) return reply(503, { ok: false, error: 'not_configured' });
  if (limited(ip)) return reply(429, { ok: false, error: 'rate_limited' });

  const type = (req.headers['content-type'] || '').split(';')[0].trim();
  if (type !== 'application/x-www-form-urlencoded') return reply(415, { ok: false, error: 'unsupported_type' });

  let params;
  try {
    params = new URLSearchParams(await readBody(req));
  } catch (err) {
    // Declared too large: don't read it, close the connection after answering
    if (err.status === 413) res.setHeader('Connection', 'close');
    return reply(err.status || 400, { ok: false, error: err.status === 413 ? 'too_large' : 'bad_request' });
  }

  // Spam: honeypot filled in, or submitted inhumanly fast → pretend success, send nothing
  const ts = Number(params.get('_ts'));
  if (params.get('_gotcha') || (ts && Date.now() - ts < MIN_FILL_MS)) return reply(200, { ok: true });

  const result = validate(params);
  if (result.errors) return reply(400, { ok: false, error: 'validation', fields: result.errors });

  try {
    await sendMail(result.values);
  } catch (err) {
    console.error('contact:', err.message);
    return reply(502, { ok: false, error: 'send_failed' });
  }
  return reply(200, { ok: true });
}

function safeReferer(req, origins) {
  try {
    const ref = new URL(req.headers.referer || '');
    return origins.includes(ref.origin) ? `${ref.origin}${ref.pathname}` : '';
  } catch {
    return '';
  }
}
