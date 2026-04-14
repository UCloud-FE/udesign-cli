---
name: cpn-basic-spin
description: 帮助 AI 正确使用 UDesign Spin 组件（只是一个 div 包裹容器，div 本身有自转的样式）。当需要使用 Spin 时加载此技能。
---

# 使用 Spin 组件

<!-- MANUAL_START: overview -->
## 技能概述

只是一个 div 包裹容器，div 本身有自转的样式。
传入其它原生的 props 会自动附加到最外层的 div 上，如 style、className 等
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { Spin } from '@ucloud-fe/react-components';
```

> ⚠️ **全局规范 - 所有组件通用**:
> - 生成纯 JavaScript (JSX) 代码，**不要使用 TypeScript 类型注解**
> - **禁止**使用 `@alicloud/*`、`@aliyun/*`、`antd` 等外部组件库
> - 优先使用 UDesign 组件，不要用 HTML 原生标签替代
<!-- AUTO_END: import -->

<!-- AUTO_START: basic-usage -->
### 基本用法

```jsx
const Demo = () => (
    <Spin style={{ display: 'inline-block' }}>
        <p>这是一行会旋转的文字</p>
    </Spin>
);
```
<!-- AUTO_END: basic-usage -->

<!-- AUTO_START: props-table -->
<!-- AUTO_END: props-table -->



<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>演示</summary>

```jsx
const Demo = () => (
    <Spin style={{ display: 'inline-block' }}>
        <p>这是一行会旋转的文字</p>
    </Spin>
);
```

</details>

<!-- AUTO_END: demos -->

<!-- MANUAL_START: best-practices -->
## 最佳实践

_（待补充）_
<!-- MANUAL_END: best-practices -->

<!-- MANUAL_START: faq -->
## 常见问题

_（待补充）_
<!-- MANUAL_END: faq -->

<!-- MANUAL_START: critical -->
## 注意事项

_（待补充）_
<!-- MANUAL_END: critical -->
