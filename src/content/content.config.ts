import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const BlogSchema = z.object({
  external: z.boolean(),
  draft: z.boolean().default(false),
  title: z.string(),
  description: z.string(),
  date: z.date(),
  hashtags: z.array(z.string()).optional(), 
})

export type BlogFromSchema = z.infer<typeof BlogSchema>;

const blog = defineCollection({ 
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: BlogSchema,
});

export const collections = { blog };
export type CollectionEntry<CollectionName extends string, Schema> = {
  id: string;
  slug: string;
  body: string;
  collection: CollectionName;
  data: Schema;
  filePath: string;
  digest: string;
  rendered: {
    html: string;
    metadata: Record<string, unknown>;
  };
  render: () => Promise<{ html: string }>;
};

export type BlogEntry = CollectionEntry<'blog', BlogFromSchema>;