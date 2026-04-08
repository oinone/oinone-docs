---
title: 接口日志
index: true
category:
  - 用户手册
  - 设计器
order: 8
next:
  text: 微流设计器(Microflow Designer)
  link: /zh/UserManual/Designers/MicroflowDesigner/README.md
---
接口日志用于记录接口调用情况。在连接集成资源并使用接口时，可以在接口日志中查看该接口是否成功被调用，并根据接口的执行情况做出相应的调整和优化。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/Interface%20log/1.png)

# 一、筛选
### 1.功能介绍
根据实际业务需求，可以定制接口记录的筛选条件。在当前的筛选条件下，将展示相应的接口记录列表，方便查看不同的接口记录。

### 2.操作方法
+ 筛选：在筛选区输入条件后点击「搜索」，即可对接口记录进行筛选。
+ 一键清除：点击「清除」图标，可一键清除当前筛选区中条件

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/Interface%20log/sx.png)

# 二、查看详情
### 1.功能介绍
支持查看接口的执行详情，可以全面了解接口的整体运行状况与参数信息  
**展示内容**

+ **基础信息**：展示API名称、技术名称、API 类型、 API URL等基础配置。
+ **执行信息**：展示接口的执行相关信息，如响应结果、调用时间、执行时长等。
+ **参数信息**：展示接口的请求头数据与原始请求数据等参数信息，支持按结构化方式查看。

**参数展示与复制**

+ 参数信息支持 **JSON / XML** 两种格式展示，可根据需要自由切换参数展示格式
+ 支持一键复制当前格式下的参数内容，便于接口调试与对接

### 2.操作方法
点击「详情」，即可在弹出的页面中查看接口执行情况

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/Interface%20log/xq.png)

在参数信息中可切换数据的展示格式  
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/Process%20log/1767862005070-ccf4353f-fa1b-47e6-b08e-b0f2c24f117e.png)

在参数信息中可复制所选参数类型的数据  
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/Process%20log/1767862113195-43cf3fdd-551c-43f7-aa23-28002e693481.png)