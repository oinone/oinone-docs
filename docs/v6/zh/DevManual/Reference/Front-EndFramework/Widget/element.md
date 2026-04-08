---
title: Element
index: true
category:
  - 研发手册
  - Reference
  - 前端API
  - Widget
order: 7
next:
  text: View
  link: /v6/zh/DevManual/Reference/Front-EndFramework/Widget/View/README.md
---
在 Oinone Kunlun 中，有这样一类组件无法在一个具体的分类中被描述，它们被称为 `元素组件`。它可以用来实现任何你想实现的功能，并把它放在页面中的任何地方。

在 “[自定义视图](/zh/DevManual/OperationGuide/customize-a-view-widget.md)” 章节，我们已经初步接触了 Element 视图组件，下面我们将详细介绍一下在 Oinone 中已经内置的 Element 组件、在系统中承担的角色以及它们之间的关系。

# 一、元素组件图谱

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/1748589706552-57bb6e24-a1e8-497b-b848-66b85e459ae7.jpeg)

+ 抽象基类
  - BaseElement：基础元素组件（SPI Token 组件）。
  - BaseElementViewWidget：Element 视图组件基类。
  - BaseElementListViewWidget：列表（List）数据结构视图组件基类。
  - BaseElementObjectViewWidget：对象（Object）数据结构视图组件基类。
  - AbstractTreeWidget：树（Tree）数据结构视图组件基类。
+ 视图组件基类
  - BaseTableWidget：表格交互组件基类（提供表格交互相似的一类组件）。
  - BaseSearchWidget：搜索组件基类（提供表单搜索功能的一类组件）。
  - BaseFormWidget：表单组件基类（提供表单功能的一类组件）。
  - AbstractTreeElementWidget：树形控件组件基类（提供树形控件基础功能）。
  - AbstractCardCascaderElementWidget：级联控件组件基类（提供级联控件基础功能）。
+ 视图组件
  - TableWidget：表格组件
  - GalleryWidget：画廊组件
  - SearchWidget：搜索组件
  - FormWidget：表单组件
  - DetailWidget：详情组件
  - TreeWidget：树形控件组件
  - CardCascaderWidget：级联控件组件

# 二、元素组件的注册

## （一）元素组件的注册可选项

``` typescript
/**
 * Element组件注册可选项
 */
export interface BaseElementOptions extends SPIOptions {
  /**
   * 当前视图类型
   */
  viewType?: ViewType | ViewType[];
  /**
   * 组件名称
   */
  widget?: string | string[];
  /**
   * 内联组件
   */
  inline?: boolean;
  /**
   * 指定模型
   */
  model?: string | string[];
  /**
   * 指定视图
   */
  viewName?: string | string[];
}
```

从上述类型声明中不难发现，其分类维度涵盖以下多个方面：视图类型、组件名称、是否内联组件、模型编码以及视图名称。这些维度用于描述组件的使用位置。一般而言，位置描述得越“精确”，在相应位置进行渲染时，该组件所具备的优先级也就越高。在完全相同的位置描述的情况下，后注册的组件会覆盖先注册的组件。

## （二）注册组件

在注册元素组件时，通常我们通过 `viewType` 以及 `widget` 属性对元素组件进行区分。以 `FormWidget` 为例：

``` typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Form,
    widget: ['form', 'Form']
  })
)
export class FormWidget extends BaseFormWidget
```

:::warning 提示：

使用 widget 属性时可以指定多个组件名称作为这一组件的 “别称” 。

:::

# 三、Reference List

## （一）抽象基类

### 1、BaseElementViewWidget

**继承**：BaseElementWidget<`Props`>

**属性**：

+ $router：路由实例。（`Router`）
+ dataSourceConfig：数据源配置。（`ElementViewDataSourceConfig | undefined`）
+ domain：自定义 RSQL 表达式。（`string | undefined`）
+ filter：自定义 RSQL 表达式。（`string | undefined`）
+ isDataSourceProvider：是否是数据源提供者。为 `true` 时数据源由当前组件查询接口获取，为 `false` 时由父组件提供。（`boolean`）
+ mountedCallChaining：挂载时的链式调用配置（合并当前值与父级值）。（`CallChaining | undefined`）
+ parentMountedCallChaining：父级挂载时的链式调用配置。（`CallChaining | undefined`）
+ parentRefreshCallChaining：父级刷新时的链式调用配置。（`CallChaining<boolean> | undefined`）
+ parentRelationUpdateType：父级关联更新类型。（`RelationUpdateType | undefined`）
+ parentSubmitType：父级提交类型。（`SubmitType | undefined`）
+ parentViewMode：父级视图模式。（`ViewMode | undefined`）
+ refreshCallChaining：刷新时的链式调用配置（合并当前值与父级值）。（`CallChaining | undefined`）
+ reloadFormData$：刷新表单数据的上下文订阅。（`WidgetSubjection<boolean>`）
+ relationUpdateType：关联更新类型（合并当前值、DSL 值、父级值）。（`RelationUpdateType`）
+ submitCallChaining：数据提交的链式调用配置（直接使用父级配置）。（`CallChaining<SubmitValue> | undefined`）
+ submitType：提交类型（合并当前值、DSL 值、父级值）。（`SubmitType`）
+ validatorCallChaining：数据校验的链式调用配置（直接使用父级配置）。（`CallChaining<boolean> | undefined`）
+ viewMode：视图模式（合并当前值与父级值，默认 `Create`）。（`ViewMode`）

**方法**：

#### **getViewMode**

+ **功能描述**：获取当前视图模式。
+ **类型**：`() => ViewMode`
+ **返回值**：当前视图模式。

#### **isExpandView**

+ **功能描述**：判断是否为展开视图（通过上下文句柄匹配）。
+ **类型**：`() => boolean`
+ **返回值**：`true` 表示是展开视图，`false` 表示否。

#### **mountedProcess?**

+ **功能描述**：抽象方法，定义挂载时的具体逻辑（需子类实现）。
+ **类型**：`() => Promise<void>`

#### **refreshCondition**

+ **功能描述**：刷新过滤条件，合并多级 RSQL 表达式并更新视图过滤。
+ **类型**：`() => void`

#### **refreshConditionContext**

+ **功能描述**：获取刷新条件上下文（返回当前视图的 `context`）。
+ **类型**：`() => Record<string, unknown> | undefined`
+ **返回值**：视图上下文对象或 `undefined`。

#### **refreshProcess?**

+ **功能描述**：抽象方法，定义刷新时的具体逻辑（需子类实现）。
+ **类型**：`() => Promise<void>`

#### **setViewMode**

+ **功能描述**：设置当前视图模式。
+ **类型**：`(mode: ViewMode | undefined) => void`
+ **参数**：
  - `mode`：目标视图模式。

### 2、BaseElementObjectViewWidget

**继承**：BaseElementViewWidget<`Props`>

**属性**：

+ cols：计算后的列数，优先读取 DSL 配置，其次继承父级，默认值为 1。（`number`）
+ currentSubmitCallChaining：可观察的提交链式调用实例。（`CallChaining<SubmitValue> | undefined`）
+ currentValidatorCallChaining：可观察的校验链式调用实例。（`CallChaining<boolean> | undefined`）
+ enableScrollToErrorField：是否启用自动滚动到错误字段，默认值为 `true`。（`boolean`）
+ fieldWidgetMap：字段组件映射表，存储组件实例及索引。（`Map<string, FieldWidgetEntity>`）
+ formData：当前表单数据，默认返回首个激活记录或空对象。（`ActiveRecord`）
+ loadFunctionFun：加载函数名称。（`string | undefined`）
+ loadFunctionNamespace：加载函数命名空间（已弃用）。（`string`）
+ parentRefreshProcess：父级刷新流程函数。（`RefreshProcessFunction | undefined`）
+ submitCallChaining：数据提交的链式调用访问器，合并当前实例与父级实例。（`CallChaining<SubmitValue> | undefined`）
+ validatorCallChaining：数据校验的链式调用访问器，合并当前实例与父级实例。（`CallChaining<boolean> | undefined`）

**方法**：

#### **fieldWidgetMounted**

+ **功能描述**：字段组件挂载时触发，记录组件实例及索引到映射表。
+ **类型**：`(widget: BaseFieldWidget) => void`
+ **参数**：
  - `widget`：字段组件实例。

#### **fieldWidgetUnmounted**

+ **功能描述**：字段组件卸载时触发，从映射表中移除组件记录。
+ **类型**：`(widget: BaseFieldWidget) => void`
+ **参数**：
  - `widget`：字段组件实例。

#### **fetchData**

+ **功能描述**：根据条件加载数据，自动处理查询逻辑并返回单条记录。
+ **类型**：`(condition?: Condition) => Promise<ActiveRecord>`
+ **参数**：
  - `condition`：查询条件。
+ **返回值**：加载后的单条数据。

