---
name: cpn-basic-upload
description: 帮助 AI 正确使用 UDesign Upload 组件（传入其它原生的 props 会自动附加到最外层的 div 上，如 style、className 等）。当需要使用 Upload 时加载此技能。
---


# 使用 Upload 组件

<!-- MANUAL_START: overview -->
## 技能概述

传入其它原生的 props 会自动附加到最外层的 div 上，如 style、className 等
是否受控由一开始是否传入 fileList 决定，如果想要受控但是一开始未传入可能会导致逻辑性的错误。受控情况下需要自行处理所有数据。
选择文件的事件触发顺序为 打开文件选择框 - 选择文件 - 检查文件类型（有错误会中断，触发 onError） - 检查文件大小（有错误会中断，触发 onError） - 调用 onAdd（没有则跳过，返回 false 则中断） - 检查文件数量（有错误会中断，触发 onError） - 更新文件列表并触发 onChange - 有 handleUpload 时开始更新文件 status 为 uploading 并开始上传文件，触发 onChange - 文件上传进度更新时可调用 handleProcess，更新进度，更新后会触发 onChange - 文件上传成功或失败时更新文件 status 并触发 onChange
单选时选中文件将会直接将已有文件替换
单选时在调用 onAdd 之前如已存在选择文件将会先调用 onRemove 检查可否移除已有文件，只有两个都通过时才会触发 onChange
单选时不会触发文件数量错误，
<!-- MANUAL_END: overview -->

## 使用指南

<!-- AUTO_START: import -->
### 引入方式

```jsx
import { Upload } from '@ucloud-fe/react-components';
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
    <Upload
        onChange={fileList => console.log(fileList)}
        onError={({ message, name }) => alert(`there is an error of ${name}: ${message}`)}
        multiple
    />
);
```
<!-- AUTO_END: basic-usage -->

<!-- AUTO_START: props-table -->
### API 参数

| 属性 | 类型 | 默认值 | 必填 | 说明 |
|------|------|--------|------|------|
| onChange | `unknown` | `() => {}` | - | 文件列表变化时的回调，如新增、删除、上传、上传完成、进度更新等操作 |
| onAdd | `unknown` | `() => {}` | - | 正在添加文件时的回调，可通过返回值控制添加行为 |
| onRemove | `unknown` | `() => {}` | - | 正在删除文件时的回调，可通过返回值控制添加行为 |
| getRemovableOfItem | `unknown` | - | - | 自定义文件是否可删除，默认为 loading 时不可删除，如果需要都可删除可直接传入 () => true |
| onError | `unknown` | - | - | 选中或读取文件错误回调，自定义错误处理，不传时默认行为会在报错时拦截文件进入列表并弹窗提示用户 |
| onPreview | `unknown` | - | - | 预览操作，自定义预览操作，不传时默认为对图片可进行预览，点击会在新窗口打开图片，需要关闭默认行为可使用 null |
| getPreviewableOfItem | `unknown` | - | - | 自定义预览操作时每个文件都会调用预览，可以使用这个函数来过滤不想出现预览的文件 |
| handleUpload | `unknown` | - | - | 定义上传操作，受控组件中不起作用请自行处理
应交互需求，上传中某些样式下会有进度条，需要调用 handleProgress 来更新进度，如果不调用，将会出现一个假的进度条，😂 |
| disabled | `unknown` | - | - | 是否禁用 |
| multiple | `unknown` | - | - | 是否可以多选 |
| accept | `unknown` | - | - | 可接受的文件类型, MIME
[input accept](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) |
| maxSize | `unknown` | - | - | 文件大小限制 |
| maxCount | `unknown` | - | - | 文件数量限制 |
| selector | `unknown` | - | - | 自定义选择控件，为 null 时隐藏 |
| listType | `unknown` | `'list'` | - | 文件列表展示类型，格式为 'list' | ['list', 'card'] | ['dropzone', 'thumbnail']
none - 隐藏文件列表
text - 展示文件名称列表
list - 普通列表形式，可通过第二个参数设置 thumbnail 和 card
dropzone - 拖拽上传区域，可通过第二个参数设置 thumbnail 和 card |
| defaultFileList | `unknown` | - | - | 默认文件列表，非受控组件使用，初始化时才有效 |
| fileList | `unknown` | - | - | 文件列表，传入后变为受控组件 |
| customStyle | `unknown` | - | - | 自定义样式 |
| className | `unknown` | - | - |  |
| locale | `unknown` | - | - |  |
<!-- AUTO_END: props-table -->



