---
title: View
index: true
category:
  - 研发手册
  - Reference
  - 前端API
  - Widget
  - View
dir:
  link: true
  order: 6
prev:
  text: DSL
  link: /zh-cn/DevManual/Reference/Front-EndFramework/Widget/DSL.md
next:
  text: Table
  link: /zh-cn/DevManual/Reference/Front-EndFramework/Widget/View/table.md

---
在我们之前学习的 “[精通前端框架 - 前端框架概览](/zh-cn/DevManual/Tutorials/MasterTheFront-endFramework/chapter1-front-end-overview.md)” 章节中，我们已经对 Oinone 中所有的元数据进行了简单的概述。那么，在这一章节中，我们将对 “视图” 这一类组件进行较为完整的介绍。

# 一、视图组件

在 Oinone 中，不同的视图类型处理了不同的数据结构和表现形式，其所采取的数据处理和渲染方式也是不同的。Widget 框架对数据结构主要分为 `列表（List）` 和 `对象（Object）` 两大类。

下面根据数据结构和视图类型对一些组件进行了列举：

<table cellspacing="0" cellpadding="8" style="border-collapse: collapse; width: 100%; max-width: 1200px; margin: 20px auto;">
  <thead>
    <tr style="background-color: #f5f5f5;">
      <th style="text-align: left; font-weight: bold;">数据结构</th>
      <th style="text-align: left; font-weight: bold;">视图类型</th>
      <th style="text-align: left; font-weight: bold;">组件</th>
      <th style="text-align: left; font-weight: bold;">基类</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="3">列表（List）</td>
      <td>表格（TABLE）</td>
      <td>TableView</td>
      <td rowspan="3">BaseListView</td>
    </tr>
    <tr>
      <td>画廊（GALLERY）</td>
      <td>GalleryView</td>
    </tr>
    <tr>
      <td>树视图（TREE）</td>
      <td>TreeView</td>
    </tr>
    <tr>
      <td rowspan="2">对象（Object）</td>
      <td>表单（FORM）</td>
      <td>FormView</td>
      <td rowspan="2">BaseObjectView</td>
    </tr>
    <tr>
      <td>详情（DETAIL）</td>
      <td>DetailView</td>
    </tr>
  </tbody>
</table>

通常情况下，你不需要特别关心视图组件，它在页面中主要扮演 “桥梁” 角色——无需对其实现细节进行深度干预，即可完成组件与组件之间的协同工作。除此之外，视图还充当元数据隔离的作用域单元——**每个视图内的元数据均基于特定模型的字段拓扑结构展开**，确保数据描述的一致性与作用域边界的清晰性。

这种设计使得视图成为元数据组织的最小逻辑单元，其内部所有数据定义均严格锚定于单一模型的字段层级关系，避免跨模型的数据混杂与逻辑冲突。

:::info 注意：

在 Oinone 中，存在两类视图组件，`View` 视图组件和 `Element` 视图组件。这里需要区分两个视图组件的概念：

`View` 视图组件：用于视图类型定义和数据结构定义的视图组件。

`Element` 视图组件：在 `View` 视图组件中提供数据源及具体表现形式的视图组件。

在这一章节中，我们提到的所有视图组件都是 `View` 视图组件。

:::

# 二、数据交互设计

## （一）数据结构设计

数据结构分为三大类，`列表（List）`、`对象（Object）`以及`弹出层（Popup）`。

+ 列表（List）：用于多条数据的展示，主要包括`搜索（用户端）`、`自定义条件（产品端）`、`排序`、`分页`、`数据选中`、`数据提交`、`数据校验`功能。
+ 对象（Object）：用于单条数据的展示，主要包括`数据提交`、`数据校验`功能。
+ 弹出层（Popup）：用于在一块独立的空间展示对应类型的数据。

:::info 注意：

严格来说，弹出层不应该称为数据结构，但在 Oinone 整个自动化渲染以及数据交互的框架中，弹出层有其独特的地方，让我们不得不将其独立出来进行单独处理。

:::

## （二）数据源设计

在单个视图中，无外乎只有两种数据结构：`列表（List）` 和 `对象（Object）`。

为了能将其统一处理，我们可以将 `对象（Object）` 看作是有且仅有一项的 `列表（List）` 。

那么，在任何一个包含 `数据源` 的组件中，我们都可以得到三个 `通用属性`：

+ rootData：根数据源
+ dataSource：当前数据源
+ activeRecords：当前激活数据源

并且，它们都具有统一的类型：`ActiveRecord[]`

