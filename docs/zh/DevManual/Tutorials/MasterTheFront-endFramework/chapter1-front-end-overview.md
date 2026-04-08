---
title: 章节 1：前端框架概览（Front-End Overview）
index: true
category:
  - 研发手册
  - 教程
  - 精通前端框架
order: 1
prev:
  text: 精通前端框架（Master the Front-End framework）
  link: /zh/DevManual/Tutorials/MasterTheFront-endFramework/README.md
---
在 Oinone 中，我们将一个 Web 前端页面以及页面与页面直接的路由关系做了一定的抽象，而这些用来描述页面以及页面内容（字段、动作）的数据被称为“元数据”。了解元数据的获取及它们之间的关系是非常有必要的。

这一章节内容的概念和理论知识较多，希望读者可以耐心看完。

# 一、从“资源-国家分组”开始

在进行学习之前，我们需要切换至一个统一的页面，这样可以让我们更方便的描述一些内容。

从页面左上角的模块切换中选择“资源”，进入“资源”之后，在左侧菜单中选择“国家分组”，可以看到有如下所示页面，我们接下来所有的操作都在这一个页面完成。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-1/country.gif)

# 二、GraphQL协议

在 Oinone 中，所有的前后端交互都通过 GraphQL 这样的语法发起一个 HTTP 请求。这与我们在以往开发中接触到的 RESTful API 风格不太一样，下面我们将简单介绍一下 GraphQL 语法的基本知识。

:::warning 提示

官方文档：[GraphQL 学习](https://graphql.cn/learn)

更多关于 GraphQL 协议相关的内容请参考：[GraphQL Service](/zh/DevManual/Reference/Front-EndFramework/Services/graphQL-service.md)

:::

让我们打开浏览器的控制台（`F12`），切换到 `网络（Network）` 一栏，再将请求类型过滤切换至 `Fetch/XHR` ，我们可以看到一系列向后端发起的请求，这些请求包括了获取全局配置、顶部栏、当前视图编译、可切换应用等等。这些请求都是通过页面上一个一个的组件独立发起的，以此来获取一些必要的数据向用户呈现展示在页面上的内容。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-1/graphql.png)

当我们选择第一个名称为“base”的请求，这是一个用来获取全局配置的请求。接下来，我们以这个请求为例进行介绍。

## 请求

从浏览器的 `负载（Payload）` 可以看到这个请求的请求参数，它包括两个有效内容：

+ query：一个 `GraphQL` 语法的字符串
+ variables：为 `GraphQL` 语法提供的可变参数的值。

下面是“获取全局配置”请求中的 `query` 参数内容：

``` graphql
{
  appConfigQuery {
    queryListByWrapper(queryWrapper: {rsql: "1==1"}) {
      id
      browserTitle
      scope
      code
      app
      logo
      smallLogo
      partnerName
      officialWebsite
      slogan
      icpDesc
      appSideLogo
      favicon
      browserTitle
      loginPageLogo
      loginBackground
      loginLayoutType
      mode
      size
      sideBarTheme {
        mode
        theme
      }
      multiTabTheme {
        inline
        theme
      }
      extend
    }
  }
}
```

 `query` 参数是一个标准请求格式，它可以对后端任何一个可以被请求的函数的签名、入参、出参进行声明。让我们先对这样的数据结构有一个基本认识，再逐步深入。下面是 GraphQL 语法的标准格式：

``` graphql
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
+ arg1Name/arg1Value：用于指定函数入参，可以是多个，用 “，” 分隔。
+ responseParameters：响应参数定义，从当前模型开始以 “图” 的形式定义接口的响应格式。可以用换行符或 “，” 分隔。当字段是对象或数组时，使用 “{}” 继续向下定义关联模型的字段。如：`sideBarTheme` 字段是一个对象，里面有 `mode` 和 `theme` 这两个字段。

## 响应

从浏览器的 `预览（Preview）` 可以看到这个请求的响应结果。它实际上是一个用 JSON 格式表示的标准响应格式：

``` json
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

在 Oinone中，任何一个 GraphQL 请求都是以这样的格式返回到前端的。

**参数含义**

