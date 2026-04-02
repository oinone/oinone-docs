---
title: Request Context API
index: true
category:
  - R&D Manual
  - Reference
  - Backend API
  - Advance API
order: 2

---
# Ⅰ、`PamirsSession`

PamirsSession is a class used to manage Oinone request sessions, inheriting from PamirsRequestSession. It provides a series of methods to get and set session-related information, such as environment variables, user information, request variables, etc. It also provides functions like session cleanup.

## (Ⅰ) Class Overview

**Full Path**: `pro.shushi.pamirs.meta.api.session.PamirsSession`
**Inheritance Relationship**: Inherits from `PamirsRequestSession`
**Role**: Manages the session context of the Oinone framework, provides global static methods to get and set session attributes (such as environment, user information, request variables, etc.), and manages business-related configurations and cached data through `RequestContext`.
**Thread Safety**: All methods are static methods, and thread safety is achieved through thread-isolated session context.

## (Ⅱ) Member Variables

### 1. Session Attribute Constants

| **Name**            | **Type** | **Description**                                    |
| :------------------ | :------- | :------------------------------------------ |
| `SESSION_PRODUCT`   | String   | Product identifier to which the session belongs                           |
| `SESSION_ID`        | String   | Unique session ID                                 |
| `SESSION_SERV_APP`  | String   | Service application name                                |
| `SESSION_ENV`       | String   | Environment (such as `product`<br/>, `preview`<br/>)   |
| `SESSION_LANG`      | String   | Language identifier                                    |
| `SESSION_COUNTRY`   | String   | Country/region identifier                             |
| `SESSION_USER_ID`   | Object   | User ID (serializable)                         |
| `SESSION_USER_CODE` | String   | User code                                    |
| `SESSION_USER_NAME` | String   | User name                                    |
| `SESSION_ADMIN_TAG` | Boolean  | Admin tag (deprecated, use `isAdmin()`<br/> instead) |


### 2. Internal Holders

| **Name**             | **Type**                          | **Description**                                   |
| :------------------- | :-------------------------------- | :----------------------------------------- |
| `holder`             | `HoldKeeper<SessionApi>`          | Holds `SessionApi`<br/> instances, loaded via SPI |
| `clearServiceHolder` | `HoldKeeper<SessionClearService>` | Holds session cleanup service instances                       |


## (Ⅲ) Constructor

**No Explicit Constructor**: All methods are static methods, and underlying implementations (such as `SessionApi`) are loaded through the SPI mechanism. Default implementation: `PamirsSessionHolder`

## (Ⅳ) Core Methods

### 1. Session Attribute Operations

#### `getEnv()`

+ **Function**: Get the current environment (defaults to returning `product`).
+ **Return Value**: `String` environment identifier (such as `product`, `preview`).
+ **Example**: **java**

``` java
String env = PamirsSession.getEnv();
```

#### `setEnv(String env)`

+ **Function**: Set the current environment.
+ **Parameter**: `env` - Environment identifier (`product` or `preview`).
+ **Example**: **java**

``` java
PamirsSession.setEnv(EnvEnum.preview.toString()); // Set to preview environment
```

#### `getSessionId()`

+ **Function**: Get the session ID (obtained from Cookie or request header).
+ **Return Value**: `String` session ID.
+ **Example**: **java**

``` java
String sessionId = PamirsSession.getSessionId();
```

#### `getUserId()`

+ **Function**: Get the user ID (serializable type).
+ **Return Value**: `<T extends Serializable> T` user ID.
+ **Example**: **java**

``` java
Long userId = PamirsSession.getUserId(); // Assume the user ID is of Long type
```

#### `isAdmin()`

+ **Function**: Determine if it is an admin user.
+ **Return Value**: `Boolean` whether it is an admin.
+ **Example**: **java**

``` java
if (PamirsSession.isAdmin()) {
    // Perform admin operations
}
```

### 2. Request Context Operations

