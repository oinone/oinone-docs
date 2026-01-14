---
title: Form Field
index: true
category:
  - 研发手册
  - Reference
  - 前端API
  - Widget
  - Field
order: 3

---
# 一、Reference List

## （一）文本（String）

### 1、FormStringFieldWidget

**继承**：FormInputAbstractFieldWidget

**属性**：

+ clearSetEmpty：清空时是否设置为空值，默认值为 `true`。（`boolean`）
+ crypto：是否开启加密，默认值为 `false`。（`boolean`）
+ invisibleIcon：不可见状态图标，默认值为 `oinone-invisible`。（`string`）
+ maxLength：最大长度，优先级：DSL 配置 > 字段存储配置 > 默认值 `1024`。（`number`）
+ minLength：最小长度，优先级：DSL 配置 > 字段配置 > 默认值 `0`。（`number`）
+ pattern：正则表达式模式。（`string | undefined`）
+ patternType：模式类型，通过 DSL 表达式计算获取。（`any`）
+ showCount：是否显示字符计数，默认值为 `false`。（`boolean`）
+ type：输入类型，默认值为 `InputType.TEXT`。（`string`）
+ visibleIcon：可见状态图标，默认值为 `oinone-visible`。（`string`）

**方法**：

#### **change**

+ **功能描述**：值变更处理，将空值转为 `null` 后触发父类变更逻辑。
+ **类型**：`(value: any) => void`
+ **参数**：
  - `value`：变更后的值。

#### **validateLength**

+ **功能描述**：验证输入值长度是否符合配置的最小 / 最大长度。
+ **类型**：`(realValue: string | undefined) => ValidatorInfo`
+ **参数**：
  - `realValue`：待验证的输入值。
+ **返回值**：验证结果信息。

#### **validator**

+ **功能描述**：异步验证输入值，先执行特定验证，再验证长度。
+ **类型**：`() => Promise<ValidatorInfo>`
+ **返回值**：验证结果信息。

### 2、FormStringInputFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search],
    ttype: ModelFieldType.String
  })
)
export class FormStringInputFieldWidget extends FormStringFieldWidget
```

**属性**：

+ translation：是否启用翻译。（`boolean`）

**方法**：

#### **submit**

+ **功能描述**：处理表单提交，对加密字段进行值加密后调用默认提交处理器。
+ **类型**：`(submitValue: SubmitValue) => any`
+ **参数**：
  - `submitValue`：待提交的值。
+ **返回值**：提交处理结果。

#### **validator**

+ **功能描述**：异步验证输入值，继承父类验证逻辑（特定验证和长度验证）。
+ **类型**：`() => Promise<ValidatorInfo>`
+ **返回值**：验证结果信息。

### 3、FormStringColorPickerFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Form,
    ttype: ModelFieldType.String,
    widget: 'ColorPicker'
  })
)
export class FormStringColorPickerFieldWidget extends FormFieldWidget
```

**属性**：

+ predefine：预定义颜色列表，默认值为 `DEFAULT_PREDEFINE`。（`string[]`）

**方法**：

#### **change**

+ **功能描述**：值变更处理，触发父类变更逻辑并失焦。
+ **类型**：`(v: any) => void`
+ **参数**：
  - `v`：变更后的值。

### 4、FormStringDownloadFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Form,
    ttype: [ModelFieldType.String, ModelFieldType.Text],
    widget: 'Download'
  })
)
export class FormStringDownloadFieldWidget extends FormStringFieldWidget
```

**属性**：

+ downloadFileName：下载的文件名，通过 DSL 配置的国际化键解析获取。（`string`）
+ linkDisplayText：下载提示文本，默认使用字段值。（`string`）
+ linkDisplayTextPrefix：下载提示文本前缀。（`string | undefined`）

**方法**：

#### **onDownload**

+ **功能描述**：处理下载事件，发起网络请求获取文件数据并触发浏览器下载。
+ **类型**：`(e: Event) => Promise<void>`
+ **参数**：
  - `e`：事件对象。

### 5、FormStringEmailFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search],
    ttype: ModelFieldType.String,
    widget: 'Email'
  })
)
export class FormStringEmailFieldWidget extends FormEmailFieldWidget
```

### 6、FormStringHyperlinksFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Form,
    ttype: ModelFieldType.String,
    widget: 'Hyperlinks'
  })
)
export class FormStringHyperlinksFieldWidget extends FormStringInputFieldWidget
```

**属性**：

+ target：超链接打开方式，默认值为 `BLANK`。（`RedirectTargetEnum`）
+ text：超链接显示文本。（`string | undefined`）

### 7、FormStringIconSelectFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search],
    ttype: ModelFieldType.String,
    widget: 'IconSelect'
  })
)
export class FormStringIconSelectFieldWidget extends FormStringFieldWidget
```

**属性**：

+ icons：可选图标列表。（`any`）
+ modalTitle：模态框标题。（`string | undefined`）

### 8、FormStringIframeFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Form,
    ttype: ModelFieldType.String,
    widget: ['Iframe']
  })
)
export class FormStringIframeFieldWidget extends FormStringInputFieldWidget
```

### 9、FormStringKeyboardInputFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Form,
    ttype: ModelFieldType.String,
    widget: 'KeyboardInput'
  })
)
export class FormStringKeyboardInputFieldWidget extends FormFieldWidget<string>
```

**属性**：

+ altKey：Alt 键关联的表单数据字段名。（`string | undefined`）
+ ctrlKey：Ctrl 键关联的表单数据字段名。（`string | undefined`）
+ displayValue：显示的快捷键组合文本，格式为 "Ctrl + Alt + Key"。（`string`）
+ shiftKey：Shift 键关联的表单数据字段名。（`string | undefined`）

**方法**：

#### **change**

+ **功能描述**：值变更处理，将空值转为 `null` 并清空关联的修饰键状态。
+ **类型**：`(val: any) => void`
+ **参数**：
  - `val`：变更后的值。

#### **onKeypress**

+ **功能描述**：键盘按键事件处理，更新值和关联的修饰键状态。
+ **类型**：`(message: KeyboardEventMessage) => void`
+ **参数**：
  - `message`：键盘事件消息对象。

### 10、FormStringPasswordFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search, ViewType.Detail],
    ttype: ModelFieldType.String,
    widget: ['Password']
  })
)
export class FormStringPasswordFieldWidget extends FormStringFieldWidget
```

**方法**：

#### **submit**

+ **功能描述**：处理表单提交，对加密字段进行值加密后调用默认提交处理器。
+ **类型**：`(submitValue: SubmitValue) => any`
+ **参数**：
  - `submitValue`：待提交的值。
+ **返回值**：提交处理结果。

#### **validator**

+ **功能描述**：异步验证输入值，继承父类验证逻辑（特定验证和长度验证）。
+ **类型**：`() => Promise<ValidatorInfo>`
+ **返回值**：验证结果信息。

### 11、FormStringPhoneFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search],
    ttype: ModelFieldType.String,
    widget: 'Phone'
  })
)
export class FormStringPhoneFieldWidget extends FormPhoneFieldWidget
```

### 12、FormStringSignatureFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Form,
    ttype: [ModelFieldType.String, ModelFieldType.Text],
    widget: 'Signature'
  })
)
export class FormStringSignatureFieldWidget extends FormStringInputFieldWidget
```

**属性**：

+ clearButtonText：清除按钮文字，默认值为 `清除`。（`string`）
+ clearFormStringSignatureFieldSubject：清除签名画板流事件。（`WidgetSubjection<Record<string, unknown>>`）
+ saveButtonText：保存按钮文字，默认值为 `保存`。（`string`）
+ showClearButton：是否展示清除按钮，默认值为 `true`。（`boolean`）
+ showPlaceholder：是否展示占位文字，默认值为 `true`。（`boolean`）
+ showSaveButton：是否展示保存按钮，默认值为 `true`。（`boolean`）
+ signatureBackGroundColor：签名背景面板颜色，默认值为 `white`。（`string`）
+ signatureFontColor：签名文字颜色，默认值为 `black`。（`string`）

**方法**：

#### **getSmoothSignature**

+ **功能描述**：获取签名画板对象实例。
+ **类型**：`() => SmoothSignature | undefined`
+ **返回值**：签名画板对象实例。

#### **onClear**

+ **功能描述**：清除签名内容并重置状态。
+ **类型**：`() => void`

#### **onSaveSignature**

+ **功能描述**：保存签名为 PNG 图片并上传。
+ **类型**：`() => Promise<void>`

#### **onStart**

+ **功能描述**：开始签名时隐藏占位提示。
+ **类型**：`() => void`

#### **setSmoothSignature**

+ **功能描述**：设置签名画板对象实例。
+ **类型**：`(smoothSignature: SmoothSignature) => void`
+ **参数**：
  - `smoothSignature`：签名画板对象实例。

#### **submit**

+ **功能描述**：处理表单提交，自动保存签名并加密值。
+ **类型**：`(submitValue: SubmitValue) => any`
+ **参数**：
  - `submitValue`：待提交的值。
+ **返回值**：提交处理结果。

### 13、FormStringMultiTagFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search],
    ttype: ModelFieldType.String,
    multi: true
  })
)
export class FormStringMultiTagFieldWidget extends FormFieldWidget<string, RuntimeStringField>
```

**属性**：

+ allowRepeat：是否允许重复标签，默认值为 `false`。（`boolean`）
+ limit：标签最大个数，继承自字段配置。（`number | undefined`）
+ unitValueLength：标签值长度，优先级：DSL 配置 > 字段属性配置。（`number | undefined`）

**方法**：

#### **tagChange**

+ **功能描述**：标签值变更处理，空数组转为 `null` 后触发变更和失焦。
+ **类型**：`(value: any) => void`
+ **参数**：
  - `value`：变更后的标签值数组。

#### **validator**

+ **功能描述**：异步验证标签数量是否超出限制。
+ **类型**：`() => Promise<ValidatorInfo>`
+ **返回值**：验证结果信息。

### 14、FormStringTextAreaFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search],
    ttype: ModelFieldType.String,
    widget: 'TextArea'
  })
)
export class FormStringTextAreaFieldWidget extends FormTextFieldWidget
```

### 15、FormStringUploadFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Form,
    ttype: [ModelFieldType.String, ModelFieldType.Text],
    widget: 'Upload'
  })
)
export class FormStringUploadFieldWidget extends FormFieldWidget<string[], RuntimeStringField>
```

**属性**：

+ allLimitSize：总文件大小限制。（`string`）
+ cdnKey：CDN 密钥。（`string | undefined`）
+ chunkUploadThreshold：分块上传阈值，默认值来自配置。（`number`）
+ defaultValidateTrigger：默认验证触发时机，默认值为 `[ValidateTrigger.CHANGE]`。（`ValidateTrigger[]`）
+ fileDisplayPrefixText：文件展示前缀文本，默认值为 `prefix：`。（`string`）
+ fileDisplayText：文件展示占位文本，默认值为 `fileDisplayText`。（`string`）
+ limit：上传文件数量限制，优先级：DSL 配置 > 字段配置 > 默认值 `-1`。（`number`）
+ limitFileExtensions：允许的文件扩展名。（`string | undefined`）
+ limitSize：单个文件大小限制。（`number`）
+ multiple：是否允许多文件上传。（`boolean`）
+ parallel：并行上传数，默认值来自配置。（`number`）
+ partSize：分块大小，默认值来自配置。（`number`）
+ privateLink：是否为私有链接。（`boolean`）
+ uploadIcon：上传图标。（`string | undefined`）
+ uploadIconText：上传图标文本。（`string | undefined`）
+ uploadPlaceholder：上传占位文本。（`string | undefined`）

