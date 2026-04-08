---
title: 章节 14：产品的个性化开发（Customized Features）
category:
  - 研发手册
  - 教程
  - 后端框架
order: 14
next:
  text: 探索前端框架（Discover the Front-end Framework）
  link: /v6/zh/DevManual/Tutorials/DiscoverTheFront-endFramework/README.md
---
在上一章的学习中，我们对 Oinone 模块化开发有了更深入的认识。在实际业务开展过程中，除了产品研发工作，我们还需频繁应对不同客户的个性化需求。这些需求丰富多样，涉及应用程序的菜单布局、操作逻辑、交互方式以及表字段设置等多个维度。依照传统研发思路，满足此类需求通常需要对产品源码进行修改。而今天，我们将探讨 Oinone 如何在不改动产品源码的情况下，精准满足客户的个性化诉求。

# 一、模块的upstream属性

参考：与此主题相关的文档可在 “[Module API](/zh/DevManual/Reference/Back-EndFramework/module-API.md)” 中找到。

:::info 目标：在本节结束时：

1. 新增 “ce_expenses（费用管理客户化模块）”，此模块为 “expenses” 的定制化版本，可满足特定场景下的个性化需求。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-14/info1-1.gif)

2. 在费用管理客户化模块中为ProjectType扩展一个描述字段

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-14/info1-2.gif)

:::

在 Oinone 体系中，我们可借助无代码设计器，或者通过新增模块的方式，在无需触碰产品源码的前提下满足客户个性化诉求。而本节将着重介绍一种更为先进的模式，即创建一个 “客户化模块”，使其继承自 “标准产品模块”。我们把客户的个性化需求整合至 “客户化模块”，而非直接作用于 “标准产品模块”。如此一来，在同一环境下，既能清晰对比 “客户化模块” 与 “标准产品模块” 的差异，又能够展示针对不同客户定制后的效果。如：

``` java
@Component
@Module(
        name = CeExpensesModule.MODULE_NAME,
        upstreams = ExpensesModule.MODULE_MODULE,
        displayName = "费用管理客户化模块",
        version = "1.0.0",
        priority = 1,
        dependencies = {ModuleConstants.MODULE_BASE, ExpensesModule.MODULE_MODULE}
)
@Module.module(CeExpensesModule.MODULE_MODULE)
@Module.Advanced(selfBuilt = true, application = true)
public class CeExpensesModule implements PamirsModule {

    public static final String MODULE_MODULE = "ce_expenses";

    public static final String MODULE_NAME = "ceExpenses";

    @Override
    public String[] packagePrefix() {
        return new String[]{
                "pro.shushi.oinone.trutorials.ce.expenses"
        };
    }
}

```

该模块可通过 `upstreams` 来指定上游标准产品应用，确保与标品应用的数据与功能衔接顺畅。

> **练习（Exercise）**
>
> 1. 创建一个客户化模块：
>    创建 `ce_expenses` 模块，`upstreams` 属性设置为 `expenses` ，且依赖增加于 `expenses` 模块。
> 2. 给 `ce_expenses` 模块，增加一个 `ce.expenses.CeProjectType` 模型继承父模型 `expenses.ProjectType` ，增加一个字段：类型描述（description）。
> 3. 按照本节目标中所示，为 `ce.expenses.CeProjectType` 模型，添加一个菜单入口。

:::danger 警告

各个模块的包路径，不能包含相同的包路径，否则会导致元数据加载出问题。所以如链接模块`ce_expenses` 它的包路径建议以ce开头如：pro.shushi.oinone.trutorials.ce.expenses

:::

:::warning 提示：upstream特性

企业版包含`upstream`特性，社区版无此功能。

:::

# 二、函数特性

基于 Oinone 开发，能赋予研发人员的代码出色扩展性，以应对客户的个性化。逻辑除了通过重写函数以外，Oinone还提供了两种方式：

1. 扩展点：用于扩展函数逻辑。扩展点类似于SPI机制（Service Provider Interface），是一种服务发现机制。这一机制为函数逻辑的扩展提供了可能。
2. 拦截器：为平台满足条件的函数以非侵入方式根据优先级扩展函数执行前和执行后的逻辑。

:::danger 警告

默认情况下，扩展点和拦截器仅对页面发起的请求生效，对于在 Java 代码里直接调用函数的情况则不产生作用。

:::

## （一）扩展点

参考：与此主题相关的文档可在 “[扩展点](/zh/DevManual/Reference/Back-EndFramework/functions-API.md#二、extpoint-扩展点)” 中找到。

:::info 目标：在本节结束时：

1. 费用管理的模块的项目类型在新增操作时不会有消息提示
2. 费用管理的客户化模块的项目类型和新项目类型在新增操作时都会有消息提示

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-14/info2.gif)

:::

Oinone所有的函数都提供了默认的前置扩展点、重载扩展点和后置扩展点，其技术名称的规则是所扩展函数的**函数编码fun**加上“Before”、“Override”和“After”后缀；如：

