---
title: Restrict Access to Data
index: true
category:
  - Development Manual
  - Tutorials
order: 6

---
:::warning Tip

This tutorial extends the "Back-end Framework Tutorial". Please ensure you have completed that tutorial and use the "Expense Management (expenses)" module you built as the basis for this tutorial's exercises.

:::

Before studying this article, you should first gain a preliminary understanding of Oinone's security-related content to facilitate comprehension of the customizations introduced herein. Reference: [Back-end Framework - Security Introduction](/en/DevManual/Tutorials/Back-endFramework/chapter4-a-brief-introduction-to-security.md)

Thus far, our focus has been on implementing practical functions. However, in most business scenarios, security quickly becomes a concern:

Currently, we can configure who can view and manage data in `Expense Management - Expense Reimbursement - Reimbursement Forms` through "System Permissions".

However, we also want each system user to only view reimbursement forms where the "reporter" is themselves, while "project initiators" should additionally view all reimbursement forms for projects they initiated.

References: Relevant documentation for this topic can be found in "[Security Mechanisms](/en/DevManual/Reference/Back-EndFramework/security-in-oinone.md)", "[Gateway Protocol API](/en/DevManual/Reference/Back-EndFramework/AdvanceAPI/protocol-API.md)", and "[Request Context API](/en/DevManual/Reference/Back-EndFramework/AdvanceAPI/request-context-API.md)".

# I. View Only Reimbursement Forms Where Reporter Is Self

:::info Objectives: By the end of this section:

1. In Project Management, there is an "Oinone Demo Project" with the project initiator as "test", and the "Linked Reimbursement Forms" contain two records with reporters "test" and "test2" respectively.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/RestrictAccessToData/1749025398418-b6c09161-9271-4772-ab65-2328e5a815a8.gif)

2. The menu includes the "Expense Reimbursement - Reimbursement Forms" item, which can normally display the two newly created reimbursement form records.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/RestrictAccessToData/1749025621472-ab5b11b1-2d36-4cda-83a1-263fd3d6afb3.png)

3. After configuring "Data Permissions" in "System Permissions", logging in with different users yields the following two results:

+ Log in as user "test" to view reimbursement forms

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/RestrictAccessToData/1749025759555-8a46240a-c932-4d2b-b7f0-40da3beddc4b.png)

+ Log in as user "test2" to view reimbursement forms

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/RestrictAccessToData/1749025858149-bfe99eda-e8d5-49ee-a733-8bac07d8b371.png)

:::

For the `报销单模型（expenses.ExpenseBill）` (ExpenseBill model), we need to append an `RSQL` expression to filter data for each user query. A potentially effective `RSQL` expression could be:

``` java
reporterId == ${currentUser}
```

Let's try configuring this in System Permissions:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/RestrictAccessToData/1749026388467-8acf03df-75ae-4270-907e-51647e70fed6.png)

> **Exercise**
>
> 1. Add the Project Information and Reporter fields to the reimbursement form and restart the project.

| Field | Display Name | Type | Attributes |
| ------------- | ---------- | ------------ | ------------------------------------------------------------ |
| projectInfo   | Project Information | `M2O` |              |
| reporter      | Reporter | `M2O` | required (mandatory) |


> 2. Log in as user "test".
> 3. Go to the `Basic Data - Project Management` page to create a new project.

| Field | Value |
| ------------ | ------------------------------------- |
| Project Name | Oinone Demo Project |
| Year | 2025 |
| Personnel Input Scale | 2 |
| Budget per Person | 100 |
| Project Initiator | test |
| Linked Reimbursement Forms | 2 records (reporters are "test" and "test2" respectively) |


> 4. Add a menu entry for "Reimbursement Forms".
> 5. Configure the corresponding data permissions for the "Reimbursement Forms" menu in "System Permissions".

:::danger Warning:

If you have customized the form view for "Project Management" in the project, you need to add the "Reporter" field in the sub-table of "Linked Reimbursement Forms"; otherwise, the "Reporter" data will not be saved correctly.

:::

# II. Project Initiators Can View All Reimbursement Forms for Initiated Projects

:::info Objectives: By the end of this section, the reimbursement form page should allow viewing not only self-created reimbursement form data but also all reimbursement forms for projects initiated by the "Project Initiator".

Log in as user "test" to view reimbursement forms:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/RestrictAccessToData/1749027807399-25e6c396-65a2-42b0-9a35-62a86f79e7c9.png)

Log in as user "test2" to view reimbursement forms:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/RestrictAccessToData/1749027839151-0d7d15d1-3ab0-45e4-add1-b8f3a81fc6f7.png)

:::

In the reimbursement form model we created, we see a `projectInfoId` field, which is a relational field linking to projects. Based on requirements, we can derive an effective RSQL expression:

``` java
projectInfoId =in= (id1, id2, id3...)
```

How do we obtain values for `id1, id2, id3...`?

These values are filtered from the `项目信息模型（expenses.ProjectInfo）` (ProjectInfo model) using the `当前登录用户ID` (current user ID) via the `项目发起人ID（userId）` (project initiator ID), then concatenated into the query conditions for the `报销单模型` (ExpenseBill model).

We can use a `自定义占位符 PlaceHolder` (custom placeholder) to dynamically replace values in the data permission expression, similar to how the system's built-in context handles the current user.

:::tip Example: The following is a custom placeholder example:

:::

``` java
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

When configuring data permissions through System Permissions, select Source Code Mode to manually input and use custom placeholders:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/RestrictAccessToData/1749027983059-f764b140-928e-4e0e-89eb-79fcbec40d4b.png)

> **Exercise**
>
> 1. Create the `CurrentProjectInfoIdsPlaceHolder` class.
> 2. Declare the `currentProjectInfoIds` placeholder attribute name.
> 3. Query project IDs by current login user ID.
> 4. Use Source Code Mode in "System Permissions" to configure data permissions for the "Reimbursement Forms" menu.

# III. Placeholder Implementation Optimization

In most scenarios, the same placeholder may be used in multiple locations and may be reused within a single request. For placeholder value retrieval, we generally use "thread-level caching" for processing. Example code is not provided for this section; readers can refer to the "Extending PamirsSession" section in "[Request Context API](/en/DevManual/Reference/Back-EndFramework/AdvanceAPI/request-context-API.md)" to implement it independently.

> **Exercise**
>
> 1. Create the `CurrentProjectInfoIdsSession` class.
> 2. Use thread-level caching for the `queryCurrentProjectInfoIds` method.