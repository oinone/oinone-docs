---
title: Field
index: true
category:
  - R&D Manual
  - Reference
  - Frontend API
  - Widget
  - Field
dir:
  link: true
  order: 10
next:
  text: Table Field
  link: /v6/en/DevManual/Reference/Front-EndFramework/Widget/Field/table-field.md
---
In Oinone Kunlun, fields are a very important type of metadata, which often determine the data content and display form of a page. The Widget framework classifies components, and through classification features, we can determine the scope of use of components when registering them. When using components, we can select the most suitable component from all registered components for rendering. Field components are a type of component used in DSL through the form of field tags.

# I. Registration of Field Components

## (Ⅰ) Registration Options for Field Components

``` typescript
/**
 * Field component registration options
 */
export interface BaseFieldOptions extends SPIOptions {
  /**
   * Current view type
   */
  viewType?: ViewType | ViewType[];
  /**
   * Component name
   */
  widget?: string | string[];
  /**
   * Field business type
   */
  ttype?: ModelFieldType | ModelFieldType[];
  /**
   * Whether it is multi-value
   */
  multi?: boolean;
  /**
   * Specified model
   */
  model?: string | string[];
  /**
   * Specified view name
   */
  viewName?: string | string[];
  /**
   * Specified field
   */
  name?: string;
}
```

It is not difficult to find from the above type declaration that its classification dimensions cover the following aspects: view type, component name, field business type, whether it is multi-value, model code, field name, and view name. These dimensions are used to describe the usage location of the component. Generally speaking, the more "precise" the location description is, the higher the priority of the component when rendering in the corresponding location. In the case of completely the same location description, the later registered component will overwrite the earlier registered component.

## (Ⅱ) Registering Components

### 1. Registering Default Components for Field Business Types

When the `widget` attribute is not specified, the component will be registered as the default component for the corresponding field business type. Take `FormStringInputFieldWidget` as an example:

``` typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search],
    ttype: ModelFieldType.String
  })
)
export class FormStringInputFieldWidget extends FormStringFieldWidget
```

For this component, use it through the `field` tag in `DSL`:

``` xml
<field data="code" />
```

### 2. Registering Components with Specified Names

For components of the same field business type, we specify the component name through `widget` to distinguish them from other components. Take `FormStringHyperlinksFieldWidget` as an example:

``` typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Form,
    ttype: ModelFieldType.String,
    widget: 'Hyperlinks'
  })
)
export class FormStringHyperlinksFieldWidget extends FormStringInputFieldWidget
```

For this component, use it through the `field` tag in `DSL` and specify the `widget` attribute:

``` xml
<field data="url" widget="Hyperlinks" />
```

# II. Reference List

## (Ⅰ) Abstract Base Class for Table Fields

### 1. BaseTableColumnWidget

**Inheritance**: BaseDataWidget<`Props`>

**Attributes**:

+ align: Alignment of table column content, obtained from DSL configuration and converted to lowercase. (`string`)
+ cellEditable: Whether the cell is editable, valid only when `editable` is `true` and `editorMode` is `TableEditorMode.cell`. (`boolean`)
+ clientInvisible: Whether it is invisible to the client, judged based on whether the current client is supported. (`boolean`)
+ columnType: Table column type, obtained from DSL configuration. (`string`)
+ editorCancelText: Edit cancel text, obtained from DSL configuration. (`string | undefined`)
+ editorCloseTrigger: Edit close trigger method, obtained from DSL configuration. (`TableEditorCloseTrigger | undefined`)
+ editorCondition: Edit condition, judged based on DSL configuration and the `tableRowEditorClosedBefore` method. (`Promise<boolean | undefined>`)
+ editorConfirm: Edit confirmation information, obtained from DSL configuration. (`string | undefined`)
+ editorConfirmPosition: Position of the edit confirmation box, obtained from DSL configuration. (`PopconfirmPlacement`)
+ editorConfirmText: Edit confirmation text, obtained from DSL configuration. (`string | undefined`)
+ editorEnableConfirm: Whether to enable edit confirmation, obtained from DSL configuration. (`boolean`)
+ editorEnterText: Enter key text for edit confirmation, obtained from DSL configuration. (`string | undefined`)
+ editorMode: Edit mode, obtained from DSL configuration. (`TableEditorMode | undefined`)
+ editorTrigger: Edit trigger method, obtained from DSL configuration. (`TableEditorTrigger | undefined`)
+ editable: Whether the table column is editable, judged based on DSL configuration and other conditions. (`boolean`)
+ existExpandRow: Whether there is an expandable row, obtained from DSL configuration. (`boolean | undefined`)
+ fixed: Whether the table column is fixed, obtained from DSL configuration. (`string | boolean | undefined`)
+ footerAlign: Alignment of the table column footer, obtained from DSL configuration and converted to lowercase. (`string`)
+ footerClassName: Class name of the table column footer, obtained from DSL configuration. (`string | string[] | undefined`)
+ headerAlign: Alignment of the table column header, obtained from DSL configuration and converted to lowercase. (`string`)
+ headerClassName: Class name of the table column header, obtained from DSL configuration. (`string | string[] | undefined`)
+ invisible: Whether the table column is invisible, judged based on client visibility and DSL configuration. (`boolean`)
+ invisibleContent: Whether the table column content is invisible, obtained from DSL configuration. (`boolean`)
+ label: Label of the table column, obtained from DSL configuration. (`string`)
+ minWidth: Minimum width of the table column, obtained from DSL configuration. (`string | number | undefined`)
+ readonly: Whether the table column is read-only, obtained from DSL configuration. (`boolean`)
+ resizable: Whether the table column is resizable, obtained from DSL configuration. (`boolean | undefined`)
+ required: Whether the table column is a required field, obtained from DSL configuration. (`boolean`)
+ sortable: Whether the table column is sortable, judged based on DSL configuration and `tableSortable`. (`boolean`)
+ tableEditable: Editable property of the table, obtained from DSL configuration. (`boolean | undefined`)
+ tableExpandTreeFieldColumn: Table expand tree field column, obtained from DSL configuration. (`string | undefined`)
+ tableForceEditable: Whether the table is force editable, obtained from DSL configuration. (`boolean | undefined`)
+ tableInstance: Table instance, used to get and set the table instance. (`OioTableInstance | undefined`)
+ tableRowEditorClosed: Callback function when the table row edit is closed, obtained from DSL configuration. (`(context: RowContext | undefined) => Promise<boolean>`)
+ tableRowEditorClosedBefore: Callback function before the table row edit is closed, obtained from DSL configuration. (`(context: RowContext | undefined) => Promise<boolean>`)
+ tableSortable: Sortable property of the table, obtained from DSL configuration. (`boolean | undefined`)
+ treeNode: Whether it is a tree node column, judged based on DSL configuration and `tableExpandTreeFieldColumn`. (`boolean | undefined`)
+ width: Width of the table column, obtained from DSL configuration. (`string | number | undefined`)

**Methods**:

#### **cellEditable**

+ **Function Description**: Determine whether the cell is editable.
+ **Type**: `(context: RowContext) => boolean`
+ **Parameters**:
  - `context`: Row context.
+ **Return Value**: Boolean value indicating whether the cell is editable.

#### **className**

+ **Function Description**: Get the class name of the table column.
+ **Type**: `(context: RenderCellContext) => string | string[] | undefined`
+ **Parameters**:
  - `context`: Render cell context.
+ **Return Value**: Class name or array of class names of the table column, or `undefined`.

#### **compute**

+ **Function Description**: Calculate the value of the table column.
+ **Type**: `(context: RowContext) => Value | null | undefined`
+ **Parameters**:
  - `context`: Row context.
+ **Return Value**: Calculated value, or `null` or `undefined`.

#### **editorCancelText**

+ **Function Description**: Get the edit cancel text.
+ **Type**: `(context: RowContext) => string | undefined`
+ **Parameters**:
  - `context`: Row context.
+ **Return Value**: Edit cancel text, or `undefined`.

#### **editorCondition**

+ **Function Description**: Judge the edit condition.
+ **Type**: `(context: RowContext) => Promise<boolean | undefined>`
+ **Parameters**:
  - `context`: Row context.
+ **Return Value**: Promise, resolved to a boolean value or `undefined`, indicating whether the edit condition is met.

#### **editorConfirm**

+ **Function Description**: Get the edit confirmation information.
+ **Type**: `(context: RowContext) => string | undefined`
+ **Parameters**:
  - `context`: Row context.
+ **Return Value**: Edit confirmation information, or `undefined`.

#### **editorConfirmPosition**

+ **Function Description**: Get the position of the edit confirmation box.
+ **Type**: `(context: RowContext) => PopconfirmPlacement`
+ **Parameters**:
  - `context`: Row context.
+ **Return Value**: Position of the edit confirmation box.

#### **editorConfirmText**

+ **Function Description**: Get the edit confirmation text.
+ **Type**: `(context: RowContext) => string | undefined`
+ **Parameters**:
  - `context`: Row context.
+ **Return Value**: Edit confirmation text, or `undefined`.

#### **editorEnableConfirm**

+ **Function Description**: Determine whether to enable edit confirmation.
+ **Type**: `(context: RowContext) => boolean`
+ **Parameters**:
  - `context`: Row context.
+ **Return Value**: Boolean value indicating whether to enable edit confirmation.

#### **editorEnterText**

+ **Function Description**: Get the enter key text for edit confirmation.
+ **Type**: `(context: RowContext) => string | undefined`
+ **Parameters**:
  - `context`: Row context.
+ **Return Value**: Enter key text for edit confirmation, or `undefined`.

#### **editorValidateConfirm**

+ **Function Description**: Perform edit validation confirmation.
+ **Type**: `(context: RowContext) => Promise<boolean>`
+ **Parameters**:
  - `context`: Row context.
+ **Return Value**: Promise, resolved to a boolean value, indicating the validation result.

#### **footerClassName**

+ **Function Description**: Get the class name of the table column footer.
+ **Type**: `(context: RenderCellContext) => string | string[] | undefined`
+ **Parameters**:
  - `context`: Render cell context.
+ **Return Value**: Class name or array of class names of the table column footer, or `undefined`.

#### **getTableInstance**

+ **Function Description**: Get the table instance.
+ **Type**: `() => OioTableInstance | undefined`
+ **Return Value**: Table instance, or `undefined`.

#### **headerClassName**

+ **Function Description**: Get the class name of the table column header.
+ **Type**: `(context: RenderCellContext) => string | string[] | undefined`
+ **Parameters**:
  - `context`: Render cell context.
+ **Return Value**: Class name or array of class names of the table column header, or `undefined`.

#### **invisibleContent**

+ **Function Description**: Determine whether the table column content is invisible.
+ **Type**: `(context: RowContext) => boolean`
+ **Parameters**:
  - `context`: Row context.
+ **Return Value**: Boolean value indicating whether the table column content is invisible.

#### **rowEditorClosedByCancel**

+ **Function Description**: Handle the table row edit closed (cancel) event.
+ **Type**: `(context: RowContext | undefined) => Promise<boolean>`
+ **Parameters**:
  - `context`: Row context or `undefined`.
+ **Return Value**: Promise, resolved to a boolean value, indicating the operation result.

#### **rowEditorClosedByEnter**

