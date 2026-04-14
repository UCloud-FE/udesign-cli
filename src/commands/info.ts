import type { Command } from 'commander';
import { getCachedMetadata } from '../data/cache.js';
import { findComponent } from '../data/loader.js';
import { formatOutput, formatPropsTable } from '../output/formatter.js';
import { handleError, suggestComponent } from '../output/error.js';
import type { CliGlobalOptions } from '../types.js';

export function registerInfoCommand(program: Command) {
  program
    .command('info <component>')
    .description('Show component props/API')
    .action((component: string) => {
      const globalOpts = program.opts<CliGlobalOptions>();
      const store = getCachedMetadata();
      const comp = findComponent(store, component);

      if (!comp) {
        const suggestions = suggestComponent(component, store);
        handleError(`Component "${component}" not found.`, suggestions);
      }

      if (globalOpts.format === 'json') {
        const data = globalOpts.detail
          ? comp
          : {
              name: comp.name,
              nameZh: comp.nameZh,
              category: comp.category,
              packageName: comp.packageName,
              importPath: comp.importPath,
              description: comp.description,
              props: comp.props.filter(p => !p.ignore),
            };
        process.stdout.write(formatOutput(data, 'json') + '\n');
        return;
      }

      const lines: string[] = [];
      lines.push(`${comp.name}${comp.nameZh ? ` (${comp.nameZh})` : ''}`);
      lines.push('='.repeat(40));
      lines.push(`Category:    ${comp.category}`);
      lines.push(`Package:     ${comp.packageName}`);
      lines.push(`Import:      ${comp.importPath}`);
      if (comp.group) lines.push(`Group:       ${comp.group}`);
      lines.push(`Description: ${comp.description}`);
      lines.push('');
      lines.push('Props:');
      lines.push(formatPropsTable(comp.props, globalOpts.format));

      if (globalOpts.detail) {
        if (comp.subComponents && comp.subComponents.length > 0) {
          for (const sub of comp.subComponents) {
            lines.push('');
            lines.push(`Sub-component: ${sub.displayName}`);
            if (sub.description) lines.push(`  ${sub.description}`);
            lines.push(formatPropsTable(sub.props, globalOpts.format));
          }
        }

        if (comp.demos.length > 0) {
          lines.push('');
          lines.push('Demos:');
          for (const d of comp.demos) {
            lines.push(`  - ${d.name}: ${d.title}`);
          }
        }
      }

      process.stdout.write(lines.join('\n') + '\n');
    });
}
