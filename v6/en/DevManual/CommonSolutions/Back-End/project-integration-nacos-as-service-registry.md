---
title: Project Integration:Nacos as a Registration Center:How to Invoke SpringCloud Services of Other Systems?
index: true
category:
  - Common Solutions
order: 72
---

# I. Overview
As a powerful registration center, Nacos can provide key support such as service registration and discovery for multiple microservice frameworks like Dubbo and SpringCloud.

Currently, Oinone's underlying layer defaults to using Dubbo as the microservice protocol for invocation. However, if there is a requirement in the project to invoke SpringCloud services provided by other systems, Oinone does not restrict developers from writing relevant code.

In this case, developers can refer to the official documentation of Nacos or SpringCloud. As long as common issues such as Jar package conflicts are avoided in practical application, many functional extensions are available for developers to use flexibly, so as to meet the diversified business needs of the project and help build a richer and more efficient microservice architecture system.

:::danger Warning:

Nacos, SpringCloud, and SpringCloudAlibaba have strict dependency version requirements: [Click to view](https://github.com/alibaba/spring-cloud-alibaba/wiki/%E7%89%88%E6%9C%AC%E8%AF%B4%E6%98%8E)

:::

# II. Specific Examples:
## (Ⅰ) Adding Dependencies to the Project
Introduce compatible versions in the main pom:

``` xml
<dependencyManagement>
  <dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-alibaba-dependencies</artifactId> 
    <version>2.2.7.RELEASE</version> <!-- Currently compatible version -->
    <type>pom</type>
    <scope>import</scope>
  </dependency>
</dependencyManagement>
```

Introduce dependencies in the pom of the used module:	

``` xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
```

## (Ⅱ) Configuring application.yml
``` yaml
spring:
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848
        username: nacos
        password: nacos
```

Note: For more YAML configurations, please go to [Module API](/en/DevManual/Reference/Back-EndFramework/module-API.md) for consultation.

## (Ⅲ) Adding Annotations to the Startup Class
``` java
@EnableDiscoveryClient
@EnableFeignClients
public class NacosConsumerApplication {
    public static void main(String[] args) {
        SpringApplication.run(NacosConsumerApplication.class, args);
    }
}
```

## (Ⅳ) Verification
Create a Feign Client interface

``` java

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "nacos-demo") // Specify the name of the target service
public interface ProviderClient {

    @GetMapping("/hello")
    String hello();
}

```

Create a Controller to invoke the Feign Client

``` java
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

Access [http://localhost:8082/hello](http://localhost:8082/hello) in the browser
You will see the response returned by the service provider.