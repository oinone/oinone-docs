---
title: Development Aid：Automatic Form Filling with User-related Information
index: true
category:
  - Common Solutions
order: 18
---

In practical project business scenarios, there is often a requirement to automatically embed user-related information such as user name and department into forms to achieve automatic form data filling. This article elaborates on the specific implementation steps to achieve this function.

# 1. Implementation Steps
## (1) Define Base Class Model
1. Define a base class model (e.g., AbstractDeptModel) containing attributes (fields) that need to be automatically filled; any model requiring automatic user information form filling inherits from this model:

```java
@Model.model(AbstractDeptModel.MODEL_MODEL)
@Model(displayName = "Abstract Model with Login User Information")
@Model.Advanced(type= ModelTypeEnum.ABSTRACT)
public abstract class AbstractDeptModel extends IdModel  {

    public static final String MODEL_MODEL = "hr.simple.AbstractDeptModel";

    @Field.many2one
    @UxForm.FieldWidget(@UxWidget(readonly = "true"))
    @Field(displayName = "Registrant", summary = "Registrant", required = true, priority = 11)
    private PamirsEmployee registrant;

    @Field.String
    @Field(displayName = "Registrant Code", invisible = true, priority = 12)
    private String registrantCode;

    @Field.many2one
    @UxForm.FieldWidget(@UxWidget(readonly = "true"))
    @Field.Relation(relationFields = {"deptCode"}, referenceFields = {"code"})
    @Field(displayName = "Affiliated Department", priority = 13)
    private PamirsDepartment department;

    @Field.String
    @Field(displayName = "Affiliated Department Code", invisible = true, priority = 14)
    private String deptCode;
}
```



2. According to Oinone model inheritance rules, sub-models inherit all functions of the parent model; thus, only the data filling logic for the base class `AbstractDeptModel` needs to be written:

:::info Note:

In the example code below, both the registrant and affiliated department are obtained from the Session.

:::

```java
@Slf4j
@Component
@Model.model(AbstractDeptModel.MODEL_MODEL)
public class AbstractDeptModelAction {

    @Function(openLevel = FunctionOpenEnum.API)
    @Function.Advanced(type = FunctionTypeEnum.QUERY)
    public AbstractDeptModel construct(AbstractDeptModel data) {
        data.setRegistrant(HrSimpleSession.getEmployee());
        data.setDepartment(HrSimpleSession.getDepartment());
        return data.construct();
    }

}
```

## (2) Define Business Model
Models requiring automatic user information form filling inherit from this model, i.e., inherit from AbstractDeptModel:

```java
@Model.model(UnitProjectFiling.MODEL_MODEL)
@Model(displayName = "Project Filing Registration", labelFields = {"projectName"})
@Model.Advanced(unique = {"projectNo"})
public class UnitProjectFiling extends AbstractDeptModel {

    public static final String MODEL_MODEL = "hr.simple.UnitProjectFiling";

    @UxForm.FieldWidget(@UxWidget(span = 2))
    @Field(displayName = "Project Name")
    private String projectName;

    @Field(displayName = "Project Number")
    private String projectNo;

    @Field.Text
    @Field(displayName = "Project Overview")
    private String projectDemo;

    // Other attributes

}
```

## (3) Running Effect
Through the above steps, models inheriting from the base class `AbstractDeptModel` will automatically fill in user information (such as registrant and affiliated department) on the creation page:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/1746533429493-cf183ce0-9aa2-418b-93a6-54f54d9552c0-20250530144824829.png)



:::warning Tip:

The logic for automatic form filling can be implemented using the思路 (approach) in this article. Prerequisite: The fields to be automatically filled can be obtained based on the system environment and the logged-in user.

:::