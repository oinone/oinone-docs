---
title: 章节 3：模型与基础字段（Models And Basic Fields）
index: true
category:
  - 研发手册
  - 教程
  - 后端框架
order: 3

---
在上一章结尾，我们成功创建了一个 Oinone 模块。但此时它仍是个空壳，无法存储任何数据。在我们的费用模块中，我们希望将与费用相关的项目信息（名称、描述、项目类型、所属部门等）存储到数据库里。Oinone 框架提供了便于数据库交互的工具。

# 一、对象关系映射（Object-Relational Mapping）
参考：与此主题相关的文档可在 “[模型 API](/zh/DevManual/Reference/Back-EndFramework/ORM-API.md#469f6a87)” 中找到。

:::info 目标：在本节结束时，应创建 `expenses_project_info`表：

:::

``` sql
mysql> use trutorials_biz
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
mysql> select count(*) from expenses_project_info;
+----------+
| count(*) |
+----------+
|        0 |
+----------+
1 row in set (0.00 sec)
```

Oinone 的一个关键组件是对象关系映射（ORM）层。该层避免了手动编写大部分 SQL 语句，还提供了可扩展性和安全服务。

业务对象被声明为继承自 `Oinone模型基类` 的 JAVA 类，这样就能将它们集成到自动持久化系统中。

可以通过在模型定义中设置属性来配置模型。最重要的属性是 `model`，它是必需的，用于在 Oinone 系统中定义模型的唯一编码。

:::tip 举例：以下是一个模型的最小定义示例：

:::

``` java
package pro.shushi.oinone.trutorials.expenses.api.model;
import pro.shushi.pamirs.meta.annotation.Model;
import pro.shushi.pamirs.meta.base.IdModel;

@Model.model(TestModel.MODEL_MODEL)
@Model
public class TestModel extends IdModel {
    public static final String MODEL_MODEL="expenses.TestModel";
}
```

这个定义足以让 ORM 生成一个名为 `expenses_test_model` 的数据库表。按照惯例，所有模型都位于模块的 `model` 包路径中如： `pro.shushi.oinone.trutorials.expenses.api.model`，并且每个模型都在各自的 JAVA 文件中定义。

:::warning 提示：表名生成默认规则

1. 模块编码`expenses`，驼峰转`.`分割转化成`_`连接（这里`expenses`本身就是符合规则的，无需额外转换 ）。
2. 模型的`model`属性`expenses.TestModel`，按`.`分割取最后一个单词`TestModel`，把驼峰转化成`_`连接，得到`test_model` 。
3. 最终生成的表名就是`expenses_test_model`。

:::

> **练习（Exercise）**
>
> **定义项目信息模型**：根据TestModel示例，为`expenses_project_info`表创建合适的文件和文件夹。文件创建完成后，为`expenses.ProjectInfo`项目信息模型添加一个基本定义。对 JAVA 文件的任何修改都需要重启 Oinone 服务器。
>

在启动过程中，你应该会看到以下信息：

``` bash
CREATE TABLE IF NOT EXISTS `expenses_project_info`(
 `id` BIGINT NOT NULL COMMENT 'ID字段，唯一自增索引',
 `create_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
 `write_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
 `create_uid` BIGINT COMMENT '创建人ID',
 `write_uid` BIGINT COMMENT '更新人ID',
 `is_deleted` bigint default 0 COMMENT '逻辑删除',
 PRIMARY KEY (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT 'projectInfo'

CREATE INDEX `expenses_project_info_create_date` ON `expenses_project_info`(`create_date`)
```

如果出现这种情况，那么你做得应该是正确的！为确保无误，请按照 “目标” 部分中展示的那样，使用`mysql`工具进行再次检查。

> **练习（Exercise）**
>
> **添加描述：**@Model(displayName = "项目信息")
>

# 二、模型字段（Model fields）
参考：与此主题相关的文档可在 “[字段 API](/zh/DevManual/Reference/Back-EndFramework/ORM-API.md#0d964e66)” 中找到。
字段用于定义模型可以存储什么以及存储位置。字段在模型类中被定义为属性：

``` java
package pro.shushi.oinone.trutorials.expenses.api.model;

import pro.shushi.pamirs.meta.annotation.Field;
import pro.shushi.pamirs.meta.annotation.Model;
import pro.shushi.pamirs.meta.base.IdModel;

@Model.model(TestModel.MODEL_MODEL)
@Model(displayName = "测试模型")
public class TestModel extends IdModel {
    public static final String MODEL_MODEL="expenses.TestModel";

    @Field.String
    @Field(displayName = "名称")
    private String name;
}
```

`name` 字段是一个 `STRING` 类型，在JAVA中表示为 Unicode 字符串，在SQL中表示为 `VARCHAR`。

``` java
package pro.shushi.oinone.trutorials.expenses.api.enums;

import pro.shushi.pamirs.meta.annotation.Dict;
import pro.shushi.pamirs.meta.common.enmu.IEnum;

@Dict(dictionary = TestEnum.dictionary, displayName = "测试枚举")
public enum TestEnum implements IEnum<String> {
    enum1("enum1", "枚举1", "枚举1"),
    enum2("enum2", "枚举2", "枚举2");

    public static final String dictionary = "expenses.TestEnum";

    private final String value;
    private final String displayName;
    private final String help;

    TestEnum(String value, String displayName, String help) {
        this.value = value;
        this.displayName = displayName;
        this.help = help;
    }

    public String getValue() {
        return value;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String getHelp() {
        return help;
    }
}
```

``` java
    @Field.Enum
    @Field(displayName = "测试枚举")
    private TestEnum testEnum;

    @Field(displayName = "日期字段", required = true)
    @Field.Date(type = DateTypeEnum.DATE,format = DateFormatEnum.DATE)
    private Date date;
```

`testEnum` 字段是一个 `ENUM` 类型，在JAVA中与枚举指定基本类型一致，在SQL中表示为 `VARCHAR`。

`date` 字段是一个 `DATE` 类型，在JAVA中表示为日期，在SQL中表示为 `DATE`。

:::warning 提示：DateTypeEnum有四种类型选择

1. DATETIME：日期时间
2. YEAR：年份
3. DATE：日期
4. TIME：时间

:::

## （一）类型（Types）
:::info 目标：在本节结束时，应向 `expenses_project_info` 表添加几个基本字段：

:::

``` sql

mysql> desc expenses_project_info;
+-----------------------------------+---------------+------+-----+-------------------+-----------------------------------------------+
| Field                             | Type          | Null | Key | Default           | Extra                                         |
+-----------------------------------+---------------+------+-----+-------------------+-----------------------------------------------+
| id                                | bigint        | NO   | PRI | NULL              |                                               |
| code                              | varchar(128)  | YES  | MUL | NULL              |                                               |
| name                              | varchar(128)  | YES  |     | NULL              |                                               |
| remark                            | text          | YES  |     | NULL              |                                               |
| create_date                       | datetime      | NO   | MUL | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
| write_date                        | datetime      | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
| create_uid                        | bigint        | YES  |     | NULL              |                                               |
| write_uid                         | bigint        | YES  |     | NULL              |                                               |
| is_deleted                        | bigint        | YES  |     | 0                 |                                               |
| budget_amount                     | decimal(15,4) | YES  |     | NULL              |                                               |
| start_date                        | date          | YES  |     | NULL              |                                               |
| project_year                      | year          | YES  |     | NULL              |                                               |
| staff_size                        | int           | YES  |     | NULL              |                                               |
| is_key_project                    | tinyint(1)    | YES  |     | NULL              |                                               |
| project_visibility                | varchar(128)  | YES  |     | NULL              |                                               |
+-----------------------------------+---------------+------+-----+-------------------+-----------------------------------------------+
15 rows in set (0.01 sec)
```

字段主要分为两大类：“简单” 字段，即直接存储在模型表中的原子值；“关系” 字段，用于关联（相同或不同模型的）记录。

简单字段的示例包括 `BOOLEAN`、`INTEGER`、`FLOAT`、`STRING`、`TEXT`、`DATE` 、`YEAR` 和 `ENUM`。

> **练习（Exercise）**
>
> 向项目信息表添加基本字段。
>
> 向表中添加以下基本字段：
>

| 字段（Field） | 字段显示名 | 类型（Type） | JAVA类型 |
| --- | --- | --- | --- |
| code | 项目编码 | `STRING` | String |
| name | 项目名称 | `STRING` | String |
| remark | 项目描述 | `TEXT` | String |
| budgetAmount | 项目预算 | `FLOAT` | BigDecimal、Float、Double |
| startDate | 开始时间 | `DATE` | java.util.Date |
| projectYear | 所属年份 | `YEAR` | java.util.Date |
| staffSize | 人员投入规模 | `INTEGER` | Integer、Short、Long、BigInteger |
| projectVisibility | 项目可见性 | `ENUM` | Enum、与数据字典指定基本类型一致<br/>枚举项：公开项目(public)、私有项目(private) |
| isKeyProject | 是否为重点项目 | `BOOLEAN` | Boolean |


## （二）常用属性（Common Attributes）
和模型本身一样，字段可以通过传递配置属性作为参数来进行配置：

``` python
@Field(displayName = "名称", required = true)
private String name;
```

可以使用@Field注解中的以下属性来配置前端的默认视觉与交互规则，也可以在前端设置覆盖以下配置。

+ @Field(required)，是否必填，不会影响数据库字段的定义，只做业务交互的逻辑判断
+ @Field(invisible)，是否不可见
+ @Field(priority)，字段优先级，列表的列使用该属性进行排序

> **练习（Exercise）**
>
> 为现有字段设置属性。
>
> 为项目信息的字段添加以下属性：
>
> name、projectYear 添加required属性为true
>

## （三）继承字段（Inheritance Fields）
参考：与此主题相关的文档可在 “[模型的继承](/zh/DevManual/Reference/Back-EndFramework/ORM-API.md)” 中找到。

你可能已经注意到，你的模型中有几个你从未定义过的字段。Oinone 会在所有模型中创建几个字段。这些字段由本模型继承自父类模型 ：

+ `id`（`INTEGER`）：模型记录的唯一标识符。
+ `create_date`（`DATETIME`）：记录的创建日期。
+ `create_uid`（`INTEGER`）：创建记录的用户。
+ `write_date`（`DATETIME`）：记录的最后修改日期。
+ `write_uid`（`INTEGER`）：最后修改记录的用户。
+ `is_deleted`（`INTEGER`）：逻辑删除字段。由系统创建

:::warning 提示：

数式Oinone提供了多个快速继承的父类模型，以及自己也可以定义抽象模型作为其他模型的父模型

:::



现在我们已经创建了第一个模型，接下来添加一些安全设置！

