---
title: 章节 7：模型间关系（Relations Between Models）
index: true
category:
  - 研发手册
  - 教程
  - 后端框架
order: 7

---
上一章介绍了如何为包含基本字段的模型创建自定义视图。然而，在任何实际的业务场景中，我们需要的模型不止一个。此外，模型之间的关联也是必不可少的。很容易想象，一个模型可以包含客户信息，另一个模型包含用户列表。在任何现有的业务模型中，你可能都需要引用客户或用户。

在我们的费用管理模块中，对于一个项目信息，我们还需要以下信息：

+ 项目类型
+ 项目发起人
+ 外部关联方
+ 收到的报销列表

# 一、多对一关系（many2one）

参考：与此主题相关的文档可在 “[多对一关系](/zh-cn/DevManual/Reference/Back-EndFramework/ORM-API.md#多对一关系many2one)” 中找到。

:::info 目标：在本节结束时：

1. 应创建一个新的 `expenses.ProjectType` 模型，并添加相应的菜单、操作和视图。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-7/m2o-1.png)

2. 应向 `expenses.ProjectInfo` 模型添加两个多对一（many2one）字段：项目发起人和项目类型。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-7/m2o-2.png)

:::

在我们的费用管理模块中，我们想要定义项目类型的概念。例如，项目类型可以是采购类、研发类，以及内部行政类。根据项目类型对其进行分类是一种常见的业务需求，特别是为了更精确地进行筛选。

一个项目可以有一种类型，但同一种类型可以被分配给多个项目。这就是多对一（many2one）概念所支持的关系。

多对一关系是指向另一个对象的简单链接。例如，为了在我们的测试模型中定义与 `user.PamirsUser` 的链接，我们可以有以下两种这样写：

```java
@Field.many2one
@Field(displayName = "用户")
private PamirsUser user;
```

```java
@Field.many2one
@Field(displayName = "用户")
@Field.Relation(relationFields = {"userId"},referenceFields = {"id"})
private PamirsUser user;

@Field.Integer
@Field(displayName = "用户Id")
private Long userId;
```

在未配置 `@Field.Relation` 的情况下，多对一（many2one）字段会在当前模型中默认创建一个以 `Id`（例如 `userId`）结尾的字段，该字段用于与目标模型的 `id` 建立关联。然后可以通过以下方式轻松访问关联对象（用户）的数据：

```java
PamirsUser user =testModel.fieldQuery(TestModel::getUser).getUser();
user.getName();
```

:::danger 警告：如果要引用其他模块的模型，JAVA特性需引入对应依赖

:::

```xml
<dependency>
  <groupId>pro.shushi.pamirs.core</groupId>
  <artifactId>pamirs-user-api</artifactId>
</dependency>
<dependency>
  <groupId>pro.shushi.pamirs.core</groupId>
  <artifactId>pamirs-business-api</artifactId>
</dependency>
```

:::danger 警告：如果要引用其他模块的模型，Oinone特性需申明模块依赖

:::

```plain
……
@Module(
    name = ExpensesModule.MODULE_NAME,
    displayName = "费用管理",
    version = "1.0.0",
    priority = 1,
    dependencies = {ModuleConstants.MODULE_BASE, UserModule.MODULE_MODULE, BusinessModule.MODULE_MODULE}
)
……
public class ExpensesModule implements PamirsModule {
……
}
```

在实际应用中，在表单视图里，多对一关系可以看作是一个下拉列表。

> **练习（Exercise）**
>
> 添加项目类型表。
>
> 创建 `expenses.ProjectType` 模型，并添加以下字段：

| 字段（Field） | 字段显示名 | 类型（Type） | 属性                                                         |
| ------------- | ---------- | ------------ | ------------------------------------------------------------ |
| name          | 名称       | `STRING`     | required（必填） |


> 这个练习很好地复习了前面几章的内容：你需要创建一个模型，设置该模型，添加一个操作和一个菜单，以及创建一个视图。
>
> **提示**：[不要忘记添加访问权限](/zh-cn/DevManual/Tutorials/Back-endFramework/chapter4-a-brief-introduction-to-security.md)。

再次重启服务器并刷新以查看结果！

在费用管理模块中，关于一个项目，我们还缺少三条信息：项目类型、项目发起人和外部关联方

。外部关联方可以是任何人，但另一方面，项目发起人是公司的员工（即 Oinone 用户）。

在 Oinone 中，我们常用到两个模型：

+ `business.PamirsPartner`：合作伙伴是一个实体或法人实体。它可以是一家公司、一个个人。
+ `user.PamirsUser`：系统用户。用户可以是 “内部用户”，即他们可以访问 Oinone 的后端。或者他们可以是 “门户用户”，即他们无法访问后端，只能访问前端（例如，在电子商务中查看他们之前的订单）。

> **练习（Exercise）**
>
> 添加项目类型和项目发起人。
>
> 使用上述常用模型中的 `user.PamirsUser`，向 `expenses.ProjectInfo` 模型添加项目发起人字段。
>
> 使用模型 `expenses.ProjectType`，向 `expenses.ProjectInfo` 模型添加项目类型字段。
>
> 它们应该添加到表单视图的一个新选项卡中，如本节目标中所示。

