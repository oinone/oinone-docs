---
title: Tools API
index: true
category:
  - Development Manual
  - Reference
  - Backend API
  - Advance API
order: 10
next:
  text: Framework Overview
  link: /en/DevManual/Reference/Front-EndFramework/framework-overview.md
---
Oinone Business Common Tool Class API Documentation Guide

# Ⅰ、IdGenerator Interface (ID Generator)

## (Ⅰ) Class Overview

``` java
@SPI(factory = SpringServiceLoaderFactory.class)
public interface IdGenerator<T>
```

+ **Function**: Defines an SPI interface for general ID generation strategies, supporting generation logic for different types of IDs
+ **Generic Parameter**: `T` represents the type of the generated ID
+ **Extension Mechanism**: Supports service discovery through the `@SPI` annotation, using the Spring service loading factory by default

## (Ⅱ) Method List

### 1、generate(String keyGenerator)

+ **Function**: Generates an ID of the specified type
+ **Parameters**:
  - `keyGenerator` - The key for generating the ID (usually used to distinguish different generation strategies)
+ **Return Value**: `T` - The generated ID object
+ **Sample Code**: **java**

``` java
// Generate ID based on the model
Long generate = (Long) Spider.getDefaultExtension(IdGenerator.class).generate(PamirsTableInfo.fetchKeyGenerator(TestModel.MODEL_MODEL));
```

# Ⅱ、UidGenerator Interface (Unique ID Generator)

## (Ⅰ) Class Overview

``` java
@SPI
public interface UidGenerator
```

+ **Function**: Generates 64-bit unique IDs and supports parsing the composition elements of the ID (such as timestamp, work node, sequence number, etc.)
+ **Extension Points**: Different unique ID generation algorithms (such as snowflake algorithm variants) can be implemented through SPI

## (Ⅱ) Method List

### 1、getUID()

+ **Function**: Obtains a unique ID
+ **Return Value**: `long` - 64-bit unique ID
+ **Exception**: `UidGenerateException` - Thrown when ID generation fails
+ **Sample Code**: **java**

``` java
// Generate ID
Long l = Long.valueOf(UidGeneratorFactory.getCachedUidGenerator().getUID());
```

### 2、parseUID(long uid)

+ **Function**: Parses the composition elements of the UID
+ **Parameters**:
  - `uid` - The unique ID to be parsed
+ **Return Value**: `String` - Parsed information (such as `timestamp=1683214567, workerId=1, sequence=123`)
+ **Sample Code**: **java**

``` java
String parseResult = UidGeneratorFactory.getCachedUidGenerator().parseUID(1234567890L);
System.out.println("UID Parsing Result: " + parseResult);
```

# Ⅲ、SequenceGenerator Interface Documentation

## (Ⅰ) Class Overview

`SequenceGenerator` is an SPI interface for generating various types of sequences, supporting multiple sequence generation strategies, including auto-incrementing serial numbers, date serial numbers, UUIDs, etc. The interface is pluggable through the SPI mechanism, using the Spring service loading factory by default.

**Package Path**: `pro.shushi.pamirs.meta.api.core.compute.systems.type.gen`
**Interface Definition**:

``` java
@SPI(factory = SpringServiceLoaderFactory.class)
public interface SequenceGenerator<T>
```

**Main Functions**:

+ Supports multiple sequence generation algorithms
+ Configurable sequence generation strategies
+ Generates different types of unique identifiers
+ Provides strong order guarantees (such as `ORDERLY_SEQ` type)

## (Ⅱ) Method List

### 1、`generate(String sequence, String configCode)`

+ **Function**: Generates a sequence value based on the specified sequence generator type and configuration code.
+ **Parameters**:
  - `sequence` - Sequence generator type, corresponding to values in `SequenceEnum` (such as `ORDERLY_SEQ`)
  - `configCode` - Sequence generation configuration code, used to specify specific generation rules (such as `SAMPLE_ORDER_SEQ`)
+ **Return Value**: `T` (generic, specific type determined by the implementation class) - The generated sequence value, which may be a string, number, or other type depending on the specific implementation.
+ **Sample Code**:

``` java
// Get the sequence generator instance
SequenceGenerator<Object> generator = CommonApiFactory.getSequenceGenerator();


// Define the encoding rule on the TestModel model
@Model.Code(sequence = "DATE_ORDERLY_SEQ",prefix = "P",size=6,step=1,initial = 10000,format = "yyyyMMdd")
public class TestModel extends CodeModel {}
// Manually generate the code
Object codeObj = CommonApiFactory.getSequenceGenerator().generate(SequenceEnum.SEQ,TestModel.MODEL_MODEL);
String code = TypeUtils.stringValueOf(codeObj);

```

