---
title: 图表设计
index: true
category:
  - 用户手册
  - 设计器
order: 3
---
本界面主要分为四个区域：操作栏、数据配置区、图表预览区、样式栏

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/1.png)

# 一、操作栏
## （一）保存
### 1.功能介绍
支持对图表设计进行存档保存。即使图表设计尚未完整，也可选择保存当前设计进度。下次进入图表设计页面时，系统将自动加载并显示之前保存的设计页面，方便继续完善图表。

:::warning 提示

当图表设计已完成但尚未发布时，可以在报表或数据大屏中直接引用。此引用操作不会对图表的后续发布产生任何影响。

:::

### 2.操作方法
点击「保存」，即可将当前设计进度存档保存。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/bc.png)

# 二、数据配置区
## （一）图表编辑——数据来源类型
### 1.功能介绍
在数据配置区，支持编辑图表的数据来源类型。

+ 当数据来源类型为模型字段时，可更改模型与方法。除此之外，在高级设置中还可设置查询条件、数据分组、数据计算

  :::info 注意

  若已配置了数据分组与数据计算，那么在设置维度与数值时，仅限于选择在数据分组和数据计算过程中已选中的字段。

  :::

    - 查询条件：以配置的查询条件展示数据。
    - 数据分组：仅允许选择维度字段进行分组。当选择多个维度字段进行分组时，会产生一个多维度的分组结果。
    - 数据计算：仅允许选择数值字段进行计算。可以选择聚合方式，包括无处理、最小值、最大值、平均值、求和、计数。

:::info 注意

当上述条件被设定后，系统会根据数据分组字段执行分组查询操作，同时依据数据计算字段对各个分组内的数值进行聚合统计，并确保结果满足查询条件中所设定的各项要求。

:::

+ 当数据来源类型为集成应用时，可更改应用、API与API参数（详见集成设计器）
+ 当数据来源类型为数据库时，可更改数据库、API与API参数（详见集成设计器）

:::info 注意

当修改数据来源类型后，图表信息会清空。

:::

### 2.操作方法
点击「设置」图标，在弹窗中编辑信息后点击「确定」，即可成功编辑。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/tbbj.png)

## （二）计算字段

### 1.功能介绍

+ **功能位置**：数据配置区 → 新增计算字段
+ **配置方式**：
  - 支持使用已有字段进行加减乘除、平台内置函数
+ **示例**：
  - `总时长 = 短视频时长 + 长视频时长 + 直播时长` 作为实际总时长
+ **校验规则**：
  - 表达式中字段需存在于当前数据集中
  - 不支持跨数据集字段引用

### 2.操作方法

点击「 + 」图标，在弹窗中编辑信息后点击「确定」，即可成功创建计算字段。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/1754554838815-68bd8c94-d414-4939-83fe-da9f8d2148c7.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/1754555541922-9937d741-acb7-4013-99d1-6df31369f725.png)

## （三）数据配置
### 1.功能介绍
支持配置维度、数值、筛选、排序、对比、拆分、图内筛选项、用户自定义查询数量。

:::info 注意

此处的数据配置仅针对于系统提供的标准图表类型的通用数据配置，一些图表的特殊数据配置请查阅图表类型文档。

:::

+ 维度：在图表中，维度是用于描述数据所属类别或特征的属性，帮助用户区分和分类数据。
+ 数值：图表中的数值是通过设定的聚合方式计算得出的具体数据结果，用于展示量化信息。
+ 筛选：可选择维度字段或数值字段进行筛选，数量不限。选择后，可为每个字段指定要展示或排除的值。

:::tip 举例

原图表为不同商品的下单金额。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/sjpz1.png)

设置排除商品3

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/sjpz2.png)

:::

+ 排序：可选择一个维度字段或数值字段进行排序，并根据该字段选择相应的排序规则。同时，支持自定义排序以满足特定需求。

:::tip 举例

原图表为不同商品的下单金额，暂无排序规则

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/sjpz3.png)

设置以“购买商品”升序排序

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/sjpz4.png)

:::

+ 对比：仅支持选择一个维度字段。选择后，系统将依据该字段对数据进行对比展示。

:::tip 举例

原图表为不同商品的下单金额。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/sjpz5.png)

