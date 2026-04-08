---
title: 表单（Form）
index: true
category:
  - 研发手册
  - Reference
  - User interface
  - View architectures
order: 2
---
# 一、视图特征

+ 视图类型：表单（FORM）
+ 数据类型：对象（Object）
+ DSL 特征：具备布局功能。
+ 数据结构通用行为：
  - 查询行为：页面初始化、数据回填。
+ 表单行为：
  - 交互行为：数据填写、数据验证、数据提交等。
  - 子表格查询行为：通过前端分页查询。
+ 常用接口：（默认数据管理器函数）
  - construct：页面初始化。（pk is null）
  - queryOne：数据回填。（pk is not null）
  - create：新增时创建。（pk is null）
  - update：编辑时更新。（pk is not null）

# 二、DSL 结构

一个精简版视图可以是这样的：（“精简” 表示每个标签的属性数量少，而不是节点数量少。）

```xml
<view type="FORM" model="demo.DemoModel" name="demo_form_view">
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

+ 在这个 `DSL` 中，围绕着模型 `demo.DemoModel` 定义了**字段**和**动作**，并通过**布局**提供的**插槽**将其放在对应的位置。
+ 在插槽中的元素**从上到下**表示了其相对位置，改变**先后顺序**就可以改变其渲染在页面上的位置。
+ `action` 标签使用 `validateForm` 属性开启表单提交验证功能，使用 `goBack` 属性在提交成功后自动返回上一页面。
+ 返回动作是一个客户端动作，它与模型无关，也没有任何元数据。
+ 在 `fields` 插槽中，你可以使用所有的 `Pack 组件` 实现栅格布局功能。

:::warning 提示

更多关于 布局 相关的内容请参考：[Layout](/zh/DevManual/Reference/Front-EndFramework/Widget/layout.md)

更多关于 DSL 相关的内容请参考：[DSL](/zh/DevManual/Reference/Front-EndFramework/Widget/DSL.md)

更多关于 Pack 组件 相关的内容请参考：[Pack](/zh/DevManual/Reference/Front-EndFramework/Widget/pack.md)

:::

# 三、默认字段组件

在上面的 `DSL` 中，我们并没有指定 `widget` 属性，那么在这种情况下，Widget 框架将根据**字段元数据属性**获取对应的**默认组件**。下面列举了目前**表单**视图中用到的所有默认组件：

<table border="1" style="border-collapse: collapse; width: 100%; text-align: left;">
  <thead>
    <tr>
      <th style="padding: 8px;">字段类型</th>
      <th style="padding: 8px;">是否多值</th>
      <th style="padding: 8px;">默认组件</th>
      <th style="padding: 8px;">TypeScript Class</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2" style="padding: 8px; vertical-align: top;">文本（STRING）</td>
      <td style="padding: 8px;">否</td>
      <td style="padding: 8px;">文本（Input）</td>
      <td style="padding: 8px;">FormStringInputFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">是</td>
      <td style="padding: 8px;">标签（Tag）</td>
      <td style="padding: 8px;">FormStringMultiTagFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">多行文本（TEXT）</td>
      <td style="padding: 8px;">否</td>
      <td style="padding: 8px;">多行文本（TextArea）</td>
      <td style="padding: 8px;">FormTextFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">富文本（HTML）</td>
      <td style="padding: 8px;">否</td>
      <td style="padding: 8px;">富文本（RichText）</td>
      <td style="padding: 8px;">FormHtmlRichTextFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">手机（PHONE）</td>
      <td style="padding: 8px;">否</td>
      <td style="padding: 8px;">手机（Phone）</td>
      <td style="padding: 8px;">FormPhoneFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">邮箱（EMAIL）</td>
      <td style="padding: 8px;">否</td>
      <td style="padding: 8px;">邮箱（Email）</td>
      <td style="padding: 8px;">FormEmailFieldWidget</td>
    </tr>
    <tr>
      <td rowspan="2" style="padding: 8px; vertical-align: top;">整数（INTEGER）</td>
      <td style="padding: 8px;">否</td>
      <td style="padding: 8px;">整数（Integer）</td>
      <td style="padding: 8px;">FormIntegerFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">是</td>
      <td style="padding: 8px;">标签（Tag）</td>
      <td style="padding: 8px;">FormIntegerMultiFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">浮点数（FLOAT）</td>
      <td style="padding: 8px;">否</td>
      <td style="padding: 8px;">数字（Float）</td>
      <td style="padding: 8px;">FormFloatFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">金额（MONEY）</td>
      <td style="padding: 8px;">否</td>
      <td style="padding: 8px;">货币（Currency）</td>
      <td style="padding: 8px;">FormMoneyFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">布尔（BOOLEAN）</td>
      <td style="padding: 8px;">否</td>
      <td style="padding: 8px;">开关（Switch）</td>
      <td style="padding: 8px;">FormBooleanSwitchFieldWidget</td>
    </tr>
    <tr>
      <td rowspan="2" style="padding: 8px; vertical-align: top;">枚举（ENUM）</td>
      <td style="padding: 8px;">否</td>
      <td style="padding: 8px;">下拉单选（Select）</td>
      <td style="padding: 8px;">FormEnumFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">是</td>
      <td style="padding: 8px;">下拉多选（Select）</td>
      <td style="padding: 8px;">FormEnumMultiSelectFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">日期时间（DATETIME）</td>
      <td style="padding: 8px;">否</td>
      <td style="padding: 8px;">日期时间（DateTimePicker）</td>
      <td style="padding: 8px;">FormDateTimeFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">日期（DATE）</td>
      <td style="padding: 8px;">否</td>
      <td style="padding: 8px;">日期（DatePicker）</td>
      <td style="padding: 8px;">FormDateFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">时间（TIME）</td>
      <td style="padding: 8px;">否</td>
      <td style="padding: 8px;">时间（TimePicker）</td>
      <td style="padding: 8px;">FormTimeFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">年份（YEAR）</td>
      <td style="padding: 8px;">否</td>
      <td style="padding: 8px;">年份（YearPicker）</td>
      <td style="padding: 8px;">FormYearFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">键值对（MAP）</td>
      <td style="padding: 8px;">否</td>
      <td style="padding: 8px;">键值对（Map）</td>
      <td style="padding: 8px;">FormMapFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">多对一（M2O）</td>
      <td style="padding: 8px;">否</td>
      <td style="padding: 8px;">下拉单选（Select）</td>
      <td style="padding: 8px;">FormM2OSelectFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">一对多（O2M）</td>
      <td style="padding: 8px;">是</td>
      <td style="padding: 8px;">下拉多选（Select）</td>
      <td style="padding: 8px;">FormO2MSelectFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">多对多（M2M）</td>
      <td style="padding: 8px;">是</td>
      <td style="padding: 8px;">下拉多选（Select）</td>
      <td style="padding: 8px;">FormM2MFieldSelectWidget</td>
    </tr>
  </tbody>
</table>
    

# 四、可选字段组件

针对每一种字段类型，除了上述对应的默认组件外，还有一些组件是通过指定 `widget` 属性进行使用的。下面列举了目前**表单**视图中现有的字段组件：


<table border="1" style="border-collapse: collapse; width: 100%; ">
  <thead>
    <tr>
      <th>字段类型</th>
      <th>是否多值</th>
      <th>组件</th>
      <th>TypeScript Class</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="14">文本（STRING）</td>
      <td rowspan="11">否</td>
      <td>颜色（ColorPicker）</td>
      <td>FormStringColorPickerFieldWidget</td>
    </tr>
    <tr>
      <td>手写签名（Signature）</td>
      <td>FormStringSignatureFieldWidget</td>
    </tr>
    <tr>
      <td>拖拽上传（UploadDraggable）</td>
      <td>FormStringUploadDraggableFieldWidget</td>
    </tr>
    <tr>
      <td>文件（Upload）</td>
      <td>FormStringUploadFieldWidget</td>
    </tr>
    <tr>
      <td>图片（UploadImg）</td>
      <td>FormStringUploadImgFieldWidget</td>
    </tr>
    <tr>
      <td>嵌入网页（Iframe）</td>
      <td>FormStringIframeFieldWidget</td>
    </tr>
    <tr>
      <td>超链接（Hyperlinks）</td>
      <td>FormStringHyperlinksFieldWidget</td>
    </tr>
    <tr>
      <td>文件下载（Download）</td>
      <td>FormStringDownloadFieldWidget</td>
    </tr>
    <tr>
      <td>多媒体播放器（MediaPlayer）</td>
      <td>FormStringMediaPlayerFieldWidget</td>
    </tr>
    <tr>
      <td>手机（Phone）</td>
      <td>FormStringPhoneFieldWidget</td>
    </tr>
    <tr>
      <td>邮箱（Email）</td>
      <td>FormStringEmailFieldWidget</td>
    </tr>
    <tr>
      <td rowspan="3">是</td>
      <td>文件（Upload）</td>
      <td>FormStringUploadFieldWidget</td>
    </tr>
    <tr>
      <td>图片（UploadImg）</td>
      <td>FormStringUploadImgFieldWidget</td>
    </tr>
    <tr>
      <td>多媒体播放器（MediaPlayer）</td>
      <td>FormStringMediaPlayerFieldWidget</td>
    </tr>
    <tr>
      <td rowspan="5">多行文本（TEXT）</td>
      <td rowspan="5">否</td>
      <td>手写签名（Signature）</td>
      <td>FormStringSignatureFieldWidget</td>
    </tr>
    <tr>
      <td>拖拽上传（UploadDraggable）</td>
      <td>FormStringUploadDraggableFieldWidget</td>
    </tr>
    <tr>
      <td>文件（Upload）</td>
      <td>FormStringUploadFieldWidget</td>
    </tr>
    <tr>
      <td>图片（UploadImg）</td>
      <td>FormStringUploadImgFieldWidget</td>
    </tr>
    <tr>
      <td>文件下载（Download）</td>
      <td>FormStringDownloadFieldWidget</td>
    </tr>
    <tr>
      <td rowspan="2">整数（INTEGER）</td>
      <td>否</td>
      <td>滑动输入框（Slider）</td>
      <td>FormIntegerSliderFieldWidget</td>
    </tr>
    <tr>
      <td>是</td>
      <td>标签（Tag）</td>
      <td>FormIntegerTagFieldWidget</td>
    </tr>
    <tr>
      <td rowspan="3">布尔（BOOLEAN）</td>
      <td rowspan="3">否</td>
      <td>下拉单选（Select）</td>
      <td>FormBooleanSelectFieldWidget</td>
    </tr>
    <tr>
      <td>单选框（Radio）</td>
      <td>FormBooleanRadioFieldWidget</td>
    </tr>
    <tr>
      <td>复选框（Checkbox）</td>
      <td>FormBooleanCheckboxFieldWidget</td>
    </tr>
    <tr>
      <td rowspan="2">枚举（ENUM）</td>
      <td>否</td>
      <td>单选框（Radio）</td>
      <td>FormEnumRadioWidget</td>
    </tr>
    <tr>
      <td>是</td>
      <td>复选框（Checkbox）</td>
      <td>FormEnumMultiCheckboxFieldWidget</td>
    </tr>
    <tr>
      <td rowspan="11">多对一（M2O）</td>
      <td rowspan="11">否</td>
      <td>单选框（Radio）</td>
      <td>FormM2ORadioFieldWidget</td>
    </tr>
    <tr>
      <td>表单（Form）</td>
      <td>FormM2OFormFieldWidget</td>
    </tr>
    <tr>
      <td>树选择（TreeSelect）</td>
      <td>FormM2OTreeSelectFieldWidget</td>
    </tr>
    <tr>
      <td>级联选择（Cascader）</td>
      <td>FormM2OCascaderFieldWidget</td>
    </tr>
    <tr>
      <td>拖拽上传（UploadDraggable）</td>
      <td>FormM2OUploadDraggableFieldWidget</td>
    </tr>
    <tr>
      <td>文件（Upload）</td>
      <td>FormM2OUploadFieldWidget</td>
    </tr>
    <tr>
      <td>图片（UploadImg）</td>
      <td>FormM2OUploadImgFieldWidget</td>
    </tr>
    <tr>
      <td>地址（Address）</td>
      <td>FormM2OAddressFieldWidget</td>
    </tr>
    <tr>
      <td>公司（Company）</td>
      <td>FormM2OCompanyFieldWidget</td>
    </tr>
    <tr>
      <td>部门（Department）</td>
      <td>FormM2ODepartmentFieldWidget</td>
    </tr>
    <tr>
      <td>员工（Employee）</td>
      <td>FormM2OEmployeeFieldWidget</td>
    </tr>
    <tr>
      <td rowspan="8">一对多（O2M）</td>
      <td rowspan="8">是</td>
      <td>复选框（Checkbox）</td>
      <td>FormO2MCheckboxFieldWidget</td>
    </tr>
    <tr>
      <td>表格（Table）</td>
      <td>FormO2MTableFieldWidget</td>
    </tr>
    <tr>
      <td>树选择（TreeSelect）</td>
      <td>FormO2MTreeSelectFieldWidget</td>
    </tr>
    <tr>
      <td>级联选择（Cascader）</td>
      <td>FormO2MCascaderFieldWidget</td>
    </tr>
    <tr>
      <td>穿梭框（Transfer）</td>
      <td>FormTransferFieldWidget</td>
    </tr>
    <tr>
      <td>拖拽上传（UploadDraggable）</td>
      <td>FormO2MUploadDraggableFieldWidget</td>
    </tr>
    <tr>
      <td>文件（Upload）</td>
      <td>FormO2MUploadFieldWidget</td>
    </tr>
    <tr>
      <td>图片（UploadImg）</td>
      <td>FormO2MUploadImgFieldWidget</td>
    </tr>
    <tr>
      <td rowspan="12">多对多（M2M）</td>
      <td rowspan="12">是</td>
      <td>复选框（Checkbox）</td>
      <td>FormM2MCheckboxFieldWidget</td>
    </tr>
    <tr>
      <td>表格（Table）</td>
      <td>FormM2MTableFieldWidget</td>
    </tr>
    <tr>
      <td>树选择（TreeSelect）</td>
      <td>FormM2MTreeSelectFieldWidget</td>
    </tr>
    <tr>
      <td>级联选择（Cascader）</td>
      <td>FormM2MCascaderFieldWidget</td>
    </tr>
    <tr>
      <td>穿梭框（Transfer）</td>
      <td>FormTransferFieldWidget</td>
    </tr>
    <tr>
      <td>树（Tree）</td>
      <td>FormM2MTreeFieldWidget</td>
    </tr>
    <tr>
      <td>拖拽上传（UploadDraggable）</td>
      <td>FormM2MUploadDraggableFieldWidget</td>
    </tr>
    <tr>
      <td>文件（Upload）</td>
      <td>FormM2MUploadFieldWidget</td>
    </tr>
    <tr>
      <td>图片（UploadImg）</td>
      <td>FormM2MUploadImgFieldWidget</td>
    </tr>
    <tr>
      <td>公司（Company）</td>
      <td>FormM2MCompanyFieldWidget</td>
    </tr>
    <tr>
      <td>部门（Department）</td>
      <td>FormM2MDepartmentFieldWidget</td>
    </tr>
    <tr>
      <td>员工（Employee）</td>
      <td>FormM2MEmployeeFieldWidget</td>
    </tr>
  </tbody>
</table>
    

# 五、DSL 属性配置

## （一）表单属性配置

```xml
<element widget="Form">
    ......