**方法**：

#### **change**

+ **功能描述**：文件值变更处理，根据单 / 多文件场景转换值格式后触发父类变更和失焦。
+ **类型**：`(value: any) => void`
+ **参数**：
  - `value`：变更后的文件值（数组或对象）。

#### **remove**

+ **功能描述**：文件删除处理，更新文件列表并触发父类变更和失焦。
+ **类型**：`(value: any) => void`
+ **参数**：
  - `value`：待删除的文件值。

#### **validator**

+ **功能描述**：异步验证文件链接总长度是否超出字段大小限制。
+ **类型**：`() => Promise<ValidatorInfo>`
+ **返回值**：验证结果信息。

### 16、FormStringUploadImgFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Form,
    ttype: [ModelFieldType.String, ModelFieldType.Text],
    widget: ['UploadImg']
  })
)
export class FormStringUploadImgFieldWidget extends FormStringUploadFieldWidget
```

### 17、FormStringUploadDraggableFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Form,
    ttype: [ModelFieldType.String, ModelFieldType.Text],
    widget: 'UploadDraggable'
  })
)
export class FormStringUploadDraggableFieldWidget extends FormStringUploadFieldWidget
```

**属性**：

+ draggableIcon：拖拽上传图标，默认值为 `oinone-shangchuan1`。（`string`）
+ draggableExtendsionsText：允许上传的文件类型提示文本。（`string`）
+ draggableTipText：拖拽上传提示词，默认值为 `点击 或 拖拽文件到这里上传`。（`string`）
+ showDraggableExtendsionsText：是否展示支持拓展名，默认值为 `true`。（`boolean`）

### 18、FormStringVerificationCodeFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormStringFieldWidget.Token({
    viewType: ViewType.Form,
    widget: 'VerificationCode'
  })
)
export class FormStringVerificationCodeFieldWidget extends FormStringFieldWidget
```

**属性**：

+ imagePath：验证码图片接口路径，默认值为 `/pamirs/api/refreshPicCode`。（`string`）
+ picCodeScene：验证码场景参数，拼接在图片路径后。（`string`）

**方法**：

#### **genPath**

+ **功能描述**：生成带时间戳和场景参数的验证码图片完整路径。
+ **类型**：`() => string`
+ **返回值**：验证码图片完整 URL。

### 19、FormStringSelectFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search],
    ttype: ModelFieldType.String,
    widget: 'Select',
    multi: true
  })
)
export class FormStringMultiSelectFieldWidget extends FormEnumMultiSelectFieldWidget
```

**方法**：

#### **handleOptions**

+ **功能描述**：处理枚举选项，将 `displayName` 映射为标签，缺失值时用 `name` 填充。
+ **类型**：`(ops: RuntimeEnumerationOption[]) => RuntimeEnumerationOption[]`
+ **参数**：
  - `ops`：原始枚举选项数组。
+ **返回值**：处理后的枚举选项数组。

### 20、FormStringMultiSelectFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search],
    ttype: ModelFieldType.String,
    widget: 'Select',
    multi: true
  })
)
export class FormStringMultiSelectFieldWidget extends FormEnumMultiSelectFieldWidget
```

**方法**：

#### **handleOptions**

+ **功能描述**：处理枚举选项，将 `displayName` 映射为标签，缺失值时用 `name` 填充。
+ **类型**：`(ops: RuntimeEnumerationOption[]) => RuntimeEnumerationOption[]`
+ **参数**：
  - `ops`：原始枚举选项数组。
+ **返回值**：处理后的枚举选项数组。

## （二）多行文本（Text）

### 1、FormTextFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search],
    ttype: ModelFieldType.Text
  })
)
export class FormTextFieldWidget extends FormStringFieldWidget
```

**属性**：

+ maxLength：文本最大长度，优先级：DSL 配置 > 字段存储大小 > 默认值 `16383`。（`number`）
+ rows：文本域行数，默认值为 `3`（DSL 配置非数字时生效）。（`number`）

**方法**：

#### **validator**

+ **功能描述**：异步验证输入值，继承父类验证逻辑（特定验证和长度验证）。
+ **类型**：`() => Promise<ValidatorInfo>`
+ **返回值**：验证结果信息。

## （三）富文本（Html）

### 1、FormHtmlRichTextFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Form,
    ttype: ModelFieldType.HTML
  })
)
export class FormHtmlRichTextFieldWidget extends FormStringFieldWidget
```

**属性**：

+ encode：是否对内容进行 URI 编码，默认值为 `false`。（`boolean`）
+ height：富文本编辑器高度，自动转换为像素单位（如 `'200'` 转为 `'200px'`）。（`string | undefined`）

**方法**：

#### **change**

+ **功能描述**：值变更处理，根据 `encode` 配置对内容进行编码后触发父类变更。
+ **类型**：`(val: string) => void`
+ **参数**：
  - `val`：变更后的值。

#### **validator**

+ **功能描述**：异步验证输入值，自动解码编码内容后执行长度验证。
+ **类型**：`() => Promise<ValidatorInfo>`
+ **返回值**：验证结果信息。

## （四）手机（Phone）

### 1、FormPhoneFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search],
    ttype: ModelFieldType.Phone
  })
)
export class FormPhoneFieldWidget extends FormStringFieldWidget
```

**方法**：

#### **validator**

+ **功能描述**：异步验证手机号格式，继承父类验证逻辑并新增手机号正则校验。
+ **类型**：`() => Promise<ValidatorInfo>`
+ **返回值**：验证结果信息。

## （五）邮箱（Email）

### 1、FormEmailFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search],
    ttype: ModelFieldType.Email
  })
)
export class FormEmailFieldWidget extends FormStringFieldWidget
```

**方法**：

#### **validator**

+ **功能描述**：异步验证邮箱格式，继承父类验证逻辑并新增邮箱正则校验。
+ **类型**：`() => Promise<ValidatorInfo>`
+ **返回值**：验证结果信息。

## （六）整数（Integer）

### 1、FormIntegerFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search],
    ttype: ModelFieldType.Integer
  })
)
export class FormIntegerFieldWidget<
  Value extends NumberValue | NumberValue[] = NumberValue
> extends FormNumberAbstractFieldWidget<Value>
```

**属性**：

+ addStep：增加步长。（`any`）
+ autocorrection：是否自动修正格式，默认值为 `false`。（`boolean`）
+ max：最大值，优先级：DSL 表达式计算值 > 字段配置 > 自动计算值（基于长度和精度） > 最大安全整数。（`string | number | undefined`）
+ maxSafeInteger：最大安全整数，默认值为 `9223372036854775807`。（`string | number`）
+ min：最小值，优先级：DSL 表达式计算值 > 字段配置 > 自动计算值（基于长度和精度） > 最小安全整数。（`string | number | undefined`）
+ minSafeInteger：最小安全整数，默认值为 `-9223372036854775808`。（`string | number`）
+ reduceStep：减少步长。（`any`）
+ step：步长。（`any`）
+ unit：单位。（`string | undefined`）

**方法**：

#### **checkValue**

+ **功能描述**：校验数值是否在合法范围内（最小值 / 最大值 / 安全整数）。
+ **类型**：`(singleValue: any, res: ValidatorInfo) => ValidatorInfo`
+ **参数**：
  - `singleValue`：待校验的值。
  - `res`：当前验证结果。
+ **返回值**：更新后的验证结果。

#### **validator**

+ **功能描述**：异步验证输入值，继承父类验证逻辑并新增整数格式校验（非整数时报错）。
+ **类型**：`() => Promise<ValidatorInfo>`
+ **返回值**：验证结果信息。

#### **rawValidator**

+ **功能描述**：执行父类原始验证逻辑（不包含自定义整数校验）。
+ **类型**：`() => Promise<ValidatorInfo>`
+ **返回值**：验证结果信息。

### 2、FormIntegerMultiFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search],
    ttype: [ModelFieldType.Integer],
    multi: true
  })
)
export class FormIntegerMultiFieldWidget extends FormIntegerFieldWidget<NumberValue[]>
```

**属性**：

+ allowRepeat：是否允许重复标签，默认值为 `false`。（`boolean`）
+ inputRegular：输入内容正则匹配规则，默认值为 `/\[^\d]/g`（过滤非数字字符）。（`RegExp`）
+ limit：标签最大个数，优先级：字段配置 > DSL 配置 > 默认值 `0`。（`number`）
+ unitValueLength：标签值长度，优先级：DSL 配置 > 字段属性配置。（`number | undefined`）

**方法**：

#### **tagChange**

+ **功能描述**：标签值变更处理，空数组转为 `null` 后触发变更和失焦。
+ **类型**：`(value: any) => void`
+ **参数**：
  - `value`：变更后的标签值数组。

#### **validator**

+ **功能描述**：异步验证标签数量及每个标签值的合法性（继承整数校验逻辑）。
+ **类型**：`() => Promise<ValidatorInfo>`
+ **返回值**：验证结果信息。

### 3、FormIntegerTagFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Form,
    ttype: ModelFieldType.Integer,
    widget: 'Tag'
  })
)
export class FormIntegerTagFieldWidget extends FormStringMultiTagFieldWidget
```

### 4、FormIntegerSliderFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Form,
    ttype: [ModelFieldType.Integer],
    widget: 'Slider'
  })
)
export class FormIntegerSliderFieldWidget extends FormIntegerFieldWidget
```

**属性**：

+ direction：滑动条方向，默认值为 `SliderDirection.HORIZONTAL`。（`string`）
+ hasTooltip：是否显示 tooltip，默认值为 `!!tooltipFormatter`（存在格式化函数时显示）。（`boolean`）
+ max：最大值，默认值为 `100`（DSL 配置为空时生效）。（`number`）
+ min：最小值，默认值为 `0`（DSL 配置为空时生效）。（`number`）
+ reverse：是否反向滑动，默认值为 `false`。（`boolean`）
+ step：滑动步长，默认值为 `1`（DSL 配置为空时生效）。（`number`）
+ tooltipFormatter：tooltip 格式化函数。（`string | undefined`）

## （七）浮点数（Float）

### 1、FormFloatFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search],
    ttype: [ModelFieldType.Float]
  })
)
export class FormFloatFieldWidget extends FormIntegerFieldWidget
```

**属性**：

+ maxSafeInteger：最大安全整数，默认值为 `Number.MAX_SAFE_INTEGER`。（`number`）
+ minSafeInteger：最小安全整数，默认值为 `Number.MIN_SAFE_INTEGER`。（`number`）
+ precision：小数精度（继承自父类，通过字段配置获取）。（`number | undefined`）

