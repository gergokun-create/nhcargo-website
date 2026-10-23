// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import adminMedia from './integrations/admin-media.mjs';

// Final domain (production on Render). robots.txt and the sitemap are generated from it.
// SITE_URL / BASE_PATH env variables override these, e.g. for the GitHub Pages
// preview (https://<user>.github.io/nhcargo-website/) – see .github/workflows/deploy.yml.
const SITE_URL = process.env.SITE_URL || 'https://www.nhcargo.hu';
const BASE_PATH = process.env.BASE_PATH || '/';

// Render pull request previews (admin drafts) are public *.onrender.com URLs:
// keep them out of search engines like the GitHub Pages preview.
if (process.env.IS_PULL_REQUEST === 'true') process.env.PUBLIC_NOINDEX = 'true';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  // Content-Security-Policy as a <meta> tag on every page. Astro adds SHA-256 hashes
  // for its own inline scripts/styles, so no 'unsafe-inline' is needed for scripts.
  // frame-ancestors / HSTS etc. are sent as HTTP headers by Render (render.yaml).
  security: {
    csp: {
      algorithm: 'SHA-256',
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self' data:", // small font subsets are inlined by Vite
        "connect-src 'self' https://formspree.io",
        "form-action 'self' https://formspree.io",
        'frame-src https://www.google.com https://maps.google.com',
        "base-uri 'self'",
        "object-src 'none'",
        "manifest-src 'self'",
        'upgrade-insecure-requests',
      ],
      // inline style="" attributes (CSS custom properties for animations, SVG badges)
      styleDirective: { resources: [{ resource: "'unsafe-inline'", kind: 'attribute' }] },
    },
  },
  // No code blocks on the site → no Shiki (its inline styles would conflict with the CSP)
  markdown: { syntaxHighlight: false },
  integrations: [
    adminMedia(),
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/admin/'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
