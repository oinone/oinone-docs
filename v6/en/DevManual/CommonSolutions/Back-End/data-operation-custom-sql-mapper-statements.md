---
title: Data Operations:Custom SQL (Mapper) Statements
index: true
category:
  - Common Solutions
order: 35
---

# I. Scenario Description
In real-world business scenarios, complex SQL situations often arise, including:
+ When single-table SQL cannot meet business requirements.
+ Involving complex JOIN relationships or subqueries.
+ When implementing complex SQL logic through programmatic means is too difficult or costly.

In such cases, we can leverage native MyBatis/MyBatis-Plus and use custom Mappers to achieve business functionality.

# II. Writing the Required Mapper
> There are no restrictions on how to write SQL Mappers. The usage is the same as native MyBatis/MyBatis-Plus. Mappers (i.e., DAOs) and SQL can be written in a single file or separated into two files.

```java
package pro.shushi.pamirs.demo.core.map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

@Mapper
public interface DemoItemMapper {
    @Select("<script>select sum(item_price) as itemPrice,sum(inventory_quantity) as inventoryQuantity,categoryId from ${demoItemTable}  as core_demo_item ${where}  group by category_id</script>")
    List<Map<String, Object>> groupByCategoryId(@Param("demoItemTable") String pamirsUserTable, @Param("where") String where);
}
```

# III. Invoking the Mapper
## (Ⅰ) Example Code for Invoking the Mapper
```java
package pro.shushi.pamirs.demo.core.map;

import com.google.api.client.util.Lists;
import org.springframework.stereotype.Component;
import pro.shushi.pamirs.demo.api.model.DemoItem;
import pro.shushi.pamirs.framework.connectors.data.api.datasource.DsHintApi;
import pro.shushi.pamirs.meta.api.core.orm.convert.DataConverter;
import pro.shushi.pamirs.meta.api.session.PamirsSession;
import pro.shushi.pamirs.meta.common.spring.BeanDefinitionUtils;

import java.util.List;
import java.util.Map;

@Component
public class DemoItemDAO {
    public List<DemoItem> customSqlDemoItem(){
        try (DsHintApi dsHint = DsHintApi.model(DemoItem.MODEL_MODEL)) {
            String demoItemTable = PamirsSession.getContext().getModelCache().get(DemoItem.MODEL_MODEL).getTable();

            DemoItemMapper demoItemMapper = BeanDefinitionUtils.getBean(DemoItemMapper.class);
            String where = " where status = 'ACTIVE'";
            List<Map<String, Object>> dataList = demoItemMapper.groupByCategoryId(demoItemTable,where);
            DataConverter persistenceDataConverter = BeanDefinitionUtils.getBean(DataConverter.class);
            return persistenceDataConverter.out(DemoItem.MODEL_MODEL, dataList);
        }
        return Lists.newArrayList();
    }
}
```

## (Ⅱ) Notes on Invoking the Mapper
+ The startup class needs to configure the Mapper scan package.
```java
@MapperScan(value = "pro.shushi", annotationClass = Mapper.class)
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class, FreeMarkerAutoConfiguration.class})
public class DemoApplication {
```

+ When invoking the Mapper interface, you must specify the data source. As shown in the example code `DsHintApi dsHint = DsHintApi.model(DemoItem.MODEL_MODEL)`, use the try-with-resources syntax in your code.

+ Extracting data from the Mapper return results:
  - If the SQL Mapper already defines a resultMap, the return type after invoking the Mapper (i.e., DAO) will be a Java object.
  - If the Mapper returns `Map<String, Object>`, use `DataConverter.out` for conversion, as shown in the example above.