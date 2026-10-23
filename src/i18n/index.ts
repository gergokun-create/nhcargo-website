import { en } from './en';
import { hu } from './hu';
import type { Lang } from './config';
import type { Dictionary, UiDictionary } from './types';
import { content } from '../cms';

export * from './config';
export type { Dictionary };

const ui: Record<Lang, UiDictionary> = { hu, en };

/** Interface texts from code + page content from the admin (src/cms/content/*.json). */
function build(lang: Lang): Dictionary {
  const t = ui[lang];
  const { whyItems, ...home } = content.home[lang];
  const seo = content.seo[lang];
  const images = content.images[lang];
  return {
    ...t,
    meta: Object.fromEntries(
      Object.entries(seo).map(([k, v]) => [k, { title: (v as Meta).title, description: (v as Meta).description }]),
    ) as Dictionary['meta'],
    alt: Object.fromEntries(
      Object.entries(images.photos).map(([k, v]) => [k, (v as { alt: string }).alt]),
    ) as Dictionary['alt'],
    home,
    why: whyItems,
    services: content.services[lang],
    sustainability: content.sustainability[lang],
    contact: { ...t.contact, hero: content.contact[lang].hero },
    cta: content.common[lang].cta,
    footer: { ...t.footer, tagline: content.common[lang].footerTagline },
    about: {
      ...content.about[lang],
      placeholder: t.about.placeholder,
      slots: Object.fromEntries(
        Object.entries(t.about.slots).map(([k, v]) => [k, { title: v.title, alt: images.about[k].alt }]),
      ) as Dictionary['about']['slots'],
    },
  };
}

type Meta = { title: string; description: string };

const dictionaries: Record<Lang, Dictionary> = { hu: build('hu'), en: build('en') };

/** Returns all texts for the given language. */
export function useTranslations(lang: Lang): Dictionary {
  return dictionaries[lang];
}
