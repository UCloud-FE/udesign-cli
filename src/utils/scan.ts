import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { parseSync } from 'oxc-parser';

export interface ImportInfo {
  source: string;
  specifiers: string[];
  filePath: string;
  line: number;
}

export function scanFiles(dir: string, extensions: string[]): string[] {
  const results: string[] = [];
  const extSet = new Set(extensions);

  function walk(d: string) {
    let entries: string[];
    try {
      entries = readdirSync(d);
    } catch {
      return;
    }
    for (const entry of entries) {
      if (entry === 'node_modules' || entry.startsWith('.')) continue;
      const full = join(d, entry);
      let st;
      try {
        st = statSync(full);
      } catch {
        continue;
      }
      if (st.isDirectory()) {
        walk(full);
      } else if (extSet.has(extname(entry))) {
        results.push(full);
      }
    }
  }

  walk(dir);
  return results;
}

function getLangForFile(filePath: string): 'js' | 'jsx' | 'ts' | 'tsx' {
  const ext = extname(filePath);
  if (ext === '.tsx') return 'tsx';
  if (ext === '.ts') return 'ts';
  if (ext === '.jsx') return 'jsx';
  return 'js';
}

function countNewlines(source: string, upTo: number): number {
  let count = 1;
  for (let i = 0; i < upTo && i < source.length; i++) {
    if (source[i] === '\n') count++;
  }
  return count;
}

export function parseImports(filePath: string): ImportInfo[] {
  let source: string;
  try {
    source = readFileSync(filePath, 'utf-8');
  } catch {
    return [];
  }

  const result = parseSync(filePath, source, {
    sourceType: 'module',
    lang: getLangForFile(filePath),
  });

  const imports: ImportInfo[] = [];

  for (const imp of result.module.staticImports) {
    const specifiers = imp.entries.map(e => e.localName.value);
    imports.push({
      source: imp.moduleRequest.value,
      specifiers,
      filePath,
      line: countNewlines(source, imp.start),
    });
  }

  return imports;
}
