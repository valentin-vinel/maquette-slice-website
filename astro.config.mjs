// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Domaine du site : URL canoniques, partages, sitemap, robots.txt.
  site: 'https://pizzeriaslice.fr/',
  integrations: [sitemap()],
});