#### `getContext()`

+ **Function**: Get the current request context (inherits from `PamirsRequestSession`).
+ **Return Value**: `RequestContext` context instance.
+ **Example**: **java**

``` java
RequestContext context = PamirsSession.getContext();
ModelConfig modelConfig = context.getModelConfig(TestModel.MODEL_MODEL); // Get model configuration
```

#### `setContext(RequestContext context)`

+ **Function**: Set the current request context (inherits from `PamirsRequestSession`).
+ **Parameter**: `context` - Request context instance.

### 3. Advanced Operations

#### `clear()`

+ **Function**: Clear session data (including cache and attributes).
+ **Example**: **java**

``` java
PamirsSession.clear(); // Clear all data of the current session, automatically called at the end of the request
```

#### `getRequestVariables()`

+ **Function**: Get request variables (such as URL, parameters, header information).
+ **Return Value**: `PamirsRequestVariables` request variables instance.
+ **Example**: **java**

``` java
PamirsRequestVariables variables = PamirsSession.getRequestVariables();
String requestUrl = variables.getRequestUrl(); // Get the request URL
```

## (Ⅴ) Notes

+ **Thread Safety**: `PamirsSession` methods are all static and thread-safe, using `TransmittableThreadLocal` to store context internally, supporting sub-thread data transfer.
+ **Extension Points**: Obtain extension interfaces (such as `SessionApi`) through `Spider.getDefaultExtension`, supporting custom implementations.
+ SessionClearApi: As long as the SessionClearApi interface is implemented, the clear method will be automatically called at the end of the request.

# Ⅱ、RequestContext

## (Ⅰ) Class Overview

**Full Path**: `pro.shushi.pamirs.meta.api.session.RequestContext`
**Role**: Stores request-level business context data, including model configurations, function definitions, cached data, etc., supporting efficient configuration query and cache operations.

## (Ⅱ) Member Variables

| **Name**         | **Type**                  | **Description**     |
| :--------------- | :------------------------ | :----------- |
| `moduleCache`    | `ModuleCacheApi`          | Module configuration cache |
| `modelCache`     | `ModelCacheApi`           | Model configuration cache |
| `functionCache`  | `Cache<String, Function>` | Function definition cache |
| `extendCacheMap` | `Map<String, Object>`     | Extended cache     |


## (Ⅲ) Core Methods

### 1、`getModelConfig(String model)`

+ **Function**: Get model configuration (first get from cache, if not exist, load from static container).
+ **Parameter**: `model` - Model name.
+ **Return Value**: `ModelConfig` model configuration instance.
+ **Exception**: If the model does not exist, throw `PamirsException`.
+ **Example**: **java**

``` java
ModelConfig testModelConfig = context.getModelConfig("test.TestModel");
```

### 2、`getFunction(String namespace, String fun)`

+ **Function**: Get the function definition under the namespace.
+ **Parameters**:
  - `namespace` - Namespace (such as `pamirs`)
  - `fun` - Function name
+ **Return Value**: `Function` function instance.
+ **Exception**: If the function does not exist, throw `PamirsException`.
+ **Example**: **java**

``` java
Function userFunction = context.getFunction("pamirs", "getUserInfo");
```

### 3、`init(SessionCacheFactoryApi sessionCacheFactoryApi)`

+ **Function**: Initialize context cache (used internally, no need to call externally).
+ **Parameter**: `sessionCacheFactoryApi` - Cache factory instance.

# Ⅲ、Session Construction Process (HTTP Request Handling)

## (Ⅰ) Request Initialization:

Parse the HTTP request through `SessionPrepareTemplate`, extract session attributes (such as Header, Cookie), and create `PamirsRequestVariables`.

``` java
// Example of internal framework call (users do not need to call manually)
SessionPrepareTemplate.prepare(request, moduleName, requestParam);
```

## (Ⅱ) Session Initialization Extension

