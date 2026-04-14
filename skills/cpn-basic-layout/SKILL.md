---
name: cpn-basic-layout
description: 帮助 AI 正确使用 UDesign Layout 组件（布局组件）。当需要使用 Layout 时加载此技能。
---

# 使用 Layout 组件

<!-- MANUAL_START: overview -->
## 技能概述

这是 Layout 布局组件
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { Layout } from '@ucloud-fe/react-components';
```

> ⚠️ **全局规范 - 所有组件通用**:
> - 生成纯 JavaScript (JSX) 代码，**不要使用 TypeScript 类型注解**
> - **禁止**使用 `@alicloud/*`、`@aliyun/*`、`antd` 等外部组件库
> - 优先使用 UDesign 组件，不要用 HTML 原生标签替代
<!-- AUTO_END: import -->

<!-- AUTO_START: basic-usage -->
### 基本用法

```jsx
const headerStyle = {
    textAlign: 'center',
    color: '#000',
    height: 64,
    lineHeight: '64px',
    backgroundColor: '#EAEEFD'
};

const contentStyle = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#95bff7'
};

const footerStyle = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#7dbcea'
};

const Demo = () => (
    <Layout>
        <Layout.Header style={headerStyle}>Header</Layout.Header>
        <Layout.Header style={headerStyle}>Sub Header</Layout.Header>
        <Layout.Content style={contentStyle}>Content</Layout.Content>
        <Layout.Footer style={footerStyle}>Footer</Layout.Footer>
    </Layout>
);
```
<!-- AUTO_END: basic-usage -->

<!-- AUTO_START: props-table -->
### API 参数

| 属性 | 类型 | 默认值 | 必填 | 说明 |
|------|------|--------|------|------|
| hasSider | `boolean` | - | - | 是否有侧边导航 |
<!-- AUTO_END: props-table -->



<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>顶部通栏+侧边导航</summary>

```jsx
const headerStyle = {
    textAlign: 'center',
    color: '#000',
    height: 64,
    lineHeight: '64px',
    backgroundColor: '#EAEEFD'
};

const contentStyle = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#95bff7'
};

const siderStyle = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#c1d4fa'
};

const footerStyle = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#7dbcea'
};

const Demo = () => (
    <Layout>
        <Layout.Header style={headerStyle}>Header</Layout.Header>
        <Layout>
            <Layout.Sider style={siderStyle}>Sider</Layout.Sider>
            <Layout>
                <Layout.Header style={headerStyle}>Sub Header</Layout.Header>
                <Layout.Content style={contentStyle}>Content</Layout.Content>
                <Layout.Footer style={footerStyle}>Footer</Layout.Footer>
            </Layout>
        </Layout>
    </Layout>
);
```

</details>

<details>
<summary>顶部通栏</summary>

```jsx
const headerStyle = {
    textAlign: 'center',
    color: '#000',
    height: 64,
    lineHeight: '64px',
    backgroundColor: '#EAEEFD'
};

const contentStyle = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#95bff7'
};

const footerStyle = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#7dbcea'
};

const Demo = () => (
    <Layout>
        <Layout.Header style={headerStyle}>Header</Layout.Header>
        <Layout.Header style={headerStyle}>Sub Header</Layout.Header>
        <Layout.Content style={contentStyle}>Content</Layout.Content>
        <Layout.Footer style={footerStyle}>Footer</Layout.Footer>
    </Layout>
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
