/**
 * Central company data – used in the header, footer, contact page,
 * legal pages and the schema.org structured data.
 * The values are edited in the admin (Cégadatok), stored in src/cms/content/site.json.
 */
import { content } from '../cms';

type Address = { street: string; postalCode: string; city: string; country: string };

/**
 * Our small backend (cms-auth/ on Render): admin login + quote request form.
 * CMS_AUTH_URL overrides it if Render gave the service a different address.
 */
export const backendUrl = (process.env.CMS_AUTH_URL || 'https://nhcargo-cms-auth.onrender.com').replace(/\/$/, '');

const c = content.site;
/** Empty optional values are shown as highlighted placeholders on the legal pages (see legal.ts). */
const orTodo = (value: string, todo: string) => value || `TODO: ${todo}`;
const phoneDigits = (c.phone as string).replace(/[^\d+]/g, '');

export const site = {
  name: c.name as string,
  shortName: c.shortName as string,
  tagline: 'Out of box',
  url: 'https://www.nhcargo.hu',

  phone: {
    display: c.phone as string,
    href: `tel:${phoneDigits}`,
    e164: phoneDigits,
  },
  email: c.email as string,

  /** Telephely / office – shown on the map */
  office: { ...c.office, country: 'HU' } as Address,
  /** Székhely / registered seat */
  seat: { ...c.seat, country: 'HU' } as Address,

  /** Company register data. Values starting with "TODO" are shown as highlighted placeholders. */
  registration: {
    companyNumber: c.registration.companyNumber as string,
    taxNumber: c.registration.taxNumber as string,
    euVatNumber: orTodo(c.registration.euVatNumber, 'közösségi adószám (ha van)'),
    // "13" in the company number = Pest county register; confirm on e-cegjegyzek.hu
    registryCourt: c.registration.registryCourt as string,
    representative: orTodo(c.registration.representative, 'ügyvezető neve'),
  },

  /** Contact person of the data controller (privacy policy). */
  dataProtectionContact: {
    name: c.dataProtectionContact.name as string,
    email: c.dataProtectionContact.email as string,
  },

  social: {
    linkedin: (c.linkedin as string) || 'https://www.linkedin.com/',
  },

  /**
   * Quote request form endpoint: our backend emails it to info@nhcargo.hu via Microsoft 365
   * (cms-auth/contact.mjs). PUBLIC_FORM_ENDPOINT overrides it at build time.
   */
  formEndpoint: (import.meta.env.PUBLIC_FORM_ENDPOINT as string | undefined) || `${backendUrl}/ajanlatkeres`,

  map: {
    query: `${c.office.postalCode} ${c.office.city}, ${c.office.street}`,
  },
};

export const linkedinIsPlaceholder = /linkedin\.com\/?$/.test(site.social.linkedin);

export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(site.map.query)}&z=15&output=embed`;
export const mapLinkUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.map.query)}`;

export function formatAddress(a: { street: string; postalCode: string; city: string }) {
  return `${a.postalCode} ${a.city}, ${a.street}`;
}
