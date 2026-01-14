---
title: 数据操作：Oinone连接外部数据源方案
index: true
category:
  - 常见解决方案
order: 25
---

# 一、场景描述
在实际业务场景中，有是有这样的需求：链接外部数据进行数据的获取；通常的做法：

1. 【推荐】通过集成平台的数据连接器，链接外部数据源进行数据操作；
2. 项目代码中链接数据源，即通过程序代码操作外部数据源的数据；

本篇文章只介绍通过程序代码操作外部数据源的方式.

# 二、整体方案
+ Oinone 管理外部数据源，即 yml 中配置外部数据源；
+ 后端通过 Mapper 的方式进行数据操作(增/删/查/改)；
+ 调用 Mapper 接口的时候，指定到外部数据源；

# 三、详细步骤
## （一）数据源配置(application.yml), 与正常的数据源配置一样
```yaml
out_ds_name(外部数据源别名):
  driverClassName: com.mysql.cj.jdbc.Driver
  type: com.alibaba.druid.pool.DruidDataSource
  # local环境配置调整
  url: jdbc:mysql://ip(host):端口/数据库Schema?useSSL=false&allowPublicKeyRetrieval=true&useServerPrepStmts=true&cachePrepStmts=true&useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai&autoReconnect=true&allowMultiQueries=true
  username: 用户名
  password: 命名
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

## （二）外部数据源其他配置
外部数据源限制创建表结构的执行，可以通过配置指定【不创建DB，不创建数据表】

```yaml
persistence:
  global:
    auto-create-database: true
    auto-create-table: true
  ds:
    out_ds_name(外部数据源别名):
      # 不创建DB
      auto-create-database: false
      # 不创建数据表
      auto-create-table: false
```

## （三）后端写 Mapper
+ SQL Mapper 跟使用原生 mybaits/mybaits-plus 写法一样，无特殊限制；
+ Mapper 和 SQL 写到一起，或者分开两个文件都可以

## （四）Mapper 被 Service 或者 Action 调用
+ 启动的 Application 中 @MapperScan 需要扫描到对应的包。
+ 用是与普通 bean 一样（即调用方式跟传统的方式样），唯一的区别就是加上 DsHintApi，即指定 Mapper 所使用的数据源。

```java
@Autowired
private ScheduleItemMapper scheduleItemMapper;

public saveData(Object data) {
    ScheduleQuery scheduleQuery = new ScheduleQuery();
    //scheduleQuery.setActionName();
    try (DsHintApi dsHint = DsHintApi.use(“外部数据源名称”)) {
        List<ScheduleItem> scheduleItems = scheduleItemMapper.selectListForSerial(scheduleQuery);
        // 具体业务逻辑
    }
}
```

