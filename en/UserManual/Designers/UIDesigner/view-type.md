---
title: View Types
index: true
category:
  - User Manual
  - Designer
order: 2
---
In the Oinone platform, the interface designer provides multiple view types to meet interface design requirements in different application scenarios.
The following is an introduction to five view types: form, table, detail, gallery, and tree view:
# 1. Form
The form view is a view type used for data input and display. It usually contains multiple fields (such as text boxes, drop-down lists, radio buttons, etc.), where users can input or select data. The form view is suitable for scenarios where users need to fill in and submit information, such as registration pages and information filling forms.
![Design Form Example Page](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-type/biaodan1.png)
:::tip Example
Form view display effect:
![Form Display Page Example](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-type/biaodan2.png)
:::
In the canvas design area, the form view will default to providing a form component, and the attributes configured in this form component can act on the entire form view.
+ Title arrangement: that is, the arrangement of the title and its content, which is divided into horizontal and vertical.
+ Disable data loading: after enabling this option, the data loading function will not be executed.
+ Loading function: if data loading is disabled, this attribute will not be displayed. When a certain option value is selected in the actual page, this function will be executed to load data.
+ Association update type: the data submission method when the association field in the form is updated, including full submission and incremental submission.
    - Full submission: submit all data.
    - Incremental submission: only submit updated data.
:::tip Example
If there are multiple fields in the form, and only the data of some fields have changed
+ When incremental submission is selected, only the data of these changed fields will be submitted
+ When full submission is selected, the data of all fields in the form will be submitted, regardless of whether they have changed.
:::
# 2. Detail
The detail view is used to display detailed information of data items and cannot be edited. It is usually used in conjunction with other views. Users can enter the detail view through links or buttons in other views to view the detailed information of data items. The detail view can contain multiple types of fields to provide rich information display.
![Design Detail Page Example](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-type/xiangqing1.png)
:::tip Example
Detail view display effect:
![Detail Display Page Example](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-type/xiangqing2.png)
:::
In the canvas design area, the detail view will default to providing a detail component, and the attributes configured in this detail component can act on the entire detail view.
+ Title arrangement: that is, the arrangement of the title and its content, which is divided into horizontal and vertical.
+ Disable data loading: after enabling this option, the data loading function will not be executed.
+ Loading function: if data loading is disabled, this attribute will not be displayed. When a certain option value is selected in the actual page, this function will be executed to load data.
# 3. Table
The table view is used to display data sets in the form of rows and columns. Each row represents a data item, and each column represents an attribute of the data item. It is suitable for scenarios that require intuitive display and operation of data sets, such as order management and customer lists.
:::warning Prompt
In addition to the regular table, the table also supports two advanced views, tree table and cascading, to meet more complex display requirements.
:::
![Design Table Page Example - Default Table](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-type/morenbiaoge1.png)
:::tip Example
Default table view display effect:
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-type/morenbiaoge2.png)
:::
In the canvas design area, the table view by default includes a search component and a table component. The attribute configuration of these two components will affect the global settings. When dragging other components into the canvas, they must be placed inside the search component or table component, otherwise the component cannot be successfully created.
## (1) Default Table
+ Search component attributes
    - Hide search button: if this option is enabled, all action buttons in the search component will be hidden. To perform a search, you can press the Enter key.
    - Disable folding: if this option is enabled, the search area will remain fixed and not allow expansion or collapse operations.
    - Tab label: when there are data dictionary type fields under the model where the page is located, a tab label can be set for the search component. After configuration, the search bar will be presented in the form of a tab.
