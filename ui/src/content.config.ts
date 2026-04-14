import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const soveltamisohje = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/soveltamisohje" }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    section: z.string(),
  }),
});

export const collections = { soveltamisohje };
