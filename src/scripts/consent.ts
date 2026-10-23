/**
 * Cookie / external-content consent store (no third-party service).
 *
 * The decision is kept in localStorage under "nhc-consent" for 12 months.
 * Nothing non-essential (e.g. Google Maps) may load before `has('media')` is true
 * or the visitor explicitly clicks to load it.
 *
 * To add a category later (e.g. "analytics"), extend `Category`, the dialog in
 * CookieConsent.astro and the Cookie Policy – and bump VERSION so everyone is asked again.
 */
export type Category = 'media';
export type Consent = { v: number; date: string; categories: Record<Category, boolean> };

const KEY = 'nhc-consent';
const VERSION = 1;
const MAX_AGE_DAYS = 365;
let memory: Consent | null = null; // fallback when storage is blocked

export function read(): Consent | null {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {
    return memory;
  }
  if (!raw) return null;
  try {
    const c = JSON.parse(raw) as Consent;
    const age = (Date.now() - new Date(c.date).getTime()) / 86_400_000;
    if (c.v !== VERSION || !(age < MAX_AGE_DAYS)) return null;
    return c;
  } catch {
    return null;
  }
}

export function has(category: Category): boolean {
  return read()?.categories[category] === true;
}

export function save(categories: Record<Category, boolean>): Consent {
  const c: Consent = { v: VERSION, date: new Date().toISOString(), categories };
  memory = c;
  try {
    localStorage.setItem(KEY, JSON.stringify(c));
  } catch {
    /* storage blocked – keep in memory for this page view */
  }
  window.dispatchEvent(new CustomEvent<Consent>('nhc:consent', { detail: c }));
  return c;
}

export function onChange(fn: (c: Consent) => void) {
  window.addEventListener('nhc:consent', (e) => fn((e as CustomEvent<Consent>).detail));
}

/** Opens the settings dialog (used by the footer "Cookie settings" link). */
export function openSettings() {
  window.dispatchEvent(new Event('nhc:consent-open'));
}