+ Table component attributes
    - Enable serial number: if this option is enabled, the table will automatically add a serial number column in the first column to facilitate users to view the data order more conveniently.
    - Enable check box: if this option is enabled, the table will display a check box at the starting position, allowing users to check the required data items.
    - Auto column width: if this option is enabled, the width of the table header will be automatically adapted according to its content.
    - Minimum column width: that is, the minimum width allowed for each column of the table.
    - Row height: allows users to customize the row height of the table.
    - Number of operation columns displayed: the operation column on the far right of the table will default to displaying a certain number of operation items, and operation items exceeding this number will be folded up.
    - Operation column arrangement direction: the action items in the operation column on the far right of the table can be arranged horizontally or vertically.
    - Operation column width: allows users to customize the width of the operation column on the far right of the table.
    - Operation column button style: action items in the operation column can adopt different button styles, including primary button, secondary button, and no style.
        :::info Note
        Primary button: presented in the form of a button, with a background color, and highlighted.
        Secondary button: also presented in the form of a button, but without a background color, relatively low-key.
        No style: do not use button style, and action items are displayed in ordinary text form.
        :::
    - Paginator style: the display style of the paginator, providing three styles: simple, standard, and hidden.
    - Default number of pages: that is, the number of data entries displayed on each page.
    - Query conditions: in the actual page display, data will be displayed according to the configured query conditions.
    - Support expandable rows: if this option is enabled, the expandable row view can be set for the selected display fields.
        * Expand all by default: if this function is enabled, in the actual display page, all expandable rows will be directly presented without additional operations.
        * Expand operation display field definition: you can select fields from the model to which the current page belongs. After selection, in the actual display page, you can expand the field to view the set expandable row view.
        * Set expandable row view: you can customize the view of expandable rows according to the current model or associated model. Different models may provide different view types, please select according to the actual situation. You can choose to copy an existing page or use a new page to create an expandable row view.
        * Expandable row context: when data has different names in different positions but essentially refers to the same data, data mapping can be achieved by configuring the expandable row context.
    - Support tree display: if this function is enabled, the table data will be intuitively displayed in a tree structure according to the set associated fields and expandable fields.
        * Expand all by default: if this function is enabled, in the actual display page, all expandable rows will be directly presented without additional operations.
        * Associated field: you need to select a self-associated field from the model to which the table belongs as the basis for association in the tree structure.
        * Expandable field: you can select a field in the table as the expandable field of the tree structure to better display the hierarchy and relationship of the data.
    - Double-click action: allows users to customize the jump action, and when a row in the table is double-clicked, the set action will be automatically executed.
    - Allow table editing: if this function is enabled, users can directly edit data in the table without jumping to the edit page. This function provides three editing modes: whole row editing, cell editing, and custom editing.
        * Whole row editing: when the user clicks on a data item, the entire row of data will enter the editing state, facilitating the user to make comprehensive modifications to the row of data.
        * Cell editing: when the user clicks on a data item, only the specific cell will enter the editing state to achieve precise modification.
        * Custom editing: users can customize the scope of editing operations and specific editing actions according to actual needs, providing higher flexibility and personalized settings.
        :::info Note
        After enabling the allow table editing function, it is also necessary to further set whether to enable in-line editing for each field in the table. Only fields with in-line editing enabled will display the corresponding editing function in the table.
        :::
    - Allow sorting: after enabling this function, the table header will display a sorting icon, supporting users to customize the selection of ascending or descending sorting methods.
    - Default sorting field: after enabling the sorting function, the table will automatically sort and display according to the preset default sorting field.
    - Disable data loading: after enabling this option, the data loading function will not be executed.
    - Loading function: if data loading is disabled, this attribute will not be displayed. When a certain option value is selected in the actual page, this function will be executed to load data.
## (2) Tree Table
![Design Table Page Example - Tree Table](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-type/shubiao1.png)
:::tip Example
Table - Tree Table View Display Effect:
![Tree Table Display Page Example](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-type/shubiao2.png)
:::
The tree table is consistent with the default table in the search component and table component, and the difference is that the tree table additionally adds a tree structure. By setting the tree structure, the tree table can display data in a hierarchical form, making the data presentation clearer and more intuitive. Here, only the relevant attributes of the tree are introduced. For details of the search component and table component, please refer to the relevant introduction of the default table.
+ Linkage relationship: refers to the model fields that need to be displayed in the tree structure, and users can customize the setting of multi-layer linkage relationships.
    - Hierarchical association field: when setting a multi-layer linkage relationship, this attribute will be displayed from the second level and subsequent levels, and is used to define the association field with the upper-level model.
    - Data title: that is, the name of the option value. When multiple selections are made, these data will be spliced and displayed. The default option field is the name.
    - Filter conditions: in the actual page display, data will be displayed according to the configured filter conditions.
    - Table association field: refers to the association field between the current level model and the model selected by the page.
    - Self-association field: refers to the field in the current level model that is consistent with its own model.
