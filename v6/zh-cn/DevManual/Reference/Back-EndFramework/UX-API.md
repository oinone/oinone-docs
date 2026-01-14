---
title: 交互 API（UX API）
index: true
category:
  - 研发手册
  - Reference
  - 后端API
order: 5

---
# 一、概述

本文档主要介绍 Oinone 中用于配置视觉交互的 Java 注解类。通过这些注解，开发者可以方便地对应用的界面布局、菜单、按钮行为、视图显示等视觉交互相关的功能进行配置。

:::warning 提示

Ux类注解只影响默认展示与交互逻辑。

:::

:::warning 提示

本文档可助您快速掌握核心概念与基础逻辑。除了利用`Ux`注解和`XML`配置以外，也推荐使用设计器辅助开发。设计器能够提供可视化操作界面，简化配置流程、降低编码复杂度，帮助您更高效、精准地完成开发任务 ，显著提升开发效率与质量。

:::

建议先通过家族图谱建立初步认知，在脑海中形成基础概念框架，以便快速判断需求的可行性

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/BackendAPI/UX-API/1745930521148-6df18b41-d756-427b-8b35-05f008bc0ab8.jpeg)

# 二、注解详细说明

## （一）应用相关

### 1、`UxAppLogo`

+ **用途**：用于配置应用的 logo。
+ **作用目标**：`ElementType.TYPE`（类）
+ **属性**：
  - `value`：应用 logo，与`logo`为别名，默认值为空字符串`""`。
  - `logo`：应用 logo，与`value`为别名，默认值为空字符串`""`。
+ **示例**：

```java
@UxAppLogo(logo = "path/to/your/app/logo.png")
public class YourModuleClass {
    // 类内容
}
```

### 2、`UxHomepage`

+ **用途**：配置模块的首页。
+ **作用目标**：`ElementType.TYPE`（类）
+ **属性**：
  - `actionName`：引用的 action 名称，默认值为空字符串`""`，为空跳转到模型的表格页面。
  - `value`：路由配置，类型为`UxRoute`。
+ **示例**：

```java
@UxHomepage(actionName = "homepageAction", value = @UxRoute(model = TestModel.MODEL_MODEL))
public class YourModuleClass {
    // 类内容
}
```

## （二）菜单相关注解

### 1、`UxMenus`

+ **用途**：定义菜单集合。
+ **作用目标**：`ElementType.TYPE`（类）
+ **属性**：
  - `module`：菜单所属模块，默认为当前模块，默认值为空字符串`""`。
  - `basePriority`：菜单起始优先级，默认为 0。

### 2、`UxMenu`

+ **用途**：定义单个菜单。
+ **作用目标**：`ElementType.TYPE`（类）
+ **属性**：
  - `value`：菜单显示名称，与`label`为别名，默认值为空字符串`""`。
  - `label`：菜单显示名称，与`value`为别名，默认值为空字符串`""`。
  - `summary`：菜单的简要描述，默认值为空字符串`""`。
  - `icon`：菜单图标，默认值为空字符串`""`。
  - `clientTypes`：菜单适用的客户端类型，默认值为`{ClientTypeEnum.PC, ClientTypeEnum.MOBILE}`。
+ **示例**：

```java
@UxMenus public class TestModuleMenus implements ViewActionConstants {
    @UxMenu("基础数据")
    class TestModuleBaseMenu {
        @UxMenu("测试菜单") @UxRoute(TestModel.MODEL_MODEL) class TestModelMenu { }
    }
}
```

:::danger 警告

@UxMenu 必须与 @UxRoute、@UxLink、@UxClient 配合使用

:::

## （三）视图相关注解

### 1、`UxDetail`

+ **用途**：配置详情视图。
+ **作用目标**：`ElementType.TYPE`（类）
+ **属性**：
  - `grid`：栅格数量，默认值为`GridConstants.defaultViewGrid`。
  - `group`：默认分组标题，默认值为空字符串`""`。
  - `tabsTable`：是否将所有表格子视图合并为选项卡置于视图底部，默认值为`true`。
  - **内部注解**`FieldWidget`：用于配置字段组件。
    * **作用目标**：`ElementType.FIELD`（字段）
    * **属性**：`value`，类型为`UxWidget`。
+ **示例**：暂无直接使用示例。

