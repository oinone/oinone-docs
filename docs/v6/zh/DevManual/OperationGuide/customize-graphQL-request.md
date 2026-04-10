---
title: 自定义GraphQL请求
index: true
category:
  - 研发手册
  - 操作指南
order: 4
---
让我们回想一下在 “[Build a dashboard](/zh/DevManual/Tutorials/DiscoverTheFront-endFramework/chapter2-build-a-dashboard.md)” 章节我们初步接触的 “[发起一个后端请求](/zh/DevManual/Tutorials/DiscoverTheFront-endFramework/chapter2-build-a-dashboard.md#281b6b21)” 的理论内容，我们通过 `GenericFunctionService` 服务实例较为方便的发起了一个后端请求。在本章内容中，我们将对 GraphQL 请求进行较为详细的介绍。

为了方便描述，以下内容将 GraphQL 简称为 GQL。

除了使用 `GenericFunctionService` 服务实例发起请求之外，我们还需要了解：

+ GQL 的 `schema` 在 Oinone 中的生成规则
+ 通过 `HttpClient` 发起 GQL 请求
+ 通过 `window.open` 使用 GET 方式发起 GQL 请求
+ GQL 工具类的使用
+ 通过 `RuntimeContext` 上下文根据当前页面元数据发起 GQL 请求

# 一、GraphQL协议

在 Oinone 中，所有功能都是通过一系列元数据来驱动的，以 `GQL` 作为前后端交互协议，相比于 `RESTFul` 有一定的优势。即：前端可以通过 `GQL` 来定义响应数据集。

在学习本章内容之前，你需要对 `GQL` 有一个初步的认识：

+ 参考 “[Front-End Overview](/zh/DevManual/Tutorials/MasterTheFront-endFramework/chapter1-front-end-overview.md#a74eed2c)” GraphQL协议部分。
+ 参考 “[GraphQL 学习](https://graphql.cn/learn)” 官方文档。
+ 参考 “[GraphQL 和 REST 之间有何区别](https://aws.amazon.com/cn/compare/the-difference-between-graphql-and-rest/)” 进一步了解。

## （一）从模型开始

模型是所有功能的起点，让我们回顾一下 “[精通前端框架](/zh/DevManual/Tutorials/MasterTheFront-endFramework/README.md)” 中使用模型，就让我们以 `GanttDemoModel` 模型为例开始吧。

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

:::warning 提示

更多关于模型的概述内容请参考：[Front-End Overview](/zh/DevManual/Tutorials/MasterTheFront-endFramework/chapter1-front-end-overview.md#e5020d9e)

更多关于模型字段类型的内容请参考：[字段 Field](/zh/DevManual/Reference/Back-EndFramework/ORM-API.md#0d964e66)

:::

## （二）内置函数

对于任何一个继承自 `IdModel` 的模型，都具备了一些基础 `CRUD` 的内置函数。作为前端，我们不需要了解过多后端知识，为了方便后面内容的表述，让我们简单了解一下：
<table >
        <thead>
            <tr>
                <th>GQL 类型</th>
                <th>函数编码（fun）</th>
                <th>函数名称（name）</th>
                <th>描述</th>
            </tr>
        </thead>
        <tbody>
            <!-- Query类型的行，合并7行 -->
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
            <!-- Mutation类型的行，合并3行 -->
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

更多关于函数入参、出参等详细内容请参考：[ORM API - Common ORM Methods](/zh/DevManual/Reference/Back-EndFramework/ORM-API.md#261b1eaf)

:::

## （三）标准 GQL 语法格式

再让我们回顾一下之前提到的语法格式：

```graphql
${query/mutation} {
  ${modelName}${Query/Mutation} {
    ${functionName} (${arg1Name}: ${arg1Value}) {
      ${responseParameters}
    }
  }
}
```

在 Oinone 中，任何一个 GraphQL 请求都只会是这两种类型中的一种：`Query` 或 `Mutation`。这取决于后端服务是如何定义这个函数的。一般的，我们要求不操作数据的请求都使用 `Query` ，其他操作（创建/更新/删除等）都使用 `Mutation` 。

**参数含义**

+ query/mutation：指定 GraphQL 请求类型，缺省为 `query` 。
+ modelName：模型名称。在 `appConfigQuery` 中，`appConfig` 就是模型名称。
+ Query/Mutation：根据 GraphQL 请求类型使用不同的后缀。在 `appConfigQuery` 中，由于这个函数为 `query` 类型，所以使用 `Query` 后缀。
+ functionName：函数名称。
+ arg1Name/arg1Value：用于指定函数入参，可以是多组，用 “，” 分隔。
+ responseParameters：响应参数定义，从当前模型开始以 “图” 的形式定义接口的响应格式。可以用换行符或 “，” 分隔。当字段是对象或数组时，使用 “{}” 继续向下定义关联模型的字段。如：`sideBarTheme` 字段是一个对象，里面有 `mode` 和 `theme` 这两个字段。

下面我们对常用的一些内置函数为例进行 GQL 语法的详细介绍。

## （四）以 countByWrapper 为例的 GQL 语法

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

更多类型映射相关的内容请参考：[数据类型的映射](#89c8bfc3)

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

更多关于 RSQL 相关的内容请参考：[RSQL Service](/zh/DevManual/Reference/Front-EndFramework/Services/RSQL-service.md)

:::

## （五）以 queryListByWrapper 为例的 GQL 语法

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

更多关于 RSQL 相关的内容请参考：[RSQL Service](/zh/DevManual/Reference/Front-EndFramework/Services/RSQL-service.md)

更多类型映射相关的内容请参考：[数据类型的映射](#89c8bfc3)

:::

## （六）以 queryPage 为例的 GQL 语法

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

更多关于 RSQL 相关的内容请参考：[RSQL Service](/zh/DevManual/Reference/Front-EndFramework/Services/RSQL-service.md)

:::

## （七）以 create 为例的 GQL 语法

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

## （八）以 update 为例的 GQL 语法

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

更多关于关联关系类型的定义请参考：[ORM API - 关系类型](/zh/DevManual/Reference/Back-EndFramework/ORM-API.md#cc347a8a)

:::

## （九）以 delete 为例的 GQL 语法

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

## （十）数据类型的映射

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
            <!-- 整数类型，合并2行 -->
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
            <!-- 浮点数类型，合并2行 -->
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
            <!-- 金额类型 -->
            <tr>
                <td>金额</td>
                <td>BigDecimal</td>
                <td>string</td>
                <td>data: "123.12"</td>
                <td>返回值为六位小数的文本类型</td>
            </tr>
            <!-- 布尔类型 -->
            <tr>
                <td>布尔</td>
                <td>Boolean</td>
                <td>boolean</td>
                <td>data: true/false</td>
                <td>不带双引号，只能是 `true` 或 `false` 。</td>
            </tr>
            <!-- 文本类型 -->
            <tr>
                <td>文本</td>
                <td>String</td>
                <td>string</td>
                <td>data: "test"</td>
                <td>带双引号</td>
            </tr>
            <!-- 手机类型 -->
            <tr>
                <td>手机</td>
                <td>String</td>
                <td>string</td>
                <td>data: "11111111111"</td>
                <td>同文本类型</td>
            </tr>
            <!-- 邮箱类型 -->
            <tr>
                <td>邮箱</td>
                <td>String</td>
                <td>string</td>
                <td>data: "admin@shushi.pro"</td>
                <td>同文本类型</td>
            </tr>
            <!-- 多行文本类型 -->
            <tr>
                <td>多行文本</td>
                <td>String</td>
                <td>string</td>
                <td>data: "test"</td>
                <td>同文本类型</td>
            </tr>
            <!-- 富文本类型 -->
            <tr>
                <td>富文本</td>
                <td>String</td>
                <td>string</td>
                <td>data: "test"</td>
                <td>同文本类型</td>
            </tr>
            <!-- 日期时间类型 -->
            <tr>
                <td>日期时间</td>
                <td>Date</td>
                <td>string</td>
                <td>data: "2019-04-09 13:00:00"</td>
                <td>以 “YYYY-MM-DD HH:mm:ss” 格式化后的字符串</td>
            </tr>
            <!-- 日期类型 -->
            <tr>
                <td>日期</td>
                <td>Date</td>
                <td>string</td>
                <td>data: "2019-04-09"</td>
                <td>以 “YYYY-MM-DD” 格式化后的字符串</td>
            </tr>
            <!-- 时间类型 -->
            <tr>
                <td>时间</td>
                <td>Date</td>
                <td>string</td>
                <td>data: "13:00:00"</td>
                <td>以 “HH:mm:ss” 格式化后的字符串</td>
            </tr>
            <!-- 年份类型 -->
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
|                  | `List<Double>` | string[]            | data: ["1.12", "2.12", "3.12"]    |
| 文本             | `List<String>`  | string[]            | data: ["test1", "test2", "test3"] |


## （十一）关系类型的数据提交

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

# 二、通过 HttpClient 发起 GQL 请求

让我们先把上一节中定义的那段 GQL 发送到后端，我们可以这样做：

1. 使用 `HttpClient#getInstance` 获取 `HttpClient` 实例。
2. 根据模型所在模块确定 `模块名称` 。
3. 定义模型类型，建议所有类型统一在 `src/types` 目录下定义。
4. 使用 Class 定义方法并发起请求，建议所有服务统一在 `src/service` 目录下定义。

下面这段代码演示了如何通过 `HttpClient` 发起 GQL 请求以及获取请求结果：

```typescript
import { HttpClient } from '@oinone/kunlun-dependencies';

const http = HttpClient.getInstance();

const MODULE_NAME = 'demo';

export class GanttDemoModelService {
  public static async queryListByWrapper(): Promise<GanttDemoModel[]> {
    const gql = `{
  ganttDemoModelQuery {
    queryListByWrapper(queryWrapper: {rsql: "1==1"}) {
      id
      code
      name
      taskStartDate
      taskEndDate
    }
  }
}`;
    const res = await http.query<GanttDemoModel[]>(MODULE_NAME, gql);
    return res.data['ganttDemoModelQuery']['queryListByWrapper'];
  }
}
```

由此我们可以看到，这是未经过任何封装的最底层使用的请求方式，它往往也是最有效的请求方式。

:::warning 提示

在这个例子中，你可以任意删减 `responseParameters` 中定义的字段，并查看响应结果的区别。不仅如此，你也可以尝试将上面提到的各种 GQL 语法作为练习内容发送请求到后端。

更多关于 HttpClient 的内容请参考：[HttpClient Service](/zh/DevManual/Reference/Front-EndFramework/Services/httpclient-service.md)

:::

# 三、使用 GET 方式发起 GQL 请求

对于所有使用 `HttpClient` 服务实例发起的请求都是 `POST` 方式，那么，什么情况下我们需要使用 `GET` 方式呢？一般情况下，当我们需要依靠后端服务进行 `同步下载文件` 时才需要使用到 `GET` 方式。

和之前我们解析浏览器请求时提到的 GQL 请求的两部分：`query` 和 `variables` 。对于 GET 方式，我们只需要将对应的参数拼接在 URL 后作为请求参数即可。

由于我们并不能轻易找到一个可以用来练习的例子，因此在我们这个例子中，我们将上一小节对应的 `GQL` 通过 `GET` 方式打开，其返回的是 `JSON` 结构的数据。就像下面这样：

```typescript
public static queryListByWrapperByWindowOpen(): void {
  const gql = `{
  ganttDemoModelQuery {
    queryListByWrapper(queryWrapper: {rsql: "1==1"}) {
      id
      code
      name
      taskStartDate
      taskEndDate
    }
  }
}`;
  const url = UrlHelper.appendBasePath(`/pamirs/${MODULE_NAME}?query=${encodeURIComponent(gql)}`);
  window.open(url, '_blank');
}
```

`UrlHelper#appendBasePath` 方法是 Oinone 提供的用于处理 `BASE_PATH` 相关功能的方法。最终完整的 URL 格式为：

```typescript
`${BASE_PATH}/pamirs/${MODULE_NAME}`

// eg: BASE_PATH = '/test'
// result: /test/pamirs/demo
```

对于 “同步下载文件” 功能来说，我们可以使用 `window.open` 方法，打开新窗口，以此来获得一个文件流，让浏览器自动识别并提示用户下载文件。

:::warning 提示

更多关于 环境配置 的内容请参考：[Environment](/zh/DevManual/Reference/Front-EndFramework/environment.md)

:::

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

:::warning 提示

更多关于 GQLBuilder 的使用示例和 API 请参考：[GraphQL Service - GQLBuilder](/zh/DevManual/Reference/Front-EndFramework/Services/graphQL-service.md#93149d98)

:::

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

:::warning 提示

更多关于 GenericFunctionService 的 API 和使用示例请参考：[GraphQL Service - GenericFunctionService](/zh/DevManual/Reference/Front-EndFramework/Services/graphQL-service.md#4e39b4c4)

:::

# 五、在页面中发起 GQL 请求

在 Oinone 中，一个页面对应的模型元数据已经在 `viewAction#load` 加载时获取完整了，它被保存在 `RuntimeContext` 上下文中。我们只需要通过 `RuntimeContext#getRequestModelFields` 方法获取页面上的请求字段即可，这样就可以根据页面元数据发起对应的请求了。

总的来说，在页面中发起 GQL 请求主要分为三步：

1. 通过 `FunctionCache` 获取指定函数定义。
2. 通过 `RuntimeContext#getRequestModelFields` 获取请求字段。
3. 通过 `FunctionService` 发起请求

就像下面这样：

```typescript
// 获取指定函数定义
const functionName = 'update';
const functionDefinition = await FunctionCache.getByName(this.model.model, functionName);
if (!functionDefinition) {
  throw new Error(`Invalid function definition. name: ${functionName}`);
}

// 获取请求字段
const requestFields = this.rootRuntimeContext.getRequestModelFields();

// 发起请求
return (
  (await FunctionService.INSTANCE.simpleExecute(
    this.model,
    functionDefinition,
    {
      requestFields,
      responseFields: requestFields,
      variables,
      context
    },
    data
  )) || {}
);
```

:::warning **提示：FunctionService 和 GenericFunctionService 的关系**

其实 `GenericFunctionService` 最终还是通过 `FunctionService` 发起请求的，只是在发起请求之前通过 `ModelCache` 和 `FunctionCache` 自动获取了模型元数据和函数定义。

更多关于元数据的内容请参考：[Metadata Service](/zh/DevManual/Reference/Front-EndFramework/Services/metadata-service.md)

更多关于 HTTP请求 的内容请参考：[HttpClient Service](/zh/DevManual/Reference/Front-EndFramework/Services/httpclient-service.md)

:::

# 六、HttpClient 拦截器的使用

在 HttpClient 中我们提供了两种拦截器： `NetworkMiddlewareHandler` 和 `NetworkInterceptor` 。

+ NetworkMiddlewareHandler：基于 `Apollo-Link Middleware` 拦截器封装，可对请求前参数和响应后结果进行处理。
+ NetworkInterceptor：基于 `NetworkMiddlewareHandler` 封装，仅对响应后结果进行处理。

:::warning 提示

更多关于 Apollo-Link Middleware 内容请参考官方文档： [Middleware](https://www.apollographql.com/docs/react/v2/networking/network-layer#middleware)

:::

## （一）创建 CustomNetworkMiddlewareHandler 拦截器

让我们先来看一下 `NetworkMiddlewareHandler` 类型声明：

```typescript
/**
 * 网络请求中间件处理器 (基于原生apollo封装)
 */
export type NetworkMiddlewareHandler = (operation: Operation, forward: NextLink) => Promise<any> | any;
```

接着，让我们创建一个 `CustomNetworkMiddlewareHandler` 来看看它是怎样在所有请求的 `请求头（header）` 中追加参数的：

```typescript
export const CustomNetworkMiddlewareHandler: NetworkMiddlewareHandler = (operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    return {
      headers: {
        ...headers,
        arg1: 'a',
        arg2: 'b'
      }
    };
  });
  return forward(operation).subscribe({});
};
```

## （二）使 CustomNetworkMiddlewareHandler 拦截器生效

让我们在 `VueOioProvider` 中指定 `http.middleware` 参数，让拦截器生效：

```typescript
VueOioProvider({
  http: {
    middleware: [CustomNetworkMiddlewareHandler]
  }
});
```

## （三）创建 CustomNetworkInterceptor 拦截器

让我们先来看一下 `NetworkInterceptor` 类型声明：

```typescript
/**
 * <h3>网络请求拦截器</h3>
 * <ul>
 *   <li>拦截器将按照注册顺序依次执行</li>
 *   <li>当任何一个拦截器返回false时，将中断拦截器执行</li>
 *   <li>内置拦截器总是优先于自定义拦截器执行</li>
 * </ul>
 *
 */
export interface NetworkInterceptor {
  /**
   * 成功拦截
   * @param response 响应结果
   */
  success?(response: IResponseResult): ReturnPromise<boolean>;

  /**
   * 错误拦截
   * @param response 响应结果
   */
  error?(response: IResponseErrorResult): ReturnPromise<boolean>;
}
```

通过拦截器的类型声明我们可以发现，在请求成功和异常时有分别的处理方法，让我们创建一个 `CustomNetworkInterceptor` 来看看如何定义吧。就像下面这样：

```typescript
export class CustomNetworkInterceptor implements NetworkInterceptor {
  public success(response: IResponseResult) {
    return true;
  }

  public error(response: IResponseResult) {
    return true;
  }
}
```

:::warning 提示

当返回值为 true 时，表示继续执行其他拦截器。当返回值为 false 时，表示中断执行其他拦截器。

更多关于拦截器的内容请参考：[HttpClient Service](/zh/DevManual/Reference/Front-EndFramework/Services/httpclient-service.md)

:::

## （四）使 CustomNetworkInterceptor 拦截器生效

让我们在 `VueOioProvider` 中指定 `http.interceptor` 参数，让拦截器生效。作为示例内容，我们先不考虑其他参数，使用 `afterInterceptors` 参数即可：

```typescript
VueOioProvider({
  http: {
    interceptor: {
      afterInterceptors: [new CustomNetworkInterceptor()]
    }
  }
});
```

:::warning 提示

更多关于 `http.interceptor` 的内容请参考：[Framework Overview](/zh/DevManual/Reference/Front-EndFramework/framework-overview.md)

:::

## （五）使用场景

一般而言，我们使用拦截器的目的是为了在请求前或响应后追加一部分逻辑以满足我们的需求。常见的使用场景有：

+ 通过 `NetworkInterceptor` 拦截器处理错误码、重定向、缓存加载等。
+ 通过 `NetworkMiddlewareHandler` 拦截器处理 `请求加密和响应解密` 以保证数据安全。
+ 通过 `NetworkMiddlewareHandler` 拦截器统一追加 `请求头（header）` 参数。

