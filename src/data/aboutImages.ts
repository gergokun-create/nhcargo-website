/**
 * Photos of the "Rólunk / About us" page.
 *
 * HOW TO ADD A PHOTO: copy it into src/assets/images/rolunk/ with the slot's
 * file name below (jpg, jpeg, png or webp), e.g. src/assets/images/rolunk/flotta.jpg.
 * It replaces the placeholder automatically – no code change needed.
 * Until a file exists, the page shows a dashed placeholder box in its place.
 *
 * Current photos:
 *  csapat.png – NH Cargo logo on a dark background (placeholder until a team / office photo is added)
 *  raktar.jpg – stock photo by Tom Jackson, Pexels (Pexels License), https://www.pexels.com/photo/27099093/ (edited: NH Cargo logo added)
 *               Replace it with a photo of the own M0 cold store when available.
 */
import type { ImageMetadata } from 'astro';

export const aboutSlots = {
  /** Background of the page header (wide, landscape) */
  fejlec: { ratio: '16/9', size: '1920 × 1080 px' },
  csapat: { ratio: '4/3', size: '1600 × 1200 px' },
  flotta: { ratio: '4/3', size: '1600 × 1200 px' },
  raktar: { ratio: '4/3', size: '1600 × 1200 px' },
} as const;

export type AboutSlot = keyof typeof aboutSlots;

const files = import.meta.glob<ImageMetadata>('../assets/images/rolunk/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  import: 'default',
});

/** Returns the uploaded photo for a slot, or undefined if none has been added yet. */
export function aboutImage(slot: AboutSlot): ImageMetadata | undefined {
  for (const [path, image] of Object.entries(files)) {
    const name = path.split('/').pop()!.replace(/\.[^.]+$/, '').toLowerCase();
    if (name === slot) return image;
  }
  return undefined;
}

/** Path shown on the placeholder, telling the editor where to put the file. */
export const aboutImageFolder = 'src/assets/images/rolunk/';