### 2、`UxForm`

+ **用途**：配置表单视图。
+ **作用目标**：`ElementType.TYPE`（类）
+ **属性**：
  - `grid`：栅格数量，默认值为`GridConstants.defaultViewGrid`。
  - `group`：默认分组标题，默认值为空字符串`""`。
  - `tabsTable`：是否将所有表格子视图合并为选项卡置于视图底部，默认值为`true`。
  - **内部注解**`FieldWidget`：用于配置字段组件。
    * **作用目标**：`ElementType.FIELD`（字段）
    * **属性**：`value`，类型为`UxWidget`。
  - **内部注解**`RelationSelect`：用于配置关联关系下拉字段组件。
    * **作用目标**：`ElementType.FIELD`（字段）
    * **属性**：`showCreate`，默认值为`true`。
  - **内部注解**`RelationTable`：用于配置关联关系表格字段组件。
    * **作用目标**：`ElementType.FIELD`（字段）
    * **属性**：`showCreate`，默认值为`true`；`showEdit`，默认值为`true`；`showDetail`，默认值为`true`；`showDelete`，默认值为`true`。
+ **示例**：

```java
@Model.model(TestModel.MODEL_MODEL)
@Model(displayName = "TestModel")
@Model.Advanced(unique = {"code"})
public class TestModel extends IdModel {
    public static final String MODEL_MODEL = "test.TestModel";
    @UxForm.FieldWidget(@UxWidget(readonly = "true", hint = "为空时自动生成"))
    @Field.String
    @Field(displayName = "项目编码", unique = true)
    @Field.Sequence(sequence = "SEQ", prefix = "C", size = 5, step = 1, initial = 10000)
    private String code;
    // 其他字段...
}
```

### 3、`UxTable`

+ **用途**：配置表格视图。
+ **作用目标**：`ElementType.TYPE`（类）
+ **属性**：
  - `grid`：栅格数量，默认值为`GridConstants.defaultViewGrid`。
  - `enableSearch`：是否启用搜索功能，默认值为`true`。
  - `enableSequence`：是否开启序号，默认值为`false`。
  - **内部注解**`FieldWidget`：用于配置字段组件。
    * **作用目标**：`ElementType.FIELD`（字段）
    * **属性**：`value`，类型为`UxWidget`。
+ **示例**：暂无直接使用示例。

### 4、`UxTableSearch`

+ **用途**：配置列表搜索。
+ **作用目标**：`ElementType.TYPE`（类）
+ **属性**：
  - `grid`：栅格数量，默认值为`GridConstants.defaultTableSearchGrid`。
  - **内部注解**`FieldWidget`：用于配置字段组件。
    * **作用目标**：`ElementType.FIELD`（字段）
    * **属性**：`value`，类型为`UxWidget`。
+ **示例**：

```java
@Model.model(TestModel.MODEL_MODEL)
@Model(displayName = "TestModel", labelFields = "name")
public class TestModel extends IdModel {
    public static final String MODEL_MODEL = "test.TestModel";

    @UxTableSearch.FieldWidget(@UxWidget())
    @Field(displayName = "名称", required = true)
    private String name;
    // 其他字段...
}
```

### 5、`UxIgnore`

+ **用途**：指定视图忽略该组件。
+ **作用目标**：`ElementType.FIELD`（字段）
+ **属性**：`value`，为`ViewTypeEnum`数组，默认值为空数组`{}`。
+ **示例**：暂无直接使用示例。

### 6、`UxWidget`