在不同数据结构的视图类型中，这些数据源表示不同的含义：

+ 列表（List）：`dataSource`为列表当前数据源，`activeRecords`为列表中被选中的数据。特别的，`showDataSource`为当前展示的数据源，它是`dataSource`经过搜索、排序、分页等处理后的数据源，也是我们在组件中真正使用的数据源。
+ 对象（Object）：`daraSource`和`activeRecords`总是完全一致的，且长度永远为`1`。因此我们有时也在组件中定义`formData`属性，并提供默认实现：`this.activeRecords?.[0] || {}`。

## （三）组件生命周期与组件行为

在 `自动化渲染` 过程中，我们通常无法明确知道 `当前组件与子组件` 或者 `当前组件与相邻组件` 交互的具体情况，甚至我们在定义 `当前组件` 时，并不需要关心（某些情况下可能无法关心） `子组件` 的具体情况。这也就决定了我们无法像使用原生 `Vue` 框架那样在单一组件中完整封装页面所需的全部功能逻辑。

当我们使用原生 `Vue` 框架构建页面时，通常会在`最外层组件` 中通过 `beforeMount` 或 `mounted` 生命周期中发起后端请求来获取数据。但如果将组件交给 `自动化渲染` 机制，`XML` 结构的变化将导致 `组件拓扑结构` 的变化，为了应对这一系列的变化，我们提出了一些概念：

+ 数据源提供者：在一个视图中用于提供数据源的组件称为 `数据源提供者`。通常为 `Element` 视图组件。
+ 数据源持有者：在一个视图中用于保存数据源的组件称为 `数据源持有者`。通常为 `View` 视图组件。
+ CallChaining：链式调用，通过 `组件生命周期` 挂载方法到对应功能链上进行处理，在任何组件都可以发起调用。

**数据源提供者和数据源持有者**

在视图数据源的处理中，我们希望可以有一个具体组件向后端发起获取数据的请求，并且这个组件也承担了对这些数据的展示。显而易见的是，在我们的 `XML` 结构中，最外层组件是 View 视图组件，它仅仅承担了数据结构定义和元数据处理能力而没有具体的数据展示能力。既然我们无法通过最外层组件做到这个事情，就要把它交给更为直观的 Element 视图组件。

以表格视图的渲染为例：当 `TableView` 挂载时，我们无法确定应该怎样正确的加载数据，因此，我们需要交给一个具体的 `TableWidget` 来完成这一功能。当 `TableWidget` 对应的组件发生变化时，只需按照既定的 `重载` 方式将数据源提交给 `TableView` 即可。

**CallChaining**

为了保证组件行为的最终一致性，我们需要某些行为在各个组件的实现做到 `组件自治`。不仅如此，由于 XML 结构是可以动态调整的，因此我们不能完全的信任第三方框架对组件生命周期的处理顺序。因此，我们还需要对组件行为进行进一步的 `有序` 处理。

以表格视图的加载为例：我们总是希望 `搜索条件` 的处理总是在 `加载数据` 前就处理完成的，这样将可以保证在 `加载数据` 时可以获得通过搜索视图处理过的 `搜索条件`，而这一特性并不随着 `XML` 结构的变化而变化。

上面的描述可能过于抽象，让我们来看一下标准表格视图在渲染时每个相关组件的行为时序图：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/40867a7713480ec9ff5a51f49a8f8d2b-20250604141240832.svg)

在上图中，我们可以看到，`mountedCallChaining` 是在所有组件全部渲染并挂载完成后，通过最上层的 `TableView` 发起调用，最终按照预定的优先级顺序执行了每个组件实现的 `挂载钩子函数`。

**内置的优先级常量**

+ VIEW_WIDGET_PRIORITY（`0`）：视图组件优先级。
+ FETCH_DATA_WIDGET_PRIORITY（`100`）：数据提供者组件优先级。
+ SUBVIEW_WIDGET_PRIORITY（`200`）：子视图组件优先级。

未设置优先级的hook将最后执行，在通常情况下，无需关心优先级的问题。

除了 `mountedCallChaining` 之外，在 Oinone 中还有一些内置的 `CallChaining`，它们对一些通用行为进行了预设。

**内置的CallChaining**

+ mountedCallChaining：挂载时。
+ refreshCallChaining：刷新时。
+ submitCallChaining：提交时。
+ validatorCallChaining：验证时。

对于数据源的操作也是如此，我们无法知道该如何加载数据源以及数据源应该被哪个组件正确的保存。我们可以预设这样一个场景：

