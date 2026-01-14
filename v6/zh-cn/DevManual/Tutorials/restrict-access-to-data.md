---
title: 限制数据访问权限（Restrict access to data）
index: true
category:
  - 研发手册
  - 教程
order: 6

---
:::warning 提示

本教程是 “后端框架教程” 的延伸。请确保你已完成该教程，并以你构建的 “费用管理（expenses）” 模块作为本教程练习的基础。

:::

在学习这篇文章之前，你首先需要对 Oinone 安全相关内容进行一个初步了解，以便于理解本文所介绍的自定义相关内容。参考：[后端框架 - 安全简介](/zh-cn/DevManual/Tutorials/Back-endFramework/chapter4-a-brief-introduction-to-security.md)

到目前为止，我们主要关注于实现实用功能。然而，在大多数业务场景中，安全性很快成为一个需要关注的问题：

目前我们可以通过 “系统权限” 配置谁可以查看 `费用管理 - 费用报销 - 报销单` 中的数据以及对数据进行管理。

但是，我们还希望登录系统的每个人只能查看 “报销人” 是自己的报销单数据，但对于 “项目发起人”  来说，他还可以查看自己发起项目的所有报销单数据。

参考：与此主题相关的文档可在 “[安全机制](/zh-cn/DevManual/Reference/Back-EndFramework/security-in-oinone.md)” 、“[网关协议 API](/zh-cn/DevManual/Reference/Back-EndFramework/AdvanceAPI/protocol-API.md)” 和 “[请求上下文 API](/zh-cn/DevManual/Reference/Back-EndFramework/AdvanceAPI/request-context-API.md)” 中找到。

# 一、只能查看 “报销人” 是自己的报销单

:::info 目标：在本节结束时：

1. 在项目管理中，有一个 “Oinone 演示项目” ，其项目发起人是 “test”。并且 “关联报销单” 中有两条数据，其报销人分别是 “test” 和 “test2”。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/RestrictAccessToData/1749025398418-b6c09161-9271-4772-ab65-2328e5a815a8.gif)

2. 菜单中存在 “费用报销 - 报销单” 这一菜单项，并且可以正常查看新创建的两条报销单数据。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/RestrictAccessToData/1749025621472-ab5b11b1-2d36-4cda-83a1-263fd3d6afb3.png)

3. 通过 “系统权限” 配置 “数据权限”之后，使用不同的用户登录就可以看到如下两种效果：

+ 登录 test 用户查看报销单

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/RestrictAccessToData/1749025759555-8a46240a-c932-4d2b-b7f0-40da3beddc4b.png)

+ 登录 test2 用户查看报销单

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/RestrictAccessToData/1749025858149-bfe99eda-e8d5-49ee-a733-8bac07d8b371.png)

:::

对于 `报销单模型（expenses.ExpenseBill）` ，我们需要在每个用户查询数据的时候都追加一段 `RSQL` 表达式对其进行过滤，一个可能有效的 `RSQL` 表达式应该是：

```java
reporterId == ${currentUser}
```

让我们在系统权限中尝试配置一下：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/RestrictAccessToData/1749026388467-8acf03df-75ae-4270-907e-51647e70fed6.png)

> **练习（Exercise）**
>
> 1. 在报销单中添加项目信息和报销人字段，并重启项目。

| 字段（Field） | 字段显示名 | 类型（Type） | 属性                                                         |
| ------------- | ---------- | ------------ | ------------------------------------------------------------ |
| projectInfo   | 项目信息   | `M2O`        |              |
| reporter      | 报销人     | `M2O`        | required（必填） |


> 2. 登录 test 用户。
> 3. 进入 `基础数据 - 项目管理` 页面创建新项目。

| 字段         | 值                                    |
| ------------ | ------------------------------------- |
| 项目名称     | Oinone 演示项目                       |
| 所属年份     | 2025年                                |
| 人员投入规模 | 2                                     |
| 人均预算     | 100                                   |
| 项目发起人   | test                                  |
| 关联报销单   | 2条数据（报销人分别是 test 和 test2） |


