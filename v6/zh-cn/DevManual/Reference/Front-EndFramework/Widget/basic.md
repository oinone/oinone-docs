---
title: Basic
index: true
category:
  - 研发手册
  - Reference
  - 前端API
  - Widget
order: 2

---
在 Oinone Kunlun 中，我们基于 `VueWidget` 衍生出一系列 `Widget` 组件，在本章内容中，我们对于一些 “抽象” 组件进行详细介绍。

# 一、核心组件图谱

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/1748415952590-e994a698-9272-4525-93c4-113656cbf141.jpeg)

# 二、SPI Token 组件图谱

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/1748416256027-68d1afbb-369c-4161-924b-196a63e42ca1.jpeg)

# 三、元数据组件图谱

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/1748416542172-ae3b57d2-f594-423a-b29c-dde5224b039d.jpeg)

+ MetadataViewWidget：元数据视图组件，包含视图上下文数据。用于通过视图、字段或动作创建 `RuntimeContext` 。
+ DefaultMetadataMainViewWidget：元数据主视图组件。通过监听路由变化创建整个页面首个 `MetadataRuntimeContext`，并渲染 `母版（Mask）`。
+ DefaultMainViewWidget：主内容分发区渲染组件，用于创建 `RootRuntimeContext` ，并渲染 `布局（Layout）` 和 `DSL` 。
+ MultiTabsContainerWidget 和 MultiTabContainerWidget：多标签页容器组件和标签页组件。

# 四、Reference List

## （一）核心组件

### 1、VueWidget

**继承**：Widget

**属性**：

+ opt：组件代理实例，用于访问 Vue 实例属性。（`VueWidget | undefined`）

**方法**：

#### createWidget

+ **功能描述**：在当前组件节点下创建子组件。
+ **类型**：`<T extends Widget>(constructor: WidgetConstructor<T['config'], T>, slotName?: string, initConfig?: T['config'], specifiedIndex?: number, resolveNewCode?: boolean) => T`
+ **参数**：
  - `constructor`：子组件构造函数。
  - `slotName`：插槽名称。
  - `initConfig`：子组件初始化配置。
  - `specifiedIndex`：子组件在父节点中的指定位置。
  - `resolveNewCode`：是否更新节点标识。
+ **返回值**：子组件实例。

#### dispose

+ **功能描述**：销毁组件实例，清理资源。
+ **类型**：`(force?: boolean) => void`
+ **参数**：
  - `force`：是否强制销毁（可选，默认`false`）。

#### forceUpdate

+ **功能描述**：强制更新组件。
+ **类型**：`() => void`

#### getChildrenInstance

+ **功能描述**：获取子组件实例数组（继承自`Widget`）。
+ **类型**：`() => Widget[]`
+ **返回值**：子组件实例数组。

#### getOperator

+ **功能描述**：获取组件响应式操作对象。
+ **类型**：`<T extends VueWidget>() => T`
+ **返回值**：组件响应式实例。

#### setComponent

+ **功能描述**：设置当前组件渲染的 Vue 组件或 HTML 标签。
+ **类型**：`(component: WidgetComponent) => void`
+ **参数**：
  - `component`：目标组件。

#### setMixinComponent

+ **功能描述**：设置混入的 Vue 组件。
+ **类型**：`(component: Component | undefined) => void`
+ **参数**：
  - `component`：混入组件实例。

#### translate

+ **功能描述**：国际化翻译（响应式方法）。
+ **类型**：`(key: string, values?: { [key: string]: any }) => string`
+ **参数**：
  - `key`：翻译键。
  - `values`：替换参数（可选）。
+ **返回值**：翻译后的字符串。

#### translateByI18n

+ **功能描述**：通过 i18n 进行国际化翻译（响应式方法）。
+ **类型**：`(key: string) => string`
+ **参数**：
  - `key`：翻译键。
+ **返回值**：翻译后的字符串。

### 2、DslRenderWidget

**继承**：VueWidget

**属性**：

+ internal：标识组件是否为内部组件，影响插槽渲染逻辑。（`boolean`）
+ slotName：组件在父组件中使用的插槽名称。（`string | undefined`）
+ template：当前渲染的 DSL 模板定义。（`DslDefinition | undefined`）

**方法**：

#### getDsl

+ **功能描述**：获取当前组件的 DSL 定义，若未设置则返回默认值。
+ **类型**：`() => DslDefinition`
+ **返回值**：DSL 定义对象。

#### getSlotName

+ **功能描述**：获取组件在父组件中的插槽名称。
+ **类型**：`() => string | undefined`
+ **返回值**：插槽名称。

#### initialize

+ **功能描述**：初始化组件属性，配置 DSL 相关参数。
+ **类型**：`(props: Props) => this`
+ **参数**：
  - `props`：组件属性，需符合 DslRenderWidgetProps 接口。
+ **返回值**：组件实例本身（支持链式调用）。

#### render

+ **功能描述**：渲染组件，根据`internal`属性选择不同的渲染策略。
+ **类型**：`(ctx?: Record<string, any>, slots?: Slots) => VNode | VNode[]`
+ **参数**：
  - `ctx`：渲染上下文对象。
  - `slots`：Vue 插槽对象。
