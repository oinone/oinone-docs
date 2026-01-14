---
title: 环境迁移：导入设计数据时dubbo超时导入失败
index: true
category:
  - 常见问题（faq）
order: 10
---
# 一、问题描述
在本地启动导入设计数据的工程时，会出现 dubbo 调用超时导致设计数据无法完整导入的问题。

```plain
org.apache.dubbo.remoting.TimeoutException
```

# 二、产生原因
pom 中的包依赖出现问题，导致没有使用正确的远程服务。

本地可能出现的异常报错堆栈信息如下：

```dart
Exception in thread "fixed-1-thread-10" PamirsException level: ERROR, code: 10100025, type: SYSTEM_ERROR, msg: 函数执行错误, extra:, extend: null
  at pro.shushi.pamirs.meta.common.exception.PamirsException$Builder.errThrow(PamirsException.java:190)
  at pro.shushi.pamirs.framework.faas.fun.manage.ManagementAspect.around(ManagementAspect.java:118)
  at sun.reflect.GeneratedMethodAccessor498.invoke(Unknown Source)
  at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
  at java.lang.reflect.Method.invoke(Method.java:498)
  at org.springframework.aop.aspectj.AbstractAspectJAdvice.invokeAdviceMethodWithGivenArgs(AbstractAspectJAdvice.java:644)
  at org.springframework.aop.aspectj.AbstractAspectJAdvice.invokeAdviceMethod(AbstractAspectJAdvice.java:633)
  at org.springframework.aop.aspectj.AspectJAroundAdvice.invoke(AspectJAroundAdvice.java:70)
  at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:175)
  at org.springframework.aop.framework.CglibAopProxy$CglibMethodInvocation.proceed(CglibAopProxy.java:749)
  at org.springframework.aop.interceptor.ExposeInvocationInterceptor.invoke(ExposeInvocationInterceptor.java:95)
  at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:186)
  at org.springframework.aop.framework.CglibAopProxy$CglibMethodInvocation.proceed(CglibAopProxy.java:749)
  at org.springframework.aop.framework.CglibAopProxy$DynamicAdvisedInterceptor.intercept(CglibAopProxy.java:691)
  at pro.shushi.pamirs.framework.orm.DefaultWriteApi$$EnhancerBySpringCGLIB$$b4cea2b4.createOrUpdateBatchWithResult(<generated>)
  at pro.shushi.pamirs.meta.base.manager.data.OriginDataManager.createOrUpdateBatchWithResult(OriginDataManager.java:161)
  at pro.shushi.pamirs.meta.base.manager.data.OriginDataManager.createOrUpdateBatch(OriginDataManager.java:152)
  at pro.shushi.pamirs.ui.designer.service.installer.UiDesignerInstaller.lambda$install$0(UiDesignerInstaller.java:42)
  at pro.shushi.pamirs.core.common.function.AroundRunnable.run(AroundRunnable.java:26)
  at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149)
  at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624)
  at java.lang.Thread.run(Thread.java:748)
Caused by: org.apache.dubbo.rpc.RpcException: Failed to invoke the method createOrUpdateBatchWithResult in the service org.apache.dubbo.rpc.service.GenericService. Tried 1 times of the providers [192.168.0.123:20880] (1/1) from the registry 127.0.0.1:2181 on the consumer 192.168.0.123 using the dubbo version 2.7.22. Last error is: Invoke remote method timeout. method: $invoke, provider: dubbo://192.168.0.123:20880/ui.designer.UiDesignerViewLayout.oio.defaultWriteApi?anyhost=true&application=pamirs-demo&application.version=1.0.0&check=false&deprecated=false&dubbo=2.0.2&dynamic=true&generic=true&group=pamirs&interface=ui.designer.UiDesignerViewLayout.oio.defaultWriteApi&metadata-type=remote&methods=*&payload=104857600&pid=69748&qos.enable=false&register.ip=192.168.0.123&release=2.7.15&remote.application=pamirs-test&retries=0&serialization=pamirs&service.name=ServiceBean:pamirs/ui.designer.UiDesignerViewLayout.oio.defaultWriteApi:1.0.0&side=consumer&sticky=false&timeout=5000&timestamp=1701136088893&version=1.0.0, cause: org.apache.dubbo.remoting.TimeoutException: Waiting server-side response timeout by scan timer. start time: 2023-11-28 10:23:05.835, end time: 2023-11-28 10:23:10.856, client elapsed: 695 ms, server elapsed: 4326 ms, timeout: 5000 ms, request: Request [id=0, version=2.0.2, twoway=true, event=false, broken=false, data=null], channel: /192.168.0.123:49449 -> /192.168.0.123:20880
  at org.apache.dubbo.rpc.cluster.support.FailoverClusterInvoker.doInvoke(FailoverClusterInvoker.java:110)
  at org.apache.dubbo.rpc.cluster.support.AbstractClusterInvoker.invoke(AbstractClusterInvoker.java:265)
  at org.apache.dubbo.rpc.cluster.interceptor.ClusterInterceptor.intercept(ClusterInterceptor.java:47)
  at org.apache.dubbo.rpc.cluster.support.wrapper.AbstractCluster$InterceptorInvokerNode.invoke(AbstractCluster.java:92)
  at org.apache.dubbo.rpc.cluster.support.wrapper.MockClusterInvoker.invoke(MockClusterInvoker.java:98)
  at org.apache.dubbo.registry.client.migration.MigrationInvoker.invoke(MigrationInvoker.java:170)
  at org.apache.dubbo.rpc.proxy.InvokerInvocationHandler.invoke(InvokerInvocationHandler.java:96)
  at org.apache.dubbo.common.bytecode.proxy0.$invoke(proxy0.java)
  at pro.shushi.pamirs.framework.faas.distribution.computer.RemoteComputer.compute(RemoteComputer.java:124)
  at pro.shushi.pamirs.framework.faas.FunEngine.run(FunEngine.java:80)
  at pro.shushi.pamirs.distribution.faas.remote.spi.service.RemoteFunctionHelper.run(RemoteFunctionHelper.java:68)
  at pro.shushi.pamirs.framework.faas.fun.manage.ManagementAspect.around(ManagementAspect.java:109)
  ... 20 more
Caused by: java.util.concurrent.ExecutionException: org.apache.dubbo.remoting.TimeoutException: Waiting server-side response timeout by scan timer. start time: 2023-11-28 10:23:05.835, end time: 2023-11-28 10:23:10.856, client elapsed: 695 ms, server elapsed: 4326 ms, timeout: 5000 ms, request: Request [id=0, version=2.0.2, twoway=true, event=false, broken=false, data=null], channel: /192.168.0.123:49449 -> /192.168.0.123:20880
  at java.util.concurrent.CompletableFuture.reportGet(CompletableFuture.java:357)
  at java.util.concurrent.CompletableFuture.get(CompletableFuture.java:1915)
  at org.apache.dubbo.rpc.AsyncRpcResult.get(AsyncRpcResult.java:181)
  at org.apache.dubbo.rpc.protocol.AsyncToSyncInvoker.invoke(AsyncToSyncInvoker.java:61)
  at org.apache.dubbo.rpc.listener.ListenerInvokerWrapper.invoke(ListenerInvokerWrapper.java:78)
  at org.apache.dubbo.rpc.filter.GenericImplFilter.invoke(GenericImplFilter.java:125)
  at org.apache.dubbo.rpc.protocol.FilterNode.invoke(FilterNode.java:61)
  at pro.shushi.pamirs.distribution.faas.remote.filter.ServiceConsumerContextFilter.invoke(ServiceConsumerContextFilter.java:26)
  at org.apache.dubbo.rpc.protocol.FilterNode.invoke(FilterNode.java:61)
  at org.apache.dubbo.monitor.support.MonitorFilter.invoke(MonitorFilter.java:91)
  at org.apache.dubbo.rpc.protocol.FilterNode.invoke(FilterNode.java:61)
  at org.apache.dubbo.rpc.protocol.dubbo.filter.FutureFilter.invoke(FutureFilter.java:52)
  at org.apache.dubbo.rpc.protocol.FilterNode.invoke(FilterNode.java:61)
  at org.apache.dubbo.rpc.filter.ConsumerContextFilter.invoke(ConsumerContextFilter.java:69)
  at org.apache.dubbo.rpc.protocol.FilterNode.invoke(FilterNode.java:61)
  at org.apache.dubbo.rpc.protocol.InvokerWrapper.invoke(InvokerWrapper.java:56)
  at org.apache.dubbo.rpc.cluster.support.FailoverClusterInvoker.doInvoke(FailoverClusterInvoker.java:79)
  ... 31 more
Caused by: org.apache.dubbo.remoting.TimeoutException: Waiting server-side response timeout by scan timer. start time: 2023-11-28 10:23:05.835, end time: 2023-11-28 10:23:10.856, client elapsed: 695 ms, server elapsed: 4326 ms, timeout: 5000 ms, request: Request [id=0, version=2.0.2, twoway=true, event=false, broken=false, data=null], channel: /192.168.0.123:49449 -> /192.168.0.123:20880
  at org.apache.dubbo.remoting.exchange.support.DefaultFuture.doReceived(DefaultFuture.java:205)
  at org.apache.dubbo.remoting.exchange.support.DefaultFuture.received(DefaultFuture.java:170)
  at org.apache.dubbo.remoting.exchange.support.DefaultFuture$TimeoutCheckTask.notifyTimeout(DefaultFuture.java:288)
  at org.apache.dubbo.remoting.exchange.support.DefaultFuture$TimeoutCheckTask.lambda$run$0(DefaultFuture.java:275)
  at org.apache.dubbo.common.threadpool.ThreadlessExecutor$RunnableWrapper.run(ThreadlessExecutor.java:196)
  at org.apache.dubbo.common.threadpool.ThreadlessExecutor.waitAndDrain(ThreadlessExecutor.java:99)
  at org.apache.dubbo.rpc.AsyncRpcResult.get(AsyncRpcResult.java:179)
  ... 45 more
```

