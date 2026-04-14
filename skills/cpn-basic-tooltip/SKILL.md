---
name: cpn-basic-tooltip
description: 帮助 AI 正确使用 UDesign Tooltip 组件（基于 Popover，增加了箭头样式，支持所有 Popover 的 props，其它 props 的定义和注意事项参考 Popover 文档）。当需要使用 Tooltip 时加载此技能。
---

# 使用 Tooltip 组件

<!-- MANUAL_START: overview -->
## 技能概述

Tooltip 基于 Popover，增加了箭头样式，支持所有 Popover 的 props，其它 props 的定义和注意事项参考 Popover 文档
主要用于包裹一些展示性的提示
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { Tooltip } from '@ucloud-fe/react-components';
```

> ⚠️ **全局规范 - 所有组件通用**:
> - 生成纯 JavaScript (JSX) 代码，**不要使用 TypeScript 类型注解**
> - **禁止**使用 `@alicloud/*`、`@aliyun/*`、`antd` 等外部组件库
> - 优先使用 UDesign 组件，不要用 HTML 原生标签替代
<!-- AUTO_END: import -->

<!-- AUTO_START: basic-usage -->
### 基本用法

```jsx
const { Theme } = Tooltip;

const Demo = () => (
    <div>
        {Theme.map(theme => (
            <div className="demo-wrap" key={theme}>
                <Tooltip theme={theme} popup="tooltip message" visible>
                    <Button>Hover</Button>
                </Tooltip>
            </div>
        ))}
    </div>
);
```
<!-- AUTO_END: basic-usage -->

<!-- AUTO_START: props-table -->
### API 参数

| 属性 | 类型 | 默认值 | 必填 | 说明 |
|------|------|--------|------|------|
| arrow | `boolean` | `true` | - | 是否显示箭头 |
| theme | `"light" | "dark"` | `'light'` | - | 主题风格 |
| customStyle | `{ popupWrapperPadding?: string; }` | `{}` | - | 自定义样式 |
| popup | `any` | - | - | 弹出层内容 |
<!-- AUTO_END: props-table -->



<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>演示</summary>

```jsx
const { Placement, Theme } = Tooltip;
const Popup = () => <div>This is a popup, dadada</div>;
const Content = props => <Button {...props} />;
Content.propTypes = {
    children: PropTypes.node
};

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            placement: 'top',
            theme: 'light',
            arrow: true
        };
    }
    render() {
        const { placement, theme, arrow } = this.state;
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
                    <Form.Item label="placement" {...itemLayout}>
                        <Radio.Group
                            value={placement}
                            onChange={placement => this.setState({ placement })}
                            options={Placement.map(placement => ({
                                value: placement
                            }))}
                        />
                    </Form.Item>
                    <Form.Item label="theme" {...itemLayout}>
                        <Radio.Group
                            value={theme}
                            onChange={theme => this.setState({ theme })}
                            options={Theme.map(theme => ({
                                value: theme
                            }))}
                        />
                    </Form.Item>
                    <Form.Item label="arrow" {...itemLayout}>
                        <Switch onChange={arrow => this.setState({ arrow })} checked={arrow} />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Tooltip
                        placement={placement}
                        popup={<Popup />}
                        theme={theme}
                        arrow={arrow}
                        getPopupContainer={() => document.body}
                    >
                        <Content>content</Content>
                    </Tooltip>
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>theme - 主题</summary>

```jsx
const { Theme } = Tooltip;

const Demo = () => (
    <div>
        {Theme.map(theme => (
            <div className="demo-wrap" key={theme}>
                <Tooltip theme={theme} popup="tooltip message" visible>
                    <Button>Hover</Button>
                </Tooltip>
            </div>
        ))}
    </div>
);
```

</details>

<details>
<summary>arrow - 箭头</summary>

```jsx
const Demo = () => (
    <div>
        <div className="demo-wrap">
            <Tooltip popup="tooltip message" visible>
                <Button>Hover</Button>
            </Tooltip>
        </div>
        <div className="demo-wrap">
            <Tooltip popup="tooltip message" arrow={false} visible>
                <Button>Hover</Button>
            </Tooltip>
        </div>
    </div>
);
```

</details>

<details>
<summary>placement - 位置</summary>

```jsx
const { Placement } = Tooltip;

const Demo = () => (
    <div>
        {Placement.map(placement => (
            <div key={placement} style={{ margin: '40px 80px', display: 'inline-block', position: 'relative' }}>
                <Tooltip placement={placement} popup={placement} visible>
                    <Button icon="ai">Button</Button>
                </Tooltip>
            </div>
        ))}
    </div>
);
```

</details>

<details>
<summary>style - 修改提示文案宽度</summary>

```jsx
const Demo = () => (
    <div>
        <div className="demo-wrap">
            <Tooltip popup="tooltip message! tooltip message! tooltip message! tooltip message! tooltip message! tooltip message!">
                <Button>Hover</Button>
            </Tooltip>
        </div>
        <div className="demo-wrap">
            <Tooltip
                popup={
                    <p style={{ maxWidth: '100px', wordBreak: 'break-all', margin: 0 }}>
                        tooltip message! tooltip message! tooltip message! tooltip message! tooltip message! tooltip
                        message!
                    </p>
                }
            >
                <Button>Hover</Button>
            </Tooltip>
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
