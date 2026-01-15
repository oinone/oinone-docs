---
title: Element
index: true
category:
  - R&D Manual
  - Reference
  - Front-end API
  - Widget
order: 7
next:
  text: View
  link: /v6/en/DevManual/Reference/Front-EndFramework/Widget/View/README.md
---
In Oinone Kunlun, there is a type of component that cannot be described in a specific category, known as `element components`. They can be used to implement any functionality you want and placed anywhere on the page.

In the "[Customize a View](/en/DevManual/OperationGuide/customize-a-view-widget.md)" chapter, we have already had a preliminary understanding of the Element view component. Below, we will elaborate on the built-in Element components in Oinone, their roles in the system, and the relationships between them.

# I. Element Component Map

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/1748589706552-57bb6e24-a1e8-497b-b848-66b85e459ae7.jpeg)

+ Abstract Base Classes
  - BaseElement: Basic element component (SPI Token component).
  - BaseElementViewWidget: Base class for Element view components.
  - BaseElementListViewWidget: Base class for list (List) data structure view components.
  - BaseElementObjectViewWidget: Base class for object (Object) data structure view components.
  - AbstractTreeWidget: Base class for tree (Tree) data structure view components.
+ View Component Base Classes
  - BaseTableWidget: Base class for table interaction components (providing a class of components similar to table interactions).
  - BaseSearchWidget: Base class for search components (providing a class of components with form search functions).
  - BaseFormWidget: Base class for form components (providing a class of components with form functions).
  - AbstractTreeElementWidget: Base class for tree control components (providing basic tree control functions).
  - AbstractCardCascaderElementWidget: Base class for cascader control components (providing basic cascader control functions).
+ View Components
  - TableWidget: Table component
  - GalleryWidget: Gallery component
  - SearchWidget: Search component
  - FormWidget: Form component
  - DetailWidget: Detail component
  - TreeWidget: Tree control component
  - CardCascaderWidget: Cascader control component

# II. Registration of Element Components

## (Ⅰ) Registration Options for Element Components

``` typescript
/**
 * Element component registration options
 */
export interface BaseElementOptions extends SPIOptions {
  /**
   * Current view type
   */
  viewType?: ViewType | ViewType[];
  /**
   * Component name
   */
  widget?: string | string[];
  /**
   * Inline component
   */
  inline?: boolean;
  /**
   * Specified model
   */
  model?: string | string[];
  /**
   * Specified view
   */
  viewName?: string | string[];
}
```

From the above type declaration, it is not difficult to find that the classification dimensions cover multiple aspects: view type, component name, whether it is an inline component, model code, and view name. These dimensions are used to describe the usage location of the component. Generally, the more "precise" the location description, the higher the priority of the component when rendering in the corresponding location. In the case of completely identical location descriptions, the later registered component will overwrite the earlier registered one.

## (Ⅱ) Registering Components

When registering element components, we usually distinguish them through the `viewType` and `widget` attributes. Take `FormWidget` as an example:

``` typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Form,
    widget: ['form', 'Form']
  })
)
export class FormWidget extends BaseFormWidget
```

:::warning Tip:

When using the widget attribute, you can specify multiple component names as "aliases" for this component.

:::

# Ⅲ. Reference List

## (Ⅰ) Abstract Base Classes

### 1. BaseElementViewWidget

**Inheritance**: BaseElementWidget<`Props`>

**Attributes**:

+ $router: Routing instance. (`Router`)
+ dataSourceConfig: Data source configuration. (`ElementViewDataSourceConfig | undefined`)
+ domain: Custom RSQL expression. (`string | undefined`)
+ filter: Custom RSQL expression. (`string | undefined`)
+ isDataSourceProvider: Whether it is a data source provider. When `true`, the data source is obtained from the current component's query interface; when `false`, it is provided by the parent component. (`boolean`)
+ mountedCallChaining: Mounting chaining configuration (merges the current value with the parent value). (`CallChaining | undefined`)
+ parentMountedCallChaining: Parent mounting chaining configuration. (`CallChaining | undefined`)
+ parentRefreshCallChaining: Parent refresh chaining configuration. (`CallChaining<boolean> | undefined`)
+ parentRelationUpdateType: Parent relation update type. (`RelationUpdateType | undefined`)
+ parentSubmitType: Parent submission type. (`SubmitType | undefined`)
+ parentViewMode: Parent view mode. (`ViewMode | undefined`)
+ refreshCallChaining: Refresh chaining configuration (merges the current value with the parent value). (`CallChaining | undefined`)
+ reloadFormData$: Context subscription for refreshing form data. (`WidgetSubjection<boolean>`)
+ relationUpdateType: Relation update type (merges current value, DSL value, and parent value). (`RelationUpdateType`)
+ submitCallChaining: Data submission chaining configuration (directly uses parent configuration). (`CallChaining<SubmitValue> | undefined`)
+ submitType: Submission type (merges current value, DSL value, and parent value). (`SubmitType`)
+ validatorCallChaining: Data validation chaining configuration (directly uses parent configuration). (`CallChaining<boolean> | undefined`)
+ viewMode: View mode (merges current value with parent value, default `Create`). (`ViewMode`)

**Methods**:

#### **getViewMode**

+ **Function Description**: Get the current view mode.
+ **Type**: `() => ViewMode`
+ **Return Value**: Current view mode.

#### **isExpandView**

+ **Function Description**: Determine if it is an expanded view (matched by context handle).
+ **Type**: `() => boolean`
+ **Return Value**: `true` indicates an expanded view, `false` indicates otherwise.

#### **mountedProcess?**

+ **Function Description**: Abstract method defining the specific logic during mounting (needs to be implemented by subclasses).
+ **Type**: `() => Promise<void>`

#### **refreshCondition**

+ **Function Description**: Refresh filter conditions, merge multi-level RSQL expressions, and update view filtering.
+ **Type**: `() => void`

#### **refreshConditionContext**

+ **Function Description**: Get the refresh condition context (returns the `context` of the current view).
+ **Type**: `() => Record<string, unknown> | undefined`
+ **Return Value**: View context object or `undefined`.

#### **refreshProcess?**

+ **Function Description**: Abstract method defining the specific logic during refresh (needs to be implemented by subclasses).
+ **Type**: `() => Promise<void>`

#### **setViewMode**

+ **Function Description**: Set the current view mode.
+ **Type**: `(mode: ViewMode | undefined) => void`
+ **Parameters**:
  - `mode`: Target view mode.

### 2. BaseElementObjectViewWidget

**Inheritance**: BaseElementViewWidget<`Props`>

**Attributes**:

+ cols: Calculated number of columns, giving priority to DSL configuration, then inheriting from the parent, with a default value of 1. (`number`)
+ currentSubmitCallChaining: Observable submission chaining instance. (`CallChaining<SubmitValue> | undefined`)
+ currentValidatorCallChaining: Observable validation chaining instance. (`CallChaining<boolean> | undefined`)
+ enableScrollToErrorField: Whether to enable automatic scrolling to error fields, with a default value of `true`. (`boolean`)
+ fieldWidgetMap: Field component mapping table storing component instances and indices. (`Map<string, FieldWidgetEntity>`)
+ formData: Current form data, defaulting to returning the first active record or an empty object. (`ActiveRecord`)
+ loadFunctionFun: Load function name. (`string | undefined`)
+ loadFunctionNamespace: Load function namespace (deprecated). (`string`)
+ parentRefreshProcess: Parent refresh process function. (`RefreshProcessFunction | undefined`)
+ submitCallChaining: Data submission chaining accessor, merging the current instance with the parent instance. (`CallChaining<SubmitValue> | undefined`)
+ validatorCallChaining: Data validation chaining accessor, merging the current instance with the parent instance. (`CallChaining<boolean> | undefined`)

**Methods**:

#### **fieldWidgetMounted**

+ **Function Description**: Triggered when a field component is mounted, recording the component instance and index in the mapping table.
+ **Type**: `(widget: BaseFieldWidget) => void`
+ **Parameters**:
  - `widget`: Field component instance.

#### **fieldWidgetUnmounted**

+ **Function Description**: Triggered when a field component is unmounted, removing the component record from the mapping table.
+ **Type**: `(widget: BaseFieldWidget) => void`
+ **Parameters**:
  - `widget`: Field component instance.

#### **fetchData**

+ **Function Description**: Load data based on conditions, automatically handling query logic and returning a single record.
+ **Type**: `(condition?: Condition) => Promise<ActiveRecord>`
+ **Parameters**:
  - `condition`: Query conditions.
+ **Return Value**: Loaded single record.

#### **generatorCondition**

+ **Function Description**: Generate the final query condition, merging filter conditions, domain, and context data.
+ **Type**: `(condition?: Condition) => Condition | undefined`
+ **Parameters**:
  - `condition`: Basic query conditions.
+ **Return Value**: Final query condition.

#### **generatorQueryContext**

+ **Function Description**: Generate the query context, supplementing scenario parameters into `__queryParams`.
+ **Type**: `(context?: QueryContext) => QueryContext`
+ **Parameters**:
  - `context`: Basic query context.
+ **Return Value**: Complete query context.

#### **generatorQueryVariables**