<!-- AUTO_START: demos -->
### 全部 Demo

<details>
<summary>演示</summary>

```jsx
const { readFile } = Upload;
const handlePreview = file => {
    if (file.type.split('/')[0] === 'image') {
        readFile(file)
            .then(url => {
                Modal.alert(
                    {
                        title: '预览',
                        size: 'md'
                    },
                    <div style={{ textAlign: 'center' }}>
                        <img src={url} width={500} />
                    </div>
                );
            })
            .catch(e => {
                alert(e);
            });
    }
};
const handleError = error => {
    alert(`报错了：${error}`);
    console.error(error);
};
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            multiple: true,
            listType: 'list',
            listTypeOption: null
        };
    }
    render() {
        const {
            disableAdd,
            disableRemove,
            multiple,
            customPreview,
            customErrorHandle,
            disabled,
            onlyAcceptImage,
            maxSize,
            maxCount,
            customSelector,
            listType,
            listTypeOption
        } = this.state;
        const itemLayout = {
            labelCol: {
                span: 3
            },
            controllerCol: {
                span: 9
            }
        };
        const props = {
            multiple,
            disabled,
            listType
        };
        if (listTypeOption) {
            props.listType = [props.listType, listTypeOption];
        }
        if (disableAdd) {
            props.onAdd = () => false;
        }
        if (disableRemove) {
            props.onRemove = () => false;
        }
        if (customPreview) {
            props.onPreview = handlePreview;
        }
        if (customErrorHandle) {
            props.onError = handleError;
        }
        if (onlyAcceptImage) {
            props.accept = 'image/*';
        }
        if (maxSize) {
            props.maxSize = 1024 * 100;
        }
        if (maxCount) {
            props.maxCount = 3;
        }
        if (customSelector) {
            props.selector = <div>点我选文件</div>;
        }
        return (
            <div>
                <Form className="demo-form">
                    <Form.Item label="disableAdd" {...itemLayout}>
                        <Switch checked={disableAdd} onChange={disableAdd => this.setState({ disableAdd })} />
                    </Form.Item>
                    <Form.Item label="disableRemove" {...itemLayout}>
                        <Switch checked={disableRemove} onChange={disableRemove => this.setState({ disableRemove })} />
                    </Form.Item>
                    <Form.Item label="multiple" {...itemLayout}>
                        <Switch checked={multiple} onChange={multiple => this.setState({ multiple })} />
                    </Form.Item>
                    <Form.Item label="disabled" {...itemLayout}>
                        <Switch checked={disabled} onChange={disabled => this.setState({ disabled })} />
                    </Form.Item>
                    <Form.Item label="listType" {...itemLayout}>
                        <Radio.Group
                            value={listType}
                            options={['none', 'text', 'list', 'dropzone'].map(v => ({ value: v, label: v }))}
                            onChange={listType => this.setState({ listType })}
                        />
                    </Form.Item>
                    <Form.Item label="listTypeOption" {...itemLayout}>
                        <Radio.Group
                            value={listTypeOption}
                            options={[
                                { value: null, label: 'null' },
                                { value: 'thumbnail', label: 'thumbnail' },
                                { value: 'card', label: 'card' }
                            ]}
                            onChange={listTypeOption => this.setState({ listTypeOption })}
                        />
                    </Form.Item>
                    <Form.Item label="customPreview" {...itemLayout}>
                        <Switch checked={customPreview} onChange={customPreview => this.setState({ customPreview })} />
                    </Form.Item>
                    <Form.Item label="customErrorHandle" {...itemLayout}>
                        <Switch
                            checked={customErrorHandle}
                            onChange={customErrorHandle => this.setState({ customErrorHandle })}
                        />
                    </Form.Item>
                    <Form.Item label="onlyAcceptImage" {...itemLayout}>
                        <Switch
                            checked={onlyAcceptImage}
                            onChange={onlyAcceptImage => this.setState({ onlyAcceptImage })}
                        />
                    </Form.Item>
                    <Form.Item label="maxSize" {...itemLayout}>
                        <Switch checked={maxSize} onChange={maxSize => this.setState({ maxSize })} />
                    </Form.Item>
                    <Form.Item label="maxCount" {...itemLayout}>
                        <Switch checked={maxCount} onChange={maxCount => this.setState({ maxCount })} />
                    </Form.Item>
                    <Form.Item label="customSelector" {...itemLayout}>
                        <Switch
                            checked={customSelector}
                            onChange={customSelector => this.setState({ customSelector })}
                        />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Upload {...props} onChange={console.log} />
                </div>
            </div>
        );
    }
}
```

