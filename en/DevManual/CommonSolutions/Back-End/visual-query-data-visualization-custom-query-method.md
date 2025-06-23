---
title: Visual Query:Data Visualization - How to Customize Query Data Methods
index: true
category:
  - Common Solution Approaches
order: 4
---

# I. Scenario
Summarize data based on test products and display aggregated test product statistics in data visualization chart data;

- Statistics on the maximum inventory and average selling price of product categories

# II. Test Product Model
```java
@Model.model(DemoItem.MODEL_MODEL)
@Model(displayName = "Test Product", labelFields = "name")
@Model.Code(sequence = "SEQ", prefix = "IT", size = 8)
public class DemoItem extends CodeModel {

    private static final long serialVersionUID = -5104390780952631397L;

    public static final String MODEL_MODEL = "demo.DemoItem";

    @Field.String
    @Field(displayName = "Product Name")
    private String name;

    @Field.Html
    @Field(displayName = "Product Description")
    private String description;

    @Field.Money(D=2)
    @Field(displayName = "Product Price")
    private BigDecimal itemPrice;

    @Field.Integer
    @Field(displayName = "Product Inventory")
    private Long inventoryQuantity;

    ....
```

# III. Test Product Statistics
```java
@Model.model(DemoItemStatistics.MODEL_MODEL)
@Model(displayName = "Test Product Statistics", labelFields = "name")
public class DemoItemStatistics extends IdModel {

    private static final long serialVersionUID = 5626273740800455515L;

    public static final String MODEL_MODEL = "demo.DemoItemStatistics";


    @Field.String
    @Field(displayName = "Category Name")
    private String categoryName;

    @Field.Integer
    @Field(displayName = "Product Inventory")
    private Long inventoryQuantity;

    @Field.Money
    @Field(displayName = "Product Price")
    private BigDecimal itemPrice;
}
```



# IV. Custom Product Category Statistics Data
:::info Note:
Interfaces accessible by the chart designer must specify `category = FunctionCategoryEnum.QUERY_PAGE`, and the input/output parameter types must match this example.
:::

```java
@Function.Advanced(type = FunctionTypeEnum.QUERY, displayName = "Product Statistics List", category = FunctionCategoryEnum.QUERY_PAGE)
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
        // Average price of products in this category
        itemStatistics.setItemPrice(BigDecimal.valueOf(demoItems.stream().mapToDouble(t->t.getItemPrice().floatValue()).average().getAsDouble()));
        // Maximum inventory of products in this category
        itemStatistics.setInventoryQuantity(demoItems.stream().mapToLong(t->t.getInventoryQuantity()).max().getAsLong());
        list.add(itemStatistics);
    }
    page.setContent(list);
    return page;
}
```

# V. Scenario Chart Effect
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/161715999965_.pic_-20250530144829499.jpg)

# VI. Defining Custom Query Methods for Transfer Models

## (Ⅰ) Define Transfer Model
```java
package pro.shushi.pamirs.demo.api.tmodel;

import pro.shushi.pamirs.meta.annotation.Field;
import pro.shushi.pamirs.meta.annotation.Model;
import pro.shushi.pamirs.meta.base.TransientModel;

import java.math.BigDecimal;

@Model.model(DemoItemTransient.MODEL_MODEL)
@Model(displayName = "Product Transfer Model")
public class DemoItemTransient extends TransientModel {

    public static final String MODEL_MODEL = "demo.DemoItemTransient";

    @Field.Integer
    @Field(displayName ="id")
    private Long id;

    @Field.String
    @Field(displayName ="Name")
    private String name;

    @Field.Money(D=2)
    @Field(displayName = "Product Price")
    private BigDecimal itemPrice;

}
```

## (Ⅱ) Define Query Data Method for Transfer Model
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

    @Function.Advanced(type = FunctionTypeEnum.QUERY, displayName = "Query List", category = FunctionCategoryEnum.QUERY_PAGE)
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