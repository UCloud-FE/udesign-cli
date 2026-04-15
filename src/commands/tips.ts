import type { Command } from 'commander';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { findComponent } from '../data/loader.js';
import { getCachedMetadata } from '../data/cache.js';
import { formatOutput } from '../output/formatter.js';
import { handleError, suggestComponent } from '../output/error.js';
import { parseSkill } from '../skill/parser.js';
import type { CliGlobalOptions } from '../types.js';

function toKebabCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

function findSkillsDir(): string {
  const __filename = fileURLToPath(import.meta.url);
  let dir = dirname(__filename);
  for (let i = 0; i < 5; i++) {
    const candidate = resolve(dir, 'skills');
    if (existsSync(candidate)) return candidate;
    dir = dirname(dir);
  }
  return resolve(process.cwd(), 'skills');
}

function loadManualSections(
  componentName: string,
  category: string,
): Record<string, string> | null {
  const skillsDir = findSkillsDir();
  const prefix = category === 'pro' ? 'cpn-pro' : 'cpn-basic';
  const skillPath = resolve(
    skillsDir,
    `${prefix}-${toKebabCase(componentName)}`,
    'SKILL.md',
  );

  if (!existsSync(skillPath)) return null;

  const content = readFileSync(skillPath, 'utf-8');
  const parsed = parseSkill(content);

  const manualSections = parsed.sections.filter((s) => s.type === 'manual');
  if (manualSections.length === 0) return null;

  const result: Record<string, string> = {};
  for (const section of manualSections) {
    const trimmed = section.content.trim();
    const stripped = trimmed.replace(/^##?\s+.+\n+/, '').trim();
    if (stripped && stripped !== '_（待补充）_') {
      result[section.key] = trimmed;
    }
  }

  return Object.keys(result).length > 0 ? result : null;
}

export function registerTipsCommand(program: Command) {
  program
    .command('tips <component>')
    .description('Show best practices, FAQ, and common pitfalls for a component')
    .option('-s, --section <name>', 'Show only a specific section (best-practices|faq|critical|overview)')
    .action((component: string, opts: { section?: string }) => {
      const globalOpts = program.opts<CliGlobalOptions>();
      const store = getCachedMetadata();
      const comp = findComponent(store, component);

      if (!comp) {
        const suggestions = suggestComponent(component, store);
        handleError(`Component "${component}" not found.`, suggestions);
      }

      const sections = loadManualSections(comp.name, comp.category);

      if (!sections) {
        handleError(
          `No tips available for "${comp.name}" yet.`,
          ['Tips are stored in SKILL.md MANUAL blocks. Run gen-skill to create the template.'],
        );
      }

      let output = sections;
      if (opts.section) {
        const value = sections[opts.section];
        if (!value) {
          const available = Object.keys(sections).join(', ');
          handleError(
            `Section "${opts.section}" not found for ${comp.name}.`,
            [`Available sections: ${available}`],
          );
        }
        output = { [opts.section]: value };
      }

      if (globalOpts.format === 'json') {
        process.stdout.write(
          formatOutput(
            { component: comp.name, tips: output },
            'json',
          ) + '\n',
        );
        return;
      }

      if (globalOpts.format === 'markdown') {
        const parts: string[] = [`# ${comp.name} Tips\n`];
        for (const [, content] of Object.entries(output)) {
          parts.push(content);
          parts.push('');
        }
        process.stdout.write(parts.join('\n') + '\n');
        return;
      }

      process.stdout.write(`${comp.name} Tips\n${'='.repeat(40)}\n\n`);
      for (const [key, content] of Object.entries(output)) {
        process.stdout.write(`[${key}]\n${content}\n\n`);
      }
    });
}