#### **generatorCondition**

+ **功能描述**：生成最终查询条件，合并过滤条件、域和上下文数据。
+ **类型**：`(condition?: Condition) => Condition | undefined`
+ **参数**：
  - `condition`：基础查询条件。
+ **返回值**：最终查询条件。

#### **generatorQueryContext**

+ **功能描述**：生成查询上下文，补充场景参数到 `__queryParams` 中。
+ **类型**：`(context?: QueryContext) => QueryContext`
+ **参数**：
  - `context`：基础查询上下文。
+ **返回值**：完整查询上下文。

#### **generatorQueryVariables**

+ **功能描述**：生成查询变量，补充场景信息（如 `scene`）和运行时上下文。
+ **类型**：`(variables?: QueryVariables) => QueryVariables`
+ **参数**：
  - `variables`：基础查询变量。
+ **返回值**：完整查询变量。

#### **getData**

+ **功能描述**：获取当前表单数据。
+ **类型**：`() => ActiveRecord`
+ **返回值**：当前表单数据。

#### **getFieldWidgets**

+ **功能描述**：获取所有字段组件，支持按索引排序。
+ **类型**：`(sort = false) => BaseFieldWidget[]`
+ **参数**：
  - `sort`：是否按索引排序（默认值：`false`）。
+ **返回值**：字段组件数组。

#### **mountedProcess**

+ **功能描述**：挂载后处理逻辑，自动加载数据并更新视图模式。
+ **类型**：`() => Promise<void>`

#### **onFieldEvent**

+ **功能描述**：监听字段组件事件，支持单个字段或全局监听。
+ **类型**：`(field: string | string[] | '*', eventName: FieldEventName | { [key in FieldEventName]?: FieldHandlerEvent }, callback?: FieldHandlerEvent) => void`
+ **参数**：
  - `field`：字段名或字段数组（`*` 表示所有字段）。
  - `eventName`：事件名或事件对象。
  - `callback`：回调函数（可选，当 `eventName` 为对象时不需要）。

#### **queryConstruct**

+ **功能描述**：处理新建场景的数据构造，合并初始值和运行时上下文。
+ **类型**：`(queryData: ActiveRecords | undefined, variables: QueryVariables, context: QueryContext) => Promise<ActiveRecord>`
+ **参数**：
  - `queryData`：初始数据。
  - `variables`：查询变量。
  - `context`：查询上下文。
+ **返回值**：构造后的单条数据。

#### **queryData**

+ **功能描述**：根据上下文类型（单条 / 批量）执行数据查询，支持构造模式和直接查询。
+ **类型**：`(variables: QueryVariables, context: QueryContext) => Promise<ActiveRecord>`
+ **参数**：
  - `variables`：查询变量。
  - `context`：查询上下文。
+ **返回值**：查询结果。

#### **queryOne**

+ **功能描述**：执行单条数据查询，基于 `loadFunctionFun` 或直接返回缓存数据。
+ **类型**：`(queryData: ActiveRecord, variables: QueryVariables, context: QueryContext) => Promise<ActiveRecord>`
+ **参数**：
  - `queryData`：查询条件。
  - `variables`：查询变量。
  - `context`：查询上下文。
+ **返回值**：单条查询结果。

#### **queryOneByWrapper**

+ **功能描述**：通过条件包装器执行单条数据查询，适用于复杂过滤场景。
+ **类型**：`(condition: Condition, variables: QueryVariables, context: QueryContext) => Promise<ActiveRecord>`
+ **参数**：
  - `condition`：条件包装器。
  - `variables`：查询变量。
  - `context`：查询上下文。
+ **返回值**：单条查询结果。

#### **refreshProcess**

+ **功能描述**：刷新数据流程，支持自动加载或调用父级刷新函数。
+ **类型**：`(condition?: Condition) => Promise<void>`
+ **参数**：
  - `condition`：刷新条件。

#### **repairViewMode**

+ **功能描述**：根据当前记录 ID 和父级挂载状态，自动修复视图模式（创建 / 编辑）。
+ **类型**：`() => void`

#### **submit**

+ **功能描述**：触发数据提交，通过提交链式调用或直接返回表单数据。
+ **类型**：`() => Promise<SubmitValue | undefined>`
+ **返回值**：提交结果。

#### **testInitialContext**

+ **功能描述**：校验初始上下文中是否包含未在页面中使用的字段，打印警告日志。
+ **类型**：`() => void`

#### **validator**

+ **功能描述**：触发数据校验，通过校验链式调用或直接返回校验结果。
+ **类型**：`() => Promise<boolean>`
+ **返回值**：校验结果。

#### **setData**

+ **功能描述**：设置表单数据，更新数据源和激活记录。
+ **类型**：`(data: ActiveRecords | undefined) => void`
+ **参数**：
  - `data`：要设置的数据源。

#### **tryScrollToFieldWidget**

+ **功能描述**：尝试滚动到错误字段组件，根据配置决定是否启用滚动。
+ **类型**：`(fieldWidget: BaseFieldWidget) => void`
+ **参数**：
  - `fieldWidget`：错误字段组件实例。

### 3、BaseElementListViewWidget

**继承**：BaseElementViewWidget<`Props`>

**属性**：

+ checkboxAllCallChaining：复选框全选操作的链式调用实例。（`CallChaining | undefined`）
+ defaultPageSize：默认分页数。（`number`）
+ defaultPageSizeOptions：默认分页大小选项。（`number[]`）
+ emptyImage：空数据图片。（`undefined`）
+ emptyText：空数据提示。（`string`）
+ loadFunctionFun：加载函数名称，禁用数据加载时会指定为 `false`。（`string | undefined`）
+ loadFunctionNamespace：加载函数命名空间。（`string`，已废弃：不允许手动设置）
+ ordering：默认排序字段。（`ISort[] | undefined`）
+ pageSizeOptions：分页选项。（`number[]`）
+ pagination：分页参数。（`Pagination | undefined`）
+ paginationStyle：分页样式。（`ListPaginationStyle`）
+ searchBody：搜索数据。（`ActiveRecord | undefined`）
+ searchCondition：搜索条件（树状结构）。（`TreeNode<RSQLNodeInfo> | undefined`）
+ searchConditions：搜索表达式。（`QueryExpression[] | undefined`）
+ searchSortedDataSource：根据搜索内容获取的列表数据。（`ActiveRecord[] | undefined`）
+ selectable：是否启用选择功能。（`boolean`）
+ selectMode：选择模式。（`ListSelectMode`）
+ showDataSource：当前列表展示的数据。（`ActiveRecord[] | undefined`）
+ showPagination：是否显示分页。（`boolean`）
+ sortConfig：排序配置。（`VxeTablePropTypes.SortConfig`）
+ sortList：排序参数。（`ISort[] | undefined`）
+ sortable：是否启用排序。（`boolean`）
+ usingSearchCondition：是否前端搜索。（`boolean`）

**方法**：

#### **executeSearchExpression**

+ **功能描述**：解析搜索表达式，返回计算后的值。
+ **类型**：`(searchWidget: BaseRuntimePropertiesWidget, expression: string) => string | undefined`
+ **参数**：
  - `searchWidget`：搜索组件实例。
  - `expression`：待解析的表达式。
+ **返回值**：表达式执行结果。

#### **fetchData**

+ **功能描述**：根据条件加载数据，返回修复后的记录数组。
+ **类型**：`(condition?: Condition) => Promise<ActiveRecord[]>`
+ **参数**：
  - `condition`：查询条件（可选）。
+ **返回值**：加载后的记录数组。

#### **fieldWidgetMounted**

+ **功能描述**：字段组件挂载。
+ **类型**：`(widget: any) => void`
+ **参数**：
  - `widget`：组件实例。

#### **fieldWidgetUnmounted**

+ **功能描述**：字段组件卸载。
+ **类型**：`(widget: any) => void`
+ **参数**：
  - `widget`：组件实例。

#### **generatorCondition**

+ **功能描述**：生成最终查询条件，合并过滤条件、域条件和搜索条件。
+ **类型**：`(condition?: Condition, usingSearchCondition?: boolean) => Condition`
+ **参数**：
  - `condition`：原始条件（可选）。
  - `usingSearchCondition`：是否使用搜索条件（可选）。
+ **返回值**：最终查询条件。

#### **generatorPagination**

+ **功能描述**：生成或获取分页参数，确保当前页和每页大小为有效值。
+ **类型**：`() => Pagination`
+ **返回值**：分页参数对象。

#### **generatorQueryContext**

+ **功能描述**：生成查询上下文，自动填充场景信息到查询参数。
+ **类型**：`(context?: QueryContext) => QueryContext`
+ **参数**：
  - `context`：原始上下文（可选）。
+ **返回值**：查询上下文。

#### **generatorQuerySort**

+ **功能描述**：获取当前排序参数数组。
+ **类型**：`() => ISort[]`
+ **返回值**：排序参数数组。

