---  
title: Action  
index: true  
category:  
  - R&D Manual  
  - Reference  
  - Front-end API  
  - Widget  
order: 9  

---  
In Oinone Kunlun, actions are a crucial type of metadata. Action components cover all possible user operations, which are categorized into four types in Oinone:  

- ViewAction: Triggers in-app page navigation when clicked.  
- UrlAction: Navigates to a specified URL, similar to `window.open`.  
- ServerAction: Sends requests to the backend and processes responses.  
- ClientAction: Used for front-end interactions, theoretically capable of any client-side operation.  

For each action type, built-in components support system operations. However, complex business scenarios may require customizing action behaviors—such as adding pre/post-click logic or replacing default actions entirely.  


# I. Registration of Action Components  

## (Ⅰ) Registration Options for Action Components  

```typescript  
/**  
 * Action component registration options  
 */  
export interface BaseActionOptions extends SPIOptions {  
  /**  
   * Specify the action type  
   */  
  actionType?: ActionType | ActionType[];  
  /**  
   * Specify the view action target type (for ViewAction only)  
   */  
  target?: ViewActionTarget | string | string[];  
  /**  
   * Specify the action name  
   */  
  name?: string | string[];  
  /**  
   * Specify the model  
   */  
  model?: string[] | string;  
  /**  
   * Specify the view type  
   */  
  viewType?: ViewType | ViewType[];  
  /**  
   * Specify the view name  
   */  
  viewName?: string | string[];  
  /**  
   * Specify the component name or aliases  
   */  
  widget?: string[] | string;  
}  
```  

The classification dimensions in the declaration above include action type, target type (for ViewAction), action name, model code, view type, and view name. These dimensions define where the component is used. More precise location descriptions grant higher rendering priority. If locations match exactly, later registrations override earlier ones.  


## (Ⅱ) Action Component Types  

Oinone provides built-in components for the four action types defined in metadata, each implementing specific functionalities. Below is a list of components and base classes categorized by action type:  


| Action Type       | Action Component              | Description                          | Base Class         |  
|-------------------|-------------------------------|--------------------------------------|--------------------|  
| *ActionType.View* | RouterViewActionWidget        | In-app page navigation               | ViewActionWidget   |  
|                   | OpenWindowViewActionWidget    | In-app navigation via new window     | RouterViewActionWidget |  
|                   | DialogViewActionWidget        | Opens a dialog in the app            | *PopupActionWidget*|  
|                   | DrawerViewActionWidget        | Opens a drawer in the app            | *PopupActionWidget*|  
| *ActionType.URL*  | UrlActionWidget               | Navigates to a specified URL         | *ActionWidget*     |  
| *ActionType.Server*| ServerActionWidget            | Sends requests to the backend        | *ActionWidget*     |  
| *ActionType.Client*| ValidateFormActionWidget      | Triggers form field validation       | *ActionWidget*     |  
|                   | BackActionWidget              | Returns using an appropriate method  | *ActionWidget*     |  
|                   | ReloadViewActionWidget        | Refreshes data                       | *ActionWidget*     |  
|                   | DeleteOneActionWidget         | Deletes data                         | *ActionWidget*     |  
|                   | TableAddOneAction             | Adds a row of data                   | *ActionWidget*     |  
|                   | TableCopyOneAction            | Copies a row of data                 | *ActionWidget*     |  


## (Ⅲ) Registering Components  

Unlike other components, action components are typically replaced by model action names rather than specified via the `widget` attribute.  


### 1. Replace Components by Model and Action Name  

Take the create navigation action in the country group table as an example, replacing the action by specifying `model` and `name`:  

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


### 2. Replace Components by View Name and Action Name  

Take the create navigation action in the country group table as an example, replacing the action by specifying `viewName` and `name`:  

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


# II. Reference List  

## (Ⅰ) Abstract Base Classes  

### 1. ActionWidget  
**Inheritance**: BaseActionWidget  

**Attributes**:  
- actionDomain: Current action domain, supports dynamic resolution. (`string | undefined`)  
- allInvisible: Whether all are invisible. (Default `false`) (`boolean | undefined`)  
- bizStyle: Business style. (Default `default`) (`string`)  
- buttonType: Button type (optional). (`string | undefined`)  
- cancelText: Cancel button text (optional). (`string | undefined`)  
- closeAllDialog: Whether to close all dialogs (Default `false`). (`boolean`)  
- closeAllDrawer: Whether to close all drawers (Default `false`). (`boolean`)  
- closeDialog: Whether to close the dialog (Default matches `isDialog`). (`boolean`)  
- closeDrawer: Whether to close the drawer (Default matches `isDrawer`). (`boolean`)  
- confirm: Confirmation content (only valid when `confirmType` is `POPPER`). (`string | undefined`)  
- confirmPosition: Confirmation dialog position (Default `BM`). (`PopconfirmPlacement`)  
- confirmText: Confirmation text (optional). (`string | undefined`)  
- confirmTitle: Confirmation dialog title (Default `昆仑通用提示`). (`string | undefined`)  
- disabled: Button disabled status. (`boolean`)  
- disabledTitle: Disabled status tooltip. (`string`)  
- enableConfirm: Whether to enable confirmation (supports expressions). (`boolean`)  
- enterText: Confirm button text (optional). (`string | undefined`)  
- goBack: Whether to return (Default `false`). (`boolean`)  
- help: Help information. (`string | undefined`)  
- icon: Button icon (optional). (`string | undefined`)  
- keyboardConfig: Keyboard configuration (optional). (`ActionKeyboardConfig | undefined`)  
- label: Button label. (`string`)  
- nextActionComponent: Next action component (optional). (`Component | undefined`)  
- nextButtonType: Next button type (optional). (`string | undefined`)  
- nextOperatorColumnButtonType: Next operation column button type (optional). (`string | undefined`)  
- operatorColumnButtonType: Operation column button type (optional). (`string | undefined`)  
- refreshData: Whether to refresh current view data (Default `true`). (`boolean`)  
- refreshRoot: Whether to refresh root view data (Default `false`). (`boolean`)  
- searchBody: Search body data (optional). (`ActiveRecord | undefined`)  
- searchConditions: Array of search expressions (optional). (`QueryExpression[] | undefined`)  
- type: Button type (Default `primary`). (`string`)  
- validateForm: Whether to validate the form (Default `false`). (`boolean`)  
- variables: Dynamic variables. (`Record<string, unknown>`)  
- visibleConfirm: Confirmation dialog visibility. (`boolean`)  
- viewFilter: View filter conditions (optional). (`string | undefined`)  

