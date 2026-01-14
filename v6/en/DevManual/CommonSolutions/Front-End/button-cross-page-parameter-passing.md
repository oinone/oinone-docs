---
title: Button:Passing Extra Parameters Across Pages
index: true
category:
   - Frontend
order: 8
---
# I. Application of Context in Fields and Actions
In business scenarios, it is often necessary to carry current page data when **opening a pop-up window** or **navigating to a new page**. In such cases, we need to configure the context information in the relevant "actions".

In the Oinone platform, the context is mainly divided into three types:

1. `activeRecord`: Data of the current view
2. `rootRecord`: Data of the main view
3. `openerRecord`: The object that triggers the pop-up window

`activeRecord` represents the data of the current view. For example, if an action is configured on a form, it refers to the data of the current form; if configured on a table field of o2m or m2m, it refers to the selected row data.

`rootRecord` represents the data of the root view. If the current view is a form page, it represents the form data; if it is a table page, it represents the table data.

`openerRecord` represents the object that triggers the pop-up window. For example, in fields or actions within a pop-up window, information about the trigger can be obtained through `openerRecord`.

All three are of the object (Object) type.

# II. Introduction to Views
## (Ⅰ) Current View
The nearest parent view of the component. For example, for a field component within a pop-up window, its current view is the view where the pop-up window is opened.

The keyword for retrieving values in the current view in the code is `activeRecord`, and to obtain the `id` of the data in the current view, it is `activeRecord.id`.

## (Ⅱ) Main View
The view of the current main model of the page (the model code in the browser address is the main model). For example, for a field component within a pop-up window, its main view is not the view where the pop-up window is opened, but the view where the action to open the pop-up window is located.

The keyword for retrieving values in the main view in the code is `rootRecord`, and to obtain the `id` of the data in the main view, it is `rootRecord.id`.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/WX20240606-163748-1024x513.png)

# III. Introduction to Scenario Settings
## (Ⅰ) After the server-side action closes the pop-up window, refresh the data of the main view
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/WX20240606-164436-1024x648.png)

## (Ⅱ) After the server-side action closes the pop-up window, refresh the data of the table row that opened the pop-up window
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/WX20240606-164605-1024x688.png)

# II. Configuration of Interface Designer
## (Ⅰ) Carrying current view data in the pop-up window of o2m and m2m table fields
Suppose we design a form page containing table fields of `o2m` (one-to-many) and `m2m` (many-to-many). When opening the relevant pop-up window, the `code` data in the form needs to be passed to the pop-up window.

1. Select the corresponding "action", such as Create or Add. Find "Context" at the bottom of the right property panel and add context information in the format of an object `{}`.
2. Add context information in the format of key-value pairs: `{code: rootRecord.code}`.
3. When designing the pop-up window, drag the `code` field into the pop-up window.
4. Save and publish after completing the design.

As can be seen, in the current context, the `key` is `code`, and the `value` is `rootRecord.code`. Here, `rootRecord` is used instead of `activeRecord` because, as explained earlier, if the current action is configured on the table field of `o2m` or `m2m`, `activeRecord` refers to the selected row in the table. However, our current requirement is to obtain the `code` field on the form, so `rootRecord` must be used.

It is particularly important to note that the `key` must be a field that actually exists in the submission model [front-end view] to enable the transmission operation.