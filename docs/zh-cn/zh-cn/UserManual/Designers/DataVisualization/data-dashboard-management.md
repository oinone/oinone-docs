---
title: 数据大屏管理
index: true
category:
  - 用户手册
  - 设计器
order: 5
---
数据大屏能够实时地以图形化的形式，为企业呈现出直观、清晰的数据分析结果。通过数据大屏，企业可以即时掌握各项关键指标的动态变化，迅速洞察数据背后的业务逻辑和趋势，从而为决策提供有力的数据支撑，助力企业实现数据驱动的精细化管理。

进入数据可视化后的「数据大屏」页面可对数据大屏进行管理，该页面主要包含三个部分：筛选区、列表区与数据大屏预览区

+ 筛选区：提供数据大屏筛选功能，便于用户快速查找出所需数据大屏项。
+ 列表区：展示数据大屏与其分组的列表，清晰呈现数据大屏结构。
+ 数据大屏预览区：展示已设计的数据大屏表，可在此进行编辑、发布、导出等操作。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Data%20big%20screen%20management/1.png)

# 一、筛选
### 1.功能介绍
根据业务实际需求，可定制数据大屏筛选条件。输入数据大屏或分组名称后，能精确筛选出所需项，便于后续操作。

### 2.操作方法
在筛选区中输入条件，完成对数据大屏或分组的筛选。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Data%20big%20screen%20management/sx.png)

# 二、分组管理
### 1.功能介绍
利用分组功能可以对数据大屏进行归类处理。

### 2.操作方法
+ 创建分组：首先，点击“创建一级分组”按钮并输入一级分组名称，即可完成一级分组的创建。接着，在一级分组下方，点击“创建”图标并输入二级分组名称，即可成功创建二级分组。至此，分组创建完成。

:::info 注意

+ 一级分组名称之间不允许重复，一级分组名称与二级分组名称不允许重复
+ 同个一级分组下的二级分组名称不允许重复
+ 不同一级分组下的二级分组名称允许重复

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Data%20big%20screen%20management/fz1.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Data%20big%20screen%20management/fz2.png)

+ 编辑分组名称：鼠标移至需要修改的分组上，点击「编辑」图标后即可修改分组的名称。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Data%20big%20screen%20management/fz3.png)

+ 修改分组位置：拖拽分组即可改变其位置。

:::info 注意

+ 只能拖动同级分组，不可以将一级分组变为二级分组或将二级分组变为一级分组，同理，创建好的数据大屏不允许变为分组。
+ 可以将二级分组移至其他一级分组下。

:::

+ 删除分组：鼠标移至需要删除的分组上，点击「删除」图标，即可删除该分组。

:::info 注意

+ 删除一级分组时，其包含的二级分组也会被删除。
+ 当分组下存在图表时，无法成功删除。

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Data%20big%20screen%20management/fz4.png)

# 三、添加数据大屏
### 1.功能介绍
在二级分组下可添加数据大屏，在添加过程中需编辑数据大屏标题

### 2.操作方法
在二级分组点击「添加数据大屏」图标，输入标题后即可成功创建。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Data%20big%20screen%20management/tj.png)

# 四、编辑数据大屏
### 1.功能介绍
支持编辑未发布或已发布但未隐藏的图表，提供两个编辑情况：

+ 在列表区编辑，可编辑标题
+ 在数据大屏预览区编辑，可编辑标题

### 2.操作方法
点击「编辑」图标，输入信息后即可成功编辑

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Data%20big%20screen%20management/bj.png)

# 五、设计数据大屏
### 1.功能介绍
数据大屏创建完成后，可进入数据大屏设计界面中，对数据大屏进行个性化的设计布局，包括选择不同的图表与组件，以满足多样化的需求和风格。（详见数据大屏设计文档）

:::info 注意

当数据大屏发布后隐藏，无法进入数据大屏设计界面

:::

