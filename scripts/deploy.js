import { execSync } from 'node:child_process';
import fs from 'node:fs';

// Load .env
if (fs.existsSync('.env')) {
  const envContent = fs.readFileSync('.env', 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      process.env[key] = val;
    }
  }
}

console.log('[deploy] Deploying dist to Cloudflare Pages (dcarautovietnam)...');
execSync('npx wrangler pages deploy dist --project-name dcarautovietnam --branch main --commit-dirty=true', {
  stdio: 'inherit',
  env: process.env,
});
console.log('[deploy] Deploy finished successfully!');
