---
title: 文件导入导出（Import And Export）
index: true
category:
  - 研发手册
  - Reference
  - 标准模块
order: 4

---
# 一、概述

在 Oinone 中，导入/导出功能是通过 Excel 文件作为媒介进行处理的，这也是大多数管理信息系统常用的一种方式。

在功能设计时，我们发现任何一个工作表都可以拆分为一个一个不重复的区块进行单独设计，这也是 Oinone 设计导入/导出模板的设计亮点之一。

Excel 导入/导出模板通过多区块设计简化了单个工作表在业务系统中灵活定义的复杂度，在使用 Oinone 导入/导出功能时，灵活的拆解工作表是一项必备技能。

下面将从 Excel 模板设计概念出发，一步一步帮助读者学会使用导入/导出功能以满足业务需求。

## （一）Excel 模板设计概念

### 1、名词解释

+ 工作簿（Workbook）：一个 Excel 文件称为一个工作簿。
+ 工作表（Sheet）：一个工作簿中存在多个工作表。
+ 区块（Block）：一个工作表中包含多个区块，区块的顺序在多个工作表中是连续的。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/StandardModule/ImportAndExport/1749108162577-a82dbda4-4241-4baf-84c7-a81ebad014b2.png)

+ 行（Row）：在工作表中水平方向的所有单元格的集合。
+ 列（Col）：在工作表中垂直方向的所有单元格的集合。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/StandardModule/ImportAndExport/1749108323650-def9d835-a55f-4960-8256-01de056dd9b6.png)

+ 单元格（Cell）：由坐标 `A1` 定位可以得到一个数据存放的最小单元。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/StandardModule/ImportAndExport/1749108402249-1837fcab-15bf-4e4b-bf3a-5ede4e26a43c.png)

+ 解析类型（analysisType）
  - 固定表头：与 “表格” 类似，多条数据按 “表头” 定义的格式 “向下” 填充。
  - 固定格式：与 “表单” 类似，单条数据按 “单元格” 定义的格式进行填充。
+ 排列方向（direction）
  - 水平排列：子元素水平排列，垂直填充。
  - 垂直排列：子元素垂直排列，水平填充。

### 2、固定表头

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/StandardModule/ImportAndExport/1749109750688-30b1771e-1e81-47ce-8fde-4018594992c2.png)

如图所示，左侧为设计区域，右侧为填充后的结果，总共由四个区块组成。

+ 第一个区块：允许定义多级表头。
+ 第二个区块：上下排列的两个区块，第二个区块将根据第一个区块填充内容的数量向下平移。
+ 第三个区块：当 “末级行” 具备样式时，在填充时将保留原有样式。如图所示：合并单元格样式将在填充时进行保留。
+ 第四个区块：当 “排列方向” 设置为垂直排列时，表头会自动 “行列转置” 并进行水平填充。

### 3、固定格式

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/StandardModule/ImportAndExport/1749109861903-d4dac587-c537-4226-bc08-e781ed3bb390.png)

如图所示，左侧为设计区域，右侧为填充后的结果，只有一个区块。显而易见的是，固定格式的填充方式相比固定表头来说要简单的多，仅仅将数据按设计好的位置进行填充即可。

### 4、设计范围

对于不同的 “解析类型” ，设计范围有些许区别：

+ 固定表头：设计范围需要向填充方向扩展一行。
+ 固定格式：设计范围与 Excel 定义范围完全一致。

## （二）模型拓扑图

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/StandardModule/ImportAndExport/1749110497550-bb3f667e-93fd-4a88-bb76-2001a806cb00.jpeg)

:::warning 提示：

更多关于 “文件模块” 相关 API 的内容请参考：[Reference List - 模型](#quote1)

:::

# 二、准备工作

在使用文件导入导出功能时，需要在 `pamirs-demo-boot` 引入 `pamirs-file2-core` 包依赖，并在启动模块中增加 `file` 模块。

``` java
<dependency>
  <groupId>pro.shushi.pamirs.core</groupId>
  <artifactId>pamirs-file2-core</artifactId>
</dependency>
```

``` yaml
pamirs:
	boot:
    modules:
      - file
```

如果需要在模块中定义导入/导出模板或自定义导入/导出逻辑的，需要在 `pamirs-demo-api` 引入 `pamirs-file2-api` 包依赖：

``` xml
<dependency>
  <groupId>pro.shushi.pamirs.core</groupId>
  <artifactId>pamirs-file2-api</artifactId>
</dependency>
```

在 Oinone 中，除了对应依赖的引入外，还需要在 `当前模块` 定义中声明对应的模块依赖：

``` java
……
@Module(
    name = DemoModule.MODULE_NAME,
    displayName = "演示模块",
    version = "1.0.0",
    priority = 1,
    dependencies = {
        ……
        FileModule.MODULE_MODULE,
        ……
    }
)
……
public class DemoModule implements PamirsModule {
……
}
```

# 三、Yaml 配置

``` yaml
pamirs:
  boot:
    modules:
      - file
  file:
    auto-upload-logo: false # 启动时自动上传 logo
    auto-create-template: true # 启动时自动生成 Excel 模板
    import-property:
      default-each-import: false # 默认逐行导入
      max-error-length: 100 # 默认最大收集错误行数
    export-property:
      default-clear-export-style: false # 默认使用csv导出
      excel-max-support-length: 100000 # excel导出最大支持100000行
      csv-max-support-length: 1000000 # csv导出最大支持1000000行
```

# 四、创建模板

## （一）使用 ExcelHelper 创建模板

在之前的 “[教程 - 文件导入导出](/zh/DevManual/Tutorials/export-and-import.md)” 中我们已经初步使用过 `ExcelHelper` 工具类来创建一个简单的固定表头的 Excel 模板，先让我们简单回顾一下：

``` java
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

`ExcelHelper#fixedHeader` 是创建 固定表头 类型模板的一种简化方式，其本质还是通过 WorkbookDefinitionBuilder 创建模板的。其简化了一些常用功能：

+ createBlock：是 `createSheet` 和 `createBlock` 的组合调用，工具类中也提供了单独的调用方法。
+ 自动计算设计区域，当 `addColumn` 被调用时，将增加一列，设计区域将进行水平扩展。
+ 简化了配置行和表头一一对应，这一点可以在下一节内容中得到体现。

对于这样创建的 Excel 模板内容，在下一节内容会详细解释。

:::warning 提示：

在 `ExcelHelper#fixedHeader` 调用之后，会创建一个 `ExcelFixedHeadHelper` 对象提供一些简单的方法创建工作簿，如果出现无法设置或无法定义的场景，请使用 `WorkbookDefinitionBuilder` 创建模板。

:::

:::warning 提示：

在这里我们选择使用 “导入模板” 进行演示，目的是为了通过 “下载导入模板” 功能快速看到 Excel 文件对应的效果，读者可以在每一步骤之后自行通过这一功能下载对应的 Excel 文件查看其内容，导入模板的内容与设计内容是完全一致的。

读者还可自行创建 “导出模板” 对示例中用到的一些功能进行尝试，在本章内容中只会有 “导入模板” 的示例代码。

:::

## （二）使用 WorkbookDefinitionBuilder 创建模板

让我们看一下和上一小节中使用 `ExcelHelper` 创建相同的模板时，使用 `WorkbookDefinitionBuilder` 对应的写法：

``` java
@Component
public class TestModelImportTemplate implements ExcelTemplateInit {

    public static final String TEMPLATE_NAME = "testModelImportTemplate";

    @Override
    public List<ExcelWorkbookDefinition> generator() {
        return Collections.singletonList(WorkbookDefinitionBuilder.newInstance(TestModel.MODEL_MODEL, TEMPLATE_NAME)
                .setDisplayName("测试模型导入")
                .setType(ExcelTemplateTypeEnum.IMPORT)
                .createSheet("测试模型")
                .createBlock(TestModel.MODEL_MODEL, ExcelAnalysisTypeEnum.FIXED_HEADER, ExcelDirectionEnum.HORIZONTAL, "$A$1:$C$2")
                .createHeader().setStyleBuilder(ExcelHelper.createDefaultStyle()).setIsConfig(Boolean.TRUE)
                .createCell().setField("code").and()
                .createCell().setField("name").and()
                .createCell().setField("user.login").and()
                .and()
                .createHeader().setStyleBuilder(ExcelHelper.createDefaultStyle(v -> v.setBold(true)))
                .createCell().setValue("编码").and()
                .createCell().setValue("名称").and()
                .createCell().setValue("用户账号").and()
                .and()
                .and()
                .and()
                .build());
    }
}
```

我们可以看到，创建 Excel 工作簿的过程是按步骤一步一步处理的：

1. 创建工作簿并设置属性。
2. 创建工作表。
3. 创建区块并设置属性。
4. 创建配置行，用于字段的声明，不在 Excel 工作簿中显示。
5. 创建表头行，在 Excel 工作簿中显示的静态内容。

PS：`and` 方法 用于 “返回上一层” 构建。

针对每个方法的简单介绍如下所示：

+ createSheet 和 and 组合：创建工作表并指定工作表名称。
+ createBlock 和 and 组合：创建区块，并指定区块对应的解析类型、排列方向、模型以及设计区域。
+ createHeader 和 setIsConfig(true) 组合：创建配置行，仅指定字段即可。
+ createHeader 和 and 组合：创建表头行，仅指定单元格内容即可。
+ ExcelHelper.createDefaultStyle：创建默认样式：全边框单元格；水平常规对其；垂直居中；11号字体；无加粗。
+ setBold(true)：设置字体加粗。

用这样的方式创建出来的 Excel 模板文件是这样的：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/StandardModule/ImportAndExport/1749117001580-20151e1a-74bd-468c-9ac2-3ac92ea2b135.png)

