---
title: 自定义组件-元件设计
index: true
category:
  - 用户手册
  - 设计器
order: 3
next:
  text: 应用菜单
  link: /zh-cn/UserManual/Designers/UIDesigner/application-menu.md
---
元件的设计与页面设计保持一致性，其设计界面主要划分为四个功能区域：操作栏、工具栏、画布设计区以及属性面板。不同之处在于，元件设计在画布设计区中新增了两项实用功能：视图切换与复制功能。

+ 视图切换功能：能够展示当前元件所支持的所有视图类型，用户可以根据需求选择不同的视图来进行元件页面的设计。
+ 复制功能：若用户希望将已经设计好的元件页面快速应用到其他元件所支持的视图类型中，可以使用复制功能，并选择目标视图类型进行快速复制，提高设计效率。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Custom%20Components/Component%20Design/1.png)

# 一、操作栏-发布
### 1.功能介绍
页面设计完成后，通过发布操作可以使页面正式生效。若未进行发布操作，页面也会自动保存，但在此情况下，自动保存的版本仅作为草稿存在，并不会正式对外展示或生效。

:::info 注意

在发布过程中，如果页面中的组件属性不符合预设的校验规则，例如必填属性未填写或输入内容未通过校验，发布操作将会失败。同时，相应的字段会被特殊标记，以便用户快速定位并查看需要修改的属性，确保页面能够顺利发布并生效。

:::

### 2.操作方法
在操作栏中，点击「发布」，即可发布当前页面

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Custom%20Components/Component%20Design/fb.png)

# 二、工具栏
## （一）组件库
### 1.功能介绍
组件库中包含组件和模型两个部分（详情见组件介绍文档）：

+ 组件：当前设计器支持的所有组件，包括系统组件与自定义组件

:::info 注意

元件设计的组件库中不包含动作类组件。

:::

+ 模型：页面所在模型下的所有字段以及系统默认动作

:::info 注意

页面设计与元件设计的模型存在以下区别：

+ 页面设计的模型来源于模型设计器中预先创建好的模型，其字段也是由模型设计器生成并提供的。
+ 而元件设计的模型则是平台专门为元件设计所提供的，其中内置了众多用于属性设计的字段，以满足元件设计的特殊需求。

:::

:::info 注意

组件与模型的区别：

1. 展示内容维度不同

组件中展示的内容是组件信息，如分组、选项卡、单行文本、文件上传等；模型中展示的是模型下已有的所有字段。

2. 使用功能不同

组件中的组件使用前需要在模型中创建一个字段，当然，创建好的字段也会存在于模型中；模型中的字段可直接使用，并且使用时会在设计画布中对应生成个默认组件。

3. 使用场景不同

如果模型中已经存在目标字段，应直接选择从模型中拖拽字段；如果模型中没有需要的字段，可以在页面中增加一个组件，实际上也是在新增一个字段。

:::

### 2.操作方法
拖拽组件至画布设计区对应区域

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Custom%20Components/Component%20Design/gjl.png)

## （二）设计大纲
### 1.功能介绍
支持查看设计大纲，利用列表直观展示组件之间所属关系。

:::warning 提示

当选中页面中的某一组件时，在画布设计区中会快速定位该组件，并在右侧的属性区域会即时展示该组件的相关属性，方便用户进行查看和编辑。当页面设计较为复杂，组件众多时，用户可以利用设计大纲快速找到所需组件，然后便捷地对其进行配置和调整。

:::

### 2.操作方法
在左侧工具区中，点击「设计大纲」图标，即可展示设计大纲列表。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Custom%20Components/Component%20Design/sjdg.png)

# 三、画布设计区
## （一）视图切换
### 1.功能介绍
在视图切换区域，系统会展示当前元件所支持的所有视图类型。用户可以自由地切换不同的视图类型，并为每个视图类型设计独特的页面，以满足多样化的设计需求。

### 2.操作方法
点击不同视图类型名称，即可切换至对应页面

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Custom%20Components/Component%20Design/stqh.png)

## （二）复制
### 1.功能介绍
若想要将当前属性页面快速复制到该元件支持的其他视图类型下，可以便捷地利用此功能实现。复制过去的页面将会覆盖目标视图类型下的原页面。

### 2.操作方法
点击「复制」图标，在弹窗中选择页面类型

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Custom%20Components/Component%20Design/fz1.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Custom%20Components/Component%20Design/fz2.png)

## （三）页面设计
### 1.功能介绍
当组件被添加到设计画布区域时，会自动生成默认样式。

+ 用户可以选中任一组件，并在右侧属性面板中对其进行详细的属性设置。大部分属性调整均能实时反映在画布上，便于用户即时查看效果并进行相应调整。

:::info 注意

当选中组件为表格时，「模型」会自动切换成表格所关联的模型

:::

+ 用户可通过快捷方式轻松选中画布上的某一组件，并将其快速切换为其他组件类型，操作简便快捷。
+ 当页面中存在组件嵌套情况时，用户可灵活切换选中组件，以便对嵌套在内的组件进行便捷的设置和调整。

:::info 注意

仅允许从内嵌组件切换至外层组件。

:::

### 2.操作方法
:::warning 提示

此处以表单视图为例，其他视图类型同理。

:::

+ 在左侧工具区的组件库中，拖拽组件进入画布设计区对应位置。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Custom%20Components/Component%20Design/ymsj1.png)

+ 点击「切换组件」图标，可选择符合条件的其他组件

:::info 注意

支持的切换类型规则为：仅当组件创建时的设置字段业务类型与组件本身所支持的视图类型完全一致时，该组件才可进行切换。

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Custom%20Components/Component%20Design/ymsj2.png)

+ 点击「切换选中组件」图标，可切换至外层组件

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Custom%20Components/Component%20Design/ymsj3.png)

# 四、属性面板
### 1.功能介绍
在属性面板中，用户可以方便地设置组件的各种属性（详情见组件属性介绍文档），并且能够查看组件的字段信息。通过灵活配置组件属性，用户可以实现组件的多样化展示和功能定制。

### 2.操作方法
+ 点击某一组件，在属性面板「属性」页面中配置属性信息。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Custom%20Components/Component%20Design/sxmb1.png)

+ 点击某一组件，在属性面板「字段」页面中显示字段信息。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Custom%20Components/Component%20Design/sxmb2.png)

# 五、附件：名词解释
| 名词 | 描述 |
| :---: | --- |
| 元件 | 依据不同的字段业务类型而设计的属性页面。 |
| 操作栏 | 包含常用的操作按钮，可进行页面设置、历史记录、保存等操作。 |
| 工具栏 | 包含组件库、页面大纲与页面设置。 |
| 画布设计区 | 用户进行页面设计的主要区域，在此区域中拖拽组件、调整布局等。 |
| 属性面板 | 显示和编辑选中组件的属性。可调整组件的标题、校验、交互等属性。 |
| 组件库 | 一个集合了各种可复用组件的资源库。 |
| 组件 | 页面设计的基本单元，如按钮、文本框、图片等。 |
| 模型 | 在模型设计器中设计完成的模型。 |
| 设计大纲 | 页面设计的整体框架和结构。 |
| 视图类型 | 页面展示数据的各种方式布局。 |


