---
title: Field
index: true
category:
  - 研发手册
  - Reference
  - 前端API
  - Widget
  - Field
dir:
  link: true
  order: 10
next:
  text: Table Field
  link: /zh-cn/DevManual/Reference/Front-EndFramework/Widget/Field/table-field.md
---
在 Oinone Kunlun 中，字段是非常重要的一类元数据，它们往往决定了一个页面展示的数据内容以及展示形式。Widget 框架对组件进行了分类，通过分类特征，我们在注册组件时可以根据这些特征来决定组件的使用范围，使用时可以在所有注册的组件中选择一个最合适的组件进行渲染。字段组件就是通过 field 标签的形式在 DSL 中进行使用的一类组件。

# 一、字段组件的注册

## （一）字段组件的注册可选项

```typescript
/**
 * Field组件注册可选项
 */
export interface BaseFieldOptions extends SPIOptions {
  /**
   * 当前视图类型
   */
  viewType?: ViewType | ViewType[];
  /**
   * 组件名称
   */
  widget?: string | string[];
  /**
   * 字段业务类型
   */
  ttype?: ModelFieldType | ModelFieldType[];
  /**
   * 是否多值
   */
  multi?: boolean;
  /**
   * 指定模型
   */
  model?: string | string[];
  /**
   * 指定视图名称
   */
  viewName?: string | string[];
  /**
   * 指定字段
   */
  name?: string;
}
```

从上述类型声明中不难发现，其分类维度涵盖以下多个方面：视图类型、组件名称、字段业务类型、是否多值、模型编码、字段名称以及视图名称。这些维度用于描述组件的使用位置。一般而言，位置描述得越“精确”，在相应位置进行渲染时，该组件所具备的优先级也就越高。在完全相同的位置描述的情况下，后注册的组件会覆盖先注册的组件。

## （二）注册组件

### 1、注册字段业务类型默认组件

在不指定 `widget` 属性时，该组件将注册为对应字段业务类型的默认组件。以 `FormStringInputFieldWidget` 为例：

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search],
    ttype: ModelFieldType.String
  })
)
export class FormStringInputFieldWidget extends FormStringFieldWidget
```

对于这个组件，在 `DSL` 中通过 `field` 标签使用：

```xml
<field data="code" />
```

### 2、注册指定名称的组件

对于相同字段业务类型的组件，我们通过 `widget` 来指定组件名称，这样就可以和其他组件进行区分。以 `FormStringHyperlinksFieldWidget` 为例：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Form,
    ttype: ModelFieldType.String,
    widget: 'Hyperlinks'
  })
)
export class FormStringHyperlinksFieldWidget extends FormStringInputFieldWidget
```

对于这个组件，在 `DSL` 中通过 `field` 标签使用，并指定 `widget` 属性：

```xml
<field data="url" widget="Hyperlinks" />
```

# 二、Reference List

## （一）表格字段抽象基类

### 1、BaseTableColumnWidget

**继承**：BaseDataWidget<`Props`>

**属性**：

+ align：表格列内容的对齐方式，从 DSL 配置获取并转换为小写。（`string`）
+ cellEditable：单元格是否可编辑，当且仅当 `editable` 为 `true` 且 `editorMode` 为 `TableEditorMode.cell` 时有效。（`boolean`）
+ clientInvisible：客户端是否不可见，根据是否支持当前客户端判断。（`boolean`）
+ columnType：表格列类型，从 DSL 配置获取。（`string`）
+ editorCancelText：编辑取消文本，从 DSL 配置获取。（`string | undefined`）
+ editorCloseTrigger：编辑关闭触发方式，从 DSL 配置获取。（`TableEditorCloseTrigger | undefined`）
+ editorCondition：编辑条件，根据 DSL 配置和 `tableRowEditorClosedBefore` 方法判断。（`Promise<boolean | undefined>`）
+ editorConfirm：编辑确认信息，从 DSL 配置获取。（`string | undefined`）
+ editorConfirmPosition：编辑确认框的位置，从 DSL 配置获取。（`PopconfirmPlacement`）
+ editorConfirmText：编辑确认文本，从 DSL 配置获取。（`string | undefined`）
+ editorEnableConfirm：是否启用编辑确认，从 DSL 配置获取。（`boolean`）
+ editorEnterText：编辑确认时的回车键文本，从 DSL 配置获取。（`string | undefined`）
+ editorMode：编辑模式，从 DSL 配置获取。（`TableEditorMode | undefined`）
+ editorTrigger：编辑触发方式，从 DSL 配置获取。（`TableEditorTrigger | undefined`）
+ editable：表格列是否可编辑，根据 DSL 配置和其他条件判断。（`boolean`）
+ existExpandRow：是否存在展开行，从 DSL 配置获取。（`boolean | undefined`）
+ fixed：表格列是否固定，从 DSL 配置获取。（`string | boolean | undefined`）
+ footerAlign：表格列页脚的对齐方式，从 DSL 配置获取并转换为小写。（`string`）
+ footerClassName：表格列页脚的类名，从 DSL 配置获取。（`string | string[] | undefined`）
+ headerAlign：表格列标题的对齐方式，从 DSL 配置获取并转换为小写。（`string`）
+ headerClassName：表格列标题的类名，从 DSL 配置获取。（`string | string[] | undefined`）
+ invisible：表格列是否不可见，根据客户端可见性和 DSL 配置判断。（`boolean`）
+ invisibleContent：表格列内容是否不可见，从 DSL 配置获取。（`boolean`）
+ label：表格列的标签，从 DSL 配置获取。（`string`）
+ minWidth：表格列的最小宽度，从 DSL 配置获取。（`string | number | undefined`）
+ readonly：表格列是否只读，从 DSL 配置获取。（`boolean`）
+ resizable：表格列是否可调整大小，从 DSL 配置获取。（`boolean | undefined`）
+ required：表格列是否为必填项，从 DSL 配置获取。（`boolean`）
+ sortable：表格列是否可排序，根据 DSL 配置和 `tableSortable` 判断。（`boolean`）
+ tableEditable：表格的可编辑性，从 DSL 配置获取。（`boolean | undefined`）
+ tableExpandTreeFieldColumn：表格展开树字段列，从 DSL 配置获取。（`string | undefined`）
+ tableForceEditable：表格是否强制可编辑，从 DSL 配置获取。（`boolean | undefined`）
+ tableInstance：表格实例，用于获取和设置表格实例。（`OioTableInstance | undefined`）
+ tableRowEditorClosed：表格行编辑关闭时的回调函数，从 DSL 配置获取。（`(context: RowContext | undefined) => Promise<boolean>`）
+ tableRowEditorClosedBefore：表格行编辑关闭前的回调函数，从 DSL 配置获取。（`(context: RowContext | undefined) => Promise<boolean>`）
+ tableSortable：表格的可排序性，从 DSL 配置获取。（`boolean | undefined`）
+ treeNode：是否为树节点列，根据 DSL 配置和 `tableExpandTreeFieldColumn` 判断。（`boolean | undefined`）
+ width：表格列的宽度，从 DSL 配置获取。（`string | number | undefined`）

**方法**：

#### **cellEditable**

+ **功能描述**：判断单元格是否可编辑。
+ **类型**：`(context: RowContext) => boolean`
+ **参数**：
  - `context`：行上下文。
+ **返回值**：布尔值，表示单元格是否可编辑。

#### **className**

+ **功能描述**：获取表格列的类名。
+ **类型**：`(context: RenderCellContext) => string | string[] | undefined`
+ **参数**：
  - `context`：渲染单元格上下文。
+ **返回值**：表格列的类名或类名数组，或 `undefined`。

#### **compute**

+ **功能描述**：计算表格列的值。
+ **类型**：`(context: RowContext) => Value | null | undefined`
+ **参数**：
  - `context`：行上下文。
+ **返回值**：计算后的值，或 `null` 或 `undefined`。

#### **editorCancelText**

+ **功能描述**：获取编辑取消文本。
+ **类型**：`(context: RowContext) => string | undefined`
+ **参数**：
  - `context`：行上下文。
+ **返回值**：编辑取消文本，或 `undefined`。

#### **editorCondition**

+ **功能描述**：判断编辑条件。
+ **类型**：`(context: RowContext) => Promise<boolean | undefined>`
+ **参数**：
  - `context`：行上下文。
+ **返回值**：Promise，解析为布尔值或 `undefined`，表示编辑条件是否满足。

#### **editorConfirm**

+ **功能描述**：获取编辑确认信息。
+ **类型**：`(context: RowContext) => string | undefined`
+ **参数**：
  - `context`：行上下文。
+ **返回值**：编辑确认信息，或 `undefined`。

#### **editorConfirmPosition**

+ **功能描述**：获取编辑确认框的位置。
+ **类型**：`(context: RowContext) => PopconfirmPlacement`
+ **参数**：
  - `context`：行上下文。
+ **返回值**：编辑确认框的位置。

#### **editorConfirmText**

+ **功能描述**：获取编辑确认文本。
+ **类型**：`(context: RowContext) => string | undefined`
+ **参数**：
  - `context`：行上下文。
+ **返回值**：编辑确认文本，或 `undefined`。

#### **editorEnableConfirm**

+ **功能描述**：判断是否启用编辑确认。
+ **类型**：`(context: RowContext) => boolean`
+ **参数**：
  - `context`：行上下文。
+ **返回值**：布尔值，表示是否启用编辑确认。

#### **editorEnterText**

+ **功能描述**：获取编辑确认时的回车键文本。
+ **类型**：`(context: RowContext) => string | undefined`
+ **参数**：
  - `context`：行上下文。
+ **返回值**：编辑确认时的回车键文本，或 `undefined`。

#### **editorValidateConfirm**

+ **功能描述**：执行编辑验证确认。
+ **类型**：`(context: RowContext) => Promise<boolean>`
+ **参数**：
  - `context`：行上下文。
+ **返回值**：Promise，解析为布尔值，表示验证结果。

#### **footerClassName**

+ **功能描述**：获取表格列页脚的类名。
+ **类型**：`(context: RenderCellContext) => string | string[] | undefined`
+ **参数**：
  - `context`：渲染单元格上下文。
+ **返回值**：表格列页脚的类名或类名数组，或 `undefined`。

#### **getTableInstance**

+ **功能描述**：获取表格实例。
+ **类型**：`() => OioTableInstance | undefined`
+ **返回值**：表格实例，或 `undefined`。

#### **headerClassName**

+ **功能描述**：获取表格列标题的类名。
+ **类型**：`(context: RenderCellContext) => string | string[] | undefined`
+ **参数**：
  - `context`：渲染单元格上下文。
+ **返回值**：表格列标题的类名或类名数组，或 `undefined`。

#### **invisibleContent**

+ **功能描述**：判断表格列内容是否不可见。
+ **类型**：`(context: RowContext) => boolean`
+ **参数**：
  - `context`：行上下文。
+ **返回值**：布尔值，表示表格列内容是否不可见。

#### **rowEditorClosedByCancel**

