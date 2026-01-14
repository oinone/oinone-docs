---
title: 配置说明：函数之触发与定时配置和示例
index: true
category:
  - 常见解决方案
order: 68
---

# 一、异步任务总体介绍
在众多应用场景中，函数的触发与定时机制具有至关重要的作用，同时，这也是 Oinone 平台所具备的一项基础且核心的能力。以 Oinone 的流程产品为例，当用户在定义流程触发条件时，系统会为其提供选择，可选择基于模型触发，亦或是基于时间触发。这种设计方式充分借助了函数的触发与定时能力，能够满足不同业务流程对于触发条件多样化的需求，从而使用户可以根据实际业务场景，灵活且精准地设定流程启动的时机，进一步提升了产品在流程管理方面的灵活性与适应性。
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/1235-1024x651-20250530144823048.png)

# 二、触发任务TriggerTaskAction
+ **触发任务的创建流程**：借助 sql - record 模块对 mysql 的 binlog 事件予以监听。一旦监听到相关事件，便通过 rocketmq 发送包含变更数据的消息。当接收到此 MQ 消息后，系统会随即创建 TriggerAutoTask。这一过程实现了从数据库操作日志监听，到消息传递，再到任务创建的一系列自动化流程，确保触发任务能够依据数据库变更及时生成。
+ **触发任务的执行流程**：运用 TBSchedule 工具拉取已创建的触发任务。在成功拉取任务后，系统将执行与之对应的函数，从而完成整个触发任务从创建到执行的完整闭环操作，实现业务逻辑的自动化处理。

## （一）项目中引入依赖
1、项目的 API 工程引入依赖 pamirs-core-trigger 模块

```xml
<dependency>
  <groupId>pro.shushi.pamirs.core</groupId>
  <artifactId>pamirs-trigger-api</artifactId>
</dependency>
```

2、DemoModule 在模块依赖定义中增加 `@Module(dependencies={TriggerModule.MODULE_MODULE})`

```java
@Component
@Module(
    name = DemoModule.MODULE_NAME,
    displayName = "oinoneDemo工程",
    version = "1.0.0",
    dependencies = {ModuleConstants.MODULE_BASE, CommonModule.MODULE_MODULE, UserModule.MODULE_MODULE, TriggerModule.MODULE_MODULE}
)
@Module.module(DemoModule.MODULE_MODULE)
@Module.Advanced(selfBuilt = true, application = true)
@UxHomepage(PetShopProxy.MODEL_MODEL)
public class DemoModule implements PamirsModule {
    ……其他代码
}
```

3、项目的 boot 工程引入依赖

```xml
<dependency>
  <groupId>pro.shushi.pamirs.core</groupId>
  <artifactId>pamirs-trigger-core</artifactId>
</dependency>
<dependency>
  <groupId>pro.shushi.pamirs.core</groupId>
  <artifactId>pamirs-trigger-bridge-tbschedule</artifactId>
</dependency>
<dependency>
  <groupId>pro.shushi.pamirs.core</groupId>
  <artifactId>pamirs-sql-record-core</artifactId>
</dependency>

```

## （二）yml文件修改（applcation-xxx.yml）
+ 将配置参数 `pamris.event.enabled` 与 `pamris.event.schedule.enabled` 的值调整为 true。
+ 在 `pamirs_boot_modules` 中添加以下启动模块：trigger、sql_record。

```yaml
pamirs:
  record:
    sql:
      #改成自己路径
      store: /opt/pamirs/logs
...
event:
  enabled: true
  schedule:
    enabled: true
  rocket-mq:
    namesrv-addr: 127.0.0.1:9876
boot:
  init: true
  sync: true
  modules:
    - base
    -……
    - trigger
    - sql_record
    -……
```

注：更多 YAML 配置请前往 [Module API](/zh-cn/DevManual/Reference/Back-EndFramework/module-API.md) 查阅。

## （三）新建触发任务
创建名为 `PetTalentTrigger` 的类。该类被设定为，当 `PetTalent` 模型中的数据记录完成新建操作之后，系统将自动触发并执行一系列相关事务。

```java
  package pro.shushi.pamirs.demo.core.trigger;

import pro.shushi.pamirs.demo.api.model.PetTalent;
import pro.shushi.pamirs.meta.annotation.Fun;
import pro.shushi.pamirs.meta.annotation.Function;
import pro.shushi.pamirs.meta.annotation.fun.extern.Slf4j;
import pro.shushi.pamirs.trigger.annotation.Trigger;
import pro.shushi.pamirs.trigger.enmu.TriggerConditionEnum;

@Fun(PetTalent.MODEL_MODEL)
@Slf4j
public class PetTalentTrigger {
    @Function
    @Trigger(displayName = "PetTalent创建时触发",name = "PetTalent#Trigger#onCreate",condition = TriggerConditionEnum.ON_CREATE)
    public PetTalent onCreate(PetTalent data){
        log.info(data.getName() + "，被创建");
        //可以增加逻辑
        return data;
    }
}
```

# 三、定时任务
定时任务是一种非常常见的模式，这里就不介绍概念了，直接进入示例环节

## （一）新建 PetTalentAutoTask 实现 ScheduleAction
+ `getInterfaceName()` 的设定需与 `taskAction.setExecuteNamespace` 的定义保持一致，二者均为函数的命名空间。
+ `taskAction.setExecuteFun("execute")` 需与执行函数名 `execute` 保持一致。
+ `TaskType` 应配置为 `CYCLE_SCHEDULE_NO_TRANSACTION_TASK`，如此可将定时任务的 `schedule` 线程分离。否则，若存在一个执行时间较长的任务，将会致使普通异步任务或触发任务全部出现延时情况。

