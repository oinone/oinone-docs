---
title: 打印模板设计
index: true
category:
  - 用户手册
  - 设计器
order: 9
next:
  text: 流程设计器(Process Designer)
  link: /zh/UserManual/Designers/WorkflowDesigner/README.md
---
本界面主要分为四个功能区域，分别为：操作栏、数据源信息、画布设计区、属性面板

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Print%20Template%20Design/1.png)

# 一、操作栏-发布
### 1.功能介绍
模板设计完成后，通过发布操作可以使模板正式生效。若未进行发布操作，模板也会自动保存，但在此情况下，自动保存的版本仅作为草稿存在，并不会正式对外展示或生效。

### 2.操作方法
在顶部操作栏，点击「发布」，即可将当前模板发布

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Print%20Template%20Design/fb.png)

# 二、数据源信息
### 1.功能介绍
数据源包含数据源与系统字段两个部分

+ 数据源：即模板关联模型字段
+ 系统字段
    - 打印时间：打印发生时间，格式“YYYY-MM-DD”
    - 打印人：档期打印发起操作员
    - 业务流程信息：模板关联模型所触发流程中的人工节点信息

### 2.操作方法
拖拽数据至画布设计区对应区域

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Print%20Template%20Design/sjyxx.gif)

# 三、画布设计区
### 1.功能介绍
当数据被添加到设计画布区域时，会自动生成默认样式。用户可以选中任一数据，并在上方工具栏中对其进行详细的配置。

当拖入多对多字段时，系统会自动生成一个子表单。点击子表单区域即可对其进行编辑，子表单默认包含 5 个字段（取自左侧数据源多对多关系下的前 5 个字段）。

:::info 注意

+ 若需拓展子表单区域，扩展范围内原有单元格的值将被清空；若扩展区域与另一子表单区域重叠，此次扩展将失效。
+ 若需缩小子表单区域，缩小范围将清空不在现有范围内的单元格的值。

:::

### 2.操作方法
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Print%20Template%20Design/hb.png)

子表单区域设有两个功能按钮，分别为：

+ **选中子表单**：点击后，右侧属性面板将切换为子表单属性展示界面。
+ **删除**：点击后，整个子表单将被移除。

:::info 注意

+ 级联字段下的字段不允许拖入非子表单单元格；且不可将子表单内的内容复制到子表单区域外，否则会导致打印模板无法成功发布。
+ 非级联字段下的字段同样不允许拖入子表单内。

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/en/UserManual/Designers/UIDesigner/Component/Field/1751282269018-f4a7227e-2540-4506-9b96-dc4cd8343b59.png)

# 四、属性面板
### 1.功能介绍
在属性面板中，用户可以方便地设置各种属性，包括模板属性与字段属性。

+ 模型属性

| 属性 | 说明 |
| :---: | --- |
| 纸张大小 | 可设置打印模板纸张大小 |
| 页面方向 | 可调整页面方向 |
| 页边距 | 可分别调整纸张页边距的大小 |
| 页眉/页脚 | 开启后可分别设置页眉/页脚的左侧、中间或右侧的展示内容 |
| 水印 | 可选择水印类型，包括无水印、文字或图片三种类型:<br/> 文字：可自定义水印文字，文字将根据自定义的大小、颜色、倾角等属性在页面进行展示<br/> 图片：可上传图片，图片将根据自定义的宽、高、倾角等属性在页面进行展示 |


+ 属性设置

<table>
  <tr>
    <th>字段类型</th>
    <th>属性</th>
    <th>说明</th>
  </tr>
    <td rowspan=2 style="text-align: center;">文本</td>
    <td>显示格式</td>
    <td>设置文本内容为静态文本、二维码、条形码</td>
  <tr>
    <td>内容超长时</td>
    <td>当内容过于长时，可设置是否自动换行</td>
  </tr>
  <tr>
    <td rowspan=2 style="text-align: center;">整数</td>
    <td>内容超长时</td>
    <td>当内容过于长时，可设置是否自动换行</td>
  </tr>
  <tr>
    <td>显示千分位</td>
    <td>当数值过于大时，可以千分位格式进行展示</td>
  </tr>
  <tr>
    <td rowspan=3 style="text-align: center;">小数</td>
    <td>内容超长时</td>
    <td>当内容过于长时，可设置是否自动换行</td>
  </tr>
  <tr>
    <td>指定小数位数</td>
    <td>可指定小数展示时的显示位数</td>
  </tr>
  <tr>
    <td>小数显示类型</td>
    <td>可选择以百分比形式或千位分隔符两种形式来显示小数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
  </tr>
  <tr>
    <td rowspan=2 style="text-align: center;">日期</td>
    <td>内容超长时</td>
    <td>当内容过于长时，可设置是否自动换行</td>
  </tr>
  <tr>
    <td>日期格式</td>
    <td>可选择日期显示格式</td>
  </tr>
  <tr>
    <td rowspan=3 style="text-align: center;">日期时间</td>
    <td>内容超长时</td>
    <td>当内容过于长时，可设置是否自动换行</td>
  </tr>
  <tr>
    <td>日期格式</td>
    <td>可选择日期显示格式</td>
  </tr>
  <tr>
    <td>时间格式</td>
    <td>可选择时间显示格式</td>
  </tr>
  <tr>
    <td rowspan=2 style="text-align: center;">时间</td>
    <td>内容超长时</td>
    <td>当内容过于长时，可设置是否自动换行</td>
  </tr>
  <tr>
    <td>时间格式</td>
    <td>可选择时间显示格式</td>
  </tr>
  <tr>
    <td style="text-align: center;">其他类型</td>
    <td>内容超长时</td>
    <td>当内容过于长时，可设置是否自动换行</td>
  </tr>
</table>

:::info 注意

日期、日期时间以及时间的可选项为当前语言设置的日期时间格式

:::

### 2.操作方法
选中某一字段，可在属性面板中配置模板属性或数据属性

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Print%20Template%20Design/sxmb.png)


