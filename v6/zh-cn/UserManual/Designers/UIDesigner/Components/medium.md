---
title: 媒体
index: true
category:
  - 用户手册
  - 设计器
order: 3
---
# 一、通用属性
+ 创建属性：即为所需组件配置绑定字段。您可以：
  - 新建字段： 设定字段的业务类型、显示名称、编码长度等参数。
  :::info 注意
  此操作会在当前页面所在模型下新增一个对应字段，其效果等同于在模型设计器中创建字段。
  :::
  - 选择已有字段： 若模型下已存在对应字段，可以直接进行选择，此操作不会重复新建字段。

+ 标题：组件在当前页面的展示名称。
+ 隐藏标题：开启此选项后，组件的标题将被隐藏
+ 宽度：即组件占所在行的大小。
+ 显示设备：包括PC端、移动端与PAD端。

:::tip 举例

在设计PC端页面时，若组件的显示设备设置为仅移动端而未包含PC端，则在实际页面展示中，该分组组件及其所包含的其他组件均不会显示在PC端页面中。

:::

# 二、特有属性
## （一）多媒体播放器
支持在页面中嵌入多媒体播放器，适用于查看图片、视频等场景。

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/medium/dmt1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/medium/dmt2.gif)

:::

多媒体播放器特有属性：

+ 组件类型：包含动态与静态两种类型。动态组件在表单中为输入态，静态组件在表单中为只读态。

:::info 注意

+ 组件类型为动态时，有两种输入方式，分别为文件上传与链接输入
    - 文件上传：支持用户手动上传文件，可设置最大上传文件体积与限制上传文件类型。
    - 链接输入：支持用户手动输入链接，可设置可选前缀。
+ 组件类型为静态时，输入多媒体链接，即可在实际页面中展示。

:::

+ 默认值：在实际页面展示时，该字段将默认展示设定的值。若删除或更改链接，原默认值不会回填。
+ 计算公式：所计算值涉及变量，当变量变更时，计算值同步变化。

:::info 注意

若同时设置了默认值和计算公式，在实际页面中，默认值会先填入，后续值会根据计算函数变更。

:::

:::warning 提示

有关计算公式中自定义表达式的填写，可以查看「自定义表达式」文档。

:::

+ 占位提示：在输入框未填写内容时，显示的浅色提示文字，用于引导用户输入，但不会影响输入的实际值
+ 描述说明：提供组件的描述信息，常用于阐述组件的作用、注意事项等。在组件下方展示。
+ 是否只读：设为只读，在实际页面中，组件可见，但不可编辑。若设置为条件只读，则在符合条件时只读。
+ 是否禁用：设为禁用，在实际页面中，组件可见，但不可编辑。若设置为条件禁用，则在符合条件时禁用。
+ 是否隐藏：设为隐藏，在实际页面中，组件不可见，也不可编辑。若设置为条件隐藏，则在符合条件时隐藏。在设计页面时，设为隐藏的组件仍会展示。
+ 是否必填：可以控制组件在当前页面是否必填，若设置为必填则会在标题前以*作为标识。若设置为条件必填，则在符合条件时必填。
+ 数据校验：支持自定义校验规则，用于检验输入的数据是否符合设定的要求。

:::warning 提示

有关数据校验中自定义表达式的填写，可以查看「自定义表达式」文档。

:::

+ 校验未通过提示：当输入的数据未通过校验时，显示相应的提示信息。
+ 提交数据：开启此选项后，若当前内容变更，则会根据提交函数，对提交方式所涵盖的数据范围进行变更。
+ 清除数据：开启此选项后，若当前内容变更，会清除所选字段范围。
+ 标题排列方式：即标题与其内容的排列，分为横向与纵向两种。
+ 最大上传文件体积：限制单个上传文件的大小。
+ 限制上传文件类型：限制文件的上传格式，支持图片与视频。

## （二）地图
支持在页面中嵌入地图，适用于展示地理位置、地点定位等场景。

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/medium/dt1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/medium/dt2.png)

:::

## （三）图表
支持在页面中展示设计好的图表。

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/medium/tb1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/medium/tb2.png)

:::

图标特有属性：

+ 选择图表：可选择在数据可视化中已发布的图表。
+ 查询条件：在实际页面展示中，会按照配置的查询条件展示数据。

## （四）报表
支持在页面中展示设计好的报表。

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/medium/bb1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/medium/bb2.png)

:::

报表特有属性：

+ 选择报表：可选择在数据可视化中已发布的报表。

## （五）数据大屏
支持在页面中展示设计好的数据大屏。

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/medium/sjdp1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/medium/sjdp2.png)

:::

数据大屏特有属性：

+ 选择数据大屏：可选择在数据可视化中已发布的数据大屏。
