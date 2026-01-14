---
title: Action
index: true
category:
  - 研发手册
  - Reference
  - 前端API
  - Widget
order: 9

---
在 Oinone Kunlun 中，动作是非常重要的一类元数据，动作组件涵盖了所有用户可能进行的操作，在 Oinone 中，将所有用户可能的操作分为了四类：

+ 跳转动作（ViewAction）：点击后将在应用内进行页面跳转。
+ 链接跳转（UrlAction）：点击后将跳转到指定的URL，相当于 `window.open` 。
+ 提交动作（ServerAction）：向后端发起请求，拿到返回结果后进行处理。
+ 客户端动作（ClientAction）：仅用于前端交互。理论来说，它可以做任何事情。

针对每一种动作我们都有一些内置组件为系统正常运行提供支持，但对于复杂多样的业务场景来说，我们内置的标准交互流程可能无法覆盖全部场景，此时，我们需要通过自定义对一些动作的行为做出修改，让它在点击前或者点击后做一些额外的事情，或者替换整个动作在点击后的效果。

# 一、动作组件的注册

## （一）动作组件的注册可选项

```typescript
/**
 * Action组件注册可选项
 */
export interface BaseActionOptions extends SPIOptions {
  /**
   * 指定动作类型
   */
  actionType?: ActionType | ActionType[];
  /**
   * 指定跳转动作路由类型
   */
  target?: ViewActionTarget | string | string[];
  /**
   * 指定动作名称
   */
  name?: string | string[];
  /**
   * 指定模型
   */
  model?: string[] | string;
  /**
   * 指定视图类型
   */
  viewType?: ViewType | ViewType[];
  /**
   * 指定视图名称
   */
  viewName?: string | string[];
  /**
   * 指定组件名称或别称
   */
  widget?: string[] | string;
}
```

从上述类型声明中不难发现，其分类维度涵盖以下多个方面：动作类型、路由类型（仅跳转动作可用）、动作名称、模型编码、视图类型以及视图名称。这些维度用于描述组件的使用位置。一般而言，位置描述得越“精确”，在相应位置进行渲染时，该组件所具备的优先级也就越高。在完全相同的位置描述的情况下，后注册的组件会覆盖先注册的组件。

## （二）不同类型的动作组件

在 Oinone 中，我们对元数据中定义的四类动作都分别提供了内置组件，并实现了对应的功能。

下面是根据动作类型对一些组件还有基类进行了列举：

<table cellspacing="0" cellpadding="8" style="border-collapse: collapse; width: 100%; max-width: 1600px; margin: 20px auto;">
  <thead>
    <tr style="background-color: #f5f5f5;">
      <th style="text-align: left; font-weight: bold;">动作类型</th>
      <th style="text-align: left; font-weight: bold;">动作组件</th>
      <th style="text-align: left; font-weight: bold;">描述</th>
      <th style="text-align: left; font-weight: bold;">基类</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="4">ActionType.View</td>
      <td>RouterViewActionWidget</td>
      <td>在应用内进行页面跳转</td>
      <td>ViewActionWidget</td>
    </tr>
    <tr>
      <td>OpenWindowViewActionWidget</td>
      <td>在应用内通过打开新窗口进行页面跳转</td>
      <td>RouterViewActionWidget</td>
    </tr>
    <tr>
      <td>DialogViewActionWidget</td>
      <td>在应用内打开弹窗</td>
      <td rowspan="2">PopupActionWidget</td>
    </tr>
    <tr>
      <td>DrawerViewActionWidget</td>
      <td>在应用内打开抽屉</td>
    </tr>
    <tr>
      <td>ActionType.URL</td>
      <td>UrlActionWidget</td>
      <td>跳转到指定的URL</td>
      <td rowspan="8">ActionWidget</td>
    </tr>
    <tr>
      <td>ActionType.Server</td>
      <td>ServerActionWidget</td>
      <td>向后端发起请求，拿到返回结果后进行处理</td>
    </tr>
    <tr>
      <td rowspan="6">ActionType.Client</td>
      <td>ValidateFormActionWidget</td>
      <td>数据校验，触发表单字段校验</td>
    </tr>
    <tr>
      <td>BackActionWidget</td>
      <td>在应用内使用合适的方式返回</td>
    </tr>
    <tr>
      <td>ReloadViewActionWidget</td>
      <td>刷新数据</td>
    </tr>
    <tr>
      <td>DeleteOneActionWidget</td>
      <td>删除数据</td>
    </tr>
    <tr>
      <td>TableAddOneAction</td>
      <td>添加一行数据</td>
    </tr>
    <tr>
      <td>TableCopyOneAction</td>
      <td>复制一行数据</td>
    </tr>
  </tbody>
</table>

## （三）注册组件

与其他组件的注册方式不同，动作组件通常根据模型的动作名称进行组件的替换，而不是通过 `widget` 属性进行指定。

### 1、通过模型和动作名称替换组件

以国家分组表格上创建跳转动作为例，通过指定 `model` 和 `name` 属性对指定动作进行替换：

```typescript
@SPI.ClassFactory(
  ActionWidget.Token({
    actionType: ActionType.View,
    target: ViewActionTarget.Router,
    model: 'resource.ResourceCountryGroup',
    name: 'redirectCreatePage'
  })
)
export class CustomRouterViewActionWidget extends RouterViewActionWidget {
  ...
}
```

### 2、通过视图名称和动作名称替换组件

以国家分组表格上创建跳转动作为例，通过指定 `viewName` 和 `name` 属性对指定动作进行替换：

```typescript
@SPI.ClassFactory(
  ActionWidget.Token({
    actionType: ActionType.View,
    target: ViewActionTarget.Router,
    viewName: '国家分组table',
    name: 'redirectCreatePage'
  })
)
export class CustomRouterViewActionWidget extends RouterViewActionWidget {
  ...
}
```

# 二、Reference List

## （一）抽象基类

### 1、ActionWidget

**继承**： BaseActionWidget

**属性**：

