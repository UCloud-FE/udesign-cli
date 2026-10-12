---
name: cpn-basic-time-picker
description: 帮助 AI 正确使用 UDesign TimePicker 组件（组件）。当需要使用 TimePicker 时加载此技能。
---


# 使用 TimePicker 组件

<!-- MANUAL_START: overview -->
## 技能概述

这是 TimePicker 组件
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { TimePicker } from '@ucloud-fe/react-components';
```

> ⚠️ **全局规范 - 所有组件通用**:
> - 生成纯 JavaScript (JSX) 代码，**不要使用 TypeScript 类型注解**
> - **禁止**使用 `@alicloud/*`、`@aliyun/*`、`antd` 等外部组件库
> - 优先使用 UDesign 组件，不要用 HTML 原生标签替代
<!-- AUTO_END: import -->

<!-- AUTO_START: basic-usage -->
### 基本用法

```jsx
const { DemoWrap } = demoUtil;
const Demo = () => {
    return (
        <div>
            {['sm', 'md', 'lg'].map(size => (
                <DemoWrap key={size}>
                    <TimePicker size={size} />
                </DemoWrap>
            ))}
        </div>
    );
};
```
<!-- AUTO_END: basic-usage -->

<!-- AUTO_START: props-table -->
### API 参数

| 属性 | 类型 | 默认值 | 必填 | 说明 |
|------|------|--------|------|------|
| value | `TDate | null` | - | - | 当前值，受控 |
| defaultValue | `TDate | null` | - | - | 默认值，非受控 |
| onChange | `(value: Moment | null) => void` | - | - | 修改回调 |
| popoverProps | `any` | - | - | 自定义 Popover 的 props |
| nullable | `boolean` | - | - | 是否可为空 |
| format | `string` | `'HH:mm:ss'` | - | 自定义展示格式 |
| disabled | `boolean` | - | - | 是否禁用 |
| size | `Size` | - | - | 尺寸 |
| locale | `LOCALE` | - | - |  |
<!-- AUTO_END: props-table -->



<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>演示</summary>

```jsx
const { formLayout, DemoWrap } = demoUtil;
const Demo = () => {
    const [nullable, setNullable] = React.useState(false);
    const [format, setFormat] = React.useState('HH:mm:ss');
    const [size, setSize] = React.useState('md');
    const [disabled, setDisabled] = React.useState(false);
    const handleFormatChange = React.useCallback(e => setFormat(e.target.value), []);
    const handleChange = React.useCallback(v => {
        console.log(v ? v.format('HH:mm:ss') : '' + v, v);
    }, []);
    const props = {
        onChange: handleChange,
        format,
        disabled,
        size,
        nullable
    };
    return (
        <>
            <Form className="demo-form" itemProps={{ ...formLayout }}>
                <Form.Item label="nullable">
                    <Switch checked={nullable} onChange={setNullable} />
                </Form.Item>
                <Form.Item label="format">
                    <Input value={format} onChange={handleFormatChange} />
                </Form.Item>
                <Form.Item label="disabled">
                    <Switch checked={disabled} onChange={setDisabled} />
                </Form.Item>
                <Form.Item label="size">
                    <Radio.Group
                        value={size}
                        options={['sm', 'md', 'lg'].map(value => ({ value }))}
                        onChange={setSize}
                    />
                </Form.Item>
            </Form>
            <DemoWrap>
                <TimePicker {...props} onChange={handleChange} />
            </DemoWrap>
        </>
    );
};
```

</details>

<details>
<summary>format - 自定义支持格式</summary>

```jsx
const { DemoWrap } = demoUtil;
const Demo = () => {
    return (
        <div>
            <DemoWrap>
                <TimePicker />
            </DemoWrap>
            <DemoWrap>
                <TimePicker format="H:m:s" />
            </DemoWrap>
            <DemoWrap>
                <TimePicker format="HH - mm - ss" />
            </DemoWrap>
            <DemoWrap>
                <TimePicker format="HH:mm" />
            </DemoWrap>
            <DemoWrap>
                <TimePicker format="HH" />
            </DemoWrap>
        </div>
    );
};
```

</details>

<details>
<summary>size - 尺寸</summary>

```jsx
const { DemoWrap } = demoUtil;
const Demo = () => {
    return (
        <div>
            {['sm', 'md', 'lg'].map(size => (
                <DemoWrap key={size}>
                    <TimePicker size={size} />
                </DemoWrap>
            ))}
        </div>
    );
};
```

</details>

<details>
<summary>disabled - 禁用</summary>

```jsx
const { DemoWrap } = demoUtil;
const Demo = () => {
    return (
        <div>
            <DemoWrap>
                <TimePicker />
            </DemoWrap>
            <DemoWrap>
                <TimePicker disabled />
            </DemoWrap>
        </div>
    );
};
```

</details>

<details>
<summary>nullable - 是否可为空</summary>

```jsx
const { DemoWrap } = demoUtil;
const Demo = () => {
    return (
        <div>
            <DemoWrap>
                <TimePicker />
            </DemoWrap>
            <DemoWrap>
                <TimePicker nullable />
            </DemoWrap>
        </div>
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
