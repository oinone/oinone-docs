---
title: 章节 6：基础视图（Basic Views）
index: true
category:
  - 研发手册
  - 教程
  - 后端框架
order: 6

---
在上一章我们了解到，Oinone 能够为给定模型生成默认视图。但在实际的业务应用中，默认视图往往无法满足需求。因此，我们至少需要以一种符合逻辑的方式对各个字段进行组织。

视图可在 XML 文件中定义的，它们是 `base.view` 模型的实例。在我们的费用管理模块里，需要对字段进行合理的逻辑组织，具体要求如下：

+ 在表格视图中，不展示项目详情，顺序也进行调整。
+ 在表格的搜索中，能够基于更多字段进行搜索。具体来说，要提供一个筛选 “项目可见性” 的过滤器，以及编码从包含过滤变成全匹配过滤。
+ 在表单视图中，对字段进行分组展示。

# 一、表格视图

参考：与此主题相关的文档可在 “[表格视图](/zh-cn/DevManual/Reference/UserInterface/view-architectures.md)” 中找到。

:::info 目标：在本节结束时，表格视图应呈现如下效果：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-6/bg.png)

:::

表格视图，以表格形式展示记录。其根元素为 `<view>` 并且 `type="TABLE"`。最基本的表格视图会列出表格中要显示的所有字段（每个字段对应一列），示例如下：

```xml
<view name="tableView1" type="TABLE" cols="2" model="expenses.TestModel" enableSequence="false">
  <template slot="actions" autoFill="true"/>
  <template slot="rowActions" autoFill="true"/>
  <template slot="fields">
    <field span="1" invisible="true" priority="5" data="id" label="ID" readonly="true"/>
    <field span="1" priority="101" data="name" label="名称"/>
    <field span="1" priority="102" data="date" label="日期字段"/>
    <field span="1" priority="103" data="code" label="编码"/>
    <field span="1" priority="104" data="testEnum" label="测试枚举">
      <options>
        <option name="enum1" displayName="枚举1" value="enum1" state="ACTIVE"/>
        <option name="enum2" displayName="枚举2" value="enum1" state="ACTIVE"/>
      </options>
    </field>
    <field span="1" priority="200" data="createDate" label="创建时间" readonly="true"/>
    <field span="1" priority="210" data="writeDate" label="更新时间" readonly="true"/>
    <field span="1" priority="220" data="createUid" label="创建人ID"/>
    <field span="1" priority="230" data="writeUid" label="更新人ID"/>
  </template>
  <template slot="search" cols="4">
    <field span="1" offset="0" priority="101" data="name" label="名称" queryMode="DOMAIN" operator="=="/>
  </template>
</view>
```

在搜索字段定义中，添加 `operator=X` 选项，其中 `X` 可以接受一个支持的[RSQL](/zh-cn/DevManual/Reference/Back-EndFramework/AdvanceAPI/protocol-API.md#1、rsql-基础概念)的操作符，字符串默认为"=like="，"=="表示全匹配过滤。

任何模型只要有访问路径则可以在数据库中找到一个简单示例，即该模型对应的默认视图。

```sql
mysql> use trutorials_base;
Database changed
mysql> select template from base_view where model='expenses.TestModel' and name ='tableView' and type='TABLE' and is_deleted = 0;
```

可以在这基础上做修改以达到预期目标的交互形态

修改完的XML文件 `test_model_table.xml`  放在 `trutorials-expenses-core` 工程的`src/main/resource/pamirs/views/expenses/template` 目录下

:::danger 警告：对可能产生的严重后果的提醒

在本章中，你可能会进行一些复制粘贴操作，在此过程中，请务必保证同一模型下每个视图的 `name` 属性值都是唯一的。例如，若未修改 `name` 属性值，你直接替换了 `expenses.TestModel` 模型的默认表格视图 `tableView`，那么后续编写视图时将缺少参考依据。因此，示例中把 `name` 属性值修改为 `tableView1`。

在前面的章节中我们提到过，默认视图的优先级为 88，自定义视图的优先级默认是 77，并且优先级数值越小，视图越优先显示。你也可以通过 `<view priority="77">` 这样的方式来手动指定视图优先级。当菜单对应的 `ViewAction` 未指定具体视图时，依据优先级规则，我们就能看到新配置的视图。

:::

> **练习（Exercise）**
>
> 添加自定义表格视图：
>
> 在合适的 XML 文件中为 `expenses.ProjectInfo` 模型定义一个表格视图。参考本节目标确定要显示的字段，以及在表格搜索时编码从包含过滤变成全匹配过滤

和往常一样，你需要重启服务器并刷新浏览器来查看结果。

# 二、表单视图

参考：与此主题相关的文档可在 “[表单视图](/zh-cn/DevManual/Reference/UserInterface/view-architectures.md)” 中找到。

:::info 目标：在本节结束时，表单视图应呈现如下效果：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-6/bd.gif)

