---
title: Fields
index: true
category:
  - User Manual
  - Designer
order: 2
---
# I. General Attributes
## Form
+ Creation Attribute: Similar to creating fields in the model designer, when creating a field-type component, a corresponding field will be added under the model of the current page.
+ Title: The display name of the component on the current page.
+ Hide Title: When this option is enabled, the title of the component will be hidden.
+ Placeholder Prompt: When the input box or selection box is empty, it shows light-colored prompt text to guide users to input, which does not affect the actual value of the field.
+ Description: Provides descriptive information about the component, usually used to explain the scope and precautions of the field, helping users better understand and fill in. For field-type components, the description will be displayed below the component.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/tongyong1.png)

+ Default Value: When the actual page is displayed, the field will show the set value by default. If the field is deleted or changed, the original default value will not be automatically filled back.
+ Calculation Formula: If the calculated value involves variables, when the variables change, the calculated value will change synchronously.

:::info Note

If both the default value and the calculation formula are set, on the actual page, the default value will be filled in first, and then the field value will change according to the calculation function.

:::

:::warning Tip

For the filling of custom expressions in the calculation formula, you can refer to the "Custom Expressions" document.

:::

+ Read-only: If set to read-only, on the actual page, the field is visible but cannot be edited. If conditional read-only is set, it will be read-only when the conditions are met.
+ Disabled: If set to disabled, on the actual page, the field is visible but cannot be edited. If conditional disable is set, it will be disabled when the conditions are met.

:::warning Tip

Generally, set read-only for field-type components and set disabled for action-type components.

:::

+ Hidden: If set to hidden, on the actual page, the field is invisible and cannot be edited. If conditional hiding is set, it will be hidden when the conditions are met. When designing the page, the hidden component will still be displayed.
+ Required: You can control whether the field is required on the current page. If set to required, an asterisk (*) will be displayed before the title. If conditional requirement is set, it will be required when the conditions are met.
+ Data Validation: Supports custom validation rules to check whether the input data meets the set requirements.

:::warning Tip

For the filling of custom expressions in data validation, you can refer to the "Custom Expressions" document.

:::

+ Validation Failure Prompt: When the input data fails the validation, the corresponding prompt message will be displayed.
+ Submit Data: When the switch is enabled, if the current field changes, the data scope covered by the submission method will be changed according to the submission function.
+ Clear Data: When the switch is enabled, if the current field changes, the selected field scope will be cleared.
+ Title Arrangement: That is, the arrangement of the title and its content, which is divided into horizontal and vertical arrangements.
+ Width: That is, the size of the component in the current row.
+ Display Devices: Include PC, mobile, and PAD.

:::tip Example

When designing a PC page, if the display device of a component is set to only mobile and does not include PC, on the actual page, the component and other components it contains will not be displayed on the PC page.

:::

+ Show Clear Button: When this function is enabled, when there is content in the input box, users can clear the input content with one click.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/tongyong2.png)

## Table
+ Title: The display name of the component on the current page.
+ Calculation Formula: If the calculated value involves variables, when the variables change, the calculated value will change synchronously.
+ Hidden: If set to hidden, on the actual page, the field is invisible and cannot be edited. If conditional hiding is set, it will be hidden when the conditions are met. When designing the page, the hidden component will still be displayed.
+ Inline Editing: When enabled, the field content can be directly edited in the cell. If conditional enablement is set, editing will be supported when the conditions are met.
    - Required: You can control whether the field is required on the current page. If set to required, an asterisk (*) will be displayed before the title. If conditional requirement is set, it will be required when the conditions are met.
    - Data Validation: Supports custom validation rules to check whether the input data meets the set requirements.
    - Validation Failure Prompt: When the input data fails the validation, the corresponding prompt message will be displayed.
    - Double Confirmation: When this function is enabled, before performing an action, a confirmation box will pop up for double confirmation. You can customize the prompt type, direction, text, and other content of the pop-up box.
    - Support Prefix/Suffix: Supports adding prefixes and suffixes to the input content. The prefix and suffix types can be text or icons. When the text type is selected, you can choose whether to store the prefix/suffix content to simplify the operation process when the data highly overlaps.
+ Field Action Configuration: When this function is enabled, when you click on the field data, the pre-configured action will be executed.
    - Operation Method: Used to select the operation method of the field, which can be single-click or double-click.
    - Specify Click Action: You can customize the specific action to be executed when clicking on the field. The selection range is limited to the action options included in the current table row.
+ Fixed Column Width: Used to specify the fixed width of the column where the field is located in the table. Once the fixed column width is set, the width of this column will remain constant regardless of the number of columns in the table.
+ Minimum Column Width: Used to set the minimum width of the column where the field is located in the table. When the column width in the table changes, the minimum shrinkable value will be limited by the set minimum column width.

:::info Note

1. If the set value of the fixed column width is less than the minimum column width, the minimum column width will be used as the actual displayed column width.
2. After manually adjusting the table column width, the previously set fixed column width and minimum column width will no longer be effective. You need to restore their default values through the table header settings for these settings to take effect again.

:::

