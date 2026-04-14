import * as ts from 'typescript';
import type { PropData, SubComponentData } from '../../src/types.js';

const NATIVE_ELEMENT_TYPES = new Set([
  'HTMLAttributes',
  'HTMLButtonElement',
  'HTMLInputElement',
  'HTMLDivElement',
  'HTMLSpanElement',
  'HTMLAnchorElement',
  'HTMLFormElement',
  'HTMLTextAreaElement',
  'HTMLSelectElement',
  'HTMLTableElement',
  'HTMLElement',
  'SVGElement',
  'SVGSVGElement',
  'React.HTMLAttributes',
  'React.ButtonHTMLAttributes',
  'React.InputHTMLAttributes',
  'React.TextareaHTMLAttributes',
  'React.SelectHTMLAttributes',
  'React.AnchorHTMLAttributes',
  'React.FormHTMLAttributes',
  'React.TableHTMLAttributes',
  'React.HTMLProps',
  'React.SVGProps',
  'React.DetailedHTMLProps',
  'React.ComponentPropsWithRef',
  'React.ComponentPropsWithoutRef',
  'React.AriaAttributes',
  'React.DOMAttributes',
]);

function createProgram(filePath: string): { program: ts.Program; sourceFile: ts.SourceFile | undefined } {
  const program = ts.createProgram([filePath], {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
    jsx: ts.JsxEmit.React,
    strict: true,
    skipLibCheck: true,
    noEmit: true,
    allowJs: true,
  });
  const sourceFile = program.getSourceFile(filePath);
  return { program, sourceFile };
}

function isNativeInheritance(heritage: ts.ExpressionWithTypeArguments): boolean {
  const text = heritage.expression.getText();
  for (const native of NATIVE_ELEMENT_TYPES) {
    if (text === native || text.endsWith(native)) return true;
  }
  return /^(HTML|SVG)\w*(Element|Attributes)/.test(text);
}

function getJsDocComment(node: ts.Node, sourceFile: ts.SourceFile): string {
  const fullText = sourceFile.getFullText();
  const ranges = ts.getLeadingCommentRanges(fullText, node.getFullStart());
  if (!ranges) return '';

  for (const range of ranges) {
    if (range.kind === ts.SyntaxKind.MultiLineCommentTrivia) {
      const raw = fullText.substring(range.pos, range.end);
      if (!raw.startsWith('/**')) continue;
      return parseJsDocBody(raw);
    }
  }
  return '';
}

function parseJsDocBody(raw: string): string {
  const lines = raw
    .replace(/^\/\*\*/, '')
    .replace(/\*\/$/, '')
    .split('\n')
    .map(l => l.replace(/^\s*\*\s?/, '').trim());

  const desc: string[] = [];
  for (const line of lines) {
    if (line.startsWith('@')) break;
    if (line) desc.push(line);
  }
  return desc.join(' ').trim();
}

function getJsDocTagValue(node: ts.Node, sourceFile: ts.SourceFile, tagName: string): string | undefined {
  const fullText = sourceFile.getFullText();
  const ranges = ts.getLeadingCommentRanges(fullText, node.getFullStart());
  if (!ranges) return undefined;

  for (const range of ranges) {
    if (range.kind === ts.SyntaxKind.MultiLineCommentTrivia) {
      const raw = fullText.substring(range.pos, range.end);
      if (!raw.startsWith('/**')) continue;

      const tagRegex = new RegExp(`@${tagName}(?:\\s+(.*))?$`, 'm');
      const match = raw.match(tagRegex);
      if (match) {
        return match[1]?.replace(/\s*\*\/$/, '').trim() ?? '';
      }
    }
  }
  return undefined;
}

function hasJsDocTag(node: ts.Node, sourceFile: ts.SourceFile, tagName: string): boolean {
  return getJsDocTagValue(node, sourceFile, tagName) !== undefined;
}

