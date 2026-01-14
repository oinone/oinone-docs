---
title: Tree
index: true
category:
  - DevManual
  - Reference
  - User interface
  - View architectures
order: 5
next:
  text: UI icons
  link: /en/DevManual/Reference/UserInterface/UI-icons.md
---
# I. View Features

+ View Type: Tree View (TREE)
+ Data Type: Tree
+ DSL Features: Only describes tree hierarchy information.
+ General Behaviors of Data Structure:
  - Query Behaviors: One-time Loading, Lazy Loading by Hierarchy, Search.
  - Interaction Behaviors: Single Selection, Multiple Selection.
+ Tree Component Behaviors:
  - Interaction Behaviors: Expand View, etc.
+ Common Interfaces: (`base.UiTreeNode`)
  - fetchAll: One-time Loading. (`queryListByWrapper`)
  - fetchChildren: Lazy Loading by Hierarchy. (`queryPage`)
  - queryKeywords4Tree: Search. (`queryListByWrapper`)
  - queryKeywords4InnerSelfTree: Search for cascading components in a single card. (`queryListByWrapper`)
  - reverselyQuery: Data Population for Field Components. (`queryListByWrapper`)
  - reverselyQueryWithSize: Data Population for Cascading Field Components. (`queryListByWrapper`)
  - fetchExpandEndLevel: Query to expand to the specified level during initial loading. (`queryListByWrapper`)

:::warning Note

All tree query interfaces will call the data manager function corresponding to the model, and the query results can be modified by means of overriding.

:::

# II. DSL Structure

A simplified view can be as follows: (a self-referential tree with only one level of node configuration)

```xml
<view model="business.PamirsDepartment" type="tree" name="demo_tree_view">
  <template slot="actionBar">
    <action name="redirectCreatePage" label="Create" />
  </template>
  <template slot="tree">
    <nodes>
      <node label="activeRecord.name" model="business.PamirsDepartment" selfReferences="parent" />
    </nodes>
    <template slot="rowActions">
      <action name="redirectUpdatePage" label="Edit" />
      <action name="delete" label="Delete" />
    </template>
  </template>
</view>
```

Overall, a tree view includes header actions and inline actions. The `nodes` node is used to declare the collection of node configurations for the tree structure, and the `node` node represents the configuration for each level of nodes. It is worth mentioning that inline actions will be rendered and displayed behind each node at this time.

## (I) Design Principles

Before learning and understanding the DSL node configuration, let's first look at the characteristics of a tree based on model metadata.

### 1. Tree Data Structure
In short, a tree structure is a set of elements with hierarchical relationships. Each item in the set is called a node, and there are parent-child and sibling relationships between nodes.

For example, a tree represented in JSON structure can be as follows:

```json
[
    {
        "key": "1",
        "value": "1",
        "isLeaf": true
    },
    {
        "key": "2",
        "value": "2",
        "isLeaf": false,
        "children": [
            {
                "key": "2-1",
                "value": "2-1",
                "isLeaf": true
            }
        ]
    }
]
```

In this JSON, there are three nodes. The `children` attribute represents the collection of child nodes, and nodes without child nodes are marked as leaf nodes using the `isLeaf` attribute.

:::warning Note

For more information about tree data structures, please refer to:

