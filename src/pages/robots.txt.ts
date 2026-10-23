import type { APIRoute } from 'astro';

/**
 * robots.txt – generated from the site URL so it always points to the right sitemap.
 * Preview builds (PUBLIC_NOINDEX=true, e.g. GitHub Pages) are closed to crawlers.
 */
export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const sitemap = new URL(`${base}/sitemap-index.xml`, site).href;
  const body =
    import.meta.env.PUBLIC_NOINDEX === 'true'
      ? 'User-agent: *\nDisallow: /\n'
      : `User-agent: *\nAllow: /\nDisallow: /admin/\n\nSitemap: ${sitemap}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
