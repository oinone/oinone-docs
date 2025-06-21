---
title: 自定义GraphQL请求
index: true
category:
  - 研发手册
  - 操作指南
order: 4
---
让我们回想一下在 “[Build a dashboard](/zh-cn/DevManual/Tutorials/DiscoverTheFront-endFramework/chapter2-build-a-dashboard.md)” 章节我们初步接触的 “[发起一个后端请求](/zh-cn/DevManual/Tutorials/DiscoverTheFront-endFramework/chapter2-build-a-dashboard.md#二、理论-发起一个后端请求)” 的理论内容，我们通过 `GenericFunctionService` 服务实例较为方便的发起了一个后端请求。在本章内容中，我们将对 GraphQL 请求进行较为详细的介绍。

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

+ 参考 “[Front-End Overview](/zh-cn/DevManual/Tutorials/MasterTheFront-endFramework/chapter1-front-end-overview.md#二、graphql协议)” GraphQL协议部分。
+ 参考 “[GraphQL 入门](https://graphql.cn/learn)” 官方文档。
+ 参考 “[GraphQL 和 REST 之间有何区别](https://aws.amazon.com/cn/compare/the-difference-between-graphql-and-rest/)” 进一步了解。

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

:::warning 提示

更多关于模型的概述内容请参考：[Front-End Overview](/zh-cn/DevManual/Tutorials/MasterTheFront-endFramework/chapter1-front-end-overview.md#三-模型)

更多关于模型字段类型的内容请参考：[字段 Field](/zh-cn/DevManual/Reference/Back-EndFramework/ORM-API.md#二、字段-field)

:::

## （二）内置函数

对于任何一个继承自 `IdModel` 的模型，都具备了一些基础 `CRUD` 的内置函数。作为前端，我们不需要了解过多后端知识，为了方便后面内容的表述，让我们简单了解一下：

<table>
	<tr>
	    <th>GQL 类型</th>
      <th>函数编码（fun）</th>
      <th>函数名称（name）</th>
      <th>描述</th>
	</tr >
	<tr >
	    <td rowspan="7">Query</td>
      <td>construct</td>
	    <td >construct</td>
	    <td >构造函数；初始化页面；</td>
  </tr>
  <tr >
      <td>queryPage</td>
	    <td >queryPage</td>
	    <td >分页查询； </td>
  </tr>
  <tr >
      <td>queryOne</td>
	    <td >queryOne</td>
	    <td >单条数据查询；Entity参数； </td>
  </tr>
  <tr >
      <td>queryListByWrapper</td>
	    <td >queryListByWrapper</td>
	    <td >条件查询列表；  </td>
  </tr>
  <tr >
      <td>queryByWrapper</td>
	    <td >queryOneByWrapper</td>
	    <td >条件查询单条数据；</td>
  </tr>
  <tr >
      <td>countByWrapper</td>
	    <td >countByWrapper</td>
	    <td >根据条件统计数量； </td>
  </tr>
  <tr >
      <td>count</td>
	    <td >count</td>
	    <td >统计数量；Entity参数； </td>
  </tr>
  <tr >
	    <td rowspan="3">Mutation</td>
      <td>create</td>
	    <td >create</td>
	    <td >创建函数；</td>
  </tr>
  <tr >
      <td>update</td>
	    <td >update</td>
	    <td >更新函数； </td>
  </tr>
  <tr >
      <td>delete</td>
	    <td >delete</td>
	    <td >删除函数； </td>
  </tr>
</table>


:::warning 提示

在这里我们列出来一些比较常用的可以被前端调用的默认函数。所有的函数最终都是通过 函数名称（name） 发起的。在这里我们需要注意一个特例：

+  queryByWrapper 和 queryOneByWrapper调用的是同一个函数，只是 fun 和 name 不同。

更多关于函数入参、出参等详细内容请参考：[ORM API - Common ORM Methods](/zh-cn/DevManual/Reference/Back-EndFramework/ORM-API.md#五、common-orm-methods)

:::

## （三）标准 GQL 语法格式

再让我们回顾一下之前提到的语法格式：

``` graphql
${query/mutation} {
  ${modelName}${Query/Mutation} {
    ${functionName} (${arg1Name}: ${arg1Value}) {
      ${responseParameters}
    }
  }
}
```

## （四）以 queryListByWrapper 为例的 GQL 语法

``` graphql
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

## （五）GQL 与 RESTFul

从浏览器发起的请求来看，GQL 请求本质上是使用 POST 方式，以 JSON 格式进行传输的请求。这一点与 RESTFul 请求以 JSON 格式传输几乎是完全一样的。

唯一的区别是：

+ GQL 请求使用了固定结构的请求和灵活的响应，其响应结果在请求时定义。
+ RESTFul 请求使用了任意结构的请求和任意结构的响应，其响应结果在后端定义。

到了这里，我们对 GraphQL 协议的内容介绍就已经全部结束了。接下来，让我们用 `HttpClient` 最基础的服务来发起 GQL 请求吧。

# 二、通过 HttpClient 发起 GQL 请求

让我们先把上一节中定义的那段 GQL 发送到后端，我们可以这样做：

1. 使用 `HttpClient#getInstance` 获取 `HttpClient` 实例。
2. 根据模型所在模块确定 `模块名称` 。
3. 定义模型类型，建议所有类型统一在 `src/types` 目录下定义。
4. 使用 Class 定义方法并发起请求，建议所有服务统一在 `src/service` 目录下定义。

下面这段代码演示了如何通过 `HttpClient` 发起 GQL 请求以及获取请求结果：

``` typescript
import { HttpClient } from '@kunlun/dependencies';

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

在这个例子中，你可以任意删减 `responseParameters` 中定义的字段，并查看响应结果的区别。

更多关于 HttpClient 的内容请参考：[HttpClient Service](/zh-cn/DevManual/Reference/Front-EndFramework/Services/httpclient-service.md)

:::

# 三、使用 GET 方式发起 GQL 请求

对于所有使用 `HttpClient` 服务实例发起的请求都是 `POST` 方式，那么，什么情况下我们需要使用 `GET` 方式呢？一般情况下，当我们需要依靠后端服务进行 `同步下载文件` 时才需要使用到 `GET` 方式。

和之前我们解析浏览器请求时提到的 GQL 请求的两部分：`query` 和 `variables` 。对于 GET 方式，我们只需要将对应的参数拼接在 URL 后作为请求参数即可。

由于我们并不能轻易找到一个可以用来练习的例子，因此在我们这个例子中，我们将上一小节对应的 `GQL` 通过 `GET` 方式打开，其返回的是 `JSON` 结构的数据。就像下面这样：

``` typescript
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

``` typescript
`${BASE_PATH}/pamirs/${MODULE_NAME}`

// eg: BASE_PATH = '/test'
// result: /test/pamirs/demo
```

对于 “同步下载文件” 功能来说，我们可以使用 `window.open` 方法，打开新窗口，以此来获得一个文件流，让浏览器自动识别并提示用户下载文件。

:::warning 提示

更多关于 环境配置 的内容请参考：[Environment](/zh-cn/DevManual/Reference/Front-EndFramework/environment.md)

:::

# 四、GQL 工具类的使用

在 Oinone 中，直接使用原生的 `HttpClient` 虽能以最有效的方式发起请求，但过于底层的能力在不经过封装的情况下并不是非常好用。为此，我们提供了一些工具类，来帮助我们用更方便的方式发起请求。

## （一）GQLBuilder

以 `ganttDemoModel#queryListByWrapper` 为例：

``` typescript
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

在使用 GQL 时我们发现，一些字段类型在 GQL 中直接使用字符串拼接可能不那么容易，尤其是对象或者数组。因此，我们在 GQLBuilder 中提供了对各种类型的处理方式，在使用过程中对于参数的拼接逻辑可以无需关心。这也是最接近 HttpClient 发起请求的方式。

## （二）GenericFunctionService

在实践过程中，我们发现 `GQL` 发起请求相比于 `Ajax/Axios` 发起请求，还是有些麻烦的。那么，有没有一种方式可以让我们像使用 `Ajax/Axios` 一样发起请求呢？

让我们使用 `GenericFunctionService` 像 `Ajax/Axios` 一样发起 GQL 请求吧：

``` typescript
public static queryListByWrapperByGenericFunctionService(): Promise<GanttDemoModel[] | undefined> {
  return GenericFunctionService.INSTANCE.simpleExecuteByName(MODEL_MODEL, 'queryListByWrapper', {
    rsql: '1==1'
  });
}
```

一个标准的 `Ajax/Axios` 请求包含 `请求路径（URL）` 、 `请求方式（HttpMethod）` 以及 `请求体（Body）` 。与 `Ajax/Axios` 发起一个请求类似， `simpleExecuteByName` 接受两个及两个以上的参数，前面两个参数分别是`命名空间`和`函数名称`，类似于`请求路径（URL）`。后面可以接入任意数量的参数，类似于`请求体（Body）`。而`请求方式（HttpMethod）`固定使用 `POST`，无需显式指定。

# 五、在页面中发起 GQL 请求

在 Oinone 中，一个页面对应的模型元数据已经在 `viewAction#load` 加载时获取完整了，它被保存在 `RuntimeContext` 上下文中。我们只需要通过 `RuntimeContext#getRequestModelFields` 方法获取页面上的请求字段即可，这样就可以根据页面元数据发起对应的请求了。

总的来说，在页面中发起 GQL 请求主要分为三步：

1. 通过 `FunctionCache` 获取指定函数定义。
2. 通过 `RuntimeContext#getRequestModelFields` 获取请求字段。
3. 通过 `FunctionService` 发起请求

就像下面这样：

``` typescript
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

:::warning 提示：FunctionService 和 GenericFunctionService 的关系

其实 `GenericFunctionService` 最终还是通过 `FunctionService` 发起请求的，只是在发起请求之前通过 `ModelCache` 和 `FunctionCache` 自动获取了模型元数据和函数定义。

更多关于元数据的内容请参考：[Metadata Service](/zh-cn/DevManual/Reference/Front-EndFramework/Services/metadata-service.md)

更多关于 HTTP请求 的内容请参考：[HttpClient Service](/zh-cn/DevManual/Reference/Front-EndFramework/Services/httpclient-service.md)

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

``` typescript
/**
 * 网络请求中间件处理器 (基于原生apollo封装)
 */
export type NetworkMiddlewareHandler = (operation: Operation, forward: NextLink) => Promise<any> | any;
```

接着，让我们创建一个 `CustomNetworkMiddlewareHandler` 来看看它是怎样在所有请求的 `请求头（header）` 中追加参数的：

``` typescript
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

``` typescript
VueOioProvider({
  http: {
    middleware: [CustomNetworkMiddlewareHandler]
  }
});
```

## （三）创建 CustomNetworkInterceptor 拦截器

让我们先来看一下 `NetworkInterceptor` 类型声明：

``` typescript
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

``` typescript
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

更多关于拦截器的内容请参考：[HttpClient Service](/zh-cn/DevManual/Reference/Front-EndFramework/Services/httpclient-service.md)

:::

## （四）使 CustomNetworkInterceptor 拦截器生效

让我们在 `VueOioProvider` 中指定 `http.interceptor` 参数，让拦截器生效。作为示例内容，我们先不考虑其他参数，使用 `afterInterceptors` 参数即可：

``` typescript
VueOioProvider({
  http: {
    interceptor: {
      afterInterceptors: [new CustomNetworkInterceptor()]
    }
  }
});
```

:::warning 提示

更多关于 `http.interceptor` 的内容请参考：[Framework Overview](/zh-cn/DevManual/Reference/Front-EndFramework/framework-overview.md)

:::

## （五）使用场景

一般而言，我们使用拦截器的目的是为了在请求前或响应后追加一部分逻辑以满足我们的需求。常见的使用场景有：

+ 通过 `NetworkInterceptor` 拦截器处理错误码、重定向、缓存加载等。
+ 通过 `NetworkMiddlewareHandler` 拦截器处理 `请求加密和响应解密` 以保证数据安全。
+ 通过 `NetworkMiddlewareHandler` 拦截器统一追加 `请求头（header）` 参数。

