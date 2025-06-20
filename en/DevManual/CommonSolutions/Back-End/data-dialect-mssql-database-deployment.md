---
title: Data Dialect:[MSSQL] Backend Deployment with MSSQL Database (SQL Server)
index: true
category:
  - Common Solutions
order: 39
---

# I. Driver Configuration
## (一) Maven Configuration (Suitable for 2017 Version)
```xml
<mssql.version>9.4.0.jre8</mssql.version>
<dependency>
  <groupId>com.microsoft.sqlserver</groupId>
  <artifactId>mssql-jdbc</artifactId>
  <version>${mssql.version}</version>
</dependency>
```

## (二) Offline Driver Download
[mssql-jdbc-7.4.1.jre8.jar](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/drivers/mssql/mssql-jdbc-7.4.1.jre8.jar)
[mssql-jdbc-9.4.0.jre8.jar](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/drivers/mssql/mssql-jdbc-9.4.0.jre8.jar)
[mssql-jdbc-12.2.0.jre8.jar](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/drivers/mssql/mssql-jdbc-12.2.0.jre8.jar)

# II. JDBC Connection Configuration
```yaml
pamirs:
  datasource:
    base:
      type: com.alibaba.druid.pool.DruidDataSource
      driverClassName: com.microsoft.sqlserver.jdbc.SQLServerDriver
      url: jdbc:sqlserver://127.0.0.1:1433;DatabaseName=base
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

## (一) Connection URL Configuration
No official documentation available currently.

## (二) URL Format
```plain
jdbc:sqlserver://${host}:${port};DatabaseName=${database}
```

:::danger Warning:
When configuring the JDBC connection, both `${database}` and `${schema}` must be fully configured and cannot be omitted.
:::

For other connection parameters, you can refer to relevant materials for optimization as needed.

# III. Dialect Configuration
## (一) pamirs Dialect Configuration
```yaml
pamirs:
  dialect:
    ds:
      base:
        type: MSSQL
        version: 2017
        major-version: 2017
      pamirs:
        type: MSSQL
        version: 2017
        major-version: 2017
```

**Note**: For more YAML configurations, please refer to [Module API](/en/DevManual/Reference/Back-EndFramework/module-API.md).

| Database Version | type | version | majorVersion |
| --- | --- | --- | --- |
| 2017 | MSSQL | 2017 | 2017 |

:::info Note:
Since the dialect development environment is the 2017 version, other similar versions generally will not have significant differences. If you encounter issues with unsupported versions, please leave a comment below the document.
:::

## (二) Schedule Dialect Configuration
```yaml
pamirs:
  event:
    enabled: true
    schedule:
      enabled: true
      dialect:
        type: MSSQL
        version: 2017
        major-version: 2017
```

| type | version | majorVersion |
| --- | --- | --- |
| MSSQL | 2017 | 2017 |

:::info Note:
As there are no obvious differences in the schedule dialect across multiple versions, only one dialect configuration is provided currently.
:::

# IV. Other Configurations
## (一) Logical Deletion Value Configuration
```yaml
pamirs:
  mapper:
    global:
      table-info:
        logic-delete-value: CAST(DATEDIFF(S, CAST('1970-01-01 00:00:00' AS DATETIME), GETUTCDATE()) AS BIGINT) * 1000000 + DATEPART(NS, SYSUTCDATETIME()) / 100
```

## (二) MSSQL Database User Initialization and Authorization
```sql
-- init root user (user name can be modified by oneself)

CREATE LOGIN [root] WITH PASSWORD = 'password';

-- if using mssql database, this authorization is required.
ALTER SERVER ROLE [sysadmin] ADD MEMBER [root];
```