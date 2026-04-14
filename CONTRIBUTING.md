# 开发协作指南

## 环境要求

- Node.js >= 20
- npm >= 10

## 本地开发

```bash
git clone git@github.com:UCloud-FE/udesign-cli.git
cd udesign-cli
npm install
```

### 常用命令

```bash
npm run dev          # 开发模式（tsup watch）
npm run build        # 构建
npm run lint         # 类型检查（tsc --noEmit）
npm run test         # 运行测试
```

### 提取元数据（需要本地 clone 上游仓库）

```bash
git clone https://github.com/UCloud-FE/react-components.git /tmp/react-components
git clone https://github.com/UCloud-FE/design-tokens.git /tmp/design-tokens

npm run build
node dist/index.js extract \
  --source /tmp/react-components \
  --tokens /tmp/design-tokens \
  --output data/metadata.json
```

### 生成组件 Skill

```bash
node dist/index.js gen-skill --all -d data/metadata.json -o skills/
```

## 分支规范

- `main` — 主分支，保持可发布状态
- 功能开发从 `main` 切分支，完成后提 PR
- PR 合并前需通过 CI 检查（类型检查 + 构建 + 测试）

## 发版流程

### 1. 确认 main 分支是最新的

```bash
git checkout main
git pull
```

### 2. 选择版本号

遵循 [Semantic Versioning](https://semver.org/)：

```bash
npm version patch   # Bug 修复:       0.1.2 → 0.1.3
npm version minor   # 新功能（向后兼容）: 0.1.3 → 0.2.0
npm version major   # 破坏性变更:       0.2.0 → 1.0.0
```

这条命令会自动：
- 修改 `package.json` 中的 version
- 创建 git commit（消息: `v0.1.3`）
- 创建 git tag（`v0.1.3`）

### 3. 推送触发 CI 发布

```bash
git push --follow-tags
```

推送后 GitHub Actions 会自动：
- 运行类型检查和构建
- 发布到 npm（`@ucloud-fe/udesign-cli@0.1.3`）
- 创建 GitHub Release（自动生成 Release Notes）

### 4. 验证

- npm: https://www.npmjs.com/package/@ucloud-fe/udesign-cli
- GitHub Release: https://github.com/UCloud-FE/udesign-cli/releases

## CI/CD

### GitHub Actions Workflows

| Workflow | 触发条件 | 作用 |
|---|---|---|
| **CI** (`ci.yml`) | Push / PR to main | 类型检查 + 构建 + 测试 |
| **Release** (`release.yml`) | Push tag `v*` | npm publish + GitHub Release |
| **Sync** (`sync.yml`) | 每周一 / 手动触发 | 从上游仓库同步 metadata + skills，自动创建 PR |

### Secrets 配置

在 https://github.com/UCloud-FE/udesign-cli/settings/secrets/actions 中需要配置：

| Secret | 用途 |
|---|---|
| `NPM_TOKEN` | npm 发布用的 Granular Access Token |

### 手动触发上游同步

在 GitHub Actions 页面 → Sync Upstream → Run workflow → 点击运行。

同步会自动 clone `react-components` 和 `design-tokens` 最新代码，重新提取元数据和生成 Skill 文件，有变更时自动创建 PR。

## Skill 文件编辑规范

Skill 文件采用 AUTO/MANUAL 分层标记：

```markdown
<!-- AUTO_START: props-table -->
（机器生成，运行 gen-skill 时自动覆盖）
<!-- AUTO_END: props-table -->

<!-- MANUAL_START: best-practices -->
（人工编写，运行 gen-skill 时完整保留）
<!-- MANUAL_END: best-practices -->
```

- **AUTO 区域**：不要手动编辑，下次 gen-skill 会覆盖
- **MANUAL 区域**：可以自由编辑，gen-skill 不会触碰
- 新增人工内容请写在 MANUAL 区域内