**方法**：

#### **change**

+ **功能描述**：值变更处理，标记变更状态后触发父类变更。
+ **类型**：`(value: any) => void`
+ **参数**：
  - `value`：变更后的值。

#### **submit**

+ **功能描述**：处理表单提交，自动格式化数值（补零 / 转换为字符串）。
+ **类型**：`(submitValue: SubmitValue) => any`
+ **参数**：
  - `submitValue`：待提交的值。
+ **返回值**：提交处理结果。

#### **validator**

+ **功能描述**：异步验证输入值，新增小数格式校验（禁止纯小数点开头、限制小数位数）。
+ **类型**：`() => Promise<ValidatorInfo>`
+ **返回值**：验证结果信息。

### 2、FormFloatPlatFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: [ViewType.Form, ViewType.Detail],
    widget: 'Plat'
  })
)
export class FormFloatPlatFieldWidget extends FormRangeFieldsWidget<number>
```

**属性**：

+ defaultDecimal：默认小数位数，值为 `6`。（`number`）
+ startFieldDecimal：起始字段小数位数，优先级：起始字段配置 > 默认值 `6`。（`number`）
+ endFieldDecimal：结束字段小数位数，优先级：结束字段配置 > 默认值 `6`。（`number`）

## （八）金额（Money）

### 1、FormMoneyFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search],
    ttype: ModelFieldType.Currency
  })
)
export class FormMoneyFieldWidget extends FormFloatFieldWidget
```

## （九）布尔（Boolean）

### 1、FormBooleanSwitchFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Form,
    ttype: ModelFieldType.Boolean
  })
)
export class FormBooleanSwitchFieldWidget extends FormFieldWidget
```

**方法**：

#### **validator**

+ **功能描述**：异步验证输入值，默认返回验证成功。
+ **类型**：`() => Promise<ValidatorInfo>`
+ **返回值**：始终为验证成功信息。

### 2、FormBooleanCheckboxFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search, ViewType.Detail],
    ttype: ModelFieldType.Boolean,
    widget: 'Checkbox'
  })
)
export class FormBooleanCheckboxFieldWidget extends FormFieldWidget
```

**方法**：

#### **validator**

+ **功能描述**：异步验证输入值，默认跳过验证。
+ **类型**：`() => Promise<ValidatorInfo>`
+ **返回值**：验证结果。

### 3、FormBooleanRadioFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search],
    ttype: ModelFieldType.Boolean,
    widget: 'Radio'
  })
)
export class FormBooleanRadioFieldWidget extends FormBooleanSelectFieldWidget
```

**属性**：

+ rowLimit：单选框每行显示数量。（`number | undefined`）

**方法**：

#### **change**

+ **功能描述**：值变更处理，调用父类变更方法。
+ **类型**：`(val: EnumerationValue | EnumerationValue[] | null | undefined) => void`
+ **参数**：
  - `val`：变更后的值。

### 4、FormBooleanSelectFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search],
    ttype: [ModelFieldType.Boolean],
    widget: 'Select'
  })
)
export class FormBooleanSelectFieldWidget extends FormEnumFieldWidget<EnumerationValue | EnumerationValue[]>
```

**属性**：

+ value：当前值，自动转换为字符串类型（`'true'`/`'false'`）。（`string | null | undefined`）

**方法**：

#### **change**

+ **功能描述**：值变更处理，自动将值转换为布尔类型。
+ **类型**：`(val: EnumerationValue | EnumerationValue[] | null | undefined) => void`
+ **参数**：
  - `val`：变更后的值。

#### **getAvailableOptions**

+ **功能描述**：获取可用选项，无配置时默认返回 `是`（`true`）和 `否`（`false`）。
+ **类型**：`() => RuntimeEnumerationOption[]`
+ **返回值**：选项数组。

#### **getMetaOptionNames**

+ **功能描述**：获取元数据选项名称，默认返回 `['true', 'false']`。
+ **类型**：`() => string[]`
+ **返回值**：选项名称数组。

#### **submit**

+ **功能描述**：处理表单提交，使用布尔值专用提交处理器。
+ **类型**：`(submitValue: SubmitValue) => any`
+ **参数**：
  - `submitValue`：待提交的值。
+ **返回值**：提交处理结果。

## （十）数据字典（Enum）

### 1、FormEnumFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search],
    ttype: ModelFieldType.Enum
  })
)
export class FormEnumFieldWidget<
  Value extends EnumerationValue | EnumerationValue[] = EnumerationValue
> extends FormEnumFieldAbstractWidget<Value>
```

### 2、FormEnumRadioWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search],
    ttype: ModelFieldType.Enum,
    widget: 'Radio'
  })
)
export class FormEnumRadioWidget extends FormEnumFieldAbstractWidget<EnumerationValue>
```

**属性**：

+ allowClear：是否允许清除选中状态，默认值为 `false`。（`boolean`）
+ autocorrection：是否自动修正输入，默认值为 `false`。（`boolean`）
+ rowLimit：每行显示的单选按钮数量。（`number | undefined`）

### 3、FormEnumMultiSelectFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search],
    ttype: ModelFieldType.Enum,
    multi: true
  })
)
export class FormEnumMultiSelectFieldWidget extends FormEnumFieldAbstractWidget<EnumerationValue[]>
```

### 4、FormEnumMultiCheckboxFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search],
    ttype: ModelFieldType.Enum,
    widget: 'Checkbox',
    multi: true
  })
)
export class FormEnumMultiCheckboxFieldWidget extends FormEnumFieldAbstractWidget
```

**属性**：

+ validateTrigger：验证触发时机，默认值为 `[ValidateTrigger.CHANGE]`。（`ValidateTrigger[]`）

## （十一）时间日期（Datetime）

### 1、FormDateTimeFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Search, ViewType.Form],
    ttype: ModelFieldType.DateTime
  })
)
export class FormDateTimeFieldWidget extends FormFieldWidget<string>
```

**属性**：

+ allowClear：是否允许清除，默认值为 `true`。（`boolean`）
+ dateFormat：日期格式化规则，优先级：DSL 表达式 > 资源配置 > 默认值（`YYYY-MM-DD`）。（`string | undefined`）
+ dateTimeFormat：完整日期时间格式（日期格式和时间格式的组合）。（`string | undefined`）
+ endDate：结束日期（原始值），支持表达式。（`any`）
+ endDateOffset：结束日期偏移量，默认值为 `0`。（`number`）
+ endDateOffsetUnit：结束日期偏移单位。（`string | undefined`）
+ format：XML 配置的格式化规则（优先级最高）。（`string | undefined`）
+ open：日期选择面板是否打开。（`boolean`）
+ quickOptions：快速选择选项，支持逗号分隔字符串转为数组。（`DateQuickOption[]`）
+ realEndDate：处理后的结束日期（含偏移量）。（`string | undefined`）
+ realStartDate：处理后的起始日期（含偏移量）。（`string | undefined`）
+ resourceDateTimeFormat：资源日期时间格式配置。（`IResourceDateTimeFormat`）
+ showTimeDefaultValue：时间默认值（`00:00:00`）。（`Moment`）
+ startDate：起始日期（原始值），支持表达式。（`any`）
+ startDateOffset：起始日期偏移量，默认值为 `0`。（`number`）
+ startDateOffsetUnit：起始日期偏移单位。（`string | undefined`）
+ timeFormat：时间格式化规则，优先级：DSL 表达式 > 资源配置 > 默认值（`HH:mm:ss`）。（`string | undefined`）
+ valueFormat：字段值格式化规则。（`string | undefined`）

**方法**：

#### **changeOpenValue**

+ **功能描述**：更新日期选择面板的打开状态。
+ **类型**：`(open: boolean) => void`
+ **参数**：
  - `open`：面板打开状态。

#### **closePanelChange**

+ **功能描述**：关闭日期选择面板时触发，处理值变更和失焦逻辑。
+ **类型**：`() => Promise<void>`

#### **correctingStartShowTimeDefaultValue**

+ **功能描述**：校正起始时间默认值，确保不早于处理后的起始日期。
+ **类型**：`(e: string | Date) => string | Date`
+ **参数**：
  - `e`：原始时间值。

#### **disabledDate**

+ **功能描述**：禁用日期校验，根据起止日期（含偏移量）限制可选范围。
+ **类型**：`(current: Moment) => boolean`
+ **参数**：
  - `current`：当前日期。

#### **disabledTime**

+ **功能描述**：禁用时间校验，根据起止日期（含偏移量）限制可选时间范围。
+ **类型**：`(e: Moment) => Object`
+ **参数**：
  - `e`：当前时间。

#### **openPanelChange**

+ **功能描述**：打开日期选择面板时触发，设置初始值。
+ **类型**：`() => void`

#### **quickChange**

+ **功能描述**：快速选项切换处理，更新选中值。
+ **类型**：`(quickOption: DateQuickOption) => void`
+ **参数**：
  - `quickOption`：快速选项值。

#### **quickOptionsCompareDisable**

+ **功能描述**：判断快速选项是否禁用（超出起止日期范围）。
+ **类型**：`(quickOption: DateQuickOption) => boolean`
+ **参数**：
  - `quickOption`：快速选项值。

#### **validator**

+ **功能描述**：异步验证输入值，校验日期是否在起止范围内。
+ **类型**：`() => Promise<ValidatorInfo>`
+ **返回值**：验证结果信息。

### 2、FormDateTimeRangeFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Form,
    widget: 'DateTimeRangePicker'
  })
)
export class FormDateTimeRangeFieldWidget extends FormRangeFieldsWidget<StandardString>
```

**属性**：

+ allowClear：是否允许清除，默认值为 `true`。（`boolean`）
+ dateFormat：日期格式化规则，优先级：DSL 表达式 > 资源配置 > 默认值（`YYYY-MM-DD`）。（`string | undefined`）
+ defaultValidateTrigger：验证触发时机，固定为 `[ValidateTrigger.CHANGE]`。（`ValidateTrigger[]`）
+ endPlaceholder：结束日期占位符。（`string | undefined`）
+ format：XML 配置的格式化规则（优先级最高）。（`string | undefined`）
+ resourceDateTimeFormat：资源日期时间格式配置。（`IResourceDateTimeFormat`）
+ showTimeDefaultValue：时间默认值（`[00:00:00, 00:00:00]`）。（`Moment[]`）
+ startPlaceholder：起始日期占位符。（`string | undefined`）
+ timeFormat：时间格式化规则，优先级：DSL 表达式 > 资源配置 > 默认值（`HH:mm:ss`）。（`string | undefined`）

**方法**：

#### **change**

+ **功能描述**：值变更处理，触发父类变更逻辑并处理面板关闭。
+ **类型**：`(val: StandardString[] | null | undefined) => void`
+ **参数**：
  - `val`：变更后的日期范围值。

#### **closePanelChange**

+ **功能描述**：关闭日期选择面板时触发，处理值变更和失焦逻辑。
+ **类型**：`() => Promise<void>`

#### **generatorConstructMirrorSubmitData**

+ **功能描述**：生成提交数据镜像，映射起始 / 结束字段值。
+ **类型**：`() => ActiveRecord`
+ **返回值**：包含起始和结束字段值的对象。

