---
title: 快速体验：docker-full方式安装
index: true
category:
  - 安装与升级
order: 1
prev:
  text: 源码安装
  link: /zh-cn/InstallOrUpgrade/CommunityEdition/source-code-installation.md
---
# 一、概述
每个构建版本都隔离在其自己的容器（Linux 命名空间容器）中。本文档提供如何安装“包含所有中间件及前后端工程”镜像的说明

基础是准备一台4核16G的Linux服务器，操作系统推荐CentOS 7.6 64位。其中安装了数式Oinone所有必需的依赖项以及常见的有用包。

它是非正式环境下使用数式Oinone或进行试用的最简单方式，部署结构示意如下：

![部署结构](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Quick-experience%3ADocker-full-installation-method/bushujiegoushiyi.jpeg)

:::info 注意：如有其他环境配合体验，网络需互通

+ 本地开发ip   能否调通   服务器ip
在本地执行命令：ping 192.168.0.121(替换成自己的服务器ip)

+ 部署docker的宿主机ip 能否调通 本地开发ip
进入服务器执行命令：ping 192.168.0.60(替换成自己的本地ip)

:::

:::danger 警告：数据库需要独立

数据库如果不从镜像中独立出来，而是用镜像中的数据库。那么镜像升级的时候会导致数据丢失。

:::

# 二、安装MySQL数据库
如果没有现成的数据库，可自行到官网下载安装：[https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)。

参考[MySQL安装与注意事项](/zh-cn/InstallOrUpgrade/Dev-ENV/MySQL-setup.md)

