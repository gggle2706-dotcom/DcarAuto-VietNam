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

copyDir('dist/client', 'dist');

if (fs.existsSync('dist/server/entry.mjs')) {
  fs.copyFileSync('dist/server/entry.mjs', 'dist/_worker.js');
}

console.log('[postbuild] Prepared Cloudflare Pages output directory.');
