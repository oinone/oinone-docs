---
title: ORM API
index: true
category:
  - Development Manual
  - Reference
  - Back-End API
order: 2

---
# I. Model

A model consists of metadata, fields, data managers, and custom functions. Models are categorized into meta-models and business models. Metadata refers to the dataset describing the data, rules, and logic necessary for application operation; a meta-model is a set of schemas used to describe kernel metadata; a business model is a set of schemas used to describe business application metadata.

Meta-models are divided into three domains: module domain, model domain, and function domain. The domain division rule is determined by the discreteness of data association relationships defined in the meta-model—the smaller the discreteness, the more aggregated into one domain.

## (一) Model Types

### 1. Abstract Model:

An abstract model typically provides common capabilities and fields but is not directly used to build protocols or infrastructure (such as table structures).

```java
@Model.Advanced(type = ModelTypeEnum.ABSTRACT)
@Model.model(TestCommonItem.MODEL_MODEL)
@Model(displayName = "Test Abstract Model", summary = "Test Abstract Model")
public class TestCommonItem extends IdModel {
    private static final long serialVersionUID = 7927471701701984895L;

    public static final String MODEL_MODEL = "test.TestCommonItem";

    // Common field configurations omitted here

}
```

Marking a model as abstract using the `@Model.Advanced(type = ModelTypeEnum.ABSTRACT)` annotation enables the creation of a reusable library of abstract business models. In business scenarios requiring data storage, a storage model can be created in an extension module by inheriting from the abstract model, reusing its structure and field configurations to enhance development efficiency.

### 2. Transient Model:

Used for data interaction between the presentation layer and application layer, it does not store data, has no default data manager, and only includes a data constructor.

```java
@Model.Advanced(type = ModelTypeEnum.TRANSIENT)
@Model.model(TestRemark.MODEL_MODEL)
@Model(displayName = "Test Transient Model", summary = "Test Transient Model")
public class TestRemark extends TransientModel {

    private static final long serialVersionUID = 5587370859051459028L;

    public static final String MODEL_MODEL = "test.TestRemark";

    // Transient field configurations omitted here

}
```

A model can be defined as a transient model in two ways:
- Using the `@Model.Advanced(type = ModelTypeEnum.TRANSIENT)` annotation.
- Inheriting from the `TransientModel` class. Both methods clearly define the model's purpose for efficient data transfer between components/modules.

### 3. Storage Model:

A storage model defines table structures and CRUD (data manager) functions, serving as a data container directly interacting with connectors.

```java
@Model.model(TestModel.MODEL_MODEL)
@Model(displayName = "Test Model", labelFields = {"name"})
public class TestModel extends IdModel {
    public static final String MODEL_MODEL = "test.TestModel";

    @Field(displayName = "Name")
    private String name;
}
```

### 4. Proxy Model:

A proxy model proxies the data manager capabilities of a storage model while extending interaction functions for non-stored data information.

```java
@Model.Advanced(type = ModelTypeEnum.PROXY)
@Model.model(Context.MODEL_MODEL)
@Model(displayName = "Test Proxy Model", summary = "Test Proxy Model")
public class TestProxyModel extends IdModel {

    public static final String MODEL_MODEL = "test.TestProxyModel";

    // Transient field configurations omitted here

}
```

Mark a proxy model using the `@Model.Advanced(type = ModelTypeEnum.PROXY)` annotation.

## (二) Model Definition Categories

Model definition refers to model description. Different definition types represent different rules for calculating metadata describing the model:
- Static model definition: Model metadata is not persisted, and model definition calculations (default values, primary keys, inheritance, relationships) are not performed.
- Static computed model definition: Model metadata is not persisted, but model definition calculations are performed during initialization to obtain the final model definition.
- Dynamic model definition: Model metadata is persisted, and model definition calculations are performed during initialization to obtain the final model definition.

A static model definition requires the `@Model.Static` annotation; a static computed model definition uses `@Model.Static(compute=true)`; a dynamic model definition omits the `@Model.Static` annotation.

## (三) Installation and Update

Use `@Model.model` to configure the non-modifiable code of a model. Once installed, the model code cannot be modified; subsequent configuration updates will be found and updated based on this code. If the annotation configuration is modified, the system will recognize it as a new model, create a new database table for storage models, and rename the original table as a deprecated table.

If a model is configured with the `@Base` annotation, it indicates that the model configuration is non-modifiable in the model designer; if a field is configured with `@Base`, the field configuration is non-modifiable in the model designer.

## (四) Basic Configuration

### 1. Model Base Classes

All models must inherit from one of the following to indicate the model type and inherit default data managers:
- Inherit `BaseModel` to build a storage model with no default id attribute.
- Inherit `BaseRelation` to build a many-to-many relationship model with no default id attribute.
- Inherit `TransientModel` to build a transient (transport) model, which has no data manager or id attribute.
- Inherit `EnhanceModel` to build an enhanced model with ElasticSearch as the data source.

### 2. Quick Inheritance

- Inherit `IdModel` to build a model with `id` as the primary key. The data manager of the inherited `IdModel` adds a `queryById` method (query a single record by id).
- Inherit `CodeModel` to build a model with a unique code `code` and `id` as the primary key. Use the `@Model.Code` annotation to configure the code generation rule, override the `generateCode` method of `CodeModel`, or customize the code generation logic in pre-extension points. The data manager of the inherited `CodeModel` adds a `queryByCode` method (query a single record by unique code).
- Inherit `VersionModel` to build a model with optimistic locking, a unique code `code`, and `id` as the primary key.
- Inherit `IdRelation` to build a many-to-many relationship model with `id` as the primary key.

### 3. Model Inheritance Diagram

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/BackendAPI/ORM-API/1610353738674-f1c4392d-109f-46aa-a06b-7b82e26efdb6.jpeg)

- The `AbstractModel` abstract base class is an abstract model containing basic fields such as `createDate`, `writeDate`, `createUid`, `writeUid`, `aggs`, and `activePks`.
- The `TransientModel` abstract base class is the base class for all transient models, which do not store data and have no data manager.
- `TransientRelation` is the base class for all transient relation models, which do not store data, are used to carry many-to-many relationships, and have no data manager.
- The `BaseModel` storage model base class provides data manager functions, and the primary key of the data model can be other than `id`.
- The `IdModel` abstract base class with `id` provides functions to query, update, and delete data by `id` based on the `BaseModel` data manager.
- The `BaseRelation` abstract base class for relation models is used to carry many-to-many relationships, serving as an intermediate model for many-to-many relationships, and the primary key of the data model can be other than `id`.
- The `IdRelation` abstract base class with `id` provides functions to query, update, and delete data by `id` based on the `BaseModel` data manager.
- The `CodeModel` abstract base class with `code` provides functions to generate business unique codes according to configurations and query, update, and delete data by `code`.
- The `EnhanceModel` provides full-text search capabilities.

### 4. Annotation Configuration @Model

A model class must use the `@Model` annotation to identify it as a model class.

Use `@Model.model` and `@Fun` to annotate the model code (also representing the namespace). The value of `@Model.model` is preferred; if empty, `@Fun` is used; if both are empty, the fully qualified class name is used.

Use the `@Model.model` annotation to configure the model code, which uniquely identifies a model.

:::danger Warning

Do not use `Query` or `Mutation` as the end of model codes or technical names.

:::

```plsql
@Model.model(TestModel.MODEL_MODEL)
@Model(displayName = "Test Model", labelFields = {"name"})
public class TestModel extends IdModel {
    public static final String MODEL_MODEL = "test.TestModel";

    @Field(displayName = "Name")
    private String name;
}
```

@Model

├── displayName Display name
├── summary Description summary
├── labelFields Data title for front-end display
├── label Data title format, default is empty
├── model Model code
│   └── value
├── Ds Logical data source name
│   └── value
├── Advanced More configurations
│   ├── name Technical name, default is the last part of model.model split by dots
│   ├── priority Sorting
│   ├── chain Whether it is a chain model
│   ├── table Logical data table name
│   ├── remark Table comment, default is the summary
│   ├── index Index/composite index
│   ├── unique Unique index
│   ├── managed Can be managed, such as automatic table creation or update, default is true
│   ├── ordering Data sorting
│   ├── type Model type, default: STORE storage model
│   ├── relationship Whether it is a model describing many-to-many relationships
│   ├── supportClient Support client, default is true
│   ├── inherited Inheritance, configure model code
│   ├── inheritedClass Inherited class, configure the class where the model is located
│   ├── unInheritedFields Fields not inherited from the parent class
│   └── unInheritedFunctions Functions not inherited from the parent class
├── MultiTable
│   └── typeField Type field code of the parent model in multi-table inheritance
├── MultiTableInherited Child model multi-table inherits parent model
│   ├── type Type field value of the parent model in multi-table inheritance
│   └── redundancy Redundant data of the parent model except the primary key value
├── ChangeTableInherited Table-changing inheritance
├── Persistence Data persistence layer configuration. If not configured, follow module configuration; if configured, use model configuration.
│   ├── logicDelete Whether to logically delete, default is true
│   ├── logicDeleteColumn Logical delete column, default "is_deleted"
│   ├── logicDeleteValue Field value after logical deletion, default "REPLACE(unix_timestamp(NOW(6)),'.','')"
│   ├── logicNotDeleteValue Default value of the logical delete column, default "0"
│   ├── underCamel Underline to camel case conversion, default is true
│   ├── capitalMode Table uppercase mode, default is false
│   ├── charset Default is utf8mb4
│   └── collate Default is bin
├── Code Model code generator. If this attribute is configured, the model must have a code field.
│   ├── sequence Sequence generation function, optional values:
  * SEQ—Auto-incrementing serial number (non-consecutive)
  * ORDERLY—Auto-incrementing ordered serial number (consecutive)
  * DATE_SEQ—Date + auto-incrementing serial number (non-consecutive)
  * DATE_ORDERLY_SEQ—Date + strongly ordered serial number (consecutive)
  * DATE—Date
  * UUID—Random 32-character string containing numbers and lowercase letters
│   ├── prefix Prefix
│   ├── suffix Suffix
│   ├── size Length
│   ├── step Step size (valid for serial numbers)
│   ├── initial Starting value (valid for serial numbers)
│   ├── format Format (valid for dates)
│   └── separator Separator
├── Static Static model configuration
│   ├── module Module
│   ├── moduleAbbr Module abbreviation
│   └── onlyBasicTypeField Default is true
└── Fuse Low-code and no-code integrated model

### 5. Model Naming Conventions

| **Model Attribute** | **Default Naming Convention**                                             | **Naming Rule**                                                      |
| :----------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| name         | Default is the last part of model.model split by dots                            | 1. Only supports numbers and letters<br/>2. Must start with a letter<br/>3. Length must be ≤ 128 characters |
| model        | Default is the full class name, taking the value of lname<br/>Development definition example:<br/>{project name}.{module function name}.{simple class name} | 1. Only supports numbers, letters, and dots<br/>2. Must start with a letter<br/>3. Cannot end with a dot<br/>4. Length must be ≤ 128 characters |
| display_name | Empty string                                                     | 1. Length must be ≤ 128 characters                                 |


## (五) Model Metadata

The `priority` of a model is used to sort models when displaying the model definition list.

The `ordering` of a model configures the default sorting of the model's data list using the `ordering` attribute.

Model metadata inheritance forms:
- No inheritance (N)
- Child model takes precedence for the same code (C)
- Parent model takes precedence for the same code (P)
- Parent and child must be consistent, child model can be omitted (P=C)

Note: Indexes and unique indexes configured on models are not inherited, so they need to be redefined in child models. The table name, comment, and code of the data table are ultimately based on the parent model configuration; when the field codes of extended inheritance parent and child models are consistent, the data table field definition is based on the parent model configuration.

