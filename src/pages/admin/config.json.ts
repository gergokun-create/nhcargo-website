/**
 * Decap CMS configuration, generated from src/cms/schema.ts at build time
 * (served as /admin/config.json, loaded by public/admin/index.html).
 */
import type { APIRoute } from 'astro';
import { decapFile } from '../../cms/fields';
import { contentFiles } from '../../cms/schema';
import { defaultLang, langs, routes, type RouteKey } from '../../i18n/config';

const FOLDER = 'src/cms/content';
/** GitHub login helper (cms-auth/, Render Free web service). Override with CMS_AUTH_URL. */
const AUTH_URL = process.env.CMS_AUTH_URL || 'https://nhcargo-cms-auth.onrender.com';

/** Page shown by the admin's "Előnézet" (preview) link for each file; the rest open the home page. */
const previewPage: Record<string, RouteKey> = {
  services: 'services',
  about: 'about',
  sustainability: 'sustainability',
  contact: 'contact',
  images: 'about',
  site: 'imprint',
};

const files = (names: string[]) =>
  names.map((n) => {
    const file = decapFile(contentFiles.find((f) => f.name === n)!, FOLDER);
    const page = previewPage[n];
    return page ? { ...file, preview_path: routes[page][defaultLang].replace(/^\//, '') } : file;
  });

const config = {
  backend: {
    name: 'github',
    repo: 'gergokun-create/nhcargo-website',
    branch: 'main',
    base_url: AUTH_URL,
    auth_endpoint: 'auth',
    // The repo is public: no access to the owner's private repositories
    auth_scope: 'public_repo',
    squash_merges: true,
    // Drafts' preview link: the commit status set by .github/workflows/render-preview-status.yml
    preview_context: 'deploy/render-preview',
    commit_messages: {
      create: 'Admin: {{collection}} – „{{slug}}” létrehozása',
      update: 'Admin: {{collection}} – „{{slug}}” módosítása',
      delete: 'Admin: {{collection}} – „{{slug}}” törlése',
      uploadMedia: 'Admin: kép feltöltése – {{path}}',
      deleteMedia: 'Admin: kép törlése – {{path}}',
      openAuthoring: '{{message}}',
    },
  },
  // `npx decap-server` + http://localhost:4321/admin/ – only used on localhost
  local_backend: true,
  // Drafts are pull requests → Render builds a preview URL for each
  publish_mode: 'editorial_workflow',
  locale: 'hu',
  site_url: 'https://www.nhcargo.hu',
  display_url: 'https://www.nhcargo.hu',
  logo_url: 'logo.svg',
  media_folder: 'src/assets/images',
  // Thumbnails in the admin: the files are also served at /admin/media/ (integrations/admin-media.mjs)
  public_folder: '/admin/media',
  // Uploads are re-encoded as WebP without metadata (GPS etc.); sizes are made at build time
  media_processing: { enabled: true, format: { enabled: true, default: 'webp' }, quality: 82, strip_metadata: true },
  i18n: { structure: 'single_file', locales: [...langs], default_locale: defaultLang },
  collections: [
    {
      name: 'oldalak',
      label: 'Oldalak',
      description: 'Az oldalak szövegei magyarul és angolul.',
      i18n: true,
      editor: { preview: false },
      files: files(['home', 'services', 'about', 'sustainability', 'contact', 'common']),
    },
    {
      name: 'seo-kepek',
      label: 'SEO és képek',
      i18n: true,
      editor: { preview: false },
      files: files(['seo', 'images']),
    },
    {
      name: 'cegadatok',
      label: 'Cégadatok és űrlap',
      editor: { preview: false },
      files: files(['site', 'form']),
    },
  ],
};

export const GET: APIRoute = () =>
  new Response(JSON.stringify(config, null, 2), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
