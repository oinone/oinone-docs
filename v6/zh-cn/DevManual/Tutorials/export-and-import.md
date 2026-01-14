---
title: 文件导入导出（Export and Import）
index: true
category:
  - 研发手册
  - 教程
order: 7

---
:::warning 提示

本教程是 “后端框架教程” 的延伸。请确保你已完成该教程，并以你构建的 “费用管理（expenses）” 模块作为本教程练习的基础。

:::

在大多数管理信息系统中，数据的导入和导出功能是必不可少的。Oinone 内置的导入/导出模板会根据表格视图和表单视图的字段自动生成，有时这些 `导入/导出模板` 或者 `导入/导出默认逻辑` 并不能很好的满足所有业务场景。比如：

+ 导入项目信息时，如果发现项目类型的名称不存在，则自动创建
+ 导出项目信息时，需要导出对应的报销单信息

参考：与此主题相关的文档可在 “[标准模块 - 文件导入导出](/zh-cn/DevManual/Reference/StandardModule/import-export.md)” 中找到。

# 一、为 “项目信息” 创建导入模板

:::info 目标：在本节结束时：

1. 通过 “基础数据 - 项目管理” 页面的导入按钮弹窗，选中 “项目信息导入” 模板并下载。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/ExportAndImport/1749044957098-fdc08973-2ace-417b-83db-d89cfb3c3fc3-20250607112131028.gif)

2. 打开 Excel 文件后可以看到如下所示内容：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/ExportAndImport/1749044693429-30c45e96-a1b3-4286-a835-2ec3b748726a.png)

3. 尝试填写一些项目信息数据：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/ExportAndImport/1749045224201-0e5f6125-59fd-401f-b5cf-834ba50a5d09.png)

4. 通过页面导入 Excel 文件，分别查看项目信息和项目类型是否正常保存：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/ExportAndImport/1749046255378-bf6d6c9f-da5a-4b95-bc3f-09308abc0f49.gif)

:::

如需要对 `文件模块` 进行一些自定义，按照 `JAVA` 特性需要引入对应依赖：

```xml
<dependency>
  <groupId>pro.shushi.pamirs.core</groupId>
  <artifactId>pamirs-file2-api</artifactId>
</dependency>
```

在 Oinone 中，除了对应依赖的引入外，还需要在 `当前模块` 定义中声明对应的模块依赖：

```java
……
@Module(
    name = ExpensesModule.MODULE_NAME,
    displayName = "费用管理",
    version = "1.0.0",
    priority = 1,
    dependencies = {
        ……
        FileModule.MODULE_MODULE,
        ……
    }
)
……
public class ExpensesModule implements PamirsModule {
……
}
```

`Excel` 导入模板的初始化是通过实现 `ExcelTemplateInit` 接口并注册为 `Spring Bean` 自动收集并创建的。Oinone 提供了 `ExcelHelper` 工具类可以很方便的创建一个简单的 “固定表头” 类型的导入模板。

:::tip 举例：以 TestModel 为例创建一个 Excel 导入模板：

:::

```java
@Component
public class TestModelImportTemplate implements ExcelTemplateInit {

    public static final String TEMPLATE_NAME = "testModelImportTemplate";

    @Override
    public List<ExcelWorkbookDefinition> generator() {
        return Collections.singletonList(ExcelHelper.fixedHeader(TestModel.MODEL_MODEL, TEMPLATE_NAME)
                .setDisplayName("测试模型导入")
                .setType(ExcelTemplateTypeEnum.IMPORT)
                .createBlock("测试模型", TestModel.MODEL_MODEL)
                .addColumn("code", "编码")
                .addColumn("name", "名称")
                .addColumn("user.login", "用户账号")
                .build());
    }
}
```

+ 声明模板名称常量 `TEMPLATE_NAME` ，变量会用在导入扩展点的表达式中。
+ ExcelHelper.fixedHeader：创建 `固定表头` 格式的 Excel 模板。
+ setDisplayName：设置下载模板的显示名称，页面选择模板也是使用这个名称展示。
+ setType：设置模板类型，用于选择 `仅导入`、`仅导出`以及 `导入导出` 三种类型。
+ createBlock：创建 `sheet` 和 `block`，`sheet` 名称为 `测试模型`，`block` 对应的模型同导入模型。
+ addColumn：添加一列，`code` 字段，表头标题为 `编码` 。

有了 `Excel` 导入模板，我们要通过自定义导入逻辑来满足实际业务的需要。默认的导入逻辑是 “创建或更新” ，但对于 “用户” 数据的操作并不只是将其保存至数据库这么简单的，通常我们对 “用户” 的创建或更新需要使用对应的 “服务” 才能保证其正常运行。这些都要求我们需要对 “导入逻辑” 进行自定义。

:::tip 举例：以 TestModelImportExtPoint 为例自定义导入逻辑：

:::

```java
@Component
@Ext(ExcelImportTask.class)
public class TestModelImportExtPoint implements ExcelImportDataExtPoint<TestModel> {

    @ExtPoint.Implement(expression = "importContext.definitionContext.name==\"" + TestModelImportTemplate.TEMPLATE_NAME + "\"")
    @Override
    public Boolean importData(ExcelImportContext importContext, TestModel data) {
        String userLogin = Optional.ofNullable(data.getUser()).map(PamirsUser::getLogin).orElse(null);
        PamirsUser user = null;
        if (StringUtils.isNotBlank(userLogin)) {
            // 用户账号不空，则执行用户创建或更新逻辑
            // 并且给 user 赋值
        } else {
            // 用户账号为空，进行一些处理逻辑
            // 并且给 user 赋值
        }
        if (user != null) {
            // 设置用户对象，在保存时将自动保存关联关系字段
            data.setUser(user);
        } else {
            data.unsetUser();
        }
        // 创建并更新主模型数据
        data.createOrUpdate();
        return true;
    }
}

```

