---
title: 工作流（Workflow）
index: true
category:
  - 研发手册
  - Reference
  - 标准模块
order: 3

---
# 一、概述

本文将介绍 Oinone 工作流相关 API，旨在增强工作流在运行时的灵活性与可配置性。

# 二、依赖设置

 工作流运行时需要依赖相关模块

## （一）pom.xml依赖说明

```xml
<dependency>
    <groupId>pro.shushi.pamirs.workflow</groupId>
    <artifactId>pamirs-workflow-api</artifactId>
</dependency>
<dependency>
    <groupId>pro.shushi.pamirs.workflow</groupId>
    <artifactId>pamirs-workflow-core</artifactId>
</dependency>
<dependency>
    <groupId>pro.shushi.pamirs.core</groupId>
    <artifactId>pamirs-sql-record-core</artifactId>
</dependency>
<dependency>
    <groupId>pro.shushi.pamirs.core</groupId>
    <artifactId>pamirs-trigger-core</artifactId>
</dependency>
<dependency>
    <groupId>pro.shushi.pamirs.core</groupId>
    <artifactId>pamirs-trigger-bridge-tbschedule</artifactId>
</dependency>
<dependency>
    <groupId>pro.shushi.pamirs.framework</groupId>
    <artifactId>pamirs-connectors-event-rocketmq</artifactId>
</dependency>
```

## （二）application.yml配置说明

```yaml
spring:
  rocket-mq:
  # enabled 为 false情况不用配置
  namesrv-addr: 192.168.6.2:19876
...

pamirs:
...

  record:
    sql:
      #改成自己路径
      store: /opt/pamirs/logs
...

  boot:
    init: true
    sync: true
    modules:
...
      - sql_record
      - trigger
      - workflow
...

  sharding:
    define:
      data-sources:
        ds:
          pamirs
      models:
        "[trigger.PamirsSchedule]":
          tables: 0..13

  event:
    enabled: true
    schedule:
      enabled: true
      # ownSign区分不同应用
      ownSign: demo
    trigger:
      auto-trigger: true
```

# 三、工作流API介绍

:::warning 提示

以下API描述中皆为模型触发工作流，涉及模型为触发工作流模型。

:::

## （一）工作流人工触发

人工触发（手动触发）工作流，用于非自动触发的场景。

### 1. 实现手动触发

```java
/**
 * 手动触发
 * 
 * 代码中<触发模型>需替换为自己的流程触发业务模型
 *
 * @param workflowD WorkflowD 工作流定义
 * @param modelData 用户触发工作流的业务数据
 * @return Boolean 状态
 */
public Boolean startWorkflow(WorkflowD workflowD, IdModel modelData) {
    WorkflowDefinition workflowDefinition = new WorkflowDefinition().queryOneByWrapper(
        Pops.<WorkflowDefinition>lambdaQuery()
        .from(WorkflowDefinition.MODEL_MODEL)
        .eq(WorkflowD::getModel, <触发模型>.MODEL_MODEL));
    .eq(WorkflowDefinition::getWorkflowCode, workflowD.getCode())
    .eq(WorkflowDefinition::getActive, 1)
    );
    if (null == workflowDefinition) {
        // 流程没有运⾏实例
        return Boolean.FALSE;
    }
    String model = Models.api().getModel(modelData);

    //⼯作流上下⽂
    WorkflowDataContext wdc = new WorkflowDataContext();
    wdc.setDataType(WorkflowVariationTypeEnum.ADD);
    wdc.setModel(model);
    wdc.setWorkflowDefinitionDefinition(workflowDefinition.parseContent());
    wdc.setWorkflowDefinition(workflowDefinition);
    wdc.setWorkflowDefinitionId(workflowDefinition.getId());
    // 数据快照
    IdModel copyData = KryoUtils.get().copy(modelData);
    // ⼿动触发创建的动作流,将操作⼈设置为当前⽤户,作为流程的发起⼈
    copyData.setCreateUid(PamirsSession.getUserId());
    copyData.setWriteUid(PamirsSession.getUserId());
    String jsonData = JsonUtils.toJSONString(copyData.get_d());
    //触发⼯作流 新增时触发-onCreateManual 更新时触发-onUpdateManual
    Fun.run(WorkflowModelTriggerFunction.FUN_NAMESPACE, "onCreateManual", wdc, "0", jsonData);
    return Boolean.TRUE;
}
```

### 2. 业务调用手动触发

代码中根据业务相关性获取工作流定义，这里示例以工作流编码方式查找。

```java
@Action(displayName = "触发工作流")
public <触发模型> triggerWorkflow(<触发模型> data) {
    // 示例以工作流编码查找工作流元数据
    WorkflowD workflowD = new WorkflowD();
    workflowD.setCode("WF0000000000003000"); 
    // 调用上文中手动触发工作流实现
    startWorkflow(workflowD, data);
    return data;
}
```

