/**
 * Central company data – used in the header, footer, contact page,
 * legal pages and the schema.org structured data.
 * Edit the values here and they update everywhere on the site.
 */
export const site = {
  name: 'NH Cargo Kft.',
  shortName: 'NH Cargo',
  tagline: 'Out of box',
  url: 'https://www.nhcargo.hu',

  phone: {
    display: '+36 70 902 5961',
    href: 'tel:+36709025961',
    e164: '+36709025961',
  },
  email: 'info@nhcargo.hu',

  /** Telephely / office – shown on the map */
  office: {
    street: 'Baross u. 165.',
    postalCode: '2040',
    city: 'Budaörs',
    country: 'HU',
  },
  /** Székhely / registered seat */
  seat: {
    street: 'Petőfi Sándor utca 48.',
    postalCode: '2724',
    city: 'Újlengyel',
    country: 'HU',
  },

  /** Company register data. Values starting with "TODO" are shown as highlighted placeholders. */
  registration: {
    companyNumber: 'Cg. 13-09-236978',
    taxNumber: '32677173-2-13',
    euVatNumber: 'TODO: közösségi adószám (ha van)',
    // "13" in the company number = Pest county register; confirm on e-cegjegyzek.hu
    registryCourt: 'Budapest Környéki Törvényszék Cégbírósága',
    representative: 'TODO: ügyvezető neve',
  },

  /** Contact person of the data controller (privacy policy). */
  dataProtectionContact: {
    name: 'Horváth Péter',
    email: 'p.horvath@nhcargo.hu',
  },

  social: {
    linkedin: 'https://www.linkedin.com/company/nh-cargo-kft/',
  },

  /**
   * Contact form endpoint.
   * Option A – Formspree: https://formspree.io/f/<your-form-id>
   * Option B – PHP mailer on shared hosting: '/contact.php'
   * Can also be set at build time with the PUBLIC_FORM_ENDPOINT env variable.
   */
  formEndpoint:
    (import.meta.env.PUBLIC_FORM_ENDPOINT as string | undefined) ||
    'https://formspree.io/f/YOUR_FORM_ID', // TODO: configure – see README

  map: {
    query: '2040 Budaörs, Baross u. 165.',
  },
};

export const formEndpointIsPlaceholder = site.formEndpoint.includes('YOUR_FORM_ID');
export const linkedinIsPlaceholder = /linkedin\.com\/?$/.test(site.social.linkedin);

export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(site.map.query)}&z=15&output=embed`;
export const mapLinkUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.map.query)}`;

export function formatAddress(a: { street: string; postalCode: string; city: string }) {
  return `${a.postalCode} ${a.city}, ${a.street}`;
}
