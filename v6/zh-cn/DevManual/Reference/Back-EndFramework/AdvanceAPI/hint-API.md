---
title: 提示 API（Hint API）
index: true
category:
  - 研发手册
  - Reference
  - 后端API
  - Advance API
order: 4

---
# 一、指定数据源 DsHint

## （一）概述

在 Oinone 开发环境中，`DsHintApi`用于强制指定数据查询时所使用的数据源。在实际业务场景中，存在复杂SQL的情况，具体表现为：

+ 单表单SQL满足不了的情况下
+ 有复杂的Join关系或者子查询
+ 复杂SQL的逻辑通过程序逻辑难以实现或实现代价较大

通过原生的mybatis/mybatis-plus, 自定义Mapper的方式实现业务功能，这个时候就可以用`DsHintApi`来结合使用

## （二）API 定义

```java
public static DsHintApi model(String model) {
    // 具体实现
}

public DsHintApi(Object dsKey) {
    // 具体实现
}
```

+ `model(String model)`：通过传入模型编码来指定数据源。模型编码作为数据源选择的依据，方便开发者根据业务模型关联到对应的数据源。
+ `DsHintApi(Object dsKey)`：直接传入数据源名称来指定数据源。这种方式更为直观，适用于明确知道数据源名称的场景。

## （三）使用示例

### 1、注意事项

在代码中务必使用`try - with - resources`语法来使用`DsHintApi`。若不使用该语法，可能会导致数据源错乱等问题，影响数据查询的准确性和系统的稳定性。

### 2、DsHintApi 使用示例

在`try`块内，所有查询操作都会强制使用指定的数据源。

+ **使用方式 1：通过模型编码指定数据源**

```java
try (DsHintApi dsHintApi = DsHintApi.model(PetItem.MODEL_MODEL)) {
    List<PetItem> items = demoItemDAO.customSqlDemoItem();
    PetShopProxy data2 = data.queryById();
    data2.fieldQuery(PetShopProxy::getPetTalents);
}
```

在上述示例中，`DsHintApi.model(PetItem.MODEL_MODEL)`根据`PetItem`的模型编码指定了数据源，确保`try`块内的所有查询都从该指定数据源获取数据。

+ **使用方式 2：通过数据源名称指定数据源**

```java
try (DsHintApi dsHintApi = DsHintApi.use("数据源名称")) {
    List<PetItem> items = demoItemDAO.customSqlDemoItem();
    PetShopProxy data2 = data.queryById();
    data2.fieldQuery(PetShopProxy::getPetTalents);
}
```

此示例中，`DsHintApi.use("数据源名称")`直接通过数据源名称指定了数据源，同样保证`try`块内的查询操作从该数据源获取数据。



# 二、指定批次数量 BatchSizeHint

## （一）使用场景

在 Oinone 开发环境中，`BatchSizeHintApi`则用于强制指定查询的批量数量。在处理大量数据查询时，合理设置查询的批量数量可以优化性能，减少内存消耗和网络传输压力。比如在分页查询或批量数据处理场景中，根据数据量和系统资源情况，精确控制每次查询返回的数据量。

## （二）API 定义

```java
public static BatchSizeHintApi use(Integer batchSize) {
    // 具体实现
}
```

`use(Integer batchSize)`：通过传入一个整数值来指定查询的批量数量。该整数值代表每次查询返回的数据量，特殊值`-1`表示不分页，一次性返回所有符合条件的数据。

## （三）使用示例

### 1、注意事项

在代码中务必使用`try - with - resources`语法来使用`DsHintApi`和`BatchSizeHintApi`。若不使用该语法，可能会导致数据源错乱等问题，影响数据查询的准确性和系统的稳定性。

### 2、BatchSizeHintApi 使用示例

在`try`块内，所有查询操作都会按照指定的`batchSize`进行查询。

+ **指定不分页查询（batchSize = -1）**

```java
try (BatchSizeHintApi batchSizeHintApi = BatchSizeHintApi.use(-1)) {
    PetShopProxy data2 = data.queryById();
    data2.fieldQuery(PetShopProxy::getPetTalents);
}
```

上述示例中，`BatchSizeHintApi.use(-1)`表示在`try`块内的查询将不分页，一次性返回所有符合条件的数据。

