---
title: 开发辅助：使用GraphQL生成API文档
index: true
category:
  - 常见解决方案
order: 17
---

:::info 目标：在本节结束时，应当能够使用GraphQL生成API文档

:::

# 一、后端接口实现逻辑解析
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/1746610185735-035eda30-69a0-4d3a-99a5-28e61dfe8bb2-20250530144823111.png)

# 二、使用GraphQL生成API文档
GraphiQL 作为一款极为流行的交互式开发环境（IDE），专为浏览、编写以及测试 GraphQL 查询而设计。它不仅能够辅助您对 API 进行查询操作，还具备自动生成文档的能力。以下详细阐述使用 GraphiQL 的具体步骤：

仓库地址：[https://github.com/anvilco/spectaql?tab=readme-ov-file#yaml-options](https://github.com/anvilco/spectaql?tab=readme-ov-file#yaml-options)

## （一）使用GraphiQL 工具生成API文档。
### 1、**GraphiQL 安装与配置**
方式 ： 本地或全局安装 GraphiQL

如果你的 GraphQL API 服务器没有内置 GraphiQL，你可以使用独立的 GraphiQL 框架或包。

+ **全局安装 GraphiQL**
如果你想在本地环境使用 GraphiQL，你可以通过 `npm` 或 `yarn` 安装：
如果下载不成功可以使用淘宝镜像源

```bash
npm install -g graphiql
```

+ **通过 npm 或 Yarn 安装为开发依赖**
你也可以将 `GraphiQL` 作为开发依赖安装到项目中：

```bash
npm install graphiql
```

+ **生成您的文档！**

```bash
npx spectaql config.yml
```

运行此命令你需要一份`config.yml`文件。具体使用参考[https://github.com/anvilco/spectaql?tab=readme-ov-file#yaml-options](https://github.com/anvilco/spectaql?tab=readme-ov-file#yaml-options)



### 2、**使用JSON格式生成文档**
生成或导出 schema 文件

+ **自动生成 schema**
如果你使用的是 Java 类和注解方式定义的 GraphQL API（使用 `@GraphQLQuery` 等注解），GraphQL schema 通常在运行时生成。你可以使用 Spring Boot 启动后访问 GraphQL endpoint 来手动导出 schema。

下面是一个 introspection 查询的示例，它可以帮助你获取 schema：这个查询可根据文档需要动态调整。查询`http://127.0.0.1:8091/pamirs/base`，注意保证工程yml配置文件`pamirs.framework.gateway.show-doc: true`为开启状态。

:::info 注意：

pamirs/base是请求 base 模块下的接口，可以更换为业务模块返回业务模块的接口

:::

```graphql
query IntrospectionQuery {
  __schema {
    queryType { ...FullType }
    mutationType { ...FullType }
    subscriptionType { name }
    types {
      ...FullType
    }
    directives {
      name
      description
      locations
      args {
        ...InputValue
      }
    }
  }
}

fragment FullType on __Type {
  kind
  name
  description
  fields(includeDeprecated: true) {
    name
    description
    args {
      ...InputValue
    }
    type {
      ...TypeRef
    }
    isDeprecated
    deprecationReason
  }
  inputFields {
    ...InputValue
  }
  interfaces {
    ...TypeRef
  }
  enumValues(includeDeprecated: true) {
    name
    description
    isDeprecated
    deprecationReason
  }
  possibleTypes {
    ...TypeRef
  }
}

fragment InputValue on __InputValue {
  name
  description
  type { ...TypeRef }
  defaultValue
}

fragment TypeRef on __Type {
  kind
  name
  ofType {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
          }
        }
      }
    }
  }
}
```

你可以将这个查询放在 GraphiQL（开发工具）或者 Postman 等工具中，发送请求到 `/base`，这样可以获得完整的 schema。

    - **访问 GraphQL Endpoint**：在应用运行时，GraphQL API 通常暴露在 `/base` 路径下。你可以通过 `introspection` 查询导出完整的 GraphQL schema。

将请求的响应保存为JSON文件，在`config.yml`中配置。配置参考：[https://github.com/anvilco/spectaql/blob/main/config-example.yml](https://github.com/anvilco/spectaql/blob/main/config-example.yml)

```yaml
spectaql:
  # Optional path to the target build directory.
  # Set to null to not write the output to the filesystem, making it only available via the API (default: public)
  #
  # Default: public
  targetDir: /Users/mmy/Desktop
  themeDir: /Users/mmy/Desktop

introspection:
  # File containing a GraphQL Schema Definition written in SDL.
  # Can also pass an array of paths (or glob supported by @graphql-tools/load-files)
  # like so:
  # schemaFile:
  #   - path/to/schema/part1.gql
  #   - path/to/schema/part2.gql
#  schemaFile: /Users/mmy/Desktop/schema2.graphql

  # File containing Introspection Query response in JS module export, or JSON format
  introspectionFile: /Users/mmy/Documents/response2.json
#
  # URL of the GraphQL endpoint to hit if you want to generate the documentation based on live Introspection Query results
  # NOTE: If not using introspection.url OR servers[], you need to provide x-url below
#  url: 'http://127.0.0.1:8091/pamirs/graphql'

extensions:
  # Utilize the 'graphql-scalars' library when generating examples for scalars it supports that
  # do not have an example already set via some other method. Usually this is a good
  # thing to have on, but it is possible to turn it off.
  # Default: true
  graphqlScalarExamples: true

servers:
  - url: http://127.0.0.1:8091/pamirs/base
```

运行命令`npx spectaql config.yml`就可以得到一份html的API文档啦！

:::info 注意：
这行命令生成文档的执行时间和文件大小息息相关。平台接口执行时间大概1-2小时，只要没报错请耐心等待！

:::

## （二）利用 schema.json 文件解析生成文档。
若第一种方式执行未能成功，可采用下述方案：借助第一步通过 GQL 请求所生成的 JSON 文件，手动解析该 JSON 文件以生成文档。在此，为您提供一个运用 Java 代码解析 JSON 文件的示例，您可依据实际需求对生成格式进行自主修改。

---

示例代码：
[gql-schema-api](https://doc.oinone.top/wp-content/uploads/2024/09/gql-schema-api-1.zip)

> 规则说明：
>
> 1. **数据提取范围**：主要提取 “__schema” 下 “types” 中的内容。
> 2. **接口区域数据判定与提取**：当某类型的 “kind” 为 “OBJECT”，且其 “fields” 下的 “args” 存在值时，该部分数据属于接口区域数据。接口名称由 “name” 与 “fields” 中的 “name” 通过 “/” 连接构成。接口描述则截取 “fields” 中的 “description”。从 “args” 下 “type” 中，若 “kind” 为 “INPUT_OBJECT”，提取其 “name” 值作为请求参数名称；从 “fields” 的 “type” 中，若 “kind” 为 “OBJECT”，提取其 “name” 值作为返回参数名称。
> 3. **接口区域数据记录格式**：以表格形式展示接口地址、接口方式、请求参数名称以及返回参数名称。
> 4. **请求参数区域数据判定与提取**：当 “kind” 为 “INPUT_OBJECT” 时，此部分为请求参数区域。提取 “name” 值作为请求参数名称，针对 “inputFields”，以 “name” 作为字段名称，截取 “description” 作为显示名称。若 “inputFields” 的 “type” 下 “kind” 为 “SCALAR”，提取 “name” 作为字段类型。
> 5. **请求参数区域数据记录格式**：以表格形式展示请求参数名称，以及对应的（字段名，字段类型、显示名称、备注），其中备注为空。
> 6. **返回参数区域数据判定与提取**：当 “kind” 为 “OBJECT” 且 “fields” 下 “args” 无值时，此部分为返回参数区域。提取 “fields”，以 “name” 作为字段名称，截取 “description” 作为显示名称。若 “fields” 的 “type” 下 “kind” 为 “SCALAR”，提取 “name” 作为字段类型。
> 7. **返回参数区域数据记录格式**：以表格形式展示返回参数名称，以及对应的（字段名，字段类型、显示名称、备注），其中备注为空。
> 8. **接口名称排除项**：接口名称中不需要包含 “construct”、“queryByPk”、“queryListByEntity”、“queryOneByWrapper” 这些名称。
> 9. **整体处理流程**：对接口列表、请求参数数据区域以及返回参数数据区域分别进行上述处理。
> 10. **请求参数关联展示**：在处理后的接口列表中，依据请求参数名称，在请求参数数据区域查询对应的参数信息，并将（字段名，字段类型、显示名称、备注）以表格形式展示在对应接口信息之后。
> 11. **返回参数关联展示**：在处理后的接口列表中，依据返回参数名称，在返回参数数据区域查询对应的参数信息，并将（字段名，字段类型、显示名称、备注）以表格形式展示在对应接口信息下方的请求参数之后。
>

