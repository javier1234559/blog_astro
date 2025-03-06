import { parseISO, isValid } from "date-fns";
import fs from "fs/promises";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "src/content/blog");

// Utility function to calculate reading time
export function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

// Utility function to create slug from title support vietnamese
export function createSlugFromTitle(title) {
  const vietnameseMap = {
    'à': 'a', 'á': 'a', 'ạ': 'a', 'ả': 'a', 'ã': 'a', 'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ậ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ặ': 'a', 'ẳ': 'a', 'ẵ': 'a',
    'è': 'e', 'é': 'e', 'ẹ': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ê': 'e', 'ề': 'e', 'ế': 'e', 'ệ': 'e', 'ể': 'e', 'ễ': 'e',
    'ì': 'i', 'í': 'i', 'ị': 'i', 'ỉ': 'i', 'ĩ': 'i',
    'ò': 'o', 'ó': 'o', 'ọ': 'o', 'ỏ': 'o', 'õ': 'o', 'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ộ': 'o', 'ổ': 'o', 'ỗ': 'o', 'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ợ': 'o', 'ở': 'o', 'ỡ': 'o',
    'ù': 'u', 'ú': 'u', 'ụ': 'u', 'ủ': 'u', 'ũ': 'u', 'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ự': 'u', 'ử': 'u', 'ữ': 'u',
    'ỳ': 'y', 'ý': 'y', 'ỵ': 'y', 'ỷ': 'y', 'ỹ': 'y',
    'đ': 'd',
    // Uppercase
    'À': 'a', 'Á': 'a', 'Ạ': 'a', 'Ả': 'a', 'Ã': 'a', 'Â': 'a', 'Ầ': 'a', 'Ấ': 'a', 'Ậ': 'a', 'Ẩ': 'a', 'Ẫ': 'a', 'Ă': 'a', 'Ằ': 'a', 'Ắ': 'a', 'Ặ': 'a', 'Ẳ': 'a', 'Ẵ': 'a',
    'È': 'e', 'É': 'e', 'Ẹ': 'e', 'Ẻ': 'e', 'Ẽ': 'e', 'Ê': 'e', 'Ề': 'e', 'Ế': 'e', 'Ệ': 'e', 'Ể': 'e', 'Ễ': 'e',
    'Ì': 'i', 'Í': 'i', 'Ị': 'i', 'Ỉ': 'i', 'Ĩ': 'i',
    'Ò': 'o', 'Ó': 'o', 'Ọ': 'o', 'Ỏ': 'o', 'Õ': 'o', 'Ô': 'o', 'Ồ': 'o', 'Ố': 'o', 'Ộ': 'o', 'Ổ': 'o', 'Ỗ': 'o', 'Ơ': 'o', 'Ờ': 'o', 'Ớ': 'o', 'Ợ': 'o', 'Ở': 'o', 'Ỡ': 'o',
    'Ù': 'u', 'Ú': 'u', 'Ụ': 'u', 'Ủ': 'u', 'Ũ': 'u', 'Ư': 'u', 'Ừ': 'u', 'Ứ': 'u', 'Ự': 'u', 'Ử': 'u', 'Ữ': 'u',
    'Ỳ': 'y', 'Ý': 'y', 'Ỵ': 'y', 'Ỷ': 'y', 'Ỹ': 'y',
    'Đ': 'd'
  };

  return title
    .split('')
    .map(char => vietnameseMap[char] || char)
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 200);
}

export async function clearContentDirectory() {
  try {
    try {
      await fs.rm(CONTENT_DIR, { recursive: true, force: true });
    } catch (error) {
      if (error.code !== 'ENOENT') {
        console.error(`Error deleting content directory:`, error);
      }
    }

    await fs.mkdir(CONTENT_DIR, { recursive: true });

    return true;
  } catch (error) {
    console.error('Error resetting content directory:', error);
    return false;
  }
}

export async function generateMarkdownFile(post) {
  // Escape special characters in strings
  const escapeString = (str) => {
    if (!str) return "";
    // Escape quotes and special characters
    return str.replace(/"/g, '\\"').replace(/\n/g, "\\n");
  };

  const frontmatter = [
    "---",
    "external: false",
    `draft: ${post.draft}`,
    `title: "${escapeString(post.title)}"`,
    post.description
      ? `description: "${escapeString(post.description)}"`
      : null,
    post.date ? `date: "${post.date}"` : null,
    post.author ? `author: "${escapeString(post.author)}"` : null,
    `slug: "${post.slug}"`,
    post.status ? `status: "${post.status}"` : null,
    post.url ? `url: "${escapeString(post.url)}"` : null,
    post.categories?.length > 0
      ? `categories:\n${post.categories
        .map((cat) => `  - name: "${cat.name}"\n    color: "${cat.color}"`)
        .join("\n")}`
      : null,
    `readingTime: "${post.readingTime}"`,
    "---",
    "",
    post.content || "No content available.",
    "",
  ]
    .filter(Boolean) // Remove null values
    .join("\n");

  // Create markdown directory if it doesn't exist
  const markdownDir = CONTENT_DIR;
  await fs.mkdir(markdownDir, { recursive: true });

  // Create file path using slug
  const filePath = path.join(markdownDir, `${post.slug}.md`);

  try {
    // Check if file exists
    const exists = await fs
      .access(filePath)
      .then(() => true)
      .catch(() => false);

    if (exists) {
      console.log(`Updating existing file: ${post.slug}.md`);
    } else {
      console.log(`Creating new file: ${post.slug}.md`);
    }

    // Write the content to file
    await fs.writeFile(filePath, frontmatter, "utf8");
    console.log(
      `Successfully ${exists ? "updated" : "created"}: ${post.slug}.md`
    );

    return {
      success: true,
      path: filePath,
      isNew: !exists,
    };
  } catch (error) {
    console.error(`Error writing markdown file for ${post.slug}:`, error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export function formatDate(dateInput) {
  if (!dateInput) return null;

  try {
    let date;

    // Handle Notion date object
    if (typeof dateInput === 'object') {
      const dateStr = dateInput.start || dateInput.date?.start;
      if (dateStr) {
        date = parseISO(dateStr);
      }
    }
    // Handle string input
    else if (typeof dateInput === 'string') {
      date = parseISO(dateInput);
    }

    // Return Date object if valid, null if not
    return isValid(date) ? date : null;

  } catch (error) {
    console.warn('Error formatting date:', error);
    return null;
  }
}
