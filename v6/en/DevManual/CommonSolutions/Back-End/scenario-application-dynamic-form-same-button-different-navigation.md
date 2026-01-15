---
title: Scenario Application:Dynamic Forms (Same Button Jumps to Different Pages)
index: true
category:
  - Common Solutions
order: 7
---

# I. Scenario Overview
In practical projects, there is a scenario where data in the same list is a generalized data collection, meaning the data comes from different models; row operations need to go to different target pages based on the source. As shown below, the "Submission" operation needs to go to different forms according to the "Report Type".

It also supports configuration of the target pop-up window title and size.

# II. Solution
Each row of records needs to jump to different model views. Add a configuration page to maintain the adjustment action relationship between the source model and the target model; when returning data, also return custom actions.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/image-20250218170109190-20250530144823648.png)

The frontend custom implementation, such as the "Filling" in the above legend, obtains the ViewAction from the returned data and makes the corresponding jump.

# III. Specific Steps
## (I) [Backend] Establishing the Model for Model-View Relationship Settings
### 1. Creating a Model for Model-View Relationship Settings to Configure the View Relationship Between the List Model and Each Record (Target Model)
``` java
import pro.shushi.oinone.examples.simple.api.proxy.system.SimpleModel;
import pro.shushi.oinone.examples.simple.api.proxy.system.SimpleModule;
import pro.shushi.pamirs.boot.base.enmu.ActionTargetEnum;
import pro.shushi.pamirs.boot.base.model.View;
import pro.shushi.pamirs.meta.annotation.Field;
import pro.shushi.pamirs.meta.annotation.Model;
import pro.shushi.pamirs.meta.base.IdModel;
import pro.shushi.pamirs.meta.enmu.ViewTypeEnum;

/**
 * Model and View Relationship Setting
 * ModelRelViewSetting
 */
@Model.model(ModelRelViewSetting.MODEL_MODEL)
@Model(displayName = "Model and View Relationship Setting", summary = "Model and View Relationship Setting")
@Model.Advanced(unique = {"oModel,model,target,viewType,viewName"})
public class ModelRelViewSetting extends IdModel {

    public static final String MODEL_MODEL = "examples.custom.ModelRelViewSetting";

    @Field.many2one
    @Field(displayName = "Module")
    @Field.Relation(relationFields = {"module"}, referenceFields = {"module"})
    private SimpleModule moduleDef;

    @Field.String
    @Field(displayName = "Module Code", invisible = true)
    private String module;

    @Field.many2one
    @Field(displayName = "Source Model")
    @Field.Relation(relationFields = {"oModel"}, referenceFields = {"model"})
    private SimpleModel originModel;

    @Field.String
    @Field(displayName = "Source Model Code", invisible = true)
    private String oModel;

    @Field.many2one
    @Field(displayName = "Target Model")
    @Field.Relation(relationFields = {"model"}, referenceFields = {"model"})
    private SimpleModel targetModel;

    @Field.String
    @Field(displayName = "Target Model Code", invisible = true)
    private String model;

    @Field.Enum
    @Field(displayName = "View Type")
    private ViewTypeEnum viewType;

    @Field.Enum
    @Field(displayName = "Opening Method", required = true)
    private ActionTargetEnum target;

    @Field.String
    @Field(displayName = "Action Name", invisible = true)
    private String name;

    @Field.many2one
    @Field.Relation(relationFields = {"model", "viewName"}, referenceFields = {"model", "name"}, domain = "systemSource=='UI'")
    @Field(displayName = "Bound Page", summary = "Bound Page")
    private View view;

    @Field.String
    @Field(displayName = "View/Page", invisible = true)
    private String viewName;

    @Field.String
    @Field(displayName = "Page Title")
    private String title;

    @Field.String
    @Field(displayName = "Display Name")
    private String displayName;

}
```

:::info Note:

To avoid affecting system modules and models, the modules and models referenced in ModelRelViewSetting.java use proxied objects from the project.

:::

1. Example Central Model SimpleModel

