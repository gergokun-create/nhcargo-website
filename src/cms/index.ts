/**
 * Loads the admin-editable content (src/cms/content/*.json) and validates it
 * against src/cms/schema.ts. Invalid content stops the build with a readable
 * message, so a broken edit never reaches the live site – the previous deploy stays online.
 */
import type { ZodError } from 'astro/zod';
import { fileSchema } from './fields';
import { contentFiles } from './schema';
import { langs } from '../i18n/config';

const raw = import.meta.glob<unknown>('./content/*.json', { eager: true, import: 'default' });

function format(name: string, error: ZodError) {
  const issues = error.issues.map((i) => `  - ${i.path.join('.') || '(fájl)'}: ${i.message}`).join('\n');
  return `Hibás tartalom: src/cms/content/${name}.json\n${issues}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function load(name: string): any {
  const file = contentFiles.find((f) => f.name === name);
  if (!file) throw new Error(`Ismeretlen tartalomfájl: ${name}`);
  const data = raw[`./content/${name}.json`];
  if (data === undefined) throw new Error(`Hiányzó tartalomfájl: src/cms/content/${name}.json`);
  const result = fileSchema(file, langs).safeParse(data);
  if (!result.success) throw new Error(format(name, result.error));
  return result.data;
}

/** Validated content, keyed by file name. Translated files are { hu, en }. */
export const content = Object.fromEntries(contentFiles.map((f) => [f.name, load(f.name)])) as Record<
  'home' | 'services' | 'about' | 'sustainability' | 'contact' | 'common' | 'seo' | 'images' | 'site',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any
>;
