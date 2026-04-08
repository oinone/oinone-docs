---
title: 报表
index: true
category:
  - 用户手册
  - 设计器
order: 4
---
报表可以将各式各样的图表汇总为一个整体，从而提供一个全面、直观的数据展示和分析平台。通过报表，可以将不同类型、不同来源的图表数据进行整合，包括柱状图、折线图、饼图、散点图等多种形式的图表，使得这些数据能够在一个统一的界面中得到展示。

进入数据可视化后的「报表」页面可对报表进行管理，该页面主要包含三个部分：筛选区、列表区与报表预览区

+ 筛选区：提供报表筛选功能，便于用户快速查找出所需报表项。
+ 列表区：展示报表与其分组的列表，清晰呈现报表结构。
+ 报表预览区：展示已设计的报表，用户可在此进行选择图表、发布、导出等操作。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/report%20forms/1.png)

# 一、筛选
### 1.功能介绍
根据业务实际需求，可定制报表筛选条件。输入报表或分组名称后，系统能精确筛选所需项，便于后续操作。

### 2.操作方法
在筛选区中输入条件，完成对报表或分组的筛选。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/report%20forms/sx.png)

# 二、分组管理
### 1.功能介绍
利用分组功能可以对图表进行归类处理。

### 2.操作方法
+ 创建分组：首先，点击“创建一级分组”按钮并输入一级分组名称，即可完成一级分组的创建。接着，在一级分组下方，点击“创建”图标并输入二级分组名称，即可成功创建二级分组。至此，分组创建完成。

:::info 注意

+ 一级分组名称之间不允许重复，一级分组名称与二级分组名称不允许重复
+ 同个一级分组下的二级分组名称不允许重复
+ 不同一级分组下的二级分组名称允许重复

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/report%20forms/fz1.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/report%20forms/fz2.png)

+ 编辑分组名称：鼠标移至需要修改的分组上，点击「编辑」图标后即可修改分组的名称。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/report%20forms/fz3.png)

+ 修改分组位置：拖拽分组即可改变其位置。

:::info 注意

+ 只能拖动同级分组，不可以将一级分组变为二级分组或将二级分组变为一级分组，同理，创建好的报表不允许变为分组。
+ 可以将二级分组移至其他一级分组下。

:::

+ 删除分组：鼠标移至需要删除的分组上，点击「删除」图标，即可删除该分组。

:::info 注意

+ 删除一级分组时，其包含的二级分组也会被删除。
+ 当分组下存在图表时，无法成功删除。

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/report%20forms/fz4.png)

# 三、添加报表
### 1.功能介绍
在二级分组下可添加报表，在添加过程中需编辑报表标题

:::info 注意

标题的长度需不少于4个字符。

:::

### 2.操作方法
在列表区二级分组下点击「添加报表」图标，输入标题后即可成功创建

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/report%20forms/tj.png)

# 四、编辑报表
### 1.功能介绍
支持编辑未发布或已发布但未隐藏的图表，提供三种编辑情况：

+ 在列表区编辑，仅能编辑标题
+ 在报表预览区编辑，可以编辑标题与备注

### 2.操作方法
+ 在列表区，选中报表后点击「编辑」图标，输入信息后即可成功编辑
+ 在报表预览区，点击标题区域、备注区域或「编辑」图标，输入信息后即可成功编辑

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/report%20forms/bj.png)

# 五、选择图表
### 1.功能介绍
可为报表选择需展示的图表。

:::info 注意

+ 只能选取同个一级分组下的图表
+ 当报表预览区中存在图表时，选择图表时只能选择与已有图表同个一级分组下的图表

:::

### 2.操作方法
点击「选择图表」，在弹窗中可选择在数据可视化中创建的图表。选中的图表会在报表预览区中进行展示

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/report%20forms/xz.png)

# 六、创建图表
### 1.功能介绍
提供创建图表快捷入口，有关创建图表的详细信息可查阅“图表管理”文档。

### 2.操作方法
点击「创建图表」后输入信息即可成功创建

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/report%20forms/cj.png)

# 七、设计报表
### 1.功能介绍
当报表预览区域中包含图表时，可以在该区域内自由调整图表的位置和大小，以满足展示需求。若某个图表不再需要，可以将其删除。此外，还提供了图表的编辑快捷入口，可快速跳转至图表设计界面，对图表进行进一步的调整和优化。

