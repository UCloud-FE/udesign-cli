---
name: cpn-basic-collapse
description: 帮助 AI 正确使用 UDesign Collapse 组件（对内容进行分组并控制显示隐藏）。当需要使用 Collapse 时加载此技能。
---

# 使用 Collapse 组件

<!-- MANUAL_START: overview -->
## 技能概述

对内容进行分组并控制显示隐藏
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { Collapse } from '@ucloud-fe/react-components';
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
                <Collapse
                    onChange={(v, ...rest) => {
                        console.log(v, ...rest);
                    }}
                    className="demo-wrap"
                    defaultOpenKeys={[1, 2]}
                >
                    <Collapse.Panel title="panel 1" panelKey={1}>
                        content 1
                    </Collapse.Panel>
                    <Collapse.Panel title="panel 2" panelKey={2}>
                        content 2
                    </Collapse.Panel>
                    <Collapse.Panel title="panel 3" panelKey={3}>
                        content 3
                    </Collapse.Panel>
                </Collapse>
                <Collapse
                    onChange={(v, ...rest) => {
                        console.log(v, ...rest);
                    }}
                    multiple={false}
                    className="demo-wrap"
                    defaultOpenKeys={[2]}
                >
                    <Collapse.Panel title="panel 1" panelKey={1}>
                        content 1
                    </Collapse.Panel>
                    <Collapse.Panel title="panel 2" panelKey={2}>
                        content 2
                    </Collapse.Panel>
                    <Collapse.Panel title="panel 3" panelKey={3}>
                        content 3
                    </Collapse.Panel>
                </Collapse>
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
| openKeys | `Key[]` | - | - | 激活的面板，multiple 时为数组值，controlled |
| defaultOpenKeys | `Key[]` | - | - | 默认激活的面板，multiple 时为数组值，uncontrolled |
| onChange | `(keys: Key[]) => void` | - | - | 变化回调 |
| multiple | `boolean` | `true` | - | 是否可以多个同时打开 |
<!-- AUTO_END: props-table -->



<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>演示</summary>

```jsx
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            multiple: true,
            openKeys: [0],
            panelCount: 5
        };
    }
    render() {
        const { openKeys, multiple, panelCount } = this.state;
        const itemLayout = {
            labelCol: {
                span: 3
            },
            controllerCol: {
                span: 9
            }
        };
        const panels = [];
        panels.length = panelCount;
        panels.fill();
        return (
            <div>
                <Form className="demo-form">
                    <Form.Item label="multiple" {...itemLayout}>
                        <Switch checked={multiple} onChange={v => this.setState({ multiple: v, openKeys: [] })} />
                    </Form.Item>
                    <Form.Item label="openKeys" {...itemLayout}>
                        {multiple ? (
                            <Checkbox.Group
                                value={openKeys}
                                options={panels.map((v, i) => ({ value: i }))}
                                onChange={openKeys => this.setState({ openKeys })}
                            />
                        ) : (
                            <Radio.Group
                                value={openKeys[0]}
                                options={panels.map((v, i) => ({ value: i }))}
                                onChange={openKey => this.setState({ openKeys: [openKey] })}
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="panelCount" {...itemLayout}>
                        <NumberInput
                            value={panelCount}
                            min={1}
                            onNumberChange={panelCount =>
                                this.setState({
                                    panelCount
                                })
                            }
                        />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Collapse
                        openKeys={openKeys}
                        multiple={multiple}
                        onChange={(v, ...rest) => {
                            this.setState({
                                openKeys: v
                            });
                            console.log(v, ...rest);
                        }}
                    >
                        {panels.map((v, i) => (
                            <Collapse.Panel key={i} title={`panel ${i}`} panelKey={i}>
                                content {i}
                            </Collapse.Panel>
                        ))}
                    </Collapse>
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>multiple - 同时展开多个</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <Collapse
                    onChange={(v, ...rest) => {
                        console.log(v, ...rest);
                    }}
                    className="demo-wrap"
                    defaultOpenKeys={[1, 2]}
                >
                    <Collapse.Panel title="panel 1" panelKey={1}>
                        content 1
                    </Collapse.Panel>
                    <Collapse.Panel title="panel 2" panelKey={2}>
                        content 2
                    </Collapse.Panel>
                    <Collapse.Panel title="panel 3" panelKey={3}>
                        content 3
                    </Collapse.Panel>
                </Collapse>
                <Collapse
                    onChange={(v, ...rest) => {
                        console.log(v, ...rest);
                    }}
                    multiple={false}
                    className="demo-wrap"
                    defaultOpenKeys={[2]}
                >
                    <Collapse.Panel title="panel 1" panelKey={1}>
                        content 1
                    </Collapse.Panel>
                    <Collapse.Panel title="panel 2" panelKey={2}>
                        content 2
                    </Collapse.Panel>
                    <Collapse.Panel title="panel 3" panelKey={3}>
                        content 3
                    </Collapse.Panel>
                </Collapse>
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
                    <Collapse
                        onChange={(v, ...rest) => {
                            console.log(v, ...rest);
                        }}
                        defaultOpenKeys={[2, 3]}
                    >
                        <Collapse.Panel title="panel 1" panelKey={1}>
                            content 1
                        </Collapse.Panel>
                        <Collapse.Panel title="panel 2" panelKey={2}>
                            content 2
                        </Collapse.Panel>
                        <Collapse.Panel title="panel 3" panelKey={3}>
                            content 3
                        </Collapse.Panel>
                    </Collapse>
                </div>
                <div className="demo-wrap">
                    <Collapse
                        onChange={(v, ...rest) => {
                            console.log(v, ...rest);
                        }}
                        openKeys={[2, 3]}
                    >
                        <Collapse.Panel title="panel 1" panelKey={1}>
                            content 1
                        </Collapse.Panel>
                        <Collapse.Panel title="panel 2" panelKey={2}>
                            content 2
                        </Collapse.Panel>
                        <Collapse.Panel title="panel 3" panelKey={3}>
                            content 3
                        </Collapse.Panel>
                    </Collapse>
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