:::warning 提示：

+ 设计范围可以通过 Excel 单元格定位的语法格式进行表示，固定表头类型的区块需要向填充方向扩展一行。
+ 在表头行设置的行样式在单元格未设置单元格样式的情况下会使用行样式作为单元格样式，可以理解为行样式是这一行所有单元格的默认样式。
+ 在配置行设置的行样式将在数据填充时会被每一个被填充单元格使用。

:::

:::danger 警告：

“链式调用” 是 “文件模块” 在设计 API 时根据数据结构特点提供的较为清晰的一种使用方式，但在 Java 中，链式调用的栈长度有一定的限制，如果编译时出现 “java: Compilation failed: internal java compiler error” 异常，可以通过给变量赋值的方式 “打断” 链式调用使程序可以正常运行。

:::

## （三）创建固定格式模板

下面让我们来看一下 “固定格式” 模板的创建方法，它与固定表头模板类似，唯一不同的是，标题与字段是间隔定义的，完全按照 Excel 单元格顺序一行一行进行创建，正如下面的代码所示：

``` java
@Component
public class TestModelImportTemplate implements ExcelTemplateInit {

    public static final String TEMPLATE_NAME = "testModelImportTemplate";

    @Override
    public List<ExcelWorkbookDefinition> generator() {
        return Collections.singletonList(WorkbookDefinitionBuilder.newInstance(TestModel.MODEL_MODEL, TEMPLATE_NAME)
                .setDisplayName("测试模型导入")
                .setType(ExcelTemplateTypeEnum.IMPORT)
                .createSheet("测试模型")
                .createBlock(TestModel.MODEL_MODEL, ExcelAnalysisTypeEnum.FIXED_FORMAT, ExcelDirectionEnum.HORIZONTAL, "$A$1:$D$2")
                .createMergeRange("B2:D2")
                .createHeader().setIsConfig(true)
                .createCell().and()
                .createCell().and()
                .createCell().and()
                .createCell().and()
                .and()
                .createRow().setStyleBuilder(ExcelHelper.createDefaultStyle())
                .createCell().setValue("编码").setStyleBuilder(ExcelHelper.createDefaultStyle(v -> v.setBold(true))).and()
                .createCell().setField("code").and()
                .createCell().setValue("名称").setStyleBuilder(ExcelHelper.createDefaultStyle(v -> v.setBold(true))).and()
                .createCell().setField("name").and()
                .and()
                .createRow().setStyleBuilder(ExcelHelper.createDefaultStyle())
                .createCell().setValue("用户账号").setStyleBuilder(ExcelHelper.createDefaultStyle(v -> v.setBold(true))).and()
                .createCell().setField("user.login").and()
                .createCell().and()
                .createCell().and()
                .and()
                .and()
                .and()
                .build());
    }
}
```

在我们创建好这个模板后，通过 “下载导入模板” 功能就可以看到如下所示的 Excel 文件内容：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/StandardModule/ImportAndExport/1749117952347-e8a93d8e-62cb-4130-9978-befde8ed5f0c.png)

:::warning 提示：

在这个示例中，我们用到了 `createMergeRange` 来创建合并单元格，其坐标定位方式与 Excel 文件支持的方式完全一样。

这里需要注意的是，如果在 `createSheet` 之后创建合并单元格将不会根据区块填充的变化而变化，读者可以将合并单元格功能尝试用在 “固定表头” 的导出模板中就看到合并效果会有差异。

:::

## （四）创建带有预置行的导入模板

### 1、使用 setPresetNumber 方法创建预置空行

在第二小节示例代码的基础上，通过 `setPresetNumber(10)` 设置 10 行预置空行。示例代码如下所示：

``` java
@Component
public class TestModelImportTemplate implements ExcelTemplateInit {

    public static final String TEMPLATE_NAME = "testModelImportTemplate";

    @Override
    public List<ExcelWorkbookDefinition> generator() {
        return Collections.singletonList(WorkbookDefinitionBuilder.newInstance(TestModel.MODEL_MODEL, TEMPLATE_NAME)
                .setDisplayName("测试模型导入")
                .setType(ExcelTemplateTypeEnum.IMPORT)
                .createSheet("测试模型")
                .createBlock(TestModel.MODEL_MODEL, ExcelAnalysisTypeEnum.FIXED_HEADER, ExcelDirectionEnum.HORIZONTAL, "$A$1:$C$2")
                .setPresetNumber(10)
                .createHeader().setStyleBuilder(ExcelHelper.createDefaultStyle()).setIsConfig(true)
                .createCell().setField("code").and()
                .createCell().setField("name").and()
                .createCell().setField("user.login").and()
                .and()
                .createHeader().setStyleBuilder(ExcelHelper.createDefaultStyle(v -> v.setBold(true)))
                .createCell().setValue("编码").and()
                .createCell().setValue("名称").and()
                .createCell().setValue("用户账号").and()
                .and()
                .and()
                .and()
                .build());
    }
}
```

下载的导入模板 Excel 文件内容如下：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/StandardModule/ImportAndExport/1749123159401-083b5801-b732-44b6-96ac-8f5dc4b53ba4.png)

### 2、使用 createRow 方法创建自定义内容的预置行

除了预置空行之外，我们还可以通过 `createRow` 方法创建行并且设置对应值自定义预置行，这在具有示例填写的导入模板中是非常有意义的。示例代码如下所示：

``` java
@Component
public class TestModelImportTemplate implements ExcelTemplateInit {

    public static final String TEMPLATE_NAME = "testModelImportTemplate";

    @Override
    public List<ExcelWorkbookDefinition> generator() {
        return Collections.singletonList(WorkbookDefinitionBuilder.newInstance(TestModel.MODEL_MODEL, TEMPLATE_NAME)
                .setDisplayName("测试模型导入")
                .setType(ExcelTemplateTypeEnum.IMPORT)
                .createSheet("测试模型")
                .createBlock(TestModel.MODEL_MODEL, ExcelAnalysisTypeEnum.FIXED_HEADER, ExcelDirectionEnum.HORIZONTAL, "$A$1:$C$2")
                .setPresetNumber(10)
                .createHeader().setStyleBuilder(ExcelHelper.createDefaultStyle()).setIsConfig(true)
                .createCell().setField("code").and()
                .createCell().setField("name").and()
                .createCell().setField("user.login").and()
                .and()
                .createHeader().setStyleBuilder(ExcelHelper.createDefaultStyle(v -> v.setBold(true)))
                .createCell().setValue("编码").and()
                .createCell().setValue("名称").and()
                .createCell().setValue("用户账号").and()
                .and()
                .createRow()
                .createCell().setValue("这是编码").and()
                .createCell().setValue("这是名称").and()
                .createCell().setValue("这是用户账号").and()
                .and()
                .and()
                .and()
                .build());
    }
}
```

下载的导入模板 Excel 文件内容如下：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/StandardModule/ImportAndExport/1749125992800-f392fc4b-c175-4a4c-b003-478a0b27915b.png)

:::warning 提示：

`setPresetNumber` 方法设置预置空数量是预置行的总数，如果手动创建了一行预置行，则在补充预置行时会自动补充不足的部分。比如：示例中预置行总数是 10 行，因为手动创建了一行预置行，则最后只补充了 9 行预置空行。

:::

## （五）开启自动列宽

在上面通过 `createRow` 创建自定义预置行的示例中，我们发现 “这是用户账号” 这一单元格的数据超出所在单元格了，那么，怎么解决这个问题呢？

我们可以通过 “自动列宽” 功能根据内容长度自动计算列宽来处理这个问题。让我们在对应的配置行字段通过 `setAutoSizeColumn` 方法开启这一列的 “自动列宽” 功能。示例代码如下所示：

