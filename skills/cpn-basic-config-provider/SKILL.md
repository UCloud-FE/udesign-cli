---
name: cpn-basic-config-provider
description: 帮助 AI 正确使用 UDesign ConfigProvider 组件（组件，用于统一配置应用的配置）。当需要使用 ConfigProvider 时加载此技能。
---

# 使用 ConfigProvider 组件

<!-- MANUAL_START: overview -->
## 技能概述

这是 ConfigProvider 组件，用于统一配置应用的配置
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { ConfigProvider } from '@ucloud-fe/react-components';
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
    <div>
        <ConfigProvider locale={{ Pagination: { itemsPerPage: 'items per page', jumpToConfirm: 'CONFIRM' } }}>
            <Pagination total={100} showSizeChanger showQuickJumper={{ goButton: true }} />
        </ConfigProvider>
    </div>
);
```
<!-- AUTO_END: basic-usage -->

<!-- AUTO_START: props-table -->
### API 参数

| 属性 | 类型 | 默认值 | 必填 | 说明 |
|------|------|--------|------|------|
| ~~forwardPopupContainer~~ ⚠️ | `boolean` | - | - |  **(已废弃: 使用 popover 替换)** |
| popover | `{ getPopupContainer?: (triggerNode: Element) => Element; forceAlignWhenScroll?: boolean; forwardPopupContainer?: boolean | ((triggerNode: Element) => Element); ignorePopover?: boolean; }` | - | - | 全局控制 popover 类组件行为，datepicker、select、actionList |
| preventFormDefaultAction | `boolean` | - | - | 默认为 true。 阻止 Form 组件的默认事件，避免在回车时触发页面提交，原生 form 在某些情况下会触发原生的提交，由于现在基本 SPA，页面提交概率不大，故默认屏蔽 Form 组件该行文，如需开启，可设置为 false |
| iconDefaultPrefix | `string` | - | - | 设置 Icon 组件的默认 prefix，默认为 icon__， |
| theme | `any` | - | - | 提供时会使用 ThemeProvider 包裹 |
| locale | `AllLocaleMap` | - | - | 提供时会使用 LocaleProvider 包裹 |
| actionListAutoAdjustment | `boolean` | - | - | 是否默认启用 ActionList 的 autoAdJustment 参数 |
<!-- AUTO_END: props-table -->



<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>普通使用</summary>

```jsx
const list = [
    {
        title: 'Select',
        demo: <Select options={new Array(100).fill(null).map((v, i) => ({ value: i, label: `option-${i}` }))} />
    },
    {
        title: 'DatePicker',
        demo: <DatePicker />
    },
    {
        title: 'DatePicker.Month',
        demo: <DatePicker type="month" />
    },
    {
        title: 'DatePicker.Range',
        demo: <DatePicker.Range />
    },
    {
        title: 'TimePicker',
        demo: <TimePicker />
    },
    {
        title: 'ActionList',
        demo: (
            <ActionList
                exposeCount={1}
                actionList={new Array(6).fill(null).map((v, i) => ({
                    label: `Action ${i}`
                }))}
            />
        )
    },
    {
        title: 'AutoComplete',
        demo: <AutoComplete options={new Array(100).fill(null).map((v, i) => ({ value: `Item ${i}` }))} />
    },
    {
        title: 'PopConfirm',
        demo: (
            <PopConfirm popup="xxx">
                <Button>pop confirm</Button>
            </PopConfirm>
        )
    },
    {
        title: 'Tooltip',
        demo: (
            <Tooltip popup="xxx">
                <Button>tooltip</Button>
            </Tooltip>
        )
    },
    {
        title: 'Popover',
        demo: (
            <Popover popup="xxx">
                <Button>popover</Button>
            </Popover>
        )
    }
];
const render = (title, key) => {
    return (
        <div key={key}>
            <h2>{title}</h2>
            <div>
                {list.map(v => {
                    return (
                        <div className="demo-wrap" key={v.title}>
                            <Card>
                                <Card.Header>{v.title}</Card.Header>
                                <Card.Content>
                                    <div style={{ position: 'relative' }}>{v.demo}</div>
                                </Card.Content>
                            </Card>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
const Demo = () => {
    const [modalVisible, setModalVisible] = React.useState({});
    return [
        { title: 'default', config: false },
        {
            title: 'forwardPopupContainer: false',
            config: { forwardPopupContainer: false }
        },
        {
            title: 'getPopupContainer: body',
            config: { popover: { getPopupContainer: () => document.body } }
        },
        {
            title: 'getPopupContainer: body & ignorePopover',
            config: {
                popover: { getPopupContainer: () => document.body, ignorePopover: true }
            }
        },
        {
            title: 'forwardPopupContainer: parent & ignore align when scroll',
            config: {
                popover: { getPopupContainer: triggerNode => triggerNode.parentNode, forceAlignWhenScroll: false }
            }
        }
    ].map(({ title, config }, i) => {
        let content = (
            <div key={i}>
                {render(title, i)}
                <div className="demo-wrap">
                    <Button onClick={() => setModalVisible({ ...modalVisible, [i]: true })}>Open Modal</Button>
                </div>
                <Modal
                    visible={modalVisible[i]}
                    onClose={() => setModalVisible({ ...modalVisible, [i]: false })}
                    footer={
                        <Button styleType="primary" onClick={() => setModalVisible({ ...modalVisible, [i]: false })}>
                            确定
                        </Button>
                    }
                >
                    <Modal.Content>{render(title, i)}</Modal.Content>
                </Modal>
            </div>
        );
        if (config) {
            content = (
                <ConfigProvider key={i} {...config}>
                    {content}
                </ConfigProvider>
            );
        }
        return content;
    });
};
```

</details>

<details>
<summary>theme - 用作定义主题</summary>

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
            <ConfigProvider key={i} theme={theme.theme}>
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
            </ConfigProvider>
        ))}
    </div>
);
```

</details>

<details>
<summary>locale - 用作定义语言</summary>

```jsx
const Demo = () => (
    <div>
        <ConfigProvider locale={{ Pagination: { itemsPerPage: 'items per page', jumpToConfirm: 'CONFIRM' } }}>
            <Pagination total={100} showSizeChanger showQuickJumper={{ goButton: true }} />
        </ConfigProvider>
    </div>
);
```

</details>

<details>
<summary>iconDefaultPrefix - icon 默认前缀</summary>

```jsx
const Demo = () => (
    <div>
        <ConfigProvider iconDefaultPrefix="xxx_">
            <Icon type="test" />
        </ConfigProvider>
    </div>
);
```

</details>

<details>
<summary>actionListAutoAdjustment</summary>

```jsx
const BaseDemo = () => {
    const [width, setWidth] = React.useState(300);
    const onResize = (e, { size }) => {
        setWidth(size.width);
    };
    return (
        <>
            <style>
                {`
.react-resizable {
    position: relative;
}
.react-resizable-handle {
    width: 3px;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    display: block;
    position: absolute;
    bottom: 3px;
    top: 3px;
    right: 5px;
    cursor: col-resize;
}
`}
            </style>
            <div style={{ width }}>
                <Resizable
                    style={{ position: 'relative' }}
                    onResize={onResize}
                    width={width}
                    height={0}
                    minConstraints={[100, 0]}
                    maxConstraints={[1000, 0]}
                >
                    <div className="demo-wrap">
                        <ActionList
                            exposeCount={6}
                            actionList={new Array(10).fill(null).map((v, i) => ({
                                label: `Action ${i}`,
                                onClick: e => console.log('action', i, e)
                            }))}
                        />
                    </div>
                </Resizable>
            </div>
        </>
    );
};

const Demo = () => {
    return (
        <>
            <ConfigProvider actionListAutoAdjustment>
                <BaseDemo />
            </ConfigProvider>
            <ConfigProvider>
                <BaseDemo />
            </ConfigProvider>
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