</element>
```

+ layout：表单布局（`'horizontal' | 'vertical' | 'inline'`）
+ cols：行栅格数（`number`）
+ submitType：提交类型（`SubmitType`）
+ relationUpdateType：关联关系更新类型（`RelationUpdateType`）
+ filter：不可视过滤条件（`rsql`）
+ domain：可视过滤条件（`rsql`）
+ load：加载函数函数编码， `FunctionDefinition#fun`（`string`）

## （二）通用字段配置

+ invisible：是否隐藏（`boolean | expression`）
+ usingLoading：是否使用加载过渡动画（`boolean`）
+ submitType：提交类型（`SubmitType`）
+ relationUpdateType：关联关系更新类型（`RelationUpdateType`）
+ layout：表单布局（`'horizontal' | 'vertical' | 'inline'`）
+ label：字段标题（`string | expression`）
+ labelInvisible：是否隐藏字段标题（`boolean`）
+ help：字段帮助文本（`string`）
+ hint：字段提示文本（`string | expression`）
+ required：是否必填（`boolean ｜ expresssion`）
+ requiredTips：必填提示文本（`string`）
+ readonly<font style="color:#DF2A3F;">*</font>：是否只读（`boolean ｜ expresssion`）
+ disabled<font style="color:#DF2A3F;">*</font>：是否禁用（`boolean ｜ expresssion`）
+ validateTrigger<font style="color:#DF2A3F;">*</font>：验证触发时机（`('change' | 'blur')[]`）
+ validator：验证表达式（`expression`）
+ validatorMessage：验证表达式验证不通过的提示文本（`string`）
+ patternType：使用内置正则验证类型进行校验（`FieldStringPatternType | expression`）
+ pattern：正则表达式（`RegExp`）
+ tips：正则表达式验证不通过的提示文本（`string | expression`）
+ constructDataTrigger：提交数据触发时机（`('change' | 'blur')[]`）
+ constructFun：提交数据函数编码，`FunctionDefinition#fun`（`string`）
+ constructSubmitType：提交数据类型（`'CURRENT' | 'ROOT' | 'SELF' | 'CUSTOM'`）
+ submitFields：提交数据字段，当 `constructSubmitType="CUSTOM"` 时有效（`string[]`）
+ clearFieldsTrigger：清理字段触发时机（`('change' | 'blur')[]`）
+ clearFields：触发后清理字段列表（`string[]`）
+ allowClear<font style="color:#DF2A3F;">*</font>：允许置空（`boolean`）
+ placeholder<font style="color:#DF2A3F;">*</font>：占位提示文本（`string | expression`）
+ emptyStyle<font style="color:#DF2A3F;">*</font>：空值样式（`string | 'hyphen' | 'empty' | 'null'`）

