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
| `content/` | Editor-facing prose. See `content/README.md`. |
| `content/peppol/` | Peppol page sections (old numbered + manifest) |
| `content/soveltamisohje/<slug>/` | Application guides (manifest required) |
| `content/media/` | Media posts — one `.md` each, no manifest |
| `content/tyoryhmat/` | Work-group pages — `betk.md`, `vakiointi.md`, `rajapinta.md`, `valutarvike.md` |
| `ui/src/pages/` | Routes |
| `ui/src/data/` | Catalog JSON this UI reads, plus loaders |
| `.pages.yml` | Pages CMS schema for soveltamisohje, media, and työryhmät |

Routes: `/`, `/properties`, `/propertysets`, `/soveltamisohje/<slug>`, `/peppol`, `/sanasto`, `/esimerkkimallit`, `/media`, `/media/<slug>`, `/tyoryhmat/<slug>`.

Catalog JSON is consumed from `ui/src/data/` (`precast.json`, `precastProperties.json`, `valutarvike*.json`). Do not add a parser or Excel pipeline here.

`astro.config.mjs`: `site: 'https://betk.fi'`, `base: '/'`. Do not put `/betk-publishing/` back in asset URLs.

## Content rules

Soveltamisohje and Peppol markdown need:

```yaml
title: ...
order: 1
section: "1"
```

Media needs `title` (optional `date`). Työryhmät need `title` only. Pages CMS will strip any field missing from `.pages.yml`.

`manifest.json` `content` values are filename stems (soveltamisohje, peppol only). Renaming `01-tausta.md` without updating the manifest drops that section with no build error. After a rename, grep the old stem across `content/` and `ui/src/`.

Homepage copy is hardcoded in `ui/src/pages/index.astro` and `ui/src/i18n.ts`. Do not put it back in `content/`.

## Working here

Small diffs. Touch only what the task needs. Prefer editing existing files.
