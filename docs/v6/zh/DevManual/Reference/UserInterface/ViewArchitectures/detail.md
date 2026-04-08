---
title: 详情（Detail）
index: true
category:
  - 研发手册
  - Reference
  - User interface
  - View architectures
order: 3
---
# 一、视图特征

+ 视图类型：详情（DETAIL）
+ 数据类型：对象（Object）
+ DSL 特征：具备布局功能。
+ 数据结构通用行为：
  - 查询行为：数据回填。
+ 详情行为：
  - 交互行为：所有字段以**只读**形式展示，无其他交互。
  - 子表格查询行为：通过后端分页查询。
+ 常用接口：（默认数据管理器函数）
  - queryOne：数据回填。（pk is not null）
  - queryPage：子表格查询行为。

# 二、DSL 结构

一个精简版视图可以是这样的：（“精简” 表示每个标签的属性数量少，而不是节点数量少。）

```xml
<view type="DETAIL" model="demo.DemoModel" name="demo_detail_view">
    <template slot="actions">
        <action name="$$internal_GotoListTableRouter" label="返回" type="default"/>
        <action name="create" validateForm="true" goBack="true"/>
        <action name="update" validateForm="true" goBack="true"/>
    </template>
    <template slot="fields">
        <field data="id" invisible="true"/>
        <field data="code"/>
        <field data="name"/>
    </template>
</view>
```

详情视图与表单视图同属于**对象（Object）**类型的视图，其 DSL 结构与表单视图完全一样。在这个视图中唯一的区别就是**视图类型**和**名称**发生了变化。

:::warning 提示

读者可以通过了解表单视图架构来理解详情视图，请参考：[表单（Form）](/zh/DevManual/Reference/UserInterface/ViewArchitectures/form.md)

:::

# 三、默认字段组件

在上面的 `DSL` 中，我们并没有指定 `widget` 属性，那么在这种情况下，Widget 框架将根据**字段元数据属性**获取对应的**默认组件**。下面列举了目前**详情**视图中用到的所有默认组件：

