---
title: 章节 4：安全简介（A Brief Introduction To Security）
index: true
category:
  - 研发手册
  - 教程
  - 后端框架
order: 4

---
在上一章中，我们创建了第一个用于存储业务数据的表。在像 Oinone 这样的业务应用程序中，首先要考虑的问题之一是谁（1）可以访问这些数据。Oinone 提供了一种安全机制，以允许特定用户组访问数据。

关于安全的主题在 “[限制数据访问](/zh-cn/DevManual/Tutorials/restrict-access-to-data.md)” 中有更详细的介绍。本章旨在涵盖我们新模块所需的最基本安全知识。

# 一、菜单入口
:::info 目标：在本节结束时，项目信息的增、删、改、查的基础功能有对应的菜单入口

:::

为了方便介绍安全控制中资源权限和数据权限，先把项目信息的管理入口，通过菜单配置先放出来。

``` java
package pro.shushi.oinone.trutorials.expenses.core.init;

import pro.shushi.oinone.trutorials.expenses.api.model.ProjectInfo;
import pro.shushi.pamirs.boot.base.constants.ViewActionConstants;
import pro.shushi.pamirs.boot.base.ux.annotation.action.UxRoute;
import pro.shushi.pamirs.boot.base.ux.annotation.navigator.UxMenu;
import pro.shushi.pamirs.boot.base.ux.annotation.navigator.UxMenus;

@UxMenus public class ExpensesMenus implements ViewActionConstants {
    @UxMenu("基础数据")
    class ExpensesBaseMenu {
        @UxMenu("测试菜单") @UxRoute(TestModel.MODEL_MODEL) class TestModelMenu { }
    }
}
```

这个定义足以让 Oinone 生成一个名为“测试菜单”的菜单入口。按照惯例，用@UxMenus声明ExpensesMenus为菜单初始化入口，初始化类ExpensesMenus都位于模块的配置包扫描路径中如： `pro.shushi.oinone.trutorials.expenses.core.init`。那么通过ExpensesMenus初始化的菜单都挂在expenses这个模块上。

:::warning 提示：菜单初始化

1. @UxMenu来申明菜单，值为菜单名称。菜单可以嵌套，如“测试菜单”在“基础数据”菜单下作为子菜单。
2. 通过@UxRoute，值为模型的编码，表明该菜单会跳转到哪个模型的视图页面。会自动生成一个ViewAction记录作为菜单与视图之间的桥梁
3. 如果没有指定特定视图，则会跳转到该模型的表格视图，相同类型的视图按优先级选择，数值越低优先级越高，其中系统默认生成的视图优先级数值统一为88。
4. 为模型配置了菜单入口，或者其他任何可以跳转到该模型的入口，Oinone系统会为该模型生成对应的默认视图。

:::

> **练习（Exercise）**
>
> **为项目信息模型初始化菜单**：根据TestModel示例，为`ProjectInfo`模型创建菜单“项目管理”，也挂在“基础数据”菜单下作为子菜单。
>

# 二、用户与角色
角色可在「管理中心-角色与权限-角色管理」中进行管理与维护。新增一个“test”角色用于测试

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-4/user1.png)

用户可在「管理中心-用户」中进行管理与维护。新增一个用户“test”并绑定“test”角色用于测试

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-4/user2.png)

# 二、访问权限配置
:::info 目标：在本节结束时，test用户登陆后可以访问「费用管理-基础数据-项目管理」，并且操作数据的增删改查。

:::

我们可以为「费用管理-基础数据-项目管理」设置权限组并绑定角色。在「管理中心-角色与权限-系统权限」中进行管理与维护。

## （一）资源权限
资源权限包括：应用权限、菜单权限、操作权限等，需要挨个设置。

:::tip 举例：为“test”角色赋予“费用管理”应用访问权限示例：

在系统权限页面选中费用管理，并通过点击“添加角色”按钮，在弹出框中选择“test”角色，确定保存

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-4/tip1-1.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-4/tip1-2.png)

:::

:::tip 举例：为“test”角色赋予费用管理应用下“测试菜单”的访问权限示例：

1、在系统权限页面选中「费用管理-基础数据-测试菜单」，并通过点击“添加权限组”按钮，在弹出框中配置权限组权限，确定保存

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-4/tip2-1-1.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-4/tip2-1-2.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-4/tip2-1-3.png)

2、为test权限组绑定角色，这里我们绑定角色“test”。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-4/tip2-2-1.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-4/tip2-2-2.png)

3、test用户登陆，只能访问“费用管理”和其下的“测试菜单”

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-4/tip2-3.png)

:::

:::warning 提示

1、配置权限时使用admin账户登陆

2、test登陆时的密码为创建用户时表单填入的初始化密码，在示例中为：test1234@

:::

> **练习（Exercise）**
>
> **项目管理菜单资源权限设置**：根据菜单“测试菜单”示例，为“test”角色赋予「费用管理-基础数据-项目管理」菜单对应访问权限与操作权限。
>

## （二）数据权限
Oinone对数据访问权限控制可以分别设置：行级与列级。

:::info 目标：在本节结束时，test用户登陆后可以访问「费用管理-基础数据-项目管理」，但只能访问名称中包含“test”字符的数据

:::

:::tip 举例：为“test”角色赋予费用管理应用下“测试菜单”的访问权限示例：

1、在系统权限页面选中「费用管理-基础数据-测试菜单」，并通过点击“test权限组”对应的“编辑”按钮，在弹出框中配置权限组的字段权限与数据权限，确定保存

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-4/tip3-1-1.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-4/tip3-1-2.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-4/tip3-1-3.png)

2、test重新登陆，再次访问的“测试菜单”，列表中“创建时间”和“更改时间”字段为不可见。新增数据name如果不包含“test”字符串则数据行不可见

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-4/tip3-2.png)

:::

:::warning 提示：字段权限配置

在配置字段权限时，一定要取消全部字段“可见”、“可编辑”的选项，否则字段权限不生效

:::
:::warning 提示：字段权限与数据权限

企业版包含字段权限与数据权限功能，社区版无此功能。

:::

> **练习（Exercise）**
>
> **项目管理的数据权限设置**：根据菜单“测试菜单”示例，为“test”角色赋予「费用管理-基础数据-项目管理」菜单对应模型项目信息的数据行权限，即只能查看“项目名称”字段值包含“test”字符串的数据。
>



现在终于可以与用户界面进行交互了！

