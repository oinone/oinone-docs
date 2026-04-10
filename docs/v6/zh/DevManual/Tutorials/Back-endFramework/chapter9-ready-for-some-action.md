---
title: 章节 9：准备学习行为（Ready For Some Action）
index: true
category:
  - 研发手册
  - 教程
  - 后端框架
order: 9

---
到目前为止，我们主要通过声明字段和视图来构建模块。在上一章，借助 constructFun 机制，我们引入了业务逻辑。在任何实际的业务场景中，我们都希望将一些业务逻辑与操作按钮关联起来。以我们的费用管理模块为例，我们希望能够实现以下功能：

+ 作废项目或批准项目
+ 接受或拒绝报销单

有人可能会说，我们已经可以通过手动更改状态来完成这些操作，但这样做并不方便。此外，我们还想添加一些额外的处理逻辑：当报销单被接受时，我们要为项目已报销金额。

# 一、单记录操作

参考：与此主题相关的文档可在 “[操作](/zh/DevManual/Reference/Back-EndFramework/actions-API.md)与[错误管理](/zh/DevManual/Reference/Back-EndFramework/ORM-API.md#420ce0f3)” 中找到。

:::info 目标：在本节结束时，你应该能够：

+ 作废项目或批准项目：
  - 作废和批准操作
  - 已作废的项目不能执行批准，已批准的项目也不能再作废。为清晰起见，视图中已添加状态字段。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-9/info1-1.gif)

+ 接受或拒绝报销单：
  - 接受或拒绝报销操作
  - 一旦报销被接受，就应设置项目的已报销金额。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-9/info1-2.gif)

:::

在我们的费用管理模块中，我们希望将业务逻辑与一些按钮关联起来。最常见的做法是：

``` java
package pro.shushi.oinone.trutorials.expenses.api.model;

import pro.shushi.pamirs.meta.annotation.Action;
import pro.shushi.pamirs.meta.annotation.Field;
import pro.shushi.pamirs.meta.annotation.Model;
import pro.shushi.pamirs.meta.base.IdModel;
import pro.shushi.pamirs.meta.constant.ExpConstants;
import pro.shushi.pamirs.meta.enmu.ViewTypeEnum;

@Model.model(TestActionModel.MODEL_MODEL)
@Model(displayName = "TestAction模型")
public class TestActionModel extends IdModel {
    public static final String MODEL_MODEL="expenses.TestActionModel";

    @Field(displayName = "名称")
    private String name;

    @Action.Advanced(invisible = ExpConstants.idValueNotExist)
    @Action(displayName = "actionDoSomething", bindingType = ViewTypeEnum.FORM)
    public TestActionModel actionDoSomething(TestActionModel testActionModel){
        testActionModel.setName("Something");
        return testActionModel;
    }
}
```

或者，可通过独立的 JAVA 类来定义 Action。在此过程中，仅需运用`@Model.model(TestActionModel.MODEL_MODEL)`注解，即可实现与相应模型的关联 。

``` java
package pro.shushi.oinone.trutorials.expenses.core.action;

import org.springframework.stereotype.Component;
import pro.shushi.oinone.trutorials.expenses.api.model.TestActionModel;
import pro.shushi.pamirs.meta.annotation.Action;
import pro.shushi.pamirs.meta.annotation.Model;
import pro.shushi.pamirs.meta.constant.ExpConstants;
import pro.shushi.pamirs.meta.enmu.ViewTypeEnum;

@Model.model(TestActionModel.MODEL_MODEL)
@Component
public class TestActionModelAction {

    @Action.Advanced(invisible = ExpConstants.idValueNotExist)
    @Action(displayName = "actionDoSomething", bindingType = {ViewTypeEnum.FORM,ViewTypeEnum.TABLE})
    public TestActionModel actionDoSomething(TestActionModel testActionModel){
        testActionModel.setName("Something");
        testActionModel.updateById();
        return testActionModel;
    }
}
```

在对模型操作进行配置时，可运用`@Action`系列注解：

+ `@Action.Advanced(invisible = ExpConstants.idValueNotExist)`：该注解用于设定当 Id 字段值为空时，相关操作将被隐藏。这是由于新增与编辑行为均会跳转至相同的表单视图，而在执行新增操作时，并无展示该操作的必要 。该属性同时也能在 XML 文件中予以覆盖。
+ `@Action(displayName = "actionDoSomething", bindingType = {ViewTypeEnum.FORM,ViewTypeEnum.TABLE})`：此注解主要用于描述操作以及基础展示规则，具体说明如下：	
  - `name`：若未进行配置，其默认值为 JAVA 方法的名称。
  - `bindingType`：用于明确该操作能够在哪些类型的视图中出现，例如表格视图、表单视图、详情视图等。
  - `contextType`：若未配置，默认作用于单条记录。这意味着该操作会出现在表格视图的行内操作区域，以及表单视图的操作区域。
