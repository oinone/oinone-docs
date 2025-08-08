---
title: Chart Design
index: true
category:
  - User Manual
  - Designer
order: 3
---
This interface is mainly divided into four areas: the operation bar, the data configuration area, the chart preview area, and the style bar.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/1.png)

# I. Operation Bar
## (I) Save
### 1. Function Introduction
It supports archiving and saving the chart design. Even if the chart design is not yet complete, you can choose to save the current design progress. When you enter the chart design page next time, the system will automatically load and display the previously saved design page, facilitating the continuation of chart improvement.

:::warning Prompt
When the chart design is completed but not yet published, it can be directly referenced in reports or data dashboards. This reference operation will not have any impact on the subsequent publication of the chart.
:::

### 2. Operation Method
Click "Save" to archive and save the current design progress.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/bc.png)

# II. Data Configuration Area
## (I) Chart Editing - Data Source Type
### 1. Function Introduction
In the data configuration area, you can edit the data source type of the chart.

+ When the data source type is a model field, you can change the model and method. In addition, you can set query conditions, data grouping, and data calculation in the advanced settings.

  :::info Note
  If data grouping and data calculation have been configured, when setting dimensions and values, you can only select the fields that have been selected during the data grouping and data calculation process.
  :::

    - Query conditions: Display data based on the configured query conditions.
    - Data grouping: Only dimension fields are allowed to be selected for grouping. When multiple dimension fields are selected for grouping, a multi-dimensional grouping result will be generated.
    - Data calculation: Only numeric fields are allowed to be selected for calculation. You can choose the aggregation method, including no processing, minimum value, maximum value, average value, sum, and count.

:::info Note
After the above conditions are set, the system will perform a grouped query operation based on the data grouping fields, and at the same time perform aggregate statistics on the numerical values within each group based on the data calculation fields, ensuring that the results meet all the requirements set in the query conditions.
:::

+ When the data source type is an integrated application, you can change the application, API, and API parameters (see the integrated designer for details).
+ When the data source type is a database, you can change the database, API, and API parameters (see the integrated designer for details).

:::info Note
When you modify the data source type, the chart information will be cleared.
:::

### 2. Operation Method
Click the "Settings" icon, edit the information in the pop-up window, and then click "OK" to successfully edit.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/tbbj.png)

## （Ⅱ）Calculated Fields

### 1. Function Introduction

+ **Function Location**: Data Configuration Area → Add Calculated Field
+ **Configuration Methods**:
  - Supports using existing fields for addition, subtraction, multiplication, and division, as well as platform - built - in functions
+ **Examples**:
  - `Total Duration = Short Video Duration + Long Video Duration + Live Broadcast Duration` as the actual total duration
+ **Validation Rules**:
  - Fields in the expression must exist in the current dataset
  - Cross - dataset field reference is not supported

### 2. Operation Methods

Click the 「 + 」 icon, edit the information in the pop - up window, and then click 「Confirm」 to successfully create a calculated field.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/1754554838815-68bd8c94-d414-4939-83fe-da9f8d2148c7.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/1754555541922-9937d741-acb7-4013-99d1-6df31369f725.png)

## (Ⅲ) Data Configuration
### 1. Function Introduction
Supports configuration of dimensions, values, filters, sorting, comparison, splitting, in-chart filter options, and user-defined query quantity.

:::info Note
The data configuration here only applies to the general data configuration of standard chart types provided by the system. For the special data configuration of some charts, please refer to the chart type documentation.
:::

+ Dimension: In a chart, a dimension is an attribute used to describe the category or characteristics of data, helping users distinguish and classify data.
+ Value: The values in a chart are the specific data results calculated through the set aggregation method, used to display quantitative information.
+ Filter: You can select dimension fields or value fields for filtering, with no limit on the quantity. After selection, you can specify the values to be displayed or excluded for each field.

:::tip Example
The original chart shows the order amounts of different products.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/sjpz1.png)

Set to exclude Product 3.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/sjpz2.png)
:::

+ Sorting: You can select a dimension field or a value field for sorting and choose the corresponding sorting rule based on this field. At the same time, custom sorting is supported to meet specific requirements.

:::tip Example
The original chart shows the order amounts of different products, with no sorting rule.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/sjpz3.png)

Set to sort in ascending order by "Purchased Product".

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/sjpz4.png)
:::