<table style="border-collapse: collapse; width: 100%; border: 1px solid #ccc;">
  <thead>
    <tr style="background-color: #f5f5f5;">
      <th style="border: 1px solid #ccc; padding: 8px;">字段类型</th>
      <th style="border: 1px solid #ccc; padding: 8px;">是否多值</th>
      <th style="border: 1px solid #ccc; padding: 8px;">默认组件</th>
      <th style="border: 1px solid #ccc; padding: 8px;">TypeScript Class</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2" style="border: 1px solid #ccc; padding: 8px;">文本（STRING）</td>
      <td style="border: 1px solid #ccc; padding: 8px;">否</td>
      <td style="border: 1px solid #ccc; padding: 8px;">文本（Input）</td>
      <td style="border: 1px solid #ccc; padding: 8px;">DetailStringFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px;">是</td>
      <td style="border: 1px solid #ccc; padding: 8px;">标签（Tag）</td>
      <td style="border: 1px solid #ccc; padding: 8px;">DetailStringTagFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px;">多行文本（TEXT）</td>
      <td style="border: 1px solid #ccc; padding: 8px;">否</td>
      <td style="border: 1px solid #ccc; padding: 8px;">多行文本（TextArea）</td>
      <td style="border: 1px solid #ccc; padding: 8px;">DetailCommonFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px;">富文本（HTML）</td>
      <td style="border: 1px solid #ccc; padding: 8px;">否</td>
      <td style="border: 1px solid #ccc; padding: 8px;">富文本（RichText）</td>
      <td style="border: 1px solid #ccc; padding: 8px;">DetailHtmlFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px;">手机（PHONE）</td>
      <td style="border: 1px solid #ccc; padding: 8px;">否</td>
      <td style="border: 1px solid #ccc; padding: 8px;">手机（Phone）</td>
      <td style="border: 1px solid #ccc; padding: 8px;">DetailStringFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px;">邮箱（EMAIL）</td>
      <td style="border: 1px solid #ccc; padding: 8px;">否</td>
      <td style="border: 1px solid #ccc; padding: 8px;">邮箱（Email）</td>
      <td style="border: 1px solid #ccc; padding: 8px;">DetailStringFieldWidget</td>
    </tr>
    <tr>
      <td rowspan="2" style="border: 1px solid #ccc; padding: 8px;">整数（INTEGER）</td>
      <td style="border: 1px solid #ccc; padding: 8px;">否</td>
      <td style="border: 1px solid #ccc; padding: 8px;">整数（Integer）</td>
      <td style="border: 1px solid #ccc; padding: 8px;">DetailNumberWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px;">是</td>
      <td style="border: 1px solid #ccc; padding: 8px;">标签（Tag）</td>
      <td style="border: 1px solid #ccc; padding: 8px;">DetailStringTagFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px;">浮点数（FLOAT）</td>
      <td style="border: 1px solid #ccc; padding: 8px;">否</td>
      <td style="border: 1px solid #ccc; padding: 8px;">数字（Float）</td>
      <td style="border: 1px solid #ccc; padding: 8px;">DetailNumberWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px;">金额（MONEY）</td>
      <td style="border: 1px solid #ccc; padding: 8px;">否</td>
      <td style="border: 1px solid #ccc; padding: 8px;">货币（Currency）</td>
      <td style="border: 1px solid #ccc; padding: 8px;">DetailNumberWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px;">布尔（BOOLEAN）</td>
      <td style="border: 1px solid #ccc; padding: 8px;">否</td>
      <td style="border: 1px solid #ccc; padding: 8px;">开关（Switch）</td>
      <td style="border: 1px solid #ccc; padding: 8px;">DetailBooleanFieldWidget</td>
    </tr>
    <tr>
      <td rowspan="2" style="border: 1px solid #ccc; padding: 8px;">枚举（ENUM）</td>
      <td style="border: 1px solid #ccc; padding: 8px;">否</td>
      <td style="border: 1px solid #ccc; padding: 8px;">下拉单选（Select）</td>
      <td style="border: 1px solid #ccc; padding: 8px;">DetailEnumFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px;">是</td>
      <td style="border: 1px solid #ccc; padding: 8px;">下拉多选（Select）</td>
      <td style="border: 1px solid #ccc; padding: 8px;">DetailEnumMultiFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px;">日期时间（DATETIME）</td>
      <td style="border: 1px solid #ccc; padding: 8px;">否</td>
      <td style="border: 1px solid #ccc; padding: 8px;">日期时间（DateTimePicker）</td>
      <td style="border: 1px solid #ccc; padding: 8px;">DetailDateTimeFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px;">日期（DATE）</td>
      <td style="border: 1px solid #ccc; padding: 8px;">否</td>
      <td style="border: 1px solid #ccc; padding: 8px;">日期（DatePicker）</td>
      <td style="border: 1px solid #ccc; padding: 8px;">DetailDateFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px;">时间（TIME）</td>
      <td style="border: 1px solid #ccc; padding: 8px;">否</td>
      <td style="border: 1px solid #ccc; padding: 8px;">时间（TimePicker）</td>
      <td style="border: 1px solid #ccc; padding: 8px;">DetailTimeFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px;">年份（YEAR）</td>
      <td style="border: 1px solid #ccc; padding: 8px;">否</td>
      <td style="border: 1px solid #ccc; padding: 8px;">年份（YearPicker）</td>
      <td style="border: 1px solid #ccc; padding: 8px;">DetailYearFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px;">键值对（MAP）</td>
      <td style="border: 1px solid #ccc; padding: 8px;">否</td>
      <td style="border: 1px solid #ccc; padding: 8px;">键值对（Map）</td>
      <td style="border: 1px solid #ccc; padding: 8px;">DetailMapFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px;">多对一（M2O）</td>
      <td style="border: 1px solid #ccc; padding: 8px;">否</td>
      <td style="border: 1px solid #ccc; padding: 8px;">下拉单选（Select）</td>
      <td style="border: 1px solid #ccc; padding: 8px;">DetailM2OSelectFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px;">一对多（O2M）</td>
      <td style="border: 1px solid #ccc; padding: 8px;">是</td>
      <td style="border: 1px solid #ccc; padding: 8px;">下拉多选（Select）</td>
      <td style="border: 1px solid #ccc; padding: 8px;">DetailO2MSelectFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px;">多对多（M2M）</td>
      <td style="border: 1px solid #ccc; padding: 8px;">是</td>
      <td style="border: 1px solid #ccc; padding: 8px;">下拉多选（Select）</td>
      <td style="border: 1px solid #ccc; padding: 8px;">DetailM2MSelectFieldWidget</td>
    </tr>
  </tbody>
