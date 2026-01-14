---
title: 数据操作：DsHint(指定数据源)和BatchSizeHint(指定批次数量)
index: true
category:
  - 常见解决方案
order: 21
---

# 一、场景描述
+ DsHintApi ，强制指定数据源，
+ BatchSizeHintApi ，强制指定查询批量数量

# 二、API定义
## （一）DsHintApi
```java
public static DsHintApi model(String model/**模型编码*/) {
    // 具体实现
}

public DsHintApi(Object dsKey/***数据源名称*/) {
    // 具体实现
}
```

## （二）BatchSizeHintApi
```java
public static BatchSizeHintApi use(Integer batchSize) {
    // 具体实现
}
```

# 三、使用示例
:::danger
警告：

代码中使用 try-with-resources 语法; 否则可能会出现数据源错乱

:::

+ DsHintApi 使用示例
包裹在 try 里面的所有查询都会强制使用指定的数据源

```java
  // 使用方式1：
  try (DsHintApi dsHintApi = DsHintApi.model(PetItem.MODEL_MODEL)) {
       List<PetItem> items = demoItemDAO.customSqlDemoItem();
       PetShopProxy data2 = data.queryById();
       data2.fieldQuery(PetShopProxy::getPetTalents);
 }

  // 使用方式2：
 try (DsHintApi dsHintApi = DsHintApi.use("数据源名称")) {
        List<PetItem> items = demoItemDAO.customSqlDemoItem();
        PetShopProxy data2 = data.queryById();
        data2.fieldQuery(PetShopProxy::getPetTalents);
 }
```

+ 3、BatchSizeHintApi 使用示例
包裹在 try 里面的所有查询都会按照指定的 batchSize 进行查询

```java
// 查询指定每次查询500跳
try (BatchSizeHintApi batchSizeHintApi = BatchSizeHintApi.use(500)) {
    PetShopProxy data2 = data.queryById();
    data2.fieldQuery(PetShopProxy::getPetTalents);
}
```

```java
//  查询指定不分页(batchSize=-1)查询。 请注意，你必须在明确不需要分页查询的情况下使用；如果数据量超大不分页可能会卡死。默认不指定分页数的情况下下平台会进行分页查询
try (BatchSizeHintApi batchSizeHintApi = BatchSizeHintApi.use(-1)) {
    PetShopProxy data2 = data.queryById();
    data2.fieldQuery(PetShopProxy::getPetTalents);
}
```