#### **getInitializeComponent**

+ **功能描述**：获取初始化组件。
+ **类型**：`() => WidgetComponent`
+ **返回值**：日期时间范围选择器组件 `DefaultDateTimeRangePicker`。

#### **openPanelChange**

+ **功能描述**：打开日期选择面板时触发，设置初始值。
+ **类型**：`() => void`

## （十二）日期（Date）

### 1、FormDateFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Search, ViewType.Form],
    ttype: ModelFieldType.Date
  })
)
export class FormDateFieldWidget extends FormDateTimeFieldWidget
```

**方法**：

#### **change**

+ **功能描述**：值变更处理，调用父类变更方法并触发失焦。
+ **类型**：`(v: string | null | undefined) => void`
+ **参数**：
  - `v`：变更后的值。

#### **defaultConstructDataTrigger**

+ **功能描述**：返回数据构造触发条件。
+ **类型**：`() => WidgetTrigger[]`
+ **返回值**：触发条件数组。

#### **defaultClearFieldsTrigger**

+ **功能描述**：返回字段清除触发条件。
+ **类型**：`() => WidgetTrigger[]`
+ **返回值**：触发条件数组。

#### **getInitializeComponent**

+ **功能描述**：获取初始化组件。
+ **类型**：`() => WidgetComponent`
+ **返回值**：日期选择器组件 `DefaultDatePicker`。

### 2、FormDateRangeFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Form,
    widget: 'DateRangePicker'
  })
)
export class FormDateRangeFieldWidget extends FormDateTimeRangeFieldWidget
```

**方法**：

#### **getInitializeComponent**

+ **功能描述**：获取初始化组件。
+ **类型**：`() => WidgetComponent`
+ **返回值**：日期范围选择器组件， 默认值为 `DefaultDateRangePicker`。

## （十三）时间（Time）

### 1、FormTimeFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Search, ViewType.Form],
    ttype: ModelFieldType.Time
  })
)
export class FormTimeFieldWidget extends FormDateTimeFieldWidget
```

**方法**：

#### **getInitializeComponent**

+ **功能描述**：获取初始化组件。
+ **类型**：`() => WidgetComponent`
+ **返回值**：时间选择器组件， 默认值为 `DefaultTimePicker`。

### 2、FormTimeRangeFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Form,
    widget: 'TimeRangePicker'
  })
)
export class FormTimeRangeFieldWidget extends FormDateTimeRangeFieldWidget
```

**方法**：

#### **getInitializeComponent**

+ **功能描述**：获取初始化组件。
+ **类型**：`() => WidgetComponent`
+ **返回值**：时间范围选择器组件， 默认值为 `DefaultTimeRangePicker`。

## （十四）年份（Year）

### 1、FormYearFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Search, ViewType.Form],
    ttype: ModelFieldType.Year
  })
)
export class FormYearFieldWidget extends FormDateTimeFieldWidget
```

**方法**：

#### **change**

+ **功能描述**：值变更处理，调用父类变更方法并触发失焦。
+ **类型**：`(v: string | null | undefined) => void`
+ **参数**：
  - `v`：变更后的值。

#### **defaultConstructDataTrigger**

+ **功能描述**：返回数据构造触发条件。
+ **类型**：`() => WidgetTrigger[]`
+ **返回值**：触发条件数组。

#### **defaultClearFieldsTrigger**

+ **功能描述**：返回字段清除触发条件。
+ **类型**：`() => WidgetTrigger[]`
+ **返回值**：触发条件数组。

#### **getInitializeComponent**

+ **功能描述**：获取初始化组件。
+ **类型**：`() => WidgetComponent`
+ **返回值**：年份选择器组件， 默认值为 `DefaultYearPicker`。

### 2、FormYearRangeFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Form,
    widget: 'YearRangePicker'
  })
)
export class FormYearRangeFieldWidget extends FormDateTimeRangeFieldWidget
```

**方法**：

#### **getInitializeComponent**

+ **功能描述**：获取初始化组件。
+ **类型**：`() => WidgetComponent`
+ **返回值**：年份范围选择器组件， 默认值为 `DefaultYearRangePicker`。

## （十五）键值对（Map）

### 1、FormMapFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Form,
    ttype: ModelFieldType.Map
  })
)
export class FormMapFieldWidget extends FormFieldWidget<Record<string, string>>
```

**属性**：

+ items：地图项数组，默认值为 `[]`。（`MapItem[]`）
+ limit：条目数量限制（DSL 配置转换为数字）。（`number | undefined`）
+ mountedCallChaining：挂载时的链式调用钩子（注入属性）。（`CallChaining | undefined`）

**方法**：

#### **addRecord**

+ **功能描述**：添加空地图项。
+ **类型**：`() => void`

#### **generatorValue**

+ **功能描述**：生成当前地图项对应的键值对对象，忽略空项。
+ **类型**：`() => Record<string, string> | null | undefined`
+ **返回值**：键值对对象或 `null`（无有效项时）。

#### **onHandleChange**

+ **功能描述**：地图项变更时触发，更新字段值。
+ **类型**：`() => void`

#### **removeRecord**

+ **功能描述**：删除指定索引的地图项，并触发值变更和失焦。
+ **类型**：`(index: number) => void`
+ **参数**：
  - `index`：要删除的地图项索引。

#### **submit**

+ **功能描述**：提交字段值，使用默认提交处理器。
+ **类型**：`(submitValue: SubmitValue) => Promise<any>`
+ **参数**：
  - `submitValue`：提交值对象。
+ **返回值**：提交处理结果。

#### **validator**

+ **功能描述**：异步验证字段值，校验必填项和键唯一性。
+ **类型**：`() => Promise<ValidatorInfo>`
+ **返回值**：验证结果信息。

#### **mountedProcess**

+ **功能描述**：挂载时处理逻辑，将初始值转换为地图项数组。
+ **类型**：`() => ReturnPromise<void>`

## （十六）多对一（M2O）

### 1、FormM2OSelectFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Form,
    ttype: ModelFieldType.ManyToOne
  })
)
export class FormM2OSelectFieldWidget extends FormSelectComplexFieldWidget<ActiveRecord, RuntimeM2OField>
```

**属性**：

+ computeQueryOneKey：查询关联记录的键名。（`string | undefined`）
+ currentValueLabel：当前选中值的标签文本。（`string`）

**方法**：

#### **change**

+ **功能描述**：值变更处理，支持空值、空对象等特殊情况。
+ **类型**：`(value: any) => void`
+ **参数**：
  - `value`：变更后的值。

#### **computeQueryOneDefaultKey**

+ **功能描述**：获取默认查询键名，默认为 `id`。
+ **类型**：`() => string`

#### **fillOptions**

+ **功能描述**：填充选项数据（单值模式）。
+ **类型**：`(dataList: Record<string, unknown>[], insetDefaultValue?: boolean) => Promise<void>`
+ **参数**：
  - `dataList`：选项数据列表。
  - `insetDefaultValue`：是否插入默认值。

#### **handleSelectedValueLabel**

+ **功能描述**：处理选中值的标签文本。
+ **类型**：`(val: any) => Promise<void>`
+ **参数**：
  - `val`：选中的值。

#### **m2oChange**

+ **功能描述**：ManyToOne 关系变更，调用父类变更方法。
+ **类型**：`(value: Record<string, unknown>) => void`
+ **参数**：
  - `value`：变更后的值。

#### **mounted**

+ **功能描述**：组件挂载后处理，监听值变化。
+ **类型**：`() => Promise<void>`

#### **submit**

+ **功能描述**：提交 ManyToOne 关系字段数据。
+ **类型**：`(submitValue: SubmitValue) => Promise<any>`
+ **参数**：
  - `submitValue`：提交的值。

#### **updateM2oValue**

+ **功能描述**：更新 ManyToOne 关系值，支持表达式计算。
+ **类型**：`() => Promise<void>`

#### **watchM2OValue**

+ **功能描述**：监听表单数据变化，延迟更新 ManyToOne 值。
+ **类型**：`() => Promise<void>`

### 2、FormM2ORadioFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search],
    ttype: ModelFieldType.ManyToOne,
    widget: 'Radio'
  })
)
export class FormM2ORadioFieldWidget extends FormRelationFieldRadioWidget<RuntimeM2OField>
```

**属性**：

+ selectedValues：当前选中值的 ID 数组。（`string[] | undefined`）

**方法**：

#### **submit**

+ **功能描述**：提交多对一关系字段数据。
+ **类型**：`(submitValue: SubmitValue) => Promise<any>`
+ **参数**：
  - `submitValue`：提交的值。

### 3、FormM2OTreeSelectFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Form,
    ttype: ModelFieldType.ManyToOne,
    widget: 'TreeSelect'
  })
)
export class FormM2OTreeSelectFieldWidget extends FormTreeSelectFieldWidget<ActiveRecord, RuntimeM2OField>
```

**方法**：

#### **submit**

+ **功能描述**：提交 ManyToOne 关系字段数据。
+ **类型**：`(submitValue: SubmitValue) => Promise<any>`
+ **参数**：
  - `submitValue`：提交的值。

### 4、FormM2OCascaderFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Form,
    ttype: ModelFieldType.ManyToOne,
    widget: 'Cascader'
  })
)
export class FormM2OCascaderFieldWidget extends FormCascaderFieldWidget<ActiveRecord, RuntimeM2OField>
```

**方法**：

#### **submit**

+ **功能描述**：提交 ManyToOne 关系字段数据。
+ **类型**：`(submitValue: SubmitValue) => Promise<any>`
+ **参数**：
  - `submitValue`：提交的值。

### 5、FormM2OUploadFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Detail, ViewType.Gallery, ViewType.Table],
    ttype: ModelFieldType.ManyToOne,
    widget: ['Upload']
  })
)
export class FormM2OUploadFieldWidget extends AbstractFormM2OUploadFieldWidget
```

**方法**：

#### **change**

+ **功能描述**：值变更处理，支持数组转单值。
+ **类型**：`(value: any) => void`
+ **参数**：
  - `value`：变更后的值。

#### **getImportFile**

+ **功能描述**：处理导入文件，更新值为第一个文件或 `null`。
+ **类型**：`(data: any[]) => void`
+ **参数**：
  - `data`：文件数据数组。

#### **remove**

+ **功能描述**：移除文件，更新值为 `null`。
+ **类型**：`(file: any) => void`
+ **参数**：
  - `file`：要移除的文件。

