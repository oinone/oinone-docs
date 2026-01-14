---
title: 数据操作：如何自定义Excel导入导出功能
index: true
category:
  - 常见解决方案
order: 32
---

# 一、场景描述
在平台提供的默认导入导出功能无法满足业务需求的时候，我们可以自定义导入导出功能，以满足业务中个性化的需求。

# 二、导入功能示例
下面以导入文件的时候加入`发布人`的字段作为示例讲解。

## （一）继承平台的导入任务模型，加上需要在导入的弹窗视图需要展示的字段。
```java
package pro.shushi.pamirs.demo.api.model;

import pro.shushi.pamirs.file.api.model.ExcelImportTask;
import pro.shushi.pamirs.meta.annotation.Field;
import pro.shushi.pamirs.meta.annotation.Model;

@Model.model(DemoItemImportTask.MODEL_MODEL)
@Model(displayName = "商品-Excel导入任务")
public class DemoItemImportTask extends ExcelImportTask {
    public static final String MODEL_MODEL = "demo.DemoItemImportTask";

    // 自定义显示的字段
    @Field.String
    @Field(displayName = "发布人")
    private String publishUserName;
}

```

## （二）编写自定义导入弹窗视图的数据初始化方法和导入提交的 action。
```java
package pro.shushi.pamirs.demo.core.action;

import org.springframework.stereotype.Component;
import pro.shushi.pamirs.boot.base.resource.PamirsFile;
import pro.shushi.pamirs.demo.api.model.DemoItemImportTask;
import pro.shushi.pamirs.file.api.action.ExcelImportTaskAction;
import pro.shushi.pamirs.file.api.config.FileProperties;
import pro.shushi.pamirs.file.api.model.ExcelWorkbookDefinition;
import pro.shushi.pamirs.file.api.service.ExcelFileService;
import pro.shushi.pamirs.meta.annotation.Action;
import pro.shushi.pamirs.meta.annotation.Function;
import pro.shushi.pamirs.meta.annotation.Model;
import pro.shushi.pamirs.meta.annotation.fun.extern.Slf4j;
import pro.shushi.pamirs.meta.enmu.ActionContextTypeEnum;
import pro.shushi.pamirs.meta.enmu.FunctionOpenEnum;
import pro.shushi.pamirs.meta.enmu.FunctionTypeEnum;
import pro.shushi.pamirs.meta.enmu.ViewTypeEnum;

@Slf4j
@Component
@Model.model(DemoItemImportTask.MODEL_MODEL)
public class DemoItemExcelImportTaskAction extends ExcelImportTaskAction {

    public DemoItemExcelImportTaskAction(FileProperties fileProperties, ExcelFileService excelFileService) {
        super(fileProperties, excelFileService);
    }

    @Action(displayName = "导入", contextType = ActionContextTypeEnum.CONTEXT_FREE, bindingType = {ViewTypeEnum.TABLE})
    public DemoItemImportTask createImportTask(DemoItemImportTask data) {
        if (data.getWorkbookDefinitionId() != null) {
            ExcelWorkbookDefinition workbookDefinition = new ExcelWorkbookDefinition();
            workbookDefinition.setId(data.getWorkbookDefinitionId());
            data.setWorkbookDefinition(workbookDefinition);
        }
        Object fileId = data.get_d().get("fileId");
        if (fileId != null) {
            PamirsFile pamirsFile = new PamirsFile().queryById(Long.valueOf(fileId.toString()));
            data.setFile(pamirsFile);
        }
        super.createImportTask(data);
        return data;
    }

    /**
     * @param data
     * @return
     */
    @Function(openLevel = FunctionOpenEnum.API)
    @Function.Advanced(type = FunctionTypeEnum.QUERY)
    public DemoItemImportTask construct(DemoItemImportTask data) {
        data.construct();
        return data;
    }

}

```

## （三）编写导入单行数据的处理逻辑。
在此过程中，能够获取到导入弹窗内自定义字段所提交的值。基于这些值，可对自定义逻辑进行处理。例如，在本演示代码中，具体逻辑为将导入商品的发布人统一设置为自定义导入视图中所填写的发布人信息。