:::info Note
A complete association field must be formed to successfully generate the linkage relationship.
:::
+ Support search: if this function is enabled, a search box will be displayed in the tree structure, and hierarchical fields can be filtered.
+ Expand level: if a multi-layer linkage relationship is set, you can specify which level to expand to.
## (3) Cascading
Similar to the tree table, the difference is that a cascading component is added to the cascading. In the actual page display, the tree table will dynamically display sub-options below, while the cascading will dynamically display sub-options on the right. Here, only the relevant attributes of the cascading are introduced. For details of the search component and table component, please refer to the relevant introduction of the default table.
![Design Table Page Example - Cascading](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-type/jilianbiaoge1.png)
:::tip Example
Table - Cascading View Display Effect:
![Cascading Display Page Example](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-type/jilianbiaoge2.png)
:::
+ Linkage relationship: refers to the model fields that need to be displayed in the tree structure, and users can customize the setting of multi-layer linkage relationships.
    - Hierarchical association field: when setting a multi-layer linkage relationship, this attribute will be displayed from the second level and subsequent levels, and is used to define the association field with the upper-level model.
    - Data title: that is, the name of the option value. When multiple selections are made, these data will be spliced and displayed. The default option field is the name.
    - Filter conditions: in the actual page display, data will be displayed according to the configured filter conditions.
    - Table association field: refers to the association field between the current level model and the model selected by the page.
    - Self-association field: refers to the field in the current level model that is consistent with its own model.
:::info Note
A complete association field must be formed to successfully generate the linkage relationship.
:::
+ Support search: if this function is enabled, a search box will be displayed in the tree structure, and hierarchical fields can be filtered.
# 4. Gallery
The gallery view displays content items in the form of cards, allowing users to intuitively browse different content items. It is suitable for scenarios that need to display visually rich content, such as product displays and photo album browsing.
![Design Gallery Page Example - Design Card](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-type/hualang1.png)
![Design Gallery Page Example - Design Other](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-type/hualang2.png)
:::tip Example
Gallery view display effect:
![Gallery Display Page Example](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-type/hualang3.png)
:::
In the canvas design area, the gallery view consists of two pages: "Design Card" and "Design Other". On the "Design Card" page, users can design a single card view in the gallery, which includes three areas: title area, content area, and action area. They can drag components to set them by themselves, and the design effect will be applied to all cards. The "Design Other" page by default includes a search component and a gallery component, and the attribute configuration of these two components will affect the global settings.
+ Card attributes:
    - Border visibility: you can customize whether the four sides of the border are visible.
    - Border color: when there is a visible border, this attribute is displayed. You can set the color for the visible border.
+ Search component attributes
    - Hide search button: if this option is enabled, all action buttons in the search component will be hidden. To perform a search, you can press the Enter key.
    - Disable folding: if this option is enabled, the search area will remain fixed and not allow expansion or collapse operations.
    - Tab label: when there are data dictionary type fields under the model where the page is located, a tab label can be set for the search component. After configuration, the search bar will be presented in the form of a tab.
+ Gallery component attributes
    - Number of cards displayed in a row: that is, the number of cards that can be displayed in a row.
    - Paginator style: the display style of the paginator, providing three styles: simple, standard, and hidden.
    - Default number of pages: that is, the number of data entries displayed on each page.
    - Query conditions: in the actual page display, data will be displayed according to the configured query conditions.
    - Disable data loading: after enabling this option, the data loading function will not be executed.
    - Loading function: if data loading is disabled, this attribute will not be displayed. When a certain option value is selected in the actual page, this function will be executed to load data.
