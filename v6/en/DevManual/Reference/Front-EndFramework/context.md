---
title: Context
index: true
category:
  - Development Manual
  - Reference
  - Frontend API
order: 3

---
In Oinone Kunlun, "context" is a crucial concept: it provides components with rendering, configuration, metadata, and other information, enabling any system component to behave appropriately based on this information. In a sense, it is like an information package propagated everywhere, proving useful in scenarios where, for example, input fields need to behave differently in forms and details, or certain functions need to be activated/deactivated in components.

There are two different contexts in the Web client: Runtime Context (RuntimeContext) and configuration contexts for certain components (context). Therefore, caution is needed when using the term "context"—it may refer to different meanings depending on the specific scenario.

The "context" mentioned here specifically refers to the "Runtime Context" (RBuilt-in Layouts
Built-in Layouts
Built-in Layouts
Built-in Layouts
Built-in Layouts
Built-in Layouts
Built-in Layouts
  untimeContext).

# I. Runtime Context

The runtime context corresponds to views one-to-one, and its structure is identical to the recursive structure of views on the page, i.e., a tree structure.

In the runtime context, there are two types of runtime contexts created through different means:

+ metadataHandle: The unique key of the metadata runtime context, which may be provided by the `ViewAction` (page entry) or by `fields` or `actions`.
+ rootHandle: The unique key of the view runtime context, which can only be provided by the `view`.

Let's examine the possible `RuntimeContext` structures in table and form views:

**Table View RuntimeContext Structure**

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/1747620774862-2997bce5-56eb-485f-93ff-dbc0c20c6e6e.jpeg)

**Form View RuntimeContext Structure**

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/1747619635229-193ea5c3-43c3-477b-b62a-71461c9e30cf.jpeg)

`ROOT` is the root node of all runtime contexts, containing the `App` object of the Vue framework instance.

When entering a page from a menu, the `ViewAction` corresponding to the menu creates a runtime context named `metadataHandle-1`, serving as the starting point for view rendering.

When rendering a `view`, the corresponding `rootHandle` is generated; when rendering `fields` or `actions`, the corresponding `metadataHandle` is generated. This results in the `tree structure` shown in the figures above.

# II. Reference List

## (Ⅰ) RuntimeContext<`Framework`>

### 1. Attribute Definitions

#### frameworkInstance

+ **Description**: The framework instance associated with the current context (e.g., the root component instance of the frontend framework).
+ **Type**: `Framework` (generic parameter, specific type defined by the implementer).

#### routers

+ **Description**: The array of routing paths for the current context, used for navigation and path matching.
+ **Type**: `RouterPath[]` ( `RouterPath` should be defined based on business needs, typically including path strings and parameters).

#### viewAction

+ **Description**: The view action carried by the context created through navigation actions (e.g., page navigation, pop-up opening).
+ **Type**: `RuntimeViewAction` (optional, interface for view action-related definitions).

#### field

+ **Description**: The specific model field information carried by the context created through fields.
+ **Type**: `RuntimeModelField` (optional, interface for field metadata).

#### module

+ **Description**: The runtime module to which the current context belongs (e.g., business module, functional module).
+ **Type**: `RuntimeModule` (interface for module metadata, including module code, name, etc.).

#### model

+ **Description**: The runtime model associated with the current context (e.g., data model, business object).
+ **Type**: `RuntimeModel` (interface for model metadata, including field and relationship definitions).

#### virtualModels

+ **Description**: Collection of runtime virtual models (non-persistent models for temporary data processing).
+ **Type**: `Record<string, VirtualModel>` (optional, key is the model identifier, value is the virtual model instance).

#### view

+ **Description**: The runtime view associated with the current context (e.g., page, pop-up, card, etc.).
+ **Type**: `RuntimeView` (interface for view metadata, including layout, template, and interaction definitions).

#### viewLayout

+ **Description**: The layout DSL (Domain Specific Language) parsed from the runtime view, used to define the view structure.
+ **Type**: `DslDefinition | undefined` (optional, specific DSL structure defined by the view system).

#### viewDsl

+ **Description**: The template DSL parsed from the runtime view, used to define view content and logic.
+ **Type**: `DslDefinition | undefined` (optional).

#### viewTemplate

+ **Description**: The final executed view template DSL, generated by merging layout and template.
+ **Type**: `DslDefinition` (required, ensures a complete DSL definition for view rendering).

#### extendData

+ **Description**: Extended data storage for holding additional context-related information (e.g., temporary states, calculation results).
+ **Type**: `Record<string, unknown>` (key-value form, flexible type).

#### defaultValueCache

+ **Description**: Default value cache, storing default values for fields or models to avoid repeated calculations.
+ **Type**: `Record<string, unknown>` (optional, key is field/model identifier, value is the default value).

#### initialValueCache

