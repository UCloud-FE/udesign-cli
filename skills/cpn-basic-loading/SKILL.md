---
name: cpn-basic-loading
description: 帮助 AI 正确使用 UDesign Loading 组件（组件）。当需要使用 Loading 时加载此技能。
---


# 使用 Loading 组件

<!-- MANUAL_START: overview -->
## 技能概述

这是 Loading 组件
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { Loading } from '@ucloud-fe/react-components';
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
                    <Loading loading>
                        <div style={{ height: 100, background: 'gray' }} />
                    </Loading>
                </div>
                <div className="demo-wrap">
                    <Loading>
                        <div style={{ height: 100, background: 'gray' }} />
                    </Loading>
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
| loading | `unknown` | `false` | - | 是否加载 |
| indicator | `unknown` | `<LoadingIcon size="14px" type="ring-loading" spin />` | - | 加载指示符 |
| tip | `unknown` | - | - | 文字提示 |
| maskStyle | `unknown` | - | - | 遮罩层样式 |
| maskClassName | `unknown` | - | - | 遮罩层类名 |
| children | `unknown` | - | - |  |
<!-- AUTO_END: props-table -->


<!-- AUTO_START: tokens -->
### Design Tokens

| Token 名称 | 分类 | 默认值 | 暗色值 | 说明 |
|------------|------|--------|--------|------|
| `T_LOADING_COLOR_LAYER_DEFAULT` | color | `rgba(255,255,255,0.7)` | `rgba(20,26,43,0.7)` | - |
<!-- AUTO_END: tokens -->

<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>演示</summary>

