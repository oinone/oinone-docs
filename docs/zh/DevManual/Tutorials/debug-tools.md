---
title: 调试工具（Debug Tools）
index: true
category:
  - 研发手册
  - 教程
order: 9
next:
  text: 自定义字段
  link: /zh/DevManual/OperationGuide/customize-a-field-widget.md
---
# 一、概述

Oinone 提供的调试工具是一款支持在浏览器页面直接进行 **页面调试** 与 **接口调试** 的效率工具。它集成了页面元数据调试、异常堆栈分析、SQL 执行追踪、函数链路监控等核心调试功能，权限验证追踪、权限上下文、数据审计追踪等业务场景调试功能，可帮助前后端开发人员快速定位和解决不同场景下的调试需求，显著提升开发效率。

# 二、进入调试工具

在需要调试的页面，通过修改浏览器 URL 的方式进入调试工具页面。如下图所示：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/DebugTools/1749204201573-3acb60b2-8186-47ef-92e5-9b604808e1f4.png)

如需要调试的页面的URL如下所示：

``` plain
http://127.0.0.1:9093/page;module=resource;viewType=TABLE;model=resource.ResourceCountryGroup;action=resource%23%E5%9B%BD%E5%AE%B6%E5%88%86%E7%BB%84;scene=resource%23%E5%9B%BD%E5%AE%B6%E5%88%86%E7%BB%84;target=OPEN_WINDOW;menu=%7B%22selectedKeys%22:%5B%22%E5%9B%BD%E5%AE%B6%E5%88%86%E7%BB%84%22%5D,%22openKeys%22:%5B%22%E5%9C%B0%E5%9D%80%E5%BA%93%22,%22%E5%9C%B0%E5%8C%BA%22%5D%7D
```

将 `page` 改为 `debug` 后即可进入该页面的调试页面，如下所示：

``` plain
http://127.0.0.1:9093/debug;module=resource;viewType=TABLE;model=resource.ResourceCountryGroup;action=resource%23%E5%9B%BD%E5%AE%B6%E5%88%86%E7%BB%84;scene=resource%23%E5%9B%BD%E5%AE%B6%E5%88%86%E7%BB%84;target=OPEN_WINDOW;menu=%7B%22selectedKeys%22:%5B%22%E5%9B%BD%E5%AE%B6%E5%88%86%E7%BB%84%22%5D,%22openKeys%22:%5B%22%E5%9C%B0%E5%9D%80%E5%BA%93%22,%22%E5%9C%B0%E5%8C%BA%22%5D%7D
```

PS：通常我们会将新的 `URL` 改好后粘贴到新的浏览器标签页，以保留原页面可以继续查看相关信息。

进入调试工具页面后，我们可以看到如下图所示的页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/DebugTools/72D2EB2F-8B6C-476C-8761-3F36BF54DE7F.png)

# 三、页面调试

在进入页面调试后，可以直观的看到以下信息：

+ 页面参数：当前 URL 参数解析结果。
+ 页面信息：通过 `viewAction#load` 接口返回的跳转动作基本信息。
+ DSL：当前页面使用的元数据信息。
+ Layout：当前页面使用的布局。
+ Mask：当前页面使用的模板。

:::warning 提示：

页面调试没有过多的内容需要详细解释，主要是查看 “字段”、“动作”等元数据信息是否按前端组件要求进行返回。

例如：未满足字段注册条件导致组件渲染错误、属性配置错误导致组件无法正常使用以及 DSL 返回的顺序不对等问题。

:::

# 四、接口调试

## （一）发起一次接口调试

以下示例均在Chrome浏览器中进行演示，不同浏览器可能存在差异。

### 1、使用浏览器查看接口及查看接口异常

如下图所示，通过`检查`或`F12`打开浏览器控制台，并查看所有接口请求：

**无异常接口**  
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/DebugTools/9C241ABE-F015-47DC-855F-84AD14C1E97A.png)

