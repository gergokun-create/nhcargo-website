/**
 * Own photos of the "Rólunk / About us" page, chosen in the admin
 * (Képek → Rólunk oldal saját fotói, stored in src/cms/content/images.json).
 * Until a photo is chosen for a slot, the page shows a dashed placeholder box in its place.
 */
import type { ImageMetadata } from 'astro';
import { content } from '../cms';
import { resolveImage } from './images';

export const aboutSlots = {
  /** Background of the page header (wide, landscape) */
  fejlec: { ratio: '16/9', size: '1920 × 1080 px' },
  csapat: { ratio: '4/3', size: '1600 × 1200 px' },
  flotta: { ratio: '4/3', size: '1600 × 1200 px' },
  raktar: { ratio: '4/3', size: '1600 × 1200 px' },
} as const;

export type AboutSlot = keyof typeof aboutSlots;

const chosen = content.images.hu.about as Record<AboutSlot, { file: string }>;

/** Returns the chosen photo for a slot, or undefined if none has been added yet. */
export function aboutImage(slot: AboutSlot): ImageMetadata | undefined {
  const file = chosen[slot]?.file;
  return file ? resolveImage(file) : undefined;
}
