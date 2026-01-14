---
title: 项目部署：Oinone离线部署设计器镜像
index: true
category:
  - 常见解决方案
order: 77
---

# 一、概述
Oinone 平台为合作伙伴提供了多种部署方式，这篇文章将介绍如何在私有云环境部署 Oinone 平台 Docker镜像。

:::info 注意：

本文以`5.2.20.1`为例进行介绍，使用`amd64`架构的`体验镜像`进行部署。具体版本号以数式提供的为准

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
+ 一台安装了 Docker 环境的服务器（私有云环境）；以下简称`部署环境`；
+ 一台安装了 Docker 环境的电脑（可访问公网）；以下简称`本地环境`；

# 四、部署清单
下面列举了文章中在本地环境操作结束后的全部文件：

+ 设计器镜像：`oinone-designer-full-v5-5.2.20.1-amd64.tar`
+ 离线部署结构包：`oinone-designer-full-standard-offline.zip`
+ Oinone许可证：****-trial.lic（实际文件名以 Oinone 颁发的许可证为准）
+ 第三方数据库驱动包（非 MySQL 数据库必须）

:::info 注意：

如需一次性拷贝所有部署文件到部署环境，可以将文档步骤在本地环境执行后，一次性将所有文件进行传输。

:::

# 五、在部署环境创建部署目录
```shell
mkdir -p /home/admin/oinone-designer-full
mkdir -p /home/admin/oinone-designer-full/images
```

# 六、检查部署环境服务器架构
确认部署环境是`amd64`还是`arm64`架构，若本文提供的查看方式无法正确执行，可自行搜索相关内容进行查看。

## （一）使用 uname 命令查看
```shell
uname -a
```

:::info 注意：

此步骤非常重要，如果部署环境的服务器架构与本地环境的服务器架构不一致，将导致镜像无法正确启动。

:::

# 七、在本地环境准备镜像
准备需要部署的镜像版本。

## （一）登录 Oinone 镜像仓库（若已登录，可忽略此步骤）
```shell
docker login https://harbor.oinone.top
# input username
# input password
```

## （二）获取 Oinone 平台镜像
```shell
docker pull harbor.oinone.top/oinone/oinone-designer-full-v5.2:5.2.20.1-amd64
```

## （三）保存镜像到`.tar`文件
```shell
docker save -o oinone-designer-full-v5-5.2.20.1-amd64.tar oinone-designer-full-v5.2:5.2.20.1-amd64

若报错`Error response from daemon: reference does not exist`脚本改成下面这个：
docker save -o oinone-designer-full-v5-5.2.20.1-amd64.tar harbor.oinone.top/oinone/oinone-designer-full-v5.2:5.2.20.1-amd64

# docker save [OPTIONS] IMAGE [IMAGE...]
```

## （四）上传`.tar`到部署环境
```shell
scp ./oinone-designer-full-v5-5.2.20.1-amd64.tar admin@127.0.0.1:/home/admin/oinone-full/images/
```

:::warning 提示：

若无法使用scp方式上传，可根据部署环境的具体情况将镜像文件上传至部署环境的部署目录。

:::

# 八、在部署环境加载镜像
## （一）加载镜像文件到Docker中
```shell
cd /home/admin/oinone-full/images

docker load -i oinone-designer-full-v5-5.2.20.1-amd64.tar
```

## （二）查看镜像是否正确加载
```shell
docker images
```

查看输出内容，对比`REPOSITORY`、`TAG`、`IMAGE ID`与本地环境完全一致即可。

# 九、设计器服务部署
为了方便起见，服务器操作文件显得不太方便，因此，我们可以在本地环境将部署脚本准备妥善后，传输到部署环境进行部署
结构包（oinone-designer-full-standard-offline.）需上传到要部署的服务器中，后面的操作均在这个目中进行

## （一）下载离线部署结构包（以数式发出的为准）
[oinone-designer-full-standard-offline.zip](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/oinone-designer-deploy/oinone-designer-full-standard-offline.zip)

## （二）将 Pamirs 许可证移动到`config`目录下，并重命名为`****-trial.lic`（实际文件名以 Oinone 颁发的许可证为准）
```shell
mv ****-trial.lic config/****-trial.lic
```

## （三）加载非 MySQL 数据库驱动（按需）
将驱动`jar`文件移动到`lib`目录下即可。

以KDB8数据库驱动`kingbase8-8.6.0.jar`为例

```shell
mv kingbase8-8.6.0.jar lib/
```

:::warning 提示：

`lib`目录为非设计器内置包的外部加载目录（外部库），可以添加任何`jar`包集成到设计器中。

:::

## （四）修改脚本中的配置
### 1、修改启动脚本`startup.sh`
修改对应的镜像版本号，  将 IP 从 192.168.0.121 改成宿主机IP

```nginx
configDir=$(pwd)
version=5.1.16
IP=192.168.0.121
```

### 2、修改 mq/broker.conf
修改其中 brokerIP1 的 IP 从 192.168.0.121 改成宿主机 IP

```nginx
brokerClusterName = DefaultCluster
namesrvAddr=127.0.0.1:9876
brokerIP1=192.168.0.121
brokerName = broker-a
brokerId = 0
deleteWhen = 04
fileReservedTime = 48
brokerRole = ASYNC_MASTER
flushDiskType = ASYNC_FLUSH
autoCreateTopicEnable=true
listenPort=10991
transactionCheckInterval=1000
#存储使用率阀值，当使用率超过阀值时，将拒绝发送消息请求
diskMaxUsedSpaceRatio=98
#磁盘空间警戒阈值，超过这个值则停止接受消息，默认值90
diskSpaceWarningLevelRatio=99
#强制删除文件阈值，默认85
diskSpaceCleanForciblyRatio=97
```

## （五）执行`startup.sh`脚本启动
```shell
sh startup.sh
```

# 十、访问服务
使用`http://127.0.0.1:88`访问服务

