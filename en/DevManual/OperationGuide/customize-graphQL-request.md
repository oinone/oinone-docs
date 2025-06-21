---
title: Customize GraphQL Requests
index: true
category:
  - Development Manual
  - Operation Guide
order: 4
---

Let's recall the theoretical content of "Initiating a Backend Request" we first encountered in the "[Build a Dashboard](/en/DevManual/Tutorials/DiscoverTheFront-endFramework/chapter2-build-a-dashboard.md#二、理论-发起一个后端请求)" section of the "[Build a Dashboard](/en/DevManual/Tutorials/DiscoverTheFront-endFramework/chapter2-build-a-dashboard.md)" chapter. We initiated a backend request through the `GenericFunctionService` instance. In this chapter, we will provide a detailed introduction to GraphQL requests.

For convenience, GraphQL is abbreviated as GQL in the following content.

In addition to using the `GenericFunctionService` instance to initiate requests, we also need to understand:
- Generation rules of GQL `schema` in Oinone
- Initiating GQL requests via `HttpClient`
- Initiating GQL requests using the GET method through `window.open`
- Usage of GQL utility classes
- Initiating GQL requests based on current page metadata through the `RuntimeContext`

# I. GraphQL Protocol

In Oinone, all functions are driven by a series of metadata, using `GQL` as the front-end to back-end interaction protocol, which has certain advantages compared to `RESTFul`. Namely, the front-end can define response datasets through `GQL`.

Before learning this chapter, you need a preliminary understanding of `GQL`:
- Refer to the GraphQL protocol section in "[Front-End Overview](/en/DevManual/Tutorials/MasterTheFront-endFramework/chapter1-front-end-overview.md#二、graphql协议)".
- Refer to the official documentation "[GraphQL 入门](https://graphql.cn/learn)".
- Further understand "[What's the Difference Between GraphQL and REST](https://aws.amazon.com/cn/compare/the-difference-between-graphql-and-rest/)".

## (I) Starting with Models

Models are the starting point of all functions. Let's review the models used in "[Master the Front-end Framework](/en/DevManual/Tutorials/MasterTheFront-endFramework/README.md)" and take the `GanttDemoModel` as an example.

Here is the information about the model (`GanttDemoModel`) used in this chapter:

**Model Code**: demo.gantt.GanttDemoModel  
**Model Name**: ganttDemoModel  
**Module Name**: demo  
**Model Fields**: (see the table below)

| **Name**         | **API Name**     | **Field Type**   | **Multi-value** | **Length (single-value length)** |
| ---------------- | ---------------- | ---------------- | -------------- | ------------------------------- |
| Code             | code             | Text (String)    | No           | 128                           |
| Name             | name             | Text (String)    | No           | 128                           |
| Task Start Date  | taskStartDate    | Date             | No           | -                             |
| Task End Date    | taskEndDate      | Date             | No           | -                             |

:::info Tip

In most cases, the model name is usually automatically generated from the model code. The generation rule is: take the last part of the `model code` separated by ".", and convert it to `camelCase` format, as shown in the model information above.

:::

:::warning Note

