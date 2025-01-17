import { motion } from "framer-motion";
import moment from "moment";
import { useState } from "react";
import type { BlogEntry } from "@/content/content.config";
import {  badgeVariants } from "@/components/ui/badge";

export default function BlogList({
  posts,
  name,
}: {
  posts: BlogEntry[];
  name: string;
}) {
  const [search, setSearch] = useState("");

  const filteredPosts = posts.filter((post: BlogEntry) => {
    if (!search) return true;
    if(post.data.draft) return false;
    return post.data.title?.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <div className="border-b-[1px] pb-8 mb-8 border-solid border-black">
        <div className="max-w-xl ">
          <p className="mb-4 text-subtle">
            These are {posts.length} posts that I have written.
          </p>
          <div className="relative w-full">
            <form action="">
            </form>
            <input
              aria-label="Search articles"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search articles"
              className="block w-full px-4 py-2 border rounded-md bg-[#a5a6a855] focus:bg-[#a5a6a8a4] placeholder:text-black ring-[#999] outline-black transition duration-300"
            />
            <svg
              className="absolute w-5 h-5 right-3 top-3 text-subtle"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <motion.ul layout="position" transition={{ duration: 0.5 }}>
        {filteredPosts.map((post) => (
          <motion.li layout="position" key={post.slug} className="py-4">
            <article className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
              <dl>
                <dt className="sr-only">Published on</dt>
                <dd className="font-medium leading-6 text-subtle">
                  <time dateTime={post.data.date.toISOString()}>
                    {moment(post.data.date.toISOString()).format("LL")}
                  </time>
                </dd>
                {/* <div className="font-medium leading-6 text-muted">
                  <ViewCounter slug={post.slug} />
                </div> */}
              </dl>
              <div className="space-y-3 xl:col-span-3">
                <div>
                  <h3 className="text-2xl font-bold leading-8">
                    <a
                      href={`/blogs/${post.slug}`}
                      className="text-text"
                    >
                      {post.data.title}
                    </a>
                  </h3>
                  <div className="flex flex-wrap gap-3 mt-2 text-sm">
                    {post.data.hashtags?.map((tag) => (
                      <a href={`/tags/${tag}`} className={badgeVariants({ variant: "outline" })}>
                        {tag}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="prose text-subtle">{post.data?.description}</div>
              </div>
            </article>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

