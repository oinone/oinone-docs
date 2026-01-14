---
title: 网关协议 API（Protocol API）
index: true
category:
  - 研发手册
  - Reference
  - 后端API
  - Advance API
order: 1
prev:
  text: 安全机制（Security in Oinone）
  link: /zh-cn/DevManual/Reference/Back-EndFramework/security-in-oinone.md
---
# 一、请求 URL 规范

```plain
http://127.0.0.1:8090/pamirs/DemoCore?scene=redirectListPage
```

| **组成部分** | **说明**                                                     |
| :----------- | :----------------------------------------------------------- |
| 服务器地址   | `127.0.0.1`<br/>，支持 IP 地址或域名                         |
| 服务端口     | `8090`<br/>，默认服务端口号                                  |
| 固定路径     | `pamirs`<br/>，协议统一前缀                                  |
| 模块名称     | `DemoCore`<br/>，指定目标业务模块                            |
| 场景信息     | `scene=redirectListPage`<br/>，通过 URL 参数传递请求场景     |
| 请求来源模块 | 由 HTTP 头部信息携带，用于负载均衡时进行后端服务器路由策略匹配 |


**应用场景**：在分布式系统中，可根据模块名称`DemoCore`将请求定向到特定的服务器集群，实现流量分发与负载均衡。

# 二、请求协议

Oinone 前后端网络协议采用 GraphQL 和 RSQL 相结合的方式。GraphQL 作为 API 查询语言，负责定义数据的查询和操作规范；RSQL 则用于参数化过滤数据，两者协同工作，为 Oinone 系统提供高效、灵活的数据交互能力。

## （一）GraphQL 协议详解

### 1、GraphQL 基础概念

GraphQL 是一种用于 API 的查询语言，基于类型系统执行查询。它不依赖特定数据库或存储引擎，而是通过定义类型、字段及解析函数，实现客户端与服务器之间的数据交互。GraphQL 服务由类型定义和字段解析函数构成，客户端通过`query`获取数据，`mutation`修改数据，`subscription`接收数据更新。

### 2、Oinone 对 GraphQL 的扩展

Oinone 在标准 GraphQL 基础上，扩展支持了以下数据类型：

+ **数值类型**：`BigDecimal`、`BigInteger`、`Double`
+ **时间类型**：`Date`
+ **特殊类型**：`Html`、`Money`、`Void`
+ **集合类型**：`Map`、`Obj`

### 3、GraphQL 示例

#### 查询示例

```graphql
query {
  testModelQuery {
    queryInfo(id: 123) {
      name
      description
    }
  }
}
```

上述查询通过`testModelQuery`下的`queryInfo`函数，传入`id`参数，获取指定名称和描述。

#### 分页查询示例

```graphql
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

该查询使用`queryPage`函数进行分页查询，并通过`queryWrapper`中的`rsql`字段传递 RSQL 过滤条件。

#### 修改数据示例

```graphql
mutation {
  testModelMutation {
    create(data: { name: "testName" }) {
      id
      name
    }
  }
}
```

通过`testModelMutation`下的`create`函数创建新数据。

## （二）RSQL 协议详解

### 1、RSQL 基础概念

RSQL 是基于 FIQL 的参数化过滤语言，核心特性：

+ **逻辑运算符**：
  - `;` 或 `and`：逻辑与
  - `,` 或 `or`：逻辑或
+ **比较运算符**：**plaintext**

```plain
== 等于
!= 不等于
=lt= 小于
=le= 小于等于
=gt= 大于
=ge= 大于等于
=in= 包含于
=out= 不包含于
```

### 2、Oinone 对 RSQL 的扩展

Oinone 在 RSQL 基础上，新增以下操作符：

+ **正常类型**：
  - 为空：`=isnull=`
  - 不为空：`=notnull=`
  - 模糊匹配：`=like=`
  - 不模糊匹配：`=notlike=`
  - 列相等：`=cole=`
  - 列不相等：`=colnot=`
  - 前缀匹配：`=starts=`
  - 无前缀匹配：`=notstarts=`
  - 后缀匹配：`=ends=`
  - 无后缀匹配：`=notends=`
+ **二进制枚举**：
  - 交集：`=has=`
  - 无交集：`=hasnt=`
  - 包含：`=contain=`
  - 不包含：`=notcontain=`

### 3、RSQL 与 GraphQL 结合示例

在 GraphQL 的`queryPage`查询中，通过`queryWrapper`的`rsql`字段传递 RSQL 过滤条件：

```graphql
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

