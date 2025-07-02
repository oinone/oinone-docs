---
title: Chapter 3:Models And Basic Fields
index: true
category:
  - Development Manual
  - Tutorials
  - Back-end Framework
order: 3

---
At the end of the previous chapter, we successfully created an Oinone module. But it's still an empty shell, unable to store any data. In our expense module, we want to store project information related to expenses (name, description, project type, department, etc.) in the database. The Oinone framework provides tools for convenient database interaction.

# I. Object-Relational Mapping
Reference: Documentation related to this topic can be found in "[Model API](/en/DevManual/Reference/Back-EndFramework/ORM-API.md#i-model)".

:::info Objective: By the end of this section, the `expenses_project_info` table should be created:

:::

```sql
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

A key component of Oinone is the Object-Relational Mapping (ORM) layer. This layer avoids manual writing of most SQL statements and provides extensibility and security services.

Business objects are declared as Java classes inheriting from the `Oinone model base class`, enabling their integration into the automatic persistence system.

Models can be configured by setting attributes in the model definition. The most important attribute is `model`, which is required to define the unique code of the model in the Oinone system.

:::tip Example: Here is a minimal definition example of a model:

:::

```java
package pro.shushi.oinone.trutorials.expenses.api.model;
import pro.shushi.pamirs.meta.annotation.Model;
import pro.shushi.pamirs.meta.base.IdModel;

@Model.model(TestModel.MODEL_MODEL)
@Model
public class TestModel extends IdModel {
    public static final String MODEL_MODEL="expenses.TestModel";
}
```

This definition is sufficient for the ORM to generate a database table named `expenses_test_model`. By convention, all models are located in the module's `model` package path, such as `pro.shushi.oinone.trutorials.expenses.api.model`, and each model is defined in its own Java file.

:::warning Tip: Default table name generation rules

1. Module code `expenses`, camel case is split by `.` and converted to `_` connection (here `expenses` itself conforms to the rules and does not require additional conversion).
2. The model's `model` attribute `expenses.TestModel`, split by `.` to take the last word `TestModel`, convert camel case to `_` connection, resulting in `test_model`.
3. The finally generated table name is `expenses_test_model`.

:::

> **Exercise**
>
> **Define the project information model**: Create appropriate files and folders for the `expenses_project_info` table based on the TestModel example. After completing the file creation, add a basic definition for the `expenses.ProjectInfo` project information model. Any modifications to the Java file require restarting the Oinone server.
>

During startup, you should see the following information:

```bash
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

If this occurs, you should be doing it correctly! To ensure accuracy, use the `mysql` tool to check again as shown in the "Objective" section.

> **Exercise**
>
> **Add a description**: @Model(displayName = "项目信息")
>

# II. Model fields
Reference: Documentation related to this topic can be found in "[Field API](/en/DevManual/Reference/Back-EndFramework/ORM-API.md#ii-field)".
Fields define what a model can store and where. Fields are defined as attributes in the model class:

```java
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

The `name` field is of `STRING` type, represented as a Unicode string in Java and as `VARCHAR` in SQL.

```java
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

```java
    @Field.Enum
    @Field(displayName = "测试枚举")
    private TestEnum testEnum;

    @Field(displayName = "日期字段", required = true)
    @Field.Date(type = DateTypeEnum.DATE,format = DateFormatEnum.DATE)
    private Date date;
```

The `testEnum` field is of `ENUM` type, consistent with the basic type specified by the enumeration in Java, and represented as `VARCHAR` in SQL.

The `date` field is of `DATE` type, represented as a date in Java and as `DATE` in SQL.

:::warning Tip: DateTypeEnum has four type options

1. DATETIME: Date and time
2. YEAR: Year
3. DATE: Date
4. TIME: Time

:::

## (Ⅰ) Types
:::info Objective: By the end of this section, several basic fields should be added to the `expenses_project_info` table:

:::

```sql

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

Fields are mainly divided into two categories: "simple" fields, which are atomic values stored directly in the model table; and "relationship" fields, which are used to associate records (of the same or different models).

Examples of simple fields include `BOOLEAN`, `INTEGER`, `FLOAT`, `STRING`, `TEXT`, `DATE`, `YEAR`, and `ENUM`.

> **Exercise**
>
> Add basic fields to the project information table.
>
> Add the following basic fields to the table:
>

| Field | Display Name | Type | Java Type |
| --- | --- | --- | --- |
| code | Project Code | `STRING` | String |
| name | Project Name | `STRING` | String |
| remark | Project Description | `TEXT` | String |
| budgetAmount | Project Budget | `FLOAT` | BigDecimal、Float、Double |
| startDate | Start Time | `DATE` | java.util.Date |
| projectYear | Belonging Year | `YEAR` | java.util.Date |
| staffSize | Personnel Input Scale | `INTEGER` | Integer、Short、Long、BigInteger |
| projectVisibility | Project Visibility | `ENUM` | Enum、Consistent with the basic type specified in the data dictionary<br/>Enumeration items: public project (public), private project (private) |
| isKeyProject | Is Key Project | `BOOLEAN` | Boolean |


## (Ⅱ) Common Attributes
Like the model itself, fields can be configured by passing configuration attributes as parameters:

```python
@Field(displayName = "名称", required = true)
private String name;
```

The following attributes in the @Field annotation can be used to configure the default visual and interaction rules of the frontend, and the following configurations can also be overridden in the frontend settings.

+ @Field(required), whether it is required, which does not affect the definition of the database field, only the logical judgment of business interaction
+ @Field(invisible), whether it is invisible
+ @Field(priority), field priority, and the columns of the list are sorted using this attribute

> **Exercise**
>
> Set attributes for existing fields.
>
> Add the following attributes to the fields of project information:
>
> name、projectYear add required attribute as true
>

## (Ⅲ) Inheritance Fields
Reference: Documentation related to this topic can be found in "[Model Inheritance](/en/DevManual/Reference/Back-EndFramework/ORM-API.md)".

You may have noticed that there are several fields in your model that you never defined. Oinone creates several fields in all models. These fields are inherited by this model from the parent model:

+ `id` (`INTEGER`): The unique identifier of the model record.
+ `create_date` (`DATETIME`): The creation date of the record.
+ `create_uid` (`INTEGER`): The user who created the record.
+ `write_date` (`DATETIME`): The last modification date of the record.
+ `write_uid` (`INTEGER`): The user who last modified the record.
+ `is_deleted` (`INTEGER`): Logical deletion field. Created by the system

:::warning Tip:

Shushi Oinone provides multiple parent models for quick inheritance, and you can also define abstract models as parent models for other models

:::



Now that we have created the first model, the next step is to add some security settings!