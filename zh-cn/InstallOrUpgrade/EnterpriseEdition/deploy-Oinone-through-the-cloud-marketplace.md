---
title: 通过云市场部署Oinone企业级低代码平台
index: true
category:
  - 安装与升级
order: 3
---
# 一、概述

云市场数式Oinone企业级低代码研发平台镜像，包含操作系统、中间件和Oinone无代码设计器的结构包。仅需少量配置修改，即可一键启动，帮助用户快速搭建 Oinone 企业版环境。

# 二、购买阿里云主机ECS

购买阿里云主机ECS并选择“数式Oinone企业级低代码研发平台”镜像。

## （一）云市场数式Oinone企业级低代码研发平台

[数式Oinone企业级低代码研发平台【最新版】_JAVA_ERP_OA-_云市场-阿里云](https://market.aliyun.com/detail/cmjj00071974.html?spm=5176.730005.result.2.5b40414aJ3Zx2a&innerSource=search_oinone)

## （二）选择【地域】后点击【购买】

 地域也可以不做修改；如果需要和已有的ECS内网互通，那么就需要把地域选择到同一个域中。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Deploy-Oinone-through-the-cloud-marketplace/1759140825748-ebaf2794-6737-4c42-b95e-78bcc250d252.png)

## （三）购买云主机ECS

1、付费类型根据自己的情况选择，推荐内存4C/16GB以上的规格

    镜像中包含了数据库(MySQL)、中间件(Redis/RocketMQ/Zookeeper/Nginx)和Oinone企业版设计器应用，需要保证有足够的资源。

2、镜像 选择的是【云市场镜像】-> 数式Oinone企业级低代码研发平台 V6.2。（注：实际版本会随着Oinone发布的版本存在一些变化）

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Deploy-Oinone-through-the-cloud-marketplace/1759147966252-f70294dd-7222-46c4-a522-74650877c816.png)

 也可以从ECS购买页面【从云市场获取更多选择】选择 数式Oinone低代码平台的镜像

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Deploy-Oinone-through-the-cloud-marketplace/1759148140416-74a29ed9-f076-4953-9b8f-1c7fa68a8860.png)

3、带宽推荐5M+，其他的配置按照购买ECS的提示进行即可。

## （四）ECS主机配置

1、配置云主机安全组，开放一些必要的端口

+ 22：SSH端口
+ 88：设计器Web访问端口
+ 8099：设计器后端Java服务端口
+ 9876：rocketmq的namesrv端口
+ 10991：rocketmq的broker端口
+ 6379：缓存redis的端口
+ 3306：数据库mysql的端口
+ 2181：zookeeper的端口
+ 20880：dubbo的通信端口

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Deploy-Oinone-through-the-cloud-marketplace/1759229192394-b2eaa9fb-53a2-412d-a820-09824eb664ae.png)

2、设置root密码，能够通过SSH登录

# 三、运行Oinone企业版

## （一）、了解部署包的目录

登录到主机后，切换到目录:/opt，对应的文件列表和目录结构如下：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Deploy-Oinone-through-the-cloud-marketplace/1759230389315-fb2f276a-7647-4120-8fba-2a9916de7551.png)

```shell
|___licence
|   |__xxxx-trial(需找数式提供).lic
|___logs
|___oinone
    |__oinone-op-ds-all-mini
|___run
|   |__start-oinone.sh
|   |__start-software.sh
|___software
|   |___nginx
|   |___redis-6.2.7
|   |___rocketmq-all-4.7.1
|   |___zookeeper-3.5.10
|___start-all.sh
|___部署说明.md
```

## （二）、替换licence文件

将数式提供的license文件(文件名通常类似 xxxx-trial.lic) 拷贝到上述licence目录下

## （三）、修改必要的配置

使用 vi 打开 start-all.sh，进行必要的参数配置修改并保存

```plain
# ==================== 配置信息(必须配置) start==================
# 部署机器的公网IP(根据实际情况修改)
export PUBLIC_IP=xx.xx.xx.xx
# 部署机器的内/私网IP(根据实际情况修改)
export PRIVATE_IP=xx.xx.xx.xx

# Oinone提供的License信息(根据数式提供的进行修改)
# 例如license文件名为demo-trial.lic，则LIC_SUBJECT就是demo
export LIC_SUBJECT=xxxx
export LIC_FILE=xxxx-trial.lic

# Oinone镜像完整标签（含前缀和版本号，根据数式提供的进行修改）
export OINONE_IMAGE_TAG=6.3:6.3.3
# ==================== 配置信息(必须配置) end====================
```

## （四）、启动和访问

1、启动，在终端中执行：

```plain
sh start-all.sh
```

执行上述命令成功后，会在/opt/logs中打印出日志文件(日志按日期命名滚动输出，如:)。第一次启动因需要初始化数据，耗时大概350秒左右；等看到日志文件中输出 启动耗时 。。。等字样，代表启动成功。

2、访问，http://机器的公网IP:88  默认登录账号和密码都是admin

# 四、本地连接设计器中间件

上述部署【Oinone企业级低代码研发平台】后，也即部署了无代码设计器 和 一套中间件； 各自中间件的配置信息如下：

| **中间件** | **链接IP**       | **端口** | **密码**   |
| ---------- | ---------------- | -------- | ---------- |
| MySQL      | 部署机器的公网IP | 3306     | 123456@Abc |
| Redis      | 部署机器的公网IP | 6379     | 123456@Abc |
| Zookeeper  | 部署机器的公网IP | 2181     |            |
| MQ         | 部署机器的公网IP | 9876     |            |




当本地工程和无代码设计器实时联动时，需本地工程的数据库和中间件与设计器使保持一致； 修改本地工程的bootstrap.yml 和 application-dev.yml， 参考上面的中间件配置把项目中的zk、redis、mysql和mq的连接改成上述配置中各自对应的配置即可。





