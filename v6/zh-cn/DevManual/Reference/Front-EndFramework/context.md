---
title: 上下文（Context）
index: true
category:
  - 研发手册
  - Reference
  - 前端API
order: 3

---
在 Oinone Kunlun 中，“上下文”（context）是一个重要概念：它为组件提供了渲染、配置、以及元数据等信息，以便系统的任何组件都能对于这些信息做出适当的行为。从某种意义上说，它就像一个传播到各处的信息包。这在某些场景中非常有用。例如让输入框可以在表单和详情中表现的有所区别，或在组件中激活 / 禁用某些功能。

Web 客户端中存在两种不同的上下文：运行时上下文（RuntimeContext）和某些组件配置上下文（context）。因此，我们在使用 “上下文” 一词时需要谨慎——根据具体场景，它可能指代不同的含义。

我们在这里提到的 “上下文” 特指 “运行时上下文”（RuntimeContext）。

# 一、运行时上下文（RuntimeContext）

运行时上下文是与视图一一对应的，它所表现的结构和视图在页面上递归时表现的结构完全相同。即树形结构。

在运行时上下文中，有两类运行时上下文，它们是通过不同的方式进行创建的：

+ metadataHandle：元数据运行时上下文唯一键，它可能通过 `页面入口（ViewAction）` 提供，也可能通过 `字段（field）` 或 `动作（action）` 提供。
+ rootHandle：视图运行时上下文唯一键，它仅可能通过 `视图（view）` 提供。

下面让我们来分别看一下表格和表单视图中可能的 `RuntimeContext` 结构：

**表格视图 RuntimeContext 结构**

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/1747620774862-2997bce5-56eb-485f-93ff-dbc0c20c6e6e.jpeg)

**表单视图 RuntimeContext 结构**

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/1747619635229-193ea5c3-43c3-477b-b62a-71461c9e30cf.jpeg)

`ROOT` 是所有运行时上下文的根节点，它包含了 `Vue` 框架实例 `App` 对象。

当我们从菜单进入页面时，菜单对应的 `ViewAction` 则创建一个名为 `metadataHandle-1` 的运行时上下文，从这里作为起点开始渲染视图。

当渲染到 `视图（View）` 时，将生成对应的 `rootHandle`，当渲染到 `字段（Field）` 或 `动作（Action）` 时，将生成对应的 `metadataHandle`。

由此将产生如上图所示的 `树形结构` 。

# 二、Reference List

## （一）RuntimeContext<`Framework`>

### 1、属性定义

#### frameworkInstance

+ **描述**：当前上下文关联的框架实例（如前端框架的根组件实例）。
+ **类型**：`Framework`（泛型参数，具体类型由实现方定义）。

#### routers

+ **描述**：当前上下文的路由路径数组，用于导航和路径匹配。
+ **类型**：`RouterPath[]`（`RouterPath`需根据业务定义，通常包含路径字符串和参数）。

#### viewAction

+ **描述**：通过跳转动作创建的上下文携带的视图动作（如页面跳转、弹窗打开等）。
+ **类型**：`RuntimeViewAction`（可选，视图动作相关接口需额外定义）。

#### field

+ **描述**：通过字段创建的上下文携带的具体模型字段信息。
+ **类型**：`RuntimeModelField`（可选，字段元数据接口）。

#### module

+ **描述**：当前上下文所属的运行时模块（如业务模块、功能模块）。
+ **类型**：`RuntimeModule`（模块元数据接口，包含模块编码、名称等）。

#### model

+ **描述**：当前上下文关联的运行时模型（如数据模型、业务对象）。
+ **类型**：`RuntimeModel`（模型元数据接口，包含字段、关系等定义）。

#### virtualModels

+ **描述**：运行时虚拟模型集合（非持久化模型，用于临时数据处理）。
+ **类型**：`Record<string, VirtualModel>`（可选，键为模型标识，值为虚拟模型实例）。

#### view

+ **描述**：当前上下文关联的运行时视图（如页面、弹窗、卡片等）。
+ **类型**：`RuntimeView`（视图元数据接口，包含布局、模板、交互定义）。

#### viewLayout

+ **描述**：从运行时视图解析出的布局 DSL（Domain Specific Language），用于定义视图结构。
+ **类型**：`DslDefinition | undefined`（可选，具体 DSL 结构由视图系统定义）。

#### viewDsl