+ **Function Description**: Handle the table row edit closed (enter key) event.
+ **Type**: `(context: RowContext | undefined) => Promise<boolean>`
+ **Parameters**:
  - `context`: Row context or `undefined`.
+ **Return Value**: Promise, resolved to a boolean value, indicating the operation result.

#### **setValue**

+ **Function Description**: Set the value of the table column.
+ **Type**: `(context: RowContext, val: Value | null | undefined) => void`
+ **Parameters**:
  - `context`: Row context.
  - `val`: Value to be set.
+ **Return Value**: No return value.

#### **getValue**

+ **Function Description**: Get the value of the table column.
+ **Type**: `(context: RowContext) => Value | null | undefined`
+ **Parameters**:
  - `context`: Row context.
+ **Return Value**: Value of the table column, or `null` or `undefined`.

### 2. BaseTableQuickOperationColumnWidget

**Inheritance**: BaseTableColumnWidget<Value, Props>

**Methods**:

#### **consumerUserPreferManager**

+ **Function Description**: Get the user preference manager and execute the callback function.
+ **Type**: `(fn: (userPreferManager: UserPreferEventManager, userPrefer: UserTablePrefer) => R) => R | undefined`
+ **Parameters**:
  - `fn`: Callback function, receiving the user preference manager and user table preference data.
+ **Return Value**: Execution result of the callback function; if the user preference manager or data does not exist, return `undefined`.

#### **handleClearAllFreeze**

+ **Function Description**: Clear all fixed column settings (left, right, or all).
+ **Type**: `(fixed: TableFixed = TableFixed.all) => Promise<void>`
+ **Parameters**:
  - `fixed`: Fixed column type, optional values are `TableFixed.left` (clear left fixed), `TableFixed.right` (clear right fixed), `TableFixed.all` (clear all fixed), default is `TableFixed.all`.
+ **Return Value**: No return value, return `Promise<void>`.

#### **handleClearFreeze**

+ **Function Description**: Clear the fixed setting of the specified column (left or right).
+ **Type**: `(table: VxeTableConstructor & VxeTablePrivateMethods, column: VxeTableDefines.ColumnInfo) => Promise<void>`
+ **Parameters**:
  - `table`: Table instance.
  - `column`: Target column information.
+ **Return Value**: No return value, return `Promise<void>`.

#### **handleClearOrder**

+ **Function Description**: Clear the sorting status of the specified column.
+ **Type**: `(table: VxeTableConstructor & VxeTablePrivateMethods, column: VxeTableDefines.ColumnInfo) => void`
+ **Parameters**:
  - `table`: Table instance.
  - `column`: Target column information.
+ **Return Value**: No return value.

#### **handleFreezeLeft**

+ **Function Description**: Fix the specified column and all columns to its left to the left side of the table.
+ **Type**: `(table: VxeTableConstructor & VxeTablePrivateMethods, column: VxeTableDefines.ColumnInfo) => Promise<void>`
+ **Parameters**:
  - `table`: Table instance.
  - `column`: Target column information.
+ **Return Value**: No return value, return `Promise<void>`.

#### **handleFreezeRight**

+ **Function Description**: Fix the specified column and all columns to its right to the right side of the table.
+ **Type**: `(table: VxeTableConstructor & VxeTablePrivateMethods, column: VxeTableDefines.ColumnInfo) => Promise<void>`
+ **Parameters**:
  - `table`: Table instance.
  - `column`: Target column information.
+ **Return Value**: No return value, return `Promise<void>`.

#### **handleHide**

+ **Function Description**: Hide the specified column according to user preferences, or update user preferences to show the column.
+ **Type**: `(table: VxeTableConstructor & VxeTablePrivateMethods, column: VxeTableDefines.ColumnInfo) => Promise<void>`
+ **Parameters**:
  - `table`: Table instance.
  - `column`: Target column information.
+ **Return Value**: No return value, return `Promise<void>`.

#### **handleOrderByASC**

+ **Function Description**: Perform ascending sorting on the specified column and trigger the table sorting change event.
+ **Type**: `(table: VxeTableConstructor & VxeTablePrivateMethods, column: VxeTableDefines.ColumnInfo) => void`
+ **Parameters**:
  - `table`: Table instance.
  - `column`: Target column information.
+ **Return Value**: No return value.

#### **handleOrderByDESC**

+ **Function Description**: Perform descending sorting on the specified column and trigger the table sorting change event.
+ **Type**: `(table: VxeTableConstructor & VxeTablePrivateMethods, column: VxeTableDefines.ColumnInfo) => void`
+ **Parameters**:
  - `table`: Table instance.
  - `column`: Target column information.
+ **Return Value**: No return value.

#### **renderHeaderSlot**

+ **Function Description**: Render the header content, including the column label, quick operation component (result of `renderQuickOperation`), and add a user preference setting button if it is the last column.
+ **Type**: `(context: RowContext) => VNode[] | string`
+ **Parameters**:
  - `context`: Row context, including table row data and index information.
+ **Return Value**: Array of virtual nodes (`VNode[]`) or string of the header content.

#### **renderQuickOperation**

+ **Function Description**: Render the quick operation component, passing operation methods such as sorting, fixing, and hiding to the sub-component.
+ **Type**: `(context: RowContext) => VNode | undefined`
+ **Parameters**:
  - `context`: Row context, including table instance and column information.
+ **Return Value**: Virtual node (`VNode`) of the quick operation component; return `undefined` if no rendering is needed.

### 3. BaseTableFieldWidget

**Inheritance**: BaseTableQuickOperationColumnWidget<Value, Props>

**Attributes**:

+ align: Alignment of table column content, obtained from DSL configuration and converted to lowercase. (`string`)
+ cellEditable: Whether the cell is editable, valid only when `editable` is `true` and `editorMode` is `TableEditorMode.cell`. (`boolean`)
+ clientInvisible: Whether it is invisible to the client, judged based on whether the current client is supported. (`boolean`)
+ columnType: Table column type, obtained from DSL configuration. (`string`)
+ dslInvisible: Determine whether the column is invisible based on DSL configuration. (`boolean`)
+ editorCancelText: Edit cancel text, obtained from DSL configuration. (`string | undefined`)
+ editorCloseTrigger: Edit close trigger method, obtained from DSL configuration. (`TableEditorCloseTrigger | undefined`)
+ editorCondition: Edit condition, judged based on DSL configuration and the `tableRowEditorClosedBefore` method. (`Promise<boolean | undefined>`)
+ editorConfirm: Edit confirmation information, obtained from DSL configuration. (`string | undefined`)
+ editorConfirmPosition: Position of the edit confirmation box, obtained from DSL configuration. (`PopconfirmPlacement`)
+ editorConfirmText: Edit confirmation text, obtained from DSL configuration. (`string | undefined`)
+ editorEnableConfirm: Whether to enable edit confirmation, obtained from DSL configuration. (`boolean`)
+ editorEnterText: Enter key text for edit confirmation, obtained from DSL configuration. (`string | undefined`)
+ editorMode: Edit mode, obtained from DSL configuration. (`TableEditorMode | undefined`)
+ editorTrigger: Edit trigger method, obtained from DSL configuration. (`TableEditorTrigger | undefined`)
+ editable: Whether the table column is editable, judged based on DSL configuration and other conditions. (`boolean`)
+ existExpandRow: Whether there is an expandable row, obtained from DSL configuration. (`boolean | undefined`)
+ expandOperationField: Expand operation field, obtained from DSL configuration. (`string | undefined`)
+ field: Table field, obtained from DSL configuration. (`Field`)
+ fieldWidgetMounted: Callback function when the field component is mounted, obtained from DSL configuration. (`(widget: BaseTableFieldWidget) => void | undefined`)
+ fieldWidgetUnmounted: Callback function when the field component is unmounted, obtained from DSL configuration. (`(widget: BaseTableFieldWidget) => void | undefined`)
+ fixed: Whether the table column is fixed, obtained from DSL configuration. (`string | boolean | undefined`)
+ footerAlign: Alignment of the table column footer, obtained from DSL configuration and converted to lowercase. (`string`)
+ footerClassName: Class name of the table column footer, obtained from DSL configuration. (`string | string[] | undefined`)
+ headerAlign: Alignment of the table column header, obtained from DSL configuration and converted to lowercase. (`string`)
+ headerClassName: Class name of the table column header, obtained from DSL configuration. (`string | string[] | undefined`)
+ invisible: Whether the table column is invisible, judged based on client visibility, DSL configuration, and user preferences. (`boolean`)
+ invisibleContent: Whether the table column content is invisible, obtained from DSL configuration. (`boolean`)
+ isExpandOperationField: Whether it is an expand operation field. (`boolean`)
+ label: Label of the table column, obtained from DSL configuration. (`string`)
+ minWidth: Minimum width of the table column, obtained from DSL configuration. (`string | number | undefined`)
+ ownEventListeners: Event listeners of the field. (`Record<LifeCycleTypes, Array<HandlerEvent>>`)
+ readonly: Whether the table column is read-only, obtained from DSL configuration. (`boolean`)
+ relationSortFields: Relation sorting fields, obtained from DSL configuration. (`string[] | undefined`)
+ required: Whether the table column is a required field, obtained from DSL configuration. (`boolean`)
+ resizable: Whether the table column is resizable, obtained from DSL configuration. (`boolean | undefined`)
+ runtimeField: Runtime field, obtained from DSL configuration. (`Field | undefined`)
+ sortable: Whether the table column is sortable, judged based on DSL configuration and other conditions. (`boolean`)
+ tableEditable: Editable property of the table, obtained from DSL configuration. (`boolean | undefined`)
+ tableExpandTreeFieldColumn: Table expand tree field column, obtained from DSL configuration. (`string | undefined`)
+ tableForceEditable: Whether the table is force editable, obtained from DSL configuration. (`boolean | undefined`)
+ tableInstance: Table instance, used to get and set the table instance. (`OioTableInstance | undefined`)
+ tableRowEditorClosed: Callback function when the table row edit is closed, obtained from DSL configuration. (`(context: RowContext | undefined) => Promise<boolean>`)
+ tableRowEditorClosedBefore: Callback function before the table row edit is closed, obtained from DSL configuration. (`(context: RowContext | undefined) => Promise<boolean>`)
+ tableSortable: Sortable property of the table, obtained from DSL configuration. (`boolean | undefined`)
+ themeConfig: Table theme configuration, obtained from DSL configuration. (`TableThemeConfig | undefined`)
+ treeNode: Whether it is a tree node column, judged based on DSL configuration and `tableExpandTreeFieldColumn`. (`boolean | undefined`)
+ userPrefer: User preference, obtained from DSL configuration. (`UserTablePrefer | undefined`)
+ userPreferInvisible: Determine whether the column is invisible according to user preferences. (`boolean`)
+ viewMode: View mode, obtained from DSL configuration. (`ViewMode`)
+ viewType: View type, obtained from DSL configuration. (`ViewType | undefined`)
+ width: Width of the table column, obtained from DSL configuration. (`string | number | undefined`)

**Methods**:

#### **cellEditable**

+ **Function Description**: Determine whether the cell is editable.
+ **Type**: `(context: RowContext) => boolean`
+ **Parameters**:
  - `context`: Row context.
