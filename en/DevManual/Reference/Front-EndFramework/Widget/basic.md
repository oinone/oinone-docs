---
title: Basic
index: true
category:
  - R&D Manual
  - Reference
  - Frontend API
  - Widget
order: 2

---
In Oinone Kunlun, we derive a series of `Widget` components based on `VueWidget`. This chapter provides a detailed introduction to some "abstract" components.

# Ⅰ、Core Component Map

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/1748415952590-e994a698-9272-4525-93c4-113656cbf141.jpeg)

# Ⅱ、SPI Token Component Map

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/1748416256027-68d1afbb-369c-4161-924b-196a63e42ca1.jpeg)

# Ⅲ、Metadata Component Map

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/1748416542172-ae3b57d2-f594-423a-b29c-dde5224b039d.jpeg)

- MetadataViewWidget: Metadata view component containing view context data. Used to create `RuntimeContext` through views, fields, or actions.
- DefaultMetadataMainViewWidget: Metadata main view component. Creates the first `MetadataRuntimeContext` for the entire page by listening to route changes and renders the `Mask`.
- DefaultMainViewWidget: Main content distribution area rendering component, used to create `RootRuntimeContext` and render `Layout` and `DSL`.
- MultiTabsContainerWidget and MultiTabContainerWidget: Multi-tab container component and tab component.

# Ⅳ、Reference List

## （Ⅰ）Core Components

### 1、VueWidget

**Inheritance**: Widget

**Properties**:

- opt: Component proxy instance for accessing Vue instance properties. (`VueWidget | undefined`)

**Methods**:

#### createWidget

- **Function Description**: Creates a child component under the current component node.
- **Type**: `<T extends Widget>(constructor: WidgetConstructor<T['config'], T>, slotName?: string, initConfig?: T['config'], specifiedIndex?: number, resolveNewCode?: boolean) => T`
- **Parameters**:
  - `constructor`: Child component constructor.
  - `slotName`: Slot name.
  - `initConfig`: Child component initialization configuration.
  - `specifiedIndex`: Specified position of the child component in the parent node.
  - `resolveNewCode`: Whether to update the node identifier.
- **Return Value**: Child component instance.

#### dispose

- **Function Description**: Destroys the component instance and cleans up resources.
- **Type**: `(force?: boolean) => void`
- **Parameters**:
  - `force`: Whether to force destruction (optional, default `false`).

#### forceUpdate

- **Function Description**: Forces an update of the component.
- **Type**: `() => void`

#### getChildrenInstance

- **Function Description**: Obtains an array of child component instances (inherited from `Widget`).
- **Type**: `() => Widget[]`
- **Return Value**: Array of child component instances.

#### getOperator

- **Function Description**: Obtains the component's reactive operation object.
- **Type**: `<T extends VueWidget>() => T`
- **Return Value**: Reactive instance of the component.

#### setComponent

- **Function Description**: Sets the Vue component or HTML tag rendered by the current component.
- **Type**: `(component: WidgetComponent) => void`
- **Parameters**:
  - `component`: Target component.

#### setMixinComponent

- **Function Description**: Sets the mixed-in Vue component.
- **Type**: `(component: Component | undefined) => void`
- **Parameters**:
  - `component`: Mixed-in component instance.

#### translate

- **Function Description**: Internationalization translation (reactive method).
- **Type**: `(key: string, values?: { [key: string]: any }) => string`
- **Parameters**:
  - `key`: Translation key.
  - `values`: Replacement parameters (optional).
- **Return Value**: Translated string.

#### translateByI18n

- **Function Description**: Performs internationalization translation via i18n (reactive method).
- **Type**: `(key: string) => string`
- **Parameters**:
  - `key`: Translation key.
- **Return Value**: Translated string.

### 2、DslRenderWidget

**Inheritance**: VueWidget

**Properties**:

- internal: Identifies whether the component is an internal component, affecting slot rendering logic. (`boolean`)
- slotName: Slot name used by the component in the parent component. (`string | undefined`)
- template: DSL template definition currently being rendered. (`DslDefinition | undefined`)

**Methods**:

#### getDsl

- **Function Description**: Obtains the DSL definition of the current component, returning the default value if not set.
- **Type**: `() => DslDefinition`
- **Return Value**: DSL definition object.

#### getSlotName

- **Function Description**: Obtains the slot name of the component in the parent component.
- **Type**: `() => string | undefined`
- **Return Value**: Slot name.

#### initialize

- **Function Description**: Initializes component properties and configures DSL-related parameters.
- **Type**: `(props: Props) => this`
- **Parameters**:
  - `props`: Component properties, must conform to the DslRenderWidgetProps interface.
- **Return Value**: The component instance itself (supports chaining).

#### render

- **Function Description**: Renders the component, selecting different rendering strategies based on the `internal` property.
- **Type**: `(ctx?: Record<string, any>, slots?: Slots) => VNode | VNode[]`
- **Parameters**:
  - `ctx`: Rendering context object.
  - `slots`: Vue slot object.
- **Return Value**: Rendered virtual nodes.

### 3、DslDefinitionWidget

