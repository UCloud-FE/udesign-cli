---
name: cpn-basic-progress
description: 帮助 AI 正确使用 UDesign Progress 组件（组件）。当需要使用 Progress 时加载此技能。
---


# 使用 Progress 组件

<!-- MANUAL_START: overview -->
## 技能概述

这是 Progress 组件
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { Progress } from '@ucloud-fe/react-components';
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
    constructor(props) {
        super(props);
        this.state = {
            percent: 10
        };
    }
    render() {
        const { percent } = this.state;
        const itemLayout = {
            labelCol: {
                span: 2
            },
            controllerCol: {
                span: 9
            }
        };
        return (
            <div>
                <Form>
                    <Form.Item label={'percent'} {...itemLayout}>
                        <Input.Number
                            value={percent}
                            min={0}
                            max={100}
                            onNumberChange={percent => this.setState({ percent })}
                        />
                    </Form.Item>
                </Form>
                <div className="demo-wrap" style={{ padding: 24 }}>
                    <Progress percent={percent} />
                </div>
                <div className="demo-wrap" style={{ padding: 24, width: 100 }}>
                    <Progress percent={percent} styleType="circle" />
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
| styleType | `unknown` | `'line'` | - | 进度条类型，可选 line、circle |
| percent | `unknown` | `0` | - | 当前百分比 |
| color | `unknown` | - | - | 进度条颜色，内置 success、warn、error |
| format | `unknown` | `percent => `${percent}%`` | - | 展示文字的格式化，为 null 时隐藏文字 |
| strokeWidth | `unknown` | `10` | - | 进度条粗度 |
<!-- AUTO_END: props-table -->


<!-- AUTO_START: tokens -->
### Design Tokens

| Token 名称 | 分类 | 默认值 | 暗色值 | 说明 |
|------------|------|--------|--------|------|
| `T_PROGRESS_COLOR_BG_DEFAULT` | color | `#dfe0f1` | `#192036` | - |
<!-- AUTO_END: tokens -->

<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>普通使用</summary>

```jsx
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            percent: 10
        };
    }
    render() {
        const { percent } = this.state;
        const itemLayout = {
            labelCol: {
                span: 2
            },
            controllerCol: {
                span: 9
            }
        };
        return (
            <div>
                <Form>
                    <Form.Item label={'percent'} {...itemLayout}>
                        <Input.Number
                            value={percent}
                            min={0}
                            max={100}
                            onNumberChange={percent => this.setState({ percent })}
                        />
                    </Form.Item>
                </Form>
                <div className="demo-wrap" style={{ padding: 24 }}>
                    <Progress percent={percent} />
                </div>
                <div className="demo-wrap" style={{ padding: 24, width: 100 }}>
                    <Progress percent={percent} styleType="circle" />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>format - 展示文字的格式化</summary>

```jsx
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            percent: 10
        };
    }
    render() {
        const { percent } = this.state;
        const itemLayout = {
            labelCol: {
                span: 2
            },
            controllerCol: {
                span: 9
            }
        };
        return (
            <div>
                <Form>
                    <Form.Item label={'percent'} {...itemLayout}>
                        <Input.Number
                            value={percent}
                            min={0}
                            max={100}
                            onNumberChange={percent => this.setState({ percent })}
                        />
                    </Form.Item>
                </Form>
                <div className="demo-wrap" style={{ padding: 24 }}>
                    <Progress percent={percent} format={v => `${v.toFixed(2)}%`} />
                </div>
                <div className="demo-wrap" style={{ padding: 24 }}>
                    <Progress percent={percent} format={null} />
                </div>

                <div className="demo-wrap" style={{ padding: 24, width: 100 }}>
                    <Progress percent={percent} format={v => `${v.toFixed(2)}%`} styleType="circle" />
                </div>
                <div className="demo-wrap" style={{ padding: 24, width: 100 }}>
                    <Progress percent={percent} format={null} styleType="circle" />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>color - 进度条颜色</summary>

```jsx
class Demo extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div className="demo-wrap" style={{ padding: 24 }}>
                    <Progress percent={40} />
                </div>
                <div className="demo-wrap" style={{ padding: 24 }}>
                    <Progress percent={100} color="success" />
                </div>
                <div className="demo-wrap" style={{ padding: 24 }}>
                    <Progress percent={20} color="warn" />
                </div>
                <div className="demo-wrap" style={{ padding: 24 }}>
                    <Progress percent={50} color="error" />
                </div>
                <div className="demo-wrap" style={{ padding: 24 }}>
                    <Progress percent={67} color="#411" />
                </div>
                <div className="demo-wrap" style={{ padding: 24 }}>
                    <Combine>
                        <Progress percent={40} styleType="circle" style={{ width: 100 }} />
                        <Progress percent={100} color="success" styleType="circle" style={{ width: 100 }} />
                        <Progress percent={20} color="warn" styleType="circle" style={{ width: 100 }} />
                        <Progress percent={50} color="error" styleType="circle" style={{ width: 100 }} />
                        <Progress percent={67} color="#411" styleType="circle" style={{ width: 100 }} />
                    </Combine>
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>custom - 自定义</summary>

```jsx
class Demo extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div className="demo-wrap" style={{ padding: 24 }}>
                    <Progress percent={40} format={null} style={{ width: 100 }} />
                </div>
                <div className="demo-wrap" style={{ padding: 24 }}>
                    <Tooltip
                        arrow={false}
                        placement="bottomRight"
                        popup={
                            <ul>
                                <li>提示文案</li>
                                <li>提示文案</li>
                                <li>提示文案</li>
                            </ul>
                        }
                    >
                        <Progress percent={40} format={null} style={{ width: 100 }} />
                    </Tooltip>
                </div>
                <div className="demo-wrap" style={{ padding: 24 }}>
                    <Progress percent={40} format={null} style={{ width: 100 }} styleType="circle" />
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