#### **generatorQueryVariables**

+ **功能描述**：生成查询变量，自动填充场景信息。
+ **类型**：`(variables?: QueryVariables) => QueryVariables`
+ **参数**：
  - `variables`：原始变量（可选）。
+ **返回值**：查询变量。

#### **generatorRequestFields**

+ **功能描述**：生成请求字段列表，合并模型字段和搜索字段。
+ **类型**：`() => RequestModelField[]`
+ **返回值**：请求字段数组。

#### **generatorSearchBody**

+ **功能描述**：生成最终搜索体，解析动态表达式。
+ **类型**：`() => ActiveRecord | undefined`
+ **返回值**：处理后的搜索体数据。

#### **generatorSearchCondition**

+ **功能描述**：根据查询条件生成搜索条件树，或重置搜索条件。
+ **类型**：`(condition?: Condition) => void`
+ **参数**：
  - `condition`：查询条件（可选）。

#### **getData**

+ **功能描述**：获取数据。
+ **类型**：`() => ActiveRecord[] | undefined`
+ **返回值**：列表所有数据。

#### **getPaginationStyle**

+ **功能描述**：获取分页样式。
+ **类型**：`() => ListPaginationStyle`
+ **返回值**：分页样式枚举值。

#### **mountedProcess**

+ **功能描述**：挂载后处理逻辑，加载数据并处理分页和缓存。
+ **类型**：`() => Promise<void>`

#### **onCheckedAllChange**

+ **功能描述**：全选状态变更时触发，更新选中记录。
+ **类型**：`(selected: boolean, data: ActiveRecord[], event?: CheckedChangeEvent) => void`
+ **参数**：
  - `selected`：是否全选。
  - `data`：当前列表数据。
  - `event`：事件对象（可选）。

#### **onCheckedChange**

+ **功能描述**：复选框选中状态变更时触发，更新激活记录。
+ **类型**：`(data: ActiveRecords, event?: CheckedChangeEvent) => void`
+ **参数**：
  - `data`：选中的记录数组。
  - `event`：事件对象（可选）。

#### **onPaginationChange**

+ **功能描述**：分页参数变更时触发，更新路由和数据。
+ **类型**：`(current: number, pageSize: number) => void`
+ **参数**：
  - `current`：当前页码。
  - `pageSize`：每页大小。

#### **onRadioChange**

+ **功能描述**：单选状态变更时触发，更新激活记录。
+ **类型**：`(data: ActiveRecord, event?: RadioChangeEvent) => void`
+ **参数**：
  - `data`：选中的单条记录。
  - `event`：事件对象（可选）。

#### **onSortChange**

+ **功能描述**：排序参数变更时触发，更新路由和数据。
+ **类型**：`(sortList: ISort[]) => void`
+ **参数**：
  - `sortList`：新的排序参数数组。

#### **queryPage**

+ **功能描述**：执行分页查询，支持关联模型查询。
+ **类型**：`(condition: Condition, pagination: Pagination, sort: ISort[], variables: QueryVariables, context: QueryContext) => Promise<QueryPageResult<T>>`
+ **参数**：
  - `condition`：查询条件。
  - `pagination`：分页参数。
  - `sort`：排序参数。
  - `variables`：查询变量。
  - `context`：查询上下文。
+ **返回值**：分页查询结果。

#### **relationM2MQueryPage**

+ **功能描述**：关联模型多对多查询分页数据。
+ **类型**：`(field: RuntimeM2MField, queryData: ActiveRecord, condition: Condition, pagination: Pagination, sort: ISort[], variables: QueryVariables, context: QueryContext) => Promise<QueryPageResult<T>>`
+ **参数**：
  - `field`：多对多字段模型。
  - `queryData`：查询数据。
  - `condition`：查询条件。
  - `pagination`：分页参数。
  - `sort`：排序参数。
  - `variables`：查询变量。
  - `context`：查询上下文。
+ **返回值**：分页查询结果。

#### **repairPaginationAfterDelete**

+ **功能描述**：删除数据后修复分页，切换到正确页码。
+ **类型**：`() => void`

#### **refreshProcess**

+ **功能描述**：刷新数据，支持数据源主动加载或父级刷新。
+ **类型**：`(condition?: Condition) => Promise<void>`
+ **参数**：
  - `condition`：刷新条件（可选）。

#### **resetSearchCondition**

+ **功能描述**：重置搜索条件为 `undefined`。
+ **类型**：`() => void`

#### **seekSearchRuntimeContext**

+ **功能描述**：查找搜索组件的运行时上下文。
+ **类型**：`() => RuntimeContext | RootRuntimeContext`
+ **返回值**：搜索运行时上下文或根上下文。

#### **setData**

+ **功能描述**：设置数据。
+ **类型**：`(data: ActiveRecords | undefined, currentPage?: number) => void`
+ **参数**：
  - `data`：记录数组（可选）。
  - `currentPage`：当前页码（可选）。

#### **submitCacheProcess**

+ **功能描述**：处理提交缓存，更新数据源和分页信息。
+ **类型**：`(dataSource: ActiveRecord[]) => void`
+ **参数**：
  - `dataSource`：新的数据源数组。

#### **testInitialContext**

+ **功能描述**：校验初始上下文中是否包含未在搜索条件中使用的字段。
+ **类型**：`() => void`

## （二）视图组件基类

### 1、BaseTableWidget

**继承**：BaseElementListViewWidget<`Props`>

**属性**：

+ cachedEditActiveRecords：缓存的编辑中的活动记录。（`ActiveRecord | undefined`）
+ columnWidgetMap：列组件映射。（`Map<string, ColumnWidgetEntity>`）
+ createMode：创建模式。（`boolean | undefined`）
+ currentEditorContext：当前编辑模式上下文。（`ActiveEditorContext | undefined`）
+ currentTriggerCreateAction：当前触发创建操作。（`RuntimeAction | undefined`）
+ editorCloseTrigger：行内触发关闭触发方式。（`TableEditorCloseTrigger`）
+ editorMode：行内编辑模式。（`TableEditorMode`）
+ editorShowIcon：是否显示行内编辑图标。（`boolean`）
+ editorTrigger：行内编辑触发方式。（`TableEditorTrigger`）
+ editable：是否启用行内编辑。（`boolean | undefined`）
+ expandContext：展开上下文。（`Record<string, unknown> | undefined`）
+ height：表格高度。（`string | undefined`）
+ lastedCurrentEditorContext：上一个当前编辑模式上下文。（`ActiveEditorContext | undefined`）
+ maxHeight：表格最大高度。（`string | undefined`）
+ minHeight：表格最小高度。（`string | undefined`）
+ rowEditorCreateFun：行内编辑创建函数名称。（`string | undefined`）
+ rowEditorUpdateFun：行内编辑更新函数名称。（`string | undefined`）
+ tableInstance：表格实例。（`OioTableInstance | undefined`）
+ tableRowEditMode：表格行编辑模式。（`TableRowEditMode | undefined`）
+ userPrefer：用户偏好。（`UserTablePrefer | undefined`）
+ userPreferEventManager：用户偏好事件管理器。（`UserPreferEventManager | undefined`）

**方法**：

#### **activeEditor**

+ **功能描述**：激活编辑模式回调。
+ **类型**：`(context: ActiveEditorContext) => ReturnPromise<void>`
+ **参数**：
  - `context`：激活编辑模式上下文。

#### **activeEditorBefore**

+ **功能描述**：激活编辑模式前的回调。
+ **类型**：`(context: ActiveEditorContext) => boolean`
+ **参数**：
  - `context`：激活编辑模式上下文。
+ **返回值**：允许打开编辑模式返回 `true`，阻止打开编辑模式返回 `false`。

#### **columnWidgetMounted**

+ **功能描述**：列组件挂载。
+ **类型**：`(widget: BaseTableColumnWidget) => void`
+ **参数**：
  - `widget`：列组件实例。

#### **columnWidgetUnmounted**

+ **功能描述**：列组件卸载。
+ **类型**：`(widget: BaseTableColumnWidget) => void`
+ **参数**：
  - `widget`：列组件实例。

#### **editRow**

+ **功能描述**：编辑行。
+ **类型**：`(type: unknown, data: unknown) => void`
+ **参数**：
  - `type`：编辑类型。
  - `data`：编辑数据（包含记录和操作）。

#### **executeExpression**

+ **功能描述**：执行表达式。
+ **类型**：`(activeRecord: ActiveRecord | undefined, expression: string, errorValue?: T) => T | string | undefined`
+ **参数**：
  - `activeRecord`：活动记录。
  - `expression`：待执行的表达式。
  - `errorValue`：表达式执行错误时的返回值（可选）。
+ **返回值**：表达式执行结果。

#### **filterEditable**

