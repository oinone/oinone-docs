---
title: Hint API
index: true
category:
  - Development Manual
  - Reference
  - Backend API
  - Advance API
order: 4

---
# I. Data Source Specification DsHint

## (Ⅰ) Overview

In the Oinone development environment, `DsHintApi` is used to enforce the specification of the data source to be used during data queries. In actual business scenarios, complex SQLs may occur in the following situations:

+ When a single-table SQL cannot meet the requirements
+ When there are complex Join relationships or subqueries
+ When the logic of complex SQLs is difficult to implement or the implementation cost is high through program logic

In such cases, the business functions can be implemented by using the native mybatis/mybatis-plus and custom Mappers. At this time, `DsHintApi` can be used in combination.

## (Ⅱ) API Definition

``` java
public static DsHintApi model(String model) {
    // Specific implementation
}

public DsHintApi(Object dsKey) {
    // Specific implementation
}
```
+ `model(String model)`: Specify the data source by passing in the model code. The model code serves as the basis for data source selection, making it convenient for developers to associate with the corresponding data source according to the business model.
+ `DsHintApi(Object dsKey)`: Directly pass in the data source name to specify the data source. This method is more intuitive and suitable for scenarios where the data source name is clearly known.

## (Ⅲ) Usage Examples

### 1. Precautions

Be sure to use the `try - with - resources` syntax when using `DsHintApi` in the code. Failure to use this syntax may lead to problems such as data source confusion, affecting the accuracy of data queries and the stability of the system.

### 2. DsHintApi Usage Example

Within the `try` block, all query operations will be forced to use the specified data source.

+ **Usage Method 1: Specify the data source by model code**

``` java
try (DsHintApi dsHintApi = DsHintApi.model(PetItem.MODEL_MODEL)) {
    List<PetItem> items = demoItemDAO.customSqlDemoItem();
    PetShopProxy data2 = data.queryById();
    data2.fieldQuery(PetShopProxy::getPetTalents);
}
```

In the above example, `DsHintApi.model(PetItem.MODEL_MODEL)` specifies the data source according to the model code of `PetItem`, ensuring that all queries within the `try` block obtain data from the specified data source.

+ **Usage Method 2: Specify the data source by data source name**

``` java
try (DsHintApi dsHintApi = DsHintApi.use("data source name")) {
    List<PetItem> items = demoItemDAO.customSqlDemoItem();
    PetShopProxy data2 = data.queryById();
    data2.fieldQuery(PetShopProxy::getPetTalents);
}
```

In this example, `DsHintApi.use("data source name")` directly specifies the data source by the data source name, also ensuring that the query operations within the `try` block obtain data from this data source.


# II. BatchSizeHint

## (Ⅰ) Usage Scenarios

In the Oinone development environment, `BatchSizeHintApi` is used to enforce the specification of the batch size for queries. When processing a large number of data queries, reasonably setting the batch size can optimize performance, reduce memory consumption, and alleviate network transmission pressure. For example, in paged query or batch data processing scenarios, the amount of data returned by each query can be precisely controlled according to the data volume and system resource conditions.

## (Ⅱ) API Definition

``` java
public static BatchSizeHintApi use(Integer batchSize) {
    // Specific implementation
}
```

`use(Integer batchSize)`: Specify the batch size for queries by passing in an integer value. This integer represents the amount of data returned by each query. The special value `-1` indicates no pagination, returning all data that meets the conditions at once.

## (Ⅲ) Usage Examples

### 1. Precautions

Be sure to use the `try - with - resources` syntax when using `DsHintApi` and `BatchSizeHintApi` in the code. Failure to use this syntax may lead to problems such as data source confusion, affecting the accuracy of data queries and the stability of the system.

### 2. BatchSizeHintApi Usage Example

Within the `try` block, all query operations will be performed according to the specified `batchSize`.

+ **Specify non-paged query (batchSize = -1)**

``` java
try (BatchSizeHintApi batchSizeHintApi = BatchSizeHintApi.use(-1)) {
    PetShopProxy data2 = data.queryById();
    data2.fieldQuery(PetShopProxy::getPetTalents);
}
```

In the above example, `BatchSizeHintApi.use(-1)` indicates that the queries within the `try` block will not be paginated, returning all data that meets the conditions at once.