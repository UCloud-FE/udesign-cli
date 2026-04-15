---
name: udesign
description: "Use when the user's task involves UDesign (react-components) — writing components, debugging issues, querying APIs/props/tokens/demos, analyzing usage, or developing console frontend pages."
---

# UDesign CLI

You have access to `@ucloud-fe/udesign-cli` — a local CLI tool with bundled UDesign component metadata. Use it to query component knowledge, analyze projects, and check for issues. All data is offline, no network needed.

You also have access to **per-component skills** (`cpn-basic-*`, `cpn-pro-*`) that contain detailed Props, Demos, Design Tokens, and best practices for each component. When working with a specific component, load its skill first — it has everything you need. Fall back to CLI commands for cross-component queries, project analysis, and token comparisons.

## Setup

```bash
which udesign || npm install -g @ucloud-fe/udesign-cli
```

**Always use `--format json` for structured output you can parse programmatically.**

## When to Use CLI vs Component Skills

| Situation | Use |
|---|---|
| Writing code with a specific component (Button, Table, ...) | **Load the component skill** (`cpn-basic-button`, etc.) — it has Props, Demos, Tokens, and best practices already in context |
| Don't know which component to use | `udesign list --format json` |
| Need to compare tokens across themes | `udesign token Button --theme dark --compare default --format json` |
| Analyzing project-wide UDesign usage | `udesign usage ./src --format json` |
| Checking for deprecated/incorrect usage | `udesign lint ./src --format json` |
| Diagnosing project configuration issues | `udesign doctor --format json` |
| Component skill is not loaded and you need quick API lookup | `udesign info <Component> --format json` |

**Rule of thumb:** Component skill = pre-loaded knowledge (instant). CLI = runtime query (for things not in skills).

## Scenarios

### 1. Writing component code

**Best path:** Load the component skill, which has everything inline.

If the component skill is unavailable or you need a quick cross-check:

```bash
udesign info Button --format json
udesign demo Button basic --format json
udesign token Button --format json
```

**Workflow:** Check if component skill is loaded → if yes, use it directly → if no, `udesign info` → `udesign demo` → write code → `udesign lint`.

### 2. Choosing which component to use

```bash
udesign list --format json
udesign list --category basic --format json
```

### 3. Debugging UDesign issues

```bash
udesign doctor --format json
udesign info Select --format json
udesign lint ./src/components/MyForm.tsx --format json
```

**Workflow:** `udesign doctor` → check configuration → `udesign info` → verify API → `udesign lint` → find deprecated or incorrect usage.

### 4. Analyzing project usage

```bash
udesign usage ./src --format json
udesign usage ./src -f Button --format json
udesign lint ./src --format json
udesign lint ./src --only deprecated --format json
```

### 5. Theming and Design Tokens

```bash
udesign token --format json
udesign token Button --format json
udesign token Button --theme dark --format json
udesign token Button --theme dark --compare default --format json
udesign token --category color --format json
```

Available themes: `default`, `dark`, `green`, `chinamobile`, `fii`, `hgc`, `travelsky`, `private`, `ucloudstack`, `suanfeng`, `adc-158`, `genesis-159-dark`.

### 6. Getting demo source code

```bash
udesign demo Select --format json
udesign demo Select basic --format json
```

## Commands Reference

| Command | Purpose |
|---|---|
| `udesign list` | List all components (basic/pro), with Chinese names |
| `udesign info <Cpn>` | Component Props/API details |
| `udesign demo <Cpn> [name]` | Demo source code |
| `udesign token [Cpn]` | Design tokens (global or component-level, 12 themes) |
| `udesign doctor` | Project health diagnostics |
| `udesign usage [dir]` | Scan UDesign import usage |
| `udesign lint [dir]` | Check deprecated/incorrect usage |
| `udesign extract` | Extract metadata from source repos (maintainer use) |
| `udesign gen-skill` | Generate/update component skill files (maintainer use) |

## Global Flags

| Flag | Purpose |
|---|---|
| `--format json` | Structured output — always use this |
| `--detail` | Include extended fields (sub-components, all demos) |

## Key Rules

1. **Component skills first, CLI second** — If a `cpn-basic-*` or `cpn-pro-*` skill exists for the component you're working with, load it. It has curated Props, Demos, Tokens, AND best practices/FAQs that the CLI JSON output doesn't include.
2. **Always query before writing** — Don't guess UDesign APIs from memory. Either load the component skill or run `udesign info` first.
3. **Use `--format json`** — Every CLI command supports it. Parse the JSON output rather than regex-matching text.
4. **Lint after changes** — After writing or modifying UDesign code, run `udesign lint` on the changed files to catch deprecated or problematic usage.
5. **Respect import conventions** — Always use `import { X } from '@ucloud-fe/react-components'`. Never use deep imports like `/lib/Component`. Never use `antd`, `@alicloud/*`, or `@aliyun/*` packages.
6. **Generate pure JSX** — Always generate JavaScript (JSX), not TypeScript. The console codebase uses JSX.
7. **Use CLI for cross-cutting concerns** — Token theme comparisons, project-wide usage analysis, linting, and diagnostics are CLI-only capabilities that component skills don't provide.
