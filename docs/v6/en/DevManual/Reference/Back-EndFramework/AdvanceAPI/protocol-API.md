---
title: Protocol API
index: true
category:
  - R&D Manual
  - Reference
  - Backend API
  - Advance API
order: 1
prev:
  text: 安全机制（Security in Oinone）
  link: /v6/en/DevManual/Reference/Back-EndFramework/security-in-oinone.md
---
# Ⅰ、Request URL Specifications

``` plain
http://127.0.0.1:8090/pamirs/DemoCore?scene=redirectListPage
```

| **Component** | **Description**                                                     |
| :----------- | :----------------------------------------------------------- |
| Server Address   | `127.0.0.1`<br/>, supports IP address or domain name                         |
| Service Port     | `8090`<br/>, default service port number                                  |
| Fixed Path     | `pamirs`<br/>, unified protocol prefix                                  |
| Module Name     | `DemoCore`<br/>, specifies the target business module                            |
| Scene Information     | `scene=redirectListPage`<br/>, passes request scenarios through URL parameters     |
| Request Source Module | Carried by HTTP header information, used for backend server routing policy matching during load balancing |


**Application Scenario**: In a distributed system, requests can be directed to a specific server cluster based on the module name `DemoCore` to achieve traffic distribution and load balancing.

# Ⅱ、Request Protocol

The Oinone front-end and back-end network protocol adopts a combination of GraphQL and RSQL. GraphQL, as an API query language, is responsible for defining data query and operation specifications; RSQL is used for parameterized data filtering. The two work together to provide efficient and flexible data interaction capabilities for the Oinone system.

## (Ⅰ) Detailed Explanation of GraphQL Protocol

### 1. Basic Concepts of GraphQL

GraphQL is a query language for APIs that executes queries based on a type system. It does not depend on a specific database or storage engine but achieves data interaction between the client and the server by defining types, fields, and resolver functions. A GraphQL service consists of type definitions and field resolver functions. The client uses `query` to fetch data, `mutation` to modify data, and `subscription` to receive data updates.

### 2. Oinone's Extensions to GraphQL

Oinone extends and supports the following data types based on standard GraphQL:

+ **Numeric Types**: `BigDecimal`, `BigInteger`, `Double`
+ **Time Types**: `Date`
+ **Special Types**: `Html`, `Money`, `Void`
+ **Collection Types**: `Map`, `Obj`

### 3. GraphQL Examples

#### Query Example

``` graphql
query {
  testModelQuery {
    queryInfo(id: 123) {
      name
      description
    }
  }
}
```

The above query uses the `queryInfo` function under `testModelQuery`, passes the `id` parameter, and fetches the specified name and description.

#### Pagination Query Example

``` graphql
query {
  testModelProxyQuery {
    queryPage(
      page: { currentPage: 1, pageSize: 10 }
      queryWrapper: { rsql: "(status==\"ENABLED\")", queryData: {} }
    ) {
      content {
        id
        name
        status
      }
      totalPages
      totalElements
    }
  }
}
```

This query uses the `queryPage` function for pagination query and passes the RSQL filter condition through the `rsql` field in `queryWrapper`.

#### Data Modification Example

``` graphql
mutation {
  testModelMutation {
    create(data: { name: "testName" }) {
      id
      name
    }
  }
}
```

Create new data through the `create` function under `testModelMutation`.

## (Ⅱ) Detailed Explanation of RSQL Protocol

### 1. Basic Concepts of RSQL

RSQL is a parameterized filtering language based on FIQL, with core features:

+ **Logical Operators**:
  - `;` or `and`: Logical AND
  - `,` or `or`: Logical OR
+ **Comparison Operators**: **plaintext**

``` plain
== Equals
!= Not equals
=lt= Less than
=le= Less than or equal to
=gt= Greater than
=ge= Greater than or equal to
=in= Contains
=out= Does not contain
```

### 2. Oinone's Extensions to RSQL

Oinone has added the following operators based on RSQL:

+ **Normal Types**:
  - Is null: `=isnull=`
  - Is not null: `=notnull=`
  - Fuzzy match: `=like=`
  - Not fuzzy match: `=notlike=`
  - Column equals: `=cole=`
  - Column not equals: `=colnot=`
  - Prefix match: `=starts=`
  - No prefix match: `=notstarts=`
  - Suffix match: `=ends=`
  - No suffix match: `=notends=`
+ **Binary Enumeration**:
  - Intersection: `=has=`
  - No intersection: `=hasnt=`
  - Contains: `=contain=`
  - Does not contain: `=notcontain=`