``` java
@Component
public class TestModelImportTemplate implements ExcelTemplateInit {

    public static final String TEMPLATE_NAME = "testModelImportTemplate";

    @Override
    public List<ExcelWorkbookDefinition> generator() {
        return Collections.singletonList(WorkbookDefinitionBuilder.newInstance(TestModel.MODEL_MODEL, TEMPLATE_NAME)
                .setDisplayName("测试模型导入")
                .setType(ExcelTemplateTypeEnum.IMPORT)
                .createSheet("测试模型")
                .createBlock(TestModel.MODEL_MODEL, ExcelAnalysisTypeEnum.FIXED_HEADER, ExcelDirectionEnum.HORIZONTAL, "$A$1:$C$2")
                .setPresetNumber(9)
                .createHeader().setStyleBuilder(ExcelHelper.createDefaultStyle()).setIsConfig(true)
                .createCell().setField("code").and()
                .createCell().setField("name").and()
                .createCell().setField("user.login").setAutoSizeColumn(true).and()
                .and()
                .createHeader().setStyleBuilder(ExcelHelper.createDefaultStyle(v -> v.setBold(true)))
                .createCell().setValue("编码").and()
                .createCell().setValue("名称").and()
                .createCell().setValue("用户账号").and()
                .and()
                .createRow()
                .createCell().setValue("这是编码").and()
                .createCell().setValue("这是名称").and()
                .createCell().setValue("这是用户账号").and()
                .and()
                .and()
                .and()
                .build());
    }
}
```

下载的导入模板 Excel 文件内容如下：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/StandardModule/ImportAndExport/1749123583282-f22fa980-8f59-4a7b-8ea5-df85c23e25c9.png)

:::warning 提示：

在导出时，如果遇到数据特别长的情况下，自动列宽功能并不是特别万能的解决方案。这时候我们需要使用固定列宽来解决数据过长时展示异常的问题。

我们可以将 `setAutoSizeColumn` 改为下面这样：

`setStyleBuilder(ExcelHelper.createDefaultStyle().setWidth(3000))`

单位问题：POI 提供的宽度单位与 Excel 中通常使用的单位不同，在实际使用时可能会出现误差，需要自行调试。

:::

## （六）多级表头

示例代码如下所示：

``` java
@Component
public class TestModelImportTemplate implements ExcelTemplateInit {

    public static final String TEMPLATE_NAME = "testModelImportTemplate";

    @Override
    public List<ExcelWorkbookDefinition> generator() {
        return Collections.singletonList(WorkbookDefinitionBuilder.newInstance(TestModel.MODEL_MODEL, TEMPLATE_NAME)
                .setDisplayName("测试模型导入")
                .setType(ExcelTemplateTypeEnum.IMPORT)
                .createSheet("测试模型")
                .createBlock(TestModel.MODEL_MODEL, ExcelAnalysisTypeEnum.FIXED_HEADER, ExcelDirectionEnum.HORIZONTAL, "$A$1:$C$2")
                .createMergeRange("$A1:$B1")
                .setPresetNumber(10)
                .createHeader().setStyleBuilder(ExcelHelper.createDefaultStyle()).setIsConfig(true)
                .createCell().setField("code").and()
                .createCell().setField("name").and()
                .createCell().setField("user.login").setAutoSizeColumn(true).and()
                .and()
                .createHeader().setStyleBuilder(ExcelHelper.createDefaultStyle(v -> v.setBold(true)))
                .createCell().setValue("基础信息").and()
                .createCell().and()
                .createCell().setValue("用户信息").and()
                .and()
                .createHeader().setStyleBuilder(ExcelHelper.createDefaultStyle(v -> v.setBold(true)))
                .createCell().setValue("编码").and()
                .createCell().setValue("名称").and()
                .createCell().setValue("用户账号").and()
                .and()
                .createRow()
                .createCell().setValue("这是编码").and()
                .createCell().setValue("这是名称").and()
                .createCell().setValue("这是用户账号").and()
                .and()
                .and()
                .and()
                .build());
    }
}
```

下载的导入模板 Excel 文件内容如下：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/StandardModule/ImportAndExport/1749128470551-db8c9496-b69f-46b1-9257-927dfeb37560.png)

## （七）混合格式

示例代码如下所示：

``` java
@Component
public class TestModelImportTemplate implements ExcelTemplateInit {

    public static final String TEMPLATE_NAME = "testModelImportTemplate";

    @Override
    public List<ExcelWorkbookDefinition> generator() {
        return Collections.singletonList(WorkbookDefinitionBuilder.newInstance(TestModel.MODEL_MODEL, TEMPLATE_NAME)
                .setDisplayName("测试模型导入")
                .setType(ExcelTemplateTypeEnum.IMPORT)
                .createSheet("测试模型")
                .createBlock(TestModel.MODEL_MODEL, ExcelAnalysisTypeEnum.FIXED_FORMAT, ExcelDirectionEnum.HORIZONTAL, "$A$1:$D$2")
                .createMergeRange("$B$2:$D$2")
                .createHeader().setIsConfig(true)
                .createCell().setAutoSizeColumn(true).and()
                .createCell().setAutoSizeColumn(true).and()
                .createCell().setAutoSizeColumn(true).and()
                .createCell().setAutoSizeColumn(true).and()
                .and()
                .createRow().setStyleBuilder(ExcelHelper.createDefaultStyle())
                .createCell().setValue("编码").setStyleBuilder(ExcelHelper.createDefaultStyle(v -> v.setBold(true))).and()
                .createCell().setField("code").and()
                .createCell().setValue("名称").setStyleBuilder(ExcelHelper.createDefaultStyle(v -> v.setBold(true))).and()
                .createCell().setField("name").and()
                .and()
                .createRow().setStyleBuilder(ExcelHelper.createDefaultStyle())
                .createCell().setValue("用户账号").setStyleBuilder(ExcelHelper.createDefaultStyle(v -> v.setBold(true))).and()
                .createCell().setField("user.login").and()
                .createCell().and()
                .createCell().and()
                .and()
                .and()
                .createBlock(TestModel.MODEL_MODEL, ExcelAnalysisTypeEnum.FIXED_HEADER, ExcelDirectionEnum.HORIZONTAL, "$A$3:$D$4")
                .setPresetNumber(10)
                .createHeader().setStyleBuilder(ExcelHelper.createDefaultStyle()).setIsConfig(true)
                .createCell().setField("partners[*].name").and()
                .createCell().setField("partners[*].partnerType").and()
                .createCell().setField("partners[*].phone").and()
                .createCell().setField("partners[*].email").and()
                .and()
                .createHeader().setStyleBuilder(ExcelHelper.createDefaultStyle(v -> v.setBold(true)))
                .createCell().setValue("合作伙伴名称").and()
                .createCell().setValue("合作伙伴类型").and()
                .createCell().setValue("合作伙伴手机号").and()
                .createCell().setValue("合作伙伴邮箱").and()
                .and()
                .and()
                .and()
                .build());
    }
}
```

下载的导入模板 Excel 文件内容如下：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/StandardModule/ImportAndExport/1749124651915-4b045897-6fb0-4ca3-b80e-43c58c1c5e13.png)

:::warning 提示：

对于 Excel 行/列的设置属性，如果出现冲突的，则只会在最上方或最左边的配置行中生效。比如：示例中自动列宽属性配置在第一个区块的配置行的单元格中。

:::

## （八）创建多工作表模板

示例代码如下所示：

