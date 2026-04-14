---
name: cpn-basic-action-list
description: 帮助 AI 正确使用 UDesign ActionList 组件（操作列表组件）。当需要使用 ActionList 时加载此技能。
---

# 使用 ActionList 组件

<!-- MANUAL_START: overview -->
## 技能概述

这是 ActionList 操作列表组件
外部的操作继承按钮的属性，支持配置按钮的 props，如 disabled、styleType 等，额外增加 tooltip 支持（使用时会默认开启按钮的 fakeDisabled），展开的操作支持 Menu.Item 的 props，disabled、tooltip 等
默认的弹出层容器为 forwardPopupContainer={triggerNode => triggerNode.parentNode}，默认会查找上层的建议容器
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { ActionList } from '@ucloud-fe/react-components';
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
                {[0, 4, 5].map(count => (
                    <div className="demo-wrap" key={count}>
                        <ActionList
                            exposeCount={count}
                            actionList={new Array(6).fill(null).map((v, i) => ({
                                label: `Action ${i}`,
                                onClick: e => console.log('action', i, e)
                            }))}
                        />
                    </div>
                ))}
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
| actionList | `ActionInfo[]` | `[]` | ✅ | 操作列表 |
| exposeCount | `number` | `3` | - | 暴露的操作数量 |
| autoAdjustment | `boolean` | - | - | 是否自动按照宽度调整展示数量 |
| size | `"sm" | "md" | "lg"` | `'md'` | - | 控件尺寸 |
| smart | `boolean` | `true` | - | 操作数量等于 exposeCount+1 时是否直接显示按钮而不是显示下拉菜单 |
| buttonStyleType | `"primary" | "border" | "border-gray"` | `'border'` | - | 按钮的默认样式类别，参考 Button 的 styleType |
| dropdownButton | `any` | - | - | 自定义更多按钮内容，也可通过传入 object 来定义 props |
| popoverProps | `any` | - | - | 弹出层的 popover props |
<!-- AUTO_END: props-table -->



<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>演示</summary>

```jsx
const { Sizes, ButtonStyleTypes } = ActionList;
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 'md',
            smart: true,
            buttonStyleType: 'border',
            exposeCount: 3,
            actionListLength: 5,
            autoAdjustment: false
        };
    }
    render() {
        const { size, buttonStyleType, smart, exposeCount, actionListLength, autoAdjustment } = this.state;
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
                    <Form.Item label={'size'} {...itemLayout}>
                        <Radio.Group
                            options={Sizes.map(size => ({ value: size }))}
                            value={size}
                            onChange={size => this.setState({ size })}
                        />
                    </Form.Item>
                    <Form.Item label={'button styleType'} {...itemLayout}>
                        <Radio.Group
                            options={ButtonStyleTypes.map(styleType => ({ value: styleType }))}
                            value={buttonStyleType}
                            onChange={buttonStyleType => this.setState({ buttonStyleType })}
                        />
                    </Form.Item>
                    <Form.Item label="smart" {...itemLayout}>
                        <Switch checked={smart} onChange={smart => this.setState({ smart })} />
                    </Form.Item>
                    <Form.Item label="autoAdjustment" {...itemLayout}>
                        <Switch
                            checked={autoAdjustment}
                            onChange={autoAdjustment => this.setState({ autoAdjustment })}
                        />
                    </Form.Item>
                    <Form.Item label="exposeCount" {...itemLayout}>
                        <NumberInput
                            value={exposeCount}
                            onNumberChange={exposeCount => this.setState({ exposeCount })}
                        />
                    </Form.Item>
                    <Form.Item label="actionListLength" {...itemLayout}>
                        <NumberInput
                            value={actionListLength}
                            onNumberChange={actionListLength => this.setState({ actionListLength })}
                        />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <ActionList
                        actionList={new Array(actionListLength).fill(null).map((v, i) => ({
                            label: `Action ${i}`,
                            onClick: e => console.log('action', i, e)
                        }))}
                        {...{
                            size,
                            smart,
                            exposeCount,
                            buttonStyleType,
                            autoAdjustment
                        }}
                    />
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
const { Sizes } = ActionList;
class Demo extends React.Component {
    render() {
        return (
            <div>
                {Sizes.map(size => (
                    <div className="demo-wrap" key={size}>
                        <ActionList
                            size={size}
                            actionList={new Array(6).fill(null).map((v, i) => ({
                                label: `Action ${i}`,
                                onClick: e => console.log('action', i, e)
                            }))}
                        />
                    </div>
                ))}
            </div>
        );
    }
}
```

</details>