+ **功能描述**：过滤列的行内编辑。
+ **类型**：`(context: ActiveEditorContext, columnWidget: BaseTableColumnWidget, index: number) => boolean`
+ **参数**：
  - `context`：激活编辑模式上下文。
  - `columnWidget`：列组件。
  - `index`：列索引。
+ **返回值**：是否允许当前列进行行内编辑。

#### **getColumnWidgets**

+ **功能描述**：获取列组件。
+ **类型**：`(sort = false) => BaseTableColumnWidget[]`
+ **参数**：
  - `sort`：是否按索引排序列组件（可选，默认值为 `false`）。
+ **返回值**：列组件数组。

#### **getTableInstance**

+ **功能描述**：获取表格实例。
+ **类型**：`() => OioTableInstance | undefined`
+ **返回值**：表格实例或 `undefined`。

#### **reloadActiveRecords**

+ **功能描述**：重新加载活动记录，并更新表格实例选中状态。
+ **类型**：`(records: ActiveRecords | undefined) => void`
+ **参数**：
  - `records`：活动记录数组（可选）。

#### **reloadTableInstanceActiveRecords**

+ **功能描述**：根据选择模式更新表格实例的选中行。
+ **类型**：`() => void`

#### **removeRecordFormDataSource**

+ **功能描述**：从数据源中删除指定记录。
+ **类型**：`(context: RowContext) => Promise<void>`
+ **参数**：
  - `context`：包含记录数据的行上下文。

#### **rowEditorClosed**

+ **功能描述**：行编辑关闭时的完整处理逻辑，包括验证、提交和后置操作。
+ **类型**：`(context: RowContext | undefined) => Promise<boolean>`
+ **参数**：
  - `context`：行上下文（可选）。
+ **返回值**：行编辑关闭操作是否成功。

#### **rowEditorClosedAfterProcess**

+ **功能描述**：行内编辑关闭后的后置处理，更新数据源和活动记录。
+ **类型**：`(context: RowContext) => Promise<void>`
+ **参数**：
  - `context`：行上下文。

#### **rowEditorClosedBefore**

+ **功能描述**：行编辑关闭前的验证和预处理。
+ **类型**：`(context: RowContext) => Promise<boolean>`
+ **参数**：
  - `context`：行上下文。
+ **返回值**：是否允许关闭行编辑。

#### **rowEditorClosedForCreate**

+ **功能描述**：行内编辑关闭时执行创建操作。
+ **类型**：`(context: RowContext, data: ActiveRecords) => Promise<boolean>`
+ **参数**：
  - `context`：行上下文。
  - `data`：创建操作的提交数据。
+ **返回值**：创建操作是否成功。

#### **rowEditorClosedForSubmit**

+ **功能描述**：行内编辑关闭时提交数据。
+ **类型**：`(context: RowContext) => Promise<ActiveRecord | undefined>`
+ **参数**：
  - `context`：行上下文。
+ **返回值**：提交的数据或 `undefined`。

#### **rowEditorClosedForUpdate**

+ **功能描述**：行内编辑关闭时执行更新操作。
+ **类型**：`(context: RowContext, data: ActiveRecords) => Promise<boolean>`
+ **参数**：
  - `context`：行上下文。
  - `data`：更新操作的提交数据。
+ **返回值**：更新操作是否成功。

#### **rowEditorClosedForValidator**

+ **功能描述**：行内编辑关闭时的数据验证。
+ **类型**：`(context?: RowContext) => Promise<boolean>`
+ **参数**：
  - `context`：行上下文（可选）。
+ **返回值**：数据验证是否通过。

#### **setTableInstance**

+ **功能描述**：设置表格实例。
+ **类型**：`(tableInstance: OioTableInstance | undefined) => void`
+ **参数**：
  - `tableInstance`：表格实例（可选）。

#### **updateActiveRecordByData**

+ **功能描述**：根据新数据更新活动记录。
+ **类型**：`(data: ActiveRecord) => void`
+ **参数**：
  - `data`：更新后的活动记录。

#### **updateSubviewFieldWidget**

+ **功能描述**：更新子视图字段组件的数据源。
+ **类型**：`(context: RowContext, data: ActiveRecord) => void`
+ **参数**：
  - `context`：行上下文。
  - `data`：更新后的数据。

### 2、BaseSearchWidget

**类型声明**：

``` typescript
export class BaseSearchWidget extends BaseElementWidget
```

**属性**：

+ cols：当前搜索组件的列数，优先从 DSL 配置获取，默认值为 `4`。（`number`）
+ defaultAllInvisible：是否默认全部隐藏，默认值为 `true`。（`boolean`）
+ defaultSearchBody：默认搜索表单数据。（`ActiveRecord | undefined`）
+ defaultSearchCondition：默认搜索条件表达式。（`QueryExpression[] | undefined`）
+ formData：当前表单数据，取活跃记录的第一条，默认空对象。（`ActiveRecord`）
+ mountedCallChaining：挂载时的链式调用对象。（`CallChaining | undefined`）
+ parentCols：父级组件的列数。（`number | undefined`）
+ refreshCallChaining：刷新时的链式调用对象。（`CallChaining<boolean> | undefined`）
+ searchBody：搜索表单数据。（`ActiveRecord | undefined`）
+ searchConditions：搜索条件表达式数组。（`QueryExpression[] | undefined`）

**方法**：

#### **onReset**

+ **功能描述**：重置搜索条件，恢复默认值，更新路由参数（非内联模式），触发数据刷新。
+ **类型**：`() => Promise<void>`

#### **onSearch**

+ **功能描述**：提交搜索条件，触发数据刷新。
+ **类型**：`() => void`

### 3、BaseFormWidget

**继承**：BaseElementObjectViewWidget<`Props`>

**属性**：

+ dataPath：数据路径。（`string | undefined`）
+ labelCol：标签列配置。（`Partial<OioColModel>`）
+ layout：表单布局。（`string`）
+ wrapperCol：包装列配置。（`Partial<OioColModel>`）

**方法**：

#### **getFormInstance**

+ **功能描述**：获取表单实例。
+ **类型**：`() => OioFormInstance | undefined`
+ **返回值**：表单实例或 `undefined`。

### 4、AbstractTreeWidget

**继承**：BaseElementWidget

**属性**：

+ allInvisible：是否全部不可见。（`boolean`）
+ currentRefreshCallChaining：当前刷新调用链。（`CallChaining | undefined`）
+ defaultPagination：默认分页配置。（`Pagination`）
+ enableSearch：是否启用搜索。（`boolean`）
+ invisible：是否不可见。（`boolean`）
+ loadIdempotentKey：加载幂等键。（`Record<string, string>`）
+ mountedCallChaining：挂载调用链。（`CallChaining | undefined`）
+ parentRefreshCallChaining：父级刷新调用链。（`CallChaining | undefined`）
+ refreshCallChaining：刷新调用链（通过 `currentRefreshCallChaining` 暴露）。（`CallChaining | undefined`）
+ treeDefinition：树结构定义元数据。（`TreeNodeMetadata | undefined`）

**方法**：

#### **executeExpression**

+ **功能描述**：执行表达式。
+ **类型**：`(activeRecord: ActiveRecord, expression: string, errorValue?: T) => T | string | undefined`
+ **参数**：
  - `activeRecord`：活动记录。
  - `expression`：待执行的表达式。
  - `errorValue`：表达式执行错误时的返回值（可选）。
+ **返回值**：表达式执行结果。

#### **fillChildren**

+ **功能描述**：填充子节点数据。
+ **类型**：`(node: OioTreeNode<V>, results: ResponseBody[]) => void`
+ **参数**：
  - `node`：目标节点。
  - `results`：待填充的子节点数据数组。

#### **fetchData**

+ **功能描述**：获取节点数据（抽象方法，需子类实现）。
+ **类型**：`(node: OioTreeNode<V>, disableSelfReferences?: boolean) => Promise<ResponseBody[]>`
+ **参数**：
  - `node`：目标节点。
  - `disableSelfReferences`：是否禁用自引用（可选）。
+ **返回值**：节点数据数组。

#### **generatorKey**

+ **功能描述**：生成节点唯一键。
+ **类型**：`(metadataKey: string, data: ActiveRecord) => string`
+ **参数**：
  - `metadataKey`：元数据键。
  - `data`：节点数据。
+ **返回值**：唯一键字符串。

#### **generatorNewTreeNode**

+ **功能描述**：生成新的树节点。
+ **类型**：`(parent: OioTreeNode<V>, key: string, title: string | undefined, metadata: TreeNodeMetadata | undefined, data: ActiveRecord) => OioTreeNode<V>`
+ **参数**：
  - `parent`：父节点。
  - `key`：节点唯一键。
  - `title`：节点标题。
  - `metadata`：节点元数据。
  - `data`：节点数据。
+ **返回值**：新生成的树节点。

#### **getFormInstance**

