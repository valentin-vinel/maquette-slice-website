// robots.txt, avec l'adresse du sitemap tirée de `site` (astro.config.mjs).
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site)}\n`);
