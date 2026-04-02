---
title: 章节 13：模块间相互作用（Interact With Other Modules）
index: true
category:
  - 研发手册
  - 教程
  - 后端框架
order: 13

---
在上一章中，我们运用继承的方式修改了一个模块的行为。在我们的费用管理业务场景里，我们希望能够更进一步，实现为客户自动生成财务凭证的功能。假设我们基于 Oinone 再开发了一个会计模块，所以要是能直接从我们的费用管理模块中创建会计凭证那就太棒了，也就是说，一旦报销单的状态被设置为 “已生效”，就在会计应用程序中自动生成对应的会计凭证。

# 一、Link模块

参考：与此主题相关的文档可在 “[Module API](/zh-cn/DevManual/Reference/Back-EndFramework/module-API.md)” 中找到。

:::info 目标：在本节结束时

1. 新增 "account（会计）" 与 "expenses_account" 两个模块。通过将 expenses_account 模块的 application 属性设置为 false，实现其在 AppFinder 中隐藏，仅展示 account 会计模块。
2. 重写 `expenses.ExpenseBill` 模型 “接受” 操作逻辑，触发时自动生成会计凭证。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-13/link.gif)

:::

每当我们与其他模块进行交互时，都需要牢记 Oinone 的模块化特性。假设，你同时做了费用管理模块和会计模块。如果我们打算将应用程序出售给企业客户，有些客户可能会需要将费用数据传递给会计系统进行财务处理，生成相应的会计凭证。而有些则可能不需要。
对于这类使用场景，常见的做法是创建一个 “链接” 模块。在我们的例子中，这个模块将依赖于 `expenses`（费用管理）模块和 `account`（会计）模块，并包含费用管理中针对报销单创建会计凭证逻辑。通过这种方式，费用管理模块和会计模块可以独立安装。当两个模块都安装后，再安装链接模块就会提供新的功能。

> **练习（Exercise）**
>
> 1. 创建 `account` 模块
> 2. 创建一个链接模块：
>    创建 `expenses_account` 模块，`application` 属性设置为 `false` ，且依赖增加于 `expenses` 和 `account` 模块。
>
> 提示：你在本教程开头已经做过类似的操作，过程非常相似。
>
> 3. 给 `account` 模块，增加一个凭证 `account.Voucher` 模型，增加四个字段：摘要（summary）、科目（subject）、借贷方向（debitOrCredit）、金额（amount）。
> 4. 为`account` 模型创建菜单“凭证管理”绑定`account.Voucher` 模型。
> 5. 于 `expenses_account` 模块中，对 `expenses.ExpenseBill` 模型的 “接受” 操作逻辑予以重写，实现操作触发时自动生成会计凭证。

:::danger 警告

各个模块的包路径，不能包含相同的包路径，否则会导致元数据加载出问题。所以如链接模块`expenses_account` 它的包路径建议以link开头如：pro.shushi.oinone.trutorials.link.expenses.account

:::



本章可能是到目前为止所涵盖的最困难的章节之一，但它最接近 Oinone 实际开发中的情况。



