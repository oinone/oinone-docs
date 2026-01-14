---
title: 工作台
index: true
category:
  - 用户手册
order: 1
prev:
  text: 标准模块
  link: /zh-cn/UserManual/StandardModules/README.md
---
工作台是用户进行任务操作与管理的核心界面。其设计采用了直观且易用的界面布局，使用户能够迅速处理各项任务并轻松管理应用。Oinone的工作台展示了待办、发起任务、抄送任务、已办结任务以及站内信的数量，同时还提供了收藏应用的快捷入口。

:::warning 提示

对于拥有工作台权限的用户，登录后默认页面即为工作台，同时，也可以通过APP Finder或用户下拉菜单进入工作台。

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/workbenches/1.png)

# 一、任务处理
## （一）查看任务
### 1.功能介绍
在工作台中展示的各类任务可查看其包括的所有任务，对其进行审批、填写、催办等操作。每条流程下方有处理该条流程的动作，可查看处理详情页面。

### 2.操作方法
+ 在筛选区选择或输入条件可对任务进行筛选

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/workbenches/ckrw1.png)

+ 点击任务下方动作，可进入流程处理页面查看任务详情
    - 审批任务下方动作为“审批”
    - 填写任务下方动作为“填写”
    - 其他任务下方动作为“查看”

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/workbenches/ckrw2.png)

## （二）处理任务
### 1.功能介绍
当进入审批任务详情或填写任务详情时，可对任务流程进行操作。所有任务包含“返回、分享”动作，“分享”动作可将当前任务分享给其他员工

+ 审批操作页可能包含“同意、拒绝、退回、加签、转交”动作，具体动作由流程设计时在流程设计器中设定（详细动作设定可参考流程设计器-节点动作文档）。
+ 填写操作页包含“提交、暂存”动作

:::info 注意

在“我发起的”任务列表中，当任务当前状态显示为“进行中”时，用户有权对该任务进行催办操作或选择撤销该任务。

:::

:::warning 提示

右上角消息中会气泡实时展示未处理或未读的操作，点击展开后可对任务进行快捷处理。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/workbenches/clrw.png)

:::

### 2.操作方法
在不同操作页中点击某一动作，在弹窗中依据实际情况填写后确认即可完成操作

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/workbenches/clrw2.png)

# 二、应用快捷入口
### 1.功能介绍
应用中心中星标的收藏应用会展示在工作台，可快捷进入应用。

### 2.操作方法
+ 点击应用中心已安装的应用上的星标即可收藏
+ 点击工作台中收藏的应用即可进入该应用

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/workbenches/kjrk.png)

# 三、附件：名词解释
| 名词 | 描述 |
| :---: | --- |
| 待办 | 指当前登录用户尚未处理的流程节点。 |
| 我发起的 | 指由当前登录用户主动触发的流程（基于模型触发）。 |
| 抄送 | 指抄送给当前登录用户的流程，包括需审批或填写的流程。 |
| 我已办结 | 指由当前登录用户完成的人工/自动同意、人工拒绝或人工填写的流程节点。 |
| 无需办理 | 指当前登录用户转交的任务，或被退回、被撤销、被或签、被其他分支任务拒绝且尚未办理的任务。 |
| 站内信 | 指当前登录用户收到的站内消息。 |


