---
title: 开发中：索引、唯一索引、联合索引如何创建
index: true
category:
  - 常见问题（faq）
order: 7
---
模型上添加索引注解，不管是联合的还是唯一的，系统最后生成的DDL中自动把is_deleted自动加到唯一约束中去。

# 一、普通索引
`@Model.Advanced(index = "taskId")`

# 二、唯一索引
`@Model.Advanced(unique = {"techName"})`

# 三、联合索引
## （一）联合唯一约束
`@Model.Advanced(unique = {“namespace,fun”})`

## （二）两个独立的唯一约束
`@Model.Advanced(unique = {“namespace”,”fun”})`

