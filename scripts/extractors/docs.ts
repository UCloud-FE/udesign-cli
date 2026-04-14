import * as fs from 'fs';
import * as path from 'path';

export interface DocResult {
  doc: string;
  description: string;
  whenToUse?: string;
}

function cleanDescription(raw: string): string {
  return raw
    .split('\n')
    .map(line => line.replace(/^[-*+]\s+/, '').replace(/^#{1,6}\s+/, '').trim())
    .filter(Boolean)
    .join('\n')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .trim();
}

function extractSection(content: string, heading: string): string | undefined {
  const pattern = new RegExp(`###\\s*${heading}\\s*\\n+([\\s\\S]*?)(?=\\n###|$)`);
  const match = content.match(pattern);
  if (!match) return undefined;
  return match[1].trim() || undefined;
}

export function extractDoc(componentDir: string, componentName: string): DocResult {
  const mdPath = path.join(componentDir, `${componentName}.md`);

  if (!fs.existsSync(mdPath)) {
    return { doc: '', description: '' };
  }

  let content: string;
  try {
    content = fs.readFileSync(mdPath, 'utf-8');
  } catch {
    return { doc: '', description: '' };
  }

  const descriptionRaw = extractSection(content, '说明') ?? '';
  const description = cleanDescription(descriptionRaw);

  const whenToUse =
    extractSection(content, '使用场景') ??
    extractSection(content, '[Ww]hen [Tt]o [Uu]se');

  return {
    doc: content,
    description,
    whenToUse,
  };
}