+ 扩展点需要使用表达式来限定这个扩展点仅用于指定的导入模板，在这里我们是通过之前我们定义的模板名称 `TEMPLATE_NAME` 进行判定的。
+ 导入扩展点的范型可以直接设置为指定的模型对象，但不能声明为列表或其他类型。每次导入扩展点执行时都会将收集好的一个对象的数据传入并进行处理。

:::warning 提示：

模板中的 `user.login` 字段会将 Excel 填写的 “用户账号” 数据放在 `TestModel#user` 对象的 `login` 字段中进行传递，这对于 `多对一（M2O）` 字段来说是非常有用的一种写法。

:::

> 练习（Exercise）
>
> 1. 为 “项目信息” 创建导入模板（projectInfoImportTemplate）。
> 2. 模板中包含四个字段：项目编码、项目名称、项目类型以及状态。
> 3. 创建导入扩展点（ProjectInfoImportExtPoint），在保存项目信息之前，对项目类型进行处理：如果输入的项目类型名称重复，则获取首个项目类型；如果输入的项目类型名称不存在，则创建对应名称的项目类型。

# 二、为 “项目信息” 创建导出模板

:::info 目标：在本节结束时：

1. 通过 “基础数据 - 项目管理” 页面的导出按钮弹窗，选中 “项目信息导出” 模板导出当前所有项目信息数据，最后跳转至 “文件 - 导出任务” 页面下载导出的文件。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/ExportAndImport/1749096844922-0fffc051-3cda-400c-aeb3-37beba3c036f.gif)

2. 打开 Excel 文件后可以看到如下所示内容：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/ExportAndImport/1749097295267-5992da74-1fad-4bbb-ad58-c06d9483fff2.png)

:::

`Excel` 导出模板也是通过实现 `ExcelTemplateInit` 接口并注册为 `Spring Bean` 自动收集并创建的。与导入模板的定义方式完全相同，我们只需要将 `setType` 中对应的模板类型改为 “仅导出” 即可作为导出模板进行使用。

在导入模板中我们对 多对一（M2O） 类型的字段可以通过 “.” 分隔的形式定义对应的字段值，那么，对于 一对多（O2M） 或 多对多（M2M） 来说，应该如何定义呢？

:::tip 举例：以 TestModel 为例创建一个 Excel 导出模板：

:::

```java
@Component
public class TestModelExportTemplate implements ExcelTemplateInit {

    public static final String TEMPLATE_NAME = "testModelExportTemplate";

    @Override
    public List<ExcelWorkbookDefinition> generator() {
        return Collections.singletonList(ExcelHelper.fixedHeader(TestModel.MODEL_MODEL, TEMPLATE_NAME)
                .setDisplayName("测试模型导出")
                .setType(ExcelTemplateTypeEnum.EXPORT)
                .createBlock("测试模型", TestModel.MODEL_MODEL)
                .addColumn("code", "编码")
                .addColumn("name", new ExcelCellDefinition().setValue("名称").setAutoSizeColumn(true))
                .addColumn("computeName", "计算字段")
                .addColumn("partners[*].name", "合作伙伴名称")
                .build());
    }
}
```

+ 使用 `[*]` 表示列表类型字段
+ `ExcelCellDefinition` 是 Excel 单元格定义 模型，可以用来设置除了 “表头标题” 之外的其他属性，比如 `setAutoSizeColumn` 可以设置是否启用 “自动列宽” 功能。
+ `computeName` 字段的值是通过计算表达式得到的，默认的导出逻辑并不支持这样的计算逻辑，这个需要在 “自定义导出逻辑” 对数据进行处理。

虽然导出模板已经正常定义了，但对于一些字段来说，需要一些特殊的计算逻辑才能正常处理。与 “自定义导入逻辑” 类似，自定义导出时同样也是通过 “扩展点” 来实现的。

:::tip 举例：以 TestModelExportExtPoint 为例自定义导出逻辑：

:::

```java
@Component
@Ext(ExcelExportTask.class)
public class TestModelExportExtPoint extends ExcelExportSameQueryPageTemplate implements ExcelExportFetchDataExtPoint {

    @SuppressWarnings("unchecked")
    @ExtPoint.Implement(expression = "context.name==\"" + TestModelExportTemplate.TEMPLATE_NAME + "\"")
    @Override
    public List<Object> fetchExportData(ExcelExportTask exportTask, ExcelDefinitionContext context) {
        List<Object> dataList = super.fetchExportData(exportTask, context);
        // 取出第一个 block 中的数据，强制转换为对应模型类型
        List<TestModel> list = (List<TestModel>) dataList.get(0);
        for (TestModel item : list) {
            // 计算逻辑
        }
        return dataList;
    }
}
```

> 练习（Exercise）
>
> 1. 为 “项目信息” 创建导出模板（projectInfoExportTemplate）。
> 2. 模板中包含以下字段：项目编码、项目名称、项目类型、状态、项目预算、报销单号、费用项、事由、报销金额、报销人以及附件（电子发票）。
> 3. 创建导出扩展点（ProjectInfoExportExtPoint），在获取到数据之后，通过计算公式（项目预算 = 人均预算 * 人员投入规模）得到项目预算的值。

:::warning 提示：

之前在 “项目信息” 模型中，项目预算被定义为存储字段，会保存在数据库中。在进行这个练习之前，你可以将这个字段改为 “非存储字段” 以方便查看自定义扩展点的计算效果。

:::