+ data：固定键
+ modelName：模型名称。同请求参数。
+ Query/Mutation：根据 GraphQL 请求类型使用不同的后缀。同请求参数。
+ functionName：函数名称。同请求参数。
+ errors：可能出现的错误信息
+ extensions：扩展信息

## 统一术语

为了在后面所有文章内容中对指定请求有更方便和准确的描述，我们需要对术语进行约定。

以 “获取全局配置” 接口为例，我们会用 “`appConfig#queryListByWrapper`接口” 这样的方式来定位一个接口的请求，这相比于中文而言，更加准确和直观。

让我们习惯一下这样的表示方法：（刚才我们看到的部分请求的简单介绍）

+ topBarUserBlock#construct：顶部栏-获取用户头像及动作
+ viewAction#load：加载页面元数据
+ model#loadModelField：根据模型编码获取模型字段元数据
+ module#load：根据模块编码获取
+ resourceCountryGroup#queryPage：通过分页查询国家分组

## 使用可视化工具发起请求

任何一个后端服务的请求都可以通过可视化工具发起请求，类似的工具有：

+ Insomnia：[点击下载](https://insomnia.rest/download)
+ Postman：[点击下载](https://www.postman.com/downloads)

你可以自由选择任何一个支持 GraphQL 协议的可视化工具来使用。

### 1、使用Insomnia发起请求

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-1/insomnia.png)

### 2、使用Postman发起请求

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-1/postman.png)

### 3、解决可视化请求工具的登录问题

在上面的当我们发起“获取全局配置”请求时，我们发现并没有任何用户登录的验证，这是因为这个接口在用户登录页仍然需要使用，因此并不验证用户是否登录。但对于其他接口并不都是这样的，你可以用浏览器中的其他请求来验证这一点。

那么，如何进行登录呢？其实很简单，我们将登录页面发起的登录请求在请求工具中发起即可，就像下面这样：

``` graphql
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

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-1/login.png)

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

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-1/batch.png)

:::warning 提示

批量请求是我们使用 `apollo-client` 工具包提供的自动批量能力，当我们在使用 `Promise` 异步时，在同一时钟周期内的相同模块的请求将被合并，自动组合为这样的批量请求。

更多关于 `HTTP请求` 的内容请参考：[HttpClient Service](/zh/DevManual/Reference/Front-EndFramework/Services/httpclient-service.md)

:::

# 三、浏览器URL

在 “资源-国家分组” 这个页面，让我们先来看这样一个URL：

``` json
http://127.0.0.1:8080/page;module=resource;viewType=TABLE;model=resource.ResourceCountryGroup;action=resource%23%E5%9B%BD%E5%AE%B6%E5%88%86%E7%BB%84;scene=resource%23%E5%9B%BD%E5%AE%B6%E5%88%86%E7%BB%84;target=OPEN_WINDOW;menu=%7B%22selectedKeys%22:%5B%22%E5%9B%BD%E5%AE%B6%E5%88%86%E7%BB%84%22%5D,%22openKeys%22:%5B%22%E5%9C%B0%E5%9D%80%E5%BA%93%22,%22%E5%9C%B0%E5%8C%BA%22%5D%7D
```

这个URL是经过 `encodeURIComponent` 方法转换为密文的结果，让我们打开浏览器的控制台（`F12`），切换到 `控制台（Console）` 一栏，使用 `decodeURIComponent` 方法把它转换为明文。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-1/url.png)

转换后的URL：

``` json
http://127.0.0.1:8080/page;module=resource;viewType=TABLE;model=resource.ResourceCountryGroup;action=resource#国家分组;scene=resource#国家分组;target=OPEN_WINDOW;menu={"selectedKeys":["国家分组"],"openKeys":["地址库","地区"]}
```

从转换后的URL我们可以得到以下信息：

+ module：模块名称
+ viewType：当前视图类型，表格视图为 `TABLE` 。
+ model：当前跳转动作的模型编码。
+ action：当前跳转动作的名称。
+ scene：同action，当前跳转动作的名称。
+ target：页面打开方式。
+ menu：菜单选中和展开节点数据，用于保留菜单状态。

:::warning 提示

这一部分内容需要结合第四节理论中关于 [跳转动作（ViewAction）](#viewaction) 的介绍对照学习，可以更好的理解这些参数的含义。

:::

# 四、页面渲染

以 “资源-国家分组” 为例，这个页面是怎么被加载并渲染出来的呢？一个页面渲染的标准流程如下图所示：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-1/mind.jpeg)

在之前的小节中，我们已经对 `浏览器URL` 进行了介绍，接下来我们看看 `viewAction#load` 请求获取的元数据结构：