**有异常接口**

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/DebugTools/1C3BD849-1E13-4D78-A852-8E348681C5C3.png)

PS：一般情况下，所有 Oinone 请求的 Http 状态都为 `200`，错误信息在 `errors` 数组中进行返回。

### 2、在浏览器控制台复制 fetch 格式请求

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/DebugTools/0E570045-E480-4C41-AB65-5548C0743BC8.png)

### 3、粘贴至 接口调试 输入框

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/DebugTools/AB3A1B03-F387-4B29-8566-C4F6D9ADBE33.png)

### 4、点击 发起请求 即可看到该接口的响应信息

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/DebugTools/4EE1E6BB-0F22-462D-9099-0557CB95D26C.png)

:::warning 提示：

日志级别

+ 默认调试: 1
+ 权限调试: 2
+ Debug 级别日志调试: 3
+ Trace 级别日志调试: 4

:::

## （二）异常堆栈分析

在开发过程中，代码出现异常是很平常的事情。在调试工具中，对堆栈进行了简单的分析，用于快速定位一些常规问题。我们可以逐步通过下面这些功能来定位问题：

### 1、异常抛出栈

对于一些异常可以较为容易的捕获，我们提供了查看 “问题第一现场” 的初步分析功能，可以精确定位到类以及代码行。如下图所示：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/DebugTools/1749215775583-58f5a773-902b-4a2f-9f13-18791047c28d.png)

### 2、业务堆栈

如果 “问题第一现场” 无法准确定位问题，则可以通过 “业务堆栈” 来查看一些与 Spring 框架或 Oinone 框架无关的堆栈信息：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/DebugTools/1749216235892-362406ec-4804-4557-8e21-ce48dc65921c.png)

:::warning 提示：

这个示例由于在 `shushi` 包路径下，因此也包含了 Oinone 框架的堆栈信息。

:::

### 3、业务与 Oinone 堆栈

堆栈信息是逐步增多的，若仅查看 “业务堆栈” 仍然无法准确定位问题，那可能是与 Oinone 框架相关的异常，则可以通过 “业务与 Oinone 堆栈” 来查看包含 Oinone 框架 的堆栈信息：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/DebugTools/1749216366053-8648cd75-a6cb-41da-b9ad-66db91b5ad80.png)

### 4、根堆栈信息和全部堆栈

经过裁剪的堆栈可能无法定位一些特殊问题，这时就需要通过 “根堆栈信息” 和 “全部堆栈” 来查看完整的堆栈日志，通常这两个信息与开发时使用 IDE 调试的日志是完全一样的。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/DebugTools/1749216607962-75b6cb40-0241-4447-b006-6e9a84e63c9c.png)

### 5、调试日志

有些时候，在异常堆栈的附近会通过 `Logback` 打印一些业务相关的数据进行调试，在生产环境这些日志往往是关闭的。在调试工具中，通过调整 “日志级别” 可以在 “调试日志” 中看到更细粒度的日志信息。当我们将 “日志级别” 改为 `3` 并重新发起请求后，可以看到 Redis 连接、数据源路由等调试日志，如下图所示：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/DebugTools/1749216817051-6fddd803-75f0-47b7-b897-ed25cf8d8e6a.png)

## （三）请求性能分析

对于一些请求过慢的问题，我们可以通过调试工具提供的 `SQL 调试` 和 `函数链路追踪` 功能进行初步分析，下面我们来看一下这些信息在性能分析中的使用方法。

### 1、SQL 调试

下图是执行 `queryPage` 请求时的 “SQL 调试”信息：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/DebugTools/1749213780958-96e91445-75b7-492d-afba-70c6a5844359.png)

+ `392` 是当前 SQL 在 `JVM` 中执行时的 `线程ID` ，当出现多个线程并发执行时，将看到多个以 `线程ID` 为 `key` 的 `SQL` 数组。
+ 以第一条 SQL 为例：真实执行的 `SQL` 作为 `key`，`2` 表示这个 `SQL` 执行的耗时情况。单位为：毫秒。

