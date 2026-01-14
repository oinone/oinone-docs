---
title: 页面设计：全局首页及应用首页配置方法（homepage）
index: true
category:
  - 常见解决方案
order: 69
---

# 一、Oinone 平台首页介绍
## （一）首页包括`全局首页`和`应用首页`两类
+ 全局首页：指用户在登录时未指定重定向地址的情况下使用的应用首页
+ 应用首页：指用户在切换应用时使用的首页

:::info 注意：

全局首页本质上也是应用首页，是在用户没有指定应用时使用的首页。如登录后。

:::

## （二）全局首页查找规则
+ 找到当前用户有权限访问的全部应用。
+ 若使用 AppConfig 配置首页，则优先使用该配置作为全局首页。若未指定或无权限访问，则继续第3步。
+ 依次按照应用优先级，获取有权限的首页或菜单作为全局首页。
+ 若未查找到任何可访问页面，则提示无权限访问相关异常，用户无法进入平台。

### （三）应用首页查找规则
+ 在指定应用下，获取有权限的首页或菜单作为应用首页。
+ 若未查找到任何可访问页面，则提示无权限访问相关异常，用户进入应用后无法正常查看或操作。

# 二、配置`全局首页`
使用应用优先级设置全局首页

```java
/**
 * 演示模块
 *
 * @author Adamancy Zhang at 16:55 on 2024-03-24
 */
@UxHomepage(@UxRoute(DemoDepartment.MODEL_MODEL))
@Component
@Boot
@Module(
    name = DemoModule.MODULE_NAME,
    displayName = "演示应用",
    version = "1.0.0",
    dependencies = {ModuleConstants.MODULE_BASE},
    priority = 0
)
@Module.module(DemoModule.MODULE_MODULE)
@Module.Advanced(selfBuilt = true)
public class DemoModule implements PamirsModule {

    public final static String MODULE_MODULE = "demo";

    public final static String MODULE_NAME = "demo";

    @Override
    public String[] packagePrefix() {
        return new String[]{"pro.shushi.pamirs.demo"};
    }

}
```

:::info 注意：

+ `@UxHomepage`用于指定应用首页
+ `@Module#priority`用于指定模块优先级，按升序排列

:::

# 三、配置`应用首页`
## （一）使用`@UxHomepage`配置应用首页
### 1、指定模型的默认表格视图作为应用首页
```java
@UxHomepage(@UxRoute(DemoDepartment.MODEL_MODEL))
```

该指定方式将产生以下结果：

+ 生成一个跳转动作（ViewAction），其模型编码为`DemoDepartment.MODEL_MODEL`，动作名称为`homepage`。
+ 设置`ModuleDefinition#homePageModel`和`ModuleDefinition#homePageName`为该跳转动作。

### 2、指定模型对应的菜单作为应用首页
在当前应用下有如下菜单定义：

```java
/**
 * 演示模块菜单
 *
 * @author Adamancy Zhang at 17:16 on 2024-03-24
 */
@UxMenus
public class DemoMenus {

    @UxMenu("演示部门")
    @UxRoute(DemoDepartment.MODEL_MODEL)
    class DepartmentManagement {
    }

    @UxMenu("演示员工")
    @UxRoute(DemoEmployee.MODEL_MODEL)
    class EmployeeManagement {
    }
}
```

根据菜单定义我们可以知道：

`演示部门`这个菜单会生成一个跳转动作（ViewAction），其模型编码为`DemoDepartment.MODEL_MODEL`，动作名称为`DemoMenus_DepartmentManagement`。

因此，我们可以使用如下方式指定应用首页为`演示部门`这个菜单：

```java
@UxHomepage(actionName = "DemoMenus_DepartmentManagement", value = @UxRoute(DemoDepartment.MODEL_MODEL))
```

# 四、在应用中心修改应用首页
在平台启动之后，将无法通过代码的方式修改首页，因此需要在应用中心修改应用首页。

按照如下图所示操作对应用首页进行设置。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/2024032409373428-20250530144822627.png)

在绑定菜单选项中，选择指定菜单即可。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/2024032409373725-20250530144822685.png)

