---
title: 视图设计
index: true
category:
  - 用户手册
  - 设计器
order: 3
---
Oinone为用户提供一套全面的工具集，旨在帮助用户创建、编辑和优化应用的界面。通过这一功能，用户可以轻松设置页面的布局、样式、交互效果等，以实现美观、直观且用户友好的界面。本平台包含丰富的组件库，用户可以根据需求选择合适的组件来构建页面。

本界面主要分为四个功能区域，分别为：操作栏、工具栏、画布设计区、属性面板

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-Design/1.png)

:::warning 提示

本节以表单为例，其他视图类型详情可查阅视图类型文档。

:::

# 一、操作栏
## （一）切换页面尺寸
### 1.功能介绍
用户可以根据不同的业务应用场景，灵活地将页面切换至PC端或移动端进行设计布局。这一功能有效避免了因设备差异而导致的页面布局混乱问题，从而显著提升了用户体验。无论用户使用的是何种设备，页面都能呈现出最佳的展示效果。

### 2.操作方法
在顶部操作栏中，点击「PC端」图标或「移动端」图标，可切换画布为对应页面

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-Design/caozuolan/chicun1.png)

![PC端设计页面](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-Design/caozuolan/chicun2.png)

![移动端设计页面](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-Design/caozuolan/chicun3.png)

## （二）查看历史版本
### 1.功能介绍
查看历史版本功能允许用户查看在过去不同时间点发布的版本记录，这对于需要追溯或比较页面内容的场景尤为有用。此外，查看历史版本功能还为用户提供了数据保护和安全性方面的保障。在遭遇数据丢失、恶意篡改或系统故障等意外情况时，用户可以通过恢复历史版本，迅速找回重要的数据或内容。

:::info 注意

该功能仅限于查看以往发布过的页面版本。虽然页面具备自动保存功能，但若某个版本未被发布，则它不会在历史记录中得以保存。

:::

### 2.操作方法
+ 在顶部操作栏中，点击「查看历史版本」图标，进入历史版本记录页面。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-Design/caozuolan/lishi1.png)

+ 选择某一历史版本，点击「恢复此版本」，即可恢复至该历史版本

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-Design/caozuolan/lishi2.png)

## （三）显示/隐藏母版
### 1.功能介绍
母版提供了一套标准的页面元素与布局模板，用户可以基于母版快速创建具有一致风格的页面。在页面设计时，默认情况下母版不会直接展示，但用户可以根据需要手动进行设置。当选择显示母版时，用户可以全局预览页面的整体展示效果。

### 2.操作方法
在顶部操作栏中，点击「显示/隐藏母版」图标，即可显示或隐藏母版形式

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-Design/caozuolan/muban.png)

## （四）发布
### 1.功能介绍
页面设计完成后，通过发布操作可以使页面正式生效。若未进行发布操作，页面也会自动保存，但在此情况下，自动保存的版本仅作为草稿存在，并不会正式对外展示或生效。

:::info 注意

在发布过程中，如果页面中的组件属性不符合预设的校验规则，例如必填属性未填写或输入内容未通过校验，发布操作将会失败。同时，相应的字段会被特殊标记，以便用户快速定位并查看需要修改的属性，确保页面能够顺利发布并生效。

:::

### 2.操作方法
在顶部操作栏，点击「发布」，即可发布当前页面

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-Design/caozuolan/fabu.png)

# 二、工具栏
## （一）组件库
### 1.功能介绍
组件库中包含组件和模型两个部分（详情见组件介绍文档）：

+ 组件：当前设计器支持的所有组件，包括系统组件与自定义组件

:::info 注意

部分组件需依赖对应应用或模块后才可使用，如数据流程、集成连接器等组件

:::

+ 模型：页面所在模型下的所有字段以及系统默认动作
:::warning 提示

除当前页面模型中包含的字段组件外

+ 支持使用虚拟字段（并不实际存储于数据库之中，却能够在业务逻辑处理及界面交互过程中发挥作用的特殊字段）。例如：在界面设计器的规则设定下，每个字段组件在同一页面内仅允许被使用一次。借助虚拟字段的生成机制，用户可以创建出与原组件完全一致的复用组件，从而实现组件的高效复用。此外，在表格中，虚拟字段还可以被设置为搜索条件，展示并应用于页面中。
    - 添加
        * 字段映射：当选择字段类型为“关联模型字段”时，需配置字段映射，即当前页面模型与关联模型的字段映射规则

          ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-Design/gongjulan/xuniziduan-tj1.png)

          ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-Design/gongjulan/xuniziduan-tj2.png)

    - 删除

    ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-Design/gongjulan/xuniziduan-sc.png)

