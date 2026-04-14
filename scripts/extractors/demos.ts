import * as fs from 'fs';
import * as path from 'path';
import type { DemoData } from '../../src/types.js';

interface CodeBlockMeta {
  codepath: string;
  title: string;
}

function parseCodeBlocks(mdContent: string): CodeBlockMeta[] {
  const results: CodeBlockMeta[] = [];
  const lines = mdContent.split('\n');
  let currentTitle = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const headingMatch = line.match(/^#{1,5}\s+(.+)/);
    if (headingMatch) {
      currentTitle = headingMatch[1].trim();
    }

    const fenceMatch = line.match(/^```\s*(?:js|jsx|tsx?)\s*(\{[\s\S]*?\})\s*$/);
    if (fenceMatch) {
      try {
        const meta = JSON.parse(fenceMatch[1]);
        if (meta.codepath) {
          results.push({ codepath: meta.codepath, title: currentTitle || meta.codepath });
        }
      } catch {
        continue;
      }
    }
  }

  return results;
}

function extractDemoSection(source: string): string {
  const startMarker = '// demo start';
  const endMarker = '// demo end';
  const startIdx = source.indexOf(startMarker);
  const endIdx = source.indexOf(endMarker);

  if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
    return source.substring(startIdx + startMarker.length, endIdx).trim();
  }
  return source;
}

export function extractDemos(componentDir: string, componentName: string): DemoData[] {
  const mdPath = path.join(componentDir, `${componentName}.md`);
  if (!fs.existsSync(mdPath)) return [];

  let mdContent: string;
  try {
    mdContent = fs.readFileSync(mdPath, 'utf-8');
  } catch {
    return [];
  }

  const codeBlocks = parseCodeBlocks(mdContent);
  const demoDir = path.join(componentDir, '__demo__');
  const demos: DemoData[] = [];

  for (const block of codeBlocks) {
    const demoFile = path.join(demoDir, block.codepath);
    if (!fs.existsSync(demoFile)) continue;

    let source: string;
    try {
      source = fs.readFileSync(demoFile, 'utf-8');
    } catch {
      continue;
    }

    const displaySource = extractDemoSection(source);
    const name = path.basename(block.codepath, path.extname(block.codepath));

    demos.push({
      name,
      title: block.title,
      source: displaySource,
      codepath: block.codepath,
    });
  }

  return demos;
}
