---
title: 请求上下文 API（Request Context API）
index: true
category:
  - 研发手册
  - Reference
  - 后端API
  - Advance API
order: 2

---
# 一、`PamirsSession`

PamirsSession 是用于管理 Oinone 请求会话的类，继承自 PamirsRequestSession。它提供了一系列方法来获取和设置会话相关的信息，如环境变量、用户信息、请求变量等。同时，还提供了会话清理等功能。

## （一）类概述

**全路径**：`pro.shushi.pamirs.meta.api.session.PamirsSession`
**继承关系**：继承自 `PamirsRequestSession`
**作用**：管理 Oinone 框架的会话上下文，提供全局静态方法用于获取和设置会话属性（如环境、用户信息、请求变量等），并通过 `RequestContext` 管理业务相关的配置和缓存数据。
**线程安全**：所有方法均为静态方法，基于线程隔离的会话上下文实现线程安全。

## （二）成员变量

### 1、会话属性常量

| **名称**            | **类型** | **描述**                                    |
| :------------------ | :------- | :------------------------------------------ |
| `SESSION_PRODUCT`   | String   | 会话所属产品标识                            |
| `SESSION_ID`        | String   | 会话唯一 ID                                 |
| `SESSION_SERV_APP`  | String   | 服务应用名称                                |
| `SESSION_ENV`       | String   | 环境（如 `product`<br/>、`preview`<br/>）   |
| `SESSION_LANG`      | String   | 语言标识                                    |
| `SESSION_COUNTRY`   | String   | 国家 / 地区标识                             |
| `SESSION_USER_ID`   | Object   | 用户 ID（可序列化）                         |
| `SESSION_USER_CODE` | String   | 用户代码                                    |
| `SESSION_USER_NAME` | String   | 用户名称                                    |
| `SESSION_ADMIN_TAG` | Boolean  | 管理员标签（已废弃，改用 `isAdmin()`<br/>） |


### 2、内部持有器

| **名称**             | **类型**                          | **描述**                                   |
| :------------------- | :-------------------------------- | :----------------------------------------- |
| `holder`             | `HoldKeeper<SessionApi>`          | 持有 `SessionApi`<br/> 实例，通过 SPI 加载 |
| `clearServiceHolder` | `HoldKeeper<SessionClearService>` | 持有会话清除服务实例                       |


## （三）构造方法

**无显式构造方法**：所有方法均为静态方法，通过 SPI 机制加载底层实现（如 `SessionApi`）。默认实现：`PamirsSessionHolder`

## （四）核心方法

### 1、会话属性操作

#### `getEnv()`

+ **功能**：获取当前环境（默认返回 `product`）。
+ **返回值**：`String` 环境标识（如 `product`、`preview`）。
+ **示例**：**java**

``` java
String env = PamirsSession.getEnv();
```

#### `setEnv(String env)`

+ **功能**：设置当前环境。
+ **参数**：`env` - 环境标识（`product` 或 `preview`）。
+ **示例**：**java**

``` java
PamirsSession.setEnv(EnvEnum.preview.toString()); // 设置为预览环境
```

#### `getSessionId()`

+ **功能**：获取会话 ID（从 Cookie 或请求头中获取）。
+ **返回值**：`String` 会话 ID。
+ **示例**：**java**

``` java
String sessionId = PamirsSession.getSessionId();
```

#### `getUserId()`

+ **功能**：获取用户 ID（可序列化类型）。
+ **返回值**：`<T extends Serializable> T` 用户 ID。
+ **示例**：**java**

``` java
Long userId = PamirsSession.getUserId(); // 假设用户 ID 为 Long 类型
```

#### `isAdmin()`

+ **功能**：判断是否为管理员用户。
+ **返回值**：`Boolean` 是否为管理员。
+ **示例**：**java**

``` java
if (PamirsSession.isAdmin()) {
    // 执行管理员操作
}
```

### 2、请求上下文操作

