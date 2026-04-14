---
name: cpn-basic-tag
description: 帮助 AI 正确使用 UDesign Tag 组件（组件，用作属性标签等标识）。当需要使用 Tag 时加载此技能。
---

# 使用 Tag 组件

<!-- MANUAL_START: overview -->
## 技能概述

这是 Tag 组件，用作属性标签等标识
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { Tag } from '@ucloud-fe/react-components';
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
                    <Tag icon="circle-fill">Content</Tag>
                </div>
                <div className="demo-wrap">
                    <Tag icon="circle-fill" closable onClose={console.log}>
                        Content
                    </Tag>
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
| children | `unknown` | - | - |  |
| styleType | `unknown` | `'default'` | - | 样式风格 |
| closable | `unknown` | - | - | 是否显示关闭按钮 |
| onClose | `unknown` | - | - | 关闭回调 |
| icon | `unknown` | - | - | 自定义前置 icon |
| iconSize | `unknown` | `'sm'` | - | icon 大小 |
| border | `unknown` | `true` | - | 是否开启border样式 |
| borderType | `unknown` | `'default'` | - | border 类型 |
| suffix | `unknown` | - | - | 后缀 |
| disabled | `unknown` | - | - | 是否禁用 |
| customStyle | `unknown` | - | - | 自定义样式 |
<!-- AUTO_END: props-table -->


<!-- AUTO_START: tokens -->
### Design Tokens

