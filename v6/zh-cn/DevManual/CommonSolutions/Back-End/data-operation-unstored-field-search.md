---
title: 数据操作：非存储字段搜索（unstore field seach）
index: true
category:
  - 常见解决方案
order: 36
---

# 一、非存储字段搜索
## （一）描述
当依据本模型以外的信息作为搜索条件时，往往会将这些字段设置在代理模型上。我们把这类场景称作非存储字段搜索。

## （二）场景一
非存储字段属于基本的字符串类型（String）。

1、代码定义：非存储字段为基本的包装数据类型

```java
@Field(displayName = "确认密码", store = NullableBoolEnum.FALSE)
private String confirmPassword;
```

2、设计器拖拽：列表中需要有退拽这个字段，字段是否隐藏的逻辑自身业务是否需要决定。
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/1692579048643-e5b09afe-7bb7-44e0-ba31-0940ca43fcba.png)
3、当页面以非存储字段作为基本的包装数据类型来进行搜索时，相关信息会拼接到 `queryWrapper` 的属性 `queryData` 中。其中，`queryData` 是一个 `Map` 类型，其 `key` 为字段名，`value` 则是搜索值。
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/1692579279272-cf0b669a-963d-4e78-b9b7-cc302be9e0ad.png)
4、后台逻辑处理代码示例：

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

## （三）场景二
非存储字段为非存储对象。

1、定义为非存储的

```java
@Field(displayName = "款", store = NullableBoolEnum.FALSE)
@Field.many2one
@Field.Relation(store = false)
private MesProduct product;
```

2、页面在搜索栏拖拽非存储字段作为搜索条件

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/1692601763717-658fb442-7948-465f-9b61-41363ddc2430.png)
3、后台逻辑处理代码示例：

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
            //找出两个bom列表的并集
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
    log.error("queryData处理异常", e);
}
```

:::info 注意：

如果这样定义：

:::

```java
@Field(displayName = "款",store = NullableBoolEnum.FALSE)
@Field.Relation(relationFields = "produceId", referenceFields = "id",store = false)
@Field.many2one
private MesProduct product;

@Field(displayName = "款Id",store = NullableBoolEnum.FALSE)
private Long produceId;

```

:::info 搜索时 produceId 选择 product 搜索是 produceId 会被拼接在 QueryWrapper 的 Rsql 中

:::

# 二、Rsql解析类
`pro.shushi.pamirs.framework.gateways.rsql.RSQLHelper`

# 三、Rsql参考代码
```java
/**
     * Rsql解析 将属性字段值从QueryWrapper中originRsql属性值的Rsql解出来
     * 将原有条件替换成 ’1‘==’1‘
     *
     * @param queryWrapper 查询Wrapper
     * @param fields       需要解析出来的属性字段列表
     * @param valeMap      属性对应值的Map
     * @return 返回生产单Id列表
     */

public static QueryWrapper convertWrapper(QueryWrapper queryWrapper, List<String> fields, Map<String, Object> valeMap) {
    if (StringUtils.isNotBlank(queryWrapper.getOriginRsql())) {
        String rsql = RSQLHelper.toTargetString(RSQLHelper.parse(queryWrapper.getModel(), queryWrapper.getOriginRsql()), new RSQLNodeConnector() {
            @Override
            public String comparisonConnector(RSQLNodeInfo nodeInfo) {
                //判断字段为unStore，则进行替换
                String field = nodeInfo.getField();
                if (fields.contains(field)) {
                    valeMap.put(field, nodeInfo.getArguments().get(0));
                    RSQLNodeInfo newNode = new RSQLNodeInfo(nodeInfo.getType());
                    //设置查询字段为name
                    newNode.setField("1");
                    newNode.setOperator(RsqlSearchOperation.EQUAL.getOperator());
                    newNode.setArguments(Collections.singletonList("1"));
                    return super.comparisonConnector(newNode);
                }
                return super.comparisonConnector(nodeInfo);
            }
        });
        queryWrapper = Pops.f(Pops.query().from(queryWrapper.getModel())).get();
        //把RSQL转换成SQL
        String sql = RsqlParseHelper.parseRsql2Sql(queryWrapper.getModel(), rsql);
        if (StringUtils.isNotBlank(sql)) {
            queryWrapper.apply(sql);
        }
        return queryWrapper;
    }
    return queryWrapper;
}
```