:::warning 提示

带 “<font style="color:#DF2A3F;">*</font>” 标记的属性并不是完全通用的属性，而是需要依赖具体组件实现，若组件本身的交互不支持或未实现的可能会出现配置无效的情况。

例如：Checkbox 组件无法实现 allowClear 属性的功能。

:::

## （三）字段组件属性配置

### 1、文本（STRING）

#### FormStringInputFieldWidget

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
+ minLength：最小长度（`number | expression`）
+ maxLength：最大长度（`number | expression`）
+ showCount：显示计数器（`boolean`）
+ crypto：加密存储（`boolean`）
+ translation：翻译显示值（`boolean`）

#### FormStringColorPickerFieldWidget

```xml
<field data="stringField" widget="ColorPicker" />
```

+ predefine：预置颜色（`JSON - string[]`）

#### FormStringSignatureFieldWidget<font style="color:#DF2A3F;">*</font>

```xml
<field data="stringField" widget="Signature" />
```

+ showClearButton：是否展示清除按钮（`boolean`）
+ clearButtonText：清除按钮文字（`string`）
+ showSaveButton：是否展示保存按钮（`boolean`）
+ saveButtonText：保存按钮文字（`string`）
+ signatureFontColor：签名文字颜色（`color`）
+ signatureBackGroundColor：签名背景面板颜色（`color`）

