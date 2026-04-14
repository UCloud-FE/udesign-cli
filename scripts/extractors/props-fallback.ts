import * as fs from 'fs';
import type { PropData } from '../../src/types.js';

interface RecodoTsType {
  name?: string;
  raw?: string;
}

interface RecodoPropInfo {
  tsType?: RecodoTsType;
  description?: { description?: string; tags?: Record<string, Array<{ title?: string; description?: string }>> };
  required?: boolean;
  defaultValue?: { value?: string; computed?: boolean };
}

interface RecodoComponentInfo {
  info?: {
    props?: Record<string, RecodoPropInfo>;
  };
}

type RecodoData = Record<string, RecodoComponentInfo>;

function parseTag(tags: Record<string, Array<{ title?: string; description?: string }>> | undefined, tagName: string): string | undefined {
  if (!tags?.[tagName]?.length) return undefined;
  return tags[tagName][0].description || '';
}

export function extractPropsFromRecodo(infoJsonPath: string, componentName: string): PropData[] {
  if (!fs.existsSync(infoJsonPath)) return [];

  let raw: string;
  try {
    raw = fs.readFileSync(infoJsonPath, 'utf-8');
  } catch {
    return [];
  }

  let data: RecodoData;
  try {
    data = JSON.parse(raw);
  } catch {
    return [];
  }

  const componentInfo = data[componentName];
  if (!componentInfo?.info?.props) return [];

  const props: PropData[] = [];

  for (const [propName, propInfo] of Object.entries(componentInfo.info.props)) {
    const tags = propInfo.description?.tags;
    const isIgnored = parseTag(tags, 'ignore') !== undefined;
    if (isIgnored) continue;

    const isDeprecated = parseTag(tags, 'deprecated') !== undefined;
    const deprecatedMessage = parseTag(tags, 'deprecated');
    const since = parseTag(tags, 'since');

    const prop: PropData = {
      name: propName,
      type: propInfo.tsType?.raw ?? propInfo.tsType?.name ?? 'unknown',
      required: propInfo.required ?? false,
      description: propInfo.description?.description ?? '',
    };

    if (propInfo.defaultValue?.value !== undefined) {
      prop.default = String(propInfo.defaultValue.value);
    }

    if (propInfo.tsType?.raw && propInfo.tsType.raw !== prop.type) {
      prop.typeRaw = propInfo.tsType.raw;
    }

    if (isDeprecated) {
      prop.deprecated = true;
      if (deprecatedMessage) prop.deprecatedMessage = deprecatedMessage;
    }

    if (since) prop.since = since;

    props.push(prop);
  }

  return props;
}