+ **Return Value**: Boolean value indicating whether the cell is editable.

#### **className**

+ **Function Description**: Get the class name of the table column.
+ **Type**: `(context: RenderCellContext) => string | string[] | undefined`
+ **Parameters**:
  - `context`: Render cell context.
+ **Return Value**: Class name or array of class names of the table column, or `undefined`.

#### **compute**

+ **Function Description**: Calculate the value of the table column.
+ **Type**: `(context: RowContext) => Value | null | undefined`
+ **Parameters**:
  - `context`: Row context.
+ **Return Value**: Calculated value, or `null` or `undefined`.

#### **editorCancelText**

+ **Function Description**: Get the edit cancel text.
+ **Type**: `(context: RowContext) => string | undefined`
+ **Parameters**:
  - `context`: Row context.
+ **Return Value**: Edit cancel text, or `undefined`.

#### **editorCondition**

+ **Function Description**: Judge the edit condition.
+ **Type**: `(context: RowContext) => Promise<boolean | undefined>`
+ **Parameters**:
  - `context`: Row context.
+ **Return Value**: Promise, resolved to a boolean value or `undefined`, indicating whether the edit condition is met.

#### **editorConfirm**

+ **Function Description**: Get the edit confirmation information.
+ **Type**: `(context: RowContext) => string | undefined`
+ **Parameters**:
  - `context`: Row context.
+ **Return Value**: Edit confirmation information, or `undefined`.

#### **editorConfirmPosition**

+ **Function Description**: Get the position of the edit confirmation box.
+ **Type**: `(context: RowContext) => PopconfirmPlacement`
+ **Parameters**:
  - `context`: Row context.
+ **Return Value**: Position of the edit confirmation box.

#### **editorConfirmText**

+ **Function Description**: Get the edit confirmation text.
+ **Type**: `(context: RowContext) => string | undefined`
+ **Parameters**:
  - `context`: Row context.
+ **Return Value**: Edit confirmation text, or `undefined`.

#### **editorEnableConfirm**

+ **Function Description**: Determine whether to enable edit confirmation.
+ **Type**: `(context: RowContext) => boolean`
+ **Parameters**:
  - `context`: Row context.
+ **Return Value**: Boolean value indicating whether to enable edit confirmation.

#### **editorEnterText**

+ **Function Description**: Get the enter key text for edit confirmation.
+ **Type**: `(context: RowContext) => string | undefined`
+ **Parameters**:
  - `context`: Row context.
+ **Return Value**: Enter key text for edit confirmation, or `undefined`.

#### **editorValidateConfirm**

+ **Function Description**: Perform edit validation confirmation.
+ **Type**: `(context: RowContext) => Promise<boolean>`
+ **Parameters**:
  - `context`: Row context.
+ **Return Value**: Promise, resolved to a boolean value, indicating the validation result.

#### **footerClassName**

+ **Function Description**: Get the class name of the table column footer.
+ **Type**: `(context: RenderCellContext) => string | string[] | undefined`
+ **Parameters**:
  - `context`: Render cell context.
+ **Return Value**: Class name or array of class names of the table column footer, or `undefined`.

#### **getCompute**

+ **Function Description**: Get the expression for calculating the field value.
+ **Type**: `(data: ActiveRecord) => boolean | string | undefined`
+ **Parameters**:
  - `data`: Active record.
+ **Return Value**: Expression for calculating the field value, or `undefined`.

#### **getTableAutoWidth**

+ **Function Description**: Get the table auto width.
+ **Type**: `() => string | number | undefined`
+ **Return Value**: Table auto width, or `undefined`.

#### **getTableForCellMinWidth**

+ **Function Description**: Get the minimum width of the table cell.
+ **Type**: `() => string | number | undefined`
+ **Return Value**: Minimum width of the table cell, or `undefined`.

#### **getTableInstance**

+ **Function Description**: Get the table instance.
+ **Type**: `() => OioTableInstance | undefined`
+ **Return Value**: Table instance, or `undefined`.

#### **headerClassName**

+ **Function Description**: Get the class name of the table column header.
+ **Type**: `(context: RenderCellContext) => string | string[] | undefined`
+ **Parameters**:
  - `context`: Render cell context.
+ **Return Value**: Class name or array of class names of the table column header, or `undefined`.

#### **handleClick**

+ **Function Description**: Handle the click event.
+ **Type**: `(context: RowContext, e: MouseEvent) => void`
+ **Parameters**:
  - `context`: Row context.
  - `e`: Mouse event.
+ **Return Value**: No return value.

#### **invisibleContent**

+ **Function Description**: Determine whether the table column content is invisible.
+ **Type**: `(context: RowContext) => boolean`
+ **Parameters**:
  - `context`: Row context.
+ **Return Value**: Boolean value indicating whether the table column content is invisible.

#### **isExpressionString**

+ **Function Description**: Determine whether the string is an expression.
+ **Type**: `(expression?: string) => boolean`
+ **Parameters**:
  - `expression`: String.
+ **Return Value**: Boolean value indicating whether the string is an expression.

#### **notify**

+ **Function Description**: Notify field events.
+ **Type**: `(type: LifeCycleTypes) => void`
+ **Parameters**:
  - `type`: Life cycle type.
+ **Return Value**: No return value.

#### **on**

+ **Function Description**: Listen to field events.
+ **Type**: `(event: FieldEventName | { [key in FieldEventName]?: HandlerEvent }, handler?: HandlerEvent) => void`
+ **Parameters**:
  - `event`: Event name or event object.
  - `handler`: Callback function.
+ **Return Value**: No return value.

#### **renderDefaultSlot**

+ **Function Description**: Render the default slot content.
+ **Type**: `(context: RowContext) => VNode[] | string`
+ **Parameters**:
  - `context`: Row context.
+ **Return Value**: Array of virtual nodes or string of the default slot content.

#### **renderEditSlot**

+ **Function Description**: Render the edit slot content.
+ **Type**: `(context: RowContext) => VNode[] | string`
+ **Parameters**:
  - `context`: Row context.
+ **Return Value**: Array of virtual nodes or string of the edit slot content.

#### **rowEditorClosedByCancel**

+ **Function Description**: Handle the table row edit closed (cancel) event.
+ **Type**: `(context: RowContext | undefined) => Promise<boolean>`
+ **Parameters**:
  - `context`: Row context or `undefined`.
+ **Return Value**: Promise, resolved to a boolean value, indicating the operation result.

#### **rowEditorClosedByEnter**

+ **Function Description**: Handle the table row edit closed (enter key) event.
+ **Type**: `(context: RowContext | undefined) => Promise<boolean>`
+ **Parameters**:
  - `context`: Row context or `undefined`.
+ **Return Value**: Promise, resolved to a boolean value, indicating the operation result.

#### **setValue**

+ **Function Description**: Set the value of the table column.
+ **Type**: `(context: RowContext, val: Value | null | undefined) => void`
+ **Parameters**:
  - `context`: Row context.
  - `val`: Value to be set.
+ **Return Value**: No return value.

#### **getValue**

+ **Function Description**: Get the value of the table column.
+ **Type**: `(context: RowContext) => Value | null | undefined`
+ **Parameters**:
  - `context`: Row context.
+ **Return Value**: Value of the table column, or `null` or `undefined`.

#### **wrapperToFieldAction**

+ **Function Description**: Wrap the node as a field action.
+ **Type**: `(node: VNode[] | string, context: RowContext) => VNode[] | string`
+ **Parameters**:
  - `node`: Array of virtual nodes or string.
  - `context`: Row context.
+ **Return Value**: Wrapped array of virtual nodes or string.

#### **wrapperToFiledAction**

+ **Function Description**: Wrap the node as a field action (deprecated).
+ **Type**: `(node: VNode[] | string, context: RowContext) => VNode[] | string`
+ **Parameters**:
  - `node`: Array of virtual nodes or string.
  - `context`: Row context.
+ **Return Value**: Wrapped array of virtual nodes or string.

### 4. TableComplexFieldWidget

**Inheritance**: BaseTableFieldWidget<Value, Field, Props>

**Attributes**:

+ labelFields: List of label fields of the reference model. (`string[]`)
+ optionLabel: Option label, obtained from DSL configuration. (`string`)
+ optionLabelContextArgs: Option label context parameters, obtained from DSL configuration. (`string`)
+ parentMountedCallChaining: Parent component mounted callback chain, obtained from DSL configuration. (`CallChaining | undefined`)
+ referencesModel: Referenced runtime model. (`RuntimeModel | undefined`)
+ relationFieldKey: Relation field key, usually the primary key of the reference model. (`string`)
+ searchFields: List of search fields, obtained from DSL configuration or reference model. (`string[]`)
+ separator: Separator, used to connect the values of multiple label fields. (`string`)

**Methods**:

#### **handleTableLabel**

+ **Function Description**: Handle the label display of the table cell.
+ **Type**: `(dataEntity: any) => string`
+ **Parameters**:
  - `dataEntity`: Data entity.
+ **Return Value**: Processed label string.

#### **resolveReferenceModel**

+ **Function Description**: Resolve the reference model (used when the field lacks referencesModel).
+ **Type**: `() => Promise<void>`

### 5. TableObjectFieldWidget

**Inheritance**: TableComplexFieldWidget<`ActiveRecord`>

**Methods**:

#### **renderDefaultSlot**

+ **Function Description**: Render the default content of the table cell.
+ **Type**: `(context: RowContext) => VNode[] | string`
+ **Parameters**:
  - `context`: Row context.
+ **Return Value**: Array of virtual nodes or string of the rendered content.

### 6. TableListFieldWidget

**Inheritance**: TableComplexFieldWidget<ActiveRecord[]>

**Methods**:

#### **renderDefaultSlot**

+ **Function Description**: Render the default content of the table cell, processing the list value into a comma-separated string.
+ **Type**: `(context: RowContext) => VNode[] | string`
+ **Parameters**:
  - `context`: Row context.
+ **Return Value**: Array of virtual nodes or string of the rendered content.

## (Ⅱ) Abstract Base Class for Form Fields

### 1. BaseFormItemWidget

**Inheritance**: BaseDataWidget<`Props`>

**Attributes**:

