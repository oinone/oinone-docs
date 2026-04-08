---
title: 数据流程
index: true
category:
  - 用户手册
  - 设计器
order: 3
---
当连接集成资源后，需通过流程编排的手段，实现集成资源数据互通，以可视化的方式处理数据流程，来提升集成作业效率。

数据流程主要涵盖流程管理和流程设计两大核心部分，其整体框架与流程设计器保持高度一致。关于流程设计器的详细功能，可查阅“流程设计器”文档以获取更多信息。在此，重点关注数据流程中的流程节点，这些节点与流程设计器中的节点存在一些差异。因此，本文将仅针对这些差异节点进行详细介绍，其他节点可查阅「流程设计器-节点动作」文档。

# 一、触发节点
流程的触发方式共有三种，分别是：模型触发、定时触发以及消息触发，以满足不同场景的需求。

:::tip 举例

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/data%20flow/1.png)

:::

:::info 注意

+ 若未设置流程触发节点，将无法继续添加其他后续节点，并且流程也无法发布。
+ 当触发节点配置完毕后，必须确保触发节点与结束节点之间至少存在一个节点动作，否则流程同样无法发布。

:::

关于模型触发与定时触发，其详情已在“流程设计器”文档中阐述，此处仅介绍消息触发。

+ 消息触发：适用于特定消息事件来执行流程的场景。例如收到系统的通知触发流程进行后续处理。
    - 消息标识：识别消息任务的唯一标识，标识可复用。在发送消息时，必须匹配定义的消息标识。如行为操作侧点击发送消息。
    - 触发参数设置：支持Long、Double、String、Boolean、Integer、Date、Void、Object类型。

:::info 注意

触发时根据消息标识触发，如果存在两个相同的消息标识，那么这两个数据流程都会触发

:::

:::tip 举例

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/data%20flow/2.gif)

:::

# 二、集成服务
## （一）API
当需连接集成资源，可使用API节点

:::tip 举例

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/data%20flow/API1.gif)

:::

+ 选择应用：即连接应用资源
+ 选择API：选定应用中包含的API
+ 设置参数：当API中包含请求参数时，可为其设置自定义函数与赋值表达式
+ 响应结果参数：当API中包含响应参数时，可为其设置自定义函数
+ 是否增量接口：即是否需要启用增量控制，如设置为否，需要集成开发人员自主控制
    - 增量游标：当是增量接口时，可从响应结果中选择游标取值参数，在数据流程运行完成后，辅助客户更新游标值。取当次数据流程中相应参数的最大值。
+ 设置上下文数据源：当数据在不同位置名称不一致，但实质上指代同一数据时，可通过配置上下文数据源来实现数据的映射。

:::tip 举例

获取钉钉开放接口的access_token（需在连接器中添加相应API）其中appkey与appsecret参数是钉钉用于验证请求者身份的重要凭证，根据实际填写，此处不做展示。正确填写参数后，就可以从钉钉服务器获取到access_token

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/data%20flow/API2.gif)

:::

# 三、数据处理
## （一）新增数据
新增数据节点可以为任意模型通过表达式新增数据。

## （二）更新数据
更新数据节点可以为任意模型通过表达式更新数据。

## （三）获取数据
获取数据节点可以为流程获取触发模型之外的模型中的数据。

## （四）删除数据
删除数据节点可以将流程节点上面的模型数据从数据库中删除。

## （五）更新流程参数
可以将「流程配置」中的「流程参数」进行修改。

## （六）引用逻辑
当需要再流程使用模型自带的逻辑或使用低代码设计的逻辑时，可使用引用逻辑节点

:::tip 举例

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/data%20flow/yy1.gif)

:::

+ 选择应用：可选择在平台中创建的应用
+ 模型：选定应用中所包含的模型
+ 选择函数：从模型自带的函数或由低代码平台设计的函数中，选择所需的函数。
+ 设置参数：为函数中包含的参数设置相应的表达式，以满足实际业务需求

:::tip 举例

将“销售与广告数据”模型中“利润”字段更新为销售额减广告投入的数据

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/data%20flow/yy2.gif)

:::

# 四、构建
## （一）延时
延时节点能够使下一个节点的动作延迟一段时间后再执行。

## （二）条件分支
条件分支节点可以使不同条件的数据执行不同的分支流程。

## （三）子流程
一些高度重复的流程节点可以创建成子流程，在主流程中引用子流程节点，可以减少流程的重复配置。

## （四）循环
当数据流程中存在部分节点需要重复执行时，可使用循环节点

:::tip 举例

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/data%20flow/xh1.gif)

:::

循环节点包含两种循环模式：列表循环与次数循环

+ 列表循环：可选择循环节点之前所有可获取数据的对应模型中的数据，依据数据列表进行循环
+ 次数循环：可设置循环的开始值、结束值与步长，可直接录入数值或从循环节点之前所有可获取数据的对应模型中的数据中选择

:::tip 举例

依据“销售数据”模型中的名称列表进行循环

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/data%20flow/xh2.gif)

:::

# 五、消息
## （一）站内信
站内信可以向用户发送消息。

## （二）邮件
邮箱节点可以向指定邮箱发送邮件。

## （三）短信
短信节点可以向指定接收人发送短信。