// @ts-check
import { defineConfig } from 'astro/config';

// Deployed via GitHub Actions to https://betk-finland.github.io/betk-publishing/
export default defineConfig({
	site: 'https://betk-finland.github.io',
	base: '/betk-publishing/',
	trailingSlash: 'ignore',
});