+ blurValue: Value when out of focus, used to compare whether the value has changed. (`string | null | undefined`)
+ clearFields: List of fields to be cleared, obtained from DSL configuration. (`string[]`)
+ constructDataTrigger: Timing for constructing data, obtained from DSL configuration. (`WidgetTrigger[]`)
+ currentRelationUpdateType: Current relation update type, preferentially obtained from the current component. (`RelationUpdateType | undefined`)
+ currentSubmitType: Current submit type, preferentially obtained from the current component. (`SubmitType | undefined`)
+ defaultValidateTrigger: Default validation trigger timing, including `ValidateTrigger.BLUR`. (`ValidateTrigger[]`)
+ disabled: Whether the component is disabled, judged based on the view mode and DSL configuration. (`boolean`)
+ help: Help text, obtained from DSL configuration. (`any`)
+ hint: Hint text, obtained from DSL configuration and supporting expression parsing. (`string | undefined`)
+ label: Label text, supporting expression parsing. (`string | undefined`)
+ labelInvisible: Whether the label is hidden, judged based on the label value and DSL configuration. (`boolean`)
+ layout: Layout mode, obtained from DSL configuration and converted to lowercase. (`string | undefined`)
+ parentRelationUpdateType: Parent component relation update type, obtained through dependency injection. (`RelationUpdateType | undefined`)
+ parentSubmitType: Parent component submit type, obtained through dependency injection. (`SubmitType | undefined`)
+ parentViewMode: Parent component view mode, obtained through dependency injection. (`ViewMode | undefined`)
+ readonly: Whether the component is read-only, judged based on the view mode and DSL configuration. (`boolean`)
+ required: Whether the component is required, judged based on the view mode and DSL configuration. (`boolean`)
+ requiredTips: Required tip text, obtained from DSL configuration. (`string | undefined`)
+ submitType: Submit type, merging the values of the current component, DSL configuration, and parent component. (`SubmitType`)
+ validation: Validation information, including status, message, and path. (`ValidatorInfo | undefined`)
+ validatorInfo: Validation information for external access. (`ValidatorInfo | undefined`)
+ validateTrigger: Validation trigger timing, obtained from DSL configuration or using the default value. (`ValidateTrigger[]`)
+ viewMode: View mode, determined based on the view type and parent component mode. (`ViewMode | undefined`)
+ viewType: View type, obtained through dependency injection. (`ViewType | undefined`)
+ value: Current value of the component, obtained through calculation. (`Value | null | undefined`)

**Methods**:

#### **afterBlur**

+ **Function Description**: Process the logic after out of focus, compare the value change, and trigger calculation and callback.
+ **Type**: `() => void`

#### **afterChange**

+ **Function Description**: Process the callback trigger after the value changes.
+ **Type**: `() => void`

#### **blur**

+ **Function Description**: Trigger the blur event, execute the expression and validation logic.
+ **Type**: `() => void`

#### **change**

+ **Function Description**: Process the value change, update the data, and trigger validation and callback.
+ **Type**: `(val: Value | null | undefined) => void`
+ **Parameters**:
  - `val`: New value.

#### **clearFieldsCallback**

+ **Function Description**: Clear the data of the specified fields.
+ **Type**: `() => boolean`
+ **Return Value**: Whether the data is successfully cleared.

#### **computeBlurValue**

+ **Function Description**: Calculate the value when out of focus, processing non-string types.
+ **Type**: `(val: unknown) => string | null | undefined`
+ **Parameters**:
  - `val`: Original value.

#### **executeExpression**

+ **Function Description**: Execute expression parsing, supporting data context and error value processing.
+ **Type**: `(expression: string, errorValue?: T) => T | string | undefined`
+ **Parameters**:
  - `expression`: Expression string.
  - `errorValue`: Default value when parsing fails (optional).
+ **Return Value**: Expression execution result.

#### **executeLabelExpression**

+ **Function Description**: Parse the label expression, distinguishing between ordinary strings and expression strings.
+ **Type**: `(label: string) => string | undefined`
+ **Parameters**:
  - `label`: Label text or expression.
+ **Return Value**: Parsed label text.

#### **executeValidator**

+ **Function Description**: Execute the validation logic and return the validation result.
+ **Type**: `() => Promise<ValidatorInfo>`
+ **Return Value**: Validation information object.

#### **focus**

+ **Function Description**: Trigger the focus event and record the current value as the out-of-focus comparison value.
+ **Type**: `() => void`

#### **generatorConstructMirrorSubmitData**

+ **Function Description**: Generate construct mirror submit data, which by default includes the current field value.
+ **Type**: `() => ActiveRecord`
+ **Return Value**: Object containing the current field value.

#### **getDefaultValidateTrigger**

+ **Function Description**: Get the default validation trigger timing (deprecated, use `defaultValidateTrigger`).
+ **Type**: `() => ValidateTrigger[]`
+ **Return Value**: Default validation trigger timing array.

#### **getValue**

+ **Function Description**: Get the value of the current field in the form data.
+ **Type**: `() => Value | null | undefined`
+ **Return Value**: Field value.

#### **invisibleProcess**

+ **Function Description**: Process the invisible expression and return a boolean value.
+ **Type**: `(invisible: boolean | string) => boolean | undefined`
+ **Parameters**:
  - `invisible`: Invisible configuration (boolean value or expression string).
+ **Return Value**: Processed boolean value or `undefined`.

#### **setBlurValue**

+ **Function Description**: Set the out-of-focus comparison value.
+ **Type**: `(val: unknown) => void`
+ **Parameters**:
  - `val`: Comparison value.

#### **setValue**

+ **Function Description**: Set the value of the current field in the form data.
+ **Type**: `(value: Value | null | undefined) => void`
+ **Parameters**:
  - `value`: Value to be set.

#### **submit**

+ **Function Description**: Data submission method (to be implemented by subclasses), which by default returns `undefined`.
+ **Type**: `(submitValue: SubmitValue) => ReturnPromise<Record<string, unknown> | SubmitRelationValue | undefined>`
+ **Parameters**:
  - `submitValue`: Submitted value.

#### **validatorByExpression**

+ **Function Description**: Perform validation through the expression and return the validation result.
+ **Type**: `(expression: string, msg: string) => ValidatorInfo | undefined`
+ **Parameters**:
  - `expression`: Validation expression.
  - `msg`: Validation failure prompt message.
+ **Return Value**: Validation information object or `undefined`.

#### **validatorError**

+ **Function Description**: Generate validation failure information.
+ **Type**: `(message?: string) => ValidatorInfo`
+ **Parameters**:
  - `message`: Error message (optional).
+ **Return Value**: Validation error information object.

#### **validatorSkip**

+ **Function Description**: Generate validation skip information.
+ **Type**: `(message?: string) => ValidatorInfo`
+ **Parameters**:
  - `message`: Skip message (optional).
+ **Return Value**: Validation skip information object.

#### **validatorSuccess**

+ **Function Description**: Generate validation success information.
+ **Type**: `(message?: string) => ValidatorInfo`
+ **Parameters**:
  - `message`: Success message (optional).
+ **Return Value**: Validation success information object.

### 2. FormFieldWidget

**Inheritance**: BaseFieldWidget<Value, Field, Props>

**Attributes**:

+ allowClear: Whether to allow clearing the value, default is `true`. (`boolean`)
+ emptyStyle: Empty value style, obtained from DSL configuration. (`any`)
+ placeholder: Placeholder text, supporting expression parsing and internationalization translation. (`string | string[] | undefined`)

**Methods**:

#### **compute**

+ **Function Description**: Calculate the field value, processing expression calculation and complex type fields.
+ **Type**: `() => Value | null | undefined`
+ **Return Value**: Calculated value, or `null` or `undefined`.

#### **getCompute**

+ **Function Description**: Get the field calculation expression, processing the special case of associated fields.
+ **Type**: `(contextData: any) => string | boolean | undefined`
+ **Parameters**:
  - `contextData`: Context data.
+ **Return Value**: Calculation expression, or `undefined`.

#### **updateRelatedValue**

+ **Function Description**: Update the value of the associated field.
+ **Type**: `(relatedFields: string[], val: Value | null | undefined) => void`
+ **Parameters**:
  - `relatedFields`: Associated field array.
  - `val`: Value to be set.

#### **updateValue**

+ **Function Description**: Update the field value, processing the special case of associated fields.
+ **Type**: `(val: Value | null | undefined) => void`
+ **Parameters**:
  - `val`: Value to be set.

### 3. FormComplexFieldWidget

**Inheritance**: FormFieldWidget<Value, Field, Props>

**Attributes**:

+ currentMountedCallChaining: Current mounted callback chain, which can be obtained through dependency injection. (`CallChaining | undefined`)
+ currentRefreshCallChaining: Current refresh callback chain, which can be obtained through dependency injection. (`CallChaining<boolean> | undefined`)
+ domain: Dynamic domain, supporting dynamic resolution. (`string | undefined`)
+ filter: Filter conditions, supporting dynamic resolution. (`string | undefined`)
+ isDataSourceProvider: Whether it is a data source provider, default is `true`. (`boolean`)
+ mountedCallChaining: Mounted callback chain, merging the values of the current component and the parent component. (`CallChaining | undefined`)
+ parentMountedCallChaining: Parent component mounted callback chain, obtained through dependency injection. (`CallChaining | undefined`)
+ parentRefreshCallChaining: Parent component refresh callback chain, obtained through dependency injection. (`CallChaining<boolean> | undefined`)
+ refreshCallChaining: Refresh callback chain, preferentially using the current component configuration. (`CallChaining<boolean> | undefined`)
+ referencesModel: Referenced runtime model. (`RuntimeModel | undefined`)
+ submitCache: Submission cache manager, used to process associated data submission. (`SubmitCacheManager | undefined`)

**Methods**:

#### **initSubmitCache**

+ **Function Description**: Initialize the submission cache manager and configure the model primary key and unique key.
+ **Type**: `(referencesModel: RuntimeModel) => void`
+ **Parameters**:
  - `referencesModel`: Referenced runtime model.

#### **mountedProcess**

+ **Function Description**: Abstract processing logic during mounting (to be implemented by subclasses).
+ **Type**: `() => ReturnPromise<void>`

#### **refreshParentProcess**

+ **Function Description**: Default processing logic when the parent view is refreshed (empty implementation).
+ **Type**: `() => ReturnPromise<void>`

#### **refreshValueProcess**

+ **Function Description**: Default processing logic when the value is refreshed (empty implementation).
+ **Type**: `() => ReturnPromise<void>`

#### **resolveDynamicDomain**

+ **Function Description**: Resolve the dynamic domain, supporting data context and multi-source data.
+ **Type**: `(domain: string) => string`
+ **Parameters**:
  - `domain`: Dynamic domain expression string.
+ **Return Value**: Resolved dynamic domain string.

#### **subscribeProcess**

+ **Function Description**: Subscribe to form data refresh and trigger value refresh processing logic.
+ **Type**: `() => void`

### 4. FormComplexObjectFieldWidget

**Inheritance**: FormComplexFieldWidget<ActiveRecord, Field, Props>

**Attributes**:

+ parentRefreshProcess: Refresh processing function of the parent component, obtained through dependency injection. (`RefreshProcessFunction | undefined`)

**Methods**:

#### **mountedProcess**

+ **Function Description**: Processing logic during mounting, setting the current data source.
+ **Type**: `() => void`

#### **refreshProcess**

+ **Function Description**: Processing logic during refresh (empty implementation).
+ **Type**: `(condition?: Condition) => Promise<void>`
+ **Parameters**:
  - `condition`: Condition (optional).

### 5. FormComplexListFieldWidget

**Inheritance**: FormComplexFieldWidget<ActiveRecord[], Field, Props>

**Attributes**:

+ parentRefreshProcess: Refresh processing function of the parent component, obtained through dependency injection. (`RefreshProcessFunction | undefined`)

**Methods**:

#### **mountedProcess**

+ **Function Description**: Processing logic during mounting, setting the current data source.
+ **Type**: `() => void`

#### **refreshProcess**

+ **Function Description**: Processing logic during refresh (empty implementation).
+ **Type**: `(condition?: Condition) => Promise<void>`
+ **Parameters**:
  - `condition`: Condition (optional).

### 6. FormSubviewFieldWidget

**Inheritance**: FormComplexFieldWidget<Value, Field, Props>

