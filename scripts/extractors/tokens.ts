import * as fs from 'node:fs';
import * as path from 'node:path';
import type { TokenThemeMap, TokenData, TokenCategory } from '../../src/types.js';
import { categorizeToken, tokenToComponent } from '../../src/types.js';

function parseOutputTs(content: string): Record<string, string> {
  const tokens: Record<string, string> = {};
  const cleaned = content.replace(/\/\/[^\n]*/g, '');
  const regex = /\b(T_[A-Z0-9_]+)\s*:\s*(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(cleaned)) !== null) {
    tokens[match[1]] = match[2] ?? match[3];
  }
  return tokens;
}

function extractComments(json: unknown, pathSegments: string[] = []): Record<string, string> {
  const comments: Record<string, string> = {};
  if (json === null || typeof json !== 'object') return comments;
  const obj = json as Record<string, unknown>;
  if ('value' in obj && 'comment' in obj && typeof obj['comment'] === 'string') {
    const tokenName = 'T_' + pathSegments
      .filter(s => s !== '_meta')
      .join('_')
      .toUpperCase();
    comments[tokenName] = obj['comment'] as string;
    return comments;
  }
  for (const [key, value] of Object.entries(obj)) {
    if (key === '_meta') continue;
    Object.assign(comments, extractComments(value, [...pathSegments, key]));
  }
  return comments;
}

function themeNameFromFile(filename: string): string {
  return filename.replace(/\.json$/, '');
}

export function extractTokens(tokensDir: string): TokenThemeMap {
  const themeListPath = path.join(tokensDir, 'theme-list.json');
  const themeFiles: string[] = JSON.parse(fs.readFileSync(themeListPath, 'utf-8'));
  const themes = themeFiles.map(themeNameFromFile);

  const allTokenNames = new Set<string>();
  const themeTokenValues = new Map<string, Record<string, string>>();
  const commentMap: Record<string, string> = {};

  for (const file of themeFiles) {
    const themeName = themeNameFromFile(file);

    const outputPath = path.join(tokensDir, 'output', file.replace(/\.json$/, '.ts'));
    if (fs.existsSync(outputPath)) {
      const content = fs.readFileSync(outputPath, 'utf-8');
      const tokens = parseOutputTs(content);
      themeTokenValues.set(themeName, tokens);
      for (const key of Object.keys(tokens)) {
        allTokenNames.add(key);
      }
    }

    const definePath = path.join(tokensDir, 'define', file);
    if (fs.existsSync(definePath)) {
      const defineJson = JSON.parse(fs.readFileSync(definePath, 'utf-8'));
      Object.assign(commentMap, extractComments(defineJson));
    }
  }

  const globalTokens: TokenData[] = [];
  const componentTokens: Record<string, TokenData[]> = {};

  const sortedNames = [...allTokenNames].sort();
  for (const name of sortedNames) {
    const category: TokenCategory = categorizeToken(name);
    const values: Record<string, string> = {};
    for (const theme of themes) {
      const tv = themeTokenValues.get(theme);
      if (tv && name in tv) {
        values[theme] = tv[name];
      }
    }
    const token: TokenData = { name, category, values };
    const matched = bestMatchComment(name, commentMap);
    if (matched) token.comment = matched;

    const component = tokenToComponent(name);
    if (component) {
      if (!componentTokens[component]) componentTokens[component] = [];
      componentTokens[component].push(token);
    } else {
      globalTokens.push(token);
    }
  }

  return { themes, globalTokens, componentTokens };
}

function bestMatchComment(tokenName: string, commentMap: Record<string, string>): string | undefined {
  if (commentMap[tokenName]) return commentMap[tokenName];
  const withoutBuiltin = tokenName.replace(/^T_BUILTIN_/, 'T_');
  if (commentMap[withoutBuiltin]) return commentMap[withoutBuiltin];
  const parts = tokenName.split('_');
  for (let skip = 1; skip <= 2; skip++) {
    const candidate = 'T_' + parts.slice(1 + skip).join('_');
    if (commentMap[candidate]) return commentMap[candidate];
  }
  return undefined;
}