+ [Tree Data Structure - Baidu Encyclopedia](https://baike.baidu.com/item/%E6%A0%91%E5%BD%A2%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84/21506701)

:::

### 2. Design of Tree Data Structure in Relational Databases
Taking the MySQL database as an example, a table usually designed to represent a tree structure may look like this:

| **Field**    | **Type**     | **Description**       |
| ----------- | ------------ | ---------------------- |
| code        | varchar(128) | Code (Unique Key) |
| name        | varchar(128) | Name           |
| parent_code | varchar(128) | Parent Code     |


From this, we can derive a type of query SQL as follows:

```sql
-- Query data of top-level nodes
select code, name where parent_code is null;

-- Query all child nodes based on parent code
select code, name where parent_code = '1';
```

With this, the simplest tree data structure can be normally used in business systems.

### 3. Design of Tree Data Structure in Metadata Models
In metadata models, there are four field types that can represent relationships between models — relational fields.

+ One-to-One (O2O)
+ Many-to-One (M2O)
+ One-to-Many (O2M)
+ Many-to-Many (M2M)

However, not all types are suitable for tree structures. Based on the database design in the previous section, we know that only the Many-to-One (M2O) and One-to-Many (O2M) types may be used for tree structures.

According to the database table design in the previous section, we can define a model like this: (taking demo.DemoModel as an example)

| Field       | Type   | Associated Model       | Associated Field   | Relational Field   |
| ---------- | ------ | ---------------------- | ---------- | ---------- |
| code       | String | -              | -          | -          |
| name       | String | -              | -          | -          |
| parentCode | String | -              | -          | -          |
| parent     | M2O    | demo.DemoModel | parentCode | code       |
| children   | O2M    | demo.DemoModel | code       | parentCode |


This model design aims to show that M2O and O2M types are symmetrically designed and both can be applied to tree structures. Therefore, two fields, `parent` and `children`, are defined in the table above. Usually, we only need to use one of them. It is recommended to use `parent` to define the model of the tree structure, as this is more consistent with database design.

Regardless of the field type used, the associated model is always the model itself. We can say that this model has a **self-referential relationship**, and these two fields are called **self-referential fields**.

### 4. Directionality of Associative Relationships
When dealing with the issue of tree expansion, we find that to form a tree structure, the associative fields always need to expand towards the "many" side. Therefore, we have to introduce the concept of **directionality of associative relationships** to ensure that our implementation plan has theoretical support.

Directionality of different association types:

+ One-to-One (O2O): Does not have a single directionality and no concept of "many".
+ Many-to-One (M2O): Has a single directionality towards either the "many" or the "one" side.
+ One-to-Many (O2M): Has a single directionality towards either the "one" or the "many" side.
+ Many-to-Many (M2M): Does not have a single directionality.

A **tree structure with conventional meaning** always expands towards the "many" side; otherwise, the tree structure will not have valid business significance.

Combining our understanding of the directionality of associative relationships, we can clearly conclude:

+ One-to-One (O2O) can never form a tree structure with conventional meaning;
+ Both Many-to-One (M2O) and One-to-Many (O2M) have a single directionality that expands towards the "many" side;
+ Many-to-Many (M2M) is essentially a combination of One-to-Many (O2M) and Many-to-One (M2O). Although it does not have a single directionality, it has the concept of "many". Therefore, we can temporarily analogize it to the One-to-Many type expanding towards the "many" side.

Here, we only introduce the basic concepts, and this issue will be explained in detail in the "Query Principles" section below.

### 5. Node Configuration
Let's first look at all configuration items of the tree component/cascading component:

| **Attribute**                                                     | **Type**              | **Description**                                                     |
| ------------------------------------------------------------ | --------------------- | ------------------------------------------------------------ |
| model                                                        | `string`              | Model code, used to determine the source of model data corresponding to the current node.           |
| label                                                        | `string\|expression` | Title, the displayed content of each node.<br/>`activeRecord` represents the data of the current node |
| labelFields                                                  | `string[]`            | Title Fields                                                     |
| searchFields                                                 | `string[]`            | Search Fields                                                     |
| selfReferences                                               | `string`              | Self-referential Field.<br/>When the current node allows infinite expansion using a self-referential field, this configuration can be used. |
| references                                                   | `string`              | Associative field with the previous-level node.<br/>Except for the first-level node, other nodes must be configured with this. |
| search                                                       | `string`              | Click Search Field<br/>In the left-tree-right-table layout, this field is used to filter the table when the tree serves as a secondary search. |
| <font style="color:#080808;background-color:#ffffff;">title</font><br/> | `string`              | Cascading Card Title                                                 |


**Format of selfReferences, references, search**

For the convenience of configuration, these three attributes all allow configuration in the following format:

`${model}#${field}`

```xml
<nodes>
  <node model="business.PamirsCompany" />
  <node model="business.PamirsDepartment" references="business.PamirsDepartment#companyCode" />
</nodes>
```

Is equivalent to

```xml
<nodes>
  <node model="business.PamirsCompany" />
  <node model="business.PamirsDepartment" references="companyCode" />
</nodes>
```

That is: When the associative field is in the model of the current node, the configuration can be simplified by omitting the current model code; the model code can only be the model of the current node or the adjacent node.

## (II) Query Principles and Configuration Methods

### 1. Forming a Tree Using Many-to-One Associative Fields
Taking a standard organizational structure model such as "Company - Department - Employee" as an example, when we need to build a tree structure with these three models, we can define nodes like this:

```xml
<nodes>
  <node label="activeRecord.name" model="business.PamirsCompany" filter="partnerType == COMPANY" />
  <node label="activeRecord.name" model="business.PamirsDepartment" references="company" />
  <node label="activeRecord.name" model="business.PamirsEmployee" references="department" />
</nodes>
```

Among them:

+ The `PamirsCompany` model needs to filter all company data through `partnerType`.
+ The `PamirsDepartment` model has a `company` Many-to-One field.
  - Associated Model (references): `PamirsCompany` 
  - Associated Field (relationFields): `companyCode`
  - Relational Field (referenceFields): `code`
+ The `PamirsEmployee` model has a `department` Many-to-One field.
  - Associated Model (references): `PamirsDepartment` 
  - Associated Field (relationFields): `departmentCode`
  - Relational Field (referenceFields): `code`

:::warning Note

For model definitions, field configurations, and associative relationship fields, the backend can query them by viewing the source code or through the `base_field` table in the database; the frontend can view them by outputting via the `ModelCache#get` method in the browser console.

:::

**Query Process**

1. Query companies using the following SQL:

```sql
select id, code, name from business_pamirs_partner where partner_type = 'COMPANY' and is_deleted = 0 order by create_date desc, id desc;
```

Among them, `partner_type = 'COMPANY'` is the `filter` expression on the node, and the sorting follows the default sorting rule of the model.

2. When expanding a company node to query the department list, the current company code needs to be carried for querying in the department table, so that all departments under the current company can be obtained. The corresponding SQL is: (taking the current company code as `cs` for example)

```sql
select id, code, name from business_pamirs_department where company_code = 'cs' and is_deleted = 0 order by create_date desc, id desc;
```

3. When expanding a department node to query the employee list, the current department code needs to be carried for querying in the employee table, so that all employees under the current department can be obtained. The corresponding SQL is: (taking the current department code as `ds` for example)

```sql
select id, code, name from business_pamirs_employee where department_code = 'ds' and is_deleted = 0 order by create_date desc, id desc;
```

### 2. Forming a Tree Using One-to-Many Associative Fields
Also taking the organizational structure of "Company - Department - Employee" as an example, we can also build a tree structure through One-to-Many (O2M) associative fields: (for ease of understanding, we will introduce it by comparing it with the example in the previous section)

```xml
<nodes>
  <node label="activeRecord.name" model="business.PamirsCompany" filter="partnerType == COMPANY" />
  <node label="activeRecord.name" model="business.PamirsDepartment" references="business.PamirsCompany#departmentList" />
  <node label="activeRecord.name" model="business.PamirsEmployee" references="business.PamirsDepartment#employees" />
</nodes>
```

We can find that the definition of the first-level company node remains unchanged. Starting from the second level, `references` is specified to use the One-to-Many (O2M) field of the previous-level model for association.

Among them:

+ The `PamirsCompany` model needs to filter all company data through `partnerType`.
+ The `PamirsCompany` model has a `departmentList` One-to-Many field.
  - Associated Model (references): `PamirsDepartment` 
  - Associated Field (relationFields): `code`
  - Relational Field (referenceFields): `companyCode`
+ The `PamirsDepartment` model has an `employeeList` One-to-Many field. (In actual code, this field is actually a Many-to-Many field, and it is only used for example introduction here)
  - Associated Model (references): `PamirsEmployee` 
  - Associated Field (relationFields): `code`
  - Relational Field (referenceFields): `departmentCode`

Its query process is completely consistent with that of forming a tree using Many-to-One associative fields.

From this, we can find that there is a mutual constraint between the query principle of the tree structure and the fact that the associative fields always need to expand towards the "many" side. Therefore, whether we configure a tree structure through Many-to-One or One-to-Many, the associative fields always need to expand towards the "many" side.

:::warning Note

After learning the query principles of Many-to-One and One-to-Many, let's try to understand the basic concept that "associative fields always need to expand towards the 'many' side" again.

When describing the relationship between models using "Many-to-One" associative fields, we can say: Each department has a unique affiliated company, and each employee has a unique affiliated department.

When describing the relationship between models using "One-to-Many" associative fields, we can say: A company has multiple departments, and each department can only belong to one company; a department has multiple employees, and each employee can only belong to one department.

This also reflects the symmetry of Many-to-One and One-to-Many relationships from one aspect. No matter from which perspective, the relationship between models expands towards the "many" side and has a single directionality.

:::

### 3. Forming a Tree with Many-to-Many (M2M) Associative Fields
Taking the same "Company - Department - Employee" organizational structure as an example, we can also build a tree structure using Many-to-Many (M2M) associative fields:

```xml
<nodes>
  <node label="activeRecord.name" model="business.PamirsCompany" filter="partnerType == COMPANY" />
  <node label="activeRecord.name" model="business.PamirsDepartment" references="business.PamirsCompany#departmentList" />
  <node label="activeRecord.name" model="business.PamirsEmployee" references="business.PamirsDepartment#employeeList" />
</nodes>
```

It can be observed that the definition of the first-level company node remains unchanged. Starting from the second level, the `references` attribute is configured to use the Many-to-Many (M2M) field of the previous-level model for association.

Among them:
- The `PamirsCompany` model needs to filter all company data through the `partnerType` attribute.
- The `PamirsCompany` model contains a `departmentList` Many-to-Many field. (This field is actually an M2M field in the code and is only used for illustrative purposes here)
  - Associated Model (references): `PamirsDepartment` 
  - Associated Field (relationFields): `code`
  - Reference Field (referenceFields): `code`
  - Intermediate Model (through): `CompanyRelDepartment`
  - Intermediate Model Associated Field (throughRelationFields): `companyCode`
  - Intermediate Model Reference Field (throughReferenceFields): `departmentCode`
- The `PamirsDepartment` model contains an `employeeList` Many-to-Many field.
  - Associated Model (references): `PamirsEmployee` 
  - Associated Field (relationFields): `code`
  - Reference Field (referenceFields): `code`
  - Intermediate Model (through): `DepartmentRelEmployee`
  - Intermediate Model Associated Field (throughRelationFields): `departmentCode`
  - Intermediate Model Reference Field (throughReferenceFields): `employeeCode`


**Query Process**
1. Query companies using the following SQL:
   ```sql
   select id, code, name from business_pamirs_partner where partner_type = 'COMPANY' and is_deleted = 0 order by create_date desc, id desc;
   ```
   Here, `partner_type = 'COMPANY'` corresponds to the `filter` expression configured on the node, and the sorting follows the model's default sorting rule.

2. When expanding a company node to query the department list, first carry the current company code to query all department codes from the intermediate table of companies and departments. The corresponding SQL is: (taking the current company code as `cs` for example)
   ```sql
   select department_code from business_company_rel_department where company_code = 'cs' and is_deleted = 0;
   ```

3. Use all the department codes obtained from the previous step to query the corresponding departments from the department table based on the `code` field: (assuming the results from the previous step are: `ds1, ds2, ds3`)
   ```sql
   select id, code, name from business_pamirs_department where code in ('ds1', 'ds2', 'ds3') and is_deleted = 0 order by create_date desc, id desc;
   ```

4. When expanding a department node to query the employee list, first carry the current department code to query all employee codes from the intermediate table of departments and employees. The corresponding SQL is: (taking the current department code as `ds1` for example)
   ```sql
   select employee_code from business_department_rel_employee where department_code = 'ds1' and is_deleted = 0;
   ```

5. Use all the employee codes obtained from the previous step to query the corresponding employees from the employee table based on the `code` field: (assuming the results from the previous step are: `es1, es2, es3`)
   ```sql
   select id, code, name from business_pamirs_employee where code in ('es1', 'es2', 'es3') and is_deleted = 0 order by create_date desc, id desc;
   ```


:::warning Note
Think about it: If the Many-to-Many field uses the current model's field, can the query process still be executed as expected?
:::


### 4. Forming a Tree with Self-Referential Fields
When the "Department" model has a hierarchical (parent-child) relationship, we want the tree structure to reflect the superior-subordinate relationship of departments. Obviously, based on the query principles we learned above, we can define nodes as follows:

```xml
<nodes>
  <node label="activeRecord.name" model="business.PamirsDepartment" filter="parentCode =isnull= true" />
  <node label="activeRecord.name" model="business.PamirsDepartment" references="parent" />
  <node label="activeRecord.name" model="business.PamirsDepartment" references="parent" />
</nodes>
```

Among them:
- The first-level departments are root departments. By using the condition that `parentCode` is null, we can obtain all departments without a superior department.
- The second and third levels are queried through the `parent` Many-to-One field. According to the query principle of forming a tree with Many-to-One associative fields, we know that the final SQL will use the code of the current department as the superior department code (`parentCode`) to query the subordinate departments of the current department from the department table.


At this point, we can see the basic prototype of a self-referential tree structure. However, the above configuration only sets up **three levels**, and we cannot expand further down. To achieve an **infinite-level** self-referential tree structure, we need to clearly distinguish between the configurations of associative fields and self-referential fields. Converting the above configuration into an infinite-level self-referential tree structure, we can define the node as follows:

```xml
<nodes>
  <node label="activeRecord.name" model="business.PamirsDepartment" selfReferences="parent" />
</nodes>
```

Does this node configuration look familiar? Yes, this is the self-referential tree structure configuration we initially demonstrated in the "Design Principles" section.

With this configuration, when querying the first-level data, it will automatically filter using the condition that `parentCode` is null, without the need to manually add a filter. Starting from the second level, each level will expand downward until there are no more subordinate nodes.


### 5. Comprehensive Usage
In the above sections, we introduced the query principles of different types of associative fields and self-referential fields separately. In actual use, we may need to use them comprehensively according to specific scenarios.

For example, in a standard "Company - Department - Employee" organizational structure model, the Department model expands downward through self-reference, while other nodes only expand normally. How do we perform queries in this case? Let's first look at the following node definition:

```xml
<nodes>
  <node label="activeRecord.name" model="business.PamirsCompany" filter="partnerType == COMPANY" />
  <node label="activeRecord.name" model="business.PamirsDepartment" references="company" selfReferences="parent" />
  <node label="activeRecord.name" model="business.PamirsEmployee" references="business.PamirsDepartment#employeeList" />
</nodes>
```

Among them:
- The `PamirsCompany` model filters all company data through `partnerType`.
- The Department node is hierarchically associated through the `company` Many-to-One field in the `PamirsCompany` model and is self-referenced through the `parent` Many-to-One field.
- The Employee node is hierarchically associated through the `employeeList` Many-to-Many field in the `PamirsCompany` model.


During the query process, the query principle between levels remains unchanged. However, if the Department node is configured with a self-referential field, the self-referential field will be prioritized for step-by-step queries until there are no more subordinate departments. If the current department has no subordinate departments, the next-level employee data will be queried and returned as child nodes of the tree structure.


**Query Flow Diagram**
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/UserInterface/1756711959031-1c0b4306-f5d6-422b-8ce9-92c85a6655cd.jpeg)