+ **功能描述**：处理表格行编辑关闭（取消）事件。
+ **类型**：`(context: RowContext | undefined) => Promise<boolean>`
+ **参数**：
  - `context`：行上下文或 `undefined`。
+ **返回值**：Promise，解析为布尔值，表示操作结果。

#### **rowEditorClosedByEnter**

+ **功能描述**：处理表格行编辑关闭（回车键）事件。
+ **类型**：`(context: RowContext | undefined) => Promise<boolean>`
+ **参数**：
  - `context`：行上下文或 `undefined`。
+ **返回值**：Promise，解析为布尔值，表示操作结果。

#### **setValue**

+ **功能描述**：设置表格列的值。
+ **类型**：`(context: RowContext, val: Value | null | undefined) => void`
+ **参数**：
  - `context`：行上下文。
  - `val`：要设置的值。
+ **返回值**：无返回值。

#### **getValue**

+ **功能描述**：获取表格列的值。
+ **类型**：`(context: RowContext) => Value | null | undefined`
+ **参数**：
  - `context`：行上下文。
+ **返回值**：表格列的值，或 `null` 或 `undefined`。

### 2、BaseTableQuickOperationColumnWidget

**继承**：BaseTableColumnWidget<Value, Props>

**方法**：

#### **consumerUserPreferManager**

+ **功能描述**：获取用户偏好管理器并执行回调函数。
+ **类型**：`(fn: (userPreferManager: UserPreferEventManager, userPrefer: UserTablePrefer) => R) => R | undefined`
+ **参数**：
  - `fn`：回调函数，接收用户偏好管理器和用户表格偏好数据。
+ **返回值**：回调函数的执行结果；若用户偏好管理器或数据不存在，则返回 `undefined`。

#### **handleClearAllFreeze**

+ **功能描述**：清除所有固定列设置（左侧、右侧或全部）。
+ **类型**：`(fixed: TableFixed = TableFixed.all) => Promise<void>`
+ **参数**：
  - `fixed`：固定列类型，可选值为 `TableFixed.left`（清除左侧固定）、`TableFixed.right`（清除右侧固定）、`TableFixed.all`（清除全部固定），默认为 `TableFixed.all`。
+ **返回值**：无返回值，返回 `Promise<void>`。

#### **handleClearFreeze**

+ **功能描述**：清除指定列的固定设置（左侧或右侧）。
+ **类型**：`(table: VxeTableConstructor & VxeTablePrivateMethods, column: VxeTableDefines.ColumnInfo) => Promise<void>`
+ **参数**：
  - `table`：表格实例。
  - `column`：目标列信息。
+ **返回值**：无返回值，返回 `Promise<void>`。

#### **handleClearOrder**

+ **功能描述**：清除指定列的排序状态。
+ **类型**：`(table: VxeTableConstructor & VxeTablePrivateMethods, column: VxeTableDefines.ColumnInfo) => void`
+ **参数**：
  - `table`：表格实例。
  - `column`：目标列信息。
+ **返回值**：无返回值。

#### **handleFreezeLeft**

+ **功能描述**：将指定列及其左侧所有列固定到表格左侧。
+ **类型**：`(table: VxeTableConstructor & VxeTablePrivateMethods, column: VxeTableDefines.ColumnInfo) => Promise<void>`
+ **参数**：
  - `table`：表格实例。
  - `column`：目标列信息。
+ **返回值**：无返回值，返回 `Promise<void>`。

#### **handleFreezeRight**

+ **功能描述**：将指定列及其右侧所有列固定到表格右侧。
+ **类型**：`(table: VxeTableConstructor & VxeTablePrivateMethods, column: VxeTableDefines.ColumnInfo) => Promise<void>`
+ **参数**：
  - `table`：表格实例。
  - `column`：目标列信息。
+ **返回值**：无返回值，返回 `Promise<void>`。

#### **handleHide**

+ **功能描述**：根据用户偏好隐藏指定列，或更新用户偏好以显示该列。
+ **类型**：`(table: VxeTableConstructor & VxeTablePrivateMethods, column: VxeTableDefines.ColumnInfo) => Promise<void>`
+ **参数**：
  - `table`：表格实例。
  - `column`：目标列信息。
+ **返回值**：无返回值，返回 `Promise<void>`。

#### **handleOrderByASC**

+ **功能描述**：对指定列执行升序排序，并触发表格排序变更事件。
+ **类型**：`(table: VxeTableConstructor & VxeTablePrivateMethods, column: VxeTableDefines.ColumnInfo) => void`
+ **参数**：
  - `table`：表格实例。
  - `column`：目标列信息。
+ **返回值**：无返回值。

#### **handleOrderByDESC**

+ **功能描述**：对指定列执行降序排序，并触发表格排序变更事件。
+ **类型**：`(table: VxeTableConstructor & VxeTablePrivateMethods, column: VxeTableDefines.ColumnInfo) => void`
+ **参数**：
  - `table`：表格实例。
  - `column`：目标列信息。
+ **返回值**：无返回值。

#### **renderHeaderSlot**

+ **功能描述**：渲染表头内容，包含列标签、快速操作组件（`renderQuickOperation` 结果），若为最后一列则添加用户偏好设置按钮。
+ **类型**：`(context: RowContext) => VNode[] | string`
+ **参数**：
  - `context`：行上下文，包含表格行数据及索引信息。
+ **返回值**：表头内容的虚拟节点数组（`VNode[]`）或字符串。

#### **renderQuickOperation**

+ **功能描述**：渲染快速操作组件，传递排序、固定、隐藏等操作方法至子组件。
+ **类型**：`(context: RowContext) => VNode | undefined`
+ **参数**：
  - `context`：行上下文，包含表格实例和列信息。
+ **返回值**：快速操作组件的虚拟节点（`VNode`）；若无需渲染则返回 `undefined`。

### 3、BaseTableFieldWidget

**继承**：BaseTableQuickOperationColumnWidget<Value, Props>

**属性**：

+ align：表格列内容的对齐方式，从 DSL 配置获取并转换为小写。（`string`）
+ cellEditable：单元格是否可编辑，当且仅当 `editable` 为 `true` 且 `editorMode` 为 `TableEditorMode.cell` 时有效。（`boolean`）
+ clientInvisible：客户端是否不可见，根据是否支持当前客户端判断。（`boolean`）
+ columnType：表格列类型，从 DSL 配置获取。（`string`）
+ dslInvisible：根据 DSL 配置判断列是否不可见。（`boolean`）
+ editorCancelText：编辑取消文本，从 DSL 配置获取。（`string | undefined`）
+ editorCloseTrigger：编辑关闭触发方式，从 DSL 配置获取。（`TableEditorCloseTrigger | undefined`）
+ editorCondition：编辑条件，根据 DSL 配置和 `tableRowEditorClosedBefore` 方法判断。（`Promise<boolean | undefined>`）
+ editorConfirm：编辑确认信息，从 DSL 配置获取。（`string | undefined`）
+ editorConfirmPosition：编辑确认框的位置，从 DSL 配置获取。（`PopconfirmPlacement`）
+ editorConfirmText：编辑确认文本，从 DSL 配置获取。（`string | undefined`）
+ editorEnableConfirm：是否启用编辑确认，从 DSL 配置获取。（`boolean`）
+ editorEnterText：编辑确认时的回车键文本，从 DSL 配置获取。（`string | undefined`）
+ editorMode：编辑模式，从 DSL 配置获取。（`TableEditorMode | undefined`）
+ editorTrigger：编辑触发方式，从 DSL 配置获取。（`TableEditorTrigger | undefined`）
+ editable：表格列是否可编辑，根据 DSL 配置和其他条件判断。（`boolean`）
+ existExpandRow：是否存在展开行，从 DSL 配置获取。（`boolean | undefined`）
+ expandOperationField：展开操作字段，从 DSL 配置获取。（`string | undefined`）
+ field：表格字段，从 DSL 配置获取。（`Field`）
+ fieldWidgetMounted：字段组件挂载时的回调函数，从 DSL 配置获取。（`(widget: BaseTableFieldWidget) => void | undefined`）
+ fieldWidgetUnmounted：字段组件卸载时的回调函数，从 DSL 配置获取。（`(widget: BaseTableFieldWidget) => void | undefined`）
+ fixed：表格列是否固定，从 DSL 配置获取。（`string | boolean | undefined`）
+ footerAlign：表格列页脚的对齐方式，从 DSL 配置获取并转换为小写。（`string`）
+ footerClassName：表格列页脚的类名，从 DSL 配置获取。（`string | string[] | undefined`）
+ headerAlign：表格列标题的对齐方式，从 DSL 配置获取并转换为小写。（`string`）
+ headerClassName：表格列标题的类名，从 DSL 配置获取。（`string | string[] | undefined`）
+ invisible：表格列是否不可见，根据客户端可见性、DSL 配置和用户偏好判断。（`boolean`）
+ invisibleContent：表格列内容是否不可见，从 DSL 配置获取。（`boolean`）
+ isExpandOperationField：是否为展开操作字段。（`boolean`）
+ label：表格列的标签，从 DSL 配置获取。（`string`）
+ minWidth：表格列的最小宽度，从 DSL 配置获取。（`string | number | undefined`）
+ ownEventListeners：字段的事件监听器。（`Record<LifeCycleTypes, Array<HandlerEvent>>`）
+ readonly：表格列是否只读，从 DSL 配置获取。（`boolean`）
+ relationSortFields：关系排序字段，从 DSL 配置获取。（`string[] | undefined`）
+ required：表格列是否为必填项，从 DSL 配置获取。（`boolean`）
+ resizable：表格列是否可调整大小，从 DSL 配置获取。（`boolean | undefined`）
+ runtimeField：运行时字段，从 DSL 配置获取。（`Field | undefined`）
+ sortable：表格列是否可排序，根据 DSL 配置和其他条件判断。（`boolean`）
+ tableEditable：表格的可编辑性，从 DSL 配置获取。（`boolean | undefined`）
+ tableExpandTreeFieldColumn：表格展开树字段列，从 DSL 配置获取。（`string | undefined`）
+ tableForceEditable：表格是否强制可编辑，从 DSL 配置获取。（`boolean | undefined`）
+ tableInstance：表格实例，用于获取和设置表格实例。（`OioTableInstance | undefined`）
+ tableRowEditorClosed：表格行编辑关闭时的回调函数，从 DSL 配置获取。（`(context: RowContext | undefined) => Promise<boolean>`）
+ tableRowEditorClosedBefore：表格行编辑关闭前的回调函数，从 DSL 配置获取。（`(context: RowContext | undefined) => Promise<boolean>`）
+ tableSortable：表格的可排序性，从 DSL 配置获取。（`boolean | undefined`）
+ themeConfig：表格主题配置，从 DSL 配置获取。（`TableThemeConfig | undefined`）
+ treeNode：是否为树节点列，根据 DSL 配置和 `tableExpandTreeFieldColumn` 判断。（`boolean | undefined`）
+ userPrefer：用户偏好，从 DSL 配置获取。（`UserTablePrefer | undefined`）
+ userPreferInvisible：根据用户偏好判断列是否不可见。（`boolean`）
+ viewMode：视图模式，从 DSL 配置获取。（`ViewMode`）
+ viewType：视图类型，从 DSL 配置获取。（`ViewType | undefined`）
+ width：表格列的宽度，从 DSL 配置获取。（`string | number | undefined`）

