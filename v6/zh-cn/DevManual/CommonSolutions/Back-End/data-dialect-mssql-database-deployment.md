---
title: 数据方言：【MSSQL】后端部署使用MSSQL数据库（SQLServer）
index: true
category:
  - 常见解决方案
order: 39
---

# 一、驱动配置
## （一）Maven 配置（2017版本可用）
```xml
<mssql.version>9.4.0.jre8</mssql.version>
<dependency>
  <groupId>com.microsoft.sqlserver</groupId>
  <artifactId>mssql-jdbc</artifactId>
  <version>${mssql.version}</version>
</dependency>

```

## （二）离线驱动下载
[mssql-jdbc-7.4.1.jre8.jar](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/drivers/mssql/mssql-jdbc-7.4.1.jre8.jar)
[mssql-jdbc-9.4.0.jre8.jar](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/drivers/mssql/mssql-jdbc-9.4.0.jre8.jar)
[mssql-jdbc-12.2.0.jre8.jar](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/drivers/mssql/mssql-jdbc-12.2.0.jre8.jar)

# 二、JDBC连接配置
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

注：更多 YAML 配置请前往 [Module API](/zh-cn/DevManual/Reference/Back-EndFramework/module-API.md) 查阅。

## （一）连接url配置
暂无官方资料

## （二）url 格式
```plain
jdbc:sqlserver://${host}:${port};DatabaseName=${database}
```

:::danger 警告：

在jdbc连接配置时，${database} 和 ${schema} 必须完整配置，不可缺省。

:::

其他连接参数如需配置，可自行查阅相关资料进行调优。

# 三、方言配置
## （一）pamirs 方言配置
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

注：更多 YAML 配置请前往 [Module API](/zh-cn/DevManual/Reference/Back-EndFramework/module-API.md) 查阅。

| 数据库版本 | type | version | majorVersion |
| --- | --- | --- | --- |
| 2017 | MSSQL | 2017 | 2017 |


:::info 注意：

由于方言开发环境为`2017`版本，其他类似版本原则上不会出现太大差异，如出现其他版本无法正常支持的，可在文档下方留言。

:::

## （二）schedule方言配置
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
        logic-delete-value: CAST(DATEDIFF(S, CAST('1970-01-01 00:00:00' AS DATETIME), GETUTCDATE()) AS BIGINT) * 1000000 + DATEPART(NS, SYSUTCDATETIME()) / 100
```

## （二）MSSQL 数据库用户初始化及授权
```sql
-- init root user (user name can be modified by oneself)

CREATE LOGIN [root] WITH PASSWORD = 'password';

-- if using mssql database, this authorization is required.
ALTER SERVER ROLE [sysadmin] ADD MEMBER [root];
```

