---
name: cpn-basic-card
description: 帮助 AI 正确使用 UDesign Card 组件（该组件主要用于卡片式布局，包含 Header、Action、Footer、Content 四个子组件）。当需要使用 Card 时加载此技能。
---

# 使用 Card 组件

<!-- MANUAL_START: overview -->
## 技能概述

该组件主要用于卡片式布局，包含 Header、Action、Footer、Content 四个子组件。
由于 Card 外层具有 overflow，内部的弹层会被遮挡错位，现通过 Context 来解决，在 Card 内部的弹层将会自动使用 Card 的 parentNode 作为容器，可参考下方容器测试 demo
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { Card } from '@ucloud-fe/react-components';
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
    <Card>
        <Card.Content>
            <div style={{ background: '#e1e6f0', height: 50, padding: 10 }}>This is the content</div>
        </Card.Content>
        <Card.Action>
            <Button>This is a action button</Button>
            <Button>This is a action button</Button>
        </Card.Action>
        <Card.Header comment="This is the comment">This is the title</Card.Header>
        <Card.Footer>
            <Button style={{ float: 'right' }}>This is a footer button</Button>
        </Card.Footer>
    </Card>
);
```
<!-- AUTO_END: basic-usage -->

<!-- AUTO_START: props-table -->
### API 参数

| 属性 | 类型 | 默认值 | 必填 | 说明 |
|------|------|--------|------|------|
| children | `unknown` | - | - |  |
| className | `unknown` | - | - |  |
<!-- AUTO_END: props-table -->


<!-- AUTO_START: tokens -->
### Design Tokens

| Token 名称 | 分类 | 默认值 | 暗色值 | 说明 |
|------------|------|--------|--------|------|
| `T_CARD_ACTION_BOTTOM` | other | `0px` | `0px` | - |
| `T_CARD_ACTION_LEFT` | other | `24px` | `24px` | - |
| `T_CARD_ACTION_RIGHT` | other | `24px` | `24px` | - |
| `T_CARD_ACTION_TOP` | other | `16px` | `16px` | - |
| `T_CARD_COLOR_BG_DEFAULT` | color | `#ffffff` | `#141A2B` | - |
| `T_CARD_COMMENT_FONT_COLOR_DEFAULT` | color | `#526075` | `#C5CAE3` | - |
| `T_CARD_COMMENT_FONT_FONT_WEIGHT` | typography | `400` | `400` | - |
| `T_CARD_COMMENT_FONT_LINE_HEIGHT` | typography | `1.7` | `1.7` | - |
| `T_CARD_COMMENT_FONT_SIZE` | typography | `12px` | `12px` | - |
| `T_CARD_CONTENT_BG_DEFAULT` | other | `#fafafc` | `#0B1224` | - |
| `T_CARD_CONTENT_PADDING_BOTTOM` | spacing | `0px` | `0px` | - |
| `T_CARD_CONTENT_PADDING_LEFT` | spacing | `24px` | `24px` | - |
| `T_CARD_CONTENT_PADDING_RIGHT` | spacing | `24px` | `24px` | - |
| `T_CARD_CONTENT_PADDING_TOP` | spacing | `16px` | `16px` | - |
| `T_CARD_FOOTER_MARGIN_BOTTOM` | spacing | `24px` | `24px` | - |
| `T_CARD_FOOTER_MARGIN_TOP` | spacing | `24px` | `24px` | - |
| `T_CARD_FOOTER_PADDING_BOTTOM` | spacing | `16px` | `16px` | - |
| `T_CARD_FOOTER_PADDING_LEFT` | spacing | `24px` | `24px` | - |
| `T_CARD_FOOTER_PADDING_RIGHT` | spacing | `24px` | `24px` | - |
| `T_CARD_FOOTER_PADDING_TOP` | spacing | `16px` | `16px` | - |
| `T_CARD_HEADER_FONT_COLOR_DEFAULT` | color | `#0a1633` | `#F7F9FF` | - |
| `T_CARD_HEADER_FONT_FONT_WEIGHT` | typography | `600` | `600` | - |
| `T_CARD_HEADER_FONT_LINE_HEIGHT` | typography | `1.7` | `1.7` | - |
| `T_CARD_HEADER_FONT_SIZE` | typography | `16px` | `16px` | - |
| `T_CARD_HEADER_PADDING_BOTTOM` | spacing | `0px` | `0px` | - |
| `T_CARD_HEADER_PADDING_LEFT` | spacing | `24px` | `24px` | - |
| `T_CARD_HEADER_PADDING_RIGHT` | spacing | `24px` | `24px` | - |
| `T_CARD_HEADER_PADDING_TOP` | spacing | `24px` | `24px` | - |
| `T_CARD_LINE_COLOR_DEFAULT` | color | `#d2d6ea` | `#2B3555` | - |
| `T_CARD_LINE_PADDING_VERTICAL` | spacing | `16px` | `16px` | - |
| `T_CARD_OUTSIDE_PADDING` | other | `24px` | `24px` | - |
| `T_CARD_SECONDARY_FONT_COLOR_DEFAULT` | color | `#0a1633` | `#F7F9FF` | - |
| `T_CARD_SECONDARY_FONT_FONT_WEIGHT` | typography | `600` | `600` | - |
| `T_CARD_SECONDARY_FONT_LINE_HEIGHT` | typography | `1.7` | `1.7` | - |
| `T_CARD_SECONDARY_FONT_SIZE` | typography | `14px` | `14px` | - |
| `T_CARD_SECONDARY_PADDING_BOTTOM` | spacing | `16px` | `16px` | - |
<!-- AUTO_END: tokens -->

