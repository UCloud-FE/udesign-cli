---
name: cpn-basic-modal
description: 帮助 AI 正确使用 UDesign Modal 组件（弹窗组件，纯受控组件，显示隐藏通过 visible 控制）。当需要使用 Modal 时加载此技能。
---

# 使用 Modal 组件

<!-- MANUAL_START: overview -->
## 技能概述

弹窗组件，纯受控组件，显示隐藏通过 visible 控制
提供 jsx 使用和命令式调用
<b style="color: red;">如果想要命令式调用需要注意确保理解命令式调用的风险再去使用</b>
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { Modal } from '@ucloud-fe/react-components';
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
                <Button onClick={() => Modal.alert({ mask: true }, <Modal.Content>This is a modal</Modal.Content>)}>
                    mask=true
                </Button>
                <Button onClick={() => Modal.alert({ mask: false }, <Modal.Content>This is a modal</Modal.Content>)}>
                    mask=false
                </Button>
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
| children | `unknown` | - | ✅ |  |
| title | `unknown` | - | - | 头部内容 |
| footer | `unknown` | - | - | 底部内容 |
| visible | `unknown` | - | - | 显示与否 |
| size | `unknown` | `'md'` | - | 弹窗尺寸 |
| zIndex | `unknown` | `1010` | - | 弹窗的z-index |
| closable | `unknown` | `true` | - | 是否有关闭按钮 |
| mask | `unknown` | `true` | - | 是否有遮罩 |
| maskClosable | `unknown` | - | - | 是否可以点击遮罩关闭 |
| keyboard | `unknown` | - | - | 是否可以esc关闭 |
| onClose | `unknown` | - | - | 点击关闭按钮、默认取消按钮、遮罩进行关闭时的回调 |
| onOk | `unknown` | - | - | 点击默认的确认按钮时的回调 |
| okButtonProps | `unknown` | - | - | 默认展示的确定按钮的自定义 props |
| cancelButtonProps | `unknown` | - | - | 默认展示的取消按钮的自定义 props |
| afterClose | `unknown` | - | - | 关闭后的回调 |
| destroyOnClose | `unknown` | - | - | 关闭后是否自动销毁 |
| maskAnimation | `unknown` | `'fade'` | - | 遮罩层的动画 |
| animation | `unknown` | `'fade'` | - | 弹窗的动画 |
| className | `unknown` | - | - | 弹窗部分的类名 |
| wrapClassName | `unknown` | - | - | 弹窗包裹容器的类名 |
| customStyle | `unknown` | - | - | 自定义预设部分样式 |
| style | `unknown` | - | - | 弹窗的样式 |
| bodyStyle | `unknown` | - | - | 弹窗的内容部分的样式 |
| maskStyle | `unknown` | - | - | 遮罩层的样式 |
| locale | `unknown` | - | - |  |
| notice | `unknown` | - | - | 传入 node 显示提示框或使用 Notice 组件的 props 来自定义提示 |
<!-- AUTO_END: props-table -->


<!-- AUTO_START: tokens -->
### Design Tokens

| Token 名称 | 分类 | 默认值 | 暗色值 | 说明 |
|------------|------|--------|--------|------|
| `T_MODAL_COLOR_LAYER_DEFAULT` | color | `rgba(0,0,0,0.5)` | `rgba(0,0,0,0.5)` | - |
| `T_MODAL_SHADOW_DEFAULT` | shadow | `0 3px 6px -4px rgba(0,0,0,0.12),0 6px 16px 0 rgba(0,0,0,0.08),0 9px 28px 8px rgba(0,0,0,0.05)` | `0 3px 6px -4px rgba(0,0,0,0.32),0 6px 16px 0 rgba(0,0,0,0.28),0 9px 28px 8px rgba(0,0,0,0.25)` | - |
<!-- AUTO_END: tokens -->

<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>演示</summary>

