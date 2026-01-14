---
title: 项目部署：Oinone设计器部署参数说明
index: true
category:
  - 常见解决方案
order: 78
---

# 一、概述
Oinone 提供两种设计器部署方式，合作伙伴可以自行选择适合自己的部署方式。

# 二、Docker配置参数
## （一）环境变量
+ ARG_ENV：指定 spring.profiles.active（默认：dev）
+ ARG_LIFECYCLE：指定 -Plifecycle（默认：INSTALL）
+ JVM_OPTIONS：jvm 参数
+ PROGRAM_ARGS：程序参数

`JVM_OPTIONS`和`PROGRAM_ARGS`参数说明

```shell
java [JVM_OPTIONS?] -jar boot.jar [PROGRAM_ARGS?]
```

## （二）端口说明
:::info 注意：

以下为目前设计器镜像的全部端口，不同类型镜像的端口由于内置服务不同，使用的端口数量不同，但端口号是完全一致的。

:::

+ **80 端口**：此为前端服务端口，作为设计器的访问入口，承担着前端应用与用户交互界面的数据传输及访问引导功能。
+ **8091 端口**：设定为后端服务端口，负责处理后端业务逻辑，响应前端请求并进行数据处理与业务流程控制。
+ **8093 端口**：作为后端 EIP 服务端口，主要服务于后端企业集成平台相关功能，保障不同系统间的集成与交互。
+ **20880 端口**：指定为 Dubbo 端口，Dubbo 作为分布式服务框架，通过此端口实现服务的注册、发现与调用等核心功能。
+ **3306 端口**：系内置 MySQL 数据库端口，用于实现 MySQL 数据库管理系统与外部应用程序之间的通信，执行数据存储、检索等操作。
+ **2181 端口**：为内置 Zookeeper 端口，Zookeeper 作为分布式协调服务，借助此端口完成分布式环境下的配置管理、命名服务及集群管理等功能。
+ **6379 端口**：作为内置 Redis 端口，Redis 作为高性能的键值对数据库，利用此端口实现数据的快速读写、缓存处理等功能。
+ **9876/10991 端口**：设定为内置 RocketMQ 端口，RocketMQ 作为分布式消息队列，通过这两个端口进行消息的发送、接收与存储，保障系统间异步通信及削峰填谷等功能。
+ **9999 端口**：此为内置本地 OSS 默认端口，本地对象存储服务（OSS）通过该端口提供对象存储功能，支持数据的存储与访问。

## （三）挂载目录说明（挂载虚拟卷）
在镜像环境中，`/opt/pamirs` 被指定为工作目录，所有的挂载目录均基于此目录构建。具体各目录的功能如下：

+ `/opt/pamirs/ext`：该目录用于存放应用配置文件，其中涵盖 `application.yml`、`logback.xml`、`license.lic` 等关键配置文件，这些文件对应用的运行参数、日志记录策略及授权许可等方面起着重要的配置作用。
+ `/opt/pamirs/nginx/vhost`：此目录专门用于存储 Nginx 配置文件，Nginx 作为高性能的 Web 服务器和反向代理服务器，其相关配置文件在此处进行集中管理与维护，以实现对网络请求的高效处理与转发。
+ `/opt/pamirs/logs`：作为后端服务日志目录，该路径用于收集和存储后端服务在运行过程中产生的各类日志信息，这些日志对于系统的故障排查、性能分析以及运行状态监控具有重要意义。
+ `/opt/mq/conf/broker.conf`：此为 RocketMQ 的 `broker` 配置文件所在路径。RocketMQ 作为分布式消息队列系统，`broker` 配置文件对其消息处理、存储及集群部署等核心功能的参数设定起到关键作用。
+ `/opt/pamirs/outlib`：该目录被定义为非设计器内置包的外部加载目录（即外部库），在此目录下，用户可以添加任何所需的 `jar` 包，这些 `jar` 包将被集成到设计器中，从而扩展设计器的功能与应用场景。
+ `/opt/pamirs/dist`：作为前端服务目录，负责承载前端服务相关的文件与资源，为前端应用的运行提供必要的支持与环境。
+ `/opt/pamirs/static`：此目录具有多重功能，既是前端静态文件目录，用于存放前端应用所依赖的各类静态资源文件；同时也是 `LOCAL` 类型的 OSS（对象存储服务）上传和下载目录，承担着本地对象存储服务中数据的传输与管理功能。

## （四）`docker run`启动常用参数
+ `-e`：指定环境变量
+ `-p`：指定端口映射
+ `-v`：指定挂载目录（挂载虚拟卷）

```shell
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
```

## （五）`docker compose`启动常用配置
```yaml
services:
  container:
    image: $IMAGE
    container_name: $CONTAINER_NAME
    restart: always
    # docker run -e
    environment:
      KEY1: VALUE1
      KEY2: VALUE2
      ...
    # docker run -p
    ports:
      - $machinePort1:$containerPort1
      - $machinePort2:$containerPort2
      ...
    # docker run -v
    volumes:
      - $machinePath1:$containerPath1
      - $machinePath2:$containerPath2
      ...
```

## （六）`docker compose`常用命令
```shell
# 使用docker-compose.yaml启动
docker compose up -d

# 使用docker-compose.yaml停止并删除容器
docker compose down -v

# 指定配置文件启动
docker compose -f config.yaml up -d

# 指定配置文件停止并删除容器
docker compose -f config.yaml down -v
```

# 二、JAR包方式启动
## （一）下载Oinone专属启动器
[oinone-boot-starter.zip](https://pamirs.oss-cn-hangzhou.aliyuncs.com/install/oinone-boot-starter.zip)

## （二）启动命令变化
```shell
# 原命令
java -jar boot.jar

# 变更后命令
boot-starter java -jar boot.jar
```