### 1. Extension via SessionInitApi

### Method Description

`init(HttpServletRequest request, String moduleName, PamirsRequestParam requestParam)`

+ **Function Description**: This method is called during session initialization, allowing developers to execute custom initialization logic based on the incoming HTTP request, module name, and request parameters.
+ **Parameters**:
  - `request`: Type `HttpServletRequest`, representing the current HTTP request object, from which request-related information such as request headers and parameters can be obtained.
  - `moduleName`: Type `String`, representing the name of the module involved in the current request.
  - `requestParam`: Type `PamirsRequestParam`, a custom request parameter object containing specific parameter information of the request.
+ **Return Value**: No return value (`void`).
+ **Exception Situation**: The method does not declare to throw exceptions, but the implementation class may throw exceptions when executing initialization logic, and the caller needs to handle them according to the actual situation.

#### Usage Example

The following is a simple example of a `SessionInitApi` implementation class:

``` java
@Component
public class CustomSessionInitApi implements SessionInitApi {
    @Override
    public void init(HttpServletRequest request, String moduleName, PamirsRequestParam requestParam) {
        // Custom initialization logic
        System.out.println("Custom session initialization for module: " + moduleName);
        // More operations can be performed based on request and requestParam
    }
}
```

When using it, Oinone will automatically discover and load the `CustomSessionInitApi` class, and call its `init` method during session initialization.

### 2. Extension via Function Hook

