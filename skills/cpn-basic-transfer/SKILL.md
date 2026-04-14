---
name: cpn-basic-transfer
description: 帮助 AI 正确使用 UDesign Transfer 组件（穿梭框组件，用于数据间的选择）。当需要使用 Transfer 时加载此技能。
---

# 使用 Transfer 组件

<!-- MANUAL_START: overview -->
## 技能概述

这是 Transfer 穿梭框组件，用于数据间的选择
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { Transfer } from '@ucloud-fe/react-components';
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

const dataSource = new Array(100).fill(null).map((v, i) => ({
    key: i,
    label: `item-${i}`
}));

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
    render() {
        const props = {
            dataSource,
            search: {
                handleSearch: (searchValue, item) => {
                    console.log(searchValue, item);
                    const index = item.label.indexOf(searchValue);
                    return index >= 0 && index < 3;
                }
            },
            target: {
                search: {
                    handleSearch: (searchValue, item) => {
                        console.log(searchValue, item);
                        return item.label.indexOf(searchValue) > 2;
                    }
                }
            }
        };

        return (
            <div>
                <h3>自定义搜索：左侧只能匹配前 3 位，右侧只能匹配后 3 位</h3>
                <div className="demo-wrap">
                    <Transfer
                        {...props}
                        renderList={({ dataSource, selectedKeys, onChange, disabled }) => {
                            return (
                                <div style={{ padding: '12px', height: '300px', overflow: 'auto' }}>
                                    <Checkbox.Group value={selectedKeys} onChange={onChange} disabled={disabled}>
                                        {dataSource.map(v => (
                                            <div key={v.key}>
                                                <Checkbox value={v.key}>{v.label}</Checkbox>
                                            </div>
                                        ))}
                                    </Checkbox.Group>
                                </div>
                            );
                        }}
                    />
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
| dataSource | `unknown` | - | ✅ | 所有的数据源 |
| renderList | `unknown` | - | ✅ | 自定义渲染列表 |
| selectedKeys | `unknown` | - | - | 已选中的数据 key，受控 |
| defaultSelectedKeys | `unknown` | `[]` | - | 默认已选中的数据 key，非受控 |
| onChange | `unknown` | `() => {}` | - | 选中回调 |
| disabled | `unknown` | - | - | 是否禁用 |
| search | `unknown` | `true` | - | 是否展示搜索框，可以为 boolean 或者 Object
为 Object 时可传入 handleSearch 对搜索筛选进行自定义 |
| source | `unknown` | `{}` | - | 源数据区域的配置 |
| target | `unknown` | `{}` | - | 已选数据区域的配置 |
| locale | `unknown` | - | - |  |
| className | `unknown` | - | - |  |
<!-- AUTO_END: props-table -->



<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>普通使用</summary>

```jsx
const { defaultProps } = Transfer;

const dataSource = new Array(100).fill(null).map((v, i) => ({
    key: i,
    label: `item-${i}`
}));

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
            targetFooter
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

        return (
            <div>
                <Form className="demo-form" onSubmit={e => e.preventDefault()}>
                    <Form.Item label="search" {...itemLayout}>
                        <Switch checked={search} onChange={search => this.setState({ search })} />
                    </Form.Item>
                    <Form.Item label="disabled" {...itemLayout}>
                        <Switch checked={disabled} onChange={disabled => this.setState({ disabled })} />
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
                    <Transfer
                        {...props}
                        renderList={({ dataSource, selectedKeys, onChange, disabled }) => {
                            return (
                                <div style={{ padding: '12px', height: '300px', overflow: 'auto' }}>
                                    <Checkbox.Group value={selectedKeys} onChange={onChange} disabled={disabled}>
                                        {dataSource.map(v => (
                                            <div key={v.key}>
                                                <Checkbox value={v.key}>{v.label}</Checkbox>
                                            </div>
                                        ))}
                                    </Checkbox.Group>
                                </div>
                            );
                        }}
                    />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>search - 自定义搜索</summary>

```jsx
const { defaultProps } = Transfer;

const dataSource = new Array(100).fill(null).map((v, i) => ({
    key: i,
    label: `item-${i}`
}));

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
    render() {
        const props = {
            dataSource,
            search: {
                handleSearch: (searchValue, item) => {
                    console.log(searchValue, item);
                    const index = item.label.indexOf(searchValue);
                    return index >= 0 && index < 3;
                }
            },
            target: {
                search: {
                    handleSearch: (searchValue, item) => {
                        console.log(searchValue, item);
                        return item.label.indexOf(searchValue) > 2;
                    }
                }
            }
        };

        return (
            <div>
                <h3>自定义搜索：左侧只能匹配前 3 位，右侧只能匹配后 3 位</h3>
                <div className="demo-wrap">
                    <Transfer
                        {...props}
                        renderList={({ dataSource, selectedKeys, onChange, disabled }) => {
                            return (
                                <div style={{ padding: '12px', height: '300px', overflow: 'auto' }}>
                                    <Checkbox.Group value={selectedKeys} onChange={onChange} disabled={disabled}>
                                        {dataSource.map(v => (
                                            <div key={v.key}>
                                                <Checkbox value={v.key}>{v.label}</Checkbox>
                                            </div>
                                        ))}
                                    </Checkbox.Group>
                                </div>
                            );
                        }}
                    />
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
