---
title: 源码安装
index: true
category:
  - 安装与升级
order: 3
prev:
  text: Maven安装与注意事项
  link: /zh-cn/InstallOrUpgrade/Dev-ENV/Maven-setup.md
next:
  text: 快速体验：docker-full方式安装
  link: /zh-cn/InstallOrUpgrade/EnterpriseEdition/docker-full-installation.md
---
# 一、概述
:::info 注意

此模式仅开源社区版提供，企业版可以通过其他几种模式进行安装

:::

基础是准备一台4核16G的Linux服务器，操作系统推荐CentOS 7.6 64位。其中安装了数式Oinone所有必需的依赖项以及常见的有用包。

它提供了更大的灵活性，例如，它允许自行根据业务需求运行特定范围的模块。这足以用于开发模块，并且可以作为生产部署的基础。在实际使用过程中，中间件如redis、zookeeper、rockerMq可以独立服务器部署。部署结构示意如下：

![部署结构](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Source-code-installation/bsjg.jpeg)

:::warning 提示

源码安装在修改了Oinone框架源码的情况，不可以直接从社区版切换到企业版，其他版本皆可从社区版切换都企业版

:::

# 二、安装MySQL数据库
如果没有现成的数据库，可自行到官网下载安装：[https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)。

参考[MySQL安装与注意事项](/zh-cn/InstallOrUpgrade/Dev-ENV/MySQL-setup.md)

# 三、其他中间件部署
| RocketMQ | 必须 | 4.7.1以上 |
| --- | --- | --- |
| Redis | 必须 | 5.0.2以上 |
| Zookeeper | 必须 | 3.5.8以上 |


# 四、代码库简介

<table  cellspacing="0" cellpadding="8" style="border-collapse: collapse; width: 100%; max-width: 1400px; margin: 20px auto;">
  <thead>
    <tr style="background-color: #f5f5f5;">
      <th style="text-align: left; font-weight: bold;">说明</th>
      <th style="text-align: left; font-weight: bold;">代码库路径</th>
      <th style="text-align: left; font-weight: bold;">备注</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="3">快速启动</td>
      <td>oinone/oinone-frontend-starter.git</td>
      <td>前端一键启动(PC)</td>
    </tr>
    <tr>
      <td>oinone/oinone-mobile-starter.git</td>
      <td>前端一键启动(移动)</td>
    </tr>
    <tr>
      <td>oinone/oinone-backend-starter.git</td>
      <td>后端一键启动</td>
    </tr>
    <tr>
      <td rowspan="2">教程</td>
      <td>oinone/oinone-frontend-tutorials.git</td>
      <td>前端教程工程</td>
    </tr>
    <tr>
      <td>oinone/oinone-backend-tutorials.git</td>
      <td>后端教程工程</td>
    </tr>
    <tr>
      <td rowspan="2">示例</td>
      <td>oinone/oinone-frontend-examples.git</td>
      <td>前端示例工程</td>
    </tr>
    <tr>
      <td>oinone/oinone-backend-examples.git</td>
      <td>后端示例工程</td>
    </tr>
    <tr>
      <td>文档</td>
      <td>oinone/oinone-docs</td>
      <td>文档</td>
    </tr>
    <tr>
      <td rowspan="6">后端核心包</td>
      <td>oinone/oinone-pamirs/pamirs-spi.git</td>
      <td>后端SPI基础功能包</td>
    </tr>
    <tr>
      <td>oinone/oinone-pamirs/pamirs-k2.git</td>
      <td>后端元数据核心功能</td>
    </tr>
    <tr>
      <td>oinone/oinone-pamirs/pamirs-framework-commons.git</td>
      <td>后端核心功能公共包</td>
    </tr>
    <tr>
      <td>oinone/oinone-pamirs/pamirs-framework.git</td>
      <td>后端核心功能包</td>
    </tr>
    <tr>
      <td>oinone/oinone-pamirs/pamirs-framework-adaptor.git</td>
      <td>后端核心功能扩展包</td>
    </tr>
    <tr>
      <td>oinone/oinone-pamirs/pamirs-boot.git</td>
      <td>后端应用启动包</td>
    </tr>
    <tr>
      <td>后端基础功能包</td>
      <td>oinone/oinone-pamirs/pamirs-core.git</td>
      <td>后端基础功能包</td>
    </tr>
    <tr>
      <td rowspan="7">前端核心包</td>
      <td>oinone/oinone-kunlun/kunlun-engine.git</td>
      <td>前端核心功能扩展包</td>
    </tr>
    <tr>
      <td>oinone/oinone-kunlun/kunlun-framework.git</td>
      <td>前端核心功能包</td>
    </tr>
    <tr>
      <td>oinone/oinone-kunlun/kunlun-boot.git</td>
      <td>前端PC端启动工程</td>
    </tr>
    <tr>
      <td>oinone/oinone-kunlun/kunlun-mobile-boot.git</td>
      <td>前端移动端启动工程</td>
    </tr>
    <tr>
      <td>oinone/oinone-kunlun/kunlun-expression.git</td>
      <td>前端表达式组件包</td>
    </tr>
    <tr>
      <td>oinone/oinone-kunlun/kunlun-vue.git</td>
      <td>前端PC端组件包</td>
    </tr>
    <tr>
      <td>oinone/oinone-kunlun/kunlun-mobile-vue.git</td>
      <td>前端移动端组件包</td>
    </tr>
  </tbody>