+ **Function Description**: Generate query variables, supplementing scenario information (such as `scene`) and runtime context.
+ **Type**: `(variables?: QueryVariables) => QueryVariables`
+ **Parameters**:
  - `variables`: Basic query variables.
+ **Return Value**: Complete query variables.

#### **getData**

+ **Function Description**: Get current form data.
+ **Type**: `() => ActiveRecord`
+ **Return Value**: Current form data.

#### **getFieldWidgets**

+ **Function Description**: Get all field components, supporting sorting by index.
+ **Type**: `(sort = false) => BaseFieldWidget[]`
+ **Parameters**:
  - `sort`: Whether to sort by index (default value: `false`).
+ **Return Value**: Array of field components.

#### **mountedProcess**

+ **Function Description**: Post-mounting processing logic, automatically loading data and updating the view mode.
+ **Type**: `() => Promise<void>`

#### **onFieldEvent**

+ **Function Description**: Listen to field component events, supporting single field or global listening.
+ **Type**: `(field: string | string[] | '*', eventName: FieldEventName | { [key in FieldEventName]?: FieldHandlerEvent }, callback?: FieldHandlerEvent) => void`
+ **Parameters**:
  - `field`: Field name or field array (`*` for all fields).
  - `eventName`: Event name or event object.
  - `callback`: Callback function (optional, not needed when `eventName` is an object).

#### **queryConstruct**

+ **Function Description**: Handle data construction for new scenarios, merging initial values and runtime context.
+ **Type**: `(queryData: ActiveRecords | undefined, variables: QueryVariables, context: QueryContext) => Promise<ActiveRecord>`
+ **Parameters**:
  - `queryData`: Initial data.
  - `variables`: Query variables.
  - `context`: Query context.
+ **Return Value**: Constructed single record.

#### **queryData**

+ **Function Description**: Execute data query based on context type (single/batch), supporting construction mode and direct query.
+ **Type**: `(variables: QueryVariables, context: QueryContext) => Promise<ActiveRecord>`
+ **Parameters**:
  - `variables`: Query variables.
  - `context`: Query context.
+ **Return Value**: Query result.

#### **queryOne**

+ **Function Description**: Execute single data query based on `loadFunctionFun` or directly return cached data.
+ **Type**: `(queryData: ActiveRecord, variables: QueryVariables, context: QueryContext) => Promise<ActiveRecord>`
+ **Parameters**:
  - `queryData`: Query conditions.
  - `variables`: Query variables.
  - `context`: Query context.
+ **Return Value**: Single query result.

#### **queryOneByWrapper**

+ **Function Description**: Execute single data query through a condition wrapper, suitable for complex filtering scenarios.
+ **Type**: `(condition: Condition, variables: QueryVariables, context: QueryContext) => Promise<ActiveRecord>`
+ **Parameters**:
  - `condition`: Condition wrapper.
  - `variables`: Query variables.
  - `context`: Query context.
+ **Return Value**: Single query result.

#### **refreshProcess**

+ **Function Description**: Refresh data process, supporting automatic loading or calling the parent refresh function.
+ **Type**: `(condition?: Condition) => Promise<void>`
+ **Parameters**:
  - `condition`: Refresh conditions.

#### **repairViewMode**

+ **Function Description**: Automatically repair the view mode (create/edit) based on the current record ID and parent mount status.
+ **Type**: `() => void`

#### **submit**

+ **Function Description**: Trigger data submission through submission chaining or directly return form data.
+ **Type**: `() => Promise<SubmitValue | undefined>`
+ **Return Value**: Submission result.

#### **testInitialContext**

+ **Function Description**: Verify whether the initial context contains fields not used in the page, printing warning logs.
+ **Type**: `() => void`

#### **validator**

+ **Function Description**: Trigger data validation through validation chaining or directly return validation results.
+ **Type**: `() => Promise<boolean>`
+ **Return Value**: Validation result.

#### **setData**

+ **Function Description**: Set form data, updating the data source and active record.
+ **Type**: `(data: ActiveRecords | undefined) => void`
+ **Parameters**:
  - `data`: Data source to set.

#### **tryScrollToFieldWidget**

+ **Function Description**: Attempt to scroll to the error field component, deciding whether to enable scrolling based on configuration.
+ **Type**: `(fieldWidget: BaseFieldWidget) => void`
+ **Parameters**:
  - `fieldWidget`: Error field component instance.

### 3. BaseElementListViewWidget

**Inheritance**: BaseElementViewWidget<`Props`>

**Attributes**:

+ checkboxAllCallChaining: Chaining instance for checkbox all-selection operations. (`CallChaining | undefined`)
+ defaultPageSize: Default number of items per page. (`number`)
+ defaultPageSizeOptions: Default page size options. (`number[]`)
+ emptyImage: Empty data image. (`undefined`)
+ emptyText: Empty data prompt. (`string`)
+ loadFunctionFun: Load function name, specified as `false` when data loading is disabled. (`string | undefined`)
+ loadFunctionNamespace: Load function namespace. (`string`, deprecated: manual setting not allowed)
+ ordering: Default sorting field. (`ISort[] | undefined`)
+ pageSizeOptions: Pagination options. (`number[]`)
+ pagination: Pagination parameters. (`Pagination | undefined`)
+ paginationStyle: Pagination style. (`ListPaginationStyle`)
+ searchBody: Search data. (`ActiveRecord | undefined`)
+ searchCondition: Search conditions (tree structure). (`TreeNode<RSQLNodeInfo> | undefined`)
+ searchConditions: Search expressions. (`QueryExpression[] | undefined`)
+ searchSortedDataSource: List data obtained based on search content. (`ActiveRecord[] | undefined`)
+ selectable: Whether to enable selection function. (`boolean`)
+ selectMode: Selection mode. (`ListSelectMode`)
+ showDataSource: Currently displayed list data. (`ActiveRecord[] | undefined`)
+ showPagination: Whether to display pagination. (`boolean`)
+ sortConfig: Sorting configuration. (`VxeTablePropTypes.SortConfig`)
+ sortList: Sorting parameters. (`ISort[] | undefined`)
+ sortable: Whether to enable sorting. (`boolean`)
+ usingSearchCondition: Whether to search on the front end. (`boolean`)

**Methods**:

#### **executeSearchExpression**

+ **Function Description**: Parse search expressions and return calculated values.
+ **Type**: `(searchWidget: BaseRuntimePropertiesWidget, expression: string) => string | undefined`
+ **Parameters**:
  - `searchWidget`: Search component instance.
  - `expression`: Expression to be parsed.
+ **Return Value**: Execution result of the expression.

#### **fetchData**

+ **Function Description**: Load data based on conditions and return the repaired record array.
+ **Type**: `(condition?: Condition) => Promise<ActiveRecord[]>`
+ **Parameters**:
  - `condition`: Query conditions (optional).
+ **Return Value**: Loaded record array.

#### **fieldWidgetMounted**

+ **Function Description**: Field component mounting.
+ **Type**: `(widget: any) => void`
+ **Parameters**:
  - `widget`: Component instance.

#### **fieldWidgetUnmounted**

+ **Function Description**: Field component unmounting.
+ **Type**: `(widget: any) => void`
+ **Parameters**:
  - `widget`: Component instance.

#### **generatorCondition**

+ **Function Description**: Generate final query conditions, merging filter conditions, domain conditions, and search conditions.
+ **Type**: `(condition?: Condition, usingSearchCondition?: boolean) => Condition`
+ **Parameters**:
  - `condition`: Original conditions (optional).
  - `usingSearchCondition`: Whether to use search conditions (optional).
+ **Return Value**: Final query conditions.

#### **generatorPagination**

+ **Function Description**: Generate or obtain pagination parameters to ensure the current page and items per page are valid values.
+ **Type**: `() => Pagination`
+ **Return Value**: Pagination parameter object.

#### **generatorQueryContext**

+ **Function Description**: Generate query context, automatically populating scenario information into query parameters.
+ **Type**: `(context?: QueryContext) => QueryContext`
+ **Parameters**:
  - `context`: Original context (optional).
+ **Return Value**: Query context.

#### **generatorQuerySort**

+ **Function Description**: Get the current sorting parameter array.
+ **Type**: `() => ISort[]`
+ **Return Value**: Sorting parameter array.

#### **generatorQueryVariables**

+ **Function Description**: Generate query variables, automatically populating scenario information.
+ **Type**: `(variables?: QueryVariables) => QueryVariables`
+ **Parameters**:
  - `variables`: Original variables (optional).
+ **Return Value**: Query variables.

#### **generatorRequestFields**

+ **Function Description**: Generate a request field list, merging model fields and search fields.
+ **Type**: `() => RequestModelField[]`
+ **Return Value**: Request field array.

#### **generatorSearchBody**

+ **Function Description**: Generate the final search body and parse dynamic expressions.
+ **Type**: `() => ActiveRecord | undefined`
+ **Return Value**: Processed search body data.

#### **generatorSearchCondition**

+ **Function Description**: Generate a search condition tree based on query conditions or reset search conditions.
+ **Type**: `(condition?: Condition) => void`
+ **Parameters**:
  - `condition`: Query conditions (optional).

#### **getData**

+ **Function Description**: Get data.
+ **Type**: `() => ActiveRecord[] | undefined`
+ **Return Value**: All list data.

#### **getPaginationStyle**

