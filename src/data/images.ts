/**
 * All photos used on the site. To swap an image, replace the file in
 * src/assets/images/ (keep the file name) or change the import below.
 * Astro converts them to responsive WebP at build time.
 * Alt texts are language-specific and live in src/i18n/{hu,en}.ts → "alt".
 *
 * Source: Unsplash (free to use under the Unsplash License, https://unsplash.com/license)
 *  heroTrucks          – Bhargav Panchal      https://unsplash.com/photos/P0bVatS8Jdw
 *  truckOnRoad         – Robson Hatsukami Morgan https://unsplash.com/photos/NKr0qBAkU4s
 *  highwayMotion       – Ümit Yıldırım        https://unsplash.com/photos/n7uaUOUp5hw
 *  reeferTrailers      – Tom Jackson          https://unsplash.com/photos/fP4OG67TVes
 *  boxTruck            – Maxim Tolchinskiy    https://unsplash.com/photos/crHhZlES310
 *  dockDoors           – Hannes Egler         https://unsplash.com/photos/nT4k2JDtwTQ
 *  warehouse           – Jacques Dillies      https://unsplash.com/photos/jcav1COVvOc
 *  freshVegetables     – Nithin P John        https://unsplash.com/photos/4mTU1ZQMVzQ
 *  windTurbines        – Thomas Réaubourg     https://unsplash.com/photos/JRUVbgJJTBM
 *  highwayInterchange  – Ed 259               https://unsplash.com/photos/xcrI6CPkkJs
 *  aerialTrucks        – CHUTTERSNAP          https://unsplash.com/photos/d271d_SOGR8
 */
import heroTrucks from '../assets/images/hero-trucks-highway.jpg';
import truckOnRoad from '../assets/images/truck-on-road.jpg';
import highwayMotion from '../assets/images/highway-motion.jpg';
import reeferTrailers from '../assets/images/reefer-trailers-dock.jpg';
import boxTruck from '../assets/images/box-truck-domestic.jpg';
import dockDoors from '../assets/images/loading-dock-doors.jpg';
import warehouse from '../assets/images/warehouse-shelving.jpg';
import freshVegetables from '../assets/images/fresh-vegetables.jpg';
import windTurbines from '../assets/images/wind-turbines-fields.jpg';
import highwayInterchange from '../assets/images/highway-interchange-forest.jpg';
import aerialTrucks from '../assets/images/aerial-trucks-forest.jpg';

export const images = {
  heroTrucks,
  truckOnRoad,
  highwayMotion,
  reeferTrailers,
  boxTruck,
  dockDoors,
  warehouse,
  freshVegetables,
  windTurbines,
  highwayInterchange,
  aerialTrucks,
};

export type ImageKey = keyof typeof images;
