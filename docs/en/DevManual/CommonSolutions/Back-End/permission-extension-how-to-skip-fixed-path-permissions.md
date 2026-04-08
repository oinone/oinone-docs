---
title: Permission Extension:How to Skip Fixed Path Permissions
index: true
category:
  - Common Solutions
order: 48
---
# I. Overview

Business requirements may necessitate skipping permission control for all buttons within pop-up windows.

# II. Code Practice:

Implement the `AuthFilterService` permission interface.

``` java
package pro.shushi.pamirs.top.api.spi;

import org.apache.commons.lang3.StringUtils;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import pro.shushi.pamirs.auth.api.spi.AuthFilterService;
import pro.shushi.pamirs.boot.web.session.AccessResourceInfoSession;
import pro.shushi.pamirs.meta.common.spi.SPI;

@Order(88)
@Component
@SPI.Service
public class CustomAuthFilterService implements AuthFilterService {

    public static final String skipPath = "/top_demo/uiMenuc6238c29bca44250a041691565056a63/ACTION#top.Teacher#uiView2b60cc6daa334c7280cb78207d41addc";

    @Override
    public Boolean isAccessAction(String model, String name) {
        String path = AccessResourceInfoSession.getInfo().getOriginPath();
        if (StringUtils.isNotEmpty(path) && path.startsWith(skipPath)) {
            // Returning true indicates access validation passed
            return true;
        }
        return null;
    }

    @Override
    public Boolean isAccessAction(String path) {
        if (StringUtils.isNotEmpty(path) && path.startsWith(skipPath)) {
            // Returning true indicates access validation passed
            return true;
        }
        return null;
    }
}
```

After implementation, buttons within the pop-up window no longer require permission control:
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/Snipaste_2025-03-11_18-49-23-20250530144827227.jpg)