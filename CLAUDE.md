# betk-publishing

Frontend for Finnish BETK 2.0 (precast supply-chain data and application guides).
This repo renders. Data parsing / Excel→JSON is a separate project.

Live URL: `https://betk.fi` (GitHub Pages). BEC 1.0 is legacy and not this site.

## Stack

- Astro 6 + TypeScript. App lives in `ui/`.
- Node `>= 22.12`. Dependencies: `ui/package.json`. Install with `npm ci` from `ui/`.
- Deploy: `.github/workflows/deploy.yml` on push to `main`.
- Do not install npm/python/cargo packages unless the user says so.

## Layout

| Path | What |
|------|------|
| `content/` | Editor-facing prose, `meta.json`, `manifest.json`, tables, images |
| `content/landing/` | Home page sections |
| `content/peppol/` | Peppol page sections |
| `content/soveltamisohje/<slug>/` | Application guides |
| `ui/src/pages/` | Routes |
| `ui/src/data/` | Catalog JSON this UI reads, plus loaders |
| `.pages.yml` | Pages CMS schema for `content/soveltamisohje` |

Routes: `/`, `/properties`, `/propertysets`, `/soveltamisohje/<slug>`, `/peppol`, `/sanasto`, `/esimerkkimallit`.

Catalog JSON is consumed from `ui/src/data/` (`precast.json`, `precastProperties.json`, `valutarvike*.json`). Do not add a parser or Excel pipeline here.

`astro.config.mjs`: `site: 'https://betk.fi'`, `base: '/'`. Do not put `/betk-publishing/` back in asset URLs.

## Content rules

Every markdown file in a content collection needs frontmatter:

```yaml
title: ...
order: 1
section: "1"
```

`order` and `section` are required by `ui/src/content.config.ts`. Pages CMS will strip any field missing from `.pages.yml` — keep `title`, `order`, and `section` listed there.

`manifest.json` `content` values are filename stems. Renaming `01-tausta.md` without updating the manifest (and any other stem reference) drops that section with no build error. After a rename, grep the old stem across `content/` and `ui/src/`.

## Working here

Small diffs. Touch only what the task needs. Prefer editing existing files.