# 三、正确情况
导入设计数据时，应使用`pro.shushi.pamirs.metadata.manager.core.api.IUiDesignerInstaller`接口直接调用远程服务，不应涉及方法内部的远程调用逻辑。

# 四、解决方案
检查界面设计器相关依赖，是否仅使用了 api 包。

:::danger 警告：

注释表示必须移除的依赖项

:::

```xml
<dependency>
  <groupId>pro.shushi.pamirs.designer</groupId>
  <artifactId>pamirs-ui-designer-api</artifactId>
</dependency>
<!-- <dependency>-->
<!--   <groupId>pro.shushi.pamirs.designer</groupId>-->
<!--   <artifactId>pamirs-ui-designer-core</artifactId>-->
<!-- </dependency>-->
<!-- <dependency>-->
<!--   <groupId>pro.shushi.pamirs.designer</groupId>-->
<!--   <artifactId>pamirs-ui-designer-view</artifactId>-->
<!-- </dependency>-->
<!-- <dependency>-->
<!--   <groupId>pro.shushi.pamirs.designer</groupId>-->
<!--   <artifactId>pamirs-ui-designer-widget-data</artifactId>-->
<!-- </dependency>-->
<!-- <dependency>-->
<!--   <groupId>pro.shushi.pamirs.designer</groupId>-->
<!--   <artifactId>pamirs-ui-designer-widget-biz</artifactId>-->
<!-- </dependency>-->
```

在yaml配置文件中，检查是否移除了ui_designer相关模块的启动配置。

:::danger 警告：

注释表示必须移除的依赖项

:::

```yaml
pamirs:
  boot:
    modules:
      # - ui_designer
      # - ui_designer_data_widget
      # - ui_designer_biz_widget
```

