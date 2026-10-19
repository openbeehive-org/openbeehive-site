import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [sveltekit()],
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
