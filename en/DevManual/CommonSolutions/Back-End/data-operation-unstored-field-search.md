---
title: Data Operation:Unstored Field Search
index: true
category:
  - Common Solutions
order: 36
---

# 一、Unstored Field Search
## (一) Description
When using information outside the current model as search conditions, these fields are often set in the proxy model. This scenario is referred to as unstored field search.

## (二) Scenario One
The unstored field is of basic string type (String).

1. Code Definition: The unstored field is a basic wrapper data type

```java
@Field(displayName = "Confirm Password", store = NullableBoolEnum.FALSE)
private String confirmPassword;
```

2. Designer Drag-and-Drop: The field needs to be draggable in the list, and the logic for whether the field is hidden is determined by business requirements.
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/1692579048643-e5b09afe-7bb7-44e0-ba31-0940ca43fcba.png)
3. When the page searches using an unstored field as a basic wrapper data type, relevant information is appended to the `queryData` attribute of `queryWrapper`. `queryData` is a `Map` type where the `key` is the field name and the `value` is the search value.
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/1692579279272-cf0b669a-963d-4e78-b9b7-cc302be9e0ad.png)
4. Backend logic processing code example:

```java
Map<String, Object> queryData = queryWrapper.getQueryData();
if (null != queryData) {
    Object productIdObj = queryData.get(PRODUCT_ID);
    if (Objects.nonNull(productIdObj)) {
        String productId = productIdObj.toString();
        queryWrapper.lambda().eq(MesProduceOrderProxy::getProductId, productId);
    }
}
```

## (三) Scenario Two
The unstored field is an unstored object.

1. Defined as unstored

```java
@Field(displayName = "Style", store = NullableBoolEnum.FALSE)
@Field.many2one
@Field.Relation(store = false)
private MesProduct product;
```

2. The page drags the unstored field as a search condition in the search bar

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/1692601763717-658fb442-7948-465f-9b61-41363ddc2430.png)
3. Backend logic processing code example:

```java
try {
    if (null != queryData && !queryData.isEmpty()) {
        List<Long> detailId = null;
        BasicSupplier supplier = JsonUtils.parseMap2Object((Map<String, Object>) queryData.get(supplierField), BasicSupplier.class);
        MesProduct product = JsonUtils.parseMap2Object((Map<String, Object>) queryData.get(productField), MesProduct.class);
        MesMaterial material = JsonUtils.parseMap2Object((Map<String, Object>) queryData.get(materialField), MesMaterial.class);
        if (supplier != null) {
            detailId = bomService.queryBomDetailIdBySupplierId(supplier.getId());
            if (CollectionUtils.isEmpty(detailId)) {
                detailId.add(-1L);
            }
        }

        if (product != null) {
            List<Long> produceOrderId = produceOrderService.queryProductOrderIdByProductIds(product.getId());
            if (CollectionUtils.isNotEmpty(produceOrderId)) {
                queryWrapper.lambda().in(MesProduceBomSizes::getProduceOrderId, produceOrderId);
            }
        }

        if (material != null) {
            // Find the union of two bom lists
            List<Long> materBomDetailId = bomService.queryBomDetailIdByMaterialId(material.getId());
            if (CollectionUtils.isNotEmpty(detailId)) {
                detailId = detailId.stream().filter(materBomDetailId::contains).collect(Collectors.toList());
            } else {
                detailId = new ArrayList<>();
                if (CollectionUtils.isEmpty(materBomDetailId)) {
                    detailId.add(-1L);
                } else {
                    detailId.addAll(materBomDetailId);
                }
            }
        }
        if (CollectionUtils.isNotEmpty(detailId)) {
            queryWrapper.lambda().in(MesProduceBomSizes::getProductBomId, detailId);
        }
    }
} catch (Exception e) {
    log.error("queryData processing exception", e);
}
```

:::info Note:

If defined as:

:::

```java
@Field(displayName = "Style",store = NullableBoolEnum.FALSE)
@Field.Relation(relationFields = "produceId", referenceFields = "id",store = false)
@Field.many2one
private MesProduct product;

@Field(displayName = "Style Id",store = NullableBoolEnum.FALSE)
private Long produceId;

```

:::info When searching, if produceId is selected for product search, produceId will be concatenated into the Rsql of QueryWrapper

:::

# 二、Rsql Parsing Class
`pro.shushi.pamirs.framework.gateways.rsql.RSQLHelper`

# 三、Rsql Reference Code
```java
/**
     * Rsql parsing: Extract attribute field values from the Rsql in the originRsql attribute of QueryWrapper
     * Replace original conditions with '1'=='1'
     *
     * @param queryWrapper Query Wrapper
     * @param fields       List of attribute fields to be parsed
     * @param valeMap      Map of attribute corresponding values
     * @return List of production order IDs
     */

public static QueryWrapper convertWrapper(QueryWrapper queryWrapper, List<String> fields, Map<String, Object> valeMap) {
    if (StringUtils.isNotBlank(queryWrapper.getOriginRsql())) {
        String rsql = RSQLHelper.toTargetString(RSQLHelper.parse(queryWrapper.getModel(), queryWrapper.getOriginRsql()), new RSQLNodeConnector() {
            @Override
            public String comparisonConnector(RSQLNodeInfo nodeInfo) {
                // Determine if the field is unStored and replace it
                String field = nodeInfo.getField();
                if (fields.contains(field)) {
                    valeMap.put(field, nodeInfo.getArguments().get(0));
                    RSQLNodeInfo newNode = new RSQLNodeInfo(nodeInfo.getType());
                    // Set the query field to "name"
                    newNode.setField("1");
                    newNode.setOperator(RsqlSearchOperation.EQUAL.getOperator());
                    newNode.setArguments(Collections.singletonList("1"));
                    return super.comparisonConnector(newNode);
                }
                return super.comparisonConnector(nodeInfo);
            }
        });
        queryWrapper = Pops.f(Pops.query().from(queryWrapper.getModel())).get();
        // Convert RSQL to SQL
        String sql = RsqlParseHelper.parseRsql2Sql(queryWrapper.getModel(), rsql);
        if (StringUtils.isNotBlank(sql)) {
            queryWrapper.apply(sql);
        }
        return queryWrapper;
    }
    return queryWrapper;
}
```