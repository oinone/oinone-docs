---
title: Network Requests:Request Encryption
index: true
category:
   - Frontend
order: 10
---

# I. Introduction
In scenarios with high security requirements, Oinone provides the capability to extend frontend encryption for request content and backend decryption, requiring that the encryption and decryption schemes of the frontend and backend are unified.

# II. Backend
## (一) Inherit the platform's `RequestController` and add a new request class to handle encryption logic
```java
package pro.shushi.pamirs.demo.core.controller;

import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;
import pro.shushi.pamirs.framework.gateways.graph.java.RequestController;
import pro.shushi.pamirs.meta.annotation.fun.extern.Slf4j;
import pro.shushi.pamirs.meta.api.dto.protocol.PamirsClientRequestParam;
import pro.shushi.pamirs.user.api.utils.AES256Utils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
public class DemoRequestController extends RequestController {

    @SuppressWarnings("unused")
    @RequestMapping(
        value = "/pamirs/{moduleName:^[a-zA-Z][a-zA-Z0-9_]+[a-zA-Z0-9]$}",
        method = RequestMethod.POST
    )
    public String pamirsPost(@PathVariable("moduleName") String moduleName,
                             @RequestBody PamirsClientRequestParam gql,
                             HttpServletRequest request,
                             HttpServletResponse response) {
        decrypt(gql);
        return super.pamirsPost(moduleName, gql, request, response);
    }

    @SuppressWarnings("unused")
    @RequestMapping(
        value = "/pamirs/{moduleName:^[a-zA-Z][a-zA-Z0-9_]+[a-zA-Z0-9]$}/batch",
        method = RequestMethod.POST
    )
    public String pamirsBatch(@PathVariable("moduleName") String moduleName,
                              @RequestBody List<PamirsClientRequestParam> gqls,
                              HttpServletRequest request,
                              HttpServletResponse response) {
        for (PamirsClientRequestParam gql : gqls) {
            decrypt(gql);
        }
        return super.pamirsBatch(moduleName, gqls, request, response);
    }

    private static final String GQL_VAR = "gql";

    private void decrypt(PamirsClientRequestParam gql) {
        Map<String, Object> variables = null != gql.getVariables() ? gql.getVariables() : new HashMap<>();
        String encodeStr = (String) variables.get(GQL_VAR);
        if (StringUtils.isNotBlank(encodeStr)) {
            variables.put(GQL_VAR, null);
            // TODO This encryption method can be replaced with other algorithms
            String gqlQuery = AES256Utils.decrypt(encodeStr);
            gql.setQuery(gqlQuery);
        }
    }
}
```

## (二) The boot project's startup class excludes the platform's default `RequestController` class
```java
@ComponentScan(
        excludeFilters = {
                // This annotation excludes the platform's RequestController class
                @ComponentScan.Filter(
                        type = FilterType.REGEX,
                        pattern = "pro.shushi.pamirs.framework.gateways.graph.java.RequestController"
                )
        })
public class DemoApplication {
}
```

## (三) The following is an example of a startup class in an actual project
```java
package pro.shushi.pamirs.demo.boot;

import org.apache.ibatis.annotations.Mapper;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.WebApplicationType;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.redis.RedisAutoConfiguration;
import org.springframework.boot.autoconfigure.data.redis.RedisRepositoriesAutoConfiguration;
import org.springframework.boot.autoconfigure.freemarker.FreeMarkerAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.system.ApplicationPid;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.util.StopWatch;
import pro.shushi.pamirs.framework.connectors.data.kv.RedisClusterConfig;
import pro.shushi.pamirs.framework.gateways.graph.java.RequestController;
import pro.shushi.pamirs.meta.annotation.fun.extern.Slf4j;

import java.io.File;
import java.io.IOException;

@ComponentScan(
        basePackages = {
                "pro.shushi.pamirs.meta",
                "pro.shushi.pamirs.framework.connectors",
                "pro.shushi.pamirs.framework",
                "pro.shushi.pamirs",
                "pro.shushi.pamirs.demo"
        },
        excludeFilters = {
                @ComponentScan.Filter(
                        type = FilterType.ASSIGNABLE_TYPE,
                        value = {RedisAutoConfiguration.class, RedisRepositoriesAutoConfiguration.class, RedisClusterConfig.class}
                ),
                // This annotation excludes the platform's RequestController class
                @ComponentScan.Filter(type = FilterType.REGEX,
                        pattern = "pro.shushi.pamirs.framework.gateways.graph.java.RequestController")
        })
@Slf4j
@EnableTransactionManagement
@EnableAsync
@MapperScan(value = {"pro.shushi.pamirs", "pro.shushi.pamirs.demo"}, annotationClass = Mapper.class)
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class, FreeMarkerAutoConfiguration.class})
public class DemoApplication {

    public static void main(String[] args) throws IOException {
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();

        log.info("oinoneDemo工程 Application loading...");

        new ApplicationPid().write(new File("pamirs-demo.pid"));

        new SpringApplicationBuilder(DemoApplication.class)
                .web(WebApplicationType.SERVLET)
                .run(args);

        stopWatch.stop();

        log.info("启动耗时 {} s", stopWatch.getTotalTimeSeconds());
    }
}
```

# III. Frontend
## (一) Add a utility class `EncryptRequestUtil.ts`
```typescript
import { encrypt, NetworkMiddlewareHandler } from '@kunlun/dependencies';

export const encryptMiddleWare: NetworkMiddlewareHandler = (operation, forward) => {
  // The following line of code is the default encryption method and can be replaced with your own algorithm
  const encryptedGqlString = encrypt(operation!.query!.loc!.source.body);
  operation!.query = null as any; // Clear the original query
  operation.variables = { ...operation.variables, gql: encryptedGqlString }; // The encrypted string is part of the variables
  return forward(operation).subscribe({})
};
```

## (二) Register the encryption interceptor in `main.ts`
Register within the `VueOioProvider` method of `main.ts`. The following code only demonstrates the key configuration for encryption; other configurations should follow the original code.

```typescript
VueOioProvider(
  {
    http: {
      url: location.origin + (process.env.BASE_PATH ? `/${process.env.BASE_PATH}` : ''),
      // Register the encryption interceptor here
      middleware: [ encryptMiddleWare ]
    }
  }
);
```