+ actionDomain：当前动作 domain，支持动态解析。（`string | undefined`）
+ allInvisible：是否全部不可见。（默认 `false`）（`boolean | undefined`）
+ bizStyle：业务样式。（默认 `default`）（`string`）
+ buttonType：按钮类型（可选）。（`string | undefined`）
+ cancelText：取消按钮文本（可选）。（`string | undefined`）
+ closeAllDialog：是否关闭所有弹窗（默认 `false`）。（`boolean`）
+ closeAllDrawer：是否关闭所有抽屉（默认 `false`）。（`boolean`）
+ closeDialog：是否关闭弹窗（默认与 `isDialog` 一致）。（`boolean`）
+ closeDrawer：是否关闭抽屉（默认与 `isDrawer` 一致）。（`boolean`）
+ confirm：二次确认内容（仅当 `confirmType` 为 `POPPER` 时生效）。（`string | undefined`）
+ confirmPosition：确认框位置（默认 `BM`）。（`PopconfirmPlacement`）
+ confirmText：二次确认文本（可选）。（`string | undefined`）
+ confirmTitle：确认框标题（默认 `昆仑通用提示`）。（`string | undefined`）
+ disabled：按钮禁用状态。（`boolean`）
+ disabledTitle：禁用状态提示文本。（`string`）
+ enableConfirm：是否启用二次确认（支持表达式）。（`boolean`）
+ enterText：确认按钮文本（可选）。（`string | undefined`）
+ goBack：是否返回（默认 `false`）。（`boolean`）
+ help：帮助信息。（`string | undefined`）
+ icon：按钮图标（可选）。（`string | undefined`）
+ keyboardConfig：键盘配置（可选）。（`ActionKeyboardConfig | undefined`）
+ label：按钮标签。（`string`）
+ nextActionComponent：下一个动作组件（可选）。（`Component | undefined`）
+ nextButtonType：下一个按钮类型（可选）。（`string | undefined`）
+ nextOperatorColumnButtonType：下一个操作列按钮类型（可选）。（`string | undefined`）
+ operatorColumnButtonType：操作列按钮类型（可选）。（`string | undefined`）
+ refreshData：是否刷新当前视图数据（默认 `true`）。（`boolean`）
+ refreshRoot：是否刷新主视图数据（默认 `false`）。（`boolean`）
+ searchBody：搜索主体数据（可选）。（`ActiveRecord | undefined`）
+ searchConditions：搜索表达式数组（可选）。（`QueryExpression[] | undefined`）
+ type：按钮类型（默认 `primary`）。（`string`）
+ validateForm：是否校验表单（默认 `false`）。（`boolean`）
+ variables：动态变量。（`Record<string, unknown>`）
+ visibleConfirm：二次确认框可见状态。（`boolean`）
+ viewFilter：视图过滤条件（可选）。（`string | undefined`）

**方法**：

#### **buildContext**

+ **功能描述**：构建动作上下文，合并 DSL 上下文和视图上下文。
+ **类型**：`(activeRecord?: ActiveRecord) => Record<string, unknown> | undefined`
+ **参数**：
  - `activeRecord`：可选指定上下文的记录。
+ **返回值**：合并后的上下文对象。

#### **buildSearchConditions**

+ **功能描述**：构建搜索条件，支持合并父级过滤和搜索运行时上下文。
+ **类型**：`(record?: ActiveRecord, concatParentFilter?: boolean) => { runtimeContext: RuntimeContext; condition: Condition | undefined } | undefined`
+ **参数**：
  - `record`：可选自定义扩展数据。
  - `concatParentFilter`：是否拼接父级过滤条件（默认 `true`）。
+ **返回值**：包含运行时上下文和条件的对象。

#### **click**

+ **功能描述**：手动触发按钮点击，执行验证和点击逻辑。
+ **类型**：`(...args: unknown[]) => Promise<ClickResult>`
+ **参数**：
  - `args`：自定义参数。
+ **返回值**：点击结果。

#### **clickAction**

+ **功能描述**：原始动作点击方法，可被子类重写。
+ **类型**：`(...args: unknown[]) => ReturnPromise<ClickResult>`
+ **参数**：
  - `args`：自定义参数。
+ **返回值**：点击结果 Promise。

#### **clickActionAfter**

+ **功能描述**：动作点击后的处理逻辑，可被子类重写。
+ **类型**：`(result: ClickResult) => ReturnPromise<ClickResult>`
+ **参数**：
  - `result`：点击结果。
+ **返回值**：处理后的点击结果 Promise。

#### **executeExpression**

+ **功能描述**：执行动态表达式，支持获取上下文数据。
+ **类型**：`(expression: string, errorValue?: T) => T | string | undefined`
+ **参数**：
  - `expression`：待执行的表达式。
  - `errorValue`：可选表达式执行失败时的返回值。
+ **返回值**：表达式执行结果。

#### **executeExpressionByParameters**

+ **功能描述**：带参数执行动态表达式，支持自定义上下文参数。
+ **类型**：`(parameters: Partial<ExpressionRunParam>, expression: string, errorValue?: T) => T | string | undefined`
+ **参数**：
  - `parameters`：自定义上下文参数。
  - `expression`：待执行的表达式。
  - `errorValue`：可选表达式执行失败时的返回值。
+ **返回值**：表达式执行结果。

#### **executeSearchExpression**

+ **功能描述**：执行搜索表达式，解析动态值。
+ **类型**：`(searchWidget: BaseView, expression: string) => string | undefined`
+ **参数**：
  - `searchWidget`：搜索组件实例。
  - `expression`：待执行的搜索表达式。
+ **返回值**：解析后的表达式结果。

#### **getSearchRsqlAndQueryParams**

+ **功能描述**：获取搜索的 RSQL 和查询参数，支持合并条件和父级过滤。
+ **类型**：`(record?: ActiveRecord, concatParentFilter?: boolean) => { rsql: string; queryData: object; condition: Condition | string; queryDataToString: () => string }`
+ **参数**：
  - `record`：可选自定义扩展数据。
  - `concatParentFilter`：是否拼接父级过滤条件（默认 `true`）。
+ **返回值**：包含 RSQL、查询数据、条件和序列化方法的对象。

#### **invisibleProcess**

+ **功能描述**：处理不可见状态，支持表达式动态计算。
+ **类型**：`(invisible: boolean | string) => boolean | undefined`
+ **参数**：
  - `invisible`：不可见状态（布尔值或表达式）。
+ **返回值**：最终不可见状态。

#### **mergeContext**

