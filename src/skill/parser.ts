/**
 * Skill file parser — handles AUTO/MANUAL marker-based sections in SKILL.md files.
 *
 * Marker format:
 *   <!-- AUTO_START: key -->  ... <!-- AUTO_END: key -->
 *   <!-- MANUAL_START: key --> ... <!-- MANUAL_END: key -->
 *
 * Everything outside markers is treated as 'static'.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ParsedSkill {
  frontmatter: { name: string; description: string };
  sections: SkillSection[];
}

export interface SkillSection {
  /** 'auto' = machine-generated, 'manual' = human-written, 'static' = unmarked */
  type: 'auto' | 'manual' | 'static';
  /** Identifier for the section, e.g. "props-table", "best-practices" */
  key: string;
  /** Raw markdown content (excluding the marker comments themselves) */
  content: string;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---/;

/** Matches AUTO/MANUAL markers and captures kind + key. */
const MARKER_START_RE =
  /^<!--\s*(AUTO|MANUAL)_START:\s*([\w-]+)\s*-->\s*$/;
const MARKER_END_RE =
  /^<!--\s*(AUTO|MANUAL)_END:\s*([\w-]+)\s*-->\s*$/;

function parseFrontmatter(raw: string): { name: string; description: string } {
  const result: Record<string, string> = {};
  for (const line of raw.split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const k = line.slice(0, idx).trim();
    let v = line.slice(idx + 1).trim();
    // strip surrounding quotes
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    result[k] = v;
  }
  return { name: result['name'] ?? '', description: result['description'] ?? '' };
}

function serializeFrontmatter(fm: { name: string; description: string }): string {
  const lines: string[] = ['---'];
  lines.push(`name: ${fm.name}`);
  // Quote the description to be safe with YAML special chars
  lines.push(`description: ${fm.description}`);
  lines.push('---');
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Parse a SKILL.md string into structured sections, preserving order.
 *
 * If the file has NO markers at all, the entire body (minus frontmatter) is
 * returned as a single 'static' section with key 'legacy-body'.
 */
export function parseSkill(content: string): ParsedSkill {
  // --- frontmatter ---
  let body = content;
  let frontmatter = { name: '', description: '' };
  const fmMatch = FRONTMATTER_RE.exec(content);
  if (fmMatch) {
    frontmatter = parseFrontmatter(fmMatch[1]);
    body = content.slice(fmMatch[0].length);
    // strip leading newlines after frontmatter
    body = body.replace(/^\r?\n/, '');
  }

  // --- sections ---
  const lines = body.split('\n');
  const sections: SkillSection[] = [];

  let currentStaticLines: string[] = [];
  let insideMarker: { type: 'auto' | 'manual'; key: string; lines: string[] } | null = null;

  const flushStatic = () => {
    if (currentStaticLines.length > 0) {
      sections.push({
        type: 'static',
        key: `static-${sections.length}`,
        content: currentStaticLines.join('\n'),
      });
      currentStaticLines = [];
    }
  };

  for (const line of lines) {
    const startMatch = MARKER_START_RE.exec(line.trim());
    const endMatch = MARKER_END_RE.exec(line.trim());

    if (startMatch && !insideMarker) {
      flushStatic();
      const kind = startMatch[1] === 'AUTO' ? 'auto' : 'manual';
      insideMarker = { type: kind, key: startMatch[2], lines: [] };
      continue;
    }

    if (endMatch && insideMarker) {
      const endKind = endMatch[1] === 'AUTO' ? 'auto' : 'manual';
      if (endKind === insideMarker.type && endMatch[2] === insideMarker.key) {
        sections.push({
          type: insideMarker.type,
          key: insideMarker.key,
          content: insideMarker.lines.join('\n'),
        });
        insideMarker = null;
        continue;
      }
    }

    if (insideMarker) {
      insideMarker.lines.push(line);
    } else {
      currentStaticLines.push(line);
    }
  }

  // flush remaining static content
  flushStatic();

  // If there were zero auto/manual sections, mark the body as legacy
  const hasMarkers = sections.some((s) => s.type === 'auto' || s.type === 'manual');
  if (!hasMarkers && sections.length > 0) {
    // Collapse all statics into a single legacy section
    const merged = sections.map((s) => s.content).join('\n');
    return {
      frontmatter,
      sections: [{ type: 'static', key: 'legacy-body', content: merged }],
    };
  }

  return { frontmatter, sections };
}

/**
 * Rebuild a complete SKILL.md string from a ParsedSkill.
 */
export function serializeSkill(parsed: ParsedSkill): string {
  const parts: string[] = [];

  // frontmatter
  parts.push(serializeFrontmatter(parsed.frontmatter));
  parts.push('');

  for (const section of parsed.sections) {
    if (section.type === 'auto') {
      parts.push(`<!-- AUTO_START: ${section.key} -->`);
      parts.push(section.content);
      parts.push(`<!-- AUTO_END: ${section.key} -->`);
    } else if (section.type === 'manual') {
      parts.push(`<!-- MANUAL_START: ${section.key} -->`);
      parts.push(section.content);
      parts.push(`<!-- MANUAL_END: ${section.key} -->`);
    } else {
      parts.push(section.content);
    }
  }

  return parts.join('\n');
}
