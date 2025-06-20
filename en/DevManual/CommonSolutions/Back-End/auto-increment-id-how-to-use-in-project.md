---
title: Auto-increment ID:How to Use Auto-increment IDs in Projects
index: true
category:
  - Common Solutions
order: 65
---
All models in Oinone inherit from IdModel (including direct or indirect inheritance), and the default primary key generation rule is a distributed ID; The platform internally implements the interface: `pro.shushi.pamirs.meta.api.core.compute.systems.type.gen.IdGenerator`, based on the Snowflake algorithm.

In some scenarios, the primary key needs to be set as auto-increment. This article explains how to change the ID generation rule to the auto-increment method. The auto-increment method can be applied to a single model or globally (for data sources).

# 一、Setting Auto-increment Primary Key for Models

Specify the PrimaryKey rule for the field with `@Field.PrimaryKey(keyGenerator = KeyGeneratorEnum.AUTO_INCREMENT)`.

```java
@Model.model(ProjectInfo.MODEL_MODEL)
@Model(displayName = "Project Information", labelFields = "projectName")
@Model.Advanced(unique = {"projectCode"})
public class ProjectInfo extends IdModel {

    public static final String MODEL_MODEL = "hr.simple.ProjectInfo";

    // Primary key field, set as auto-increment
    @Field.Integer
    @Field.PrimaryKey(keyGenerator = KeyGeneratorEnum.AUTO_INCREMENT)
    @Field.Advanced(batchStrategy = FieldStrategyEnum.NEVER)
    @Field(displayName = "id", summary = "Id field, auto-increment")
    private Long id;

    @Field(displayName = "Project Code", required = true)
    public String projectCode;

    @Field(displayName = "Project Name", required = true)
    public String projectName;

    //……
}
```

# 二、Global Setting for Auto-increment Primary Key

Specify the database ID generation rule in `application.yml` (can be configured globally or for a single data source). In the yml file, find the keyword `key-generator`, which defaults to `DISTRIBUTION` (i.e., distributed ID), and change it to `AUTO_INCREMENT` (auto-increment ID); if certain storage models under the data source are configured separately, the model-level rules take precedence.

```yaml
pamirs:
  mapper:
    static-model-config-locations:
      - pro.shushi.pamirs
    batch: collectionCommit
    batch-config:
      "[base.Field]":
        write: 2000
      "[base.Function]":
        read: 500
        write: 2000
    global: # Global configuration
      table-info:
        logic-delete: true
        logic-delete-column: is_deleted
        logic-delete-value: REPLACE(unix_timestamp(NOW(6)),'.','')
        logic-not-delete-value: 0
        optimistic-locker: false
        optimistic-locker-column: opt_version
        key-generator: DISTRIBUTION
      table-pattern: '${moduleAbbr}_%s'
    ds:
      biz: # Single data source configuration, higher priority
        table-info:
          # Skip repeating configurations same as global
          logic-delete: true
          logic-delete-column: is_deleted
          logic-delete-value: REPLACE(unix_timestamp(NOW(6)),'.','')
          optimistic-locker: false
          optimistic-locker-column: opt_version
          # ID generation methods: 1、DISTRIBUTION: Distributed ID; 2、AUTO_INCREMENT: Auto-increment ID
          key-generator: AUTO_INCREMENT
        table-pattern: '${moduleAbbr}_%s'
```

Note: For more YAML configurations, please refer to [Module API](/en/DevManual/Reference/Back-EndFramework/module-API.md).

# 三、Manual Way to Obtain IDs

```java
/**
* Manually obtain IDs in specific scenarios
*/
public void manualSetIdCode(){
    DemoItem demoItem = new DemoItem();
    // Manually obtain ID
    Object idObj =  Spider.getDefaultExtension(IdGenerator.class).generate(PamirsTableInfo.fetchKeyGenerator(DemoItem.MODEL_MODEL));
    demoItem.setId(TypeUtils.createLong(idObj));
    //……
}
```

# 四、Best Practices

If there is a need to modify the ID generation rule or manually obtain IDs in the project, you should clarify the rationale behind such changes^_^; Typically:

1. There is no need to modify the ID generation rule—use the default one.
2. There is no need to manually obtain IDs. When creating a model object (via create), if the ID field is empty, it will be automatically populated according to the rule.