+ 支持下钻多对一字段。允许用户通过下钻功能，将当前组件库所展示的模型切换为多对一字段的关联模型，用户可以将关联模型中可用的字段直接拖拽至页面设计区域。

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

:::info 注意

在页面配置组件时，需将动作型组件和非动作型组件分别放置到画布中的合适位置，并确保对组件的必填属性进行正确配置，否则组件将无法正常工作，可能导致出错。

:::

## （二）设计大纲
### 1.功能介绍
支持查看设计大纲，利用列表直观展示组件之间所属关系

:::warning 提示

当选中页面中的某一组件时，右侧的属性区域会即时展示该组件的相关属性，方便用户进行查看和编辑。当页面设计较为复杂，组件众多时，用户可以利用设计大纲快速找到所需组件，然后便捷地对其进行配置和调整。

:::

### 2.操作方法
在左侧工具区中，点击「设计大纲」图标，即可展示设计大纲列表

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-Design/gongjulan/dagang.png)

## （三）页面设置
### 1.功能介绍
在页面设置中，用户可以修改当前页面的相关信息，如标题、描述等。支持固定动作区，当页面滚动时动作区始终可见。此外，页面设置也是为页面上传缩略图的唯一途径，方便用户为页面添加合适的缩略图以提升视觉效果和辨识度。

:::warning 提示

当页面所属的模型中有字段发生变更时，用户可以通过页面设置上方的「重新生成默认视图」功能，根据模型变更快速生成一个新页面。该功能提供了两种生成方式：

+ 全部重新生成：将按照默认组件的顺序，依据模型变更生成一个全新的默认视图。
+ 仅变更部分重新生成：保持原始模型中未变更部分不变，仅针对模型中变更的字段组件进行增加或减少。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-Design/gongjulan/shezhi1.png)

:::

### 2.操作方法
在左侧工具区中，点击「页面设置」图标，即可展示页面设置页面
+ 是否浮动操作栏：若开启此功能，当页面滚动时，动作区保持不动
+ 缩略图：可上传图片作为页面缩略图

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-Design/gongjulan/fudong.png)

# 三、画布设计区
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

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-Design/huabushejiqu/1.png)

+ 点击「切换组件」图标，可选择符合条件的其他组件。

:::info 注意

支持的切换类型规则为：仅当组件创建时的设置字段业务类型与组件本身所支持的视图类型完全一致时，该组件才可进行切换。

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-Design/huabushejiqu/2.png)

+ 点击「切换选中组件」图标，可切换至外层组件。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-Design/huabushejiqu/3.png)

# 四、属性面板
### 1.功能介绍
在属性面板中，用户可以方便地设置组件的各种属性（详情见组件属性介绍文档），并且能够查看组件的字段信息。通过灵活配置组件属性，用户可以实现组件的多样化展示和功能定制。

### 2.操作方法
+ 点击某一组件，在属性面板「属性」页面中配置属性信息。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-Design/shuxingmianban/1.png)

+ 点击某一组件，在属性面板「字段」页面中显示字段信息。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-Design/shuxingmianban/2.png)

+ 点击某一组件，在属性面板「样式」页面中自定义组件样式。
  - 提供 class 属性，可通过代码形式对单个组件的样式进行自定义  
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-Design/shuxingmianban/1765366386700-7341cc9c-0136-4c9e-aca9-a6a326ca0740.png)
# 五、页面设计示例
场景：员工请假业务页面

+ 利用模型设计器构建两个业务模型：员工信息模型与请假申请模型。
    - 员工信息模型：用于存储企业员工的基本信息
    - 请假申请模型：用于存储员工提交的请假申请信息