</table>
    

# 四、可选字段组件

针对每一种字段类型，除了上述对应的默认组件外，还有一些组件是通过指定 `widget` 属性进行使用的。下面列举了目前**详情**视图中现有的字段组件：

<table style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #f5f5f5;">
      <th style="border: 1px solid #ccc; padding: 10px; font-weight: bold;">字段类型</th>
      <th style="border: 1px solid #ccc; padding: 10px; font-weight: bold; text-align: center;">是否多值</th>
      <th style="border: 1px solid #ccc; padding: 10px; font-weight: bold;">组件</th>
      <th style="border: 1px solid #ccc; padding: 10px; font-weight: bold;">TypeScript Class</th>
    </tr>
  </thead>
  <tbody>
    <!-- 文本（STRING）- 否（7行） -->
    <tr>
      <td rowspan="10">文本（STRING）</td>
      <td rowspan="8">否</td>
      <td >颜色（ColorPicker）</td>
      <td >DetailStringColorPickerFieldWidget</td>
    </tr>
    <tr>
      <td >手写签名（Signature）</td>
      <td >DetailStringSignatureFieldWidget</td>
    </tr>
    <tr>
      <td >文件（Upload）</td>
      <td >DetailStringUploadFieldWidget</td>
    </tr>
    <tr>
      <td >图片（UploadImg）</td>
      <td >DetailStringUploadImgFieldWidget</td>
    </tr>
    <tr>
      <td >嵌入网页（Iframe）</td>
      <td >DetailStringIframeFieldWidget</td>
    </tr>
    <tr>
      <td >超链接（Hyperlinks）</td>
      <td >DetailStringHyperlinksFieldWidget</td>
    </tr>
    <tr>
      <td >文件下载（Download）</td>
      <td >DetailStringDownloadFieldWidget</td>
    </tr>
    <!-- 文本（STRING）- 否（第8行） -->
    <tr>
      <td >多媒体播放器（MediaPlayer）</td>
      <td >DetailStringMediaPlayerFieldWidget</td>
    </tr>
    <!-- 文本（STRING）- 是（2行） -->
    <tr>
      <td rowspan="2">是</td>
      <td >文件（Upload）</td>
      <td >DetailStringUploadFieldWidget</td>
    </tr>
    <tr>
      <td >图片（UploadImg）</td>
      <td >DetailStringUploadImgFieldWidget</td>
    </tr>
    <!-- 多行文本（TEXT）- 否（4行） -->
    <tr>
      <td rowspan="4">多行文本（TEXT）</td>
      <td rowspan="4">否</td>
      <td >手写签名（Signature）</td>
      <td >DetailStringSignatureFieldWidget</td>
    </tr>
    <tr>
      <td >文件（Upload）</td>
      <td >DetailStringUploadFieldWidget</td>
    </tr>
    <tr>
      <td >图片（UploadImg）</td>
      <td >DetailStringUploadImgFieldWidget</td>
    </tr>
    <tr>
      <td >文件下载（Download）</td>
      <td >DetailStringDownloadFieldWidget</td>
    </tr>
    <!-- 布尔（BOOLEAN）- 否（3行） -->
    <tr>
      <td rowspan="3">布尔（BOOLEAN）</td>
      <td rowspan="3">否</td>
      <td >下拉单选（Select）</td>
      <td >?</td>
    </tr>
    <tr>
      <td >单选框（Radio）</td>
      <td >?</td>
    </tr>
    <tr>
      <td >复选框（Checkbox）</td>
      <td >?</td>
    </tr>
    <!-- 多对一（M2O）- 否（5行） -->
    <tr>
      <td rowspan="5">多对一（M2O）</td>
      <td rowspan="5">否</td>
      <td >单选框（Radio）</td>
      <td >?</td>
    </tr>
    <tr>
      <td >表单（Form）</td>
      <td >FormM2OFormFieldWidget</td>
    </tr>
    <tr>
      <td >拖拽上传（UploadDraggable）</td>
      <td >FormM2OUploadDraggableFieldWidget</td>
    </tr>
    <tr>
      <td >文件（Upload）</td>
      <td >DetailM2OUploadWidget</td>
    </tr>
    <tr>
      <td >图片（UploadImg）</td>
      <td >FormM2OUploadImgFieldWidget</td>
    </tr>
    <!-- 一对多（O2M）- 是（5行） -->
    <tr>
      <td rowspan="5">一对多（O2M）</td>
      <td rowspan="5">是</td>
      <td >复选框（Checkbox）</td>
      <td >?</td>
    </tr>
    <tr>
      <td >表格（Table）</td>
      <td >DetailO2MTableFieldWidget</td>
    </tr>
    <tr>
      <td >拖拽上传（UploadDraggable）</td>
      <td >FormO2MUploadDraggableFieldWidget</td>
    </tr>
    <tr>
      <td >文件（Upload）</td>
      <td >FormO2MUploadFieldWidget</td>
    </tr>
    <tr>
      <td >图片（UploadImg）</td>
      <td >FormO2MUploadImgFieldWidget</td>
    </tr>
    <!-- 多对多（M2M）- 是（5行） -->
    <tr>
      <td rowspan="5">多对多（M2M）</td>
      <td rowspan="5">是</td>
      <td >复选框（Checkbox）</td>
      <td >?</td>
    </tr>
    <tr>
      <td >表格（Table）</td>
      <td >DetailM2MTableFieldWidget</td>
    </tr>
    <tr>
      <td >拖拽上传（UploadDraggable）</td>
      <td >FormM2MUploadDraggableFieldWidget</td>
    </tr>
    <tr>
      <td >文件（Upload）</td>
      <td >FormM2MUploadFieldWidget</td>
    </tr>
    <tr>
      <td >图片（UploadImg）</td>
      <td >FormM2MUploadImgFieldWidget</td>
    </tr>
  </tbody>
