---
title: AI配置
index: true
category:
  - 用户手册
  - 设计器
order: 2
---
平台基于图像生成、文本生成、语言处理、视频生成四个常见分类，整合当前市场主流 AI 大模型的接入方案。用户仅需通过标准化、轻量化的操作流程，即可实现对应大模型的快速对接。接入完成后，支持在连接器中进行参数配置，以满足多元化、场景化的使用需求。

# 一、筛选
### 1.功能介绍
系统支持按需设置AI配置的筛选条件，用户可灵活设置参数。筛选完成后，系统将生成对应列表，直观呈现AI配置信息，高效实现AI配置管理。

### 2.操作方法
+ 筛选：在筛选区输入条件后点击「搜索」，即可对AI配置进行筛选。
+ 一键清除：点击「清除」图标，可一键清除当前筛选区中条件

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/AI%20Integrated%20Designer/AI%20configuration/sx.png)

# 二、创建
### 1.功能介绍
系统提供 AI 配置创建功能，支持用户根据业务场景与使用需求，定义名称、大模型URL、API Key等多维配置信息。所创建的 AI 配置可在连接器中被使用，实现与各类 AI 大模型的适配与调用，为用户构建个性化 AI 应用场景提供标准化、模块化的配置支持。

:::info 注意

AI配置发布前，需对API Key进行验证，仅在验证通过后，方可完成AI配置的正式发布流程。

:::

### 2.操作方法
+ 点击「创建AI配置」，在弹出的页面中依据需求填写信息后发布，即可创建成功
+ 在设计连接器时，可在AI配置列表“点击添加”，跳转至相应页面进行创建

:::info 注意

若AI配置存在API Key验证未通过、信息填写不完整等情况，支持先行保存操作。用户可在完善相关信息、确保内容合规完整后再进行发布。

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/AI%20Integrated%20Designer/AI%20configuration/cj.png)

# 三、查看
### 1.功能介绍
对于已存在的AI配置，支持快速查看 AI 配置连接顺序与详细配置信息。

### 2.操作方法
+ 点击「查看」图标，即可跳转至对应页面查看

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/AI%20Integrated%20Designer/AI%20configuration/ck.png)

# 四、编辑
### 1.功能介绍
对于已创建的AI配置，可以对其进行编辑修改，包括调整大模型信息或变更API Key等操作。

### 2.操作方法
点击「编辑」，即可在跳转的设计页面中进行编辑

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/AI%20Integrated%20Designer/AI%20configuration/bj.png)

# 五、废弃
### 1.功能介绍
对于不再使用的AI配置，可以选择将其废除，即删除该AI配置。

:::info 注意

对于已被应用的AI配置，不允许被废弃。

:::

:::danger 警告

AI配置被删除后无法恢复，请谨慎操作！

:::

### 2.操作方法
点击「废弃」图标，即可直接删除该AI配置。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/AI%20Integrated%20Designer/AI%20configuration/fq.png)

# 六、隐藏/可见
### 1.功能介绍
对于当前暂不使用的AI配置，可以执行隐藏操作。隐藏后的AI配置不可以被使用，但是不影响已经被使用的数据。若日后需要，只需将隐藏的AI配置设置为可见状态即可重新投入使用

### 2.操作方法
点击「隐藏」，AI配置设置为隐藏状态；再次点击，AI配置恢复为可见状态。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/AI%20Integrated%20Designer/AI%20configuration/yc.png)