``` java
@Component
public class TestModelImportTemplate implements ExcelTemplateInit {

    public static final String TEMPLATE_NAME = "testModelImportTemplate";

    @Override
    public List<ExcelWorkbookDefinition> generator() {
        return Collections.singletonList(WorkbookDefinitionBuilder.newInstance(TestModel.MODEL_MODEL, TEMPLATE_NAME)
                .setDisplayName("测试模型导入")
                .setType(ExcelTemplateTypeEnum.IMPORT)
                .createSheet("测试模型")
                .createBlock(TestModel.MODEL_MODEL, ExcelAnalysisTypeEnum.FIXED_FORMAT, ExcelDirectionEnum.HORIZONTAL, "$A$1:$D$2")
                .createMergeRange("$B$2:$D$2")
                .createHeader().setIsConfig(true)
                .createCell().and()
                .createCell().and()
                .createCell().and()
                .createCell().and()
                .and()
                .createRow().setStyleBuilder(ExcelHelper.createDefaultStyle())
                .createCell().setValue("编码").setStyleBuilder(ExcelHelper.createDefaultStyle(v -> v.setBold(true))).and()
                .createCell().setField("code").and()
                .createCell().setValue("名称").setStyleBuilder(ExcelHelper.createDefaultStyle(v -> v.setBold(true))).and()
                .createCell().setField("name").and()
                .and()
                .createRow().setStyleBuilder(ExcelHelper.createDefaultStyle())
                .createCell().setValue("用户账号").setStyleBuilder(ExcelHelper.createDefaultStyle(v -> v.setBold(true))).and()
                .createCell().setField("user.login").and()
                .createCell().and()
                .createCell().and()
                .and()
                .and()
                .and()
                .createSheet("合作伙伴列表")
                .createBlock(TestModel.MODEL_MODEL, ExcelAnalysisTypeEnum.FIXED_HEADER, ExcelDirectionEnum.HORIZONTAL, "$A$1:$D$2")
                .setPresetNumber(10)
                .createHeader().setStyleBuilder(ExcelHelper.createDefaultStyle()).setIsConfig(true)
                .createCell().setField("partners[*].name").setAutoSizeColumn(true).and()
                .createCell().setField("partners[*].partnerType").setAutoSizeColumn(true).and()
                .createCell().setField("partners[*].phone").setAutoSizeColumn(true).and()
                .createCell().setField("partners[*].email").setAutoSizeColumn(true).and()
                .and()
                .createHeader().setStyleBuilder(ExcelHelper.createDefaultStyle(v -> v.setBold(true)))
                .createCell().setValue("合作伙伴名称").and()
                .createCell().setValue("合作伙伴类型").and()
                .createCell().setValue("合作伙伴手机号").and()
                .createCell().setValue("合作伙伴邮箱").and()
                .and()
                .and()
                .and()
                .build());
    }
}
```

下载的导入模板 Excel 文件内容如下：

+ 测试模型工作表

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/StandardModule/ImportAndExport/1749125363700-f3424164-edb6-4879-b546-02c82d328a64.png)

+ 合作伙伴列表

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/StandardModule/ImportAndExport/1749125385945-59ccce73-bbb8-4c0d-999a-2da84800374d.png)

# 五、自定义导入/导出逻辑

不论是导入逻辑还是导出逻辑，都是使用 “扩展点” 对其逻辑进行处理的，下面分别介绍导入扩展点和导出扩展点的一些基本用法和常见场景的处理方式。

扩展点使用 `expression` 属性配置表达式来决定在什么样的条件下执行对应的扩展点，表达式的用法可参考：[函数 API - 表达式](/zh/DevManual/Reference/Back-EndFramework/functions-API.md)

## （一）模型解释

+ 工作簿模型：在页面上选择模板时使用的模型编码。
+ 区块模型：实际导入/导出时使用的模型编码。

以 “使用 ExcelHelper 创建模板” 小节的示例代码为例：（为了区分不同模型，下面的代码稍做修改）

``` java
@Component
public class TestModelImportTemplate implements ExcelTemplateInit {

    public static final String TEMPLATE_NAME = "testModelImportTemplate";

    @Override
    public List<ExcelWorkbookDefinition> generator() {
        return Collections.singletonList(ExcelHelper.fixedHeader(TestModel1.MODEL_MODEL, TEMPLATE_NAME)
                .setDisplayName("测试模型导入")
                .setType(ExcelTemplateTypeEnum.IMPORT)
                .createBlock("测试模型", TestModel2.MODEL_MODEL)
                .addColumn("code", "编码")
                .addColumn("name", "名称")
                .addColumn("user.login", "用户账号")
                .build());
    }
}
```

可以看到：

+ `ExcelHelper#fixedHeader` 方法的第一个入参为：`TestModel1.MODEL_MODEL` ，该模型编码为 “工作簿模型”，被记录在 `ExcelWorkbookDefinition#model` 字段中。
+ `createBlock` 方法的第二个入参为：`TestModel2.MODEL_MODEL` ，该模型编码为 “区块模型”，被记录在 `ExcelBlockDefinition#bindingModel` 字段中。

## （二）自定义导入扩展点

按模板定义的名称使用导入扩展点是最基本的用法之一：

``` java
@Component
@Ext(ExcelImportTask.class)
public class TestModelImportExtPoint implements ExcelImportDataExtPoint<TestModel> {

    @ExtPoint.Implement(expression = "importContext.definitionContext.name==\"" + TestModelImportTemplate.TEMPLATE_NAME + "\"")
    @Override
    public Boolean importData(ExcelImportContext importContext, TestModel data) {
        // 自定义导入逻辑
        return true;
    }
}
```

+ @Ext(ExcelImportTask.class)：导入扩展点固定参数注解。
+ ExcelImportDataExtPoint：导入扩展点接口定义。
+ ExcelImportContext：Excel 导入上下文，包含 Excel 模板定义等导入所需信息。
+ TestModel：同 “区块模型” 对应的 JAVA 类型。

:::warning 提示：

表达式中，`importContext` 是方法参数名，通过 “.” 分隔的写法获取对象中的值。这是表达式的取值用法，扩展点的 `expression` 属性要求计算结果必须是 `布尔（Boolean）` 类型。示例中表达式可以表述为：当模板名称为 `testModelImportTemplate` 时执行当前扩展点。

:::

### 1、数据验证

在数据验证过程中，有两种中断方式：

+ 通过 “抛出异常” 或 “return false” 进行中断，此时将不再继续读取数据。
+ 通过 return true 进行中断，此时将继续读取数据。

异常中断，不再进行数据导入：（推荐）

``` java
public Boolean importData(ExcelImportContext importContext, TestModel data) {
    String code = data.getCode();
    if (StringUtils.isBlank(code)) {
        throw new IllegalArgumentException("编码不允许为空");
    }
    // 其他处理逻辑
    return true;
}
```

:::warning 提示：

这里的异常并不是直接与前端进行交互，可以使用任何 JAVA 内置异常。

:::

“return false” 中断，添加错误提示信息，不再继续读取数据：

``` java
public Boolean importData(ExcelImportContext importContext, TestModel data) {
    String code = data.getCode();
    if (StringUtils.isBlank(code)) {
        importContext.getImportTask().addTaskMessage(TaskMessageLevelEnum.ERROR, "编码不允许为空");
        return false;
    }
    // 其他处理逻辑
    return true;
}
```

仅添加错误提示信息，继续读取数据：

``` java
public Boolean importData(ExcelImportContext importContext, TestModel data) {
    String code = data.getCode();
    if (StringUtils.isBlank(code)) {
        importContext.getImportTask().addTaskMessage(TaskMessageLevelEnum.ERROR, "编码不允许为空");
        return true;
    }
    // 其他处理逻辑
    return true;
}
```

### 2、逐行导入

若需要收集错误信息并生成对应的 Excel 错误文件，需要在模板中配置 `eachImport = true` 开启逐行导入功能。

``` java
@Component
public class TestModelImportTemplate implements ExcelTemplateInit {

    public static final String TEMPLATE_NAME = "testModelImportTemplate";

    @Override
    public List<ExcelWorkbookDefinition> generator() {
        return Collections.singletonList(ExcelHelper.fixedHeader(TestModel.MODEL_MODEL, TEMPLATE_NAME)
                .setDisplayName("测试模型导入")
                .setType(ExcelTemplateTypeEnum.IMPORT)
                .setEachImport(true)
                .createBlock("测试模型", TestModel.MODEL_MODEL)
                .addColumn("code", "编码")
                .addColumn("name", "名称")
                .addColumn("user.login", "用户账号")
                .build());
    }
}
```

:::warning 提示：

启用逐行导入功能后，只有通过 “异常中断” 才会进行错误信息的收集，其他中断方式都不会生成 “导入错误文件”。

:::

### 3、批量处理导入数据

对于导入性能有要求的业务场景，可以自行控制导入扩展点与数据库操作之间的访问频率。例如我们可以在每一行数据进入之后，先将其保存在 “读取上下文” 提供的 “数据缓冲区”，直到没有最后一行的时候对所有数据进行批量处理。示例代码如下：

``` java
public Boolean importData(ExcelImportContext importContext, TestModel data) {
    // 数据验证
    String code = data.getCode();
    if (StringUtils.isBlank(code)) {
        throw new IllegalArgumentException("编码不允许为空");
    }
    // 获取/创建缓存数据集
    List<TestModel> dataList = importContext.getDataBuffer(0, ArrayList::new);
    // 判断是否读取完成
    if (importContext.getCurrentListener().hasNext()) {
        dataList.add(data);
    } else {
        new TestModel().createOrUpdateBatch(dataList);
    }
    return true;
}
```

### 4、多区块导入数据处理

不论是一个工作表有多个区块，还是多个工作表每个工作表分别有一个区块，总的来说都是多区块处理。

针对每个区块，我们都有对应的区块模型以及模型编码对应的 JAVA 类型，我们可以根据 `区块模型` 或 `区块索引` 来区分这些具体的 JAVA 类型，以便于我们在代码中操作数据。示例代码如下：