+ Header Alignment: That is, the alignment of the content in the table header cells, including left alignment, center alignment, and right alignment.
+ Content Alignment: That is, the alignment of the content in the data cells in the table, including left alignment, center alignment, and right alignment.
+ Display Devices: Include PC, mobile, and PAD.
+ Allow Sorting: When this function is enabled, a sorting icon will be displayed in the column where the field is located, allowing users to customize the ascending or descending sorting method.

# II. Specific Attributes
## (Ⅰ) Single-line Text
A single-line text box is suitable for recording short text content such as names and codes.

:::tip Example

Design Example:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/danhang1.png)

Display Page:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/danhang2.png)

:::

Specific attributes of single-line text:

+ Creation Attribute
    - Field Business Type: Only supports text type.
+ Text Type: Includes text and password, with text as the default. If set to text, the input content will be visible; if set to password, the input content will be invisible.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/danhang3.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/danhang4.png)

+ Maximum/Minimum Length: You can set the length range of the input content, including the maximum and minimum lengths, to limit user input.
+ Input Format: Provides multiple input format restriction options, including no restriction, URL, ID card, and custom. When custom is selected, you can define the specific format through a regular expression and set the prompt message when the format does not match.
+ Support Prefix/Suffix: Supports adding prefixes and suffixes to the input content. The prefix and suffix types can be text or icons. When the text type is selected, you can choose whether to store the prefix/suffix content to simplify the operation process when the data highly overlaps.
+ Show Counter: If users need to pay attention to the length of the input content, they can enable the show counter function to see the current length of the content in real-time while inputting.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/danhang5.png)

## (Ⅱ) Multi-line Text
A multi-line text box is suitable for recording long text content such as opinions and remarks.

:::tip Example

Design Example:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/duohang1.png)

Display Page:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/duohang2.png)

:::

Specific attributes of multi-line text:

+ Creation Attribute
    - Field Business Type: Only supports multi-line text type.
+ Maximum/Minimum Length: You can set the length range of the input content, including the maximum and minimum lengths, to limit user input.
+ Show Counter: If users need to pay attention to the length of the input content, they can enable the show counter function to see the current length of the content in real-time while inputting.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/duohang3.png)

## (Ⅲ) Rich Text
A WYSIWYG text editor that can be embedded in the browser, similar to Word in function. It is suitable for editing long descriptive text and supports operations such as changing font styles and inserting pictures.

:::tip Example

Design Example:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/fuwenben1.png)

Display Page:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/fuwenben2.png)

:::

Specific attributes of rich text:

+ Creation Attribute
    - Field Business Type: Only supports rich text type.
+ Height: Refers to the size of the component displayed on the actual page.

## (Ⅳ) Integer
Only allows integer input, suitable for inputting integer data such as days and quantities.

:::tip Example

Design Example:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/zhengshu1.png)

Display Page:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/zhengshu2.png)

:::

Specific attributes of integers:

+ Creation Attribute
    - Field Business Type: Only supports integer type.
+ Maximum/Minimum Value: You can set the value range of the input content, including the maximum and minimum values, to limit user input.
+ Support Prefix/Suffix: Supports adding prefixes and suffixes to the input content. The prefix and suffix types can be text or icons. When the text type is selected, you can choose whether to store the prefix/suffix content to simplify the operation process when the data highly overlaps.
+ Show Thousands Separator: When this function is enabled, when the input value is large, it will be displayed in thousands separator format.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/zhengshu3.png)

## (Ⅴ) Decimal
Only allows decimal input, suitable for inputting decimal data such as amounts and temperatures.

:::tip Example

Design Example:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/xiaoshu1.png)

Display Page:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/xiaoshu2.png)

:::

Specific attributes of decimals:

+ Creation Attribute
    - Field Business Type: Only supports floating-point type.
    - Precision: Limits the precision range of decimals, and its value must be between 1 and 2.
+ Maximum/Minimum Value: You can set the value range of the input content, including the maximum and minimum values, to limit user input.
+ Decimal Places: Its value must be within the precision range set when creating the component.
+ Support Prefix/Suffix: Supports adding prefixes and suffixes to the input content. The prefix and suffix types can be text or icons. When the text type is selected, you can choose whether to store the prefix/suffix content to simplify the operation process when the data highly overlaps.
+ Show Thousands Separator: When this function is enabled, when the input value is large, it will be displayed in thousands separator format.

## (Ⅵ) Drop-down Single Selection
Allows users to select one data value from multiple options in a drop-down list. The options can be associated with model data, data dictionaries, or boolean data, suitable for single-selection scenarios.

:::tip Example

Design Example:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/xldx1.png)

Display Page:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/xldx2.gif)

:::

Specific attributes of drop-down single selection:

+ Creation Attribute
    - Field Business Type: Supports boolean, data dictionary, and many-to-one.

:::info Note

+ For data dictionaries, existing data dictionaries need to be selected.
+ For many-to-one, the associated model needs to be set.

:::

+ Option Type: That is, the field business type at creation, which cannot be changed.
+ Auto-fill Data Dictionary Options: When the field business type is a data dictionary, this attribute is displayed. If this option is enabled, adding dictionary items to the data dictionary will be updated synchronously.
+ Option Field: When the field business is many-to-one, this attribute is displayed. You can select a specific field as the option value. When multiple selections are made, these option values will be concatenated and displayed. The default option field is the name.

