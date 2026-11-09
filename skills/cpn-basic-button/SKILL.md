---
name: cpn-basic-button
description: 帮助 AI 正确使用 UDesign Button 组件（按钮组件）。当需要使用 Button 时加载此技能。
---


# 使用 Button 组件

<!-- MANUAL_START: overview -->
## 技能概述

这是 Button，按钮组件
主要内置了一些样式
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { Button } from '@ucloud-fe/react-components';
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
        <Button onClick={() => console.log('clicked')}>Button</Button>
        <Button disabled onClick={() => console.log('clicked')}>
            Button
        </Button>
    </div>
);
```
<!-- AUTO_END: basic-usage -->

<!-- AUTO_START: props-table -->
### API 参数

| 属性 | 类型 | 默认值 | 必填 | 说明 |
|------|------|--------|------|------|
| styleType | `"primary" | "border" | "border-gray"` | `'border'` | - | 按钮类型 |
| size | `"sm" | "md" | "lg"` | `'md'` | - | 按钮尺寸 |
| shape | `"circle" | "square"` | - | - | 形状 |
| loading | `boolean` | - | - | 是否加载中 |
| fakeDisabled | `boolean` | - | - | 伪装 disabled，配合 disabled 一起使用。 添加后 disabled 时除了 onClick 事件，其它的事件会正常触发，且生成的 button 上不会出现 disabled 属性。 button 的 disabled 会将所有事件全部屏蔽，有时会导致一些问题，比如 tooltip 里嵌入 disabled button 时，无法获取事件导致无法正常显示。 |
| icon | `any` | - | - | 图标，传入 string 时为图标类型，也可直接传入图标组件，需要图标位置等更多自定义请直接放在 children 中 |
| type | `string` | `'button'` | - | 设置原生的 button 上 type 属性 |
| block | `boolean` | - | - | 展示设置为块元素 |
<!-- AUTO_END: props-table -->


<!-- AUTO_START: tokens -->
### Design Tokens

| Token 名称 | 分类 | 默认值 | 暗色值 | 说明 |
|------------|------|--------|--------|------|
| `T_BUTTON_COMMON_COLOR_MASK` | color | `#ffffff` | `#141A2B` | - |
| `T_BUTTON_OTHER_COLOR_BG_DEFAULT` | color | `#fafafc` | `#0B1224` | - |
| `T_BUTTON_OTHER_COLOR_BG_HOVER` | color | `#ffffff` | `#141A2B` | - |
| `T_BUTTON_OTHER_COLOR_BORDER_DEFAULT` | color | `#d2d6ea` | `#2B3555` | - |
| `T_BUTTON_OTHER_COLOR_BORDER_HOVER` | color | `#3357df` | `#738BFF` | - |
| `T_BUTTON_OTHER_COLOR_SHADOW_DEFAULT` | color | `0 0 0 0 rgba(0,0,0,0.12),inset 0 0 0 0 #e3e9ff` | `0 0 0 0 rgba(0,0,0,0.12),inset 0 0 0 0 #2b3555` | - |
| `T_BUTTON_OTHER_COLOR_SHADOW_HOVER` | color | `0 0 0 0 rgba(0,0,0,0.12),inset 0 0 0 0 #e3e9ff` | `0 0 0 0 rgba(0,0,0,0.12),inset 0 0 0 0 #2b3555` | - |
| `T_BUTTON_PRIMARY_COLOR_BG_DEFAULT` | color | `linear-gradient(135deg, #6488fc 0%,#3860f4 100%)` | `linear-gradient(135deg, #6488fc 0%,#3860f4 100%)` | - |
| `T_BUTTON_PRIMARY_COLOR_BG_HOVER` | color | `linear-gradient(135deg, #5c76e8 0%,#3357df 100%)` | `linear-gradient(135deg, #5c76e8 0%,#3357df 100%)` | - |
| `T_BUTTON_PRIMARY_COLOR_SHADOW_DEFAULT` | color | `0 2px 4px -1px #5c76e8, inset 0 -3px 0 0 rgba(0,0,0,0.12), inset 0 1px 0 0 rgba(0,0,0,0.12)` | `0 2px 4px -1px #3458DE, inset 0 -3px 0 0 rgba(0,0,0,0.12), inset 0 1px 0 0 rgba(0,0,0,0.12)` | - |
| `T_BUTTON_PRIMARY_COLOR_SHADOW_HOVER` | color | `0 5px 8px -4px #5c76e8, inset 0 -3px 0 0 rgba(0,0,0,0.12), inset 0 1px 0 0 rgba(0,0,0,0.12)` | `0 5px 8px -4px #3458DE, inset 0 -3px 0 0 rgba(0,0,0,0.12), inset 0 1px 0 0 rgba(0,0,0,0.12)` | - |
| `T_BUTTON_PRIMARY_COLOR_TEXT_DEFAULT` | color | `#ffffff` | `#ffffff` | - |
| `T_BUTTON_SECONDARY_COLOR_BG_DEFAULT` | color | `#ffffff` | `#242B40` | - |
| `T_BUTTON_SECONDARY_COLOR_BG_HOVER` | color | `#ffffff` | `#141A2B` | - |
| `T_BUTTON_SECONDARY_COLOR_BORDER_DEFAULT` | color | `#c3cad9` | `#3F4A70` | - |
| `T_BUTTON_SECONDARY_COLOR_BORDER_HOVER` | color | `#d2d6ea` | `#2B3555` | - |
| `T_BUTTON_SECONDARY_COLOR_SHADOW_DEFAULT` | color | `0 2px 3px 0 rgba(0,0,0,0.12),inset 0 -2px 0 0 #e3e9ff` | `0 2px 3px 0 rgba(0,0,0,0.12),inset 0 -2px 0 0 #2b3555` | - |
| `T_BUTTON_SECONDARY_COLOR_SHADOW_HOVER` | color | `0 0 1px 0 rgba(0,0,0,0.12),0 8px 12px -4px rgba(0,0,0,0.12),0 2px 1px -1px rgba(0,0,0,0.05), inset 0 -2px 0 0 #e3e9ff` | `0 0 1px 0 rgba(0,0,0,0.12),0 8px 12px -4px rgba(0,0,0,0.12),0 2px 1px -1px rgba(0,0,0,0.05), inset 0 -2px 0 0 #2b3555` | - |
<!-- AUTO_END: tokens -->

