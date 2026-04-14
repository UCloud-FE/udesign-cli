---
name: cpn-basic-slider
description: 帮助 AI 正确使用 UDesign Slider 组件（组件）。当需要使用 Slider 时加载此技能。
---

# 使用 Slider 组件

<!-- MANUAL_START: overview -->
## 技能概述

这是 Slider 组件
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { Slider } from '@ucloud-fe/react-components';
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
                    <Slider min={0} max={20} defaultValue={3} isSensitive onChange={console.log} />
                </div>
                <div className="demo-wrap">
                    <Slider min={0} max={20} defaultValue={3} onChange={console.log} />
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
| value | `unknown` | - | - | 值，受控 |
| defaultValue | `unknown` | `0` | - | 默认值，非受控 |
| range | `unknown` | `false` | - | 是否为双滑块模式 |
| onChange | `unknown` | `() => {}` | - | 修改回调 |
| onLastChange | `unknown` | `() => {}` | - | 拖拽结束、输入回车、输入失焦、数字输入框上下按钮等时触发 |
| disabled | `unknown` | - | - | 是否禁用 |
| min | `unknown` | `0` | - | 最小值 |
| max | `unknown` | `100` | - | 最大值 |
| step | `unknown` | `1` | - | 每次变动的大小，传入的(最大值-最小值)必须为step的整数倍，大于0 |
| marks | `unknown` | - | - | 标记 |
| className | `unknown` | - | - |  |
| style | `unknown` | - | - |  |
| sliderClassName | `unknown` | - | - | slider 类名 |
| sliderStyle | `unknown` | - | - | slider 样式 |
| numberInput | `unknown` | - | - | number input 的自定义 props，为null时隐藏 |
| isSensitive | `unknown` | - | - | 是否灵敏的触发onChange，为true时当NumberInput中实时输入有效值时会触发onChange |
| numberInputTipFormatter | `unknown` | - | - | 输入框提示语格式化，传入null隐藏 |
| tipFormatter | `unknown` | - | - | 提示语格式化，传入null隐藏 |
| size | `unknown` | `'md'` | - | 尺寸 |
| locale | `unknown` | - | - |  |
<!-- AUTO_END: props-table -->


<!-- AUTO_START: tokens -->
### Design Tokens

| Token 名称 | 分类 | 默认值 | 暗色值 | 说明 |
|------------|------|--------|--------|------|
| `T_SLIDER_COLOR_BG_ACTIVE` | color | `#f8f8ff` | `#1B2341` | - |
| `T_SLIDER_COLOR_BG_DEFAULT` | color | `#fafafc` | `#0B1224` | - |
| `T_SLIDER_COLOR_LINE_ACTIVE` | color | `#3860f4` | `#738BFF` | - |
| `T_SLIDER_COLOR_LINE_DEFAULT` | color | `#c3cad9` | `#3F4A70` | - |
| `T_SLIDER_COLOR_TEXT_ACTIVE` | color | `#3860f4` | `#738BFF` | - |
| `T_SLIDER_COLOR_TEXT_DEFAULT` | color | `#7a8baa` | `#5C6586` | - |
<!-- AUTO_END: tokens -->

<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>普通使用</summary>

