/**
 * All photos used on the site. To swap an image, replace the file in
 * src/assets/images/ (keep the file name) or change the import below.
 * Astro converts them to responsive WebP at build time.
 * Alt texts are language-specific and live in src/i18n/{hu,en}.ts → "alt".
 *
 * Sources (free stock photos):
 *  Pexels – Pexels License, https://www.pexels.com/license/
 *   heroTrucks      – Braeson Holland            https://www.pexels.com/photo/8994766/
 *   twoTrucks       – R9 Media Photo Collective  https://www.pexels.com/photo/40226285/ (cropped)
 *   whiteTruck      – R9 Media Photo Collective  https://www.pexels.com/photo/40292015/ (cropped)
 *   reeferTrailers  – Tom Jackson                https://www.pexels.com/photo/27099094/
 *   logisticsHall   – Pixabay                    https://www.pexels.com/photo/209251/
 *   truckParking    – Marcin Jozwiak             https://www.pexels.com/photo/2800121/
 *   countryRoad     – Safa Nuri Ekici            https://www.pexels.com/photo/36900594/
 *  Unsplash – Unsplash License, https://unsplash.com/license
 *   truckOnRoad     – Robson Hatsukami Morgan    https://unsplash.com/photos/NKr0qBAkU4s
 *   dockDoors       – Hannes Egler               https://unsplash.com/photos/nT4k2JDtwTQ
 *   windTurbines    – Thomas Réaubourg           https://unsplash.com/photos/JRUVbgJJTBM
 * About-page photos (src/assets/images/rolunk/) are listed in src/data/aboutImages.ts.
 */
import heroTrucks from '../assets/images/truck-scenic-highway.jpg';
import twoTrucks from '../assets/images/two-trucks-highway.jpg';
import whiteTruck from '../assets/images/white-truck-sunny.jpg';
import reeferTrailers from '../assets/images/reefer-trailers-sunny.jpg';
import logisticsHall from '../assets/images/bright-logistics-hall.jpg';
import truckParking from '../assets/images/aerial-truck-parking.jpg';
import countryRoad from '../assets/images/country-road-green-fields.jpg';
import truckOnRoad from '../assets/images/truck-on-road.jpg';
import dockDoors from '../assets/images/loading-dock-doors.jpg';
import windTurbines from '../assets/images/wind-turbines-fields.jpg';

export const images = {
  heroTrucks,
  twoTrucks,
  whiteTruck,
  reeferTrailers,
  logisticsHall,
  truckParking,
  countryRoad,
  truckOnRoad,
  dockDoors,
  windTurbines,
};

export type ImageKey = keyof typeof images;
