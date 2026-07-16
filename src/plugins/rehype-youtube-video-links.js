const VIDEO_LINK_TEXT = "video";

function getTextContent(node) {
  if (!node) return "";
  if (node.type === "text") return node.value || "";
  if (!Array.isArray(node.children)) return "";

  return node.children.map(getTextContent).join("");
}

function parseStartSeconds(value) {
  if (!value) return undefined;
  if (/^\d+$/.test(value)) return value;

  const match = value.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/);
  if (!match) return undefined;

  const hours = Number(match[1] || 0);
  const minutes = Number(match[2] || 0);
  const seconds = Number(match[3] || 0);
  const total = hours * 3600 + minutes * 60 + seconds;

  return total > 0 ? String(total) : undefined;
}

function getYoutubeEmbedUrl(value) {
  let url;

  try {
    url = new URL(value);
  } catch {
    return undefined;
  }

  const host = url.hostname.replace(/^www\./, "");
  let videoId;

  if (host === "youtu.be") {
    videoId = url.pathname.split("/").filter(Boolean)[0];
  }

  if (host === "youtube.com" || host === "m.youtube.com") {
    if (url.pathname === "/watch") {
      videoId = url.searchParams.get("v") || undefined;
    }

    if (url.pathname.startsWith("/shorts/")) {
      videoId = url.pathname.split("/").filter(Boolean)[1];
    }

    if (url.pathname.startsWith("/embed/")) {
      videoId = url.pathname.split("/").filter(Boolean)[1];
    }
  }

  if (!videoId) return undefined;

  const embedParams = new URLSearchParams();
  const playlistId = url.searchParams.get("list");
  const start = parseStartSeconds(
    url.searchParams.get("start") || url.searchParams.get("t")
  );

  if (playlistId) embedParams.set("list", playlistId);
  if (start) embedParams.set("start", start);

  const query = embedParams.toString();
  return `https://www.youtube.com/embed/${videoId}${query ? `?${query}` : ""}`;
}

function isWhitespaceText(node) {
  return node?.type === "text" && !node.value.trim();
}

function isStandaloneVideoLink(node) {
  if (node?.type !== "element" || node.tagName !== "p") return false;

  const meaningfulChildren = (node.children || []).filter(
    (child) => !isWhitespaceText(child)
  );

  if (meaningfulChildren.length !== 1) return false;

  const link = meaningfulChildren[0];
  if (link.type !== "element" || link.tagName !== "a") return false;

  const label = getTextContent(link).trim().toLowerCase();
  return label === VIDEO_LINK_TEXT && Boolean(link.properties?.href);
}

function createYoutubeEmbedNode(embedUrl, label) {
  return {
    type: "element",
    tagName: "div",
    properties: {
      className: ["youtube-embed"],
    },
    children: [
      {
        type: "element",
        tagName: "iframe",
        properties: {
          className: ["youtube-embed__iframe"],
          src: embedUrl,
          title: label || "YouTube video",
          loading: "lazy",
          frameBorder: "0",
          allow:
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
          allowFullScreen: true,
        },
        children: [],
      },
    ],
  };
}

function transformNode(node) {
  if (!Array.isArray(node.children)) return;

  node.children = node.children.map((child) => {
    if (isStandaloneVideoLink(child)) {
      const link = child.children.find(
        (linkChild) => linkChild.type === "element" && linkChild.tagName === "a"
      );
      const embedUrl = getYoutubeEmbedUrl(link.properties.href);

      if (embedUrl) {
        return createYoutubeEmbedNode(embedUrl, getTextContent(link).trim());
      }
    }

    transformNode(child);
    return child;
  });
}

export function rehypeYoutubeVideoLinks() {
  return (tree) => {
    transformNode(tree);
  };
}
