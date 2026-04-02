---
title: 图表管理
index: true
category:
  - 用户手册
  - 设计器
order: 1
prev:
  text: 数据可视化(Data Visualization)
  link: /zh-cn/UserManual/Designers/DataVisualization/README.md
---
图表可以直观的展示模型中数据，在数据可视化中，提供图表管理界面，该界面支持用户自定义图表信息，实现信息的灵活配置。

进入数据可视化后的「图表」页面可对图表进行管理，该页面主要包含三个部分：筛选区、列表区与图表预览区：

+ 筛选区：提供图表筛选功能，便于用户快速查找出所需图表项。
+ 列表区：展示图表与其分组的列表，清晰呈现图表结构。
+ 图表预览区：展示已设计的图表，用户可在此进行编辑、发布、导出等操作。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Chart%20Management/1.png)

# 一、筛选
### 1.功能介绍
根据业务实际需求，可定制图表筛选条件。输入图表或分组名称后，系统能精确筛选所需项，便于后续操作。

### 2.操作方法
在筛选区中输入条件，完成对图表或分组的筛选。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Chart%20Management/sx.png)

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

 ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Chart%20Management/fz1.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Chart%20Management/fz2.png)

+ 编辑分组名称：鼠标移至需要修改的分组上，点击「编辑」图标后即可修改分组的名称。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Chart%20Management/fz3.png)

+ 修改分组位置：拖拽分组即可改变其位置。

:::info 注意

+ 只能拖动同级分组，不可以将一级分组变为二级分组或将二级分组变为一级分组，同理，创建好的图表不允许变为分组。
+ 可以将二级分组移至其他一级分组下。

:::

+ 删除分组：鼠标移至需要删除的分组上，点击「删除」图标，即可删除该分组。

:::info 注意

+ 删除一级分组时，其包含的二级分组也会被删除。
+ 当分组下存在图表时，无法成功删除。

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Chart%20Management/fz4.png)

# 三、添加图表
### 1.功能介绍
Oinone的数据可视化提供了两个创建图表的方式：

+ 在图表二级分组中创建图表
+ 在报表中创建图表

在创建时需编辑图表基本信息，包括图标标题、数据来源类型与方法。数据来源提供四种类型：

+ 当选择模型字段时，需选择已有模型
+ 当选择集成应用时，需选择应用以及API
+ 当选择数据库时，需选择数据库以及API
+ 当选择文件集时，需选择文件集与文件

### 2.操作方法
+ 在图表列表区二级分组下点击「创建图表」图标，输入图表信息即可成功创建。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Chart%20Management/tj1.png)

+ 在报表中点击「创建图表」，输入信息后即可成功创建。

:::info 注意

此处需选择分组。

+ 若报表中尚不存在图表，可选择图表中任意可引用分组。
+ 若报表中已存在图表，只能选择图表所在一级分组下二级分组。

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Chart%20Management/tj2.png)

# 四、编辑图表
### 1.功能介绍
支持编辑未发布或已发布但未隐藏的图表，提供三种编辑情况：

+ 在列表区编辑，仅能编辑标题
+ 在图表预览区编辑，可以编辑标题、副标题、描述
+ 在设计图表时编辑，可以编辑数据来源类型、方法、标题、副标题以及描述。

:::info 注意

若未显示标题、副标题、描述，可在设计图表的样式栏中查看是否关闭展示，若关闭则无法展示，同理无法编辑。

:::

### 2.操作方法
+ 在列表区，点击「编辑」图标，输入信息后即可成功编辑

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Chart%20Management/bj1.png)

+ 在图表预览区，点击标题区域、副标题区域、描述区域或「编辑」图标，输入信息后即可成功编辑

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Chart%20Management/bj2.png)

+ 在图表设计时，点击「设置」图标后可更改数据来源类型和方法，点击标题区域、副标题区域、描述区域或「编辑」图标，输入信息后即可成功编辑

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Chart%20Management/bj3.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Chart%20Management/bj4.png)

# 五、设计图表
### 1.功能介绍
图表创建完成后，会自动进入或可手动进入图表设计界面。在该界面中，用户可以对图表进行个性化的设计布局，包括选择不同的图表类型，以满足多样化的需求和风格。（详见图表设计文档）

