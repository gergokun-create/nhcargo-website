/**
 * All photos used on the site. Which file is used for which place is set in the
 * admin (Képek → Fotók), stored in src/cms/content/images.json; the files live in
 * src/assets/images/ (the admin's media library). Astro converts them to responsive
 * WebP at build time. Alt texts are language-specific and come from the same file.
 *
 * Sources of the original stock photos (free licences):
 *  Pexels – Pexels License, https://www.pexels.com/license/
 *   truck-green-hills.jpg         – Дмитрий Рощупкин           https://www.pexels.com/photo/19187103/ (cropped)
 *   white-truck-sunny-road.jpg    – Artem Balashevsky          https://www.pexels.com/photo/18446790/ (edited: NH Cargo logo added)
 *   truck-country-road.jpg        – Attila Darvas              https://www.pexels.com/photo/27855399/
 *   reefer-truck-volvo.jpg        – Muhammed Tarik Kahraman    https://www.pexels.com/photo/16706765/ (cropped)
 *   reefer-trailers-sunny.jpg     – Tom Jackson                https://www.pexels.com/photo/27099094/
 *   bright-logistics-hall.jpg     – Pixabay                    https://www.pexels.com/photo/209251/
 *   aerial-truck-parking.jpg      – Marcin Jozwiak             https://www.pexels.com/photo/2800121/
 *   country-road-green-fields.jpg – Safa Nuri Ekici            https://www.pexels.com/photo/36900594/
 *   rolunk-raktar.jpg             – Tom Jackson                https://www.pexels.com/photo/27099093/ (edited: NH Cargo logo added)
 *  Unsplash – Unsplash License, https://unsplash.com/license
 *   loading-dock-doors.jpg        – Hannes Egler               https://unsplash.com/photos/nT4k2JDtwTQ
 *   wind-turbines-fields.jpg      – Thomas Réaubourg           https://unsplash.com/photos/JRUVbgJJTBM
 *  rolunk-csapat.png – NH Cargo logo on a dark background (placeholder until a team / office photo is added)
 */
import type { ImageMetadata } from 'astro';
import { content } from '../cms';

const files = import.meta.glob<ImageMetadata>('/src/assets/images/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  import: 'default',
});

/** Image chosen in the admin ("/admin/media/<file>" = src/assets/images/<file>) → optimisable image. */
export function resolveImage(path: string): ImageMetadata {
  const image = files[path.replace(/^\/admin\/media\//, '/src/assets/images/')];
  if (!image) throw new Error(`A kép nem található a médiatárban: ${path} (src/cms/content/images.json vagy seo.json)`);
  return image;
}

type Photos = Record<string, { file: string }>;
const photos = content.images.hu.photos as Photos;

export const images = {
  heroTrucks: resolveImage(photos.heroTrucks.file),
  sunnyRoadTruck: resolveImage(photos.sunnyRoadTruck.file),
  countryRoadTruck: resolveImage(photos.countryRoadTruck.file),
  reeferTruck: resolveImage(photos.reeferTruck.file),
  reeferTrailers: resolveImage(photos.reeferTrailers.file),
  logisticsHall: resolveImage(photos.logisticsHall.file),
  truckParking: resolveImage(photos.truckParking.file),
  countryRoad: resolveImage(photos.countryRoad.file),
  dockDoors: resolveImage(photos.dockDoors.file),
  windTurbines: resolveImage(photos.windTurbines.file),
};

export type ImageKey = keyof typeof images;
