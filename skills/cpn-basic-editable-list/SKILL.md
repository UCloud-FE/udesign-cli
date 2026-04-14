---
name: cpn-basic-editable-list
description: 帮助 AI 正确使用 UDesign EditableList 组件（可编辑列表组件）。当需要使用 EditableList 时加载此技能。
---

# 使用 EditableList 组件

<!-- MANUAL_START: overview -->
## 技能概述

这是 EditableList 可编辑列表组件
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { EditableList } from '@ucloud-fe/react-components';
```

> ⚠️ **全局规范 - 所有组件通用**:
> - 生成纯 JavaScript (JSX) 代码，**不要使用 TypeScript 类型注解**
> - **禁止**使用 `@alicloud/*`、`@aliyun/*`、`antd` 等外部组件库
> - 优先使用 UDesign 组件，不要用 HTML 原生标签替代
<!-- AUTO_END: import -->

<!-- AUTO_START: basic-usage -->
### 基本用法

```jsx
const { defaultProps } = EditableList;

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
            itemDeletion: defaultProps.itemDeletion,
            randomRowDeletionDisable: false,
            dataSource: [],
            size: defaultProps.size
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
    renderItem(item) {
        const { size } = this.state;
        return <Input defaultValue={item.name} size={size} />;
    }

    getDisabledOfItem(record) {
        return record.key % 2;
    }
    render() {
        const { addition, itemDeletion, randomRowDeletionDisable, dataSource, grid, size } = this.state;
        const itemLayout = {
            labelCol: {
                span: 3
            },
            controllerCol: {
                span: 9
            }
        };
        let _addition = addition,
            _itemDeletion = itemDeletion;
        if (addition) {
            _addition = {
                onAdd: () => this.onAdd()
            };
        }
        if (itemDeletion) {
            _itemDeletion = {
                onDelete: record => this.onDelete(record),
                getDisabledOfItem: randomRowDeletionDisable ? this.getDisabledOfItem : null
            };
        }

        return (
            <div>
                <Form className="demo-form" onSubmit={e => e.preventDefault()}>
                    <Form.Item label="addition" {...itemLayout}>
                        <Switch checked={addition} onChange={addition => this.setState({ addition })} />
                    </Form.Item>
                    <Form.Item label="itemDeletion" {...itemLayout}>
                        <Switch checked={itemDeletion} onChange={itemDeletion => this.setState({ itemDeletion })} />
                    </Form.Item>
                    <Form.Item label="itemDeletion.getDisabledOfItem" {...itemLayout}>
                        <Switch
                            checked={randomRowDeletionDisable}
                            onChange={randomRowDeletionDisable => this.setState({ randomRowDeletionDisable })}
                        />
                    </Form.Item>
                    <Form.Item label="grid" {...itemLayout}>
                        <Switch checked={grid} onChange={grid => this.setState({ grid })} />
                    </Form.Item>
                    <Form.Item label="size" {...itemLayout}>
                        <Radio.Group
                            options={SizeInterface.map(v => ({ value: v, lable: v }))}
                            onChange={size => this.setState({ size })}
                            value={size}
                        ></Radio.Group>
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <EditableList
                        {...{
                            addition: _addition,
                            itemDeletion: _itemDeletion,
                            grid: grid ? {} : null,
                            dataSource,
                            size,
                            renderItem: item => this.renderItem(item)
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
| dataSource | `unknown` | - | - | 数据列表 |
| renderItem | `unknown` | - | - | 数据渲染 |
| grid | `unknown` | - | - | 使用 grid 布局 |
| size | `unknown` | `'md'` | - | 自带控件尺寸 |
| addition | `unknown` | `true` | - | 是否可添加（false 时禁用添加栏） |
| itemDeletion | `unknown` | `true` | - | 是否可删除（false 隐藏删除按钮） |
| locale | `unknown` | - | - |  |
<!-- AUTO_END: props-table -->



<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>普通使用</summary>

```jsx
const { defaultProps } = EditableList;

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
            itemDeletion: defaultProps.itemDeletion,
            randomRowDeletionDisable: false,
            dataSource: [],
            size: defaultProps.size
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
    renderItem(item) {
        const { size } = this.state;
        return <Input defaultValue={item.name} size={size} />;
    }

    getDisabledOfItem(record) {
        return record.key % 2;
    }
    render() {
        const { addition, itemDeletion, randomRowDeletionDisable, dataSource, grid, size } = this.state;
        const itemLayout = {
            labelCol: {
                span: 3
            },
            controllerCol: {
                span: 9
            }
        };
        let _addition = addition,
            _itemDeletion = itemDeletion;
        if (addition) {
            _addition = {
                onAdd: () => this.onAdd()
            };
        }
        if (itemDeletion) {
            _itemDeletion = {
                onDelete: record => this.onDelete(record),
                getDisabledOfItem: randomRowDeletionDisable ? this.getDisabledOfItem : null
            };
        }

        return (
            <div>
                <Form className="demo-form" onSubmit={e => e.preventDefault()}>
                    <Form.Item label="addition" {...itemLayout}>
                        <Switch checked={addition} onChange={addition => this.setState({ addition })} />
                    </Form.Item>
                    <Form.Item label="itemDeletion" {...itemLayout}>
                        <Switch checked={itemDeletion} onChange={itemDeletion => this.setState({ itemDeletion })} />
                    </Form.Item>
                    <Form.Item label="itemDeletion.getDisabledOfItem" {...itemLayout}>
                        <Switch
                            checked={randomRowDeletionDisable}
                            onChange={randomRowDeletionDisable => this.setState({ randomRowDeletionDisable })}
                        />
                    </Form.Item>
                    <Form.Item label="grid" {...itemLayout}>
                        <Switch checked={grid} onChange={grid => this.setState({ grid })} />
                    </Form.Item>
                    <Form.Item label="size" {...itemLayout}>
                        <Radio.Group
                            options={SizeInterface.map(v => ({ value: v, lable: v }))}
                            onChange={size => this.setState({ size })}
                            value={size}
                        ></Radio.Group>
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <EditableList
                        {...{
                            addition: _addition,
                            itemDeletion: _itemDeletion,
                            grid: grid ? {} : null,
                            dataSource,
                            size,
                            renderItem: item => this.renderItem(item)
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
    { label: 'disabled', props: { disabled: true, onAdd: () => console.log('onAdd') } }
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

const dataSource = [generateData(), generateData()];

const renderItem = item => {
    return <Input defaultValue={item.name} />;
};

class InstanceDemo extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <EditableList renderItem={renderItem} {...this.props} />;
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
                            <InstanceDemo addition={props} dataSource={[]} />
                        </div>
                        <div className="demo-wrap">
                            <InstanceDemo addition={props} dataSource={dataSource} />
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
<summary>itemDeletion - 项删除</summary>

```jsx
const list = [
    { label: 'false', props: false },
    { label: 'onDelete', props: { onDelete: () => console.log('onDelete') } },
    {
        label: 'getDisabledOfItem',
        props: { onDelete: () => console.log('onDelete'), getDisabledOfItem: record => record.key % 2 }
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

const dataSource = [generateData(), generateData(), generateData(), generateData(), generateData()];

const renderItem = item => {
    return <Input defaultValue={item.name} />;
};

class InstanceDemo extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <EditableList renderItem={renderItem} {...this.props} />;
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
                            <InstanceDemo itemDeletion={props} dataSource={dataSource} />
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
<summary>grid - 布局</summary>

```jsx
const list = [
    { label: 'default', props: {} },
    { label: 'default grid', props: { grid: {} } },
    {
        label: 'custom grid',
        props: {
            grid: {
                itemCol: {
                    offset: 1,
                    span: 3
                },
                actionCol: {
                    span: 3
                }
            }
        }
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

const dataSource = [generateData(), generateData(), generateData(), generateData(), generateData()];

const renderItem = item => {
    return <Input defaultValue={item.name} />;
};

class InstanceDemo extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <EditableList renderItem={renderItem} {...this.props} />;
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
                            <InstanceDemo {...props} dataSource={dataSource} />
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
<summary>size - 空间尺寸</summary>

```jsx
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

const dataSource = [generateData(), generateData()];

const renderItem = (item, size) => {
    return <Input defaultValue={item.name} size={size} />;
};

class InstanceDemo extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <EditableList renderItem={item => renderItem(item, this.props.size)} {...this.props} />;
    }
}
InstanceDemo.propTypes = {
    size: PropTypes.string
};

class Demo extends React.Component {
    render() {
        return (
            <div>
                {SizeInterface.map(size => (
                    <div key={size}>
                        <h2>size: {size}</h2>
                        <div className="demo-wrap">
                            <InstanceDemo size={size} dataSource={[]} />
                        </div>
                        <div className="demo-wrap">
                            <InstanceDemo size={size} dataSource={dataSource} />
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
<summary>demo - 案例演示</summary>

```jsx
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

const renderItem = item => {
    return <Input defaultValue={item.name} />;
};

class Demo1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [
                generateData({ name: '默认数据，不能删除', deletable: false }),
                generateData({ name: '默认数据，不能删除', deletable: false })
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
            <EditableList
                renderItem={renderItem}
                dataSource={dataSource}
                addition={{ onAdd: () => this.handleAdd() }}
                itemDeletion={{
                    onDelete: record => this.handleDelete(record),
                    getDisabledOfItem: record => record.deletable === false
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
            <EditableList
                renderItem={renderItem}
                dataSource={dataSource}
                addition={{
                    onAdd: () => this.handleAdd(),
                    disabled: dataSource.length >= 5
                }}
                itemDeletion={{
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

const renderError = (error, key) => {
    const e = _.get(error, key);
    return e ? <p style={{ color: 'red' }}>{e.join(',')}</p> : null;
};

class Demo3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        };
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
    renderItem(item, originErrors) {
        return (
            <div>
                <ZInput
                    zName={`data.${item.key}.name`}
                    zOptions={{ rules: [{ required: true }], initialValue: item.name || '' }}
                />
                {renderError(originErrors, `data.${item.key}.name`)}
            </div>
        );
    }
    render() {
        const { form } = this.props;
        const { dataSource } = this.state;
        const originErrors = form.getFieldsError() || [];

        return (
            <div>
                <ZForm form={form}>
                    <EditableList
                        renderItem={item => this.renderItem(item, originErrors)}
                        dataSource={dataSource}
                        addition={{
                            onAdd: () => this.handleAdd()
                        }}
                        itemDeletion={{
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
