---
title: 流程扩展：工作流审核撤回-回退-拒绝钩子使用
index: true
category:
  - 常见解决方案
order: 52
---
# 一、工作流【撤销】回调钩子
使用方式：把该方法放置到 XXX 模型的 Action 下面，或`@Fun(XXX.MODEL_MODEL)`
触发方式：当流程实例被撤销时
调用入口：`pro.shushi.pamirs.workflow.app.core.service.impl.WorkflowInstanceServiceImpl#undoInstance`

```java
/**
 * XXX为当前流程触发方式为模型触发时对应的触发模型、
 * 对应返回不影响流程上下文
 * @param data 入参为触发时的业务数据，数据的JsonString
 * @return
 */
@Function
public XXX recall(String data) {
    // TODO: 根据实际的业务逻辑把data转换为对象
    WorkRecord workRecord = JsonUtils.parseObject(data, new TypeReference<WorkRecord>(){});
    // TODO: 增加自定义业务逻辑
    return new XXX();
}
```

# 二、撤销【回退】回调钩子
使用方式：把该方法放置到 XXX 模型的 Action 下面，或`@Fun(XXX.MODEL_MODEL)`
触发方式：流程待办进行回退操作时
调用入口:`pro.shushi.pamirs.workflow.app.core.service.operator.ApprovalFallbackOperatorService`

```java
/**
 * XXX为当前流程触发方式为模型触发时对应的触发模型
 * 对应返回不影响流程上下文
 * @param data 入参为触发时的业务数据，数据的JsonString
 * @return
 */
@Function
public XXX fallBack(String data) {
    // TODO: 根据实际的业务逻辑把data转换为对象
    WorkRecord workRecord = JsonUtils.parseObject(data, new TypeReference<WorkRecord>(){});
    // TODO: 增加自定义业务逻辑
    return new XXX();
}
```

# 三、工作流【拒绝】回调钩子
使用方式：把该方法放置到 XXX 模型的 Action 下面，或`@Fun(XXX.MODEL_MODEL)
`触发方式：流程待办进行拒绝操作时
调用入口:`pro.shushi.pamirs.workflow.app.core.service.operator.ApprovalFallbackOperatorService`

```java
/**
 * XXX为当前流程触发方式为模型触发时对应的触发模型
 * 对应返回不影响流程上下文
 * @param data 入参为触发时的业务数据，数据的JsonString
 * @return
 */
@Function
public XXX reject(String data) {
    // TODO: 根据实际的业务逻辑把data转换为对象
    WorkRecord workRecord = JsonUtils.parseObject(data, new TypeReference<WorkRecord>(){});
    // TODO: 增加自定义业务逻辑
    return new XXX();
}
```

# 四、回调钩子在业务系统中的调用示例
```java
@Function(summary = "发起的流程撤销时会自动调用此方法")
@Function.Advanced(displayName = "撤销流程")
public PurchaseProjectProxy recall(String data) {
    Object tempObj = BeanDefinitionUtils.findFirst(ClientDataConverter.class).out(PurchaseProjectProxy.MODEL_MODEL, JsonUtils.parseMap(data));
    PurchaseProjectProxy proxy = BeanDefinitionUtils.getBean(ClientDataConverter.class)
    .<PurchaseProjectProxy>in(new ModelComputeContext(), PurchaseProjectProxy.MODEL_MODEL, tempObj);

    PurchaseProject purchaseProject = service.recall(ArgUtils.convert(PurchaseProjectProxy.MODEL_MODEL, PurchaseProject.MODEL_MODEL, proxy));
    return ArgUtils.convert(PurchaseProject.MODEL_MODEL, PurchaseProjectProxy.MODEL_MODEL, purchaseProject);
}
```

# 五、自定义审批方式、自定义审批节点名称
流程自定义函数需指定：`category = FunctionCategoryEnum.CUSTOM_DESIGNER`

```java
@Model.model(审批模型.MODEL_MODEL)
@Component
public class 审批模型Action {

    /**
     * 自定义审批方式
     * @param json json为业务数据，可用JsonUtils转换
     * @return 返回参数：
     * COUNTERSIGN_ONEAGREE_ONEREJUST 或签（一名审批人同意或拒绝即可）
     * COUNTERSIGN_ALLAGREE_ONEREJUST 会签（需所有审批人同意才为同意，一名审批人拒绝即为拒绝）
     * COUNTERSIGN_ONEAGREE_ALLREJUST 会签（一名审批人同意即为同意，需所有审批人拒绝才为拒绝）
     * SINGLE 单人
     */
    @Function
    @Function.Advanced(category = FunctionCategoryEnum.CUSTOM_DESIGNER, displayName = "测试自定义审批类型")
    public WorkflowSignTypeEnum signType(String json) {
        // TODO: 增加自定义业务逻辑
        return WorkflowSignTypeEnum.COUNTERSIGN_ONEAGREE_ONEREJUST;
    }

    /**
     * 自定义审批节点名称
     * @return
     */
    @Function
    @Function.Advanced(category = FunctionCategoryEnum.CUSTOM_DESIGNER, displayName = "测试自定义审批名称")
    public String customApprovalName() {
        return UUID.randomUUID().toString();
    }
}
```


