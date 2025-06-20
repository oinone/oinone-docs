---
title: Process Extension:Summary of Custom Function Example Codes for Workflow Extension
index: true
category:
  - Common Solutions
order: 53
---

# I. Workflow Node Approver Function
In business process handling, custom functions for handover, cc, additional signature, filling, and notifiers are included. When the default approver selection mechanism provided by the platform cannot meet personalized business requirements, we can use custom functions to specifically process the generation logic of approvers.

## (一) Writing a Custom Approver Function
```java
@Function(openLevel = {FunctionOpenEnum.API})
@Function.Advanced(type = FunctionTypeEnum.QUERY, displayName = "Reimbursement Form - Certifier - Approval", category = CUSTOM_DESIGNER)
public List<NodePerson> bizZmrApprovePerson(List<NodePerson> nodePersonList, NodeModel nodeModel, WorkflowContext workflowContext) {
    List<NodePerson> newNodePersonList = new ArrayList<>();
    String nodeModelId = nodeModel.getId();
    Object nodeData = workflowContext.get(nodeModelId);
    BuissModel inputBuissModel = JsonUtils.parseObject(JsonUtils.toJSONString(nodeData), BUISSMODEL_TR);
    BuissModel buissModel = new BuissModel().setId(inputBuissModel.getId()).queryById();
    buissModel.fieldQuery(BuissModel::getZmEmployee);
    BxEmployee zmEmployee = buissModel.getZmEmployee();
    if (zmEmployee == null) {
        log.error("Reimbursement form ID:{}, name:{}, certifier is empty", buissModel.getId(), buissModel.getName());
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

## (二) Setting Custom Function for Approval Node in Process Designer
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/WX20231204-144055-20250530144830203.png)



# II. Function Executed Before Approval Starts
> Usage scenario: When custom logic processing is required during the initialization of an approval or filling node task before the task starts
Execution time: This extension is executed after the initialization of the approval or filling to-do task and before the execution of the approval or filling result
>

```java
/**
 * Execute pre-function after approval node initialization is completed
 * @param approvalNode
 * @param context
 * @param taskInstance
 */
@Function(name = "approvalCustomStartFun",openLevel = FunctionOpenEnum.API)
@Function.Advanced(type= FunctionTypeEnum.QUERY,displayName = "Pre-processing for Approval Execution",category = FunctionCategoryEnum.CUSTOM_DESIGNER )
public void approvalCustomStartFun(ApprovalNode approvalNode, WorkflowContext context, WorkflowTaskInstance taskInstance) {
    // TODO: 2024/2/23 Custom business logic processing can be added as needed
}
```

# III. Function Executed Before Filling
```java
/**
* Pre-processing for filling execution
*/
@Function(name = "writeCustomStartFun", openLevel = FunctionOpenEnum.API)
@Function.Advanced(type = FunctionTypeEnum.QUERY, displayName = "Pre-processing for Filling Execution", category = FunctionCategoryEnum.CUSTOM_DESIGNER)
public void writeCustomStartFun(WorkflowTaskInstance taskInstance, WriteNode writeNode, WorkflowContext context) {
    System.out.println("Pre-processing for filling execution");
}
```

# IV. Function Executed After Submitting To-Do Operations
> Usage scenario: When additional logic needs to be executed during the operation of an approval or filling to-do task, such as updating database records related to the current user's operation after submission
Execution time: This extension is executed after saving the to-do task and before asynchronously executing the approval or filling result
>

```java
/**
 * Post-handover operation function, selected in the extension settings of approval and filling nodes in the process designer - function executed after filling operation submission
 * @param userTask User to-do record
 * @return To-do record
 */
@Function(name = "transformOrgSelectEndFun",openLevel = FunctionOpenEnum.API)
@Function.Advanced(type= FunctionTypeEnum.QUERY,displayName = "Post-handover Operation Function",category = FunctionCategoryEnum.CUSTOM_DESIGNER )
public WorkflowUserTask transformOrgSelectEndFun(WorkflowUserTask userTask) {
// Filter by operation type
// After handover operation
if (!WorkflowUserTaskOperateTypeEnum.APPROVE_TRANGER.equals(userTask.getOperateType())) {
    return userTask;
}
// TODO: 2023/11/21 Custom business logic can be added, with userTask data corresponding to the submitted T data

// In case of approval agreement
if (WorkflowUserTaskOperateTypeEnum.APPROVE_AGREE.equals(userTask.getOperateType())) {
    // TODO
}

// In case of approval rejection
if (WorkflowUserTaskOperateTypeEnum.APPROVE_REJUST.equals(userTask.getOperateType())) {
    // TODO
}

return userTask;
}
```

# V. Approval Operation Data Function
> Usage scenario: When additional changes to other business data logic are required during approval or filling execution (e.g., modifying associated data status after approval agreement)
Execution time: This extension is executed after the business data is saved following approval agreement or filling submission during approval or filling execution
>

```java
/**
 * Data processing after approval
 * @param approvalNode Approval node
 * @param context Context
 * @param dataJson Submitted approval data
 * @param result Approval result
 */
@Function(name = "approvalDataProcessFun",openLevel = FunctionOpenEnum.API)
@Function.Advanced(type= FunctionTypeEnum.QUERY,displayName = "Data Processing After Approval",category = FunctionCategoryEnum.CUSTOM_DESIGNER )
public void approvalDataProcessFun(ApprovalNode approvalNode, WorkflowContext context, String dataJson, Boolean result) {
    // Content of submitted approval data
    Map<String, Object> data = JsonUtils.parseMap(dataJson);
    Long id = ParamUtils.createLong(data.get("id"));
    // Process custom data based on approval result - approved
    if(result != null && result){
        // TODO: 2024/2/23 Custom business logic processing can be added based on the result
    }


    // Rejected
    if(result != null && !result){
        // TODO: 2024/2/23 Custom business logic processing can be added based on the result
    }
}
```