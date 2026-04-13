// @ts-check
import { defineConfig } from 'astro/config';

// Deployed at https://betk-finland.github.io/betk-publishing/
// outDir points at the repo-root docs/ folder so `npm run build` writes
// straight into what GitHub Pages serves.
export default defineConfig({
	site: 'https://betk-finland.github.io',
	base: '/betk-publishing/',
	outDir: '../docs',
	trailingSlash: 'ignore',
});
