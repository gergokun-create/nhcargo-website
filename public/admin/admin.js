// Hungarian interface: decap-cms-locales + our additions (hu-extra.js).
// Strings neither of them translates fall back to English.
import hu from './vendor/hu.js';
import extra from './hu-extra.js';

const merge = (base, add) => {
  const out = { ...base };
  for (const [k, v] of Object.entries(add))
    out[k] = v && typeof v === 'object' && !Array.isArray(v) ? merge(base?.[k] ?? {}, v) : v;
  return out;
};

window.CMS.registerLocale('hu', merge(hu, extra));
window.CMS.init();
