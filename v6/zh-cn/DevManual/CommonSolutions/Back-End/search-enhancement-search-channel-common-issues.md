---
title: 搜索增强：引入搜索(增强模型Channel)常见问题解决办法
index: true
category:
  - 常见解决方案
order: 21
---

# 一、总体描述
引入 Oinone 的搜索（即 Channel 模块）后，因错误的配置、缺少配置或者少引入一些Jar包，会出现一些报错。

# 二、启动报类JCTree找不到
## （一）具体现象
启动过程可能会出现报错：
`java.lang.NoClassDefFoundError: com/sun/tools/javac/tree/JCTree$JCExpression`

## （二）产生原因
在引入 Channel 模块后，系统启动流程将执行对 Class 包的扫描操作，旨在查找带有 Enhance 注解的相关内容。值得注意的是，Pamirs 底层架构在运行过程中会调用 JDK 的 tools 包中的类，具体涉及到 `com/sun/tools/javac/tree/JCTree$JCExpression` 类。

需着重指出的是，特定版本的 JDK 或许会出现缺少 tools.jar 文件的情况，这种缺失极有可能导致系统启动失败。

## （三）具体报错
```java
    at org.springframework.boot.loader.Launcher.launch(Launcher.java:107) [pamirs-venus-boot.jar:na]
    at org.springframework.boot.loader.Launcher.launch(Launcher.java:58) [pamirs-venus-boot.jar:na]
    at org.springframework.boot.loader.JarLauncher.main(JarLauncher.java:88) [pamirs-venus-boot.jar:na]
    Caused by: java.util.concurrent.ExecutionException: java.lang.NoClassDefFoundError: com/sun/tools/javac/tree/JCTree$JCExpression
    at java.util.concurrent.CompletableFuture.reportGet(CompletableFuture.java:357) ~[na:1.8.0_381]
    at java.util.concurrent.CompletableFuture.get(CompletableFuture.java:1908) ~[na:1.8.0_381]
    at pro.shushi.pamirs.boot.common.initial.PamirsBootMainInitial.init(PamirsBootMainInitial.java:66) ~[pamirs-boot-api-4.6.10.jar!/:na]
    at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method) ~[na:1.8.0_381]
    at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62) ~[na:1.8.0_381]
    at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43) ~[na:1.8.0_381]
    at java.lang.reflect.Method.invoke(Method.java:498) ~[na:1.8.0_381]
    at org.springframework.context.event.ApplicationListenerMethodAdapter.doInvoke(ApplicationListenerMethodAdapter.java:305) ~[spring-context-5.2.12.RELEASE.jar!/:5.2.12.RELEASE]
    ... 20 common frames omitted
Caused by: java.lang.NoClassDefFoundError: com/sun/tools/javac/tree/JCTree$JCExpression
    at java.lang.Class.forName0(Native Method) ~[na:1.8.0_381]
    at java.lang.Class.forName(Class.java:264) ~[na:1.8.0_381]
    at pro.shushi.pamirs.meta.util.ClassUtils.getClasses(ClassUtils.java:157) ~[pamirs-meta-model-4.6.8.jar!/:na]
    at pro.shushi.pamirs.meta.util.ClassUtils.getClassesByPacks(ClassUtils.java:73) ~[pamirs-meta-model-4.6.8.jar!/:na]
    at pro.shushi.pamirs.channel.core.manager.EnhanceModelScanner.enhanceModel(EnhanceModelScanner.java:51) ~[pamirs-channel-core-4.6.15.jar!/:na]
    at pro.shushi.pamirs.channel.core.init.ChannelSystemBootAfterInit.init(ChannelSystemBootAfterInit.java:31)
```

## （四）解决办法
+ 方式一【推荐】、配置 channel 的扫描路径

```yaml
pamirs:
  channel:
    packages:
      - com.pamirs.ic
```

+ 方式二、使用 Oracle 版本的 jdk，确保 jdk 的 lib 目录，tools.jar 有`com/sun/tools/javac/tree/JCTree`对应的类

# 三、启动报类 JsonProvider 找不到
## （一）具体报错
如果启动报错信息如下：

```java
Caused by: java.lang.NoClassDefFoundError: jakarta/json/spi/JsonProvider
    at java.lang.ClassLoader.defineClass1(Native Method) ~[na:1.8.0_181]
    at java.lang.ClassLoader.defineClass(ClassLoader.java:763) ~[na:1.8.0_181]
    at java.security.SecureClassLoader.defineClass(SecureClassLoader.java:142) ~[na:1.8.0_181]
    at java.net.URLClassLoader.defineClass(URLClassLoader.java:467) ~[na:1.8.0_181]
```

## （二）产生原因
项目中只引入了`pamirs-channel-core`，但未引入`elasticsearch`相关的包

## （三）解决办法
```xml
<dependency>
  <groupId>org.elasticsearch.client</groupId>
  <artifactId>elasticsearch-rest-client</artifactId>
  <version>8.4.1</version>
</dependency>
<dependency>
  <groupId>jakarta.json</groupId>
  <artifactId>jakarta.json-api</artifactId>
  <version>2.1.1</version>
</dependency>

```

