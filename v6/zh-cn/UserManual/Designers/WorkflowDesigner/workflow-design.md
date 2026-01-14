---
title: 流程设计
index: true
category:
  - 用户手册
  - 设计器
order: 2
---
在流程设计页面中，可以进行全面的流程设计与流程配置。

流程设计主要分为四个功能区域，分别为：操作栏、工具栏、流程设计区、属性面板

+ 操作栏：提供一系列常用的操作按钮与菜单选项，可以进行修改流程名称、保存、发布等操作。
+ 工具栏：提供了一系列流程常用节点动作。
+ 流程设计区：流程设计的主要区域，可以通过拖拽或在流程中直接添加节点动作来完善流程。
+ 属性面板：当点击某一节点动作时显示。可以在此面板中调整节点的相关属性。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/Process%20Design/1.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/Process%20Design/2.png)

流程配置主要分为两个功能区域，操作栏与流程配置区

+ 操作栏：与流程设计的操作栏保持一致。
+ 流程配置区：可以在此配置流程参数作为临时字段，或更改流程所属应用。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/Process%20Design/3.png)

# 一、流程设计
## （一）操作栏
### 1.编辑流程名称与说明
#### 一、功能介绍
可以在操作栏的左侧编辑流程的名称与说明。修改后的名称与说明会在流程的列表或卡片中展示。

:::info 注意

编辑完名称或说明后需暂存或发布，否则无法保存

:::

#### 二、操作方法
+ 编辑名称：点击「编辑」图标，在输入框中输入名称后，点击除输入框外其他位置即可编辑成功。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/Process%20Design/bj1.png)

+ 编辑说明：点击名称下的说明区域，在弹窗中输入说明后，点击「确定」即可编辑成功。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/Process%20Design/bj2.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/Process%20Design/bj3.png)

### 2.切换菜单
#### 一、功能介绍
当在设计流程时，若需要临时参数或修改流程所属应用时，可在操作栏中切换菜单完成操作。

#### 二、操作方法
点击操作栏中菜单区域，即可在流程设计和流程配置之间切换

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/Process%20Design/qh.png)

### 3.展示回退路线

#### 一、功能介绍

可视化呈现人工节点预设退回路线，清晰指引操作流程，助于快速掌握节点回溯逻辑。

#### 二、操作方法

开启「展示回退路线」开关，选择配置退回功能的人工节点，系统将自动显示对应回退路线

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/Process%20Design/1754029147834-b519ee08-3cc7-4492-8aef-b7b04d857022.png)

### 4.暂存
#### 一、功能介绍
支持对流程设计进行存档保存。即便流程设计尚未完整，也可以选择暂存当前设计进度。下次进入流程设计页面时，系统将自动加载并显示之前暂存的设计页面，方便继续完善流程。

:::warning 提示

当流程设计已完成但尚未发布时，可以选择直接启用流程。启用操作将自动触发当前版本的发布流程，使设计立即生效并投入使用。

:::

#### 二、操作方法
点击「暂存」，即可将当前设计进度存档保存。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/Process%20Design/1754287777231-3ddbd01e-90f8-4b62-b34f-3a9e28913348.png)

### 5.查看历史记录

#### 一、功能介绍

查看历史记录功能为用户提供了回溯内容过往状态的便捷途径，支持用户查询并浏览在不同时间节点暂存或发布的版本记录。

同时，该功能支持将某一历史记录保存为版本，且每个版本都可以单独命名，便于用户对不同版本进行区分和管理，进一步提升版本管理的便捷性。

#### 二、操作方法

+ **查看入口**：在顶部操作栏中，点击「历史记录」图标，进入历史版本记录页面。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/Process%20Design/1754289433319-44d46fbc-f170-42af-a9d9-ca4d408c6f5a.png)