``` java
public Boolean importData(ExcelImportContext importContext, Object data) {
    if (importContext.getCurrentBlockNumber() == 0) {
        TestModel1 testModel1 = (TestModel1) data;
        // 测试模型1处理
    } else if (importContext.getCurrentBlockNumber() == 1) {
        TestModel2 testModel2 = (TestModel2) data;
        // 测试模型2处理
    }
    // 其他处理逻辑
    return true;
}
```

## （三）自定义导出扩展点

按模板定义的名称使用导出扩展点是最基本的用法之一：

``` java
@Component
@Ext(ExcelExportTask.class)
public class TestModelExportExtPoint extends ExcelExportSameQueryPageTemplate implements ExcelExportFetchDataExtPoint {

    @ExtPoint.Implement(expression = "context.name==\"" + TestModelExportTemplate.TEMPLATE_NAME + "\"")
    @Override
    public List<`Object`> fetchExportData(ExcelExportTask exportTask, ExcelDefinitionContext context) {
        List<`Object`> dataList = super.fetchExportData(exportTask, context);
        // 自定义导出逻辑
        return dataList;
    }
}
```

+ @Ext(ExcelExportTask.class)：导出扩展点固定参数注解。
+ ExcelExportFetchDataExtPoint：导出扩展点接口定义。
+ ExcelExportSameQueryPageTemplate：导出扩展点默认获取数据的默认实现，包含Hook 调用，与前端发起 queryPage 请求完全相同。
+ List<`Object`>：区块数据，按区块索引进行定义。关于返回值的问题，在下文中可以找到具体解释。

### 1、导出扩展点返回值

为了让导出扩展点的数据获取功能较为通用，其返回值表示区块数据。

假设我们有这样两个区块的模板：

+ 第一个区块为 “固定格式” 类型，其数据结构为 “对象（Object）”。
+ 第二个区块为 “固定表头” 类型，其数据结构为 “列表（List）”。

那么，其返回值的伪代码可以表示为：

``` java
public List<`Object`> fetchExportData(ExcelExportTask exportTask, ExcelDefinitionContext context) {
    // 第一个区块数据
    TestModel data1 = new TestModel();
    // 第二个区块数据
    List<TestModel> data2 = new ArrayList<>();
    // 按区块定义顺序组合为列表
    return Lists.newArrayList(data1, data2);
}
```

### 2、导出时使用权限过滤

由于导出功能未经过前端请求，因此 Hook 功能没有被使用，在我们进行自定义数据获取时，需要使用元位指令 API 让 Hook 生效，更多关于 元位指令 API 的内容请参考：[元位指令 API](/zh/DevManual/Reference/Back-EndFramework/AdvanceAPI/meta-directive-API.md)

下面这段代码示例展示了如何通过自定义数据获取达到与默认扩展点查询逻辑完全一致的情况：

``` java
@Component
@Ext(ExcelExportTask.class)
public class TestModelExportExtPoint implements ExcelExportFetchDataExtPoint {

    @ExtPoint.Implement(expression = "context.name==\"" + TestModelExportTemplate.TEMPLATE_NAME + "\"")
    @Override
    public List<`Object`> fetchExportData(ExcelExportTask exportTask, ExcelDefinitionContext context) {
        // 查询逻辑需要通过元位指令包裹运行，否则 Hook 不生效
        List<TestModel> dataList = Models.directive().run(() -> {
            // 拼接传入的 RSQL 表达式，通常仅作用于第一个区块
            IWrapper<TestModel> wrapper = exportTask.temporaryRsql(exportTask.getWorkbookDefinition().getDomain(), () -> Optional.ofNullable(exportTask.getConditionWrapper())
                    .map(ConditionWrapper::<TestModel>generatorQueryWrapper)
                    .orElseGet(() -> Pops.<TestModel>query().ge(SqlConstants.ID, 0)));
            wrapper.setModel(TestModel.MODEL_MODEL);
            // 使用带拦截的查询方式
            return Models.data().queryListByWrapper(wrapper);
        }, SystemDirectiveEnum.BUILT_ACTION, SystemDirectiveEnum.HOOK);
        // 其他处理逻辑
        return Lists.newArrayList(dataList);
    }
}
```

:::danger 警告：

和其他重写函数类似，一些内置的导出逻辑也会因为重写扩展点而不再生效。例如：数据集大小的校验、自动查询关联关系字段数据等内置功能。对于关联关系字段的查询操作，可以根据模板定义的内容自行决定是否需要查询。

:::

:::warning 提示：

如果查询逻辑需要自定义，仅实现 `ExcelExportFetchDataExtPoint` 接口即可。

如果在查询后需要进行计算，可通过 `ExcelExportSameQueryPageTemplate` 类辅助查询。辅助查询仅能用于第一个区块，

:::

# 六、Reference List

## （一）模型{#quote1}

### 1、Excel 工作簿（ExcelWorkbookDefinition）

| **字段名**            | **类型**                   | **是否必选** | **默认值**    | **描述**                                                     |
| --------------------- | -------------------------- | ------------ | ------------- | ------------------------------------------------------------ |
| name                  | String                     | 是           |               | Excel 工作簿的定义名称                                       |
| displayName           | String                     | 是           |               | Excel 工作簿显示名称                                         |
| filename              | String                     | 否           |               | 导出时使用的文件名，不指定则默认使用名称作为文件名           |
| model                 | String                     | 是           |               | 模型编码用于决定导入导出展示在哪个模型的 table 页，并不用于模型化操作 |
| bindingViewName       | String                     | 否           |               | 当指定视图时，该模板仅在指定视图中展示                       |
| type                  | ExcelTemplateTypeEnum      | 是           | IMPORT_EXPORT | 模板类型                                                     |
| version               | OfficeVersionEnum          | 是           | AUTO          | Office 版本，导入时根据文件名后缀自动识别，无后缀时需手动指定；导出时默认使用新版本 |
| sheetList             | List<`ExcelSheetDefinition`> | 否           |               | 工作表列表，当指定工作表索引时，有且仅有一个对象；否则根据 Excel 文件中的 sheet 个数按顺序排列 |
| redirectUri           | String                     | 否           |               | 下载导入模板重定向地址                                       |
| sheetDefinitions      | String                     | 是           |               | 工作表定义 JSON 字符串                                       |
| definitionContext     | String                     | 否           |               | 缓存工作簿定义的解析内容                                     |
| dataStatus            | DataStatusEnum             | 是           | ENABLED       | 数据状态                                                     |
| importStrategy        | ExcelImportStrategyEnum    | 否           | STANDARD      | 导入策略                                                     |
| exportStrategy        | ExcelExportStrategyEnum    | 否           | STANDARD      | 导出策略                                                     |
| hasErrorRollback      | Boolean                    | 是           | false         | 出现错误进行回滚                                             |
| maxErrorLength        | Integer                    | 是           | 100           | 最大错误数                                                   |
| clearExportStyle      | Boolean                    | 是           | false         | 清除导出样式，使用 CSV 格式进行导出                          |
| excelMaxSupportLength | Integer                    | 否           |               | excel 格式导出最大支持行数                                   |
| csvMaxSupportLength   | Integer                    | 否           |               | csv 格式导出最大支持行数                                     |
| templateSource        | ExcelTemplateSourceEnum    | 否           | CUSTOM        | 模板来源                                                     |
| locations             | List<`ExcelLocation`>        | 否           |               | 国际化配置                                                   |
| defaultShow           | Boolean                    | 否           |               | 默认是否显示                                                 |
| show                  | Boolean                    | 否           |               | 是否显示                                                     |
| eachImport            | Boolean                    | 否           | false         | 逐行导入                                                     |
| domain                | String                     | 否           |               | 默认过滤规则，rsql 表达式 |
| excelImportMode       | ExcelImportModeEnum        | 否           | MULTI_MODEL   | 导入模式                                                     |
| lang                  | String                     | 否           |               | 模板所属语言                                                 |


### 2、Excel 工作表（ExcelSheetDefinition）

| **字段名** | **类型** | **是否必选** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| name | String | 否 |                                                              | 指定工作表名称，当未指定工作表名称时，默认使用模型的显示名称，未绑定模型生成时，默认使用「Sheet + ${index}」作为工作表名称 |
| autoSizeColumn | Boolean | 否 | true | 自动列宽 |
| onceFetchData | Boolean | 否 |                                                              | 该属性仅在包含【固定格式】块时生效，并且所有块的绑定模型必须一致 |
| blockDefinitionList | List<`ExcelBlockDefinition`> | 是 |                                                              | 区块定义 |
| mergeRangeList | List<`ExcelCellRangeDefinition`> | 否 |                                                              | 单元格合并范围 |
| uniqueDefinitions | List<`ExcelUniqueDefinition`> | 否 |                                                              | 唯一定义 |


