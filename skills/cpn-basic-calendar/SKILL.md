---
name: cpn-basic-calendar
description: 帮助 AI 正确使用 UDesign Calendar 组件（日历 组件）。当需要使用 Calendar 时加载此技能。
---

# 使用 Calendar 组件

<!-- MANUAL_START: overview -->
## 技能概述

这是 日历 组件
需要自行导入 moment 语言包、设置时区
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { Calendar } from '@ucloud-fe/react-components';
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
        <Calendar
            onSelect={v => console.log('select', v)}
            onChange={v => console.log('change', v)}
            rules={{ range: [Date.now() - 7 * 24 * 60 * 60 * 1000, Date.now() + 7 * 24 * 60 * 60 * 1000] }}
        />
    </div>
);
```
<!-- AUTO_END: basic-usage -->

<!-- AUTO_START: props-table -->
### API 参数

| 属性 | 类型 | 默认值 | 必填 | 说明 |
|------|------|--------|------|------|
| value | `any` | - | - | 当前值，受控 |
| rangeValue | `[any, any]` | - | - | 范围值 |
| defaultValue | `any` | - | - | 默认值，非受控 |
| ~~onSelect~~ ⚠️ | `(t: Moment) => void` | - | - |  **(已废弃: 使用 onChange 来替换)** |
| onChange | `(t: Moment) => void` | - | - | 选中变化回调 |
| current | `any` | - | - |  |
| defaultCurrent | `any` | - | - |  |
| onCurrentChange | `(v: TDate) => void` | - | - |  |
| rules | `Rules` | - | - | 自定义规则 |
| customStyle | `{ boxShadow?: boolean; }` | - | - | 自定义样式 |
| type | `"date" | "month"` | - | - | 类型 |
<!-- AUTO_END: props-table -->



<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>普通使用</summary>

```jsx
const Demo = () => (
    <div>
        <Calendar
            onSelect={v => console.log('select', v)}
            onChange={v => console.log('change', v)}
            rules={{ range: [Date.now() - 7 * 24 * 60 * 60 * 1000, Date.now() + 7 * 24 * 60 * 60 * 1000] }}
        />
    </div>
);
```

</details>

<details>
<summary>范围</summary>

```jsx
const Demo = () => (
    <div>
        <Calendar
            value={null}
            onChange={v => console.log('change', v)}
            rangeValue={[
                new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            ]}
        />
    </div>
);
```

</details>

<details>
<summary>value / defaultValue - 选中的时间 （受控 / 非受控）</summary>

```jsx
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: moment()
        };
    }
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Calendar value={this.state.value} onChange={v => this.setState({ value: v })} />
                </div>
                <div className="demo-wrap">
                    <Calendar defaultValue={moment()} />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>rules - 自定义规则</summary>

```jsx
class Demo extends React.Component {
    custom(current, value) {
        const range = [moment(current).subtract(7, 'd'), moment(current).add(7, 'd')];
        return !moment(value).isBetween(...range);
    }

    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Calendar
                        rules={{ range: [Date.now() - 7 * 24 * 60 * 60 * 1000, Date.now() + 7 * 24 * 60 * 60 * 1000] }}
                    />
                </div>
                <div className="demo-wrap">
                    <Calendar rules={{ range: [moment().subtract(7, 'd'), moment().add(7, 'd')] }} />
                </div>
                <div className="demo-wrap">
                    <Calendar rules={{ custom: this.custom }} />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>month - 月历</summary>

```jsx
const Demo = () => (
    <div>
        <Calendar
            type="month"
            onSelect={v => console.log('select', v)}
            onChange={v => console.log('change', v)}
            rules={{ range: [Date.now() - 3 * 30 * 24 * 60 * 60 * 1000, Date.now() + 3 * 30 * 24 * 60 * 60 * 1000] }}
        />
    </div>
);
```

</details>

<details>
<summary>组合</summary>

```jsx
const Demo = () => (
    <div>
        <Calendar.TwoSide
            onChange={v => console.log('change', v)}
            rules={{ range: [Date.now() - 3 * 30 * 24 * 60 * 60 * 1000, Date.now() + 3 * 30 * 24 * 60 * 60 * 1000] }}
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