### 6、FormM2OUploadImgFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Detail],
    ttype: ModelFieldType.ManyToOne,
    widget: ['UploadImg']
  })
)
export class FormM2OUploadImgFieldWidget extends AbstractFormM2OUploadFieldWidget
```

**属性**：

+ showPreviewTitle：是否显示预览标题，优先级：DSL 配置（布尔值 / 字符串布尔值）> 默认值 `true`。（`boolean`）

**方法**：

#### **change**

+ **功能描述**：值变更处理，支持数组转单值，触发失焦。
+ **类型**：`(v: any) => void`
+ **参数**：
  - `v`：变更后的值。

#### **getImportFile**

+ **功能描述**：处理导入图片文件，更新值为第一个文件或 `null`。
+ **类型**：`(data: any[]) => void`
+ **参数**：
  - `data`：图片数据数组。

#### **remove**

+ **功能描述**：移除图片文件，更新值为 `null`，触发失焦。
+ **类型**：`(file: any) => void`
+ **参数**：
  - `file`：要移除的图片文件。

### 7、FormM2OUploadDraggableFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Detail, ViewType.Gallery],
    ttype: ModelFieldType.ManyToOne,
    widget: 'UploadDraggable'
  })
)
export class FormM2OUploadDraggableFieldWidget extends FormM2OUploadFieldWidget
```

**属性**：

+ draggableIcon：拖拽上传图标，默认值为 `oinone-shangchuan1`。（`string`）
+ draggableTipText：拖拽上传提示词，默认值为 `点击 或 拖拽文件到这里上传`。（`string`）
+ draggableExtendsionsText：允许上传的文件类型提示文本，默认值为 `支持拓展名: {extensions}`。（`string`）
+ showDraggableExtendsionsText：是否展示支持拓展名，默认值为 `true`。（`boolean`）

### 8、FormM2OCompanyFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search],
    ttype: ModelFieldType.ManyToOne,
    widget: 'Company'
  })
)
export class FormM2OCompanyFieldWidget extends FormM2OTreeSelectFieldWidget
```

**方法**：

#### **generatorDefaultTreeDefinition**

+ **功能描述**：生成默认的公司树定义。
+ **类型**：`(props: any) => any`
+ **参数**：
  - `props`：组件属性。

### 9、FormM2ODepartmentFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search],
    ttype: ModelFieldType.ManyToOne,
    widget: 'Department'
  })
)
export class FormM2ODepartmentFieldWidget extends FormM2OTreeSelectFieldWidget
```

**方法**：

#### **generatorDefaultTreeDefinition**

+ **功能描述**：生成默认的部门树定义。
+ **类型**：`(props: any) => any`
+ **参数**：
  - `props`：组件属性。

### 10、FormM2OEmployeeFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search],
    ttype: ModelFieldType.ManyToOne,
    widget: 'Employee'
  })
)
export class FormM2OEmployeeFieldWidget extends FormM2OTreeSelectFieldWidget
```

**方法**：

#### **generatorDefaultTreeDefinition**

+ **功能描述**：生成默认的员工树定义。
+ **类型**：`(props: any) => any`
+ **参数**：
  - `props`：组件属性。

### 11、FormM2OAddressFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Form,
    ttype: ModelFieldType.ManyToOne,
    widget: 'Address'
  })
)
export class FormM2OAddressFieldWidget extends FormM2OCascaderFieldWidget
```

**属性**：

+ changeOnSelect：选择节点时是否立即触发变更，默认值为 `true`（DSL 配置转换为布尔值）。（`boolean`）

**方法**：

#### **fetchBackfillData**

+ **功能描述**：反向查询回填数据，根据当前值和元数据生成回填树节点。
+ **类型**：`(currentValues: ActiveRecord[], metadataList: TreeNodeMetadata[]) => Promise<TreeNodeResponseBody[] | undefined>`
+ **参数**：
  - `currentValues`：当前值列表。
  - `metadataList`：元数据列表。
+ **返回值**：回填树节点响应体数组，或 `undefined`（无匹配数据时）。

#### **generatorCompareRecords**

+ **功能描述**：生成用于比较的记录，提取当前值中的关联字段。
+ **类型**：`(currentValues: ActiveRecord[], metadataList: TreeNodeMetadata[]) => ActiveRecord[] | undefined>`
+ **参数**：
  - `currentValues`：当前值列表。
  - `metadataList`：元数据列表。
+ **返回值**：比较记录数组，或 `undefined`（无有效记录时）。

#### **generatorDefaultTreeDefinition**

+ **功能描述**：生成默认的地址树定义。
+ **类型**：`(props: any) => any`
+ **参数**：
  - `props`：组件属性。
+ **返回值**：地址树定义对象。

#### **getSubmitField**

+ **功能描述**：获取提交字段映射配置，从节点元数据中解析。
+ **类型**：`(metadata: TreeNodeMetadata) => Record<string, string> | undefined`
+ **参数**：
  - `metadata`：节点元数据。
+ **返回值**：提交字段映射对象，或 `undefined`（无有效配置时）。

#### **submit**

+ **功能描述**：提交字段数据，使用默认提交处理器。
+ **类型**：`(submitValue: SubmitValue) => Promise<any>`
+ **参数**：
  - `submitValue`：提交的值。
+ **返回值**：提交处理结果。

#### **$onSelectedChange**

+ **功能描述**：选中节点变更时触发，递归处理选中节点及其父节点的值。
+ **类型**：`(selectedNodes: OioTreeNode<TreeData>[] | null | undefined) => void`
+ **参数**：
  - `selectedNodes`：选中的节点列表。

### 12、FormM2OFormFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Detail],
    ttype: [ModelFieldType.ManyToOne],
    widget: ['form', FORM_WIDGET]
  })
)
export class FormM2OFormFieldWidget extends FormSubviewObjectFieldWidget<RuntimeM2OField>
```

## （十七）一对多（O2M）

### 1、FormO2MSelectFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search],
    ttype: ModelFieldType.OneToMany
  })
)
export class FormO2MSelectFieldWidget extends FormSelectComplexFieldWidget
```

**属性**：

+ selectedValues：当前选中值数组（继承自父类）。（`any[]`）

**方法**：

#### **change**

+ **功能描述**：值变更处理，过滤无效选项并更新父类值。
+ **类型**：`(value: { value: string }[]) => void`
+ **参数**：
  - `value`：变更后的选项值数组（含`value`属性）。

#### **fetchData**

+ **功能描述**：获取关联数据（逻辑未完全实现，包含注释掉的查询逻辑）。
+ **类型**：`() => Promise<void>`

#### **fillOptions**

+ **功能描述**：填充多选项数据，调用父类批量填充逻辑。
+ **类型**：`(dataList: Record<string, unknown>[], insetDefaultValue?: boolean) => Promise<void>`
+ **参数**：
  - `dataList`：选项数据列表。
  - `insetDefaultValue`：是否插入默认值（默认值为 `true`）。

#### **loadOriginValue**

+ **功能描述**：组件挂载后加载原始值（继承自父类）。
+ **类型**：`() => Promise<void>`

### 2、FormO2MCheckboxFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Form,
    ttype: ModelFieldType.OneToMany,
    widget: 'Checkbox'
  })
)
export class FormO2MCheckboxFieldWidget extends FormRelationFieldCheckboxWidget<RuntimeO2MField>
```

**方法**：

#### **submit**

+ **功能描述**：提交一对多关系字段数据。
+ **类型**：`(submitValue: SubmitValue) => Promise<any>`
+ **参数**：
  - `submitValue`：提交的值。
+ **返回值**：提交处理结果。

### 3、FormO2MCascaderFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Form,
    ttype: ModelFieldType.OneToMany,
    widget: 'Cascader'
  })
)
export class FormO2MCascaderFieldWidget extends FormCascaderFieldWidget<ActiveRecord[], RuntimeO2MField>
```

**属性**：

+ selectMode：选择模式，固定为多选模式。（`SelectMode`）

**方法**：

#### **submit**

+ **功能描述**：提交一对多关系字段数据。
+ **类型**：`(submitValue: SubmitValue) => Promise<any>`
+ **参数**：
  - `submitValue`：提交的值。
+ **返回值**：提交处理结果。

### 4、FormO2MTreeSelectFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Form,
    ttype: ModelFieldType.OneToMany,
    widget: 'TreeSelect'
  })
)
export class FormO2MTreeSelectFieldWidget extends FormTreeSelectFieldWidget<ActiveRecord[], RuntimeO2MField>
```

**属性**：

+ selectMode：选择模式，固定为多选模式。（`SelectMode`）

**方法**：

#### **submit**

+ **功能描述**：提交一对多关系字段数据。
+ **类型**：`(submitValue: SubmitValue) => Promise<any>`
+ **参数**：
  - `submitValue`：提交的值。
+ **返回值**：提交处理结果。

### 5、FormO2MUploadFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Detail, ViewType.Gallery],
    ttype: ModelFieldType.OneToMany,
    widget: 'Upload'
  })
)
export class FormO2MUploadFieldWidget extends FormO2MFieldUploadBaseWidget
```

**属性**：

+ cdnKey：CDN 密钥。（`string | undefined`）
+ privateLink：是否为私有链接，将 DSL 配置转换为布尔值。（`boolean`）

### 6、FormO2MUploadImgFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Detail],
    ttype: ModelFieldType.OneToMany,
    widget: ['UploadImg']
  })
)
export class FormO2MUploadImgFieldWidget extends FormO2MFieldUploadBaseWidget
```

### 7、FormO2MUploadDraggableFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Detail, ViewType.Gallery],
    ttype: ModelFieldType.OneToMany,
    widget: 'UploadDraggable'
  })
)
export class FormO2MUploadDraggableFieldWidget extends FormO2MUploadFieldWidget
```

**属性**：

+ draggableIcon：拖拽上传图标，默认值为 `oinone-shangchuan1`。（`string`）
+ draggableTipText：拖拽上传提示词，默认值为 `点击 或 拖拽文件到这里上传`。（`string`）
+ draggableExtendsionsText：允许上传的文件类型提示文本，格式为 `支持拓展名: {extensions}`。（`string`）
+ showDraggableExtendsionsText：是否展示支持拓展名，默认值为 `true`。（`boolean`）

### 8、FormO2MTableFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Form,
    ttype: ModelFieldType.OneToMany,
    widget: TABLE_WIDGET
  })
)
export class FormO2MTableFieldWidget extends FormSubviewListFieldWidget<RuntimeO2MField>
```

**方法**：

#### **initSubviewData**

+ **功能描述**：初始化子视图数据，生成一对多关系查询条件。
+ **类型**：`() => ReturnPromise<void>`

#### **refreshValueProcess**

+ **功能描述**：刷新值处理，当作为数据源提供者时重新加载缓存。
+ **类型**：`() => Promise<void>`

#### **submit**

+ **功能描述**：提交一对多关系字段数据。
+ **类型**：`(submitValue: SubmitValue) => Promise<any>`
+ **参数**：
  - `submitValue`：提交的值。
+ **返回值**：提交处理结果。

## （十八）多对多（M2M）

### 1、FormM2MFieldSelectWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search],
    ttype: ModelFieldType.ManyToMany
  })
)
export class FormM2MFieldSelectWidget extends FormSelectComplexFieldWidget<ActiveRecord[], RuntimeM2MField>
```

**方法**：

#### **change**

+ **功能描述**：值变更处理，过滤无效选项并更新父类值。
+ **类型**：`(value: any[]) => void`
+ **参数**：
  - `value`：变更后的值数组。

#### **fillOptions**