``` java
import pro.shushi.pamirs.meta.annotation.Model;
import pro.shushi.pamirs.meta.domain.model.ModelDefinition;
import pro.shushi.pamirs.meta.enmu.ModelTypeEnum;

@Base
@Model.model(SimpleModel.MODEL_MODEL)
@Model(displayName = "Example Central Model", labelFields = "displayName")
@Model.Advanced(type = ModelTypeEnum.PROXY)
public class SimpleModel extends ModelDefinition {

    public static final String MODEL_MODEL = "examples.system.SimpleModel";

}
```

2. Example Central Module SimpleModule

``` java
import pro.shushi.pamirs.meta.annotation.Model;
import pro.shushi.pamirs.meta.annotation.sys.Base;
import pro.shushi.pamirs.meta.domain.module.ModuleDefinition;
import pro.shushi.pamirs.meta.enmu.ModelTypeEnum;

@Base
@Model.model(SimpleModule.MODEL_MODEL)
@Model(displayName = "Example Central Module", labelFields = "displayName")
@Model.Advanced(type = ModelTypeEnum.PROXY)
public class SimpleModule extends ModuleDefinition {

    public static final String MODEL_MODEL = "examples.system.SimpleModule";

}
```

3. Dynamic Page Menu

``` java
@UxMenus
public class DemoMenus implements ViewActionConstants {

    @UxMenu("Dynamic Page Configuration")
    @UxRoute(ModelRelViewSetting.MODEL_MODEL)
    class ModelRelViewSettingMenu {
    }
}
```

