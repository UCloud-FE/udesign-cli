import * as fs from 'fs';
import * as path from 'path';
import type { MetadataStore, ComponentData, ExtractOptions, PropData, TokenThemeMap } from '../src/types.js';
import { extractComponents } from './extractors/components.js';
import { extractDemos } from './extractors/demos.js';
import { extractDoc } from './extractors/docs.js';
import { extractPropsFromRecodo } from './extractors/props-fallback.js';

async function loadExtractProps(): Promise<((filePath: string, componentName: string) => PropData[]) | null> {
  try {
    const mod = await import('./extractors/props.js');
    return mod.extractProps;
  } catch {
    return null;
  }
}

async function loadExtractTokens(): Promise<((tokensDir: string) => TokenThemeMap) | null> {
  try {
    const mod = await import('./extractors/tokens.js');
    return mod.extractTokens;
  } catch {
    return null;
  }
}

export async function extract(options: ExtractOptions): Promise<MetadataStore> {
  const { sourceDir, tokensDir, outputPath } = options;

  const components = extractComponents(sourceDir);
  console.log(`Found ${components.length} components`);

  const extractProps = await loadExtractProps();
  const extractTokens = await loadExtractTokens();

  let tokenData: TokenThemeMap = { themes: [], globalTokens: [], componentTokens: {} };
  if (extractTokens) {
    try {
      tokenData = extractTokens(tokensDir);
      console.log(`Extracted tokens: ${tokenData.globalTokens.length} global, ${Object.keys(tokenData.componentTokens).length} component groups`);
    } catch (err) {
      console.warn(`Token extraction failed: ${err instanceof Error ? err.message : err}`);
    }
  }

  const componentDataList: ComponentData[] = [];

  for (const comp of components) {
    const componentDir = path.dirname(comp.sourceFile);

    let props: PropData[] = [];
    if (comp.hasTypeScript && extractProps) {
      try {
        props = extractProps(comp.sourceFile, comp.name);
      } catch {
        props = [];
      }
    }

    if (props.length === 0) {
      const recodoPath = path.join(sourceDir, '.recodo', 'data', `${comp.name}.info.json`);
      props = extractPropsFromRecodo(recodoPath, comp.name);
    }

    const demos = extractDemos(componentDir, comp.name);
    const docResult = extractDoc(componentDir, comp.name);

    const componentTokens = tokenData.componentTokens[comp.name];

    const data: ComponentData = {
      name: comp.name,
      nameZh: comp.nameZh,
      category: comp.category,
      group: comp.group,
      description: docResult.description,
      whenToUse: docResult.whenToUse,
      props,
      demos,
      doc: docResult.doc || undefined,
      sourceFile: path.relative(sourceDir, comp.sourceFile),
      packageName: '@ucloud-fe/react-components',
      importPath: `import { ${comp.name} } from '@ucloud-fe/react-components'`,
    };

    if (componentTokens?.length) {
      data.tokens = { tokens: componentTokens };
    }

    componentDataList.push(data);
  }

  const store: MetadataStore = {
    version: '1.0.0',
    extractedAt: new Date().toISOString(),
    components: componentDataList,
    globalTokens: tokenData,
  };

  const outDir = path.dirname(outputPath);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  fs.writeFileSync(outputPath, JSON.stringify(store, null, 2), 'utf-8');
  console.log(`Metadata written to ${outputPath} (${componentDataList.length} components)`);

  return store;
}

function parseArgs(argv: string[]): ExtractOptions {
  let sourceDir = '';
  let tokensDir = '';
  let outputPath = '';

  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--source' && argv[i + 1]) {
      sourceDir = argv[++i];
    } else if (arg === '--tokens' && argv[i + 1]) {
      tokensDir = argv[++i];
    } else if (arg === '--output' && argv[i + 1]) {
      outputPath = argv[++i];
    }
  }

  if (!sourceDir) {
    console.error('Usage: extract --source <dir> --tokens <dir> --output <file>');
    process.exit(1);
  }

  if (!tokensDir) tokensDir = path.join(sourceDir, 'src', 'style');
  if (!outputPath) outputPath = path.join(process.cwd(), 'metadata.json');

  return {
    sourceDir: path.resolve(sourceDir),
    tokensDir: path.resolve(tokensDir),
    outputPath: path.resolve(outputPath),
  };
}

const isDirectRun = process.argv[1]?.endsWith('extract.js') || process.argv[1]?.endsWith('extract.ts');
if (isDirectRun) {
  const options = parseArgs(process.argv);
  extract(options).catch((err) => {
    console.error('Extraction failed:', err);
    process.exit(1);
  });
}
