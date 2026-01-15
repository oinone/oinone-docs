---
title: Data Dialect:[PostgreSQL] Backend Deployment with PostgreSQL Database
index: true
category:
  - Common Solutions
order: 41
---

# I. Driver Configuration
## (Ⅰ) Maven Configuration (Suitable for Version 14.3)
``` xml
<postgresql.version>42.6.0</postgresql.version>
<dependency>
  <groupId>org.postgresql</groupId>
  <artifactId>postgresql</artifactId>
  <version>${postgresql.version}</version>
</dependency>
```

## (Ⅱ) Offline Driver Download
[postgresql-42.2.18.jar](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/drivers/pgsql/postgresql-42.2.18.jar)
[postgresql-42.6.0.jar](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/drivers/pgsql/postgresql-42.6.0.jar)
[postgresql-42.7.3.jar](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/drivers/pgsql/postgresql-42.7.3.jar)

# II. JDBC Connection Configuration
``` yaml
pamirs:
  datasource:
    base:
      type: com.alibaba.druid.pool.DruidDataSource
      driverClassName: org.postgresql.Driver
      url: jdbc:postgresql://127.0.0.1:5432/pamirs?currentSchema=base
      username: xxxxxx
      password: xxxxxx
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

**Note**: For more YAML configurations, please refer to [Module API](/en/DevManual/Reference/Back-EndFramework/module-API.md).

## (Ⅰ) Connection URL Configuration
No official documentation available currently.

## (Ⅱ) URL Format
``` plain
jdbc:postgresql://${host}:${port}/${database}?currentSchema=${schema}
```

:::danger Warning:
When configuring the JDBC connection, both `${database}` and `${schema}` must be fully configured and cannot be omitted.
:::

For other connection parameters, you can refer to relevant materials for optimization as needed.

# III. Dialect Configuration
## (Ⅰ) pamirs Dialect Configuration
``` yaml
pamirs:
  dialect:
    ds:
      base:
        type: PostgreSQL
        version: 14
        major-version: 14.3
      pamirs:
        type: PostgreSQL
        version: 14
        major-version: 14.3
```

**Note**: For more YAML configurations, please refer to [Module API](/en/DevManual/Reference/Back-EndFramework/module-API.md).

| Database Version | type | version | majorVersion |
| --- | --- | --- | --- |
| 14.x | PostgreSQL | 14 | 14.3 |

:::info Note:
Since the dialect development environment is Version 14.3, other similar versions (14.x) generally will not have significant differences. If you encounter issues with unsupported versions, please leave a comment below the document.
:::

## (Ⅱ) Schedule Dialect Configuration
``` yaml
pamirs:
  event:
    enabled: true
    schedule:
      enabled: true
      dialect:
        type: PostgreSQL
        version: 14
        major-version: 14.3
```

| type | version | majorVersion |
| --- | --- | --- |
| PostgreSQL | 14 | 14.3 |

:::info Note:
As there are no obvious differences in the schedule dialect across multiple versions, only one dialect configuration is provided currently.
:::

# IV. Other Configurations
## (Ⅰ) Logical Deletion Value Configuration
``` yaml
pamirs:
  mapper:
    global:
      table-info:
        logic-delete-value: (EXTRACT(epoch FROM CURRENT_TIMESTAMP) * 1000000 + EXTRACT(MICROSECONDS FROM CURRENT_TIMESTAMP))::bigint
```

## (Ⅱ) PostgreSQL Database User Initialization and Authorization
``` sql
-- init root user (user name can be modified by oneself)

CREATE USER root WITH PASSWORD 'password';

-- if using automatic database and schema creation, this is very important.
ALTER USER root CREATEDB;

SELECT * FROM pg_roles;

-- if using postgres database, this authorization is required.
GRANT CREATE ON DATABASE postgres TO root;
```