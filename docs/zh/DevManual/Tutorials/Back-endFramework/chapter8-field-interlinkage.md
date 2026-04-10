---
title: 章节 8：字段间联动（Field Interlinkage）
index: true
category:
  - 研发手册
  - 教程
  - 后端框架
order: 8

---
模型之间的关系是任何 Oinone 模块的关键组成部分。对于任何业务场景的建模，它们都是必不可少的。然而，我们可能还希望在给定模型内的字段之间建立联系。有时，一个字段的值是由其他字段的值决定的，而有时我们则希望在数据输入方面为用户提供帮助。

这些情况可以通过关系字段domain属性，Ux相关的 compute、 constructFun 属性来实现。尽管从技术层面来讲，本章的内容并不复杂，但这三个概念的语义非常重要。这也是我们首次编写 JAVA 逻辑代码，在此之前，除了类定义和字段声明之外，我们还没有编写过其他任何代码。

# 一、关系字段属性：domain

参考：与此主题相关的文档可在 “[字段属性](/zh/DevManual/Reference/Back-EndFramework/ORM-API.md)” 中找到。

:::info 目标：在本节结束时：

在项目信息模型中，选择了伙伴类型以后，项目外部关联方的可选项自动发生变化

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-8/domain3.gif)

:::

在我们的费用管理模块里，已完成项目外部关联方的定义。若新增一种伙伴类型，那么在选择该伙伴类型后，项目外部关联方的可选范围会随之改变。为实现这一功能，我们将运用`domain`属性这一概念。简单来说，关联字段所呈现的数据，会依据`domain`属性值进行筛选 。

例如，为了在我们的`expenses.TestModel` 模型添加字段`partnerType`，并对字段 `partners` 设置其 `domain` 属性：

``` java
@Field.Enum
@Field(displayName = "伙伴类型")
@UxForm.FieldWidget(@UxWidget(config = {@Prop(name = "clearFields",value = "partners")}))
private BusinessPartnerTypeEnum partnerType;

@Field(displayName = "合作伙伴列表")
@Field.many2many(relationFields = {"testModelId"},referenceFields = {"partnerId"},throughClass =TestModelRelPartner.class)
@Field.Relation(domain = "partnerType == ${activeRecord.partnerType}")
@UxForm.FieldWidget(@UxWidget(widget = "Select"))
// @Field.Relation(domain = "partnerType == ${rootRecord.partnerType}")
private List<PamirsPartner> partners;
```

通过Ux的 `clearFields`属性配置，当`partnerType` 字段发生变化时，需要清空的字段列表。

在关系字段定义中，添加 `domain=X` 选项，其中 `X` 可以接受一个[RSQL](/zh/DevManual/Reference/Back-EndFramework/AdvanceAPI/protocol-API.md#bd46e12f)的表达式，activeRecord代表视图的当前对象

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-8/domain2.gif)

如果不指定UxForm的`widget` 属性，在生成默认视图时，在多对多字段使用的是Table组件，要影响弹出框的数据过滤。即在视图嵌套的情况下，子视图需要用到父视图数据，则可以通过则需要用`rootRecord` 来获取值。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-8/domain1.gif)

:::danger 警告：

关系字段的 `domain` 属性仅在前端组件主动发起数据请求时起作用，展示的方式使用 `widget="Checkbox"` 属性，因为Oinone系统默认实现Checkbox组件，不会再选中是发起新请求，则domain无效。

:::

> **练习（Exercise）**
>
> 按照本节目标中所示，将 `partnerType` 字段添加到你的 `expenses.ProjectInfo` 模型及其表单视图中。
>
> `expenses.ProjectInfo`模型的表单视图已完成自定义设置。基于前面所掌握的知识内容，现在让我们尝试对该表单的自定义视图进行进一步的修改与优化吧!

# 二、UX的一些新属性

## （一）compute

