---
title: 开发辅助：低代码方式实现复制创建
index: true
category:
  - 常见解决方案
order: 16
---

   实际项目的业务场景中，存在「复制创建」的需求，可以实现数据的快速录入。本文介绍通过低代码模式实现复制创建功能。

# 一、实现步骤
## （一）定义基类模型
1. 定义复制基类模型(如：`AbstractCopyModel`)，有复制创建功能的模型都继承该模型；

```java
@Model.model(AbstractCopyModel.MODEL_MODEL)
@Model(displayName = "提供复制方法的基类")
@Model.Advanced(type= ModelTypeEnum.ABSTRACT)
public abstract class AbstractCopyModel extends IdModel  {

    public static final String MODEL_MODEL = "hr.simple.AbstractCopyModel";

}
```



2. 根据 Oinone 模型继承规则，子模型拥有父模型所有的函数；因此只需写基类`AbstractCopyModel`的复制逻辑即可；

```java
@Component
@Model.model(AbstractCopyModel.MODEL_MODEL)
public class AbstractCopyModelAction {

    @Function(openLevel = FunctionOpenEnum.API)
    @Function.Advanced(type = FunctionTypeEnum.QUERY, displayName = "复制")
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

## （二）定义业务模型
需复制创建功能的模型都继承于上面定义的「复制基类」，即继承 AbstractCopyModel

```java
@Model.model(Employee.MODEL_MODEL)
@Model(displayName = "标品-员工", labelFields = "name")
public class Employee extends AbstractCopyModel {

    public static final String MODEL_MODEL = "hr.simple.Employee";

    @Field.String
    @Field(displayName = "姓名", required = true)
    private String name;

    @Field.String
    @Field(displayName = "工号", required = true)
    private String code;

    // 其他属性
}
```

## （三）初始化"复制"按钮
系统启动时初始化「视图动作」，即默认页面的行操作增加「复制」按钮

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

        // 初始化视图动作
        viewActionInit(util);
    }
    private void viewActionInit(InitializationUtil util){
        // 员工信息维护 生成行内复制按钮
        util.createViewAction("Employee_Copy","复制", Employee.MODEL_MODEL, InitializationUtil.getOptions(ViewTypeEnum.TABLE),
                              Employee.MODEL_MODEL, ViewTypeEnum.FORM, ActionContextTypeEnum.SINGLE, ActionTargetEnum.ROUTER,null,null)
        .setLoad("copy");// setLoad指定页面加载时调用后端的方法名

        // 部门信息维护 生成行内复制按钮
        util.createViewAction("Department_Copy","复制", Department.MODEL_MODEL, InitializationUtil.getOptions(ViewTypeEnum.TABLE),
                              Department.MODEL_MODEL, ViewTypeEnum.FORM, ActionContextTypeEnum.SINGLE, ActionTargetEnum.ROUTER,null,null)
        .setLoad("copy");
    }
}
```

通过上面几步，继承于基类`AbstractCopyModel`的模型，只需要初始化「视图动作」，就具备了「复制创建」的功能了。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/1745998324887-c567788e-22fe-47cf-a8c2-a7ba1dc4224a-20250530144822991.png)