### 3. Example of Combining RSQL and GraphQL

In the GraphQL `queryPage` query, pass the RSQL filter condition through the `rsql` field of `queryWrapper`:

``` graphql
query {
  testModelProxyQuery {
    queryPage(
      page: { currentPage: 1, pageSize: 10 }
      queryWrapper: {
        rsql: "name==\"testName\" and status=in=(ENABLED,PENDING)",
        queryData: {}
      }
    ) {
      content {
        id
        name
        status
      }
      totalPages
      totalElements
    }
  }
}
```

**Query Description**: Filter model data with the name `testName` and status `ENABLED` or `PENDING` through RSQL conditions.

## (Ⅲ) Advantage Comparison Between GraphQL and RESTful

| **Feature**         | **RESTful**                     | **GraphQL**                    |
| :--------------- | :------------------------------ | :----------------------------- |
| **Data Acquisition Method** | Multiple URL endpoints, fixed data structure return | Single endpoint, data acquired on demand         |
| **Flexibility**       | Fixed structure, poor scalability            | Flexibly define queries, adapt to complex needs     |
| **Data Transmission Efficiency** | May have excessive or insufficient data acquisition      | Precisely return required data, reducing transmission volume   |
| **Version Control**     | Version included in URL, not mandatory          | Forced backward compatibility, safer           |
| **Error Handling**     | Error handling needs to be built into the code          | Strong type checking, automatically generate error messages   |
| **Applicable Scenarios**     | Simple data sources, clear resources          | Complex, related data,多变 client requirements |


## (Ⅳ) Variables

### 1. Variables

The front end can pass additional information through the `Variables` attribute of GraphQL, such as:

``` json
{
  "scene": "菜单入口"
}
```

The back end obtains the variable value through `PamirsSession.getRequestVariables()`.

``` java
PamirsRequestVariables variables = PamirsSession.getRequestVariables();
String scene = variables.getVariables().get("scene");
```

### 2. Request Strategy

| **Configuration Item**    | **Value Range**                                                | **Description**                               |
| :------------ | :---------------------------------------------------------- | :------------------------------------- |
| checkStrategy | `RETURN_WHEN_COMPLETED`<br/> / `RETURN_WHEN_ERROR`          | Validation strategy, controls the timing of result return             |
| msgLevel      | `DEBUG`<br/>/`INFO`<br/>/`WARN`<br/>/`SUCCESS`<br/>/`ERROR` | Message level filtering, only return messages above the specified level |
| onlyValidate  | `true`<br/> / `false`                                       | Whether to only perform validation without submitting data             |


``` java
{
 	"requestStrategy": {
  	"checkStrategy": "RETURN_WHEN_COMPLETED",
    "msgLevel":"INFO"
	}
}
```

The `requestStrategy` can effectively control the execution of `Validation` constraints. `Validation` has been described in ORM API and Function API, and can act on different levels such as models, fields, and functions to achieve flexible and precise business validation.

## (Ⅴ) PlaceHolder

In Oinone development, when encountering parameters that need to be passed by the front end but whose values are only known by the back end, back-end placeholders can be used.

### 1. Backend Define PlaceHolder

Create a new class inheriting from `AbstractPlaceHolderParser` to define placeholders. For example, define the `currentUserId` placeholder:

``` java
@Component
public class UserPlaceHolder extends AbstractPlaceHolderParser {
    @Override
    protected String value() {
        return PamirsSession.getUserId().toString();
    }

    @Override
    public Integer priority() {
        return 10;
    }

    @Override
    public Boolean active() {
        return Boolean.TRUE;
    }

    @Override
    public String namespace() {
        return "currentUserId";
    }
}
```

### 2. Frontend Use Backend PlaceHolder

Use placeholders in scenarios such as setting filter conditions on the front end, for example, setting the `domain` filter condition in the `search` part of the table view:

``` html
<template slot="search"  cols="4">
  <field data="relatedItems"  label="关联项目"  domain="creatorId == $#{currentUserId}"/>
</template>
```

When the front end submits, the `#` will be filtered out, and the back end will automatically replace the placeholder with the actual value.



Oinone realizes efficient and flexible data interaction through the combination of GraphQL and RSQL. GraphQL is responsible for defining data query and operation specifications, and RSQL is used for data filtering. The two complement each other's advantages. At the same time, GraphQL has significant advantages over RESTful in terms of data acquisition efficiency, flexibility, and error handling, making it more suitable for complex data scenarios.