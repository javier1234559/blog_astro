import { b as createAstro, c as createComponent, r as renderTemplate, f as renderHead } from '../../chunks/astro/server_DB_MCi9a.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                   */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://nhatng.vercel.app/");
const prerender = false;
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  if (typeof id !== "string") {
    throw Error(`id should be string. Received: ${id}`);
  }
  let post;
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.statusText}`);
    }
    post = await response.json();
  } catch (error) {
    return new Response(null, {
      status: 404,
      statusText: "Not Found"
    });
  }
  return renderTemplate`<html lang="en" data-astro-cid-z6omihxq> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">${renderHead()}</head> <body data-astro-cid-z6omihxq> <section class="px-6 py-12 max-w-7xl mx-auto min-h-[80vh]" data-astro-cid-z6omihxq> <h1 class="text-3xl mb-4 font-bold uppercase md:text-5xl" data-astro-cid-z6omihxq>${post.title}</h1> <p class="text-gray-500 mb-8" data-astro-cid-z6omihxq>Post ID: ${post.id}</p> <article class="prose prose-lg max-w-none" data-astro-cid-z6omihxq> <p data-astro-cid-z6omihxq>${post.body}</p> </article> </section> </body></html>`;
}, "/Users/mac/Desktop/Work/Project/JAMSTACK/blog_astro/src/pages/post/[id].astro", undefined);

const $$file = "/Users/mac/Desktop/Work/Project/JAMSTACK/blog_astro/src/pages/post/[id].astro";
const $$url = "/post/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