+ Comparison: Only one dimension field can be selected. After selection, the system will display the data in comparison based on this field.

:::tip Example
The original chart shows the order amounts of different products.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/sjpz5.png)

Drag the order code into the comparison field, and you can view the order amounts of different orders for each product.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/sjpz6.png)
:::

:::warning Prompt
It is recommended that the number of field values of the dragged comparison field does not exceed 10. If this limit is exceeded, only the top 10 comparison data for each dimension value will be displayed.
:::

+ Splitting: Only one dimension field can be selected for splitting. After selection, the original chart will be split into multiple sub-charts based on this field.

:::tip Example
The original chart shows the order amounts of different products.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/sjpz7.png)

After dragging the order code into the splitting field, the original chart will be split into multiple charts equal to the number of codes according to different order codes. Each split chart will show the order amounts of products under one order.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/sjpz8.png)
:::

+ In-chart filters: Only dimension fields can be selected, and a maximum of six can be selected. Through the selected filters, you can filter the data, and the chart will only display the analysis results of the filtered data.

:::tip Example
The chart shows the order amounts of different products. Set the in-chart filters to "Purchased Product" and "Code", and you can filter the chart information in the chart.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/sjpz9.png)
:::

:::info Note
The data configuration supported by different types of charts may vary.
:::
+ Limit the maximum number of queryable entries: Users can customize the query quantity.


### 2. Operation Method
+ Add: Click the "Add" icon, and click or drag the fields into the pop-up window.

:::info Note
+ Different charts support different numbers of fields. When the number of fields reaches the upper limit, no more can be added. At this time, if you add a new field, the new field will replace the old field for data analysis, and the same style will be retained.
+ When multiple fields can be added to the values, the field types must be consistent, that is, all time-type fields or all non-time-type fields.
+ Pie charts, funnel charts, and dashboards cannot have time-type fields added to the values.
:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/sjpz10.png)

+ Modify: Click the "Settings" icon to modify and adjust the fields according to different functions.

  ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/sjpz11.png)

    - Dimension: You can modify the display name.
    - Value: You can modify the display name, aggregation method, and data format.
        * Aggregation method: Including no processing, minimum value, maximum value, average value, sum, and count.
        * Data format: You can select a type for the data, including default, numeric, currency, and percentage. Different formats can be configured according to different types.
            + Default: You can set a unit for the data to meet basic display requirements.
            + Numeric: In addition to the unit, you can also set the precision for the data to ensure the accuracy of data display.
            + Currency: You can select a currency type for the data and set the precision and unit to present the data in currency format.

              :::warning Prompt
              The currency types here can be set in "Resources" - "Currencies".
              :::

            + Percentage: You can set the precision and unit for the data, and the data will be displayed in percentage form, intuitively reflecting the data ratio.
    - Filter: You can modify the data included in the selected fields to be displayed or excluded.
    - In-chart filters: You can modify the display name.
+ Delete: Click the "Delete" icon to delete the selected field.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/sjpz12.png)

# III. Chart Preview Area
## (I) Switch Chart Type
### 1. Function Introduction
In the chart preview area, the corresponding chart will be dynamically displayed based on the selected chart type, combined with the settings in the data configuration area and the style bar. In addition, you can switch between different chart types above the chart preview area to meet different data display needs.

:::info Note
There may be differences in data configuration and style settings for different types of charts. (See the chart type documentation for details.)
:::

:::warning Prompt
If the chart types provided by the system cannot meet your actual needs, you can go to the chart template to customize the chart type.
:::

### 2. Operation Method
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/qhtblx.png)

## (II) Chart Editing - Title and Description
### 1. Function Introduction
In the chart preview area, you can edit the title, subtitle, and description of the chart.

:::info Note
If the title, subtitle, or description is not displayed, check if the display is turned off in the style bar of the designed chart. If it is turned off, it cannot be displayed, and similarly, it cannot be edited.
:::

### 2. Operation Method
Click on the title area, subtitle area, description area, or the "Edit" icon, enter the information, and then you can successfully edit.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/bjbt.png)

# IV. Style Bar
### 1. Function Introduction
It supports configuring styles for the chart, including the chart title, axes, labels, legends, auxiliary lines, display settings, and drill-down. In addition, you can enable the standard style of the chart.

:::info Note
When you switch to the standard style of the chart, if you modify a certain style, the standard style of the chart will be automatically cancelled.
:::

