---
title: 研发框架：框架之MessageHub(信息提示)
index: true
category:
  - 常见解决方案
order: 63
---

# 一、框架之信息概述
在后端数据交互过程中，除了能够向前端返回错误信息外，还具备返回调试、警告、成功以及一般性信息等不同等级信息的能力。然而，在默认设置下，前端仅对错误信息进行提示。若要实现对其他级别信息的提示，可通过前端的统一配置来调整提示级别，此机制类似于后端的日志级别设置，通过灵活配置，实现前端对不同重要程度信息的差异化呈现与处理。

# 二、框架之 MessageHub
于 Oinone 平台而言，如何达成友好的错误提示，乃是一项至关重要的考量。接下来将为您详细介绍 MessageHub，此工具为实现自定义错误提示开辟了极为广阔的空间，赋予了平台在错误提示定制方面的极大灵活性与可能性。

# 三、何时使用
错误提示是用户体验中特别重要的组成部分，大部分的错误体现在整页级别，字段级别，按钮级别。友好的错误提示应该是怎么样的呢？我们假设他是这样的

+ 与用户操作精密契合
    - 当字段输入异常时，错误展示在错误框底部
    - 按钮触发服务时异常，错误展示在按钮底部
+ 区分不同的类型
    - 错误
    - 成功
    - 警告
    - 提示
    - 调试
+ 简洁易懂的错误信息

# 四、不同信息类型的举例
```java
package pro.shushi.pamirs.demo.core.action;

import org.springframework.stereotype.Component;
import pro.shushi.pamirs.demo.api.model.PetCatItem;
import pro.shushi.pamirs.demo.api.model.PetType;
import pro.shushi.pamirs.meta.annotation.Action;
import pro.shushi.pamirs.meta.annotation.Model;
import pro.shushi.pamirs.meta.api.dto.common.Message;
import pro.shushi.pamirs.meta.api.session.PamirsSession;
import pro.shushi.pamirs.meta.enmu.ActionContextTypeEnum;
import pro.shushi.pamirs.meta.enmu.InformationLevelEnum;
import pro.shushi.pamirs.meta.enmu.ViewTypeEnum;

@Model.model(PetType.MODEL_MODEL)
@Component
public class PetTypeAction {

    @Action(displayName = "消息",bindingType = ViewTypeEnum.TABLE,contextType = ActionContextTypeEnum.CONTEXT_FREE)
    public PetType message(PetType data){
        PamirsSession.getMessageHub().info("info1");
        PamirsSession.getMessageHub().info("info2");
        PamirsSession.getMessageHub().error("error1");
        PamirsSession.getMessageHub().error("error2");
        PamirsSession.getMessageHub().msg(new Message().msg("success1").setLevel(InformationLevelEnum.SUCCESS));
        PamirsSession.getMessageHub().msg(new Message().msg("success2").setLevel(InformationLevelEnum.SUCCESS));
        PamirsSession.getMessageHub().msg(new Message().msg("debug1").setLevel(InformationLevelEnum.DEBUG));
        PamirsSession.getMessageHub().msg(new Message().msg("debug2").setLevel(InformationLevelEnum.DEBUG));
        PamirsSession.getMessageHub().msg(new Message().msg("warn1").setLevel(InformationLevelEnum.WARN));
        PamirsSession.getMessageHub().msg(new Message().msg("warn2").setLevel(InformationLevelEnum.WARN));
        return data;
    }
}
```

# 五、查询运行返回和效果
系统提示的返回结果
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/result-1024x363-20250530144822298.webp)

系统提示示例效果
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/messagHub-1024x488-20250530144822398.png)