+ **描述**：从运行时视图解析出的模板 DSL，用于定义视图内容和逻辑。
+ **类型**：`DslDefinition | undefined`（可选）。

#### viewTemplate

+ **描述**：最终执行的视图模板 DSL，由布局和模板合并生成。
+ **类型**：`DslDefinition`（必填，确保视图渲染时有完整的 DSL 定义）。

#### extendData

+ **描述**：扩展数据存储，用于存放上下文相关的额外信息（如临时状态、计算结果）。
+ **类型**：`Record<string, unknown>`（键值对形式，类型灵活）。

#### defaultValueCache

+ **描述**：默认值缓存，存储字段或模型的默认值，避免重复计算。
+ **类型**：`Record<string, unknown>`（可选，键为字段 / 模型标识，值为默认值）。

#### initialValueCache

+ **描述**：初始值缓存，存储字段或模型的初始值（如表单初始化时的值）。
+ **类型**：`Record<string, unknown>`（可选）。

### 2、方法定义

#### getModel

+ **方法签名**：`getModel(model: string, isBelong?: boolean): GetModelResult | undefined`
+ **描述**：根据模型编码获取模型及其所在上下文。
+ **参数**：
  - `model: string`：目标模型的编码（唯一标识）。
  - `isBelong?: boolean`：是否仅查找当前上下文及子上下文的模型（默认值：`false`）。
+ **返回值**：
  - `GetModelResult`：包含模型实例、运行时上下文和是否为其他上下文标志的对象。
  - `undefined`：若模型未找到。

#### getModelField

+ **方法签名**：`getModelField(data: string, isBelong?: boolean): GetModelFieldResult | undefined`
+ **描述**：根据字段名称获取模型字段及其所在上下文。
+ **参数**：
  - `data: string`：目标字段的名称（在模型中的唯一标识）。
  - `isBelong?: boolean`：是否仅查找当前上下文及子上下文的字段（默认值：`false`）。
+ **返回值**：
  - `GetModelFieldResult`：包含字段实例、运行时上下文和是否为其他上下文标志的对象。
  - `undefined`：若字段未找到。

#### createFieldRuntimeContext

+ **方法签名**：`createFieldRuntimeContext(field: RuntimeModelField): RuntimeContext`
+ **描述**：基于指定字段创建新的运行时上下文（通常用于字段级操作场景）。
+ **参数**：
  - `field: RuntimeModelField`：需创建上下文的模型字段实例。
+ **返回值**：
  - `RuntimeContext`：新创建的字段上下文，携带该字段信息。

#### deepResolve

+ **方法签名**：`deepResolve(): void`
+ **描述**：深度解析视图模板，递归创建所有必要的子运行时上下文（如嵌套字段、关联模型）。
+ **参数**：无。
+ **返回值**：`void`。

#### transfer

+ **方法签名**：`transfer(runtimeContext: RuntimeContext, clone?: boolean)`
+ **描述**：将当前上下文的参数传输到目标运行时上下文。
+ **参数**：
  - `runtimeContext: RuntimeContext`：目标上下文实例。
  - `clone?: boolean`：是否克隆参数（默认值：`true`，避免引用共享问题）。
+ **返回值**：`void`。

#### getRequestModelFields

+ **方法签名**：`getRequestModelFields(options?: GetRequestModelFieldsOptions): RequestModelField[]`
+ **描述**：获取用于请求的模型字段列表（替代已废弃的`getRequestFields`）。
+ **参数**：
  - `options?: GetRequestModelFieldsOptions`：筛选条件，包括视图类型、模式、提交类型等。
+ **返回值**：
  - `RequestModelField[]`：符合条件的字段数组，包含字段本身及关联字段。

#### generatorVariables

+ **方法签名**：`generatorVariables(variables?: QueryVariables): QueryVariables`
+ **描述**：生成请求所需的 Variables 参数。
+ **参数**：
  - `variables?: QueryVariables`：额外传入的 Variables 参数（将与上下文默认值合并）。
+ **返回值**：
  - `QueryVariables`：最终的 Variables 参数对象。

#### getDefaultValue

+ **方法签名**：`getDefaultValue(): Promise<Record<string, unknown>>`
+ **描述**：异步获取字段或模型的默认值（从 DSL 中获取）。
+ **参数**：无。
+ **返回值**：
  - `Promise<Record<string, unknown>>`：包含默认值的键值对对象。

### 3、涉及类型说明

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









