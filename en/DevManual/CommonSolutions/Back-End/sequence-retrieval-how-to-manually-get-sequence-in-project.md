---
title: Sequence Acquisition:How to Manually Obtain Sequences in Projects
index: true
category:
  - Common Solutions
order: 10
---
In practical projects, there may be scenarios where manual sequence acquisition is required, such as coding rules combining dynamic values with sequences. When dynamic values are determined by business data, manual sequence acquisition becomes necessary.

# I. Examples of Manual Sequence Acquisition

## (I) Example 1 of Acquisition Method

```java
/**
 * Manual code generation required in specific scenarios
 */
public void manualSetIdCode() {
    DemoItem demoItem = new DemoItem();
    // Manually generate code
    Object codeObj = CommonApiFactory.getSequenceGenerator().generate("SEQ", DemoItem.MODEL_MODEL);
    String code = TypeUtils.stringValueOf(codeObj);
    demoItem.setCode(code);

    //……
}
```

## (II) Example 2 of Acquisition Method

When acquiring more complex sequence rules manually, define the sequence rules first and then call them manually in business code.

1. Initialize SequenceConfig during system startup

```java
public class SeqConstants {
    /**
     * Constant for order code sequence
     */
    public static final String SAMPLE_ORDER_SEQ = "SAMPLE_ORDER_SEQ";

    /**
     * Constant for application form code sequence
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
            // Initialize SequenceConfig according to business requirements
            util.createSequenceConfig("Order Code Generation", SeqConstants.SAMPLE_ORDER_SEQ, SequenceEnum.ORDERLY_SEQ, 8)
            .setStep(1)
            .setInitial(80000000L)
            .setIsRandomStep(false);
            // Initialize SequenceConfig according to business requirements
            util.createSequenceConfig("Application Form Code Generation", SeqConstants.SAMPLE_APPLY_SEQ, SequenceEnum.DATE_SEQ, 4)
            .setStep(1)
            .setPrefix("YP")
            .setInitial(1000L)
            .setIsRandomStep(false);
        }
    }
}
```

2. Obtain sequence values in business code

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
    // Other logic

    return data;
    }
```

# II. Best Practices

1. Manual sequence acquisition is unnecessary if not required. After configuring model sequences or field sequences, corresponding fields will be automatically assigned values based on sequences when new data is added.

2. In practical projects, define sequence identifiers (such as SAMPLE_ORDER_SEQ and SAMPLE_APPLY_SEQ in the example) in a constant class.