```java
package pro.shushi.pamirs.demo.core.excel.extPoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pro.shushi.pamirs.demo.api.model.DemoItem;
import pro.shushi.pamirs.demo.api.model.DemoItemImportTask;
import pro.shushi.pamirs.demo.api.service.DemoItemService;
import pro.shushi.pamirs.file.api.context.ExcelImportContext;
import pro.shushi.pamirs.file.api.extpoint.AbstractExcelImportDataExtPointImpl;
import pro.shushi.pamirs.file.api.extpoint.ExcelImportDataExtPoint;
import pro.shushi.pamirs.file.api.model.ExcelImportTask;
import pro.shushi.pamirs.meta.annotation.Ext;
import pro.shushi.pamirs.meta.annotation.ExtPoint;
import pro.shushi.pamirs.meta.annotation.fun.extern.Slf4j;
import pro.shushi.pamirs.meta.common.exception.PamirsException;

import java.util.Optional;

@Slf4j
@Component
@Ext(ExcelImportTask.class)
public class DemoItemImportExtPoint extends AbstractExcelImportDataExtPointImpl<DemoItem> implements ExcelImportDataExtPoint<DemoItem> {

    @Autowired
    private DemoItemService demoItemService;

    @Override
    @ExtPoint.Implement(expression = "importContext.definitionContext.model == \"" + DemoItem.MODEL_MODEL + "\"")
    public Boolean importData(ExcelImportContext importContext, DemoItem data) {
        ExcelImportTask importTask = importContext.getImportTask();
        try {
            DemoItemImportTask hrExcelImportTask = new DemoItemImportTask().queryById(importTask.getId());

            String publishUserName = Optional.ofNullable(hrExcelImportTask).map(DemoItemImportTask::getPublishUserName).orElse(null);
            // 个性化字段设置到模型数据中
            data.setPublishUserName(publishUserName);

            demoItemService.create(data);
        } catch(PamirsException e) {
            log.error("导入异常", e);
        } catch (Exception e) {
            log.error("导入异常", e);
        }
        return Boolean.TRUE;
    }
}
```

## （四）编写导入的视图 xml。
```xml
<view type="FORM" title="导入" name="import_dialog" widget="form" model="demo.DemoItemImportTask" width="small">
    <template slot="form" cols="1">
        <field data="model" invisible="true"/>
        <field data="publishUserName"/>
        <field data="workbookDefinition" widget="Select" label="导入模板" required="true"
               domain="model == ${activeRecord.model} and dataStatus == 'ENABLED' and type =in= ('IMPORT_EXPORT','IMPORT')"/>
        <field data="file" widget="Upload" label="上传文件" required="true"/>
    </template>
    <template slot="footer">
        <action name="$$internal_DownloadImportWorkbook" label="下载模板" type="PRIMARY"/>
        <action name="createImportTask" label="导入" type="PRIMARY" validateForm="true" closeDialog="true" refreshData="true"/>
    </template>
</view>

```

## （五）初始化导入的动作。
```java
package pro.shushi.pamirs.demo.core.init;

import org.springframework.stereotype.Component;
import pro.shushi.pamirs.boot.base.enmu.ActionTargetEnum;
import pro.shushi.pamirs.boot.common.api.command.AppLifecycleCommand;
import pro.shushi.pamirs.boot.common.api.init.LifecycleCompletedAllInit;
import pro.shushi.pamirs.boot.common.extend.MetaDataEditor;
import pro.shushi.pamirs.core.common.InitializationUtil;
import pro.shushi.pamirs.demo.api.DemoModule;
import pro.shushi.pamirs.demo.api.model.DemoItem;
import pro.shushi.pamirs.demo.api.model.DemoItemImportTask;
import pro.shushi.pamirs.file.api.init.FileExportAndImportViewActionInit;
import pro.shushi.pamirs.meta.annotation.fun.extern.Slf4j;
import pro.shushi.pamirs.meta.api.dto.meta.Meta;
import pro.shushi.pamirs.meta.domain.module.ModuleDefinition;
import pro.shushi.pamirs.meta.enmu.ActionContextTypeEnum;
import pro.shushi.pamirs.meta.enmu.ViewTypeEnum;

import java.util.HashMap;
import java.util.Map;


@Slf4j
@Component
public class DemoModuleAppInstall implements MetaDataEditor, LifecycleCompletedAllInit {

    @Override
    public void edit(AppLifecycleCommand command, Map<String, Meta> metaMap) {
        InitializationUtil util = InitializationUtil.get(metaMap, DemoModule.MODULE_MODULE, DemoModule.MODULE_NAME);

        util.createViewAction("demoItemImportAction", "商品导入", DemoItem.MODEL_MODEL,
                              InitializationUtil.getOptions(ViewTypeEnum.TABLE,ViewTypeEnum.GALLERY), DemoItemImportTask.MODEL_MODEL, ViewTypeEnum.FORM,
                              ActionContextTypeEnum.CONTEXT_FREE, ActionTargetEnum.DIALOG, FileExportAndImportViewActionInit.DEFAULT_IMPORT_VIEW_NAME, "", _va->{
                                  Map<String, Object> context = new HashMap<>();
                                  context.put("model", "'" + DemoItem.MODEL_MODEL + "'");
                                  _va.setContext(context);
                              });
    }


    @Override
    public void process(AppLifecycleCommand command, Map<String, ModuleDefinition> runModuleMap) {
    }
}

```