<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>演示</summary>

```jsx
const { StyleTypes, Sizes, Shapes, defaultProps } = Button;
const IconTypes = ['undefined', 'circle-fill', 'circle', 'loading'];
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            styleType: defaultProps.styleType,
            size: defaultProps.size,
            shape: 'undefined',
            icon: IconTypes[0],
            disabled: false,
            fakeDisabled: false
        };
    }
    render() {
        const { styleType, size, shape, icon, loading, disabled, fakeDisabled, block } = this.state;
        const itemLayout = {
            labelCol: {
                span: 3
            },
            controllerCol: {
                span: 9
            }
        };
        const props = {
            styleType,
            shape,
            size,
            icon,
            loading,
            disabled,
            fakeDisabled,
            block
        };
        if (shape === 'undefined') {
            delete props.shape;
        }
        if (icon === 'undefined') {
            delete props.icon;
        }
        return (
            <div>
                <Form className="demo-form">
                    <Form.Item label="styleType" {...itemLayout}>
                        <Radio.Group
                            options={StyleTypes.map(styleType => ({ value: styleType }))}
                            value={styleType}
                            onChange={styleType => this.setState({ styleType })}
                        />
                    </Form.Item>
                    <Form.Item label="size" {...itemLayout}>
                        <Radio.Group
                            options={Sizes.map(size => ({ value: size }))}
                            value={size}
                            onChange={size => this.setState({ size })}
                        />
                    </Form.Item>
                    <Form.Item label="shape" {...itemLayout}>
                        <Radio.Group
                            options={['undefined', ...Shapes].map(shape => ({ value: shape }))}
                            value={shape}
                            onChange={shape => this.setState({ shape })}
                        />
                    </Form.Item>
                    <Form.Item label="icon" {...itemLayout}>
                        <Radio.Group
                            options={IconTypes.map(icon => ({ value: icon }))}
                            value={icon}
                            onChange={icon => this.setState({ icon })}
                        />
                    </Form.Item>
                    <Form.Item label="loading" {...itemLayout}>
                        <Switch checked={loading} onChange={loading => this.setState({ loading })} />
                    </Form.Item>
                    <Form.Item label="disabled" {...itemLayout}>
                        <Switch checked={disabled} onChange={disabled => this.setState({ disabled })} />
                    </Form.Item>
                    <Form.Item label="fakeDisabled" {...itemLayout}>
                        <Switch checked={fakeDisabled} onChange={fakeDisabled => this.setState({ fakeDisabled })} />
                    </Form.Item>
                    <Form.Item label="block" {...itemLayout}>
                        <Switch checked={block} onChange={block => this.setState({ block })} />
                    </Form.Item>
                </Form>
                <Button {...props} onClick={console.log}>
                    Button
                </Button>
            </div>
        );
    }
}
```

</details>

<details>
<summary>styleType - 样式风格</summary>

```jsx
const { StyleTypes } = Button;

const Demo = () => {
    return (
        <div>
            {StyleTypes.map(styleType => (
                <Button styleType={styleType} key={'key' + styleType} onClick={() => console.log('clicked')}>
                    Button
                </Button>
            ))}
        </div>
    );
};
```

</details>

<details>
<summary>shape - 形状</summary>

```jsx
const Demo = () => {
    return (
        <div>
            <Button onClick={() => console.log('clicked')}>Button</Button>
            <Button shape="circle" styleType="primary" icon="upload" onClick={() => console.log('clicked')} />
            <Button shape="circle" styleType="border" icon="plus" onClick={() => console.log('clicked')} />
            <Button shape="square" styleType="primary" icon="upload" onClick={() => console.log('clicked')} />
            <Button shape="square" styleType="border" icon="plus" onClick={() => console.log('clicked')} />
        </div>
    );
};
```

</details>

<details>
<summary>loading - 加载</summary>