</table>


# 五、DSL 属性配置

## （一）详情属性配置

```xml
<element widget="Detail">
    ......
</element>
```

+ layout：表单布局（`'horizontal' | 'vertical' | 'inline'`）
+ cols：行栅格数（`number`）
+ filter：不可视过滤条件（`rsql`）
+ domain：可视过滤条件（`rsql`）
+ load：加载函数函数编码， `FunctionDefinition#fun`（`string`）

## （二）通用字段配置

+ invisible：是否隐藏（`boolean | expression`）
+ usingLoading：是否使用加载过渡动画（`boolean`）
+ layout：表单布局（`'horizontal' | 'vertical' | 'inline'`）
+ label：字段标题（`string | expression`）
+ labelInvisible：是否隐藏字段标题（`boolean`）
+ help：字段帮助文本（`string`）
+ hint：字段提示文本（`string | expression`）
+ required：是否必填（`boolean ｜ expresssion`）
+ requiredTips：必填提示文本（`string`）
+ disabled<font style="color:#DF2A3F;">*</font>：是否禁用（`boolean ｜ expresssion`）
+ emptyStyle<font style="color:#DF2A3F;">*</font>：空值样式（`string | 'hyphen' | 'empty' | 'null'`）

:::warning 提示

带 “<font style="color:#DF2A3F;">*</font>” 标记的属性并不是完全通用的属性，而是需要依赖具体组件实现，若组件本身的交互不支持或未实现的可能会出现配置无效的情况。

:::

## （三）字段组件属性配置

### 1、文本（STRING）

#### DetailStringFieldWidget

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

#### DetailStringColorPickerFieldWidget

```xml
<field data="stringField" widget="ColorPicker" />
```

#### DetailStringSignatureFieldWidget

```xml
<field data="stringField" widget="Signature" />
```

