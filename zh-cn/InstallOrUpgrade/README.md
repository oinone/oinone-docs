---
title: 安装与升级
index: false
category:
  - 安装与升级
dir:
  link: false
  order: 1
next:
  text: 社区版
  link: /zh-cn/InstallOrUpgrade/CommunityEdition.md
---
本节将介绍如何使用 `Docker Compose` 快速部署 `Oinone` 设计器，并完成浏览器的访问。

# 一、快速开始（Quick Start）

## （一）下载 docker-compose.yml

```shell
# 从 Github 下载 docker-compose.yml
curl -L https://pamirs.oss-cn-hangzhou.aliyuncs.com/oinone/installer/docker-compose.yml -o docker-compose.yml

# 从 Gitee 下载 docker-compose.yml
curl -L https://pamirs.oss-cn-hangzhou.aliyuncs.com/oinone/installer/docker-compose.yml -o docker-compose.yml
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

:::warning
******提示：**

<font style="color:rgba(0, 0, 0, 0.85);">此处修改的是 </font>`<font style="color:rgba(0, 0, 0, 0.85);">application.yml</font>`<font style="color:rgba(0, 0, 0, 0.85);"> 而不是 </font>`<font style="color:rgba(0, 0, 0, 0.85);">application-dev.yml</font>`<font style="color:rgba(0, 0, 0, 0.85);"> 配置。</font>

:::

## （四）访问 Oinone 设计器

在 **浏览器** 中打开：[http://127.0.0.1:88](about:blank)

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

+ 学习如何使用 Oinone 产品：[点击查看用户手册](https://gounixiangxiang.yuque.com/hxngv0/szrwpi/fvgmm6dgpx5mca4f)
+ 学习如何使用 Oinone 进行业务工程开发：[点击查看研发手册](https://gounixiangxiang.yuque.com/hxngv0/szrwpi/su7mogs0gtpdsgq8)
+ 学习如何配置 Oinone 服务（高级）：[点击查看配置指南](https://gounixiangxiang.yuque.com/hxngv0/szrwpi/otqnh190khv1y3rs)

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

<!-- 这是一个文本绘图，源码为：@startuml
!theme vibrant
title Docker Compose Network Diagram (oinone-designer)

cloud "oinone-designer (bridge network)" {
  node "frontend" as frontend
  note bottom of frontend
    **Ports (Host:Container):**
    - OINONE_PORT (88) **:** 80
  end note

  node "backend" as backend
  note bottom of backend
    **Ports (Host:Container):**
    - OINONE_BACKEND_SERVER_PORT (8091) **:** 8091 (Spring)
    - OINONE_OPENAPI_SERVER_PORT (8093) **:** 8093 (OpenAPI)
    - OINONE_DUBBO_PORT (20879) **:** 20880 (Dubbo)
    - OINONE_DEBUG_PORT (15555) **:** 15555 (Debug)
  end note

  node "zookeeper" as zookeeper
  note bottom of zookeeper
    **Ports (Host:Container):**
    - OINONE_ZOOKEEPER_PORT (2182) **:** 2181
  end note

  node "redis" as redis
  note bottom of redis
    **Ports (Host:Container):**
    - OINONE_REDIS_PORT (6378) **:** 6379
  end note

  node "mysql" as mysql
  note bottom of mysql
    **Ports (Host:Container):**
    - OINONE_MYSQL_PORT (3307) **:** 3306
  end note

  node "rmqnamesrv" as rmqnamesrv
  note bottom of rmqnamesrv
    **Ports (Host:Container):**
    - OINONE_MQ_NAMESRV_PORT (19876) **:** 9876
  end note

  node "rmqbroker" as rmqbroker
  note bottom of rmqbroker
    **Ports (Host:Container):**
    - OINONE_MQ_LISTEN_PORT (10991)
    - OINONE_MQ_FAST_LISTEN_PORT (10989)
    - OINONE_MQ_HA_LISTEN_PORT (10990)
  end note
}

' --- Connections with Address and Port Details ---
frontend ..> backend : "Connects to\n- OINONE_BACKEND_SERVER (http://designer-backend:8091)\n- OINONE_OPENAPI_SERVER (http://designer-backend:8093)"
backend ..> zookeeper : "DUBBO_REGISTRY_ADDRESS\nzookeeper://zookeeper:2181"
backend ..> redis : "REDIS_HOST/PORT\n${REDIS_HOST:-redis}:${REDIS_PORT:-6379}"
backend ..> mysql : "DB_URL\njdbc:mysql://${OINONE_MYSQL_ADDRESS:-mysql:3306}/..."
backend ..> rmqnamesrv : "MQ_NAME_SERVER\nrmqnamesrv:9876"
rmqbroker ..> rmqnamesrv : "NAMESRV_ADDR\nrmqnamesrv:9876"

@enduml -->
![](https://cdn.nlark.com/yuque/__puml/36eb4a4b8f9c2f6cec092ea0f9740bf0.svg)

### 挂载卷拓扑图示

<!-- 这是一个文本绘图，源码为：@startuml
!theme vibrant
left to right direction

title Services and Volumes Relationships

package "Services" {
  component [frontend]
  component [backend]
  component [zookeeper]
  component [redis]
  component [mysql]
  component [rmqnamesrv]
  component [rmqbroker]
}

package "Volumes" {
  database "oss" as vol_oss
  database "backend/logs" as vol_backend_logs
  database "zookeeper/zoo/data" as vol_zk_data
  database "zookeeper/zoo/datalog" as vol_zk_datalog
  database "redis/log" as vol_redis_log
  database "redis/data" as vol_redis_data
  database "mysql/data" as vol_mysql_data
  database "rocketmq/data/logs" as vol_rmq_logs
  database "rocketmq/data/store" as vol_rmq_store
}

' --- Relationships ---

frontend --> vol_oss : uses
backend --> vol_oss : uses
backend --> vol_backend_logs : writes logs to

zookeeper --> vol_zk_data : stores data in
zookeeper --> vol_zk_datalog : stores logs in

redis --> vol_redis_log : writes logs to
redis --> vol_redis_data : stores data in

mysql --> vol_mysql_data : stores data in

rmqnamesrv --> vol_rmq_logs : writes logs to
rmqbroker --> vol_rmq_logs : writes logs to
rmqbroker --> vol_rmq_store : stores messages in

@enduml -->
![](https://cdn.nlark.com/yuque/__puml/86dd88a3a7f043fd542387e9833c8c2f.svg)

