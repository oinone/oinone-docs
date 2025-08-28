---
title: Customize GraphQL Requests
index: true
category:
  - Development Manual
  - Operation Guide
order: 4
---
Let’s recall the theoretical content of "**Initiating a Backend Request**" we were first introduced to in the chapter "[Build a dashboard](/en/DevManual/Tutorials/DiscoverTheFront-endFramework/chapter2-build-a-dashboard.md)". We conveniently initiated backend requests using an instance of the `GenericFunctionService`. In this chapter, we will provide a detailed introduction to GraphQL requests.

For the sake of convenience, GraphQL will be abbreviated as **GQL** in the following content.

In addition to initiating requests using `GenericFunctionService` instances, we also need to understand:
- The generation rules of GQL `schema` in Oinone
- Initiating GQL requests via `HttpClient`
- Initiating GQL requests using the GET method via `window.open`
- The use of GQL utility classes
- Initiating GQL requests based on current page metadata via the `RuntimeContext`

# I. GraphQL Protocol
In Oinone, all functionalities are driven by a series of metadata, with **GQL** serving as the frontend-backend interaction protocol. Compared to **RESTFul**, GQL offers a distinct advantage: the frontend can define the response data set through GQL.

Before learning the content of this chapter, you need to have a basic understanding of GQL:
- Refer to the "GraphQL Protocol" section in "[Front-End Overview](/en/DevManual/Tutorials/MasterTheFront-endFramework/chapter1-front-end-overview.md#二、graphql协议)".
- Refer to the official documentation "[GraphQL 学习](https://graphql.cn/learn)" (GraphQL Learn).
- Refer to "[GraphQL 和 REST 之间有何区别](https://aws.amazon.com/cn/compare/the-difference-between-graphql-and-rest/)" (What’s the Difference Between GraphQL and REST) for further understanding.


## (I) Starting from the Model
The model is the starting point of all functionalities. Let’s review the model usage covered in "[MasterTheFront-endFramework](/en/DevManual/Tutorials/MasterTheFront-endFramework/README.md)" and begin with the `GanttDemoModel` as an example.

Below is the information of the model (`GanttDemoModel`) used in this chapter:

**Model Code**: demo.gantt.GanttDemoModel  
**Model Name**: ganttDemoModel  
**Module Name of the Model**: demo  
**Model Fields**: (See the table below)

| **Display Name** | **API Name**   | **Field Type**       | **Multi-value** | **Length (Single-value Length)** |
|------------------|----------------|----------------------|-----------------|-----------------------------------|
| 编码             | code           | String               | No              | 128                               |
| 名称             | name           | String               | No              | 128                               |
| 任务开始日期     | taskStartDate  | Date                 | No              | -                                 |
| 任务结束日期     | taskEndDate    | Date                 | No              | -                                 |


:::info Tip
In most cases, the model name is automatically generated from the model code. The generation rule is: split the **model code** by "." , take the last segment, and convert it to **camelCase** format—just like the model information shown above.
:::

