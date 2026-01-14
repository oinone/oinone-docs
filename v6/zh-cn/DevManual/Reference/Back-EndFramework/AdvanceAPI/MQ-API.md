---
title: 消息队列 API（MQ API）
index: true
category:
  - 研发手册
  - Reference
  - 后端API
  - Advance API
order: 7

---
# 一、概述

Oinone 消息队列模块提供统一的 API 接口支持 RocketMQ/Kafka/RabbitMQ 三种消息中间件，通过 `NotifyProducer` 和 `NotifyConsumer` 实现生产消费解耦。主要特性：

+ **一致性 API**：一套接口适配三种消息中间件
+ **灵活配置**：通过 YAML 配置动态切换消息队列类型
+ **消息类型**：支持普通/顺序/事务消息
+ **可扩展性**：提供发送/消费拦截器机制

# 二、依赖与YAML配置

## （一）Maven 依赖

根据实际业务中所使用的消息队列，按需添加对应的依赖项。

```xml
<!-- RocketMQ -->
<dependency>
  <groupId>pro.shushi.pamirs.framework</groupId>
  <artifactId>pamirs-connectors-event-rocketmq</artifactId>
</dependency>

<!-- Kafka -->
<dependency>
  <groupId>pro.shushi.pamirs.framework</groupId>
  <artifactId>pamirs-connectors-event-kafka</artifactId>
</dependency>

<!-- RabbitMQ -->
<dependency>
  <groupId>pro.shushi.pamirs.framework</groupId>
  <artifactId>pamirs-connectors-event-rabbitmq</artifactId>
</dependency>
```

## （二）YAML配置

