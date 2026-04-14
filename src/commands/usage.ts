import type { Command } from 'commander';
import { resolve } from 'node:path';
import { scanFiles, parseImports } from '../utils/scan.js';
import { formatOutput, formatTable } from '../output/formatter.js';
import { handleError } from '../output/error.js';
import type { CliGlobalOptions } from '../types.js';

const UDESIGN_PACKAGES = [
  '@ucloud-fe/react-components',
  '@ucloud/pro-components',
  '@ucloud/pro-layout',
  '@ucloud/pro-table',
  '@ucloud/pro-form',
];

function isUDesignImport(source: string): boolean {
  return UDESIGN_PACKAGES.some(pkg => source === pkg || source.startsWith(pkg + '/'));
}

interface UsageEntry {
  component: string;
  importCount: number;
  files: string[];
}

export function registerUsageCommand(program: Command) {
  program
    .command('usage [dir]')
    .description('Scan UDesign usage')
    .option('-f, --filter <component>', 'Filter to specific component')
    .action((dir: string | undefined, opts: { filter?: string }) => {
      const globalOpts = program.opts<CliGlobalOptions>();
      const targetDir = resolve(dir ?? './src');
      const files = scanFiles(targetDir, ['.jsx', '.tsx', '.js', '.ts']);

      if (files.length === 0) {
        handleError(`No source files found in ${targetDir}`);
      }

      const usageMap = new Map<string, { count: number; files: Set<string> }>();

      for (const file of files) {
        const imports = parseImports(file);
        for (const imp of imports) {
          if (!isUDesignImport(imp.source)) continue;
          for (const spec of imp.specifiers) {
            if (opts.filter && spec.toLowerCase() !== opts.filter.toLowerCase()) continue;
            const entry = usageMap.get(spec) ?? { count: 0, files: new Set<string>() };
            entry.count++;
            entry.files.add(file);
            usageMap.set(spec, entry);
          }
        }
      }

      const results: UsageEntry[] = Array.from(usageMap.entries())
        .map(([component, data]) => ({
          component,
          importCount: data.count,
          files: Array.from(data.files),
        }))
        .sort((a, b) => b.importCount - a.importCount);

      if (globalOpts.format === 'json') {
        process.stdout.write(formatOutput(results, 'json') + '\n');
        return;
      }

      if (results.length === 0) {
        process.stdout.write('No UDesign imports found.\n');
        return;
      }

      process.stdout.write(`UDesign Usage in ${targetDir}\n`);
      process.stdout.write('='.repeat(40) + '\n\n');

      const headers = ['Component', 'Imports', 'Files'];
      const rows = results.map(r => [r.component, String(r.importCount), String(r.files.length)]);
      process.stdout.write(formatTable(headers, rows) + '\n');
      process.stdout.write(`\nScanned ${files.length} files, found ${results.length} components\n`);
    });
}
