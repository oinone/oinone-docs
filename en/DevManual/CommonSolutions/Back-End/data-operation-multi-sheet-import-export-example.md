---
title: Data Operation:Multi-Sheet Import and Export Example
index: true
category:
  - Common Solutions
order: 29
---

# 一、Scenario Description
Preparations: Two models, Material and MaterialCategory.

:::info Target: By the end of this section, import and export data of two models in one Excel template.

:::

# 二、Code Example
**The example is for reference only**

[Click to download the code example](https://doc.oinone.top/wp-content/uploads/2024/04/2024042409482459.zip)

# 三、Material Model
```java
@Model.model(Material.MODEL_MODEL)
@Model.Advanced(unique = {"code"})
@Model(displayName = "Material", labelFields = {"name"})
public class Material extends IdModel {

    private static final long serialVersionUID = -2594216864389636135L;

    public static final String MODEL_MODEL = "maas.Material";

    @Field.String
    @Field(displayName = "Material Code", required = true)
    private String code;

    @Field.String
    @Field(displayName = "Material Name", required = true)
    private String name;
}
```

# 四、MaterialCategory Model
```java
@Model.model(MaterialCategory.MODEL_MODEL)
@Model.Advanced(unique = {"code"})
@Model(displayName = "Material Category", labelFields = {"name"})
public class MaterialCategory extends IdModel {

    private static final long serialVersionUID = 6300896634558908349L;

    public static final String MODEL_MODEL = "maas.MaterialCategory";

    @Field.String
    @Field(displayName = "Category Code", required = true)
    private String code;

    @Field.String
    @Field(displayName = "Category Name", required = true)
    private String name;
}
```

# 五、Template Definition
MaterialTemplate definition

```java
@Component
public class MaterialTemplate implements ExcelTemplateInit {

    public static final String TEMPLATE_NAME = "materialTemplate";

    @Override
    public List<ExcelWorkbookDefinition> generator() {
        WorkbookDefinitionBuilder builder = WorkbookDefinitionBuilder.newInstance(Material.MODEL_MODEL, TEMPLATE_NAME)
        .setDisplayName("Material and Material Category")
        .setEachImport(Boolean.FALSE);//Set the importData parameter to (ExcelImportContext importContext, List<MaterialCategory> data). If the parameter is a single object, delete setEachImport(Boolean.FALSE)

        createMaterialSheet(builder);

        createMaterialCategorySheet(builder);

        return Collections.singletonList(builder.build());
    }

    private static void createMaterialSheet(WorkbookDefinitionBuilder builder) {
        builder.createSheet().setName("Material")
        .createBlock(Material.MODEL_MODEL, ExcelAnalysisTypeEnum.FIXED_HEADER, ExcelDirectionEnum.HORIZONTAL, "A1:B2")
        .createHeader().setStyleBuilder(ExcelHelper.createDefaultStyle()).setIsConfig(Boolean.TRUE)
        .createCell().setField("code").setAutoSizeColumn(Boolean.TRUE).and()
        .createCell().setField("name").setAutoSizeColumn(Boolean.TRUE).and()
        .and()
        .createHeader().setStyleBuilder(ExcelHelper.createDefaultStyle(v -> v.setBold(Boolean.TRUE)).setHorizontalAlignment(ExcelHorizontalAlignmentEnum.CENTER))
        .createCell().setValue("Material Code").and()
        .createCell().setValue("Material Name");
    }

    private static void createMaterialCategorySheet(WorkbookDefinitionBuilder builder) {
        builder.createSheet().setName("Material Category")
        .createBlock(MaterialCategory.MODEL_MODEL, ExcelAnalysisTypeEnum.FIXED_HEADER, ExcelDirectionEnum.HORIZONTAL, "A1:B2")
        .createHeader().setStyleBuilder(ExcelHelper.createDefaultStyle()).setIsConfig(Boolean.TRUE)
        .createCell().setField("code").setAutoSizeColumn(Boolean.TRUE).and()
        .createCell().setField("name").setAutoSizeColumn(Boolean.TRUE).and()
        .and()
        .createHeader().setStyleBuilder(ExcelHelper.createDefaultStyle(v -> v.setBold(Boolean.TRUE)).setHorizontalAlignment(ExcelHorizontalAlignmentEnum.CENTER))
        .createCell().setValue("Material Category Code").and()
        .createCell().setValue("Material Category Name");
    }
}
```

The above template defines a Workbook, creating two Sheets using `createrSheet()`, named `Material` and `Material Category`.

# 六、Import Extension Points
## （一）MaterialImportExtPoint
```java
@Component
@Ext(ExcelImportTask.class)
public class MaterialImportExtPoint implements ExcelImportDataExtPoint<List<Material>> {

    @ExtPoint.Implement(expression = "importContext.definitionContext.name==\"" + MaterialTemplate.TEMPLATE_NAME + "\" && importContext.currentSheetNumber == 0")
    @Override
    public Boolean importData(ExcelImportContext importContext, List<Material> data) {
        Models.directive().runWithoutResult(() -> Models.data().createOrUpdateWithFieldBatch(data),
                SystemDirectiveEnum.EXT_POINT,
                SystemDirectiveEnum.FROM_CLIENT,
                SystemDirectiveEnum.BUILT_ACTION);
        return Boolean.TRUE;
    }
}
```

The above example uses the platform's built-in batch creation or update method. Businesses can define import logic according to business requirements when using it.

## （二）MaterialCategoryImportExtPoint
```java
@Component
@Ext(ExcelImportTask.class)
public class MaterialCategoryImportExtPoint implements ExcelImportDataExtPoint<List<MaterialCategory>> {

    @ExtPoint.Implement(expression = "importContext.definitionContext.name==\"" + MaterialTemplate.TEMPLATE_NAME + "\" && importContext.currentSheetNumber == 1")
    @Override
    public Boolean importData(ExcelImportContext importContext, List<MaterialCategory> data) {
        Models.directive().runWithoutResult(() -> Models.data().createOrUpdateWithFieldBatch(data),
                SystemDirectiveEnum.EXT_POINT,
                SystemDirectiveEnum.FROM_CLIENT,
                SystemDirectiveEnum.BUILT_ACTION);
        return Boolean.TRUE;
    }
}
```

The above example uses the platform's built-in batch creation or update method. Businesses can define import logic according to business requirements when using it.

When defining import extension points, we determine the Workbook corresponding to the import extension point through `importContext.definitionContext.name` and judge which Sheet is currently imported using `importContext.currentSheetNumber`.

In summary, the above realizes the function of multi-Sheet import through template definition and import extension points.

# 七、Export Template
In the above template definition example, we can use it for export without any modification.

In special cases, we can set the usage scope of the template through the `setType` method.

+ `ExcelTemplateTypeEnum#IMPORT`: For import only
+ `ExcelTemplateTypeEnum#EXPORT`: For export only
+ `ExcelTemplateTypeEnum#IMPORT_EXPORT`: For both import and export

# 八、Export Extension Points
## （一）MaterialExportExtPoint
```java
@Component
@Ext(ExcelExportTask.class)
public class MaterialExportExtPoint extends ExcelExportSameQueryPageTemplate<Object> implements ExcelExportFetchDataExtPoint {

    @Resource
    private HookApi hookApi;

    @ExtPoint.Implement(expression = "context.name==\"" + MaterialTemplate.TEMPLATE_NAME + "\"")
    @Override
    public List<Object> fetchExportData(ExcelExportTask exportTask, ExcelDefinitionContext context) {
        // The first Sheet uses the default query
        List<Object> results = super.fetchExportData(exportTask, context);
        // Custom query for the second Sheet data
        results.add(queryList(Pops.<MaterialCategory>lambdaQuery()
                              .from(MaterialCategory.MODEL_MODEL)
                              .ge(MaterialCategory::getId, 0L)));
        return results;
    }

    protected <T extends IdModel> List<T> queryList(IWrapper<T> wrapper) {
        return Models.directive().run(() -> {
            String modelModel = wrapper.getModel();
            Pagination<T> pagination = new Pagination<>();
            pagination.setModel(modelModel);
            hookApi.before(modelModel, FunctionConstants.queryPage, pagination, wrapper);
            Pagination<T> firstPage = queryFirstPage(pagination, wrapper);
            List<T> results = queryAllPages(modelModel, firstPage, wrapper);
            hookApi.after(modelModel, FunctionConstants.queryPage, new Pagination<T>().setContent(results));
            return results;
        });
    }

    protected <T extends IdModel> Pagination<T> queryFirstPage(Pagination<T> pagination, IWrapper<T> wrapper) {
        return queryPage(pagination, wrapper);
    }

    protected <T extends IdModel> List<T> queryAllPages(String model, Pagination<T> firstPage, IWrapper<T> wrapper) {
        List<T> results = firstPage.getContent();
        Integer totalPages = firstPage.getTotalPages();
        if (totalPages == null || totalPages <= 1) {
            return results;
        }
        for (int i = 2; i <= totalPages; i++) {
            Pagination<T> pagination = new Pagination<>();
            pagination.setModel(model);
            pagination.setCurrentPage(i);
            pagination.setSize(firstPage.getSize());
            wrapper.setModel(model);
            pagination = queryPage(pagination, wrapper);
            results.addAll(pagination.getContent());
        }
        return results;
    }

    protected <T extends IdModel> Pagination<T> queryPage(Pagination<T> pagination, IWrapper<T> wrapper) {
        return Models.origin().queryPage(pagination, wrapper);
    }
}
```

The above example uses the platform's built-in HookApi for permission control, which can automatically add filter conditions based on the current user's data permissions during export.