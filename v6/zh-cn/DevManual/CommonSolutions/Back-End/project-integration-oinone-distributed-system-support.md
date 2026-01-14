---
title: 项目整合：Oinone如何支持构建分布式项目
index: true
category:
  - 常见解决方案
order: 73
---

# 一、分布式调用下的[强制]约束
1. **强制性要求 - 分布式调用中的库使用**：在分布式调用场景下，base 库与 redis 必须共同使用，以确保系统数据交互与存储的一致性和高效性。
2. **强制性要求 - 设计器环境下的库一致性**：若环境中存在设计器，设计器所使用的 base 库与 redis 不仅要相互保持一致，还需与项目中其他部分所使用的 base 库和 redis 保持一致，从而保障整个系统数据环境的统一性。
3. **强制性要求 - 相同 base 库下数据源的一致性**：在同一个 base 库环境下，不同应用中相同模块的数据源务必保持一致，这对于维护数据的准确性与稳定性，以及不同应用间数据交互的顺畅性至关重要。
4. **强制性要求 - 项目中的分布式缓存包引入**：项目中必须引入分布式缓存包。具体可参考下文所提及的分布式包依赖内容，以满足系统在分布式架构下对缓存管理的需求。

# 二、分布式支持
## （一）分布式包依赖
+ 父pom的依赖管理中先加入 pamirs-distribution 的依赖

```xml
<dependency>
    <groupId>pro.shushi.pamirs</groupId>
    <artifactId>pamirs-distribution</artifactId>
    <version>${pamirs.distribution.version}</version>
    <type>pom</type>
    <scope>import</scope>
</dependency>
```

+ 启动的 boot 工程中增加 pamirs-distribution 相关包

```xml
<!-- 分布式服务发布 -->
<dependency>
    <groupId>pro.shushi.pamirs.distribution</groupId>
    <artifactId>pamirs-distribution-faas</artifactId>
</dependency>
<!-- 分布式元数据缓存 -->
<dependency>
    <groupId>pro.shushi.pamirs.distribution</groupId>
    <artifactId>pamirs-distribution-session</artifactId>
</dependency>
<dependency>
    <groupId>pro.shushi.pamirs.distribution</groupId>
    <artifactId>pamirs-distribution-gateway</artifactId>
</dependency>
```

+ 启动工程的 Application 中增加类注解 @EnableDubbo

```java
@EnableDubbo
public class XXXStdApplication {

    public static void main(String[] args) throws IOException {
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();
        // ………………………………
        log.info("XXXX Application loading...");
    }
}
```

## （二）修改 bootstrap.yml 文件
注意序列化方式：serialization: pamirs

 以下只是一个示例（ zk 为注册中心），注册中心支持 zk 和 Nacos；

```yaml
spring:
  profiles:
    active: dev
  application:
    name: pamirs-demo
  cloud:
    service-registry:
      auto-registration:
        enabled: false
pamirs:
  default:
    environment-check: true
    tenant-check: true

---
spring:
  profiles: dev
  cloud:
    service-registry:
      auto-registration:
        enabled: false
    config:
      enabled: false
      uri: http://127.0.0.1:7001
      label: master
      profile: dev
    nacos:
      server-addr: http://127.0.0.1:8848
      discovery:
        enabled: false
        namespace:
        prefix: application
        file-extension: yml
      config:
        enabled: false
        namespace:
        prefix: application
        file-extension: yml
dubbo:
  application:
    name: pamirs-demo
    version: 1.0.0
  registry:
    address: zookeeper://127.0.0.1:2181
  protocol:
    name: dubbo
    port: -1
    serialization: pamirs
  scan:
    base-packages: pro.shushi
  cloud:
    subscribed-services:
  metadata-report:
    disabled: true
```

注：更多 YAML 配置请前往 [Module API](/zh-cn/DevManual/Reference/Back-EndFramework/module-API.md) 查阅。

## （三）模块启动的最⼩集
```yaml
pamirs:
  boot:
   init: true
   sync: true
   modules:
     - base
     - 业务工程的Module
```

注：更多 YAML 配置请前往 [Module API](/zh-cn/DevManual/Reference/Back-EndFramework/module-API.md) 查阅。

## **（四）业务模型间的依赖关系**
+ **服务调用方（Client 端）在启动 yml 配置方面**：服务调用方（即 Client 端）在启动 yml 文件的 `modules` 配置中，不应安装服务提供方的 Module。此操作旨在确保 Client 端启动配置的简洁性与针对性，避免引入不必要的模块，从而提高启动效率与系统稳定性。
+ **服务调用方（Client 端）在项目 pom 配置方面**：服务调用方（即 Client 端）的项目 pom 文件中，仅应依赖服务提供方的 API，也就是仅依赖服务提供方所定义的模型以及 API 接口。通过这种方式，Client 端能够明确界定依赖范围，专注于与服务提供方进行交互所需的核心接口部分，减少不必要的依赖带来的潜在风险，增强项目的可维护性与可扩展性。
+ **服务调用方（Client 端）在项目模块定义方面**：服务调用方（即 Client 端）在进行项目模块定义（即模型 Module 定义）时，需在 `dependencies` 配置中增添服务提供方的 Module。例如，如同下面示例代码中的 `FileModule`。这一操作能够使 Client 端在自身模块体系内，合理整合服务提供方相关功能模块，确保项目功能的完整性与连贯性，以实现与服务提供方的有效对接与协同工作。

