---
title: 运行时：导出任务处于处理中状态
index: true
category:
- 常见问题（faq）
order: 16
---
# 一、场景复现
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/1747645017593-f6f4aa80-42c4-49dc-b1cf-63808021591b.jpeg)

# 二、解决方案：
由于导出任务以异步方式执行，若在 `schedule.json` 文件中的 `taskItems` 配置项设为 `0`，那么在任务执行阶段，仅有一台机器会负责执行该任务。在此情况下，倘若 `zk`（Zookeeper）的 `rootPath` 与其他环境保持一致，此任务便存在被分配至其他环境执行的可能性。

当多个不同项目共同使用同一个 Zookeeper 实例时，各项目所采用的 Zookeeper 根目录不应存在父子关系。即便对于同一项目的不同实例（诸如分别部署的测试环境、开发环境以及准生产环境实例）而言，同样需要使用相互之间不具备父子关系的不同根目录。基于此，在启动工程的 `yml` 文件中，以下两个配置务必与其他环境或设计器的相应配置有所区别。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/FAQ/1747645034191-eebf5d3b-be5d-4f16-9037-77ea860290ac.png)