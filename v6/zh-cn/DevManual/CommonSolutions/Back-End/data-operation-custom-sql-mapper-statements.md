---
title: 数据操作：自定义SQL（Mapper）语句
index: true
category:
  - 常见解决方案
order: 35
---

# 一、场景描述
在实际的业务场景里，常常会遭遇复杂 SQL 的情形，其具体体现如下：

+ 当单表单 SQL 无法满足业务需求时；
+ 涉及复杂的 Join 关系，或者存在子查询时；
+ 若通过程序逻辑去实现复杂 SQL 的逻辑，难度较大或者实现成本过高时。

面对这些状况，我们可以借助原生的 MyBatis/MyBatis-Plus，采用自定义 Mapper 的方式来达成业务功能。

# 二、编写所需的Mapper
> SQL Mapper 的撰写方式并无限制，用法与原生的 MyBatis/MyBatis-Plus 一致。Mapper（也就是 DAO）和 SQL 既可以整合在一个文件内书写，也能够分开，分别置于两个文件里撰写。
>

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

# 三、调用mapper
## （一）调用Mapper代码示例
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

## （二）调用Mapper一些说明
+ 启动类需要配置扫描包MapperScan

```java
@MapperScan(value = "pro.shushi", annotationClass = Mapper.class)
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class, FreeMarkerAutoConfiguration.class})
public class DemoApplication {
```

+ 在调用 Mapper 接口时，必须指定数据源。就像上述示例代码中的 `DsHintApi dsHint = DsHintApi.model(DemoItem.MODEL_MODEL)` 那样，在实际编写代码时，要采用 try - with - resources 语法。
+ 从 Mapper 返回的结果里提取数据：
    - 若 SQL Mapper 中已预先定义了 resultMap，那么调用 Mapper（即 DAO）后返回的即为 Java 对象。
    - 要是 Mapper 返回的是 `Map<String, Object>`，则需借助 `DataConverter.out` 来进行转化，具体可参照上述示例。

