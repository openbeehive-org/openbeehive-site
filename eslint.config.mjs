// ESLint flat config: JS + TypeScript + Svelte recommended rules; Prettier owns formatting.
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

export default defineConfig(
  globalIgnores(['build/', 'coverage/', '.svelte-kit/', 'node_modules/']),
  js.configs.recommended,
  ts.configs.recommended,
  svelte.configs.recommended,
  prettier,
  svelte.configs.prettier,
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      // TypeScript itself reports undefined names.
      'no-undef': 'off',
      // Slop guards: a disable needs a reason, no debugging output.
      'no-console': ['error', { allow: ['error', 'warn'] }],
      'no-debugger': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      // The site is always served at the origin root (no kit.paths.base), so resolve() adds nothing.
      'svelte/no-navigation-without-resolve': 'off'
    }
  },
  {
    files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        extraFileExtensions: ['.svelte'],
        parser: ts.parser,
        svelteConfig
      }
    }
  }
);