``` java
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
        // Initialize the SequenceConfig according to your business needs
        util.createSequenceConfig("Order Code Generation", SeqConstants.SAMPLE_ORDER_SEQ, SequenceEnum.ORDERLY_SEQ, 8)
                .setStep(1)
                .setInitial(80000000L)
                .setIsRandomStep(false);
        // Initialize the SequenceConfig according to your business needs
        util.createSequenceConfig("Application Form Code Generation", SeqConstants.SAMPLE_APPLY_SEQ, SequenceEnum.DATE_SEQ, 4)
                .setStep(1)
                .setPrefix("YP")
                .setInitial(1000L)
                .setIsRandomStep(false);
    }
}
```

``` java
// Generate an auto-incrementing strong ordered order serial number
Object orderSequence =  CommonApiFactory.getSequenceGenerator().generate(SequenceEnum.ORDERLY_SEQ.value(), SeqConstants.SAMPLE_ORDER_SEQ);
String orderCode = "ORD" + TypeUtils.stringValueOf(orderSequence);

// Generate a date serial number
Object dateSequence = CommonApiFactory.getSequenceGenerator().generate(SequenceEnum.DATE_SEQ.value(), "CUSTOM_DATE_CONFIG");
String dateCode = "DT" + TypeUtils.stringValueOf(dateSequence);
```

## (Ⅲ) Associated Enum: `SequenceEnum`

`SequenceEnum` defines the supported sequence generator types, including multiple strategies:

``` java
public enum SequenceEnum implements IEnum<String> {
    SEQ("SEQ", "SEQ", "Auto-incrementing Serial Number"),
    ORDERLY_SEQ("ORDERLY_SEQ", "ORDERLY_SEQ", "Auto-incrementing Strong Ordered Serial Number"),
    DATE_SEQ("DATE_SEQ", "DATE_SEQ", "Date Serial Number"),
    DATE_ORDERLY_SEQ("DATE_ORDERLY_SEQ", "DATE_ORDERLY_SEQ", "Date Strong Ordered Serial Number"),
    DATE("DATE", "DATE", "Date"),
    UUID("UUID", "UUID", "UUID"),
    DISTRIBUTION("DISTRIBUTION", "Distributed ID", "Distributed ID");
}
```

# Ⅳ、RSQLHelper Class (RSQL Parsing Utility Class)

## (Ⅰ) Class Overview

``` java
@Slf4j
public class RSQLHelper
```

+ **Function**: Provides parsing, optimization, calculation, and format conversion functions for RSQL expressions
+ **Features**:
  - Supports two parsing modes: with model (ModelConfig) and without model
  - Can convert RSQL to SQL or other target formats
  - Provides expression calculation functions (judging whether data matches RSQL conditions)
+ **Constructor**: **java**

``` java
private RSQLHelper() {} // Private constructor, prohibits instantiation, all methods are static methods
```

## (Ⅱ) Core Method List

### 1、getRsqlValues (String rsql, Getter<T, ?>... getters)

``` java
@SafeVarargs
public static <T> Map<String, Object> getRsqlValues(String rsql, Getter<T, ?>... getters)
```

+ **Function**:
  - **Specifies target fields through Lambda expressions** and extracts the corresponding field values from the RSQL expression
  - Internally uses `LambdaUtil.fetchFieldName` to parse Lambda expressions and obtain field names
+ **Parameters**:
  - `rsql` - RSQL expression string (such as `"name==Alice;age>20"`)
  - `getters` - Variable parameters, Lambda expression array, used to specify fields for which values need to be extracted (such as `User::getName`)
+ **Return Value**:
  - **Type**: `Map<String, Object>`
  - **Description**: Mapping of field names to corresponding values. If a field does not appear in the RSQL or parsing fails, the key is not included.
+ **Implementation Logic**:
  - Extracts target field names from `getters` and stores them in a `HashSet`
  - Calls the model-free parsing method to parse the RSQL expression and generate a syntax tree root node
  - Traverses the syntax tree nodes, and when a node field matches the target field, extracts its parameter value (only takes the first parameter, suitable for simple comparison scenarios)
+ **Sample Code: java**

``` java
// Use Lambda expressions to specify fields
String rsql = "name==Alice;age>=18";
Map<String, Object> values = RSQLHelper.getRsqlValues(rsql, User::getName, User::getAge);
// Output: {name=Alice, age=18}
```

### 2、getRsqlValues (String rsql, Set<`String`> fields)

``` java
public static Map<String, Object> getRsqlValues(String rsql, Set<`String`> fields)
```

+ **Function**:
  - **Specifies target fields through a set of field names** and extracts the corresponding field values from the RSQL expression
  - Suitable for scenarios where field names are known, avoiding reflection overhead of Lambda expressions