+ **返回值**：渲染的虚拟节点。

### 3、DslDefinitionWidget

**继承**：DslRenderWidget

**属****性**：

+ allInvisible：判断组件及其子组件是否全部不可见。（`boolean | undefined`）
+ automatic：是否为自动组件。（`boolean`）
+ currentHandle：当前组件的句柄，初始化时自动设置。（`string`）
+ inline：是否为内联组件。（`boolean | undefined`）
+ invisible：判断组件是否不可见（考虑自身和父级状态）。（`boolean`）
+ invisibleState：内部维护的不可见状态。（`boolean`）
+ lastedInvisibleState：上一次的不可见状态，用于检测变化。（`boolean | undefined`）
+ metadataHandle：元数据视图的句柄。（`string | undefined`）
+ parentInvisible：父组件的不可见状态。（`boolean | undefined`）
+ parentInvisibleProvider：向子组件提供的不可见状态（当前组件或父级状态）。（`boolean`）
+ rootHandle：根组件的句柄（一般为视图组件）。（`string | undefined`）

**方法**：

#### allMounted

+ **功能描述**：所有子组件挂载完成后调用，重置不可见状态。
+ **类型**：`() => void`

#### childrenInvisibleProcess

+ **功能描述**：处理子组件的不可见状态，判断是否全部不可见。
+ **类型**：`() => boolean`
+ **返回值**：子组件是否全部不可见。

#### getCurrentHandle

+ **功能描述**：获取当前组件的句柄。
+ **类型**：`() => string`
+ **返回值**：组件句柄。

#### getMetadataHandle

+ **功能描述**：获取元数据视图的句柄。
+ **类型**：`() => string | undefined`
+ **返回值**：元数据句柄。

#### getMetadataRuntimeContext &&notUse

+ **功能描述**：获取元数据的运行时上下文。
+ **类型**：`() => RuntimeContext`
+ **返回值**：运行时上下文对象。
+ **异常**：元数据上下文无效时抛出错误。

#### getRootComputeContext &&notUse

+ **功能描述**：获取根组件的计算上下文。
+ **类型**：`() => ComputeContext | undefined`
+ **返回值**：计算上下文对象或`undefined`。

#### getRootHandle

+ **功能描述**：获取根组件的句柄。
+ **类型**：`() => string | undefined`
+ **返回值**：根组件句柄。

#### getRootRuntimeContext &&notUse

+ **功能描述**：获取根组件的运行时上下文。
+ **类型**：`() => RuntimeContext`
+ **返回值**：运行时上下文对象。
+ **异常**：根上下文无效时抛出错误。

#### getRootViewRuntimeContext &&notUse

+ **功能描述**：获取根视图的运行时上下文及其字段。
+ **类型**：`() => { runtimeContext: RuntimeContext; fields: RuntimeModelField[] }`
+ **返回值**：包含运行时上下文和字段数组的对象。

#### invisibleProcess

+ **功能描述**：处理不可见属性值，转换为布尔类型。
+ **类型**：`(invisible: boolean | string) => boolean`
+ **参数**：
  - `invisible`：不可见属性值（布尔或字符串）。
+ **返回值**：转换后的布尔值。

#### resetInvisible

+ **功能描述**：重置不可见状态，当`allInvisible`为`true`时生效。
+ **类型**：`() => void`

#### resetParentInvisible

+ **功能描述**：递归重置父组件的不可见状态。
+ **类型**：`() => void`

### 4、PathWidget

**继承**：DslDefinitionWidget

**属性**：

+ currentPath：当前指定路径。（`string | undefined`）
+ parentPath：上级路径，通过注入获取。（`string | undefined`）
+ path：完整路径，根据父路径、子路径和子索引动态生成。（`string`）
+ subIndex：当前子路径索引。（`string | number | undefined`）
+ subPath：当前子路径。（`string | undefined`）

### 5、ActiveRecordsWidget

**继承**：PathWidget<`Props`>

**属性**：

+ currentActiveRecords：当前数据记录，不存在时透传上级数据。（`ActiveRecord[] | undefined`）
+ currentDataSource：当前数据源，支持数据操作与缓存。（`ActiveRecord[] | null | undefined`）
+ currentRootData：当前根数据，优先使用自身配置，否则透传上级数据。（`ActiveRecord[] | undefined`）
+ parentActiveRecords：上级数据记录。（`ActiveRecord[] | undefined`）
+ parentDataSource：上级数据源。（`ActiveRecord[] | undefined`）
+ parentReloadActiveRecords：上级重新加载数据记录的方法。（`ReloadActiveRecordsFunction | undefined`）
+ parentReloadDataSource：上级重新加载数据源的方法。（`ReloadActiveRecordsFunction | undefined`）
+ parentPushActiveRecords：上级添加数据记录的方法。（`PushActiveRecordsFunction | undefined`）
+ parentPushDataSource：上级添加数据源的方法。（`PushActiveRecordsFunction | undefined`）
+ parentUpdateActiveRecords：上级更新数据记录的方法。（`UpdateActiveRecordsFunction | undefined`）
+ parentUpdateDataSource：上级更新数据源的方法。（`UpdateActiveRecordsFunction | undefined`）
+ parentDeleteActiveRecords：上级删除数据记录的方法。（`DeleteActiveRecordsFunction | undefined`）
+ parentDeleteDataSource：上级删除数据源的方法。（`DeleteActiveRecordsFunction | undefined`）
+ parentFlushActiveRecords：上级刷新数据记录的方法。（`FlushActiveRecordsFunction | undefined`）
+ parentFlushDataSource：上级刷新数据源的方法。（`FlushActiveRecordsFunction | undefined`）
+ parentRootData：上级根数据。（`ActiveRecord[] | undefined`）
+ rootData：提供给下级的根数据（当前或上级数据）。（`ActiveRecord[] | undefined`）
+ submitCache：提交缓存管理器（通过元数据上下文获取）。（`SubmitCacheManager | undefined`）
+ dataSource：提供给下级的数据源（当前或上级数据）。（`ActiveRecord[] | undefined`）
+ activeRecords：提供给下级的数据记录（当前或上级数据）。（`ActiveRecord[] | undefined`）