:::warning 提示：

表格视图中自动出现的导入导出操作，我们暂且忽略，后续章节会对此进行详细介绍。

:::

现在让我们来看看其他类型的关联。

# 二、多对多关系（many2many）

参考：与此主题相关的文档可在 “[多对多关系](/zh-cn/DevManual/Reference/Back-EndFramework/ORM-API.md#多对多关系many2many)” 中找到。

:::info 目标：在本节结束时：

应创建 `expenses_project_info_rel_partner` 表，并添加几个字段：

:::

```java
mysql> desc expenses_project_info_rel_partner;
+-----------------+----------+------+-----+-------------------+-----------------------------------------------+
| Field           | Type     | Null | Key | Default           | Extra                                         |
+-----------------+----------+------+-----+-------------------+-----------------------------------------------+
| project_info_id | bigint   | NO   | PRI | NULL              |                                               |
| partner_id      | bigint   | NO   | PRI | NULL              |                                               |
| create_date     | datetime | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
| write_date      | datetime | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| create_uid      | bigint   | YES  |     | NULL              |                                               |
| write_uid       | bigint   | YES  |     | NULL              |                                               |
| is_deleted      | bigint   | NO   | PRI | 0                 |                                               |
+-----------------+----------+------+-----+-------------------+-----------------------------------------------+
7 rows in set (0.01 sec)
```

:::info 向 `expenses.ProjectInfo` 模型添加“外部关联方”字段

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-7/m2m-1.png)

:::

在我们的费用管理模块中，想要定义项目外部关联方的概念。例如，“X设备供应商”或“X实施供应商”。

一个项目可以有多个外部关联方，并且一个外部关联方可以被分配给多个项目。这就是多对多（many2many）概念所支持的关系。

多对多关系是一种双向的多重关系：任何一方的记录都可以与另一方的任意数量的记录相关联。例如，为了在我们的 `expenses.TestModel` 模型中定义与 `business.PamirsPartner` 的链接，我们可以有以下两种这样写：

## （一）中间表使用系统默认生成的

```java
@Field.many2many
@Field(displayName = "合作伙伴列表")
private List<PamirsPartner> partners;
```

默认生成规则如下：中间表会存放在字段定义所在模型对应的数据库中，表名按照关联模型名称的字母顺序排列，使用 `_rel_` 进行拼接。

示例中间表名为： `expenses_pamirs_partner_rel_test_model`

此中间表会包含两个字段，分别是 pamirs_partner_id 与 test_model_id，它们各自对应  `business.PamirsPartner` 模型 和  `expenses.TestModel`模型 的 id 。

这意味着可以向我们的测试模型中添加多个合作伙伴。它的行为类似于记录列表，这意味着访问数据时必须使用循环：

```java
testModel.fieldQuery(TestModel::getPartners);
for(PamirsPartner partner: testModel.getPartners()){
    partner.getName();
}
```

## （二）中间表使用特定的模型

```java
package pro.shushi.oinone.trutorials.expenses.api.model;

import pro.shushi.pamirs.meta.annotation.Field;
import pro.shushi.pamirs.meta.annotation.Model;
import pro.shushi.pamirs.meta.base.BaseRelation;

@Model.model(TestModelRelPartner.MODEL_MODEL)
@Model(displayName = "测试模型与合作伙伴关联表")
public class TestModelRelPartner extends BaseRelation {

    public static final String MODEL_MODEL="expenses.TestModelRelPartner";
    @Field(displayName = "测试模型Id")
    private Long testModelId;

    @Field(displayName = "合作伙伴Id")
    private Long partnerId;

}
```

```java
@Field(displayName = "合作伙伴列表")
@Field.many2many(relationFields = {"testModelId"},referenceFields = {"partnerId"},throughClass =TestModelRelPartner.class)
private List<PamirsPartner> partners;
```

我们指定使用 `TestModelRelPartner` 模型来定义中间表。在这个中间表中，`test_model_id` 字段对应 `expenses.TestModel` 模型的 ID，而 `partner_id` 字段则对应 `business.PamirsPartner` 模型的 ID。

:::warning 提示：合作伙伴数据准备

合作伙伴可在「管理中心-合作伙伴-公司|个人」中进行管理与维护。新增一个“数式Oinone”公司和“陈小友”个人用于测试。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-7/partner.gif)

:::

> **练习（Exercise）**
>
> 添加项目与合作伙伴关联表。
>
> 创建 `expenses.ProjectInfoRelPartner` 模型，并添加以下字段：

| 字段（Field）                                                | 字段显示名                                                 | 类型（Type） | JAVA类型 |
| ------------------------------------------------------------ | ---------------------------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| projectInfoId | 项目信息Id | `INTEGER`                                                    | Long     |
| partnerId    | 合作伙伴Id | `INTEGER`                                                    | Long     |


