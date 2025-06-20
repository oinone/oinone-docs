---
title: Data Dialect:[DM] Backend Deployment with Dameng Database
index: true
category:
  - Common Solutions
order: 37
---

# I. Driver Configuration
The server version of Dameng database must match the driver version. It is strongly recommended to use the JDBC driver provided during the server installation, avoiding drivers from the official Maven repository.

When encountering an error "Table xx cannot contain both clustered KEY and large fields", specify a non-clustered primary key during table creation. Query configuration via `SELECT * FROM V$DM_INI WHERE PARA_NAME = 'PK_WITH_CLUSTER';` and set parameters with `SP_SET_PARA_VALUE (1,'PK_WITH_CLUSTER',0)`.

## (一) Maven Configuration for DM8 (Latest Version in Maven Repository)
```xml
<dm.version>8.1.2.192</dm.version>
<dependency>
  <groupId>com.dameng</groupId>
  <artifactId>DmJdbcDriver18</artifactId>
  <version>${dm.version}</version>
</dependency>
```

:::info Note:

The 8.1.3.12 driver version needs to be manually uploaded to the Nexus repository, and relevant content for this version is included in this document.

:::

## (二) Maven Configuration for DM7
```xml
<dm7.version>7.6.1.120</dm7.version>
<dependency>
  <groupId>com.dameng</groupId>
  <artifactId>Dm7JdbcDriver18</artifactId>
  <version>${dm7.version}</version>
</dependency>
```

:::info Note:

The 7.6.1.120 driver version needs to be manually uploaded to the Nexus repository, and relevant content for this version is included in this document.

:::

## (三) Offline Driver Download
[Dm7JdbcDriver18-7.6.1.120.jar](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/drivers/dm/Dm7JdbcDriver18-7.6.1.120.jar)
[DmJdbcDriver18-8.1.3.12.jar](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/drivers/dm/DmJdbcDriver18-8.1.3.12.jar)

# II. JDBC Connection Configuration
```yaml
pamirs:
  datasource:
    base:
      type: com.alibaba.druid.pool.DruidDataSource
      driverClassName: dm.jdbc.driver.DmDriver
      # url: jdbc:dm://127.0.0.1:5236/BASE?clobAsString=true&useUnicode=true&characterEncoding=utf8&compatibleMode=mysql
      url: jdbc:dm://127.0.0.1:5236?schema=BASE&clobAsString=true&columnNameUpperCase=false&useUnicode=true&characterEncoding=utf8&compatibleMode=mysql
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
      validConnectionCheckerClassName: com.alibaba.druid.pool.vendor.OracleValidConnectionChecker
      validationQuery: SELECT 1 FROM DUAL
```

Note: For more YAML configurations, refer to [Module API](/en/DevManual/Reference/Back-EndFramework/module-API.md).

## (一) Connection URL Configuration
Click to view the official document: [DM JDBC Programming Guide](https://eco.dameng.com/document/dm/en/pm/jdbc-rogramming-guide.html)

### 1. Connection String 1
```yaml
jdbc:dm://127.0.0.1:5236?schema=BASE&clobAsString=true&columnNameUpperCase=false&useUnicode=true&characterEncoding=utf8&compatibleMode=mysql
```

:::info Note:

The `schema` parameter is case-sensitive in lower-version drivers and case-insensitive in higher-version drivers. To avoid errors, use all uppercase uniformly. The `columnNameUpperCase` parameter differs from official documentation, so explicit specification is required.

:::

### 2. Connection String 2
```yaml
jdbc:dm://127.0.0.1:5236/BASE?clobAsString=true&useUnicode=true&characterEncoding=utf8&compatibleMode=mysql
```

:::info Note:

This may be the connection string format for future higher versions.

:::

Dameng database requires different connection strings for different driver versions, as shown in the table below: (Using incorrect connection strings will prevent normal startup)

| Dm7JdbcDriver18 Version | Build-Time | Connection String Type | Schema Specification Supported | Schema Case Sensitivity | Available | Reason for Unavailability |
| --- | --- | --- | --- | --- | --- | --- |
| 7.6.0.165 | 2019.06.04 | 1 | No | Yes | No | Does not support LocalDateTime type |
| 7.6.1.120 (Recommended) | 2022.09.14 | 1 | Yes | Yes | Yes | - |


| DmJdbcDriver18 Version | Build-Time | Connection String Type | Schema Specification Supported | Schema Case Sensitivity | Available | Reason for Unavailability |
| --- | --- | --- | --- | --- | --- | --- |
| 8.1.2.192 | 2023.01.12 | 1 | Yes | No | Yes | - |
| 8.1.3.12 (Recommended) | 2023.04.17 | 2 | Yes | No | Yes | - |


# III. Dialect Configuration
## (一) pamirs Dialect Configuration
```yaml
pamirs:
  dialect:
    ds:
      base:
        type: DM
        version: 8
        majorVersion: 8
      pamirs:
        type: DM
        version: 8
        majorVersion: 8
```

| Database Version | type | version | majorVersion |
| --- | --- | --- | --- |
| 7-20220916 | DM | 7 | 20220916 |
| 8-20230418 | DM | 8 | 8 |


## (二) Schedule Dialect Configuration
```yaml
pamirs:
  event:
    schedule:
      dialect:
        type: DM
        version: 8
        majorVersion: 8
```

| type | version | majorVersion |
| --- | --- | --- |
| DM | 8 | 8 |


:::info Note:

As there are no significant differences in the schedule dialect across multiple versions, only one dialect configuration is provided currently.

:::

# IV. Other Configurations
## (一) Logical Deletion Value Configuration
```yaml
pamirs:
  mapper:
    global:
      table-info:
        logic-delete-value: (CAST(SYSTIMESTAMP AS TIMESTAMP) - CAST(TIMESTAMP '1970-01-01 08:00:00' AS TIMESTAMP)) * 8640000000000
```

## (二) Dameng Database User Initialization and Authorization
```sql
-- init oinone role (role name can be modified by oneself)

CREATE ROLE OINONE;

GRANT CREATE SCHEMA,
      CREATE TABLE,
      CREATE INDEX,
      INSERT ANY TABLE,
      UPDATE ANY TABLE,
      select ANY TABLE,
      SELECT ANY VIEW
      TO OINONE;

SELECT * FROM DBA_ROLES;

SELECT * FROM DBA_SYS_PRIVS WHERE GRANTEE='OINONE';

-- init root user (user name can be modified by oneself)

CREATE TABLESPACE ROOT DATAFILE 'ROOT.DBF' SIZE 128;

CREATE USER "root" IDENTIFIED BY "shushi@2019";

ALTER USER "root" DEFAULT TABLESPACE ROOT DEFAULT INDEX TABLESPACE ROOT;

GRANT RESOURCE,OINONE TO ROOT;

select * FROM DBA_ROLE_PRIVS WHERE GRANTEE='ROOT';
```