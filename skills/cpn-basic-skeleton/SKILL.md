---
name: cpn-basic-skeleton
description: 帮助 AI 正确使用 UDesign Skeleton 组件（用作组件的简单占位符）。当需要使用 Skeleton 时加载此技能。
---


# 使用 Skeleton 组件

<!-- MANUAL_START: overview -->
## 技能概述

用作组件的简单占位符。
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { Skeleton } from '@ucloud-fe/react-components';
```

> ⚠️ **全局规范 - 所有组件通用**:
> - 生成纯 JavaScript (JSX) 代码，**不要使用 TypeScript 类型注解**
> - **禁止**使用 `@alicloud/*`、`@aliyun/*`、`antd` 等外部组件库
> - 优先使用 UDesign 组件，不要用 HTML 原生标签替代
<!-- AUTO_END: import -->

<!-- AUTO_START: basic-usage -->
### 基本用法

```jsx
const { DemoWrap } = demoUtil;
const Demo = () => (
    <>
        <h2>普通场景</h2>
        <DemoWrap>
            <Skeleton />
        </DemoWrap>

        <h2>带动画</h2>
        <DemoWrap>
            <Skeleton animated />
        </DemoWrap>

        <h2>多行</h2>
        <DemoWrap>
            <Skeleton rows={3} animated />
        </DemoWrap>

        <h2>组合</h2>
        <DemoWrap>
            <Card>
                <Card.Header>
                    <Skeleton animated width="60%" />
                </Card.Header>
                <Card.Content>
                    <Skeleton animated rows={3} />
                </Card.Content>
            </Card>
        </DemoWrap>
    </>
);
```
<!-- AUTO_END: basic-usage -->

<!-- AUTO_START: props-table -->
### API 参数

| 属性 | 类型 | 默认值 | 必填 | 说明 |
|------|------|--------|------|------|
| animated | `boolean` | - | - | 是否开启动画 |
| rows | `number` | `1` | - | 章节的行数 |
| width | `string | number` | - | - | 宽度 |
<!-- AUTO_END: props-table -->


<!-- AUTO_START: tokens -->
### Design Tokens

| Token 名称 | 分类 | 默认值 | 暗色值 | 说明 |
|------------|------|--------|--------|------|
| `T_SKELETON_COLOR_BG_DARK` | color | `#efeff8` | `#1F2538` | - |
| `T_SKELETON_COLOR_BG_DARK1` | color | `rgba(0,0,0,0.5)` | `rgba(0,0,0,0.5)` | - |
| `T_SKELETON_COLOR_BG_LIGHT` | color | `#f6f6fb` | `#161C2E` | - |
| `T_SKELETON_COLOR_BG_LIGHT1` | color | `rgba(0,0,0,0.3)` | `rgba(0,0,0,0.3)` | - |
<!-- AUTO_END: tokens -->

<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>演示</summary>

```jsx
const { formLayout, DemoWrap } = demoUtil;
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            animated: false,
            rows: 1
        };
    }
    render() {
        const { animated, rows } = this.state;

        return (
            <div>
                <Form className="demo-form" itemProps={{ ...formLayout }}>
                    <Form.Item label="animated">
                        <Switch checked={animated} onChange={animated => this.setState({ animated })} />
                    </Form.Item>
                    <Form.Item label="rows">
                        <NumberInput value={rows} onChange={rows => this.setState({ rows })} />
                    </Form.Item>
                </Form>
                <DemoWrap>
                    {/* use key to reset animated */}
                    <Skeleton key={rows} {...{ animated, rows }} />
                </DemoWrap>
            </div>
        );
    }
}
```

</details>

<details>
<summary>演示</summary>

```jsx
const { DemoWrap } = demoUtil;
const Demo = () => (
    <>
        <h2>普通场景</h2>
        <DemoWrap>
            <Skeleton />
        </DemoWrap>

        <h2>带动画</h2>
        <DemoWrap>
            <Skeleton animated />
        </DemoWrap>

        <h2>多行</h2>
        <DemoWrap>
            <Skeleton rows={3} animated />
        </DemoWrap>

        <h2>组合</h2>
        <DemoWrap>
            <Card>
                <Card.Header>
                    <Skeleton animated width="60%" />
                </Card.Header>
                <Card.Content>
                    <Skeleton animated rows={3} />
                </Card.Content>
            </Card>
        </DemoWrap>
    </>
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