```jsx
const { Size } = Modal;
const NoticeOptions = ['none', 'node', 'custom'];
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 'md',
            visible: false,
            zIndex: 100,
            closable: true,
            mask: true,
            maskClosable: true,
            keyboard: true,
            destroyOnClose: false,
            notice: 'none'
        };
    }
    toggle(visible) {
        this.setState({
            visible: visible == null ? !this.state.visible : visible
        });
    }
    open() {
        this.toggle(true);
    }
    close() {
        this.toggle(false);
    }
    render() {
        const { size, visible, zIndex, closable, mask, maskClosable, keyboard, destroyOnClose, notice } = this.state;
        const itemLayout = {
            labelCol: {
                span: 3
            },
            controllerCol: {
                span: 9
            }
        };
        const props = {
            ...this.state
        };
        props.notice =
            notice === 'node' ? (
                <span>Just a notice</span>
            ) : notice === 'custom' ? (
                { styleType: 'error', children: 'An Error notice', closable: false }
            ) : null;
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
                    <Form.Item label="notice" {...itemLayout}>
                        <Radio.Group
                            options={NoticeOptions.map(notice => ({ value: notice }))}
                            value={notice}
                            onChange={notice => this.setState({ notice })}
                        />
                    </Form.Item>
                    <Form.Item label="visible" {...itemLayout}>
                        <Switch checked={visible} onChange={visible => this.setState({ visible })} />
                    </Form.Item>
                    <Form.Item label="closable" {...itemLayout}>
                        <Switch checked={closable} onChange={closable => this.setState({ closable })} />
                    </Form.Item>
                    <Form.Item label="mask" {...itemLayout}>
                        <Switch checked={mask} onChange={mask => this.setState({ mask })} />
                    </Form.Item>
                    <Form.Item label="maskClosable" {...itemLayout}>
                        <Switch checked={maskClosable} onChange={maskClosable => this.setState({ maskClosable })} />
                    </Form.Item>
                    <Form.Item label="keyboard" {...itemLayout}>
                        <Switch checked={keyboard} onChange={keyboard => this.setState({ keyboard })} />
                    </Form.Item>
                    <Form.Item label="destroyOnClose" {...itemLayout}>
                        <Switch
                            checked={destroyOnClose}
                            onChange={destroyOnClose => this.setState({ destroyOnClose })}
                        />
                    </Form.Item>
                    <Form.Item label="zIndex" {...itemLayout}>
                        <NumberInput value={zIndex} onNumberChange={zIndex => this.setState({ zIndex })} />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Button onClick={() => this.toggle()}>Toggle Visible</Button>
                    <Modal
                        {...props}
                        onClose={() => this.close()}
                        afterClose={() => console.log('afterClose')}
                        onOk={() => console.log('onOk')}
                        title="this is title"
                    >
                        <Modal.Content>this is content</Modal.Content>
                    </Modal>
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>method - 简单的命令式打开弹窗 <b style="color:red;">慎用</b></summary>

```jsx
class Demo extends React.Component {
    open() {
        this.modal = Modal.open(
            {
                title: '测试',
                onClose: () => console.log('close'),
                onOk: () => console.log('ok')
            },
            <Modal.Content>
                <div style={{ height: '300px' }}>
                    <Button onClick={() => this.update()}>测试</Button>
                </div>
            </Modal.Content>
        );
    }
    update() {
        if (!this.modal) return;
        this.modal.update({
            title: `测试 - ${Math.random()}`,
            size: ['sm', 'md', 'lg'][(Math.random() * 3) | 0]
        });
    }
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Button onClick={() => this.open()}>open</Button>
                </div>
                <Button
                    onClick={() =>
                        Modal.alert(
                            {
                                title: 'this is alert',
                                onClose: () => console.log('close'),
                                onOk: () => console.log('ok')
                            },
                            <Modal.Content>this is content</Modal.Content>
                        )
                    }
                >
                    alert
                </Button>
                <Button
                    onClick={() =>
                        Modal.confirm(
                            {
                                title: 'this is confirm',
                                onClose: () => console.log('close'),
                                onOk: () => console.log('ok')
                            },
                            <Modal.Content>this is content</Modal.Content>
                        )
                    }
                >
                    confirm
                </Button>
                <Button
                    onClick={() =>
                        Modal.alert(
                            {
                                title: 'this is promise alert',
                                onClose: () =>
                                    new Promise(resolve => {
                                        setTimeout(() => {
                                            resolve();
                                        }, 3000);
                                    }),
                                onOk: () =>
                                    new Promise(resolve => {
                                        setTimeout(() => {
                                            resolve();
                                        }, 3000);
                                    })
                            },
                            <Modal.Content>this is content</Modal.Content>
                        )
                    }
                >
                    promise alert
                </Button>
                <Button
                    onClick={() =>
                        Modal.confirm(
                            {
                                title: 'this is promise confirm',
                                onClose: () =>
                                    new Promise(resolve => {
                                        setTimeout(() => {
                                            resolve();
                                        }, 3000);
                                    }),
                                onOk: () =>
                                    new Promise(resolve => {
                                        setTimeout(() => {
                                            resolve();
                                        }, 3000);
                                    })
                            },
                            <Modal.Content>This is a modal</Modal.Content>
                        )
                    }
                >
                    promise confirm
                </Button>
                <Button
                    onClick={() =>
                        Modal.open(
                            {
                                title: 'this is promise confirm',
                                onClose: () =>
                                    new Promise(resolve => {
                                        setTimeout(() => {
                                            resolve();
                                        }, 3000);
                                    }),
                                onOk: () =>
                                    new Promise(resolve => {
                                        setTimeout(() => {
                                            resolve();
                                        }, 3000);
                                    })
                            },
                            <Modal.Content>This is a modal</Modal.Content>
                        )
                    }
                >
                    promise open
                </Button>
            </div>
        );
    }
}
```

</details>

<details>
<summary>openModal - 命令式调用打开整个弹窗 <b style="color:red;">慎用</b></summary>

```jsx
class CreateModal extends React.Component {
    confirm() {
        this.props.onEnd('confirm');
    }
    cancel() {
        this.props.onEnd('cancel');
    }
    render() {
        console.log(this.props);
        return (
            <Modal
                visible
                footer={
                    <div>
                        <Button styleType="primary" onClick={() => this.confirm()}>
                            确认创建
                        </Button>
                        <Button onClick={() => this.cancel()}>取消</Button>
                    </div>
                }
                onClose={this.props.onEnd}
            >
                <Modal.Content>This is a modal</Modal.Content>
            </Modal>
        );
    }
}
CreateModal.propTypes = {
    onEnd: PropTypes.func.isRequired
};
class Demo extends React.Component {
    create() {
        this.modal = Modal.openModal(<CreateModal onEnd={result => this.onEnd(result)} />);
    }
    onEnd(result) {
        if (!this.modal) return;
        console.log(result);
        this.modal.destroy();
    }
    render() {
        return (
            <div>
                <Button onClick={() => this.create()}>openModal</Button>
            </div>
        );
    }
}
```

</details>

<details>
<summary>title/footer - 自定义 title/footer 内容</summary>

```jsx
class Demo extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            visible: false
        };
    }
    render() {
        const { visible } = this.state;
        return (
            <div>
                <Button
                    onClick={() =>
                        this.setState({
                            visible: !visible
                        })
                    }
                >
                    click
                </Button>
                <Modal
                    visible={visible}
                    onClose={() =>
                        this.setState({
                            visible: false
                        })
                    }
                    title="This is title"
                    footer="This is footer"
                >
                    <Modal.Content>This is a modal</Modal.Content>
                </Modal>
            </div>
        );
    }
}
```

</details>

<details>
<summary>size - 预设尺寸</summary>

```jsx
const { Size } = Modal;
class Demo extends React.Component {
    render() {
        return (
            <div>
                {Size.map(size => (
                    <Button
                        key={size}
                        onClick={() => Modal.alert({ size }, <Modal.Content>This is a modal</Modal.Content>)}
                    >
                        {size}
                    </Button>
                ))}
            </div>
        );
    }
}
```

</details>

<details>
<summary>closable - 关闭按钮</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <Button onClick={() => Modal.alert({ closable: true }, <Modal.Content>This is a modal</Modal.Content>)}>
                    closable=true
                </Button>
                <Button
                    onClick={() => Modal.alert({ closable: false }, <Modal.Content>This is a modal</Modal.Content>)}
                >
                    closable=false
                </Button>
            </div>
        );
    }
}
```

