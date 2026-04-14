import type { Command } from 'commander';
import { getCachedMetadata } from '../data/cache.js';
import { findComponent } from '../data/loader.js';
import { formatOutput, formatTable } from '../output/formatter.js';
import { handleError, suggestComponent } from '../output/error.js';
import type { CliGlobalOptions, TokenData } from '../types.js';

export function registerTokenCommand(program: Command) {
  program
    .command('token [component]')
    .description('Query design tokens')
    .option('--theme <name>', 'Show values for specific theme', 'default')
    .option('--compare <name>', 'Compare with another theme')
    .option('--category <cat>', 'Filter by token category')
    .action((component: string | undefined, opts: { theme: string; compare?: string; category?: string }) => {
      const globalOpts = program.opts<CliGlobalOptions>();
      const store = getCachedMetadata();

      if (!store.globalTokens) {
        handleError('No token data available in metadata.');
      }

      const tokenMap = store.globalTokens;
      let tokens: TokenData[];

      if (component) {
        const comp = findComponent(store, component);
        if (!comp) {
          const suggestions = suggestComponent(component, store);
          handleError(`Component "${component}" not found.`, suggestions);
        }
        tokens = comp.tokens?.tokens ?? tokenMap.componentTokens[comp.name] ?? [];
        if (tokens.length === 0) {
          handleError(`No tokens found for component "${comp.name}".`);
        }
      } else {
        tokens = tokenMap.globalTokens;
      }

      if (opts.category) {
        tokens = tokens.filter(t => t.category === opts.category);
      }

      if (tokens.length === 0) {
        handleError('No tokens match the given filters.');
      }

      if (opts.compare) {
        outputCompare(tokens, opts.theme, opts.compare, globalOpts.format);
        return;
      }

      if (globalOpts.format === 'json') {
        const data = tokens.map(t => ({
          name: t.name,
          category: t.category,
          value: t.values[opts.theme] ?? '(not set)',
          comment: t.comment,
        }));
        process.stdout.write(formatOutput(data, 'json') + '\n');
        return;
      }

      if (globalOpts.format === 'markdown') {
        const lines = [
          `| Token | Category | Value (${opts.theme}) | Comment |`,
          '|-------|----------|-------|---------|',
        ];
        for (const t of tokens) {
          lines.push(`| \`${t.name}\` | ${t.category} | \`${t.values[opts.theme] ?? '(not set)'}\` | ${t.comment ?? ''} |`);
        }
        process.stdout.write(lines.join('\n') + '\n');
        return;
      }

      const headers = ['Token', 'Category', `Value (${opts.theme})`];
      const rows = tokens.map(t => [t.name, t.category, t.values[opts.theme] ?? '(not set)']);
      process.stdout.write(formatTable(headers, rows) + '\n');
      process.stdout.write(`\nTotal: ${tokens.length} tokens\n`);
    });
}

function outputCompare(tokens: TokenData[], themeA: string, themeB: string, format: string) {
  if (format === 'json') {
    const data = tokens.map(t => ({
      name: t.name,
      category: t.category,
      [themeA]: t.values[themeA] ?? '(not set)',
      [themeB]: t.values[themeB] ?? '(not set)',
      diff: (t.values[themeA] ?? '') !== (t.values[themeB] ?? ''),
    }));
    process.stdout.write(formatOutput(data, 'json') + '\n');
    return;
  }

  const headers = ['Token', 'Category', themeA, themeB, 'Diff'];
  const rows = tokens.map(t => {
    const a = t.values[themeA] ?? '(not set)';
    const b = t.values[themeB] ?? '(not set)';
    return [t.name, t.category, a, b, a !== b ? '≠' : '='];
  });
  process.stdout.write(formatTable(headers, rows) + '\n');
  const diffCount = rows.filter(r => r[4] === '≠').length;
  process.stdout.write(`\n${diffCount}/${tokens.length} tokens differ\n`);
}
