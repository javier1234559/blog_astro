import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel";
import { rehypePreButton } from './src/plugins/rehype-pre-button';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import remarkToc from 'remark-toc';

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
  integrations: [
    mdx(),
    sitemap(),
    react(),
    tailwind({
      applyBaseStyles: false,
    })
  ],
  markdown: {
    remarkPlugins: [[remarkToc, { heading: 'toc', maxDepth: 3 }]],
    rehypePlugins: [rehypePreButton, rehypeAccessibleEmojis],
    shikiConfig: {
      theme: 'catppuccin-mocha',
      wrap: true
    }
  },
  themes: {
    default: 'catppuccin-mocha'
  },
  adapter: vercel()
});