### 3、Excel 区块（ExcelBlockDefinition）

| **字段名** | **类型** | **是否必选** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| bindingModel | String | 否 |                                                              | 在绑定模型后，可使用默认模板及模型解析功能 |
| fetchNamespace | String | 否 |                                                              | 获取函数命名空间 |
| fetchFun | String | 否 |                                                              | 获取函数名称 |
| domain | String | 否 |                                                              | 默认过滤规则，rsql 表达式 |
| analysisType | ExcelAnalysisTypeEnum | 是 |                                                              | 指定工作表所使用的解析类型，不同的解析类型所需的定义方式存在差异 |
| direction | ExcelDirectionEnum | 是 |                                                              | 指定当前表头行的排列方向 |
| designRange | ExcelCellRangeDefinition | 是 |                                                              | 设计范围 |
| usingCascadingStyle | Boolean | 否 |                                                              | 将样式覆盖变为样式层叠；单个区块有效；优先级顺序为：表头行样式 < 数据行样式 < 单元格样式 |
| presetNumber | Integer | 否 |                                                              | 使用空的字符串填充数据行的单元格 |
| headerList | List<`ExcelHeaderDefinition`> | 否 |                                                              | 表头定义 |
| rowList | List<`ExcelRowDefinition`> | 否 |                                                              | 行定义 |
| mergeRangeList | List<`ExcelCellRangeDefinition`> | 否 |                                                              | 单元格合并范围 |
| uniqueDefinitions | List<`ExcelUniqueDefinition`> | 否 |                                                              | 唯一定义 |


### 4、Excel 行（ExcelRowDefinition）

| **字段名** | **类型** | **是否必选** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| cellList | List<`ExcelCellDefinition`> | 否 |                                                              | 单元格列表 |
| style | ExcelStyleDefinition | 否 |                                                              | 在一行中默认使用全局样式，若设置单元格样式，则覆盖全局样式；在表头行中，水平表头行设置整列样式；垂直表头行设置整行样式；若表头行和数据行同时设置样式，则已数据行的样式为全局样式 |


### 5、Excel 表头行（ExcelHeaderDefinition）

**继承**：ExcelRowDefinition

| **字段名** | **类型** | **是否必选** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| isConfig | Boolean | 否 | false | 配置行不参与计算，且导出时自动忽略；配置行指定的应用范围必须是需要配置的表头范围 |
| isFrozen | Boolean | 否 | false | 冻结功能仅在非配置行且非隐藏行中生效 |


### 6、Excel 单元格（ExcelCellDefinition）

| **字段名** | **类型** | **是否必选** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| field | String | 否 |                                                              | 单元格属性定义   固定表头：仅在配置行中生效   固定格式：在任意单元格中生效 |
| value | String | 否 |                                                              | 单元格的值 |
| type | ExcelValueTypeEnum | 否 |                                                              | 值类型 |
| format | String | 否 |                                                              | 格式化方式（参考用户手册） |
| translate | Boolean | 否 |                                                              | 是否翻译   默认情况下，静态值、枚举和布尔字段会自动翻译，其他情况根据指定值处理 |
| isStatic | Boolean | 否 | false | 是否是静态值   静态值在数据解析时将使用配置值，不读取单元格的值 |
| isFieldValue | Boolean | 否 |                                                              | 标记该单元格的内容为属性值 |
| autoSizeColumn | Boolean | 否 | true | 是否自动列宽 |
| style | ExcelStyleDefinition | 否 |                                                              | 单元格样式 |
| styleCache | CellStyle（ transient ） | 否 |                                                              | 样式缓存（仅运行时使用，序列化时忽略） |


### 7、Excel 唯一定义（ExcelUniqueDefinition）

| **字段名** | **类型** | **是否必选** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| model | String | 是 |                                                              | 关联的模型编码 |
| uniques | List`<String`> | 是 |                                                              | 唯一属性列表   多个属性组合构成唯一标识 |


### 8、Excel 样式（ExcelStyleDefinition）

| **字段名** | **类型** | **是否必选** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| horizontalAlignment | ExcelHorizontalAlignmentEnum | 否 | GENERAL | 水平对齐方式 |
| verticalAlignment | ExcelVerticalAlignmentEnum | 否 |                                                              | 垂直对齐方式 |
| fillBorderStyle | ExcelBorderStyleEnum | 否 |                                                              | 全边框样式（同时设置上下左右边框） |
| topBorderStyle | ExcelBorderStyleEnum | 否 |                                                              | 上边框样式 |
| rightBorderStyle | ExcelBorderStyleEnum | 否 |                                                              | 右边框样式 |
| bottomBorderStyle | ExcelBorderStyleEnum | 否 |                                                              | 下边框样式 |
| leftBorderStyle | ExcelBorderStyleEnum | 否 |                                                              | 左边框样式 |
| fillBorderColor | Integer（RGB 色值） | 否 |                                                              | 全边框颜色（同时设置上下左右边框颜色） |
| topBorderColor | Integer（RGB 色值） | 否 |                                                              | 上边框颜色 |
| rightBorderColor | Integer（RGB 色值） | 否 |                                                              | 右边框颜色 |
| bottomBorderColor | Integer（RGB 色值） | 否 |                                                              | 下边框颜色 |
| leftBorderColor | Integer（RGB 色值） | 否 |                                                              | 左边框颜色 |
| fillPatternType | ExcelFillPatternTypeEnum | 否 |                                                              | 背景填充类型（纯色 / 网点等） |
| backgroundColor | Integer（RGB 色值） | 否 |                                                              | 背景色 |
| foregroundColor | Integer（RGB 色值） | 否 |                                                              | 前景色（图案颜色） |
| wrapText | Boolean | 否 | false | 是否自动换行 |
| shrinkToFit | Boolean | 否 | false | 是否自动收缩文本以适应单元格宽度 |
| width | Integer | 否 |                                                              | 单元格宽度（仅首行有效，单位：列宽单位） |
| height | Integer | 否 |                                                              | 单元格高度（仅首列有效，单位：行高单位） |
| typefaceDefinition | ExcelTypefaceDefinition | 否 |                                                              | 字体定义（包含字体名称、大小、加粗、斜体等属性） |
| styleCache | CellStyle（transient） | 否 |                                                              | 样式缓存（仅运行时使用，序列化时忽略，自动管理 Workbook 样式对象） |


### 9、Excel 字体（ExcelTypefaceDefinition）

| **字段名** | **类型** | **是否必选** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| typeface | ExcelTypefaceEnum | 否 | SONG | 字体类型（如宋体、黑体） |
| size | Integer | 否 | 11 | 字体大小（单位：磅） |
| italic | Boolean | 否 | false | 是否斜体 |
| strikeout | Boolean | 否 | false | 是否添加删除线 |
| color | Integer（IndexedColors索引值） | 否 | 0xfff | 字体颜色（如IndexedColors.RED.getIndex()为红色） |
| typeOffset | ExcelTypeOffsetEnum | 否 | NORMAL | 字符偏移类型（正常 / 上标 / 下标） |
| underline | ExcelUnderlineEnum | 否 | NONE | 下划线类型（无 / 单下划线 / 双下划线等） |
| bold | Boolean | 否 | false | 是否加粗 |


### 10、Excel 翻译（ExcelLocation）

| **字段名** | **类型** | **是否必选** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| model | String | 是 |                                                              | 关联的模型编码（用于定位模板所属模型） |
| name | String | 是 |                                                              | 模板名称（对应 ExcelWorkbookDefinition 的 name 字段） |
| lang | String | 是 |                                                              | 语言标识（如`zh-CN`<br/>、`en-US`<br/>） |
| locationItems | List<`ExcelLocationItem`> | 否 |                                                              | 国际化配置项列表   存储各语言下的文本映射，支持 JSON 格式序列化 |


### 11、Excel 翻译项（ExcelLocationItem）

| **字段名** | **类型** | **是否必选** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| origin | String | 是 |                                                              | 原始文本（未翻译的值） |
| target | String | 是 |                                                              | 翻译后的目标文本（对应语言的值） |


### 12、抽象 Excel 任务（AbstractExcelTask）