+ **Function Description**: Get the pagination style.
+ **Type**: `() => ListPaginationStyle`
+ **Return Value**: Pagination style enumeration value.

#### **mountedProcess**

+ **Function Description**: Post-mounting processing logic, loading data and handling pagination and caching.
+ **Type**: `() => Promise<void>`

#### **onCheckedAllChange**

+ **Function Description**: Triggered when the all-selection status changes, updating selected records.
+ **Type**: `(selected: boolean, data: ActiveRecord[], event?: CheckedChangeEvent) => void`
+ **Parameters**:
  - `selected`: Whether to select all.
  - `data`: Current list data.
  - `event`: Event object (optional).

#### **onCheckedChange**

+ **Function Description**: Triggered when the checkbox selection status changes, updating active records.
+ **Type**: `(data: ActiveRecords, event?: CheckedChangeEvent) => void`
+ **Parameters**:
  - `data`: Array of selected records.
  - `event`: Event object (optional).

#### **onPaginationChange**

+ **Function Description**: Triggered when pagination parameters change, updating routing and data.
+ **Type**: `(current: number, pageSize: number) => void`
+ **Parameters**:
  - `current`: Current page number.
  - `pageSize`: Items per page.

#### **onRadioChange**

+ **Function Description**: Triggered when the radio selection status changes, updating active records.
+ **Type**: `(data: ActiveRecord, event?: RadioChangeEvent) => void`
+ **Parameters**:
  - `data`: Selected single record.
  - `event`: Event object (optional).

#### **onSortChange**

+ **Function Description**: Triggered when sorting parameters change, updating routing and data.
+ **Type**: `(sortList: ISort[]) => void`
+ **Parameters**:
  - `sortList`: New sorting parameter array.

#### **queryPage**

+ **Function Description**: Execute pagination query, supporting associated model queries.
+ **Type**: `(condition: Condition, pagination: Pagination, sort: ISort[], variables: QueryVariables, context: QueryContext) => Promise<QueryPageResult<T>>`
+ **Parameters**:
  - `condition`: Query conditions.
  - `pagination`: Pagination parameters.
  - `sort`: Sorting parameters.
  - `variables`: Query variables.
  - `context`: Query context.
+ **Return Value**: Pagination query result.

#### **relationM2MQueryPage**

+ **Function Description**: Associate model many-to-many query for pagination data.
+ **Type**: `(field: RuntimeM2MField, queryData: ActiveRecord, condition: Condition, pagination: Pagination, sort: ISort[], variables: QueryVariables, context: QueryContext) => Promise<QueryPageResult<T>>`
+ **Parameters**:
  - `field`: Many-to-many field model.
  - `queryData`: Query data.
  - `condition`: Query conditions.
  - `pagination`: Pagination parameters.
  - `sort`: Sorting parameters.
  - `variables`: Query variables.
  - `context`: Query context.
+ **Return Value**: Pagination query result.

#### **repairPaginationAfterDelete**

+ **Function Description**: Repair pagination after deleting data, switching to the correct page number.
+ **Type**: `() => void`

#### **refreshProcess**

+ **Function Description**: Refresh data, supporting active data source loading or parent refresh.
+ **Type**: `(condition?: Condition) => Promise<void>`
+ **Parameters**:
  - `condition`: Refresh conditions (optional).

#### **resetSearchCondition**

+ **Function Description**: Reset search conditions to `undefined`.
+ **Type**: `() => void`

#### **seekSearchRuntimeContext**

+ **Function Description**: Find the runtime context of the search component.
+ **Type**: `() => RuntimeContext | RootRuntimeContext`
+ **Return Value**: Search runtime context or root context.

#### **setData**

+ **Function Description**: Set data.
+ **Type**: `(data: ActiveRecords | undefined, currentPage?: number) => void`
+ **Parameters**:
  - `data`: Record array (optional).
  - `currentPage`: Current page number (optional).

#### **submitCacheProcess**

+ **Function Description**: Process submission cache, updating the data source and pagination information.
+ **Type**: `(dataSource: ActiveRecord[]) => void`
+ **Parameters**:
  - `dataSource`: New data source array.

#### **testInitialContext**

+ **Function Description**: Verify whether the initial context contains fields not used in search conditions.
+ **Type**: `() => void`

## (Ⅱ) View Component Base Classes

### 1. BaseTableWidget

**Inheritance**: BaseElementListViewWidget<`Props`>

**Attributes**:

+ cachedEditActiveRecords: Cached active records being edited. (`ActiveRecord | undefined`)
+ columnWidgetMap: Column component mapping. (`Map<string, ColumnWidgetEntity>`)
+ createMode: Creation mode. (`boolean | undefined`)
+ currentEditorContext: Current editing mode context. (`ActiveEditorContext | undefined`)
+ currentTriggerCreateAction: Current trigger creation operation. (`RuntimeAction | undefined`)
+ editorCloseTrigger: In-line trigger close trigger mode. (`TableEditorCloseTrigger`)
+ editorMode: In-line editing mode. (`TableEditorMode`)
+ editorShowIcon: Whether to display in-line editing icons. (`boolean`)
+ editorTrigger: In-line editing trigger mode. (`TableEditorTrigger`)
+ editable: Whether to enable in-line editing. (`boolean | undefined`)
+ expandContext: Expansion context. (`Record<string, unknown> | undefined`)
+ height: Table height. (`string | undefined`)
+ lastedCurrentEditorContext: Previous current editing mode context. (`ActiveEditorContext | undefined`)
+ maxHeight: Maximum table height. (`string | undefined`)
+ minHeight: Minimum table height. (`string | undefined`)
+ rowEditorCreateFun: In-line editing creation function name. (`string | undefined`)
+ rowEditorUpdateFun: In-line editing update function name. (`string | undefined`)
+ tableInstance: Table instance. (`OioTableInstance | undefined`)
+ tableRowEditMode: Table row editing mode. (`TableRowEditMode | undefined`)
+ userPrefer: User preferences. (`UserTablePrefer | undefined`)
+ userPreferEventManager: User preference event manager. (`UserPreferEventManager | undefined`)

**Methods**:

#### **activeEditor**

+ **Function Description**: Callback for activating editing mode.
+ **Type**: `(context: ActiveEditorContext) => ReturnPromise<void>`
+ **Parameters**:
  - `context`: Activated editing mode context.

#### **activeEditorBefore**

+ **Function Description**: Callback before activating editing mode.
+ **Type**: `(context: ActiveEditorContext) => boolean`
+ **Parameters**:
  - `context`: Activated editing mode context.
+ **Return Value**: `true` to allow opening editing mode, `false` to block opening editing mode.

#### **columnWidgetMounted**

+ **Function Description**: Column component mounting.
+ **Type**: `(widget: BaseTableColumnWidget) => void`
+ **Parameters**:
  - `widget`: Column component instance.

#### **columnWidgetUnmounted**

+ **Function Description**: Column component unmounting.
+ **Type**: `(widget: BaseTableColumnWidget) => void`
+ **Parameters**:
  - `widget`: Column component instance.

#### **editRow**

+ **Function Description**: Edit row.
+ **Type**: `(type: unknown, data: unknown) => void`
+ **Parameters**:
  - `type`: Editing type.
  - `data`: Editing data (including records and operations).

#### **executeExpression**

+ **Function Description**: Execute expressions.
+ **Type**: `(activeRecord: ActiveRecord | undefined, expression: string, errorValue?: T) => T | string | undefined`
+ **Parameters**:
  - `activeRecord`: Active record.
  - `expression`: Expression to be executed.
  - `errorValue`: Return value when the expression execution errors (optional).
+ **Return Value**: Execution result of the expression.

#### **filterEditable**

+ **Function Description**: Filter in-line editing of columns.
+ **Type**: `(context: ActiveEditorContext, columnWidget: BaseTableColumnWidget, index: number) => boolean`
+ **Parameters**:
  - `context`: Activated editing mode context.
  - `columnWidget`: Column component.
  - `index`: Column index.
+ **Return Value**: Whether in-line editing is allowed for the current column.

#### **getColumnWidgets**

+ **Function Description**: Get column components.
+ **Type**: `(sort = false) => BaseTableColumnWidget[]`
+ **Parameters**:
  - `sort`: Whether to sort column components by index (optional, default value `false`).
+ **Return Value**: Array of column components.

#### **getTableInstance**

+ **Function Description**: Get the table instance.
+ **Type**: `() => OioTableInstance | undefined`
+ **Return Value**: Table instance or `undefined`.

#### **reloadActiveRecords**

+ **Function Description**: Reload active records and update the selection status of the table instance.
+ **Type**: `(records: ActiveRecords | undefined) => void`
+ **Parameters**:
  - `records`: Active record array (optional).

#### **reloadTableInstanceActiveRecords**

+ **Function Description**: Update the selected rows of the table instance according to the selection mode.
+ **Type**: `() => void`

#### **removeRecordFormDataSource**

+ **Function Description**: Delete the specified record from the data source.
+ **Type**: `(context: RowContext) => Promise<void>`
+ **Parameters**:
  - `context`: Row context containing record data.

#### **rowEditorClosed**

+ **Function Description**: Complete processing logic when row editing is closed, including validation, submission, and post-operations.
+ **Type**: `(context: RowContext | undefined) => Promise<boolean>`
+ **Parameters**:
  - `context`: Row context (optional).
