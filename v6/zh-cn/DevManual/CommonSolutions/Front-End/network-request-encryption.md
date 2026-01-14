---
title: 网络请求：请求加密
index: true
category:
   - 前端
order: 10
---
# 一、介绍
在一些对安全等级要求比较高的场景，`oinone`提供了扩展前端加密请求内容，后端解密请求内容的能力，该方案要求前后端的加解密方案统一。

# 二、后端
## （一）继承平台的`RequestController`新增一个请求类，在里面处理加密逻辑
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
            // TODO 此处的加密方法可以换为其他算法
            String gqlQuery = AES256Utils.decrypt(encodeStr);
            gql.setQuery(gqlQuery);
        }
    }
}
```

## （二）boot工程的启动类排除掉平台默认的`RequestController`类
```java
@ComponentScan(
        excludeFilters = {
                // 该注解排除平台的RequestController类
                @ComponentScan.Filter(
                        type = FilterType.REGEX,
                        pattern = "pro.shushi.pamirs.framework.gateways.graph.java.RequestController"
                )
        })
public class DemoApplication {
}
```

## （三）以下为实际项目中的启动类示例
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
                // 该注解排除平台的RequestController类
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

# 二、前端
## （一）新增工具类`EncryptRequestUtil.ts`
```typescript
import { encrypt, NetworkMiddlewareHandler } from '@kunlun/dependencies';

export const encryptMiddleWare: NetworkMiddlewareHandler = (operation, forward) => {
  // 下面一行代码为默认的加密方法，可以替换为自己的算法
  const encryptedGqlString = encrypt(operation!.query!.loc!.source.body);
  operation!.query = null as any; // 清空原始 query
  operation.variables = { ...operation.variables, gql: encryptedGqlString }; // 加密后的字符串作为 variables 的一部分
  return forward(operation).subscribe({})
};
```

## （二）`main.ts`注册加密的拦截器
在`main.ts`的`VueOioProvider`方法内注册，以下代码仅演示了加密的关键配置，其他配置请按原有代码来

```typescript
VueOioProvider(
  {
    http: {
      url: location.origin + (process.env.BASE_PATH ? `/${process.env.BASE_PATH}` : ''),
      // 此处注册加密的拦截器
      middleware: [ encryptMiddleWare ]
    }
  }
);
```

