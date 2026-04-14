import type { Command } from 'commander';
import { resolve } from 'node:path';
import { scanFiles, parseImports } from '../utils/scan.js';
import { formatOutput, formatTable } from '../output/formatter.js';
import { handleError } from '../output/error.js';
import type { CliGlobalOptions } from '../types.js';

interface LintIssue {
  rule: string;
  severity: 'error' | 'warn';
  message: string;
  file: string;
  line: number;
}

const WRONG_PACKAGES = ['antd', '@alicloud/', '@aliyun/'];

export function registerLintCommand(program: Command) {
  program
    .command('lint [dir]')
    .description('Check for issues')
    .option('--only <rule>', 'Only run specific rule')
    .action((dir: string | undefined, opts: { only?: string }) => {
      const globalOpts = program.opts<CliGlobalOptions>();
      const targetDir = resolve(dir ?? './src');
      const files = scanFiles(targetDir, ['.jsx', '.tsx', '.js', '.ts']);

      if (files.length === 0) {
        handleError(`No source files found in ${targetDir}`);
      }

      const issues: LintIssue[] = [];

      for (const file of files) {
        const imports = parseImports(file);
        for (const imp of imports) {
          if (!opts.only || opts.only === 'deep-import') {
            checkDeepImport(imp.source, file, imp.line, issues);
          }
          if (!opts.only || opts.only === 'wrong-package') {
            checkWrongPackage(imp.source, file, imp.line, issues);
          }
        }
      }

      if (globalOpts.format === 'json') {
        process.stdout.write(formatOutput(issues, 'json') + '\n');
        if (issues.some(i => i.severity === 'error')) process.exit(1);
        return;
      }

      if (issues.length === 0) {
        process.stdout.write(`Scanned ${files.length} files. No issues found.\n`);
        return;
      }

      process.stdout.write(`UDesign Lint: ${targetDir}\n`);
      process.stdout.write('='.repeat(40) + '\n\n');

      const headers = ['Severity', 'Rule', 'File', 'Line', 'Message'];
      const rows = issues.map(i => [
        i.severity.toUpperCase(),
        i.rule,
        i.file,
        String(i.line),
        i.message,
      ]);
      process.stdout.write(formatTable(headers, rows) + '\n');

      const errors = issues.filter(i => i.severity === 'error').length;
      const warns = issues.filter(i => i.severity === 'warn').length;
      process.stdout.write(`\n${errors} error(s), ${warns} warning(s) in ${files.length} files\n`);

      if (errors > 0) process.exit(1);
    });
}

function checkDeepImport(source: string, file: string, line: number, issues: LintIssue[]) {
  if (source.includes('@ucloud-fe/react-components/lib/') ||
      source.match(/@ucloud\/pro-[^/]+\/lib\//)) {
    issues.push({
      rule: 'deep-import',
      severity: 'warn',
      message: `Deep import from "${source}". Use the package entry point instead.`,
      file,
      line,
    });
  }
}

function checkWrongPackage(source: string, file: string, line: number, issues: LintIssue[]) {
  for (const pkg of WRONG_PACKAGES) {
    if (source === pkg || source.startsWith(pkg)) {
      issues.push({
        rule: 'wrong-package',
        severity: 'error',
        message: `Import from "${source}" should use UDesign components instead.`,
        file,
        line,
      });
      return;
    }
  }
}