### 2.操作方法
+ 拖拽图表可改变其位置

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/report%20forms/sj1.gif)

+ 拖拽图表右下角可改变其大小

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/report%20forms/sj2.gif)

+ 选中某图表后点击「编辑」图标，可跳转至图表设计页面
+ 选中某图表后点击「删除」图标，可删除该图表

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/report%20forms/sj3.png)

# 八、查看引用信息
### 1.功能介绍
可查看与该报表存在引用关系的各类元素。

:::info 注意

+ 对于已发布报表，可提供引用链接，可以直接复制引用链接在别处使用。
+ 对于未发布报表，不提供引用链接

:::

### 2.操作方法
点击「查看引用」，即可查看引用信息。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/report%20forms/yy.png)

# 九、发布报表
### 1.功能介绍
报表设计完成后，用户可以选择发布报表。发布后的报表可在其他设计器中被引用，同时展示最近发布时间。若报表发布后有内容更新，原本的“发布”按钮将变为“更新发布”。

:::info 注意

+ 若内容发生更新但尚未进行重新发布，那么引用该报表的地方将继续展示旧版本的内容。
+ 当报表隐藏后，无法发布该报表。

:::

### 2.操作方法
点击「发布/更新发布」，即可成功发布

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/report%20forms/fb.png)

# 十、查看最近一次发布版本
### 1.功能介绍
当报表发布后有更新，会在报表预览区左上方区域展示最近发布时间，并可查看其最近一次发布的版本。

### 2.操作方法
点击「查看」，报表预览区会展示最近一次发布版本

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/report%20forms/ckyc.png)

# 十一、隐藏/可见报表
### 1.功能介绍
对于当前暂不使用的报表，可以执行隐藏操作。若日后需要，只需将隐藏的报表设置为可见状态即可重新投入使用。隐藏后的报表不可以被引用，但是不影响已经被引用的数据。

:::info 注意

+ 对于已发布报表，隐藏后不可选择图表、创建图表以及发布/更新发布，但仍可设计报表
+ 对于未发布报表，隐藏后不可发布/更新发布，但仍可选择图表、创建图表以及设计报表

:::

### 2.操作方法
点击「隐藏」，报表设置为隐藏状态；再次点击，报表恢复为可见状态。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/report%20forms/yc.png)

# 十二、导出Excel
### 1.功能介绍
可以将报表中的图表数据内容导出为标准化的Excel文件格式。

### 2.操作方法
点击「导出excel」，即可将当前报表中的图表数据以Excel形式导出。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/report%20forms/dc.png)

# 十三、允许别人编辑
### 1.功能介绍
支持自定义编辑权限，当关闭编辑权限后，非创建者即使登录也无法对该内容进行编辑。

### 2.操作方法
点击开关，即可改变该功能状态。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/report%20forms/yxbrbj.png)

# 十四、允许别人引用
### 1.功能介绍
支持自定义引用权限，当关闭引用权限后，非创建者即使登录也无法对该内容进行引用。

### 2.操作方法
点击开关，即可改变该功能状态。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/report%20forms/yxbryy.png)

# 十五、报表筛选项
### 1.功能介绍
可为报表中的图表设置时间关联字段作为报表筛选项。当选定特定时间范围时，相应图表将自动展示该时间范围内的数据。

### 2.操作方法
点击添加报表筛选项，在弹出的页面中选择对应信息后确定，即可成功设置报表筛选项。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/report%20forms/bbsxx.png)

# 十六、删除报表
### 1.功能介绍
当报表不再使用时，可以选择将其删除。若不确定报表是否需要删除，可以先将其隐藏。

:::info 注意

在删除前，需确保该报表未被其他设计器引用，否则删除操作将无法进行。

:::

:::danger 警告

报表删除后无法恢复，请谨慎操作！

:::

### 2.操作方法
点击「删除」图标，确定删除后即可删除

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/report%20forms/sc.png)

# 十七、附件：名词解释
| <div style="width:50px;">名词</div> | 描述 |
| :---: | --- |
| 图表 | 指具体的图表信息，根据图表模版，带入需要分析的数据后会生成业务图表 |
| 报表 | 设计图表的组合样式，将需要在一起展示的图表添加到一张报表中为一个整体，可以在报表设计页面调整单个图表的占比，发布报表等 |