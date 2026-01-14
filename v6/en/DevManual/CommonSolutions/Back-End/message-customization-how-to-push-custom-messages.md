---
title: Message Customization：How to Push Custom Messages
index: true
category:
  - Common Solutions
order: 55
---

# Ⅰ. Adding Message Dependencies to the Project
In the `pom.xml` file of the Boot project, the corresponding dependency configuration items need to be added.

```xml
<dependency>
  <groupId>pro.shushi.pamirs.core</groupId>
  <artifactId>pamirs-message-api</artifactId>
</dependency>
```

Call `pro.shushi.pamirs.message.engine.message.MessageSender#sendSystemMail` to send system messages.

```java
@Action(displayName = "Send Message")
public Student sendMessage(Student data){
    MessageSender mailSender = (MessageSender) MessageEngine.get(MessageEngineTypeEnum.MAIL_SEND).get(null);
    String content = "Send custom message";
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