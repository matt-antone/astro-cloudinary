import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify/functions";
import react from "@astrojs/react";


const tina = ({
  directiveName = 'tina'
} = {}) => ({
  name: 'tina-cms',
  hooks: {
    'astro:config:setup': ({
      addClientDirective,
    }) => {
      addClientDirective({
        name: directiveName,
        entrypoint: './client-directives/tina.mjs'
      });
    }
  },
  vite: {
    ssr: {
      noExternal: ['path-to-regexp'],
    },
  },
});

// https://astro.build/config
export default defineConfig({
  site: 'https://asro-tina.com',
  output: "hybrid",
  adapter: netlify(),
  integrations: [ mdx(), react(), sitemap(), tailwind({
    applyBaseStyles: true,
  }), tina() ]
});