<table cellspacing="0" cellpadding="8" style="border-collapse: collapse; width: 100%; max-width: 1600px; margin: 20px auto;">
  <thead>
    <tr style="background-color: #f5f5f5;">
      <th style="text-align: left; font-weight: bold;">Name</th>
      <th style="text-align: left; font-weight: bold;">Description</th>
      <th style="text-align: left; font-weight: bold;">Abstract Inheritance</th>
      <th style="text-align: left; font-weight: bold;">Same-table Inheritance</th>
      <th style="text-align: left; font-weight: bold;">Proxy Inheritance</th>
      <th style="text-align: left; font-weight: bold;">Multi-table Inheritance</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="6" style="background-color: #f0f0f0; font-weight: bold;">Basic Information</td>
    </tr>
    <tr>
      <td>displayName</td>
      <td>Display name</td>
      <td>N</td>
      <td>N</td>
      <td>N</td>
      <td>N</td>
    </tr>
    <tr>
      <td>summary</td>
      <td>Description summary</td>
      <td>N</td>
      <td>N</td>
      <td>N</td>
      <td>N</td>
    </tr>
    <tr>
      <td>label</td>
      <td>Data title format</td>
      <td>N</td>
      <td>N</td>
      <td>N</td>
      <td>N</td>
    </tr>
    <tr>
      <td>labelFields</td>
      <td>Data title fields</td>
      <td>C</td>
      <td>C</td>
      <td>C</td>
      <td>C</td>
    </tr>
    <tr>
      <td>check</td>
      <td>Model validation method</td>
      <td>N</td>
      <td>N</td>
      <td>N</td>
      <td>N</td>
    </tr>
    <tr>
      <td>rule</td>
      <td>Model validation expression</td>
      <td>N</td>
      <td>N</td>
      <td>N</td>
      <td>N</td>
    </tr>
    <tr>
      <td colspan="6" style="background-color: #f0f0f0; font-weight: bold;">Model Code</td>
    </tr>
    <tr>
      <td>model</td>
      <td>Model code</td>
      <td>N</td>
      <td>N</td>
      <td>N</td>
      <td>N</td>
    </tr>
    <tr>
      <td colspan="6" style="background-color: #f0f0f0; font-weight: bold;">Advanced Features</td>
    </tr>
    <tr>
      <td>name</td>
      <td>Technical name</td>
      <td>N</td>
      <td>N</td>
      <td>N</td>
      <td>N</td>
    </tr>
    <tr>
      <td>table</td>
      <td>Logical data table name</td>
      <td>N</td>
      <td>P=C</td>
      <td>P=C</td>
      <td>N</td>
    </tr>
    <tr>
      <td>type</td>
      <td>Model type</td>
      <td>N</td>
      <td>N</td>
      <td>N</td>
      <td>N</td>
    </tr>
    <tr>
      <td>chain</td>
      <td>Whether it is a chain model</td>
      <td>N</td>
      <td>N</td>
      <td>N</td>
      <td>N</td>
    </tr>
    <tr>
      <td>index</td>
      <td>Index</td>
      <td>N</td>
      <td>N</td>
      <td>N</td>
      <td>N</td>
    </tr>
    <tr>
      <td>unique</td>
      <td>Unique index</td>
      <td>N</td>
      <td>N</td>
      <td>N</td>
      <td>N</td>
    </tr>
    <tr>
      <td>managed</td>
      <td>Requires a data manager</td>
      <td>N</td>
      <td>N</td>
      <td>N</td>
      <td>N</td>
    </tr>
    <tr>
      <td>priority</td>
      <td>Priority, default 100</td>
      <td>N</td>
      <td>N</td>
      <td>N</td>
      <td>N</td>
    </tr>
    <tr>
      <td>ordering</td>
      <td>Model query data sorting</td>
      <td>N</td>
      <td>N</td>
      <td>N</td>
      <td>N</td>
    </tr>
    <tr>
      <td>relationship</td>
      <td>Whether it is a many-to-many relationship model</td>
      <td>N</td>
      <td>N</td>
      <td>N</td>
      <td>N</td>
    </tr>
    <tr>
      <td>inherited</td>
      <td>Multiple inheritance</td>
      <td>N</td>
      <td>N</td>
      <td>N</td>
      <td>N</td>
    </tr>
    <tr>
      <td>unInheritedFields</td>
      <td>Fields not inherited from the parent class</td>
      <td>N</td>
      <td>N</td>
      <td>N</td>
      <td>N</td>
    </tr>
    <tr>
      <td>unInheritedFunctions</td>
      <td>Functions not inherited from the parent class</td>
      <td>N</td>
      <td>N</td>
      <td>N</td>
      <td>N</td>
    </tr>
    <tr>
      <td colspan="6" style="background-color: #f0f0f0; font-weight: bold;">Advanced Features - Data Source</td>
    </tr>
    <tr>
      <td>dsKey</td>
      <td>Data source</td>
      <td>N</td>
      <td>P=C</td>
      <td>P=C</td>
      <td>N</td>
    </tr>
    <tr>
      <td colspan="6" style="background-color: #f0f0f0; font-weight: bold;">Advanced Features - Persistence</td>
    </tr>
    <tr>
      <td>logicDelete</td>
      <td>Whether to logically delete</td>
      <td>P</td>
      <td>P</td>
      <td>P</td>
      <td>N</td>
    </tr>
    <tr>
      <td>logicDeleteColumn</td>
      <td>Logical delete field</td>
      <td>P</td>
      <td>P</td>
      <td>P</td>
      <td>N</td>
    </tr>
    <tr>
      <td>logicDeleteValue</td>
      <td>Logical delete status value</td>
      <td>P</td>
      <td>P</td>
      <td>P</td>
      <td>N</td>
    </tr>
    <tr>
      <td>logicNotDeleteValue</td>
      <td>Non-logical delete status value</td>
      <td>P</td>
      <td>P</td>
      <td>P</td>
      <td>N</td>
    </tr>
    <tr>
      <td>underCamel</td>
      <td>Whether to map camel case to underscore</td>
      <td>P</td>
      <td>P</td>
      <td>P</td>
      <td>N</td>
    </tr>
    <tr>
      <td>capitalMode</td>
      <td>Whether to map case</td>
      <td>P</td>
      <td>P</td>
      <td>P</td>
      <td>N</td>
    </tr>
    <tr>
      <td colspan="6" style="background-color: #f0f0f0; font-weight: bold;">Advanced Features - Sequence Generation Configuration</td>
    </tr>
    <tr>
      <td>sequence</td>
      <td>Configuration code</td>
      <td>C</td>
      <td>C</td>
      <td>C</td>
      <td>N</td>
    </tr>
    <tr>
      <td>prefix</td>
      <td>Prefix</td>
      <td>C</td>
      <td>C</td>
      <td>C</td>
      <td>N</td>
    </tr>
    <tr>
      <td>suffix</td>
      <td>Suffix</td>
      <td>C</td>
      <td>C</td>
      <td>C</td>
      <td>N</td>
    </tr>
    <tr>
      <td>separator</td>
      <td>Separator</td>
      <td>C</td>
      <td>C</td>
      <td>C</td>
      <td>N</td>
    </tr>
    <tr>
      <td>size</td>
      <td>Sequence length</td>
      <td>C</td>
      <td>C</td>
      <td>C</td>
      <td>N</td>
    </tr>
    <tr>
      <td>step</td>
      <td>Sequence step</td>
      <td>C</td>
      <td>C</td>
      <td>C</td>
      <td>N</td>
    </tr>
    <tr>
      <td>initial</td>
      <td>Initial value</td>
      <td>C</td>
      <td>C</td>
      <td>C</td>
      <td>N</td>
    </tr>
    <tr>
      <td>format</td>
      <td>Sequence format</td>
      <td>C</td>
      <td>C</td>
      <td>C</td>
      <td>N</td>
    </tr>
    <tr>
      <td colspan="6" style="background-color: #f0f0f0; font-weight: bold;">Advanced Features - Association Relationships (or Logical Foreign Keys)</td>
    </tr>
    <tr>
      <td>unique</td>
      <td>Whether foreign key values are unique</td>
      <td>C</td>
      <td>C</td>
      <td>C</td>
      <td>N</td>
    </tr>
    <tr>
      <td>foreignKey</td>
      <td>Foreign key name</td>
      <td>C</td>
      <td>C</td>
      <td>C</td>
      <td>N</td>
    </tr>
    <tr>
      <td>relationFields</td>
      <td>Relation field list</td>
      <td>C</td>
      <td>C</td>
      <td>C</td>
      <td>N</td>
    </tr>
    <tr>
      <td>references</td>
      <td>Associated model</td>
      <td>C</td>
      <td>C</td>
      <td>C</td>
      <td>N</td>
    </tr>
    <tr>
      <td>referenceFields</td>
      <td>Associated field list</td>
      <td>C</td>
      <td>C</td>
      <td>C</td>
      <td>N</td>
    </tr>
    <tr>
      <td>limit</td>
      <td>Relationship quantity limit</td>
      <td>C</td>
      <td>C</td>
      <td>C</td>
      <td>N</td>
    </tr>
    <tr>
      <td>pageSize</td>
      <td>Number of items per query page</td>
      <td>C</td>
      <td>C</td>
      <td>C</td>
      <td>N</td>
    </tr>
    <tr>
      <td>domainSize</td>
      <td>Number of items per page for model filter options</td>
      <td>C</td>
      <td>C</td>
      <td>C</td>
      <td>N</td>
    </tr>
    <tr>
      <td>domain</td>
      <td>Model filter, front-end options</td>
      <td>C</td>
      <td>C</td>
      <td>C</td>
      <td>N</td>
    </tr>
    <tr>
      <td>onUpdate</td>
      <td>Update association operation</td>
      <td>C</td>
      <td>C</td>
      <td>C</td>
      <td>N</td>
    </tr>
    <tr>
      <td>onDelete</td>
      <td>Delete association operation</td>
      <td>C</td>
      <td>C</td>
      <td>C</td>
      <td>N</td>
    </tr>
    <tr>
      <td colspan="6" style="background-color: #f0f0f0; font-weight: bold;" >Static Configuration</td>
    </tr>
    <tr>
      <td>Static</td>
      <td>Static metadata model</td>
      <td>N</td>
      <td>N</td>
      <td>N</td>
      <td>N</td>
    </tr>
  </tbody>
</table>

Field definition inheritance form:

| Name       | Description | Abstract Inheritance | Same-table Inheritance | Proxy Inheritance | Multi-table Inheritance |
| ---------- | ----------- | -------------------- | ---------------------- | ------------------- | ----------------------- |
| Field definition | Field definition | C                    | C                      | C                   | C                       |


## (六) Model Constraints

### 1. SQL Constraints

Each model can configure its primary key list or omit it. Primary key values cannot be missing and can index a unique record in the model's corresponding data table.

Next, we introduce several database-related attributes:
- `@Field(index)` requests Oinone to create a database index on this column.
- `@Field(unique)` requests Oinone to create a database unique index on this column.
- `@PrimaryKey` requests Oinone to create a database primary key constraint on this column.
- `@Field.Advanced(columnDefinition)` requests Oinone to create a database column definition on this column.

```yaml
@Field(displayName = "Name")
@Field.Advanced(columnDefinition = "varchar(12) NOT NULL ")
private String name;
```

### 2. Validation Constraints

Models or fields can configure validation functions and rules to validate model data, ensuring data合法性 (legality) and compliance when storing.

SQL constraints are effective for ensuring data consistency. However, applications may avoid tight binding to specific databases or require more complex checks, necessitating Java code—enter validation constraints.

Validation constraints are defined as models/fields with the `@Validation` annotation and called on a record set. When any of these fields are modified, constraints are automatically evaluated. If rules are not met, the method should throw an exception:

```java
@Validation(ruleWithTips = {
        @Validation.Rule(value = "!IS_NULL(age)", error = "Age is required"),
        @Validation.Rule(value = "age >=0 && age <= 200", error = "Age must be between 0-200"),
})
@Field(displayName = "Age")
private Integer age;
```

- **Multi-rule configuration**: Declare multiple validation rules via the `ruleWithTips` array, each defined by `@Validation.Rule` with `value` (validation expression) and `error` (error message).
- **Built-in function support**: Supports functions like `IS_BLANK` (check if text is empty) and `LEN` (get text length); see [Built-in Functions](/en/DevManual/Reference/Back-EndFramework/functions-API.md#六、表达式) for the full list.

For complex checks, use `@Validation(check="X")` in model/field definitions, where `X` refers to a function of the given model.

```yaml
……
@Model.model(TestConstraintsModel.MODEL_MODEL)
@Model(displayName = "Constraint Test Model")
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
                            .setMessage("Name is required"));
            success = false;
        }
        if (name.length() > 4) {
            PamirsSession.getMessageHub()
                    .msg(Message.init()
                            .setLevel(InformationLevelEnum.ERROR)
                            .setField(LambdaUtil.fetchFieldName(TestConstraintsModel::getName))
                            .setMessage("Name is too long, cannot exceed 4 characters"));
            success = false;
        }
        return success;
    }
}
```

:::warning Note

1. In Oinone, validation constraints for Action operations can be added via the `@Validation` annotation.
2. This validation mechanism only triggers when requests are initiated from the front end to ensure data legality. When called directly via Java code, this validation logic **does not execute automatically** to avoid performance overhead from repeated validation, allowing developers to flexibly control validation scenarios.

:::

:::warning Note

The Validation validation capability can be flexibly activated via the requestStrategy policy in the gateway protocol API documentation, supporting settings such as function-only validation without submission, return after check completion, return on failure, and custom message return rules to show only failure information.

:::

## (七) Data Management

In Oinone, data managers and data constructors are core functional components automatically equipped for models, providing powerful inherent data management capabilities.

**Data Manager**: Designed for storage models, developers can directly call its provided Functions during programming to quickly implement common operations like data query, update, and deletion, significantly improving data processing efficiency.

**Data Constructor**: Mainly used in model initialization scenarios, responsible for calculating field default values and playing an important role in page interaction to ensure correct data transmission and display between the front end and back end.

### 1. Data Management Functions

Take the `test.ExtendIdModel` model (inheriting from `IdModel`) as an example. The query function is a data manager function (`data_manager=1`), where `bean_name` is the bean name of the Java class where the function is defined. The `type` and `open_level` use bitwise AND to represent functional meanings:
- `type` values: `CREATE(1L)` for creation, `DELETE(2L)` for deletion, `UPDATE(4L)` for update, `QUERY(8L)` for query
- `open_level` values: `LOCAL(2)` for local calls, `REMOTE(4)` for remote calls, `API(8)` for open interfaces

Default read function list in the data manager:

```plsql
mysql> select method,fun,open_level,bean_name from base_function where namespace ='test.ExtendIdModel'and data_manager=1 and type&8=8;
+--------------------------------+--------------------------------+------------+-----------------------+
| method                         | fun                            | open_level | bean_name             |
+--------------------------------+--------------------------------+------------+-----------------------+
| construct                      | construct                      | 14         | constructManager      |
| count                          | count                          | 14         | defaultReadApi        |
| count                          | countByWrapper                 | 14         | defaultReadApi        |
| queryOne                       | queryByEntity                  | 14         | defaultReadApi        |
| queryById                      | queryById                      | 6          | defaultIdDataManager  |
| queryByPk                      | queryByPk                      | 14         | defaultReadApi        |
| queryOneByWrapper              | queryByWrapper                 | 14         | defaultReadApi        |
| queryFilters                   | queryFilters                   | 2          | defaultReadFiltersApi |
| queryListByEntity              | queryListByEntity              | 14         | defaultReadApi        |
| queryListByEntityWithBatchSize | queryListByEntityWithBatchSize | 6          | defaultReadApi        |
| queryListByEntity              | queryListByPage                | 6          | defaultReadApi        |
| queryListByWrapper             | queryListByPageAndWrapper      | 6          | defaultReadApi        |
| queryListByWrapper             | queryListByWrapper             | 14         | defaultReadApi        |
| queryPage                      | queryPage                      | 14         | defaultReadApi        |
| relationQueryPage              | relationQueryPage              | 14         | defaultReadApi        |
+--------------------------------+--------------------------------+------------+-----------------------+
15 rows in set (0.00 sec)
```

Default write function list in the data manager:

```plsql
mysql> select method,fun,open_level,bean_name from base_function where namespace ='test.ExtendIdModel'and data_manager=1 and type&8!=8;
+---------------------------------------+---------------------------------------+------------+--------------------------+
| method                                | fun                                   | open_level | bean_name                |
+---------------------------------------+---------------------------------------+------------+--------------------------+
| createWithField                       | create                                | 14         | defaultWriteWithFieldApi |
| createBatch                           | createBatch                           | 6          | defaultWriteApi          |
| createBatchWithSize                   | createBatchWithSize                   | 6          | defaultWriteApi          |
| createOne                             | createOne                             | 6          | defaultWriteApi          |
| createOrUpdate                        | createOrUpdate                        | 6          | defaultWriteApi          |
| createOrUpdateBatch                   | createOrUpdateBatch                   | 6          | defaultWriteApi          |
| createOrUpdateBatchWithResult         | createOrUpdateBatchWithResult         | 6          | defaultWriteApi          |
| createOrUpdateBatchWithSize           | createOrUpdateBatchWithSize           | 6          | defaultWriteApi          |
| createOrUpdateBatchWithSizeWithResult | createOrUpdateBatchWithSizeWithResult | 6          | defaultWriteApi          |
| createOrUpdateWithField               | createOrUpdateWithField               | 6          | defaultWriteWithFieldApi |
| createOrUpdateWithFieldBatch          | createOrUpdateWithFieldBatch          | 6          | defaultWriteWithFieldApi |
| createOrUpdateWithResult              | createOrUpdateWithResult              | 6          | defaultWriteApi          |
| createWithFieldBatch                  | createWithFieldBatch                  | 6          | defaultWriteWithFieldApi |
| deleteWithField                       | delete                                | 6          | defaultWriteWithFieldApi |
| deleteByEntity                        | deleteByEntity                        | 6          | defaultWriteApi          |
| deleteById                            | deleteById                            | 6          | defaultIdDataManager     |
| deleteByPk                            | deleteByPk                            | 6          | defaultWriteApi          |
| deleteByPks                           | deleteByPks                           | 6          | defaultWriteApi          |
| deleteByUniqueField                   | deleteByUniqueField                   | 6          | defaultWriteApi          |
| deleteByUniques                       | deleteByUniques                       | 6          | defaultWriteApi          |
| deleteByWrapper                       | deleteByWrapper                       | 6          | defaultWriteApi          |
| deleteWithFieldBatch                  | deleteWithFieldBatch                  | 14         | defaultWriteWithFieldApi |
| updateWithField                       | update                                | 14         | defaultWriteWithFieldApi |
| updateBatch                           | updateBatch                           | 6          | defaultWriteApi          |
| updateBatchWithSize                   | updateBatchWithSize                   | 6          | defaultWriteApi          |
| updateByEntity                        | updateByEntity                        | 6          | defaultWriteApi          |
| updateById                            | updateById                            | 6          | defaultIdDataManager     |
| updateByPk                            | updateByPk                            | 6          | defaultWriteApi          |
| updateByUniqueField                   | updateByUniqueField                   | 6          | defaultWriteApi          |
| updateByWrapper                       | updateByWrapper                       | 6          | defaultWriteApi          |
| updateOneWithRelations                | updateOneWithRelations                | 14         | defaultWriteApi          |
| updateWithFieldBatch                  | updateWithFieldBatch                  | 14         | defaultWriteWithFieldApi |
+---------------------------------------+---------------------------------------+------------+--------------------------+
32 rows in set (0.00 sec)
```

:::warning Tip

When viewing the model function table, default data management functions are centrally defined in Java classes like `constructManager`, `defaultReadApi`, `defaultWriteApi`, `defaultWriteWithFieldApi`, and `defaultIdDataManager`. Tracing their source parent models and implementation logic helps understand inheritance—for example, `defaultIdDataManager` is defined for `IdModel`, clarifying which functions are inherited from `IdModel`.

:::

### 2. **Data Manager**

Only storage models have data managers. If the `dataManager` attribute of the `@Model.Advanced` annotation is set to `false`, it means the default data manager is not exposed at the UI layer. An open level of `API` means the UI layer can use the Pamirs standard gateway protocol for data interaction via HTTP requests.

#### Inheriting `IdModel`

After a model inherits `IdModel`, the primary key is automatically set to `id`, and it inherits `queryById`, `updateById`, and `deleteById` functions with an open level of `Remote` for querying, updating, and deleting single records by ID.

#### Inheriting `CodeModel`

Inheriting `CodeModel` inherits the `IdModel` data manager, uses `code` as a unique index field, automatically assigns values according to rules when adding data, and inherits `queryByCode`, `updateByCode`, and `deleteByCode` functions with a `Remote` open level.

#### Models Without Primary Keys or Unique Indexes

For models without primary keys or unique indexes, the UI layer does not expose the default data write manager.

### 3. Data Constructor

In Oinone, the model data constructor `construct` provides default data for newly opened front-end pages. All models have this constructor built-in, which returns the default values configured for fields by default (the default value for enum types is the enum name). To customize the logic, override the `construct` method in the subclass.

The `construct` function has an open level of `API` and belongs to the `QUERY` query type. The system automatically sets the function named `construct` in the model to this fixed attribute. Default values can be configured via the `defaultValue` attribute of the `@Field` annotation.


# II. Field

Model fields define the characteristic attributes of an entity, establishing an association through `Model`'s `model` and `Field`'s `model`. `ModelField` inherits from the abstract class `Relation` for construction.

Field definitions use the `@Field` annotation. If the field type is not explicitly specified, the system automatically identifies the field declaration type in the Java code as the business type. To ensure front-end display standards, set the field display name via the `displayName` attribute and configure default values using the `defaultValue` attribute.

## (一) Field Types

The type system consists of four types: basic types, composite (component) types, reference types, and relation types. It describes how applications, databases, and front-end visual views interact and how data and data relationships are processed.

### 1. Basic Types

| **Ttype Enum**      | **Annotation**                                                     | **Description** |
| ------------------ | ------------------------------------------------------------ | -------- |
| TtypeEnum.BINARY   | Field.Binary                                                 | Binary   |
| TtypeEnum.INTEGER  | Field.Integer                                                | Integer  |
| TtypeEnum.FLOAT    | Field.Float                                                  | Floating point |
| TtypeEnum.BOOLEAN  | Field.Boolean                                                | Boolean  |
| TtypeEnum.STRING   | Field.String                                                 | Text     |
| TtypeEnum.TEXT     | Field.Text                                                   | Multiline text |
| TtypeEnum.HTML     | Field.Html                                                   | Rich text |
| TtypeEnum.ENUM     | Field.Enum                                                   | Enum     |
| TtypeEnum.DATETIME | Field.Date                                                   | Date and time |
| TtypeEnum.YEAR     | Field.Date(type = DateTypeEnum.YEAR, format = DateFormatEnum.YEAR) | Year     |
| TtypeEnum.DATE     | Field.Date(type = DateTypeEnum.DATE, format = DateFormatEnum.DATE) | Date     |
| TtypeEnum.TIME     | Field.Date(type = DateTypeEnum.TIME, format = DateFormatEnum.TIME) | Time     |


#### Binary Type (BINARY)

+ **Java Type**: Byte, Byte[]
+ **Database Type**: TINYINT, BLOB
+ **Rules**: This is a binary type, and front-end interaction is not supported by default. Not recommended for use.

```java
@Field(displayName = "byteField")
private Byte byteField;
```

#### Integer Type (INTEGER)

+ **Java Type**: Short, Integer, Long, BigInteger
+ **Database Type**: smallint, int, bigint, decimal(size,0)
+ **Rules**:
  - **Database Rules**: Use int by default; if size < 6, use smallint; if size > 6, use int; if size > 10 digits (including sign), use bigint; if size > 19 digits (including sign), use decimal. If size is not configured, infer from the Java type.
  - **Front-end Interaction Rules**: Use Number type for integers, and string type for long and big integers in the front-end-backend protocol.

```java
@Field(displayName = "integerField")
private Integer integerField;
```

:::tip Example

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/BackendAPI/ORM-API/1745397729891-7b11e9f1-7730-479d-92d8-a677bb841198.gif)

