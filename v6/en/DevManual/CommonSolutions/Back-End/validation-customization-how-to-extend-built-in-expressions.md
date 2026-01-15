---
title: Validation Customization:How to Implement Special Requirements with Custom Expressions? Extending Built-in Function Expressions
index: true
category:
  - Common Solution Approaches
order: 50
---

Does the platform provide many expressions, but they don't meet your scenario needs? How should we add new expressions to satisfy project requirements?

# I. Scenarios for Extending Expressions
When needing to perform NULL validation on a specific parameter within a List-type field of input parameters, and finding that the platform's built-in functions cannot support configuration for this scenario, you can leverage the platform's relevant mechanisms to extend built-in functions.

Common code scenarios are as follows:

``` java
package pro.shushi.pamirs.demo.core.action;

......Imported classes

@Model.model(PetShopProxy.MODEL_MODEL)
@Component
public class PetShopProxyAction extends DataStatusBehavior<PetShopProxy> {

    @Override
    protected PetShopProxy fetchData(PetShopProxy data) {
        return data.queryById();
    }
    @Validation(ruleWithTips = {
        @Validation.Rule(value = "!IS_BLANK(data.code)", error = "Encoding is a required field"),
        @Validation.Rule(value = "LEN(data.name) < 128", error = "Name is too long, cannot exceed 128 characters"),
    })
    @Action(displayName = "Enable")
    @Action.Advanced(invisible="!(activeRecord.code !== undefined && !IS_BLANK(activeRecord.code))")
    public PetShopProxy dataStatusEnable(PetShopProxy data){
        data = super.dataStatusEnable(data);
        data.updateById();
        return data;
    }

    ......Other code

}
```

# II. Creating a Custom Expression Function
A function for validating input parameters. When the input is a collection object, if a specific field of any single object in the collection is null, the function returns false.

:::tip Example:

Create a `CustomCollectionFunctions` class

:::

``` java
package xxx.xxx.xxx;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.stereotype.Component;
import pro.shushi.pamirs.meta.annotation.Fun;
import pro.shushi.pamirs.meta.annotation.Function;
import pro.shushi.pamirs.meta.common.constants.NamespaceConstants;
import pro.shushi.pamirs.meta.util.FieldUtils;

import java.util.List;

import static pro.shushi.pamirs.meta.enmu.FunctionCategoryEnum.COLLECTION;
import static pro.shushi.pamirs.meta.enmu.FunctionLanguageEnum.JAVA;
import static pro.shushi.pamirs.meta.enmu.FunctionOpenEnum.LOCAL;
import static pro.shushi.pamirs.meta.enmu.FunctionSceneEnum.EXPRESSION;

/**
 * Custom built-in functions
 */
@Fun(NamespaceConstants.expression)
@Component
public class CustomCollectionFunctions {

    /**
     * LIST_FIELD_NULL is our custom expression, which must not repeat existing expressions!!!
     *
     * @param list
     * @param field
     * @return
     */
    @Function.Advanced(
        displayName = "Verify if the integrated parameter is null", language = JAVA,
        builtin = true, category = COLLECTION
    )
    @Function.fun("LIST_FIELD_NULL")
    @Function(name = "LIST_FIELD_NULL", scene = {EXPRESSION}, openLevel = LOCAL,
              summary = "Function example: LIST_FIELD_NULL(list,field). Function description: Pass an object collection to verify if the collection's field is null"
             )
    public Boolean listFieldNull(List list, String field) {
        if (null == list) {
            return false;
        }
        if (CollectionUtils.isEmpty(list)) {
            return false;
        }
        for (Object data : list) {
            Object value = FieldUtils.getFieldValue(data, field);
            if (value == null) {
                return false;
            }
        }
        return true;
    }

}
```

# III. Registering the Custom Expression Class to the Platform's Whitelist
:::tip Example:

Create the `CustomFaasScriptAllowListApi` class, where the `@Order` priority must be higher than the platform's default priority to take effect.

:::

``` java
package xxx.xxx.xxx;

import org.apache.commons.collections4.SetUtils;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import pro.shushi.pamirs.framework.faas.fun.builtin.*;
import pro.shushi.pamirs.framework.faas.spi.api.guard.FaasScriptAllowListApi;
import pro.shushi.pamirs.meta.common.constants.NamespaceConstants;
import pro.shushi.pamirs.meta.common.spi.SPI;

import java.util.Set;

/**
 * Custom implementation of SPI for function whitelist and blacklist allowing expression calls
 */
@Order(1) // Increase the priority of the custom class here
@Component
@SPI.Service
public class CustomFaasScriptAllowListApi implements FaasScriptAllowListApi {

    // Whitelist
    public static final Set<String> DEFAULT_SET = SetUtils.hashSet(

        // Whitelist, directly replicate the default implementation: pro.shushi.pamirs.framework.faas.spi.service.DefaultFaasScriptAllowListApi
        CollectionFunctions.class.getName(),
        ContextFunctions.class.getName(),
        DateFunctions.class.getName(),
        LogicFunctions.class.getName(),
        MapFunctions.class.getName(),
        MathFunctions.class.getName(),
        ObjectFunctions.class.getName(),
        RegexFunctions.class.getName(),
        TextFunctions.class.getName(),

        // Add your own whitelist classes below
        CustomCollectionFunctions.class.getName()

    );

    @Override
    public Set<String> classWhiteList() {
        return DEFAULT_SET;
    }

    @Override
    public Set<String> namespaceWhiteList() {
        return SetUtils.hashSet(NamespaceConstants.expression);
    }

}
```

# IV. Using Custom Expressions
:::tip Example:

Demo usage scenario:

:::

``` java
/**
     * Note: The [field] parameter of the custom function is a text, so quotes must be added to indicate the parameter is text; otherwise, data cannot be parsed. The same applies to other scenarios.
     *
     * @param data
     * @return
     */
@Action.Advanced(name = FunctionConstants.create, managed = true)
@Action(displayName = "Confirm", summary = "Create", bindingType = ViewTypeEnum.FORM)
@Function(name = FunctionConstants.create)
@Function.fun(FunctionConstants.create)
@Validation(ruleWithTips = {
    @Validation.Rule(value = "LIST_FIELD_NULL(data.itemAttributes,'itemId')", error = "Field cannot be empty"),
})
public DemoItem create(DemoItem data) {
return demoItemService.create(data);
}
```

---

Conclusion: You can leverage the platform's mechanisms to establish a set of expressions tailored to your specific scenario requirements.