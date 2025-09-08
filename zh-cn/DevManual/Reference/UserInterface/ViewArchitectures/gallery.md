---
title: 画廊（Gallery）
index: true
category:
  - 研发手册
  - Reference
  - User interface
  - View architectures
order: 4
---
# 一、视图特征

+ 视图类型：画廊（GALLERY）
+ 数据类型：列表（List）
+ DSL 特征：具备布局功能。
+ 数据结构通用行为：
  - 查询行为：分页、排序、搜索。
  - 交互行为：单选、多选。
+ 常用接口：（默认数据管理器函数）
  - queryPage：支持分页、排序、搜索等查询功能。
  - create：行内编辑创建。（pk is null）
  - update：行内编辑更新。（pk is not null）
  - delete：删除动作。

# 二、DSL 结构

一个精简版视图可以是这样的：（“精简” 表示每个标签的属性数量少，而不是节点数量少。）

```xml
<view type="GALLERY" model="demo.DemoModel" name="demo_gallery_view">
	<template slot="searchFields">
		<field data="code" />
		<field data="name" />
	</template>
	<template slot="actions">
		<action name="redirectCreatePage" label="创建" />
		<action name="delete" label="删除" />
	</template>
	<template slot="gallery">
    <field data="id" invisible="true" />
		<template slot="card">
			<template slot="title">
				<field data="name" labelInvisible="true" justifyContent="center" />
			</template>
			<template slot="content">
				<field data="code" />
			</template>
			<template slot="rowActions">
				<action name="redirectUpdatePage" label="编辑" />
				<action name="redirectDetailPage" label="详情" />
			</template>
		</template>
	</template>
</view>
```

画廊视图从整体上看类似于表格视图，而 `title` 和 `content` 插槽中的内容具备布局功能。

画廊视图是根据视图特征设计的 DSL 结构，其具备列表（List）数据结构的特征，在局部的卡片中又具备了布局功能。

在组件的分工上， Gallery 组件用于循环渲染 Card 组件，使得每个 Card 组件都具备独立的数据集和渲染单条数据的能力。而每个 Card 组件又分为三个部分：标题区、内容区和动作区，用于展示业务数据和动作行为。

# 三、默认字段组件

在上面的 `DSL` 中，我们并没有指定 `widget` 属性，那么在这种情况下，Widget 框架将根据**字段元数据属性**获取对应的**默认组件**。下面列举了目前**画廊**视图中用到的所有默认组件：

