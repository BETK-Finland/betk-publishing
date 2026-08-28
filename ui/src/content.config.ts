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

const peppol = defineCollection({
  loader: glob({ pattern: "[0-9]*.md", base: "../content/peppol" }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    section: z.string(),
  }),
});

const media = defineCollection({
  loader: glob({ pattern: "*.md", base: "../content/media" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date().optional(),
  }),
});

const tyoryhmat = defineCollection({
  loader: glob({ pattern: "*.md", base: "../content/tyoryhmat" }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { soveltamisohje, peppol, media, tyoryhmat };
