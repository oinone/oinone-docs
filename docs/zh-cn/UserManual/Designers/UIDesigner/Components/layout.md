---
title: 布局
index: true
category:
  - 用户手册
  - 设计器
order: 1
prev:
  text: 组件与模型总览
  link: /zh-cn/UserManual/Designers/UIDesigner/widgets-and-model-overview.md
---
布局类组件主要用于页面的样式排版，它们相当于一个容器，可以容纳多个其他组件。同时，布局类组件之间支持互相嵌套，以便用户更灵活地构建页面结构和布局。

# 一、通用属性
+ 是否隐藏：除了简单的隐藏与非隐藏对立选项外，还可以设置条件隐藏功能。即当满足特定条件时，组件才会被隐藏；若条件不符合，则组件保持可见状态。

:::info 注意

当组件被设为隐藏时，其在实际页面中将不可见。然而，在设计页面时，即使组件被设置为隐藏，也会在设计界面中展示出来。

:::

+ 标题排列方式：即标题与其内容的排列，分为横向和纵向两种。对于布局类组件，设置排列方式，会将该组件内所有子类组件的标题统一按照设置的排列方式进行调整。
+ 显示设备：包括PC端、移动端与PAD端。

:::tip 举例

在设计PC端页面时，若分组组件的显示设备设置为仅移动端而未包含PC端，则在实际页面展示中，该分组组件及其所包含的其他组件均不会显示在PC端页面上。

:::

# 二、特有属性
## （一）分组
可以将业务含义相近的组件归入同一个分组中，以实现页面组件的分类管理和清晰展示。

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/layout/fenzu1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/layout/fenzu2.png)

:::

分组组件特有属性：

+ 标题：是组件在当前页面的展示名称。
+ 描述说明：用于描述组件信息。分组的描述说明在标题左侧。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/layout/fenzu3.png)

## （二）布局容器
类似于表格结构，用户可以灵活地增添或删除某一行或某一列，同时可以对其中的某个容器进行个性化设置。

:::info 注意

+ 仅显示存在组件的容器，未配置组件的容器将不在页面中展示。
+ 一个容器内可以包含多个容器

:::

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/layout/rongqi1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/layout/rongqi2.png)

:::

布局容器特有属性：

+ 标题：是组件在当前页面的展示名称。
+ 是否显示边框：支持对容器的边框进行显示或隐藏设置，并且可以一键将所设置的边框可见度应用到所有容器，或一键清除所有容器的边框设置。
+ 边框宽度：可设置布局容器边框的宽度，且宽度值需为整数。
+ 边框颜色：通过颜色选择器，可以自定义边框的颜色。
+ 边框样式：提供实线、虚线、双线和点状线四种样式供选择。

:::info 注意

+ 边框的颜色与样式只有在边框设置为可见，并且宽度设置为大于0的值时，才会在页面上显示出来。
+ 若布局容器中未添加任何组件，即使设置了边框也无法显示。
+ 可以分别为布局容器与单个容器设置边框。布局容器边框将应用与全局，单个容器边框仅应用与容器。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/layout/rongqi3.png)

:::

+ 行间距：若布局容器包含多行，可调整每行容器间的间距，以使得页面更加美观。
+ 列间距：若布局容器包含多列，可调整每列容器间的间距，以使得页面更加美观。
+ 内边距：即布局容器与所含容器之间的边距，可自定义上、下、左、右四个方向的边距
+ 外边距：即布局容器与外部组件之间的边距，可自定义上、下、左、右四个方向的边距
+ 容器
    - 插入行：允许在选中容器所在行的上方或下方插入一行新的容器。
    - 插入列：允许在选中容器的左侧或右侧插入一列新的容器。
    - 宽度：支持自适应和自调节两种模式。选择自调节时，可自定义容器在所在行中所占的宽度大小。
    - 纵向对齐方式：指容器中组件的纵向排列方式，默认设置为顶部对齐。

:::info 注意

布局容器中包含了多个子容器。在设置属性时，如果选择“布局容器”，则将对所有包含在内的容器统一应用相同的属性设置；而如果选择具体的“容器”，则只会对该单个容器的属性进行设置，不影响其他容器。

:::

## （三）选项卡
每个选项卡内可以添加多个选项页，用户可以为每个选项页配置不同的组件，以满足多样化的展示需求。

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/layout/xuanxiangka1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/layout/xuanxiangka2.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/layout/xuanxiangka3.png)

:::

选项卡特有属性：

+ 选项标题位置：支持上方或左侧两种位置。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/layout/xuanxiangka4.gif)

+ 排序：支持拖拽选项页对其位置进行更换。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/layout/xuanxiangka5.gif)

+ 选项页
    - 默认激活：默认选项页激活，也可设置激活条件，当符合条件时激活选项页。

## （四）折叠面板
面板中可以配置各种组件，用户可以根据需要展开或折叠面板，以优化页面布局和用户体验。

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/layout/zhedie1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/layout/zhedie2.png)

:::

折叠面板特有属性：

+ 样式类型：提供四种风格样式供选择，包括带边框、斑马纹、简约和透明背板，以满足不同需求的折叠面板设计。
+ 展开图标位置：可灵活设置展开图标的位置，支持左侧、右侧显示，或选择隐藏展开图标，以适应不同的设计风格。
+ 默认展开全部：通过开关控制，可设置折叠面板在实际页面中的初始状态。开关打开时，面板默认展开；开关关闭时，面板默认收起。

:::info 注意

若启用手风琴模式，该功能失效。

:::

+ 手风琴模式：开启此模式后，若存在多个折叠面板项，将限制只能展开其中一项。当尝试展开其他面板项时，已打开的面板项会自动折叠。
+ 折叠方式：提供两种折叠方式供选择，可通过点击头部区域或点击标题来折叠面板，以满足不同的用户交互习惯。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/layout/zhedie3.gif)

+ 排序：支持拖拽折叠面板项对其位置进行更换。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/layout/zhedie4.gif)