## （六）导入功能完成，我们看导入弹窗页面的截图 。![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/WX20231122-042634@2x-20250530144823169.png)
# 三、导出功能示例
## （一）继承平台的导出任务模型，加上需要在导出的弹窗视图需要展示的字段
```java
package pro.shushi.pamirs.demo.api.model;

import pro.shushi.pamirs.file.api.model.ExcelExportTask;
import pro.shushi.pamirs.meta.annotation.Field;
import pro.shushi.pamirs.meta.annotation.Model;

@Model.model(DemoItemExportTask.MODEL_MODEL)
@Model(displayName = "商品-Excel导出任务")
public class DemoItemExportTask extends ExcelExportTask {
    public static final String MODEL_MODEL = "demo.DemoItemExportTask";

    // 自定义显示的字段
    @Field.String
    @Field(displayName = "发布人")
    private String publishUserName;
}

```

## （二）编写自定义导出弹窗视图的数据初始化方法和导出提交的 action
```java
package pro.shushi.pamirs.demo.core.action;

import org.springframework.stereotype.Component;
import pro.shushi.pamirs.demo.api.model.DemoItemExportTask;
import pro.shushi.pamirs.file.api.action.ExcelExportTaskAction;
import pro.shushi.pamirs.file.api.model.ExcelWorkbookDefinition;
import pro.shushi.pamirs.file.api.service.ExcelFileService;
import pro.shushi.pamirs.meta.annotation.Action;
import pro.shushi.pamirs.meta.annotation.Function;
import pro.shushi.pamirs.meta.annotation.Model;
import pro.shushi.pamirs.meta.annotation.fun.extern.Slf4j;
import pro.shushi.pamirs.meta.enmu.ActionContextTypeEnum;
import pro.shushi.pamirs.meta.enmu.FunctionOpenEnum;
import pro.shushi.pamirs.meta.enmu.FunctionTypeEnum;
import pro.shushi.pamirs.meta.enmu.ViewTypeEnum;

@Slf4j
@Component
@Model.model(DemoItemExportTask.MODEL_MODEL)
public class DemoItemExcelExportTaskAction extends ExcelExportTaskAction {

    public DemoItemExcelExportTaskAction(ExcelFileService excelFileService) {
        super(excelFileService);
    }

    @Action(displayName = "导出", contextType = ActionContextTypeEnum.CONTEXT_FREE, bindingType = {ViewTypeEnum.TABLE})
    public DemoItemExportTask createExportTask(DemoItemExportTask data) {
        if (data.getWorkbookDefinitionId() != null) {
            ExcelWorkbookDefinition workbookDefinition = new ExcelWorkbookDefinition();
            workbookDefinition.setId(data.getWorkbookDefinitionId());
            data.setWorkbookDefinition(workbookDefinition);
        }
        super.createExportTask(data);
        return data;
    }

    /**
     * @param data
     * @return
     */
    @Function(openLevel = FunctionOpenEnum.API)
    @Function.Advanced(type = FunctionTypeEnum.QUERY)
    public DemoItemExportTask construct(DemoItemExportTask data) {
        data.construct();
        return data;
    }

}

```

## （三）编写导出的数据处理逻辑，此处可以拿到导出弹窗内自定义的字段提交的值，然后根据这些值处理自定义逻辑
```java
package pro.shushi.pamirs.demo.core.excel.extPoint;

import org.springframework.stereotype.Component;
import pro.shushi.pamirs.demo.api.model.DemoItem;
import pro.shushi.pamirs.demo.api.model.DemoItemExportTask;
import pro.shushi.pamirs.demo.api.model.DemoItemImportTask;
import pro.shushi.pamirs.file.api.context.ExcelDefinitionContext;
import pro.shushi.pamirs.file.api.enmu.ExcelTemplateTypeEnum;
import pro.shushi.pamirs.file.api.extpoint.ExcelExportFetchDataExtPoint;
import pro.shushi.pamirs.file.api.extpoint.impl.ExcelExportSameQueryPageTemplate;
import pro.shushi.pamirs.file.api.model.ExcelExportTask;
import pro.shushi.pamirs.file.api.model.ExcelWorkbookDefinition;
import pro.shushi.pamirs.file.api.util.ExcelHelper;
import pro.shushi.pamirs.file.api.util.ExcelTemplateInit;
import pro.shushi.pamirs.meta.annotation.ExtPoint;

import java.util.Collections;
import java.util.List;

@Component
public class DemoItemExportExtPoint extends ExcelExportSameQueryPageTemplate implements ExcelTemplateInit , ExcelExportFetchDataExtPoint {
    public static final String TEMPLATE_NAME ="商品导出";

    @Override
    public List<ExcelWorkbookDefinition> generator() {
        //可以返回多个模版，导出的时候页面上由用户选择导出模版
        return Collections.singletonList(
            ExcelHelper.fixedHeader(DemoItem.MODEL_MODEL,TEMPLATE_NAME)
            .createBlock(TEMPLATE_NAME, DemoItem.MODEL_MODEL)
            .setType(ExcelTemplateTypeEnum.EXPORT)
            .addColumn("name","名称")
            .addColumn("description","描述")
            .addColumn("itemPrice","单价")
            .addColumn("inventoryQuantity","库存")
            .build());
    }

    @Override
    @ExtPoint.Implement(expression = "context.model == \"" + DemoItem.MODEL_MODEL+"\" && context.name == \"" +TEMPLATE_NAME+"\"" )
    public List<Object> fetchExportData(ExcelExportTask exportTask, ExcelDefinitionContext context) {
        DemoItemExportTask excelImportTask = new DemoItemExportTask().queryById(exportTask.getId());

        // 取出自定义字段，处理自定义逻辑
        String publishUserName = excelImportTask.getPublishUserName();
        List<Object> result =  super.fetchExportData(exportTask,context);
        return result;
    }
}

```