</details>

<details>
<summary>简单使用</summary>

```jsx
const Demo = () => (
    <Upload
        onChange={fileList => console.log(fileList)}
        onError={({ message, name }) => alert(`there is an error of ${name}: ${message}`)}
        multiple
    />
);
```

</details>

<details>
<summary>multiple: true - 支持多选</summary>

```jsx
const Demo = () => (
    <Upload
        onChange={fileList => console.log(fileList)}
        onError={({ message, name }) => alert(`there is an error of ${name}: ${message}`)}
        multiple
    />
);
```

</details>

<details>
<summary>multiple: false - 支持单选</summary>

```jsx
const Demo = () => (
    <Upload
        onChange={fileList => console.log(fileList)}
        onError={({ message, name }) => alert(`there is an error of ${name}: ${message}`)}
        onRemove={console.log}
        onAdd={console.log}
        multiple={false}
    />
);
```

</details>

<details>
<summary>maxCount - 限制文件数量</summary>

```jsx
const Demo = () => (
    <Upload
        onChange={fileList => console.log(fileList)}
        onError={({ message, name }) => alert(`there is an error of ${name}: ${message}`)}
        multiple
        maxCount={3}
    />
);
```

</details>

<details>
<summary>maxSize - 限制文件大小</summary>

```jsx
const Demo = () => (
    <Upload
        onChange={fileList => console.log(fileList)}
        onError={({ message, name }) => alert(`there is an error of ${name}: ${message}`)}
        maxSize={1024 * 1024}
        multiple
    />
);
```

</details>

<details>
<summary>accept - 限制文件类型</summary>

```jsx
const Demo = () => (
    <Upload
        onChange={fileList => console.log(fileList)}
        onError={({ message, name }) => alert(`there is an error of ${name}: ${message}`)}
        accept="image/* , .pdf"
        multiple
    />
);
```

</details>

<details>
<summary>disabled - 禁用</summary>

```jsx
const Demo = () => (
    <Upload
        onChange={fileList => console.log(fileList)}
        onError={({ message, name }) => alert(`there is an error of ${name}: ${message}`)}
        disabled
        multiple
    />
);
```

</details>

<details>
<summary>onAdd - 控制文件添加</summary>

```jsx
const Demo = () => (
    <Upload
        onChange={fileList => console.log(fileList)}
        onAdd={files => {
            console.log(files);
            if (files.length < 2) {
                alert('一次至少两个我才让你加');
                return false;
            } else if (files.length > 4) {
                alert('一次传超过4个我也不让你加');
                return false;
            }
        }}
        onError={({ message, name }) => alert(`there is an error of ${name}: ${message}`)}
        multiple
    />
);
```

</details>

<details>
<summary>onRemove - 控制文件删除</summary>