+ **Description**: Initial value cache, storing initial values for fields or models (e.g., values during form initialization).
+ **Type**: `Record<string, unknown>` (optional).

### 2. Method Definitions

#### getModel

+ **Method Signature**: `getModel(model: string, isBelong?: boolean): GetModelResult | undefined`
+ **Description**: Retrieves the model and its context based on the model code.
+ **Parameters**:
  - `model: string`: The code (unique identifier) of the target model.
  - `isBelong?: boolean`: Whether to only search for the model in the current context and child contexts (default: `false`).
+ **Return Value**:
  - `GetModelResult`: An object containing the model instance, runtime context, and a flag indicating if it belongs to another context.
  - `undefined`: If the model is not found.

#### getModelField

+ **Method Signature**: `getModelField(data: string, isBelong?: boolean): GetModelFieldResult | undefined`
+ **Description**: Retrieves the model field and its context based on the field name.
+ **Parameters**:
  - `data: string`: The name (unique identifier in the model) of the target field.
  - `isBelong?: boolean`: Whether to only search for the field in the current context and child contexts (default: `false`).
+ **Return Value**:
  - `GetModelFieldResult`: An object containing the field instance, runtime context, and a flag indicating if it belongs to another context.
  - `undefined`: If the field is not found.

#### createFieldRuntimeContext

+ **Method Signature**: `createFieldRuntimeContext(field: RuntimeModelField): RuntimeContext`
+ **Description**: Creates a new runtime context based on the specified field (typically used in field-level operation scenarios).
+ **Parameters**:
  - `field: RuntimeModelField`: The model field instance for which to create the context.
+ **Return Value**:
  - `RuntimeContext`: The newly created field context carrying the field information.

#### deepResolve

+ **Method Signature**: `deepResolve(): void`
+ **Description**: Deeply parses the view template, recursively creating all necessary child runtime contexts (e.g., nested fields, associated models).
+ **Parameters**: None.
+ **Return Value**: `void`.

#### transfer

+ **Method Signature**: `transfer(runtimeContext: RuntimeContext, clone?: boolean)`
+ **Description**: Transfers parameters from the current context to the target runtime context.
+ **Parameters**:
  - `runtimeContext: RuntimeContext`: The target context instance.
  - `clone?: boolean`: Whether to clone parameters (default: `true` to avoid reference sharing issues).
+ **Return Value**: `void`.

#### getRequestModelFields

+ **Method Signature**: `getRequestModelFields(options?: GetRequestModelFieldsOptions): RequestModelField[]`
+ **Description**: Retrieves the list of model fields for requests (replaces the deprecated `getRequestFields`).
+ **Parameters**:
  - `options?: GetRequestModelFieldsOptions`: Filter conditions, including view type, mode, submission type, etc.
+ **Return Value**:
  - `RequestModelField[]`: Array of fields meeting the conditions, including the fields themselves and associated fields.

#### generatorVariables

+ **Method Signature**: `generatorVariables(variables?: QueryVariables): QueryVariables`
+ **Description**: Generates the Variables parameter required for requests.
+ **Parameters**:
  - `variables?: QueryVariables`: Additional Variables parameters (will be merged with context defaults).
+ **Return Value**:
  - `QueryVariables`: The final Variables parameter object.

#### getDefaultValue

+ **Method Signature**: `getDefaultValue(): Promise<Record<string, unknown>>`
+ **Description**: Asynchronously retrieves default values for fields or models (from DSL).
+ **Parameters**: None.
+ **Return Value**:
  - `Promise<Record<string, unknown>>`: A key-value object containing default values.

### 3. Related Type Descriptions

### GetModelResult

```typescript
export type GetModelResult = {
  model: RuntimeModel;
  runtimeContext: RuntimeContext;
  isOther: boolean;
};
```

### GetModelFieldResult

```typescript
export type GetModelFieldResult = {
  modelField: RuntimeModelField;
  runtimeContext: RuntimeContext;
  isOther: boolean;
};
```

### RequestModelField

```typescript
export interface RequestModelField {
  field: RuntimeModelField;
  referencesFields?: RequestModelField[];
}
```

### GetRequestModelFieldsOptions

```typescript
export interface GetRequestModelFieldsOptions {
  viewType?: ViewType;
  viewMode?: ViewMode;
  submitType?: SubmitType;
  relationUpdateType?: RelationUpdateType;
  filter?: boolean | RequestModelFieldFilterFunction;
}
```

### RequestModelFieldFilterFunction

```typescript
export type RequestModelFieldFilterFunction = (
  field: RuntimeModelField,
  viewType: ViewType,
  viewMode: ViewMode,
  submitType: SubmitType,
  relationUpdateType: RelationUpdateType
) => boolean;
```

### QueryVariables

```typescript
export interface QueryVariables extends Record<string, unknown> {
  scene?: string;
  metadata?: Record<string, VirtualModel>;
}
```