**方法**：

#### createDataSourceByEntity

+ **功能描述**：通过实体创建数据源并合并到当前数据源。
+ **类型**：`(records: ActiveRecords, predict?: PushActiveRecordsPredict) => void`
+ **参数**：
  - `records`：要创建的数据。
  - `predict`：推送判定函数（可选）。

#### deleteActiveRecords

+ **功能描述**：根据索引删除数据记录。
+ **类型**：`(recordIndexes: number[]) => void`
+ **参数**：
  - `recordIndexes`：数据索引数组。

#### deleteActiveRecordsByEntity

+ **功能描述**：根据实体条件删除数据记录。
+ **类型**：`(records: ActiveRecords, predict?: DeleteActiveRecordsByEntityPredict) => void`
+ **参数**：
  - `records`：删除条件数据。
  - `predict`：删除判定函数（可选）。

#### deleteDataSource

+ **功能描述**：根据索引删除数据源。
+ **类型**：`(recordIndexes: number[]) => void`
+ **参数**：
  - `recordIndexes`：数据索引数组。

#### deleteDataSourceByEntity

+ **功能描述**：根据实体条件删除数据源。
+ **类型**：`(records: ActiveRecords, predict?: DeleteActiveRecordsByEntityPredict) => void`
+ **参数**：
  - `records`：删除条件数据。
  - `predict`：删除判定函数（可选）。

#### flushActiveRecords

+ **功能描述**：刷新数据记录（清空当前数据或向上提交）。
+ **类型**：`() => void`

#### flushDataSource

+ **功能描述**：刷新数据源（向上提交）。
+ **类型**：`() => void`

#### getCurrentActiveRecords

+ **功能描述**：获取当前数据记录。
+ **类型**：`() => ActiveRecord[] | undefined`
+ **返回值**：当前数据记录数组或`undefined`。

#### getCurrentDataSource

+ **功能描述**：获取当前数据源。
+ **类型**：`() => ActiveRecord[] | null | undefined`
+ **返回值**：当前数据源数组、`null`或`undefined`。

#### getCurrentRootData

+ **功能描述**：获取当前根数据。
+ **类型**：`() => ActiveRecord[] | undefined`
+ **返回值**：当前根数据数组或`undefined`。

#### reloadActiveRecords

+ **功能描述**：重新加载数据记录到当前实例。
+ **类型**：`(records?: ActiveRecords) => void`
+ **参数**：
  - `records`：要加载的数据（可选）。

#### reloadDataSource

+ **功能描述**：重新加载数据源到当前实例。
+ **类型**：`(records?: ActiveRecords) => void`
+ **参数**：
  - `records`：要加载的数据（可选）。

#### pushActiveRecords

+ **功能描述**：向当前数据记录中添加数据。
+ **类型**：`(records: ActiveRecords, predict?: PushActiveRecordsPredict) => void`
+ **参数**：
  - `records`：要添加的数据。
  - `predict`：推送判定函数（可选）。

#### pushDataSource

+ **功能描述**：向当前数据源中添加数据。
+ **类型**：`(records: ActiveRecords, predict?: PushActiveRecordsPredict) => void`
+ **参数**：
  - `records`：要添加的数据。
  - `predict`：推送判定函数（可选）。

#### updateActiveRecords

+ **功能描述**：根据索引更新数据记录。
+ **类型**：`(records: UpdateEntity[]) => void`
+ **参数**：
  - `records`：更新实体数组。

#### updateActiveRecordsByEntity

+ **功能描述**：根据实体条件更新数据记录。
+ **类型**：`(records: ActiveRecords, predict?: UpdateActiveRecordsByEntityPredict) => void`
+ **参数**：
  - `records`：更新数据。
  - `predict`：更新判定函数（可选）。

#### updateDataSource

+ **功能描述**：根据索引更新数据源。
+ **类型**：`(records: UpdateEntity[]) => void`
+ **参数**：
  - `records`：更新实体数组。

#### updateDataSourceByEntity

+ **功能描述**：根据实体条件更新数据源。
+ **类型**：`(records: ActiveRecords, predict?: UpdateActiveRecordsByEntityPredict) => void`
+ **参数**：
  - `records`：更新数据。
  - `predict`：更新判定函数（可选）。

