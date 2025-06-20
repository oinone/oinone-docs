---
title: Data Operation:DsHint(Specify Data Source) and BatchSizeHint(Specify Batch Quantity)
index: true
category:
  - Common Solutions
order: 21
---

# 一、Scenario Description
+ DsHintApi, which forces the specification of the data source,
+ BatchSizeHintApi, which forces the specification of the query batch quantity

# 二、API Definition
## (一) DsHintApi
```java
public static DsHintApi model(String model/**Model Code*/) {
    // Specific implementation
}

public DsHintApi(Object dsKey/**Data Source Name*/) {
    // Specific implementation
}
```

## (二) BatchSizeHintApi
```java
public static BatchSizeHintApi use(Integer batchSize) {
    // Specific implementation
}
```

# 三、Usage Examples
:::danger
Warning:

The try-with-resources syntax is used in the code; otherwise, data source confusion may occur.

:::

+ DsHintApi Usage Example
All queries wrapped inside the try block will be forced to use the specified data source.

```java
  // Usage Mode 1:
  try (DsHintApi dsHintApi = DsHintApi.model(PetItem.MODEL_MODEL)) {
       List<PetItem> items = demoItemDAO.customSqlDemoItem();
       PetShopProxy data2 = data.queryById();
       data2.fieldQuery(PetShopProxy::getPetTalents);
 }

  // Usage Mode 2:
 try (DsHintApi dsHintApi = DsHintApi.use("Data Source Name")) {
        List<PetItem> items = demoItemDAO.customSqlDemoItem();
        PetShopProxy data2 = data.queryById();
        data2.fieldQuery(PetShopProxy::getPetTalents);
 }
```

+ 3、BatchSizeHintApi Usage Example
All queries wrapped inside the try block will be executed according to the specified batchSize.

```java
// Specify to query 500 records each time
try (BatchSizeHintApi batchSizeHintApi = BatchSizeHintApi.use(500)) {
    PetShopProxy data2 = data.queryById();
    data2.fieldQuery(PetShopProxy::getPetTalents);
}
```

```java
// Specify no pagination (batchSize=-1) for the query. Please note that you must use this when it is clear that pagination is not needed; if the data volume is extremely large and no pagination is used, it may cause a freeze. By default, the platform will perform pagination queries when the number of pages is not specified.
try (BatchSizeHintApi batchSizeHintApi = BatchSizeHintApi.use(-1)) {
    PetShopProxy data2 = data.queryById();
    data2.fieldQuery(PetShopProxy::getPetTalents);
}
```