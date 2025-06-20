---
title: Redis API
index: true
category:
  - Development Manual
  - Reference
  - Backend API
  - Advance API
order: 8

---
# I. Basic Usage

The Oinone platform extends based on Spring Data Redis, having completed the registration of `redisTemplate` and `stringRedisTemplate` in advance, and built-in the Oinone Cache Key construction logic. Developers can directly use dependency injection, and are prohibited from redefining Redis-related beans to ensure the consistency of cache services.

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

# II. Best Practices

## (一) AbstractRedisCacheService

**Function Overview**: `AbstractRedisCacheService<T>` encapsulates Redis cache operations, simplifying data read-write logic while standardizing usage. Even without using this encapsulated class, you can directly call `RedisTemplate` or `stringRedisTemplate` with unaffected functionality.

**Usage Recommendations**:

+ **Sharding Management**: When caching multiple groups of data, it is recommended to manage cache shards through a constant pool to avoid key conflicts and improve storage efficiency.
+ **Data Streamlining**: Control the size of cached data, storing only necessary information to reduce memory occupation.
+ **Clear Positioning**: Caching should serve as a performance optimization tool, avoiding substitution of persistent storage.

**Usage Example**:

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

## (二) Jedis and Lettuce Switching Guide

### 1. Core Differences:

+ **Jedis**: Synchronous blocking client, instances are not thread-safe, requiring reliance on connection pools for reuse, suitable for single-threaded or connection pool management scenarios.
+ **Lettuce**: Asynchronous reactive client based on Netty, thread-safe, supporting direct operation of single connections by multiple threads while being compatible with connection pools, suitable for high-concurrency asynchronous scenarios.

### 2. Switching Steps:

**Dependency Adjustment**: Remove the Jedis dependency in `pom.xml` and introduce Lettuce and connection pool dependencies:

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

**Configuration Modification**: Add Lettuce connection pool configuration in `application.yml`:

```yaml
spring:
  redis:
    database: 0
    host: 127.0.0.1
    port: 6379
    prefix: pamirs
    timeout: 2000
    # Optional password configuration
    password: xxxxx
    lettuce:
      pool:
        enable: true
        max-idle: 16
        min-idle: 1
        max-active: 16
        max-wait: 2000
```

# III. Source Code Analysis of Core Configuration

## (一) RedisSimpleConfig

This configuration class takes effect in the single Redis mode, responsible for the initialization of `redisTemplate` and `stringRedisTemplate`:

1. **Serialization Customization**: Add tenant prefixes to keys through `PamirsStringRedisSerializer`, and use Jackson2JsonRedisSerializer for JSON serialization of values, ensuring data compatibility in multi-tenant scenarios.
2. **Template Injection**: Inject `RedisConnectionFactory` and custom serializers to complete Redis template configuration, simplifying the usage process for developers.

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
        // Process tenant prefix logic
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
        // Similarly configure StringRedisTemplate
    }

    // Serializer setting methods
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

## (二) PamirsStringRedisSerializer

A custom string serializer that implements automatic addition and parsing of tenant prefixes:

+ **Serialization**: Add tenant prefixes and global identifiers to keys to ensure key uniqueness in multi-tenant environments.
+ **Deserialization**: Automatically remove prefixes and identifiers to restore original key values, ensuring data read-write consistency.

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