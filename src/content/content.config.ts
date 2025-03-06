import { type CollectionEntry, defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const BlogSchema = z.object({
  external: z.boolean().default(false),
  draft: z.boolean().default(false),
  title: z.string(),
  description: z.string().optional(),
  date: z.coerce.date(),
  author: z.string().optional(),
  slug: z.string(),
  status: z.string().optional(),
  url: z.string().optional(),
  categories: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        color: z.string(),
      })
    )
    .optional(),
  content: z.string().optional(),
  hashtags: z.array(z.string()).optional(),
});

export type BlogFromSchema = z.infer<typeof BlogSchema>;

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: BlogSchema,
});

export const collections = { blog };
// export type CollectionEntry<CollectionName extends string, Schema> = {
//   id: string;
//   slug: string;
//   body: string;
//   collection: CollectionName;
//   data: Schema;
//   filePath: string;
//   digest: string;
//   rendered: {
//     html: string;
//     metadata: Record<string, unknown>;
//   };
//   render: () => Promise<{ html: string }>;
// };

export type BlogEntry = CollectionEntry<"blog">;