:::warning Note
For more overview content about models, please refer to: [Front-End Overview](/en/DevManual/Tutorials/MasterTheFront-endFramework/chapter1-front-end-overview.md#三-模型) (Model Section).  
For more content about model field types, please refer to: [Field](/en/DevManual/Reference/Back-EndFramework/ORM-API.md#ii-field) (Field Section).
:::


## (II) Built-in Functions
Any model that inherits from `IdModel` is equipped with basic **CRUD** built-in functions. As frontend developers, we don’t need to delve deeply into backend knowledge, but to facilitate the description of subsequent content, let’s briefly understand these functions:

<table>
<thead>
<tr>
<th>GQL Type</th>
<th>Function Code (fun)</th>
<th>Function Name (name)</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<!-- Rows for Query type (merge 7 rows) -->
<tr>
<td rowspan="7">Query</td>
<td>construct</td>
<td>construct</td>
<td>Constructor; initializes the page;</td>
</tr>
<tr>
<td>queryPage</td>
<td>queryPage</td>
<td>Paged query;</td>
</tr>
<tr>
<td>queryOne</td>
<td>queryOne</td>
<td>Single data query; requires Entity parameter;</td>
</tr>
<tr>
<td>queryListByWrapper</td>
<td>queryListByWrapper</td>
<td>Conditional list query;</td>
</tr>
<tr>
<td>queryByWrapper</td>
<td>queryOneByWrapper</td>
<td>Conditional single data query;</td>
</tr>
<tr>
<td>countByWrapper</td>
<td>countByWrapper</td>
<td>Count data based on conditions;</td>
</tr>
<tr>
<td>count</td>
<td>count</td>
<td>Data counting; requires Entity parameter;</td>
</tr>
<!-- Rows for Mutation type (merge 3 rows) -->
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
The table above lists some commonly used default functions that can be called by the frontend. All functions are ultimately initiated via their **function name (name)**. Note the following special case:
- `queryByWrapper` and `queryOneByWrapper` call the same function, but differ in their `fun` (function code) and `name` (function name).

For more detailed content about function input parameters, output parameters, etc., please refer to: [ORM API - Common ORM Methods](/en/DevManual/Reference/Back-EndFramework/ORM-API.md#v-common-orm-methods).
:::


## (III) Standard GQL Syntax Format
Let’s review the syntax format mentioned earlier:
```graphql
${query/mutation} {
  ${modelName}${Query/Mutation} {
    ${functionName} (${arg1Name}: ${arg1Value}) {
      ${responseParameters}
    }
  }
}
```

In Oinone, any GraphQL request falls into one of two types: **Query** or **Mutation**. This depends on how the backend service defines the function. Generally, we require that requests that do not manipulate data use `Query`, while other operations (create/update/delete, etc.) use `Mutation`.

### Parameter Meanings
- **query/mutation**: Specifies the GraphQL request type; defaults to `query`.
- **modelName**: The model name. In `appConfigQuery`, `appConfig` is the model name.
- **Query/Mutation**: Uses different suffixes based on the GraphQL request type. In `appConfigQuery`, since the function is of type `query`, the `Query` suffix is used.
- **functionName**: The name of the function to call.
- **arg1Name/arg1Value**: Specifies input parameters for the function; multiple parameter groups can be added and separated by commas.
- **responseParameters**: Defines the response parameters. Starting from the current model, the response format of the interface is defined in a "graph" structure. Parameters can be separated by line breaks or commas. For object or array fields, use `{}` to further define fields of associated models. For example: The `sideBarTheme` field is an object containing the `mode` and `theme` fields.

Next, we will provide a detailed introduction to GQL syntax using examples of common built-in functions.


## (IV) GQL Syntax Example with `countByWrapper`
In the chapter "DiscoverTheFront-endFramework - Build a Dashboard", we briefly learned how to initiate backend requests, but did not elaborate on the GQL syntax and parameters corresponding to the `countByWrapper` built-in function. Let’s take a look at the GQL syntax for this function:

```graphql
{
  ganttDemoModelQuery {
    countByWrapper(queryWrapper: {rsql: "1==1"})
  }
}
```

In this GQL, we call the `countByWrapper` function of the `ganttDemoModel` model. This function has only one input parameter (an object named `queryWrapper`), and this object only passes a property named `rsql`.

In GQL, **empty return values** and **primitive data types** do not require declaring response parameters. Since the return value of `countByWrapper` is a number, no response parameters are declared in this GQL.

Notably, for numeric types, the backend type definitions include `Integer`, `Long`, `Float`, `Double`, and `BigDecimal`. When passed to the frontend, due to differences in language precision, `Long` and `BigDecimal` types are returned to the frontend as strings to prevent precision loss.

:::warning Note
In the declaration of the `countByWrapper` function, its return value is of type `Long`. This means we need to convert it to a `number` type using the `Number()` function before returning. Although this approach has minor flaws, in most existing scenarios, the maximum integer value returned by `countByWrapper` generally does not exceed the safe integer limit of JavaScript. If the business scenario explicitly involves values beyond this limit, use toolkits like `bignumber.js` (which encapsulate data types) for processing.

For more content about type mapping, please refer to: [Data Type Mapping](#x-data-type-mapping).
:::

### Theory: Function Definition and GQL Syntax
As our first example, let’s first understand the mapping relationship between function definitions and GQL syntax—this will help you better understand the subsequent examples.

The Oinone backend is written in **Java**, which has a syntax very similar to the **TypeScript** we use. Learning Java syntax may be challenging for frontend developers, so let’s use TypeScript syntax to demonstrate what defining such a function would look like:

```typescript
import { QueryWrapper } from '@oinone/kunlun-dependencies';

/* Built-in data type definition
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

We have simplified many declaration details here, focusing on key points such as the **function name**, **input parameters**, and **output parameters**. It is obvious that these elements correspond one-to-one with the GQL syntax.

In Oinone, the input and output parameters of built-in functions have type declarations that correspond exactly to those on the backend. In practice, we can also use these type declarations for operations. In this example, `queryWrapper` is the input parameter name, `QueryWrapper` is the input parameter type of the built-in function, and `rsql` is a property value within the `QueryWrapper` type.

:::warning Note
For more content about RSQL, please refer to: [RSQL Service](/en/DevManual/Reference/Front-EndFramework/Services/RSQL-service.md).
:::


## (V) GQL Syntax Example with `queryListByWrapper`
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

In this GQL, we call the `queryListByWrapper` function of the `ganttDemoModel` model. This function has only one input parameter (an object named `queryWrapper`), and this object only passes a property named `rsql`.

In the response, we declare that we need to retrieve five fields of the `ganttDemoModel` for return. Notably, whether the response is a single object or an array, GQL response parameters are always **flattened**—there is no need to distinguish between specific data types.

The corresponding function definition is as follows:
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

Unlike the previous example, the return value here is no longer a primitive type, but an **array of model objects**. Therefore, the response parameters we declare in GQL correspond one-to-one with the model fields.

Notably, for datetime types, the backend transmits data to the frontend as **standard-format datetime strings**. Thus, the `taskStartDate` and `taskEndDate` properties declared in our type definition are of string type, not date type.

:::warning Note
Functions are defined by the backend. As the caller, the frontend needs to use GQL to specify the model, function, and the input/output parameters of the function.

For more content about RSQL, please refer to: [RSQL Service](/en/DevManual/Reference/Front-EndFramework/Services/RSQL-service.md).  
For more content about type mapping, please refer to: [Data Type Mapping](#x-data-type-mapping).
:::


## (VI) GQL Syntax Example with `queryPage`
In the previous example, we introduced the GQL syntax for functions with a single parameter. Next, we will use `queryPage` as an example to explain **multiple input parameters** and **return value structures**:

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

The corresponding function definition is as follows:
```typescript
import { QueryPageResult, QueryPagination, QueryWrapper } from '@oinone/kunlun-dependencies';

export interface GanttDemoModel {
  id: string;
  code: string;
  name: string;
  taskStartDate: string;
  taskEndDate: string;
}

/* Built-in data type definitions
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

GQL syntax maps parameters via **parameter names**, not parameter order:
- If the name of the `queryWrapper` input parameter changes, the `queryWrapper` in the corresponding GQL syntax must also be changed to the same name for the request to be initiated normally.
- If the order of `page` and `queryWrapper` is swapped, the request result remains identical.

:::warning Note
For more content about RSQL, please refer to: [RSQL Service](/en/DevManual/Reference/Front-EndFramework/Services/RSQL-service.md).
:::


## (VII) GQL Syntax Example with `create`
All the examples we mentioned above use GQL syntax of type **Query**, and we omitted the `query` type by default. In this example, let’s look at GQL syntax of type **Mutation**:

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

The corresponding function definition is as follows:
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
Partial<GanttDemoModel> is equivalent to:
{
  id?: string;
  code?: string;
  name?: string;
  taskStartDate?: string;
  taskEndDate?: string;
}
*/
```

During creation, we are allowed to pass an object **without a primary key (id)** and retrieve the primary key (id) from the return value to verify that the object was created successfully.

:::warning Note
`Partial` is a TypeScript type declaration that converts **all properties** of an object type into **optional properties**.
:::


## (VIII) GQL Syntax Example with `update`
The syntax of the `update` function is almost identical to that of the `create` function. However, it is important to emphasize that **a primary key (id) must be passed** for the update to succeed. In this example, we can use template syntax to pass the incoming primary key (id) field into the GQL input parameters and update the `name` to `newName`:

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

The corresponding function definition is as follows:
```typescript
import { IdModel } from '@oinone/kunlun-dependencies';

export interface GanttDemoModel {
  id: string;
  code: string;
  name: string;
  taskStartDate: string;
  taskEndDate: string;
}

/* Built-in data type definition
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
Required<IdModel> is equivalent to:
{
  id: string;
}
*/
```

:::warning Note
The rule "a primary key (id) must be passed for the update to succeed" is part of the update logic provided by the default data manager function. It can be modified based on actual scenarios in specific businesses.

`Required` is a TypeScript type declaration that converts **all properties** of an object type into **non-nullable properties**. Of course, you can also directly use an anonymous type like `{ id: string }` for definition.

### Update Logic of the Default Data Manager Function:
- **Update Condition**: Updates the object via the primary key.
- **Update Data**: The incoming values determine which fields to update; fields not passed will not be updated.
- **Associated Object Creation/Update**:
  - **Many-to-One**: Associated fields must be flattened in the main model; passing an object is meaningless.
  - **One-to-Many**: Must be passed in the format of an array of objects; a primary key (id) is required; fields not passed will not be updated.
  - **Many-to-Many**: Must be passed in the format of an array of objects; a primary key (id) is required; passing other values is meaningless.

For more content about association type definitions, please refer to: [ORM API - Relation Types](/en/DevManual/Reference/Back-EndFramework/ORM-API.md#4-relation-types) (Association Types Section).
:::


## (IX) GQL Syntax Example with `delete`
In the above sections, we introduced GQL syntax for functions with object-type input parameters. The `delete` function supports **single-row or multi-row** data interaction, and its input parameter is an **array of objects**. By default, the delete operation only requires passing the primary key (id) to complete the deletion.

### GQL Syntax for Deleting a Single Object:
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

### GQL Syntax for Deleting Multiple Objects:
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

It can be seen that deleting multiple objects simply repeats the structure of each object in the array, and finally concatenates them with commas to form an array of objects.

The corresponding function definition is as follows:
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

Here, we do not use the full model for the input parameter, but instead use the `IdModel` type (which only has an `id` field). This type declaration enables static type checking for the caller when passing data, preventing parameter passing errors and also reflecting the backend function definition.

:::warning Note
The input parameter of the `delete` function differs from that of the `create` and `update` functions: its input parameter name is `dataList`, and its type is an array of objects.

The use of `IdModel` assumes that the backend defines the `GanttDemoModel` by inheriting `IdModel`.

Both the frontend and backend have `IdModel` and `CodeModel`, with identical inheritance relationships and field definitions.
:::

## (X) Data Type Mapping  
In Oinone, there are clear standards and specifications for handling different field business types in GQL syntax, input parameters, and return values. This is also a crucial part of the frontend-backend interaction boundary. Understanding the relationships between these data types is essential for using Oinone.


### 1. Primitive Data Types  
The table below shows the mapping relationships between **field business types**, **primitive data types** (excluding multi-value types, composite data types, and relationship types):  

| Field Business Type | Java Type       | TypeScript Type | GQL Input Syntax          | Description                                                                 |
|---------------------|-----------------|-----------------|---------------------------|-----------------------------------------------------------------------------|
| Integer             | `Integer`       | `number`        | `data: 123`               | No double quotes                                                           |
| Integer             | `Long`          | `string`        | `data: "123"`             | With double quotes (to avoid precision loss in JavaScript)                 |
| Floating Point      | `Float`         | `number`        | `data: 123.12`            | No double quotes                                                           |
| Floating Point      | `Double`        | `string`        | `data: "123.12"`          | With double quotes (to avoid precision loss in JavaScript)                 |
| Amount              | `BigDecimal`    | `string`        | `data: "123.12"`          | Returned as a text type with 6 decimal places                              |
| Boolean             | `Boolean`       | `boolean`       | `data: true/false`        | No double quotes; only accepts `true` or `false`                           |
| Text                | `String`        | `string`        | `data: "test"`            | With double quotes                                                         |
| Phone               | `String`        | `string`        | `data: "11111111111"`     | Same as Text type                                                          |
| Email               | `String`        | `string`        | `data: "admin@shushi.pro"`| Same as Text type                                                          |
| Multi-line Text     | `String`        | `string`        | `data: "test"`            | Same as Text type                                                          |
| Rich Text           | `String`        | `string`        | `data: "test"`            | Same as Text type (stores HTML content as a string)                        |
| DateTime            | `Date`          | `string`        | `data: "2019-04-09 13:00:00"` | Formatted as "YYYY-MM-DD HH:mm:ss"                                         |
| Date                | `Date`          | `string`        | `data: "2019-04-09"`      | Formatted as "YYYY-MM-DD"                                                  |
| Time                | `Date`          | `string`        | `data: "13:00:00"`        | Formatted as "HH:mm:ss"                                                   |
| Year                | `Date`          | `string`        | `data: "2019"`            | Formatted as "YYYY"                                                        |


### 2. Enum Type (Data Dictionary)  
Enums are a special data type in Oinone, containing four attributes: **name** (internal identifier), **value** (storage value), **displayName** (user-facing label), and **help** (tooltip text).  

Let’s use an enum where `name` and `value` differ as an example (`base.Active`):  

| Name          | Value  | Display Name | Help Text |
|---------------|--------|--------------|-----------|
| **ACTIVE**    | `true` | 激活         | 激活      |
| **INACTIVE**  | `false`| 无效         | 无效      |  


In GQL, **name** is uniformly used for frontend-backend interaction (both input and output).  

For example, if we add a `status` field of type `ActiveEnum` to the `GanttDemoModel`, the corresponding GQL syntax would be `status: ACTIVE`—using the enum’s **name** as the value (without double quotes).  

The TypeScript type definition for this scenario is:  
```typescript
import { ActiveEnum } from '@oinone/kunlun-dependencies';

export interface GanttDemoModel {
  id: string;
  code: string;
  name: string;
  taskStartDate: string;
  taskEndDate: string;
  status: ActiveEnum; // Enum type
}

/* Built-in data type definition
enum ActiveEnum {
  ACTIVE = 'ACTIVE', // Name and value are the same (common in TypeScript)
  INACTIVE = 'INACTIVE'
}
*/
```

:::warning Note  
In TypeScript, enum definitions corresponding to Oinone enums usually set `name` and `value` to the same value for easier data transfer.  

As a frontend developer, you don’t need to care about how the `value` is used in the backend. However:  
- `displayName` is the user-facing option shown in UI components (e.g., dropdowns).  
- `help` is typically used as tooltip text when the user hovers over the option.  
These two values may behave differently across components.  
:::


### 3. Map Data Type (Key-Value Pairs)  
Key-value pairs are usually stored in **JSON** format. For frontend-backend interaction:  
- Use `GraphqlHelper#serializableObject` to process JSON objects.  
- Use `GraphqlHelper#serializableObjectArray` to process arrays of JSON objects.  

When passing Map data to GQL, serialize the object using template syntax:  
```typescript
import { GraphqlHelper } from '@oinone/kunlun-dependencies';

// Sample JSON object
const jsonData = {
  "key1": "value1",
  "key2": "value2"
}

// GQL with serialized Map data
const gql = `mutation {
  ganttDemoModelMutation {
    update(
      data: {
        id: "${id}", 
        jsonData: "${GraphqlHelper.serializableObject(jsonData)}", // Serialize single JSON object
        jsonArrayData: "${GraphqlHelper.serializableObjectArray([jsonData, jsonData])}" // Serialize JSON array
      }
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


### 4. Multi-Value Types for Primitive Data  
To pass multi-value data, convert any single-value type into an **array format**. The format of each item in the array is identical to the corresponding primitive data type.  

Array format: `[${value1}, ${value2}, ${value3}...]`  

| Field Business Type | Java Type         | TypeScript Type | GQL Input Syntax                  |
|---------------------|-------------------|-----------------|-----------------------------------|
| Integer             | `List<Integer>`   | `number[]`      | `data: [1, 2, 3]`                 |
| Integer             | `List<Long>`      | `string[]`      | `data: ["1", "2", "3"]`           |
| Floating Point      | `List<Float>`     | `number[]`      | `data: [1.12, 2.12, 3.12]`        |
| Floating Point      | `List<Double>`    | `string[]`      | `data: ["1.12", "2.12", "3.12"]`  |
| Text                | `List<String>`    | `string[]`      | `data: ["test1", "test2", "test3"]`|


## (XI) Data Submission for Relationship Types  

### 1. Many-to-One (M2O)  
A many-to-one relationship means multiple records of the current model associate with **one record** of another model (e.g., multiple tasks belong to one project).  


#### Field Definition  
Assume the `GanttDemoModel` has a `task` field that establishes a many-to-one relationship with the `GanttTask` model. (Only the `id` field of `GanttTask` is required to establish this relationship.)  

| Display Name | API Name  | Field Type   | Related Model (references) | Relationship Field (relationFields) | Reference Field (referenceFields) |
|--------------|-----------|--------------|----------------------------|--------------------------------------|-----------------------------------|
| Task         | `task`    | Many-to-One  | `GanttTask`                | `taskId` (stored in the main model)   | `id` (primary key of `GanttTask`) |
| Task ID      | `taskId`  | Integer      | -                          | -                                    | -                                 |


#### Update Relationship via `taskId` (Relationship Field)  
Since the many-to-one relationship is established by storing the related model’s primary key (`taskId`) in the main model, you can directly update `taskId` to modify the relationship:  
```typescript
const gql = `mutation {
  ganttDemoModelMutation {
    update(data: {id: "${id}", taskId: "${taskId}"}) {
      id
      code
      name
      task { # Retrieve associated task details in the response
        id
        code
        name
      }
    }
  }
}`
```


#### Update Relationship via `task` (Related Model Object)  
You can also pass the entire related model object (`task`) instead of `taskId`. The backend will automatically extract the `id` from the `task` object and assign it to `taskId`:  
```typescript
// TypeScript interface definition
export interface GanttDemoModel {
  id: string;
  code: string;
  name: string;
  taskStartDate: string;
  taskEndDate: string;
  taskId?: string; // Optional (auto-filled by backend if task.id is provided)
  task?: Partial<GanttTask>; // Related model object (partial fields allowed)
}

export interface GanttTask {
  id: string;
  code: string;
  name: string;
}

// GQL for updating via related model object
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

:::warning Note  
If both `taskId` and `task.id` are provided, **`task.id` takes precedence**. In practice, use only one method to update relationships to avoid confusion.  
:::


### 2. One-to-Many (O2M)  
A one-to-many relationship means one record of the current model associates with **multiple records** of another model (e.g., one project has multiple tasks).  


#### Field Definition  
Assume the `GanttDemoModel` has a `children` field that establishes a one-to-many relationship with another `GanttDemoModel` (self-reference, e.g., parent tasks and child tasks).  

| Display Name | API Name   | Field Type   | Related Model (references) | Relationship Field (relationFields) | Reference Field (referenceFields) |
|--------------|------------|--------------|----------------------------|--------------------------------------|-----------------------------------|
| Children     | `children` | One-to-Many  | `GanttDemoModel`           | `id` (primary key of the parent)      | `parentId` (foreign key of child) |
| Parent Task ID | `parentId` | Integer      | -                          | -                                    | -                                 |


#### Update Relationship via `children` (Related Model Array)  
To update one-to-many relationships, pass an array of related objects (`children`). The backend will handle creation/updates based on whether the `id` (primary key) is present:  

```typescript
// GQL for creating child tasks (no id provided)
const gql = `mutation {
  ganttDemoModelMutation {
    update(
      data: {
        id: "${id}", 
        children: [
          {code: "c1", name: "c1"},  # New child (no id → created)
          {code: "c2", name: "c2"}   # New child (no id → created)
        ]
      }
    ) {
      id
      code
      name
      children {
        id
        parentId # Auto-filled with the parent's id
        code
        name
      }
    }
  }
}`
```


#### Dynamic GQL Splicing for Create/Update  
When updating existing child tasks, you must include their `id` (to avoid duplicate data). Use dynamic template syntax to handle both create and update scenarios:  

```typescript
// TypeScript interface
export interface GanttDemoModel {
  id: string;
  code: string;
  name: string;
  taskStartDate: string;
  taskEndDate: string;
  parentId?: string;
  children?: Partial<GanttDemoModel>[]; // Array of child tasks
}

// Sample data (may contain existing children with id or new children without id)
const data: Partial<GanttDemoModel> & Required<{id: string}>;

// Dynamically splice GQL for children
const gql = `mutation {
  ganttDemoModelMutation {
    update(data: {
      id: "${data.id}", 
      children: [
        ${// Splice child objects: add id only if it exists
          data.children?.map(child => 
            `{code: "${child.code}", name: "${child.name}"${child.id ? `, id: "${child.id}"` : ''}}`
          ).join(', ') || ''
        }
      ]
    }) {
      id
      code
      name
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

:::warning Note  
While template syntax is convenient for splicing GQL, complex logic can become unreadable. Later in this guide, we will introduce GQL utility classes to simplify dynamic GQL construction.  
:::


#### Default Update Logic for One-to-Many Fields  
- If no `id` is provided in the related object: Create a new object and bind the relationship.  
- If an `id` is provided: Update the existing object and refresh the relationship.  
- If an existing object is missing from the `children` array: Remove the relationship (the child object itself is not deleted unless configured otherwise).  


### 3. Many-to-Many (M2M)  
A many-to-many relationship means multiple records of the current model associate with **multiple records** of another model (e.g., multiple projects associate with multiple tasks). A join table (intermediate model) is used to store these associations.  


#### Field Definition  
Assume the `GanttDemoModel` has a `tasks` field that establishes a many-to-many relationship with the `GanttTask` model. A join table `GanttDemoModelRelGanttTask` is used to manage the associations.  

| Display Name | API Name | Field Type   | Related Model (references) | Join Table (through)       | Relationship Field (relationFields) | Join Table Relationship Field (throughRelationFields) | Reference Field (referenceFields) | Join Table Reference Field (throughReferenceFields) |
|--------------|----------|--------------|----------------------------|----------------------------|--------------------------------------|-------------------------------------------------------|-----------------------------------|------------------------------------------------------|
| Tasks        | `tasks`  | Many-to-Many | `GanttTask`                | `GanttDemoModelRelGanttTask` | `id` (primary key of `GanttDemoModel`) | `ganttId` (foreign key in join table)                 | `id` (primary key of `GanttTask`) | `taskId` (foreign key in join table)                  |


#### Join Table (`GanttDemoModelRelGanttTask`)  
The join table only stores foreign keys to link the two models:  

| Display Name | API Name   | Field Type |
|--------------|------------|------------|
| Gantt ID     | `ganttId`  | Integer    |
| Task ID      | `taskId`   | Integer    |


#### Update Relationship via `tasks` (Related Model Array)  
Updating many-to-many relationships is similar to one-to-many. Pass an array of related objects (`tasks`), and the backend will manage the join table automatically:  

```typescript
// TypeScript interfaces
export interface GanttDemoModel {
  id: string;
  code: string;
  name: string;
  taskStartDate: string;
  taskEndDate: string;
  tasks?: Partial<GanttTask>[]; // Array of associated tasks
}

export interface GanttTask {
  id: string;
  code: string;
  name: string;
}

// Sample data
const data: Partial<GanttDemoModel> & Required<{id: string}>;

// Dynamic GQL for many-to-many update
const gql = `mutation {
  ganttDemoModelMutation {
    update(data: {
      id: "${data.id}", 
      tasks: [
        ${// Splice task objects: add id only if it exists
          data.tasks?.map(task => 
            `{code: "${task.code}", name: "${task.name}"${task.id ? `, id: "${task.id}"` : ''}}`
          ).join(', ') || ''
        }
      ]
    }) {
      id
      code
      name
      tasks {
        id
        code
        name
      }
    }
  }
}`
```


#### Default Update Logic for Many-to-Many Fields  
- No `id` provided: Create a new `GanttTask` and insert a record into the join table.  
- `id` provided: Update the existing `GanttTask` and refresh the join table.  
- Only `id` provided: Skip updating the `GanttTask`; only refresh the join table.  
- Missing existing task: Delete the corresponding record from the join table (unlink the relationship, but the `GanttTask` itself is not deleted).  


# II. Initiating GQL Requests via HttpClient  
To send the GQL defined in the previous section to the backend, follow these steps:  

1. Obtain an `HttpClient` instance using `HttpClient#getInstance`.  
2. Determine the **module name** based on where the model resides.  
3. Define model types (recommended: unify type definitions in the `src/types` directory).  
4. Define methods and initiate requests using a Class (recommended: unify services in the `src/service` directory).  


The following code demonstrates how to initiate a GQL request via `HttpClient` and retrieve the result:  

```typescript
import { HttpClient } from '@kunlun/dependencies';

// Get singleton HttpClient instance
const http = HttpClient.getInstance();

// Module name (matches the model's module)
const MODULE_NAME = 'demo';

// Type definition for the model (recommended: place in src/types)
interface GanttDemoModel {
  id: string;
  code: string;
  name: string;
  taskStartDate: string;
  taskEndDate: string;
}

// Service class (recommended: place in src/service)
export class GanttDemoModelService {
  /**
   * Query task list using queryListByWrapper
   * @returns Promise<GanttDemoModel[]>
   */
  public static async queryListByWrapper(): Promise<GanttDemoModel[]> {
    // Define GQL
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

    // Send GQL request (use http.query for Query-type requests)
    const res = await http.query<GanttDemoModel[]>(MODULE_NAME, gql);

    // Extract data from the response (matches GQL structure)
    return res.data['ganttDemoModelQuery']['queryListByWrapper'];
  }
}
```


This is the **lowest-level, unencapsulated** way to send requests, and it is often the most efficient.  

:::warning Note  
- You can freely add/remove fields in `responseParameters` and observe differences in the response.  
- Practice by sending requests with the various GQL syntaxes mentioned earlier.  

For more details about `HttpClient`, refer to: [HttpClient Service](/en/DevManual/Reference/Front-EndFramework/Services/httpclient-service.md)  
:::

# III. Initiating GQL Requests with the GET Method  
All requests initiated using the `HttpClient` service instance use the **POST** method. So, when do we need to use the **GET** method? Typically, the GET method is required only when relying on backend services for **synchronous file downloads**.  


As mentioned earlier when analyzing browser requests, GQL requests consist of two parts: `query` and `variables`. For the GET method, you only need to append these parameters to the URL as request query parameters.  


Since it is not easy to find a practical example for practice, we will use the GQL from the previous section and open it via the GET method in this example. The response will be data in JSON format, as shown below:  

```typescript
public static queryListByWrapperByWindowOpen(): void {
  // Define the GQL query
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

  // Construct the complete URL: append base path and encode GQL
  const url = UrlHelper.appendBasePath(`/pamirs/${MODULE_NAME}?query=${encodeURIComponent(gql)}`);

  // Open the URL in a new browser tab
  window.open(url, '_blank');
}
```


The `UrlHelper#appendBasePath` method is provided by Oinone to handle operations related to the `BASE_PATH` (the root path of the application). The final complete URL follows this format:  

```typescript
`${BASE_PATH}/pamirs/${MODULE_NAME}`

// Example: If BASE_PATH = '/test'
// Resulting URL: /test/pamirs/demo
```


For **synchronous file download** functionality, you can use `window.open` to open a new window. This triggers the browser to receive a file stream from the backend, automatically recognize it as a file, and prompt the user to download it.  

:::warning Note  
For more information about environment configuration (including `BASE_PATH`), refer to: [Environment](/en/DevManual/Reference/Front-EndFramework/environment.md)  
:::


# IV. Using GQL Utility Classes  
In Oinone, while direct use of the native `HttpClient` allows efficient request initiation, this low-level capability is not very user-friendly without encapsulation. To address this, Oinone provides utility classes to simplify GQL request workflows.  


## (I) GQLBuilder  
Take `ganttDemoModel#queryListByWrapper` as an example:  

```typescript
const MODULE_NAME = 'demo';
const MODEL_NAME = 'ganttDemoModel';

public static queryListByWrapperByGQLBuilder(): Promise<GanttDemoModel[]> {
  return GQL.query(MODEL_NAME, 'queryListByWrapper') // Initialize Query-type GQL
    .buildRequest((builder) => { // Build request parameters
      builder.buildObjectParameter('queryWrapper', (builder) => {
        builder.stringParameter('rsql', '1==1'); // Add rsql parameter to queryWrapper
      });
    })
    .buildResponse((builder) => { // Define response fields
      builder.parameter('id', 'code', 'name', 'taskStartDate', 'taskEndDate');
    })
    .request(MODULE_NAME); // Send request to the specified module
}
```


A key challenge with raw GQL string concatenation is handling complex types like **objects** or **arrays**. `GQLBuilder` eliminates this hassle by providing built-in methods to process various data types. You no longer need to manually manage parameter splicing logic. This approach is the closest to direct `HttpClient` usage while remaining user-friendly.  

:::warning Note  
For more usage examples and API details about `GQLBuilder`, refer to: [GraphQL Service - GQLBuilder](/en/DevManual/Reference/Front-EndFramework/Services/graphQL-service.md#i-gqlbuilder)  
:::


## (II) GenericFunctionService  
In practice, we found that initiating GQL requests is more cumbersome than using `Ajax/Axios`. Is there a way to send GQL requests in an `Ajax/Axios`-like manner?  

Yes—use `GenericFunctionService` to initiate GQL requests with a simplified, `Ajax/Axios`-style API:  

```typescript
public static queryListByWrapper(): Promise<GanttDemoModel[] | undefined> {
  return GenericFunctionService.INSTANCE.simpleExecuteByName(
    MODEL_MODEL,       // Namespace (matches the model's full path)
    'queryListByWrapper', // Function name
    { rsql: '1==1' }   // Request parameters (equivalent to request body)
  );
}
```


A standard `Ajax/Axios` request includes a **request path (URL)**, **request method (HttpMethod)**, and **request body (Body)**. Similarly:  
- The first two parameters of `simpleExecuteByName` are the **namespace** and **function name** (equivalent to the `URL`).  
- Subsequent parameters are the **request body** (supports any number of parameters).  
- The request method is fixed to `POST` and does not need explicit configuration.  


:::warning Note  
For more API details and usage examples of `GenericFunctionService`, refer to: [GraphQL Service - GenericFunctionService](/en/DevManual/Reference/Front-EndFramework/Services/graphQL-service.md#ii-genericfunctionservice)  
:::


# V. Initiating GQL Requests in Pages  
In Oinone, the model metadata corresponding to a page is fully loaded when `viewAction#load` executes. This metadata is stored in the `RuntimeContext` (runtime context). To initiate page-specific GQL requests, you only need to retrieve the request fields from the page metadata using `RuntimeContext#getRequestModelFields`.  


In summary, initiating GQL requests in a page involves three core steps:  
1. Retrieve the specified function definition via `FunctionCache`.  
2. Get request fields via `RuntimeContext#getRequestModelFields`.  
3. Initiate the request via `FunctionService`.  


The code implementation is as follows:  

```typescript
// Step 1: Retrieve the function definition (e.g., "update" function)
const functionName = 'update';
const functionDefinition = await FunctionCache.getByName(this.model.model, functionName);
if (!functionDefinition) {
  throw new Error(`Invalid function definition. name: ${functionName}`);
}

// Step 2: Get request fields from page metadata (auto-matched to the page model)
const requestFields = this.rootRuntimeContext.getRequestModelFields();

// Step 3: Initiate the request via FunctionService
return (
  (await FunctionService.INSTANCE.simpleExecute(
    this.model,                // Current page model
    functionDefinition,        // Function definition from Step 1
    {
      requestFields,           // Request fields from Step 2
      responseFields: requestFields, // Response fields (reuse request fields here)
      variables,               // Additional variables (if needed)
      context                  // Request context (if needed)
    },
    data                       // Actual request data (e.g., updated model values)
  )) || {}
);
```


:::warning Tip: Relationship Between FunctionService and GenericFunctionService  
`GenericFunctionService` ultimately initiates requests via `FunctionService`. The key difference is that `GenericFunctionService` automatically retrieves model metadata and function definitions via `ModelCache` and `FunctionCache` before sending the request—eliminating the need for manual metadata handling.  

For more information about metadata: [Metadata Service](/en/DevManual/Reference/Front-EndFramework/Services/metadata-service.md)  
For more information about HTTP requests: [HttpClient Service](/en/DevManual/Reference/Front-EndFramework/Services/httpclient-service.md)  
:::


# VI. Using HttpClient Interceptors  
HttpClient provides two types of interceptors to customize request/response workflows:  
- `NetworkMiddlewareHandler`: Encapsulated based on **Apollo-Link Middleware**. It can modify request parameters (before sending) and process response results (after receiving).  
- `NetworkInterceptor`: Built on top of `NetworkMiddlewareHandler`. It only processes **response results** (simplified for error handling and post-response logic).  


:::warning Note  
For more information about Apollo-Link Middleware, refer to the official documentation: [Middleware](https://www.apollographql.com/docs/react/v2/networking/network-layer#middleware)  
:::


## (I) Creating a CustomNetworkMiddlewareHandler  
First, review the type declaration for `NetworkMiddlewareHandler`:  

```typescript
/**
 * Network request middleware handler (encapsulated based on native Apollo)
 */
export type NetworkMiddlewareHandler = (operation: Operation, forward: NextLink) => Promise<any> | any;
```


Next, create a `CustomNetworkMiddlewareHandler` to **append custom headers to all requests**:  

```typescript
export const CustomNetworkMiddlewareHandler: NetworkMiddlewareHandler = (operation, forward) => {
  // Modify the request context to add custom headers
  operation.setContext(({ headers = {} }) => {
    return {
      headers: {
        ...headers, // Preserve existing headers
        arg1: 'a',  // Custom header 1
        arg2: 'b'   // Custom header 2
      }
    };
  });

  // Forward the modified operation to the next link in the chain
  return forward(operation).subscribe({});
};
```


## (II) Activating CustomNetworkMiddlewareHandler  
To make the interceptor take effect, specify the `http.middleware` parameter when initializing `VueOioProvider` (Oinone’s Vue provider):  

```typescript
VueOioProvider({
  http: {
    middleware: [CustomNetworkMiddlewareHandler] // Register the custom middleware
  }
});
```


## (III) Creating a CustomNetworkInterceptor  
First, review the type declaration for `NetworkInterceptor`:  

```typescript
/**
 * <h3>Network Request Interceptor</h3>
 * <ul>
 *   <li>Interceptors execute in the order they are registered</li>
 *   <li>Execution stops if any interceptor returns `false`</li>
 *   <li>Built-in interceptors always run before custom interceptors</li>
 * </ul>
 */
export interface NetworkInterceptor {
  /**
   * Triggered when the request succeeds
   * @param response The successful response result
   */
  success?(response: IResponseResult): ReturnPromise<boolean>;

  /**
   * Triggered when the request fails
   * @param response The error response result
   */
  error?(response: IResponseErrorResult): ReturnPromise<boolean>;
}
```


The interface defines separate methods for **successful requests** and **failed requests**. Create a `CustomNetworkInterceptor` as follows:  

```typescript
export class CustomNetworkInterceptor implements NetworkInterceptor {
  /**
   * Handle successful responses
   * @returns `true` to continue executing subsequent interceptors; `false` to stop
   */
  public success(response: IResponseResult) {
    // Add custom success logic (e.g., log response data)
    console.log('Request succeeded:', response);
    return true; // Continue executing other interceptors
  }

  /**
   * Handle failed responses
   * @returns `true` to continue executing subsequent interceptors; `false` to stop
   */
  public error(response: IResponseErrorResult) {
    // Add custom error logic (e.g., show error messages)
    console.error('Request failed:', response);
    return true; // Continue executing other interceptors
  }
}
```


:::warning Note  
- Return `true` to allow subsequent interceptors to run.  
- Return `false` to terminate the interceptor chain (no further interceptors will execute).  

For more information about interceptors, refer to: [HttpClient Service](/en/DevManual/Reference/Front-EndFramework/Services/httpclient-service.md)  
:::


## (IV) Activating CustomNetworkInterceptor  
To activate the custom interceptor, specify the `http.interceptor` parameter in `VueOioProvider`. For simplicity, use the `afterInterceptors` parameter (runs after built-in interceptors):  

```typescript
VueOioProvider({
  http: {
    interceptor: {
      afterInterceptors: [new CustomNetworkInterceptor()] // Register the custom interceptor
    }
  }
});
```


:::warning Note  
For more details about the `http.interceptor` configuration, refer to: [Framework Overview](/en/DevManual/Reference/Front-EndFramework/framework-overview.md)  
:::


## (V) Common Use Cases for Interceptors  
Interceptors are used to add custom logic **before sending requests** or **after receiving responses** to meet business requirements. Typical use cases include:  
1. Use `NetworkInterceptor` to:  
   - Handle error codes (e.g., redirect for 401 Unauthorized).  
   - Implement page redirection (e.g., navigate to a warning page for critical errors).  
   - Load cached data (e.g., return cached results for duplicate requests).  
2. Use `NetworkMiddlewareHandler` to:  
   - Encrypt requests and decrypt responses (to ensure data security).  
   - Append unified headers (e.g., authentication tokens, language settings) to all requests.