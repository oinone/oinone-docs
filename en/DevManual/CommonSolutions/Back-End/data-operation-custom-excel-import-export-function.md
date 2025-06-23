---
title: Data Operation:How to Customize Excel Import and Export Functions
index: true
category:
  - Common Solutions
order: 32
---

# Ⅰ、Scenario Description
When the default import and export functions provided by the platform cannot meet business requirements, we can customize import and export functions to satisfy personalized business needs.

# Ⅱ、Import Function Example
The following takes adding a `Publisher` field during file import as an example for explanation.

## （Ⅰ）Inherit the platform's import task model and add fields to be displayed in the import pop-up view.
```java
package pro.shushi.pamirs.demo.api.model;

import pro.shushi.pamirs.file.api.model.ExcelImportTask;
import pro.shushi.pamirs.meta.annotation.Field;
import pro.shushi.pamirs.meta.annotation.Model;

@Model.model(DemoItemImportTask.MODEL_MODEL)
@Model(displayName = "Product - Excel Import Task")
public class DemoItemImportTask extends ExcelImportTask {
    public static final String MODEL_MODEL = "demo.DemoItemImportTask";

    // Custom display field
    @Field.String
    @Field(displayName = "Publisher")
    private String publishUserName;
}
```

## （Ⅱ）Write the data initialization method for the custom import pop-up view and the import submission action.
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

    @Action(displayName = "Import", contextType = ActionContextTypeEnum.CONTEXT_FREE, bindingType = {ViewTypeEnum.TABLE})
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

## （Ⅲ）Write the processing logic for single-row import data.
In this process, values submitted by custom fields in the import pop-up can be obtained. Based on these values, custom logic can be processed. For example, in this demo code, the specific logic is to uniformly set the publisher of imported products to the publisher information filled in the custom import view.

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
            // Set personalized fields into model data
            data.setPublishUserName(publishUserName);

            demoItemService.create(data);
        } catch(PamirsException e) {
            log.error("Import exception", e);
        } catch (Exception e) {
            log.error("Import exception", e);
        }
        return Boolean.TRUE;
    }
}
```

## （Ⅳ）Write the import view xml.
```xml
<view type="FORM" title="Import" name="import_dialog" widget="form" model="demo.DemoItemImportTask" width="small">
    <template slot="form" cols="1">
        <field data="model" invisible="true"/>
        <field data="publishUserName"/>
        <field data="workbookDefinition" widget="Select" label="Import Template" required="true"
               domain="model == ${activeRecord.model} and dataStatus == 'ENABLED' and type =in= ('IMPORT_EXPORT','IMPORT')"/>
        <field data="file" widget="Upload" label="Upload File" required="true"/>
    </template>
    <template slot="footer">
        <action name="$$internal_DownloadImportWorkbook" label="Download Template" type="PRIMARY"/>
        <action name="createImportTask" label="Import" type="PRIMARY" validateForm="true" closeDialog="true" refreshData="true"/>
    </template>
</view>
```

## （Ⅴ）Initialize the import action.
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

        util.createViewAction("demoItemImportAction", "Product Import", DemoItem.MODEL_MODEL,
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

## （Ⅵ）The import function is completed. Here is a screenshot of the import pop-up page.
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/WX20231122-042634@2x-20250530144823169.png)

# Ⅲ、Export Function Example
## （Ⅰ）Inherit the platform's export task model and add fields to be displayed in the export pop-up view.
```java
package pro.shushi.pamirs.demo.api.model;

import pro.shushi.pamirs.file.api.model.ExcelExportTask;
import pro.shushi.pamirs.meta.annotation.Field;
import pro.shushi.pamirs.meta.annotation.Model;

@Model.model(DemoItemExportTask.MODEL_MODEL)
@Model(displayName = "Product - Excel Export Task")
public class DemoItemExportTask extends ExcelExportTask {
    public static final String MODEL_MODEL = "demo.DemoItemExportTask";

    // Custom display field
    @Field.String
    @Field(displayName = "Publisher")
    private String publishUserName;
}
```

## （Ⅱ）Write the data initialization method for the custom export pop-up view and the export submission action.
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

    @Action(displayName = "Export", contextType = ActionContextTypeEnum.CONTEXT_FREE, bindingType = {ViewTypeEnum.TABLE})
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

## （Ⅲ）Write the export data processing logic, where values submitted by custom fields in the export pop-up can be obtained to process custom logic.
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
    public static final String TEMPLATE_NAME ="Product Export";

    @Override
    public List<ExcelWorkbookDefinition> generator() {
        // Can return multiple templates for users to choose on the export page
        return Collections.singletonList(
            ExcelHelper.fixedHeader(DemoItem.MODEL_MODEL,TEMPLATE_NAME)
            .createBlock(TEMPLATE_NAME, DemoItem.MODEL_MODEL)
            .setType(ExcelTemplateTypeEnum.EXPORT)
            .addColumn("name","Name")
            .addColumn("description","Description")
            .addColumn("itemPrice","Unit Price")
            .addColumn("inventoryQuantity","Inventory")
            .build());
    }

    @Override
    @ExtPoint.Implement(expression = "context.model == \"" + DemoItem.MODEL_MODEL+"\" && context.name == \"" +TEMPLATE_NAME+"\"" )
    public List<Object> fetchExportData(ExcelExportTask exportTask, ExcelDefinitionContext context) {
        DemoItemExportTask excelImportTask = new DemoItemExportTask().queryById(exportTask.getId());

        // Get custom fields and process custom logic
        String publishUserName = excelImportTask.getPublishUserName();
        List<Object> result =  super.fetchExportData(exportTask,context);
        return result;
    }
}
```

## （Ⅳ）Write the export view xml.
```xml
<view type="FORM" title="Export" name="export_dialog" widget="form" model="demo.DemoItemExportTask" width="small">
    <template slot="form" cols="1">
        <field data="model" invisible="true"/>
        <field data="publishUserName"/>
        <field data="workbookDefinition" widget="Select" label="Export Template" required="true"
               domain="model == ${activeRecord.model} and dataStatus == 'ENABLED' and type =in= ('IMPORT_EXPORT','EXPORT')"/>
    </template>
    <template slot="footer">
        <action name="$$internal_ExportWorkbook" label="Export" type="PRIMARY" validateForm="true" closeDialog="true" refreshData="false"/>
        <action name="$$internal_DialogCancel" label="Cancel" type="DEFAULT"/>
    </template>
</view>
```

## （Ⅴ）Initialize the export action.
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
 * Install metadata exported by the designer
 */
@Slf4j
@Component
public class DemoModuleAppInstall implements MetaDataEditor, LifecycleCompletedAllInit {

    @Override
    public void edit(AppLifecycleCommand command, Map<String, Meta> metaMap) {
        InitializationUtil util = InitializationUtil.get(metaMap, DemoModule.MODULE_MODULE, DemoModule.MODULE_NAME);
        util.createViewAction("demoItemExportAction", "Product Export", DemoItem.MODEL_MODEL,
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

## （Ⅵ）Screenshot of the export pop-up page.
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/WX20240103-203537-20250530144823225.png)