**方法**：

#### **cellEditable**

+ **功能描述**：判断单元格是否可编辑。
+ **类型**：`(context: RowContext) => boolean`
+ **参数**：
  - `context`：行上下文。
+ **返回值**：布尔值，表示单元格是否可编辑。

#### **className**

+ **功能描述**：获取表格列的类名。
+ **类型**：`(context: RenderCellContext) => string | string[] | undefined`
+ **参数**：
  - `context`：渲染单元格上下文。
+ **返回值**：表格列的类名或类名数组，或 `undefined`。

#### **compute**

+ **功能描述**：计算表格列的值。
+ **类型**：`(context: RowContext) => Value | null | undefined`
+ **参数**：
  - `context`：行上下文。
+ **返回值**：计算后的值，或 `null` 或 `undefined`。

#### **editorCancelText**

+ **功能描述**：获取编辑取消文本。
+ **类型**：`(context: RowContext) => string | undefined`
+ **参数**：
  - `context`：行上下文。
+ **返回值**：编辑取消文本，或 `undefined`。

#### **editorCondition**

+ **功能描述**：判断编辑条件。
+ **类型**：`(context: RowContext) => Promise<boolean | undefined>`
+ **参数**：
  - `context`：行上下文。
+ **返回值**：Promise，解析为布尔值或 `undefined`，表示编辑条件是否满足。

#### **editorConfirm**

+ **功能描述**：获取编辑确认信息。
+ **类型**：`(context: RowContext) => string | undefined`
+ **参数**：
  - `context`：行上下文。
+ **返回值**：编辑确认信息，或 `undefined`。

#### **editorConfirmPosition**

+ **功能描述**：获取编辑确认框的位置。
+ **类型**：`(context: RowContext) => PopconfirmPlacement`
+ **参数**：
  - `context`：行上下文。
+ **返回值**：编辑确认框的位置。

#### **editorConfirmText**

+ **功能描述**：获取编辑确认文本。
+ **类型**：`(context: RowContext) => string | undefined`
+ **参数**：
  - `context`：行上下文。
+ **返回值**：编辑确认文本，或 `undefined`。

#### **editorEnableConfirm**

+ **功能描述**：判断是否启用编辑确认。
+ **类型**：`(context: RowContext) => boolean`
+ **参数**：
  - `context`：行上下文。
+ **返回值**：布尔值，表示是否启用编辑确认。

#### **editorEnterText**

+ **功能描述**：获取编辑确认时的回车键文本。
+ **类型**：`(context: RowContext) => string | undefined`
+ **参数**：
  - `context`：行上下文。
+ **返回值**：编辑确认时的回车键文本，或 `undefined`。

#### **editorValidateConfirm**

+ **功能描述**：执行编辑验证确认。
+ **类型**：`(context: RowContext) => Promise<boolean>`
+ **参数**：
  - `context`：行上下文。
+ **返回值**：Promise，解析为布尔值，表示验证结果。

#### **footerClassName**

+ **功能描述**：获取表格列页脚的类名。
+ **类型**：`(context: RenderCellContext) => string | string[] | undefined`
+ **参数**：
  - `context`：渲染单元格上下文。
+ **返回值**：表格列页脚的类名或类名数组，或 `undefined`。

#### **getCompute**

+ **功能描述**：获取计算字段值的表达式。
+ **类型**：`(data: ActiveRecord) => boolean | string | undefined`
+ **参数**：
  - `data`：活动记录。
+ **返回值**：计算字段值的表达式，或 `undefined`。

#### **getTableAutoWidth**

+ **功能描述**：获取表格自动宽度。
+ **类型**：`() => string | number | undefined`
+ **返回值**：表格自动宽度，或 `undefined`。

#### **getTableForCellMinWidth**

+ **功能描述**：获取表格单元格最小宽度。
+ **类型**：`() => string | number | undefined`
+ **返回值**：表格单元格最小宽度，或 `undefined`。

#### **getTableInstance**

+ **功能描述**：获取表格实例。
+ **类型**：`() => OioTableInstance | undefined`
+ **返回值**：表格实例，或 `undefined`。

#### **headerClassName**

+ **功能描述**：获取表格列标题的类名。
+ **类型**：`(context: RenderCellContext) => string | string[] | undefined`
+ **参数**：
  - `context`：渲染单元格上下文。
+ **返回值**：表格列标题的类名或类名数组，或 `undefined`。

#### **handleClick**

+ **功能描述**：处理点击事件。
+ **类型**：`(context: RowContext, e: MouseEvent) => void`
+ **参数**：
  - `context`：行上下文。
  - `e`：鼠标事件。
+ **返回值**：无返回值。

#### **invisibleContent**

+ **功能描述**：判断表格列内容是否不可见。
+ **类型**：`(context: RowContext) => boolean`
+ **参数**：
  - `context`：行上下文。
+ **返回值**：布尔值，表示表格列内容是否不可见。

#### **isExpressionString**

+ **功能描述**：判断字符串是否为表达式。
+ **类型**：`(expression?: string) => boolean`
+ **参数**：
  - `expression`：字符串。
+ **返回值**：布尔值，表示字符串是否为表达式。

#### **notify**

+ **功能描述**：通知字段事件。
+ **类型**：`(type: LifeCycleTypes) => void`
+ **参数**：
  - `type`：生命周期类型。
+ **返回值**：无返回值。

#### **on**

+ **功能描述**：监听字段事件。
+ **类型**：`(event: FieldEventName | { [key in FieldEventName]?: HandlerEvent }, handler?: HandlerEvent) => void`
+ **参数**：
  - `event`：事件名或事件对象。
  - `handler`：回调函数。
+ **返回值**：无返回值。

#### **renderDefaultSlot**

+ **功能描述**：渲染默认插槽内容。
+ **类型**：`(context: RowContext) => VNode[] | string`
+ **参数**：
  - `context`：行上下文。
+ **返回值**：默认插槽内容的虚拟节点数组或字符串。

#### **renderEditSlot**

+ **功能描述**：渲染编辑插槽内容。
+ **类型**：`(context: RowContext) => VNode[] | string`
+ **参数**：
  - `context`：行上下文。
+ **返回值**：编辑插槽内容的虚拟节点数组或字符串。

#### **rowEditorClosedByCancel**

+ **功能描述**：处理表格行编辑关闭（取消）事件。
+ **类型**：`(context: RowContext | undefined) => Promise<boolean>`
+ **参数**：
  - `context`：行上下文或 `undefined`。
+ **返回值**：Promise，解析为布尔值，表示操作结果。

#### **rowEditorClosedByEnter**

+ **功能描述**：处理表格行编辑关闭（回车键）事件。
+ **类型**：`(context: RowContext | undefined) => Promise<boolean>`
+ **参数**：
  - `context`：行上下文或 `undefined`。
+ **返回值**：Promise，解析为布尔值，表示操作结果。

#### **setValue**

+ **功能描述**：设置表格列的值。
+ **类型**：`(context: RowContext, val: Value | null | undefined) => void`
+ **参数**：
  - `context`：行上下文。
  - `val`：要设置的值。
+ **返回值**：无返回值。

#### **getValue**

+ **功能描述**：获取表格列的值。
+ **类型**：`(context: RowContext) => Value | null | undefined`
+ **参数**：
  - `context`：行上下文。
+ **返回值**：表格列的值，或 `null` 或 `undefined`。

#### **wrapperToFieldAction**

+ **功能描述**：将节点包装为字段操作。
+ **类型**：`(node: VNode[] | string, context: RowContext) => VNode[] | string`
+ **参数**：
  - `node`：虚拟节点数组或字符串。
  - `context`：行上下文。
+ **返回值**：包装后的虚拟节点数组或字符串。

#### **wrapperToFiledAction**

+ **功能描述**：将节点包装为字段操作（已弃用）。
+ **类型**：`(node: VNode[] | string, context: RowContext) => VNode[] | string`
+ **参数**：
  - `node`：虚拟节点数组或字符串。
  - `context`：行上下文。
+ **返回值**：包装后的虚拟节点数组或字符串。

### 4、TableComplexFieldWidget

**继承**：BaseTableFieldWidget<Value, Field, Props>

**属性**：

+ labelFields：引用模型的标签字段列表。（`string[]`）
+ optionLabel：选项标签，从 DSL 配置获取。（`string`）
+ optionLabelContextArgs：选项标签上下文参数，从 DSL 配置获取。（`string`）
+ parentMountedCallChaining：父组件挂载回调链，从 DSL 配置获取。（`CallChaining | undefined`）
+ referencesModel：引用的运行时模型。（`RuntimeModel | undefined`）
+ relationFieldKey：关系字段键，通常是引用模型的主键。（`string`）
+ searchFields：搜索字段列表，从 DSL 配置或引用模型获取。（`string[]`）
+ separator：分隔符，用于连接多个标签字段的值。（`string`）

**方法**：

#### **handleTableLabel**

+ **功能描述**：处理表格单元格的标签显示。
+ **类型**：`(dataEntity: any) => string`
+ **参数**：
  - `dataEntity`：数据实体。
+ **返回值**：处理后的标签字符串。

#### **resolveReferenceModel**

+ **功能描述**：解析引用模型（当 field 中缺少 referencesModel 时使用）。
+ **类型**：`() => Promise<void>`

### 5、TableObjectFieldWidget

**继承**：TableComplexFieldWidget<`ActiveRecord`>

**方法**：

#### **renderDefaultSlot**

+ **功能描述**：渲染表格单元格的默认内容。
+ **类型**：`(context: RowContext) => VNode[] | string`
+ **参数**：
  - `context`：行上下文。
+ **返回值**：渲染内容的虚拟节点数组或字符串。

### 6、TableListFieldWidget

**继承**：TableComplexFieldWidget<ActiveRecord[]>

**方法**：

#### **renderDefaultSlot**

+ **功能描述**：渲染表格单元格的默认内容，将列表值处理为逗号分隔的字符串。
+ **类型**：`(context: RowContext) => VNode[] | string`
+ **参数**：
  - `context`：行上下文。
+ **返回值**：渲染内容的虚拟节点数组或字符串。

## （二）表单字段抽象基类

### 1、BaseFormItemWidget

**继承**：BaseDataWidget<`Props`>

**属性**：

