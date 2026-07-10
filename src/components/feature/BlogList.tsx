import { motion } from "framer-motion";
import moment from "moment";
import { useEffect, useMemo, useRef, useState } from "react";
import type { BlogEntry } from "@/content.config";
import { badgeVariants } from "@/components/ui/badge";

const POSTS_PER_PAGE = 10;

function getPageFromUrl() {
  const pageParam = new URLSearchParams(window.location.search).get("page");
  const page = Number(pageParam);
  return Number.isInteger(page) && page > 0 ? page : 1;
}

function getPageHref(pageNumber: number) {
  return pageNumber <= 1 ? "/blogs" : `/blogs?page=${pageNumber}`;
}

function updatePageInUrl(nextPage: number, replace = false) {
  const url = new URL(window.location.href);

  if (nextPage <= 1) {
    url.searchParams.delete("page");
  } else {
    url.searchParams.set("page", String(nextPage));
  }

  const nextUrl = `${url.pathname}${url.search}${url.hash}`;
  const method = replace ? "replaceState" : "pushState";
  window.history[method]({}, "", nextUrl);
}

function paginationControlClass({
  active = false,
  disabled = false,
}: {
  active?: boolean;
  disabled?: boolean;
}) {
  return [
    "border-0 bg-transparent p-0 text-lg font-medium text-text",
    "underline-offset-[6px] decoration-2 transition-opacity",
    active ? "underline" : "no-underline hover:underline",
    disabled
      ? "opacity-40 cursor-not-allowed pointer-events-none hover:no-underline"
      : "cursor-pointer",
  ].join(" ");
}

export default function BlogList({
  posts,
  name,
  initialPage = 1,
}: {
  posts: BlogEntry[];
  name: string;
  initialPage?: number;
}) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(initialPage);
  const isFirstSearchEffect = useRef(true);

  const filteredPosts: BlogEntry[] = useMemo(
    () =>
      posts.filter((post: BlogEntry) => {
        if (!search) return true;
        if (post.data.draft) return false;
        return post.data.title?.toLowerCase().includes(search.toLowerCase());
      }),
    [posts, search]
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  );
  const currentPage = Math.min(page, totalPages);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  useEffect(() => {
    const syncPageFromUrl = () => {
      setPage(getPageFromUrl());
    };

    syncPageFromUrl();
    window.addEventListener("popstate", syncPageFromUrl);
    document.addEventListener("astro:page-load", syncPageFromUrl);

    return () => {
      window.removeEventListener("popstate", syncPageFromUrl);
      document.removeEventListener("astro:page-load", syncPageFromUrl);
    };
  }, []);

  useEffect(() => {
    if (isFirstSearchEffect.current) {
      isFirstSearchEffect.current = false;
      return;
    }

    setPage(1);
    updatePageInUrl(1, true);
  }, [search]);

  useEffect(() => {
    if (page > totalPages) {
      const clampedPage = totalPages;
      setPage(clampedPage);
      updatePageInUrl(clampedPage, true);
    }
  }, [page, totalPages]);

  const getPostSlug = (post: BlogEntry) => post.data.slug ?? post.id;

  const goToPage = (nextPage: number, replace = false) => {
    if (nextPage < 1 || nextPage > totalPages) return;
    setPage(nextPage);
    updatePageInUrl(nextPage, replace);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pageStart =
    filteredPosts.length === 0 ? 0 : (currentPage - 1) * POSTS_PER_PAGE + 1;
  const pageEnd = Math.min(currentPage * POSTS_PER_PAGE, filteredPosts.length);

  return (
    <div>
      <div className="border-b-[1px] pb-8 mb-8 border-solid border-black">
        <div className="max-w-xl ">
          <p className="mb-4 text-subtle">
            {filteredPosts.length === 0
              ? "No posts found."
              : `Showing ${pageStart}-${pageEnd} of ${filteredPosts.length} posts.`}
          </p>
          <div className="relative w-full">
            <form action=""></form>
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
        {paginatedPosts.map((post) => (
          <motion.li layout="position" key={getPostSlug(post)} className="py-4">
            <article className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
              <dl>
                <dt className="sr-only">Published on</dt>
                <dd className="font-medium leading-6 text-subtle">
                  <time dateTime={new Date(post.data.date).toISOString()}>
                    {moment(new Date(post.data.date).toISOString()).format(
                      "LL"
                    )}
                  </time>
                </dd>
              </dl>
              <div className="space-y-3 xl:col-span-3">
                <div>
                  <h3 className="text-2xl font-bold leading-8">
                    <a
                      href={`/blogs/${getPostSlug(post)}`}
                      className="text-text"
                    >
                      {post.data.title}
                    </a>
                  </h3>
                  <div className="flex flex-wrap gap-3 mt-2 text-sm">
                    {post.data.categories?.map((category) => (
                      <a
                        key={category.name}
                        href={`/tags/${category.name}`}
                        className={badgeVariants({ variant: "outline" })}
                      >
                        {category.name}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="prose text-subtle">
                  {post.data?.description}
                </div>
              </div>
            </article>
          </motion.li>
        ))}
      </motion.ul>

      {totalPages > 1 && (
        <nav
          className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
          aria-label="Blog pagination"
        >
          <a
            href={getPageHref(currentPage - 1)}
            onClick={(event) => {
              event.preventDefault();
              goToPage(currentPage - 1);
            }}
            aria-disabled={currentPage === 1}
            className={paginationControlClass({ disabled: currentPage === 1 })}
          >
            Previous
          </a>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <a
                  key={pageNumber}
                  href={getPageHref(pageNumber)}
                  onClick={(event) => {
                    event.preventDefault();
                    goToPage(pageNumber);
                  }}
                  aria-current={pageNumber === currentPage ? "page" : undefined}
                  className={paginationControlClass({
                    active: pageNumber === currentPage,
                  })}
                >
                  {pageNumber}
                </a>
              )
            )}
          </div>

          <a
            href={getPageHref(currentPage + 1)}
            onClick={(event) => {
              event.preventDefault();
              goToPage(currentPage + 1);
            }}
            aria-disabled={currentPage === totalPages}
            className={paginationControlClass({
              disabled: currentPage === totalPages,
            })}
          >
            Next
          </a>
        </nav>
      )}
    </div>
  );
}
