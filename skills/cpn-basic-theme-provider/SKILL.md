---
name: cpn-basic-theme-provider
description: 帮助 AI 正确使用 UDesign ThemeProvider 组件（主题化组件，正常用于包裹整个程序来替换颜色主题等）。当需要使用 ThemeProvider 时加载此技能。
---

# 使用 ThemeProvider 组件

<!-- MANUAL_START: overview -->
## 技能概述

这是主题化组件，正常用于包裹整个程序来替换颜色主题等
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { ThemeProvider } from '@ucloud-fe/react-components';
```

> ⚠️ **全局规范 - 所有组件通用**:
> - 生成纯 JavaScript (JSX) 代码，**不要使用 TypeScript 类型注解**
> - **禁止**使用 `@alicloud/*`、`@aliyun/*`、`antd` 等外部组件库
> - 优先使用 UDesign 组件，不要用 HTML 原生标签替代
<!-- AUTO_END: import -->

<!-- AUTO_START: basic-usage -->
### 基本用法

```jsx
const { useDesignTokens } = ThemeProvider;
const ShowToken = () => {
    const DT = useDesignTokens();
    return (
        <div>
            <div
                style={{
                    background: DT.T_BUTTON_PRIMARY_COLOR_BG_DEFAULT,
                    color: DT.T_BUTTON_PRIMARY_COLOR_TEXT_DEFAULT,
                    padding: DT.T_CONTROL_SPACING_MD
                }}
            >
                <div>T_BUTTON_PRIMARY_COLOR_BG_DEFAULT: {DT.T_BUTTON_PRIMARY_COLOR_BG_DEFAULT}</div>
                <div>T_BUTTON_PRIMARY_COLOR_TEXT_DEFAULT: {DT.T_BUTTON_PRIMARY_COLOR_TEXT_DEFAULT}</div>
            </div>
        </div>
    );
};
const Demo = () => {
    return (
        <>
            <ShowToken />
            <ThemeProvider
                theme={{
                    designTokens: {
                        T_BUTTON_PRIMARY_COLOR_BG_DEFAULT: 'black',
                        T_BUTTON_PRIMARY_COLOR_TEXT_DEFAULT: 'white'
                    }
                }}
            >
                <ShowToken />
            </ThemeProvider>
        </>
    );
};
```
<!-- AUTO_END: basic-usage -->

<!-- AUTO_START: props-table -->
### API 参数

| 属性 | 类型 | 默认值 | 必填 | 说明 |
|------|------|--------|------|------|
| theme | `unknown` | - | ✅ | 自定义主题 |
<!-- AUTO_END: props-table -->



<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>主题展示</summary>

```jsx
const columns = new Array(5).fill(null).map((v, i) => ({
    title: `title-${i}`,
    key: `title-${i}`,
    width: 100,
    filter: {
        options: [1, 2],
        popoverProps: { getPopupContainer: () => document.body }
    },
    render: function Column(record) {
        return <span>content {record.index}</span>;
    }
}));

const Demo = () => (
    <div>
        {[
            { theme: {} },
            { theme: darkTheme, background: 'linear-gradient(rgb(26, 33, 50) 0%, rgb(26, 33, 50) 100%)' }
        ].map((theme, i) => (
            <ThemeProvider key={i} theme={theme.theme}>
                <div style={{ background: theme.background }}>
                    <div className="demo-wrap">
                        <Pagination total={100} showSizeChanger showQuickJumper={{ goButton: true }} />
                    </div>
                    <div className="demo-wrap">
                        <Calendar value={moment()} />
                    </div>
                    <div className="demo-wrap">
                        <DatePicker value={moment()} />
                    </div>
                    <div className="demo-wrap">
                        <DatePicker type="month" value={moment()} />
                    </div>
                    <div className="demo-wrap">
                        <DatePicker.Range value={[moment(), moment()]} />
                    </div>
                    <div className="demo-wrap">
                        <div className="demo-block">
                            <Select>
                                <Select.Option value={1}>1</Select.Option>
                                <Select.Option value={2}>2</Select.Option>
                                <Select.Option value={3}>3</Select.Option>
                            </Select>
                        </div>
                        <div className="demo-block">
                            <Select value={[1, 2]} multiple>
                                <Select.Option value={1}>1</Select.Option>
                                <Select.Option value={2}>2</Select.Option>
                                <Select.Option value={3}>3</Select.Option>
                            </Select>
                        </div>
                    </div>
                    <div className="demo-wrap">
                        <div className="demo-block">
                            <Button
                                className="demo-alert-btn"
                                onClick={() => Modal.alert({ title: 'alert' }, 'content')}
                            >
                                alert
                            </Button>
                        </div>
                        <div className="demo-block">
                            <Button
                                className="demo-confirm-btn"
                                onClick={() => Modal.confirm({ title: 'confirm' }, 'content')}
                            >
                                confirm
                            </Button>
                        </div>
                    </div>
                    <div className="demo-wrap">
                        <Menu multiple showSelectAll collapseProps={{ defaultOpenKeys: ['1', '2'] }}>
                            <Menu.Item itemKey="1">item 1</Menu.Item>
                            <Menu.SubMenu subMenuKey="1" title="submenu 1">
                                <Menu.Item itemKey="1-1">item 1-1</Menu.Item>
                                <Menu.Item itemKey="1-2">item 1-2</Menu.Item>
                            </Menu.SubMenu>
                            <Menu.SubMenu subMenuKey="2" title="submenu 2">
                                <Menu.Item itemKey="2-1">item 2-1</Menu.Item>
                                <Menu.Item itemKey="2-2">item 2-2</Menu.Item>
                            </Menu.SubMenu>
                        </Menu>
                    </div>
                    <div className="demo-wrap">
                        <Upload />
                    </div>
                    <div className="demo-wrap">
                        <Table
                            className="test-table"
                            columns={columns}
                            title={() => (
                                <div className="clear-fixed">
                                    <div style={{ float: 'right' }}>
                                        <Table.SearchInput className="test-search-input" style={{ marginRight: 5 }} />
                                        <Table.ColumnConfigButton className="test-column-config-btn" />
                                    </div>
                                </div>
                            )}
                        />
                    </div>
                    <div className="demo-wrap">
                        <div style={{ marginBottom: 10 }}>
                            <Slider className="test-slider" />
                        </div>
                        <div>
                            <Slider className="test-slider-sensitive" isSensitive />
                        </div>
                    </div>
                </div>
            </ThemeProvider>
        ))}
    </div>
);
```

</details>

<details>
<summary>useDesignTokens</summary>

```jsx
const { useDesignTokens } = ThemeProvider;
const ShowToken = () => {
    const DT = useDesignTokens();
    return (
        <div>
            <div
                style={{
                    background: DT.T_BUTTON_PRIMARY_COLOR_BG_DEFAULT,
                    color: DT.T_BUTTON_PRIMARY_COLOR_TEXT_DEFAULT,
                    padding: DT.T_CONTROL_SPACING_MD
                }}
            >
                <div>T_BUTTON_PRIMARY_COLOR_BG_DEFAULT: {DT.T_BUTTON_PRIMARY_COLOR_BG_DEFAULT}</div>
                <div>T_BUTTON_PRIMARY_COLOR_TEXT_DEFAULT: {DT.T_BUTTON_PRIMARY_COLOR_TEXT_DEFAULT}</div>
            </div>
        </div>
    );
};
const Demo = () => {
    return (
        <>
            <ShowToken />
            <ThemeProvider
                theme={{
                    designTokens: {
                        T_BUTTON_PRIMARY_COLOR_BG_DEFAULT: 'black',
                        T_BUTTON_PRIMARY_COLOR_TEXT_DEFAULT: 'white'
                    }
                }}
            >
                <ShowToken />
            </ThemeProvider>
        </>
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
