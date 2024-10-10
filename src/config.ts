// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "Nhat Nguyen's Blog";
export const SITE_DESCRIPTION =
  "Welcome to my blog! I write about modern web development and other things I find interesting.";
export const TWITTER_HANDLE = "@@_nhatng";
export const MY_NAME = "Nhat Nguyen";

export const GITHUB_API_URL =
  "https://api.github.com/repos/javier1234559/javier-obsidian/contents/docs/Project/Issue";

export const CACHE_TTL = 3600000; // 1 hour in milliseconds

// setup in astro.config.mjs
const BASE_URL = new URL(import.meta.env.SITE);
export const SITE_URL = BASE_URL.origin;
