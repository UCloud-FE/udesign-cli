---
name: cpn-basic-nav
description: 帮助 AI 正确使用 UDesign Nav 组件（基础导航）。当需要使用 Nav 时加载此技能。
---

# 使用 Nav 组件

<!-- MANUAL_START: overview -->
## 技能概述

这是 Nav 基础导航
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { Nav } from '@ucloud-fe/react-components';
```

> ⚠️ **全局规范 - 所有组件通用**:
> - 生成纯 JavaScript (JSX) 代码，**不要使用 TypeScript 类型注解**
> - **禁止**使用 `@alicloud/*`、`@aliyun/*`、`antd` 等外部组件库
> - 优先使用 UDesign 组件，不要用 HTML 原生标签替代
<!-- AUTO_END: import -->

<!-- AUTO_START: basic-usage -->
### 基本用法

```jsx
const onClick = info => {
    console.log('click ', info);
};

const Demo = () => (
    <div style={{ width: 240 }}>
        <Nav
            onClick={onClick}
            items={[
                {
                    icon: <SvgIcon type="calendar" />,
                    key: '410',
                    label: '一级正常标题'
                },
                {
                    icon: <SvgIcon type="cog" />,
                    key: '418',
                    label: '一级标题一级标题一级标题一级标题一级标题一级标题一级标题'
                },
                {
                    key: '417',
                    label: '一级正常标题无icon'
                },
                {
                    icon: <SvgIcon type="calendar" />,
                    key: '419',
                    label: '一级小标题',
                    labelType: 'small'
                },
                {
                    key: '416',
                    labelType: 'small',
                    label: '一级小标题无icon'
                }
            ]}
        />
    </div>
);
```
<!-- AUTO_END: basic-usage -->

<!-- AUTO_START: props-table -->
### API 参数

| 属性 | 类型 | 默认值 | 必填 | 说明 |
|------|------|--------|------|------|
| mode | `"vertical" | "inline"` | `'inline'` | - | 菜单类型，垂直或内嵌，默认内嵌 |
| items | `ItemType[]` | - | - | 菜单项 |
| inlineCollapsed | `boolean` | - | - | inline 时菜单是否收起状态 |
| inlineIndent | `number` | `32` | - | 每一级缩进量 |
| defaultOpenKeys | `string[]` | - | - | 初始展开的 SubMenu 菜单项 key 数组 |
| defaultSelectedKeys | `string[]` | - | - | 初始选中的菜单项 key 数组 |
| onOpenChange | `(openKeys: string[]) => void` | - | - | SubMenu 展开/关闭的回调 |
| onSelect | `any` | - | - | 选中每一菜单项的回调, function({key:String, item:ReactComponent, domEvent:Event, selectedKeys:String[]}) |
| subMenuItemRender | `(itemProps: SubMenuProps, dom: JSX.Element) => JSX.Element` | - | - | 自定义 SubMenu render，可以获取 items 参数传入的数据 |
| menuItemRender | `(itemProps: NavItemProps, dom: JSX.Element) => JSX.Element` | - | - | 自定义 MenuItem render，可以获取 items 参数传入的数据 |
<!-- AUTO_END: props-table -->



<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>只有一级目录</summary>

```jsx
const onClick = info => {
    console.log('click ', info);
};

const Demo = () => (
    <div style={{ width: 240 }}>
        <Nav
            onClick={onClick}
            items={[
                {
                    icon: <SvgIcon type="calendar" />,
                    key: '410',
                    label: '一级正常标题'
                },
                {
                    icon: <SvgIcon type="cog" />,
                    key: '418',
                    label: '一级标题一级标题一级标题一级标题一级标题一级标题一级标题'
                },
                {
                    key: '417',
                    label: '一级正常标题无icon'
                },
                {
                    icon: <SvgIcon type="calendar" />,
                    key: '419',
                    label: '一级小标题',
                    labelType: 'small'
                },
                {
                    key: '416',
                    labelType: 'small',
                    label: '一级小标题无icon'
                }
            ]}
        />
    </div>
);
```

</details>

<details>
<summary>一/二级目录 + 切换应用 + 分类标题 + 路由跳转</summary>

```jsx
const Demo = () => (
    <div style={{ width: 240 }}>
        <Nav
            subMenuItemRender={(props, dom) => {
                return (
                    <div
                        onClick={() => {
                            console.log('click sub menu, props:', props);
                        }}
                    >
                        {dom}
                    </div>
                );
            }}
            menuItemRender={(props, dom) => {
                return (
                    <div
                        onClick={() => {
                            console.log('click menu item, props:', props);
                        }}
                    >
                        {dom}
                    </div>
                );
            }}
            items={[
                {
                    key: '410',
                    label: '分类小标题',
                    labelType: 'small',
                    children: [
                        {
                            icon: <SvgIcon type="calendar" />,
                            key: '411',
                            label: '二级标题',
                            path: '/cloud-fe/resource/resourceset',
                            children: [
                                {
                                    icon: <SvgIcon type="calendar" />,
                                    key: '4131',
                                    label: '三级标题',
                                    path: '/cloud-fe/resource/resourceset'
                                }
                            ]
                        }
                    ]
                },

                {
                    icon: <SvgIcon type="calendar" />,
                    key: '418',
                    label: '一级标题',
                    children: [
                        {
                            icon: <SvgIcon type="calendar" />,
                            key: '413',
                            label: '二级标题',
                            labelType: 'small',
                            path: '/cloud-fe/resource/resourceset'
                        },
                        {
                            children: [
                                {
                                    key: '4122211',
                                    label: '三级分类小标题',
                                    labelType: 'small',
                                    path: '/cloud-fe/resource/resourceset'
                                },
                                {
                                    key: '412222222',
                                    label: '资源管理',
                                    path: '/cloud-fe/resource/resourceset',
                                    children: [
                                        {
                                            key: '51',
                                            label: '四级分类小标题',
                                            labelType: 'small',
                                            path: '/cloud-fe/resource/resourceset'
                                        },
                                        {
                                            key: '33',
                                            label: '四级标题',
                                            path: '/cloud-fe/resource/resourceset'
                                        }
                                    ]
                                }
                            ],

                            icon: <SvgIcon type="calendar" />,
                            key: '41222',
                            label: '资源管理222',
                            path: '/cloud-fe/resource/resourceset'
                        }
                    ]
                },
                {
                    icon: <SvgIcon type="calendar" />,
                    key: '417',
                    label: '资源管理',
                    children: [
                        {
                            icon: <SvgIcon type="calendar" />,
                            key: '4166',
                            label: '资源管理',
                            path: '/cloud-fe/resource/resourceset'
                        }
                    ]
                },
                {
                    icon: <SvgIcon type="calendar" />,
                    key: '416',
                    label: '资源管理',
                    children: [
                        {
                            icon: <SvgIcon type="calendar" />,
                            key: '4641',
                            label: '资源管理',
                            path: '/cloud-fe/resource/resourceset'
                        }
                    ]
                },
                {
                    icon: <SvgIcon type="calendar" />,
                    key: '415',
                    label: '资源管理',
                    children: [
                        {
                            icon: <SvgIcon type="calendar" />,
                            key: '4143',
                            label: '资源管理',
                            path: '/cloud-fe/resource/resourceset'
                        }
                    ]
                },
                {
                    icon: <SvgIcon type="calendar" />,
                    key: '414',
                    label: '资源管理',
                    children: [
                        {
                            icon: <SvgIcon type="calendar" />,
                            key: '4124',
                            label: '资源管理',
                            path: '/cloud-fe/resource/resourceset'
                        }
                    ]
                }
            ]}
        />
    </div>
);
```

</details>

<details>
<summary>受控模式</summary>

```jsx
const Demo = () => {
    const [openKeys, setOpenKeys] = React.useState(['410', '411']);
    const [selectedKeys, setSelectedKeys] = React.useState(['4131']);
    console.log('openKyes: ', openKeys);
    console.log('selectedKeys: ', selectedKeys);

    return (
        <div style={{ width: 240 }}>
            <Nav
                onOpenChange={keys => {
                    setOpenKeys(keys);
                }}
                openKeys={openKeys}
                defaultOpenKeys={openKeys}
                selectedKeys={selectedKeys}
                onSelect={({ selectedKeys }) => setSelectedKeys(selectedKeys)}
                items={[
                    {
                        icon: <SvgIcon type="calendar" />,
                        key: '410',
                        label: '一级分类小标题',
                        labelType: 'small',
                        children: [
                            {
                                icon: <SvgIcon type="calendar" />,
                                key: '411',
                                label: '二级标题',
                                path: '/cloud-fe/resource/resourceset',
                                children: [
                                    {
                                        icon: <SvgIcon type="calendar" />,
                                        key: '4131',
                                        label: '资源管理sub',
                                        path: '/cloud-fe/resource/resourceset'
                                    }
                                ]
                            }
                        ]
                    },

                    {
                        icon: <SvgIcon type="calendar" />,
                        key: '418',
                        label: '一级标题',
                        children: [
                            {
                                icon: <SvgIcon type="calendar" />,
                                key: '413',
                                label: '资源管理',
                                path: '/cloud-fe/resource/resourceset'
                            }
                        ]
                    },
                    {
                        icon: <SvgIcon type="calendar" />,
                        key: '417',
                        label: '资源管理',
                        children: [
                            {
                                icon: <SvgIcon type="calendar" />,
                                key: '4166',
                                label: '资源管理',
                                path: '/cloud-fe/resource/resourceset'
                            }
                        ]
                    }
                ]}
            />
        </div>
    );
};
```

</details>

<details>
<summary>垂直展开 + 路由跳转</summary>

```jsx
const Demo = () => (
    <div style={{ width: 240 }}>
        <Nav
            mode="vertical"
            defaultSelectedKeys={['4131']}
            subMenuItemRender={(props, dom) => {
                return (
                    <div
                        onClick={() => {
                            console.log('click sub menu, props:', props);
                        }}
                    >
                        {dom}
                    </div>
                );
            }}
            menuItemRender={(props, dom) => {
                return (
                    <div
                        onClick={() => {
                            console.log('click menu item, props:', props);
                        }}
                    >
                        {dom}
                    </div>
                );
            }}
            items={[
                {
                    icon: <SvgIcon type="calendar" />,
                    key: '410',
                    label: '小标题',
                    labelType: 'small',
                    children: [
                        {
                            icon: <SvgIcon type="calendar" />,
                            key: '411',
                            label: '一级菜单',
                            path: '/cloud-fe/resource/resourceset',
                            children: [
                                {
                                    icon: <SvgIcon type="calendar" />,
                                    key: '4131',
                                    label: '资源管理',
                                    path: '/cloud-fe/resource/resourceset'
                                }
                            ]
                        }
                    ]
                },
                {
                    icon: <SvgIcon type="calendar" />,
                    key: '419',
                    label: '资源管33理'
                },
                {
                    icon: <SvgIcon type="calendar" />,
                    key: '418',
                    label: '一级标题',
                    children: [
                        {
                            icon: <SvgIcon type="calendar" />,
                            key: '413',
                            label: '资源管理',
                            path: '/cloud-fe/resource/resourceset'
                        },
                        {
                            children: [
                                {
                                    key: '4122211',
                                    label: 'cahidjailj',
                                    path: '/cloud-fe/resource/resourceset'
                                },
                                {
                                    key: '412222222',
                                    label: '32',
                                    path: '/cloud-fe/resource/resourceset'
                                }
                            ],
                            icon: <SvgIcon type="calendar" />,
                            key: '41222',
                            label: '资源管理222',
                            path: '/cloud-fe/resource/resourceset'
                        }
                    ]
                },
                {
                    icon: <SvgIcon type="calendar" />,
                    key: '417',
                    label: '资源管理',
                    children: [
                        {
                            icon: <SvgIcon type="calendar" />,
                            key: '4166',
                            label: '资源管理',
                            path: '/cloud-fe/resource/resourceset'
                        }
                    ]
                },
                {
                    icon: <SvgIcon type="calendar" />,
                    key: '416',
                    label: '资源管理1',
                    children: [
                        {
                            icon: <SvgIcon type="calendar" />,
                            key: '4641',
                            label: '资源管理2',
                            path: '/cloud-fe/resource/resourceset'
                        }
                    ]
                }
            ]}
        />
    </div>
);
```

</details>

<details>
<summary>折叠目录</summary>

```jsx
const Demo = () => (
    <div style={{ width: 'fit-content' }}>
        <Nav
            inlineCollapsed={true}
            items={[
                {
                    key: '410',
                    label: '小标题无icon',
                    labelType: 'small',
                    children: [
                        {
                            icon: <SvgIcon type="calendar" />,
                            key: '411',
                            label: '一级菜单',
                            path: '/cloud-fe/resource/resourceset',
                            children: [
                                {
                                    icon: <SvgIcon type="calendar" />,
                                    key: '4131',
                                    label: '资源管理',
                                    path: '/cloud-fe/resource/resourceset'
                                }
                            ]
                        }
                    ]
                },
                {
                    icon: <SvgIcon type="cog" />,
                    key: '2',
                    label: '小标题有icon',
                    labelType: 'small',
                    children: [
                        {
                            icon: <SvgIcon type="calendar" />,
                            key: '21',
                            label: '2级菜单',
                            path: '/cloud-fe/resource/resourceset'
                        }
                    ]
                },
                {
                    icon: <SvgIcon type="calendar" />,
                    key: '419',
                    label: '无子菜单菜单项'
                },
                {
                    icon: <SvgIcon type="calendar" />,
                    key: '418',
                    label: '一级标题',
                    children: [
                        {
                            icon: <SvgIcon type="calendar" />,
                            key: '413',
                            label: '资源管理small',
                            path: '/cloud-fe/resource/resourceset',
                            labelType: 'small',
                            children: [
                                {
                                    key: '412df',
                                    label: 'cahidjailj',
                                    path: '/cloud-fe/resource/resourceset'
                                },
                                {
                                    key: '412222df',
                                    label: '32',
                                    path: '/cloud-fe/resource/resourceset'
                                }
                            ]
                        },
                        {
                            children: [
                                {
                                    key: '4122211',
                                    label: 'cahidjailj',
                                    path: '/cloud-fe/resource/resourceset'
                                },
                                {
                                    key: '412222222',
                                    label: '32',
                                    path: '/cloud-fe/resource/resourceset'
                                }
                            ],
                            icon: <SvgIcon type="calendar" />,
                            key: '41222',
                            label: '资源管理222',
                            path: '/cloud-fe/resource/resourceset'
                        }
                    ]
                },
                {
                    key: '417',
                    label: '一级标题无icon',
                    children: [
                        {
                            icon: <SvgIcon type="calendar" />,
                            key: '4166',
                            label: '二级资源管理',
                            path: '/cloud-fe/resource/resourceset'
                        }
                    ]
                },
                {
                    icon: <SvgIcon type="calendar" />,
                    key: '416',
                    label: '资源管理1',
                    children: [
                        {
                            icon: <SvgIcon type="calendar" />,
                            key: '4641',
                            label: '资源管理2',
                            path: '/cloud-fe/resource/resourceset'
                        }
                    ]
                }
            ]}
        />
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
