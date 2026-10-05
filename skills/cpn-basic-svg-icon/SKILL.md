---
name: cpn-basic-svg-icon
description: 帮助 AI 正确使用 UDesign SvgIcon 组件（组件，主要是组件内部使用的一些图标，目前直接不建议使用）。当需要使用 SvgIcon 时加载此技能。
---


# 使用 SvgIcon 组件

<!-- MANUAL_START: overview -->
## 技能概述

这是 SvgIcon 组件，主要是组件内部使用的一些图标，目前直接不建议使用
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { SvgIcon } from '@ucloud-fe/react-components';
```

> ⚠️ **全局规范 - 所有组件通用**:
> - 生成纯 JavaScript (JSX) 代码，**不要使用 TypeScript 类型注解**
> - **禁止**使用 `@alicloud/*`、`@aliyun/*`、`antd` 等外部组件库
> - 优先使用 UDesign 组件，不要用 HTML 原生标签替代
<!-- AUTO_END: import -->

<!-- AUTO_START: basic-usage -->
### 基本用法

```jsx
const layout = {
    style: {
        marginRight: 10
    }
};
const { Type } = SvgIcon;
const Demo = () => <div>{Type.map(type => <SvgIcon key={type} type={type} {...layout} />)}</div>;
```
<!-- AUTO_END: basic-usage -->

<!-- AUTO_START: props-table -->
### API 参数

| 属性 | 类型 | 默认值 | 必填 | 说明 |
|------|------|--------|------|------|
| type | `unknown` | - | ✅ | 图标类型 |
| color | `unknown` | - | - | 图标颜色，值为 css color 支持属性值 |
| spin | `unknown` | - | - | 是否旋转 |
| size | `unknown` | `'12px'` | - | 图标的尺寸大小 |
<!-- AUTO_END: props-table -->



<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>演示</summary>

```jsx
const { Type } = SvgIcon;
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
            type: Type[0],
            color: '#333333',
            size: SvgIcon.defaultProps.size
        };
    }
    render() {
        const { type, spin, color, size } = this.state;
        return (
            <div>
                <Form className="demo-form">
                    <Form.Item label="type" {...itemLayout}>
                        <Radio.Group
                            options={Type.map(type => ({ value: type }))}
                            value={type}
                            onChange={type => this.setState({ type })}
                        />
                    </Form.Item>
                    <Form.Item label="spin" {...itemLayout}>
                        <Switch checked={spin} onChange={spin => this.setState({ spin })} />
                    </Form.Item>
                    <Form.Item label="size" {...itemLayout}>
                        <Input value={size} onChange={e => this.setState({ size: e.target.value })} />
                    </Form.Item>
                    <Form.Item label="color" {...itemLayout}>
                        <input type="color" value={color} onChange={e => this.setState({ color: e.target.value })} />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <SvgIcon {...this.state} />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>type - 图标类型</summary>

```jsx
const layout = {
    style: {
        marginRight: 10
    }
};
const { Type } = SvgIcon;
const Demo = () => <div>{Type.map(type => <SvgIcon key={type} type={type} {...layout} />)}</div>;
```

</details>

<details>
<summary>color - 颜色</summary>

```jsx
const layout = {
    style: {
        marginRight: 10
    }
};
const Demo = () => (
    <div>
        {['black', 'white', 'red', 'green', 'blue', 'purple', '#18E1c9'].map(color => (
            <SvgIcon key={color} color={color} type="cross" {...layout} />
        ))}
    </div>
);
```

</details>

<details>
<summary>spin - 是否旋转</summary>

```jsx
const layout = {
    style: {
        marginRight: 10
    }
};
const { Type } = SvgIcon;
const Demo = () => <div>{Type.map(type => <SvgIcon key={type} type={type} spin {...layout} />)}</div>;
```

</details>

<details>
<summary>size - 尺寸</summary>

```jsx
const layout = {
    style: {
        marginRight: 10
    }
};
const Demo = () => (
    <div>
        {['12px', '16px', '30px', '2em', '3rem'].map(size => (
            <SvgIcon key={size} size={size} type="cross" {...layout} />
        ))}
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