+ blurValue：失焦时的值，用于对比值是否变更。（`string | null | undefined`）
+ clearFields：需要清空的字段列表，从 DSL 配置获取。（`string[]`）
+ constructDataTrigger：构造数据触发时机，从 DSL 配置获取。（`WidgetTrigger[]`）
+ currentRelationUpdateType：当前关系更新类型，优先从当前组件获取。（`RelationUpdateType | undefined`）
+ currentSubmitType：当前提交类型，优先从当前组件获取。（`SubmitType | undefined`）
+ defaultValidateTrigger：默认校验触发时机，包含 `ValidateTrigger.BLUR`。（`ValidateTrigger[]`）
+ disabled：组件是否禁用，根据视图模式和 DSL 配置判断。（`boolean`）
+ help：帮助文本，从 DSL 配置获取。（`any`）
+ hint：提示文本，从 DSL 配置获取并支持表达式解析。（`string | undefined`）
+ label：标签文本，支持表达式解析。（`string | undefined`）
+ labelInvisible：标签是否隐藏，根据标签值和 DSL 配置判断。（`boolean`）
+ layout：布局方式，从 DSL 配置获取并转为小写。（`string | undefined`）
+ parentRelationUpdateType：父组件关系更新类型，通过依赖注入获取。（`RelationUpdateType | undefined`）
+ parentSubmitType：父组件提交类型，通过依赖注入获取。（`SubmitType | undefined`）
+ parentViewMode：父组件视图模式，通过依赖注入获取。（`ViewMode | undefined`）
+ readonly：组件是否只读，根据视图模式和 DSL 配置判断。（`boolean`）
+ required：组件是否必填，根据视图模式和 DSL 配置判断。（`boolean`）
+ requiredTips：必填提示文本，从 DSL 配置获取。（`string | undefined`）
+ submitType：提交类型，合并当前组件、DSL 配置和父组件的值。（`SubmitType`）
+ validation：校验信息，包含状态、消息和路径。（`ValidatorInfo | undefined`）
+ validatorInfo：校验信息，供外部访问。（`ValidatorInfo | undefined`）
+ validateTrigger：校验触发时机，从 DSL 配置获取或使用默认值。（`ValidateTrigger[]`）
+ viewMode：视图模式，根据视图类型和父组件模式确定。（`ViewMode | undefined`）
+ viewType：视图类型，通过依赖注入获取。（`ViewType | undefined`）
+ value：组件当前值，通过计算获取。（`Value | null | undefined`）

**方法**：

#### **afterBlur**

+ **功能描述**：处理失焦后的逻辑，对比值变更并触发计算和回调。
+ **类型**：`() => void`

#### **afterChange**

+ **功能描述**：处理值变更后的回调触发。
+ **类型**：`() => void`

#### **blur**

+ **功能描述**：触发失焦事件，执行表达式和校验逻辑。
+ **类型**：`() => void`

#### **change**

+ **功能描述**：处理值变更，更新数据并触发校验和回调。
+ **类型**：`(val: Value | null | undefined) => void`
+ **参数**：
  - `val`：新值。

#### **clearFieldsCallback**

+ **功能描述**：清空指定字段的数据。
+ **类型**：`() => boolean`
+ **返回值**：是否成功清空数据。

#### **computeBlurValue**

+ **功能描述**：计算失焦时的值，处理非字符串类型。
+ **类型**：`(val: unknown) => string | null | undefined`
+ **参数**：
  - `val`：原始值。

#### **executeExpression**

+ **功能描述**：执行表达式解析，支持数据上下文和错误值处理。
+ **类型**：`(expression: string, errorValue?: T) => T | string | undefined`
+ **参数**：
  - `expression`：表达式字符串。
  - `errorValue`：解析失败时的默认值（可选）。

#### **executeLabelExpression**

+ **功能描述**：解析标签表达式，区分普通字符串和表达式字符串。
+ **类型**：`(label: string) => string | undefined`
+ **参数**：
  - `label`：标签文本或表达式。

#### **executeValidator**

+ **功能描述**：执行校验逻辑，返回校验结果。
+ **类型**：`() => Promise<ValidatorInfo>`
+ **返回值**：校验信息对象。

#### **focus**

+ **功能描述**：触发聚焦事件，记录当前值为失焦对比值。
+ **类型**：`() => void`

#### **generatorConstructMirrorSubmitData**

+ **功能描述**：生成构造镜像提交数据，默认包含当前字段值。
+ **类型**：`() => ActiveRecord`
+ **返回值**：包含当前字段值的对象。

#### **getDefaultValidateTrigger**

+ **功能描述**：获取默认校验触发时机（已弃用，使用 `defaultValidateTrigger`）。
+ **类型**：`() => ValidateTrigger[]`
+ **返回值**：默认校验触发时机数组。

#### **getValue**

+ **功能描述**：获取表单数据中当前字段的值。
+ **类型**：`() => Value | null | undefined`
+ **返回值**：字段值。

#### **invisibleProcess**

+ **功能描述**：处理不可见表达式，返回布尔值。
+ **类型**：`(invisible: boolean | string) => boolean | undefined`
+ **参数**：
  - `invisible`：不可见配置（布尔值或表达式字符串）。

#### **setBlurValue**

+ **功能描述**：设置失焦对比值。
+ **类型**：`(val: unknown) => void`
+ **参数**：
  - `val`：对比值。

#### **setValue**

+ **功能描述**：设置表单数据中当前字段的值。
+ **类型**：`(value: Value | null | undefined) => void`
+ **参数**：
  - `value`：要设置的值。

#### **submit**

+ **功能描述**：数据提交方法（需子类实现），默认返回 `undefined`。
+ **类型**：`(submitValue: SubmitValue) => ReturnPromise<Record<string, unknown> | SubmitRelationValue | undefined>`
+ **参数**：
  - `submitValue`：提交值。

#### **validatorByExpression**

+ **功能描述**：通过表达式执行校验，返回校验结果。
+ **类型**：`(expression: string, msg: string) => ValidatorInfo | undefined`
+ **参数**：
  - `expression`：校验表达式。
  - `msg`：校验失败提示消息。

#### **validatorError**

+ **功能描述**：生成校验失败信息。
+ **类型**：`(message?: string) => ValidatorInfo`
+ **参数**：
  - `message`：错误消息（可选）。
+ **返回值**：校验错误信息对象。

#### **validatorSkip**

+ **功能描述**：生成校验跳过信息。
+ **类型**：`(message?: string) => ValidatorInfo`
+ **参数**：
  - `message`：跳过消息（可选）。
+ **返回值**：校验跳过信息对象。

#### **validatorSuccess**

+ **功能描述**：生成校验成功信息。
+ **类型**：`(message?: string) => ValidatorInfo`
+ **参数**：
  - `message`：成功消息（可选）。
+ **返回值**：校验成功信息对象。

### 2、FormFieldWidget

**继承**：BaseFieldWidget<Value, Field, Props>

**属性**：

+ allowClear：是否允许清空值，默认为 `true`。（`boolean`）
+ emptyStyle：空值样式，从 DSL 配置获取。（`any`）
+ placeholder：占位符文本，支持表达式解析和国际化翻译。（`string | string[] | undefined`）

**方法**：

#### **compute**

+ **功能描述**：计算字段值，处理表达式计算和复杂类型字段。
+ **类型**：`() => Value | null | undefined`
+ **返回值**：计算后的值，或 `null` 或 `undefined`。

#### **getCompute**

+ **功能描述**：获取字段计算表达式，处理关联字段的特殊情况。
+ **类型**：`(contextData: any) => string | boolean | undefined`
+ **参数**：
  - `contextData`：上下文数据。
+ **返回值**：计算表达式，或 `undefined`。

#### **updateRelatedValue**

+ **功能描述**：更新关联字段的值。
+ **类型**：`(relatedFields: string[], val: Value | null | undefined) => void`
+ **参数**：
  - `relatedFields`：关联字段数组。
  - `val`：要设置的值。

#### **updateValue**

+ **功能描述**：更新字段值，处理关联字段的特殊情况。
+ **类型**：`(val: Value | null | undefined) => void`
+ **参数**：
  - `val`：要设置的值。

### 3、FormComplexFieldWidget

**继承**：FormFieldWidget<Value, Field, Props>

**属性**：

+ currentMountedCallChaining：当前挂载回调链，可通过依赖注入获取。（`CallChaining | undefined`）
+ currentRefreshCallChaining：当前刷新回调链，可通过依赖注入获取。（`CallChaining<boolean> | undefined`）
+ domain：动态域，支持动态解析。（`string | undefined`）
+ filter：过滤条件，支持动态解析。（`string | undefined`）
+ isDataSourceProvider：是否为数据源提供者，默认 `true`。（`boolean`）
+ mountedCallChaining：挂载回调链，合并当前组件和父组件的值。（`CallChaining | undefined`）
+ parentMountedCallChaining：父组件挂载回调链，通过依赖注入获取。（`CallChaining | undefined`）
+ parentRefreshCallChaining：父组件刷新回调链，通过依赖注入获取。（`CallChaining<boolean> | undefined`）
+ refreshCallChaining：刷新回调链，优先使用当前组件配置。（`CallChaining<boolean> | undefined`）
+ referencesModel：引用的运行时模型。（`RuntimeModel | undefined`）
+ submitCache：提交缓存管理器，用于处理关联数据提交。（`SubmitCacheManager | undefined`）

**方法**：

#### **initSubmitCache**

+ **功能描述**：初始化提交缓存管理器，配置模型主键和唯一键。
+ **类型**：`(referencesModel: RuntimeModel) => void`
+ **参数**：
  - `referencesModel`：引用的运行时模型。

#### **mountedProcess**

+ **功能描述**：挂载时的抽象处理逻辑（需子类实现）。
+ **类型**：`() => ReturnPromise<void>`

#### **refreshParentProcess**

+ **功能描述**：父视图刷新时的默认处理逻辑（空实现）。
+ **类型**：`() => ReturnPromise<void>`

#### **refreshValueProcess**

+ **功能描述**：值刷新时的默认处理逻辑（空实现）。
+ **类型**：`() => ReturnPromise<void>`

#### **resolveDynamicDomain**

+ **功能描述**：解析动态域，支持数据上下文和多来源数据。
+ **类型**：`(domain: string) => string`
+ **参数**：
  - `domain`：动态域表达式字符串。
+ **返回值**：解析后的动态域字符串。

#### **subscribeProcess**

+ **功能描述**：订阅表单数据刷新，触发值刷新处理逻辑。
+ **类型**：`() => void`

### 4、FormComplexObjectFieldWidget

**继承**：FormComplexFieldWidget<ActiveRecord, Field, Props>

**属性**：

+ parentRefreshProcess：父组件的刷新处理函数，通过依赖注入获取。（`RefreshProcessFunction | undefined`）

**方法**：

#### **mountedProcess**

+ **功能描述**：挂载时的处理逻辑，设置当前数据源。
+ **类型**：`() => void`

#### **refreshProcess**

+ **功能描述**：刷新时的处理逻辑（空实现）。
+ **类型**：`(condition?: Condition) => Promise<void>`
+ **参数**：
  - `condition`：条件（可选）。

### 5、FormComplexListFieldWidget

**继承**：FormComplexFieldWidget<ActiveRecord[], Field, Props>

**属性**：