``` json
{
    "data": {
        "viewActionQuery": {
            "load": {
                "id": "701175233800832367",
                "model": "resource.ResourceCountryGroup",
                "modelName": "resourceCountryGroup",
                "name": "resource#国家分组",
                "contextType": "CONTEXT_FREE",
                "viewType": "TABLE",
                "target": "ROUTER",
                "module": "resource",
                "moduleName": "resource",
                "resModel": "resource.ResourceCountryGroup",
                "resViewName": "国家分组table",
                "resView": {
                    "id": "701175268160570558",
                    "model": "resource.ResourceCountryGroup",
                    "name": "国家分组table",
                    "title": "国家分组",
                    "type": "TABLE",
                    "template": ""
                }
            }
        }
    },
    "errors": [],
    "extensions": {
        "success": true
    }
}
```

这不是一个完整的响应结果，我们对内容做了一些裁剪，其中 `resView.template` 中的内容单独用 `JSON` 格式展示在下面：

``` json
{
    "dslNodeType": "view",
    "type": "TABLE",
    "title": "国家分组",
    "model": "resource.ResourceCountryGroup",
    "name": "国家分组table",
    "modelName": "resourceCountryGroup",
    "modelType": "STORE",
    "moduleName": "resource",
    "ordering": "createDate DESC, id DESC",
    "pk": [
        "id"
    ],
    "uniques": [
        "code"
    ],
    "widgets": [
        {
            "dslNodeType": "template",
            "slot": "actions",
            "widgets": [
                {
                    "actionType": "VIEW",
                    "contextType": "CONTEXT_FREE",
                    "displayName": "创建",
                    "dslNodeType": "action",
                    "label": "创建",
                    "model": "resource.ResourceCountryGroup",
                    "name": "redirectCreatePage",
                    "resModel": "resource.ResourceCountryGroup",
                    "resModelName": "resourceCountryGroup",
                    "target": "ROUTER",
                    "viewType": "FORM"
                }
            ]
        },
        {
            "dslNodeType": "template",
            "slot": "searchFields",
            "widgets": [
                {
                    "data": "code",
                    "dslNodeType": "field",
                    "exactTtype": "STRING",
                    "index": false,
                    "invisible": "false",
                    "label": "编码",
                    "model": "resource.ResourceCountryGroup",
                    "multi": false,
                    "name": "code",
                    "required": "true",
                    "size": "128",
                    "store": true,
                    "ttype": "STRING",
                    "unique": true
                },
                {
                    "data": "name",
                    "dslNodeType": "field",
                    "exactTtype": "STRING",
                    "index": false,
                    "invisible": "false",
                    "label": "名称",
                    "model": "resource.ResourceCountryGroup",
                    "multi": false,
                    "name": "name",
                    "required": "true",
                    "size": "128",
                    "store": true,
                    "ttype": "STRING",
                    "unique": false
                }
            ]
        },
        {
            "dslNodeType": "template",
            "slot": "fields",
            "widgets": [
                {
                    "data": "id",
                    "dslNodeType": "field",
                    "exactTtype": "INTEGER",
                    "index": false,
                    "invisible": "true",
                    "label": "ID",
                    "max": "Infinity",
                    "min": "-Infinity",
                    "model": "resource.ResourceCountryGroup",
                    "multi": false,
                    "name": "id",
                    "required": "false",
                    "size": "20",
                    "store": true,
                    "ttype": "INTEGER",
                    "unique": false
                },
                {
                    "data": "code",
                    "dslNodeType": "field",
                    "exactTtype": "STRING",
                    "index": false,
                    "invisible": "false",
                    "label": "编码",
                    "model": "resource.ResourceCountryGroup",
                    "multi": false,
                    "name": "code",
                    "required": "true",
                    "size": "128",
                    "store": true,
                    "ttype": "STRING",
                    "unique": true
                },
                {
                    "data": "name",
                    "dslNodeType": "field",
                    "exactTtype": "STRING",
                    "index": false,
                    "invisible": "false",
                    "label": "名称",
                    "model": "resource.ResourceCountryGroup",
                    "multi": false,
                    "name": "name",
                    "required": "true",
                    "size": "128",
                    "store": true,
                    "ttype": "STRING",
                    "unique": false
                }
            ]
        },
        {
            "dslNodeType": "template",
            "slot": "rowActions",
            "widgets": [
                {
                    "actionType": "VIEW",
                    "contextType": "SINGLE",
                    "displayName": "详情",
                    "dslNodeType": "action",
                    "label": "详情",
                    "model": "resource.ResourceCountryGroup",
                    "name": "redirectDetailPage",
                    "resModel": "resource.ResourceCountryGroup",
                    "resModelName": "resourceCountryGroup",
                    "target": "ROUTER",
                    "viewType": "DETAIL"
                },
                {
                    "actionType": "VIEW",
                    "contextType": "SINGLE",
                    "displayName": "编辑",
                    "dslNodeType": "action",
                    "label": "编辑",
                    "model": "resource.ResourceCountryGroup",
                    "name": "redirectUpdatePage",
                    "resModel": "resource.ResourceCountryGroup",
                    "resModelName": "resourceCountryGroup",
                    "target": "ROUTER",
                    "viewType": "FORM"
                }
            ]
        }
    ]
}
```

