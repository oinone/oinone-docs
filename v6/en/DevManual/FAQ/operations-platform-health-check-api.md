---
title: Operation and Maintenance Related:Does the Platform Have a Health Check Interface?
index: true
category:
  - Frequently Asked Questions (faq)
order: 11
---
# Ⅰ、Scenario Overview
To verify whether a service has started successfully, you can call the `********/ruok` interface. Note that the port used for this interface call should be the actual running port of the server. When the interface returns "imok", it indicates that the service has started successfully; if it returns "no", the service failed to start.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/FAQ/Snipaste_2024-09-27_11-16-55.jpg)

# Ⅱ、Code Logic
``` java
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