---
title: 消息 API（Message API）
index: true
category:
  - 研发手册
  - Reference
  - 标准模块
order: 2

---
# 一、概述

Oinone 消息服务提供统一的消息发送接口，支持系统消息、邮件、短信等多种消息类型。本文档定义了 `MessageSender`（系统消息）、`EmailSender`（邮件）、`SMSSender`（短信）三大核心接口的规范。

# 二、准备工作

如果通过我们工程脚手架工具生成的则已经引入了无需做更多的配置，如果不是则需要按以下步骤先配置依赖和增加启动模块

pamirs-demo-boot的pom文件中引入pamirs-message-core包依赖

``` xml
<dependency>
  <groupId>pro.shushi.pamirs.core</groupId>
  <artifactId>pamirs-message-core</artifactId>
</dependency>
```

pamirs-demo-boot的application-dev.yml文件中增加配置pamirs.boot.modules增加message，即在启动应用中增加message模块

``` yaml
pamirs:
	boot:
    modules:
      - message
```

## （一）引入消息服务核心依赖

在 启动工程中 的 `pom.xml` 中添加以下依赖：

``` xml
<dependency>
    <groupId>pro.shushi.pamirs.core</groupId>
    <artifactId>pamirs-message-core</artifactId>
</dependency>
```

**说明**：该依赖包含消息服务的基础接口、实现类及配置项。

## （二）启用消息服务模块

在 `application-dev.yml`（或对应环境配置文件）中添加模块加载配置：

``` yaml
pamirs:
  boot:
    modules:
      - message  # 启用消息服务模块
```

## （三）环境差异说明

+ **开发环境**：可直接使用上述配置，默认加载 `application-dev.yml` 中的基础参数。
+ **生产环境**：需在对应配置文件（如 `application-prod.yml`）中补充实际的邮件服务器账号、短信通道密钥等敏感信息，确保配置与生产环境一致。

完成以上步骤后，消息服务模块将随应用启动自动加载，可直接调用相关接口发送消息。

## （四）引入消息服务API依赖

在业务模块的 `pom.xml` 中添加消息服务 API 依赖，用于调用邮件 / 短信发送接口：

``` xml
<dependency>
    <groupId>pro.shushi.pamirs.core</groupId>
    <artifactId>pamirs-message-api</artifactId>
</dependency>
```

**作用**：引入 `EmailSender`、`SMSSender` 等接口定义，支持在业务代码中调用消息发送功能。

# 三、消息配置

## （一）初始化邮件和短信通道配置

该类用于初始化邮件和短信通道配置，实现了`InstallDataInit`和`UpgradeDataInit`接口，系统安装和升级时自动执行配置初始化。

``` java
@Component
public class TestMessageInit implements InstallDataInit, UpgradeDataInit {

    @Override
    public boolean init(AppLifecycleCommand command, String version) {
        initEmail();
        initSms();
        return Boolean.TRUE;
    }

    @Override
    public boolean upgrade(AppLifecycleCommand command, String version, String existVersion) {
        initEmail();
        initSms();
        return Boolean.TRUE;
    }

    @Override
    public List<String> modules() {
        return Collections.singletonList(TestModule.MODULE_MODULE);
    }

    @Override
    public int priority() {
        return 0;
    }
}

```

## （二）邮件服务配置

**方法**：`initEmail()`

``` java
private void initEmail(){
    EmailSenderSource emailSenderSource = new EmailSenderSource();
    emailSenderSource.setName("邮件发送服务");
    emailSenderSource.setType(MessageEngineTypeEnum.EMAIL_SEND);
    emailSenderSource.setSequence(10);
    emailSenderSource.setSmtpUser(""); // 发送账号，需自行替换
    emailSenderSource.setSmtpPassword(""); // 发送密码，需自行替换
    emailSenderSource.setSmtpHost("smtp.exmail.qq.com");
    emailSenderSource.setSmtpPort(465);
    emailSenderSource.setSmtpSecurity(EmailSendSecurityEnum.SSL);
    emailSenderSource.createOrUpdate();
}
```

**配置说明**：