### 6、BaseRuntimePropertiesWidget

**继承**：ActiveRecordsWidget

**属性**：

+ invisible：判断组件是否不可见，若不支持当前客户端类型则强制隐藏。（`boolean`）
+ isSupportCurrentClient：判断是否支持当前客户端类型。（`boolean`）
+ isSupportMobileClient：判断是否支持移动端客户端。（`boolean`）
+ isSupportPCClient：判断是否支持 PC 端客户端。（`boolean`）
+ loading：加载状态标识，由 load 方法控制。（`boolean`）
+ model：运行时模型，从根运行时上下文获取。（`RuntimeModel`）
+ openerActiveRecords：打开当前视图的组件的活动记录。（`ActiveRecord[] | undefined`）
+ openerDataSource：打开当前视图的组件的数据源。（`ActiveRecord[] | undefined`）
+ scene：当前场景，从 URL 参数或视图动作获取。（`string`）
+ supportClientTypes：支持的客户端类型列表。（`ViewClientType[]`）
+ urlParameters：URL 查询参数，内联组件返回空对象。（`UrlQueryParameters`）
+ view：运行时视图。（`RuntimeView | undefined`）
+ viewAction：运行时视图动作。（`RuntimeViewAction | undefined`）
+ initialValue：视图初始值。（`ActiveRecord[] | undefined`）
+ initialContext：视图初始上下文，优先从 URL 参数获取。（`Record<string, unknown> | undefined`）
+ usingLoading：是否使用加载状态，默认启用。（`boolean`）

**方法**：

#### getUrlParameters

+ **功能描述**：获取 URL 查询参数。
+ **类型**：`() => UrlQueryParameters`
+ **返回值**：URL 参数对象。

#### load

+ **功能描述**：执行异步操作并管理加载状态。
+ **类型**：`<R>(fn: (...args) => R, ...args) => Promise<R>`
+ **参数**：
  - `fn`：要执行的函数。
  - `args`：函数参数。
+ **返回值**：Promise 函数执行结果。

### 7、BaseDataWidget

**继承**：BaseRuntimePropertiesWidget

**属性**：

+ currentDataPath：当前指定的数据路径。（`string | undefined`）
+ dataPath：完整数据路径，由父路径、子路径和索引组合而成。（`string`）
+ itemData：数据交互标识，优先使用 DSL 中的 data 字段，否则使用 name。（`string`）
+ itemName：数据提交标识，优先使用 DSL 中的 name 字段，否则使用 data。（`string`）
+ parentDataPath：上级数据路径。（`string | undefined`）
+ subDataIndex：当前数据子路径索引。（`string | number | undefined`）
+ subDataPath：当前数据子路径，默认使用 itemData。（`string | undefined`）

## （二）SPI Token 组件

### 1、BaseMaskWidget

**继承**：DslRenderWidget

**属性**：

+ automatic：是否为自动组件。（`boolean`）
+ classNames：组件的类名数组，从 DSL 中获取。（`string[] | undefined`）
+ currentHandle：当前组件的句柄，初始化时自动设置。（`string`）
+ loading：加载状态标识。（`boolean`）
+ style：组件的 CSS 样式，从 DSL 中转换。（`CSSStyle | undefined`）

**方法**：

#### getCurrentHandle

+ **功能描述**：获取当前组件的句柄。
+ **类型**：`() => string`
+ **返回值**：组件句柄。

#### getUrlParameters

+ **功能描述**：获取 URL 查询参数。
+ **类型**：`() => Record<string, unknown>`
+ **返回值**：URL 参数对象。

#### load

+ **功能描述**：执行异步操作并管理加载状态。
+ **类型**：`<R>(fn: (...args) => R, ...args) => Promise<R>`
+ **参数**：
  - `fn`：要执行的函数。
  - `args`：函数参数。
+ **返回值**：Promise，函数执行结果。

#### render

+ **功能描述**：渲染组件，处理插槽数据。
+ **类型**：`(ctx?: Record<string, unknown>, slots?: Slots) => VNode | VNode[]`
+ **参数**：
  - `ctx`：渲染上下文。
  - `slots`：插槽内容。
+ **返回值**：渲染的虚拟节点。

### 2、BaseView

**继承**：BaseRuntimePropertiesWidget

**属性**：

+ parentViewType：上级视图类型。（`ViewType | undefined`）
+ viewMode：当前视图模式（提供给下级）。（`ViewMode`）
+ viewType：视图类型。（`ViewType | undefined`）
+ validatorCallChaining：校验时的链式调用对象（提供给下级）。（`CallChaining<boolean> | undefined`）

**方法**

#### addVisibleArea

+ **功能描述**：添加可见区域。
+ **类型**：`() => void`

#### clearVisibleArea

+ **功能描述**：清除可见区域。
+ **类型**：`() => void`

#### cloneParentDataSource

+ **功能描述**：克隆父数据源。
+ **类型**：`() => void`

#### getViewMode

+ **功能描述**：获取当前视图模式。
+ **类型**：`() => ViewMode`

#### setViewMode

+ **功能描述**：设置当前视图模式。
+ **类型**：`(mode: ViewMode | undefined) => void`
+ **参数**：
  - `mode`：视图模式。

### 3、BaseElementWidget

