---
title: GraphQL Service
index: true
category:
  - DevManual
  - Reference
  - Front-EndFramework
  - Services
order: 4

---

:::warning Note

This chapter contains all content related to `GraphQL Service` in Oinone Kunlun. In addition to the content in this chapter, you can also find information about `GraphQL` in the following chapters:

+ The GraphQL protocol section in "[Mastering Frontend Frameworks - Frontend Framework Overview](/en-us/DevManual/Tutorials/MasterTheFront-endFramework/chapter1-front-end-overview.md#ii-graphql-protocol)"
+ The GraphQL protocol section in [Customize GraphQL Requests](/en-us/DevManual/OperationGuide/customize-graphQL-request.md)

:::

The GraphQL protocol is the standard protocol used for frontend-backend interaction in Oinone. Understanding and learning GraphQL's syntax, generation rules, and usage methods is very meaningful for learning Oinone.

# Ⅰ. GraphQL Protocol

## (Ⅰ) What is GraphQL?

`GraphQL` is a **graph query language** represented by **structured text**. `GraphQL` is not tied to any specific database or storage engine; instead, it relies on your existing code and data.

For more reference materials:

+ [Oinone Gateway Protocol API](/en-us/DevManual/Reference/Back-EndFramework/AdvanceAPI/protocol-API.md#i-graphql-protocol-details)
+ [How to GraphQL](https://www.howtographql.com/)
+ [GraphQL Introduction](https://www.graphql.org/learn/)

## (Ⅱ) GQL vs. REST

From the perspective of requests initiated by the browser, a `GQL` request is essentially a request transmitted in `JSON` format using the `POST` method. This is almost identical to `RESTFul` requests, which are also transmitted in `JSON` format.

The only differences are:

+ GQL requests use fixed - structure requests and flexible responses, and the response results are defined when making the request.
+ RESTFul requests use arbitrary - structure requests and arbitrary - structure responses, and the response results are defined on the backend.

For more reference materials:

+ [What is the Difference Between GraphQL and REST?](https://aws.amazon.com/compare/the-difference-between-graphql-and-rest/)

## (Ⅲ) Why Oinone Chooses GQL?

Since the development of Web frameworks, various frontend - backend architectures have emerged. Oinone has referred to the most typical frontend architecture `MVVM` (Model - View - ViewModel) and combined the "metadata - driven" feature. Finally, it was found that the standardized structure and server - side routing function provided by `GQL` are suitable as the frontend - backend protocol for Oinone.

### 1. Everything Revolves Around Models

In the practice of "Management Information Systems", we found that any list, form, or detail can be simply abstracted into the corresponding concepts in the `MVVM` architecture:

+ DSL: The model metadata contained in a view, which corresponds to the runtime model and fields, that is, the first "M".
+ View: This concept is easy to understand. Any page can be composed of a main view, and views can be parallel, nested, etc. The view is also an important concept for frontend metadata isolation.
+ Data source: In Oinone Kunlun, built - in variables such as dataSource and activeRecord correspond to the view model. It follows the business type but not completely. The runtime view model can be separated by **real values** and **submitted values**, so as to achieve diversified display and submission.

### 2. Model Functions

Let's take a look at the definition structure of `viewAction#load` on the backend:

```java
// Model code (model): ViewAction.MODEL_MODEL = base.ViewAction
// Model name (modelName): viewAction
@Model.model(ViewAction.MODEL_MODEL)
public class PageLoadAction {
    /**
     * Get page metadata
     *
     * @param request Request parameters, required parameter: id
     * @return Homepage metadata
     */
    @Function(openLevel = FunctionOpenEnum.API)
    @Function.Advanced(type = FunctionTypeEnum.QUERY, displayName = "Load Page")
    public ViewAction load(ViewAction request) {
        // Metadata loading process
        return request;
    }
}
```

Here, only some key contents are listed. As a frontend developer, we only need to know the corresponding relationship, which is very similar to `TypeScript Class`.

Secondly, communication between the frontend and backend is very important. If there is a language barrier, the efficiency of communication will be greatly reduced.

Finally, let's check the meaning of each parameter in the standard format by referring to the `viewAction#load` request initiated by the browser.

## (Ⅳ) Standard Request Format

In Oinone, all requests are defined in the following standard format, and its rules are completely consistent with the model and function metadata.

```graphql
${query/mutation} {
  ${modelName}${Query/Mutation} {
    ${functionName} (${arg1Name}: ${arg1Value}) {
      ${responseParameters}
    }
  }
}
```

Any GraphQL request can only be one of these two types: `Query` or `Mutation`. It depends on how the backend service defines this function. Generally, we require that requests that do not operate on data use `Query`, and other operations (create/update/delete, etc.) use `Mutation`.

**Parameter Meanings**

+ query/mutation: Specify the GraphQL request type, the default is `query`.
+ modelName: Model name.
+ Query/Mutation: Use different suffixes according to the GraphQL request type.
+ functionName: Function name.
+ arg1Name/arg1Value: Used to specify the function input parameters, which can be multiple, separated by ",".
+ responseParameters: Response parameter definition, which defines the response format of the interface in the form of a "graph" starting from the current model. It can be separated by line breaks or ",". When the field is an object or an array, use "{}" to continue defining the fields of the associated model.

**Example**

```graphql
{
  appConfigQuery {
    queryListByWrapper(queryWrapper: {rsql: "1==1"}) {
      id
    }
  }
}
```

:::warning Note

The type of `AppConfig#queryListByWrapper` here is `query`, so the GraphQL request type is omitted in the first line.

:::

## (Ⅴ) Variables

A `GraphQL` request body consists of two parts: `query` and `variables`. The content in the previous section is passed using the `query` parameter, and the values of the other part of the variables will be passed through `variables`.

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

+ var1Name/var1Type: Used to define the variable name and type.
+ var1DefaultValue: Used to define the default value of the variable, optional.
+ var1Value: The value corresponding to var1Name defined in variables.

**Example**

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

:::warning Note

In Oinone, after GQL is sent to the backend, it will be parsed structurally. Generally, we believe that the loss caused by parsing is far less than the convenience brought by routing flexibility. In order to minimize the loss caused by parsing, we cache the GQL parsing results. However, due to parameter variables, the cache cannot be hit at all, and using Variables can well solve the problem of hitting the cache.

It should be noted that although using Variables can hit the cache, the number of parameters should not be too large. If there are too many parameters, it will lead to high maintenance costs in the later stage. Usually, we recommend using variables in some core requests with few and fixed parameters to improve the overall performance of the system. For example, the `viewAction#load` interface is a typical use case.

:::

## (Ⅵ) Fragments

When a `GraphQL` is very lengthy or repeatedly defined, we usually define it as a `Fragment` so that it can be reused in multiple places. Take the `ViewAction#load` interface as an example:

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

:::warning Note

Flexible use of `Fragments` can make the code more concise.

:::

# Ⅱ. Usage of GraphQL in Oinone

## (Ⅰ) Starting from the Model

The model is the starting point of all functions. Let's review the use of models in "[Mastering Frontend Frameworks](/en-us/DevManual/Tutorials/MasterTheFront-endFramework/README.md)", and let's start with the `GanttDemoModel` model.

This is the information of the model (`GanttDemoModel`) used in this chapter:

**Model Code**: demo.gantt.GanttDemoModel

**Model Name**: ganttDemoModel

**Module Name where the Model is Located**: demo

**Model Fields**: (see the following table)

| **Name**     | **API Name**   | **Field Type**   | **Is Multi - valued** | **Length (Single - value Length)** |
| ------------ | ------------- | -------------- | ------------ | -------------------- |
| Code         | code          | Text（String） | No           | 128                  |
| Name         | name          | Text（String） | No           | 128                  |
| Task Start Date | taskStartDate | Date（Date）   | No           | -                    |
| Task End Date | taskEndDate | Date（Date）   | No           | -                    |


:::info Tip

In most cases, the model name is usually automatically generated from the model code. The generation rule is: split the `model code` by "." and take the last part, then convert it to `camelCase` format. Just like the model information shown above.

:::

## (Ⅱ) Built - in Functions

For any model inherited from `IdModel`, it has some basic `CRUD` built - in functions. As a frontend developer, we don't need to know too much backend knowledge. For the convenience of expression in the following content, let's briefly understand:

<table border="1" cellspacing="0" cellpadding="8" style="border-collapse: collapse; width: 100%; max-width: 1400px; margin: 20px auto;">
  <thead>
    <tr style="background-color: #f5f5f5;">
      <th style="text-align: left; font-weight: bold;">GQL Type</th>
      <th style="text-align: left; font-weight: bold;">Function Code（fun）</th>
      <th style="text-align: left; font-weight: bold;">Function Name（name）</th>
      <th style="text-align: left; font-weight: bold;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="7">Query</td>
      <td>construct</td>
      <td>construct</td>
      <td>Constructor; initialize the page;</td>
    </tr>
    <tr>
      <td>queryPage</td>
      <td>queryPage</td>
      <td>Paged query;</td>
    </tr>
    <tr>
      <td>queryOne</td>
      <td>queryOne</td>
      <td>Single data query; Entity parameter;</td>
    </tr>
    <tr>
      <td>queryListByWrapper</td>
      <td>queryListByWrapper</td>
      <td>Conditional query list;</td>
    </tr>
    <tr>
      <td>queryByWrapper</td>
      <td>queryOneByWrapper</td>
      <td>Conditional query for single data;</td>
    </tr>
    <tr>
      <td>countByWrapper</td>
      <td>countByWrapper</td>
      <td>Count the number according to conditions;</td>
    </tr>
    <tr>
      <td>count</td>
      <td>count</td>
      <td>Count the number; Entity parameter;</td>
    </tr>
    <tr>
      <td rowspan="3">Mutation</td>
      <td>create</td>
      <td>create</td>
      <td>Create function;</td>
    </tr>
    <tr>
      <td>update</td>
      <td>update</td>
      <td>Update function;</td>
    </tr>
    <tr>
      <td>delete</td>
      <td>delete</td>
      <td>Delete function;</td>
    </tr>
  </tbody>
</table>

:::warning Note

Here we list some commonly used default functions that can be called by the frontend. All functions are finally initiated through the function name (name). Here we need to pay attention to a special case:

+ queryByWrapper and queryOneByWrapper call the same function, but fun and name are different.

For more details about function input parameters, output parameters, etc., please refer to: [ORM API - Common ORM Methods](/en-us/DevManual/Reference/Back-EndFramework/ORM-API.md#v-common-orm-methods)

:::

## (Ⅲ) GQL Syntax with queryListByWrapper as an Example

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

:::warning Note

For more content about RSQL, please refer to: [RSQL Service](/en-us/DevManual/Reference/Front-EndFramework/Services/RSQL-service.md)

:::

## (Ⅳ) Response Results

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

In Oinone, any GraphQL request is returned to the frontend in this format.

**Parameter Meanings**

+ data: Fixed key
+ modelName: Model name. Same as the request parameter.
+ Query/Mutation: Use different suffixes according to the GraphQL request type. Same as the request parameter.
+ functionName: Function name. Same as the request parameter.
+ errors: Possible error information
+ extensions: Extended information

**Example**

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

## (Ⅴ) Unified Terminology

Taking the "Get Global Configuration" interface as an example, we will use the way of "`appConfig#queryListByWrapper` interface" to locate a request, which is more accurate and intuitive than Chinese.

Let's get used to this way of expression:

+ topBarUserBlock#construct: Top bar - get user avatar and actions
+ viewAction#load: Load page metadata
+ model#loadModelField: Get model field metadata according to model code
+ module#load: Get according to module code
+ resourceCountryGroup#queryPage: Query country groups by pagination

# Ⅲ. Initiating Requests with Visual Tools

Requests to any backend service can be made using visual tools. Such tools include:

+ Insomnia: [Click to download](https://insomnia.rest/download)
+ Postman: [Click to download](https://www.postman.com/downloads)

You can freely choose any visualization tool that supports the GraphQL protocol.

### 1. Initiating Requests with Insomnia

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/1747020620993-8eababa3-6d69-42d6-ab71-f9dc71da917e.png)

### 2. Initiating Requests with Postman

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/1747020238431-34cf1ef9-9898-498b-9e1c-8155beb0ac7f.png)

### 3. Solving the Login Issue with Visual Request Tools

When we initiated the "get global configuration" request above, we found that there was no user login verification. This is because this interface is still needed on the user login page, so it does not verify whether the user is logged in. But this is not the case for other interfaces, and you can verify this with other requests in the browser.

So, how to log in? Actually, it's very simple. We can initiate the login request sent from the login page in the request tool, like this:

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

:::warning Note

The password field of the login interface allows transmission in plain text, which facilitates our debugging. However, on the page, the password is transmitted in cipher text.

:::

:::info Tip

Request URL: It can be obtained from the value of `Headers - General - Request URL` in the browser.

Request method: `POST` (most of them are this)

Obtaining the query parameter: Right - click on the query and select "`Copy value`" to directly paste it into the `Query` column of the visualization request tool.

Obtaining the variables parameter: Right - click on the variables and select "`Copy object`" to directly paste it into the `Variables` column of the visualization request tool.

:::

### 4. Initiating Batch Requests

In the browser, we also find a request named "batch", which represents a batch request. It can process a batch of unrelated GraphQL requests at one time and return the corresponding results respectively.

In the request tool, we can initiate such requests in JSON format.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/1747023952920-10633b31-c30d-4990-a093-e8d7830bc467.png)

:::warning Note

Batch requests utilize the automatic batching capability provided by the `apollo-client` toolkit. When we use `Promise` for asynchronous operations, requests from the same module within the same clock cycle will be merged and automatically combined into such batch requests.

For more information about `HTTP requests`, please refer to: [HttpClient Service](/en-us/DevManual/Reference/Front-EndFramework/Services/httpclient-service.md)

:::