| Token 名称 | 分类 | 默认值 | 暗色值 | 说明 |
|------------|------|--------|--------|------|
| `T_TAG_BORDER_RADIUS` | other | `2px` | `2px` | - |
| `T_TAG_COLOR_BLUE_BG_DARK` | color | `#4f95f2` | `#70a6ec` | - |
| `T_TAG_COLOR_BLUE_BG_LIGHT` | color | `#e7eefd` | `#15253b` | - |
| `T_TAG_COLOR_BLUE_BORDER` | color | `#c1d4fa` | `#29476d` | - |
| `T_TAG_COLOR_BLUE_DIVIDER` | color | `#c1d4fa` | `#29476d` | - |
| `T_TAG_COLOR_BLUE_FILLBG_DARK` | color | `#1971cb` | `#a1c3ef` | - |
| `T_TAG_COLOR_BLUE_FILLBG_LIGHT` | color | `#3c90f0` | `#90bcf6` | - |
| `T_TAG_COLOR_BLUE_ICON` | color | `#4f95f2` | `#70a6ec` | - |
| `T_TAG_COLOR_BLUE_TEXT` | color | `#4f95f2` | `#70a6ec` | - |
| `T_TAG_COLOR_CYAN_BG_DARK` | color | `#55ecd6` | `#3eaa95` | - |
| `T_TAG_COLOR_CYAN_BG_LIGHT` | color | `#e8fcfc` | `#1d2c29` | - |
| `T_TAG_COLOR_CYAN_BORDER` | color | `#c3f8f5` | `#1e3c37` | - |
| `T_TAG_COLOR_CYAN_DIVIDER` | color | `#c3f8f5` | `#1e3c37` | - |
| `T_TAG_COLOR_CYAN_FILLBG_DARK` | color | `#1fc4a1` | `#6de3d1` | - |
| `T_TAG_COLOR_CYAN_FILLBG_LIGHT` | color | `#43eacb` | `#4ed9bd` | - |
| `T_TAG_COLOR_CYAN_ICON` | color | `#55ecd6` | `#3eaa95` | - |
| `T_TAG_COLOR_CYAN_TEXT` | color | `#55ecd6` | `#3eaa95` | - |
| `T_TAG_COLOR_DISABLED_BG_DARK` | color | `#f7f7f7` | `#f7f7f7` | - |
| `T_TAG_COLOR_DISABLED_BG_LIGHT` | color | `#f7f7f7` | `#f7f7f7` | - |
| `T_TAG_COLOR_DISABLED_BORDER` | color | `#d9d9d9` | `#2B313F` | - |
| `T_TAG_COLOR_DISABLED_DIVIDER` | color | `#d9d9d9` | `#d9d9d9` | - |
| `T_TAG_COLOR_DISABLED_ICON` | color | `#cccccc` | `#cccccc` | - |
| `T_TAG_COLOR_DISABLED_TEXT` | color | `#cccccc` | `#535763` | - |
| `T_TAG_COLOR_GRAY_BG_DARK` | color | `#526075` | `#C5CAE3` | - |
| `T_TAG_COLOR_GRAY_BG_LIGHT` | color | `#fafafc` | `#0B1224` | - |
| `T_TAG_COLOR_GRAY_BORDER` | color | `#d2d6ea` | `#2B3555` | - |
| `T_TAG_COLOR_GRAY_DIVIDER` | color | `#d2d6ea` | `#2B3555` | - |
| `T_TAG_COLOR_GRAY_ICON` | color | `#526075` | `#C5CAE3` | - |
| `T_TAG_COLOR_GRAY_TEXT` | color | `#526075` | `#C5CAE3` | - |
| `T_TAG_COLOR_GREEN_BG_DARK` | color | `#15AD31` | `#2b9f56` | - |
| `T_TAG_COLOR_GREEN_BG_LIGHT` | color | `#E6FFED` | `#1e3019` | - |
| `T_TAG_COLOR_GREEN_BORDER` | color | `#9EFFA5` | `#236019` | - |
| `T_TAG_COLOR_GREEN_DIVIDER` | color | `#9EFFA5` | `#236019` | - |
| `T_TAG_COLOR_GREEN_ICON` | color | `#15AD31` | `#2b9f56` | - |
| `T_TAG_COLOR_GREEN_TEXT` | color | `#15AD31` | `#2b9f56` | - |
| `T_TAG_COLOR_LIGHTBLUE_BG_DARK` | color | `#4dcff4` | `#399bb0` | - |
| `T_TAG_COLOR_LIGHTBLUE_BG_LIGHT` | color | `#e7f5fd` | `#1c252d` | - |
| `T_TAG_COLOR_LIGHTBLUE_BORDER` | color | `#c1e9fb` | `#1a2f37` | - |
| `T_TAG_COLOR_LIGHTBLUE_DIVIDER` | color | `#c1e9fb` | `#1a2f37` | - |
| `T_TAG_COLOR_LIGHTBLUE_FILLBG_DARK` | color | `#17b1cd` | `#67cde9` | - |
| `T_TAG_COLOR_LIGHTBLUE_FILLBG_LIGHT` | color | `#3ad0f3` | `#47c7e1` | - |
| `T_TAG_COLOR_LIGHTBLUE_ICON` | color | `#4dcff4` | `#399bb0` | - |
| `T_TAG_COLOR_LIGHTBLUE_TEXT` | color | `#4dcff4` | `#399bb0` | - |
| `T_TAG_COLOR_ORANGE_BG_DARK` | color | `#ff9e42` | `#b86d31` | - |
| `T_TAG_COLOR_ORANGE_BG_LIGHT` | color | `#fff5e6` | `#2e231b` | - |
| `T_TAG_COLOR_ORANGE_BORDER` | color | `#ffe3bd` | `#402c1a` | - |
| `T_TAG_COLOR_ORANGE_DIVIDER` | color | `#ffe3bd` | `#402c1a` | - |
| `T_TAG_COLOR_ORANGE_FILLBG_DARK` | color | `#d9610b` | `#f2a65f` | - |
| `T_TAG_COLOR_ORANGE_FILLBG_LIGHT` | color | `#FF8C2E` | `#eb883d` | - |
| `T_TAG_COLOR_ORANGE_ICON` | color | `#ff9e42` | `#b86d31` | - |
| `T_TAG_COLOR_ORANGE_TEXT` | color | `#ff9e42` | `#b86d31` | - |
| `T_TAG_COLOR_PRIMARY_BG_DARK` | color | `#3357df` | `#738BFF` | - |
| `T_TAG_COLOR_PRIMARY_BG_LIGHT` | color | `#3860f4` | `#5A76FF` | - |
| `T_TAG_COLOR_PRIMARY_BORDER` | color | `#3860f4` | `#5A76FF` | - |
| `T_TAG_COLOR_PRIMARY_DIVIDER` | color | `#3860f4` | `#5A76FF` | - |
| `T_TAG_COLOR_PRIMARY_ICON` | color | `#ffffff` | `#ffffff` | - |
| `T_TAG_COLOR_PRIMARY_TEXT` | color | `#ffffff` | `#ffffff` | - |
| `T_TAG_COLOR_PURPLE_BG_DARK` | color | `#a06dd4` | `#b186dc` | - |
| `T_TAG_COLOR_PURPLE_BG_LIGHT` | color | `#f4ebf9` | `#2b1d39` | - |
| `T_TAG_COLOR_PURPLE_BORDER` | color | `#e1ccf0` | `#4d3465` | - |
| `T_TAG_COLOR_PURPLE_DIVIDER` | color | `#e1ccf0` | `#4d3465` | - |
| `T_TAG_COLOR_PURPLE_FILLBG_DARK` | color | `#6b3aaa` | `#d5b1f9` | - |
| `T_TAG_COLOR_PURPLE_FILLBG_LIGHT` | color | `#935ecf` | `#c499ef` | - |
| `T_TAG_COLOR_PURPLE_ICON` | color | `#a06dd4` | `#b186dc` | - |
| `T_TAG_COLOR_PURPLE_TEXT` | color | `#a06dd4` | `#b186dc` | - |
| `T_TAG_COLOR_RED_BG_DARK` | color | `#f44336` | `#db3f3f` | - |
| `T_TAG_COLOR_RED_BG_LIGHT` | color | `#fff0f0` | `#2e1b1e` | - |
| `T_TAG_COLOR_RED_BORDER` | color | `#fed4d4` | `#6a2e2b` | - |
| `T_TAG_COLOR_RED_DIVIDER` | color | `#fed4d4` | `#6a2e2b` | - |
| `T_TAG_COLOR_RED_FILLBG_DARK` | color | `#C13126` | `#e75f5f` | - |
| `T_TAG_COLOR_RED_FILLBG_LIGHT` | color | `#f44336` | `#db3f3f` | - |
| `T_TAG_COLOR_RED_ICON` | color | `#f44336` | `#db3f3f` | - |
| `T_TAG_COLOR_RED_TEXT` | color | `#f44336` | `#db3f3f` | - |
| `T_TAG_COLOR_YELLOW_BG_DARK` | color | `#ffc42e` | `#ebb73d` | - |
| `T_TAG_COLOR_YELLOW_BG_LIGHT` | color | `#fffce6` | `#2e281b` | - |
| `T_TAG_COLOR_YELLOW_BORDER` | color | `#ffe38d` | `#51441a` | - |
| `T_TAG_COLOR_YELLOW_DIVIDER` | color | `#ffe38d` | `#51441a` | - |
| `T_TAG_COLOR_YELLOW_FILLBG_DARK` | color | `#d9980b` | `#f2cd5f` | - |
| `T_TAG_COLOR_YELLOW_FILLBG_LIGHT` | color | `#ffc42e` | `#ebb73d` | - |
| `T_TAG_COLOR_YELLOW_ICON` | color | `#ffc42e` | `#ebb73d` | - |
| `T_TAG_COLOR_YELLOW_TEXT` | color | `#ffc42e` | `#ebb73d` | - |
| `T_TAG_HEIGHT_LG` | dimension | `28px` | `28px` | - |
| `T_TAG_HEIGHT_MD` | dimension | `24px` | `24px` | - |
| `T_TAG_HEIGHT_SM` | dimension | `20px` | `20px` | - |
| `T_TAG_ICON_CLOSE` | other | `#ffffff` | `#ffffff` | - |
| `T_TAG_ICON_OPACITY_DEFAULT` | other | `1` | `1` | - |
| `T_TAG_ICON_OPACITY_HOVER` | other | `1` | `1` | - |
| `T_TAG_ICON_SIZE_LG` | dimension | `14px` | `14px` | - |
| `T_TAG_ICON_SIZE_MD` | dimension | `12px` | `12px` | - |
| `T_TAG_ICON_SIZE_SM` | dimension | `10px` | `10px` | - |
| `T_TAG_ICON_SIZE_XS` | dimension | `6px` | `6px` | - |
| `T_TAG_ICON_WIDTH_SM` | dimension | `10px` | `10px` | - |
<!-- AUTO_END: tokens -->