**继承**：BaseRuntimePropertiesWidget

**属性**：

+ parentViewType：上级视图类型。（`ViewType | undefined`）
+ viewType：视图类型。（`ViewType | undefined`）

### 4、BasePackWidget

**继承**：BaseRuntimePropertiesWidget

**属性**：

+ cols：列数，优先使用自身配置，否则继承上级或默认值 1。（`number`）
+ defaultAllInvisible：默认所有子组件是否不可见（初始值为 true）。（`boolean`）
+ formData：表单数据，取当前活动记录的第一条。（`Record<string, unknown>`）
+ help：帮助信息，从 DSL 中获取。（`string | undefined`）
+ isDialog：是否为对话框场景（基于 popupScene 判断）。（`boolean`）
+ isDrawer：是否为抽屉场景（基于 popupScene 判断）。（`boolean`）
+ parentCols：上级列数。（`number | undefined`）
+ parentViewType：上级视图类型。（`ViewType | undefined`）
+ popupScene：弹出层场景。（`string | undefined`）
+ viewType：当前视图类型，优先使用视图配置，否则继承上级。（`ViewType | undefined`）

**方法**：

#### executeExpression

+ **功能描述**：执行表达式，支持表单数据、根数据等上下文。
+ **类型**：`<T>(expression: string, errorValue?: T) => T | string | undefined`
+ **参数**：
  - `expression`：表达式字符串。
  - `errorValue`：表达式执行失败时的默认值（可选）。
+ **返回值**：表达式结果或默认值。

#### executeLabelExpression

+ **功能描述**：处理标签表达式，自动识别表达式字符串或关键词。
+ **类型**：`(label: string) => string | undefined`
+ **参数**：
  - `label`：标签内容。
+ **返回值**：处理后的标签字符串或 `undefined`。

#### invisibleProcess

+ **功能描述**：处理不可见属性，支持表达式计算。
+ **类型**：`(invisible: boolean | string) => boolean | undefined`
+ **参数**：
  - `invisible`：不可见属性值（布尔或字符串）。
+ **返回值**：处理后的布尔值或 `undefined`。

### 5、BaseActionWidget

**继承**：BaseRuntimePropertiesWidget

**属性**：

+ action：当前运行时动作，不可为 undefined，否则抛出错误。（`Action`）
+ isAsync：是否为异步动作（固定返回 true）。（`boolean`）
+ isDialog：是否为对话框场景（基于 popupScene 判断）。（`boolean`）
+ isDrawer：是否为抽屉场景（基于 popupScene 判断）。（`boolean`）
+ isInnerPopup：是否为内部弹出层场景（基于 popupScene 判断）。（`boolean`）
+ parentViewMode：上级视图模式。（`ViewMode | undefined`）
+ popupScene：弹出层场景。（`PopupScene | string | undefined`）
+ refreshCallChaining：刷新时的链式调用对象。（`CallChaining<boolean> | undefined`）
+ submitCallChaining：提交时的链式调用对象。（`CallChaining<SubmitValue> | undefined`）
+ submitType：提交类型。（`SubmitType | undefined`）
+ relationUpdateType：关系更新类型。（`RelationUpdateType | undefined`）
+ runtimeAction：内部维护的运行时动作实例。（`Action | undefined`）
+ viewMode：当前视图模式（提供给下级，默认继承上级）。（`ViewMode | undefined`）
+ viewType：当前视图类型。（`ViewType | undefined`）
+ validatorCallChaining：校验时的链式调用对象。（`CallChaining<boolean> | undefined`）
+ $matched：路由匹配信息（组件挂载时获取）。（`Matched | undefined`）
+ $router：路由实例（组件挂载时获取）。（`Router | undefined`）

**方法**：

#### load

+ **功能描述**：执行异步操作并管理加载状态，若为异步动作则调用父类 `load`，否则直接执行函数。
+ **类型**：`<R>(fn: (...args) => R, ...args) => Promise<R>`
+ **参数**：
  - `fn`：要执行的函数。
  - `args`：函数参数。
+ **返回值**：函数执行结果。

### 6、BaseFieldWidget

**继承**：BaseFormItemWidget

**属性**：

+ computeTrigger：计算触发方式。（`ComputeTrigger[]`）
+ field：运行时字段。（`Field`）
+ label：字段标签。（`string | undefined`）
+ readonly：是否只读。（`boolean`）
+ required：是否必填。（`boolean`）

**方法**：

#### blur

+ **功能描述**：触发字段失去焦点事件，并通知相关生命周期。
+ **类型**：`() => void`

#### change

+ **功能描述**：更新字段值，并通知字段变化生命周期。
+ **类型**：`(val: Value | null | undefined) => void`
+ **参数**：
  - `val`：新的字段值。（`Value | null | undefined`）

#### executeCompute

+ **功能描述**：执行计算逻辑（当前仅为占位，未实现完整逻辑）。
+ **类型**：`(trigger: ComputeTrigger) => void`
+ **参数**：
  - `trigger`：计算触发类型。（`ComputeTrigger`）

#### executeValidator

+ **功能描述**：执行校验逻辑，并通知校验相关生命周期。
+ **类型**：`() => Promise<ValidatorInfo>`
+ **返回值**：校验结果信息。

