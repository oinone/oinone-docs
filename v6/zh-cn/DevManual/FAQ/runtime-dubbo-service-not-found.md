---
title: 运行时：Dubbo服务找不到
index: true
category:
  - 常见问题（faq）
order: 12
---
# 一、访问不相关的模块导致报错
## （一）报错信息
在新部署的一套服务体系中，并未启用 OA 模块，然而却出现了对 OA 服务进行调用的需求。这背后的原因是什么呢？

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/FAQ/1747642587890-2bebe93d-89ad-4965-965f-c70d382e4413.png)

## （二）解决方案
通过查看报错堆栈信息，能够明确系统运行过程中调用了 `DefaultHookApi` 服务。经分析，这是由于新部署项目的 base 库与 OA 项目的 base 库存在共用情况。在此情形下，有一个与 OA 相关的 hook 被注册。针对该问题，只需将 `base_hook` 表中与 OA 相关的 hook 记录删除，随后重启项目，即可解决此问题。

# 二、启动报错，提示 dubbo 远程调用找不到服务
## （一）报错信息
```dart
Caused by: org.apache.dubbo.rpc.RpcException: No provider available from registry 183.224.180.166:32182 for service pamirs/eip.oio.5000:1.0.0 on consumer 172.17.0.1 use dubbo version 2.7.22, please check status of providers(disabled, not registered or in blacklist).
    at org.apache.dubbo.registry.integration.DynamicDirectory.doList(DynamicDirectory.java:177) ~[dubbo-2.7.22.jar!/:2.7.22]
    at org.apache.dubbo.rpc.cluster.directory.AbstractDirectory.list(AbstractDirectory.java:99) ~[dubbo-2.7.22.jar!/:2.7.22]
```

## （二）解决方案
从报错信息可以看到，是找不到 pamirs/eip 服务，所以检查启动包里面有没有依赖 eip 包，并且启动模块里面也要加上 – eip

```xml
<dependency>
  <groupId>pro.shushi.pamirs.core</groupId>
  <artifactId>pamirs-eip2-api</artifactId>
</dependency>
```

# 三、not registered or in blacklist 报错
## （一）报错信息
```dart
Exception while fetching data(/manageEmployeeBaseQuery/queryPage) :
Noprovider available from registry 127.0.0.1:2181 for service
pamirs/AkdsjManage_core.oi0.5000:1.0.0 onconsumer 172.17.0.3 use dubbo version 2.7.22,
please check status of providers(disabled, not registered or in blacklist).
```

## （二）解决方案
报错现象：消费者读取不到服务方接口

1. 检查是否使用同一个 zookeeper
2. 检查消费方与服务方，网络是否互通
3. 检查相关服务是否注册到 dubbo 中


