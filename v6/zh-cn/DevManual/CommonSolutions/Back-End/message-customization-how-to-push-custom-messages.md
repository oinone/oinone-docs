---
title: 消息定制：如何推送自定义消息
index: true
category:
  - 常见解决方案
order: 55
---

# 一、项目中添加消息依赖
在 Boot 工程的`pom.xml`文件中，需添加相应的依赖配置项。

```xml
<dependency>
  <groupId>pro.shushi.pamirs.core</groupId>
  <artifactId>pamirs-message-api</artifactId>
</dependency>

```

调用`pro.shushi.pamirs.message.engine.message.MessageSender#sendSystemMail`发送系统消息。

```java
@Action(displayName = "发送消息")
public Student sendMessage(Student data){
    MessageSender mailSender = (MessageSender) MessageEngine.get(MessageEngineTypeEnum.MAIL_SEND).get(null);
    String content = "发送自定义消息";
    String subject = null;
    List<Long> userIds = new ArrayList<>();
    userIds.add(PamirsSession.getUserId());
    PamirsMessage message = new PamirsMessage()
    .setName(subject)
    .setSubject(subject)
    .setBody(content)
    .setMessageType(MessageTypeEnum.NOTIFICATION);
    List<PamirsMessage> messages = new ArrayList<>();
    messages.add(message);
    SystemMessage systemMessage = new SystemMessage();
    systemMessage.setPartners(userIds.stream().map(i -> (PamirsUser) new PamirsUser().setId(i)).collect(Collectors.toList()))
    .setType(MessageGroupTypeEnum.SYSTEM_MAIL)
    .setMessages(messages);
    mailSender.sendSystemMail(systemMessage);
    return data;
}
```