`resView.template`中所展示的内容，实际是通过 DSL 转换编译得到的结果，这一段过程较为复杂，我们只需要知道，是通过一种规则将 `XML` 转换为 `JSON` 即可：

让我们对照着上面提供的 `DSL` 来看，一个类似的数据结构如下所示：

``` json
{
    "dslNodeType": "VIEW",
    "type": "TABLE",
    ...,
    "widgets": [
        {
            "dslNodeType": "TEMPLATE",
            "slot": "searchFields",
            "widgets": [
                ...
            ]
        },
        {
            "dslNodeType": "TEMPLATE",
            "slot": "fields",
            "widgets": [
                ...
            ]
        },
        {
            "dslNodeType": "TEMPLATE",
            "slot": "actions",
            "widgets": [
                ...
            ]
        }
    ]
}
```

一个简单的规则可以这样描述：

+ `XML`标签转换为`dslNodeType`属性，`XML子标签`转换为`widgets`属性，其他属性保持不变。
+ 在 `view` 标签上补充了当前模型的元数据。如上所示，`模型`会补充模型名称、模型类型、模块名称、排序规则、主键pk，唯一键uniques等元数据属性。
+ 在`field`标签上补充了字段的元数据。如上所示，我们仅定义了字段的`data` 属性，但返回的 `JSON` 中包含`字段`的全部元数据。`字段`会补充字段类型、显示名称、是否存储等元数据属性。
+ 在 `action` 标签上补充了动作的元数据。如上所示，我们仅定义了动作的 `name` 属性，但返回的 `JSON` 中包含`动作`的全部元数据。`动作`会补充动作类型、显示名称等元数据属性。

:::warning 提示

更多关于页面渲染的内容请参考：[DSL](/zh/DevManual/Reference/Front-EndFramework/Widget/DSL.md)

:::

# 五、理论：元数据概览

在 Oinone 平台中包含了许多元数据，以这些元数据为基础，可以完整的描述了一个 `应用（Application）` 在存储结构、页面展示以及用户交互的全部内容。

让我们先来看这样一个“元数据家族图谱”：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-1/mind2.jpeg)

下面，我们将对这些元数据内容一一进行解释和说明。

:::warning 提示

对于 Oinone 的新手来说，我们建议不需要过多的了解元数据的详细内容，只需要根据这篇文章内容对元数据的整体概念有初步认识即可。

更多关于元数据的内容可参考：[Metadata Service](/zh/DevManual/Reference/Front-EndFramework/Services/metadata-service.md)

:::

## （一）模块与应用

模块（`Module`）是按业务领域划分和管理的最小单元，是一组功能、界面的集合。

当模块上的属性 `application` 为 `true` 时，将模块标记为应用。简而言之，所有页面上可视的称为应用，在背后提供功能和服务的称为模块。

关于模块，由几个重要属性是必须理解和记忆的：

