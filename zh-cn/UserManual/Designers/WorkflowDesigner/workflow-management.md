---
title: 流程管理
index: true
category:
  - 用户手册
  - 设计器
order: 1
prev:
  text: 流程设计器(Process Designer)
  link: /zh-cn/UserManual/Designers/WorkflowDesigner/README.md
---
流程设计器支持对流程进行新增、编辑、删除等一系列便捷操作，使用不同的展示模式，可以满足用户不同的视图偏好和管理需求，实现用户灵活多样的流程管理需求。

:::warning 提示

流程成功生效后，将根据设定的触发条件自动执行。如需查看流程的执行情况，可进入“工作流”-“流程运行记录”页面，该页面将详细展示流程的运行状态。若流程出现异常，可在此页面查看异常信息，并根据异常信息对流程进行完善和优化。

此外，若流程中包含审批或填写节点，可前往“工作流”-“工作流”页面，查看审批或填写的具体执行状态，以便及时了解流程进展并处理相关事务。

:::

# 一、筛选
### 1.功能介绍
根据实际业务需求，可以定制流程筛选条件，包括所属应用、流程名称、触发方式、启用状态、更新状态。在当前的筛选条件下，将展示相应的流程列表，方便对不同的流程进行设计和编辑操作。

:::warning 提示

对于常用的筛选项组合，可以将其收藏进筛选方案，之后可直接在筛选方案中一键选择对流程进行筛选。

:::

### 2.操作方法
+ 筛选：在筛选区选择或输入条件后点击「搜索」，即可对流程进行筛选。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/process%20management/sx1.png)

+ 一键清除：点击「清除」图标，可一键清除当前筛选区中所有条件

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/process%20management/sx2.png)

+ 管理筛选方案：鼠标移动至「筛选方案」图标，即可管理筛选方案
    - 添加：在筛选区中选择或输入筛选条件后，点击「收藏当前条件」，在弹窗中输入方案名称，即可将当前筛选条件组合添加到筛选方案中
    - 查找：在输入框中输入方案名称
    - 修改：点击「筛选方案管理」后在弹窗中选择某项方案，点击方案名称，即可修改方案名称
    - 删除：在方案列表中选择某项方案，点击「删除」图标，即可删除该筛选方案

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/process%20management/sx3.png)

# 二、展示模式
### 1.功能介绍
流程设计器提供两种展示流程的模式，分别为平铺模式与列表模式。默认为平铺模式。

+ 平铺模式：以卡片形式直观呈现流程信息，包括流程名称、流程简要示意图以及发布与启用状态。
+ 列表模式：则以表格形式详细列出流程信息，涵盖流程名称、流程说明、触发方式等关键要素。

### 2.操作方法
+ 点击「列表模式」图标，即可将当前页面切换为列表模式。
+ 点击「平铺模式」图标，即可将当前页面切换为平铺模式。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/process%20management/zs.png)

# 三、创建流程
### 1.功能介绍
利用流程设计器可创建流程，创建完成的流程在被触发后将自动执行。

### 2.操作方法
点击「创建流程」，选择所属应用后点击「创建」，跳转至设计流程页面，点击暂存或发布即可成功创建

:::info 注意

若未点击暂存或发布按钮，则此次创建的流程将不会被保存。

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/process%20management/cj1.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/process%20management/cj2.png)

# 四、设计流程
### 1.功能介绍
在设计流程时，可以运用各种节点动作对流程进行布局，满足在不同实际业务下的流程需求。

### 2.操作方法
+ 在平铺模式下，点击「设计流程」图标，即可进入设计流程界面。
+ 在列表模式下，点击「编辑」，即可进入设计流程界面。（详情见流程设计文档）

:::warning 提示

当流程中存在多个人工节点（审批 / 填写节点），且节点所绑定的视图发生变更时，点击属性面板右上角的「刷新」按钮，即可批量同步获取最新数据权限。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/process%20management/1754031932389-0f0d7bb8-46ed-4fb1-bf27-b6da6e760d50.png)

:::

![平铺模式](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/process%20management/sj1.png)

![列表模式](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/process%20management/sj2.png)

# 五、停用/启用流程
### 1.功能介绍
当流程需要更新或暂时不用时，可以停用流程。停用流程后将不再执行流程，正在执行的流程不受停用影响，会正常执行直到流程结束。

当需要执行流程时，可以启用流程。启用流程后，可依据触发方式自动执行。此外，也可在页面设计器中使用工作流动作组件中选择已启用的流程，手动触发流程。

:::info 注意

+ 初次发布的流程自动启用。
+ 当流程中存在节点未配置完整时不允许启用。

:::

### 2.操作方法
+ 在平铺模式下，点击「停用/启用」图标，即可改变流程状态。
+ 在列表模式下，点击「停用/启用」，即可改变流程状态。

![平铺模式](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/process%20management/ty1.png)

![列表模式](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/process%20management/ty2.png)

:::warning 提示

在列表模式下，流程停用后，删除操作将会显现。如需启用已停用的流程，请在“更多”选项中查找启用按钮。

:::

# 六、复制流程
### 1.功能介绍
当遇到流程中节点动作相似度较高的情况时，可使用复制功能，将生成一个“原流程名-复制”的流程，并自动进入新流程的流程设计界面。同创建流程相同，需点击暂存或发布按钮方可成功生成复制流程。

### 2.操作方法
+ 在平铺模式下，点击「复制」图标，跳转至设计流程页面，点击暂存或发布即可成功复制。
+ 在列表模式下，点击「复制」，跳转至设计流程页面，点击暂存或发布即可成功复制。

![平铺模式](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/process%20management/fz1.png)

![列表模式](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/process%20management/fz2.png)

# 七、删除流程
### 1.功能介绍
当流程不再使用时，可以选择将其删除。若不确定流程是否需要删除，可以先将其停用。

:::info 注意

+ 若该流程未停用，处于启用状态，则该流程无法被删除。
+ 在删除前，若该流程已执行过且生成了实例，则该流程无法被删除。

:::

:::danger 警告

流程删除后无法恢复，请谨慎操作！

:::

### 2.操作方法
在平铺模式下，点击「删除」图标，即可删除流程

在列表模式下，点击「删除」，即可删除流程

:::info 注意

列表模式下，需先停用流程后方显示「删除」。

:::

![平铺模式](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/process%20management/sc1.png)

![列表模式](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/process%20management/sc2.png)

