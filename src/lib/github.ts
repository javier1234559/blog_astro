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

function cleanMarkdown(content: string): string {
  // Regex để tìm tất cả các heading
  const headingRegex = /^(#{1,6})\s*(.+?)\s*$/gm;

  // Thay thế heading, loại bỏ tất cả dấu **
  return content.replace(headingRegex, (match, hashes, text) => {
    // Loại bỏ tất cả dấu ** từ text
    const cleanText = text.replace(/\*\*/g, "");
    return `${hashes} ${cleanText.trim()}`;
  });
}

export async function parseMarkdown(content: string) {
  try {
    console.log(content);
    const cleanedContent = cleanMarkdown(content);
    // Parse nội dung markdown
    const ast = Markdoc.parse(cleanedContent);

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
