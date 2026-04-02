---
title: Environment Upgrade:Cache Connection Switched from Jedis to Lettuce
index: true
category:
  - Common Solutions
order: 58
---
# Ⅰ、Differences between Jedis and Lettuce

+ Jedis is synchronous and does not support asynchrony. The Jedis client instance is not thread-safe, so each thread needs a Jedis instance. Therefore, Jedis is generally used through a connection pool.
+ Lettuce is an event-driven Redis client based on the Netty framework. Its method calls are asynchronous. The Lettuce API is also thread-safe, so multiple threads can operate a single Lettuce connection to complete various operations. At the same time, Lettuce also supports connection pools.

# Ⅱ、Switching from Jedis to Lettuce

## （Ⅰ）Dependency Modification

Changes to the pom.xml of the boot startup project

properties

``` xml
<lettuce.version>5.3.6.RELEASE</lettuce.version>
<commons-pool2.version>2.8.1</commons-pool2.version>
```

dependencies

``` xml
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

## （Ⅱ）Configuration Modification

Modifications to the application.yml configuration

``` yaml
spring:
  redis:
    database: 0
    host: 127.0.0.1
    port: 6379
    prefix: pamirs
    timeout: 2000
    # Optional
    password: xxxxx
    # Optional
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