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
+ [GraphQL 入门](https://www.graphql.org/learn/)

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

**例如**

```graphql
{
  appConfigQuery {
    queryListByWrapper(queryWrapper: {rsql: "1==1"}) {
      id
    }
  }
}
```

:::warning 提示

此处 `AppConfig#queryListByWrapper` 类型是 `query`，因此第一行缺省 GraphQL 请求类型。

:::

## （五）变量（Variables）

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

## （六）片段（Fragment）

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

# 二、GraphQL 在 Oinone 中的使用

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

<table border="1" cellspacing="0" cellpadding="8" style="border-collapse: collapse; width: 100%; max-width: 1400px; margin: 20px auto;">
  <thead>
    <tr style="background-color: #f5f5f5;">
      <th style="text-align: left; font-weight: bold;">GQL 类型</th>
      <th style="text-align: left; font-weight: bold;">函数编码（fun）</th>
      <th style="text-align: left; font-weight: bold;">函数名称（name）</th>
      <th style="text-align: left; font-weight: bold;">描述</th>
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

## （三）以 queryListByWrapper 为例的 GQL 语法

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

:::warning 提示

更多关于 RSQL 相关的内容请参考：[RSQL Service](/zh-cn/DevManual/Reference/Front-EndFramework/Services/RSQL-service.md)

:::

## （四）响应结果

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

**例如**

```json
{
  "data": {
    "ganttDemoModelQuery": {
      "queryListByWrapper": [
        {
          "id": "1"
        },
        {
          "id": "2"
        },
        {
          "id": "3"
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

## （五）统一术语

以 “获取全局配置” 接口为例，我们会用 “`appConfig#queryListByWrapper`接口” 这样的方式来定位一个接口的请求，这相比于中文而言，更加准确和直观。

让我们习惯一下这样的表示方法：

+ topBarUserBlock#construct：顶部栏-获取用户头像及动作
+ viewAction#load：加载页面元数据
+ model#loadModelField：根据模型编码获取模型字段元数据
+ module#load：根据模块编码获取
+ resourceCountryGroup#queryPage：通过分页查询国家分组

# 三、使用可视化工具发起请求

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