+ **功能描述**：获取表单实例（当前类未实现，继承自父类）。
+ **类型**：`() => OioFormInstance | undefined`
+ **返回值**：表单实例或 `undefined`。

#### **getTreeMetadataList**

+ **功能描述**：获取树结构元数据列表。
+ **类型**：`() => TreeNodeMetadata[]`
+ **返回值**：树结构元数据数组。

#### **isLeafPredict**

+ **功能描述**：预测节点是否为叶子节点。
+ **类型**：`(node: TreeNodeMetadata | undefined) => boolean`
+ **参数**：
  - `node`：节点元数据（可选）。
+ **返回值**：是否为叶子节点。

#### **loadData**

+ **功能描述**：加载指定节点的子节点（展开时懒加载）。
+ **类型**：`(node: OioTreeNode<V>) => Promise<ResponseBody[]>`
+ **参数**：
  - `node`：目标节点。
+ **返回值**：子节点数据数组。

#### **loadMoreData**

+ **功能描述**：加载指定节点的更多子节点（分页加载）。
+ **类型**：`(node: OioTreeNode<V>) => Promise<ResponseBody[]>`
+ **参数**：
  - `node`：目标节点。
+ **返回值**：更多子节点数据数组。

#### **mountedProcess**

+ **功能描述**：挂载后处理逻辑（抽象方法，需子类实现）。
+ **类型**：`() => ReturnPromise<void>`

#### **onChecked**

+ **功能描述**：节点勾选状态变更回调。
+ **类型**：`(node: OioTreeNode<V>, checked: boolean) => ReturnPromise<void>`
+ **参数**：
  - `node`：目标节点。
  - `checked`：是否勾选。

#### **onNodeChecked**

+ **功能描述**：节点勾选时的具体逻辑（可重写）。
+ **类型**：`(node: OioTreeNode<V>) => ReturnPromise<void>`
+ **参数**：
  - `node`：目标节点。

#### **onNodeSelected**

+ **功能描述**：节点选中时的具体逻辑（可重写）。
+ **类型**：`(node: OioTreeNode<V>) => ReturnPromise<void>`
+ **参数**：
  - `node`：目标节点。

#### **onNodeUnchecked**

+ **功能描述**：节点取消勾选时的具体逻辑（可重写）。
+ **类型**：`(node: OioTreeNode<V>) => ReturnPromise<void>`
+ **参数**：
  - `node`：目标节点。

#### **onNodeUnselected**

+ **功能描述**：节点取消选中时的具体逻辑（可重写）。
+ **类型**：`(node: OioTreeNode<V>) => ReturnPromise<void>`
+ **参数**：
  - `node`：目标节点。

#### **onSelected**

+ **功能描述**：节点选中状态变更回调。
+ **类型**：`(node: OioTreeNode<V>, selected: boolean) => ReturnPromise<void>`
+ **参数**：
  - `node`：目标节点。
  - `selected`：是否选中。

#### **refreshProcess**

+ **功能描述**：刷新处理逻辑（抽象方法，需子类实现）。
+ **类型**：`() => ReturnPromise<void>`

#### **convertTreeByTreeSearchResponseBody**

+ **功能描述**：根据搜索响应体转换树结构。
+ **类型**：`(list: TreeNodeResponseBody[]) => OioTreeNode<V>[]`
+ **参数**：
  - `list`：搜索响应体数组。
+ **返回值**：转换后的树节点数组。

#### **computeNodeTitle**

+ **功能描述**：计算节点标题。
+ **类型**：`(val: V) => string`
+ **参数**：
  - `val`：节点值对象。
+ **返回值**：节点标题字符串。

#### **loadNode**

+ **功能描述**：加载节点数据（支持异步操作和幂等性处理）。
+ **类型**：`async <R>(node: OioTreeNode<V>, fn: (...args) => R, ...args: any[]) => R`
+ **参数**：
  - `node`：目标节点。
  - `fn`：异步加载函数。
  - `args`：加载函数参数（可选）。
+ **返回值**：加载函数的返回结果。

#### **onSelectedForSearch**

+ **功能描述**：搜索场景下的节点选中处理。
+ **类型**：`(node: OioTreeNode<V>) => Promise<boolean>`
+ **参数**：
  - `node`：选中的树节点。
+ **返回值**：处理是否成功。

#### **onSelectedForQuery**

+ **功能描述**：查询场景下的节点选中处理。
+ **类型**：`(node: OioTreeNode<CardCascaderItemData>) => Promise<boolean>`
+ **参数**：
  - `node`：选中的树节点。
+ **返回值**：处理是否成功。

#### **onUnselected**

+ **功能描述**：移除选中状态时的处理逻辑。
+ **类型**：`() => Promise<void>`

#### **setRuntimeFilter**

+ **功能描述**：设置运行时过滤条件。
+ **类型**：`(filter: string | Condition | undefined) => void`
+ **参数**：
  - `filter`：过滤条件（字符串、`Condition` 对象或 `undefined`）。

### 5、AbstractTreeElementWidget

**继承**：AbstractTreeWidget<`V`>

**属性**：

+ autoExpandParent：是否自动展开父节点。（`boolean`）
+ checkedKeys：已勾选的节点键列表。（`string[] | undefined`）
+ checkAll：是否全选。（`boolean`）
+ checkAllLabel：全选按钮标签。（`string | undefined`）
+ checkable：是否可勾选。（`boolean`）
+ expandedKeys：已展开的节点键列表。（`string[] | undefined`）
+ expandLevel：展开层级。（`string | undefined`）
+ loadedKeys：已加载的节点键列表。（`string[] | undefined`）
+ rootNode：根节点。（`OioTreeNode<V> | undefined`）
+ searchPlaceHolder：搜索框占位文本。（`string | undefined`）
+ searchRemote：是否远程搜索。（`boolean`）
+ searchRootNode：搜索结果根节点。（`OioTreeNode<V> | undefined`）
+ searchValue：搜索值。（`string | undefined`）
+ selectedKeys：已选中的节点键列表。（`string[] | undefined`）
+ showContent：是否显示内容。（`boolean`）
+ showIcon：是否显示图标。（`boolean`）

**方法**：

#### **fetchAll**

+ **功能描述**：获取所有节点数据。
+ **类型**：`() => Promise<TreeNodeResponseBody[]>`
+ **返回值**：节点响应体数组。

#### **fetchExpandEndLevel**

+ **功能描述**：获取展开到指定层级的节点数据。
+ **类型**：`(metadataList: TreeNodeMetadata[], options?: { expressionParameters?: ExpressionRunParam }) => Promise<TreeNodeResponseBody[]>`
+ **参数**：
  - `metadataList`：元数据列表。
  - `options`：选项（可选）。
+ **返回值**：节点响应体数组。

#### **fixExpandLevelNodes**

+ **功能描述**：修复展开层级的节点数据。
+ **类型**：`(nodes: OioTreeNode<V>[], expandedKeys: string[]) => void`
+ **参数**：
  - `nodes`：节点数组。
  - `expandedKeys`：已展开的节点键列表。

#### **generatorExpressionParameters**

+ **功能描述**：生成表达式运行参数。
+ **类型**：`() => ExpressionRunParam`
+ **返回值**：表达式运行参数对象。

#### **generatorRootNode**

+ **功能描述**：生成根节点。
+ **类型**：`(metadata: TreeNodeMetadata) => OioTreeNode<V>`
+ **参数**：
  - `metadata`：元数据。
+ **返回值**：根节点。

#### **loadAllData**

+ **功能描述**：加载所有节点数据。
+ **类型**：`() => Promise<void>`

#### **loadExpandLevel**

+ **功能描述**：加载指定展开层级的数据。
+ **类型**：`(node: OioTreeNode<V>, metadataList: TreeNodeMetadata[]) => Promise<void>`
+ **参数**：
  - `node`：节点。
  - `metadataList`：元数据列表。

#### **loadExpandLevelData**

+ **功能描述**：加载指定展开层级的数据并返回处理结果。
+ **类型**：`(node: OioTreeNode<V>, metadataList: TreeNodeMetadata[]) => Promise<{ nodes: OioTreeNode<V>[]; expandedKeys: string[] }>`
+ **参数**：
  - `node`：节点。
  - `metadataList`：元数据列表。
+ **返回值**：包含节点数组和已展开节点键列表的对象。

#### **loadExpandLevelDataAfterProcess**

+ **功能描述**：处理加载展开层级数据后的节点。
+ **类型**：`(node: OioTreeNode<V>, nodes: OioTreeNode<V>[], expandedKeys: string[]) => { nodes: OioTreeNode<V>[]; expandedKeys: string[] }`
+ **参数**：
  - `node`：节点。
  - `nodes`：节点数组。
  - `expandedKeys`：已展开的节点键列表。
+ **返回值**：包含处理后节点数组和已展开节点键列表的对象。

#### **mountedProcess**

+ **功能描述**：组件挂载后的处理。
+ **类型**：`() => ReturnPromise<void>`