| **字段名** | **类型** | **是否必选** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| name | String | 是 |                                                              | 任务名称 |
| workbookDefinition | ExcelWorkbookDefinition | 是 |                                                              | Excel 工作簿定义对象（关联实体） |
| workbookDefinitionId | Long | 是 |                                                              | Excel 工作簿定义 ID（数据库存储字段） |
| workbookName | String | 否 |                                                              | Excel 工作簿名称（冗余字段，方便快速查询） |
| state | ExcelTaskStateEnum | 是 |                                                              | 任务状态（待处理 / 运行中 / 已完成 / 失败等） |
| messages | List<`TaskMessage`> | 否 |                                                              | 任务信息列表   存储任务执行中的日志、错误信息，支持 JSON 格式序列化 |
| module | String | 否 |                                                              | 模块编码（标识操作所属模块，如`order`<br/>、`customer`<br/>） |
| moduleDefinition | ModuleDefinition | 否 |                                                              | 所属应用对象（关联实体，通过 module 字段关联） |
| createUserName | String | 否 |                                                              | 创建人名称（非持久化字段，通过关联用户信息获取） |
| writeUserName | String | 否 |                                                              | 修改人名称（非持久化字段，通过关联用户信息获取） |
| model | String | 否 |                                                              | 模型编码（标识操作对应的业务模型，如`com.example.Order`<br/>） |


### 13、导入任务（ExcelImportTask）

| **字段名** | **类型** | **是否必选** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| file | PamirsFile | 是 |                                                              | 导入文件对象（关联文件存储系统实体，需提前上传文件） |
| eachImport | Boolean | 否 |                                                              | 是否启用逐行导入模式   启用后将逐行处理数据，失败行可生成错误文件 |
| hasErrorRollback | Boolean | 否 |                                                              | 出现错误时是否回滚已导入数据   需与 maxErrorLength 配合使用 |
| maxErrorLength | Integer | 否 |                                                              | 允许的最大错误数   超过该数量时任务终止（默认继承基类配置） |
| errorFile | PamirsFile | 否 |                                                              | 导入失败文件（逐行模式下生成，包含错误行数据） |
| importDataList | List<`String`> | 否 |                                                              | 导入数据列表（内存存储，用于临时数据传递，不存入数据库） |
| readCallbackList | List<`ExcelReadCallback`> | 否 |                                                              | 读取回调列表（运行时注册的回调函数，序列化时忽略） |


### 14、导出任务（ExcelExportTask）

| **字段名** | **类型** | **是否必选** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| file | PamirsFile | 否 |                                                              | 导出文件对象（关联文件存储系统实体） |
| fileType | ExcelExportFileTypeEnum | 否 |                                                              | 导出文件类型（Excel 或 CSV 格式） |
| conditionWrapper | ConditionWrapper | 否 |                                                              | 查询条件包装器   支持 RSQL 表达式及动态条件组合，非持久化存储 |
| rsql | String | 否 |                                                              | RSQL 过滤条件   自动同步 conditionWrapper 中的 rsql 字段，方便快速查询 |
| sync | Boolean | 否 | false | 是否同步执行导出任务   同步模式下将阻塞等待导出完成，异步模式返回任务 ID |
| exportMethod | ExcelExportMethodEnum | 否 | TEMPLATE | 导出方法   TEMPLATE：基于模板导出；DIRECT：直接导出数据 |
| selectedFields | List<`ModelField`> | 否 |                                                              | 选择字段列表   当 exportMethod 为 DIRECT 时，指定要导出的模型字段 |
| requestId | String | 否 |                                                              | 单次请求 ID   同步下载时用于标识 Redis 中存储的临时数据 |


### 15、任务消息（TaskMessage）

**继承**：TransientModel

| **字段名** | **类型** | **是否必选** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| id | Long | 否 |                                                              | 消息唯一标识（可选，用于分页查询或定位特定消息） |
| level | TaskMessageLevelEnum | 是 |                                                              | 消息级别   ERROR：错误；WARNING：警告；INFO：提示 |
| recordDate | Date | 否 |                                                              | 消息记录时间（自动生成，精确到毫秒） |
| rowIndex | Integer | 否 |                                                              | 关联的 Excel 行号（导入任务中用于定位错误行，从 1 开始计数） |
| message | String | 是 |                                                              | 消息内容   支持国际化翻译（`translate=true`<br/>） |


## （二）枚举

### 1、模板类型（ExcelTemplateTypeEnum）

| **值**   | **显示名称** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| IMPORT_EXPORT | 全部 | 全部 |
| IMPORT | 导入 | 仅用作导入 |
| EXPORT | 导出 | 仅用作导出 |


### 2、Office 版本（OfficeVersionEnum）

| **值**   | **显示名称** | **描述** | **对应 Excel 类型** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| AUTO | 自动识别 | 自动识别文件类型，无法识别时会出错 | XLSX |
| OLD | 旧版 | 指 2003 年及之前发行的 office 版本，使用旧的文件后缀 | XLS |
| NEW | 新版 | 指 2003 年之后发行的 office 版本，使用新的文件后缀 | XLSX |


### 3、数据状态（DataStatusEnum）

| **值**   | **显示名称** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| DRAFT | 草稿 | 草稿状态 |
| NOT_ENABLED | 未启用 | 未启用状态 |
| ENABLED | 已启用 | 已启用状态 |
| DISABLED | 已禁用 | 已禁用状态 |


### 4、导入策略（ExcelImportStrategyEnum）

| **值**   | **显示名称** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| STANDARD | 标准模式 | 标准模式（默认），开发人员自行控制所有导入过程 |
| EACH | 逐行导入 | 自动收集导入错误并生成错误文件，适合大数据量分步处理 |
| ALL | 全部成功 | 自动开启导入事务，出现任何错误立即中断并回滚，确保数据一致性 |
| ALL_EACH | 全部成功并收集错误 | 自动开启导入事务，同时收集导入错误生成错误文件，兼顾一致性和错误定位 |


### 5、导出策略（ExcelExportStrategyEnum）

| **值**   | **显示名称** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| STANDARD | 默认获取 | 默认使用单个扩展点获取整个工作簿的全部数据（适合小数据量场景） |
| SINGLE | 单一函数获取 | 使用工作簿中定义的函数完整获取整个工作簿的全部数据（统一数据源） |
| BLOCK | 多函数获取 | 使用每个块定义的函数分别获取对应块中的数据（适合多数据源分块场景） |
| STREAM | 流式获取 | 通过分页获取每个块中的数据，数据获取与填充交替执行（优化内存占用） |


### 6、模板来源（ExcelTemplateSourceEnum）

| **值**   | **显示名称** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| SYSTEM | 系统生成 | 当前模型不存在模板时通过系统自动生成，创建新模板后自动删除，编辑后保留 |
| INITIALIZATION | 初始化生成 | 系统初始化时创建的模板，不允许编辑或删除 |
| CUSTOM | 自定义 | 由用户手动创建或编辑的模板 |


### 7、导入模式（ExcelImportModeEnum）

| **值**   | **显示名称** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| MULTI_MODEL | 多模型 | 一个模板对应多个不同的 Sheet，默认模式 |
| SINGLE_MODEL | 单模型 | 所有 Sheet 共用同一个数据模型 |


### 8、解析类型（ExcelAnalysisTypeEnum）

| **值**   | **显示名称** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| FIXED_HEADER | 固定表头 | 固定表头 |
| FIXED_FORMAT | 固定格式 | 固定格式 |


### 9、排列方向（ExcelDirectionEnum）

| **值**   | **显示名称** | **描述** | **对应 EasyExcel 写入方向** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| HORIZONTAL | 水平排列 | 子元素水平排列，垂直填充 | VERTICAL |
| VERTICAL | 垂直排列 | 子元素垂直排列，水平填充 | HORIZONTAL |


### 10、值类型（ExcelValueTypeEnum）

| **值**   | **显示名称** | **描述** | **默认格式（示例）** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| STRING | 文本 | 普通文本 | - |
| INTEGER | 整数 | 整数数值 | `0`                 |
| NUMBER | 数字 | 带小数的数字 | `0.00`              |
| DATETIME | 日期 + 时间 | 日期时间组合 | `yyyy-MM-dd HH:mm:ss`<br/>（对应`DATETIME`<br/>格式） |
| FORMULA | 公式 | Excel 公式 | - |
| BOOLEAN | 布尔 | 布尔值（是 / 否） | `{"true":"是","false":"否"}` |
| CALENDAR | 日历 | 日期类型 | - |
| COMMENT | 备注 | 单元格备注 | - |
| HYPER_LINK | 超链接 | 超链接地址 | - |
| RICH_TEXT_STRING | 富文本 | 富文本内容 | - |
| ENUMERATION | 枚举 | 枚举值 | - |
| BIT | 二进制枚举 | 二进制枚举值 | - |
| OBJECT | 对象 | 复杂对象 | - |


### 11、水平对齐方式（ExcelHorizontalAlignmentEnum）