+ **Return Value**: Whether the row editing closure operation is successful.

#### **rowEditorClosedAfterProcess**

+ **Function Description**: Post-processing after in-line editing is closed, updating the data source and active records.
+ **Type**: `(context: RowContext) => Promise<void>`
+ **Parameters**:
  - `context`: Row context.

#### **rowEditorClosedBefore**

+ **Function Description**: Validation and preprocessing before row editing is closed.
+ **Type**: `(context: RowContext) => Promise<boolean>`
+ **Parameters**:
  - `context`: Row context.
+ **Return Value**: Whether to allow closing row editing.

#### **rowEditorClosedForCreate**

+ **Function Description**: Execute the creation operation when in-line editing is closed.
+ **Type**: `(context: RowContext, data: ActiveRecords) => Promise<boolean>`
+ **Parameters**:
  - `context`: Row context.
  - `data`: Submission data for the creation operation.
+ **Return Value**: Whether the creation operation is successful.

#### **rowEditorClosedForSubmit**

+ **Function Description**: Submit data when in-line editing is closed.
+ **Type**: `(context: RowContext) => Promise<ActiveRecord | undefined>`
+ **Parameters**:
  - `context`: Row context.
+ **Return Value**: Submitted data or `undefined`.

#### **rowEditorClosedForUpdate**

+ **Function Description**: Execute the update operation when in-line editing is closed.
+ **Type**: `(context: RowContext, data: ActiveRecords) => Promise<boolean>`
+ **Parameters**:
  - `context`: Row context.
  - `data`: Submission data for the update operation.
+ **Return Value**: Whether the update operation is successful.

#### **rowEditorClosedForValidator**

+ **Function Description**: Data validation when in-line editing is closed.
+ **Type**: `(context?: RowContext) => Promise<boolean>`
+ **Parameters**:
  - `context`: Row context (optional).
+ **Return Value**: Whether data validation passes.

#### **setTableInstance**

+ **Function Description**: Set the table instance.
+ **Type**: `(tableInstance: OioTableInstance | undefined) => void`
+ **Parameters**:
  - `tableInstance`: Table instance (optional).

#### **updateActiveRecordByData**

+ **Function Description**: Update active records based on new data.
+ **Type**: `(data: ActiveRecord) => void`
+ **Parameters**:
  - `data`: Updated active record.

#### **updateSubviewFieldWidget**

+ **Function Description**: Update the data source of subview field components.
+ **Type**: `(context: RowContext, data: ActiveRecord) => void`
+ **Parameters**:
  - `context`: Row context.
  - `data`: Updated data.

### 2. BaseSearchWidget

**Type Declaration**:

``` typescript
export class BaseSearchWidget extends BaseElementWidget
```

**Attributes**:

+ cols: Number of columns of the current search component, giving priority to DSL configuration, with a default value of `4`. (`number`)
+ defaultAllInvisible: Whether to hide all by default, with a default value of `true`. (`boolean`)
+ defaultSearchBody: Default search form data. (`ActiveRecord | undefined`)
+ defaultSearchCondition: Default search condition expression. (`QueryExpression[] | undefined`)
+ formData: Current form data, taking the first active record, defaulting to an empty object. (`ActiveRecord`)
+ mountedCallChaining: Mounting chaining object. (`CallChaining | undefined`)
+ parentCols: Number of columns of the parent component. (`number | undefined`)
+ refreshCallChaining: Refresh chaining object. (`CallChaining<boolean> | undefined`)
+ searchBody: Search form data. (`ActiveRecord | undefined`)
+ searchConditions: Search condition expression array. (`QueryExpression[] | undefined`)

**Methods**:

#### **onReset**

+ **Function Description**: Reset search conditions, restore default values, update routing parameters (non-inline mode), and trigger data refresh.
+ **Type**: `() => Promise<void>`

#### **onSearch**

+ **Function Description**: Submit search conditions and trigger data refresh.
+ **Type**: `() => void`

### 3. BaseFormWidget

**Inheritance**: BaseElementObjectViewWidget<`Props`>

**Attributes**:

+ dataPath: Data path. (`string | undefined`)
+ labelCol: Label column configuration. (`Partial<OioColModel>`)
+ layout: Form layout. (`string`)
+ wrapperCol: Wrapper column configuration. (`Partial<OioColModel>`)

**Methods**:

#### **getFormInstance**

+ **Function Description**: Get the form instance.
+ **Type**: `() => OioFormInstance | undefined`
+ **Return Value**: Form instance or `undefined`.

### 4. AbstractTreeWidget

**Inheritance**: BaseElementWidget

**Attributes**:

+ allInvisible: Whether all are invisible. (`boolean`)
+ currentRefreshCallChaining: Current refresh call chain. (`CallChaining | undefined`)
+ defaultPagination: Default pagination configuration. (`Pagination`)
+ enableSearch: Whether to enable search. (`boolean`)
+ invisible: Whether to be invisible. (`boolean`)
+ loadIdempotentKey: Load idempotent key. (`Record<string, string>`)
+ mountedCallChaining: Mounting call chain. (`CallChaining | undefined`)
+ parentRefreshCallChaining: Parent refresh call chain. (`CallChaining | undefined`)
+ refreshCallChaining: Refresh call chain (exposed through `currentRefreshCallChaining`). (`CallChaining | undefined`)
+ treeDefinition: Tree structure definition metadata. (`TreeNodeMetadata | undefined`)

**Methods**:

#### **executeExpression**

+ **Function Description**: Execute expressions.
+ **Type**: `(activeRecord: ActiveRecord, expression: string, errorValue?: T) => T | string | undefined`
+ **Parameters**:
  - `activeRecord`: Active record.
  - `expression`: Expression to be executed.
  - `errorValue`: Return value when the expression execution errors (optional).
+ **Return Value**: Execution result of the expression.

#### **fillChildren**

+ **Function Description**: Fill child node data.
+ **Type**: `(node: OioTreeNode<V>, results: ResponseBody[]) => void`
+ **Parameters**:
  - `node`: Target node.
  - `results`: Array of child node data to be filled.

#### **fetchData**

+ **Function Description**: Get node data (abstract method, needs to be implemented by subclasses).
+ **Type**: `(node: OioTreeNode<V>, disableSelfReferences?: boolean) => Promise<ResponseBody[]>`
+ **Parameters**:
  - `node`: Target node.
  - `disableSelfReferences`: Whether to disable self-references (optional).
+ **Return Value**: Array of node data.

#### **generatorKey**

+ **Function Description**: Generate a unique node key.
+ **Type**: `(metadataKey: string, data: ActiveRecord) => string`
+ **Parameters**:
  - `metadataKey`: Metadata key.
  - `data`: Node data.
+ **Return Value**: Unique key string.

#### **generatorNewTreeNode**

+ **Function Description**: Generate a new tree node.
+ **Type**: `(parent: OioTreeNode<V>, key: string, title: string | undefined, metadata: TreeNodeMetadata | undefined, data: ActiveRecord) => OioTreeNode<V>`
+ **Parameters**:
  - `parent`: Parent node.
  - `key`: Unique node key.
  - `title`: Node title.
  - `metadata`: Node metadata.
  - `data`: Node data.
+ **Return Value**: Newly generated tree node.

#### **getFormInstance**

+ **Function Description**: Get the form instance (not implemented in the current class, inherited from the parent class).
+ **Type**: `() => OioFormInstance | undefined`
+ **Return Value**: Form instance or `undefined`.

#### **getTreeMetadataList**

+ **Function Description**: Get the tree structure metadata list.
+ **Type**: `() => TreeNodeMetadata[]`
+ **Return Value**: Array of tree structure metadata.

#### **isLeafPredict**

+ **Function Description**: Predict whether the node is a leaf node.
+ **Type**: `(node: TreeNodeMetadata | undefined) => boolean`
+ **Parameters**:
  - `node`: Node metadata (optional).
+ **Return Value**: Whether it is a leaf node.

#### **loadData**

+ **Function Description**: Load child nodes of the specified node (lazy loading when expanded).
+ **Type**: `(node: OioTreeNode<V>) => Promise<ResponseBody[]>`
+ **Parameters**:
  - `node`: Target node.
+ **Return Value**: Array of child node data.

#### **loadMoreData**

+ **Function Description**: Load more child nodes of the specified node (pagination loading).
+ **Type**: `(node: OioTreeNode<V>) => Promise<ResponseBody[]>`
+ **Parameters**:
  - `node`: Target node.
+ **Return Value**: Array of more child node data.

#### **mountedProcess**

+ **Function Description**: Post-mounting processing logic (abstract method, needs to be implemented by subclasses).
+ **Type**: `() => ReturnPromise<void>`

#### **onChecked**

+ **Function Description**: Callback for changes in node check status.
+ **Type**: `(node: OioTreeNode<V>, checked: boolean) => ReturnPromise<void>`
+ **Parameters**:
  - `node`: Target node.
  - `checked`: Whether checked.

#### **onNodeChecked**

+ **Function Description**: Specific logic when a node is checked (can be overridden).
+ **Type**: `(node: OioTreeNode<V>) => ReturnPromise<void>`
+ **Parameters**:
  - `node`: Target node.

