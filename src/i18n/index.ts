import { en } from './en';
import { hu } from './hu';
import type { Lang } from './config';
import type { Dictionary } from './types';

export * from './config';
export type { Dictionary };

const dictionaries: Record<Lang, Dictionary> = { hu, en };

/** Returns all texts for the given language. */
export function useTranslations(lang: Lang): Dictionary {
  return dictionaries[lang];
}