**Attributes**:

+ currentParentViewActiveRecords: Active record array of the current parent view, provided through dependency injection. (`ActiveRecord[] | undefined`)
+ currentViewDsl: DSL definition of the current subview. (`DslDefinition | undefined`)
+ defaultSubviewType: Default subview type, default is `ViewType.Form`. (`ViewType`)
+ formData: Form data, taking the first active record of the parent view. (`ActiveRecord`)
+ metadataSubviewWidget: Metadata subview component instance. (`MetadataViewWidget`)
+ runtimeSubviewContext: Runtime subview context. (`RuntimeContext`)
+ subviewModel: Model name associated with the subview. (`string`)
+ subviewModelName: Display name of the subview model. (`string | undefined`)
+ subviewModule: Module to which the subview belongs. (`string | undefined`)
+ subviewModuleName: Display name of the subview module. (`string | undefined`)
+ subviewType: Subview type, preferentially using the current DSL configuration. (`ViewType`)

**Methods**:

#### **createMetadataSubviewWidget**

+ **Function Description**: Create a metadata subview component instance for initializing the subview context.
+ **Type**: `(props: Props) => MetadataViewWidget`
+ **Parameters**:
  - `props`: Component attributes.
+ **Return Value**: Metadata subview component instance.

#### **findViewDslNode**

+ **Function Description**: Find the view node (`DslDefinitionType.VIEW`) in the DSL definition.
+ **Type**: `(dsl: DslDefinition) => DslWidget | undefined`
+ **Parameters**:
  - `dsl`: DSL definition object.
+ **Return Value**: View node or `undefined`.

#### **generatorRuntimeSubview**

+ **Function Description**: Generate runtime subview configuration, including type, model, layout, etc.
+ **Type**: `(props: Props) => ReturnPromise<RuntimeView>`
+ **Parameters**:
  - `props`: Component attributes.
+ **Return Value**: Runtime subview configuration object.

#### **getViewDsl**

+ **Function Description**: Get the DSL definition of the subview from the attributes and find the view node.
+ **Type**: `(props: Props) => ReturnPromise<DslDefinition | undefined>`
+ **Parameters**:
  - `props`: Component attributes.
+ **Return Value**: DSL definition or `undefined`.

#### **getViewLayout**

+ **Function Description**: Get the subview layout configuration (empty implementation, to be overridden by subclasses).
+ **Type**: `(props: Props) => ReturnPromise<DslDefinition | undefined>`
+ **Parameters**:
  - `props`: Component attributes.

#### **getViewTemplate**

+ **Function Description**: Get the subview template configuration (empty implementation, to be overridden by subclasses).
+ **Type**: `(props: Props) => ReturnPromise<DslDefinition | undefined>`
+ **Parameters**:
  - `props`: Component attributes.

#### **initSubview**

+ **Function Description**: Initialize the subview, including generating runtime configuration and creating context.
+ **Type**: `(props: Props) => ReturnPromise<void>`
+ **Parameters**:
  - `props`: Component attributes.

#### **initSubviewAfterProperties**

+ **Function Description**: Extended logic after subview attribute initialization (empty implementation, to be overridden by subclasses).
+ **Type**: `(props: Props) => void`
+ **Parameters**:
  - `props`: Component attributes.

#### **initRuntimeContext**

+ **Function Description**: Initialize the runtime context through the metadata subview.
+ **Type**: `(metadataSubviewWidget: MetadataViewWidget, view: RuntimeView) => RuntimeContext`
+ **Parameters**:
  - `metadataSubviewWidget`: Metadata subview component instance.
  - `view`: Runtime subview configuration.
+ **Return Value**: Runtime context object.

### 7. FormSubviewObjectFieldWidget

**Inheritance**: FormSubviewFieldWidget<ActiveRecord, Field, Props>

**Attributes**:

+ defaultSubviewType: Default subview type, fixed as `ViewType.Form`. (`ViewType`)
+ parentRefreshProcess: Refresh processing function of the parent component, obtained through dependency injection. (`RefreshProcessFunction | undefined`)

**Methods**:

#### **initSubviewData**

+ **Function Description**: Initialize subview data, process null values, and set the data source and active records.
+ **Type**: `() => ReturnPromise<void>`

#### **mountedProcess**

+ **Function Description**: Processing logic during mounting, calling `initSubviewData` to initialize data.
+ **Type**: `() => Promise<void>`

#### **onValueChange**

+ **Function Description**: Listen to value change events and trigger field change notifications.
+ **Type**: `() => void`
+ **Description**: Implemented through the `@Widget.Watch` decorator for deep listening (`{ deep: true }`).

#### **refreshParentProcess**

+ **Function Description**: Processing logic when the parent view is refreshed, calling `initSubviewData` to refresh data.
+ **Type**: `() => Promise<void>`

#### **refreshProcess**

+ **Function Description**: Processing logic during refresh (empty implementation).
+ **Type**: `(condition?: Condition) => Promise<void>`
+ **Parameters**:
  - `condition`: Condition (optional).

#### **refreshValueProcess**

+ **Function Description**: Processing logic when the value is refreshed, calling `initSubviewData` to refresh data.
+ **Type**: `() => Promise<void>`

#### **reloadDataSource**

+ **Function Description**: Reload the data source and set the current data source to the incoming record.
+ **Type**: `(records: ActiveRecords | undefined) => void`
+ **Parameters**:
  - `records`: Data source records to be set (optional).

### 8. FormSubviewListFieldWidget

**Inheritance**: FormSubviewFieldWidget<ActiveRecord[], Field, Props>

**Attributes**:

+ activeRecords: Current active record array, which can be set through `setCurrentActiveRecords`. (`ActiveRecord[] | undefined`)
+ dataSource: Current data source, which can be set through `setCurrentDataSource`. (`ActiveRecord[] | undefined`)
+ defaultComputeTrigger: Default calculation trigger timing, including `ComputeTrigger.CHANGE`. (`ComputeTrigger[]`)
+ defaultConstructDataTrigger: Default construct data trigger timing, including `WidgetTrigger.CHANGE`. (`WidgetTrigger[]`)
+ defaultClearFieldsTrigger: Default clear fields trigger timing, including `WidgetTrigger.CHANGE`. (`WidgetTrigger[]`)
+ parentRefreshProcess: Refresh processing function of the parent component, obtained through dependency injection. (`RefreshProcessFunction | undefined`)
+ subviewSubmitCache: Subview submission cache manager. (`SubmitCacheManager | undefined`)

**Methods**:

#### **afterTriggerExecute**

+ **Function Description**: Logic executed after the trigger event, calling the parent class method and synchronizing the refresh callback chain.
+ **Type**: `(trigger: WidgetTrigger) => Promise<void>`
+ **Parameters**:
  - `trigger`: Trigger event.

#### **deleteDataSource**

+ **Function Description**: Delete the record at the specified index from the data source and process the submission cache.
+ **Type**: `(recordIndexes: number[]) => void`
+ **Parameters**:
  - `recordIndexes`: Array of record indexes to be deleted.

#### **deleteDataSourceByEntity**

+ **Function Description**: Delete records from the data source according to the entity and process the submission cache.
+ **Type**: `(records: ActiveRecords, predict?: DeleteActiveRecordsByEntityPredict) => void`
+ **Parameters**:
  - `records`: Array of record entities to be deleted.
  - `predict`: Delete prediction function (optional).

#### **flushDataSource**

+ **Function Description**: Refresh the data source, submit the data and reload it, and repair the table pagination.
+ **Type**: `(reloadDataSource = true) => void`
+ **Parameters**:
  - `reloadDataSource`: Whether to reload the data source, default is `true`.

#### **initSubviewAfterProperties**

+ **Function Description**: Logic executed after subview attribute initialization, cloning the submission cache and extending the runtime context.
+ **Type**: `(props: Props) => void`
+ **Parameters**:
  - `props`: Component attributes.

#### **initSubviewData**

+ **Function Description**: Initialize subview data and set the data source to the current value or empty array.
+ **Type**: `() => ReturnPromise<void>`

#### **mountedProcess**

+ **Function Description**: Processing logic during mounting, calling `initSubviewData` to initialize data.
+ **Type**: `() => Promise<void>`

#### **refreshParentProcess**

+ **Function Description**: Processing logic when the parent view is refreshed, calling `initSubviewData` to refresh data.
+ **Type**: `() => Promise<void>`

#### **refreshProcess**

+ **Function Description**: Processing logic during refresh (empty implementation).
+ **Type**: `(condition?: Condition) => Promise<void>`
+ **Parameters**:
  - `condition`: Condition (optional).

#### **refreshValueProcess**

+ **Function Description**: Processing logic when the value is refreshed, calling `initSubviewData` to refresh data and synchronizing the refresh callback chain.
+ **Type**: `() => Promise<void>`

#### **reloadActiveRecords**

+ **Function Description**: Reload the active records and set the current active records to the incoming records.
+ **Type**: `(records: ActiveRecords | undefined) => void`
+ **Parameters**:
  - `records`: Active records to be set (optional).

#### **reloadDataSource**

+ **Function Description**: Reload the data source, set the current data source to the incoming records, and update the value.
+ **Type**: `(records: ActiveRecords | undefined) => void`
+ **Parameters**:
  - `records`: Data source records to be set (optional).

#### **repairTablePagination**

+ **Function Description**: Repair the table pagination, find and call the repair method of the relevant table component.
+ **Type**: `() => void`

## (Ⅲ) Abstract Base Class for Detail Fields

### 1. DetailRelationSelectFieldWidget

**Inheritance**: BaseSelectFieldWidget<Value, Field, Props>

**Attributes**:

+ currentValue: Label display of the current value, processed by `handleTableLabel`. (Computed attribute)
+ relationFieldKey: Relation field key, obtained through the `getRelationFieldKey` method. (Computed attribute)

**Methods**:

#### **handleTableLabel**

+ **Function Description**: Process the table label display and generate the display value based on the configured label fields or expressions.
+ **Type**: `(dataEntity: any) => { label: string; value: any }`
+ **Parameters**:
  - `dataEntity`: Data entity.
+ **Return Value**: Object containing `label` (display label) and `value` (original value).

## (Ⅳ) Component Abstract Base Class

### 1. BaseSelectFieldWidget

**Inheritance**: FormComplexFieldWidget<Value, Field, Props>

**Attributes**:

+ labelFields: List of label fields of the reference model, default is an empty array. (`string[]`)
+ maxTagCount: Maximum number of tags to display, converted to a number from the DSL configuration. (`number | undefined`)
+ optionLabel: Option label, obtained from the DSL configuration, default is an empty string. (`string`)
+ optionLabelContextArgs: Option label context parameters, obtained from the DSL configuration, default is an empty string. (`string`)
+ searchFields: List of search fields, converted from the DSL configuration or using `labelFields`. (`string[]`)
+ separator: Separator, obtained from the DSL configuration, default is `,`. (`string`)

**Methods**:

#### **mountedProcess**

+ **Function Description**: Process the data source during mounting, and repair the record array according to whether the field is a multi-value type (`field.multi`) and the value type.
+ **Type**: `() => void`

### 2. FormSelectComplexFieldWidget

**Inheritance**: BaseSelectFieldWidget<Value, Field, Props>