function resolveTypeString(checker: ts.TypeChecker, type: ts.Type, node: ts.Node): string {
  if (type.isUnion()) {
    const nonUndefined = type.types.filter(t => !(t.getFlags() & ts.TypeFlags.Undefined));

    const isBooleanUnion =
      nonUndefined.length === 2 &&
      nonUndefined.every(t => t.getFlags() & ts.TypeFlags.BooleanLiteral);
    if (isBooleanUnion) return 'boolean';

    const parts = nonUndefined.map(t => checker.typeToString(t, node, ts.TypeFormatFlags.NoTruncation));
    if (parts.length > 1) return parts.join(' | ');
    if (parts.length === 1) return parts[0];
  }

  if (type.getFlags() & ts.TypeFlags.StringLiteral) {
    return `'${(type as ts.StringLiteralType).value}'`;
  }

  return checker.typeToString(type, node, ts.TypeFormatFlags.NoTruncation);
}

function isRedundantTypeRaw(type: string, typeRaw: string): boolean {
  return typeRaw === type || typeRaw === `${type} | undefined` || typeRaw === `(${type}) | undefined`;
}

function extractDefaultProps(sourceFile: ts.SourceFile, componentName: string): Map<string, string> {
  const defaults = new Map<string, string>();
  const topLevelVars = new Map<string, ts.ObjectLiteralExpression>();

  function collectTopLevelVars(node: ts.Node) {
    if (ts.isVariableStatement(node)) {
      for (const decl of node.declarationList.declarations) {
        if (ts.isIdentifier(decl.name) && decl.initializer && ts.isObjectLiteralExpression(decl.initializer)) {
          topLevelVars.set(decl.name.text, decl.initializer);
        }
      }
    }
    ts.forEachChild(node, collectTopLevelVars);
  }
  ts.forEachChild(sourceFile, collectTopLevelVars);

  function extractFromObjectLiteral(obj: ts.ObjectLiteralExpression) {
    for (const prop of obj.properties) {
      if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
        defaults.set(prop.name.text, prop.initializer.getText(sourceFile));
      }
    }
  }

  function resolveInitializer(init: ts.Expression): ts.ObjectLiteralExpression | undefined {
    if (ts.isObjectLiteralExpression(init)) return init;
    if (ts.isIdentifier(init)) return topLevelVars.get(init.text);
    return undefined;
  }

  function visit(node: ts.Node) {
    // Pattern: ComponentName.defaultProps = { ... } or ComponentName.defaultProps = varName
    if (
      ts.isExpressionStatement(node) &&
      ts.isBinaryExpression(node.expression) &&
      node.expression.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
      ts.isPropertyAccessExpression(node.expression.left)
    ) {
      const left = node.expression.left;
      if (
        left.name.text === 'defaultProps' &&
        ts.isIdentifier(left.expression) &&
        left.expression.text === componentName
      ) {
        const resolved = resolveInitializer(node.expression.right);
        if (resolved) extractFromObjectLiteral(resolved);
      }
    }

    // Pattern: static defaultProps = { ... } or static defaultProps = varName
    if (ts.isPropertyDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === 'defaultProps') {
      if (node.initializer) {
        const resolved = resolveInitializer(node.initializer);
        if (resolved) extractFromObjectLiteral(resolved);
      }
    }

    ts.forEachChild(node, visit);
  }

  ts.forEachChild(sourceFile, visit);
  return defaults;
}

function extractParamDefaults(sourceFile: ts.SourceFile): Map<string, string> {
  const defaults = new Map<string, string>();

  function visit(node: ts.Node) {
    if (
      (ts.isFunctionDeclaration(node) || ts.isArrowFunction(node) || ts.isFunctionExpression(node)) &&
      node.parameters.length > 0
    ) {
      const firstParam = node.parameters[0];
      if (firstParam.name && ts.isObjectBindingPattern(firstParam.name)) {
        for (const element of firstParam.name.elements) {
          if (element.initializer && ts.isIdentifier(element.name)) {
            defaults.set(element.name.text, element.initializer.getText(sourceFile));
          }
        }
      }
    }
    ts.forEachChild(node, visit);
  }

  ts.forEachChild(sourceFile, visit);
  return defaults;
}

