# @ucloud-fe/udesign-cli

UDesign 组件库命令行工具 — 查询组件知识、提取元数据、自动生成 Skill 文件，完全离线。

## 核心能力

- **组件查询** — 56 个组件的 Props、Demo 源码、完整文档，毫秒级响应
- **Design Token** — 12 套主题 × 420+ Token，支持跨主题对比
- **Skill 自动生成** — 从源码提取元数据，自动生成/更新 AI Agent 的组件 Skill 文件，保留人工策展内容
- **项目分析** — 扫描 UDesign 用量、检查废弃 API 和不规范引入
- **完全离线** — 所有元数据随包安装，零网络请求

## 安装

```bash
npm install -g @ucloud-fe/udesign-cli
```

要求 Node.js >= 20。

## 快速开始

```bash
# 列出所有组件
udesign list

# 查询 Button 的 Props
udesign info Button

# 获取 Select 的 Demo 源码
udesign demo Select basic

# 查看 Button 在暗色主题下的 Token
udesign token Button --theme dark --compare default

# 检查项目中的 UDesign 用量
udesign usage ./src

# 检查废弃用法
udesign lint ./src
```

## 命令

### 知识查询

#### `udesign list`

列出所有组件，含中文名和分类。

```bash
udesign list                       # 全部组件
udesign list --category basic      # 仅 basic 组件
udesign list --format json         # JSON 输出
```

#### `udesign info <component>`

查询组件 Props/API 详情。

```bash
udesign info Button                # Props 表格
udesign info Button --detail       # 含子组件、Demo 列表
udesign info Button --format json  # JSON 输出（Agent 友好）
```

输入拼错时自动建议：

```
$ udesign info Buttn
Error: Component "Buttn" not found.

Did you mean?
  - Button
```

#### `udesign demo <component> [name]`

获取 Demo 源码。

```bash
udesign demo Button                # 列出所有 Demo
udesign demo Button styleType      # 查看特定 Demo 源码
udesign demo Select basic --format json
```

#### `udesign token [component]`

查询 Design Token，支持 12 套主题。

```bash
udesign token                              # 全局 Token
udesign token Button                       # Button 组件 Token
udesign token Button --theme dark          # 暗色主题下的值
udesign token Button --theme dark --compare default  # 两个主题对比
udesign token --category color             # 只看颜色类 Token
```

支持的主题：`default`、`dark`、`green`、`chinamobile`、`fii`、`hgc`、`travelsky`、`private`、`ucloudstack`、`suanfeng`、`adc-158`、`genesis-159-dark`。

### 项目分析

#### `udesign doctor`

项目健康诊断。

```bash
udesign doctor                     # 检查 Node 版本、依赖安装、peer 依赖
udesign doctor --format json
```

#### `udesign usage [dir]`

扫描项目中的 UDesign 导入用量。

```bash
udesign usage ./src                # 全部组件用量统计
udesign usage ./src -f Button      # 只看 Button 的用量
udesign usage ./src --format json
```

#### `udesign lint [dir]`

检查废弃 API 和不规范用法。

```bash
udesign lint ./src                 # 全部规则
udesign lint ./src --only deprecated  # 只检查废弃用法
```

检查规则：

| 规则 | 严重性 | 说明 |
|---|---|---|
| `deep-import` | warn | 使用了 `/lib/` 深路径引入 |
| `wrong-package` | error | 引入了 antd / @alicloud 等外部包 |

### Skill 工具

#### `udesign gen-skill [component]`

从元数据生成/更新组件 Skill 文件。

```bash
udesign gen-skill Button           # 生成单个组件 Skill
udesign gen-skill --all            # 生成全部组件 Skill
udesign gen-skill --all -o ./skills -d ./data/metadata.json
```

生成的 Skill 文件采用 `AUTO_START`/`MANUAL_START` 标记分层：
- **AUTO 区域**（机器生成）：Props 表格、Demo 代码、Token 数据、引入规范 → 每次运行自动更新
- **MANUAL 区域**（人工策展）：最佳实践、常见问题、注意事项 → 更新时完整保留

### 数据管理

#### `udesign extract`

从源码仓库提取元数据（维护者命令）。

```bash
udesign extract \
  --source ~/Projects/react-components \
  --tokens ~/Projects/design-tokens \
  --output ./data/metadata.json
```

### 全局参数

