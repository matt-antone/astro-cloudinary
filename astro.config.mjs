import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify/functions";

const tina = ({
  directiveName = 'tina'
} = {}) => ({
  name: 'tina-cms',
  hooks: {
    'astro:config:setup': ({
      addClientDirective,
      opts
    }) => {
      addClientDirective({
        name: directiveName,
        entrypoint: './client-directives/tina.mjs'
      });
    }
  }
});

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  integrations: [react(), tina(), tailwind({
    applyBaseStyles: true
  })],
  adapter: netlify()
});