**Methods**:  
#### **buildContext**  
- **Function**: Builds the action context by merging DSL and view contexts.  
- **Type**: `(activeRecord?: ActiveRecord) => Record<string, unknown> | undefined`  
- **Params**:  
  - `activeRecord`: Optional record for context.  
- **Return**: Merged context object.  

#### **buildSearchConditions**  
- **Function**: Builds search conditions, merging parent filters and search runtime context.  
- **Type**: `(record?: ActiveRecord, concatParentFilter?: boolean) => { runtimeContext: RuntimeContext; condition: Condition | undefined } | undefined`  
- **Params**:  
  - `record`: Optional custom extended data.  
  - `concatParentFilter`: Whether to concatenate parent filters (Default `true`).  
- **Return**: Object containing runtime context and conditions.  

#### **click**  
- **Function**: Manually triggers button click, executing validation and click logic.  
- **Type**: `(...args: unknown[]) => Promise<ClickResult>`  
- **Params**:  
  - `args`: Custom parameters.  
- **Return**: Click result.  

#### **clickAction**  
- **Function**: Original action click method, can be overridden by subclasses.  
- **Type**: `(...args: unknown[]) => ReturnPromise<ClickResult>`  
- **Params**:  
  - `args`: Custom parameters.  
- **Return**: Click result Promise.  

#### **clickActionAfter**  
- **Function**: Post-click processing logic, can be overridden by subclasses.  
- **Type**: `(result: ClickResult) => ReturnPromise<ClickResult>`  
- **Params**:  
  - `result`: Click result.  
- **Return**: Processed click result Promise.  

#### **executeExpression**  
- **Function**: Executes dynamic expressions, supporting context data retrieval.  
- **Type**: `(expression: string, errorValue?: T) => T | string | undefined`  
- **Params**:  
  - `expression`: Expression to execute.  
  - `errorValue`: Optional return value on error.  
- **Return**: Expression result.  

#### **executeExpressionByParameters**  
- **Function**: Executes dynamic expressions with parameters, supporting custom context.  
- **Type**: `(parameters: Partial<ExpressionRunParam>, expression: string, errorValue?: T) => T | string | undefined`  
- **Params**:  
  - `parameters`: Custom context parameters.  
  - `expression`: Expression to execute.  
  - `errorValue`: Optional return value on error.  
- **Return**: Expression result.  

#### **executeSearchExpression**  
- **Function**: Executes search expressions, parsing dynamic values.  
- **Type**: `(searchWidget: BaseView, expression: string) => string | undefined`  
- **Params**:  
  - `searchWidget`: Search component instance.  
  - `expression`: Search expression to execute.  
- **Return**: Parsed expression result.  

#### **getSearchRsqlAndQueryParams**  
- **Function**: Gets search RSQL and query parameters, merging conditions and parent filters.  
- **Type**: `(record?: ActiveRecord, concatParentFilter?: boolean) => { rsql: string; queryData: object; condition: Condition | string; queryDataToString: () => string }`  
- **Params**:  
  - `record`: Optional custom extended data.  
  - `concatParentFilter`: Whether to concatenate parent filters (Default `true`).  
- **Return**: Object containing RSQL, query data, conditions, and serialization method.  

#### **invisibleProcess**  
- **Function**: Processes invisibility status, supporting dynamic calculation via expressions.  
- **Type**: `(invisible: boolean | string) => boolean | undefined`  
- **Params**:  
  - `invisible`: Invisibility status (boolean or expression).  
- **Return**: Final invisibility status.  

#### **mergeContext**  
- **Function**: Merges context into records, handling DSL and view contexts.  
- **Type**: `(activeRecords?: ActiveRecords) => ActiveRecords | undefined`  
- **Params**:  
  - `activeRecords`: Optional array of records.  
- **Return**: Records with merged context.  

#### **startKeyboardEvent**  
- **Function**: Starts keyboard event listening.  
- **Type**: `() => void`  

#### **stopKeyboardEvent**  
- **Function**: Stops keyboard event listening.  
- **Type**: `() => void`  

#### **subscribeKeyboardEvent**  
- **Function**: Subscribes to keyboard events based on configuration.  
- **Type**: `() => void`  

#### **unsubscribeKeyboardEvent**  
- **Function**: Unsubscribes from keyboard events.  
- **Type**: `() => void`  

#### **validateAndClick**  
- **Function**: Validates and executes click logic, including form validation and confirmation.  
- **Type**: `(...args: unknown[]) => Promise<ClickResult>`  
- **Params**:  
  - `args`: Custom parameters.  
- **Return**: Click result Promise.  

#### **validateConfirm**  
- **Function**: Validates confirmation dialog status and displays the modal based on configuration.  
- **Type**: `() => Promise<boolean>`  
- **Return**: Promise of confirmation validation result.  

#### **validator**  
- **Function**: Executes validation logic and triggers lifecycle notifications.  
- **Type**: `(sendErrorMessage?: boolean) => Promise<boolean>`  
- **Params**:  
  - `sendErrorMessage`: Whether to send error messages (Default `false`).  
- **Return**: Validation result Promise.  

#### **validatorForm**  
- **Function**: Validates the form, executed only if `validateForm` is `true`.  
- **Type**: `() => Promise<boolean>`  
- **Return**: Form validation result Promise.  


### 2. PopupActionWidget  
**Inheritance**: ViewActionWidget  