+ 模块编码（module）：后端所有使用到模块的地方都是模块编码。
+ 模块名称（name）：前端所有使用到模块的地方都是模块名称。

在页面左上角的模块切换中，展示的所有内容就是应用。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-1/application.png)

## （二）数据字典

数据字典（DataDictionary）就是代码中的枚举类型，在元数据中被称为数据字典。它用来列举出一个有穷序列集的所有成员。

## （三）模型

模型是 Oinone 中的最重要的元数据，Oinone 中的字段、函数、动作、视图都是围绕着模型定义的。

关于模型，有几个重要属性是必须理解和记忆的：

+ 模型编码（model）：模型的唯一标识
+ 模型名称（name）：一般通过模型编码生成，后端可自定义。
+ 主键（pks）：模型数据的主键，具备唯一性，大多数情况下为 `id`。（同数据库主键概念）

### 1、字段

字段是模型用来描述数据结构的基本元素。

关于字段，有几个重要属性是必须理解和记忆的：

+ 模型编码（model）：字段所属模型编码。
+ 字段名称（data）：字段在模型中的唯一标识。与模型编码联合唯一。
+ 字段业务类型（ttype）：用于定义数据结构的类型。当字段业务类型为 `String` 时，在 TypeScript 中对应的类型声明可能为 `string | null | undefined` 。
+ 是否多值（multi）：结合字段业务类型，确定类型声明是否为数组。当字段业务类型为 `String` 且 `multi` 为 `true` 时，在 TypeScript 对应的类型声明为 `string[] | null | undefined`。

:::warning 提示

更多关于字段的内容请参考：[Field](/zh/DevManual/Reference/Front-EndFramework/Widget/Field/README.md)

:::

### 2、函数

函数是 Oinone 提供的 FAAS （Function as a service）功能。对于前端而言，我们只需要关心一点，凡是开放级别（openLevel）包含 API 的函数都可以被前端调用。至于函数的其他概念，就交给后端学习吧。

关于函数，有几个重要属性是必须理解和记忆的：

+ 命名空间（namespace）：模型函数通常为模型编码，其他函数以后端定义为准。
+ 函数编码（fun）：同方法名称，与命名空间联合唯一。后端可自定义。
+ 函数名称（name）：同方法名称，后端可自定义。

让我们通过 `TypeScript` 语法来简单认识一下函数：

``` typescript
countByWrapper(queryWrapper: { rsql: string }): Promise<number>
```

形如 `countByWrapper` 函数这样，有方法名称、入参、出参，这和后端定义的出入参类型几乎完全一样。

:::warning 提示

更多关于自定义请求的内容请参考：[Customize GraphQL Request](/zh/DevManual/OperationGuide/customize-graphQL-request.md)

:::

### 3、动作

动作是可以被渲染在页面中供用户点击的按钮。在 Oinone 中，将所有用户可能的操作分为了四类：

+ 跳转动作（ViewAction）：点击后将在应用内进行页面跳转。
+ 链接跳转（UrlAction）：点击后将跳转到指定的URL，相当于 `window.open` 。
+ 提交动作（ServerAction）：向后端发起请求，拿到返回结果后进行处理。
+ 客户端动作（ClientAction）：仅用于前端交互。理论来说，它可以做任何事情。

任何一类动作，都有这样几个重要属性是必须理解和记忆的：

+ 模型编码（model）：模型编码。
+ 动作名称（name）：动作在模型中的唯一标识。与模型编码联合唯一。
+ 动作类型（actionType）：有跳转动作（VIEW）、链接动作（URL）、提交动作（SERVER）、客户端动作（CLIENT）这四类。
+ 上下文类型（contextType）：动作对于数据的处理方式。有处理单条数据、处理多条数据、处理单条或多条数据、不进行数据处理这四类。

下面介绍的每个具体类型的动作都 `继承` 动作基类，它们都具备这些属性。

:::warning 提示

值得一提的是，服务调用（ServerAction）的背后实际上也是函数，这一函数的类型通常为 Mutation。

:::

:::warning 提示

更多关于动作的内容可参考：[Action](/zh/DevManual/Reference/Front-EndFramework/Widget/action.md)

:::

### 4、跳转动作（ViewAction）{#viewaction}

