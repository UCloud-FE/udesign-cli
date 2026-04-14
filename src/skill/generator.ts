import * as fs from 'node:fs';
import * as path from 'node:path';
import Handlebars from 'handlebars';
import type { ComponentData, PropData, TokenData } from '../types.js';
import { parseSkill, serializeSkill } from './parser.js';
import type { SkillSection } from './parser.js';

export interface GenerateOptions {
  tier?: 'basic';
  templatesDir?: string;
}

// ---------------------------------------------------------------------------
// Handlebars setup
// ---------------------------------------------------------------------------

function toKebabCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

function resolveTemplatesDir(opts?: GenerateOptions): string {
  if (opts?.templatesDir) return opts.templatesDir;
  // Walk up from this file to find the project root templates/ dir.
  // At runtime (tsx) this file is at src/skill/generator.ts → project root is ../../
  // At bundle (dist/) this file might be elsewhere, so also try __dirname fallbacks.
  const candidates = [
    path.resolve(import.meta.dirname ?? '.', '../../templates'),
    path.resolve(import.meta.dirname ?? '.', '../templates'),
    path.resolve(process.cwd(), 'templates'),
  ];
  for (const c of candidates) {
    if (fs.existsSync(path.join(c, 'skill-basic.hbs'))) return c;
  }
  throw new Error('Could not locate templates/ directory. Pass templatesDir in options.');
}

function buildHandlebars(templatesDir: string): typeof Handlebars {
  const hbs = Handlebars.create();

  // Register partials from templates/partials/
  const partialsDir = path.join(templatesDir, 'partials');
  if (fs.existsSync(partialsDir)) {
    for (const file of fs.readdirSync(partialsDir)) {
      if (!file.endsWith('.hbs')) continue;
      const name = file.replace(/\.hbs$/, '');
      hbs.registerPartial(name, fs.readFileSync(path.join(partialsDir, file), 'utf-8'));
    }
  }

  hbs.registerHelper('kebabCase', toKebabCase);

  return hbs;
}

// ---------------------------------------------------------------------------
// Template data preparation
// ---------------------------------------------------------------------------

function pickBestDemo(component: ComponentData): { title: string; source: string } | null {
  if (component.demos.length === 0) return null;

  const candidates = component.demos.filter(d => d.name !== component.name.toLowerCase());

  const preferred = ['basic', 'base', 'simple', 'default'];
  for (const pref of preferred) {
    const match = candidates.find(d => d.name.toLowerCase() === pref);
    if (match) return { title: match.title, source: match.source };
  }

  const short = [...candidates].sort((a, b) => a.source.split('\n').length - b.source.split('\n').length);
  if (short.length > 0 && short[0].source.split('\n').length < 40) {
    return { title: short[0].title, source: short[0].source };
  }

  const first = candidates[0] ?? component.demos[0];
  return { title: first.title, source: first.source };
}

interface TemplateData {
  name: string;
  nameZh: string;
  kebabName: string;
  description: string;
  whenToUse: string;
  props: PropData[];
  subComponents: Array<{ displayName: string; description?: string; props: PropData[] }>;
  demos: Array<{ title: string; source: string }>;
  firstDemo: { title: string; source: string } | null;
  tokens: TokenData[];
  hasTokens: boolean;
}

function prepareData(component: ComponentData): TemplateData {
  const visibleProps = component.props.filter((p) => !p.ignore);
  const tokens = component.tokens?.tokens ?? [];

  return {
    name: component.name,
    nameZh: component.nameZh ?? '',
    kebabName: toKebabCase(component.name),
    description: component.description,
    whenToUse: component.whenToUse ?? '',
    props: visibleProps,
    subComponents: (component.subComponents ?? []).map((sc) => ({
      displayName: sc.displayName,
      description: sc.description,
      props: sc.props.filter((p) => !p.ignore),
    })),
    demos: component.demos.map((d) => ({ title: d.title, source: d.source })),
    firstDemo: pickBestDemo(component),
    tokens,
    hasTokens: tokens.length > 0,
  };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Generate a brand-new SKILL.md from component metadata.
 */
export function generateSkill(component: ComponentData, options?: GenerateOptions): string {
  const tier = options?.tier ?? component.category;
  const templatesDir = resolveTemplatesDir(options);
  const hbs = buildHandlebars(templatesDir);

  const templateFile = 'skill-basic.hbs';
  const templateSrc = fs.readFileSync(path.join(templatesDir, templateFile), 'utf-8');
  const template = hbs.compile(templateSrc, { noEscape: true });

  const data = prepareData(component);
  return template(data);
}

/**
 * Update an existing SKILL.md — replaces AUTO sections, preserves MANUAL ones.
 *
 * If the existing file has no markers (legacy), the entire body is preserved as
 * a MANUAL 'legacy-body' section, and AUTO sections are appended.
 */
export function updateSkill(
  existingContent: string,
  component: ComponentData,
  options?: GenerateOptions,
): string {
  const existing = parseSkill(existingContent);
  const freshMarkdown = generateSkill(component, options);
  const fresh = parseSkill(freshMarkdown);

  // Build a lookup of new AUTO sections by key
  const freshAutoMap = new Map<string, SkillSection>();
  for (const s of fresh.sections) {
    if (s.type === 'auto') freshAutoMap.set(s.key, s);
  }

  // Check if the existing file is a legacy (no markers) file
  const isLegacy =
    existing.sections.length === 1 && existing.sections[0].key === 'legacy-body';

  if (isLegacy) {
    // Preserve legacy body as a manual section, prepend it, then add all fresh sections
    const legacySection: SkillSection = {
      type: 'manual',
      key: 'legacy-body',
      content: existing.sections[0].content,
    };
    return serializeSkill({
      frontmatter: fresh.frontmatter,
      sections: [legacySection, ...fresh.sections],
    });
  }

  // Normal update: walk existing sections, replace AUTO with fresh data, keep MANUAL
  const updatedSections: SkillSection[] = [];
  const usedAutoKeys = new Set<string>();

  for (const section of existing.sections) {
    if (section.type === 'auto') {
      const replacement = freshAutoMap.get(section.key);
      if (replacement) {
        updatedSections.push(replacement);
        usedAutoKeys.add(section.key);
      } else {
        // AUTO section no longer generated → drop it
      }
    } else {
      updatedSections.push(section);
    }
  }

  // Append any NEW auto sections that didn't exist in the old file
  for (const s of fresh.sections) {
    if (s.type === 'auto' && !usedAutoKeys.has(s.key)) {
      updatedSections.push(s);
    }
  }

  return serializeSkill({
    frontmatter: { ...existing.frontmatter, ...fresh.frontmatter },
    sections: updatedSections,
  });
}