> 4. 添加 “报销单” 菜单入口。
> 5. 在 “系统权限” 中 配置 “报销单” 菜单对应的数据权限。

:::danger 警告：

如果在项目中自定义了 “项目管理” 的表单视图，那么在 “关联报销单” 子表格中需要添加 “报销人” 字段，否则 “报销人” 数据无法正确保存。

:::

# 二、“项目发起人” 可以看到发起项目的所有报销单

:::info 目标：在本节结束时，报销单页面不仅能看到自己创建的报销单数据，还可以看到 “项目发起人” 发起项目的所有报销单。

登录 test 用户查看报销单

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/RestrictAccessToData/1749027807399-25e6c396-65a2-42b0-9a35-62a86f79e7c9.png)

登录 test2 用户查看报销单

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/RestrictAccessToData/1749027839151-0d7d15d1-3ab0-45e4-add1-b8f3a81fc6f7.png)

:::

在我们创建的报销单模型中，我们看到有一个 `项目Id（projectInfoId）` 字段，这个字段是关联项目的关系字段。根据需求我们可以得到这样一个有效的 RSQL 表达式：

```java
projectInfoId =in= (id1, id2, id3...)
```

如何获取 `id1, id2, id3...` 这些值呢？

它们是根据 `当前登录用户ID` 在 `项目信息模型（expenses.ProjectInfo）` 通过 `项目发起人ID（userId）` 过滤得到的，最后再拼接到 `报销单模型` 的查询条件中。

我们可以使用 `自定义占位符 PlaceHolder` 来实现动态替换数据权限表达式的值，就像系统内置的上下文中当前登录用户那样。

:::tip 举例：以下是自定义占位符 PlaceHolder 示例：

:::

```java
@Component
public class TestPlaceHolder extends AbstractPlaceHolderParser {

    @Override
    protected String value() {
        List<Long> ids = queryCurrentProjectInfoIds();
        if (ids.isEmpty()) {
            return "(-1)";
        }
        return "(" + ids.stream().map(String::valueOf).collect(Collectors.joining(",")) + ")";
    }

    private List<Long> queryCurrentProjectInfoIds() {
        if (PamirsSession.isAdmin()) {
            return Collections.emptyList();
        }
        Long currentUserId = PamirsSession.getUserId();
        if (currentUserId == null) {
            return Collections.emptyList();
        }
        return new TestModel().queryList(Pops.<TestModel>lambdaQuery()
                .from(TestModel.MODEL_MODEL)
                .select(TestModel::getId)
                .eq(TestModel::getUserId, currentUserId)).stream().map(TestModel::getId).collect(Collectors.toList());
    }

    @Override
    public Integer priority() {
        return 0;
    }

    @Override
    public Boolean active() {
        return true;
    }

    @Override
    public String namespace() {
        return "testIds";
    }
}
```

通过系统权限配置数据权限时，选择源码模式，就可以通过手动输入的形式使用自定义占位符啦～

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/RestrictAccessToData/1749027983059-f764b140-928e-4e0e-89eb-79fcbec40d4b.png)

> **练习（Exercise）**
>
> 1. 创建 CurrentProjectInfoIdsPlaceHolder 类
> 2. 声明 currentProjectInfoIds 占位符属性名称
> 3. 通过当前登录用户ID查询项目IDS
> 4. 在 “系统权限” 中 使用源码模式配置 “报销单” 菜单对应的数据权限。

# 三、占位符 PlaceHolder 实现优化

在大多数场景中，同一个占位符可能用在多个地方，并且可能在一个请求中重复使用。对于占位符值的获取一般我们采用 “线程级别缓存” 进行处理。这一部分没有示例代码，读者可参考 “[请求上下文 API](/zh-cn/DevManual/Reference/Back-EndFramework/AdvanceAPI/request-context-API.md)” 中的 “扩展 PamirsSession” 部分的内容自行实现。

> **练习（Exercise）**
>
> 1. 创建 CurrentProjectInfoIdsSession 类
> 2. 将 queryCurrentProjectInfoIds 方法使用线程级别缓存获取

