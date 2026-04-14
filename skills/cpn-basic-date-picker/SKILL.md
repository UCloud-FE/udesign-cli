---
name: cpn-basic-date-picker
description: 帮助 AI 正确使用 UDesign DatePicker 组件（日期选择 组件）。当需要使用 DatePicker 时加载此技能。
---

# 使用 DatePicker 组件

<!-- MANUAL_START: overview -->
## 技能概述

这是 日期选择 组件
需要自行导入 moment 语言包、设置时区
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { DatePicker } from '@ucloud-fe/react-components';
```

> ⚠️ **全局规范 - 所有组件通用**:
> - 生成纯 JavaScript (JSX) 代码，**不要使用 TypeScript 类型注解**
> - **禁止**使用 `@alicloud/*`、`@aliyun/*`、`antd` 等外部组件库
> - 优先使用 UDesign 组件，不要用 HTML 原生标签替代
<!-- AUTO_END: import -->

<!-- AUTO_START: basic-usage -->
### 基本用法

```jsx
const { Sizes } = DatePicker;
class Demo extends React.Component {
    render() {
        return (
            <div>
                {Sizes.map(size => (
                    <div className="demo-wrap" key={size}>
                        <DatePicker size={size} />
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
| value | `any` | - | - | 值，受控 |
| defaultValue | `any` | - | - | 默认值，非受控 |
| onChange | `(v: Moment | null) => void` | - | - | 修改回调 |
| rules | `any` | - | - | 自定义规则 |
| size | `"sm" | "md" | "lg"` | - | - | 尺寸 |
| format | `string | string[]` | - | - | 输入和展示的字符串格式，为数组时，第一个用作展示，并影响时间面板 |
| nullable | `boolean` | - | - | 是否可为空，为空时不传或传入空值会默认为当前时刻 |
| ~~display~~ ⚠️ | `{ date?: { format?: string; show?: boolean; }; hour?: boolean; minute?: boolean; second?: boolean; }` | - | - |  **(已废弃: 使用 format 替换)** |
| disabled | `boolean` | - | - | 是否禁用 |
| status | `"default" | "error"` | - | - | 状态 |
| placeholder | `string` | - | - | placeholder |
| popoverProps | `any` | - | - | 自定义 popover，参考 popover |
| type | `"date" | "month"` | - | - | 类型 |
| locale | `{ custom: string; inputErrorTip: string; dateErrorTip: string; nullableErrorTip: string; chooseTodayNow: string; chooseThisMonth: string; rangeErrorTip: string; maxRangeErrorTip: string; minRangeErrorTip: string; startGreaterThanEndTip: string; confirm: string; placeholder: string; placeholderRangeStart: string; placeholderRangeEnd: string; chooseTipRangeStart: string; chooseTipRangeEnd: string; to: string; }` | - | - | 自定义语言 |
| ~~zIndex~~ ⚠️ | `number` | - | - |  **(已废弃: 使用 popoverProps 替换)** |
| ~~getCalendarContainer~~ ⚠️ | `(triggerNode: Element) => Element` | - | - |  **(已废弃: 使用 popoverProps 替换)** |
<!-- AUTO_END: props-table -->



<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>演示</summary>

```jsx
const { Sizes } = DatePicker;
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: {
                date: {
                    format: 'YY-MM-DD',
                    display: false
                },
                hour: true,
                minute: true,
                second: true
            },
            size: 'md'
        };
    }
    render() {
        const { display, disabled, size, nullable } = this.state;
        const { date, hour, minute, second } = display;
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
                    <Form.Item label="nullable" {...itemLayout}>
                        <Switch
                            checked={nullable}
                            onChange={nullable =>
                                this.setState({
                                    nullable
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="display.date.format" {...itemLayout}>
                        <Input
                            value={date.format}
                            onChange={e =>
                                this.setState({
                                    display: {
                                        ...display,
                                        date: {
                                            ...date,
                                            format: e.target.value
                                        }
                                    }
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="display.hour" {...itemLayout}>
                        <Switch
                            checked={hour}
                            onChange={hour =>
                                this.setState({
                                    display: {
                                        ...display,
                                        hour
                                    }
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="display.minute" {...itemLayout}>
                        <Switch
                            checked={minute}
                            onChange={minute =>
                                this.setState({
                                    display: {
                                        ...display,
                                        minute
                                    }
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="display.second" {...itemLayout}>
                        <Switch
                            checked={second}
                            onChange={second =>
                                this.setState({
                                    display: {
                                        ...display,
                                        second
                                    }
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="disabled" {...itemLayout}>
                        <Switch checked={disabled} onChange={disabled => this.setState({ disabled })} />
                    </Form.Item>
                    <Form.Item label="size" {...itemLayout}>
                        <Radio.Group
                            value={size}
                            options={Sizes.map(value => ({ value }))}
                            onChange={size => this.setState({ size })}
                        />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <DatePicker
                        display={display}
                        size={size}
                        onChange={v => console.log(v && v.format())}
                        disabled={disabled}
                        nullable={nullable}
                        rules={{
                            range: [
                                moment().set({ hour: 0, minute: 0, second: 0 }).add({ day: -7 }),
                                moment().set({ hour: 0, minute: 0, second: 0 }).add({ day: 7 })
                            ]
                        }}
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
const { Sizes } = DatePicker;
class Demo extends React.Component {
    render() {
        return (
            <div>
                {Sizes.map(size => (
                    <div className="demo-wrap" key={size}>
                        <DatePicker size={size} />
                    </div>
                ))}
            </div>
        );
    }
}
```

</details>

<details>
<summary>rules - 自定义规则</summary>

```jsx
const Demo = () => (
    <div>
        <div className="demo-wrap">
            <DatePicker
                onChange={v => console.log(v.format())}
                rules={{
                    range: [
                        moment().set({ hour: 0, minute: 0, second: 0 }).add({ day: -7 }),
                        moment().set({ hour: 0, minute: 0, second: 0 }).add({ day: 7 })
                    ]
                }}
            />
        </div>
    </div>
);
```

</details>

<details>
<summary>nullable - 是否可为空/输入</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <DatePicker nullable />
                </div>
                <div className="demo-wrap">
                    <DatePicker />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>display - 自定义展示形式</summary>

```jsx
const Display = [{ second: false }, { minute: false }, { hour: false }, { date: { format: 'YY:MM:DD' } }];
class Demo extends React.Component {
    render() {
        return (
            <div>
                {Display.map((display, i) => (
                    <div className="demo-wrap" key={i}>
                        <DatePicker display={display} />
                    </div>
                ))}
            </div>
        );
    }
}
```

</details>

<details>
<summary>format - 自定义格式化/输入</summary>

```jsx
const formats = [
    'YYYYMMDD HH:mm:ss',
    'YYYY-M-D H:m:s',
    'YY-M-D H:m:s',
    'YYYY-MM-DD',
    ['YYYY-MM-DD HH:mm:ss', 'YYYY-M-D H:m:s', 'YY-M-D H:m:s']
];
class Demo extends React.Component {
    render() {
        return (
            <div>
                {formats.map((format, i) => {
                    return (
                        <div className="demo-wrap" key={i}>
                            <DatePicker format={format} />
                        </div>
                    );
                })}
            </div>
        );
    }
}
```

</details>

<details>
<summary>status - 状态</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <DatePicker />
                </div>
                <div className="demo-wrap">
                    <DatePicker status="error" />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>disabled - 禁用</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <DatePicker disabled />
                </div>
                <div className="demo-wrap">
                    <DatePicker />
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
                    <DatePicker value={Date.now()} />
                </div>
                <div className="demo-wrap">
                    <DatePicker />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>popoverProps - 弹出容器定义</summary>

```jsx
const Demo = () => (
    <div>
        <div className="demo-wrap">
            <Button
                onClick={() => {
                    Modal.confirm(
                        {
                            title: 'datePicker'
                        },
                        <div style={{ padding: 24 }}>
                            <DatePicker onChange={v => console.log(v.format())} />
                        </div>
                    );
                }}
            >
                default
            </Button>
            <Button
                onClick={() => {
                    Modal.confirm(
                        {
                            title: 'datePicker'
                        },
                        <div style={{ padding: 24, position: 'relative', overflow: 'auto' }}>
                            <DatePicker onChange={v => console.log(v.format())} />
                        </div>
                    );
                }}
            >
                wrong display with positioned wrap
            </Button>
            <Button
                onClick={() => {
                    Modal.confirm(
                        {
                            title: 'datePicker'
                        },
                        <div style={{ padding: 24, position: 'relative', overflow: 'auto' }}>
                            <DatePicker
                                onChange={v => console.log(v.format())}
                                popoverProps={{ getPopupContainer: () => document.body }}
                                zIndex={1020}
                            />
                        </div>
                    );
                }}
            >
                place calendar into body
            </Button>
        </div>
    </div>
);
```

</details>

<details>
<summary>月份演示</summary>

```jsx
const { Sizes } = DatePicker;
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: {
                date: {
                    format: 'YY-MM'
                }
            },
            size: 'md'
        };
    }
    render() {
        const { display, size, disabled } = this.state;
        const { date } = display;
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
                    <Form.Item label="display.date.format" {...itemLayout}>
                        <Input
                            value={date.format}
                            onChange={e =>
                                this.setState({
                                    display: {
                                        ...display,
                                        date: {
                                            ...date,
                                            format: e.target.value
                                        }
                                    }
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="disabled" {...itemLayout}>
                        <Switch checked={disabled} onChange={disabled => this.setState({ disabled })} />
                    </Form.Item>
                    <Form.Item label="size" {...itemLayout}>
                        <Radio.Group
                            value={size}
                            options={Sizes.map(value => ({ value }))}
                            onChange={size => this.setState({ size })}
                        />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <DatePicker
                        type="month"
                        display={display}
                        size={size}
                        onChange={v => console.log(v.format())}
                        disabled={disabled}
                        rules={{
                            range: [
                                moment().set({ hour: 0, minute: 0, second: 0 }).add({ month: -7 }),
                                moment().set({ hour: 0, minute: 0, second: 0 }).add({ month: 7 })
                            ]
                        }}
                    />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>size - 月份尺寸</summary>

```jsx
const { Sizes } = DatePicker;
class Demo extends React.Component {
    render() {
        return (
            <div>
                {Sizes.map(size => (
                    <div className="demo-wrap" key={size}>
                        <DatePicker type="month" size={size} />
                    </div>
                ))}
            </div>
        );
    }
}
```

</details>

<details>
<summary>rules - 月份自定义规则</summary>

```jsx
const Demo = () => (
    <div>
        <div className="demo-wrap">
            <DatePicker
                type="month"
                onChange={console.log}
                rules={{
                    range: [
                        moment().set({ hour: 0, minute: 0, second: 0 }).add({ month: -4 }),
                        moment().set({ hour: 0, minute: 0, second: 0 }).add({ month: 4 })
                    ]
                }}
            />
        </div>
    </div>
);
```

</details>

<details>
<summary>nullable - 月份是否可为空/输入</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <DatePicker type="month" nullable />
                </div>
                <div className="demo-wrap">
                    <DatePicker type="month" />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>display - 月份自定义展示形式</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <DatePicker
                        type="month"
                        display={{
                            date: {
                                format: 'YYYY---MM'
                            }
                        }}
                    />
                </div>
                <div className="demo-wrap">
                    <DatePicker type="month" />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>format - 月份自定义格式化/输入</summary>

```jsx
const formats = ['YYYYMM', 'YYYY-M', 'YY-M', ['YYYY-MM', 'YYYY-M', 'YY-M']];
class Demo extends React.Component {
    render() {
        return (
            <div>
                {formats.map((format, i) => {
                    return (
                        <div className="demo-wrap" key={i}>
                            <DatePicker type="month" format={format} />
                        </div>
                    );
                })}
            </div>
        );
    }
}
```

</details>

<details>
<summary>status - 月份状态</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <DatePicker type="month" />
                </div>
                <div className="demo-wrap">
                    <DatePicker type="month" status="error" />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>disabled - 月份禁用</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <DatePicker type="month" disabled />
                </div>
                <div className="demo-wrap">
                    <DatePicker type="month" />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>uncontrolled - 月份非受控</summary>

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <DatePicker type="month" value={Date.now()} />
                </div>
                <div className="demo-wrap">
                    <DatePicker type="month" />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>popoverProps - 月份弹出层容器</summary>

```jsx
const Demo = () => (
    <div>
        <div className="demo-wrap">
            <Button
                onClick={() => {
                    Modal.confirm(
                        {
                            title: 'datePicker'
                        },
                        <div style={{ padding: 24 }}>
                            <DatePicker type="month" onChange={v => console.log(v.format())} />
                        </div>
                    );
                }}
            >
                default
            </Button>
            <Button
                onClick={() => {
                    Modal.confirm(
                        {
                            title: 'datePicker'
                        },
                        <div style={{ padding: 24, position: 'relative', overflow: 'auto' }}>
                            <DatePicker type="month" onChange={v => console.log(v.format())} />
                        </div>
                    );
                }}
            >
                wrong display with positioned wrap
            </Button>
            <Button
                onClick={() => {
                    Modal.confirm(
                        {
                            title: 'datePicker'
                        },
                        <div style={{ padding: 24, position: 'relative', overflow: 'auto' }}>
                            <DatePicker
                                type="month"
                                onChange={v => console.log(v.format())}
                                popoverProps={{ getPopupContainer: () => document.body }}
                                zIndex={1020}
                            />
                        </div>
                    );
                }}
            >
                place calendar into body
            </Button>
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
