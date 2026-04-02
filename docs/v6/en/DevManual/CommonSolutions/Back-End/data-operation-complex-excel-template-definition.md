---
title: Data Operation:Complex Excel Template Definition
index: true
category:
  - Common Solutions
order: 27
---

# Ⅰ、Scenario Description
In some cases, simple template definitions cannot meet business requirements, and more complex Excel template definitions are needed. The following describes how to define complex-type templates.

# Ⅱ、Code Example:
``` java
@Model.model(TestApply.MODEL_MODEL)
@Model(displayName = "Test Application")
public class TestApply extends IdModel {

    public static final String MODEL_MODEL = "top.TestApply";

    @Field.String
    @Field(displayName = "Addresser")
    private String addresser;

    @Field.String
    @Field(displayName = "Entrusted Unit")
    private String entrustedUnit;

    @Field.String
    @Field(displayName = "Payer")
    private String payer;

    @Field.String
    @Field(displayName = "Payer Unit Address")
    private String paymentUnitAdd;
}
```

## （Ⅰ）Template Definition
``` java
package pro.shushi.pamirs.top.core.temp;

import org.springframework.stereotype.Component;
import pro.shushi.pamirs.file.api.builder.SheetDefinitionBuilder;
import pro.shushi.pamirs.file.api.builder.WorkbookDefinitionBuilder;
import pro.shushi.pamirs.file.api.enmu.ExcelAnalysisTypeEnum;
import pro.shushi.pamirs.file.api.enmu.ExcelDirectionEnum;
import pro.shushi.pamirs.file.api.enmu.ExcelHorizontalAlignmentEnum;
import pro.shushi.pamirs.file.api.model.ExcelWorkbookDefinition;
import pro.shushi.pamirs.file.api.util.ExcelHelper;
import pro.shushi.pamirs.file.api.util.ExcelTemplateInit;
import pro.shushi.pamirs.top.api.model.TestApply;

import java.util.Collections;
import java.util.List;

@Component
public class DemoTemplate implements ExcelTemplateInit {

    public static final String TEMPLATE_NAME = "DemoTemplate";

    @Override
    public List<ExcelWorkbookDefinition> generator() {
        WorkbookDefinitionBuilder builder = WorkbookDefinitionBuilder.newInstance(TestApply.MODEL_MODEL, TEMPLATE_NAME)
        .setDisplayName("Test Demo");

        DemoTemplate.createSheet(builder);

        return Collections.singletonList(builder.build());
    }

    private static void createSheet(WorkbookDefinitionBuilder builder) {
        SheetDefinitionBuilder sheetBuilder = builder.createSheet().setName("Test Demo");

        buildBasicInfo(sheetBuilder);

    }

    private static void buildBasicInfo(SheetDefinitionBuilder builder) {
        //A1:D8：Indicates the number of cells occupied by the header, and the range must be larger than the actual header row
        BlockDefinitionBuilder mergeRange = builder.createBlock(TestApply.MODEL_MODEL, ExcelAnalysisTypeEnum.FIXED_HEADER, ExcelDirectionEnum.HORIZONTAL, "A1:D8")
        //Preset rows
        .setPresetNumber(10)
        //Which cells to merge
        .createMergeRange("A1:D1")
        .createMergeRange("A2:D2")
        .createMergeRange("A3:D3")
        .createMergeRange("A4:A6")
        .createMergeRange("B4:B6")
        .createMergeRange("C4:C6")
        .createMergeRange("D4:D5");

        //createHeader creates a row, createCell creates a cell, setField specifies the parsing field, and setIsConfig specifies true to mark that this row is a value that needs to be parsed
        mergeRange.createHeader().setStyleBuilder(ExcelHelper.createDefaultStyle()).setIsConfig(Boolean.TRUE)
        .createCell().setField("addresser").setStyleBuilder(ExcelHelper.createDefaultStyle().setWidth(6000)).and()
        .createCell().setField("entrustedUnit").and()
        .createCell().setField("payer").and()
        .createCell().setField("paymentUnitAdd").and()
        .and()

        .createHeader().setStyleBuilder(ExcelHelper.createDefaultStyle(typeface -> typeface.setBold(Boolean.TRUE)).setHorizontalAlignment(ExcelHorizontalAlignmentEnum.CENTER))
        .createCell().setValue("Demo").and()
        .createCell().and()
        .createCell().and()
        .createCell().and()
        .and()

        //Since this row is merged into one cell, other values can be left unset
        .createHeader().setStyleBuilder(ExcelHelper.createDefaultStyle(typeface -> typeface.setBold(Boolean.TRUE)).setHorizontalAlignment(ExcelHorizontalAlignmentEnum.CENTER))
        .createCell().setValue("Effective Amount").and()
        .createCell().and()
        .createCell().and()
        .createCell().and()
        .and()

        .createHeader().setStyleBuilder(ExcelHelper.createDefaultStyle(typeface -> typeface.setBold(Boolean.TRUE)).setHorizontalAlignment(ExcelHorizontalAlignmentEnum.RIGHT))
        .createCell().setValue("Amount Unit: RMB").and()
        .createCell().and()
        .createCell().and()
        .createCell().and()
        .and()

        //EasyExcel cannot parse empty rows, so values are written here. Since the above uses createMergeRange to merge cells and the D column is split, fill in the values of each cell to make the merged cells the same.
        .createHeader().setStyleBuilder(ExcelHelper.createDefaultStyle(typeface -> typeface.setBold(Boolean.TRUE)).setHorizontalAlignment(ExcelHorizontalAlignmentEnum.CENTER))
        .createCell().setValue("Addresser").and()
        .createCell().setValue("Entrusted Unit").and()
        .createCell().setValue("Payer").and()
        .createCell().setValue("Address").and()
        .and()
        .createHeader().setStyleBuilder(ExcelHelper.createDefaultStyle(typeface -> typeface.setBold(Boolean.TRUE)).setHorizontalAlignment(ExcelHorizontalAlignmentEnum.CENTER))
        .createCell().setValue("Addresser").and()
        .createCell().setValue("Entrusted Unit").and()
        .createCell().setValue("Payer").and()
        .createCell().setValue("Address").and()
        .and()
        .createHeader().setStyleBuilder(ExcelHelper.createDefaultStyle(typeface -> typeface.setBold(Boolean.TRUE)).setHorizontalAlignment(ExcelHorizontalAlignmentEnum.CENTER))
        .createCell().setValue("Addresser").and()
        .createCell().setValue("Entrusted Unit").and()
        .createCell().setValue("Payer").and()
        .createCell().setValue("Payer Unit Address").and()
        .and()

        .createHeader().setStyleBuilder(ExcelHelper.createDefaultStyle(typeface -> typeface.setBold(Boolean.TRUE)).setHorizontalAlignment(ExcelHorizontalAlignmentEnum.CENTER))
        .createCell().setValue("Total").and()
        .createCell().and()
        .createCell().and()
        .createCell();
    }

}

```

:::info Note:

Chained calls should not be too long. If they are too long, you can use parameters to承接 (intercept), otherwise it may cause a stack overflow during compilation.

:::

# Ⅲ、Template Example:
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/1746791380504-63cf50bd-4211-4d9e-83d9-1e781a917684-20250530144826776.jpeg)
[Demo Excel Sample](https://doc.oinone.top/wp-content/uploads/2024/11/2024112003150091.xlsx)