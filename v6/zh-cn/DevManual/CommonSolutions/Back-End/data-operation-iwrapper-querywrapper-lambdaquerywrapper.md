---
title: 数据操作：IWrapper、QueryWrapper和LambdaQueryWrapper使用
index: true
category:
  - 常见解决方案
order: 24
---

# 一、条件更新（updateByWrapper）
通常我们在更新的时候 new 一个对象出来在去更新，减少更新的字段

```java
Integer update = new DemoUser().updateByWrapper(new DemoUser().setFirstLogin(Boolean.FALSE),
                                                Pops.<DemoUser>lambdaUpdate().from(DemoUser.MODEL_MODEL).eq(IdModel::getId, userId)
```

使用基础模型的 updateById 方法更新指定字段的方法：

+ new 一下 update 对象出来，更新这个对象。

```java
WorkflowUserTask userTaskUp = new WorkflowUserTask();
userTaskUp.setId(userTask.getId());
userTaskUp.setNodeContext(json);
userTaskUp.updateById();
```

# 二、条件删除（updateByWrapper）
```java
public List<T> delete(List<T> data) {
    List<Long> petTypeIdList = new ArrayList();
    for(T item:data){
        petTypeIdList.add(item.getId());
    }
    Models.data().deleteByWrapper(Pops.<PetType>lambdaQuery().from(PetType.MODEL_MODEL).in(PetType::getId,petTypeIdList));
    return data;
}
```

## 三、构造条件查询数据
+ 示例1： LambdaQueryWrapper 拼接查询条件

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

+ 示例2： IWrapper 拼接查询条件

```java
private void queryPetShops() {
    IWrapper<PetShop> wrapper = Pops.<PetShop>lambdaQuery()
    .from(PetShop.MODEL_MODEL).eq(PetShop::getId,1L);
    List<PetShop> petShops4 = new PetShop().queryList(wrapper);
    System.out.printf(petShops4.size() + "");
}
```

+ 示例3： QueryWrapper 拼接查询条件

```java
private void queryPetShops() {
    //使用Lambda获取字段名，防止后面改字段名漏改
    String nameField = LambdaUtil.fetchFieldName(PetTalent::getName);
    //使用Lambda获取Clumon名，防止后面改字段名漏改
    String nameColumn = PStringUtils.fieldName2Column(nameField);
    QueryWrapper<PetShop> wrapper2 = new QueryWrapper<PetShop>().from(PetShop.MODEL_MODEL)
    .eq(nameColumn, "test");
    List<PetShop> petShops5 = new PetShop().queryList(wrapper2);
    System.out.printf(petShops5.size() + "");
}
```

## IWrapper 转为 LambdaQueryWrapper
```java
@Function.Advanced(type= FunctionTypeEnum.QUERY)
@Function.fun(FunctionConstants.queryPage)
@Function(openLevel = {FunctionOpenEnum.API})
public Pagination<PetShopProxy> queryPage(Pagination<PetShopProxy> page, IWrapper<PetShopProxy> queryWrapper) {
    LambdaQueryWrapper<PetShopProxy> wrapper = ((QueryWrapper<PetShopProxy>) queryWrapper).lambda();
    // 非存储字段从QueryData中获取
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