+ **功能描述**：合并上下文到记录中，处理 DSL 和视图上下文。
+ **类型**：`(activeRecords?: ActiveRecords) => ActiveRecords | undefined`
+ **参数**：
  - `activeRecords`：可选记录数组。
+ **返回值**：合并上下文后的记录数组。

#### **startKeyboardEvent**

+ **功能描述**：启动键盘事件监听。
+ **类型**：`() => void`

#### **stopKeyboardEvent**

+ **功能描述**：停止键盘事件监听。
+ **类型**：`() => void`

#### **subscribeKeyboardEvent**

+ **功能描述**：订阅键盘事件，根据配置监听指定按键。
+ **类型**：`() => void`

#### **unsubscribeKeyboardEvent**

+ **功能描述**：取消订阅键盘事件。
+ **类型**：`() => void`

#### **validateAndClick**

+ **功能描述**：验证并执行点击逻辑，包含表单校验和二次确认。
+ **类型**：`(...args: unknown[]) => Promise<ClickResult>`
+ **参数**：
  - `args`：自定义参数。
+ **返回值**：点击结果 Promise。

#### **validateConfirm**

+ **功能描述**：验证二次确认框状态，根据配置显示确认模态框。
+ **类型**：`() => Promise<boolean>`
+ **返回值**：是否通过确认校验的 Promise。

#### **validator**

+ **功能描述**：执行验证逻辑，触发生命周期通知。
+ **类型**：`(sendErrorMessage?: boolean) => Promise<boolean>`
+ **参数**：
  - `sendErrorMessage`：是否发送错误消息（默认 `false`）。
+ **返回值**：验证结果 Promise。

#### **validatorForm**

+ **功能描述**：校验表单，仅当 `validateForm` 为 `true` 时执行。
+ **类型**：`() => Promise<boolean>`
+ **返回值**：表单校验结果 Promise。

### 2、PopupActionWidget

**继承**： ViewActionWidget

**属性**：

+ currentOpenerActiveRecords：当前弹窗的选中记录。（`ActiveRecord[] | undefined`）
+ currentOpenerDataSource：当前弹窗的数据源。（`ActiveRecord[] | undefined`）
+ currentViewDslNode：当前视图的 DSL 节点。（`DslDefinition | null | undefined`）
+ defaultSubviewType：默认子视图类型。（默认 `ViewType.Form`）（`ViewType`）
+ metadataSubviewWidget：元数据子视图组件。（`MetadataViewWidget | undefined`）
+ popupDslDefinition：弹窗 DSL 定义。（`PopupDslDefinition | null | undefined`）
+ popupViewDslNode：弹窗视图的 DSL 节点。（`DslDefinition | undefined`）
+ subviewModel：子视图模型。（`string`）
+ subviewModelName：子视图模型名称。（`string`）
+ subviewModule：子视图模块。（`string | undefined`）
+ subviewModuleName：子视图模块名称。（`string`）
+ subviewRuntimeContext：子视图运行时上下文。（`RuntimeContext | undefined`）
+ subviewType：子视图类型。（`ViewType`）
+ viewMode：视图模式。（`ViewMode`）

**方法**：

#### **clickAction**

+ **功能描述**：点击动作的处理逻辑，生成弹窗组件。
+ **类型**：`(...args: unknown[]) => Promise<ClickResult>`
+ **参数**：
  - `args`：自定义参数。
+ **返回值**：操作结果 Promise。

#### **computeViewMode**

+ **功能描述**：计算视图模式，基于子视图类型和上下文类型。
+ **类型**：`(action: RuntimeViewAction) => ViewMode`
+ **参数**：
  - `action`：运行时视图动作。
+ **返回值**：计算后的视图模式。

#### **createMetadataSubviewWidget**

+ **功能描述**：创建元数据子视图组件。
+ **类型**：`() => MetadataViewWidget`
+ **返回值**：创建的元数据子视图组件。

#### **executeExpression**

+ **功能描述**：执行表达式，支持获取上下文数据。
+ **类型**：`(expression: string, errorValue?: T) => string | T | undefined`
+ **参数**：
  - `expression`：待执行的表达式。
  - `errorValue`：可选的错误返回值。
+ **返回值**：表达式执行结果。

#### **generatorPopupDslDefinition**

+ **功能描述**：生成弹窗 DSL 定义。
+ **类型**：`() => Promise<PopupDslDefinition | undefined>`
+ **返回值**：生成的弹窗 DSL 定义 Promise。

#### **generatorPopupWidget**

+ **功能描述**：生成弹窗组件，包括初始化子视图和创建弹窗。
+ **类型**：`() => Promise<void>`

#### **getViewDsl**

+ **功能描述**：获取视图 DSL 节点。
+ **类型**：`() => ReturnPromise<DslDefinition | undefined>`
+ **返回值**：视图 DSL 节点。

#### **getViewLayout**

+ **功能描述**：获取视图布局（默认返回 `undefined`）。
+ **类型**：`() => ReturnPromise<DslDefinition | undefined>`
+ **返回值**：视图布局。

#### **getViewTemplate**

+ **功能描述**：获取视图模板（默认返回 `undefined`）。
+ **类型**：`() => ReturnPromise<DslDefinition | undefined>`
+ **返回值**：视图模板。

#### **initSubview**

+ **功能描述**：初始化子视图，设置运行时上下文。
+ **类型**：`(popupDslDefinition: PopupDslDefinition, data: ActiveRecord[]) => void`
+ **参数**：
  - `popupDslDefinition`：弹窗 DSL 定义。
  - `data`：数据记录数组。

#### **initSubviewAfterProperties**

+ **功能描述**：初始化子视图后属性的钩子方法（默认空实现）。
+ **类型**：`() => void`

#### **isFetchData**

+ **功能描述**：判断是否通过弹窗中的组件自动获取数据。
+ **类型**：`(records: ActiveRecord[]) => boolean | undefined`
+ **参数**：
  - `records`：加载的数据记录。
+ **返回值**：是否自动获取数据。

#### **isNotNeedFetchData**

+ **功能描述**：判断是否不需要获取数据（单行动作场景）。
+ **类型**：`(records: ActiveRecord[], contextType: ActionContextType) => boolean`
+ **参数**：
  - `records`：数据记录数组。
  - `contextType`：上下文类型。
+ **返回值**：是否不需要获取数据。

#### **loadData**