+ @Action 本质上是用于声明一个操作，同时定义一个开放级别为 API 的函数，并将该操作与对应的函数进行绑定，使得在相应的调用场景下，操作能够触发关联函数的执行 。还记得上一章我们定义的 `constructFun` 吗？它仅仅是一个普通函数。

:::warning 提示：

从 JAVA 项目的工程管理视角来看，我们强烈推荐采用第二种写法。具体而言，模型以及接口类适宜定义在`api`包路径下，而业务逻辑实现类则建议放置于`core`包路径下。在上一章介绍`constructFun`机制时采用的是第一种写法，如今可考虑依照第二种方式将相关代码分开编写，以优化项目结构与管理 。

:::

在视图中添加按钮，例如在Form视图中：

``` xml
<view name="formView" type="FORM" cols="2" model="expenses.TestActionModel">
  <template slot="actions" autoFill="true"/>
  <template slot="fields">
    <pack widget="group" title="基础信息">
      <field span="1" invisible="true" priority="5" data="id" label="ID" readonly="true"/>
      <field span="1" priority="101" data="name" label="名称"/>
    </pack>
  </template>
</view>
```

视图默认启用 autoFill 机制，该机制能够自动筛选并填充给定模型内符合特定要求的操作，无需我们手动进行额外设置。另一种写法就是采用白名单机制，需要展示的操作都写着 actions 标签下

``` xml
<view name="formView" type="FORM" cols="2" model="expenses.TestActionModel">
  <template slot="actions">
        <action name="actionDoSomething" type="primary"/>
    </template>
  <template slot="fields">
    <pack widget="group" title="基础信息">
      <field span="1" invisible="true" priority="5" data="id" label="ID" readonly="true"/>
      <field span="1" priority="101" data="name" label="名称"/>
    </pack>
  </template>
</view>
```

> 练习（Exercise）
>
> + 为`expenses.ProjectInfo` 添加以下字段

| 字段（Field）                                                | 字段显示名                                                 | 类型（Type） | JAVA类型     |
| ------------------------------------------------------------ | ---------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| status       | 状态       | `ENUM`                                                       | pro.shushi.pamirs.core.common.enmu.DataStatusEnum |
| reimbursedAmount | 已报销金额 | `FLOAT`                                                      | BigDecimal   |


> + 为 `expenses.ExpenseBill` 同样添加字段 `status`
> + 将新增的字段，添加到你`expenses.ProjectInfo` 模型的表格、表单视图中。
> + 作废项目或批准项目：
>   - 为 `expenses.ProjectInfo` 模型添加 “作废” 和 “批准” 按钮。已作废的项目不能再标记为批准，已批准的项目也不能再作废。
>   - 参考目标中的第一张图片查看预期结果。
>   - 提示：若要抛出错误，可使用 `PamirsException` 异常。Oinone 源代码中有很多这样的示例。
> + 接受或拒绝报销单：
>   - 为 `expenses.ProjectInfo` 模型的表单视图中  `expenseBills` 字段表格子视图中，添加 “接受” 和 “拒绝” 按钮，默认子视图actions标签没有采用autoFill 机制，需要主动增加，并且配置属性： `<action refreshRoot = "true"/>` ，来刷新主视图
>   - 参考目标中的第二张图片查看预期结果。
>   - 当报销被接受时，为相应的项目设置已报销金额。

# 二、批量操作

进行批量操作时，首先要求对应的方法能够对多条记录进行调用。同时，通过将`contextType`声明为`ActionContextTypeEnum.SINGLE_AND_BATCH`，可表明该方法在交互层面支持选择一条或多条记录。当然，若将其声明为`ActionContextTypeEnum.BATCH`，则意味着仅当选中多条数据记录时，该操作才会变为可点击状态 。最常见的做法是：

``` java
@Action(
    displayName = "批量操作",
    label = "批量操作",
    contextType = ActionContextTypeEnum.SINGLE_AND_BATCH
)
public  List<TestActionModel> actionBatch(List<TestActionModel> dataList) {
    for(TestActionModel data:dataList){
        //do something
    }
    return dataList;
}
```




在下一章中，我们将了解如何防止在 Oinone 中输入错误的数据。

