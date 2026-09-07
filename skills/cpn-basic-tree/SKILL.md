---
name: cpn-basic-tree
description: 帮助 AI 正确使用 UDesign Tree 组件（这是 Tree）。当需要使用 Tree 时加载此技能。
---


# 使用 Tree 组件

<!-- MANUAL_START: overview -->
## 技能概述

这是 Tree - 树组件
与程序树概念不同，按照目前的交互这里的树父节点、子节点有着本质的区别，选中只包括子节点，父节点只做展示，故数据结构中的称谓也有所差异
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { Tree } from '@ucloud-fe/react-components';
```

> ⚠️ **全局规范 - 所有组件通用**:
> - 生成纯 JavaScript (JSX) 代码，**不要使用 TypeScript 类型注解**
> - **禁止**使用 `@alicloud/*`、`@aliyun/*`、`antd` 等外部组件库
> - 优先使用 UDesign 组件，不要用 HTML 原生标签替代
<!-- AUTO_END: import -->

<!-- AUTO_START: basic-usage -->
### 基本用法

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
    const itemCount = generateNumber(1, 5);
    const menuItems = generateItems(itemCount, prefix, depth);
    return menuItems;
};

const dataSource = generateGroupData(generateNumber(2, 6), 'root');

const Demo = () => {
    const ref = React.useRef();
    return (
        <>
            <Box container spacing="md" direction="column">
                <Combine>
                    <Button styleType="primary" onClick={() => ref.current.selectAll()}>
                        全选
                    </Button>
                    <Button onClick={() => ref.current.inverse()}>反选</Button>
                    <Button onClick={() => ref.current.unSelectAll()}>取消选择</Button>
                </Combine>
                <Tree key={Math.random()} dataSource={dataSource} multiple onChange={console.log} ref={ref} />
            </Box>
        </>
    );
};
```
<!-- AUTO_END: basic-usage -->

<!-- AUTO_START: props-table -->
### API 参数

| 属性 | 类型 | 默认值 | 必填 | 说明 |
|------|------|--------|------|------|
| dataSource | `TreeData[]` | - | ✅ | 数据源 |
| disabled | `boolean` | `false` | - | 是否禁用 |
| multiple | `boolean` | `false` | - | 是否支持多选 |
| selectedKeys | `string[]` | - | - | 选中的数据 controlled |
| defaultSelectedKeys | `string[]` | - | - | 默认选中的数据 uncontrolled |
| onChange | `(v: Key[]) => void` | - | - | 选中变化回调 |
| loadData | `LoadData` | - | - | 异步加载数据操作 |
| collapseProps | `CollapseProps` | - | - | collapse 的配置，参考 collapse 组件 |
| search | `true | { handleSearch?: (searchValue: string, dataSource: TreeData[]) => { dataSource: TreeData[]; count: number; openKeys: Key[]; }; }` | - | - | 使用搜索 |
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
    const itemCount = generateNumber(1, 5);
    const menuItems = generateItems(itemCount, prefix, depth);
    return menuItems;
};

const _dataSource = generateGroupData(generateNumber(2, 6), 'root');

const { formLayout, DemoWrap } = demoUtil;
class Demo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            multiple: false,
            disabled: false,
            dataSource: _dataSource
        };
    }
    refresh() {
        this.setState({ dataSource: generateGroupData(generateNumber(2, 6), 'root') });
    }
    render() {
        const { multiple, disabled, dataSource } = this.state;
        return (
            <div>
                <Form className="demo-form" itemProps={{ ...formLayout }}>
                    <Form.Item label="multiple">
                        <Switch checked={multiple} onChange={multiple => this.setState({ multiple })} />
                    </Form.Item>
                    <Form.Item label="disabled">
                        <Switch checked={disabled} onChange={disabled => this.setState({ disabled })} />
                    </Form.Item>
                    <Form.Item label="random">
                        <Button onClick={() => this.refresh()}>Refresh</Button>
                    </Form.Item>
                </Form>
                <DemoWrap>
                    <Tree
                        dataSource={dataSource}
                        multiple={multiple}
                        disabled={disabled}
                        onChange={console.log}
                        collapseProps={{ onChange: console.log }}
                    />
                </DemoWrap>
            </div>
        );
    }
}
```

</details>

<details>
<summary>method - 内置方法</summary>

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
    const itemCount = generateNumber(1, 5);
    const menuItems = generateItems(itemCount, prefix, depth);
    return menuItems;
};

const dataSource = generateGroupData(generateNumber(2, 6), 'root');

const Demo = () => {
    const ref = React.useRef();
    return (
        <>
            <Box container spacing="md" direction="column">
                <Combine>
                    <Button styleType="primary" onClick={() => ref.current.selectAll()}>
                        全选
                    </Button>
                    <Button onClick={() => ref.current.inverse()}>反选</Button>
                    <Button onClick={() => ref.current.unSelectAll()}>取消选择</Button>
                </Combine>
                <Tree key={Math.random()} dataSource={dataSource} multiple onChange={console.log} ref={ref} />
            </Box>
        </>
    );
};
```

</details>

<details>
<summary>controlled / uncontrolled - 受控 / 非受控</summary>

```jsx
const keys = [];

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
            title: key,
            disabled: Math.random() > 0.8
        };
        if (subItems.length) {
            item.children = subItems;
        } else {
            keys.push(key);
        }
        return item;
    });
};

const generateGroupData = (depth, prefix) => {
    const itemCount = generateNumber(1, 5);
    const menuItems = generateItems(itemCount, prefix, depth);
    return menuItems;
};

const dataSource = generateGroupData(generateNumber(2, 6), 'root');

const Demo = () => {
    return (
        <>
            <h2>Controlled</h2>
            <Tree dataSource={dataSource} multiple onChange={console.log} selectedKeys={[keys[0]]} />
            <h2>Uncontrolled</h2>
            <Tree dataSource={dataSource} multiple onChange={console.log} />
        </>
    );
};
```

</details>

<details>
<summary>loadData - 异步加载数据</summary>

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
        async parentKey => {
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
            <Tree dataSource={dataSource} onChange={console.log} loadData={_loadData} />
        </>
    );
};
```

</details>

<details>
<summary>search - 搜索</summary>

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

const Demo = () => {
    const ref = React.useRef();
    const handleSearch = React.useCallback(async (searchValue, dataSource) => {
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
    }, []);
    return (
        <>
            <DemoWrap>
                <Tree
                    dataSource={_dataSource}
                    multiple
                    onChange={console.log}
                    collapseProps={{
                        onChange: console.log
                    }}
                    search
                />
            </DemoWrap>
            <DemoWrap>
                <h2>自定义模拟后端搜索</h2>
                <Tree
                    dataSource={_dataSource}
                    multiple
                    onChange={console.log}
                    collapseProps={{
                        onChange: console.log
                    }}
                    search={{ handleSearch }}
                />
            </DemoWrap>
            <DemoWrap>
                <h2>搜索+全选等，搜索结果页面后的全选、反选、取消选择针对的是当前搜索结果</h2>
                <Box container spacing="md" direction="column">
                    <Combine>
                        <Button styleType="primary" onClick={() => ref.current.selectAll()}>
                            全选
                        </Button>
                        <Button onClick={() => ref.current.inverse()}>反选</Button>
                        <Button onClick={() => ref.current.unSelectAll()}>取消选择</Button>
                    </Combine>
                    <Tree
                        dataSource={_dataSource}
                        multiple
                        onChange={console.log}
                        collapseProps={{
                            onChange: console.log
                        }}
                        search
                        ref={ref}
                    />
                </Box>
            </DemoWrap>
        </>
    );
};
```

</details>

<details>
<summary>大数据性能测试</summary>

```jsx
const generateItems = (count, prefix, depth) => {
    return new Array(count).fill(null).map((v, i) => {
        const key = `${prefix}-${i}-item`;
        let subItems = [];
        if (depth) {
            subItems = generateItems(6, key, depth - 1);
        }
        const item = {
            key: key,
            title: key
        };
        if (subItems.length) {
            item.children = subItems;
        }
        return item;
    });
};

const generateGroupData = (depth, prefix) => {
    const itemCount = 6;
    const menuItems = generateItems(itemCount, prefix, depth);
    return menuItems;
};

const initDataSource = generateGroupData(5, 'root');

const Demo = () => {
    const [dataSource, setDataSource] = React.useState(initDataSource);
    const refresh = React.useCallback(() => {
        setDataSource(generateGroupData(5, 'root'));
    }, []);
    const ref = React.useRef();
    return (
        <>
            <Combine>
                <Button onClick={refresh}>Refresh</Button>
                <h2>总计 6**6 = 46656 条数据</h2>
            </Combine>
            <Tree dataSource={dataSource} multiple onChange={console.log} ref={ref} />
        </>
    );
};
```

</details>

<!-- AUTO_END: demos -->

<!-- MANUAL_START: best-practices -->
## 最佳实践

1. **Key 必须为唯一字符串**：所有节点的 key 不得重复
2. **异步加载设置 isParent**：需要异步加载子节点的父节点设置 `isParent: true`
3. **异步加载更新引用**：更新 dataSource 时需要更新引用（spread 新数组）
4. **异步加载不支持多选**：因为数据未加载无法获取选中数据

### 常见场景

#### 资源选择树

```jsx
<Form.Item label="选择子网">
  <Tree
    dataSource={subnetTree}
    selectedKeys={selectedSubnets}
    onChange={setSelectedSubnets}
    search
  />
</Form.Item>
```

#### 多选权限树

```jsx
<Tree
  ref={treeRef}
  multiple
  dataSource={permissionTree}
  selectedKeys={selectedPermissions}
  onChange={setSelectedPermissions}
/>
<Button onClick={() => treeRef.current.selectAll()}>全选</Button>
<Button onClick={() => treeRef.current.unSelectAll()}>取消全选</Button>
```
<!-- MANUAL_END: best-practices -->

<!-- MANUAL_START: faq -->
## 常见问题

### Q: 选中回调中包含父节点吗？

A: 不包含。onChange 回调的 keys 只包含叶子节点。父节点仅做展示和折叠控制。

### Q: 异步加载时为什么没有展开按钮？

A: 需要在父节点数据中添加 `isParent: true` 来告知组件显示展开按钮。
<!-- MANUAL_END: faq -->

<!-- MANUAL_START: critical -->
## 注意事项

_（待补充）_
<!-- MANUAL_END: critical -->
