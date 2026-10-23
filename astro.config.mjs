// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Final domain (production on Render). robots.txt and the sitemap are generated from it.
// SITE_URL / BASE_PATH env variables override these, e.g. for the GitHub Pages
// preview (https://<user>.github.io/nhcargo-website/) – see .github/workflows/deploy.yml.
const SITE_URL = process.env.SITE_URL || 'https://www.nhcargo.hu';
const BASE_PATH = process.env.BASE_PATH || '/';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
