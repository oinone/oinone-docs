---
title: 章节 10：约束（Constraints）
index: true
category:
  - 研发手册
  - 教程
  - 后端框架
order: 10

---
上一章介绍了为我们的模型添加一些业务逻辑的方法。现在我们已经能够将按钮与业务代码关联起来，但要如何防止用户输入错误的数据呢？例如，在我们的项目管理模块中，目前没有任何机制阻止用户设置一个负的预算价格。

Oinone 提供了三种设置自动验证约束规则的方法：UI约束、JAVA 约束和 SQL 约束。

# 一、SQL 约束

参考：与此主题相关的文档可在 “[模型](/zh-cn/DevManual/Reference/Back-EndFramework/ORM-API.md)” 以及 对应数据库（如[Mysql](https://dev.mysql.com/doc/refman/8.0/en/create-table.html)）的DDL文档中找到。

在 “[模型与基础字段](/zh-cn/DevManual/Tutorials/Back-endFramework/chapter3-models-and-basic-fields.md)” 章节中，我们曾介绍过可通过传递配置属性作为参数来对字段进行配置，同时也讲解了其与前端默认视觉效果和交互规则的关联。接下来，我们将进一步介绍几个与数据库相关的属性。

+ @Field(index)，请求 Oinone 在该列上创建数据库索引。
+ @Field(unique)，请求 Oinone 在该列上创建数据库唯一索引。
+ @PrimaryKey，请求 Oinone 在该列上创建数据库主健约束。
+ @Field.Advanced(columnDefinition)，请求 Oinone 在该列上创建数据库列定义。

最常见的做法是：

```java
package pro.shushi.oinone.trutorials.expenses.api.model;

import pro.shushi.pamirs.meta.annotation.Field;
import pro.shushi.pamirs.meta.annotation.Model;
import pro.shushi.pamirs.meta.base.IdModel;

@Model.model(TestConstraintsModel.MODEL_MODEL)
@Model(displayName = "约束测试模型")
public class TestConstraintsModel extends IdModel {
    public static final String MODEL_MODEL="expenses.TestConstraintsModel";

    @Field(displayName = "名称")
    @Field.Advanced(columnDefinition = "varchar(12) NOT NULL ")
    private String name;
}
```

提交名称字段数据为空，你应该会看到以下信息：

```shell
Caused by: org.springframework.dao.DataIntegrityViolationException:
### Error updating database.  Cause: java.sql.SQLException: Field 'name' doesn't have a default value
### The error may exist in pro/shushi/pamirs/framework/connectors/data/mapper/GenericMapper.java (best guess)
### The error may involve pro.shushi.pamirs.framework.connectors.data.mapper.GenericMapper.insert-Inline
### The error occurred while setting parameters
### SQL: INSERT INTO `expenses_constraints_test_model`  ( `id`, `write_uid`,  `create_uid` )  VALUES  ( ?, ?,  ? )
### Cause: java.sql.SQLException: Field 'name' doesn't have a default value
; Field 'name' doesn't have a default value; nested exception is java.sql.SQLException: Field 'name' doesn't have a default value
```

提交数据长度不符要求，你应该会看到以下信息：

```shell
Caused by: com.mysql.cj.jdbc.exceptions.MysqlDataTruncation: Data truncation: Data too long for column 'name' at row 1
```

如果出现这两种情况，那么你做得应该是正确的！

:::danger 警告

若借助 `columnDefinition` 来定义字段或约束，会使系统与特定数据库形成强绑定关系。当客户选用不同类型的数据库时，这种绑定可能会对系统的兼容性和正常运行产生不利影响。

:::

# 二、校验约束

参考：与此主题相关的文档可在 “[Validation](/zh-cn/DevManual/Reference/Back-EndFramework/ORM-API.md#2、校验约束-validation)” 中找到。

:::info 目标：在本节结束时

项目预算将无法接受大于 100000

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-10/info1.gif)

:::

SQL 约束是确保数据一致性的有效方法。然而，我们的应用程序并不想跟具体的数据库进行强绑定，甚至有更复杂的检查，这就需要用到 JAVA 代码。在这种情况下，我们就需要校验约束。

校验约束被定义为一个使用 @Validation 注解的模型与字段，并在一个记录集上调用。当这些字段中的任何一个被修改时，约束会自动进行评估。如果约束规则不满足，该方法应抛出一个异常：

```java
@Validation(ruleWithTips = {
        @Validation.Rule(value = "!IS_NULL(age)", error = "年龄为必填项"),
        @Validation.Rule(value = "age >=0 && age <= 200", error = "年龄只能在0-200之间"),
})
@Field(displayName = "年龄")
private Integer age;
```

若需要开展更为复杂的检查工作，可在模型与字段定义时使用 `@Validation(check="X")`，其中 `X` 指代给定模型的一个函数。

```java
……
@Model.model(TestConstraintsModel.MODEL_MODEL)
@Model(displayName = "约束测试模型")
@Validation(check = "checkData")
public class TestConstraintsModel extends IdModel {
    ……
    @Function
    public Boolean checkData(TestConstraintsModel data) {
        String name = data.getName();
        boolean success = true;
        if (StringUtils.isBlank(name)) {
            PamirsSession.getMessageHub()
                    .msg(Message.init()
                            .setLevel(InformationLevelEnum.ERROR)
                            .setField(LambdaUtil.fetchFieldName(TestConstraintsModel::getName))
                            .setMessage("名称为必填项"));
            success = false;
        }
        if (name.length() > 4) {
            PamirsSession.getMessageHub()
                    .msg(Message.init()
                            .setLevel(InformationLevelEnum.ERROR)
                            .setField(LambdaUtil.fetchFieldName(TestConstraintsModel::getName))
                            .setMessage("名称过长，不能超过4位"));
            success = false;
        }
        return success;
    }
}
```

> 练习（Exercise）
>
> 添加 校验约束。
>
> 添加一个约束，项目预算大于等于 0，小于 100000。

# 三、UI交互约束

“UI 交互约束” 即前端约束的意思。“UI” 即 “User Interface”，指用户界面，UI 约束通常是指在用户界面层面上对用户的操作和输入进行限制和规范，以确保用户输入的数据符合特定的要求和规则，这与前端约束的概念是相符的。

最常见的做法是：

```java
<field span="1" priority="102" data="age" label="年龄"
    validator="!IS_NULL(activeRecord.age) &amp;&amp; (activeRecord.age &gt;=0 &amp;&amp; activeRecord.age &lt;= 200)"
    validatorMessage="年龄为必填项，且年龄只能在0-200之间"/>
```

从约束安全性的层面考量，SQL 约束的安全性通常高于 JAVA 约束，而 JAVA 约束的安全性又高于 UI 约束 。不过，就灵活性而言，情况则恰恰相反 。

我们的费用管理模块开始初具雏形了。我们添加了一些业务逻辑，并且现在确保了数据的一致性。然而，用户界面仍然有点粗糙。让我们在下一章看看如何改进它。





