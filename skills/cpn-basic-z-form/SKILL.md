---
name: cpn-basic-z-form
description: 帮助 AI 正确使用 UDesign ZForm 组件（组件 为 rc）。当需要使用 ZForm 时加载此技能。
---

# 使用 ZForm 组件

<!-- MANUAL_START: overview -->
## 技能概述

ZForm 组件 为 rc-form 与 Form 组件的简单封装，包含 ZForm 组件、formDecorator、controllerDecorator 和 formShape
-   ZForm 接收 rc-form 的 form 然后转换为 context 传到下面的 controller 中，减少重复的代码编写
-   formDecorator 等同 rc-form 的 createForm，用于创建表单包裹
-   controllerDecorator 约等于 rc-form 的 getFieldDecorator 的简写
ZForm 需要传入 rc-form 的 form 实例，ZForm 的包裹组件必须使用 formDecorator 来包裹，如下
``js static
class DemoForm extends React.Component {
render() {
const { form } = this.props;
return <ZForm form={form} />;
}
}
DemoForm.propTypes = {
form: formShape
};
const Demo = formDecorator()(DemoForm);
`
formDecorator 支持传入 option
-   onFieldsChange(props, changed, all): void field 变化时触发
-   onValuesChange(props, changed, all): void value 变化时触发
controllerDecorator 用于包裹表单组件来让 form 可以收集到组件中的数据，然后将封装后的组件放置到 ZForm 中，如下
`js static
class Input extends React.Component {
render() {
return <input {...this.props} />;
}
}
const ZInput = controllerDecorator({
initialValue: ''
})(Input);
<ZForm form={form}>
<Item>
<ZInput zName="input" />
</Item>
</ZForm>;
`
controllerDecorator 包裹的控件为 controlled 状态，value 和 onChange 被 form 托管，组件内定义的默认值将无法生效，如一些控件依赖默认值（如 Slider、Input）必须要注意默认值的传入
`js static
class Input extends React.Component {
render() {
return <input {...this.props} />;
}
}
const ZInput = controllerDecorator({
// 不传会导致uncontrolled变换为controlled告警
initialValue: ''
})(Input);
<ZForm form={form}>
<Item>
<ZInput zName="input" />
</Item>
</ZForm>;
`
controllerDecorator 支持传入 option
-   valuePropName - 组件的值的 prop 名称
-   getValueProps - 根据组件的值获取 props
-   getValueFromEvent - 如何从 event 中获取值
-   initialValue - 初始值
-   normalize(value, prev, all): Object - 格式化值
-   trigger - 如何获取组件的数据
-   validateTrigger - 何时触发校验
-   rules - 组件的验证规则
-   validateFirst - 校验是否发生错误及停止
-   validate - 自定义校验
-   validate[n].trigger - 校验何时触发
-   validate[n].rules - 校验规则
-   hidden - 是否在表单中忽略该组件，不做校验和数据手机
validate
`js static
{
validateTrigger: 'onBlur',
rules: [{required: true}],
}
/ 等效于 /
{
validate: [{
trigger: 'onBlur',
rules: [{required: true}],
}]
}
`
默认的 getValueFromEvent
`js static
function defaultGetValueFromEvent(e) {
if (!e || !e.target) {
return e;
}
const { target } = e;
return target.type === 'checkbox' ? target.checked : target.value;
}
``
form 实例下有一系列方法来获取、设置、校验值等
-   getFieldsValue([fieldNames: String[]])
获取对应 field 的值，不传为所有
-   getFieldValue(fieldName: String)
获取单个 field 的值
-   getFieldInstance(fieldName: String)
获取对应 field 的实例
-   setFieldsValue(obj: Object)
通过 key-value 对象设置 field 的值
-   setFieldsInitialValue(obj: Object)
通过 key-value 对象设置 field 的初始值
-   setFields(obj: Object)
通过 key-value 对象设置 field 的值和 errors
-   validateFields([fieldNames: String[]], [options: Object], callback: (errors, values) => void)
校验表单
-   getFieldsError(names): Object{ [name]: String[] }
获取对应 field 的错误信息
-   getFieldError(name): String[]
获取 field 的错误
-   isFieldValidating(name: String): Bool
获取 field 是否正在校验
-   isFieldsValidating(names: String[]): Bool
是否其中存在 field 正在校验
-   isFieldTouched(name: String): Bool
获取 field 是否被用户做过更改
-   isFieldsTouched(names: String[]): Bool
是否其中存在 field 被用户做过更改
-   resetFields([names: String[]])
初始化/重置对应的 field
更多使用细节查看下方的演示
如果需要查看更多内容请看[rc-form 文档](https://github.com/react-component/form#option-object)
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { ZForm } from '@ucloud-fe/react-components';
```

> ⚠️ **全局规范 - 所有组件通用**:
> - 生成纯 JavaScript (JSX) 代码，**不要使用 TypeScript 类型注解**
> - **禁止**使用 `@alicloud/*`、`@aliyun/*`、`antd` 等外部组件库
> - 优先使用 UDesign 组件，不要用 HTML 原生标签替代
<!-- AUTO_END: import -->

<!-- AUTO_START: basic-usage -->
### 基本用法

```jsx
const { formDecorator, controllerDecorator, formShape } = ZForm;
const { Item } = Form;
class Input extends React.Component {
    render() {
        return <input {...this.props} />;
    }
}
const ZInput = controllerDecorator({
    initialValue: ''
})(Input);

class Checkbox extends React.Component {
    render() {
        return <input type="checkbox" {...this.props} />;
    }
}
const ZCheckbox = controllerDecorator({
    initialValue: true,
    valuePropName: 'checked'
})(Checkbox);

class DemoForm extends React.Component {
    handleSubmit() {
        const form = this.props.form;
        form.validateFields((error, value) => {
            console.log(error, value);
        });
    }
    render() {
        const { form } = this.props;
        const originErrors = form.getFieldsError() || [];

        const errors = [];
        _.each(originErrors, (errs, name) => {
            errs !== undefined &&
                errors.push({
                    name,
                    message: errs.join(', ')
                });
        });
        const itemLayout = {
            labelCol: {
                span: 1
            },
            controllerCol: {
                span: 5
            }
        };
        return (
            <ZForm form={form}>
                <Item label="input_1" {...itemLayout}>
                    <ZInput zName="input_1" />
                </Item>
                <Item label="input_2" {...itemLayout}>
                    <ZInput zName="input_2" zOptions={{ rules: [{ required: true }] }} />
                    {form.getField}
                </Item>
                <Item label="input_3" {...itemLayout}>
                    <ZInput zName="input_3" />
                </Item>
                <Item label="checkbox_1" {...itemLayout}>
                    <ZCheckbox zName="checkbox_1" />
                </Item>
                <Item label="checkbox_2" {...itemLayout}>
                    <ZCheckbox
                        zName="checkbox_2"
                        zOptions={{
                            initialValue: false
                        }}
                    />
                </Item>
                <p className="u-red">{errors.map(error => `${error.name}: ${error.message}`).join(', ')}</p>

                <button type="button" onClick={() => this.handleSubmit()}>
                    submit
                </button>
            </ZForm>
        );
    }
}
DemoForm.propTypes = {
    form: formShape
};
const Demo = formDecorator()(DemoForm);
```
<!-- AUTO_END: basic-usage -->

<!-- AUTO_START: props-table -->
### API 参数

| 属性 | 类型 | 默认值 | 必填 | 说明 |
|------|------|--------|------|------|
| form | `unknown` | - | - | formDecorator生成的form实例 |
<!-- AUTO_END: props-table -->



<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>普通使用</summary>

```jsx
const { formDecorator, controllerDecorator, formShape } = ZForm;
const { Item } = Form;
class Input extends React.Component {
    render() {
        return <input {...this.props} />;
    }
}
const ZInput = controllerDecorator({
    initialValue: ''
})(Input);

class Checkbox extends React.Component {
    render() {
        return <input type="checkbox" {...this.props} />;
    }
}
const ZCheckbox = controllerDecorator({
    initialValue: true,
    valuePropName: 'checked'
})(Checkbox);

class DemoForm extends React.Component {
    handleSubmit() {
        const form = this.props.form;
        form.validateFields((error, value) => {
            console.log(error, value);
        });
    }
    render() {
        const { form } = this.props;
        const originErrors = form.getFieldsError() || [];

        const errors = [];
        _.each(originErrors, (errs, name) => {
            errs !== undefined &&
                errors.push({
                    name,
                    message: errs.join(', ')
                });
        });
        const itemLayout = {
            labelCol: {
                span: 1
            },
            controllerCol: {
                span: 5
            }
        };
        return (
            <ZForm form={form}>
                <Item label="input_1" {...itemLayout}>
                    <ZInput zName="input_1" />
                </Item>
                <Item label="input_2" {...itemLayout}>
                    <ZInput zName="input_2" zOptions={{ rules: [{ required: true }] }} />
                    {form.getField}
                </Item>
                <Item label="input_3" {...itemLayout}>
                    <ZInput zName="input_3" />
                </Item>
                <Item label="checkbox_1" {...itemLayout}>
                    <ZCheckbox zName="checkbox_1" />
                </Item>
                <Item label="checkbox_2" {...itemLayout}>
                    <ZCheckbox
                        zName="checkbox_2"
                        zOptions={{
                            initialValue: false
                        }}
                    />
                </Item>
                <p className="u-red">{errors.map(error => `${error.name}: ${error.message}`).join(', ')}</p>

                <button type="button" onClick={() => this.handleSubmit()}>
                    submit
                </button>
            </ZForm>
        );
    }
}
DemoForm.propTypes = {
    form: formShape
};
const Demo = formDecorator()(DemoForm);
```

</details>

<details>
<summary>自定义校验规则</summary>

```jsx
const { formDecorator, controllerDecorator, formShape } = ZForm;
const { Item, SubArea } = Form;

const ZInput = controllerDecorator({
    initialValue: ''
})(Input);

const ZCheckbox = controllerDecorator({
    initialValue: true,
    valuePropName: 'checked'
})(Checkbox);

const ZSelect = controllerDecorator()(Select);

const getError = (error, key) => {
    return _.get(error, key);
};

class DemoForm extends React.PureComponent {
    handleSubmit() {
        const form = this.props.form;
        form.validateFields((error, value) => {
            console.log(error, value);
        });
    }
    render() {
        const { form } = this.props;
        const originErrors = form.getFieldsError() || [];

        const itemLayout = {
            labelCol: {
                span: 2
            },
            controllerCol: {
                span: 5
            }
        };
        const error1 = getError(originErrors, 'input_1');
        const error3 = getError(originErrors, 'input_3');
        const error4 = getError(originErrors, 'input_4');
        const error5 = getError(originErrors, 'input_5');
        const subError1 = getError(originErrors, 'sub_item_1');
        console.log(originErrors);
        return (
            <ZForm form={form} itemProps={{ ...itemLayout, shareStatus: true }}>
                <Item label="input_1" {...(error1 ? { status: 'error', tip: error1.join(',') } : {})}>
                    <ZInput
                        zName="input_1"
                        zOptions={{
                            rules: [
                                {
                                    required: true
                                }
                            ]
                        }}
                    />
                </Item>
                <Item label="input_2">
                    <ZInput
                        zName="input_2"
                        zOptions={{
                            rules: [
                                {
                                    required: true
                                },
                                {
                                    validator: (rule, value, callback) => {
                                        if (value.length < 6) {
                                            callback('at least 6 char');
                                        } else {
                                            callback();
                                        }
                                    }
                                },
                                {
                                    validator: (rule, value, callback) => {
                                        if (value.length > 10) {
                                            callback('less then 6 char');
                                        } else {
                                            callback();
                                        }
                                    }
                                }
                            ]
                        }}
                    />
                </Item>
                <Item
                    label="input_3"
                    {...(error3 ? { status: 'error', tip: error3.join(',') } : { tip: 'this is required' })}
                >
                    <ZInput
                        zName="input_3"
                        zOptions={{
                            rules: [
                                {
                                    required: true
                                }
                            ]
                        }}
                    />
                </Item>
                <Item label="input_4">
                    <ZInput
                        zName="input_4"
                        {...(error4 ? { status: 'error', tip: error4.join(',') } : { tip: 'this is required' })}
                        zOptions={{
                            rules: [
                                {
                                    required: true
                                },
                                {
                                    validator: (rule, value, callback) => {
                                        callback(null);
                                    }
                                }
                            ]
                        }}
                    />
                </Item>
                <Item label="input_5">
                    <ZInput
                        zName="input_5"
                        {...(error5 ? { status: 'error', tip: error5.join(',') } : { tip: 'this is required' })}
                        zOptions={{
                            rules: [
                                {
                                    required: true
                                },
                                {
                                    validator: (rule, value, callback) => {
                                        callback('error tips');
                                    }
                                }
                            ]
                        }}
                    />
                </Item>
                <Item label="checkbox_1">
                    <ZCheckbox zName="checkbox_1" />
                </Item>
                <Item label="select_1">
                    <ZSelect zName="select_1" options={[1, 2, 3, 4].map(v => ({ value: v, label: `label-${v}` }))} />
                </Item>
                <Item label="select_2">
                    <ZSelect
                        zName="select_2"
                        zOptions={{ initialValue: 1 }}
                        options={[1, 2, 3, 4].map(v => ({ value: v, label: `label-${v}` }))}
                    />
                </Item>
                <Item label="区域">
                    <SubArea>
                        <Item label="sub_item_1" {...(subError1 ? { status: 'error', tip: subError1.join(',') } : {})}>
                            <ZSelect
                                zName="sub_item_1"
                                zOptions={{
                                    rules: [
                                        {
                                            required: true
                                        }
                                    ]
                                }}
                                options={[1, 2, 3, 4].map(v => ({ value: v, label: `label-${v}` }))}
                            />
                        </Item>
                        <Item label="sub_item_2">
                            <ZSelect
                                zName="sub_item_2"
                                zOptions={{ initialValue: 1 }}
                                options={[1, 2, 3, 4].map(v => ({ value: v, label: `label-${v}` }))}
                            />
                        </Item>
                    </SubArea>
                </Item>

                <Button styleType="primary" onClick={() => this.handleSubmit()}>
                    submit
                </Button>
            </ZForm>
        );
    }
}
DemoForm.propTypes = {
    form: formShape
};
const Demo = formDecorator()(DemoForm);
```

</details>

<details>
<summary>使用 zName 定义表单数据结构</summary>

```jsx
const { formDecorator, controllerDecorator, formShape } = ZForm;
const { Item } = Form;
class Input extends React.Component {
    render() {
        return <input {...this.props} />;
    }
}
const ZInput = controllerDecorator({
    initialValue: ''
})(Input);

class Checkbox extends React.Component {
    render() {
        return <input type="checkbox" {...this.props} />;
    }
}
const ZCheckbox = controllerDecorator({
    initialValue: true,
    valuePropName: 'checked'
})(Checkbox);

class DemoForm extends React.Component {
    handleSubmit() {
        const form = this.props.form;
        form.validateFields((error, value) => {
            console.log(error, value);
        });
    }
    render() {
        const { form } = this.props;

        const itemLayout = {
            labelCol: {
                span: 2
            },
            controllerCol: {
                span: 5
            }
        };
        const renderInputArray = () => {
            const inputArray = [];
            for (let i = 0; i < 3; i++) {
                inputArray.push(
                    <Item label={`input ${i}`} key={i} {...itemLayout}>
                        <ZInput zName={`input[${i}]`} />
                    </Item>
                );
            }
            return inputArray;
        };
        const renderCheckboxObject = () => {
            const checkboxArray = [];
            const checkboxObject = {
                first: true,
                second: false,
                third: false
            };
            for (const key in checkboxObject) {
                checkboxArray.push(
                    <Item label={`checkbox ${key}`} key={key} {...itemLayout}>
                        <ZCheckbox
                            zName={`checkbox.${key}`}
                            zOptions={{
                                initialValue: checkboxObject[key]
                            }}
                        />
                    </Item>
                );
            }
            return checkboxArray;
        };
        return (
            <ZForm form={form}>
                {renderInputArray()}
                {renderCheckboxObject()}
                <Item label="a.b.c.d" {...itemLayout}>
                    <ZInput zName="a.b.c.d" />
                </Item>
                <Item label="r[0][1][2][3]" {...itemLayout}>
                    <ZInput zName="r[0][1][2][3]" />
                </Item>
                <Item label="z[0].a[1].b[2]" {...itemLayout}>
                    <ZInput zName="z[0].a[1].b[2]" />
                </Item>
                <button type="button" onClick={() => this.handleSubmit()}>
                    submit
                </button>
            </ZForm>
        );
    }
}
DemoForm.propTypes = {
    form: formShape
};
const Demo = formDecorator()(DemoForm);
```

</details>

<details>
<summary>模拟主机创建表单</summary>

```jsx
const { formDecorator, controllerDecorator, formShape } = ZForm;
const { Item } = Form;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;

const ZInput = controllerDecorator({
    initialValue: ''
})(Input);

const ZSwitch = controllerDecorator({ initialValue: false, valuePropName: 'checked' })(Switch);

const ZCheckbox = controllerDecorator({
    valuePropName: 'checked'
})(Checkbox);

const ZCheckboxGroup = controllerDecorator({})(CheckboxGroup);

const ZRadio = controllerDecorator({})(Radio);

const ZRadioGroup = controllerDecorator({})(RadioGroup);

const ZSelect = controllerDecorator()(Select);

let regionMap = [
    {
        RegionId: 1,
        RegionName: 'cn-east-01',
        Region: 'cn-zj',
        Zone: 'cn-zj-01'
    },
    {
        RegionId: 1001,
        RegionName: 'cn-north-01',
        Region: 'cn-bj1',
        Zone: 'cn-bj1-01'
    },
    {
        RegionId: 3001,
        RegionName: 'hk-01',
        Region: 'hk',
        Zone: 'hk-01'
    },
    {
        RegionId: 3002,
        RegionName: 'hk-02',
        Region: 'hk',
        Zone: 'hk-02'
    },
    {
        RegionId: 4001,
        RegionName: 'cn-north-02',
        Region: 'cn-bj2',
        Zone: 'cn-bj2-02'
    },
    {
        RegionId: 5001,
        RegionName: 'cn-north-03',
        Region: 'cn-bj2',
        Zone: 'cn-bj2-03'
    },
    {
        RegionId: 6001,
        RegionName: 'us-west-01',
        Region: 'us-ca',
        Zone: 'us-ca-01'
    },
    {
        RegionId: 7001,
        RegionName: 'cn-south-02',
        Region: 'cn-gd',
        Zone: 'cn-gd-02'
    },
    {
        RegionId: 8001,
        RegionName: 'cn-east-02',
        Region: 'cn-sh',
        Zone: 'cn-sh-01'
    },
    {
        RegionId: 8100,
        RegionName: 'cn-east-03',
        Region: 'cn-sh2',
        Zone: 'cn-sh2-01'
    },
    {
        RegionId: 8200,
        RegionName: 'cn-east-04',
        Region: 'cn-sh2',
        Zone: 'cn-sh2-02'
    },
    {
        RegionId: 9001,
        RegionName: 'cn-north-04',
        Region: 'cn-bj2',
        Zone: 'cn-bj2-04'
    },
    {
        RegionId: 9002,
        RegionName: 'cn-north-05',
        Region: 'cn-bj2',
        Zone: 'cn-bj2-05'
    },
    {
        RegionId: 10001,
        RegionName: 'us-ws-01',
        Region: 'us-ws',
        Zone: 'us-ws-01'
    },
    {
        RegionId: 10002,
        RegionName: 'ge-fra-01',
        Region: 'ge-fra',
        Zone: 'ge-fra-01'
    },
    {
        RegionId: 10003,
        RegionName: 'th-bkk-01',
        Region: 'th-bkk',
        Zone: 'th-bkk-01'
    },
    {
        RegionId: 10004,
        RegionName: 'kr-seoul-01',
        Region: 'kr-seoul',
        Zone: 'kr-seoul-01'
    },
    {
        RegionId: 10005,
        RegionName: 'sg-01',
        Region: 'sg',
        Zone: 'sg-01'
    },
    {
        RegionId: 10006,
        RegionName: 'tw-kh-01',
        Region: 'tw-kh',
        Zone: 'tw-kh-01'
    },
    {
        RegionId: 10007,
        RegionName: 'rus-mosc-01',
        Region: 'rus-mosc',
        Zone: 'rus-mosc-01'
    },
    {
        RegionId: 10008,
        RegionName: 'jpn-tky-01',
        Region: 'jpn-tky',
        Zone: 'jpn-tky-01'
    },
    {
        RegionId: 10009,
        RegionName: 'tw-tp-01',
        Region: 'tw-tp',
        Zone: 'tw-tp-01'
    },
    {
        RegionId: 10010,
        RegionName: 'uae-dubai-01',
        Region: 'uae-dubai',
        Zone: 'uae-dubai-01'
    },
    {
        RegionId: 10011,
        RegionName: 'idn-jakarta-01',
        Region: 'idn-jakarta',
        Zone: 'idn-jakarta-01'
    }
];

regionMap = _.groupBy(regionMap, region => {
    return region.Region;
});

const regions = _.map(_.keys(regionMap), region => ({
    value: region
}));

const types = [
    {
        value: '系列1'
    },
    {
        value: '系列2'
    }
];

const imageTypes = [
    {
        value: '标准'
    },
    {
        value: '自制'
    }
];

const imageList = [
    {
        value: 'CentOS 6.5 32Bit'
    },
    {
        value: 'CentOS 6.5 64Bit'
    },
    {
        value: 'CentOS 7.2 32Bit'
    },
    {
        value: 'CentOS 7.2 64Bit'
    }
];

class DemoForm extends React.PureComponent {
    handleSubmit() {
        const form = this.props.form;
        form.validateFields((error, value) => {
            console.log(error, value);
        });
    }
    render() {
        const { form } = this.props;
        const originErrors = form.getFieldsError() || [];

        const errors = [];
        _.each(originErrors, (errs, name) => {
            errs !== undefined &&
                errors.push({
                    name,
                    message: errs.join(', ')
                });
        });
        const itemLayout = {
            labelCol: {
                span: 2
            },
            controllerCol: {
                span: 10
            }
        };
        const defaultRegion = regions[0].value;
        const region = form.getFieldValue('Region') || defaultRegion;
        const zones = regionMap[region].map(zone => ({
            value: zone.Zone
        }));
        const defaultImageType = imageTypes[0].value;
        const imageType = form.getFieldValue('ImageType') || defaultImageType;
        return (
            <ZForm form={form}>
                <Item label="地域" {...itemLayout}>
                    <ZRadioGroup
                        zName="Region"
                        zOptions={{
                            initialValue: defaultRegion
                        }}
                        options={regions}
                        styleType="button"
                        onChange={region => {
                            const zones = regionMap[region].map(zone => ({
                                value: zone.Zone
                            }));
                            form.setFieldsValue({ Zone: zones[0].value });
                        }}
                    />
                </Item>
                <Item label="可用区" {...itemLayout}>
                    <ZRadioGroup
                        zName="Zone"
                        zOptions={{
                            initialValue: zones[0].value
                        }}
                        options={zones}
                        styleType="button"
                    />
                </Item>
                <Item label="系列" {...itemLayout}>
                    <ZRadioGroup
                        zName="Type"
                        zOptions={{
                            initialValue: types[0].value
                        }}
                        options={types}
                        styleType="button"
                    />
                </Item>
                <Item label="网络增强" {...itemLayout}>
                    <ZSwitch zName="NetworkEnhance" />
                </Item>
                <Item label="镜像" {...itemLayout}>
                    <ZRadioGroup
                        zName="ImageType"
                        zOptions={{
                            initialValue: imageTypes[0].value
                        }}
                        options={imageTypes}
                        styleType="button"
                    />
                    {imageType === '标准' ? (
                        <ZSelect
                            zName="ImageId"
                            zOptions={{
                                rules: [{ required: true }]
                            }}
                            options={imageList}
                            search
                        />
                    ) : (
                        <ZInput
                            zName="ImageId"
                            zOptions={{
                                rules: [{ required: true }]
                            }}
                            placeholder="请输入镜像ID"
                        />
                    )}
                </Item>

                <p className="u-red">{errors.map(error => `${error.name}: ${error.message}`).join(', ')}</p>

                <Button styleType="primary" onClick={() => this.handleSubmit()}>
                    submit
                </Button>
            </ZForm>
        );
    }
}
DemoForm.propTypes = {
    form: formShape
};
const Demo = formDecorator()(DemoForm);
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
