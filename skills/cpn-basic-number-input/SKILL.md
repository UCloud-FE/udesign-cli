---
name: cpn-basic-number-input
description: 帮助 AI 正确使用 UDesign NumberInput 组件（数字输入框组件）。当需要使用 NumberInput 时加载此技能。
---


# 使用 NumberInput 组件

<!-- MANUAL_START: overview -->
## 技能概述

这是 NumberInput 数字输入框组件
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { NumberInput } from '@ucloud-fe/react-components';
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
                <NumberInput defaultValue={2} step={2} computeValidNumber={v => ((v / 2) | 0) * 2} />
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
| defaultValue | `unknown` | - | - | 默认值，非受控 |
| focusOnUpDown | `unknown` | `true` | - |  |
| autoFocus | `unknown` | - | - |  |
| onChange | `unknown` | `function noop() {}` | - | 修改回调 |
| onNumberChange | `unknown` | `function noop() {}` | - | 有效的修改回调，使用按钮改变值或者输入、回车后失焦时触发，可防止监听到无效的回调 |
| onKeyDown | `unknown` | `function noop() {}` | - |  |
| onKeyUp | `unknown` | - | - |  |
| onEnter | `unknown` | `function noop() {}` | - |  |
| disabled | `unknown` | - | - | 禁用 |
| onFocus | `unknown` | `function noop() {}` | - |  |
| onBlur | `unknown` | `function noop() {}` | - |  |
| readOnly | `unknown` | - | - | 只读 |
| max | `unknown` | - | - | 最大值 |
| min | `unknown` | `-MAX_SAFE_INTEGER` | - | 最小值 |
| step | `unknown` | `1` | - | 按钮每次变动大小 |
| upStep | `unknown` | - | - | 增加按钮点击增加的大小，会覆盖 step |
| downStep | `unknown` | - | - | 减少按钮点击减少的大小，会覆盖 step |
| upHandler | `unknown` | - | - | 自定义'+'按钮 |
| downHandler | `unknown` | - | - | 自定义'-'按钮 |
| formatter | `unknown` | - | - | 定义数值展示格式化 |
| parser | `unknown` | `function defaultParser(input) {
    return input.replace(/[^\w.-]+/g, '');
}` | - | 定义输入内容过滤 |
| precision | `unknown` | - | - | 精度，小数点位数 |
| className | `unknown` | - | - |  |
| style | `unknown` | - | - |  |
| styleType | `unknown` | `StyleType[0]` | - | 样式风格 |
| size | `unknown` | `'md'` | - | 尺寸 |
| suffix | `unknown` | - | - | 自定义后缀 |
| inputStyle | `unknown` | - | - | input框自定义样式 |
| computeValidNumber | `unknown` | `v => v` | - | 计算合法值 |
| hideHandler | `unknown` | - | - | 是否隐藏操作按钮 |
| tooltip | `unknown` | - | - | 输入提示，hover 和输入焦点时显示，可直接传入 tooltip 内容，或传入 tooltip 的 props，props 参考 tooltip 组件文档
注意，如果使用自定义 props 中的 visible 和 onVisibleChange 则需要自己去控制 tooltip 的显示隐藏 |
<!-- AUTO_END: props-table -->



<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>演示</summary>