:::

#### Floating-point Type (FLOAT)

+ **Java Type**: Float, Double, BigDecimal
+ **Database Type**: float(M,D), double(M,D), decimal(M,D)
+ **Rules**:
  - **Database Rules**: Use float by default; if size > 7 digits (≥8), use double; if size > 15 digits (≥16), use decimal. If size is not configured, infer from the Java type.
  - **Front-end Interaction Rules**: Use Number type for float and double (both stored with 64-bit IEEE754 protocol), and string type for big decimals in the front-end-backend protocol.

```java
@Field(displayName = "floatField")
private BigDecimal floatField;
```

:::tip Example

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/BackendAPI/ORM-API/1745397783975-ceb9c6de-0579-44a6-8a38-5af2b3a6d878.png)

:::

#### Boolean Type (BOOLEAN)

+ **Java Type**: Boolean
+ **Database Type**: tinyint(1)
+ **Rules**: Boolean type, values are 1, true (true) or 0, false (false).

```java
@Field(displayName = "booleanField")
private Boolean booleanField;
```

:::tip Example

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/BackendAPI/ORM-API/1745397545716-35900428-fdc4-43cc-b994-5b3b0c9e0bb9.png)

:::

#### Enum Type (ENUM)

+ **Java Type**: Enum
+ **Database Type**: Consistent with the basic type specified in the data dictionary
+ **Rules**:
  - **Front-end Interaction Rules**: Options are obtained from the `options` field of `ModelField`, which is a JSON serialized string of the field-specified data dictionary subset. The front end and back end pass the option `name`, and the database stores the option `value`. If `multi` is true, use a multi-select control; if false, use a single-select control.

```java
@Field.Enum
@Field(displayName = "testEnum")
private TestEnum testEnum;

@Field.Enum
@Field(displayName = "testEnums",multi = true)
private List<TestEnum> testEnums;

// When declaring the field type as the enum value type, the field type must strictly match the enum value type.
@Field.Enum(dictionary=TestEnum.dictionary)
@Field(displayName = "testDictionaries",multi = true)
private List<String> testDictionaries;
```

:::tip Example

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/BackendAPI/ORM-API/1745399469553-f6fe5989-e19b-4738-835b-bd3267dac4dd.png)

:::

:::info Note

When declaring the field type as the enum value type, the field type must strictly match the enum value type.

:::

#### String Type (STRING)

+ **Java Type**: String
+ **Database Type**: varchar(size)
+ **Rules**: String, where size is the default length limit, which can be overridden in the view at the front end.

```java
@Field.String(size = 128,min = "3",max = "128")
@Field(displayName = "stringField2")
private String stringField2;

@Field(displayName = "stringField")
private String stringField;
```

:::tip Example

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/BackendAPI/ORM-API/1745397464636-e0752e18-512d-4942-b107-4fe3895a3480.png)

:::

#### Multiline Text Type (TEXT)

+ **Java Type**: String
+ **Database Type**: text
+ **Rules**: Multiline text, the edit-state component is a multiline text box, with length limits of min and max values.

```java
@Field.Text(min = "3",max = "512")
@Field(displayName = "textField")
private String textField;
```

:::tip Example

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/BackendAPI/ORM-API/1745396787958-0d5cdbb1-14d4-42c1-849c-f9a816aa1f16.png)

:::

#### Rich Text Type (HTML)

+ **Java Type**: String
+ **Database Type**: text
+ **Rules**: Use a rich text editor.

```java
@Field.Html
@Field(displayName = "htmlField")
private String htmlField;
```

:::tip Example

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/BackendAPI/ORM-API/1745396840743-1dc55159-a161-41c8-ba5d-81d8555bda45.png)

:::

#### Date and Time Type (DATETIME)

+ **Java Type**: java.util.Date, java.sql.Timestamp
+ **Database Type**: datetime(fraction), timestamp(fraction)
+ **Rules**:
  - **Database Rules**: A combination of date and time in the format YYYY - MM - DD HH:MM:SS [.fraction], accurate to seconds by default, with up to 6 decimal places (microseconds precision). Set the decimal places via `fraction`, which is stored in the field's `decimal` attribute.
  - **Front-end Interaction Rules**: Use a date and time control by default, formatting the date and time according to the date and time type's `format`.

```java
@Field(displayName = "dateTimeField")
private Date dateTimeField;
```

:::tip Example

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/BackendAPI/ORM-API/1745396951179-f8c1c320-f8e6-4bad-ad08-7b32d6a434f9.gif)

:::

#### Year Type (YEAR)

+ **Java Type**: java.util.Date
+ **Database Type**: year
+ **Rules**:
  - **Database Rules**: Represents date values in the "YYYY" format by default.
  - **Front-end Interaction Rules**: Use a year control by default, formatting the date according to the date type's `format`.

```java
@Field.Date(type = DateTypeEnum.YEAR,format = DateFormatEnum.YEAR)
@Field(displayName = "yearField")
private Date yearField;
```

:::tip Example

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/BackendAPI/ORM-API/1745397027069-46f4f105-03af-49d1-914c-898c639a6cc6.gif)

:::

#### Date Type (DATE)

+ **Java Type**: java.util.Date, java.sql.Date
+ **Database Type**: date
+ **Rules**:
  - **Database Rules**: Represents date values in the "YYYY - MM - DD" format by default.
  - **Front-end Interaction Rules**: Use a date control by default, formatting the date according to the date type's `format`.

```java
@Field.Date(type = DateTypeEnum.DATE,format = DateFormatEnum.DATE)
@Field(displayName = "dateField")
private Date dateField;
```

:::tip Example

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/BackendAPI/ORM-API/1745397095700-c4437d51-cc95-4965-9c19-7677169d761a.gif)

:::

#### Time Type (TIME)

+ **Java Type**: java.util.Date, java.sql.Time
+ **Database Type**: time(fraction)
+ **Rules**:
  - **Database Rules**: Represents time values in the "HH:MM:SS" format by default.
  - **Front-end Interaction Rules**: Use a time control by default, formatting the date according to the date type's `format`.

```java
@Field.Date(type = DateTypeEnum.TIME,format = DateFormatEnum.TIME)
@Field(displayName = "timeField")
private Date timeField;
```

:::tip Example

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/BackendAPI/ORM-API/1745397162583-a98e93bd-5aff-487f-a4b3-37e7f65eb8c1.gif)

:::

### 2. Composite Types

| Business Type | Java Type                                       | Database Type                                       | Rule Description                                                     |
| -------- | ---------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------ |
| MAP      | Map                                            | String                                           | Key-value pairs, serialized via Field.serialize.JSON                      |
| MONEY    | BigDecimal | decimal(M,D) | Amount, front-end uses an amount control, default scale and precision: maximum digits 65, decimal places 6 |


#### Amount MONEY

```java
@Field.Money
@Field(displayName = "testMoney")
private BigDecimal testMoney;
```

#### Key-value Pair MAP

```java
@Field(displayName = "testMapField")
private Map<String,Object> testMapField;
```

:::tip Example

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/BackendAPI/ORM-API/1745547724926-43f92169-399c-4ec0-a76b-5d6fd7b2a857.png)

:::

### 3. Reference Type RELATED

| Business Type | Java Type           | Database Type            | Rule Description                                                     |
| -------- | ------------------ | --------------------- | ------------------------------------------------------------ |
| RELATED  | Basic type or relation type | Not stored or varchar、text | Reference field<br/>【Database Rule】: The type of the last level of the dot expression; the database field value is the serialized value of the Java field by default, using JSON serialization<br/>【Front-end Interaction Rule】: The control type of the last level of the dot expression |


```java
@Field(displayName = "stringField")
private String stringField;

@Field.many2one
@Field(displayName = "User",required = true)
@Field.Relation(relationFields = {"userId"},referenceFields = {"id"})
private PamirsUser user;

@Field.Related("stringField")
@Field(displayName = "Referenced Field stringField")
private String relatedStringField;

@Field.Related({"user","name"})
@Field(displayName = "Referenced Creator Name")
private String userName;

```

:::tip Example

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/BackendAPI/ORM-API/1745400920071-bdadae3f-0409-4d1d-8e10-bf0c816463b8.gif)

:::

### 4. Relation Types

Relation types describe the association between models, including the association type, associated models on both sides, and read-write operations of the association. Fields with business type `ttype` as `O2O`, `O2M`, `M2O`, or `M2M`.

| Business Type | Java Type           | Database Type                                                | Rule Description   |
| -------- | ------------------ | --------------------------------------------------------- | ---------- |
| O2O      | Model/DataMap       | Not stored or varchar、text | One-to-one relationship |
| M2O      | Model/DataMap       | Not stored or varchar、text | Many-to-one relationship |
| O2M      | List<Model/DataMap> | Not stored or varchar、text | One-to-many relationship |
| M2M      | List<Model/DataMap> | Not stored or varchar、text | Many-to-many relationship |


If storing multi-value or relation fields, JSON format is used for serialization by default. The database field type for multi-value fields is varchar (1024) by default, and for relation fields, it is text by default.

Association relationships describe how models are associated:
- Many-to-one relationships mainly clarify subordination.
- One-to-many relationships mainly clarify subordination.
- Many-to-many relationships mainly handle weak dependency relationships, using an intermediate model for association operations.
- One-to-one relationships are mainly used for multi-table inheritance and in-line data merging.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/BackendAPI/ORM-API/1745401686025-b8b170bf-79f1-4316-ad21-690fe3372bac.png)

Important terms for association relationships:
- **Associated model**: Represented by `references`, referring to the model associated with the own model.
- **Associated fields**: Represented by `referenceFields`, which are fields of the associated model used to clarify which fields of the associated model are related to which fields of the own model.
- **Relation model**: The own model.
- **Relation fields**: Represented by `relationFields`, which are fields of the own model used to clarify which fields of the own model are related to which fields of the associated model.
- **Intermediate model**: Represented by `through`, only existing in many-to-many relationships, and the model has `relationship=true`.

#### Many-to-one Relationship (many2one)

After adding the `@Field` annotation to a field, if the field type is a model, the system infers the field's `Ttype` as `many2one` and generates the association based on the current model's primary key. For example, if the current model is `TestModel`, the associated model is `TestRelationModel`, and the primary key is `id`, a `testRelationModelId` field will be generated in the `TestModel` model to store the association.

- The `relationFields` attribute of the `@Field.Relation` annotation: Configures the left model's attributes as relation fields, defaulting to the current field name plus the right model's primary key attribute.
- The `referenceFields` attribute of the `@Field.Relation` annotation: Configures the right model's attributes as associated fields, defaulting to the primary key set.

```java
@Field.many2one
@Field(displayName = "Many-to-one Test Field")
// Equivalent to @Field.Relation(relationFields = {"rightModelId"},referenceFields = {"id"})
private TestRelationModel rightModel;
```

In this example, the table corresponding to `TestModel` will default to generating the `right_model_id` field.

#### One-to-many Relationship (one2many)

After adding the `@Field` annotation to a field, if the field type is `List<T>`, the system infers the field's `Ttype` as `one2many` and generates the association based on the current model's primary key. For example, if the current model is `TestModel`, the associated model is `TestRelationModel`, and the primary key is `id`, a `testModelId` field will be generated in the `TestRelationModel` model to store the association.

- The `@Field.one2many` annotation: Configures query and submission strategies for the field.
- The `relationFields` attribute of the `@Field.Relation` annotation: Configures the left model's attributes as relation fields, defaulting to the primary key set.
- The `referenceFields` attribute of the `@Field.Relation` annotation: Configures the right model's attributes as associated fields, defaulting to the simple model code of the left model plus the primary key attribute.

```java
@Field.one2many
@Field(displayName = "One-to-many Test Field")
// Equivalent to @Field.Relation(relationFields = {"id"},referenceFields = {"testModelId"})
private List<TestRelationModel> rightModels;
```

In this example, the system will generate a field named `test_model_id` in the table corresponding to `TestRelationModel` to establish the association with `TestModel`.

#### Many-to-many Relationship (many2many)

In addition to the `@Field` annotation, add the `@Field.many2many` annotation to mark the field as many-to-many. A many-to-many relationship requires configuring an intermediate model, which can be determined via the `through` attribute of the `@Field.many2many` annotation (value is the intermediate model code; if there is no intermediate model `Class`, the system automatically generates one based on the association field configuration) or the `throughClass` attribute (value is the intermediate model `Class`), with one and only one of these attributes configured.

- The `relationFields` attribute of the `@Field.many2many` annotation: Configures the relation fields between the intermediate model and the left model. If not configured, uses the relation fields from the association field configuration (`relationFields` of the `@Field.Relation` annotation) as the default.
- The `referenceFields` attribute of the `@Field.many2many` annotation: Configures the relation fields between the intermediate model and the right model. If not configured, uses the associated fields from the association field configuration (`referenceFields` of the `@Field.Relation` annotation) as the default.
  If there is no intermediate model `Class` and both left and right models have association field configurations, the system uses the association field configuration of the first-loaded model to generate the intermediate model. When using a model as the intermediate model, it is recommended to use the `BaseRelation` base class to construct the intermediate model.

```java
@Field.many2many
// Equivalent to replacing @Field.many2many with the commented configuration below
//    @Field.many2many(through = "TestModelRelTestRelationModel",relationFields = {"testModelId"},referenceFields = {"testRelationModelId"})
//    @Field.Relation(relationFields = {"id"},referenceFields = {"id"})
@Field(displayName = "Many-to-many Test Field")
private List<TestRelationModel> rightModelM2Ms;
```

Another configuration:

```java
@Model.model(TestModelRelTestRelationModel.MODEL_MODEL)
@Model(displayName = "Test Intermediate Table")
public class TestModelRelTestRelationModel extends BaseRelation {

    public static final String MODEL_MODEL="test.TestModelRelTestRelationModel";
    @Field(displayName = "testModelId")
    private Long testModelId;

    @Field(displayName = "TestRelationModelId")
    private Long testRelationModelId;

}
```

```java
@Field.many2many(throughClass = TestModelRelTestRelationModel.class,relationFields = {"testModelId"},referenceFields = {"testRelationModelId"})
@Field.Relation(relationFields = {"id"},referenceFields = {"id"})
@Field(displayName = "Many-to-many Test Field")
private List<TestRelationModel> rightModelM2Ms;
```

In this example, a关联表 (association table) named `test_model_rel_test_relation_model` will be automatically generated in the database pointed to by `Ds` of `TestModel`. In this table, the `test_model_id` field is associated with the `id` field of the `TestModel` table, and the `test_relation_model_id` field is associated with the `id` field of the `TestRelationModel` table to establish the relationship between the two tables.

#### Special Scenarios for Relation Fields

:::warning Tip

When association fields are not one-to-one and contain constants, `#1#` in the example code represents `type` = 1. Add a `domain` description to implement specific filtering logic. When users perform page selection operations, the system automatically filters `TestRelationModel` records with `type` = 1 based on this rule.

:::

```java
@Field(displayName = "Many-to-many")
@Field.many2many(
        through = "TestModelRelTestRelationModel",
        relationFields = {"testModelId"},
        referenceFields = {"testRelationModelId","type"}
)
@Field.Relation(relationFields = {"id"}, referenceFields = {"id", "#1#"}, domain = " type == 1")
private List<TestRelationModel> petTalents;
```

In the above code, configure the many-to-many relationship's intermediate model and associated fields via the `@Field.many2many` annotation, and use the `domain` attribute of the `@Field.Relation` annotation to specify filtering conditions, ensuring only qualified data is displayed.

### 5. Type Default Inference

M represents precision (total digits), D represents scale (decimal places), fraction is the precision below seconds for time, and multi indicates the field is multi-valued.

| **Java Type**              | **Field Annotation**                                                | **Inferred ttype** | **Inferred Configuration** | **Inferred Database Configuration** |
| ------------------------- | :----------------------------------------------------------- | :------------ | -------------------- | :----------------- |
| Byte                      | @Field                                                       | BINARY        | None                 | tinyint(1)         |
| String                    | @Field                                                       | STRING        | size=128             | varchar(128)       |
| List<`primitive type`>      | @Field                                                       | STRING        | size=1024, multi=true | varchar(1024)      |
| Map                       | @Field                                                       | STRING        | size=1024            | varchar(1024)      |
| Short                     | @Field                                                       | INTEGER       | M=5                  | smallint(6)        |
| Integer                   | @Field                                                       | INTEGER       | M=10                 | integer(11)        |
| Long                      | @Field                                                       | INTEGER       | M=19                 | bigint(20)         |
| BigInteger                | @Field                                                       | INTEGER       | M=64                 | decimal(64,0)      |
| Float                     | @Field                                                       | FLOAT         | M=7, D=2             | float(7,2)         |
| Double                    | @Field                                                       | FLOAT         | M=15, D=4            | double(15, 4)      |
| BigDecimal                | @Field                                                       | FLOAT         | M=64, D=6            | decimal(64,6)      |
| Boolean                   | @Field                                                       | BOOLEAN       | None                 | tinyint(1)         |
| java.util.Date            | @Field                                                       | DATETIME      | fraction=0           | datetime           |
| java.util.Date            | @Field.Date(type=DateTypeEnum.YEAR) | YEAR          | None                 | year               |
| java.util.Date            | @Field.Date(type=DateTypeEnum.DATE) | DATE          | None                 | date               |
| java.util.Date            | @Field.Date(type=DateTypeEnum.TIME) | TIME          | fraction=0           | time               |
| java.sql.Timestamp        | @Field                                                       | DATETIME      | fraction=0           | timestamp          |
| java.sql.Date             | @Field                                                       | DATE          | None                 | date               |
| java.sql.Time             | @Field                                                       | TIME          | fraction=0           | time               |
| Long                      | @Field.Date                                                  | DATETIME      | fraction=0           | datetime           |
| enum implements<br/>IEnum | @Field                                                       | ENUM          | None                 | Based on enum value type |
| primitive type            | @Field.Enum(dictionary=Data Dictionary Code)                 | ENUM          | None                 | Based on enum value type |
| List<`primitive type`>      | @Field.Enum(dictionary=Data Dictionary Code)                 | ENUM          | multi=true           | varchar(512)       |
| Model class               | @Field.Relation                                              | M2O           | None                 | text               |
| DataMap                   | @Field.Relation                                              | M2O           | None                 | text               |
| List\<Model class>         | @Field.Relation                                              | O2M           | multi=true           | text               |
| List<`DataMap`>             | @Field.Relation                                              | O2M           | multi=true           | text               |


## (二) Installation and Update

Configure the immutable code of a field via `@Field.field`, which cannot be modified once set. Subsequent updates to field configurations are retrieved based on this code. Modifying the annotation value will treat it as a new field, creating a new database table field for storage models and renaming the original field as deprecated.

## (三) Basic Configuration

### 1. Immutable Fields

Mark a field as unupdatable in both front-end and back-end using the `immutable` attribute; the system ignores update operations on such fields. Additionally, if a field has the `@Base` annotation, its `immutable` attribute is automatically set to `true`.

```plsql
@Field(displayName = "Name", immutable = true)
private String name;
```

### 2. Field Code Generator

Conveniently configure field code generation rules via the `@Field.Sequence` annotation. When a field code is empty, the system automatically generates the corresponding code based on preset rules for automated data coding management. For example:

```plsql
@Field.String
@Field(displayName = "Code", unique = true)
@Field.Sequence(sequence = "SEQ", prefix = "C", size = 5, step = 1, initial = 10000)
private String code;
```

:::warning Tip

At the model level, code generators can also be defined via `@Model.Code`. Note that a model with `@Model.Code` must have a `code` field, as the generator is bound to the `code` field.

:::

```java
@Model.Code(sequence = "DATE_ORDERLY_SEQ", prefix = "P", size = 6, step = 1, initial = 10000, format = "yyyyMMdd")
public class TestModel extends CodeModel {}
```

### 3. Field Serialization and Deserialization

Flexibly configure serialization and deserialization strategies for non-string type attributes via the `serialize` attribute of the `@Field` annotation. Processed data is persisted in the system as a serialized string. For example:

```plsql
// Serialize collection elements with commas, allow storage, support multi-values
@Field(displayName = "Product Tags", serialize = Field.serialize.COMMA, store = NullableBoolEnum.TRUE, multi = true)
@Field.Advanced(columnDefinition = "varchar(1024)")
private List<String> tags;

// Serialize in JSON format, allow storage, do not store relationships separately
@Field.Text
@Field.Relation(store = false)
@Field(displayName = "JSON Serialization", serialize = Field.serialize.JSON, store = NullableBoolEnum.TRUE)
private List<TestRelationModel> list;
```

:::info Note

1. To persist field data, explicitly set the `Field#store` attribute to `NullableBoolEnum.TRUE`.
2. `Field#serialize` uses JSON serialization by default, which can be switched to other methods as needed.
3. For fields containing relationships (e.g., `list`), set `Field.Relation#store` to `false` to avoid duplicate storage of field values and relationship table records.

:::

#### Field Serialization Options

| **Serialization Method**                          | **Description**                              | **Remarks**                                                     |
| --------------------------------------- | ------------------------------------- | ------------------------------------------------------------ |
| JSON                                    | Serialize in JSON format              | Default configuration for `@Field.serialize`, suitable for serializing model-related type fields |
| DOT                                     | Concatenate collection elements with dots                  |                                                              |
| COMMA                                   | Concatenate collection elements with commas                  |                                                              |
| BIT | Implement via bitwise AND operation and summation of powers of 2 | Specialized for binary enum serialization, no need to configure in `@Field.serialize`—Oinone automatically handles recognition |


#### Custom Serialization Methods

To customize serialization logic, create a dedicated serializer by implementing the `pro.shushi.pamirs.meta.api.core.orm.serialize.Serializer` interface. After development, specify the `serialize` attribute of the `@Field` annotation as `X` (where `X` is the custom serialization type, e.g., `custom` in the example) to apply the custom serializer.

```java
@Component
public class CustomSerializer implements Serializer<Object, Object> {

    @Override
    public Object serialize(String ltype, Object value) {
        return value;
    }

    @Override
    public Object deserialize(String ltype, String ltypeT, Object value, String format) {
        return value;
    }

    @Override
    public String type() {
        return "custom";
    }
}
```

#### Default Value Deserialization

When configuring the `defaultValue` attribute on a field, the system automatically performs deserialization based on the field's `Ttype`, `Ltype`, and other type attributes. Specific rules are as follows:

- OBJ, STRING, TEXT, HTML—Preserve the original value for the type;
- BINARY, INTEGER—Convert to integers;
- FLOAT, MONEY—Convert to floating-point numbers;
- DATETIME, DATE, TIME, YEAR—Parse according to the format specified by `Field.Date#format`;
- BOOLEAN—Only supports `null`, `true`, `false`;
- ENUM—Assign values by matching `value`.

### 4. Multi-value Fields

The multi-value field feature applies only to basic data type and enum type fields. To configure a field as multi-value, set the field's `multi` attribute.

```java
@Field(displayName = "Name Group", multi = true)
private List<String> name;
```

### 5. Default Values

Set default values for fields via the field's `defaultValue` configuration, with specific deserialization rules referenced in the "Default Value Deserialization" section.

```java
@Field(displayName = "Name", defaultValue = "Default Value")
private String name;
```

### 6. Front-end Default Configuration

Use the following attributes in the `@Field` annotation to configure front-end default visual and interaction rules, which can also be overridden in the front-end. Specific attributes include:

- `required`: Specifies whether the field is mandatory.
- `invisible`: Controls whether the field is invisible.
- `priority`: Represents field priority, and list columns are sorted based on this attribute.

### 7. Annotation Configuration @Field

#### @Field General Field Configuration

