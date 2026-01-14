---
title: Development Aid:Implement Duplication Creation in Low-code Manner
index: true
category:
  - Common Solutions
order: 16
---

In the business scenarios of actual projects, there is a requirement for "duplication creation" to enable rapid data entry. This article introduces how to implement the duplication creation function in a low-code mode.

# Ⅰ. Implementation Steps
## \(Ⅰ\) Define the Base Class Model
1. Define a base class model for duplication (e.g., `AbstractCopyModel`), and all models with the duplication creation function inherit from this model:

```java
@Model.model(AbstractCopyModel.MODEL_MODEL)
@Model(displayName = "Base Class Providing Duplication Method")
@Model.Advanced(type= ModelTypeEnum.ABSTRACT)
public abstract class AbstractCopyModel extends IdModel  {

    public static final String MODEL_MODEL = "hr.simple.AbstractCopyModel";

}
```

2. According to the Oinone model inheritance rules, submodels inherit all functions of the parent model; therefore, only the duplication logic for the base class `AbstractCopyModel` needs to be written:

```java
@Component
@Model.model(AbstractCopyModel.MODEL_MODEL)
public class AbstractCopyModelAction {

    @Function(openLevel = FunctionOpenEnum.API)
    @Function.Advanced(type = FunctionTypeEnum.QUERY, displayName = "Duplicate")
    public AbstractCopyModel copy(AbstractCopyModel data) {
        if (data.getId() != null) {
            data = data.queryById();
            data.unsetId();
            data.unsetCreateDate();
            data.unsetWriteDate();
            data.unsetCreateUid();
            data.unsetWriteUid();
        } else {
            data.construct();
        }

        return data;
    }
}
```

## \(Ⅱ\) Define the Business Model
Models requiring the duplication creation function inherit from the "base class for duplication" defined above, i.e., inherit from `AbstractCopyModel`:

```java
@Model.model(Employee.MODEL_MODEL)
@Model(displayName = "Standard Product - Employee", labelFields = "name")
public class Employee extends AbstractCopyModel {

    public static final String MODEL_MODEL = "hr.simple.Employee";

    @Field.String
    @Field(displayName = "Name", required = true)
    private String name;

    @Field.String
    @Field(displayName = "Employee Number", required = true)
    private String code;

    // Other attributes
}
```

## \(Ⅲ\) Initialize the "Duplicate" Button
Initialize the "view action" when the system starts, i.e., add a "Duplicate" button to the row operations of the default page:

```java
@Component
public class HrSimpleModuleMetaDataEditor implements MetaDataEditor {

    @Override
    public void edit(AppLifecycleCommand command, Map<String, Meta> metaMap) {
        InitializationUtil util = InitializationUtil.get(metaMap, HrSimpleModule.MODULE_MODULE,
                                                         HrSimpleModule.MODULE_NAME);
        if(util==null){
            return;
        }

        // Initialize view actions
        viewActionInit(util);
    }
    
    private void viewActionInit(InitializationUtil util){
        // Employee information maintenance: Generate an in-line duplicate button
        util.createViewAction("Employee_Copy","Duplicate", Employee.MODEL_MODEL, InitializationUtil.getOptions(ViewTypeEnum.TABLE),
                              Employee.MODEL_MODEL, ViewTypeEnum.FORM, ActionContextTypeEnum.SINGLE, ActionTargetEnum.ROUTER,null,null)
        .setLoad("copy");// setLoad specifies the name of the backend method to be called when the page loads

        // Department information maintenance: Generate an in-line duplicate button
        util.createViewAction("Department_Copy","Duplicate", Department.MODEL_MODEL, InitializationUtil.getOptions(ViewTypeEnum.TABLE),
                              Department.MODEL_MODEL, ViewTypeEnum.FORM, ActionContextTypeEnum.SINGLE, ActionTargetEnum.ROUTER,null,null)
        .setLoad("copy");
    }
}
```

Through the above steps, models inheriting from the base class `AbstractCopyModel` will have the "duplication creation" function just by initializing the "view action".

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/1745998324887-c567788e-22fe-47cf-a8c2-a7ba1dc4224a-20250530144822991.png)