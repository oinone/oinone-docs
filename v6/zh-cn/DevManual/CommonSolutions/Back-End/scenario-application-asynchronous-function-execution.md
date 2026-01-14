---
title: 场景应用：函数之异步执行
index: true
category:
  - 常见解决方案
order: 6
---

# 一、总体介绍
异步任务是一种极为常见的开发模式，在分布式开发模式下存在诸多应用场景，具体如下：

+ 在高并发场景中，通常采取将长流程进行切分缩短的策略，运用异步方式去除可异步处理的非关键功能，以此缩减主流程的响应时间，进而提升用户体验。
+ 针对异构系统的集成调用，借助异步任务达成解耦以及自动重试。
+ 作为分布式系统实现最终一致性的可选方案。

本文将阐述 Oinone 如何结合 Spring + TbSchedule 来实现异步任务。

# 二、构建第一个异步任务
## （一）新建 PetShopService 和 PetShopServiceImpl
+ 新建 PetShopService 定义 updatePetShops 方法

```java
package pro.shushi.pamirs.demo.api.service;

import pro.shushi.pamirs.demo.api.model.PetShop;
import pro.shushi.pamirs.meta.annotation.Fun;
import pro.shushi.pamirs.meta.annotation.Function;

import java.util.List;

@Fun(PetShopService.FUN_NAMESPACE)
public interface PetShopService {
    String FUN_NAMESPACE = "demo.PetShop.PetShopService";

    @Function
    void updatePetShops(List<PetShop> petShops);
}
```

+ PetShopServiceImpl 实现 PetShopService 接口并在 updatePetShops 增加 @XAsync 注解

```java
package pro.shushi.pamirs.demo.core.service;

import org.springframework.stereotype.Component;
import pro.shushi.pamirs.demo.api.model.PetShop;
import pro.shushi.pamirs.demo.api.service.PetShopService;
import pro.shushi.pamirs.meta.annotation.Fun;
import pro.shushi.pamirs.meta.annotation.Function;
import pro.shushi.pamirs.trigger.annotation.XAsync;
import java.util.List;

@Fun(PetShopService.FUN_NAMESPACE)
@Component
public class PetShopServiceImpl implements PetShopService {
    @Override
    @Function
    @XAsync(displayName = "异步批量更新宠物商店",limitRetryNumber = 3,nextRetryTimeValue = 60)
    public void updatePetShops(List<PetShop> petShops) {
        new PetShop().updateBatch(petShops);
    }
}
```

a. displayName = "异步批量更新宠物商店"，此参数用于定义异步任务的展示名称 。
b. limitRetryNumber = 3，该参数用于定义任务失败时的重试次数，默认值为 -1，即表示不断重试 。
c. nextRetryTimeValue = 60，此参数用于定义任务失败后重试的时间数，默认值为 3 。
d. nextRetryTimeUnit，此参数用于定义任务失败重试的时间单位，默认值为 TimeUnitEnum.SECOND 。
e. delayTime，该参数用于定义任务延迟执行的时间数，默认值为 0 。
f. delayTimeUnit，此参数用于定义任务延迟执行的时间单位，默认值为 TimeUnitEnum.SECOND 。

## （二）修改 PetShopBatchUpdateAction 调用异步任务
1. 引入 PetShopService
2. 修改 conform 方法，调用`petShopService.updatePetShops`方法

```java
package pro.shushi.pamirs.demo.core.action;
@Model.model(PetShopBatchUpdate.MODEL_MODEL)
@Component
public class PetShopBatchUpdateAction {
    @Autowired
    private PetShopService petShopService;

    @Action(displayName = "确定",bindingType = ViewTypeEnum.FORM,contextType = ActionContextTypeEnum.SINGLE)
    public PetShopBatchUpdate conform(PetShopBatchUpdate data){
        List<PetShop> shops = ArgUtils.convert(PetShopProxy.MODEL_MODEL, PetShop.MODEL_MODEL,proxyList);
        // 调用异步任务
        petShopService.updatePetShops(shops);
    });
    return data;
}
}
```

# 三、不同应用如何隔离执行单元
在 schedule 跟模块部署一起的时候，多模块独立 boot 的情况下，需要做必要的配置。如果 schedule 独立部署则没有必要，因为全部走远程，不存在类找不到的问题。

1. 通过配置`pamirs.zookeeper.rootPath`，确保两组机器都能覆盖所有任务分片，这样不会漏数据。
2. 通过`pamirs.event.schedule.ownSign`来隔离。确保两组机器只取各自产生的数据，这样不会重复执行数据。

```yaml
pamirs:
  zookeeper:
    zkConnectString: 127.0.0.1:2181
    zkSessionTimeout: 60000
    rootPath: /demo
  event:
    enabled: true
    schedule:
      enabled: true
      ownSign: demo
spring:
  rocketmq:
    name-server: 127.0.0.1:9876
```

注：更多 YAML 配置请前往 [Module API](/zh-cn/DevManual/Reference/Back-EndFramework/module-API.md) 查阅。

