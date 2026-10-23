/**
 * Language + route configuration.
 * Hungarian is the default language (served from "/"), English lives under "/en/".
 * If you rename a page URL, change it here – every link, the language switcher
 * and the hreflang tags are generated from this table.
 */
export const languages = {
  hu: { label: 'Magyar', short: 'HU', htmlLang: 'hu', ogLocale: 'hu_HU' },
  en: { label: 'English', short: 'EN', htmlLang: 'en', ogLocale: 'en_GB' },
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'hu';
export const langs = Object.keys(languages) as Lang[];

export const routes = {
  home: { hu: '/', en: '/en/' },
  about: { hu: '/rolunk/', en: '/en/about/' },
  services: { hu: '/szolgaltatasok/', en: '/en/services/' },
  domestic: { hu: '/belfoldi-fuvarozas/', en: '/en/domestic-transport/' },
  crossdock: { hu: '/cross-docking/', en: '/en/cross-docking/' },
  international: { hu: '/nemzetkozi-fuvarozas/', en: '/en/international-transport/' },
  sustainability: { hu: '/fenntarthatosag/', en: '/en/sustainability/' },
  contact: { hu: '/kapcsolat/', en: '/en/contact/' },
  imprint: { hu: '/impresszum/', en: '/en/imprint/' },
  privacy: { hu: '/adatvedelem/', en: '/en/privacy/' },
  cookies: { hu: '/suti-tajekoztato/', en: '/en/cookie-policy/' },
} as const satisfies Record<string, Record<Lang, string>>;

export type RouteKey = keyof typeof routes;

/**
 * Prefixes a root-relative path with the deployment base path
 * ("/" normally, "/nhcargo-website/" on GitHub Pages – see astro.config.mjs).
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

/** URL of a page in the given language (including the base path). */
export function localePath(key: RouteKey, lang: Lang): string {
  return withBase(routes[key][lang]);
}

export function otherLang(lang: Lang): Lang {
  return lang === 'hu' ? 'en' : 'hu';
}