#### FormStringUploadDraggableFieldWidget

```xml
<field data="stringField" widget="UploadDraggable" />
```

+ draggableIcon：拖拽上传图标（`icon`）
+ draggableTipText：拖拽上传提示词（`string`）
+ showDraggableExtendsionsText：是否展示支持拓展名（`boolean`）
+ draggableExtendsionsText：允许上传的文件类型提示文本（`string`）
+ partSize：单个分片大小（`number`：MB）
+ chunkUploadThreshold：分片总数阈值（`number`）
+ parallel：上传并发数（`number`）
+ limit：上传数量限制（`number`）
+ limitSize：单个文件上传大小限制（`number`：MB）
+ limitFileExtensions：限制文件扩展名类型（`string`）`eg：'.jpg,.jpeg,.png'`

#### FormStringUploadFieldWidget

```xml
<field data="stringField" widget="Upload" />
```

+ uploadPlaceholder：文件上传提示文本（`string`）
+ uploadIcon：文件上传提示图标（`icon`）
+ partSize：单个分片大小（`number`：MB）
+ chunkUploadThreshold：分片总数阈值（`number`）
+ parallel：上传并发数（`number`）
+ limit：上传数量限制（`number`）
+ limitSize：单个文件上传大小限制（`number`：MB）
+ limitFileExtensions：限制文件扩展名类型（`string`）`eg：'.jpg,.jpeg,.png'`
+ cdnKey：指定上传 cdnKey，配合后端 OSS 配置使用（`string`）
+ privateLink：使用后端上传/下载文件，当 OSS 无法通过客户端直传时使用（`boolean`）

#### FormStringUploadImgFieldWidget

```xml
<field data="stringField" widget="UploadImg" />
```

+ uploadPlaceholder：文件上传提示文本（`string`）
+ uploadIcon：文件上传提示图标（`icon`）
+ uploadIconText：上传图标提示文本（`string`）
+ partSize：单个分片大小（`number`：MB）
+ chunkUploadThreshold：分片总数阈值（`number`）
+ parallel：上传并发数（`number`）
+ limit：上传数量限制（`number`）
+ limitSize：单个文件上传大小限制（`number`：MB）
+ limitFileExtensions：限制文件扩展名类型（`string`）`eg：'.jpg,.jpeg,.png'`

#### FormStringIframeFieldWidget

```xml
<field data="stringField" widget="Iframe" />
```

+ mode：组件模式（`'DYNAMIC' | 'STATIC'`）

:::warning 提示

+ 当组件模式为 `STATIC` 时，可展示内嵌网页。
+ 当组件模式为 `DYNAMIC` 时，组件可配置属性与 FormStringInputFieldWidget 组件类似。

:::

#### FormStringHyperlinksFieldWidget

```xml
<field data="stringField" widget="Hyperlinks" />
```

+ target：链接打开方式（`'OPEN_WINDOW' | 'ROUTER'`）
+ text：链接显示文本（`string`）

#### FormStringDownloadFieldWidget

```xml
<field data="stringField" widget="Download" />
```

+ linkDisplayTextPrefix：下载提示文本前缀（`string`）
+ linkDisplayText：下载提示文本（`string`）
+ downloadFileName：下载的文件名（`string`）

#### FormStringMediaPlayerFieldWidget

```xml
<field data="stringField" widget="MediaPlayer" />
```

+ mode：组件模式（`'DYNAMIC' | 'STATIC'`）
+ fileSource：文件来源（`'UPLOAD' | 'INPUT'`）

:::warning 提示

+ 当组件模式为 `STATIC` 时，可展示多媒体播放器。
+ 当组件模式为 `DYNAMIC` 时，文件来源属性生效。
  - 当文件来源为 `UPLOAD` 时，组件可配置属性与 FormStringUploadFieldWidget 组件类似。
  - 当文件来源为 `INPUT` 时，组件可配置属性与 FormStringInputFieldWidget 组件类似。

:::

#### FormStringPhoneFieldWidget

```xml
<field data="stringField" widget="Phone" />
```

+ prefix：前缀文本（`string | icon`）
+ prefixType：前缀类型（`'TEXT' | 'ICON'`）
+ prefixStore：前缀是否存储（`boolean`）
+ suffix：后缀文本（`string | icon`）
+ suffixType：后缀类型（`'TEXT' | 'ICON'`）
+ suffixStore：后缀是否存储（`boolean`）
+ minLength：最小长度（`number | expression`）
+ maxLength：最大长度（`number | expression`）
+ showCount：显示计数器（`boolean`）

#### FormStringEmailFieldWidget

```xml
<field data="stringField" widget="Email" />
```

+ prefix：前缀文本（`string | icon`）
+ prefixType：前缀类型（`'TEXT' | 'ICON'`）
+ prefixStore：前缀是否存储（`boolean`）
+ suffix：后缀文本（`string | icon`）
+ suffixType：后缀类型（`'TEXT' | 'ICON'`）
+ suffixStore：后缀是否存储（`boolean`）
+ minLength：最小长度（`number | expression`）
+ maxLength：最大长度（`number | expression`）
+ showCount：显示计数器（`boolean`）

#### FormStringMultiTagFieldWidget

```xml
<field data="stringMultiField" />
```

+ allowRepeat：是否允许重复（`boolean`）
+ unitValueLength：单位值最大长度（`number`）

### 2、多行文本（TEXT）

#### FormTextFieldWidget

```xml
<field data="textField" />
```

+ minLength：最小长度（`number | expression`）
+ maxLength：最大长度（`number | expression`）
+ showCount：显示计数器（`boolean`）
+ rows：最小行数，可调整默认输入框高度（`number`）

### 3、富文本（HTML）

#### FormHtmlRichTextFieldWidget

