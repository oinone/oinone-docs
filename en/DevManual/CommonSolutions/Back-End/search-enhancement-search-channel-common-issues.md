---
title: Search Enhancement:Common Problem Solutions for Introducing Search Enhancement Model Channel
index: true
category:
  - Common Solution Approaches
order: 21
---

# I. Overall Description
After introducing Oinone's search (i.e., the Channel module), errors may occur due to incorrect configurations, missing configurations, or missing JAR package introductions.

# II. Class JCTree Not Found During Startup
## (Ⅰ) Specific Phenomenon
An error may occur during startup:
`java.lang.NoClassDefFoundError: com/sun/tools/javac/tree/JCTree$JCExpression`

## (Ⅱ) Root Cause
After introducing the Channel module, the system startup process will execute a scan operation on the Class package to find content with the Enhance annotation. It is important to note that the Pamirs underlying architecture will call classes in the JDK's tools package during operation, specifically involving the `com/sun/tools/javac/tree/JCTree$JCExpression` class.

It should be emphasized that specific versions of the JDK may lack the tools.jar file, and this absence is highly likely to cause system startup failure.

## (Ⅲ) Specific Error Log
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

## (Ⅳ) Solutions
+ **Method 1 [Recommended]**: Configure the Channel scanning path
```yaml
pamirs:
  channel:
    packages:
      - com.pamirs.ic
```

+ **Method 2**: Use the Oracle JDK version and ensure that the tools.jar in the JDK's lib directory contains the corresponding class `com/sun/tools/javac/tree/JCTree`.

# III. Class JsonProvider Not Found During Startup
## (Ⅰ) Specific Error Log
If the startup error message is as follows:
```java
Caused by: java.lang.NoClassDefFoundError: jakarta/json/spi/JsonProvider
    at java.lang.ClassLoader.defineClass1(Native Method) ~[na:1.8.0_181]
    at java.lang.ClassLoader.defineClass(ClassLoader.java:763) ~[na:1.8.0_181]
    at java.security.SecureClassLoader.defineClass(SecureClassLoader.java:142) ~[na:1.8.0_181]
    at java.net.URLClassLoader.defineClass(URLClassLoader.java:467) ~[na:1.8.0_181]
```

## (Ⅱ) Root Cause
The project only introduces `pamirs-channel-core` but does not introduce `elasticsearch`-related packages.

## (Ⅲ) Solutions
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