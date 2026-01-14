---
title: 项目整合：Nacos做为注册中心：如何调用其他系统的SpringCloud服务？
index: true
category:
  - 常见解决方案
order: 72
---

# 一、概述
Nacos 作为一款功能强大的注册中心，能够为 Dubbo、SpringCloud 等多种微服务框架提供服务注册与发现等关键支持。

当前，Oinone 底层默认采用 Dubbo 作为微服务协议进行调用。然而，若项目中存在调用其他系统所提供的 SpringCloud 服务的需求，Oinone 并不对开发者编写相关代码加以限制。

在此情形下，开发者可参考 Nacos 或 SpringCloud 的官方文档展开工作。只要在实际应用过程中，能够避免诸如 Jar 包冲突等常见问题，众多功能扩展均可供开发者灵活运用，以此满足项目多样化的业务需求，助力构建更为丰富且高效的微服务架构体系。

:::danger 警告：

Nacos、SpringCloud、SpringCloudAlibaba是有依赖版本严格要求的：[点击查看](https://github.com/alibaba/spring-cloud-alibaba/wiki/%E7%89%88%E6%9C%AC%E8%AF%B4%E6%98%8E)

:::

# 二、具体示例：
## （一）项目中增加依赖
主pom引入兼容的版本：

```xml
<dependencyManagement>
  <dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-alibaba-dependencies</artifactId>
    <version>2.2.7.RELEASE</version> <!-- 目前兼容的版本 -->
    <type>pom</type>
    <scope>import</scope>
  </dependency>
</dependencyManagement>

```

使用模块的pom引入依赖：	

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>

```

## （二）配置 application.yml
```yaml
spring:
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848
        username: nacos
        password: nacos
```

注：更多 YAML 配置请前往 [Module API](/zh-cn/DevManual/Reference/Back-EndFramework/module-API.md) 查阅。

## （三）启动类添加注解
```java
@EnableDiscoveryClient
@EnableFeignClients
public class NacosConsumerApplication {
    public static void main(String[] args) {
        SpringApplication.run(NacosConsumerApplication.class, args);
    }
}
```

## （四）验证
创建 Feign Client 接口

```java

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "nacos-demo") // 指定目标服务的名称
public interface ProviderClient {

    @GetMapping("/hello")
    String hello();
}

```

创建 Controller 调用 Feign Client

```java
@RestController
public class ConsumerController {

    private final ProviderClient providerClient;

    public ConsumerController(ProviderClient providerClient) {
        this.providerClient = providerClient;
    }

    @GetMapping("/hello")
    public String hello() {
        return providerClient.hello();
    }
}
```

在浏览器中访问 [http://localhost:8082/hello](http://localhost:8082/hello)
你就会看到服务提供者返回的响应。

