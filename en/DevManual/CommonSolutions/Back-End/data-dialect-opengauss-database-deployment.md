---
title: Data Dialect:【OpenGauss】Using OpenGauss Database for Backend Deployment
index: true
category:
  - Common Solutions
order: 40
---

# Ⅰ、Driver Configuration
## （Ⅰ）Maven Configuration
Download the driver package from Huawei official website: [gsjdbc4.jar](https://support.huaweicloud.com/mgtg-dws/dws_01_0032.html);

```xml
<dependency>
  <groupId>org.postgresql</groupId>
  <artifactId>gsjdbc</artifactId>
  <version>4</version>
  <scope>system</scope>
  <!-- Both of the following methods are acceptable-->
  <systemPath>${pom.basedir}/libs/gsjdbc4.jar</systemPath>
  <!--<systemPath>/Users/wangxian/java-tools/guassdb/gsjdbc4.jar</systemPath>-->
</dependency>
```

## （Ⅱ）JDBC Connection Configuration
```yaml
pamirs:
  datasource:
    pamirs:
      type: com.alibaba.druid.pool.DruidDataSource
      driverClassName: org.postgresql.Driver
      url: jdbc:postgresql://127.0.0.1:5432/pamirs?currentSchema=demo
      username: XXXXXX
      password: XXXXXX
      initialSize: 5
      maxActive: 200
      minIdle: 5
      maxWait: 60000
      timeBetweenEvictionRunsMillis: 60000
      testWhileIdle: true
      testOnBorrow: false
      testOnReturn: false
      poolPreparedStatements: true
      asyncInit: true
    base:
      type: com.alibaba.druid.pool.DruidDataSource
      driverClassName: org.postgresql.Driver
      url: jdbc:postgresql://127.0.0.1:5432/pamirs?currentSchema=demo_base
      username: XXXXXX
      password: XXXXXX
      initialSize: 5
      maxActive: 200
      minIdle: 5
      maxWait: 60000
      timeBetweenEvictionRunsMillis: 60000
      testWhileIdle: true
      testOnBorrow: false
      testOnReturn: false
      poolPreparedStatements: true
      asyncInit: true
```

## （Ⅲ）Connection URL Configuration
Click to view official documentation: [Official Documentation](https://docs-opengauss.osinfra.cn/zh/docs/5.0.0/docs/GettingStarted/%E8%BF%9E%E6%8E%A5%E6%95%B0%E6%8D%AE%E5%BA%93.html)

### 1、URL Format
```xml
jdbc:postgresql://${host}:${port}/${database}?currentSchema=${schema}
```

:::danger Warning:

When configuring the Pamirs connection, ${database} and ${schema} must be fully configured and cannot be omitted.

:::

For other connection parameters, you can refer to relevant materials for optimization as needed.

## （Ⅳ）Dialect Configuration
### 1、Pamirs Dialect Configuration
```yaml
pamirs:
  dialect:
    ds:
      base:
        type: GaussDB
        version: 5
        majorVersion: 5.0.1
      pamirs:
        type: GaussDB
        version: 5
        majorVersion: 5.0.1
```

| Database Version | type | version | majorVersion |
| --- | --- | --- | --- |
| 5.x | GaussDB | 5 | 5.0.1 |


:::info Note:

Since the dialect development environment uses version `5.0.1`, other similar versions (5.x) should not have significant differences. If you encounter unsupported versions, please leave a comment below the document.

:::

### 2、Schedule Dialect Configuration
```yaml
pamirs:
  event:
    enabled: true
    schedule:
      enabled: true
      dialect:
        type: GaussDB
        version: 5
        major-version: 5.0.1
```

Note: For more YAML configurations, please refer to [Module API](/en/DevManual/Reference/Back-EndFramework/module-API.md).

| type | version | majorVersion |
| --- | --- | --- |
| GaussDB | 5 | 5.0.1 |


:::info Note:

Since there are no obvious differences in the schedule dialect across multiple versions, only one dialect configuration is provided currently.

:::

## （Ⅴ）Other Configurations
### 1、Logical Delete Value Configuration
```yaml
pamirs:
  mapper:
    global:
      table-info:
        logic-delete-value: (EXTRACT(epoch FROM CURRENT_TIMESTAMP) * 1000000 + EXTRACT(MICROSECONDS FROM CURRENT_TIMESTAMP))::bigint
```

# Ⅱ、Gauss Database User Initialization and Authorization
```sql
-- init root user (user name can be modified by oneself)
-- Create user wangxian
CREATE USER wangxian PASSWORD 'wx@123456';
-- If using automatic database and schema creation, this is very important.
-- Grant system permission CREATEDB to user wangxian
ALTER USER wangxian CREATEDB;

SELECT * FROM pg_roles;
-- If using Gauss database, this authorization is required.
GRANT CREATE ON DATABASE pamirs TO root;
```

# Ⅲ、Considerations for Migrating Data from MySQL to Gauss Database
Since the configuration of MySQL auto-increment IDs is in the table creation statement, while Gauss uses a separate sequence table to record auto-increment IDs, the auto-increment ID data needs to be migrated independently after data synchronization.

## （Ⅰ）Models Using Auto-increment IDs in Built-in Platform Modules:
+ `LeafAlloc` in `base` module
+ `WorkerNode` in `base` module
+ `PamirsSchedule` in `trigger` module
+ `EipLog` in `eip` module
+ `ModelMetaChangeRecord` in `designerCommon` module

Demonstration of migration SQL, please modify the database name according to the actual situation. Skip executing corresponding SQL for modules without dependencies. For migrating business models, refer to the following SQL:

```sql
SELECT setval('demo_base.leaf_alloc_id_seq', (select id from demo_base.leaf_alloc order by id desc limit 1), true);

SELECT setval('demo_base.base_worker_node_id_seq', (select id from demo_base.base_worker_node order by id desc limit 1), true);

SELECT setval('demo_pamirs.pamirs_schedule_0_id_seq', (select id from demo_pamirs.pamirs_schedule_0 order by id desc limit 1), true);

SELECT setval('demo_pamirs.eip_eip_log_id_seq', (select id from demo_pamirs.eip_eip_log order by id desc limit 1), true);

SELECT setval('demo_pamirs.common_model_meta_change_record_id_seq', (select id from demo_pamirs.common_model_meta_change_record order by id desc limit 1), true);
```

# Ⅳ、How to Manually Set Auto-increment Sequence Values in Gauss
## （Ⅰ）Using the `setval` Function
The `setval` function directly sets the current value of a sequence, suitable for scenarios requiring precise control over sequence values.

+ The first parameter of `setval` is the sequence name.
+ The second parameter is the value to set (e.g., 10).
+ The third parameter indicates whether to set the `is_called` flag to `true`, meaning the next `nextval` call returns the set value.

## （Ⅱ）Example Operations
Assume your full sequence name is `demo_pamirs.pamirs_schedule_0_id_seq`, where `demo_pamirs` is the database name. The specific steps are as follows:

1. Reset the current value of the sequence:
```sql
# Set the sequence to 10
SELECT setval('demo_pamirs.pamirs_schedule_0_id_seq', 10, true);
```

2. Verify the new sequence value:
```sql
# The last_value field shows 10
SELECT * FROM demo_pamirs.pamirs_schedule_0_id_seq;
```