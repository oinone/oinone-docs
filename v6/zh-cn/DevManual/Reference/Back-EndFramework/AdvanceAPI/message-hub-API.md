---
title: 消息中心 API（Message Hub API）
index: true
category:
  - 研发手册
  - Reference
  - 后端API
  - Advance API
order: 5

---
# 一、类概述

**MessageHub** 是消息处理核心类，用于管理应用中的消息传递与状态控制。支持不同级别的消息（调试、信息、成功、警告、错误），并根据消息级别和配置决定前端展示形式及业务流程控制（如是否中断操作）。通过 `PamirsSession.getMessageHub()` 获取实例。

# 二、成员变量

| **变量名**       | **类型**              | **描述**                                                     |
| :--------------- | :-------------------- | :----------------------------------------------------------- |
| `success`        | boolean               | 是否成功（不包含 ERROR 级别的消息），默认 `true`<br/>。当存在 ERROR 消息时自动设为 `false`<br/>。 |
| `exception`      | boolean               | 是否为异常状态（未在代码中明确使用，可能预留扩展）。         |
| `dataExtension`  | `DataExtension`       | 存储非错误消息（INFO、SUCCESS、WARN 等）及扩展数据。         |
| `errorExtension` | `ErrorExtension`      | 存储错误消息（ERROR 级别）及错误详情（代码、类型等）。       |
| `path`           | `ClientExecutionPath` | 消息关联的执行路径，用于定位前端展示位置（如字段级错误）。   |


# 三、构造方法

## （一）`MessageHub()`

+ **描述**：默认构造方法，初始化 `success` 为 `true`。
+ **返回值**：`MessageHub` 实例。

# 四、核心方法

## （一）消息添加方法

### 1、`msg(Message message)`

+ **描述**：添加单条消息。根据消息级别（`InformationLevelEnum`）决定存储到 `dataExtension`（非 ERROR）或 `errorExtension`（ERROR）。
+ **参数**：`message` - `Message` 实例，需设置 `level` 和 `message`。
+ **返回值**：`MessageHub` 实例（支持链式调用）。
+ **示例**：**java**

```java
PamirsSession.getMessageHub()
    .msg(Message.init()
        .setLevel(InformationLevelEnum.ERROR)
        .setField("name")
        .setMessage("名称为必填项"));
```

### 2、`msg(List<Message> messages)`

+ **描述**：批量添加消息，逐条调用 `msg()` 处理。
+ **参数**：`messages` - `Message` 列表。
+ **返回值**：`MessageHub` 实例。

### 3、快捷级别方法（`info`, `warn`, `success`, `error`）

| **方法名**            | **描述**                                      | **参数**              | **返回值**   |
| :-------------------- | :-------------------------------------------- | :-------------------- | :----------- |
| `info(String msg)`    | 添加 INFO 级别消息                            | `msg`<br/> - 消息内容 | `MessageHub` |
| `warn(String msg)`    | 添加 WARN 级别消息                            | `msg`<br/> - 消息内容 | `MessageHub` |
| `success(String msg)` | 添加 SUCCESS 级别消息                         | `msg`<br/> - 消息内容 | `MessageHub` |
| `error(String msg)`   | 添加 ERROR 级别消息，自动设置 `success=false` | `msg`<br/> - 消息内容 | `MessageHub` |


**示例**：

```java
// 快速添加警告消息
messageHub.warn("连接即将超时");
```

## （二）扩展数据与指令

### 1、`extensions(Map<Object, Object> extensions)`

+ **描述**：批量添加扩展数据，存储到 `dataExtension.extensions`。
+ **参数**：`extensions` - 键值对扩展数据。
+ **返回值**：`MessageHub` 实例。

### 2、`extensions(Object key, Object value)`

+ **描述**：添加单个扩展数据。
+ **参数**：`key` - 键，`value` - 值。
+ **返回值**：`MessageHub` 实例。

### 3、`directives(Set<String> directives)` / `directives(String directive)`

+ **描述**：添加前端指令（如页面跳转、刷新等），存储到 `dataExtension.directives`。
+ **参数**：`directives` - 指令集合或单个指令。
+ **返回值**：`MessageHub` 实例。

## （三）错误处理

### 1、`error(ExpBaseEnum error)`

+ **描述**：根据枚举添加错误消息，包含错误码、类型和消息。
+ **参数**：`error` - 实现 `ExpBaseEnum` 的枚举实例（需提供 `msg()`, `code()`, `type()`）。
+ **返回值**：`MessageHub` 实例。

