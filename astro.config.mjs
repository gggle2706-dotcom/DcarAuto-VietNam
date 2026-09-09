// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';
import cloudflare from '@astrojs/cloudflare';
import vercel from '@astrojs/vercel';

const getAdapter = () => {
  if (process.env.CF_PAGES || process.env.CLOUDFLARE) {
    return cloudflare();
  }
  if (process.env.VERCEL) {
    return vercel();
  }
  return node({ mode: 'standalone' });
};

// https://astro.build/config
export default defineConfig({
  adapter: getAdapter(),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()]
  }
});