```jsx
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { loading, showTip } = this.state;
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
                    <Form.Item label="loading" {...itemLayout}>
                        <Switch checked={loading} onChange={loading => this.setState({ loading })} />
                    </Form.Item>
                    <Form.Item label="showTip" {...itemLayout}>
                        <Switch checked={showTip} onChange={showTip => this.setState({ showTip })} />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Loading loading={loading} tip={showTip && 'Loading...'}>
                        <div style={{ height: 100, background: 'gray' }}>
                            <Button
                                styleType="primary"
                                style={{
                                    display: 'block',
                                    width: 200,
                                    margin: '0 auto',
                                    top: 20,
                                    position: 'relative'
                                }}
                                onClick={() =>
                                    this.setState({
                                        loading: true
                                    })
                                }
                            >
                                Start To Loading
                            </Button>
                        </div>
                    </Loading>
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>loading - 是否加载</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Loading loading>
                        <div style={{ height: 100, background: 'gray' }} />
                    </Loading>
                </div>
                <div className="demo-wrap">
                    <Loading>
                        <div style={{ height: 100, background: 'gray' }} />
                    </Loading>
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>indicator - 自定义指示符</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Loading
                        loading
                        indicator={
                            <svg
                                width="55"
                                height="80"
                                viewBox="0 0 55 80"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#1ABC9C"
                            >
                                <g transform="matrix(1 0 0 -1 0 80)">
                                    <rect width="10" height="20" rx="3">
                                        <animate
                                            attributeName="height"
                                            begin="0s"
                                            dur="4.3s"
                                            values="20;45;57;80;64;32;66;45;64;23;66;13;64;56;34;34;2;23;76;79;20"
                                            calcMode="linear"
                                            repeatCount="indefinite"
                                        />
                                    </rect>
                                    <rect x="15" width="10" height="80" rx="3">
                                        <animate
                                            attributeName="height"
                                            begin="0s"
                                            dur="2s"
                                            values="80;55;33;5;75;23;73;33;12;14;60;80"
                                            calcMode="linear"
                                            repeatCount="indefinite"
                                        />
                                    </rect>
                                    <rect x="30" width="10" height="50" rx="3">
                                        <animate
                                            attributeName="height"
                                            begin="0s"
                                            dur="1.4s"
                                            values="50;34;78;23;56;23;34;76;80;54;21;50"
                                            calcMode="linear"
                                            repeatCount="indefinite"
                                        />
                                    </rect>
                                    <rect x="45" width="10" height="30" rx="3">
                                        <animate
                                            attributeName="height"
                                            begin="0s"
                                            dur="2s"
                                            values="30;45;13;80;56;72;45;76;34;23;67;30"
                                            calcMode="linear"
                                            repeatCount="indefinite"
                                        />
                                    </rect>
                                </g>
                            </svg>
                        }
                    >
                        <div style={{ height: 100, background: 'gray' }} />
                    </Loading>
                </div>
                <div className="demo-wrap">
                    <Loading
                        loading
                        indicator={
                            <svg
                                width="140"
                                height="64"
                                viewBox="0 0 140 64"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#E74C3C"
                            >
                                <path
                                    d="M30.262 57.02L7.195 40.723c-5.84-3.976-7.56-12.06-3.842-18.063 3.715-6 11.467-7.65 17.306-3.68l4.52 3.76 2.6-5.274c3.717-6.002 11.47-7.65 17.305-3.68 5.84 3.97 7.56 12.054 3.842 18.062L34.49 56.118c-.897 1.512-2.793 1.915-4.228.9z"
                                    fillOpacity=".5"
                                >
                                    <animate
                                        attributeName="fill-opacity"
                                        begin="0s"
                                        dur="1.4s"
                                        values="0.5;1;0.5"
                                        calcMode="linear"
                                        repeatCount="indefinite"
                                    />
                                </path>
                                <path
                                    d="M105.512 56.12l-14.44-24.272c-3.716-6.008-1.996-14.093 3.843-18.062 5.835-3.97 13.588-2.322 17.306 3.68l2.6 5.274 4.52-3.76c5.84-3.97 13.592-2.32 17.307 3.68 3.718 6.003 1.998 14.088-3.842 18.064L109.74 57.02c-1.434 1.014-3.33.61-4.228-.9z"
                                    fillOpacity=".5"
                                >
                                    <animate
                                        attributeName="fill-opacity"
                                        begin="0.7s"
                                        dur="1.4s"
                                        values="0.5;1;0.5"
                                        calcMode="linear"
                                        repeatCount="indefinite"
                                    />
                                </path>
                                <path d="M67.408 57.834l-23.01-24.98c-5.864-6.15-5.864-16.108 0-22.248 5.86-6.14 15.37-6.14 21.234 0L70 16.168l4.368-5.562c5.863-6.14 15.375-6.14 21.235 0 5.863 6.14 5.863 16.098 0 22.247l-23.007 24.98c-1.43 1.556-3.757 1.556-5.188 0z" />
                            </svg>
                        }
                    >
                        <div style={{ height: 100, background: 'gray' }} />
                    </Loading>
                </div>
                <div className="demo-wrap">
                    <Loading loading indicator={<Spin style={{ display: 'inline-block' }}>😈</Spin>}>
                        <div style={{ height: 100, background: 'gray' }} />
                    </Loading>
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>包裹 inline-block 元素</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Loading loading style={{ display: 'inline-block' }}>
                        <div style={{ height: 100, display: 'inline-block', background: 'gray' }}>
                            <p style={{ color: 'red' }}>this is content</p>
                        </div>
                    </Loading>
                </div>
                <div className="demo-wrap">
                    <Loading loading style={{ display: 'inline-block' }}>
                        <div style={{ height: 100, width: 100, background: 'gray' }} />
                    </Loading>
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

1. **包裹具体区域而非整个页面**：Loading 应包裹实际需要加载的区域，而不是整个页面
2. **使用 tip 提示操作**：长时间加载时添加文字提示提升用户体验
3. **异步操作必须 finally 关闭 loading**：确保异常情况下也能关闭加载状态
4. **inline-block 元素注意**：Loading 内部使用 block 布局，包裹 inline-block 元素时注意样式影响

### 常见场景

#### 表格数据加载

```jsx
const [loading, setLoading] = useState(true);
const [data, setData] = useState([]);

useEffect(() => {
  fetchTableData().then(res => {
    setData(res);
    setLoading(false);
  });
}, []);

<Loading loading={loading}>
  <Table dataSource={data} columns={columns} />
</Loading>
```

#### 页面区域加载

```jsx
<Loading loading={pageLoading} tip="正在加载页面数据...">
  <Card>
    <div>页面内容</div>
  </Card>
</Loading>
```
<!-- MANUAL_END: best-practices -->

<!-- MANUAL_START: faq -->
## 常见问题

### Q: Loading 默认就显示吗？

A: 不会，`loading` 属性默认为 `false`，需要显式设置为 `true` 才会显示。

### Q: Loading 没有子元素时能用吗？

A: 可以，但通常建议包裹目标区域，这样遮罩会覆盖在内容上方，体验更好。
<!-- MANUAL_END: faq -->

<!-- MANUAL_START: critical -->
## 注意事项

_（待补充）_
<!-- MANUAL_END: critical -->
