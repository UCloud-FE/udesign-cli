---
name: cpn-basic-cascader
description: 帮助 AI 正确使用 UDesign Cascader 组件（集联选择器组件）。当需要使用 Cascader 时加载此技能。
---

# 使用 Cascader 组件

<!-- MANUAL_START: overview -->
## 技能概述

这是 Cascader 集联选择器组件
一般用于选择一些层级关联的数据，如选择地区等
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { Cascader } from '@ucloud-fe/react-components';
```

> ⚠️ **全局规范 - 所有组件通用**:
> - 生成纯 JavaScript (JSX) 代码，**不要使用 TypeScript 类型注解**
> - **禁止**使用 `@alicloud/*`、`@aliyun/*`、`antd` 等外部组件库
> - 优先使用 UDesign 组件，不要用 HTML 原生标签替代
<!-- AUTO_END: import -->

<!-- AUTO_START: basic-usage -->
### 基本用法

```jsx
const _dataSource = [
    {
        title: 'parent title',
        key: 'first',
        children: [
            {
                title: 'children title',
                key: 'second'
            }
        ]
    }
];

const { DemoWrap } = demoUtil;
const Demo = () => {
    return (
        <div>
            <DemoWrap>
                <Cascader dataSource={_dataSource} defaultValue={['first', 'second']} clearable />
            </DemoWrap>
            <DemoWrap>
                <Cascader dataSource={_dataSource} defaultValue={['first', 'second']} />
            </DemoWrap>
        </div>
    );
};
```
<!-- AUTO_END: basic-usage -->

<!-- AUTO_START: props-table -->
### API 参数

| 属性 | 类型 | 默认值 | 必填 | 说明 |
|------|------|--------|------|------|
| dataSource | `CascadeData[]` | - | - | 数据源 |
| value | `string[]` | - | - | 选中的值 |
| defaultValue | `string[]` | - | - | 默认值，非受控 |
| onChange | `(value: Key[] | void) => void` | - | - | 选中回调 |
| disabled | `boolean` | - | - | 是否禁用 |
| size | `"sm" | "md" | "lg"` | - | - | 尺寸 |
| search | `false | true | { handleSearch?: (searchValue: string, dataSource: CascadeData[]) => { dataSource: CascadeData[]; count?: number; }; }` | - | - | 使用搜索 |
| loadData | `LoadData` | - | - | 异步加载数据操作 |
| clearable | `boolean` | - | - | 是否可清空 |
| status | `any` | - | - | 状态 |
| popoverProps | `{ [key: string]: any; }` | - | - | 自定义 popover 的配置 |
| separator | `string` | - | - | 分隔符 |
| topExtraRender | `(props: { index: number; parents?: CascadeData[]; items?: CascadeData[]; }) => React.ReactNode` | - | - | 渲染级联顶部的插槽 |
<!-- AUTO_END: props-table -->



<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>功能演示</summary>

```jsx
const generateNumber = (min, max) => {
    const random = Math.random();
    return (min + random * (max + 1 - min)) | 0;
};

const generateItems = (count, prefix, depth) => {
    return new Array(count).fill(null).map((v, i) => {
        const key = `${prefix}-${i}-item`;
        let subItems = [];
        if (depth) {
            subItems = generateItems(generateNumber(0, 5), key, depth - 1);
        }
        const item = {
            key: key,
            title: ' ✨ ' + key,
            disabled: Math.random() > 0.8
        };
        if (subItems.length) {
            item.children = subItems;
        }
        return item;
    });
};

const generateGroupData = (depth, prefix) => {
    const itemCount = generateNumber(1, 5);
    const menuItems = generateItems(itemCount, prefix, depth);
    return menuItems;
};

const _dataSource = generateGroupData(generateNumber(2, 6), 'root');

const { formLayout, DemoWrap, Sizes, defaultSize } = demoUtil;
class Demo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            multiple: false,
            disabled: false,
            clearable: false,
            dataSource: _dataSource,
            size: defaultSize,
            separator: 'default'
        };
    }
    refresh() {
        this.setState({ dataSource: generateGroupData(generateNumber(2, 6), 'root') });
    }
    render() {
        const { disabled, search, clearable, size, separator, dataSource } = this.state;
        const props = {
            disabled,
            search,
            clearable,
            size,
            dataSource
        };
        switch (separator) {
            case '-':
                props.separator = '-';
                break;
            case ':':
                props.separator = ':';
                break;
            case 'default':
                props.separator = null;
        }
        return (
            <div>
                <Form className="demo-form" itemProps={{ ...formLayout }}>
                    <Form.Item label="disabled">
                        <Switch checked={disabled} onChange={disabled => this.setState({ disabled })} />
                    </Form.Item>
                    <Form.Item label="search">
                        <Switch checked={search} onChange={search => this.setState({ search })} />
                    </Form.Item>
                    <Form.Item label="clearable">
                        <Switch checked={clearable} onChange={clearable => this.setState({ clearable })} />
                    </Form.Item>
                    <Form.Item label="size">
                        <Radio.Group
                            value={size}
                            onChange={size => this.setState({ size })}
                            options={Sizes.map(size => ({
                                value: size
                            }))}
                        />
                    </Form.Item>
                    <Form.Item label="random">
                        <Button onClick={() => this.refresh()}>Refresh</Button>
                    </Form.Item>
                    <Form.Item label="separator">
                        <Radio.Group
                            value={separator}
                            onChange={separator => this.setState({ separator })}
                            options={['default', '-', ':'].map(separator => ({
                                value: separator
                            }))}
                        />
                    </Form.Item>
                </Form>
                <DemoWrap>
                    <Cascader {...props} onChange={console.log} />
                </DemoWrap>
            </div>
        );
    }
}
```

</details>

<details>
<summary>尺寸 - size</summary>

```jsx
const generateNumber = (min, max) => {
    const random = Math.random();
    return (min + random * (max + 1 - min)) | 0;
};

const generateItems = (count, prefix, depth) => {
    return new Array(count).fill(null).map((v, i) => {
        const key = `${prefix}-${i}-item`;
        let subItems = [];
        if (depth) {
            subItems = generateItems(generateNumber(0, 5), key, depth - 1);
        }
        const item = {
            key: key,
            title: ' ✨ ' + key,
            disabled: Math.random() > 0.8
        };
        if (subItems.length) {
            item.children = subItems;
        }
        return item;
    });
};

const generateGroupData = (depth, prefix) => {
    const itemCount = generateNumber(1, 5);
    const menuItems = generateItems(itemCount, prefix, depth);
    return menuItems;
};

const _dataSource = generateGroupData(generateNumber(2, 6), 'root');

const { Sizes } = demoUtil;
const Demo = () => {
    return (
        <div>
            {Sizes.map(size => (
                <Cascader dataSource={_dataSource} size={size} key={size} />
            ))}
        </div>
    );
};
```

</details>

<details>
<summary>禁用 - disabled</summary>

```jsx
const generateNumber = (min, max) => {
    const random = Math.random();
    return (min + random * (max + 1 - min)) | 0;
};

const generateItems = (count, prefix, depth) => {
    return new Array(count).fill(null).map((v, i) => {
        const key = `${prefix}-${i}-item`;
        let subItems = [];
        if (depth) {
            subItems = generateItems(generateNumber(0, 5), key, depth - 1);
        }
        const item = {
            key: key,
            title: ' ✨ ' + key,
            disabled: Math.random() > 0.8
        };
        if (subItems.length) {
            item.children = subItems;
        }
        return item;
    });
};

const generateGroupData = (depth, prefix) => {
    const itemCount = generateNumber(1, 5);
    const menuItems = generateItems(itemCount, prefix, depth);
    return menuItems;
};

const _dataSource = generateGroupData(generateNumber(2, 6), 'root');

const { DemoWrap } = demoUtil;
const Demo = () => {
    return (
        <div>
            <DemoWrap>
                <Cascader dataSource={_dataSource} disabled />
            </DemoWrap>
            <DemoWrap>
                <Cascader dataSource={_dataSource} />
            </DemoWrap>
        </div>
    );
};
```

</details>

<details>
<summary>是否可清空 - clearable</summary>

```jsx
const _dataSource = [
    {
        title: 'parent title',
        key: 'first',
        children: [
            {
                title: 'children title',
                key: 'second'
            }
        ]
    }
];

const { DemoWrap } = demoUtil;
const Demo = () => {
    return (
        <div>
            <DemoWrap>
                <Cascader dataSource={_dataSource} defaultValue={['first', 'second']} clearable />
            </DemoWrap>
            <DemoWrap>
                <Cascader dataSource={_dataSource} defaultValue={['first', 'second']} />
            </DemoWrap>
        </div>
    );
};
```

</details>

<details>
<summary>搜索 - search</summary>

```jsx
const { DemoWrap } = demoUtil;
const generateNumber = (min, max) => {
    const random = Math.random();
    return (min + random * (max + 1 - min)) | 0;
};

const generateItems = (count, prefix, depth) => {
    return new Array(count).fill(null).map((v, i) => {
        const key = `${prefix}-${i}-item`;
        let subItems = [];
        if (depth) {
            subItems = generateItems(generateNumber(0, 3), key, depth - 1);
        }
        const item = {
            key: key,
            title: key,
            disabled: Math.random() > 0.8
        };
        if (subItems.length) {
            item.children = subItems;
        }
        return item;
    });
};

const generateGroupData = (depth, prefix) => {
    const itemCount = generateNumber(2, 4);
    const menuItems = generateItems(itemCount, prefix, depth);
    return menuItems;
};

const _dataSource = generateGroupData(generateNumber(3, 3), 'root');

const wait = t => new Promise(resolve => setTimeout(resolve, t));

const handleSearch = async (searchValue, dataSource) => {
    if (!searchValue) return { dataSource, count: null };
    await wait(2000);
    let count = 0;
    const finalExpandedKeyMap = {};
    const handle = children => {
        let childrenHit = false;
        const newChildren = [];
        children.forEach(child => {
            const { title, key, children } = child;
            const override = {};
            let searchHit = false;
            if (typeof title === 'string') {
                searchHit = index >= 0;
                const index = (Math.random() * title.length) | 0;
                searchHit = index + searchValue.length < title.length;
                if (searchHit) {
                    count++;
                    const beforeStr = title.substr(0, index);
                    const afterStr = title.substr(index + searchValue.length);
                    override.title = (
                        <>
                            {beforeStr}
                            <span style={{ background: 'red' }}>{searchValue}</span>
                            {afterStr}
                        </>
                    );
                }
            }
            if (children) {
                const [_children, _searchHit] = handle(children);
                override.children = _children;
                searchHit = _searchHit || searchHit;
                if (_searchHit) finalExpandedKeyMap[key] = 1;
            }
            if (searchHit) {
                childrenHit = true;
                newChildren.push({ ...child, ...override });
            }
        });
        return [newChildren, childrenHit];
    };
    const dataSourceAfterSearch = handle(dataSource)[0];
    return {
        dataSource: dataSourceAfterSearch,
        count,
        openKeys: Object.keys(finalExpandedKeyMap)
    };
};

const Demo = () => {
    return (
        <>
            <DemoWrap>
                <h2>使用默认搜索逻辑</h2>
                <Cascader dataSource={_dataSource} onChange={console.log} search />
            </DemoWrap>
            <DemoWrap>
                <h2>自定义模拟后端搜索</h2>
                <Cascader dataSource={_dataSource} onChange={console.log} search={{ handleSearch }} />
            </DemoWrap>
        </>
    );
};
```

</details>

<details>
<summary>自定义宽度 - width</summary>

```jsx
const { DemoWrap } = demoUtil;
const generateNumber = (min, max) => {
    const random = Math.random();
    return (min + random * (max + 1 - min)) | 0;
};

const generateItems = (count, prefix, depth) => {
    return new Array(count).fill(null).map((v, i) => {
        const key = `${prefix}-${i}-item`;
        let subItems = [];
        if (depth) {
            subItems = generateItems(generateNumber(0, 3), key, depth - 1);
        }
        const item = {
            key: key,
            title: key,
            width: depth === 3 ? 500 : 100
        };
        if (subItems.length) {
            item.children = subItems;
        }
        return item;
    });
};

const generateGroupData = (depth, prefix) => {
    const itemCount = generateNumber(2, 4);
    const menuItems = generateItems(itemCount, prefix, depth);
    return menuItems;
};

const _dataSource = generateGroupData(generateNumber(3, 3), 'root');

const Demo = () => {
    return (
        <>
            <DemoWrap>
                <Cascader dataSource={_dataSource} onChange={console.log} search />
            </DemoWrap>
        </>
    );
};
```

</details>

<details>
<summary>异步加载 - loadData</summary>

```jsx
const generateNumber = (min, max) => {
    const random = Math.random();
    return (min + random * (max + 1 - min)) | 0;
};

const generateItems = (count, prefix, _isParent) => {
    return new Array(count).fill(null).map((v, i) => {
        const key = `${prefix}-${i}-item`;
        const isParent = Math.random() > 0.5;
        return {
            key: key,
            title: key,
            isParent: _isParent || isParent,
            disabled: Math.random() > 0.8
        };
    });
};

const generateGroupData = prefix => {
    const itemCount = generateNumber(1, 5);
    const menuItems = generateItems(itemCount, prefix, true);
    return menuItems;
};

const initDataSource = generateGroupData('root');

const delay = t => new Promise(resolve => setTimeout(() => resolve(), t));
const loadData = async key => {
    await delay(1000);
    return generateItems(generateNumber(0, 5), key);
};

const Demo = () => {
    const [dataSource, setDataSource] = React.useState(initDataSource);
    // 由于存在多个组同时展开的情况，此处因为直接在原引用上修改，不存在问题，如果是重新构建数据，需要注意同步修改 dataSource 导致数据被覆盖的问题
    const _loadData = React.useCallback(
        async parentKeys => {
            const parentKey = parentKeys[parentKeys.length - 1];
            const children = await loadData(parentKey);
            const loop = arr => {
                let result;
                for (let i = 0; i < arr.length; i++) {
                    const item = arr[i];
                    if (item.key === parentKey) {
                        result = item;
                    }
                    if (item.children) {
                        result = loop(item.children);
                    }
                    if (result) {
                        break;
                    }
                }
                return result;
            };
            const target = loop(dataSource);
            if (target) target.children = children;
            setDataSource([...dataSource]);
        },
        [dataSource]
    );

    return (
        <>
            <Cascader dataSource={dataSource} onChange={console.log} loadData={_loadData} />
        </>
    );
};
```

</details>

<details>
<summary>级联顶部插槽 - topExtraRender</summary>

```jsx
const generateNumber = (min, max) => {
    const random = Math.random();
    return (min + random * (max + 1 - min)) | 0;
};

const generateItems = (count, prefix, depth) => {
    return new Array(count).fill(null).map((v, i) => {
        const key = `${prefix}-${i}-item`;
        let subItems = [];
        if (depth) {
            subItems = generateItems(generateNumber(0, 5), key, depth - 1);
        }
        const item = {
            key: key,
            title: ' ✨ ' + key,
            disabled: Math.random() > 0.8
        };
        if (subItems.length) {
            item.children = subItems;
        }
        return item;
    });
};

const generateGroupData = (depth, prefix) => {
    const itemCount = generateNumber(1, 5);
    const menuItems = generateItems(itemCount, prefix, depth);
    return menuItems;
};

const _dataSource = generateGroupData(generateNumber(2, 6), 'root');

const { DemoWrap } = demoUtil;
const Demo = () => {
    return (
        <DemoWrap>
            <Cascader
                dataSource={_dataSource}
                topExtraRender={({ index, items, parents }) => {
                    console.log('items', items);
                    console.log('parents', parents);
                    return index;
                }}
            />
        </DemoWrap>
    );
};
```

</details>

<details>
<summary>性能测试</summary>

```jsx
const generateNumber = (min, max) => {
    const random = Math.random();
    return (min + random * (max + 1 - min)) | 0;
};

const generateItems = (count, prefix, depth) => {
    return new Array(count).fill(null).map((v, i) => {
        const key = `${prefix}-${i}-item`;
        let subItems = [];
        if (depth) {
            subItems = generateItems(generateNumber(5, 5), key, depth - 1);
        }
        const item = {
            key: key,
            title: '✨ ' + key,
            disabled: Math.random() > 0.8
        };
        if (subItems.length) {
            item.children = subItems;
        }
        return item;
    });
};

const generateGroupData = (depth, prefix) => {
    const itemCount = generateNumber(20, 20);
    const menuItems = generateItems(itemCount, prefix, depth);
    return menuItems;
};

const dataSource = generateGroupData(generateNumber(5, 5), 'root');
const Demo = () => {
    return <Cascader dataSource={dataSource} search />;
};
```

</details>

<details>
<summary>边界测试</summary>

```jsx
const generateNumber = (min, max) => {
    const random = Math.random();
    return (min + random * (max + 1 - min)) | 0;
};

const generateItems = (count, prefix, depth) => {
    return new Array(count).fill(null).map((v, i) => {
        const key = `${prefix}-${i}-item`;
        let subItems = [];
        if (depth) {
            subItems = generateItems(generateNumber(0, 3), key, depth - 1);
        }
        const item = {
            key: key,
            title: '✨ ' + key,
            disabled: Math.random() > 0.8
        };
        if (subItems.length) {
            item.children = subItems;
        }
        return item;
    });
};

const generateGroupData = (depth, prefix) => {
    const itemCount = generateNumber(10, 20);
    const menuItems = generateItems(itemCount, prefix, depth);
    return menuItems;
};

const dataSource = generateGroupData(generateNumber(2, 4), 'root');
const loadDataDataSource = new Array(10).fill(null).map((item, i) => {
    return {
        key: i,
        title: '✨ ' + i,
        disabled: Math.random() > 0.8,
        isParent: true
    };
});
const emptyChildrenDataSource = new Array(10).fill(null).map((item, i) => {
    return {
        key: i,
        title: '✨ ' + i,
        disabled: Math.random() > 0.8,
        children: []
    };
});

const handleSearch = () => {
    throw new Error('search error');
};
const loadData = () => {
    throw new Error('load error');
};

const Demo = () => {
    return (
        <>
            <h3>dataSource 为 null</h3>
            <Cascader dataSource={null} />
            <h3>dataSource 为空数组</h3>
            <Cascader dataSource={[]} />
            <h3>无 dataSource</h3>
            <Cascader />
            <h3>value 为 null</h3>
            <Cascader dataSource={dataSource} value={null} />
            <h3>value 为空数组</h3>
            <Cascader dataSource={dataSource} value={[]} />
            <h3>value 为不存在的项</h3>
            <Cascader dataSource={dataSource} value={['root-xxxxxxx']} />
            <h3>搜索报错</h3>
            <Cascader dataSource={dataSource} search={{ handleSearch }} />
            <h3>加载报错</h3>
            <Cascader dataSource={loadDataDataSource} loadData={loadData} />
            <h3>子菜单为空</h3>
            <Cascader dataSource={emptyChildrenDataSource} />
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
