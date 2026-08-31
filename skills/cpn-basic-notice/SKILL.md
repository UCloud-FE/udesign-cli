---
name: cpn-basic-notice
description: 帮助 AI 正确使用 UDesign Notice 组件（提示框组件）。当需要使用 Notice 时加载此技能。
---


# 使用 Notice 组件

<!-- MANUAL_START: overview -->
## 技能概述

这是 Notice 提示框组件
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { Notice } from '@ucloud-fe/react-components';
```

> ⚠️ **全局规范 - 所有组件通用**:
> - 生成纯 JavaScript (JSX) 代码，**不要使用 TypeScript 类型注解**
> - **禁止**使用 `@alicloud/*`、`@aliyun/*`、`antd` 等外部组件库
> - 优先使用 UDesign 组件，不要用 HTML 原生标签替代
<!-- AUTO_END: import -->

<!-- AUTO_START: basic-usage -->
### 基本用法

```jsx
const { StyleType } = Notice;
const layout = { style: { marginBottom: 8 } };
const Demo = () => (
    <div>
        {StyleType.map(styleType => (
            <Notice
                key={styleType}
                styleType={styleType}
                onClose={e => {
                    console.log('closed', styleType);
                }}
                {...layout}
            >
                Notice content
            </Notice>
        ))}
    </div>
);
```
<!-- AUTO_END: basic-usage -->

<!-- AUTO_START: props-table -->
### API 参数

| 属性 | 类型 | 默认值 | 必填 | 说明 |
|------|------|--------|------|------|
| closable | `boolean` | `true` | - | 是否显示关闭按钮 |
| icon | `null | false | string | ReactNode` | - | - | 自定义前置icon，可传入Icon type或者自定义Icon，传入null、false隐藏，默认显示感叹号icon |
| onClose | `(e: MouseEvent) => void` | `noop` | - | 关闭的回调 |
| styleType | `'default' | 'success' | 'warning' | 'error' | 'disabled' | 'info'` | `'default'` | - | 样式类型 |
| action | `ReactNode` | - | - | 自定义操作 |
<!-- AUTO_END: props-table -->



<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>演示</summary>

```jsx
const { StyleType } = Notice;
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            styleType: StyleType[0],
            closable: false,
            icon: 'undefined',
            longContent: false,
            withAction: false
        };
    }
    render() {
        const { styleType, closable, icon, longContent, withAction } = this.state;
        const itemLayout = {
            labelCol: {
                span: 2
            },
            controllerCol: {
                span: 10
            }
        };
        const props = {
            styleType,
            closable,
            icon
        };
        if (icon === 'undefined') {
            delete props.icon;
        }
        if (withAction) {
            props.action = [
                <Icon key={1} style={{ cursor: 'pointer' }} type="eye" onClick={console.log} />,
                <Icon key={2} style={{ cursor: 'pointer', marginLeft: 8 }} type="more" onClick={console.log} />
            ];
        }
        return (
            <div>
                <Form className="demo-form">
                    <Form.Item label="styleType" {...itemLayout}>
                        <Radio.Group
                            options={StyleType.map(styleType => ({ value: styleType }))}
                            value={styleType}
                            onChange={styleType => this.setState({ styleType })}
                        />
                    </Form.Item>
                    <Form.Item label="closable" {...itemLayout}>
                        <Switch checked={closable} onChange={closable => this.setState({ closable })} />
                    </Form.Item>
                    <Form.Item label="icon" {...itemLayout}>
                        <Radio.Group
                            options={['undefined', 'loading', 'circle'].map(icon => ({ value: icon }))}
                            value={icon}
                            onChange={icon => this.setState({ icon })}
                        />
                    </Form.Item>
                    <Form.Item label="longContent" {...itemLayout}>
                        <Switch checked={longContent} onChange={longContent => this.setState({ longContent })} />
                    </Form.Item>
                    <Form.Item label="withAction" {...itemLayout}>
                        <Switch checked={withAction} onChange={withAction => this.setState({ withAction })} />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Notice {...props}>
                        {longContent ? new Array(20).fill('This is a long notice;').join(' ') : 'This is a notice'}
                    </Notice>
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>普通使用</summary>

```jsx
const { StyleType } = Notice;
const layout = { style: { marginBottom: 8 } };
const Demo = () => (
    <div>
        {StyleType.map(styleType => (
            <Notice
                key={styleType}
                styleType={styleType}
                onClose={e => {
                    console.log('closed', styleType);
                }}
                {...layout}
            >
                Notice content
            </Notice>
        ))}
    </div>
);
```

</details>

<details>
<summary>自定义是否可关闭、自定义图标、自定义操作</summary>

```jsx
const layout = { style: { marginBottom: 8 } };

class Demo extends React.Component {
    render() {
        return (
            <div>
                <Notice closable={false} {...layout}>
                    Notice content
                </Notice>
                <Notice icon={null} {...layout}>
                    Notice content
                </Notice>
                <Notice icon={false} {...layout}>
                    Notice content
                </Notice>
                <Notice icon="loading" {...layout}>
                    Notice content
                </Notice>
                <Notice icon={<Icon type="loading" spin />} {...layout}>
                    Notice content
                </Notice>
                <Notice action={<Icon type="loading" onClick={e => console.log(e)} />} {...layout}>
                    Notice content
                </Notice>
                <Notice action={<Icon type="loading" onClick={e => console.log(e)} />} {...layout}>
                    Notice content Notice content Notice content Notice content Notice content Notice content Notice
                    content Notice content Notice content Notice content Notice content Notice content
                </Notice>
            </div>
        );
    }
}
```

</details>

<!-- AUTO_END: demos -->

<!-- MANUAL_START: best-practices -->
## 最佳实践

1. **根据语义选择 styleType**：成功用 success、警告用 warning、错误用 error
2. **重要提示设置 closable={false}**：不可忽略的提示禁止关闭
3. **Modal 中常配合 Notice**：在弹窗中使用 Notice 提供额外提示信息
4. **区分 Notice 和 Message**：Notice 是嵌入式静态提示，Message 是全局弹出式提示

### 常见场景

#### 页面顶部提示

```jsx
<Notice styleType="warning" closable={false}>
  当前地域资源配额即将用完，请及时清理或申请扩容。
</Notice>
```

#### Modal 中的提示

```jsx
<Modal visible={visible} title="删除资源" onClose={handleClose}>
  <Notice styleType="error" closable={false}>
    删除操作不可撤销，请谨慎操作。
  </Notice>
  <Modal.Content>
    确定要删除该资源吗？
  </Modal.Content>
</Modal>
```

#### 带操作的提示

```jsx
<Notice
  styleType="warning"
  action={<Button size="sm" onClick={handleRenew}>立即续费</Button>}
>
  您的资源将于 3 天后到期
</Notice>
```
<!-- MANUAL_END: best-practices -->

<!-- MANUAL_START: faq -->
## 常见问题

### Q: Notice 和 Message 的区别？

A: Notice 是嵌入在页面中的静态提示组件，不会自动消失；Message 是全局弹出的消息提示，会自动消失。

### Q: 如何隐藏前置图标？

A: 将 `icon` 设为 `null` 或 `false`：`<Notice icon={null}>内容</Notice>`。
<!-- MANUAL_END: faq -->

<!-- MANUAL_START: critical -->
## 注意事项

_（待补充）_
<!-- MANUAL_END: critical -->