<details>
<summary>exposeCount - 展示数量</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                {[0, 4, 5].map(count => (
                    <div className="demo-wrap" key={count}>
                        <ActionList
                            exposeCount={count}
                            actionList={new Array(6).fill(null).map((v, i) => ({
                                label: `Action ${i}`,
                                onClick: e => console.log('action', i, e)
                            }))}
                        />
                    </div>
                ))}
            </div>
        );
    }
}
```

</details>

<details>
<summary>smart - 菜单中只剩下一个操作时自动显示</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <ActionList
                        exposeCount={5}
                        actionList={new Array(6).fill(null).map((v, i) => ({
                            label: `Action ${i}`,
                            onClick: e => console.log('action', i, e)
                        }))}
                    />
                </div>
                <div className="demo-wrap">
                    <ActionList
                        smart={false}
                        exposeCount={5}
                        actionList={new Array(6).fill(null).map((v, i) => ({
                            label: `Action ${i}`,
                            onClick: e => console.log('action', i, e)
                        }))}
                    />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>actionChildren - 子菜单</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <ActionList
                        actionList={new Array(6)
                            .fill(null)
                            .map((v, i) => ({
                                label: `Action ${i}`,
                                onClick: e => console.log('action', i, e)
                            }))
                            .concat({
                                label: `Parent`,
                                children: new Array(6).fill(null).map((v, i) => ({
                                    label: `Child Action ${i}`,
                                    onClick: e => console.log('action', i, e)
                                }))
                            })}
                    />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>popoverProps - 弹出层 props</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <div ref={_ref => (this.container = _ref)} />
                    <ActionList
                        exposeCount={1}
                        actionList={new Array(6).fill(null).map((v, i) => ({
                            label: `Action ${i}`,
                            onClick: e => console.log('action', i, e)
                        }))}
                        popoverProps={{
                            getPopupContainer: () => this.container,
                            animation: 'slide-up'
                        }}
                    />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>dropdownButton - 自定义展开按钮</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <ActionList
                        actionList={new Array(6).fill(null).map((v, i) => ({
                            label: `Action ${i}`,
                            onClick: e => console.log('action', i, e)
                        }))}
                        dropdownButton="更多"
                    />
                </div>
                <div className="demo-wrap">
                    <ActionList
                        actionList={new Array(6).fill(null).map((v, i) => ({
                            label: `Action ${i}`,
                            onClick: e => console.log('action', i, e)
                        }))}
                        dropdownButton={{
                            styleType: 'primary',
                            children: '更多'
                        }}
                    />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>item.tooltip - 内容提示</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <ActionList
                        exposeCount={3}
                        actionList={[
                            {
                                label: 'Action 1',
                                styleType: 'primary'
                            },
                            {
                                label: 'Action 2',
                                disabled: true,
                                tooltip: '提示语，这个不能点了，balabalabalabala'
                            },
                            {
                                label: 'Action 3',
                                tooltip: '危险！谨慎操作'
                            },
                            {
                                label: 'Action 4',
                                disabled: true,
                                tooltip: '提示语，这个不能点了，balabalabalabala'
                            },
                            {
                                label: 'Action 5',
                                tooltip: '危险！谨慎操作'
                            },
                            {
                                label: 'Action 6',
                                tooltip: <span>node 类提示</span>
                            },
                            {
                                label: 'Action 7',
                                tooltip: {
                                    popup: '自定义提示',
                                    theme: 'dark'
                                }
                            }
                        ].map(i => ({ ...i, onClick: () => i.label }))}
                    />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>autoAdjustment</summary>

```jsx
const Demo = () => {
    const [width, setWidth] = React.useState(300);
    const onResize = (e, { size }) => {
        setWidth(size.width);
    };
    return (
        <>
            <style>
                {`
.react-resizable {
    position: relative;
}
.react-resizable-handle {
    width: 3px;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    display: block;
    position: absolute;
    bottom: 3px;
    top: 3px;
    right: 5px;
    cursor: col-resize;
}
`}
            </style>
            <div style={{ width }}>
                <Resizable
                    style={{ position: 'relative' }}
                    onResize={onResize}
                    width={width}
                    height={0}
                    minConstraints={[100, 0]}
                    maxConstraints={[1000, 0]}
                >
                    <div className="demo-wrap">
                        <ActionList
                            exposeCount={6}
                            autoAdjustment
                            actionList={new Array(10).fill(null).map((v, i) => ({
                                label: `Action ${i}`,
                                onClick: e => console.log('action', i, e)
                            }))}
                        />
                    </div>
                </Resizable>
            </div>
        </>
    );
};
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
