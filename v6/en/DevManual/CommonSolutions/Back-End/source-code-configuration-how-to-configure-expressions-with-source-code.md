---
title: Source Code Configuration:How to Configure Expressions Using Source Code
index: true
category:
  - Common Solution Approaches
order: 56
---

# I. Custom Placeholder Definition Expressions

1. Data permission definition expression: `${thisTeacherName}`
   ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/Snipaste_2025-03-13_14-36-51-20250530144829824.jpg)
2. Query condition definition in the interface designer: `$#{thisTeacherName}` (needs to add a # symbol)
   ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/Snipaste_2025-03-14_10-04-07-20250530144829883.jpg)
   The above configurations can be checked by viewing the `originRsql` in the `queryWrapper` to see if the placeholders are correctly replaced.

# II. Visibility and Filter Condition Expression Definitions

Visibility and filtering can both be defined in field annotations and `xml` definitions.

1. Visibility:
   `invisible="$!{activeRecord.deadline}" / invisible = true`

```java
    @Field.String
    @Field(displayName = "View/Page", invisible = true)
    private String viewName;
```

2. Filtering:
   `domain = " code == ${activeRecord.id} " / domain = "code == '111' "`

```java
    @Field.one2many
    @Field(displayName = "Child Order List", summary = "Child Order List")
    @Field.Relation(relationFields = {"code"}, referenceFields = {"code"}, domain = "code != '1234'")
    private List<ChildOrder> orderList;
```