### 2. Overriding Actions for Model-View Relationship Settings, Creating Button Metadata, etc.
``` java
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import pro.shushi.oinone.examples.simple.api.model.custom.config.ModelRelViewSetting;
import pro.shushi.oinone.examples.simple.core.action.helper.ModelDataHelper;
import pro.shushi.oinone.examples.simple.core.util.UUIDUtils;
import pro.shushi.pamirs.boot.base.enmu.ActionTypeEnum;
import pro.shushi.pamirs.boot.base.model.ViewAction;
import pro.shushi.pamirs.boot.base.ux.cache.api.ActionCacheApi;
import pro.shushi.pamirs.boot.base.ux.cache.api.ModelActionsCacheApi;
import pro.shushi.pamirs.meta.annotation.Action;
import pro.shushi.pamirs.meta.annotation.Function;
import pro.shushi.pamirs.meta.annotation.Model;
import pro.shushi.pamirs.meta.annotation.fun.extern.Slf4j;
import pro.shushi.pamirs.meta.api.session.PamirsSession;
import pro.shushi.pamirs.meta.constant.FunctionConstants;
import pro.shushi.pamirs.meta.domain.ModelData;
import pro.shushi.pamirs.meta.domain.module.ModuleDefinition;
import pro.shushi.pamirs.meta.enmu.ActionContextTypeEnum;
import pro.shushi.pamirs.meta.enmu.FunctionTypeEnum;
import pro.shushi.pamirs.meta.enmu.SystemSourceEnum;
import pro.shushi.pamirs.meta.enmu.ViewTypeEnum;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Slf4j
@Component
@Model.model(ModelRelViewSetting.MODEL_MODEL)
public class ModelRelViewSettingAction {

    @Transactional
    @Action.Advanced(name = FunctionConstants.create, managed = true, invisible = "!IS_BLANK(activeRecord.id)")
    @Action(displayName = "Confirm", summary = "Create", bindingType = ViewTypeEnum.FORM)
    @Function(name = FunctionConstants.create)
    @Function.fun(FunctionConstants.create)
    public ModelRelViewSetting create(ModelRelViewSetting data) {

        ViewAction viewAction = buildAction(data);
        viewAction.construct();
        viewAction.create();

        data.setName(viewAction.getName());
        data.create();

        // Write to modelData/refresh cache, etc.
        actionMetaAddHandler(viewAction);

        return data;
    }

    @Transactional
    @Action.Advanced(name = FunctionConstants.update, managed = true, invisible = "IS_BLANK(activeRecord.id)")
    @Action(displayName = "Update", summary = "Modify", bindingType = ViewTypeEnum.FORM)
    @Function(name = FunctionConstants.update)
    @Function.fun(FunctionConstants.update)
    public ModelRelViewSetting update(ModelRelViewSetting data) {

        ViewAction viewAction = buildAction(data);
        viewAction.updateById();
        data.updateById();

        // Write to modelData/refresh cache, etc.
        actionMetaAddHandler(viewAction);

        return data;
    }

    @Function.Advanced(type = FunctionTypeEnum.DELETE)
    @Function.fun(FunctionConstants.deleteWithFieldBatch)
    @Function(name = FunctionConstants.delete)
    @Action(displayName = "Delete", contextType = ActionContextTypeEnum.SINGLE_AND_BATCH)
    public List<ModelRelViewSetting> delete(List<ModelRelViewSetting> dataList) {
        dataList.forEach(data -> {
            data.deleteById();

            ViewAction viewAction = new ViewAction().setModel(data.getOModel()).setName(data.getName());
            viewAction.deleteById();

            actionMetaDelHandler(viewAction);
        });

        return dataList;
    }

    private static ViewAction buildAction(ModelRelViewSetting data) {
        ViewAction viewAction = null;
        if (data.getId()==null) {
            viewAction = new ViewAction();
            viewAction.setName(UUIDUtils.generateUniqueKey("uiView"));
            viewAction.setActionType(ActionTypeEnum.VIEW);
            viewAction.setPriority(999);
            viewAction.setSys(false);
            viewAction.setSystemSource(SystemSourceEnum.UI);
            viewAction.setContextType(ActionContextTypeEnum.SINGLE);
            viewAction.setBindingType(Collections.singletonList(ViewTypeEnum.TABLE));
        } else {
            viewAction = new ViewAction().setModel(data.getModel()).setName(data.getName()).queryOne();
            if (viewAction == null){
                data = data.queryById();
                viewAction = new ViewAction().setModel(data.getOModel()).setName(data.getName()).queryOne();
            }
        }
        viewAction.setTitle(data.getTitle());
        viewAction.setDisplayName(data.getDisplayName());
        viewAction.setLabel(data.getDisplayName());
        viewAction.setResModel(data.getModel());
        viewAction.setModule(data.getModule());
        ModuleDefinition moduleDef = PamirsSession.getContext().getModule(data.getModule());
        viewAction.setModuleDefinition(moduleDef);
        if (moduleDef!=null) {
            viewAction.setModuleName(moduleDef.getName());
        }
        viewAction.setViewType(data.getViewType());
        viewAction.setTarget(data.getTarget());
        viewAction.setResView(data.getView());
        viewAction.setResViewName(data.getViewName());
        //viewAction.setOptionViewTypes();
        //viewAction.setOptionViewList();
        viewAction.setModelDefinition(data.getTargetModel());
        viewAction.setModel(data.getModel());
        //viewAction.setBindingView();
        //viewAction.setBindingViewName(data.getViewName());
        return viewAction;
    }

    public void actionMetaAddHandler(pro.shushi.pamirs.boot.base.model.Action action) {
        // Process metadata registration
        ModelData modelData = ModelDataHelper.convert(action);
        modelData.construct();
        modelData.createOrUpdate();

        if (log.isInfoEnabled()) {
            log.info("Start writing action cache, id:{}, model:{}, name:{}", action.getId(), action.getModel(), action.getName());
        }

        pro.shushi.pamirs.boot.base.model.Action finalAction = action;
        PamirsSession.getContext().putExtendCacheEntity(ActionCacheApi.class, (cacheApi) -> {
            cacheApi.put(finalAction.getSign(), finalAction);
        });

        PamirsSession.getContext().putExtendCacheEntity(ModelActionsCacheApi.class, (cacheApi) -> {
            String model = finalAction.getModel();
            // Create a new list and overwrite after all processing is complete
            List<pro.shushi.pamirs.boot.base.model.Action> cacheActions = cacheApi.get(model);
            List<pro.shushi.pamirs.boot.base.model.Action> modelActions = new ArrayList<>();
            if (CollectionUtils.isNotEmpty(cacheActions)) {
                modelActions.addAll(cacheActions);
            }
            modelActions.stream().filter(i -> finalAction.getSign().equals(i.getSign())).findFirst().ifPresent(modelActions::remove);
            modelActions.add(finalAction);

            cacheApi.put(model, modelActions);
        });
    }

    public void actionMetaDelHandler(pro.shushi.pamirs.boot.base.model.Action action) {
        // Process metadata registration
        ModelData modelData = ModelDataHelper.convert(action);
        modelData.deleteByUnique();

        if (log.isInfoEnabled()) {
            log.info("Start deleting action cache, id:{}, model:{}, name:{}", action.getId(), action.getModel(), action.getName());
        }

        pro.shushi.pamirs.boot.base.model.Action finalAction = action;
        PamirsSession.getContext().putExtendCacheEntity(ActionCacheApi.class, (cacheApi) -> {
            cacheApi.remove(finalAction.getModel(), finalAction.getName());
        });

        PamirsSession.getContext().putExtendCacheEntity(ModelActionsCacheApi.class, (cacheApi) -> {
            String model = finalAction.getModel();
            // Create a new list and overwrite after all processing is complete
            List<pro.shushi.pamirs.boot.base.model.Action> cacheActions = cacheApi.get(model);
            List<pro.shushi.pamirs.boot.base.model.Action> modelActions = new ArrayList<>();
            if (CollectionUtils.isNotEmpty(cacheActions)) {
                modelActions.addAll(cacheActions);
            }
            modelActions.stream().filter(i -> finalAction.getSign().equals(i.getSign())).findFirst().ifPresent(modelActions::remove);
            modelActions.remove(finalAction);

            cacheApi.put(model, modelActions);
        });
    }

}
```

