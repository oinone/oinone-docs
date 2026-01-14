---
title: 运行时：保存多值字段SQL执行报错
index: true
category:
  - 常见问题（faq）
order: 13
---
# 一、场景复现
保存多值字段时报函数执行错误：

```dart
2025-05-24 17:41:10.315  WARN 5908 --- [      Deferred6] f.g.g.j.r.DefaultRequestExceptionHandler : Exception while fetching data (/pamirsDemoMutation/create) : 函数执行错误
pro.shushi.pamirs.meta.common.exception.PamirsException: 函数执行错误
	at pro.shushi.pamirs.meta.common.exception.PamirsException$Builder.errThrow(PamirsException.java:203) ~[pamirs-meta-common-6.1.6.jar:6.1.6]
	at pro.shushi.pamirs.framework.faas.fun.manage.ManagementAspect.proceed(ManagementAspect.java:182) ~[pamirs-framework-faas-6.1.9.jar:6.1.9]
	at pro.shushi.pamirs.framework.faas.fun.manage.ManagementAspect.lambda$around$0(ManagementAspect.java:76) ~[pamirs-framework-faas-6.1.9.jar:6.1.9]
	at pro.shushi.pamirs.framework.connectors.data.tx.transaction.PamirsNonTransactionTemplate.execute(PamirsNonTransactionTemplate.java:27) ~[pamirs-connectors-data-tx-6.1.9.jar:6.1.9]
	at pro.shushi.pamirs.framework.faas.fun.manage.ManagementAspect.around(ManagementAspect.java:76) ~[pamirs-framework-faas-6.1.9.jar:6.1.9]
	at sun.reflect.GeneratedMethodAccessor421.invoke(Unknown Source) ~[na:na]
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43) ~[na:1.8.0_171]
	at java.lang.reflect.Method.invoke(Method.java:498) ~[na:1.8.0_171]
	at org.springframework.aop.aspectj.AbstractAspectJAdvice.invokeAdviceMethodWithGivenArgs(AbstractAspectJAdvice.java:644) ~[spring-aop-5.2.12.RELEASE.jar:5.2.12.RELEASE]
	at org.springframework.aop.aspectj.AbstractAspectJAdvice.invokeAdviceMethod(AbstractAspectJAdvice.java:633) ~[spring-aop-5.2.12.RELEASE.jar:5.2.12.RELEASE]
	at org.springframework.aop.aspectj.AspectJAroundAdvice.invoke(AspectJAroundAdvice.java:70) ~[spring-aop-5.2.12.RELEASE.jar:5.2.12.RELEASE]
	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:175) ~[spring-aop-5.2.12.RELEASE.jar:5.2.12.RELEASE]
  ......
Caused by: org.springframework.jdbc.UncategorizedSQLException:
### Error updating database.  Cause: java.sql.SQLException: Incorrect string value: '\xAC\xED\x00\x05sr...' for column 'match_fund1' at row 1
### The error may exist in pro/shushi/pamirs/framework/connectors/data/mapper/GenericMapper.java (best guess)
### The error may involve pro.shushi.pamirs.framework.connectors.data.mapper.GenericMapper.insert-Inline
### The error occurred while setting parameters
### SQL: INSERT INTO `top_demo_pamirs_demo`  ( `id`,   `create_uid`,                `write_uid`,    `year_now`, `match_fund1` )  VALUES  ( ?,   ?,                ?,    ?, ? )
### Cause: java.sql.SQLException: Incorrect string value: '\xAC\xED\x00\x05sr...' for column 'match_fund1' at row 1
; uncategorized SQLException; SQL state [HY000]; error code [1366]; Incorrect string value: '\xAC\xED\x00\x05sr...' for column 'match_fund1' at row 1; nested exception is java.sql.SQLException: Incorrect string value: '\xAC\xED\x00\x05sr...' for column 'match_fund1' at row 1
	at org.springframework.jdbc.support.AbstractFallbackSQLExceptionTranslator.translate(AbstractFallbackSQLExceptionTranslator.java:89) ~[spring-jdbc-5.2.12.RELEASE.jar:5.2.12.RELEASE]
	at org.springframework.jdbc.support.AbstractFallbackSQLExceptionTranslator.translate(AbstractFallbackSQLExceptionTranslator.java:81) ~[spring-jdbc-5.2.12.RELEASE.jar:5.2.12.RELEASE]
	at org.springframework.jdbc.support.AbstractFallbackSQLExceptionTranslator.translate(AbstractFallbackSQLExceptionTranslator.java:81) ~[spring-jdbc-5.2.12.RELEASE.jar:5.2.12.RELEASE]
	at org.mybatis.spring.MyBatisExceptionTranslator.translateExceptionIfPossible(MyBatisExceptionTranslator.java:91) ~[mybatis-spring-2.0.6.jar:2.0.6]
	at org.mybatis.spring.SqlSessionTemplate$SqlSessionInterceptor.invoke(SqlSessionTemplate.java:441) ~[mybatis-spring-2.0.6.jar:2.0.6]
	at com.sun.proxy.$Proxy190.insert(Unknown Source) ~[na:na]
	at org.mybatis.spring.SqlSessionTemplate.insert(SqlSessionTemplate.java:272) ~[mybatis-spring-2.0.6.jar:2.0.6]
	at com.baomidou.mybatisplus.core.override.MybatisMapperMethod.execute(MybatisMapperMethod.java:60) ~[mybatis-plus-core-3.4.1.jar:3.4.1]
	at com.baomidou.mybatisplus.core.override.MybatisMapperProxy$PlainMethodInvoker.invoke(MybatisMapperProxy.java:148) ~[mybatis-plus-core-3.4.1.jar:3.4.1]
	at com.baomidou.mybatisplus.core.override.MybatisMapperProxy.invoke(MybatisMapperProxy.java:89) ~[mybatis-plus-core-3.4.1.jar:3.4.1]
	at com.sun.proxy.$Proxy232.insert(Unknown Source) ~[na:na]
	... 141 common frames omitted
Caused by: java.sql.SQLException: Incorrect string value: '\xAC\xED\x00\x05sr...' for column 'match_fund1' at row 1
	at com.mysql.cj.jdbc.exceptions.SQLError.createSQLException(SQLError.java:129) ~[mysql-connector-java-8.0.16.jar:8.0.16]
	at com.mysql.cj.jdbc.exceptions.SQLError.createSQLException(SQLError.java:97) ~[mysql-connector-java-8.0.16.jar:8.0.16]
	at com.mysql.cj.jdbc.exceptions.SQLExceptionsMapping.translateException(SQLExceptionsMapping.java:122) ~[mysql-connector-java-8.0.16.jar:8.0.16]
	at com.mysql.cj.jdbc.ServerPreparedStatement.serverExecute(ServerPreparedStatement.java:634) ~[mysql-connector-java-8.0.16.jar:8.0.16]
	at com.mysql.cj.jdbc.ServerPreparedStatement.executeInternal(ServerPreparedStatement.java:414) ~[mysql-connector-java-8.0.16.jar:8.0.16]
	at com.mysql.cj.jdbc.ClientPreparedStatement.execute(ClientPreparedStatement.java:372) ~[mysql-connector-java-8.0.16.jar:8.0.16]
	at com.alibaba.druid.pool.DruidPooledPreparedStatement.execute(DruidPooledPreparedStatement.java:497) ~[druid-1.1.21.jar:1.1.21]
	at org.apache.ibatis.executor.statement.PreparedStatementHandler.update(PreparedStatementHandler.java:47) ~[mybatis-3.5.6.jar:3.5.6]
	at org.apache.ibatis.executor.statement.RoutingStatementHandler.update(RoutingStatementHandler.java:74) ~[mybatis-3.5.6.jar:3.5.6]
	at sun.reflect.GeneratedMethodAccessor685.invoke(Unknown Source) ~[na:na]
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43) ~[na:1.8.0_171]
	at java.lang.reflect.Method.invoke(Method.java:498) ~[na:1.8.0_171]
	... 174 common frames omitted
```

# 二、解决方案
定义多值类型`multi = true`时，字段类型应该设置为 `List<>` 类型。

```java
@Field.String
@Field(displayName ="经费证明", multi = true, serialize = Field.serialize.JSON)
private List<String> matchFund;
```

