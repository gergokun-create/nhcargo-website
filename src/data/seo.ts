/**
 * schema.org structured data (JSON-LD) builders.
 * Only real company data from src/data/site.ts is used – nothing is invented
 * (e.g. opening hours are omitted because they are not published).
 */
import { site, linkedinIsPlaceholder } from './site';
import { localePath, defaultLang, useTranslations, type Lang, type RouteKey } from '../i18n';
import type { ServiceId } from './content';

type Node = Record<string, unknown>;

const abs = (path: string, siteUrl: URL) => new URL(path, siteUrl).href;

const postalAddress = (a: typeof site.office) => ({
  '@type': 'PostalAddress',
  streetAddress: a.street,
  postalCode: a.postalCode,
  addressLocality: a.city,
  addressCountry: a.country,
});

const areaServed = [
  { '@type': 'Country', name: 'Hungary' },
  { '@type': 'Place', name: 'European Union' },
];

export const orgId = (siteUrl: URL) => `${abs(localePath('home', defaultLang), siteUrl)}#organization`;

/** Organization + LocalBusiness (office) – on every page. */
export function companyNodes(lang: Lang, siteUrl: URL, logoUrl: string, imageUrl: string): Node[] {
  const t = useTranslations(lang);
  const home = abs(localePath('home', defaultLang), siteUrl);
  const contactPoint = {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    telephone: site.phone.e164,
    email: site.email,
    availableLanguage: ['hu', 'en'],
    areaServed: ['HU', 'EU'],
  };
  return [
    {
      '@type': 'Organization',
      '@id': orgId(siteUrl),
      name: site.name,
      alternateName: site.shortName,
      url: home,
      logo: logoUrl,
      image: imageUrl,
      email: site.email,
      telephone: site.phone.e164,
      address: postalAddress(site.seat),
      foundingDate: '2024',
      areaServed,
      contactPoint,
      ...(linkedinIsPlaceholder ? {} : { sameAs: [site.social.linkedin] }),
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${home}#office`,
      name: site.name,
      description: t.footer.tagline,
      url: home,
      logo: logoUrl,
      image: imageUrl,
      email: site.email,
      telephone: site.phone.e164,
      address: postalAddress(site.office),
      areaServed,
      parentOrganization: { '@id': orgId(siteUrl) },
    },
  ];
}

const serviceRoute: Record<ServiceId, RouteKey> = {
  domestic: 'domestic',
  crossdock: 'crossdock',
  international: 'international',
};

/** Service node for one of the main services. */
export function serviceNode(id: ServiceId, lang: Lang, siteUrl: URL): Node {
  const t = useTranslations(lang);
  const item = t.services.items[id];
  const url = abs(localePath(serviceRoute[id], lang), siteUrl);
  return {
    '@type': 'Service',
    '@id': `${url}#service`,
    name: item.pageTitle,
    serviceType: item.title,
    description: item.lead + ' ' + item.short,
    url,
    provider: { '@id': orgId(siteUrl) },
    areaServed: id === 'international' ? areaServed : [{ '@type': 'Country', name: 'Hungary' }],
    inLanguage: lang,
  };
}

/** BreadcrumbList: Home › … › current page (keys of the route table). */
export function breadcrumbNode(trail: RouteKey[], lang: Lang, siteUrl: URL): Node {
  const t = useTranslations(lang);
  const keys: RouteKey[] = ['home', ...trail.filter((k) => k !== 'home')];
  return {
    '@type': 'BreadcrumbList',
    itemListElement: keys.map((key, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: key === 'home' ? t.nav.home : t.nav[key as Exclude<RouteKey, 'home'>],
      item: abs(localePath(key, lang), siteUrl),
    })),
  };
}