```jsx
const itemLayout = {
    labelCol: {
        span: 3
    },
    controllerCol: {
        span: 9
    }
};
const { Size } = Slider;

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 'md',
            disabled: false,
            min: 0,
            max: 100,
            step: 1
        };
    }
    render() {
        const { disabled, size, min, max, step, isSensitive, hideNumberInput } = this.state;
        return (
            <div>
                <Form className="demo-form">
                    <Form.Item label="size" {...itemLayout}>
                        <Radio.Group
                            value={size}
                            onChange={size => this.setState({ size })}
                            options={Size.map(size => ({ value: size }))}
                        />
                    </Form.Item>
                    <Form.Item label="disabled" {...itemLayout}>
                        <Switch checked={disabled} onChange={disabled => this.setState({ disabled })}>
                            disabled
                        </Switch>
                    </Form.Item>
                    <Form.Item label="isSensitive" {...itemLayout}>
                        <Switch checked={isSensitive} onChange={isSensitive => this.setState({ isSensitive })}>
                            isSensitive
                        </Switch>
                    </Form.Item>
                    <Form.Item label="hideNumberInput" {...itemLayout}>
                        <Switch
                            checked={hideNumberInput}
                            onChange={hideNumberInput => this.setState({ hideNumberInput })}
                        >
                            hideNumberInput
                        </Switch>
                    </Form.Item>
                    <Form.Item label="min" {...itemLayout}>
                        <NumberInput value={min} onChange={v => this.setState({ min: v })} />
                    </Form.Item>
                    <Form.Item label="max" {...itemLayout}>
                        <NumberInput value={max} onChange={v => this.setState({ max: v })} />
                    </Form.Item>
                    <Form.Item label="step" {...itemLayout}>
                        <NumberInput min={0.0001} value={step} onNumberChange={v => this.setState({ step: v })} />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Slider
                        defaultValue={10}
                        {...this.state}
                        numberInput={hideNumberInput ? null : {}}
                        onChange={console.log}
                    />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>value / defaultValue - 受控 / 非受控</summary>

```jsx
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 10
        };
    }
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Slider min={0} max={20} defaultValue={5} />
                </div>
                <div className="demo-wrap">
                    <Slider min={0} max={20} value={this.state.value} onChange={v => this.setState({ value: v })} />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>range - 双滑块模式</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Slider min={10} max={20} range defaultValue={[10, 12]} />
                </div>
                <div className="demo-wrap">
                    <Slider max={20} defaultValue={[2, 10]} range />
                </div>
                <div className="demo-wrap">
                    <Slider defaultValue={[20, 50]} range />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>min / max - 最大值 / 最小值</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Slider min={10} max={20} defaultValue={15} />
                </div>
                <div className="demo-wrap">
                    <Slider max={20} defaultValue={10} />
                </div>
                <div className="demo-wrap">
                    <Slider defaultValue={10} />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>marks - 标记</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Slider min={0} max={20} defaultValue={3} />
                </div>
                <div className="demo-wrap">
                    <Slider
                        min={0}
                        max={20}
                        defaultValue={3}
                        marks={{
                            5: '5个',
                            10: '10个',
                            15: '15个',
                            20: '20个'
                        }}
                    />
                </div>
                <div className="demo-wrap">
                    <Slider
                        min={0}
                        max={20}
                        defaultValue={[3, 10]}
                        range
                        marks={{
                            5: '5个',
                            10: '10个',
                            15: '15个',
                            20: '20个'
                        }}
                    />
                </div>
                <div className="demo-wrap">
                    <Slider
                        min={0}
                        max={20}
                        defaultValue={3}
                        marks={{
                            5: '5个',
                            10: '10个',
                            18: '18个'
                        }}
                    />
                </div>
                <div className="demo-wrap">
                    <Slider
                        min={0}
                        max={20}
                        range
                        defaultValue={[3, 10]}
                        marks={{
                            5: '5个',
                            10: '10个',
                            18: '18个'
                        }}
                    />
                </div>
                <div className="demo-wrap">
                    <Slider
                        min={10}
                        max={1000}
                        defaultValue={12}
                        marks={{
                            50: {
                                label: '50',
                                step: 2,
                                ratio: 10
                            },
                            100: {
                                label: '100',
                                step: 5,
                                ratio: 10
                            },
                            200: {
                                label: '200',
                                step: 10,
                                ratio: 15
                            },
                            400: {
                                label: '400',
                                step: 20
                            },
                            1000: {
                                label: '1000',
                                step: 50
                            }
                        }}
                    />
                </div>
                <div className="demo-wrap">
                    <Slider
                        min={10}
                        max={1000}
                        range
                        defaultValue={[100, 400]}
                        marks={{
                            50: {
                                label: '50',
                                step: 2,
                                ratio: 10
                            },
                            100: {
                                label: '100',
                                step: 5,
                                ratio: 10
                            },
                            200: {
                                label: '200',
                                step: 10,
                                ratio: 15
                            },
                            400: {
                                label: '400',
                                step: 20
                            },
                            1000: {
                                label: '1000',
                                step: 50
                            }
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
<summary>disabled - 禁用</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Slider min={0} max={20} defaultValue={3} disabled />
                </div>
                <div className="demo-wrap">
                    <Slider min={0} max={20} defaultValue={3} />
                </div>
                <div className="demo-wrap">
                    <Slider min={0} max={20} range defaultValue={[3, 10]} disabled />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>isSensitive - 实时反馈</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Slider min={0} max={20} defaultValue={3} isSensitive onChange={console.log} />
                </div>
                <div className="demo-wrap">
                    <Slider min={0} max={20} defaultValue={3} onChange={console.log} />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>step - 步长</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Slider min={0} max={20} defaultValue={3} step={5} />
                </div>
                <div className="demo-wrap">
                    <Slider min={0} max={20} defaultValue={3} />
                </div>
                <div className="demo-wrap">
                    <Slider min={0} max={20} range defaultValue={[3, 10]} step={5} />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>tipFormatter - 提示语格式化</summary>

```jsx
class Demo extends React.Component {
    renderRedTip(v) {
        return <p style={{ width: 50, color: 'red' }}>{v} 个</p>;
    }

    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Slider min={0} max={20} defaultValue={10} tipFormatter={null} />
                </div>
                <div className="demo-wrap">
                    <Slider min={0} max={20} defaultValue={10} tipFormatter={this.renderRedTip} />
                </div>
                <div className="demo-wrap">
                    <Slider min={0} max={20} range defaultValue={[3, 10]} tipFormatter={null} />
                </div>
                <div className="demo-wrap">
                    <Slider min={0} max={20} range defaultValue={[3, 10]} tipFormatter={this.renderRedTip} />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>numberInput - 自定义 NumberInput</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Slider
                        defaultValue={5}
                        numberInput={{
                            upHandler: <Icon type="arrow-up" />,
                            downHandler: <Icon type="arrow-down" />
                        }}
                    />
                </div>
                <div className="demo-wrap">
                    <Slider defaultValue={5} numberInput={null} />
                </div>
                <div className="demo-wrap">
                    <Slider defaultValue={10} />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>numberInputTipFormatter - 提示语格式化</summary>

```jsx
class Demo extends React.Component {
    renderRedTip(option) {
        const { currentValue, inputValue } = option;
        return (
            <p style={{ width: 'auto', whiteSpace: 'pre-line', color: 'red' }}>
                当前:{currentValue}, 输入: {inputValue}
                {'\n'}回车或失焦生效
            </p>
        );
    }

    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Slider min={0} max={20} defaultValue={10} numberInputTipFormatter={null} />
                </div>
                <div className="demo-wrap">
                    <Slider min={0} max={20} defaultValue={10} numberInputTipFormatter={this.renderRedTip} />
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
