---
title: 通用工具 API（Tools API）
index: true
category:
  - 研发手册
  - Reference
  - 后端API
  - Advance API
order: 10
next:
  text: 框架概览（Framework Overview）
  link: /zh-cn/DevManual/Reference/Front-EndFramework/framework-overview.md
---
Oinone 业务常用工具类 API 文档指南

# 一、IdGenerator 接口（ID 生成器）

## （一）类概述

```java
@SPI(factory = SpringServiceLoaderFactory.class)
public interface IdGenerator<T>
```

+ **功能**：定义通用 ID 生成策略的 SPI 接口，支持不同类型 ID 的生成逻辑
+ **泛型参数**：`T` 表示生成的 ID 类型
+ **扩展机制**：通过`@SPI`注解支持服务发现，默认使用 Spring 服务加载工厂

## （二）方法列表

### 1、generate(String keyGenerator)

+ **功能**：生成指定类型的 ID
+ **参数**：
  - `keyGenerator` - 生成 ID 的键（通常用于区分不同生成策略）
+ **返回值**：`T` - 生成的 ID 对象
+ **示例代码**：**java**

```java
//根据模型生成id
Long generate = (Long) Spider.getDefaultExtension(IdGenerator.class).generate(PamirsTableInfo.fetchKeyGenerator(TestModel.MODEL_MODEL));
```

# 二、UidGenerator 接口（唯一 ID 生成器）

## （一）类概述

```java
@SPI
public interface UidGenerator
```

+ **功能**：生成 64 位唯一 ID，并支持解析 ID 的组成元素（如时间戳、工作节点、序列号等）
+ **扩展点**：可通过 SPI 实现不同的唯一 ID 生成算法（如雪花算法变种）

## （二）方法列表

### 1、getUID()

+ **功能**：获取唯一 ID
+ **返回值**：`long` - 64 位唯一 ID
+ **异常**：`UidGenerateException` - ID 生成失败时抛出
+ **示例代码**：**java**

```java
//生成id
Long l = Long.valueOf(UidGeneratorFactory.getCachedUidGenerator().getUID());
```

### 2、parseUID(long uid)

+ **功能**：解析 UID 的组成元素
+ **参数**：
  - `uid` - 待解析的唯一 ID
+ **返回值**：`String` - 解析后的信息（如`timestamp=1683214567, workerId=1, sequence=123`）
+ **示例代码**：**java**

```java
String parseResult = UidGeneratorFactory.getCachedUidGenerator().parseUID(1234567890L);
System.out.println("UID解析结果: " + parseResult);
```

# 三、SequenceGenerator 接口文档

## （一）类概述

`SequenceGenerator` 是一个用于生成各种类型序列的 SPI 接口，支持多种序列生成策略，包括自增流水号、日期流水号、UUID 等。该接口通过 SPI 机制实现可插拔，默认使用 Spring 服务加载工厂。

**包路径**：`pro.shushi.pamirs.meta.api.core.compute.systems.type.gen`
**接口定义**：

```java
@SPI(factory = SpringServiceLoaderFactory.class)
public interface SequenceGenerator<T>
```

**主要功能**：

+ 支持多种序列生成算法
+ 可配置的序列生成策略
+ 生成不同类型的唯一标识符
+ 提供强有序性保证（如`ORDERLY_SEQ`类型）

## （二）方法列表

### 1、`generate(String sequence, String configCode)`

+ **功能**：根据指定的序列生成器类型和配置编码生成序列值。
+ **参数**：
  - `sequence` - 序列生成器类型，对应 `SequenceEnum`中的值（如`ORDERLY_SEQ`）
  - `configCode` - 序列生成配置编码，用于指定具体的生成规则（如`SAMPLE_ORDER_SEQ`）
+ **返回值**：`T`（泛型，具体类型由实现类决定） - 生成的序列值，可能是字符串、数字或其他类型，取决于具体实现。
+ **示例代码**：

```java
// 获取序列生成器实例
SequenceGenerator<Object> generator = CommonApiFactory.getSequenceGenerator();


//在TestModel 模型上，定义编码规则
@Model.Code(sequence = "DATE_ORDERLY_SEQ",prefix = "P",size=6,step=1,initial = 10000,format = "yyyyMMdd")
public class TestModel extends CodeModel {}
//手动生成code
Object codeObj = CommonApiFactory.getSequenceGenerator().generate(SequenceEnum.SEQ,TestModel.MODEL_MODEL);
String code = TypeUtils.stringValueOf(codeObj);

```

