---
name: cpn-basic-compact
description: 帮助 AI 正确使用 UDesign Compact 组件（用于控件间的连接式布局）。当需要使用 Compact 时加载此技能。
---


# 使用 Compact 组件

<!-- MANUAL_START: overview -->
## 技能概述

用于控件间的连接式布局
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { Compact } from '@ucloud-fe/react-components';
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
    <div>
        <div className="demo-wrap">
            <Compact sharedProps={{ size: 'sm' }}>
                <Select options={[1, 2, 3].map(i => ({ value: i }))} />
                <Input />
            </Compact>
        </div>
        <div className="demo-wrap">
            <Compact sharedProps={{ className: 'test_cls' }}>
                <Select options={[1, 2, 3].map(i => ({ value: i }))} />
                <Input />
            </Compact>
        </div>
    </div>
);
```
<!-- AUTO_END: basic-usage -->

<!-- AUTO_START: props-table -->
### API 参数

| 属性 | 类型 | 默认值 | 必填 | 说明 |
|------|------|--------|------|------|
| children | `unknown` | - | - |  |
| className | `unknown` | - | - |  |
| sharedProps | `unknown` | `{}` | - | 组件共享的props，如size、className、style等 |
<!-- AUTO_END: props-table -->



<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>演示</summary>

```jsx
const Sizes = ['sm', 'md', 'lg'];
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 'md'
        };
    }
    render() {
        const { size, disabled } = this.state;
        const itemLayout = {
            labelCol: {
                span: 3
            },
            controllerCol: {
                span: 9
            }
        };
        return (
            <div>
                <Form className="demo-form">
                    <Form.Item label="size" {...itemLayout}>
                        <Radio.Group
                            value={size}
                            onChange={size => this.setState({ size })}
                            options={Sizes.map(size => ({
                                value: size
                            }))}
                        />
                    </Form.Item>
                    <Form.Item label="disabled" {...itemLayout}>
                        <Switch checked={disabled} onChange={disabled => this.setState({ disabled })} />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Compact sharedProps={{ size, disabled }}>
                        <Select options={[1, 2, 3].map(i => ({ value: i }))} />
                        <Input />
                    </Compact>
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>sharedProps - 属性共享</summary>

```jsx
const Demo = () => (
    <div>
        <div className="demo-wrap">
            <Compact sharedProps={{ size: 'sm' }}>
                <Select options={[1, 2, 3].map(i => ({ value: i }))} />
                <Input />
            </Compact>
        </div>
        <div className="demo-wrap">
            <Compact sharedProps={{ className: 'test_cls' }}>
                <Select options={[1, 2, 3].map(i => ({ value: i }))} />
                <Input />
            </Compact>
        </div>
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