| 参数 | 说明 | 默认值 |
|---|---|---|
| `--format json\|text\|markdown` | 输出格式 | `text` |
| `--detail` | 包含扩展信息 | `false` |

## AI Agent 集成

### 双层 Skill 体系

本工具设计了 **总编排 Skill + 每组件 Skill** 的双层协同结构：

```
┌───────────────────────────────────────┐
│  udesign/SKILL.md — 总编排 Skill       │  ← 工作流指引 + CLI 用法
│  "写代码前先查 API、改完后跑 lint"       │
│  "组件 Skill 优先，CLI 补充"            │
└──────────────┬────────────────────────┘
               │ Agent 按需加载
               ▼
┌──────────┐ ┌──────────┐ ┌──────────┐
│cpn-basic-│ │cpn-basic-│ │cpn-basic-│
│button    │ │select    │ │table     │  ... × 56
│SKILL.md  │ │SKILL.md  │ │SKILL.md  │
│(完整知识) │ │(完整知识) │ │(完整知识) │  ← Props + Demo + Token + 最佳实践
└──────────┘ └──────────┘ └──────────┘
```

| 层级 | 触发时机 | 职责 |
|---|---|---|
| 总 Skill | 用户提到 UDesign / 控制台前端 | 工作流编排，CLI 命令指引 |
| 组件 Skill | 用户提到具体组件名 | 单组件完整知识，即时可用 |
| CLI 命令 | Skill 未覆盖的场景 | 项目扫描、lint、跨主题对比 |

### 在 Claude Code / OpenCode 中使用

将 `skills/udesign/` 目录放入项目的 `.opencode/skills/` 或 `.claude/skills/`：

```bash
cp -r skills/udesign/ /path/to/project/.opencode/skills/udesign/
```

组件 Skill 通过 `gen-skill --all` 生成后也放入同一目录。

## 数据提取管线

### 架构

```
react-components 源码           design-tokens 仓库
(TypeScript interfaces)        (12 theme × 420 tokens)
        │                              │
        ▼                              ▼
  extractors/                    extractors/
  ├── components.ts              └── tokens.ts
  ├── props.ts (TS Compiler API)
  ├── props-fallback.ts (recodo-gen)
  ├── demos.ts
  └── docs.ts
        │                              │
        └──────────┬───────────────────┘
                   ▼
           scripts/extract.ts
                   │
                   ▼
            data/metadata.json (1.2MB)
                   │
        ┌──────────┼──────────┐
        ▼          ▼          ▼
    CLI 查询   Skill 生成   JSON API
```

### Props 提取策略

| 组件类型 | 提取方式 | 数据源 |
|---|---|---|
| `.tsx` 组件 (23 个) | TypeScript Compiler API | `interface XxxProps` + JSDoc |
| `.jsx` 组件 (33 个) | recodo-gen JSON fallback | `.recodo/data/*.info.json` |

### 同步维护流程

```
react-components 发新版本 (git tag)
         │
         ▼
CI 触发 → udesign extract → udesign gen-skill --all
         │
         ▼
自动创建 MR → 人工 Review → Merge
```

## 开发

```bash
git clone <repo> && cd udesign-cli
npm install

# 开发模式
npm run dev

# 提取元数据（需要本地 clone react-components 和 design-tokens）
npm run extract -- --source ../react-components --tokens ../design-tokens --output data/metadata.json

# 类型检查
npm run lint

# 测试
npm run test

# 构建
npm run build
```

### 项目结构

```
src/
  index.ts                  # CLI 入口 (commander, 9 条命令)
  types.ts                  # 核心类型定义
  commands/                 # 每条命令一个文件
  data/                     # 数据加载 + 缓存 + 模糊匹配
  output/                   # 格式化输出 + 错误处理
  skill/                    # Skill 解析器 + 生成器
  utils/                    # AST 扫描工具
scripts/
  extract.ts                # 提取编排器
  extractors/               # 6 个提取器模块
templates/                  # Handlebars 模板 (basic/pro + partials)
skills/udesign/             # 总编排 Skill
data/metadata.json          # 预生成的元数据
```

### 技术栈

| 层级 | 技术 |
|---|---|
| 语言 | TypeScript (ESM) |
| CLI 框架 | commander |
| 构建 | tsup |
| Props 提取 | TypeScript Compiler API |
| AST 扫描 | oxc-parser |
| 模板引擎 | Handlebars |
| 测试 | vitest |

运行时依赖仅 `commander` + `oxc-parser`，极致精简。

## License

MIT
