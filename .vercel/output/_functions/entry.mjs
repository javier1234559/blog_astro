import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_BuLFy7e-.mjs';
import { manifest } from './manifest_CwVcemg6.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/blogs/_slug_.astro.mjs');
const _page3 = () => import('./pages/blogs.astro.mjs');
const _page4 = () => import('./pages/post/_id_.astro.mjs');
const _page5 = () => import('./pages/projects.astro.mjs');
const _page6 = () => import('./pages/rss.xml.astro.mjs');
const _page7 = () => import('./pages/tags.astro.mjs');
const _page8 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/blogs/[slug].astro", _page2],
    ["src/pages/blogs/index.astro", _page3],
    ["src/pages/post/[id].astro", _page4],
    ["src/pages/projects/index.astro", _page5],
    ["src/pages/rss.xml.ts", _page6],
    ["src/pages/tags.astro", _page7],
    ["src/pages/index.astro", _page8]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "e1fd24e5-46f5-47ab-8368-b9a0c5142a8c",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
