---
name: cpn-basic-checkbox
description: 帮助 AI 正确使用 UDesign Checkbox 组件（勾选框组件）。当需要使用 Checkbox 时加载此技能。
---

# 使用 Checkbox 组件

<!-- MANUAL_START: overview -->
## 技能概述

这是 checkbox 勾选框组件
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { Checkbox } from '@ucloud-fe/react-components';
```

> ⚠️ **全局规范 - 所有组件通用**:
> - 生成纯 JavaScript (JSX) 代码，**不要使用 TypeScript 类型注解**
> - **禁止**使用 `@alicloud/*`、`@aliyun/*`、`antd` 等外部组件库
> - 优先使用 UDesign 组件，不要用 HTML 原生标签替代
<!-- AUTO_END: import -->

<!-- AUTO_START: basic-usage -->
### 基本用法

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Checkbox>unchecked</Checkbox>
                </div>
                <div className="demo-wrap">
                    <Checkbox checked>checked</Checkbox>
                </div>
            </div>
        );
    }
}
```
<!-- AUTO_END: basic-usage -->

<!-- AUTO_START: props-table -->
### API 参数

| 属性 | 类型 | 默认值 | 必填 | 说明 |
|------|------|--------|------|------|
| checked | `boolean` | - | - | 是否选中 |
| defaultChecked | `boolean` | `false` | - | 默认是否选中 |
| disabled | `boolean` | - | - | 是否禁用 |
| onChange | `(value: boolean) => void` | - | - | 点选时的回调 |
| indeterminate | `boolean` | - | - | 一般用于全选，部分选中的状态 |
| value | `string | number` | `''` | - | checkbox的值 |
| size | `"sm" | "md" | "lg"` | - | - | 尺寸，styleType 为 card 时无效 |
| styleType | `any` | - | - | 样式风格 |
| title | `any` | - | - | 标题，styleType 为 card 时使用 |
<!-- AUTO_END: props-table -->



<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>演示</summary>

```jsx
const { Size, StyleType } = Checkbox;
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: true,
            size: 'md',
            styleType: 'default',
            disabled: false
        };
    }
    render() {
        const { checked, size, styleType, disabled, indeterminate } = this.state;
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
                            options={Size.map(size => ({ value: size }))}
                            value={size}
                            onChange={size => this.setState({ size })}
                        />
                    </Form.Item>
                    <Form.Item label="styleType" {...itemLayout}>
                        <Radio.Group
                            options={StyleType.map(styleType => ({ value: styleType }))}
                            value={styleType}
                            onChange={styleType => this.setState({ styleType })}
                        />
                    </Form.Item>
                    <Form.Item label="disabled" {...itemLayout}>
                        <Switch checked={disabled} onChange={disabled => this.setState({ disabled })} />
                    </Form.Item>
                    <Form.Item label="checked" {...itemLayout}>
                        <Switch checked={checked} onChange={checked => this.setState({ checked })} />
                    </Form.Item>
                    <Form.Item label="indeterminate" {...itemLayout}>
                        <Switch
                            indeterminate={indeterminate}
                            onChange={indeterminate => this.setState({ indeterminate })}
                        />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Checkbox
                        checked={checked}
                        indeterminate={indeterminate}
                        size={size}
                        styleType={styleType}
                        disabled={disabled}
                        title="title"
                        disabledLabel="售磬"
                        onChange={checked => {
                            console.log(checked);
                            this.setState({ checked });
                        }}
                    >
                        checkbox
                    </Checkbox>
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>checked - 是否勾选</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Checkbox>unchecked</Checkbox>
                </div>
                <div className="demo-wrap">
                    <Checkbox checked>checked</Checkbox>
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>disabled - 禁用</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Checkbox>common</Checkbox>
                </div>
                <div className="demo-wrap">
                    <Checkbox disabled>disabled</Checkbox>
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>size - 尺寸</summary>

```jsx
const { Size } = Checkbox;
class Demo extends React.Component {
    render() {
        return (
            <div>
                {Size.map(size => (
                    <div className="demo-wrap" key={size}>
                        <Checkbox size={size}>checkbox</Checkbox>
                    </div>
                ))}
            </div>
        );
    }
}
```

</details>

<details>
<summary>styleType - 样式风格</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Combine>
                        <Checkbox checked={false}>checkbox</Checkbox>
                        <Checkbox checked>checkbox</Checkbox>
                        <Checkbox disabled>checkbox</Checkbox>
                        <Checkbox checked disabled>
                            checkbox
                        </Checkbox>
                    </Combine>
                </div>
                <div className="demo-wrap">
                    <Combine>
                        <Checkbox styleType="card" checked={false}>
                            checkbox
                        </Checkbox>
                        <Checkbox styleType="card" checked>
                            checkbox
                        </Checkbox>
                        <Checkbox styleType="card" disabled>
                            checkbox
                        </Checkbox>
                        <Checkbox styleType="card" checked disabled>
                            checkbox
                        </Checkbox>
                    </Combine>
                </div>
                <div className="demo-wrap">
                    <Combine>
                        <Checkbox styleType="card" title="title" checked={false}>
                            checkbox
                        </Checkbox>
                        <Checkbox styleType="card" title="title" checked>
                            checkbox
                        </Checkbox>
                        <Checkbox styleType="card" title="title" disabled>
                            checkbox
                        </Checkbox>
                        <Checkbox styleType="card" title="title" checked disabled>
                            checkbox
                        </Checkbox>
                    </Combine>
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>uncontrolled</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Checkbox onChange={console.log} checked>
                        controlled
                    </Checkbox>
                </div>
                <div className="demo-wrap">
                    <Checkbox onChange={console.log} defaultChecked>
                        uncontrolled
                    </Checkbox>
                </div>
            </div>
        );
    }
}
```

</details>

<!-- AUTO_END: demos -->

<!-- MANUAL_START: best-practices -->
## 最佳实践

1. **Group 中使用 value/defaultValue**：不要在 Group 内的 Checkbox 上使用 checked
2. **全选使用 indeterminate**：全选控制时使用 `indeterminate` 展示部分选中状态
3. **数据量大时使用 options**：比逐个写 Checkbox 更简洁

### 常见场景

#### 表单多选

```jsx
<Form.Item label="兴趣">
  <Checkbox.Group value={interests} onChange={setInterests}>
    <Checkbox value="reading">阅读</Checkbox>
    <Checkbox value="sports">运动</Checkbox>
    <Checkbox value="music">音乐</Checkbox>
  </Checkbox.Group>
</Form.Item>
```
<!-- MANUAL_END: best-practices -->

<!-- MANUAL_START: faq -->
## 常见问题

### Q: Group 中 Checkbox 的 checked 不生效？

A: 在 Group 中应使用 `value`/`defaultValue` 控制选中，不要在子 Checkbox 上使用 `checked`。
<!-- MANUAL_END: faq -->

<!-- MANUAL_START: critical -->
## 注意事项

_（待补充）_
<!-- MANUAL_END: critical -->
