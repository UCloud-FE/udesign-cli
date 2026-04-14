---
name: cpn-basic-tabs
description: 帮助 AI 正确使用 UDesign Tabs 组件（所有的 pane 必须传入唯一 key）。当需要使用 Tabs 时加载此技能。
---

# 使用 Tabs 组件

<!-- MANUAL_START: overview -->
## 技能概述

所有的 pane 必须传入唯一 key
支持键盘切换 tab
tab 数量多时会自动出现滚动按钮
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { Tabs } from '@ucloud-fe/react-components';
```

> ⚠️ **全局规范 - 所有组件通用**:
> - 生成纯 JavaScript (JSX) 代码，**不要使用 TypeScript 类型注解**
> - **禁止**使用 `@alicloud/*`、`@aliyun/*`、`antd` 等外部组件库
> - 优先使用 UDesign 组件，不要用 HTML 原生标签替代
<!-- AUTO_END: import -->

<!-- AUTO_START: basic-usage -->
### 基本用法

```jsx
const { TabBarPositions } = Tabs;
const Demo = () => {
    return (
        <div>
            {TabBarPositions.map(position => (
                <div className="demo-wrap" key={position}>
                    <Tabs tabBarPosition={position}>
                        {[1, 2, 3].map(i => (
                            <Tabs.Pane key={i} tab={`tab ${i}`} style={{ padding: 16 }}>
                                Pane {i}
                            </Tabs.Pane>
                        ))}
                    </Tabs>
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
| activeKey | `string` | - | - | 当前激活的 tab key，受控 |
| defaultActiveKey | `string` | - | - | 默认激活的 tab key，非受控 |
| onChange | `(activeKey: string) => void` | - | - | tab 修改时的回调 |
| destroyInactiveTabPane | `boolean` | `false` | - | 是否销毁不展示的 tab 内容 |
| children | `any` | - | ✅ | panes |
| tabBarPosition | `any` | `'top'` | - | bar 的定位 |
| styleType | `any` | `'default'` | - | 样式风格 |
| size | `any` | `'sm'` | - | 尺寸 |
| extra | `any` | - | - | 头部插槽 |
<!-- AUTO_END: props-table -->


<!-- AUTO_START: tokens -->
### Design Tokens

| Token 名称 | 分类 | 默认值 | 暗色值 | 说明 |
|------------|------|--------|--------|------|
| `T_TABS_DEFAULT_COLOR_BG_DEFAULT` | color | `#ebedf5` | `#1a2132` | - |
| `T_TABS_DEFAULT_COLOR_BG_HOVER` | color | `#fafafc` | `#192036` | - |
| `T_TABS_DEFAULT_COLOR_LINE_HOVER` | color | `#efeff8` | `#192036` | - |
| `T_TABS_PRODUCT_COLOR_BG_HOVER` | color | `rgba(233,237,245,0.5)` | `#2F3852` | - |
| `T_TABS_PRODUCT_COLOR_LINE_ACTIVE` | color | `#dfe0f1` | `#192036` | - |
| `T_TABS_PRODUCT_COLOR_SHADOW_DEFAULT` | color | `#edf0fd` | `#262e47` | - |
| `T_TABS_PRODUCT_COLOR_SHADOW_HOVER` | color | `#dee1e9` | `#0c142a` | - |
| `T_TABS_PRODUCT_COLOR_TEXT_DEFAULT` | color | `rgba(0,0,0,0.7)` | `#C5CAE3` | - |
<!-- AUTO_END: tokens -->

<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>演示</summary>

```jsx
const { TabBarPositions, StyleTypes, Sizes } = Tabs;
class PaneContent extends React.Component {
    componentWillUnmount() {
        console.log('Will log this when destroyInactiveTabPane is true');
    }
    render() {
        return <div style={{ padding: 16 }} {...this.props} />;
    }
}

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            position: TabBarPositions[0],
            styleType: StyleTypes[0],
            size: Sizes[0],
            tabCount: 10,
            activeKey: '3',
            destroyInactiveTabPane: false,
            openExtra: false
        };
    }
    render() {
        const { position, styleType, size, tabCount, activeKey, destroyInactiveTabPane, openExtra } = this.state;
        const tabs = [];
        tabs.length = tabCount;
        tabs.fill();
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
                    <Form.Item label="position" {...itemLayout}>
                        <Radio.Group
                            value={position}
                            options={TabBarPositions.map(v => ({ value: v }))}
                            onChange={position =>
                                this.setState({
                                    position
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="styleType" {...itemLayout}>
                        <Radio.Group
                            value={styleType}
                            options={StyleTypes.map(v => ({ value: v }))}
                            onChange={styleType =>
                                this.setState({
                                    styleType
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="size" {...itemLayout}>
                        <Radio.Group
                            value={size}
                            options={Sizes.map(v => ({ value: v }))}
                            onChange={size =>
                                this.setState({
                                    size
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="destroyInactiveTabPane" {...itemLayout}>
                        <Switch
                            checked={destroyInactiveTabPane}
                            onChange={destroyInactiveTabPane =>
                                this.setState({
                                    destroyInactiveTabPane
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="extra" {...itemLayout}>
                        <Switch
                            checked={openExtra}
                            onChange={openExtra =>
                                this.setState({
                                    openExtra
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="tabCount" {...itemLayout}>
                        <NumberInput
                            min={0}
                            value={tabCount}
                            onNumberChange={tabCount => this.setState({ tabCount })}
                        />
                    </Form.Item>
                    <Form.Item label="activeKey" {...itemLayout}>
                        <NumberInput
                            min={0}
                            max={tabCount - 1}
                            value={activeKey}
                            onNumberChange={activeKey => this.setState({ activeKey: '' + activeKey })}
                        />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Tabs
                        tabBarPosition={position}
                        activeKey={activeKey}
                        destroyInactiveTabPane={destroyInactiveTabPane}
                        onChange={activeKey => {
                            console.log(activeKey);
                            this.setState({ activeKey });
                        }}
                        styleType={styleType}
                        size={size}
                        style={{ height: 300 }}
                        extra={openExtra ? <Button size={size}>操作</Button> : undefined}
                    >
                        {_.map(tabs, (tab, index) => (
                            <Tabs.Pane tab={`tab ${index}`} key={index}>
                                <PaneContent>tab content {index}</PaneContent>
                            </Tabs.Pane>
                        ))}
                    </Tabs>
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>position - 位置</summary>

```jsx
const { TabBarPositions } = Tabs;
const Demo = () => {
    return (
        <div>
            {TabBarPositions.map(position => (
                <div className="demo-wrap" key={position}>
                    <Tabs tabBarPosition={position}>
                        {[1, 2, 3].map(i => (
                            <Tabs.Pane key={i} tab={`tab ${i}`} style={{ padding: 16 }}>
                                Pane {i}
                            </Tabs.Pane>
                        ))}
                    </Tabs>
                </div>
            ))}
        </div>
    );
};
```

</details>

<details>
<summary>styleType - 样式风格</summary>

```jsx
const { StyleTypes } = Tabs;
const Demo = () => {
    return (
        <div>
            {StyleTypes.map(styleType => (
                <div className="demo-wrap" key={styleType}>
                    <Tabs styleType={styleType}>
                        {[1, 2, 3].map(i => (
                            <Tabs.Pane key={i} tab={`tab ${i}`} style={{ padding: 16 }}>
                                Pane {i}
                            </Tabs.Pane>
                        ))}
                    </Tabs>
                </div>
            ))}
        </div>
    );
};
```

</details>

<details>
<summary>destroyInactiveTabPane - 销毁不活动的 tab</summary>

```jsx
const Demo = () => {
    const tabs = [];
    tabs.length = 50;
    tabs.fill();
    return (
        <div>
            <div className="demo-wrap">
                <Tabs>
                    {tabs.map((t, i) => (
                        <Tabs.Pane key={i} tab={`tab ${i}`} style={{ padding: 16 }}>
                            Pane {i}
                        </Tabs.Pane>
                    ))}
                </Tabs>
            </div>
            <div className="demo-wrap">
                <Tabs destroyInactiveTabPane>
                    {tabs.map((t, i) => (
                        <Tabs.Pane key={i} tab={`tab ${i}`} style={{ padding: 16 }}>
                            Pane {i}
                        </Tabs.Pane>
                    ))}
                </Tabs>
            </div>
        </div>
    );
};
```

</details>

<details>
<summary>scroll - 滚动</summary>

```jsx
const Demo = () => {
    const tabs = [];
    tabs.length = 50;
    tabs.fill();
    return (
        <div>
            <div className="demo-wrap">
                <Tabs>
                    {tabs.map((t, i) => (
                        <Tabs.Pane key={i} tab={`tab ${i}`} style={{ padding: 16 }}>
                            Pane {i}
                        </Tabs.Pane>
                    ))}
                </Tabs>
            </div>
            <div className="demo-wrap">
                <Tabs tabBarPosition="left" style={{ height: 300 }}>
                    {tabs.map((t, i) => (
                        <Tabs.Pane key={i} tab={`tab ${i}`} style={{ padding: 16 }}>
                            Pane {i}
                        </Tabs.Pane>
                    ))}
                </Tabs>
            </div>
        </div>
    );
};
```

</details>

<details>
<summary>uncontrolled</summary>

```jsx
const Demo = () => {
    return (
        <div>
            <div className="demo-wrap">
                <Tabs activeKey="2">
                    {[1, 2, 3].map(i => (
                        <Tabs.Pane key={i} tab={`tab ${i}`} style={{ padding: 16 }}>
                            Pane {i}
                        </Tabs.Pane>
                    ))}
                </Tabs>
            </div>
            <div className="demo-wrap">
                <Tabs defaultActiveKey="2">
                    {[1, 2, 3].map(i => (
                        <Tabs.Pane key={i} tab={`tab ${i}`} style={{ padding: 16 }}>
                            Pane {i}
                        </Tabs.Pane>
                    ))}
                </Tabs>
            </div>
        </div>
    );
};
```

</details>

<details>
<summary>child - 嵌套</summary>

```jsx
const { TabBarPositions } = Tabs;
const Demo = () => {
    return (
        <div>
            <div className="demo-wrap">
                <Tabs>
                    {[0, 1, 2, 3].map(i => (
                        <Tabs.Pane
                            key={i}
                            tab={`tab ${i}`}
                            style={{
                                padding: 16,
                                borderWidth: '0px 1px 1px 1px',
                                borderStyle: 'solid',
                                borderColor: '#ccc'
                            }}
                        >
                            <Tabs tabBarPosition={TabBarPositions[i]}>
                                {[1, 2, 3].map(i => (
                                    <Tabs.Pane key={i} tab={`tab ${i}`} style={{ padding: 16 }}>
                                        Pane {i}
                                    </Tabs.Pane>
                                ))}
                            </Tabs>
                        </Tabs.Pane>
                    ))}
                </Tabs>
            </div>
            <div className="demo-wrap">
                <Tabs styleType="ink">
                    {[0, 1, 2, 3].map(i => (
                        <Tabs.Pane
                            key={i}
                            tab={`tab ${i}`}
                            style={{
                                padding: 16,
                                borderWidth: '0px 1px 1px 1px',
                                borderStyle: 'solid',
                                borderColor: '#ccc'
                            }}
                        >
                            <Tabs tabBarPosition={TabBarPositions[i]}>
                                {[1, 2, 3].map(i => (
                                    <Tabs.Pane key={i} tab={`tab ${i}`} style={{ padding: 16 }}>
                                        Pane {i}
                                    </Tabs.Pane>
                                ))}
                            </Tabs>
                        </Tabs.Pane>
                    ))}
                </Tabs>
            </div>
            <div className="demo-wrap">
                <Tabs>
                    {[0, 1, 2, 3].map(i => (
                        <Tabs.Pane
                            key={i}
                            tab={`tab ${i}`}
                            style={{
                                padding: 16,
                                borderWidth: '0px 1px 1px 1px',
                                borderStyle: 'solid',
                                borderColor: '#ccc'
                            }}
                        >
                            <Tabs tabBarPosition={TabBarPositions[i]} styleType="ink">
                                {[1, 2, 3].map(i => (
                                    <Tabs.Pane key={i} tab={`tab ${i}`} style={{ padding: 16 }}>
                                        Pane {i}
                                    </Tabs.Pane>
                                ))}
                            </Tabs>
                        </Tabs.Pane>
                    ))}
                </Tabs>
            </div>
        </div>
    );
};
```

</details>

<details>
<summary>边界测试</summary>

```jsx
const Lazy = React.lazy(
    () =>
        new Promise(resolve => {
            setTimeout(() => resolve({ default: () => <div>remote</div> }), 1000);
        })
);
const Demo = () => {
    return (
        <div className="demo-wrap">
            <React.Suspense fallback="loading">
                <Tabs styleType="ink" defaultActiveKey="2">
                    {[1, 2, 3].map(i => (
                        <Tabs.Pane key={i} tab={`tab ${i}`} style={{ padding: 16 }}>
                            Pane {i}
                        </Tabs.Pane>
                    ))}
                </Tabs>
                <Lazy />
            </React.Suspense>
            <Tabs styleType="ink" defaultActiveKey="2">
                {[1, 2, 3].map(i => (
                    // eslint-disable-next-line react/jsx-key
                    <Tabs.Pane tabKey={i + ''} tab={`tab ${i}`} style={{ padding: 16 }}>
                        Pane {i}
                    </Tabs.Pane>
                ))}
            </Tabs>
        </div>
    );
};
```

</details>

<details>
<summary>手动测试</summary>

```jsx
const steps = [
    { type: 'styleType', value: 'ink' },
    { type: 'paneCount', value: 3 },
    { type: 'paneCount', value: 100 },
    { type: 'activeKey', value: '40' },
    { type: 'position', value: 'left' },
    { type: 'position', value: 'bottom' },
    { type: 'activeKey', value: '1' },
    { type: 'paneCount', value: 3 },
    { type: 'paneCount', value: 100 },
    { type: 'activeKey', value: '40' },
    { type: 'position', value: 'right' }
];
const reducer = (state, action) => {
    switch (action.type) {
        case 'position': {
            return {
                ...state,
                position: action.value
            };
        }
        case 'paneCount': {
            return {
                ...state,
                paneCount: action.value
            };
        }
        case 'activeKey': {
            return {
                ...state,
                activeKey: action.value
            };
        }
        case 'styleType': {
            return {
                ...state,
                styleType: action.value
            };
        }
        default: {
            return state;
        }
    }
};
const Demo = () => {
    const [state, dispatch] = React.useReducer(reducer, {
        position: 'top',
        paneCount: 10,
        styleType: 'default',
        activeKey: '0'
    });
    const [stepIndex, setStepIndex] = React.useState(0);

    const start = React.useCallback(() => {
        const stepInfo = steps[stepIndex];
        if (!stepInfo) return;
        dispatch(stepInfo);
        setStepIndex(stepIndex + 1);
        console.log(`dispatch ${stepInfo.type}: ${stepInfo.value}`);
    }, [stepIndex]);

    const panes = new Array(state.paneCount).fill(null).map((v, i) => {
        return {
            tab: `tab - ${i}`,
            key: i + ''
        };
    });
    const props = {
        tabBarPosition: state.position,
        activeKey: state.activeKey,
        styleType: state.styleType
    };
    return (
        <div className="demo-wrap">
            <Button onClick={start} disabled={stepIndex >= steps.length}>
                Next
            </Button>
            <Tabs
                onChange={activeKey => dispatch({ type: 'activeKey', value: activeKey })}
                style={{ height: 300, marginTop: 10 }}
                {...props}
            >
                {panes.map(pane => (
                    <Tabs.Pane key={pane.key} tab={pane.tab} style={{ padding: 16 }}>
                        Pane {pane.tab}
                    </Tabs.Pane>
                ))}
            </Tabs>
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
