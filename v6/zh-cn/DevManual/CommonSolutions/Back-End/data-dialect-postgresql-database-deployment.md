---
title: 数据方言：【PostgreSQL】后端部署使用PostgreSQL数据库
index: true
category:
  - 常见解决方案
order: 41
---

# 一、驱动配置
## （一）Maven配置（14.3版本可用）
```xml
<postgresql.version>42.6.0</postgresql.version>
<dependency>
  <groupId>org.postgresql</groupId>
  <artifactId>postgresql</artifactId>
  <version>${postgresql.version}</version>
</dependency>

```

## （二）离线驱动下载
[postgresql-42.2.18.jar](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/drivers/pgsql/postgresql-42.2.18.jar)
[postgresql-42.6.0.jar](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/drivers/pgsql/postgresql-42.6.0.jar)
[postgresql-42.7.3.jar](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/drivers/pgsql/postgresql-42.7.3.jar)

# 二、JDBC连接配置
```yaml
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

注：更多 YAML 配置请前往 [Module API](/zh-cn/DevManual/Reference/Back-EndFramework/module-API.md) 查阅。

## （一）连接url配置
暂无官方资料

## （二）url格式
```plain
jdbc:postgresql://${host}:${port}/${database}?currentSchema=${schema}
```

:::danger 警告：

在jdbc连接配置时，${database} 和 ${schema} 必须完整配置，不可缺省。

:::

其他连接参数如需配置，可自行查阅相关资料进行调优。

# 三、方言配置
## （一）pamirs方言配置
```yaml
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

注：更多 YAML 配置请前往 [Module API](/zh-cn/DevManual/Reference/Back-EndFramework/module-API.md) 查阅。

| 数据库版本 | type | version | majorVersion |
| --- | --- | --- | --- |
| 14.x | PostgreSQL | 14 | 14.3 |


:::info 注意：

由于方言开发环境为`14.3`版本，其他类似版本（14.x）原则上不会出现太大差异，如出现其他版本无法正常支持的，可在文档下方留言。

:::

## （二）schedule方言配置
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

| type | version | majorVersion |
| --- | --- | --- |
| PostgreSQL | 14 | 14.3 |


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
        logic-delete-value: (EXTRACT(epoch FROM CURRENT_TIMESTAMP) * 1000000 + EXTRACT(MICROSECONDS FROM CURRENT_TIMESTAMP))::bigint
```

## （二）PostgreSQL 数据库用户初始化及授权
```sql
-- init root user (user name can be modified by oneself)

CREATE USER root WITH PASSWORD 'password';

-- if using automatic database and schema creation, this is very important.
ALTER USER root CREATEDB;

SELECT * FROM pg_roles;

-- if using postgres database, this authorization is required.
GRANT CREATE ON DATABASE postgres TO root;
```