:::

表单视图用于创建和编辑单条记录。其根元素为 `<view>` 并且 `type="FORM"`，由高级结构元素（组和标签）和交互元素（按钮和字段）组成，示例如下：

```xml
<view name="formView1" type="FORM" cols="2" model="expenses.TestModel">
    <template slot="actions" autoFill="true"/>
    <template slot="fields">
        <pack widget="group" title="基础信息">
            <field span="1" invisible="true" priority="5" data="id" label="ID" readonly="true"/>
            <field span="1" offset="0" priority="101" data="name" label="名称" defaultValue="Ux配置的默认值" queryMode="DOMAIN"/>
            <field span="1" offset="0" priority="103" data="code" label="编码" hint="为空时自动生成" readonly="true" queryMode="DOMAIN"/>
        </pack>
        <pack widget="group" title="时间相关">
            <field span="1" priority="102" data="date" label="日期字段"/>
        </pack>
        <pack widget="tabs">
            <pack widget="group" title="枚举相关" cols="1">
                <field span="1" priority="104" data="testEnum" label="测试枚举">
                    <options>
                        <option name="enum1" displayName="枚举1" value="enum1" state="ACTIVE"/>
                        <option name="enum2" displayName="枚举2" value="enum1" state="ACTIVE"/>
                    </options>
                </field>
            </pack>
        </pack>
    </template>
</view>
```

任何模型只要有访问路径则可以在数据库中找到一个简单示例，即该模型对应的默认视图。

```sql
mysql> select template from base_view where model='expenses.TestModel' and name ='formView' and type='FORM' and is_deleted = 0;
```

可以在这基础上做修改以达到预期目标的交互形态

修改完的XML文件 `test_model_form.xml`  放在 `trutorials-expenses-core` 工程的`src/main/resource/pamirs/views/expenses/template` 目录下

:::danger 警告：对可能产生的严重后果的提醒

在本章中，你可能会进行一些复制粘贴操作，在此过程中，请务必保证同一模型下每个视图的 `name` 属性值都是唯一的。否则替换了默认视图，那么后续编写视图时将缺少参考依据。

若不小心替换了默认视图，无需担心，只需修改自定义视图的`name`属性值，默认视图便会自动恢复。

:::

> **练习（Exercise）**
>
> 添加自定义表单视图：
>
> 在合适的 XML 文件中为 `expenses.ProjectInfo` 模型定义一个表单视图。参考本节目标确定要显示的字段。

重启服务器并刷新浏览器来查看结果。

# 三、详情视图

详情视图用于查看单条记录。其根元素为 `<view>` 并且 `type="DETAIL"`，由高级结构元素（组和标签）和交互元素（按钮和字段）组成。与表单视图类似，同样任何模型只要有访问路径则可以在数据库中找到一个简单示例，即该模型对应的默认视图。

```sql
mysql> select template from base_view where model='expenses.TestModel' and name ='detailView' and type='DETAIL' and is_deleted = 0;
```

可以在这基础上做修改以达到预期目标的交互形态。

修改完的XML文件 `test_model_detail.xml`  放在 `trutorials-expenses-core` 工程的`src/main/resource/pamirs/views/expenses/template` 目录下

> **练习（Exercise）**
>
> 添加自定义详情视图：
>
> 在合适的 XML 文件中为 `expenses.ProjectInfo` 模型定义一个详情视图。自由发挥

重启服务器并刷新浏览器来查看结果。



看起来不错吧？到目前为止，我们已经能够创建模型并设计出符合业务逻辑的用户界面。然而，还缺少一个关键组件：模型之间的关联。

:::warning 提示：

除了利用`Ux`注解和`XML`配置以外，也推荐使用设计器辅助开发。设计器开发的`XML`视图可以从数据库记录复制到工程代码中，随模块启动时加载。也可以利用`apps`模块的导入导出功能进行分发。

:::