当 `SearchWidget` 组件执行了 `挂载钩子函数` 时，将从 `URL 参数` 中获取所需的 `searchBody` 和 `searchConditions` 属性，并通过 `flushSearchParameters` 方法将这两个参数提交到 `TableView` 。

当 `TableWidget` 组件执行了 `挂载钩子函数` 时，将执行加载数据相关功能，并通过 `reloadDataSource` 和 `reloadActiveRecords` 方法将数据源提交到 `TableView` 。

这个场景也是标准表格视图使用的加载场景，让我们来看一下在加载数据时的行为时序图：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/51df8aef9f7f73da8ba26e6b39ffafc4-20250604141245615.svg)

到了这里，组件生命周期和组件行为就介绍完了，希望这些内容可以帮助在未来更好的使用 Oinone 做更多有趣的事情。

下面是在表格视图中，现有的行为交互时序图，可以更好的帮助你理解这些设计在实际页面中的应用：

**点击搜索**

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/%E4%B8%8B%E8%BD%BD.svg)

**排序/分页**

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/%E4%B8%8B%E8%BD%BD%20(1).svg)



**表格勾选**

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/c57184b3bfd76b9b8eb8169fed4f4353.svg)

## （四）数据提交

对于表单视图来说，一个表单的数据提交对业务系统来说是至关重要的。

在讨论数据提交之前，我们对字段的值在不同阶段有明确定义：

+ 真实值：在组件中存储的字段值。
+ 提交值：在数据提交时传入请求的值。
+ 显示值：在经过计算处理后显示在页面上的值。
+ 默认值：在创建页面首次加载时的值，编辑页面不回填。

以密码字段为例：当用户从页面上输入一些文本后，这些文本被原封不动保存在组件中；显示在页面上用“*” 替换；提交到后端请求时通过加密处理；

再来看数据提交的基本逻辑：当 `提交动作（ServerAction）` 准备向后端发起请求时，会通过 `submitCallChaining` 调用所有字段组件对应的 `submit` 方法，每个字段组件的 `submit` 都会提供当前字段名和字段值。收集完成后，提交动作将这些数据通过 GQL 请求发送到后端进行处理。这一过程就是标准的数据提交过程。

下图是提交动作与后端之间在用户点击后的交互时序图：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/4826e0236d1be7ade1b56bd42e360131.svg)

:::warning 提示：

不仅是表单的数据提交遵循这一流程，几乎所有的数据提交都遵循了这一流程。比如：表格行内编辑时，我们可以将一行数据的编辑态看作是一个 “表单” ，里面每个字段都可以看作是表单中的字段。这样一来，表格行内编辑功能也完全可以遵循这一流程。

:::

## （五）结束语

将整个页面拆分为一个一个独立的组件，最终在页面上进行拼装，形成一个完整的页面。无法避免的是，我们需要重点对数据交互进行完整设计，以保证它可以应对更多变化，这无疑增加了开发人员的理解负担。我们在实现整个 Widget 框架过程中，尽可能用简单的方式让开发人员将注意力专注在单个独立组件的开发中，而不需要特别关心这些数据交互的机制。尤其是 “[自定义字段](/zh-cn/DevManual/OperationGuide/customize-a-field-widget.md)” 章节中介绍的那样，单个字段组件无非就是渲染和数据提交这两部分，绝大多数需要重复开发的工作都被内置处理了。

虽然无形中增加了开发难度，但与此同时也带来了一些便利：单个组件的复用度得到了提升，开发人员可以像任何一个第三方组件库那样提供一个一个的独立组件供业务人员使用。这在一个交互风格统一的管理信息系统中无疑是一个重大的提升。

<div style="display: none">

# 三、视图组件的工作原理

正如我们在组件生命周期与组件行为小节中看到的示例那样，单独介绍 View 视图组件的工作原理是没有意义的，每一类视图都需要依靠一个 Element 视图组件进行具像化的展现。关于每一类视图的工作原理可查看下面这些内容：

+ [表格（Table）](/zh-cn/DevManual/Reference/Front-EndFramework/Widget/View/table.md)
+ [表单（Form）](/zh-cn/DevManual/Reference/Front-EndFramework/Widget/View/form.md)
+ [详情（Detail）](/zh-cn/DevManual/Reference/Front-EndFramework/Widget/View/detail.md)
+ [画廊（Gallery）](/zh-cn/DevManual/Reference/Front-EndFramework/Widget/View/gallery.md)
+ [树（Tree）](/zh-cn/DevManual/Reference/Front-EndFramework/Widget/View/tree.md)
+ [Element 视图组件 API](/zh-cn/DevManual/Reference/Front-EndFramework/Widget/element.md)