<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>普通使用</summary>

```jsx
const Demo = () => (
    <Card>
        <Card.Header comment="This is the comment">This is the title</Card.Header>
        <Card.Action>
            <Button>This is a action button</Button>
            <Button>This is a action button</Button>
        </Card.Action>
        <Card.Content>
            <Card.SubArea title="子标题">
                <div style={{ background: '#e1e6f0', height: 50, padding: 10 }}>This is the content</div>
            </Card.SubArea>
            <Card.SubArea title="子标题">
                <div style={{ background: '#e1e6f0', height: 50, padding: 10 }}>This is the content</div>
            </Card.SubArea>
        </Card.Content>
        <Card.Footer>
            <Button style={{ float: 'right' }}>This is a footer button</Button>
        </Card.Footer>
    </Card>
);
```

</details>

<details>
<summary>列表展示</summary>

```jsx
const Demo = () => (
    <div>
        <div className="demo-wrap">
            <h2>Header：用作标题、副标题展示</h2>
            <Card>
                <Card.Header comment="This is the comment">This is the title</Card.Header>
            </Card>
            <h2>也可配合 Box 在右上角添加操作按钮</h2>
            <Card>
                <Card.Header comment="This is the comment">
                    <Box container justifyContent="space-between">
                        <div>This is the title</div>
                        <Button>Action</Button>
                    </Box>
                </Card.Header>
            </Card>
        </div>
        <div className="demo-wrap">
            <h2>Action：用作操作栏的展示</h2>
            <Card>
                <Card.Header>This is the title</Card.Header>
                <Card.Action>
                    <Button>This is a action button</Button>
                    <Button>This is a action button</Button>
                </Card.Action>
            </Card>
        </div>
        <div className="demo-wrap">
            <h2>Content：用作内容区域的展示</h2>
            <Card>
                <Card.Header>This is the title</Card.Header>
                <Card.Content>
                    <div style={{ background: '#e1e6f0', height: 50, padding: 10 }}>This is the content</div>
                </Card.Content>
            </Card>
        </div>
        <div className="demo-wrap">
            <h2>Footer：用作底部操作的展示</h2>
            <Card>
                <Card.Header>This is the title</Card.Header>
                <Card.Footer>
                    <Button style={{ float: 'right' }}>This is a footer button</Button>
                </Card.Footer>
            </Card>
        </div>
        <div className="demo-wrap">
            <h2>SubArea：用作内容区域分割展示</h2>
            <Card>
                <Card.Header>This is the title</Card.Header>
                <Card.Content>
                    <Card.SubArea title="子标题">
                        <div style={{ background: '#e1e6f0', height: 50, padding: 10 }}>This is the content</div>
                    </Card.SubArea>
                    <Card.SubArea title="子标题">
                        <div style={{ background: '#e1e6f0', height: 50, padding: 10 }}>This is the content</div>
                    </Card.SubArea>
                </Card.Content>
            </Card>
        </div>
    </div>
);
```