+ parentRefreshProcess：父组件的刷新处理函数，通过依赖注入获取。（`RefreshProcessFunction | undefined`）

**方法**：

#### **mountedProcess**

+ **功能描述**：挂载时的处理逻辑，设置当前数据源。
+ **类型**：`() => void`

#### **refreshProcess**

+ **功能描述**：刷新时的处理逻辑（空实现）。
+ **类型**：`(condition?: Condition) => Promise<void>`
+ **参数**：
  - `condition`：条件（可选）。

### 6、FormSubviewFieldWidget

**继承**：FormComplexFieldWidget<Value, Field, Props>

**属性**：

+ currentParentViewActiveRecords：当前父视图的活动记录数组，通过依赖注入提供。（`ActiveRecord[] | undefined`）
+ currentViewDsl：当前子视图的 DSL 定义。（`DslDefinition | undefined`）
+ defaultSubviewType：默认子视图类型，默认为 `ViewType.Form`。（`ViewType`）
+ formData：表单数据，取父视图活动记录的第一条。（`ActiveRecord`）
+ metadataSubviewWidget：元数据子视图组件实例。（`MetadataViewWidget`）
+ runtimeSubviewContext：运行时子视图上下文。（`RuntimeContext`）
+ subviewModel：子视图关联的模型名称。（`string`）
+ subviewModelName：子视图模型的显示名称。（`string | undefined`）
+ subviewModule：子视图所属模块。（`string | undefined`）
+ subviewModuleName：子视图模块的显示名称。（`string | undefined`）
+ subviewType：子视图类型，优先使用当前 DSL 配置。（`ViewType`）

**方法**：

#### **createMetadataSubviewWidget**

+ **功能描述**：创建元数据子视图组件实例，用于初始化子视图上下文。
+ **类型**：`(props: Props) => MetadataViewWidget`
+ **参数**：
  - `props`：组件属性。
+ **返回值**：元数据子视图组件实例。

#### **findViewDslNode**

+ **功能描述**：在 DSL 定义中查找视图节点（`DslDefinitionType.VIEW`）。
+ **类型**：`(dsl: DslDefinition) => DslWidget | undefined`
+ **参数**：
  - `dsl`：DSL 定义对象。
+ **返回值**：视图节点或 `undefined`。

#### **generatorRuntimeSubview**

+ **功能描述**：生成运行时子视图配置，包含类型、模型、布局等信息。
+ **类型**：`(props: Props) => ReturnPromise<RuntimeView>`
+ **参数**：
  - `props`：组件属性。
+ **返回值**：运行时子视图配置对象。

#### **getViewDsl**

+ **功能描述**：从属性中获取子视图的 DSL 定义，查找视图节点。
+ **类型**：`(props: Props) => ReturnPromise<DslDefinition | undefined>`
+ **参数**：
  - `props`：组件属性。
+ **返回值**：DSL 定义或 `undefined`。

#### **getViewLayout**

+ **功能描述**：获取子视图布局配置（空实现，需子类重写）。
+ **类型**：`(props: Props) => ReturnPromise<DslDefinition | undefined>`
+ **参数**：
  - `props`：组件属性。

#### **getViewTemplate**

+ **功能描述**：获取子视图模板配置（空实现，需子类重写）。
+ **类型**：`(props: Props) => ReturnPromise<DslDefinition | undefined>`
+ **参数**：
  - `props`：组件属性。

#### **initSubview**

+ **功能描述**：初始化子视图，包括生成运行时配置、创建上下文等。
+ **类型**：`(props: Props) => ReturnPromise<void>`
+ **参数**：
  - `props`：组件属性。

#### **initSubviewAfterProperties**

+ **功能描述**：子视图属性初始化后的扩展逻辑（空实现，需子类重写）。
+ **类型**：`(props: Props) => void`
+ **参数**：
  - `props`：组件属性。

#### **initRuntimeContext**

+ **功能描述**：通过元数据子视图初始化运行时上下文。
+ **类型**：`(metadataSubviewWidget: MetadataViewWidget, view: RuntimeView) => RuntimeContext`
+ **参数**：
  - `metadataSubviewWidget`：元数据子视图组件实例。
  - `view`：运行时子视图配置。
+ **返回值**：运行时上下文对象。

### 7、FormSubviewObjectFieldWidget

**继承**：FormSubviewFieldWidget<ActiveRecord, Field, Props>

**属性**：

+ defaultSubviewType：默认子视图类型，固定为 `ViewType.Form`。（`ViewType`）
+ parentRefreshProcess：父组件的刷新处理函数，通过依赖注入获取。（`RefreshProcessFunction | undefined`）

**方法**：

#### **initSubviewData**

+ **功能描述**：初始化子视图数据，处理空值并设置数据源和活动记录。
+ **类型**：`() => ReturnPromise<void>`

#### **mountedProcess**

+ **功能描述**：挂载时的处理逻辑，调用 `initSubviewData` 初始化数据。
+ **类型**：`() => Promise<void>`

#### **onValueChange**

+ **功能描述**：监听值变更事件，触发字段变更通知。
+ **类型**：`() => void`
+ **说明**：通过 `@Widget.Watch` 装饰器实现深度监听（`{ deep: true }`）。

#### **refreshParentProcess**

+ **功能描述**：父视图刷新时的处理逻辑，调用 `initSubviewData` 刷新数据。
+ **类型**：`() => Promise<void>`

#### **refreshProcess**

+ **功能描述**：刷新时的处理逻辑（空实现）。
+ **类型**：`(condition?: Condition) => Promise<void>`
+ **参数**：
  - `condition`：条件（可选）。

#### **refreshValueProcess**

+ **功能描述**：值刷新时的处理逻辑，调用 `initSubviewData` 刷新数据。
+ **类型**：`() => Promise<void>`

#### **reloadDataSource**

+ **功能描述**：重新加载数据源，设置当前数据源为传入的记录。
+ **类型**：`(records: ActiveRecords | undefined) => void`
+ **参数**：
  - `records`：要设置的数据源记录（可选）。

### 8、FormSubviewListFieldWidget

**继承**：FormSubviewFieldWidget<ActiveRecord[], Field, Props>

**属性**：

+ activeRecords：当前活动记录数组，可通过 `setCurrentActiveRecords` 设置。（`ActiveRecord[] | undefined`）
+ dataSource：当前数据源，可通过 `setCurrentDataSource` 设置。（`ActiveRecord[] | undefined`）
+ defaultComputeTrigger：默认计算触发时机，包含 `ComputeTrigger.CHANGE`。（`ComputeTrigger[]`）
+ defaultConstructDataTrigger：默认构造数据触发时机，包含 `WidgetTrigger.CHANGE`。（`WidgetTrigger[]`）
+ defaultClearFieldsTrigger：默认清空字段触发时机，包含 `WidgetTrigger.CHANGE`。（`WidgetTrigger[]`）
+ parentRefreshProcess：父组件的刷新处理函数，通过依赖注入获取。（`RefreshProcessFunction | undefined`）
+ subviewSubmitCache：子视图提交缓存管理器。（`SubmitCacheManager | undefined`）

**方法**：

#### **afterTriggerExecute**

+ **功能描述**：在触发事件后执行的逻辑，调用父类方法并同步刷新回调链。
+ **类型**：`(trigger: WidgetTrigger) => Promise<void>`
+ **参数**：
  - `trigger`：触发事件。

#### **deleteDataSource**

+ **功能描述**：从数据源中删除指定索引的记录，同时处理提交缓存。
+ **类型**：`(recordIndexes: number[]) => void`
+ **参数**：
  - `recordIndexes`：要删除的记录索引数组。

#### **deleteDataSourceByEntity**

+ **功能描述**：根据实体从数据源中删除记录，同时处理提交缓存。
+ **类型**：`(records: ActiveRecords, predict?: DeleteActiveRecordsByEntityPredict) => void`
+ **参数**：
  - `records`：要删除的记录实体数组。
  - `predict`：删除预测函数（可选）。

#### **flushDataSource**

+ **功能描述**：刷新数据源，提交数据并重新加载，同时修复表格分页。
+ **类型**：`(reloadDataSource = true) => void`
+ **参数**：
  - `reloadDataSource`：是否重新加载数据源，默认为 `true`。

#### **initSubviewAfterProperties**

+ **功能描述**：在子视图属性初始化后执行的逻辑，克隆提交缓存并扩展运行时上下文。
+ **类型**：`(props: Props) => void`
+ **参数**：
  - `props`：组件属性。

#### **initSubviewData**

+ **功能描述**：初始化子视图数据，设置数据源为当前值或空数组。
+ **类型**：`() => ReturnPromise<void>`

#### **mountedProcess**

+ **功能描述**：挂载时的处理逻辑，调用 `initSubviewData` 初始化数据。
+ **类型**：`() => Promise<void>`

#### **refreshParentProcess**

+ **功能描述**：父视图刷新时的处理逻辑，调用 `initSubviewData` 刷新数据。
+ **类型**：`() => Promise<void>`

#### **refreshProcess**

+ **功能描述**：刷新时的处理逻辑（空实现）。
+ **类型**：`(condition?: Condition) => Promise<void>`
+ **参数**：
  - `condition`：条件（可选）。

#### **refreshValueProcess**

+ **功能描述**：值刷新时的处理逻辑，调用 `initSubviewData` 刷新数据并同步刷新回调链。
+ **类型**：`() => Promise<void>`

#### **reloadActiveRecords**

+ **功能描述**：重新加载活动记录，设置当前活动记录为传入的记录。
+ **类型**：`(records: ActiveRecords | undefined) => void`
+ **参数**：
  - `records`：要设置的活动记录（可选）。

#### **reloadDataSource**

+ **功能描述**：重新加载数据源，设置当前数据源为传入的记录并更新值。
+ **类型**：`(records: ActiveRecords | undefined) => void`
+ **参数**：
  - `records`：要设置的数据源记录（可选）。

#### **repairTablePagination**

+ **功能描述**：修复表格分页，查找并调用相关表格组件的修复方法。
+ **类型**：`() => void`

## （三）详情字段抽象基类

### 1、DetailRelationSelectFieldWidget

**继承**：BaseSelectFieldWidget<Value, Field, Props>

**属性**：

+ currentValue：当前值的标签显示，通过 `handleTableLabel` 处理后的值。（计算属性）
+ relationFieldKey：关系字段键，通过 `getRelationFieldKey` 方法获取。（计算属性）

**方法**：

#### **handleTableLabel**

+ **功能描述**：处理表格标签显示，根据配置的标签字段或表达式生成显示值。
+ **类型**：`(dataEntity: any) => { label: string; value: any }`
+ **参数**：
  - `dataEntity`：数据实体。
+ **返回值**：包含 `label`（显示标签）和 `value`（原始值）的对象。

## （四）组件抽象基类

### 1、BaseSelectFieldWidget

**继承**：FormComplexFieldWidget<Value, Field, Props>

**属性**：

