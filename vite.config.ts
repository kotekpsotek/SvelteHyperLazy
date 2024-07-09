import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import svelteHyperLazyPlugin from './src/lib/plugin.js';

export default defineConfig({
	plugins: [sveltekit(), svelteHyperLazyPlugin()]
});