+ **用途**：定义自定义组件。
+ **作用目标**：`ElementType.LOCAL_VARIABLE`（局部变量）
+ **属性**：
  - `value`：组件显示名称，与`label`为别名，默认值为空字符串`""`。
  - `label`：组件显示名称，与`value`为别名，默认值为空字符串`""`。
  - `widget`：组件类型，默认值为空字符串`""`。
  - `config`：组件配置参数，类型为`Prop`数组，默认值为空数组`{}`。
  - `mapping`：数据传输映射 DSL，类型为`Prop`数组，默认值为空数组`{}`。
  - `context`：上下文，类型为`Prop`数组，默认值为空数组`{}`。
  - `queryMode`：查询方式，默认值为`QueryModeEnum.DOMAIN`。
  - `span`：块所占栅格，默认值为`GridConstants.defaultBlockViewGrid`。
  - `offset`：栅格左侧的间隔格数，默认值为 0。
  - `placeholder`：占位提示，默认值为空字符串`""`。
  - `hint`：说明提示，默认值为空字符串`""`。
  - `required`：必填表达式，默认值为空字符串`""`。
  - `readonly`：只读表达式，默认值为空字符串`""`。
  - `invisible`：隐藏表达式，默认值为空字符串`""`。
  - `disable`：禁用表达式，默认值为空字符串`""`。
  - `group`：分组，默认值为`CharacterConstants.SEPARATOR_HYPHEN`。
  - `tab`：选项卡页，默认值为`CharacterConstants.SEPARATOR_HYPHEN`。
  - `breakTab`：是否不再融入前序组件的选项卡，默认值为`false`。
  - `priority`：优先级，默认值为`MetaDefaultConstants.FAKE_PRIORITY_VALUE_INT`。
+ **示例**：

```java
@Model.model(TestModel.MODEL_MODEL)
@Model(displayName = "TestModel")
public class TestModel extends IdModel {
    public static final String MODEL_MODEL = "test.TestModel";

    @UxForm.FieldWidget(@UxWidget(config = {@Prop(name = "constructFun",value = "onXxxFiledValueChange")}))
    @Field.Enum
    @Field(displayName = "测试枚举")
    private TestEnum testEnum;
    // 其他字段...
}
```

## （四）按钮相关注解

### 1、`UxClientButton`

+ **用途**：定义链接按钮，关联客户端动作。
+ **作用目标**：`ElementType.TYPE`（类）
+ **属性**：
  - `action`：动作基本配置，类型为`UxAction`。
  - `value`：客户端动作配置，类型为`UxClient`。
  - **内部注解**`UxClientButtons`：用于定义按钮配置列表。
    * **作用目标**：`ElementType.TYPE`（类）
    * **属性**：`value`，为`UxClientButton`数组。
+ **示例**：

```java
@Model.model(TestButtonModel.MODEL_MODEL)
@Model(displayName = "TestButtonModel模型")
@UxClientButton(
        value = @UxClient(ClientActionConstants.TableAddRow.fun),
        action = @UxAction(
                name = ClientActionConstants.TableAddRow.name,
                label = ClientActionConstants.TableAddRow.label,
                contextType = ActionContextTypeEnum.CONTEXT_FREE,
                bindingView = ViewConstants.Name.tableView
        )
)
public class TestButtonModel extends IdModel {
    public static final String MODEL_MODEL="test.TestButtonModel";
    // 其他字段...
}
```

### 2、`UxLinkButton`

+ **用途**：定义链接按钮，关联链接动作。
+ **作用目标**：`ElementType.TYPE`（类）
+ **属性**：
  - `action`：动作基本配置，类型为`UxAction`。
  - `value`：链接动作配置，类型为`UxLink`。
  - **内部注解**`UxLinkButtons`：用于定义按钮配置列表。
    * **作用目标**：`ElementType.TYPE`（类）
    * **属性**：`value`，为`UxLinkButton`数组。
+ **示例**：

```java
@Model.model(TestButtonModel.MODEL_MODEL)
@Model(displayName = "TestButtonModel模型")
@UxLinkButton(
        value =  @UxLink(
                value = "http://www.baidu.com",
                openType= ActionTargetEnum.OPEN_WINDOW
        ),
        action = @UxAction(
                name = "testUrl",
                label = "外部链接",
                contextType = ActionContextTypeEnum.SINGLE,
                bindingType = ViewTypeEnum.FORM,
                bindingView = ViewConstants.Name.formView,
                invisible = ExpConstants.idValueNotExist
        )
)
public class TestButtonModel extends IdModel {
    public static final String MODEL_MODEL="test.TestButtonModel";
    // 其他字段...
}
```

### 3、`UxRouteButton`

+ **用途**：定义跳转按钮，关联窗口动作。
+ **作用目标**：`ElementType.TYPE`（类）
+ **属性**：
  - `action`：动作基本配置，类型为`UxAction`。
  - `value`：窗口动作配置，类型为`UxRoute`。
  - **内部注解**`UxRouteButtons`：用于定义按钮配置列表。
    * **作用目标**：`ElementType.TYPE`（类）
    * **属性**：`value`，为`UxRouteButton`数组。
