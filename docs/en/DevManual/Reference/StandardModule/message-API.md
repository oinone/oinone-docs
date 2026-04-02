---
title: Message API
index: true
category:
  - Development Manual
  - Reference
  - Standard Modules
order: 2

---
# I. Overview

The Oinone message service provides a unified message sending interface, supporting multiple message types such as system messages, emails, and SMS. This document defines the specifications for three core interfaces: `MessageSender` (system messages), `EmailSender` (emails), and `SMSSender` (SMS).

# II. Preparation Work

If generated through our project scaffolding tool, the dependency is already introduced and no further configuration is needed. If not, follow these steps to configure dependencies and add the startup module:

## (Ⅰ) Introduce Core Dependencies for Message Service

Add the following dependency to the `pom.xml` of the startup project:

``` xml
<dependency>
    <groupId>pro.shushi.pamirs.core</groupId>
    <artifactId>pamirs-message-core</artifactId>
</dependency>
```

**Explanation**: This dependency includes the basic interfaces, implementation classes, and configuration items for the message service.

## (Ⅱ) Enable the Message Service Module

Add the module loading configuration to `application-dev.yml` (or the corresponding environment configuration file):

``` yaml
pamirs:
  boot:
    modules:
      - message  # Enable the message service module
```

## (Ⅲ) Environment Differences Description

+ **Development Environment**: Directly use the above configuration, which loads the basic parameters in `application-dev.yml` by default.
+ **Production Environment**: Supplement sensitive information such as actual email server accounts and SMS channel keys in the corresponding configuration file (e.g., `application-prod.yml`) to ensure the configuration matches the production environment.

After completing the above steps, the message service module will be automatically loaded with the application startup, and relevant interfaces can be directly called to send messages.

## (Ⅳ) Introduce Message Service API Dependencies

Add the message service API dependency to the `pom.xml` of the business module for calling email/SMS sending interfaces:

``` xml
<dependency>
    <groupId>pro.shushi.pamirs.core</groupId>
    <artifactId>pamirs-message-api</artifactId>
</dependency>
```

**Function**: Introduces interface definitions such as `EmailSender` and `SMSSender`, supporting message sending functions in business code.

# III. Message Configuration

## (Ⅰ) Initialize Email and SMS Channel Configuration

This class is used to initialize email and SMS channel configurations, implementing the `InstallDataInit` and `UpgradeDataInit` interfaces, and automatically executes configuration initialization during system installation and upgrade.

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

## (Ⅱ) Email Service Configuration

**Method**: `initEmail()`

``` java
private void initEmail(){
    EmailSenderSource emailSenderSource = new EmailSenderSource();
    emailSenderSource.setName("Email Sending Service");
    emailSenderSource.setType(MessageEngineTypeEnum.EMAIL_SEND);
    emailSenderSource.setSequence(10);
    emailSenderSource.setSmtpUser(""); // Send account, replace with actual value
    emailSenderSource.setSmtpPassword(""); // Send password, replace with actual value
    emailSenderSource.setSmtpHost("smtp.exmail.qq.com");
    emailSenderSource.setSmtpPort(465);
    emailSenderSource.setSmtpSecurity(EmailSendSecurityEnum.SSL);
    emailSenderSource.createOrUpdate();
}
```

**Configuration Description**:

+ **SMTP Server**: Tencent Enterprise Mail ([smtp.exmail.qq.com:465](https://smtp.exmail.qq.com:465/))
+ **Security Protocol**: SSL/TLS
+ **Account Password**: Replace with actual available email account and authorization code

## (Ⅲ) SMS Service Configuration

**Method**: `initSms()`

``` java
private void initSms(){
    SmsChannelConfig smsChannelConfig = new SmsChannelConfig();
    smsChannelConfig.setType(MessageEngineTypeEnum.SMS_SEND);
    smsChannelConfig.setChannel(SMSChannelEnum.ALIYUN);
    smsChannelConfig.setSignName("oinone");
    smsChannelConfig.setAccessKeyId(""); // Alibaba Cloud AccessKeyId, replace with actual value
    smsChannelConfig.setAccessKeySecret(""); // Alibaba Cloud AccessKeySecret, replace with actual value
    smsChannelConfig.setEndpoint("https://dysmsapi.aliyuncs.com");
    smsChannelConfig.setRegionId("cn-hangzhou");
    smsChannelConfig.setTimeZone("GMT");
    smsChannelConfig.setSignatureMethod("HMAC-SHA1");
    smsChannelConfig.setSignatureVersion("1.0");
    smsChannelConfig.setVersion("2017-05-25");
    smsChannelConfig.createOrUpdate();

    // Initialize SMS template
    SmsTemplate smsTemplate = new SmsTemplate();
    smsTemplate.setName("Notification SMS");
    smsTemplate.setTemplateType(SMSTemplateTypeEnum.NOTIFY);
    smsTemplate.setTemplateCode("SMS_244595482"); // Obtained from Alibaba Cloud, provide your own
    smsTemplate.setTemplateContent("Dear &{name}, your &{itemName} inventory is &{quantity}");
    smsTemplate.setChannel(SMSChannelEnum.ALIYUN);
    smsTemplate.setStatus(SMSTemplateStatusEnum.SUCCESS);
    smsTemplate.createOrUpdate();
}
```

**Configuration Description**:

+ **SMS Channel**: Alibaba Cloud SMS Service
+ **Signature and Template**: Need to be applied for and approved in advance on the Alibaba Cloud console
+ **AccessKey**: Replace with actual available Alibaba Cloud account credentials

# IV. API Usage Instructions

## (Ⅰ) System Message Interface (MessageSender)

### 1. Interface Definition

``` java
public interface MessageSender {
    Boolean sendSystemMail(SystemMessage systemTransient);
    Boolean sendSystemMailBroadcast(SystemMessage systemTransient);
    Boolean sendChannelMail(MessageGroup groupTransient);
    Boolean sendModelMail(List<`PamirsMessage`> messageList, List<`PamirsUser`> partnerList);
}
```

### 2. Send Point-to-Point System Message

``` java
/**
 * Send point-to-point system message
 * @param systemTransient System message transmission model
 * @return Boolean Sending result (true = success)
 * @throws PamirsException Parameter error or database exception (error code: MAIL_NO_PARTNER_OR_MESSAGE_ERROR)
*/
Boolean sendSystemMail(SystemMessage systemTransient);
```

+ **Function**: Send one-to-one system messages to specified users, automatically creating or reusing message channels.
+ **Parameters**: `systemTransient` system message carrier, required, type `SystemMessage`, including message content (`messages`) and recipients (`partners`)
+ **SystemMessage Model**:

``` java
public class SystemMessage {
    private List<`PamirsMessage`> messages; // Message content list
    private List<`PamirsUser`> partners;    // Recipient user list
    private MessageGroupTypeEnum type;    // Message type (enumeration)
}
```

+ **Key Fields of PamirsMessage Model**:

| **Field Name**        | **Data Type**         | **Description**                         |
| :------------------- | :------------------- | :------------------------------- |
| appModule         | ModuleDefinition     | Associated application module           |
| module            | String               | Encoding of the module to which the message belongs               |
| subject           | String               | Message subject                       |
| name              | String               | Message name                       |
| body              | String               | Message content, supporting HTML format       |
| file              | List<`PamirsFile`>     | Message attachment list                   |
| parent            | PamirsMessage        | Parent message of the current message                 |
| children          | List<`PamirsMessage`>  | Child message list of the current message             |
| resModel          | String               | Name of the related business model               |
| resViewActionName | String               | Name of the business jump window action           |
| resViewAction     | ViewAction           | Associated business jump window action           |
| resId             | Long                 | Id of the related business model row record          |
| resName           | String               | Name of the related business model row record         |
| messageType       | MessageTypeEnum      | Message type                       |
| subtype           | MessageSubtype       | Message subtype                     |
| sendPartner       | PamirsUser           | Message sender                     |
| partnerNeedAction | List<`UnreadMessage`>  | List of notification objects requiring actions on the message |
| channels          | List<`MessageChannel`> | Message receiving channel list               |
| mailMaster        | MessageMasterEnum    | Enumeration of the message's position in the chat window       |
| iconUrl           | String               | Message avatar URL                   |
| extendIcon        | String               | Additional chart-related information for workflow reminders   |
| currentUserName   | String               | Current logged-in user name                 |
| workFlowTaskType  | String               | Workflow type                       |


+ **Return Value**:
  - `Boolean`: `true` for success, throws `PamirsException` for failure.
+ **Exceptions**:
  - `MAIL_NO_PARTNER_OR_MESSAGE_ERROR`: Recipient or message content is empty.
  - `SYSTEM_ERROR`: Database operation or channel creation fails.
+ **Example**:

``` java
MessageSender mailSender = (MessageSender) MessageEngine.get(MessageEngineTypeEnum.MAIL_SEND).get(null);

SystemMessage msg = new SystemMessage().setMessages(List.of(
    new PamirsMessage()
    .setName("Task Reminder")
    .setSubject("Task Reminder")
    .setBody("<p>You have new to-do items</p>")
    .setMessageType(MessageTypeEnum.NOTIFICATION)
)).setPartners(List.of(recipientUser));

messageSender.sendSystemMail(msg);
```

### 3. Broadcast System Messages

``` java
/**
 * Send broadcast messages to the SYSTEM_MAIL_BROADCAST channel
 * @param systemTransient System message transmission model
 * @return Boolean Sending result
 * @throws PamirsException Parameter error or database exception
*/
Boolean sendSystemMailBroadcast(SystemMessage systemTransient);
```

+ **Function**: Broadcast system messages to multiple users using a predefined broadcast channel.
+ **Parameters**:
  - Same as `sendSystemMail`, but `partners` is a list of multiple users.
+ **Implementation Logic**:
  - Automatically associates with the system broadcast channel (`SYSTEM_MAIL_BROADCAST`).
  - Verifies whether users are in the channel and automatically adds missing users.
+ **Return Value**: `Boolean`, success or failure.
+ **Usage Scenario**:

``` java
// Send a notice to all employees
SystemMessage broadcast = new SystemMessage()
.setMessages(List.of(
    new PamirsMessage()
    .setName("System Maintenance Notice")
    .setSubject("System Maintenance Notice")
    .setBody("<p>System upgrade will be carried out at 00:00 tonight</p>")
))
.setPartners(allUsers);

messageSender.sendSystemMailBroadcast(broadcast);
```

### 4. Send Channel Messages

``` java
Boolean sendChannelMail(MessageGroup groupTransient);
```

+ **Function**: Send messages to a specified message channel.
+ **Parameters**: `groupTransient` channel message carrier, required, including channel (`channel`) and message list (`messages`)
+ **MessageGroup Model**: **java**

``` java
public class MessageGroup {
    private Long id;                // Channel/user ID
    private List<`PamirsMessage`> messages; // Message list
    private MessageChannel channel; // Target channel
}
```

+ **Return Value**: `Boolean`, success or failure.

### 5. Send Model-Associated Messages

``` java
/**
 * Send messages associated with business models
 * @param messageList Message list
 * @param partnerList Recipient user list
 * @return Boolean Sending result
*/
Boolean sendModelMail(List<`PamirsMessage`> messageList, List<`PamirsUser`> partnerList);
```

+ **Function**: Send messages associated with business models (such as workflow notifications), supporting batch users.
+ **Parameters**:
  - `messageList` message list, required, including model references (`resModel`, `resId`)
  - `partnerList` recipient user list
+ **Return Value**: `Boolean`, success or failure.
+ **Example Scenario**:

``` java
// Order note addition notification
PamirsMessage orderMsg = new PamirsMessage()
.setResModel("sale.order")
.setResId(12345L)// Order number
.setSubject("Order note added")
.setBody("This is the note content");

messageSender.sendModelMail(List.of(orderMsg), List.of(customerUser));
```

## (Ⅱ) Email Service Interface (EmailSender)

### 1. Interface Definition

``` java
public interface EmailSender {
    Boolean send(EmailTemplate template, Map<String, Object> data, String sendTo, String copyTo) throws Exception;
    Boolean send(EmailPoster poster);
    Boolean sendVerify(String templateType, String mailAddr);
}
```

### 2. Send Emails Based on Templates

``` java
/**
 * Send using an email template
 * @param template Email template
 * @param data Template parameters
 * @param sendTo Recipient (multiple separated by commas)
 * @param copyTo Carbon copy recipient
 * @return Sending result
*/
Boolean send(EmailTemplate template, Map<String, Object> data, String sendTo, String copyTo) throws Exception;
```

+ **Function**: Send emails using predefined email templates, supporting placeholder replacement.
+ **Parameters**:

| **Name**   | **Type**            | **Required** | **Description**                                |
| :--------- | :------------------ | :------- | :-------------------------------------- |
| `template` | EmailTemplate       | Yes       | Email template (including title, content, server configuration)  |
| `data`     | Map<String, Object> | Yes       | Placeholder data (e.g., `${name}` replaced with actual value) |
| `sendTo`   | String              | Yes       | Recipient email (multiple addresses separated by commas)            |
| `copyTo`   | String              | No        | Carbon copy recipient email (multiple addresses separated by commas)            |


+ **EmailTemplate Model**:

``` java
public class EmailTemplate {
    private String title;       // Email title
    private String body;        // Email content (supports HTML)
    private EmailSenderSource source; // Email server configuration
}
```

+ **Template Example**:

``` plain
<!-- Template example -->
Dear ${user.name}, your verification code is: ${code}
```

+ **Return Value**: `Boolean`, success or failure, throws `Exception` for failure.

### 3. Send Emails Directly

``` java
/**
 * Send raw emails directly
 * @param poster Email data object
 * @return Sending result
*/
Boolean send(EmailPoster poster);
```

+ **Function**: Send emails using raw email parameters, supporting attachments.
+ **Parameters**:

| **Name** | **Type**    | **Required** | **Description**     |
| :------- | :---------- | :------- | :----------- |
| `poster` | EmailPoster | Yes       | Email parameter carrier |


+ **EmailPoster Model**: **java**

``` java
public class EmailPoster {
    private String title;       // Title
    private String sender; 		// Sender name
    private String body;        // Content (HTML)
    private String sendTo;      // Recipient
    private String copyTo;      // Carbon copy recipient
    private String replyTo;		// Reply object, separated by commas
    private List<`PamirsFile`> resourceFiles; // Attachment list
}
```

+ **Example Scenario**:

``` java
List<String> receiveEmails = Collections.singletonList("testhaha@shushi.pro"); // Replace with actual recipient email
    
EmailSender emailSender = (EmailSender) MessageEngine.get(MessageEngineTypeEnum.EMAIL_SEND).get(null);

String title = "Title";
String body = "Content (HTML";
String sender = "Sender Name";
String replyEmail = "Reply Email";

EmailPoster emailPoster = new EmailPoster()
        .setSender(sender)
        .setTitle(title)
        .setBody(body)
        .setReplyTo(replyEmail);

StringBuilder errorMessages = new StringBuilder();
receiveEmails.forEach(email -> {
    try {
        if (!emailSender.send(emailPoster.setSendTo(email))) {
            log.error("Failed to send email: emailPoster:{}", JsonUtils.toJSONString(emailPoster));
            errorMessages.append("Failed to send email, error message: System exception, email:").append(email).append(";");
        }
    } catch (Exception e) {
        log.error("Failed to send email: emailPoster:{}, exception:{}", JsonUtils.toJSONString(emailPoster), e);
        String errorMsg = transferEmailThrowMessage(e);
        errorMessages.append("Failed to send email, error message:").append(errorMsg).append(", email:").append(email).append(";");
    }
});
```

### 4. Send Verification Emails

``` java
/**
 * Send verification emails (including verification codes)
 * @param templateType Template type (e.g., SIGN_UP)
 * @param mailAddr Target email
 * @return Sending result
*/
Boolean sendVerify(String templateType, String mailAddr);
```

+ **Function**: Send verification code emails (such as for registration, password recovery), automatically generating and storing verification codes.
+ **Parameters**:

| **Name**       | **Type** | **Required** | **Description**                                |
| :------------- | :------- | :------- | :-------------------------------------- |
| `templateType` | String   | Yes       | Template type (enumeration: `SMSTemplateTypeEnum`) |
| `mailAddr`     | String   | Yes       | Target email                                |


+ **Return Value**: `Boolean`, success or failure.
+ **Process Description**:
  - Generate a 6-digit random verification code
  - Save to the VerificationCode table
  - Send email using the corresponding template
  - Verification code validity period is 10 minutes by default

## (Ⅲ) SMS Sending Interface (SMSSender)

### 1. Interface Definition

``` java
public interface SMSSender {
    Boolean smsSend(SMSTemplateTypeEnum templateType, String phoneNum, Map<String, String> placeholders);
    Boolean smsSend(SmsTemplate template, String phoneNum, Map<String, String> placeholders);
}
```

### 2. Send SMS

``` java
Boolean smsSend(SMSTemplateTypeEnum templateType, String phoneNum, Map<String, String> placeholders);
```

+ **Function**: Send SMS using predefined SMS templates, supporting parameter replacement (such as verification codes).
+ **Parameters**:

| **Name**       | **Type**            | **Required** | **Description**                              |
| :------------- | :------------------ | :------- | :------------------------------------ |
| `templateType` | SMSTemplateTypeEnum | Yes       | Template type (enumeration: login, registration, etc.)        |
| `phoneNum`     | String              | Yes       | Target phone number                            |
| `placeholders` | Map<String, String> | Yes       | Placeholder data (e.g., `{code}` replaced with verification code) |


+ **Enumeration Values**:
  - `SMSTemplateTypeEnum.SIGN_IN`: Login verification
  - `SMSTemplateTypeEnum.SIGN_UP`: User registration
  - `SMSTemplateTypeEnum.NOTIFY`: Notification SMS
+ **Example Scenario**:

``` java
// Get SMSSender
SMSSender smsSender = (SMSSender) MessageEngine.get(MessageEngineTypeEnum.SMS_SEND).get(null);

// Use predefined template
smsSender.smsSend(SMSTemplateTypeEnum.SIGN_IN, "13800138000", 
    Map.of("code", "123456"));

// Use custom template
SmsTemplate template = new SmsTemplate().setTemplateType(SMSTemplateTypeEnum.NOTIFY).setTemplateCode("SMS_246455054").queryOne();
smsSender.smsSend(template, "13912345678",
    Map.of("orderNo", "2023123456"));
```

### 3. Template Management

**SmsTemplate Field Description**:

| **Field**                                                    | **Required**                                       | **Description**                                                     |
| ----------------------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------ |
| templateCode    | Yes | Third-party platform template ID |
| templateContent | Yes | Template content (including ${var} placeholders) |
| channel         | Yes | SMS channel (ALIYUN/CUSTOM) |
| status          | -  | Review status (AUDITING/SUCCESS) |


**Alibaba Cloud Template Example**:

``` java
Your verification code is ${code}, valid for 5 minutes. Do not disclose it.
```

## (Ⅳ) Appendix: Public Models

### 1. MessageChannel Message Channel

| **Field**                                                | **Type**                                                     | **Description**                                                     |
| ------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| channelType | MessageChannelTypeEnum | Channel type (SYSTEM_MAIL/CHAT) |
| openType    | MessageChannelOpenTypeEnum | Open type (PUBLIC/PRIVATE) |
| partners    | List<`PamirsUser`> | Channel members         |