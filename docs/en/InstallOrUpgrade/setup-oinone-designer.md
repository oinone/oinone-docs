---
title: Oinone Designer Configuration Guide
index: true
category:
  - Installation and Upgrade
order: 4
prev:
  text: Transition from Community Edition to Enterprise Edition
  link: /en/InstallOrUpgrade/from-community-to-enterprise.md
next:
  text: Version List
  link: /en/InstallOrUpgrade/version-list.md
---
This section introduces some common configurations and explanations of configuration parameters when using the `Oinone` designer started with `Docker Compose`.

In the following configurations, `192.168.1.100` is used as the `host IP`. The loopback address `localhost/127.0.0.1` cannot be accessed inside the image. Therefore, the `host IP` needs to be explicitly specified for service-to-service calls. Users familiar with `docker networks` can use `network aliases` for service-to-service calls.

# I. Overview

The Oinone designer is started using `Docker Compose`. In most scenarios, we can configure the Oinone designer by creating a `.env` file in the same directory as `docker-compose.yml`.

When using the `docker compose` command, the variables in the `.env` file will be automatically loaded and replace the built-in variables in `docker-compose.yml`.

The directory structure is as follows:

```shell
.
├── .env
└── docker-compose.yml
```

:::warning Note:

For more information about `docker compose` environment variables, please refer to: [Official Documentation](https://docs.docker.com/compose/how-tos/environment-variables/variable-interpolation/)

:::

Now that we know the basic principle of configuring the Oinone designer, below, we provide some configurations for common scenarios, and a detailed explanation of the `.env` file parameters is provided at the end of the article.

# II. Specify the Oinone Image Version

In the `.env` file, fix the image version by specifying the `OINONE_FRONTEND_VERSION` and `OINONE_BACKEND_VERSION` variables.

```shell
HOST_IP=Enter the IP address
OINONE_FRONTEND_VERSION=v7.2:7.2.0
OINONE_BACKEND_VERSION=v7.2:7.2.0
```

If the image pulling is too slow, you can obtain the `amd64` or `arm64` architecture image after determining the operating system architecture.

```shell
HOST_IP=Enter the IP address
OINONE_FRONTEND_VERSION=v7.2:7.2.0-amd64
OINONE_BACKEND_VERSION=v7.2:7.2.0-amd64
```

## Determine the System Architecture

You can confirm the system architecture through the following commands:

```shell
# MacOS/Linux
uname -m

# Windows CMD
echo %PROCESSOR_ARCHITECTURE%

# Windows Powershell
wmic cpu get architecture
```

+ x86_64: Indicates the `AMD64` architecture.
+ aarch64/arm64: Indicates the `ARM64` architecture.

:::info Image Support

All Oinone images support the amd64 and arm64 architectures using docker manifest. If you need support for other architectures, please contact us.

:::

# III. Backend Service Configuration Guide

## (I) Modify the application.yml Configuration

### 1.Modify the Built-in application.yml as the Default Configuration (Recommended)

```yaml
services:
  backend:
    container_name: oinone-backend
    environment:
      # Very important, used to activate your configuration file
      ARG_ENV: dev
    volumes:
      # Mount the config directory to the external configuration file directory
      - ./config:/opt/pamirs/config/ext
```

**config/application-dev.yml**

```yaml
spring.config.activate.on-profile: dev
# Add your other configurations
```

### 2.Replace the Built-in application.yml (Not Recommended)

```yaml
services:
  backend:
    container_name: oinone-backend
    volumes:
      - ./config/application.yml:/opt/pamirs/config/application.yml
```

## (II) OSS Configuration

For details, click to view: [OSS Configuration Reference](/en/DevManual/Reference/Back-EndFramework/module-API.html#e33ac4d3)

```yaml
spring:
  config:
    activate:
      on-profile: custom
cdn:
  oss:
    name: # Name
    type: # Type
    bucket:
    uploadUrl: # Upload URL
    downloadUrl: # Download URL
    accessKeyId:
    accessKeySecret:
    mainDir: # Main directory
    validTime: 3600000
    timeout: 600000
    active: true
    referer:
    localFolderUrl:
```

## (III) Data Source and Dialect Configuration (PostgreSQL)

PS: This feature is only applicable to some commercial licenses. Please pay attention to the license information before configuration.

For details, click to view: [Database Dialect Configuration Reference](/en/DevManual/Reference/Back-EndFramework/module-API.html#2d50fefe)

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

# IV. Frontend Service Configuration Guide

## (I) Modify the manifest.js File

### 1.Create manifest.js

Create a manifest.js file and configure the following content:

```javascript
runtimeConfigResolve({
  plugins: {
    usingRemote: true
  }
});
```

PS: The configuration you need to add or modify should be changed based on the content of the built-in `manifest.js` file given below. Otherwise, the `plugins.usingRemote` configuration may be lost.

### 2.Replace the Built-in manifest.js

```yaml
services:
  frontend:
    container_name: oinone-frontend
    volumes:
      - ./manifest.js:/opt/pamirs/dist/config/manifest.js
```

After modifying the configuration, update the service with `docker compose up -d`.

## (II) Add Custom Routes to the nginx Configuration

Below, we take port `90` as an example to create a simple front-end and back-end access. Then you can modify and expand it based on such a configuration file.

### 1.Create a Route Configuration

Create a `services/90.conf` file and configure the following content:

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

### 2.Add the Route Configuration to the Frontend Service

```yaml
services:
  frontend:
    container_name: oinone-frontend
    ports:
      - 90:90
    volumes:
      - ./services:/opt/pamirs/nginx/vhost/services
```

After modifying the configuration, update the service with `docker compose up -d`.

:::warning Note:

Do not directly mount to the `/opt/pamirs/nginx/vhost` directory here, otherwise, the built-in functions may malfunction or the image may fail to start.

:::

# Appendix: Explanation of .env File Parameters

PS: When the `.env` file parameters support configuration, do not configure by modifying `docker-compose.yml`, otherwise, problems such as startup failure, inability to upgrade or update may occur.

## (I) frontend/backend Configuration

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

## (II) zookeeper Configuration

### 1.zookeeper Service Configuration

```shell
# zookeeper expose port
OINONE_ZOOKEEPER_PORT=2182
```

### 2.backend Connection to zookeeper Configuration

```shell
# dubbo
DUBBO_REGISTRY_ADDRESS=zookeeper://zookeeper:2181

# zookeeper
ZOOKEEPER_CONNECT_STRING=zookeeper:2181
ZOOKEEPER_ROOT_PATH=/oinone
```

### 3.Example Configuration for backend to Connect to an External zookeeper Service

PS: When using an already deployed `zookeeper` service, you can configure the connection address through the `.env` file.

```shell
# dubbo
DUBBO_REGISTRY_ADDRESS=zookeeper://192.168.1.100:2182

# zookeeper
ZOOKEEPER_CONNECT_STRING=192.168.1.100:2182
ZOOKEEPER_ROOT_PATH=/oinone
```

### 4.Example Configuration for an Oinone Application to Connect to a zookeeper Service

PS: When starting with the source code, you can directly use this `zookeeper` service. (Only the configuration items that need to be modified are shown here)

```yaml
dubbo:
  registry:
    # The port number is the same as the OINONE_ZOOKEEPER_PORT configuration
    address: zookeeper://192.168.1.100:2182
pamirs:
  zookeeper:
    # The port number is the same as the OINONE_ZOOKEEPER_PORT configuration
    zkConnectString: 192.168.1.100:2182
    rootPath: /oinone
```

## (III) redis Configuration

### 1.edis Service Configuration

```shell
# redis requirepass
REDIS_PASSWORD=Abc@1234

# redis expose port
OINONE_REDIS_PORT=6378
```

### 2.backend Connection to redis Configuration

```shell
# redis
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=Abc@1234
REDIS_DATABASE=0
```

### 3.Example Configuration for backend to Connect to an External redis Service

PS: When using an already deployed `redis` service, you can configure the connection address through the `.env` file.

```shell
# redis
REDIS_HOST=192.168.1.100
REDIS_PORT=6379
REDIS_PASSWORD=Abc@1234
REDIS_DATABASE=0
```

### 4.Example Configuration for an Oinone Application to Connect to a redis Service

PS: When starting with the source code, you can directly use this `redis` service. (Only the configuration items that need to be modified are shown here)

```yaml
spring:
  data:
    redis:
      host: 192.168.1.100
      # The same as the OINONE_REDIS_PORT configuration
      port: 6378
      # The same as the REDIS_DATABASE configuration
      database: 0
```

## (IV) mysql Configuration

### 1.mysql Service Configuration

```shell
# mysql initialize password (Effective only on the first initialization)
OINONE_MYSQL_PASSWORD=Abc@1234

# mysql expose port
OINONE_MYSQL_PORT=3307
```

### 2.backend Connection to mysql Configuration

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

### 3.Example Configuration for backend to Connect to an External mysql Service

PS: When using an already deployed `mysql` service, you can configure the connection address through the `.env` file.

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

### 4.Example Configuration for an Oinone Application to Connect to a mysql Service

PS: When starting with the source code, you can directly use this `mysql` service. (Only the configuration items that need to be modified are shown here)

```yaml
pamirs:
  datasource:
    base:
      # The same as the OINONE_MYSQL_PORT and OINONE_DB_BASE configurations
      url: jdbc:mysql://192.168.1.100:3307/oinone_base
      # Built-in root user
      username: root
      # The same as the OINONE_MYSQL_PASSWORD configuration
      password: Abc@1234
    pamirs:
      # The same as the OINONE_MYSQL_PORT and OINONE_DB_PAMIRS configurations
      url: jdbc:mysql://192.168.1.100:3307/oinone_pamirs
      # Built-in root user
      username: root
      # The same as the OINONE_MYSQL_PASSWORD configuration
      password: Abc@1234
```

## (V) rocketmq Configuration

### 1.rocketmq Service Configuration

```yaml
# mqnamesrv expose port
OINONE_MQ_NAMESRV_PORT=19876

# mqbroker expose port 10989 - 10991
OINONE_MQ_LISTEN_PORT=10991
OINONE_MQ_FAST_LISTEN_PORT=10989
OINONE_MQ_HA_LISTEN_PORT=10990
```

### 2.Configuration for the backend to connect to RocketMQ

```shell
# mqnamesrv address
MQ_NAME_SERVER=rmqnamesrv:9876
```

### 3.Example configuration for the backend to connect to an external RocketMQ service

PS: When using an already deployed `RocketMQ` service, you can configure the connection address through the `.env` file.

```shell
# mqnamesrv address
MQ_NAME_SERVER=192.168.1.100:19876
```

### 4.Example configuration for an Oinone application to connect to a RocketMQ service

PS: When starting with the source code, you can directly use this `RocketMQ` service. (Only the configuration items that need to be modified are shown here)

```yaml
spring:
  rocketmq:
    # The same as the OINONE_MQ_NAMESRV_PORT configuration
    name-server: 192.168.1.100:19876
```