#### **onNodeSelected**

+ **Function Description**: Specific logic when a node is selected (can be overridden).
+ **Type**: `(node: OioTreeNode<V>) => ReturnPromise<void>`
+ **Parameters**:
  - `node`: Target node.

#### **onNodeUnchecked**

+ **Function Description**: Specific logic when a node is unchecked (can be overridden).
+ **Type**: `(node: OioTreeNode<V>) => ReturnPromise<void>`
+ **Parameters**:
  - `node`: Target node.

#### **onNodeUnselected**

+ **Function Description**: Specific logic when a node is unselected (can be overridden).
+ **Type**: `(node: OioTreeNode<V>) => ReturnPromise<void>`
+ **Parameters**:
  - `node`: Target node.

#### **onSelected**

+ **Function Description**: Callback for changes in node selection status.
+ **Type**: `(node: OioTreeNode<V>, selected: boolean) => ReturnPromise<void>`
+ **Parameters**:
  - `node`: Target node.
  - `selected`: Whether selected.

#### **refreshProcess**

+ **Function Description**: Refresh processing logic (abstract method, needs to be implemented by subclasses).
+ **Type**: `() => ReturnPromise<void>`

#### **convertTreeByTreeSearchResponseBody**

+ **Function Description**: Convert the tree structure based on the search response body.
+ **Type**: `(list: TreeNodeResponseBody[]) => OioTreeNode<V>[]`
+ **Parameters**:
  - `list`: Array of search response bodies.
+ **Return Value**: Converted tree node array.

#### **computeNodeTitle**

+ **Function Description**: Calculate the node title.
+ **Type**: `(val: V) => string`
+ **Parameters**:
  - `val`: Node value object.
+ **Return Value**: Node title string.

#### **loadNode**

+ **Function Description**: Load node data (supporting asynchronous operations and idempotency processing).
+ **Type**: `async <R>(node: OioTreeNode<V>, fn: (...args) => R, ...args: any[]) => R`
+ **Parameters**:
  - `node`: Target node.
  - `fn`: Asynchronous loading function.
  - `args`: Loading function parameters (optional).
+ **Return Value**: Return result of the loading function.

#### **onSelectedForSearch**

+ **Function Description**: Node selection processing in search scenarios.
+ **Type**: `(node: OioTreeNode<V>) => Promise<boolean>`
+ **Parameters**:
  - `node`: Selected tree node.
+ **Return Value**: Whether the processing is successful.

#### **onSelectedForQuery**

+ **Function Description**: Node selection processing in query scenarios.
+ **Type**: `(node: OioTreeNode<CardCascaderItemData>) => Promise<boolean>`
+ **Parameters**:
  - `node`: Selected tree node.
+ **Return Value**: Whether the processing is successful.

#### **onUnselected**

+ **Function Description**: Processing logic when the selection status is removed.
+ **Type**: `() => Promise<void>`

#### **setRuntimeFilter**

+ **Function Description**: Set runtime filter conditions.
+ **Type**: `(filter: string | Condition | undefined) => void`
+ **Parameters**:
  - `filter`: Filter conditions (string, `Condition` object, or `undefined`).

### 5. AbstractTreeElementWidget

**Inheritance**: AbstractTreeWidget<`V`>

**Attributes**:

+ autoExpandParent: Whether to automatically expand parent nodes. (`boolean`)
+ checkedKeys: List of checked node keys. (`string[] | undefined`)
+ checkAll: Whether to select all. (`boolean`)
+ checkAllLabel: All-selection button label. (`string | undefined`)
+ checkable: Whether checkable. (`boolean`)
+ expandedKeys: List of expanded node keys. (`string[] | undefined`)
+ expandLevel: Expansion level. (`string | undefined`)
+ loadedKeys: List of loaded node keys. (`string[] | undefined`)
+ rootNode: Root node. (`OioTreeNode<V> | undefined`)
+ searchPlaceHolder: Search box placeholder text. (`string | undefined`)
+ searchRemote: Whether remote search. (`boolean`)
+ searchRootNode: Search result root node. (`OioTreeNode<V> | undefined`)
+ searchValue: Search value. (`string | undefined`)
+ selectedKeys: List of selected node keys. (`string[] | undefined`)
+ showContent: Whether to show content. (`boolean`)
+ showIcon: Whether to show icons. (`boolean`)
  
### 5. AbstractTreeElementWidget  
**Inheritance**: AbstractTreeWidget<`V`>  

**Attributes**:  
- autoExpandParent: Whether to automatically expand parent nodes. (`boolean`)  
- checkedKeys: List of checked node keys. (`string[] | undefined`)  
- checkAll: Whether to select all. (`boolean`)  
- checkAllLabel: Label for the select all button. (`string | undefined`)  
- checkable: Whether checkboxes are enabled. (`boolean`)  
- expandedKeys: List of expanded node keys. (`string[] | undefined`)  
- expandLevel: Expansion level. (`string | undefined`)  
- loadedKeys: List of loaded node keys. (`string[] | undefined`)  
- rootNode: Root node. (`OioTreeNode<V> | undefined`)  
- searchPlaceHolder: Placeholder text for the search box. (`string | undefined`)  
- searchRemote: Whether to enable remote search. (`boolean`)  
- searchRootNode: Root node of search results. (`OioTreeNode<V> | undefined`)  
- searchValue: Search keyword. (`string | undefined`)  
- selectedKeys: List of selected node keys. (`string[] | undefined`)  
- showContent: Whether to display content. (`boolean`)  
- showIcon: Whether to display icons. (`boolean`)  

**Methods**:  
#### **fetchAll**  
- **Function Description**: Fetch data for all nodes.  
- **Type**: `() => Promise<TreeNodeResponseBody[]>`  
- **Return Value**: Array of node response bodies.  

#### **fetchExpandEndLevel**  
- **Function Description**: Fetch node data expanded to a specified level.  
- **Type**: `(metadataList: TreeNodeMetadata[], options?: { expressionParameters?: ExpressionRunParam }) => Promise<TreeNodeResponseBody[]>`  
- **Parameters**:  
  - `metadataList`: List of metadata.  
  - `options`: Options (optional).  
- **Return Value**: Array of node response bodies.  

#### **fixExpandLevelNodes**  
- **Function Description**: Fix node data for the expansion level.  
- **Type**: `(nodes: OioTreeNode<V>[], expandedKeys: string[]) => void`  
- **Parameters**:  
  - `nodes`: Array of nodes.  
  - `expandedKeys`: List of expanded node keys.  

#### **generatorExpressionParameters**  
- **Function Description**: Generate expression runtime parameters.  
- **Type**: `() => ExpressionRunParam`  
- **Return Value**: Expression runtime parameters object.  

#### **generatorRootNode**  
- **Function Description**: Generate a root node.  
- **Type**: `(metadata: TreeNodeMetadata) => OioTreeNode<V>`  
- **Parameters**:  
  - `metadata`: Metadata.  
- **Return Value**: Root node.  

#### **loadAllData**  
- **Function Description**: Load data for all nodes.  
- **Type**: `() => Promise<void>`  

#### **loadExpandLevel**  
- **Function Description**: Load data for a specified expansion level.  
- **Type**: `(node: OioTreeNode<V>, metadataList: TreeNodeMetadata[]) => Promise<void>`  
- **Parameters**:  
  - `node`: Target node.  
  - `metadataList`: List of metadata.  

#### **loadExpandLevelData**  
- **Function Description**: Load data for a specified expansion level and return processed results.  
- **Type**: `(node: OioTreeNode<V>, metadataList: TreeNodeMetadata[]) => Promise<{ nodes: OioTreeNode<V>[]; expandedKeys: string[] }>`  
- **Parameters**:  
  - `node`: Target node.  
  - `metadataList`: List of metadata.  
- **Return Value**: Object containing node array and expanded key list.  

#### **loadExpandLevelDataAfterProcess**  
- **Function Description**: Process nodes after loading expansion level data.  
- **Type**: `(node: OioTreeNode<V>, nodes: OioTreeNode<V>[], expandedKeys: string[]) => { nodes: OioTreeNode<V>[]; expandedKeys: string[] }`  
- **Parameters**:  
  - `node`: Target node.  
  - `nodes`: Array of nodes.  
  - `expandedKeys`: List of expanded node keys.  
- **Return Value**: Object containing processed node array and expanded key list.  

#### **mountedProcess**  
- **Function Description**: Post-mounting processing.  
- **Type**: `() => ReturnPromise<void>`  

#### **onCheckedAll**  
- **Function Description**: Callback for select all / deselect all.  
- **Type**: `(checkedAll: boolean) => ReturnPromise<void>`  
- **Parameters**:  
  - `checkedAll`: Whether to select all.  

#### **onNodeCheckedAll**  
- **Function Description**: Processing when all nodes are checked.  
- **Type**: `() => ReturnPromise<void>`  

#### **onNodeUncheckedAll**  
- **Function Description**: Processing when all nodes are unchecked.  
- **Type**: `() => ReturnPromise<void>`  

#### **onSearch**  
- **Function Description**: Search callback.  
- **Type**: `(keywords: string) => Promise<void>`  
- **Parameters**:  
  - `keywords`: Search keyword.  