**Attributes**:

+ allowClear: Whether to allow clearing, obtained from the DSL configuration, default is `true`. (`boolean`)
+ clearBackFillSelected: Whether to clear the backfilled selected items, obtained from the DSL configuration, default is `false`. (`boolean`)
+ currentPage: Current page number, default is `1`. (`number`)
+ dataList: Original data list. (`Record<string, unknown>[]`)
+ domain: Dynamic domain, supporting dynamic resolution. (`string | undefined`)
+ loadFunctionFun: Data loading function name, obtained from the DSL configuration. (`string | undefined`)
+ loadMoreLoading: Load more status, default is `false`. (`boolean`)
+ maxDepth: Maximum query depth, converted to a number from the DSL configuration, default is `1`. (`number`)
+ maxNumber: Maximum number of selections, obtained from the DSL configuration, default is `Infinity`. (`number`)
+ minNumber: Minimum number of selections, obtained from the DSL configuration, default is `0`. (`number`)
+ needInitOptions: Whether to initialize options, judged based on the value and read-only status. (Computed attribute)
+ options: Dropdown option list, default is an empty array. (`Record<string, unknown>[]`)
+ pageSize: Pagination size, default is `PageSizeEnum.OPTION_2`. (`number`)
+ queryData: Query parameters generated through expressions. (Computed attribute)
+ queryFieldName: Query field name, default is `name`. (`string`)
+ renderOnParent: Whether to render on the parent, obtained from the DSL configuration, default is `false`. (`boolean`)
+ searchValue: Search keyword, default is an empty string. (`string`)
+ showMoreButton: Whether to display the load more button, default is `false`. (`boolean`)
+ showSearch: Whether to display the search box, obtained from the DSL configuration, default is `true`. (`boolean`)
+ totalPages: Total number of pages, default is `10000`. (`number`)
+ valueEqualOptions: Whether the value is consistent with the options, calculated based on the value and options. (Computed attribute)

**Methods**:

#### **blur**

+ **Function Description**: Trigger the blur event, restore the initial value when the option is empty, and call the parent class method.
+ **Type**: `() => void`

#### **buildQueryData**

+ **Function Description**: Build query parameters and parse the `queryDataConfig` in the DSL configuration.
+ **Type**: `() => ObjectValue`
+ **Return Value**: Query parameter dictionary.

#### **changeSearchValue**

+ **Function Description**: Update the search keyword.
+ **Type**: `(val: string) => void`
+ **Parameters**:
  - `val`: New search keyword.

#### **dropdownVisibleChange**

+ **Function Description**: Handle the change of the dropdown display status and initialize or refresh the data according to the status.
+ **Type**: `(open: boolean) => void`
+ **Parameters**:
  - `open`: Whether the dropdown is displayed.

#### **fillOptions**

+ **Function Description**: Fill the option list (abstract method, to be implemented by subclasses).
+ **Type**: `(dataList: Record<string, unknown>[], insetDefaultValue?: boolean) => void`
+ **Parameters**:
  - `dataList`: Original data list.
  - `insetDefaultValue`: Whether to insert the default value (optional).

#### **fillOptionsForMulti**

+ **Function Description**: Process option filling in the multi-selection scenario to ensure that the selected value is in the options.
+ **Type**: `(dataList: Record<string, unknown>[]) => Promise<void>`
+ **Parameters**:
  - `dataList`: Original data list.

#### **fillOptionsForSingle**

+ **Function Description**: Process option filling in the single-selection scenario to ensure that the selected value is in the options.
+ **Type**: `(dataList: Record<string, unknown>[], insetDefaultValue?: boolean) => Promise<void>`
+ **Parameters**:
  - `dataList`: Original data list.
  - `insetDefaultValue`: Whether to insert the default value (optional).

#### **focus**

+ **Function Description**: Trigger the focus event and initialize data loading according to the conditions.
+ **Type**: `() => void`

#### **genQueryData**

+ **Function Description**: Generate query parameters and parse the expression configuration.
+ **Type**: `() => ObjectValue`
+ **Return Value**: Query parameter dictionary.

#### **handleEmpty**

+ **Function Description**: Handle the clear operation, reset the search keyword, and refresh the data.
+ **Type**: `(forceSearch?: boolean) => void`
+ **Parameters**:
  - `forceSearch`: Whether to force search (optional).

#### **handleSelectOption**

+ **Function Description**: Handle the option selection logic and generate an array of options with labels.
+ **Type**: `(optionDataList: Record<string, unknown>[], referencesModel: RuntimeModel | undefined) => Entity[]`
+ **Parameters**:
  - `optionDataList`: Original option data list.
  - `referencesModel`: Referenced runtime model (optional).
+ **Return Value**: Array of options with labels.

#### **innerQueryPage**

+ **Function Description**: Execute pagination query, supporting parameters such as model, condition, and field.
+ **Type**: `(modelModel: string, option: IQueryPageOption, fields?: RuntimeModelField[], variables?: ObjectValue, context?: ObjectValue) => Promise<IQueryPageResult<T>>`
+ **Parameters**:
  - `modelModel`: Model name.
  - `option`: Pagination query options.
  - `fields`: Query field list (optional).
  - `variables`: Variable parameters (optional).
  - `context`: Context parameters (optional).
+ **Return Value**: Pagination query result.

#### **initLoadOptions**

+ **Function Description**: Initialize and load option data, triggering a pagination query.
+ **Type**: `() => Promise<void>`

#### **loadMore**

+ **Function Description**: Load more data, update the page number, and trigger a query.
+ **Type**: `() => Promise<void>`

#### **loadOptions**

+ **Function Description**: Load option data and execute the query according to the model type and configuration.
+ **Type**: `(param?: IQueryPageOption) => Promise<IQueryPageResult<Record<string, unknown>>>`
+ **Parameters**:
  - `param`: Query parameters (optional).
+ **Return Value**: Pagination query result.

#### **mountedProcess**

+ **Function Description**: Processing logic during mounting, initializing the query field and loading options according to the conditions.
+ **Type**: `() => void`

#### **onDomainChange**

+ **Function Description**: Listen to dynamic domain changes, reset the page number, and reload the options.
+ **Type**: `(newDomain: string, oldDomain: string) => Promise<void>`
+ **Parameters**:
  - `newDomain`: New dynamic domain value.
  - `oldDomain`: Old dynamic domain value.

#### **onQueryChange**

+ **Function Description**: Listen to query parameter changes, reset the page number, and reload the options.
+ **Type**: `(newData: ObjectValue, oldData: ObjectValue) => Promise<void>`
+ **Parameters**:
  - `newData`: New query parameters.
  - `oldData`: Old query parameters.

#### **onSelect**

+ **Function Description**: Handle the option selection event, update the selected item, and clear the search keyword.
+ **Type**: `(e: Record<string, unknown>) => Promise<void>`
+ **Parameters**:
  - `e`: Selected option data.

#### **search**

+ **Function Description**: Execute the search operation, debounce processing, and trigger the query.
+ **Type**: `(searchValue: string, forceSearch?: boolean) => void`
+ **Parameters**:
  - `searchValue`: Search keyword.
  - `forceSearch`: Whether to force search (optional).

#### **setQueryFieldName**

+ **Function Description**: Set the query field name.
+ **Type**: `(queryFieldName: string) => void`
+ **Parameters**:
  - `queryFieldName`: Query field name.

#### **validator**

+ **Function Description**: Execute the validation logic and check whether the number of selections meets the configuration.
+ **Type**: `() => Promise<ValidatorInfo>`
+ **Return Value**: Validation information object.

### 3、SearchRangeFieldWidget  

**Inherits**：FormFieldWidget<Value, Field>  

**Properties**：  

+ allowClear：Whether to allow clearing, obtained from DSL configuration, default `true`.（`boolean`）  
+ endDefaultValue：Default value of the end value, obtained from DSL configuration.（`unknown`）  
+ endPlaceholder：Placeholder text for the end input box, translated from DSL configuration.（`string`）  
+ operator：Field operator, obtained from field configuration.（`string | undefined`）  
+ startDefaultValue：Default value of the start value, obtained from DSL configuration.（`unknown`）  
+ startPlaceholder：Placeholder text for the start input box, translated from DSL configuration.（`string`）  

**Methods**：  

#### **getInitializeComponent**  

+ **Function Description**：Get the initialization component (abstract method, needs to be implemented by subclasses).  
+ **Type**：`() => WidgetComponent`  


### 4、FormRangeFieldsWidget  

**Inherits**：BaseFormItemWidget<[Value, Value], Props>  

**Properties**：  

+ endDefaultValue：Default value of the end field, obtained from DSL configuration.（`unknown`）  
+ endField：Metadata of the end field.（`Field`）  
+ itemData：Project data identifier, formatted as `startField.data#endField.data`.（Computed property）  
+ itemName：Project name identifier, formatted as `startField.name#endField.name`.（Computed property）  
+ startDefaultValue：Default value of the start field, obtained from DSL configuration.（`unknown`）  
+ startField：Metadata of the start field.（`Field`）  

**Methods**：  

#### **getValue**  

+ **Function Description**：Get the value of the range field, returning an array containing the start and end values.  
+ **Type**：`() => [Value, Value] | null | undefined`  
+ **Return Value**：Array containing start and end values, or `null`、`undefined`.  

#### **setValue**  

+ **Function Description**：Set the value of the range field and update the form data.  
+ **Type**：`(value: [Value, Value] | null | undefined) => void`  
+ **Parameters**：  
  - `value`：Value to set, which can be an array, `null`, or `undefined`.  

#### **submit**  

+ **Function Description**：Submit range field data, returning an object containing start and end field values.  
+ **Type**：`() => Record<string, unknown>`  
+ **Return Value**：Object containing field names and corresponding values.  

#### **validator**  

+ **Function Description**：Validate the range field, check required items, and call the parent class validation logic.  
+ **Type**：`() => Promise<ValidatorInfo>`  
+ **Return Value**：Validation result information.  


### 5、AbstractTreeFieldWidget  

**Inherits**：FormFieldWidget<Value, Field, Props>  

**Properties**：  

+ backfillTreeNodes：Backfill tree node storage array.（`OioTreeNode<V>[][]`）  
+ checkable：Whether checkable, obtained from DSL configuration, default `false`.（`boolean`）  
+ checkedKeys：Array of checked node keys.（`string[] | undefined`）  
+ defaultPagination：Default pagination configuration, including `current` and `pageSize`.（`Pagination`）  
+ enableLoadData：Whether to enable data loading, default `true`.（`boolean`）  
+ enableSearch：Whether to enable search, obtained from DSL configuration, default `true`.（`boolean`）  
+ expandedKeys：Array of expanded node keys.（`string[] | undefined`）  
+ halfCheckedKeys：Array of half-checked node keys.（`string[] | undefined`）  
+ invisible：Whether invisible, calculated based on tree definition and parent class properties.（Computed property）  
+ isFetchAll：Whether to load all data, inferred from DSL configuration or selection mode.（`boolean`）  
+ loadIdempotentKey：Load idempotent key, used to prevent duplicate requests.（`string | undefined`）  
+ maxTagCount：Maximum number of displayed tags, converted from DSL configuration to a number.（`number | undefined`）  
+ mountedCallChaining：Callback chain when mounted.（`CallChaining | undefined`）  
+ pkSeparator：Primary key separator, static property `'-'`.（`string`）  
+ referencesModel：Referenced runtime model.（Computed property, `RuntimeModel | undefined`）  
+ refreshCallChaining：Callback chain when refreshing.（`CallChaining<boolean> | undefined`）  
+ selectable：Whether selectable, obtained from DSL configuration, default `true`.（`boolean`）  
+ selectMode：Selection mode, default `SelectMode.single`.（`SelectMode`）  
+ searchRootNode：Root node after search.（`OioTreeNode<V> | undefined`）  
+ treeDefinition：Tree structure definition metadata.（`TreeNodeMetadata | undefined`）  
+ treeLevel：Number of tree structure levels.（`number`）  

