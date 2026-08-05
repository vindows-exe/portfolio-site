import { defineConfig, envField } from 'astro/config';
import mdx from '@astrojs/mdx';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://REPLACE-WITH-FINAL-DOMAIN.dev',
  output: 'static',
  integrations: [mdx(), preact(), sitemap()],
  vite: { plugins: [tailwindcss()] },
  env: {
    schema: {
      GITHUB_TOKEN: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
      GITHUB_USERNAME: envField.string({
        context: 'server',
        access: 'public',
        default: 'vindows',
      }),
    },
  },
});
