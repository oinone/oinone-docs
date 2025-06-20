---
title: Data Operations:Import and Export of Complex Field Types
index: true
category:
  - Common Solutions
order: 28
---

If the field to be exported is from a related object of the model, when creating the template, you need to use the form of "object.field". Additionally, during the export operation, you must manually set this field. For example, for the company associated object in the PamirsEmployee model, you can create the corresponding value for export using `company.name`.

# I. Model Definition
```java
@Field.many2one
@Field.Relation(relationFields = {"companyCode"}, referenceFields = {"code"})
@Field(displayName = "Affiliated Company")
private PamirsCompany company;
```

```java
// Define the employee import/export template
@Component
public class EmployeeTemplate implements ExcelTemplateInit {

    public static final String TEMPLATE_NAME = "employeeTemplate";

    @Override
    public List<ExcelWorkbookDefinition> generator() {
        // Can return multiple templates, and the user selects the export template on the page
        return Collections.singletonList(
            ExcelHelper.fixedHeader(PetShop.MODEL_MODEL, TEMPLATE_NAME)
            .createBlock(TEMPLATE_NAME, PetShop.MODEL_MODEL)
            .setType(ExcelTemplateTypeEnum.EXPORT)
            // Use company.name to get the name field in PamirsCompany
            .addColumn("company.name", "Affiliated Company")
            .build());
    }
}
// Manually set this field, as shown in 2
```

# II. Code Examples
## (一) Export of Non-Stored Fields
If the field to be exported is a non-stored field, since by default only fields stored in the database are exported, manual setting is required for non-stored fields during export.

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

        // Override the rawQueryList method and use listFieldQuery to set non-stored fields separately
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

## (二) Multi-Value Field Import
If the field to be imported has multiple values, you can create a proxy model. In this proxy model, set a field to receive the multi-value field. Specifically, in Excel, fill the multi-value field in a single cell, with each value separated by a custom symbol (e.g., ";"). When creating the template, use the template corresponding to this proxy class. During import and export operations, split the field based on ";".

```java
@Model.model(PamirsEmployeeProxy.MODEL_MODEL)
@Model(displayName = "Employee Export Proxy")
@Model.Advanced(type = ModelTypeEnum.PROXY)
public class PamirsEmployeeProxy extends PamirsEmployee {

        private static final long serialVersionUID = -6582160484690807999L;

        public static final String MODEL_MODEL = "business.PamirsEmployeeProxy";

        @Field.String
        @Field(displayName = "Department Code List")
        private String departmentCodeList;
}
```

Create fields of the proxy model when creating the template

```java
.addColumn("departmentCodeList", "Department Code List")
```

Import operation: Create a new class as an extension point for the import function, which needs to inherit the `AbstractExcelImportDataExtPointImpl` class.

```java
@Component
@Ext(ExcelImportTask.class)
@Slf4j
public class EmpTemplateImportExtPoint extends AbstractExcelImportDataExtPointImpl<PamirsEmployeeProxy> {
    // This method must be added, which uses EmployeeTemplate.TEMPLATE_NAME to specify the import template
    @Override
    @ExtPoint.Implement(expression = "importContext.definitionContext.name==\"" + EmployeeTemplate.TEMPLATE_NAME + "\"")
    public Boolean importData(ExcelImportContext importContext, PamirsEmployeeProxy data) {
        // TODO Validate data according to business logic
        String departmentCodeList = data.getDepartmentCodeList();
        if (StringUtils.isNotEmpty(departmentCodeList)) {
            String[] departmentCodes = departmentCodeList.split(";");
            ....
        }
        return true;
    }
}
```

Export operation: Create a new class as an extension point for the export function, which needs to inherit the `DefaultExcelExportFetchDataExtPoint` class.

```java
@Slf4j
@Component
@Ext(ExcelExportTask.class)
@SuppressWarnings({"unchecked"})
public class EmpTemplateExportExtPoint extends DefaultExcelExportFetchDataExtPoint {
    // This method must be added, which uses EmployeeTemplate.TEMPLATE_NAME to specify the export template
    @Override
    @ExtPoint.Implement(expression = "context.name==\"" + EmployeeTemplate.TEMPLATE_NAME + "\"")
    public List<Object> fetchExportData(ExcelExportTask exportTask, ExcelDefinitionContext context) {
        // TODO Validate data according to business logic
        return super.fetchExportData(exportTask, context);
    }

    @Override
    protected List<?> rawQueryList(IWrapper<?> wrapper) {
        // TODO Validate row data according to business logic
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