```xml
<field data="htmlField" />
```

+ height：高度（`string | number`）
+ encode：加密存储（`boolean`）

### 4、手机（PHONE）

#### FormPhoneFieldWidget

```xml
<field data="phoneField" />
```

+ prefix：前缀文本（`string | icon`）
+ prefixType：前缀类型（`'TEXT' | 'ICON'`）
+ prefixStore：前缀是否存储（`boolean`）
+ suffix：后缀文本（`string | icon`）
+ suffixType：后缀类型（`'TEXT' | 'ICON'`）
+ suffixStore：后缀是否存储（`boolean`）
+ minLength：最小长度（`number | expression`）
+ maxLength：最大长度（`number | expression`）
+ showCount：显示计数器（`boolean`）

### 5、邮箱（EMAIL）

#### FormEmailFieldWidget

```xml
<field data="emailField" />
```

+ prefix：前缀文本（`string | icon`）
+ prefixType：前缀类型（`'TEXT' | 'ICON'`）
+ prefixStore：前缀是否存储（`boolean`）
+ suffix：后缀文本（`string | icon`）
+ suffixType：后缀类型（`'TEXT' | 'ICON'`）
+ suffixStore：后缀是否存储（`boolean`）
+ minLength：最小长度（`number | expression`）
+ maxLength：最大长度（`number | expression`）
+ showCount：显示计数器（`boolean`）

### 6、整数（INTEGER）

#### FormIntegerFieldWidget

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
+ size：整数位数（`number | expression`）
+ min：最小值（`number | expression`）
+ max：最大值（`number | expression`）
+ step：递增或递减步长（`number`）
+ addStep：递增步长，优先于 step 属性（`number`）
+ reduceStep：递减步长，优先于 step 属性（`number`）
+ autocorrection：失焦后自动修复（`boolean`）

#### FormIntegerSliderFieldWidget

```xml
<field data="integerField" widget="Slider" />
```

+ min：最小值（`number | expression`）
+ max：最大值（`number | expression`）
+ step：递增或递减步长（`number`）
+ direction：滑动条方向（`'horizontal' | 'vertical'`）
+ reverse：反向坐标轴，滑动条置反（`boolean`）
+ hasTooltip：显示提示气泡（`boolean`）

#### FormIntegerMultiFieldWidget

```xml
<field data="integerMultiField" />
```

+ allowRepeat：是否允许重复（`boolean`）
+ unitValueLength：单位值最大长度（`number`）
+ limit：最大标签个数（`number`）
+ min：单个数字最小值（`number | expression`）
+ max：单个数字最大值（`number | expression`）

#### FormIntegerTagFieldWidget

```xml
<field data="integerMultiField" widget="Tag" />
```

+ allowRepeat：是否允许重复（`boolean`）
+ unitValueLength：单位值最大长度（`number`）

### 7、浮点数（FLOAT）

#### FormFloatFieldWidget

```xml
<field data="floatField" />
```

+ prefix：前缀文本（`string | icon`）
+ prefixType：前缀类型（`'TEXT' | 'ICON'`）
+ prefixStore：前缀是否存储（`boolean`）
+ suffix：后缀文本（`string | icon`）
+ suffixType：后缀类型（`'TEXT' | 'ICON'`）
+ suffixStore：后缀是否存储（`boolean`）
+ unit：单位（`string | expression`）
+ showThousandth：是否显示千分位（`boolean | expression`）
+ size：整数位数（`number | expression`）
+ precision：小数位数（`number | expression`）
+ min：最小值（`number | expression`）
+ max：最大值（`number | expression`）
+ step：递增或递减步长（`number`）
+ addStep：递增步长，优先于 step 属性（`number`）
+ reduceStep：递减步长，优先于 step 属性（`number`）
+ autocorrection：失焦后自动修复（`boolean`）

### 8、金额（MONEY）

#### FormMoneyFieldWidget

```xml
<field data="moneyField" />
```

同 `FormFloatFieldWidget` 组件属性。

### 9、布尔（BOOLEAN）

#### FormBooleanSwitchFieldWidget

```xml
<field data="booleanField" />
```

#### FormBooleanSelectFieldWidget

```xml
<field data="booleanField" widget="Select" />
```

+ maxNumber：最大选择数（`number`）
+ minNumber：最小选择数（`number`）

#### FormBooleanRadioFieldWidget

```xml
<field data="booleanField" widget="Select" />
```

+ maxNumber：最大选择数（`number`）
+ minNumber：最小选择数（`number`）
+ orientation：排列方向（`'TRANSVERSE' | 'VERTICAL'`）
+ radioMode：可选项样式（`'BUTTON'`）
+ rowLimit：每行展示可选项数量（`number`）
+ autocorrection：失焦后自动修复（`boolean`）

#### FormBooleanCheckboxFieldWidget

```xml
<field data="booleanField" widget="Checkbox" />
```

### 10、枚举（ENUM）

#### FormEnumFieldWidget

```xml
<field data="enumField" />
```

+ maxNumber：最大选择数（`number`）
+ minNumber：最小选择数（`number`）

#### FormEnumRadioWidget

```xml
<field data="enumField" widget="Radio" />
```

+ maxNumber：最大选择数（`number`）
+ minNumber：最小选择数（`number`）
+ orientation：排列方向（`'TRANSVERSE' | 'VERTICAL'`）
+ radioMode：可选项样式（`'BUTTON'`）
+ rowLimit：每行展示可选项数量（`number`）
+ autocorrection：失焦后自动修复（`boolean`）

#### FormEnumMultiSelectFieldWidget

```xml
<field data="enumMultiField" />
```

+ maxNumber：最大选择数（`number`）
+ minNumber：最小选择数（`number`）

#### FormEnumMultiCheckboxFieldWidget

```xml
<field data="enumMultiField" widget="Checkbox" />
```

+ maxNumber：最大选择数（`number`）
+ minNumber：最小选择数（`number`）
+ orientation：排列方向（`'TRANSVERSE' | 'VERTICAL'`）

### 11、日期时间（DATETIME）

#### FormDateTimeFieldWidget

```xml
<field data="datetimeField" />
```

+ format：日期时间格式化文本（`string`）

### 12、日期（DATE）

#### FormDateFieldWidget

```xml
<field data="dateField" />
```

+ format：日期格式化文本（`string`）

### 13、时间（TIME）

#### FormTimeFieldWidget

