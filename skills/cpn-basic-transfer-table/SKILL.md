---
name: cpn-basic-transfer-table
description: 帮助 AI 正确使用 UDesign TransferTable 组件（组件，使用 Table 来渲染 Transfer 的列表，支持 Transfer 的所有 props，可参考 Transfer 组件）。当需要使用 TransferTable 时加载此技能。
---

# 使用 TransferTable 组件

<!-- MANUAL_START: overview -->
## 技能概述

这是 TransferTable 组件，使用 Table 来渲染 Transfer 的列表，支持 Transfer 的所有 props，可参考 Transfer 组件
性能考虑，数量超过 400 条时会出现分页器
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { TransferTable } from '@ucloud-fe/react-components';
```

> ⚠️ **全局规范 - 所有组件通用**:
> - 生成纯 JavaScript (JSX) 代码，**不要使用 TypeScript 类型注解**
> - **禁止**使用 `@alicloud/*`、`@aliyun/*`、`antd` 等外部组件库
> - 优先使用 UDesign 组件，不要用 HTML 原生标签替代
<!-- AUTO_END: import -->

<!-- AUTO_START: basic-usage -->
### 基本用法

```jsx
const { defaultProps } = Transfer;

const columns = [
    {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
        width: 100
    },
    {
        title: 'desc',
        dataIndex: 'desc',
        key: 'desc'
    }
];
let uid = 0;

const generateData = ({ name, desc } = {}) => {
    const id = uid++;
    return {
        key: id + '',
        name: name || `name-${id}`,
        desc: desc || `desc-${id}`
    };
};

const dataSource = new Array(100).fill(null).map(() => generateData());

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: defaultProps.search,
            disabled: defaultProps.disabled,
            sourceSearch: 'default',
            sourceDisabled: 'default',
            sourceTitle: 'default',
            sourceFooter: false,
            targetSearch: 'default',
            targetDisabled: 'default',
            targetTitle: 'default',
            targetFooter: false
        };
    }
    getDisabledOfRow(record) {
        return !!(record.key % 2);
    }
    render() {
        const {
            search,
            disabled,
            sourceSearch,
            sourceDisabled,
            sourceTitle,
            sourceFooter,
            targetSearch,
            targetDisabled,
            targetTitle,
            targetFooter,
            getDisabledOfRow
        } = this.state;
        const itemLayout = {
            labelCol: {
                span: 3
            },
            controllerCol: {
                span: 9
            }
        };
        const source = {},
            target = {};

        if (sourceSearch !== 'default') {
            source.search = sourceSearch;
        }
        if (sourceDisabled != 'default') {
            source.disabled = sourceDisabled;
        }
        if (sourceTitle === null) {
            source.title = null;
        } else if (sourceTitle === 'custom') {
            source.title = <span>Custom Source Title</span>;
        }
        if (sourceFooter) {
            source.footer = (
                <Combine style={{ float: 'right' }}>
                    <Button disabled={sourceDisabled === 'default' ? disabled : sourceDisabled}>按钮 1</Button>
                    <Button disabled={sourceDisabled === 'default' ? disabled : sourceDisabled}>按钮 2</Button>
                </Combine>
            );
        }
        if (targetSearch !== 'default') {
            target.search = targetSearch;
        }
        if (targetDisabled != 'default') {
            target.disabled = targetDisabled;
        }
        if (targetTitle === null) {
            target.title = null;
        } else if (targetTitle === 'custom') {
            target.title = <span>Custom Target Title</span>;
        }
        if (targetFooter) {
            target.footer = (
                <Combine style={{ float: 'right' }}>
                    <Button disabled={targetDisabled === 'default' ? disabled : targetDisabled}>按钮 3</Button>
                    <Button disabled={targetDisabled === 'default' ? disabled : targetDisabled}>按钮 4</Button>
                </Combine>
            );
        }
        const props = {
            source,
            target,
            disabled,
            search,
            dataSource
        };
        if (getDisabledOfRow) {
            props.getDisabledOfRow = this.getDisabledOfRow;
        }

        return (
            <div>
                <Form className="demo-form" onSubmit={e => e.preventDefault()}>
                    <Form.Item label="search" {...itemLayout}>
                        <Switch checked={search} onChange={search => this.setState({ search })} />
                    </Form.Item>
                    <Form.Item label="disabled" {...itemLayout}>
                        <Switch checked={disabled} onChange={disabled => this.setState({ disabled })} />
                    </Form.Item>
                    <Form.Item label="getDisabledOfRow" {...itemLayout}>
                        <Switch
                            checked={getDisabledOfRow}
                            onChange={getDisabledOfRow => this.setState({ getDisabledOfRow })}
                        />
                    </Form.Item>
                    <Form.Item label="source.search" {...itemLayout}>
                        <Radio.Group
                            options={['default', true, false].map(v => ({ value: v, label: v + '' }))}
                            value={sourceSearch}
                            onChange={sourceSearch =>
                                this.setState({
                                    sourceSearch
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="source.disabled" {...itemLayout}>
                        <Radio.Group
                            options={['default', true, false].map(v => ({ value: v, label: v + '' }))}
                            value={sourceDisabled}
                            onChange={sourceDisabled => this.setState({ sourceDisabled })}
                        />
                    </Form.Item>
                    <Form.Item label="source.title" {...itemLayout}>
                        <Radio.Group
                            options={['default', null, 'custom'].map(v => ({ value: v, label: v + '' }))}
                            value={sourceTitle}
                            onChange={sourceTitle => this.setState({ sourceTitle })}
                        />
                    </Form.Item>
                    <Form.Item label="source.footer" {...itemLayout}>
                        <Switch
                            checked={sourceFooter}
                            value={sourceFooter}
                            onChange={sourceFooter => this.setState({ sourceFooter })}
                        />
                    </Form.Item>
                    <Form.Item label="target.search" {...itemLayout}>
                        <Radio.Group
                            options={['default', true, false].map(v => ({ value: v, label: v + '' }))}
                            value={targetSearch}
                            onChange={targetSearch =>
                                this.setState({
                                    targetSearch
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="target.disabled" {...itemLayout}>
                        <Radio.Group
                            options={['default', true, false].map(v => ({ value: v, label: v + '' }))}
                            value={targetDisabled}
                            onChange={targetDisabled => this.setState({ targetDisabled })}
                        />
                    </Form.Item>
                    <Form.Item label="target.title" {...itemLayout}>
                        <Radio.Group
                            options={['default', null, 'custom'].map(v => ({ value: v, label: v + '' }))}
                            value={targetTitle}
                            onChange={targetTitle => this.setState({ targetTitle })}
                        />
                    </Form.Item>
                    <Form.Item label="target.footer" {...itemLayout}>
                        <Switch
                            checked={targetFooter}
                            value={targetFooter}
                            onChange={targetFooter => this.setState({ targetFooter })}
                        />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <TransferTable {...props} columns={columns} />
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
| getDisabledOfRow | `unknown` | - | - | 禁用列选择 |
| columns | `unknown` | - | - | 表单的 columns |
| tableProps | `unknown` | - | - | 自定义 table 的 props，如 tableLayout 等，两个 table 共享，部分参数写死无法自定义 |
<!-- AUTO_END: props-table -->



<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>普通使用</summary>

```jsx
const { defaultProps } = Transfer;

const columns = [
    {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
        width: 100
    },
    {
        title: 'desc',
        dataIndex: 'desc',
        key: 'desc'
    }
];
let uid = 0;

const generateData = ({ name, desc } = {}) => {
    const id = uid++;
    return {
        key: id + '',
        name: name || `name-${id}`,
        desc: desc || `desc-${id}`
    };
};

const dataSource = new Array(100).fill(null).map(() => generateData());

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: defaultProps.search,
            disabled: defaultProps.disabled,
            sourceSearch: 'default',
            sourceDisabled: 'default',
            sourceTitle: 'default',
            sourceFooter: false,
            targetSearch: 'default',
            targetDisabled: 'default',
            targetTitle: 'default',
            targetFooter: false
        };
    }
    getDisabledOfRow(record) {
        return !!(record.key % 2);
    }
    render() {
        const {
            search,
            disabled,
            sourceSearch,
            sourceDisabled,
            sourceTitle,
            sourceFooter,
            targetSearch,
            targetDisabled,
            targetTitle,
            targetFooter,
            getDisabledOfRow
        } = this.state;
        const itemLayout = {
            labelCol: {
                span: 3
            },
            controllerCol: {
                span: 9
            }
        };
        const source = {},
            target = {};

        if (sourceSearch !== 'default') {
            source.search = sourceSearch;
        }
        if (sourceDisabled != 'default') {
            source.disabled = sourceDisabled;
        }
        if (sourceTitle === null) {
            source.title = null;
        } else if (sourceTitle === 'custom') {
            source.title = <span>Custom Source Title</span>;
        }
        if (sourceFooter) {
            source.footer = (
                <Combine style={{ float: 'right' }}>
                    <Button disabled={sourceDisabled === 'default' ? disabled : sourceDisabled}>按钮 1</Button>
                    <Button disabled={sourceDisabled === 'default' ? disabled : sourceDisabled}>按钮 2</Button>
                </Combine>
            );
        }
        if (targetSearch !== 'default') {
            target.search = targetSearch;
        }
        if (targetDisabled != 'default') {
            target.disabled = targetDisabled;
        }
        if (targetTitle === null) {
            target.title = null;
        } else if (targetTitle === 'custom') {
            target.title = <span>Custom Target Title</span>;
        }
        if (targetFooter) {
            target.footer = (
                <Combine style={{ float: 'right' }}>
                    <Button disabled={targetDisabled === 'default' ? disabled : targetDisabled}>按钮 3</Button>
                    <Button disabled={targetDisabled === 'default' ? disabled : targetDisabled}>按钮 4</Button>
                </Combine>
            );
        }
        const props = {
            source,
            target,
            disabled,
            search,
            dataSource
        };
        if (getDisabledOfRow) {
            props.getDisabledOfRow = this.getDisabledOfRow;
        }

        return (
            <div>
                <Form className="demo-form" onSubmit={e => e.preventDefault()}>
                    <Form.Item label="search" {...itemLayout}>
                        <Switch checked={search} onChange={search => this.setState({ search })} />
                    </Form.Item>
                    <Form.Item label="disabled" {...itemLayout}>
                        <Switch checked={disabled} onChange={disabled => this.setState({ disabled })} />
                    </Form.Item>
                    <Form.Item label="getDisabledOfRow" {...itemLayout}>
                        <Switch
                            checked={getDisabledOfRow}
                            onChange={getDisabledOfRow => this.setState({ getDisabledOfRow })}
                        />
                    </Form.Item>
                    <Form.Item label="source.search" {...itemLayout}>
                        <Radio.Group
                            options={['default', true, false].map(v => ({ value: v, label: v + '' }))}
                            value={sourceSearch}
                            onChange={sourceSearch =>
                                this.setState({
                                    sourceSearch
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="source.disabled" {...itemLayout}>
                        <Radio.Group
                            options={['default', true, false].map(v => ({ value: v, label: v + '' }))}
                            value={sourceDisabled}
                            onChange={sourceDisabled => this.setState({ sourceDisabled })}
                        />
                    </Form.Item>
                    <Form.Item label="source.title" {...itemLayout}>
                        <Radio.Group
                            options={['default', null, 'custom'].map(v => ({ value: v, label: v + '' }))}
                            value={sourceTitle}
                            onChange={sourceTitle => this.setState({ sourceTitle })}
                        />
                    </Form.Item>
                    <Form.Item label="source.footer" {...itemLayout}>
                        <Switch
                            checked={sourceFooter}
                            value={sourceFooter}
                            onChange={sourceFooter => this.setState({ sourceFooter })}
                        />
                    </Form.Item>
                    <Form.Item label="target.search" {...itemLayout}>
                        <Radio.Group
                            options={['default', true, false].map(v => ({ value: v, label: v + '' }))}
                            value={targetSearch}
                            onChange={targetSearch =>
                                this.setState({
                                    targetSearch
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="target.disabled" {...itemLayout}>
                        <Radio.Group
                            options={['default', true, false].map(v => ({ value: v, label: v + '' }))}
                            value={targetDisabled}
                            onChange={targetDisabled => this.setState({ targetDisabled })}
                        />
                    </Form.Item>
                    <Form.Item label="target.title" {...itemLayout}>
                        <Radio.Group
                            options={['default', null, 'custom'].map(v => ({ value: v, label: v + '' }))}
                            value={targetTitle}
                            onChange={targetTitle => this.setState({ targetTitle })}
                        />
                    </Form.Item>
                    <Form.Item label="target.footer" {...itemLayout}>
                        <Switch
                            checked={targetFooter}
                            value={targetFooter}
                            onChange={targetFooter => this.setState({ targetFooter })}
                        />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <TransferTable {...props} columns={columns} />
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