So far, the configuration logic for the model to jump to another model has been written. The following uses a visual way to bind.

## (II) Model Data Operation for Model-View Relationship Settings
Click Create to add the logic for the source model to jump to the target model.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/image-20250218170518116-20250530144823769.png)

## (III) [Backend] Model Enhancement for Row Operations
### 1. Adding Target Model and Context Extension to the Model Corresponding to Row Operations
``` java
import pro.shushi.oinone.examples.simple.api.model.custom.config.ModelRelViewSetting;
import pro.shushi.pamirs.meta.annotation.Field;
import pro.shushi.pamirs.meta.annotation.Model;
import pro.shushi.pamirs.meta.base.IdModel;
import pro.shushi.pamirs.meta.enmu.NullableBoolEnum;

import java.util.List;

/**
 * @Author: shushi
 * @Description:
 */
@Model.model(CustomTaskCenter.MODEL_MODEL)
@Model(displayName = "Task Center")
public class CustomTaskCenter extends IdModel {

    public static final String MODEL_MODEL = "examples.biz.CustomTaskCenter";

    // Other business fields (ignored)

    //////////////////////////////////////////////////////
    // For custom page jumps
    @Field.String(size = 50)
    @Field(displayName = "Target Model", summary = "Target model for custom actions")
    private String targetModel;

    @Field.one2many
    @Field.Relation(store = false)
    @Field(displayName = "Context Extension Fields", store = NullableBoolEnum.FALSE, invisible = true)
    private List<ModelRelViewSetting> customViewAction;

}
```