:::warning Tip

You can set constant content as a separator between option fields, such as "-" or "/".

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/xldx3.png)![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/xldx4.png)

:::

+ Search Field: When the field business is many-to-one, this attribute is displayed. When users input content in the input box, if the input content is included in the search field, the values containing this content will be displayed as search results. By default, all option fields are set as search fields. You can choose whether to use existing search conditions as needed.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/xldx5.png)

+ Exposed Field: When the field business is many-to-one, this attribute is displayed. The selection range is limited to the model fields bound to the component. When a field is set as an exposed field, it means that this field can be used in the current view.
+ Query Condition: When the field business is many-to-one, this attribute is displayed. On the actual page, data will be displayed according to the configured query conditions.

:::warning Tip

For the filling of custom expressions in query conditions, you can refer to the "Custom Expressions" document.

:::

+ Data Loading Function: When the field business is many-to-one, this attribute is displayed. When an option value is selected on the actual page, this function will be executed to load data.
+ Option Configuration: When the field business is boolean or a data dictionary, this attribute is displayed.
    - After selecting an option row, you can directly drag it to change its position.
    - Click the radio button before an option to set this option as the default value for drop-down single selection. This default value will be directly displayed on the actual page.
    - Click the "Edit" icon to modify the display value of this option, making the same data dictionary or boolean value applicable in different scenarios.
    - Click "Hide/Show" to control whether this option is visible at runtime. All dictionary items are visible by default.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/xldx6.png)

## (Ⅶ) Drop-down Multiple Selection
Allows users to select multiple data values from multiple options in a drop-down list. The options can be associated with model data, data dictionaries, or boolean data, suitable for multiple-selection scenarios.

:::tip Example

Design Example:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/xlduox1.png)

Display Page:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/xlduox2.gif)

:::

Specific attributes of drop-down multiple selection:

+ Creation Attribute
    - Field Business Type: Supports data dictionary, one-to-many, and many-to-many.

:::info Note

+ For data dictionaries, existing data dictionaries need to be selected.
+ For one-to-many and many-to-many, the associated model needs to be set.

:::

+ Option Type: That is, the field business type at creation, which cannot be changed.
+ Auto-fill Data Dictionary Options: When the field business type is a data dictionary, this attribute is displayed. If this option is enabled, adding dictionary items to the data dictionary will be updated synchronously.
+ Option Configuration: When the field business is a data dictionary, this attribute is displayed.
    - After selecting an option row, you can directly drag it to change its position.
    - Click the radio button before an option to set this option as the default value for drop-down single selection. This default value will be directly displayed on the actual page.
    - Click the "Edit" icon to modify the display value of this option, making the same data dictionary or boolean value applicable in different scenarios.
    - Click "Hide/Show" to control whether this option is visible at runtime. All dictionary items are visible by default.
+ Option Field: When the field business is one-to-many or many-to-many, this attribute is displayed. You can select a specific field as the option value. When multiple selections are made, these option values will be concatenated and displayed. The default option field is the name.

:::warning Tip

You can set constant content as a separator between option fields, such as "-" or "/".

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/xlduox3.png)![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/xlduox4.png)

:::

+ Search Field: When the field business is one-to-many or many-to-many, this attribute is displayed. When users input content in the input box, if the input content is included in the search field, the values containing this content will be displayed as search results. By default, all option fields are set as search fields. You can choose whether to use existing search conditions as needed.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/xlduox5.png)

+ Exposed Field: When the field business is one-to-many or many-to-many, this attribute is displayed. The selection range is limited to the model fields bound to the component. When a field is set as an exposed field, it means that this field can be used in the current view.
+ Query Condition: When the field business is one-to-many or many-to-many, this attribute is displayed. On the actual page, data will be displayed according to the configured query conditions.

:::warning Tip

For the filling of custom expressions in query conditions, you can refer to the "Custom Expressions" document.

:::

+ Data Loading Function: When the field business is one-to-many or many-to-many, this attribute is displayed. When an option value is selected on the actual page, this function will be executed to load data.
+ Maximum/Minimum Selection Count: You can limit the selection count range, including the maximum and minimum selection counts, to limit user input.

## (Ⅷ) Radio Button
Allows users to select only one value from directly displayed options, suitable for single-option scenarios such as gender selection.

:::tip Example

Design Example:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/dxk1.png)

Display Page:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/dxk2.gif)

:::

Specific attributes of radio buttons:

+ Creation Attribute
    - Field Business Type: Supports boolean, data dictionary, and many-to-one.

:::info Note

+ For data dictionaries, existing data dictionaries need to be selected.
+ For many-to-one, the associated model needs to be set.

:::

+ Option Type: That is, the field business type at creation, which cannot be changed.
+ Auto-fill Data Dictionary Options: When the field business type is a data dictionary, this attribute is displayed. If this option is enabled, adding dictionary items to the data dictionary will be updated synchronously.
+ Option Field: Same as drop-down single selection.
+ Exposed Field: Same as drop-down single selection.
+ Query Condition: Same as drop-down single selection.
+ Data Loading Function: Same as drop-down single selection.
+ Style: When the field business is boolean or a data dictionary, this attribute is displayed. Two display styles are provided for selection: default style and segmented selector.

