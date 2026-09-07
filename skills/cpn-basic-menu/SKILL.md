---
name: cpn-basic-menu
description: 帮助 AI 正确使用 UDesign Menu 组件（菜单组件）。当需要使用 Menu 时加载此技能。
---


# 使用 Menu 组件

<!-- MANUAL_START: overview -->
## 技能概述

这是 Menu 菜单组件
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { Menu } from '@ucloud-fe/react-components';
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
        <div className="demo-wrap">
            <Menu onChange={console.log}>
                <Menu.Item itemKey="1">Menu 1</Menu.Item>
                <Menu.Item itemKey="2">Menu 2</Menu.Item>
                <Menu.Item itemKey="3">Menu 3</Menu.Item>
                <Menu.Item itemKey="4">Menu 4</Menu.Item>
            </Menu>
        </div>
        <div className="demo-wrap">
            <Menu multiple onChange={console.log}>
                <Menu.Item itemKey="1">Menu 1</Menu.Item>
                <Menu.Item itemKey="2">Menu 2</Menu.Item>
                <Menu.Item itemKey="3">Menu 3</Menu.Item>
                <Menu.Item itemKey="4">Menu 4</Menu.Item>
            </Menu>
        </div>
    </div>
);
```
<!-- AUTO_END: basic-usage -->

<!-- AUTO_START: props-table -->
### API 参数

| 属性 | 类型 | 默认值 | 必填 | 说明 |
|------|------|--------|------|------|
| selectedKeys | `Key[]` | - | - | 选中的菜单项的key，controlled |
| defaultSelectedKeys | `Key[]` | `[]` | - | 默认选中的菜单项的key，uncontrolled |
| onChange | `(keys: Key[]) => void` | - | - | 选中变化时的回调 |
| multiple | `boolean` | `false` | - | 是否支持多选 |
| selectable | `boolean` | `true` | - | 是否可选 |
| showSelectAll | `false | true | Element` | - | - | 是否显示全选，多选时有效 |
| block | `boolean` | - | - | 是否使用块元素显示模式，去除宽高限制，撑满容器，去除外阴影、border，方便放置在自定义容器中 |
| disabled | `boolean` | - | - | 是否禁用 |
| collapseProps | `CollapseProps` | - | - | collapse 的配置，参考 collapse 组件 |
| virtualList | `false | true | { simple?: true; height?: number; }` | - | - | 启用虚拟滚动，启用后需要注意所有 item 需提供 key（可不提供 itemKey 和 subMenuKey，会使用 key 作为对应），且 Item key 和 SubMenu 不可重复，目前不支持 collapse 类 SubMenu |
| customStyle | `{ maxHeight?: string; maxWidth?: string; }` | - | - | 自定义样式 |
<!-- AUTO_END: props-table -->



<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>演示</summary>

```jsx
const generateNumber = (min, max) => {
    const random = Math.random();
    return (min + random * (max + 1 - min)) | 0;
};
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            multiple: false,
            selectable: true,
            menuData: this.generateMenuData()
        };
    }
    generateMenuData() {
        const generateMenuItem = (count, prefix) => {
            return new Array(count).fill(null).map((v, i) => {
                const key = `${prefix}-${i}-item`;
                return {
                    itemKey: key,
                    label: key,
                    type: 'item'
                };
            });
        };

        const generateMenuGroup = (depth, prefix) => {
            const itemCount = generateNumber(1, 5);
            const menuItems = generateMenuItem(itemCount, prefix);

            let subMenuItems = [];

            if (depth) {
                const subMenuCount = generateNumber(1, 3);

                subMenuItems.length = subMenuCount;
                subMenuItems = subMenuItems.fill(null).map((v, i) => {
                    const key = `${prefix}-${i}-subMenu`;
                    return {
                        subMenuKey: key,
                        title: key,
                        type: 'subMenu',
                        styleType: ['collapse', 'popover'][Math.random().toFixed()],
                        children: generateMenuGroup(depth - 1, key)
                    };
                });
            }
            return menuItems.concat(subMenuItems);
        };

        return generateMenuGroup(generateNumber(3, 7), 'root');
    }
    renderMenu(menuData) {
        return menuData.map(info => {
            if (info.type === 'item') {
                return (
                    <Menu.Item key={info.itemKey} itemKey={info.itemKey}>
                        {info.label}
                    </Menu.Item>
                );
            }
            if (info.type === 'subMenu') {
                return (
                    <Menu.SubMenu
                        key={info.subMenuKey}
                        subMenuKey={info.subMenuKey}
                        styleType={info.styleType}
                        title={info.title}
                    >
                        {this.renderMenu(info.children)}
                    </Menu.SubMenu>
                );
            }
        });
    }
    render() {
        const { multiple, disabled, selectable, menuData, showSelectAll, block } = this.state;
        const itemLayout = {
            labelCol: {
                span: 3
            },
            controllerCol: {
                span: 9
            }
        };

        return (
            <div>
                <Form className="demo-form">
                    <Form.Item label="multiple" {...itemLayout}>
                        <Switch checked={multiple} onChange={multiple => this.setState({ multiple })} />
                    </Form.Item>
                    <Form.Item label="disabled" {...itemLayout}>
                        <Switch checked={disabled} onChange={disabled => this.setState({ disabled })} />
                    </Form.Item>
                    <Form.Item label="selectable" {...itemLayout}>
                        <Switch checked={selectable} onChange={selectable => this.setState({ selectable })} />
                    </Form.Item>
                    <Form.Item label="showSelectAll" {...itemLayout}>
                        <Switch checked={showSelectAll} onChange={showSelectAll => this.setState({ showSelectAll })} />
                    </Form.Item>
                    <Form.Item label="block" {...itemLayout}>
                        <Switch checked={block} onChange={block => this.setState({ block })} />
                    </Form.Item>
                    <Form.Item label="refreshMenuData" {...itemLayout}>
                        <Button onClick={() => this.setState({ menuData: this.generateMenuData() })}>
                            refreshMenuData
                        </Button>
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Menu
                        multiple={multiple}
                        disabled={disabled}
                        selectable={selectable}
                        block={block}
                        showSelectAll={showSelectAll}
                        onChange={console.log}
                    >
                        {this.renderMenu(menuData)}
                    </Menu>
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>multiple - 支持多选</summary>

```jsx
const Demo = () => (
    <div>
        <div className="demo-wrap">
            <Menu onChange={console.log}>
                <Menu.Item itemKey="1">Menu 1</Menu.Item>
                <Menu.Item itemKey="2">Menu 2</Menu.Item>
                <Menu.Item itemKey="3">Menu 3</Menu.Item>
                <Menu.Item itemKey="4">Menu 4</Menu.Item>
            </Menu>
        </div>
        <div className="demo-wrap">
            <Menu multiple onChange={console.log}>
                <Menu.Item itemKey="1">Menu 1</Menu.Item>
                <Menu.Item itemKey="2">Menu 2</Menu.Item>
                <Menu.Item itemKey="3">Menu 3</Menu.Item>
                <Menu.Item itemKey="4">Menu 4</Menu.Item>
            </Menu>
        </div>
    </div>
);
```

</details>

<details>
<summary>selectedKeys / defaultSelectedKeys - 选中的菜单项的 key (受控 / 非受控)</summary>

```jsx
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedKeys: ['1', '3']
        };
    }

    handleChange(v) {
        console.log(v);
        this.setState({
            selectedKeys: v
        });
    }
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Menu multiple onChange={v => this.handleChange(v)} selectedKeys={this.state.selectedKeys}>
                        <Menu.Item itemKey="1">Menu 1</Menu.Item>
                        <Menu.Item itemKey="2">Menu 2</Menu.Item>
                        <Menu.Item itemKey="3">Menu 3</Menu.Item>
                        <Menu.Item itemKey="4">Menu 4</Menu.Item>
                    </Menu>
                </div>
                <div className="demo-wrap">
                    <Menu multiple onChange={console.log} defaultSelectedKeys={['1', '3']}>
                        <Menu.Item itemKey="1">Menu 1</Menu.Item>
                        <Menu.Item itemKey="2">Menu 2</Menu.Item>
                        <Menu.Item itemKey="3">Menu 3</Menu.Item>
                        <Menu.Item itemKey="4">Menu 4</Menu.Item>
                    </Menu>
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>selectable - 是否可选</summary>

```jsx
const Demo = () => (
    <div>
        <div className="demo-wrap">
            <Menu multiple onChange={console.log}>
                <Menu.Item itemKey="1">Menu 1</Menu.Item>
                <Menu.Item itemKey="2">Menu 2</Menu.Item>
                <Menu.Item itemKey="3">Menu 3</Menu.Item>
                <Menu.Item itemKey="4">Menu 4</Menu.Item>
            </Menu>
        </div>
        <div className="demo-wrap">
            <Menu multiple selectable={false} onChange={console.log}>
                <Menu.Item itemKey="1">Menu 1</Menu.Item>
                <Menu.Item itemKey="2">Menu 2</Menu.Item>
                <Menu.Item itemKey="3">Menu 3</Menu.Item>
                <Menu.Item itemKey="4">Menu 4</Menu.Item>
            </Menu>
        </div>
    </div>
);
```

</details>

<details>
<summary>collapse - 折叠配置</summary>

```jsx
const Demo = () => (
    <div>
        <div className="demo-wrap">
            <Menu multiple collapseProps={{ defaultOpenKeys: ['1', '2'] }} onChange={console.log}>
                <Menu.Item itemKey="1">Menu 1</Menu.Item>
                <Menu.SubMenu subMenuKey="1" title={'SubMenu 1'}>
                    <Menu.Item itemKey="1-1">Menu 1</Menu.Item>
                    <Menu.Item itemKey="1-2">Menu 2</Menu.Item>
                    <Menu.Item itemKey="1-3">Menu 3</Menu.Item>
                    <Menu.Item itemKey="1-4">Menu 4</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu subMenuKey="2" title={'SubMenu 2'}>
                    <Menu.Item itemKey="2-1">Menu 1</Menu.Item>
                    <Menu.Item itemKey="2-2">Menu 2</Menu.Item>
                    <Menu.Item itemKey="2-3">Menu 3</Menu.Item>
                    <Menu.Item itemKey="2-4">Menu 4</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title={'SubMenu 3'}>
                    <Menu.Item itemKey="3-1">Menu 1</Menu.Item>
                    <Menu.Item itemKey="3-2">Menu 2</Menu.Item>
                    <Menu.Item itemKey="3-3">Menu 3</Menu.Item>
                    <Menu.Item itemKey="3-4">Menu 4</Menu.Item>

                    <Menu.SubMenu title={'SubMenu 3-1'} styleType={'popover'}>
                        <Menu.Item itemKey="3-1-1">Menu 1</Menu.Item>
                        <Menu.Item itemKey="3-1-2">Menu 2</Menu.Item>
                        <Menu.Item itemKey="3-1-3">Menu 3</Menu.Item>
                        <Menu.Item itemKey="3-1-4">Menu 4</Menu.Item>
                    </Menu.SubMenu>
                </Menu.SubMenu>
            </Menu>
        </div>
        <div className="demo-wrap">
            <Menu multiple onChange={console.log}>
                <Menu.Item itemKey="1">Menu 1</Menu.Item>
                <Menu.SubMenu subMenuKey="1" title={'SubMenu 1'}>
                    <Menu.Item itemKey="1-1">Menu 1</Menu.Item>
                    <Menu.Item itemKey="1-2">Menu 2</Menu.Item>
                    <Menu.Item itemKey="1-3">Menu 3</Menu.Item>
                    <Menu.Item itemKey="1-4">Menu 4</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu subMenuKey="2" title={'SubMenu 2'}>
                    <Menu.Item itemKey="2-1">Menu 1</Menu.Item>
                    <Menu.Item itemKey="2-2">Menu 2</Menu.Item>
                    <Menu.Item itemKey="2-3">Menu 3</Menu.Item>
                    <Menu.Item itemKey="2-4">Menu 4</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title={'SubMenu 3'}>
                    <Menu.Item itemKey="3-1">Menu 1</Menu.Item>
                    <Menu.Item itemKey="3-2">Menu 2</Menu.Item>
                    <Menu.Item itemKey="3-3">Menu 3</Menu.Item>
                    <Menu.Item itemKey="3-4">Menu 4</Menu.Item>

                    <Menu.SubMenu title={'SubMenu 3-1'} styleType={'popover'}>
                        <Menu.Item itemKey="3-1-1">Menu 1</Menu.Item>
                        <Menu.Item itemKey="3-1-2">Menu 2</Menu.Item>
                        <Menu.Item itemKey="3-1-3">Menu 3</Menu.Item>
                        <Menu.Item itemKey="3-1-4">Menu 4</Menu.Item>
                    </Menu.SubMenu>
                </Menu.SubMenu>
            </Menu>
        </div>
    </div>
);
```

</details>

<details>
<summary>showSelectAll - 显示全选</summary>

```jsx
const Demo = () => (
    <div>
        <div className="demo-wrap">
            <Menu onChange={console.log} multiple>
                <Menu.Item itemKey="1">Menu 1</Menu.Item>
                <Menu.Item itemKey="2">Menu 2</Menu.Item>
                <Menu.Item itemKey="3">Menu 3</Menu.Item>
                <Menu.Item itemKey="4">Menu 4</Menu.Item>
                <Menu.SubMenu title={'SubMenu 1'}>
                    <Menu.Item itemKey="1-1">Menu 1</Menu.Item>
                    <Menu.Item itemKey="1-2">Menu 2</Menu.Item>
                    <Menu.Item itemKey="1-3">Menu 3</Menu.Item>
                    <Menu.Item itemKey="1-4">Menu 4</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title={'SubMenu 2'}>
                    <Menu.Item itemKey="2-1">Menu 1</Menu.Item>
                    <Menu.Item itemKey="2-2">Menu 2</Menu.Item>
                    <Menu.Item itemKey="2-3">Menu 3</Menu.Item>
                    <Menu.Item itemKey="2-4">Menu 4</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title={'SubMenu 3'} styleType={'popover'}>
                    <Menu.Item itemKey="3-1">Menu 1</Menu.Item>
                    <Menu.Item itemKey="3-2">Menu 2</Menu.Item>
                    <Menu.Item itemKey="3-3">Menu 3</Menu.Item>
                    <Menu.Item itemKey="3-4">Menu 4</Menu.Item>

                    <Menu.SubMenu title={'SubMenu 3-1'} styleType={'popover'}>
                        <Menu.Item itemKey="3-1-1">Menu 1</Menu.Item>
                        <Menu.Item itemKey="3-1-2">Menu 2</Menu.Item>
                        <Menu.Item itemKey="3-1-3">Menu 3</Menu.Item>
                        <Menu.Item itemKey="3-1-4">Menu 4</Menu.Item>
                    </Menu.SubMenu>
                </Menu.SubMenu>
            </Menu>
        </div>
        <div className="demo-wrap">
            <Menu onChange={console.log} multiple showSelectAll>
                <Menu.Item itemKey="1">Menu 1</Menu.Item>
                <Menu.Item itemKey="2">Menu 2</Menu.Item>
                <Menu.Item itemKey="3">Menu 3</Menu.Item>
                <Menu.Item itemKey="4">Menu 4</Menu.Item>
                <Menu.SubMenu title={'SubMenu 1'}>
                    <Menu.Item itemKey="1-1">Menu 1</Menu.Item>
                    <Menu.Item itemKey="1-2">Menu 2</Menu.Item>
                    <Menu.Item itemKey="1-3">Menu 3</Menu.Item>
                    <Menu.Item itemKey="1-4">Menu 4</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title={'SubMenu 2'}>
                    <Menu.Item itemKey="2-1">Menu 1</Menu.Item>
                    <Menu.Item itemKey="2-2">Menu 2</Menu.Item>
                    <Menu.Item itemKey="2-3">Menu 3</Menu.Item>
                    <Menu.Item itemKey="2-4">Menu 4</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title={'SubMenu 3'} styleType={'popover'}>
                    <Menu.Item itemKey="3-1">Menu 1</Menu.Item>
                    <Menu.Item itemKey="3-2">Menu 2</Menu.Item>
                    <Menu.Item itemKey="3-3">Menu 3</Menu.Item>
                    <Menu.Item itemKey="3-4">Menu 4</Menu.Item>

                    <Menu.SubMenu title={'SubMenu 3-1'} styleType={'popover'}>
                        <Menu.Item itemKey="3-1-1">Menu 1</Menu.Item>
                        <Menu.Item itemKey="3-1-2">Menu 2</Menu.Item>
                        <Menu.Item itemKey="3-1-3">Menu 3</Menu.Item>
                        <Menu.Item itemKey="3-1-4">Menu 4</Menu.Item>
                    </Menu.SubMenu>
                </Menu.SubMenu>
            </Menu>
        </div>
        <div className="demo-wrap">
            <Menu onChange={console.log}>
                <Menu.Item itemKey="1">Menu 1</Menu.Item>
                <Menu.Item itemKey="2">Menu 2</Menu.Item>
                <Menu.Item itemKey="3">Menu 3</Menu.Item>
                <Menu.Item itemKey="4">Menu 4</Menu.Item>
                <Menu.SubMenu title={'SubMenu 1'}>
                    <Menu.Item itemKey="1-1">Menu 1</Menu.Item>
                    <Menu.Item itemKey="1-2">Menu 2</Menu.Item>
                    <Menu.Item itemKey="1-3">Menu 3</Menu.Item>
                    <Menu.Item itemKey="1-4">Menu 4</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title={'SubMenu 2'}>
                    <Menu.Item itemKey="2-1">Menu 1</Menu.Item>
                    <Menu.Item itemKey="2-2">Menu 2</Menu.Item>
                    <Menu.Item itemKey="2-3">Menu 3</Menu.Item>
                    <Menu.Item itemKey="2-4">Menu 4</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title={'SubMenu 3'} styleType={'popover'}>
                    <Menu.Item itemKey="3-1">Menu 1</Menu.Item>
                    <Menu.Item itemKey="3-2">Menu 2</Menu.Item>
                    <Menu.Item itemKey="3-3">Menu 3</Menu.Item>
                    <Menu.Item itemKey="3-4">Menu 4</Menu.Item>

                    <Menu.SubMenu title={'SubMenu 3-1'} styleType={'popover'}>
                        <Menu.Item itemKey="3-1-1">Menu 1</Menu.Item>
                        <Menu.Item itemKey="3-1-2">Menu 2</Menu.Item>
                        <Menu.Item itemKey="3-1-3">Menu 3</Menu.Item>
                        <Menu.Item itemKey="3-1-4">Menu 4</Menu.Item>
                    </Menu.SubMenu>
                </Menu.SubMenu>
            </Menu>
        </div>
        <div className="demo-wrap">
            <Menu onChange={console.log} showSelectAll>
                <Menu.Item itemKey="1">Menu 1</Menu.Item>
                <Menu.Item itemKey="2">Menu 2</Menu.Item>
                <Menu.Item itemKey="3">Menu 3</Menu.Item>
                <Menu.Item itemKey="4">Menu 4</Menu.Item>
                <Menu.SubMenu title={'SubMenu 1'}>
                    <Menu.Item itemKey="1-1">Menu 1</Menu.Item>
                    <Menu.Item itemKey="1-2">Menu 2</Menu.Item>
                    <Menu.Item itemKey="1-3">Menu 3</Menu.Item>
                    <Menu.Item itemKey="1-4">Menu 4</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title={'SubMenu 2'}>
                    <Menu.Item itemKey="2-1">Menu 1</Menu.Item>
                    <Menu.Item itemKey="2-2">Menu 2</Menu.Item>
                    <Menu.Item itemKey="2-3">Menu 3</Menu.Item>
                    <Menu.Item itemKey="2-4">Menu 4</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title={'SubMenu 3'} styleType={'popover'}>
                    <Menu.Item itemKey="3-1">Menu 1</Menu.Item>
                    <Menu.Item itemKey="3-2">Menu 2</Menu.Item>
                    <Menu.Item itemKey="3-3">Menu 3</Menu.Item>
                    <Menu.Item itemKey="3-4">Menu 4</Menu.Item>

                    <Menu.SubMenu title={'SubMenu 3-1'} styleType={'popover'}>
                        <Menu.Item itemKey="3-1-1">Menu 1</Menu.Item>
                        <Menu.Item itemKey="3-1-2">Menu 2</Menu.Item>
                        <Menu.Item itemKey="3-1-3">Menu 3</Menu.Item>
                        <Menu.Item itemKey="3-1-4">Menu 4</Menu.Item>
                    </Menu.SubMenu>
                </Menu.SubMenu>
            </Menu>
        </div>
    </div>
);
```

</details>

<details>
<summary>virtual - 虚拟列表</summary>

```jsx
const generateItems = (count, prefix, need) => {
    return new Array(count).fill(null).map((v, i) => {
        const key = `${prefix}-${i}-item`;
        let subItems = [];
        if (need && i === 5) {
            subItems = generateItems(6, key);
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
    const itemCount = 100000;
    const menuItems = generateItems(itemCount, prefix, true);
    return menuItems;
};

const dataSource = generateGroupData(0, 'root');

const render = children => {
    return children.map(item =>
        item.children ? (
            <Menu.SubMenu key={item.key} title={item.title}>
                {render(item.children)}
            </Menu.SubMenu>
        ) : (
            <Menu.Item key={item.key}>{item.title}</Menu.Item>
            // <div key={item.key}>{item.title}</div>
        )
    );
};

const Demo = () => (
    <div>
        <h3>不支持 collapse 类 SubMenu，子菜单目前不支持虚拟列表</h3>
        <div className="demo-wrap">
            <h3>为了防止滚动时由于渲染内容宽度不一致导致的宽度变化，可以加上固定宽度</h3>
            <Menu multiple showSelectAll onChange={console.log} style={{ width: 150 }} virtualList>
                {render(dataSource)}
            </Menu>
        </div>
        <div className="demo-wrap">
            <h3>指定滚动高度</h3>
            <Menu multiple showSelectAll onChange={console.log} style={{ width: 150 }} virtualList={{ height: 500 }}>
                {render(dataSource)}
            </Menu>
        </div>
        <div className="demo-wrap">
            <h3>简易模式，不会关注元素高度变化，会有更好的性能</h3>
            <Menu multiple showSelectAll onChange={console.log} style={{ width: 150 }} virtualList={{ simple: true }}>
                {render(dataSource)}
            </Menu>
        </div>
    </div>
);
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
