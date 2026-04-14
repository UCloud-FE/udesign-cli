import { Command } from 'commander';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { registerListCommand } from './commands/list.js';
import { registerInfoCommand } from './commands/info.js';
import { registerDemoCommand } from './commands/demo.js';
import { registerTokenCommand } from './commands/token.js';
import { registerDoctorCommand } from './commands/doctor.js';
import { registerUsageCommand } from './commands/usage.js';
import { registerLintCommand } from './commands/lint.js';
import { registerExtractCommand } from './commands/extract.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(resolve(__dirname, '../package.json'), 'utf-8')) as { version: string };

const program = new Command();

program
  .name('udesign')
  .description('UDesign component library CLI')
  .version(pkg.version)
  .option('--format <type>', 'Output format: json|text|markdown', 'text')
  .option('--detail', 'Include extended information', false);

registerListCommand(program);
registerInfoCommand(program);
registerDemoCommand(program);
registerTokenCommand(program);
registerDoctorCommand(program);
registerUsageCommand(program);
registerLintCommand(program);
registerExtractCommand(program);

// gen-skill command is registered by another module if available
try {
  const { registerGenSkillCommand } = await import('./commands/gen-skill.js');
  registerGenSkillCommand(program);
} catch {
  // gen-skill command not available yet
}

program.parse();