参考：与此主题相关的文档可在 “[UX compute属性](/zh/DevManual/Reference/Back-EndFramework/UX-API.md)” 中找到。

:::info 目标：在本节结束时：

在项目信息模型中，应根据人均预算和人员投入规模，计算最佳项目预算

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-8/computer4.gif)

:::

在我们的费用管理模块中，已经定义了预算和人员投入规模。如果增加一个人均预算，那么，将预算定义为人员投入规模和人均预算这两个字段的乘积是很自然的。为此，我们将使用计算属性的概念，即给定字段的值将根据其他字段的值来计算。

要设置字段的计算属性，并将其 `compute` 属性设置为一个前端支持的计算表达式。计算方法应该为 `activeRecord` 中的每条记录设置计算字段的值。

例如，为了在我们的`expenses.TestModel` 模型及其表单视图中添加字段`computeName`，并设置其 `compute` 属性或表单视图上配置`compute` 属性：

``` java
@Field(displayName = "计算字段")
@UxForm.FieldWidget(@UxWidget(config = {@Prop(name = "compute",value = "activeRecord.name")}))
private String computeName;
```

``` xml
<field data="computeName" label="计算字段" compute="activeRecord.name"/>
```

:::warning 提示：

你可能已经注意到，计算属性一般是跟只读属性配合使用。这是合理的，因为用户不应该设置其值。

然而，倘若`computeName`字段本身也需要支持用户进行修改操作，也就是说`computeName`仅仅是将`name`字段的值作为一个默认值来使用的话。

此时，只需将计算逻辑修改为`activeRecord.computeName ? activeRecord.computeName : activeRecord.name`即可。

:::

> **练习（Exercise）**
>
> 按照本节目标中所示，将 `budgetPerCapita` 字段添加到你的 `expenses.ProjectInfo` 模型及其表单视图中。

| 字段（Field）                                                | 字段显示名                                               | 类型（Type） | JAVA类型   |
| ------------------------------------------------------------ | -------------------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------- |
| budgetPerCapita | 人均预算 | `FLOAT`                                                      | BigDecimal |


> 表单视图中 `budgetAmount` 字段的 `compute` 配置为 `activeRecord.staffSize * activeRecord.budgetPerCapita`

## （二）constructFun

参考：与此主题相关的文档可在 “[UX constructFun属性](/zh/DevManual/Reference/Back-EndFramework/UX-API.md)” 中找到。

:::info 目标：在本节结束时：

当启切换 “项目可见性” 字段时，将设置人员投入规模的默认值为 1。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-8/construct.gif)

:::

在我们的费用管理模块中，我们还希望在数据输入方面为用户提供帮助。当切换了 “项目可见性” 字段时，我们希望为"人员投入规模"设置为默认值。此外，当取消设置 “项目可见性” 字段时，我们希望"人员投入规模"重置为零。在这种情况下，给定字段的值会修改其他字段的值。

`constructFun` 机制为客户端界面提供了一种方式，使得每当用户填写了一个字段值时，无需将任何内容保存到数据库，就可以更新表单。为了实现这一点，在给定字段上增加了Ux注解并指定`constructFun` 的值为我们定义的一个方法，其中 入参`data` 表示表单视图中的记录，并使用 `@Function(openLevel ={FunctionOpenEnum.API})` 来指定该方法可以由前端发起调用。对 `data` 所做的任何更改都会反映在表单上：

