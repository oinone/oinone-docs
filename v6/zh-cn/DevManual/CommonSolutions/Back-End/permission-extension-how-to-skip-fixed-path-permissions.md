---
title: 权限扩展：如何跳过固定路径的权限
index: true
category:
  - 常见解决方案
order: 48
---
# 一、概述

业务上需要跳过弹窗打开里面的所有按钮权限。

# 二、代码实践：

实现`AuthFilterService`权限接口。

```java
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
            //返回true就代表通过验证
            return true;
        }
        return null;
    }

    @Override
    public Boolean isAccessAction(String path) {
        if (StringUtils.isNotEmpty(path) && path.startsWith(skipPath)) {
            //返回true就代表通过验证
            return true;
        }
        return null;
    }
}

```

可以看到弹窗下面的按钮都不需要权限控制了。
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/Snipaste_2025-03-11_18-49-23-20250530144827227.jpg)

