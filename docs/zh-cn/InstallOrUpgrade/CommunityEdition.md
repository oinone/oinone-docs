---
title: 社区版
index: true
category:
  - 安装与升级
order: 1

next:
  text: 企业版
  link: /zh-cn/InstallOrUpgrade/EnterpriseEdition.md
---
本节将介绍如何使用 `Docker Compose` 快速部署 `Oinone` 设计器，并完成浏览器的访问。

# 一、快速开始（Quick Start）

## （一）下载 docker-compose.yml

```shell
# 从 Github 下载 docker-compose.yml
curl -L https://raw.githubusercontent.com/oinone/oinone-docker-shared/refs/heads/master/oinone/docker-compose.yml -o docker-compose.yml

# 从 Gitee 下载 docker-compose.yml
curl -L https://gitee.com/oinone/oinone-docker-shared/raw/master/oinone/docker-compose.yml -o docker-compose.yml
```

## （二）启动 Oinone 设计器

```shell
# MacOS/Linux
docker compose up -d

# Windows
docker compose -p oinone up -d
```

PS：首次启动时间较长，请耐心等待，此时可以打开新的终端查看后端启动日志。

## （三）查看后端服务启动日志

```shell
docker logs -f oinone-backend
```

## （四）访问 Oinone 设计器

在 **浏览器** 中打开：http://127.0.0.1:88

输入用户名/密码：admin/admin

## （六）停止 Oinone 设计器

```shell
# MacOS/Linux
docker compose down -v

# Windows
docker compose -p oinone down -v
```

# 二、开始学习 Oinone

在启动 Oinone 服务并成功访问后，我们可以通过以下路径继续学习 Oinone 的使用或开发：

+ 学习如何使用 Oinone 产品：[点击查看用户手册](/zh-cn/UserManual/README.md)
+ 学习如何使用 Oinone 进行业务工程开发：[点击查看研发手册](/zh-cn/DevManual/README.md)
+ 学习如何配置 Oinone 服务（高级）：[点击查看配置指南](/zh-cn/InstallOrUpgrade/setup-oinone-designer.md)

# 附录

## （一）特别说明

从 **2026年3月** 开始，**v7.2** 以上版本的 Oinone 镜像已推送至公网环境，不再提供私有镜像源拉取镜像。在此之前使用旧版镜像的合作伙伴可继续使用，且拉取镜像的方式保持不变。

## （二）Oinone 设计器架构

### 内置服务

在 `docker-compose.yml` 中包含了 `Oinone` 启动所必须的全部中间件及前后端服务：

+ frontend：v7.2:latest （若文档未及时更新，可通过配置自行调整）
+ backend：v7.2:latest（若文档未及时更新，可通过配置自行调整）
+ zookeeper：3.5.8
+ redis：5.0.7
+ mysql：8.0.30
+ rocketmq：4.9.6

### 网络拓扑图示

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/CommunityEdition/36eb4a4b8f9c2f6cec092ea0f9740bf0-20260306172634426.svg)

### 挂载卷拓扑图示

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/CommunityEdition/86dd88a3a7f043fd542387e9833c8c2f.svg)