+ **功能描述**：加载弹窗数据。
+ **类型**：`() => ReturnPromise<PopupLoadDataResult>`
+ **返回值**：加载的数据结果。

#### **onCancel**

+ **功能描述**：弹窗取消回调（默认返回 `true`）。
+ **类型**：`(parameters: PopupSubmitParameters) => boolean`
+ **参数**：
  - `parameters`：提交参数。
+ **返回值**：操作结果。

#### **onSubmit**

+ **功能描述**：弹窗提交回调，更新数据源。
+ **类型**：`(parameters: PopupSubmitParameters) => boolean`
+ **参数**：
  - `parameters`：提交参数。
+ **返回值**：操作结果。

#### **pushDataSourceForSubmit**

+ **功能描述**：提交时向数据源添加新记录。
+ **类型**：`(parameters: PopupSubmitParameters, predict?: PushActiveRecordsPredict) => void`
+ **参数**：
  - `parameters`：提交参数。
  - `predict`：可选的推送预测函数。

#### **updateDataSourceByEntityForSubmit**

+ **功能描述**：提交时通过实体更新数据源。
+ **类型**：`(parameters: PopupSubmitParameters, predict?: UpdateActiveRecordsByEntityPredict) => void`
+ **参数**：
  - `parameters`：提交参数。
  - `predict`：可选的更新预测函数。

### 3、AbstractTaskAction

**继承**： ServerActionWidget

**方法**：

#### **buildSearchConditions**

+ **功能描述**：构建搜索条件，解析搜索表达式并合并过滤条件。
+ **类型**：`() => { runtimeContext: RuntimeContext; condition: Condition } | undefined`
+ **返回值**：包含运行时上下文和条件的对象，或 `undefined`。

#### **createTask**

+ **功能描述**：抽象方法，创建任务（需子类实现）。
+ **类型**：`(searchRuntimeContext: RuntimeContext, task: T, condition: string | Condition) => Promise<T>`
+ **参数**：
  - `searchRuntimeContext`：搜索运行时上下文。
  - `task`：任务数据。
  - `condition`：条件。
+ **返回值**：创建的任务 Promise。

#### **doTask**

+ **功能描述**：执行任务，根据 `sync` 标志决定同步或异步处理。
+ **类型**：`(searchRuntimeContext: RuntimeContext, task: T, condition: Condition | string) => Promise<boolean>`
+ **参数**：
  - `searchRuntimeContext`：搜索运行时上下文。
  - `task`：任务数据。
  - `condition`：条件。
+ **返回值**：任务执行结果 Promise（成功 / 失败）。

#### **executeSearchExpression**

+ **功能描述**：执行搜索表达式，解析动态值。
+ **类型**：`(searchWidget: BaseView, expression: string) => string | undefined`
+ **参数**：
  - `searchWidget`：搜索组件实例。
  - `expression`：待执行的搜索表达式。
+ **返回值**：解析后的表达式结果。

#### **generatorGQLByTask**

+ **功能描述**：抽象方法，生成任务对应的 GQL 查询（需子类实现）。
+ **类型**：`(task: T, condition: string | Condition) => Promise<string>`
+ **参数**：
  - `task`：任务数据。
  - `condition`：条件。
+ **返回值**：生成的 GQL 字符串 Promise。

#### **getSessionPath**

+ **功能描述**：获取会话路径，优先使用动作或视图动作配置，否则调用全局方法。
+ **类型**：`() => string`
+ **返回值**：会话路径字符串。

#### **processResponseResult**

+ **功能描述**：处理任务响应结果，显示成功 / 错误通知。
+ **类型**：`(searchRuntimeContext: RuntimeContext, task: T, responseResult: boolean) => boolean`
+ **参数**：
  - `searchRuntimeContext`：搜索运行时上下文。
  - `task`：任务数据。
  - `responseResult`：任务执行结果。
+ **返回值**：处理后的结果（`true` 表示成功，`false` 表示失败）。

#### **seekParentMetadataRuntimeContext**

+ **功能描述**：查找父级元数据运行时上下文。
+ **类型**：`() => RuntimeContext | undefined`
+ **返回值**：父级元数据运行时上下文，或 `undefined`。

#### **seekSearchRuntimeContext**

+ **功能描述**：查找搜索运行时上下文（视图类型为 `Search`）。
+ **类型**：`() => RuntimeContext | undefined`
+ **返回值**：搜索运行时上下文，或 `undefined`。

## （二）跳转动作（ViewAction）

### 1、ViewActionWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  ActionWidget.Token({
    actionType: ActionType.View
  })
)
export class ViewActionWidget extends ActionWidget<RuntimeViewAction>
```

**方法**：

#### **clickAction**

+ **功能描述**：点击动作的处理逻辑，执行页面跳转。
+ **类型**：`() => ReturnPromise<ClickResult>`
+ **返回值**：操作结果 Promise。

### 2、RouterViewActionWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  ActionWidget.Token({
    actionType: ActionType.View,
    target: ViewActionTarget.Router
  })
)
export class RouterViewActionWidget extends ViewActionWidget
```

**属性**：

+ matched：当前匹配的路由信息。（`Matched | undefined`）
+ router：当前路由实例。（`Router | undefined`）

**方法**：

#### **clickAction**

+ **功能描述**：点击动作的处理逻辑，包括关闭弹窗、构建参数并执行动作。
+ **类型**：`() => Promise<void>`

#### **executeAction**

+ **功能描述**：执行动作，调用 `realExecuteAction` 方法。
+ **类型**：`(action: RuntimeViewAction, parameters: UrlQueryParameters) => void`
+ **参数**：
  - `action`：运行时视图动作。
  - `parameters`：URL 查询参数。

### 3、OpenWindowViewActionWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  ActionWidget.Token({
    actionType: ActionType.View,
    target: ViewActionTarget.OpenWindow
  })
)
export class OpenWindowViewActionWidget extends RouterViewActionWidget
```

**方法**：

#### **executeAction**

+ **功能描述**：执行动作，根据配置决定目标窗口并执行视图动作。
+ **类型**：`(action: RuntimeViewAction, parameters: UrlQueryParameters) => void`
+ **参数**：
  - `action`：运行时视图动作。
  - `parameters`：URL 查询参数。

### 4、DialogViewActionWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseActionWidget.Token({
    actionType: ActionType.View,
    target: ViewActionTarget.Dialog
  })
)
export class DialogViewActionWidget extends PopupActionWidget
```

