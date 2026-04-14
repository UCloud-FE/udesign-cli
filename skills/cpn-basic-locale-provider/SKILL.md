---
name: cpn-basic-locale-provider
description: 帮助 AI 正确使用 UDesign LocaleProvider 组件（国际化语言组件，用于外围包裹来支持统一控制组件的语言）。当需要使用 LocaleProvider 时加载此技能。
---

# 使用 LocaleProvider 组件

<!-- MANUAL_START: overview -->
## 技能概述

国际化语言组件，用于外围包裹来支持统一控制组件的语言
语言控制分为 3 层，开发者可控制的为 2 层，均为可选，优先级从低到高分别是: 组件默认语言（开发者不可控） -> LocaleProvider.locale -> Component.locale
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { LocaleProvider } from '@ucloud-fe/react-components';
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
        <LocaleProvider locale={ENLocale}>
            <Pagination total={100} showSizeChanger showQuickJumper={{ goButton: true }} />
        </LocaleProvider>
    </div>
);
```
<!-- AUTO_END: basic-usage -->

<!-- AUTO_START: props-table -->
### API 参数

| 属性 | 类型 | 默认值 | 必填 | 说明 |
|------|------|--------|------|------|
| locale | `AllLocaleMap` | `{}` | - |  |
| children | `ReactNode` | - | ✅ |  |
<!-- AUTO_END: props-table -->



<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>自定义语言</summary>

```jsx
const Demo = () => (
    <div>
        <LocaleProvider locale={{ Pagination: { itemsPerPage: 'items per page', jumpToConfirm: 'CONFIRM' } }}>
            <Pagination total={100} showSizeChanger showQuickJumper={{ goButton: true }} />
        </LocaleProvider>
    </div>
);
```

</details>

<details>
<summary>组件语言</summary>

```jsx
const Demo = () => (
    <div>
        <LocaleProvider locale={{ Pagination: { itemsPerPage: 'items per page', jumpToConfirm: 'CONFIRM' } }}>
            <Pagination
                total={100}
                showSizeChanger
                showQuickJumper={{ goButton: true }}
                locale={{
                    itemsPerPage: 'items/page',
                    nextPage: 'next page'
                }}
            />
        </LocaleProvider>
    </div>
);
```

</details>

<details>
<summary>引入语言文件</summary>

```jsx
const Demo = () => (
    <div>
        <LocaleProvider locale={ENLocale}>
            <Pagination total={100} showSizeChanger showQuickJumper={{ goButton: true }} />
        </LocaleProvider>
    </div>
);
```

</details>

<details>
<summary>全语言列表</summary>

```jsx
const CNLocale = {};
const localeMap = {
    zh_CN: CNLocale,
    en_US: ENLocale
};
const momentLocaleMap = {
    zh_CN: 'zh-cn',
    en_US: 'en'
};
const defaultLocale = 'zh_CN';
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            localeStr: defaultLocale,
            momentLocale: momentLocaleMap[defaultLocale],
            locale: localeMap[defaultLocale]
        };
        this.setLocale = this.setLocale.bind(this);
    }
    setLocale(locale) {
        moment.locale(momentLocaleMap[locale]);
        this.setState({
            localeStr: locale,
            momentLocale: momentLocaleMap[locale],
            locale: localeMap[locale]
        });
    }
    componentWillUnmount() {
        moment.locale(momentLocaleMap[defaultLocale]);
    }
    render() {
        const itemLayout = {
            labelCol: {
                span: 3
            },
            controllerCol: {
                span: 9
            }
        };
        const columns = new Array(5).fill(null).map((v, i) => ({
            title: `title-${i}`,
            key: `title-${i}`,
            width: 100,
            filter: {
                options: [1, 2],
                popoverProps: { getPopupContainer: () => document.body }
            },
            render: record => <span>content {record.index}</span>
        }));
        const dataSource = new Array(100).fill(null).map((v, i) => ({
            key: i
        }));
        const list = (
            <div>
                <div className="demo-wrap">
                    <Pagination total={100} showTotal showSizeChanger showQuickJumper={{ goButton: true }} />
                </div>
                <div className="demo-wrap">
                    <Calendar value={moment()} />
                </div>
                <div className="demo-wrap">
                    <DatePicker value={moment()} />
                </div>
                <div className="demo-wrap">
                    <DatePicker type="month" value={moment()} />
                </div>
                <div className="demo-wrap">
                    <DatePicker.Range value={[moment(), moment()]} />
                </div>
                <div className="demo-wrap">
                    <div className="demo-block">
                        <Select>
                            <Select.Option value={1}>1</Select.Option>
                            <Select.Option value={2}>2</Select.Option>
                            <Select.Option value={3}>3</Select.Option>
                        </Select>
                    </div>
                    <div className="demo-block">
                        <Select value={[1, 2]} multiple>
                            <Select.Option value={1}>1</Select.Option>
                            <Select.Option value={2}>2</Select.Option>
                            <Select.Option value={3}>3</Select.Option>
                        </Select>
                    </div>
                </div>
                <div className="demo-wrap">
                    <div className="demo-block">
                        <Button className="demo-alert-btn" onClick={() => Modal.alert({ title: 'alert' }, 'content')}>
                            alert
                        </Button>
                    </div>
                    <div className="demo-block">
                        <Button
                            className="demo-confirm-btn"
                            onClick={() => Modal.confirm({ title: 'confirm' }, 'content')}
                        >
                            confirm
                        </Button>
                    </div>
                </div>
                <div className="demo-wrap">
                    <Menu multiple showSelectAll collapseProps={{ defaultOpenKeys: ['1', '2'] }}>
                        <Menu.Item itemKey="1">item 1</Menu.Item>
                        <Menu.SubMenu subMenuKey="1" title="submenu 1">
                            <Menu.Item itemKey="1-1">item 1-1</Menu.Item>
                            <Menu.Item itemKey="1-2">item 1-2</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu subMenuKey="2" title="submenu 2">
                            <Menu.Item itemKey="2-1">item 2-1</Menu.Item>
                            <Menu.Item itemKey="2-2">item 2-2</Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                </div>
                <div className="demo-wrap">
                    <Upload />
                </div>
                <div className="demo-wrap">
                    <Table
                        className="test-table"
                        columns={columns}
                        title={() => (
                            <div className="clear-fixed">
                                <div style={{ float: 'right' }}>
                                    <Table.SearchInput className="test-search-input" style={{ marginRight: 5 }} />
                                    <Table.ColumnConfigButton className="test-column-config-btn" />
                                </div>
                            </div>
                        )}
                    />
                </div>
                <div className="demo-wrap">
                    <Table
                        columns={columns}
                        dataSource={dataSource}
                        rowSelection={{
                            defaultSelectedRowKeys: [1, 2, 5]
                        }}
                    />
                </div>
                <div className="demo-wrap">
                    <div style={{ marginBottom: 10 }}>
                        <Slider className="test-slider" />
                    </div>
                    <div>
                        <Slider className="test-slider-sensitive" isSensitive />
                    </div>
                </div>
                <div className="demo-wrap">
                    <PopConfirm popup="确认">
                        <Button>按钮</Button>
                    </PopConfirm>
                </div>
                <div className="demo-wrap">
                    <EditableList dataSource={[]} />
                </div>
                <div className="demo-wrap">
                    <Transfer dataSource={[]} />
                </div>
                <div className="demo-wrap">
                    <Tree search />
                </div>
                <div className="demo-wrap">
                    <Cascader />
                </div>
            </div>
        );
        const { localeStr, locale } = this.state;

        return (
            <div className="noeditor-wrap">
                <Form className="demo-form">
                    <Form.Item label="locale" {...itemLayout}>
                        <Radio.Group
                            styleType="button"
                            value={localeStr}
                            onChange={this.setLocale}
                            options={['zh_CN', 'en_US'].map(v => ({ value: v }))}
                        />
                    </Form.Item>
                </Form>
                <div>
                    <LocaleProvider locale={locale}>{list}</LocaleProvider>
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>useLocale - 使用组件中提供的多语言方案实现自己的多语言</summary>

```jsx
const { useLocale } = LocaleProvider;
// 使用 useLocale 使自己的组件拥有多语言切换的能力。
// 第一个参数为该组件的默认语言 map
// 第二个参数为该组件的语言 map 名称，用作全局提供语言文件到 LocaleProvider 时从中获取对应的语言
// 第三个参数为该组件本身接收的 props 语言参数，可不提供

const defaultLocale = { LOCALE_KEY: 'locale' };
const customLocale = { LOCALE_KEY: 'custom locale' };
const localeName = 'MY_CUSTOM_COMPONENT';
const CustomLocaleComponent = ({ locale }) => {
    const finalLocale = useLocale(defaultLocale, localeName, locale);
    return <div>{finalLocale.LOCALE_KEY}</div>;
};
CustomLocaleComponent.propTypes = {
    locale: PropTypes.object
};

const localeConsumerDecorator = ({ defaultLocale = {}, localeName }) => Child => {
    // eslint-disable-next-line react/display-name
    const LocalConsumerWrappedComponent = React.forwardRef(({ locale, ...rest }, ref) => {
        const finalLocale = useLocale(defaultLocale, localeName, locale);
        return <Child {...rest} locale={finalLocale} ref={ref} />;
    });
    LocalConsumerWrappedComponent.propTypes = {
        locale: PropTypes.object
    };
    return LocalConsumerWrappedComponent;
};

const A = ({ locale }) => {
    return <div>{locale.LOCALE_KEY}</div>;
};
A.propTypes = {
    locale: PropTypes.object.isRequired
};
const AWithLocale = localeConsumerDecorator({
    defaultLocale,
    localeName
})(A);

// or use as decorator
// @localeConsumerDecorator({ defaultLocale, localeName })
// class BWithLocale extends React.Component {
//     render() {
//         return <div>{this.props.locale.LOCALE_KEY}</div>;
//     }
// }
// BWithLocale.propTypes = {
//     locale: PropTypes.object.isRequired
// };

const Demo = () => {
    return (
        <div>
            <CustomLocaleComponent />
            <CustomLocaleComponent locale={customLocale} />
            <AWithLocale />
            <AWithLocale locale={customLocale} />
        </div>
    );
};
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
