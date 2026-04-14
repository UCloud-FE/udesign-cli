---
name: cpn-basic-table
description: 帮助 AI 正确使用 UDesign Table 组件（表格组件，通过传入 column 和 dataSource 来快速生成表格，内置搜索、滚动、表格列固定等功能）。当需要使用 Table 时加载此技能。
---

# 使用 Table 组件

<!-- MANUAL_START: overview -->
## 技能概述

Table 表格组件，通过传入 column 和 dataSource 来快速生成表格，内置搜索、滚动、表格列固定等功能。
为了确保数据的准确性请务必保证每条数据存在有效不重复的 key 或者使用 rowKey 来指定 key 的获取方式，表格中将会依照 key 来进行选择等操作。不传入将会使用数据在每一页中的 index 来作为 key，可能会造成 key 重复而导致错误，甚至造成各种奇怪的错误现象。
rowKey 支持函数，第二个参数为 record 在当前页面的 index，强烈不推荐使用！！！请务必注意。
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { Table } from '@ucloud-fe/react-components';
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
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'name',
                dataIndex: 'name',
                key: 'name',
                width: 100,
                filter: {
                    options: [1, 2, 3, 4]
                },
                order: true
            },
            {
                title: 'desc',
                dataIndex: 'desc',
                key: 'desc',
                width: 200,
                filter: {
                    options: [1, 2, 3, 4],
                    multiple: true
                },
                order: true
            },
            {
                title: 'Operations',
                dataIndex: '',
                key: 'operation',
                render: (text, record) => (
                    <a onClick={e => this.handleRemove(record.key, e)} href="#">
                        Remove
                    </a>
                )
            }
        ];
        let data = [];
        data.length = 100;
        data.fill({});
        data = data.map((d, i) => ({
            key: i + '',
            name: `name-${i}`,
            desc: `desc-${i}`
        }));
        this.state = {
            data,
            selectedRowKeys: []
        };
    }
    handleRemove(key, e) {
        console.log('Remove', key);
        e.preventDefault();
        const data = this.state.data.filter(item => item.key !== key);
        this.setState({ data });
        this.setState({
            selectedRowKeys: this.state.selectedRowKeys.filter(_key => _key !== key)
        });
    }
    handleAdd() {
        const data = [...this.state.data];
        const key = Date.now();
        data.unshift({
            name: `name-${key}`,
            desc: `desc-${key}`,
            key: Date.now()
        });
        this.setState({ data });
    }
    handleRemoveSelected() {
        const { selectedRowKeys } = this.state;
        const data = this.state.data.filter(record => _.findIndex(selectedRowKeys, key => key === '' + record.key) < 0);
        this.setState({ data });
        this.setState({
            selectedRowKeys: []
        });
    }
    render() {
        const { selectedRowKeys } = this.state;
        return (
            <Table
                columns={this.columns}
                dataSource={this.state.data}
                rowSelection={{
                    selectedRowKeys,
                    onChange: (selectedRowKeys, selectedRows) => {
                        console.log(selectedRowKeys, selectedRows);
                        this.setState({ selectedRowKeys });
                    }
                }}
                title={() => {
                    return (
                        <Box container justifyContent="space-between">
                            <Combine>
                                <Button onClick={() => this.handleAdd()} styleType="primary">
                                    新增
                                </Button>
                                <Button
                                    disabled={!selectedRowKeys || !selectedRowKeys.length}
                                    onClick={() => this.handleRemoveSelected()}
                                >
                                    删除
                                </Button>
                            </Combine>
                            <Combine>
                                <Table.SearchInput />
                                <Table.ColumnConfigButton />
                            </Combine>
                        </Box>
                    );
                }}
                defaultColumnConfig={{
                    name1: {
                        disabled: true,
                        hidden: true
                    }
                }}
                onColumnConfigChange={console.log}
                contextMenu={(record, hide) => (
                    <Menu selectable={false}>
                        <Menu.Item
                            onClick={e => {
                                this.handleRemove(record.key, e);
                                hide();
                            }}
                        >
                            Remove
                        </Menu.Item>
                        <Menu.Item
                            onClick={() => {
                                console.log(record);
                                hide();
                            }}
                        >
                            Log
                        </Menu.Item>
                    </Menu>
                )}
            />
        );
    }
}
```
<!-- AUTO_END: basic-usage -->

<!-- AUTO_START: props-table -->
### API 参数

| 属性 | 类型 | 默认值 | 必填 | 说明 |
|------|------|--------|------|------|
| pagination | `unknown` | `{}` | - | 分页组件的配置，传入null为隐藏分页 |
| dataSource | `unknown` | `[]` | - | 数据源 |
| columns | `unknown` | `[]` | - | 表列信息，具体属性参考 columns 事例 |
| columnPlaceholder | `unknown` | - | - | 启用后会创建一个无宽度的空列，用作宽度占位，占位后宽度溢出便不会导致表格列被压缩，多出的宽度会被空列占用。
占位列 column.key 为 table\_column\_width\_placeholder，使用中需注意避免重复 key |
| defaultColumnConfig | `unknown` | `{}` | - | 表列配置项，非受控 |
| onColumnConfigChange | `unknown` | `() => {}` | - | 表列配置修改回调 |
| expandedRowRender | `unknown` | - | - | 额外表信息渲染 |
| expandIconAsCell | `unknown` | - | - | 额外表展开按钮是否独立占据一格，data有children时有效 |
| expandIconColumnIndex | `unknown` | - | - | 展开按钮的塞入的column index，expandIconAsCell为false时生效 |
| hideExpandIcon | `unknown` | - | - | 隐藏扩展列按钮 |
| defaultExpandedRowKeys | `unknown` | - | - | 默认展开项，非受控 |
| expandedRowKeys | `unknown` | - | - | 展开项，受控 |
| defaultExpandAllRows | `unknown` | - | - | 是否默认展开所有列 |
| onExpandedRowsChange | `unknown` | - | - | 展开事件 |
| onExpand | `unknown` | - | - | 展开按钮点击事件 |
| onRow | `unknown` | - | - | 设置行props |
| onHeaderRow | `unknown` | - | - | 设置表头props |
| rowSelection | `unknown` | - | - | 列表可选选项配置.
column.key 为 table\_row\_selection，使用中需注意避免重复 key |
| dragSorting | `unknown` | - | - | 拖拽排序 |
| onRowSelect | `unknown` | - | - | 列表选项变化回调 |
| showHeader | `unknown` | - | - | 是否显示表头 |
| columnResizable | `unknown` | - | - | 是否可拖拽调节表格列大小 |
| title | `unknown` | - | - | 头部内容 |
| footer | `unknown` | - | - | 底部内容 |
| emptyContent | `unknown` | - | - | 无数据时的展示内容 |
| errorContent | `unknown` | - | - | 报错信息 |
| handleSearch | `unknown` | `(record, searchValue) => {
    return _.map(record).join('').indexOf(searchValue) >= 0;
}` | - | 如何搜索 |
| customStyle | `unknown` | `{}` | - | 自定义样式 |
| scroll | `unknown` | - | - | 滚动配置 |
| tableLayout | `unknown` | - | - | 表格布局，当 scroll.x 有值时为 fixed，其它时候默认为 auto，可自行覆盖 |
| rowKey | `unknown` | `'key'` | - | 定义如何获取每行的键值 |
| zebraCrossing | `unknown` | - | - | 是否有斑马线，存在子表格时，斑马线样式可能会错乱 |
| components | `unknown` | - | - | 自定义表格组件，慎用 |
| defaultOrder | `unknown` | - | - | 默认排序设置，key 为 column key，state 为升序(asc)或降序(desc) |
| order | `unknown` | - | - | 受控排序设置，key 为 column key，state 为升序(asc)或降序(desc) |
| onConditionChange | `unknown` | - | - | 表格的筛选等条件变更时的回调 |
| doNotHandleCondition | `unknown` | - | - | order、filter、searchValue、pagination变化时表格内部不处理 |
| contextMenu | `unknown` | - | - | 右键菜单 |
| className | `unknown` | - | - |  |
| style | `unknown` | - | - |  |
| locale | `unknown` | - | - |  |
<!-- AUTO_END: props-table -->


<!-- AUTO_START: tokens -->
### Design Tokens

| Token 名称 | 分类 | 默认值 | 暗色值 | 说明 |
|------------|------|--------|--------|------|
| `T_TABLE_HEADER_COLOR_BG2` | color | `#ffffff` | `#141A2B` | - |
| `T_TABLE_HEADER_COLOR_BG_DEFAULT` | color | `#ffffff` | `#141A2B` | - |
| `T_TABLE_HEADER_COLOR_ICON` | color | `#0a1633` | `#F7F9FF` | - |
| `T_TABLE_ROW_COLOR_BG_DEFAULT` | color | `#f6f6fb` | `#1F2538` | - |
| `T_TABLE_ROW_COLOR_BG_HOVER` | color | `#EAEEFD` | `#2b3555` | - |
<!-- AUTO_END: tokens -->

