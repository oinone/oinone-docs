---
title: 项目整合：Oinone项目引入Nacos作为注册中心
index: true
category:
  - 常见解决方案
order: 74
---

# 一、概述
:::info 注意：

+ Oinone 项目的默认 dubbo 注册中心为 zk, 实际项目中有可能要求用 Nacos 作注册中心。
+ Oinone 默认引入的 nacos-client-1.4.1，低版本不支持认证配置；该客户端版本支持 Nacos 服务1.x的和2.x的版本

:::

# 二、项目中增加依赖
项目主 pom 引入依赖。

```xml
<dependency>
    <groupId>org.apache.dubbo</groupId>
    <artifactId>dubbo-registry-nacos</artifactId>
    <version>2.7.22</version>
</dependency>

```

项目的 boot 工程的 pom 引入依赖

```xml
<dependency>
    <groupId>org.apache.dubbo</groupId>
    <artifactId>dubbo-registry-nacos</artifactId>
</dependency>

```

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/nacos-registry-1024x392-20250530144825300.png)

# 三、配置修改
修改 dubbo 服务注册到 nacos

bootstrap.yml 文件的配置，或者 application.yml 文件中修改 dubbo 的配置

```yaml
dubbo:
  application:
    name: pamirs-demo
    version: 1.0.0
  registry:
    id: pamirs-demo-registry
    address: nacos://192.168.0.118:8848
    username: nacos # 认证的用户名(根据情况自行修改)，未开启认证可以不需要配置username和password
    password: nacos # 认证的密码(根据情况自行修改)，未开启认证可以不需要配置username和password
    # dubbo使用nacos的注册中心往配置中心写入配置关闭配置
    use-as-metadata-center: false
    use-as-config-center: false
  config-center:
    address: nacos://192.168.0.118:8848
    username: nacos # 认证的用户名(根据情况自行修改)，未开启认证可以不需要配置username和password
    password: nacos # 认证的密码(根据情况自行修改)，未开启认证可以不需要配置username和password
  metadata-report:
    failfast: false # 关闭错误上报的功能
    address: nacos://192.168.0.118:8848
    username: nacos # 认证的用户名(根据情况自行修改)，未开启认证可以不需要配置username和password
    password: nacos # 认证的密码(根据情况自行修改)，未开启认证可以不需要配置username和password
  protocol:
    name: dubbo
    port: -1
    serialization: pamirs
  scan:
    base-packages: pro.shushi
  cloud:
    subscribed-services:
```

# 四、Oinone构建分布式项目一些注意点
## （一）Oinone远程服务发布范围
泛化服务范围，可选值：module、namespace
module：按模块维度发布远程服务
namespace：按 Fun 的 namespace 维度发布远程服务
默认按 module 维度发布服务

```yaml
pamirs:
  distribution:
    service:
     #serviceScope: 可选值namespace、module
     serviceScope: module
```

## （二）关闭Dubbo服务注册元数据上报日志
```yaml
logging:
 level:
   root: info
   pro.shushi.pamirs.framework.connectors.data.mapper.PamirsMapper: error
   pro.shushi.pamirs.framework.connectors.data.mapper.GenericMapper: error # mybatis sql日志
   RocketmqClient: error
   org.apache.dubbo.registry.zookeeper.ZookeeperRegistry: error
   org.apache.dubbo.registry.integration.RegistryDirectory: error
   org.apache.dubbo.config.ServiceConfig: error
   com.alibaba.nacos.client.naming: error
   org.apache.dubbo.registry.nacos.NacosRegistry: error
   org.apache.dubbo.registry.support.AbstractRegistryFactory: error
   org.apache.dubbo.registry.integration.RegistryProtocol: error
   org.apache.dubbo.registry.client.metadata.store.RemoteMetadataServiceImpl: off
   org.apache.dubbo.metadata.store.zookeeper.ZookeeperMetadataReport: off
   org.apache.dubbo.metadata.store.nacos.NacosMetadataReport: off
```

## （三）Naocs配置列表出现多余配置
dubbo 集成 nacos 注册中心，会出现多余的配置，详细参考：
配置列表会自动创建很多无关的配置: [https://github.com/apache/dubbo/issues/6645](https://github.com/apache/dubbo/issues/6645)
配置列表出现多余的配置：[https://github.com/alibaba/nacos/issues/8843](https://github.com/alibaba/nacos/issues/8843)

按照下面的配置可以将其关闭

:::info 注意：

主要是这三项配置 use-as-config-center， use-as-metadata-center，metadata-report.failfast），已生成的配置需要手动删除掉。

:::

```yaml
dubbo:
 application:
   name: pamirs-demo
   version: 1.0.0
   metadata-type: local
 registry:
   id: pamirs-demo-registry
   address: nacos://192.168.0.129:8848
   username: nacos
   password: nacos
   # dubbo使用nacos的注册中心往配置中心写入配置关闭配置
   use-as-metadata-center: false
   use-as-config-center: false
 config-center:
   address: nacos://192.168.0.129:8848
   username: nacos
   password: nacos
 metadata-report:
   failfast: false # 关闭错误上报的功能
   address: nacos://192.168.0.129:8848
   username: nacos
   password: nacos
 protocol:
   name: dubbo
   port: -1
   serialization: pamirs
 scan:
   base-packages: pro.shushi
 cloud:
   subscribed-services:
```

注：更多 YAML 配置请前往 [Module API](/zh-cn/DevManual/Reference/Back-EndFramework/module-API.md) 查阅。