</table>

:::warning 提示：`oinone-backend-starter.git`与`oinone-backend-tutorials.git`的区别：

1. `starter` 依赖所有`oinone`模块，`tutorials`依赖部分模块
2. `starter` 需要 `mysql`、`redis`、`zookeeper`、`mq`，`tutorials`依赖 `mysql`、`redis`后续增加功能时再逐步引入。
3. 未来在`oinone-backend-tutorials`里可能会加例子。目前我们比较纠结要不要把教程中的例子加进去。之所以现在不加例子的初心，是想让学习的人真正动手做一下。

:::

# 五、获取源
获取数式Oinone的源代码有两种方式：ZIP **压缩包** 或通过**Git**。这里介绍Git为主

:::warning 提示

需要安装 [Git](https://git-scm.com/)，建议具备 Git 命令的基本知识才能继续。

:::

要克隆 Git 存储库，可选择使用 HTTPS 或 SSH 进行克隆。大多数情况下，最佳选择是 HTTPS。不过，要为数式Oinone源代码做贡献，或遵循开发者入门教程时，请选择SSH。

## （一）前端
```plain
#Clone with Https
git clone https://github.com/oinone/oinone-frontend-starter.git
```

```plain
#Clone with SSH
git clone git@github.com:oinone/oinone-frontend-starter.git
```

## （二）后端
```plain
#Clone with Https
git clone https://github.com/oinone/oinone-backend-starter.git
```

```plain
#Clone with SSH
git clone git@github.com:oinone/oinone-backend-starter.git
```

# 六、运行后端
## （一）修改src/main/resources/config/application-dev.yml文件
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

## （二）启动后端服务
### 1. 使用Maven启动
```shell
cd oinone-backend-starter/oinone-backend-starter-boot && \
mvn clean compile spring-boot:run \
    -Dspring-boot.run.profiles=dev
```

### 2. 使用使用IDEA启动
IDEA导入`oinone-backend-starter`工程, 使用`pro.shushi.pamirs.starter.OinoneBackendStarterApp`作为main类启动

启动之后会有类似输出信息，表示启动成功

```shell
Oinone Backend Starter App 启动耗时 54.168926917 s
```

# 七、运行前端
## （一）安装依赖、启动
```bash
# 初始化安装依赖
npm i

# 开发模式启动
npm run dev
```

## （二）配置接口地址
### 1. `适合生产环境使用`将.env 里面的 API_BASE_URL 改为自己需要配置的地址
### 2. `适合开发环境使用` vue.config.js 内 devServer.proxy.pamirs.target 的值修改为自己需要配置的地址
> 方法 1 的优先级高于方法 2，如果想要方法 2 生效，需要把方法 1 的配置删除
>

## （三）静态资源配置
```plain
├── public
└────static.zip
```

解压 static.zip 到 public 目录下

**建议将静态资源文件上传在 oss，然后将 .env 里面的`STATIC_IMG` 改成 oss 的地址**



## （四）目录结构
```plain
├── public 发布用的目录，index.html入口文件将在这里
│   └── static 静态资源
│
├── src 源代码
│   └── main.ts 应用入口文件 这里会注册providers/application.ts
├── .env 启动的环境变量，后端api的请求地址在这里
├── package.json 包描述文件
├── tsconfig.json ts配置文件，可配置语法校验
└── vue.config.js vue的配置文件，里面可以配置webpack参数和开发模式的后端api请求地址

```

