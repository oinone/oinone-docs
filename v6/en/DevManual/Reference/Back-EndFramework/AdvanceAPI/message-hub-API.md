---
title: Message Hub API
index: true
category:
  - R&D Manual
  - Reference
  - Backend API
  - Advance API
order: 5

---
# Ⅰ、Class Overview

**MessageHub** is the core class for message processing, used to manage message transmission and status control in applications. It supports different levels of messages (debug, info, success, warning, error) and determines the front-end display form and business process control (such as whether to interrupt operations) based on the message level and configuration. Obtain the instance through `PamirsSession.getMessageHub()`.

# Ⅱ、Member Variables

| **Variable Name**       | **Type**              | **Description**                                                     |
| :--------------- | :-------------------- | :----------------------------------------------------------- |
| `success`        | boolean               | Whether successful (does not include ERROR-level messages), default `true`<br/>. Automatically set to `false` when ERROR messages exist.<br/>. |
| `exception`      | boolean               | Whether it is an exception state (not explicitly used in the code, possibly reserved for extension).         |
| `dataExtension`  | `DataExtension`       | Stores non-error messages (INFO, SUCCESS, WARN, etc.) and extended data.         |
| `errorExtension` | `ErrorExtension`      | Stores error messages (ERROR level) and error details (code, type, etc.).       |
| `path`           | `ClientExecutionPath` | The execution path associated with the message, used to locate the front-end display position (such as field-level errors).   |


# Ⅲ、Constructor

## (Ⅰ) `MessageHub()`

+ **Description**: Default constructor, initializes `success` to `true`.
+ **Return Value**: `MessageHub` instance.

# Ⅳ、Core Methods

## (Ⅰ) Message Addition Methods

### 1. `msg(Message message)`

+ **Description**: Adds a single message. Determines whether to store it in `dataExtension` (non-ERROR) or `errorExtension` (ERROR) based on the message level (`InformationLevelEnum`).
+ **Parameter**: `message` - `Message` instance, which needs to set `level` and `message`.
+ **Return Value**: `MessageHub` instance (supports chaining).
+ **Example**: **java**

```java
PamirsSession.getMessageHub()
    .msg(Message.init()
        .setLevel(InformationLevelEnum.ERROR)
        .setField("name")
        .setMessage("名称为必填项"));
```

### 2. `msg(List<Message> messages)`

+ **Description**: Adds messages in batches, processing each by calling `msg()`.
+ **Parameter**: `messages` - `Message` list.
+ **Return Value**: `MessageHub` instance.

### 3. Quick Level Methods (`info`, `warn`, `success`, `error`)

| **Method Name**            | **Description**                                      | **Parameter**              | **Return Value**   |
| :-------------------- | :-------------------------------------------- | :-------------------- | :----------- |
| `info(String msg)`    | Adds an INFO-level message                            | `msg`<br/> - Message content | `MessageHub` |
| `warn(String msg)`    | Adds a WARN-level message                            | `msg`<br/> - Message content | `MessageHub` |
| `success(String msg)` | Adds a SUCCESS-level message                         | `msg`<br/> - Message content | `MessageHub` |
| `error(String msg)`   | Adds an ERROR-level message and automatically sets `success=false` | `msg`<br/> - Message content | `MessageHub` |


**Example**:

```java
// Quickly add a warning message
messageHub.warn("连接即将超时");
```

## (Ⅱ) Extended Data and Directives

### 1. `extensions(Map<Object, Object> extensions)`

+ **Description**: Adds extended data in batches and stores it in `dataExtension.extensions`.
+ **Parameter**: `extensions` - Key-value extended data.
+ **Return Value**: `MessageHub` instance.

### 2. `extensions(Object key, Object value)`

+ **Description**: Adds a single piece of extended data.
+ **Parameter**: `key` - Key, `value` - Value.
+ **Return Value**: `MessageHub` instance.

### 3. `directives(Set<String> directives)` / `directives(String directive)`