#### `getContext()`

+ **功能**：获取当前请求上下文（继承自 `PamirsRequestSession`）。
+ **返回值**：`RequestContext` 上下文实例。
+ **示例**：**java**

``` java
RequestContext context = PamirsSession.getContext();
ModelConfig modelConfig = context.getModelConfig(TestModel.MODEL_MODEL); // 获取模型配置
```

#### `setContext(RequestContext context)`

+ **功能**：设置当前请求上下文（继承自 `PamirsRequestSession`）。
+ **参数**：`context` - 请求上下文实例。

### 3、高级操作

#### `clear()`

+ **功能**：清除会话数据（包括缓存和属性）。
+ **示例**：**java**

``` java
PamirsSession.clear(); // 清除当前会话所有数据,在请求结束时自动调用
```

#### `getRequestVariables()`

+ **功能**：获取请求变量（如 URL、参数、头部信息）。
+ **返回值**：`PamirsRequestVariables` 请求变量实例。
+ **示例**：**java**

``` java
PamirsRequestVariables variables = PamirsSession.getRequestVariables();
String requestUrl = variables.getRequestUrl(); // 获取请求 URL
```

## （五）注意事项

+ **线程安全**：`PamirsSession` 方法均为静态线程安全，内部使用 `TransmittableThreadLocal` 存储上下文，支持子线程数据传递。
+ **扩展点**：通过 `Spider.getDefaultExtension` 获取扩展接口（如 `SessionApi`），支持自定义实现。
+ SessionClearApi：只要实现了SessionClearApi接口，在请求结束时会自动调用clear方法

# 二、RequestContext

## （一）类概述

**全路径**：`pro.shushi.pamirs.meta.api.session.RequestContext`
**作用**：存储请求级别的业务上下文数据，包括模型配置、函数定义、缓存数据等，支持高效的配置查询和缓存操作。

## （二）成员变量

| **名称**         | **类型**                  | **描述**     |
| :--------------- | :------------------------ | :----------- |
| `moduleCache`    | `ModuleCacheApi`          | 模块配置缓存 |
| `modelCache`     | `ModelCacheApi`           | 模型配置缓存 |
| `functionCache`  | `Cache<String, Function>` | 函数定义缓存 |
| `extendCacheMap` | `Map<String, Object>`     | 扩展缓存     |


## （三）核心方法

### 1、`getModelConfig(String model)`

+ **功能**：获取模型配置（优先从缓存中获取，不存在则从静态容器加载）。
+ **参数**：`model` - 模型名称。
+ **返回值**：`ModelConfig` 模型配置实例。
+ **异常**：若模型不存在，抛出 `PamirsException`。
+ **示例**：**java**

``` java
ModelConfig testModelConfig = context.getModelConfig("test.TestModel");
```

### 2、`getFunction(String namespace, String fun)`

+ **功能**：获取命名空间下的函数定义。
+ **参数**：
  - `namespace` - 命名空间（如 `pamirs`）
  - `fun` - 函数名
+ **返回值**：`Function` 函数实例。
+ **异常**：若函数不存在，抛出 `PamirsException`。
+ **示例**：**java**

``` java
Function userFunction = context.getFunction("pamirs", "getUserInfo");
```

### 3、`init(SessionCacheFactoryApi sessionCacheFactoryApi)`

+ **功能**：初始化上下文缓存（内部使用，外部无需调用）。
+ **参数**：`sessionCacheFactoryApi` - 缓存工厂实例。

# 三、会话构建流程（HTTP 请求处理）

## （一）请求初始化：

通过 `SessionPrepareTemplate` 解析 HTTP 请求，提取会话属性（如 Header、Cookie），并创建 `PamirsRequestVariables`。

``` java
// 框架内部调用示例（用户无需手动调用）
SessionPrepareTemplate.prepare(request, moduleName, requestParam);
```

## （二）Session初始化扩展

### 1、通过 SessionInitApi 扩展

