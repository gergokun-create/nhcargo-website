/**
 * All photos used on the site. To swap an image, replace the file in
 * src/assets/images/ (keep the file name) or change the import below.
 * Astro converts them to responsive WebP at build time.
 * Alt texts are language-specific and live in src/i18n/{hu,en}.ts → "alt".
 *
 * Sources (free stock photos):
 *  Pexels – Pexels License, https://www.pexels.com/license/
 *   heroTrucks       – Дмитрий Рощупкин           https://www.pexels.com/photo/19187103/ (cropped)
 *   sunnyRoadTruck   – Artem Balashevsky          https://www.pexels.com/photo/18446790/ (edited: NH Cargo logo added)
 *   countryRoadTruck – Attila Darvas              https://www.pexels.com/photo/27855399/
 *   reeferTruck      – Muhammed Tarik Kahraman    https://www.pexels.com/photo/16706765/ (cropped)
 *   reeferTrailers  – Tom Jackson                https://www.pexels.com/photo/27099094/
 *   logisticsHall   – Pixabay                    https://www.pexels.com/photo/209251/
 *   truckParking    – Marcin Jozwiak             https://www.pexels.com/photo/2800121/
 *   countryRoad     – Safa Nuri Ekici            https://www.pexels.com/photo/36900594/
 *  Unsplash – Unsplash License, https://unsplash.com/license
 *   dockDoors       – Hannes Egler               https://unsplash.com/photos/nT4k2JDtwTQ
 *   windTurbines    – Thomas Réaubourg           https://unsplash.com/photos/JRUVbgJJTBM
 * About-page photos (src/assets/images/rolunk/) are listed in src/data/aboutImages.ts.
 */
import heroTrucks from '../assets/images/truck-green-hills.jpg';
import sunnyRoadTruck from '../assets/images/white-truck-sunny-road.jpg';
import countryRoadTruck from '../assets/images/truck-country-road.jpg';
import reeferTruck from '../assets/images/reefer-truck-volvo.jpg';
import reeferTrailers from '../assets/images/reefer-trailers-sunny.jpg';
import logisticsHall from '../assets/images/bright-logistics-hall.jpg';
import truckParking from '../assets/images/aerial-truck-parking.jpg';
import countryRoad from '../assets/images/country-road-green-fields.jpg';
import dockDoors from '../assets/images/loading-dock-doors.jpg';
import windTurbines from '../assets/images/wind-turbines-fields.jpg';

export const images = {
  heroTrucks,
  sunnyRoadTruck,
  countryRoadTruck,
  reeferTruck,
  reeferTrailers,
  logisticsHall,
  truckParking,
  countryRoad,
  dockDoors,
  windTurbines,
};

export type ImageKey = keyof typeof images;
