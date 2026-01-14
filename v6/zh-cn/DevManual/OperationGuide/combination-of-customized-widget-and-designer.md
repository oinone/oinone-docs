---
title: 自定义组件与设计器结合
index: true
category:
  - 研发手册
  - 操作指南
order: 7
prev:
  text: 组件暗黑主题变量
  link: /zh-cn/DevManual/OperationGuide/CustomizeThemes/dark-themes.md
next:
  text: 模块 API（Module API）
  link: /zh-cn/DevManual/Reference/Back-EndFramework/module-API.md
---
在 Oinone 提供的 `界面设计器` 中，可以自由的对组件进行切换，包括视图组件、布局组件、字段组件这三类。

在之前章节的学习中，我们对组件的切换已经不陌生了。在 [自定义字段](/zh-cn/DevManual/OperationGuide/customize-a-field-widget.md) 章节，我们通过组件注册的方式将 `FormBooleanSwitchFieldWidget` 组件替换为 `FormCustomSwitchFieldWidget` 组件。在 [自定义视图](/zh-cn/DevManual/OperationGuide/customize-a-view-widget.md) 章节，我们通过注册 `布局（Layout）` 的方式将 `TableWidget` 组件替换为 `CustomTableWidget` 组件。

接下来，我们将学习如何通过 `界面设计器` 提供的功能，如何在不使用上述两种方式的情况下完成组件的替换。这是非常有意义的。

# 一、使用扩展配置替换组件

回想一下我们在 “[Create a gantt view](/zh-cn/DevManual/Tutorials/MasterTheFront-endFramework/chapter2-create-a-gantt-view.md)” 章节中创建的 `甘特图` 组件。试想一下，如果我们可以在 `界面设计器` 中将表格切换为 `甘特图` ，并配置一些组件所必须的属性，就可以让这个表格视图以 `甘特图` 的样子展示在页面中。

让我们来看之前甘特图使用过的表格页面，它在设计器中看起来可能是这样的：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/OperationGuide/component-with-designer/gantt.png)

选中表格组件，在右侧属性面板中有 `扩展配置` 分组，里面有两个可以配置的属性：`组件API名称` 和 `扩展属性`。

+ 组件API名称：在组件注册时使用的 `widget` 属性。
+ 扩展属性：可以通过 `this.getDsl()` 获取属性值。

让我们把之前注册的甘特图组件对应的 `widget="Gantt"` 输入到 `组件API名称` 中，并分别配置 `barLabel` 、 `startField` 、`endField` 三个属性。这和我们之前在 `XML` 中配置属性是完全一样的。就像下面这样：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/OperationGuide/component-with-designer/gantt2.png)

这样我们就能在运行时页面看到完全一样的 `甘特图` 页面了：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/OperationGuide/component-with-designer/gantt3.png)

:::warning 提示

对于具备设计功能的视图组件和布局组件，通常我们需要保持原有设计功能，以此来添加一些额外的功能。这些组件都可以使用 `扩展配置` 完成组件的替换和属性的配置。

:::

# 二、自定义字段组件

相比于视图组件和布局组件，字段组件在界面设计器有更丰富的功能支持。

+ 创建组件/元件
+ 低无一体

回想一下我们在 “[自定义字段](/zh-cn/DevManual/OperationGuide/customize-a-field-widget.md)” 章节创建的 `RedInput` 组件。如果有可能的话，我们希望在设计器中也可以对这类字段组件像设计器中已有的字段组件切换那样容易，这样在我们创建了一个自定义组件后，就可以让它用在任何可以使用的地方。

接下来，让我们在设计器创建第一个 RedInput 组件吧。

## （一）进入界面设计器组件管理页面

从 `界面设计器` 进入后选择 “组件” 一项，就可以看到组件管理页面了，就像这样：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/OperationGuide/component-with-designer/zjgl.png)

接下来，让我们创建组件和元件吧。

## （二）创建组件

选择 “添加组件” 按钮，填入一些必要的信息，就像下面这样：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/OperationGuide/component-with-designer/create.png)

:::warning 提示

弹窗中的 “组件名称” 将在 “页面设计” 或 “组件设计” 的左侧组件库中显示。

:::