+ **SMTP 服务器**：腾讯企业邮箱（[smtp.exmail.qq.com:465](https://smtp.exmail.qq.com:465/)）
+ **安全协议**：SSL/TLS
+ **账号密码**：需替换为实际可用的邮箱账号和授权码

## （三）短信服务配置

**方法**：`initSms()`

``` java
private void initSms(){
    SmsChannelConfig smsChannelConfig = new SmsChannelConfig();
    smsChannelConfig.setType(MessageEngineTypeEnum.SMS_SEND);
    smsChannelConfig.setChannel(SMSChannelEnum.ALIYUN);
    smsChannelConfig.setSignName("oinone");
    smsChannelConfig.setAccessKeyId(""); // 阿里云AccessKeyId，需自行替换
    smsChannelConfig.setAccessKeySecret(""); // 阿里云AccessKeySecret，需自行替换
    smsChannelConfig.setEndpoint("https://dysmsapi.aliyuncs.com");
    smsChannelConfig.setRegionId("cn-hangzhou");
    smsChannelConfig.setTimeZone("GMT");
    smsChannelConfig.setSignatureMethod("HMAC-SHA1");
    smsChannelConfig.setSignatureVersion("1.0");
    smsChannelConfig.setVersion("2017-05-25");
    smsChannelConfig.createOrUpdate();

    // 初始化短信模版
    SmsTemplate smsTemplate = new SmsTemplate();
    smsTemplate.setName("通知短信");
    smsTemplate.setTemplateType(SMSTemplateTypeEnum.NOTIFY);
    smsTemplate.setTemplateCode("SMS_244595482"); // 从阿里云获取，需自行提供
    smsTemplate.setTemplateContent("尊敬的&{name},你的&{itemName}库存为&{quantity}");
    smsTemplate.setChannel(SMSChannelEnum.ALIYUN);
    smsTemplate.setStatus(SMSTemplateStatusEnum.SUCCESS);
    smsTemplate.createOrUpdate();
}
```

**配置说明**：

+ **短信通道**：阿里云短信服务
+ **签名与模板**：需提前在阿里云控制台申请并通过审核
+ **AccessKey**：需替换为实际可用的阿里云账号凭证

# 四、API使用说明

## （一）系统消息接口（MessageSender）

### 1、接口定义

``` java
public interface MessageSender {
    Boolean sendSystemMail(SystemMessage systemTransient);
    Boolean sendSystemMailBroadcast(SystemMessage systemTransient);
    Boolean sendChannelMail(MessageGroup groupTransient);
    Boolean sendModelMail(List<`PamirsMessage`> messageList, List<`PamirsUser`> partnerList);
}
```

### 2、发送点对点系统消息 

``` java
/**
 * 发送点对点系统消息
 * @param systemTransient 系统消息传输模型
 * @return Boolean 发送结果 (true=成功)
 * @throws PamirsException 参数错误或数据库异常 (错误码: MAIL_NO_PARTNER_OR_MESSAGE_ERROR)
*/
Boolean sendSystemMail(SystemMessage systemTransient);
```

+ **功能**：向指定用户发送一对一系统消息，自动创建或复用消息频道。
+ **参数**：`systemTransient` 系统消息载体，必填，类型为`SystemMessage`，包含消息内容（`messages`）和接收人（`partners`）
+ **SystemMessage 模型**：

``` java
public class SystemMessage {
    private List<`PamirsMessage`> messages; // 消息内容列表
    private List<`PamirsUser`> partners;    // 接收用户列表
    private MessageGroupTypeEnum type;    // 消息类型（枚举）
}
```

+ **PamirsMessage 模型关键字段：**

| **字段名**        | **数据类型**         | **描述**                         |
| :---------------- | :------------------- | :------------------------------- |
| appModule         | ModuleDefinition     | 关联的应用模块                   |
| module            | String               | 消息所属模块的编码               |
| subject           | String               | 消息的主题                       |
| name              | String               | 消息的名称                       |
| body              | String               | 消息的内容，支持 HTML 格式       |
| file              | List<`PamirsFile`>     | 消息的附件列表                   |
| parent            | PamirsMessage        | 当前消息的父消息                 |
| children          | List<`PamirsMessage`>  | 当前消息的子消息列表             |
| resModel          | String               | 相关业务模型的名称               |
| resViewActionName | String               | 业务跳转窗口动作的名称           |
| resViewAction     | ViewAction           | 关联的业务跳转窗口动作           |
| resId             | Long                 | 相关业务模型行记录的 id          |
| resName           | String               | 相关业务模型行记录的名称         |
| messageType       | MessageTypeEnum      | 消息的类型                       |
| subtype           | MessageSubtype       | 消息的子类型                     |
| sendPartner       | PamirsUser           | 消息的发送者                     |
| partnerNeedAction | List<`UnreadMessage`>  | 需要对消息进行操作的通知对象列表 |
| channels          | List<`MessageChannel`> | 消息的接收频道列表               |
| mailMaster        | MessageMasterEnum    | 消息在聊天窗口中的位置枚举       |
| iconUrl           | String               | 消息的头像 URL                   |
| extendIcon        | String               | 工作流催办时的额外图表相关信息   |
| currentUserName   | String               | 当前登录的用户名                 |
| workFlowTaskType  | String               | 工作流类型                       |


+ **返回值**：
  - `Boolean`：发送成功返回 `true`，失败抛出 `PamirsException`。
+ **异常**：
  - `MAIL_NO_PARTNER_OR_MESSAGE_ERROR`：接收人或消息内容为空。
  - `SYSTEM_ERROR`：数据库操作或频道创建失败。
+ **示例：**

``` java
MessageSender mailSender = (MessageSender) MessageEngine.get(MessageEngineTypeEnum.MAIL_SEND).get(null);

SystemMessage msg = new SystemMessage().setMessages(List.of(
    new PamirsMessage()
    .setName("任务提醒")
    .setSubject("任务提醒")
    .setBody("<p>您有新的待办事项</p>")
    .setMessageType(MessageTypeEnum.NOTIFICATION)
)).setPartners(List.of(recipientUser));

messageSender.sendSystemMail(msg);
```

### 3、广播系统消息

``` java
/**
 * 发送广播消息到 SYSTEM_MAIL_BROADCAST 频道
 * @param systemTransient 系统消息传输模型
 * @return Boolean 发送结果
 * @throws PamirsException 参数错误或数据库异常
*/
Boolean sendSystemMailBroadcast(SystemMessage systemTransient);
```

+ **功能**：向多个用户广播系统消息，使用预定义的广播频道。
+ **参数**：
  - 同 `sendSystemMail`，但 `partners` 为多用户列表。
+ **实现逻辑**：
  - 自动关联系统广播频道（`SYSTEM_MAIL_BROADCAST`）。
  - 校验用户是否在频道中，自动添加缺失用户。
+ **返回值**：`Boolean`，成功与否。
+ **使用场景：**

``` java
// 发送全员公告
SystemMessage broadcast = new SystemMessage()
.setMessages(List.of(
    new PamirsMessage()
    .setName("系统维护通知")
    .setSubject("系统维护通知")
    .setBody("<p>将于今晚00:00进行系统升级</p>")
))
.setPartners(allUsers);

messageSender.sendSystemMailBroadcast(broadcast);
```

### 4、发送频道消息

``` java
Boolean sendChannelMail(MessageGroup groupTransient);
```

+ **功能**：向指定消息频道发送消息。
+ **参数**：`groupTransient` 频道消息载体，必填，包含频道（`channel`）和消息列表（`messages`）
+ **MessageGroup 模型**：**java**

``` java
public class MessageGroup {
    private Long id;                // 频道/用户 ID
    private List<`PamirsMessage`> messages; // 消息列表
    private MessageChannel channel; // 目标频道
}
```

+ **返回值**：`Boolean`，成功与否。

### 5、发送模型关联消息

``` java
/**
 * 发送与业务模型关联的消息
 * @param messageList 消息列表
 * @param partnerList 接收用户列表
 * @return Boolean 发送结果
*/
Boolean sendModelMail(List<`PamirsMessage`> messageList, List<`PamirsUser`> partnerList);
```

+ **功能**：发送与业务模型关联的消息（如工作流通知），支持批量用户。
+ **参数**：
  - `messageList` 消息列表，必填，包含模型引用（`resModel`, `resId`）
  - `partnerList`接收用户列表
+ **返回值**：`Boolean`，成功与否。
+ **示例场景：**

``` java
// 订单新增备注通知
PamirsMessage orderMsg = new PamirsMessage()
.setResModel("sale.order")
.setResId(12345L)//订单号
.setSubject("订单增加备注")
.setBody("这是备注内容");

messageSender.sendModelMail(List.of(orderMsg), List.of(customerUser));
```

## （二）邮件服务接口（EmailSender）

### 1、接口定义

``` java
public interface EmailSender {
    Boolean send(EmailTemplate template, Map<String, Object> data, String sendTo, String copyTo) throws Exception;
    Boolean send(EmailPoster poster);
    Boolean sendVerify(String templateType, String mailAddr);
}
```

### 2、基于模板发送邮件

``` java
/**
 * 使用邮件模板发送
 * @param template 邮件模板
 * @param data 模板参数
 * @param sendTo 收件人（多个用逗号分隔）
 * @param copyTo 抄送人
 * @return 发送结果
*/
Boolean send(EmailTemplate template, Map<String, Object> data, String sendTo, String copyTo) throws Exception;
```

+ **功能**：使用预定义邮件模板发送邮件，支持占位符替换。
+ **参数**：

| **名称**   | **类型**            | **必填** | **描述**                                |
| :--------- | :------------------ | :------- | :-------------------------------------- |
| `template` | EmailTemplate       | 是       | 邮件模板（包含标题、内容、服务器配置）  |
| `data`     | Map<String, Object> | 是       | 占位符数据（如 `${name}` 替换为实际值） |
| `sendTo`   | String              | 是       | 收件人邮箱（逗号分隔多地址）            |
| `copyTo`   | String              | 否       | 抄送人邮箱（逗号分隔多地址）            |


+ **EmailTemplate 模型**：

``` java
public class EmailTemplate {
    private String title;       // 邮件标题
    private String body;        // 邮件内容（支持 HTML）
    private EmailSenderSource source; // 邮件服务器配置
}
```

+ **模板示例：**

``` plain
<!-- 模板示例 -->
亲爱的${user.name}，您的验证码是：${code}
```

+ **返回值**：`Boolean`，成功与否，失败抛出 `Exception`。

### 3、直接发送邮件

``` java
/**
 * 直接发送原始邮件
 * @param poster 邮件数据对象
 * @return 发送结果
*/
Boolean send(EmailPoster poster);
```

+ **功能**：使用原始邮件参数发送邮件，支持附件。
+ **参数**：

| **名称** | **类型**    | **必填** | **描述**     |
| :------- | :---------- | :------- | :----------- |
| `poster` | EmailPoster | 是       | 邮件参数载体 |


+ **EmailPoster 模型**：**java**

``` java
public class EmailPoster {
    private String title;       // 标题
    private String sender; 		// 发件人名称
    private String body;        // 内容（HTML）
    private String sendTo;      // 收件人
    private String copyTo;      // 抄送人
    private String replyTo;		// 回复对象,逗号分隔
    private List<`PamirsFile`> resourceFiles; // 附件列表
}
```

+ **示例场景：**

``` java
List<String> receiveEmails = Collections.singletonList("testhaha@shushi.pro"); // 需替换为实际收件人邮箱
    
EmailSender emailSender = (EmailSender) MessageEngine.get(MessageEngineTypeEnum.EMAIL_SEND).get(null);

String title = "标题";
String body = "内容（HTML";
String sender = "发件人名称";
String replyEmail = "回复邮箱";

EmailPoster emailPoster = new EmailPoster()
        .setSender(sender)
        .setTitle(title)
        .setBody(body)
        .setReplyTo(replyEmail);

StringBuilder errorMessages = new StringBuilder();
receiveEmails.forEach(email -> {
    try {
        if (!emailSender.send(emailPoster.setSendTo(email))) {
            log.error("发送邮件失败:emailPoster:{}", JsonUtils.toJSONString(emailPoster));
            errorMessages.append("发送邮件失败，错误信息：系统异常，邮箱：").append(email).append(";");
        }
    } catch (Exception e) {
        log.error("发送邮件失败:emailPoster:{},异常:{}", JsonUtils.toJSONString(emailPoster), e);
        String errorMsg = transferEmailThrowMessage(e);
        errorMessages.append("发送邮件失败，错误信息：").append(errorMsg).append("，邮箱：").append(email).append(";");
    }
});

```

### 4、发送验证邮件

``` java
/**
 * 发送验证邮件（含验证码）
 * @param templateType 模板类型（如 SIGN_UP）
 * @param mailAddr 目标邮箱
 * @return 发送结果
*/
Boolean sendVerify(String templateType, String mailAddr);
```

+ **功能**：发送验证码邮件（如注册、找回密码），自动生成验证码并存储。
+ **参数**：

| **名称**       | **类型** | **必填** | **描述**                                |
| :------------- | :------- | :------- | :-------------------------------------- |
| `templateType` | String   | 是       | 模板类型（枚举：`SMSTemplateTypeEnum`） |
| `mailAddr`     | String   | 是       | 目标邮箱                                |


+ **返回值**：`Boolean`，成功与否。
+ **流程说明：**
  - 生成6位随机验证码
  - 保存到 VerificationCode 表
  - 使用对应模板发送邮件
  - 验证码有效期默认10分钟

## （三）短信发送接口（SMSSender）

### 1、接口定义

``` java
public interface SMSSender {
    Boolean smsSend(SMSTemplateTypeEnum templateType, String phoneNum, Map<String, String> placeholders);
    Boolean smsSend(SmsTemplate template, String phoneNum, Map<String, String> placeholders);
}
```

### 2、发送短信

``` java
Boolean smsSend(SMSTemplateTypeEnum templateType, String phoneNum, Map<String, String> placeholders);
```

+ **功能**：使用预定义短信模板发送短信，支持参数替换（如验证码）。
+ **参数**：

| **名称**       | **类型**            | **必填** | **描述**                              |
| :------------- | :------------------ | :------- | :------------------------------------ |
| `templateType` | SMSTemplateTypeEnum | 是       | 模板类型（枚举：登录、注册等）        |
| `phoneNum`     | String              | 是       | 目标手机号                            |
| `placeholders` | Map<String, String> | 是       | 占位符数据（如 `{code}`替换为验证码） |


+ **枚举值**：
  - `SMSTemplateTypeEnum.SIGN_IN`：登录验证
  - `SMSTemplateTypeEnum.SIGN_UP`：用户注册
  - `SMSTemplateTypeEnum.NOTIFY`：通知短信
+ **示例场景：**

``` java
// 获取 SMSSender
SMSSender smsSender = (SMSSender) MessageEngine.get(MessageEngineTypeEnum.SMS_SEND).get(null);

// 使用预定义模板
smsSender.smsSend(SMSTemplateTypeEnum.SIGN_IN, "13800138000", 
    Map.of("code", "123456"));

// 使用自定义模板
SmsTemplate template = new SmsTemplate().setTemplateType(SMSTemplateTypeEnum.NOTIFY).setTemplateCode("SMS_246455054").queryOne();
smsSender.smsSend(template, "13912345678",
    Map.of("orderNo", "2023123456"));
```

### 3、模板管理

**SmsTemplate 字段说明：**

| **字段**                                                    | **必填**                                       | **说明**                                                     |
| ----------------------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------ |
| templateCode    | 是 | 第三方平台模板ID |
| templateContent | 是 | 模板内容（含${var}占位符） |
| channel         | 是 | 短信通道（ALIYUN/CUSTOM） |
| status          | -  | 审核状态（AUDITING/SUCCESS） |


**阿里云模板示例：**

``` java
您的验证码为${code}，5分钟内有效，请勿泄露
```

## （四）附录：公共模型

### 1、MessageChannel 消息频道

| **字段**                                                | **类型**                                                     | **说明**                                                     |
| ------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| channelType | MessageChannelTypeEnum | 频道类型（SYSTEM_MAIL/CHAT） |
| openType    | MessageChannelOpenTypeEnum | 开放类型（PUBLIC/PRIVATE） |
| partners    | List<`PamirsUser`> | 频道成员         |









