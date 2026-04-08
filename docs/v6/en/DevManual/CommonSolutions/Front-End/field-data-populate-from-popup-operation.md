---
title: Field:Data Pop-Back from Popup Operations to Fields
index: true
category:
   - Frontend
order: 4
---
# I. Before Reading
You should:

+ Be familiar with CRUD (Create, Read, Update, Delete) operations related to models.

# II. Overview
A related table field is a special field that extracts corresponding fields from relational fields and flattens them in the current model. In essence, it is a field with a fixed [calculation formula].

It is mainly used to solve the problem of excessively deep hierarchy when GQL retrieves relational fields (non-stored related table fields), and can also address data synchronization issues for redundant fields (stored related table fields).

It should be noted that the data synchronization capability of related table fields is processed on the *client side*, and full consistency of data synchronization cannot be completely guaranteed.

# III. Scenario Description
To facilitate the following description, we need to first construct a basic business scenario involving three models: [Item], [Item Order], and [Item Order Detail].

When creating/editing [Item Order Detail], [Item] is used, and the [Item] drop-down options are displayed in the format of `[Item Code] - [Item Name]`.

In the expanded [table] of [Item Order Detail], [Item Code] and [Item Name] are displayed instead of [Item].

The model definitions are as follows:

## (Ⅰ) Item
| Name | API Name | Business Type | Multi-Value | Length (Single Value) | Related Model | Related Field |
| --- | --- | --- | --- | --- | --- | --- |
| ID | id | Integer | No | - | - | - |
| Code | code | Text | No | 128 | - | - |
| Name | name | Text | No | 128 | - | - |

## (Ⅱ) Item Order
| Name | API Name | Business Type | Multi-Value | Length (Single Value) | Related Model | Related Field |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ID | id | Integer | No | 128 | - | - |
| Code | code | Text | No | 128 | - | - |
| Order Details | details | One-to-Many | Yes | - | Item Order Detail (ItemOrderDetail) | id - orderId |

## (Ⅲ) Item Order Detail
| Name | API Name | Business Type | Multi-Value | Length (Single Value) | Related Model | Related Field |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ID | id | Integer | No | 128 | - | - |
| Order | order | Many-to-One | No | - | Item Order (ItemOrder) | orderId - id |
| Order ID | orderId | Integer | No | - | - | - |
| Item | item | Many-to-One | No | - | Item (Item) | itemId - id |
| Item ID | itemId | Integer | No | - | - | - |
| Quantity | count | Integer | No | - | - | - |

# IV. Preparation
Based on the model definitions, we need to create basic CRUD operations for [Item] and [Item Order] to proceed with the following steps.

(Only some special pages are shown below; other pages are no different from basic CRUD pages)

## (Ⅰ) Designing the [Form] View for Item Order
Drag and drop the order details onto the page, and use the [Component Switch] function to switch the current [Drop-down Multiple Selection] component to a [Table] component.

Design the [embedded table] expanded from the order details. Place the [Item] and [Quantity] fields in the table.

Design the popup views for creation and editing. (Both buttons need to be designed)

**Tips**:

+ Click the `X` in the upper right corner of the popup to close the popup design page.
+ When selecting fields within the [Order Details] field or their internal fields/actions, the [Current Model] displayed in [Component Library] - [Model] on the left will change to the [Item Order Detail] related model. To continue designing the [Item Order] model, you need to select any component not within the scope of the [Order Details] field. In the current view, selecting the [Code] field can switch to the [Item Order] model.
+ Designing multi-model views always requires paying attention to the information of [Current Model].

# V. Creating Related Table Fields
Currently, related table fields can only be created through the `Related Table Field` component in the interface designer, and defined using `Related` in low-code.

Drag in a related table field to create the [Item Code] field.

Drag in a related table field to create the [Item Name] field.

Hide the [Item] field in the table.
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/20250530101854.png)

Since related table fields essentially obtain values from objects by reference, the field cannot be directly removed here but needs to be hidden.

Add related table fields in the create/edit popup and hide them.

The create/edit functions of the embedded table will also be pruned according to metadata. Therefore, to ensure that [Item Code] and [Item Name] are correctly popped back into the table, this step is necessary. To avoid issues where data cannot be popped back due to using different fields, you need to reuse fields from [Component Library] - [Model] instead of dragging them from [Components]. This is not a feature of related table fields but a requirement for data pop-back in all embedded tables.