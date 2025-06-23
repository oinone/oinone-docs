---
title: Data Operation:Database and Table Sharding with Custom Sharding Rules
index: true
category:
  - Common Solutions
order: 26
---

# Ⅰ、Scenario Description
+ Oinone's database and table sharding solution is based on integration with Sharding-JDBC. Relevant personnel should first master certain Sharding-JDBC knowledge beforehand. [Sharding-JDBC](https://shardingsphere.apache.org/document/current/cn/overview/)
+ Before implementing database and table sharding, it is crucial to clarify the rational selection of the sharding field (also known as the balancing field). This link is of vital importance and is closely related to specific business scenarios. After determining the database and table sharding field, concessions may even need to be made at the functional level. For example, in query management, the sharding field is indispensable as a query condition; otherwise, query efficiency will significantly decrease.
+ Sharding fields are strictly prohibited from being updated. Therefore, at the code level, the update strategy setting class should be set to never update, and it should be set as readonly in the page modification settings.

# Ⅱ、Configuring Sharding Strategies
+ Configure the ShardingModel to use the sharded data source pamirsSharding.
+ Complete the configuration of data sources and sharding rules for pamirsSharding:
    - pamirs.sharding.define is used for creating Oinone database tables.
    - pamirs.sharding.rule is used to configure sharding rules.
+ Properly configure data sources and sharding rules for pamirsSharding.

## （Ⅰ）Specify Data Source for Model
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
        "[demo.ShardingModel]": pamirsSharding  # Configure the library corresponding to the model
```

## （Ⅱ）Sharding Rule Configuration
```yaml
pamirs:
  sharding:
    define:
      data-sources:
        ds: pamirs
        pamirsSharding: pamirs # Declare that the pamirsSharding library corresponds to the pamirs data source
      models:
        "[trigger.PamirsSchedule]":
          tables: 0..13
        "[demo.ShardingModel]":
          tables: 0..7
          table-separator: _
    rule:
      pamirsSharding: # Configure sharding rules for the pamirsSharding library
        actual-ds:
          - pamirs  # Declare that the pamirsSharding library corresponds to the pamirs data source
        sharding-rules:
          # Configure sharding rules, the following configuration is consistent with Sharding-JDBC configuration
          - tables:
              demo_core_sharding_model: # Configuration for demo_core_sharding_model table rules
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

Note: For more YAML configurations, please refer to [Module API](/en/DevManual/Reference/Back-EndFramework/module-API.md).

# Ⅲ、Custom Rules
+ Default rules refer to the commonly used database and table sharding strategies, such as sharding by data volume or hash algorithm. In general cases, default rules are sufficient to meet business needs.
+ However, in some complex business scenarios, default rules may fail to meet actual requirements, and custom settings are required based on specific circumstances. For example, some businesses may have specific data distribution patterns or unique query characteristics, which require customized sharding rules to optimize data access performance or meet specific business needs. In such cases, using custom rules can more effectively adapt to business requirements.

## （Ⅰ）Custom Sharding Rule Examples
### 1、Table Sharding by Month (DATE_MONTH)
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
        throw new IllegalArgumentException("No matching data table found");
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

### 2、Table Sharding by Modulo Based on Specific Field Extraction
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
        throw new IllegalArgumentException("No matching data table found");
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

# Ⅳ、Using Custom Sharding Strategies
## （Ⅰ）Specify Data Source for Model
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

## （Ⅱ）Sharding Rule Configuration
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

Note: For more YAML configurations, please refer to [Module API](/en/DevManual/Reference/Back-EndFramework/module-API.md).

## （Ⅲ）Configure Custom Rule SPI
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/2024051104035339-1024x314-20250530144830015.png)

Configure `org.apache.shardingsphere.sharding.spi.ShardingAlgorithm` under the `resources/META-INF/services` path.

```java
pro.shushi.pamirs.demo.core.sharding.AppUserCodeShardingAlgorithm
pro.shushi.pamirs.demo.core.sharding.DateMonthShardingAlgorithm
```