:::warning Note
From the above query flow, it can be seen that employees are only returned as subordinate nodes when the Department is a leaf node. Departments at intermediate levels cannot view the employee data under them. This constraint is mainly caused by three reasons:
1. To ensure that the data at a single level has the characteristics of a single model, data from multiple models is not included in one level.
2. In terms of query performance, data from multiple models always requires querying other nodes when expanding each level of nodes.
3. Under the same level of tree nodes, the appearance of data from multiple models is likely to cause confusion in most scenarios (e.g., employee data appearing under a company node).
:::


### 6. Directionality of Many-to-Many Associative Fields
Using the node configuration and query principles introduced above, we can already configure tree structures composed of any models. To answer the question about the directionality of Many-to-Many associative fields raised earlier and further explain the concept of directionality to readers, we supplement the configuration method of Many-to-Many associative fields and a special judgment logic based on assumptions.


Before starting, let's look at the following two node definitions:

```xml
<nodes>
  <node label="activeRecord.name" model="business.PamirsCompany" filter="partnerType == COMPANY" />
  <node label="activeRecord.name" model="business.PamirsDepartment" references="business.PamirsCompany#departmentList" />
  <node label="activeRecord.name" model="business.PamirsEmployee" references="business.PamirsDepartment#employeeList" />
</nodes>
```

