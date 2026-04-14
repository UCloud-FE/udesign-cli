---
name: cpn-basic-badge
description: 帮助 AI 正确使用 UDesign Badge 组件（组件，用作角标展示）。当需要使用 Badge 时加载此技能。
---

# 使用 Badge 组件

<!-- MANUAL_START: overview -->
## 技能概述

这是 Badge 组件，用作角标展示
支持点状角标
预设部分颜色和角标位置
不传 children 时会将角标单独展示，可用来作标记
角标的 zIndex 默认为 9，无 children 时无 zIndex
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { Badge } from '@ucloud-fe/react-components';
```

> ⚠️ **全局规范 - 所有组件通用**:
> - 生成纯 JavaScript (JSX) 代码，**不要使用 TypeScript 类型注解**
> - **禁止**使用 `@alicloud/*`、`@aliyun/*`、`antd` 等外部组件库
> - 优先使用 UDesign 组件，不要用 HTML 原生标签替代
<!-- AUTO_END: import -->

<!-- AUTO_START: basic-usage -->
### 基本用法

```jsx
const { DemoWrap, DemoBlock } = demoUtil;
const { Placement } = Badge;
const Demo = () => (
    <DemoWrap>
        {Placement.map(placement => (
            <DemoBlock key={placement} lg>
                <Badge value={100} placement={placement}>
                    <div style={{ width: 50, height: 50, background: '#ddd' }} />
                </Badge>
            </DemoBlock>
        ))}
    </DemoWrap>
);
```
<!-- AUTO_END: basic-usage -->

<!-- AUTO_START: props-table -->
### API 参数

| 属性 | 类型 | 默认值 | 必填 | 说明 |
|------|------|--------|------|------|
| value | `ReactNode` | - | - | 显示内容 |
| maxValue | `number` | `99` | - | 为数字时能显示的最大值，超过将显示最大值+ |
| dot | `boolean` | - | - | 显示为点状 |
| placement | `'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft' | 'top' | 'bottom' | 'left' | 'right'` | `'topRight'` | - | badge 的位置 |
| hideWhenZero | `boolean` | - | - | 为 0 时是否隐藏 |
| badgeStyle | `CSSProperties` | - | - | badge的样式 |
| offset | `[number, number]` | - | - | 定义 badge 的偏移，第一个参数 x 轴偏移量，第二个值为 y 轴偏移量 |
| children | `ReactNode` | - | - | 定位的内容，为空时仅展示 Badge，定位等属性不生效 |
| color | `'red' | 'green' | 'yellow' | 'primary'` | `'red'` | - | 选择预设的颜色 |
| zIndex | `number` | `9` | - | badge 的 zIndex |
<!-- AUTO_END: props-table -->



<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>演示</summary>

```jsx
const { formLayout, DemoWrap } = demoUtil;
const { Placement, Color, defaultProps } = Badge;
class Demo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            dot: false,
            hideWhenZero: false,
            placement: defaultProps.placement,
            maxValue: defaultProps.maxValue,
            color: defaultProps.color,
            noneContent: false
        };
    }
    render() {
        const { value, dot, hideWhenZero, placement, maxValue, noneContent, color, cColor, cBackground } = this.state;
        return (
            <div>
                <Form className="demo-form" itemProps={{ ...formLayout }}>
                    <Form.Item label="value">
                        <Input value={value} onChange={e => this.setState({ value: e.target.value })} />
                    </Form.Item>
                    <Form.Item label="maxValue">
                        <NumberInput value={maxValue} onNumberChange={maxValue => this.setState({ maxValue })} />
                    </Form.Item>
                    <Form.Item label="dot">
                        <Switch checked={dot} onChange={dot => this.setState({ dot })} />
                    </Form.Item>
                    <Form.Item label="hideWhenZero">
                        <Switch checked={hideWhenZero} onChange={hideWhenZero => this.setState({ hideWhenZero })} />
                    </Form.Item>
                    <Form.Item label="noneContent">
                        <Switch checked={noneContent} onChange={noneContent => this.setState({ noneContent })} />
                    </Form.Item>
                    <Form.Item label="placement">
                        <Radio.Group
                            options={Placement.map(p => ({ value: p }))}
                            value={placement}
                            onChange={placement => {
                                this.setState({ placement });
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="color">
                        <Radio.Group
                            options={Color.map(p => ({ value: p }))}
                            value={color}
                            onChange={color => {
                                this.setState({ color });
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="badgeStyle.color">
                        <input type="color" onChange={e => this.setState({ cColor: e.target.value })} />
                    </Form.Item>
                    <Form.Item label="badgeStyle.background">
                        <input type="color" onChange={e => this.setState({ cBackground: e.target.value })} />
                    </Form.Item>
                </Form>
                <DemoWrap>
                    <Badge
                        value={value}
                        maxValue={+maxValue}
                        dot={dot}
                        hideWhenZero={hideWhenZero}
                        placement={placement}
                        color={color}
                        badgeStyle={{ color: cColor, background: cBackground }}
                    >
                        {noneContent ? null : <div style={{ width: 50, height: 50, background: '#ddd' }} />}
                    </Badge>
                </DemoWrap>
            </div>
        );
    }
}
```

</details>

<details>
<summary>placement - 位置</summary>

```jsx
const { DemoWrap, DemoBlock } = demoUtil;
const { Placement } = Badge;
const Demo = () => (
    <DemoWrap>
        {Placement.map(placement => (
            <DemoBlock key={placement} lg>
                <Badge value={100} placement={placement}>
                    <div style={{ width: 50, height: 50, background: '#ddd' }} />
                </Badge>
            </DemoBlock>
        ))}
    </DemoWrap>
);
```

</details>

<details>
<summary>dot - 显示为点</summary>

```jsx
const { DemoWrap, DemoBlock } = demoUtil;
const Demo = () => (
    <DemoWrap>
        <DemoBlock>
            <Badge value={100}>
                <div style={{ width: 50, height: 50, background: '#ddd' }} />
            </Badge>
        </DemoBlock>
        <DemoBlock>
            <Badge value={100} dot>
                <div style={{ width: 50, height: 50, background: '#ddd' }} />
            </Badge>
        </DemoBlock>
    </DemoWrap>
);
```

</details>

<details>
<summary>hideWhenZero - 为 0 时自动隐藏</summary>

```jsx
const { DemoWrap, DemoBlock } = demoUtil;
const Demo = () => (
    <DemoWrap>
        <DemoBlock>
            <Badge value={0}>
                <div style={{ width: 50, height: 50, background: '#ddd' }} />
            </Badge>
        </DemoBlock>
        <DemoBlock>
            <Badge value={0} hideWhenZero>
                <div style={{ width: 50, height: 50, background: '#ddd' }} />
            </Badge>
        </DemoBlock>
    </DemoWrap>
);
```

</details>

<details>
<summary>maxValue - 最大值</summary>

```jsx
const { DemoWrap, DemoBlock } = demoUtil;
const Demo = () => (
    <DemoWrap>
        <DemoBlock>
            <Badge value={10}>
                <div style={{ width: 50, height: 50, background: '#ddd' }} />
            </Badge>
        </DemoBlock>
        <DemoBlock>
            <Badge value={10} maxValue={9}>
                <div style={{ width: 50, height: 50, background: '#ddd' }} />
            </Badge>
        </DemoBlock>
    </DemoWrap>
);
```

</details>

<details>
<summary>value - 自定义内容</summary>

```jsx
const { DemoWrap, DemoBlock } = demoUtil;
const Demo = () => (
    <DemoWrap>
        <DemoBlock>
            <Badge value="string">
                <div style={{ width: 50, height: 50, background: '#ddd' }} />
            </Badge>
        </DemoBlock>
        <DemoBlock>
            <Badge value={<span style={{ fontWeight: 'bolder' }}>node</span>} hideWhenZero>
                <div style={{ width: 50, height: 50, background: '#ddd' }} />
            </Badge>
        </DemoBlock>
    </DemoWrap>
);
```

</details>

<details>
<summary>color - 预设颜色</summary>

```jsx
const { DemoWrap, DemoBlock } = demoUtil;
const { Color } = Badge;
const Demo = () => (
    <DemoWrap>
        {Color.map(color => (
            <DemoBlock key={color}>
                <Badge value={100} color={color}>
                    <div style={{ width: 50, height: 50, background: '#ddd' }} />
                </Badge>
            </DemoBlock>
        ))}
        {Color.map(color => (
            <DemoBlock key={color}>
                <Badge value={100} dot color={color}>
                    <div style={{ width: 50, height: 50, background: '#ddd' }} />
                </Badge>
            </DemoBlock>
        ))}
    </DemoWrap>
);
```

</details>

<details>
<summary>badgeStyle - 自定义样式</summary>

```jsx
const { DemoWrap, DemoBlock } = demoUtil;
const Demo = () => (
    <DemoWrap>
        <DemoBlock>
            <Badge value={100} badgeStyle={{ background: 'white', color: 'black', border: '1px solid #ddd' }}>
                <div style={{ width: 50, height: 50, background: '#ddd' }} />
            </Badge>
        </DemoBlock>
        <DemoBlock>
            <Badge value={100} dot badgeStyle={{ background: 'blue' }}>
                <div style={{ width: 50, height: 50, background: '#ddd' }} />
            </Badge>
        </DemoBlock>
    </DemoWrap>
);
```

</details>

<details>
<summary>无内容时展示</summary>

```jsx
const { DemoWrap } = demoUtil;

const Demo = () => (
    <>
        <DemoWrap>
            <Combine>
                <span>文本</span>
                <Badge value={100} />
            </Combine>
        </DemoWrap>
        <DemoWrap>
            <Combine>
                <span>文本</span>
                <Badge value={100} dot color="primary" />
            </Combine>
        </DemoWrap>
    </>
);
```

</details>

<details>
<summary>案例展示</summary>

```jsx
const { DemoWrap, DemoBlock } = demoUtil;
const Content = () => <div style={{ width: '50px', height: '50px', borderRadius: '5px', background: '#ccc' }}></div>;
const Demo = () => (
    <>
        <DemoWrap title="数值提示">
            <DemoBlock>
                <Badge value={1}>
                    <Content />
                </Badge>
            </DemoBlock>
            <DemoBlock>
                <Badge value={10}>
                    <Content />
                </Badge>
            </DemoBlock>
            <DemoBlock>
                <Badge value={99}>
                    <Content />
                </Badge>
            </DemoBlock>
            <DemoBlock>
                <Badge value={9999}>
                    <Content />
                </Badge>
            </DemoBlock>
            <DemoBlock>
                <Badge value={9999} maxValue={100000}>
                    <Content />
                </Badge>
            </DemoBlock>
        </DemoWrap>
        <DemoWrap title="文本提示">
            <DemoBlock row lg>
                <Badge value="New">
                    <Content />
                </Badge>
            </DemoBlock>
            <DemoBlock row lg>
                <Badge value="很长的提示内容很长的提示内容很长的提示内容很长的提示内容很长的提示内容很长的提示内容">
                    <Content />
                </Badge>
            </DemoBlock>
            <DemoBlock row lg>
                <Badge
                    value={
                        <div>
                            <p>自定义一堆提示内容。 </p>
                            <p>自定义一堆提示内容。</p>
                        </div>
                    }
                >
                    <Content />
                </Badge>
            </DemoBlock>
        </DemoWrap>
        <DemoWrap title="状态点">
            <DemoBlock>
                <Badge dot>
                    <Content />
                </Badge>
            </DemoBlock>
            <DemoBlock>
                <Badge dot color="primary">
                    <Content />
                </Badge>
            </DemoBlock>
        </DemoWrap>
        <DemoWrap title="作为标记使用">
            <DemoBlock row>
                <Combine>
                    <span>文字描述</span>
                    <Badge value="New" color="yellow" />
                </Combine>
            </DemoBlock>
            <DemoBlock row>
                <Combine>
                    <span>文字描述</span>
                    <Badge dot color="green" />
                </Combine>
            </DemoBlock>
        </DemoWrap>
    </>
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
