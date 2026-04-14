import type { Command } from 'commander';
import { getCachedMetadata } from '../data/cache.js';
import { findComponent } from '../data/loader.js';
import { formatOutput, formatTable } from '../output/formatter.js';
import { handleError, suggestComponent } from '../output/error.js';
import type { CliGlobalOptions } from '../types.js';

export function registerDemoCommand(program: Command) {
  program
    .command('demo <component> [demoName]')
    .description('Show demo source code')
    .action((component: string, demoName?: string) => {
      const globalOpts = program.opts<CliGlobalOptions>();
      const store = getCachedMetadata();
      const comp = findComponent(store, component);

      if (!comp) {
        const suggestions = suggestComponent(component, store);
        handleError(`Component "${component}" not found.`, suggestions);
      }

      if (comp.demos.length === 0) {
        handleError(`Component "${comp.name}" has no demos.`);
      }

      if (!demoName) {
        if (globalOpts.format === 'json') {
          const data = comp.demos.map(d => ({ name: d.name, title: d.title }));
          process.stdout.write(formatOutput(data, 'json') + '\n');
          return;
        }

        process.stdout.write(`Demos for ${comp.name}:\n\n`);
        const rows = comp.demos.map(d => [d.name, d.title]);
        process.stdout.write(formatTable(['Name', 'Title'], rows) + '\n');
        process.stdout.write(`\nUse: udesign demo ${comp.name} <name> to view source\n`);
        return;
      }

      const demo = comp.demos.find(d => d.name.toLowerCase() === demoName.toLowerCase());
      if (!demo) {
        const names = comp.demos.map(d => d.name);
        handleError(`Demo "${demoName}" not found for ${comp.name}. Available: ${names.join(', ')}`);
      }

      if (globalOpts.format === 'json') {
        process.stdout.write(formatOutput({ name: demo.name, title: demo.title, source: demo.source }, 'json') + '\n');
        return;
      }

      if (globalOpts.format === 'markdown') {
        const lines = [
          `## ${demo.title}`,
          '',
          '```tsx',
          demo.source,
          '```',
        ];
        process.stdout.write(lines.join('\n') + '\n');
        return;
      }

      process.stdout.write(`── ${demo.title} ──\n\n`);
      process.stdout.write(demo.source + '\n');
    });
}
