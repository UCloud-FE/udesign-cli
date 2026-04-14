import type { MetadataStore } from '../types.js';
import { fuzzyMatch } from '../data/loader.js';

export function handleError(message: string, suggestions?: string[]): never {
  process.stderr.write(`Error: ${message}\n`);
  if (suggestions && suggestions.length > 0) {
    process.stderr.write(`\nDid you mean?\n`);
    for (const s of suggestions) {
      process.stderr.write(`  - ${s}\n`);
    }
  }
  process.exit(1);
}

export function suggestComponent(input: string, store: MetadataStore): string[] {
  const names = store.components.map(c => c.name);
  return fuzzyMatch(input, names);
}