与此主题相关的文档可在 [事件配置](/zh-cn/DevManual/Reference/Back-EndFramework/module-API.md#九-事件配置-pamirs-event) 中找到。

### 1、基础配置

```yaml
pamirs:
  event:
    enabled: true
    topic-prefix: oinone
    notify-map:
      system: ROCKETMQ  # 系统消息类型
      biz: KAFKA       # 业务消息类型
      logger: RABBITMQ # 日志消息类型
```

### 2、中间件配置

```yaml
# RocketMQ
spring:
  rocketmq:
    name-server: 127.0.0.1:9876
    producer:
      enableMsgTrace: true

# Kafka
spring:
  kafka:
    bootstrap-servers: localhost:9092
    consumer:
      group-id: ${spring.application.name}

# RabbitMQ
spring:
  rabbitmq:
    host: 127.0.0.1
    port: 5672
    username: oinone
    password: oinone
```

# 三、核心接口

## （一）NotifyProducer 接口

```java
public interface NotifyProducer<TEMPLATE> {

    // 发送普通消息
    <T> NotifySendResult send(String topic, String tag, T msg);

    // 发送事务消息（RocketMQ 特有）
    <T> NotifySendResult sendTx(String topic, String tag, String txGroup, T msg, Object extArg);

    // 发送顺序消息
    <T> NotifySendResult sendOrderly(String topic, String tag, T msg, String hashKey);
}
```

参数说明：

| **参数**                                            | **类型**                                           | **必填**                                                 | **说明**                                                     |
| --------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------ |
| topic   | String | 是           | 消息主题         |
| tag     | String | 否           | 消息标签         |
| msg     | Object | 是           | 消息体（需实现 Serializable） |
| hashKey | String | 顺序消息必填 | 分区键           |


返回值 `NotifySendResult` 结构：

```java
public class NotifySendResult {
    private boolean success;   // 发送状态
    private Object notifyResult;  // 消息发送结果
    private Throwable error;   // 异常信息
}
```

## （二）NotifyConsumer 接口

```java
@FunctionalInterface
public interface NotifyConsumer<T extends Serializable> {
    void consume(Message<T> event);
}
```

# 四、使用示例

## （一）生产者示例

### 1、Producer 获取方式

#### 原始实现（硬编码方式）

```java
@Autowired
private RocketMQNotifyProducer rocketMQNotifyProducer;
@Autowired
private RabbitMQNotifyProducer rabbitMQNotifyProducer;
@Autowired
private KafkaNotifyProducer kafkaNotifyProducer;

public void sendNormalMessage() {
    OrderMessage msg = new OrderMessage("ORDER_001");
    //方式一：
    // 问题：消息队列类型硬编码在代码中，耦合度高且缺乏扩展性
    // 直接使用具体实现类，更换消息中间件需修改代码逻辑
    //NotifySendResult result = rocketMQNotifyProducer.send("oinone-trade", "CREATE", msg);
    //NotifySendResult result = rabbitMQNotifyProducer.send("oinone-trade", "CREATE", msg);
    NotifySendResult result = kafkaNotifyProducer.send("oinone-trade", "CREATE", msg);
}


```

:::warning 提示：该方式存在问题

1. **强耦合**：消息队列实现类（RocketMQ/RabbitMQ/Kafka）直接注入到业务代码，与具体中间件绑定
2. **硬编码**：消息队列类型通过变量名或注释写死，无法动态切换
3. **扩展性差**：新增消息中间件需修改注入代码和发送逻辑，不符合开闭原则

:::

#### 优化实现（解耦动态化方案）

```java
public void sendNormalMessage() {
    // 方式二：通过业务类型动态获取对应生产者（推荐）
    // 根据EventConstants中定义的业务键获取适配的生产者实例
    NotifySendResult result = EventEngine.get(EventConstants.EVENT_SYS_BIZ_KEY).send("oinone-trade", "CREATE", msg);
    // 方式三：通过业务上下文获取通用生产者
    // 适用于需要灵活指定业务类型的场景
    NotifySendResult result = EventEngine.bizNotifyProducer().send("oinone-trade", "CREATE", msg);
}
```

**核心优势：**

+ **解耦中间件**：
  - 消除对具体`RocketMQNotifyProducer`/`RabbitMQNotifyProducer`的直接依赖
  - 通过`EventEngine`统一管理生产者实例，业务代码与中间件解耦
+ **动态适配**：
  - 支持通过`EventConstants.EVENT_SYS_BIZ_KEY`等业务标识动态匹配生产者
  - 新增中间件时只需扩展`EventEngine`配置，无需修改业务逻辑
+ **统一接口**：
  - 提供`send(String topic, String event, T message)`统一发送接口
  - 屏蔽不同中间件的 API 差异，降低学习成本

### 2、顺序消息发送

```java
public void sendOrderlyMessage() {
    PaymentMessage payment = new PaymentMessage("PAY_202312");
    producer.sendOrderly("oinone-payment", "PAY", payment, payment.getOrderId());
}
```

### 3、事务消息发送（RocketMQ）

```java
@TransactionListener("txGroup")
public class TransactionListenerImpl implements NotifyTransactionListener {

    @Override
    public void executeLocalTransaction(Message msg, Object arg) {
        // 本地事务执行
    }

    @Override
    public boolean checkLocalTransaction(MessageExt msg) {
        // 事务状态检查
    }
}

public void sendTransactionMessage() {
    producer.sendTx("oinone-account", "DEDUCT", "txGroup", accountDTO, null);
}
```

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/BackendAPI/AdvanceAPI/1d86268e9a59c80224a5277866c89498.svg)

### 4、@Notify 注解发送

#### 注解定义

```java
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Notify {
    String notifyBizType() default "biz";  // 业务类型
    String topic();                        // 消息主题
    String tags() default "";              // 消息标签
    Class<? extends NotifySendCallback> sendCallback() default NotifySendCallback.class; // 发送回调
    Class<? extends NotifyQueueSelector> querySelector() default NotifyQueueSelector.class; // 队列选择器
    Class<? extends NotifyTagsGenerator> tagsGenerator() default NotifyTagsGenerator.class; // 标签生成器
}
```

| **属性**                                                  | **类型**                                           | **必填**                                       | **默认值**                                                   | **说明**                                                     |
| --------------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| notifyBizType | String | 否 | biz              | 消息业务类型（system/biz/logger） |
| topic         | String | 是 | -                | 消息主题名称     |
| tags          | String | 否 | ""               | 静态消息标签     |
| sendCallback  | Class  | 否 | NotifySendCallback.class | 发送结果回调类   |
| querySelector | Class  | 否 | NotifyQueueSelector.class | 顺序消息队列选择器 |
| tagsGenerator | Class  | 否 | NotifyTagsGenerator.class | 动态标签生成器   |


#### 普通消息发送