#### **onCheckedAll**

+ **功能描述**：全选 / 取消全选回调。
+ **类型**：`(checkedAll: boolean) => ReturnPromise<void>`
+ **参数**：
  - `checkedAll`：是否全选。

#### **onNodeCheckedAll**

+ **功能描述**：全选时的处理。
+ **类型**：`() => ReturnPromise<void>`

#### **onNodeUncheckedAll**

+ **功能描述**：取消全选时的处理。
+ **类型**：`() => ReturnPromise<void>`

#### **onSearch**

+ **功能描述**：搜索回调。
+ **类型**：`(keywords: string) => Promise<void>`
+ **参数**：
  - `keywords`：搜索关键词。

#### **onUpdateCheckedKeys**

+ **功能描述**：更新已勾选的节点键列表。
+ **类型**：`(val: string[]) => void`
+ **参数**：
  - `val`：新的已勾选节点键列表。

#### **onUpdateExpandedKeys**

+ **功能描述**：更新已展开的节点键列表。
+ **类型**：`(val: string[]) => void`
+ **参数**：
  - `val`：新的已展开节点键列表。

#### **onUpdateLoadedKeys**

+ **功能描述**：更新已加载的节点键列表。
+ **类型**：`(val: string[]) => void`
+ **参数**：
  - `val`：新的已加载节点键列表。

#### **onUpdateSearchValue**

+ **功能描述**：更新搜索值。
+ **类型**：`(val: string) => void`
+ **参数**：
  - `val`：新的搜索值。

#### **onUpdateSelectedKeys**

+ **功能描述**：更新已选中的节点键列表。
+ **类型**：`(val: string[]) => void`
+ **参数**：
  - `val`：新的已选中节点键列表。

#### **refreshProcess**

+ **功能描述**：刷新处理。
+ **类型**：`() => ReturnPromise<void>`

#### **refreshProcessAfterProperties**

+ **功能描述**：刷新处理后的属性设置。
+ **类型**：`() => void`

### 6、AbstractCardCascaderElementWidget

**继承**：AbstractTreeWidget<`V`>

**属性**：

+ showContent：是否显示内容。（`boolean`）
+ rootNodes：根节点数组。（`OioTreeNode<V>[] | undefined`）

**方法**：

#### **fetchNodeData**

+ **功能描述**：获取节点数据并更新根节点。
+ **类型**：`(node: OioTreeNode<V>, metadata: TreeNodeMetadata) => Promise<void>`
+ **参数**：
  - `node`：目标节点。
  - `metadata`：元数据。

#### **isLeafPredict**

+ **功能描述**：预测节点是否为叶子节点。
+ **类型**：`(node: TreeNodeMetadata | undefined, useSelfReferences?: boolean) => boolean`
+ **参数**：
  - `node`：节点元数据。
  - `useSelfReferences`：是否使用自引用（可选）。
+ **返回值**：是否为叶子节点。

#### **mountedProcess**

+ **功能描述**：组件挂载后的处理。
+ **类型**：`() => ReturnPromise<void>`

#### **onSearch**

+ **功能描述**：搜索回调。
+ **类型**：`(keywords: string, rootNode?: OioTreeNode<V>) => Promise<void>`
+ **参数**：
  - `keywords`：搜索关键词。
  - `rootNode`：根节点（可选）。

#### **refreshNodeFetchData**

+ **功能描述**：刷新节点数据。
+ **类型**：`(node: OioTreeNode<V>) => Promise<{ node: OioTreeNode<V>; isChange: { total: boolean; totalPageSize: boolean }; results: ResponseBody[] }>`
+ **参数**：
  - `node`：目标节点。
+ **返回值**：包含节点、变更状态和结果的对象。

#### **refreshNodes**

+ **功能描述**：刷新所有节点。
+ **类型**：`() => Promise<void>`

#### **refreshProcess**

+ **功能描述**：刷新处理。
+ **类型**：`() => ReturnPromise<void>`

#### **resetRootNode**

+ **功能描述**：重置根节点。
+ **类型**：`() => Promise<void>`

## （三）视图组件

### 1、TableWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Table,
    widget: ['table', TABLE_WIDGET]
  })
)
export class TableWidget<Props extends TableWidgetProps = TableWidgetProps> extends BaseTableWidget<Props>
```

**属性**：

+ activeCount：激活项数量。
+ allowChecked：是否允许勾选。
+ autoLineHeight：是否自动行高。
+ checkbox：是否显示复选框。
+ cellMinWidth：单元格最小宽度。
+ cellWidth：单元格宽度。
+ enableSequence：是否启用序号列。
+ expandAccordion：是否手风琴式展开。
+ expandAll：是否展开所有行。
+ expandOperationField：展开操作字段。
+ expandRowIndexes：展开行索引数组。
+ existingExpandElement：是否存在展开行组件。
+ footerMethod：页脚内容生成方法。
+ lazyExistExpandRow：是否延迟存在展开行。
+ lineHeight：行高。
+ mergeCells：单元格合并配置。
+ minLineHeight：最小行高。
+ operatorColumnButtonType：操作列按钮类型。
+ operatorColumnDirection：操作列方向。
+ operatorColumnWidth：操作列宽度。
+ remoteStatisticsRow：远程统计行数据。
+ rowClickActionDslDefinition：行点击动作配置。
+ rowClickMode：行点击模式。
+ rowDblClickActionDslDefinition：行双击动作配置。
+ scrollX：横向滚动配置。
+ scrollY：纵向滚动配置。
+ showFooter：是否显示页脚。
+ skipStatisticsText：跳过统计文本。
+ statisticsFun：统计函数名。
+ statisticsLabel：统计标签。
+ treeConfig：树结构配置。
+ usingSimpleUserPrefer：是否使用简单用户偏好。

**方法**：

#### **checkMethod**

+ **功能描述**：校验行是否可勾选。
+ **类型**：`({ row }: { row: ActiveRecord }) => boolean`
+ **参数**：
  - `row`：行数据。
+ **返回值**：是否可勾选。

#### **clickActionWidget**

+ **功能描述**：触发行点击动作组件。
+ **类型**：`(activeRecords: ActiveRecords, actionName: string) => Promise<void>`
+ **参数**：
  - `activeRecords`：激活记录。
  - `actionName`：动作名称。

#### **fetchData**

+ **功能描述**：获取表格数据（支持树结构）。
+ **类型**：`(condition?: Condition) => Promise<ActiveRecord[]>`
+ **参数**：
  - `condition`：查询条件（可选）。
+ **返回值**：数据数组。

#### **getEnabledTreeConfig**

+ **功能描述**：获取是否启用树结构配置。
+ **类型**：`() => boolean | undefined`
+ **返回值**：是否启用树结构配置。

#### **initTreeConfig**

+ **功能描述**：初始化树结构配置。
+ **类型**：`() => void`

#### **loadTreeNodes**

+ **功能描述**：加载树结构子节点。
+ **类型**：`(condition?: Condition, currentRow?: ActiveRecord) => Promise<Entity[]>`
+ **参数**：
  - `condition`：查询条件（可选）。
  - `currentRow`：当前行数据（可选）。
+ **返回值**：子节点数据数组。

#### **mountedProcess**

+ **功能描述**：组件挂载后处理。
+ **类型**：`() => ReturnPromise<void>`

#### **onCurrentChange**

+ **功能描述**：当前行变更处理。
+ **类型**：`(e: any) => void`
+ **参数**：
  - `e`：事件对象。

#### **onPaginationChange**

+ **功能描述**：分页变更回调。
+ **类型**：`(current: number, pageSize: number) => void`
+ **参数**：
  - `current`：当前页。
  - `pageSize`：每页大小。

#### **onResizableChange**

+ **功能描述**：列宽调整回调。
+ **类型**：`({ column }: { column: { field: string; resizeWidth: number } }) => Promise<void>`
+ **参数**：
  - `column`：调整后的列信息。

#### **onRowClick**

+ **功能描述**：行点击回调。
+ **类型**：`({ column, row }: { column: VxeTableDefines.ColumnInfo; row: ActiveRecord }) => Promise<void>`
+ **参数**：
  - `column`：点击的列。
  - `row`：点击的行数据。

#### **onRowDblClick**

+ **功能描述**：行双击回调。
+ **类型**：`({ column, row }: { column: VxeTableDefines.ColumnInfo; row: ActiveRecord }) => Promise<void>`
+ **参数**：
  - `column`：点击的列。
  - `row`：点击的行数据。

#### **onSortChange**

+ **功能描述**：排序变更回调。
+ **类型**：`(sortList: ISort[]) => void`
+ **参数**：
  - `sortList`：排序规则数组。

#### **onToggleRowExpand**

+ **功能描述**：行展开状态切换回调。
+ **类型**：`({ expanded, rowIndex }: { expanded: boolean; rowIndex: number }) => void`
+ **参数**：
  - `expanded`：是否展开。
  - `rowIndex`：行索引。

#### **refreshProcess**

+ **功能描述**：刷新表格数据及状态。
+ **类型**：`(condition?: Condition) => Promise<void>`
+ **参数**：
  - `condition`：查询条件（可选）。

#### **refreshStatistics**

+ **功能描述**：刷新统计信息。
+ **类型**：`() => void`

#### **resetExpandRowAttr**

+ **功能描述**：重置展开行属性。
+ **类型**：`() => void`

#### **resetExpandRowIndexes**

+ **功能描述**：重置展开行索引。
+ **类型**：`(init?: boolean) => void`
+ **参数**：
  - `init`：是否初始化（可选）。

#### **statisticsBySum**

+ **功能描述**：计算统计值总和。
+ **类型**：`(statisticalValues: unknown[]) => string`
+ **参数**：
  - `statisticalValues`：统计值数组。
+ **返回值**：总和字符串。

#### **remoteStatistics**

+ **功能描述**：远程统计数据。
+ **类型**：`(columns: VxeTableDefines.ColumnInfo[], fun: string) => Promise<void>`
+ **参数**：
  - `columns`：列信息数组。
  - `fun`：统计函数名。

#### **generatorStatisticsRow**

+ **功能描述**：生成统计行。
+ **类型**：`(columns: VxeTableDefines.ColumnInfo[], data: ActiveRecord[]) => string[]`
+ **参数**：
  - `columns`：列信息数组。
  - `data`：数据数组。
+ **返回值**：统计行数据。

#### **fetchStatisticsResult**

+ **功能描述**：获取统计结果。
+ **类型**：`(columns: VxeTableDefines.ColumnInfo[], fun: string, ...args: unknown[]) => Promise<Record<string, unknown> | undefined>`
+ **参数**：
  - `columns`：列信息数组。
  - `fun`：统计函数名。
  - `args`：其他参数。
+ **返回值**：统计结果。

#### **treeConfig**

+ **功能描述**：获取树结构配置。
+ **类型**：`() => object | undefined`
+ **返回值**：树结构配置。

### 2、SearchWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Search,
    widget: ['search', SEARCH_WIDGET]
  })
)
export class SearchWidget extends BaseSearchWidget
```

