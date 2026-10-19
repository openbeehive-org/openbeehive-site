import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

// Fully static marketing site, prerendered to plain HTML for openbeehive.org; the app lives in its own repo.
export default defineConfig({
  plugins: [
    sveltekit({
      preprocess: vitePreprocess(),
      adapter: adapter({
        pages: 'build',
        assets: 'build',
        strict: true
      })
    })
  ],
  server: { port: 5174 },
  preview: { port: 4174 },
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'node',
    coverage: {
      provider: 'v8',
      // Pure TS modules; Svelte pages and components are covered by svelte-check and the build.
      include: ['src/lib/**/*.ts'],
      thresholds: { lines: 95, functions: 95, branches: 85, statements: 95 }
    }
  }
});
