---
name: cpn-basic-auto-complete
description: 帮助 AI 正确使用 UDesign AutoComplete 组件（能够尝试猜测）。当需要使用 AutoComplete 时加载此技能。
---

# 使用 AutoComplete 组件

<!-- MANUAL_START: overview -->
## 技能概述

AutoComplete 能够尝试猜测⽤户输⼊的⽂字，并且动态的搜索出适配的结果并推荐给⽤户，辅助完成输⼊。⽬的是避免⽤户出错，起到提示作⽤，智能预测⽤户⼼理期望，从⽽确保他们的输⼊更有效率。
默认的弹出层容器为 forwardPopupContainer={triggerNode => triggerNode.parentNode}，默认会查找上层的建议容器
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { AutoComplete } from '@ucloud-fe/react-components';
```

> ⚠️ **全局规范 - 所有组件通用**:
> - 生成纯 JavaScript (JSX) 代码，**不要使用 TypeScript 类型注解**
> - **禁止**使用 `@alicloud/*`、`@aliyun/*`、`antd` 等外部组件库
> - 优先使用 UDesign 组件，不要用 HTML 原生标签替代
<!-- AUTO_END: import -->

<!-- AUTO_START: basic-usage -->
### 基本用法

```jsx
const options = new Array(100).fill(null).map((v, i) => ({ value: `Item ${i}` }));
const Demo = () => {
    return (
        <>
            <AutoComplete disabled options={options} onChange={console.log} defaultValue={'Item'} />
        </>
    );
};
```
<!-- AUTO_END: basic-usage -->

<!-- AUTO_START: props-table -->
### API 参数

| 属性 | 类型 | 默认值 | 必填 | 说明 |
|------|------|--------|------|------|
| options | `Item[]` | `[]` | - | 待筛选选项 |
| value | `string` | - | - | 值，controlled |
| defaultValue | `string` | `''` | - | 默认值 |
| onChange | `(v: string) => void` | - | - | 选中回调 |
| disabled | `boolean` | - | - | 是否禁用 |
| loading | `boolean` | - | - | options 加载中状态 |
| prefix | `any` | - | - | 前缀 |
| block | `boolean` | - | - | 展示变更为块占位 |
| handleSearch | `false | (v: Item) => boolean` | - | - | 自定义搜索，为 false 时不做搜索展示全部 |
| popoverProps | `{ [key: string]: any; }` | - | - | 自定义 popover 的配置 |
| onFocus | `() => void` | - | - | 焦点回调 |
| onBlur | `() => void` | - | - | 失焦回调 |
| status | `InputProps` | - | ✅ | 状态 |
| size | `any` | - | - | 尺寸 |
<!-- AUTO_END: props-table -->



<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>普通使用</summary>

```jsx
const { formLayout, DemoWrap } = demoUtil;
const options = new Array(100).fill(null).map((v, i) => ({ value: `Item ${i}` }));
class Demo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            size: 'md',
            handleSearch: 'default',
            disabled: false
        };
    }
    render() {
        const { handleSearch, disabled, loading, prefix, block, size } = this.state;
        const props = {
            disabled,
            loading,
            block,
            size
        };
        if (handleSearch === 'false') {
            props.handleSearch = false;
        } else if (handleSearch === 'custom') {
            props.handleSearch = (item, searchValue) => {
                return item.value.toUpperCase().indexOf(searchValue.toUpperCase()) >= 0;
            };
        }
        if (prefix) {
            props.prefix = <Icon type="circle" />;
        }
        return (
            <div>
                <Form className="demo-form" itemProps={{ ...formLayout }}>
                    <Form.Item label="disabled">
                        <Switch checked={disabled} onChange={disabled => this.setState({ disabled })} />
                    </Form.Item>
                    <Form.Item label="loading">
                        <Switch checked={loading} onChange={loading => this.setState({ loading })} />
                    </Form.Item>
                    <Form.Item label="block">
                        <Switch checked={block} onChange={block => this.setState({ block })} />
                    </Form.Item>
                    <Form.Item label="prefix">
                        <Switch checked={prefix} onChange={prefix => this.setState({ prefix })} />
                    </Form.Item>
                    <Form.Item label="size">
                        <Radio.Group
                            value={size}
                            onChange={size => this.setState({ size })}
                            options={['sm', 'md', 'lg'].map(v => ({ value: v }))}
                        />
                    </Form.Item>
                    <Form.Item label="handleSearch">
                        <Radio.Group
                            value={handleSearch}
                            onChange={handleSearch => this.setState({ handleSearch })}
                            options={['default', 'false', 'custom'].map(v => ({ value: v }))}
                        />
                    </Form.Item>
                </Form>
                <DemoWrap>
                    <AutoComplete options={options} onChange={console.log} {...props} />
                </DemoWrap>
            </div>
        );
    }
}
```

</details>

<details>
<summary>disabled - 禁用</summary>

```jsx
const options = new Array(100).fill(null).map((v, i) => ({ value: `Item ${i}` }));
const Demo = () => {
    return (
        <>
            <AutoComplete disabled options={options} onChange={console.log} defaultValue={'Item'} />
        </>
    );
};
```

</details>

<details>
<summary>options - 选项展示</summary>

```jsx
const options = new Array(100).fill(null).map((v, i) => ({
    value: `Item ${i}`,
    label: (
        <span>
            <Icon type="circle" />
            This is the <i>Item</i>: {i}
        </span>
    )
}));
const Demo = () => {
    return (
        <>
            <AutoComplete options={options} onChange={console.log} defaultValue={'Item'} />
        </>
    );
};
```

</details>

<details>
<summary>handleSearch - 自定义搜索</summary>

```jsx
const options = new Array(100).fill(null).map((v, i) => ({ value: `Item ${i}` }));
const handleSearch = (item, searchValue) => {
    return item.value.toUpperCase().indexOf(searchValue.toUpperCase()) >= 0;
};
const Demo = () => {
    return (
        <>
            <h2>自定义搜索，忽略大小写匹配</h2>
            <AutoComplete options={options} onChange={console.log} defaultValue={'item'} handleSearch={handleSearch} />
            <h2>关闭筛选，展示所有选项</h2>
            <AutoComplete options={options} onChange={console.log} defaultValue={'test'} handleSearch={false} />
        </>
    );
};
```

</details>

<details>
<summary>controlled - 受控</summary>

```jsx
const options = new Array(100).fill(null).map((v, i) => ({ value: `Item ${i}` }));
let i = 0;
const Demo = () => {
    const [v, setV] = React.useState('controlled');
    const onChange = React.useCallback(
        v => {
            if (i++ % 2) setV(v);
        },
        [setV]
    );
    return (
        <>
            <h2>Controlled</h2>
            <AutoComplete options={options} value={v} onChange={onChange} />
            <h2>Uncontrolled</h2>
            <AutoComplete options={options} onChange={console.log} defaultValue={'Item'} />
        </>
    );
};
```

</details>

<details>
<summary>动态加载数据</summary>

```jsx
const generateOptions = v => {
    return new Array(10).fill(null).map((_v, i) => ({ value: `${v}-${v} ${i}` }));
};
const wait = t => new Promise(resolve => setTimeout(resolve, t));
let i = 0;
const Demo = () => {
    const [loading, setLoading] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const onChange = React.useCallback(async v => {
        if (v) {
            const ri = ++i;
            setLoading(true);
            await wait(Math.random() * 2000);
            if (ri === i) {
                setOptions(generateOptions(v));
                setLoading(false);
            }
        } else {
            setOptions([]);
        }
    }, []);
    return (
        <>
            <AutoComplete options={options} onChange={onChange} handleSearch={false} loading={loading} />
        </>
    );
};
```

</details>

<details>
<summary>如何实现输入为空时隐藏选项</summary>

```jsx
const _options = new Array(100).fill(null).map((v, i) => ({ value: `Item ${i}` }));

const Demo = () => {
    const [options, setOptions] = React.useState([]);
    const onChange = React.useCallback(v => {
        if (v) {
            setOptions(_options);
        } else {
            setOptions([]);
        }
    }, []);
    return (
        <>
            <AutoComplete options={options} onChange={onChange} defaultValue={'Item'} />
        </>
    );
};
```

</details>

<details>
<summary>输入建议</summary>

```jsx
const generateOptions = v => {
    const i = v.indexOf('@');
    return ['gmail.com', 'yahoo.com', 'outlook.com'].map(s => ({
        value: `${v.substring(0, i >= 0 ? i : undefined)}@${s}`
    }));
};

const Demo = () => {
    const [options, setOptions] = React.useState([]);
    const onChange = React.useCallback(async v => {
        if (v) {
            setOptions(generateOptions(v));
        } else {
            setOptions([]);
        }
    }, []);
    return (
        <>
            <AutoComplete options={options} onChange={onChange} />
        </>
    );
};
```

</details>

<details>
<summary>popupContainer - 容器测试</summary>

```jsx
const options = new Array(100).fill(null).map((v, i) => ({ value: `Item ${i}` }));

const Demo = () => (
    <div>
        <div className="demo-wrap">
            <Card>
                <Card.Content>
                    <div style={{ position: 'relative' }}>
                        <AutoComplete options={options} onChange={console.log} defaultValue={'Item'} />
                    </div>
                </Card.Content>
            </Card>
        </div>
    </div>
);
```

</details>

<details>
<summary>边界测试</summary>

```jsx
const Demo = () => {
    return (
        <>
            <h2>最小宽度</h2>
            <AutoComplete options={[{ value: 'short' }]} />
            <h2>最大宽度</h2>
            <AutoComplete options={[{ value: new Array(100).fill('long').join('-') }]} />
            <h2>滚动</h2>
            <AutoComplete options={new Array(1000).fill('').map((v, i) => ({ value: `Item ${i}` }))} />
            <h2>无 options</h2>
            <AutoComplete />
            <h2>错误 options</h2>
            <AutoComplete options={[{}, '', null]} />
            <h2>自定义宽度</h2>
            <AutoComplete style={{ width: 50 }} />
            <AutoComplete style={{ width: 400 }} />
            <h2>块展示</h2>
            <AutoComplete block />
            <h2>对齐</h2>
            <div>
                <AutoComplete />
                <Input />
            </div>
            <h2>placeholder</h2>
            <AutoComplete placeholder="xxxxxx" />
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
