---
title: 动作 API（Actions API）
index: true
category:
  - 研发手册
  - Reference
  - 后端API
order: 4

---
在 Oinone 平台中，**动作（Action）** 是构建交互逻辑的核心单元，通过标准化的定义方式，实现不同场景下的业务功能与数据交互。根据应用场景与功能特性，动作主要分为四大类型：视图动作、链接动作、客户端动作和服务器动作，各类型功能及适用场景如下：

:::warning 提示

本文档可助您快速掌握核心概念与基础逻辑。除了利用`Ux`注解和`XML`配置以外，也推荐使用设计器辅助开发。设计器能够提供可视化操作界面，简化配置流程、降低编码复杂度，帮助您更高效、精准地完成开发任务 ，显著提升开发效率与质量。

:::

# 一、服务器动作 ServerAction

在 Oinone 系统中，服务器动作（ServerAction）是实现后端业务逻辑与数据交互的核心组件，是发起服务器请求与触发请求按钮的定义，通过注解配置与校验机制，可灵活定义请求处理规则和数据验证逻辑。以下为详细说明：

## （一）服务器动作配置

通过`@Action`注解可快速创建服务器动作，以下是配置示例：

```java
@Model.model(TestModel.MODEL_MODEL)
public class Demo {
    @Action(
        displayName = "测试服务器动作",
        contextType = ActionContextTypeEnum.CONTEXT_FREE,
        bindingType = {ViewTypeEnum.TABLE, ViewTypeEnum.CHART}
    )
    public TestModel action(TestModel data) {
        return data;
    }
}
```

关键配置项解析

+ `@Action`**注解**：核心标识，用于将方法定义为服务器动作。
+ `contextType`**（动作上下文类型）**：
  - `SINGLE`：适用于单行数据操作，常见于列表页每行的操作栏或表单页顶部操作区。
  - `BATCH`：针对多行数据处理，通常展示在列表页表格上方的批量操作按钮区。
  - `SINGLE_AND_BATCH`：支持单行与多行混合操作，用于列表页的综合操作场景。
  - `CONTEXT_FREE`：无特定上下文限制，常用于列表页顶部通用操作按钮。
+ `bindingType`**（按钮所在页面类型）**：
  - `TABLE`：列表页，用于展示数据列表及对应操作按钮。
  - `KANBAN`：看板。
  - `FORM`：表单页，适用于数据提交或编辑操作。
  - `DETAIL`：详情页，用于查看或修改单条数据详情。
  - `CALENDAR`**：日历**
  - `GALLERY`**：画廊**
  - `TREE`**：树视图**
  - `CUSTOM`：自定义页面，满足特定业务需求。

## （二）服务器动作校验

在 Oinone 中，数据校验不仅支持在模型或字段层面设置，服务器动作（ServerAction）同样可通过`@Validation`注解添加校验约束。例如：

```java
@Model.model(TestModel.MODEL_MODEL)
public class Demo {
    @Validation(ruleWithTips = {
        @Validation.Rule(value = "!IS_BLANK(data.name)", error = "名称为必填项"),
        @Validation.Rule(value = "LEN(data.name) <= 128", error = "名称过长，不能超过128位")
    })
    @Action(
        displayName = "测试服务器动作",
        contextType = ActionContextTypeEnum.SINGLE,
        bindingType = {ViewTypeEnum.FORM}
    )
    public TestModel action(TestModel data) {
        return data;
    }
}
```

通过内置函数快速实现非空、长度等校验，未通过校验时将按预设提示反馈错误。

## （三）注解配置

@Action

├── displayName 显示名称

├── summary 摘要摘要

├── contextType 动作上下文，可选项详见ActionContextTypeEnum

├── bindingType 所在页面类型，可选项详见ViewTypeEnum

├── Advanced 更多配置

│   ├── name 技术名称，默认Java方法名

│   ├── args 参数，默认java参数

│   ├── type 方法类型，默认UPDATE，可选项详见FunctionTypeEnum

│   ├── language 方法实现语言，默认JAVA，可选项详见FunctionLanguageEnum

│   ├── check Validation校验，默认false

│   ├── invisible 隐藏规则

│   ├── bindingView 绑定特定视图

│   └── priority 展示顺序

# 二、窗口动作 ViewAction