## （二）、自定义流程参与人

通过配置函数自定义工作流审批人，实现流程参与人(包含: 转交、抄送、加签、填写、通知人)的运行时灵活配置。

```java
/*
 * 自定义流程参与人
 * @param nodePersonList 当前节点参与人
 * @param nodeModel 当前节点与模型相关元数据
 * @param workflowContext 流程上下文
 *
 * @return 自定义流程参与人列表
 */
@Function(openLevel = {FunctionOpenEnum.API})
@Function.Advanced(
    type = FunctionTypeEnum.QUERY,
    displayName = "自定义流程参与人",
    // 必须设置函数分组为 CUSTOM_DESIGNER
    category = FunctionCategoryEnum.CUSTOM_DESIGNER
)
public List<NodePerson> customPerson(List<NodePerson> nodePersonList, NodeModel nodeModel, WorkflowContext workflowContext) {
    List<NodePerson> newNodePersonList = new ArrayList<>();
    String nodeModelId = nodeModel.getId();
    Object nodeData = workflowContext.get(nodeModelId);
    // 反序列化业务数据
    BuissModel inputBuissModel = JsonUtils.parseObject(JsonUtils.toJSONString(nodeData), BUISSMODEL_TR);
    // 反查业务数据
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



## （三）、自定义审批前执行函数

使用场景：在流程执行到审批节点任务初始化后，任务尚未开始，需要在初始化任务做一些自定义逻辑处理时，使用该扩展。  
执行时间：执行节点是在审批待办任务初始化之后，审批执行之前，执行该扩展。

```java
/**
 * 审批节点初始化完成，执行前置函数
 * @param approvalNode 审批节点数据
 * @param context 工作流上下文
 * @param taskInstance 工作流待办实例
 */
@Function(name = "approvalCustomStartFun",openLevel = FunctionOpenEnum.API)
@Function.Advanced(type= FunctionTypeEnum.QUERY,displayName = "审批执行前置处理",category = FunctionCategoryEnum.CUSTOM_DESIGNER )
public void approvalCustomStartFun(ApprovalNode approvalNode, WorkflowContext context, WorkflowTaskInstance taskInstance) {
    // TODO: 2024/2/23 可以根据结果自己处理业务逻辑
}
```

## （四）、自定义填写前执行函数

使用场景：在流程执行到填写节点任务初始化后，任务尚未开始，需要在初始化任务做一些自定义逻辑处理时，使用该扩展  
执行时间：执行节点是在填写待办任务初始化之后，填写结果执行之前，执行该扩展

```java
/**
 * 填写执行前置处理
 * 
 * @param taskInstance 工作流待办实例
 * @param writeNode 填写节点数据
 * @param context 工作流上下文
 */
@Function(name = "writeCustomStartFun", openLevel = FunctionOpenEnum.API)
@Function.Advanced(type = FunctionTypeEnum.QUERY, displayName = "填写执行前置处理", category = FunctionCategoryEnum.CUSTOM_DESIGNER)
public void writeCustomStartFun(WorkflowTaskInstance taskInstance, WriteNode writeNode, WorkflowContext context) {
    System.out.println("填写执行前置处理");
}
```

## （五）、待办操作提交后执行函数

使用场景：在审批或填写的待办任务在操作任务时，需要额外执行一些逻辑，比如当前人提交操作以后需要更新更当前人操作相关的数据库记录。  
执行时间：执行节点是在保存待办任务之后，异步执行审批或填写结果之前，执行该扩展。

```java
/**
 * 转交操作后置函数,再流程设计器中审批和填写节点中 扩展设置-填写操作提交后执行函数选择
 *
 * @param userTask 用户待办记录
 * @return 用户待办
 */