**查询说明**：通过 RSQL 条件筛选出名称为`testName`且状态为`ENABLED`或`PENDING`的模型数据。

## （三） GraphQL 与 RESTful 的优势对比

| **特性**         | **RESTful**                     | **GraphQL**                    |
| :--------------- | :------------------------------ | :----------------------------- |
| **数据获取方式** | 多个 URL 端点，固定数据结构返回 | 单一端点，按需获取数据         |
| **灵活性**       | 结构固定，扩展性较差            | 灵活定义查询，适应复杂需求     |
| **数据传输效率** | 可能存在超额或不足获取数据      | 精确返回所需数据，减少传输量   |
| **版本控制**     | URL 中包含版本，非强制          | 强制向后兼容，更安全           |
| **错误处理**     | 需在代码中内置错误处理          | 强类型检查，自动生成错误消息   |
| **适用场景**     | 简单数据来源，资源明确          | 复杂、关联数据，客户端需求多变 |


## （四）Variables

### 1、Variables 变量

前端可通过 GraphQL 的`Variables`属性传递额外信息，如：

```json
{
  "scene": "菜单入口"
}
```

后端通过`PamirsSession.getRequestVariables()`获取变量值。

```java
PamirsRequestVariables variables = PamirsSession.getRequestVariables();
String scene = variables.getVariables().get("scene");
```

### 2、请求策略requestStrategy

| **配置项**    | **取值范围**                                                | **说明**                               |
| :------------ | :---------------------------------------------------------- | :------------------------------------- |
| checkStrategy | `RETURN_WHEN_COMPLETED`<br/> / `RETURN_WHEN_ERROR`          | 校验策略，控制结果返回时机             |
| msgLevel      | `DEBUG`<br/>/`INFO`<br/>/`WARN`<br/>/`SUCCESS`<br/>/`ERROR` | 消息级别过滤，仅返回指定级别以上的消息 |
| onlyValidate  | `true`<br/> / `false`                                       | 是否仅执行校验，不提交数据             |


```java
{
 	"requestStrategy": {
  	"checkStrategy": "RETURN_WHEN_COMPLETED",
    "msgLevel":"INFO"
	}
}
```

`requestStrategy`策略可有效控制`Validation`校验约束的执行。`Validation`已在 ORM API 和 Function API 中说明，能够作用于模型、字段、函数等不同层级，实现灵活且精准的业务校验。

## （五）占位符 PlaceHolder

在 Oinone 开发中，当遇到需要前端传递一些只有后端才知道值的参数时，可使用后端占位符。

### 1、后端定义占位符：

新建一个类继承 `AbstractPlaceHolderParser`，定义占位符。例如定义 `currentUserId` 占位符：

```java
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

### 2、前端使用后端占位符：

在前端设置过滤条件等场景中使用占位符，如在表格视图的 `search` 部分设置 `domain` 过滤条件：

```html
<template slot="search"  cols="4">
  <field data="relatedItems"  label="关联项目"  domain="creatorId == $#{currentUserId}"/>
</template>
```

前端提交时会将 `#` 过滤掉，后端自动将占位符替换为实际值。



Oinone 通过 GraphQL 和 RSQL 的结合，实现了高效、灵活的数据交互。GraphQL 负责定义数据查询和操作规范，RSQL 用于数据过滤，两者优势互补。同时，GraphQL 相比 RESTful 在数据获取效率、灵活性和错误处理等方面具有显著优势，更适合复杂数据场景。

