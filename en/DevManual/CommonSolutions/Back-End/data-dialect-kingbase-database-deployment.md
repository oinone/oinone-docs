---
title: Data Dialect:【KDB】Using Kingbase Database (Renmin Kingbase/KE Kingbase) for Backend Deployment
index: true
category:
  - Common Solutions
order: 38
---

# Ⅰ、Driver Configuration

## （Ⅰ）Maven Configuration

[Click to view official driver documentation](https://help.kingbase.com.cn/v9/development/client-interfaces/jdbc/jdbc-1.html#id3)

:::info Note:

The `9.0.0` version mentioned in the official driver documentation has not been pushed to public repositories yet, so the `8.6.0` version is used as a substitute.

:::

```xml
<kdb.version>8.6.0</kdb.version>
<dependency>
  <groupId>cn.com.kingbase</groupId>
  <artifactId>kingbase8</artifactId>
  <version>${kdb.version}</version>
</dependency>
```

## （Ⅱ）Offline Driver Download

[kingbase8-8.6.0.jar](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/drivers/kdb/kingbase8-8.6.0.jar)

# Ⅱ、JDBC Connection Configuration

```yaml
pamirs:
  datasource:
    base:
      type: com.alibaba.druid.pool.DruidDataSource
      driverClassName: com.kingbase8.Driver
      url: jdbc:kingbase8://127.0.0.1:4321/pamirs?currentSchema=base&autosave=always&cleanupSavepoints=true
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
      validConnectionCheckerClassName: com.alibaba.druid.pool.vendor.PGValidConnectionChecker
```

Note: For more YAML configurations, please refer to [Module API](/en/DevManual/Reference/Back-EndFramework/module-API.md).

:::info Attention

The `validConnectionCheckerClassName` configuration is crucial. Connection liveness checking is an important configuration for the connection pool to maintain connections. The Druid connection pool can automatically identify most database types, but since the `jdbc:kingbase8` protocol is not built-in for identification, manual configuration is required.

:::

## （Ⅰ）Connection URL Configuration

[Click to view official JDBC connection configuration instructions](https://help.kingbase.com.cn/v9/development/client-interfaces/jdbc/jdbc-2.html#id2)

## （Ⅱ）URL Format

```plain
jdbc:kingbase8://${host}:${port}/${database}?currentSchema=${schema}&autosave=always&cleanupSavepoints=true
```

:::danger Warning:

When configuring the JDBC connection, ${database} and ${schema} must be configured and cannot be omitted. `autosave=always` and `cleanupSavepoints=true` are mandatory transaction parameters; otherwise, transaction rollback behavior will differ from other databases, causing partial operation failures.

:::

For other connection parameters, you can refer to relevant materials for optimization as needed.

# Ⅲ、Dialect Configuration

## （Ⅰ）Pamirs Dialect Configuration

```yaml
pamirs:
  dialect:
    ds:
      base:
        type: KDB
        version: 9
        major-version: V009R001C001B0030
      pamirs:
        type: KDB
        version: 9
        major-version: V009R001C001B0030
```

| Database Version        | type | version | majorVersion      |
| ----------------- | ---- | ------- | ----------------- |
| V009R001C001B0030 | KDB  | 9       | V009R001C001B0030 |
| V008R006C008B0020 | KDB  | 9       | V009R001C001B0030 |


:::info Note:

Since the dialect development environment uses version `V009R001C001B0030`, other similar versions should not have significant differences. If you encounter issues with unsupported versions, please leave a comment below the document.

:::

## （Ⅱ）Schedule Dialect Configuration

```yaml
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

Note: For more YAML configurations, please refer to [Module API](/en/DevManual/Reference/Back-EndFramework/module-API.md).

| type       | version | majorVersion |
| ---------- | ------- | ------------ |
| PostgreSQL | 14      | 14.3         |


:::info Note:

Since the schedule dialect does not differ significantly from the PostgreSQL database, the Kingbase database can directly use the PostgreSQL database dialect.

:::

# Ⅳ、Other Configurations

## （Ⅰ）Logical Delete Value Configuration

```yaml
pamirs:
  mapper:
    global:
      table-info:
        logic-delete-value: (EXTRACT(epoch FROM CURRENT_TIMESTAMP) * 1000000 + EXTRACT(MICROSECONDS FROM CURRENT_TIMESTAMP))::bigint
```

# Ⅴ、Key Parameter Check for KDB Database

:::info Note:

The following parameters are the database parameters used when the Oinone platform connects to KDB. You can try to start the database if the parameters do not match.

:::

## （Ⅰ）Database Mode

Recommended configuration: `DB_MODE=oracle`

Configured during database installation/initialization

## （Ⅱ）Case Sensitivity

Recommended configuration: `enable_ci=off`

## （Ⅲ）Enable Statement-Level Rollback

Recommended configuration: `ora_statement_level_rollback = off`

```sql
show ora_statement_level_rollback;

set ora_statement_level_rollback=off;
```

This parameter did not show the expected effect in the version used for Oinone platform integration. According to official documentation, this parameter should have the same effect as the `autosave=always&cleanupSavepoints=true` configuration in the database connection string. Since this parameter configuration is ineffective, these two parameters must be specified in the database connection string.

The Oinone platform was initially developed based on the transaction characteristics of the MySQL database, which does not support statement-level rollback transaction behavior. Therefore, to ensure the normal functionality of the Oinone platform, it is necessary to maintain consistent transaction behavior.

Inconsistencies may lead to abnormal functionality, such as errors when the process designer first publishes a timer-triggered workflow, or import/export tasks failing to update task status normally.

## （Ⅳ）Treat Empty Strings as NULL

Recommended configuration: `ora_input_emptystr_isnull = off`

```sql
show ora_input_emptystr_isnull;

set ora_input_emptystr_isnull=off;
```

# Ⅵ、KDB Database User Initialization and Authorization

```sql
-- Initialize root user (user name can be modified by oneself)

CREATE USER root WITH PASSWORD 'password';

-- If using automatic database and schema creation, this is very important.
ALTER USER root CREATEDB;

SELECT * FROM pg_roles;

-- If using Kingbase database, this authorization is required.
GRANT CREATE ON DATABASE kingbase TO root;
```

# Ⅶ、Common Database Operation and Maintenance Scripts

:::info Note:

The following scripts can be directly executed in a Docker container. For other environments, please refer to the [official deployment documentation](https://help.kingbase.com.cn/v9/install-updata/install-docker/install-docker-1.html).

:::

```shell
# Stop the database service
/home/kingbase/install/kingbase/bin/sys_ctl -D /home/kingbase/userdata/data/ stop

# Start the database service
/home/kingbase/install/kingbase/bin/sys_ctl -D /home/kingbase/userdata/data/ start

# Reload the configuration file after modification
/home/kingbase/install/kingbase/bin/sys_ctl reload -D  /home/kingbase/userdata/data/
```