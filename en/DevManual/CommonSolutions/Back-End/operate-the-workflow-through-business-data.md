---
title: Process expansion:Operate the workflow through business data (such as urging, canceling, etc.)
index: true
category:
  - Common Solutions
order: 53
---

# Ⅰ. Abstract Model, models that require an operation process inherit from this model
```java
/**
 * Abstract model. Put the common parts of the same type of business into the abstract model.
 */
@Model.model(DemoBaseAbstractModel.MODEL_MODEL)
@Model(displayName = "Abstract Model")
@Model.Advanced(type= ModelTypeEnum.ABSTRACT)
public abstract class DemoBaseAbstractModel extends IdModel {

    public static final String MODEL_MODEL = "hr.simple.DemoBaseAbstractModel";

    // Related to the process
    @Field.Integer
    @Field(displayName = "Workflow User Task ID", summary = "Used for the approval process in the business data list", invisible = true, store = NullableBoolEnum.FALSE)
    private Long workflowUserTaskId;

    @Field.Integer
    @Field(displayName = "Process Instance ID", summary = "Used for reminder in the business data list", invisible = true, store = NullableBoolEnum.FALSE)
    private Long instanceId;

    @Field.String
    @UxForm.FieldWidget(@UxWidget(invisible = "true"))
    @UxDetail.FieldWidget(@UxWidget(invisible = "true"))
    @Field(displayName = "Current Process Node", store = NullableBoolEnum.FALSE)
    private String currentFlowNode;

    @Field.Text
    @Field(displayName = "Approval Flow Chart", invisible = true, store = NullableBoolEnum.FALSE)
    private String flowChart;


    @Field.Boolean
    @Field(displayName = "Can Remind", invisible = true, defaultValue = "false", store = NullableBoolEnum.FALSE)
    private Boolean canUrge;

    // The approval status controls whether the application form can initiate the process, be edited, etc.
    @Field.Enum
    @Field(displayName = "Approval Status", defaultValue = "NC")
    @UxForm.FieldWidget(@UxWidget(invisible = "true"))
    private ApprovalStatusEnum approvalStatus;

}

```
```java
@Dict(dictionary = ApprovalStatusEnum.dictionary, displayName = "Approval Status")
public enum ApprovalStatusEnum implements IEnum<String> {
    NC("NC", "To be Submitted", "To be Submitted"),
    PENDING("PENDING", "Submitted", "Submitted, waiting for approval"),
    APPROVED("APPROVED", "Approved", "Approved"),
    REJECTED("REJECTED", "Rejected", "Rejected");

    public static final String dictionary = "land.enums.LandApprovalStatusEnum";

    private final String value;
    private final String displayName;
    private final String help;

    ApprovalStatusEnum(String value, String displayName, String help) {
        this.value = value;
        this.displayName = displayName;
        this.help = help;
    }

    public String getValue() {
        return value;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String getHelp() {
        return help;
    }
}
```
# Ⅱ. Implement Common Logic (Reminder, Undo)
```java
@Slf4j
@Component
@Model.model(DemoBaseAbstractModel.MODEL_MODEL)
public class DemoBaseAbstractModelAction {

    @Autowired
    private WorkflowInstanceService workflowInstanceService;

    @Action(displayName = "Remind", summary = "Process Reminder", bindingType = ViewTypeEnum.TABLE, contextType = ActionContextTypeEnum.SINGLE)
    @Action.Advanced(invisible = "!activeRecord.canUrge")
    public DemoBaseAbstractModel urge(DemoBaseAbstractModel data) {
        if (data.getInstanceId() == null) {
            return data;
        }

        WorkflowInstance instance = new WorkflowInstance().setId(data.getInstanceId()).queryById();
        workflowInstanceService.urge(instance);
        PamirsSession.getMessageHub().success("Reminder operation successful");
        return data;
    }

    @Action(displayName = "Submit for Approval", bindingType = ViewTypeEnum.TABLE, contextType = ActionContextTypeEnum.SINGLE)
    @Action.Advanced(invisible = "activeRecord.approvalStatus != 'NC'")
    public DemoBaseAbstractModel submit(DemoBaseAbstractModel data) {
        data.setApprovalStatus(ApprovalStatusEnum.PENDING);
        data.updateById();
        PamirsSession.getMessageHub().success("Submit for approval successful");
        return data;
    }

    @Function(openLevel = FunctionOpenEnum.LOCAL)
    @Function.Advanced(type = FunctionTypeEnum.UPDATE, displayName = "Approval Passed")
    public DemoBaseAbstractModel applySuccess(DemoBaseAbstractModel data) {
        data.setApprovalStatus(ApprovalStatusEnum.APPROVED);
        data.updateById();

        return data;
    }

    @Action(displayName = "Undo", bindingType = ViewTypeEnum.TABLE)
    public DemoBaseAbstractModel undo(DemoBaseAbstractModel data) {
        if (data.getInstanceId() == null) {
            return data;
        }
        WorkflowInstance instance = new WorkflowInstance().setId(data.getInstanceId()).queryById();
        workflowInstanceService.undoInstance(instance.getId());

        data.setApprovalStatus(ApprovalStatusEnum.NC);
        data.updateById();

        return data;
    }

}
```
# III. Define the Business Model
```java
@Model.model(AssetsProxy.MODEL_MODEL)
@Model(displayName = "Assets Proxy Model")
public class AssetsProxy extends DemoBaseAbstractModel {

    public static final String MODEL_MODEL = "land.mgmt.AssetsProxy";

    @Field(displayName = "Using Unit")
    private String useUnit;

    @Field.String
    @Field(displayName = "Unified Social Credit Code")
    private String creditCode;

    @Field(displayName = "Contact Number")
    private String contactNumber;

    @Field.String
    @Field(displayName = "Application Number", invisible = true)
    private String number;

}

```
# IV. Business Data Logic
In the business form, through the custom queryPage query, the workflow instance ID and the user's to-do ID are dynamically placed in the business data to facilitate the implementation of the reminder and revocation logic.
If only the operations initiated by oneself are allowed, this condition can be configured on the page designer or written on the Action. In this article, the reminder button is defined on the Action. You can also set the hidden condition of the button in the interface designer `(activeRecord.canUrge==true)`
```java
@Slf4j
@Component
@Model.model(AssetsProxy.MODEL_MODEL)
public class AssetsProxyAction {

    @Autowired
    private WorkflowUserTaskHandler workflowUserTaskHandler;

    @Function.Advanced(type = FunctionTypeEnum.QUERY, displayName = "Query List")
    @Function.fun(FunctionConstants.queryPage)
    @Function(openLevel = {FunctionOpenEnum.API})
    public Pagination<AssetsProxy> queryPage(Pagination<AssetsProxy> page, QueryWrapper<AssetsProxy> queryWrapper) {
        page = new AssetsProxy().queryPage(page, queryWrapper);
        workflowUserTaskHandler.computeWorkflowUserTask(page.getContent(), AssetsProxy.MODEL_MODEL);
        return page;
    }

    @Transactional
    @Action.Advanced(name = FunctionConstants.create, managed = true, invisible = ExpConstants.idValueExist)
    @Action(displayName = "Save", summary = "Create", bindingType = ViewTypeEnum.FORM)
    @Function(name = FunctionConstants.create)
    @Function.fun(FunctionConstants.create)
    public AssetsProxy create(AssetsProxy data) {
        data.setApprovalStatus(ApprovalStatusEnum.NC);
        data.construct();
        data.create();

        return data;
    }

    @Transactional
    @Action.Advanced(invisible = ExpConstants.idValueExist)
    @Action(displayName = "Save and Start Process", summary = "Save and Start Process", bindingType = ViewTypeEnum.FORM)
    public AssetsProxy saveAndSubmit(AssetsProxy data) {
        data.setApprovalStatus(ApprovalStatusEnum.PENDING);
        data.construct();
        data.create();

        // Code to trigger the workflow ID
        WorkflowD workflowD = new WorkflowD().setId(759036552176484888L).queryOne();
        if (workflowD != null) {
            startWorkflow(workflowD, data);
        }

        return data;
    }

    /**
     * Trigger the workflow instance
     */
    private Boolean startWorkflow(WorkflowD workflowD, IdModel modelData) {
        WorkflowDefinition workflowDefinition = new WorkflowDefinition().queryOneByWrapper(
                Pops.<WorkflowDefinition>lambdaQuery()
                        .from(WorkflowDefinition.MODEL_MODEL)
                        .eq(WorkflowDefinition::getWorkflowCode, workflowD.getCode())
                        .eq(WorkflowDefinition::getActive, 1)
        );
        if (null == workflowDefinition) {
            // The process has no running instance
            return Boolean.FALSE;
        }
        String model = Models.api().getModel(modelData);

        // Workflow context
        WorkflowDataContext wdc = new WorkflowDataContext();
        wdc.setDataType(WorkflowVariationTypeEnum.ADD);
        wdc.setModel(model);
        wdc.setWorkflowDefinitionDefinition(workflowDefinition.parseContent());
        wdc.setWorkflowDefinition(workflowDefinition);
        wdc.setWorkflowDefinitionId(workflowDefinition.getId());
        IdModel copyData = KryoUtils.get().copy(modelData);
        // Manually trigger the created action flow, set the operator as the current user, as the initiator of the process
        copyData.setCreateUid(PamirsSession.getUserId());
        copyData.setWriteUid(PamirsSession.getUserId());
        String jsonData = JsonUtils.toJSONString(copyData.get_d());
        // Trigger the workflow - trigger onCreateManual when adding, trigger onUpdateManual when updating
        String msgId = UUIDUtil.getUUIDNumberString();
        Fun.run(WorkflowModelTriggerFunction.FUN_NAMESPACE, "onCreateManual", wdc, msgId, jsonData);
        return Boolean.TRUE;
    }

}

```
```java
@Component
public class WorkflowUserTaskHandler<T extends DemoBaseAbstractModel> {

    public void computeWorkflowUserTask(List<T> datas, String model) {
        if (CollectionUtils.isEmpty(datas)) {
            return;
        }

        // Filter out the data in [Draft Status] and [Approved] to reduce the data query volume.
        List<Long> bizIds = ListUtils.transform(datas, DemoBaseAbstractModel::getId);
        LambdaQueryWrapper<WorkflowUserTask> userTaskWrapper = new LambdaQueryWrapper<>();
        userTaskWrapper.setModel(WorkflowUserTask.MODEL_MODEL);
        userTaskWrapper.select(WorkflowUserTask::getId, WorkflowUserTask::getNodeDataBizId, WorkflowUserTask::getUserId, WorkflowUserTask::getInitiatorUid,
                WorkflowUserTask::getNodeName, WorkflowUserTask::getNodeId, WorkflowUserTask::getInstanceId);
        userTaskWrapper.eq(WorkflowUserTask::getModel, model)
                .eq(WorkflowUserTask::getStatus, WorkflowUserStatusEnum.ACTIVE)
                .in(WorkflowUserTask::getNodeDataBizId, bizIds);

        Pagination<WorkflowUserTask> userTaskPagination = new Pagination<>();
        userTaskPagination.setCurrentPage(1);
        userTaskPagination.setSize(200L);
        userTaskPagination.setSort(new Sort().addOrder(SortDirectionEnum.DESC, WorkflowUserTask::getCreateDate));
        List<WorkflowUserTask> allUserTasks = new WorkflowUserTask().queryListByWrapper(userTaskPagination, userTaskWrapper);
        if (CollectionUtils.isEmpty(allUserTasks)) {
            return;
        }

        // Group by NodeDataBizId and retain the first occurrence of the object.
        Map<Long, WorkflowUserTask> workflowUserTaskMap = allUserTasks.stream().filter(user -> user.getNodeDataBizId() != null)
                .collect(Collectors.toMap(WorkflowUserTask::getNodeDataBizId, user -> user, (existing, replacement) -> existing));
        // userTaskWrapper.eq(WorkflowUserTask::getUserId, PamirsSession.getUserId())
        List<WorkflowUserTask> userTasks = allUserTasks.stream().filter(task -> task.getUserId() != null && task.getUserId().equals(PamirsSession.getUserId())).collect(Collectors.toList());
        Map<Long, WorkflowUserTask> userTaskMap = userTasks.stream().collect(Collectors.toMap(WorkflowUserTask::getNodeDataBizId, v -> v, (a, b) -> a));
        Map<Long, String> nodeNameResult = nodeNameResult(allUserTasks);
        datas.forEach(item -> {
            item.setCanUrge(Boolean.FALSE);
            WorkflowUserTask currenctWorkflowUserTask = userTaskMap.get(item.getId());
            if (currenctWorkflowUserTask != null) {
                item.setWorkflowUserTaskId(currenctWorkflowUserTask.getId());
                item.setCurrentFlowNode(currenctWorkflowUserTask.getNodeName());
            }
            WorkflowUserTask workflowUserTask = workflowUserTaskMap.get(item.getId());
            if (workflowUserTask != null) {
                item.setInstanceId(workflowUserTask.getInstanceId());
                item.setCurrentFlowNode(nodeNameResult.get(workflowUserTask.getNodeDataBizId()));
                if (workflowUserTask.getInitiatorUid() != null
                        && workflowUserTask.getInitiatorUid().equals(PamirsSession.getUserId())) {
                    item.setCanUrge(Boolean.TRUE);
                }
            }
            if (ApprovalStatusEnum.APPROVED.equals(item.getApprovalStatus())) {
                item.setCurrentFlowNode("Approved");
            } else if (ApprovalStatusEnum.REJECTED.equals(item.getApprovalStatus())) {
                item.setCurrentFlowNode("Approval rejection");
            }
        });
    }
    private Map<Long, String> nodeNameResult(List<WorkflowUserTask> allUserTasks) {
        // Grouping logic: Group by department, extract name, and concatenate after deduplication
        Map<Long, String> result = new HashMap<>();
        for (WorkflowUserTask userTask : allUserTasks) {
            Long nodeDataBizId = userTask.getNodeDataBizId();
            String nodeName = userTask.getNodeName();

            // Filter out names that are null or empty strings
            if (nodeName == null || nodeName.trim().isEmpty()) {
                continue;
            }

            // Initialize the grouped Set
            result.putIfAbsent(nodeDataBizId, "");

            // Use LinkedHashSet to deduplicate and preserve order
            Set<String> nodeNamesSet = new LinkedHashSet<>();
            if (!result.get(nodeDataBizId).isEmpty()) {
                Collections.addAll(nodeNamesSet, result.get(nodeDataBizId).split(","));
            }
            nodeNamesSet.add(nodeName);

            // Update the result
            result.put(nodeDataBizId, String.join(",", nodeNamesSet));
        }

        return result;
    }
}
```

# V. Effect Diagram
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/Snipaste_2025-07-04_14-17-34.jpg)