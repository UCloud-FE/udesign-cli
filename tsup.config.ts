import { defineConfig } from 'tsup';

export default defineConfig([
  // CLI entry
  {
    entry: ['src/index.ts'],
    format: ['esm'],
    dts: true,
    sourcemap: true,
    clean: true,
    shims: true,
    banner: {
      js: '#!/usr/bin/env node',
    },
  },
  // Extract scripts (not bundled into CLI, run via tsx)
  // These use typescript compiler API and handlebars which are dev-only
]);
