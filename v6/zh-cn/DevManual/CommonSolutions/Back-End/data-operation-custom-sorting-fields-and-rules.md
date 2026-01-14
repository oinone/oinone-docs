---
title: 数据操作：查询时自定义排序字段和排序规则
index: true
category:
  - 常见解决方案
order: 33
---

# 一、指定字段排序
平台默认排序字段，参考 IdModel ，按创建时间和ID倒序`ordering = "createDate DESC, id DESC"`

## （一）模型指定排序
模型定义增加排序字段。`@Model.Advanced(ordering = "xxxxx DESC, yyyy DESC")`

```java
@Model.model(PetShop.MODEL_MODEL)
@Model(displayName = "宠物店铺",summary="宠物店铺",labelFields ={"shopName"})
@Model.Code(sequence = "DATE_ORDERLY_SEQ",prefix = "P",size=6,step=1,initial = 10000,format = "yyyyMMdd")
@Model.Advanced(ordering = "createDate DESC")
public class PetShop extends AbstractDemoIdModel {
    public static final String MODEL_MODEL="demo.PetShop";
    //其它代码
}
```

## （二）Page 查询中可以自定排序规则
+ API 参考 `pro.shushi.pamirs.meta.api.dto.condition.Pagination#orderBy`

```java
public <G, R> Pagination<T> orderBy(SortDirectionEnum direction, Getter<G, R> getter) {
    if (null == getSort()) {
        setSort(new Sort());
    }
    getSort().addOrder(direction, getter);
    return this;
}
```

+ 具体示例

```java
@Function.Advanced(type= FunctionTypeEnum.QUERY)
@Function.fun(FunctionConstants.queryPage)
@Function(openLevel = {FunctionOpenEnum.API})
public Pagination<PetShop> queryPage(Pagination<PetShop> page, IWrapper<PetShop> queryWrapper){
    page.orderBy(SortDirectionEnum.DESC, PetShop::getCreateDate);
    page = new PetShop().queryPage(page, queryWrapper);
    return page;
}
```

## （三）查询的 wapper 中指定
+ API参考：`pro.shushi.pamirs.framework.connectors.data.sql.AbstractWrapper#orderBy`

```java
@Override
public Children orderBy(boolean condition, boolean isAsc, R... columns) {
    if (ArrayUtils.isEmpty(columns)) {
        return typedThis;
    }
    SqlKeyword mode = isAsc ? ASC : DESC;
    for (R column : columns) {
        doIt(condition, ORDER_BY, columnToString(column), mode);
    }
    return typedThis;
}
```

具体示例

```java
public List<PetShop> queryList(String name) {
    List<PetShop> petShops = Models.origin().queryListByWrapper(
        Pops.<PetShop>lambdaQuery().from(PetShop.MODEL_MODEL)
        .orderBy(true, true, PetShop::getCreateDate)
        .orderBy(true, true, PetShop::getId)
        .like(PetShop::getShopName, name));
    return petShops;
}
```

# 二、设置查询不排序
## （一）关闭平台默认排序字段，设置模型的 ordering，改成：`ordering = "1=1"`
模型定义增加排序字段。`@Model.Advanced(ordering = "1=1")`

```java
@Model.model(PetShop.MODEL_MODEL)
@Model(displayName = "宠物店铺",summary="宠物店铺",labelFields ={"shopName"})
@Model.Code(sequence = "DATE_ORDERLY_SEQ",prefix = "P",size=6,step=1,initial = 10000,format = "yyyyMMdd")
@Model.Advanced(ordering = "1=1")
public class PetShop extends AbstractDemoIdModel {
    public static final String MODEL_MODEL="demo.PetShop";
    //其它代码
}
```

在`ORDER BY 1=1`中，`1=1` 是一个条件表达式，它总是会返回 true（或者在某些数据库中是1），因为1等于1。因此，这个条件实际上没有改变排序的结果，结果仍然会按照默认的顺序进行排序。这种写法通常用于一些动态生成 SQL 语句的场景中，可以在不知道具体列名的情况下按照顺序进行排序。

所以，`ORDER BY 1=1`实际上等效于没有使用`ORDER BY`子句，或者说是按照默认顺序进行排序。

## （二）查询是设置 Sortable 属性
```java
// 示例1：
LambdaQueryWrapper<PetShop> query = Pops.<PetShop>lambdaQuery();
query.from(PetShop.MODEL_MODEL);
query.setSortable(Boolean.FALSE);
query.orderBy(true, true, PetShop::getId);
List<PetShop> petShops2 = new PetShop().queryList(query);
System.out.printf(petShops2.size() + "");

// 示例2：
List<PetShop> petShops3 = new PetShop().queryList(
    Pops.<PetShop>lambdaQuery().from(PetShop.MODEL_MODEL).setSortable(Boolean.FALSE));
System.out.printf(petShops3.size() + "");

// 示例3：
IWrapper<PetShop> wrapper = Pops.<PetShop>lambdaQuery()
.from(PetShop.MODEL_MODEL).setBatchSize(-1).setSortable(Boolean.FALSE);
List<PetShop> petShops4 = new PetShop().queryList(wrapper);
System.out.printf(petShops4.size() + "");

// 示例4：
QueryWrapper<PetShop> wrapper2 = new QueryWrapper<PetShop>().from(PetShop.MODEL_MODEL).setSortable(Boolean.FALSE);
List<PetShop> petShops5 = new PetShop().queryList(wrapper2);
System.out.printf(petShops5.size() + "");
```

