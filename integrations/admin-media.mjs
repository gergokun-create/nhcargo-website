/**
 * Serves the media library (src/assets/images/) at /admin/media/ so the admin can
 * show thumbnails of the chosen images. Image fields store "/admin/media/<file>"
 * (Decap's public_folder); the site itself resolves that back to the source file
 * and builds optimised WebP versions (src/data/images.ts).
 *
 * build: copies the files to dist/admin/media/ · dev: serves them from the source folder.
 * /admin/ is disallowed in robots.txt and not in the sitemap.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SOURCE = 'src/assets/images';
const URL_PATH = '/admin/media/';
const TYPES = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp' };

const imageFiles = (dir) =>
  fs.readdirSync(dir).filter((f) => TYPES[path.extname(f).toLowerCase()] && fs.statSync(path.join(dir, f)).isFile());

export default function adminMedia() {
  let root;
  return {
    name: 'nhcargo-admin-media',
    hooks: {
      'astro:config:done': ({ config }) => {
        root = fileURLToPath(config.root);
      },
      'astro:server:setup': ({ server }) => {
        server.middlewares.use((req, res, next) => {
          const url = (req.url || '').split('?')[0];
          if (!url.startsWith(URL_PATH)) return next();
          const name = path.basename(decodeURIComponent(url.slice(URL_PATH.length)));
          const file = path.join(root, SOURCE, name);
          if (!TYPES[path.extname(name).toLowerCase()] || !fs.existsSync(file)) return next();
          res.setHeader('Content-Type', TYPES[path.extname(name).toLowerCase()]);
          fs.createReadStream(file).pipe(res);
        });
      },
      'astro:build:done': ({ dir }) => {
        const out = path.join(fileURLToPath(dir), URL_PATH);
        fs.mkdirSync(out, { recursive: true });
        const source = path.join(root, SOURCE);
        for (const f of imageFiles(source)) fs.copyFileSync(path.join(source, f), path.join(out, f));
      },
    },
  };
}