**Attributes**:  
- currentOpenerActiveRecords: Selected records of the current popup. (`ActiveRecord[] | undefined`)  
- currentOpenerDataSource: Data source of the current popup. (`ActiveRecord[] | undefined`)  
- currentViewDslNode: DSL node of the current view. (`DslDefinition | null | undefined`)  
- defaultSubviewType: Default subview type. (Default `ViewType.Form`) (`ViewType`)  
- metadataSubviewWidget: Metadata subview component. (`MetadataViewWidget | undefined`)  
- popupDslDefinition: Popup DSL definition. (`PopupDslDefinition | null | undefined`)  
- popupViewDslNode: DSL node of the popup view. (`DslDefinition | undefined`)  
- subviewModel: Subview model. (`string`)  
- subviewModelName: Subview model name. (`string`)  
- subviewModule: Subview module. (`string | undefined`)  
- subviewModuleName: Subview module name. (`string`)  
- subviewRuntimeContext: Subview runtime context. (`RuntimeContext | undefined`)  
- subviewType: Subview type. (`ViewType`)  
- viewMode: View mode. (`ViewMode`)  

**Methods**:  
#### **clickAction**  
- **Function**: Handles click actions and generates popup components.  
- **Type**: `(...args: unknown[]) => Promise<ClickResult>`  
- **Params**:  
  - `args`: Custom parameters.  
- **Return**: Operation result Promise.  

#### **computeViewMode**  
- **Function**: Calculates the view mode based on subview type and context type.  
- **Type**: `(action: RuntimeViewAction) => ViewMode`  
- **Params**:  
  - `action`: Runtime view action.  
- **Return**: Calculated view mode.  

#### **createMetadataSubviewWidget**  
- **Function**: Creates a metadata subview component.  
- **Type**: `() => MetadataViewWidget`  
- **Return**: Created metadata subview component.  

#### **executeExpression**  
- **Function**: Executes expressions, supporting context data retrieval.  
- **Type**: `(expression: string, errorValue?: T) => string | T | undefined`  
- **Params**:  
  - `expression`: Expression to execute.  
  - `errorValue`: Optional return value on error.  
- **Return**: Expression result.  

#### **generatorPopupDslDefinition**  
- **Function**: Generates a popup DSL definition.  
- **Type**: `() => Promise<PopupDslDefinition | undefined>`  
- **Return**: Generated popup DSL definition Promise.  

#### **generatorPopupWidget**  
- **Function**: Generates a popup component, including initializing subviews and creating the popup.  
- **Type**: `() => Promise<void>`  

#### **getViewDsl**  
- **Function**: Retrieves the view DSL node.  
- **Type**: `() => ReturnPromise<DslDefinition | undefined>`  
- **Return**: View DSL node.  

#### **getViewLayout**  
- **Function**: Retrieves the view layout (Default returns `undefined`).  
- **Type**: `() => ReturnPromise<DslDefinition | undefined>`  
- **Return**: View layout.  

#### **getViewTemplate**  
- **Function**: Retrieves the view template (Default returns `undefined`).  
- **Type**: `() => ReturnPromise<DslDefinition | undefined>`  
- **Return**: View template.  

#### **initSubview**  
- **Function**: Initializes the subview and sets the runtime context.  
- **Type**: `(popupDslDefinition: PopupDslDefinition, data: ActiveRecord[]) => void`  
- **Params**:  
  - `popupDslDefinition`: Popup DSL definition.  
  - `data`: Array of data records.  

#### **initSubviewAfterProperties**  
- **Function**: Hook method after initializing subview properties (Default empty implementation).  
- **Type**: `() => void`  

#### **isFetchData**  
- **Function**: Determines if data is automatically fetched by components in the popup.  
- **Type**: `(records: ActiveRecord[]) => boolean | undefined`  
- **Params**:  
  - `records`: Loaded data records.  
- **Return**: Whether to fetch data automatically.  

#### **isNotNeedFetchData**  
- **Function**: Determines if data fetching is unnecessary (for single-row actions).  
- **Type**: `(records: ActiveRecord[], contextType: ActionContextType) => boolean`  
- **Params**:  
  - `records`: Array of data records.  
  - `contextType`: Context type.  
- **Return**: Whether data fetching is unnecessary.  

#### **loadData**  
- **Function**: Loads popup data.  
- **Type**: `() => ReturnPromise<PopupLoadDataResult>`  
- **Return**: Loaded data result.  

#### **onCancel**  
- **Function**: Popup cancel callback (Default returns `true`).  
- **Type**: `(parameters: PopupSubmitParameters) => boolean`  
- **Params**:  
  - `parameters`: Submission parameters.  
- **Return**: Operation result.  

#### **onSubmit**  
- **Function**: Popup submit callback, updates the data source.  
- **Type**: `(parameters: PopupSubmitParameters) => boolean`  
- **Params**:  
  - `parameters`: Submission parameters.  
- **Return**: Operation result.  

#### **pushDataSourceForSubmit**  
- **Function**: Adds new records to the data source on submission.  
- **Type**: `(parameters: PopupSubmitParameters, predict?: PushActiveRecordsPredict) => void`  
- **Params**:  
  - `parameters`: Submission parameters.  
  - `predict`: Optional push prediction function.  

#### **updateDataSourceByEntityForSubmit**  
- **Function**: Updates the data source by entity on submission.  
- **Type**: `(parameters: PopupSubmitParameters, predict?: UpdateActiveRecordsByEntityPredict) => void`  
- **Params**:  
  - `parameters`: Submission parameters.  
  - `predict`: Optional update prediction function.  


### 3. AbstractTaskAction  
**Inheritance**: ServerActionWidget  

**Methods**:  
#### **buildSearchConditions**  
- **Function**: Builds search conditions, parses search expressions, and merges filter conditions.  
- **Type**: `() => { runtimeContext: RuntimeContext; condition: Condition } | undefined`  
- **Return**: Object containing runtime context and conditions, or `undefined`.  

#### **createTask**  
- **Function**: Abstract method to create a task (must be implemented by subclasses).  
- **Type**: `(searchRuntimeContext: RuntimeContext, task: T, condition: string | Condition) => Promise<T>`  
- **Params**:  
  - `searchRuntimeContext`: Search runtime context.  
  - `task`: Task data.  
  - `condition`: Conditions.  
