---
title: 工作台
index: true
category:
  - 用户手册
  - 设计器
order: 1
prev:
  text: 集成设计器(Integrated Designer)
  link: /zh-cn/UserManual/Designers/IntegratedDesigner/README.md
---
工作台用于呈现集成相关的统计数据：

+ 连接器总数：展示当前集成资源的连接器总数量
+ 数据流程总数：呈现已定义的数据连接流程总数
+ 任务总执行数：统计流程实例的总执行数量
+ 总异常任务数：显示执行过程中出现异常的任务总数
+ 开放接口数：汇总展示所有状态的开放接口数量

此外，提供快速连接渠道，能够迅速筛选出所需连接的资源，并为其设计数据流程，高效实现系统集成与数据交互。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/workbenches/1.png)

# 一、快速连接
### 1.功能介绍
通过选定需连接的集成资源，并进入数据流程设计页，完成设计流程后，即可实现资源的集成

:::warning 提示

当选定某一资源时，可在下方「为您推荐」中快速选择与之相应的数据流程，快速完成资源连接

:::

:::warning 提示

此处的资源涵盖了连接器中所包含的各种应用与数据库。若在当前范围内未找到所需资源，可前往连接器进行自定义设置以满足需求。（详见连接器文档）

:::

### 2.操作方法
在资源框中选定所需项，点击「开始连接」按钮进行连接

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/workbenches/2.png)

# 二、附件：名词解释
| 名词 | 描述 |
| :---: | --- |
| 集成 | <div style="width:600px;">系统与系统之间的集成</div> |
| 集成资源 | 在实际业务场景中需要将多个系统打通，针对单一的一方，称之为集成资源 |
| 连接器 | 具体集成资源，包括应用与数据库 |
| 数据流程 | 通过流程编排的手段，使集成过程可视化，提升集成作业效率 |
| 开放 | 当前平台开放一定能力供外部使用 |


