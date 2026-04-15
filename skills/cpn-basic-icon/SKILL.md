---
name: cpn-basic-icon
description: 帮助 AI 正确使用 UDesign Icon 组件（传入其它原生的 props 会自动附加到最外层上，如 style、className 等）。当需要使用 Icon 时加载此技能。
---

# 使用 Icon 组件

<!-- MANUAL_START: overview -->
## 技能概述

传入其它原生的 props 会自动附加到最外层上，如 style、className 等
配合 prefix，可使用其它字体图标库
需要修改默认 prefix 的可使用 ConfigProvider
组件库中存在一份字体，需要使用可自行导入字体样式并使用
所有支持图标地址点这里[UCloud Icon Font](https://console-font.pre.ucloudadmin.com/)
``js static
// 按需导入字体icon样式
import '@ucloud-fe/react-components/dist/icon.min.css';
``
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { Icon } from '@ucloud-fe/react-components';
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
const Demo = () => (
    <div>
        <Icon type="link" {...layout} />
        <Icon type="link" {...layout} style={{ color: 'red', fontSize: '20px' }} className="test_cls" />
    </div>
);
```
<!-- AUTO_END: basic-usage -->

<!-- AUTO_START: props-table -->
### API 参数

| 属性 | 类型 | 默认值 | 必填 | 说明 |
|------|------|--------|------|------|
| type | `string` | - | ✅ | 图标类型 |
| spin | `boolean` | - | - | 是否旋转 |
| prefix | `string` | - | - | 自定义 icon 类名前缀，使用自定义图标库时使用，默认为 icon\_\_ |
<!-- AUTO_END: props-table -->



<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>演示</summary>

```jsx
const Type = ['circle-fill', 'circle', 'loading'];
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: Type[0],
            spin: false,
            fontSize: 12,
            color: '#000'
        };
    }
    render() {
        const { type, spin, fontSize, color } = this.state;
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
                    <Form.Item label="fontSize" {...itemLayout}>
                        <NumberInput
                            value={fontSize}
                            min={12}
                            max={100}
                            onNumberChange={fontSize => this.setState({ fontSize })}
                        />
                    </Form.Item>
                    <Form.Item label="color" {...itemLayout}>
                        <input type="color" value={color} onChange={e => this.setState({ color: e.target.value })} />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Icon {...{ type, spin }} style={{ fontSize: fontSize, color }} />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>type - icon 类型</summary>

```jsx
const layout = {
    style: {
        marginRight: 10
    }
};
const Demo = () => (
    <div>
        <Icon type="link" {...layout} />
        <Icon type="check" {...layout} />
        <Icon type="circle-check" {...layout} />
        <Icon type="arrow-left" {...layout} />
        <Icon type="checkbox" {...layout} />
        <Icon type="loading" {...layout} />
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
const Demo = () => (
    <div>
        <Icon type="link" spin {...layout} />
        <Icon type="check" spin {...layout} />
        <Icon type="circle-check" spin {...layout} />
        <Icon type="arrow-left" spin {...layout} />
        <Icon type="checkbox" spin {...layout} />
        <Icon type="loading" spin {...layout} />
    </div>
);
```

</details>

<details>
<summary>customStyle - 自定义样式</summary>

```jsx
const layout = {
    style: {
        marginRight: 10
    }
};
const Demo = () => (
    <div>
        <Icon type="link" {...layout} />
        <Icon type="link" {...layout} style={{ color: 'red', fontSize: '20px' }} className="test_cls" />
    </div>
);
```

</details>

<!-- AUTO_END: demos -->

<!-- MANUAL_START: best-practices -->
## 最佳实践

1. **按需导入字体样式**：使用前确保导入了 `icon.min.css`
2. **使用 ConfigProvider 全局修改前缀**：如果使用自定义图标库
3. **加载态使用 spin**：`<Icon type="loading" spin />` 表示加载中
<!-- MANUAL_END: best-practices -->

<!-- MANUAL_START: faq -->
## 常见问题

### Q: 图标不显示？

A: 确保已正确导入字体样式文件 `@ucloud-fe/react-components/dist/icon.min.css`，且 `type` 值与图标库中的名称一致。

### Q: 如何使用自定义图标库？

A: 通过 `prefix` 属性或使用 `ConfigProvider` 全局修改图标类名前缀，配合自定义字体图标库使用。
<!-- MANUAL_END: faq -->

<!-- MANUAL_START: critical -->
## 注意事项

_（待补充）_
<!-- MANUAL_END: critical -->