- **Return**: Created task Promise.  

#### **doTask**  
- **Function**: Executes the task, handling synchronously or asynchronously based on `sync`.  
- **Type**: `(searchRuntimeContext: RuntimeContext, task: T, condition: Condition | string) => Promise<boolean>`  
- **Params**:  
  - `searchRuntimeContext`: Search runtime context.  
  - `task`: Task data.  
  - `condition`: Conditions.  
- **Return**: Task execution result Promise (success/failure).  

#### **executeSearchExpression**  
- **Function**: Executes search expressions, parsing dynamic values.  
- **Type**: `(searchWidget: BaseView, expression: string) => string | undefined`  
- **Params**:  
  - `searchWidget`: Search component instance.  
  - `expression`: Search expression to execute.  
- **Return**: Parsed expression result.  

#### **generatorGQLByTask**  
- **Function**: Abstract method to generate GQL queries for tasks (must be implemented by subclasses).  
- **Type**: `(task: T, condition: string | Condition) => Promise<string>`  
- **Params**:  
  - `task`: Task data.  
  - `condition`: Conditions.  
- **Return**: Generated GQL string Promise.  

#### **getSessionPath**  
- **Function**: Retrieves the session path, prioritizing action/view action configuration, then global methods.  
- **Type**: `() => string`  
- **Return**: Session path string.  

#### **processResponseResult**  
- **Function**: Processes task response results, displaying success/error notifications.  
- **Type**: `(searchRuntimeContext: RuntimeContext, task: T, responseResult: boolean) => boolean`  
- **Params**:  
  - `searchRuntimeContext`: Search runtime context.  
  - `task`: Task data.  
  - `responseResult`: Task execution result.  
- **Return**: Processed result (`true` for success, `false` for failure).  

#### **seekParentMetadataRuntimeContext**  
- **Function**: Finds the parent metadata runtime context.  
- **Type**: `() => RuntimeContext | undefined`  
- **Return**: Parent metadata runtime context, or `undefined`.  

#### **seekSearchRuntimeContext**  
- **Function**: Finds the search runtime context (for `ViewType.Search`).  
- **Type**: `() => RuntimeContext | undefined`  
- **Return**: Search runtime context, or `undefined`.  


## (Ⅱ) ViewAction (Navigation Actions)  

### 1. ViewActionWidget  
**Type Declaration**:  
```typescript  
@SPI.ClassFactory(  
  ActionWidget.Token({  
    actionType: ActionType.View  
  })  
)  
export class ViewActionWidget extends ActionWidget<RuntimeViewAction>  
```  

**Methods**:  
#### **clickAction**  
- **Function**: Handles click actions and executes page navigation.  
- **Type**: `() => ReturnPromise<ClickResult>`  
- **Return**: Operation result Promise.  


### 2. RouterViewActionWidget  
**Type Declaration**:  
```typescript  
@SPI.ClassFactory(  
  ActionWidget.Token({  
    actionType: ActionType.View,  
    target: ViewActionTarget.Router  
  })  
)  
export class RouterViewActionWidget extends ViewActionWidget  
```  

**Attributes**:  
- matched: Current matched route information. (`Matched | undefined`)  
- router: Current router instance. (`Router | undefined`)  

**Methods**:  
#### **clickAction**  
- **Function**: Handles click actions, including closing popups, building parameters, and executing actions.  
- **Type**: `() => Promise<void>`  

#### **executeAction**  
- **Function**: Executes the action by calling `realExecuteAction`.  
- **Type**: `(action: RuntimeViewAction, parameters: UrlQueryParameters) => void`  
- **Params**:  
  - `action`: Runtime view action.  
  - `parameters`: URL query parameters.  


### 3. OpenWindowViewActionWidget  
**Type Declaration**:  
```typescript  
@SPI.ClassFactory(  
  ActionWidget.Token({  
    actionType: ActionType.View,  
    target: ViewActionTarget.OpenWindow  
  })  
)  
export class OpenWindowViewActionWidget extends RouterViewActionWidget  
```  

**Methods**:  
#### **executeAction**  
- **Function**: Executes the action, determining the target window and performing the view action.  
- **Type**: `(action: RuntimeViewAction, parameters: UrlQueryParameters) => void`  
- **Params**:  
  - `action`: Runtime view action.  
  - `parameters`: URL query parameters.  


### 4. DialogViewActionWidget  
**Type Declaration**:  
```typescript  
@SPI.ClassFactory(  
  BaseActionWidget.Token({  
    actionType: ActionType.View,  
    target: ViewActionTarget.Dialog  
  })  
)  
export class DialogViewActionWidget extends PopupActionWidget  
```  

**Attributes**:  
- dialog: Dialog component instance. (`DialogWidget | undefined`)  

**Methods**:  
#### **createPopupWidget**  
- **Function**: Creates a popup component, initializes the dialog based on DSL definition, and binds close events.  
- **Type**: `(data: ActiveRecord[]) => void`  
- **Params**:  
  - `data`: Dialog initialization data array.  

#### **onCloseDialog**  
- **Function**: Closes the dialog, releases resources, and updates component status.  
- **Type**: `() => void`  


### 5. DrawerViewActionWidget  
**Type Declaration**:  
```typescript  
@SPI.ClassFactory(  
  BaseActionWidget.Token({  
    actionType: ActionType.View,  
    target: ViewActionTarget.Drawer  
  })  
)  
export class DrawerViewActionWidget extends PopupActionWidget  
```  

**Attributes**:  
- drawer: Drawer component instance. (`DrawerWidget | undefined`)  

**Methods**:  
#### **createPopupWidget**  
- **Function**: Creates a drawer component, initializes the drawer based on DSL definition, and binds close events.  
- **Type**: `(data: ActiveRecord[]) => void`  
- **Params**:  
  - `data`: Drawer initialization data array.  

#### **onCloseDrawer**  
- **Function**: Closes the drawer, releases resources, and updates component status.  
- **Type**: `() => void`  


