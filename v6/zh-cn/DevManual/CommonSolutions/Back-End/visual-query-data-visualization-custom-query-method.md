---
title: 可视查询：数据可视化-如何自定义查询数据方法
index: true
category:
  - 常见解决方案
order: 4
---
# 一、场景

根据测试商品，汇总数据通过测试统计商品透出到数据可视化图表数据；

+ 统计商品类目的最大库存以及平均售价信息

# 二、测试商品模型

```java
@Model.model(DemoItem.MODEL_MODEL)
@Model(displayName = "测试商品", labelFields = "name")
@Model.Code(sequence = "SEQ", prefix = "IT", size = 8)
public class DemoItem extends CodeModel {

    private static final long serialVersionUID = -5104390780952631397L;

    public static final String MODEL_MODEL = "demo.DemoItem";

    @Field.String
    @Field(displayName = "商品名称")
    private String name;

    @Field.Html
    @Field(displayName = "商品描述")
    private String description;

    @Field.Money(D=2)
    @Field(displayName = "商品价格")
    private BigDecimal itemPrice;

    @Field.Integer
    @Field(displayName = "商品库存")
    private Long inventoryQuantity;

    ....
```

# 三、测试商品统计

```java
@Model.model(DemoItemStatistics.MODEL_MODEL)
@Model(displayName = "测试商品统计", labelFields = "name")
public class DemoItemStatistics extends IdModel {

    private static final long serialVersionUID = 5626273740800455515L;

    public static final String MODEL_MODEL = "demo.DemoItemStatistics";


    @Field.String
    @Field(displayName = "类目名称")
    private String categoryName;

    @Field.Integer
    @Field(displayName = "商品库存")
    private Long inventoryQuantity;

    @Field.Money
    @Field(displayName = "商品价格")
    private BigDecimal itemPrice;
}

```



# 四、自定义商品类目统计数据

:::info 注意：

图表设计器能获取到的接口需指定：category = FunctionCategoryEnum.QUERY_PAGE，且出参和入参类型要与本示例一致

:::

```java
@Function.Advanced(type = FunctionTypeEnum.QUERY, displayName = "商品统计列表", category = FunctionCategoryEnum.QUERY_PAGE)
@Function.fun(FunctionConstants.queryPage)
@Function(openLevel = {FunctionOpenEnum.LOCAL, FunctionOpenEnum.REMOTE, FunctionOpenEnum.API})
public Pagination<DemoItemStatistics> queryPage(Pagination<DemoItemStatistics> page, IWrapper<DemoItemStatistics> queryWrapper) {
    List<DemoItemStatistics> list = new ArrayList<>();

    List<DemoItem> items = demoItemService.queryListByWrapper(Pops.<DemoItem>lambdaQuery()
                                                              .from(DemoItem.MODEL_MODEL)
                                                              .eq(DemoItem::getStatus, ItemStatusEnum.ACTIVE));
    if(CollectionUtils.isEmpty(items)) return page;
    Map<Long, List<DemoItem>> itemMap = items.stream().collect(Collectors.groupingBy(DemoItem::getCategoryId));

    for (Map.Entry<Long, List<DemoItem>> longListEntry : itemMap.entrySet()) {
        long categoryId = longListEntry.getKey();
        List<DemoItem> demoItems = longListEntry.getValue();

        DemoItemCategory itemCategory = new DemoItemCategory().queryById(categoryId);
        DemoItemStatistics itemStatistics = new DemoItemStatistics();
        itemStatistics.setCategoryName(itemCategory.getName());
        //该类目商品的平均价
        itemStatistics.setItemPrice(BigDecimal.valueOf(demoItems.stream().mapToDouble(t->t.getItemPrice().floatValue()).average().getAsDouble()));
        //该类目商品的最大库存
        itemStatistics.setInventoryQuantity(demoItems.stream().mapToLong(t->t.getInventoryQuantity()).max().getAsLong());
        list.add(itemStatistics);
    }
    page.setContent(list);
    return page;
}

```

# 五、场景图表效果

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/161715999965_.pic_-20250530144829499.jpg)

# 六、传输模型定义自定义查询方法

## （一）定义传输模型

```java
package pro.shushi.pamirs.demo.api.tmodel;

import pro.shushi.pamirs.meta.annotation.Field;
import pro.shushi.pamirs.meta.annotation.Model;
import pro.shushi.pamirs.meta.base.TransientModel;

import java.math.BigDecimal;

@Model.model(DemoItemTransient.MODEL_MODEL)
@Model(displayName = "商品传输模型")
public class DemoItemTransient extends TransientModel {

    public static final String MODEL_MODEL = "demo.DemoItemTransient";

    @Field.Integer
    @Field(displayName ="id")
    private Long id;

    @Field.String
    @Field(displayName ="名称")
    private String name;

    @Field.Money(D=2)
    @Field(displayName = "商品价格")
    private BigDecimal itemPrice;

}
```

## （二）定义传输模型查询数据方法

```java
package pro.shushi.pamirs.demo.core.action;

import org.springframework.stereotype.Component;
import pro.shushi.pamirs.demo.api.model.DemoItem;
import pro.shushi.pamirs.demo.api.tmodel.DemoItemTransient;
import pro.shushi.pamirs.framework.connectors.data.sql.Pops;
import pro.shushi.pamirs.framework.connectors.data.sql.query.LambdaQueryWrapper;
import pro.shushi.pamirs.meta.annotation.Function;
import pro.shushi.pamirs.meta.annotation.Model;
import pro.shushi.pamirs.meta.api.dto.condition.Pagination;
import pro.shushi.pamirs.meta.api.dto.wrapper.IWrapper;
import pro.shushi.pamirs.meta.enmu.FunctionCategoryEnum;
import pro.shushi.pamirs.meta.enmu.FunctionOpenEnum;
import pro.shushi.pamirs.meta.enmu.FunctionTypeEnum;

import java.util.List;
import java.util.stream.Collectors;

@Component
@Model.model(DemoItemTransient.MODEL_MODEL)
public class DemoItemTransientAction {

    @Function.Advanced(type = FunctionTypeEnum.QUERY, displayName = "查询列表", category = FunctionCategoryEnum.QUERY_PAGE)
    @Function(openLevel = {FunctionOpenEnum.LOCAL, FunctionOpenEnum.REMOTE})
    public Pagination<DemoItemTransient> queryPage(Pagination<DemoItemTransient> page, IWrapper<DemoItemTransient> queryWrapper) {
        Pagination<DemoItem> itemPage = new Pagination<>();
        itemPage.setCurrentPage(page.getCurrentPage());
        itemPage.setSize(page.getSize());

        LambdaQueryWrapper<DemoItem> lambdaQueryWrapper = Pops.<DemoItem>lambdaQuery().from(DemoItem.MODEL_MODEL);
        Pagination<DemoItem> result = new DemoItem().queryPage(itemPage, lambdaQueryWrapper);
        List<DemoItemTransient> list = result.getContent().stream().map(a -> {
            DemoItemTransient item = new DemoItemTransient();
            item.setId(a.getId());
            item.setName(a.getName());
            item.setItemPrice(a.getItemPrice());
            return item;
        }).collect(Collectors.toList());

        page.setContent(list);
        return page;
    }
}
```

