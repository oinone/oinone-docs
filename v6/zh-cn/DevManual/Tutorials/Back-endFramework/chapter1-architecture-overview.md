---
title: 章节 1：整体介绍（Architecture Overview）
index: true
category:
  - 研发手册
  - 教程
  - 后端框架
order: 1
prev:
  text: 后端框架（Back-end framework）
  link: /zh-cn/DevManual/Tutorials/Back-endFramework/README.md
---
# 一、前后端分离架构
在软件开发中，前后端分离架构是一种高效的模式，将用户界面（前端）与业务逻辑、数据处理（后端）明确分开，使它们能独立开发、测试与部署。

前端负责与用户交互，呈现及接收输入，由 HTML、CSS、JavaScript 构成，复杂项目还会用 React、Vue.js 等框架提升开发效率。后端专注业务逻辑、数据存储，通过 Python（搭配 Django 等）、Java（如 Spring Boot）、Node.js（结合 Express）等语言及框架实现。后端与 MySQL、PostgreSQL 等数据库交互，以 API 形式为前端提供数据，API 多遵循 RESTful 或 GraphQL 规范。

此架构优势显著。开发团队可依专长分工，提高效率与代码质量。前后端能独立部署更新，降低维护成本与风险，且利于跨平台开发。电商平台就是典型应用，前端展示商品、购物车等，后端处理库存、订单等逻辑。

总之，前后端分离架构凭借清晰职责划分、高效开发及良好维护性，成为现代软件构建的重要模式。

数式Oinone的前端采用Vue.js，后端采用 Java 技术体系，API 遵循 GraphQL 规范。

:::warning 提示：数式Oinone框架让前后端分离的开发模式更进一步

前端只有在组件不满足需求或者特色业务组件开发的时候，进行前端专业开发工作。这样既保留前后端分离架构带来的好处，同时减少了因为业务开发过程中前后端不必要的沟通工作，极大地提升了效率。

:::

:::tip 举例：利用Oinone改进您的前后研发分工（**建议可选**）

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-1/tip.gif)

:::

# 二、Oinone Module
模块(module): 它是将程序划分成若干个子功能，每个模块完成了一个子功能，再把这些模块总起来组成一个整体。它是按业务领域划分和管理的最小单元，是一组功能、界面的集合。

Oinone 模块既可以为 Oinone 系统添加全新的业务逻辑，也可以修改和扩展现有的业务逻辑。可以创建一个模块，将你业务所需的用户组织管理规则添加到Oinone的通用用户组织支持中，而另一个不同的模块可以添加对实时可视化的支持。

在 Oinone 中，一切都以模块开始和结束。

术语：开发人员将他们的业务功能分组到 Oinone 模块中。主要面向用户的模块被标记并显示为应用程序（Apps），但大多数模块并非应用程序。

# 三、Module structure 模块结构
每个模块都是独立的一个Java模块，工程结构按Spring面向接口编程规范一般包括：api工程和core工程。一个 Oinone 模块是通过其XxModule.java文件来声明的。[模块定义文件说明](/zh-cn/DevManual/Reference/Back-EndFramework/module-API.md)

## （一）每个模块都需要配置扫描路径：
当一个 Oinone 模块包含业务对象时，这些文件会被组织成在模块的扫描包路径下

+ 使用packagePrefix方法来配置模块需要扫描元数据的包路径

## （二）一个简化的模块目录结构：
```plain
Module
├── module-api  模块接口工程
│   ├── model   模型
│   └── Module.java 模块定义
└── module-core 模块实现工程
    ├── action  行为
    └── init    数据初始化
```

# 四、Oinone Editions
Oinone 有两个版本：Oinone 企业版（需许可证且为共享源代码）和 Oinone 社区版（开源）。除了技术支持或升级等服务外，企业版还为 Oinone 提供了额外的功能。从技术角度来看，这些功能只是在社区版提供的模块基础上安装的新模块。


准备好开始了吗？现在是时候编写你自己的应用程序了！