对于 “慢 SQL” 来说，其耗时一般比较长，可以通过 SQL 调试来追踪一些 “慢 SQL” ，然后将对应 SQL 通过 “执行计划” 进行分析，就可以看到 执行顺序 及 索引使用情况 等细节。

### 2、函数调用链追踪

下图是执行 `queryPage` 请求时的 “函数调用链追踪” 信息：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/DebugTools/1749213751184-47070403-01d4-4ca5-b866-75856243ec7f.png)

函数追踪格式：

+ `|--`：层级符号，当函数调用时调用了其他函数，则显示对应层级。
+ `耗时：[0]`：当前函数执行完成时的总耗时。
+ `namespace：[]`：函数命名空间。
+ `fun：[]`：函数名。
+ `beanName：[]`：Spring Bean 名称，如果函数在 Spring Bean 中执行时可以看到对应名称。
+ `clazz：[]`：全路径类名。
+ `函数执行器：[]`：Oinone FunEngine 提供了多种执行器，不同的函数会通过不同类型的执行器执行。
  - `SPRING`：Spring 函数执行器。
  - `REMOTE`：远程调用执行器。
  - `LOCAL`：非 Spring 函数执行器。
+ `>:pamirs-dev#127.0.0.1:20881`：表示当前函数在 `应用名称（spring.application.name）`服务上执行，其对应的 `dubbo` 注册 IP 和 端口为：`127.0.0.1:20881` 。

## （四）权限验证失败分析

当接口出现如下图所示的 “无权限进行该操作” 等相关异常时：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/DebugTools/1749213995538-dd7e45ca-4e32-4c0e-855c-db40f8344c61.png)

可以通过查看 “权限验证追踪” 面板提供的信息进行初步分析：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/DebugTools/1749214071408-e2260812-293d-448d-ac72-d218fd71f02f.png)

在 “权限验证追踪” 面板，可能出现的一些验证信息：

+ 验证模块：验证当前用户是否可访问指定模块。
+ 验证首页：验证当前用户是否可访问指定模块首页。
+ 验证菜单：验证当前用户是否可访问指定菜单。
+ 验证动作：验证当前用户是否可访问指定动作。如图为 false ，则表示无权限执行。
+ 验证动作路径：通过当前会话路径（SessionPath）验证指定动作权限。
+ 验证函数：验证当前用户是否可访问指定函数。
+ 模型读权限：指定模型的读权限表达式，为 null 说明没有配置。
+ 模型可见字段：指定模型的可读字段，不在列表中的字段是不可读的。
+ 模型可编辑字段：指定模型的可编辑字段，不在列表中的字段是不可编辑的。

:::warning 提示：

不同的请求，使用到的权限限制有一定的区别，这些验证信息并不总是全部出现。未出现的指定项时，一般表示没有经过该项验证或未限制该项权限。

:::

## （五）环境配置信息

当环境配置出现问题时，我们可以在不访问服务器的情况下通过调试工具获取服务器配置，这些配置信息只能通过 “管理员” 登录后进行获取，其他用户是禁止获取的。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/DebugTools/1749217097773-bde0abf1-90c4-420e-8648-c8224b864972.png)

# 五、生产环境关闭调试工具

## （一）前端关闭调试工具

在前端运行时环境配置中，可以通过调试配置关闭调试页面的路由，可参考：[前端 API - 环境](/zh/DevManual/Reference/Front-EndFramework/environment.md)

``` javascript
runtimeConfigResolve({
  debug: {
    enabled: true
  }
});
```

## （二）后端关闭调试接口

在 Yaml 中配置 `pamirs.framework.debug.enabled` 为 `false` 可关闭调试接口，可参考：[后端 API - 模块 API](/zh/DevManual/Reference/Back-EndFramework/module-API.md)

``` yaml
pamirs:
  framework:
    debug:
      enabled: false
```

