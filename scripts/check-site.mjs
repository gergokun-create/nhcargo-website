/**
 * Post-build checks on dist/ (run: npm run build && npm test).
 * Fails if any page breaks the SEO / accessibility basics the site relies on:
 * title ≤ 60 and description ≤ 155 characters, canonical, Open Graph / Twitter Card,
 * html lang, hreflang, exactly one <h1>, no skipped heading level, alt + width/height
 * on every image, and no broken internal links or image sources.
 */
import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve(process.argv[2] || 'dist');
if (!fs.existsSync(dist)) {
  console.error(`Nincs ${dist} – előbb: npm run build`);
  process.exit(1);
}

const pages = [];
(function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (name.endsWith('.html')) pages.push(p);
  }
})(dist);

// Internal URLs are relative to the base path (e.g. /nhcargo-website/ on GitHub Pages)
const base = (process.env.BASE_PATH || '/').replace(/\/?$/, '/');
const exists = (url) => {
  let u = url.split('#')[0].split('?')[0];
  if (!u.startsWith(base)) return true;
  u = decodeURIComponent('/' + u.slice(base.length));
  const p = path.join(dist, u);
  return fs.existsSync(p) && (fs.statSync(p).isFile() || fs.existsSync(path.join(p, 'index.html')));
};
const len = (s) => [...s].length;

let failed = 0;
for (const file of pages.sort()) {
  const html = fs.readFileSync(file, 'utf8');
  const rel = '/' + path.relative(dist, file).split(path.sep).join('/');
  const is404 = rel === '/404.html';
  const issues = [];

  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!title) issues.push('nincs <title>');
  else if (len(title) > 60) issues.push(`title ${len(title)} karakter (max. 60)`);
  if (!desc) issues.push('nincs meta description');
  else if (len(desc) > 155) issues.push(`description ${len(desc)} karakter (max. 155)`);
  if (!/<html lang="(hu|en)"/.test(html)) issues.push('hiányzó <html lang>');

  if (!is404) {
    // noindex preview builds (PUBLIC_NOINDEX) leave the canonical out on purpose
    const noindex = /<meta name="robots" content="[^"]*noindex/.test(html);
    if (!noindex && !/rel="canonical"/.test(html)) issues.push('nincs canonical');
    if (!/hreflang=/.test(html)) issues.push('nincs hreflang');
    for (const k of ['og:title', 'og:description', 'og:image', 'og:url', 'twitter:card', 'twitter:image'])
      if (!html.includes(`"${k}"`)) issues.push(`nincs ${k}`);
  }

  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) issues.push(`${h1} db <h1> (pontosan 1 kell)`);
  const levels = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  for (let i = 1; i < levels.length; i++)
    if (levels[i] > levels[i - 1] + 1) {
      issues.push(`címsorszint-ugrás: h${levels[i - 1]} → h${levels[i]}`);
      break;
    }

  for (const img of html.match(/<img\b[^>]*>/g) || []) {
    if (!/\balt=/.test(img)) issues.push(`kép alt nélkül: ${img.slice(0, 80)}`);
    if (!/\bwidth=/.test(img) || !/\bheight=/.test(img)) issues.push(`kép width/height nélkül: ${img.slice(0, 80)}`);
  }
  for (const [, url] of html.matchAll(/(?:href|src)="(\/[^"]*)"/g))
    if (!exists(url)) issues.push(`törött link: ${url}`);

  if (issues.length) {
    failed++;
    console.log(`✗ ${rel}\n  - ${[...new Set(issues)].join('\n  - ')}`);
  }
}

console.log(failed ? `\n${failed} / ${pages.length} oldalon van hiba.` : `✓ ${pages.length} oldal rendben.`);
process.exit(failed ? 1 : 0);
