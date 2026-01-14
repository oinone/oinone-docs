---
title: 序列获取：如何在项目中手动获取序列
index: true
category:
  - 常见解决方案
order: 10
---
实际项目中在特定情况下可能需要手动获取序列，如编码规则： 动态值+序列； 而动态值是根据业务数据确定的，那么这种场景下就需要通过手动的方式获取序列了。

# 一、手动获取序列示例

## （一）获取方式示例1

```java
/**
 * 在特定场景下需要手动code
 */
public void manualSetIdCode(){
    DemoItem demoItem = new DemoItem();
    // 手动生成code
    Object codeObj = CommonApiFactory.getSequenceGenerator().generate("SEQ",DemoItem.MODEL_MODEL);
    String code = TypeUtils.stringValueOf(codeObj);
    demoItem.setCode(code);

    //……
}
```

## （二）获取方式示例2

当手动获取更复杂的序列规则的时候，可以先定义序列的规则，然后在业务代码中手动进行调用。

1、在系统启动的时初始化 SequenceConfig

```java
public class SeqConstants {
    /**
     * 订单编码序列常量
     */
    public static final String SAMPLE_ORDER_SEQ = "SAMPLE_ORDER_SEQ";

    /**
     * 订单编码序列常量
     */
    public static final String SAMPLE_APPLY_SEQ = "SAMPLE_APPLY_SEQ";

}
```

```java
package pro.shushi.pamirs.demo.core.init;

import org.springframework.stereotype.Component;
import pro.shushi.pamirs.boot.common.api.command.AppLifecycleCommand;
import pro.shushi.pamirs.boot.common.extend.MetaDataEditor;
import pro.shushi.pamirs.core.common.InitializationUtil;
import pro.shushi.pamirs.demo.api.DemoModule;
import pro.shushi.pamirs.demo.core.constant.SeqConstants;
import pro.shushi.pamirs.meta.annotation.fun.extern.Slf4j;
import pro.shushi.pamirs.meta.api.dto.meta.Meta;
import pro.shushi.pamirs.meta.enmu.SequenceEnum;

import java.util.Map;

@Slf4j
@Component
public class DemoMetadataEditor implements MetaDataEditor {

    @Override
    public void edit(AppLifecycleCommand command, Map<String, Meta> metaMap) {
        InitializationUtil util = InitializationUtil.get(metaMap, DemoModule.MODULE_MODULE, DemoModule.MODULE_NAME);
        if (util == null) {
            return;
        }
        bizSequence(util);
    }

    @Slf4j
    @Component
    public class DemoMetadataEditor implements MetaDataEditor {

        @Override
        public void edit(AppLifecycleCommand command, Map<String, Meta> metaMap) {
            InitializationUtil util = InitializationUtil.get(metaMap, HrSimpleModule.MODULE_MODULE, HrSimpleModule.MODULE_NAME);
            if (util == null) {
                return;
            }
            bizSequence(util);
        }

        private void bizSequence(InitializationUtil util) {
            // 根据自己的业务需求初始化SequenceConfig
            util.createSequenceConfig("订单编码生成", SeqConstants.SAMPLE_ORDER_SEQ, SequenceEnum.ORDERLY_SEQ, 8)
            .setStep(1)
            .setInitial(80000000L)
            .setIsRandomStep(false);
            // 根据自己的业务需求初始化SequenceConfig
            util.createSequenceConfig("申请单编码生成", SeqConstants.SAMPLE_APPLY_SEQ, SequenceEnum.DATE_SEQ, 4)
            .setStep(1)
            .setPrefix("YP")
            .setInitial(1000L)
            .setIsRandomStep(false);
        }
    }
}
```

2、在业务代码中获取序列的值

```java
public class SequenceManager {

    public static String getSaleOrderCode(String prefix) {
        Object sequence = CommonApiFactory.getSequenceGenerator().generate(SequenceEnum.ORDERLY_SEQ.value(),
                                                                           SeqConstants.SAMPLE_ORDER_SEQ);
        return prefix + TypeUtils.stringValueOf(sequence);
    }

    public static String getApplyOrderCode(String prefix) {
        Object sequence = CommonApiFactory.getSequenceGenerator().generate(SequenceEnum.ORDERLY_SEQ.value(),
                                                                           SeqConstants.SAMPLE_APPLY_SEQ);
        return prefix + TypeUtils.stringValueOf(sequence);
    }

}
```

```java
public SampleSaleOrder create(SampleSaleOrder data) {
    data.construct();
    data.setCode(SequenceManager.getSaleOrderCode(data.getOrderType().getValue()));
    // 其他逻辑

    return data;
    }
```

# 二、最佳实践

1、非必要不需要手动去获取序列，直接配置模型序列或者字段序列后，在数据新增时会自动根据序列给对应的字段赋值；

2、实际项目中，把序列的标识（如示例中的 SAMPLE_ORDER_SEQ 和 SAMPLE_APPLY_SEQ)定义到一个常量中。

