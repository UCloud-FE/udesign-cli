---
name: cpn-basic-select
description: 帮助 AI 正确使用 UDesign Select 组件（组件）。当需要使用 Select 时加载此技能。
---

# 使用 Select 组件

<!-- MANUAL_START: overview -->
## 技能概述

这是 Select 组件
默认的弹出层容器为 forwardPopupContainer={triggerNode => triggerNode.parentNode}，默认会查找上层的建议容器
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { Select } from '@ucloud-fe/react-components';
```

> ⚠️ **全局规范 - 所有组件通用**:
> - 生成纯 JavaScript (JSX) 代码，**不要使用 TypeScript 类型注解**
> - **禁止**使用 `@alicloud/*`、`@aliyun/*`、`antd` 等外部组件库
> - 优先使用 UDesign 组件，不要用 HTML 原生标签替代
<!-- AUTO_END: import -->

<!-- AUTO_START: basic-usage -->
### 基本用法

```jsx
const { Option } = Select;

class Demo extends React.Component {
    render() {
        return (
            <div>
                <Select defaultValue={1} onChange={v => console.log(v)}>
                    <Option value={1}>1</Option>
                    <Option value={'disable'} disabled>
                        disable
                    </Option>
                    <Option value={2}>2</Option>
                    <Option value={3}>3</Option>
                </Select>
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
| autoClearSearchValue | `boolean` | - | - | 是否自动清除搜索值，仅在多选搜索时生效，默认值为 false |
| value | `string | number | Key[]` | - | - | 当前值，controlled |
| defaultValue | `string | number | Key[]` | - | - | 默认值，uncontrolled |
| placeholder | `any` | - | - | 无选项时显示内容 |
| onChange | `(value: Key | Key[] | undefined) => void` | - | - | 修改、清空时的回调，清空时回调值单选为 undefined、du px aun |
| options | `{ label?: ReactNode; value: Key; }[]` | - | - | 快速设置选项，推荐使用以获得更好的性能 |
| extra | `any` | - | - | 在尾部增加附加内容，会脱离选项流容器，超高度时不会一起滚动，如需在选项中嵌入附加内容，可使用 Select.Extra |
| multiple | `boolean` | - | - | 是否多选 |
| showSelectAll | `boolean` | - | - | 是否显示全选 |
| disabled | `boolean` | - | - | 是否禁用 |
| styleType | `"list"` | - | - | 样式风格 |
| renderContent | `(value?: Key | Key[], valueChild?: ReactNode[]) => ReactNode` | - | - | 如何渲染选中项的展示 |
| renderSelector | `(content: ReactNode, visible: boolean) => ReactNode` | - | - | 自定义渲染选择器 |
| renderPopup | `(options: { handleVisible: (visible: boolean) => void; onChange: (v: Key | Key[]) => void; value?: Key | Key[]; children?: ReactNode; } & Pick<SelectProps, "multiple" | "extra" | "search" | "options" | "autoClearSearchValue">) => ReactNode` | - | - | 自定义渲染弹出内容 |
| search | `true | { handleSearch?: (searchValue: string, value: Key, s: any) => boolean; searchValue?: string; defaultSearchValue?: string; onSearchValueChange?: (searchValue: string) => void; }` | - | - | - 是否展示搜索框，可以为 true 或者 Object - 为 Object 时可传入 handleSearch 对搜索筛选进行自定义 |
| size | `"sm" | "md" | "lg"` | `'md'` | - | 尺寸 |
| status | `string` | - | - | 状态 |
| block | `boolean` | - | - | 展示变更为块占位 |
| clearable | `boolean` | - | - | 是否可清空，仅单选可用 |
| ~~popover~~ ⚠️ | `any` | - | - | 弹出层的popover props **(已废弃: 请使用popoverProps替换)** |
| popoverProps | `any` | - | - | 弹出层的popover props |
| customStyle | `{ optionListMaxHeight?: number | string; popupMaxWidth?: string; popupWidth?: string; }` | `{}` | - | 自定义样式 |
| tagListCustomStyle | `any` | - | - | 自定义styleType 'list'时Tag的样式 |
| emptyContent | `any` | - | - | 可选性为空时展示内容 |
| virtualList | `false | true | { simple?: true; height?: number; }` | - | - | 启用虚拟列表，仅使用 options 时生效 |
<!-- AUTO_END: props-table -->



<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>演示</summary>

```jsx
const { Option, Size } = Select;

const simpleOptions = new Array(100).fill(null).map((v, i) => ({ key: i, value: `option-${i}` }));
const labelOptions = new Array(100).fill(null).map((v, i) => ({ key: i, value: `option-${i}`, label: `label ${i}` }));
const spanLabelOptions = new Array(100)
    .fill(null)
    .map((v, i) => ({ key: i, value: `option-${i}`, label: <span style={{ color: 'red' }}>{`label ${i}`}</span> }));
const childrenOptions = new Array(100).fill(null).map((v, i) => (
    <Option value={i} key={i}>
        The option {i}
    </Option>
));

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 'md',
            placeholder: 'placeholder',
            multiple: true,
            showSelectAll: true,
            disabled: false,
            search: false,
            block: false,
            optionType: 'simple',
            width: 'default',
            styleType: 'default',
            error: 'default',
            autoClearSearchValue: false
        };
    }
    render() {
        const {
            value,
            size,
            placeholder,
            multiple,
            showSelectAll,
            disabled,
            search,
            optionType,
            width,
            clearable,
            block,
            styleType,
            error,
            autoClearSearchValue
        } = this.state;
        const itemLayout = {
            labelCol: {
                span: 3
            },
            controllerCol: {
                span: 9
            }
        };
        const optionProps =
            optionType === 'simple'
                ? { options: simpleOptions }
                : optionType === 'label'
                ? { options: labelOptions }
                : optionType === 'spanLabel'
                ? { options: spanLabelOptions }
                : optionType === 'empty'
                ? {}
                : { children: childrenOptions };

        const widthProps = width === 'width: 500px' ? { style: { width: '500px' } } : {};
        const props = {};
        if (styleType !== 'default') {
            props.styleType = styleType;
        }
        return (
            <div>
                <Form className="demo-form">
                    <Form.Item label="size" {...itemLayout}>
                        <Radio.Group
                            value={size}
                            onChange={size => this.setState({ size })}
                            options={Size.map(size => ({ value: size }))}
                        />
                    </Form.Item>
                    <Form.Item label="option type" {...itemLayout}>
                        <Radio.Group
                            value={optionType}
                            onChange={optionType => this.setState({ optionType })}
                            options={['simple', 'label', 'spanLabel', 'children', 'empty'].map(type => ({
                                value: type
                            }))}
                        />
                    </Form.Item>
                    <Form.Item label="width" {...itemLayout}>
                        <Radio.Group
                            value={width}
                            onChange={width => this.setState({ width })}
                            options={['default', 'width: 500px'].map(v => ({ value: v }))}
                        />
                    </Form.Item>
                    <Form.Item label="styleType" {...itemLayout}>
                        <Radio.Group
                            value={styleType}
                            onChange={styleType => this.setState({ styleType })}
                            options={['default', 'list'].map(v => ({ value: v }))}
                        />
                    </Form.Item>
                    <Form.Item label="placeholder" {...itemLayout}>
                        <Input value={placeholder} onChange={e => this.setState({ placeholder: e.target.value })} />
                    </Form.Item>
                    <Form.Item label="multiple" {...itemLayout}>
                        <Switch
                            checked={multiple}
                            onChange={multiple => this.setState({ multiple, value: multiple ? [] : undefined })}
                        />
                    </Form.Item>
                    <Form.Item label="showSelectAll" {...itemLayout}>
                        <Switch checked={showSelectAll} onChange={showSelectAll => this.setState({ showSelectAll })} />
                    </Form.Item>
                    <Form.Item label="block" {...itemLayout}>
                        <Switch checked={block} onChange={block => this.setState({ block })} />
                    </Form.Item>
                    <Form.Item label="disabled" {...itemLayout}>
                        <Switch checked={disabled} onChange={disabled => this.setState({ disabled })} />
                    </Form.Item>
                    <Form.Item label="search" {...itemLayout}>
                        <Switch checked={search} onChange={search => this.setState({ search })} />
                    </Form.Item>
                    <Form.Item label="clearable" {...itemLayout}>
                        <Switch checked={clearable} onChange={clearable => this.setState({ clearable })} />
                    </Form.Item>
                    <Form.Item label="status-error" {...itemLayout}>
                        <Switch
                            checked={error === 'default' ? false : true}
                            onChange={error => this.setState({ error: error ? 'error' : 'default' })}
                        />
                    </Form.Item>
                    <Form.Item label="autoClearSearchValue" {...itemLayout}>
                        <Switch
                            checked={autoClearSearchValue}
                            onChange={autoClearSearchValue => this.setState({ autoClearSearchValue })}
                        />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Select
                        value={value}
                        onChange={v => this.setState({ value: v })}
                        size={size}
                        placeholder={placeholder}
                        multiple={multiple}
                        showSelectAll={showSelectAll}
                        disabled={disabled}
                        clearable={clearable}
                        block={block}
                        status={error}
                        autoClearSearchValue={autoClearSearchValue}
                        {...widthProps}
                        {...optionProps}
                        {...(search ? { search } : {})}
                        {...props}
                    />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>defaultValue - 默认值 （非受控）</summary>

```jsx
const { Option } = Select;

class Demo extends React.Component {
    render() {
        return (
            <div>
                <Select defaultValue={1} onChange={v => console.log(v)}>
                    <Option value={1}>1</Option>
                    <Option value={'disable'} disabled>
                        disable
                    </Option>
                    <Option value={2}>2</Option>
                    <Option value={3}>3</Option>
                </Select>
            </div>
        );
    }
}
```

</details>

<details>
<summary>multiple - 多选</summary>

```jsx
const { Option } = Select;

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: [1, 2]
        };
    }
    render() {
        const { value } = this.state;
        return (
            <div>
                <Select
                    value={value}
                    multiple
                    search
                    onChange={v => {
                        console.log(v);

                        this.setState({ value: v });
                    }}
                >
                    <Option value={1}>test option 1</Option>
                    <Option value={'disable'} disabled>
                        disable
                    </Option>
                    <Option value={2}>test option 2</Option>
                    <Option value={3}>test option 3</Option>
                    <Option value={4}>test option 4</Option>
                    <Option value={5}>test option 5</Option>
                    <Option value={6}>test option 6</Option>
                    <Option value={7}>test option 7</Option>
                    <Option value={8}>test option 8</Option>
                    <Option value={9}>test option 9</Option>
                    <Option value={10}>test option 10</Option>
                </Select>
            </div>
        );
    }
}
```

</details>

<details>
<summary>autoClearSearchValue - 多选场景选择后自动清除搜索文本</summary>

```jsx
const { Option } = Select;

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: []
        };
    }
    render() {
        const { value } = this.state;
        return (
            <div>
                <Select
                    value={value}
                    multiple
                    search
                    autoClearSearchValue
                    onChange={v => {
                        console.log(v);
                        this.setState({ value: v });
                    }}
                >
                    <Option value={1}>test option 1</Option>
                    <Option value={'disable'} disabled>
                        disable
                    </Option>
                    <Option value={2}>test option 2</Option>
                    <Option value={3}>test option 3</Option>
                    <Option value={4}>test option 4</Option>
                    <Option value={5}>test option 5</Option>
                    <Option value={6}>test option 6</Option>
                    <Option value={7}>test option 7</Option>
                    <Option value={8}>test option 8</Option>
                    <Option value={9}>test option 9</Option>
                    <Option value={10}>test option 10</Option>
                </Select>
            </div>
        );
    }
}
```

</details>

<details>
<summary>disabled - 禁用</summary>

```jsx
const { Option } = Select;

class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Select defaultValue={1} disabled>
                        <Option value={1}>1</Option>
                        <Option value={2}>2</Option>
                        <Option value={3}>3</Option>
                    </Select>
                </div>
                <div className="demo-wrap">
                    <Select defaultValue={1}>
                        <Option value={1}>1</Option>
                        <Option value={2} disabled>
                            2
                        </Option>
                        <Option value={3}>3</Option>
                    </Select>
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>extra - 附加内容</summary>

```jsx
const { Option, Extra } = Select;

class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Select
                        multiple
                        showSelectAll
                        search
                        extra={{
                            autoHidePopup: true,
                            content: (
                                <Button style={{ width: '100%' }} styleType="primary" onClick={() => console.log(123)}>
                                    插入按钮
                                </Button>
                            )
                        }}
                        onChange={console.log}
                    >
                        <Option value={1}>1</Option>
                        <Option value={'disable'} disabled>
                            disable
                        </Option>
                        <Option value={2}>2</Option>
                        <Option value={3}>3</Option>
                    </Select>
                </div>
                <div className="demo-wrap">
                    <Select
                        multiple
                        showSelectAll
                        search
                        onChange={console.log}
                        options={[1, 2, 3].map(v => ({ value: v, label: v + '' }))}
                        extra={hide => {
                            return (
                                <div>
                                    <Button onClick={() => console.log(123)}>xxx</Button>
                                    <Button onClick={hide}>hide</Button>
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
<summary>renderSelector - 自定义渲染选择器</summary>

```jsx
const { Option } = Select;

class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Select
                        defaultValue={1}
                        renderSelector={(c, v) => <Button icon={v ? 'search' : 'check'}>{c}</Button>}
                    >
                        <Option value={1}>一</Option>
                        <Option value={2}>二</Option>
                        <Option value={3}>三</Option>
                    </Select>
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>renderContent - 如何渲染选中项的展示</summary>

```jsx
const { Option } = Select;

class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Select defaultValue={1} renderContent={v => <span style={{ color: 'red' }}>{v}</span>}>
                        <Option value={1}>一</Option>
                        <Option value={2}>二</Option>
                        <Option value={3}>三</Option>
                    </Select>
                </div>
                <div className="demo-wrap">
                    <Select
                        multiple
                        defaultValue={[1, 2, 3, 4, 5, 6, 7]}
                        renderContent={v => <span style={{ color: 'red' }}>{v}</span>}
                    >
                        <Option value={1}>一</Option>
                        <Option value={2}>二</Option>
                        <Option value={3}>三</Option>
                        <Option value={4}>四</Option>
                        <Option value={5}>五</Option>
                        <Option value={6}>六</Option>
                        <Option value={7}>七</Option>
                    </Select>
                </div>
                <div className="demo-wrap">
                    <Select
                        multiple
                        styleType="list"
                        defaultValue={[1, 2, 3]}
                        renderContent={v => <span style={{ color: 'red' }}>{v}</span>}
                    >
                        <Option value={1}>
                            <span style={{ color: 'orange' }}>
                                一<br />
                                另一行
                            </span>
                        </Option>
                        <Option value={2}>二</Option>
                        <Option value={3}>三</Option>
                    </Select>
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>renderPopup - 自定义渲染弹出内容</summary>

```jsx
const options = new Array(10).fill(0).map((v, i) => ({ value: i, label: `option ${i}` }));

class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Select
                        onChange={console.log}
                        renderPopup={({ handleVisible, onChange, value }) => (
                            <Card style={{ width: 220 }}>
                                <Card.Content>
                                    <Radio.Group
                                        value={value}
                                        options={options}
                                        onChange={v => {
                                            handleVisible(false);
                                            onChange(v);
                                        }}
                                    />
                                </Card.Content>
                            </Card>
                        )}
                        renderContent={value => (value != null ? `option ${value}` : '请选择')}
                    />
                </div>
                <div className="demo-wrap">
                    <Select
                        onChange={console.log}
                        renderPopup={({ onChange, value }) => (
                            <Card style={{ width: 200 }}>
                                <Card.Content>
                                    <Checkbox.Group value={value} options={options} onChange={onChange} />
                                </Card.Content>
                            </Card>
                        )}
                        renderContent={value =>
                            value && value.length ? value.map(v => `option ${v}`).join(',') : '请选择'
                        }
                    />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>search - 是否展示搜索框</summary>

```jsx
const { Option } = Select;

const Demo = () => {
    const [searchValue, setSearchValue] = React.useState('1');
    const handleSearchChange = React.useCallback(v => {
        Math.random() > 0.5 && setSearchValue(v);
    }, []);
    return (
        <div>
            <div className="demo-wrap">
                <Select defaultValue={1} search>
                    <Option value={1}>1</Option>
                    <Option value={2}>2</Option>
                    <Option value={3}>3</Option>
                </Select>
            </div>
            <h2>自定义搜索</h2>
            <div className="demo-wrap">
                <Select defaultValue={1} search={{ handleSearch: (s, v) => v < s }}>
                    <Option value={1}>1</Option>
                    <Option value={2}>2</Option>
                    <Option value={3}>3</Option>
                </Select>
            </div>
            <h2>搜索值受控</h2>
            <div className="demo-wrap">
                <Select
                    defaultValue={1}
                    search={{ handleSearch: (s, v) => v < s, onSearchValueChange: handleSearchChange, searchValue }}
                >
                    <Option value={1}>1</Option>
                    <Option value={2}>2</Option>
                    <Option value={3}>3</Option>
                </Select>
            </div>
            <h2>options search</h2>
            <div className="demo-wrap">
                <Select
                    search
                    options={new Array(100).fill(null).map((v, i) => ({ value: i, label: `option ${i}` }))}
                ></Select>
            </div>
        </div>
    );
};
```

</details>

<details>
<summary>size - 尺寸</summary>

```jsx
const { Option } = Select;

class Demo extends React.Component {
    render() {
        const Size = Select.Size;
        return (
            <div>
                {Size.map(size => (
                    <div className="demo-wrap" key={size}>
                        <Select defaultValue={1} size={size}>
                            <Option value={1}>1</Option>
                            <Option value={2}>2</Option>
                            <Option value={3}>3</Option>
                        </Select>
                    </div>
                ))}
            </div>
        );
    }
}
```

</details>

<details>
<summary>block</summary>

```jsx
const { Option } = Select;

class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Select defaultValue={1}>
                        <Option value={1}>1</Option>
                        <Option value={2}>2</Option>
                        <Option value={3}>3</Option>
                    </Select>
                </div>
                <div className="demo-wrap">
                    <Select defaultValue={1} block>
                        <Option value={1}>1</Option>
                        <Option value={2}>2</Option>
                        <Option value={3}>3</Option>
                    </Select>
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>showSelectAll - 全选</summary>

```jsx
const { Option } = Select;

class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Select multiple showSelectAll onChange={console.log}>
                        <Option value={1}>1</Option>
                        <Option value={'disable'} disabled>
                            disable
                        </Option>
                        <Option value={2}>2</Option>
                        <Option value={3}>3</Option>
                    </Select>
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>popoverProps - 弹出层的 popover props</summary>

```jsx
const { Option } = Select;

class Demo extends React.Component {
    render() {
        const placements = ['bottomLeft', 'leftTop', 'topRight'];
        return (
            <div>
                {placements.map(placement => (
                    <div className="demo-wrap" key={placement}>
                        <Select defaultValue={1} popoverProps={{ placement }}>
                            <Option value={1}>1</Option>
                            <Option value={2}>2</Option>
                            <Option value={3}>3</Option>
                        </Select>
                    </div>
                ))}
            </div>
        );
    }
}
```

</details>

<details>
<summary>emptyContent - 空数据提示</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Select multiple showSelectAll onChange={console.log} />
                </div>
                <div className="demo-wrap">
                    <Select
                        multiple
                        showSelectAll
                        search
                        onChange={console.log}
                        extra={{
                            autoHidePopup: true,
                            content: (
                                <Button style={{ width: '100%' }} styleType="primary" onClick={() => console.log(123)}>
                                    插入按钮
                                </Button>
                            )
                        }}
                    />
                </div>
                <div className="demo-wrap">
                    <Select
                        multiple
                        showSelectAll
                        search
                        onChange={console.log}
                        emptyContent={
                            <div style={{ height: 100, textAlign: 'center', background: 'gray' }}>么数据啊</div>
                        }
                        extra={{
                            autoHidePopup: true,
                            content: (
                                <Button style={{ width: '100%' }} styleType="primary" onClick={() => console.log(123)}>
                                    插入按钮
                                </Button>
                            )
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
<summary>customStyle - 可自定义样式</summary>

```jsx
const { Option } = Select;

class Demo extends React.Component {
    render() {
        return (
            <div>
                <h3>optionListMaxHeight</h3>
                <div className="demo-wrap">
                    <Select
                        multiple
                        showSelectAll
                        search
                        onChange={console.log}
                        customStyle={{ optionListMaxHeight: 100 }}
                    >
                        {new Array(100).fill(null).map((v, i) => (
                            <Option key={i} value={`v_${i}`}>
                                option{i}
                            </Option>
                        ))}
                    </Select>
                </div>
                <h3>popupMaxWidth</h3>
                <div className="demo-wrap">
                    <Select
                        multiple
                        showSelectAll
                        search
                        onChange={console.log}
                        customStyle={{ popupMaxWidth: '200px' }}
                    >
                        {new Array(100).fill(null).map((v, i) => (
                            <Option key={i} value={`v_${i}`}>
                                optionoptionoptionoptionoptionoptionoptionoptionoptionoptionoption{i}
                            </Option>
                        ))}
                    </Select>
                </div>
                <h3>popupWidth</h3>
                <div className="demo-wrap">
                    <Select
                        multiple
                        showSelectAll
                        search
                        onChange={console.log}
                        customStyle={{ popupWidth: '400px' }}
                        options={new Array(100).fill(null).map((v, i) => ({ value: i, label: `option ${i}` }))}
                    />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>virtualList - 虚拟列表</summary>

```jsx
const options = new Array(100000).fill(null).map((v, i) => ({ label: `option ${i}`, value: i }));

class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Select
                        multiple
                        showSelectAll
                        search
                        onChange={console.log}
                        options={options}
                        virtualList={{ height: 500 }}
                    />
                </div>
                <h2>simple</h2>
                <div className="demo-wrap">
                    <Select
                        multiple
                        showSelectAll
                        search
                        onChange={console.log}
                        options={options}
                        virtualList={{ simple: true }}
                    />
                </div>
                <h2>通过 customStyle.popupWidth 固定宽度避免宽度变化</h2>
                <div className="demo-wrap">
                    <Select
                        multiple
                        onChange={console.log}
                        options={options}
                        virtualList
                        customStyle={{ popupWidth: '200px' }}
                    />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>使用案例</summary>

```jsx
const { DemoWrap, DemoBlock } = demoUtil;
const { Option } = Select;

const options = new Array(100).fill(null).map((_, i) => ({ value: i, label: 'option-' + i }));

class Demo extends React.Component {
    render() {
        return (
            <div>
                <DemoWrap title="单选">
                    <DemoBlock row>
                        <h3>单选+无默认值+可清除</h3>
                        <Select options={options} clearable />
                    </DemoBlock>
                    <DemoBlock row>
                        <h3>单选+默认值+不可清除</h3>
                        <Select options={options} defaultValue={1} />
                    </DemoBlock>
                    <DemoBlock row>
                        <h3>单选+搜索</h3>
                        <Select options={options} clearable search />
                    </DemoBlock>
                </DemoWrap>
                <DemoWrap title="多选">
                    <DemoBlock row>
                        <h3>多选+默认值</h3>
                        <Select options={options} defaultValue={[1, 2]} multiple />
                    </DemoBlock>
                    <DemoBlock row>
                        <h3>多选+默认值+全选+搜索</h3>
                        <Select
                            options={options}
                            defaultValue={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                            multiple
                            search
                            showSelectAll
                        />
                    </DemoBlock>
                    <DemoBlock row>
                        <h3>多选+默认值+styleType:list</h3>
                        <Select
                            options={options}
                            defaultValue={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                            multiple
                            styleType="list"
                        />
                    </DemoBlock>
                    <DemoBlock row>
                        <h3>多选+默认值+styleType:list+全选+搜索</h3>
                        <Select
                            options={options}
                            defaultValue={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                            multiple
                            styleType="list"
                            search
                            showSelectAll
                        />
                    </DemoBlock>
                </DemoWrap>
            </div>
        );
    }
}
```

</details>

<details>
<summary>边界测试</summary>

```jsx
const { DemoWrap } = demoUtil;
const { Option } = Select;

const objectValue = {};
const arrayValue = [];

class DemoA extends React.Component {
    constructor(props) {
        super(props);
        this.state = { options: [] };
        setTimeout(() => {
            this.setState({ options: [{ value: 1, label: 'label-1' }] });
        }, 1000);
        this.getContent = this._getContent.bind(this);
    }
    _getContent(value) {
        const o = this.state.options.find(o => o.value === value);
        return o ? o.label : value;
    }
    render() {
        return (
            <>
                <h2>使用 renderPopup 且不传入 options 时，自定义渲染 content</h2>
                <DemoWrap>
                    <Select
                        onChange={console.log}
                        defaultValue={1}
                        renderPopup={({ onChange, value }) => (
                            <Card style={{ width: 200 }}>
                                <Card.Content>
                                    <Radio.Group value={value} options={this.state.options} onChange={onChange} />
                                </Card.Content>
                            </Card>
                        )}
                        renderContent={this.getContent}
                    />
                </DemoWrap>
            </>
        );
    }
}

class Demo extends React.Component {
    render() {
        return (
            <div>
                <h2>最大宽度</h2>
                <DemoWrap>
                    <Select defaultValue={1}>
                        <Option value={1}>
                            1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
                        </Option>
                        <Option value={2}>2</Option>
                        <Option value={3}>3</Option>
                    </Select>
                </DemoWrap>
                <h2>最小宽度</h2>
                <DemoWrap>
                    <Select defaultValue={1}>
                        <Option value={1}></Option>
                        <Option value={2}>2</Option>
                        <Option value={3}>3</Option>
                    </Select>
                </DemoWrap>
                <h2>特殊 value</h2>
                <DemoWrap>
                    <Select defaultValue={null} onChange={console.log}>
                        <Option value={null}>null value</Option>
                        <Option value={objectValue}>object value</Option>
                        <Option value={arrayValue}>array value</Option>
                    </Select>
                </DemoWrap>
                <DemoWrap>
                    <Select defaultValue={null} onChange={console.log}>
                        <Option key={123} value={null}>
                            null value
                        </Option>
                        <Option value={objectValue}>object value</Option>
                        <Option value={arrayValue}>array value</Option>
                    </Select>
                </DemoWrap>
                <DemoWrap>
                    <Select multiple onChange={console.log}>
                        <Option value={null}>null value</Option>
                        <Option value={objectValue}>object value</Option>
                        <Option value={arrayValue}>array value</Option>
                    </Select>
                </DemoWrap>
                <DemoWrap>
                    <Select
                        defaultValue={null}
                        options={[null, objectValue, {}, arrayValue].map((v, i) => ({
                            value: v,
                            label: `option ${i}`
                        }))}
                        onChange={console.log}
                    />
                </DemoWrap>
                <DemoWrap>
                    <Select
                        multiple
                        options={[null, objectValue, {}, arrayValue].map((v, i) => ({
                            value: v,
                            label: `option ${i}`
                        }))}
                        onChange={console.log}
                    />
                </DemoWrap>
                <h2>使用 key</h2>
                <DemoWrap>
                    <Select multiple onChange={console.log}>
                        <Option key={null}>null key</Option>
                        <Option key={111}>number key</Option>
                        <Option key={'111'}>string number key</Option>
                        <Option key="string">string key</Option>
                    </Select>
                </DemoWrap>
                <h2>老板本回滚 搜索+自定义selector</h2>
                <DemoWrap>
                    <Select
                        multiple
                        search
                        onChange={console.log}
                        options={new Array(100).fill(null).map((v, i) => ({ value: i, label: `option-${i}` }))}
                        renderSelector={(c, v) => <Button icon={v ? 'search' : 'check'}>{c}</Button>}
                    />
                </DemoWrap>
                <h2>老版本回滚 子菜单</h2>
                <DemoWrap>
                    <Select search>
                        <Select.Group title="组">
                            <Option value={1}>1</Option>
                            <Select.Extra>
                                <span style={{ padding: '0 8px' }}>插入一段文案</span>
                            </Select.Extra>
                            <Option value={'disable'} disabled>
                                disable
                            </Option>
                            <Option value={2}>2</Option>
                        </Select.Group>
                        <Select.Extra>
                            <span style={{ padding: '0 8px' }}>插入一段文案</span>
                        </Select.Extra>
                        <Option value={3}>3</Option>
                        <Select.Extra>
                            <Button style={{ width: '100%' }} styleType="primary" onClick={() => console.log(123)}>
                                插入按钮
                            </Button>
                        </Select.Extra>
                    </Select>
                </DemoWrap>
                <h2>老版搜索兼容告警</h2>
                <DemoWrap>
                    <Select
                        multiple
                        onChange={console.log}
                        search={{
                            handleSearch: (s, v, item) => {
                                return (
                                    ('' + v).indexOf(s) >= 0 ||
                                    (typeof item.props.children === 'string' && item.props.children.indexOf(s) >= 0)
                                );
                            }
                        }}
                    >
                        {new Array(100).fill(null).map((v, i) => (
                            <Select.Option key={i} value={i}>
                                {`option ${i}`}
                            </Select.Option>
                        ))}
                    </Select>
                </DemoWrap>
                <DemoWrap>
                    <Select
                        multiple
                        onChange={console.log}
                        search={{
                            handleSearch: (s, v, item) => {
                                return (
                                    ('' + v).indexOf(s) >= 0 ||
                                    (typeof item.props.children === 'string' && item.props.children.indexOf(s) >= 0)
                                );
                            }
                        }}
                        options={new Array(100).fill(null).map((v, i) => ({ value: i, label: `option ${i}` }))}
                    ></Select>
                </DemoWrap>
                <DemoA />
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