### 6. GotoM2MListDialogActionWidget  
**Type Declaration**:  
```typescript  
@SPI.ClassFactory(ActionWidget.Token({ name: ModelDefaultActionName.$$internal_GotoM2MListDialog }))  
export class GotoM2MListDialogActionWidget extends DialogViewActionWidget  
```  

**Attributes**:  
- label: Action label, prioritizing DSL/action configuration, default「添加」. (`string`)  


### 7. GotoO2MCreateDialogActionWidget  
**Type Declaration**:  
```typescript  
@SPI.ClassFactory(  
  ActionWidget.Token({  
    name: ModelDefaultActionName.$$internal_GotoO2MCreateDialog  
  })  
)  
export class GotoO2MCreateDialogActionWidget extends DialogViewActionWidget  
```  

**Attributes**:  
- label: Action label, prioritizing DSL/action configuration, default「创建」. (`string`)  


### 8. GotoO2MEditDialogActionWidget  
**Type Declaration**:  
```typescript  
@SPI.ClassFactory(  
  ActionWidget.Token({  
    name: ModelDefaultActionName.$$internal_GotoO2MEditDialog  
  })  
)  
export class GotoO2MEditDialogActionWidget extends DialogViewActionWidget  
```  

**Attributes**:  
- label: Action label, prioritizing DSL/action configuration, default「编辑」. (`string`)  


## (Ⅲ) ServerAction (Submission Actions)  

### 1. ServerActionWidget  
**Type Declaration**:  
```typescript  
@SPI.ClassFactory(  
  ActionWidget.Token({  
    actionType: ActionType.Server  
  })  
)  
export class ServerActionWidget extends ActionWidget<RuntimeServerAction>  
```  

**Attributes**:  
- formValidateCallChaining: Form validation chaining instance. (`CallChaining<FormValidateResult[]> | undefined`)  
- reloadFormData$: Reactive subject for refreshing form data. (`WidgetSubjection<boolean>`)  
- submitData: Whether to submit data. (Default `false`) (`boolean`)  
- updateData: Whether to update data. (Default `false`) (`boolean`)  
- updateActionName: Default update action name. (`string`)  
- updateOneWithRelationName: Default related update action name. (`string`)  

**Methods**:  
#### **clickAction**  
- **Function**: Handles click actions, executes submission and action logic, catches errors, and processes form validation results.  
- **Type**: `() => Promise<ClickResult>`  

#### **clickActionAfter**  
- **Function**: Post-click processing logic, handling popup closure, page back, and data refresh.  
- **Type**: `(result: ClickResult) => Promise<ClickResult>`  
- **Params**:  
  - `result`: Click action result.  
- **Return**: Processed click result.  

#### **clickActionAfterRefreshData**  
- **Function**: Post-click data refresh logic, handling submitted data and refreshing root/current views.  
- **Type**: `(result: ClickResult, refreshParent?: boolean) => Promise<ClickResult>`  
- **Params**:  
  - `result`: Click action result.  
  - `refreshParent`: Whether to refresh the parent view (Default `false`).  
- **Return**: Processed click result.  

#### **convertFormValidateResults**  
- **Function**: Converts HTTP errors to form validation result arrays.  
- **Type**: `(e: HttpClientError) => FormValidateResult[]`  
- **Params**:  
  - `e`: HTTP error object.  
- **Return**: Form validation result array.  

#### **executeAction**  
- **Function**: Executes server actions, calling normal execution or related update logic based on action type.  
- **Type**: `(action: RuntimeServerAction, submitValue: SubmitValue) => Promise<ClickResult>`  
- **Params**:  
  - `action`: Runtime server action.  
  - `submitValue`: Submission value object.  
- **Return**: Click result Promise.  

#### **executeFunction**  
- **Function**: Executes function definitions, merging context and calling function services.  
- **Type**: `<T>(functionDefinition: RuntimeFunctionDefinition, requestFields: RequestModelField[], activeRecords?: ActiveRecords) => Promise<T>`  
- **Params**:  
  - `functionDefinition`: Runtime function definition.  
  - `requestFields`: Array of request model fields.  
  - `activeRecords`: Optional array of active records.  
- **Return**: Function execution result Promise.  

#### **executeRefreshData**  
- **Function**: Executes data refresh, triggering refresh chaining.  
- **Type**: `(refreshParent: boolean) => void`  
- **Params**:  
  - `refreshParent`: Whether to refresh parent data.  

#### **executeRefreshRoot**  
- **Function**: Refreshes the root view, finding and triggering refresh logic in the root runtime context.  
- **Type**: `() => void`  

#### **executeRelationUpdate**  
- **Function**: Executes related update operations, calling related update services.  
- **Type**: `<T>(requestFields: RequestModelField[], submitValue: SubmitValue) => Promise<T>`  
- **Params**:  
  - `requestFields`: Array of request model fields.  
  - `submitValue`: Submission value object.  
- **Return**: Related update result Promise.  

#### **executeSubmitData**  
- **Function**: Executes submission data logic, calling `onSubmit` to process results.  
- **Type**: `(result: ClickResult) => Promise<ClickResult>`  
- **Params**:  
  - `result`: Click action result.  
- **Return**: Processed click result.  

#### **findRefreshRootRuntimeContext**  
- **Function**: Finds the root runtime context for refreshing.  
- **Type**: `() => RuntimeContext | undefined`  
- **Return**: Root runtime context or `undefined`.  

#### **formValidateProcess**  
- **Function**: Processes form validation errors, triggering form validation chaining.  
- **Type**: `(e: HttpClientError) => void`  
- **Params**:  
  - `e`: HTTP error object.  

#### **getRequestModelFields**  
- **Function**: Retrieves request model fields, finding context based on view type or popup scenario.  
- **Type**: `(options?: GetRequestModelFieldsOptions) => Promise<RequestModelField[]>`  
- **Params**:  
  - `options`: Optional options for retrieving fields.  
- **Return**: Array of request model fields Promise.  

#### **historyBack**  
- **Function**: Performs page back navigation, calling router navigation.  
- **Type**: `() => void`  