### 2. Overriding queryPage for the Model Corresponding to Row Operations to Obtain Context Extensions of Row Records
``` java
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.stereotype.Component;
import pro.shushi.oinone.examples.simple.api.model.custom.biz.CustomTaskCenter;
import pro.shushi.oinone.examples.simple.api.model.custom.config.ModelRelViewSetting;
import pro.shushi.pamirs.framework.connectors.data.sql.Pops;
import pro.shushi.pamirs.framework.connectors.data.sql.query.QueryWrapper;
import pro.shushi.pamirs.meta.annotation.Function;
import pro.shushi.pamirs.meta.annotation.Model;
import pro.shushi.pamirs.meta.annotation.fun.extern.Slf4j;
import pro.shushi.pamirs.meta.api.dto.condition.Pagination;
import pro.shushi.pamirs.meta.common.util.ListUtils;
import pro.shushi.pamirs.meta.constant.FunctionConstants;
import pro.shushi.pamirs.meta.enmu.FunctionOpenEnum;
import pro.shushi.pamirs.meta.enmu.FunctionTypeEnum;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Component
@Model.model(CustomTaskCenter.MODEL_MODEL)
public class CustomTaskCenterAction {

    @Function.Advanced(type = FunctionTypeEnum.QUERY)
    @Function.fun(FunctionConstants.queryPage)
    @Function(openLevel = {FunctionOpenEnum.API})
    public Pagination<CustomTaskCenter> queryPage(Pagination<CustomTaskCenter> page, QueryWrapper<CustomTaskCenter> queryWrapper) {
        page = new CustomTaskCenter().queryPage(page, queryWrapper);
        if (CollectionUtils.isNotEmpty(page.getContent())) {
            computeCustomViewAction(page.getContent());
        }

        return page;
    }

    private void computeCustomViewAction(List<CustomTaskCenter> taskCenters) {
        List<String> models = ListUtils.transform(taskCenters, CustomTaskCenter::getTargetModel);
        List<ModelRelViewSetting> customViewActions = new ModelRelViewSetting().queryList(Pops.<ModelRelViewSetting>lambdaQuery().setBatchSize(-1)
                                                                                          .from(ModelRelViewSetting.MODEL_MODEL).in(ModelRelViewSetting::getModel, models));

        if (CollectionUtils.isEmpty(customViewActions)) {
            return;
        }

        Map<String/**model*/, List<ModelRelViewSetting>> modelRelViewSettingMap = customViewActions.stream().collect(Collectors.groupingBy(ModelRelViewSetting::getModel));
        taskCenters.forEach(business -> {
            List<ModelRelViewSetting> modelRelViewSettingList = modelRelViewSettingMap.get(business.getTargetModel());
            business.setCustomViewAction(modelRelViewSettingList);
        });
    }

}
```

## (IV) [Interface Designer] Configuration for Row Operation Corresponding List
1. Add "Context Extension Fields" to the list of business data, and set hidden and configured透出 fields, refer to the screenshots below.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/image-20250219151302564-20250530144823874.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/image-20250219151319818-20250530144823958.png)

2. Configure operation buttons, drag jump actions such as "Details" or "Filling" according to business conditions. When dragging jump actions, enable "Retain Action" so that the API name can be filled in.

:::info Note:

The "Page Opening Method" configured for the designer jump action (needing dynamic routing) must be consistent with the "Page Opening Method" in the model view list, otherwise an error will be reported: Popup view not configured.

:::

## (V) [Permission] Custom Action Permission Extension and Configuration
1. Permission extension, parsing custom action permissions to the permission tree.