# 5. Tree View
The tree view is used to display data items in a hierarchical structure. Each data item can contain sub-items, forming a hierarchical structure. The tree view supports expand and collapse operations, which is convenient for users to view and manage data with hierarchical relationships. It is suitable for scenarios that need to display data with hierarchical relationships, such as organizational charts and classification directories.
:::info Note
The tree table in the table is different from the tree table in the tree view, and the same is true for cascading:
+ The tree table in the table uses the table's model as the main model
+ The tree table in the tree view uses the tree table's model as the main model, and the left form is the expanded content part.
:::
The tree view is divided into two types: tree table and cascading, which are composed of a cascading component (or tree component) and a selected view type component. The relevant attributes of the form component have been described in detail above, and will not be repeated here.
## (1) Tree Table
![Design Tree View Page Example - Tree Table](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-type/shushitu-shubiao1.png)
:::tip Example
Tree View - Tree Table View Display Effect:
![Tree View Display Page Example - Tree Table](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-type/shushitu-shubiao2.png)
:::
+ Linkage relationship: refers to the model fields that need to be displayed in the tree structure, and users can customize the setting of multi-layer linkage relationships.
    - Hierarchical association field: when setting a multi-layer linkage relationship, this attribute will be displayed from the second level and subsequent levels, and is used to define the association field with the upper-level model.
    - Data title: that is, the name of the option value. When multiple selections are made, these data will be spliced and displayed. The default option field is the name.
    - Filter conditions: in the actual page display, data will be displayed according to the configured filter conditions.
    - Self-association field: refers to the field in the current level model that is consistent with its own model.
+ Support expand page: after enabling this function, you can set the expand row view. In the tree structure of the actual display page, after selecting an item, the view will be displayed.
    - View type: users can choose the type of expand row view, including two options: "detail" and "form".
    - Page model: refers to the model associated with the current page.
    - Page content: users can choose to copy an existing page or use a new page. When choosing to use a new page, you can customize the content under the selected view type.
    - Copy page: when choosing to copy an existing page, this attribute will be displayed. Users can choose to copy a published page that meets the view type under the current model.
+ Support search: if this function is enabled, a search box will be displayed in the tree structure, and hierarchical fields can be filtered.
+ Expand level: supports specifying which level the page defaults to expand to.
## (2) Cascading
![Design Tree View Page Example - Cascading](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-type/shushitu-jilian.png)
:::tip Example
Tree View - Cascading View Display Effect:
![Tree View Display Page Example - Cascading](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-type/shushitu-jilian2.png)
:::
:::info Note
When there are more than two levels of linkage relationships, they will be presented in a cascading manner in the actual display page. When there is only one level of linkage relationship, the actual display page is the same as the display page of the tree view.
:::
+ Linkage relationship: refers to the model fields that need to be displayed in the tree structure, and users can customize the setting of multi-layer linkage relationships.
    - Hierarchical association field: when setting a multi-layer linkage relationship, this attribute will be displayed from the second level and subsequent levels, and is used to define the association field with the upper-level model.
    - Data title: that is, the name of the option value. When multiple selections are made, these data will be spliced and displayed. The default option field is the name.
    - Filter conditions: in the actual page display, data will be displayed according to the configured filter conditions.
    - Self-association field: refers to the field in the current level model that is consistent with its own model.
    - Title: that is, the title of each cascading box.
+ Support expand page: after enabling this function, you can set the expand row view. In the cascading structure of the actual display page, after selecting an item, the view will be displayed.
    - View type: users can choose the type of expand row view, including two options: "detail" and "form".
    - Page model: refers to the model associated with the current page.
    - Page content: users can choose to copy an existing page or use a new page. When choosing to use a new page, you can customize the content under the selected view type.
    - Copy page: when choosing to copy an existing page, this attribute will be displayed. Users can choose to copy a published page that meets the view type under the current model.
+ Support search: if this function is enabled, a search box will be displayed in the cascading structure, and hierarchical fields can be filtered.