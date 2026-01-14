---
title: 自增ID：如何在项目中使用自增ID
index: true
category:
  - 常见解决方案
order: 65
---
Oinone 所有的模型都会继承自 IdModel（包括直接或间接继承），主键默认生成规则是分布式 ID； 平台内部实现接口：`pro.shushi.pamirs.meta.api.core.compute.systems.type.gen.IdGenerator`， 基于雪花算法。

在某些场景下，需把主键设置为自增，本文讲讲解怎么把 id 的生成规则改为自增的方式。 自增的方式可以是针对单个模型，也可以是全局的（针对数据源）

# 一、模型设置自增主键

字段指定 PrimaryKey 的规则，`@Field.PrimaryKey(keyGenerator = KeyGeneratorEnum.AUTO_INCREMENT)`

```java
@Model.model(ProjectInfo.MODEL_MODEL)
@Model(displayName = "项目信息", labelFields = "projectName")
@Model.Advanced(unique = {"projectCode"})
public class ProjectInfo extends IdModel {

    public static final String MODEL_MODEL = "hr.simple.ProjectInfo";

    // 主键字段，设置主键为自增
    @Field.Integer
    @Field.PrimaryKey(keyGenerator = KeyGeneratorEnum.AUTO_INCREMENT)
    @Field.Advanced(batchStrategy = FieldStrategyEnum.NEVER)
    @Field(displayName = "id", summary = "Id字段，⾃增")
    private Long id;

    @Field(displayName = "项目编码", required = true)
    public String projectCode;

    @Field(displayName = "项目名称", required = true)
    public String projectName;

    //……
}
```

# 二、全局设置自增主键

通过在`application.yml`中指定数据库的id生成规则（可全局配置，也可单个数据源配置）。 在 yml中查找关键字`key-generator`，默认为`DISTRIBUTION`(即分布式 id )，可修改为 `AUTO_INCREMENT`(自增 id )；若数据源下某些存储模型单独配置，则优先去模型上的规则。

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
    global: # 全局配置
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
      biz: # 单个数据源配置，优先级高
        table-info:
          # 跟全局一样的配置可以不用重复配置
          logic-delete: true
          logic-delete-column: is_deleted
          logic-delete-value: REPLACE(unix_timestamp(NOW(6)),'.','')
          optimistic-locker: false
          optimistic-locker-column: opt_version
          # ID生成方式：1、DISTRIBUTION：分布式ID；2、AUTO_INCREMENT：自增ID
          key-generator: AUTO_INCREMENT
        table-pattern: '${moduleAbbr}_%s'
```

注：更多 YAML 配置请前往 [Module API](/zh-cn/DevManual/Reference/Back-EndFramework/module-API.md) 查阅。

# 三、手动方式获取 ID

```java
/**
* 在特定场景下需要手动获取Id
*/
public void manualSetIdCode(){
    DemoItem demoItem = new DemoItem();
    //手动获取ID
    Object idObj =  Spider.getDefaultExtension(IdGenerator.class).generate(PamirsTableInfo.fetchKeyGenerator(DemoItem.MODEL_MODEL));
    demoItem.setId(TypeUtils.createLong(idObj));
    //……
}
```

# 四、最佳实践

若项目中存在修改id的规则或者手动获取 ID，你应该明确为什么要这么做^_^； 通常情况：

1、无需修改 id 的生成规则，使用默认的即可；

2、无需手动获取 id，模型对象在执行创建 (create) 时，若 id 字段的值为空则会自动根据规则进行填充











