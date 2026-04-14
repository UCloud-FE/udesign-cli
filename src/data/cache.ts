import type { MetadataStore } from '../types.js';
import { loadMetadata } from './loader.js';

let cached: MetadataStore | null = null;
let cachedPath: string | undefined;

export function getCachedMetadata(dataPath?: string): MetadataStore {
  if (cached && cachedPath === dataPath) return cached;
  cached = loadMetadata(dataPath);
  cachedPath = dataPath;
  return cached;
}