#### **submit**  
- **Function**: Submits data, handling record formats for different context types and generating submission value objects.  
- **Type**: `(action: RuntimeServerAction) => Promise<SubmitValue>`  
- **Params**:  
  - `action`: Runtime server action.  
- **Return**: Submission value object Promise.  

#### **usingDiffUpdate**  
- **Function**: Determines if differential update is used, based on related update type or relation record length.  
- **Type**: `(parameters: SubmitValue) => boolean`  
- **Params**:  
  - `parameters`: Submission value object.  
- **Return**: Whether to use differential update.  


### 2. BatchUpdateAction  
**Type Declaration**:  
```typescript  
@SPI.ClassFactory(  
  ActionWidget.Token({  
    name: ModelDefaultActionName.$$internal_BatchUpdate  
  })  
)  
export class BatchUpdateAction extends ServerActionWidget  
```  

**Attributes**:  
- disabled: Whether the action is disabled. (`boolean`)  

**Methods**:  
#### **executeAction**  
- **Function**: Executes the operation.  
- **Type**: `(action: RuntimeServerAction, submitValue: SubmitValue) => Promise<ClickResult>`  
- **Params**:  
  - `action`: Runtime server action.  
  - `submitValue`: Submission value.  
- **Return**: Click result.  

#### **submit**  
- **Function**: Submits data.  
- **Type**: `(action: RuntimeServerAction) => Promise<SubmitValue>`  
- **Params**:  
  - `action`: Runtime server action.  
- **Return**: Submission result.  


### 3. ExportWorkbookActionWidget  
**Type Declaration**:  
```typescript  
@SPI.ClassFactory(ActionWidget.Token({ name: ModelDefaultActionName.$$internal_ExportWorkbook }))  
export class ExportWorkbookActionWidget extends AbstractTaskAction<ExcelExportTask>  
```  

**Attributes**:  
- moduleName: File module name. (`string`)  
- sync: Whether to export synchronously. (`boolean`)  

**Methods**:  
#### **createTask**  
- **Function**: Creates an Excel export task.  
- **Type**: `(searchRuntimeContext: RuntimeContext, task: ExcelExportTask, condition: string | Condition) => Promise<ExcelExportTask>`  
- **Params**:  
  - `searchRuntimeContext`: Search runtime context.  
  - `task`: Excel export task.  
  - `condition`: Query conditions.  

#### **doTaskByPrepare**  
- **Function**: Executes the export task via the preparation phase.  
- **Type**: `(searchRuntimeContext: RuntimeContext, task: ExcelExportTask, condition: Condition | string) => Promise<ClickResult>`  
- **Params**:  
  - `searchRuntimeContext`: Search runtime context.  
  - `task`: Excel export task.  
  - `condition`: Query conditions.  

#### **executeAction**  
- **Function**: Executes the export action, creating tasks based on different export methods.  
- **Type**: `(action: RuntimeServerAction, parameters: SubmitValue) => Promise<ClickResult>`  
- **Params**:  
  - `action`: Runtime server action.  
  - `parameters`: Submission value.  

#### **generatorGQLByTask**  
- **Function**: Generates a GraphQL query for creating an export task.  
- **Type**: `(task: ExcelExportTask, condition: string | Condition) => Promise<string>`  
- **Params**:  
  - `task`: Excel export task.  
  - `condition`: Query conditions.  

#### **generatorGQLByTaskByPrepare**  
- **Function**: Generates a GraphQL query based on the preparation phase.  
- **Type**: `(requestId: string) => Promise<string>`  
- **Params**:  
  - `requestId`: Request ID.  

#### **getSessionPath**  
- **Function**: Retrieves the session path.  
- **Type**: `() => string`  

#### **getWorkbookId**  
- **Function**: Retrieves the workbook ID.  
- **Type**: `() => ReturnPromise<string | undefined>`  


### 4. ImportWorkbookActionWidget  
**Type Declaration**:  
```typescript  
@SPI.ClassFactory(ActionWidget.Token({ name: ModelDefaultActionName.$$internal_ImportWorkbook }))  
export class ImportWorkbookActionWidget extends ServerActionWidget  
```  

**Attributes**:  
- list: Import data list. (`Record<string, any>[]`)  

**Methods**:  
#### **executeAction**  
- **Function**: Executes the import action, handling different import logic based on field types.  
- **Type**: `(action: RuntimeServerAction, parameters: SubmitValue) => Promise<ClickResult>`  
- **Params**:  
  - `action`: Runtime server action.  
  - `parameters`: Submission value.  

#### **executeWithTableField**  
- **Function**: Executes the import task for table fields.  
- **Type**: `({ workbookId, fileId, fileUrl, ttype }: { workbookId: string; fileId: string; fileUrl: string; ttype: ModelFieldType }) => Promise<void>`  
- **Params**:  
  - `workbookId`: Workbook ID.  
  - `fileId`: File ID.  
  - `fileUrl`: File URL.  
  - `ttype`: Field type.  

#### **getSessionPath**  
- **Function**: Retrieves the session path.  
- **Type**: `() => string`  

#### **getWorkbookId**  
- **Function**: Retrieves the workbook ID.  
- **Type**: `() => ReturnPromise<string | undefined>`  


### 5. PrintPdfDocumentActionWidget  
**Type Declaration**:  
```typescript  
@SPI.ClassFactory(ActionWidget.Token({ name: ModelDefaultActionName.$$internal_PrintPdfDocument }))  
export class PrintPdfDocumentActionWidget extends AbstractTaskAction<PdfPrintTask>  
```  

**Attributes**:  
- moduleName: Print module name. (`string`)  
- sync: Whether to print synchronously. (`boolean`)  

**Methods**:  
#### **createTask**  
- **Function**: Creates a PDF print task.  
- **Type**: `(runtimeContext: RuntimeContext, task: PdfPrintTask, condition: string | Condition) => Promise<PdfPrintTask>`  
- **Params**:  
  - `runtimeContext`: Runtime context.  
  - `task`: PDF print task.  
  - `condition`: Query conditions.  

