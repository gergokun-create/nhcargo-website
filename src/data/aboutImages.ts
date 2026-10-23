/**
 * Own photos of the "Rólunk / About us" page, chosen in the admin
 * (Képek → Rólunk oldal saját fotói, stored in src/cms/content/images.json).
 *
 * Until a photo is chosen for a slot:
 *  - live site: a stock photo from the site's photo set is shown (`fallback`), so
 *    visitors never see an unfinished box;
 *  - local dev and previews (PUBLIC_NOINDEX, e.g. GitHub Pages, Render PR previews):
 *    a dashed "Kép helye" placeholder shows the editor where a photo is missing.
 */
import type { ImageMetadata } from 'astro';
import { content } from '../cms';
import { images, resolveImage, type ImageKey } from './images';

export const aboutSlots = {
  /** Background of the page header (wide, landscape) */
  fejlec: { ratio: '16/9', size: '1920 × 1080 px', fallback: 'reeferTrailers' },
  csapat: { ratio: '4/3', size: '1600 × 1200 px', fallback: 'reeferTrailers' },
  flotta: { ratio: '4/3', size: '1600 × 1200 px', fallback: 'reeferTruck' },
  raktar: { ratio: '4/3', size: '1600 × 1200 px', fallback: 'dockDoors' },
} as const satisfies Record<string, { ratio: string; size: string; fallback: ImageKey }>;

export type AboutSlot = keyof typeof aboutSlots;

const chosen = content.images.hu.about as Record<AboutSlot, { file: string }>;

/** Placeholders are for editors: only in local dev and noindex preview builds. */
export const showPlaceholders = import.meta.env.DEV || import.meta.env.PUBLIC_NOINDEX === 'true';

/** Returns the chosen photo for a slot, or undefined if none has been added yet. */
export function aboutImage(slot: AboutSlot): ImageMetadata | undefined {
  const file = chosen[slot]?.file;
  return file ? resolveImage(file) : undefined;
}

/** Stock photo shown on the live site while a slot has no own photo. */
export function aboutFallback(slot: AboutSlot): { image: ImageMetadata; key: ImageKey } {
  const key = aboutSlots[slot].fallback;
  return { image: images[key], key };
}
