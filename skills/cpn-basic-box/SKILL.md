---
name: cpn-basic-box
description: 帮助 AI 正确使用 UDesign Box 组件（组件，主要为了解决前端布局问题和样式问题）。当需要使用 Box 时加载此技能。
---

# 使用 Box 组件

<!-- MANUAL_START: overview -->
## 技能概述

这是 Box 组件，主要为了解决前端布局问题和样式问题
封装了兼容性支持程度下的一些 flex 属性
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { Box } from '@ucloud-fe/react-components';
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
    <Box direction="column" alignItems="stretch" spacing="md">
        <div className="demo-wrap">
            <h2>水平垂直居中</h2>
            <Box
                container
                justifyContent="center"
                alignItems="center"
                style={{ height: 100, border: '1px solid #ccc' }}
            >
                <div style={{ width: 20, height: 20, background: 'red' }}></div>
            </Box>
        </div>
    </Box>
);
```
<!-- AUTO_END: basic-usage -->

<!-- AUTO_START: props-table -->
### API 参数

| 属性 | 类型 | 默认值 | 必填 | 说明 |
|------|------|--------|------|------|
| children | `unknown` | - | - |  |
| container | `unknown` | - | - | 是否为容器，为容器时容器属性才能生效，并且被包裹的子组件中的一些属性（如 flex，order 等才能生效） |
| spacing | `unknown` | - | - | 子组件间的间距，预设 sm md lg 等内置尺寸，或自定义间距大小(传入 number，单位为 px)，间距方向跟随布局方向
可传入数组同时定义横向和纵向间距 [横向间距, 纵向间距] |
| direction | `unknown` | - | - | 布局方向，默认为 row 横向布局，column 为纵向布局，加上 -reverse 为单行（单列）子元素顺序反转 |
| wrap | `unknown` | - | - | 容器定义，默认为 nowrap，超出不会换行/列，使用 wrap 可让其超出换行/列，-reverse 为多行（多列）顺序反转 |
| alignItems | `unknown` | - | - | 项目定位 |
| alignContent | `unknown` | - | - | 内容整体定位，center 为居中（按照布局方向），start 和 end 为首尾对其（按照布局方向） |
| justifyContent | `unknown` | - | - | 内容定位 |
| padding | `unknown` | - | - | 间距，可以为 sm md lg 等内置尺寸，或者为自定义字符串，或传入数组 [横向 padding, 纵向 padding]，或有效的 padding 字符串 |
| width | `unknown` | - | - | 宽度, 同 css 宽度 |
| height | `unknown` | - | - | 高度，同 css 高度 |
| span | `unknown` | - | - | 栅格宽度，12栅格，支持小数点，12栅格不够用的情况下可使用小数点 |
| order | `unknown` | - | - | 排序，同 css 的 order |
| flex | `unknown` | - | - | flex 属性，同 css 的 flex |
| cleanMargin | `unknown` | - | - | 是否创建外层容器来清除外间距，正常情况下不需要关注，但是如果有滚动需求，又使用了 spacing，外边距会对滚动容器造成影响，此时可以通过这个参数来自动创建一个清理容器来修复 |
<!-- AUTO_END: props-table -->



<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>spacing - 子元素间距</summary>

```jsx
const Demo = () => (
    <Box container direction="column" spacing="md">
        {Box.Spacing.concat([100]).map(spacing => (
            <div className="demo-wrap" key={spacing}>
                <h2>spacing: {spacing}</h2>
                <Box container spacing={spacing}>
                    {[1, 2, 3].map(v => (
                        <div
                            key={v}
                            style={{
                                height: '30px',
                                width: '100px',
                                background: 'gray',
                                color: 'white',
                                lineHeight: '30px',
                                textAlign: 'center'
                            }}
                        ></div>
                    ))}
                </Box>
            </div>
        ))}
        <div className="demo-wrap">
            <h2>spacing: {`['md', 100]`}</h2>
            <Box container wrap="wrap" spacing={['md', 100]}>
                {new Array(12).fill(null).map((v, i) => (
                    <div
                        key={i}
                        style={{
                            height: '30px',
                            width: '300px',
                            background: 'gray',
                            color: 'white',
                            lineHeight: '30px',
                            textAlign: 'center'
                        }}
                    ></div>
                ))}
            </Box>
        </div>
    </Box>
);
```

</details>

<details>
<summary>direction - 方向</summary>

```jsx
const Demo = () => (
    <Box container direction="column" spacing="md">
        {['row', 'row-reverse', 'column', 'column-reverse'].map(direction => (
            <div className="demo-wrap" key={direction}>
                <h2>direction: {direction}</h2>
                <Box container direction={direction} spacing="md">
                    {[1, 2, 3].map(v => (
                        <div
                            key={v}
                            style={{
                                height: '30px',
                                width: '100px',
                                background: 'gray',
                                color: 'white',
                                lineHeight: '30px',
                                textAlign: 'center'
                            }}
                        >
                            div - {v}
                        </div>
                    ))}
                </Box>
            </div>
        ))}
    </Box>
);
```

</details>

<details>
<summary>wrap - 容器定义</summary>

```jsx
const Demo = () => (
    <Box container direction="column" spacing="md">
        {['nowrap', 'wrap', 'wrap-reverse'].map(wrap => (
            <div className="demo-wrap" key={wrap}>
                <h2>wrap: {wrap}</h2>
                <Box container wrap={wrap} spacing={['md', 'md']}>
                    {new Array(28).fill(null).map((v, i) => (
                        <div
                            key={i}
                            style={{
                                height: '30px',
                                width: '100px',
                                background: 'gray',
                                color: 'white',
                                lineHeight: '30px',
                                textAlign: 'center'
                            }}
                        >
                            div - {i}
                        </div>
                    ))}
                </Box>
            </div>
        ))}
    </Box>
);
```

</details>

<details>
<summary>alignItems</summary>

```jsx
const Demo = () => (
    <Box container direction="column" spacing="md">
        {['center', 'flex-start', 'flex-end', 'stretch'].map(alignItems => (
            <div className="demo-wrap" key={alignItems}>
                <h2>alignItems: {alignItems}</h2>
                <Box container alignItems={alignItems} spacing={['md', 'md']}>
                    {new Array(3).fill(null).map((v, i) => (
                        <div
                            key={i}
                            style={{
                                minHeight: 30 + i * 10 + 'px',
                                width: '100px',
                                background: 'gray',
                                color: 'white',
                                lineHeight: '30px',
                                textAlign: 'center'
                            }}
                        >
                            div - {i}
                        </div>
                    ))}
                </Box>
            </div>
        ))}
    </Box>
);
```

</details>

<details>
<summary>alignContent</summary>

```jsx
const Demo = () => (
    <Box container direction="column" spacing="md">
        {['center', 'flex-start', 'flex-end', 'space-between', 'space-around'].map(alignContent => (
            <div className="demo-wrap" key={alignContent}>
                <h2>alignContent: {alignContent}</h2>
                <Box container alignContent={alignContent} wrap="wrap" spacing="md" height="200px">
                    {new Array(15).fill(null).map((v, i) => (
                        <div
                            key={i}
                            style={{
                                height: '30px',
                                width: '100px',
                                background: 'gray',
                                color: 'white',
                                lineHeight: '30px',
                                textAlign: 'center'
                            }}
                        >
                            div - {i}
                        </div>
                    ))}
                </Box>
            </div>
        ))}
    </Box>
);
```

</details>

<details>
<summary>justifyContent</summary>

```jsx
const Demo = () => (
    <Box container direction="column" spacing="md">
        {['center', 'flex-start', 'flex-end', 'space-between', 'space-around'].map(justifyContent => (
            <div className="demo-wrap" key={justifyContent}>
                <h2>justifyContent: {justifyContent}</h2>
                <Box container justifyContent={justifyContent} wrap="wrap" spacing="md">
                    {new Array(6).fill(null).map((v, i) => (
                        <div
                            key={i}
                            style={{
                                height: '30px',
                                width: '100px',
                                background: 'gray',
                                color: 'white',
                                lineHeight: '30px',
                                textAlign: 'center'
                            }}
                        >
                            div - {i}
                        </div>
                    ))}
                </Box>
            </div>
        ))}
    </Box>
);
```

</details>

<details>
<summary>padding</summary>

```jsx
const Demo = () => (
    <Box container direction="column" spacing="md">
        {Box.Spacing.concat(['100px', ['md', '100px']]).map(padding => (
            <div className="demo-wrap" key={padding}>
                <h2>padding: {padding}</h2>
                <Box padding={padding} style={{ border: '1px solid #ccc' }}>
                    <div
                        style={{
                            height: '30px',
                            width: '100px',
                            background: 'gray',
                            color: 'white',
                            lineHeight: '30px',
                            textAlign: 'center'
                        }}
                    ></div>
                </Box>
            </div>
        ))}
    </Box>
);
```

</details>

<details>
<summary>span - 栅格排版</summary>

```jsx
const Demo = () => (
    <div className="demo-wrap">
        <Box container spacing={['md', 'md']} wrap="wrap">
            {[1, 2, 3, 4, 6, 6, 2.5, 2.5, 2.5, 4.5].map((v, i) => (
                <Box key={i} span={v}>
                    <div
                        style={{
                            height: '30px',
                            background: 'gray',
                            color: 'white',
                            lineHeight: '30px',
                            textAlign: 'center'
                        }}
                    >
                        span: {v}
                    </div>
                </Box>
            ))}
        </Box>
    </div>
);
```

</details>

<details>
<summary>order - 排序</summary>

```jsx
const Demo = () => (
    <div className="demo-wrap">
        <Box container spacing={['md', 'md']} wrap="wrap">
            {[9, 8, 7, 6, 5, 4, 3, 2, 1].map((v, i) => (
                <Box key={i} order={v} span={2}>
                    <div
                        style={{
                            height: '30px',
                            background: 'gray',
                            color: 'white',
                            lineHeight: '30px',
                            textAlign: 'center'
                        }}
                    >
                        order: {v}
                    </div>
                </Box>
            ))}
        </Box>
    </div>
);
```

</details>

<details>
<summary>flex</summary>

```jsx
const Demo = () => (
    <div className="demo-wrap">
        <Box container spacing={['md', 'md']} wrap="wrap">
            <Box span={4}>
                <div
                    style={{
                        height: '30px',
                        background: 'gray',
                        color: 'white',
                        lineHeight: '30px',
                        textAlign: 'center'
                    }}
                >
                    span: 4
                </div>
            </Box>
            <Box flex="1">
                <div
                    style={{
                        height: '30px',
                        background: 'gray',
                        color: 'white',
                        lineHeight: '30px',
                        textAlign: 'center'
                    }}
                >
                    flex
                </div>
            </Box>
        </Box>
    </div>
);
```

</details>

<details>
<summary>案例 - 水平垂直居中</summary>

```jsx
const Demo = () => (
    <Box direction="column" alignItems="stretch" spacing="md">
        <div className="demo-wrap">
            <h2>水平垂直居中</h2>
            <Box
                container
                justifyContent="center"
                alignItems="center"
                style={{ height: 100, border: '1px solid #ccc' }}
            >
                <div style={{ width: 20, height: 20, background: 'red' }}></div>
            </Box>
        </div>
    </Box>
);
```

</details>

<details>
<summary>案例 - 模拟浮动布局</summary>

```jsx
const Demo = () => (
    <Box direction="column" alignItems="stretch" spacing="md">
        <div className="demo-wrap">
            <h2>类左右浮动布局</h2>
            <Box container justifyContent="space-between" alignItems="center">
                <Combine>
                    <span>文本内容</span>
                    <Button>按钮</Button>
                    <Icon type="edit" />
                </Combine>
                <Combine>
                    <span>文本内容</span>
                    <Button>按钮</Button>
                    <Icon type="edit" />
                </Combine>
            </Box>
        </div>
        <div className="demo-wrap">
            <h2>单右对齐布局</h2>
            <Box container spacing="sm" justifyContent="flex-end" alignItems="center">
                <span>文本内容</span>
                <Button>按钮</Button>
                <Icon type="edit" />
            </Box>
        </div>
    </Box>
);
```

</details>

<details>
<summary>案例 - 卡片布局</summary>

```jsx
const Demo = () => (
    <Box direction="column" alignItems="stretch" spacing="md">
        <div className="demo-wrap">
            <h2>卡片排版</h2>
            <Box container wrap="wrap" spacing={['lg', 'lg']}>
                <Box span={12}>
                    <Card>
                        <Card.Action>
                            <Box container justifyContent="space-between" alignItems="center">
                                <Combine>
                                    <span>这是一条工具栏</span>
                                    <Button>按钮</Button>
                                    <Icon type="edit" />
                                </Combine>
                                <Combine>
                                    <Button>按钮</Button>
                                </Combine>
                            </Box>
                        </Card.Action>
                    </Card>
                </Box>
                <Box span={4}>
                    <Card>
                        <Card.Content>
                            <div style={{ height: 100 }}>Card 1</div>
                        </Card.Content>
                    </Card>
                </Box>
                <Box span={8}>
                    <Card>
                        <Card.Content>
                            <div style={{ height: 100 }}>Card 2</div>
                        </Card.Content>
                    </Card>
                </Box>
                <Box span={4}>
                    <Card>
                        <Card.Content>
                            <div style={{ height: 100 }}>Card 3</div>
                        </Card.Content>
                    </Card>
                </Box>
                <Box span={8}>
                    <Card>
                        <Card.Content>
                            <div style={{ height: 300 }}>Card 4</div>
                        </Card.Content>
                    </Card>
                </Box>
            </Box>
        </div>
        <div className="demo-wrap">
            <h2>卡片自适应宽度排版 - 可以压缩浏览器宽度看效果</h2>
            <Box container wrap="wrap" spacing={['lg', 'lg']} padding="md">
                {new Array(10).fill(null).map((v, i) => (
                    <Box width="300px" flex="1 1 auto" key={i}>
                        <Card>
                            <Card.Content>
                                <div style={{ height: 100 }}>Card {i}</div>
                            </Card.Content>
                        </Card>
                    </Box>
                ))}
            </Box>
        </div>
        <div className="demo-wrap">
            <h2>卡片纵向排版</h2>
            <Box spacing="lg" container>
                <Box span={4}>
                    <Box direction="column" spacing="lg">
                        <Card>
                            <Card.Content>
                                <div style={{ height: 100 }}>Card 1</div>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Card.Content>
                                <div style={{ height: 100 }}>Card 2</div>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Card.Content>
                                <div style={{ height: 100 }}>Card 3</div>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Card.Content>
                                <div style={{ height: 100 }}>Card 4</div>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Card.Content>
                                <div style={{ height: 100 }}>Card 5</div>
                            </Card.Content>
                        </Card>
                    </Box>
                </Box>
                <Box span={8}>
                    <Box direction="column" spacing="lg">
                        <Card>
                            <Card.Content>
                                <div style={{ height: 100 }}>Card 3</div>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Card.Content>
                                <div style={{ height: 800 }}>Card 4</div>
                            </Card.Content>
                        </Card>
                    </Box>
                </Box>
            </Box>
        </div>
    </Box>
);
```

</details>

<details>
<summary>案例 - 滚动</summary>

```jsx
const Demo = () => (
    <Box direction="column" alignItems="stretch" spacing="md">
        <div className="demo-wrap">
            <h2>x 轴滚动</h2>
            <p>
                不建议用来 x 轴滚动，flex 布局右侧 padding 会消失，span 宽度会失效（x 轴滚动宽度未知）, spacing
                负间距会撑开，套用容器会导致宽度丢失等各种问题
            </p>
        </div>
        <div className="demo-wrap">
            <h2>
                y 轴滚动 - 由于使用 spacing 时为了清除间距使用了负的 margin，所以在外层需要添加滚动时注意使用
                cleanMargin 来清除（会创建一个额外的容器）
            </h2>
            <div style={{ overflow: 'auto', height: 300, padding: 10, background: 'gray' }}>
                <Box spacing="lg" container cleanMargin>
                    <Box span={4}>
                        <Box direction="column" spacing="lg">
                            <Card>
                                <Card.Content>
                                    <div style={{ height: 100 }}>Card 1-1</div>
                                </Card.Content>
                            </Card>
                            <Card>
                                <Card.Content>
                                    <div style={{ height: 100 }}>Card 1-2</div>
                                </Card.Content>
                            </Card>
                            <Card>
                                <Card.Content>
                                    <div style={{ height: 100 }}>Card 1-3</div>
                                </Card.Content>
                            </Card>
                            <Card>
                                <Card.Content>
                                    <div style={{ height: 100 }}>Card 1-4</div>
                                </Card.Content>
                            </Card>
                            <Card>
                                <Card.Content>
                                    <div style={{ height: 100 }}>Card 1-5</div>
                                </Card.Content>
                            </Card>
                        </Box>
                    </Box>
                    <Box span={8}>
                        <Box direction="column" spacing="lg">
                            <Card>
                                <Card.Content>
                                    <div style={{ height: 100 }}>Card 2-1</div>
                                </Card.Content>
                            </Card>
                            <Card>
                                <Card.Content>
                                    <div style={{ height: 800 }}>Card 2-2</div>
                                </Card.Content>
                            </Card>
                        </Box>
                    </Box>
                </Box>
            </div>
        </div>
    </Box>
);
```

</details>

<details>
<summary>常见使用场景</summary>

```jsx
const Demo = () => (
    <Box>
        <h2>工具栏</h2>
        <div className="demo-wrap">
            <Box container justifyContent="space-between" alignItems="center">
                <Combine>
                    <span>这是一条工具栏</span>
                    <Button>按钮</Button>
                    <Icon type="edit" />
                </Combine>
                <Combine>
                    <Select options={[1, 2, 3].map(v => ({ value: v, label: `option ${v}` }))} />
                    <Input.Search />
                    <Button>按钮</Button>
                </Combine>
            </Box>
        </div>
        <h2>简易自适应布局</h2>
        <div className="demo-wrap">
            <Box container direction="column" style={{ height: 300 }}>
                <div style={{ height: 20, background: 'black' }}></div>
                <Box container flex="1 1 auto" style={{ height: '100%' }}>
                    <div style={{ background: '#999', width: 100, height: '100%' }}></div>
                    <Box flex="1 1 auto"></Box>
                </Box>
            </Box>
        </div>
        <h2>高度差对齐布局</h2>
        <div className="demo-wrap">
            <Box container spacing={['md', 'md']} wrap="wrap">
                {new Array(10).fill(null).map((v, i) => (
                    <Box key={i} span={6}>
                        <div style={{ background: 'gray', height: 100 + i * 10 + 'px' }}></div>
                    </Box>
                ))}
            </Box>
        </div>
    </Box>
);
```

</details>

<!-- AUTO_END: demos -->

<!-- MANUAL_START: best-practices -->
## 最佳实践

1. **容器必须设置 `container` 属性**：只有 `container` 为 `true` 时，flex 布局属性才会生效
2. **优先使用预设间距**：使用 `sm`、`md`、`lg` 等预设值保持间距一致性
3. **滚动场景使用 `cleanMargin`**：当使用 `spacing` 且需要滚动时，设置 `cleanMargin` 避免外边距影响滚动容器
4. **栅格布局使用 `span`**：使用 12 栅格系统进行响应式布局，需要更精细的可使用小数

### 常见场景

#### 水平垂直居中

```jsx
<Box container alignItems="center" justifyContent="center" height="300px">
  <Box>居中内容</Box>
</Box>
```

#### 模拟浮动布局

```jsx
<Box container justifyContent="space-between">
  <Box>左侧内容</Box>
  <Box>右侧内容</Box>
</Box>
```

#### 卡片布局

```jsx
<Box container spacing="md" wrap="wrap">
  <Box span={4}><Card>卡片1</Card></Box>
  <Box span={4}><Card>卡片2</Card></Box>
  <Box span={4}><Card>卡片3</Card></Box>
</Box>
```
<!-- MANUAL_END: best-practices -->

<!-- MANUAL_START: faq -->
## 常见问题

### Q: 子元素的 flex、order 等属性不生效？

A: 确保父级 Box 设置了 `container` 为 `true`，否则子组件的 flex 相关属性不会生效。

### Q: 滚动时间距导致布局异常？

A: 使用了 `spacing` 后，内部通过负 margin 实现间距，在滚动容器中可能有影响。设置 `cleanMargin` 即可修复。
<!-- MANUAL_END: faq -->

<!-- MANUAL_START: critical -->
## 注意事项

_（待补充）_
<!-- MANUAL_END: critical -->