### 方法说明

`init(HttpServletRequest request, String moduleName, PamirsRequestParam requestParam)`

+ **功能描述**：该方法在会话初始化时被调用，允许开发者根据传入的 HTTP 请求、模块名称和请求参数执行自定义的初始化逻辑。
+ **参数**：
  - `request`：类型为 `HttpServletRequest`，表示当前的 HTTP 请求对象，可从中获取请求的相关信息，如请求头、请求参数等。
  - `moduleName`：类型为 `String`，代表当前请求所涉及的模块名称。
  - `requestParam`：类型为 `PamirsRequestParam`，是自定义的请求参数对象，包含了请求的具体参数信息。
+ **返回值**：无返回值（`void`）。
+ **异常情况**：方法未声明抛出异常，但实现类在执行初始化逻辑时可能会抛出异常，调用者需要根据实际情况进行处理。

#### 使用示例

以下是一个简单的 `SessionInitApi` 实现类示例：

``` java
@Component
public class CustomSessionInitApi implements SessionInitApi {
    @Override
    public void init(HttpServletRequest request, String moduleName, PamirsRequestParam requestParam) {
        // 自定义初始化逻辑
        System.out.println("Custom session initialization for module: " + moduleName);
        // 可以根据 request 和 requestParam 进行更多操作
    }
}
```

在使用时，Oinone 会通过自动发现并加载 `CustomSessionInitApi` 类，并在会话初始化时调用其 `init` 方法。

### 2、通过函数的Hook进行扩展

