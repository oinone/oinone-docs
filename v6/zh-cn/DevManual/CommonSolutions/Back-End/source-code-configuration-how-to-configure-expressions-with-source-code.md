---
title: 源码配置：如何使用源码的方式配置表达式
index: true
category:
  - 常见解决方案
order: 56
---
# 一、自定义占位符定义表达式

1. 数据权限定义表达式： `${thisTeacherName}`
   ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/Snipaste_2025-03-13_14-36-51-20250530144829824.jpg)
2. 界面设计器查询条件定义：`$#{thisTeacherName}`需要加上#号
   ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/Snipaste_2025-03-14_10-04-07-20250530144829883.jpg)
   以上配置都可以通过查看`queryWrapper`里面的`originRsql`查看占位符是否被正确替换。

# 二、显隐、过滤条件表达式定义

显隐、过滤都可以加载字段注解里以及`xml`定义里

1. 显隐:
   `invisible="$!{activeRecord.deadline}" / invisible = true`

```java
    @Field.String
    @Field(displayName = "视图/页面", invisible = true)
    private String viewName;
```

2. 过滤。
   `domain = " code == ${activeRecord.id} " / domain = "code == '111' "`

```java
    @Field.one2many
    @Field(displayName = "子订单列表", summary = "子订单列表")
    @Field.Relation(relationFields = {"code"}, referenceFields = {"code"}, domain = "code != '1234'")
    private List<ChildOrder> orderList;
```

