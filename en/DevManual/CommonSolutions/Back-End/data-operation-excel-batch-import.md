---
title: Data Operation:Batch Excel Import
index: true
category:
  - Common Solutions
order: 23
---

# 一、Scenario Description
In some scenarios, it is necessary to obtain the overall data imported from Excel for batch operations or validation. This can be achieved by implementing import extension points, where the input parameter `data` is the list of data imported from Excel. Businesses can perform data validation based on actual conditions.

## （一）Excel Template Definition, Requiring `setEachImport(false)`
```java
@Component
public class PetTalentExportTemplate implements ExcelTemplateInit {
    public static final String TEMPLATE_NAME = "Pet Talent Export";

    @Override
    public List<ExcelWorkbookDefinition> generator() {
        // Multiple templates can be returned for users to choose during export
        return Collections.singletonList(
            ExcelHelper.fixedHeader(PetShop.MODEL_MODEL, TEMPLATE_NAME)
            .createBlock(TEMPLATE_NAME, PetShop.MODEL_MODEL)
            .setEachImport(Boolean.FALSE)
            .setType(ExcelTemplateTypeEnum.EXPORT)
            .addColumn(LambdaUtil.fetchFieldName(PetShop::getShopName), "Shop Name")
            .addColumn(LambdaUtil.fetchFieldName(PetShop::getYesOrNo), "Employee Enum")
            .addColumn(LambdaUtil.fetchFieldName(PetShop::getId), "Shop ID")
            .build());
    }
}
```

## （二）Import Extension Point API Definition
```java
pro.shushi.pamirs.file.api.extpoint.ExcelImportDataExtPoint#importData
```

## （三）Sample Code Reference:
`pro.shushi.pamirs.translate.extpoint.ResourceTranslationImportExtPoint#importData`

```java
@Slf4j
@Component
@Ext(ExcelImportTask.class)
public class ResourceTranslationImportExtPoint extends AbstractExcelImportDataExtPointImpl<List<ResourceTranslationItem>> {


    @Override
    // TODO Expression can be customized, such as supporting different templates for multiple [import names] of one model
    @ExtPoint.Implement(expression = "importContext.definitionContext.model==\"" + ResourceTranslation.MODEL_MODEL + "\"")
    public Boolean importData(ExcelImportContext importContext, List<ResourceTranslationItem> dataList) {
        // TODO dataList contains all contents of the imported Excel sheet


        return true;
    }

}
```

# 二、Transaction Control During Row-by-Row Import
Add transaction definitions to the template and set rollback on exception. Refer to the sample code:

## （一）Excel Template Definition
```java
@Component
public class DemoItemImportTemplate implements ExcelTemplateInit {

    public static final String TEMPLATE_NAME = "Product Import Template";

    @Override
    public List<ExcelWorkbookDefinition> generator() {
        // Define transactions (transactions are not needed for operations on a single table during import.)
        // Whether to define transactions depends on actual business logic. For example, scenarios requiring data deletion before import need transaction definitions.
        InitializationUtil.addTxConfig(DemoItem.MODEL_MODEL, ExcelDefinitionContext.EXCEL_TX_CONFIG_PREFIX + TEMPLATE_NAME);

        return Collections.singletonList(
            ExcelHelper.fixedHeader(DemoItem.MODEL_MODEL, TEMPLATE_NAME)
            .setType(ExcelTemplateTypeEnum.IMPORT)
            .createSheet("Product Import-sheet1")
            .createBlock(DemoItem.MODEL_MODEL)
            .addUnique(DemoItem.MODEL_MODEL,"name")
            .addColumn("name","Name")
            .addColumn("description","Description")
            .addColumn("itemPrice","Unit Price")
            .addColumn("inventoryQuantity","Inventory")
            .build().setEachImport(true)
            // TODO Set the flag for rollback on exception, which will roll back the transaction
            .setHasErrorRollback(true)
            .setExcelImportMode(ExcelImportModeEnum.SINGLE_MODEL)
        );

    }
}
```

## （二）Import Logic Processing
```java
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