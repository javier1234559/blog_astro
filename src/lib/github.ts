import { CACHE_TTL, GITHUB_API_URL } from "../config";
import Markdoc from "@markdoc/markdoc";
import { config } from "./markdoc/markdoc.config";
import { getCachedData } from "./cache";

export async function fetchSingleGithubContentCache(
  slug: string,
  downloadUrl: string
): Promise<string> {
  return getCachedData(
    `file-${slug}`,
    async () => {
      const response = await fetch(downloadUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.text();
    },
    CACHE_TTL
  );
}

export async function fetchGitHubContentsCache() {
  return getCachedData(
    "github-contents",
    async () => {
      const response = await fetch(GITHUB_API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.filter(
        (item) => item.type === "file" && item.name.endsWith(".md")
      );
    },
    CACHE_TTL
  ); // Cache for 1 hour
}

export async function parseMarkdown(content: string) {
  try {
    // Parse nội dung markdown
    const ast = Markdoc.parse(content);

    // Validate AST với config
    const errors = Markdoc.validate(ast, config);
    if (errors.length) {
      console.error("Markdoc validation errors:", errors);
      throw new Error("Markdoc validation failed");
    }

    // Transform AST thành cấu trúc dữ liệu có thể render
    const transformedContent = Markdoc.transform(ast, config);

    return transformedContent;
    // // Chuyển đổi Node thành HTML
    // const html = Markdoc.renderers.html(transformedContent);

    // return html;
  } catch (error) {
    console.error("Error parsing markdown:", error);
    throw error; // Re-throw để caller có thể xử lý
  }
}