#### **onUpdateCheckedKeys**  
- **Function Description**: Update the list of checked node keys.  
- **Type**: `(val: string[]) => void`  
- **Parameters**:  
  - `val`: New list of checked node keys.  

#### **onUpdateExpandedKeys**  
- **Function Description**: Update the list of expanded node keys.  
- **Type**: `(val: string[]) => void`  
- **Parameters**:  
  - `val`: New list of expanded node keys.  

#### **onUpdateLoadedKeys**  
- **Function Description**: Update the list of loaded node keys.  
- **Type**: `(val: string[]) => void`  
- **Parameters**:  
  - `val`: New list of loaded node keys.  

#### **onUpdateSearchValue**  
- **Function Description**: Update the search value.  
- **Type**: `(val: string) => void`  
- **Parameters**:  
  - `val`: New search value.  

#### **onUpdateSelectedKeys**  
- **Function Description**: Update the list of selected node keys.  
- **Type**: `(val: string[]) => void`  
- **Parameters**:  
  - `val`: New list of selected node keys.  

#### **refreshProcess**  
- **Function Description**: Refresh processing.  
- **Type**: `() => ReturnPromise<void>`  

#### **refreshProcessAfterProperties**  
- **Function Description**: Property setup after refresh processing.  
- **Type**: `() => void`  


### 6. AbstractCardCascaderElementWidget  
**Inheritance**: AbstractTreeWidget<`V`>  

**Attributes**:  
- showContent: Whether to display content. (`boolean`)  
- rootNodes: Array of root nodes. (`OioTreeNode<V>[] | undefined`)  

**Methods**:  
#### **fetchNodeData**  
- **Function Description**: Fetch node data and update root nodes.  
- **Type**: `(node: OioTreeNode<V>, metadata: TreeNodeMetadata) => Promise<void>`  
- **Parameters**:  
  - `node`: Target node.  
  - `metadata`: Metadata.  

#### **isLeafPredict**  
- **Function Description**: Predict whether a node is a leaf node.  
- **Type**: `(node: TreeNodeMetadata | undefined, useSelfReferences?: boolean) => boolean`  
- **Parameters**:  
  - `node`: Node metadata.  
  - `useSelfReferences`: Whether to use self-references (optional).  
- **Return Value**: Whether it is a leaf node.  

#### **mountedProcess**  
- **Function Description**: Post-mounting processing.  
- **Type**: `() => ReturnPromise<void>`  

#### **onSearch**  
- **Function Description**: Search callback.  
- **Type**: `(keywords: string, rootNode?: OioTreeNode<V>) => Promise<void>`  
- **Parameters**:  
  - `keywords`: Search keyword.  
  - `rootNode`: Root node (optional).  

#### **refreshNodeFetchData**  
- **Function Description**: Refresh node data.  
- **Type**: `(node: OioTreeNode<V>) => Promise<{ node: OioTreeNode<V>; isChange: { total: boolean; totalPageSize: boolean }; results: ResponseBody[] }>`  
- **Parameters**:  
  - `node`: Target node.  
- **Return Value**: Object containing node, change status, and results.  

#### **refreshNodes**  
- **Function Description**: Refresh all nodes.  
- **Type**: `() => Promise<void>`  

#### **refreshProcess**  
- **Function Description**: Refresh processing.  
- **Type**: `() => ReturnPromise<void>`  

#### **resetRootNode**  
- **Function Description**: Reset root nodes.  
- **Type**: `() => Promise<void>`  


## (III) View Components  

### 1. TableWidget  
**Type Declaration**:  
``` typescript  
@SPI.ClassFactory(  
  BaseElementWidget.Token({  
    viewType: ViewType.Table,  
    widget: ['table', TABLE_WIDGET]  
  })  
)  
export class TableWidget<Props extends TableWidgetProps = TableWidgetProps> extends BaseTableWidget<Props>  
```

**Attributes**:  
- activeCount: Number of active items.  
- allowChecked: Whether checking is allowed.  
- autoLineHeight: Whether to enable auto row height.  
- checkbox: Whether to display checkboxes.  
- cellMinWidth: Minimum cell width.  
- cellWidth: Cell width.  
- enableSequence: Whether to enable sequence columns.  
- expandAccordion: Whether to enable accordion expansion.  
- expandAll: Whether to expand all rows.  
- expandOperationField: Expansion operation field.  
- expandRowIndexes: Array of expanded row indexes.  
- existingExpandElement: Whether expanded row components exist.  
- footerMethod: Footer content generation method.  
- lazyExistExpandRow: Whether to delay expanded row existence.  
- lineHeight: Row height.  
- mergeCells: Cell merging configuration.  
- minLineHeight: Minimum row height.  
- operatorColumnButtonType: Operation column button type.  
- operatorColumnDirection: Operation column direction.  
- operatorColumnWidth: Operation column width.  
- remoteStatisticsRow: Remote statistics row data.  
- rowClickActionDslDefinition: Row click action configuration.  
- rowClickMode: Row click mode.  
- rowDblClickActionDslDefinition: Row double-click action configuration.  
- scrollX: Horizontal scroll configuration.  
- scrollY: Vertical scroll configuration.  
- showFooter: Whether to display the footer.  
- skipStatisticsText: Skip statistics text.  
- statisticsFun: Statistics function name.  
- statisticsLabel: Statistics label.  
- treeConfig: Tree structure configuration.  
- usingSimpleUserPrefer: Whether to use simple user preferences.  

**Methods**:  
#### **checkMethod**  
- **Function Description**: Validate if a row can be checked.  
- **Type**: `({ row }: { row: ActiveRecord }) => boolean`  
- **Parameters**:  
  - `row`: Row data.  
- **Return Value**: Whether checking is allowed.  

#### **clickActionWidget**  
- **Function Description**: Trigger row click action components.  
- **Type**: `(activeRecords: ActiveRecords, actionName: string) => Promise<void>`  
- **Parameters**:  
  - `activeRecords`: Active records.  
  - `actionName`: Action name.  

#### **fetchData**  
- **Function Description**: Fetch table data (supports tree structure).  
- **Type**: `(condition?: Condition) => Promise<ActiveRecord[]>`  
- **Parameters**:  
  - `condition`: Query conditions (optional).  
- **Return Value**: Data array.  

#### **getEnabledTreeConfig**  
- **Function Description**: Get whether tree structure configuration is enabled.  
- **Type**: `() => boolean | undefined`  
- **Return Value**: Whether tree structure configuration is enabled.  

#### **initTreeConfig**  
- **Function Description**: Initialize tree structure configuration.  
- **Type**: `() => void`  

#### **loadTreeNodes**  
- **Function Description**: Load tree structure child nodes.  
- **Type**: `(condition?: Condition, currentRow?: ActiveRecord) => Promise<Entity[]>`  
- **Parameters**:  
  - `condition`: Query conditions (optional).  
  - `currentRow`: Current row data (optional).  
- **Return Value**: Array of child node data.  

#### **mountedProcess**  
- **Function Description**: Post-mounting processing.  
- **Type**: `() => ReturnPromise<void>`  

#### **onCurrentChange**  
- **Function Description**: Handle current row changes.  
- **Type**: `(e: any) => void`  
- **Parameters**:  
  - `e`: Event object.  

#### **onPaginationChange**  
- **Function Description**: Pagination change callback.  
- **Type**: `(current: number, pageSize: number) => void`  
- **Parameters**:  
  - `current`: Current page.  
  - `pageSize`: Items per page.  

#### **onResizableChange**  
- **Function Description**: Column width resize callback.  
- **Type**: `({ column }: { column: { field: string; resizeWidth: number } }) => Promise<void>`  
- **Parameters**:  
  - `column`: Resized column information.  

#### **onRowClick**  
- **Function Description**: Row click callback.  
- **Type**: `({ column, row }: { column: VxeTableDefines.ColumnInfo; row: ActiveRecord }) => Promise<void>`  
- **Parameters**:  
  - `column`: Clicked column.  
  - `row`: Clicked row data.  

#### **onRowDblClick**  
- **Function Description**: Row double-click callback.  
- **Type**: `({ column, row }: { column: VxeTableDefines.ColumnInfo; row: ActiveRecord }) => Promise<void>`  
- **Parameters**:  
  - `column`: Clicked column.  
  - `row`: Clicked row data.  

#### **onSortChange**  
- **Function Description**: Sort change callback.  
- **Type**: `(sortList: ISort[]) => void`  
- **Parameters**:  
  - `sortList`: Array of sort rules.  

#### **onToggleRowExpand**  
- **Function Description**: Row expand status toggle callback.  
- **Type**: `({ expanded, rowIndex }: { expanded: boolean; rowIndex: number }) => void`  
- **Parameters**:  
  - `expanded`: Whether expanded.  
  - `rowIndex`: Row index.  

#### **refreshProcess**  
- **Function Description**: Refresh table data and status.  
- **Type**: `(condition?: Condition) => Promise<void>`  
- **Parameters**:  
  - `condition`: Query conditions (optional).  

#### **refreshStatistics**  
- **Function Description**: Refresh statistics information.  
- **Type**: `() => void`  

#### **resetExpandRowAttr**  
- **Function Description**: Reset expanded row attributes.  
- **Type**: `() => void`  

