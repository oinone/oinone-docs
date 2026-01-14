---
title: Redis API
index: true
category:
  - 研发手册
  - Reference
  - 后端API
  - Advance API
order: 8

---
# 一、基础使用

Oinone 平台基于 Spring Data Redis的扩展实现，已提前完成`redisTemplate`与`stringRedisTemplate`的注册，并内置 Oinone Cache Key 构建逻辑。开发者可直接通过依赖注入使用，禁止重复定义 Redis 相关 bean，确保缓存服务一致性。

```java
package pro.shushi.pamirs.demo.core.service;

import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;

@Component
public class Test {
    @Autowired
    private RedisTemplate redisTemplate;
    @Autowired
    private StringRedisTemplate stringRedisTemplate;
}
```

# 二、最佳实践

## （一）AbstractRedisCacheService

**功能概述**：`AbstractRedisCacheService<T>`封装了 Redis 缓存操作，简化数据读写逻辑，同时规范使用方式。即使不使用该封装类，仍可直接调用`RedisTemplate`或`stringRedisTemplate`，功能不受影响。

**使用建议**：

+ **分片管理**：多组数据缓存时，建议通过常量池管理缓存分片，避免键冲突，提升存储效率。
+ **数据精简**：控制缓存数据大小，仅存储必要信息，减少内存占用。
+ **定位明确**：缓存应作为性能优化工具，避免替代持久化存储。

**使用示例**：

```java
@Component
public class DemoCacheService extends AbstractRedisCacheService<DemoModel> {
    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @Override
    protected StringRedisTemplate fetchRedisTemplate() {
        return stringRedisTemplate;
    }

    @Override
    protected Class<DemoModel> fetchTargetClass() {
        return DemoModel.class;
    }

    @Override
    protected String prepareKey(String key) {
        return StringHelper.concat(CharacterConstants.SEPARATOR_COLON,
                DemoCacheConstant.DTO_PREFIX, key);
    }

    @Override
    protected DemoModel minimizeStorage(DemoModel data) {
        return new DemoModel()
               .setName(data.getName())
               .setId(data.getId());
    }
}
```

## （二）Jedis 与 Lettuce 切换指南

### 1、核心差异：

+ **Jedis**：同步阻塞式客户端，实例非线程安全，需依赖连接池复用，适合单线程或连接池管理场景。
+ **Lettuce**：基于 Netty 的异步响应式客户端，线程安全，支持多线程直接操作单连接，同时兼容连接池，适用于高并发异步场景。

### 2、切换步骤：

**依赖调整**：在`pom.xml`中移除 Jedis 依赖，引入 Lettuce 及连接池依赖：

```xml
<lettuce.version>5.3.6.RELEASE</lettuce.version>
<commons-pool2.version>2.8.1</commons-pool2.version>
<dependencies>
    <dependency>
        <groupId>pro.shushi.pamirs.framework</groupId>
        <artifactId>pamirs-connectors-data-api</artifactId>
        <exclusions>
            <exclusion>
                <groupId>redis.clients</groupId>
                <artifactId>jedis</artifactId>
            </exclusion>
        </exclusions>
    </dependency>
    <dependency>
        <groupId>io.lettuce</groupId>
        <artifactId>lettuce-core</artifactId>
        <version>${lettuce.version}</version>
    </dependency>
    <dependency>
        <groupId>org.apache.commons</groupId>
        <artifactId>commons-pool2</artifactId>
        <version>${commons-pool2.version}</version>
    </dependency>
</dependencies>
```

**配置修改**：在`application.yml`中新增 Lettuce 连接池配置：

```yaml
spring:
  redis:
    database: 0
    host: 127.0.0.1
    port: 6379
    prefix: pamirs
    timeout: 2000
    # 可选密码配置
    password: xxxxx
    lettuce:
      pool:
        enable: true
        max-idle: 16
        min-idle: 1
        max-active: 16
        max-wait: 2000
```

# 三、核心配置源码解析

## （一）RedisSimpleConfig