```xml
<nodes>
  <node label="activeRecord.name" model="business.PamirsCompany" filter="partnerType == COMPANY" />
  <node label="activeRecord.name" model="business.PamirsDepartment" references="business.PamirsCompany#departmentList" />
  <node label="activeRecord.name" model="business.PamirsEmployee" references="departmentList" />
</nodes>
```

In comparison, the only difference between the two node definitions lies in the **employee node configuration** of the third level. However, in actual operation, these two node definitions will produce the same result.


The metadata information of these two fields is listed below:
- The `PamirsDepartment` model contains an `employeeList` Many-to-Many field.
  - Associated Model (references): `PamirsEmployee` 
  - Associated Field (relationFields): `code`
  - Reference Field (referenceFields): `code`
  - Intermediate Model (through): `DepartmentRelEmployee`
  - Intermediate Model Associated Field (throughRelationFields): `departmentCode`
  - Intermediate Model Reference Field (throughReferenceFields): `employeeCode`
- The `PamirsEmployee` model contains a `departmentList` Many-to-Many field.
  - Associated Model (references): `PamirsDepartment` 
  - Associated Field (relationFields): `code`
  - Reference Field (referenceFields): `code`
  - Intermediate Model (through): `DepartmentRelEmployee`
  - Intermediate Model Associated Field (throughRelationFields): `employeeCode`
  - Intermediate Model Reference Field (throughReferenceFields): `departmentCode`


