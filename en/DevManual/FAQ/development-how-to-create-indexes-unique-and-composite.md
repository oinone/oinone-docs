---
title: How to Create Indexes, Unique Indexes, and Composite Indexes During Development
index: true
category:
  - FAQ (Frequently Asked Questions)
order: 7
---

Add index annotations to the model. Whether it is a composite index or a unique index, the system will automatically add `is_deleted` to the unique constraint in the final generated DDL.


# I. Ordinary Index
`@Model.Advanced(index = "taskId")`


# II. Unique Index
`@Model.Advanced(unique = {"techName"})`


# III. Composite Index
## (Ⅰ) Composite Unique Constraint
`@Model.Advanced(unique = {"namespace,fun"})`

## (Ⅱ) Two Independent Unique Constraints
`@Model.Advanced(unique = {"namespace", "fun"})`