跳转动作（ViewAction）作为前端最重要的元数据之一，它包含了一个页面的所有内容，以及页面与页面之间的关系。

关于跳转动作，有几个重要属性是必须理解和记忆的：

+ 模型编码（model）：所在视图对应的模型编码。
+ 动作名称（name）：动作在模型中的唯一标识。与模型编码联合唯一。
+ 视图类型（viewType）：目标视图类型。
+ 目标模型编码（resModel）：当前视图的模型编码。
+ 目标视图名称（resViewName）：当前视图名称。
+ 打开方式（target）：由一个页面跳转到另一个页面的方式。有当前窗口打开、新窗口打开、弹窗打开、抽屉打开这四类。

以 “资源-国家分组” 表格为例，表格上方有一个 “创建” 动作，这个 “创建” 动作对应的元数据为：（为了便于理解，我们仅展示了上面介绍的内容）

``` json
{
    "actionType": "VIEW",
    "model": "resource.ResourceCountryGroup",
    "name": "redirectCreatePage",
    "viewType": "FORM",
    "resModel": "resource.ResourceCountryGroup",
    "target": "ROUTER",
    "contextType": "CONTEXT_FREE"
}
```

由这个动作的元数据信息可以看出，这是一个名称为 `redirectCreatePage` 的跳转动作（`actionType： VIEW`），它可以出现在模型编码为 `resource.ResourceCountryGroup` 的任何视图中。点击后，以不携带任何上下文参数的方式，通过 `当前窗口打开` 新页面，目标视图的模型为 `resource.ResourceCountryGroup` ，目标视图的类型为 `表单（FORM）`。

:::warning 提示

这里我们并没有获取到 `resViewName` 这个字段的值，因为我们在表格页面只要能看到这个按钮并且可以完成点击行为就可以了，`resViewName` 是进入到下一个页面需要关心的值。

在后面的小节中，我们会根据页面渲染介绍元数据的查看方式和数据结构，到时候你就能知道这个动作元数据的来源。

:::

当我们点击这个动作后，让我们来看看 `浏览器URL` 的变化。

点击前：（同第三节浏览器URL `decodeURIComponent` 后的结果）

``` json
http://127.0.0.1:8080/page;module=resource;viewType=TABLE;model=resource.ResourceCountryGroup;action=resource#国家分组;scene=resource#国家分组;target=OPEN_WINDOW;menu={"selectedKeys":["国家分组"],"openKeys":["地址库","地区"]}
```

点击后：

``` json
http://127.0.0.1:8080/page;module=resource;viewType=FORM;model=resource.ResourceCountryGroup;action=redirectCreatePage;scene=redirectCreatePage;target=ROUTER;menu={"selectedKeys":["国家分组"],"openKeys":["地址库","地区"]};path=/resource/国家分组/ACTION#resource.ResourceCountryGroup#redirectCreatePage
```

观察点击前后的URL，我们可以发现，当前页面从 `表格（TABLE）` 切换成了 `表单（FORM）` ，加载的动作从 `resource#国家分组` 切换成了 `redirectCreatePage` 。其他参数也相应发生了应有的变化。

:::warning 提示

`path` 参数暂时不涉及，它是权限相关的参数，更多关于权限的内容可参考：[Security in Oinone](/zh/DevManual/Reference/Back-EndFramework/security-in-oinone.md)

:::

## （四）视图

在 Oinone 中，任何一个页面都是通过视图进行渲染的。跳转动作定义的 `母版（Mask）` 、视图定义的 `布局（Layout）`和 `DSL` ，这三者叠加后，最终形成一个完整页面。

不论是 `母版` 、 `布局` 还是 `DSL` ，我们统一使用 XML 语法进行定义，相比于 `JSON` 或其他语言，`XML` 可以更好的提供 `结构化` 表述。

我们在渲染的时候，先通过 `母版（Mask）` 将整个页面的框架渲染出来，再将 `布局（Layout）` 与 `DSL` 通过 `插槽（Slot）` 进行合并，将其渲染在 `主内容分发区（main-view）` 的区域内，最终展示出一个完整的页面。

下面我们分别介绍 `母版（Mask）`、 `布局（Layout）` 和 `DSL` 的相关内容。