It can be seen that these two fields are also defined symmetrically in the two models, and their associative relationships are all stored in the `DepartmentRelEmployee` model.

According to the concept of directionality of Many-to-Many associative fields we learned earlier, such fields do not have a single directionality inherently. With the help of model semantics, we can explain this as follows:
- The `PamirsDepartment#employeeList` field indicates that a department has multiple employees, and each employee may belong to multiple departments.
- The `PamirsEmployee#departmentList` field literally indicates that an employee has multiple departments, and each department may belong to multiple employees. (This is a semantic error; the correct expression in normal circumstances should be: an employee belongs to multiple departments)


From the perspective of One-to-Many (O2M), the "Department - Employee" relationship can expand toward the "many" side, and the "Employee - Department" relationship can also expand toward the "many" side. That is: whichever model the field is defined in, that model can be the "one" side, and the associated model is always the "many" side.


So, how do we identify semantics to always obtain the directionality of the "Department - Employee" relationship?

The answer is based on an assumption of single directionality:
1. When a Many-to-Many associative field is located in the current node's model, its associated model must be the next-level node's model. The Many-to-Many field indicates that the current model expands toward the associated model (e.g., the `PamirsDepartment#employeeList` field).
2. When a Many-to-Many associative field is located in the next-level node's model, its associated model must be the current model. The Many-to-Many field indicates that the associated model expands toward the current model (e.g., the `PamirsEmployee#departmentList` field).


