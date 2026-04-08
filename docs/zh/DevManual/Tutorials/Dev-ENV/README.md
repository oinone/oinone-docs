---
title: 环境准备
index: true
category:
  - 安装与升级
  - 环境准备
dir:
  link: true
  order: 1
prev:
  text: 教程
  link: /zh/DevManual/Tutorials/README.md
next:
  text: Git安装与注意事项
  link: /zh/DevManual/Tutorials/Dev-ENV/Git-setup.md
---
# 一、运行环境

<div style="display: flex; gap: 20px; margin: 20px 0;">

  <div style="flex: 1; background: #f8f9fa; border-radius: 8px; padding: 16px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Preparing-the-development-environment/jdk.png)

**JDK**<span style="background-color:#f8d7da; color:#721c24; padding:2px 6px; border-radius:4px;">必须</span>
**版本**<span style="background-color:#d4edda; color:#155724; padding:2px 6px; border-radius:4px;">1.8 221+</span>

Java基础运行环境。用于编译、启动设计器与业务应用。

[安装与注意事项](/zh/DevManual/Tutorials/Dev-ENV/JDK-setup.md)
  </div>

  <div style="flex: 1; background: #f8f9fa; border-radius: 8px; padding: 16px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Preparing-the-development-environment/mysql.png)

**MySQL**<span style="background-color:#f8d7da; color:#721c24; padding:2px 6px; border-radius:4px;">必须</span>
**版本**<span style="background-color:#d4edda; color:#155724; padding:2px 6px; border-radius:4px;">8.0.26+</span>

用于存储模型相关元数据与业务数据。

[安装与注意事项](/v6/zh/InstallOrUpgrade/Dev-ENV/MySQL-setup.md)
  </div>

  <div style="flex: 1; background: #f8f9fa; border-radius: 8px; padding: 16px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Preparing-the-development-environment/rocketMQ.png)

**RocketMQ**<span style="background-color:#f8d7da; color:#721c24; padding:2px 6px; border-radius:4px;">必须</span>
**版本**<span style="background-color:#d4edda; color:#155724; padding:2px 6px; border-radius:4px;">4.7.1+</span>

Apache出品的一款具有高吞吐、低延迟的分布式消息队列中间件。用于异步解耦，事件驱动等场景。

[安装与注意事项](/v6/zh/InstallOrUpgrade/Dev-ENV/RocketMQ-setup.md)
  </div>
</div>

<div style="display: flex; gap: 20px; margin: 20px 0;">

  <div style="flex: 1; background: #f8f9fa; border-radius: 8px; padding: 16px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Preparing-the-development-environment/redis.png?x-oss-process=image/resize,h_196)

**Redis**<span style="background-color:#f8d7da; color:#721c24; padding:2px 6px; border-radius:4px;">必须</span>
**版本**<span style="background-color:#d4edda; color:#155724; padding:2px 6px; border-radius:4px;">5.0.2</span>

高性能内存数据库，用于缓存热点元数据、业务数据，还可用于分布式锁。

[安装与注意事项](/v6/zh/InstallOrUpgrade/Dev-ENV/Redis-setup.md)
  </div>

  <div style="flex: 1; background: #f8f9fa; border-radius: 8px; padding: 16px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Preparing-the-development-environment/zookeeper.png?x-oss-process=image/resize,h_196)

**Zookeeper**<span style="background-color:#f8d7da; color:#721c24; padding:2px 6px; border-radius:4px;">必须</span>
**版本**<span style="background-color:#d4edda; color:#155724; padding:2px 6px; border-radius:4px;">3.5.8+ </span>

分布式协调服务。用于注册分发远程服务、分布式锁、事件监听等场景。

[安装与注意事项](/v6/zh/InstallOrUpgrade/Dev-ENV/Zookeeper-setup.md)
  </div>

</div>



# 二、研发环境
如果基于数式Oinone以代码形式开发系统，在运行环境基础上，额外安装研发涉及环境

## （一）后端基础环境

<div style="display: flex; gap: 20px; margin: 20px 0;">

  <div style="flex: 1; background: #f8f9fa; border-radius: 8px; padding: 16px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">

  ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Preparing-the-development-environment/idea.png)

**IDEA**<span style="background-color:#f8d7da; color:#721c24; padding:2px 6px; border-radius:4px;">必须</span>
**版本**<span style="background-color:#d4edda; color:#155724; padding:2px 6px; border-radius:4px;">推荐2020.3+</span>