</details>

<details>
<summary>mask - 是否有遮罩层</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <Button onClick={() => Modal.alert({ mask: true }, <Modal.Content>This is a modal</Modal.Content>)}>
                    mask=true
                </Button>
                <Button onClick={() => Modal.alert({ mask: false }, <Modal.Content>This is a modal</Modal.Content>)}>
                    mask=false
                </Button>
            </div>
        );
    }
}
```

</details>

<details>
<summary>buttonProps - 自定义按钮属性</summary>

```jsx
const Demo = () => {
    const [visible, setVisible] = React.useState(false);
    return (
        <div>
            <Button onClick={() => setVisible(true)}>open</Button>
            <Modal
                visible={visible}
                onClose={() => setVisible(false)}
                okButtonProps={{ icon: 'arrow-left' }}
                cancelButtonProps={{ disabled: true }}
            >
                <Modal.Content maxHeight="500px">
                    <div style={{ height: '1000px', background: 'gray' }}>内容区域</div>
                </Modal.Content>
            </Modal>
        </div>
    );
};
```

</details>

<details>
<summary>maskClosable - 是否可通过点击遮罩层关闭</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <Button
                    onClick={() => Modal.alert({ maskClosable: true }, <Modal.Content>This is a modal</Modal.Content>)}
                >
                    maskClosable=true
                </Button>
                <Button
                    onClick={() => Modal.alert({ maskClosable: false }, <Modal.Content>This is a modal</Modal.Content>)}
                >
                    maskClosable=false
                </Button>
            </div>
        );
    }
}
```

