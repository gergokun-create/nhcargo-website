/**
 * GitHub login helper for the Decap CMS admin (www.nhcargo.hu/admin/).
 *
 * Decap opens /auth in a popup → we redirect to GitHub → GitHub calls /callback
 * with a code → we exchange it for a token (this needs the client secret, which
 * is why this tiny server exists) → the popup hands the token to the admin window
 * with postMessage, only to the origins in ALLOWED_ORIGINS.
 *
 * No dependencies, Node 22+. Runs on a Render Free web service (render.yaml).
 * Environment:
 *   GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET  – GitHub OAuth App (see DEPLOY.md)
 *   ALLOWED_ORIGINS  – comma-separated admin origins, e.g. https://www.nhcargo.hu
 *   PUBLIC_URL       – this service's URL (default: RENDER_EXTERNAL_URL)
 *   PORT             – set by Render
 */
import crypto from 'node:crypto';
import http from 'node:http';

const env = (name, fallback) => {
  const value = process.env[name] ?? fallback;
  if (value === undefined || value === '') throw new Error(`Missing environment variable ${name}`);
  return value;
};

const CLIENT_ID = env('GITHUB_CLIENT_ID');
const CLIENT_SECRET = env('GITHUB_CLIENT_SECRET');
const PUBLIC_URL = env('PUBLIC_URL', process.env.RENDER_EXTERNAL_URL).replace(/\/$/, '');
const ALLOWED_ORIGINS = env('ALLOWED_ORIGINS')
  .split(',')
  .map((o) => o.trim().replace(/\/$/, ''))
  .filter(Boolean);
// The content repo is public, so the token never needs access to private repositories.
const SCOPE = 'public_repo';
const STATE_COOKIE = 'nhc_oauth_state';

// ------------------------------------------------------------------ rate limit
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 30;
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.start > WINDOW_MS) {
    hits.set(ip, { start: now, count: 1 });
    return false;
  }
  entry.count++;
  return entry.count > MAX_REQUESTS;
}
setInterval(() => {
  const now = Date.now();
  for (const [ip, e] of hits) if (now - e.start > WINDOW_MS) hits.delete(ip);
}, WINDOW_MS).unref();

// ------------------------------------------------------------------ helpers
function send(res, status, body, headers = {}) {
  res.writeHead(status, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'no-referrer',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none'",
    ...headers,
  });
  res.end(body);
}

function cookie(req, name) {
  const match = (req.headers.cookie || '').split(/;\s*/).find((c) => c.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : undefined;
}

function sameSecret(a, b) {
  const x = Buffer.from(a || '');
  const y = Buffer.from(b || '');
  return x.length === y.length && x.length > 0 && crypto.timingSafeEqual(x, y);
}

/**
 * Popup page that completes Decap's handshake: announce "authorizing:github" to the
 * allowed origins, wait for the admin window to answer, then send it the result.
 */
function resultPage(res, status, content) {
  const nonce = crypto.randomBytes(16).toString('base64');
  const message = `authorization:github:${status}:${JSON.stringify(content)}`;
  const script = `
    (function () {
      var origins = ${JSON.stringify(ALLOWED_ORIGINS)};
      var message = ${JSON.stringify(message)};
      if (!window.opener) { document.body.textContent = 'Ezt az ablakot az admin felület nyitja meg.'; return; }
      window.addEventListener('message', function receive(e) {
        if (origins.indexOf(e.origin) === -1 || e.data !== 'authorizing:github') return;
        window.removeEventListener('message', receive);
        window.opener.postMessage(message, e.origin);
        setTimeout(function () { window.close(); }, 300);
      });
      origins.forEach(function (o) { window.opener.postMessage('authorizing:github', o); });
    })();`;
  send(
    res,
    200,
    `<!doctype html><html lang="hu"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>Belépés</title></head>` +
      `<body><p>${status === 'success' ? 'Sikeres belépés, az ablak bezárul…' : 'A belépés nem sikerült. Zárja be az ablakot, és próbálja újra.'}</p>` +
      `<script nonce="${nonce}">${script}</script></body></html>`,
    {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Security-Policy': `default-src 'none'; script-src 'nonce-${nonce}'; frame-ancestors 'none'`,
      // the state cookie is single-use
      'Set-Cookie': `${STATE_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`,
    },
  );
}

// ------------------------------------------------------------------ routes
async function handle(req, res) {
  const url = new URL(req.url, PUBLIC_URL);
  const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').toString().split(',')[0].trim();

  if (url.pathname === '/health') return send(res, 200, 'ok');
  if (req.method !== 'GET') return send(res, 405, 'Method not allowed', { Allow: 'GET' });
  if ((url.pathname === '/auth' || url.pathname === '/callback') && limited(ip))
    return send(res, 429, 'Túl sok próbálkozás, kérjük, várjon néhány percet.', { 'Retry-After': '600' });

  if (url.pathname === '/auth') {
    if (url.searchParams.get('provider') && url.searchParams.get('provider') !== 'github')
      return send(res, 400, 'Unsupported provider');
    const state = crypto.randomBytes(32).toString('hex');
    const authorize = new URL('https://github.com/login/oauth/authorize');
    authorize.searchParams.set('client_id', CLIENT_ID);
    authorize.searchParams.set('redirect_uri', `${PUBLIC_URL}/callback`);
    authorize.searchParams.set('scope', SCOPE);
    authorize.searchParams.set('state', state);
    authorize.searchParams.set('allow_signup', 'false');
    return send(res, 302, '', {
      Location: authorize.href,
      'Set-Cookie': `${STATE_COOKIE}=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
    });
  }

  if (url.pathname === '/callback') {
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    if (!code || !sameSecret(state, cookie(req, STATE_COOKIE)))
      return resultPage(res, 'error', { error: 'invalid_state' });

    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET, code, redirect_uri: `${PUBLIC_URL}/callback` }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.access_token) {
      console.warn('GitHub token exchange failed:', response.status, data.error || '');
      return resultPage(res, 'error', { error: data.error || 'token_exchange_failed' });
    }
    return resultPage(res, 'success', { token: data.access_token, provider: 'github' });
  }

  return send(res, 404, 'Not found');
}

const port = Number(process.env.PORT || 8787);
http
  .createServer((req, res) => {
    handle(req, res).catch((err) => {
      console.error(err);
      if (!res.headersSent) send(res, 500, 'Internal error');
    });
  })
  .listen(port, () => console.log(`cms-auth listening on :${port}, origins: ${ALLOWED_ORIGINS.join(', ')}`));
