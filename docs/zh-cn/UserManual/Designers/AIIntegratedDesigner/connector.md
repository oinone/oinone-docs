---
title: 连接器
index: true
category:
  - 用户手册
  - 设计器
order: 1
prev:
  text: AI集成设计器（AI Integrated Designer）
  link: /zh-cn/UserManual/Designers/MicroflowDesigner/README.md
---
AI集成设计器的连接器，通过可视化界面，构建平台应用与外部大模型的数据通道。企业用户可基于自身业务场景，自由组合不同能力的大模型组件，快速完成定制化 AI 应用产品包的设计与部署。

# 一、筛选
### 1.功能介绍
系统支持按需设置连接器筛选条件，用户可灵活设置参数。筛选完成后，系统将生成对应列表，直观呈现连接器信息，高效实现连接器管理。

### 2.操作方法
+ 筛选：在筛选区输入条件后点击「搜索」，即可对连接器进行筛选。
+ 一键清除：点击「清除」图标，可一键清除当前筛选区中条件

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/AI%20Integrated%20Designer/connector/sx.png)

# 二、创建与设计
### 1，功能介绍
支持新增连接器，可依据需求自定义连接器信息。当填写完信息后，可在设计界面拖入不同的AI配置，定制化设计不同的连接器

### 2.操作方法
+ 点击「创建连接器」，在弹出的页面中依据需求填写信息后保存，即可创建成功

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/AI%20Integrated%20Designer/connector/cjysj1.png)

+ 连接器创建完成后将自动跳转至设计界面。在此界面，可灵活配置连接器的输入输出类型，自由选择适配的大模型，并能根据实际业务需求，实时调整大模型的各类配置参数，实现个性化的连接设置。

:::info 注意

+ 完成配置后，可通过系统验证功能测试连接器的连通性，确保数据传输正常
+ 连接器发布成功后，可查看其 API 信息。

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/AI%20Integrated%20Designer/connector/cjysj2.png)

# 三、查看
### 1.功能介绍
已设计的连接器，支持快速查看 AI 配置连接顺序与详细配置信息；已发布的连接器，除上述内容外，还可获取其 API 信息，便于数据对接。

### 2.操作方法
+ 点击「查看」图标，即可跳转至对应页面查看

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/AI%20Integrated%20Designer/connector/ck.png)

# 四、编辑
### 1.功能介绍
对于已创建的连接器，可以对其进行编辑修改，包括调整连接器信息或变更模型设置等操作。

### 2.操作方法
点击「编辑」，即可在跳转的设计页面中进行编辑

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/AI%20Integrated%20Designer/connector/bj.png)

# 五、隐藏/可见
### 1.功能介绍
对于当前暂不使用的连接器，可以执行隐藏操作。隐藏后的连接器不可以被使用，但是不影响已经被使用的数据。若日后需要，只需将隐藏的连接器设置为可见状态即可重新投入使用。

### 2.操作方法
点击「隐藏」，连接器设置为隐藏状态；再次点击，连接器恢复为可见状态。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/AI%20Integrated%20Designer/connector/yc.png)

# 六、查看API
### 1.功能介绍
对于已发布的连接器，可以查看其API信息

### 2.操作方法
在管理页面或设计页面，点击「查看API」按钮均可查看该连接器的API信息

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/AI%20Integrated%20Designer/connector/API1.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/AI%20Integrated%20Designer/connector/API2.png)

