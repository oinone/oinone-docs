---
title: 业务审计
index: true
category:
  - 用户手册
order: 7
---
# 一、登录日志
### 1.功能介绍
系统会根据用户的登录行为，自动生成登录日志，详细记录用户的登录信息。

### 2.操作方法
+ 筛选：根据实际场景需求，输入或选择相应的筛选条件，即可对登录日志进行筛选。
+ 导出：支持导出登录日志，可以选择使用预设的导出模板，也可以根据实际需求自定义导出字段。
+ 详情：点击「详情」，可查看所选登录日志的详细信息。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/operational%20auditing/dl.png)

# 二、应用日志
### 1.功能介绍
系统会根据审计规则所定义的模型与字段的内容变化，自动生成应用日志，详细记录用户的操作信息。

### 2.操作方法
+ 筛选：根据实际场景需求，输入或选择相应的筛选条件，即可对应用日志进行筛选。
+ 导出：支持导出应用日志，可以选择使用预设的导出模板，也可以根据实际需求自定义导出字段。
+ 详情：点击「详情」，可查看所选应用日志的详细信息，包括基础信息与关联信息等。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/operational%20auditing/yy.png)

# 三、审计规则
### 1.功能介绍
为了记录模型与字段的变化情况，用户可以自定义审计规则。一旦审计规则生成后，每当对该模型或字段进行操作导致其发生变化时，系统会在应用日志中自动生成一条相应的记录，便于后续追溯和查证。

:::warning 提示

若以该模型生成的页面中使用了“日志记录”组件，那么在页面中选择具体数据来查看其变更信息。其变更信息会根据审计规则来进行记录，同应用日志

:::

### 2.操作方法
+ 筛选：根据实际场景需求，输入或选择相应的筛选条件，即可对审计规则进行筛选。
+ 添加：点击「创建」，输入所需的配置信息并保存，即可成功创建新的审计规则。
+ 编辑：点击「编辑」，即可对审计规则的相关信息进行更新或修改。
+ 删除：选中某一审计规则后，点击「删除」，即可将该审计规则删除。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/operational%20auditing/gz1.png)

:::tip 举例

配置一条审计规则：当“用户行为”模型中的“浏览量”字段发生变更时，会生成并保存一条应用日志

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/operational%20auditing/gz2.gif)

当数据发生变化后，可在“应用日志”中进行查看

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/operational%20auditing/gz3.png)

同时，在“用户行为”页面配置了“日志记录”操作按钮，可查看对应数据的变更信息

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/operational%20auditing/gz4.gif)

:::