+ signatureFontColor：签名文字颜色（`color`）
+ signatureBackGroundColor：签名背景面板颜色（`color`）

#### DetailStringUploadFieldWidget

```xml
<field data="stringField" widget="Upload" />
```

+ cdnKey：指定上传 cdnKey，配合后端 OSS 配置使用（`string`）
+ privateLink：使用后端上传/下载文件，当 OSS 无法通过客户端直传时使用（`boolean`）

#### DetailStringUploadImgFieldWidget

```xml
<field data="stringField" widget="UploadImg" />
```

#### DetailStringIframeFieldWidget

```xml
<field data="stringField" widget="Iframe" />
```

+ crypto：加密存储（`boolean`）

#### DetailStringHyperlinksFieldWidget

```xml
<field data="stringField" widget="Hyperlinks" />
```

+ target：链接打开方式（`'OPEN_WINDOW' | 'ROUTER'`）
+ text：链接显示文本（`string`）

#### DetailStringDownloadFieldWidget

```xml
<field data="stringField" widget="Download" />
```

+ linkDisplayTextPrefix：下载提示文本前缀（`string`）
+ linkDisplayText：下载提示文本（`string`）
+ downloadFileName：下载的文件名（`string`）

#### DetailStringMediaPlayerFieldWidget

```xml
<field data="stringField" widget="MediaPlayer" />
```

#### DetailStringTagFieldWidget

```xml
<field data="stringMultiField" />
```

### 2、多行文本（TEXT）

#### DetailCommonFieldWidget

```xml
<field data="textField" />
```

### 3、富文本（HTML）

#### DetailHtmlFieldWidget

```xml
<field data="htmlField" />
```

+ encode：编码存储（`boolean`）

### 4、整数（INTEGER）

#### DetailNumberWidget

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

#### DetailBooleanFieldWidget

```xml
<field data="booleanField" />
```

### 6、枚举（ENUM）

#### DetailEnumFieldWidget

```xml
<field data="enumField" />
```

#### DetailEnumMultiFieldWidget

```xml
<field data="enumMultiField" />
```

### 7、日期时间（DATETIME）

#### DetailDateTimeFieldWidget

```xml
<field data="datetimeField" />
```

+ format：日期时间格式化文本（`string`）

### 8、日期（DATE）

#### DetailDateFieldWidget

```xml
<field data="dateField" />
```

+ format：日期格式化文本（`string`）

### 9、时间（TIME）

#### DetailTimeFieldWidget

```xml
<field data="timeField" />
```

+ format：时间格式化文本（`string`）

### 10、年份（YEAR）

#### DetailYearFieldWidget

```xml
<field data="yearField" />
```

+ format：年份格式化文本（`string`）

### 11、键值对（MAP）

#### DetailMapFieldWidget

```xml
<field data="mapField" />
```

### 12、多对一（M2O）

#### DetailM2OSelectFieldWidget

```xml
<field data="m2oField" />
```

+ optionLabel：可选项标题（`expression`）

#### DetailM2OUploadWidget

```xml
<field data="m2oField" widget="Upload" />
```

+ cdnKey：指定上传 cdnKey，配合后端 OSS 配置使用（`string`）
+ privateLink：使用后端上传/下载文件，当 OSS 无法通过客户端直传时使用（`boolean`）

### 13、一对多（O2M）

#### DetailO2MSelectFieldWidget

```xml
<field data="o2mField" />
```

+ optionLabel：可选项标题（`expression`）

#### DetailO2MTableFieldWidget

```xml
<field data="o2mField" widget="Table">
	<view type="TABLE">
		<template slot="fields">
			<field data="id" invisible="true" />
			<field data="code" />
			<field data="name" />
		</template>
	</view>
</field>
```

### 14、多对多（M2M）

#### DetailM2MSelectFieldWidget

```xml
<field data="=m2mField" />
```

+ optionLabel：可选项标题（`expression`）

#### DetailM2MTableFieldWidget

```xml
<field data="m2mField" widget="Table">
	<view type="TABLE">
		<template slot="fields">
			<field data="id" invisible="true" />
			<field data="code" />
			<field data="name" />
		</template>
	</view>
</field>
```