| **值**   | **显示名称** | **描述** | **对应 POI 枚举值** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| GENERAL | 默认 | 文本居左；数字、日期和时间居右；布尔居中 | HorizontalAlignment.GENERAL |
| LEFT | 左对齐 | 内容左对齐 | HorizontalAlignment.LEFT |
| CENTER | 居中对齐 | 内容居中对齐 | HorizontalAlignment.CENTER |
| RIGHT | 右对齐 | 内容右对齐 | HorizontalAlignment.RIGHT |
| FILL | 填充对齐 | 内容重复填充以适应单元格宽度 | HorizontalAlignment.FILL |
| JUSTIFY | 左右对齐 | 内容两端对齐，自动调整字间距（适用于多行文本） | HorizontalAlignment.JUSTIFY |
| CENTER_SELECTION | 居中选择对齐 | 内容在选定区域内居中（需配合单元格合并使用） | HorizontalAlignment.CENTER_SELECTION |
| DISTRIBUTED | 分散对齐 | 内容均匀分布，两端与单元格边界对齐 | HorizontalAlignment.DISTRIBUTED |


### 12、垂直对齐方式（ExcelVerticalAlignmentEnum）

| **值**   | **显示名称** | **描述** | **对应 POI 枚举值** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| TOP | 顶部对齐 | 内容与单元格顶部对齐 | VerticalAlignment.TOP |
| CENTER | 居中对齐 | 内容垂直居中对齐 | VerticalAlignment.CENTER |
| BOTTOM | 底部对齐 | 内容与单元格底部对齐 | VerticalAlignment.BOTTOM |
| JUSTIFY | 上下对齐 | 内容两端对齐，自动调整行间距（适用于多行文本） | VerticalAlignment.JUSTIFY |
| DISTRIBUTED | 分散对齐 | 内容均匀分布，上下与单元格边界对齐 | VerticalAlignment.DISTRIBUTED |


### 13、边框样式（ExcelBorderStyleEnum）

| **值**   | **显示名称** | **描述** | **对应 POI 枚举值** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| NONE | 无边框 | 无边框 | BorderStyle.NONE |
| THIN | 细边框 | 细实线边框 | BorderStyle.THIN |
| MEDIUM | 常规边框 | 中等粗细实线边框 | BorderStyle.MEDIUM |
| THICK | 粗边框 | 粗实线边框 | BorderStyle.THICK |
| DASHED | 虚线边框 | 虚线边框 | BorderStyle.DASHED |
| DOTTED | 点线边框 | 点线边框 | BorderStyle.DOTTED |
| DOUBLE | 双线边框 | 双实线边框 | BorderStyle.DOUBLE |
| HAIR | 发线边框 | 极细实线边框（发丝状） | BorderStyle.HAIR |
| MEDIUM_DASHED | 中虚线边框 | 中等虚线边框 | BorderStyle.MEDIUM_DASHED |
| DASH_DOT | 点划线边框 | 点 - 划虚线边框 | BorderStyle.DASH_DOT |
| MEDIUM_DASH_DOT | 中划线点边框 | 中等点 - 划虚线边框 | BorderStyle.MEDIUM_DASH_DOT |
| DASH_DOT_DOT | 点 - 点 - 点边框 | 点 - 点 - 划虚线边框 | BorderStyle.DASH_DOT_DOT |
| MEDIUM_DASH_DOT_DOT | 中短划线 - 点 - 点边框 | 中等点 - 点 - 划虚线边框 | BorderStyle.MEDIUM_DASH_DOT_DOT |
| SLANTED_DASH_DOT | 斜线点边框 | 倾斜点 - 划虚线边框 | BorderStyle.SLANTED_DASH_DOT |


### 14、填充类型（ExcelFillPatternTypeEnum）

| **值**   | **显示名称** | **描述** | **对应 POI 枚举值** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| NO_FILL | 不填充 | 无背景填充 | FillPatternType.NO_FILL |
| SOLID_FOREGROUND | 纯色填充 | 单一颜色背景填充 | FillPatternType.SOLID_FOREGROUND |
| FINE_DOTS | 细点填充 | 细密点状背景填充 | FillPatternType.FINE_DOTS |
| ALT_BARS | 交替条纹填充 | 横向交替条纹背景填充 | FillPatternType.ALT_BARS |
| SPARSE_DOTS | 稀疏点填充 | 稀疏点状背景填充 | FillPatternType.SPARSE_DOTS |
| THICK_HORZ_BANDS | 粗横向条纹填充 | 粗横向条纹背景填充 | FillPatternType.THICK_HORZ_BANDS |
| THICK_VERT_BANDS | 粗纵向条纹填充 | 粗纵向条纹背景填充 | FillPatternType.THICK_VERT_BANDS |
| THICK_BACKWARD_DIAG | 粗斜线向后填充 | 粗斜线（从左上到右下）背景填充 | FillPatternType.THICK_BACKWARD_DIAG |
| THICK_FORWARD_DIAG | 粗斜线向前填充 | 粗斜线（从右上到左下）背景填充 | FillPatternType.THICK_FORWARD_DIAG |
| BIG_SPOTS | 大点填充 | 大尺寸点状背景填充 | FillPatternType.BIG_SPOTS |
| BRICKS | 砖块填充 | 砖块纹理背景填充 | FillPatternType.BRICKS |
| THIN_HORZ_BANDS | 细横向条纹填充 | 细横向条纹背景填充 | FillPatternType.THIN_HORZ_BANDS |
| THIN_VERT_BANDS | 细纵向条纹填充 | 细纵向条纹背景填充 | FillPatternType.THIN_VERT_BANDS |
| THIN_BACKWARD_DIAG | 细斜线向后填充 | 细斜线（从左上到右下）背景填充 | FillPatternType.THIN_BACKWARD_DIAG |
| THIN_FORWARD_DIAG | 细斜线向前填充 | 细斜线（从右上到左下）背景填充 | FillPatternType.THIN_FORWARD_DIAG |


### 15、字体（ExcelTypefaceEnum）

| **值**   | **显示名称** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| SONG | 宋体 | 宋体（中文常用正文字体） |
| REGULAR_SCRIPT | 楷体 | 楷体（手写风格字体） |
| BOLDFACE | 黑体 | 黑体（粗体无衬线字体） |
| YAHEI | Microsoft YaHei | 微软雅黑（清晰易读的无衬线字体） |


### 16、字符偏移类型（ExcelTypeOffsetEnum）

| **值**   | **显示名称** | **描述** | **对应 POI 值** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| NORMAL | 常规 | 正常显示 | Font.SS_NONE（0） |
| SUPER | 上标 | 文字偏上显示 | Font.SS_SUPER（1） |
| SUB | 下标 | 文字偏下显示 | Font.SS_SUB（2） |


### 17、下划线类型（ExcelUnderlineEnum）

| **值**   | **显示名称** | **描述** | **对应 POI 值** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| NONE | 无 | 无下划线 | Font.U_NONE（0） |
| SINGLE | 单下划线 | 单实线下划线 | Font.U_SINGLE（1） |
| DOUBLE | 双下划线 | 双实线下划线 | Font.U_DOUBLE（2） |
| SINGLE_ACCOUNTING | 会计风格单下划线 | 适配会计报表的单下划线（与单元格等宽） | Font.U_SINGLE_ACCOUNTING（3） |
| DOUBLE_ACCOUNTING | 会计风格双下划线 | 适配会计报表的双下划线（与单元格等宽） | Font.U_DOUBLE_ACCOUNTING（4） |


### 18、任务状态（ExcelTaskStateEnum）

| **值**   | **显示名称** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| PROCESSING | 处理中 | 任务正在执行中（进行数据读写或转换） |
| SUCCESS | 成功 | 任务已成功完成（所有数据处理完毕且无错误） |
| FAILURE | 失败 | 任务执行失败（因错误终止，需检查日志或错误文件） |


### 19、导出文件类型（ExcelExportFileTypeEnum）

| **值**   | **显示名称** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| EXCEL | Excel 格式 | 导出 Excel 格式文件（.xlsx） |
| CSV | CSV 格式 | 导出 CSV 格式文件（逗号分隔值） |


### 20、导出方式（ExcelExportMethodEnum）

| **值**   | **显示名称** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| TEMPLATE | 根据模板导出 | 使用预定义的 Excel 模板进行数据填充导出 |
| SELECT_TEMPLATE_FIELD | 根据模板选择字段导出 | 基于模板选择部分字段进行数据过滤后导出 |
| SELECT_FIELD | 根据模型选择字段导出 | 直接从数据模型中选择字段生成 Excel 导出 |


### 21、消息级别（TaskMessageLevelEnum）

| **值**   | **显示名称** | **描述** | **处理逻辑** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| TIP | 提示 | 控制台输出的常规提示信息 | 仅控制台打印，不存储 |
| INFO | 信息 | 任务执行的详细信息 | 存储到信息列表，用于追溯 |
| WARNING | 警告 | 非阻塞性警告（不影响任务主流程） | 不回滚，需人工关注 |
| ERROR | 异常 | 导致任务失败的错误信息 | 触发回滚，终止任务执行 |