├── displayName Display name
├── summary Attribute description
├── store Whether to store, default is NullableBoolEnum.NULL (i.e., not selected), which infers based on the field's Ttype
├── multi Whether it is a multi-value field, default is false
├── priority Database field priority
├── serialize Back-end serialization function SerializeEnum or custom serialization function
├── requestSerialize Front-end serialization function SerializeEnum or custom serialization function
├── defaultValue Default value, supporting [built-in functions](/en/DevManual/Reference/Back-EndFramework/functions-API.md#六、表达式)
├── required Mandatory, default is false
├── invisible Invisible, default is false
├── immutable Unchangeable, default is false
├── unique Unique index, default is false
├── index Whether indexable, default is false
├── translate Internationalization, whether translation is needed, default is false
├── immutable Unchangeable, default is false
└── field Default uses java attribute name
     └── value

#### @Field.Advanced Field Advanced Attributes

├── name API name, default uses java attribute name
├── column Data table field name
├── columnDefinition Database field type—use this field to fill in the complete database field definition if customizing types not in the ttype corresponding database field type list
├── onlyColumn Persistence layer query directly returns the column name without attribute name mapping
└── copied Whether copyable, default is true—whether it can be copied when copying data records in the front-end.

#### @Field.PrimaryKey Primary Key Indicator

├── value Sorting
└── keyGenerator ID generation strategy, default: NON (follows system rules), optional: AUTO_INCREMENT (database auto-increment ID), DISTRIBUTION (distributed ID)

#### @Field.Version Optimistic Lock

#### @Filed.Sequence Code Generation Configuration

├── sequence Sequence generation function, optional values:
  - SEQ—Auto-increment serial number (non-consecutive)
  - ORDERLY—Auto-increment ordered serial number (consecutive)
  - DATE_SEQ—Date + auto-increment serial number (non-consecutive)
  - DATE_ORDERLY_SEQ—Date + strongly ordered serial number (consecutive)
  - DATE—Date
  - UUID—Random 32-character string containing numbers and lowercase letters
├── prefix Prefix
├── suffix Suffix
├── size Length
├── step Step size (valid for serial numbers)
├── initial Starting value (valid for serial numbers)
├── format Formatting (valid for dates)
└── separator Separator

#### @Field.Integer Integer Type

├── M Scale, maximum number of digits
├── min Minimum value
└── max Maximum value

#### @Field.Float Floating-point Type

├── M Scale, maximum number of digits
├── D Precision, number of decimal places
├── min Minimum value
└── max Maximum value

#### @Field.Boolean Boolean Type

#### @Field.String String Type

├── size String length, default 128 for single value, default 512 for multi-value
├── min Minimum value
└── max Maximum value

#### @Field.Text Multiline Text Type

├── min Minimum value
└── max Maximum value

#### @Field.Date Date-time, Year, Date, Time, etc., Types

├── type Time type
├── format Time format
├── fraction Time precision
├── min Minimum value
└── max Maximum value

#### @Field.Money

├── M Scale, maximum number of digits, default: 65
├── D Precision, number of decimal places, default: 6
├── min Minimum value
└── max Maximum value

#### @Field.Html Rich Text Type

├── size String length, default: 1024
├── min Minimum value
└── max Maximum value

#### @Field.Enum Enum Type

├── dictionary Data dictionary code
├── size Storage character length
└── limit Enum selection quantity limit, default: -1 (unlimited)

#### @Field.Related Reference Field

└── value(or related) Used with relation, the field of the associated model

#### @Field.Relation Common Configuration for Relation Types

├── store Whether to store the relationship, default is true
├── relationFields Relation fields of the own model, foreign keys, used to get values as query conditions for the associated model, corresponding to referenceField fields one-to-one
├── references Associated model—fill this for low-code models without a class
├── referenceClass Associated model class—fill this for Java models with a class
├── referenceFields Associated fields of the associated model, unique indexes of the associated model
├── domainSize Number of items per page for model filter options
├── domain Model filter, data query filter conditions
├── context Context, passed by the front-end during query, JSON string
├── search Search function (function code)
└── columnSize Storage length during serialization storage, default length 1024

#### @Field.one2many One-to-many

├── limit Relation quantity limit, default is -1 (i.e., unlimited)
├── pageSize Number of items per query page
├── ordering Sorting
├── inverse Reverse association, store the association relationship at the "one" end of the one-to-many relationship, default: false
├── onUpdate Update association operation, default: SET_NULL (set to null), other options: NO_ACTION (no operation), CASCADE (cascade operation), RESTRICT (restrict operation)
└── onDelete Update association operation, default: SET_NULL (set to null), other options: NO_ACTION (no operation), CASCADE (cascade operation), RESTRICT (restrict operation)

#### @Field.many2one Many-to-one

#### @Field.many2many Many-to-many

├── through Intermediate model—fill this for low-code models without a class
├── throughClass Intermediate model class—fill this for Java models with a class
├── relationFields Association fields between the intermediate model and the relation model
├── referenceFields Association fields between the intermediate model and the associated model
├── limit Relation quantity limit, default is -1 (i.e., unlimited)
├── pageSize Number of items per query page
└── ordering Sorting

#### @Field.Page Pagination Indicator

└── value Pagination configuration can be performed on the field for one-to-many and many-to-many relationships, default true

#### @Field.Override Override

└── value Override inherited fields (association relation fields)

### 8. Field Naming Conventions

| **Field Attribute** | **Default Naming Convention**                                           | **Naming Rule**                                                     |
| :----------- | :--------------------------------------------------------- | :----------------------------------------------------------- |
| name         | Default uses java attribute name                                         | 1. Only supports numbers and letters<br/>2. Must start with a lowercase letter<br/>3. Length must be ≤ 128 characters |
| field        | Default uses java attribute name                                         | Same naming rule constraints as name                                   |
| display_name | Default uses name attribute                                           | 1. Length must be ≤ 128 characters                                 |
| lname        | Uses java attribute name, conforms to java naming conventions, real attribute name, cannot be specified | Same naming rule constraints as name                                   |
| column       | Column name is the camelCase to snake_case format of the attribute name                           | 1. Only supports numbers, letters, and underscores<br/>2. Length must be ≤ 128 characters (this limit is a system storage constraint, independent of the database itself) |
| summary      | Default uses displayName attribute                                      | 1. Cannot use semicolons<br/>2. Length must be ≤ 500 characters             |


## (四) Field Constraints

### 1. Primary Key

Configure the automatic generation rule for model primary keys via a YAML file or using the `keyGenerator` attribute of the `@Model.Advanced` annotation. Supported generation rules include auto-increment sequences (`AUTO_INCREMENT`) and distributed IDs. If no configuration is made, the system will not automatically generate primary key values.

### 2. Logical Foreign Key Constraints

When creating association relation fields, use the `onUpdate` and `onDelete` attributes of the `@Field.Relation` annotation to specify the corresponding operations for the associated model when deleting the model or updating the model's relation field value. Operation options include `RESTRICT`, `NO_ACTION`, `SET_NULL`, and `CASCADE`, with the default being `SET_NULL`. The meanings of each operation are as follows:

+ **RESTRICT**: If the model has associated records with the associated model, the engine prevents updating the model's relation field or deleting the model record.
+ **NO_ACTION**: This operation means no constraints (different from database constraint definitions).
+ **CASCADE**: When updating the model's relation field or deleting the model, cascade updates the associated field values of the corresponding records in the associated model or cascade deletes the corresponding records in the associated model.
+ **SET_NULL**: When updating the model's relation field or deleting the model, if the corresponding association field of the associated model allows `null`, the field is set to `null`; if `null` is not allowed, the engine prevents operations on the model.

### 3. General Validation Constraints

| **Field Business Type** | **size**   | **limit**    | **decimal** | **mime** | **min**    | **max**    |
| ---------------- | ---------- | ------------ | ----------- | -------- | ---------- | ---------- |
| BINARY           |            |              |             | File type | Minimum bits | Maximum bits |
| INTEGER          | Effective digits   |              |             |          | Minimum value    | Maximum value    |
| FLOAT            | Effective digits   |              | Decimal places    |          | Minimum value    | Maximum value    |
| BOOLEAN          |            |              |             |          |            |            |
| ENUM             | Storage characters | Maximum multi-select quantity |             |          |            |            |
| STRING           | Storage characters |              |             |          | Character count  | Character count  |
| TEXT             |            |              |             |          | Character count  | Character count  |
| HTML             |            |              |             |          | Character count  | Character count  |
| MONEY            | Effective digits   |              | Decimal places    |          | Minimum value    | Maximum value    |
| RELATED          |            |              |             |          |            |            |


| **Field Business Type** | **fraction** | **format** | **min**      | **max**      |
| ---------------- | ------------ | ---------- | ------------ | ------------ |
| DATETIME         | Time precision     | Time format   | Earliest date-time | Latest date-time |
| YEAR             |              | Time format   | Earliest year    | Latest year    |
| DATE             |              | Time format   | Earliest date    | Latest date    |
| TIME             | Time precision     | Time format   | Earliest time    | Latest time    |


| **Field Business Type** | **size**                 | **domainSize** | **limit**    | **pageSize** |
| ---------------- | ------------------------ | -------------- | ------------ | ------------ |
| RELATED          | Storage characters (if serialized storage) |                |              |              |
| O2O              | Storage characters (if serialized storage) | Items per page of options |              |              |
| M2O              | Storage characters (if serialized storage) | Items per page of options |              |              |
| O2M              | Storage characters (if serialized storage) | Items per page of options | Relation quantity limit | Items per query page |
| M2M              | Storage characters (if serialized storage) | Items per page of options | Relation quantity limit | Items per query page |


### 4. Validation Constraints

For detailed content on this topic, refer to the [Validation Constraints](#qkm8t) documentation for models.

# III. Enums and Data Dictionaries

An enum is a program that lists all members of a finite sequence set. In metadata, we use data dictionaries for description.

### 1. Protocol Conventions

+ **Configuration Requirements**: Enums must implement the `IEnum` interface and be configured using the `@Dict` annotation. Specify the unique code of the data dictionary by setting the `dictionary` attribute of the `@Dict` annotation.
+ **Front-end-backend Interaction**: Use the enum's `displayName` for front-end display; during front-end-backend interaction, the front-end uses the enum's `name`, while the back-end uses the enum's `value`, including setting default values with the enum's `value`.
+ **Storage Method**: Enum information is stored in the data dictionary table of metadata.
+ **Enum Classification**: Enums are divided into two types: exception and business. Exception enums mainly define error prompt information during program operation; business enums clarify the finite ordered set of values for a field in business.

### 2. Mutable (Inheritable) Enums

#### Parent Enum Definition

The following is the definition code for the parent enum `ParentExtendEnum`, which inherits from `BaseEnum` and is configured using the `@Dict` annotation.

```java
@Dict(dictionary = ParentExtendEnum.DICTIONARY, displayName = "Test Enum Inheritance Parent Enum", summary = "Test Enum Inheritance Parent Enum")
public class ParentExtendEnum extends BaseEnum<ParentExtendEnum, String> {

    public static final String DICTIONARY = "test.ParentExtendEnum";

    public static final ParentExtendEnum A = create("A", "a", "Aa", "AA");
    public static final ParentExtendEnum B = create("B", "b", "Bb", "BB");
    public static final ParentExtendEnum C = create("C", "c", "Cc", "CC");
}
```

#### Child Enum Definition

Below is the definition code for the child enum `ChildExtendEnum`, which inherits from `ParentExtendEnum` and is also configured using the `@Dict` annotation.

```java
@Dict(dictionary = ChildExtendEnum.DICTIONARY, displayName = "Test Enum Inheritance Child Enum", summary = "Test Enum Inheritance Child Enum")
public class ChildExtendEnum extends ParentExtendEnum {

    public static final String DICTIONARY = "test.ChildExtendEnum";

    public static final ChildExtendEnum D = create("D", "d", "Dd", "DD");
    public static final ChildExtendEnum E = create("E", "e", "Ee", "EE");
    public static final ChildExtendEnum F = create("F", "f", "Ff", "FF");
}
```

The above code demonstrates the use of enum inheritance in Java, enabling enum extension through parent and child enum definitions.

### 3. Switch API for Mutable Enums

Directly inheriting `BaseEnum` in Java enables mutable enums, which are not supported natively. Mutable enums offer unique advantages, allowing dynamic addition of enum items not defined in Java code during program runtime and supporting enum inheritance. However, since mutable enums are not standard enum types in the Java specification, the `switch...case...` statement cannot be used. K2 provides two alternatives, `swithes` (no return value) and `swithGet` (requires a return value), to achieve the same functionality and logic as `switch...case...`.

#### `swithes` Method Example

```java
BaseEnum.switches(comparisonVariable, comparisonMethod /* The system provides two default methods: caseName() and caseValue() */,
                  cases(enumList1).to(() -> {/* Logic processing */}),
                  cases(enumList2).to(() -> {/* Logic processing */}),
                  // More cases can be added
                  cases(enumListN).to(() -> {/* Logic processing */}),
                  defaults(() -> {/* Default logic processing */})
);
```

#### `switchGet` Method Example

```java
BaseEnum.<comparisonVariableType, returnValueType>switchGet(comparisonVariable,
                                  comparisonMethod /* The system provides two default methods: caseName() and caseValue() */,
                cases(enumList1).to(() -> {/*return logic processing result*/}),
                cases(enumList2).to(() -> {/*return logic processing result*/}),
                // More cases can be added
                cases(enumListN).to(() -> {/*return logic processing result*/}),
                defaults(() -> {/*return logic processing result*/})
);
```

#### Comparison Method Description

+ `caseName()`: This method matches and compares the enum item's `name` with the comparison variable.
+ `caseValue()`: This method matches and compares the enum item's `value` with the comparison variable.

#### Practical Application Example

The following logic uses the `switchGet` method to determine the value of `ttype`, returning `true` when `ttype` is the enum value of `O2O`, `O2M`, `M2O`, or `M2M`, and `false` otherwise.

```java
return BaseEnum.<String, Boolean>switchGet(ttype, caseValue(),
                cases(O2O, O2M, M2O, M2M).to(() -> true),
                defaults(() -> false)
);
```

Through the above methods, flexible logic judgment similar to `switch...case...` can be achieved even for mutable enums.

### 4. Binary Enums

#### Binary Enum Overview

Binary enums require enum item values to be powers of 2 and greater than 0, facilitating bitwise operations for combining and judging enum items.

#### Binary Enum Implementation

To define a binary enum, implement the `BitEnum` interface. The following is an example code demonstrating the definition of a binary enum named `TestBitEnum`:

```java
@Dict(dictionary = TestBitEnum.DICTIONARY, displayName = "Test Binary Enum", summary = "Test Binary Enum")
public class TestBitEnum extends BaseEnum<TestBitEnum, Long> implements BitEnum {

    public static final String DICTIONARY = "test.ParentExtendEnum";

    // Note: The value 3 for C in the original code is not a power of 2; it should be modified to 4L here
    public static final TestBitEnum A = create("A", 1L, "Aa", "AA");
    public static final TestBitEnum B = create("B", 2L, "Bb", "BB");
    public static final TestBitEnum C = create("C", 4L, "Cc", "CC");
}
```

In the above code, `TestBitEnum` inherits from `BaseEnum` and implements the `BitEnum` interface. Meanwhile, each enum item's value is a power of 2, conforming to the definition requirements of binary enums.

:::danger Warning

Note that the value `3L` for `C` in the original code is not a power of 2, which does not conform to binary enum rules, so it is modified to `4L` here.

:::

### 5. Enums Compatible with Java Enum

In Java, the `enum` keyword can be directly used to declare enum types. However, this approach has limitations—declared enums cannot inherit other classes and are difficult to extend. Therefore, it is only suitable for defining fixed, unmodifiable basic enum scenarios and is generally not recommended for use in most projects.

The following is a specific code example demonstrating the declaration of an enum named `TestEnum` compatible with Java Enum:

```java
@Dict(dictionary = TestEnum.dictionary, displayName = "Test Enum")
public enum TestEnum implements IEnum<String> {
    enum1("enum1", "枚举1", "枚举1"),
    enum2("enum1", "枚举2", "枚举2");

    public static final String dictionary = "test.TestEnum";

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

### 6. Application of Enum Types

#### Two Methods for Field Definition

There are two ways to configure the data dictionary for field values:

+ **Declare the field type using an enum class**: Directly define the field type with an enum class.
+ **Declare the field type using the enum item value type**: If this method is used, set the `dictionary` attribute of the `@Field.Enum` annotation to the code of the corresponding data dictionary.

```java
@Field.Enum
@Field(displayName = "testEnum")
private TestEnum testEnum;

// When declaring the field type as the enum item value type, the field type must strictly match the enum value type.
@Field.Enum(dictionary=TestEnum.dictionary)
@Field(displayName = "testDictionarie")
private String testDictionarie;
```

:::info Note

When declaring the field type as the enum item value type, the field type must strictly match the enum value type.

:::

#### Multi-select Enums

```java
@Field(displayName = "testEnums", multi = true)
private List<TestEnum> testEnums;
```

#### Association Relation Constants

Define association relation constants using the form **#Constant#**

```java
@Field.one2many
@Field.Relation(relationFields = {"id", "#DEMO#"}, referenceFields = {"testModelId", "type"})
@Field(displayName = "Associated Model")
private List<TestRelationModel> relationModel;
```

# IV. Model Inheritance

Model inheritance allows child models to inherit metadata, fields, data managers, and functions from parent models, with different inheritance methods suitable for different business scenarios:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/BackendAPI/ORM-API/1603810885615-e6271d3c-47b1-4066-831c-101acb7fc0e1-20250529114616657.png)

### 1. Abstract Inheritance (ABSTRACT)

Abstract base class models store information that should not be repeatedly written in each child model. They do not generate corresponding data tables for storing data, serving only as templates for other models to inherit inheritable domains. Additionally, abstract base classes can inherit other abstract base classes.

+ **Application Scenario**: Mainly used to solve common field problems, avoiding repeated definition of the same fields in multiple child models.
+ **Characteristics**: Does not generate data tables, only serves as a template for other models to inherit.

A child model inheriting an abstract parent model is called abstract inheritance. The parent model does not generate tables and pages; the child model inherits fields and functions from the parent model and has its own CRUD pages.

#### Parent Model Definition

The following is the definition code for the parent model, marked as an abstract model using the `@Model.Advanced(type = ModelTypeEnum.ABSTRACT)` annotation:

```java
@Model.Advanced(type = ModelTypeEnum.ABSTRACT)
@Model.model(PetCommonItem.MODEL_MODEL)
@Model(displayName = "Abstract Product", summary = "Abstract Product")
public class PetCommonItem extends IdModel {

    public static final String MODEL_MODEL = "pet.CommonItem";

    // Field configurations omitted here
}
```

#### Child Model Definition

The child model inherits from the parent model using the `extends` keyword, as shown in the example code:

```java
@Model.model(PetItem.MODEL_MODEL)
@Model(displayName = "Pet Product", summary = "Pet Product")
public class PetItem extends PetCommonItem {

    public static final String MODEL_MODEL = "pet.Item";

    // Field configurations omitted here
}
```

The above code demonstrates the implementation of abstract inheritance, which avoids repeating the same fields and functions in multiple child models, improving code reusability.

### 2. Extended Inheritance (EXTENDS)

The child model shares the same data table with the parent model. The child model inherits fields and functions from the parent model. Extended inheritance is the default method for storing inheritance relationships between models.

+ **Application Scenario**: Extended inheritance is a practical model inheritance approach where the parent and child models share the same data table for data storage but have independent CRUD operation pages.
+ **Characteristics**:
  - Parent and child models share the same data table with consistent table names but different model codes.
  - The child model can override the parent model's model manager, data sorting rules, and functions, extending the original model into a new one.

#### Parent Model Definition

The following is the definition code for the parent model `PetItem`:

```java
@Model.model(PetItem.MODEL_MODEL)
@Model(displayName = "Pet Product", summary = "Pet Product")
public class PetItem extends PetCommonItem {
    private static final long serialVersionUID = -8807269787958617447L;
    public static final String MODEL_MODEL = "pet.PetItem";
    // Field configurations omitted here
}
```

#### Child Model Definition

Below is the definition code for the child model `PetDogItem`, which inherits from the parent model `PetItem`:

```java
@Model.model(PetDogItem.MODEL_MODEL)
@Model(displayName = "Dog Product", summary = "Dog Product")
public class PetDogItem extends PetItem {
    private static final long serialVersionUID = 5471421982501585732L;
    public static final String MODEL_MODEL = "pet.PetDogItem";
    // Field configurations omitted here
}
```

Through the definitions of the parent and child models above, we can see that in extended inheritance, the child model can inherit the attributes and methods of the parent model. Sharing the same table effectively reduces the number of database tables, while independent operation pages meet different business interaction needs.

### 3. Multi-table Inheritance (MULTI_TABLE)

Multi-table inheritance means that in the model inheritance hierarchy, the parent and child models generate independent data tables and have their respective CRUD operation pages, with the inheritance relationship between parent and child models achieved through specific configurations.

#### Parent Model Definition

The parent model needs to be marked with the `@Model.MultiTable` annotation, as shown in the example:

```java
@Model.MultiTable
@Model.model(Context.MODEL_MODEL)
@Model(displayName = "Context", summary = "Context")
public class Context extends IdModel {
    public static final String MODEL_MODEL = "pet.Context";
    // Field configurations omitted here
}
```

**Configuration Description**: The parent model can specify the field used to identify the child class type through the `Model.MultiTable#typeField` attribute. If not configured, the system automatically generates a field named `type` to identify the child class type.

#### Child Model Definition

The child model needs to use the `@Model.MultiTableInherited` annotation and inherit from the parent model, as shown in the example code:

```java
@Model.MultiTableInherited
@Model.model(SubContext.MODEL_MODEL)
@Model(displayName = "Sub-context", summary = "Sub-context")
public class SubContext extends Context {
    public static final String MODEL_MODEL = "pet.SubContext";
    // Field configurations omitted here
}
```

**Configuration Description**: The child model can specify its own sub-class type through the `Model.MultiTableInherited#type` attribute, which is stored in the parent model's data table. If this attribute is not set, the system uses the child model's code as the sub-class type identifier by default.

### 4. Proxy Inheritance (PROXY)

Proxy inheritance refers to a special inheritance method where a proxy child model inherits from a parent model. In this mode, the proxy child model does not generate a separate data table but has independent CRUD pages. These pages automatically supplement the proxy child model's new transport fields based on the parent model's pages.

#### Parent Model Definition

The parent model can be an ordinary model storing data or another proxy model. Here is an example of an ordinary storage model:

```java
@Model.model(PetItem.MODEL_MODEL)
@Model(displayName = "Pet Product", summary = "Pet Product")
public class PetItem extends PetCommonItem {
    public static final String MODEL_MODEL = "pet.Item";
    // Field configurations omitted here
}
```

#### Child Model Definition

Use the `@Model.Advanced(type = ModelTypeEnum.PROXY)` annotation to declare the child model as a proxy model, as shown in the example:

```java
@Model.model(PetItemProxy.MODEL_MODEL)
@Model.Advanced(type = ModelTypeEnum.PROXY)
@Model(displayName = "Pet Product Proxy Model", summary = "Pet Product Proxy Model")
public class PetItemProxy extends PetItem {
    public static final String MODEL_MODEL = "pet.PetItemProxy";
    // New transport field
    @Field(displayName = "Extended Field")
    private String extend;
}
```

**Key Description**: The newly added `extend` field in the proxy model is a **transport field** used only for data transfer and page display, and **does not generate a corresponding column in the database table**. This means it only affects front-end page interaction without changing the underlying data storage structure, facilitating quick functional and display extensions without modifying the parent model.

### Transport (Transient) Inheritance (TRANSIENT)

Transport (transient) inheritance is a special model inheritance method where a child model inherits from a transport parent model. In this inheritance relationship, the model does not generate an independent data table but has its own CRUD pages, and the list page does not have back-end pagination functionality.

+ **Application Scenario**: Mainly used to solve the problem of using existing models for data transmission.
+ **Characteristics**: Uses the parent model as a transport model and can add transport fields.

#### Parent Model Definition

The parent model needs to be defined as a transport model by `extends TransientModel`, as shown in the example:

```java
@Model.model(PetItemRemark.MODEL_MODEL)
@Model(displayName = "Pet Product Remarks", summary = "Pet Product Remarks")
public class PetItemRemark extends TransientModel {
    public static final String MODEL_MODEL = "pet.PetItemRemark";
    // Field configurations omitted here
}
```

#### Child Model Definition

The child model inherits from the parent model using the `extends` keyword, as shown in the example code:

```java
@Model.model(PetItemDetail.MODEL_MODEL)
@Model(displayName = "Pet Product Detailed Description", summary = "Pet Product Detailed Description")
public class PetItemDetail extends PetItemRemark {
    public static final String MODEL_MODEL = "pet.PetItemDetail";
    // Field configurations omitted here
}
```

**Key Description**: A child model inheriting a transport model is also a transport model. This approach is suitable for scenarios where data needs to be temporarily processed and transmitted in memory, avoiding unnecessary data persistence operations and improving data processing efficiency.

# V. Common ORM Methods

When using the ORM framework in Oinone, commonly used methods include basic CRUD operations, association queries, transaction processing, etc.

## (一) Basic CRUD

### 1. create

+ **Method Signature**: `<T extends AbstractModel> T create()`
+ **Source Class**: AbstractModel
+ **Function Description**: Creates a new data record and returns the created model instance.
+ **Generic Parameter**: `<T>` - Model type, must be a subclass of `AbstractModel`.
+ **Return Value**: Created model instance.
+ **Example Code**:

```java
// Assume User class inherits from AbstractModel
User user = new User();
user.setName("John");
user.setAge(25);
User createdUser = user.create();
System.out.println("Created user ID: " + createdUser.getId());
```

### 2. createOrUpdate

+ **Method Signature**: `Integer createOrUpdate()`
+ **Source Class**: AbstractModel
+ **Function Description**: Creates or updates a data record. If the model has no primary key and no unique index field, or the primary key/unique index field data is empty, it performs an insert operation; otherwise, it performs an update operation. Returns the number of affected rows.
+ **Return Value**: Number of affected rows.
+ **Example Code**:

```java
User user = new User();
user.setName("Charlie");
user.setAge(30);
int rows = user.createOrUpdate();
System.out.println("Rows affected: " + rows);
```

### 3. createOrUpdateWithResult

+ **Method Signature**: `<T extends AbstractModel> Result<T> createOrUpdateWithResult()`
+ **Source Class**: AbstractModel
+ **Function Description**: Creates or updates a data record and returns a `Result` object containing the operation result.
+ **Generic Parameter**: `<T>` - Model type, must be a subclass of `AbstractModel`.
+ **Return Value**: `Result` object containing the operation result.
+ **Example Code**:

```java
User user = new User();
user.setName("David");
user.setAge(35);
Result<User> result = user.createOrUpdateWithResult();
if (result.isSuccess()) {
    System.out.println("Operation succeeded. Created/Updated user ID: " + result.getData().getId());
} else {
    System.out.println("Operation failed. Error message: " + result.getErrorMessage());
}
```

### 4. updateByPk

+ **Method Signature**: `Integer updateByPk()`
+ **Source Class**: AbstractModel
+ **Function Description**: Updates a data record by primary key; the model must contain the primary key. Returns the number of affected rows.
+ **Return Value**: Number of affected rows.
+ **Example Code**:

```java
User user = new User();
user.setId(1L);
user.setName("Updated John");
int rows = user.updateByPk();
System.out.println("Rows affected: " + rows);
```

### 5. updateByUnique

+ **Method Signature**: `Integer updateByUnique()`
+ **Source Class**: AbstractModel
+ **Function Description**: Updates a data record by primary key or unique index; the model must contain the primary key or at least one unique index. Returns the number of affected rows.
+ **Return Value**: Number of affected rows.
+ **Example Code**:

```java
User user = new User();
user.setUniqueField("unique_value");
user.setName("Updated User");
int rows = user.updateByUnique();
System.out.println("Rows affected: " + rows);
```

### 6. updateByEntity

+ **Method Signature**: `<T extends AbstractModel> Integer updateByEntity(T entity, T query)`
+ **Source Class**: AbstractModel
+ **Function Description**: Updates data records based on entity conditions; `entity` is the entity to update, and `query` is the update condition. Returns the number of affected rows.
+ **Generic Parameter**: `<T>` - Model type, must be a subclass of `AbstractModel`.
+ **Parameters**:
  - `entity` - Entity to update.
  - `query` - Update condition.
+ **Return Value**: Number of affected rows.
+ **Example Code**:

```java
User updateEntity = new User();
updateEntity.setName("New Name");

User queryEntity = new User();
queryEntity.setAge(25);

int rows = user.updateByEntity(updateEntity, queryEntity);
System.out.println("Rows affected: " + rows);
```

### 7. updateByWrapper

+ **Method Signature**: `<T extends AbstractModel> Integer updateByWrapper(T entity, IWrapper<`T`> updateWrapper)`
+ **Source Class**: AbstractModel
+ **Function Description**: Updates data records based on a condition wrapper; `entity` is the entity to update, and `updateWrapper` is the update condition wrapper. Returns the number of affected rows.
+ **Generic Parameter**: `<T>` - Model type, must be a subclass of `AbstractModel`.
+ **Parameters**:
  - `entity` - Entity to update.
  - `updateWrapper` - Update condition wrapper.
+ **Return Value**: Number of affected rows.
+ **Example Code**:

```java
User updateEntity = new User();
updateEntity.setName("Updated Name");

IWrapper<User> updateWrapper = new QueryWrapper<User>().from(User.MODEL_MODEL)
   .eq("age", 25);

int rows = user.updateByWrapper(updateEntity, updateWrapper);
System.out.println("Rows affected: " + rows);
```

### 8. deleteByPk

+ **Method Signature**: `Boolean deleteByPk()`
+ **Source Class**: AbstractModel
+ **Function Description**: Deletes a single record by primary key; the model must contain the primary key. Returns the deletion result.
+ **Return Value**: `true` if deletion is successful, otherwise `false`.
+ **Example Code**:

```java
User user = new User();
user.setId(1L);
boolean deleted = user.deleteByPk();
System.out.println("Delete success: " + deleted);
```

### 9. deleteByUnique

+ **Method Signature**: `Boolean deleteByUnique()`
+ **Source Class**: AbstractModel
+ **Function Description**: Deletes a single record by primary key or unique index; the model must contain the primary key or at least one unique index. Returns the deletion result.
+ **Return Value**: `true` if deletion is successful, otherwise `false`.
+ **Example Code**:

```java
User user = new User();
user.setUniqueField("unique_value");
boolean deleted = user.deleteByUnique();
System.out.println("Delete success: " + deleted);
```

### 10. deleteByEntity

+ **Method Signature**: `Integer deleteByEntity()`
+ **Source Class**: AbstractModel
+ **Function Description**: Deletes records based on entity conditions; returns the number of deleted rows.
+ **Return Value**: Number of deleted rows.
+ **Example Code**:

```java
User queryEntity = new User();
queryEntity.setAge(25);
int rows = queryEntity.deleteByEntity();
System.out.println("Rows deleted: " + rows);
```

### 11. deleteByWrapper

+ **Method Signature**: `<T extends AbstractModel> Integer deleteByWrapper(IWrapper<`T`> queryWrapper)`
+ **Source Class**: AbstractModel
+ **Function Description**: Deletes records based on a condition wrapper; returns the number of deleted rows.
+ **Generic Parameter**: `<T>` - Model type, must be a subclass of `AbstractModel`.
+ **Parameter**: `queryWrapper` - Deletion condition wrapper.
+ **Return Value**: Number of deleted rows.
+ **Example Code**:

```java
IWrapper<User> queryWrapper = new QueryWrapper<User>().from(User.MODEL_MODEL)
   .eq("age", 25);
int rows = user.deleteByWrapper(queryWrapper);
System.out.println("Rows deleted: " + rows);
```

## (二) Conditional Query and Pagination

### 1. queryByPk

+ **Method Signature**: `<T extends AbstractModel> T queryByPk()`
+ **Source Class**: AbstractModel
+ **Function Description**: Queries a single record by primary key; the model must contain the primary key. Returns the queried model instance.
+ **Generic Parameter**: `<T>` - Model type, must be a subclass of `AbstractModel`.
+ **Return Value**: Queried model instance, `null` if not found.
+ **Example Code**:

```java
User user = new User();
user.setId(1L);
User queriedUser = user.queryByPk();
if (queriedUser != null) {
    System.out.println("Queried user name: " + queriedUser.getName());
} else {
    System.out.println("User not found.");
}
```

### 2. queryOne

+ **Method Signature**: `<T extends AbstractModel> T queryOne()`
+ **Source Class**: AbstractModel
+ **Function Description**: Queries a single record by primary key or unique index; the model must contain the primary key or unique index, and an exception is thrown if multiple records are found. Returns the queried model instance.
+ **Generic Parameter**: `<T>` - Model type, must be a subclass of `AbstractModel`.
+ **Return Value**: Queried model instance, `null` if not found.
+ **Example Code**:

```java
User user = new User();
user.setUniqueField("unique_value");
User queriedUser = user.queryOne();
if (queriedUser != null) {
    System.out.println("Queried user name: " + queriedUser.getName());
} else {
    System.out.println("User not found.");
}
```

### 3. queryOneByWrapper

+ **Method Signature**: `<T extends AbstractModel> T queryOneByWrapper(IWrapper<`T`> queryWrapper)`
+ **Source Class**: AbstractModel
+ **Function Description**: Queries a single record based on a condition wrapper; an exception is thrown if multiple records are found. Returns the queried model instance.
+ **Generic Parameter**: `<T>` - Model type, must be a subclass of `AbstractModel`.
+ **Parameter**: `queryWrapper` - Query condition wrapper.
+ **Return Value**: Queried model instance, `null` if not found.
+ **Example Code**:

```java
IWrapper<User> queryWrapper = new QueryWrapper<User>().from(User.MODEL_MODEL)
   .eq("age", 25);
User queriedUser = user.queryOneByWrapper(queryWrapper);
if (queriedUser != null) {
    System.out.println("Queried user name: " + queriedUser.getName());
} else {
    System.out.println("User not found.");
}
```

### 4. queryList

+ **Method Signature**: `<T extends AbstractModel> List<T> queryList()`
+ **Source Class**: AbstractModel
+ **Function Description**: Queries a data list based on entity conditions; returns a list of records that meet the conditions.
+ **Generic Parameter**: `<T>` - Model type, must be a subclass of `AbstractModel`.
+ **Return Value**: List of records that meet the conditions.
+ **Example Code**:

```java
User queryEntity = new User();
queryEntity.setAge(25);
List<User> userList = queryEntity.queryList();
for (User user : userList) {
    System.out.println("User name: " + user.getName());
}
```

### 5. queryList(int batchSize)

+ **Method Signature**: `<T extends AbstractModel> List<T> queryList(int batchSize)`
+ **Source Class**: AbstractModel
+ **Function Description**: Queries a data list based on entity conditions, and can set `batchSize` for batch querying. Returns a list of records that meet the conditions.
+ **Generic Parameter**: `<T>` - Model type, must be a subclass of `AbstractModel`.
+ **Parameter**: `batchSize` - Number of records per batch query.
+ **Return Value**: List of records that meet the conditions.
+ **Example Code**:

```java
User queryEntity = new User();
queryEntity.setAge(25);
List<User> userList = queryEntity.queryList(100);
for (User user : userList) {
    System.out.println("User name: " + user.getName());
}
```

### 6. queryList(IWrapper<`T`> queryWrapper)

+ **Method Signature**: `<T extends AbstractModel> List<T> queryList(IWrapper<`T`> queryWrapper)`
+ **Source Class**: AbstractModel
+ **Function Description**: Queries a data list based on a condition wrapper; returns a list of records that meet the conditions.
+ **Generic Parameter**: `<T>` - Model type, must be a subclass of `AbstractModel`.
+ **Parameter**: `queryWrapper` - Query condition wrapper.
+ **Return Value**: List of records that meet the conditions.
+ **Example Code**:

```java
IWrapper<User> queryWrapper = new QueryWrapper<User>().from(User.MODEL_MODEL)
   .eq("age", 25);
List<User> userList = user.queryList(queryWrapper);
for (User user : userList) {
    System.out.println("User name: " + user.getName());
}
```

### 7. queryList(Pagination<`T`> page, T query)

+ **Method Signature**: `<T extends AbstractModel> List<T> queryList(Pagination<`T`> page, T query)`
+ **Source Class**: AbstractModel
+ **Function Description**: Queries a data list based on pagination and entity conditions; returns the query pagination result.
+ **Generic Parameter**: `<T>` - Model type, must be a subclass of `AbstractModel`.
+ **Parameters**:
  - `page` - Pagination object.
  - `query` - Query entity.
+ **Return Value**: Query pagination result.
+ **Example Code**:

```java
Pagination<User> page = new Pagination<>(1, 10);
User queryEntity = new User();
queryEntity.setAge(25);
List<User> userList = user.queryList(page, queryEntity);
for (User user : userList) {
    System.out.println("User name: " + user.getName());
}
```

### 8. queryListByWrapper

+ **Method Signature**: `<T extends AbstractModel> List<T> queryListByWrapper(Pagination<`T`> page, IWrapper<`T`> queryWrapper)`
+ **Source Class**: AbstractModel
+ **Function Description**: Queries a data list based on pagination conditions; returns the query pagination result.
+ **Generic Parameter**: `<T>` - Model type, must be a subclass of `AbstractModel`.
+ **Parameters**:
  - `page` - Pagination object.
  - `queryWrapper` - Query condition wrapper.
+ **Return Value**: Query pagination result.
+ **Example Code**:

```java
Pagination<User> page = new Pagination<>(1, 10);
IWrapper<User> queryWrapper = new QueryWrapper<User>().from(User.MODEL_MODEL)
   .eq("age", 25);
List<User> userList = user.queryListByWrapper(page, queryWrapper);
for (User user : userList) {
    System.out.println("User name: " + user.getName());
}
```

### 9. queryPage

+ **Method Signature**: `<T extends AbstractModel> Pagination<`T`> queryPage(Pagination<`T`> page, IWrapper<`T`> queryWrapper)`
+ **Source Class**: AbstractModel
+ **Function Description**: Queries a data list based on conditions and returns a pagination object containing total records, total pages, etc.
+ **Generic Parameter**: `<T>` - Model type, must be a subclass of `AbstractModel`.
+ **Parameters**:
  - `page` - Pagination object.
  - `queryWrapper` - Query condition wrapper.
+ **Return Value**: `Pagination` object containing pagination information.
+ **Example Code**:

```java
Pagination<User> page = new Pagination<>(1, 10);

IWrapper<User> queryWrapper = new QueryWrapper<User>().from(User.MODEL_MODEL)
   .eq("age", 25);
Pagination<User> result = user.queryPage(page, queryWrapper);
System.out.println("Total records: " + result.getTotal());
System.out.println("Total pages: " + result.getPages());
for (User user : result.getRecords()) {
    System.out.println("User name: " + user.getName());
}
```

### 10. count

+ **Method Signature**: `Long count()`
+ **Source Class**: AbstractModel
+ **Function Description**: Queries the number of data records based on entity conditions; returns the number of records that meet the query conditions.
+ **Return Value**: Number of records that meet the query conditions.
+ **Example Code**:

```java
User queryEntity = new User();
queryEntity.setAge(25);
long count = queryEntity.count();
System.out.println("Record count: " + count);
```

### 11. count(IWrapper<`T`> queryWrapper)

+ **Method Signature**: `<T extends AbstractModel> Long count(IWrapper<`T`> queryWrapper)`
+ **Source Class**: AbstractModel
+ **Function Description**: Queries the number of data records based on a condition wrapper; returns the number of records that meet the query conditions.
+ **Generic Parameter**: `<T>` - Model type, must be a subclass of `AbstractModel`.
+ **Parameter**: `queryWrapper` - Query condition wrapper.
+ **Return Value**: Number of records that meet the query conditions.
+ **Example Code**:

```java
IWrapper<User> queryWrapper = new QueryWrapper<User>().from(User.MODEL_MODEL)
   .eq("age", 25);
long count = user.count(queryWrapper);
System.out.println("Record count: " + count);
```

## (III) Field-Level Association Operations  

### 1. fieldQuery: Specify Fields via Lambda Expression  

+ **Method Signature**: `<T extends AbstractModel> T fieldQuery(Getter<T, ?> getter)`  
+ **Source Class**: AbstractModel  
+ **Function Description**: Query association fields by specifying the association field via a `Getter` method. Returns the model data with the queried field values.  
+ **Generic Parameter**: `<T>` - The model type, must be a subclass of `AbstractModel`.  
+ **Parameter**: `getter` - The `Getter` method for the association field, e.g., `Model::getField`.  
+ **Return Value**: Model data containing the queried field values.  
+ **Sample Code**:  

```java
User user = new User();
user.setId(1L);
User queriedUser = user.queryByPk();
queriedUser.fieldQuery(User::getRelationField);
if (queriedUser.getRelationField() != null) {
    System.out.println("Relation field value: " + queriedUser.getRelationField());
}
```  

### 2. fieldQuery  

+ **Method Signature**: `<T extends AbstractModel> T fieldQuery(String fieldName)`  
+ **Source Class**: AbstractModel  
+ **Function Description**: Query association fields by specifying the association field via its name. Returns the model data with the queried field values.  
+ **Generic Parameter**: `<T>` - The model type, must be a subclass of `AbstractModel`.  
+ **Parameter**: `fieldName` - The Java field name.  
+ **Return Value**: Model data containing the queried field values.  
+ **Sample Code**:  

```java
User user = new User();
user.setId(1L);
User queriedUser = user.queryByPk();
queriedUser.fieldQuery("relationField");
if (queriedUser.getRelationField() != null) {
    System.out.println("Relation field value: " + queriedUser.getRelationField());
}
```  

### 3. fieldSave: Specify Fields via Lambda Expression  

+ **Method Signature**: `<T extends AbstractModel> T fieldSave(Getter<T, ?> getter)`  
+ **Source Class**: AbstractModel  
+ **Function Description**: Add or update association fields (incrementally) based on the data submission strategy of the instruction system. Returns the model data with updated field values.  
+ **Generic Parameter**: `<T>` - The model type, must be a subclass of `AbstractModel`.  
+ **Parameter**: `getter` - The `Getter` method for the association field, e.g., `Model::getField`.  
+ **Return Value**: Model data containing the updated field values.  
+ **Sample Code**:  

```java
User user = new User();
user.setName("John");
user.setAge(25);
List<RelationObject> o2mObjects = new ArrayList<RelationObject>();
RelationObject relationObject = new RelationObject()
o2mObjects.add(relationObject);
user.setO2MField(o2mObjects);
// Save the one-side record first
user.create();
// Then save the one2many/many2many relation fields
user.fieldSave(User::getO2MField);
```  

### 4. fieldSave  

+ **Method Signature**: `<T extends AbstractModel> T fieldSave(String fieldName)`  
+ **Source Class**: AbstractModel  
+ **Function Description**: Add or update association fields (incrementally) by specifying the association field via its name. Returns the model data with updated field values.  
+ **Generic Parameter**: `<T>` - The model type, must be a subclass of `AbstractModel`.  
+ **Parameter**: `fieldName` - The Java field name.  
+ **Return Value**: Model data containing the updated field values.  
+ **Sample Code**:  

```java
User user = new User();
user.setName("John");
user.setAge(25);
List<RelationObject> o2mObjects = new ArrayList<RelationObject>();
RelationObject relationObject = new RelationObject()
o2mObjects.add(relationObject);
user.setO2MField(o2mObjects);
// Save the one-side record first
user.create();
// Then save the one2many/many2many relation fields
user.fieldSave("o2mField");
```  

### 5. fieldSaveOnCascade: Specify Fields via Lambda Expression  

+ **Method Signature**: `<T extends AbstractModel> T fieldSaveOnCascade(Getter<T, ?> getter)`  
+ **Source Class**: AbstractModel  
+ **Function Description**: Add or update association fields (fully) and handle the relationship data of old records according to the field cascade strategy (e.g., delete, SET_NULL) by specifying the association field via a `Getter` method. Returns the model data with updated field values.  
+ **Generic Parameter**: `<T>` - The model type, must be a subclass of `AbstractModel`.  
+ **Parameter**: `getter` - The `Getter` method for the association field, e.g., `Model::getField`.  
+ **Return Value**: Model data containing the updated field values.  
+ **Sample Code**:  

```java
User user = new User();
user.setId(1L);
User queriedUser = user.queryByPk();
List<RelationObject> o2mObjects = new ArrayList<RelationObject>();
RelationObject relationObject = new RelationObject()
o2mObjects.add(relationObject);
queriedUser.setO2MField(o2mObjects);
// When using fieldSave, you need to handle the relation delta manually, e.g., delete associations with old records
queriedUser.fieldSaveOnCascade(User::getO2MField);
```  

### 6. fieldSaveOnCascade  

+ **Method Signature**: `<T extends AbstractModel> T fieldSaveOnCascade(String fieldName)`  
+ **Source Class**: AbstractModel  
+ **Function Description**: Add or update association fields (fully) and handle the relationship data of old records according to the field cascade strategy (e.g., delete, SET_NULL) by specifying the association field via its name. Returns the model data with updated field values.  
+ **Generic Parameter**: `<T>` - The model type, must be a subclass of `AbstractModel`.  
+ **Parameter**: `fieldName` - The Java field name.  
+ **Return Value**: Model data containing the updated field values.  
+ **Sample Code**:  

```java
User user = new User();
user.setId(1L);
User queriedUser = user.queryByPk();
List<RelationObject> o2mObjects = new ArrayList<RelationObject>();
RelationObject relationObject = new RelationObject()
o2mObjects.add(relationObject);
queriedUser.setO2MField(o2mObjects);
// When using fieldSave, you need to handle the relation delta manually, e.g., delete associations with old records
queriedUser.fieldSaveOnCascade("o2MField");
```  

### 7. relationDelete: Specify Fields via Lambda Expression  

+ **Method Signature**: `<T extends AbstractModel> T relationDelete(Getter<T, ?> getter)`  
+ **Source Class**: AbstractModel  
+ **Function Description**: Delete association (incrementally) by specifying the association field via a `Getter` method. Returns the model data.  
+ **Generic Parameter**: `<T>` - The model type, must be a subclass of `AbstractModel`.  
+ **Parameter**: `getter` - The `Getter` method for the association field, e.g., `Model::getField`.  
+ **Return Value**: Model data.  
+ **Sample Code**:  

```java
User user = new User();
user.setId(1L);
User queriedUser = user.queryByPk();
queriedUser.fieldQuery(User::getO2MField);
queriedUser.relationDelete(User::getO2MField);
```  

### 8. relationDelete  

+ **Method Signature**: `<T extends AbstractModel> T relationDelete(String fieldName)`  
+ **Source Class**: AbstractModel  
+ **Function Description**: Delete association (incrementally) by specifying the association field via its name. Returns the model data.  
+ **Generic Parameter**: `<T>` - The model type, must be a subclass of `AbstractModel`.  
+ **Parameter**: `fieldName` - The Java field name.  
+ **Return Value**: Model data.  
+ **Sample Code**:  

```java
User user = new User();
user.setId(1L);
User queriedUser = user.queryByPk();
queriedUser.fieldQuery(User::getO2MField);
queriedUser.relationDelete("o2MField");
```  

### 9. listFieldQuery: Specify Fields via Lambda Expression  

+ **Method Signature**: `<T extends AbstractModel> List<T> listFieldQuery(List<T> dataList, Getter<T, ?> getter)`  
+ **Source Class**: AbstractModel  
+ **Function Description**: Batch query association fields by specifying the association field via a `Getter` method. Returns a list of model data with the queried field values.  
+ **Generic Parameter**: `<T>` - The model type, must be a subclass of `AbstractModel`.  
+ **Parameters**:  
  - `dataList` - The current model data list.  
  - `getter` - The `Getter` method for the association field, e.g., `Model::getField`.  
+ **Return Value**: A list of model data containing the queried field values.  
+ **Sample Code**:  

```java
List<User> userList = new ArrayList<>();
User user1 = new User();
user1.setId(1L);
User queriedUser1 = user1.queryByPk();
userList.add(queriedUser1);

User user2 = new User();
user2.setId(2L);
User queriedUser2 = user2.queryByPk();
userList.add(queriedUser2);

List<User> queriedUsers = new User().listFieldQuery(userList, User::getRelationField);
for (User queriedUser : queriedUsers) {
    System.out.println("Relation field value for user " + queriedUser.getId() + ": " + queriedUser.getRelationField());
}
```  

### 10. listFieldQuery  

+ **Method Signature**: `<T extends AbstractModel> List<T> listFieldQuery(List<T> dataList, String fieldName)`  
+ **Source Class**: AbstractModel  
+ **Function Description**: Batch query association fields by specifying the association field via its name. Returns a list of model data with the queried field values.  
+ **Generic Parameter**: `<T>` - The model type, must be a subclass of `AbstractModel`.  
+ **Parameters**:  
  - `dataList` - The current model data list.  
  - `fieldName` - The Java field name.  
+ **Return Value**: A list of model data containing the queried field values.  
+ **Sample Code**:  

```java
List<User> userList = new ArrayList<>();
User user1 = new User();
user1.setId(1L);
User queriedUser1 = user1.queryByPk();
userList.add(queriedUser1);

User user2 = new User();
user2.setId(2L);
User queriedUser2 = user2.queryByPk();
userList.add(queriedUser2);

List<User> queriedUsers = new User().listFieldQuery(userList,"relationField");
for (User queriedUser : queriedUsers) {
    System.out.println("Relation field value for user " + queriedUser.getId() + ": " + queriedUser.getRelationField());
}
```  

### 11. listFieldSave: Specify Fields via Lambda Expression  

+ **Method Signature**: `<T extends AbstractModel> List<T> listFieldSave(List<T> dataList, Getter<T, ?> getter)`  
+ **Source Class**: AbstractModel  
+ **Function Description**: Batch add or update association field records by specifying the association field via a `Getter` method. Returns a list of model data with updated field values.  
+ **Generic Parameter**: `<T>` - The model type, must be a subclass of `AbstractModel`.  
+ **Parameters**:  
  - `dataList` - The current model data list.  
  - `getter` - The `Getter` method for the association field, e.g., `Model::getField`.  
+ **Return Value**: A list of model data containing the updated field values.  
+ **Sample Code**:  

```java
User user = new User();
user.setName("John");
user.setAge(25);
List<RelationObject> o2mObjects = new ArrayList<RelationObject>();
RelationObject relationObject = new RelationObject()
o2mObjects.add(relationObject);
user.setO2MField(o2mObjects);
// Save the one-side record first
user.create();
// Then save the one2many/many2many relation fields
List<User> userList = new ArrayList<>();
userList.add(user);
List<User> updatedUsers = new User().listFieldSave(userList, User::getO2MField);
```  

### 12. listFieldSave  

+ **Method Signature**: `<T extends AbstractModel> List<T> listFieldSave(List<T> dataList, String fieldName)`  
+ **Source Class**: AbstractModel  
+ **Function Description**: Batch add or update association field records by specifying the association field via its name. Returns a list of model data with updated field values.  
+ **Generic Parameter**: `<T>` - The model type, must be a subclass of `AbstractModel`.  
+ **Parameters**:  
  - `dataList` - The current model data list.  
  - `fieldName` - The Java field name.  
+ **Return Value**: A list of model data containing the updated field values.  
+ **Sample Code**:  

```java
User user = new User();
user.setName("John");
user.setAge(25);
List<RelationObject> o2mObjects = new ArrayList<RelationObject>();
RelationObject relationObject = new RelationObject()
o2mObjects.add(relationObject);
user.setO2MField(o2mObjects);
// Save the one-side record first
user.create();
// Then save the one2many/many2many relation fields
List<User> userList = new ArrayList<>();
userList.add(user);
List<User> updatedUsers = new User().listFieldSave(userList, "o2MField");
```  

### 13. listFieldSaveOnCascade: Specify Fields via Lambda Expression  

+ **Method Signature**: `<T extends AbstractModel> List<T> fieldSaveOnCascade(List<T> dataList, Getter<T, ?> getter)`  
+ **Source Class**: AbstractModel  
+ **Function Description**: Batch add or update association fields (fully) and handle the relationship data of old records according to the field cascade strategy (e.g., delete, SET_NULL) by specifying the association field via a `Getter` method. Returns a list of model data with updated field values.  
+ **Generic Parameter**: `<T>` - The model type, must be a subclass of `AbstractModel`.  
+ **Parameters**:  
  - `dataList` - The current model data list.  
  - `getter` - The `Getter` method for the association field, e.g., `Model::getField`.  
+ **Return Value**: A list of model data containing the updated field values.  
+ **Sample Code**:  

```java
User user = new User();
user.setId(1L);
User queriedUser = user.queryByPk();
List<RelationObject> o2mObjects = new ArrayList<RelationObject>();
RelationObject relationObject = new RelationObject()
o2mObjects.add(relationObject);
queriedUser.setO2MField(o2mObjects);
List<User> userList = new ArrayList<>();
userList.add(queriedUser);
// When using listFieldSave, you need to handle the relation delta manually, e.g., delete associations with old records
new User().listFieldSaveOnCascade(userList,User::getO2MField);
```  

### 14. listFieldSaveOnCascade  

+ **Method Signature**: `<T extends AbstractModel> List<T> fieldSaveOnCascade(List<T> dataList, String fieldName)`  
+ **Source Class**: AbstractModel  
+ **Function Description**: Batch add or update association fields (fully) and handle the relationship data of old records according to the field cascade strategy (e.g., delete, SET_NULL) by specifying the association field via its name. Returns a list of model data with updated field values.  
+ **Generic Parameter**: `<T>` - The model type, must be a subclass of `AbstractModel`.  
+ **Parameters**:  
  - `dataList` - The current model data list.  
  - `fieldName` - The Java field name.  
+ **Return Value**: A list of model data containing the updated field values.  
+ **Sample Code**:  

```java
User user = new User();
user.setId(1L);
User queriedUser = user.queryByPk();
List<RelationObject> o2mObjects = new ArrayList<RelationObject>();
RelationObject relationObject = new RelationObject()
o2mObjects.add(relationObject);
queriedUser.setO2MField(o2mObjects);
List<User> userList = new ArrayList<>();
userList.add(queriedUser);
// When using listFieldSave, you need to handle the relation delta manually, e.g., delete associations with old records
new User().listFieldSaveOnCascade(userList,"o2MField");
```  

## (IV) Batch Operations  

### 1. createBatch  

+ **Method Signature**: `<T extends AbstractModel> List<T> createBatch(List<T> dataList)`  
+ **Source Class**: AbstractModel  
+ **Function Description**: Batch create data records and return the list of created models.  
+ **Generic Parameter**: `<T>` - The model type, must be a subclass of `AbstractModel`.  
+ **Parameter**: `dataList` - The list of data to be created.  
+ **Return Value**: The list of created models.  
+ **Sample Code**:  

```java
List<User> userList = new ArrayList<>();
User user1 = new User();
user1.setName("Alice");
user1.setAge(22);
userList.add(user1);

User user2 = new User();
user2.setName("Bob");
user2.setAge(28);
userList.add(user2);

List<User> createdUsers = user.createBatch(userList);
System.out.println("Created " + createdUsers.size() + " users.");
```  

### 2. createOrUpdateBatch  

+ **Method Signature**: `<T extends AbstractModel> Integer createOrUpdateBatch(List<T> dataList)`  
+ **Source Class**: AbstractModel  
+ **Function Description**: Batch create or update data records and return the number of affected rows.  
+ **Generic Parameter**: `<T>` - The model type, must be a subclass of `AbstractModel`.  
+ **Parameter**: `dataList` - The list of data to be operated on.  
+ **Return Value**: The number of affected rows.  
+ **Sample Code**:  

```java
List<User> userList = new ArrayList<>();
User user1 = new User();
user1.setName("Eve");
user1.setAge(26);
userList.add(user1);

User user2 = new User();
user2.setName("Frank");
user2.setAge(32);
userList.add(user2);

int rows = user.createOrUpdateBatch(userList);
System.out.println("Rows affected: " + rows);
```  

### 3. createOrUpdateBatchWithResult  

+ **Method Signature**: `<T extends AbstractModel> Result<List<T>> createOrUpdateBatchWithResult(List<T> dataList)`  
+ **Source Class**: AbstractModel  
+ **Function Description**: Batch create or update data records and return a `Result` object containing the operation result, which includes the list of operated models.  
+ **Generic Parameter**: `<T>` - The model type, must be a subclass of `AbstractModel`.  
+ **Parameter**: `dataList` - The list of data to be operated on.  
+ **Return Value**: A `Result` object containing the operation result, including the list of operated models.  
+ **Sample Code**:  

```java
List<User> userList = new ArrayList<>();
User user1 = new User();
user1.setName("Grace");
user1.setAge(24);
userList.add(user1);

User user2 = new User();
user2.setName("Henry");
user2.setAge(31);
userList.add(user2);

Result<List<User>> result = user.createOrUpdateBatchWithResult(userList);
if (result.isSuccess()) {
    System.out.println("Operation succeeded. Created/Updated " + result.getData().size() + " users.");
} else {
    System.out.println("Operation failed. Error message: " + result.getErrorMessage());
}
```  

### 4. updateBatch  

+ **Method Signature**: `<T extends AbstractModel> Integer updateBatch(List<T> dataList)`  
+ **Source Class**: AbstractModel  
+ **Function Description**: Batch update data records. The model data must contain a primary key or at least one unique index. Returns the number of affected rows.  
+ **Generic Parameter**: `<T>` - The model type, must be a subclass of `AbstractModel`.  
+ **Parameter**: `dataList` - The list of data to be updated.  
+ **Return Value**: The number of affected rows.  
+ **Sample Code**:  

```java
List<User> userList = new ArrayList<>();
User user1 = new User();
user1.setId(1L);
user1.setName("Updated Alice");
userList.add(user1);

User user2 = new User();
user2.setId(2L);
user2.setName("Updated Bob");
userList.add(user2);

int rows = user.updateBatch(userList);
System.out.println("Rows affected: " + rows);
```  

### 5. deleteByPks  

+ **Method Signature**: `<T extends AbstractModel> Boolean deleteByPks(List<T> dataList)`  
+ **Source Class**: AbstractModel  
+ **Function Description**: Batch delete records by primary keys. The model data must contain primary keys. Returns the deletion result.  
+ **Generic Parameter**: `<T>` - The model type, must be a subclass of `AbstractModel`.  
+ **Parameter**: `dataList` - The list of data to be deleted.  
+ **Return Value**: `true` if deletion is successful, otherwise `false`.  
+ **Sample Code**:  

```java
List<User> userList = new ArrayList<>();
User user1 = new User();
user1.setId(1L);
userList.add(user1);

User user2 = new User();
user2.setId(2L);
userList.add(user2);

boolean deleted = user.deleteByPks(userList);
System.out.println("Delete success: " + deleted);
```  

### 6. deleteByUniques  

+ **Method Signature**: `<T extends AbstractModel> Boolean deleteByUniques(List<T> dataList)`  
+ **Source Class**: AbstractModel  
+ **Function Description**: Batch delete records by primary keys or unique indices. The model data must contain primary keys or at least one unique index. Returns the deletion result.  
+ **Generic Parameter**: `<T>` - The model type, must be a subclass of `AbstractModel`.  
+ **Parameter**: `dataList` - The list of data to be deleted.  
+ **Return Value**: `true` if deletion is successful, otherwise `false`.  
+ **Sample Code**:  

```java
List<User> userList = new ArrayList<>();
User user1 = new User();
user1.setUniqueField("unique_value_1");
userList.add(user1);

User user2 = new User();
user2.setUniqueField("unique_value_2");
userList.add(user2);

boolean deleted = user.deleteByUniques(userList);
System.out.println("Delete success: " + deleted);
```  

## (V) Basic Usage of QueryWrapper and LambdaQueryWrapper  

### 1. Initialization and Chaining  

```java
// Initialize QueryWrapper (specify entity type) and LambdaQueryWrapper (specify entity type)
// For those not passing a model object, remember to use .from() to pass the model code

QueryWrapper<User> wrapper1 = Pops.query(new User());
QueryWrapper<User> wrapper2 = Pops.<User>query().from(User.MODEL_MODEL);
QueryWrapper<User> wrapper3 = new QueryWrapper<User>().from(User.MODEL_MODEL);

LambdaQueryWrapper<User> lambdaWrapper1 = Pops.lambdaQuery(new User());
LambdaQueryWrapper<User> lambdaWrapper2 = Pops.<User>lambdaQuery().from(User.MODEL_MODEL);
LambdaQueryWrapper<User> lambdaWrapper3 = new LambdaQueryWrapper<User>().from(User.MODEL_MODEL);


// Build conditions chainably
wrapper1
    .eq("age", 25)             // age = 25
    .like("name", "张%")       // name LIKE '张%'
    .orderBy("createDate", false); // Sort descending by createDate
```  

### 2. Common Condition Methods  

| **Method**                                                     | **Description**                                                     | **Example**                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `eq(column, value)` | Equal to             | `.eq("status", 1)` |
| `ne(column, value)` | Not equal to           | `.ne("deleted", 0)` |
| `gt(column, value)`<br/>`ge(column, value)`<br/>`lt(column, value)`<br/>`le(column, value)` | Greater than<br/>Greater than or equal to<br/>Less than<br/>Less than or equal to | `.gt("createDate", "2023-01-01")` |
| `isNull(column)`<br/>`isNotNull(column)` | Is null<br/>Is not null | `.isNull("email")` |
| `in(column, collection)` | IN query          | `.in("id", Arrays.asList(1,2,3))` |
| `between(column, value1,value2)` | Closed interval query       | `.between(User::getCreateDate, "2023-01-01", "2023-12-31")` |
| `like(column, value)` | Fuzzy match         | `.like("email", "%@example.com")` |
| `orderBy(column, isAsc)` | Sorting             | `.orderBy("age", true)` |
| `and/or(consumer)` | Nested conditions         | `.or(sub -> sub.eq("status", 1))` |
| `groupBy(columns)` | Grouping             | `.groupBy("age","status")` |


```java
// Example: Query users aged 25 with names starting with "张"
QueryWrapper<User> wrapper = Pops.<User>query().from(User.MODEL_MODEL);
wrapper.eq("age", 25).like("name", "张%");

List<User> users = new User().queryList(wrapper);
```  

## (VI) Advanced Usage of LambdaQueryWrapper  

### 1. Initialization and Type Safety  

```java
// Initialize LambdaQueryWrapper (avoid hardcoding field names)
LambdaQueryWrapper<User> lambdaWrapper = Pops.<User>lambdaQuery().from(User.MODEL_MODEL);


// Specify fields via Lambda expressions
lambdaWrapper
    .eq(User::getAge, 25)             // Compile-time check for field existence
    .like(User::getName, "张%")
    .orderByDesc(User::getCreateDate);
```  

### 2. Complex Condition Combination  

```java
// Nested conditions: Age > 30 or (name contains "李" and status is active)
lambdaWrapper
    .gt(User::getAge, 30)
    .or(sub -> sub
        .like(User::getName, "李%")
        .eq(User::getStatus, "active")
    );
```  

### 3. Dynamic Condition Building  

```java
// Dynamically add conditions based on business logic
String searchName = "王";
Integer minAge = 20;

LambdaQueryWrapper<User> wrapper = Pops.<User>lambdaQuery().from(User.MODEL_MODEL);

if (searchName != null) {
    wrapper.like(User::getName, searchName + "%");
}
if (minAge != null) {
    wrapper.ge(User::getAge, minAge);
}

List<User> users = new User().queryList(wrapper);
```  

### 4. SQL Splicing  

```java
// apply: Use database column names, not model field names in SQL
LambdaQueryWrapper<User> wrapper = Pops.<User>lambdaQuery().from(User.MODEL_MODEL);
// wrapper.apply("date_format(dateColumn,'%Y-%m-%d') = '2008-08-08'")
wrapper.apply("date_format(create_date,'%Y-%m-%d') = {0}", LocalDate.now())

List<User> users = new User().queryList(wrapper);
```  

## (VII) Paging Query Practice  

### 1. Basic Paging  

```java
// Paging parameters: Page 2, 10 items per page
Pagination<User> page = new Pagination<>(2, 10);

// Build conditions
LambdaQueryWrapper<User> wrapper = Pops.<User>lambdaQuery().from(User.MODEL_MODEL);

wrapper.eq(User::getDepartmentId, 5);

// Execute paging query
page = new User().queryPage(page, wrapper);

// Get results
List<User> userList = page.getContent();
long total = page.getTotal();
```  

### 2. Paging + Sorting  

```java
LambdaQueryWrapper<User> wrapper = Pops.<User>lambdaQuery().from(User.MODEL_MODEL);

wrapper
    .between(User::getCreateDate, "2023-01-01", "2023-12-31")
    .orderByAsc(User::getAge)   // Sort age in ascending order
    .orderByDesc(User::getId);  // Sort ID in descending order
// Paging parameters: Page 1, 10 items per page
Pagination<User> page = new Pagination<>(1, 10);
Pagination<User> page = new User().queryPage(page, wrapper);
```  

### 3. Disable Count Query During Paging (Performance Optimization)  

```java
Pagination<User> page = new Pagination<>(1, 10);
page.setSearchCount(false); // Disable SELECT COUNT(*)
```  

### 4. Complete Example: Multi-Condition Paging Query  

```java
// 1. Build paging parameters
Pagination<User> page = new Pagination<>(1, 10);
// page.setSearchCount(true); // Default returns total records, no need to set

// 2. Build Lambda conditions
LambdaQueryWrapper<User> wrapper = Pops.<User>lambdaQuery().from(User.MODEL_MODEL);
wrapper
    .ge(User::getAge, 18)                    // Age >= 18
    .le(User::getAge, 30)                    // Age <= 30
    .in(User::getRole, Arrays.asList("admin", "editor")) // Role IN query
    .orderByAsc(User::getAge)                // Sort age in ascending order
    .orderByDesc(User::getCreateDate);       // Sort creation time in descending order

// 3. Execute paging query
page = new User().queryPage(page, wrapper);

// 4. Get results
List<User> userList = page.getContent();
long total = page.getTotal();
```  

### 5. List Query Tips  

#### BatchSizeHintApi  

When handling large data queries, reasonably setting the query batch size can optimize performance, reduce memory consumption, and network transmission pressure. For example, in paging queries or batch data processing scenarios, control the amount of data returned per query based on the data volume and system resources.  

```java
public static BatchSizeHintApi use(Integer batchSize) {
    // Specific implementation
}
```  

`use(Integer batchSize)`: Specify the query batch size by passing an integer value. This integer represents the number of data items returned per query. The special value `-1` means no paging, returning all qualified data at once.  

#### BatchSizeHintApi Usage Example  

Within the `try` block, all query operations will be performed according to the specified `batchSize`.  

```java
try (BatchSizeHintApi batchSizeHintApi = BatchSizeHintApi.use(-1)) {
    PetShopProxy data2 = data.queryById();
    data2.fieldQuery(PetShopProxy::getPetTalents);
}
```  

# VI. Persistence Layer Operations  

## (I) Batch Operations  

Batch operations cover two modes: **batch creation** and **batch update**. The system uses `batchCommit` as the default submission type. Currently, four submission types are supported. For configuration references, see: [Batch Operation Configuration](/en/DevManual/Reference/Back-EndFramework/module-API.md#3、批量操作配置).  

### 1. Runtime Configuration  

Default rules for the system's batch update submission method:  
+ Non-optimistic lock models use `batchCommit` (single-script batch submission, no affected rows returned).  
+ Optimistic lock models use `useAndJudgeAffectRows` (submit item by item and validate row counts; throw an exception if inconsistent).  

Supports modifying the submission method at runtime:  

```java
Spider.getDefaultExtension(BatchApi.class).run(() -> {
    Update logic
}, Batch commit type enum);
```  

### 2. Runtime Correction  

The system automatically corrects the batch submission type based on model configuration at runtime. The specific rules are as follows:  
+ **Batch addition scenario**: If the model configures a database auto-increment primary key and the batch submission type is set to `batchCommit`, the system will automatically change it to `collectionCommit`. This is because using `batchCommit` requires single-item submission to obtain the correct primary key return value, which reduces performance.  
+ **Batch update scenario**: If the model configures an optimistic lock and the batch submission type is set to `collectionCommit` or `batchCommit`, the system will automatically change it to `useAndJudgeAffectRows`. If you want the system to not perform batch submission type changes, you can choose to invalidate the optimistic lock.  

## (II) Optimistic Lock  

When processing data that may encounter concurrent modifications, concurrent control is usually required. There are two common concurrent control methods at the database level: pessimistic lock and optimistic lock. Oinone provides certain support for optimistic locks.  

### 1. Optimistic Lock Definition Methods  

There are two ways to define an optimistic lock:  
+ **Quick inheritance**: By inheriting `VersionModel`, you can quickly build a model with an optimistic lock, a unique code `code`, and a primary key `id`.  
+ **Annotation marking**: Using the `@Field.Version` annotation on a field marks that the model uses an optimistic lock when updating data.  

### 2. Exception Handling  

When the number of actual affected rows in an update operation does not match the number of input parameters, the system throws an exception with the error code 10150024. When updating data in batches, to accurately return the number of actual affected rows, the system changes batch submission to cyclic single-item submission for updates, which may cause certain performance loss.  

### 3. Optimistic Lock Invalidation Handling  

If a model needs to use an optimistic lock to update data in some scenarios but not in others, you can use the following code to invalidate the optimistic lock in specific scenarios:  

```java
PamirsSession.directive().disableOptimisticLocker();
try {
    // Update logic
} finally {
    PamirsSession.directive().enableOptimisticLocker();
}
```  

### 4. Handle Without Throwing Optimistic Lock Exception  

If you do not want to throw an optimistic lock exception, you can set the batch submission type to `useAffectRows`, allowing the outer logic to independently determine the returned number of actual affected rows. Sample code:  

```java
Spider.getDefaultExtension(BatchApi.class).run(() -> {
    // Update logic, return the number of actual affected rows
}, BatchCommitTypeEnum.useAffectRows);
```  

Through the above methods, you can flexibly use optimistic locks for concurrent control while handling exceptions and performance issues according to actual needs.  

:::danger Warning  

When using optimistic locks, manual judgment of affected rows is required for single-record update operations. If not judged, the program will not report an error when the update fails, while the `batch` interface will automatically validate and report an error.  

:::  

:::danger Warning: Reminder of Possible Serious Consequences  

When using optimistic locks in custom pages, you need to configure the `optVersion` field in the view XML (can be set to hidden); otherwise, the validation will fail.  

:::  

# VII. Exception Handling  

## (I) Module Exception Enum Definition  

Use the `@Errors` annotation to define module-specific exception enums. Example:  

```java
@Errors(displayName = "xxx module error enum")
public enum XxxxExpEnumerate implements ExpBaseEnum {
    CUSTOM_ERROR(ERROR_TYPE.SYSTEM_ERROR, xxxxxxxx,""),
    SYSTEM_ERROR(ERROR_TYPE.SYSTEM_ERROR, xxxxxxxx, "System exception");

    private ERROR_TYPE type;
    private int code;
    private String msg;

    XxxxExpEnumerate(ERROR_TYPE type, int code, String msg) {
        this.type = type;
        this.code = code;
        this.msg = msg;
    }

    @Override public ERROR_TYPE type() { return type; }
    @Override public int code() { return code; }
    @Override public String msg() { return msg; }
}
```  

## (II) Throwing Exceptions  

Throw exceptions via the `PamirsException.construct` method:  

```java
throw PamirsException.construct(XxxxExpEnumerate.CUSTOM_ERROR).appendMsg("Necessary information attached to the exception, non-mandatory").errThrow();
```