**Inheritance**: DslRenderWidget

**Properties**:

- allInvisible: Determines whether the component and its children are all invisible. (`boolean | undefined`)
- automatic: Whether it is an automatic component. (`boolean`)
- currentHandle: Handle of the current component, automatically set during initialization. (`string`)
- inline: Whether it is an inline component. (`boolean | undefined`)
- invisible: Determines whether the component is invisible (considering its own and parent states). (`boolean`)
- invisibleState: Internally maintained invisible state. (`boolean`)
- lastedInvisibleState: Last invisible state, used to detect changes. (`boolean | undefined`)
- metadataHandle: Handle of the metadata view. (`string | undefined`)
- parentInvisible: Invisible state of the parent component. (`boolean | undefined`)
- parentInvisibleProvider: Invisible state provided to child components (current component or parent state). (`boolean`)
- rootHandle: Handle of the root component (generally a view component). (`string | undefined`)

**Methods**:

#### allMounted

- **Function Description**: Called after all child components are mounted, resetting the invisible state.
- **Type**: `() => void`

#### childrenInvisibleProcess

- **Function Description**: Processes the invisible state of child components, determining if all are invisible.
- **Type**: `() => boolean`
- **Return Value**: Whether all child components are invisible.

#### getCurrentHandle

- **Function Description**: Obtains the handle of the current component.
- **Type**: `() => string`
- **Return Value**: Component handle.

#### getMetadataHandle

- **Function Description**: Obtains the handle of the metadata view.
- **Type**: `() => string | undefined`
- **Return Value**: Metadata handle.

#### getMetadataRuntimeContext &&notUse

- **Function Description**: Obtains the runtime context of the metadata.
- **Type**: `() => RuntimeContext`
- **Return Value**: Runtime context object.
- **Exception**: Throws an error if the metadata context is invalid.

#### getRootComputeContext &&notUse

- **Function Description**: Obtains the compute context of the root component.
- **Type**: `() => ComputeContext | undefined`
- **Return Value**: Compute context object or `undefined`.

#### getRootHandle

- **Function Description**: Obtains the handle of the root component.
- **Type**: `() => string | undefined`
- **Return Value**: Root component handle.

#### getRootRuntimeContext &&notUse

- **Function Description**: Obtains the runtime context of the root component.
- **Type**: `() => RuntimeContext`
- **Return Value**: Runtime context object.
- **Exception**: Throws an error if the root context is invalid.

#### getRootViewRuntimeContext &&notUse

- **Function Description**: Obtains the runtime context of the root view and its fields.
- **Type**: `() => { runtimeContext: RuntimeContext; fields: RuntimeModelField[] }`
- **Return Value**: Object containing the runtime context and field array.

#### invisibleProcess

- **Function Description**: Processes the invisible property value, converting it to a boolean type.
- **Type**: `(invisible: boolean | string) => boolean`
- **Parameters**:
  - `invisible`: Invisible property value (boolean or string).
- **Return Value**: Converted boolean value.

#### resetInvisible

- **Function Description**: Resets the invisible state, taking effect when `allInvisible` is `true`.
- **Type**: `() => void`

#### resetParentInvisible

- **Function Description**: Recursively resets the invisible state of parent components.
- **Type**: `() => void`

### 4、PathWidget

**Inheritance**: DslDefinitionWidget

**Properties**:

- currentPath: Current specified path. (`string | undefined`)
- parentPath: Parent path, obtained via injection. (`string | undefined`)
- path: Complete path, dynamically generated based on the parent path, subpath, and subindex. (`string`)
- subIndex: Current subpath index. (`string | number | undefined`)
- subPath: Current subpath. (`string | undefined`)

### 5、ActiveRecordsWidget

**Inheritance**: PathWidget<`Props`>

**Properties**:

- currentActiveRecords: Current data records, passing through parent data if nonexistent. (`ActiveRecord[] | undefined`)
- currentDataSource: Current data source, supporting data operations and caching. (`ActiveRecord[] | null | undefined`)
- currentRootData: Current root data, preferring self-configuration, otherwise passing through parent data. (`ActiveRecord[] | undefined`)
- parentActiveRecords: Parent data records. (`ActiveRecord[] | undefined`)
- parentDataSource: Parent data source. (`ActiveRecord[] | undefined`)
- parentReloadActiveRecords: Parent method to reload data records. (`ReloadActiveRecordsFunction | undefined`)
- parentReloadDataSource: Parent method to reload the data source. (`ReloadActiveRecordsFunction | undefined`)
- parentPushActiveRecords: Parent method to add data records. (`PushActiveRecordsFunction | undefined`)
- parentPushDataSource: Parent method to add to the data source. (`PushActiveRecordsFunction | undefined`)
- parentUpdateActiveRecords: Parent method to update data records. (`UpdateActiveRecordsFunction | undefined`)
- parentUpdateDataSource: Parent method to update the data source. (`UpdateActiveRecordsFunction | undefined`)
- parentDeleteActiveRecords: Parent method to delete data records. (`DeleteActiveRecordsFunction | undefined`)
- parentDeleteDataSource: Parent method to delete the data source. (`DeleteActiveRecordsFunction | undefined`)
- parentFlushActiveRecords: Parent method to flush data records. (`FlushActiveRecordsFunction | undefined`)
- parentFlushDataSource: Parent method to flush the data source. (`FlushActiveRecordsFunction | undefined`)
- parentRootData: Parent root data. (`ActiveRecord[] | undefined`)
- rootData: Root data provided to下级 (current or parent data). (`ActiveRecord[] | undefined`)
- submitCache: Submission cache manager (obtained via metadata context). (`SubmitCacheManager | undefined`)
- dataSource: Data source provided to下级 (current or parent data). (`ActiveRecord[] | undefined`)
- activeRecords: Data records provided to下级 (current or parent data). (`ActiveRecord[] | undefined`)