<!-- | 模型 | 字段名称 | 字段类型 |
| :---: | :---: | :---: |
|员工信息模型| 员工编号 | 文本 |
| | 姓名 | 文本 |
| | 部门 | 多对多（关联部门模型） |
| | 职位 | 文本 |
| | 入职日期 | 日期时间 |
| | 联系电话 | 文本 |
| | 邮箱 | 文本 |
| 请假申请模型 | 申请编号 | 文本 |
| | 申请时间 | 日期时间 |
| | 请假类型 | 枚举 |
| | 请假原因 | 文本 |
| | 请假开始时间 | 日期时间 |
| | 请假结束时间 | 日期时间 |
| | 员工编码 | 文本 |
| | 附件 | 文件 | -->
<table style='width:100%'>
    <tr>
        <th style='width:30%' align="left">模型</th>
        <th style='width:30%' align="left">字段名称</th>
        <th style='width:30%' align="left">字段类型</th>
    </tr>
    <tr>
        <td rowspan="7">员工信息模型</td>
        <td>员工编号</td>
        <td>文本</td>
    </tr>
    <tr>
        <td>姓名</td>
        <td>文本</td>
    </tr>
    <tr>
        <td>部门</td>
        <td>多对多（关联部门模型）</td>
    </tr>
    <tr>
        <td>职位</td>
        <td>文本</td>
    </tr>
    <tr>
        <td>入职日期</td>
        <td>日期时间</td>
    </tr>
    <tr>
        <td>联系电话</td>
        <td>文本</td>
    </tr>
    <tr>
        <td>邮箱</td>
        <td>文本</td>
    </tr>
    <tr>
        <td rowspan="8">请假申请模型</td>
        <td>申请编号</td>
        <td>文本</td>
    </tr>
    <tr>
        <td>申请时间</td>
        <td>日期时间</td>
    </tr>
    <tr>
        <td>请假类型</td>
        <td>枚举</td>
    </tr>
    <tr>
        <td>请假原因</td>
        <td>文本</td>
    </tr>
    <tr>
        <td>请假开始时间</td>
        <td>日期时间</td>
    </tr>
    <tr>
        <td>请假结束时间</td>
        <td>日期时间</td>
    </tr>
    <tr>
        <td>员工编码</td>
        <td>文本</td>
    </tr>
    <tr>
        <td>附件</td>
        <td>文本</td>
    </tr>
</table>


+ 模型构建完毕后，在界面设计器中设计请假审批页面，该页面主要包含两部分：员工信息与请假信息
1. 创建页面，选择模型为“请假申请模型”，视图类型为“表单”
2. 进入设计界面后，在画布中添加两个分组组件，分别命名为“员工信息”与“请假信息”
3. 在“员工信息”分组中，计划使用员工信息模型的相关字段，然而，当前页面绑定的模型中并未涵盖这些字段。为实现这一目标，可按照以下步骤操作：

(1) 在“组件库 - 模型”分类下，添加一个虚拟字段，并将其命名为“员工”，同时将其与“员工信息模型”建立关联关系。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-Design/shili/1.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-Design/shili/2.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-Design/shili/3.png)

(2) 对添加的“员工”虚拟字段进行下钻操作，从而获取关联模型中包含的所有字段。随后，将所需的字段组件从字段列表中拖拽至页面中的“员工信息”分组内。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-Design/shili/4.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-Design/shili/5.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-Design/shili/6.png)

4. 在“请假信息”分组中，将所需字段拖拽至页面中，完成请假信息区域的设计。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/view-Design/shili/7.png)

5. 完成上述所有设计步骤后，点击发布按钮，可将设计好的页面正式发布。发布成功后，该页面即可投入使用



# 六、附件：名词解释
| 名词 | 描述 |
| :---: | --- |
| 操作栏 | 包含常用的操作按钮，可进行页面设置、历史记录、保存等操作。 |
| 工具栏 | 包含组件库、页面大纲与页面设置。 |
| 画布设计区 | 用户进行页面设计的主要区域，在此区域中拖拽组件、调整布局等。 |
| 属性面板 | 显示和编辑选中组件的属性。可调整组件的标题、校验、交互等属性。 |
| 母版 | 一种具有固定格式和布局的模板，用于统一和规范一类页面或文档的设计和内容呈现。 |
| 组件库 | 一个集合了各种可复用组件的资源库。 |
| 组件 | 页面设计的基本单元，如按钮、文本框、图片等。 |
| 模型 | 在模型设计器中设计完成的模型。 |
| 设计大纲 | 页面设计的整体框架和结构。 |
| 虚拟字段 | 不真实存在的字段，即数据传输的载体。 |