# 三、安装docker
如果没有Docker的话，请自行到官网下载安装：[https://www.docker.com/get-started/](https://www.docker.com/get-started/)

:::warning 提示

在中国境内安装如果 `<code>docker</code>` 源异常，可以把官方源改成阿里云的源:
从 https://download.docker.com/linux/centos/docker-ce.repo 换成 http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
命令：yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
:::

# 四、下载镜像
## （一）确认系统架构
**查看当前系统架构：**
使用 `arch(推荐使用) `或者`uname -a` 命令

+ x86_64：表示支持 AMD64 架构。
+ aarch64：表示支持 ARM64 架构

:::info 注意：镜像支持

本平台所有镜像均使用docker manifest支持amd64和arm64架构！(如果有其他架构请先联系数式人员确定能否使用)

:::

## （二）拉取镜像
### 社区版
暂未提供，请使用源码方式安装

### 企业版
```shell
##oinone-designer-mini-v大版本.中版本:全版本
docker pull harbor.oinone.top/oinone/oinone-designer-mini-v6.2:6.2.1
```

如镜像拉取过慢，可在对应镜像Tag添加`-amd64`、`-arm64`后缀获取单一架构镜像。

```shell
##oinone-designer-mini-v大版本.中版本:全版本-架构Tag
docker pull harbor.oinone.top/oinone/oinone-designer-mini-v6.2:6.2.1-amd64
docker pull harbor.oinone.top/oinone/oinone-designer-mini-v6.2:6.2.1-arm64
```

# 五、运行数式Oinone
## （一）下载结构包
+ 先在服务器上建一个文件夹（推荐建在主目录下，方便查找），然后进入文件夹里。

```plain
#服务器上建好目录
#进入主目录
cd ~
#建文件夹
mkdir oinone
#进入文件夹
cd oinone
```

+ 本地下载结构包[oinone-op-ds-all-full.zip](http://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/file-source/oinone-op-ds-all-full.zip)，解压后从本地电脑上传结构包到服务器

```plain
#本地电脑上传结构包
scp home/user/myfolder(替换成本地电脑解压后的实际地址) username@ip_address:/home/oinone(替换成想要上传在服务器上的具体地址)
```

## （二）目录结构介绍
以下数式Oinone镜像相关目录结构，与宿主机的数据卷（Volume）挂载
<div style="display: flex; gap: 20px; margin: 20px 0;">

  <div style="flex: 1; background: #f8f9fa; border-radius: 8px; padding: 16px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">

``` shell
#结构包目录
|____config
| |____logback.xml
| |____application.yml
| |____oinone-demo.lic
|____logs
|____lib
|____nginx
| |____default.conf
|____mq
| |____broker.conf
|____startup.sh
|____startup.cmd
```


  </div>


  <div style="flex: 1; background: #f8f9fa; border-radius: 8px; padding: 16px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">

```shell
#镜像目录结构都在/opt目录下
├── jdk
├── mq
├── nginx-1.15.5
├── nginx.conf
├── pamirs
│   ├── dist
│   ├── ext
│   │   ├── application.yml
│   │   ├── license.lic
│   │   └── logback.xml
│   ├── lib
│   ├── logs
│   │   └── sql-records
│   ├── nginx
│   │   └── vhost
│   ├── out
│   ├── outlib
│   ├── releases.jar
│   ├── run
│   │   └── run.sh
│   ├── static
│   └── tables.txt
├── redis
├── redis.conf
├── zoo.cfg
└── zookeeper
```
  </div>
</div>



```shell
#startup.sh文件内容
#!/bin/bash
configDir=$(pwd)
majorVersion=5.3
version=5.3.8.4
IP=192.168.0.121
docker run -d --name designer-allinone \
-e DUBBO_IP_TO_REGISTRY=$IP \
-e DUBBO_PORT_TO_REGISTRY=20880 \
-p 8099:8091 \
-p 3307:3306 \
-p 2182:2181 \
-p 6378:6379 \
-p 19876:9876 \
-p 10991:10991 \
-p 20880:20880 \
-p 88:80 \
-v $configDir/config/:/opt/pamirs/ext \
-v $configDir/nginx:/opt/pamirs/nginx/vhost \
-v $configDir/logs:/opt/pamirs/logs \
-v $configDir/mq/broker.conf:/opt/mq/conf/broker.conf \
-v $configDir/lib:/opt/pamirs/outlib harbor.oinone.top/oinone/oinone-designer-full-v$majorVersion:$version
```

## （三）运行startup.sh
### 1.修改startup.sh文件
在文件中找到如下代码，修改`majorVersion`、`version`以及对应的IP为docker宿主机IP(即服务器ip)等配置项

```plain
configDir=$(pwd)
majorVersion=6.2  # 根据数式Oinone镜像的实际版本进行修改
version=6.2.1     # 根据数式Oinone镜像的实际版本进行修改
IP=192.168.0.121  # 改为服务器 IP
```

### 2.修改mq目录下的broker.conf文件
在文件中找到如下代码，修改`namesrvAddr` 和 `brokerIP1` 的IP地址等配置项

```plain
namesrvAddr=127.0.0.1:9876   # 改成127.0.0.1:9876
brokerIP1=192.168.0.121  # 改成宿主机IP
```

:::warning 提示：

如果不知道ip是多少，执行命令：`ipconfig` 或者 `ip a`

:::

### 3.修改配置文件 config目录下的application.yml文件
在文件中找到如下代码，修改数据库的IP、端口、用户名以及密码等配置项

```yaml
# application.yml文件
# 改成mysql所在服务器的ip、端口(端口号默认3306，使用服务器上mysql的端口一致)、username、password
pamirs:
  datasource:
    pamirs:
      driverClassName: com.mysql.cj.jdbc.Driver
      type: com.alibaba.druid.pool.DruidDataSource
      url: jdbc:mysql://192.168.0.129:3306/demo_pamirs?useSSL=false&allowPublicKeyRetrieval=true&useServerPrepStmts=true&cachePrepStmts=true&useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai&autoReconnect=true&allowMultiQueries=true
      username: root
      password: shushi@2019
    base:
      driverClassName: com.mysql.cj.jdbc.Driver
      type: com.alibaba.druid.pool.DruidDataSource
      url: jdbc:mysql://192.168.0.129:3306/demo_base?useSSL=false&allowPublicKeyRetrieval=true&useServerPrepStmts=true&cachePrepStmts=true&useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai&autoReconnect=true&allowMultiQueries=true
      username: root
      password: shushi@2019
```

### 4.执行 `startup.sh` 并查看日志
```plain
sh startup.sh
```

查看日志：先进入logs文件夹下，看是否产生了日志？

```plain
cd logs   # 进入logs文件夹
```

```plain
# 如果生成了！可以执行命令：
tail -200f 2024.9.0.log(改成当天的日志文件名)
# 第一次启动时间会相对长一些，等看到日志文件中输出" 启动成功"等字样，代表启动成功
```

```plain
# 如果没有生成，请先执行以下命令
docker logs
# 执行完了之后看看到底启动没有，如果出错了，实在解决不了，请把所有错误信息导出发到群里。
```

启动成功之后可以通过浏览器访问 `http://服务器ip:88/`，账号密码为`admin/admin`



