---
title: 开发辅助：表单自动填充用户的相关信息
index: true
category:
  - 常见解决方案
order: 18
---

   在实际项目的业务应用场景下，时常出现将与用户相关的信息，诸如用户姓名、所属部门等，自动嵌入至表单之中的业务需求，以此达成表单数据的自动填充效果。本文将详尽阐述达成此功能的具体实施步骤。

# 一、实现步骤
## （一）定义基类模型
1. 定义基类模型(如：AbstractDeptModel)，包含需要自动填充的属性(字段)；有需自动填充用户信息表单功能的模型都继承自该模型；

```java
@Model.model(AbstractDeptModel.MODEL_MODEL)
@Model(displayName = "带登录人信息的抽象模型")
@Model.Advanced(type= ModelTypeEnum.ABSTRACT)
public abstract class AbstractDeptModel extends IdModel  {

    public static final String MODEL_MODEL = "hr.simple.AbstractDeptModel";

    @Field.many2one
    @UxForm.FieldWidget(@UxWidget(readonly = "true"))
    @Field(displayName = "登记人", summary = "登记人", required = true, priority = 11)
    private PamirsEmployee registrant;

    @Field.String
    @Field(displayName = "登记人编码", invisible = true, priority = 12)
    private String registrantCode;

    @Field.many2one
    @UxForm.FieldWidget(@UxWidget(readonly = "true"))
    @Field.Relation(relationFields = {"deptCode"}, referenceFields = {"code"})
    @Field(displayName = "所属机构", priority = 13)
    private PamirsDepartment department;

    @Field.String
    @Field(displayName = "所属机构编码", invisible = true, priority = 14)
    private String deptCode;
}
```



2. 根据 Oinone 模型继承规则，子模型拥有父模型所有的函数；因此只需写基类`AbstractDeptModel`的数据填充逻辑即可；

:::info 说明：

下面示例代码中登记人和所属机构都是从 Session 中获取

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

## （二）定义业务模型
需自动填充用户信息表单功能的模型都继承自该模型；即继承 AbstractDeptModel

```java
@Model.model(UnitProjectFiling.MODEL_MODEL)
@Model(displayName = "项目备案登记", labelFields = {"projectName"})
@Model.Advanced(unique = {"projectNo"})
public class UnitProjectFiling extends AbstractDeptModel {

    public static final String MODEL_MODEL = "hr.simple.UnitProjectFiling";

    @UxForm.FieldWidget(@UxWidget(span = 2))
    @Field(displayName = "项目名称")
    private String projectName;

    @Field(displayName = "项目编号")
    private String projectNo;

    @Field.Text
    @Field(displayName = "项目概述")
    private String projectDemo;

    // 其他属性

}
```

## （三）运行效果
通过上面几步，继承与基类`AbstractDeptModel`模型，在创建页会自动填充用户的信息（如登记人和所属部门）

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/1746533429493-cf183ce0-9aa2-418b-93a6-54f54d9552c0-20250530144824829.png)



:::warning 提示：

可以通过文的思路，实现表单自动填充数据的逻辑。前提：自动填充的字段，能够根据系统环境和登录人获取到。

:::