function extractPropsFromInterface(
  interfaceDecl: ts.InterfaceDeclaration,
  checker: ts.TypeChecker,
  sourceFile: ts.SourceFile,
  defaults: Map<string, string>,
): PropData[] {
  const props: PropData[] = [];

  for (const member of interfaceDecl.members) {
    if (!ts.isPropertySignature(member) && !ts.isMethodSignature(member)) continue;
    if (!member.name || !ts.isIdentifier(member.name)) continue;

    const name = member.name.text;
    const ignore = hasJsDocTag(member, sourceFile, 'ignore');
    const deprecated = hasJsDocTag(member, sourceFile, 'deprecated');
    const deprecatedMessage = deprecated ? getJsDocTagValue(member, sourceFile, 'deprecated') || undefined : undefined;
    const description = getJsDocComment(member, sourceFile);
    const since = getJsDocTagValue(member, sourceFile, 'since') || undefined;
    const required = !member.questionToken;

    let typeStr = 'unknown';
    let typeRaw: string | undefined;
    const symbol = member.name ? checker.getSymbolAtLocation(member.name) : undefined;
    if (symbol) {
      const memberType = checker.getTypeOfSymbolAtLocation(symbol, member);
      typeStr = resolveTypeString(checker, memberType, member);
      const rawFromChecker = checker.typeToString(memberType, member, ts.TypeFormatFlags.NoTruncation);
      if (!isRedundantTypeRaw(typeStr, rawFromChecker)) {
        typeRaw = rawFromChecker;
      }
    } else if (member.type) {
      typeStr = member.type.getText(sourceFile);
    }

    const defaultValue = defaults.get(name);

    props.push({
      name,
      type: typeStr,
      ...(typeRaw ? { typeRaw } : {}),
      required,
      ...(defaultValue !== undefined ? { default: defaultValue } : {}),
      description,
      ...(deprecated ? { deprecated: true } : {}),
      ...(deprecatedMessage ? { deprecatedMessage } : {}),
      ...(ignore ? { ignore: true } : {}),
      ...(since ? { since } : {}),
    });
  }

  return props;
}

function findInterface(sourceFile: ts.SourceFile, name: string): ts.InterfaceDeclaration | undefined {
  let found: ts.InterfaceDeclaration | undefined;
  function visit(node: ts.Node) {
    if (ts.isInterfaceDeclaration(node) && node.name.text === name) {
      found = node;
      return;
    }
    ts.forEachChild(node, visit);
  }
  ts.forEachChild(sourceFile, visit);
  return found;
}

function findTypeAlias(sourceFile: ts.SourceFile, name: string): ts.TypeAliasDeclaration | undefined {
  let found: ts.TypeAliasDeclaration | undefined;
  function visit(node: ts.Node) {
    if (ts.isTypeAliasDeclaration(node) && node.name.text === name) {
      found = node;
      return;
    }
    ts.forEachChild(node, visit);
  }
  ts.forEachChild(sourceFile, visit);
  return found;
}

function findSubComponentInterfaces(
  sourceFile: ts.SourceFile,
  mainPropsName: string,
): ts.InterfaceDeclaration[] {
  const results: ts.InterfaceDeclaration[] = [];
  function visit(node: ts.Node) {
    if (ts.isInterfaceDeclaration(node) && node.name.text.endsWith('Props') && node.name.text !== mainPropsName) {
      const hasExport = node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword);
      if (hasExport) results.push(node);
    }
    ts.forEachChild(node, visit);
  }
  ts.forEachChild(sourceFile, visit);
  return results;
}

