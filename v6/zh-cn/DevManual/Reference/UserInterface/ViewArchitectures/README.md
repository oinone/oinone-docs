---
title: 视图架构（View architectures）
index: true
category:
  - 研发手册
  - Reference
  - User interface
  - View architectures
dir:
  link: true
  order: 2
prev:
  text: Translate Service
  link: /v6/zh-cn/DevManual/Reference/Front-EndFramework/Services/translate-service.md
next:
  text: 表格（Table）
  link: /v6/zh-cn/DevManual/Reference/UserInterface/ViewArchitectures/table.md
---
在 Oinone 中，不论是`母版（Mask）`、`布局（Layout）`还是 `视图（DSL）` ，在后端统一使用 `XML` 格式进行定义和存储，在经过后端请求编译之后，前端将获得 `JSON` 格式的模板数据，并将其在 `Web 客户端`上进行渲染。

本章内容将完整的介绍 Oinone 视图的架构设计、运行逻辑以及使用方法。

:::warning 提示

在学习本章节之前，你需要对 Oinone 元数据以及视图的基础知识有一定的了解。请参考：

+ [前端框架概览 - 元数据概览](/zh-cn/DevManual/Tutorials/MasterTheFront-endFramework/chapter1-front-end-overview.md#五、理论-元数据概览)
+ [XML 百度百科](https://baike.baidu.com/item/%E5%8F%AF%E6%89%A9%E5%B1%95%E6%A0%87%E8%AE%B0%E8%AF%AD%E8%A8%80)
+ [XML 语法参考](https://www.runoob.com/xml/xml-syntax.html)
+ [JSON 百度百科](https://baike.baidu.com/item/JSON/2462549)
+ [JSON 语法参考](https://www.runoob.com/json/json-syntax.html)

:::

:::warning **提示：视图在不同语境下的含义说明**

为避免与 `DSL` 概念产生混淆，现对 “视图” 在不同场景中的具体含义声明如下：

1. **作为 Oinone 元数据时**  
   视图是 Oinone 中的核心元数据之一，**多数场景下 “视图” 特指 View 模型**，即系统中定义的视图实体本身，包含模型的各类属性、配置及关联信息。
2. **描述 DSL 时**  
   当涉及 DSL（领域特定语言）相关内容时，“视图” 通常指代 **View#template 字段中存储的 XML 数据**，即视图的模板结构定义，用于描述界面的布局和组件关系。
3. **页面加载场景中**  
   在页面加载过程中，“视图” 一般泛指 **整个页面**，即最终呈现给用户的完整页面内容，包含所有嵌套的组件和布局结构。

:::

# 一、架构设计

## （一）获取视图

让我们先来看一下 `viewAction#load` 请求的运行流程：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/UserInterface/1752048508487-85fa9750-6103-4b97-b83f-3c4582872e61.jpeg)

### 1、获取视图请求

`viewAction#load` 并不是获取视图的唯一请求，除此之外，还有 `view#load` 、`viewAction#homepage` 等。这些请求在不同场景下会有不同的作用：

+ viewAction#homepage：登录时或 `URL` 不包含 `model` 和 `action` 参数时调用。
+ viewAction#load：`URL` 包含 `model` 和 `action` 参数时调用。
+ view#load：手动渲染局部页面时调用。（仅获取视图）

### 2、视图编译

**视图编译**是指在处理 DSL（领域特定语言）的过程中，自动向 DSL 内容中补充模型元数据的行为。其核心目的是简化 DSL 配置，并确保运行时能获取到完整的元数据信息。

在视图经过编译之后，将得到以 JSON 格式表示的 DSL 内容。

### 3、视图权限控制

视图权限控制的核心逻辑是通过**动作权限**和**字段读权限**进行权限验证，将无权限的动作或字段从视图中移除，从而实现界面层的权限隔离。同时，这种权限控制并非仅停留在前端展示层面，而是贯穿全链路，确保无权限的操作在任何场景下都被严格限制。

### 4、母版和布局

一个完整的 Web 页面由三个核心部分构成：**母版**、**布局**和**视图**。三者协同作用，共同决定页面的最终呈现形式，而当跳转动作未明确指定母版或布局时，系统会通过一套自动匹配机制确定使用的母版和布局。

**母版优先级**

前端注册母版 > 后端指定母版 > 默认母版

**布局优先级**

前端注册布局 > 后端指定布局 > 默认布局

## （二）后端加载视图

在 `resources` 目录下，我们可以在特定目录创建一些 XML 文件，用来定义母版、布局以及视图。

### 1、加载母版

将 `XML` 文件放置在 `resources/pamirs/views/${module}/mask` 目录下，即可实现自动加载。在加载时，至少需要指定母版名称，作为其唯一标识。

例如，在 `demo` 模块添加 `demo_mask.xml` 并实现自动加载。

```plain
main
├── java
└── resources
    └── pamirs
        └── views
            └── demo
                └── mask
                    └── demo_mask.xml
```

**demo_mask.xml**

```xml
<mask name="demo_common_mask">
    ......
</mask>
```

在这个母版中，`name` 属性指定了母版在数据库中存储的唯一标识。唯一标识可以用来在其他使用母版的地方对其进行引用。

:::warning 提示

更多关于 母版 相关的内容请参考：[Mask](/zh-cn/DevManual/Reference/Front-EndFramework/Widget/mask.md)

:::

母版是否被正确加载，我们可以通过查询数据库中 `base_mask_definition` 表进行验证：

```sql
select * from base_mask_definition where name = 'demo_common_mask' and is_deleted = 0;
```

### 2、加载布局

将 `XML` 文件放置在 `resources/pamirs/views/${module}/layout` 目录下，即可实现自动加载。在加载时，至少需要指定布局名称，作为其唯一标识。

例如，在 `demo` 模块添加 `demo_layout.xml` 并实现自动加载。

```plain
main
├── java
└── resources
    └── pamirs
        └── views
            └── demo
                └── layout
                    └── demo_layout.xml
```

**demo_layout.xml**

```xml
<view type="TABLE" name="demo_table_layout">
    ......
</view>
```

在这个布局中，`type` 属性指定了布局对应的视图类型（`ViewTypeEnum`），`name` 属性指定了布局在数据库中存储的唯一标识。唯一标识可以用来在其他使用布局的地方对其进行引用。

:::warning 提示

更多关于 布局 相关的内容请参考：[Layout](/zh-cn/DevManual/Reference/Front-EndFramework/Widget/layout.md)

:::

布局是否被正确加载，我们可以通过查询数据库中 `base_layout_definition` 表进行验证：

```sql
select * from base_layout_definition where name = 'demo_table_layout' and is_deleted = 0;
```

### 3、加载视图

将 `XML` 文件放置在 `resources/pamirs/views/${module}/template` 目录下，即可实现自动加载。在加载时，至少需要指定布局名称，作为其唯一标识。

例如，在 `demo` 模块添加 `demo_view.xml` 并实现自动加载。

```plain
main
├── java
└── resources
    └── pamirs
        └── views
            └── demo
                └── template
                    └── demo_view.xml
```

**demo_view.xml**

```xml
<view type="TABLE" model="demo.DemoModel" name="demo_table_view">
    ......
</view>
```

在这个布局中，`type` 属性指定了视图对应的视图类型（`ViewTypeEnum`），`model` 属性指定了视图对应的模型编码，`name` 属性指定了视图在数据库中存储的名称，`model` 和 `name` 属性在数据库中是联合唯一的。

:::warning 提示

更多关于 DSL 相关的内容请参考：[DSL](/zh-cn/DevManual/Reference/Front-EndFramework/Widget/DSL.md)

:::

视图是否被正确加载，我们可以通过查询数据库中 `base_view` 表进行验证：

```sql
select * from base_view where model = 'demo.DemoModel' and name = 'demo_table_view' and is_deleted = 0;
```

## （三）为视图指定布局

在加载视图时，我们可以在 XML 中通过 layout 属性指定布局，这样我们就可以在这个视图渲染时使用对应的布局以改变页面展示效果。

```xml
<view type="TABLE" model="demo.DemoModel" name="demo_table_view" layout="demo_table_layout">
    ......
</view>
```

## （四）为跳转动作指定母版

以 `UxRouteButton` 注解创建跳转动作为例，我们可以使用 `UxRoute#mask` 属性指定母版，这样在跳转动作跳转到对应视图时，将使用对应母版以改变页面展示效果。

```java
@UxRouteButton(
        action = @UxAction(name = "redirectDemoPage", displayName = "跳转到演示页面", contextType = ActionContextTypeEnum.CONTEXT_FREE),
        value = @UxRoute(viewName = "demo_table_view", mask = "demo_common_mask"))
@Model.model(DemoModel.MODEL_MODEL)
public class DemoModelAction {
}
```

:::warning 提示

更多关于 UxRouteButton 相关的内容请参考：[交互 API](/zh-cn/DevManual/Reference/Back-EndFramework/UX-API.md)

:::

## （五）元数据模型类图

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/UserInterface/a2016b2b554528540ce4a41383bcdaf3.svg)

# 二、DSL 设计

在 Oinone 中，不论是母版、布局还是视图，其数据库存储的都是 XML 格式，前端获取到的 DSL 都是 JSON 格式，了解 DSL 设计的基本原理和数据类型的表示方式，可以更好的帮助我们使用 DSL。

## （一）XML 语法基础

让我们先来看这样一段 XML 内容：

```xml
<view type="TABLE" model="demo.DemoModel" name="demo_table_view">
    ......
</view>
```

一个标准的 XML 内容具备以下这些特征和概念：

+ XML 是以**节点**描述文档结构的语法，每个节点都包含三个要素：标签名、属性以及子节点。
+ 任何一个 XML 都有且仅有一个根节点。
+ 节点/元素/标签：这三个名词都用来表示同一个意思，在不同场景中会使用不同的名词。例如：`根节点`、`<view> 元素`、`view 标签` 都描述了同一个 `<view></view>` 对象。

## （二）数据类型

由于 XML 对于属性的值类型仅支持字符串，但对于前端需要获取的属性来说，是需要做一些必要的转换和映射的，下面列举了 Oinone DSL 中常用的数据类型以及在文档中的表示方式。

### 1、通用数据类型及转换规则

+ string：无需转换。
+ number：通过 `NumberHelper#toNumber` 转换 为 `number` 类型。
+ enum：取决于枚举值类型。
+ boolean：通过 `BooleanHelper#toBoolean` 转换为 `boolean` 类型。
+ Date：取决于格式化字符串，通过 `DateUtil#toDate` 转换为 `Date` 类型。
+ array：通过 `StringHelper#convertArray` 转换为 `string[]` 类型。任何数组类型在未特殊声明时均使用半角逗号（，）分隔。

:::warning 提示

这些转换规则适用于 Widget 框架提供的绝大多数组件的属性配置，对于一些特殊属性的配置，在组件属性示例中会进行提示。

:::

### 2、数据类型表示法

在前端相关文档中，我们采用类似 TypeScript 类型声明的方式对属性的类型进行表示。下面列举了几种常见的数据类型表示方式：

+ `string`：字符串。
+ `number`：数字。
+ `string | number`：字符串或数字。
+ `'click' | 'dblclick'`：显式列举枚举可选项。
+ `ButtonType`：枚举类型，当枚举可选项过多时采用这种方式。
+ `url`：链接格式字符串。
+ `rsql`：RSQL 格式字符串。
+ `expression`：表达式格式字符串。
+ `color`：CSS 颜色值。
+ `gutter`：CSS gutter 配置。
+ `icon`：图标（iconfont 图标库对应的 Font Class）。
+ `string[]`：字符串数组。
+ `number[]`：数字数组。
+ `string[] | number[]`：字符串数组或数字数组。
+ `(string | number)[]`：字符串或数字类型混合数组。
+ `('click' | 'dblclick')[]`：枚举数组。

## （三）结构表述

根据 XML 语法特征，其**节点与节点**之间具备**顺序性**和**相对关系**。在 Oinone DSL 中，除了 `xslot` 和 `template` 标签外，其他标签最终都会被解析为对应的 `Widget 组件` 进行渲染并提供对应的功能。

### 1、顺序性

先来看这两个 DSL 片段：

```xml
<field data="code" />
<field data="name" />
```

```xml
<field data="name" />
<field data="code" />
```

当我们在 DSL 中交换了两个标签的上下顺序时，其渲染顺序也会随之改变。这就是 DSL 的顺序性。

### 2、相对关系

+ 兄弟关系（sibling）：处于同一层级的两个相邻节点具备兄弟关系。

```xml
<field data="code" />
<field data="name" />
```

+ 父子关系（parent/child）：相邻层级之间的两个节点具备父子关系。

```xml
<pack widget="tabs">
  <pack widget="tab">
    ......
  </pack>
</pack>
```

### 3、组件自治原则

任何 Widget 组件其管理范畴均严格限定与自身及所有子节点，每个组件都可以定义属性和插槽并通过在 DSL 中配置完成业务场景的适配。

例如：

+ 对于输入框组件来说，它可以作为一个独立的组件而不依赖任何其他组件。
+ 对于选项卡组件来说，`tabs` 和 `tab` 两个组件必须以父子关系联合使用才可以保证功能正常。`tabs` 组件的管理范畴仅限于**子节点**，对于**孙子节点**来说并不具备管理能力；而 `tab` 组件并不关心任何子节点，它仅仅是提供了一块可以动态渲染的区域。

值得注意的是，无论采用何种实现方式，组件间都**不应建立直接关联**。若违背这一原则，不仅会破坏组件的自治性，更会导致其丧失通用性 —— 这正是组件设计中需坚守的核心准则。

