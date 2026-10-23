/**
 * Puts the Decap CMS browser bundle and its Hungarian UI texts into public/admin/vendor/
 * (git-ignored), so the admin is served from our own domain – no third-party CDN.
 *
 * Only the prebuilt browser files are needed, so the packages are not npm
 * dependencies (their source dependency tree would only add npm audit noise):
 * the pinned versions are downloaded with `npm pack` and checked against the
 * integrity hashes below. To update Decap: change the version, then take the new
 * hash from `npm view decap-cms@<version> dist.integrity`.
 *
 * Runs before `astro dev` and `astro build` (package.json). Cached in node_modules/.cache/decap/.
 */
import { execFileSync } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const PACKAGES = {
  'decap-cms': {
    version: '3.17.1',
    integrity: 'sha512-0epqKYflLqinF/UKYXQkOkQf3g3oSfc+Dy5tqDmzWhQuLTgrOEXadp7fS16Mo4kA9j2+du/nVhus1J8XWssPDg==',
  },
  'decap-cms-locales': {
    version: '3.9.0',
    integrity: 'sha512-t+UgENSYs2/UWz2ZxoQ12/ELa7Bkf0XwXsN1xRJOeanWu/tJT59M+/ED4vWftGwzF6cM8UOHmWhR65oB+u6dJg==',
  },
};

const cache = path.resolve('node_modules/.cache/decap');
const out = path.resolve('public/admin/vendor');
const stamp = path.join(out, '.version');
const wanted = Object.entries(PACKAGES)
  .map(([name, p]) => `${name}@${p.version}`)
  .join(' ');

if (fs.existsSync(stamp) && fs.readFileSync(stamp, 'utf8') === wanted) process.exit(0);

const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
fs.mkdirSync(cache, { recursive: true });

function fetchPackage(name) {
  const { version, integrity } = PACKAGES[name];
  const tgz = path.join(cache, `${name}-${version}.tgz`);
  if (!fs.existsSync(tgz)) {
    const args = ['pack', `${name}@${version}`, '--pack-destination', cache, '--silent'];
    const stdio = ['ignore', 'ignore', 'inherit'];
    // Under `npm run`, call npm's own CLI with this Node (no shell needed on Windows)
    const cli = process.env.npm_execpath;
    if (cli && cli.endsWith('.js')) execFileSync(process.execPath, [cli, ...args], { stdio });
    else execFileSync(npm, args, { stdio, shell: process.platform === 'win32' });
  }
  const [algo, expected] = integrity.split('-');
  const actual = crypto.createHash(algo).update(fs.readFileSync(tgz)).digest('base64');
  if (actual !== expected) {
    fs.rmSync(tgz);
    throw new Error(`${name}@${version}: integrity mismatch – download rejected`);
  }
  const dir = path.join(cache, `${name}-${version}`);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir);
  execFileSync('tar', ['-xzf', path.basename(tgz), '-C', path.basename(dir)], { cwd: cache });
  return path.join(dir, 'package');
}

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

// decap-cms.js + its lazy-loaded chunks (*.decap-cms.js) and the WebP encoder (*.wasm)
const decap = path.join(fetchPackage('decap-cms'), 'dist');
for (const file of fs.readdirSync(decap)) {
  if (file === 'decap-cms.js' || file.endsWith('.decap-cms.js') || file.endsWith('.wasm') || file === 'decap-cms.js.LICENSE.txt')
    fs.copyFileSync(path.join(decap, file), path.join(out, file));
}

// Hungarian UI texts (ES module, registered in public/admin/admin.js)
const locales = fetchPackage('decap-cms-locales');
fs.copyFileSync(path.join(locales, 'dist/esm/hu/index.js'), path.join(out, 'hu.js'));

fs.writeFileSync(stamp, wanted);
console.log(`Decap CMS → public/admin/vendor/ (${wanted})`);
