---
title: 章节 12：继承（Inheritance）
index: true
category:
  - 研发手册
  - 教程
  - 后端框架
order: 12

---
Oinone 的一个强大之处在于其模块化特性。每个模块都专注于满足特定的业务需求，同时，模块之间还能够相互交互。这对于扩展现有模块的功能非常有用。例如，在我们的费用管理场景中，我们希望能够在普通用户视图中直接显示某个员工负责的项目列表。

但在深入探讨 Oinone 特定的继承之前，让我们先来看看如何改变标准的 CRUD（创建、检索、更新或删除）方法的行为。

# 一、函数的重写

参考：与此主题相关的文档可在 “[数据管理器](/zh-cn/DevManual/Reference/Back-EndFramework/ORM-API.md#2、数据管理器)” 中找到。

:::info 目标：在本节结束时

1. 对于状态如果是 “已启用” 的项目，不允许将其删除。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-12/info1-1.gif)

2. 当创建一个报销时，要检查所有报销单的金额总和不得大于预算”。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-12/info1-2.gif)

:::

在我们的费用管理模块中，我们无需开发任何特定的代码就能执行标准的 CRUD 操作。Oinone 框架提供了执行这些操作所需的工具。以`expenses.TestModel`模型中面向 API 开放的函数为例，我们可以看到这些方法定义的所在Java类。我们能够在`base_function`表中，清晰查看到这些方法的具体定义 。先别急着探究这些方法源自何处，待我们讲解到模型的继承部分时，关于这些方法的来龙去脉自然就会清晰明了。

```plsql
mysql> use trutorials_base;
Database changed
mysql> select name,fun,bean_name from base_function where namespace ='expenses.TestModel'and open_level&8=8;
+------------------------+------------------------+--------------------------+
| name                   | fun                    | bean_name                |
+------------------------+------------------------+--------------------------+
| construct              | construct              | constructManager         |
| count                  | count                  | defaultReadApi           |
| countByWrapper         | countByWrapper         | defaultReadApi           |
| create                 | create                 | defaultWriteWithFieldApi |
| delete                 | deleteWithFieldBatch   | defaultWriteWithFieldApi |
| queryOne               | queryByEntity          | defaultReadApi           |
| queryByPk              | queryByPk              | defaultReadApi           |
| queryOneByWrapper      | queryByWrapper         | defaultReadApi           |
| queryListByEntity      | queryListByEntity      | defaultReadApi           |
| queryListByWrapper     | queryListByWrapper     | defaultReadApi           |
| queryPage              | queryPage              | defaultReadApi           |
| relationQueryPage      | relationQueryPage      | defaultReadApi           |
| update                 | update                 | defaultWriteWithFieldApi |
| updateOneWithRelations | updateOneWithRelations | defaultWriteApi          |
| updateWithFieldBatch   | updateWithFieldBatch   | defaultWriteWithFieldApi |
+------------------------+------------------------+--------------------------+
15 rows in set (0.00 sec)
```

重写 CRUD 函数的方式，与我们在前述章节中为模型添加函数的思路是一脉相承的。就如同在之前的实践里，我们基于业务需求对模型功能进行拓展那样，重写 CRUD 函数也是通过类似的操作逻辑来实现对数据操作行为的自定义。具体而言，如：