:::info Note

+ When the default style is selected, you can set the option arrangement according to actual needs, including horizontal and vertical arrangements.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/dxk3.png)![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/dxk4.png)

+ When the segmented selector is selected, you can set the maximum number of options displayed in a single line according to actual needs.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/dxk5.png)

:::

+ Option Configuration: Same as drop-down single selection.

## (Ⅸ) Checkbox
Allows users to select multiple values from directly displayed options, suitable for multiple-option scenarios such as course selection.

:::tip Example

Design Example:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/fxk1.png)

Display Page:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/fxk2.gif)

:::

Specific attributes of checkboxes:

+ Creation Attribute
    - Field Business Type: Supports data dictionary, one-to-many, and many-to-many.

:::info Note

+ For data dictionaries, existing data dictionaries need to be selected.
+ For one-to-many and many-to-many, the associated model needs to be set.

:::

+ Option Type: That is, the field business type at creation, which cannot be changed.
+ Auto-fill Data Dictionary Options: When the field business type is a data dictionary, this attribute is displayed. If this option is enabled, adding dictionary items to the data dictionary will be updated synchronously.
+ Arrangement: Same as drop-down multiple selection.
+ Option Configuration: Same as drop-down multiple selection.
+ Option Field: Same as drop-down multiple selection.
+ Exposed Field: Same as drop-down multiple selection.
+ Query Condition: Same as drop-down multiple selection.
+ Data Loading Function: Same as drop-down multiple selection.
+ Maximum/Minimum Selection Count: Same as drop-down multiple selection.

## (Ⅹ) Switch
Often used to select between two opposite options, such as yes/no.

:::tip Example

Design Example:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/kg1.png)

Display Page:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/kg2.gif)

:::

Specific attributes of switches:

+ Creation Attribute
    - Field Business Type: Only supports boolean type.

## (Ⅺ) Year
Provides a year selector function, suitable for scenarios where a specific year needs to be selected, such as birth year.

:::tip Example

Design Example:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/nf1.png)

Display Page:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/nf2.gif)

:::

Specific attributes of years:

+ Creation Attribute
    - Field Business Type: Only supports year type.

## (Ⅻ) Date
Provides a year-month-day selector, suitable for fields that need to be accurate to the date, such as employment date and birth date.

:::tip Example

Design Example:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/rq1.png)

Display Page:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/rq2.gif)

:::

Specific attributes of dates:

+ Creation Attribute
    - Field Business Type: Only supports date type.
+ Date Format: Provides a variety of date format options. You can choose a suitable date format according to actual needs.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/rq3.png)

+ Start Date: Used to limit the earliest start time of selectable dates.
+ End Date: Used to limit the latest end time of selectable dates.
+ Offset: You can set an offset to make the start date or end date move forward or backward by a specified time.
+ Quick Options: Used to quickly specify selectable time.

## (XIII) Date and Time
Provides a comprehensive year-month-day, hour-minute-second selector, suitable for fields that need to be accurate to a specific time, such as order time and shipping time.

:::tip Example

Design Example:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/rqsj1.png)

Display Page:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/rqsj2.gif)

:::

Specific attributes of date and time:

+ Creation Attribute
    - Field Business Type: Only supports date and time type.
+ Date Format: Provides a variety of date format options. You can choose a suitable date format according to actual needs.
+ Time Format: Provides a variety of time format options. You can choose a suitable time format according to actual needs.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/rqsj3.png)![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/rqsj4.png)

+ Start Date: Used to limit the earliest start time of selectable dates.
+ End Date: Used to limit the latest end time of selectable dates.
+ Offset: You can set an offset to make the start date or end date move forward or backward by a specified time.
+ Quick Options: Used to quickly specify selectable time.

## (XIV) Time
Provides an hour-minute-second selector, suitable for fields that only involve time and not dates, such as submission time and working time.

:::tip Example

Design Example:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/sj1.png)

Display Page:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/sj2gif)

:::

Specific attributes of time:

+ Creation Attribute
    - Field Business Type: Only supports time type.
+ Time Format: Provides a variety of time format options. You can choose a suitable time format according to actual needs.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/sj3.png)

## (XV) Color Picker
Provides a custom color function, suitable for scenarios such as setting label colors and selecting colors for theme customization.

:::tip Example

Design Example:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/ys1.png)

Display Page:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/ys2.gif)

:::

Specific attributes of colors:

+ Creation Attribute
    - Text Field Business Type: Only supports text type.

## (XVI) File Upload
Supports uploading files in multiple formats, including documents, pictures, videos, etc., suitable for uploading attachments.

:::tip Example

Design Example:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/wj1.png)

Display Page:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/wj2.gif)

:::

Specific attributes of file upload:

+ Creation Attribute
    - Field Business Type: Supports text, multi-line text, one-to-many, many-to-one, and many-to-many.

:::info Note

When the field business type is one-to-many, many-to-one, or many-to-many, the associated model can only be associated with files.

:::

+ Maximum Number of Uploaded Files: When the field business is one-to-many or many-to-many, this attribute is displayed. Limits the maximum number of files that can be uploaded.
+ Maximum Upload File Size: Limits the size of a single uploaded file.
+ Restricted Upload File Types: Limits the upload format of files, supporting multiple types such as pictures, documents, audio, and videos, and also provides a custom option. When customizing, you need to enter the format suffix of the supported files.

