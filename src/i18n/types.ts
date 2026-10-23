import type {
  CargoType,
  PillarId,
  ServiceId,
  StepId,
  WhyId,
} from '../data/content';
import type { ImageKey } from '../data/images';
import type { AboutSlot } from '../data/aboutImages';
import type { RouteKey } from './config';

type Meta = { title: string; description: string };
type TitleText = { title: string; text: string };
type PageHero = { eyebrow: string; title: string; subtitle: string };
type SectionIntro = { eyebrow: string; title: string; intro: string };

/** Shape every language file (hu.ts, en.ts) must follow. */
export interface Dictionary {
  meta: Record<Exclude<RouteKey, never>, Meta>;
  nav: Record<Exclude<RouteKey, 'home'>, string> & {
    home: string;
    quote: string;
    menuOpen: string;
    menuClose: string;
    mainNav: string;
    skip: string;
    homeLink: string;
  };
  common: {
    learnMore: string;
    allServices: string;
    requestQuote: string;
    ourServices: string;
    contactUs: string;
    callUs: string;
    backHome: string;
    moreAbout: string;
  };
  alt: Record<ImageKey, string>;
  home: {
    hero: {
      eyebrow: string;
      title: string;
      subtitle: string;
      chips: string[];
      stats: { value: string; label: string }[];
    };
    about: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      mission: TitleText;
      contactPerson: TitleText;
    };
    why: SectionIntro;
    services: SectionIntro;
    fleet: SectionIntro & { cards: TitleText[] };
    sustainability: { eyebrow: string; title: string; text: string; cta: string };
  };
  why: Record<WhyId, TitleText>;
  services: {
    hero: PageHero;
    items: Record<ServiceId, { title: string; pageTitle: string; short: string; lead: string; points: TitleText[] }>;
    related: string;
    question: TitleText;
    process: { eyebrow: string; title: string; steps: Record<StepId, TitleText> };
  };
  sustainability: {
    hero: PageHero;
    intro: { eyebrow: string; title: string; paragraphs: string[] };
    pillarsTitle: string;
    pillars: Record<PillarId, TitleText>;
    closing: TitleText;
  };
  contact: {
    hero: PageHero;
    details: { title: string; company: string; phone: string; email: string; office: string; seat: string };
    map: { title: string; consent: string; load: string; open: string; iframeTitle: string };
  };
  form: {
    title: string;
    intro: string;
    /** Display order of the name fields (Hungarian: family name first). */
    nameOrder: ['firstName', 'lastName'] | ['lastName', 'firstName'];
    fields: {
      firstName: string;
      lastName: string;
      company: string;
      email: string;
      phone: string;
      pickup: string;
      pickupPlaceholder: string;
      delivery: string;
      deliveryPlaceholder: string;
      cargoType: string;
      cargoPlaceholder: string;
      temperature: string;
      temperaturePlaceholder: string;
      date: string;
      message: string;
      messagePlaceholder: string;
      honeypot: string;
    };
    cargoOptions: Record<CargoType, string>;
    consent: { before: string; link: string; after: string };
    required: string;
    submit: string;
    sending: string;
    success: { title: string; text: string; again: string };
    error: TitleText;
    validation: {
      required: string;
      email: string;
      phone: string;
      consent: string;
      date: string;
      summary: string;
    };
    subject: string;
  };
  cta: { title: string; text: string; primary: string };
  footer: {
    tagline: string;
    navTitle: string;
    contactTitle: string;
    legalTitle: string;
    office: string;
    seat: string;
    rights: string;
    linkedin: string;
    cookieSettings: string;
  };
  legalNotice: TitleText;
  notFound: { title: string; text: string };
  consent: {
    title: string;
    text: string;
    accept: string;
    reject: string;
    settings: string;
    save: string;
    dialogTitle: string;
    necessary: TitleText;
    media: TitleText;
    alwaysOn: string;
    policy: string;
    close: string;
  };
  about: {
    hero: PageHero;
    intro: TitleText & { stats: Stat[] };
    activity: TitleText;
    fleet: TitleText & { types: string[]; badges: string[] };
    results: { eyebrow: string; title: string; items: Stat[] };
    quality: TitleText & { certs: { name: string; text: string }[] };
    warehouse: TitleText;
    duty: TitleText & { hours: string[] };
    strength: TitleText;
    goals: TitleText;
    placeholder: { label: string; file: string; size: string };
    slots: Record<AboutSlot, { title: string; alt: string }>;
  };
}

type Stat = { value: string; label: string };

/**
 * The part of the Dictionary that stays in code (src/i18n/hu.ts, en.ts).
 * Everything else comes from the admin-editable JSON in src/cms/content/ (see src/i18n/index.ts).
 */
export type UiDictionary = Pick<Dictionary, 'nav' | 'common' | 'form' | 'legalNotice' | 'notFound' | 'consent'> & {
  contact: Pick<Dictionary['contact'], 'details' | 'map'>;
  footer: Omit<Dictionary['footer'], 'tagline'>;
  about: Pick<Dictionary['about'], 'placeholder'> & { slots: Record<AboutSlot, { title: string }> };
};