**属性**：

+ dialog：对话框组件实例。（`DialogWidget | undefined`）

**方法**：

#### **createPopupWidget**

+ **功能描述**：创建弹窗组件，基于 DSL 定义初始化对话框，并绑定关闭事件。
+ **类型**：`(data: ActiveRecord[]) => void`
+ **参数**：
  - `data`：弹窗初始化数据数组。

#### **onCloseDialog**

+ **功能描述**：关闭对话框，释放资源并更新组件状态。
+ **类型**：`() => void`

### 5、DrawerViewActionWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseActionWidget.Token({
    actionType: ActionType.View,
    target: ViewActionTarget.Drawer
  })
)
export class DrawerViewActionWidget extends PopupActionWidget
```

**属性**：

+ drawer：抽屉组件实例。（`DrawerWidget | undefined`）

**方法**：

#### **createPopupWidget**

+ **功能描述**：创建抽屉组件，基于 DSL 定义初始化抽屉，并绑定关闭事件。
+ **类型**：`(data: ActiveRecord[]) => void`
+ **参数**：
  - `data`：抽屉初始化数据数组。

#### **onCloseDrawer**

+ **功能描述**：关闭抽屉，释放资源并更新组件状态。
+ **类型**：`() => void`

### 6、GotoM2MListDialogActionWidget

**类型声明**：

```typescript
@SPI.ClassFactory(ActionWidget.Token({ name: ModelDefaultActionName.$$internal_GotoM2MListDialog }))
export class GotoM2MListDialogActionWidget extends DialogViewActionWidget
```

**属性**：

+ label：动作标签，优先从 DSL、动作配置获取，默认「添加」。（`string`）

### 7、GotoO2MCreateDialogActionWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  ActionWidget.Token({
    name: ModelDefaultActionName.$$internal_GotoO2MCreateDialog
  })
)
export class GotoO2MCreateDialogActionWidget extends DialogViewActionWidget
```

**属性**：

+ label：动作标签，优先从 DSL、动作配置获取，默认「创建」。（`string`）

### 8、GotoO2MEditDialogActionWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  ActionWidget.Token({
    name: ModelDefaultActionName.$$internal_GotoO2MEditDialog
  })
)
export class GotoO2MEditDialogActionWidget extends DialogViewActionWidget
```

**属性**：

+ label：动作标签，优先从 DSL、动作配置获取，默认「编辑」。（`string`）

## （三）提交动作（ServerAction）

### 1、ServerActionWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  ActionWidget.Token({
    actionType: ActionType.Server
  })
)
export class ServerActionWidget extends ActionWidget<RuntimeServerAction>
```

**属性**：

+ formValidateCallChaining：表单验证链式调用实例。（`CallChaining<FormValidateResult[]> | undefined`）
+ reloadFormData$：刷新表单数据的响应式主题。（`WidgetSubjection<boolean>`）
+ submitData：是否提交数据。（默认 `false`）（`boolean`）
+ updateData：是否更新数据。（默认 `false`）（`boolean`）
+ updateActionName：默认更新动作名称。（`string`）
+ updateOneWithRelationName：默认关联更新动作名称。（`string`）

**方法**：

#### **clickAction**

+ **功能描述**：处理点击动作，执行提交和动作逻辑，捕获错误并处理表单验证结果。
+ **类型**：`() => Promise<ClickResult>`

#### **clickActionAfter**

+ **功能描述**：点击动作后的处理逻辑，处理弹窗关闭、页面回退及数据刷新。
+ **类型**：`(result: ClickResult) => Promise<ClickResult>`
+ **参数**：
  - `result`：点击动作执行结果。

#### **clickActionAfterRefreshData**

+ **功能描述**：点击动作后的数据刷新逻辑，处理提交数据、刷新根视图或当前视图。
+ **类型**：`(result: ClickResult, refreshParent?: boolean) => Promise<ClickResult>`
+ **参数**：
  - `result`：点击动作执行结果。
  - `refreshParent`：是否刷新父级视图（默认 `false`）。

#### **convertFormValidateResults**

+ **功能描述**：将 HTTP 错误转换为表单验证结果数组。
+ **类型**：`(e: HttpClientError) => FormValidateResult[]`
+ **参数**：
  - `e`：HTTP 错误对象。
+ **返回值**：表单验证结果数组。

#### **executeAction**

+ **功能描述**：执行服务器动作，根据动作类型调用普通执行或关联更新逻辑。
+ **类型**：`(action: RuntimeServerAction, submitValue: SubmitValue) => Promise<ClickResult>`
+ **参数**：
  - `action`：运行时服务器动作。
  - `submitValue`：提交值对象。

#### **executeFunction**

+ **功能描述**：执行函数定义，合并上下文并调用函数服务。
+ **类型**：`<T>(functionDefinition: RuntimeFunctionDefinition, requestFields: RequestModelField[], activeRecords?: ActiveRecords) => Promise<T>`
+ **参数**：
  - `functionDefinition`：运行时函数定义。
  - `requestFields`：请求模型字段数组。
  - `activeRecords`：可选的激活记录数组。
+ **返回值**：函数执行结果 Promise。

#### **executeRefreshData**

+ **功能描述**：执行数据刷新，触发刷新链式调用。
+ **类型**：`(refreshParent: boolean) => void`
+ **参数**：
  - `refreshParent`：是否刷新父级数据。

#### **executeRefreshRoot**

+ **功能描述**：刷新根视图，查找并触发根运行时上下文的刷新逻辑。
+ **类型**：`() => void`

#### **executeRelationUpdate**

+ **功能描述**：执行关联更新操作，调用关联更新服务。
+ **类型**：`<T>(requestFields: RequestModelField[], submitValue: SubmitValue) => Promise<T>`
+ **参数**：
  - `requestFields`：请求模型字段数组。
  - `submitValue`：提交值对象。
+ **返回值**：关联更新结果 Promise。

#### **executeSubmitData**

+ **功能描述**：执行提交数据逻辑，调用 `onSubmit` 方法处理结果。
+ **类型**：`(result: ClickResult) => Promise<ClickResult>`
+ **参数**：
  - `result`：点击动作执行结果。

