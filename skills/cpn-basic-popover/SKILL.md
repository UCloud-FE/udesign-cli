---
name: cpn-basic-popover
description: 帮助 AI 正确使用 UDesign Popover 组件（组件，弹出层功能型组件）。当需要使用 Popover 时加载此技能。
---

# 使用 Popover 组件

<!-- MANUAL_START: overview -->
## 技能概述

这是 Popover 组件，弹出层功能型组件
使用弹出层时需要注意弹出层的容器，如果弹出层的容器为 overflow 容器且具有定位属性或在其内部或嵌套等情况（以下简称 overflow 容器），弹出内容会自动计算定位避开滚动或隐藏，防止被遮挡，但是某些情况下会导致定位的偏移，所以需要保证容器能够完整的显示弹出层，或者将容器设置到 overflow 容器的外部。
Popover 默认的弹出层容器为 body，可使用 getPopupContainer 来自定弹层的容器，或者使用 forwardPopupContainer 自动避开本组件库内组件的 overflow 容器（如 Card，Table 等）。
Modal、Drawer 较为特殊，会中断 forwardPopupContainer，从而避免找到上层非同 dom 级的容器
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { Popover } from '@ucloud-fe/react-components';
```

> ⚠️ **全局规范 - 所有组件通用**:
> - 生成纯 JavaScript (JSX) 代码，**不要使用 TypeScript 类型注解**
> - **禁止**使用 `@alicloud/*`、`@aliyun/*`、`antd` 等外部组件库
> - 优先使用 UDesign 组件，不要用 HTML 原生标签替代
<!-- AUTO_END: import -->

<!-- AUTO_START: basic-usage -->
### 基本用法

```jsx
const Trigger = ['hover', 'focus', 'click', 'contextMenu'];
const Popup = () => <div style={{ height: 30, border: '1px solid #ddd', background: '#fff' }}>This is a popup</div>;
const Content = props => (
    <button style={{ width: 100, height: 40, background: '#ddd', display: 'inline-block', marginLeft: 5 }} {...props} />
);
Content.propTypes = {
    children: PropTypes.node
};

const Demo = () => (
    <div>
        {Trigger.map(trigger => (
            <Popover key={'key' + trigger} trigger={[trigger]} popup={<Popup />}>
                <Content>{'' + trigger}</Content>
            </Popover>
        ))}
    </div>
);
```
<!-- AUTO_END: basic-usage -->

<!-- AUTO_START: props-table -->
### API 参数

| 属性 | 类型 | 默认值 | 必填 | 说明 |
|------|------|--------|------|------|
| visible | `unknown` | - | - | 受控，控制弹出层展示 |
| defaultVisible | `unknown` | `false` | - | 非受控，是否默认展示弹出层 |
| onVisibleChange | `unknown` | `() {}` | - | 弹出层显示隐藏时触发 |
| trigger | `unknown` | `['hover']` | - | 如何触发弹出层，focus 需要注意被包裹元素必须能触发 focus 事件，如链接、按钮、input 等 |
| alignPoint | `unknown` | - | - | 根据鼠标位置定位 |
| showAction | `unknown` | `[]` | - |  |
| hideAction | `unknown` | `[]` | - |  |
| placement | `unknown` | `'bottomLeft'` | - | 位置 |
| builtinPlacements | `unknown` | `placements` | - |  |
| align | `unknown` | - | - | 自定义定位 |
| stretch | `unknown` | - | - | 尺寸自适应，'width', 'minWidth', 'height', 'minHeight' 或混合使用 |
| popup | `unknown` | - | - | 弹出层内容 |
| popupClassName | `unknown` | `''` | - | 弹出层的类名 |
| popupStyle | `unknown` | `{}` | - | 弹出层的样式 |
| zIndex | `unknown` | - | - | 弹出层的 z-index |
| getPopupContainer | `unknown` | - | - | 自定义弹出层容器 |
| forwardPopupContainer | `unknown` | - | - | 是否使用最上层传入的安全容器，如果为 function，在没有找到安全容器时将会使用该 function 作为 getPopupContainer 的值 |
| prefixCls | `unknown` | `prefixCls` | - |  |
| children | `unknown` | - | ✅ | 需要对子元素进行定位，所以只接收一个有效 react 元素（不接收文本节点） |
| animation | `unknown` | `'fade'` | - | 动画名称，slide-up 只支持上下方向的弹窗 |
| transitionName | `unknown` | - | - |  |
| forceAlignWhenUpdate | `unknown` | - | - |  |
| forceAlignWhenScroll | `unknown` | `true` | - | 滚动时强制重新定位 |
| className | `unknown` | - | - |  |
<!-- AUTO_END: props-table -->


<!-- AUTO_START: tokens -->
### Design Tokens

| Token 名称 | 分类 | 默认值 | 暗色值 | 说明 |
|------------|------|--------|--------|------|
| `T_POPOVER_COLOR_BG_DARK` | color | `#0a1633` | `#C5CAE3` | - |
| `T_POPOVER_COLOR_BG_LIGHT` | color | `#ffffff` | `#3F4A70` | - |
| `T_POPOVER_COLOR_LINE_DARK` | color | `transparent` | `rgba(0,0,0,0)` | - |
| `T_POPOVER_COLOR_LINE_LIGHT` | color | `#d2d6ea` | `rgba(0,0,0,0)` | - |
<!-- AUTO_END: tokens -->

<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>演示</summary>

```jsx
const { formLayout, DemoWrap } = demoUtil;
const Popup = () => <div style={{ height: 30, border: '1px solid #ddd', background: '#fff' }}>This is a popup</div>;

const Demo = () => {
    const [trigger, setTrigger] = React.useState(['hover']);
    const [visible, setVisible] = React.useState(false);
    const [forceAlignWhenScroll, setForceAlignWhenScroll] = React.useState(true);

    const props = {
        trigger,
        visible,
        forceAlignWhenScroll
    };
    return (
        <div>
            <Form className="demo-form" itemProps={{ ...formLayout }}>
                <Form.Item label="trigger">
                    <Checkbox.Group
                        options={['hover', 'focus', 'click', 'contextMenu'].map(tri => ({
                            value: tri,
                            label: tri
                        }))}
                        onChange={setTrigger}
                        value={trigger}
                    />
                </Form.Item>
                <Form.Item label="visible">
                    <Switch checked={visible} onChange={setVisible} />
                </Form.Item>
                <Form.Item label="forceAlignWhenScroll">
                    <Switch checked={forceAlignWhenScroll} onChange={setForceAlignWhenScroll} />
                </Form.Item>
            </Form>
            <DemoWrap>
                <Popover {...props} popup={<Popup />} onVisibleChange={setVisible}>
                    <Input placeholder="trigger input" />
                </Popover>
            </DemoWrap>
        </div>
    );
};
```

</details>

<details>
<summary>普通使用</summary>

```jsx
const Trigger = ['hover', 'focus', 'click', 'contextMenu'];
const Popup = () => <div style={{ height: 30, border: '1px solid #ddd', background: '#fff' }}>This is a popup</div>;
const Content = props => (
    <button style={{ width: 100, height: 40, background: '#ddd', display: 'inline-block', marginLeft: 5 }} {...props} />
);
Content.propTypes = {
    children: PropTypes.node
};

const Demo = () => (
    <div>
        {Trigger.map(trigger => (
            <Popover key={'key' + trigger} trigger={[trigger]} popup={<Popup />}>
                <Content>{'' + trigger}</Content>
            </Popover>
        ))}
    </div>
);
```

</details>

<details>
<summary>animation - 动画</summary>

```jsx
const Animation = ['fade', 'zoom', 'bounce', 'slide-up'];
const Popup = () => <div style={{ height: 30, border: '1px solid #ddd', background: '#fff' }}>This is a popup</div>;
const Content = props => (
    <button style={{ width: 100, height: 40, background: '#ddd', display: 'inline-block', marginLeft: 5 }} {...props} />
);
Content.propTypes = {
    children: PropTypes.node
};

const Demo = () => (
    <div>
        {Animation.map(animation => (
            <Popover key={'key' + animation} animation={animation} popup={<Popup />}>
                <Content>{'' + animation}</Content>
            </Popover>
        ))}
    </div>
);
```

</details>

<details>
<summary>placement - 定位</summary>

```jsx
const Placement = [
    'topLeft',
    'top',
    'topRight',
    'bottomLeft',
    'bottom',
    'bottomRight',
    'leftTop',
    'left',
    'leftBottom',
    'rightTop',
    'right',
    'rightBottom'
];
const Popup = () => <div style={{ height: 30, border: '1px solid #ddd', background: '#fff' }}>This is a popup</div>;
const Content = props => (
    <button style={{ width: 100, height: 40, background: '#ddd', display: 'inline-block', margin: 5 }} {...props} />
);
Content.propTypes = {
    children: PropTypes.node
};

const Demo = () => (
    <div>
        {Placement.map(placement => (
            <Popover key={'key' + placement} placement={placement} popup={<Popup />}>
                <Content>{'' + placement}</Content>
            </Popover>
        ))}
    </div>
);
```

</details>

<details>
<summary>stretch - 尺寸自适应</summary>

```jsx
const Popup = () => <div style={{ border: '1px solid #ddd', background: '#fff', height: '100%' }}>This is a popup</div>;
const Content = props => (
    <button style={{ width: 200, height: 100, background: '#ddd', display: 'inline-block', margin: 5 }} {...props} />
);
const popupStyle = {
    border: '1px solid red',
    padding: 10,
    background: 'white',
    boxSizing: 'border-box'
};

const Demo = () => (
    <div>
        <div className="demo-wrap">
            <Popover placement="top" popup={<Popup />} popupStyle={popupStyle}>
                <Content>default</Content>
            </Popover>
        </div>
        <div className="demo-wrap">
            <Popover placement="top" popup={<Popup />} popupStyle={popupStyle} stretch={['width']}>
                <Content>width</Content>
            </Popover>
        </div>
        <div className="demo-wrap">
            <Popover placement="right" popup={<Popup />} popupStyle={popupStyle} stretch={['minHeight']}>
                <Content>minHeight</Content>
            </Popover>
        </div>
        <div className="demo-wrap">
            <Popover placement="right" popup={<Popup />} popupStyle={popupStyle} stretch={['height', 'width']}>
                <Content>height, width</Content>
            </Popover>
        </div>
    </div>
);
```

</details>

<details>
<summary>alignPoint - 鼠标位置定位</summary>

```jsx
const Popup = () => <div style={{ height: 30, border: '1px solid #ddd', background: '#fff' }}>This is a popup</div>;
const Content = props => (
    <div style={{ width: 80, height: 50, background: '#ddd', display: 'inline-block', marginLeft: 5 }} {...props} />
);
Content.propTypes = {
    children: PropTypes.node
};

class Demo extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div ref={ref => (this.container = ref)} />
                <Popover popup={<Popup />} alignPoint>
                    <Content>hover me</Content>
                </Popover>
            </div>
        );
    }
}
```

</details>

<details>
<summary>visible - 控制弹出层展示(受控)</summary>

```jsx
const Popup = () => (
    <div style={{ maxHeight: 200, border: '1px solid #ddd', background: '#fff', overflow: 'auto' }}>
        <div style={{ height: 10000, background: '#ddd' }}>This is a popup</div>
    </div>
);
const Content = props => (
    <div style={{ width: 80, height: 50, background: '#ddd', display: 'inline-block', marginLeft: 5 }} {...props} />
);
Content.propTypes = {
    children: PropTypes.node
};

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        };
    }
    render() {
        return (
            <div>
                <div ref={ref => (this.container = ref)} />
                <Popover popup={<Popup />} visible={this.state.visible}>
                    <Content>hover me</Content>
                </Popover>
                <button
                    onClick={() =>
                        this.setState({
                            visible: !this.state.visible
                        })
                    }
                >
                    toggle
                </button>
            </div>
        );
    }
}
```

</details>

<details>
<summary>forwardPopupContainer - 自动定位弹出层容器</summary>

```jsx
const Demo1 = () => (
    <Card>
        <Card.Header comment="This is the comment">
            默认容器为 body，可以显示，但滚动时由于容器和元素不在一个滚动层中，会导致偏移，体验较差
        </Card.Header>
        <Card.Action>
            <Button>This is a action button</Button>
            <Button>This is a action button</Button>
        </Card.Action>
        <Card.Content>
            <Popover
                popup={
                    <div style={{ background: '#ccc', width: 300, height: 300, padding: 20 }}>This is the popup</div>
                }
            >
                <div style={{ background: '#e1e6f0', height: 50, padding: 10 }}>This is the content</div>
            </Popover>
        </Card.Content>
        <Card.Footer>
            <Button style={{ float: 'right' }}>This is a footer button</Button>
        </Card.Footer>
    </Card>
);
const Demo2 = () => (
    <Card>
        <Card.Header comment="This is the comment">
            使用父容器作为容器，如果上层有定位容器，并再上层嵌套了滚动容器，会导致弹出层无法脱离，定位出现问题且滚动会闪烁
        </Card.Header>
        <Card.Action>
            <Button>This is a action button</Button>
            <Button>This is a action button</Button>
        </Card.Action>
        <Card.Content>
            <div style={{ position: 'relative' }}>
                <Popover
                    getPopupContainer={triggerNode => triggerNode.parentNode}
                    popup={
                        <div style={{ background: '#ccc', width: 300, height: 300, padding: 20 }}>
                            This is the popup
                        </div>
                    }
                >
                    <div style={{ background: '#e1e6f0', height: 50, padding: 10 }}>This is the content</div>
                </Popover>
            </div>
        </Card.Content>
        <Card.Footer>
            <Button style={{ float: 'right' }}>This is a footer button</Button>
        </Card.Footer>
    </Card>
);
const Demo3 = () => (
    <Card>
        <Card.Header comment="This is the comment">
            使用 forwardPopupContainer 可以比较方便的跳过组件内部的这类问题，Card、Table
            等组件内部都提供了比较安全的容器区域。
        </Card.Header>
        <Card.Action>
            <Button>This is a action button</Button>
            <Button>This is a action button</Button>
        </Card.Action>
        <Card.Content>
            <div style={{ position: 'relative' }}>
                <Popover
                    forwardPopupContainer
                    popup={
                        <div style={{ background: '#ccc', width: 300, height: 300, padding: 20 }}>
                            This is the popup
                        </div>
                    }
                >
                    <div style={{ background: '#e1e6f0', height: 50, padding: 10 }}>This is the content</div>
                </Popover>
            </div>
        </Card.Content>
        <Card.Footer>
            <Button style={{ float: 'right' }}>This is a footer button</Button>
        </Card.Footer>
    </Card>
);
const Demo4 = () => (
    <div>
        <h2>使用 function 的 forwardPopupContainer 来做容器的 fallback</h2>
        <div style={{ position: 'relative' }}>
            <Popover
                forwardPopupContainer={triggerNode => triggerNode.parentNode}
                popup={
                    <div style={{ background: '#ccc', width: 300, height: 300, padding: 20 }}>This is the popup</div>
                }
            >
                <div style={{ background: '#e1e6f0', height: 50, padding: 10 }}>This is the content</div>
            </Popover>
        </div>
    </div>
);

const Demo = () => (
    <div>
        <div className="demo-wrap">
            <Demo1 />
        </div>
        <div className="demo-wrap">
            <Demo2 />
        </div>
        <div className="demo-wrap">
            <Demo3 />
        </div>
        <div className="demo-wrap">
            <Demo4 />
        </div>
    </div>
);
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