#### focus

+ **功能描述**：触发字段获得焦点事件，并通知相关生命周期。
+ **类型**：`() => void`

#### on

+ **功能描述**：监听字段事件，支持单个或多个事件监听。
+ **类型**：`(event: FieldEventName | { [key in FieldEventName]?: HandlerEvent }, handler?: HandlerEvent) => void`
+ **参数**：
  - `event`：事件名或事件对象。（`FieldEventName | { [key in FieldEventName]?: HandlerEvent }`）
  - `handler`：事件处理函数（可选）。（`HandlerEvent`）

#### submit

+ **功能描述**：提交字段值，返回提交结果。
+ **类型**：`(submitValue: SubmitValue) => ReturnPromise<Record<string, unknown> | SubmitRelationValue | undefined>`
+ **参数**：
  - `submitValue`：提交的值。（`SubmitValue`）
+ **返回值**：提交结果。

#### validator

+ **功能描述**：执行具体的校验逻辑，返回校验结果。
+ **类型**：`() => Promise<ValidatorInfo>`
+ **返回值**：校验结果信息。

#### validatorSpecific

+ **功能描述**：执行特定的校验逻辑，返回校验结果。
+ **类型**：`(needCheckedValue: any) => Promise<ValidatorInfo>`
+ **参数**：
  - `needCheckedValue`：需要校验的值。（`any`）
+ **返回值**：Promise，校验结果信息。

### 7、EditorFieldWidget

无

### 8、BaseRouterWidget

无

## （三）元数据组件

### 1、MetadataViewWidget

**继承**：DslDefinitionWidget

**属性**：

+ inline：是否为内联组件。（`boolean`）
+ isVirtual：是否为虚拟组件（控制插槽行为）。（`boolean`）
+ modelModel：模型名称（运行时上下文获取）。（`string | undefined`）
+ modelName：模型显示名（运行时上下文获取）。（`string | undefined`）
+ moduleModule：模块名称（运行时上下文获取）。（`string | undefined`）
+ moduleName：模块显示名（运行时上下文获取）。（`string | undefined`）
+ runtimeContext：运行时上下文实例。（`RuntimeContext | undefined`）
+ viewDsl：视图 DSL 定义（运行时上下文获取）。（`DslDefinition | undefined`）
+ viewLayout：视图布局 DSL 定义（运行时上下文获取）。（`DslDefinition | undefined`）
+ viewTemplate：视图模板 DSL 定义（运行时上下文获取）。（`DslDefinition | undefined`）
+ viewType：视图类型（运行时上下文获取）。（`ViewType | undefined`）
+ viewAction：视图动作实例（初始化时注入）。（`RuntimeViewAction | undefined`）

**方法**：

#### createWidget

+ **功能描述**：创建子组件，自动注入元数据句柄和根句柄（非自动组件）。
+ **类型**：`<TProps extends WidgetProps, T extends Widget<TProps>>(constructor: WidgetConstructor<TProps, T>, slotName?: string, initConfig?: T['config'], specifiedIndex?: number, resolveNewCode?: boolean) => T`
+ **参数**：
  - `constructor`：组件构造函数。
  - `slotName`：插槽名称（可选）。
  - `initConfig`：初始化配置（可选）。
  - `specifiedIndex`：指定索引（可选）。
  - `resolveNewCode`：是否解析新代码（可选）。

#### initContext

+ **功能描述**：使用指定运行时上下文初始化组件。
+ **类型**：`(runtimeContext: RuntimeContext) => RuntimeContext`
+ **参数**：
  - `runtimeContext`：运行时上下文实例。
+ **返回值**：初始化后的运行时上下文。

#### initContextByViewAction

+ **功能描述**：通过视图动作创建并初始化运行时上下文。
+ **类型**：`(viewAction?: RuntimeViewAction) => RuntimeContext`
+ **参数**：
  - `viewAction`：视图动作实例（可选，默认使用当前实例的 `viewAction`）。
+ **返回值**：运行时上下文实例。
+ **异常**：视图动作或运行时上下文无效时抛出错误。

#### initContextByView

+ **功能描述**：通过视图创建并初始化运行时上下文。
+ **类型**：`(view: RuntimeView) => void`
+ **参数**：
  - `view`：视图实例。
+ **返回值**：运行时上下文实例。
+ **异常**：视图无效时抛出错误。

#### initContextByViewForField

+ **功能描述**：通过视图和字段创建并初始化运行时上下文（用于子视图）。
+ **类型**：`(view: RuntimeView, field: RuntimeModelField) => void`
+ **参数**：
  - `view`：视图实例。
  - `field`：模型字段实例。
+ **返回值**：运行时上下文实例。
+ **异常**：视图或字段无效时抛出错误。

### 2、DefaultMetadataMainViewWidget

**继承**：MetadataViewWidget

**属性**：