#### **executeAction**  
- **Function**: Executes the print action, building tasks and calling execution logic.  
- **Type**: `(action: RuntimeServerAction, parameters: SubmitValue) => Promise<ClickResult>`  
- **Params**:  
  - `action`: Runtime server action.  
  - `parameters`: Submission value.  

#### **generatorGQLByTask**  
- **Function**: Generates a GraphQL query for creating a print task.  
- **Type**: `(task: PdfPrintTask, condition: string | Condition) => Promise<string>`  
- **Params**:  
  - `task`: PDF print task.  
  - `condition`: Query conditions.  

#### **getDocumentDefinitionId**  
- **Function**: Retrieves the PDF document definition ID.  
- **Type**: `() => ReturnPromise<string | undefined>`  


## (Ⅳ) UrlAction (URL Actions)  

### 1. UrlActionWidget  
**Type Declaration**:  
```typescript  
@SPI.ClassFactory(  
  ActionWidget.Token({  
    actionType: ActionType.URL  
  })  
)  
export class UrlActionWidget extends ActionWidget<RuntimeUrlAction>  
```  

**Methods**:  
#### **clickAction**  
- **Function**: Handles click actions, retrieves the URL, and executes the action.  
- **Type**: `() => Promise<void>`  

#### **executeAction**  
- **Function**: Executes the URL action based on the target type.  
- **Type**: `(action: RuntimeUrlAction, url: string) => void`  
- **Params**:  
  - `action`: Runtime URL action.  
  - `url`: URL to execute.  

#### **executeFunction**  
- **Function**: Executes function definitions.  
- **Type**: `<T>(functionDefinition: RuntimeFunctionDefinition, requestFields: RequestModelField[], activeRecords: ActiveRecord[] | undefined) => Promise<T>`  
- **Params**:  
  - `functionDefinition`: Runtime function definition.  
  - `requestFields`: Array of request model fields.  
  - `activeRecords`: Array of active records or `undefined`.  

#### **getUrl**  
- **Function**: Retrieves the URL, calculating it based on configuration or fetching directly.  
- **Type**: `() => ReturnPromise<string | undefined>`  

#### **getRequestModelFields**  
- **Function**: Retrieves request model fields.  
- **Type**: `(options?: GetRequestModelFieldsOptions) => Promise<RequestModelField[]>`  
- **Params**:  
  - `options`: Options for retrieving request model fields.  

#### **resolveQueryBody**  
- **Function**: Resolves the query body.  
- **Type**: `() => string`  

#### **seekPopupMainRuntimeContext**  
- **Function**: Finds the main runtime context of the popup.  
- **Type**: `() => RuntimeContext`  


### 2. DownloadImportWorkbookActionWidget  
**Type Declaration**:  
```typescript  
@SPI.ClassFactory(ActionWidget.Token({ name: ModelDefaultActionName.$$internal_DownloadImportWorkbook }))  
export class DownloadImportWorkbookActionWidget extends UrlActionWidget  
```  

**Methods**:  
#### **getUrl**  
- **Function**: Retrieves the URL for downloading the import workbook.  
- **Type**: `() => Promise<string>`  

#### **getWorkbookId**  
- **Function**: Retrieves the workbook ID.  
- **Type**: `() => ReturnPromise<string | undefined>`  


## (Ⅴ) ClientAction (Client-Side Actions)  

### 1. BackActionWidget  
**Type Declaration**:  
```typescript  
@SPI.ClassFactory(  
  ActionWidget.Token({  
    name: ModelDefaultActionName.$$internal_GotoListTableRouter  
  })  
)  
export class BackActionWidget extends ActionWidget  
```  

**Attributes**:  
- confirmText: Confirmation text (`string | undefined`)  
- defaultType: Default button type (`ButtonType.default`)  
- formData: Form data (`ActiveRecord | undefined`)  
- isFormChange: Whether the form has changed (`boolean`)  
- initFormData: Initial form data (`string | undefined`)  
- label: Button label (`string`)  
- mountedCallChaining: Mounting chaining (`CallChaining | undefined`)  

**Methods**:  
#### **clickAction**  
- **Function**: Handles click actions, closing popups or performing page back operations.  
- **Type**: `() => Promise<void>`  

#### **mountedProcess**  
- **Function**: Mounting processing logic, initializing form data.  
- **Type**: `() => void`  


### 2. ValidateFormActionWidget  
**Type Declaration**:  
```typescript  
@SPI.ClassFactory(  
  ActionWidget.Token({  
    name: ModelDefaultActionName.$$internal_ValidateForm  
  })  
)  
export class ValidateFormActionWidget extends ActionWidget  
```  

**Attributes**:  
- label: Action button text, prioritizing DSL configuration, then action display name, default「校验」. (`string`)  
- validateForm: Whether to perform form validation, always returns `true`. (`boolean`)  

**Methods**:  
#### **validateAndClick**  
- **Function**: Performs form validation and returns the result.  
- **Type**: `() => Promise<boolean>`  
- **Return**: Validation result.  


### 3. ReloadViewActionWidget  
**Type Declaration**:  
```typescript  
@SPI.ClassFactory(  
  ActionWidget.Token({  
    name: ModelDefaultActionName.$$internal_ReloadData  
  })  
)  
export class ReloadViewActionWidget extends ActionWidget  
```  

**Attributes**:  
- label: Action button text, prioritizing DSL configuration, then action display name, default「刷新」. (`string`)  

**Methods**:  
#### **clickAction**  
- **Function**: Triggers the refresh operation.  
- **Type**: `() => void`  


### 4. PopupSubmitActionWidget  
**Type Declaration**:  
```typescript  
@SPI.ClassFactory(  
  ActionWidget.Token({  
    name: ModelDefaultActionName.$$internal_DialogSubmit  
  })  
)  
export class PopupSubmitActionWidget extends ActionWidget  
```  

**Attributes**:  
- label: Action button text, prioritizing DSL configuration, then action display name, default「确定」. (`string`)  
- updateData: Whether to update data, default `false`. (`boolean`)  
- validateForm: Whether to validate the form, default `true`. (`boolean`)  

