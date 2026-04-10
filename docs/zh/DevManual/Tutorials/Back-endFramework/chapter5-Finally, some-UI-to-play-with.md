---
title: 章节 5：界面实操（Finally, Some UI To Play With）
index: true
category:
  - 研发手册
  - 教程
  - 后端框架
order: 5

---
既然我们已经创建了新模型、访问入口及其相应的访问权限，也体验了与用户界面进行交互。不难发现只要模型配置菜单入口，则Oinone系统会为其提供一份默认的交互页面。

:::info 目标：在本节结束时：

项目编码字段应该是只读的，人员投入规模应该有默认值。此外，在表格视图，搜索条件只出现项目编码、项目名称、所属年份、是否为重点项目。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-5/interaction.gif)

:::

到目前为止，我们在费用管理中只使用了通用视图，但在大多数情况下，我们希望对视图进行微调。在 Oinone 中有很多可以微调的地方，但通常第一步是要确保：

+ 一些字段有默认值
+ 一些字段是只读的
+ 一些字段出现在搜索中

在我们的费用管理场景中，我们希望如下：

+ Code应该是只读的（稍后会自动填充）
+ 搜索中可以出现：项目编码、项目名称、所属年份、是否为重点项目
+ 人员投入规模的默认数量应该是 1

# 一、字段一些新属性
在进一步进行视图设计之前，让我们回到我们的模型定义。我们看到一些属性，例如 `required=true`，会影响交互时字段必填属性。其他属性将影响视图或提供默认值。

## （一）默认值
任何字段都可以给定一个默认值。在字段定义中，添加 `defaultValue=X` 选项，其中 `X` 可以接受一个 JAVA 字面值（布尔值、整数、浮点数、字符串），其他需求可以使用函数：

``` python
@Field(displayName = "名称", required = true, defaultValue = "Unknown")
private String name;

@Field(displayName = "日期字段", required = true,defaultValue = "${NOW()}")
@Field.Date(type = DateTypeEnum.DATE,format = DateFormatEnum.DATE)
private Date date;
```

字段的 `defaultValue` 属性仅在后端起作用，不会体现在默认视图的 XML 文件里。与之形成对比的是，后续要介绍的 UX 属性可用于构建默认视图。

后端默认值之所以能够生效，是因为在前端页面加载时，系统会调用该模型的 `construct` 方法。在这个方法里，会计算字段的默认值并返回给前端。不过，当前端发起请求，且提交的字段已有值时，`construct` 方法会忽略 `defaultValue` 属性。这就表明，前端 XML 的配置优先级高于后端字段属性配置。

## （二）字段编码生成器
``` python
@Field.String
@Field(displayName = "编码", unique = true)
@Field.Sequence(sequence = "SEQ", prefix = "C", size = 5, step = 1, initial = 10000)
private String code;
```

code 字段设置为唯一健（关于约束的更多信息，参考教程：[Constraints 约束](/zh/DevManual/Tutorials/Back-endFramework/chapter10-constraints.md)），其值为空时按规则自动生成，示例中`sequence` 设置为`SEQ` 表示规则为自增流水号，`prefix`即为编码前缀设置为以`C` 开头，`size` 即为流水号长度为5（仅流水号的有效长度），`step` 即为步长设置为1（流水号有效步长），`initial` 即为编码的流水号起始值为10000

# 二、UX属性
参考：与此主题相关的文档可在 “[UX API](/zh/DevManual/Reference/Back-EndFramework/UX-API.md)” 中找到。

在Oinone后端框架中模型以及字段，与交互相关的快捷属性比较有限，但Oinone为交互提供了一套完整的UX注解，可以完整的描述前端交互与展示逻辑。

:::warning 提示：属性生效的优先级

在Oinone中：视图XML的属性>UX注解的属性>字段的属性。

1. 所有字段与交互相关的属性，都可以用UX注解的属性覆盖
2. UX注解的属性只影响默认视图XML的生成，自定义视图的属性为空时不会自动补充。
3. 视图XML可以定义一切UX交互的属性，最终运行以XML为准

:::

``` python
@UxTableSearch.FieldWidget(@UxWidget())
@UxForm.FieldWidget(@UxWidget(config = {
        @Prop(name = "defaultValue", value = "Ux默认值优先于Unknown，但不支持函数")}))
@Field(displayName = "名称", required = true, defaultValue = "Unknown")
private String name;

@UxForm.FieldWidget(@UxWidget(readonly = "true", hint = "为空时自动生成"))
@Field.String
@Field(displayName = "编码", unique = true)
@Field.Sequence(sequence = "SEQ", prefix = "C", size = 5, step = 1, initial = 10000)
private String code;

```

可以使用@Ux系列注解来配置前端的默认视觉与交互规则，也可以在XML文件中覆盖以下配置。

+ `@UxTableSearch.FieldWidget(@UxWidget())` 用于指示相关字段在表格视图的搜索功能中呈现的规则。当模型中的所有字段均未进行特定配置时，表格视图搜索将展示全部字段；而一旦有任意一个字段完成配置，搜索区域仅会显示已配置的字段 。
+ @UxForm.FieldWidget(@UxWidget())，用于表单视图中字段的交互呈现规则	
    - widget：展示组件，未指定时会根据当前字段类型选择对应的默认组件
    - readonly：只读设置，默认为false
    - hint：字段提示语
    - config：通过@Prop给组件传递所有属性，支持多值。

:::warning 提示：默认值计算

除了通过@Prop给组件传递defaultValue属性，还可以通过[compute](/zh/DevManual/Tutorials/Back-endFramework/chapter8-field-interlinkage.md#5e26ad4e)属性来应对更为复杂的场景。

:::

> 练习（Exercise）
>
> + 为现有字段设置Ux属性。
>     - 将name设置为：支持搜索
>     - 将code设置为：支持搜索、只读，并且配置编码生成器规则
>     - 将projectYear设置为：支持搜索
>     - 将isKeyProject设置为：支持搜索
>     - 将staffSize设置为：配置默认值为1
>


现在，由于有了默认视图，我们能够与用户界面进行交互了，下一步很明显：我们想要定义我们自己的视图。


