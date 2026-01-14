---
title: Process Extension:Workflow Audit Withdrawal, Rollback, and Rejection Hook Usage
index: true
category:
  - Common Solutions
order: 52
---

# I. Workflow [Undo] Callback Hook
Usage: Place this method under the Action of the XXX model or use `@Fun(XXX.MODEL_MODEL)`
Trigger Condition: When the process instance is undone
Invocation Entry Point: `pro.shushi.pamirs.workflow.app.core.service.impl.WorkflowInstanceServiceImpl#undoInstance`

```java
/**
 * XXX corresponds to the trigger model when the current workflow trigger method is model-triggered.
 * The return value does not affect the process context.
 * @param data The input parameter is the business data at the time of triggering, in JSON string format.
 * @return
 */
@Function
public XXX recall(String data) {
    // TODO: Convert the data into an object based on actual business logic
    WorkRecord workRecord = JsonUtils.parseObject(data, new TypeReference<WorkRecord>(){});
    // TODO: Add custom business logic
    return new XXX();
}
```

# II. Undo [Rollback] Callback Hook
Usage: Place this method under the Action of the XXX model or use `@Fun(XXX.MODEL_MODEL)`
Trigger Condition: When a workflow task is rolled back
Invocation Entry Point: `pro.shushi.pamirs.workflow.app.core.service.operator.ApprovalFallbackOperatorService`

```java
/**
 * XXX corresponds to the trigger model when the current workflow trigger method is model-triggered.
 * The return value does not affect the process context.
 * @param data The input parameter is the business data at the time of triggering, in JSON string format.
 * @return
 */
@Function
public XXX fallBack(String data) {
    // TODO: Convert the data into an object based on actual business logic
    WorkRecord workRecord = JsonUtils.parseObject(data, new TypeReference<WorkRecord>(){});
    // TODO: Add custom business logic
    return new XXX();
}
```

# III. Workflow [Reject] Callback Hook
Usage: Place this method under the Action of the XXX model or use `@Fun(XXX.MODEL_MODEL)`
Trigger Condition: When a workflow task is rejected
Invocation Entry Point: `pro.shushi.pamirs.workflow.app.core.service.operator.ApprovalFallbackOperatorService`

```java
/**
 * XXX corresponds to the trigger model when the current workflow trigger method is model-triggered.
 * The return value does not affect the process context.
 * @param data The input parameter is the business data at the time of triggering, in JSON string format.
 * @return
 */
@Function
public XXX reject(String data) {
    // TODO: Convert the data into an object based on actual business logic
    WorkRecord workRecord = JsonUtils.parseObject(data, new TypeReference<WorkRecord>(){});
    // TODO: Add custom business logic
    return new XXX();
}
```

# IV. Example of Callback Hook Invocation in Business System
```java
@Function(summary = "This method is automatically called when the initiated workflow is undone.")
@Function.Advanced(displayName = "Undo Workflow")
public PurchaseProjectProxy recall(String data) {
    Object tempObj = BeanDefinitionUtils.findFirst(ClientDataConverter.class).out(PurchaseProjectProxy.MODEL_MODEL, JsonUtils.parseMap(data));
    PurchaseProjectProxy proxy = BeanDefinitionUtils.getBean(ClientDataConverter.class)
    .<PurchaseProjectProxy>in(new ModelComputeContext(), PurchaseProjectProxy.MODEL_MODEL, tempObj);

    PurchaseProject purchaseProject = service.recall(ArgUtils.convert(PurchaseProjectProxy.MODEL_MODEL, PurchaseProject.MODEL_MODEL, proxy));
    return ArgUtils.convert(PurchaseProject.MODEL_MODEL, PurchaseProjectProxy.MODEL_MODEL, purchaseProject);
}
```

# V. Custom Approval Methods and Custom Approval Node Names
Custom workflow functions must specify: `category = FunctionCategoryEnum.CUSTOM_DESIGNER`

```java
@Model.model(ApprovalModel.MODEL_MODEL)
@Component
public class ApprovalModelAction {

    /**
     * Custom approval method
     * @param json The business data in JSON format, which can be converted using JsonUtils
     * @return Return parameters:
     * COUNTERSIGN_ONEAGREE_ONEREJUST Parallel approval (one approver's approval or rejection takes effect)
     * COUNTERSIGN_ALLAGREE_ONEREJUST Concurrent approval (all approvers must approve; one rejection leads to rejection)
     * COUNTERSIGN_ONEAGREE_ALLREJUST Concurrent approval (one approval leads to approval; all rejections lead to rejection)
     * SINGLE Single approver
     */
    @Function
    @Function.Advanced(category = FunctionCategoryEnum.CUSTOM_DESIGNER, displayName = "Test Custom Approval Type")
    public WorkflowSignTypeEnum signType(String json) {
        // TODO: Add custom business logic
        return WorkflowSignTypeEnum.COUNTERSIGN_ONEAGREE_ONEREJUST;
    }

    /**
     * Custom approval node name
     * @return
     */
    @Function
    @Function.Advanced(category = FunctionCategoryEnum.CUSTOM_DESIGNER, displayName = "Test Custom Approval Name")
    public String customApprovalName() {
        return UUID.randomUUID().toString();
    }
}
```