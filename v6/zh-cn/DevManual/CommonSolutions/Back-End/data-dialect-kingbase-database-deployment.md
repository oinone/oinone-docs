---
title: 数据方言：【KDB】后端部署使用Kingbase数据库（人大金仓/电科金仓）
index: true
category:
  - 常见解决方案
order: 38
---

# 一、驱动配置

## （一）Maven配置

[点击查看官方驱动说明](https://help.kingbase.com.cn/v9/development/client-interfaces/jdbc/jdbc-1.html#id3)

:::info 注意：

官方驱动说明中的`9.0.0`版本目前并未推送至公共仓库，因此使用`8.6.0`版本替代。

:::

```xml
<kdb.version>8.6.0</kdb.version>
<dependency>
  <groupId>cn.com.kingbase</groupId>
  <artifactId>kingbase8</artifactId>
  <version>${kdb.version}</version>
</dependency>

```

## （二）离线驱动下载

[kingbase8-8.6.0.jar](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/drivers/kdb/kingbase8-8.6.0.jar)

# 二、JDBC连接配置

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

注：更多 YAML 配置请前往 [Module API](/zh-cn/DevManual/Reference/Back-EndFramework/module-API.md) 查阅。

:::info 注意

`validConnectionCheckerClassName`配置非常重要，连接存活检查是连接池可以保持连接的重要配置。`Druid`连接池可以自动识别大多数的数据库类型，由于`jdbc:kingbase8`协议属于非内置识别的类型，因此需要手动配置。

:::

## （一）连接url配置

[点击查看官方JDBC连接配置说明](https://help.kingbase.com.cn/v9/development/client-interfaces/jdbc/jdbc-2.html#id2)

## （二）url格式

```plain
jdbc:kingbase8://${host}:${port}/${database}?currentSchema=${schema}&autosave=always&cleanupSavepoints=true
```

:::danger 警告：

在jdbc连接配置时，${database} 和 ${schema} 必须配置，不可缺省。`autosave=always`、`cleanupSavepoints=true`属于必须配置的事务参数，否则事务回滚行为与其他数据库不一致，会导致部分操作失败。

:::

其他连接参数如需配置，可自行查阅相关资料进行调优。

# 三、方言配置

## （一）pamirs方言配置

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

| 数据库版本        | type | version | majorVersion      |
| ----------------- | ---- | ------- | ----------------- |
| V009R001C001B0030 | KDB  | 9       | V009R001C001B0030 |
| V008R006C008B0020 | KDB  | 9       | V009R001C001B0030 |


:::info 注意：

由于方言开发环境为`V009R001C001B0030`版本，其他类似版本原则上不会出现太大差异，如出现其他版本无法正常支持的，可在文档下方留言。

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

注：更多 YAML 配置请前往 [Module API](/zh-cn/DevManual/Reference/Back-EndFramework/module-API.md) 查阅。

| type       | version | majorVersion |
| ---------- | ------- | ------------ |
| PostgreSQL | 14      | 14.3         |


:::info 注意：

由于`schedule`的方言与`PostgreSQL`数据库并无明显差异，`Kingbase`数据库可以直接使用`PostgreSQL`数据库方言。

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

# 五、KDB数据库关键参数检查

:::info 注意：

以下参数为Oinone平台接入KDB时使用的数据库参数，参数不一致时可尝试启动。

:::

## （一）数据库模式

推荐配置：`DB_MODE=oracle`

数据库安装/初始化时配置

## （二）是否大小写敏感

推荐配置：`enable_ci=off`

## （三）是否启用语句级回滚

推荐配置：`ora_statement_level_rollback = off`

```sql
show ora_statement_level_rollback;

set ora_statement_level_rollback=off;
```

此参数在 Oinone 平台接入时使用的版本中未体现出应有的效果。从官方提供的文档来看，此参数与数据库连接串上的`autosave=always&cleanupSavepoints=true`配置结果应该是一致的，由于此参数配置无效，因此在数据库连接串上必须指定这两个参数。

Oinone 平台在最初开发时使用的是基于 mysql 数据库的事务特性，即不支持语句级回滚的事务行为。因此，为了保证 Oinone 平台功能正常，需要使得事务行为保持一致。

如不一致，则可能出现某些功能无法正常使用的情况。如：流程设计器首次发布定时触发的工作流时会出现报错；导入/导出任务出现异常无法正常更新任务状态等。

## （四）是否将空字符串视为NULL

推荐配置：`ora_input_emptystr_isnull = off`

```sql
show ora_input_emptystr_isnull;

set ora_input_emptystr_isnull=off;
```

# 六、KDB 数据库用户初始化及授权

```sql
-- init root user (user name can be modified by oneself)

CREATE USER root WITH PASSWORD 'password';

-- if using automatic database and schema creation, this is very important.
ALTER USER root CREATEDB;

SELECT * FROM pg_roles;

-- if using kingbase database, this authorization is required.
GRANT CREATE ON DATABASE kingbase TO root;
```

# 七、常用数据库运维脚本

:::info 注意：

以下脚本在`docker`容器中可直接执行，其他环境请参考[官方部署文档](https://help.kingbase.com.cn/v9/install-updata/install-docker/install-docker-1.html)。

:::

```shell
# 停止数据库服务
/home/kingbase/install/kingbase/bin/sys_ctl -D /home/kingbase/userdata/data/ stop

# 启动数据服务
/home/kingbase/install/kingbase/bin/sys_ctl -D /home/kingbase/userdata/data/ start

# 修改配置文件后加载配置文件
/home/kingbase/install/kingbase/bin/sys_ctl reload -D  /home/kingbase/userdata/data/
```