参考 [Hook 拦截器文档](/zh/DevManual/Reference/Back-EndFramework/functions-API.md#5ca91714)，可参考示例代码 `pro.shushi.pamirs.user.api.hook.UserHook`。在该示例中，借助 `UserHook` 可判断用户是否登录。若用户已登录，会自动设置与用户相关的信息，如此一来，后续使用 `PamirsSession.getUserId()` 方法就能顺利获取用户 ID 值。

## （三）上下文：

通过 `PamirsSession.getContext()` 获取 `RequestContext`，通过它来获取元数据相关信息，会自动使用到模型、模块、函数的一级、二级缓存。

## （四）会话清除：

请求处理完成后，调用 `PamirsSession.clear()` 清除当前会话数据，释放资源。

# 四、示例代码

## （一）常见使用场景

``` java
// 获取当前会话用户 ID
Long userId = PamirsSession.getUserId();

// 获取请求上下文模型配置
RequestContext context = PamirsSession.getContext();
ModelConfig testModel = context.getModelConfig(TestModel.MODEL_MODEL);

// 获取命名空间为 "pamirs" 的函数
Function userFunction = context.getFunction("pamirs", "userLogin");
```

## （二）扩展PamirsSession 使用 SessionInitApi 接口

`SessionInitApi` 是一个专门用于请求会话初始化的Api接口

### 1、实现SessionInitApi接口

创建一个实现类来在session初始化时添加部门信息：

```java
@Component  
public class DepartmentSessionInitApi implements SessionInitApi {  

    @Override  
    public void init(HttpServletRequest request, String moduleName, PamirsRequestParam requestParam) {  
        // 获取当前用户部门信息  
        String departmentCode = getCurrentUserDepartmentCode();  
        if (StringUtils.isNotBlank(departmentCode)) {  
            // 添加到session的transmittableExtend中  
            PamirsSession.getTransmittableExtend().put("departmentCode", departmentCode);  
        }  
    }  

    private String getCurrentUserDepartmentCode() {  
        // 使用现有的部门获取逻辑  
        Long userId = PamirsSession.getUserId();  
        if (userId == null) {  
            return null;  
        }  
        // 查询用户部门逻辑...  
        return departmentCode;  
    }  
}
```

### 2、自动调用机制

`SessionInitApi` 会在session准备过程中自动被调用。在 `SessionPrepareTemplate` 的 `after` 方法中： SessionPrepareTemplate.java:96-100

系统会自动加载所有 `SessionInitApi` 的实现并按顺序执行。

### 3、Session数据持久化

部门信息会通过 `Sessions.fetchSessionMap()` 和 `*Sessions.fillSessionFromMap()` 方法进行序列化和反序列化： Sessions.java:237-238

这样部门信息就会在整个session生命周期中保持可用。

### 4、优势

使用 `SessionInitApi` 的优势：

+ **自动执行**：在每次请求session初始化时自动调用
+ **扩展性好**：支持多个实现类，按顺序执行
+ **集成度高**：与现有session管理机制完全集成
  
## （三）自定义业务Session

### 1、扩展场景说明

不同应用场景下，需为会话（Session）添加专属业务数据（如用户信息、租户标识、请求链路追踪等）。通过扩展 `PamirsSession`，可实现：

+ **业务数据隔离**：在会话中存储自定义数据结构
+ **线程安全存储**：利用线程本地化技术（ThreadLocal）避免并发问题
+ **生命周期管理**：通过框架钩子（Hook）自动初始化和清理数据

### 2、扩展实现步骤

#### 步骤 1：定义业务专属数据结构（XSessionData）

创建承载自定义数据的 POJO，使用 Oinone 平台提供的 `@Data` 注解（支持数据绑定与序列化）。
**示例：存储登录用户信息**

``` java
@Data
public class DemoSessionData {
    private PamirsUser user; // 业务专属字段：当前登录用户
}
```

#### 步骤 2：线程级缓存封装（XSessionCache）

通过 `ThreadLocal` 实现数据的线程本地化存储，确保线程间数据隔离。
**核心功能**：

+ **初始化**：从基础会话（如 `PamirsSession`）获取原始数据并加载业务数据
+ **读取**：提供线程安全的获取接口
+ **清理**：在请求结束时清除线程本地数据

``` java
public class DemoSessionCache {
    private static final ThreadLocal<DemoSessionData> BIZ_DATA_THREAD_LOCAL = new ThreadLocal<>();

    // 获取业务数据
    public static PamirsUser getUser() {
        return BIZ_DATA_THREAD_LOCAL.get() == null ? null : BIZ_DATA_THREAD_LOCAL.get().getUser();
    }

    // 初始化业务数据（基于基础会话用户ID加载用户详情）
    public static void init() {
        if (getUser() != null) return; // 已初始化则跳过

        Long userId = PamirsSession.getUserId(); // 从基础会话获取用户ID
        if (userId == null) return;

        UserService userService = CommonApiFactory.getApi(UserService.class);
        PamirsUser user = userService.queryById(userId); // 加载业务数据
        if (user != null) {
            DemoSessionData data = new DemoSessionData();
            data.setUser(user);
            BIZ_DATA_THREAD_LOCAL.set(data); // 存入线程本地缓存
        }
    }

    // 清理线程本地数据（请求结束时调用）
    public static void clear() {
        BIZ_DATA_THREAD_LOCAL.remove();
    }
}
```

#### 步骤 3：通过 Hook 机制初始化数据

利用框架的钩子（Hook）在请求处理前自动初始化业务数据，支持模块级过滤（仅对特定模块生效）。
**实现 **`HookBefore`** 接口并添加 **`@Hook`** 注解**：

``` java
@Component
public class DemoSessionHook implements HookBefore {
    @Override
    @Hook(priority = 1, module = DemoModule.MODULE_MODULE) // 仅对DemoModule模块生效
    public Object run(Function function, Object... args) {
        DemoSessionCache.init(); // 触发业务数据初始化
        return function; // 继续执行后续流程
    }
}
```

#### 步骤 4：定义自定义 Session API（XSessionApi）

通过接口规范业务数据的访问方式，实现与基础会话的解耦。

``` java
public interface DemoSessionApi extends CommonApi {
    PamirsUser getUser(); // 定义业务专属接口：获取登录用户
}
```

#### 步骤 5：实现接口并管理生命周期

**实现 **`XSessionApi`** 和 **`SessionClearApi`

+ `XSessionApi`：提供业务数据访问入口
+ `SessionClearApi`：定义数据清理逻辑（框架自动调用）

``` java
package pro.shushi.pamirs.demo.core.session;

import org.springframework.stereotype.Component;
import pro.shushi.pamirs.meta.api.core.session.SessionClearApi;
import pro.shushi.pamirs.user.api.model.PamirsUser;

@Component
public class DemoSessionHolder implements DemoSessionApi, SessionClearApi {
    @Override
    public PamirsUser getUser() {
        return DemoSessionCache.getUser(); // 委托给线程缓存获取数据
    }

    @Override
    public void clear() {
        DemoSessionCache.clear(); // 清理线程本地数据
    }
}
```

#### 步骤 6：继承并扩展 PamirsSession（XSession）

通过静态方法封装自定义接口，简化业务调用。

``` java
package pro.shushi.pamirs.demo.core.session;

import pro.shushi.pamirs.meta.api.CommonApiFactory;
import pro.shushi.pamirs.meta.api.session.PamirsSession;
import pro.shushi.pamirs.user.api.model.PamirsUser;

public class DemoSession extends PamirsSession {
    // 提供便捷访问入口：通过自定义API获取业务数据
    public static PamirsUser getUser() {
        return CommonApiFactory.getApi(DemoSessionApi.class).getUser();
    }
}
```

#### 步骤 7：业务场景应用

在需要使用自定义数据的场景（如占位符解析、业务逻辑层）直接调用扩展后的 Session 接口。
**示例：**

``` java
return DemoSession.getUser().getId().toString(); // 使用扩展Session获取用户ID
```

### 3、经典扩展设计图

``` plain
                          +-------------------+
                          |   PamirsSession    |  基础会话（提供通用能力）
                          +-------------------+
                                  ▲
                                  |  继承
                                  ▼
                          +-------------------+
                          |     DemoSession     |  扩展会话（提供自定义接口）
                          +-------------------+
                                  ▲
                                  |  委托
                                  ▼
                          +-------------------+
                          |   DemoSessionApi    |  业务接口（定义专属能力）
                          +-------------------+
                                  ▲
                                  |  实现
                                  ▼
                          +-------------------+
                          |  DemoSessionHolder  |  能力实现（对接线程缓存）
                          +-------------------+
                                  ▲
                                  |  操作
                                  ▼
                          +-------------------+
                          |   DemoSessionCache  |  线程缓存（ThreadLocal存储）
                          +-------------------+
                                  ▲
                                  |  承载
                                  ▼
                          +-------------------+
                          |  DemoSessionData    |  业务数据（自定义字段）
                          +-------------------+
```

### 4、关键技术点说明

#### 线程安全保障

+ **ThreadLocal 存储**：每个线程独立持有 `DemoSessionData` 实例，避免并发访问冲突
+ **Hook 初始化**：在请求处理链前端（如 `HookBefore`）触发初始化，确保数据在业务逻辑前准备完毕

####  生命周期管理

+ **自动清理**：实现 `SessionClearApi` 的 `clear()` 方法，由框架在请求结束时统一调用，释放线程本地资源
+ **模块过滤**：通过 `@Hook(module = ...)` 限制钩子作用范围，避免无关模块性能损耗

#### 接口扩展规范

+ **继承`CommonApi`**：确保自定义 API 兼容框架扩展机制（如通过 `CommonApiFactory` 获取实例）
+ **静态方法封装**：在扩展 Session 类中提供静态访问入口，简化业务代码调用

### 5、最佳实践

+ **数据最小化原则**：仅在会话中存储必要的业务数据，避免内存浪费
+ **钩子优先级控制**：通过 `@Hook(priority = ...)` 确保初始化钩子在依赖数据的逻辑之前执行



