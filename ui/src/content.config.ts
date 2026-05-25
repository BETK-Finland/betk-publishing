import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const soveltamisohje = defineCollection({
  loader: glob({ pattern: "*/[0-9]*.md", base: "../content/soveltamisohje" }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    section: z.string(),
  }),
});

const landing = defineCollection({
  loader: glob({ pattern: "[0-9]*.md", base: "../content/landing" }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    section: z.string(),
  }),
});

const peppol = defineCollection({
  loader: glob({ pattern: "[0-9]*.md", base: "../content/peppol" }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    section: z.string(),
  }),
});

export const collections = { soveltamisohje, landing, peppol };