窗口动作在系统中承担着站内页面跳转的重要职责，其路由功能基于模型编码和动作名称来实现。

窗口动作可通过按钮 `UxRouteButton` 或菜单 `UxMenu` 进行定义。

## （一）通过按钮 `UxRouteButton` 定义

以下是使用 `UxRouteButton` 注解定义窗口动作的详细示例：

```java
@UxRouteButton(
    value = @UxRoute(
        model = TestButtonModel.MODEL_MODEL, // 目标模型，明确跳转的目标模型
        viewType = ViewTypeEnum.TABLE, // 目标视图类型，默认为 TABLE
        viewName = ViewConstants.Name.tableView, // 路由的目标视图，为空时则选择对应视图类型且优先级最高的视图
        // 加载函数相关配置
        load = "newQueryPage", // 可手工指定其他函数，如示例中的 newQueryPage
        // domain 作为前端过滤条件，是默认的查询条件，用户可以根据需要去除
        domain = "createDate =ge= '${ADD_DAY(NOW_STR(), -7)}' and createDate =lt= '${NOW_STR()}'", // 前端过滤条件，属于默认查询条件，用户可去除
        // filter 作为后端过滤条件，是一定会加上的，用户无感知
        filter = "name =like= '老'",
        // 上下文传递：数据映射
        context = {},
        title = "test"
    ),
    action = @UxAction(
        name = "customRedirectTablePage", // 名字必须唯一，否则会发生覆盖情况
        label = "自定义跳转到表格页",
        contextType = ActionContextTypeEnum.SINGLE,
        bindingType = ViewTypeEnum.FORM, // 按钮出现在哪些类型的视图上，默认为 TABLE
        bindingView = ViewConstants.Name.formView, // 按钮出现在哪些视图中，为空则选择对应视图类型且优先级最高的视图
        invisible = ExpConstants.idValueNotExist // 隐藏条件，!activeRecord.id 当 id 存在时，隐藏。例如新增页没有 id 隐藏，编辑页面有 id 则不隐藏
    )
)
@Model.model(TestButtonModel.MODEL_MODEL)
@Model(displayName = "TestButtonModel模型")
public class TestButtonModel extends IdModel {
    public static final String MODEL_MODEL = "test.TestButtonModel";

    @Function(openLevel = FunctionOpenEnum.API)
    @Function.Advanced(displayName = "测试load函数",type = {FunctionTypeEnum.QUERY},category = FunctionCategoryEnum.QUERY_PAGE)
    public Pagination<TestButtonModel> newQueryPage(Pagination<TestButtonModel> page, IWrapper<TestButtonModel> queryWrapper) {
        if (null == page) {
            return null;
        }
        System.out.println("测试load函数");
        return new TestButtonModel().queryPage(page,queryWrapper);
    }

}
```

## （二）通过菜单 `UxMenu` 定义

```java
@UxMenus
public class TestMenus implements ViewActionConstants {
    @UxMenu("测试菜单")
    class TestMenu {
        @UxMenu("TestButtonModel")
        @UxRoute(TestButtonModel.MODEL_MODEL)
        class TestButtonModelMenu { }
    }
}
```

## （三）加载函数

加载函数在窗口动作中起着关键作用。当未配置字段映射 DSL 时，直接执行加载函数，其输入和输出参数均为目标模型。系统提供了默认的约定函数，具体如下：

+ 目标视图表单新增：调用 `construct` 接口加载数据，用于初始化新表单的数据。
+ 目标视图表单更新：调用 `queryOne` 接口加载数据，以获取要更新的特定记录。
+ 目标视图表单详情：调用 `queryOne` 接口加载数据，用于显示特定记录的详细信息。
+ 目标视图表格查询：调用 `queryPage` 接口加载数据，可使用 `domain` 和 `limit` 属性设置查询条件和分页数，实现数据的分页查询。

此外，开发者还可根据需求手工指定其他加载函数，以满足定制化的加载需求。例如，在上述示例中，将加载函数指定为 `newQueryPage`。

## （四）数据过滤

数据过滤分为前端过滤（`domain`）和后端过滤（`filter`）。

+ **前端过滤（**`domain`**）**：`domain` 作为前端过滤条件，是默认的查询条件，用户可以根据需要去除。
+ **后端过滤（**`filter`**）**：`filter` 作为后端过滤条件，是一定会加上的，用户无感知。在上述示例中，`filter = "name =like= '老'"` 表示后端会对 `name` 字段进行模糊匹配过滤，且用户无法去除该过滤条件。