**Methods**：  

#### **backfillDataProcess**  

+ **Function Description**：Backfill data processing logic (abstract method, needs to be implemented by subclasses).  
+ **Type**：`(data: BackfillDataParameters<V>) => ReturnPromise<void>`  
+ **Parameters**：  
  - `data`：Backfill data parameter object.  

#### **clearBackfillDataProcess**  

+ **Function Description**：Clear backfill data logic (abstract method, needs to be implemented by subclasses).  
+ **Type**：`() => ReturnPromise<void>`  

#### **computeNodeTitle**  

+ **Function Description**：Calculate the node title based on tags, metadata, and data expressions.  
+ **Type**：`(val: V) => string`  
+ **Parameters**：  
  - `val`：Node value object.  
+ **Return Value**：Node title string.  

#### **executeNodeExpression**  

+ **Function Description**：Execute node expressions and parse dynamic content.  
+ **Type**：`(activeRecord: ActiveRecord, expression: string, errorValue?: T) => T | string | undefined`  
+ **Parameters**：  
  - `activeRecord`：Current active record.  
  - `expression`：Expression string.  
  - `errorValue`：Default value when the expression execution fails (optional).  
+ **Return Value**：Expression execution result.  

#### **fillChildren**  

+ **Function Description**：Fill node children and generate a tree structure.  
+ **Type**：`(node: OioTreeNode<V>, results: ResponseBody[]) => void`  
+ **Parameters**：  
  - `node`：Parent node.  
  - `results`：Child node data list.  

#### **fetchAll**  

+ **Function Description**：Load all tree node data.  
+ **Type**：`() => Promise<TreeNodeResponseBody[]>`  
+ **Return Value**：Tree node response body array.  

#### **fetchData**  

+ **Function Description**：Load child node data of the specified node.  
+ **Type**：`(node: OioTreeNode<V>, disableSelfReferences?: boolean) => Promise<ResponseBody[]>`  
+ **Parameters**：  
  - `node`：Target node.  
  - `disableSelfReferences`：Whether to disable self-reference filtering (optional).  
+ **Return Value**：Child node data list.  

#### **generatorCompareRecords**  

+ **Function Description**：Generate a comparison object for selected records, used for backfill determination.  
+ **Type**：`(currentValues: ActiveRecord[], metadataList: TreeNodeMetadata[]) => ActiveRecord[] | undefined`  
+ **Parameters**：  
  - `currentValues`：Current selected value array.  
  - `metadataList`：Node metadata list.  
+ **Return Value**：Comparison record array or `undefined`.  

#### **generatorDefaultTreeDefinition**  

+ **Function Description**：Generate a default tree structure definition (abstract method, needs to be implemented by subclasses).  
+ **Type**：`(props: Props) => TreeNodeMetadata | undefined`  
+ **Parameters**：  
  - `props`：Component properties.  

#### **generatorExpressionParameters**  

+ **Function Description**：Generate expression operation parameters, including context data.  
+ **Type**：`() => ExpressionRunParam`  
+ **Return Value**：Expression operation parameter dictionary.  

#### **generatorNewTreeNode**  

+ **Function Description**：Generate a new tree node and set node properties.  
+ **Type**：`(parent: OioTreeNode<V>, key: string, title: string | undefined, metadata: TreeNodeMetadata, data: ActiveRecord) => OioTreeNode<V>`  
+ **Parameters**：  
  - `parent`：Parent node.  
  - `key`：Node key.  
  - `title`：Node title (optional).  
  - `metadata`：Node metadata.  
  - `data`：Node data.  
+ **Return Value**：Newly created tree node.  

#### **generatorRootNode**  

+ **Function Description**：Generate a root tree node and initialize basic properties.  
+ **Type**：`(metadata: TreeNodeMetadata) => OioTreeNode<V>`  
+ **Parameters**：  
  - `metadata`：Root node metadata.  
+ **Return Value**：Root tree node.  

#### **getBackfillDataFilter**  

+ **Function Description**：Get backfill data filtering conditions based on metadata and hierarchy.  
+ **Type**：`(metadata: TreeNodeMetadata, index: number) => string | undefined`  
+ **Parameters**：  
  - `metadata`：Node metadata.  
  - `index`：Hierarchical index.  
+ **Return Value**：Filter condition string or `undefined`.  

#### **getTreeMetadataList**  

+ **Function Description**：Get the tree structure metadata list arranged by hierarchy.  
+ **Type**：`() => TreeNodeMetadata[]`  
+ **Return Value**：Metadata array.  

#### **isLeafPredict**  

+ **Function Description**：Predict whether a node is a leaf node based on metadata configuration.  
+ **Type**：`(node: TreeNodeMetadata | undefined) => boolean`  
+ **Parameters**：  
  - `node`：Node metadata (optional).  
+ **Return Value**：Whether it is a leaf node.  

#### **loadAllData**  

+ **Function Description**：Load all node data, handle loading status, and tree structure conversion.  
+ **Type**：`() => Promise<TreeNodeResponseBody[]>`  
+ **Return Value**：Tree node response body array.  

#### **loadData**  

+ **Function Description**：Load child node data of the specified node (lazy loading).  
+ **Type**：`(node: OioTreeNode<V>) => Promise<ResponseBody[]>`  
+ **Parameters**：  
  - `node`：Target node.  
+ **Return Value**：Child node data list.  

#### **loadMoreData**  

+ **Function Description**：Load more child node data for the specified node and update pagination.  
+ **Type**：`(node: OioTreeNode<V>) => Promise<ResponseBody[]>`  
+ **Parameters**：  
  - `node`：Target node.  
+ **Return Value**：Child node data list.  

#### **loadNode**  

+ **Function Description**：Execute node loading logic and handle loading status.  
+ **Type**：`(node: OioTreeNode<V>, fn: (...args) => R, ...args) => Promise<R>`  
+ **Parameters**：  
  - `node`：Target node.  
  - `fn`：Loading function.  
+ **Return Value**：Loading function execution result.  

#### **mountedProcess**  

+ **Function Description**：Processing logic when mounted, triggering data backfill and subscription.  
+ **Type**：`() => Promise<void>`  

#### **onSearch**  

+ **Function Description**：Handle search events and execute internal search logic after debouncing.  
+ **Type**：`(keywords: string) => void`  
+ **Parameters**：  
  - `keywords`：Search keywords.  

#### **onUpdateCheckedKeys**  

+ **Function Description**：Update the array of checked node keys.  
+ **Type**：`(val: string[]) => void`  
+ **Parameters**：  
  - `val`：New checked key array.  

#### **onUpdateExpandedKeys**  

+ **Function Description**：Update the array of expanded node keys.  
+ **Type**：`(val: string[]) => void`  
+ **Parameters**：  
  - `val`：New expanded key array.  

#### **onUpdateHalfCheckedKeys**  

+ **Function Description**：Update the array of half-checked node keys.  
+ **Type**：`(val: string[]) => void`  
+ **Parameters**：  
  - `val`：New half-checked key array.  

#### **pushSelectedNodes**  

+ **Function Description**：Push selected nodes to the list and determine based on comparison records.  
+ **Type**：`(currentValues: ActiveRecord[], selectedNodes: OioTreeNode<TreeData>[], compareRecords: ActiveRecord[], node: OioTreeNode<TreeData>, record: ActiveRecord | undefined) => void`  
+ **Parameters**：  
  - `currentValues`：Current selected value array.  
  - `selectedNodes`：Selected node list.  
  - `compareRecords`：Comparison record array.  
  - `node`：Current node.  
  - `record`：Node data (optional).  

#### **refreshProcess**  

+ **Function Description**：Processing logic when refreshing, triggering data backfill.  
+ **Type**：`() => Promise<void>`  

#### **reloadBackfillDataByValue**  

+ **Function Description**：Reload backfill data based on the current value.  
+ **Type**：`() => Promise<void>`  

#### **subscribeProcess**  

+ **Function Description**：Subscribe to form data changes and trigger data backfill.  
+ **Type**：`() => void`  

#### **convertBackfillData**  

+ **Function Description**：Convert backfill data into a tree node structure, supporting custom callbacks.  
+ **Type**：`(currentValues: ActiveRecord[], metadataList: TreeNodeMetadata[], list: TreeNodeResponseBody[], customCreateNodeCallback?: (node: OioTreeNode<V>, value: V | undefined) => void, customUpdateNodeCallback?: (node: OioTreeNode<V>, value: V) => void) => BackfillDataParameters<V> | undefined`  
+ **Parameters**：  
  - `currentValues`：Current selected value array.  
  - `metadataList`：Node metadata list.  
  - `list`：Backfill data list.  
  - `customCreateNodeCallback`：Custom create node callback (optional).  
  - `customUpdateNodeCallback`：Custom update node callback (optional).  
+ **Return Value**：Backfill data parameter object or `undefined`.  

#### **collectionBackfillTreeNodes**  

+ **Function Description**：Recursively collect backfill tree nodes and deduplicate.  
+ **Type**：`(nodes: OioTreeNode<V>[]) => void`  
+ **Parameters**：  
  - `nodes`：Tree node array.  

#### **filterChanged**  

+ **Function Description**：Listen for changes in filter conditions and trigger backfill data clearing.  
+ **Type**：`() => void`  


### 6、FormTreeFieldWidget  

**Inherits**：AbstractTreeFieldWidget<TreeData, Value, Field, Props>  

**Properties**：  

+ checkable：Whether checkable, fixed as `true`.（`boolean`）  
+ checkStrictly：Whether parent-child node checking is associated, obtained from DSL configuration, default `false`.（`boolean`）  
+ nodeCheckedAllLabel：Label text for the all-selected node, obtained from DSL configuration.（`string | undefined`）  
+ nodeUncheckedAllLabel：Label text for the unselected all node, obtained from DSL configuration.（`string | undefined`）  
+ onlySelectedLeaf：Whether only leaf nodes are allowed to be selected, obtained from DSL configuration, default `false`.（`boolean`）  
+ selectedValue：Currently selected node or node array.（`OioTreeNode<TreeData> | OioTreeNode<TreeData>[] | undefined`）  

**Methods**：  

#### **backfillDataProcess**  

+ **Function Description**：Backfill data processing, setting selected nodes.  
+ **Type**：`({ selectedNodes }: BackfillDataParameters) => void`  
+ **Parameters**：  
  - `selectedNodes`：Array of selected nodes.  

#### **clearBackfillDataProcess**  