> **练习（Exercise）**
>
> 添加外部关联方。
>
> 使用上述常用模型中的 `user.PamirsPartner`，向 `expenses.ProjectInfo` 模型添加外部关联方字段（partners）。
>
> 将 `partners` 字段添加到你的 `expenses.ProjectInfo` 模型及其表单视图和列表视图中。
>
> **提示**：在视图中，按照此处展示的方式使用 `widget="Checkbox" optionLabel="activeRecord.name"` 属性。在后续的培训章节中会详细解释 `widget` 属性。现在，你可以尝试添加和移除该属性，看看效果。

# 三、一对多关系（one2many）

:::info 目标：在本节结束时：

1. 应创建一个新的 `expenses.ExpenseBill` 模型。
2. 应向 `expenses.ProjectInfo` 模型添加报销字段

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-7/o2m.gif)

:::

在我们的费用管理模块中，我们想要定义报销单的概念。报销单是对项目预算使用提供的一个记录。

一个报销单对应一个项目，但同一项目可以有多个报销单。这里又出现了多对一（many2one）的概念。然而，在这种情况下，我们想要显示给定项目的报销单列表，所以我们将使用一对多（One2many）的概念。

一对多关系是多对一关系的反向关系。例如，我们在测试模型中通过 `userId` 字段定义了与 `user.PamirsUser` 模型的链接。我们可以定义反向关系，即与我们的用户相关联的测试模型列表：

```java
@Field(displayName = "测试模型列表")
@Field.one2many
@Field.Relation(relationFields = {"id"},referenceFields = {"userId"})
private List<TestModel> testModels;

```

:::warning 提示：

因为一对多（one2many）关系是一种虚拟关系，所以本质是在关联模型中定义一个多对一（many2one），如示例中，referenceFields 定义了userId，即在TestModel中增加了一个userId字段。

:::

按照惯例，一对多（One2many）字段通常是集合类型 `List` 。它们的行为类似于记录列表，这意味着访问数据时必须使用循环：

```java
user.fieldQuery(PamirsUser::getTestModels);
for(TestModel testModel: user.getTestModels()){
    testModel.getName();
}
```

:::danger 警告：

实际上user模块并不依赖费用管理模块，所以在`user.PamirsUser` 模型中无法定义示例中的一对多关系字段的，这里仅为了示意代码写法。

:::

> **练习（Exercise）**
>
> 添加报销单表。
>
> 创建 `expenses.ExpenseBill` 模型，并添加以下字段：

| 字段（Field）                                                | 字段显示名                                                   | 类型（Type） | JAVA类型 | 属性         |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | -------------------------------------------------------- | ------------------------------------------------------------ |
| code         | 报销单号     | `STRING`                                                     | String                                                   | invisible（不显示）<br>编码自动按规则生成 |
| item         | 费用项       | `STRING`                                                     | String                                                   | required（必填） |
| reason       | 事由         | `STRING`                                                     | String                                                   | required（必填） |
| amount       | 报销金额     | `MONEY`                                                      | BigDecimal                                               | required（必填） |
| attachment   | 附件（电子发票） | `TEXT`                  |  `List<String>`   | 字段属性：<br>serialize = Field.serialize.COMMA<br>（序列化以","分割）<br>store = NullableBoolEnum.TRUE（存储）<br>multi = true（多值）<br>required = true（必填）<br>UX属性：<br>@UxForm.FieldWidget(@UxWidget(widget = "Upload"))<br>@UxTable.FieldWidget(@UxWidget(widget = "Upload"))<br>@UxDetail.FieldWidget(@UxWidget(widget = "Upload")) |
| projectInfoId | 项目Id       | `INTEGER`                                                    | Long                                                     | invisible（不显示） |


> 按照本节目标中所示，将 `expenseBills` 字段添加到你的 `expenses.ProjectInfo` 模型及其表单视图中。
>
> 这个练习很好地复习了前面几章的内容：如何借鉴默认视图的内容将 `expenseBills` 字段添加你的自定义表单视图中。在默认表单视图中该字段是一个内联的one2many的表格视图，在后续的培训章节中会详细解释内联视图。现在，你可以尝试学习以默认视图为例来自定义视图，看看效果。

这里有几个重要的点需要注意。首先，并非所有模型都需要操作或菜单。有些模型旨在仅通过另一个模型进行访问。我们的练习中就是这种情况：报销单总是通过项目信息来访问。

其次，尽管 `projectInfoId` 字段是不显示的，但我们在视图中为其添值。Oinone 是如何知道我们的报销单与哪处项目相关联的呢？这就是使用 Oinone 框架的奇妙之处：有时某些内容是隐式定义的。当我们通过一对多（one2many）字段创建一条记录时，为了方便起见，相应的多对一（many2one）字段会自动填充。

再次重启服务器并刷新以查看结果！

还跟得上吗？这一章绝对不是最容易的。它引入了几个新的概念，同时还依赖于之前介绍的所有内容。别担心，下一章会轻松一些 ;-)

