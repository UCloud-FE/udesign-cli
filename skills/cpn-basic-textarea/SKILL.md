---
name: cpn-basic-textarea
description: 帮助 AI 正确使用 UDesign Textarea 组件（对原生 textarea 的简单封装，包含了一些样式）。当需要使用 Textarea 时加载此技能。
---


# 使用 Textarea 组件

<!-- MANUAL_START: overview -->
## 技能概述

对原生 textarea 的简单封装，包含了一些样式
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { Textarea } from '@ucloud-fe/react-components';
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
                    <Textarea disabled />
                </div>
                <div className="demo-wrap">
                    <Textarea />
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
| className | `unknown` | - | - |  |
<!-- AUTO_END: props-table -->



<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>演示</summary>

```jsx
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { disabled } = this.state;
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
                    <Form.Item label="disabled" {...itemLayout}>
                        <Switch checked={disabled} onChange={disabled => this.setState({ disabled })} />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Textarea disabled={disabled} placeholder="please input here" />
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
                    <Textarea disabled />
                </div>
                <div className="demo-wrap">
                    <Textarea />
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

1. **使用 rows 控制初始高度**：通过 `rows` 设置合理的初始显示行数
2. **设置 maxLength 限制长度**：避免用户输入过长内容
3. **onChange 返回原生 event**：取值用 `e.target.value`，与 Input 一致
4. **短文本用 Input**：单行文本输入使用 Input，多行才用 Textarea

### 常见场景

#### 表单中的描述输入

```jsx
<Form.Item label="描述">
  <Textarea
    value={description}
    onChange={e => setDescription(e.target.value)}
    placeholder="请输入描述信息"
    rows={4}
  />
</Form.Item>
```

#### 备注输入

```jsx
<Form.Item label="备注">
  <Textarea
    value={remark}
    onChange={e => setRemark(e.target.value)}
    placeholder="请输入备注（选填）"
    rows={3}
    maxLength={500}
  />
</Form.Item>
```
<!-- MANUAL_END: best-practices -->

<!-- MANUAL_START: faq -->
## 常见问题

### Q: 如何固定高度不允许拖拽？

A: 设置 `style={{ resize: 'none' }}`。

### Q: onChange 的参数是什么？

A: 与 Input 一致，接收原生 `ChangeEvent`，通过 `e.target.value` 获取值。
<!-- MANUAL_END: faq -->

<!-- MANUAL_START: critical -->
## 注意事项

_（待补充）_
<!-- MANUAL_END: critical -->
