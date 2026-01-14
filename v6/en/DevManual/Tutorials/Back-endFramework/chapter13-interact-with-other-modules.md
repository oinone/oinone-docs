---
title: Chapter 13:Interact With Other Modules
index: true
category:
  - Development Manual
  - Tutorials
  - Back-end Framework
order: 13

---
In the previous chapter, we modified a module's behavior using inheritance. In our expense management business scenario, we hope to go further and implement a feature to automatically generate financial vouchers for customers. Suppose we have developed an accounting module based on Oinone, so it would be great to directly create accounting vouchers from our expense management module. In other words, once the status of an expense bill is set to "effective", the corresponding accounting voucher should be automatically generated in the accounting application.

# I. Link Module

Reference: Documentation related to this topic can be found in "[Module API](/en/DevManual/Reference/Back-EndFramework/module-API.md)".

:::info Objectives: By the end of this section

1. Add two modules: "account" and "expenses_account". Hide the `expenses_account` module in the AppFinder by setting its `application` attribute to false, and only display the "account" accounting module.
2. Override the "accept" operation logic of the `expenses.ExpenseBill` model to automatically generate accounting vouchers when triggered.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-13/link.gif)

:::

Whenever we interact with other modules, we must remember Oinone's modular characteristics. Suppose you have developed both the expense management module and the accounting module. If we plan to sell the application to enterprise customers, some may need to transfer expense data to the accounting system for financial processing and generate corresponding accounting vouchers, while others may not.

For such scenarios, a common practice is to create a "link" module. In our example, this module will depend on the `expenses` (expense management) and `account` (accounting) modules and include the logic for creating accounting vouchers from expense bills in expense management. This way, the expense management and accounting modules can be installed independently. When both modules are installed, installing the link module will provide the new functionality.

> **Exercise**
>
> 1. Create the `account` module.
> 2. Create a link module:
>    Create the `expenses_account` module, set the `application` attribute to `false`, and add dependencies on the `expenses` and `account` modules.
>
>  Tip: You have done similar operations at the beginning of this tutorial, and the process is very similar.
>
> 3. Add a voucher `account.Voucher` model to the `account` module with four fields: summary, subject, debitOrCredit, and amount.
> 4. Create a menu "Voucher Management" for the `account` model and bind it to the `account.Voucher` model.
> 5. In the `expenses_account` module, override the "accept" operation logic of the `expenses.ExpenseBill` model to automatically generate accounting vouchers when the operation is triggered.

:::danger Warning

The package paths of each module must not contain the same path; otherwise, it will cause metadata loading issues. Therefore, for the link module `expenses_account`, its package path is recommended to start with "link", such as `pro.shushi.oinone.tutorials.link.expenses.account`.

:::

This chapter may be one of the most difficult covered so far, but it is closest to the actual development scenarios in Oinone.