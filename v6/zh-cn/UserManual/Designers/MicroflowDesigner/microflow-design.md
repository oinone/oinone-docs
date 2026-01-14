---
title: 微流设计
index: true
category:
  - 用户手册
  - 设计器
order: 2
next:
  text: AI集成设计器（AI Integrated Designer）
  link: /zh-cn/UserManual/Designers/AIIntegratedDesigner/README.md
---
在微流设计页面中，可以进行全面的微流设计与微流配置。

微流设计主要分为三个功能区域，分别为：操作栏、微流设计区、属性面板

+ 操作栏：提供一系列常用的操作按钮与菜单选项，可以进行修改微流名称、保存、发布等操作。
+ 微流设计区：微流设计的主要区域，可以在微流中直接添加节点动作来完善微流。
+ 属性面板：当点击某一节点动作时显示。可以在此面板中调整节点的相关属性。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Microflow%20Designer/Microfluidic%20Design/1.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Microflow%20Designer/Microfluidic%20Design/2.png)

微流配置主要分为两个功能区域，操作栏与微流配置区

+ 操作栏：与微流设计的操作栏保持一致。
+ 微流配置区：可以在此配置微流参数作为临时字段，或更改微流所属应用。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Microflow%20Designer/Microfluidic%20Design/3.png)

# 一、微流设计
## （一）操作栏
### 1.编辑微流名称与说明
#### 一、功能介绍
可以在操作栏的左侧编辑微流的名称与说明。修改后的名称与说明会在微流的列表中展示。

:::info 注意

编辑完名称或说明后需暂存或发布，否则无法保存

:::

#### 二、操作方法
+ 编辑名称：点击「编辑」图标，在输入框中输入名称后，点击除输入框外其他位置即可编辑成功。
+ 编辑说明：点击名称下的说明区域，在弹窗中输入说明后，点击「确定」即可编辑成功。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Microflow%20Designer/Microfluidic%20Design/czl1.png)

### 2.切换菜单
#### 一、功能介绍
当在设计微流时，若需要临时参数或修改微流所属应用时，可在操作栏中切换菜单完成操作。

#### 二、操作方法
点击操作栏中菜单区域，即可在微流设计和微流配置之间切换

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Microflow%20Designer/Microfluidic%20Design/czl2.png)

### 3.暂存
#### 一、功能介绍
支持对微流设计进行存档保存。即便微流设计尚未完整，也可以选择暂存当前设计进度。下次进入微流设计页面时，系统将自动加载并显示之前暂存的设计页面，方便继续完善微流。

:::warning 提示

当微流设计已完成但尚未发布时，可以选择直接启用微流。启用操作将自动触发当前版本的发布微流，使设计立即生效并投入使用。

:::

#### 二、操作方法
点击「暂存」，即可将当前设计进度存档保存。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Microflow%20Designer/Microfluidic%20Design/czl3.png)

### 4.发布/更新发布
#### 一、功能介绍
微流设计完成后，可以选择将其发布，以使微流正式生效并投入使用。对于尚未发布过的微流，发布按钮上会显示“发布微流”字样。而对于已经发布过的微流，发布按钮则会变为“更新发布”字样。

:::info 注意

对已发布并启用的微流进行修改后，在更新发布之前，这些修改将不会对当前正在使用的微流版本产生任何影响。在微流管理页面，更新状态会显示为“未更新”。只有完成所有修改，并进行更新发布后，新的微流版本才会正式生效，并替代之前的版本。

:::

:::info 注意

在发布微流时，必须确保在触发节点与结束节点之间至少存在一个有效节点，并且所有节点均已完成配置。若不满足这些条件，微流将无法发布。

:::

#### 二、操作方法
点击「发布/更新发布」按钮，即可将当前流程设计发布。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Microflow%20Designer/Microfluidic%20Design/czl4.png)

## （二）微流设计区
#### 1.功能介绍
节点添加到微流后，可添加节点、修改其名称、编辑说明以及删除不需要的节点，以便更好地进行微流设计。

微流设计器中节点与流程设计器中节点大致相同，与流程设计器相比，缺少需人工干预的节点，如审批、填写、审批分支，以及并行节点和开发者节点。除此之外，在微流设计器中新增了“循环”节点

+ 循环节点：可循环执行一部分节点，包含两种循环方式：列表循环与次数循环
    - 列表循环：可选择循环节点之前所有可获取数据的对应模型中的数据，依据数据列表进行循环
    - 次数循环：可设置循环的开始值、结束值与步长，可直接录入数值或从循环节点之前所有可获取数据的对应模型中的数据中选择

:::danger 警告

节点删除后无法恢复，请谨慎操作！

:::

:::info 注意

关于节点的相关信息，可查看「流程设计器-节点介绍」文档

:::

#### 2.操作方法
+ 点击「添加」图标，可在微流之间增加节点

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Microflow%20Designer/Microfluidic%20Design/wlsjq.png)

+ 点击「节点名称」，可在输入框中修改名称
+ 点击「节点说明」图标，在弹窗中输入节点说明后点击「确定」即可成功编辑节点说明
+ 点击「删除」图标后，在弹窗中点击「确定」，即可删除节点

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Microflow%20Designer/Microfluidic%20Design/wlsjq2.png)

## （三）属性面板
#### 1.功能介绍
在属性面板中，可以为节点动作配置各种属性。

#### 2.操作方法
点击节点主体位置，在右侧弹窗中根据业务需求配置属性后，点击「保存」。

:::info 注意

需将属性中必填信息填写完成，否则无法保存。

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Microflow%20Designer/Microfluidic%20Design/sxmb1.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Microflow%20Designer/Microfluidic%20Design/sxmb2.png)

# 二、微流配置
## （一）参数配置
#### 1.功能介绍
在微流设计中，微流参数可以作为一个临时字段来存放某个字段值、计算结果或接受其他微流传过来的值。临时参数支持文本、数值、日期、布尔四种数据类型，以满足不同场景的需求。

:::info 注意

一旦微流参数在微流中被引用，将无法对其进行修改或删除操作

:::

:::warning 提示

在微流中可以使用“更新微流参数”来使用配置好的参数来存放数据。

:::

#### 2.操作方法
在参数配置下，点击「添加新参数」，选择参数类型并输入参数名后点击「保存」，即可成功添加参数。

:::info 注意

参数名称规则：参数名称必须以字母开头，支持输入数字与下划线，不支持输入汉字。

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Microflow%20Designer/Microfluidic%20Design/cspz.png)

## （二）微流配置
#### 1.功能介绍
在创建微流时已选择了所属应用。若发现应用选择错误或需要更改所属应用，可以在此处进行编辑操作。

:::info 注意

在“工作流”-“微流运行记录”中查看微流实例时：

+ 若在应用变更之前已经生成了实例，那么这些实例将继续保存在变更前的应用中。
+ 而应用变更之后新生成的实例，则将保存在变更后的应用中。

:::

#### 2.操作方法
在微流配置下，选择应用后，点击「保存」，即可成功修改应用。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Microflow%20Designer/Microfluidic%20Design/wlpz.png)

