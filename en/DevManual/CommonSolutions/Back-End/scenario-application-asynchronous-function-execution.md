---
title: Scenario Application:Asynchronous Execution of Functions
index: true
category:
  - Common Solutions
order: 6
---

# I. Overall Introduction
Asynchronous tasks represent a highly common development pattern, finding extensive application in distributed development models. Specific scenarios include:

- In high-concurrency scenarios, strategies often involve splitting long processes to shorten them. Asynchronous approaches are used to remove non-critical functions that can be processed asynchronously, thereby reducing main process response time and enhancing user experience.
- For integration calls in heterogeneous systems, asynchronous tasks achieve decoupling and automatic retry mechanisms.
- As an optional solution for distributed systems to achieve eventual consistency.

This article describes how Oinone implements asynchronous tasks by integrating Spring + TbSchedule.

# II. Building the First Asynchronous Task

## (一) Creating PetShopService and PetShopServiceImpl
- Create PetShopService to define the updatePetShops method:

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

- PetShopServiceImpl implements the PetShopService interface and adds the @XAsync annotation to updatePetShops:

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
    @XAsync(displayName = "Asynchronous Batch Update of Pet Shops", limitRetryNumber = 3, nextRetryTimeValue = 60)
    public void updatePetShops(List<PetShop> petShops) {
        new PetShop().updateBatch(petShops);
    }
}
```

a. `displayName = "Asynchronous Batch Update of Pet Shops"`: Defines the display name of the asynchronous task.  
b. `limitRetryNumber = 3`: Defines the number of retries when the task fails (default: -1 for unlimited retries).  
c. `nextRetryTimeValue = 60`: Defines the retry interval in seconds after task failure (default: 3).  
d. `nextRetryTimeUnit`: Defines the time unit for retry intervals (default: `TimeUnitEnum.SECOND`).  
e. `delayTime`: Defines the delay time before task execution (default: 0).  
f. `delayTimeUnit`: Defines the time unit for delay (default: `TimeUnitEnum.SECOND`).

## (二) Modifying PetShopBatchUpdateAction to Invoke the Asynchronous Task
1. Import PetShopService.  
2. Modify the conform method to call `petShopService.updatePetShops`:

```java
package pro.shushi.pamirs.demo.core.action;
@Model.model(PetShopBatchUpdate.MODEL_MODEL)
@Component
public class PetShopBatchUpdateAction {
    @Autowired
    private PetShopService petShopService;

    @Action(displayName = "Confirm", bindingType = ViewTypeEnum.FORM, contextType = ActionContextTypeEnum.SINGLE)
    public PetShopBatchUpdate conform(PetShopBatchUpdate data) {
        List<PetShop> shops = ArgUtils.convert(PetShopProxy.MODEL_MODEL, PetShop.MODEL_MODEL, proxyList);
        // Invoke the asynchronous task
        petShopService.updatePetShops(shops);
    });
    return data;
}
}
```

# III. Isolating Execution Units for Different Applications
When the schedule is deployed together with modules in a multi-module independent boot scenario, necessary configurations are required. If the schedule is deployed independently, no configuration is needed, as all operations are remote and class not found issues do not occur.

1. Configure `pamirs.zookeeper.rootPath` to ensure both machine groups cover all task shards, preventing data loss.  
2. Use `pamirs.event.schedule.ownSign` for isolation, ensuring each group processes only its own data to avoid duplicate executions.

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

Note: For more YAML configurations, refer to [Module API](/en/DevManual/Reference/Back-EndFramework/module-API.md).