+ **Parameters**:
  - `rsql` - RSQL expression string (such as `"name==Alice;age>20"`)
  - `fields` - Set of field names for which values need to be extracted (such as `{"name", "age"}`)
+ **Return Value**:
  - **Type**: `Map<String, Object>`
  - **Description**: Only includes fields that exist in `fields` and appear in the RSQL. The value is the first parameter value of the node.
+ **Preconditions**:
  - `rsql` is non-null and in correct format; otherwise, an empty Map is returned.
  - `fields` is non-null; otherwise, an empty Map is directly returned.
+ **Sample Code: java**

``` java
Set<`String`> targetFields = new HashSet<>(Arrays.asList("name", "age"));
String rsql = "name==Bob;age==25";
Map<String, Object> values = RSQLHelper.getRsqlValues(rsql, targetFields);
// Output: {name=Bob, age=25}
```

# Ⅴ、RsqlParseHelper Class (RSQL to SQL Utility Class)

## (Ⅰ) Class Overview

``` java
public class RsqlParseHelper
```

+ **Function**: Converts RSQL expressions into SQL WHERE clauses

## (Ⅱ) Core Method List:

### 1、parseRsql2Sql(String model, String rsql)

+ **Parameters**:
  - `model` - Model code
  - `rsql` - RSQL expression
+ **Return Value**: `String` - Corresponding SQL WHERE clause (such as `WHERE name = 'Adamancy' AND age > 18`)
+ **Sample Code**: **java**

``` java
String sqlWhere = RsqlParseHelper.parseRsql2Sql(TestModel.MODEL_MODEL, "name==Adamancy;age>18");
String sqlWhere = RsqlParseHelper.parseRsql2Sql(queryWrapper.getModel(), rsql);
```

# Ⅵ、ObjectUtils Class (Object Utility Class)

## (Ⅰ) Class Overview

``` java
public class ObjectUtils
```

+ **Function**: Provides general utility methods for object operations, including deep cloning and value comparison
+ **Constructor**: None (static utility class)

## (Ⅱ) Core Method List

### 1、clone(T object)

+ **Function**: Implements deep cloning of objects through serialization
+ **Parameters**:
  - `object` - Serializable object to be cloned (`Serializable`)
+ **Return Value**: `T` - Cloned new object
+ **Generics**: `T extends Serializable`
+ **Sample Code**: **java**

``` java
User original = new User("Adamancy", 25);
User cloned = ObjectUtils.clone(original);
```

### 2、equals(Object a, Object b)

+ **Function**: Safely compares the values of two objects (supports special handling of enumeration types)
+ **Parameters**:
  - `a`, `b` - Objects to be compared
+ **Return Value**: `Boolean` - `true` if equal, otherwise `false`
+ **Special Handling**: If the object implements the `IEnum` interface, compare its `value()` value
+ **Sample Code**: **java**

``` java
boolean isEqual = ObjectUtils.equals(EnumType.A, EnumType.A); // true
```

# Ⅶ、PamirsJsonUtils Class (For Frontend Interaction)

## (Ⅰ) Class Overview

`PamirsJsonUtils` is a utility class located in the `pro.shushi.pamirs.framework.orm.json` package, mainly used for serialization and deserialization operations of JSON data. The class is based on Alibaba's FastJSON library, which is encapsulated and customized to provide a series of convenient methods, supporting custom parsing and serialization configurations, filters, etc.

## (Ⅱ) Member Variables

| **Variable Name**        | **Type**            | **Description**                                                     |
| :----------------------- | :------------------ | :----------------------------------------------------------- |
| `parserConfig`           | `ParserConfig`      | Custom parsing configuration, using `PamirsParserConfig`<br/> and registering `EnumForNameDeserializer`<br/> for deserialization of enumeration types. |
| `serializeConfig`        | `SerializeConfig`   | Custom serialization configuration, using `PamirsSerializerConfig`<br/> and registering `EnumForNameSerializer`<br/> for serialization of enumeration types. |
| `defaultFilters`         | `SerializeFilter[]` | Array of default serialization filters, including `BigDecimalSerializeFilter`<br/>, `PreNameSerializeFilter`<br/> and `DMapSerializeFilter`<br/>. |


## (Ⅲ) Core Method List

### 1、`toJSONString(Object object, SerializerFeature... features)`

  - **Function**: Serializes an object into a JSON string, and additional serialization features can be specified.
  - **Parameters**:
    * `object`: The object to be serialized.
    * `features`: Variable parameters, additional serialization features.
  - **Return Value**: The serialized JSON string.
  - **Sample Code**:

``` java
PamirsJsonUtils.toJSONString(nodes,
                             SerializerFeature.DisableCircularReferenceDetect,
                             SerializerFeature.WriteDateUseDateFormat,
                             SerializerFeature.BrowserCompatible);
```