**属性**：

+ cateFields：分类字段数组，从 DSL 配置解析，默认返回单字段或双字段数组。（`string[]`）
+ disabledExpand：是否禁用展开功能，从 DSL 配置获取布尔值，默认 `false`。（`boolean`）
+ foldSize：折叠时显示的字段数量，从 DSL 配置获取数值，默认 `3`。（`number`）
+ invisibleSearch：是否隐藏搜索框，从 DSL 配置获取布尔值，默认 `false`。（`boolean`）
+ isExpand：搜索框展开状态。（`boolean`）
+ searchPreferOptions：搜索偏好选项列表。（`UserSearchPrefer[] | undefined`）
+ selectedPrefer：当前选中的搜索偏好。（`UserSearchPrefer | undefined`）
+ showSearchPrefer：是否显示搜索偏好，非内联模式且存在视图名称时显示。（`boolean`）

**方法**：

#### **onCateSearch**

+ **功能描述**：分类搜索处理，合并搜索数据并触发常规搜索。
+ **类型**：`(searchData: Entity) => void`
+ **参数**：
  - `searchData`：分类搜索数据对象。

#### **onExpand**

+ **功能描述**：切换搜索框展开状态。
+ **类型**：`(expand: boolean) => void`
+ **参数**：
  - `expand`：展开状态的布尔值。

#### **onLoadSearchPreferOptions**

+ **功能描述**：加载搜索偏好选项，首次调用时异步获取数据。
+ **类型**：`() => Promise<void>`

#### **onCreateSearchPrefer**

+ **功能描述**：创建新的搜索偏好，保存后更新选项列表并选中新创建项。
+ **类型**：`(value: UserSearchPrefer) => Promise<boolean>`
+ **参数**：
  - `value`：待创建的搜索偏好对象。

#### **onRemoveSearchPrefer**

+ **功能描述**：删除指定搜索偏好，从选项列表中移除并调用接口删除。
+ **类型**：`(value: UserSearchPrefer) => Promise<boolean>`
+ **参数**：
  - `value`：待删除的搜索偏好对象。

#### **onReset**

+ **功能描述**：重置搜索条件，清空搜索字符串和选中偏好，调用父类重置方法。
+ **类型**：`() => Promise<void>`

#### **onSearch**

+ **功能描述**：执行搜索操作，更新路由参数或触发数据刷新，提供搜索条件给父组件。
+ **类型**：`() => void`

#### **onSelectSearchPrefer**

+ **功能描述**：选中搜索偏好，应用偏好中的搜索条件并触发搜索。
+ **类型**：`(value: UserSearchPrefer) => void`
+ **参数**：
  - `value`：选中的搜索偏好对象。

#### **onUnselectSearchPrefer**

+ **功能描述**：取消选中搜索偏好，重置为默认状态并触发重置。
+ **类型**：`() => Promise<void>`

#### **onUpdateSearchPrefer**

+ **功能描述**：更新搜索偏好名称，调用接口修改并更新本地列表。
+ **类型**：`(value: UserSearchPrefer) => Promise<boolean>`
+ **参数**：
  - `value`：包含 ID 和新名称的搜索偏好对象。

### 3、FormWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Form,
    widget: ['form', FORM_WIDGET]
  })
)
export class FormWidget extends BaseFormWidget
```

### 4、DetailWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Detail,
    widget: ['detail', DETAIL_WIDGET]
  })
)
export class DetailWidget extends BaseFormWidget
```

### 5、GalleryWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Gallery,
    widget: 'gallery'
  })
)
export class GalleryWidget extends BaseElementListViewWidget
```

**属性**：

+ cols：列数。
+ gutter：间距配置。
+ itemWidth：项宽度。
+ itemMinWidth：项最小宽度。
+ itemMaxWidth：项最大宽度。

**方法**：

#### **childrenInvisibleProcess**

+ **功能描述**：处理子组件不可见状态。
+ **类型**：`() => boolean`
+ **返回值**：是否隐藏子组件。

### 6、TreeWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Tree,
    widget: 'tree'
  })
)
export class TreeWidget extends AbstractTreeElementWidget
```

**属性**：

+ showContent：是否显示内容。

**方法**：

#### **onClearSearch**

+ **功能描述**：清除搜索内容时的回调。
+ **类型**：`() => Promise<void>`

#### **onNodeSelected**

+ **功能描述**：节点选中时的回调。
+ **类型**：`(node: OioTreeNode<TreeData>) => Promise<void>`
+ **参数**：
  - `node`：选中的树节点。

#### **onNodeUnselected**

+ **功能描述**：节点取消选中时的回调。
+ **类型**：`(node: OioTreeNode<TreeData>) => Promise<void>`
+ **参数**：
  - `node`：取消选中的树节点。

#### **onUnselected**

+ **功能描述**：取消选中状态的回调。
+ **类型**：`() => Promise<void>`

### 7、CardCascaderWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Tree,
    widget: ['card-cascader', 'cardCascader', 'CardCascader']
  })
)
export class CardCascaderWidget extends AbstractCardCascaderElementWidget
```

**方法**：

#### **onClearSearch**

+ **功能描述**：清除搜索内容时的回调。
+ **类型**：`() => Promise<void>`

#### **onNodeSelected**

+ **功能描述**：节点选中时的回调。
+ **类型**：`(node: OioTreeNode<CardCascaderItemData>) => Promise<void>`
+ **参数**：
  - `node`：选中的树节点。

#### **onNodeUnselected**

+ **功能描述**：节点取消选中时的回调。
+ **类型**：`(node: OioTreeNode<CardCascaderItemData>) => Promise<void>`
+ **参数**：
  - `node`：取消选中的树节点。

#### **onUnselected**

+ **功能描述**：取消选中状态的回调。
+ **类型**：`() => Promise<void>`

#### **onClickLoadData**

+ **功能描述**：点击节点加载数据。
+ **类型**：`(node: OioTreeNode<CardCascaderItemData>) => Promise<void>`
+ **参数**：
  - `node`：点击的树节点。

## （四）其他组件

### 1、ActionBarWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    widget: ['actionBar', 'action-bar', 'ActionBar']
  })
)
export class ActionBarWidget<Props extends ActionBarWidgetProps = ActionBarWidgetProps> extends BaseActionGroupWidget<Props>
```

**属性**：

