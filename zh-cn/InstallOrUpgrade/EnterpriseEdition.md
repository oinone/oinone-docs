---
title: 企业版
index: true
category:
  - 安装与升级
order: 2
prev:
  text: 社区版
  link: /zh-cn/InstallOrUpgrade/CommunityEdition.md
next:
  text: 从社区版转向企业版
  link: /zh-cn/InstallOrUpgrade/from-community-to-enterprise.md
---
本节将介绍如何使用 `Docker Compose` 快速部署 `Oinone` 设计器（企业版），并完成浏览器的访问。

# 一、准备工作

+ 获取企业版许可证<font style="color:#DF2A3F;">（必须）</font>

# 二、快速开始（Quick Start）

## （一）下载 docker-compose.yml

```shell
# 从 Github 下载 docker-compose.yml
curl -L https://raw.githubusercontent.com/oinone/oinone-docker-shared/refs/heads/master/oinone/docker-compose.yml -o docker-compose.yml

# 从 Gitee 下载 docker-compose.yml
curl -L https://gitee.com/oinone/oinone-docker-shared/raw/master/oinone/docker-compose.yml -o docker-compose.yml
```

## （二）修改 docker-compose.yml 挂载许可证

```yaml
services:
  backend:
    container_name: oinone-backend
    volumes:
      - ./pks:/opt/pamirs/pks
```

## （三）修改 .env 文件配置许可证信息

```shell
# 输入你的主体名称
LIC_SUBJECT=<subject>
# 输入你的许可证文件名
LIC_FILE=pks/<license.lic>
```

:::warning 提示：

更多关于 `.env` 文件的信息，可参考：[Oinone 设计器配置指南](/zh-cn/InstallOrUpgrade/setup-oinone-designer.md)

:::

## （四）启动 Oinone 设计器

```shell
# MacOS/Linux
docker compose up -d

# Windows
docker compose -p oinone up -d
```

PS：首次启动时间较长，请耐心等待，此时可以打开新的终端查看后端启动日志。

## （五）查看后端服务启动日志

```shell
docker logs -f oinone-backend
```

## （六）访问 Oinone 设计器

在 **浏览器** 中打开：http://127.0.0.1:88

输入用户名/密码：admin/admin

## （六）停止 Oinone 设计器

```shell
# MacOS/Linux
docker compose down -v

# Windows
docker compose -p oinone down -v
```

