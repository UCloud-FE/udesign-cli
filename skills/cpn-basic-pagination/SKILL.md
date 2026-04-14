---
name: cpn-basic-pagination
description: 帮助 AI 正确使用 UDesign Pagination 组件（组件）。当需要使用 Pagination 时加载此技能。
---

# 使用 Pagination 组件

<!-- MANUAL_START: overview -->
## 技能概述

这是 Pagination 组件
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { Pagination } from '@ucloud-fe/react-components';
```

> ⚠️ **全局规范 - 所有组件通用**:
> - 生成纯 JavaScript (JSX) 代码，**不要使用 TypeScript 类型注解**
> - **禁止**使用 `@alicloud/*`、`@aliyun/*`、`antd` 等外部组件库
> - 优先使用 UDesign 组件，不要用 HTML 原生标签替代
<!-- AUTO_END: import -->

<!-- AUTO_START: basic-usage -->
### 基本用法

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Pagination total={100} />
                </div>
                <div className="demo-wrap">
                    <Pagination total={100} simple />
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
| current | `unknown` | - | - | 当前页，受控 |
| defaultCurrent | `unknown` | `1` | - | 默认当前页，非受控 |
| total | `unknown` | `0` | - | 总数 |
| showTotal | `unknown` | - | - | 自定义展示 total 值 |
| pageSize | `unknown` | - | - | 每页数量，受控 |
| defaultPageSize | `unknown` | `10` | - | 默认每页数量，非受控 |
| onChange | `unknown` | `function noop() {}` | - | 修改回调 |
| onAdvise | `unknown` | - | - | 修改建议回调，如传入的total为10，当前pageSize为10，当前current却为2时会触发 |
| hideOnSinglePage | `unknown` | `false` | - |  |
| showSizeChanger | `unknown` | `false` | - | 显示分页数量调节 |
| showLessItems | `unknown` | `false` | - | 是否显示3个 |
| onPageSizeChange | `unknown` | `function noop() {}` | - | 分页数量变化回调 |
| showPrevNextJumpers | `unknown` | `true` | - | 显示更多页面跳转按钮 |
| showQuickJumper | `unknown` | `false` | - | 显示快速跳转，传入goButton显示跳转按钮 |
| showTitle | `unknown` | `true` | - | 显示按钮的title |
| pageSizeOptions | `unknown` | - | - | 分页配置 |
| simple | `unknown` | - | - | 简易分页 |
| locale | `unknown` | - | - |  |
| className | `unknown` | - | - |  |
| itemRender | `unknown` | `function defaultItemRender(page, type, element) {
    if (type === 'prev') {
        return <SvgIcon type="arrow-left" className={`${prefixCls}-prev-icon`} />;
    }
    if (type === 'next') {
        return <SvgIcon type="arrow-right" className={`${prefixCls}-next-icon`} />;
    }
    if (type === 'jump-prev' || type === 'jump-next') {
        return <SvgIcon type="ellipsis" className={`${prefixCls}-jump-icon`} />;
    }
    return element;
}` | - |  |
| size | `unknown` | `'md'` | - | 尺寸 |
| optionsProps | `unknown` | - | - |  |
<!-- AUTO_END: props-table -->



<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>演示</summary>

```jsx
const { Size } = Pagination;
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 'md',
            showTitle: false,
            showQuickJumper: false,
            showSizeChanger: false,
            showPrevNextJumpers: false,
            simple: false,
            goButton: false,
            total: 100
        };
    }
    render() {
        const {
            size,
            showTitle,
            showQuickJumper,
            showSizeChanger,
            showPrevNextJumpers,
            simple,
            goButton,
            total,
            showTotal
        } = this.state;
        const itemLayout = {
            labelCol: {
                span: 2
            },
            controllerCol: {
                span: 10
            }
        };
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
                    {[
                        'showTitle',
                        'showQuickJumper',
                        'goButton',
                        'showSizeChanger',
                        'showPrevNextJumpers',
                        'simple',
                        'showTotal'
                    ].map(key => (
                        <Form.Item key={key} label={key} {...itemLayout}>
                            <Switch checked={this.state[key]} onChange={v => this.setState({ [key]: v })} />
                        </Form.Item>
                    ))}
                    <Form.Item label="total" {...itemLayout}>
                        <NumberInput value={total} onChange={total => this.setState({ total })} />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Pagination
                        {...{
                            size,
                            showTitle,
                            showQuickJumper: showQuickJumper ? { goButton } : false,
                            showSizeChanger,
                            showPrevNextJumpers,
                            total,
                            simple,
                            showTotal
                        }}
                        onChange={(...args) => console.log('onChange', ...args)}
                        onPageSizeChange={(...args) => console.log('onPageSizeChange', ...args)}
                        onAdvise={(...args) => console.log('onAdvise', ...args)}
                    />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>size - 尺寸</summary>

```jsx
const { Size } = Pagination;
class Demo extends React.Component {
    render() {
        return (
            <div>
                {Size.map(size => (
                    <div className="demo-wrap" key={size}>
                        <Pagination size={size} total={100}>
                            Pagination
                        </Pagination>
                    </div>
                ))}
            </div>
        );
    }
}
```

</details>

<details>
<summary>total - 总数量</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Pagination total={100} />
                </div>
                <div className="demo-wrap">
                    <Pagination total={21} />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>showTotal - 自定义 total 展示</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Pagination total={100} showTotal />
                </div>
                <div className="demo-wrap">
                    <Pagination total={100} showTotal={total => `总共有 ${total} 条数据`} />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>pageSize - 每页的数量</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Pagination total={100} pageSize={20} showSizeChanger />
                </div>
                <div className="demo-wrap">
                    <Pagination total={100} defaultPageSize={20} showSizeChanger />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>pageSizeOptions - 页数菜单选项</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Pagination total={100} showSizeChanger pageSizeOptions={['10', '30', '50', '100']} />
                </div>
                <div className="demo-wrap">
                    <Pagination total={100} showSizeChanger />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>showLessItems - 只显示少量的按钮</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Pagination total={100} />
                </div>
                <div className="demo-wrap">
                    <Pagination total={100} showLessItems />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>showPrevNextJumpers - 显示更多页面跳转</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Pagination total={100} />
                </div>
                <div className="demo-wrap">
                    <Pagination total={100} showPrevNextJumpers={false} />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>showQuickJumper - 显示快捷跳转</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Pagination total={100} />
                </div>
                <div className="demo-wrap">
                    <Pagination total={100} showQuickJumper />
                </div>
                <div className="demo-wrap">
                    <Pagination total={100} showQuickJumper={{ goButton: true }} />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>showSizeChanger - 显示分页调节菜单</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Pagination total={100} />
                </div>
                <div className="demo-wrap">
                    <Pagination total={100} showSizeChanger />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>showTitle - 显示 title</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Pagination total={100} />
                </div>
                <div className="demo-wrap">
                    <Pagination total={100} showTitle={false} />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>simple - 简洁模式</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Pagination total={100} />
                </div>
                <div className="demo-wrap">
                    <Pagination total={100} simple />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>uncontrolled</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Pagination total={100} current={1} onChange={console.log} />
                </div>
                <div className="demo-wrap">
                    <Pagination total={100} defaultCurrent={1} />
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
