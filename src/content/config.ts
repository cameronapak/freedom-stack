// NOTE: Any time this config changes, make sure to turn off the server
// and run `npx astro sync`.
import { z, defineCollection } from "astro:content";

// Define a `type` and `schema` for each collection.
const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    author: z.string(),
    image: z.object({
      url: z.string(),
      alt: z.string().optional()
    }).optional(),
    tags: z.array(z.string()).optional(),
  })
});

// Export a single `collections` object to register your collection(s).
export const collections = {
  posts: postsCollection,
};