```jsx
const Demo = () => (
    <Upload
        onChange={fileList => console.log(fileList)}
        onRemove={(file, index) => {
            console.log(file, index);
            if (index === 0) {
                alert('这个文件我喜欢，你不能删');
                return false;
            }
        }}
        onError={({ message, name }) => alert(`there is an error of ${name}: ${message}`)}
        multiple
    />
);
```

</details>

<details>
<summary>onPreview - 自定义文件预览</summary>

```jsx
const { readFile } = Upload;
const handlePreview = file => {
    if (file.type.split('/')[0] === 'image') {
        readFile(file)
            .then(url => {
                Modal.alert(
                    {
                        title: '预览',
                        size: 'md'
                    },
                    <div style={{ textAlign: 'center' }}>
                        <img src={url} width={500} />
                    </div>
                );
            })
            .catch(e => {
                alert(e);
            });
    } else {
        Modal.alert(
            {
                title: '预览',
                size: 'md'
            },
            <div style={{ textAlign: 'center' }}>
                <div>类型{file.type}</div>
                <div>名称{file.name}</div>
            </div>
        );
    }
};
const Demo = () => <Upload onChange={fileList => console.log(fileList)} onPreview={handlePreview} multiple />;
```

</details>

<details>
<summary>selector - 自定义选择控件</summary>

```jsx
const Demo = () => (
    <div>
        <div className="demo-wrap">
            <h3>自定义控件</h3>
            <Upload onChange={fileList => console.log(fileList)} selector={<button>点我点我选</button>} multiple />
        </div>
        <div className="demo-wrap">
            <h3>隐藏控件</h3>
            <Upload listType="dropzone" onChange={fileList => console.log(fileList)} selector={null} multiple />
        </div>
    </div>
);
```

</details>

<details>
<summary>listType - 隐藏文件列表</summary>

```jsx
const Demo = () => (
    <Upload
        onChange={fileList => console.log(fileList)}
        onError={({ message, name }) => alert(`there is an error of ${name}: ${message}`)}
        listType="none"
        multiple
    />
);
```

</details>

<details>
<summary>defaultFileList - 默认文件列表</summary>

```jsx
const defaultFileList = [
    {
        name: 'defaultFile1',
        uid: 'file_1'
    },
    {
        name: 'defaultFile2',
        uid: 'file_2'
    },
    {
        name: 'defaultFile3',
        uid: 'file_3'
    },
    {
        name: 'defaultFile4',
        uid: 'file_4'
    }
];
const Demo = () => (
    <Upload
        onChange={fileList => console.log(fileList)}
        onError={({ message, name }) => alert(`there is an error of ${name}: ${message}`)}
        defaultFileList={defaultFileList}
        multiple
    />
);
```

</details>

<details>
<summary>handleUpload - 上传</summary>

```jsx
const handleUpload = (file, updateProgress, needProgress = true) => {
    console.log(file);
    needProgress && updateProgress(0);
    var formData = new FormData();
    formData.append('image', file);
    return axios.post('https://api.imgur.com/3/image', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: Math.random() > 0.5 && 'Client-ID e147a4591b6996f'
        },
        onUploadProgress:
            needProgress &&
            function (progressEvent) {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log(percentCompleted, progressEvent);
                updateProgress(percentCompleted);
            }
    });
};
const Demo = () => (
    <div>
        <div className="demo-wrap">
            <h3>可尝试上传文件看看效果，为了模拟会随机出现报错</h3>
            <Upload
                onChange={fileList => console.log(fileList.map(file => file.status))}
                onError={({ message, name }) => alert(`there is an error of ${name}: ${message}`)}
                handleUpload={handleUpload}
                multiple
                accept="image/*"
                listType={['list', 'thumbnail']}
            />
        </div>
        <div className="demo-wrap">
            <h3>这里是没有上报进度时的效果，会有个虚假的进度条，😂</h3>
            <Upload
                onChange={fileList => console.log(fileList.map(file => file.status))}
                onError={({ message, name }) => alert(`there is an error of ${name}: ${message}`)}
                handleUpload={(...args) => handleUpload(...args, false)}
                multiple
                accept="image/*"
                listType={['list', 'thumbnail']}
            />
        </div>
    </div>
);
```