+ **功能描述**：填充多选项数据，调用父类批量填充逻辑。
+ **类型**：`(dataList: Record<string, unknown>[], insetDefaultValue?: boolean) => Promise<void>`
+ **参数**：
  - `dataList`：选项数据列表。
  - `insetDefaultValue`：是否插入默认值（默认值为 `true`）。

#### **submit**

+ **功能描述**：提交多对多关系字段数据。
+ **类型**：`(submitValue: SubmitValue) => Promise<any>`
+ **参数**：
  - `submitValue`：提交的值。
+ **返回值**：提交处理结果。

### 2、FormM2MCheckboxFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Form,
    ttype: ModelFieldType.ManyToMany,
    widget: 'Checkbox'
  })
)
export class FormM2MCheckboxFieldWidget extends FormRelationFieldCheckboxWidget<RuntimeM2MField>
```

**方法**：

#### **submit**

+ **功能描述**：提交多对多关系字段数据。
+ **类型**：`(submitValue: SubmitValue) => Promise<any>`
+ **参数**：
  - `submitValue`：提交的值。
+ **返回值**：提交处理结果。

### 3、FormM2MTreeSelectFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Form,
    ttype: ModelFieldType.ManyToMany,
    widget: 'TreeSelect'
  })
)
export class FormM2MTreeSelectFieldWidget extends FormTreeSelectFieldWidget<ActiveRecord[], RuntimeM2MField>
```

**属性**：

+ selectMode：选择模式，默认值为多选模式。（`SelectMode`）

**方法**：

#### **submit**

+ **功能描述**：提交多对多关系字段数据。
+ **类型**：`(submitValue: SubmitValue) => Promise<any>`
+ **参数**：
  - `submitValue`：提交的值。
+ **返回值**：提交处理结果。

### 4、FormM2MCascaderFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Form,
    ttype: ModelFieldType.ManyToMany,
    widget: 'Cascader'
  })
)
export class FormM2MCascaderFieldWidget extends FormCascaderFieldWidget<ActiveRecord[], RuntimeM2MField>
```

**属性**：

+ selectMode：选择模式，默认值为多选模式。（`SelectMode`）

**方法**：

#### **submit**

+ **功能描述**：提交多对多关系字段数据。
+ **类型**：`(submitValue: SubmitValue) => Promise<any>`
+ **参数**：
  - `submitValue`：提交的值。
+ **返回值**：提交处理结果。

### 5、FormM2MUploadFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Detail, ViewType.Gallery, ViewType.Table],
    ttype: ModelFieldType.ManyToMany,
    widget: ['Upload']
  })
)
export class FormM2MUploadFieldWidget extends FormM2MFieldUploadBaseWidget
```

**属性**：

+ cdnKey：CDN 密钥。（`string | undefined`）
+ privateLink：是否为私有链接。（`boolean`）

### 6、FormM2MUploadImgFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Detail],
    ttype: ModelFieldType.ManyToMany,
    widget: ['UploadImg']
  })
)
export class FormM2MUploadImgFieldWidget extends FormM2MFieldUploadBaseWidget
```

### 7、FormM2MUploadDraggableFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Detail, ViewType.Gallery],
    ttype: ModelFieldType.ManyToMany,
    widget: 'UploadDraggable'
  })
)
export class FormM2MUploadDraggableFieldWidget extends FormM2MUploadFieldWidget
```

**属性**：

+ draggableIcon：拖拽上传图标，默认值为 `oinone-shangchuan1`。（`string`）
+ draggableTipText：拖拽上传提示词，默认值为 `点击 或 拖拽文件到这里上传`。（`string`）
+ draggableExtendsionsText：允许上传的文件类型提示文本，默认值为 `支持拓展名: {extensions}`。（`string`）
+ showDraggableExtendsionsText：是否展示支持拓展名，默认值为 `true`。（`boolean`）

### 8、FormM2MTreeFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Form,
    ttype: ModelFieldType.ManyToMany,
    widget: 'Tree'
  })
)
export class FormM2MTreeFieldWidget extends FormTreeFieldWidget<ActiveRecord[], RuntimeM2MField>
```

**属性**：

+ selectMode：选择模式，默认值为多选模式。（`SelectMode`）

**方法**：

#### **submit**

+ **功能描述**：提交多对多关系字段数据。
+ **类型**：`(submitValue: SubmitValue) => Promise<any>`
+ **参数**：
  - `submitValue`：提交的值。
+ **返回值**：提交处理结果。

### 9、FormM2MCompanyFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search],
    ttype: ModelFieldType.ManyToMany,
    widget: 'Company'
  })
)
export class FormM2MCompanyFieldWidget extends FormM2MTreeSelectFieldWidget
```

**方法**：

#### **generatorDefaultTreeDefinition**

+ **功能描述**：生成默认的公司树结构定义。
+ **类型**：`(props: any) => any`
+ **参数**：
  - `props`：组件属性。

### 10、FormM2MDepartmentFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search],
    ttype: ModelFieldType.ManyToMany,
    widget: 'Department'
  })
)
export class FormM2MDepartmentFieldWidget extends FormM2MTreeSelectFieldWidget
```

**方法**：

#### **generatorDefaultTreeDefinition**

+ **功能描述**：生成默认的部门树结构定义。
+ **类型**：`(props: any) => any`
+ **参数**：
  - `props`：组件属性。

### 11、FormM2MEmployeeFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search],
    ttype: ModelFieldType.ManyToMany,
    widget: 'Employee'
  })
)
export class FormM2MEmployeeFieldWidget extends FormM2MTreeSelectFieldWidget
```

**方法**：

#### **generatorDefaultTreeDefinition**

+ **功能描述**：生成默认的员工树结构定义。
+ **类型**：`(props: any) => any`
+ **参数**：
  - `props`：组件属性。

### 12、FormM2MTableFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Form,
    ttype: ModelFieldType.ManyToMany,
    widget: TABLE_WIDGET
  })
)
export class FormM2MTableFieldWidget extends FormSubviewListFieldWidget<RuntimeM2MField>
```

**方法**：

#### **initSubviewData**

+ **功能描述**：初始化子视图数据，生成多对多关系查询条件。
+ **类型**：`() => ReturnPromise<void>`

#### **refreshValueProcess**

+ **功能描述**：刷新值处理，当作为数据源提供者时重新加载缓存。
+ **类型**：`() => Promise<void>`

#### **submit**

+ **功能描述**：提交多对多关系字段数据。
+ **类型**：`(submitValue: SubmitValue) => Promise<any>`
+ **参数**：
  - `submitValue`：提交的值。
+ **返回值**：提交处理结果。

## （十九）抽象基类

### 1、FormInputAbstractFieldWidget

**继承**：FormFieldWidget

**属性**：

+ inputRealValue：输入的实际值。（`unknown`）
+ independentlyEditable：是否可独立编辑。（`boolean`）
+ mode：输入模式，默认为动态模式。（`InputMediaMode`）
+ prefix：前缀具体内容。（`string`）
+ prefixStore：前缀是否存储。（`boolean`）
+ prefixType：前缀类型。（`InputPreSuffixType`）
+ prefixes：前缀列表。（`string[] | undefined`）
+ prefixesValue：当前选中的前缀值。（`unknown`）
+ showPrefix：是否显示前缀。（`boolean`）
+ showSuffix：是否显示后缀。（`boolean`）
+ suffix：后缀具体内容。（`string`）
+ suffixStore：后缀是否存储。（`boolean`）
+ suffixType：后缀类型。（`InputPreSuffixType`）
+ type：输入类型。（`unknown`）

**方法**：

#### **addPrefixSuffix**

+ **功能描述**：添加前缀和后缀到输入值。
+ **类型**：`(e: string) => string`
+ **参数**：
  - `e`：输入值。
+ **返回值**：添加前缀和后缀后的处理值。

#### **changeInputRealValue**

+ **功能描述**：更改输入的实际值并触发变更事件。
+ **类型**：`(val: unknown) => void`
+ **参数**：
  - `val`：新的实际值。

#### **changePrefixesValue**

+ **功能描述**：更改前缀值并触发变更事件。
+ **类型**：`(val: unknown) => void`
+ **参数**：
  - `val`：新的前缀值。

#### **removePrefixSuffix**

+ **功能描述**：从输入值中移除前缀和后缀。
+ **类型**：`(e: string) => string`
+ **参数**：
  - `e`：输入值。
+ **返回值**：移除前缀和后缀后的处理值。

### 2、FormNumberAbstractFieldWidget

**类型声明**：

```typescript
export class FormNumberAbstractFieldWidget<
  Value extends NumberValue | NumberValue[] = NumberValue | NumberValue[]