+ **Function Description**：Clear backfill data, reset root node and selection status.  
+ **Type**：`() => Promise<void>`  

#### **collectionSelectedAllNodes**  

+ **Function Description**：Collect nodes that meet the conditions in the specified node and all its children.  
+ **Type**：`(selectedNode: OioTreeNode<TreeData>) => OioTreeNode<TreeData>[]`  
+ **Parameters**：  
  - `selectedNode`：Starting node.  
+ **Return Value**：Array of nodes that meet the conditions.  

#### **collectionSelectedNodes**  

+ **Function Description**：Collect selected nodes, deciding whether to include child nodes based on `checkStrictly`.  
+ **Type**：`(selectedNode: OioTreeNode<TreeData>) => OioTreeNode<TreeData>[]`  
+ **Parameters**：  
  - `selectedNode`：Selected node.  
+ **Return Value**：Array of nodes that meet the conditions.  

#### **fetchBackfillData**  

+ **Function Description**：Get backfill data and load all nodes.  
+ **Type**：`(currentValues: ActiveRecord[], metadataList: TreeNodeMetadata[]) => Promise<TreeNodeResponseBody[] | undefined>`  
+ **Parameters**：  
  - `currentValues`：Current value array.  
  - `metadataList`：Metadata list.  
+ **Return Value**：Node response body array or `undefined`.  

#### **generatorNewTreeNode**  

+ **Function Description**：Generate a new tree node and set node properties.  
+ **Type**：`(parent: OioTreeNode<TreeData>, key: string, title: string | undefined, metadata: TreeNodeMetadata, data: ActiveRecord) => OioTreeNode<TreeData>`  
+ **Parameters**：  
  - `parent`：Parent node.  
  - `key`：Node key.  
  - `title`：Node title.  
  - `metadata`：Node metadata.  
  - `data`：Node data.  
+ **Return Value**：Newly generated tree node.  

#### **getCurrentSelectedValue**  

+ **Function Description**：Get the current array of selected nodes.  
+ **Type**：`() => OioTreeNode<TreeData>[]`  
+ **Return Value**：Current array of selected nodes.  

#### **nodeCheckedAll**  

+ **Function Description**：Determine whether the node supports the all-selection function, obtained from DSL configuration.  
+ **Type**：`(node: OioTreeNode<TreeData>) => boolean`  
+ **Parameters**：  
  - `node`：Target node.  
+ **Return Value**：Whether all-selection is supported.  

#### **onChecked**  

+ **Function Description**：Handle node checking events and update the selection status.  
+ **Type**：`(node: OioTreeNode<TreeData>, selected: boolean) => Promise<void>`  
+ **Parameters**：  
  - `node`：Target node.  
  - `selected`：Whether selected.  

#### **onNodeCheckedAll**  

+ **Function Description**：Handle node all-selection events and update the selection status.  
+ **Type**：`(node: OioTreeNode<TreeData>, selected: boolean) => void`  
+ **Parameters**：  
  - `node`：Target node.  
  - `selected`：Whether selected.  

#### **onSelected**  

+ **Function Description**：Handle node selection events (only supports multi-selection mode).  
+ **Type**：`(node: OioTreeNode<TreeData>, selected: boolean) => Promise<void>`  
+ **Parameters**：  
  - `node`：Target node.  
  - `selected`：Whether selected.  

#### **onSelectedValueChange**  

+ **Function Description**：Handle changes in selected values, update the selection status, and trigger callbacks.  
+ **Type**：`(currentSelectedValue: OioTreeNode<TreeData>[], targetSelectedValues: OioTreeNode<TreeData>[], selected: boolean) => void`  
+ **Parameters**：  
  - `currentSelectedValue`：Current selected value.  
  - `targetSelectedValues`：Target selected value.  
  - `selected`：Whether selected.  

#### **setSelectedValue**  

+ **Function Description**：Set the selected value and update the checked key array.  
+ **Type**：`(selectedValue: OioTreeNode<TreeData> | OioTreeNode<TreeData>[] | undefined) => void`  
+ **Parameters**：  
  - `selectedValue`：Selected node or node array.  


### 7、FormTreeSelectFieldWidget  

**Inherits**：AbstractTreeFieldWidget<TreeData, Value, Field, Props>  

**Properties**：  

+ multipleCheckedStrategy：Checking strategy for multiple selections, obtained from DSL configuration.（`string | undefined`）  
+ onlySelectedLeaf：Whether only leaf nodes are allowed to be selected, obtained from DSL configuration, default `false`.（`boolean`）  
+ selectedValue：Current selected tree node value (single or multiple selection).（`SimpleTreeSelected | SimpleTreeSelected[] | undefined`）  
+ treeCheckStrictly：Whether the tree structure checking is in strict mode, converted from DSL configuration to a boolean value.（`boolean | undefined`）  

**Methods**：  

#### **backfillDataProcess**  

+ **Function Description**：Backfill data processing, converting selected nodes to `SimpleTreeSelected` format.  
+ **Type**：`({ selectedNodes }: BackfillDataParameters) => void`  
+ **Parameters**：  
  - `selectedNodes`：Array of selected tree nodes.  

#### **clearBackfillDataProcess**  

+ **Function Description**：Clear backfill data, reset root node and selection status.  
+ **Type**：`() => void`  

#### **collectionSelectedNodes**  

+ **Function Description**：Collect corresponding tree nodes based on selected values.  
+ **Type**：`(selectedValue: SimpleTreeSelected | SimpleTreeSelected[]) => OioTreeNode<TreeData>[]`  
+ **Parameters**：  
  - `selectedValue`：Selected value (single or multiple selection).  
+ **Return Value**：Corresponding tree node array.  

#### **generatorNewTreeNode**  

+ **Function Description**：Generate a new tree node and set selectable properties.  
+ **Type**：`(parent: OioTreeNode<TreeData>, key: string, title: string | undefined, metadata: TreeNodeMetadata, data: ActiveRecord) => OioTreeNode<TreeData>`  
+ **Parameters**：  
  - `parent`：Parent node.  
  - `key`：Node key.  
  - `title`：Node title.  
  - `metadata`：Node metadata.  
  - `data`：Node data.  
+ **Return Value**：Newly generated tree node.  

#### **getSelectedNodes**  

+ **Function Description**：Filter and get selected nodes that conform to the reference model.  
+ **Type**：`(selectedValue: SimpleTreeSelected | SimpleTreeSelected[]) => OioTreeNode<TreeData>[] | undefined`  
+ **Parameters**：  
  - `selectedValue`：Selected value (single or multiple selection).  
+ **Return Value**：Filtered tree node array or `undefined`.  

#### **onSelectedChange**  

+ **Function Description**：Handle selected value change events, validate and update the selection status.  
+ **Type**：`(selectedValue: SimpleTreeSelected | SimpleTreeSelected[], event: TreeSelectNodeChangeEvent) => void`  
+ **Parameters**：  
  - `selectedValue`：Selected value (single or multiple selection).  
  - `event`：Node change event object.  

#### **validatorSelectedValue**  

+ **Function Description**：Validate whether the selected value conforms to the rules (such as only leaf nodes).  
+ **Type**：`(selectedValue: SimpleTreeSelected | SimpleTreeSelected[], selectedNodes: OioTreeNode<TreeData>[]) => boolean | SimpleTreeSelected | SimpleTreeSelected[] | undefined`  
+ **Parameters**：  
  - `selectedValue`：Selected value (single or multiple selection).  
  - `selectedNodes`：Corresponding tree node array.  
+ **Return Value**：Validation result (boolean value or filtered selected value).  


### 8、FormCascaderFieldWidget  

**Inherits**：AbstractTreeFieldWidget<TreeData, Value, Field, Props>  

**Properties**：  

+ changeOnSelect：Whether to trigger changes immediately when selecting, obtained from DSL configuration, default `false`.（`boolean`）  
+ labelsSeparator：Label separator, obtained from DSL configuration.（`string | undefined`）  
+ multipleCheckedStrategy：Checking strategy for multiple selections, obtained from DSL configuration.（`string | undefined`）  
+ selectedLabels：Array of label paths of the current selected node.（`string[] | string[][] | undefined`）  
+ selectedValue：Array of key paths of the current selected node.（`string[] | string[][] | undefined`）  
+ showPath：Whether to display the complete path, obtained from DSL configuration, default `false`.（`boolean`）  

**Methods**：  

#### **backfillDataProcess**  

+ **Function Description**：Backfill data processing, converting selected nodes into key path and label path arrays.  
+ **Type**：`({ selectedNodes }: BackfillDataParameters) => void`  
+ **Parameters**：  
  - `selectedNodes`：Array of selected tree nodes.  

#### **clearBackfillDataProcess**  

+ **Function Description**：Clear backfill data, reset root node and selection status.  
+ **Type**：`() => void`  

#### **collectionSelectedLabels**  

+ **Function Description**：Collect the label paths of selected nodes (from child nodes to root nodes).  
+ **Type**：`(selectedNode: OioTreeNode<TreeData> | undefined) => string[]`  
+ **Parameters**：  
  - `selectedNode`：Target node (optional).  
+ **Return Value**：Label path array.  

#### **collectionSelectedValues**  

+ **Function Description**：Collect the key paths of selected nodes (from child nodes to root nodes).  
+ **Type**：`(selectedNode: OioTreeNode<TreeData> | undefined) => string[]`  
+ **Parameters**：  
  - `selectedNode`：Target node (optional).  
+ **Return Value**：Key path array.  

#### **fetchBackfillData**  

+ **Function Description**：Get backfill data, supporting full loading or reverse query.  
+ **Type**：`(currentValues: ActiveRecord[], metadataList: TreeNodeMetadata[]) => Promise<TreeNodeResponseBody[] | undefined>`  
+ **Parameters**：  
  - `currentValues`：Current value array.  
  - `metadataList`：Metadata list.  
+ **Return Value**：Node response body array or `undefined`.  

#### **getSelectedNodes**  

+ **Function Description**：Get corresponding tree nodes based on selected values and options, supporting multiple selection strategies.  
+ **Type**：`(selectedValue: string[] | string[][], selectedOptions: CascaderItemType[] | CascaderItemType[][]) => OioTreeNode<TreeData>[] | undefined`  
+ **Parameters**：  
  - `selectedValue`：Array of selected key paths.  
  - `selectedOptions`：Array of selected options.  
+ **Return Value**：Corresponding tree node array or `undefined`.  

#### **onSelectedChange**  

+ **Function Description**：Handle selected value change events, validate and update the selection status and labels.  
+ **Type**：`(selectedValue: string[] | string[][], selectedOptions: CascaderItemType[] | CascaderItemType[][]) => void`  
+ **Parameters**：  
  - `selectedValue`：Array of selected key paths.  
  - `selectedOptions`：Array of selected options.  

#### **validatorSelectedValue**  

+ **Function Description**：Validate whether the selected value conforms to the rules (such as path integrity, leaf node restrictions).  
+ **Type**：`(selectedValue: string[] | string[][], selectedNodes: OioTreeNode<TreeData>[]) => boolean | string[] | string[][]`  
+ **Parameters**：  
  - `selectedValue`：Array of selected key paths.  
  - `selectedNodes`：Corresponding tree node array.  
+ **Return Value**：Validation result (boolean value or filtered key path array).