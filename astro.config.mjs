// @ts-check

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [
    mdx(),
    sitemap(),
    react(),
    sanity({
      projectId: 'bf0ainjd',
      dataset: 'production',
      studioBasePath: '/studio',
      useCdn: false,
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        // Keep Sanity studio deps out of the client bundle
        external: ['@sanity/vision'],
      },
    },
  },

  adapter: vercel(),
});