**Methods**:

#### createDataSourceByEntity

- **Function Description**: Creates a data source from an entity and merges it into the current data source.
- **Type**: `(records: ActiveRecords, predict?: PushActiveRecordsPredict) => void`
- **Parameters**:
  - `records`: Data to create.
  - `predict`: Push judgment function (optional).

#### deleteActiveRecords

- **Function Description**: Deletes data records by index.
- **Type**: `(recordIndexes: number[]) => void`
- **Parameters**:
  - `recordIndexes`: Array of data indices.

#### deleteActiveRecordsByEntity

- **Function Description**: Deletes data records by entity condition.
- **Type**: `(records: ActiveRecords, predict?: DeleteActiveRecordsByEntityPredict) => void`
- **Parameters**:
  - `records`: Data for deletion conditions.
  - `predict`: Deletion judgment function (optional).

#### deleteDataSource

- **Function Description**: Deletes the data source by index.
- **Type**: `(recordIndexes: number[]) => void`
- **Parameters**:
  - `recordIndexes`: Array of data indices.

#### deleteDataSourceByEntity

- **Function Description**: Deletes the data source by entity condition.
- **Type**: `(records: ActiveRecords, predict?: DeleteActiveRecordsByEntityPredict) => void`
- **Parameters**:
  - `records`: Data for deletion conditions.
  - `predict`: Deletion judgment function (optional).

#### flushActiveRecords

- **Function Description**: Flushes data records (clears current data or submits upward).
- **Type**: `() => void`

#### flushDataSource

- **Function Description**: Flushes the data source (submits upward).
- **Type**: `() => void`

#### getCurrentActiveRecords

- **Function Description**: Obtains current data records.
- **Type**: `() => ActiveRecord[] | undefined`
- **Return Value**: Current data record array or `undefined`.

#### getCurrentDataSource

- **Function Description**: Obtains the current data source.
- **Type**: `() => ActiveRecord[] | null | undefined`
- **Return Value**: Current data source array, `null`, or `undefined`.

#### getCurrentRootData

- **Function Description**: Obtains current root data.
- **Type**: `() => ActiveRecord[] | undefined`
- **Return Value**: Current root data array or `undefined`.

#### reloadActiveRecords

- **Function Description**: Reloads data records into the current instance.
- **Type**: `(records?: ActiveRecords) => void`
- **Parameters**:
  - `records`: Data to load (optional).

#### reloadDataSource

- **Function Description**: Reloads the data source into the current instance.
- **Type**: `(records?: ActiveRecords) => void`
- **Parameters**:
  - `records`: Data to load (optional).

#### pushActiveRecords

- **Function Description**: Adds data to the current data records.
- **Type**: `(records: ActiveRecords, predict?: PushActiveRecordsPredict) => void`
- **Parameters**:
  - `records`: Data to add.
  - `predict`: Push judgment function (optional).

#### pushDataSource

- **Function Description**: Adds data to the current data source.
- **Type**: `(records: ActiveRecords, predict?: PushActiveRecordsPredict) => void`
- **Parameters**:
  - `records`: Data to add.
  - `predict`: Push judgment function (optional).

#### updateActiveRecords

- **Function Description**: Updates data records by index.
- **Type**: `(records: UpdateEntity[]) => void`
- **Parameters**:
  - `records`: Array of update entities.

#### updateActiveRecordsByEntity

- **Function Description**: Updates data records by entity condition.
- **Type**: `(records: ActiveRecords, predict?: UpdateActiveRecordsByEntityPredict) => void`
- **Parameters**:
  - `records`: Update data.
  - `predict`: Update judgment function (optional).

#### updateDataSource

- **Function Description**: Updates the data source by index.
- **Type**: `(records: UpdateEntity[]) => void`
- **Parameters**:
  - `records`: Array of update entities.

#### updateDataSourceByEntity

- **Function Description**: Updates the data source by entity condition.
- **Type**: `(records: ActiveRecords, predict?: UpdateActiveRecordsByEntityPredict) => void`
- **Parameters**:
  - `records`: Update data.
  - `predict`: Update judgment function (optional).

### 6、BaseRuntimePropertiesWidget

**Inheritance**: ActiveRecordsWidget

**Properties**:

- invisible: Determines whether the component is invisible; if the current client type is not supported, it is force-hidden. (`boolean`)
- isSupportCurrentClient: Determines whether the current client type is supported. (`boolean`)
- isSupportMobileClient: Determines whether mobile clients are supported. (`boolean`)
- isSupportPCClient: Determines whether PC clients are supported. (`boolean`)
- loading: Loading state indicator, controlled by the load method. (`boolean`)
- model: Runtime model, obtained from the root runtime context. (`RuntimeModel`)
- openerActiveRecords: Active records of the component that opened the current view. (`ActiveRecord[] | undefined`)
- openerDataSource: Data source of the component that opened the current view. (`ActiveRecord[] | undefined`)
- scene: Current scene, obtained from URL parameters or view actions. (`string`)
- supportClientTypes: List of supported client types. (`ViewClientType[]`)
- urlParameters: URL query parameters; inline components return an empty object. (`UrlQueryParameters`)
- view: Runtime view. (`RuntimeView | undefined`)
- viewAction: Runtime view action. (`RuntimeViewAction | undefined`)
- initialValue: Initial view value. (`ActiveRecord[] | undefined`)
- initialContext: Initial view context, preferentially obtained from URL parameters. (`Record<string, unknown> | undefined`)
- usingLoading: Whether to use the loading state, enabled by default. (`boolean`)

**Methods**:

#### getUrlParameters

- **Function Description**: Obtains URL query parameters.
- **Type**: `() => UrlQueryParameters`
- **Return Value**: URL parameter object.

#### load

- **Function Description**: Executes an asynchronous operation and manages the loading state.
- **Type**: `<R>(fn: (...args) => R, ...args) => Promise<R>`
- **Parameters**:
  - `fn`: Function to execute.
  - `args`: Function parameters.
- **Return Value**: Promise of the function execution result.

### 7、BaseDataWidget

**Inheritance**: BaseRuntimePropertiesWidget

**Properties**:

- currentDataPath: Current specified data path. (`string | undefined`)
- dataPath: Complete data path, composed of the parent path, subpath, and index. (`string`)
- itemData: Data interaction identifier, preferentially using the data field in DSL, otherwise using name. (`string`)
- itemName: Data submission identifier, preferentially using the name field in DSL, otherwise using data. (`string`)
- parentDataPath: Parent data path. (`string | undefined`)
- subDataIndex: Current data subpath index. (`string | number | undefined`)
- subDataPath: Current data subpath, defaulting to itemData. (`string | undefined`)

## （Ⅱ）SPI Token Components

### 1、BaseMaskWidget

**Inheritance**: DslRenderWidget

**Properties**:

- automatic: Whether it is an automatic component. (`boolean`)
- classNames: Array of class names for the component, obtained from DSL. (`string[] | undefined`)
- currentHandle: Handle of the current component, automatically set during initialization. (`string`)
- loading: Loading state indicator. (`boolean`)
- style: CSS style of the component, converted from DSL. (`CSSStyle | undefined`)

**Methods**:

#### getCurrentHandle

- **Function Description**: Obtains the handle of the current component.
- **Type**: `() => string`
- **Return Value**: Component handle.

#### getUrlParameters

- **Function Description**: Obtains URL query parameters.
- **Type**: `() => Record<string, unknown>`
- **Return Value**: URL parameter object.

#### load

- **Function Description**: Executes an asynchronous operation and manages the loading state.
- **Type**: `<R>(fn: (...args) => R, ...args) => Promise<R>`
- **Parameters**:
  - `fn`: Function to execute.
  - `args`: Function parameters.
- **Return Value**: Promise of the function execution result.

#### render

- **Function Description**: Renders the component, processing slot data.
- **Type**: `(ctx?: Record<string, unknown>, slots?: Slots) => VNode | VNode[]`
- **Parameters**:
  - `ctx`: Rendering context.
  - `slots`: Slot content.
- **Return Value**: Rendered virtual nodes.

### 2、BaseView

**Inheritance**: BaseRuntimePropertiesWidget

**Properties**:

- parentViewType: Parent view type. (`ViewType | undefined`)
- viewMode: Current view mode (provided to下级). (`ViewMode`)
- viewType: View type. (`ViewType | undefined`)
- validatorCallChaining: Chaining call object during validation (provided to下级). (`CallChaining<boolean> | undefined`)

**Methods**

#### addVisibleArea

- **Function Description**: Adds a visible area.
- **Type**: `() => void`

#### clearVisibleArea

- **Function Description**: Clears the visible area.
- **Type**: `() => void`

#### cloneParentDataSource

- **Function Description**: Clones the parent data source.
- **Type**: `() => void`

#### getViewMode

- **Function Description**: Obtains the current view mode.
- **Type**: `() => ViewMode`

#### setViewMode

- **Function Description**: Sets the current view mode.
- **Type**: `(mode: ViewMode | undefined) => void`
- **Parameters**:
  - `mode`: View mode.

### 3、BaseElementWidget

**Inheritance**: BaseRuntimePropertiesWidget

**Properties**:

- parentViewType: Parent view type. (`ViewType | undefined`)
- viewType: View type. (`ViewType | undefined`)

