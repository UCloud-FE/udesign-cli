import type { Command } from 'commander';
import { resolve, dirname } from 'node:path';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { handleError } from '../output/error.js';

function findProjectRoot(): string {
  const __filename = fileURLToPath(import.meta.url);
  let dir = dirname(__filename);
  for (let i = 0; i < 5; i++) {
    if (existsSync(resolve(dir, 'package.json')) && existsSync(resolve(dir, 'scripts'))) {
      return dir;
    }
    dir = dirname(dir);
  }
  return process.cwd();
}

export function registerExtractCommand(program: Command) {
  program
    .command('extract')
    .description('Extract metadata from source')
    .requiredOption('--source <dir>', 'Component source directory')
    .requiredOption('--tokens <dir>', 'Token definitions directory')
    .requiredOption('--output <path>', 'Output metadata.json path')
    .action((opts: { source: string; tokens: string; output: string }) => {
      const sourceDir = resolve(opts.source);
      const tokensDir = resolve(opts.tokens);
      const outputPath = resolve(opts.output);

      if (!existsSync(sourceDir)) {
        handleError(`Source directory not found: ${sourceDir}`);
      }
      if (!existsSync(tokensDir)) {
        handleError(`Tokens directory not found: ${tokensDir}`);
      }

      process.stdout.write('Extracting metadata...\n');
      process.stdout.write(`  Source:  ${sourceDir}\n`);
      process.stdout.write(`  Tokens:  ${tokensDir}\n`);
      process.stdout.write(`  Output:  ${outputPath}\n\n`);

      const projectRoot = findProjectRoot();
      const scriptPath = resolve(projectRoot, 'scripts/extract.ts');
      if (!existsSync(scriptPath)) {
        handleError(`Extract script not found at ${scriptPath}. Ensure you are running from the @udesign/cli project root, or the CLI is properly installed.`);
      }

      try {
        execFileSync('npx', ['tsx', scriptPath, '--source', sourceDir, '--tokens', tokensDir, '--output', outputPath], {
          stdio: 'inherit',
          cwd: projectRoot,
        });
        process.stdout.write('Done.\n');
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        handleError(`Extraction failed: ${message}`);
      }
    });
}
