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
    // Optional translated title/intro for the language switcher (fi/sv/en).
    // The linked material itself (PDF/video/article) is not re-translated;
    // only the site's own title + short intro line are. `original_lang`
    // says what language the linked material actually is in (defaults to
    // "fi" since that's true for almost all posts) so the "original
    // material is in X" note is only shown, and only says the right
    // language, when it doesn't match the reader's chosen site language.
    title_sv: z.string().optional(),
    title_en: z.string().optional(),
    excerpt_sv: z.string().optional(),
    excerpt_en: z.string().optional(),
    original_lang: z.enum(["fi", "sv", "en"]).optional().default("fi"),
  }),
});

const tyoryhmat = defineCollection({
  loader: glob({ pattern: "*.md", base: "../content/tyoryhmat" }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { soveltamisohje, peppol, media, tyoryhmat };