```java
@Slf4j
@Component
public class DemoMetadataEditor implements MetaDataEditor {

    @Override
    public void edit(AppLifecycleCommand command, Map<String, Meta> metaMap) {
        InitializationUtil util = InitializationUtil.get(metaMap, HrSimpleModule.MODULE_MODULE, HrSimpleModule.MODULE_NAME);
        if (util == null) {
            return;
        }
        bizSequence(util);
    }

    private void bizSequence(InitializationUtil util) {
        // 根据自己的业务需求初始化SequenceConfig
        util.createSequenceConfig("订单编码生成", SeqConstants.SAMPLE_ORDER_SEQ, SequenceEnum.ORDERLY_SEQ, 8)
                .setStep(1)
                .setInitial(80000000L)
                .setIsRandomStep(false);
        // 根据自己的业务需求初始化SequenceConfig
        util.createSequenceConfig("申请单编码生成", SeqConstants.SAMPLE_APPLY_SEQ, SequenceEnum.DATE_SEQ, 4)
                .setStep(1)
                .setPrefix("YP")
                .setInitial(1000L)
                .setIsRandomStep(false);
    }
}
```

```java
// 生成订单流水号（自增强有序）
Object orderSequence =  CommonApiFactory.getSequenceGenerator().generate(SequenceEnum.ORDERLY_SEQ.value(), SeqConstants.SAMPLE_ORDER_SEQ);
String orderCode = "ORD" + TypeUtils.stringValueOf(orderSequence);

// 生成日期流水号
Object dateSequence = CommonApiFactory.getSequenceGenerator().generate(SequenceEnum.DATE_SEQ.value(), "CUSTOM_DATE_CONFIG");
String dateCode = "DT" + TypeUtils.stringValueOf(dateSequence);
```

## （三）关联枚举：`SequenceEnum`

`SequenceEnum` 定义了支持的序列生成器类型，包含多种策略：

```java
public enum SequenceEnum implements IEnum<String> {
    SEQ("SEQ", "SEQ", "自增流水号"),
    ORDERLY_SEQ("ORDERLY_SEQ", "ORDERLY_SEQ", "自增强有序流水号"),
    DATE_SEQ("DATE_SEQ", "DATE_SEQ", "日期流水号"),
    DATE_ORDERLY_SEQ("DATE_ORDERLY_SEQ", "DATE_ORDERLY_SEQ", "日期强有序流水号"),
    DATE("DATE", "DATE", "日期"),
    UUID("UUID", "UUID", "UUID"),
    DISTRIBUTION("DISTRIBUTION", "分布式ID", "分布式ID");
}
```

# 四、RSQLHelper 类（RSQL 解析工具类）

## （一）类概述

```java
@Slf4j
public class RSQLHelper
```

+ **功能**：提供 RSQL 表达式的解析、优化、计算及格式转换功能
+ **特点**：
  - 支持带模型（ModelConfig）和无模型两种解析模式
  - 可将 RSQL 转换为 SQL 或其他目标格式
  - 提供表达式计算功能（判断数据是否匹配 RSQL 条件）
+ **构造方法**：**java**

```java
private RSQLHelper() {} // 私有构造，禁止实例化，所有方法均为静态方法
```

## （二）核心方法列表

### 1、getRsqlValues (String rsql, Getter<T, ?>... getters)

```java
@SafeVarargs
public static <T> Map<String, Object> getRsqlValues(String rsql, Getter<T, ?>... getters)
```

+ **功能：**
  - **通过 Lambda 表达式指定目标字段**，从 RSQL 表达式中提取对应字段的取值
  - 内部使用`LambdaUtil.fetchFieldName`解析 Lambda 表达式，获取字段名
+ **参数**
  - `rsql` - RSQL 表达式字符串（如`"name==Alice;age>20"`）
  - `getters` - 可变参数，Lambda 表达式数组，用于指定需要提取值的字段（如`User::getName`）
+ 返回值
  - **类型**：`Map<String, Object>`
  - **说明**：字段名与对应值的映射，若字段未在 RSQL 中出现或解析失败则不包含该键
+ **实现逻辑**
  - 从`getters`中提取目标字段名，存入`HashSet`
  - 调用无模型解析方式解析 RSQL 表达式，生成语法树根节点
  - 遍历语法树节点，当节点字段匹配目标字段时，提取其参数值（仅取第一个参数，适用于简单比较场景）
+ **示例代码：java**

```java
// 使用Lambda表达式指定字段
String rsql = "name==Alice;age>=18";
Map<String, Object> values = RSQLHelper.getRsqlValues(rsql, User::getName, User::getAge);
// 输出：{name=Alice, age=18}
```

### 2、getRsqlValues (String rsql, Set<`String`> fields)

```java
public static Map<String, Object> getRsqlValues(String rsql, Set<`String`> fields)
```

+ **功能：**
  - **通过字段名集合指定目标字段**，从 RSQL 表达式中提取对应字段的取值
  - 适用于字段名已知的场景，避免使用 Lambda 表达式的反射开销
