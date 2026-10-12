---
name: cpn-basic-drawer
description: 帮助 AI 正确使用 UDesign Drawer 组件（抽屉组件）。当需要使用 Drawer 时加载此技能。
---


# 使用 Drawer 组件

<!-- MANUAL_START: overview -->
## 技能概述

这是 Drawer 抽屉组件
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { Drawer } from '@ucloud-fe/react-components';
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
        this.state = {};
    }
    toggle(key, visible) {
        key = `visible${key}`;
        this.setState({
            [key]: visible == null ? !this.state[key] : visible
        });
    }
    open(key) {
        this.toggle(key, true);
    }
    close(key) {
        this.toggle(key, false);
    }
    render() {
        const { visible1, visible2, visible3 } = this.state;

        return (
            <div>
                <div className="demo-wrap">
                    <Button onClick={() => this.toggle('1')}>Toggle</Button>
                    <Drawer visible={visible1} onClose={() => this.close('1')} width="70%">
                        <Button onClick={() => this.toggle('2')}>Toggle</Button>
                        <Drawer visible={visible2} onClose={() => this.close('2')} width="50%">
                            <Button onClick={() => this.toggle('3')}>Toggle</Button>
                            <Drawer visible={visible3} onClose={() => this.close('3')} width="25%">
                                content
                            </Drawer>
                        </Drawer>
                    </Drawer>
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
| children | `unknown` | - | ✅ |  |
| visible | `unknown` | `false` | - | 是否显示，controlled |
| mask | `unknown` | `true` | - | 是否有遮罩 |
| maskClosable | `unknown` | `true` | - | 是否可以点击遮罩关闭 |
| keyboard | `unknown` | `false` | - | 是否可以esc关闭 |
| onClose | `unknown` | `() => {}` | - | 点击关闭按钮、遮罩进行关闭时的回调 |
| destroyOnClose | `unknown` | - | - | 关闭后是否自动销毁 |
| placement | `unknown` | `'right'` | - | 弹出位置 |
| width | `unknown` | - | - | 抽屉的宽度，left right可用 |
| height | `unknown` | - | - | 抽屉的高度，top bottom可用 |
| getContainer | `unknown` | - | - | 设置抽屉容器 |
| zIndex | `unknown` | `1010` | - | 弹出层的z-index |
| closeHandler | `unknown` | - | - | 传入 false/null 隐藏关闭控件，或自定义控件 |
| level | `unknown` | `null` | - |  |
<!-- AUTO_END: props-table -->


<!-- AUTO_START: tokens -->
### Design Tokens

| Token 名称 | 分类 | 默认值 | 暗色值 | 说明 |
|------------|------|--------|--------|------|
| `T_DRAWER_CLOSE_BG_COLOR_DEFAULT` | color | `rgba(0,0,0,0.3)` | `rgba(0,0,0,0.3)` | - |
| `T_DRAWER_CLOSE_BG_COLOR_HOVER` | color | `rgba(0,0,0,0.5)` | `rgba(0,0,0,0.5)` | - |
| `T_DRAWER_CLOSE_BG_SIZE_DEFAULT` | dimension | `32px` | `32px` | - |
| `T_DRAWER_CLOSE_BG_SIZE_HOVER` | dimension | `32px` | `32px` | - |
| `T_DRAWER_CLOSE_ICON_COLOR_DEFAULT` | color | `#ffffff` | `#141A2B` | - |
| `T_DRAWER_CLOSE_ICON_COLOR_HOVER` | color | `#ffffff` | `#141A2B` | - |
| `T_DRAWER_CLOSE_ICON_SIZE_DEFAULT` | dimension | `14px` | `14px` | - |
| `T_DRAWER_CLOSE_ICON_SIZE_HOVER` | dimension | `14px` | `14px` | - |
| `T_DRAWER_CONTENT_BG_COLOR` | other | `linear-gradient(180deg, #ebedf5 0%, #ebedf5 100%)` | `linear-gradient(180deg, #1a2132 0%, #1a2132 100%)` | - |
| `T_DRAWER_CONTENT_PADDING` | other | `24px` | `24px` | - |
| `T_DRAWER_HEADER_BG_COLOR_DEFAULT` | color | `#ffffff` | `#141A2B` | - |
| `T_DRAWER_HEADER_BG_SHADOW_DEFAULT` | shadow | `0 1px 0 0 #d2d6ea` | `0 1px 0 0 #2B3555` | - |
| `T_DRAWER_HEADER_PADDING_HORIZONAL` | spacing | `24px` | `24px` | - |
| `T_DRAWER_HEADER_PADDING_VERTICAL` | spacing | `16px` | `16px` | - |
| `T_DRAWER_HEADER_SIZE_DEFAULT` | dimension | `14px` | `14px` | - |
| `T_DRAWER_HEADER_TITLE_COLOR_DEFAULT` | color | `#0a1633` | `#F7F9FF` | - |
| `T_DRAWER_MASK_COLOR` | color | `rgba(0,0,0,0.5)` | `rgba(0,0,0,0.5)` | - |
| `T_DRAWER_RESIZER_BG_DEFAULT` | other | `rgba(0,0,0,0.3)` | `rgba(0,0,0,0.5)` | - |
| `T_DRAWER_RESIZER_BG_HOVER` | other | `rgba(0,0,0,0.5)` | `rgba(0,0,0,0.5)` | - |
| `T_DRAWER_SHADOW_BOTTOM` | shadow | `0 46px 24px -35px rgba(0,0,0,0.05),0 25px 10px -16px rgba(0,0,0,0.05),0 10px 6px -6px rgba(0,0,0,0.05)` | `0 46px 24px -35px rgba(0,0,0,0.05),0 25px 10px -16px rgba(0,0,0,0.05),0 10px 6px -6px rgba(0,0,0,0.05)` | - |
| `T_DRAWER_SHADOW_LEFT` | shadow | `-46px 0 24px -35px rgba(0,0,0,0.05),-25px 0 10px -16px rgba(0,0,0,0.05),-10px 0 6px -6px rgba(0,0,0,0.05)` | `-46px 0 24px -35px rgba(0,0,0,0.05),-25px 0 10px -16px rgba(0,0,0,0.05),-10px 0 6px -6px rgba(0,0,0,0.05)` | - |
| `T_DRAWER_SHADOW_RIGHT` | shadow | `46px 0 24px -35px rgba(0,0,0,0.05),25px 0 10px -16px rgba(0,0,0,0.05),10px 0 6px -6px rgba(0,0,0,0.05)` | `46px 0 24px -35px rgba(0,0,0,0.05),25px 0 10px -16px rgba(0,0,0,0.05),10px 0 6px -6px rgba(0,0,0,0.05)` | - |
| `T_DRAWER_SHADOW_TOP` | shadow | `0 -46px 24px -35px rgba(0,0,0,0.05),0 -25px 10px -16px rgba(0,0,0,0.05),0 -10px 6px -6px rgba(0,0,0,0.05)` | `0 -46px 24px -35px rgba(0,0,0,0.05),0 -25px 10px -16px rgba(0,0,0,0.05),0 -10px 6px -6px rgba(0,0,0,0.05)` | - |
<!-- AUTO_END: tokens -->

<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>普通使用</summary>

```jsx
const { Placement, defaultProps } = Drawer;
class Container extends React.Component {
    constructor(props) {
        super(props);
        console.log('new container');
    }
    componentWillUnmount() {
        console.log('ummount');
    }
    render() {
        return <div {...this.props} />;
    }
}

class Demo extends React.Component {
    constructor(props) {
        super(props);
        const { visible, mask, maskClosable, keyboard, placement, zIndex } = defaultProps;
        this.state = {
            visible,
            mask,
            maskClosable,
            keyboard,
            placement,
            zIndex,
            closeHandler: true
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
        const { visible, zIndex, mask, maskClosable, keyboard, destroyOnClose, placement, closeHandler } = this.state;
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
                    <Form.Item label="placement" {...itemLayout}>
                        <Radio.Group
                            value={placement}
                            onChange={placement => this.setState({ placement })}
                            options={Placement.map(placement => ({
                                value: placement
                            }))}
                        />
                    </Form.Item>
                    <Form.Item label="visible" {...itemLayout}>
                        <Switch checked={visible} onChange={visible => this.setState({ visible })} />
                    </Form.Item>
                    <Form.Item label="mask" {...itemLayout}>
                        <Switch checked={mask} onChange={mask => this.setState({ mask })} />
                    </Form.Item>
                    <Form.Item label="maskClosable" {...itemLayout}>
                        <Switch checked={maskClosable} onChange={maskClosable => this.setState({ maskClosable })} />
                    </Form.Item>
                    <Form.Item label="closeHandler" {...itemLayout}>
                        <Switch checked={closeHandler} onChange={closeHandler => this.setState({ closeHandler })} />
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
                    <Button onClick={() => this.toggle()}>Toggle</Button>
                    <Drawer
                        {...(placement === 'left' || placement === 'right' ? { width: 200 } : { height: 200 })}
                        {...this.state}
                        closeHandler={closeHandler ? undefined : false}
                        onClose={() => this.close()}
                    >
                        <Container>content</Container>
                    </Drawer>
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>destroyOnClose - 关闭时是否销毁</summary>

```jsx
class Container extends React.Component {
    constructor(props) {
        super(props);
        console.log('new container');
    }
    componentWillUnmount() {
        console.log('ummount');
    }
    render() {
        return <div {...this.props} />;
    }
}
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
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
        const { visible } = this.state;

        return (
            <div>
                <div className="demo-wrap">
                    <Button onClick={() => this.toggle()}>Toggle</Button>
                    <Drawer
                        visible={visible}
                        onClose={() => this.close()}
                        width="30%"
                        destroyOnClose
                        keyboard
                        maskClosable
                    >
                        <Container>content</Container>
                    </Drawer>
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>closeHandler - 自定义关闭控件</summary>

```jsx
class Container extends React.Component {
    constructor(props) {
        super(props);
        console.log('new container');
    }
    componentWillUnmount() {
        console.log('ummount');
    }
    render() {
        return <div {...this.props} />;
    }
}
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
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
        const { visible } = this.state;

        return (
            <div>
                <div className="demo-wrap">
                    <Button onClick={() => this.toggle()}>Toggle</Button>
                    <Drawer
                        visible={visible}
                        onClose={() => this.close()}
                        width="30%"
                        destroyOnClose
                        closeHandler={false}
                        keyboard
                        maskClosable
                    >
                        <Container>content</Container>
                    </Drawer>
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>getContainer - 弹出层容器</summary>

```jsx
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.saveContainer = container => (this.container = container);
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
        const { visible } = this.state;

        return (
            <div>
                <div className="demo-wrap">
                    <div
                        ref={this.saveContainer}
                        style={{
                            width: 300,
                            height: 300,
                            position: 'relative',
                            border: '1px solid #ccc',
                            overflow: 'hidden'
                        }}
                    />
                    <Button onClick={() => this.toggle()}>Toggle</Button>
                    <Drawer
                        visible={visible}
                        onClose={() => this.close()}
                        width="30%"
                        keyboard
                        maskClosable
                        getContainer={() => this.container}
                    >
                        content
                    </Drawer>
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>placement - 位置</summary>

```jsx
const { Placement } = Drawer;
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    toggle(key, visible) {
        this.setState({
            [key]: visible == null ? !this.state[key] : visible
        });
    }
    open(key) {
        this.toggle(key, true);
    }
    close(key) {
        this.toggle(key, false);
    }
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    {Placement.map(placement => {
                        const key = `visible_${placement}`;
                        const size =
                            placement === 'left' || placement === 'right' ? { width: '30%' } : { height: '30%' };
                        return (
                            <div key={placement}>
                                <Button onClick={() => this.toggle(key)}>Toggle {placement}</Button>
                                <Drawer
                                    visible={this.state[key]}
                                    onClose={() => this.close(key)}
                                    {...size}
                                    keyboard
                                    maskClosable
                                    placement={placement}
                                >
                                    content
                                </Drawer>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>多层嵌套</summary>

```jsx
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    toggle(key, visible) {
        key = `visible${key}`;
        this.setState({
            [key]: visible == null ? !this.state[key] : visible
        });
    }
    open(key) {
        this.toggle(key, true);
    }
    close(key) {
        this.toggle(key, false);
    }
    render() {
        const { visible1, visible2, visible3 } = this.state;

        return (
            <div>
                <div className="demo-wrap">
                    <Button onClick={() => this.toggle('1')}>Toggle</Button>
                    <Drawer visible={visible1} onClose={() => this.close('1')} width="70%">
                        <Button onClick={() => this.toggle('2')}>Toggle</Button>
                        <Drawer visible={visible2} onClose={() => this.close('2')} width="50%">
                            <Button onClick={() => this.toggle('3')}>Toggle</Button>
                            <Drawer visible={visible3} onClose={() => this.close('3')} width="25%">
                                content
                            </Drawer>
                        </Drawer>
                    </Drawer>
                </div>
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
                <h3>Drawer 会拦截外层的 getPopupContainer</h3>
                <div className="demo-wrap">
                    <Card>
                        {tests.map((test, i) => (
                            <div key={i}>
                                <Button onClick={() => this.setState({ [`visible-${i}`]: true })}>Test {i}</Button>
                                <Drawer
                                    visible={this.state[`visible-${i}`]}
                                    width="50%"
                                    onClose={() => this.setState({ [`visible-${i}`]: false })}
                                >
                                    {test()}
                                </Drawer>
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
