---
title: 数据方言：【DM】后端部署使用Dameng数据库（达梦）
index: true
category:
  - 常见解决方案
order: 37
---

# 一、驱动配置
达梦数据库的服务端版本与驱动版本需保持匹配一致。强烈建议选用服务端安装过程中所提供的 JDBC 驱动，避免采用官方 Maven 仓库中的驱动。

当出现 “表 xx 中不能同时包含聚集 KEY 和大字段” 的报错时，在建表阶段应明确指定非聚集主键。可通过执行 `SELECT * FROM V$DM_INI WHERE PARA_NAME = 'PK_WITH_CLUSTER';` 语句查询相关配置信息，随后使用 `SP_SET_PARA_VALUE (1,'PK_WITH_CLUSTER',0)`语句进行参数设置。

## （一）Maven 配置 DM8（目前 maven 仓库最新版本）
```xml
<dm.version>8.1.2.192</dm.version>
<dependency>
  <groupId>com.dameng</groupId>
  <artifactId>DmJdbcDriver18</artifactId>
  <version>${dm.version}</version>
</dependency>

```

:::info 注意：

8.1.3.12版本驱动需要手动上传到nexus仓库使用，本文包含该版本相关内容。

:::

## （二）Maven配置 DM7
```xml
<dm7.version>7.6.1.120</dm7.version>
<dependency>
  <groupId>com.dameng</groupId>
  <artifactId>Dm7JdbcDriver18</artifactId>
  <version>${dm7.version}</version>
</dependency>

```

:::info 注意：

7.6.1.120版本驱动需要手动上传到nexus仓库使用，本文包含该版本相关内容。

:::

## （三）离线驱动下载
[Dm7JdbcDriver18-7.6.1.120.jar](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/drivers/dm/Dm7JdbcDriver18-7.6.1.120.jar)
[DmJdbcDriver18-8.1.3.12.jar](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/drivers/dm/DmJdbcDriver18-8.1.3.12.jar)

# 二、JDBC 连接配置
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

注：更多 YAML 配置请前往 [Module API](/zh-cn/DevManual/Reference/Back-EndFramework/module-API.md) 查阅。

## （一）连接url配置
点击查看官方文档：[DM JDBC 编程指南](https://eco.dameng.com/document/dm/zh-cn/pm/jdbc-rogramming-guide.html)

### 1、连接串1
```yaml
jdbc:dm://127.0.0.1:5236?schema=BASE&clobAsString=true&columnNameUpperCase=false&useUnicode=true&characterEncoding=utf8&compatibleMode=mysql
```

:::info 注意：

`schema`参数在低版本驱动区分大小写，高版本驱动不再区分大小写，为了避免错误，统一使用全大写。`columnNameUpperCase`参数与官方介绍不一致，为了避免错误，需要显式指定。

:::

### 2、连接串2
```yaml
jdbc:dm://127.0.0.1:5236/BASE?clobAsString=true&useUnicode=true&characterEncoding=utf8&compatibleMode=mysql
```

:::info 注意：

可能是未来更高版本中使用的连接串形式。

:::

达梦数据库在不同驱动版本下需要使用不同的连接串进行处理，具体可参考下表：
（使用错误的连接串将无法正常启动）

| Dm7JdbcDriver18版本 | Build-Time | 使用的连接串类型 | 是否支持指定schema | schema是否区分大小写 | 是否可用 | 不可用原因 |
| --- | --- | --- | --- | --- | --- | --- |
| 7.6.0.165 | 2019.06.04 | 1 | 否 | 是 | 否 | 不支持LocalDateTime类型 |
| 7.6.1.120（建议） | 2022.09.14 | 1 | 是 | 是 | 是 | - |


| DmJdbcDriver18版本 | Build-Time | 使用的连接串类型 | 是否支持指定schema | schema是否区分大小写 | 是否可用 | 不可用原因 |
| --- | --- | --- | --- | --- | --- | --- |
| 8.1.2.192 | 2023.01.12 | 1 | 是 | 否 | 是 | - |
| 8.1.3.12（建议） | 2023.04.17 | 2 | 是 | 否 | 是 | - |


# 三、方言配置
## （一）pamirs 方言配置
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

| 数据库版本 | type | version | majorVersion |
| --- | --- | --- | --- |
| 7-20220916 | DM | 7 | 20220916 |
| 8-20230418 | DM | 8 | 8 |


## （二）schedule方言配置
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


:::info 注意：

由于`schedule`的方言在多个版本中并无明显差异，目前仅提供一种方言配置。

:::

# 四、其他配置
## （一）逻辑删除的值配置
```yaml
pamirs:
  mapper:
    global:
      table-info:
        logic-delete-value: (CAST(SYSTIMESTAMP AS TIMESTAMP) - CAST(TIMESTAMP '1970-01-01 08:00:00' AS TIMESTAMP)) * 8640000000000
```

## （二）达梦数据库用户初始化及授权
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