:::info Note

If a certain format is allowed, files of other formats cannot be selected in the file selection dialog box.

:::

+ CDN Configuration: Supports CDN configuration.
+ Private Link: You can choose whether to use a private link.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/wj3.png)

## (XVII) Image Upload
Supports uploading image files, suitable for scenarios such as uploading schematic diagrams, photos, and avatars.

:::tip Example

Design Example:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/tp1.png)

Display Page:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/tp2.gif)

:::

:::warning Tip

If the link length is too long when uploading an image, you can modify the length of the component field in the model designer.

:::

Specific attributes of images:

+ Creation Attribute
    - Field Business Type: Supports text, multi-line text, one-to-many, many-to-one, and many-to-many.

:::info Note

When the field business type is one-to-many, many-to-one, or many-to-many, the associated model can only be associated with files.

:::

+ Maximum Number of Uploaded Images: When the field business is one-to-many or many-to-many, this attribute is displayed. Limits the maximum number of images that can be uploaded.
+ Maximum Upload Image Size: Limits the size of a single uploaded image.
+ Restricted Upload File Types: Limits the upload format of files, supporting pictures and a custom option. When customizing, you need to enter the format suffix of the supported files.

:::info Note

If a certain format is allowed, files of other formats cannot be selected in the file selection dialog box.

:::

## (XVIII) Tag
Allows users to input and save multiple values, suitable for saving tags for users.

:::info Note

Tag values are not allowed to be repeated.

:::

:::tip Example

Design Example:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/bq1.png)

Display Page:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/bq2.gif)

:::

Specific attributes of tags:

+ Creation Attribute
    - Field Business Type: Supports integer and text.
    - When the field type is a storage field, you can also set a quantity limit and a single-value length for it.

:::info Note

+ Quantity Limit: The maximum number of tags that can be stored, and its value cannot be less than 1.
+ Single-value Length: The length of a single tag, and its value cannot be less than 1.

:::

+ Quantity Limit: Same as the quantity limit in the creation attribute, the maximum number of tags that can be stored, and its value cannot be less than 1.

## (XIX) Cascading Selection
Allows users to filter and locate the required data through step-by-step selection, suitable for scenarios such as region selection and category filtering.

:::tip Example

Design Example:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/jl1.png)

Display Page:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/jl2.gif)

:::

Specific attributes of cascading selection:

+ Creation Attribute
    - Field Business Type: Supports one-to-many, many-to-one, and many-to-many.
+ Set Linkage Relationship: That is, the model fields to be displayed in the component.
    - Model: The model where the fields to be displayed are located.

    :::info Note

    This model needs to be consistent with the associated model selected when creating the cascading component; otherwise, a complete linkage relationship cannot be formed.

    :::

    - Data Title: That is, the option value name. When multiple selections are made, these data will be concatenated and displayed. The default option field is the name.

    :::warning Tip

    You can set constant content as a separator between option fields, such as "-" or "/".

    :::

    - Filter Conditions: On the actual page, data will be displayed according to the configured filter conditions.

    :::warning Tip

    For the filling of custom expressions in filter conditions, you can refer to the "Custom Expressions" document.

    :::

    - Self-associated Relationship Field: That is, the associated relationship field in the selected model, and the model of this field is consistent with the selected model.

    :::info Note

    This relationship field is used to set the hierarchy during cascading selection.

    :::

+ Maximum/Minimum Selection Count: When the field business type is one-to-many or many-to-many, this attribute is displayed. You can limit the selection count range, including the maximum and minimum selection counts, to limit user input.
+ Select and Change: If this function is enabled, any level can be used as the end point when selecting. That is, after selecting an item, if there are sub-options under this item, they will be directly all selected. If this option is not enabled, only the last-level sub-options can be selected.

:::info Note

This function is only effective when the field business type is many-to-one. Only a single value can be selected during selection.

:::

+ Display Selection Path: When the field business type is one-to-many or many-to-many, this attribute is displayed. If this function is enabled, after selecting an option, its complete selection path will be displayed.

:::info Note

When the field business is many-to-one, this function is automatically enabled.

:::

## (XX) Tree Selection
Allows users to filter and locate the required data through step-by-step selection, suitable for scenarios such as region selection and category filtering.

:::tip Example

Design Example:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/shu1.png)

Display Page:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/shu2.gif)
:::

Specific attributes of tree selection:

+ Creation Attribute
    - Field Business Type: Supports one-to-many, many-to-one, and many-to-many.
+ Set Linkage Relationship: That is, the model fields to be displayed in the component.
    - Model: The model where the fields to be displayed are located.
    - Data Title: That is, the option value name. When multiple selections are made, these data will be concatenated and displayed. The default option field is the name.

    :::warning Tip

    You can set constant content as a separator between option fields, such as "-" or "/".

    :::

    - Filter Conditions: On the actual page, data will be displayed according to the configured filter conditions.

    :::warning Tip

    For the filling of custom expressions in filter conditions, you can refer to the "Custom Expressions" document.

    :::

    - Self-associated Relationship Field: That is, the associated relationship field in the selected model, and the model of this field is consistent with the selected model.