#### **resetExpandRowIndexes**  
- **Function Description**: Reset expanded row indexes.  
- **Type**: `(init?: boolean) => void`  
- **Parameters**:  
  - `init`: Whether to initialize (optional).  

#### **statisticsBySum**  
- **Function Description**: Calculate the sum of statistical values.  
- **Type**: `(statisticalValues: unknown[]) => string`  
- **Parameters**:  
  - `statisticalValues`: Array of statistical values.  
- **Return Value**: Sum as a string.  

#### **remoteStatistics**  
- **Function Description**: Remote statistics data.  
- **Type**: `(columns: VxeTableDefines.ColumnInfo[], fun: string) => Promise<void>`  
- **Parameters**:  
  - `columns`: Array of column information.  
  - `fun`: Statistics function name.  

#### **generatorStatisticsRow**  
- **Function Description**: Generate statistics rows.  
- **Type**: `(columns: VxeTableDefines.ColumnInfo[], data: ActiveRecord[]) => string[]`  
- **Parameters**:  
  - `columns`: Array of column information.  
  - `data`: Data array.  
- **Return Value**: Statistics row data.  

#### **fetchStatisticsResult**  
- **Function Description**: Fetch statistics results.  
- **Type**: `(columns: VxeTableDefines.ColumnInfo[], fun: string, ...args: unknown[]) => Promise<Record<string, unknown> | undefined>`  
- **Parameters**:  
  - `columns`: Array of column information.  
  - `fun`: Statistics function name.  
  - `args`: Additional parameters.  
- **Return Value**: Statistics result.  

#### **treeConfig**  
- **Function Description**: Get tree structure configuration.  
- **Type**: `() => object | undefined`  
- **Return Value**: Tree structure configuration.  


### 2. SearchWidget  
**Type Declaration**:  
``` typescript  
@SPI.ClassFactory(  
  BaseElementWidget.Token({  
    viewType: ViewType.Search,  
    widget: ['search', SEARCH_WIDGET]  
  })  
)  
export class SearchWidget extends BaseSearchWidget  
```

**Attributes**:  
- cateFields: Array of category fields, parsed from DSL configuration, defaulting to a single or double field array. (`string[]`)  
- disabledExpand: Whether to disable expansion, obtained as a boolean from DSL configuration, default `false`. (`boolean`)  
- foldSize: Number of fields displayed when folded, obtained as a number from DSL configuration, default `3`. (`number`)  
- invisibleSearch: Whether to hide the search box, obtained as a boolean from DSL configuration, default `false`. (`boolean`)  
- isExpand: Search box expansion status. (`boolean`)  
- searchPreferOptions: List of search preference options. (`UserSearchPrefer[] | undefined`)  
- selectedPrefer: Current selected search preference. (`UserSearchPrefer | undefined`)  
- showSearchPrefer: Whether to display search preferences, shown in non-inline mode with a view name. (`boolean`)  

**Methods**:  
#### **onCateSearch**  
- **Function Description**: Handle category search, merge search data, and trigger regular search.  
- **Type**: `(searchData: Entity) => void`  
- **Parameters**:  
  - `searchData`: Category search data object.  

#### **onExpand**  
- **Function Description**: Toggle search box expansion status.  
- **Type**: `(expand: boolean) => void`  
- **Parameters**:  
  - `expand`: Expansion status boolean.  

#### **onLoadSearchPreferOptions**  
- **Function Description**: Load search preference options, asynchronously fetching data on first call.  
- **Type**: `() => Promise<void>`  

#### **onCreateSearchPrefer**  
- **Function Description**: Create a new search preference, updating the options list and selecting the new item after saving.  
- **Type**: `(value: UserSearchPrefer) => Promise<boolean>`  
- **Parameters**:  
  - `value`: Search preference object to create.  

#### **onRemoveSearchPrefer**  
- **Function Description**: Delete a specified search preference, removing it from the options list and calling the interface to delete.  
- **Type**: `(value: UserSearchPrefer) => Promise<boolean>`  
- **Parameters**:  
  - `value`: Search preference object to delete.  

#### **onReset**  
- **Function Description**: Reset search conditions, clearing the search string and selected preference, and calling the parent class reset method.  
- **Type**: `() => Promise<void>`  

#### **onSearch**  
- **Function Description**: Execute the search operation, updating routing parameters or triggering data refresh, and providing search conditions to the parent component.  
- **Type**: `() => void`  

#### **onSelectSearchPrefer**  
- **Function Description**: Select a search preference, applying search conditions from the preference and triggering a search.  
- **Type**: `(value: UserSearchPrefer) => void`  
- **Parameters**:  
  - `value`: Selected search preference object.  

#### **onUnselectSearchPrefer**  
- **Function Description**: Deselect the search preference, resetting to the default state and triggering a reset.  
- **Type**: `() => Promise<void>`  

#### **onUpdateSearchPrefer**  
- **Function Description**: Update the search preference name, calling the interface to modify and updating the local list.  
- **Type**: `(value: UserSearchPrefer) => Promise<boolean>`  
- **Parameters**:  
  - `value`: Search preference object containing ID and new name.  


### 3. FormWidget  
**Type Declaration**:  
``` typescript  
@SPI.ClassFactory(  
  BaseElementWidget.Token({  
    viewType: ViewType.Form,  
    widget: ['form', FORM_WIDGET]  
  })  
)  
export class FormWidget extends BaseFormWidget  
```


### 4. DetailWidget  
**Type Declaration**:  
``` typescript  
@SPI.ClassFactory(  
  BaseElementWidget.Token({  
    viewType: ViewType.Detail,  
    widget: ['detail', DETAIL_WIDGET]  
  })  
)  
export class DetailWidget extends BaseFormWidget  
```


### 5. GalleryWidget  
**Type Declaration**:  
``` typescript  
@SPI.ClassFactory(  
  BaseElementWidget.Token({  
    viewType: ViewType.Gallery,  
    widget: 'gallery'  
  })  
)  
export class GalleryWidget extends BaseElementListViewWidget  
```

**Attributes**:  
- cols: Number of columns.  
- gutter: Spacing configuration.  
- itemWidth: Item width.  
- itemMinWidth: Minimum item width.  
- itemMaxWidth: Maximum item width.  

**Methods**:  
#### **childrenInvisibleProcess**  
- **Function Description**: Handle invisible status of child components.  
- **Type**: `() => boolean`  
- **Return Value**: Whether to hide child components.  


### 6. TreeWidget  
**Type Declaration**:  
``` typescript  
@SPI.ClassFactory(  
  BaseElementWidget.Token({  
    viewType: ViewType.Tree,  
    widget: 'tree'  
  })  
)  
export class TreeWidget extends AbstractTreeElementWidget  
```

**Attributes**:  
- showContent: Whether to display content.  

**Methods**:  
#### **onClearSearch**  
- **Function Description**: Callback when clearing search content.  
- **Type**: `() => Promise<void>`  

#### **onNodeSelected**  
- **Function Description**: Callback when a node is selected.  
- **Type**: `(node: OioTreeNode<TreeData>) => Promise<void>`  
- **Parameters**:  
  - `node`: Selected tree node.  

#### **onNodeUnselected**  
- **Function Description**: Callback when a node is unselected.  
- **Type**: `(node: OioTreeNode<TreeData>) => Promise<void>`  
- **Parameters**:  
  - `node`: Unselected tree node.  

#### **onUnselected**  
- **Function Description**: Callback when selection is cleared.  
- **Type**: `() => Promise<void>`  


### 7. CardCascaderWidget  
**Type Declaration**:  
``` typescript  
@SPI.ClassFactory(  
  BaseElementWidget.Token({  
    viewType: ViewType.Tree,  
    widget: ['card-cascader', 'cardCascader', 'CardCascader']  
  })  
)  
export class CardCascaderWidget extends AbstractCardCascaderElementWidget  
```

**Methods**:  
#### **onClearSearch**  
- **Function Description**: Callback when clearing search content.  
- **Type**: `() => Promise<void>`  

#### **onNodeSelected**  
- **Function Description**: Callback when a node is selected.  
- **Type**: `(node: OioTreeNode<CardCascaderItemData>) => Promise<void>`  
- **Parameters**:  
  - `node`: Selected tree node.  

#### **onNodeUnselected**  
- **Function Description**: Callback when a node is unselected.  
- **Type**: `(node: OioTreeNode<CardCascaderItemData>) => Promise<void>`  
- **Parameters**:  
  - `node`: Unselected tree node.  

#### **onUnselected**  
- **Function Description**: Callback when selection is cleared.  
- **Type**: `() => Promise<void>`  

#### **onClickLoadData**  
- **Function Description**: Load data when a node is clicked.  
- **Type**: `(node: OioTreeNode<CardCascaderItemData>) => Promise<void>`  
- **Parameters**:  
  - `node`: Clicked tree node.  


## (IV) Other Components  

### 1. ActionBarWidget  
**Type Declaration**:  
``` typescript  
@SPI.ClassFactory(  
  BaseElementWidget.Token({  
    widget: ['actionBar', 'action-bar', 'ActionBar']  
  })  
)  
export class ActionBarWidget<Props extends ActionBarWidgetProps = ActionBarWidgetProps> extends BaseActionGroupWidget<Props>  
```

