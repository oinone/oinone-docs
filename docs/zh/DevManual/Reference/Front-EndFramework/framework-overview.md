---
title: 框架概览（Framework Overview）
index: true
category:
  - 研发手册
  - Reference
  - 前端API
order: 1
prev:
  text: 通用工具 API（Tools API）
  link: /zh/DevManual/Reference/Back-EndFramework/AdvanceAPI/tools-API.md
---
Oinone Kunlun 框架是针对 Oinone Pamirs 提供的一组功能，用于帮助构建在浏览器中运行的 Oinone 应用程序。同时，Oinone Kunlun 框架是一个单页应用程序，并基于 Vue 框架提供了一组功能，通常称为 Web 客户端（可通过 URL/web 访问）。

从高层次来看，Web 客户端是一个单页应用程序：用户执行操作时，它无需每次都从服务器请求完整页面，而是仅请求所需内容，然后相应地替换 / 更新当前屏幕。此外，它还管理 URL 以保持其与当前状态同步。

Oinone Kunlun 框架（全部或部分功能）也可以用于其他场景，本文主要聚焦于 Web 客户端。

# 一、技术栈说明

Oinone Kunlun 框架是基于 `Vue` 框架实现的，其底层 `Oio` 组件库是基于 `Ant Design Vue` 组件库和 `Element Plus` 组件库实现的。

# 二、代码结构

与常见的 `Vue` 框架结构相同，在 `src` 目录中包含所有的 `TypeScript` （以及 `CSS` 和 `Vue` 组件） 代码库。以下是 Oinone 建议使用的子文件夹列表：

+ mask：存放母版定义和注册相关代码
+ layout：存放布局定义和注册相关代码
+ types：存放所有可能的公共类型定义代码
+ field：存放所有字段组件
+ action：存放所有动作组件
+ view：存放所有视图组件
+ service：存放所有请求后端服务代码（部分框架建议在 api 目录）
+ theme：存放所有主题相关代码

对于 `field` 子文件夹，Oinone 建议根据 `视图类型` 对字段组件进行分类存放，可能使用的子文件夹列表为：

+ field/table：存放表格（TABLE）字段组件
+ field/form：存放表单（FORM）字段组件
+ field/detail：存放详情（DETAIL）字段组件
+ field/gallery：存放画廊（GALLERY）字段组件

对于 field/table 子文件夹，Oinone 建议根据 字段业务类型 对字段组件进行分类存放，可能使用的子文件夹列表为：

+ field/table/string：存放表格文本类型（String）字段组件
+ field/table/integer：存放表格整数类型（Integer）字段组件

一个可能的完整目录结构为：

``` plain
src
├─ mask
├─ layout
├─ field
│  ├─ table
│  │  ├─ integer
│  │  ├─ float
│  │  ├─ boolean
│  │  ├─ enum
│  │  ├─ string
│  │  ├─ text
│  │  ├─ html
│  │  ├─ datetime
│  │  ├─ date
│  │  ├─ time
│  │  ├─ year
│  │  ├─ money
│  │  ├─ map
│  │  ├─ m2o
│  │  ├─ o2m
│  │  └─ m2m
│  ├─ form
│  ├─ detail
│  └─ gallery
├─ action
├─ view
├─ types
├─ service
└─ theme
```

:::warning 提示

对于代码结构的划分，我们应当根据业务实际情况有选择的使用适合业务工程的代码结构，不应执迷于一种单一的代码结构。上述代码结构仅仅是 Oinone 基于组件标准化这一场景给出的其中一种代码结构，这几乎适用于任何首次接触和使用 Oinone 的初学者，也是最贴近 Oinone 元数据分类的一种代码结构。

更多关于研发范式的内容请参考：[Widget 组件设计范式](/zh/DevManual/R&DParadigm/R&D-paradigm-widget-design.md)

:::

# 二、Web 客户端架构

如上所述，Web 客户端是一个基于 Widget 框架实现的应用程序。以下是其默认母版的简化版本：

``` xml
<mask>
    <header />
    <container>
        <nav-menu />
        <main-view />
    </container>
</mask>
```

可以看到，它本质上是通过顶部栏（header）、导航菜单（nav-menu）以及主内容分发区（main-view）组成。

# 三、Environment

