---
title: Data Operation:Oinone External Data Source Connection Solution
index: true
category:
  - Common Solutions
order: 25
---

# 一、Scenario Description
In practical business scenarios, there is often a need to connect to external data sources for data acquisition. Common approaches include:  
1. **Recommended**: Use the platform's data connector to connect to external data sources for data operations.  
2. Connect to data sources in project code, i.e., operate external data source data through programming.  

This article focuses on the approach of operating external data sources via programming.

# 二、Overall Solution
- Oinone manages external data sources by configuring them in yml.  
- The backend performs data operations (CRUD) through Mapper.  
- When calling Mapper interfaces, specify the external data source.  

# 三、Detailed Steps
## （一）Data Source Configuration (application.yml)
The configuration is similar to normal data sources:  
```yaml
out_ds_name(alias_for_external_ds):
  driverClassName: com.mysql.cj.jdbc.Driver
  type: com.alibaba.druid.pool.DruidDataSource
  # Local environment configuration
  url: jdbc:mysql://ip(host):port/database_schema?useSSL=false&allowPublicKeyRetrieval=true&useServerPrepStmts=true&cachePrepStmts=true&useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai&autoReconnect=true&allowMultiQueries=true
  username: username
  password: password
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

## （二）Additional Configurations for External Data Sources
To restrict table structure creation for external data sources, configure:  
```yaml
persistence:
  global:
    auto-create-database: true
    auto-create-table: true
  ds:
    out_ds_name(alias_for_external_ds):
      # Disable database creation
      auto-create-database: false
      # Disable table creation
      auto-create-table: false
```

## （三）Backend Mapper Development
- SQL Mapper follows the same syntax as native MyBatis/MyBatis-Plus with no special restrictions.  
- Mapper and SQL can be written in the same file or separated into two files.  

## （四）Calling Mapper in Service/Action
- The startup Application's `@MapperScan` must scan the corresponding package.  
- Invoke the Mapper like a normal bean, with the only difference being using `DsHintApi` to specify the data source:  
```java
@Autowired
private ScheduleItemMapper scheduleItemMapper;

public saveData(Object data) {
    ScheduleQuery scheduleQuery = new ScheduleQuery();
    //scheduleQuery.setActionName();
    try (DsHintApi dsHint = DsHintApi.use("external_ds_name")) {
        List<ScheduleItem> scheduleItems = scheduleItemMapper.selectListForSerial(scheduleQuery);
        // Business logic
    }
}
```