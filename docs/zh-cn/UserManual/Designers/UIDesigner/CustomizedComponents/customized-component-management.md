---
title: 自定义组件管理
index: true
category:
  - 用户手册
  - 设计器
order: 1
prev:
  text: 自定义组件
  link: /zh-cn/UserManual/Designers/UIDesigner/CustomizedComponents/README.md
---
在页面设计器中，默认以卡片形式呈现组件列表。组件卡片上可预览到组件的基本信息，包括组件名称、组件图标以及组件描述。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Custom%20Components/Custom%20Component%20Management/1.png)

# 一、筛选
### 1.功能介绍
根据实际业务需求，可以定制组件筛选条件，包括是否隐藏、组件名称、组件分类，分组设置，以便对组件进行精确筛选，在设定好的筛选条件下，将展示相应的组件列表，方便对不同组件进行查看和编辑操作。

### 2.操作方法
在筛选区选择或输入条件，完成对组件的筛选。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Custom%20Components/Custom%20Component%20Management/sx.png)

# 二、分组管理
### 1.功能介绍
可以利用分组功能对组件进行归类管理（包括添加与删除），不限制分组数量。

### 2.操作方法
+ 管理分组：点击「管理分组」，在弹窗中对分组进行管理操作。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Custom%20Components/Custom%20Component%20Management/fz1.png)

+ 添加分组：点击「添加分组」，输入分组名称后回车即可添加成功。

:::info 注意

分组名称只允许输入中文或英文字符。

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Custom%20Components/Custom%20Component%20Management/fz2.png)

+ 删除分组：点击分组后的「删除」图标，即可删除分组

:::info 注意

当分组下存在组件时不允许删除。

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Custom%20Components/Custom%20Component%20Management/fz3.png)

# 三、排序
### 1.功能介绍
可以对组件及其分组进行排序，排序后的结果将在页面设计时的组件库中展示出来，方便用户按需选择和使用。

### 2.操作方法
+ 点击「排序」进入排序页面

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Custom%20Components/Custom%20Component%20Management/px1.png)

+ 拖拽分组前「拖拽」按钮，可对分组进行排序
+ 拖拽「组件」按钮，可对组件进行排序，支持跨分组排序

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Custom%20Components/Custom%20Component%20Management/px2.png)

+ 点击「编辑」图标，可修改分组名称
+ 点击「删除」图标，可删除分组

:::info 注意

仅允许删除自定义分组。此外，若分组下存在组件不允许删除。

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Custom%20Components/Custom%20Component%20Management/px3.png)

# 四、添加组件
### 1.功能介绍
利用界面设计器创建组件，在创建过程中可以编辑组件信息。创建完成的组件可在组件库中被使用。

### 2.操作方法
点击「添加组件」，在弹窗页面中正确填写信息后，点击「确定」即可成功创建。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Custom%20Components/Custom%20Component%20Management/tj1.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Custom%20Components/Custom%20Component%20Management/tj2.png)

# 五、隐藏/可见组件
### 1.功能介绍
对于当前暂不使用的组件，可以执行隐藏操作。若日后需要，只需将隐藏的组件设置为可见状态，即可重新投入使用。

### 2.操作方法
点击「隐藏」，组件设置为隐藏状态，按钮变为「显示」；再次点击，组件设置为可见状态。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Custom%20Components/Custom%20Component%20Management/yc1.png)

:::warning 提示

若需要对隐藏的组件进行操作，但是在列表未查找到某个隐藏的组件时，切换「是否可见」筛选项，切换为“全部”或“隐藏”，即可找到隐藏的组件。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Custom%20Components/Custom%20Component%20Management/yc2.png)

:::



**以下功能仅针对自定义组件。**

# 六、编辑组件
### 1.功能介绍
成功创建的组件可对其进行编辑。

:::info 注意

仅部分信息支持修改，部分信息在创建时即已固定，因此创建时需谨慎填写。

:::

### 2.操作方法
点击「编辑」，即可在弹出的编辑页面中进行编辑。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Custom%20Components/Custom%20Component%20Management/bj.png)

# 七、查看引用信息
### 1.功能介绍
通过此功能，可以查看到与该组件存在引用关系的页面。关系通过列表展示，列表项为链接，可链接到对应的设计页面，内容为对应内容。

### 2.操作方法
点击「查看引用信息」图标，即可查看引用信息。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Custom%20Components/Custom%20Component%20Management/yy.png)

# 八、管理元件
### 1.功能介绍
一个组件中可包含多个元件，为确保组件的功能和性能达到设计要求，需要对这些元件进行全面而细致的管理。具体管理操作包括元件的创建、编辑以及删除等，以确保组件的构成合理、功能完善。（详情见元件信息文档）

### 2.操作方法
点击组件卡片主体部分，或点击「管理元件」图标，进入元件管理页面。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Custom%20Components/Custom%20Component%20Management/glyj.png)

# 九、删除组件
### 1.功能介绍
当组件不再使用时，可以选择将其删除。若不确定组件是否需要删除，可以先将其隐藏。

:::info 注意

在删除前，需确保该组件未被其他页面引用，否则删除操作将无法进行。

:::

:::danger 警告

页面删除后无法恢复，请谨慎操作！

:::

### 2.操作方法
点击「删除」图标，确定删除后即可删除

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Custom%20Components/Custom%20Component%20Management/sc.png)

# 十、低无一体
### 1.功能介绍
Oinone平台支持将低代码开发与无代码开发有机融合，当无代码开发模式难以满足某些特殊场景的开发需求或无法完善相关功能时，用户可以使用低无一体功能，通过编写代码来对工程进行进一步完善和优化。

:::warning 提示

系统支持所有自定义组件均具备低无一体功能。为便于代码管理并减少网络请求量，建议将低代码开发文件集中在一个组件中进行统一上传。统一上传与逐个上传在效果上并无差异，但统一上传能更高效地管理代码，并有效避免文件过多导致的网络请求负担。

:::

### 2.操作方法
+ 点击「低无一体」，进入弹窗

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Custom%20Components/Custom%20Component%20Management/dwyt1.png)

+ 若是首次进入该组件设计或组件中的元件发生了变更，点击「生成SDK」，生成该组件的SDK。
+ 每次生成SDK后，点击「下载模板工程」，下载对应的模板工程，在其中进行开发
+ 点击「上传JS文件」或「上传CSS文件」，上传开发好的文件

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Custom%20Components/Custom%20Component%20Management/dwyt2.png)

# 十一、附件：名词解释
| 名词 | 描述 |
| :---: | --- |
| 组件 | 页面设计的基本单元，如按钮、文本框、图片等。 |
| 元件 | 依据不同的字段业务类型而设计的属性页面。 |
| 低无一体 | 反向生成API代码，生成对应的扩展工程与API依赖包，通过专业研发人员开发后上传至平台。 |


