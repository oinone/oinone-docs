---
title: Project Deployment:Oinone Offline Deployment of Designer JAR Package
index: true
category:
  - Common Solutions
order: 76
---

# I. Overview
The Oinone platform provides partners with multiple deployment methods. This article introduces how to deploy the Oinone platform JAR package in a private cloud environment.

:::info Note:
This article uses `5.2.6` as an example for introduction.
:::

# II. Deployment Environment Requirements

## (Ⅰ) Environment Requirements for Environments Including All Middleware and Designer Services
- CPU: 8 vCPU
- Memory (RAM): 16G or above
- Hard Disk (HDD/SSD): 60G or above

## (Ⅱ) Environment Requirements for Designer Services Only
- CPU: 8 vCPU
- Memory (RAM): 8G or above
- Hard Disk (HDD/SSD): 40G or above

# III. Deployment Preparation

## (Ⅰ) Create a Deployment Directory in the Deployment Environment
```shell
mkdir -p /home/admin/oinone-designer
```

:::warning Tip:
For easy management, all files required for Oinone deployment should be stored in this directory.
:::

## (Ⅱ) Middleware to be Installed on the Server
- JDK: jdk_1.8_221 or later
  - [Download Address](https://www.oracle.com/java/technologies/javase/javase8u211-later-archive-downloads.html)
- MySQL: 8.0.26 or later
  - [Download Address](https://dev.mysql.com/downloads/mysql/)
- Redis: 5.0.2 or later
  - [Download Address](https://redis.io/downloads)
  - [Installation Tutorial](https://www.runoob.com/redis/redis-install.html)
- Zookeeper: 3.5.8 or later
  - [Download Address](https://zookeeper.apache.org/releases.html)
  - [Installation Tutorial](https://www.runoob.com/w3cnote/zookeeper-setup.html)
- Nginx: Any version (recommended to use source code compilation installation and enable function modules such as rewrite and https)
  - [Linux Installation Tutorial](https://www.runoob.com/linux/nginx-install-setup.html)
  - [Download Address](https://nginx.org/en/download.html)

## (Ⅲ) Start All Middleware Using Docker
Click to download the one-click deployment package for all middleware

[middleware-kits.zip](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/oinone-designer-deploy/middleware-kits.zip)

# IV. Deployment List
The following lists all files after completing operations in the local environment in this article:

- Designer JAR package: pamirs-designer-boot-v5.2-5.2.6.jar
- Offline deployment structure package: oinone-designer-jar-offline.zip
- Third-party database driver package (necessary for non-MySQL databases)

:::warning Tip:
If you need to copy all deployment files to the deployment environment at one time, you can transfer all files at once after executing the document steps in the local environment.
:::

# V. Prepare Deployment Files in the Local Environment

## (Ⅰ) Download the Offline Deployment Structure Package
[oinone-designer-jar-offline.zip](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/oinone-designer-deploy/oinone-designer-jar-offline.zip)

## (Ⅱ) Download the Deployment JAR Package
Find the title of "Independently Deploy All Designer JARs," under which the corresponding JAR package is provided for download.

For example:
[https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/install/oinone-designer/pamirs-designer-boot-v5.2-5.2.6.jar](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/install/oinone-designer/pamirs-designer-boot-v5.2-5.2.6.jar)

# VI. Backend Service Deployment

## (Ⅰ) Move the Deployment JAR Package to the `backend` Directory and Rename It to `oinone-designer.jar`
```shell
mv pamirs-designer-boot-v5.2-5.2.6.jar backend/oinone-designer.jar
```

:::warning Tip:
This name is the default value of the `startup.sh` script and can be modified according to actual circumstances.
:::

## (Ⅱ) Move the Pamirs License to the `backend/config` Directory and Rename It to `license.lic`
```shell
mv oinone-demo_1730163770607.lic backend/config/license.lic
```

## (Ⅲ) Load Non-MySQL Database Drivers (as Needed)
Move the driver `jar` file to the `backend/lib` directory.

Take the KDB8 database driver `kingbase8-8.6.0.jar` as an example:
```shell
mv kingbase8-8.6.0.jar backend/lib/
```

:::warning Tip:
The `backend/lib` directory is an external loading directory (external library) for non-designer built-in packages, where any `jar` package can be added and integrated into the designer.
:::

## (Ⅳ) Modify the `backend/startup.sh` Script
- `IP`: Modify to the IP address accessible from the outside
- `DB_BASE_`: Database connection configuration related to the base library
- `DB_PAMIRS_`: Database connection configuration related to the pamirs library
- `REDIS_`: Redis-related configuration
- `MQ_NAME_SERVER`: Connection address of RocketMQ's name-server
- `ZOOKEEPER_`: Zookeeper-related configuration

:::warning Tip:
If you need to configure dialects or other parameters, you can directly modify the `backend/config/application.yml` configuration file. Variables are only used for simple configuration scenarios.
:::

## (Ⅴ) Execute the `startup.sh` Script to Start
```shell
sh startup.sh
```

After execution, three paths will be printed:
- Backend path: `backend root path: /path/to/backend`
- Frontend path: `frontend root path: /path/to/frontend`
- Nginx configuration path: `nginx services path: /path/to/nginx`

# VII. Nginx Configuration

## (Ⅰ) Find `nginx.conf` in the local nginx service and add the Nginx configuration path as the loading directory
```nginx
http {
    ...
    include /path/to/nginx/*.conf;
}
```

## (Ⅱ) Modify the `root` configuration in Line 7 of `default.conf` in the structure package to the `frontend path` to the `dist` directory
```nginx
server {
    ...
    root /path/to/frontend/dist;
}
```

## (Ⅲ) Modify the `alias` configuration in Line 30 of `oss.conf` in the structure package to the `frontend path` to the `static` directory
```nginx
server {
    ...
    location /static {
        ...
        alias /path/to/frontend/static;
    }
}
```

# VIII. Access the Service
Access the service using `http://127.0.0.1:9090`