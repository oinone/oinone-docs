---
title: 数据操作：多Sheet导入导出示例
index: true
category:
  - 常见解决方案
order: 29
---

# 一、场景描述
准备工作：两个模型，物料 `Material` 和物料类别 `MaterialCategory`。

:::info 目标：在本节结束时，在一个 Excel 模板中同时导入和导出两个模型的数据。

:::

# 二、代码示例
**示例仅供参考**

[点击下载代码示例](https://doc.oinone.top/wp-content/uploads/2024/04/2024042409482459.zip)

# 三、Material 模型
```java
@Model.model(Material.MODEL_MODEL)
@Model.Advanced(unique = {"code"})
@Model(displayName = "物料", labelFields = {"name"})
public class Material extends IdModel {

    private static final long serialVersionUID = -2594216864389636135L;

    public static final String MODEL_MODEL = "maas.Material";

    @Field.String
    @Field(displayName = "物料编码", required = true)
    private String code;

    @Field.String
    @Field(displayName = "物料名称", required = true)
    private String name;
}
```

# 四、MaterialCategory模型
```java
@Model.model(MaterialCategory.MODEL_MODEL)
@Model.Advanced(unique = {"code"})
@Model(displayName = "物料类别", labelFields = {"name"})
public class MaterialCategory extends IdModel {

    private static final long serialVersionUID = 6300896634558908349L;

    public static final String MODEL_MODEL = "maas.MaterialCategory";

    @Field.String
    @Field(displayName = "类别编码", required = true)
    private String code;

    @Field.String
    @Field(displayName = "类别名称", required = true)
    private String name;
}
```

# 五、模板定义
MaterialTemplate 模版定义

```java
@Component
public class MaterialTemplate implements ExcelTemplateInit {

    public static final String TEMPLATE_NAME = "materialTemplate";

    @Override
    public List<ExcelWorkbookDefinition> generator() {
        WorkbookDefinitionBuilder builder = WorkbookDefinitionBuilder.newInstance(Material.MODEL_MODEL, TEMPLATE_NAME)
        .setDisplayName("物料和物料类别")
        .setEachImport(Boolean.FALSE);//设置importData的入参为 (ExcelImportContext importContext, List<MaterialCategory> data)，如入参是单个对象，请删除setEachImport(Boolean.FALSE)

        createMaterialSheet(builder);

        createMaterialCategorySheet(builder);

        return Collections.singletonList(builder.build());
    }

    private static void createMaterialSheet(WorkbookDefinitionBuilder builder) {
        builder.createSheet().setName("物料")
        .createBlock(Material.MODEL_MODEL, ExcelAnalysisTypeEnum.FIXED_HEADER, ExcelDirectionEnum.HORIZONTAL, "A1:B2")
        .createHeader().setStyleBuilder(ExcelHelper.createDefaultStyle()).setIsConfig(Boolean.TRUE)
        .createCell().setField("code").setAutoSizeColumn(Boolean.TRUE).and()
        .createCell().setField("name").setAutoSizeColumn(Boolean.TRUE).and()
        .and()
        .createHeader().setStyleBuilder(ExcelHelper.createDefaultStyle(v -> v.setBold(Boolean.TRUE)).setHorizontalAlignment(ExcelHorizontalAlignmentEnum.CENTER))
        .createCell().setValue("物料编码").and()
        .createCell().setValue("物料名称");
    }

    private static void createMaterialCategorySheet(WorkbookDefinitionBuilder builder) {
        builder.createSheet().setName("物料类别")
        .createBlock(MaterialCategory.MODEL_MODEL, ExcelAnalysisTypeEnum.FIXED_HEADER, ExcelDirectionEnum.HORIZONTAL, "A1:B2")
        .createHeader().setStyleBuilder(ExcelHelper.createDefaultStyle()).setIsConfig(Boolean.TRUE)
        .createCell().setField("code").setAutoSizeColumn(Boolean.TRUE).and()
        .createCell().setField("name").setAutoSizeColumn(Boolean.TRUE).and()
        .and()
        .createHeader().setStyleBuilder(ExcelHelper.createDefaultStyle(v -> v.setBold(Boolean.TRUE)).setHorizontalAlignment(ExcelHorizontalAlignmentEnum.CENTER))
        .createCell().setValue("物料类别编码").and()
        .createCell().setValue("物料类别名称");
    }
}
```

上述模板定义了一个工作簿 (Workbook)，使用`createrSheet()`创建了两个工作表（Sheet），其名称分别为`物料`和`物料类别`

# 六、导入扩展点
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

上述示例使用了平台内置的批量创建或更新的方法，业务使用时可根据业务逻辑自行定义导入逻辑。

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

上述示例使用了平台内置的批量创建或更新的方法，业务使用时可根据业务逻辑自行定义导入逻辑。

在定义导入扩展点时，我们通过`importContext.definitionContext.name`来确定导入扩展点对应的工作簿（Workbook），用`importContext.currentSheetNumber`来判断当前导入的是第几个工作表（Sheet）

综上，上述通过模板定义和导入扩展点实现了多Sheet导入的功能。

# 七、导出模板
在上述模板定义例子中，我们无需做任何修改即可在导出中使用。

特殊情况下，我们可以通过`setType`方法设置模板的使用范围。

+ `ExcelTemplateTypeEnum#IMPORT`：仅导入使用
+ `ExcelTemplateTypeEnum#EXPORT`：仅导出使用
+ `ExcelTemplateTypeEnum#IMPORT_EXPORT`：导入和导入都可以使用

# 八、导出扩展点
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
        // 第一个Sheet使用默认查询即可
        List<Object> results = super.fetchExportData(exportTask, context);
        // 自定义查询第二个Sheet的数据
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

上述示例使用了平台内置的 HookApi 进行权限控制，导出时可自动根据当前用户的数据权限添加过滤条件。