<table style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #f5f5f5;">
      <th style="border: 1px solid #ccc; padding: 10px; font-weight: bold;">字段类型</th>
      <th style="border: 1px solid #ccc; padding: 10px; font-weight: bold; text-align: center;">是否多值</th>
      <th style="border: 1px solid #ccc; padding: 10px; font-weight: bold;">默认组件</th>
      <th style="border: 1px solid #ccc; padding: 10px; font-weight: bold;">TypeScript Class</th>
    </tr>
  </thead>
  <tbody>
    <!-- 文本（STRING）- 合并2行 -->
    <tr>
      <td rowspan="2" style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">文本（STRING）</td>
      <td style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">否</td>
      <td style="border: 1px solid #ccc; padding: 10px;">文本（Input）</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryStringFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">是</td>
      <td style="border: 1px solid #ccc; padding: 10px;">标签（Tag）</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryStringTagFieldWidget</td>
    </tr>
    <!-- 单行字段类型 -->
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">多行文本（TEXT）</td>
      <td style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">否</td>
      <td style="border: 1px solid #ccc; padding: 10px;">多行文本（TextArea）</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryCommonFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">富文本（HTML）</td>
      <td style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">否</td>
      <td style="border: 1px solid #ccc; padding: 10px;">富文本（RichText）</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryHtmlFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">手机（PHONE）</td>
      <td style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">否</td>
      <td style="border: 1px solid #ccc; padding: 10px;">手机（Phone）</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryStringFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">邮箱（EMAIL）</td>
      <td style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">否</td>
      <td style="border: 1px solid #ccc; padding: 10px;">邮箱（Email）</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryStringFieldWidget</td>
    </tr>
    <!-- 整数（INTEGER）- 合并2行 -->
    <tr>
      <td rowspan="2" style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">整数（INTEGER）</td>
      <td style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">否</td>
      <td style="border: 1px solid #ccc; padding: 10px;">整数（Integer）</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryNumberWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">是</td>
      <td style="border: 1px solid #ccc; padding: 10px;">标签（Tag）</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryStringTagFieldWidget</td>
    </tr>
    <!-- 单行字段类型 -->
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">浮点数（FLOAT）</td>
      <td style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">否</td>
      <td style="border: 1px solid #ccc; padding: 10px;">数字（Float）</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryNumberWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">金额（MONEY）</td>
      <td style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">否</td>
      <td style="border: 1px solid #ccc; padding: 10px;">货币（Currency）</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryNumberWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">布尔（BOOLEAN）</td>
      <td style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">否</td>
      <td style="border: 1px solid #ccc; padding: 10px;">文本（是/否）</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryBooleanFieldWidget</td>
    </tr>
    <!-- 枚举（ENUM）- 合并2行 -->
    <tr>
      <td rowspan="2" style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">枚举（ENUM）</td>
      <td style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">否</td>
      <td style="border: 1px solid #ccc; padding: 10px;">标签（Tag）</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryEnumFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">是</td>
      <td style="border: 1px solid #ccc; padding: 10px;">标签（Tag）</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryEnumMultiFieldWidget</td>
    </tr>
    <!-- 单行字段类型（日期时间相关） -->
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">日期时间（DATETIME）</td>
      <td style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">否</td>
      <td style="border: 1px solid #ccc; padding: 10px;">日期时间（DateTimePicker）</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryDateTimeFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">日期（DATE）</td>
      <td style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">否</td>
      <td style="border: 1px solid #ccc; padding: 10px;">日期（DatePicker）</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryDateFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">时间（TIME）</td>
      <td style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">否</td>
      <td style="border: 1px solid #ccc; padding: 10px;">时间（TimePicker）</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryTimeFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">年份（YEAR）</td>
      <td style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">否</td>
      <td style="border: 1px solid #ccc; padding: 10px;">年份（YearPicker）</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryYearFieldWidget</td>
    </tr>
    <!-- 单行字段类型（关联关系相关） -->
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">键值对（MAP）</td>
      <td style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">否</td>
      <td style="border: 1px solid #ccc; padding: 10px;">键值对（Map）</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryMapFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">多对一（M2O）</td>
      <td style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">否</td>
      <td style="border: 1px solid #ccc; padding: 10px;">下拉单选（Select）</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryM2OSelectFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">一对多（O2M）</td>
      <td style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">是</td>
      <td style="border: 1px solid #ccc; padding: 10px;">下拉多选（Select）</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryO2MSelectFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">多对多（M2M）</td>
      <td style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">是</td>
      <td style="border: 1px solid #ccc; padding: 10px;">下拉多选（Select）</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryM2MSelectFieldWidget</td>
    </tr>
  </tbody>
</table>

# 四、可选字段组件

针对每一种字段类型，除了上述对应的默认组件外，还有一些组件是通过指定 `widget` 属性进行使用的。下面列举了目前**画廊**视图中现有的字段组件：