### 4、BasePackWidget

**Inheritance**: BaseRuntimePropertiesWidget

**Properties**:

- cols: Number of columns, preferentially using self-configuration, otherwise inheriting from the parent or defaulting to 1. (`number`)
- defaultAllInvisible: Whether all child components are invisible by default (initial value is true). (`boolean`)
- formData: Form data, taking the first record of the current active records. (`Record<string, unknown>`)
- help: Help information, obtained from DSL. (`string | undefined`)
- isDialog: Whether it is a dialog scenario (judged based on popupScene). (`boolean`)
- isDrawer: Whether it is a drawer scenario (judged based on popupScene). (`boolean`)
- parentCols: Parent number of columns. (`number | undefined`)
- parentViewType: Parent view type. (`ViewType | undefined`)
- popupScene: Popup layer scenario. (`string | undefined`)
- viewType: Current view type, preferentially using view configuration, otherwise inheriting from the parent. (`ViewType | undefined`)

**Methods**:

#### executeExpression

- **Function Description**: Executes an expression, supporting contexts such as form data and root data.
- **Type**: `<T>(expression: string, errorValue?: T) => T | string | undefined`
- **Parameters**:
  - `expression`: Expression string.
  - `errorValue`: Default value when the expression execution fails (optional).
- **Return Value**: Expression result or default value.

#### executeLabelExpression

- **Function Description**: Processes label expressions, automatically identifying expression strings or keywords.
- **Type**: `(label: string) => string | undefined`
- **Parameters**:
  - `label`: Label content.
- **Return Value**: Processed label string or `undefined`.

#### invisibleProcess

- **Function Description**: Processes the invisible property, supporting expression calculation.
- **Type**: `(invisible: boolean | string) => boolean | undefined`
- **Parameters**:
  - `invisible`: Invisible property value (boolean or string).
- **Return Value**: Processed boolean value or `undefined`.

### 5、BaseActionWidget

**Inheritance**: BaseRuntimePropertiesWidget

**Properties**:

- action: Current runtime action, cannot be undefined; otherwise, an error is thrown. (`Action`)
- isAsync: Whether it is an asynchronous action (fixed to return true). (`boolean`)
- isDialog: Whether it is a dialog scenario (judged based on popupScene). (`boolean`)
- isDrawer: Whether it is a drawer scenario (judged based on popupScene). (`boolean`)
- isInnerPopup: Whether it is an internal popup layer scenario (judged based on popupScene). (`boolean`)
- parentViewMode: Parent view mode. (`ViewMode | undefined`)
- popupScene: Popup layer scenario. (`PopupScene | string | undefined`)
- refreshCallChaining: Chaining call object during refresh. (`CallChaining<boolean> | undefined`)
- submitCallChaining: Chaining call object during submission. (`CallChaining<SubmitValue> | undefined`)
- submitType: Submission type. (`SubmitType | undefined`)
- relationUpdateType: Relation update type. (`RelationUpdateType | undefined`)
- runtimeAction: Internally maintained runtime action instance. (`Action | undefined`)
- viewMode: Current view mode (provided to下级, defaulting to inheriting from the parent). (`ViewMode | undefined`)
- viewType: Current view type. (`ViewType | undefined`)
- validatorCallChaining: Chaining call object during validation. (`CallChaining<boolean> | undefined`)
- $matched: Route matching information (obtained when the component is mounted). (`Matched | undefined`)
- $router: Route instance (obtained when the component is mounted). (`Router | undefined`)

**Methods**:

#### load

- **Function Description**: Executes an asynchronous operation and manages the loading state; if it is an asynchronous action, calls the parent class `load`; otherwise, executes the function directly.
- **Type**: `<R>(fn: (...args) => R, ...args) => Promise<R>`
- **Parameters**:
  - `fn`: Function to execute.
  - `args`: Function parameters.
- **Return Value**: Function execution result.

### 6、BaseFieldWidget

**Inheritance**: BaseFormItemWidget

**Properties**:

- computeTrigger: Compute trigger mode. (`ComputeTrigger[]`)
- field: Runtime field. (`Field`)
- label: Field label. (`string | undefined`)
- readonly: Whether it is read-only. (`boolean`)
- required: Whether it is required. (`boolean`)

**Methods**:

#### blur

- **Function Description**: Triggers the field blur event and notifies related lifecycles.
- **Type**: `() => void`

#### change

- **Function Description**: Updates the field value and notifies the field change lifecycle.
- **Type**: `(val: Value | null | undefined) => void`
- **Parameters**:
  - `val`: New field value. (`Value | null | undefined`)

#### executeCompute

- **Function Description**: Executes compute logic (currently a placeholder, complete logic not implemented).
- **Type**: `(trigger: ComputeTrigger) => void`
- **Parameters**:
  - `trigger`: Compute trigger type. (`ComputeTrigger`)

#### executeValidator

- **Function Description**: Executes validation logic and notifies validation-related lifecycles.
- **Type**: `() => Promise<ValidatorInfo>`
- **Return Value**: Validation result information.

#### focus