```xml
<field data="timeField" />
```

+ format：时间格式化文本（`string`）

### 14、年份（YEAR）

#### FormYearFieldWidget

```xml
<field data="yearField" />
```

+ format：年份格式化文本（`string`）

### 15、键值对（MAP）

#### FormMapFieldWidget

```xml
<field data="mapField" />
```

+ limit：限制键值对数量（`number`）

### 16、多对一（M2O）

#### FormM2OSelectFieldWidget

```xml
<field data="m2oField" />
```

+ maxNumber：最大选择数（`number`）
+ minNumber：最小选择数（`number`）
+ load：加载函数函数编码， `FunctionDefinition#fun`（`string`）
+ showSearch：是否允许搜索（`boolean`）
+ searchFields：搜索字段（`string[]`）
+ optionLabel：可选项标题（`expression`）

#### FormM2ORadioFieldWidget

```xml
<field data="m2oField" widget="Radio" />
```

+ orientation：排列方向（`'TRANSVERSE' | 'VERTICAL'`）
+ optionLabel：可选项标题（`expression`）

#### FormM2OFormFieldWidget

```xml
<field data="m2oField" widget="Form">
	<view type="FORM">
		<template slot="fields">
			<field data="id" invisible="true" />
			<field data="code" />
			<field data="name" />
		</template>
	</view>
</field>
```

#### FormM2OTreeSelectFieldWidget

```xml
<!-- references="business.PamirsEmployee" -->
<field data="m2oField" widget="TreeSelect">
	<nodes>
		<node model="business.PamirsCompany" label="activeRecord.name" labelFields="name" selfReferences="parent" />
		<node model="business.PamirsDepartment" label="activeRecord.name" labelFields="name" references="company" selfReferences="parent" />
		<node model="business.PamirsEmployee" label="activeRecord.name" labelFields="name" references="departmentList" />
	</nodes>
</field>
```

+ onlySelectedLeaf：仅允许选择叶节点数据（`boolean`）
+ enableSearch：是否允许搜索（`boolean`）
+ fetchAll：一次性获取全部数据（`boolean`）
+ node.model：层级模型编码（`string`）
+ node.label：层级选项标题（`expression`）
+ node.labelFields：层级标题字段（`string[]`）
+ node.references：层级关联模型编码（`string`）
+ node.selfReferences：自关联字段编码（`string`）

#### FormM2OCascaderFieldWidget

```xml
<!-- references="business.PamirsEmployee" -->
<field data="m2oField" widget="Cascader">
	<nodes>
		<node model="business.PamirsCompany" label="activeRecord.name" labelFields="name" selfReferences="parent" />
		<node model="business.PamirsDepartment" label="activeRecord.name" labelFields="name" references="company" selfReferences="parent" />
		<node model="business.PamirsEmployee" label="activeRecord.name" labelFields="name" references="departmentList" />
	</nodes>
</field>
```

+ changeOnSelect：选择即改变（`boolean`）
+ showPath：显示选中路径（`boolean`）
+ labelsSeparator：标题文本分隔符（`string`）
+ enableSearch：是否允许搜索（`boolean`）
+ fetchAll：一次性获取全部数据（`boolean`）
+ node.model：层级模型编码（`string`）
+ node.label：层级选项标题（`expression`）
+ node.labelFields：层级标题字段（`string[]`）
+ node.references：层级关联模型编码（`string`）
+ node.selfReferences：自关联字段编码（`string`）

#### FormM2OUploadDraggableFieldWidget

```xml
<field data="m2oField" widget="UploadDraggable" />
```

+ draggableIcon：拖拽上传图标（`icon`）
+ draggableTipText：拖拽上传提示词（`string`）
+ showDraggableExtendsionsText：是否展示支持拓展名（`boolean`）
+ draggableExtendsionsText：允许上传的文件类型提示文本（`string`）
+ partSize：单个分片大小（`number`：MB）
+ chunkUploadThreshold：分片总数阈值（`number`）
+ parallel：上传并发数（`number`）
+ limitSize：单个文件上传大小限制（`number`：MB）
+ limitFileExtensions：限制文件扩展名类型（`string`）`eg：'.jpg,.jpeg,.png'`

#### FormM2OUploadFieldWidget

```xml
<!-- references="base.PamirsFile" -->
<field data="m2oField" widget="Upload" />
```

+ uploadPlaceholder：文件上传提示文本（`string`）
+ uploadIcon：文件上传提示图标（`icon`）
+ partSize：单个分片大小（`number`：MB）
+ chunkUploadThreshold：分片总数阈值（`number`）
+ parallel：上传并发数（`number`）
+ limitSize：单个文件上传大小限制（`number`：MB）
+ limitFileExtensions：限制文件扩展名类型（`string`）`eg：'.jpg,.jpeg,.png'`
+ cdnKey：指定上传 cdnKey，配合后端 OSS 配置使用（`string`）
+ privateLink：使用后端上传/下载文件，当 OSS 无法通过客户端直传时使用（`boolean`）

#### FormM2OUploadImgFieldWidget

```xml
<!-- references="base.PamirsFile" -->
<field data="m2oField" widget="UploadImg" />
```

+ ploadPlaceholder：文件上传提示文本（`string`）
+ uploadIcon：文件上传提示图标（`icon`）
+ uploadIconText：上传图标提示文本（`string`）
+ partSize：单个分片大小（`number`：MB）
+ chunkUploadThreshold：分片总数阈值（`number`）
+ parallel：上传并发数（`number`）
+ limitSize：单个文件上传大小限制（`number`：MB）
+ limitFileExtensions：限制文件扩展名类型（`string`）`eg：'.jpg,.jpeg,.png'`

#### FormM2OAddressFieldWidget

```xml
<!-- references="resource.ResourceAddress" -->
<field data="m2oField" widget="Address" />
```

+ changeOnSelect：选择即改变（`boolean`）
+ showPath：显示选中路径（`boolean`）
+ labelsSeparator：标题文本分隔符（`string`）
+ enableSearch：是否允许搜索（`boolean`）
+ fetchAll：一次性获取全部数据（`boolean`）

#### FormM2OCompanyFieldWidget

```xml
<!-- references="business.PamirsCompany" -->
<field data="m2oField" widget="Company" />
```

#### FormM2ODepartmentFieldWidget

```xml
<!-- references="business.PamirsDepartment" -->
<field data="m2oField" widget="Department" />
```

