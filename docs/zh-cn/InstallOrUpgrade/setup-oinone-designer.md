---
title: Oinone 设计器配置指南
index: true
category:
  - 安装与升级
order: 4
prev:
  text: 从社区版转向企业版
  link: /zh-cn/InstallOrUpgrade/from-community-to-enterprise.md
next:
  text: 版本清单
  link: /zh-cn/InstallOrUpgrade/version-list.md
---
本节介绍了在使用 `Docker Compose` 启动的 `Oinone` 设计器时使用的一些常用配置及配置参数说明。

下文中提供的配置示例均使用 `192.168.1.100` 作为 `宿主机 IP` 进行配置，镜像内部无法访问 `localhost/127.0.0.1` 环回地址，因此需要明确指定 `宿主机 IP` 进行服务间调用，对 `docker networks` 熟悉的用户，可以使用 `网络别称（networks alias）` 进行服务间调用。

# 一、概述

Oinone 设计器使用 `Docker Compose` 进行启动，在大多数场景中，我们可以通过创建与 `docker-compose.yml` 同级目录下的 `.env` 文件进行 Oinone 设计器配置。

在使用 `docker compose` 命令时，将自动加载 `.env` 文件的变量，并替换 `docker-compose.yml` 中内置的变量。

目录结构如下所示：

```shell
.
├── .env
└── docker-compose.yml
```

:::warning 提示：

