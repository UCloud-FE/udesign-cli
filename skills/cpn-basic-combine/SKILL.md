---
name: cpn-basic-combine
description: 帮助 AI 正确使用 UDesign Combine 组件（组件，主要用于组合各种表单控件的布局）。当需要使用 Combine 时加载此技能。
---


# 使用 Combine 组件

<!-- MANUAL_START: overview -->
## 技能概述

这是 Combine 组件，主要用于组合各种表单控件的布局
提供紧凑型布局和间隔型布局，并可方便控件间 props 共享
<del>_Combine 会在包裹的组件上添加 className，让组件 display 变为 inline-block，vertical-align 变为 middle，并在组件间添加间距。所以包裹的组件需要注意 className 的继承。_</del>
由于类名继承某些情况下比较繁琐，如在外层包裹 Popover、Tooltip 或其他组件等情况下，故现修改为使用容器包裹的方式来进行排版，容器为 inline-block、vertical-align 为 middle。
关于 sharedProps：使用 sharedProps 除了影响 size 外还会在包裹的组件上添加 props，如果外层组件包裹了 Popover 等 sharedProps 会被 Popover 拿到，而导致内部拿不到，这种情况可以自己传递或直接把 sharedProps 放到包裹的组件中
child 为 null、undefined、false 时不做包裹，空字符串、0 不受影响
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { Combine } from '@ucloud-fe/react-components';
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
            <Combine separator="-">
                {undefined}
                <Input />
                {null}
                {undefined}
                {''}
                {false}
            </Combine>
        </div>
    </div>
);
```
<!-- AUTO_END: basic-usage -->

<!-- AUTO_START: props-table -->
### API 参数

| 属性 | 类型 | 默认值 | 必填 | 说明 |
|------|------|--------|------|------|
| children | `ReactNode` | - | ✅ |  |
| sharedProps | `{ [key: string]: unknown; size?: "sm" | "md" | "lg"; className?: string; }` | `{}` | - | children 共享属性 |
| spacing | `string` | `'smart'` | - | 间距 |
| separator | `any` | - | - | 分隔符 |
<!-- AUTO_END: props-table -->



<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>演示</summary>

```jsx
const Sizes = ['sm', 'md', 'lg'];
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 'md',
            spacing: 'smart',
            separator: 'default'
        };
    }
    render() {
        const { size, disabled, spacing, separator } = this.state;
        const itemLayout = {
            labelCol: {
                span: 3
            },
            controllerCol: {
                span: 9
            }
        };
        const props = {};
        switch (separator) {
            case '-':
                props.separator = '-';
                break;
            case 'icon':
                props.separator = <Icon type="arrow-right" />;
                break;
        }
        return (
            <div>
                <Form className="demo-form">
                    <Form.Item label="size" {...itemLayout}>
                        <Radio.Group
                            value={size}
                            onChange={size => this.setState({ size })}
                            options={Sizes.map(size => ({
                                value: size
                            }))}
                        />
                    </Form.Item>
                    <Form.Item label="disabled" {...itemLayout}>
                        <Switch checked={disabled} onChange={disabled => this.setState({ disabled })} />
                    </Form.Item>
                    <Form.Item label="spacing" {...itemLayout}>
                        <Radio.Group
                            value={spacing}
                            onChange={spacing => this.setState({ spacing })}
                            options={['smart', 'compact', 'sm', 'md', 'lg'].map(spacing => ({
                                value: spacing
                            }))}
                        />
                    </Form.Item>
                    <Form.Item label="separator" {...itemLayout}>
                        <Radio.Group
                            value={separator}
                            onChange={separator => this.setState({ separator })}
                            options={['default', '-', 'icon'].map(separator => ({
                                value: separator
                            }))}
                        />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Combine sharedProps={{ size, disabled }} spacing={spacing} {...props}>
                        <Select options={[1, 2, 3].map(i => ({ value: i }))} />
                        <Input />
                    </Combine>
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>sharedProps - props 共享</summary>

```jsx
const Demo = () => (
    <div>
        <div className="demo-wrap">
            <Combine sharedProps={{ size: 'sm' }}>
                <Select options={[1, 2, 3].map(i => ({ value: i }))} />
                <Input />
            </Combine>
        </div>
        <div className="demo-wrap">
            <Combine sharedProps={{ className: 'test_cls' }}>
                <Select options={[1, 2, 3].map(i => ({ value: i }))} />
                <Input />
            </Combine>
        </div>
    </div>
);
```

</details>

<details>
<summary>spacing - 间距</summary>

```jsx
const Demo = () => (
    <div>
        <div>
            <h3>spacing: smart</h3>
            <div className="demo-wrap">
                <Combine>
                    <Input />
                    <Button styleType="primary">按钮</Button>
                </Combine>
            </div>
        </div>
        {['sm', 'md', 'lg'].map(size => (
            <div key={size}>
                <h3>spacing: smart - {size}</h3>
                <div className="demo-wrap">
                    <Combine sharedProps={{ size }}>
                        <Input />
                        <Button styleType="primary">按钮</Button>
                    </Combine>
                </div>
            </div>
        ))}
        {['sm', 'md', 'lg'].map(size => (
            <div key={size}>
                <h3>spacing: {size}</h3>
                <div className="demo-wrap">
                    <Combine spacing={size}>
                        <Input />
                        <Button styleType="primary">按钮</Button>
                    </Combine>
                </div>
            </div>
        ))}
        <h3>spacing: compact</h3>
        <div className="demo-wrap">
            <Combine spacing="compact">
                <Select options={[1, 2, 3].map(i => ({ value: i }))} />
                <Input />
            </Combine>
        </div>
        <h3>spacing: custom</h3>
        <div className="demo-wrap">
            <Combine spacing="40px">
                <Input />
                <Button styleType="primary">按钮</Button>
            </Combine>
        </div>
    </div>
);
```

</details>

<details>
<summary>separator - 分隔符</summary>

```jsx
const Demo = () => (
    <div>
        <div className="demo-wrap">
            <Combine separator="-">
                <Select options={[1, 2, 3].map(i => ({ value: i }))} />
                <Select options={[1, 2, 3].map(i => ({ value: i }))} />
                <Select options={[1, 2, 3].map(i => ({ value: i }))} />
            </Combine>
        </div>
        <div className="demo-wrap">
            <Combine separator={<Icon type="arrow-right" />}>
                <Select options={[1, 2, 3].map(i => ({ value: i }))} />
                <Select options={[1, 2, 3].map(i => ({ value: i }))} />
                <Select options={[1, 2, 3].map(i => ({ value: i }))} />
            </Combine>
        </div>
    </div>
);
```

</details>

<details>
<summary>null - 空值处理</summary>

```jsx
const Demo = () => (
    <div>
        <div className="demo-wrap">
            <Combine separator="-">
                {undefined}
                <Input />
                {null}
                {undefined}
                {''}
                {false}
            </Combine>
        </div>
    </div>
);
```

</details>

<details>
<summary>demo - 样例展示</summary>

```jsx
const Demo = () => (
    <div>
        <h3>组合</h3>
        <div className="demo-wrap">
            <Combine>
                <Combine spacing="compact">
                    <Select options={[1, 2, 3].map(i => ({ value: i }))} />
                    <Input />
                </Combine>
                <Button styleType="primary">按钮</Button>
            </Combine>
        </div>

        <h3>按钮组</h3>
        <div className="demo-wrap">
            <Combine>
                <Button styleType="primary">按钮组展示</Button>
                <Button>按钮组展示</Button>
                <Button>按钮组展示</Button>
                <Button disabled>按钮组展示</Button>
            </Combine>
        </div>

        <h3>工具栏</h3>
        <div className="demo-wrap">
            <Combine>
                <Input.Search />
                <Button icon="repeat" />
                <Button icon="cog" />
                <Button icon="cloud-download" />
                <Button>按钮</Button>
            </Combine>
        </div>
    </div>
);
```

</details>

<!-- AUTO_END: demos -->

<!-- MANUAL_START: best-practices -->
## 最佳实践

1. **使用 `sharedProps` 统一尺寸**：避免每个子组件重复设置 `size`
2. **默认 `spacing="smart"` 即可**：会根据 size 自动选择合适间距
3. **注意 sharedProps 与 Popover 包裹的兼容性**：如果子组件外层包裹了 Popover，sharedProps 可能会被 Popover 接收，此时需手动传递

### 常见场景

#### 搜索栏

```jsx
<Combine sharedProps={{ size: 'md' }}>
  <Select value={type} onChange={setType} options={typeOptions} />
  <Input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="请输入关键词" />
  <Button styleType="primary" onClick={handleSearch}>搜索</Button>
</Combine>
```

#### 日期范围

```jsx
<Combine separator="~">
  <DatePicker value={startDate} onChange={setStartDate} />
  <DatePicker value={endDate} onChange={setEndDate} />
</Combine>
```
<!-- MANUAL_END: best-practices -->

<!-- MANUAL_START: faq -->
## 常见问题

### Q: sharedProps 传的 size 没生效？

A: 如果子组件被 Popover、Tooltip 等包裹，sharedProps 会被外层组件拿到。解决方案是在目标组件上直接传入 props。
<!-- MANUAL_END: faq -->

<!-- MANUAL_START: critical -->
## 注意事项

_（待补充）_
<!-- MANUAL_END: critical -->