:::danger 警告

前端过滤（`domain`）其操作符必须与页面搜索字段定义的操作符一致，否则配置无效。例如，对于 `name` 字符串字段搜索，默认操作符是 `=like=`，若配置成其他操作符则无法生效。

:::

## （五）上下文传递

上下文传递通过数据映射 DSL 实现，主要用于以下两种常见场景：

+ **相同模型间跳转**：默认机制仅会将主键进行传递，若需要使用其他属性数据时，需配置数据映射上下文。
+ **不同模型间跳转**：默认机制会尝试将主键进行传递，但如果主键属性名称不一致的情况下，将无法获取数据。此时，配置数据映射上下文不仅可以解决主键名称不一致的问题，还可以映射不同名称的其他属性进行值传递。

在上述示例中，`context = {}` 表示当前未配置具体的数据映射规则，可根据实际需求进行相应的设置。

通过以上配置、加载函数、数据过滤和上下文传递的详细介绍，开发者可以灵活运用窗口动作实现站内页面的高效跳转和数据交互。

# 三、跳转动作 UrlAction

跳转动作专注于实现外链跳转功能，可引导用户访问外部网页、第三方系统或资源链接，为系统与外部资源的交互提供了便捷通道。跳转动作支持通过按钮`UxLinkButton`和菜单`UxMenu`两种方式定义。

## （一）通过按钮 `UxLinkButton` 定义

使用`UxLinkButton`注解可创建自定义外部链接按钮，示例如下：

```java
@UxLinkButton(
    value = @UxLink(
        // URL支持表达式，可动态拼接参数
        value = "http://www.baidu.com?wd=${activeRecord.name}",
        openType = ActionTargetEnum.OPEN_WINDOW,
        //在 Oinone 里，计算 URL 函数优先级高于value属性，有函数时优先以其返回值作为 URL
        compute = "computeSearchUrl",
        // 通过context 跟value配合则添加额外参数，跟compute配合，则做参数转化
        context = {@Prop(name = "name", value = "activeRecord.name + 'aaa'")}

    ),
    action = @UxAction(
        name = "testComputeSearchUrl", // 动作名称需唯一
        label = "自定义外部链接",
        contextType = ActionContextTypeEnum.SINGLE,
        bindingType = ViewTypeEnum.FORM, // 按钮出现在哪些类型的视图上，默认为 TABLE
        bindingView = ViewConstants.Name.formView, // 按钮出现在哪些视图中，为空则选择对应视图类型且优先级最高的视图
        invisible = ExpConstants.idValueNotExist // 隐藏条件，!activeRecord.id 当 id 存在时，隐藏。例如新增页没有 id 隐藏，编辑页面有 id 则不隐藏
    )
)
@Model.model(TestButtonModel.MODEL_MODEL)
@Model(displayName = "TestButtonModel模型")
public class TestButtonModel extends IdModel {
    public static final String MODEL_MODEL = "test.TestButtonModel";

    // 自定义URL计算函数
    @Function(openLevel = FunctionOpenEnum.API)
    @Function.Advanced(displayName = "计算搜索Url", type = FunctionTypeEnum.QUERY)
    public String computeSearchUrl(TestButtonModel data) {
        System.out.println(data.getName());
        return "https://www.baidu.com/s?wd=" + data.getName();
    }
}
```

:::info 注意

在 Oinone 中，`compute`函数的优先级高于`value`属性。当同时配置两者时，系统将优先采用`compute`函数的返回值作为最终 URL，`value`属性的配置将被忽略。例如在相关示例中，即便定义了`value`属性值，只要存在`compute`函数，最终 URL 将由函数动态生成。

:::

## （二）通过菜单 `UxMenu` 定义

通过`UxMenu`注解可快速创建菜单链接，示例如下：

```java
@UxMenus
public class TestMenus implements ViewActionConstants {
    // 定义名为"Oinone官网"的菜单链接
    @UxMenu("Oinone官网")@UxLink(value = "http://www.oinone.top", openType = ActionTargetEnum.OPEN_WINDOW)
    class SsLink{}
}
```

# 四、客户端动作 ClientAction

