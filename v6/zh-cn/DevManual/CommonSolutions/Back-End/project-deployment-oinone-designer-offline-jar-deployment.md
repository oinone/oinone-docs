---
title: 项目部署：Oinone离线部署设计器JAR包
index: true
category:
  - 常见解决方案
order: 76
---

# 一、概述
Oinone 平台为合作伙伴提供了多种部署方式，这篇文章将介绍如何在私有云环境部署 Oinone 平台 JAR包。

:::info 注意：

本文以`5.2.6`为例进行介绍。

:::

# 二、部署环境要求
## （一）包含全部中间件及设计器服务的环境要求
+ CPU：8 vCPU
+ 内存（RAM）：16G以上
+ 硬盘（HDD/SSD）：60G以上

## （二）仅设计器服务的环境要求
+ CPU：8 vCPU
+ 内存（RAM）：8G以上
+ 硬盘（HDD/SSD）：40G以上

# 三、部署准备
## （一）在部署环境创建部署目录
```shell
mkdir -p /home/admin/oinone-designer
```

:::warning 提示：

为方便管理，所有Oinone部署所需文件都应该在该目录下存放。

:::

## （二）服务器需要安装的中间件
+ JDK：jdk_1.8_221 版本以上
    - [下载地址](https://www.oracle.com/java/technologies/javase/javase8u211-later-archive-downloads.html)
+ MySQL：8.0.26 版本以上
    - [下载地址](https://dev.mysql.com/downloads/mysql/)
+ Redis：5.0.2 版本以上
    - [下载地址](https://redis.io/downloads)
    - [安装教程](https://www.runoob.com/redis/redis-install.html)
+ Zookeeper：3.5.8 版本以上
    - [下载地址](https://zookeeper.apache.org/releases.html)
    - [安装教程](https://www.runoob.com/w3cnote/zookeeper-setup.html)
+ Nginx：任意版本（推荐使用源码编译安装方式，并开启 rewrite、https 等功能模块）
    - [Linux安装教程](https://www.runoob.com/linux/nginx-install-setup.html)
    - [下载地址](https://nginx.org/en/download.html)

## （三）使用 Docker 启动所有中间件
点击下载一键部署所有中间件套件包

[middleware-kits.zip](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/oinone-designer-deploy/middleware-kits.zip)

# 四、部署清单
下面列举了文章中在本地环境操作结束后的全部文件：

+ 设计器JAR包：pamirs-designer-boot-v5.2-5.2.6.jar
+ 离线部署结构包：oinone-designer-jar-offline.zip
+ 第三方数据库驱动包（非 MySQL 数据库必须）

:::warning 提示：

如需一次性拷贝所有部署文件到部署环境，可以将文档步骤在本地环境执行后，一次性将所有文件进行传输。

:::

# 五、在本地环境准备部署文件
## （一）下载离线部署结构包
[oinone-designer-jar-offline.zip](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/oinone-designer-deploy/oinone-designer-jar-offline.zip)

## （二）下载部署JAR包

找到独立部署所有设计器 JAR 标题，下面有对应的 JAR 包提供下载。

例如：
[https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/install/oinone-designer/pamirs-designer-boot-v5.2-5.2.6.jar](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/install/oinone-designer/pamirs-designer-boot-v5.2-5.2.6.jar)

# 六、后端服务部署
## （一）将部署 JAR 包移动到`backend`目录下，并重命名为`oinone-designer.jar`
```shell
mv pamirs-designer-boot-v5.2-5.2.6.jar backend/oinone-designer.jar
```

:::warning 提示：

该名称为`startup.sh`脚本的默认值，可根据实际情况自行修改

:::

## （二）将 Pamirs 许可证移动到`backend/config`目录下，并重命名为`license.lic`
```shell
mv oinone-demo_1730163770607.lic backend/config/license.lic
```

## （三）加载非 MySQL 数据库驱动（按需）
将驱动`jar`文件移动到`backend/lib`目录下即可。

以 KDB8 数据库驱动`kingbase8-8.6.0.jar`为例

```shell
mv kingbase8-8.6.0.jar backend/lib/
```

:::warning 提示：

`backend/lib`目录为非设计器内置包的外部加载目录（外部库），可以添加任何`jar`包集成到设计器中。

:::

## （四）修改`backend/startup.sh`脚本
+ `IP`：修改为可被外部访问的 IP 地址
+ `DB_BASE_`：base 库相关数据库连接配置
+ `DB_PAMIRS_`：pamirs 库相关数据库连接配置
+ `REDIS_`：Redis 相关配置
+ `MQ_NAME_SERVER`：RocketMQ 的 name-server 连接地址
+ `ZOOKEEPER_`：Zookeeper 相关配置

:::warning 提示：

若需要配置方言或其他参数，可直接修改`backend/config/application.yml`配置文件，变量仅用于简单配置场景

:::

## （五）执行`startup.sh`脚本启动
```shell
sh startup.sh
```

执行完成后会打印三个路径

+ 后端路径：`backend root path: /path/to/backend`
+ 前端路径：`frontend root path: /path/to/frontend`
+ Nginx 配置路径：`nginx services path: /path/to/nginx`

# 七、Nginx 配置
## （一）在本地 nginx 服务中找到`nginx.conf`，并添加 Nginx 配置路径为加载目录
```nginx
http {
    ...
    include /path/to/nginx/*.conf;
}
```

## （二）修改结构包中的`default.conf`第7行`root`配置为`前端路径`到`dist`目录下
```nginx
server {
    ...
    root /path/to/frontend/dist;
}
```

## （三）修改结构包中的`oss.conf`第30行`alias`配置为`前端路径`到`static`目录下
```nginx
server {
    ...
    location /static {
        ...
        alias /path/to/frontend/static;
    }
}
```

# 八、访问服务
使用`http://127.0.0.1:9090`访问服务

