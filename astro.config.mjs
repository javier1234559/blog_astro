import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";

import vercel from "@astrojs/vercel";

const SERVER_PORT = 4000;
const LOCALHOST_URL = `http://localhost:${SERVER_PORT}`;
const LIVE_URL = "https://nhatng.vercel.app/";
const SCRIPT = process.env.npm_lifecycle_script || "";
const isBuild = SCRIPT.includes("astro build");
let BASE_URL = LOCALHOST_URL;
if (isBuild) {
  BASE_URL = LIVE_URL;
}

// https://astro.build/config
// https://docs.astro.build/en/reference/configuration-reference/#markdownsyntaxhighlight
export default defineConfig({
  server: {
    port: SERVER_PORT
  },

  site: BASE_URL,

  integrations: [sitemap(), react(), icon(),
  tailwind({
    applyBaseStyles: false,
  }),
  ],

  markdown: {
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://shiki.style/themes
      theme: 'catppuccin-frappe',
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      // Disable the default colors
      // https://shiki.style/guide/dual-themes#without-default-color
      // (Added in v4.12.0)
      defaultColor: false,
      // Add custom languages
      // Note: Shiki has countless langs built-in, including .astro!
      // https://shiki.style/languages
      langs: [],
      // Add custom aliases for languages
      // Map an alias to a Shiki language ID: https://shiki.style/languages#bundled-languages
      // https://shiki.style/guide/load-lang#custom-language-aliases
      langAlias: {
        cjs: "javascript"
      },
      // Enable word wrap to prevent horizontal scrolling
      wrap: true,
      // Add custom transformers: https://shiki.style/guide/transformers
      // Find common transformers: https://shiki.style/packages/transformers
      transformers: [],
    },
  },

  adapter: vercel()
});