+ **参数**
  - `rsql` - RSQL 表达式字符串（如`"name==Alice;age>20"`）
  - `fields` - 需要提取值的字段名集合（如`{"name", "age"}`）
+ **返回值**
  - **类型**：`Map<String, Object>`
  - **说明**：仅包含`fields`中存在且在 RSQL 中出现的字段，值为节点的第一个参数值
+ **前置条件**
  - `rsql`非空且格式正确，否则返回空 Map
  - `fields`非空，否则直接返回空 Map
+ **示例代码：java**

```java
Set<`String`> targetFields = new HashSet<>(Arrays.asList("name", "age"));
String rsql = "name==Bob;age==25";
Map<String, Object> values = RSQLHelper.getRsqlValues(rsql, targetFields);
// 输出：{name=Bob, age=25}
```

# 五、RsqlParseHelper 类（RSQL 转 SQL 工具类）

## （一）类概述

```java
public class RsqlParseHelper
```

+ **功能**：将 RSQL 表达式转换为 SQL WHERE 子句

## （二）核心方法列表：

### 1、parseRsql2Sql(String model, String rsql)

+ **参数**：
  - `model` - 模型编码
  - `rsql` - RSQL 表达式
+ **返回值**：`String` - 对应的 SQL WHERE 子句（如`WHERE name = 'Adamancy' AND age > 18`）
+ **示例代码**：**java**

```java
String sqlWhere = RsqlParseHelper.parseRsql2Sql(TestModel.MODEL_MODEL, "name==Adamancy;age>18");
String sqlWhere = RsqlParseHelper.parseRsql2Sql(queryWrapper.getModel(), rsql);
```

# 六、ObjectUtils 类（对象工具类）

## （一）类概述

```java
public class ObjectUtils
```

+ **功能**：提供对象操作通用工具方法，包括深克隆和值比较
+ **构造方法**：无（静态工具类）

## （二）核心方法列表

### 1、clone(T object)

+ **功能**：通过序列化实现对象深克隆
+ **参数**：
  - `object` - 待克隆的可序列化对象（`Serializable`）
+ **返回值**：`T` - 克隆后的新对象
+ **泛型**：`T extends Serializable`
+ **示例代码**：**java**

```java
User original = new User("Adamancy", 25);
User cloned = ObjectUtils.clone(original);
```

### 2、equals(Object a, Object b)

+ **功能**：安全比较两个对象的值（支持枚举类型特殊处理）
+ **参数**：
  - `a`, `b` - 待比较的对象
+ **返回值**：`Boolean` - 相等返回`true`，否则`false`
+ **特殊处理**：若对象实现`IEnum`接口，比较其`value()`值
+ **示例代码**：**java**

```java
boolean isEqual = ObjectUtils.equals(EnumType.A, EnumType.A); // true
```

# 七、PamirsJsonUtils 类（用于前端交互）

## （一）类概述

`PamirsJsonUtils` 是一个工具类，位于 `pro.shushi.pamirs.framework.orm.json` 包下，主要用于处理 JSON 数据的序列化和反序列化操作。该类基于阿里巴巴的 FastJSON 库，对其进行了封装和定制，提供了一系列便捷的方法，支持自定义解析和序列化配置、过滤器等。

## （二）成员变量

| **变量名**        | **类型**            | **描述**                                                     |
| :---------------- | :------------------ | :----------------------------------------------------------- |
| `parserConfig`    | `ParserConfig`      | 自定义的解析配置，使用 `PamirsParserConfig`<br/> 并注册了 `EnumForNameDeserializer`<br/> 用于枚举类型的反序列化。 |
| `serializeConfig` | `SerializeConfig`   | 自定义的序列化配置，使用 `PamirsSerializerConfig`<br/> 并注册了 `EnumForNameSerializer`<br/> 用于枚举类型的序列化。 |
| `defaultFilters`  | `SerializeFilter[]` | 默认的序列化过滤器数组，包含 `BigDecimalSerializeFilter`<br/>、`PreNameSerializeFilter`<br/> 和 `DMapSerializeFilter`<br/>。 |


## （三）核心方法列表

### 1、`toJSONString(Object object, SerializerFeature... features)`

  - **功能**：将对象序列化为 JSON 字符串，可指定额外的序列化特性。
  - **参数**：
    * `object`：要序列化的对象。
    * `features`：可变参数，额外的序列化特性。
  - **返回值**：序列化后的 JSON 字符串。
  - **示例代码**：

```java
PamirsJsonUtils.toJSONString(nodes,
                             SerializerFeature.DisableCircularReferenceDetect,
                             SerializerFeature.WriteDateUseDateFormat,
                             SerializerFeature.BrowserCompatible);
```