#### FormM2OEmployeeFieldWidget

```xml
<!-- references="business.PamirsEmployee" -->
<field data="m2oField" widget="Employee" />
```

### 17、一对多（O2M）

#### FormO2MSelectFieldWidget

```xml
<field data="o2mField" />
```

+ maxNumber：最大选择数（`number`）
+ minNumber：最小选择数（`number`）
+ load：加载函数函数编码， `FunctionDefinition#fun`（`string`）
+ showSearch：是否允许搜索（`boolean`）
+ searchFields：搜索字段（`string[]`）
+ optionLabel：可选项标题（`expression`）

#### FormO2MCheckboxFieldWidget

```xml
<field data="o2mField" widget="Checkbox" />
```

+ maxNumber：最大选择数（`number`）
+ minNumber：最小选择数（`number`）
+ load：加载函数函数编码， `FunctionDefinition#fun`（`string`）
+ optionLabel：可选项标题（`expression`）

#### FormO2MTableFieldWidget

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

#### FormO2MTreeSelectFieldWidget

```xml
<!-- references="business.PamirsEmployee" -->
<field data="o2mField" widget="TreeSelect">
	<nodes>
		<node model="business.PamirsCompany" label="activeRecord.name" labelFields="name" selfReferences="parent" />
		<node model="business.PamirsDepartment" label="activeRecord.name" labelFields="name" references="company" selfReferences="parent" />
		<node model="business.PamirsEmployee" label="activeRecord.name" labelFields="name" references="departmentList" />
	</nodes>
</field>
```

+ onlySelectedLeaf：仅允许选择叶节点数据（`boolean`）
+ enableSearch：是否允许搜索（`boolean`）
+ fetchAll：一次性获取全部数据（`boolean`）
+ node.model：层级模型编码（`string`）
+ node.label：层级选项标题（`expression`）
+ node.labelFields：层级标题字段（`string[]`）
+ node.references：层级关联模型编码（`string`）
+ node.selfReferences：自关联字段编码（`string`）

#### FormO2MCascaderFieldWidget

```xml
<!-- references="business.PamirsEmployee" -->
<field data="o2mField" widget="Cascader">
	<nodes>
		<node model="business.PamirsCompany" label="activeRecord.name" labelFields="name" selfReferences="parent" />
		<node model="business.PamirsDepartment" label="activeRecord.name" labelFields="name" references="company" selfReferences="parent" />
		<node model="business.PamirsEmployee" label="activeRecord.name" labelFields="name" references="departmentList" />
	</nodes>
</field>
```

+ changeOnSelect：选择即改变（`boolean`）
+ enableSearch：是否允许搜索（`boolean`）
+ fetchAll：一次性获取全部数据（`boolean`）
+ node.model：层级模型编码（`string`）
+ node.label：层级选项标题（`expression`）
+ node.labelFields：层级标题字段（`string[]`）
+ node.references：层级关联模型编码（`string`）
+ node.selfReferences：自关联字段编码（`string`）

#### FormO2MUploadDraggableFieldWidget

```xml
<field data="o2mField" widget="UploadDraggable" />
```

+ draggableIcon：拖拽上传图标（`icon`）
+ draggableTipText：拖拽上传提示词（`string`）
+ showDraggableExtendsionsText：是否展示支持拓展名（`boolean`）
+ draggableExtendsionsText：允许上传的文件类型提示文本（`string`）
+ partSize：单个分片大小（`number`：MB）
+ chunkUploadThreshold：分片总数阈值（`number`）
+ parallel：上传并发数（`number`）
+ limit：上传数量限制（`number`）
+ limitSize：单个文件上传大小限制（`number`：MB）
+ limitFileExtensions：限制文件扩展名类型（`string`）`eg：'.jpg,.jpeg,.png'`

#### FormO2MUploadFieldWidget

```xml
<field data="o2mField" widget="Upload" />
```

+ uploadPlaceholder：文件上传提示文本（`string`）
+ uploadIcon：文件上传提示图标（`icon`）
+ partSize：单个分片大小（`number`：MB）
+ chunkUploadThreshold：分片总数阈值（`number`）
+ parallel：上传并发数（`number`）
+ limit：上传数量限制（`number`）
+ limitSize：单个文件上传大小限制（`number`：MB）
+ limitFileExtensions：限制文件扩展名类型（`string`）`eg：'.jpg,.jpeg,.png'`
+ cdnKey：指定上传 cdnKey，配合后端 OSS 配置使用（`string`）
+ privateLink：使用后端上传/下载文件，当 OSS 无法通过客户端直传时使用（`boolean`）

#### FormO2MUploadImgFieldWidget

```xml
<field data="o2mField" widget="UploadImg" />
```

+ ploadPlaceholder：文件上传提示文本（`string`）
+ uploadIcon：文件上传提示图标（`icon`）
+ uploadIconText：上传图标提示文本（`string`）
+ partSize：单个分片大小（`number`：MB）
+ chunkUploadThreshold：分片总数阈值（`number`）
+ parallel：上传并发数（`number`）
+ limit：上传数量限制（`number`）
+ limitSize：单个文件上传大小限制（`number`：MB）
+ limitFileExtensions：限制文件扩展名类型（`string`）`eg：'.jpg,.jpeg,.png'`

### 18、多对多（M2M）

#### FormM2MFieldSelectWidget

```xml
<field data="m2mField" />
```

+ maxNumber：最大选择数（`number`）
+ minNumber：最小选择数（`number`）
+ load：加载函数函数编码， `FunctionDefinition#fun`（`string`）
+ showSearch：是否允许搜索（`boolean`）
+ searchFields：搜索字段（`string[]`）
+ optionLabel：可选项标题（`expression`）

#### FormM2MCheckboxFieldWidget

```xml
<field data="m2mField" widget="Checkbox" />
```

+ maxNumber：最大选择数（`number`）
+ minNumber：最小选择数（`number`）
+ load：加载函数函数编码， `FunctionDefinition#fun`（`string`）
+ optionLabel：可选项标题（`expression`）

#### FormM2MTableFieldWidget

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

#### FormM2MTreeSelectFieldWidget

```xml
<!-- references="business.PamirsEmployee" -->
<field data="m2mField" widget="TreeSelect">
	<nodes>
		<node model="business.PamirsCompany" label="activeRecord.name" labelFields="name" selfReferences="parent" />
		<node model="business.PamirsDepartment" label="activeRecord.name" labelFields="name" references="company" selfReferences="parent" />
		<node model="business.PamirsEmployee" label="activeRecord.name" labelFields="name" references="departmentList" />
	</nodes>
</field>
```

