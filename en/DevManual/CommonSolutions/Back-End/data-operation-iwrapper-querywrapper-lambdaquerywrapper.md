---
title: Data Operation:Usage of IWrapper, QueryWrapper, and LambdaQueryWrapper
index: true
category:
  - Common Solutions
order: 24
---

# Ⅰ. Conditional Update (updateByWrapper)
Normally, when performing an update, we create a new object to reduce the number of fields being updated.

```java
Integer update = new DemoUser().updateByWrapper(new DemoUser().setFirstLogin(Boolean.FALSE),
                                                Pops.<DemoUser>lambdaUpdate().from(DemoUser.MODEL_MODEL).eq(IdModel::getId, userId));
```

Method to update specified fields using the `updateById` method of the base model:

+ Create a new update object and update this object.

```java
WorkflowUserTask userTaskUp = new WorkflowUserTask();
userTaskUp.setId(userTask.getId());
userTaskUp.setNodeContext(json);
userTaskUp.updateById();
```

# Ⅱ. Conditional Deletion (updateByWrapper)
```java
public List<T> delete(List<T> data) {
    List<Long> petTypeIdList = new ArrayList<>();
    for (T item : data) {
        petTypeIdList.add(item.getId());
    }
    Models.data().deleteByWrapper(Pops.<PetType>lambdaQuery().from(PetType.MODEL_MODEL).in(PetType::getId, petTypeIdList));
    return data;
}
```

# Ⅲ. Construct Conditional Query Data
+ Example 1: LambdaQueryWrapper to concatenate query conditions

```java
private void queryPetShops() {
    LambdaQueryWrapper<PetShop> query = Pops.<PetShop>lambdaQuery();
    query.from(PetShop.MODEL_MODEL);
    query.setSortable(Boolean.FALSE);
    query.orderBy(true, true, PetShop::getId);
    List<PetShop> petShops2 = new PetShop().queryList(query);
    System.out.printf(petShops2.size() + "");
}
```

+ Example 2: IWrapper to concatenate query conditions

```java
private void queryPetShops() {
    IWrapper<PetShop> wrapper = Pops.<PetShop>lambdaQuery()
    .from(PetShop.MODEL_MODEL).eq(PetShop::getId, 1L);
    List<PetShop> petShops4 = new PetShop().queryList(wrapper);
    System.out.printf(petShops4.size() + "");
}
```

+ Example 3: QueryWrapper to concatenate query conditions

```java
private void queryPetShops() {
    // Use Lambda to get the field name to prevent missing changes when modifying the field name later
    String nameField = LambdaUtil.fetchFieldName(PetTalent::getName);
    // Use Lambda to get the column name to prevent missing changes when modifying the field name later
    String nameColumn = PStringUtils.fieldName2Column(nameField);
    QueryWrapper<PetShop> wrapper2 = new QueryWrapper<PetShop>().from(PetShop.MODEL_MODEL)
    .eq(nameColumn, "test");
    List<PetShop> petShops5 = new PetShop().queryList(wrapper2);
    System.out.printf(petShops5.size() + "");
}
```

## Convert IWrapper to LambdaQueryWrapper
```java
@Function.Advanced(type = FunctionTypeEnum.QUERY)
@Function.fun(FunctionConstants.queryPage)
@Function(openLevel = {FunctionOpenEnum.API})
public Pagination<PetShopProxy> queryPage(Pagination<PetShopProxy> page, IWrapper<PetShopProxy> queryWrapper) {
    LambdaQueryWrapper<PetShopProxy> wrapper = ((QueryWrapper<PetShopProxy>) queryWrapper).lambda();
    // Get non-stored fields from QueryData
    Map<String, Object> queryData = queryWrapper.getQueryData();
    if (null != queryData && !queryData.isEmpty()) {
        String codes = (String) queryData.get("codes");
        if (org.apache.commons.lang3.StringUtils.isNotBlank(codes)) {
            wrapper.in(PetShopProxy::getCode, codes.split(","));
        }
    }

    return new PetShopProxy().queryPage(page, wrapper);
}
```