+ **版本筛选与展示**：系统会按时间顺序展示所有已暂存或发布的版本记录，每条记录会标注对应的创建时间、操作人，方便用户快速定位目标版本。
+ **版本查看**：用户选中某一历史版本后，系统会展示该版本的完整内容，与该版本在当时暂存或发布时的状态保持一致。
+ **保存为版本**：选择某一历史记录，点击「保存为版本」，输入名称即可将该记录保存为版本；或点击记录下方悬浮的「编辑」图标，输入名称后也可将该记录保存为版本。
+ **恢复历史版本**：选择某一历史记录，点击「恢复此记录」，即可恢复至该历史版本。
+ **删除历史记录**：选择某一历史记录，点击「删除」即可将该记录删除。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/Process%20Design/1754289501388-28f46593-0c13-4347-a1a2-3ca85b288004.png)

### 6.发布/更新发布
#### 一、功能介绍
流程设计完成后，可以选择将其发布，以使流程正式生效并投入使用。对于尚未发布过的流程，发布按钮上会显示“发布”字样。而对于已经发布过的流程，发布按钮则会变为“更新发布”字样。

:::info 注意

对已发布并启用的流程进行修改后，在更新发布之前，这些修改将不会对当前正在使用的流程版本产生任何影响。

+ 在平铺模式下，流程卡片上会提示“有未发布变更”
+ 在列表模式下，更新状态则会显示为“未更新”

只有完成所有修改，并进行更新发布后，新的流程版本才会正式生效，并替代之前的版本。

:::

:::info 注意

在发布流程时，必须确保在触发节点与结束节点之间至少存在一个有效节点，并且所有节点均已完成配置。若不满足这些条件，流程将无法发布。

:::

#### 二、操作方法
点击「发布/更新发布」按钮，即可将当前流程设计发布。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/Process%20Design/fb.png)

## （二）工具栏
### 1.功能介绍
工具栏中集成了流程设计所需的各类节点动作，可以将工具栏中的节点动作放至流程的指定位置。

### 2.操作方法
可以通过拖拽工具栏中的节点动作，或者点击流程中节点之间的“+”号，将节点放置到指定的位置。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/Process%20Design/gjl.png)

## （三）流程设计区
### 1.编辑节点
#### 一、功能介绍
节点添加到流程后，可修改其名称、编辑说明以及删除不需要的节点，以便更好地进行流程设计。

:::danger 警告

节点删除后无法恢复，请谨慎操作！

:::

#### 二、操作方法
+ 点击「节点名称」，可在输入框中修改名称

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/Process%20Design/sj1.png)

+ 点击「节点说明」图标，在弹窗中输入节点说明后点击「确定」即可成功编辑节点说明

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/Process%20Design/sj2.png)

+ 点击「删除」图标后，在弹窗中点击「确定」，即可删除节点

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/Process%20Design/sj3.png)

### 2.剪切/复制节点

#### 一、功能介绍

支持对节点执行复制、剪切与粘贴操作，以实现移动和重新排列节点

:::info 注意：

+ 支持框选单个或多个节点。
+ 触发与结束节点不支持复制 / 剪切操作。
+ 若在分支节点下（条件分支 / 并行分支 / 审批分支）框选单条分支，仅会复制 / 剪切其中的流程节点（条件将被去除）。
+ 若在分支节点下（条件分支 / 并行分支 / 审批分支）框选多条分支，需同时框选条件，否则本次复制 / 剪切操作不生效。
+ 若复制 / 剪切某一节点后，导致后续其他节点无法正确获取所需节点，系统将清空后续节点的配置。
+ 若复制 / 剪切某一节点后，无法维持节点内的配置数据，系统将清空该节点的配置。

:::

#### 二、操作方法

+ 单个节点：点击节点右上方的「更多」，可选择复制 / 剪切当前节点。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Microflow%20Designer/Microfluidic%20Design/1751425826861-faf16238-efb4-4bc7-9079-1e21f76e78b8.png)

+ 多个节点：点击「框选」图标进入可框选状态，框选需要复制 / 剪切的节点后，执行复制或剪切操作。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Microflow%20Designer/Microfluidic%20Design/1751426228932-035fa0af-5605-4886-89f1-e0278f5a31d8.png)

