---
title: 数据方言：【OpenGauss】后端部署使用OpenGauss高斯数据库
index: true
category:
  - 常见解决方案
order: 40
---

# 一、驱动配置
## （一）Maven 配置
去华为官网下周驱动包：[gsjdbc4.jar](https://support.huaweicloud.com/mgtg-dws/dws_01_0032.html)；

```xml
<dependency>
  <groupId>org.postgresql</groupId>
  <artifactId>gsjdbc</artifactId>
  <version>4</version>
  <scope>system</scope>
  <!-- 下面两种方式都可以-->
  <systemPath>${pom.basedir}/libs/gsjdbc4.jar</systemPath>
  <!--<systemPath>/Users/wangxian/java-tools/guassdb/gsjdbc4.jar</systemPath>-->
</dependency>

```

## （二）JDBC连接配置
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

## （三）连接url配置
点击查看官方文档：[官方文档](https://docs-opengauss.osinfra.cn/zh/docs/5.0.0/docs/GettingStarted/%E8%BF%9E%E6%8E%A5%E6%95%B0%E6%8D%AE%E5%BA%93.html)

### 1、  url格式
```xml
jdbc:postgresql://${host}:${port}/${database}?currentSchema=${schema}
```

:::danger 警告：

在pamirs连接配置时，${database} 和 ${schema} 必须完整配置，不可缺省。

:::

其他连接参数如需配置，可自行查阅相关资料进行调优。

## （四）方言配置
### 1、pamirs方言配置
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

| 数据库版本 | type | version | majorVersion |
| --- | --- | --- | --- |
| 5.x | GaussDB | 5 | 5.0.1 |


:::info 注意：

由于方言开发环境为`5.0.1`版本，其他类似版本（5.x）原则上不会出现太大差异，如出现其他版本无法正常支持的，可在文档下方留言。

:::

### 2、schedule方言配置
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

注：更多 YAML 配置请前往 [Module API](/zh-cn/DevManual/Reference/Back-EndFramework/module-API.md) 查阅。

| type | version | majorVersion |
| --- | --- | --- |
| GaussDB | 5 | 5.0.1 |


:::info 注意：

由于`schedule`的方言在多个版本中并无明显差异，目前仅提供一种方言配置。

:::

## （五）其他配置
### 1、逻辑删除的值配置
```yaml
pamirs:
  mapper:
    global:
      table-info:
        logic-delete-value: (EXTRACT(epoch FROM CURRENT_TIMESTAMP) * 1000000 + EXTRACT(MICROSECONDS FROM CURRENT_TIMESTAMP))::bigint
```

# 二、Gauss 数据库用户初始化及授权
```sql
-- init root user (user name can be modified by oneself)
-- 创建用户root
CREATE USER wangxian PASSWORD 'wx@123456';
-- if using automatic database and schema creation, this is very important.
-- 给用户root指定系统权限CREATEDB
ALTER USER wangxian CREATEDB;

SELECT * FROM pg_roles;
-- if using gauss database, this authorization is required.
GRANT CREATE ON DATABASE pamirs TO root;
```

# 三、从 mysql 迁移数据到 Gauss 数据库的注意事项
由于 mysql 自增 id 的配置在建表语句，但是 Gauss 是独立一张序列表记录自增 id 的，所以同步完数据后需要对自增 id 部分的数据独立迁移

## （一）目前平台内置模块内用自增 id 的模型有:
+ `base`模块的`LeafAlloc`
+ `base`模块的`WorkerNode`
+ `trigger`模块的`PamirsSchedule`
+ `eip`模块的`EipLog`
+ `designerCommon`模块的`ModelMetaChangeRecord`

迁移 sql 示范，其中的库名请根据实际情况修改，没有依赖的模块也无需执行对应 sql，业务模型如需迁移也可参考该 sql

```sql
SELECT setval('demo_base.leaf_alloc_id_seq', (select id from demo_base.leaf_alloc order by id desc limit 1), true);

SELECT setval('demo_base.base_worker_node_id_seq', (select id from demo_base.base_worker_node order by id desc limit 1), true);

SELECT setval('demo_pamirs.pamirs_schedule_0_id_seq', (select id from demo_pamirs.pamirs_schedule_0 order by id desc limit 1), true);

SELECT setval('demo_pamirs.eip_eip_log_id_seq', (select id from demo_pamirs.eip_eip_log order by id desc limit 1), true);

SELECT setval('demo_pamirs.common_model_meta_change_record_id_seq', (select id from demo_pamirs.common_model_meta_change_record order by id desc limit 1), true);
```

# 四、Gauss 如何手动设置自增序列的值
## （一）使用`setval`函数
`setval`函数可以直接设置序列的当前值。它适用于需要精确控制序列值的情况。

+ `setval`的第一个参数是序列的名称。
+ 第二个参数是要设置的值（例如10）。
+ 第三个参数表示是否将`is_called`标志设置为`true`，即下次调用`nextval`时返回设置的值。

## （二）示例操作
假设你的序列全名是`demo_pamirs.pamirs_schedule_0_id_seq`，其中 demo_pamirs 为库名,以下是具体操作步骤：

1. 重置序列的当前值

```sql
# 设置序列为10
SELECT setval('demo_pamirs.pamirs_schedule_0_id_seq', 10, true);
```

2. 验证序列的新值：

```sql
# last_value字段的值为10
SELECT * FROM demo_pamirs.pamirs_schedule_0_id_seq;
```