```java
@Module(
    name = DemoModule.MODULE_NAME,
    displayName = "oinoneDemo工程",
    version = "1.0.0",
    dependencies = {ModuleConstants.MODULE_BASE, CommonModule.MODULE_MODULE,
                    FileModule.MODULE_MODULE, SecondModule.MODULE_MODULE/**服务提供方的模块定义*/
                   }
)
```

+ **服务调用方（Client 端）在启动类方面**，启动类的`ComponentScan`需要配置服务提供方API定义所在的包. 如下面示例中的：pro.shushi.pamirs.second

```java
@ComponentScan(
    basePackages = {"pro.shushi.pamirs.meta",
                    "pro.shushi.pamirs.framework",
                    "pro.shushi.pamirs",
                    "pro.shushi.pamirs.demo",
                    "pro.shushi.pamirs.second" /**服务提供方API定义所在的包*/
                   },
    excludeFilters = {
        @ComponentScan.Filter(
            type = FilterType.ASSIGNABLE_TYPE,
            value = {RedisAutoConfiguration.class, RedisRepositoriesAutoConfiguration.class,
                     RedisClusterConfig.class}
        )
    })
@Slf4j
@EnableTransactionManagement
@EnableAsync
@EnableDubbo
@MapperScan(value = "pro.shushi.pamirs", annotationClass = Mapper.class)
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class, FreeMarkerAutoConfiguration.class})
public class DemoApplication {
```

## **（五）模块启动顺序**
服务提供方的模块需先启动。原因：模块在启动过程中，会校验依赖模块是否存在。

## **（六）Dubbo日志相关**
关闭 Dubbo 元数据上报

```yaml
dubbo:
  metadata-report:
    disabled: true
```

关闭元数据上报，还有错误日志打印出来的话，可以在 log 中配置

```yaml
logging:
  level:
    root: info
    pro.shushi.pamirs.framework.connectors.data.mapper.PamirsMapper: info
    pro.shushi.pamirs.framework.connectors.data.mapper.GenericMapper: info # mybatis sql日志
    RocketmqClient: error
    # Dubbo相关的日志
    org.apache.dubbo.registry.zookeeper.ZookeeperRegistry: error
    org.apache.dubbo.registry.integration.RegistryDirectory: error
    org.apache.dubbo.registry.client.metadata.store.RemoteMetadataServiceImpl: off
    org.apache.dubbo.metadata.store.zookeeper.ZookeeperMetadataReport: off
    org.apache.dubbo.metadata.store.nacos.NacosMetadataReport: off
```

注：更多 YAML 配置请前往 [Module API](/zh-cn/DevManual/Reference/Back-EndFramework/module-API.md) 查阅。

# 三、分布式支持-事务相关
## **（一）分布式事务解决方案**
完成某一个业务功能可能需要横跨多个服务，操作多个数据库。这就涉及到到了分布式事务，分布式事务就是为了保证不同资源服务器的数据一致性。典型的分布式事务场景：

+ 跨库事务， 补充具体场景 ；
+ 微服务拆分带来的跨内部服务；
+ 微服务拆分带来的跨外部服务；

## **（二）事务策略**
采用微服务架构，需考虑分布式事务问题(即平台各子系统之间的数据一致性)。

+ 对于单个系统/模型内部, 比如：库存中心、账户中心等，采用强事务的方式。比如：在扣减库存的时候，库存日志和库存数列的变化在一个事务中，保证两个表的数据同时成功或者失败。 强事务管理采用编码式，Oinone 事务管理兼容 Spring 的事务管理方式；
+ **为了提高系统的可用性、可扩展性和性能，对于某些关键业务和数据一致性要求特别高的场景，采用强一致性外，其他的场景建议采用最终一致性的方案；** 对于分布式事务采用最终数据一致性，借助可靠消息和 Job 等方式来实现。

### **1、基于MQ的事务消息**
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/1746616805917-f685efa8-893b-46e9-82c0-9e3873ce12ea-20250530144823403.webp)

采用最终一致性方案，基于 MQ 的事务消息的方式。 事务消息的逻辑由发送端 Producer 进行保证(消费端无需考虑)。基于 MQ 事务消息的实现步骤：

+ 首先，发送一个事务消息，MQ 将消息状态标记为 Prepared，注意此时这条消息消费者是无法消费到的。
+ 接着，执行业务代码逻辑，可能是一个本地数据库事务操作 。
+ 确认发送消息，这个时候，MQ 将消息状态标记为可消费，这个时候消费者，才能真正的保证消费到这条数据。

### **2、基于JOB的补偿**
定期校对：业务活动的被动方，根据定时策略，向业务活动主动方查询(主动方提供查询接口)，恢复丢失的业务消息。

### **3、数据一致性**
+ 对 RPC 超时和重试机制设计的检查，是否会带来重复数据
+ 对数据幂等、去重机制的设计是否有考虑到
+ 对事务、数据(最终)一致性设计是否有考虑到
+ 数据缓存时，当数据发生变化时，是否有相应的机制保证缓存数据的一致性和有效性

