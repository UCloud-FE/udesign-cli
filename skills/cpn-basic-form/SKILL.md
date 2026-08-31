---
name: cpn-basic-form
description: 帮助 AI 正确使用 UDesign Form 组件（表单 UI 组件，只负责布局和展示，不提供任何逻辑功能，表单校验、数据收集请看 ZForm 组件）。当需要使用 Form 时加载此技能。
---


# 使用 Form 组件

<!-- MANUAL_START: overview -->
## 技能概述

表单 UI 组件，只负责布局和展示，不提供任何逻辑功能，表单校验、数据收集请看 ZForm 组件。
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { Form } from '@ucloud-fe/react-components';
```

> ⚠️ **全局规范 - 所有组件通用**:
> - 生成纯 JavaScript (JSX) 代码，**不要使用 TypeScript 类型注解**
> - **禁止**使用 `@alicloud/*`、`@aliyun/*`、`antd` 等外部组件库
> - 优先使用 UDesign 组件，不要用 HTML 原生标签替代
<!-- AUTO_END: import -->

<!-- AUTO_START: basic-usage -->
### 基本用法

```jsx
const { Item } = Form;
const sharedItemProps = {
    labelCol: {
        span: 3
    },
    controllerCol: {
        span: 9
    }
};
const Demo = () => (
    <Form itemProps={sharedItemProps}>
        <Item label="upload">
            <Upload />
        </Item>
        <Item label="switch">
            <Switch />
        </Item>
        <Item label="slider">
            <Slider defaultValue={10} />
        </Item>
        <Item label="input">
            <Input />
        </Item>
    </Form>
);
```
<!-- AUTO_END: basic-usage -->

<!-- AUTO_START: props-table -->
### API 参数

| 属性 | 类型 | 默认值 | 必填 | 说明 |
|------|------|--------|------|------|
| onSubmit | `unknown` | - | - |  |
| size | `unknown` | `'md'` | - | 配合表单控件的size使用 |
| itemProps | `unknown` | - | - | 如果存在会在所有包裹的 item 上附加该 props |
<!-- AUTO_END: props-table -->


<!-- AUTO_START: tokens -->
### Design Tokens

| Token 名称 | 分类 | 默认值 | 暗色值 | 说明 |
|------------|------|--------|--------|------|
| `T_FORM_ITEM_SPACING_VERTICAL` | spacing | `16px` | `16px` | - |
<!-- AUTO_END: tokens -->

<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>普通使用</summary>

```jsx
const { Item } = Form;
const itemLayout = {
    labelCol: {
        span: 3
    },
    controllerCol: {
        span: 9
    }
};
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 'md',
            useGrid: true
        };
    }
    render() {
        const { size, useGrid } = this.state;
        return (
            <div>
                <Form className="demo-form" itemProps={{ ...itemLayout }}>
                    <Form.Item label="size">
                        <Radio.Group
                            value={size}
                            options={['md', 'lg'].map(value => ({ value }))}
                            onChange={size => this.setState({ size })}
                        />
                    </Form.Item>
                    <Form.Item label="useGrid">
                        <Switch checked={useGrid} onChange={useGrid => this.setState({ useGrid })} />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Form size={size} itemProps={{ ...(useGrid ? itemLayout : {}) }}>
                        <Item label="Input" help="Please input" required tip="Help content">
                            <Input size={size} />
                        </Item>
                        <Item label="Switch">
                            <Switch size={size} />
                        </Item>
                        <Item label="Select">
                            <Select size={size} options={[{ value: '123' }, { value: '1231' }, { value: '1232' }]} />
                        </Item>
                    </Form>
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>itemProps - 统一设置 item 的 props</summary>

```jsx
const { Item } = Form;
const sharedItemProps = {
    labelCol: {
        span: 3
    },
    controllerCol: {
        span: 9
    }
};
const Demo = () => (
    <Form itemProps={sharedItemProps}>
        <Item label="upload">
            <Upload />
        </Item>
        <Item label="switch">
            <Switch />
        </Item>
        <Item label="slider">
            <Slider defaultValue={10} />
        </Item>
        <Item label="input">
            <Input />
        </Item>
    </Form>
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
