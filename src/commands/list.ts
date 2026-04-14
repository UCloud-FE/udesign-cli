import type { Command } from 'commander';
import { getCachedMetadata } from '../data/cache.js';
import { formatTable, formatOutput } from '../output/formatter.js';
import type { CliGlobalOptions } from '../types.js';

export function registerListCommand(program: Command) {
  program
    .command('list')
    .description('List all components')
    .option('--category <type>', 'Filter by category: basic|pro')
    .action((opts: { category?: string }) => {
      const globalOpts = program.opts<CliGlobalOptions>();
      const store = getCachedMetadata();
      let components = store.components;

      if (opts.category) {
        components = components.filter(c => c.category === opts.category);
      }

      if (globalOpts.format === 'json') {
        const data = components.map(c => ({
          name: c.name,
          nameZh: c.nameZh ?? '',
          category: c.category,
          group: c.group ?? '',
          packageName: c.packageName,
        }));
        process.stdout.write(formatOutput(data, 'json') + '\n');
        return;
      }

      if (globalOpts.format === 'markdown') {
        const lines = ['| Name | NameZh | Category | Group |', '|------|--------|----------|-------|'];
        for (const c of components) {
          lines.push(`| ${c.name} | ${c.nameZh ?? ''} | ${c.category} | ${c.group ?? ''} |`);
        }
        process.stdout.write(lines.join('\n') + '\n');
        return;
      }

      const basic = components.filter(c => c.category === 'basic');
      const pro = components.filter(c => c.category === 'pro');

      const printGroup = (title: string, items: typeof components) => {
        if (items.length === 0) return;
        process.stdout.write(`\n${title} (${items.length})\n`);
        const rows = items.map(c => [c.name, c.nameZh ?? '', c.group ?? '']);
        process.stdout.write(formatTable(['Name', 'NameZh', 'Group'], rows) + '\n');
      };

      if (!opts.category || opts.category === 'basic') printGroup('Basic Components', basic);
      if (!opts.category || opts.category === 'pro') printGroup('Pro Components', pro);

      process.stdout.write(`\nTotal: ${components.length} components\n`);
    });
}