+ **示例**：

```java
@Model.model(TestButtonModel.MODEL_MODEL)
@Model(displayName = "TestButtonModel模型")
@UxRouteButton(
        value = @UxRoute(
                model = TestButtonModel.MODEL_MODEL,
                viewType = ViewTypeEnum.TABLE,
                viewName = ViewConstants.Name.tableView
        ),
        action = @UxAction(
                name = "customRedirectTablePage",
                label = "自定义跳转到表格页",
                contextType = ActionContextTypeEnum.SINGLE,
                bindingType = ViewTypeEnum.FORM,
                bindingView = ViewConstants.Name.formView,
                invisible = ExpConstants.idValueNotExist
        )
)
public class TestButtonModel extends IdModel {
    public static final String MODEL_MODEL="test.TestButtonModel";
    // 其他字段...
}
```

## （五）动作相关注解

### 1、`UxAction`

+ **用途**：定义动作基本配置。
+ **作用目标**：`ElementType.LOCAL_VARIABLE`（局部变量）
+ **属性**：
  - `name`：动作名称，必填。
  - `displayName`：展示名称，默认值为空字符串`""`。
  - `label`：显示文字，默认值为空字符串`""`。
  - `summary`：描述，默认值为空字符串`""`。
  - `contextType`：上下文类型，默认值为`ActionContextTypeEnum.SINGLE`。
  - `bindingType`：action 绑定在源模型上的哪些视图上，默认值为`{ViewTypeEnum.TABLE}`。
  - `invisible`：客户端显隐表达式，默认值为空字符串`""`。
  - `rule`：服务端过滤表达式，默认值为空字符串`""`。
  - `disable`：禁用规则，默认值为空字符串`""`。
  - `bindingView`：绑定视图名称，设置动作只出现在指定视图，默认值为空字符串`""`。
  - `priority`：优先级，默认值为 99。
  - `props`：扩展属性，类型为`Prop`数组，默认值为空数组`{}`。
+ **示例**：在`UxClientButton`、`UxLinkButton`、`UxRouteButton`的使用示例中均有体现，如：

```java
@UxClientButton(
        value = @UxClient(ClientActionConstants.TableAddRow.fun),
        action = @UxAction(
                name = ClientActionConstants.TableAddRow.name,
                label = ClientActionConstants.TableAddRow.label,
                contextType = ActionContextTypeEnum.CONTEXT_FREE,
                bindingView = ViewConstants.Name.tableView
        )
)
```

### 2、`UxClient`

+ **用途**：定义链接动作，关联客户端函数。
+ **作用目标**：`ElementType.TYPE`（类）
+ **属性**：
  - `value`：客户端函数编码，与`fun`为别名，默认值为空字符串`""`。
  - `fun`：客户端函数编码，与`value`为别名，默认值为空字符串`""`。
  - `model`：链接计算函数模型，默认值为空字符串`""`。
  - `compute`：计算函数编码，默认值为空字符串`""`。
  - `mapping`：数据传输映射 DSL，类型为`Prop`数组，默认值为空数组`{}`。
  - `context`：上下文配置，类型为`Prop`数组，默认值为空数组`{}`。
+ **示例**：

```java
@Model.model(TestButtonModel.MODEL_MODEL)
@Model(displayName = "TestButtonModel模型")
@UxClientButton(
        value = @UxClient(ClientActionConstants.TableAddRow.fun),
        action = @UxAction(
                name = ClientActionConstants.TableAddRow.name,
                label = ClientActionConstants.TableAddRow.label,
                contextType = ActionContextTypeEnum.CONTEXT_FREE,
                bindingView = ViewConstants.Name.tableView
        )
)
public class TestButtonModel extends IdModel {
    public static final String MODEL_MODEL="test.TestButtonModel";
    // 其他字段...
}
```

更多示例讲解参考文档 “Actions API” 中 客户端动作（ClientAction）

### 3、`UxLink`

