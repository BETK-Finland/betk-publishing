// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// Custom domain: https://betk.fi (GitHub Pages)
export default defineConfig({
	site: 'https://betk.fi',
	base: '/',
	trailingSlash: 'ignore',
	integrations: [mdx()],
	vite: {
		server: {
			fs: {
				allow: ['..'],
			},
		},
	},
});