作为一个 Web 客户端，Oinone Kunlun 不仅使用 `dotenv-webpack` 作为 `构建时` 的静态环境变量，还提供了 `RuntimeConfig` 作为 `运行时` 的动态环境变量。

:::warning 提示

更多关于环境配置的内容请参考：[Environment](/zh/DevManual/Reference/Front-EndFramework/environment.md)

:::

# 四、Context

在 Oinone Kunlun 中，“上下文”（context）是一个重要概念：它为组件提供了渲染、配置、以及元数据等信息，以便系统的任何组件都能对于这些信息做出适当的行为。从某种意义上说，它就像一个传播到各处的信息包。这在某些场景中非常有用。例如让输入框可以在表单和详情中表现的有所区别，或在组件中激活 / 禁用某些功能。

在任何组件中，你都可以通过这样的代码来使用这两类上下文对象：

``` typescript
protected doSomething() {
  const { metadataRuntimeContext, rootRuntimeContext } = this;
  // do something.
}
```

:::danger 警告

在任何时候，你都不应该尝试修改元数据相关属性，它需要在任何组件中保持稳定的获取。

:::

:::warning 提示

更多关于上下文的内容请参考：[Context](/zh/DevManual/Reference/Front-EndFramework/context.md)

:::

# 五、组成部分（Building Blocks）

Web 客户端的构建通常是通过几种抽象类型构建的：Router、Render、Service、Widget、Component。

:::info 注意

在 Oinone Kunlun 中，Widget 特指通过 TypeScript Class 定义并继承 VueWidget 的组件，也可以简称为 TS 组件；Component 特指通过 Vue 框架定义的 Vue 组件。（若 Oinone Kunlun 提供了基于 React 框架的实现，则 Component 特指通过 React 框架定义的 React 组件）

:::

## （一）Router

在单页应用程序中，路由系统本质上是通过修改浏览器URL来触发一组行为。在 Oinone Kunlun 中，路由系统是实现页面更新的核心功能，它是基于 `rxjs` 实现的。在任何一个组件中，你都可以通过 `useRouter` 和 `useMatched` 使用路由系统的所有功能。

获取浏览器变量：

``` typescript
useMatched().matched.segmentParams
```

获取路由实例及页面参数变更：

``` typescript
protected $router!: Router;

protected doSomething() {
  this.$router.push({
    segments: [
      {
        path: 'page',
        parameters: {
          ...
        }
      }
    ]
  });
}

protected beforeMount() {
  this.$router = useRouter().router;
}
```

路由变更订阅：

``` typescript
protected watchRouter() {
  useMatched()
    .getMatched$()
    .subscribe((matched: Matched) => {
      // do something.
    });
}

protected beforeMount() {
  this.watchRouter();
}
```

:::warning 提示

更多关于路由的内容请参考：[Router Service](/zh/DevManual/Reference/Front-EndFramework/Services/router-service.md)

:::

## （二）Render

在 Oinone Kunlun 中提供了一种基于 JSON 数据结构的渲染功能，它能处理类似于这样的数据结构：

``` json
{
    "dslNodeType": "",
    ...,
    "widgets": [
        {
            "dslNodeType": "",
            "widgets": [
                ...
            ]
        },
        ...
    ]
}
```

在这样的数据结构下，通过 Vue 框架将每个节点转换为 VNode 进行处理和渲染。

:::warning 提示

更多关于渲染的内容请参考：[View](/zh/DevManual/Reference/Front-EndFramework/Widget/View/README.md)

:::

## （三）Service

在 Oinone Kunlun 中使用 `GraphQL` 协议完成 `前后端交互` 。`HttpClient` 是基于 `apollo-client` 实现的。在任何地方，你都可以通过 `HttpClient` 向后端发起请求。例如：

``` typescript
export class ResourceCountryGroupService {
  public static async queryListByWrapper(): Promise<ResourceCountryGroup[]> {
    const gql = `{
  resourceCountryGroupQuery {
    queryListByWrapper(queryWrapper: {rsql: "1==1"}) {
      id
      code
      name
    }
  }
}`;
    const res = await http.query<ResourceCountryGroup[]>(MODULE_NAME, gql);
    return res.data['resourceCountryGroupQuery']['queryListByWrapper'];
  }
}
```

:::warning 提示

更多关于 HTTP请求 的内容请参考：[HttpClient Service](/zh/DevManual/Reference/Front-EndFramework/Services/httpclient-service.md)

:::