<table style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #f5f5f5;">
      <th style="border: 1px solid #ccc; padding: 10px; font-weight: bold;">字段类型</th>
      <th style="border: 1px solid #ccc; padding: 10px; font-weight: bold; text-align: center;">是否多值</th>
      <th style="border: 1px solid #ccc; padding: 10px; font-weight: bold;">默认组件</th>
      <th style="border: 1px solid #ccc; padding: 10px; font-weight: bold;">TypeScript Class</th>
    </tr>
  </thead>
  <tbody>
    <!-- 文本（STRING）- 否（7行） -->
    <tr>
      <td rowspan="9" style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">文本（STRING）</td>
      <td rowspan="7" style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">否</td>
      <td style="border: 1px solid #ccc; padding: 10px;">颜色（ColorPicker）</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryStringColorPickerFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px;">文件（Upload）</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryStringUploadFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px;">图片（UploadImg）</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryStringUploadImgFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px;">嵌入网页（Iframe）</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryStringIframeFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px;">超链接（Hyperlinks）</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryStringHyperlinksFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px;">文件下载（Download）</td>
      <td style="border: 1px solid #ccc; padding: 10px;">?</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px;">多媒体播放器（MediaPlayer）</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryStringMediaPlayerWidget</td>
    </tr>
    <!-- 文本（STRING）- 是（2行） -->
    <tr>
      <td rowspan="2" style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">是</td>
      <td style="border: 1px solid #ccc; padding: 10px;">文件（Upload）</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryStringUploadFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px;">图片（UploadImg）</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryStringUploadImgFieldWidget</td>
    </tr>
    <!-- 多行文本（TEXT）- 否（5行） -->
    <tr>
      <td rowspan="5" style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">多行文本（TEXT）</td>
      <td rowspan="5" style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">否</td>
      <td style="border: 1px solid #ccc; padding: 10px;">手写签名（Signature）</td>
      <td style="border: 1px solid #ccc; padding: 10px;">?</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px;">拖拽上传（UploadDraggable）</td>
      <td style="border: 1px solid #ccc; padding: 10px;">?</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px;">文件（Upload）</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryStringUploadFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px;">图片（UploadImg）</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryStringUploadImgFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px;">文件下载（Download）</td>
      <td style="border: 1px solid #ccc; padding: 10px;">?</td>
    </tr>
    <!-- 布尔（BOOLEAN）- 否（3行） -->
    <tr>
      <td rowspan="3" style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">布尔（BOOLEAN）</td>
      <td rowspan="3" style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">否</td>
      <td style="border: 1px solid #ccc; padding: 10px;">下拉单选（Select）</td>
      <td style="border: 1px solid #ccc; padding: 10px;"><span style="color:#080808;background-color:#ffffff;">?</span></td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px;">单选框（Radio）</td>
      <td style="border: 1px solid #ccc; padding: 10px;"><span style="color:#080808;background-color:#ffffff;">?</span></td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px;">复选框（Checkbox）</td>
      <td style="border: 1px solid #ccc; padding: 10px;">?</td>
    </tr>
    <!-- 多对一（M2O）- 否（4行） -->
    <tr>
      <td rowspan="4" style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">多对一（M2O）</td>
      <td rowspan="4" style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">否</td>
      <td style="border: 1px solid #ccc; padding: 10px;">单选框（Radio）</td>
      <td style="border: 1px solid #ccc; padding: 10px;">?</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px;">拖拽上传（UploadDraggable）</td>
      <td style="border: 1px solid #ccc; padding: 10px;"><span style="color:#080808;background-color:#ffffff;">FormM2OUploadDraggableFieldWidget</span></td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px;">文件（Upload）</td>
      <td style="border: 1px solid #ccc; padding: 10px;"><span style="color:#080808;background-color:#ffffff;">FormM2OUploadFieldWidget</span></td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px;">图片（UploadImg）</td>
      <td style="border: 1px solid #ccc; padding: 10px;">?</td>
    </tr>
    <!-- 一对多（O2M）- 是（4行） -->
    <tr>
      <td rowspan="4" style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">一对多（O2M）</td>
      <td rowspan="4" style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">是</td>
      <td style="border: 1px solid #ccc; padding: 10px;">复选框（Checkbox）</td>
      <td style="border: 1px solid #ccc; padding: 10px;">?</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px;">拖拽上传（UploadDraggable）</td>
      <td style="border: 1px solid #ccc; padding: 10px;"><span style="color:#080808;background-color:#ffffff;">FormO2MUploadDraggableFieldWidget</span></td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px;">文件（Upload）</td>
      <td style="border: 1px solid #ccc; padding: 10px;"><span style="color:#080808;background-color:#ffffff;">FormO2MUploadFieldWidget</span></td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px;">图片（UploadImg）</td>
      <td style="border: 1px solid #ccc; padding: 10px;">?</td>
    </tr>
    <!-- 多对多（M2M）- 是（3行） -->
    <tr>
      <td rowspan="3" style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">多对多（M2M）</td>
      <td rowspan="3" style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">是</td>
      <td style="border: 1px solid #ccc; padding: 10px;">拖拽上传（UploadDraggable）</td>
      <td style="border: 1px solid #ccc; padding: 10px;"><span style="color:#080808;background-color:#ffffff;">FormM2MUploadDraggableFieldWidget</span></td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px;">文件（Upload）</td>
      <td style="border: 1px solid #ccc; padding: 10px;"><span style="color:#080808;background-color:#ffffff;">FormM2MUploadFieldWidget</span></td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px;">图片（UploadImg）</td>
      <td style="border: 1px solid #ccc; padding: 10px;">?</td>
    </tr>
  </tbody>
</table>

# 五、DSL 属性配置

## （一）画廊属性配置

```xml
<element widget="Gallery">
    ......
</element>
```

+ cols：每行卡片数量（`number`）
+ gutter：卡片间隔（`gutter`）

## （二）卡片属性配置

```xml
<element widget="Card">
    ......
</element>
```

+ width：宽度（`number | string`）
+ minWidth：最小宽度（`number | string`）
+ maxWidth：最大宽度（`number | string`）
+ height：高度（`number | string`）
+ minHeight：最小高度（`number | string`）
+ maxHeight：最大高度（`number | string`）
+ allowClick：卡片允许点击，需配合 `click` 插槽配置 `action` 动作使用（`boolean`）
+ inlineActiveCount：底部动作区显示数量（`number`）

## （三）通用字段配置