**Attributes**:  
- activeCount: Number of current active items, obtained from DSL configuration; if not set, attempts to get from the view template, supporting enum values. (`number | undefined`)  
- buttonType: Button type, obtained from DSL configuration and converted to lowercase. (`string | undefined`)  
- checkboxAllCallChaining: Chaining object for select all checkboxes. (`CallChaining | undefined`)  
- inline: Whether in inline mode, obtained as a boolean from DSL configuration, default `false`. (`boolean | undefined`)  
- isFloat: Whether in float mode, obtained as a boolean from DSL configuration. (`boolean | undefined`)  
- justify: Layout alignment, obtained from DSL configuration and converted to the corresponding value when `popupScene` is empty. (`string | undefined`)  
- moreActionRender: Render function for more actions. (`MoreActionRender | undefined`)  
- moreActionTriggers: Array of more action trigger methods, obtained from DSL configuration, default `['click', 'hover']`. (`OioDropdownTrigger[]`)  
- popupScene: Popup scene. (`string | undefined`)  
- selectMode: Selection mode. (`ListSelectMode | undefined`)  
- selectModeCallChaining: Chaining object for selection mode. (`CallChaining | undefined`)  

**Methods**:  
#### **onCheckboxAll**  
- **Function Description**: Handle click events for select all checkboxes, calling the chaining object to pass the selection status.  
- **Type**: `(selected: boolean) => void`  
- **Parameters**:  
  - `selected`: Selection status of the select all checkbox.  

#### **onSelectModeChange**  
- **Function Description**: Handle changes in selection mode, reloading active records and calling the chaining object to pass the new mode.  
- **Type**: `(mode: ListSelectMode | undefined) => void`  
- **Parameters**:  
  - `mode`: New selection mode.  


### 2. RowActionBarWidget  
**Type Declaration**:  
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

**Attributes**:  
- activeCount: Number of current active items, preferring inline configuration from the parent, then parent regular configuration, and finally inheriting from the base class. (`number | undefined`)  
- buttonType: Button type, preferring operation column configuration from the parent, otherwise inheriting from the base class. (`string | undefined`)  
- parentActiveCount: Number of parent regular active items. (`number | undefined`)  
- parentInlineActiveCount: Number of parent inline active items. (`number | undefined`)  
- operatorColumnDirection: Operation column direction. (`string | undefined`)  
- operatorColumnButtonType: Operation column button type. (`string | undefined`)  
- rowIndex: Row index, a required attribute. (`number`)  


### 3. TreeNodeActionsWidget  
**Type Declaration**:  
``` typescript  
@SPI.ClassFactory(  
  BaseElementWidget.Token({  
    widget: 'TreeNodeActions',  
    inline: true  
  })  
)  
export class TreeNodeActionsWidget<V extends TreeData = TreeData> extends ActionBarWidget<TreeNodeActionsWidgetProps<V>>  
```

**Attributes**:  
- node: Current tree node data. (`TreeNode<V> | undefined`)  


### 4. CardRowActionsWidget  
**Type Declaration**:  
``` typescript  
@SPI.ClassFactory(  
  BaseElementWidget.Token({  
    widget: 'CardRowActions',  
    inline: true  
  })  
)  
export class CardRowActionsWidget extends RowActionBarWidget  
```


### 5. TableUserPreferWidget  
**Type Declaration**:  
``` typescript  
@SPI.ClassFactory(  
  BaseElementWidget.Token({  
    viewType: ViewType.Table,  
    widget: ['userPrefer', 'user-prefer', 'UserPrefer']  
  })  
)  
export class TableUserPreferWidget extends BaseElementWidget  
```

**Attributes**:  
- invisible: Whether the component is invisible, always `true` when user preference data does not exist. (`boolean`)  
- simple: Whether to enable simple mode, obtained as a boolean from DSL configuration. (`boolean | undefined`)  

**Methods**:  
#### **enterCallback**  
- **Function Description**: Save user preferences for table column visibility and order, and reload preference settings.  
- **Type**: `(allFields: DataOption[], invisibleFields: DataOption[], visibleFields: DataOption[]) => Promise<boolean>`  
- **Parameters**:  
  - `allFields`: Array of all field options.  
  - `invisibleFields`: Array of invisible field options.  
  - `visibleFields`: Array of visible field options.  

#### **resetCallback**  
- **Function Description**: Reset all user preferences for table columns to default values.  
- **Type**: `() => Promise<boolean>`  


### 6. TableSearchTreeWidget  
**Type Declaration**:  
``` typescript  
@SPI.ClassFactory(  
  BaseElementWidget.Token({  
    viewType: [ViewType.Table, ViewType.Form],  
    widget: 'tree'  
  })  
)  
export class TableSearchTreeWidget extends AbstractTreeElementWidget  
```

**Attributes**:  
- dropMode: Discard mode when exceeding the maximum check count, default `DropMode.DropEarliest`. (`string`)  
- maxCheckCount: Maximum check count, obtained as a number from DSL configuration, default `-1` (unlimited). (`number`)  

**Methods**:  
#### **onChecked**  
- **Function Description**: Handle node check events, updating check status and triggering search condition processing.  
- **Type**: `(node: OioTreeNode<TreeData>, checked: boolean) => ReturnPromise<void>`  
- **Parameters**:  
  - `node`: Checked tree node.  
  - `checked`: Check status (`true` for checked, `false` for unchecked).  

#### **onCheckedAll**  
- **Function Description**: Handle select all / deselect all events, updating check status for all nodes and triggering search condition processing.  
- **Type**: `(checkdAll: boolean) => ReturnPromise<void>`  
- **Parameters**:  
  - `checkdAll`: Select all status (`true` for select all, `false` for deselect all).  

#### **onSearch**  
- **Function Description**: Execute search operation, updating check status and triggering parent refresh.  
- **Type**: `(keywords: string) => Promise<void>`  
- **Parameters**:  
  - `keywords`: Search keyword.  

#### **updateCheckAllStatus**  
- **Function Description**: Update the select all status, automatically setting the select all key status based on checked nodes.  
- **Type**: `(allKeys?: string[]) => void`  
- **Parameters**:  
  - `allKeys`: Optional array of all node keys, defaulting to child node keys of the search root node.  


### 7. TableSearchCardCascaderWidget  
**Type Declaration**:  
``` typescript  
@SPI.ClassFactory(  
  BaseElementWidget.Token({  
    viewType: ViewType.Table,  
    widget: ['card-cascader', 'cardCascader', 'CardCascader']  
  })  
)  
export class TableSearchCardCascaderWidget extends AbstractCardCascaderElementWidget  
```

**Methods**:  
#### **onClickLoadData**  
- **Function Description**: Handle node click events, loading node data and updating display content.  
- **Type**: `(node: OioTreeNode<CardCascaderItemData>) => Promise<void>`  
- **Parameters**:  
  - `node`: Clicked tree node.  

#### **onClearSearch**  
- **Function Description**: Clear search status, resetting root nodes and canceling all selections.  
- **Type**: `() => Promise<void>`  

#### **onNodeSelected**  
- **Function Description**: Handle node selection events, loading data on click.  
- **Type**: `(node: OioTreeNode<CardCascaderItemData>) => Promise<void>`  
- **Parameters**:  
  - `node`: Selected tree node.  

#### **onNodeUnselected**  
- **Function Description**: Handle node deselection events, canceling all selections.  
- **Type**: `(node: OioTreeNode<CardCascaderItemData>) => Promise<void>`  
- **Parameters**:  
  - `node`: Deselected tree node.  

#### **refreshProcess**  
- **Function Description**: Refresh the component, resetting root nodes and canceling all selections.  
- **Type**: `() => Promise<void>`  


### 8. CardWidget  
**Type Declaration**:  
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

**Attributes**:  
- allowClick: Whether clicking the card is allowed, determined by DSL configuration and click action definitions. (`boolean`)  
- cols: Number of card columns, default `DEFAULT_COLS`. (`number`)  
- formData: Current card form data, taking the first active record, default empty object. (`ActiveRecord`)  
- height: Card height, obtained as a number from DSL configuration. (`number | undefined`)  
- isCard: Flag indicating it is a card component, default `true`. (`boolean`)  
- isSelected: Whether the current card is selected, determined by active record matching. (`boolean`)  
- inlineActiveCount: Number of active items in inline mode, supporting numbers or enum values. (`number | undefined`)  
- maxHeight: Maximum card height, obtained as a number from DSL configuration. (`number | undefined`)  
- maxWidth: Maximum card width, obtained as a number from DSL configuration. (`number | undefined`)  
- minHeight: Minimum card height, default `338`. (`number`)  
- minWidth: Minimum card width, obtained as a number from DSL configuration. (`number | undefined`)  
- rowIndex: Row index, from slot context. (`number | undefined`)  
- selectMode: Selection mode. (`ListSelectMode | undefined`)  
- width: Card width, obtained as a number from DSL configuration. (`number | undefined`)  

**Methods**:  
#### **onClick**  
- **Function Description**: Handle card click events, triggering configured click action components.  
- **Type**: `() => Promise<void>`  

#### **onCheckboxChange**  
- **Function Description**: Handle checkbox status changes, updating parent active records.  
- **Type**: `(val: boolean) => void`  
- **Parameters**:  
  - `val`: Checkbox selection status (`true` for checked, `false` for unchecked).