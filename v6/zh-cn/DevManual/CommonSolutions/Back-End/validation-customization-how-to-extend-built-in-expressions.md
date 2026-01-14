---
title: 校验定制：如何自定义表达式实现特殊需求？扩展内置函数表达式
index: true
category:
  - 常见解决方案
order: 50
---

平台提供了很多的表达式，如果这些表达式不满足场景？那我们应该如何新增表达式去满足项目的需求？

# 一、扩展表达式的场景
若需针对入参中 List 类型字段内的某一参数执行 NULL 校验，且发现平台的内置函数无法支持此场景的配置时，可借助平台的相关机制，对内置函数予以扩展 。

常见的一些代码场景，如下：

```java
package pro.shushi.pamirs.demo.core.action;

……引用类

@Model.model(PetShopProxy.MODEL_MODEL)
@Component
public class PetShopProxyAction extends DataStatusBehavior<PetShopProxy> {

    @Override
    protected PetShopProxy fetchData(PetShopProxy data) {
        return data.queryById();
    }
    @Validation(ruleWithTips = {
        @Validation.Rule(value = "!IS_BLANK(data.code)", error = "编码为必填项"),
        @Validation.Rule(value = "LEN(data.name) < 128", error = "名称过长，不能超过128位"),
    })
    @Action(displayName = "启用")
    @Action.Advanced(invisible="!(activeRecord.code !== undefined && !IS_BLANK(activeRecord.code))")
    public PetShopProxy dataStatusEnable(PetShopProxy data){
        data = super.dataStatusEnable(data);
        data.updateById();
        return data;
    }

    ……其他代码

}
```

# 二、新建一个自定义表达式的函数
用于校验入参的函数 。当入参为一个集合对象时，若集合中单个对象的某个特定字段为空，则该函数返回 false 。

:::tip 举例：

新建一个 `CustomCollectionFunctions` 类

:::

```java
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
 * 自定义内置函数
 */
@Fun(NamespaceConstants.expression)
@Component
public class CustomCollectionFunctions {

    /**
     * LIST_FIELD_NULL 就是我们自定义的表达式，不能与已经存在的表达式重复！！！
     *
     * @param list
     * @param field
     * @return
     */
    @Function.Advanced(
        displayName = "校验集成的参数是否为null", language = JAVA,
        builtin = true, category = COLLECTION
    )
    @Function.fun("LIST_FIELD_NULL")
    @Function(name = "LIST_FIELD_NULL", scene = {EXPRESSION}, openLevel = LOCAL,
              summary = "函数示例: LIST_FIELD_NULL(list,field)，函数说明: 传入一个对象集合，校验集合的字段是否为空"
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

# 三、将自定义的表达式类，注册到平台的白名单
:::tip 举例：

新建`CustomFaasScriptAllowListApi`类，`@Order`优先级要高于平台默认的优先级才会生效。

:::

```java
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
 * 自定义：支持表达式调用的函数白名单与黑名单SPI实现
 */
@Order(1) //此处把自定义的类优先级调高
@Component
@SPI.Service
public class CustomFaasScriptAllowListApi implements FaasScriptAllowListApi {

    //白名单
    public static final Set<String> DEFAULT_SET = SetUtils.hashSet(

        //白名单，直接复制默认实现，pro.shushi.pamirs.framework.faas.spi.service.DefaultFaasScriptAllowListApi
        CollectionFunctions.class.getName(),
        ContextFunctions.class.getName(),
        DateFunctions.class.getName(),
        LogicFunctions.class.getName(),
        MapFunctions.class.getName(),
        MathFunctions.class.getName(),
        ObjectFunctions.class.getName(),
        RegexFunctions.class.getName(),
        TextFunctions.class.getName(),

        //下面添加自己的白名单类
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

# 四、使用自定义的表达式
:::tip 举例：

使用场景demo：

:::

```java
/**
     * 注意点：自定义函数的 [field]字段是个文本，一定要加个引号代表参数是文本，不然无法解析到数据，其他场景类似
     *
     * @param data
     * @return
     */
@Action.Advanced(name = FunctionConstants.create, managed = true)
@Action(displayName = "确定", summary = "创建", bindingType = ViewTypeEnum.FORM)
@Function(name = FunctionConstants.create)
@Function.fun(FunctionConstants.create)
@Validation(ruleWithTips = {
    @Validation.Rule(value = "LIST_FIELD_NULL(data.itemAttributes,'itemId')", error = "字段不能为空"),
})
public DemoItem create(DemoItem data) {
return demoItemService.create(data);
}
```

---

结语：可以通过平台的机制，去沉淀一套满足自己场景需求的表达式。