:::warning Note
Of course, this assumption is not applicable in all scenarios. When the semantic scenario does not have a single directionality like the "Department - Employee" relationship, this assumption will not hold and may even cause confusion in certain business scenarios.
:::


# III. Node Configuration Examples
When configuring **components with tree structures** using the interface designer, you will often see the prompt "Incomplete associative relationship formed". This prompt may have confused many readers and users.

Through the following series of examples, you can learn:
1. How to correctly configure a **complete associative relationship** from the perspective of DSL structure and metadata.
2. Specifications for model constraints in tree views and tree selection components.
3. How to configure node actions for tree components.


## (I) Tree Components in Tree Views
When learning about views, we know that each view has a model, and all its DSL metadata revolves around the model. Tree views are no exception: when configuring a tree component in a tree view, the model of the last-level node must be the same as the current view's model.


### 1. Configuration of a Tree Component with a Single Node
When configuring a tree view for the Department model, the configuration can be as follows:

```xml
<view model="business.PamirsDepartment" type="tree" name="demo_tree_view">
  <template slot="actionBar">
    <action name="redirectCreatePage" label="Create" />
  </template>
  <template slot="tree">
    <nodes>
      <node label="activeRecord.name" model="business.PamirsDepartment" selfReferences="parent" />
    </nodes>
    <template slot="rowActions">
      <action name="redirectUpdatePage" label="Edit" />
      <action name="delete" label="Delete" />
    </template>
  </template>
</view>
```

