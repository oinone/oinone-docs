---
title: Meta Directive API
index: true
category:
  - Development Manual
  - Reference
  - Backend API
  - Advance API
order: 3

---
The meta directive system issues corresponding instructions to the function processing flow by performing bitwise AND marking on the directive fields of the request context. The system mainly includes two types of instructions: request context directives and data directives.

# I. Data Directives

Most data directives are system kernel directives, which are usually not required in business development, so they are not described in detail here. The system kernel has reserved the first 20 bits.

# II. Request Context Directives

Request context directives are set through the non-persistent `META_BIT` attribute in the session context. The specific directives are as follows:

| Bit | Directive | Directive Name | Frontend Default | Backend Default | Description | Corresponding Operations |
| :----- | :-------------------- | :------------- | :------------- | :------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| 20     | `builtAction`        | Built-in Action | No             | No             | Determine if it is a platform-built server action | <div style="width:260px">`PamirsSession.directive().disableBuiltAction();`<br/>   `PamirsSession.directive().enableBuiltAction();`</div>  |
| 21     | `unlock`             | Disable Optimistic Lock | No             | No             | The system default enables the optimistic lock for models with optimistic locks, and this directive controls its switch | <div style="width:260px">`PamirsSession.directive().enableOptimisticLocker();`<br/>   `PamirsSession.directive().disableOptimisticLocker();`</div> |
| 22     | `check`  | Data Validation | Yes            | No             | The system backend operations do not perform data validation by default, and it takes effect after marking | <div style="width:260px">`PamirsSession.directive().enableCheck();`<br/>   `PamirsSession.directive().disableCheck();`</div> |
| 23     | `defaultValue`       | Default Value Calculation | Yes            | No             | Control whether to automatically fill in default values | <div style="width:260px">`PamirsSession.directive().enableDefaultValue();`<br/>   `PamirsSession.directive().disableDefaultValue();`</div> |
| 24     | `extPoint`           | Execute Extension Points | Yes            | No             | Frontend requests execute extension points by default and can be marked to ignore; programmatic calls to the data manager in the backend do not execute extension points by default | <div style="width:260px">`PamirsSession.directive().enableExtPoint();`<br/>   `PamirsSession.directive().disableExtPoint();`</div> |
| 25     | `hook`               | Interception | Yes            | No             | Control whether to perform function call interception | <div style="width:260px">`PamirsSession.directive().enableHook();`<br/>   `PamirsSession.directive().disableHook();`</div> |
| 26     | `authenticate`       | Authentication | Yes            | No             | The system performs permission verification and filtering by default, and enables permission verification after marking | <div style="width:260px">`PamirsSession.directive().sudo();`<br/>   `PamirsSession.directive().disableSudo();`</div> |
| 27     | `ormColumn`          | ORM Field Alias | No             | No             | System directive, setting is prohibited | None |
| 28     | `usePkStrategy`      | Use PK Strategy | Yes            | No             | Determine the persistence strategy of addition or update according to whether the PK is empty | <div style="width:260px">`PamirsSession.directive().enableUsePkStrategy();`<br/>   `PamirsSession.directive().disableUsePkStrategy();`</div> |
| 29     | `fromClient`         | Client Call | Yes            | No             | Determine if it is a client (frontend) call | <div style="width:260px">`PamirsSession.directive().enableFromClient();`<br/>   `PamirsSession.directive().disableFromClient();`</div> |
| 30     | `sync`               | Execute Function Synchronously | No             | No             | Force asynchronous execution of functions to execute synchronously (only valid for Spring Beans) | None |
| 31     | `ignoreFunManagement`| Ignore Function Management | No             | No             | Ignore function manager processing to avoid repeated interception of Spring calls | <div style="width:260px">`PamirsSession.directive().enableIgnoreFunManagement();`<br/>   `PamirsSession.directive().disableIgnoreFunManagement();`</div>  |


# III. Meta Directive Usage Modes

## (Ⅰ) Normal Mode

```java
PamirsSession.directive().disableOptimisticLocker();
try {
    // Update logic
} finally {
    PamirsSession.directive().enableOptimisticLocker();
}
```

## (Ⅱ) Batch Setting Mode

```java
Models.directive().run(() -> { /* Add logic here */}, SystemDirectiveEnum.AUTHENTICATE);
```