</details>

<details>
<summary>自定义顺序等</summary>

```jsx
const Demo = () => (
    <Card>
        <Card.Content>
            <div style={{ background: '#e1e6f0', height: 50, padding: 10 }}>This is the content</div>
        </Card.Content>
        <Card.Action>
            <Button>This is a action button</Button>
            <Button>This is a action button</Button>
        </Card.Action>
        <Card.Header comment="This is the comment">This is the title</Card.Header>
        <Card.Footer>
            <Button style={{ float: 'right' }}>This is a footer button</Button>
        </Card.Footer>
    </Card>
);
```

</details>

<details>
<summary>拆分展示</summary>

```jsx
const Demo = () => (
    <div>
        <Card>
            <Card.Content>
                <div style={{ background: '#e1e6f0', height: 50, padding: 10 }}>This is the content</div>
            </Card.Content>
        </Card>
        <Card style={{ marginTop: 12 }}>
            <Card.Header comment="This is the comment">This is the title</Card.Header>
            <Card.Action>
                <Button>This is a action button</Button>
                <Button>This is a action button</Button>
            </Card.Action>
        </Card>
        <Card style={{ marginTop: 12 }}>
            <div style={{ background: '#e1e6f0', height: 50, padding: 10 }}>卡片本身无间距</div>
        </Card>
        <Card style={{ marginTop: 12 }}>
            <Card.Content>
                <Card.SubArea title="xxxxx">XXXXXXXXX</Card.SubArea>
                <Card.SubArea title="xxxxx">XXXXXXXXX</Card.SubArea>
            </Card.Content>
        </Card>
    </div>
);
```

</details>

<details>
<summary>popupContainer - 容器测试</summary>

```jsx
const Demo = () => (
    <div>
        <h3>Card 提供了内置的 getPopupContainer</h3>
        <div className="demo-wrap">
            <Card>
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
            </Card>
        </div>
        <div className="demo-wrap">
            <Card>
                <Card.Content>
                    <div style={{ position: 'relative' }}>
                        <Select
                            options={new Array(100).fill(null).map((v, i) => ({ value: i, label: `option-${i}` }))}
                        />
                    </div>
                </Card.Content>
            </Card>
        </div>
        <div className="demo-wrap">
            <Card>
                <Card.Content>
                    <div style={{ position: 'relative' }}>
                        <DatePicker />
                    </div>
                </Card.Content>
            </Card>
        </div>
        <div className="demo-wrap">
            <Card>
                <Card.Content>
                    <div style={{ position: 'relative' }}>
                        <DatePicker type="month" />
                    </div>
                </Card.Content>
            </Card>
        </div>
    </div>
);
```

</details>

<!-- AUTO_END: demos -->

<!-- MANUAL_START: best-practices -->
## 最佳实践

1. **子组件顺序灵活**：Header、Action、Content、Footer 可按需使用和组合
2. **弹层自动适配**：Card 内部的 Popover、Select 等弹出层会自动使用 Card 的父节点作为容器
3. **配合 Grid 布局**：多卡片场景使用 Grid 栅格组件排列

### 常见场景

#### 信息展示卡片

```jsx
<Card>
  <Card.Header>基本信息</Card.Header>
  <Card.Action>
    <Button styleType="primary" onClick={handleEdit}>编辑</Button>
  </Card.Action>
  <Card.Content>
    <p>名称：example-instance</p>
    <p>状态：运行中</p>
  </Card.Content>
</Card>
```

#### 列表卡片

```jsx
{items.map(item => (
  <Card key={item.id}>
    <Card.Header>{item.title}</Card.Header>
    <Card.Content>{item.description}</Card.Content>
  </Card>
))}
```
<!-- MANUAL_END: best-practices -->

<!-- MANUAL_START: faq -->
## 常见问题

### Q: Card 内部的弹层被遮挡？

A: Card 已通过 Context 自动处理，弹层会使用 Card 的 parentNode 作为容器。如果仍有问题，检查是否有其他外层 overflow 容器影响。
<!-- MANUAL_END: faq -->

<!-- MANUAL_START: critical -->
## 注意事项

_（待补充）_
<!-- MANUAL_END: critical -->