## （四）Widget

在 Oinone Kunlun 中，`Widget` 框架是其运行的核心模块，凡是在页面上可以看到的组件都是通过 `Widget` 框架定义并渲染在页面中的。

`Widget` 组件的注册和查找是使用 `SPI` 框架完成的。`SPI` 框架本质上是通过预先定义好的维度存储一个多叉树，在查找时，通过带权重的最长路径匹配算法进行搜索。

每一类组件都有其抽象维度，这些维度无一例外都是用于描述组件的使用位置。一般而言，位置描述得越 “精确” ，在相应位置进行渲染时，该组件所具备的优先级也就越高。在完全相同的位置描述的情况下，后注册的组件会覆盖先注册的组件。

在 Widget 框架中，不同的 `dslNodeType` 会使用不同的 `SPI.Token` 进行注册和使用：

| **dslNodeType** | **SPI.Token**     | **相关内容文档**                                             |
| --------------- | ----------------- | ------------------------------------------------------------ |
| view            | BaseView          | [View](/zh/DevManual/Reference/Front-EndFramework/Widget/View/README.md) |
| element         | BaseElementWidget | [Element](/zh/DevManual/Reference/Front-EndFramework/Widget/element.md) |
| pack            | BasePackWidget    | [Pack](/zh/DevManual/Reference/Front-EndFramework/Widget/pack.md) |
| action          | BaseActionWidget  | [Action](/zh/DevManual/Reference/Front-EndFramework/Widget/action.md) |
| field           | BaseFieldWidget   | [Field](/zh/DevManual/Reference/Front-EndFramework/Widget/Field/README.md) |


## （五）Component

在 Oinone Kunlun 中，Widget 框架提供了组件的注册和查找功能，但具体的页面渲染是通过 Component 完成的。Oinone Kunlun 基于 Vue 框架 实现了一组与 Widget 框架对应的组件。除此之外，Component 还提供了一组 `Oio` 组件库，用于提供标准组件。标准组件对 `标准API` 和 `主题` 相关内容进行了处理。

在使用 Oinone 过程中，你可以直接使用 `Oio` 组件进行二次开发，并且不需要关心样式、主题等问题。例如输入框可以使用 `oio-input` ：

``` vue
<oio-input v-model:value="value" />
```

:::warning 提示

更多关于 Oio 组件 的内容请参考：[Vue UI Antd](/zh/DevManual/Reference/Front-EndFramework/OioComponents/vue-UI-antd.html)

:::

# 六、Expression

在 Oinone Kunlun 中内置了一个小型的表达式解释器，其作用是计算小型表达式（单行表达式）。这一点至关重要，因为大多数 DSL 配置都支持了使用表达式进行属性的计算。

例如：

``` xml
<field data="phoneCode" label="国家码" />
<field data="phoneNumber" label="手机号" />
<field data="phone" compute="activeRecord.phoneCode + ' ' + activeRecord.phoneNumber" />
```

:::warning 提示

几乎所有表达式中都包含了 `activeRecord` 、`rootRecord`、`openerRecord` 这些上下文变量，但它们在不同的组件和视图中表示的含义有所不同。不仅如此，你还可以在表达式中使用一些 Oinone 内置函数进行高级计算，甚至还可以自定义一些函数用在表达式中。

更多表达式的内容请参考：[Expression Service](/zh/DevManual/Reference/Front-EndFramework/Services/expression-service.md)

更多内置函数的内容请参考：[Function API - 内置函数](/zh/DevManual/Reference/Back-EndFramework/functions-API.md#12385d7c)

:::

# 七、域（Domains）

从广义上讲，Oinone Kunlun 中的域（domains）表示符合某些指定条件的记录集合。

RSQL Expression 是用于域（domains）的语法，它是一种类似于 SQL 条件的表达式语法。在不同的字段业务类型中可使用的操作符是不同的，这是根据数据的存储结构决定的。

在 Oinone Kunlun 中，我们将域（domains）分为可视域（domain）和不可视域（filter），在实践过程中，这样的划分将更好的帮助我们更好的向用户展示有效记录集合。

例如在一个 `多对一（M2O）` 的 `下拉框（Select）` 组件中，我们可以这样使用 `domain` 向用户展示 `激活态` 的记录集合供用户选择：

``` xml
<field data="relationOne" widget="Select" domain="state == ACTIVED" />
```





