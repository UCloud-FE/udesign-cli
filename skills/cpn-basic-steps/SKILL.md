---
name: cpn-basic-steps
description: 帮助 AI 正确使用 UDesign Steps 组件（步骤条组件）。当需要使用 Steps 时加载此技能。
---


# 使用 Steps 组件

<!-- MANUAL_START: overview -->
## 技能概述

这是步骤条组件
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { Steps } from '@ucloud-fe/react-components';
```

> ⚠️ **全局规范 - 所有组件通用**:
> - 生成纯 JavaScript (JSX) 代码，**不要使用 TypeScript 类型注解**
> - **禁止**使用 `@alicloud/*`、`@aliyun/*`、`antd` 等外部组件库
> - 优先使用 UDesign 组件，不要用 HTML 原生标签替代
<!-- AUTO_END: import -->

<!-- AUTO_START: basic-usage -->
### 基本用法

```jsx
const steps = new Array(5).fill(null).map(() => ({ title: 'content', remark: 'This is remark' }));
class Demo extends React.Component {
    render() {
        return (
            <div>
                {steps.map((step, i) => (
                    <div className="demo-wrap" key={i}>
                        <Steps current={i} steps={steps} />
                    </div>
                ))}
                <div className="demo-wrap">
                    <Steps steps={steps} />
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
| steps | `unknown` | - | ✅ | 步骤列表 |
| current | `unknown` | - | - | 当前步骤的 key，不传或传 null 时为全部完成 |
| status | `unknown` | `'current'` | - | 当前步骤的状态 |
| onChange | `unknown` | - | - | 步骤状态改变时的回调函数 |
| direction | `unknown` | `'horizontal'` | - | 指定步骤条方向 , 默认是horizontal |
| nowrap | `unknown` | `false` | - | 横向场景，不换行, 默认是false |
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
const Status = Steps.Status;
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            status: Steps.defaultProps.status,
            hasTitle: true,
            hasRemark: true,
            direction: 'horizontal',
            changeType: 'close',
            nowrap: false
        };
    }
    render() {
        const { current, status, hasTitle, hasRemark, direction, changeType, nowrap } = this.state;

        const steps = new Array(3).fill(null).map((v, i) => {
            const step = {};
            if (hasTitle) step.title = `第 ${i + 1} 步`;
            if (hasRemark) step.remark = '这是一条备注';

            if (i === 3) step.disabled = true;
            return step;
        });
        return (
            <div>
                <Form className="demo-form">
                    <Form.Item label="hasTitle" {...itemLayout}>
                        <Switch checked={hasTitle} onChange={hasTitle => this.setState({ hasTitle })} />
                    </Form.Item>
                    <Form.Item label="hasRemark" {...itemLayout}>
                        <Switch checked={hasRemark} onChange={hasRemark => this.setState({ hasRemark })} />
                    </Form.Item>
                    <Form.Item label="status" {...itemLayout}>
                        <Radio.Group
                            options={Status.map(status => ({ value: status }))}
                            value={status}
                            onChange={status => this.setState({ status })}
                        />
                    </Form.Item>
                    <Form.Item label="current" {...itemLayout}>
                        <Radio.Group
                            options={steps.map((step, i) => ({ value: i }))}
                            value={current}
                            onChange={current => this.setState({ current })}
                        />
                    </Form.Item>
                    <Form.Item label="direction" {...itemLayout}>
                        <Radio.Group
                            options={['horizontal', 'vertical'].map((direction, i) => ({ value: direction }))}
                            value={direction}
                            onChange={direction => this.setState({ direction })}
                        />
                    </Form.Item>
                    <Form.Item label="onChange" {...itemLayout}>
                        <Radio.Group
                            options={['open', 'close'].map((status, i) => ({ value: status }))}
                            value={changeType}
                            onChange={changeType => this.setState({ changeType })}
                        />
                    </Form.Item>
                    <Form.Item label="nowrap" {...itemLayout}>
                        <Switch checked={nowrap} onChange={nowrap => this.setState({ nowrap })} />
                    </Form.Item>
                </Form>

                <div className="demo-wrap">
                    <Steps
                        steps={steps}
                        current={current}
                        status={status}
                        direction={direction}
                        nowrap={nowrap}
                        onChange={
                            changeType === 'close'
                                ? null
                                : e => {
                                      this.setState({ current: e });
                                  }
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
<summary>steps - 步骤</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Steps
                        current={'fourth'}
                        steps={new Array(5)
                            .fill(null)
                            .map((v, i) => ({ key: ['first', 'second', 'third', 'fourth', 'fifth'][i] }))}
                    />
                </div>
                <div className="demo-wrap">
                    <Steps
                        current={2}
                        steps={new Array(5).fill(null).map((v, i) => ({ step: ['一', '二', '三', '四', '五'][i] }))}
                    />
                </div>
                <div className="demo-wrap">
                    <Steps current={2} steps={new Array(5).fill(null).map((v, i) => ({ title: 'content' }))} />
                </div>
                <div className="demo-wrap">
                    <Steps
                        current={2}
                        steps={new Array(5).fill(null).map((v, i) => ({ title: 'content', remark: 'This is remark' }))}
                    />
                </div>
                <div className="demo-wrap">
                    <Steps
                        current={2}
                        nowrap={true}
                        steps={new Array(5).fill(null).map((v, i) => ({ title: 'content', remark: 'This is remark' }))}
                    />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>status - 状态</summary>

```jsx
const { Status } = Steps;
class Demo extends React.Component {
    render() {
        return (
            <div>
                {Status.map(status => (
                    <div className="demo-wrap" key={status}>
                        <Steps
                            current={2}
                            status={status}
                            steps={new Array(5).fill(null).map(() => ({ title: 'content', remark: 'This is remark' }))}
                        />
                    </div>
                ))}
            </div>
        );
    }
}
```

</details>

<details>
<summary>current - 当前 step</summary>

```jsx
const steps = new Array(5).fill(null).map(() => ({ title: 'content', remark: 'This is remark' }));
class Demo extends React.Component {
    render() {
        return (
            <div>
                {steps.map((step, i) => (
                    <div className="demo-wrap" key={i}>
                        <Steps current={i} steps={steps} />
                    </div>
                ))}
                <div className="demo-wrap">
                    <Steps steps={steps} />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>vertical - 纵向 step</summary>

```jsx
const steps = new Array(5).fill(null).map(() => ({ title: 'content', remark: 'This is remark' }));
class Demo extends React.Component {
    render() {
        return (
            <div>
                {steps.map((step, i) => (
                    <div className="demo-wrap" key={i}>
                        <Steps direction="vertical" current={i} steps={steps} />
                    </div>
                ))}
                <div className="demo-wrap">
                    <Steps direction="vertical" steps={steps} />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>onChange - 可点击 step</summary>

```jsx
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 2,
            current1: 2,
            current2: 2,
            current3: 2,
            current4: 1,
            current5: 3
        };
    }
    render() {
        const { current, current1, current2, current3, current4, current5 } = this.state;

        return (
            <div>
                <div className="demo-wrap">
                    <Steps
                        current={current}
                        onChange={current => {
                            this.setState({ current: current });
                        }}
                        steps={new Array(5).fill(null).map((v, i) => ({ title: 'content', remark: 'This is remark' }))}
                    />
                </div>
                <div className="demo-wrap">
                    <Steps
                        direction="vertical"
                        current={current1}
                        onChange={current => {
                            this.setState({ current1: current });
                        }}
                        steps={new Array(5).fill(null).map((v, i) => ({ title: 'content', remark: 'This is remark' }))}
                    />
                </div>
                <div className="demo-wrap">
                    <Steps
                        direction="vertical"
                        current={current2}
                        onChange={current => {
                            this.setState({ current2: current });
                        }}
                        steps={new Array(5).fill(null).map((v, i) => ({
                            title: 'content is disabled',
                            status: i > 2 ? 'disabled' : '',
                            remark: 'This is remark'
                        }))}
                    />
                </div>
                <div className="demo-wrap">
                    <Steps
                        direction="vertical"
                        current={current3}
                        onChange={(current3, status) => {
                            if (status == 'error') {
                                return;
                            }
                            this.setState({ current3: current3 });
                        }}
                        steps={new Array(5).fill(null).map((v, i) => ({
                            title: 'content is error',
                            status: i > 2 ? 'error' : '',
                            remark: 'This is remark'
                        }))}
                    />
                </div>
                <div className="demo-wrap">
                    <Steps
                        direction="vertical"
                        current={current4}
                        onChange={current4 => {
                            this.setState({ current4: current4 });
                        }}
                        steps={new Array(5).fill(null).map((v, i) => ({
                            title: 'content is error',
                            status: i > 2 ? 'success' : '',
                            remark: 'This is remark'
                        }))}
                    />
                </div>
                <div className="demo-wrap">
                    <Steps
                        direction="vertical"
                        current={current5}
                        onChange={current5 => {
                            this.setState({ current5: current5 });
                        }}
                        steps={new Array(5).fill(null).map((v, i) => ({
                            title: 'content is error',
                            status: 'normal',
                            remark: 'This is remark'
                        }))}
                    />
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