</div>

# 三 、Reference List

## （一）抽象基类

### 1、BaseObjectView

**继承**：BaseView

**属性**：

+ cols：当前视图的列数，优先从 DSL 配置获取，若未设置则取 `parentCols`，若 `parentCols` 也未设置则默认为 `1`。（`number`）
+ parentCols：父级视图的列数。（`number | undefined`）

### 2、BaseListView

**继承**：BaseView

**属性**：

+ checkboxAllCallChaining：全选复选框的链式调用对象。（`CallChaining | undefined`）
+ searchBody：搜索表单数据。（`ActiveRecord | undefined`）
+ searchConditions：高级搜索条件表达式。（`QueryExpression[] | undefined`）
+ selectMode：选择模式。（`SelectMode | undefined`）
+ selectModeCallChaining：选择模式的链式调用对象。（`CallChaining | undefined`）

**方法**：

#### **flushSearchParameters**

+ **功能描述**：刷新搜索参数，更新搜索表单数据和搜索条件表达式。
+ **类型**：`(searchBody, searchConditions?) => void`
+ **参数**：
  - `searchBody`：搜索表单数据对象。
  - `searchConditions`：高级搜索条件表达式数组（可选）。

## （二）视图组件

### 1、TableView

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseView.Token({
    type: ViewType.Table
  })
)
export class TableView extends BaseListView
```

**属性**：

+ editRowCallChaining：编辑行的链式调用对象。（`CallChaining<[string, ActiveRecords]> | undefined`）

### 2、SearchView

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseView.Token({
    type: ViewType.Search
  })
)
export class SearchView extends BaseObjectView
```

**属性**：

+ submitCallChaining：数据提交的链式调用对象。（`CallChaining<SubmitValue> | undefined`）
+ validatorCallChaining：数据校验的链式调用对象。（`CallChaining<boolean> | undefined`）
+ viewMode：当前视图模式，优先从 DSL 配置获取，默认值为 `ViewMode.Create`。（`ViewMode`）

**方法**：

#### **deleteDataSource**

+ **功能描述**：删除数据源中的记录（按索引）。
+ **类型**：`(recordIndexes: number[]) => void`
+ **参数**：
  - `recordIndexes`：待删除记录的索引数组。

#### **deleteDataSourceByEntity**

+ **功能描述**：根据实体删除数据源中的记录。
+ **类型**：`(records: ActiveRecords, predict?: DeleteActiveRecordsByEntityPredict) => void`
+ **参数**：
  - `records`：待删除的实体记录。
  - `predict`：删除预测参数（可选）。

#### **pushDataSource**

+ **功能描述**：向数据源中添加新记录。
+ **类型**：`(records: ActiveRecords, predict?: PushActiveRecordsPredict) => void`
+ **参数**：
  - `records`：待添加的记录。
  - `predict`：添加预测参数（可选）。

#### **reloadDataSource**

+ **功能描述**：重新加载数据源。
+ **类型**：`(records?: ActiveRecords) => void`
+ **参数**：
  - `records`：重新加载的记录（可选）。

#### **updateDataSource**

+ **功能描述**：更新数据源中的记录（按实体数组）。
+ **类型**：`(records: UpdateEntity[]) => void`
+ **参数**：
  - `records`：待更新的实体数组。

#### **updateDataSourceByEntity**

+ **功能描述**：根据实体更新数据源中的记录。
+ **类型**：`(records: ActiveRecords, predict?: UpdateActiveRecordsByEntityPredict) => void`
+ **参数**：
  - `records`：待更新的实体记录。
  - `predict`：更新预测参数（可选）。

### 3、FormView

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseView.Token({
    type: ViewType.Form
  })
)
export class FormView extends BaseObjectView
```

**属性**：

+ formValidateCallChaining：表单验证的链式调用对象。（`CallChaining<FormValidateResult[]> | undefined`）

### 4、DetailView

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseView.Token({
    type: ViewType.Detail
  })
)
export class DetailView extends BaseObjectView
```

### 5、GalleryView

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseView.Token({
    type: ViewType.Gallery
  })
)
export class GalleryView extends BaseListView
```

### 6、TreeView

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseView.Token({
    type: ViewType.Tree
  })
)
export class TreeView extends BaseListView
```


