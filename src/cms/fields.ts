/**
 * Field builders for the editable content (src/content/*.json).
 *
 * Every field is described once and produces both
 *  - the Decap CMS field config (admin form, served as /admin/config.json), and
 *  - the zod schema that validates the JSON at build time.
 * So the admin form and the build check can never drift apart.
 */
import { z, type ZodTypeAny } from 'astro/zod';

/** Decap field config (only the options used here). */
export type DecapField = Record<string, unknown> & { name: string; label: string; widget: string };

export interface Field {
  decap: DecapField;
  zod: ZodTypeAny;
}

type Common = {
  hint?: string;
  /** false = optional (may be empty). Default: required. */
  required?: boolean;
};

/** Same value in every language (e.g. an image file) → Decap copies it from the default language. */
type I18n = true | 'duplicate';

function decapBase(name: string, label: string, widget: string, o: Common, i18n: I18n): DecapField {
  return {
    name,
    label,
    widget,
    i18n,
    ...(o.hint ? { hint: o.hint } : {}),
    ...(o.required === false ? { required: false } : {}),
  };
}

function textZod(o: Common & { max?: number }) {
  let s = z.string().trim();
  if (o.max) s = s.max(o.max, `legfeljebb ${o.max} karakter`);
  return o.required === false ? s.default('') : s.min(1, 'kötelező mező');
}

/** Single-line text. `max` adds a character limit (checked in the admin and at build time). */
export function str(name: string, label: string, o: Common & { max?: number } = {}): Field {
  const decap = decapBase(name, label, 'string', o, true);
  if (o.max) {
    decap.pattern = [`^[\\s\\S]{0,${o.max}}$`, `Legfeljebb ${o.max} karakter.`];
    decap.hint = [o.hint, `Legfeljebb ${o.max} karakter.`].filter(Boolean).join(' ');
  }
  return { decap, zod: textZod(o) };
}

/** Multi-line plain text (paragraph). */
export function text(name: string, label: string, o: Common & { max?: number } = {}): Field {
  const decap = decapBase(name, label, 'text', o, true);
  if (o.max) {
    decap.pattern = [`^[\\s\\S]{0,${o.max}}$`, `Legfeljebb ${o.max} karakter.`];
    decap.hint = [o.hint, `Legfeljebb ${o.max} karakter.`].filter(Boolean).join(' ');
  }
  return { decap, zod: textZod(o) };
}

/** Image from the media library. Stored as "/src/assets/images/<file>"; resolved in src/content/images.ts. */
export function image(name: string, label: string, o: Common = {}): Field {
  const decap = decapBase(name, label, 'image', o, 'duplicate');
  decap.choose_url = false;
  // Upload limit of the default media library (bytes); uploads are re-encoded as WebP (see config.json.ts)
  decap.media_library = { config: { max_file_size: 10 * 1024 * 1024 } };
  const path = z
    .string()
    .trim()
    .regex(/^\/src\/assets\/images\/[^/]+\.(jpe?g|png|webp)$/i, 'csak JPG, PNG vagy WebP kép a médiatárból');
  return { decap, zod: o.required === false ? path.or(z.literal('')).default('') : path };
}

/** Group of named fields. */
export function obj(name: string, label: string, fields: Field[], o: Common & { collapsed?: boolean } = {}): Field {
  const decap = decapBase(name, label, 'object', o, true);
  decap.fields = fields.map((f) => f.decap);
  if (o.collapsed) decap.collapsed = true;
  return { decap, zod: z.object(Object.fromEntries(fields.map((f) => [f.decap.name, f.zod]))) };
}

/** List of plain strings (`multiline`: paragraphs). */
export function strList(
  name: string,
  label: string,
  o: Common & { min?: number; max?: number; multiline?: boolean } = {},
): Field {
  const decap = decapBase(name, label, 'list', o, true);
  decap.field = { name: 'item', label, widget: o.multiline ? 'text' : 'string' };
  if (o.min !== undefined) decap.min = o.min;
  if (o.max !== undefined) decap.max = o.max;
  let s = z.array(z.string().trim().min(1, 'üres elem'));
  if (o.min !== undefined) s = s.min(o.min, `legalább ${o.min} elem`);
  if (o.max !== undefined) s = s.max(o.max, `legfeljebb ${o.max} elem`);
  return { decap, zod: s };
}

/** List of objects (e.g. stats, cards). `summary` is the Decap list row label, e.g. "{{fields.title}}". */
export function list(
  name: string,
  label: string,
  fields: Field[],
  o: Common & { min?: number; max?: number; summary?: string } = {},
): Field {
  const decap = decapBase(name, label, 'list', o, true);
  decap.fields = fields.map((f) => f.decap);
  if (o.summary) decap.summary = o.summary;
  if (o.min !== undefined) decap.min = o.min;
  if (o.max !== undefined) decap.max = o.max;
  let s = z.array(z.object(Object.fromEntries(fields.map((f) => [f.decap.name, f.zod]))));
  if (o.min !== undefined) s = s.min(o.min, `legalább ${o.min} elem`);
  if (o.max !== undefined) s = s.max(o.max, `legfeljebb ${o.max} elem`);
  return { decap, zod: s };
}

// ---------------------------------------------------------------- shortcuts

export const titleText = (name: string, label: string) =>
  obj(name, label, [str('title', 'Cím'), text('text', 'Szöveg')], { collapsed: true });

export const hero = (name = 'hero', label = 'Oldal teteje') =>
  obj(name, label, [
    str('eyebrow', 'Felirat a cím felett'),
    str('title', 'Főcím (H1)'),
    text('subtitle', 'Alcím'),
  ]);

export const sectionIntro = (name: string, label: string, extra: Field[] = []) =>
  obj(name, label, [str('eyebrow', 'Felirat a cím felett'), str('title', 'Cím'), text('intro', 'Bevezető'), ...extra], {
    collapsed: true,
  });

export const stats = (name: string, label: string, o: { min?: number; max?: number } = {}) =>
  list(name, label, [str('value', 'Érték', { hint: 'pl. 40 vagy 24/7' }), str('label', 'Felirat')], {
    summary: '{{fields.value}} – {{fields.label}}',
    ...o,
  });

// ---------------------------------------------------------------- files

/** One editable JSON file = one entry in the admin. */
export interface ContentFile {
  /** File name in src/content/ (without .json) and the Decap entry name. */
  name: string;
  label: string;
  description?: string;
  /** false = not translated (one value for both languages). */
  i18n: boolean;
  fields: Field[];
}

/** zod schema of a whole file: { hu: {...}, en: {...} } for translated files. */
export function fileSchema(file: ContentFile, langs: readonly string[]) {
  const shape = z.object(Object.fromEntries(file.fields.map((f) => [f.decap.name, f.zod])));
  return file.i18n ? z.object(Object.fromEntries(langs.map((l) => [l, shape]))) : shape;
}

/** Decap "files" collection entry. Untranslated files drop the i18n markers. */
export function decapFile(file: ContentFile, folder: string) {
  const strip = (f: DecapField): DecapField => {
    const { i18n: _i18n, ...rest } = f;
    if (Array.isArray(rest.fields)) rest.fields = (rest.fields as DecapField[]).map(strip);
    if (rest.field) rest.field = strip(rest.field as DecapField);
    return rest as DecapField;
  };
  return {
    name: file.name,
    label: file.label,
    ...(file.description ? { description: file.description } : {}),
    file: `${folder}/${file.name}.json`,
    format: 'json',
    ...(file.i18n ? { i18n: true } : {}),
    fields: file.fields.map((f) => (file.i18n ? f.decap : strip(f.decap))),
  };
}