#### **findRefreshRootRuntimeContext**

+ **功能描述**：查找用于刷新的根运行时上下文。
+ **类型**：`() => RuntimeContext | undefined`
+ **返回值**：根运行时上下文或 `undefined`。

#### **formValidateProcess**

+ **功能描述**：处理表单验证错误，触发表单验证链式调用。
+ **类型**：`(e: HttpClientError) => void`
+ **参数**：
  - `e`：HTTP 错误对象。

#### **getRequestModelFields**

+ **功能描述**：获取请求模型字段，根据视图类型或弹窗场景查找上下文。
+ **类型**：`(options?: GetRequestModelFieldsOptions) => Promise<RequestModelField[]>`
+ **参数**：
  - `options`：可选的获取字段选项。
+ **返回值**：请求模型字段数组 Promise。

#### **historyBack**

+ **功能描述**：执行页面回退操作，调用路由导航。
+ **类型**：`() => void`

#### **submit**

+ **功能描述**：提交数据，处理不同上下文类型的记录格式，生成提交值对象。
+ **类型**：`(action: RuntimeServerAction) => Promise<SubmitValue>`
+ **参数**：
  - `action`：运行时服务器动作。
+ **返回值**：提交值对象 Promise。

#### **usingDiffUpdate**

+ **功能描述**：判断是否使用差异更新，根据关联更新类型或关系记录长度。
+ **类型**：`(parameters: SubmitValue) => boolean`
+ **参数**：
  - `parameters`：提交值对象。
+ **返回值**：是否使用差异更新。

### 2、BatchUpdateAction

**类型声明**：

```typescript
@SPI.ClassFactory(
  ActionWidget.Token({
    name: ModelDefaultActionName.$$internal_BatchUpdate
  })
)
export class BatchUpdateAction extends ServerActionWidget
```

**属性**：

+ disabled：表示该动作是否禁用。（`boolean`）

**方法**：

#### **executeAction**

+ **功能描述**：执行操作。
+ **类型**：`(action: RuntimeServerAction, submitValue: SubmitValue) => Promise<ClickResult>`
+ **参数**：
  - `action`：运行时服务器动作。
  - `submitValue`：提交的值。
+ **返回值**：点击结果。

#### **submit**

+ **功能描述**：提交数据。
+ **类型**：`(action: RuntimeServerAction) => Promise<SubmitValue>`
+ **参数**：
  - `action`：运行时服务器动作。
+ **返回值**：提交结果。

### 3、ExportWorkbookActionWidget

**类型声明**：

```typescript
@SPI.ClassFactory(ActionWidget.Token({ name: ModelDefaultActionName.$$internal_ExportWorkbook }))
export class ExportWorkbookActionWidget extends AbstractTaskAction<ExcelExportTask>
```

**属性**：

+ moduleName：文件模块名称。（`string`）
+ sync：是否同步导出。（`boolean`）

**方法**：

#### **createTask**

+ **功能描述**：创建 Excel 导出任务。
+ **类型**：`(searchRuntimeContext: RuntimeContext, task: ExcelExportTask, condition: string | Condition) => Promise<ExcelExportTask>`
+ **参数**：
  - `searchRuntimeContext`：搜索运行时上下文。
  - `task`：Excel 导出任务。
  - `condition`：查询条件。

#### **doTaskByPrepare**

+ **功能描述**：通过准备阶段执行导出任务。
+ **类型**：`(searchRuntimeContext: RuntimeContext, task: ExcelExportTask, condition: Condition | string) => Promise<ClickResult>`
+ **参数**：
  - `searchRuntimeContext`：搜索运行时上下文。
  - `task`：Excel 导出任务。
  - `condition`：查询条件。

#### **executeAction**

+ **功能描述**：执行导出动作，根据不同导出方法创建任务。
+ **类型**：`(action: RuntimeServerAction, parameters: SubmitValue) => Promise<ClickResult>`
+ **参数**：
  - `action`：运行时服务器动作。
  - `parameters`：提交值。

#### **generatorGQLByTask**

+ **功能描述**：生成创建导出任务的 GraphQL 查询。
+ **类型**：`(task: ExcelExportTask, condition: string | Condition) => Promise<string>`
+ **参数**：
  - `task`：Excel 导出任务。
  - `condition`：查询条件。

#### **generatorGQLByTaskByPrepare**

+ **功能描述**：生成基于准备阶段的 GraphQL 查询。
+ **类型**：`(requestId: string) => Promise<string>`
+ **参数**：
  - `requestId`：请求 ID。

#### **getSessionPath**

+ **功能描述**：获取会话路径。
+ **类型**：`() => string`

#### **getWorkbookId**

+ **功能描述**：获取工作簿 ID。
+ **类型**：`() => ReturnPromise<string | undefined>`

### 4、ImportWorkbookActionWidget

**类型声明**：

```typescript
@SPI.ClassFactory(ActionWidget.Token({ name: ModelDefaultActionName.$$internal_ImportWorkbook }))
export class ImportWorkbookActionWidget extends ServerActionWidget
```

**属性**：

+ list：导入数据列表。（`Record<string, any>[]`）

**方法**：

#### **executeAction**

+ **功能描述**：执行导入动作，根据字段类型处理不同的导入逻辑。
+ **类型**：`(action: RuntimeServerAction, parameters: SubmitValue) => Promise<ClickResult>`
+ **参数**：
  - `action`：运行时服务器动作。
  - `parameters`：提交值。

#### **executeWithTableField**

+ **功能描述**：执行表格字段的导入任务。
+ **类型**：`({ workbookId, fileId, fileUrl, ttype }: { workbookId: string; fileId: string; fileUrl: string; ttype: ModelFieldType }) => Promise<void>`
+ **参数**：
  - `workbookId`：工作簿 ID。
  - `fileId`：文件 ID。
  - `fileUrl`：文件 URL。
  - `ttype`：字段类型。

#### **getSessionPath**

+ **功能描述**：获取会话路径。
+ **类型**：`() => string`

#### **getWorkbookId**

+ **功能描述**：获取工作簿 ID。
+ **类型**：`() => ReturnPromise<string | undefined>`

### 5、PrintPdfDocumentActionWidget

**类型声明**：