+ **Description**: Adds front-end directives (such as page navigation, refresh, etc.) and stores them in `dataExtension.directives`.
+ **Parameter**: `directives` - Directive set or single directive.
+ **Return Value**: `MessageHub` instance.

## (Ⅲ) Error Handling

### 1. `error(ExpBaseEnum error)`

+ **Description**: Adds an error message based on the enum, including the error code, type, and message.
+ **Parameter**: `error` - An enum instance implementing `ExpBaseEnum` (needs to provide `msg()`, `code()`, `type()`).
+ **Return Value**: `MessageHub` instance.

### 2. `fill(boolean success, ErrorExtension errorExtension)`

+ **Description**: Fills the error status and details, automatically handling message and status marking.
+ **Parameter**: `success` - Whether successful, `errorExtension` - Error extension information.
+ **Return Value**: `MessageHub` instance.

## (Ⅳ) Execution Path

### 1. `appendPath(String segment)` / `appendPath(Integer segment)`

+ **Description**: Adds an execution path segment (string or integer, used for field positioning, such as `name` or array index).
+ **Parameter**: `segment` - Path segment.
+ **Return Value**: `MessageHub` instance.

**Example**:

```java
// Set the error path for the field "name"
messageHub.appendPath("name");
```

## (Ⅴ) Status Control

### 1. `error()`

+ **Description**: Marks the error status (`success=false`), without adding specific messages.
+ **Return Value**: `MessageHub` instance.

### 2. `clear()`

+ **Description**: Clears all messages and statuses, resetting `success=true`.
+ **Return Value**: `MessageHub` instance.

## (Ⅵ) Data Acquisition

### 1. `getAllMessages()`

+ **Description**: Gets all messages (including data messages and error messages).
+ **Return Value**: `List<Message>`.

### 2. `getDataMessages()` / `getErrorMessages()`

+ **Description**: Gets the non-error message and error message lists, respectively.
+ **Return Value**: `List<Message>` (may be `null`).

# Ⅴ、Message Levels (`InformationLevelEnum`)

| **Level**  | **Description** | **Front-end Display Characteristics**                                   |
| :-------- | :------- | :------------------------------------------------- |
| `DEBUG`   | Debug information | Usually hidden or displayed in light color (depends on front-end configuration).               |
| `INFO`    | General information | Prompt Toast or banner.                              |
| `SUCCESS` | Success notification | Green highlight, possibly with operation feedback.                       |
| `WARN`    | Warning     | Yellow highlight, prompting potential problems.                           |
| `ERROR`   | Error     | Red highlight, can interrupt the process (judged based on `success`<br/>). |


**Front-end Display Rules**:

+ Messages without `field`: Displayed globally via Toast, etc.
+ Messages with `field`: Displayed below the corresponding field (such as form validation errors).
+ Error message interruption logic: If `success=false`, only display the message without navigation; otherwise, display and navigate.

# Ⅵ、Example Code

## (Ⅰ) Form Validation Scenario

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

+ **Explanation**: Validates the `name` field, adds field-level error messages, automatically marks `success=false`, and the front end displays errors below the `name` field.

## (Ⅱ) Quickly Add a Success Message

```java
messageHub.success("操作成功！")
          .directives("redirectToHome"); // Add front-end navigation directive
```

# Ⅶ、Notes

1. **Message Level Priority**: `ERROR`-level messages will force `success=false`, and other levels do not affect `success` (unless `error()` is called explicitly).
2. **Field Positioning**: Set the field path through `setField()` or `appendPath()` to ensure the front end correctly locates the display position.
3. **Performance**: The `closure(Supplier<T>)` method is used to automatically clear the message center before and after code blocks to avoid cross-request message pollution.

# Ⅷ、Class Diagram (Simplified)

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

Through the above documentation, developers can clearly understand the message management mechanism of `MessageHub`, the processing logic of each level of messages, and the front-end display rules, and quickly implement message transmission and status control in business.