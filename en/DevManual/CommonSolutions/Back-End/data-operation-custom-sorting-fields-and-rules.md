---
title: Data Operation:Custom Sort Fields and Sorting Rules During Query
index: true
category:
  - Common Solutions
order: 33
---

# Ⅰ、Specify Fields for Sorting
The platform's default sorting fields, refer to IdModel, sorted in descending order by creation time and ID: `ordering = "createDate DESC, id DESC"`

## （Ⅰ）Specify Sorting in the Model
Add sorting fields to the model definition. `@Model.Advanced(ordering = "xxxxx DESC, yyyy DESC")`

``` java
@Model.model(PetShop.MODEL_MODEL)
@Model(displayName = "Pet Shop", summary="Pet Shop", labelFields ={"shopName"})
@Model.Code(sequence = "DATE_ORDERLY_SEQ", prefix = "P", size=6, step=1, initial = 10000, format = "yyyyMMdd")
@Model.Advanced(ordering = "createDate DESC")
public class PetShop extends AbstractDemoIdModel {
    public static final String MODEL_MODEL="demo.PetShop";
    // Other code
}
```

## （Ⅱ）Custom Sorting Rules in Page Queries
+ API reference: `pro.shushi.pamirs.meta.api.dto.condition.Pagination#orderBy`

``` java
public <G, R> Pagination<T> orderBy(SortDirectionEnum direction, Getter<G, R> getter) {
    if (null == getSort()) {
        setSort(new Sort());
    }
    getSort().addOrder(direction, getter);
    return this;
}
```

+ Specific Example

``` java
@Function.Advanced(type= FunctionTypeEnum.QUERY)
@Function.fun(FunctionConstants.queryPage)
@Function(openLevel = {FunctionOpenEnum.API})
public Pagination<PetShop> queryPage(Pagination<PetShop> page, IWrapper<PetShop> queryWrapper){
    page.orderBy(SortDirectionEnum.DESC, PetShop::getCreateDate);
    page = new PetShop().queryPage(page, queryWrapper);
    return page;
}
```

## （Ⅲ）Specify in the Query Wrapper
+ API reference: `pro.shushi.pamirs.framework.connectors.data.sql.AbstractWrapper#orderBy`

``` java
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

Specific Example

``` java
public List<PetShop> queryList(String name) {
    List<PetShop> petShops = Models.origin().queryListByWrapper(
        Pops.<PetShop>lambdaQuery().from(PetShop.MODEL_MODEL)
        .orderBy(true, true, PetShop::getCreateDate)
        .orderBy(true, true, PetShop::getId)
        .like(PetShop::getShopName, name));
    return petShops;
}
```

# Ⅱ、Disable Sorting for Queries
## （Ⅰ）Turn Off the Platform's Default Sorting Fields by Setting the Model's Ordering to: `ordering = "1=1"`
Add sorting fields to the model definition. `@Model.Advanced(ordering = "1=1")`

``` java
@Model.model(PetShop.MODEL_MODEL)
@Model(displayName = "Pet Shop", summary="Pet Shop", labelFields ={"shopName"})
@Model.Code(sequence = "DATE_ORDERLY_SEQ", prefix = "P", size=6, step=1, initial = 10000, format = "yyyyMMdd")
@Model.Advanced(ordering = "1=1")
public class PetShop extends AbstractDemoIdModel {
    public static final String MODEL_MODEL="demo.PetShop";
    // Other code
}
```

In `ORDER BY 1=1`, `1=1` is a conditional expression that always returns true (or 1 in some databases) because 1 equals 1. Therefore, this condition does not actually change the sorting result, and the result will still be sorted in the default order. This syntax is commonly used in scenarios where SQL statements are dynamically generated to sort by order when the specific column names are unknown.

So, `ORDER BY 1=1` is actually equivalent to not using an `ORDER BY` clause, or sorting in the default order.

## （Ⅱ）Set the Sortable Property During Query
``` java
// Example 1:
LambdaQueryWrapper<PetShop> query = Pops.<PetShop>lambdaQuery();
query.from(PetShop.MODEL_MODEL);
query.setSortable(Boolean.FALSE);
query.orderBy(true, true, PetShop::getId);
List<PetShop> petShops2 = new PetShop().queryList(query);
System.out.printf(petShops2.size() + "");

// Example 2:
List<PetShop> petShops3 = new PetShop().queryList(
    Pops.<PetShop>lambdaQuery().from(PetShop.MODEL_MODEL).setSortable(Boolean.FALSE));
System.out.printf(petShops3.size() + "");

// Example 3:
IWrapper<PetShop> wrapper = Pops.<PetShop>lambdaQuery()
.from(PetShop.MODEL_MODEL).setBatchSize(-1).setSortable(Boolean.FALSE);
List<PetShop> petShops4 = new PetShop().queryList(wrapper);
System.out.printf(petShops4.size() + "");

// Example 4:
QueryWrapper<PetShop> wrapper2 = new QueryWrapper<PetShop>().from(PetShop.MODEL_MODEL).setSortable(Boolean.FALSE);
List<PetShop> petShops5 = new PetShop().queryList(wrapper2);
System.out.printf(petShops5.size() + "");
```