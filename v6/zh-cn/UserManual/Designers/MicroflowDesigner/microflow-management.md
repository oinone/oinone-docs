---
title: 微流管理
index: true
category:
  - 用户手册
  - 设计器
order: 1
prev:
  text: 微流设计器(Microflow Designer)
  link: /zh-cn/UserManual/Designers/MicroflowDesigner/README.md
---
微流设计器支持对流程进行新增、编辑、删除等一系列便捷操作，以满足多种管理需求。

:::warning 提示

微流成功启用后，将根据设定的触发条件自动执行。如需查看微流的执行情况，可进入“工作流”-“微流运行记录”页面，该页面将详细展示微流的运行状态。若微流出现异常，可在此页面查看异常信息，并根据异常信息对微流进行完善和优化。

:::

# 一、筛选
### 1.功能介绍
根据实际业务需求，可以定制微流筛选条件，包括所属应用、微流名称、触发方式、启用状态、更新状态。在当前的筛选条件下，将展示相应的微流列表，方便对不同的微流进行设计操作。

:::warning 提示

对于常用的筛选项组合，可以将其收藏进筛选方案，之后可直接在筛选方案中一键选择对流程进行筛选。

:::

### 2.操作方法
+ 筛选：在筛选区选择或输入条件后点击「搜索」，即可对微流进行筛选。
+ 一键清除：点击「清除」图标，可一键清除当前筛选区中所有条件

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Microflow%20Designer/Microflow%20Management/sx1.png)

+ 管理筛选方案：鼠标移动至「筛选方案」图标，即可管理筛选方案
    - 添加：在筛选区中选择或输入筛选条件后，点击「收藏当前条件」，在弹窗中输入方案名称，即可将当前筛选条件组合添加到筛选方案中
    - 查找：在输入框中输入方案名称
    - 修改：点击「筛选方案管理」后在弹窗中选择某项方案，点击方案名称，即可修改方案名称
    - 删除：在方案列表中选择某项方案，点击「删除」图标，即可删除该筛选方案

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Microflow%20Designer/Microflow%20Management/sx2.png)

# 二、创建微流
### 1.功能介绍
支持创建微流，创建完成的微流在被触发后将自动执行。

### 2.操作方法
点击「创建微流」，选择所属应用后点击「创建」，跳转至设计微流页面，点击暂存或发布即可成功创建

:::info 注意

若未点击暂存或发布按钮，则此次创建的流程将不会被保存。

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Microflow%20Designer/Microflow%20Management/cj.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Microflow%20Designer/Microflow%20Management/cj2.png)

# 三、设计微流
### 1.功能介绍
在设计微流时，可以运用各种节点动作对流程进行布局，满足在不同实际业务下的流程需求。

### 2.操作方法
点击「编辑」，即可进入设计微流界面。（详情见微流设计文档）

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Microflow%20Designer/Microflow%20Management/sj.png)

# 四、停用/启用微流
### 1.功能介绍
当微流需要更新或暂时不用时，可以停用微流。停用微流后将不再执行微流，正在执行的微流不受停用影响，会正常执行直到微流结束。

当需要执行微流时，可以启用微流。启用微流后，可依据触发方式自动执行。此外，也可在页面设计器中使用微流动作组件中选择已启用的微流，手动触发微流。

:::info 注意

+ 初次发布的微流自动启用。
+ 当微流中存在节点未配置完整时不允许启用。

:::

### 2.操作方法
点击「停用/启用」，即可改变微流状态。

:::warning 提示

微流停用后，删除操作将会显现。如需启用已停用的微流，请在“更多”选项中查找启用按钮。

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Microflow%20Designer/Microflow%20Management/ty.png)

# 五、发布微流
### 1.功能介绍
仅针对已创建但未发布过的微流，可在微流管理页面将其发布

### 2.操作方法
点击「发布流程」，即可将当前微流成功发布

:::info 注意

当微流中存在节点配置不完整的情况时，无法成功发布。

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Microflow%20Designer/Microflow%20Management/fb.png)

# 六、复制微流
### 1.功能介绍
当遇到微流中节点动作相似度较高的情况时，可使用复制功能，将生成一个“原流程名-复制”的流程，并自动进入新微流的微流设计界面。同创建微流相同，需点击暂存或发布按钮方可成功生成复制微流。

### 2.操作方法
点击「复制」，跳转至设计微流页面，点击暂存或发布即可成功复制。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Microflow%20Designer/Microflow%20Management/fz.png)

# 七、删除微流
### 1.功能介绍
当微流不再使用时，可以选择将其删除。若不确定微流是否需要删除，可以先将其停用。

:::info 注意

+ 若该微流未停用，处于启用状态，则该微流无法被删除。
+ 在删除前，若该微流已执行过且生成了实例，则该微流无法被删除。

:::

:::danger 警告

微流删除后无法恢复，请谨慎操作！

:::

### 2.操作方法
点击「删除」，即可删除流程

:::info 注意

对于发布过的微流，需先停用微流后方显示「删除」。

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Microflow%20Designer/Microflow%20Management/sc.png)