点击 “确定” ，我们就能看到组件创建成功啦～

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/OperationGuide/component-with-designer/create-success.png)

## （三）创建元件

点击 “组件卡片” 任意地方或者选择第四项 “管理元件” ，进入元件管理页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/OperationGuide/component-with-designer/glyj.png)

选择 “添加元件” 按钮，填入组件相关的注册信息：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/OperationGuide/component-with-designer/yjcreate.png)

“创建元件” 页面与字段组件的注册条件一一对应：

+ 元件名称：仅管理页面展示。
+ API名称：对应 `widget` 属性。
+ 支持字段业务类型：对应 `ttype` 属性。
+ 支持多值：对应 `multi` 属性。
+ 支持视图类型：对应 `viewType` 属性。
+ 元件描述：仅管理页面展示。

那么，这些信息是从哪里获取的呢？

让我们先来看看之前注册 `RedInput` 表单和表格字段组件时使用的代码片段：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Form,
    ttype: ModelFieldType.String,
    widget: 'RedInput'
  })
)
export class FormRedInputWidget extends FormFieldWidget<string> {
  ...
}
```

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: ModelFieldType.String,
    widget: 'RedInput'
  })
)
export class TableRedInputWidget extends BaseTableFieldWidget<string> {
  ...
}
```

我们发现 `RedInput` 组件可以被使用在 `表单视图（FORM）` 和 `表格视图（TABLE）` 中，并且只能在字段业务类型为 `文本（String）` 的字段上使用。`是否多值（multi）` 属性默认为 `false` 。

根据这些注册条件，我们就可以得到如上图所示的那些信息了。

点击 “确定” ，我们就能看到元件创建成功啦～

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/OperationGuide/component-with-designer/yjcreate-success.png)

## （四）在页面上使用自定义组件

还记得我们在 “[Create a gantt view](/zh-cn/DevManual/Tutorials/MasterTheFront-endFramework/chapter2-create-a-gantt-view.md)” 章节中，使用的 `甘特图数据录入` 页面吗？它里面包含了完整的增删改查功能，让我们在对应的 `表格视图` 和 `表单视图` 中的 `编码字段` 上使用 `RedInput` 组件吧。

先从设计器进入 `表格视图` 的设计页面，它有可能是这样的：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/OperationGuide/component-with-designer/use1.png)

就像我们之前接触到的组件切换一样，选中 “编码字段” 后，点击 “组件切换” 图标，就能在下拉菜单中看到 “红色输入框” 这样的组件名称：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/OperationGuide/component-with-designer/use2.png)

选中 “红色输入框” 进行切换，在右侧属性面板的标题上就可以看到组件已经被成功切换啦：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/OperationGuide/component-with-designer/use3.png)

:::warning 提示

不要忘记点击右上角的 “发布” 按钮让页面生效哦～

:::

下面你需要自行操作，在 “表单视图” 中将 “编码字段” 的组件也同样切换为 “红色输入框” 吧：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/OperationGuide/component-with-designer/red-input1.png)

让我们在 “甘特图数据录入” 页面看看最终的效果吧～

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/OperationGuide/component-with-designer/red-input2.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/OperationGuide/component-with-designer/red-input3.png)

## （五）低无一体

作为开发人员，我们知道任何一个组件都必然有对应代码的支持。在 Oinone 中，`界面设计器` 对于视图设计、组件/元件管理等功能统称为 `无代码` ，对于在项目中通过代码实现的 `RedInput` 组件等统称为 `低代码` 。界面设计器提供的 `低无一体` 功能，是指通过 `上传` 代码的方式追加到 `已交付` 的业务系统中实现 `二次开发` 的功能。

在介绍之前，我们需要对一些部署结构或者概念进行一些约定。

如果你是通过 `docker` 容器启动了 `设计器镜像`，并且在本地启动了 `前端工程` 进行代码开发，你在本地的部署结构和访问地址可能是这样的：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/OperationGuide/component-with-designer/mind.jpeg)

你会发现：从浏览器访问 docker 容器（http://127.0.0.1:88）和访问本地前端工程（http://127.0.0.1:8080）都能看到 “甘特图数据录入” 页面，但在访问 docker 容器时，`RedInput` 组件并没有正确显示。这是由于 docker 容器是通过已经构建好的代码进行启动的，其中并没有包含 `RedInput` 相关代码，导致 “编码字段” 对应的组件仍然是默认的 “文本输入框” 组件。