+ 粘贴：在目标位置点击「添加节点」图标，即可将刚复制 / 剪切的节点粘贴至此。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Microflow%20Designer/Microfluidic%20Design/1751426307571-43bf3a69-0afb-4d9a-9ef0-b81af87e714b.png)


## （四）属性面板
### 1.功能介绍
在属性面板中，可以为节点动作配置各种属性。

### 2.操作方法
点击节点主体位置，在右侧弹窗中根据业务需求配置属性后，点击「保存」。

:::info 注意

需将属性中必填信息填写完成，否则无法保存。

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/Process%20Design/sxmb.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/Process%20Design/sxmb2.png)

# 二、流程配置

### 1.功能介绍

+ 应用：在创建流程时已选择所属应用，若发现应用选择错误或需变更所属应用，可在此处进行编辑操作。

:::info 注意

在“工作流”-“流程运行记录”中查看流程实例时：

+ 若在应用变更之前已经生成了流程实例，那么这些实例将继续保存在变更前的应用中。
+ 而应用变更之后新生成的实例，则将保存在变更后的应用中。

:::

+ 异常回滚类型：指节点出现异常时的处理方式，具体包括以下两种：
  - 节点异常终止：当节点发生异常时，该流程将直接终止运行。
  - 节点异常回滚：当节点发生异常时，系统会将该节点的状态回滚至未执行状态，以便重新处理。

:::info 注意：

该异常处理机制仅对人工节点生效。

:::

+ 是否展示流程图：用于设置流程运行过程中是否显示流程图，开启后可在任务待办中查看流程图。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/Process%20Design/1756365549787-6f2230a8-0c63-4657-86a4-b362f21b643e.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/Process%20Design/1756363428877-dab35d56-2f8e-4975-8455-24f2f53ee32b.png)

+ 允许反悔：支持反悔待办结果。开启后，所有的人工节点均可执行反悔操作。可设置**限制时长**，即最后一个人工节点可反悔的时间范围，超过该时长则禁止反悔。

:::warning 提示

1. **基本规则**
   - 反悔需二次确认：操作时弹框提示“您确定要反悔当前审批/填写结果吗？”，确认后执行。
   - 反悔后撤销当前节点结果，流程回退至上一节点，相关后续待办撤销。
2. **节点处理状态规则**
   - **当前待办**：恢复待办状态
   - **后续人工节点未处理**：允许反悔，撤销待办。
   - **后续人工节点已查看未处理**：允许反悔，并提示后续人员“您的待办任务已撤回，无法进行操作”。
   - **后续人工节点已处理**：禁止反悔。
3. **加签规则**
   - **审批前加签**：若审批人已有结果，加签人不可反悔。
   - **审批后加签**：若加签人已有结果，审批人不可反悔。
4. **最后人工节点规则**
   - 最后一个人工节点可反悔，但必须在配置的 **限制时长** 内操作。
   - 超过限制时长，禁止反悔。

:::

### 2.操作方法

+ 在流程配置下，选择应用后，点击「保存」，即可成功修改应用。
+ 在流程配置下，可下拉选异常回滚类型，包括节点异常终止与节点异常回滚
+ 在流程配置下，可选择是否要在待办中展示流程图

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/Process%20Design/1756363266788-1f170faa-8c52-476c-96cb-fdad55c20708.png)

+ 反悔：
  - 在流程配置下，勾选“允许反悔”开关，若开启，需设置 **限制时长**（单位：分钟/小时/天）。
  - 进入「我已办结」，打开已完成的待办详情。
  - 若节点支持反悔，操作区显示 **“反悔”按钮**。点击后系统弹出提示框：“您确定要反悔当前审批/填写结果吗？”
    * 点击 **取消**：不执行操作，流程保持不变。
    * 点击 **确定**：执行反悔，撤销本节点结果及后续待办。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/Process%20Design/1756363585888-5043f555-b277-495d-9893-e9b0f9019e7a.png)

