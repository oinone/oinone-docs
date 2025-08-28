---
title: GraphQL Service
index: true
category:
  - 研发手册
  - Reference
  - 前端API
  - Services
order: 4

---
:::warning 提示

本章内容是 Oinone Kunlun 中所有关于 `GraphQL Service` 的内容，除了本章内容之外，你还可以在下面这些章节中找到关于 `GraphQL` 部分内容。

+ “[精通前端框架 - 前端框架概览](/zh-cn/DevManual/Tutorials/MasterTheFront-endFramework/chapter1-front-end-overview.md#二、graphql协议)” 中 GraphQL 协议部分
+ [自定义 GraphQL 请求](/zh-cn/DevManual/OperationGuide/customize-graphQL-request.md) 中 GraphQL 协议部分

:::

GraphQL 协议是 Oinone 中前后端交互使用的标准协议，理解并学习 GraphQL 的语法、生成规则以及使用方法对学习 Oinone 是非常有意义的。

# 一、GraphQL 协议

## （一）什么是 GraphQL？

`GraphQL` 是一种以**结构化文本**表示的**图查询语言**。`GraphQL` 并没有和任何特定数据库或者存储引擎绑定，而是依靠你现有的代码和数据支撑。

更多参考资料：

+ [Oinone 网关协议 API](/zh-cn/DevManual/Reference/Back-EndFramework/AdvanceAPI/protocol-API.md#一-graphql-协议详解)
+ [How to GraphQL](https://www.howtographql.com/)
+ [GraphQL 入门](https://graphql.cn/learn/)

## （二）GQL 与 REST

从浏览器发起的请求来看，`GQL` 请求本质上是使用 `POST` 方式，以 `JSON` 格式进行传输的请求。这一点与 `RESTFul` 请求以 `JSON` 格式传输几乎是完全一样的。

唯一的区别是：

+ GQL 请求使用了固定结构的请求和灵活的响应，其响应结果在请求时定义。
+ RESTFul 请求使用了任意结构的请求和任意结构的响应，其响应结果在后端定义。

更多参考资料：

+ [GraphQL 和 REST 之间有何区别？](https://aws.amazon.com/cn/compare/the-difference-between-graphql-and-rest/)

## （三）为什么 Oinone 选择 GQL？

从 Web 框架发展至今，前后端架构层出不穷，Oinone 参考了最为典型的前端架构 `MVVM` （模型-视图-视图模型）并结合 “元数据驱动” 的特性，最终发现 `GQL` 提供的标准化结构和服务端路由的功能是适合 Oinone 使用的前后端协议。

### 1、一切围绕模型展开

在 “管理信息系统” 的实践过程中，我们发现任何一个列表、表单或详情都可以简单抽象为 `MVVM` 架构中对应的概念：

+ DSL：一个视图中包含的模型元数据，其对应运行时模型和字段，也就是第一个 “M”。
+ 视图（View）：这个概念不难理解，任何一个页面都可以由一个主视图构成，视图与视图之间可以并列、嵌套等等。视图也是前端元数据隔离的重要概念。
+ 数据源：在 Oinone Kunlun 中，dataSource、activeRecord 这些内置变量，对应的就是视图模型，它遵照业务类型但又不完全遵照业务类型，运行时的视图模型可以通过**真实值**和**提交值**进行分离，从而做到多样化的展示和提交。

### 2、模型函数

让我们来看一下 `viewAction#load` 在后端的定义结构：

```java
// 模型编码(model): ViewAction.MODEL_MODEL = base.ViewAction
// 模型名称(modelName): viewAction
@Model.model(ViewAction.MODEL_MODEL)
public class PageLoadAction {
    /**
     * 获取页面元数据
     *
     * @param request 请求参数, 必填参数：id
     * @return 首页元数据
     */
    @Function(openLevel = FunctionOpenEnum.API)
    @Function.Advanced(type = FunctionTypeEnum.QUERY, displayName = "加载页面")
    public ViewAction load(ViewAction request) {
        // 元数据加载过程
        return request;
    }
}
```

这里只是列举了一些关键内容，作为前端，我们只需要知道其对照关系即可，这和 `TypeScript Class` 是非常相似的。

其次，前后端沟通也是非常重要的，如果语言不通，交流的效率也会大大降低。

最后，让我们对照着浏览器发起的 `viewAction#load` 请求，看看标准格式中每个参数所代表的含义吧。

## （四）标准请求格式

在 Oinone 中，所有的请求都以下面这种标准格式进行定义，其规则是完全与模型、函数元数据保持一致的。

```graphql
${query/mutation} {
  ${modelName}${Query/Mutation} {
    ${functionName} (${arg1Name}: ${arg1Value}) {
      ${responseParameters}
    }
  }
}
```

任何一个 GraphQL 请求都只会是这两种类型中的一种：`Query` 或 `Mutation`。这取决于后端服务是如何定义这个函数的。一般的，我们要求不操作数据的请求都使用 `Query` ，其他操作（创建/更新/删除等）都使用 `Mutation` 。

**参数含义**

+ query/mutation：指定 GraphQL 请求类型，缺省为 `query` 。
+ modelName：模型名称。
+ Query/Mutation：根据 GraphQL 请求类型使用不同的后缀。
+ functionName：函数名称。
+ arg1Name/arg1Value：用于指定函数入参，可以是多个，用 “，” 分隔。
+ responseParameters：响应参数定义，从当前模型开始以 “图” 的形式定义接口的响应格式。可以用换行符或 “，” 分隔。当字段是对象或数组时，使用 “{}” 继续向下定义关联模型的字段。

## （五）标准响应结果

```json
{
    "data": {
        "${modelName}${Query/Mutation}": {
            "${functionName}": [
                {
                    "id": "1"
                }
            ]
        }
    },
    "errors": [],
    "extensions": {
        "success": true
    }
}
```

在 Oinone 中，任何一个 GraphQL 请求都是以这样的格式返回到前端的。

**参数含义**

+ data：固定键
+ modelName：模型名称。同请求参数。
+ Query/Mutation：根据 GraphQL 请求类型使用不同的后缀。同请求参数。
+ functionName：函数名称。同请求参数。
+ errors：可能出现的错误信息
+ extensions：扩展信息

## （六）变量（Variables）

一个 `GraphQL` 请求体包含两部分：`query` 和 `variables`。上一节中的内容是使用 `query` 参数进行传递的，另一部分变量的值将通过 `variables` 进行传递。

**query**

```graphql
${query/mutation} (${var1Name}: ${var1Type} [?=${var1DefaultValue}]) {
  ${modelName}${Query/Mutation} {
    ${functionName} (${arg1Name}: ${var1Name}) {
      ${responseParameters}
    }
  }
}
```

**variables**

```json
{
  "var1Name": "var1Value"
}
```

+ var1Name/var1Type：用于定义变量名称和类型。
+ var1DefaultValue：用于定义变量默认值，可选。
+ var1Value：在 variables 中定义的 var1Name 对应的值。

**例如**

**query**

```graphql
query ($model: String, $name: String, $needCompileView: Boolean = true, $needCompileMask: Boolean = true) {
  viewActionQuery {
    load(
      request: {model: $model, name: $name, needCompileView: $needCompileView, needCompileMask: $needCompileMask}
    ) {
      id
    }
  }
}
```

**variables**

```json
{
  "model": "resource.ResourceCountryGroup",
  "name": "resource#国家分组"
}
```

:::warning 提示

在 Oinone 中，GQL 发送到后端之后会进行结构化解析，通常情况下我们认为解析的损耗是远远低于路由灵活性带来的便利的。为了尽可能降低解析带来的损耗，我们将 GQL 解析结果进行了缓存，但由于参数变量的问题，缓存是完全无法命中的，而使用 Variables 可以很好的解决命中缓存的问题。

值得注意的是，使用 Variables 虽然可以命中缓存，但参数数量不宜过多。若参数过多，会导致后期维护成本变高。通常我们建议在一些参数少且固定不变的核心请求中使用变量来提升系统的整体性能，例如 `viewAction#load` 接口就是一个很典型的使用案例。

:::

## （七）片段（Fragment）

当一个 `GraphQL` 非常冗长或重复定义时，通常我们会将其定义为 `片段（Fragment）` ，让其可以在多个地方重复使用。以 `ViewAction#load` 接口为例：

```graphql
query ($model: String, $name: String, $needCompileView: Boolean = true, $needCompileMask: Boolean = true) {
  viewActionQuery {
    load(
      request: {model: $model, name: $name, needCompileView: $needCompileView, needCompileMask: $needCompileMask}
    ) {
      ...ViewAction
    }
  }
}

fragment ViewAction on ViewAction {
	id
  model
  modelName
  modelDefinition {
    ...Model
  }
  resModel
  resModelDefinition {
    ...Model
  }
}

fragment Model on ModelDefinition {
  id
  model
  name
}
```

:::warning 提示

灵活使用 `片段（Fragment）` 可以让代码更简洁。

:::

## （八）统一术语

以 “获取全局配置” 接口为例，我们会用 “`appConfig#queryListByWrapper`接口” 这样的方式来定位一个接口的请求，这相比于中文而言，更加准确和直观。

让我们习惯一下这样的表示方法：

+ topBarUserBlock#construct：顶部栏-获取用户头像及动作
+ viewAction#load：加载页面元数据
+ model#loadModelField：根据模型编码获取模型字段元数据
+ module#load：根据模块编码获取
+ resourceCountryGroup#queryPage：通过分页查询国家分组

# 二、使用可视化工具发起请求

任何一个后端服务的请求都可以通过可视化工具发起请求，类似的工具有：

+ Insomnia：[点击下载](https://insomnia.rest/download)
+ Postman：[点击下载](https://www.postman.com/downloads)

你可以自由选择任何一个支持 GraphQL 协议的可视化工具来使用。

### 1、使用Insomnia发起请求

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/1747020620993-8eababa3-6d69-42d6-ab71-f9dc71da917e.png)

### 2、使用Postman发起请求

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/1747020238431-34cf1ef9-9898-498b-9e1c-8155beb0ac7f.png)

### 3、解决可视化请求工具的登录问题

在上面的当我们发起“获取全局配置”请求时，我们发现并没有任何用户登录的验证，这是因为这个接口在用户登录页仍然需要使用，因此并不验证用户是否登录。但对于其他接口并不都是这样的，你可以用浏览器中的其他请求来验证这一点。

那么，如何进行登录呢？其实很简单，我们将登录页面发起的登录请求在请求工具中发起即可，就像下面这样：

```graphql
mutation {
	pamirsUserTransientMutation {
		login(user: { login: "admin", password: "admin" }) {
			redirect {
				id
			}
			broken
			errorMsg
			errorCode
			errorField
		}
	}
}
```

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/1747021446934-55b0dc60-e032-4e2f-8410-462bbab5b8ad.png)

:::warning 提示

登录接口的密码字段是允许使用明文传输的，这方便了我们的调试，但在页面中，密码是通过密文传输的。

:::

:::info 小贴士

请求地址：可以通过浏览器中 `Headers - General - Request URL` 的值获取。

请求方式：`POST`（绝大部分都是这个）

query 参数的获取：右键点击 query ，选中 “`复制值（Copy value）`” 可以将其直接粘贴至可视化请求工具中的 `Query` 一栏。

variables 参数的获取：右键点击 variables，选中 “`复制对象（Copy object）`” 可以将其直接粘贴至可视化请求工具中的 `Vairables` 一栏。

:::

### 4、发起Batch类型的请求

在浏览器中我们还发现有一个名为 “batch” 的请求，这表示一个批量请求，它可以一次性处理一批没有相关性的 GraphQL 请求，并分别返回对应的结果。

在请求工具中，我们使用 JSON 格式发起这样的请求即可。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/1747023952920-10633b31-c30d-4990-a093-e8d7830bc467.png)

:::warning 提示

批量请求是我们使用 `apollo-client` 工具包提供的自动批量能力，当我们在使用 `Promise` 异步时，在同一时钟周期内的相同模块的请求将被合并，自动组合为这样的批量请求。

更多关于 `HTTP请求` 的内容请参考：[HttpClient Service](/zh-cn/DevManual/Reference/Front-EndFramework/Services/httpclient-service.md)

:::

# 三、GraphQL 在 Oinone 中的使用

## （一）从模型开始

模型是所有功能的起点，让我们回顾一下 “[精通前端框架](/zh-cn/DevManual/Tutorials/MasterTheFront-endFramework/README.md)” 中使用模型，就让我们以 `GanttDemoModel` 模型为例开始吧。

这是本章使用到的模型（`GanttDemoModel`）信息：

**模型编码**：demo.gantt.GanttDemoModel

**模型名称**：ganttDemoModel

**模型所在模块名称**：demo

**模型字段**：（见下表）

| **名称**     | **API名称**   | **字段类型**   | **是否多值** | **长度（单值长度）** |
| ------------ | ------------- | -------------- | ------------ | -------------------- |
| 编码         | code          | 文本（String） | 否           | 128                  |
| 名称         | name          | 文本（String） | 否           | 128                  |
| 任务开始日期 | taskStartDate | 日期（Date）   | 否           | -                    |
| 任务结束日期 | taskEndDate   | 日期（Date）   | 否           | -                    |


:::info 小贴士

在大多数情况下，模型名称通常是通过模型编码自动生成的。其生成规则是：将 `模型编码` 通过 “.” 分隔后取最后一位，并转换为 `小驼峰` 格式。就像上面展示的模型信息那样。

:::

## （二）内置函数

对于任何一个继承自 `IdModel` 的模型，都具备了一些基础 `CRUD` 的内置函数。作为前端，我们不需要了解过多后端知识，为了方便后面内容的表述，让我们简单了解一下：

<table border="1" cellspacing="0">
        <thead>
            <tr>
                <th>GQL 类型</th>
                <th>函数编码（fun）</th>
                <th>函数名称（name）</th>
                <th>描述</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td rowspan="7">Query</td>
                <td>construct</td>
                <td>construct</td>
                <td>构造函数；初始化页面；</td>
            </tr>
            <tr>
                <td>queryPage</td>
                <td>queryPage</td>
                <td>分页查询；</td>
            </tr>
            <tr>
                <td>queryOne</td>
                <td>queryOne</td>
                <td>单条数据查询；Entity参数；</td>
            </tr>
            <tr>
                <td>queryListByWrapper</td>
                <td>queryListByWrapper</td>
                <td>条件查询列表；</td>
            </tr>
            <tr>
                <td>queryByWrapper</td>
                <td>queryOneByWrapper</td>
                <td>条件查询单条数据；</td>
            </tr>
            <tr>
                <td>countByWrapper</td>
                <td>countByWrapper</td>
                <td>根据条件统计数量；</td>
            </tr>
            <tr>
                <td>count</td>
                <td>count</td>
                <td>统计数量；Entity参数；</td>
            </tr>
            <tr>
                <td rowspan="3">Mutation</td>
                <td>create</td>
                <td>create</td>
                <td>创建函数；</td>
            </tr>
            <tr>
                <td>update</td>
                <td>update</td>
                <td>更新函数；</td>
            </tr>
            <tr>
                <td>delete</td>
                <td>delete</td>
                <td>删除函数；</td>
            </tr>
        </tbody>
    </table>

:::warning 提示

在这里我们列出来一些比较常用的可以被前端调用的默认函数。所有的函数最终都是通过 函数名称（name） 发起的。在这里我们需要注意一个特例：

+  queryByWrapper 和 queryOneByWrapper调用的是同一个函数，只是 fun 和 name 不同。

更多关于函数入参、出参等详细内容请参考：[ORM API - Common ORM Methods](/zh-cn/DevManual/Reference/Back-EndFramework/ORM-API.md#五、common-orm-methods)

:::

## （三）以 countByWrapper 为例的 GQL 语法

在 “探索前端框架 - 构建仪表盘” 章节中，我们初步接触了发起后端请求的方式。但并没有详细介绍 countByWrapper 这个内置函数对应的 GQL 语法以及参数内容。下面让我们来看一下这个函数的 GQL 语法吧。

```graphql
{
  ganttDemoModelQuery {
    countByWrapper(queryWrapper: {rsql: "1==1"})
  }
}
```

在这个 GQL 中，调用了 `ganttDemoModel` 模型的 `countByWrapper` 函数，该函数仅包含一个名为 `queryWrapper` 的对象入参，这个对象中仅传入了一个名为 `rsql` 的属性。

在 GQL 中，空返回值和基础数据类型无需声明响应参数。`countByWrapper` 的返回值是一个数字，因此在这个 GQL 中并没有声明响应参数。

值得一提的是，对于数字类型而言，后端类型定义中包含 `Integer`、`Long`、`Float`、`Double` 以及 `BigDecimal` 等多种类型，传递到前端时，由于语言精度不同，为防止精度丢失等问题，`Long` 和 `BigDecimal` 类型会通过字符串类型返回到前端。

:::warning 提示

在 `countByWrapper` 函数的声明中，其返回值为 `Long` 类型，这也就说明我们需要通过 `Number()` 函数将其转换为 `number` 类型进行返回。虽然这样的处理会有一定程度的瑕疵，但对于现有场景来说，`countByWrapper` 返回的整数最大值一般不会超过 `JavaScript` 整数的安全值，如业务场景已经明确超出安全值范畴，需通过 `bignumber.js` 等封装数据类型的工具集进行处理。

更多类型映射相关的内容请参考：[数据类型的映射](#九-数据类型的映射)

:::

**理论：函数定义与 GQL 语法**

作为第一个例子，让我们先来了解一下函数定义与 GQL 语法之间的映射关系，这样可以帮助我们更加容易理解接下来的例子。

Oinone 后端是通过 `Java` 编写的，这和我们使用的 `TypeScript` 语法几乎类似。对于前端来说学习 `Java` 语法可能比较困难，那让我们用 `TypeScript` 语法来看看定义这样的一个函数会是什么样的。

```typescript
import { QueryWrapper } from '@oinone/kunlun-dependencies';

/* 内置数据类型定义
interface QueryWrapper {
  rsql?: string;
  queryData?: ActiveRecord;
}
*/

export class GanttDemoModelAction {
  public countByWrapper(queryWrapper: QueryWrapper): number {
    // ignored code
  }
}
```

这里我们简化了很多声明的细节，主要关注的是函数名，入参、出参这些关键点。显而易见的是，它和 GQL 语法是一一对应的。

在 Oinone 中，对于内置函数的入参和出参都有与后端一一对应的类型声明，我们在实践中也可以使用这些类型声明进行操作。在这个例子中，以 `queryWrapper` 作为入参名，`QueryWrapper` 就是内置函数的入参类型，而 `rsql` 则是 `QueryWrapper` 类型中的一个属性值。

:::warning 提示

更多关于 RSQL 相关的内容请参考：[RSQL Service](/zh-cn/DevManual/Reference/Front-EndFramework/Services/RSQL-service.md)

:::

## （四）以 queryListByWrapper 为例的 GQL 语法

```graphql
{
  ganttDemoModelQuery {
    queryListByWrapper(queryWrapper: {rsql: "1==1"}) {
      id
      code
      name
      taskStartDate
      taskEndDate
    }
  }
}
```

在这个 GQL 中，调用了 `ganttDemoModel` 模型的 `queryListByWrapper` 函数，该函数仅包含一个名为 `queryWrapper` 的对象入参，这个对象中仅传入了一个名为 `rsql` 的属性。

在响应中，我们声明需要获取 `ganttDemoModel` 模型的五个字段进行返回。值得注意的是，不论是单个对象还是数组，GQL 响应参数都是平铺的，无需区分具体数据类型。

与之对应的函数定义是这样的：

```typescript
import { QueryWrapper } from '@oinone/kunlun-dependencies';

export interface GanttDemoModel {
  id: string;
  code: string;
  name: string;
  taskStartDate: string;
  taskEndDate: string;
}

export class GanttDemoModelAction {
  public queryListByWrapper(queryWrapper: QueryWrapper): GanttDemoModel[] {
    // ignored code
  }
}
```

与上一个例子不同的是，这里的返回值不再是简单类型，而是返回了一个模型对象的数组，因此我们在 GQL 中声明的响应参数也是与模型字段一一对应的。

值得一提的是，对于日期时间类型而言，后端传递到前端是以标准格式的日期时间字符串进行传输的，因此我们在类型定义中声明的 `taskStartDate` 和 `taskEndDate` 属性都是字符串类型，而不是日期类型。

:::warning 提示

函数是通过后端定义的，前端作为调用方需要通过 GQL 来决定调用的模型、函数以及函数的入参和出参。

更多关于 RSQL 相关的内容请参考：[RSQL Service](/zh-cn/DevManual/Reference/Front-EndFramework/Services/RSQL-service.md)

更多类型映射相关的内容请参考：[数据类型的映射](#九-数据类型的映射)

:::

## （五）以 queryPage 为例的 GQL 语法

上一个例子中，我们介绍了单个参数的函数对应的 GQL 语法，下面我们以 `queryPage` 为例，对多个入参以及返回值结构进行介绍。

```graphql
{
  ganttDemoModelQuery {
    queryPage(page: {currentPage: 1, size: 15}, queryWrapper: {rsql: "1==1"}) {
      content {
        id
        code
        name
        taskStartDate
        taskEndDate
      }
      totalPages
      totalElements
    }
  }
}
```

与之对应的函数定义是这样的：

```typescript
import { QueryPageResult, QueryPagination, QueryWrapper } from '@oinone/kunlun-dependencies';

export interface GanttDemoModel {
  id: string;
  code: string;
  name: string;
  taskStartDate: string;
  taskEndDate: string;
}

/* 内置数据类型定义
interface QueryPagination {
  currentPage: number;
  size: number;
  sort?: { orders: QuerySort[] };
  groupBy?: string;

  totalPages?: number;
  totalElements?: number;
}

interface QueryPageResult<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
}
*/

export class GanttDemoModelAction {
  public queryPage(page: QueryPagination, queryWrapper: QueryWrapper): QueryPageResult<GanttDemoModel> {
    // ignored code
  }
}

```

GQL 语法是通过参数名称进行映射的，而不是参数顺序：

+ 当 `queryWrapper` 入参名称发生变化时，相应的 GQL 语法中的 `queryWrapper` 也要改为相同名称才可以正常发起请求。
+ 当调换 `page` 和 `queryWrapper` 顺序时，其请求结果是完全一样的。

:::warning 提示

更多关于 RSQL 相关的内容请参考：[RSQL Service](/zh-cn/DevManual/Reference/Front-EndFramework/Services/RSQL-service.md)

:::

## （六）以 create 为例的 GQL 语法

上面我们提及的所有示例都是 Query 类型的 GQL 语法，无一例外的我们都缺省了 `query` 类型。在这个示例中，我们来看看 `Mutation` 类型的 GQL 语法。

```graphql
mutation {
  ganttDemoModelMutation {
    create(data: {code: "test", name: "test"}) {
      id
      code
      name
      taskStartDate
      taskEndDate
    }
  }
}
```

与之对应的函数定义是这样的：

```typescript
export interface GanttDemoModel {
  id: string;
  code: string;
  name: string;
  taskStartDate: string;
  taskEndDate: string;
}

export class GanttDemoModelAction {
  public create(data: Partial<GanttDemoModel>): GanttDemoModel {
    // ignored code
  }
}

/*
Partial<GanttDemoModel> 等价于
{
  id?: string;
  code?: string;
  name?: string;
  taskStartDate?: string;
  taskEndDate?: string;
}
*/
```

在创建时我们允许传入不带主键（id）的对象，并在返回值中获取主键（id），以验证其正常创建。

:::warning 提示

`Partial`是 `TypeScript` 中将对象类型中**所有属性**都转换为**可选属性**的类型声明定义。

:::

## （七）以 update 为例的 GQL 语法

与 `create` 函数的语法几乎类似，但这里需要强调的是，在更新时，必须传递主键（id）才可以更新成功。在这个例子中，我们可以通过模板语法将传入的主键（id）字段传入到 GQL 入参中，并将 `name` 更新为 `newName`。

```typescript
const gql = `mutation {
  ganttDemoModelMutation {
    update(data: {id: "${id}", name: "newName"}) {
      id
      code
      name
      taskStartDate
      taskEndDate
    }
  }
}`
```

与之对应的函数定义是这样的：

```typescript
import { IdModel } from '@oinone/kunlun-dependencies';

export interface GanttDemoModel {
  id: string;
  code: string;
  name: string;
  taskStartDate: string;
  taskEndDate: string;
}

/* 内置数据类型定义
interface IdModel {
  id?: string;
}
*/

export class GanttDemoModelAction {
  public update(data: Partial<GanttDemoModel> & Required<IdModel>): GanttDemoModel {
    // ignored code
  }
}

/*
Required<IdModel> 等价于
{
  id: string;
}
*/
```

:::warning 提示

“必须传入主键（id）才可以更新成功”这一规则是默认数据管理器函数提供的更新逻辑，具体业务中可根据实际场景进行变动。

`Required` 是 `TypeScript` 中将对象类型中**所有属性**都转换为**非空属性**的类型声明定义。当然了，这里也可以直接使用 `{ id: string }` 这样的匿名类型进行定义。

默认数据管理器函数的更新逻辑：

+ 更新条件：通过主键更新对象。
+ 更新数据：传入值决定更新值，未传入的值不会更新。
+ 关联对象创建/更新：
  - 多对一：关联字段需平铺在主模型中，对象传入无意义。
  - 一对多：需按数组对象的格式传入，必须传入主键（id），未传入的值不会更新。
  - 多对多：需按数组对象的格式传入，必须传入主键（id），其他值传入无意义。

更多关于关联关系类型的定义请参考：[ORM API - 关系类型](/zh-cn/DevManual/Reference/Back-EndFramework/ORM-API.md#4、关系类型)

:::

## （八）以 delete 为例的 GQL 语法

在上面我们介绍了对象类型作为函数入参的 GQL 语法，而 `delete` 函数支持`单行或多行`这样的数据交互类型，其入参是一个对象数组。默认删除动作仅需传入主键（id）即可完成删除操作。

仅删除一个对象的 GQL 语法：

```typescript
const gql = `mutation {
  ganttDemoModelMutation {
    delete(dataList: [{id: "${id}"}]) {
      id
      code
      name
      taskStartDate
      taskEndDate
    }
  }
}`
```

删除多个对象的 GQL 语法：

```typescript
const ids: string[] = [];

const gql = `mutation {
  ganttDemoModelMutation {
    delete(dataList: [${ids.map((id) => `{id: "${id}"}`).join(', ')}]) {
      id
      code
      name
      taskStartDate
      taskEndDate
    }
  }
}`
```

由此可见，删除多个对象不过是对数组中每个对象的结构重复执行，最终通过 “,” 拼接形成数组对象。

与之对应的函数定义是这样的：

```typescript
export interface GanttDemoModel {
  id: string;
  code: string;
  name: string;
  taskStartDate: string;
  taskEndDate: string;
}

export class GanttDemoModelAction {
  public delete(dataList: Required<IdModel>[]): GanttDemoModel[] {
    // ignored code
  }
}
```

这里我们的入参没有使用模型，而是使用一个仅具有 `id` 字段的 `IdModel` 类型，这样的类型声明可以明确调用方在传入数据时进行静态类型校验，以避免参数传递错误的问题，也可以体现后端函数的定义。

:::warning 提示

`delete` 函数的入参不同于 `create` 和 `update` 函数，其入参名称为 `dataList` ，其类型为对象数组。

使用 `IdModel` 的前提是，后端是通过继承 `IdModel` 进行 `GanttDemoModel` 模型定义的。

前端与后端都有 `IdModel` 和 `CodeModel`，并且其继承关系和字段定义是完全一样的。

:::

## （九）数据类型的映射

在 Oinone 中，针对不同字段业务类型的处理在 GQL 语法、入参以及返回值上会有明确的标准和规范，这也是前后端交互边界的重要组成部分，了解这些数据类型的关系对使用 Oinone 来说是非常重要的。

### 1、基础数据类型

下表是字段业务类型与基础数据类型的映射关系：（不包含多值、复合数据类型以及关系类型）

<table border="1" cellspacing="0">
        <thead>
            <tr>
                <th>字段业务类型</th>
                <th>Java 类型</th>
                <th>TypeScript 类型</th>
                <th>GQL 入参语法</th>
                <th>说明</th>
            </tr>
        </thead>
        <tbody>
            <!-- 整数类型合并2行 -->
            <tr>
                <td rowspan="2">整数</td>
                <td>Integer</td>
                <td>number</td>
                <td>data: 123</td>
                <td>不带双引号</td>
            </tr>
            <tr>
                <td>Long</td>
                <td>string</td>
                <td>data: "123"</td>
                <td>带双引号</td>
            </tr>
            <!-- 浮点数类型合并2行 -->
            <tr>
                <td rowspan="2">浮点数</td>
                <td>Float</td>
                <td>number</td>
                <td>data: 123.12</td>
                <td>不带双引号</td>
            </tr>
            <tr>
                <td>Double</td>
                <td>string</td>
                <td>data: "123.12"</td>
                <td>带双引号</td>
            </tr>
            <!-- 其他类型保持独立行 -->
            <tr>
                <td>金额</td>
                <td>BigDecimal</td>
                <td>string</td>
                <td>data: "123.12"</td>
                <td>返回值为六位小数的文本类型</td>
            </tr>
            <tr>
                <td>布尔</td>
                <td>Boolean</td>
                <td>boolean</td>
                <td>data: true/false</td>
                <td>不带双引号，只能是 `true` 或 `false` 。</td>
            </tr>
            <tr>
                <td>文本</td>
                <td>String</td>
                <td>string</td>
                <td>data: "test"</td>
                <td>带双引号</td>
            </tr>
            <tr>
                <td>手机</td>
                <td>String</td>
                <td>string</td>
                <td>data: "11111111111"</td>
                <td>同文本类型</td>
            </tr>
            <tr>
                <td>邮箱</td>
                <td>String</td>
                <td>string</td>
                <td>data: "admin@shushi.pro"</td>
                <td>同文本类型</td>
            </tr>
            <tr>
                <td>多行文本</td>
                <td>String</td>
                <td>string</td>
                <td>data: "test"</td>
                <td>同文本类型</td>
            </tr>
            <tr>
                <td>富文本</td>
                <td>String</td>
                <td>string</td>
                <td>data: "test"</td>
                <td>同文本类型</td>
            </tr>
            <tr>
                <td>日期时间</td>
                <td>Date</td>
                <td>string</td>
                <td>data: "2019-04-09 13:00:00"</td>
                <td>以 “YYYY-MM-DD HH:mm:ss” 格式化后的字符串</td>
            </tr>
            <tr>
                <td>日期</td>
                <td>Date</td>
                <td>string</td>
                <td>data: "2019-04-09"</td>
                <td>以 “YYYY-MM-DD” 格式化后的字符串</td>
            </tr>
            <tr>
                <td>时间</td>
                <td>Date</td>
                <td>string</td>
                <td>data: "13:00:00"</td>
                <td>以 “HH:mm:ss” 格式化后的字符串</td>
            </tr>
            <tr>
                <td>年份</td>
                <td>Date</td>
                <td>string</td>
                <td>data: "2019"</td>
                <td>以 “YYYY” 格式化后的字符串</td>
            </tr>
        </tbody>
    </table>

### 2、枚举类型（数据字典）

枚举是 Oinone 中一类特殊的数据类型，它包含名称（name）、存储值（value）、显示名称（displayName）以及帮助文案（help）这四个属性。

让我们来看一个 `name` 和 `value` 不同的枚举作为示例：（`base.Active`）

| **名称（name）** | **存储值（value）** | **显示名称（displayName）** | **帮助文案（help）** |
| ---------------- | ------------------- | --------------------------- | -------------------- |
| **ACTIVE**       | true                | 激活                        | 激活                 |
| **INACTIVE**     | false               | 无效                        | 无效                 |


在 GQL 中，前后端交互统一使用名称（name）进行传入和接收。

例如，我们在 `GanttDemoModel` 模型中增加 `status` 字段，并且它的类型为 `ActiveEnum`。

那么，它所对应的 GQL 语法为 `status: ACTIVE`，是不带双引号使用名称（name）作为值的形式。

用 `TypeScript` 类型定义可以表示为：

```typescript
import { ActiveEnum } from '@oinone/kunlun-dependencies';

export interface GanttDemoModel {
  id: string;
  code: string;
  name: string;
  taskStartDate: string;
  taskEndDate: string;
  status: ActiveEnum;
}

/* 内置数据类型定义
enum ActiveEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}
*/
```

:::warning 提示

TypeScript 中，与 Oinone 枚举对应的枚举定义通常使用 `name` 和 `value` 相同的方式进行定义，这样可以较为方便进行数据的传递。

作为前端，我们无需关心存储值在后端的使用。但显示值是我们在可选项中直观展示给用户进行选择的，而帮助文案则通常用于鼠标悬浮时的提示内容。当然了，在不同组件中，这两个预设的值也会有不同的表现形式。

:::

### 3、Map 数据类型（键值对）

键值对通常以 `JSON` 格式进行存储，前后端交互时，需要使用 `GraphqlHelper#serializableObject` 处理 JSON 对象或使用 `GraphqlHelper#serializableObjectArray` 处理 JSON 对象数组。

在传入 GQL 时，我们可以通过模板语法将对象进行序列化处理：

```typescript
import { GraphqlHelper } from '@oinone/kunlun-dependencies';

const jsonData = {
  "key1": "value1",
  "key2": "value2"
}

const gql = `mutation {
  ganttDemoModelMutation {
    update(
      data: {id: "${id}", jsonData: "${GraphqlHelper.serializableObject(jsonData)}", jsonArrayData: "${GraphqlHelper.serializableObjectArray([jsonData, jsonData])}"}
    ) {
      id
      code
      name
      taskStartDate
      taskEndDate
      jsonData
      jsonArrayData
    }
  }
}`
```

### 4、基础数据类型的多值类型

将任意的单值类型转变为数组格式即可进行多值数据的传递，数组中的每个单值的格式与基础数据类型完全相同。

数组格式：`[${value1}, ${value2}, ${value3}...]`

| **字段业务类型** | **Java 类型** | **TypeScript 类型** | **GQL 入参语法**                  |
| ---------------- | ------------- | ------------------- | --------------------------------- |
| 整数             | `List<Integer>` | number[]            | data: [1, 2, 3]                   |
|                  | `List<Long>`    | string[]            | data: ["1", "2", "3"]             |
| 浮点数           | `List<Float>`   | number[]            | data: [1.12, 2.12, 3.12]          |
|                  | `List<Double>`  | string[]            | data: ["1.12", "2.12", "3.12"]    |
| 文本             | `List<String>`  | string[]            | data: ["test1", "test2", "test3"] |


## （十）关系类型的数据提交

### 1、多对一（M2O）

#### 字段定义

假设在 `GanttDemoModel` 中有一个 `task` 字段是通过多对一关系关联了 `GanttTask` 模型。（在这里我们只需要知道 `GanttTask` 中包含 `id` 字段即可建立两个模型的关联关系）

| **名称** | **API名称** | **字段类型**    | **关联模型（references）** | **关联字段（relationFields）** | **关系字段（referenceFields）** |
| -------- | ----------- | --------------- | -------------------------- | ------------------------------ | ------------------------------- |
| 任务     | task        | 多对一（M2O）   | GanttTask                  | taskId                         | id                              |
| 任务id   | taskId      | 整数（Integer） |                            |                                |                                 |


#### 通过关联字段 taskId 更新关联关系

```typescript
const gql = `mutation {
  ganttDemoModelMutation {
    update(data: {id: "${id}", taskId: "${taskId}"}) {
      id
      code
      name
      task {
        id
        code
        name
      }
    }
  }
}`
```

由于多对一是通过在主模型存储关联字段建立两个模型之间的关系的，因此我们直接使用关联字段 `taskId` 更新即可。

#### 通过关系字段 task 更新关联关系

```typescript
export interface GanttDemoModel {
  id: string;
  code: string;
  name: string;
  taskStartDate: string;
  taskEndDate: string;
  taskId?: string;
  task?: Partial<GanttTask>[];
}

export interface GanttTask {
  id: string;
  code: string;
  name: string;
}

const gql = `mutation {
  ganttDemoModelMutation {
    update(data: {id: "${id}", task: {id: "${taskId}"}}) {
      id
      code
      name
      task {
        id
        code
        name
      }
    }
  }
}`
```

虽然这里我们并没有直接传递 `taskId` 给后端，但由于多对一是通过在主模型存储关联字段建立两个模型之间的关系的，因此，后端会主动将 `task` 对象中的 `id` 字段赋值给主模型的 `taskId` 字段，并进行保存。这样也可以做到更新两个模型之间的关联关系。

:::warning 提示

若 `taskId` 与 `task.id` 这两个值同时存在时，将以 `task.id` 为准。在实际业务使用中，我们建议使用一种方式更新关联关系即可，以避免由于规则问题造成不必要的误解。

:::

### 2、一对多（O2M）

#### 字段定义

假设在 `GanttDemoModel` 中有一个 `children` 字段通过一对多关系关联了 `GanttDemoModel` 模型。

| **名称** | **API名称** | **字段类型**    | **关联模型（references）** | **关联字段（relationFields）** | **关系字段（referenceFields）** |
| -------- | ----------- | --------------- | -------------------------- | ------------------------------ | ------------------------------- |
| 任务     | children    | 一对多（O2M）   | GanttDemoModel             | id                             | parentId                        |
| 父任务id | parentId    | 整数（Integer） |                            |                                |                                 |


#### 通过关系字段 children 更新关联关系

```typescript
const gql = `mutation {
  ganttDemoModelMutation {
    update(
      data: {id: "${id}", children: [{code: "c1", name: "c1"}, {code: "c2", name: "c2"}]}
    ) {
      id
      code
      name
      taskStartDate
      taskEndDate
      children {
        id
        parentId
        code
        name
      }
    }
  }
}`
```

由于此时我们并没有传入主键（id）字段，因此在主模型更新时，关联字段将这个数组对象进行了创建操作。

在多次更新时，我们需要先查询 `children` 对象数组的原值，然后再更新指定内容，并携带主键（id）进行提交，否则将会出现数据重复的异常提示。在这个场景中，我们通常需要动态拼接 GQL 语法，让 `children` 字段可以在 `create` 和 `update` 两种场景中同时适用。

一个较为通用的 GQL 拼接方式如下所示：

```typescript
export interface GanttDemoModel {
  id: string;
  code: string;
  name: string;
  taskStartDate: string;
  taskEndDate: string;
  parentId?: string;
  children?: Partial<GanttDemoModel>[];
}

const data: Partial<GanttDemoModel> & Required<IdModel>;

const gql = `mutation {
  ganttDemoModelMutation {
    update(data: {id: "${data.id}", children: [${
      data.children?.map((v) => `{code: "${v.code}", name: "${v.name}"${v.id ? `, id: "${v.id}"` : ''}}`).join(', ') ||
      ''
    }]}) {
      id
      code
      name
      taskStartDate
      taskEndDate
      children {
        id
        parentId
        code
        name
      }
    }
  }
}`
```

这里使用了模板语法的特征，将 `children` 对象数组拆解为一个一个的对象片段，并根据 id 可能存在的特征，将其放在对象片段的末尾，并通过 “,” 拼接形成一个对象数组的字符串格式。

:::warning 提示

对于对象或对象数组的拼接 GQL 的方式，模板语法虽然使用起来比较方便，但过于复杂的拼接逻辑也让人眼花撩乱。

别担心，在后续的学习中，我们会引入一些 GQL 工具类来优化这一问题，让原本混乱的动态构建过程变得更清晰、更简洁。

:::

#### 默认一对多关系字段的更新逻辑

+ 当关系字段中不存在主键（id）时，进行关系对象的创建操作，并绑定关联关系。
+ 当关系字段中存在主键（id）时，进行关系对象的更新操作，同时更新关联关系。
+ 当关系字段缺少某一项已经存在的对象时，解除关联关系。

### 3、多对多（M2M）

#### 字段定义

假设在 `GanttDemoModel` 中有一个 `tasks` 字段是通过多对多关系关联了 `GanttTask` 模型。（在这里我们只需要知道 `GanttTask` 中包含 `id` 字段即可建立两个模型的关联关系）

| **名称** | **API名称** | **字段类型**  | **关联模型（references）** | **中间模型（through）**    | **关联字段（relationFields）** | **中间表关联字段（throughRelationFields）** | **关系字段（referenceFields）** | **中间表关系字段（throughReferenceFields）** |
| -------- | ----------- | ------------- | -------------------------- | -------------------------- | ------------------------------ | ------------------------------------------- | ------------------------------- | -------------------------------------------- |
| 任务集   | tasks       | 多对多（M2M） | GanttTask                  | GanttDemoModelRelGanttTask | id                             | ganttId                                     | id                              | taskId                                       |


#### 中间模型（GanttDemoModelRelGanttTask）

| **名称** | **API名称** | **字段类型**    |
| -------- | ----------- | --------------- |
| 甘特图id | ganttId     | 整数（Integer） |
| 任务id   | taskId      | 整数（Integer） |


#### 通过关系字段 tasks 更新关联关系

与一对多几乎完全一样，让我们直接来看一个较为通用的 GQL 拼接方式：

```typescript
export interface GanttDemoModel {
  id: string;
  code: string;
  name: string;
  taskStartDate: string;
  taskEndDate: string;
  tasks?: Partial<GanttTask>[];
}

export interface GanttTask {
  id: string;
  code: string;
  name: string;
}

const data: Partial<GanttDemoModel> & Required<IdModel>;

const gql = `mutation {
  ganttDemoModelMutation {
    update(data: {id: "${data.id}", tasks: [${
      data.tasks?.map((v) => `{code: "${v.code}", name: "${v.name}"${v.id ? `, id: ${v.id}` : ''}}`).join(', ') || ''
    }]}) {
      id
      code
      name
      taskStartDate
      taskEndDate
      tasks {
        id
        code
        name
      }
    }
  }
}`
```

#### 默认多对多关系字段的更新逻辑

+ 当关系字段中不存在主键（id）时，进行关系对象的创建操作，并向中间表中插入关联数据绑定关联关系。
+ 当关系字段中存在主键（id）时，进行关系对象的更新操作，并更新关联关系。
+ 当更新时仅存在主键（id）时，不进行关系对象的更新操作，仅更新关联关系。
+ 当关系字段缺少某一项已经存在的对象时，删除中间表中对应的关联数据解除关联关系。

# 四、GQL 工具类的使用

在 Oinone 中，直接使用原生的 `HttpClient` 虽能以最有效的方式发起请求，但过于底层的能力在不经过封装的情况下并不是非常好用。为此，我们提供了一些工具类，来帮助我们用更方便的方式发起请求。

## （一）GQLBuilder

以 `ganttDemoModel#queryListByWrapper` 为例：

```typescript
const MODULE_NAME = 'demo';
const MODEL_NAME = 'ganttDemoModel';

public static queryListByWrapperByGQLBuilder(): Promise<GanttDemoModel[]> {
  return GQL.query(MODEL_NAME, 'queryListByWrapper')
    .buildRequest((builder) => {
      builder.buildObjectParameter('queryWrapper', (builder) => {
        builder.stringParameter('rsql', '1==1');
      });
    })
    .buildResponse((builder) => builder.parameter('id', 'code', 'name', 'taskStartDate', 'taskEndDate'))
    .request(MODULE_NAME);
}
```

在使用 GQL 时我们发现，一些字段类型在 GQL 中直接使用字符串拼接可能不那么容易，尤其是对象或者数组。因此，我们在 `GQLBuilder` 中提供了对各种类型的处理方式，在使用过程中对于参数的拼接逻辑可以无需关心。这也是最接近 `HttpClient` 发起请求的方式。

### 1、GQLBuilder API

#### GQL.query

+ **功能描述**：开始构建 `Query` 类型的 GQL。
+ **类型**：`(modelName: string, name: string, fragments?: GQLFragment[]) => QueryGQL`
+ **参数**：
  - `modelName`：模型名称
  - `name`：函数名称
+ **返回值**：构建 `Query` 类型的 `GQLBuilder`。

#### GQL.mutation

+ **功能描述**：开始构建 `Mutation` 类型的 GQL。
+ **类型**：`(modelName: string, name: string, fragments?: GQLFragment[]) => MutationGQL`
+ **参数**：
  - `modelName`：模型名称
  - `name`：函数名称
+ **返回值**：构建 `Mutation` 类型的 `GQLBuilder`。

#### GQL.fragment

+ **功能描述**：开始构建 `Fragment` 类型的 GQL 片段。
+ **类型**：`(name: string, definition: string) => GQLResponseParameterBuilder`
+ **参数**：
  - `modelName`：模型名称
  - `name`：函数名称
+ **返回值**：构建 `Fragment` 类型的 `GQLBuilder`。

#### buildRequest

构建请求参数

+ stringParameter：文本类型参数，支持单值和数组。（`string | string[] | null | undefined`）
+ numberParameter：数字类型参数，支持单值和数组。（`number | number[] | null | undefined`）
+ booleanParameter：布尔类型参数，支持单值和数组。（`boolean | boolean[] | null | undefined`）
+ enumerationParameter：枚举类型参数，支持单值和数组。（`string | string[] | null | undefined`）
+ mapParameter：Map 类型参数，支持单值和数组。（`object | object[] | null | undefined`）
+ objectParameter：任意类型参数，需处理是否带双引号以及数据结构，相当于使用参数片段。
+ buildObjectParameter：开始构建对象类型参数。（参考使用示例）
+ buildArrayParameter：开始构建数组类型参数。（参考使用示例）
+ nullParameter：空值。
+ nullArrayParameter：空数组。

:::warning 提示

在使用支持传入单值和数组的方法时，`null` 表示保留空值并构建在 GQL 中，`undefined` 表示完全不传递当前参数。

:::

#### buildResponse

构建响应参数

+ parameter：按响应参数结构快捷构建响应参数，不支持引用片段。（参考使用示例）
+ buildParameters：构建对象类型响应参数。
+ fragmentParameter：引用片段。

#### responseFragmentParameter

当整个响应结果都是一个片段时使用，引用片段名称。需配合 `buildFragment/mountFragment` 方法使用。

#### buildFragment

构建当前请求所需片段，构建方式同 `buildResponse` 方法。建议静态的 `Fragment` 通过 `mountFragment` 方法直接挂载即可。

#### mountFragment

挂载 Fragment 片段到当前请求。

#### request

发起请求。

#### toString

生成 GQL 文本。

下面我们将根据第一章节举例的所有 GQL 语法分别介绍发送相同 GQL 的情况下，如何使用 `GQLBuilder` 来发起请求。不仅如此，我们还提供了一些 `GQLBuilder` 方法的使用示例，供读者参考。

### 2、以 queryPage 为例的使用方式

```typescript
const MODULE_NAME = 'demo';
const MODEL_NAME = 'ganttDemoModel';

public static async queryPage(): Promise<QueryPageResult<GanttDemoModel[]>> {
  return GQL.query(MODEL_NAME, 'queryPage')
    .buildRequest((builder) => {
      builder.buildObjectParameter('page', (builder) => {
        builder.numberParameter('currentPage', 1).numberParameter('size', 15);
      });
      builder.buildObjectParameter('queryWrapper', (builder) => {
        builder.stringParameter('rsql', '1==1');
      });
    })
    .buildResponse((builder) => {
      builder.parameter(
        ['content', ['id', 'code', 'name', 'taskStartDate', 'taskEndDate']],
        'totalPages',
        'totalElements'
      );
    })
    .request(MODULE_NAME);
}
```

对于 `Query` 类型的 GQL，使用 `GQL#query` 方法开始构建，并分别通过 `buildRequest` 和 `buildResponse` 方法构建请求和响应参数，最后通过 `request` 方法发起请求。

对于数字类型的字段，使用 `numberParameter` 方法进行传入。

对于文本类型的字段，使用 `stringParameter` 方法进行传入。

在响应参数的定义中，`content` 作为对象类型，使用 `[string, string[]]` 格式进行声明。

如果是对象嵌套对象，可以采用数组的方式进行展开，这个数组中仅包含两个值，第一个值为字符串，指定需要展开的字段名，第二个值为数组，表示展开字段中的字段名。

例如，在 `content` 中嵌套 `task` 对象的 GQL ：

```graphql
{
  ganttDemoModelQuery {
    queryPage(page: {currentPage: 1, size: 15}, queryWrapper: {rsql: "1==1"}) {
      content {
        id
        code
        name
        taskStartDate
        taskEndDate
        task {
          id
          code
          name
        }
      }
      totalPages
      totalElements
    }
  }
}
```

我们可以用这样的方式构建响应字段：

```typescript
builder.parameter(
  ['content', ['id', 'code', 'name', 'taskStartDate', 'taskEndDate', ['task', ['id', 'code', 'name']]]],
  'totalPages',
  'totalElements'
);
```

### 3、以 create 为例的使用方式

```typescript
const MODULE_NAME = 'demo';
const MODEL_NAME = 'ganttDemoModel';

public static async create(): Promise<GanttDemoModel> {
  return GQL.mutation(MODEL_NAME, 'create')
    .buildRequest((builder) => {
      builder.buildObjectParameter('data', (builder) => {
        builder.stringParameter('code', 'test').stringParameter('name', 'test');
      });
    })
    .buildResponse((builder) => {
      builder.parameter('id', 'code', 'name', 'taskStartDate', 'taskEndDate');
    })
    .request(MODULE_NAME);
}
```

对于 `Mutation` 类型的 GQL，使用 `GQL#mutation` 方法开始构建。与 Query 类型的类似，它们都是分别通过 `buildRequest` 和 `buildResponse` 方法构建请求和响应参数，最后通过 `request` 方法发起请求。

### 4、以 update 为例的使用方式

```typescript
const MODULE_NAME = 'demo';
const MODEL_NAME = 'ganttDemoModel';

public static async update(id: string): Promise<GanttDemoModel> {
  return GQL.mutation(MODEL_NAME, 'update')
    .buildRequest((builder) => {
      builder.buildObjectParameter('data', (builder) => {
        builder.stringParameter('id', id).stringParameter('name', 'newName');
      });
    })
    .buildResponse((builder) => {
      builder.parameter('id', 'code', 'name', 'taskStartDate', 'taskEndDate');
    })
    .request(MODULE_NAME);
}
```

### 5、以 delete 为例的使用方式

```typescript
const MODULE_NAME = 'demo';
const MODEL_NAME = 'ganttDemoModel';

public static async delete(ids: string[]): Promise<GanttDemoModel[]> {
  return GQL.mutation(MODEL_NAME, 'delete')
    .buildRequest((builder) => {
      builder.buildArrayParameter('dataList', ids, (builder, id) => {
        builder.stringParameter('id', id);
      });
    })
    .buildResponse((builder) => {
      builder.parameter('id', 'code', 'name', 'taskStartDate', 'taskEndDate');
    })
    .request(MODULE_NAME);
}
```

当需要 `ids` 字符串数组转换为对象数组时，可以使用 `buildArrayParameter` 方法进行传入，构建方法的第二个参数就是数组中每项的值，接下来就和构建单个对象的使用方式完全相同了。

### 6、枚举的使用方式（数据字典）

```typescript
const MODULE_NAME = 'demo';
const MODEL_NAME = 'ganttDemoModel';

public static async update(id: string): Promise<GanttDemoModel> {
  return GQL.mutation(MODEL_NAME, 'update')
    .buildRequest((builder) => {
      builder.buildObjectParameter('data', (builder) => {
        builder.stringParameter('id', id).enumerationParameter('status', ActiveEnum.ACTIVE);
      });
    })
    .buildResponse((builder) => {
      builder.parameter('id', 'code', 'name', 'taskStartDate', 'taskEndDate');
    })
    .request(MODULE_NAME);
}
```

:::warning 提示

当枚举的值不是后端所需的枚举名称（name）时，需要使用字符串传入。

:::

### 7、Map 的使用方式（键值对）

```typescript
const MODULE_NAME = 'demo';
const MODEL_NAME = 'ganttDemoModel';

const jsonData = {
  "key1": "value1",
  "key2": "value2"
}

public static async update(id: string): Promise<GanttDemoModel> {
  return GQL.mutation(MODEL_NAME, 'update')
    .buildRequest((builder) => {
      builder.buildObjectParameter('data', (builder) => {
        builder
          .stringParameter('id', id)
          .mapParameter('jsonData', jsonData)
          .mapParameter('jsonArrayData', [jsonData, jsonData]);
      });
    })
    .buildResponse((builder) => {
      builder.parameter('id', 'code', 'name', 'taskStartDate', 'taskEndDate');
    })
    .request(MODULE_NAME);
}
```

对于 Map 数据类型的字段，使用 `mapParameter` 方法传入，可以根据入参类型自动使用之前我们用到的 `GraphqlHelper#serializableObject` 方法和 `GraphqlHelper#serializableObjectArray` 方法中的一种进行序列化。

:::warning 提示

`mapParameter` 方法需要将 `@oinone/kunlun-request` 升级到 `6.2.7` 版本以上才可以使用。低版本的用户可以使用 `stringParameter` 配合对应序列化方法传入。

例如：

`stringParameter('jsonData', GraphqlHelper.serializableObject(jsonData))`

:::

### 8、基础类型数组的使用方式

任何一个基础类型的请求参数的构建方法都支持以数组的格式传递参数。当我们需要传入一个 `ids` 数组作为请求参数时，我们可以通过下面这样的方式发起请求：

```typescript
const MODULE_NAME = 'demo';
const MODEL_NAME = 'ganttDemoModel';

public static async update(id: string, ids: string[]): Promise<GanttDemoModel> {
  return GQL.mutation(MODEL_NAME, 'update')
    .buildRequest((builder) => {
      builder.buildObjectParameter('data', (builder) => {
        builder.stringParameter('id', id).stringParameter('ids', ids);
      });
    })
    .buildResponse((builder) => {
      builder.parameter('id', 'code', 'name', 'ids');
    })
    .request(MODULE_NAME);
}
```

### 9、对象类型的使用方式

```typescript
const MODULE_NAME = 'demo';
const MODEL_NAME = 'ganttDemoModel';

public static async update(id: string, taskId: string): Promise<GanttDemoModel> {
  return GQL.mutation(MODEL_NAME, 'update')
    .buildRequest((builder) => {
      builder.buildObjectParameter('data', (builder) => {
        builder.stringParameter('id', id)
          .buildObjectParameter('task', (builder) => {
            builder.stringParameter('id', taskId);
          });
      });
    })
    .buildResponse((builder) => {
      builder.parameter('id', 'code', 'name', ['task', ['id', 'code', 'name']]);
    })
    .request(MODULE_NAME);
}
```

对于对象类型的字段，使用 `buildObjectParameter` 方法开始构建对象中的每个参数。

### 10、对象数组类型的使用方式

```typescript
const MODULE_NAME = 'demo';
const MODEL_NAME = 'ganttDemoModel';

public static async update(data: Partial<GanttDemoModel> & Required<IdModel>): Promise<GanttDemoModel> {
  return GQL.mutation(MODEL_NAME, 'update')
    .buildRequest((builder) => {
      builder.buildObjectParameter('data', (builder) => {
        builder.stringParameter('id', data.id)
          .buildArrayParameter('children', data.children, (builder, child) => {
            builder
              .stringParameter('id', child.id)
              .stringParameter('code', child.code)
              .stringParameter('name', child.name);
          });
      });
    })
    .buildResponse((builder) => {
      builder.parameter('id', 'code', 'name', 'taskStartDate', 'taskEndDate', [
        'children',
        ['id', 'parentId', 'code', 'name']
      ]);
    })
    .request(MODULE_NAME);
}
```

对于对象数组类型的字段，可以使用 `buildArrayParameter` 方法进行传入，构建方法的第二个参数就是数组中每项的值，接下来就和构建单个对象的使用方式完全相同了。

## （二）GenericFunctionService

在实践过程中，我们发现 `GQL` 发起请求相比于 `Ajax/Axios` 发起请求，还是有些麻烦的。那么，有没有一种方式可以让我们像使用 `Ajax/Axios` 一样发起请求呢？

让我们使用 `GenericFunctionService` 像 `Ajax/Axios` 一样发起 GQL 请求吧：

```typescript
public static queryListByWrapper(): Promise<GanttDemoModel[] | undefined> {
  return GenericFunctionService.INSTANCE.simpleExecuteByName(MODEL_MODEL, 'queryListByWrapper', {
    rsql: '1==1'
  });
}
```

一个标准的 `Ajax/Axios` 请求包含 `请求路径（URL）` 、 `请求方式（HttpMethod）` 以及 `请求体（Body）` 。与 `Ajax/Axios` 发起一个请求类似， `simpleExecuteByName` 接受两个及两个以上的参数，前面两个参数分别是`命名空间`和`函数名称`，类似于`请求路径（URL）`。后面可以接入任意数量的参数，类似于`请求体（Body）`。而`请求方式（HttpMethod）`固定使用 `POST`，无需显式指定。

### 1、GenericFunctionService API

#### execute

+ **功能描述**：执行任意函数。
+ **类型**：`<T>(functionDefinition: RuntimeFunctionDefinition, options: GenericFunctionOptions, ...args: unknown[]) => Promise<T | undefined>`
+ **参数**：
  - `functionDefinition`：指定函数定义，通过 `FunctionCache` 获取。
  - `options`：执行函数可选项。
  - `...args`：任意长度入参，同函数定义顺序传入。
+ **返回值**：函数请求结果。

#### executeByFun

+ **功能描述**：通过指定命名空间和函数编码执行函数。
+ **类型**：`<T>(namespace: string, fun: string, options: GenericFunctionOptions, ...args: unknown[]) => Promise<T | undefined>`
+ **参数**：
  - `namespace`：指定执行函数命名空间。
  - `fun`：指定执行函数编码。
  - `options`：执行函数可选项。
  - `...args`：任意长度入参，同函数定义顺序传入。
+ **返回值**：函数请求结果。

#### executeByName

+ **功能描述**：通过指定命名空间和函数名称执行函数。
+ **类型**：`<T>(namespace: string, name: string, options: GenericFunctionOptions, ...args: unknown[]) => Promise<T | undefined>`
+ **参数**：
  - `namespace`：指定执行函数命名空间。
  - `fun`：指定执行函数编码。
  - `options`：执行函数可选项。
  - `...args`：任意长度入参，同函数定义顺序传入。
+ **返回值**：函数请求结果。

#### simpleExecute

+ **功能描述**：执行任意函数，使用默认执行函数可选项。
+ **类型**：`<T>(functionDefinition: RuntimeFunctionDefinition, ...args: unknown[]) => Promise<T | undefined>`
+ **参数**：
  - `functionDefinition`：指定函数定义，通过 `FunctionCache` 获取。
  - `...args`：任意长度入参，同函数定义顺序传入。
+ **返回值**：函数请求结果。

#### simpleExecuteByFun

+ **功能描述**：通过指定命名空间和函数编码执行函数，使用默认执行函数可选项。
+ **类型**：`<T>(namespace: string, fun: string, ...args: unknown[]) => Promise<T | undefined>`
+ **参数**：
  - `namespace`：指定执行函数命名空间。
  - `fun`：指定执行函数编码。
  - `...args`：任意长度入参，同函数定义顺序传入。
+ **返回值**：函数请求结果。

#### simpleExecuteByName

+ **功能描述**：通过指定命名空间和函数名称执行函数，使用默认执行函数可选项。
+ **类型**：`<T>(namespace: string, name: string, ...args: unknown[]) => Promise<T | undefined>`
+ **参数**：
  - `namespace`：指定执行函数命名空间。
  - `fun`：指定执行函数编码。
  - `...args`：任意长度入参，同函数定义顺序传入。
+ **返回值**：函数请求结果。

下面我们将根据第一章节举例的所有 GQL 语法分别介绍发送相同 GQL 的情况下，如何使用 `GenericFunctionService` 来发起 GQL 请求。

### 2、以 queryPage 为例的使用方式

```typescript
const MODEL_MODEL = 'demo.gantt.GanttDemoModel';

public static async queryPage(): Promise<QueryPageResult<GanttDemoModel[]> | undefined> {
  return GenericFunctionService.INSTANCE.simpleExecuteByName(
    MODEL_MODEL,
    'queryPage',
    {
      currentPage: 1,
      size: 15
    },
    {
      rsql: '1==1'
    }
  );
}
```

在我们之前 GQL 语法的学习中，我们知道 `queryPage` 函数具备两个入参，按顺序分别为：`QueryPagination` 和 `QueryWrapper` ，在上面的示例中，我们使用 `simpleExecuteByName` 方法发起调用，并根据顺序传入对应参数即可。

泛化函数服务的方法采用泛型返回值，在 TypeScript 类型推断中，只要我们定义了函数返回值的类型声明，就可以做到自动推断，我们建议单个服务的调用方法也尽可能的声明其出入参的类型。

:::warning 提示

泛化函数服务为了避免参数名称的变化导致请求出现异常，因此通过可变入参的顺序匹配函数入参名称，以此达到发起任意请求的目的。

虽然在函数的元数据定义中，每个入参都标记了对应模型编码，但由于 `JavaScript` 本身没有类型概念，因此这或许是我们能做到的最优方案了。

:::

### 3、以 create 为例的使用方式

```typescript
const MODEL_MODEL = 'demo.gantt.GanttDemoModel';

public static async create(): Promise<GanttDemoModel | undefined> {
  return GenericFunctionService.INSTANCE.simpleExecuteByName(MODEL_MODEL, 'create', {
    code: 'test',
    name: 'test'
  });
}
```

在这个例子中，我们通过平铺 `create` 函数对应的入参来表示其结构，下面的例子也都是如此。

通常我们是需要使用函数入参来构造所需创建的对象的。

### 4、以 update 为例的使用方式

```typescript
const MODEL_MODEL = 'demo.gantt.GanttDemoModel';

public static async update(id: string): Promise<GanttDemoModel | undefined> {
  return GenericFunctionService.INSTANCE.simpleExecuteByName(MODEL_MODEL, 'update', {
    id,
    name: 'newName'
  });
}
```

### 5、以 delete 为例的使用方式

```typescript
const MODEL_MODEL = 'demo.gantt.GanttDemoModel';

public static async delete(ids: string[]): Promise<GanttDemoModel[] | undefined> {
  return GenericFunctionService.INSTANCE.simpleExecuteByName(
    MODEL_MODEL,
    'delete',
    ids.map((id) => ({ id }))
  );
}
```

在我们之前 GQL 语法的学习中，我们知道 `delete` 函数是通过传入 `dataList` 对象数组进行调用的，因此我们在使用泛化函数服务时也需要遵循对应的数据类型。

那么，当我们传入 `ids` 字符串数组时，我们需要通过将其转换为对象数组类型传入 `delete` 函数的第一个参数。

### 6、枚举的使用方式（数据字典）

```typescript
const MODEL_MODEL = 'demo.gantt.GanttDemoModel';

public static async update(id: string): Promise<GanttDemoModel | undefined> {
  return GenericFunctionService.INSTANCE.simpleExecuteByName(MODEL_MODEL, 'update', {
    id,
    status: ActiveEnum.ACTIVE
  });
}
```

使用泛化函数服务时，我们不再需要关心数据类型的转换问题，枚举按照声明的类型直接传入即可。

:::warning 提示

当枚举的值不是后端所需的枚举名称（name）时，需要使用字符串传入。

:::

### 7、Map 的使用方式（键值对）

```typescript
const MODEL_MODEL = 'demo.gantt.GanttDemoModel';

const jsonData = {
  "key1": "value1",
  "key2": "value2"
}

public static async update(id: string): Promise<GanttDemoModel | undefined> {
  return GenericFunctionService.INSTANCE.simpleExecuteByName(MODEL_MODEL, 'update', {
    id,
    jsonData,
    jsonArrayData: [jsonData, jsonData]
  });
}
```

使用泛化函数服务时，我们不再需要关心数据类型的转换问题，Map 数据类型也可以轻松传递，而无需关心是否需要使用序列化方法。

### 8、多层级嵌套

```typescript
const MODEL_MODEL = 'demo.gantt.GanttDemoModel';

public static async create(): Promise<GanttDemoModel | undefined> {
  return GenericFunctionService.INSTANCE.executeByName(
    MODEL_MODEL,
    'create',
    { deep: 2 },
    {
      code: 'test',
      name: 'test',
      children: [
        { code: 'c1', name: 'c1' },
        {
          code: 'c2',
          name: 'c2',
          children: [
            {
              code: 'c2-1',
              name: 'c2-1'
            },
            {
              code: 'c2-2',
              name: 'c2-2'
            }
          ]
        }
      ]
    }
  );
}
```

当我们传入一个对象的层级深度超过 `1` 层时，虽然请求可以完整的发出，但响应体并不能根据请求对象完整构造。若我们继续使用之前的 `simpleExecuteByName` 方法发起这个请求，在返回结果中会发现丢失了 `c2` 这个对象的 `children` 参数。

因此，为了可以完整获取更深层级的响应体对象，我们使用 `executeByName` 方法，并传入 `deep` 属性为 `2`，则可以得到一个较为完整的响应体对象。

:::warning 提示

`deep` 参数用于自动获取响应字段的层级，默认为 `1`，即从当前模型开始仅查询一层关联关系，在大多数情况下这是够用的。当需要获取更深层级的响应体对象时，需要警惕使用 deep 参数带来的性能损耗问题，尤其是较多关联关系字段的模型中尤其明显。

:::