+ Maximum/Minimum Selection Count: When the field business type is one-to-many or many-to-many, this attribute is displayed. You can limit the selection count range, including the maximum and minimum selection counts, to limit user input.

## (XXI) Key-Value Pair
Displays structured information in a clear and intuitive way, which is very suitable for scenarios such as product detail display and user configuration option settings.

:::info Note

Fields are not allowed to have duplicate keys.

:::

:::tip Example

Design Example:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/jzd1.png)

Display Page:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/jzd2.gif)

:::

Specific attributes of key-value pairs:

+ Creation Attribute
    - Field Business Type: Only supports key-value pairs.
    - When the field type is a storage field, you can also set a quantity limit, key length, and value length for it.

:::info Note

+ Quantity Limit: The maximum number of tags that can be stored, and its value cannot be less than 1.
+ Key Length: Limits the length of the key value, and its value cannot be less than 1.
+ Value Length: Limits the length of the value, and its value cannot be less than 1.

:::

## (XXII) Range
Supports specifying a range for time, which is convenient for flexible application in scenarios such as time interval prompts.

:::info Note

The end date must be after the start date.

:::

:::tip Example

Design Example:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/fw1.png)

Display Page:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/fw2.gif)

:::

Specific attributes of ranges:

+ Creation Attribute
    - Field Business Type: Supports year, date, date and time, and time.
+ Start Placeholder Prompt: When the start time input box or selection box is empty, it shows light-colored prompt text to guide users to input, which does not affect the actual value of the field.
+ End Placeholder Prompt: When the end time input box or selection box is empty, it shows light-colored prompt text to guide users to input, which does not affect the actual value of the field.
+ Start Default Value: When the actual page is displayed, the field will show the set start time by default.
+ End Default Value: When the actual page is displayed, the field will show the set end time by default.
+ Date Format: When the field business is date or date and time, this attribute is displayed.
+ Time Format: When the field business is date and time or time, this attribute is displayed.

## (XXIII) Phone
Specifically used to store or display data of the mobile phone number type.

:::info Note

Input Rule: It must start with the digit 1, the second digit ranges from 3 to 9, and the total number of digits is 11.

:::

:::tip Example

Design Example:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/phone1.png)

Display Page:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/phone2gif)

:::

Specific attributes of phones:

+ Creation Attribute
    - Field Business Type: Only supports mobile phones.
+ Support Prefix/Suffix: Supports adding prefixes and suffixes to the input content. The prefix and suffix types can be text or icons. When the text type is selected, you can choose whether to store the prefix/suffix content to simplify the operation process when the data highly overlaps.


## (XXIV) Currency
Used to store or display amount-type data, allowing input of integers or decimals with the number of decimal places accurate to within two.

:::tip Example
Design Example:
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/hb1.png)
Display Page:
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/hb2.gif)
:::

Specific attributes of currency:

+ Creation Attribute
    - Field Business Type: Only supports amount
    - When the field type is a storage field, length and precision can also be set for it.

:::info Note
+ Length: Limits the length range of the value, with values ranging from 1 to 15.
+ Precision: Limits the precision range of decimals, with values ranging from 1 to 6.
:::

+ Maximum/Minimum Value: Can set the value range of input content, including maximum and minimum values, to limit user input.
+ Number of Decimal Places Reserved: Its value must be within the precision range set when creating the component.
+ Support Prefix/Suffix: Supports adding prefixes and suffixes to input content. Prefix and suffix types can be text or icons. When the text type is selected, you can choose whether to store the prefix/suffix content to simplify the operation process when data highly overlaps.
+ Show Thousands Separator: When this function is enabled, large input values will be displayed in thousands separator format.

## (XXV) Email
Used to store or display data in compliance with the email format (xx@xx.xx), facilitating users' information exchange and management.

:::tip Example
Design Example:
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/yx1.png)
Display Page:
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/yx2.gif)
:::

Specific attributes of email:

+ Creation Attribute
    - Field Business Type: Only supports email
    - When the field type is a storage field, length can also be set for it.

:::info Note
+ Length: Limits the length range of the value, with values ranging from 3 to 256.
:::

+ Support Prefix/Suffix: Supports adding prefixes and suffixes to input content. Prefix and suffix types can be text or icons. When the text type is selected, you can choose whether to store the prefix/suffix content to simplify the operation process when data highly overlaps.

## (XXVI) Cross-table Field
A special field that can extract corresponding fields from associated relationship fields and flatten them in the current model. Suitable for referencing data information from related tables when generating complex reports.

:::tip Example
Design Example:
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/tb1.png)
Display Page:
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/tb2.png)
:::

Specific attributes of cross-table field:

+ Creation Attribute
    - Field Business Type: Only supports cross-table field
    - Associated Field: That is, the field with an associated relationship under the model where the current page is located.
    - Display Field: Selects the field existing under the model of the associated field.

## (XXVII) Paragraph
Allows displaying a complete paragraph of text content on the page, suitable for scenarios such as detailed explanation, description, or elaboration of products.

:::tip Example
Design Example:
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/dl1.png)
Display Page:
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/dl2.png)
:::

Specific attributes of paragraph:

+ Text: Provides a feature-rich rich text editor for inputting and editing content.
+ Border Style: Supports setting various border styles for paragraphs, including three styles: no border, solid border, and dashed border.

## (XXVIII) Embedded Web Page
Supports embedding specified web pages in the page, allowing users to directly access and browse other web content in the design page.

:::tip Example
Design Examples:
Static:
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/qrwy1.png)
Dynamic:
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/qrwy2.png)
Display Pages:
Static:
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/qrwy3.gif)
Dynamic:
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/qrwy4.gif)
:::

Specific attributes of embedded web page:

+ Creation Attribute
    - Field Business Type: Only supports text
+ Component Type: Includes two types, dynamic and static. Dynamic components are in input state in forms, and static components are in read-only state in forms.

:::info Note
+ When the component type is dynamic, it supports setting optional prefixes, including four common prefixes: http://, https://, ftp://, sftp://.
+ When the component type is static, entering a web link will directly display the page content corresponding to the link in the actual page. If it cannot be displayed, please check whether the web page allows embedding.
:::

## (XXIX) Hyperlink
Supports displaying hyperlinks on the page. Users can easily jump to the corresponding page by clicking the hyperlink, achieving convenient navigation between pages.

:::tip Example
Design Examples:
Static:
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/clj1.png)
Dynamic:
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/1750213786284-806d5bf9-abc6-4cdb-bebc-355162b76bf1.png)
Display Pages:
Static:
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/clj2.gif)
Dynamic:
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/1750214026006-b724a184-b4ae-429d-9d9c-a9af03e19d1e.gif)
:::

Specific attributes of hyperlink:

+ Creation Attribute
    - Field Business Type: Only supports text
+ Component Type: Includes two types, dynamic and static. Dynamic components are in input state in forms, and static components are in read-only state in forms.

:::info Note
+ When the component type is dynamic, it supports setting optional prefixes, including four common prefixes: http://, https://, ftp://, sftp://.
+ When the component type is static, entering a web link will display the link in the actual page, and clicking it will jump to the link page.
    - Link: Requires entering a valid web link.
    - Link Text: Sets the display text of the link. If not set, the web link is displayed by default.
    - Opening Method: Includes two methods: opening in the current window and opening in a new window.
:::

## (XXX) Shuttle Box
A shuttle box is a two-column selection box with selectable fields displayed on the left and selected fields displayed on the right. Fields can be selected or deselected through the shuttle box, suitable for scenarios such as selecting display fields.

:::tip Example
Design Example:
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/csk1.png)
Display Page:
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/csk2.gif)
:::

Specific attributes of shuttle box:

+ Creation Attribute
    - Field Business Type: Supports one-to-many and many-to-many
    - Associated Model: Requires setting the associated model of the current component
+ Option Type: That is, the associated model field specified at creation, which cannot be changed.
+ Option Field: Can select specific fields as option values. When multiple selections are made, these option values will be concatenated and displayed. The default option field is the name.
+ Search Field: When users enter content in the input box, if the entered content is included in the search field, the values containing this content will be displayed as search results. By default, all option fields are set as search fields, and you can choose whether to use existing search conditions as needed.
+ Exposed Field: The selection range is limited to the model fields bound to the component. When a field is set as an exposed field, it means the field can be selected in the current view.
+ Query Condition: In the actual page, data will be displayed according to the configured query conditions.

:::warning Tip
For the filling of custom expressions in query conditions, you can refer to the "Custom Expressions" document.
:::

+ Display Form of Option Box: Provides two display methods, list and table. When table display is selected, you can further set the field definition of the option box, that is, define the header content of the table.
+ Display Form of Result Box: Same as the display form of the option box.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/csk3.png)

+ Maximum/Minimum Selection Count: Can limit the selection count range, including maximum and minimum selection counts, to limit user input.

## (XXXI) Company
Provides a shortcut to directly select companies already entered in the system.

:::info Note
+ When the created field business type is many-to-one, it is a drop-down single selection in practical applications.
+ When the created field business type is many-to-many, it is a drop-down multiple selection in practical applications.
:::

:::tip Example
Design Example:
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/gs1.png)
Display Page:
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/gs2.gif)
:::

Specific attributes of company:

+ Creation Attribute
    - Field Business Type: Supports many-to-one and many-to-many.
    - Associated Model: Requires setting the associated model of the current component, and this component only supports associating with the "Company" model.
+ Maximum/Minimum Selection Count: Can limit the selection count range, including maximum and minimum selection counts, to limit user input.

## (XXXII) Department
Provides a shortcut to directly select departments already entered in the system.

:::info Note
+ When the created field business type is many-to-one, it is a drop-down single selection in practical applications.
+ When the created field business type is many-to-many, it is a drop-down multiple selection in practical applications.
:::

:::tip Example
Design Example:
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/bm1.png)
Display Page:
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/bm2.gif)
:::

Specific attributes of department:

+ Creation Attribute
    - Field Business Type: Supports many-to-one and many-to-many.
    - Associated Model: Requires setting the associated model of the current component, and this component only supports associating with the "Department" model.
+ Maximum/Minimum Selection Count: Can limit the selection count range, including maximum and minimum selection counts, to limit user input.

## (XXXIII) Employee
Provides a shortcut to directly select employees already entered in the system.