+ justifyContent<font style="color:#DF2A3F;">*</font>：水平对齐方式（`FlexRowJustify`）
+ emptyStyle<font style="color:#DF2A3F;">*</font>：空值样式（`string | 'hyphen' | 'empty' | 'null'`）

:::warning 提示

带 “<font style="color:#DF2A3F;">*</font>” 标记的属性并不是完全通用的属性，而是需要依赖具体组件实现，若组件本身的交互不支持或未实现的可能会出现配置无效的情况。

:::

## （四）字段组件属性配置

### 1、文本（STRING）

#### GalleryStringFieldWidget

```xml
<field data="stringField" />
```

+ type：输入类型（`'text' | 'password' | expression`）
+ prefix：前缀文本（`string | icon`）
+ prefixType：前缀类型（`'TEXT' | 'ICON'`）
+ prefixStore：前缀是否存储（`boolean`）
+ suffix：后缀文本（`string | icon`）
+ suffixType：后缀类型（`'TEXT' | 'ICON'`）
+ suffixStore：后缀是否存储（`boolean`）
+ crypto：加密存储（`boolean`）

#### GalleryStringColorPickerFieldWidget

```xml
<field data="stringField" widget="ColorPicker" />
```

#### GalleryStringUploadFieldWidget

```xml
<field data="stringField" widget="Upload" />
```

+ cdnKey：指定上传 cdnKey，配合后端 OSS 配置使用（`string`）
+ privateLink：使用后端上传/下载文件，当 OSS 无法通过客户端直传时使用（`boolean`）

#### GalleryStringUploadImgFieldWidget

```xml
<field data="stringField" widget="UploadImg" />
```

#### GalleryStringIframeFieldWidget

```xml
<field data="stringField" widget="Iframe" />
```

+ crypto：加密存储（`boolean`）

#### GalleryStringHyperlinksFieldWidget

```xml
<field data="stringField" widget="Hyperlinks" />
```

+ target：链接打开方式（`'OPEN_WINDOW' | 'ROUTER'`）
+ text：链接显示文本（`string`）

#### GalleryStringMediaPlayerWidget

```xml
<field data="stringField" widget="MediaPlayer" />
```

#### GalleryStringTagFieldWidget

```xml
<field data="stringMultiField" />
```

### 2、多行文本（TEXT）

#### GalleryCommonFieldWidget

```xml
<field data="textField" />
```

### 3、富文本（HTML）

#### GalleryHtmlFieldWidget

```xml
<field data="htmlField" />
```

+ showHeight：显示高度（`number | string`）

### 4、整数（INTEGER）

#### GalleryNumberWidget

```xml
<field data="integerField" />
```

+ prefix：前缀文本（`string | icon`）
+ prefixType：前缀类型（`'TEXT' | 'ICON'`）
+ prefixStore：前缀是否存储（`boolean`）
+ suffix：后缀文本（`string | icon`）
+ suffixType：后缀类型（`'TEXT' | 'ICON'`）
+ suffixStore：后缀是否存储（`boolean`）
+ unit：单位（`string | expression`）
+ showThousandth：是否显示千分位（`boolean | expression`）

### 5、布尔（BOOLEAN）

#### GalleryBooleanFieldWidget

```xml
<field data="booleanField" />
```

### 6、枚举（ENUM）

#### GalleryEnumFieldWidget

```xml
<field data="enumField" />
```

#### GalleryEnumMultiFieldWidget

```xml
<field data="enumMultiField" />
```

### 7、日期时间（DATETIME）

#### GalleryDateTimeFieldWidget

```xml
<field data="datetimeField" />
```

+ format：日期时间格式化文本（`string`）

### 8、日期（DATE）

#### GalleryDateFieldWidget

```xml
<field data="dateField" />
```

+ format：日期格式化文本（`string`）

### 9、时间（TIME）

#### GalleryTimeFieldWidget

```xml
<field data="timeField" />
```

+ format：时间格式化文本（`string`）

### 10、年份（YEAR）

#### GalleryYearFieldWidget

```xml
<field data="yearField" />
```

+ format：年份格式化文本（`string`）

### 11、键值对（MAP）

#### GalleryMapFieldWidget

```xml
<field data="mapField" />
```

### 12、多对一（M2O）

#### GalleryM2OSelectFieldWidget

```xml
<field data="m2oField" />
```

+ optionLabel：可选项标题（`expression`）

### 13、一对多（O2M）

#### GalleryO2MSelectFieldWidget

```xml
<field data="o2mField" />
```

+ optionLabel：可选项标题（`expression`）

### 14、多对多（M2M）

#### GalleryM2MSelectFieldWidget

```xml
<field data="m2mField" />
```

+ optionLabel：可选项标题（`expression`）

