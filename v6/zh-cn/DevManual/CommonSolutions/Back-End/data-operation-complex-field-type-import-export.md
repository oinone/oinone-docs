---
title: 数据操作：复杂字段类型的导入导出
index: true
category:
  - 常见解决方案
order: 28
---

若期望导出的字段来自该模型所关联对象中的某一字段，那么在创建模板时，需采用 “对象.字段” 的形式 。并且，在执行导出操作时，要手动设置该字段。举例而言，对于 PamirsEmployee 模型中的 company 关联对象，可通过 `company.name` 的方式创建对应的值用于导出。

# 一、模型定义
```java
@Field.many2one
@Field.Relation(relationFields = {"companyCode"}, referenceFields = {"code"})
@Field(displayName = "所属公司")
private PamirsCompany company;
```

```java
//定义员工导入导出模版
@Component
public class EmployeeTemplate implements ExcelTemplateInit {

    public static final String TEMPLATE_NAME = "employeeTemplate";

    @Override
    public List<ExcelWorkbookDefinition> generator() {
        //可以返回多个模版，导出的时候页面上由用户选择导出模版
        return Collections.singletonList(
            ExcelHelper.fixedHeader(PetShop.MODEL_MODEL, TEMPLATE_NAME)
            .createBlock(TEMPLATE_NAME, PetShop.MODEL_MODEL)
            .setType(ExcelTemplateTypeEnum.EXPORT)
            //使用company.name获取PamirsCompany里面的name字段
            .addColumn("company.name", "所属公司")
            .build());
    }
}
//手动设置该字段，如2所示
```

# 二、代码示例
## （一）非存储字段的导出
若期望导出的字段为非存储字段，鉴于默认情况下仅导出存储于数据库中的字段，因而针对非存储字段，需在导出时进行手动设置 。

```java
@Slf4j
@Component
@Ext(ExcelExportTask.class)
public class EmpTemplateExportExtPoint extends DefaultExcelExportFetchDataExtPoint {

        @Override
        @ExtPoint.Implement(expression = "context.name==\"" + EmployeeTemplate.TEMPLATE_NAME + "\"")
        public List<Object> fetchExportData(ExcelExportTask exportTask, ExcelDefinitionContext context) {
            return super.fetchExportData(exportTask, context);
        }

        //重写rawQueryList方法，使用listFieldQuery将非存储字段单独设置
        @Override
        protected List<?> rawQueryList(IWrapper<?> wrapper) {
            List<PamirsEmployee> pamirsEmployeeProxies = (List<PamirsEmployee>) Models.data().queryListByWrapper(wrapper);
            if (CollectionUtils.isNotEmpty(pamirsEmployeeProxies)) {
                new PamirsEmployee().listFieldQuery(pamirsEmployeeProxies, PamirsEmployee::getDepartmentList);
            }
          return pamirsEmployeeProxies;
        }
}
```

## （二）多值字段导入
若所需导入的字段存在多个值的情况，可创建一个代理模型。在此代理模型中，设置一个字段用于接收该多值字段。具体操作方式为，在 Excel 中，于一个单元格内填写多值字段，每个字段之间使用自定义符号（例如：“;”）进行分割。在创建模板时，使用该代理类对应的模板。在执行导入与导出操作时，再依据 “;” 对字段进行截取处理。

```java
@Model.model(PamirsEmployeeProxy.MODEL_MODEL)
@Model(displayName = "员工导出代理")
@Model.Advanced(type = ModelTypeEnum.PROXY)
public class PamirsEmployeeProxy extends PamirsEmployee {

        private static final long serialVersionUID = -6582160484690807999L;

        public static final String MODEL_MODEL = "business.PamirsEmployeeProxy";

        @Field.String
        @Field(displayName = "部门编码列表")
        private String departmentCodeList;
}
```

创建模版时创建代理模型的字段

```java
.addColumn("departmentCodeList", "部门编码列表")
```

导入操作：创建一个新类，将其作为导入功能的扩展点，该类需继承 `AbstractExcelImportDataExtPointImpl` 类 。

```java
@Component
@Ext(ExcelImportTask.class)
@Slf4j
public class EmpTemplateImportExtPoint extends AbstractExcelImportDataExtPointImpl<PamirsEmployeeProxy> {
    //必须加这个方法，它使用EmployeeTemplate.TEMPLATE_NAME来指定导入模版
    @Override
    @ExtPoint.Implement(expression = "importContext.definitionContext.name==\"" + EmployeeTemplate.TEMPLATE_NAME + "\"")
    public Boolean importData(ExcelImportContext importContext, PamirsEmployeeProxy data) {
        //TODO 根据逻辑校验数据
        String departmentCodeList = data.getDepartmentCodeList();
        if (StringUtils.isNotEmpty(departmentCodeList)) {
            String[] departmentCodes = departmentCodeList.split(";");
            ....
        }
        return true;
    }
}
```

导出操作：创建一个新类，将其作为导出功能的扩展点，该类需继承 `DefaultExcelExportFetchDataExtPoint` 类。

```java
@Slf4j
@Component
@Ext(ExcelExportTask.class)
@SuppressWarnings({"unchecked"})
public class EmpTemplateExportExtPoint extends DefaultExcelExportFetchDataExtPoint {
    //必须加这个方法，它使用EmployeeTemplate.TEMPLATE_NAME来指定导出模版
    @Override
    @ExtPoint.Implement(expression = "context.name==\"" + EmployeeTemplate.TEMPLATE_NAME + "\"")
    public List<Object> fetchExportData(ExcelExportTask exportTask, ExcelDefinitionContext context) {
        //TODO 根据逻辑校验数据
        return super.fetchExportData(exportTask, context);
    }

    @Override
    protected List<?> rawQueryList(IWrapper<?> wrapper) {
        //TODO 根据逻辑校验行数据
        List<PamirsEmployeeProxy> pamirsEmployeeProxies = (List<PamirsEmployeeProxy>) Models.data().queryListByWrapper(wrapper);
        if (CollectionUtils.isNotEmpty(pamirsEmployeeProxies)) {
            new PamirsEmployeeProxy().listFieldQuery(pamirsEmployeeProxies, PamirsEmployeeProxy::getDepartmentList);
            for (PamirsEmployeeProxy pamirsEmployeeProxy : pamirsEmployeeProxies) {
                List<PamirsDepartment> departmentList = pamirsEmployeeProxy.getDepartmentList();
                if (CollectionUtils.isNotEmpty(departmentList)) {
                    pamirsEmployeeProxy.setDepartmentCodeList(departmentList.stream()
                                                              .map(PamirsDepartment::getCode)
                                                              .collect(Collectors.joining(";")));
                }
            }
        }
        return pamirsEmployeeProxies;
    }
}
```