export function extractProps(filePath: string, componentName: string): PropData[] {
  const { program, sourceFile } = createProgram(filePath);
  if (!sourceFile) return [];

  const checker = program.getTypeChecker();
  const propsInterfaceName = `${componentName}Props`;

  const interfaceDecl = findInterface(sourceFile, propsInterfaceName);

  if (interfaceDecl) {
    const defaults = new Map([
      ...extractDefaultProps(sourceFile, componentName),
      ...extractParamDefaults(sourceFile),
    ]);
    return extractPropsFromInterface(interfaceDecl, checker, sourceFile, defaults);
  }

  const typeAlias = findTypeAlias(sourceFile, propsInterfaceName);
  if (typeAlias) {
    const symbol = checker.getSymbolAtLocation(typeAlias.name);
    if (symbol) {
      const type = checker.getDeclaredTypeOfSymbol(symbol);
      const properties = type.getProperties();
      const defaults = new Map([
        ...extractDefaultProps(sourceFile, componentName),
        ...extractParamDefaults(sourceFile),
      ]);
      return properties.map(prop => {
        const propType = checker.getTypeOfSymbolAtLocation(prop, typeAlias);
        const declarations = prop.getDeclarations();
        const decl = declarations?.[0];
        const isOptional = decl && (ts.isPropertySignature(decl) || ts.isPropertyDeclaration(decl)) ? !!decl.questionToken : false;

        let description = '';
        let deprecated = false;
        let deprecatedMessage: string | undefined;
        let ignore = false;
        let since: string | undefined;

        if (decl) {
          const declSourceFile = decl.getSourceFile();
          description = getJsDocComment(decl, declSourceFile);
          deprecated = hasJsDocTag(decl, declSourceFile, 'deprecated');
          deprecatedMessage = deprecated ? getJsDocTagValue(decl, declSourceFile, 'deprecated') || undefined : undefined;
          ignore = hasJsDocTag(decl, declSourceFile, 'ignore');
          since = getJsDocTagValue(decl, declSourceFile, 'since') || undefined;
        }

        const typeStr = resolveTypeString(checker, propType, typeAlias);
        const defaultValue = defaults.get(prop.getName());

        return {
          name: prop.getName(),
          type: typeStr,
          required: !isOptional,
          ...(defaultValue !== undefined ? { default: defaultValue } : {}),
          description,
          ...(deprecated ? { deprecated: true } : {}),
          ...(deprecatedMessage ? { deprecatedMessage } : {}),
          ...(ignore ? { ignore: true } : {}),
          ...(since ? { since } : {}),
        } satisfies PropData;
      });
    }
  }

  return [];
}

export function extractSubComponentProps(filePath: string, mainComponentName: string): SubComponentData[] {
  const { program, sourceFile } = createProgram(filePath);
  if (!sourceFile) return [];

  const checker = program.getTypeChecker();
  const mainPropsName = `${mainComponentName}Props`;
  const subInterfaces = findSubComponentInterfaces(sourceFile, mainPropsName);
  const defaults = new Map([
    ...extractDefaultProps(sourceFile, mainComponentName),
    ...extractParamDefaults(sourceFile),
  ]);

  return subInterfaces.map(iface => {
    const ifaceName = iface.name.text;
    // "SelectOptionProps" -> subName = "Option", displayName = "Select.Option"
    const suffix = ifaceName.replace(/Props$/, '');
    const subName = suffix.startsWith(mainComponentName) ? suffix.slice(mainComponentName.length) : suffix;
    const displayName = subName ? `${mainComponentName}.${subName}` : mainComponentName;
    const description = getJsDocComment(iface, sourceFile);

    return {
      name: subName || ifaceName,
      displayName,
      props: extractPropsFromInterface(iface, checker, sourceFile, defaults),
      ...(description ? { description } : {}),
    } satisfies SubComponentData;
  });
}
