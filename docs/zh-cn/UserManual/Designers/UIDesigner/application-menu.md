---
title: 应用菜单
index: true
category:
  - 用户手册
  - 设计器
order: 7
prev:
  text: 自定义组件-元件设计
  link: /zh-cn/UserManual/Designers/UIDesigner/CustomizedComponents/design-of-customized-component-meta.md
---
&emsp;&emsp;设计完成的页面可以通过与菜单的绑定，在应用中得以展现。Oinone界面设计器内置了菜单管理功能，允许用户根据实际需求自定义菜单结构，确保各个视图与相应菜单项之间的精准绑定，进而提升应用的导航逻辑性和用户体验的流畅性。

&emsp;&emsp;在应用中，菜单的配置可通过进入界面设计器后的「菜单」页面来完成，主要包含三个核心部分：筛选区、菜单列表以及菜单信息。

+ 筛选区：提供便捷的菜单筛选功能，帮助用户快速查找出所需的菜单项，以便进行配置和调整。
+ 菜单列表：清晰展示菜单的排列顺序，可以直观地了解菜单的结构和层次。
+ 菜单信息：详细展示每个菜单项的具体信息，包括名称、类型、图标等，方便对菜单进行全面的了解和管理。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Application%20Menu/1.png)

&emsp;&emsp;在界面设计器中进行页面设计时，若选择了显示母版模式，系统将直观展示菜单与页面之间的关联关系。用户可以在此模式下对菜单进行绑定页面、添加新菜单项、删除现有菜单项以及编辑菜单项等操作。这些具体操作与在菜单管理页面中的操作方式保持一致，方便用户快速上手并灵活管理菜单与页面的关联。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Application%20Menu/2.png)

# 一、筛选区
### 1.功能介绍
菜单管理页面提供了高效便捷的筛选功能，助力用户迅速定位并查找出所需的菜单项，以便进行灵活的配置和调整。筛选区主要包含两个核心部分：一是筛选应用，用户可根据应用需求快速过滤菜单项；二是利用菜单名称进行搜索，通过输入关键词即可精准查找到目标菜单，极大地提升了菜单管理的效率和便捷性。

### 2.操作方法
在筛选区选择或输入条件，完成对菜单的筛选。

:::info 注意

应用是必选的关键项，菜单列表和菜单信息均基于所选应用进行展示和配置。

:::

:::warning 提示

若在当前列表中未找到所需的应用，用户可前往应用中心创建新的应用，或安装已有的应用后，即可在筛选应用中查找到并选用。

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Application%20Menu/sxq.png)

# 二、菜单列表
### 1.功能介绍
菜单列表直观的展示菜单的结构与层次。在菜单列表中，可以进行菜单的添加、修改、删除等操作，实现菜单的灵活管理，满足多样化的需求。

:::info 注意

系统内置的菜单项无法对其进行编辑、删除或视图绑定等操作，只可对其执行隐藏或可见操作。

:::

### 2.操作方法
+ 添加菜单项：在菜单底部，点击「添加菜单项」，输入菜单名称后即可创建成功。默认在菜单底部创建菜单。

:::warning 提示

可选择某一菜单项，点击「添加菜单项」后输入菜单名称，即可在该菜单项下成功创建。

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Application%20Menu/lb1.png)

+ 修改菜单名称：选中目标菜单，点击菜单名称后展现输入框，输入新的名称后回车或点击除输入框外任意位置即可创建成功。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Application%20Menu/lb2.png)

+ 删除菜单项：选中目标菜单，点击「删除」图标，即可成功删除。

:::info 注意

当该菜单下存在子菜单，且子菜单未删除时，不允许删除该菜单。

:::

:::danger 警告

菜单删除后无法恢复，请谨慎操作！

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Application%20Menu/lb3.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Application%20Menu/lb4.png)

+ 隐藏/可见菜单：选中目标菜单，点击「隐藏/可见」图标，即可成功改变菜单状态。

:::info 注意

当该菜单下存在子菜单时，若改变该菜单的状态，则该状态将自动应用于该菜单及其所有子菜单，实现状态的统一管理和快速调整。

:::

:::warning 提示

若设计好的菜单状态可见，但在应用中未展示。可以在「管理中心」中查看是否为菜单配置了权限。

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Application%20Menu/lb5.png)

+ 移动菜单项：选中目标菜单，长按菜单移动位置，可选择同级移动或移动为某菜单子级。

:::info 注意

当该菜单下存在子级时，移动该菜单，所属子菜单也同时移动。

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Application%20Menu/lb6.png)

# 三、菜单信息
### 1.功能介绍
详细展示每个菜单项的具体信息，当创建菜单或编辑菜单时，可对其详细信息进行编辑。

:::info 注意

在筛选区中选定的应用，即为菜单所属的应用。菜单所属的应用在创建时即已确定，且后续不可修改。所有菜单可绑定的模型、视图均隶属于该应用。

:::

+ 菜单名称：即菜单在界面上的展示名称。
+ 菜单所属应用：指菜单所归属的应用，菜单将在该应用下进行展示。
+ 图标：位于菜单名称前的标识图标，增强菜单的可视化和辨识度。
+ 显示设备：定义菜单在哪些设备上可显示，包括PC端、移动端和PAD端，满足多设备适配需求。
+ 绑定类型：提供不同的绑定选项，可绑定至不同的视图类型，包括“绑定视图”和“绑定链接”。
    - 菜单应用模型：当绑定类型为绑定视图时，显示该属性。允许选择当前应用下所包含的模型。
    - 绑定视图：当绑定类型为绑定视图时，显示该属性。允许选择当前模型下所包含的视图。

    :::warning 提示

    若没有找到想要的视图，提供快捷入口可以创建页面，页面将自动绑定该菜单。

    :::

    - 绑定URL：当绑定类型为绑定URL时，显示该属性。允许输入想要跳转的页面URL。
    - 打开方式：当绑定类型为绑定URL时，显示该属性。可选择页面打开方式，包括路由打开与打开新页面。
        * 路由打开：在当前页面内直接打开URL页面。
        * 打开新页面：在新窗口中打开URL页面。
+ 切换菜单自动刷新：当用户在其他页面进行修改后，切回该菜单时，系统将自动刷新菜单内容，确保信息的实时性。
+ 预置过滤条件：在配置界面设置好过滤条件后，该过滤条件将在页面查询数据时自动应用。配置完成后，预置的过滤条件在页面运行时将一直保持，不会被清空或重置

:::tip 举例
当前「资产」页面数据

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Application%20Menu/yzgltj1.png)

设置预制过滤条件为：资产名称等于笔记本

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Application%20Menu/yzgltj2.png)

「资产」页面仅展示资产名称为笔记本的数据

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Application%20Menu/yzgltj3.png)
:::


+ 界面设计：当绑定类型为视图类型，且已绑定至某视图时，可利用界面设计功能进入视图的页面设计界面，对页面进行调整和优化。

### 2.操作方法
输入或选择信息后点击「保存」，即可完成对信息的编辑。

:::info 注意

+ 若用户未填写必填信息，系统会提示未填项未完成，且不会保存菜单项信息。
+ 若绑定视图未发布或存在修改未发布的情况时，系统将提示“绑定视图页面尚未发布”或“视图绑定中存在最新，但尚未发布的页面”。

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Application%20Menu/xx1.png)

点击「界面设计」，跳转至绑定页面的页面设计界面。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Application%20Menu/xx2.png)