</details>

<details>
<summary>keyboard - 是否可通过键盘关闭</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <Button onClick={() => Modal.alert({ keyboard: true }, <Modal.Content>This is a modal</Modal.Content>)}>
                    keyboard=true
                </Button>
                <Button
                    onClick={() => Modal.alert({ keyboard: false }, <Modal.Content>This is a modal</Modal.Content>)}
                >
                    keyboard=false
                </Button>
            </div>
        );
    }
}
```

</details>

<details>
<summary>destroyOnClose - 关闭后是否直接销毁</summary>

```jsx
class Demo extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            visible: false
        };
    }
    render() {
        const { visible } = this.state;
        return (
            <div>
                <Button
                    onClick={() =>
                        this.setState({
                            visible: !visible
                        })
                    }
                >
                    click
                </Button>
                <Modal
                    visible={visible}
                    onClose={() =>
                        this.setState({
                            visible: false
                        })
                    }
                    destroyOnClose
                >
                    <Modal.Content>This is a modal</Modal.Content>
                </Modal>
            </div>
        );
    }
}
```

</details>

<details>
<summary>notice - 弹窗中的提示</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <Button
                    onClick={() =>
                        Modal.alert(
                            {
                                notice: (
                                    <Link href="https://google.com" target="_blank">
                                        Google
                                    </Link>
                                )
                            },
                            <Modal.Content>This is a modal</Modal.Content>
                        )
                    }
                >
                    Node Notice
                </Button>
                <Button
                    onClick={() =>
                        Modal.alert(
                            {
                                notice: {
                                    styleType: 'error',
                                    closable: false,
                                    children: (
                                        <Link href="https://google.com" target="_blank">
                                            Google
                                        </Link>
                                    )
                                }
                            },
                            <Modal.Content>This is a modal</Modal.Content>
                        )
                    }
                >
                    Custom Notice
                </Button>
            </div>
        );
    }
}
```

</details>

<details>
<summary>自定义 className</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <Button
                    onClick={() =>
                        Modal.alert(
                            { className: 'test_cls', wrapClassName: 'test_cls_wrap' },
                            <Modal.Content>This is a modal</Modal.Content>
                        )
                    }
                >
                    custom className
                </Button>
            </div>
        );
    }
}
```

</details>

<details>
<summary>自定义样式</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <Button
                    onClick={() =>
                        Modal.alert(
                            {
                                style: { background: 'red' },
                                bodyStyle: {
                                    background: 'yellow'
                                },
                                maskStyle: {
                                    background: 'blue'
                                }
                            },
                            <Modal.Content>This is a modal</Modal.Content>
                        )
                    }
                >
                    custom style
                </Button>
            </div>
        );
    }
}
```

</details>

<details>
<summary>popupContainer - 弹出层容器</summary>

```jsx
const tests = [
    () => (
        <Popover
            forwardPopupContainer
            popup={<div style={{ background: '#ccc', width: 300, height: 300, padding: 20 }}>This is the popup</div>}
        >
            <div style={{ background: '#e1e6f0', height: 50, padding: 10 }}>This is the content</div>
        </Popover>
    ),
    () => <Select options={new Array(100).fill(null).map((v, i) => ({ value: i, label: `option-${i}` }))} />,
    () => <DatePicker />,
    () => <DatePicker type="month" />,
    record => (
        <Table.ActionList
            exposeCount={1}
            actionList={new Array(10).fill(null).map((v, i) => ({
                label: `Action ${i}`,
                onClick: e => console.log('action', i, record, e)
            }))}
        />
    )
];
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <h3>Modal 会拦截外层的 getPopupContainer</h3>
                <div className="demo-wrap">
                    <Card>
                        {tests.map((test, i) => (
                            <Button key={i} onClick={() => Modal.alert({ title: 'test' }, test())}>
                                Test {i}
                            </Button>
                        ))}
                    </Card>
                </div>
                <div className="demo-wrap">
                    <Card>
                        {tests.map((test, i) => (
                            <div key={i}>
                                <Button onClick={() => this.setState({ [`visible-${i}`]: true })}>Test {i}</Button>
                                <Modal
                                    visible={this.state[`visible-${i}`]}
                                    onClose={() => this.setState({ [`visible-${i}`]: false })}
                                >
                                    <Modal.Content>{test()}</Modal.Content>
                                </Modal>
                            </div>
                        ))}
                    </Card>
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
