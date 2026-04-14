import type { Command } from 'commander';
import { execSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { formatOutput } from '../output/formatter.js';
import type { CliGlobalOptions } from '../types.js';

interface CheckResult {
  name: string;
  status: 'pass' | 'warn' | 'fail';
  message: string;
}

export function registerDoctorCommand(program: Command) {
  program
    .command('doctor')
    .description('Project health check')
    .action(() => {
      const globalOpts = program.opts<CliGlobalOptions>();
      const results: CheckResult[] = [];

      results.push(checkNodeVersion());
      results.push(checkReactComponents());
      results.push(checkDuplicateInstalls());
      results.push(checkPeerDeps());

      const envInfo = getEnvInfo();

      if (globalOpts.format === 'json') {
        process.stdout.write(formatOutput({ checks: results, environment: envInfo }, 'json') + '\n');
        return;
      }

      process.stdout.write('UDesign Doctor\n');
      process.stdout.write('='.repeat(40) + '\n\n');

      for (const r of results) {
        const icon = r.status === 'pass' ? '✓' : r.status === 'warn' ? '⚠' : '✗';
        process.stdout.write(`  ${icon} ${r.name}: ${r.message}\n`);
      }

      process.stdout.write('\nEnvironment:\n');
      for (const [k, v] of Object.entries(envInfo)) {
        process.stdout.write(`  ${k}: ${v}\n`);
      }

      const fails = results.filter(r => r.status === 'fail');
      if (fails.length > 0) {
        process.stdout.write(`\n${fails.length} issue(s) found.\n`);
        process.exit(1);
      } else {
        process.stdout.write('\nAll checks passed.\n');
      }
    });
}

function checkNodeVersion(): CheckResult {
  const ver = process.version;
  const major = parseInt(ver.slice(1).split('.')[0], 10);
  if (major >= 20) {
    return { name: 'Node.js version', status: 'pass', message: `${ver} (>= 20)` };
  }
  return { name: 'Node.js version', status: 'fail', message: `${ver} (requires >= 20)` };
}

function checkReactComponents(): CheckResult {
  const pkgPath = resolve('node_modules/@ucloud-fe/react-components/package.json');
  if (!existsSync(pkgPath)) {
    return { name: '@ucloud-fe/react-components', status: 'warn', message: 'Not installed' };
  }
  try {
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8')) as { version: string };
    return { name: '@ucloud-fe/react-components', status: 'pass', message: `v${pkg.version}` };
  } catch {
    return { name: '@ucloud-fe/react-components', status: 'warn', message: 'Installed but cannot read version' };
  }
}

function checkDuplicateInstalls(): CheckResult {
  try {
    const output = execSync('npm ls @ucloud-fe/react-components --json 2>/dev/null', {
      encoding: 'utf-8',
      timeout: 10000,
    });
    const tree = JSON.parse(output) as { dependencies?: Record<string, unknown> };
    if (!tree.dependencies) {
      return { name: 'Duplicate check', status: 'pass', message: 'No duplicates detected' };
    }
    const count = countInstances(tree);
    if (count > 1) {
      return { name: 'Duplicate check', status: 'warn', message: `${count} installations found` };
    }
    return { name: 'Duplicate check', status: 'pass', message: 'No duplicates' };
  } catch {
    return { name: 'Duplicate check', status: 'warn', message: 'Could not check (npm ls failed)' };
  }
}

function countInstances(tree: unknown, depth = 0): number {
  if (depth > 10 || !tree || typeof tree !== 'object') return 0;
  const obj = tree as Record<string, unknown>;
  let count = 0;
  if (obj.dependencies && typeof obj.dependencies === 'object') {
    const deps = obj.dependencies as Record<string, unknown>;
    if ('@ucloud-fe/react-components' in deps) count++;
    for (const val of Object.values(deps)) {
      count += countInstances(val, depth + 1);
    }
  }
  return count;
}

function checkPeerDeps(): CheckResult {
  const pkgPath = resolve('package.json');
  if (!existsSync(pkgPath)) {
    return { name: 'Peer dependencies', status: 'warn', message: 'No package.json found' };
  }
  try {
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8')) as {
      dependencies?: Record<string, string>;
      devDependencies?: Record<string, string>;
    };
    const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
    const hasReact = 'react' in allDeps;
    const hasReactDom = 'react-dom' in allDeps;
    if (!hasReact || !hasReactDom) {
      const missing = [!hasReact && 'react', !hasReactDom && 'react-dom'].filter(Boolean);
      return { name: 'Peer dependencies', status: 'warn', message: `Missing: ${missing.join(', ')}` };
    }
    return { name: 'Peer dependencies', status: 'pass', message: 'react and react-dom found' };
  } catch {
    return { name: 'Peer dependencies', status: 'warn', message: 'Could not parse package.json' };
  }
}

function getEnvInfo(): Record<string, string> {
  return {
    'Node.js': process.version,
    Platform: `${process.platform} ${process.arch}`,
    CWD: process.cwd(),
  };
}
