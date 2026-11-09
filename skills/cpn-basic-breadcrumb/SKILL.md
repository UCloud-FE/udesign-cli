---
name: cpn-basic-breadcrumb
description: 帮助 AI 正确使用 UDesign Breadcrumb 组件（面包屑组件，配合子组件 Item 使用）。当需要使用 Breadcrumb 时加载此技能。
---


# 使用 Breadcrumb 组件

<!-- MANUAL_START: overview -->
## 技能概述

面包屑组件，配合子组件 Item 使用
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { Breadcrumb } from '@ucloud-fe/react-components';
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
                {['', '>', '>>', '->', <Icon key="icon" type="caret-right" />].map((separator, i) => (
                    <div className="demo-wrap" key={i}>
                        <Breadcrumb separator={separator}>
                            <Breadcrumb.BackButton type="left" onClick={() => window.history.back()} />
                            <Breadcrumb.Item noAction>
                                <Icon type="home" />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item onClick={() => window.location.reload()}>
                                <Icon type="uhost" />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href="https://www.google.com" target="_blank">
                                google
                            </Breadcrumb.Item>
                            <Breadcrumb.Item onClick={() => window.location.reload()}>reload</Breadcrumb.Item>
                            <Breadcrumb.Item current>current</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                ))}
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
| separator | `any` | `'/'` | - | 自定义分隔符 |
| styleType | `"block-hover" | "hover" | "active"` | `'block-hover'` | - | 展示项激活样式的方式 |
<!-- AUTO_END: props-table -->



<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>演示</summary>

```jsx
const itemLayout = {
    labelCol: {
        span: 3
    },
    controllerCol: {
        span: 9
    }
};
const StyleType = ['block-hover', 'hover', 'active'];
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            separator: '/',
            styleType: 'block-hover'
        };
    }
    render() {
        const { separator, styleType } = this.state;
        return (
            <div>
                <Form className="demo-form">
                    <Form.Item label="separator" {...itemLayout}>
                        <Input value={separator} onChange={e => this.setState({ separator: e.target.value })} />
                    </Form.Item>
                    <Form.Item label="styleType" {...itemLayout}>
                        <Radio.Group
                            options={StyleType.map(styleType => ({ value: styleType }))}
                            value={styleType}
                            onChange={styleType => this.setState({ styleType })}
                        />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Breadcrumb separator={separator} styleType={styleType}>
                        <Breadcrumb.BackButton type="left" onClick={() => window.history.back()} />
                        <Breadcrumb.Item noAction>
                            <Icon type="home" />
                        </Breadcrumb.Item>
                        <Breadcrumb.Item onClick={() => window.location.reload()}>
                            <Icon type="uhost" />
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href="https://www.google.com" target="_blank">
                            google
                        </Breadcrumb.Item>
                        <Breadcrumb.Item onClick={() => window.location.reload()}>reload</Breadcrumb.Item>
                        <Breadcrumb.Item current>current</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>separator - 分隔符</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                {['', '>', '>>', '->', <Icon key="icon" type="caret-right" />].map((separator, i) => (
                    <div className="demo-wrap" key={i}>
                        <Breadcrumb separator={separator}>
                            <Breadcrumb.BackButton type="left" onClick={() => window.history.back()} />
                            <Breadcrumb.Item noAction>
                                <Icon type="home" />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item onClick={() => window.location.reload()}>
                                <Icon type="uhost" />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href="https://www.google.com" target="_blank">
                                google
                            </Breadcrumb.Item>
                            <Breadcrumb.Item onClick={() => window.location.reload()}>reload</Breadcrumb.Item>
                            <Breadcrumb.Item current>current</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                ))}
            </div>
        );
    }
}
```

</details>

<details>
<summary>styleType - 样式风格</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                {Breadcrumb.StyleType.map((styleType, i) => (
                    <div className="demo-wrap" key={i}>
                        <Breadcrumb styleType={styleType}>
                            <Breadcrumb.BackButton type="left" onClick={() => window.history.back()} />
                            <Breadcrumb.Item noAction>
                                <Icon type="home" />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item onClick={() => window.location.reload()}>
                                <Icon type="uhost" />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href="https://www.google.com" target="_blank">
                                google
                            </Breadcrumb.Item>
                            <Breadcrumb.Item onClick={() => window.location.reload()}>reload</Breadcrumb.Item>
                            <Breadcrumb.Item current>current</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                ))}
            </div>
        );
    }
}
```

</details>

<!-- AUTO_END: demos -->

<!-- MANUAL_START: best-practices -->
## 最佳实践

1. **最后一项使用 `current` 或 `noAction`**：当前页面的面包屑项不应可点击
2. **层级不宜过深**：建议面包屑层级控制在 2-4 级
3. **首项为首页或产品入口**：保持导航一致性

### 常见场景

#### 资源详情页面包屑

```jsx
<Breadcrumb>
  <Breadcrumb.Item onClick={() => navigate('/uhost')}>云主机</Breadcrumb.Item>
  <Breadcrumb.Item current>uhost-xxxx</Breadcrumb.Item>
</Breadcrumb>
```
<!-- MANUAL_END: best-practices -->

<!-- MANUAL_START: faq -->
## 常见问题

### Q: 面包屑项不可点击怎么设置？

A: 使用 `noAction` 属性标记无需跳转的项目，或使用 `current` 标记当前页。
<!-- MANUAL_END: faq -->

<!-- MANUAL_START: critical -->
## 注意事项

_（待补充）_
<!-- MANUAL_END: critical -->
