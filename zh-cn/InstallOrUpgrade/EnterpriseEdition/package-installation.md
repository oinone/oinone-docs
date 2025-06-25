---
title: 运行程序包方式安装
index: true
category:
  - 安装与升级
order: 4
next:
  text: 从社区版转向企业版
  link: /zh-cn/InstallOrUpgrade/from-community-to-enterprise.md
---
# 一、概述
:::info 注意

此模式仅企业版提供，开源社区版可以通过其他几种模式进行安装

:::

基础是准备一台4核16G的Linux服务器，操作系统推荐CentOS 7.6 64位。其中安装了数式Oinone所有必需的依赖项以及常见的有用包。

它适用于正式、研发和测试环境下使用数式Oinone，经过额外的部署和维护工作后，可长期使用。在实际使用过程中，中间件如redis、zookeeper、rockerMq可以独立服务器部署。部署结构示意如下：

![部署结构](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Install-by-running-the-package/bsjg.jpeg)

:::info 注意：如有其他环境配合体验，网络需互通


+ 本地开发ip   能否调通   服务器ip
在本地执行命令：ping 192.168.0.121(替换成自己的服务器ip)

+ 部署docker的宿主机ip 能否调通 本地开发ip
进入服务器执行命令：ping 192.168.0.60(替换成自己的本地ip)

:::

# 二、安装MySQL数据库
如果没有现成的数据库，可自行到官网下载安装：[https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)。

参考[MySQL安装与注意事项](/zh-cn/InstallOrUpgrade/Dev-ENV/MySQL-setup.md)

# 三、其他中间件部署
| RocketMQ | 必须 | 4.7.1以上 |
| --- | --- | --- |
| Redis | 必须 | 5.0.2以上 |
| Zookeeper | 必须 | 3.5.8以上 |


# 四、下载数式Oinone的运行包
浏览数式Oinone官方社区（doc.oinone.top），查看对应版本的发布记录，并且下载：独立部署所有设计器JAR文件（后端服务，包含所有设计器），如：pamirs-designer-boot-v5.3-5.3.8.4.jar。

# 五、运行数式Oinone标准后端应用
## （一）下载Oinone专属启动器
运行包经过加密后，需要用到Oinone的专属启动器，在下载[oinone-boot-starter.zip](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/install/oinone-boot-starter.zip)后

## （二）启动脚本
:::tip 举例：

这里以linux平台为例

1、解压Oinone的专属启动器压缩包oinone-boot-starter.zip，复制linux的启动器 `linux-boot`到用户home目录下

2、在用户home目录下，新建startup.sh文件和oinone目录

3、在startup.sh文件中找到如下代码，修改`subject`、`licensePath`以及`jarPath`等配置项

:::

```plain
#startup.sh
#!/bin/bash
# 脚本所在目录
home=$(cd "$(dirname "$0")" && pwd)
# 启动jar路径
jarPath=$home/oinone/pamirs-designer-boot-v5.3-5.3.8.4.jar
# 配置路径
applicationPath=$home/oinone/config/application.yml
# 许可证信息
subject=
licensePath=
nohup $home/linux-boot java -Duser.timezone=GMT+08:00 -Dhttps.protocols=TLSv1.2 -Dfile.encoding=UTF-8 \
  -jar $jarPath \
  --spring.config.location=$applicationPath \
  -Psubject=$subject \
  -Plicense=$licensePath \
  -Plifecycle=INSTALL > $home/out.log 2>&1  &
sleep 1
tail -200f $home/out.log
```

:::info 注意：其他平台支持

Linux（arm64架构）启动器切换为：linux-boot-arm64。

Mac OS 启动器切换为：darwin-boot

Mac OS（arm64架构）启动器切换为：darwin-boot-arm64

Windows平台启动器切换为：win-boot.exe

:::

:::warning 提示

1. 上述命令使用的`java -jar`与常规使用方式完全相同。
2. Oinone无代码设计器不支持使用`javaagent`参数。

:::

