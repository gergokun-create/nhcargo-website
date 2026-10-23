/**
 * Language-independent page structure: which items appear, in which order,
 * with which icon and photo. The texts for each id live in src/i18n/{hu,en}.ts.
 */
import type { IconName } from './icons';
import type { ImageKey } from './images';

type Item<Id extends string> = { id: Id; icon: IconName; image?: ImageKey };

export const whyUs = [
  { id: 'experience', icon: 'award' },
  { id: 'contact', icon: 'headset' },
  { id: 'temperature', icon: 'snowflake' },
  { id: 'fleet', icon: 'truck' },
  { id: 'europe', icon: 'globe' },
  { id: 'tracking', icon: 'locate' },
] as const satisfies ReadonlyArray<Item<string>>;

export const services = [
  { id: 'domestic', icon: 'truck', image: 'countryRoadTruck' },
  { id: 'crossdock', icon: 'arrowLeftRight', image: 'dockDoors' },
  { id: 'international', icon: 'globe', image: 'sunnyRoadTruck' },
] as const satisfies ReadonlyArray<Item<string>>;

export const sustainabilityPillars = [
  { id: 'routes', icon: 'route' },
  { id: 'fuels', icon: 'fuel' },
  { id: 'technology', icon: 'cpu' },
  { id: 'emptyRuns', icon: 'users' },
] as const satisfies ReadonlyArray<Item<string>>;

export const processSteps = ['request', 'offer', 'organise', 'delivery'] as const;

export const cargoTypes = ['frozen', 'chilled', 'fresh', 'dry', 'special'] as const;

export type ServiceId = (typeof services)[number]['id'];
export type WhyId = (typeof whyUs)[number]['id'];
export type PillarId = (typeof sustainabilityPillars)[number]['id'];
export type StepId = (typeof processSteps)[number];
export type CargoType = (typeof cargoTypes)[number];