```java
package pro.shushi.oinone.trutorials.expenses.core.action;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import pro.shushi.oinone.trutorials.expenses.api.model.TestModel;
import pro.shushi.pamirs.meta.annotation.Action;
import pro.shushi.pamirs.meta.annotation.Function;
import pro.shushi.pamirs.meta.annotation.Model;
import pro.shushi.pamirs.meta.annotation.fun.extern.Slf4j;
import pro.shushi.pamirs.meta.api.dto.condition.Pagination;
import pro.shushi.pamirs.meta.api.dto.wrapper.IWrapper;
import pro.shushi.pamirs.meta.constant.ExpConstants;
import pro.shushi.pamirs.meta.constant.FunctionConstants;
import pro.shushi.pamirs.meta.enmu.*;

import java.util.List;

@Model.model(TestModel.MODEL_MODEL)
@Component
@Slf4j
public class TestModelAction {

    /**
     * 在打开新增页面的时候，前端默认会调用给定模型的 construct
     */
    @Function.Advanced( displayName = "初始化数据",type = {FunctionTypeEnum.QUERY})
    @Function(summary = "数据构造函数", openLevel = {FunctionOpenEnum.LOCAL,FunctionOpenEnum.API, FunctionOpenEnum.REMOTE})
    public TestModel construct(TestModel data) {
        //TODO doSomething, 在此基础上可额外追加特定业务逻辑，以便依据实际业务需求。
        log.info("doSomething 4 TestModel construct");
        data.construct();
        return data;
    }

    @Transactional(rollbackFor = {Throwable.class})
    @Action.Advanced(name = FunctionConstants.create, type = {FunctionTypeEnum.CREATE}, managed = true, invisible = ExpConstants.idValueExist, check = true)
    @Action( displayName = "创建", label = "确定", summary = "添加", bindingType = {ViewTypeEnum.FORM})
    @Function(name = FunctionConstants.create)
    @Function.fun(FunctionConstants.create)
    public TestModel create(TestModel data) {
        if (null == data) {
            return null;
        }
        //TODO doSomething, 在此基础上可额外追加特定业务逻辑，以便依据实际业务需求。
        log.info("doSomething 4 TestModel create");
        //仅执行自身的创建操作，不涉及对关联字段依据创建策略进行的自动处理 。
        data.create();
        //再保存one2many,many2many的关系字段
        data.fieldSave(TestModel::getPartners);
        return data;
    }


    @Transactional(rollbackFor = Throwable.class)
    @Action.Advanced(name = FunctionConstants.delete, type = FunctionTypeEnum.DELETE, managed = true, priority = 66)
    @Action(displayName = "删除", label = "删除", contextType = ActionContextTypeEnum.SINGLE_AND_BATCH)
    @Function(name = FunctionConstants.delete)
    @Function.fun(FunctionConstants.deleteWithFieldBatch)
    public List<TestModel> delete(List<TestModel> dataList) {
        if (CollectionUtils.isEmpty(dataList)) {
            return dataList;
        }
        //TODO doSomething, 在此基础上可额外追加特定业务逻辑，以便依据实际业务需求，对删除操作前后的相关数据或流程进行自定义管控，从而实现更为灵活且贴合业务场景的功能设置 。
        log.info("doSomething 4 TestModel delete");
        //仅执行自身的删除操作，不涉及对关联字段依据删除策略进行的自动处理 。
        new TestModel().deleteByPks(dataList);
        new TestModel().listRelationDelete(dataList,TestModel::getPartners);
        return dataList;
    }

    @Transactional(rollbackFor = {Throwable.class} )
    @Action.Advanced(name = FunctionConstants.update,type = {FunctionTypeEnum.UPDATE},managed = true, invisible = ExpConstants.idValueNotExist, check = true)
    @Action(displayName = "更新",label = "确定",summary = "修改",bindingType = {ViewTypeEnum.FORM})
    @Function(name = FunctionConstants.update)
    @Function.fun(FunctionConstants.update)
    public TestModel update(TestModel data) {
        if (null == data) {
            return null;
        }
        //TODO doSomething, 在此基础上可额外追加特定业务逻辑，以便依据实际业务需求。
        log.info("doSomething 4 TestModel update");
        //仅执行自身的更新操作，不涉及对关联字段依据更新策略进行的自动处理 。
        data.updateById();
        //saveOnCascade 新增或更新关联关系字段（全量），并按照字段级联策略处理旧记录的关系数据（如：删除、SET_NULL），使用fieldSave方法需要自行处理关系差量如：删除与旧记录的关联
        data.fieldSaveOnCascade(TestModel::getPartners);
        return data;
    }

    /**
     * 在表格视图在点击搜索时，前端默认会调用给定模型的 queryPage
     */
    @Function.Advanced(displayName = "根据条件分页查询记录列表和总数",type = {FunctionTypeEnum.QUERY},category = FunctionCategoryEnum.QUERY_PAGE)
    @Function.fun(FunctionConstants.queryPage)
    @Function(openLevel = {FunctionOpenEnum.LOCAL, FunctionOpenEnum.REMOTE, FunctionOpenEnum.API})
    public Pagination<TestModel> queryPage(Pagination<TestModel> page, IWrapper<TestModel> queryWrapper) {
        if (null == page) {
            return null;
        }
        //TODO doSomething, 在此基础上可额外追加特定业务逻辑，以便依据实际业务需求。
        log.info("doSomething 4 TestModel queryPage");
        return new TestModel().queryPage(page,queryWrapper);
    }

    @Function.Advanced(displayName = "查询单条记录", type = {FunctionTypeEnum.QUERY}, category = FunctionCategoryEnum.QUERY_ONE)
    @Function.fun(FunctionConstants.queryByEntity)
    @Function(openLevel = {FunctionOpenEnum.LOCAL, FunctionOpenEnum.REMOTE, FunctionOpenEnum.API})
    public TestModel queryOne(TestModel query) {
        if (null == query) {
            return null;
        }
        //TODO doSomething, 在此基础上可额外追加特定业务逻辑，以便依据实际业务需求。
        log.info("doSomething 4 TestModel queryOne");
        return query.queryOne();
    }
}
```

> **练习（Exercise）**
>
> 为 CRUD 方法添加业务逻辑：
>
> 1. 如果项目的状态是 “已启用”，则阻止删除该项目。
> 2. 在创建报销单时，当所有报销单的金额总和大于项目的预算项，则抛出一个错误。



# 二、模型的继承

参考：与本主题相关的文档可以在 “[继承与扩展](/zh-cn/DevManual/Reference/Back-EndFramework/ORM-API.md#四、模型继承)” 中找到。

在我们的费用管理模块中，之所以无需编写任何特定代码，即可执行标准的 CRUD 操作，以及有一些默认的继承字段，同时可以重写覆盖。这得益于 Oinone 的元数据设计完全符合面向对象特征。在Java语言设计中，万物皆对象，一切都以对象为基础。而Oinone的元数据设计则是以模型为出发点，作为数据和行为的承载体。

从Oinone抽象模型继承族谱上，可以看到我们教程中继承的base.IdModel，同样也有自己的父类。我们会发现费用管理模块中的模型一些CRUD 操作，以及继承字段，就是源于这些抽象模型。同时，这些抽象模型的字段和模型是定义在一个Java类中，而支撑CRUD 操作的函数，则定义在独立的Java类中。如：base.BaseModel的construct函数和create函数分别定义在两个Java类中：ConstructManager和DefaultWriteWithFieldApi。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-12/inheritance.jpeg)

> **练习（Exercise）**
>
> 找出expenses.ProjectInfo模型的所有函数，并分析它们分别定义在哪些类，是从哪个模型中继承而来



在下一章中，我们将学习如何与其他模块进行交互。



#