// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: ['**/node_modules/**', '**/dist/**'],
    includeSource: ['test/*.test.ts'],
    // Other options...
  },
});