将下单编码拖入对比字段，则会按照不同的商品，查看每个商品下不同订单的下单金额情况。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/sjpz6.png)

:::

:::warning 提示

建议拖入的对比字段其字段值个数不超过10个。若超出此限制，每个维度值将仅取前10条对比数据进行展示。

:::

+ 拆分：仅支持选择一个维度字段进行拆分，选择后，原图表将依据该字段被拆分为多个子图表。

:::tip 举例

原图表为不同商品的下单金额。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/sjpz7.png)

将下单编码拖入拆分字段后，会根据不同的下单编码，将原图表拆分成与编码数量相等的多个图表。每个拆分后的图表将展示一个订单下的商品下单金额情况。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/sjpz8.png)

:::

+ 图内筛选项：仅限选择维度字段，且最多可选择六个。通过选定的筛选项，可以对数据进行过滤，图表将仅展示过滤后的数据分析结果。

:::tip 举例

图表为不同商品的下单金额。设置图内筛选项为“购买商品”与“编码”，即可在图表中对图表信息进行筛选

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/sjpz9.png)

:::

:::info 注意

不同类型的图表所支持的数据配置可能存在差异。

:::

+ 限制可查询最大条数：用户自定义查询数量。

### 2.操作方法
+ 添加：点击「添加」图标，在弹框中点选或将字段拖入。

:::info 注意

+ 不同图表支持的字段个数不同，当字段个数达到上限后不可再添加；此时若添加新字段，新字段会代替旧字段进行数据分析，且会保留相同的样式。
+ 当数值中允许添加多个字段时，字段类型必须保持一致，即全部为时间类型字段或全部为非时间类型字段。
+ 饼图、漏斗图与仪表盘不可以在数值中添加时间类型字段

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/sjpz10.png)

+ 修改：点击「设置」图标，可依据不同功能对字段进行修改和调整。

  ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/sjpz11.png)

    - 维度：可修改展示名称
    - 数值：可修改展示名称、聚合方式与数据格式
        * 聚合方式：包括无处理、最小值、最大值、平均值、求和与计数
        * 数据格式：可为数据选择类型，包括默认、数值、货币、百分比。依据不同的类型可配置不同格式
            + 默认：可以为数据设置单位，以满足基本展示需求。
            + 数值：除了单位，还可以为数据设置精度，以确保数据展示的准确性。
            + 货币：可以为数据选择货币类型，并设置精度和单位，使数据以货币格式呈现。

              :::warning 提示

              此处货币类型，可在「资源」-「货币」中进行设置

              :::

            + 百分比：可以为数据设置精度和单位，数据将以百分比形式展示，直观反映数据比例。
    - 筛选：可修改展示或排除选中字段中所包含数据
    - 图内筛选项：可修改展示名称
+ 删除：点击「删除」图标，即可将选中字段删除

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/sjpz12.png)

# 三、图表预览区
## （一）切换图表类型
### 1.功能介绍
在图表预览区，会依据选定的图表类型，结合数据配置区和样式栏中的设置信息，动态展示相应的图表。此外，还可以在图表预览区域的上方切换不同的图表类型，以满足不同的数据展示需求。

:::info 注意

不同类型的图表可能存在数据配置和样式设置上差异。（详见图表类型文档）

:::

:::warning 提示

若系统提供的图表类型暂无法满足实际需求，可前往图表模板自定义图表类型。

:::

### 2.操作方法
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/qhtblx.png)

## （二）图表编辑——标题与描述
### 1.功能介绍
在图表预览区，可编辑图表的标题、副标题与描述

:::info 注意

若未显示标题、副标题、描述，可在设计图表的样式栏中查看是否关闭展示，若关闭则无法展示，同理无法编辑。

:::

### 2.操作方法
点击标题区域、副标题区域、描述区域或「编辑」图标，输入信息后即可成功编辑

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/bjbt.png)

# 四、样式栏
### 1.功能介绍
支持为图表配置样式，包括图表标题、坐标轴、标签、图例、辅助线、显示设置、下钻。此外，还可启用图表的标准样式

:::info 注意

当切换为图表的标准样式后，若修改了某个样式，图表的标准样式会自动取消。

:::

:::info 注意