> extends FormInputAbstractFieldWidget<Value, RuntimeNumberField>
```

**属性**：

+ hiddenStepHandle：是否隐藏步进操作。（`boolean`）
+ precision：数值精度（小数位数）。（`number | null | undefined`）
+ size：输入框尺寸。（`unknown`）
+ showThousandth：是否显示千分位分隔符。（`boolean`）
+ unit：数值单位。（`string`）

### 3、FormEnumFieldAbstractWidget

**继承**：FormFieldWidget

**属性**：

+ autocorrection：是否启用自动校正。（`boolean`）
+ internalSelectedOptions：内部选中的选项值数组。（`string[]`）
+ maxNumber：最多可选数量，默认值为无穷大。（`number`）
+ minNumber：最少可选数量，默认值为负无穷。（`number`）
+ optionColor：选项是否启用多彩样式。（`boolean`）
+ optionColorStyle：选项颜色样式，默认值为多彩样式。（`OptionColorStyle`）
+ options：可用选项列表。（`RuntimeEnumerationOption[]`）
+ orientation：排列方向。（`string | undefined`）
+ radioMode：单选模式。（`string | undefined`）
+ renderOnParent：是否在父容器中渲染。（`boolean`）

**方法**：

#### **defaultConstructDataTrigger**

+ **功能描述**：获取默认构造数据的触发事件。
+ **类型**：`() => WidgetTrigger[]`
+ **返回值**：触发事件数组（包含 `CHANGE`）。

#### **defaultClearFieldsTrigger**

+ **功能描述**：获取默认清空字段的触发事件。
+ **类型**：`() => WidgetTrigger[]`
+ **返回值**：触发事件数组（包含 `CHANGE`）。

#### **fetchLabelByValue**

+ **功能描述**：根据值获取选项标签。
+ **类型**：`(value: EnumerationValue | EnumerationValue[]) => string`
+ **参数**：
  - `value`：选项值。
+ **返回值**：对应的标签字符串。

#### **getAvailableOptions**

+ **功能描述**：获取可用选项列表，处理配置与元数据的匹配、可见性和自动校正逻辑。
+ **类型**：`() => RuntimeEnumerationOption[]`
+ **返回值**：过滤后的选项数组。

#### **getPopupContainer**

+ **功能描述**：获取弹出容器的渲染位置，若配置 `renderOnParent` 则返回父节点或文档体。
+ **类型**：`() => ((triggerNode: HTMLElement) => HTMLElement) | null`
+ **返回值**：弹出容器定位函数或 `null`。

#### **handleOptions**

+ **功能描述**：处理选项列表，过滤元数据中不存在的选项并补充默认值。
+ **类型**：`(ops: RuntimeEnumerationOption[]) => RuntimeEnumerationOption[]`
+ **参数**：
  - `ops`：原始选项数组。
+ **返回值**：处理后的选项数组。

#### **getMetaOptionNames**

+ **功能描述**：获取元数据中选项的名称列表。
+ **类型**：`() => string[] | undefined`
+ **返回值**：选项名称数组或 `undefined`。

#### **validator**

+ **功能描述**：校验枚举值，检查必填性、数量范围及选项有效性。
+ **类型**：`() => Promise<ValidatorInfo>`
+ **返回值**：校验结果信息（成功或错误）。

#### **compute**

+ **功能描述**：计算组件值，继承父类逻辑并返回结果。
+ **类型**：`() => boolean | Value`
+ **返回值**：计算后的有效值或布尔结果。

### 4、FormRelationFieldCheckboxWidget

**继承**：FormComplexFieldWidget

**属性**：

+ autocorrection：是否启用自动校正。（`boolean`）
+ fullOptions：完整选项列表。（`SelectItem<ActiveRecord>[] | undefined`）
+ fullOptionsMap：完整选项映射表。（`Map<string, SelectItem<ActiveRecord>> | undefined`）
+ loadFullOptions：是否加载完整选项。（`boolean | undefined`）
+ loadMaxTotalPage：最大加载总页数，默认值为 - 1。（`number`）
+ loadPageSize：分页加载大小，默认值为 100。（`number`）
+ maxNumber：最多可选数量，默认值为无穷大。（`number`）
+ minNumber：最少可选数量，默认值为负无穷。（`number`）
+ optionLabel：选项标签表达式。（`string | undefined`）
+ orientation：排列方向。（`string | undefined`）
+ options：可用选项列表。（`SelectItem<ActiveRecord>[]`）
+ selectedValues：选中的选项键值数组。（`string[] | undefined`）

**方法**：

#### **backfillSelectedValues**

+ **功能描述**：根据当前值回填选中的选项键值。
+ **类型**：`() => void`

#### **defaultConstructDataTrigger**

+ **功能描述**：获取默认构造数据的触发事件。
+ **类型**：`() => WidgetTrigger[]`
+ **返回值**：触发事件数组（包含 `CHANGE`）。

#### **defaultClearFieldsTrigger**

+ **功能描述**：获取默认清空字段的触发事件。
+ **类型**：`() => WidgetTrigger[]`
+ **返回值**：触发事件数组（包含 `CHANGE`）。

#### **executeExpressionByItem**

+ **功能描述**：根据数据项执行表达式，支持翻译和动态计算。
+ **类型**：`(item: ActiveRecord, expression: string, errorValue?: T) => T | string | undefined`
+ **参数**：
  - `item`：数据项对象。
  - `expression`：表达式字符串。
  - `errorValue`：表达式执行失败时的默认值（可选）。
+ **返回值**：表达式执行结果或默认值。

#### **fillFullOptionsForAll**

+ **功能描述**：加载并填充所有分页的完整选项数据。
+ **类型**：`(firstPage: QueryPageResult<ActiveRecord>, pageSize: number) => Promise<void>`
+ **参数**：
  - `firstPage`：第一页查询结果。
  - `pageSize`：分页大小。

#### **fillFullOptionsForFirstPage**

+ **功能描述**：填充第一页的选项数据并回填选中值。
+ **类型**：`(firstPage: QueryPageResult<ActiveRecord>) => void`
+ **参数**：
  - `firstPage`：第一页查询结果。

#### **generatorFullOptions**

+ **功能描述**：根据数据记录生成完整选项列表及映射表。
+ **类型**：`(activeRecords: ActiveRecord[]) => void`
+ **参数**：
  - `activeRecords`：数据记录数组。

#### **generatorKey**

+ **功能描述**：根据数据记录生成唯一键值（基于主键）。
+ **类型**：`(activeRecord: ActiveRecord) => string | undefined`
+ **参数**：
  - `activeRecord`：数据记录对象。
+ **返回值**：组合主键字符串或 `undefined`。

#### **getAvailableOptions**

+ **功能描述**：获取可用选项列表（直接返回完整选项）。
+ **类型**：`() => SelectItem<ActiveRecord>[]`
+ **返回值**：选项数组。

#### **mountedProcess**

+ **功能描述**：挂载后处理逻辑，加载选项数据。
+ **类型**：`() => Promise<void>`

#### **onSelectedChange**

+ **功能描述**：处理选择变更事件，更新选中值并触发父类变更。
+ **类型**：`(keys: string[] | undefined) => void`
+ **参数**：
  - `keys`：选中的键值数组或 `undefined`。

#### **queryPage**

+ **功能描述**：分页查询相关数据。
+ **类型**：`(option: Omit<QueryPageOptions, 'requestFields'>) => Promise<QueryPageResult<T>>`
+ **参数**：
  - `option`：分页查询选项（排除请求字段）。
+ **返回值**：分页查询结果。

#### **validator**

+ **功能描述**：校验选中项数量是否符合范围要求。
+ **类型**：`() => Promise<ValidatorInfo>`
+ **返回值**：校验结果信息（成功或错误）。

### 5、FormRelationFieldRadioWidget

**继承**：FormComplexFieldWidget

**属性**：

+ autocorrection：是否启用自动校正。（`boolean`）
+ fullOptions：完整选项列表。（`SelectItem<ActiveRecord>[] | undefined`）
+ fullOptionsMap：完整选项映射表。（`Map<string, SelectItem<ActiveRecord>> | undefined`）
+ loadFullOptions：是否加载完整选项。（`boolean | undefined`）
+ loadMaxTotalPage：最大加载总页数，默认值为 - 1。（`number`）
+ loadPageSize：分页加载大小，默认值为 100。（`number`）
+ optionLabel：选项标签表达式。（`string | undefined`）
+ orientation：排列方向。（`string | undefined`）
+ options：可用选项列表。（`SelectItem<ActiveRecord>[]`）
+ selectedValue：选中的选项键值。（`string | undefined`）

**方法**：

#### **backfillSelectedValues**

+ **功能描述**：根据当前值回填选中的选项键值。
+ **类型**：`() => void`

#### **defaultConstructDataTrigger**

+ **功能描述**：获取默认构造数据的触发事件。
+ **类型**：`() => WidgetTrigger[]`
+ **返回值**：触发事件数组（包含 `CHANGE`）。

#### **defaultClearFieldsTrigger**

+ **功能描述**：获取默认清空字段的触发事件。
+ **类型**：`() => WidgetTrigger[]`
+ **返回值**：触发事件数组（包含 `CHANGE`）。

#### **executeExpressionByItem**

+ **功能描述**：根据数据项执行表达式，支持翻译和动态计算。
+ **类型**：`(item: ActiveRecord, expression: string, errorValue?: T) => T | string | undefined`
+ **参数**：
  - `item`：数据项对象。
  - `expression`：表达式字符串。
  - `errorValue`：表达式执行失败时的默认值（可选）。
+ **返回值**：表达式执行结果或默认值。

#### **fillFullOptionsForAll**

+ **功能描述**：加载并填充所有分页的完整选项数据。
+ **类型**：`(firstPage: QueryPageResult<ActiveRecord>, pageSize: number) => Promise<void>`
+ **参数**：
  - `firstPage`：第一页查询结果。
  - `pageSize`：分页大小。

#### **fillFullOptionsForFirstPage**

+ **功能描述**：填充第一页的选项数据并回填选中值。
+ **类型**：`(firstPage: QueryPageResult<ActiveRecord>) => void`
+ **参数**：
  - `firstPage`：第一页查询结果。

#### **generatorFullOptions**

+ **功能描述**：根据数据记录生成完整选项列表及映射表。
+ **类型**：`(activeRecords: ActiveRecord[]) => void`
+ **参数**：
  - `activeRecords`：数据记录数组。

#### **generatorKey**

+ **功能描述**：根据数据记录生成唯一键值（基于主键）。
+ **类型**：`(activeRecord: ActiveRecord) => string | undefined`
+ **参数**：
  - `activeRecord`：数据记录对象。
+ **返回值**：组合主键字符串或 `undefined`。

#### **getAvailableOptions**

+ **功能描述**：获取可用选项列表（直接返回完整选项）。
+ **类型**：`() => SelectItem<ActiveRecord>[]`
+ **返回值**：选项数组。

#### **mountedProcess**

+ **功能描述**：挂载后处理逻辑，加载选项数据。
+ **类型**：`() => Promise<void>`

#### **onSelectedChange**

+ **功能描述**：处理选择变更事件，更新选中值并触发父类变更。
+ **类型**：`(key: string | undefined) => void`
+ **参数**：
  - `key`：选中的键值或 `undefined`。

#### **queryPage**

+ **功能描述**：分页查询相关数据。
+ **类型**：`(option: Omit<QueryPageOptions, 'requestFields'>) => Promise<QueryPageResult<T>>`
+ **参数**：
  - `option`：分页查询选项（排除请求字段）。
+ **返回值**：分页查询结果。

#### **validator**

+ **功能描述**：校验是否选中必填项。
+ **类型**：`() => Promise<ValidatorInfo>`
+ **返回值**：校验结果信息（成功或错误）。

### 6、AbstractFormM2OUploadFieldWidget

**继承**：FormM2OFieldWidget

**属性**：

+ allLimitSize：总文件大小限制配置。（`string`）
+ chunkUploadThreshold：分块上传阈值，默认值为 `defaultMultiPartConfig.chunkUploadThreshold`。（`number`）
+ cdnKey：CDN 密钥（处理后的值）。（`string | undefined`）
+ limit：文件数量限制，默认值为 1。（`number`）
+ limitFileExtensions：限制的文件扩展名。（`string | undefined`）
+ limitSize：单个文件大小限制，默认值为 -1（无限制）。（`number`）
+ parallel：并行上传数，默认值为 `defaultMultiPartConfig.parallel`。（`number`）
+ partSize：分块大小，默认值为 `defaultMultiPartConfig.partSize`。（`number`）
+ privateLink：是否为私有链接。（`boolean`）

### 7、FormO2MFieldUploadBaseWidget

**继承**：FormO2MFieldWidget

**属性**：

+ allLimitSize：总文件大小限制配置，默认值为空字符串。（`string`）
+ chunkUploadThreshold：分块上传阈值，默认值为 `defaultMultiPartConfig.chunkUploadThreshold`。（`number`）
+ limit：文件数量限制，默认值为 -1（无限制）。（`number`）
+ limitFileExtensions：限制的文件扩展名。（`string | undefined`）
+ limitSize：单个文件大小限制。（`number | undefined`）
+ multiple：是否支持多文件上传，基于 `multi` 配置。（`boolean`）
+ parallel：并行上传数，默认值为 `defaultMultiPartConfig.parallel`。（`number`）
+ partSize：分块大小，默认值为 `defaultMultiPartConfig.partSize`。（`number`）

**方法**：

#### **change**

+ **功能描述**：更新文件列表数据，支持传入 `null` 清空数据。
+ **类型**：`(data: ActiveRecord[] | null) => void`
+ **参数**：
  - `data`：文件数据数组或 `null`。

#### **remove**

+ **功能描述**：从文件列表中移除指定文件。
+ **类型**：`(file: ActiveRecord) => void`
+ **参数**：
  - `file`：待移除的文件对象（通过 `id` 匹配）。

### 8、FormM2MFieldUploadBaseWidget

**继承**：FormM2MFieldWidget

**属性**：

+ allLimitSize：总文件大小限制配置，默认值为空字符串。（`string`）
+ chunkUploadThreshold：分块上传阈值，默认值为 `defaultMultiPartConfig.chunkUploadThreshold`。（`number`）
+ limit：文件数量限制，默认值为 -1（无限制）。（`number`）
+ limitFileExtensions：限制的文件扩展名。（`string | undefined`）
+ limitSize：单个文件大小限制。（`number | undefined`）
+ multiple：是否支持多文件上传，基于 `multi` 配置。（`boolean`）
+ parallel：并行上传数，默认值为 `defaultMultiPartConfig.parallel`。（`number`）
+ partSize：分块大小，默认值为 `defaultMultiPartConfig.partSize`。（`number`）

**方法**：

#### **change**

+ **功能描述**：更新文件列表数据，支持传入 `null` 清空数据。
+ **类型**：`(data: ActiveRecord[] | null) => void`
+ **参数**：
  - `data`：文件数据数组或 `null`。

#### **remove**

+ **功能描述**：从文件列表中移除指定文件。
+ **类型**：`(file: ActiveRecord) => void`
+ **参数**：
  - `file`：待移除的文件对象（通过 `id` 匹配）。

### 9、FormRangeFieldsWidget

**继承**：BaseFormItemWidget

**属性**：

+ endField：结束字段对象。（`Field`）
+ endDefaultValue：结束字段的默认值。（`unknown`）
+ itemData：项数据标识，默认为开始字段和结束字段数据的组合。（`string`）
+ itemName：项名称，默认为开始字段和结束字段名称的组合。（`string`）
+ startField：开始字段对象。（`Field`）
+ startDefaultValue：开始字段的默认值。（`unknown`）

**方法**：

#### **getValue**

+ **功能描述**：获取范围字段的值，返回开始值和结束值的数组。
+ **类型**：`() => [Value, Value] | null | undefined`
+ **返回值**：包含开始值和结束值的数组，或 `null`，或 `undefined`。

#### **setValue**

+ **功能描述**：设置范围字段的值。
+ **类型**：`(value: [Value, Value] | null | undefined) => void`
+ **参数**：
  - `value`：要设置的值，可为包含开始值和结束值的数组、`null` 或 `undefined`。

#### **submit**

+ **功能描述**：提交范围字段数据，返回包含开始字段和结束字段名称及值的对象。
+ **类型**：`() => Record<string, unknown>`
+ **返回值**：包含字段名称和值的对象。

#### **validator**

+ **功能描述**：验证范围字段的值。
+ **类型**：`() => Promise<ValidatorInfo>`
+ **返回值**：验证结果信息。

## （二十）组件基类

### 1、FormTreeSelectFieldWidget

**继承**：AbstractTreeFieldWidget

**属性**：

+ multipleCheckedStrategy：多选校验策略，参考 `TreeSelectCheckedStrategy`。（`string | undefined`）
+ onlySelectedLeaf：是否仅选中叶子节点，默认值为 `false`。（`boolean`）
+ selectedValue：选中的树节点值。（`SimpleTreeSelected | SimpleTreeSelected[] | undefined`）
+ treeCheckStrictly：是否严格遵循父子节点选中状态，默认值由配置转换而来。（`boolean | undefined`）

**方法**：

#### **backfillDataProcess**

+ **功能描述**：回填数据处理逻辑，根据选中节点生成选中值。
+ **类型**：`({ selectedNodes }: { selectedNodes: OioTreeNode<TreeData>[] }) => void`
+ **参数**：
  - `selectedNodes`：选中的树节点数组。

#### **clearBackfillDataProcess**

+ **功能描述**：清除回填数据，重置根节点、展开状态和选中值。
+ **类型**：`() => void`

#### **collectionSelectedNodes**

+ **功能描述**：收集选中的树节点，支持单选和多选模式。
+ **类型**：`(selectedValue: SimpleTreeSelected | SimpleTreeSelected[]) => OioTreeNode<TreeData>[]`
+ **参数**：
  - `selectedValue`：选中的节点值（单个或数组）。
+ **返回值**：选中的树节点数组。

#### **collectionSelectedValues**

+ **功能描述**：从树节点中提取选中值对象。
+ **类型**：`(node: OioTreeNode<TreeData> | undefined) => SimpleTreeSelected | undefined`
+ **参数**：
  - `node`：树节点对象或 `undefined`。
+ **返回值**：选中值对象或 `undefined`。

#### **convertBackfillData**

+ **功能描述**：转换回填数据，支持自定义节点创建和更新回调。
+ **类型**：`(currentValues: ActiveRecord[], metadataList: TreeNodeMetadata[], list: TreeNodeResponseBody[], customCreateNodeCallback?: (node: OioTreeNode<TreeData>, value: TreeData | undefined) => void, customUpdateNodeCallback?: (node: OioTreeNode<TreeData>, value: TreeData) => void) => BackfillDataParameters | undefined`
+ **参数**：
  - `currentValues`：当前数据值数组。
  - `metadataList`：树元数据列表。
  - `list`：树节点响应数据列表。
  - `customCreateNodeCallback`：自定义创建节点回调（可选）。
  - `customUpdateNodeCallback`：自定义更新节点回调（可选）。
+ **返回值**：回填数据参数或 `undefined`。

#### **generatorNewTreeNode**

+ **功能描述**：生成新的树节点，并处理节点属性。
+ **类型**：`(parent: OioTreeNode<TreeData>, key: string, title: string | undefined, metadata: TreeNodeMetadata, data: ActiveRecord) => OioTreeNode<TreeData>`
+ **参数**：
  - `parent`：父节点对象。
  - `key`：节点键值。
  - `title`：节点标题。
  - `metadata`：节点元数据。
  - `data`：节点关联的数据记录。
+ **返回值**：生成的树节点对象。

#### **getSelectedNodes**

+ **功能描述**：过滤并获取与当前模型关联的选中节点。
+ **类型**：`(selectedValue: SimpleTreeSelected | SimpleTreeSelected[]) => OioTreeNode<TreeData>[] | undefined`
+ **参数**：
  - `selectedValue`：选中的节点值（单个或数组）。
+ **返回值**：过滤后的树节点数组或 `undefined`。

#### **onSelectedChange**

+ **功能描述**：处理选中值变更事件，验证并更新选中状态。
+ **类型**：`(selectedValue: SimpleTreeSelected | SimpleTreeSelected[], event: TreeSelectNodeChangeEvent) => void`
+ **参数**：
  - `selectedValue`：选中的节点值（单个或数组）。
  - `event`：节点变更事件对象。

#### **validatorSelectedValue**

+ **功能描述**：验证选中值是否符合规则（如仅叶子节点、模型匹配等）。
+ **类型**：`(selectedValue: SimpleTreeSelected | SimpleTreeSelected[], selectedNodes: OioTreeNode<TreeData>[]) => boolean | SimpleTreeSelected | SimpleTreeSelected[] | undefined`
+ **参数**：
  - `selectedValue`：选中的节点值（单个或数组）。
  - `selectedNodes`：选中的树节点数组。
+ **返回值**：验证结果（布尔值、处理后的选中值或 `undefined`）。

### 2、FormCascaderFieldWidget

**继承**：AbstractTreeFieldWidget

**属性**：

+ changeOnSelect：是否在选择时立即触发变更，默认值为 `false`。（`boolean`）
+ labelsSeparator：标签分隔符。（`string | undefined`）
+ multipleCheckedStrategy：多选校验策略，参考 `CascaderCheckedStrategy`。（`string | undefined`）
+ selectedLabels：选中节点的标签数组（多层级格式）。（`string[] | string[][] | undefined`）
+ selectedValue：选中节点的键值数组（多层级格式）。（`string[] | string[][] | undefined`）
+ showPath：是否显示路径，默认值为 `false`。（`boolean`）

**方法**：

#### **backfillDataProcess**

+ **功能描述**：回填数据处理逻辑，根据选中节点生成键值和标签数组。
+ **类型**：`({ selectedNodes }: { selectedNodes: OioTreeNode<TreeData>[] }) => void`
+ **参数**：
  - `selectedNodes`：选中的树节点数组。

#### **clearBackfillDataProcess**

+ **功能描述**：清除回填数据，重置根节点、展开状态和选中值。
+ **类型**：`() => void`

#### **collectionSelectedLabels**

+ **功能描述**：从树节点向上递归收集标签，生成层级标签数组。
+ **类型**：`(selectedNode: OioTreeNode<TreeData> | undefined) => string[]`
+ **参数**：
  - `selectedNode`：树节点对象或 `undefined`。
+ **返回值**：层级标签数组。

#### **collectionSelectedValues**

+ **功能描述**：从树节点向上递归收集键值，生成层级键值数组。
+ **类型**：`(selectedNode: OioTreeNode<TreeData> | undefined) => string[]`
+ **参数**：
  - `selectedNode`：树节点对象或 `undefined`。
+ **返回值**：层级键值数组。

#### **fetchBackfillData**

+ **功能描述**：获取回填数据，支持全量加载或反向查询。
+ **类型**：`(currentValues: ActiveRecord[], metadataList: TreeNodeMetadata[]) => Promise<TreeNodeResponseBody[] | undefined>`
+ **参数**：
  - `currentValues`：当前数据值数组。
  - `metadataList`：树元数据列表。
+ **返回值**：树节点响应数据数组或 `undefined`。

#### **getSelectedNodes**

+ **功能描述**：根据选中值和选项生成对应的树节点数组，支持多选策略和选中模式。
+ **类型**：`(selectedValue: string[] | string[][], selectedOptions: CascaderItemType[] | CascaderItemType[][]) => OioTreeNode<TreeData>[] | undefined`
+ **参数**：
  - `selectedValue`：选中的键值数组（单层或多层）。
  - `selectedOptions`：选中的选项数组（单层或多层）。
+ **返回值**：树节点数组或 `undefined`。

#### **onSelectedChange**

+ **功能描述**：处理选中值变更事件，验证并更新选中状态及标签。
+ **类型**：`(selectedValue: string[] | string[][], selectedOptions: CascaderItemType[] | CascaderItemType[][]) => void`
+ **参数**：
  - `selectedValue`：选中的键值数组（单层或多层）。
  - `selectedOptions`：选中的选项数组（单层或多层）。

#### **validatorSelectedValue**

+ **功能描述**：验证选中值是否符合规则（如层级匹配、多选策略等）。
+ **类型**：`(selectedValue: string[] | string[][], selectedNodes: OioTreeNode<TreeData>[]) => boolean | string[] | string[][]`
+ **参数**：
  - `selectedValue`：选中的键值数组（单层或多层）。
  - `selectedNodes`：选中的树节点数组。
+ **返回值**：验证结果（布尔值或处理后的键值数组）。





