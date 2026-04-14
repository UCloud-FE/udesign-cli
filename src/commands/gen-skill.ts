import * as fs from 'node:fs';
import * as path from 'node:path';
import type { Command } from 'commander';
import type { MetadataStore, ComponentData } from '../types.js';
import { generateSkill, updateSkill } from '../skill/generator.js';
import { parseSkill } from '../skill/parser.js';

function toKebabCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

function skillFileName(component: ComponentData): string {
  const prefix = component.category === 'pro' ? 'cpn-pro' : 'cpn-basic';
  return `${prefix}-${toKebabCase(component.name)}`;
}

function loadMetadata(dataPath: string): MetadataStore {
  const raw = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(raw) as MetadataStore;
}

function processComponent(
  component: ComponentData,
  outputDir: string,
): 'created' | 'updated' {
  const dirName = skillFileName(component);
  const skillDir = path.join(outputDir, dirName);
  const skillPath = path.join(skillDir, 'SKILL.md');

  fs.mkdirSync(skillDir, { recursive: true });

  if (fs.existsSync(skillPath)) {
    const existing = fs.readFileSync(skillPath, 'utf-8');
    const parsed = parseSkill(existing);
    const hasMarkers = parsed.sections.some((s) => s.type === 'auto' || s.type === 'manual');

    const updated = updateSkill(existing, component);
    fs.writeFileSync(skillPath, updated, 'utf-8');

    if (!hasMarkers) {
      console.log(`  ⚠ ${dirName}: legacy file migrated (original content preserved as MANUAL)`);
    }
    return 'updated';
  }

  const content = generateSkill(component);
  fs.writeFileSync(skillPath, content, 'utf-8');
  return 'created';
}

export function registerGenSkillCommand(program: Command): void {
  program
    .command('gen-skill')
    .description('Generate or update SKILL.md files from component metadata')
    .argument('[component]', 'Component name (e.g. Button, ProTable). Omit with --all.')
    .option('--all', 'Generate skills for all components')
    .option('-o, --output <dir>', 'Output directory for skill files', './skills')
    .option('-d, --data <path>', 'Path to metadata.json', './data/metadata.json')
    .action(
      (
        componentArg: string | undefined,
        opts: { all?: boolean; output: string; data: string },
      ) => {
        const dataPath = path.resolve(opts.data);
        if (!fs.existsSync(dataPath)) {
          console.error(`❌ Metadata file not found: ${dataPath}`);
          console.error('   Run "udesign extract" first to generate metadata.');
          process.exit(1);
        }

        const store = loadMetadata(dataPath);
        const outputDir = path.resolve(opts.output);

        let targets: ComponentData[];

        if (opts.all) {
          targets = store.components;
        } else if (componentArg) {
          const match = store.components.find(
            (c) => c.name.toLowerCase() === componentArg.toLowerCase(),
          );
          if (!match) {
            console.error(`❌ Component "${componentArg}" not found in metadata.`);
            console.error(
              `   Available: ${store.components.map((c) => c.name).join(', ')}`,
            );
            process.exit(1);
          }
          targets = [match];
        } else {
          console.error('❌ Specify a component name or use --all.');
          process.exit(1);
        }

        console.log(`Generating skills → ${outputDir}\n`);

        let created = 0;
        let updated = 0;
        let manualPreserved = 0;

        for (const component of targets) {
          const result = processComponent(component, outputDir);
          if (result === 'created') {
            created++;
            console.log(`  ✅ ${skillFileName(component)}: created`);
          } else {
            updated++;
            const skillPath = path.join(outputDir, skillFileName(component), 'SKILL.md');
            const content = fs.readFileSync(skillPath, 'utf-8');
            const parsed = parseSkill(content);
            const manualCount = parsed.sections.filter((s) => s.type === 'manual').length;
            manualPreserved += manualCount;
            console.log(
              `  🔄 ${skillFileName(component)}: updated (${manualCount} manual sections preserved)`,
            );
          }
        }

        console.log(`\nDone: ${created} new, ${updated} updated, ${manualPreserved} manual sections preserved.`);
      },
    );
}