<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>功能演示</summary>

```jsx
const { StyleType } = Tag;
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            styleType: 'default',

            border: true,
            borderType: 'default',
            suffix: 'none',
            icon: null
        };
    }
    render() {
        const { styleType, closable, icon, disabled, border, borderType, suffix } = this.state;
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
                    <Form.Item label="disabled" {...itemLayout}>
                        <Switch checked={disabled} onChange={disabled => this.setState({ disabled })} />
                    </Form.Item>
                    <Form.Item label="border" {...itemLayout}>
                        <Switch checked={border} onChange={border => this.setState({ border })} />
                    </Form.Item>
                    <Form.Item label="borderType" {...itemLayout}>
                        <Radio.Group
                            options={['default', 'circle'].map(borderType => ({ value: borderType }))}
                            value={borderType}
                            onChange={borderType => this.setState({ borderType })}
                        />
                    </Form.Item>

                    <Form.Item label="icon" {...itemLayout}>
                        <Radio.Group
                            options={['circle-fill', 'circle', 'loading', 'custom']
                                .map(v => ({ label: v, value: v }))
                                .concat([{ label: 'null', value: null }])}
                            value={icon}
                            onChange={icon => this.setState({ icon })}
                        />
                    </Form.Item>
                    <Form.Item label="suffix" {...itemLayout}>
                        <Radio.Group
                            options={['none', 'custom'].map(v => ({ label: v, value: v }))}
                            value={suffix}
                            onChange={suffix => this.setState({ suffix })}
                        />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Tag
                        {...this.state}
                        icon={icon === 'custom' ? <Icon type="loading" spin /> : icon}
                        suffix={suffix === 'custom' ? <Icon type="loading" spin /> : undefined}
                        onClose={() => console.log('close tag')}
                    >
                        Tag Content
                    </Tag>
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>样式风格 - styleType</summary>

```jsx
const { StyleType } = Tag;
class Demo extends React.Component {
    render() {
        return (
            <div>
                <h3>状态</h3>
                <div className="demo-wrap">
                    {['default', 'success', 'warning', 'error'].map(styleType => (
                        <div key={styleType}>
                            <Tag styleType={styleType} icon="circle-fill" closable style={{ width: '120px' }}>
                                {styleType}
                            </Tag>
                        </div>
                    ))}
                </div>
                <h3>预设颜色</h3>
                <div className="demo-wrap">
                    {StyleType.filter(v => !{ success: 1, warning: 1, error: 1 }[v]).map(styleType => (
                        <div key={styleType}>
                            <Tag styleType={styleType} icon="circle-fill" closable style={{ width: '120px' }}>
                                {styleType}
                            </Tag>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>是否可关闭 - closable</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Tag icon="circle-fill">Content</Tag>
                </div>
                <div className="demo-wrap">
                    <Tag icon="circle-fill" closable onClose={console.log}>
                        Content
                    </Tag>
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>是否禁用 - disabled</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Tag icon="circle-fill" closable>
                        Content
                    </Tag>
                </div>
                <div className="demo-wrap">
                    <Tag icon="circle-fill" closable disabled>
                        Content
                    </Tag>
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>自定义 icon - icon</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    {['circle', 'circle-fill', 'loading', <Icon type="loading" key="123" spin />].map((icon, i) => (
                        <div key={i}>
                            <Tag icon={icon} closable>
                                Content
                            </Tag>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>自定义样式 - customStyle</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Tag icon="circle-fill" styleType="orange" closable>
                        Content
                    </Tag>
                </div>
                <div className="demo-wrap">
                    <Tag
                        icon="circle-fill"
                        styleType="orange"
                        closable
                        customStyle={{
                            color: 'white',
                            background: 'red',
                            borderColor: 'orange',
                            closeIconHoverBackground: 'pink'
                        }}
                    >
                        Content
                    </Tag>
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