For more overview content about models, refer to: [Front-End Overview](/en/DevManual/Tutorials/MasterTheFront-endFramework/chapter1-front-end-overview.md#三-模型)  
For more content about model field types, refer to: [Field](/en/DevManual/Reference/Back-EndFramework/ORM-API.md#二、字段-field)

:::

## (II) Built-in Functions

For any model inherited from `IdModel`, it has some basic `CRUD` built-in functions. As the front-end, we don't need to know too much about the back-end. For the convenience of subsequent content, let's briefly understand:

| GQL Type | Function Code (fun)       | Function Name (name)     | Description                          |
| -------- | ------------------------- | ------------------------ | ------------------------------------ |
| rowspan="7">Query       | construct                 | construct                | Constructor; initialize page;        |
|           | queryPage                 | queryPage                | Paged query;                         |
|           | queryOne                  | queryOne                 | Single data query; Entity parameter; |
|           | queryListByWrapper        | queryListByWrapper       | Conditional query list;             |
|           | queryByWrapper            | queryOneByWrapper        | Conditional query for single data;   |
|           | countByWrapper            | countByWrapper           | Count by condition;                 |
|           | count                     | count                    | Count; Entity parameter;            |
| rowspan="3">Mutation    | create                    | create                   | Creation function;                  |
|           | update                    | update                   | Update function;                    |
|           | delete                    | delete                   | Delete function;                    |

:::warning Note

Here we list some commonly used default functions that can be called by the front-end. All functions are ultimately initiated by the function name (name). Here we need to note a special case:
- queryByWrapper and queryOneByWrapper call the same function, only fun and name are different.

For more detailed content about function parameters and return values, refer to: [ORM API - Common ORM Methods](/en/DevManual/Reference/Back-EndFramework/ORM-API.md#五、common-orm-methods)

:::

## (III) Standard GQL Syntax Format

Let's review the previously mentioned syntax format:

``` graphql
${query/mutation} {
  ${modelName}${Query/Mutation} {
    ${functionName} (${arg1Name}: ${arg1Value}) {
      ${responseParameters}
    }
  }
}
```

## (IV) GQL Syntax Example with queryListByWrapper

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

:::warning Note

For more content about RSQL, refer to: [RSQL Service](/en/DevManual/Reference/Front-EndFramework/Services/RSQL-service.md)

:::

## (V) GQL vs. RESTFul

From the perspective of requests initiated by the browser, GQL requests essentially use the POST method to transmit in JSON format, which is almost exactly the same as RESTFul requests transmitting in JSON format.

The only differences are:
- GQL requests use a fixed structure for requests and flexible responses, with response results defined at the time of the request.
- RESTFul requests use arbitrary request structures and arbitrary response structures, with response results defined on the back-end.

So far, our introduction to the GraphQL protocol is complete. Next, let's use the most basic service of `HttpClient` to initiate GQL requests.

# II. Initiating GQL Requests via HttpClient

Let's send the GQL defined in the previous section to the back-end. We can do this as follows:
1. Use `HttpClient#getInstance` to obtain the `HttpClient` instance.
2. Determine the `module name` based on the module where the model is located.
3. Define the model type, it is recommended to define all types in the `src/types` directory.
4. Use Class to define methods and initiate requests, it is recommended to define all services in the `src/service` directory.

The following code demonstrates how to initiate a GQL request via `HttpClient` and obtain the request result:

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

From this, we can see that this is the most low-level usage method without any encapsulation, and it is often the most effective way to make requests.

:::warning Note

In this example, you can arbitrarily delete or add fields defined in `responseParameters` and view the differences in response results.

For more content about HttpClient, refer to: [HttpClient Service](/en/DevManual/Reference/Front-EndFramework/Services/httpclient-service.md)

:::

# III. Initiating GQL Requests Using the GET Method

All requests initiated using the `HttpClient` service instance are of the `POST` method. So, in what cases do we need to use the `GET` method? Generally, we need to use the `GET` method when we need to rely on the back-end service for `synchronous file download`.

As mentioned before, GQL requests initiated by the browser consist of two parts: `query` and `variables`. For the GET method, we only need to append the corresponding parameters to the URL as request parameters.

Since it's not easy to find a practice example, in our example, we will open the corresponding `GQL` of the previous section via the `GET` method, which returns `JSON` structured data, as shown below:

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

The `UrlHelper#appendBasePath` method is a method provided by Oinone for handling `BASE_PATH` related functions. The final complete URL format is:

``` typescript
`${BASE_PATH}/pamirs/${MODULE_NAME}`

// eg: BASE_PATH = '/test'
// result: /test/pamirs/demo
```

For the "synchronous file download" function, we can use the `window.open` method to open a new window to obtain a file stream, allowing the browser to automatically recognize and prompt the user to download the file.

:::warning Note

For more content about environment configuration, refer to: [Environment](/en/DevManual/Reference/Front-EndFramework/environment.md)

:::

# IV. Usage of GQL Utility Classes

In Oinone, directly using the native `HttpClient` can initiate requests in the most effective way, but the overly low-level capabilities are not very user-friendly without encapsulation. To this end, we provide some utility classes to help us initiate requests in a more convenient way.

## (I) GQLBuilder

Take `ganttDemoModel#queryListByWrapper` as an example:

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

When using GQL, we found that some field types may not be easy to concatenate directly as strings in GQL, especially objects or arrays. Therefore, we provide processing methods for various types in GQLBuilder, and the concatenation logic of parameters can be ignored during use. This is also the way closest to initiating requests via HttpClient.

## (II) GenericFunctionService

In practice, we found that initiating requests with `GQL` is still more troublesome compared to initiating requests with `Ajax/Axios`. So, is there a way for us to initiate requests like `Ajax/Axios`?

Let's use `GenericFunctionService` to initiate GQL requests like `Ajax/Axios`:

``` typescript
public static queryListByWrapperByGenericFunctionService(): Promise<GanttDemoModel[] | undefined> {
  return GenericFunctionService.INSTANCE.simpleExecuteByName(MODEL_MODEL, 'queryListByWrapper', {
    rsql: '1==1'
  });
}
```

A standard `Ajax/Axios` request includes `request path (URL)`, `request method (HttpMethod)`, and `request body (Body)`. Similar to `Ajax/Axios` initiating a request, `simpleExecuteByName` accepts two or more parameters. The first two parameters are `namespace` and `function name`, similar to `request path (URL)`. Any number of parameters can be added afterward, similar to `request body (Body)`. The `request method (HttpMethod)` is fixed to use `POST` and does not need to be specified explicitly.

# V. Initiating GQL Requests in Pages

In Oinone, the metadata of the model corresponding to a page is completely obtained when `viewAction#load` is loaded, and it is stored in the `RuntimeContext`. We only need to obtain the request fields on the page through the `RuntimeContext#getRequestModelFields` method, so that we can initiate corresponding requests based on the page metadata.

In general, initiating GQL requests in pages mainly consists of three steps:
1. Obtain the specified function definition through `FunctionCache`.
2. Obtain request fields through `RuntimeContext#getRequestModelFields`.
3. Initiate requests through `FunctionService`

Like this:

``` typescript
// Get the specified function definition
const functionName = 'update';
const functionDefinition = await FunctionCache.getByName(this.model.model, functionName);
if (!functionDefinition) {
  throw new Error(`Invalid function definition. name: ${functionName}`);
}

// Get request fields
const requestFields = this.rootRuntimeContext.getRequestModelFields();

// Initiate the request
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

:::warning Note: Relationship between FunctionService and GenericFunctionService

In fact, `GenericFunctionService` ultimately initiates requests through `FunctionService`, but it automatically obtains model metadata and function definitions through `ModelCache` and `FunctionCache` before initiating requests.

For more content about metadata, refer to: [Metadata Service](/en/DevManual/Reference/Front-EndFramework/Services/metadata-service.md)  
For more content about HTTP requests, refer to: [HttpClient Service](/en/DevManual/Reference/Front-EndFramework/Services/httpclient-service.md)

:::

# VI. Usage of HttpClient Interceptors

In HttpClient, we provide two types of interceptors: `NetworkMiddlewareHandler` and `NetworkInterceptor`.
- NetworkMiddlewareHandler: Encapsulated based on `Apollo-Link Middleware` interceptor, which can process parameters before the request and results after the response.
- NetworkInterceptor: Encapsulated based on `NetworkMiddlewareHandler`, which only processes results after the response.

:::warning Note

For more content about Apollo-Link Middleware, refer to the official documentation: [Middleware](https://www.apollographql.com/docs/react/v2/networking/network-layer#middleware)

:::

## (I) Creating a CustomNetworkMiddlewareHandler Interceptor

Let's first look at the type declaration of `NetworkMiddlewareHandler`:

``` typescript
/**
 * Network request middleware handler (encapsulated based on native apollo)
 */
export type NetworkMiddlewareHandler = (operation: Operation, forward: NextLink) => Promise<any> | any;
```

Next, let's create a `CustomNetworkMiddlewareHandler` to see how it appends parameters to the `request header` of all requests:

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

## (II) Enabling the CustomNetworkMiddlewareHandler Interceptor

Let's specify the `http.middleware` parameter in `VueOioProvider` to enable the interceptor:

``` typescript
VueOioProvider({
  http: {
    middleware: [CustomNetworkMiddlewareHandler]
  }
});
```

## (III) Creating a CustomNetworkInterceptor Interceptor

Let's first look at the type declaration of `NetworkInterceptor`:

``` typescript
/**
 * <h3>Network Request Interceptor</h3>
 * <ul>
 *   <li>Interceptors will be executed in the order of registration</li>
 *   <li>When any interceptor returns false, the interceptor execution will be interrupted</li>
 *   <li>Built-in interceptors always execute before custom interceptors</li>
 * </ul>
 *
 */
export interface NetworkInterceptor {
  /**
   * Success interception
   * @param response Response result
   */
  success?(response: IResponseResult): ReturnPromise<boolean>;

  /**
   * Error interception
   * @param response Response result
   */
  error?(response: IResponseErrorResult): ReturnPromise<boolean>;
}
```

Through the type declaration of the interceptor, we can find that there are separate processing methods for successful and exceptional requests. Let's create a `CustomNetworkInterceptor` to see how to define it, as shown below:

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

:::warning Note

When the return value is true, it means to continue executing other interceptors. When the return value is false, it means to interrupt the execution of other interceptors.

For more content about interceptors, refer to: [HttpClient Service](/en/DevManual/Reference/Front-EndFramework/Services/httpclient-service.md)

:::

## (IV) Enabling the CustomNetworkInterceptor Interceptor

Let's specify the `http.interceptor` parameter in `VueOioProvider` to enable the interceptor. As sample content, we will use the `afterInterceptors` parameter without considering other parameters for now:

``` typescript
VueOioProvider({
  http: {
    interceptor: {
      afterInterceptors: [new CustomNetworkInterceptor()]
    }
  }
});
```

:::warning Note

For more content about `http.interceptor`, refer to: [Framework Overview](/en/DevManual/Reference/Front-EndFramework/framework-overview.md)

:::

## (V) Usage Scenarios

Generally, we use interceptors to append a part of logic before the request or after the response to meet our needs. Common usage scenarios include:
- Processing error codes, redirection, cache loading, etc., through the `NetworkInterceptor` interceptor.
- Processing `request encryption and response decryption` through the `NetworkMiddlewareHandler` interceptor to ensure data security.
- Uniformly appending `request header` parameters through the `NetworkMiddlewareHandler` interceptor.