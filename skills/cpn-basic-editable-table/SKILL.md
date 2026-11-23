---
name: cpn-basic-editable-table
description: 帮助 AI 正确使用 UDesign EditableTable 组件（组件，主要用于列表项的编辑删除）。当需要使用 EditableTable 时加载此技能。
---


# 使用 EditableTable 组件

<!-- MANUAL_START: overview -->
## 技能概述

这是 EditableTable 组件，主要用于列表项的编辑删除
与表格的区别
1. pagination 固定为 null
2. emptyContent 固定为 null
3. columns 中添加了删除列
其余属性与 Table 保持一致
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { EditableTable } from '@ucloud-fe/react-components';
```

> ⚠️ **全局规范 - 所有组件通用**:
> - 生成纯 JavaScript (JSX) 代码，**不要使用 TypeScript 类型注解**
> - **禁止**使用 `@alicloud/*`、`@aliyun/*`、`antd` 等外部组件库
> - 优先使用 UDesign 组件，不要用 HTML 原生标签替代
<!-- AUTO_END: import -->

<!-- AUTO_START: basic-usage -->
### 基本用法

```jsx
const { defaultProps } = EditableTable;

const columns = [
    {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
        width: 100,
        filter: {
            options: [1, 2, 3, 4]
        },
        order: true
    },
    {
        title: 'desc',
        dataIndex: 'desc',
        key: 'desc',
        filter: {
            options: [1, 2, 3, 4],
            multiple: true
        },
        order: true
    }
];
let uid = 0;

const generateData = ({ name, desc, deletable } = {}) => {
    const id = uid++;
    return {
        key: id + '',
        name: name || `name-${id}`,
        desc: desc || `desc-${id}`,
        deletable
    };
};
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addition: defaultProps.addition,
            additionTip: '',
            rowDeletion: defaultProps.rowDeletion,
            randomRowDeletionDisable: false,
            dataSource: []
        };
    }
    onDelete(record) {
        console.log('Delete', record);
        const key = record.key;
        const dataSource = this.state.dataSource.filter(item => item.key !== key);
        this.setState({ dataSource });
    }
    onAdd() {
        const dataSource = [...this.state.dataSource];
        dataSource.push(generateData());
        this.setState({ dataSource });
    }
    getDisabledOfRow(record) {
        return record.key % 2;
    }
    render() {
        const { addition, rowDeletion, additionTip, additionHidden, randomRowDeletionDisable, dataSource } = this.state;
        const itemLayout = {
            labelCol: {
                span: 3
            },
            controllerCol: {
                span: 9
            }
        };
        const _addition = {
            onAdd: () => this.onAdd(),
            tip: additionTip,
            disabled: !addition,
            hidden: additionHidden
        };
        let _rowDeletion = rowDeletion;
        if (rowDeletion) {
            _rowDeletion = {
                onDelete: record => this.onDelete(record),
                getDisabledOfRow: randomRowDeletionDisable ? this.getDisabledOfRow : null
            };
        }

        return (
            <div>
                <Form className="demo-form" onSubmit={e => e.preventDefault()}>
                    <Form.Item label="addition" {...itemLayout}>
                        <Switch checked={addition} onChange={addition => this.setState({ addition })} />
                    </Form.Item>
                    <Form.Item label="addition.tip" {...itemLayout}>
                        <Input
                            value={additionTip}
                            onChange={e =>
                                this.setState({
                                    additionTip: e.target.value
                                })
                            }
                            type="input"
                        />
                    </Form.Item>
                    <Form.Item label="additionHidden" {...itemLayout}>
                        <Switch
                            checked={additionHidden}
                            onChange={additionHidden => this.setState({ additionHidden })}
                        />
                    </Form.Item>
                    <Form.Item label="rowDeletion" {...itemLayout}>
                        <Switch checked={rowDeletion} onChange={rowDeletion => this.setState({ rowDeletion })} />
                    </Form.Item>
                    <Form.Item label="rowDeletion.getDisabledOfRow" {...itemLayout}>
                        <Switch
                            checked={randomRowDeletionDisable}
                            onChange={randomRowDeletionDisable => this.setState({ randomRowDeletionDisable })}
                        />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <EditableTable
                        {...{
                            addition: _addition,
                            rowDeletion: _rowDeletion,
                            dataSource,
                            columns
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
| footer | `unknown` | `() => {}` | - |  |
| columns | `unknown` | - | ✅ |  |
| addition | `unknown` | `true` | - | 是否可添加（false 时禁用添加栏） |
| rowDeletion | `unknown` | `true` | - | 是否可删除（false 隐藏删除按钮） |
<!-- AUTO_END: props-table -->



<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>普通使用</summary>

```jsx
const { defaultProps } = EditableTable;

const columns = [
    {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
        width: 100,
        filter: {
            options: [1, 2, 3, 4]
        },
        order: true
    },
    {
        title: 'desc',
        dataIndex: 'desc',
        key: 'desc',
        filter: {
            options: [1, 2, 3, 4],
            multiple: true
        },
        order: true
    }
];
let uid = 0;

const generateData = ({ name, desc, deletable } = {}) => {
    const id = uid++;
    return {
        key: id + '',
        name: name || `name-${id}`,
        desc: desc || `desc-${id}`,
        deletable
    };
};
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addition: defaultProps.addition,
            additionTip: '',
            rowDeletion: defaultProps.rowDeletion,
            randomRowDeletionDisable: false,
            dataSource: []
        };
    }
    onDelete(record) {
        console.log('Delete', record);
        const key = record.key;
        const dataSource = this.state.dataSource.filter(item => item.key !== key);
        this.setState({ dataSource });
    }
    onAdd() {
        const dataSource = [...this.state.dataSource];
        dataSource.push(generateData());
        this.setState({ dataSource });
    }
    getDisabledOfRow(record) {
        return record.key % 2;
    }
    render() {
        const { addition, rowDeletion, additionTip, additionHidden, randomRowDeletionDisable, dataSource } = this.state;
        const itemLayout = {
            labelCol: {
                span: 3
            },
            controllerCol: {
                span: 9
            }
        };
        const _addition = {
            onAdd: () => this.onAdd(),
            tip: additionTip,
            disabled: !addition,
            hidden: additionHidden
        };
        let _rowDeletion = rowDeletion;
        if (rowDeletion) {
            _rowDeletion = {
                onDelete: record => this.onDelete(record),
                getDisabledOfRow: randomRowDeletionDisable ? this.getDisabledOfRow : null
            };
        }

        return (
            <div>
                <Form className="demo-form" onSubmit={e => e.preventDefault()}>
                    <Form.Item label="addition" {...itemLayout}>
                        <Switch checked={addition} onChange={addition => this.setState({ addition })} />
                    </Form.Item>
                    <Form.Item label="addition.tip" {...itemLayout}>
                        <Input
                            value={additionTip}
                            onChange={e =>
                                this.setState({
                                    additionTip: e.target.value
                                })
                            }
                            type="input"
                        />
                    </Form.Item>
                    <Form.Item label="additionHidden" {...itemLayout}>
                        <Switch
                            checked={additionHidden}
                            onChange={additionHidden => this.setState({ additionHidden })}
                        />
                    </Form.Item>
                    <Form.Item label="rowDeletion" {...itemLayout}>
                        <Switch checked={rowDeletion} onChange={rowDeletion => this.setState({ rowDeletion })} />
                    </Form.Item>
                    <Form.Item label="rowDeletion.getDisabledOfRow" {...itemLayout}>
                        <Switch
                            checked={randomRowDeletionDisable}
                            onChange={randomRowDeletionDisable => this.setState({ randomRowDeletionDisable })}
                        />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <EditableTable
                        {...{
                            addition: _addition,
                            rowDeletion: _rowDeletion,
                            dataSource,
                            columns
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
<summary>addition - 添加</summary>

```jsx
const list = [
    { label: 'false', props: false },
    { label: 'onAdd', props: { onAdd: () => console.log('onAdd') } },
    { label: 'tip', props: { tip: '自定义提示' } },
    { label: 'disabled', props: { disabled: true } },
    { label: 'disabledWithTip', props: { disabled: true, tip: '自定义提示' } },
    { label: 'hidden', props: { hidden: true } }
];

const columns = [
    {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
        width: 100,
        filter: {
            options: [1, 2, 3, 4]
        },
        order: true
    },
    {
        title: 'desc',
        dataIndex: 'desc',
        key: 'desc',
        filter: {
            options: [1, 2, 3, 4],
            multiple: true
        },
        order: true
    }
];

let uid = 0;

const generateData = ({ name, desc, deletable } = {}) => {
    const id = uid++;
    return {
        key: id + '',
        name: name || `name-${id}`,
        desc: desc || `desc-${id}`,
        deletable
    };
};
class InstanceDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new Array(2).fill(null).map((v, i) => generateData({ deletable: i % 2 }))
        };
    }
    handleDelete(record) {
        console.log('Remove', record);
        const { dataSource } = this.state;
        const key = record.key;
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    }
    handleAdd() {
        const { dataSource } = this.state;
        dataSource.push(generateData());
        this.setState({ dataSource });
    }
    render() {
        const { dataSource } = this.state;
        return (
            <EditableTable
                columns={columns}
                dataSource={dataSource}
                rowDeletion={{
                    onDelete: record => this.handleDelete(record)
                }}
                {...this.props}
            />
        );
    }
}

class Demo extends React.Component {
    render() {
        return (
            <div>
                {list.map(({ props, label }) => (
                    <div key={label}>
                        <h2>{label}</h2>
                        <div className="demo-wrap">
                            <InstanceDemo addition={props} />
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}
```

</details>

<details>
<summary>rowDeletion - 删除</summary>

```jsx
const list = [
    { label: 'false', props: false },
    { label: 'onDelete', props: { onDelete: () => console.log('onDelete') } },
    { label: 'getDisabledOfRow', props: { getDisabledOfRow: record => record.deletable === false } }
];

const columns = [
    {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
        width: 100,
        filter: {
            options: [1, 2, 3, 4]
        },
        order: true
    },
    {
        title: 'desc',
        dataIndex: 'desc',
        key: 'desc',
        filter: {
            options: [1, 2, 3, 4],
            multiple: true
        },
        order: true
    }
];

let uid = 0;

const generateData = ({ name, desc, deletable } = {}) => {
    const id = uid++;
    return {
        key: id + '',
        name: name || `name-${id}`,
        desc: desc || `desc-${id}`,
        deletable
    };
};
class InstanceDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new Array(10).fill(null).map((v, i) => generateData({ deletable: i % 2 }))
        };
    }
    handleDelete(record) {
        console.log('Remove', record);
        const { dataSource } = this.state;
        const key = record.key;
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    }
    handleAdd() {
        const { dataSource } = this.state;
        dataSource.push(generateData());
        this.setState({ dataSource });
    }
    render() {
        const { dataSource } = this.state;
        return (
            <EditableTable
                columns={columns}
                dataSource={dataSource}
                rowDeletion={{
                    onDelete: record => this.handleDelete(record)
                }}
                {...this.props}
            />
        );
    }
}

class Demo extends React.Component {
    render() {
        return (
            <div>
                {list.map(({ props, label }) => (
                    <div key={label}>
                        <h2>{label}</h2>
                        <div className="demo-wrap">
                            <InstanceDemo rowDeletion={props} />
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}
```

</details>

<details>
<summary>样例演示</summary>

```jsx
const columns = [
    {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
        width: 100,
        filter: {
            options: [1, 2, 3, 4]
        },
        order: true
    },
    {
        title: 'desc',
        dataIndex: 'desc',
        key: 'desc',
        filter: {
            options: [1, 2, 3, 4],
            multiple: true
        },
        order: true
    }
];

let uid = 0;

const generateData = ({ name, desc, deletable } = {}) => {
    const id = uid++;
    return {
        key: id + '',
        name: name || `name-${id}`,
        desc: desc || `desc-${id}`,
        deletable
    };
};

class Demo1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [
                generateData({ desc: '默认数据，不能删除', deletable: false }),
                generateData({ desc: '默认数据，不能删除', deletable: false })
            ]
        };
    }
    handleDelete(record) {
        console.log('Remove', record);
        const { dataSource } = this.state;
        const key = record.key;
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    }
    handleAdd() {
        const { dataSource } = this.state;
        dataSource.push(generateData());
        this.setState({ dataSource });
    }
    render() {
        const { dataSource } = this.state;
        return (
            <EditableTable
                columns={columns}
                dataSource={dataSource}
                addition={{ onAdd: () => this.handleAdd() }}
                rowDeletion={{
                    onDelete: record => this.handleDelete(record),
                    getDisabledOfRow: record => record.deletable === false
                }}
            />
        );
    }
}
class Demo2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        };
    }
    handleDelete(record) {
        console.log('Remove', record);
        const { dataSource } = this.state;
        const key = record.key;
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    }
    handleAdd() {
        const { dataSource } = this.state;
        dataSource.push(generateData());
        this.setState({ dataSource });
    }
    render() {
        const { dataSource } = this.state;
        return (
            <EditableTable
                columns={columns}
                dataSource={dataSource}
                addition={{
                    onAdd: () => this.handleAdd(),
                    disabled: dataSource.length >= 5,
                    tip: dataSource.length >= 5 ? '太多了，不能再来了' : '还能再来点'
                }}
                rowDeletion={{
                    onDelete: record => this.handleDelete(record)
                }}
            />
        );
    }
}

const { formDecorator, controllerDecorator, formShape } = ZForm;
const ZInput = controllerDecorator({
    initialValue: ''
})(Input);
const ZSelect = controllerDecorator()(Select);
const tags = ['tag1', 'tag2', 'tag3'].map(v => ({ value: v, label: `tag-${v}` }));

const renderError = (error, key) => {
    const e = _.get(error, key);
    return e ? <p>{e.join(',')}</p> : null;
};

class Demo3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        };
        this.savePopupContainer = this.savePopupContainer.bind(this);
        this.getPopupContainer = this.getPopupContainer.bind(this);
    }
    handleSubmit() {
        const form = this.props.form;
        form.validateFields((error, value) => {
            if (!error) {
                console.log((value.data || []).filter(v => v));
            }
        });
    }
    handleDelete(record) {
        console.log('Remove', record);
        const { dataSource } = this.state;
        const key = record.key;
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    }
    handleAdd() {
        const { dataSource } = this.state;
        dataSource.push(generateData());
        this.setState({ dataSource });
    }
    savePopupContainer(_ref) {
        this.popupContainer = _ref;
    }
    getPopupContainer() {
        return this.popupContainer;
    }
    render() {
        const { form } = this.props;
        const { dataSource } = this.state;
        const originErrors = form.getFieldsError() || [];
        const columnsForDemo3 = [
            {
                title: 'name',
                dataIndex: 'name',
                key: 'name',
                width: 100,
                render(value, record) {
                    return (
                        <div>
                            <ZInput size="sm" zName={`data.${record.key}.name`} />
                            {renderError(originErrors, `data.${record.key}.name`)}
                        </div>
                    );
                }
            },
            {
                title: 'desc',
                dataIndex: 'desc',
                key: 'desc',
                render(value, record) {
                    return (
                        <div>
                            <ZInput size="sm" zName={`data.${record.key}.desc`} />
                            {renderError(originErrors, `data.${record.key}.desc`)}
                        </div>
                    );
                }
            },
            {
                title: 'tag',
                dataIndex: 'tag',
                key: 'tag',
                render: (value, record) => {
                    return (
                        <div>
                            <ZSelect
                                size="sm"
                                zName={`data.${record.key}.tag`}
                                zOptions={{
                                    rules: [{ required: true }]
                                }}
                                options={tags}
                                multiple
                                search
                                popoverProps={{
                                    getPopupContainer: this.getPopupContainer
                                }}
                            />
                            {renderError(originErrors, `data.${record.key}.tag`)}
                        </div>
                    );
                }
            }
        ];
        return (
            <div>
                <div ref={this.savePopupContainer}></div>
                <ZForm form={form}>
                    <EditableTable
                        columns={columnsForDemo3}
                        dataSource={dataSource}
                        addition={{
                            onAdd: () => this.handleAdd()
                        }}
                        rowDeletion={{
                            onDelete: record => this.handleDelete(record)
                        }}
                    />
                    <div style={{ textAlign: 'center' }}>
                        <Button styleType="primary" onClick={() => this.handleSubmit()}>
                            submit
                        </Button>
                    </div>
                </ZForm>
            </div>
        );
    }
}
Demo3.propTypes = {
    form: formShape
};
const Demo3WithForm = formDecorator()(Demo3);
const Demo = () => {
    return (
        <div>
            <h2>存在默认数据，且默认数据不可删除</h2>
            <div className="demo-wrap">
                <Demo1 />
            </div>
            <h2>只能添加有限数据</h2>
            <div className="demo-wrap">
                <Demo2 />
            </div>
            <h2>组合 ZForm 表单</h2>
            <div className="demo-wrap">
                <Demo3WithForm />
            </div>
        </div>
    );
};
```

</details>

<!-- AUTO_END: demos -->

<!-- MANUAL_START: best-practices -->
## 最佳实践

1. **确保每行有唯一 key**：数据中必须有唯一的 key 字段
2. **添加行时生成唯一 key**：使用时间戳或 UUID 作为新行的 key
3. **条件禁用删除**：使用 `getDisabledOfRow` 保护不可删除的行
<!-- MANUAL_END: best-practices -->

<!-- MANUAL_START: faq -->
## 常见问题

### Q: 如何限制最大行数？

A: 通过 `addition.disabled` 控制，当达到最大行数时禁用添加按钮。
<!-- MANUAL_END: faq -->

<!-- MANUAL_START: critical -->
## 注意事项

_（待补充）_
<!-- MANUAL_END: critical -->