+ **用途**：定义链接动作，配置链接相关信息。
+ **作用目标**：`ElementType.TYPE`（类）
+ **属性**：
  - `value`：链接表达式，与`url`为别名，默认值为空字符串`""`。
  - `url`：链接表达式，与`value`为别名，默认值为空字符串`""`。
  - `openType`：打开方式，默认值为`ActionTargetEnum.ROUTER`。
  - `model`：链接计算函数模型，默认值为空字符串`""`。
  - `compute`：链接计算函数编码，默认值为空字符串`""`。
  - `mapping`：数据传输映射 DSL，类型为`Prop`数组，默认值为空数组`{}`。
  - `context`：上下文配置，类型为`Prop`数组，默认值为空数组`{}`。
+ **示例**：

```java
@Model.model(TestButtonModel.MODEL_MODEL)
@Model(displayName = "TestButtonModel模型")
@UxLinkButton(
        value =  @UxLink(
                value = "http://www.baidu.com?wd=${activeRecord.name}",
                openType= ActionTargetEnum.OPEN_WINDOW,
                context = {@Prop(name="name",value= "activeRecord.name + 'aaa'")},
                compute="computeSearchUrl"
        ),
        action = @UxAction(
                name = "testComputeSearchUrl",
                label = "自定义外部链接",
                contextType = ActionContextTypeEnum.SINGLE,
                bindingType = ViewTypeEnum.FORM,
                bindingView = ViewConstants.Name.formView,
                invisible = ExpConstants.idValueNotExist
        )
)
public class TestButtonModel extends IdModel {
    public static final String MODEL_MODEL="test.TestButtonModel";
    // 其他字段...
}
```

:::info 注意

+ 通过context 跟value配合则添加额外参数，跟compute配合，则做参数转化
+ URL支持表达式，可动态拼接参数
+ 在 Oinone 里，计算 URL 函数优先级高于value属性，有函数时优先以其返回值作为 URL

:::

更多示例讲解参考文档 “Actions API” 中 跳转动作（UrlAction）

### 3、`UxRoute`

+ **用途**：定义窗口动作，配置窗口跳转相关信息。
+ **作用目标**：`ElementType.TYPE`（类）
+ **属性**：
  - `value`：目标模型编码，与`model`为别名，默认值为空字符串`""`。
  - `model`：目标模型编码，与`value`为别名，默认值为空字符串`""`。
  - `viewName`：指定目标视图，可缺省，使用默认视图，默认值为空字符串`""`。
  - `viewType`：视图类型，默认值为`ViewTypeEnum.TABLE`。
  - `openType`：打开方式，默认值为`ActionTargetEnum.ROUTER`。
  - `module`：目标模块编码，默认值为空字符串`""`。
  - `title`：页面标题，默认值为空字符串`""`。
  - `theme`：主题，默认值为空字符串`""`。
  - `mask`：母版，默认值为空字符串`""`。
  - `views`：支持可供切换的视图类型列表，默认值为空数组`{}`。
  - `load`：数据加载函数编码，默认值为空字符串`""`。
  - `context`：数据传输映射，类型为`Prop`数组，默认值为空数组`{}`。
  - `domain`：数据过滤 - 客户端，默认值为空字符串`""`。
  - `filter`：数据过滤 - 服务端，默认值为空字符串`""`。
  - `limit`：初始化页面数据数量限制，默认值为 20。
+ **示例**：

```java
@Model.model(TestButtonModel.MODEL_MODEL)
@Model(displayName = "TestButtonModel模型")
@UxRouteButton(
        value = @UxRoute(
                model = TestButtonModel.MODEL_MODEL,
                viewType = ViewTypeEnum.TABLE,
                viewName = ViewConstants.Name.tableView,
                load = "newQueryPage",
                domain = "createDate =ge= '${ADD_DAY(NOW_STR(), -7)}' and createDate =lt= '${NOW_STR()}'",
                filter = "name =like= '老'",
                limit = 20,
                context = {},
                title = "test"
        ),
        action = @UxAction(
                name = "customRedirectTablePage",
                label = "自定义跳转到表格页",
                contextType = ActionContextTypeEnum.SINGLE,
                bindingType = ViewTypeEnum.FORM,
                bindingView = ViewConstants.Name.formView,
                invisible = ExpConstants.idValueNotExist
        )
)
public class TestButtonModel extends IdModel {
    public static final String MODEL_MODEL="expenses.TestButtonModel";
    // 其他字段...
}
```

更多示例讲解参考文档 “Actions API” 中 窗口动作（ViewAction）