</details>

<details>
<summary>fileList - 受控组件</summary>

```jsx
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: [
                {
                    name: 'file1',
                    uid: 'file_1'
                },
                {
                    name: 'file2',
                    uid: 'file_2'
                }
            ],
            count: 0
        };
    }
    render() {
        const { state } = this;
        return (
            <Upload
                onChange={fileList => {
                    console.log(fileList);
                    if (state.count % 2 !== 0) {
                        this.setState(
                            {
                                fileList,
                                count: ++state.count
                            },
                            alert('这次更改我接受')
                        );
                    } else {
                        this.setState(
                            {
                                count: ++state.count
                            },
                            alert('这次更改我不接受')
                        );
                    }
                }}
                multiple
                onError={({ message, name }) => alert(`there is an error of ${name}: ${message}`)}
                fileList={state.fileList}
            />
        );
    }
}
```

</details>

<details>
<summary>案例展示</summary>

```jsx
const handleUpload = (file, updateProgress, needProgress = true) => {
    console.log(file);
    needProgress && updateProgress(0);
    var formData = new FormData();
    formData.append('image', file);
    return axios
        .post('https://api.imgur.com/3/image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Client-ID e147a4591b6996f'
            },
            onUploadProgress:
                needProgress &&
                function (progressEvent) {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    console.log(percentCompleted, progressEvent);
                    updateProgress(percentCompleted);
                }
        })
        .then(data => {
            file.url = data.data.data.link;
        });
};
const handleUpload2 = file => {
    var formData = new FormData();
    formData.append('image', file);
    return axios
        .post('https://api.imgur.com/3/image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Client-ID e147a4591b6996f'
            }
        })
        .then(data => {
            return {
                name: file.name,
                url: data.data.data.link
            };
        });
};
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList1: [],
            fileList2: [],
            loading: false
        };
    }
    onConfirm1() {
        for (let i = 0; i < this.state.fileList1.length; i++) {
            const file = this.state.fileList1[i];
            if (file.status !== 'success') {
                console.log(file, 'not ready');
                return;
            }
        }
        const files = this.state.fileList1.map(file => ({
            url: file.url,
            name: file.name
        }));
        console.log(files);
    }
    onConfirm2() {
        const files = this.state.fileList2;
        this.setState({
            loading: true
        });
        Promise.all(
            files.map(file => {
                return handleUpload2(file, null, false);
            })
        ).then(files => {
            this.setState({
                loading: false
            });
            console.log(files);
        });
    }
    render() {
        const { loading } = this.state;
        return (
            <div>
                <div className="demo-wrap">
                    <h3>上传完成后点击 完成 按钮查看结果</h3>
                    <Upload
                        onChange={fileList => {
                            this.setState({
                                fileList1: fileList
                            });
                        }}
                        handleUpload={handleUpload}
                        multiple
                        accept="image/*"
                        listType={['list', 'thumbnail']}
                    />
                    <Button onClick={() => this.onConfirm1()}>submit</Button>
                </div>
                <Loading loading={loading}>
                    <div className="demo-wrap">
                        <h3>点击按钮后开始上传</h3>
                        <Upload
                            onChange={fileList => {
                                this.setState({
                                    fileList2: fileList
                                });
                            }}
                            multiple
                            accept="image/*"
                            listType={['list', 'thumbnail']}
                        />
                        <Button onClick={() => this.onConfirm2()}>upload</Button>
                    </div>
                </Loading>
            </div>
        );
    }
}
```

</details>

<details>
<summary>ui - UI 展示列表</summary>

