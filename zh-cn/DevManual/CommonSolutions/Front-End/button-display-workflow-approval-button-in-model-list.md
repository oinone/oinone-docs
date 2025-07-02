---
title: 按钮：如何在业务模型的列表中展示工作流的审批按钮
index: true
category:
   - 前端
order: 7
---
# 一、场景概述
当我们需要在业务模型的列表中展示审批的按钮时，我们可以通过自定义的方式完成扩展，这样就可以在业务数据中直接点击该动作按钮跳转到工作流待办详情页处理审批或填写任务

# 二、解决方案
## （一）先在业务数据模型中新增`userTaskList`字段存放该条数据的工作流待办数据
```java
@Model.model(DemoItem.MODEL_MODEL)
@Model(displayName = "测试商品")
public class DemoItem extends IdModel {

    @Field.one2many
    @Field(displayName = "工作流任务列表", store = NullableBoolEnum.FALSE, invisible = true)
    @Field.Relation(store = false)
    private List<WorkflowUserTask> userTaskList;
}
```

## （二）在业务数据的查询方法中查询当前登录用户在工作流任务中的数据
```java
@Function.Advanced(type = FunctionTypeEnum.QUERY, displayName = "查询列表", timeout = 50000)
@Function.fun(FunctionConstants.queryPage)
@Function(openLevel = {FunctionOpenEnum.LOCAL, FunctionOpenEnum.REMOTE, FunctionOpenEnum.API})
public Pagination<DemoItem> queryPage(Pagination<DemoItem> page, QueryWrapper<DemoItem> queryWrapper) {
    new DemoItem().queryPage(page, queryWrapper);

    List<Long> bizIds = page.getContent().stream().map(DemoItem::getId).collect(Collectors.toList());

    LambdaQueryWrapper<WorkflowUserTask> userTaskWrapper = new LambdaQueryWrapper<>();
    userTaskWrapper.setModel(WorkflowUserTask.MODEL_MODEL);
    userTaskWrapper.select(WorkflowUserTask::getId, WorkflowUserTask::getNodeDataBizId);
    userTaskWrapper.eq(WorkflowUserTask::getUserId, PamirsSession.getUserId())
    .eq(WorkflowUserTask::getModel, DemoItem.MODEL_MODEL)
    .eq(WorkflowUserTask::getStatus, WorkflowUserStatusEnum.ACTIVE)
    .in(WorkflowUserTask::getNodeDataBizId, bizIds);

    Pagination<WorkflowUserTask> userTaskPagination = new Pagination<>();
    userTaskPagination.setCurrentPage(1);
    userTaskPagination.setSize(200L);
    userTaskPagination.setSort(new Sort().addOrder(SortDirectionEnum.DESC, WorkflowUserTask::getCreateDate));

    List<WorkflowUserTask> userTasks = new WorkflowUserTask().queryListByWrapper(userTaskPagination, userTaskWrapper);
    Map<Long, WorkflowUserTask> map = userTasks.stream().collect(Collectors.toMap(WorkflowUserTask::getNodeDataBizId, v -> v, (a, b) -> a));
    page.getContent().forEach((item) -> {
        WorkflowUserTask workflowUserTask = map.get(item.getId());
        if (workflowUserTask != null) {
            item.setUserTaskList(Lists.newArrayList(workflowUserTask));
        }
    });
    return page;
}
```

## （三）在界面设计器拖一个服务端动作到操作列中
## （四）将工作流任务列表字段`userTaskList`拖到表格列中并隐藏该字段
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/WX20240509-175829-1024x472.png)

## （五）前端自定义跳转到工作流待办详情页的动作组件
```typescript
import {
  ActionType,
  ActionWidget,
  ClickResult,
  executeViewAction, RuntimeViewAction,
  ServerActionWidget,
  SPI, ViewActionTarget, ViewType, Widget
} from '@oinone/kunlun-dependencies';

// name为界面设计器拖出的动作名称
@SPI.ClassFactory(ActionWidget.Token({ actionType: ActionType.Server, model: 'demo.DemoItem', name: 'uiServer0358d42817d64fe7908fe48dfce084d3' }))
  class WorkflowJumpActionWidget extends ServerActionWidget {

    @Widget.Reactive()
    public get invisible(): boolean {
      if (!this.activeRecords?.[0]?.userTaskList?.[0]?.id) {
        return true;
      }
      return super.invisible;
    }

    protected async clickAction(): Promise<ClickResult> {
      const menu = {"selectedKeys":["WorkflowMenus_WorkBenchMenu_ActiveUserTaskMenu"],"openKeys":["WorkflowMenus_WorkBenchMenu","WorkflowMenus_WorkBenchMenu_ActiveUserTaskMenu"]};
      const userTaskId = this.activeRecords?.[0]?.userTaskList?.[0]?.id;
      if (!userTaskId) {
        return;
      }
      executeViewAction(
        {
          viewType: ViewType.Form,
          resModuleName: 'workflow',
          model: 'workbench.WorkBenchWorkflowUserTaskActive',
          name: 'workflow_wait',
          target: ViewActionTarget.OpenWindow,
          sessionPath: '/workflow/WorkflowMenus_WorkBenchMenu_ActiveUserTaskMenu'
        } as RuntimeViewAction,
        undefined,
        undefined,
        {
          id: userTaskId,
          menu: JSON.stringify(menu)
        }
      );
    }
  }

```