```typescript
@SPI.ClassFactory(ActionWidget.Token({ name: ModelDefaultActionName.$$internal_PrintPdfDocument }))
export class PrintPdfDocumentActionWidget extends AbstractTaskAction<PdfPrintTask>
```

**属性**：

+ moduleName：打印模块名称。（`string`）
+ sync：是否同步打印。（`boolean`）

**方法**：

#### **createTask**

+ **功能描述**：创建 PDF 打印任务。
+ **类型**：`(runtimeContext: RuntimeContext, task: PdfPrintTask, condition: string | Condition) => Promise<PdfPrintTask>`
+ **参数**：
  - `runtimeContext`：运行时上下文。
  - `task`：PDF 打印任务。
  - `condition`：查询条件。

#### **executeAction**

+ **功能描述**：执行打印动作，构建任务并调用执行逻辑。
+ **类型**：`(action: RuntimeServerAction, parameters: SubmitValue) => Promise<ClickResult>`
+ **参数**：
  - `action`：运行时服务器动作。
  - `parameters`：提交值。

#### **generatorGQLByTask**

+ **功能描述**：生成创建打印任务的 GraphQL 查询。
+ **类型**：`(task: PdfPrintTask, condition: string | Condition) => Promise<string>`
+ **参数**：
  - `task`：PDF 打印任务。
  - `condition`：查询条件。

#### **getDocumentDefinitionId**

+ **功能描述**：获取 PDF 文档定义 ID。
+ **类型**：`() => ReturnPromise<string | undefined>`

## （四）链接动作（UrlAction）

### 1、UrlActionWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  ActionWidget.Token({
    actionType: ActionType.URL
  })
)
export class UrlActionWidget extends ActionWidget<RuntimeUrlAction>
```

**方法**：

#### **clickAction**

+ **功能描述**：点击动作的处理逻辑，获取 URL 并执行动作。
+ **类型**：`() => Promise<void>`

#### **executeAction**

+ **功能描述**：根据目标类型执行 URL 动作。
+ **类型**：`(action: RuntimeUrlAction, url: string) => void`
+ **参数**：
  - `action`：运行时 URL 动作。
  - `url`：要执行的 URL。

#### **executeFunction**

+ **功能描述**：执行函数定义。
+ **类型**：`<T>(functionDefinition: RuntimeFunctionDefinition, requestFields: RequestModelField[], activeRecords: ActiveRecord[] | undefined) => Promise<T>`
+ **参数**：
  - `functionDefinition`：运行时函数定义。
  - `requestFields`：请求模型字段数组。
  - `activeRecords`：激活记录数组或 `undefined`。

#### **getUrl**

+ **功能描述**：获取 URL，根据配置计算或直接获取。
+ **类型**：`() => ReturnPromise<string | undefined>`

#### **getRequestModelFields**

+ **功能描述**：获取请求模型字段。
+ **类型**：`(options?: GetRequestModelFieldsOptions) => Promise<RequestModelField[]>`
+ **参数**：
  - `options`：获取请求模型字段的选项。

#### **resolveQueryBody**

+ **功能描述**：解析查询体。
+ **类型**：`() => string`

#### **seekPopupMainRuntimeContext**

+ **功能描述**：查找弹窗主运行时上下文。
+ **类型**：`() => RuntimeContext`

### 2、DownloadImportWorkbookActionWidget

**类型声明**：

```typescript
@SPI.ClassFactory(ActionWidget.Token({ name: ModelDefaultActionName.$$internal_DownloadImportWorkbook }))
export class DownloadImportWorkbookActionWidget extends UrlActionWidget
```

**方法**：

#### **getUrl**

+ **功能描述**：获取下载导入工作簿的 URL。
+ **类型**：`() => Promise<string>`

#### **getWorkbookId**

+ **功能描述**：获取工作簿 ID。
+ **类型**：`() => ReturnPromise<string | undefined>`

## （五）客户端动作（ClientAction）

### 1、BackActionWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  ActionWidget.Token({
    name: ModelDefaultActionName.$$internal_GotoListTableRouter
  })
)
export class BackActionWidget extends ActionWidget
```

**属性**：

+ confirmText：确认文本（`string | undefined`）
+ defaultType：默认按钮类型（`ButtonType.default`）
+ formData：表单数据（`ActiveRecord | undefined`）
+ isFormChange：表单是否已更改（`boolean`）
+ initFormData：初始表单数据（`string | undefined`）
+ label：按钮标签（`string`）
+ mountedCallChaining：挂载链式调用（`CallChaining | undefined`）

**方法**：

#### **clickAction**

+ **功能描述**：处理点击动作，关闭弹窗或执行页面返回操作。
+ **类型**：`() => Promise<void>`

#### **mountedProcess**

+ **功能描述**：挂载时的处理逻辑，初始化表单数据。
+ **类型**：`() => void`

### 2、ValidateFormActionWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  ActionWidget.Token({
    name: ModelDefaultActionName.$$internal_ValidateForm
  })
)
export class ValidateFormActionWidget extends ActionWidget
```

**属性**：

+ label：动作按钮的显示文本，优先使用 DSL 配置，其次是动作的显示名称，默认为 “校验”。（`string`）
+ validateForm：是否执行表单校验，固定返回 `true`。（`boolean`）

**方法**：

#### **validateAndClick**

+ **功能描述**：执行表单校验并返回结果。
+ **类型**：`() => Promise<boolean>`
+ **返回值**：校验结果。

### 3、ReloadViewActionWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  ActionWidget.Token({
    name: ModelDefaultActionName.$$internal_ReloadData
  })
)
export class ReloadViewActionWidget extends ActionWidget
```

**属性**：

+ label：动作按钮的显示文本，优先使用 DSL 配置，其次是动作的显示名称，默认为 “刷新”。（`string`）

**方法**：

#### **clickAction**

+ **功能描述**：触发刷新操作。
+ **类型**：`() => void`