``` java
package pro.shushi.oinone.trutorials.expenses.api.model;

import pro.shushi.pamirs.boot.base.ux.annotation.field.UxWidget;
import pro.shushi.pamirs.boot.base.ux.annotation.view.UxForm;
import pro.shushi.pamirs.meta.annotation.Field;
import pro.shushi.pamirs.meta.annotation.Function;
import pro.shushi.pamirs.meta.annotation.Model;
import pro.shushi.pamirs.meta.annotation.Prop;
import pro.shushi.pamirs.meta.base.IdModel;
import pro.shushi.pamirs.meta.enmu.FunctionOpenEnum;
import pro.shushi.pamirs.user.api.model.PamirsUser;

@Model.model(TestConstructFunModel.MODEL_MODEL)
@Model(displayName = "测试ConstructFun模型")
public class TestConstructFunModel extends IdModel {
    public static final String MODEL_MODEL="expenses.TestConstructFunModel";

    @Field(displayName = "名称")
    private String name;

    @Field.String
    @Field(displayName = "描述")
    private String description;

    @Field.many2one
    @Field(displayName = "用户")
    @UxForm.FieldWidget(@UxWidget(config = {@Prop(name = "constructFun",value = "constructFun4User")}))
    private PamirsUser user;

    @Function(openLevel ={FunctionOpenEnum.API})
    public TestConstructFunModel constructFun4User(TestConstructFunModel data){
        data.setName("Document for "+data.getUser().getName());
        data.setDescription("Default description for  "+data.getUser().getName());
        return data;
    }

}
```

在这个例子中，更改合作伙伴也会更改名称和描述的值。之后用户可以自行决定是否进一步修改名称和描述的值。

> **练习（Exercise）**
>
> 设置人员投入规模的值。
>
> 在 `expenses.ProjectInfo` 模型中创建一个 `onProjectVisibilityChange` 方法，以便在切换了 “项目可见性” 字段时，将“人员投入规模”设置为 1。当取消设置时，清除“人员投入规模”字段的值。
>
> 基于此前所学，我们知道 UX 的 Prop 属性皆可在自定义视图中进行设置。现在，就让我们借助这些知识，着手对该表单的自定义视图展开进一步的修改与优化吧！

:::warning 提示：用于提供有用的建议或指导

`compute` 和 `constructFun` 机制常见的陷阱是试图通过添加过多的逻辑来显得 “过于聪明”。这可能会产生与预期相反的结果：最终用户会因所有的自动化操作而感到困惑。

`compute` 往往更容易调试：这样的字段是由给定的方法设置的，所以很容易跟踪值是何时设置的。另一方面，`constructFun` 机制可能会让人感到困惑：很难知道 `constructFun` 方法的影响范围。由于多个 `constructFun` 方法可能会设置相同的字段，因此很容易难以跟踪某个值的来源。

:::

:::danger 警告：

但凡，方法需要从用户界面调用，你都应该将其定义为public方法

:::

### 1、constructFun的配置项

constructFun 默认仅提交当前变化的字段。若需提交整个表单数据或指定字段数据，需通过配置 **constructSubmitType** 实现，具体说明如下：

1. 可选项及配置要求

+ **ALL**：提交整个 form 表单数据，无需额外配置其他参数。
+ **CUSTOM**：提交指定字段数据，需同时配置 **submitFields**，并以逗号分隔字段名（如 "id,projectVisibility"）。

2. XML 配置示例

+ 提交整个表单：

```xml
<field span="1" priority="108" data="projectVisibility" label="项目可见性" 
       constructFun="onProjectVisibilityChange" constructSubmitType='ALL' >
```

+ 提交指定字段：

```xml
<field span="1" priority="108" data="projectVisibility" label="项目可见性" 
       constructFun="onProjectVisibilityChange" constructSubmitType="CUSTOM" 
       submitFields="id,projectVisibility" >
```

3. 模型字段定义示例

在模型字段上通过注解配置：

```java
@UxForm.FieldWidget(@UxWidget(config = {
    @Prop(name = "constructFun", value = "onProjectVisibilityChange"),
    @Prop(name = "constructSubmitType", value = "ALL") // 此处值可为"ALL"或"CUSTOM"
}))
```

通过上述配置，可灵活控制 constructFun 提交的数据范围，满足不同场景的需求。

在下一章中，我们将了解如何在点击按钮时触发一些业务逻辑。

