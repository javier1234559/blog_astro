import { Client } from "@notionhq/client";
import dotenv from "dotenv";
import { NotionToMarkdown } from "notion-to-md";
import { formatDate, createSlugFromTitle, calculateReadingTime, generateMarkdownFile, clearContentDirectory, processMarkdownImages, clearImagesDirectory } from './utils.js';

// Load environment variables from .env file
dotenv.config();

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

if (!NOTION_TOKEN || !NOTION_DATABASE_ID) {
  throw new Error('Required environment variables are not set: NOTION_TOKEN or NOTION_DATABASE_ID');
}

export const notion = new Client({
  auth: NOTION_TOKEN,
});


async function fetchPageContent(pageId) {
  try {
    // Fetch page detail
    const response = await notion.pages.retrieve({ page_id: pageId });

    // Convert to markdown using notion-to-md
    const n2m = new NotionToMarkdown({ notionClient: notion });

    // Get page blocks
    const mdblocks = await n2m.pageToMarkdown(pageId);
    const mdString = n2m.toMarkdownString(mdblocks);

    return mdString.parent;
  } catch (error) {
    console.error(`Error fetching page content for ${pageId}:`, error);
    return null;
  }
}

export const extractPosts = async (response) => {
  const databaseItems = response.results.map(
    (databaseItem) => databaseItem
  );

  const posts = await Promise.all(
    databaseItems.map(async (postInDB) => {
      const content = await fetchPageContent(postInDB.id);

      const title = postInDB.properties.Name.title[0]?.plain_text;
      if (!title) {
        console.warn(`Skipping post ${postInDB.id} - no title found`);
        return null;
      }

      const post = {
        title,
        content: content || '',
        slug: postInDB.properties.Slug.rich_text[0]?.plain_text || createSlugFromTitle(title),
        description: postInDB.properties["SEO Description"].rich_text[0]?.plain_text,
        date: postInDB.properties["Create at"].date?.start,
        author: postInDB.properties.Author.people[0]?.name,
        categories: postInDB.properties.HashTag.multi_select || [],
        status: postInDB.properties.Status.status?.name,
        external: false,
        draft: false
      };

      // Validate required fields and set draft status
      if (!post.description || !post.date || !post.author || !content) {
        try {
          post.date = formatDate(post.date);
        } catch (error) {
          console.log(error);
        }

        post.draft = true;
        console.warn(`Post "${title}" marked as draft due to missing required fields`);
      }

      // Set draft status based on Notion status
      if (post.status === 'Draft' || post.status === 'Editing') {
        post.draft = true;
      }

      post.readingTime = calculateReadingTime(post.content);

      return post;
    }),
  );

  return posts.filter(post => post !== null);
};


export async function getListPost() {
  const databaseId = process.env.NOTION_DATABASE_ID || "";
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Status",
      status: {
        equals: "Published",
      },
    },
  });
  const posts = await extractPosts(response);
  return posts;
}



async function main() {
  try {
    // Clear both content and images directories
    await Promise.all([
      clearContentDirectory(),
      clearImagesDirectory()
    ]);

    const posts = await getListPost();
    console.log(`Processing ${posts.length} posts...`);

    for (const post of posts) {
      // Process images in content before generating markdown
      post.content = await processMarkdownImages(post.content);

      const result = await generateMarkdownFile(post);
      if (result.success) {
        console.log(`✅ ${result.isNew ? 'Created' : 'Updated'}: ${result.path}`);
      } else {
        console.error(`❌ Failed to process ${post.slug}: ${result.error}`);
      }
    }
  } catch (error) {
    console.error('Error in main process:', error);
  }
}


main().catch(console.error);