+ activeCount：当前活动项数量，从 DSL 配置获取，若未设置则尝试从视图模板获取，支持枚举值。（`number | undefined`）
+ buttonType：按钮类型，从 DSL 配置获取并转换为小写。（`string | undefined`）
+ checkboxAllCallChaining：全选复选框的链式调用对象。（`CallChaining | undefined`）
+ inline：是否为内联模式，从 DSL 配置获取布尔值，默认 `false`。（`boolean | undefined`）
+ isFloat：是否为浮动模式，从 DSL 配置获取布尔值。（`boolean | undefined`）
+ justify：布局对齐方式，当 `popupScene` 为空时从 DSL 配置获取并转换为对应值。（`string | undefined`）
+ moreActionRender：更多操作渲染函数。（`MoreActionRender | undefined`）
+ moreActionTriggers：更多操作触发方式数组，从 DSL 配置获取，默认 `['click', 'hover']`。（`OioDropdownTrigger[]`）
+ popupScene：弹出场景。（`string | undefined`）
+ selectMode：选择模式。（`ListSelectMode | undefined`）
+ selectModeCallChaining：选择模式的链式调用对象。（`CallChaining | undefined`）

**方法**：

#### **onCheckboxAll**

+ **功能描述**：处理全选复选框的点击事件，调用链式调用对象传递选中状态。
+ **类型**：`(selected: boolean) => void`
+ **参数**：
  - `selected`：全选复选框的选中状态。

#### **onSelectModeChange**

+ **功能描述**：处理选择模式的变化，重新加载活跃记录并调用链式调用对象传递新模式。
+ **类型**：`(mode: ListSelectMode | undefined) => void`
+ **参数**：
  - `mode`：新的选择模式。

### 2、RowActionBarWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    widget: [
      'actionBar',
      'action-bar',
      'ActionBar',
      'action-column',
      'ActionColumn',
      'actionColumn',
      'row-action',
      'RowAction',
      'rowAction',
      'row-actions',
      'RowActions',
      'rowActions'
    ],
    inline: true
  })
)
export class RowActionBarWidget<Props extends RowActionBarWidgetProps = RowActionBarWidgetProps> extends ActionBarWidget<Props>
```

**属性**：

+ activeCount：当前活动项数量，优先从父级内联配置获取，其次父级常规配置，最后继承基类。（`number | undefined`）
+ buttonType：按钮类型，优先从父级操作列配置获取，否则继承基类。（`string | undefined`）
+ parentActiveCount：父级常规活动项数量。（`number | undefined`）
+ parentInlineActiveCount：父级内联活动项数量。（`number | undefined`）
+ operatorColumnDirection：操作列方向。（`string | undefined`）
+ operatorColumnButtonType：操作列按钮类型。（`string | undefined`）
+ rowIndex：行索引，必选属性。（`number`）

### 3、TreeNodeActionsWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    widget: 'TreeNodeActions',
    inline: true
  })
)
export class TreeNodeActionsWidget<V extends TreeData = TreeData> extends ActionBarWidget<TreeNodeActionsWidgetProps<V>>
```

**属性**：

+ node：当前树节点数据。（`TreeNode<V> | undefined`）

### 4、CardRowActionsWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    widget: 'CardRowActions',
    inline: true
  })
)
export class CardRowActionsWidget extends RowActionBarWidget
```

### 5、TableUserPreferWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Table,
    widget: ['userPrefer', 'user-prefer', 'UserPrefer']
  })
)
export class TableUserPreferWidget extends BaseElementWidget
```

**属性**：

+ invisible：组件是否不可见，在用户偏好数据不存在时始终为 `true`。（`boolean`）
+ simple：是否启用简单模式，从 DSL 配置获取布尔值。（`boolean | undefined`）

**方法**：

#### **enterCallback**

+ **功能描述**：保存用户对表格列的显示 / 隐藏和顺序偏好，并重新加载偏好设置。
+ **类型**：`(allFields: DataOption[], invisibleFields: DataOption[], visibleFields: DataOption[]) => Promise<boolean>`
+ **参数**：
  - `allFields`：所有字段选项。
  - `invisibleFields`：不可见字段选项。
  - `visibleFields`：可见字段选项。

#### **resetCallback**

+ **功能描述**：重置用户对表格列的所有偏好设置为默认值。
+ **类型**：`() => Promise<boolean>`

### 6、TableSearchTreeWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: [ViewType.Table, ViewType.Form],
    widget: 'tree'
  })
)
export class TableSearchTreeWidget extends AbstractTreeElementWidget
```

**属性**：

+ dropMode：超出最大勾选数量后的丢弃模式，默认值为 `DropMode.DropEarliest`。（`string`）
+ maxCheckCount：最大勾选数量，从 DSL 配置获取数值，默认值为 `-1`（无限制）。（`number`）

**方法**：

#### **onChecked**

+ **功能描述**：处理节点勾选事件，更新勾选状态并触发搜索条件处理。
+ **类型**：`(node: OioTreeNode<TreeData>, checked: boolean) => ReturnPromise<void>`
+ **参数**：
  - `node`：被勾选的树节点。
  - `checked`：勾选状态（`true` 为选中，`false` 为取消选中）。

#### **onCheckedAll**

+ **功能描述**：处理全选 / 全不选事件，更新所有节点勾选状态并触发搜索条件处理。
+ **类型**：`(checkdAll: boolean) => ReturnPromise<void>`
+ **参数**：
  - `checkdAll`：全选状态（`true` 为全选，`false` 为全不选）。

#### **onSearch**

+ **功能描述**：执行搜索操作，更新勾选状态并触发父级刷新。
+ **类型**：`(keywords: string) => Promise<void>`
+ **参数**：
  - `keywords`：搜索关键词。

#### **updateCheckAllStatus**

+ **功能描述**：更新全选状态，根据勾选的节点自动设置全选键的状态。
+ **类型**：`(allKeys?: string[]) => void`
+ **参数**：
  - `allKeys`：可选的所有节点键数组，默认使用搜索根节点的子节点键。

### 7、TableSearchCardCascaderWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Table,
    widget: ['card - cascader', 'cardCascader', 'CardCascader']
  })
)
export class TableSearchCardCascaderWidget extends AbstractCardCascaderElementWidget
```

**方法**：

#### **onClickLoadData**

+ **功能描述**：处理节点点击事件，加载节点数据并更新显示内容。
+ **类型**：`(node: OioTreeNode<CardCascaderItemData>) => Promise<void>`
+ **参数**：
  - `node`：被点击的树节点。

#### **onClearSearch**

+ **功能描述**：清除搜索状态，重置根节点并取消所有选择。
+ **类型**：`() => Promise<void>`

#### **onNodeSelected**

+ **功能描述**：处理节点选中事件，点击加载数据。
+ **类型**：`(node: OioTreeNode<CardCascaderItemData>) => Promise<void>`
+ **参数**：
  - `node`：被选中的树节点。

#### **onNodeUnselected**

+ **功能描述**：处理节点取消选中事件，取消所有选择。
+ **类型**：`(node: OioTreeNode<CardCascaderItemData>) => Promise<void>`
+ **参数**：
  - `node`：被取消选中的树节点。

#### **refreshProcess**

+ **功能描述**：刷新组件，重置根节点并取消所有选择。
+ **类型**：`() => Promise<void>`

### 8、CardWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  BasePackWidget.Token({
    viewType: ViewType.Gallery,
    widget: 'card'
  })
)
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Gallery,
    widget: 'card'
  })
)
export class CardWidget extends BaseElementWidget
```

**属性**：

+ allowClick：是否允许点击卡片，取决于 DSL 配置和点击动作定义。（`boolean`）
+ cols：卡片列数，默认值为 `DEFAULT_COLS`。（`number`）
+ formData：当前卡片表单数据，取活跃记录的第一条，默认空对象。（`ActiveRecord`）
+ height：卡片高度，从 DSL 配置获取数值。（`number | undefined`）
+ isCard：标识是否为卡片组件，默认 `true`。（`boolean`）
+ isSelected：当前卡片是否选中，通过活跃记录匹配判断。（`boolean`）
+ inlineActiveCount：内联模式下活动项数量，支持数值或枚举值。（`number | undefined`）
+ maxHeight：卡片最大高度，从 DSL 配置获取数值。（`number | undefined`）
+ maxWidth：卡片最大宽度，从 DSL 配置获取数值。（`number | undefined`）
+ minHeight：卡片最小高度，默认值为 `338`。（`number`）
+ minWidth：卡片最小宽度，从 DSL 配置获取数值。（`number | undefined`）
+ rowIndex：行索引，来源于插槽上下文。（`number | undefined`）
+ selectMode：选择模式。（`ListSelectMode | undefined`）
+ width：卡片宽度，从 DSL 配置获取数值。（`number | undefined`）

**方法**：

#### **onClick**

+ **功能描述**：处理卡片点击事件，触发配置的点击动作组件。
+ **类型**：`() => Promise<void>`

#### **onCheckboxChange**

+ **功能描述**：处理复选框状态变化，更新父级活跃记录。
+ **类型**：`(val: boolean) => void`
+ **参数**：
  - `val`：复选框选中状态（`true` 为选中，`false` 为取消选中）。

