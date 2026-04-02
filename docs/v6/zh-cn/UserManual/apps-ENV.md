---
title: 应用环境
index: true
category:
  - 用户手册
order: 4
---
在应用环境中，可灵活配置部署环境，支持查看应用导入/导出和部署的日志。如果在导入/导出应用或部署环境的过程中出现问题，日志可以提供详细的错误信息，帮助用户快速定位问题原因，进行故障排查和修复，更好地管理应用的生命周期，确保应用的顺利运行和高效维护。

# 一、部署环境配置
### 1.功能介绍
在部署环境配置中，可方便的管理各种环境，包括创建新环境、编辑现有环境、删除环境等功能。这些配置好的部署环境，可以在应用中心进行同步部署时使用。

:::info 注意

+ 同步部署功能实现不同环境设计数据一键同步的目标，即将A环境设计完成的模型、界面、等设计数据一键部署至B环境。
+ 在进行多个环境同步部署设计数据时，必须正确配置发起环境、目标环境。

:::

### 2.操作方法
+ 创建：点击「创建」，填写环境信息后确定，即可成功创建

:::info 注意

+ 若启用，则可在应用中心中同步部署中选择该部署环境；若不启用则无法选择
+ 若开启为当前部署环境，则此部署环境即为当前平台使用的部署环境

:::

+ 编辑：点击「编辑」，可修改部署环境信息
+ 详情：点击「详情」，可查看部署环境的详细信息
+ 删除：选定需删除的部署环境后点击「删除」，即可成功删除，支持批量删除

:::danger 警告

环境删除后无法恢复，请谨慎操作！

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E7%8E%AF%E5%A2%83/%E9%83%A8%E7%BD%B2%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE.png)

:::tip 举例

配置部署环境

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E7%8E%AF%E5%A2%83/%E9%85%8D%E7%BD%AE%E9%83%A8%E7%BD%B2%E7%8E%AF%E5%A2%83%E4%B8%BE%E4%BE%8B1.png)

关于获取配置环境中的API Key与API Secret，可以前往「集成接口-开放管理-应用」页面，在搜索框中输入“元数据”进行搜索。搜索结果中会列出相关数据，查看数据的密钥部分，即可获取所需的API Key与API Secret。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E7%8E%AF%E5%A2%83/%E9%85%8D%E7%BD%AE%E9%83%A8%E7%BD%B2%E7%8E%AF%E5%A2%83%E4%B8%BE%E4%BE%8B2.png)
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E7%8E%AF%E5%A2%83/%E9%85%8D%E7%BD%AE%E9%83%A8%E7%BD%B2%E7%8E%AF%E5%A2%83%E4%B8%BE%E4%BE%8B3.png)
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E7%8E%AF%E5%A2%83/%E9%85%8D%E7%BD%AE%E9%83%A8%E7%BD%B2%E7%8E%AF%E5%A2%83%E4%B8%BE%E4%BE%8B4.png)

:::

# 二、设计导入/导出
### 1.功能介绍
展示应用中心中设计导入/导出日志。通过日志，可以实时追踪应用的导入/导出进度，确保应用导入/导出能够顺利进行。如果导入/导出过程中出现问题，日志可以提供详细的错误信息，可以快速定位问题原因，进行故障排查。

### 2.操作方法
点击「详情」，可查看导入/导出详细信息

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E7%8E%AF%E5%A2%83/%E8%AE%BE%E8%AE%A1%E5%AF%BC%E5%85%A5%E5%AF%BC%E5%87%BA.png)

# 三、部署任务
### 1.功能介绍
展示应用中心中同步部署日志。可以通过查看日志，实时监控部署状态，确保部署过程的顺利进行。如果部署过程中出现问题，日志可以提供详细的错误信息，可以快速定位问题原因，进行故障排查和修复。

### 2.操作方法
点击「详情」，可查看部署任务详细信息

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E7%8E%AF%E5%A2%83/%E9%83%A8%E7%BD%B2%E4%BB%BB%E5%8A%A1.png)

