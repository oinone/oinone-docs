---
title: 数据操作：分库分表与自定义分表规则
index: true
category:
  - 常见解决方案
order: 26
---

# 一、场景描述
+ Oinone 的分库分表方案，乃是基于与 Sharding - JDBC 的整合方案 。在此之前，相关人员需预先掌握一定的 Sharding - JDBC 知识 。[Sharding - JDBC](https://shardingsphere.apache.org/document/current/cn/overview/)
+ 在实施分库分表操作前，务必明确一个关键要点，即分表字段（亦称均衡字段）的合理选择。此环节至关重要，与具体业务场景紧密相关。在确定分库分表字段之后，甚至可能需要在功能层面做出某些让步。例如，在查询管理中，分库分表字段作为查询条件是不可或缺的，否则将导致查询效率显著降低 。
+ 分表字段严禁进行更新操作。因此，在代码层面，需将更新策略设置类设定为永不更新，并在页面修改设置中将其设为 readonly 。

# 二、配置分表策略
+ 对 ShardingModel 模型进行配置，使其采用分库分表的数据源 pamirsSharding 。
+ 针对 pamirsSharding 完成数据源以及 sharding 规则的配置 ：
    - pamirs.sharding.define 应用于 oinone 数据库表的创建工作 。
    - pamirs.sharding.rule 用于执行分表规则的配置任务 。
+ 为 pamirsSharding 妥善配置数据源以及 sharding 规则 。

##  （一）指定模型对应数据源
```yaml
pamirs:
  framework:
    system:
      system-ds-key: base
      system-models:
        - base.WorkerNode
    data:
      default-ds-key: pamirs
      ds-map:
        base: base
      modelDsMap:
        "[demo.ShardingModel]": pamirsSharding  #配置模型对应的库
```

## （二）分库分表规则配置
```yaml
pamirs:
  sharding:
    define:
      data-sources:
        ds: pamirs
        pamirsSharding: pamirs #申明pamirsSharding库对应的pamirs数据源
      models:
        "[trigger.PamirsSchedule]":
          tables: 0..13
        "[demo.ShardingModel]":
          tables: 0..7
          table-separator: _
    rule:
      pamirsSharding: #配置pamirsSharding库的分库分表规则
        actual-ds:
          - pamirs  #申明pamirsSharding库对应的pamirs数据源
        sharding-rules:
          # Configure sharding rule ，以下配置跟sharding-jdbc配置一致
          - tables:
              demo_core_sharding_model: #demo_core_sharding_model表规则配置
                actualDataNodes: pamirs.demo_core_sharding_model_${0..7}
                tableStrategy:
                  standard:
                    shardingColumn: user_id
                    shardingAlgorithmName: table_inline
            shardingAlgorithms:
              table_inline:
                type: INLINE
                props:
                  algorithm-expression: demo_core_sharding_model_${(Long.valueOf(user_id) % 8)}
        props:
          sql.show: true
```

注：更多 YAML 配置请前往 [Module API](/zh-cn/DevManual/Reference/Back-EndFramework/module-API.md) 查阅。

# 三、自定义规则
+ 默认规则，即普遍适用的分库分表策略，常见方式包括依据数据量、采用哈希算法等实施分库分表操作。在一般情形下，默认规则足以满足业务需求。
+ 然而，在部分复杂的业务场景中，默认规则可能难以契合实际需求，此时需依据具体情况进行自定义设置。例如，某些业务可能存在特定的数据分布模式，或具有独特的查询特点，这就要求定制化的分库分表规则，以优化数据访问性能或满足特定业务需求。在此类情况下，运用自定义规则能够更有效地适配业务要求。

## （一）自定义分表规则示例
### 1、按月份分表（DATE_MONTH ）
```java
package pro.shushi.pamirs.demo.core.sharding;

import cn.hutool.core.date.DateUtil;
import com.google.common.collect.Range;
import org.apache.shardingsphere.sharding.api.sharding.standard.PreciseShardingValue;
import org.apache.shardingsphere.sharding.api.sharding.standard.RangeShardingValue;
import org.apache.shardingsphere.sharding.api.sharding.standard.StandardShardingAlgorithm;
import org.springframework.stereotype.Component;
import pro.shushi.pamirs.meta.annotation.fun.extern.Slf4j;

import java.util.*;

/**
 * @author wangxian
 * @version 1.0
 * @description
 */
@Component
@Slf4j
public class DateMonthShardingAlgorithm implements StandardShardingAlgorithm<Date> {

    private Properties props;

    @Override
    public String doSharding(Collection<String> availableTargetNames, PreciseShardingValue<Date> preciseShardingValue) {
        Date date = preciseShardingValue.getValue();
        String suffix = "_" + (DateUtil.month(date) + 1);
        for (String tableName : availableTargetNames) {
            if (tableName.endsWith(suffix)) {
                return tableName;
            }
        }
        throw new IllegalArgumentException("未找到匹配的数据表");
    }

    @Override
    public Collection<String> doSharding(Collection<String> availableTargetNames, RangeShardingValue<Date> rangeShardingValue) {
        List<String> list = new ArrayList<>();
        log.info(rangeShardingValue.toString());
        Range<Date> valueRange = rangeShardingValue.getValueRange();
        Date lowerDate = valueRange.lowerEndpoint();
        Date upperDate = valueRange.upperEndpoint();
        Integer begin = DateUtil.month(lowerDate) + 1;
        Integer end = DateUtil.month(upperDate) + 1;
        TreeSet<String> suffixList = ShardingUtils.getSuffixListForRange(begin, end);
        for (String tableName : availableTargetNames) {
            if (containTableName(suffixList, tableName)) {
                list.add(tableName);
            }
        }
        return list;
    }

    private boolean containTableName(Set<String> suffixList, String tableName) {
        boolean flag = false;
        for (String s : suffixList) {
            if (tableName.endsWith(s)) {
                flag = true;
                break;
            }
        }
        return flag;
    }

    @Override
    public void init() {

    }

    @Override
    public String getType() {
        return "DATE_MONTH";
    }

    @Override
    public Properties getProps() {
        return this.props;
    }

    @Override
    public void setProps(Properties properties) {
        this.props = props;
    }
}
```

### 2、按特定字段截取去取模分表
```java
package pro.shushi.pamirs.demo.core.sharding;

import org.apache.shardingsphere.sharding.api.sharding.standard.PreciseShardingValue;
import org.apache.shardingsphere.sharding.api.sharding.standard.RangeShardingValue;
import org.apache.shardingsphere.sharding.api.sharding.standard.StandardShardingAlgorithm;
import org.springframework.stereotype.Component;
import pro.shushi.pamirs.meta.annotation.fun.extern.Slf4j;

import java.util.Collection;
import java.util.Properties;

/**
 * @author wangxian
 * @version 1.0
 * @description
 */
@Component
@Slf4j
public class AppUserCodeShardingAlgorithm implements StandardShardingAlgorithm<String> {

    private Properties props;

    @Override
    public String doSharding(Collection<String> availableTargetNames, PreciseShardingValue<String> preciseShardingValue) {
        String appUserCode = preciseShardingValue.getValue();
        String suffix = "_" + Long.parseLong(appUserCode.substring(1)) % 21;
        for (String tableName : availableTargetNames) {
            if (tableName.endsWith(suffix)) {
                return tableName;
            }
        }
        throw new IllegalArgumentException("未找到匹配的数据表");
    }

    @Override
    public Collection<String> doSharding(final Collection<String> availableTargetNames, final RangeShardingValue<String> shardingValue) {
        return availableTargetNames;
    }

    @Override
    public String getType() {
        return "APP_USER_CODE_TYPE";
    }

    @Override
    public Properties getProps() {
        return this.props;
    }

    @Override
    public void setProps(Properties properties) {
        this.props = props;
    }

    @Override
    public void init() {

    }
}
```

# 四、使用自定义分表策略
## （一）指定模型对应数据源
```yaml
pamirs:
  framework:
    system:
      system-ds-key: base
      system-models:
        - base.WorkerNode
    data:
      default-ds-key: pamirs_biz
      ds-map:
        base: base
        demo_core: pamirs
      modelDsMap:
        "[demo.record.MsgRecode]": pamirsSharding
```

## （二）分库分表规则配置
```yaml
pamirs:
  sharding:
    define:
      data-sources:
        ds: pamirs
        pamirsSharding: pamirs
      models:
        "[trigger.PamirsSchedule]":
          tables: 0..13
        "[demo.record.MsgRecode]":
          tables: 0..20
          table-separator: _
    rule:
      pamirsSharding:
        actual-ds:
          - pamirs
        sharding-rules:
          - tables:
              demo_core_record_msg_recode:
                actualDataNodes: pamirs.demo_core_record_msg_recode_${0..20}
                tableStrategy:
                  standard:
                    shardingColumn: app_user_code
                    shardingAlgorithmName: app_user_code_table_algorithm
            shardingAlgorithms:
              app_user_code_table_algorithm:
                type: APP_USER_CODE_TYPE
```

注：更多 YAML 配置请前往 [Module API](/zh-cn/DevManual/Reference/Back-EndFramework/module-API.md) 查阅。

## （三）配置自定义规则SPI
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/2024051104035339-1024x314-20250530144830015.png)

在 `resources/META - INF/services` 路径下，对 `org.apache.shardingsphere.sharding.spi.ShardingAlgorithm` 进行配置 。

```java
pro.shushi.pamirs.demo.core.sharding.AppUserCodeShardingAlgorithm
pro.shushi.pamirs.demo.core.sharding.DateMonthShardingAlgorithm
```