**Methods**:  
#### **clickAction**  
- **Function**: Executes when the action button is clicked.  
- **Type**: `() => Promise<boolean>`  
- **Return**: Click result.  

#### **clickActionAfter**  
- **Function**: Executes after the action button is clicked.  
- **Type**: `(result: ClickResult) => ClickResult`  
- **Params**:  
  - `result`: Click result.  
- **Return**: Processed click result.  

#### **reloadDataSourceAndRecords**  
- **Function**: Reloads the data source and records.  
- **Type**: `(result: ClickResult) => void`  
- **Params**:  
  - `result`: Click result.  


### 5. PopupCancelActionWidget  
**Type Declaration**:  
```typescript  
@SPI.ClassFactory(  
  ActionWidget.Token({  
    name: ModelDefaultActionName.$$internal_DialogCancel  
  })  
)  
export class PopupCancelActionWidget extends ActionWidget  
```  

**Attributes**:  
- label: Action button text, prioritizing DSL configuration, then action display name, default「取消」. (`string`)  
- type: Button type, `link` in inline mode, otherwise from DSL configuration, default `default`. (`string`)  

**Methods**:  
#### **clickAction**  
- **Function**: Executes when the action button is clicked.  
- **Type**: `() => Promise<boolean>`  
- **Return**: Click result.  

#### **clickActionAfter**  
- **Function**: Executes after the action button is clicked.  
- **Type**: `(result: ClickResult) => ClickResult`  
- **Params**:  
  - `result`: Click result.  
- **Return**: Processed click result.  


### 6. TableAddOneAction  
**Type Declaration**:  
```typescript  
@SPI.ClassFactory(  
  ActionWidget.Token({  
    name: ModelDefaultActionName.$$internal_AddOne  
  })  
)  
export class TableAddOneAction extends ActionWidget  
```  

**Methods**:  
#### **clickAction**  
- **Function**: Executes when the action button is clicked, creating a new record and triggering the edit row chain.  
- **Type**: `() => void`  


### 7. TableCopyOneAction  
**Type Declaration**:  
```typescript  
@SPI.ClassFactory(  
  ActionWidget.Token({  
    name: ModelDefaultActionName.$$internal_CopyOne  
  })  
)  
export class TableCopyOneAction extends ActionWidget  
```  

**Methods**:  
#### **clickAction**  
- **Function**: Executes when the action button is clicked, copying the current record and triggering the edit row chain.  
- **Type**: `() => void`  


### 8. DeleteOneActionWidget  
**Type Declaration**:  
```typescript  
@SPI.ClassFactory(  
  ActionWidget.Token({  
    name: ModelDefaultActionName.$$internal_DeleteOne  
  })  
)  
export class DeleteOneActionWidget extends ActionWidget  
```  

**Attributes**:  
- label: Action button text, prioritizing DSL configuration, then action display name, default「删除」. (`string`)  
- isAsync: Whether the operation is asynchronous. (`boolean`)  

**Methods**:  
#### **clickAction**  
- **Function**: Executes when the action button is clicked, deleting the currently selected record.  
- **Type**: `() => void`  


### 9. DownloadActionWidget  
**Type Declaration**:  
```typescript  
@SPI.ClassFactory(  
  ActionWidget.Token({  
    name: ModelDefaultActionName.$$internal_Download  
  })  
)  
export class DownloadActionWidget extends ActionWidget  
```  

**Methods**:  
#### **clickAction**  
- **Function**: Executes when the action button is clicked, downloading the specified file for the selected record.  
- **Type**: `() => void`  

#### **downloadUrl**  
- **Function**: Downloads a file from the specified URL.  
- **Type**: `(url: string) => void`  
- **Params**:  
  - `url`: File URL.  


### 10. ExportActionWidget  
**Type Declaration**:  
```typescript  
@SPI.ClassFactory(  
  ActionWidget.Token({  
    name: ModelDefaultActionName.$$internal_GotoListExportDialog  
  })  
)  
export class ExportActionWidget extends ActionWidget  
```  

**Attributes**:  
- label: Action button text, prioritizing DSL configuration, then action display name, default「导出」. (`string`)  

**Methods**:  
#### **change**  
- **Function**: Toggles component visibility, triggering workbook list query on first open.  
- **Type**: `(val: boolean) => void`  
- **Params**:  
  - `val`: Visibility boolean.  

#### **clickAction**  
- **Function**: Opens the export dialog when the action button is clicked.  
- **Type**: `() => void`  

#### **createExportTask**  
- **Function**: Creates an export task, generating export requests based on selected values and record conditions.  
- **Type**: `() => void`  


### 11. ImportActionWidget  
**Type Declaration**:  
```typescript  
@SPI.ClassFactory(  
  ActionWidget.Token({  
    name: ModelDefaultActionName.$$internal_GotoListImportDialog  
  })  
)  
export class ImportActionWidget extends ActionWidget  
```  

**Attributes**:  
- label: Action button text, prioritizing DSL configuration, then action display name, default「导入」. (`string`)  

**Methods**:  
#### **change**  
- **Function**: Toggles dialog visibility, resets validation status and selected values, and queries the workbook list on first open.  
- **Type**: `(val: boolean) => void`  
- **Params**:  
  - `val`: Dialog visibility boolean.  

#### **clickAction**  
- **Function**: Opens the import dialog when the action button is clicked.  
- **Type**: `() => void`  

#### **createImportTask**  
- **Function**: Creates an import task, validating file and workbook selection, and calling the interface to execute the import.  
- **Type**: `() => void`  

#### **downloadTemplate**  
- **Function**: Downloads the import template for the specified workbook.  
- **Type**: `() => void`  

#### **getImportFile**  
- **Function**: Retrieves the uploaded file object and updates the `file` attribute.  
- **Type**: `(files) => void`  
- **Params**:  
  - `files`: Uploaded file list.  

#### **remove**  
- **Function**: Removes the uploaded file and resets the `file` attribute to an empty object.  
- **Type**: `(file) => void`  
- **Params**:  
  - `file`: File object to remove (unused, only clears the status).