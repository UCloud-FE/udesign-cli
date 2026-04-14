---
name: cpn-basic-pop-confirm
description: 帮助 AI 正确使用 UDesign PopConfirm 组件（组件，用作一些按钮操作的二次确认）。当需要使用 PopConfirm 时加载此技能。
---

# 使用 PopConfirm 组件

<!-- MANUAL_START: overview -->
## 技能概述

这是 PopConfirm 组件，用作一些按钮操作的二次确认
PopConfirm 由 Tooltip 封装，支持所有 Tooltip 的 props
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { PopConfirm } from '@ucloud-fe/react-components';
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
    <PopConfirm popup="content" onConfirm={() => console.log('onConfirm')} onCancel={() => console.log('onCancel')}>
        <Button styleType="primary">button</Button>
    </PopConfirm>
);
```
<!-- AUTO_END: basic-usage -->

<!-- AUTO_START: props-table -->
### API 参数

| 属性 | 类型 | 默认值 | 必填 | 说明 |
|------|------|--------|------|------|
| onConfirm | `() => void` | - | - | 确认按钮回调 |
| onCancel | `() => void` | - | - | 取消按钮回调 |
<!-- AUTO_END: props-table -->



<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>普通使用</summary>

```jsx
const Demo = () => (
    <PopConfirm popup="content" onConfirm={() => console.log('onConfirm')} onCancel={() => console.log('onCancel')}>
        <Button styleType="primary">button</Button>
    </PopConfirm>
);
```

</details>

<details>
<summary>onConfirm - 确认按钮回调</summary>

```jsx
const Demo = () => (
    <PopConfirm popup="content" onConfirm={() => console.log('onConfirm')} onCancel={() => console.log('onCancel')}>
        <Button styleType="primary">button</Button>
    </PopConfirm>
);
```

</details>

<details>
<summary>onCancel - 取消按钮回调</summary>

```jsx
const Demo = () => (
    <PopConfirm popup="content" onConfirm={() => console.log('onConfirm')} onCancel={() => console.log('onCancel')}>
        <Button styleType="primary">button</Button>
    </PopConfirm>
);
```

</details>

<details>
<summary>演示</summary>

```jsx
const Demo = () => (
    <div>
        <Combine>
            <PopConfirm
                popup="一点文字一点文字"
                onConfirm={() => console.log('onConfirm')}
                onCancel={() => console.log('onCancel')}
            >
                <Button styleType="primary">一点文字</Button>
            </PopConfirm>
            <PopConfirm
                popup="一些文字一些文字一些文字一些文字一些文字"
                onConfirm={() => console.log('onConfirm')}
                onCancel={() => console.log('onCancel')}
            >
                <Button styleType="primary">一些文字</Button>
            </PopConfirm>
            <PopConfirm
                popup="比较多的文字比较多的文字比较多的文字比较多的文字比较多的文字比较多的文字比较多的文字比较多的文字"
                onConfirm={() => console.log('onConfirm')}
                onCancel={() => console.log('onCancel')}
            >
                <Button styleType="primary">比较多的文字</Button>
            </PopConfirm>
            <PopConfirm
                popup="很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字"
                onConfirm={() => console.log('onConfirm')}
                onCancel={() => console.log('onCancel')}
            >
                <Button styleType="primary">很多的文字</Button>
            </PopConfirm>
        </Combine>
    </div>
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