```jsx
const Demo = () => {
    return (
        <div>
            <Button loading onClick={() => console.log('clicked')}>
                Button
            </Button>
            <Button loading onClick={() => console.log('clicked')} />
            <Button loading icon="link" styleType="primary" onClick={() => console.log('clicked')} />
        </div>
    );
};
```

</details>

<details>
<summary>size - 尺寸</summary>

```jsx
const { Sizes } = Button;

const Demo = () => {
    return (
        <div>
            {Sizes.map(size => (
                <Button size={size} key={size} onClick={() => console.log('clicked')}>
                    Button
                </Button>
            ))}
        </div>
    );
};
```

</details>

<details>
<summary>disabled - 禁用</summary>

```jsx
const Demo = () => (
    <div>
        <Button onClick={() => console.log('clicked')}>Button</Button>
        <Button disabled onClick={() => console.log('clicked')}>
            Button
        </Button>
    </div>
);
```

</details>

<details>
<summary>block - 禁用</summary>

```jsx
const Demo = () => (
    <div>
        <Button onClick={() => console.log('clicked')}>Button</Button>
        <Button block onClick={() => console.log('clicked')}>
            Button
        </Button>
    </div>
);
```

</details>

<details>
<summary>fakeDisabled - 特殊禁用（仅禁用 onClick）</summary>

```jsx
// eslint-disable-next-line react/prop-types
const Tip = ({ children }) => {
    return <Tooltip popup="popup content">{children}</Tooltip>;
};
const Demo = () => (
    <div>
        <Tip>
            <Button onClick={() => console.log('clicked')}>Button</Button>
        </Tip>
        <Tip>
            <Button disabled onClick={() => console.log('clicked')}>
                Button
            </Button>
        </Tip>
        <Tip>
            <Button disabled fakeDisabled onClick={() => console.log('clicked')}>
                Button
            </Button>
        </Tip>
    </div>
);
```

</details>

<details>
<summary>icon - 图标</summary>

```jsx
const icons = ['loading', 'link', 'check'];

const Demo = () => {
    return (
        <div>
            {icons.map(icon => (
                <Button icon={icon} key={icon} onClick={() => console.log('clicked')}>
                    Button
                </Button>
            ))}
            {icons.map(icon => (
                <Button icon={<Icon type={icon} spin />} key={icon} onClick={() => console.log('clicked')}>
                    Button
                </Button>
            ))}
            {icons.map(icon => (
                <Button key={icon} onClick={() => console.log('clicked')}>
                    Button <Icon type={icon} spin /> Button
                </Button>
            ))}
        </div>
    );
};
```

</details>

<!-- AUTO_END: demos -->

<!-- MANUAL_START: best-practices -->
## 最佳实践

1. **主操作使用 `primary`**：每个视觉区域内应只有一个主按钮，避免多个 `primary` 按钮并列
2. **异步操作务必加 `loading`**：提交表单、发送请求时使用 `loading` 防止重复点击，并在操作完成后关闭
3. **Tooltip 包裹禁用按钮时使用 `fakeDisabled`**：避免原生 `disabled` 屏蔽所有事件导致 Tooltip 失效
4. **表单提交按钮设置 `type="submit"`**：如果不想触发表单提交，保持默认的 `type="button"`
5. **图标按钮建议搭配 `shape`**：纯图标按钮使用 `circle` 或 `square` 形状，视觉效果更好
6. **按钮排列顺序**：主操作在前（左），辅助操作在后（右）

### 常见场景

#### 表单操作按钮

```jsx
<div>
  <Button styleType="primary" onClick={handleSubmit}>提交</Button>
  <Button styleType="border" onClick={handleCancel}>取消</Button>
</div>
```

#### 加载态提交按钮

```jsx
const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
  setLoading(true);
  try {
    await submitForm();
  } finally {
    setLoading(false);
  }
};

<Button styleType="primary" loading={loading} onClick={handleSubmit}>
  提交
</Button>
```

#### 图标操作按钮

```jsx
<Button shape="circle" styleType="primary" icon="plus" onClick={handleAdd} />
<Button shape="circle" styleType="border" icon="edit" onClick={handleEdit} />
```
<!-- MANUAL_END: best-practices -->

<!-- MANUAL_START: faq -->
## 常见问题

### Q: 禁用按钮外包裹 Tooltip 不显示？

A: 原生 `disabled` 会阻止所有事件，导致 Tooltip 无法获取鼠标事件。解决方案是同时添加 `disabled` 和 `fakeDisabled`：

```jsx
<Tooltip popup="该操作暂不可用">
  <Button disabled fakeDisabled>操作</Button>
</Tooltip>
```

### Q: loading 状态下按钮的图标会怎样？

A: `loading` 为 `true` 时，原始 `icon` 会被替换为旋转的加载图标。

### Q: 如何创建只有图标没有文字的按钮？

A: 不传 `children`，只传 `icon` 和 `shape`：

```jsx
<Button shape="circle" icon="plus" styleType="primary" />
```
<!-- MANUAL_END: faq -->

<!-- MANUAL_START: critical -->
## 注意事项

_（待补充）_
<!-- MANUAL_END: critical -->
