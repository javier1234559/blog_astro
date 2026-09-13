type PageMeta = {
  title: string;
  description?: string;
  canonicalUrl?: string;
};

type PageOgMeta = {
  title: string;
  description?: string;
  type: "website";
  url?: string;
  siteName?: string;
  locale?: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: string;
  imageHeight?: string;
};

type PageTwitterMeta = {
  title: string;
  description?: string;
  card: "summary_large_image";
  site?: string;
  creator?: string;
  image?: string;
  imageAlt?: string;
};

type BlogPostOgMeta = {
  title: string;
  description?: string;
  type: "article";
  url?: string;
  siteName?: string;
  locale?: string;
  author?: string;
  publishDate: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: string;
  imageHeight?: string;
};

type BlogPostTwitterMeta = {
  title: string;
  description?: string;
  card: "summary_large_image";
  site?: string;
  creator?: string;
  image?: string;
  imageAlt?: string;
};

export function getPageMeta({
  title: pageTitle,
  description,
  baseUrl,
  pagePath,
  siteName,
  locale,
  ogImageAbsoluteUrl,
  ogImageAltText,
  ogImageWidth,
  ogImageHeight,
  siteOwnerTwitterHandle,
  contentAuthorTwitterHandle,
}: {
  title: string;
  description: string;
  baseUrl?: string;
  pagePath?: string;
  siteName?: string;
  locale?: string;
  ogImageAbsoluteUrl?: string;
  ogImageAltText?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  siteOwnerTwitterHandle?: string;
  contentAuthorTwitterHandle?: string;
}): { meta: PageMeta; og: PageOgMeta; twitter: PageTwitterMeta } {
  if (!pageTitle) {
    throw Error("title is required for page SEO");
  }
  if (ogImageAbsoluteUrl) {
    ogImageAltText = !ogImageAltText
      ? `Preview image for ${pageTitle}`
      : ogImageAltText;
  }

  const pageUrl =
    baseUrl && pagePath
      ? new URL(pagePath, baseUrl).toString()
      : baseUrl;

  const meta: PageMeta = {
    title: pageTitle,
    description,
    canonicalUrl: pageUrl,
  };

  const og: PageOgMeta = {
    title: pageTitle,
    description,
    type: "website",
    url: pageUrl,
    siteName,
    locale,
    image: ogImageAbsoluteUrl,
    imageAlt: ogImageAltText,
    imageWidth: ogImageWidth ? String(ogImageWidth) : undefined,
    imageHeight: ogImageHeight ? String(ogImageHeight) : undefined,
  };

  const twitter: PageTwitterMeta = {
    title: pageTitle,
    description,
    card: "summary_large_image",
    site: siteOwnerTwitterHandle,
    creator: contentAuthorTwitterHandle || siteOwnerTwitterHandle,
    image: ogImageAbsoluteUrl,
    imageAlt: ogImageAltText,
  };

  return {
    meta,
    og,
    twitter,
  };
}

export function getBlogPostMeta({
  title: pageTitle,
  description,
  canonicalUrl,
  pageUrl,
  siteName,
  locale,
  authorName,
  publishDate,
  ogImageAbsoluteUrl,
  ogImageAltText,
  ogImageWidth,
  ogImageHeight,
  siteOwnerTwitterHandle,
  contentAuthorTwitterHandle,
}: {
  title: string;
  description: string;
  canonicalUrl?: string;
  pageUrl?: string;
  siteName?: string;
  locale?: string;
  authorName?: string;
  publishDate: string;
  ogImageAbsoluteUrl?: string;
  ogImageAltText?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  siteOwnerTwitterHandle?: string;
  contentAuthorTwitterHandle?: string;
}): { meta: PageMeta; og: BlogPostOgMeta; twitter: BlogPostTwitterMeta } {
  if (!pageTitle) {
    throw Error("title is required for page SEO");
  }
  if (ogImageAbsoluteUrl && !ogImageAltText) {
    ogImageAltText = `Preview image for ${pageTitle}`;
  }

  const resolvedUrl = canonicalUrl || pageUrl;

  const meta: PageMeta = {
    title: pageTitle,
    description,
    canonicalUrl: resolvedUrl,
  };

  const og: BlogPostOgMeta = {
    title: pageTitle,
    description,
    type: "article",
    url: pageUrl,
    siteName,
    locale,
    author: authorName,
    publishDate,
    image: ogImageAbsoluteUrl,
    imageAlt: ogImageAltText,
    imageWidth: ogImageWidth ? String(ogImageWidth) : undefined,
    imageHeight: ogImageHeight ? String(ogImageHeight) : undefined,
  };

  const twitter: BlogPostTwitterMeta = {
    title: pageTitle,
    description,
    card: "summary_large_image",
    site: siteOwnerTwitterHandle,
    creator: contentAuthorTwitterHandle || siteOwnerTwitterHandle,
    image: ogImageAbsoluteUrl,
    imageAlt: ogImageAltText,
  };

  return {
    meta,
    og,
    twitter,
  };
}