Refer to the [Hook Interceptor Documentation](/en/DevManual/Reference/Back-EndFramework/functions-API.md#iii-hook-interceptors), and refer to the sample code `pro.shushi.pamirs.user.api.hook.UserHook`. In this example, with the help of `UserHook`, it can be determined whether the user is logged in. If the user is logged in, user-related information will be automatically set, so that the `PamirsSession.getUserId()` method can successfully obtain the user ID value in the future.

## (Ⅲ) Context:

Obtain `RequestContext` through `PamirsSession.getContext()`, and use it to obtain metadata-related information, which will automatically use the first-level and second-level caches of models, modules, and functions.

## (Ⅳ) Session Clearance:

After the request processing is completed, call `PamirsSession.clear()` to clear the current session data and release resources.

# Ⅳ、Example Code

## (Ⅰ) Common Usage Scenarios

``` java
// Get the current session user ID
Long userId = PamirsSession.getUserId();

// Get the request context model configuration
RequestContext context = PamirsSession.getContext();
ModelConfig testModel = context.getModelConfig(TestModel.MODEL_MODEL);

// Get the function with the namespace "pamirs"
Function userFunction = context.getFunction("pamirs", "userLogin");
```

## (Ⅱ) Extending PamirsSession Using SessionInitApi Interface

`SessionInitApi` is an API interface specifically for request session initialization.

### 1. Implementing the SessionInitApi Interface

Create an implementation class to add department information during session initialization:

```java
@Component  
public class DepartmentSessionInitApi implements SessionInitApi {  

    @Override  
    public void init(HttpServletRequest request, String moduleName, PamirsRequestParam requestParam) {  
        // Get the current user's department information  
        String departmentCode = getCurrentUserDepartmentCode();  
        if (StringUtils.isNotBlank(departmentCode)) {  
            // Add to the transmittableExtend of the session  
            PamirsSession.getTransmittableExtend().put("departmentCode", departmentCode);  
        }  
    }  

    private String getCurrentUserDepartmentCode() {  
        // Use the existing department acquisition logic  
        Long userId = PamirsSession.getUserId();  
        if (userId == null) {  
            return null;  
        }  
        // Query user department logic...  
        return departmentCode;  
    }  
}
```

### 2. Automatic Invocation Mechanism

`SessionInitApi` will be automatically invoked during the session preparation process. In the `after` method of `SessionPrepareTemplate`: SessionPrepareTemplate.java:96-100

The system will automatically load all implementations of `SessionInitApi` and execute them in order.

### 3. Session Data Persistence

Department information will be serialized and deserialized through the `Sessions.fetchSessionMap()` and `*Sessions.fillSessionFromMap()` methods: Sessions.java:237-238

This way, department information remains available throughout the session lifecycle.

### 4. Advantages

Advantages of using `SessionInitApi`:

+ **Automatic Execution**: Automatically invoked during each request session initialization
+ **Good Extensibility**: Supports multiple implementation classes, executed in order
+ **High Integration**: Fully integrated with the existing session management mechanism

## (Ⅲ) Custom Business Session

### 1. Extension Scenario Description

In different application scenarios, it is necessary to add exclusive business data (such as user information, tenant identification, request link tracking, etc.) to the session (Session). By extending `PamirsSession`, it is possible to achieve:

+ **Business Data Isolation**: Store custom data structures in the session
+ **Thread-Safe Storage**: Use thread-local technology (ThreadLocal) to avoid concurrency issues
+ **Lifecycle Management**: Automatically initialize and clean up data through framework hooks (Hook)

### 2. Extension Implementation Steps

#### Step 1: Define Business-Exclusive Data Structure (XSessionData)

Create a POJO to carry custom data, using the `@Data` annotation provided by the Oinone platform (supporting data binding and serialization).
**Example: Storing logged-in user information**

``` java
@Data
public class DemoSessionData {
    private PamirsUser user; // Business-exclusive field: current logged-in user
}
```

#### Step 2: Thread-Level Cache Encapsulation (XSessionCache)

Implement thread-local storage of data through `ThreadLocal` to ensure data isolation between threads.
**Core Functions**:

+ **Initialization**: Obtain raw data from the base session (such as `PamirsSession`) and load business data
+ **Reading**: Provide thread-safe acquisition interfaces
+ **Cleanup**: Clear thread-local data at the end of the request

``` java
public class DemoSessionCache {
    private static final ThreadLocal<DemoSessionData> BIZ_DATA_THREAD_LOCAL = new ThreadLocal<>();

    // Get business data
    public static PamirsUser getUser() {
        return BIZ_DATA_THREAD_LOCAL.get() == null ? null : BIZ_DATA_THREAD_LOCAL.get().getUser();
    }

    // Initialize business data (load user details based on the base session user ID)
    public static void init() {
        if (getUser() != null) return; // Skip if already initialized

        Long userId = PamirsSession.getUserId(); // Get user ID from the base session
        if (userId == null) return;

        UserService userService = CommonApiFactory.getApi(UserService.class);
        PamirsUser user = userService.queryById(userId); // Load business data
        if (user != null) {
            DemoSessionData data = new DemoSessionData();
            data.setUser(user);
            BIZ_DATA_THREAD_LOCAL.set(data); // Store in thread-local cache
        }
    }

    // Clear thread-local data (called at the end of the request)
    public static void clear() {
        BIZ_DATA_THREAD_LOCAL.remove();
    }
}
```

#### Step 3: Initialize Data through Hook Mechanism

Use the framework's hook (Hook) to automatically initialize business data before request processing, supporting module-level filtering (only valid for specific modules).
**Implement the `HookBefore` interface and add the `@Hook` annotation**:

``` java
@Component
public class DemoSessionHook implements HookBefore {
    @Override
    @Hook(priority = 1, module = DemoModule.MODULE_MODULE) // Only valid for the DemoModule module
    public Object run(Function function, Object... args) {
        DemoSessionCache.init(); // Trigger business data initialization
        return function; // Continue executing the subsequent process
    }
}
```

#### Step 4: Define Custom Session API (XSessionApi)

Standardize the access method of business data through the interface to achieve decoupling from the base session.

``` java
public interface DemoSessionApi extends CommonApi {
    PamirsUser getUser(); // Define business-exclusive interface: get logged-in user
}
```

#### Step 5: Implement the Interface and Manage the Lifecycle

**Implement `XSessionApi` and `SessionClearApi`**

+ `XSessionApi`: Provide an entry for business data access
+ `SessionClearApi`: Define data cleanup logic (automatically called by the framework)

``` java
package pro.shushi.pamirs.demo.core.session;

import org.springframework.stereotype.Component;
import pro.shushi.pamirs.meta.api.core.session.SessionClearApi;
import pro.shushi.pamirs.user.api.model.PamirsUser;

@Component
public class DemoSessionHolder implements DemoSessionApi, SessionClearApi {
    @Override
    public PamirsUser getUser() {
        return DemoSessionCache.getUser(); // Delegate to thread cache to get data
    }

    @Override
    public void clear() {
        DemoSessionCache.clear(); // Clear thread-local data
    }
}
```

#### Step 6: Inherit and Extend PamirsSession (XSession)

Encapsulate custom interfaces through static methods to simplify business calls.

``` java
package pro.shushi.pamirs.demo.core.session;

import pro.shushi.pamirs.meta.api.CommonApiFactory;
import pro.shushi.pamirs.meta.api.session.PamirsSession;
import pro.shushi.pamirs.user.api.model.PamirsUser;

public class DemoSession extends PamirsSession {
    // Provide a convenient access entry: get business data through the custom API
    public static PamirsUser getUser() {
        return CommonApiFactory.getApi(DemoSessionApi.class).getUser();
    }
}
```

#### Step 7: Business Scenario Application

Directly call the extended Session interface in scenarios where custom data is needed (such as placeholder parsing, business logic layer).
**Example**:

``` java
return DemoSession.getUser().getId().toString(); // Use the extended Session to get the user ID
```

### 3. Classic Extension Design Diagram

``` plain
                          +-------------------+
                          |   PamirsSession    |  Base session (provides general capabilities)
                          +-------------------+
                                  ▲
                                  |  Inheritance
                                  ▼
                          +-------------------+
                          |     DemoSession     |  Extended session (provides custom interfaces)
                          +-------------------+
                                  ▲
                                  |  Delegation
                                  ▼
                          +-------------------+
                          |   DemoSessionApi    |  Business interface (defines exclusive capabilities)
                          +-------------------+
                                  ▲
                                  |  Implementation
                                  ▼
                          +-------------------+
                          |  DemoSessionHolder  |  Capability implementation (docks with thread cache)
                          +-------------------+
                                  ▲
                                  |  Operation
                                  ▼
                          +-------------------+
                          |   DemoSessionCache  |  Thread cache (ThreadLocal storage)
                          +-------------------+
                                  ▲
                                  |  Carrying
                                  ▼
                          +-------------------+
                          |  DemoSessionData    |  Business data (custom fields)
                          +-------------------+
```

### 4. Key Technical Points Description

#### Thread Safety Assurance

+ **ThreadLocal Storage**: Each thread independently holds an instance of `DemoSessionData` to avoid concurrency access conflicts
+ **Hook Initialization**: Trigger initialization at the front end of the request processing chain (such as `HookBefore`) to ensure that data is prepared before business logic

#### Lifecycle Management

+ **Automatic Cleanup**: Implement the `clear()` method of `SessionClearApi`, which is uniformly called by the framework at the end of the request to release thread-local resources
+ **Module Filtering**: Limit the scope of the hook through `@Hook(module = ...)` to avoid performance loss of irrelevant modules

#### Interface Extension Specifications

+ **Inherit `CommonApi`**: Ensure that custom APIs are compatible with the framework extension mechanism (such as obtaining instances through `CommonApiFactory`)
+ **Static Method Encapsulation**: Provide static access entries in the extended Session class to simplify business code calls

### 5. Best Practices

+ **Principle of Data Minimization**: Only store necessary business data in the session to avoid memory waste
+ **Hook Priority Control**: Ensure that initialization hooks are executed before dependent data logic through `@Hook(priority = ...)`