- **Function Description**: Triggers the field focus event and notifies related lifecycles.
- **Type**: `() => void`

#### on

- **Function Description**: Listens to field events, supporting single or multiple event listening.
- **Type**: `(event: FieldEventName | { [key in FieldEventName]?: HandlerEvent }, handler?: HandlerEvent) => void`
- **Parameters**:
  - `event`: Event name or event object. (`FieldEventName | { [key in FieldEventName]?: HandlerEvent }`)
  - `handler`: Event handler (optional). (`HandlerEvent`)

#### submit

- **Function Description**: Submits the field value and returns the submission result.
- **Type**: `(submitValue: SubmitValue) => ReturnPromise<Record<string, unknown> | SubmitRelationValue | undefined>`
- **Parameters**:
  - `submitValue`: Submitted value. (`SubmitValue`)
- **Return Value**: Submission result.

#### validator

- **Function Description**: Executes specific validation logic and returns the validation result.
- **Type**: `() => Promise<ValidatorInfo>`
- **Return Value**: Validation result information.

#### validatorSpecific

- **Function Description**: Executes specific validation logic and returns the validation result.
- **Type**: `(needCheckedValue: any) => Promise<ValidatorInfo>`
- **Parameters**:
  - `needCheckedValue`: Value to be validated. (`any`)
- **Return Value**: Promise of validation result information.

### 7、EditorFieldWidget

No content.

### 8、BaseRouterWidget

No content.

## （Ⅲ）Metadata Components

### 1、MetadataViewWidget

**Inheritance**: DslDefinitionWidget

**Properties**:

- inline: Whether it is an inline component. (`boolean`)
- isVirtual: Whether it is a virtual component (controls slot behavior). (`boolean`)
- modelModel: Model name (obtained from the runtime context). (`string | undefined`)
- modelName: Model display name (obtained from the runtime context). (`string | undefined`)
- moduleModule: Module name (obtained from the runtime context). (`string | undefined`)
- moduleName: Module display name (obtained from the runtime context). (`string | undefined`)
- runtimeContext: Runtime context instance. (`RuntimeContext | undefined`)
- viewDsl: View DSL definition (obtained from the runtime context). (`DslDefinition | undefined`)
- viewLayout: View layout DSL definition (obtained from the runtime context). (`DslDefinition | undefined`)
- viewTemplate: View template DSL definition (obtained from the runtime context). (`DslDefinition | undefined`)
- viewType: View type (obtained from the runtime context). (`ViewType | undefined`)
- viewAction: View action instance (injected during initialization). (`RuntimeViewAction | undefined`)

**Methods**:

#### createWidget

- **Function Description**: Creates a child component, automatically injecting the metadata handle and root handle (for non-automatic components).
- **Type**: `<TProps extends WidgetProps, T extends Widget<TProps>>(constructor: WidgetConstructor<TProps, T>, slotName?: string, initConfig?: T['config'], specifiedIndex?: number, resolveNewCode?: boolean) => T`
- **Parameters**:
  - `constructor`: Component constructor.
  - `slotName`: Slot name (optional).
  - `initConfig`: Initialization configuration (optional).
  - `specifiedIndex`: Specified index (optional).
  - `resolveNewCode`: Whether to resolve new code (optional).

#### initContext

- **Function Description**: Initializes the component with a specified runtime context.
- **Type**: `(runtimeContext: RuntimeContext) => RuntimeContext`
- **Parameters**:
  - `runtimeContext`: Runtime context instance.
- **Return Value**: Initialized runtime context.

#### initContextByViewAction