+ labelFields：引用模型的标签字段列表，默认空数组。（`string[]`）
+ maxTagCount：最多显示的 tag 数量，从 DSL 配置转换为数字。（`number | undefined`）
+ optionLabel：选项标签，从 DSL 配置获取，默认为空字符串。（`string`）
+ optionLabelContextArgs：选项标签上下文参数，从 DSL 配置获取，默认为空字符串。（`string`）
+ searchFields：搜索字段列表，从 DSL 配置转换或使用 `labelFields`。（`string[]`）
+ separator：分隔符，从 DSL 配置获取，默认 `,`。（`string`）

**方法**：

#### **mountedProcess**

+ **功能描述**：挂载时处理数据源，根据字段是否为多值类型（`field.multi`）和值的类型修复记录数组。
+ **类型**：`() => void`

### 2、FormSelectComplexFieldWidget

**继承**：BaseSelectFieldWidget<Value, Field, Props>

**属性**：

+ allowClear：是否允许清空，从 DSL 配置获取，默认 `true`。（`boolean`）
+ clearBackFillSelected：是否清除回填选中项，从 DSL 配置获取，默认 `false`。（`boolean`）
+ currentPage：当前页码，默认 `1`。（`number`）
+ dataList：原始数据列表。（`Record<string, unknown>[]`）
+ domain：动态域，支持动态解析。（`string | undefined`）
+ loadFunctionFun：数据加载函数名，从 DSL 配置获取。（`string | undefined`）
+ loadMoreLoading：加载更多状态，默认 `false`。（`boolean`）
+ maxDepth：最大查询深度，从 DSL 配置转换为数字，默认 `1`。（`number`）
+ maxNumber：最多选择数量，从 DSL 配置获取，默认 `Infinity`。（`number`）
+ minNumber：最少选择数量，从 DSL 配置获取，默认 `0`。（`number`）
+ needInitOptions：是否需要初始化选项，根据值和只读状态判断。（计算属性）
+ options：下拉选项列表，默认空数组。（`Record<string, unknown>[]`）
+ pageSize：分页大小，默认 `PageSizeEnum.OPTION_2`。（`number`）
+ queryData：查询参数，通过表达式生成。（计算属性）
+ queryFieldName：查询字段名，默认 `name`。（`string`）
+ renderOnParent：是否在父级渲染，从 DSL 配置获取，默认 `false`。（`boolean`）
+ searchValue：搜索关键词，默认空字符串。（`string`）
+ showMoreButton：是否显示加载更多按钮，默认 `false`。（`boolean`）
+ showSearch：是否显示搜索框，从 DSL 配置获取，默认 `true`。（`boolean`）
+ totalPages：总页数，默认 `10000`。（`number`）
+ valueEqualOptions：值是否与选项一致，根据值和选项计算。（计算属性）

**方法**：

#### **blur**

+ **功能描述**：触发失焦事件，处理空选项时恢复初始值，调用父类方法。
+ **类型**：`() => void`

#### **buildQueryData**

+ **功能描述**：构建查询参数，解析 DSL 配置中的 `queryDataConfig`。
+ **类型**：`() => ObjectValue`
+ **返回值**：查询参数字典。

#### **changeSearchValue**

+ **功能描述**：更新搜索关键词。
+ **类型**：`(val: string) => void`
+ **参数**：
  - `val`：新搜索关键词。

#### **dropdownVisibleChange**

+ **功能描述**：处理下拉框显示状态变化，根据状态初始化或刷新数据。
+ **类型**：`(open: boolean) => void`
+ **参数**：
  - `open`：下拉框是否显示。

#### **fillOptions**

+ **功能描述**：填充选项列表（抽象方法，需子类实现）。
+ **类型**：`(dataList: Record<string, unknown>[], insetDefaultValue?: boolean) => void`
+ **参数**：
  - `dataList`：原始数据列表。
  - `insetDefaultValue`：是否插入默认值（可选）。

#### **fillOptionsForMulti**

+ **功能描述**：处理多选场景下的选项填充，确保选中值在选项中。
+ **类型**：`(dataList: Record<string, unknown>[]) => Promise<void>`
+ **参数**：
  - `dataList`：原始数据列表。

#### **fillOptionsForSingle**

+ **功能描述**：处理单选场景下的选项填充，确保选中值在选项中。
+ **类型**：`(dataList: Record<string, unknown>[], insetDefaultValue?: boolean) => Promise<void>`
+ **参数**：
  - `dataList`：原始数据列表。
  - `insetDefaultValue`：是否插入默认值（可选）。

#### **focus**

+ **功能描述**：触发聚焦事件，根据条件初始化数据加载。
+ **类型**：`() => void`

#### **genQueryData**

+ **功能描述**：生成查询参数，解析表达式配置。
+ **类型**：`() => ObjectValue`
+ **返回值**：查询参数字典。

#### **handleEmpty**

+ **功能描述**：处理清空操作，重置搜索关键词并刷新数据。
+ **类型**：`(forceSearch?: boolean) => void`
+ **参数**：
  - `forceSearch`：是否强制搜索（可选）。

#### **handleSelectOption**

+ **功能描述**：处理选项选择逻辑，生成带标签的选项数组。
+ **类型**：`(optionDataList: Record<string, unknown>[], referencesModel: RuntimeModel | undefined) => Entity[]`
+ **参数**：
  - `optionDataList`：原始选项数据列表。
  - `referencesModel`：引用的运行时模型（可选）。
+ **返回值**：带标签的选项数组。

#### **innerQueryPage**

+ **功能描述**：执行分页查询，支持模型、条件、字段等参数。
+ **类型**：`(modelModel: string, option: IQueryPageOption, fields?: RuntimeModelField[], variables?: ObjectValue, context?: ObjectValue) => Promise<IQueryPageResult<T>>`
+ **参数**：
  - `modelModel`：模型名称。
  - `option`：分页查询选项。
  - `fields`：查询字段列表（可选）。
  - `variables`：变量参数（可选）。
  - `context`：上下文参数（可选）。
+ **返回值**：分页查询结果。

#### **initLoadOptions**

+ **功能描述**：初始化加载选项数据，触发分页查询。
+ **类型**：`() => Promise<void>`

#### **loadMore**

+ **功能描述**：加载更多数据，更新页码并触发查询。
+ **类型**：`() => Promise<void>`

#### **loadOptions**

+ **功能描述**：加载选项数据，根据模型类型和配置执行查询。
+ **类型**：`(param?: IQueryPageOption) => Promise<IQueryPageResult<Record<string, unknown>>>`
+ **参数**：
  - `param`：查询参数（可选）。
+ **返回值**：分页查询结果。

#### **mountedProcess**

+ **功能描述**：挂载时处理逻辑，初始化查询字段、根据条件加载选项。
+ **类型**：`() => void`

#### **onDomainChange**

+ **功能描述**：监听动态域变更，重置页码并重新加载选项。
+ **类型**：`(newDomain: string, oldDomain: string) => Promise<void>`
+ **参数**：
  - `newDomain`：新动态域值。
  - `oldDomain`：旧动态域值。

#### **onQueryChange**

+ **功能描述**：监听查询参数变更，重置页码并重新加载选项。
+ **类型**：`(newData: ObjectValue, oldData: ObjectValue) => Promise<void>`
+ **参数**：
  - `newData`：新查询参数。
  - `oldData`：旧查询参数。

#### **onSelect**

+ **功能描述**：处理选项选择事件，更新选中项并清空搜索关键词。
+ **类型**：`(e: Record<string, unknown>) => Promise<void>`
+ **参数**：
  - `e`：选中的选项数据。

#### **search**

+ **功能描述**：执行搜索操作，防抖处理并触发查询。
+ **类型**：`(searchValue: string, forceSearch?: boolean) => void`
+ **参数**：
  - `searchValue`：搜索关键词。
  - `forceSearch`：是否强制搜索（可选）。

#### **setQueryFieldName**

+ **功能描述**：设置查询字段名。
+ **类型**：`(queryFieldName: string) => void`
+ **参数**：
  - `queryFieldName`：查询字段名。

#### **validator**

+ **功能描述**：执行校验逻辑，检查选择数量是否符合配置。
+ **类型**：`() => Promise<ValidatorInfo>`
+ **返回值**：校验信息对象。

### 3、SearchRangeFieldWidget

**继承**：FormFieldWidget<Value, Field>

**属性**：

+ allowClear：是否允许清空，从 DSL 配置获取，默认 `true`。（`boolean`）
+ endDefaultValue：结束值的默认值，从 DSL 配置获取。（`unknown`）
+ endPlaceholder：结束输入框的占位文本，翻译自 DSL 配置。（`string`）
+ operator：字段操作符，从字段配置获取。（`string | undefined`）
+ startDefaultValue：开始值的默认值，从 DSL 配置获取。（`unknown`）
+ startPlaceholder：开始输入框的占位文本，翻译自 DSL 配置。（`string`）

**方法**：

#### **getInitializeComponent**

+ **功能描述**：获取初始化组件（抽象方法，需子类实现）。
+ **类型**：`() => WidgetComponent`

### 4、FormRangeFieldsWidget

**继承**：BaseFormItemWidget<[Value, Value], Props>

**属性**：

+ endDefaultValue：结束字段的默认值，从 DSL 配置获取。（`unknown`）
+ endField：结束字段的元数据。（`Field`）
+ itemData：项目数据标识，格式为 `startField.data#endField.data`。（计算属性）
+ itemName：项目名称标识，格式为 `startField.name#endField.name`。（计算属性）
+ startDefaultValue：开始字段的默认值，从 DSL 配置获取。（`unknown`）
+ startField：开始字段的元数据。（`Field`）

**方法**：

#### **getValue**

+ **功能描述**：获取范围字段的值，返回包含开始值和结束值的数组。
+ **类型**：`() => [Value, Value] | null | undefined`
+ **返回值**：包含开始值和结束值的数组，或 `null`、`undefined`。

#### **setValue**

+ **功能描述**：设置范围字段的值，更新表单数据。
+ **类型**：`(value: [Value, Value] | null | undefined) => void`
+ **参数**：
  - `value`：要设置的值，可为数组、`null` 或 `undefined`。

#### **submit**

+ **功能描述**：提交范围字段数据，返回包含开始和结束字段值的对象。
+ **类型**：`() => Record<string, unknown>`
+ **返回值**：包含字段名和对应值的对象。

#### **validator**

+ **功能描述**：验证范围字段，检查必填项和调用父类验证逻辑。
+ **类型**：`() => Promise<ValidatorInfo>`
+ **返回值**：验证结果信息。

### 5、AbstractTreeFieldWidget

**继承**：FormFieldWidget<Value, Field, Props>

**属性**：

