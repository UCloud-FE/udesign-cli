import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { MetadataStore, ComponentData } from '../types.js';

function findProjectRoot(): string {
  const __filename = fileURLToPath(import.meta.url);
  let dir = dirname(__filename);
  for (let i = 0; i < 5; i++) {
    if (existsSync(resolve(dir, 'package.json')) && existsSync(resolve(dir, 'data'))) {
      return dir;
    }
    dir = dirname(dir);
  }
  return process.cwd();
}

const DEFAULT_DATA_PATH = resolve(findProjectRoot(), 'data/metadata.json');

export function loadMetadata(dataPath?: string): MetadataStore {
  const p = dataPath ?? DEFAULT_DATA_PATH;
  const raw = readFileSync(p, 'utf-8');
  return JSON.parse(raw) as MetadataStore;
}

export function findComponent(store: MetadataStore, name: string): ComponentData | null {
  const lower = name.toLowerCase();
  return store.components.find(c => c.name.toLowerCase() === lower) ?? null;
}

export function fuzzyMatch(input: string, candidates: string[]): string[] {
  const lower = input.toLowerCase();
  const scored = candidates.map(c => ({ name: c, dist: levenshtein(lower, c.toLowerCase()) }));
  scored.sort((a, b) => a.dist - b.dist);
  const threshold = Math.max(3, Math.floor(input.length * 0.6));
  return scored.filter(s => s.dist <= threshold).slice(0, 5).map(s => s.name);
}

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0) as number[]);
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[m][n];
}