```jsx
const { Size, StyleType } = NumberInput;
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            styleType: StyleType[0],
            readOnly: false,
            hideHandler: false,
            size: 'md',
            suffix: null
        };
    }
    render() {
        const { disabled, styleType, readOnly, size, hideHandler } = this.state;
        const itemLayout = {
            labelCol: {
                span: 2
            },
            controllerCol: {
                span: 10
            }
        };
        return (
            <div>
                <Form className="demo-form">
                    <Form.Item label="size" {...itemLayout}>
                        <Radio.Group
                            value={size}
                            onChange={size => this.setState({ size })}
                            options={Size.map(size => ({
                                value: size
                            }))}
                        />
                    </Form.Item>
                    <Form.Item label="styleType" {...itemLayout}>
                        <Radio.Group
                            value={styleType}
                            onChange={styleType => this.setState({ styleType })}
                            options={StyleType.map(styleType => ({
                                value: styleType
                            }))}
                        />
                    </Form.Item>
                    <Form.Item label="disabled" {...itemLayout}>
                        <Switch checked={disabled} onChange={disabled => this.setState({ disabled })}>
                            disabled
                        </Switch>
                    </Form.Item>
                    <Form.Item label="readonly" {...itemLayout}>
                        <Switch checked={readOnly} onChange={readOnly => this.setState({ readOnly })}>
                            readOnly
                        </Switch>
                    </Form.Item>
                    <Form.Item label="max" {...itemLayout}>
                        <NumberInput onNumberChange={value => this.setState({ max: value })} placeholder="max" />
                    </Form.Item>
                    <Form.Item label="min" {...itemLayout}>
                        <NumberInput onNumberChange={value => this.setState({ min: value })} placeholder="min" />
                    </Form.Item>
                    <Form.Item label="step" {...itemLayout}>
                        <NumberInput onNumberChange={value => this.setState({ step: value })} placeholder="step" />
                    </Form.Item>
                    <Form.Item label="hideHandler" {...itemLayout}>
                        <Switch checked={hideHandler} onChange={hideHandler => this.setState({ hideHandler })} />
                    </Form.Item>
                    <Form.Item label="suffix" {...itemLayout}>
                        <Input onChange={e => this.setState({ suffix: e.target.value })} placeholder="suffix" />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <NumberInput {...this.state} />
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
                    <NumberInput disabled />
                </div>
                <div className="demo-wrap">
                    <NumberInput />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>readOnly - 只读</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <NumberInput readOnly />
                </div>
                <div className="demo-wrap">
                    <NumberInput />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>max/min - 最大值/最小值</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <NumberInput defaultValue={9} max={10} />
                </div>
                <div className="demo-wrap">
                    <NumberInput defaultValue={11} min={10} />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>formatter - 自定义展示格式</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <NumberInput formatter={v => `${v} 台`} defaultValue={3} />
                </div>
                <div className="demo-wrap">
                    <NumberInput formatter={v => `买了 ${v} 个苹果`} defaultValue={2} inputStyle={{ width: 100 }} />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>parser - 自定义可接受输入格式</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <NumberInput parser={v => v.replace(/[^\d]+/g, '')} />
                </div>
                <div className="demo-wrap">
                    <NumberInput parser={v => v.replace(/[^\d/.]+/g, '')} />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>precision - 小数点个数</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <NumberInput defaultValue={2} precision={2} />
                </div>
                <div className="demo-wrap">
                    <NumberInput defaultValue={2} precision={4} />
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
                    <NumberInput step={1.1} />
                </div>
                <div className="demo-wrap">
                    <NumberInput step={10} />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>styleType - 样式类型</summary>

```jsx
const { StyleType } = NumberInput;
class Demo extends React.Component {
    render() {
        return (
            <div>
                {StyleType.map(styleType => (
                    <div className="demo-wrap" key={styleType}>
                        <NumberInput styleType={styleType} />
                    </div>
                ))}
            </div>
        );
    }
}
```

</details>

<details>
<summary>size - 尺寸</summary>

```jsx
const { Size, StyleType } = NumberInput;
class Demo extends React.Component {
    render() {
        return (
            <div>
                {Size.map(size => (
                    <div className="demo-wrap" key={size}>
                        {StyleType.map(styleType => (
                            <div className="demo-block" key={styleType}>
                                <NumberInput styleType={styleType} size={size} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    }
}
```

</details>

<details>
<summary>suffix - 后缀</summary>

```jsx
const { StyleType } = NumberInput;
class Demo extends React.Component {
    render() {
        const max = 10;
        return (
            <div>
                {StyleType.map(styleType => (
                    <div className="demo-wrap" key={styleType}>
                        <div className="demo-block">
                            <NumberInput suffix="G" styleType={styleType} />
                        </div>
                        <div className="demo-block">
                            <NumberInput suffix="台" styleType={styleType} />
                        </div>
                        <div className="demo-block">
                            <NumberInput max={max} suffix={`/${max}`} styleType={styleType} />
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}
```

</details>

<details>
<summary>inputStyle - 自定义输入框样式</summary>

```jsx
const { StyleType } = NumberInput;
class Demo extends React.Component {
    render() {
        return (
            <div>
                {StyleType.map(styleType => (
                    <div className="demo-wrap" key={styleType}>
                        <NumberInput styleType={styleType} inputStyle={{ width: 100 }} />
                    </div>
                ))}
            </div>
        );
    }
}
```

</details>

<details>
<summary>upHandler/downHandler - 自定义 +/- 按钮</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <NumberInput upHandler="+" downHandler="-" />
                </div>
                <div className="demo-wrap">
                    <NumberInput upHandler={<Icon type="arrow-up" />} downHandler={<Icon type="arrow-down" />} />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>computeValidNumber - 自定义合法值的方法</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <NumberInput defaultValue={2} step={2} computeValidNumber={v => ((v / 2) | 0) * 2} />
            </div>
        );
    }
}
```

</details>

<details>
<summary>onNumberChange - 只监听有效数值修改</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <NumberInput
                        defaultValue={2}
                        onChange={(...args) => console.log('onChange:', ...args)}
                        onNumberChange={(...args) => console.log('onNumberChange:', ...args)}
                    />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>uncontrolled - 受控非受控</summary>

```jsx
const layout = {
    style: {
        margin: 8
    }
};

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 4
        };
    }
    render() {
        const { value } = this.state;
        return (
            <div>
                <NumberInput value={value} onChange={value => this.setState({ value })} {...layout} />
                <NumberInput defaultValue={3} {...layout} />
            </div>
        );
    }
}
```

</details>

<details>
<summary>tooltip - 提示文案</summary>

```jsx
const { StyleType } = NumberInput;
class Demo extends React.Component {
    render() {
        return (
            <div>
                {StyleType.map(styleType => (
                    <div className="demo-wrap" key={styleType}>
                        <NumberInput styleType={styleType} tooltip="自定义提示文案" />
                    </div>
                ))}
            </div>
        );
    }
}
```

</details>

<!-- AUTO_END: demos -->

<!-- MANUAL_START: best-practices -->
## 最佳实践

1. **设置合理的 min/max**：限制输入范围防止非法值
2. **使用 onNumberChange 而非 onChange**：`onNumberChange` 只在有效值变化时触发，避免中间态
3. **formatter 和 parser 配对使用**：格式化显示时需要同时提供 parser 解析输入
4. **使用 suffix 添加单位**：比 formatter 更简单的方式添加单位后缀

### 常见场景

#### 资源数量选择

```jsx
<Form.Item label="实例数量">
  <NumberInput
    value={instanceCount}
    onChange={setInstanceCount}
    min={1}
    max={100}
    step={1}
  />
</Form.Item>
```

#### 带单位的数值输入

```jsx
<Form.Item label="磁盘大小">
  <NumberInput
    value={diskSize}
    onChange={setDiskSize}
    min={10}
    max={32000}
    step={10}
    suffix="GB"
  />
</Form.Item>
```
<!-- MANUAL_END: best-practices -->

<!-- MANUAL_START: faq -->
## 常见问题

### Q: onChange 和 onNumberChange 的区别？

A: `onChange` 在每次输入时都会触发（包括输入中间态），`onNumberChange` 只在有效数字确定时触发（按钮点击、回车、失焦）。

### Q: 如何自定义合法值的计算方式？

A: 使用 `computeValidNumber` 属性，传入一个函数接收当前数值和选项，返回合法的数值。
<!-- MANUAL_END: faq -->

<!-- MANUAL_START: critical -->
## 注意事项

_（待补充）_
<!-- MANUAL_END: critical -->