In this case, the data of the Department model will be expanded through the tree structure using self-referential fields, and the "Edit" and "Delete" actions will be displayed behind each node. In this view, both the node model and the action model are the metadata corresponding to the current view model, and there is no metadata from other models.


### 2. Configuration of a Tree Component with Multiple Nodes
When configuring a tree view for the Employee model, the configuration can be as follows:

```xml
<view model="business.PamirsEmployee" type="tree" name="demo_tree_view">
  <template slot="actionBar">
    <action name="redirectCreatePage" label="Create" />
  </template>
  <template slot="tree">
    <nodes>
      <node label="activeRecord.name" model="business.PamirsCompany" filter="partnerType == COMPANY" />
      <node label="activeRecord.name" model="business.PamirsDepartment" references="company" selfReferences="parent" />
      <node label="activeRecord.name" model="business.PamirsEmployee" references="department" />
    </nodes>
    <template slot="rowActions">
      <action name="redirectUpdatePage" label="Edit" />
      <action name="delete" label="Delete" />
    </template>
  </template>
</view>
```

In this view, there are three levels of node configuration, and the model of the last-level node is the same as the current view model. Other configurations remain unchanged.


Careful readers may have noticed that the `rowActions` slot is defined under the tree component. How are these node actions rendered on the page at this time?

We stipulate that the `rowActions` slot configured under the tree component will only be rendered on the corresponding nodes whose model is the same as the current view model; other nodes will not use these actions. This fully complies with the "MVVM" design concept: actions corresponding to a model only process the data of that model to ensure correct execution.


### 3. Action Configuration Under Nodes
Although the `rowActions` slot defined under the tree component can meet our business needs to a certain extent, during the DSL design, we aim to make the structure and semantics of the DSL more "intuitive". Therefore, we also support defining the `rowActions` slot under nodes, as shown below:

```xml
<view model="business.PamirsEmployee" type="tree" name="demo_tree_view">
  <template slot="actionBar">
    <action name="redirectCreatePage" label="Create" />
  </template>
  <template slot="tree">
    <nodes>
      <node label="activeRecord.name" model="business.PamirsCompany" filter="partnerType == COMPANY" />
      <node label="activeRecord.name" model="business.PamirsDepartment" references="company" selfReferences="parent" />
      <node label="activeRecord.name" model="business.PamirsEmployee" references="department">
        <template slot="rowActions">
          <action name="redirectUpdatePage" label="Edit" />
          <action name="delete" label="Delete" />
        </template>
      </node>
    </nodes>
  </template>
</view>
```

In this case, the `rowActions` slot is defined under the last-level node, indicating that these actions will only be displayed when the data of the Employee model is rendered on the page, and no actions will be available for other nodes.


### 4. Actions Under Different Nodes
Is it possible to render actions corresponding to the model under the "Company" or "Department" nodes as well? The answer is yes.

