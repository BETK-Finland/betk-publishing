import { defineCollection, z } from "astro:content";

const soveltamisohje = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    order: z.number(),
    section: z.string(),
  }),
});

export const collections = { soveltamisohje };
