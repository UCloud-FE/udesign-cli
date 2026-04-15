---
name: cpn-basic-input
description: 帮助 AI 正确使用 UDesign Input 组件（组件，在原生 input 上进行扩展，支持自定义前后缀）。当需要使用 Input 时加载此技能。
---

# 使用 Input 组件

<!-- MANUAL_START: overview -->
## 技能概述

这是 Input 组件，在原生 input 上进行扩展，支持自定义前后缀
需要数字输入框的请使用Input.Number，具体文档请参见 NumberInput 组件
需要 Textarea 的请使用Input.Textarea，具体文档请参见 Textarea 组件
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { Input } from '@ucloud-fe/react-components';
```

> ⚠️ **全局规范 - 所有组件通用**:
> - 生成纯 JavaScript (JSX) 代码，**不要使用 TypeScript 类型注解**
> - **禁止**使用 `@alicloud/*`、`@aliyun/*`、`antd` 等外部组件库
> - 优先使用 UDesign 组件，不要用 HTML 原生标签替代
<!-- AUTO_END: import -->

<!-- AUTO_START: basic-usage -->
### 基本用法

```jsx
const { Sizes } = Input;
class Demo extends React.Component {
    render() {
        return (
            <div>
                {Sizes.map(size => (
                    <div className="demo-wrap" key={size}>
                        <Input size={size} />
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
| ~~icon~~ ⚠️ | `any` | - | - |  **(已废弃: 使用 suffix 替换)** |
| prefix | `any` | - | - | 前缀 |
| suffix | `any` | - | - | 后缀 |
| clearable | `false | true | { autoFocus?: boolean; callOnChange?: boolean; }` | - | - | 是否可清空 |
| size | `"sm" | "md" | "lg"` | `'md'` | - | 尺寸 |
| status | `string` | - | - | 状态 |
| block | `boolean` | - | - | 展示变更为块占位 |
| onClear | `() => void` | `noop` | - | 点击 clear 按钮回调 |
| customStyle | `{ border?: string; boxShadow?: string; background?: string; }` | - | - | 自定义样式 |
<!-- AUTO_END: props-table -->


<!-- AUTO_START: tokens -->
### Design Tokens

| Token 名称 | 分类 | 默认值 | 暗色值 | 说明 |
|------------|------|--------|--------|------|
| `T_INPUT_COLOR_BG_ACTIVE` | color | `#f6f6fb` | `#161C2E` | - |
| `T_INPUT_COLOR_BG_DEFAULT` | color | `#fafafc` | `#0B1224` | - |
| `T_INPUT_COLOR_BG_HL_DEFAULT` | color | `#e3e9ff` | `#2b3555` | - |
| `T_INPUT_COLOR_BG_HL_ERROR` | color | `#fed4d4` | `#6a2e2b` | - |
| `T_INPUT_COLOR_SHADOW_DEFAULT` | color | `inset 0 3px 0 0 rgba(0,0,0,0.05)` | `inset 0 3px 0 0 rgba(0,0,0,0.05)` | - |
| `T_INPUT_COLOR_SHADOW_ERROR` | color | `inset 0 1px 3px 0 #fed4d4` | `inset 0 1px 3px 0 #6a2e2b` | - |
<!-- AUTO_END: tokens -->

<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>演示</summary>

```jsx
const { Sizes } = Input;
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 'md'
        };
    }
    render() {
        const { size, disabled, prefix, suffix, block, clearable, error } = this.state;
        const itemLayout = {
            labelCol: {
                span: 3
            },
            controllerCol: {
                span: 9
            }
        };
        const props = {
            size,
            disabled,
            block,
            clearable,
            prefix: prefix && <Icon type="circle" />,
            suffix: suffix && <Icon type="circle" />
        };
        if (error) {
            props.status = 'error';
        }
        return (
            <div>
                <Form className="demo-form">
                    <Form.Item label="size" {...itemLayout}>
                        <Radio.Group
                            value={size}
                            onChange={size => this.setState({ size })}
                            options={Sizes.map(size => ({
                                value: size
                            }))}
                        />
                    </Form.Item>
                    <Form.Item label="prefix" {...itemLayout}>
                        <Switch checked={prefix} onChange={prefix => this.setState({ prefix })} />
                    </Form.Item>
                    <Form.Item label="suffix" {...itemLayout}>
                        <Switch checked={suffix} onChange={suffix => this.setState({ suffix })} />
                    </Form.Item>
                    <Form.Item label="disabled" {...itemLayout}>
                        <Switch checked={disabled} onChange={disabled => this.setState({ disabled })} />
                    </Form.Item>
                    <Form.Item label="clearable" {...itemLayout}>
                        <Switch checked={clearable} onChange={clearable => this.setState({ clearable })} />
                    </Form.Item>
                    <Form.Item label="status error" {...itemLayout}>
                        <Switch checked={error} onChange={error => this.setState({ error })} />
                    </Form.Item>
                    <Form.Item label="block" {...itemLayout}>
                        <Switch checked={block} onChange={block => this.setState({ block })} />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Input {...props} />
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
const { Sizes } = Input;
class Demo extends React.Component {
    render() {
        return (
            <div>
                {Sizes.map(size => (
                    <div className="demo-wrap" key={size}>
                        <Input size={size} />
                    </div>
                ))}
            </div>
        );
    }
}
```

</details>

<details>
<summary>prefix - 前缀</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Input prefix="prefix" />
                </div>
                <div className="demo-wrap">
                    <Input prefix={<Icon type="search" />} />
                </div>
                <div className="demo-wrap">
                    <Input prefix="prefix" style={{ width: 300 }} />
                </div>
                <div className="demo-wrap">
                    <Input prefix={<div style={{ width: 50 }}>prefix</div>} style={{ width: 300 }} />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>suffix - 后缀</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Input suffix="suffix" />
                </div>
                <div className="demo-wrap">
                    <Input suffix={<Icon type="search" />} />
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
                    <Input defaultValue="default value" suffix={<Icon type="search" />} prefix="search" />
                </div>
                <div className="demo-wrap">
                    <Input disabled defaultValue="default value" suffix={<Icon type="search" />} prefix="search" />
                </div>
                <div className="demo-wrap">
                    <Input disabled defaultValue="default value" prefix={<Icon type="search" />} suffix="search" />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>clearable - 可清空</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Input />
                </div>
                <div className="demo-wrap">
                    <Input clearable />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>status - 状态</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Input />
                </div>
                <div className="demo-wrap">
                    <Input status="error" />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>测试</summary>

```jsx
const { Input } = components;
class InputDemo extends React.Component {
    testFindDOMNode() {
        // eslint-disable-next-line react/no-find-dom-node
        const dom = ReactDOM.findDOMNode(this.input);
        dom.style.background = 'red';
        setTimeout(() => {
            dom.style.background = '';
        }, 1000);
    }
    testRef() {
        console.log(this.input2, this.input2.input, this.input2.focus);
        this.input2.focus();
    }
    render() {
        return (
            <div>
                <h2>应当被容器压缩</h2>
                <div style={{ width: '40px', border: '1px solid red' }}>
                    <Input />
                </div>
                <h2 style={{ color: 'red' }}>findDOMNode 测试 - 请勿使用</h2>
                <div className="demo-wrap">
                    <Input ref={_ref => (this.input = _ref)} />
                    <Button onClick={() => this.testFindDOMNode()}>check</Button>
                </div>
                <h2>ref 测试</h2>
                <div className="demo-wrap">
                    <Input ref={_ref => (this.input2 = _ref)} />
                    <Button onClick={() => this.testRef()}>check</Button>
                </div>
                <h2>禁用状态下 clear 测试</h2>
                <div className="demo-wrap">
                    <Input clearable disabled defaultValue="default" />
                </div>
            </div>
        );
    }
}
class SearchDemo extends React.Component {
    testFindDOMNode() {
        // eslint-disable-next-line react/no-find-dom-node
        const dom = ReactDOM.findDOMNode(this.input);
        dom.style.background = 'red';
        setTimeout(() => {
            dom.style.background = '';
        }, 1000);
    }
    testRef() {
        console.log(this.input2, this.input2.input, this.input2.focus);
        this.input2.focus();
    }
    render() {
        return (
            <div>
                <h2>应当被容器压缩</h2>
                <div style={{ width: '40px', border: '1px solid red' }}>
                    <Input.Search />
                </div>
                <h2>前后不该被挤压</h2>
                <div style={{ width: '400px', border: '1px solid red' }}>
                    <Input
                        suffix={
                            <span>
                                <span>测试文本挤压</span>
                                <span>测试文本挤压</span>
                            </span>
                        }
                        prefix={
                            <span>
                                <span>测试文本挤压</span>
                                <span>测试文本挤压</span>
                            </span>
                        }
                    />
                </div>
                <h2 style={{ color: 'red' }}>findDOMNode 测试 - 请勿使用</h2>
                <div className="demo-wrap">
                    <Input.Search ref={_ref => (this.input = _ref)} />
                    <Button onClick={() => this.testFindDOMNode()}>check</Button>
                </div>
                <h2>ref 测试</h2>
                <div className="demo-wrap">
                    <Input.Search ref={_ref => (this.input2 = _ref)} />
                    <Button onClick={() => this.testRef()}>check</Button>
                </div>
            </div>
        );
    }
}
const Demo = () => (
    <>
        <InputDemo />
        <SearchDemo />
    </>
);
```

</details>

<!-- AUTO_END: demos -->

<!-- MANUAL_START: best-practices -->
## 最佳实践

1. **使用 clearable 提升体验**：搜索框等场景建议开启 clearable
2. **prefix/suffix 增强语义**：使用图标前缀提示用户输入类型
3. **数字输入使用 NumberInput**：不要用 Input 做数字输入，请使用 `Input.Number` 或 `NumberInput`
4. **多行文本使用 Textarea**：不要用 Input 做多行输入，请使用 `Input.Textarea` 或 `Textarea`
5. **受控模式使用 onChange**：`onChange` 返回原生 event，取值用 `e.target.value`

### 常见场景

#### 搜索输入框

```jsx
<Input
  prefix={<Icon type="search" />}
  clearable
  placeholder="请输入搜索关键词"
  value={keyword}
  onChange={e => setKeyword(e.target.value)}
/>
```

#### 表单中的输入框

```jsx
<Form.Item label="名称" required>
  <Input
    value={name}
    onChange={e => setName(e.target.value)}
    placeholder="请输入名称"
    size="md"
  />
</Form.Item>
```
<!-- MANUAL_END: best-practices -->

<!-- MANUAL_START: faq -->
## 常见问题

### Q: onChange 的参数是什么？

A: `onChange` 接收的是原生的 `ChangeEvent`，需要通过 `e.target.value` 获取输入值，而不是直接的值。

### Q: 如何获取 Input 的焦点？

A: 使用 ref：`<Input ref={inputRef} />`，然后调用 `inputRef.current.focus()`。
<!-- MANUAL_END: faq -->

<!-- MANUAL_START: critical -->
## 注意事项

_（待补充）_
<!-- MANUAL_END: critical -->
