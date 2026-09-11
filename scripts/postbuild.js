import fs from 'node:fs';
import path from 'node:path';

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const item of fs.readdirSync(src)) {
    const s = path.join(src, item);
    const d = path.join(dest, item);
    if (fs.statSync(s).isDirectory()) {
      copyDir(s, d);
    } else {
      fs.copyFileSync(s, d);
    }
  }
}

// 1. Copy static client assets to dist root for direct Pages CDN serving
if (fs.existsSync('dist/client')) {
  copyDir('dist/client', 'dist');
}

// 2. Copy server chunks so _worker.js relative imports (./chunks/...) resolve
if (fs.existsSync('dist/server/chunks')) {
  copyDir('dist/server/chunks', 'dist/chunks');
}

// 3. Copy server entrypoint to _worker.js for Cloudflare Pages Advanced mode
if (fs.existsSync('dist/server/entry.mjs')) {
  fs.copyFileSync('dist/server/entry.mjs', 'dist/_worker.js');
}

// 4. Copy middleware if present
if (fs.existsSync('dist/server/virtual_astro_middleware.mjs')) {
  fs.copyFileSync('dist/server/virtual_astro_middleware.mjs', 'dist/virtual_astro_middleware.mjs');
}

console.log('[postbuild] Successfully prepared Cloudflare Pages static & worker output directory.');