```java
//普通用法
@Notify(
    topic = "order_created",
    tags = "PAYMENT",
    notifyBizType = "biz"
)
public Order createOrder(OrderRequest request) {
    // 创建订单业务逻辑
    return orderService.create(request);
}
```

#### 动态标签生成

```java
// 自定义标签生成器
public class OrderTagGenerator implements NotifyTagsGenerator {
    @Override
    public String tagsGenerator(Object result) {
        if (result instanceof Order order) {
            return order.getStatus().name();
        }
        return "UNKNOWN";
    }
}

// 使用示例
@Notify(
    topic = "order_status_update",
    tagsGenerator = OrderTagGenerator.class
)
public void updateOrderStatus(String orderId, OrderStatus status) {
    // 状态更新逻辑
}
```

#### 顺序消息发送

```java
// 自定义队列选择器
public class OrderQueueSelector implements NotifyQueueSelector {
    @Override
    public String hashing(Object result) {
        if (result instanceof Order order) {
            return order.getUserId();
        }
        return "0";
    }
}

// 使用示例
@Notify(
    topic = "order_sequence",
    querySelector = OrderQueueSelector.class
)
public void processOrderSequence(Order order) {
// 顺序处理逻辑
}
```

## （二）消费者示例

### 1、@NotifyListener 注解定义

```java
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface NotifyListener {
    String topic();                          // 必填，监听主题
    String tags() default "*";               // 消息标签过滤
    String group() default "";               // 消费者组
    ConsumerType consumerType() default ConsumerType.CONCURRENTLY; // 消费模式
}
```

| **参数**                                                     | **类型**                                           | **默认值**                                               | **说明**                                                     |
| ------------------------------------------------------------ | -------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------ |
| **topic**        | String | -            | 监听的 Topic 名称（支持通配符） |
| **tags**         | String | *            | 标签过滤表达式（RocketMQ 特有） |
| **group**        | String | -            | 消费者组 ID（Kafka 强制要求） |
| **consumerType** | enum   | CONCURRENTLY | 消费模式：   - `CONCURRENTLY`<br/>: 并发消费   - `ORDERLY`<br/>: 顺序消费 |


### 2、普通消费示例

```java
@Bean
@NotifyListener(
    topic = "oinone-trade",
    tags = "CREATE",
    consumerType = ConsumerType.CONCURRENTLY
)
public NotifyConsumer<OrderMessage> orderCreateConsumer() {
    return message -> {
        OrderMessage order = message.getPayload();
        // 处理订单创建逻辑
    };
}
```

### 3、消费幂等处理示例

```java
@Bean
@NotifyListener(topic = "oinone-trade",tags = "CREATE")
public NotifyConsumer<OrderMessage> orderCreateConsumer() {
    return message -> {
        String msgId = message.getHeaders().getId().toString();
        if (redis.exists(msgId)) {
            return; // 已处理
        }
        // 业务处理
        redis.setex(msgId, 3600);
        OrderMessage order = message.getPayload();
        // 处理订单创建逻辑
    };
}
```

# 五、高级特性

## （一）消息拦截器

```java
// 发送前置处理
@Component
public class AuthCheckSendBefore implements NotifySendBefore {
    @Override
    public Message<?> sendBefore(Message<?> message) {
        message.getHeaders().put("auth-token", getToken());
        return message;
    }
}

// 消费后置处理
@Component
public class MetricsCollector implements NotifyConsumeAfter {
    @Override
    public void consumeAfter(Message<?> message) {
        metrics.increment("msg.processed");
    }
}
```

# 六、不同中间件差异处理

| **特性**                                             | **RocketMQ**                                         | **Kafka**                                            | **RabbitMQ**                                         |
| ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| 事务消息 | 支持     | 不支持   | 不支持   |
| 顺序消息 | 严格顺序 | 分区顺序 | 队列顺序 |
| 消息回溯 | 支持     | 时间偏移 | 不支持   |
| 性能     | 高吞吐   | 极高吞吐 | 中等     |


# 七、常见问题

**Q：如何切换消息中间件？**
A：修改 `pamirs.event.notify-map` 配置并更换对应依赖即可，无需修改业务代码

**Q：顺序消息如何保证？**
A：使用 `sendOrderly` 方法，相同 hashKey 的消息会路由到同一队列

**Q：事务消息实现原理？**
A：RocketMQ 采用两阶段提交，先发送预备消息，本地事务执行成功后提交



