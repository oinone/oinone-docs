---
title: 启动时：后端启动常见问题
index: true
category:
  - 常见问题（faq）
order: 4
---
# **一、Windows报错:Command line is too long**

**Windows启动如出现以下报错，直接点击 JAR manifest 即可**

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/FAQ/1756950311280-569daf9b-01e8-49d0-b1dc-ea5555892f18.png)

# **二、出现“境信息检查不通过，请根据以上提示信息进行修改"**

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/FAQ/1756950389846-d66b7e4c-7512-484b-957e-b426cf8171e7.png)

**问题原因：**

+ Oinone启动的过程中有环境检验，同base库同Redis下中间件和版本不一致导致的校验失败

**查找具体报错：**

+ 在看到报错信息后，日志向前翻(即看更早的日志)会看到`错误的环境信息 `，有打印出具体的环境不一致的信息

**解决办法：**

+ 修改项目的YAML文件中的配置，保持同环境下的中间件配置和DB配置一致

# **三、出现“创建数据库错误"**

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/FAQ/1756950583431-e0479999-2315-4aad-8902-e2619ab2e658.png)

**问题原因：**

+ 可能是网络不通；也可能是因为开了防火墙，导致连接不上数据库；

**解决办法：**

+ 检查网络的互通性
+ 如果有防火墙，关闭防火墙：`systemctl stop firewalld` 或者放开对应的端口

# **四、出现“公共环境开启了元数据保护模式"**

```xml
Caused by: java.lang.UnsupportedOperationException: 公共环境开启了元数据保护模式，本地开发环境需配置 [pamirs.distribution.session.ownSign]
    at pro.shushi.pamirs.boot.standard.service.MetadataProtectedChecker.unsupportedLocalOperation(MetadataProtectedChecker.java:70)
    at pro.shushi.pamirs.boot.standard.service.MetadataProtectedChecker.process(MetadataProtectedChecker.java:63)
    at pro.shushi.pamirs.boot.common.spi.service.boot.DefaultBootModuleLifecycleBegin.run(DefaultBootModuleLifecycleBegin.java:35)
    at pro.shushi.pamirs.boot.common.process.PamirsBootMainProcessor.lambda$installOrLoad$2(PamirsBootMainProcessor.java:89)
    at pro.shushi.pamirs.boot.common.spi.api.boot.BootModuleLifecycleAroundApi.run(BootModuleLifecycleAroundApi.java:30)
    at pro.shushi.pamirs.boot.common.process.PamirsBootMainProcessor.installOrLoad(PamirsBootMainProcessor.java:66)
    at pro.shushi.pamirs.boot.common.initial.PamirsBootMainInitial.installOrLoad(PamirsBootMainInitial.java:119)
    at java.util.concurrent.CompletableFuture$AsyncRun.run$$$capture(CompletableFuture.java:1640)
    at java.util.concurrent.CompletableFuture$AsyncRun.run(CompletableFuture.java)
    at java.util.concurrent.CompletableFuture$AsyncRun.exec(CompletableFuture.java:1632)
    at java.util.concurrent.ForkJoinTask.doExec$$$capture(ForkJoinTask.java:289)
    at java.util.concurrent.ForkJoinTask.doExec(ForkJoinTask.java)
    at java.util.concurrent.ForkJoinPool$WorkQueue.runTask(ForkJoinPool.java:1056)
    at java.util.concurrent.ForkJoinPool.runWorker(ForkJoinPool.java:1692)
    at java.util.concurrent.ForkJoinWorkerThread.run(ForkJoinWorkerThread.java:175)
```

**问题原因：**

共环境下元数据保护机制正常的保护提示，防止元数据被意外修改

**解决办法：**

(一) 测试环境启动或体验阶段，可在启动配置增加【程序实参 (Program arguments)】`-PmetaProtected=pamirs` 后再进行启动。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/FAQ/1756950788326-c55f8711-a69d-461c-8291-3a9413421221.png)

(二) 多人协调场景参考 [协同开发常见问题](https://doc.oinone.top/oinone-faq/18544.html)