+ onlySelectedLeaf：仅允许选择叶节点数据（`boolean`）
+ enableSearch：是否允许搜索（`boolean`）
+ fetchAll：一次性获取全部数据（`boolean`）
+ node.model：层级模型编码（`string`）
+ node.label：层级选项标题（`expression`）
+ node.labelFields：层级标题字段（`string[]`）
+ node.references：层级关联模型编码（`string`）
+ node.selfReferences：自关联字段编码（`string`）

#### FormM2MCascaderFieldWidget

```xml
<!-- references="business.PamirsEmployee" -->
<field data="m2mField" widget="Cascader">
	<nodes>
		<node model="business.PamirsCompany" label="activeRecord.name" labelFields="name" selfReferences="parent" />
		<node model="business.PamirsDepartment" label="activeRecord.name" labelFields="name" references="company" selfReferences="parent" />
		<node model="business.PamirsEmployee" label="activeRecord.name" labelFields="name" references="departmentList" />
	</nodes>
</field>
```

+ changeOnSelect：选择即改变（`boolean`）
+ enableSearch：是否允许搜索（`boolean`）
+ fetchAll：一次性获取全部数据（`boolean`）
+ node.model：层级模型编码（`string`）
+ node.label：层级选项标题（`expression`）
+ node.labelFields：层级标题字段（`string[]`）
+ node.references：层级关联模型编码（`string`）
+ node.selfReferences：自关联字段编码（`string`）

#### FormTransferFieldWidget

```xml
<field data="m2mField" widget="Transfer" />
```

+ maxNumber：最大选择数（`number`）
+ minNumber：最小选择数（`number`）
+ optionLabel：可选项标题（`expression`）
+ enableSearch：是否启用搜索（`boolean`）
+ sortable：是否启用排序（`boolean`）
+ leftDisplayType：左侧显示类型（`'LIST' | 'TABLE'`）
+ leftFields：左侧表格显示字段，当 `leftDisplayType="TABLE"` 时有效（`string[]`）
+ rightDisplayType：右侧显示类型（`'LIST' | 'TABLE'`）
+ rightFields：右侧表格显示字段，当 `rightDisplayType="TABLE"` 时有效（`string[]`）

#### FormM2MTreeFieldWidget

```xml
<!-- references="business.PamirsEmployee" -->
<field data="m2mField" widget="Tree">
	<nodes>
		<node model="business.PamirsCompany" label="activeRecord.name" labelFields="name" selfReferences="parent" />
		<node model="business.PamirsDepartment" label="activeRecord.name" labelFields="name" references="company" selfReferences="parent" />
		<node model="business.PamirsEmployee" label="activeRecord.name" labelFields="name" references="departmentList" />
	</nodes>
</field>
```

+ onlySelectedLeaf：仅允许选择叶节点数据（`boolean`）
+ checkStrictly：选中时父子节点选中状态关联（`boolean`）
+ nodeCheckedAll：节点允许全选（`boolean`）
+ nodeCheckedAllLabel：全选标题文本（`string`）
+ nodeUncheckedAllLabel：取消全选标题文本（`string`）
+ fetchAll：一次性获取全部数据（`boolean`）
+ node.model：层级模型编码（`string`）
+ node.label：层级选项标题（`expression`）
+ node.labelFields：层级标题字段（`string[]`）
+ node.references：层级关联模型编码（`string`）
+ node.selfReferences：自关联字段编码（`string`）

#### FormM2MUploadDraggableFieldWidget

```xml
<field data="m2mField" widget="UploadDraggable" />
```

+ draggableIcon：拖拽上传图标（`icon`）
+ draggableTipText：拖拽上传提示词（`string`）
+ showDraggableExtendsionsText：是否展示支持拓展名（`boolean`）
+ draggableExtendsionsText：允许上传的文件类型提示文本（`string`）
+ partSize：单个分片大小（`number`：MB）
+ chunkUploadThreshold：分片总数阈值（`number`）
+ parallel：上传并发数（`number`）
+ limit：上传数量限制（`number`）
+ limitSize：单个文件上传大小限制（`number`：MB）
+ limitFileExtensions：限制文件扩展名类型（`string`）`eg：'.jpg,.jpeg,.png'`

#### FormM2MUploadFieldWidget

```xml
<field data="m2mField" widget="Upload" />
```

+ uploadPlaceholder：文件上传提示文本（`string`）
+ uploadIcon：文件上传提示图标（`icon`）
+ partSize：单个分片大小（`number`：MB）
+ chunkUploadThreshold：分片总数阈值（`number`）
+ parallel：上传并发数（`number`）
+ limit：上传数量限制（`number`）
+ limitSize：单个文件上传大小限制（`number`：MB）
+ limitFileExtensions：限制文件扩展名类型（`string`）`eg：'.jpg,.jpeg,.png'`
+ cdnKey：指定上传 cdnKey，配合后端 OSS 配置使用（`string`）
+ privateLink：使用后端上传/下载文件，当 OSS 无法通过客户端直传时使用（`boolean`）

#### FormM2MUploadImgFieldWidget

```xml
<field data="m2mField" widget="UploadImg" />
```

+ ploadPlaceholder：文件上传提示文本（`string`）
+ uploadIcon：文件上传提示图标（`icon`）
+ uploadIconText：上传图标提示文本（`string`）
+ partSize：单个分片大小（`number`：MB）
+ chunkUploadThreshold：分片总数阈值（`number`）
+ parallel：上传并发数（`number`）
+ limit：上传数量限制（`number`）
+ limitSize：单个文件上传大小限制（`number`：MB）
+ limitFileExtensions：限制文件扩展名类型（`string`）`eg：'.jpg,.jpeg,.png'`

#### FormM2MCompanyFieldWidget

```xml
<!-- references="business.PamirsCompany" -->
<field data="m2mField" widget="Company" />
```

#### FormM2MDepartmentFieldWidget

```xml
<!-- references="business.PamirsDepartment" -->
<field data="m2mField" widget="Department" />
```

#### FormM2MEmployeeFieldWidget

```xml
<!-- references="business.PamirsEmployee" -->
<field data="m2mField" widget="Employee" />
```

