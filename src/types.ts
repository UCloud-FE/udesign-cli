export interface MetadataStore {
  version: string;
  extractedAt: string;
  components: ComponentData[];
  globalTokens: TokenThemeMap;
}

export interface ComponentData {
  name: string;
  nameZh?: string;
  category: 'basic' | 'pro';
  group?: string;
  description: string;
  whenToUse?: string;
  props: PropData[];
  subComponents?: SubComponentData[];
  demos: DemoData[];
  tokens?: ComponentTokenData;
  doc?: string;
  sourceFile: string;
  packageName: string;
  importPath: string;
}

export interface PropData {
  name: string;
  type: string;
  typeRaw?: string;
  required: boolean;
  default?: string;
  description: string;
  deprecated?: boolean;
  deprecatedMessage?: string;
  ignore?: boolean;
  since?: string;
}

export interface SubComponentData {
  name: string;
  displayName: string;
  props: PropData[];
  description?: string;
}

export interface DemoData {
  name: string;
  title: string;
  source: string;
  codepath: string;
}

export interface TokenThemeMap {
  themes: string[];
  globalTokens: TokenData[];
  componentTokens: Record<string, TokenData[]>;
}

export interface TokenData {
  name: string;
  category: TokenCategory;
  values: Record<string, string>;
  comment?: string;
}

export type TokenCategory =
  | 'color'
  | 'spacing'
  | 'typography'
  | 'dimension'
  | 'corner'
  | 'shadow'
  | 'line'
  | 'other';

export interface ComponentTokenData {
  tokens: TokenData[];
}

export interface ExtractOptions {
  sourceDir: string;
  tokensDir: string;
  outputPath: string;
}

export interface CliGlobalOptions {
  format: 'json' | 'text' | 'markdown';
  detail: boolean;
}

export const TOKEN_COMPONENT_MAP: Record<string, string> = {
  BUTTON: 'Button',
  CARD: 'Card',
  DRAWER: 'Drawer',
  INPUT: 'Input',
  TABLE: 'Table',
  TAG: 'Tag',
  SWITCH: 'Switch',
  SLIDER: 'Slider',
  RADIO: 'Radio',
  POPOVER: 'Popover',
  TABS: 'Tabs',
  LIST: 'List',
  SKELETON: 'Skeleton',
  PROGRESS: 'Progress',
  LOADING: 'Loading',
  FORM: 'Form',
  MODAL: 'Modal',
};

export function categorizeToken(tokenName: string): TokenCategory {
  if (tokenName.includes('_COLOR_') || tokenName.includes('_MASK_')) return 'color';
  if (tokenName.includes('_SPACING_') || tokenName.includes('_PADDING_') || tokenName.includes('_MARGIN_')) return 'spacing';
  if (tokenName.includes('_TYPO_') || tokenName.includes('_FONT_')) return 'typography';
  if (tokenName.includes('_HEIGHT_') || tokenName.includes('_WIDTH_') || tokenName.includes('_SIZE_') || tokenName.includes('_SQUARE_')) return 'dimension';
  if (tokenName.includes('_CORNER_')) return 'corner';
  if (tokenName.includes('_SHADOW_')) return 'shadow';
  if (tokenName.includes('_LINE_')) return 'line';
  return 'other';
}

export function tokenToComponent(tokenName: string): string | null {
  const withoutPrefix = tokenName.replace(/^T_/, '');
  for (const [prefix, component] of Object.entries(TOKEN_COMPONENT_MAP)) {
    if (withoutPrefix.startsWith(prefix + '_')) {
      return component;
    }
  }
  return null;
}
