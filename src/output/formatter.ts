import type { PropData } from '../types.js';

export function formatOutput(data: unknown, format: 'json' | 'text' | 'markdown'): string {
  if (format === 'json') return JSON.stringify(data, null, 2);
  if (typeof data === 'string') return data;
  return JSON.stringify(data, null, 2);
}

export function formatTable(headers: string[], rows: string[][]): string {
  const colWidths = headers.map((h, i) => {
    const maxRow = rows.reduce((max, r) => Math.max(max, (r[i] ?? '').length), 0);
    return Math.max(h.length, maxRow);
  });

  const pad = (s: string, w: number) => s + ' '.repeat(Math.max(0, w - s.length));
  const sep = '┼' ;
  const line = colWidths.map(w => '─'.repeat(w + 2));

  const out: string[] = [];
  out.push('┌' + line.join('┬') + '┐');
  out.push('│ ' + headers.map((h, i) => pad(h, colWidths[i])).join(' │ ') + ' │');
  out.push('├' + line.join(sep) + '┤');
  for (const row of rows) {
    out.push('│ ' + row.map((c, i) => pad(c ?? '', colWidths[i])).join(' │ ') + ' │');
  }
  out.push('└' + line.join('┴') + '┘');
  return out.join('\n');
}

export function formatPropsTable(props: PropData[], format: string): string {
  if (format === 'json') return JSON.stringify(props, null, 2);

  const visible = props.filter(p => !p.ignore);
  if (visible.length === 0) return '(no props)';

  if (format === 'markdown') {
    const lines = [
      '| Name | Type | Required | Default | Description |',
      '|------|------|----------|---------|-------------|',
    ];
    for (const p of visible) {
      const dep = p.deprecated ? ' ⚠️ DEPRECATED' : '';
      lines.push(`| ${p.name} | \`${p.type}\` | ${p.required ? '✓' : ''} | ${p.default ?? '-'} | ${p.description}${dep} |`);
    }
    return lines.join('\n');
  }

  const headers = ['Name', 'Type', 'Req', 'Default', 'Description'];
  const rows = visible.map(p => {
    const dep = p.deprecated ? ' [DEPRECATED]' : '';
    return [p.name, p.type, p.required ? '✓' : '', p.default ?? '-', p.description + dep];
  });
  return formatTable(headers, rows);
}
