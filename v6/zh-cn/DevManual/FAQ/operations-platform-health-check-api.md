---
title: 运维相关：平台有健康检查接口吗
index: true
category:
  - 常见问题（faq）
order: 11
---
# 一、场景概述
想要验证服务是否成功启动，可调用 `********/ruok` 接口，需注意此接口调用所使用的端口应为服务器实际运行端口。当该接口返回 “imok” 时，表明服务已成功启动；若返回 “no”，则意味着服务启动失败。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/FAQ/Snipaste_2024-09-27_11-16-55.jpg)

# 二、代码逻辑
```java
@Order(Ordered.LOWEST_PRECEDENCE)
@RestController
public class HealthCheckController implements ApplicationListener<ApplicationStartedEvent> {

    private static boolean IM_OK = false;

    private static final String SUCCESS_STRING = "imok";

    private static final String FAILURE_STRING = "no";

    @GetMapping("/ruok")
    public String ruok() {
        if (IM_OK) {
            return SUCCESS_STRING;
        }
        return FAILURE_STRING;
    }

    @Override
    public void onApplicationEvent(ApplicationStartedEvent event) {
        IM_OK = true;
    }

    public static boolean imok() {
        return IM_OK;
    }
}
```

