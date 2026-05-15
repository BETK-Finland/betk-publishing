# Lessons

Concrete rules learned from corrections. Per CLAUDE.md "Self-improvement" — keep these tight and triggered, not aspirational.

## Renaming a content-collection entry requires updating consumers

**Trigger:** Renaming any file that maps to a content-collection entry ID (Astro `getEntry`, `getCollection`, content-collection filename → ID), or renaming any value used as a lookup key elsewhere in the codebase.

**Rule:** Before completing a rename, grep for the OLD identifier (entry ID, slug, key) across the entire codebase — not just the filename. Astro content-collection entry IDs are derived from filenames minus extension; renaming `landing-page.md` → `page.mdx` silently changes the entry ID and any `getEntry("collection", "landing-page")` call becomes a silent lookup failure with no build error.

**Specific to this project:**
- `ui/src/pages/*.astro` consumes content-collection entries via `getEntry("landing", <id>)` and `getCollection("soveltamisohje").filter(e => e.id.startsWith(...))`. Both are stringly typed.
- After any rename in `content/`, grep for both the old filename stem and the old ID-shaped string in `.astro` files.

**Bug history:** In the editor-friendly-content-restructure work (Phase 1), renamed `landing-page.md` → `page.mdx`. Did not update `index.astro` which still queried `getEntry("landing", "landing-page")`. Result: landing page rendered as empty (the `?? "BETK …"` fallback hit). User caught it; cost a Phase 2b correction.

**See also:** CLAUDE.md "Exhaustive search" — "When renaming or tracing any identifier, search separately for every surface form it can appear in".