```jsx
const gif = {
    uid: 'gif',
    name: 'gif.gif',
    thumbnailUrl: 'https://i.imgur.com/d9oUfhA.gif',
    url: 'https://i.imgur.com/d9oUfhA.gif'
};
const png = {
    uid: 'png',
    name: 'png.png',
    thumbnailUrl: 'https://i.imgur.com/Pqxezi8.png',
    url: 'https://i.imgur.com/Pqxezi8.png'
};
const jpg = {
    uid: 'jpg',
    name: 'jpg.jpg',
    thumbnailUrl: 'https://i.imgur.com/PfPOQBe.jpg',
    url: 'https://i.imgur.com/PfPOQBe.jpg'
};
const image = {
    uid: 'image',
    name: 'image',
    type: 'image/png'
};
const text = {
    uid: 'text',
    name: 'text.text',
    type: 'text/text'
};
const pdf = {
    uid: 'pdf',
    name: 'pdf.pdf',
    type: 'application/pdf'
};
const word = {
    uid: 'msword',
    name: 'word.doc',
    type: 'application/msword'
};
const zip = {
    uid: 'zip',
    name: 'zip.zip',
    type: 'application/zip'
};
const rar = {
    uid: 'rar',
    name: 'rar.rar',
    type: 'application/x-rar'
};
const gzip = {
    uid: 'gzip',
    name: 'gzip.gzip',
    type: 'application/gzip'
};
const unknown = {
    uid: 'unknown',
    name: 'unknown',
    type: 'unknown'
};
const error = {
    uid: 'error',
    name: 'error',
    type: 'image/png',
    status: 'error',
    error: new Error('Upload fail')
};
const uploading = {
    uid: 'uploading',
    name: 'uploading',
    type: 'image/png',
    status: 'uploading'
};
const progress = {
    uid: 'progress',
    name: 'progress',
    type: 'image/png',
    status: 'uploading',
    progress: 50
};
const overflowName = {
    uid: 'overflow-name',
    name:
        'very loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong name',
    type: 'image/png'
};
const overflowError = {
    uid: 'overflow-error',
    name: 'overflow-error',
    type: 'image/png',
    status: 'error',
    error: new Error(
        'very loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong error name'
    )
};
const Demo = () => (
    <div>
        {[
            'list',
            ['list', 'thumbnail'],
            ['list', 'card'],
            'dropzone',
            ['dropzone', 'thumbnail'],
            ['dropzone', 'card']
        ].map(listType => {
            return (
                <div key={listType + ''}>
                    <h2>list-type: {JSON.stringify(listType)}</h2>
                    <div>
                        <h3>无文件状态</h3>
                        <div className="demo-wrap">
                            <Upload listType={listType} fileList={[]} />
                        </div>
                    </div>
                    <div>
                        <h3>单文件状态</h3>
                        <div className="demo-wrap">
                            <Upload listType={listType} fileList={[gif]} />
                        </div>
                    </div>
                    <div>
                        <h3>多文件状态</h3>
                        <div className="demo-wrap">
                            <Upload
                                listType={listType}
                                fileList={[
                                    gif,
                                    png,
                                    jpg,
                                    image,
                                    text,
                                    pdf,
                                    word,
                                    zip,
                                    rar,
                                    gzip,
                                    unknown,
                                    error,
                                    uploading,
                                    progress,
                                    overflowName,
                                    overflowError
                                ]}
                            />
                        </div>
                    </div>
                </div>
            );
        })}
    </div>
);
```

</details>

<details>
<summary>提供读取文件 dataUrl 的工具函数</summary>

```jsx
const { readFile } = Upload;
const handleOnAdd = fileList => {
    fileList.forEach(file => {
        readFile(file)
            .then(dataUrl => {
                console.log(dataUrl);
            })
            .catch(e => {
                console.log(e);
            });
    });
};
const Demo = () => (
    <Upload
        onChange={fileList => console.log(fileList)}
        onAdd={handleOnAdd}
        onError={({ message, name }) => alert(`there is an error of ${name}: ${message}`)}
        multiple
    />
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