+ backfillTreeNodes：回填树节点存储数组。（`OioTreeNode<V>[][]`）
+ checkable：是否可勾选，从 DSL 配置获取，默认 `false`。（`boolean`）
+ checkedKeys：勾选节点的键数组。（`string[] | undefined`）
+ defaultPagination：默认分页配置，包含 `current` 和 `pageSize`。（`Pagination`）
+ enableLoadData：是否启用数据加载，默认 `true`。（`boolean`）
+ enableSearch：是否启用搜索，从 DSL 配置获取，默认 `true`。（`boolean`）
+ expandedKeys：展开节点的键数组。（`string[] | undefined`）
+ halfCheckedKeys：半勾选节点的键数组。（`string[] | undefined`）
+ invisible：是否不可见，基于树定义和父类属性计算。（计算属性）
+ isFetchAll：是否加载全部数据，从 DSL 配置或选择模式推断。（`boolean`）
+ loadIdempotentKey：加载幂等键，用于防止重复请求。（`string | undefined`）
+ maxTagCount：最多显示的 tag 数量，从 DSL 配置转换为数字。（`number | undefined`）
+ mountedCallChaining：挂载时的回调链。（`CallChaining | undefined`）
+ pkSeparator：主键分隔符，静态属性 `'-'`。（`string`）
+ referencesModel：引用的运行时模型。（计算属性，`RuntimeModel | undefined`）
+ refreshCallChaining：刷新时的回调链。（`CallChaining<boolean> | undefined`）
+ selectable：是否可选，从 DSL 配置获取，默认 `true`。（`boolean`）
+ selectMode：选择模式，默认 `SelectMode.single`。（`SelectMode`）
+ searchRootNode：搜索后的根节点。（`OioTreeNode<V> | undefined`）
+ treeDefinition：树结构定义元数据。（`TreeNodeMetadata | undefined`）
+ treeLevel：树结构层级数。（`number`）

**方法**：

#### **backfillDataProcess**

+ **功能描述**：回填数据处理逻辑（抽象方法，需子类实现）。
+ **类型**：`(data: BackfillDataParameters<V>) => ReturnPromise<void>`
+ **参数**：
  - `data`：回填数据参数对象。

#### **clearBackfillDataProcess**

+ **功能描述**：清理回填数据逻辑（抽象方法，需子类实现）。
+ **类型**：`() => ReturnPromise<void>`

#### **computeNodeTitle**

+ **功能描述**：计算节点标题，基于标签、元数据和数据表达式。
+ **类型**：`(val: V) => string`
+ **参数**：
  - `val`：节点值对象。
+ **返回值**：节点标题字符串。

#### **executeNodeExpression**

+ **功能描述**：执行节点表达式，解析动态内容。
+ **类型**：`(activeRecord: ActiveRecord, expression: string, errorValue?: T) => T | string | undefined`
+ **参数**：
  - `activeRecord`：当前活动记录。
  - `expression`：表达式字符串。
  - `errorValue`：表达式执行失败时的默认值（可选）。
+ **返回值**：表达式执行结果。

#### **fillChildren**

+ **功能描述**：填充节点子节点，生成树结构。
+ **类型**：`(node: OioTreeNode<V>, results: ResponseBody[]) => void`
+ **参数**：
  - `node`：父节点。
  - `results`：子节点数据列表。

#### **fetchAll**

+ **功能描述**：加载全部树节点数据。
+ **类型**：`() => Promise<TreeNodeResponseBody[]>`
+ **返回值**：树节点响应体数组。

#### **fetchData**

+ **功能描述**：加载指定节点的子节点数据。
+ **类型**：`(node: OioTreeNode<V>, disableSelfReferences?: boolean) => Promise<ResponseBody[]>`
+ **参数**：
  - `node`：目标节点。
  - `disableSelfReferences`：是否禁用自引用过滤（可选）。
+ **返回值**：子节点数据列表。

#### **generatorCompareRecords**

+ **功能描述**：生成选中记录的比较对象，用于回填判定。
+ **类型**：`(currentValues: ActiveRecord[], metadataList: TreeNodeMetadata[]) => ActiveRecord[] | undefined`
+ **参数**：
  - `currentValues`：当前选中值数组。
  - `metadataList`：节点元数据列表。
+ **返回值**：比较记录数组或 `undefined`。

#### **generatorDefaultTreeDefinition**

+ **功能描述**：生成默认树结构定义（抽象方法，需子类实现）。
+ **类型**：`(props: Props) => TreeNodeMetadata | undefined`
+ **参数**：
  - `props`：组件属性。

#### **generatorExpressionParameters**

+ **功能描述**：生成表达式运行参数，包含上下文数据。
+ **类型**：`() => ExpressionRunParam`
+ **返回值**：表达式运行参数字典。

#### **generatorNewTreeNode**

+ **功能描述**：生成新树节点，设置节点属性。
+ **类型**：`(parent: OioTreeNode<V>, key: string, title: string | undefined, metadata: TreeNodeMetadata, data: ActiveRecord) => OioTreeNode<V>`
+ **参数**：
  - `parent`：父节点。
  - `key`：节点键。
  - `title`：节点标题（可选）。
  - `metadata`：节点元数据。
  - `data`：节点数据。
+ **返回值**：新创建的树节点。

#### **generatorRootNode**

+ **功能描述**：生成根树节点，初始化基础属性。
+ **类型**：`(metadata: TreeNodeMetadata) => OioTreeNode<V>`
+ **参数**：
  - `metadata`：根节点元数据。
+ **返回值**：根树节点。

#### **getBackfillDataFilter**

+ **功能描述**：获取回填数据过滤条件，基于元数据和层级。
+ **类型**：`(metadata: TreeNodeMetadata, index: number) => string | undefined`
+ **参数**：
  - `metadata`：节点元数据。
  - `index`：层级索引。
+ **返回值**：过滤条件字符串或 `undefined`。

#### **getTreeMetadataList**

+ **功能描述**：获取树结构元数据列表，按层级排列。
+ **类型**：`() => TreeNodeMetadata[]`
+ **返回值**：元数据数组。

#### **isLeafPredict**

+ **功能描述**：预测节点是否为叶子节点，基于元数据配置。
+ **类型**：`(node: TreeNodeMetadata | undefined) => boolean`
+ **参数**：
  - `node`：节点元数据（可选）。
+ **返回值**：是否为叶子节点。

#### **loadAllData**

+ **功能描述**：加载全部节点数据，处理加载状态和树结构转换。
+ **类型**：`() => Promise<TreeNodeResponseBody[]>`
+ **返回值**：树节点响应体数组。

#### **loadData**

+ **功能描述**：加载指定节点的子节点数据（懒加载）。
+ **类型**：`(node: OioTreeNode<V>) => Promise<ResponseBody[]>`
+ **参数**：
  - `node`：目标节点。
+ **返回值**：子节点数据列表。

#### **loadMoreData**

+ **功能描述**：加载指定节点的更多子节点数据，更新分页。
+ **类型**：`(node: OioTreeNode<V>) => Promise<ResponseBody[]>`
+ **参数**：
  - `node`：目标节点。
+ **返回值**：子节点数据列表。

#### **loadNode**

+ **功能描述**：执行节点加载逻辑，处理加载状态。
+ **类型**：`(node: OioTreeNode<V>, fn: (...args) => R, ...args) => Promise<R>`
+ **参数**：
  - `node`：目标节点。
  - `fn`：加载函数。
+ **返回值**：加载函数执行结果。

#### **mountedProcess**

+ **功能描述**：挂载时处理逻辑，触发数据回填和订阅。
+ **类型**：`() => Promise<void>`

#### **onSearch**

+ **功能描述**：处理搜索事件，防抖后执行内部搜索逻辑。
+ **类型**：`(keywords: string) => void`
+ **参数**：
  - `keywords`：搜索关键词。

#### **onUpdateCheckedKeys**

+ **功能描述**：更新勾选节点键数组。
+ **类型**：`(val: string[]) => void`
+ **参数**：
  - `val`：新勾选键数组。

#### **onUpdateExpandedKeys**

+ **功能描述**：更新展开节点键数组。
+ **类型**：`(val: string[]) => void`
+ **参数**：
  - `val`：新展开键数组。

#### **onUpdateHalfCheckedKeys**

+ **功能描述**：更新半勾选节点键数组。
+ **类型**：`(val: string[]) => void`
+ **参数**：
  - `val`：新半勾选键数组。

#### **pushSelectedNodes**

+ **功能描述**：推送选中节点到列表，基于比较记录判定。
+ **类型**：`(currentValues: ActiveRecord[], selectedNodes: OioTreeNode<TreeData>[], compareRecords: ActiveRecord[], node: OioTreeNode<TreeData>, record: ActiveRecord | undefined) => void`
+ **参数**：
  - `currentValues`：当前选中值数组。
  - `selectedNodes`：选中节点列表。
  - `compareRecords`：比较记录数组。
  - `node`：当前节点。
  - `record`：节点数据（可选）。

#### **refreshProcess**

+ **功能描述**：刷新时处理逻辑，触发数据回填。
+ **类型**：`() => Promise<void>`

#### **reloadBackfillDataByValue**

+ **功能描述**：通过当前值重新加载回填数据。
+ **类型**：`() => Promise<void>`

#### **subscribeProcess**

+ **功能描述**：订阅表单数据变化，触发数据回填。
+ **类型**：`() => void`

#### **convertBackfillData**

+ **功能描述**：转换回填数据为树节点结构，支持自定义回调。
+ **类型**：`(currentValues: ActiveRecord[], metadataList: TreeNodeMetadata[], list: TreeNodeResponseBody[], customCreateNodeCallback?: (node: OioTreeNode<V>, value: V | undefined) => void, customUpdateNodeCallback?: (node: OioTreeNode<V>, value: V) => void) => BackfillDataParameters<V> | undefined`
+ **参数**：
  - `currentValues`：当前选中值数组。
  - `metadataList`：节点元数据列表。
  - `list`：回填数据列表。
  - `customCreateNodeCallback`：自定义创建节点回调（可选）。
  - `customUpdateNodeCallback`：自定义更新节点回调（可选）。
+ **返回值**：回填数据参数对象或 `undefined`。

#### **collectionBackfillTreeNodes**

+ **功能描述**：递归收集回填树节点，去重处理。
+ **类型**：`(nodes: OioTreeNode<V>[]) => void`
+ **参数**：
  - `nodes`：树节点数组。

#### **filterChanged**

+ **功能描述**：监听过滤条件变化，触发回填数据清理。
+ **类型**：`() => void`

### 6、FormTreeFieldWidget

**继承**：AbstractTreeFieldWidget<TreeData, Value, Field, Props>

**属性**：

+ checkable：是否可勾选，固定为 `true`。（`boolean`）
+ checkStrictly：父子节点勾选是否关联，从 DSL 配置获取，默认 `false`。（`boolean`）
+ nodeCheckedAllLabel：全选节点的标签文本，从 DSL 配置获取。（`string | undefined`）
+ nodeUncheckedAllLabel：取消全选节点的标签文本，从 DSL 配置获取。（`string | undefined`）
+ onlySelectedLeaf：是否只允许选择叶子节点，从 DSL 配置获取，默认 `false`。（`boolean`）
+ selectedValue：当前选中的节点或节点数组。（`OioTreeNode<TreeData> | OioTreeNode<TreeData>[] | undefined`）