+ currentRuntimeViewAction：当前运行时视图动作实例。（`RuntimeViewAction | undefined`）
+ loading：全局加载状态标识。（`boolean`）
+ mainViewLoading：主视图加载状态（提供给下级组件）。（`boolean`）
+ maskTemplate：掩码模板 DSL 定义。（`DslDefinition | undefined`）
+ multiTabsContainerWidget：多标签容器组件实例。（`MultiTabsContainerWidget | undefined`）
+ multiTabsTeleportWidget：多标签 Teleport 组件实例。（`TeleportWidget | undefined`）
+ pairwiseRoutePage：路由变化前后的页面参数对比。（`{ oldPage: ViewActionQueryParameter | undefined; newPage: ViewActionQueryParameter | undefined }`）
+ reloadMainViewCallChaining：主视图重载链式调用对象（提供给下级）。（`CallChaining<void>`）
+ reloadMaskCallChaining：掩码重载链式调用对象（提供给下级）。（`CallChaining<void>`）
+ translateToolBox：国际化工具条虚拟节点。（`VNode | undefined`）

**方法**：

#### createMultiTabsContainerWidget

+ **功能描述**：创建多标签容器及 Teleport 组件。
+ **类型**：`() => void`

#### fetchRuntimeViewAction

+ **功能描述**：获取运行时视图动作（支持权限校验）。
+ **类型**：`(model: string, action: string | undefined, path?: string) => Promise<RuntimeViewAction>`
+ **参数**：
  - `model`：模型名称。
  - `action`：动作名称。
  - `path`：路由路径（可选）。
+ **返回值**：Promise，运行时视图动作实例。

#### initRuntimeContext

+ **功能描述**：初始化运行时上下文（判断是初始化还是刷新）。
+ **类型**：`(viewAction: RuntimeViewAction) => { isInit: boolean; isRefresh: boolean }`
+ **参数**：
  - `viewAction`：视图动作实例。
+ **返回值**：初始化状态对象。

#### reloadPage

+ **功能描述**：重载页面（处理路由变化、国际化、权限等逻辑）。
+ **类型**：`(oldPage?: ViewActionQueryParameter, newPage: ViewActionQueryParameter) => Promise<void>`
+ **参数**：
  - `oldPage`：旧页面参数（可选）。
  - `newPage`：新页面参数。

#### renderMask

+ **功能描述**：渲染掩码模板并触发链式调用。
+ **类型**：`(viewAction: RuntimeViewAction, oldPage?: ViewActionQueryParameter, newPage: ViewActionQueryParameter) => Promise<void>`
+ **参数**：
  - `viewAction`：视图动作实例。
  - `oldPage`：旧页面参数（可选）。
  - `newPage`：新页面参数。

#### renderMainView

+ **功能描述**：渲染主视图并触发链式调用。
+ **类型**：`(oldPage?: ViewActionQueryParameter, newPage: ViewActionQueryParameter) => Promise<void>`
+ **参数**：
  - `oldPage`：旧页面参数（可选）。
  - `newPage`：新页面参数。

#### watchRoute

+ **功能描述**：监听路由变化并触发页面重载流程。
+ **类型**：`() => void`

### 3、DefaultMainViewWidget

**继承**：MetadataViewWidget

**属性**：

+ loading：主视图加载状态。（`boolean | undefined`）
+ multiTabsContainerWidget：多标签容器组件实例。（`MultiTabsContainerWidget | undefined`）
+ multiTabsTeleportWidget：多标签 Teleport 组件实例。（`TeleportWidget | undefined`）
+ reloadMainViewCallChaining：主视图重载链式调用对象。（`CallChaining | undefined`）
+ teleportTarget：Teleport 目标元素选择器。（`string | undefined`）

**方法**：

#### dispose

+ **功能描述**：销毁组件。
+ **类型**：`() => void`

#### getMultiTabsTeleportWidget

+ **功能描述**：获取多标签 Teleport 组件，设置渲染目标。
+ **类型**：`() => TeleportWidget | undefined`

#### getUrlParameters

+ **功能描述**：获取 URL 查询参数（覆盖父类方法）。
+ **类型**：`() => UrlQueryParameters`
+ **返回值**：URL 参数对象（从路由匹配参数中获取）。

#### reloadRuntimeContext

+ **功能描述**：根据句柄重新加载运行时上下文。
+ **类型**：`(handle: string) => void`
+ **参数**：
  - `handle`：组件句柄。

### 4、MultiTabsContainerWidget

**继承**：DslDefinitionWidget

**属性**：

+ disabledCache：是否禁用缓存。（`boolean`）
+ isEnabledHomepage：是否启用应用首页标签页（模块首页优先）。（`boolean`）
+ isEnabledModuleHomepage：是否启用模块首页标签页。（`boolean`）
+ loading：加载状态标识。（`boolean`）
+ maxCacheCount：最大缓存标签页数，优先使用组件配置，否则取全局值。（`number`）
+ maxCount：最大标签页数，优先使用组件配置，否则取全局值。（`number | undefined`）
+ menuNodes：菜单树节点列表。（`TreeNode<RuntimeMenu>[]`）
+ module：当前模块信息。（`IModule | undefined`）
+ multiTabConfig：多标签配置（从系统主配置中获取并动态更新）。（`SystemStyleMultiTabConfig | undefined`）
+ reloadMainViewCallChaining：主视图重载链式调用对象。（`CallChaining | undefined`）
+ tabs：选项卡列表。（`MultiTabItem[]`）

**方法**：

#### appendEnterTab