### 1、母版（Mask）

在 Oinone 客户端中的大多数界面都使用一种常见的布局：顶部是一个带有一些功能的控制组件，紧接着的下方区域分成了两部分，左侧是一个可以切换页面的菜单，右侧是一个主要内容区域。

就像下面这样：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-1/mask.png)

它是通过一个这样的默认母版进行渲染的：

``` xml
<mask>
    <multi-tabs />
    <header>
        <widget widget="app-switcher" />
        <block>
            <widget widget="notification" />
            <widget widget="divider" />
            <widget widget="language" />
            <widget widget="divider" />
            <widget widget="user" />
        </block>
    </header>
    <container>
        <sidebar>
            <widget widget="nav-menu" height="100%" />
        </sidebar>
        <content>
            <breadcrumb />
            <block width="100%">
                <widget width="100%" widget="main-view" />
            </block>
        </content>
    </container>
</mask>
```

在这个模板中，它包含的元素有：

+ mask：母版根标签，固定标签。
+ multi-tabs：多选项卡。
+ header：顶部栏。
+ container：容器。
+ sldebar：侧边栏。
  - nav-menu：导航菜单。
+ content：主内容。
  - breadcrumb：面包屑。
  - block：一个类似于 div 块的组件。
  - main-view：主视图；用于渲染布局和DSL等相关内容。

:::warning 提示

更多关于母版（Mask）的内容请参考：[Mask](/zh/DevManual/Reference/Front-EndFramework/Widget/mask.md)

:::

### 2、布局（Layout）

布局是根据不同的视图类型和展示位置使用不同的默认布局的，以 “资源-国家分组” 为例，它是一个表格视图，里面仅有三个组件，搜索、动作栏和表格。

布局仅仅是通过对组件进行排列，从而达到适用于多个模型的目的。不同模型具备不同的字段、动作，都可以通过插槽进行插入。

就像下面这样：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-1/layout.png)

它是通过一个这样的默认布局进行渲染的：

``` xml
<view type="TABLE">
    <pack widget="group">
        <view type="SEARCH">
            <element widget="search" slot="search" slotSupport="field">
                <xslot name="searchFields" slotSupport="field" />
            </element>
        </view>
    </pack>
    <pack widget="group" slot="tableGroup">
        <element widget="actionBar" slot="actionBar" slotSupport="action">
            <xslot name="actions" slotSupport="action" />
        </element>
        <element widget="table" slot="table" slotSupport="field">
            <element widget="expandColumn" slot="expandRow" />
            <xslot name="fields" slotSupport="field" />
            <element widget="rowActions" slot="rowActions" slotSupport="action" />
        </element>
    </pack>
</view>
```

在这个模板中，它包含的元素有：

+ view：布局根标签，固定标签。
+ pack：容器类型相关组件。
+ element：元素组件，搜索组件、动作栏、表格组件都是元素组件，它们都是为视图提供了具体功能的核心组件。
+ slot 和 xslot：DSL插槽，在 DSL 中定义的模板片段将被插入到名称相同的插槽中。这和 `Vue` 提供的插槽 `slot` 标签功能类似。

:::warning 提示

更多关于布局（Layout）的内容请参考：[Layout](/zh/DevManual/Reference/Front-EndFramework/Widget/layout.md)

更多关于元素组件的内容请参考：[Element](/zh/DevManual/Reference/Front-EndFramework/Widget/element.md)

:::

### 3、DSL

在上面我们看到的 布局（Layout） 中，我们预留了一些 插槽（Slot） ，接下来，我们需要根据当前视图对应的模型，将元数据的相关内容填充进去。

我们可以这样定义一个 DSL：

``` xml
<view type="TABLE" model="resource.ResourceCountryGroup" title="国家分组" name="国家分组table">
    <template slot="actions">
        <action name="redirectCreatePage" label="创建" />
        <action name="delete" label="删除" />
    </template>
    <template slot="searchFields">
        <field data="code" />
        <field data="name" />
    </template>
    <template slot="fields">
        <field data="id" invisible="true" />
        <field data="code" />
        <field data="name" />
        <field data="countryList" />
    </template>
    <template slot="rowActions">
        <action name="redirectDetailPage" label="详情" />
        <action name="redirectUpdatePage" label="编辑" />
    </template>
</view>
```