该配置类在单 Redis 模式下生效，负责`redisTemplate`与`stringRedisTemplate`的初始化：

1. **序列化定制**：通过`PamirsStringRedisSerializer`为键添加租户前缀，并采用 Jackson2JsonRedisSerializer 实现值的 JSON 序列化，确保数据兼容多租户场景。
2. **模板注入**：注入`RedisConnectionFactory`与自定义序列化器，完成 Redis 模板配置，简化开发者使用流程。

```java
@Validated
@Component
@Conditional(RedisSimpleModeCondition.class)
public class RedisSimpleConfig {
    @Autowired
    private PamirsFrameworkSystemConfiguration systemConfiguration;
    @Value("${spring.redis.prefix:}")
    private String prefix;

    @Bean(name = "pamirsStringRedisSerializer")
    public PamirsStringRedisSerializer pamirsStringRedisSerializer() {
        // 处理租户前缀逻辑
    }

    @Bean(name = "redisTemplate")
    public RedisTemplate redisTemplate(RedisConnectionFactory factory,
                                       PamirsStringRedisSerializer serializer) {
        RedisTemplate template = new RedisTemplate();
        template.setConnectionFactory(factory);
        setKeySerializer(template, serializer);
        setValueSerializer(template, Object.class);
        return template;
    }

    @Bean(name = "stringRedisTemplate")
    public StringRedisTemplate stringRedisTemplate(RedisConnectionFactory factory,
                                                   PamirsStringRedisSerializer serializer) {
        // 同理配置StringRedisTemplate
    }

    // 序列化器设置方法
    private <K, V> void setKeySerializer(RedisTemplate<K, V> template, PamirsStringRedisSerializer serializer) {
        template.setKeySerializer(serializer);
    }
    private <K, V> void setValueSerializer(RedisTemplate<K, V> template, Class<V> valueClass) {
        Jackson2JsonRedisSerializer<V> jsonSerializer = new Jackson2JsonRedisSerializer<>(valueClass);
        ObjectMapper mapper = new ObjectMapper().enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        jsonSerializer.setObjectMapper(mapper);
        template.setValueSerializer(jsonSerializer);
    }
}
```

## （二）PamirsStringRedisSerializer

自定义字符串序列化器，实现租户前缀的自动添加与解析：

+ **序列化**：为键添加租户前缀及全局标识，确保键在多租户环境下的唯一性。
+ **反序列化**：自动移除前缀与标识，还原原始键值，保证数据读写一致性。

```java
public class PamirsStringRedisSerializer extends StringRedisSerializer {
    private final String prefix;
    private final int prefixLength;

    public PamirsStringRedisSerializer(String prefix) {
        super(StandardCharsets.UTF_8);
        this.prefix = fixPrefix(prefix).trim();
        this.prefixLength = this.prefix.length();
    }

    @Override
    public byte[] serialize(String string) {
        return super.serialize(serializeString(string));
    }

    public String serializeString(String string) {
        if (string == null) return null;
        if (prefixLength > 0) string = prefix + string;
        return KeyPrefixManager.generate(CharacterConstants.SEPARATOR_COLON, CharacterConstants.SEPARATOR_COLON) + string;
    }

    @Override
    public String deserialize(byte[] bytes) {
        String key = super.deserialize(bytes);
        if (key == null) return null;
        String prefixKey = KeyPrefixManager.generate(CharacterConstants.SEPARATOR_COLON, CharacterConstants.SEPARATOR_COLON);
        String fullPrefix = prefixKey + prefix;
        int len = prefixKey.length() + prefixLength;
        if (len == 0) return key;
        if (key.startsWith(fullPrefix)) {
            return key.substring(len);
        }
        return key;
    }

    private String fixPrefix(String prefix) {
        if (StringUtils.isBlank(prefix)) return prefix;
        return prefix.endsWith(CharacterConstants.SEPARATOR_COLON)? prefix : prefix + CharacterConstants.SEPARATOR_COLON;
    }
}
```