``` java
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import pro.shushi.oinone.examples.simple.api.model.custom.config.ModelRelViewSetting;
import pro.shushi.pamirs.auth.api.entity.node.ActionPermissionNode;
import pro.shushi.pamirs.auth.api.entity.node.PermissionNode;
import pro.shushi.pamirs.auth.api.extend.PermissionNodeLoadExtendApi;
import pro.shushi.pamirs.auth.api.helper.AuthNodeHelper;
import pro.shushi.pamirs.boot.base.enmu.ActionTypeEnum;
import pro.shushi.pamirs.boot.base.model.Action;
import pro.shushi.pamirs.boot.base.model.ViewAction;
import pro.shushi.pamirs.core.common.TranslateUtils;
import pro.shushi.pamirs.core.common.query.QueryActions;
import pro.shushi.pamirs.meta.common.spi.SPI;

import java.util.List;

/**
 * Custom Action Loading Extension
 *
 * @author shushi
 */
@Component
@Order(80)
@SPI.Service("CustomViewActionPermissionNodeLoadExtend")
public class CustomViewActionPermissionNodeLoadExtend implements PermissionNodeLoadExtendApi {

    @Override
    public void buildRootPermissions(List<PermissionNode> nodes) {
        List<ModelRelViewSetting> settings = new ModelRelViewSetting().queryList();
        if (CollectionUtils.isEmpty(settings)) {
            return;
        }

        QueryActions<ViewAction> queryActions = new QueryActions<>(ActionTypeEnum.VIEW);
        settings.stream().forEach(setting -> {
            queryActions.add(setting.getModel(), setting.getName());
        });
        List<ViewAction> viewActions = queryActions.query();
        if (CollectionUtils.isEmpty(viewActions)) {
            return;
        }

        PermissionNode root = createTopBarNode();
        createActionNodes(viewActions, root);
        if (!root.getNodes().isEmpty()) {
            nodes.add(0, root);
        }
    }

    private void addNode(PermissionNode node, PermissionNode target) {
        if (target == null) {
            return;
        }
        node.getNodes().add(target);
    }

    private PermissionNode createTopBarNode() {
        return AuthNodeHelper.createNode("ExamplesCustomViewAction", TranslateUtils.translateValues("XX Action Permission"));
    }

    private ActionPermissionNode createActionNode(Action action, PermissionNode parentNode, ViewAction viewAction) {
        ActionPermissionNode node = AuthNodeHelper.createActionNode(viewAction.getModule(), action, parentNode);
        if (node == null) {
            return null;
        }
        node.setPath("/" +viewAction.getModel() + "/" +viewAction.getName());
        return node;
    }

    private void createActionNodes(List<ViewAction> viewActions, PermissionNode parentNode) {
        for (int i = 0; i < viewActions.size(); i++) {
            ViewAction action = viewActions.get(i);
            addNode(parentNode, createActionNode(action, parentNode, action));
        }
    }

}
```

2. After the above permission extension, custom actions will be automatically loaded into the permission tree, and normal permission configuration can be performed later.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/image-20250218171137362-20250530144824036.png)

Usage Steps

1. Add model and view relationships![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/image-20250219152421792-20250530144824099.png)
2. Add a piece of business data and bind the target model code![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/image-20250219152703749-20250530144824181.png)
3. On the view page, you can see that the context parameters already have data. Checking the interface return will show specific viewAction data. Then, cooperate with frontend code to implement the jump.![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/image-20250219152825868-20250530144824237.png)

## (VI) [Frontend] Frontend Custom Actions Based on List Model and API Name
``` javascript
import {
  ActionContextType,
  ActionType,
  ActionWidget,
  DialogViewActionWidget,
  executeViewAction,
  RouterViewActionWidget,
  RuntimeViewAction,
  SPI,
  ViewType,
  Widget
} from '@oinone/kunlun-dependencies';
import CustomViewActionVue from './CustomViewAction.vue';

@SPI.ClassFactory(
  ActionWidget.Token({
    model: 'demo.CooperationCenter', // Need to replace with the corresponding page model
    name: 'uiViewaee878c066d4490195246f62add8ffff' // Find the button with the same name in the page debug
  })
)
  export class VieDynamicActionWidget extends RouterViewActionWidget {
  /**
     * Override the button's click event
     */
  protected clickAction(): Promise<void> {
    const activeRecord = this.activeRecords?.[0] || {};
    // Build the context
    const context = this.buildContext(activeRecord);

    // Execute the current action
    executeViewAction(
      {
        ...this.action,
        context
      },
      undefined,
      undefined,
      activeRecord
    );
    return null as any;
  }

  @Widget.Reactive()
  public get action() {
    // console.log('---1',this.activeRecords?.[0].customViewAction);
    // customViewAction is the agreed data name
    const list = (this.activeRecords?.[0].customViewAction || []) as RuntimeViewAction[];
    const item =
      list.find((item) => {
        return item.viewType == ViewType.Form;
      }) || ({} as RuntimeViewAction);
    return {
      ...item,
      contextType: ActionContextType.Single,
      actionType: ActionType.View,
      sessionPath: `/${item.model}/${item.name}`,
      context: { id: this.activeRecords?.[0].id }
    };
  }
  // Note: The loading function of the target page needs to be configured as queryOne queryOne
}
```