在这种情况下，我们有没有办法让两个访问路径都可以看到完全一样的页面呢？答案是肯定的。

下面，我们将详细介绍低无一体功能的使用步骤以及给出我们建议的最佳实践。

### 1、生成 SDK 并下载模板工程

让我们通过 “组件管理” 页面选择 “低无一体” 打开弹窗：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/OperationGuide/component-with-designer/SDK1.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/OperationGuide/component-with-designer/SDK2.png)

在打开的弹窗中，点击 “生成SDK” 按钮，系统将根据当前创建的元件信息生成对应的 “模板工程”：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/OperationGuide/component-with-designer/SDK3.png)

然后通过 “下载模板工程” 就可以得到一个内置了组件注册信息的 “kunlun-sdk.zip” 压缩包，将它解压后，我们可以得到一个可以用来开发的前端工程，里面是类似于下面这样的目录结构：

```shell
├── packages
│   ├── kunlun-boot
│   └── kunlun-plugin
│       ├── src
│       │   ├── field
│       │   │   ├── form
│       │   │   │   ├── RedInput
│       │   │   │   │   ├── FormStringRedInputFieldWidget.ts
│       │   │   │   │   ├── index.ts
│       │   │   │   │   └── RedInput.vue
│       │   │   │   └── index.ts
│       │   │   ├── table
│       │   │   │   ├── RedInput
│       │   │   │   │   ├── index.ts
│       │   │   │   │   ├── red-input.scss
│       │   │   │   │   └── TableStringRedInputFieldWidget.ts
│       │   │   │   └── index.ts
│       │   │   └── index.ts
│       │   └── index.ts
│       ├── index.ts
│       └── package.json
├── lerna.json
├── package.json
└── README.MD
```

### 2、开发和打包

模板工程是一个可以直接启动并运行的前端工程，我们可以通过 “README.md” 查看具体的开发步骤，这并不是我们在这一节需要特别关心的内容，就不再详细介绍了。

在开发结束后，我们通过 `npm run build` 命令可以在 `kunlun-plugin` 目录下的到一个 `dist` 目录，在这个目录中包含了前端运行所需的 `kunlun-plugin.umd.js` 和 `kunlun-plugin.css` 文件。就像下面展示的目录结构一样：

```shell
├── packages
│   ├── kunlun-boot
│   └── kunlun-plugin
│       ├── dist
│       │   ├── kunlun-plugin.css
│       │   ├── kunlun-plugin.css.map
│       │   ├── kunlun-plugin.scss
│       │   ├── kunlun-plugin.umd.js
│       │   └── types
│       │       ├── index.d.ts
│       │       └── src
│       └── package.json
├── lerna.json
├── package.json
└── README.md
```

让我们将 `js` 和 `css` 文件在 “低无一体” 弹窗中 “上传” ，并点击确定：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/OperationGuide/component-with-designer/update1.png)

在 “组件管理” 页面我们就可以看到组件状态从 “未上传” 改为了 “已上传” 。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/OperationGuide/component-with-designer/update2.png)

最后，让我们去 “甘特图数据录入” 页面看一下组件是否正确运行在页面上吧。

### 3、最佳实践

在以往的实践过程中，我们发现大多数开发人员都会按 “组件” 分别上传对应的 `js` 和 `css` 文件，以至于在组件过多的情况下造成管理混乱，甚至组件运行结果出错的问题。例如：

+ 包含相同组件定义的 js 上传多次，存在新旧两个版本冲突的问题。
+ 由于导入顺序是随机的，旧组件覆盖新组件，导致组件无法正常更新的问题。
+ 开发时将所有代码导入在一个工程中，最终上传时拆分到各个 SDK 工程中，导致运行结果不一致的问题。（如全局变量无法共享、导入顺序变化等原因）

针对这个问题，我们建议通过工程化管理的方式将所有组件在一个前端工程中进行管理，最终构建一组包含所有组件的 `js` 和 `css` 文件。在界面设计器中，仅在其中任意一个组件中进行上传即可。

