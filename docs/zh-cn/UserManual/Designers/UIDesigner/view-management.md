---
title: 视图管理
index: true
category:
  - 用户手册
  - 设计器
order: 1
prev:
  text: 界面设计器(UI Designer)
  link: /zh-cn/UserManual/Designers/UIDesigner/README.md
---
页面是数据增删改查的操作入口，数据信息的填写与查看可以通过页面来呈现与交互。利用界面设计器，可以便捷地管理页面，包括进行页面的增加、删除、修改和查询操作，同时还可对页面进行设计布局。通过配置页面上的各组件，即可实现数据的录入、查看、筛选等一系列功能。

在界面设计器中，默认以卡片形式呈现页面列表。页面卡片上可预览到页面的基本信息，包括页面标题、页面缩略图、视图、页面对应模型名称、页面描述。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-management/1.png)

+ 页面标题与页面描述：以文字定义页面的名称以及对页面进行详细描述
+ 页面缩略图：在页面列表通过图片预览当前页面的大致布局样式。支持自行上传图片，若未上传，将显示系统默认的图片。
+ 视图类型：不同业务类型所包含视图类型不同（目前提供了运营管理一种业务类型）。运营管理中的视图类型包括表单、详情、表格、画廊、树视图五种。（详情见视图类型文档）

# 一、筛选
### 1.功能介绍
根据实际业务需求，可以定制页面筛选条件，包括所属应用/模块、模型、业务类型、视图类型及分组设置等，以便对页面进行精确筛选。在当前的筛选条件下，将展示相应的页面列表，方便对不同页面进行设计和编辑操作。

:::info 注意

在下拉选择应用/模块筛选项中，仅是对平台上的应用或模块进行了初步筛选。在实际筛选操作时，仍需进一步选择具体的应用或模块以完成配置。同理，只有当所有的筛选项都配置正确，才能筛选出正确的页面。

:::

### 2.操作方法
在筛选区选择或输入条件，完成对页面的筛选

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-management/shaixuan.png)

# 二、分组管理
### 1.功能介绍
可以利用分组功能对页面进行归类管理（包括添加、修改、删除），根据需要自定义添加最多15个分组。

### 2.操作方法
+ 管理分组：点击「管理分组」，在弹窗中对分组进行管理操作。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-management/group/guanli.png)

+ 添加分组：点击「+ 页面分组」，输入分组名称后回车；或选择其他应用中使用的分组。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-management/group/tianjia.png)

+ 修改分组：双击分组标签，修改后回车即可保存。

:::info 注意

若该分组也被其他应用使用，名称同步变化。

:::

+ 删除分组：点击分组后的「删除」图标，即可删除分组。

:::info 注意

若该分组下存在模型，则无法删除。

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-management/group/shanchu%20.png)

# 三、添加页面
### 1.功能介绍
利用界面设计器创建页面，在创建过程中可编辑页面信息。创建完成的页面可用于菜单展示、页面调用等多种场景。

### 2.操作方法
点击「添加页面」-「直接创建」，在弹窗页面中正确填写信息后，点击「确定」即可成功创建

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-management/tianjia1.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-management/tj.png)

:::warning 提示

在创建页面时，若启用“使用默认视图”选项，系统将根据模型信息与视图类型自动生成一个默认视图，从而简化页面设计的步骤。启用该选项后，还可以选择默认宽度，即设定生成默认视图中组件在页面上所占的默认大小。

:::

# 四、编辑页面
### 1.功能介绍
成功创建的页面可以进行编辑

:::info 注意

仅部分信息支持修改，部分信息在创建时即已固定，因此创建时需谨慎填写。

:::

### 2.操作方法
:::info 注意

页面卡片中的缩略图，仅能通过“方法二”对其进行编辑修改。

:::

方法一：点击「编辑」，即可在页面弹出的编辑页面中进行编辑

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-management/bianji1.png)

方法二：点击页面卡片主体，或点击「设计页面」，进入页面设计界面，进入「页面设置」对其进行编辑

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-management/bianji2.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-management/bianji3.png)

# 五、设计页面
### 1.功能介绍
在设计页面界面时，可以进行页面的设置、搭建、设计和排版工作。通过使用各种组件，可以对页面进行个性化的设计布局，以满足不同的需求和风格。

### 2.操作方法
点击页面卡片主体部分，或点击「设计页面」部分，即可进入设计页面界面（详情见页面设计文档）

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-management/sheji.png)

# 六、查看引用信息
### 1.功能介绍
通过此功能，可以查看到与该页面存在引用关系的各类元素，包括其他视图、菜单。每种关系通过列表展示，列表项为链接，可链接到对应的设计页面；内容为对应内容。

### 2.操作方法
点击「查看被引用的信息」图标，即可查看引用信息

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-management/yinyong.png)

# 七、复制页面
### 1.功能介绍
当需要设计多个内容相似的页面，或想要将某个页面复制到其他应用中时，平台提供了“复制页面”功能。通过该功能，可以快速复制出一个新页面，从而简化设计流程，提高工作效率。

:::info 注意

+ 在复制页面的过程中，可以更改其关联的模型。但需要注意的是，新选择的模型必须是原页面关联的模型或其子模型。
+ 在复制页面的过程中，原页面的视图类型为表单或详情时，在复制时可选择更换视图类型为详情或表单

:::

### 2.操作方法
点击「复制」，在弹出的复制页面弹窗中编辑信息后点击「确定」，即可复制成功

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-management/fuzhi.png)

# 八、隐藏/可见页面
### 1.功能介绍
对于当前暂不使用的页面，可以执行隐藏操作。若日后需要，只需将隐藏的页面设置为可见状态，即可重新投入使用。此外，隐藏后的页面仍支持对其进行编辑等操作

:::info 注意

隐藏后的页面，在菜单绑定页面或跳转动作选择页面时，将不再显示在可选列表中。已被使用的页面隐藏后不影响使用

:::

### 2.操作方法
点击「隐藏」，页面设置为隐藏状态，按钮变为「设为可见」；再次点击，页面设置为可见状态

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-management/yincang1.png)

:::warning 提示

若需要对隐藏的页面进行操作，但是在列表未查找到某个隐藏的页面时，切换「是否可见」筛选项。页面列表默认展示所有“可见”的页面，切换为“全部”或“隐藏”，即可找到隐藏的页面。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-management/yincang2.png)

:::

# 九、删除页面
### 1.功能介绍
当页面不再使用时，可以选择将其删除。若不确定页面是否需要删除，可以先将其隐藏。

:::info 注意

在删除前，需确保该页面未被其他视图或菜单引用，否则删除操作将无法进行。

:::

:::danger 警告

页面删除后无法恢复，请谨慎操作！

:::

### 2.操作方法
点击「删除」图标，确定删除后即可删除

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-management/shanchu.png)