```java
package pro.shushi.pamirs.demo.core.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pro.shushi.pamirs.core.common.enmu.TimeUnitEnum;
import pro.shushi.pamirs.demo.api.model.PetTalent;
import pro.shushi.pamirs.meta.annotation.Fun;
import pro.shushi.pamirs.meta.annotation.Function;
import pro.shushi.pamirs.meta.annotation.fun.extern.Slf4j;
import pro.shushi.pamirs.meta.domain.fun.FunctionDefinition;
import pro.shushi.pamirs.middleware.schedule.api.ScheduleAction;
import pro.shushi.pamirs.middleware.schedule.common.Result;
import pro.shushi.pamirs.middleware.schedule.domain.ScheduleItem;
import pro.shushi.pamirs.middleware.schedule.eunmeration.TaskType;
import pro.shushi.pamirs.trigger.enmu.TriggerTimeAnchorEnum;
import pro.shushi.pamirs.trigger.model.ScheduleTaskAction;
import pro.shushi.pamirs.trigger.service.ScheduleTaskActionService;

@Slf4j
@Component
@Fun(PetTalent.MODEL_MODEL)
public class PetTalentAutoTask implements ScheduleAction {

    @Autowired
    private ScheduleTaskActionService scheduleTaskActionService;

    public void initTask(){
        ScheduleTaskAction taskAction = new ScheduleTaskAction();
        taskAction.setDisplayName("定时任务测试"); //定时任务描述
        taskAction.setDescription("定时任务测试");
        taskAction.setTechnicalName(PetTalent.MODEL_MODEL+"#"+PetTalentAutoTask.class.getSimpleName()+"#"+"testAutoTask");       //设置定时任务技术名
        taskAction.setLimitExecuteNumber(-1);   //设置执行次数
        taskAction.setPeriodTimeValue(1);       //设置执行周期规则
        taskAction.setPeriodTimeUnit(TimeUnitEnum.MINUTE);
        taskAction.setPeriodTimeAnchor(TriggerTimeAnchorEnum.START);
        taskAction.setLimitRetryNumber(1);      //设置失败重试规则
        taskAction.setNextRetryTimeValue(1);
        taskAction.setNextRetryTimeUnit(TimeUnitEnum.MINUTE);
        taskAction.setExecuteNamespace(PetTalent.MODEL_MODEL);
        taskAction.setExecuteFun("execute");
        taskAction.setExecuteFunction(new FunctionDefinition().setTimeout(5000));
        taskAction.setTaskType(TaskType.CYCLE_SCHEDULE_NO_TRANSACTION_TASK.getValue()); //设置定时任务，执行任务类型
        taskAction.setContext(null);            //用户传递上下文参数
        taskAction.setActive(true);             //定时任务是否生效
        taskAction.setFirstExecuteTime(System.currentTimeMillis());
        scheduleTaskActionService.submit(taskAction);//初始化任务,幂等可重复执行
    }

    @Override
    public String getInterfaceName() {return PetTalent.MODEL_MODEL;}

    @Override
    @Function
    public Result<Void> execute(ScheduleItem item) {
        log.info("testAutoTask,上次执行时间"+item.getLastExecuteTime());
        return new Result<>();
    }
}
```

## （二）修改 DemoModuleBizInit，进行定时任务初始化
在模块进行更新操作时，调用 `petTalentAutoTask.initTask()` 方法。鉴于 `initTask` 自身具备幂等性，因而多次调用亦无妨。在《模块之生命周期》一文中，对 `InstallDataInit`、`UpgradeDataInit` 以及 `ReloadDataInit` 均有相关介绍。

```java
package pro.shushi.pamirs.demo.core.init;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pro.shushi.pamirs.boot.common.api.command.AppLifecycleCommand;
import pro.shushi.pamirs.boot.common.api.init.InstallDataInit;
import pro.shushi.pamirs.boot.common.api.init.ReloadDataInit;
import pro.shushi.pamirs.boot.common.api.init.UpgradeDataInit;
import pro.shushi.pamirs.demo.api.DemoModule;
import pro.shushi.pamirs.demo.api.enumeration.DemoExpEnumerate;
import pro.shushi.pamirs.demo.core.task.PetTalentAutoTask;
import pro.shushi.pamirs.meta.common.exception.PamirsException;

import java.util.Collections;
import java.util.List;

@Component
public class DemoModuleBizInit implements InstallDataInit,
UpgradeDataInit, ReloadDataInit {

    @Autowired
    private PetTalentAutoTask petTalentAutoTask;

    @Override
    public boolean init(AppLifecycleCommand command, String version) {
        //安装指令执行逻辑
        initTask();
        return Boolean.TRUE;
    }

    @Override
    public boolean reload(AppLifecycleCommand command, String version) {
        //重启指令执行逻辑
        initTask();
        return Boolean.TRUE;
    }

    @Override
    public boolean upgrade(AppLifecycleCommand command, String version, String existVersion) {
        //升级指令执行逻辑
        initTask();
        return Boolean.TRUE;
    }

    @Override
    public List<String> modules() {
        return Collections.singletonList(DemoModule.MODULE_MODULE);
    }

    @Override
    public int priority() {return 0;}

    private void initTask() {
        petTalentAutoTask.initTask(); //初始化petTalent的定时任务
    }
}
```