客户端动作用于执行前端交互逻辑，可通过`UxClientButton`注解定义触发按钮，配置示例如下：

## （一）ClientAction的定义

```java
@UxClientButton(
    // 关联具体的客户端函数
    value = @UxClient(ClientActionConstants.Import.fun),
    action = @UxAction(
        name = ClientActionConstants.Import.name, // 动作唯一标识
        label = ClientActionConstants.Import.label, // 按钮显示名称
        contextType = ActionContextTypeEnum.CONTEXT_FREE // 无上下文依赖
    )
)
@Model.model(TestButtonModel.MODEL_MODEL)
@Model(displayName = "TestButtonModel模型")
public class TestButtonModel extends IdModel {
    public static final String MODEL_MODEL = "test.TestButtonModel";
}
```

:::tip 举例：示例对应效果

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/BackendAPI/actions-API/1745918302734-37f54d42-f2b1-4390-9779-15325e5dd23b.gif)

:::

客户端动作以当前选中行数据作为方法入参和返回值，适用于页面元素动态渲染、表单验证、弹窗提示等场景，帮助开发者高效实现前端交互功能。

## （二）客户端函数列表

| **函数标识（fun）**               | **功能描述（displayName）** | **界面显示标签（label）** | **详细说明**                       | **上下文类型（ActionContextTypeEnum）**  |
| :-------------------------------- | :-------------------------- | :------------------------ | :--------------------------------- | :--------------------------------------- |
| `$$internal_ValidateForm`         | 表单数据校验                | 校验                      | 用于验证表单输入数据的合法性       | `CONTEXT_FREE`<br/>（无特定上下文依赖）  |
| `$$internal_GotoListTableRouter`  | 返回上一个页面              | 返回                      | 实现页面导航，返回至前一个页面     | `CONTEXT_FREE`                           |
| `$$internal_ReloadData`           | 刷新数据                    | 刷新                      | 重新加载当前页面或表格中的数据     | `CONTEXT_FREE`                           |
| `$$internal_GotoM2MListDialog`    | 打开 M2M 表格的创建弹窗     | 添加                      | 弹出用于创建多对多关系数据的窗口   | `CONTEXT_FREE`                           |
| `$$internal_GotoO2MCreateDialog`  | 打开 O2M 表格的创建弹窗     | 创建                      | 弹出用于创建一对多关系数据的窗口   | `CONTEXT_FREE`                           |
| `$$internal_GotoO2MEditDialog`    | 打开 O2M 表格的编辑弹窗     | 编辑                      | 弹出用于编辑一对多关系数据的窗口   | `SINGLE`<br/>（作用于单行数据）          |
| `$$internal_DeleteOne`            | 删除绑定的表格的选中数据    | 删除                      | 删除表格中选中的单行或多行数据     | `SINGLE_AND_BATCH`<br/>（单 / 多行通用） |
| `$$internal_DialogSubmit`         | 弹窗提交数据                | 确定                      | 提交弹窗内填写的数据并执行相关操作 | `SINGLE_AND_BATCH`                       |
| `$$internal_DialogCancel`         | 关闭弹窗                    | 取消                      | 关闭当前打开的弹窗                 | `CONTEXT_FREE`                           |
| `$$internal_GotoListImportDialog` | 打开导入弹窗                | 导入                      | 弹出用于数据导入操作的窗口         | `CONTEXT_FREE`                           |
| `$$internal_GotoListExportDialog` | 打开导出弹窗                | 导出                      | 弹出用于数据导出操作的窗口         | `SINGLE_AND_BATCH`                       |
| `$$internal_BatchUpdate`          | 批量更新                    | 确定                      | 对选中的多行数据进行批量修改       | `SINGLE`                                 |
| `$$internal_AddOne`               | 添加一行数据                | 插入                      | 在表格或列表中新增一行数据         | `CONTEXT_FREE`                           |
| `$$internal_CopyOne`              | 复制一行数据                | 复制                      | 复制当前选中的单行数据             | `SINGLE`                                 |


**说明**：这些预定义函数适用于常见业务场景，`fun`作为函数唯一标识用于程序调用；`displayName`为功能描述，辅助开发者理解逻辑；`label`是用户界面显示的按钮 / 操作名称；`ActionContextTypeEnum`则明确了函数适用的数据操作范围（如单行、多行或无限制）。