### 2.操作方法
点击「编辑」，进入数据大屏设计界面。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Data%20big%20screen%20management/sj.png)

# 六、查看引用信息
### 1.功能介绍
可查看与该数据大屏存在引用关系的各类元素。

:::info 注意

+ 对于已发布数据大屏，可提供引用链接，可以直接复制引用链接在别处使用。
+ 对于未发布数据大屏，不提供引用链接

:::

### 2.操作方法
点击「查看引用」，即可查看引用信息。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Data%20big%20screen%20management/yy.png)

# 七、复制数据大屏
### 1.功能介绍
提供数据大屏复制功能，该功能会在原图所在的分组最底层生成一个副本，该副本的标题为“copy of 原图名称”。

### 2.操作方法
点击「复制」，即可成功复制

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Data%20big%20screen%20management/copy.png)

# 八、发布数据大屏
### 1.功能介绍
数据大屏设计完成后，用户可以选择发布数据大屏。发布后的数据大屏可在其他设计器中被引用，同时展示最近发布时间。若数据大屏发布后有内容更新，原本的“发布”按钮将变为“更新发布”。

:::info 注意

若内容发生更新但尚未进行重新发布，那么引用该数据大屏的地方仍继续展示旧版本的内容。

:::

:::info 注意

当数据大屏隐藏后，无法发布该数据大屏。

:::

:::info 注意

发布数据大屏，需确保大屏中至少包含一个图表或组件，以满足发布的基本要求。

:::

### 2.操作方法
点击「发布/更新发布」，即可成功发布

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Data%20big%20screen%20management/fb.png)

# 九、查看最近一次发布版本
### 1.功能介绍
当数据大屏发布后有更新，会在数据大屏预览区左上方区域展示最近发布时间，可查看其最近一次发布的版本

### 2.操作方法
点击「查看」，数据大屏预览区会展示最近一次发布版本

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Data%20big%20screen%20management/ckzj.png)

# 十、隐藏/可见数据大屏
### 1.功能介绍
对于当前暂不使用的数据大屏，可以执行隐藏操作。若日后需要，只需将隐藏的数据大屏设置为可见状态即可重新投入使用。隐藏后的数据大屏不可以被引用，但是不影响已经被引用的数据。

:::info 注意

+ 对于已发布的数据大屏，隐藏后不可编辑
+ 对于未发布的数据大屏，隐藏后允许编辑

:::

### 2.操作方法
点击「隐藏」，数据大屏设置为隐藏状态；再次点击，数据大屏恢复为可见状态。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Data%20big%20screen%20management/yc.png)

# 十一、导出Excel
### 1.功能介绍
可以将数据大屏数据内容导出为标准化的Excel文件格式。

### 2.操作方法
点击「导出excel」，即可将当前图表中数据以Excel形式导出。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Data%20big%20screen%20management/dc.png)

# 十二、允许别人编辑
### 1.功能介绍
支持自定义编辑权限，当关闭编辑权限后，非创建者即使登录也无法对该内容进行编辑。

### 2.操作方法
点击开关，即可改变该功能状态。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Data%20big%20screen%20management/yxbrbj.png)

# 十三、全屏
### 1.功能介绍
支持全屏展示数据大屏，数据大屏将占据整个屏幕空间，图表和组件的展示效果将更加突出和清晰。

### 2.操作方法
点击「全屏」，即可全屏展示数据大屏

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Data%20big%20screen%20management/qp.png)

# 十四、删除数据
### 1.功能介绍
当数据大屏不再使用时，可以选择将其删除。若不确定数据大屏是否需要删除，可以先将其隐藏。

:::info 注意

在删除前，需确保该数据大屏未被其他设计器引用，否则删除操作将无法进行。

:::

:::danger 警告

数据大屏删除后无法恢复，请谨慎操作！

:::

### 2.操作方法
点击「删除」图标，确定删除后即可删除

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Data%20big%20screen%20management/sc.png)