## （四）编写导出的视图xml
```xml
<view type="FORM" title="导出" name="export_dialog" widget="form" model="demo.DemoItemExportTask" width="small">
    <template slot="form" cols="1">
        <field data="model" invisible="true"/>
        <field data="publishUserName"/>
        <field data="workbookDefinition" widget="Select" label="导出模板" required="true"
               domain="model == ${activeRecord.model} and dataStatus == 'ENABLED' and type =in= ('IMPORT_EXPORT','EXPORT')"/>
    </template>
    <template slot="footer">
        <action name="$$internal_ExportWorkbook" label="导出" type="PRIMARY" validateForm="true" closeDialog="true" refreshData="false"/>
        <action name="$$internal_DialogCancel" label="取消" type="DEFAULT"/>
    </template>
</view>

```

## （五）初始化导出的动作
```java
package pro.shushi.pamirs.demo.core.init;

import org.springframework.stereotype.Component;
import pro.shushi.pamirs.boot.base.enmu.ActionTargetEnum;
import pro.shushi.pamirs.boot.common.api.command.AppLifecycleCommand;
import pro.shushi.pamirs.boot.common.api.init.LifecycleCompletedAllInit;
import pro.shushi.pamirs.boot.common.extend.MetaDataEditor;
import pro.shushi.pamirs.core.common.InitializationUtil;
import pro.shushi.pamirs.demo.api.DemoModule;
import pro.shushi.pamirs.demo.api.model.DemoItem;
import pro.shushi.pamirs.demo.api.model.DemoItemExportTask;
import pro.shushi.pamirs.file.api.init.FileExportAndImportViewActionInit;
import pro.shushi.pamirs.meta.annotation.fun.extern.Slf4j;
import pro.shushi.pamirs.meta.api.dto.meta.Meta;
import pro.shushi.pamirs.meta.domain.module.ModuleDefinition;
import pro.shushi.pamirs.meta.enmu.ActionContextTypeEnum;
import pro.shushi.pamirs.meta.enmu.ViewTypeEnum;

import java.util.HashMap;
import java.util.Map;

/**
 * 安装设计器导出的元数据
 */
@Slf4j
@Component
public class DemoModuleAppInstall implements MetaDataEditor, LifecycleCompletedAllInit {

    @Override
    public void edit(AppLifecycleCommand command, Map<String, Meta> metaMap) {
        InitializationUtil util = InitializationUtil.get(metaMap, DemoModule.MODULE_MODULE, DemoModule.MODULE_NAME);
        util.createViewAction("demoItemExportAction", "商品导出", DemoItem.MODEL_MODEL,
                              InitializationUtil.getOptions(ViewTypeEnum.TABLE,ViewTypeEnum.GALLERY), DemoItemExportTask.MODEL_MODEL, ViewTypeEnum.FORM,
                              ActionContextTypeEnum.CONTEXT_FREE, ActionTargetEnum.DIALOG, FileExportAndImportViewActionInit.DEFAULT_EXPORT_VIEW_NAME, "", _va->{
                                  Map<String, Object> context = new HashMap<>();
                                  context.put("model", "'" + DemoItem.MODEL_MODEL + "'");
                                  _va.setContext(context);
                              });
    }


    @Override
    public void process(AppLifecycleCommand command, Map<String, ModuleDefinition> runModuleMap) {
    }

}

```

## （六）导出弹窗页面截图 ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/WX20240103-203537-20250530144823225.png)