+ **功能描述**：添加入口选项卡到列表。
+ **类型**：`(enterTab: MultiTabItem, parameter?: ViewActionQueryParameter) => void`
+ **参数**：
  - `enterTab`：要添加的选项卡项。
  - `parameter`：URL 参数（可选）。

#### createTabContainerWidget

+ **功能描述**：创建选项卡容器组件。
+ **类型**：`(instanceOrKey: string | MultiTabInstance, runtimeContext: RuntimeContext) => MultiTabContainerWidget`
+ **参数**：
  - `instanceOrKey`：实例或实例键。
  - `runtimeContext`：运行时上下文。
+ **返回值**：选项卡容器组件实例。

#### executeMaxCacheCount

+ **功能描述**：执行最大缓存数限制逻辑。
+ **类型**：`(maxCacheCount: number) => void`
+ **参数**：
  - `maxCacheCount`：最大缓存数量。

#### executeMaxCount

+ **功能描述**：执行最大选项卡数限制逻辑。
+ **类型**：`(maxCount: number) => void`
+ **参数**：
  - `maxCount`：最大选项卡数量。

#### findEnterTab

+ **功能描述**：查找指定动作的选项卡。
+ **类型**：`(action: RuntimeViewAction, parameter?: ViewActionQueryParameter) => MultiTabItem | undefined`
+ **参数**：
  - `action`：视图动作。
  - `parameter`：URL 参数（可选）。
+ **返回值**：匹配的选项卡项或 `undefined`。

#### fetchMenuNodes

+ **功能描述**：获取模块菜单树节点。
+ **类型**：`(moduleName: string) => Promise<TreeNode<RuntimeMenu>[]>`
+ **参数**：
  - `moduleName`：模块名称。
+ **返回值**：菜单树节点列表。

#### generatorTabItem

+ **功能描述**：生成选项卡项。
+ **类型**：`(type: MultiTabType, action: RuntimeViewAction, parameters?: ViewActionQueryParameter) => MultiTabItem`
+ **参数**：
  - `type`：选项卡类型。
  - `action`：视图动作。
  - `parameters`：URL 参数（可选）。
+ **返回值**：选项卡项。

#### getMultiTabType

+ **功能描述**：获取选项卡类型（首页 / 模块首页 / 普通）。
+ **类型**：`(moduleModule: string, model: string, name: string) => Promise<MultiTabType>`
+ **参数**：
  - `moduleModule`：模块名。
  - `model`：模型名。
  - `name`：动作名。
+ **返回值**：选项卡类型。

#### initHomepageTab

+ **功能描述**：初始化首页选项卡。
+ **类型**：`(module?: string) => Promise<MultiTabItem>`
+ **参数**：
  - `module`：模块名（可选，默认应用首页）。
+ **返回值**：首页选项卡项。

#### initMultiTabs

+ **功能描述**：初始化多标签页（处理首页逻辑）。
+ **类型**：`() => Promise<void>`

#### isEnabled

+ **功能描述**：判断多标签功能是否启用（支持模块级过滤）。
+ **类型**：`(module?: string) => boolean`
+ **参数**：
  - `module`：模块名称（可选，用于模块级过滤）。
+ **返回值**：是否启用多标签。

#### joinActiveTab

+ **功能描述**：加入当前激活的选项卡并更新参数。
+ **类型**：`(viewAction: RuntimeViewAction, currentPage: ViewActionQueryParameter) => { tabItem: MultiTabItem; isUsingCache: boolean }`
+ **参数**：
  - `viewAction`：视图动作。
  - `currentPage`：当前 URL 参数。
+ **返回值**：激活的选项卡项及是否使用缓存标识。

#### onModuleChange

+ **功能描述**：模块变更时的回调（重置多标签状态）。
+ **类型**：`(moduleName: string) => Promise<void>`
+ **参数**：
  - `moduleName`：新模块名称。

#### refreshRuntimeContext

+ **功能描述**：刷新运行时上下文并更新选项卡。
+ **类型**：`(handle: string, currentPage: ViewActionQueryParameter, menuUrlParameters?: MenuUrlParameters) => void`
+ **参数**：
  - `handle`：组件句柄。
  - `currentPage`：当前 URL 参数。
  - `menuUrlParameters`：菜单参数（可选）。

#### setActiveTabItem

+ **功能描述**：设置激活的选项卡组件。
+ **类型**：`(tab: MultiTabItem) => void`
+ **参数**：
  - `tab`：选项卡项。

#### setLoading

+ **功能描述**：设置加载状态。
+ **类型**：`(loading: boolean) => void`
+ **参数**：
  - `loading`：加载状态值。

#### getSortedTabs

+ **功能描述**：获取按创建时间排序的普通选项卡列表。
+ **类型**：`() => MultiTabItem[]`
+ **返回值**：排序后的选项卡数组。

### 5、MultiTabContainerWidget

**继承**：MetadataViewWidget

**属性**：

+ instance：多标签实例，包含标签页状态、栈信息等。（`MultiTabInstance`）

**方法**：

#### onRefresh

+ **功能描述**：刷新标签页运行时上下文。
+ **类型**：`(handle?: string) => void`
+ **参数**：
  - `handle`：运行时上下文句柄（可选，默认使用当前组件句柄）。







