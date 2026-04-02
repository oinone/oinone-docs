---
title: 图表模板
index: true
category:
  - 用户手册
  - 设计器
order: 7
next:
  text: 集成设计器(Integrated Designer)
  link: /zh-cn/UserManual/Designers/IntegratedDesigner/README.md
---
当系统提供的图表类型暂时无法满足实际需求时，不必受限于现有的选项，可以自主增加图表类型。通过这一功能，可以根据特定的业务需求或数据展示需求，引入更多样化的图表类型，从而丰富数据可视化的表现形式，让数据展示更加贴切、直观。

进入数据可视化的「图表模板」页面，可以对自定义的图表模板进行管理

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/chart%20template/1.png)

# 一、筛选
### 1.功能介绍
根据实际业务需求，可以定制图表模板筛选条件。在当前的筛选条件下，将展示相应的图表模板列表，方便查看和编辑对不同的图表模板。

:::warning 提示

对于常用的筛选项组合，可以将其收藏进筛选方案，之后可直接在筛选方案中一键选择对图表模板进行筛选。

:::

### 2.操作方法
+ 筛选：在筛选区输入条件后点击「搜索」，即可对图表模板进行筛选。
+ 一键清除：点击「清除」图标，可一键清除当前筛选区中条件

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/chart%20template/sx1.png)

+ 管理筛选方案：鼠标移动至「筛选方案」图标，即可管理筛选方案
    - 添加：在筛选区中选择或输入筛选条件后，点击「收藏当前条件」，在弹窗中输入方案名称，即可将当前筛选条件组合添加到筛选方案中
    - 查找：在输入框中输入方案名称
    - 修改：点击「筛选方案管理」后在弹窗中选择某项方案，点击方案名称，即可修改方案名称
    - 删除：在方案列表中选择某项方案，点击「删除」图标，即可删除该筛选方案

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/chart%20template/sx2.png)

# 二、创建图表模板
### 1.功能介绍
支持自定义图表模板，可为图表设置名称、图标、分组等属性

+ 分组：在设计图表时，可在对应分组中找到自定义的图表模板
+ 是否常用：启用此功能后，该模板将被添加到设计图表时的“常用类型”中，方便快速选用
+ 排序：支持为图表设置排序顺序，方便根据需求对图表模板进行有序管理
+ 维度数量：可限制图表维度数量
+ 数值数量：可限制图表数值数量
+ 支持组件：即该模板所兼容的样式选项。选中后，可在该模板的样式栏中应用这些样式

### 2.操作方法
点击「创建」，在弹窗中依据实际需求编写信息后点击「确定」，即可创建成功

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/chart%20template/cj.png)

# 三、编辑图表模板
### 1.功能介绍
成功创建的图表模板可以进行编辑

:::info 注意

仅部分信息支持修改，部分信息在创建时即已固定，因此创建时需谨慎填写。

:::

### 2.操作方法
点击「编辑」，即可在弹出的编辑页面中进行编辑

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/chart%20template/bj.png)

# 四、低无一体
### 1.功能介绍
当无代码设计图表模板难以满足某些特殊场景的开发需求或无法完善相关功能时，可以使用低无一体功能，通过编写代码来对工程进行进一步完善和优化。

:::warning 提示

系统支持所有自定义组件均具备低无一体功能。为便于代码管理并减少网络请求量，建议将低代码开发文件集中在一个组件中进行统一上传。统一上传与逐个上传在效果上并无差异，但统一上传能更高效地管理代码，并有效避免文件过多导致的网络请求负担。

:::

### 2.操作方法
+ 点击「低无一体」，展示弹窗

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/chart%20template/dwyt1.png)

+ 如果首次进入该图表模板，或模板样式发生了变更，需点击「生成SDK」，生成对应的SDK
+ 每次生成SDK后，点击「下载模板工程」，下载对应的模板工程，在其中进行开发
+ 点击「上传JS文件」或「上传CSS文件」，上传开发好的文件

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/chart%20template/dwyt2.png)

# 五、设计图表模板样式
### 1.功能介绍
支持为已创建好的图表模板自定义样式栏，可根据实际需求调整，以满足个性化需求展示。

:::warning 提示

关于样式栏的设计，可参考「自定义组件-元件设计」文档。此外，系统提供了与图表样式相关的各类组件，以便更好定制图表样式。

:::

### 2.操作方法
点击「低无一体」-「跳转样式设计页面」，可跳转至界面设计器对图表模板样式进行设计。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/chart%20template/sj.png)