此处的样式设置仅针对于系统提供的标准图表类型的通用样式，一些图表的特殊样式请查阅图表类型文档。对于自定义图表中包含的特殊样式，本部分不进行详细解释。

:::

+ 图表标题：可自定义标题、副标题与描述的展示状态、位置、字号大小及字体颜色，以满足个性化需求。
+ 坐标轴：可选择是否展示坐标轴的轴线、轴标题及网格线，并可为坐标轴设置合适的字号大小和字体颜色，以提升图表的可读性。
+ 标签：可灵活选择是否展示标签，以及标签中展示的字段内容，同时可为标签设置字号大小和字体颜色，使数据信息更加清晰。
+ 图例：可选择是否展示图例，并根据需要设置图例的位置、字号大小及字体颜色，以便更好地解释图表中的数据系列。
+ 辅助线：可为图表添加辅助线，支持设置固定值或选择图表中的数值（如平均值、最小值、最大值）作为辅助线的位置，以便更好地分析数据。
+ 显示设置：可选择是否展示拖动条，以便自由调整视图；同时可设置一屏展示的维度值个数及展示维度值的总数，以优化图表的展示效果。

:::warning 提示

当启用展示拖动条功能，并设定了一屏展示的维度值个数后，可以通过在图表中拉长或缩短拖动条的长度，来调整一屏内展示的维度值个数，实现增加或减少的效果。

:::

+ 下钻：

可为**图表的维度/数值 字段值**设置下钻交互。

当配置下钻时，可选择以下两种类型：

  - **图表下钻**：为维度字段值选择目标图表，点击后在当前组件区域展示目标图表内容。
  - **自由下钻**：为维度字段值设置跳转链接（URL），点击后通过外链打开新页面。

:::info 注意

+ **目标图表应支持下钻上下文变量传参**（如：地区、部门等维度值）。
+ 不同类型图表所支持的下钻样式与表现可能存在差异。

:::

+ 跳转
  - 跳转用于为图表整体或图元元素配置点击跳转行为，打开其他页面或系统外部链接。
  - 配置场景包括但不限于：
    * 图表整体点击跳转（如点击柱图任意柱子跳转至明细表页面）
    * 图元级跳转（如点击某一数据点跳转至第三方系统）

:::info 注意

+ 跳转链接支持拼接字段参数（如：`https://example.com/detail?region={地区}`）。
+ 某些图表（如饼图、散点图）仅支持图元级跳转，不支持整体跳转。
+ 跳转与下钻互斥，同一字段/图元仅支持其中一种配置。

:::

### 2.操作方法
+ 在样式栏中自定义样式，样式即时生效，在图表中实时展示。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/ys1.png)

+ 切换标准样式：开启「切换为标准模式」按钮，即可切换将当前图表为标准样式

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/ys2.png)

+ 下钻

示例：【全球销售情况】下钻到【占比情况】图表

此处需要配置图表与图表之间字段的映射关系。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/1754560920137-a4f24666-42ff-4d49-a353-94bc4cb81a41.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/1754566971562-f97ba583-e476-4e9d-a396-61334e75d83f.gif)

+ 跳转

支持跳转至指定仪表板或外部页面

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Graphic%20Design/1754567515474-16ccae3b-483d-4693-928b-a2b5b792f4d4.png)

# 五、附件：名词解释
| 名词 | 描述 |
| :---: | --- |
| 维度 | 用于描述数据所属类别或特征的属性 |
| 数值 | 用于展示量化信息 |
| 筛选 | 对来源数据进行过滤，仅采用过滤后的数据进行有效分析 |
| 排序 | 对已形成的分析图表，调整维度值的排列顺序，以优化展示效果 |
| 对比 | 用于将不同维度进行对比分析 |
| 拆分 | 将数据按特定维度进行拆分，以更细致地展示数据 |
| 图内筛选项 | <div style="width:600px;">对已形成的分析图表，提供更小范围的查询功能，以便精准定位数据</div> |
| 标签 | 每个维度值与每个数值的切点，用于标注图表中的数据点或维度信息 |
| 图例 | 通过数值名称及其在图表上的对应颜色来便于区分和识别 |
| 辅助线 | 添加辅助线后，将图表的分析结果与该条辅助线进行比对 |
| 下钻 | 可深入探索数据更深层次的信息 |


