---
name: cpn-basic-radio
description: 帮助 AI 正确使用 UDesign Radio 组件（单选框组件，提供多张单选框样式）。当需要使用 Radio 时加载此技能。
---

# 使用 Radio 组件

<!-- MANUAL_START: overview -->
## 技能概述

Radio 单选框组件，提供多张单选框样式
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { Radio } from '@ucloud-fe/react-components';
```

> ⚠️ **全局规范 - 所有组件通用**:
> - 生成纯 JavaScript (JSX) 代码，**不要使用 TypeScript 类型注解**
> - **禁止**使用 `@alicloud/*`、`@aliyun/*`、`antd` 等外部组件库
> - 优先使用 UDesign 组件，不要用 HTML 原生标签替代
<!-- AUTO_END: import -->

<!-- AUTO_START: basic-usage -->
### 基本用法

```jsx
const Demo = () => (
    <div>
        <div className="demo-wrap">
            <Radio checked={false}>common</Radio>
        </div>
        <div className="demo-wrap">
            <Radio checked>checked</Radio>
        </div>
    </div>
);
```
<!-- AUTO_END: basic-usage -->

<!-- AUTO_START: props-table -->
### API 参数

| 属性 | 类型 | 默认值 | 必填 | 说明 |
|------|------|--------|------|------|
| children | `unknown` | - | - |  |
| checked | `unknown` | - | - | 是否选中 |
| defaultChecked | `unknown` | - | - | 默认是否选中 |
| disabled | `unknown` | - | - | 是否禁用 |
| onChange | `unknown` | `() => {}` | - | 点选时的回调 |
| onClick | `unknown` | `() => {}` | - |  |
| value | `unknown` | - | - | radio的值 |
| styleType | `unknown` | - | - | 样式风格 |
| size | `unknown` | - | - | 尺寸，styleType 为 card、list 时无效 |
| title | `unknown` | - | - | 标题，styleType 为 card 时使用 |
| extra | `unknown` | - | - | 附加内容，styleType 为 list 时使用 |
| disabledLabel | `unknown` | - | - |  |
| multiple | `unknown` | - | - |  |
<!-- AUTO_END: props-table -->


<!-- AUTO_START: tokens -->
### Design Tokens

| Token 名称 | 分类 | 默认值 | 暗色值 | 说明 |
|------------|------|--------|--------|------|
| `T_RADIO_CARD_COLOR_BG_ACTIVE` | color | `#fafafc` | `#0B1224` | - |
| `T_RADIO_HEADER_COLOR_BG_ACTIVE` | color | - | `#0B1224` | - |
<!-- AUTO_END: tokens -->

<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>演示</summary>

```jsx
const { Size, StyleType } = Radio;
class Demo extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            styleType: StyleType[0],
            size: 'md',
            disabled: false,
            checked: false
        };
    }
    render() {
        const { size, disabled, styleType, checked } = this.state;
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
                    <Form.Item label="size" {...itemLayout}>
                        <Radio.Group
                            options={Size.map(size => ({ value: size }))}
                            value={size}
                            onChange={size => this.setState({ size })}
                        />
                    </Form.Item>
                    <Form.Item label="styleType" {...itemLayout}>
                        <Radio.Group
                            options={StyleType.map(styleType => ({ value: styleType }))}
                            value={styleType}
                            onChange={styleType => this.setState({ styleType })}
                        />
                    </Form.Item>
                    <Form.Item label="disabled" {...itemLayout}>
                        <Switch checked={disabled} onChange={disabled => this.setState({ disabled })} />
                    </Form.Item>
                    <Form.Item label="checked" {...itemLayout}>
                        <Switch checked={checked} onChange={checked => this.setState({ checked })} />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Radio
                        {...this.state}
                        title={this.state.styleType}
                        onChange={checked => this.setState({ checked })}
                    >
                        checked
                    </Radio>
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>checked - 选中</summary>

```jsx
const Demo = () => (
    <div>
        <div className="demo-wrap">
            <Radio checked={false}>common</Radio>
        </div>
        <div className="demo-wrap">
            <Radio checked>checked</Radio>
        </div>
    </div>
);
```

</details>

<details>
<summary>disabled - 禁用</summary>

```jsx
const Demo = () => (
    <div>
        <div className="demo-wrap">
            <Radio>common</Radio>
        </div>
        <div className="demo-wrap">
            <Radio disabled>disabled</Radio>
        </div>
    </div>
);
```

</details>

<details>
<summary>size - 大小</summary>

```jsx
const { Size } = Radio;
const Demo = () => (
    <div>
        {Size.map(size => (
            <div className="demo-wrap" key={size}>
                <Radio size={size}>{size}</Radio>
            </div>
        ))}
    </div>
);
```

</details>

<details>
<summary>styleType - 样式类型</summary>

```jsx
const { StyleType } = Radio;
const list = [{ checked: false }, { checked: true }, { disabled: true }, { checked: true, disabled: true }];
const Demo = () => (
    <div>
        {StyleType.map(styleType =>
            styleType === 'list' ? (
                <div className="demo-wrap" key={styleType}>
                    {list.map((props, i) => (
                        <Radio styleType={styleType} key={i} {...props}>
                            {styleType}
                        </Radio>
                    ))}
                </div>
            ) : (
                <Combine className="demo-wrap" key={styleType}>
                    {list.map((props, i) => (
                        <Radio styleType={styleType} key={i} {...props}>
                            {styleType}
                        </Radio>
                    ))}
                </Combine>
            )
        )}
        <Combine className="demo-wrap">
            {list.map((props, i) => (
                <Radio styleType="card" title="card" key={i} {...props} />
            ))}
        </Combine>
        <div className="demo-wrap">
            {list.map((props, i) => (
                <div key={i}>
                    <Radio styleType="list" extra={<span>备注</span>} {...props}>
                        <p>title</p>
                        <p>content</p>
                    </Radio>
                </div>
            ))}
        </div>
        <div className="demo-wrap">
            {list.map((props, i) => (
                <div key={i}>
                    <Radio styleType="list" extra={<span>备注</span>} {...props}>
                        longcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontent
                    </Radio>
                </div>
            ))}
        </div>
    </div>
);
```

</details>

<details>
<summary>defaultValue - 默认值，非受控</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Radio onChange={console.log} checked>
                        controlled
                    </Radio>
                </div>
                <div className="demo-wrap">
                    <Radio onChange={console.log} defaultChecked>
                        uncontrolled
                    </Radio>
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

1. **使用 Radio.Group 管理**：避免单独使用 Radio 管理状态
2. **使用 options 快速配置**：简单选项直接使用 options 数组
3. **根据场景选择 styleType**：表单切换用 button、地域选择用 card
4. **button 样式禁用注意 Tooltip**：需要用 fakeDisabled 处理

### 常见场景

#### 表单中的单选

```jsx
<Form.Item label="付费方式">
  <Radio.Group
    value={payType}
    onChange={setPayType}
    styleType="button"
    options={[
      { label: '按月', value: 'monthly' },
      { label: '按年', value: 'yearly' },
      { label: '按需', value: 'demand' }
    ]}
  />
</Form.Item>
```

#### 卡片选择

```jsx
<Radio.Group value={region} onChange={setRegion} styleType="card">
  <Radio value="cn-bj2" title="北京二">华北地域</Radio>
  <Radio value="cn-sh2" title="上海二">华东地域</Radio>
  <Radio value="cn-gd" title="广州">华南地域</Radio>
</Radio.Group>
```
<!-- MANUAL_END: best-practices -->

<!-- MANUAL_START: faq -->
## 常见问题

### Q: Radio.Group 的 onChange 返回什么？

A: 返回当前选中的 Radio 的 `value` 值。

### Q: styleType 为 card 时如何显示标题？

A: 使用 Radio 的 `title` 属性：`<Radio value="a" title="标题">描述内容</Radio>`。
<!-- MANUAL_END: faq -->

<!-- MANUAL_START: critical -->
## 注意事项

_（待补充）_
<!-- MANUAL_END: critical -->