### 2、`fill(boolean success, ErrorExtension errorExtension)`

+ **描述**：填充错误状态和详情，自动处理消息和状态标记。
+ **参数**：`success` - 是否成功，`errorExtension` - 错误扩展信息。
+ **返回值**：`MessageHub` 实例。

## （四）执行路径

### 1、`appendPath(String segment)` / `appendPath(Integer segment)`

+ **描述**：添加执行路径段（字符串或整数，用于字段定位，如 `name` 或数组索引）。
+ **参数**：`segment` - 路径段。
+ **返回值**：`MessageHub` 实例。

**示例**：

```java
// 设置字段 "name" 的错误路径
messageHub.appendPath("name");
```

## （五）状态控制

### 1、`error()`

+ **描述**：标记为错误状态（`success=false`），不添加具体消息。
+ **返回值**：`MessageHub` 实例。

### 2、`clear()`

+ **描述**：清除所有消息和状态，重置 `success=true`。
+ **返回值**：`MessageHub` 实例。

## （六）数据获取

### 1、`getAllMessages()`

+ **描述**：获取所有消息（包括数据消息和错误消息）。
+ **返回值**：`List<Message>`。

### 2、`getDataMessages()` / `getErrorMessages()`

+ **描述**：分别获取非错误消息和错误消息列表。
+ **返回值**：`List<Message>`（可能为 `null`）。

# 五、消息级别（`InformationLevelEnum`）

| **级别**  | **描述** | **前端展示特性**                                   |
| :-------- | :------- | :------------------------------------------------- |
| `DEBUG`   | 调试信息 | 通常隐藏或浅色展示（依赖前端配置）。               |
| `INFO`    | 普通信息 | 提示性 Toast 或横幅。                              |
| `SUCCESS` | 成功通知 | 绿色高亮，可能伴随操作反馈。                       |
| `WARN`    | 警告     | 黄色高亮，提示潜在问题。                           |
| `ERROR`   | 错误     | 红色高亮，可中断流程（根据 `success`<br/> 判断）。 |


**前端展示规则**：

+ 未设置 `field` 的消息：通过 Toast 等全局方式展示。
+ 设置 `field` 的消息：在对应字段下方展示（如表单验证错误）。
+ 错误消息中断逻辑：若 `success=false`，仅展示消息不跳转；否则展示后跳转。

# 六、示例代码

## （一）表单验证场景

```java
@Function
public Boolean checkData(TestConstraintsModel data) {
    String name = data.getName();
    boolean success = true;
    if (StringUtils.isBlank(name)) {
        PamirsSession.getMessageHub()
            .msg(Message.init()
                .setLevel(InformationLevelEnum.ERROR)
                .setField(LambdaUtil.fetchFieldName(TestConstraintsModel::getName))
                .setMessage("名称为必填项"));
        success = false;
    }
    if (name.length() > 4) {
        PamirsSession.getMessageHub()
            .msg(Message.init()
                .setLevel(InformationLevelEnum.ERROR)
                .setField(LambdaUtil.fetchFieldName(TestConstraintsModel::getName))
                .setMessage("名称过长，不能超过4位"));
        success = false;
    }
    return success;
}
```

+ **说明**：验证 `name` 字段，添加字段级错误消息，自动标记 `success=false`，前端在 `name` 字段下方展示错误。

## （二）快速添加成功消息

```java
messageHub.success("操作成功！")
          .directives("redirectToHome"); // 添加前端跳转指令
```

# 七、注意事项

1. **消息级别优先级**：`ERROR` 级别消息会强制标记 `success=false`，其他级别不影响 `success`（除非显式调用 `error()`）。
2. **字段定位**：通过 `setField()` 或 `appendPath()` 设置字段路径，确保前端正确定位展示位置。
3. **性能**：`closure(Supplier<T>)` 方法用于在代码块前后自动清除消息中心，避免跨请求消息污染。

# 八、类图（简略）

```plain
MessageHub
├─ success: boolean
├─ dataExtension: DataExtension
├─ errorExtension: ErrorExtension
├─ path: ClientExecutionPath
├─ msg(Message): MessageHub
├─ info(String): MessageHub
├─ error(String): MessageHub
└─ clear(): MessageHub
```

通过以上文档，开发者可清晰了解 `MessageHub` 的消息管理机制、各级别消息的处理逻辑及前端展示规则，快速实现业务中的消息传递与状态控制。

