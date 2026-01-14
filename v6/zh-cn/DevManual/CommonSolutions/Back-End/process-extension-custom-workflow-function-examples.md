---
title: 流程扩展：流程扩展自定义函数示例代码汇总
index: true
category:
  - 常见解决方案
order: 53
---

# 一、流程节点审批人函数
在业务流程处理中，涵盖了转交、抄送、加签、填写以及通知人等自定义函数。当平台所默认提供的审批人选择机制难以契合具有个性化特点的业务需求之际，我们能够借助自定义函数，对审批人的生成逻辑展开针对性处理。

## （一）编写自定义审批人函数
```java
@Function(openLevel = {FunctionOpenEnum.API})
@Function.Advanced(type = FunctionTypeEnum.QUERY, displayName = "报销单-证明人-审批", category = CUSTOM_DESIGNER)
public List<NodePerson> bizZmrApprovePerson(List<NodePerson> nodePersonList, NodeModel nodeModel, WorkflowContext workflowContext) {
    List<NodePerson> newNodePersonList = new ArrayList<>();
    String nodeModelId = nodeModel.getId();
    Object nodeData = workflowContext.get(nodeModelId);
    BuissModel inputBuissModel = JsonUtils.parseObject(JsonUtils.toJSONString(nodeData), BUISSMODEL_TR);
    BuissModel buissModel = new BuissModel().setId(inputBuissModel.getId()).queryById();
    buissModel.fieldQuery(BuissModel::getZmEmployee);
    BxEmployee zmEmployee = buissModel.getZmEmployee();
    if (zmEmployee == null) {
        log.error("报销单ID:{},名称:{}, 获取证明人为空", buissModel.getId(), buissModel.getName());
        return newNodePersonList;
    }
    NodePersonUser personUser = new NodePersonUser();
    List<NodePersonUser> nodePersonUsers = new ArrayList<>();
    NodePerson person = new NodePerson();
    person.setId(zmEmployee.getBindingUserId() + "");
    person.setType(NodePersonTypeEnum.USER);
    personUser.setUserId(zmEmployee.getBindingUserId());
    nodePersonUsers.add(personUser);
    person.setNodePersonUsers(nodePersonUsers);
    newNodePersonList.add(person);

    return newNodePersonList;
}

```

## （二）流程设计器的审批节点设置自定义函数
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/WX20231204-144055-20250530144830203.png)



# 二、审批开始前执行函数
> 使用场景：在流程执行到审批或填写节点任务初始化后，任务尚未开始，需要在初始化任务做一些自定义逻辑处理时，使用该扩展
执行时间：执行节点是在审批或填写待办任务初始化之后，审批或填写结果执行之前，执行该扩展
>

```java
/**
 * 审批节点初始化完成，执行前置函数
 * @param approvalNode
 * @param context
 * @param taskInstance
 */
@Function(name = "approvalCustomStartFun",openLevel = FunctionOpenEnum.API)
@Function.Advanced(type= FunctionTypeEnum.QUERY,displayName = "审批执行前置处理",category = FunctionCategoryEnum.CUSTOM_DESIGNER )
public void approvalCustomStartFun(ApprovalNode approvalNode, WorkflowContext context, WorkflowTaskInstance taskInstance) {
    // TODO: 2024/2/23 可以根据结果自己处理业务逻辑
}

```

# 三、填写执行前执行函数
```java
/**
* 填写执行前置处理
*/
@Function(name = "writeCustomStartFun", openLevel = FunctionOpenEnum.API)
@Function.Advanced(type = FunctionTypeEnum.QUERY, displayName = "填写执行前置处理", category = FunctionCategoryEnum.CUSTOM_DESIGNER)
public void writeCustomStartFun(WorkflowTaskInstance taskInstance, WriteNode writeNode, WorkflowContext context) {
    System.out.println("填写执行前置处理");
}

```

# 四、待办操作提交后执行函数
> 使用场景：在审批或填写的待办任务在操作任务时，需要额外执行一些逻辑，比如当前人提交操作以后需要更新更当前人操作相关的数据库记录，
执行时间：执行节点是在保存待办任务之后，异步执行审批或填写结果之前，执行该扩展
>

```java
/**
 * 转交操作后置函数,再流程设计器中审批和填写节点中 扩展设置-填写操作提交后执行函数选择
 * @param userTask 用户待办记录
 * @return 待办记录
 */
@Function(name = "transformOrgSelectEndFun",openLevel = FunctionOpenEnum.API)
@Function.Advanced(type= FunctionTypeEnum.QUERY,displayName = "转交操作后置函数",category = FunctionCategoryEnum.CUSTOM_DESIGNER )
public WorkflowUserTask transformOrgSelectEndFun(WorkflowUserTask userTask) {
//可针对操作类型进行过滤
// 转交操作后
if (!WorkflowUserTaskOperateTypeEnum.APPROVE_TRANGER.equals(userTask.getOperateType())) {
    return userTask;
}
// TODO: 2023/11/21 可自定义补充业务逻辑 userTask对应中数据为本次提交T的数据

// 审批同意的情况下
if (WorkflowUserTaskOperateTypeEnum.APPROVE_AGREE.equals(userTask.getOperateType())) {
    // TODO
}

// 审批拒绝的情况下
if (WorkflowUserTaskOperateTypeEnum.APPROVE_REJUST.equals(userTask.getOperateType())) {
    // TODO
}

return userTask;
}
```

# 五、审批操作数据函数
> 使用场景：在审批或填写执行过程中审批同意或则填写提交时，需要额外更改其他的业务数据逻辑，如审批同意后需要修改关联数据状态之类
执行时间：在审批或填写执行过程中审批同意或则填写提交后执行完业务数据保存后，执行该扩展
>

```java
/**
 * 审批后数据处理
 * @param approvalNode 审批节点
 * @param context 上下文
 * @param dataJson 审批提交数据
 * @param result 审批结果
 */
@Function(name = "approvalDataProcessFun",openLevel = FunctionOpenEnum.API)
@Function.Advanced(type= FunctionTypeEnum.QUERY,displayName = "审批后数据处理",category = FunctionCategoryEnum.CUSTOM_DESIGNER )
public void approvalDataProcessFun(ApprovalNode approvalNode, WorkflowContext context, String dataJson, Boolean result) {
    //审批数据提交数据内容
    Map<String, Object> data = JsonUtils.parseMap(dataJson);
    Long id = ParamUtils.createLong(data.get("id"));
    //可根据审批结果来处理自定义数据--通过
    if(result != null && result){
        // TODO: 2024/2/23 可以根据结果自己处理业务逻辑
    }


    //拒绝
    if(result != null && !result){
        // TODO: 2024/2/23 可以根据结果自己处理业务逻辑
    }
}
```

