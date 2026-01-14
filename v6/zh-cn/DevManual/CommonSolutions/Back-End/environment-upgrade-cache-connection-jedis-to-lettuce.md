---
title: 环境升级：缓存连接由Jedis切换为Lettuce
index: true
category:
  - 常见解决方案
order: 58
---
# 一、Jedis 和 Lettuce 的区别

+ Jedis 是同步的，不支持异步，Jedis 客户端实例不是线程安全的，需要每个线程一个 Jedis 实例，所以一般通过连接池来使用 Jedis；
+ Lettuce 是基于 Netty 框架的事件驱动的 Redis 客户端，其方法调用是异步的，Lettuce 的 API 也是线程安全的，所以多个线程可以操作单个 Lettuce 连接来完成各种操作，同时 Lettuce 也支持连接池；

# 二、Jedis 切换 Lettuce

## （一）依赖修改

boot 启动工程 pom.xml 改动

properties

```xml
<lettuce.version>5.3.6.RELEASE</lettuce.version>
<commons-pool2.version>2.8.1</commons-pool2.version>
```

dependencies

```xml
<dependency>
  <groupId>pro.shushi.pamirs.framework</groupId>
  <artifactId>pamirs-connectors-data-api</artifactId>
  <exclusions>
    <exclusion>
      <groupId>redis.clients</groupId>
      <artifactId>jedis</artifactId>
    </exclusion>
  </exclusions>
</dependency>
<dependency>
  <groupId>io.lettuce</groupId>
  <artifactId>lettuce-core</artifactId>
  <version>${lettuce.version}</version>
</dependency>
<dependency>
  <groupId>org.apache.commons</groupId>
  <artifactId>commons-pool2</artifactId>
  <version>${commons-pool2.version}</version>
</dependency>
```

## （二）配置修改

application.yml 配置修改

```yaml
spring:
  redis:
    database: 0
    host: 127.0.0.1
    port: 6379
    prefix: pamirs
    timeout: 2000
    # 可选
    password: xxxxx
    # 可选
    #  cluster:
    #    nodes:
    #      - 127.0.0.1:6379
    #    timeout: 2000
    #    max-redirects: 7
    lettuce:
      pool:
        enable: true
        max-idle: 16
        min-idle: 1
        max-active: 16
        max-wait: 2000
```

