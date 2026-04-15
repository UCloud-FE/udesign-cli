---
name: cpn-basic-message
description: 帮助 AI 正确使用 UDesign Message 组件（用来弹出提示框）。当需要使用 Message 时加载此技能。
---

# 使用 Message 组件

<!-- MANUAL_START: overview -->
## 技能概述

Message 用来弹出提示框。
普遍会使用 method 调用的方式
有 message, success, warning, error, loading 几种不同的方法。
由于命令式调用，同样存在与命令式调用 Modal 同样的风险（具体查看 Modal 页面），但是由于 Message 一般用于展示文本信息，且定时关闭，占位较小，顾风险性相对较小，但是<b style="color:red;">如果在 Message 中传入的内容依赖上下文或添加了操作按钮记得要自行添加依赖和卸载销毁</b>
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { Message } from '@ucloud-fe/react-components';
```

> ⚠️ **全局规范 - 所有组件通用**:
> - 生成纯 JavaScript (JSX) 代码，**不要使用 TypeScript 类型注解**
> - **禁止**使用 `@alicloud/*`、`@aliyun/*`、`antd` 等外部组件库
> - 优先使用 UDesign 组件，不要用 HTML 原生标签替代
<!-- AUTO_END: import -->

<!-- AUTO_START: basic-usage -->
### 基本用法

```jsx
const Demo = () => {
    return (
        <div>
            {['message', 'loading', 'success', 'warning', 'error'].map(type => (
                <div className="demo-wrap" key={type}>
                    <Button
                        style={{ width: 150 }}
                        onClick={() =>
                            Message[type]({ title: 'this is a message' }, undefined, () => console.log('onClose'))
                        }
                    >
                        {type}
                    </Button>
                </div>
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
| closable | `unknown` | `true` | - | 是否可关闭 |
| title | `unknown` | - | - | 标题 |
| footer | `unknown` | - | - | 底栏 |
| onClose | `unknown` | - | - | 关闭回调 |
| className | `unknown` | - | - |  |
| children | `unknown` | - | - |  |
| styleType | `unknown` | `'default'` | - | 样式风格，目前只影响 Icon |
<!-- AUTO_END: props-table -->



<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>method - Message 类的方法</summary>

```jsx
const Demo = () => {
    return (
        <div>
            {['message', 'loading', 'success', 'warning', 'error'].map(type => (
                <div className="demo-wrap" key={type}>
                    <Button
                        style={{ width: 150 }}
                        onClick={() =>
                            Message[type]({ title: 'this is a message' }, undefined, () => console.log('onClose'))
                        }
                    >
                        {type}
                    </Button>
                </div>
            ))}
        </div>
    );
};
```

</details>

<details>
<summary>Message - 或者当组件使用</summary>

```jsx
const { StyleType } = Message;
const Demo = () => {
    return (
        <div>
            {StyleType.map(styleType => (
                <div key={styleType} className="demo-wrap">
                    <Message styleType={styleType} title={<div>this is a message</div>} />
                </div>
            ))}
        </div>
    );
};
```

</details>

<details>
<summary>title - 标题和内容</summary>

```jsx
const Demo = () => {
    return (
        <div>
            <div className="demo-wrap">
                <Message title="Message Title">this is a message</Message>
            </div>
            <div className="demo-wrap">
                <Message title="Message Title" />
            </div>
            <div className="demo-wrap">
                <Message>this is a message</Message>
            </div>
            <Button
                onClick={() =>
                    Message.message({ title: 'Message Title', children: 'this is a message' }, undefined, () =>
                        console.log('onClose')
                    )
                }
            >
                show message
            </Button>
            <Button
                onClick={() => Message.message({ title: 'Message Title' }, undefined, () => console.log('onClose'))}
            >
                show message
            </Button>
        </div>
    );
};
```

</details>

<details>
<summary>footer - 底栏</summary>

```jsx
const Demo = () => {
    return (
        <div>
            <div className="demo-wrap">
                <Message
                    title="Message Title"
                    footer={
                        <div style={{ display: 'flex', flexDirection: 'row', fontWeight: 600, fontSize: 14 }}>
                            <Link href="#" target="_blank" style={{ marginRight: 8, textDecoration: 'none' }}>
                                点击操作
                            </Link>
                            <Link href="#" target="_blank" style={{ textDecoration: 'none' }}>
                                点击操作
                            </Link>
                        </div>
                    }
                >
                    this is a message
                </Message>
            </div>
        </div>
    );
};
```

</details>

<details>
<summary>custom - 自定义弹出 message 内容</summary>

```jsx
const getRandomColor = () => {
    const randomNumber = () => (Math.random() * 256) | 0;
    return `rgb(${randomNumber()},${randomNumber()},${randomNumber()})`;
};
const messages = [];
let i = 0;
const Demo = () => {
    return (
        <div>
            <Button
                onClick={() => {
                    messages.push(
                        Message.popup(
                            <div
                                style={{
                                    background: '#fff',
                                    border: '1px solid #ddd',
                                    fontSize: '15px',
                                    padding: '10px',
                                    width: '200px',
                                    margin: '0 auto',
                                    marginBottom: '5px',
                                    borderRadius: '20px',
                                    textAlign: 'center',
                                    color: getRandomColor()
                                }}
                            >
                                This is the {i++} message{' '}
                            </div>,
                            null,
                            () => console.log('onClose')
                        )
                    );
                }}
            >
                show message
            </Button>
            <Button
                onClick={() => {
                    messages.length && messages.shift().destroy();
                }}
            >
                close message
            </Button>
        </div>
    );
};
```

</details>

<details>
<summary>config - 自定义 message 配置</summary>

```jsx
const Demo = () => {
    return (
        <div>
            <Button
                onClick={() =>
                    Message.config({
                        duration: 10000000,
                        top: 200
                    })
                }
            >
                change duration and top
            </Button>
            <Button
                onClick={() =>
                    Message.config({
                        duration: null,
                        top: 0
                    })
                }
            >
                change duration to null
            </Button>
            <Button
                onClick={() =>
                    Message.config({
                        duration: 3000,
                        top: 20
                    })
                }
            >
                reset config
            </Button>
            {['message', 'loading', 'success', 'warning', 'error'].map(type => (
                <div className="demo-wrap" key={type}>
                    <Button
                        style={{ width: 150 }}
                        onClick={() =>
                            Message[type]({ title: 'this is a message' }, undefined, () => console.log('onClose'))
                        }
                    >
                        {type}
                    </Button>
                </div>
            ))}
        </div>
    );
};
```

</details>

<details>
<summary>demo - 样例展示</summary>

```jsx
const methods = ['message', 'loading', 'success', 'warning', 'error'];
const messages = [
    {
        title: 'This is a very looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong message'
    },
    {
        title: 'Message Title'
    },
    {
        title: 'Message Title',
        children: 'This is a very looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong message'
    },
    {
        title: 'Message Title'
    },
    {
        title: 'Message Title',
        children: 'This is a very looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong message'
    }
];
const random = arr => {
    return arr[(Math.random() * arr.length) | 0];
};
const Demo = () => {
    return (
        <div>
            <Button
                onClick={() =>
                    Message.config({
                        duration: null
                    })
                }
            >
                change duration to null
            </Button>
            <Button
                onClick={() =>
                    Message.config({
                        duration: 4500,
                        top: 20
                    })
                }
            >
                reset config
            </Button>
            <div className="demo-wrap">
                <Button
                    style={{ width: 150 }}
                    onClick={() => {
                        Message[random(methods)](random(messages, undefined, () => console.log('onClose')));
                    }}
                >
                    A Random Message
                </Button>
            </div>
        </div>
    );
};
```

</details>

<!-- AUTO_END: demos -->

<!-- MANUAL_START: best-practices -->
## 最佳实践

1. **操作反馈优先用 Message**：轻量级的操作成功/失败反馈使用 Message，重要操作使用 Modal
2. **loading 方法要手动关闭**：`Message.loading()` 返回的关闭函数需要在操作完成后调用
3. **避免传入复杂内容**：如果需要在 Message 中传入依赖 Context 的内容，需要自行处理依赖
4. **慎用 config 全局配置**：它会影响所有后续 Message

### 常见场景

#### 操作反馈

```jsx
const handleDelete = async () => {
  try {
    await api.deleteResource(id);
    Message.success('删除成功');
  } catch (error) {
    Message.error('删除失败：' + error.message);
  }
};
```

#### 表单提交反馈

```jsx
const handleSubmit = async (values) => {
  const hide = Message.loading('提交中...');
  try {
    await api.submitForm(values);
    Message.success('提交成功');
  } catch (error) {
    Message.error('提交失败');
  } finally {
    hide();
  }
};
```
<!-- MANUAL_END: best-practices -->

<!-- MANUAL_START: faq -->
## 常见问题

### Q: Message.loading 如何关闭？

A: `Message.loading()` 返回一个关闭函数，调用即可关闭：

```jsx
const hide = Message.loading('加载中...');
// 操作完成后
hide();
```

### Q: Message 能否不自动关闭？

A: 可以，将 `duration` 设为 `null`：`Message.success('内容', null)`。
<!-- MANUAL_END: faq -->

<!-- MANUAL_START: critical -->
## 注意事项

_（待补充）_
<!-- MANUAL_END: critical -->
