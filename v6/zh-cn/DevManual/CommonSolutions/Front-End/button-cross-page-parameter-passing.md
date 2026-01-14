---
title: 按钮：跨页面传额外的参数
index: true
category:
   - 前端
order: 8
---
# 一、上下文在字段和动作中的应用
在业务场景中，常常需要在`打开弹窗`或`跳转到新页面`时携带当前页面数据。此时，我们需要配置相关「动作」中的上下文信息。

在 oinone 平台中，上下文主要分为以下三种：

1. `activeRecord`：当前视图数据
2. `rootRecord`：主视图数据
3. `openerRecord`：触发弹窗的对象

`activeRecord` 表示当前视图的数据。例如，若动作配置在表单上，则指代当前表单的数据；若配置在 o2m、m2m 字段表格上，则指代选中的行数据。

`rootRecord` 表示根视图的数据。若当前视图是表单页，则代表表单的数据；若为表格页，则代表表格的数据。

`openerRecord` 表示触发弹窗的对象。例如，在弹窗内的字段或动作中，可通过 `openerRecord` 获取触发弹窗的信息。

这三者均为对象 (Object) 类型。

# 二、视图介绍
## （一）当前视图
组件最近的父视图，如：弹窗内的字段组件，它的当前视图就是弹窗打开的视图

当前视图在代码中的取值关键字为`activeRecord`，获取当前视图内数据的`id`则为`activeRecord.id`

## （二）主视图
页面当前主模型（浏览器地址的 model 为主模型的模型编码）的视图，如：弹窗内的字段组件，它的主视图不是弹窗打开的视图，而是打开弹窗的动作所在的视图。

主视图在代码中的取值关键字为`rootRecord`，获取主视图内数据的`id`则为`rootRecord.id`

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/WX20240606-163748-1024x513.png)

# 三、场景设置介绍
## （一）服务端动作关闭弹窗后，刷新主视图的数据
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/WX20240606-164436-1024x648.png)

## （二）服务端动作关闭弹窗后，刷新打开该弹窗的表格行的数据
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/WX20240606-164605-1024x688.png)

# 二、界面设计器配置
## （一）在 o2m、m2m 表格字段弹窗中携带当前视图数据
假设我们设计了一个包含 `o2m`、`m2m` 表格字段的表单页面。打开相关弹窗时，需将表单中的 `code` 数据传递至弹窗中。

1. 选择相应的「动作」，如创建或添加。在右侧属性面板底部找到「上下文」，添加格式为对象 {} 的上下文信息。
2. 以键值对的格式添加上下文信息：`{code: rootRecord.code}`。
3. 设计弹窗时，将 `code` 字段拖入弹窗中。
4. 完成设计后保存并发布。

大家可以看到，在当前上下文中，`key` 为 `code`，而 `value` 则是 `rootRecord.code`。此处选用 `rootRecord` 而非 `activeRecord`，原因在于前文已阐述，若当前动作配置于 `o2m`（一对多）、`m2m`（多对多）的字段表格之上，此时 `activeRecord` 指的是表格中被选中的行。然而，我们当前的需求是获取表单上的 `code` 字段，所以必须使用 `rootRecord`。

特别需要注意的是：`key` 必须是提交模型【前端视图】中实际存在的字段，如此方能进行传递操作。