```xml
<view model="business.PamirsEmployee" type="tree" name="demo_tree_view">
  <template slot="actionBar">
    <action name="redirectCreatePage" label="Create" />
  </template>
  <template slot="tree">
    <nodes>
      <node label="activeRecord.name" model="business.PamirsCompany" filter="partnerType == COMPANY">
        <template slot="rowActions">
          <action model="business.PamirsCompany" name="redirectUpdatePage" label="Edit" />
          <action model="business.PamirsCompany" name="delete" label="Delete" />
        </template>
      </node>
      <node label="activeRecord.name" model="business.PamirsDepartment" references="company" selfReferences="parent">
        <template slot="rowActions">
          <action model="business.PamirsDepartment" name="redirectUpdatePage" label="Edit" />
          <action model="business.PamirsDepartment" name="delete" label="Delete" />
        </template>
      </node>
      <node label="activeRecord.name" model="business.PamirsEmployee" references="department">
        <template slot="rowActions">
          <action name="redirectUpdatePage" label="Edit" />
          <action name="delete" label="Delete" />
        </template>
      </node>
    </nodes>
  </template>
</view>
```

From the above configuration, we can see that when the view compilation fails to correctly identify the metadata model, we can manually specify the model code through the `model` attribute to ensure the view compilation is executed correctly.


:::warning Note
In most cases, we do not recommend breaking the model restrictions of view compilation. However, due to the special nature of tree views, we have to specify the model to correctly handle metadata and meet business requirements.
:::


### 5. Expand View of Tree Components
When a tree node is selected, we may want to display the data of this node through a form/detail view. In this case, the view can be configured through the `content` slot. A possible DSL configuration is as follows:

```xml
<view model="business.PamirsEmployee" type="tree" name="demo_tree_view">
  <template slot="actionBar">
    <action name="redirectCreatePage" label="Create" />
  </template>
  <template slot="tree">
    <nodes>
      <node label="activeRecord.name" model="business.PamirsCompany" filter="partnerType == COMPANY" />
      <node label="activeRecord.name" model="business.PamirsDepartment" references="company" selfReferences="parent" />
      <node label="activeRecord.name" model="business.PamirsEmployee" references="department" />
    </nodes>
    <template slot="content">
      <view model="business.PamirsEmployee" type="detail">
        <template slot="detail" cols="2">
          <field data="id" invisible="true" />
          <field data="code" label="Employee Code" span="1" />
          <field data="name" label="Employee Name" span="1" />
        </template>
      </view>
    </template>
  </template>
</view>
```


## (II) Tree Selection Field Components
When configuring a tree selection component for an associative relationship field, its node configuration is almost identical to that of a regular tree component. The only difference lies in the judgment criteria for forming a complete associative relationship.

For any associative relationship field, the finally selected data must belong to the associated model; otherwise, the submission cannot be performed correctly. Based on this constraint, we can infer that the model of the last-level node of the tree selection component must be the same as the associated model of the current field.


### 1. Configuration of Department Tree Selection Component
Take the `parent` Many-to-One (M2O) field of the `PamirsDepartment` model as an example: (The configuration method for One-to-Many (O2M)/Many-to-Many (M2M) fields is exactly the same)

```xml
<view model="business.PamirsDepartment" type="form" name="demo_form_view">
  <template slot="form" cols="2">
    <field data="id" invisible="true" />
    <field data="code" label="Department Code" span="1" />
    <field data="name" label="Department Name" span="1" />
    <field data="parent" label="Superior Department" widget="TreeSelect" span="1">
      <nodes>
        <node label="activeRecord.name" model="business.PamirsDepartment" selfReferences="parent" />
      </nodes>
    </field>
  </template>
</view>
```


### 2. Configuration of Department Tree Selection Component with Multiple Nodes
```xml
<view model="business.PamirsDepartment" type="form" name="demo_form_view">
    <template slot="form" cols="2">
        <field data="id" invisible="true"/>
        <field data="code" label="Department Code" span="1"/>
        <field data="name" label="Department Name" span="1"/>
        <field data="parent" label="Superior Department" widget="TreeSelect" span="1">
            <nodes>
                <node label="activeRecord.name" model="business.PamirsCompany" filter="partnerType == COMPANY"/>
                <node label="activeRecord.name" model="business.PamirsDepartment" references="company" selfReferences="parent"/>
            </nodes>
        </field>
    </template>
</view>
```