:::info 注意

当图表发布后隐藏，无法手动进入图表设计界面。

:::

### 2.操作方法
点击「编辑」，进入图表设计界面。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Chart%20Management/sj.png)

# 六、查看引用信息
### 1.功能介绍
可查看与该图表存在引用关系的各类元素，包括报表、数据大屏、页面等。

:::info 注意

+ 对于已发布图表，可提供引用链接，可以直接复制引用链接在别处使用。
+ 对于未发布图表，不提供引用链接

:::

### 2.操作方法
点击「查看引用」，即可查看引用信息。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Chart%20Management/yy.png)

# 七、复制图表
### 1.功能介绍
提供图表复制功能，该功能会在原图所在的分组最底层生成一个副本，该副本的标题为“copy of 原图名称”。

### 2.操作方法
点击「复制」，即可成功复制

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Chart%20Management/fz.png)

# 八、发布图表
### 1.功能介绍
图表设计完成后，用户可以选择发布图表。发布后的图表可在其他设计器中被引用，同时展示最近发布时间。若图表发布后有内容更新，原本的“发布”按钮将变为“更新发布”。

:::info 注意

若内容发生更新但尚未进行重新发布，那么引用该图表的地方仍继续展示旧版本的内容。

:::

:::warning 提示

当图表未发布但已保存时，可以在报表以及数据大屏中引用该图表。

:::

:::info 注意

当图表隐藏后，无法发布该图表。

:::

### 2.操作方法
点击「发布/更新发布」，即可成功发布

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Chart%20Management/fb.png)

# 九、查看最近一次发布版本
### 1.功能介绍
当图表发布后有更新，会在图表预览区左上方区域展示最近发布时间，可查看其最近一次发布的版本

### 2.操作方法
点击「查看」，图表预览区会展示最近一次发布版本

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Chart%20Management/ckzj.png)

# 十、隐藏/可见图表
### 1.功能介绍
对于当前暂不使用的图表，可以执行隐藏操作。若日后需要，只需将隐藏的图表设置为可见状态即可重新投入使用。隐藏后的图表不可以被引用，但是不影响已经被引用的数据。

:::info 注意

+ 对于已发布的图表，隐藏后不可编辑
+ 对于未发布的图表，隐藏后允许编辑

:::

### 2.操作方法
点击「隐藏」，图表设置为隐藏状态；再次点击，图表恢复为可见状态。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Chart%20Management/yc.png)

# 十一、导出Excel
### 1.功能介绍
可以将图表数据内容导出为标准化的Excel文件格式。

### 2.操作方法
点击「导出excel」，即可将当前图表中数据以Excel形式导出。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Chart%20Management/dc.png)

# 十二、允许别人编辑
### 1.功能介绍
支持自定义编辑权限，当关闭编辑权限后，非创建者即使登录也无法对该内容进行编辑。

### 2.操作方法
点击开关，即可改变该功能状态。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Chart%20Management/yxbj.png)

# 十三、允许别人引用
### 1.功能介绍
支持自定义引用权限，当关闭引用权限后，非创建者即使登录也无法对该内容进行引用。

### 2.操作方法
点击开关，即可改变该功能状态。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Chart%20Management/yxyy.png)

# 十四、删除图表
### 1.功能介绍
当图表不再使用时，可以选择将其删除。若不确定图表是否需要删除，可以先将其隐藏。

:::info 注意

在删除前，需确保该图表未被其他报表、数据大屏或页面引用，否则删除操作将无法进行。

:::

:::danger 警告

图表删除后无法恢复，请谨慎操作！

:::

### 2.操作方法
点击「删除」图标，确定删除后即可删除

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Chart%20Management/sc.png)

# 十五、附件：名词解释
| <div style="width:60px;">名词</div> | 描述 |
| :---: | --- |
| 图表 | 指具体的图表信息，根据图表模版，带入需要分析的数据后会生成业务图表 |
| 报表 | 设计图表的组合样式，将需要在一起展示的图表添加到一张报表中为一个整体，可以在报表设计页面调整单个图表的占比，发布报表等 |
| 数据大屏 | 一种大型显示系统，可实时展示数据信息。 |


