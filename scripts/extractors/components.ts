import * as fs from 'fs';
import * as path from 'path';

export interface ComponentInfo {
  name: string;
  nameZh?: string;
  category: 'basic' | 'pro';
  group?: string;
  sourceFile: string;
  hasTypeScript: boolean;
}

function cleanMarkdownLine(line: string): string {
  return line
    .replace(/^[-*+]\s+/, '')
    .replace(/^#{1,6}\s+/, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .trim();
}

function extractNameZhFromMd(mdPath: string): string | undefined {
  try {
    const content = fs.readFileSync(mdPath, 'utf-8');
    const match = content.match(/###\s*说明\s*\n+([\s\S]*?)(?=\n###|\n$)/);
    if (!match) return undefined;
    const firstLine = cleanMarkdownLine(match[1].trim().split('\n')[0]);
    if (!firstLine || !/[\u4e00-\u9fff]/.test(firstLine)) return undefined;

    const zhMatch = firstLine.match(
      /(?:这是\s*)?(?:\w+[\s,，]*)?([^\u0000-\u007F][\u4e00-\u9fff\u3000-\u303f\uff00-\uffef\w\s，、（）()]+)/
    );
    if (zhMatch) {
      return zhMatch[1].replace(/[，。]$/, '').trim();
    }
    return firstLine.length <= 30 ? firstLine : undefined;
  } catch {
    return undefined;
  }
}

export function extractComponents(sourceDir: string): ComponentInfo[] {
  const componentsDir = path.join(sourceDir, 'src', 'components');
  if (!fs.existsSync(componentsDir)) {
    throw new Error(`Components directory not found: ${componentsDir}`);
  }

  const entries = fs.readdirSync(componentsDir, { withFileTypes: true });
  const results: ComponentInfo[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const name = entry.name;
    if (name.startsWith('_') || name.startsWith('__')) continue;
    if (name[0] === name[0].toLowerCase()) continue;

    const dirPath = path.join(componentsDir, name);
    const tsxFile = path.join(dirPath, `${name}.tsx`);
    const jsxFile = path.join(dirPath, `${name}.jsx`);
    const indexFile = path.join(dirPath, 'index.tsx');
    const indexJsFile = path.join(dirPath, 'index.jsx');

    const hasTsx = fs.existsSync(tsxFile);
    const hasJsx = fs.existsSync(jsxFile);
    const hasIndex = fs.existsSync(indexFile) || fs.existsSync(indexJsFile);

    if (!hasTsx && !hasJsx) continue;
    if (!hasIndex && !hasTsx && !hasJsx) continue;

    const mdFile = path.join(dirPath, `${name}.md`);
    const nameZh = extractNameZhFromMd(mdFile);

    results.push({
      name,
      nameZh,
      category: 'basic',
      sourceFile: hasTsx ? tsxFile : jsxFile,
      hasTypeScript: hasTsx,
    });
  }

  return results.sort((a, b) => a.name.localeCompare(b.name));
}