**方法**：

#### **backfillDataProcess**

+ **功能描述**：回填数据处理，设置选中节点。
+ **类型**：`({ selectedNodes }: BackfillDataParameters) => void`
+ **参数**：
  - `selectedNodes`：选中的节点数组。

#### **clearBackfillDataProcess**

+ **功能描述**：清理回填数据，重置根节点和选中状态。
+ **类型**：`() => Promise<void>`

#### **collectionSelectedAllNodes**

+ **功能描述**：收集指定节点及其所有子节点中符合条件的节点。
+ **类型**：`(selectedNode: OioTreeNode<TreeData>) => OioTreeNode<TreeData>[]`
+ **参数**：
  - `selectedNode`：起始节点。
+ **返回值**：符合条件的节点数组。

#### **collectionSelectedNodes**

+ **功能描述**：收集选中的节点，根据 `checkStrictly` 决定是否包含子节点。
+ **类型**：`(selectedNode: OioTreeNode<TreeData>) => OioTreeNode<TreeData>[]`
+ **参数**：
  - `selectedNode`：选中的节点。
+ **返回值**：符合条件的节点数组。

#### **fetchBackfillData**

+ **功能描述**：获取回填数据，加载全部节点。
+ **类型**：`(currentValues: ActiveRecord[], metadataList: TreeNodeMetadata[]) => Promise<TreeNodeResponseBody[] | undefined>`
+ **参数**：
  - `currentValues`：当前值数组。
  - `metadataList`：元数据列表。
+ **返回值**：节点响应体数组或 `undefined`。

#### **generatorNewTreeNode**

+ **功能描述**：生成新的树节点，并设置节点属性。
+ **类型**：`(parent: OioTreeNode<TreeData>, key: string, title: string | undefined, metadata: TreeNodeMetadata, data: ActiveRecord) => OioTreeNode<TreeData>`
+ **参数**：
  - `parent`：父节点。
  - `key`：节点键。
  - `title`：节点标题。
  - `metadata`：节点元数据。
  - `data`：节点数据。
+ **返回值**：新生成的树节点。

#### **getCurrentSelectedValue**

+ **功能描述**：获取当前选中的节点数组。
+ **类型**：`() => OioTreeNode<TreeData>[]`
+ **返回值**：当前选中的节点数组。

#### **nodeCheckedAll**

+ **功能描述**：判断节点是否支持全选功能，从 DSL 配置获取。
+ **类型**：`(node: OioTreeNode<TreeData>) => boolean`
+ **参数**：
  - `node`：目标节点。
+ **返回值**：是否支持全选。

#### **onChecked**

+ **功能描述**：处理节点勾选事件，更新选中状态。
+ **类型**：`(node: OioTreeNode<TreeData>, selected: boolean) => Promise<void>`
+ **参数**：
  - `node`：目标节点。
  - `selected`：是否选中。

#### **onNodeCheckedAll**

+ **功能描述**：处理节点全选事件，更新选中状态。
+ **类型**：`(node: OioTreeNode<TreeData>, selected: boolean) => void`
+ **参数**：
  - `node`：目标节点。
  - `selected`：是否选中。

#### **onSelected**

+ **功能描述**：处理节点选择事件（仅支持多选模式）。
+ **类型**：`(node: OioTreeNode<TreeData>, selected: boolean) => Promise<void>`
+ **参数**：
  - `node`：目标节点。
  - `selected`：是否选中。

#### **onSelectedValueChange**

+ **功能描述**：处理选中值变化，更新选中状态并触发回调。
+ **类型**：`(currentSelectedValue: OioTreeNode<TreeData>[], targetSelectedValues: OioTreeNode<TreeData>[], selected: boolean) => void`
+ **参数**：
  - `currentSelectedValue`：当前选中值。
  - `targetSelectedValues`：目标选中值。
  - `selected`：是否选中。

#### **setSelectedValue**

+ **功能描述**：设置选中值，并更新勾选键数组。
+ **类型**：`(selectedValue: OioTreeNode<TreeData> | OioTreeNode<TreeData>[] | undefined) => void`
+ **参数**：
  - `selectedValue`：选中的节点或节点数组。

### 7、FormTreeSelectFieldWidget

**继承**：AbstractTreeFieldWidget<TreeData, Value, Field, Props>

**属性**：

+ multipleCheckedStrategy：多选时的勾选策略，从 DSL 配置获取。（`string | undefined`）
+ onlySelectedLeaf：是否只允许选择叶子节点，从 DSL 配置获取，默认 `false`。（`boolean`）
+ selectedValue：当前选中的树节点值（单选或多选）。（`SimpleTreeSelected | SimpleTreeSelected[] | undefined`）
+ treeCheckStrictly：树结构勾选是否严格模式，从 DSL 配置转换为布尔值。（`boolean | undefined`）

**方法**：

#### **backfillDataProcess**

+ **功能描述**：回填数据处理，将选中节点转换为 `SimpleTreeSelected` 格式。
+ **类型**：`({ selectedNodes }: BackfillDataParameters) => void`
+ **参数**：
  - `selectedNodes`：选中的树节点数组。

#### **clearBackfillDataProcess**

+ **功能描述**：清理回填数据，重置根节点和选中状态。
+ **类型**：`() => void`

#### **collectionSelectedNodes**

+ **功能描述**：根据选中值收集对应的树节点。
+ **类型**：`(selectedValue: SimpleTreeSelected | SimpleTreeSelected[]) => OioTreeNode<TreeData>[]`
+ **参数**：
  - `selectedValue`：选中的值（单选或多选）。
+ **返回值**：对应的树节点数组。

#### **generatorNewTreeNode**

+ **功能描述**：生成新树节点，并设置可选属性。
+ **类型**：`(parent: OioTreeNode<TreeData>, key: string, title: string | undefined, metadata: TreeNodeMetadata, data: ActiveRecord) => OioTreeNode<TreeData>`
+ **参数**：
  - `parent`：父节点。
  - `key`：节点键。
  - `title`：节点标题。
  - `metadata`：节点元数据。
  - `data`：节点数据。
+ **返回值**：新生成的树节点。

#### **getSelectedNodes**

+ **功能描述**：过滤并获取符合引用模型的选中节点。
+ **类型**：`(selectedValue: SimpleTreeSelected | SimpleTreeSelected[]) => OioTreeNode<TreeData>[] | undefined`
+ **参数**：
  - `selectedValue`：选中的值（单选或多选）。
+ **返回值**：过滤后的树节点数组或 `undefined`。

#### **onSelectedChange**

+ **功能描述**：处理选中值变化事件，校验并更新选中状态。
+ **类型**：`(selectedValue: SimpleTreeSelected | SimpleTreeSelected[], event: TreeSelectNodeChangeEvent) => void`
+ **参数**：
  - `selectedValue`：选中的值（单选或多选）。
  - `event`：节点变化事件对象。

#### **validatorSelectedValue**

+ **功能描述**：校验选中值是否符合规则（如仅叶子节点）。
+ **类型**：`(selectedValue: SimpleTreeSelected | SimpleTreeSelected[], selectedNodes: OioTreeNode<TreeData>[]) => boolean | SimpleTreeSelected | SimpleTreeSelected[] | undefined`
+ **参数**：
  - `selectedValue`：选中的值（单选或多选）。
  - `selectedNodes`：对应的树节点数组。
+ **返回值**：校验结果（布尔值或过滤后的选中值）。

### 8、FormCascaderFieldWidget

**继承**：AbstractTreeFieldWidget<TreeData, Value, Field, Props>

**属性**：

+ changeOnSelect：是否在选择时立即触发变化，从 DSL 配置获取，默认 `false`。（`boolean`）
+ labelsSeparator：标签分隔符，从 DSL 配置获取。（`string | undefined`）
+ multipleCheckedStrategy：多选时的勾选策略，从 DSL 配置获取。（`string | undefined`）
+ selectedLabels：当前选中节点的标签路径数组。（`string[] | string[][] | undefined`）
+ selectedValue：当前选中节点的键路径数组。（`string[] | string[][] | undefined`）
+ showPath：是否显示完整路径，从 DSL 配置获取，默认 `false`。（`boolean`）

**方法**：

#### **backfillDataProcess**

+ **功能描述**：回填数据处理，将选中节点转换为键路径和标签路径数组。
+ **类型**：`({ selectedNodes }: BackfillDataParameters) => void`
+ **参数**：
  - `selectedNodes`：选中的树节点数组。

#### **clearBackfillDataProcess**

+ **功能描述**：清理回填数据，重置根节点和选中状态。
+ **类型**：`() => void`

#### **collectionSelectedLabels**

+ **功能描述**：收集选中节点的标签路径（从子节点到根节点）。
+ **类型**：`(selectedNode: OioTreeNode<TreeData> | undefined) => string[]`
+ **参数**：
  - `selectedNode`：目标节点（可选）。
+ **返回值**：标签路径数组。

#### **collectionSelectedValues**

+ **功能描述**：收集选中节点的键路径（从子节点到根节点）。
+ **类型**：`(selectedNode: OioTreeNode<TreeData> | undefined) => string[]`
+ **参数**：
  - `selectedNode`：目标节点（可选）。
+ **返回值**：键路径数组。

#### **fetchBackfillData**

+ **功能描述**：获取回填数据，支持全量加载或反向查询。
+ **类型**：`(currentValues: ActiveRecord[], metadataList: TreeNodeMetadata[]) => Promise<TreeNodeResponseBody[] | undefined>`
+ **参数**：
  - `currentValues`：当前值数组。
  - `metadataList`：元数据列表。
+ **返回值**：节点响应体数组或 `undefined`。

#### **getSelectedNodes**

+ **功能描述**：根据选中值和选项获取对应的树节点，支持多选策略。
+ **类型**：`(selectedValue: string[] | string[][], selectedOptions: CascaderItemType[] | CascaderItemType[][]) => OioTreeNode<TreeData>[] | undefined`
+ **参数**：
  - `selectedValue`：选中的键路径数组。
  - `selectedOptions`：选中的选项数组。
+ **返回值**：对应的树节点数组或 `undefined`。

#### **onSelectedChange**

+ **功能描述**：处理选中值变化事件，校验并更新选中状态和标签。
+ **类型**：`(selectedValue: string[] | string[][], selectedOptions: CascaderItemType[] | CascaderItemType[][]) => void`
+ **参数**：
  - `selectedValue`：选中的键路径数组。
  - `selectedOptions`：选中的选项数组。

#### **validatorSelectedValue**

+ **功能描述**：校验选中值是否符合规则（如路径完整性、叶子节点限制）。
+ **类型**：`(selectedValue: string[] | string[][], selectedNodes: OioTreeNode<TreeData>[]) => boolean | string[] | string[][]`
+ **参数**：
  - `selectedValue`：选中的键路径数组。
  - `selectedNodes`：对应的树节点数组。
+ **返回值**：校验结果（布尔值或过滤后的键路径数组）。