@Function(name = "transformEndFun",openLevel = FunctionOpenEnum.API)
@Function.Advanced(type= FunctionTypeEnum.QUERY,displayName = "转交操作后置函数",category = FunctionCategoryEnum.CUSTOM_DESIGNER )
public WorkflowUserTask transformEndFun(WorkflowUserTask userTask) {
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

## （六）、审批操作数据函数

使用场景：在审批或填写执行过程中审批同意或则填写提交时，需要额外更改其他的业务数据逻辑，如审批同意后需要修改关联数据状态之类。  
执行时间：在审批或填写执行过程中审批同意或则填写提交后执行完业务数据保存后，执行该扩展。

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

## （七）、【撤销】回调钩子

使用场景：当流程实例被撤销时, 需要额外更改其他的业务数据逻辑时可用该回调钩子。

:::info 注意

该函数的namespace需要设置为流程触发模型。

:::

```java
/**
 * 对应返回不影响流程上下文
 * @param data 入参为触发时的业务数据，数据的JsonString
 * @return 可选返回
 */
@Function
public <替换为流程触发模型> recall(String data) {
    // TODO: 根据实际的业务逻辑把data转换为业务对象
    业务模型类 object = JsonUtils.parseObject(data, new TypeReference<业务模型类>(){});
    // TODO: 增加自定义业务逻辑
    return new <替换为流程触发模型>();
}
```

## （八）、【回退】回调钩子

使用场景：流程待办进行回退操作时，需要额外更改其他的业务数据逻辑时可用该回调钩子。

:::info 注意

该函数的namespace需要设置为流程触发模型。

:::

```java
/**
 * 对应返回不影响流程上下文
 * @param data 入参为触发时的业务数据，数据的JsonString
 * @return 可选返回
 */
@Function
public <替换为流程触发模型> fallBack(String data) {
    // TODO: 根据实际的业务逻辑把data转换为对象
    业务模型类 object = JsonUtils.parseObject(data, new TypeReference<业务模型类>(){});
    // TODO: 增加自定义业务逻辑
    return new <替换为流程触发模型>();
}
```

## （九）、【拒绝】回调钩子

使用场景：流程待办进行回退操作时，需要额外更改其他的业务数据逻辑时可用该回调钩子。

:::info 注意

该函数的namespace需要设置为流程触发模型。

:::

```java
/**
 * XXX为当前流程触发方式为模型触发时对应的触发模型
 * 回调钩子
 *
 * @param data 入参为触发时的业务数据，数据的JsonString
 * @return 可选返回
 */
@Function
public <替换为流程触发模型> reject(String data) {
    // TODO: 根据实际的业务逻辑把data转换为对象
    业务模型类 object = JsonUtils.parseObject(data, new TypeReference<业务模型类>(){});
    // TODO: 增加自定义业务逻辑
    return new <替换为流程触发模型>();
}
```

## （十）、【反悔】回调钩子

使用场景：流程待办进行反悔操作时，需要额外更改其他的业务数据逻辑时可用该回调钩子。

:::info 注意

该函数的namespace需要设置为流程触发模型。

:::

```java
@Function
@Function.fun(WorkflowBizCallConstants.retract)
public void retract(WorkflowUserTask workflowUserTask) {
  // 获取流程实例
  workflowUserTask.fieldQuery(WorkflowUserTask::getInstance);
  WorkflowInstance instance = workflowUserTask.getInstance();
  // 获取用户任务实例
  WorkflowUserInstance userInstance = new WorkflowUserInstance()
          .setId(workflowUserTask.getWorkflowUserInstanceId())
          .queryById();
  // 反悔的用户id
  Long userId = workflowUserTask.getUserId();
  // 反悔的节点id
  String nodeId = workflowUserTask.getNodeId();
}
```

## （十一）、自定义审批方式

使用场景：代码方式设置流程运行时审批方式

```java
@Model.model(替换为流程触发模型.MODEL_MODEL)
@Component
public class 替换为流程触发模型Action {

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
    @Function.Advanced(
        category = FunctionCategoryEnum.CUSTOM_DESIGNER, 
        displayName = "测试自定义审批类型"
    )
    public WorkflowSignTypeEnum signType(String json) {
        // 传入json为业务数据，可用JsonUtils转换为业务模型数据，用于获取业务数据上下文
        // 业务模型类 object = JsonUtils.parseObject(data, new TypeReference<业务模型类>(){});
        // TODO: 增加自定义业务逻辑
        return WorkflowSignTypeEnum.COUNTERSIGN_ONEAGREE_ONEREJUST;
    }
}
```



## （十二）、自定义审批节点名称

使用场景：代码方式动态设置流程审批节点名称。

```java
@Model.model(替换为流程触发模型.MODEL_MODEL)
@Component
public class 替换为流程触发模型Action {
    /**
     * 自定义审批节点名称
     * @return String
     */
    @Function
    @Function.Advanced(
        category = FunctionCategoryEnum.CUSTOM_DESIGNER, 
        displayName = "测试自定义审批名称"
    )
    public String customApprovalName() {
        return UUID.randomUUID().toString();
    }
}
```

## （十三）、自定义流程设计器审批人公司列表

打开弹窗时会默认选中返回的第一个公司，ALL_COMPANY表示所有公司。

```java
@Order(10)
@Component
@SPI.Service
public class CustomWorkflowCompanyQueryApi implements WorkflowCompanyQueryApi {

    @Override
    public Pagination<PamirsCompany> queryPage(Pagination<PamirsCompany> page, IWrapper<PamirsCompany> queryWrapper) {
        // 示例：仅显示所有公司
        Pagination<PamirsCompany> pageResult = new Pagination<>();
        pageResult.setContent(Lists.newArrayList(ALL_COMPANY));
        pageResult.setTotalPages(1);
        return pageResult;
    }

    //@Override
    //public Pagination<PamirsCompany> queryPage(Pagination<PamirsCompany> page, IWrapper<PamirsCompany> queryWrapper) {
    //    // 示例：不显示所有公司
    //    return new PamirsCompany().queryPage(page, queryWrapper);
    //}
}
```