<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>属性调试</summary>

```jsx
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataLength: 100,
            columnLength: 6,
            rowSelection: true,
            fixedFirstColumn: false,
            fixedLastColumn: false,
            hasError: false,
            removeLastButOneColumnWidth: false,
            showHeader: true,
            showPagination: true,
            zebraCrossing: false,
            columnPlaceholder: false,
            rowSelectionSelectedTip: true,
            tableLayout: 'default',
            scroll: {
                x: false,
                y: false
            }
        };
    }
    render() {
        const {
            dataLength,
            columnLength,
            rowSelection,
            searchInput,
            columnConfigButtom,
            fixedFirstColumn,
            fixedLastColumn,
            hasError,
            removeLastButOneColumnWidth,
            showHeader,
            showPagination,
            scroll,
            zebraCrossing,
            columnPlaceholder,
            tableLayout,
            rowSelectionSelectedTip
        } = this.state;
        let dataSource = [];
        dataSource.length = dataLength;
        dataSource.fill({});
        dataSource = dataSource.map((d, i) => ({
            key: i,
            name: `this is a very long name ${i}: balabalabalabalabalabala`
        }));
        const itemLayout = {
            labelCol: {
                span: 3
            },
            controllerCol: {
                span: 9
            }
        };
        let columns = [];
        columns.length = columnLength;
        columns.fill({});
        columns = columns.map((d, i) => ({
            title: `name ${i}`,
            dataIndex: 'name',
            key: `name ${i}`,
            width: 100,
            filter: {
                options: [1, 2, 3, 4]
            },
            order: true,
            render: value => {
                return <span style={{ wordBreak: 'break-word' }}>{value}</span>;
            }
        }));

        if (fixedFirstColumn) {
            columns[0].fixed = 'left';
        }
        if (fixedLastColumn) {
            columns[columnLength - 1].fixed = 'right';
        }

        if (removeLastButOneColumnWidth) {
            delete columns[columnLength - 2].width;
        }

        const tableProps = {
            columns,
            dataSource,
            showHeader,
            scroll,
            zebraCrossing,
            columnPlaceholder,
            tableLayout: tableLayout === 'default' ? undefined : tableLayout
        };
        if (rowSelection) {
            tableProps.rowSelection = {
                fixed: fixedFirstColumn
            };
            tableProps.rowSelection.selectedTip = rowSelectionSelectedTip;
        }
        if (!showPagination) {
            tableProps.pagination = null;
        }
        return (
            <div>
                <Form className="demo-form">
                    <Form.Item label="dataLength" {...itemLayout}>
                        <NumberInput value={dataLength} onNumberChange={dataLength => this.setState({ dataLength })} />
                    </Form.Item>
                    <Form.Item label="columnLength" {...itemLayout}>
                        <NumberInput
                            value={columnLength}
                            onNumberChange={columnLength => this.setState({ columnLength })}
                        />
                    </Form.Item>
                    <Form.Item label="rowSelection" {...itemLayout}>
                        <Switch checked={rowSelection} onChange={rowSelection => this.setState({ rowSelection })} />
                    </Form.Item>
                    <Form.Item label="rowSelection.selectedTip" {...itemLayout}>
                        <Radio.Group
                            styleType="button"
                            options={[true, false, 'bottom'].map(v => ({ label: v + '', value: v }))}
                            value={rowSelectionSelectedTip}
                            onChange={rowSelectionSelectedTip =>
                                this.setState({
                                    rowSelectionSelectedTip
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="showHeader" {...itemLayout}>
                        <Switch checked={showHeader} onChange={showHeader => this.setState({ showHeader })} />
                    </Form.Item>
                    <Form.Item label="showPagination" {...itemLayout}>
                        <Switch
                            checked={showPagination}
                            onChange={showPagination => this.setState({ showPagination })}
                        />
                    </Form.Item>
                    <Form.Item label="searchInput" {...itemLayout}>
                        <Switch checked={searchInput} onChange={searchInput => this.setState({ searchInput })} />
                    </Form.Item>
                    <Form.Item label="columnConfigButtom" {...itemLayout}>
                        <Switch
                            checked={columnConfigButtom}
                            onChange={columnConfigButtom => this.setState({ columnConfigButtom })}
                        />
                    </Form.Item>
                    <Form.Item label="columnPlaceholder" {...itemLayout}>
                        <Switch
                            checked={columnPlaceholder}
                            onChange={columnPlaceholder => this.setState({ columnPlaceholder })}
                        />
                    </Form.Item>
                    <Form.Item label="tableLayout" {...itemLayout}>
                        <Radio.Group
                            styleType="button"
                            options={['default', 'auto', 'fixed'].map(v => ({ label: v + '', value: v }))}
                            value={tableLayout}
                            onChange={tableLayout =>
                                this.setState({
                                    tableLayout
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="hasError" {...itemLayout}>
                        <Switch checked={hasError} onChange={hasError => this.setState({ hasError })} />
                    </Form.Item>
                    <Form.Item label="removeLastButOneColumnWidth" {...itemLayout}>
                        <Switch
                            checked={removeLastButOneColumnWidth}
                            onChange={removeLastButOneColumnWidth => this.setState({ removeLastButOneColumnWidth })}
                        />
                    </Form.Item>
                    <Form.Item label="scroll.x" {...itemLayout}>
                        <Switch
                            checked={scroll.x !== false}
                            onChange={x =>
                                this.setState({
                                    scroll: {
                                        ...scroll,
                                        x
                                    }
                                })
                            }
                        />
                        {scroll.x !== false && (
                            <NumberInput
                                style={{ marginLeft: 5 }}
                                value={scroll.x === true ? 0 : scroll.x}
                                min={0}
                                onNumberChange={x =>
                                    this.setState({
                                        scroll: {
                                            ...scroll,
                                            x: x > 0 ? x : true
                                        }
                                    })
                                }
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="scroll.y" {...itemLayout}>
                        <Switch
                            checked={scroll.y !== false}
                            onChange={y =>
                                this.setState({
                                    scroll: {
                                        ...scroll,
                                        y
                                    }
                                })
                            }
                        />
                        {scroll.y !== false && (
                            <NumberInput
                                style={{ marginLeft: 5 }}
                                value={scroll.y === true ? 0 : scroll.y}
                                min={0}
                                onNumberChange={y =>
                                    this.setState({
                                        scroll: {
                                            ...scroll,
                                            y: y > 0 ? y : true
                                        }
                                    })
                                }
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="fixed first column and row selection" {...itemLayout}>
                        <Switch
                            checked={fixedFirstColumn}
                            onChange={fixedFirstColumn =>
                                this.setState({
                                    fixedFirstColumn
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="fixed last column" {...itemLayout}>
                        <Switch
                            checked={fixedLastColumn}
                            onChange={fixedLastColumn =>
                                this.setState({
                                    fixedLastColumn
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="zebraCrossing" {...itemLayout}>
                        <Switch
                            checked={zebraCrossing}
                            onChange={zebraCrossing =>
                                this.setState({
                                    zebraCrossing
                                })
                            }
                        />
                    </Form.Item>
                </Form>

                <div className="demo-wrap">
                    <Table
                        {...tableProps}
                        title={() => {
                            return (
                                <div className="clear-fixed">
                                    <div style={{ float: 'right' }}>
                                        {searchInput && <Table.SearchInput style={{ marginRight: 8 }} />}
                                        {columnConfigButtom && <Table.ColumnConfigButton />}
                                    </div>
                                </div>
                            );
                        }}
                        errorContent={
                            hasError ? (
                                <Notice styleType="error" closable={false}>
                                    报错啦
                                </Notice>
                            ) : null
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
<summary>基本使用</summary>

```jsx
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'name',
                dataIndex: 'name',
                key: 'name',
                width: 100,
                filter: {
                    options: [1, 2, 3, 4]
                },
                order: true
            },
            {
                title: 'desc',
                dataIndex: 'desc',
                key: 'desc',
                width: 200,
                filter: {
                    options: [1, 2, 3, 4],
                    multiple: true
                },
                order: true
            },
            {
                title: 'Operations',
                dataIndex: '',
                key: 'operation',
                render: (text, record) => (
                    <a onClick={e => this.handleRemove(record.key, e)} href="#">
                        Remove
                    </a>
                )
            }
        ];
        let data = [];
        data.length = 100;
        data.fill({});
        data = data.map((d, i) => ({
            key: i + '',
            name: `name-${i}`,
            desc: `desc-${i}`
        }));
        this.state = {
            data,
            selectedRowKeys: []
        };
    }
    handleRemove(key, e) {
        console.log('Remove', key);
        e.preventDefault();
        const data = this.state.data.filter(item => item.key !== key);
        this.setState({ data });
        this.setState({
            selectedRowKeys: this.state.selectedRowKeys.filter(_key => _key !== key)
        });
    }
    handleAdd() {
        const data = [...this.state.data];
        const key = Date.now();
        data.unshift({
            name: `name-${key}`,
            desc: `desc-${key}`,
            key: Date.now()
        });
        this.setState({ data });
    }
    handleRemoveSelected() {
        const { selectedRowKeys } = this.state;
        const data = this.state.data.filter(record => _.findIndex(selectedRowKeys, key => key === '' + record.key) < 0);
        this.setState({ data });
        this.setState({
            selectedRowKeys: []
        });
    }
    render() {
        const { selectedRowKeys } = this.state;
        return (
            <Table
                columns={this.columns}
                dataSource={this.state.data}
                rowSelection={{
                    selectedRowKeys,
                    onChange: (selectedRowKeys, selectedRows) => {
                        console.log(selectedRowKeys, selectedRows);
                        this.setState({ selectedRowKeys });
                    }
                }}
                title={() => {
                    return (
                        <Box container justifyContent="space-between">
                            <Combine>
                                <Button onClick={() => this.handleAdd()} styleType="primary">
                                    新增
                                </Button>
                                <Button
                                    disabled={!selectedRowKeys || !selectedRowKeys.length}
                                    onClick={() => this.handleRemoveSelected()}
                                >
                                    删除
                                </Button>
                            </Combine>
                            <Combine>
                                <Table.SearchInput />
                                <Table.ColumnConfigButton />
                            </Combine>
                        </Box>
                    );
                }}
                defaultColumnConfig={{
                    name1: {
                        disabled: true,
                        hidden: true
                    }
                }}
                onColumnConfigChange={console.log}
                contextMenu={(record, hide) => (
                    <Menu selectable={false}>
                        <Menu.Item
                            onClick={e => {
                                this.handleRemove(record.key, e);
                                hide();
                            }}
                        >
                            Remove
                        </Menu.Item>
                        <Menu.Item
                            onClick={() => {
                                console.log(record);
                                hide();
                            }}
                        >
                            Log
                        </Menu.Item>
                    </Menu>
                )}
            />
        );
    }
}
```

</details>

<details>
<summary>columns - 表格列属性定义</summary>

```jsx
class Demo extends React.Component {
    render() {
        const dataSource = new Array(100).fill(null).map((v, i) => ({
            key: i,
            index: `index-${i}`
        }));
        const columns = [
            {
                /**
                 * @type {node}
                 * 表头展示内容，也是自定义表头弹窗中的展示内容
                 */
                title: `title`,
                /**
                 * @type {function}
                 * @param title - 上面的title
                 * 自定义表头展示内容，使用这个可以不影响在自定义弹窗中的展示
                 */
                renderTitle: title => (
                    <span>
                        <Icon type="circle" />
                        <span>{title}</span>
                        <Icon type="square" />
                    </span>
                ),
                /**
                 * @type {string}
                 * column的key，必传，用作性能优化和标识，不能重复
                 */
                key: `title`,
                /**
                 * @type {number}
                 * 固定列宽，表格固定宽度时会按照权重比例分割
                 */
                width: 200,
                /**
                 * @type {object}
                 * 筛选信息
                 * @property {array} options - 筛选选项
                 * @property {boolean} multiple - 是否为多选
                 * @property {string|string[]} defaultValue - 非受控默认筛选值
                 * @property {string|string[]} value - 受控筛选值
                 * @property {node|object} extra - 嵌入额外内容，具体使用可参考 Select.extra
                 * @property {function} handleFilter - 自定义筛选函数
                 *      @param value - 根据dataIndex计算出来的值
                 *      @param record - 列表的数据
                 *      @param filterValue - 筛选的值
                 */
                filter: {
                    options: [1, 2, 3, 4]
                },
                /**
                 * @type {boolean | object}
                 * 是否支持排序，可传入handleOrder进行自定义排序逻辑
                 */
                order: true,
                /**
                 * @type {string}
                 * 指定数据key，默认展示为record[dataIndex]
                 */
                dataIndex: 'index',
                /**
                 * @type {function}
                 * @param value - 根据dataIndex计算出来的值，未传入dataIndex时为record
                 * @param record - 列表的数据
                 * @param index - 数据在该页的index，请勿使用该index，因为这个index为不可信数据，同一条数据在分页、筛选等变动时index不一致
                 * 自定义渲染内容
                 */
                render: value => {
                    return <span>content {value}</span>;
                }
            }
        ];
        return (
            <div>
                <div className="demo-wrap">
                    <Table dataSource={dataSource} columns={columns} />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>emptyContent - 自定义空表格提示</summary>

```jsx
class Demo extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Table
                        rowKey="dataIndex"
                        columns={[
                            {
                                title: 'name',
                                key: 'name',
                                dataIndex: 'name'
                            }
                        ]}
                    />
                </div>
                <div className="demo-wrap">
                    <Table
                        rowKey="dataIndex"
                        columns={[
                            {
                                title: 'name',
                                key: 'name',
                                dataIndex: 'name'
                            }
                        ]}
                        emptyContent={<p style={{ background: 'blue' }}>没东西啊</p>}
                    />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>errorContent - 报错提示内容</summary>

```jsx
class Demo extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Table
                        rowKey="dataIndex"
                        columns={[
                            {
                                title: 'name',
                                key: 'name',
                                dataIndex: 'name'
                            }
                        ]}
                        errorContent={
                            <Notice closable={false} styleType="error">
                                哎，报错了
                            </Notice>
                        }
                    />
                </div>
                <div className="demo-wrap">
                    <Table
                        rowKey="dataIndex"
                        columns={[
                            {
                                title: 'name',
                                key: 'name',
                                dataIndex: 'name'
                            }
                        ]}
                        errorContent={<p style={{ background: 'red' }}>哎，报错了</p>}
                    />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>scroll - 滚动定义</summary>

```jsx
class Demo extends React.Component {
    render() {
        const dataSource = new Array(100).fill(null).map((v, i) => ({
            key: i,
            index: `index-${i}`
        }));
        const columns = new Array(20).fill(null).map((v, i) => ({
            title: `title-${i}`,
            key: `title-${i}`,
            width: 200,
            render: record => <span>content {record.index}</span>
        }));
        const autoWidthColumns = new Array(20).fill(null).map((v, i) => ({
            title: `title-${i}`,
            key: `title-${i}`,
            render: () => (
                <div style={{ minWidth: '100px', maxWidth: '300px' }}>
                    {new Array((Math.random() * i * 10) | 0).fill('v').join('')}
                </div>
            )
        }));
        return (
            <div>
                <h2>横向滚动</h2>
                <div className="demo-wrap">
                    <Table scroll={{ x: true }} dataSource={dataSource} columns={columns} />
                </div>
                <h2>无宽度时通过设置 tableLayout 会被内容撑开</h2>
                <div className="demo-wrap">
                    <Table scroll={{ x: true }} tableLayout="auto" dataSource={dataSource} columns={autoWidthColumns} />
                </div>
                <h2>纵向滚动时表格被拆分成两个表格，所以需要注意设置 column width，否则会出现头和数据不同步</h2>
                <div className="demo-wrap">
                    <Table scroll={{ y: 200 }} dataSource={dataSource} columns={columns} />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>title - 自定义表格顶部内容</summary>

```jsx
class Demo extends React.Component {
    render() {
        const dataSource = new Array(100).fill(null).map((v, i) => ({
            key: i,
            index: `index-${i}`
        }));
        const columns = new Array(5).fill(null).map((v, i) => ({
            title: `title-${i}`,
            key: `title-${i}`,
            width: 200,
            render: record => <span>content {record.index}</span>
        }));
        return (
            <div>
                <div className="demo-wrap">
                    <Table
                        title={() => (
                            <Combine>
                                <Button styleType="primary">Add</Button>
                                <Button>Remove</Button>
                            </Combine>
                        )}
                        dataSource={dataSource}
                        columns={columns}
                    />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>footer - 自定义表格底部内容</summary>

```jsx
class Demo extends React.Component {
    render() {
        const dataSource = new Array(100).fill(null).map((v, i) => ({
            key: i,
            index: `index-${i}`
        }));
        const columns = new Array(5).fill(null).map((v, i) => ({
            title: `title-${i}`,
            key: `title-${i}`,
            width: 200,
            render: record => <span>content {record.index}</span>
        }));
        return (
            <div>
                <div className="demo-wrap">
                    <Table
                        footer={() => (
                            <Combine>
                                <Button styleType="primary">Add</Button>
                                <Button>Rmove</Button>
                            </Combine>
                        )}
                        dataSource={dataSource}
                        columns={columns}
                    />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>pagination - 自定义分页设置</summary>

```jsx
class Demo extends React.Component {
    render() {
        const dataSource = new Array(100).fill(null).map((v, i) => ({
            key: i,
            index: `index-${i}`
        }));
        const columns = new Array(5).fill(null).map((v, i) => ({
            title: `title-${i}`,
            key: `title-${i}`,
            width: 200,
            render: record => <span>content {record.index}</span>
        }));
        return (
            <div>
                <div className="demo-wrap">
                    <Table
                        pagination={{
                            defaultCurrent: 3,
                            defaultPageSize: 20
                        }}
                        dataSource={dataSource}
                        columns={columns}
                    />
                </div>
                <div className="demo-wrap">
                    <Table pagination={null} dataSource={dataSource} scroll={{ y: 600 }} columns={columns} />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>rowKey - 定义 key 的获取</summary>

```jsx
class Demo extends React.Component {
    render() {
        const dataSource = new Array(100).fill(null).map((v, i) => ({
            index: `index-${i}`
        }));
        const columns = new Array(5).fill(null).map((v, i) => ({
            title: `title-${i}`,
            key: `title-${i}`,
            width: 200,
            render: record => <span>content {record.index}</span>
        }));
        return (
            <div>
                <div className="demo-wrap">
                    <Table rowKey="index" dataSource={dataSource} columns={columns} />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>contextMenu - 右键菜单</summary>

```jsx
class Demo extends React.Component {
    render() {
        const dataSource = new Array(100).fill(null).map((v, i) => ({
            key: i,
            index: `index-${i}`
        }));
        const columns = new Array(5).fill(null).map((v, i) => ({
            title: `title-${i}`,
            key: `title-${i}`,
            width: 200,
            render: record => <span>content {record.index}</span>
        }));
        return (
            <div>
                <div className="demo-wrap">
                    <Table
                        contextMenu={(record, hide) => (
                            <Button
                                onClick={() => {
                                    console.log(record);
                                    hide();
                                }}
                            >
                                log
                            </Button>
                        )}
                        dataSource={dataSource}
                        columns={columns}
                    />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>filter - 筛选</summary>

```jsx
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            controlledFilter: 1,
            controlledMultipleFilter: [1, 3]
        };
    }
    render() {
        const dataSource = new Array(100).fill(null).map((v, i) => ({
            key: i,
            index: `index-${i}`
        }));
        const { controlledFilter, controlledMultipleFilter } = this.state;
        const columns = [
            {
                title: `multiple`,
                dataIndex: 'index',
                key: 'multiple',
                width: 200,
                filter: {
                    options: [1, 2, 3],
                    multiple: true
                }
            },
            {
                title: `extra`,
                dataIndex: 'index',
                key: 'extra',
                width: 200,
                filter: {
                    options: new Array(100).fill(null).map((v, i) => i),
                    search: true,
                    extra: (
                        <Button styleType="primary" style={{ width: '100%' }}>
                            Extra Button
                        </Button>
                    )
                }
            },
            {
                title: `single`,
                dataIndex: 'index',
                key: 'single',
                width: 200,
                filter: {
                    options: [1, 2, 3]
                }
            },
            {
                title: `controlled`,
                dataIndex: 'index',
                key: 'controlled',
                width: 200,
                filter: {
                    value: controlledFilter,
                    options: [1, 2, 3]
                }
            },
            {
                title: `controlledMultiple`,
                dataIndex: 'index',
                key: 'controlledMultiple',
                width: 200,
                filter: {
                    value: controlledMultipleFilter,
                    options: [1, 2, 3],
                    multiple: true
                }
            },
            {
                title: `defaultValue`,
                dataIndex: 'index',
                key: 'defaultValue',
                width: 200,
                filter: {
                    defaultValue: 2,
                    options: [1, 2, 3]
                }
            },
            {
                title: `custom`,
                width: 200,
                key: 'custom',
                render: record => <span>content {record.index}</span>,
                filter: {
                    options: [1, 2, 3],
                    handleFilter: (value, record, filterValue) => {
                        return record.key === 0 || record.index.indexOf(filterValue) >= 0;
                    }
                }
            }
        ];
        return (
            <div>
                <div className="demo-wrap">
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        onConditionChange={({ filters = [] }) => {
                            console.log(filters);
                            const controlledFilter = _.find(filters, filter => filter.key === 'controlled');
                            const controlledMultipleFilter = _.find(
                                filters,
                                filter => filter.key === 'controlledMultiple'
                            );
                            this.setState({
                                controlledFilter: controlledFilter == null ? null : controlledFilter.value,
                                controlledMultipleFilter:
                                    controlledMultipleFilter == null ? [] : controlledMultipleFilter.value
                            });
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
<summary>order - 排序</summary>

```jsx
const dataSource = new Array(100).fill(null).map((v, i) => ({
    key: i,
    index: `index-${i}`,
    value: (Math.random() * 1000) | 0
}));
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: {
                key: 'custom',
                state: 'desc'
            }
        };
    }
    render() {
        const columns = [
            {
                title: `auto`,
                dataIndex: 'index',
                key: 'auto',
                width: 200,
                order: true
            },
            {
                title: `custom`,
                width: 200,
                key: 'custom',
                dataIndex: 'value',
                order: {
                    handleOrder: (descOrAsc, a, b) => {
                        if (descOrAsc === 'desc') {
                            return a.value > b.value ? -1 : a.value < b.value ? 1 : 0;
                        } else if (descOrAsc === 'asc') {
                            return a.value < b.value ? -1 : a.value > b.value ? 1 : 0;
                        }
                    }
                }
            }
        ];
        return (
            <div>
                <div className="demo-wrap">
                    默认排序非受控：
                    <Table dataSource={dataSource} columns={columns} defaultOrder={{ key: 'custom', state: 'desc' }} />
                    受控不可变更排序：
                    <Table dataSource={dataSource} columns={columns} order={{ key: 'custom', state: 'desc' }} />
                    随机受控排序：
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        order={this.state.order}
                        onConditionChange={({ order }) => {
                            if (Math.random() * 100 > 80) {
                                console.log(`don't handler order: `, order);
                                return;
                            }
                            this.setState({
                                order: order
                            });
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
<summary>expandedRowRender - 扩展内容渲染</summary>

```jsx
class Demo extends React.Component {
    render() {
        const dataSource = new Array(100).fill(null).map((v, i) => ({
            key: i,
            index: `index-${i}`
        }));
        const columns = new Array(5).fill(null).map((v, i) => ({
            title: `title-${i}`,
            key: `title-${i}`,
            width: 200,
            render: record => <span>content {record.index}</span>
        }));
        return (
            <div>
                <div className="demo-wrap">
                    <Table
                        expandedRowRender={record => (
                            <Table.ExpandedRowContent>this is the expandedRow of {record.key}</Table.ExpandedRowContent>
                        )}
                        dataSource={dataSource}
                        columns={columns}
                    />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>hideExpandIcon - 隐藏扩展列展开按钮</summary>

```jsx
class Demo extends React.Component {
    render() {
        const dataSource = new Array(100).fill(null).map((v, i) => ({
            key: i,
            index: `index-${i}`
        }));
        const columns = new Array(5).fill(null).map((v, i) => ({
            title: `title-${i}`,
            key: `title-${i}`,
            width: 200,
            render: record => <span>content {record.index}</span>
        }));
        return (
            <div>
                <div className="demo-wrap">
                    <Table
                        hideExpandIcon
                        expandedRowRender={record => <p>this is the expandedRow of {record.key}</p>}
                        defaultExpandedRowKeys={[1, 2]}
                        dataSource={dataSource}
                        columns={columns}
                    />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>expandedRowKeys - 展开列</summary>

```jsx
class Demo extends React.Component {
    render() {
        const dataSource = new Array(100).fill(null).map((v, i) => ({
            key: i,
            index: `index-${i}`
        }));
        const columns = new Array(5).fill(null).map((v, i) => ({
            title: `title-${i}`,
            key: `title-${i}`,
            width: 200,
            render: record => <span>content {record.index}</span>
        }));
        return (
            <div>
                <div className="demo-wrap">
                    <Table
                        expandedRowRender={record => <p>this is the expandedRow of {record.key}</p>}
                        defaultExpandedRowKeys={[1, 2]}
                        onExpandedRowsChange={(...args) => console.log('onExpandedRowsChange: ', ...args)}
                        onExpand={(...args) => console.log('onExpand: ', ...args)}
                        dataSource={dataSource}
                        columns={columns}
                    />
                </div>
                <div className="demo-wrap">
                    <Table
                        expandedRowRender={record => <p>this is the expandedRow of {record.key}</p>}
                        expandedRowKeys={[1, 2]}
                        onExpandedRowsChange={(...args) => console.log('onExpandedRowsChange: ', ...args)}
                        onExpand={(...args) => console.log('onExpand: ', ...args)}
                        dataSource={dataSource}
                        columns={columns}
                    />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>defaultExpandAllRows - 默认展开扩展列</summary>

```jsx
class Demo extends React.Component {
    render() {
        const dataSource = new Array(100).fill(null).map((v, i) => ({
            key: i,
            index: `index-${i}`
        }));
        const columns = new Array(5).fill(null).map((v, i) => ({
            title: `title-${i}`,
            key: `title-${i}`,
            width: 200,
            render: record => <span>content {record.index}</span>
        }));
        return (
            <div>
                <div className="demo-wrap">
                    <Table
                        defaultExpandAllRows
                        expandedRowRender={record => <p>this is the expandedRow of {record.key}</p>}
                        onExpand={(...args) => console.log('onExpand: ', ...args)}
                        dataSource={dataSource}
                        columns={columns}
                    />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>onRow - 设置行 props</summary>

```jsx
class Demo extends React.Component {
    render() {
        const dataSource = new Array(100).fill(null).map((v, i) => ({
            key: i,
            index: `index-${i}`
        }));
        const columns = new Array(5).fill(null).map((v, i) => ({
            title: `title-${i}`,
            key: `title-${i}`,
            width: 200,
            render: record => <span>content {record.index}</span>
        }));
        return (
            <div>
                <div className="demo-wrap">
                    <Table
                        expandedRowRender={record => <p>this is the expandedRow of {record.key}</p>}
                        defaultExpandedRowKeys={[1, 2]}
                        onRow={(...args) => ({
                            onClick: e => console.log(...args, e)
                        })}
                        dataSource={dataSource}
                        columns={columns}
                    />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>onHeaderRow - 设置表头 props</summary>

```jsx
class Demo extends React.Component {
    render() {
        const dataSource = new Array(100).fill(null).map((v, i) => ({
            key: i,
            index: `index-${i}`
        }));
        const columns = new Array(5).fill(null).map((v, i) => ({
            title: `title-${i}`,
            key: `title-${i}`,
            width: 200,
            render: record => <span>content {record.index}</span>
        }));
        return (
            <div>
                <div className="demo-wrap">
                    <Table
                        expandedRowRender={record => <p>this is the expandedRow of {record.key}</p>}
                        defaultExpandedRowKeys={[1, 2]}
                        onHeaderRow={(...args) => ({
                            onClick: e => console.log(...args, e)
                        })}
                        dataSource={dataSource}
                        columns={columns}
                    />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>rowSelection - 列选择配置</summary>

```jsx
class Demo extends React.Component {
    render() {
        const dataSource = new Array(100).fill(null).map((v, i) => ({
            key: i,
            index: `index-${i}`
        }));
        const columns = new Array(5).fill(null).map((v, i) => ({
            title: `title-${i}`,
            key: `title-${i}`,
            width: 200,
            render: record => <span>content {record.index}</span>
        }));
        return (
            <div>
                <div className="demo-wrap">
                    <Table
                        rowSelection={{
                            defaultSelectedRowKeys: [1, 2, 4, 5],
                            onChange: console.log,
                            getDisabledOfRow: record => record.key < 4
                        }}
                        dataSource={dataSource}
                        columns={columns}
                    />
                </div>
                <div className="demo-wrap">
                    <Table
                        rowSelection={{
                            multiple: false,
                            defaultSelectedRowKeys: [1],
                            onChange: console.log,
                            getDisabledOfRow: record => record.key < 4
                        }}
                        rowTooltip={record => {
                            return {
                                popup: <div>整行的提示：{record.index}</div>,
                                theme: 'dark'
                            };
                        }}
                        dataSource={dataSource}
                        columns={columns}
                    />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>dragSorting - 列选择配置</summary>

```jsx
const _dataSource = new Array(11).fill(null).map((v, i) => ({
    key: i,
    data: `data-${i}`
}));
const columns = new Array(5).fill(null).map((v, i) => ({
    title: `title-${i}`,
    key: `title-${i}`,
    width: 200,
    render: record => <span>content {record.data}</span>
}));

const Demo1 = () => {
    const [dataSource, setDataSource] = React.useState(() => [..._dataSource]);
    const handleDragSorting = React.useCallback((fromIndex, toIndex) => {
        console.log(fromIndex, toIndex);
        setDataSource(dataSource => {
            const nextDataSource = [...dataSource];
            nextDataSource.splice(toIndex, 0, ...nextDataSource.splice(fromIndex, 1));
            return nextDataSource;
        });
    }, []);

    return (
        <div>
            <div className="demo-wrap">
                <Table
                    dragSorting={{ onChange: handleDragSorting }}
                    dataSource={dataSource}
                    columns={columns}
                    pagination={null}
                    scroll={{ x: true }}
                />
            </div>
        </div>
    );
};

const columns2 = [
    {
        title: '序号',
        key: 'no',
        width: 100,
        fixed: true,
        render: (d, record, index) => {
            return index;
        }
    }
].concat(
    new Array(6).fill(null).map((v, i) => ({
        title: `title-${i}`,
        key: `title-${i}`,
        width: 200,
        render: record => <span>content {record.data}</span>
    }))
);

const Demo2 = () => {
    const [dataSource, setDataSource] = React.useState(() => [..._dataSource]);
    const handleDragSorting = React.useCallback((fromIndex, toIndex) => {
        console.log(fromIndex, toIndex);
        setDataSource(dataSource => {
            const nextDataSource = [...dataSource];
            nextDataSource.splice(toIndex, 0, ...nextDataSource.splice(fromIndex, 1));
            return nextDataSource;
        });
    }, []);

    return (
        <div>
            <div className="demo-wrap">
                <Table
                    dragSorting={{ onChange: handleDragSorting, fixed: true }}
                    dataSource={dataSource}
                    columns={columns2}
                    scroll={{ x: true, y: 200 }}
                    pagination={null}
                />
            </div>
        </div>
    );
};
const Demo = () => (
    <>
        <Demo1 />
        <Demo2 />
    </>
);
```

</details>

<details>
<summary>fixed - 固定表头、列</summary>

```jsx
const columns1 = [
    {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
        width: 100,
        fixed: true
    },
    {
        title: 'desc',
        dataIndex: 'desc',
        key: 'desc',
        width: 200,
        fixed: true
    },
    {
        title: 'name',
        dataIndex: 'name',
        key: 'name1',
        width: 100
    },
    {
        title: 'desc',
        dataIndex: 'desc',
        key: 'desc2',
        width: 300
    },
    {
        title: 'desc',
        dataIndex: 'desc',
        key: 'desc3',
        width: 100,
        fixed: true
    }
];
const columns2 = [
    {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
        width: 100
    },
    {
        title: 'desc',
        dataIndex: 'desc',
        key: 'desc',
        render: () => {
            return new Array(10).fill('vvvvvvv').join('');
        }
    },
    {
        title: 'name',
        dataIndex: 'name',
        key: 'name1',
        render: () => {
            return new Array(10).fill('vvvvvvv').join('');
        }
    },
    {
        title: 'desc',
        dataIndex: 'desc',
        key: 'desc2',
        render: () => {
            return new Array(10).fill('vvvvvvv').join('');
        }
    },
    {
        title: 'desc',
        dataIndex: 'desc',
        key: 'desc3',
        fixed: true
    }
];
let data = [];
data.length = 100;
data.fill({});
data = data.map((d, i) => ({
    key: i,
    name: `name-${i}`,
    desc: `desc-${i}`
}));

class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Table
                        columns={columns1}
                        dataSource={data}
                        rowSelection={{ fixed: true }}
                        columnPlaceholder
                        scroll={{ x: 2000, y: 300 }}
                    />
                </div>
                <div className="demo-wrap">
                    <Table
                        rowSelection={{ fixed: true }}
                        scroll={{ x: true }}
                        tableLayout="auto"
                        columns={columns2}
                        dataSource={data}
                        columnPlaceholder
                    />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>columnResizable - 可调表头大小</summary>

```jsx
class Demo1 extends React.Component {
    constructor(props) {
        super(props);
        const columns = new Array(6).fill(null).map((v, i) => {
            const onResize = w => this.handleResize(i, w);
            return {
                title: `title - ${i}`,
                key: `title-${i}`,
                width: 150,
                maxWidth: 300,
                minWidth: 50,
                onResize,
                render: record => <span>content {record.index}</span>
            };
        });
        if (props.fixed) {
            columns[0].fixed = true;
        }
        this.state = {
            columns
        };
    }
    handleResize(i, width) {
        const { columns } = this.state;
        columns[i].width = width;
        this.setState({
            columns
        });
    }
    render() {
        const dataSource = new Array(100).fill(null).map((v, i) => ({
            key: i,
            index: `index-${i}`
        }));
        const { columns } = this.state;
        return (
            <div>
                <div className="demo-wrap">
                    <Table
                        scroll={{
                            x: true,
                            y: this.props.y
                        }}
                        columnResizable
                        dataSource={dataSource}
                        columns={columns}
                        columnPlaceholder
                    />
                </div>
            </div>
        );
    }
}
Demo1.propTypes = { y: PropTypes.any, fixed: PropTypes.bool };
const Demo = () => {
    return (
        <>
            <Demo1 />
            <Demo1 y={300} fixed />
        </>
    );
};
```

</details>

<details>
<summary>列分组</summary>

```jsx
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'name',
                dataIndex: 'name',
                key: 'name',
                width: 100
            },
            {
                title: 'parent',
                key: 'parent',
                children: [
                    {
                        title: 'child1',
                        dataIndex: 'desc',
                        key: 'child1',
                        width: 200
                    },
                    {
                        title: 'child2',
                        dataIndex: 'desc',
                        key: 'child2',
                        width: 200
                    }
                ]
            },
            {
                title: 'desc',
                dataIndex: 'desc',
                key: 'desc',
                width: 200
            }
        ];
        let data = [];
        data.length = 100;
        data.fill({});
        data = data.map((d, i) => ({
            key: i,
            name: `name-${i}`,
            desc: `desc-${i}`
        }));
        this.state = {
            data
        };
    }

    render() {
        return <Table columns={this.columns} dataSource={this.state.data} />;
    }
}
```

</details>

<details>
<summary>子表格</summary>

```jsx
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'name',
                dataIndex: 'name',
                key: 'name',
                width: 200
            },
            {
                title: 'desc',
                dataIndex: 'desc',
                key: 'desc',
                width: 200
            },
            {
                title: 'name',
                dataIndex: 'name',
                key: 'name1',
                width: 100
            },
            {
                title: 'desc',
                dataIndex: 'desc',
                key: 'desc2'
            }
        ];
        let data = [];
        data.length = 100;
        data.fill({});
        data = data.map((d, i) => ({
            key: i,
            name: `name-${i}`,
            desc: `desc-${i}`,
            children: [1, 2, 3].map((d, j) => ({
                key: `${i}-${j}`,
                name: `name-${j}`,
                desc: `desc-${j}`,
                children: [1, 2, 3].map((d, k) => ({
                    key: `${i}-${j}-${k}`,
                    name: `name-${k}`,
                    desc: `desc-${k}`
                }))
            }))
        }));
        this.state = {
            data
        };
    }
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Table columns={this.columns} dataSource={this.state.data} />
                </div>
                <div className="demo-wrap">
                    <Table columns={this.columns} dataSource={this.state.data} expandIconAsCell />
                </div>
                <div className="demo-wrap">
                    <Table
                        columns={this.columns}
                        dataSource={this.state.data}
                        expandIconAsCell
                        rowSelection={{
                            defaultSelectedRowKeys: [1, 2, 4, 5],
                            onChange: console.log,
                            getDisabledOfRow: record => record.key < 4
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
<summary>子表格-复选框 父子联动</summary>

```jsx
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'name',
                dataIndex: 'name',
                key: 'name',
                width: 200
            },
            {
                title: 'desc',
                dataIndex: 'desc',
                key: 'desc',
                width: 200
            },
            {
                title: 'name',
                dataIndex: 'name',
                key: 'name1',
                width: 100
            },
            {
                title: 'desc',
                dataIndex: 'desc',
                key: 'desc2'
            }
        ];
        this.state = {
            data: []
        };
    }
    getData() {
        let data = [];
        data.length = 1;
        data.fill({});
        data = data.map((d, i) => ({
            key: i,
            name: `name-${i}`,
            desc: `desc-${i}`,
            children: [1, 2, 3].map((d, j) => ({
                key: `${i}-${j}`,
                name: `name-1-${j}`,
                desc: `desc-1-${j}`,
                children: [1, 2, 3].map((d, k) => ({
                    key: `${i}-${j}-${k}`,
                    name: `name-2-${k}`,
                    desc: `desc-2-${k}`
                }))
            }))
        }));

        this.setState({
            data
        });
    }
    componentDidMount() {
        this.getData();
    }
    render() {
        const { data } = this.state;

        return (
            <div>
                <div className="demo-wrap">
                    <Table
                        columns={this.columns}
                        dataSource={data}
                        expandIconAsCell
                        defaultExpandAllRows
                        rowSelection={{
                            linkage: true,
                            defaultSelectedRowKeys: [],
                            onChange: console.log,
                            getDisabledOfRow: record => ['0-1-2', '0-2'].includes(record.key)
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
<summary>子表格-复选框 父子联动 远程数据清除之前选择</summary>

```jsx
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            seleted: [],
            pagination: {
                total: 0
            }
        };
    }
    componentDidMount() {
        this.fetch({
            current: 1,
            pageSize: 10
        });
    }

    fetch(params) {
        console.log('params: ', params);
        const { current, pageSize } = params;
        this.setState({
            loading: true,
            pagination: {
                ...this.state.pagination,
                current,
                pageSize
            }
        });
        return new Promise(resolve => {
            const data = new Array(pageSize).fill(null).map((v, i) => ({
                index: i + (current - 1) * pageSize,
                children: [1, 2].map((d, j) => ({
                    index: i + (current - 1) * pageSize + '-' + j
                }))
            }));
            setTimeout(() => {
                resolve({
                    dataSource: data,
                    total: 101
                });
            }, 1000);
        }).then(result => {
            this.setState({
                loading: false,
                dataSource: result.dataSource,
                pagination: {
                    ...this.state.pagination,
                    total: result.total
                }
            });
        });
    }
    handlePaginationChange(current, pageSize) {
        this.fetch({
            current,
            pageSize
        });
    }
    render() {
        const { dataSource, pagination, loading, seleted } = this.state;
        const columns = new Array(5).fill(null).map((v, i) => ({
            title: `title-${i}`,
            key: `title-${i}`,
            width: 200,
            render: record => <span>content {record.index}</span>
        }));
        return (
            <div>
                <div className="demo-wrap">
                    <Loading loading={loading} tip="Loading ...">
                        <Table
                            pagination={null}
                            rowKey="index"
                            dataSource={dataSource}
                            scroll={{ y: 600 }}
                            columns={columns}
                            rowSelection={{
                                selectedRowKeys: seleted,
                                linkage: true,
                                defaultSelectedRowKeys: [],
                                resetSelected: true,
                                onChange: x => {
                                    console.log('onChange: ', x);

                                    this.setState({
                                        seleted: x
                                    });
                                }
                            }}
                            footer={() => (
                                <Pagination
                                    style={{ marginTop: 10, float: 'right' }}
                                    {...pagination}
                                    showSizeChanger
                                    size="sm"
                                    onChange={(...args) => this.handlePaginationChange(...args)}
                                    onPageSizeChange={(...args) => this.handlePaginationChange(...args)}
                                />
                            )}
                        />
                    </Loading>
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>onConditionChange - 由于 pagination 的某些设计，onConditionChange 返回值中不包含 pagination 变化，要监听 pagination 请使用 pagination 参数</summary>

```jsx
class Demo extends React.Component {
    render() {
        let data = [];
        data.length = 100;
        data.fill({});
        data = data.map((d, i) => ({
            key: i,
            name: `name-${i}`,
            desc: `desc-${i}`
        }));
        const columns = [
            {
                title: 'name',
                dataIndex: 'name',
                key: 'name',
                width: 100,
                filter: {
                    options: [1, 2, 3, 4]
                },
                order: true
            },
            {
                title: 'desc',
                dataIndex: 'desc',
                key: 'desc',
                width: 200,
                filter: {
                    options: [1, 2, 3, 4],
                    multiple: true
                },
                order: true
            }
        ];
        return (
            <div>
                <div className="demo-wrap">
                    <Table
                        onConditionChange={console.log}
                        title={() => {
                            return (
                                <div className="clear-fixed">
                                    <div style={{ float: 'right' }}>
                                        <Table.SearchInput style={{ marginRight: 8 }} />
                                    </div>
                                </div>
                            );
                        }}
                        dataSource={data}
                        columns={columns}
                    />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>doNotHandleCondition - 自行处理筛选等逻辑</summary>

```jsx
class Demo extends React.Component {
    render() {
        let data = [];
        data.length = 33;
        data.fill({});
        data = data.map((d, i) => ({
            key: i,
            name: `name-${i}`,
            desc: `desc-${i}`
        }));
        const columns = [
            {
                title: 'name',
                dataIndex: 'name',
                key: 'name',
                width: 100,
                filter: {
                    options: [1, 2, 3, 4]
                },
                order: true
            },
            {
                title: 'desc',
                dataIndex: 'desc',
                key: 'desc',
                width: 200,
                filter: {
                    options: [1, 2, 3, 4],
                    multiple: true
                },
                order: true
            }
        ];
        return (
            <div>
                <div className="demo-wrap">
                    <Table
                        onConditionChange={console.log}
                        doNotHandleCondition
                        title={() => {
                            return (
                                <div className="clear-fixed">
                                    <div style={{ float: 'right' }}>
                                        <Table.SearchInput style={{ marginRight: 8 }} />
                                    </div>
                                </div>
                            );
                        }}
                        dataSource={data}
                        columns={columns}
                    />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>远程加载数据</summary>

```jsx
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            pagination: {
                total: 0
            }
        };
    }
    componentDidMount() {
        this.fetch({
            current: 1,
            pageSize: 10
        });
    }

    fetch(params) {
        console.log('params: ', params);
        const { current, pageSize } = params;
        this.setState({
            loading: true,
            pagination: {
                ...this.state.pagination,
                current,
                pageSize
            }
        });
        return new Promise(resolve => {
            const data = new Array(pageSize).fill(null).map((v, i) => ({
                index: i + (current - 1) * pageSize
            }));
            setTimeout(() => {
                resolve({
                    dataSource: data,
                    total: 101
                });
            }, 1000);
        }).then(result => {
            this.setState({
                loading: false,
                dataSource: result.dataSource,
                pagination: {
                    ...this.state.pagination,
                    total: result.total
                }
            });
        });
    }
    handlePaginationChange(current, pageSize) {
        this.fetch({
            current,
            pageSize
        });
    }
    render() {
        const { dataSource, pagination, loading } = this.state;
        const columns = new Array(5).fill(null).map((v, i) => ({
            title: `title-${i}`,
            key: `title-${i}`,
            width: 200,
            render: record => <span>content {record.index}</span>
        }));
        return (
            <div>
                <div className="demo-wrap">
                    <Loading loading={loading} tip="Loading ...">
                        <Table
                            pagination={null}
                            rowKey="index"
                            dataSource={dataSource}
                            scroll={{ y: 600 }}
                            columns={columns}
                            footer={() => (
                                <Pagination
                                    style={{ marginTop: 10, float: 'right' }}
                                    {...pagination}
                                    showSizeChanger
                                    size="sm"
                                    onChange={(...args) => this.handlePaginationChange(...args)}
                                    onPageSizeChange={(...args) => this.handlePaginationChange(...args)}
                                />
                            )}
                        />
                    </Loading>
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>后端分页、搜索、筛选、排序</summary>

```jsx
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            pagination: {
                total: 0,
                current: 1,
                pageSize: 10,
                onChange: (...args) => this.handlePaginationChange(...args),
                onPageSizeChange: (...args) => this.handlePaginationChange(...args)
            }
        };
    }
    componentDidMount() {
        this.fetch();
    }

    fetch() {
        const {
            order,
            filters,
            searchValue,
            pagination: { current, pageSize }
        } = this.state;

        const params = {
            Order: order,
            Filters: _.map(filters, filter => {
                return {
                    Key: filter.key,
                    Option: filter.value
                };
            }),
            Search: searchValue,
            Current: current,
            Limit: pageSize
        };
        console.log('params: ', params);
        this.setState({
            loading: true
        });
        return new Promise(resolve => {
            const data = new Array(pageSize).fill(null).map((v, i) => {
                const index = i + (current - 1) * pageSize;
                return {
                    index,
                    name: `name - ${index}`,
                    describe: `describe - ${index}`,
                    random: (Math.random() * 1000) | 0
                };
            });
            setTimeout(() => {
                resolve({
                    dataSource: data,
                    total: 1001
                });
            }, 1000);
        }).then(result => {
            this.setState({
                loading: false,
                dataSource: result.dataSource,
                pagination: {
                    ...this.state.pagination,
                    total: result.total
                }
            });
        });
    }
    handlePaginationChange(current, pageSize) {
        this.setState(
            {
                pagination: { ...this.state.pagination, current, pageSize }
            },
            () => {
                this.fetch();
            }
        );
    }
    handleConditionChange(condition) {
        this.setState(
            {
                ...condition
            },
            () => {
                this.fetch();
            }
        );
    }
    render() {
        const { dataSource, pagination, loading } = this.state;

        const columns = [
            {
                title: 'name',
                dataIndex: 'name',
                key: 'name',
                width: 100,
                filter: {
                    options: [1, 2, 3, 4]
                },
                order: true
            },
            {
                title: 'describe',
                dataIndex: 'describe',
                key: 'describe',
                width: 200,
                filter: {
                    options: [1, 2, 3, 4],
                    multiple: true
                },
                order: true
            },
            {
                title: 'random',
                key: 'random',
                dataIndex: 'random'
            }
        ];
        return (
            <div>
                <div className="demo-wrap">
                    <Loading loading={loading} tip="Loading ...">
                        <Table
                            title={() => {
                                return (
                                    <div className="clear-fixed">
                                        <div style={{ float: 'right' }}>
                                            <Table.SearchInput style={{ marginRight: 8 }} />
                                        </div>
                                    </div>
                                );
                            }}
                            pagination={pagination}
                            rowKey="index"
                            dataSource={dataSource}
                            scroll={{ y: 600 }}
                            columns={columns}
                            onConditionChange={condition => {
                                console.log(condition);
                                this.handleConditionChange(condition);
                            }}
                            doNotHandleCondition
                        />
                    </Loading>
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>popupContainer - 弹出层容器</summary>

```jsx
const dataSource = [{ key: 'key', name: 'test' }];
const columns = [
    () => (
        <Popover
            forwardPopupContainer
            popup={<div style={{ background: '#ccc', width: 300, height: 300, padding: 20 }}>This is the popup</div>}
        >
            <div style={{ background: '#e1e6f0', height: 50, padding: 10 }}>This is the content</div>
        </Popover>
    ),
    () => <Select options={new Array(100).fill(null).map((v, i) => ({ value: i, label: `option-${i}` }))} />,
    () => <DatePicker />,
    () => <DatePicker type="month" />,
    record => (
        <Table.ActionList
            exposeCount={1}
            actionList={new Array(10).fill(null).map((v, i) => ({
                label: `Action ${i}`,
                onClick: e => console.log('action', i, record, e)
            }))}
        />
    )
].map((render, i) => ({
    title: `title-${i}`,
    key: `title-${i}`,
    width: 300,
    filter: {
        options: [1, 2, 3, 4]
    },
    render
}));
const Demo = () => (
    <div>
        <h3>Table 提供了内置的 getPopupContainer</h3>
        <div className="demo-wrap">
            <Table dataSource={dataSource} columns={columns} scroll={{ x: true }} />
        </div>
        <h3>Table 嵌套在卡片中，容器会转移至卡片的容器</h3>
        <div className="demo-wrap">
            <Card>
                <Table dataSource={dataSource} columns={columns} scroll={{ x: true }} />
            </Card>
        </div>
    </div>
);
```

</details>

<details>
<summary>单元格合并</summary>

```jsx
class Demo extends React.Component {
    render() {
        const dataSource = new Array(20).fill(null).map((v, i) => ({
            key: i,
            'index-0': `index-${i}`,
            'index-1': `index-${i}`,
            'index-2': `index-${i}`,
            'index-3': `index-${i}`,
            'index-4': `index-${i}`,
            'index-5': `index-${i}`
        }));
        const columns = [
            {
                title: 'title-0',
                dataIndex: 'index-0',
                width: 100,
                colSpan: 2,
                align: 'center',
                key: 'index-0',
                render: (text, record) => {
                    let rowSpan = 0;
                    const { key } = record || {};
                    if (key && key % 2 === 0) {
                        rowSpan = 2;
                    }
                    return {
                        children: text,
                        props: {
                            rowSpan
                        }
                    };
                }
            },
            {
                title: 'title-1',
                dataIndex: 'index-1',
                key: 'index-1',
                width: 100,
                colSpan: 0,
                align: 'center'
            },
            {
                title: 'title-2',
                dataIndex: 'index-2',
                key: 'index-2',
                width: 100,
                align: 'center'
            },
            {
                title: 'title-3',
                dataIndex: 'index-3',
                key: 'index-3',
                width: 100,
                align: 'center',
                render: (text, record) => {
                    const { key } = record || {};
                    if ((key + 1) % 5 === 0) {
                        return {
                            children: text,
                            props: {
                                colSpan: 2
                            }
                        };
                    }
                    return text;
                }
            },
            {
                title: 'title-4',
                dataIndex: 'index-4',
                key: 'index-4',
                width: 100,
                align: 'center',
                render: (text, record) => {
                    const { key } = record || {};
                    if ((key + 1) % 5 === 0) {
                        return {
                            children: text,
                            props: {
                                colSpan: 0
                            }
                        };
                    }
                    return text;
                }
            },
            {
                title: 'title-5',
                dataIndex: 'index-5',
                key: 'index-5',
                width: 100,
                align: 'center'
            }
        ];
        return (
            <div>
                <div className="demo-wrap">
                    <Table dataSource={dataSource} columns={columns} />
                </div>
                <div className="demo-wrap">
                    <Table dataSource={[{ key: 0, 'index-1': 1 }, undefined]} columns={columns} />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>demo - 样例演示</summary>

```jsx
const randomString = () => {
    return new Array((Math.random() * 100) | 0).fill('v').join('');
};
const columns1 = [
    {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
        render: () => randomString()
    },
    {
        title: 'desc',
        dataIndex: 'desc',
        key: 'desc',
        render: () => randomString()
    },
    {
        title: 'name',
        dataIndex: 'name',
        key: 'name1',
        render: () => randomString()
    },
    {
        title: 'desc',
        dataIndex: 'desc',
        key: 'desc2',
        render: () => randomString()
    },
    {
        title: 'desc',
        dataIndex: 'desc',
        key: 'desc3',
        render() {
            return <div style={{ width: 1000 }}>{randomString()}</div>;
        }
    }
];
const columns2 = [
    {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
        width: 200,
        render: () => randomString()
    },
    {
        title: 'desc',
        dataIndex: 'desc',
        key: 'desc',
        width: 200,
        render: () => randomString()
    },
    {
        title: 'name',
        dataIndex: 'name',
        key: 'name1',
        width: 200,
        render: () => randomString()
    },
    {
        title: 'desc',
        dataIndex: 'desc',
        key: 'desc2',
        width: 400,
        render: () => randomString()
    },
    {
        title: 'desc',
        dataIndex: 'desc',
        key: 'desc3',
        width: 100,
        render: () => randomString()
    }
];
const columns3 = [
    {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
        width: 200,
        render: () => randomString()
    },
    {
        title: 'desc',
        dataIndex: 'desc',
        key: 'desc',
        width: 200,
        render: () => randomString()
    },
    {
        title: 'name',
        dataIndex: 'name',
        key: 'name1',
        width: 200,
        render: () => randomString()
    },
    {
        title: 'desc',
        dataIndex: 'desc',
        key: 'desc2',
        width: 400,
        render: () => randomString()
    },
    {
        title: 'desc',
        dataIndex: 'desc',
        key: 'desc3',
        render: () => randomString()
    }
];
let data = [];
data.length = 100;
data.fill({});
data = data.map((d, i) => ({
    key: i,
    name: `name-${i}`,
    desc: `desc-${i}`
}));

class Demo extends React.Component {
    render() {
        return (
            <div>
                <h3>简单滚动布局</h3>
                <p>
                    表格宽度按照内容撑开展示，超过最大宽度可滚动，不需要设置列宽度比较方便，但是翻页时由于数据的不一致性表列宽度会变化，并且如果使用了
                    scroll.y，可能会导致头部和数据宽度不一致
                </p>
                <div className="demo-wrap">
                    <Table columns={columns1} dataSource={data} scroll={{ x: true }} tableLayout="auto" />
                </div>
                <h3>复杂滚动布局</h3>
                <p>
                    当表格需要上下滚动时，默认会启用 tableLayout fixed 固定表格宽度
                    <br />
                    可以使用固定的 scroll.x true 和 column.width（每个列都必须提供） 来保证表头和表格数据的宽度一致性
                </p>
                <div className="demo-wrap">
                    <Table columns={columns2} dataSource={data} scroll={{ x: true, y: 200 }} />
                </div>
                <p>
                    或者提供具体的 scroll.x，其中一列的宽度可以不设置将会根据剩余的宽度展示，不过注意 x 的值不能小于
                    width 的总和，否则不设宽度列会被压缩
                </p>
                <div className="demo-wrap">
                    <Table columns={columns3} dataSource={data} scroll={{ x: 1200, y: 200 }} />
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