- **Function Description**: Creates and initializes a runtime context through a view action.
- **Type**: `(viewAction?: RuntimeViewAction) => RuntimeContext`
- **Parameters**:
  - `viewAction`: View action instance (optional, defaults to using the current instance's `viewAction`).
- **Return Value**: Runtime context instance.
- **Exception**: Throws an error if the view action or runtime context is invalid.

#### initContextByView

- **Function Description**: Creates and initializes a runtime context through a view.
- **Type**: `(view: RuntimeView) => void`
- **Parameters**:
  - `view`: View instance.
- **Return Value**: Runtime context instance.
- **Exception**: Throws an error if the view is invalid.

#### initContextByViewForField

- **Function Description**: Creates and initializes a runtime context through a view and field (for subviews).
- **Type**: `(view: RuntimeView, field: RuntimeModelField) => void`
- **Parameters**:
  - `view`: View instance.
  - `field`: Model field instance.
- **Return Value**: Runtime context instance.
- **Exception**: Throws an error if the view or field is invalid.

### 2、DefaultMetadataMainViewWidget

**Inheritance**: MetadataViewWidget

**Properties**:

- currentRuntimeViewAction: Current runtime view action instance. (`RuntimeViewAction | undefined`)
- loading: Global loading state indicator. (`boolean`)
- mainViewLoading: Main view loading state (provided to下级 components). (`boolean`)
- maskTemplate: Mask template DSL definition. (`DslDefinition | undefined`)
- multiTabsContainerWidget: Multi-tab container component instance. (`MultiTabsContainerWidget | undefined`)
- multiTabsTeleportWidget: Multi-tab Teleport component instance. (`TeleportWidget | undefined`)
- pairwiseRoutePage: Comparison of page parameters before and after route changes. (`{ oldPage: ViewActionQueryParameter | undefined; newPage: ViewActionQueryParameter | undefined }`)
- reloadMainViewCallChaining: Main view reload chaining call object (provided to下级). (`CallChaining<void>`)
- reloadMaskCallChaining: Mask reload chaining call object (provided to下级). (`CallChaining<void>`)
- translateToolBox: Internationalization toolbar virtual node. (`VNode | undefined`)

**Methods**:

#### createMultiTabsContainerWidget

- **Function Description**: Creates a multi-tab container and Teleport component.
- **Type**: `() => void`

#### fetchRuntimeViewAction

- **Function Description**: Obtains the runtime view action (supports permission validation).
- **Type**: `(model: string, action: string | undefined, path?: string) => Promise<RuntimeViewAction>`
- **Parameters**:
  - `model`: Model name.
  - `action`: Action name.
  - `path`: Route path (optional).
- **Return Value**: Promise of the runtime view action instance.

#### initRuntimeContext

- **Function Description**: Initializes the runtime context (determines if it is initialization or refresh).
- **Type**: `(viewAction: RuntimeViewAction) => { isInit: boolean; isRefresh: boolean }`
- **Parameters**:
  - `viewAction`: View action instance.
- **Return Value**: Initialization status object.

#### reloadPage

- **Function Description**: Reloads the page (handles route changes, internationalization, permissions, etc.).
- **Type**: `(oldPage?: ViewActionQueryParameter, newPage: ViewActionQueryParameter) => Promise<void>`
- **Parameters**:
  - `oldPage`: Old page parameters (optional).
  - `newPage`: New page parameters.

#### renderMask

- **Function Description**: Renders the mask template and triggers chaining calls.
- **Type**: `(viewAction: RuntimeViewAction, oldPage?: ViewActionQueryParameter, newPage: ViewActionQueryParameter) => Promise<void>`
- **Parameters**:
  - `viewAction`: View action instance.
  - `oldPage`: Old page parameters (optional).
  - `newPage`: New page parameters.

#### renderMainView

- **Function Description**: Renders the main view and triggers chaining calls.
- **Type**: `(oldPage?: ViewActionQueryParameter, newPage: ViewActionQueryParameter) => Promise<void>`
- **Parameters**:
  - `oldPage`: Old page parameters (optional).
  - `newPage`: New page parameters.

#### watchRoute

- **Function Description**: Listens to route changes and triggers the page reload process.
- **Type**: `() => void`

### 3、DefaultMainViewWidget

**Inheritance**: MetadataViewWidget

**Properties**:

- loading: Main view loading state. (`boolean | undefined`)
- multiTabsContainerWidget: Multi-tab container component instance. (`MultiTabsContainerWidget | undefined`)
- multiTabsTeleportWidget: Multi-tab Teleport component instance. (`TeleportWidget | undefined`)
- reloadMainViewCallChaining: Main view reload chaining call object. (`CallChaining | undefined`)
- teleportTarget: Teleport target element selector. (`string | undefined`)

**Methods**:

#### dispose

- **Function Description**: Destroys the component.
- **Type**: `() => void`

#### getMultiTabsTeleportWidget

- **Function Description**: Obtains the multi-tab Teleport component and sets the rendering target.
- **Type**: `() => TeleportWidget | undefined`

#### getUrlParameters

- **Function Description**: Obtains URL query parameters (overrides the parent class method).
- **Type**: `() => UrlQueryParameters`
- **Return Value**: URL parameter object (obtained from route matching parameters).

#### reloadRuntimeContext

- **Function Description**: Reloads the runtime context based on the handle.
- **Type**: `(handle: string) => void`
- **Parameters**:
  - `handle`: Component handle.

### 4、MultiTabsContainerWidget

**Inheritance**: DslDefinitionWidget

**Properties**:

- disabledCache: Whether to disable caching. (`boolean`)
- isEnabledHomepage: Whether to enable the application homepage tab (module homepage takes precedence). (`boolean`)
- isEnabledModuleHomepage: Whether to enable the module homepage tab. (`boolean`)
- loading: Loading state indicator. (`boolean`)
- maxCacheCount: Maximum number of cached tabs, preferentially using component configuration, otherwise taking the global value. (`number`)
- maxCount: Maximum number of tabs, preferentially using component configuration, otherwise taking the global value. (`number | undefined`)
- menuNodes: Menu tree node list. (`TreeNode<RuntimeMenu>[]`)
- module: Current module information. (`IModule | undefined`)
- multiTabConfig: Multi-tab configuration (obtained from the system main configuration and dynamically updated). (`SystemStyleMultiTabConfig | undefined`)
- reloadMainViewCallChaining: Main view reload chaining call object. (`CallChaining | undefined`)
- tabs: Tab list. (`MultiTabItem[]`)

**Methods**:

#### appendEnterTab

- **Function Description**: Appends an entry tab to the list.
- **Type**: `(enterTab: MultiTabItem, parameter?: ViewActionQueryParameter) => void`
- **Parameters**:
  - `enterTab`: Tab item to add.
  - `parameter`: URL parameters (optional).

#### createTabContainerWidget

- **Function Description**: Creates a tab container component.
- **Type**: `(instanceOrKey: string | MultiTabInstance, runtimeContext: RuntimeContext) => MultiTabContainerWidget`
- **Parameters**:
  - `instanceOrKey`: Instance or instance key.
  - `runtimeContext`: Runtime context.
- **Return Value**: Tab container component instance.

#### executeMaxCacheCount

- **Function Description**: Executes the maximum cache count restriction logic.
- **Type**: `(maxCacheCount: number) => void`
- **Parameters**:
  - `maxCacheCount`: Maximum number of caches.

#### executeMaxCount

- **Function Description**: Executes the maximum tab count restriction logic.
- **Type**: `(maxCount: number) => void`
- **Parameters**:
  - `maxCount`: Maximum number of tabs.

#### findEnterTab

- **Function Description**: Finds the tab for a specified action.
- **Type**: `(action: RuntimeViewAction, parameter?: ViewActionQueryParameter) => MultiTabItem | undefined`
- **Parameters**:
  - `action`: View action.
  - `parameter`: URL parameters (optional).
- **Return Value**: Matched tab item or `undefined`.

#### fetchMenuNodes

- **Function Description**: Obtains module menu tree nodes.
- **Type**: `(moduleName: string) => Promise<TreeNode<RuntimeMenu>[]>`
- **Parameters**:
  - `moduleName`: Module name.
- **Return Value**: Menu tree node list.

#### generatorTabItem

- **Function Description**: Generates a tab item.
- **Type**: `(type: MultiTabType, action: RuntimeViewAction, parameters?: ViewActionQueryParameter) => MultiTabItem`
- **Parameters**:
  - `type`: Tab type.
  - `action`: View action.
  - `parameters`: URL parameters (optional).
- **Return Value**: Tab item.

#### getMultiTabType

- **Function Description**: Obtains the tab type (homepage/module homepage/normal).
- **Type**: `(moduleModule: string, model: string, name: string) => Promise<MultiTabType>`
- **Parameters**:
  - `moduleModule`: Module name.
  - `model`: Model name.
  - `name`: Action name.
- **Return Value**: Tab type.

#### initHomepageTab

- **Function Description**: Initializes the homepage tab.
- **Type**: `(module?: string) => Promise<MultiTabItem>`
- **Parameters**:
  - `module`: Module name (optional, defaults to the application homepage).
- **Return Value**: Homepage tab item.

#### initMultiTabs

- **Function Description**: Initializes multi-tabs (handles homepage logic).
- **Type**: `() => Promise<void>`

#### isEnabled

- **Function Description**: Determines if the multi-tab function is enabled (supports module-level filtering).
- **Type**: `(module?: string) => boolean`
- **Parameters**:
  - `module`: Module name (optional, for module-level filtering).
- **Return Value**: Whether multi-tabs are enabled.

#### joinActiveTab

- **Function Description**: Joins the current active tab and updates the parameters.
- **Type**: `(viewAction: RuntimeViewAction, currentPage: ViewActionQueryParameter) => { tabItem: MultiTabItem; isUsingCache: boolean }`
- **Parameters**:
  - `viewAction`: View action.
  - `currentPage`: Current URL parameters.
- **Return Value**: Active tab item and whether to use cache flag.

#### onModuleChange

- **Function Description**: Callback when the module changes (resets the multi-tab state).
- **Type**: `(moduleName: string) => Promise<void>`
- **Parameters**:
  - `moduleName`: New module name.

#### refreshRuntimeContext

- **Function Description**: Refreshes the runtime context and updates the tabs.
- **Type**: `(handle: string, currentPage: ViewActionQueryParameter, menuUrlParameters?: MenuUrlParameters) => void`
- **Parameters**:
  - `handle`: Component handle.
  - `currentPage`: Current URL parameters.
  - `menuUrlParameters`: Menu parameters (optional).

#### setActiveTabItem

- **Function Description**: Sets the active tab component.
- **Type**: `(tab: MultiTabItem) => void`
- **Parameters**:
  - `tab`: Tab item.

#### setLoading

- **Function Description**: Sets the loading state.
- **Type**: `(loading: boolean) => void`
- **Parameters**:
  - `loading`: Loading state value.

#### getSortedTabs

- **Function Description**: Obtains the list of normal tabs sorted by creation time.
- **Type**: `() => MultiTabItem[]`
- **Return Value**: Sorted tab array.

### 5、MultiTabContainerWidget

**Inheritance**: MetadataViewWidget

**Properties**:

- instance: Multi-tab instance, including tab state, stack information, etc. (`MultiTabInstance`)

**Methods**:

#### onRefresh

- **Function Description**: Refreshes the tab runtime context.
- **Type**: `(handle?: string) => void`
- **Parameters**:
  - `handle`: Runtime context handle (optional, defaults to using the current component handle).