## （三）修改配置文件 config目录下的application.yml文件
下载[application.yml](http://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/file-source/application.yml)文件到指定位置如：$home/oinone/config/目录下，并做对应修改。

如果Mysql、Zookeeper、Redis、RocketMQ不在一个宿主机中，在文件中找到如下代码，修改IP、端口、用户名以及密码等配置项

+ Mysql

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

+ Zookeeper

```yaml
# application.yml文件
dubbo:
  application:
    name: pamirs-designer
    version: 1.0.0
  registry:
    address: zookeeper://127.0.0.1:2181
  protocol:
    name: dubbo
    port: 20880
    serialization: pamirs
  consumer:
    timeout: 5000
  provider:
    timeout: 5000
  scan:
    base-packages: pro.shushi
  cloud:
    subscribed-services:
pamirs:
  zookeeper:
    zkConnectString: 127.0.0.1:2181
    zkSessionTimeout: 60000
    rootPath: /oinone
```

+ Redis

```yaml
# application.yml文件
spring:
  redis:
    database: 0
    host: 127.0.0.1
    port: 6379
    timeout: 2000
    password: Abc@1234
    jedis:
      pool:
        # 连接池中的最大空闲连接 默认8
        max-idle: 16
        # 连接池中的最小空闲连接 默认0
        min-idle: 0
        # 连接池最大连接数 默认8 ，负数表示没有限制
        max-active: 16
        # 连接池最大阻塞等待时间（使用负值表示没有限制） 默认-1
        max-wait: 3000
```

+ RocketMQ

```yaml
# application.yml文件
spring:
  rocketmq:
    name-server: 127.0.0.1:9876
```

+ 文件存储oss

```yaml
cdn:
  oss:
    name: MINIO
    type: MINIO
    bucket: pamirs
    uploadUrl: http://xxx.xxx.xxx.xxx:9000
    downloadUrl: http://xxx.xxx.xxx.xxx:9000
    accessKeyId: xxx
    accessKeySecret: xxx
    mainDir: upload/demo/
    validTime: 3600000
    timeout: 600000
    active: true
    referer:
    localFolderUrl: 
```

:::danger 警告

体验企业版时数式会提默认配置，但需要注意，cdn正式环境需要替换成自己的服务器，而不是用数式科技提供测试服务器，该服务器会定时清理，导致文件丢失。

:::

更多oss配置请参考：[文件存储配置](/zh-cn/DevManual/Reference/Back-EndFramework/module-API.md#十四-文件存储配置-pamirs-file)

# 六、运行数式Oinone标准前端应用
# 七、常见问题
## （一）出现`cannot execute binary file`异常该如何处理？
### 问题原因
`Oinone专属启动器`是通过`go语言`进行编译并执行，对于不同的操作系统架构需要分别编译。

### 解决方案
1. `物理机`安装`go语言`环境。
2. 下载`boot.go`文件，放在`run`目录下。（需询问`Oinone客服`获取最新`boot.go`文件）
3. 进入`run`目录，执行`go build -o "boot-starter" "boot.go"`命令。
4. 在`startup.sh`命令中添加`-v $home/run/boot-starter:/opt/pamirs/run/boot-starter \`将文件挂载到容器。
5. 删除docker容器后再执行`startup.sh`脚本重启镜像即可。

## （二）出现`failed to open elf at /lib64/ld-linux-x86-64.so.2`异常该如何处理？
### 问题原因
部分`arm64`架构的宿主机无法兼容`amd64`环境中编译的`linux-boot`启动器，需要将启动器换为`linux-boot-arm64`。

### 解决方案
1. 下载[oinone-boot-starter.zip](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/install/oinone-boot-starter.zip)并解压，获取`linux-boot-arm64`启动器。
2. 将启动器放在`run`目录下。
3. 在`startup.sh`命令中添加`-v $home/run/linux-boot-arm64:/opt/pamirs/run/boot-starter`替换镜像中的启动器。
4. 删除docker容器后再执行`startup.sh`脚本重启镜像即可。






