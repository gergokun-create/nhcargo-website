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

// Decap 3.17 with the GitHub backend shows an EMPTY form when a translated (HU/EN) entry is
// opened directly by its URL, e.g. after a page reload – the entry loads, but the editor does
// not pick it up. Opened from the list it works, so such page loads start at the list.
const deepLink = location.hash.match(/^#\/collections\/([^/]+)\/entries\/.+/);
if (deepLink) history.replaceState(null, '', `${location.pathname}#/collections/${deepLink[1]}`);

window.CMS.init();