Java集成开发环境, 可选用Ultimate或者Community版本。

:::info 注意

1.禁用Lombok插件

2.安装oinone插件

:::

[安装与注意事项](/zh/DevManual/Tutorials/setup-guide.md#三、后端额外工具)
  </div>

  <div style="flex: 1; background: #f8f9fa; border-radius: 8px; padding: 16px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">

  ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Preparing-the-development-environment/git.png)

**Git**<span style="background-color:#f8d7da; color:#721c24; padding:2px 6px; border-radius:4px;">必须</span>
**版本**<span style="background-color:#d4edda; color:#155724; padding:2px 6px; border-radius:4px;">推荐2020.3+</span>

源码版本管理工具

[安装与注意事项](/zh/DevManual/Tutorials/Dev-ENV/Git-setup.md)

  </div>

  <div style="flex: 1; background: #f8f9fa; border-radius: 8px; padding: 16px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">

  ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Preparing-the-development-environment/maven.png)

**Maven**<span style="background-color:#f8d7da; color:#721c24; padding:2px 6px; border-radius:4px;">必须</span>
**版本**<span style="background-color:#d4edda; color:#155724; padding:2px 6px; border-radius:4px;">推荐3.6+</span>

工程、构建、依赖管理工具

[安装与注意事项](/zh/DevManual/Tutorials/Dev-ENV/Maven-setup.md)

  </div>

</div>

<div style="display: flex; gap: 20px; margin: 20px 0;">

  <div style="flex: 1; background: #f8f9fa; border-radius: 8px; padding: 16px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">

  ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Preparing-the-development-environment/mysql.png?x-oss-process=image/resize,h_196)

**DB GUI工具**<span style="background-color:#e2e3e5; color:#383d41; padding:2px 6px; border-radius:4px;">可选</span>

Datagrip、MySQL Workbench、DBeaver或者其他支持发起SQL查询的工具。

  </div>

  <div style="flex: 1; background: #f8f9fa; border-radius: 8px; padding: 16px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">

  ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Preparing-the-development-environment/graphQL.png?x-oss-process=image/resize,h_196)

**GraphQL测试工具**<span style="background-color:#e2e3e5; color:#383d41; padding:2px 6px; border-radius:4px;">可选</span>

Insomnia、Postman或者其他支持发起GQL请求的工具。

  </div>

</div>



## （二）前端基础环境

<div style="display: flex; gap: 20px; margin: 20px 0;">

  <div style="flex: 1; background: #f8f9fa; border-radius: 8px; padding: 16px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">

  ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Preparing-the-development-environment/node.png)

**Node.js**<span style="background-color:#f8d7da; color:#721c24; padding:2px 6px; border-radius:4px;">必须</span>
**版本**<span style="background-color:#d4edda; color:#155724; padding:2px 6px; border-radius:4px;">12.12.0+</span>

一个基于 Chrome V8 引擎的高性能 JavaScript 运行时，支持非阻塞 I/O，广泛用于构建高并发的后端服务和微服务架构。

[安装与注意事项](/zh/DevManual/Tutorials/Dev-ENV/Node.js-setup.md)

  </div>

  <div style="flex: 1; background: #f8f9fa; border-radius: 8px; padding: 16px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">

  ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Preparing-the-development-environment/vue-cli.png)

**vue-cli**<span style="background-color:#f8d7da; color:#721c24; padding:2px 6px; border-radius:4px;">必须</span>

vue脚手架工具

Vue.js 官方提供的脚手架工具，支持项目快速初始化、配置管理和插件扩展，简化 Vue 项目的开发与构建流程

[安装与注意事项](/zh/DevManual/Tutorials/Dev-ENV/Node.js-setup.md#三、进阶)

  </div>

  <div style="flex: 1; background: #f8f9fa; border-radius: 8px; padding: 16px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">

  ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Preparing-the-development-environment/nvm.png)

**nvm**<span style="background-color:#e2e3e5; color:#383d41; padding:2px 6px; border-radius:4px;">可选</span>

方便Node.js版本管理

Node.js 版本管理工具，支持在同一设备上安装、切换和管理多个 Node.js 版本。

[安装与注意事项](/zh/DevManual/Tutorials/Dev-ENV/Node.js-setup.md#三、进阶)

  </div>

</div>

:::info 注意

企业版mvn的settings，请找数式Oinone小助手

:::

:::info 注意

企业版npm的源配置，请找数式Oinone小助手

:::



##