更多关于 `docker compose` 环境变量的内容可参考：[官方文档](https://docs.docker.com/compose/how-tos/environment-variables/variable-interpolation/)

:::

现在，我们已经知道了配置 Oinone 设计器的基本原理，下面，我们提供了一些常用场景的配置以及文章末尾提供了详细的 `.env` 文件参数说明。

# 二、指定 Oinone 镜像版本

在 `.env` 文件中，通过指定 `OINONE_FRONTEND_VERSION` 和 `OINONE_BACKEND_VERSION` 变量固定镜像版本。

```shell
HOST_IP=输入IP地址
OINONE_FRONTEND_VERSION=v7.2:7.2.0
OINONE_BACKEND_VERSION=v7.2:7.2.0
```

如镜像拉取过慢，可在确定操作系统架构的情况下获取`amd64`或`arm64`架构镜像。

```shell
HOST_IP=输入IP地址
OINONE_FRONTEND_VERSION=v7.2:7.2.0-amd64
OINONE_BACKEND_VERSION=v7.2:7.2.0-amd64
```

## 确定系统架构

可通过以下命令确认系统架构：

```shell
# MacOS/Linux
uname -m

# Windows CMD
echo %PROCESSOR_ARCHITECTURE%

# Windows Powershell
wmic cpu get architecture
```

+ x86_64：表示 `AMD64` 架构。
+ aarch64/arm64：表示 `ARM64` 架构。

:::info 镜像支持

Oinone 所有镜像均使用 docker manifest 支持 amd64 和 arm64 架构，如有其他架构需要支持，请联系我们。

:::

# 三、后端服务配置指南

## （一）修改 application.yml 配置

### 1.将内置 application.yml 作为默认配置进行修改（推荐）

```yaml
services:
  backend:
    container_name: oinone-backend
    environment:
      # 非常重要，用于激活你的配置文件
      ARG_ENV: dev
    volumes:
      # 将 config 目录挂载到外部配置文件目录
      - ./config:/opt/pamirs/config/ext
```

**config/application-dev.yml**

```yaml
spring.config.activate.on-profile: dev
# 加入你的其他配置
```

### 2.替换内置 application.yml（不建议）

```yaml
services:
  backend:
    container_name: oinone-backend
    volumes:
      - ./config/application.yml:/opt/pamirs/config/application.yml
```

## （二）OSS 配置

详情可点击查看：[OSS 配置参考](https://guide.oinone.top/zh-cn/DevManual/Reference/Back-EndFramework/module-API.html#%E5%8D%81%E5%9B%9B-%E6%96%87%E4%BB%B6%E5%AD%98%E5%82%A8%E9%85%8D%E7%BD%AE-pamirs-file)

```yaml
spring:
  config:
    activate:
      on-profile: custom
cdn:
  oss:
    name: # 名称
    type: # 类型
    bucket:
    uploadUrl: # 上传 URL
    downloadUrl: # 下载 URL
    accessKeyId:
    accessKeySecret:
    mainDir: # 主目录
    validTime: 3600000
    timeout: 600000
    active: true
    referer:
    localFolderUrl:
```

## （三）数据源及方言配置（PostgreSQL）

PS：此特性仅适用于部分商业许可，配置前请关注许可信息。

详情可点击查看：[数据库方言配置参考](https://guide.oinone.top/zh-cn/DevManual/Reference/Back-EndFramework/module-API.html#%E5%9B%9B-%E6%95%B0%E6%8D%AE%E5%BA%93%E6%96%B9%E8%A8%80-pamirs-dialect-ds)

```yaml
spring:
  config:
    activate:
      on-profile: custom
pamirs:
  datasource:
    base:
      driverClassName: org.postgresql.Driver
      url: jdbc:postgresql://127.0.0.1:5432/oinone?currentSchema=base
      username: xxxxxx
      password: xxxxxx
    pamirs:
      driverClassName: org.postgresql.Driver
      url: jdbc:postgresql://127.0.0.1:5432/oinone?currentSchema=pamirs
      username: xxxxxx
      password: xxxxxx
  dialect:
    ds:
      base:
        type: PostgreSQL
        version: 14
        major-version: 14.3
      pamirs:
        type: PostgreSQL
        version: 14
        major-version: 14.3
```

# 四、前端服务配置指南

## （一）修改 manifest.js 文件

### 1.创建 manifest.js

创建 manifest.js 文件，并配置如下内容：

```javascript
runtimeConfigResolve({
  plugins: {
    usingRemote: true
  }
});
```

PS：你需要增加或修改的配置应该基于下面给出的内置 `manifest.js` 文件内容进行变更，否则可能导致 `plugins.usingRemote` 配置丢失。

### 2.替换内置 manifest.js

```yaml
services:
  frontend:
    container_name: oinone-frontend
    volumes:
      - ./manifest.js:/opt/pamirs/dist/config/manifest.js
```

修改完配置后，通过 `docker compose up -d` 更新服务即可。

## （二）新增 nginx 配置自定义路由

下面，我们以 `90` 端口为例，创建一个简易的前后端访问，随后你可以基于这样的配置文件任意修改和扩展。

###  1.创建路由配置

创建 `services/90.conf` 文件，并配置如下内容：

```nginx
server {
    listen       90;
    listen  [::]:90;
    server_name  localhost;

    access_log  /var/log/nginx/90.access.log  main;

    root /opt/pamirs/dist;

    location / {
        try_files $uri $uri/ /index.html;
        index  index.html index.htm;
        if ($request_filename ~* ^.*?.(html|htm|js)$) {
            add_header Cache-Control "private, no-store, no-cache, must-revalidate, proxy-revalidate";
        }
    }

    location /pamirs {
        proxy_pass          http://192.168.1.100:8091;
        proxy_set_header    Host    $host;
        proxy_set_header    X-Real-IP   $remote_addr;
        proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    
    location /openapi {
        proxy_pass          http://192.168.1.100:8093;
        proxy_set_header    Host    $host;
        proxy_set_header    X-Real-IP   $remote_addr;
        proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /pamirs/chat/sse/connect {
        proxy_pass          http://192.168.1.100:8091;

        proxy_set_header Connection "";
        proxy_read_timeout 30m;
        proxy_send_timeout 30m;
        proxy_buffering off;
        proxy_request_buffering off;
        proxy_cache off;
        chunked_transfer_encoding on;
        proxy_set_header X-Accel-Buffering no; 
    }

    location /static {
        alias /opt/pamirs/static;

        add_header Content-Disposition attachment;
        add_header Content-Type application/octet-stream;
    }
}
```

### 2.添加路由配置到前端服务

```yaml
services:
  frontend:
    container_name: oinone-frontend
    ports:
      - 90:90
    volumes:
      - ./services:/opt/pamirs/nginx/vhost/services
```

修改完配置后，通过 `docker compose up -d` 更新服务即可。

:::warning 提示：

此处不要直接挂载到 `/opt/pamirs/nginx/vhost` 目录下，否则可能导致内置功能异常或无法启动镜像的情况。

:::

# 附录：.env 文件参数说明

PS：在 `.env` 文件参数支持的情况下，不要通过修改 `docker-compose.yml` 进行配置，否则可能导致启动失败、无法升级或更新等问题。

## （一）frontend/backend 配置

```yaml
# frontend version
OINONE_FRONTEND_VERSION=v7.2

# backend version
OINONE_BACKEND_VERSION=v7.2

# frontend service
## oinone designer service expose port in the browser
OINONE_PORT=88
OINONE_BACKEND_SERVER=http://designer-backend:8091
OINONE_OPENAPI_SERVER=http://designer-backend:8093

## oinone biz service expose port in the browser
OINONE_BIZ_PORT=89
OINONE_BIZ_BACKEND_SERVER=
OINONE_BIZ_OPENAPI_SERVER=

# backend service
OINONE_BACKEND_SERVER_PORT=8091
OINONE_OPENAPI_SERVER_PORT=8093
OINONE_DUBBO_PORT=20879
OINONE_DEBUG_PORT=15555

# license
LIC_SUBJECT=pamirs-platform
LIC_FILE=pks/license.lic

# openapi
OPENAPI_AES_KEY=wQl/UWcBMP/2xh8mmDgi0ZsA7E0v2TEiM2UGrjtXfBI=

# volumes
DOCKER_VOLUME_DIRECTORY=./volumes
```

## （二）zookeeper 配置

### 1.zookeeper 服务配置

```shell
# zookeeper expose port
OINONE_ZOOKEEPER_PORT=2182
```

### 2.backend 连接 zookeeper 配置

```shell
# dubbo
DUBBO_REGISTRY_ADDRESS=zookeeper://zookeeper:2181

# zookeeper
ZOOKEEPER_CONNECT_STRING=zookeeper:2181
ZOOKEEPER_ROOT_PATH=/oinone
```

### 3.backend 连接外部 zookeeper 服务配置示例

PS：当你使用已经部署好的 `zookeeper` 服务时，可通过 `.env` 文件配置连接地址。

```shell
# dubbo
DUBBO_REGISTRY_ADDRESS=zookeeper://192.168.1.100:2182

# zookeeper
ZOOKEEPER_CONNECT_STRING=192.168.1.100:2182
ZOOKEEPER_ROOT_PATH=/oinone
```

### 4.使用 Oinone 应用连接 zookeeper 服务配置示例

PS：当你使用源码启动时，可以直接使用此 `zookeeper` 服务。（此处仅展示需要修改的配置项）

```yaml
dubbo:
  registry:
    # 端口号同 OINONE_ZOOKEEPER_PORT 配置
    address: zookeeper://192.168.1.100:2182
pamirs:
  zookeeper:
    # 端口号同 OINONE_ZOOKEEPER_PORT 配置
    zkConnectString: 192.168.1.100:2182
    rootPath: /oinone
```

## （三）redis 配置

### 1.redis 服务配置

```shell
# redis requirepass
REDIS_PASSWORD=Abc@1234

# redis expose port
OINONE_REDIS_PORT=6378
```

### 2.backend 连接 redis 配置

```shell
# redis
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=Abc@1234
REDIS_DATABASE=0
```

### 3.backend 连接外部 redis 服务配置示例

PS：当你使用已经部署好的 `redis` 服务时，可通过 `.env` 文件配置连接地址。

```shell
# redis
REDIS_HOST=192.168.1.100
REDIS_PORT=6379
REDIS_PASSWORD=Abc@1234
REDIS_DATABASE=0
```

### 4.使用 Oinone 应用连接 redis 服务配置示例

PS：当你使用源码启动时，可以直接使用此 `redis` 服务。（此处仅展示需要修改的配置项）

```yaml
spring:
  data:
    redis:
      host: 192.168.1.100
      # 同 OINONE_REDIS_PORT 配置
      port: 6378
      # 同 REDIS_DATABASE 配置
      database: 0
```

## （四）mysql 配置

### 1.mysql 服务配置

```shell
# mysql initialize password (Effective only on the first initialization)
OINONE_MYSQL_PASSWORD=Abc@1234

# mysql expose port
OINONE_MYSQL_PORT=3307
```

### 2.backend 连接 mysql 配置

```shell
# mysql url address
OINONE_MYSQL_ADDRESS=mysql:3306
# mysql username
OINONE_MYSQL_USERNAME=root
# mysql password
OINONE_MYSQL_PASSWORD=Abc@1234
# oinone base database
OINONE_DB_BASE=oinone_base
# oinone pamirs database
OINONE_DB_PAMIRS=oinone_pamirs
```

### 3.backend 连接外部 mysql 服务配置示例

PS：当你使用已经部署好的 `mysql` 服务时，可通过 `.env` 文件配置连接地址。

```shell
# mysql url address
OINONE_MYSQL_ADDRESS=192.168.1.100:3307
# mysql username
OINONE_MYSQL_USERNAME=root
# mysql password
OINONE_MYSQL_PASSWORD=Abc@1234
# oinone base database
OINONE_DB_BASE=oinone_base
# oinone pamirs database
OINONE_DB_PAMIRS=oinone_pamirs
```

### 4.使用 Oinone 应用连接 mysql 服务配置示例

PS：当你使用源码启动时，可以直接使用此 `mysql` 服务。（此处仅展示需要修改的配置项）

```yaml
pamirs:
  datasource:
    base:
      # 同 OINONE_MYSQL_PORT 和 OINONE_DB_BASE 配置
      url: jdbc:mysql://192.168.1.100:3307/oinone_base
      # 内置 root 用户
      username: root
      # 同 OINONE_MYSQL_PASSWORD 配置
      password: Abc@1234
    pamirs:
      # 同 OINONE_MYSQL_PORT 和 OINONE_DB_PAMIRS 配置
      url: jdbc:mysql://192.168.1.100:3307/oinone_pamirs
      # 内置 root 用户
      username: root
      # 同 OINONE_MYSQL_PASSWORD 配置
      password: Abc@1234
```

## （五）rocketmq 配置

### 1.rocketmq 服务配置

```yaml
# mqnamesrv expose port
OINONE_MQ_NAMESRV_PORT=19876

# mqbroker expose port 10989 - 10991
OINONE_MQ_LISTEN_PORT=10991
OINONE_MQ_FAST_LISTEN_PORT=10989
OINONE_MQ_HA_LISTEN_PORT=10990
```

### 2.backend 连接 rocketmq 配置

```shell
# mqnamesrv address
MQ_NAME_SERVER=rmqnamesrv:9876
```

### 3.backend 连接外部 rocketmq 服务配置示例

PS：当你使用已经部署好的 `rocketmq` 服务时，可通过 `.env` 文件配置连接地址。

```shell
# mqnamesrv address
MQ_NAME_SERVER=192.168.1.100:19876
```

### 4.使用 Oinone 应用连接 rocketmq 服务配置示例

PS：当你使用源码启动时，可以直接使用此 `rocketmq` 服务。（此处仅展示需要修改的配置项）

```yaml
spring:
  rocketmq:
    # 同 OINONE_MQ_NAMESRV_PORT 配置
    name-server: 192.168.1.100:19876
```

