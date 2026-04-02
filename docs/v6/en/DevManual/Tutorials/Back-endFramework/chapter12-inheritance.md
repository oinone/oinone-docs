---
title: Chapter 12:Inheritance
index: true
category:
  - Development Manual
  - Tutorials
  - Back-end Framework
order: 12

---
One of Oinone's strengths lies in its modular nature. Each module focuses on specific business needs while enabling interaction between modules, which is crucial for extending existing functionality. For example, in our expense management scenario, we want to display a list of projects managed by an employee directly in the regular user view.

Before diving into Oinone-specific inheritance, let's first explore how to alter the behavior of standard CRUD (Create, Retrieve, Update, Delete) methods.


# I. Function Override

Reference: Related documentation can be found in "[Data Manager](/en/DevManual/Reference/Back-EndFramework/ORM-API.md#2-Data-Manager)".

:::info Objectives: By the end of this section

1. Prevent deleting projects with the status "Enabled".

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-12/info1-1.gif)

2. When creating an expense bill, ensure the total amount of all expense bills does not exceed the project budget.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-12/info1-2.gif)

:::

In our expense management module, we can perform standard CRUD operations without writing specific code, as the Oinone framework provides the necessary tools. Take the API-exposed functions of the `expenses.TestModel` model as an example—we can view these methods in the `base_function` table. Before exploring their origins, let's first understand how to override them:

``` plsql
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

Overriding CRUD functions follows the same approach as adding functions to models in previous chapters. Here's an example of overriding CRUD operations:

``` java
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
     * The construct function is called by the frontend when opening the create page
     */
    @Function.Advanced( displayName = "Initialize Data",type = {FunctionTypeEnum.QUERY})
    @Function(summary = "Data Construction Function", openLevel = {FunctionOpenEnum.LOCAL,FunctionOpenEnum.API, FunctionOpenEnum.REMOTE})
    public TestModel construct(TestModel data) {
        //TODO Add specific business logic here based on requirements
        log.info("doSomething 4 TestModel construct");
        data.construct();
        return data;
    }

    @Transactional(rollbackFor = {Throwable.class})
    @Action.Advanced(name = FunctionConstants.create, type = {FunctionTypeEnum.CREATE}, managed = true, invisible = ExpConstants.idValueExist, check = true)
    @Action( displayName = "Create", label = "Confirm", summary = "Add", bindingType = {ViewTypeEnum.FORM})
    @Function(name = FunctionConstants.create)
    @Function.fun(FunctionConstants.create)
    public TestModel create(TestModel data) {
        if (null == data) {
            return null;
        }
        //TODO Add business validation here
        log.info("doSomething 4 TestModel create");
        data.create();
        data.fieldSave(TestModel::getPartners);
        return data;
    }


    @Transactional(rollbackFor = Throwable.class)
    @Action.Advanced(name = FunctionConstants.delete, type = FunctionTypeEnum.DELETE, managed = true, priority = 66)
    @Action(displayName = "Delete", label = "Delete", contextType = ActionContextTypeEnum.SINGLE_AND_BATCH)
    @Function(name = FunctionConstants.delete)
    @Function.fun(FunctionConstants.deleteWithFieldBatch)
    public List<TestModel> delete(List<TestModel> dataList) {
        if (CollectionUtils.isEmpty(dataList)) {
            return dataList;
        }
        //TODO Add deletion validation here
        log.info("doSomething 4 TestModel delete");
        new TestModel().deleteByPks(dataList);
        new TestModel().listRelationDelete(dataList,TestModel::getPartners);
        return dataList;
    }

    @Transactional(rollbackFor = {Throwable.class} )
    @Action.Advanced(name = FunctionConstants.update,type = {FunctionTypeEnum.UPDATE},managed = true, invisible = ExpConstants.idValueNotExist, check = true)
    @Action(displayName = "Update",label = "Confirm",summary = "Modify",bindingType = {ViewTypeEnum.FORM})
    @Function(name = FunctionConstants.update)
    @Function.fun(FunctionConstants.update)
    public TestModel update(TestModel data) {
        if (null == data) {
            return null;
        }
        //TODO Add update logic here
        log.info("doSomething 4 TestModel update");
        data.updateById();
        data.fieldSaveOnCascade(TestModel::getPartners);
        return data;
    }

    /**
     * Called by the frontend when searching in a table view
     */
    @Function.Advanced(displayName = "Query paginated records by conditions",type = {FunctionTypeEnum.QUERY},category = FunctionCategoryEnum.QUERY_PAGE)
    @Function.fun(FunctionConstants.queryPage)
    @Function(openLevel = {FunctionOpenEnum.LOCAL, FunctionOpenEnum.REMOTE, FunctionOpenEnum.API})
    public Pagination<TestModel> queryPage(Pagination<TestModel> page, IWrapper<TestModel> queryWrapper) {
        if (null == page) {
            return null;
        }
        //TODO Add query modifications here
        log.info("doSomething 4 TestModel queryPage");
        return new TestModel().queryPage(page,queryWrapper);
    }

    @Function.Advanced(displayName = "Query a single record", type = {FunctionTypeEnum.QUERY}, category = FunctionCategoryEnum.QUERY_ONE)
    @Function.fun(FunctionConstants.queryByEntity)
    @Function(openLevel = {FunctionOpenEnum.LOCAL, FunctionOpenEnum.REMOTE, FunctionOpenEnum.API})
    public TestModel queryOne(TestModel query) {
        if (null == query) {
            return null;
        }
        //TODO Add query logic here
        log.info("doSomething 4 TestModel queryOne");
        return query.queryOne();
    }
}
```

> **Exercise**
>
> Add business logic to CRUD methods:
>
> 1. Prevent deleting projects with the status "Enabled".
> 2. Throw an error when creating an expense bill if the total amount exceeds the project budget.



# II. Model Inheritance

Reference: Related documentation can be found in "[Inheritance and Extension](/en/DevManual/Reference/Back-EndFramework/ORM-API.md#IV-Model-Inheritance)".

The ability to perform standard CRUD operations in our expense management module without writing specific code, along with default inherited fields and override capabilities, stems from Oinone's metadata design following object-oriented principles. In Oinone, models serve as the carrier for data and behavior, similar to objects in Java.

From Oinone's abstract model inheritance hierarchy, we can see that the `base.IdModel` inherited in this tutorial has its own parent classes. The CRUD operations and inherited fields in our expense management models originate from these abstract models. Notably, the fields of abstract models are defined in Java classes, while the CRUD functions are implemented in separate classes—e.g., `base.BaseModel`'s `construct` and `create` functions are defined in `ConstructManager` and `DefaultWriteWithFieldApi` respectively.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-12/inheritance.jpeg)

> **Exercise**
>
> Identify all functions of the `expenses.ProjectInfo` model and analyze which classes they are defined in and which model they inherit from.



In the next chapter, we will learn how to interact with other modules.