:::info Note
The style settings here only apply to the general styles of standard chart types provided by the system. For the special styles of some charts, please refer to the chart type documentation. For the special styles included in custom charts, this part will not be explained in detail.
:::

+ Chart title: You can customize the display status, position, font size, and font color of the title, subtitle, and description to meet personalized needs.
+ Axes: You can choose whether to display the axis lines, axis titles, and gridlines of the axes, and set appropriate font sizes and font colors for the axes to improve the readability of the chart.
+ Labels: You can flexibly choose whether to display labels and the field content to be displayed in the labels. At the same time, you can set the font size and font color for the labels to make the data information clearer.
+ Legends: You can choose whether to display legends and set the position, font size, and font color of the legends as needed to better explain the data series in the chart.
+ Auxiliary lines: You can add auxiliary lines to the chart and support setting a fixed value or selecting a value from the chart (such as the average value, minimum value, or maximum value) as the position of the auxiliary line to better analyze the data.
+ Display settings: You can choose whether to display the drag bar to freely adjust the view. At the same time, you can set the number of dimension values to be displayed on one screen and the total number of dimension values to be displayed to optimize the display effect of the chart.

:::warning Prompt
When the display drag bar function is enabled and the number of dimension values to be displayed on one screen is set, you can adjust the number of dimension values displayed on one screen by lengthening or shortening the length of the drag bar in the chart, achieving an increase or decrease effect.
:::

+ Drill-down:

You can set drill-down interactions for **dimension/value field values of the chart**.

When configuring drill-down, you can choose the following two types:

  - **Chart Drill-down**: Select a target chart for the dimension field value; upon clicking, the content of the target chart will be displayed in the current component area.
  - **Free Drill-down**: Set a jump link (URL) for the dimension field value; upon clicking, a new page will be opened via the external link.

:::info Note

+ **The target chart should support the passing of drill-down context variables** (e.g., dimension values like region, department, etc.).
+ Different types of charts may vary in terms of supported drill-down styles and behaviors.

:::

+ Jump
  - Jump is used to configure click-to-jump behaviors for the entire chart or graphic elements, enabling the opening of other pages or external system links.
  - Configuration scenarios include but are not limited to:
    * Overall chart click jump (e.g., clicking any bar in a bar chart to jump to the detailed list page)
    * Graphic element-level jump (e.g., clicking a specific data point to jump to a third-party system)

:::info Note

+ Jump links support concatenation of field parameters (e.g., `https://example.com/detail?region={Region}`).
+ Certain charts (such as pie charts, scatter plots) only support graphic element-level jumps, not overall jumps.
+ Jump and drill-down are mutually exclusive; only one of the configurations is supported for the same field/graphic element.

:::

### 2. Operation Method
+ Customize the style in the style bar, and the style will take effect immediately and be displayed in real-time in the chart.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/ys1.png)

+ Switch to the standard style: Click the "Switch to Standard Mode" button to switch the current chart to the standard style.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/ys2.png)

+ Drill-down

Example: Drill down from 【Global Sales Status】 to 【Proportion Status】 chart

It is necessary to configure the field mapping relationship between charts here.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/1754560920137-a4f24666-42ff-4d49-a353-94bc4cb81a41.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/1754566971562-f97ba583-e476-4e9d-a396-61334e75d83f.gif)

+ Jump

Supports jumping to a specified dashboard or external page

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/1754567515474-16ccae3b-483d-4693-928b-a2b5b792f4d4.png)

# V. Attachment: Glossary
| Term | Description |
| :---: | --- |
| Dimension | An attribute used to describe the category or characteristics of data |
| Value | Used to display quantitative information |
| Filter | Filter the source data and only use the filtered data for effective analysis |
| Sorting | Adjust the arrangement order of dimension values in the formed analysis chart to optimize the display effect |
| Comparison | Used to compare and analyze different dimensions |
| Splitting | Split the data according to a specific dimension to display the data in more detail |
| In-chart filters | <div style="width:600px;">Provide a smaller range of query functions for the formed analysis chart to accurately locate data</div> |
| Label | The intersection point of each dimension value and each value, used to mark data points or dimension information in the chart |
| Legend | Facilitate differentiation and identification through the value names and their corresponding colors on the chart |
| Auxiliary line | After adding an auxiliary line, compare the analysis results of the chart with this auxiliary line |
| Drill-down | Explore deeper information in the data |