### 4、PopupSubmitActionWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  ActionWidget.Token({
    name: ModelDefaultActionName.$$internal_DialogSubmit
  })
)
export class PopupSubmitActionWidget extends ActionWidget
```

**属性**：

+ label：动作按钮的显示文本，优先使用 DSL 配置，其次是动作的显示名称，默认为 “确定”。（`string`）
+ updateData：是否更新数据，默认为`false`。（`boolean`）
+ validateForm：是否校验表单，默认为`true`。（`boolean`）

**方法**：

#### **clickAction**

+ **功能描述**：点击动作按钮时执行的操作。
+ **类型**：`() => Promise<boolean>`
+ **返回值**：点击结果。

#### **clickActionAfter**

+ **功能描述**：点击动作按钮后的操作。
+ **类型**：`(result: ClickResult) => ClickResult`
+ **参数**：
  - `result`：点击结果。
+ **返回值**：处理后的点击结果。

#### **reloadDataSourceAndRecords**

+ **功能描述**：重新加载数据源和记录。
+ **类型**：`(result: ClickResult) => void`
+ **参数**：
  - `result`：点击结果。

### 5、PopupCancelActionWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  ActionWidget.Token({
    name: ModelDefaultActionName.$$internal_DialogCancel
  })
)
export class PopupCancelActionWidget extends ActionWidget
```

**属性**：

+ label：动作按钮的显示文本，优先使用 DSL 配置，其次是动作的显示名称，默认为“取消”。（`string`）
+ type：按钮类型，如果是内联模式则为`link`，否则从 DSL 配置中获取，默认为`default`。（`string`）

**方法**：

#### **clickAction**

+ **功能描述**：点击动作按钮时执行的操作。
+ **类型**：`() => Promise<boolean>`
+ **返回值**：点击结果。

#### **clickActionAfter**

+ **功能描述**：点击动作按钮后的操作。
+ **类型**：`(result: ClickResult) => ClickResult`
+ **参数**：
  - `result`：点击结果。
+ **返回值**：处理后的点击结果。

### 6、TableAddOneAction

**类型声明**：

```typescript
@SPI.ClassFactory(
  ActionWidget.Token({
    name: ModelDefaultActionName.$$internal_AddOne
  })
)
export class TableAddOneAction extends ActionWidget
```

**方法**：

#### **clickAction**

+ **功能描述**：点击动作按钮时执行的操作，创建新记录并触发编辑行链式调用。
+ **类型**：`() => void`

### 7、TableCopyOneAction

**类型声明**：

```typescript
@SPI.ClassFactory(
  ActionWidget.Token({
    name: ModelDefaultActionName.$$internal_CopyOne
  })
)
export class TableCopyOneAction extends ActionWidget
```

**方法**：

#### **clickAction**

+ **功能描述**：点击动作按钮时执行的操作，复制当前记录并触发编辑行链式调用。
+ **类型**：`() => void`

### 8、DeleteOneActionWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  ActionWidget.Token({
    name: ModelDefaultActionName.$$internal_DeleteOne
  })
)
export class DeleteOneActionWidget extends ActionWidget
```

**属性**：

+ label：动作按钮的显示文本，优先使用 DSL 配置，其次是动作的显示名称，默认为 “删除”。（`string`）
+ isAsync：表示该操作是否为异步操作。（`boolean`）

**方法**：

#### **clickAction**

+ **功能描述**：点击动作按钮时执行的操作，删除当前选中的记录。
+ **类型**：`() => void`

### 9、DownloadActionWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  ActionWidget.Token({
    name: ModelDefaultActionName.$$internal_Download
  })
)
export class DownloadActionWidget extends ActionWidget
```

**方法**：

#### **clickAction**

+ **功能描述**：点击动作按钮时执行的操作，下载当前选中记录的指定文件。
+ **类型**：`() => void`

#### **downloadUrl**

+ **功能描述**：下载指定 URL 的文件。
+ **类型**：`(url: string) => void`
+ **参数**：
  - `url`：文件的 URL。

### 10、ExportActionWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  ActionWidget.Token({
    name: ModelDefaultActionName.$$internal_GotoListExportDialog
  })
)
export class ExportActionWidget extends ActionWidget
```

**属性**：

+ label：动作按钮的显示文本，优先使用 DSL 配置，其次是动作的显示名称，默认为 “导出”。（`string`）

**方法**：

#### **change**

+ **功能描述**：切换组件可见状态，首次打开时触发工作簿列表查询。
+ **类型**：`(val: boolean) => void`
+ **参数**：
  - `val`：控制可见性的布尔值。

#### **clickAction**

+ **功能描述**：点击动作按钮时打开导出对话框。
+ **类型**：`() => void`

#### **createExportTask**

+ **功能描述**：创建导出任务，根据选中值和记录条件生成导出请求。
+ **类型**：`() => void`
+ **逻辑**：
  - 验证 `selectValue` 非空，否则设置验证错误提示。
  - 根据选中记录或搜索条件生成查询条件 `condition`。
  - 调用接口创建导出任务，并提示操作结果。

### 11、ImportActionWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  ActionWidget.Token({
    name: ModelDefaultActionName.$$internal_GotoListImportDialog
  })
)
export class ImportActionWidget extends ActionWidget
```

**属性**：

+ label：动作按钮的显示文本，优先使用 DSL 配置，其次是动作的显示名称，默认值为 “导入”。（`string`）

**方法**：

#### **change**

+ **功能描述**：切换对话框可见状态，重置验证状态和选中值，首次打开时查询工作簿列表。
+ **类型**：`(val: boolean) => void`
+ **参数**：
  - `val`：对话框可见性的布尔值。

#### **clickAction**

+ **功能描述**：点击动作按钮时打开导入对话框。
+ **类型**：`() => void`

#### **createImportTask**

+ **功能描述**：创建导入任务，验证文件和工作簿选择，调用接口执行导入。
+ **类型**：`() => void`
+ **逻辑**：
  - 验证 `selectValue` 和上传文件 `file` 非空，否则设置验证错误。
  - 调用接口创建导入任务，根据结果提示成功 / 失败，并刷新数据。

#### **downloadTemplate**

+ **功能描述**：下载指定工作簿的导入模板。
+ **类型**：`() => void`
+ **逻辑**：验证 `selectValue` 非空，调用接口获取模板 URL 并打开下载。

#### **getImportFile**

+ **功能描述**：获取上传的文件对象，更新 `file` 属性。
+ **类型**：`(files) => void`
+ **参数**：
  - `files`：上传的文件列表。

#### **remove**

+ **功能描述**：移除已上传的文件，重置 `file` 属性为空对象。
+ **类型**：`(file) => void`
+ **参数**：
  - `file`：待移除的文件对象（未使用，仅清空状态）。