``` java
package pro.shushi.oinone.trutorials.ce.expenses.api.extpoint;

import pro.shushi.oinone.trutorials.expenses.api.model.TestModel;
import pro.shushi.pamirs.meta.annotation.Ext;
import pro.shushi.pamirs.meta.annotation.ExtPoint;

@Ext(TestModel.class)
public interface TestModelExtpoint {
    @ExtPoint(displayName = "TestModel的create函数前置扩展点")
    public TestModel createBefore(TestModel data);
}
```

``` java
package pro.shushi.oinone.trutorials.ce.expenses.core.extpoint;

import pro.shushi.oinone.trutorials.ce.expenses.api.extpoint.TestModelExtpoint;
import pro.shushi.oinone.trutorials.expenses.api.model.TestModel;
import pro.shushi.pamirs.meta.annotation.Ext;
import pro.shushi.pamirs.meta.annotation.ExtPoint;
import pro.shushi.pamirs.meta.api.session.PamirsSession;

@Ext(TestModel.class)
public class TestModelExtpointImpl implements TestModelExtpoint {
    @Override
    @ExtPoint.Implement(displayName = "TestModel的create函数前置扩展点实现",expression = "context.requestFromModule==\"ce_expenses\"")
    public TestModel createBefore(TestModel data) {
        PamirsSession.getMessageHub().info("TestModel的create函数前置扩展点实现");
        return data;
    }
}
```

使用 `@Ext(TestModel.class)` 标记扩展点所扩展函数所在的类，以此明确命名空间。借助 `@ExtPoint` 来定义扩展点，利用 `@ExtPoint.Implement` 定义扩展点的实现。通过 `expression` 和 `priority` 分别设定扩展点的生效条件与优先级。在表达式里，可使用 `context` 与函数参数（如示例中的 `data`）作为变量，其中 `context` 的 `requestFromModule` 代表请求发起的模块。

:::warning 提示

扩展点可通过 `expression` 属性配置生效条件，默认留空时即自动生效。一个扩展点可设多个扩展点实现，Oinone最终会按条件与优先级，只选择一个执行。

:::

> **练习（Exercise）**
>
> 按照本节目标中所示，于 `ce_expenses` 模块中，新增项目类型记录，提示相关信息。

:::danger 警告

函数参数请勿命名为 `context`，该命名会与 Oinone 内置上下文产生冲突，致使表达式执行异常。

:::

:::warning 提示

子模型不仅继承父模型的字段与函数，在继承函数时，还会同步继承函数的扩展点。

:::

## （二）拦截器

参考：与此主题相关的文档可在 “[Hook](/zh/DevManual/Reference/Back-EndFramework/functions-API.md#三、hook-拦截器)” 中找到。

:::info 目标：在本节结束时

客户化模块对新项目类型进行新增操作时，Java后台会打印如下日志：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-14/info3.gif)

2025-04-21 10:41:49.754  INFO 3553 --- [0.0-8191-exec-7] .o.t.c.e.c.h.ProjectTypeCreateBeforeHook : 记录 CeProjectType 创建操作，对应名称为: 营销类

:::

拦截器分为前置与后置两类。前置拦截器处理所拦截函数的入参，后置拦截器则针对所拦截函数的出参进行处理。如：

``` java
package pro.shushi.oinone.trutorials.ce.expenses.core.hook;

import org.springframework.stereotype.Component;
import pro.shushi.oinone.trutorials.expenses.api.model.TestModel;
import pro.shushi.pamirs.meta.annotation.Hook;
import pro.shushi.pamirs.meta.api.core.faas.HookBefore;
import pro.shushi.pamirs.meta.api.dto.fun.Function;
import pro.shushi.pamirs.meta.api.session.PamirsSession;

@Component
public class TestModelCreateBeforeHook implements HookBefore {

    @Override
    @Hook(model = {TestModel.MODEL_MODEL},fun = {"create"},priority = 1)
    public Object run(Function function, Object... args) {
        PamirsSession.getMessageHub().info("TestModel的create函数BeforeHook");
        return args;
    }

}
```

Oinone通过在方法上添加 `@Hook` 注解，可将该方法标记为拦截器。其中，前置拦截器需实现 `HookBefore` 接口，后置拦截器则需实现 `HookAfter` 接口。示例为前置拦截器其入参涵盖当前拦截函数定义及拦截函数的输入参数。拦截器的执行顺序可通过 `priority` 属性灵活调整，该数值越小，对应拦截器的执行优先级越高，将优先触发执行。

:::warning 提示

拦截器采用类似 AOP 的机制，可对任意函数进行拦截，并支持多个拦截器按优先级顺序执行。通过非必填字段`module`、`model`、`fun`、函数类型及`active`，精准筛选出适用于当前拦截方法的生效拦截器。

:::

:::danger 警告

由于拦截器会对所有函数进行拦截，若拦截器数量过多，将不可避免地导致性能下降。

:::

> **练习（Exercise）**
>
> 按照本节目标中所示，于 `ce_expenses` 模块中，新增项目类型记录，系统打印对应日志。



后端框架基础教程到此就结束啦，相信你已掌握要点。若实操遇问题，欢迎随时交流。后续还有进阶内容，期待与你共同进步！