:::info Note
+ When the created field business type is many-to-one, it is a drop-down single selection in practical applications.
+ When the created field business type is many-to-many, it is a drop-down multiple selection in practical applications.
:::

:::tip Example
Design Example:
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/yg1.png)
Display Page:
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/yg2.gif)
:::

Specific attributes of employee:

+ Creation Attribute
    - Field Business Type: Supports many-to-one and many-to-many.
    - Associated Model: Requires setting the associated model of the current component, and this component only supports associating with the "Employee" model.
+ Maximum/Minimum Selection Count: Can limit the selection count range, including maximum and minimum selection counts, to limit user input.

## (XXXIV) Address
Provides an address selector function, suitable for scenarios such as selecting home addresses.

:::info Note
Allows selection to stop at any level.
:::

:::tip Example
Design Example:
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/dz1.png)
Display Page:
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/dz2.gif)
:::

Specific attributes of address:

+ Creation Attribute
    - Field Business Type: Supports many-to-one.
    - Associated Model: Requires setting the associated model of the current component, and this component only supports associating with the "Address" model.

## (XXXV) Form
Supports embedding forms in the page, suitable for designing complex pages to meet diverse page requirements.

:::tip Example
Design Example:
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/bd1.png)
Display Page:
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/bd2.png)
:::

Specific attributes of form:

+ Creation Attribute
    - Field Business Type: Supports many-to-one.
    - Associated Model: Requires setting the associated model of the current component.
+ Empty Value Display Style: Used to set the display method when some field values in the form are empty.

## (XXXVI) Table
Supports embedding tables in the page, suitable for scenarios such as displaying lists or data.

:::tip Example
Design Example:
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/bg1.png)
Display Page:
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/bg2.png)
:::

Specific attributes of table:

+ Creation Attribute
    - Field Business Type: Supports one-to-many and many-to-many.
    - Associated Model: Requires setting the associated model of the current component.
+ Show Add Button: A shortcut operation that displays an add button in the table when enabled.
+ Show Delete Button: A shortcut operation that displays a delete button in the table when enabled.
+ Data Submission Type: Specifies the submission method used when submitting data, currently only supporting full submission.
+ Associated Relationship Update Type: The data submission method when associated relationship fields in the table are updated, including full submission and incremental submission.

:::info Note
+ Full Submission: Submits all data.
+ Incremental Submission: Only submits updated data.
:::

## (XXXVII) File Download
Supports packaging data into a file for download, suitable for batch data acquisition for subsequent analysis.

:::tip Example
Design Example:
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/wjxz1.png)
Display Page:
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/wjxz2.png)
:::

Specific attributes of file download:

+ Download Prompt Text Prefix: Used to add a paragraph of guiding or explanatory text before the download prompt information.
+ Download Prompt Text: The main content part of the download prompt information. You can enter specific information to inform users here, clarifying the download content.
+ Download File Name: Used to specify the file name displayed when the download file is saved on the user's device.

## (XXXVIII) Drag and Drop Upload
Used to drag files into a specified area to complete upload, also supporting click upload.

:::tip Example
Design Example:
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/tzsc1.png)
Display Page:
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/tzsc2.png)
:::

Specific attributes of drag and drop upload:

+ Drag and Drop Upload Prompt: Used to set the prompt text displayed in the drag and drop upload area.
+ Drag and Drop Upload Icon: Supports selecting a suitable icon to display in the drag and drop upload area, serving as visual guidance and beautification.
+ Show Supported Extensions: When enabled, displays the file extensions supported by this component in the drag and drop upload area.

:::info Note
The extensions displayed here are the suffixes of the file formats selected in the "Restricted Upload File Types" attribute.
:::

+ Maximum Number of Uploaded Files: When the field business is one-to-many or many-to-many, this attribute is displayed. Limits the maximum number of files that can be uploaded.
+ Maximum Upload File Size: Limits the size of a single uploaded file.
+ Restricted Upload File Types: Limits the upload format of files, supporting multiple types such as pictures, documents, audio, and videos, and also providing a custom option. When customizing, you need to enter the format suffixes of the supported files.

:::info Note
If a certain format is allowed, files of other formats cannot be selected in the file selection dialog box.
:::

+ CDN Configuration: Supports CDN configuration.
+ Private Link: Allows choosing whether to use a private link.

## (XXXIX) Handwritten Signature
Supports implementing handwritten signatures on web pages, suitable for online contract signing, electronic form signing, etc.

:::tip Example
Design Example:
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/sxqm1.png)
Display Page:
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/sxqm2.gif)
:::

Specific attributes of handwritten signature:

+ Show Clear Button: When enabled, a clear button will be displayed in the handwritten signature component interface, which can be clicked to clear the existing handwritten signature content; when disabled, the clear button will not appear in the interface.
+ Clear Button Text: Used to set the text displayed on the clear button.
+ Show Save Button: When enabled, a save button will be displayed in the handwritten signature component interface for users to save the handwritten signature; when disabled, the save button will not be displayed.
+ Save Button Text: Used to set the text displayed on the save button.
+ Signature Text Color: Used to set the color of the signature handwriting after handwritten signing.
+ Signature Background Panel Color: Used to set the background color of the handwritten signature area.