在这个模板中，它包含的元素有：

+ view：DSL根标签，固定标签。
+ template：向DSL插槽中插入的一个模板片段。这和 `Vue` 提供的插槽 `template` 标签功能类似。
+ field：字段元数据标签。
+ action：动作元数据标签。

:::warning 提示

更多 DSL 的内容请参考：[DSL](/zh/DevManual/Reference/Front-EndFramework/Widget/DSL.md)

:::

### 4、视图类型（ViewType）

视图类型是视图的重要属性，它用来决定数据结构、数据处理、渲染方式以及最终表现形式。页面间的流转本质上就是视图类型的切换。

以 “资源-国家分组” 为例，每个跳转动作将各种视图类型进行连接，以此来实现围绕模型的数据维护功能。页面流转的标准流程如下图所示：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-1/mind3.jpeg)

上面展示了表格、表单、详情视图的标准 “增删改查” 流程。即：通过 “菜单” 进入 `表格视图（TABLE）` ；在 `表格视图（TABLE）` 中包含 “创建” 、 “编辑” 以及 “详情” 这三个动作；通过 “创建” 和 “编辑” 跳转至同一个 `表单视图（FORM）` ；通过 “详情” 跳转至 `详情视图（DETAIL）`。

### 5、数据结构

在 Oinone 中，不同的视图类型处理了不同的数据结构。Widget 框架对数据结构主要分为 `列表（List）` 和 `对象（Object）` 两大类。

下面根据数据结构和视图类型进行了列举：
<table>
	<tr>
	    <th>数据结构</th>
      <th>视图类型</th>
      <th>基类</th>
	</tr >
	<tr >
	    <td rowspan="2">列表（List）</td>
      <td>表格（TABLE）</td>
	    <td rowspan="2">BaseElementListViewWidget</td>

  </tr>
  <tr >
      <td>画廊（GALLERY）</td>

  </tr>
  <tr >
	    <td rowspan="2">对象（Object）</td>
      <td>表单（FORM）</td>
	    <td rowspan="2">BaseElementObjectViewWidget</td>

  </tr>
  <tr >
      <td>详情（DETAIL）</td>

  </tr>
</table>


+ 对于 `列表（List）` 数据结构，在 `BaseElementListViewWidget` 基类中对 `查询`、`分页`、`排序`、`提交` 等通用行为进行了定义。
+ 对于 `对象（Object）` 数据结构，在 `BaseElementObjectViewWidget` 基类中对 `查询`、`验证`、`提交` 等通用行为进行了定义。

### 6、数据交互

那么，它们之间的数据是如何通信和交互呢？让我们看下一个数据交互的标准流程：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-1/mind4.jpeg)

1. 进入表格视图后，通过 `queryPage` 加载数据，并更新表格视图。
2. 点击创建按钮，动作的数据控制类型是 `不进行数据处理` ，因此不会携带任何数据到表单视图。表单视图在没有传入 `主键` 的情况下，通过 `construct` 加载数据，并更新表单视图。
3. 点击删除按钮，动作的数据控制类型是 `处理单条或多条数据` ，因此向后端提交时将表格选中数据行进行提交。
4. 点击编辑按钮，动作的数据控制类型是 `处理单条数据` ，因此携带 `当前行数据` 的 `主键` 到表单视图。表单视图发现传入 `主键` ，通过 `queryOne` 加载数据，并更新表单视图。
5. 点击详情按钮，动作的数据控制类型是 `处理单条数据` ，因此携带 `当前行数据` 的 `主键` 到详情视图。详情视图和表单视图处理数据的方式一致，将通过 `queryOne` 加载数据，并更新详情视图。

# 六、结束语

到这里为止，我们几乎已经简单介绍了在后面的章节中所有可能用到的关键信息和涉及到的元数据内容。对于 Oinone 元数据、渲染和交互的理解不是一蹴而就的，这是一个伴随着未来使用 Oinone 过程中不断完善的长久过程。

学习 Oinone 的过程是一个有趣的过程，它里面包含了很多设计理念和设计哲学。希望这一篇内容可以为你在学习 Oinone 的过程中打下一个夯实的基础。

让我们继续接下来的学习吧～







