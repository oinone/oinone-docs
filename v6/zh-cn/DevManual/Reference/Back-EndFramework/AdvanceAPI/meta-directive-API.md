---
title: 元位指令 API（Meta Directive API）
index: true
category:
  - 研发手册
  - Reference
  - 后端API
  - Advance API
order: 3

---
元位指令系统通过对请求上下文的指令位字段进行按位与标记，实现向函数处理过程下发相应指令。该系统主要包含请求上下文指令和数据指令两类。

# 一、数据指令

数据指令大多为系统内核指令，在业务开发中通常无需使用，故暂不详细介绍。系统内核已预留前 20 位。

# 二、请求上下文指令

请求上下文指令通过 session 上下文中的非持久化`META_BIT`属性来设置。具体指令如下：

| 位 | 指令  | 指令名     | 前端默认值 | 后端默认值 | 描述    | 对应操作                                               |
| :----- | :-------------------- | :------------- | :------------- | :------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| 20     |<div style="width:100px"> `builtAction` </div>        | 内建动作       | 否             | 否             | 判断是否为平台内置的服务器动作                               | <div style="width:260px">`PamirsSession.directive().disableBuiltAction();`<br/>   `PamirsSession.directive().enableBuiltAction();`</div>  |
| 21     | <div style="width:100px"> `unlock` </div>             | 失效乐观锁     | 否             | 否             | 系统对带乐观锁模型默认启用乐观锁，此指令控制其开关           | <div style="width:260px">`PamirsSession.directive().enableOptimisticLocker();`<br/>   `PamirsSession.directive().disableOptimisticLocker();`</div> |
| 22     | <div style="width:100px"> `check`  </div>             | 数据校验       | 是             | 否             | 系统后端操作默认不进行数据校验，标记后生效                   | <div style="width:260px">`PamirsSession.directive().enableCheck();`<br/>   `PamirsSession.directive().disableCheck();`</div> |
| 23     |<div style="width:100px"> `defaultValue` </div>       | 默认值计算     | 是             | 否             | 控制是否自动填充默认值                                       | <div style="width:260px">`PamirsSession.directive().enableDefaultValue();`<br/>   `PamirsSession.directive().disableDefaultValue();`</div> |
| 24     | <div style="width:100px"> `extPoint` </div>           | 执行扩展点     | 是             | 否             | 前端请求默认执行扩展点，可标记忽略；后端编程式调用数据管理器默认不执行扩展点 | <div style="width:260px">`PamirsSession.directive().enableExtPoint();`<br/>   `PamirsSession.directive().disableExtPoint();`</div> |
| 25     | <div style="width:100px"> `hook` </div>               | 拦截           | 是             | 否             | 控制是否进行函数调用拦截                                     | <div style="width:260px">`PamirsSession.directive().enableHook();`<br/>   `PamirsSession.directive().disableHook();`</div> |
| 26     | <div style="width:100px"> `authenticate` </div>       | 鉴权           | 是             | 否             | 系统默认进行权限校验与过滤，标记后启用权限校验               | <div style="width:260px">`PamirsSession.directive().sudo();`<br/>   `PamirsSession.directive().disableSudo();`</div> |
| 27     | <div style="width:100px"> `ormColumn`</div>           | ORM 字段别名   | 否             | 否             | 系统指令，禁止设置                                           | 无                                                           |
| 28     | <div style="width:100px"> `usePkStrategy` </div>      | 使用 PK 策略   | 是             | 否            | 根据 PK 是否为空决定采用新增或更新的持久化策略               |  <div style="width:260px">`PamirsSession.directive().enableUsePkStrategy();`<br/>   `PamirsSession.directive().disableUsePkStrategy();`</div> |
| 29     | <div style="width:100px"> `fromClient` </div>         | 是否客户端调用 | 是             | 否             | 判断是否为客户端（前端）调用                                 | <div style="width:260px">`PamirsSession.directive().enableFromClient();`<br/>   `PamirsSession.directive().disableFromClient();`</div> |
| 30     | <div style="width:100px"> `sync` </div>               | 同步执行函数   | 否             | 否             | 强制异步执行函数以同步方式执行（仅对 Spring Bean 有效）      | 无                                                           |
| 31     | <div style="width:100px"> `ignoreFunManagement`</div> | 忽略函数管理   | 否             | 否             | 忽略函数管理器处理，避免 Spring 调用重复拦截                 | <div style="width:260px">`PamirsSession.directive().enableIgnoreFunManagement();`<br/>   `PamirsSession.directive().disableIgnoreFunManagement();`</div>  |


# 三、元位指令使用模式

## （一）普通模式

```java
PamirsSession.directive().disableOptimisticLocker();
try{
    更新逻辑
} finally {
    PamirsSession.directive().enableOptimisticLocker();
}
```

## （二）批量设置模式

```java
Models.directive().run(() -> {此处添加逻辑}, SystemDirectiveEnum.AUTHENTICATE)
```

