// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// Define a `type` and `schema` for each collection
const relatedCollection = defineCollection({
    type: 'data',
    schema: z.object({
      title: z.string(),
      date: z.string(),
      file: z.string(),
      related: z.array(z.object({
        id: z.string(),
        title: z.string(),
        featuredImg: z.object({
          alt: z.string().optional(),
          src: z.string(),
          title: z.string().optional(),
        }).optional(),
      })).optional(),
    })
});
// Export a single `collections` object to register your collection(s)
export const collections = {
  related: relatedCollection,
};