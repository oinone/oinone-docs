---
title: Detail Field
index: true
category:
  - 研发手册
  - Reference
  - 前端API
  - Widget
  - Field
order: 4

---
# 一、Reference List

## （一）文本（String）

### 1、DetailStringFieldWidget{#quote2}

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Detail,
    ttype: [ModelFieldType.String, ModelFieldType.Phone, ModelFieldType.Email]
  })
)
export class DetailStringFieldWidget extends FormInputAbstractFieldWidget
```

**属性**：

+ currentValue：当前值，密码类型会进行加密处理。（`string | undefined`）
+ emptyStyle：空值样式配置。（`string | undefined`）

### 2、DetailStringColorPickerFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Detail,
    ttype: ModelFieldType.String,
    widget: 'ColorPicker'
  })
)
export class DetailStringColorPickerFieldWidget extends FormFieldWidget
```

**属性**：

+ justifyContent：内容水平对齐方式配置。（`string | undefined`）

### 3、DetailStringDownloadFieldWidget{#quote1}

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Detail,
    ttype: [ModelFieldType.String, ModelFieldType.Text],
    widget: 'Download'
  })
)
export class DetailStringDownloadFieldWidget extends FormStringDownloadFieldWidget
```

### 4、DetailStringHyperlinksFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Detail],
    ttype: ModelFieldType.String,
    widget: 'Hyperlinks'
  })
)
export class DetailStringHyperlinksFieldWidget extends FormFieldWidget
```

**属性**：

+ target：链接打开方式，支持路由跳转或新窗口打开，默认值为 `RedirectTargetEnum.BLANK`。（`RedirectTargetEnum`）
+ text：超链接显示文本。（`string | undefined`）

### 5、DetailStringIframeFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Detail],
    ttype: ModelFieldType.String,
    widget: ['Iframe']
  })
)
export class DetailStringIframeFieldWidget extends FormStringFieldWidget
```

### 6、DetailStringMediaPlayerFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Detail],
    ttype: ModelFieldType.String,
    widget: ['MediaPlayer']
  })
)
export class DetailStringMediaPlayerFieldWidget extends FormStringFieldWidget
```

### 7、DetailStringSignatureFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Detail,
    ttype: [ModelFieldType.String, ModelFieldType.Text],
    widget: 'Signature'
  })
)
export class DetailStringSignatureFieldWidget extends FormStringSignatureFieldWidget
```

**属性**：

+ showClearButton：是否展示清除按钮，默认为 `false`。（`boolean`）
+ showSaveButton：是否展示保存按钮，默认为 `false`。（`boolean`）

### 8、DetailStringTagFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Detail],
    ttype: [ModelFieldType.String, ModelFieldType.Integer, ModelFieldType.Text],
    multi: true
  })
)
export class DetailStringTagFieldWidget extends FormFieldWidget<string[], RuntimeStringField | RuntimeNumberField>
```

**属性**：

+ displayNameList：显示的标签列表，默认为空数组。（`string[] | { label: string }[]`）
+ optionColor：是否启用彩色标签样式，由 `optionColorStyle` 决定。（`boolean`）
+ optionColorStyle：标签颜色样式，默认值为 `OptionColorStyle.COLORFUL`。（`OptionColorStyle`）

### 9、DetailStringUploadFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Detail],
    ttype: [ModelFieldType.String, ModelFieldType.Text],
    widget: ['Upload']
  })
)
export class DetailStringUploadFieldWidget extends FormFieldWidget
```

**属性**：

+ cdnKey：CDN 密钥（处理后的值）。（`string | undefined`）
+ privateLink：是否为私有链接。（`boolean`）

### 10、DetailStringUploadImgFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Detail],
    ttype: [ModelFieldType.String, ModelFieldType.Text],
    widget: ['UploadImg']
  })
)
export class DetailStringUploadImgFieldWidget extends FormFieldWidget
```

## （二）多行文本（Text）

### 1、DetailCommonFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Detail,
    ttype: [ModelFieldType.Text, ModelFieldType.Related]
  })
)
export class DetailCommonFieldWidget extends FormFieldWidget
```

### 2、DetailStringDownloadFieldWidget

**引用**：文本（String）- [DetailStringDownloadFieldWidget](#quote1)

## （三）富文本（Html）

### 1、DetailHtmlFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Detail],
    ttype: ModelFieldType.HTML
  })
)
export class DetailHtmlFieldWidget extends FormFieldWidget
```

**属性**：

+ encode：是否对 HTML 内容进行编码，默认值为 `false`。（`boolean`）

## （四）手机（Phone）

### 1、DetailStringFieldWidget

**引用**：文本（String）- [DetailStringFieldWidget](#quote2)

## （五）邮箱（Email）

### 1、DetailStringFieldWidget

**引用**：文本（String）- [DetailStringFieldWidget](#quote2)

## （六）整数（Integer）

### 1、DetailNumberWidget{#quote3}

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Detail],
    ttype: [ModelFieldType.Integer, ModelFieldType.Long, ModelFieldType.Float, ModelFieldType.Currency]
  })
)
export class DetailNumberWidget extends FormNumberAbstractFieldWidget
```

**属性**：

+ currentValue：当前值（处理后），支持零填充和千分位格式化。（`string | undefined`）

## （七）浮点数（Float）

### 1、DetailNumberWidget

**引用**：整数（Integer）- [DetailNumberWidget](#quote3)

## （八）金额（Money）

### 1、DetailNumberWidget

**引用**：整数（Integer）- [DetailNumberWidget](#quote3)

## （九）布尔（Boolean）

### 1、DetailBooleanFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Detail],
    ttype: ModelFieldType.Boolean
  })
)
export class DetailBooleanFieldWidget extends FormFieldWidget
```

### 2、DetailBooleanSelectFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Detail],
    ttype: [ModelFieldType.Boolean],
    widget: ['Select', 'Radio']
  })
)
export class DetailBooleanSelectFieldWidget extends FormBooleanSelectFieldWidget
```

**属性**：

+ displayNameList：根据当前值获取的选项显示名称列表。（`{ label: string; value: any }[] | undefined`）
+ displayNameListStr：选项显示名称列表的字符串形式，用逗号分隔。（`string | undefined`）
+ optionColor：是否启用彩色选项样式，由 `optionColorStyle` 决定。（`boolean`）
+ optionColorStyle：选项颜色样式，默认值为 `OptionColorStyle.COLORFUL`。（`OptionColorStyle`）

## （十）数据字典（Enum）

### 1、DetailEnumFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Detail],
    ttype: ModelFieldType.Enum
  })
)
export class DetailEnumFieldWidget extends FormEnumFieldAbstractWidget<EnumerationValue>
```

**属性**：

+ displayNameList：根据当前值获取的枚举选项显示名称列表。（`{ label: string; value: any }[] | undefined`）
+ displayNameListStr：枚举选项显示名称列表的字符串形式，用逗号分隔。（`string | undefined`）

### 2、DetailEnumMultiFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Detail],
    ttype: ModelFieldType.Enum,
    multi: true
  })
)
export class DetailEnumMultiFieldWidget extends FormEnumFieldAbstractWidget<EnumerationValue[]>
```

**属性**：

+ displayNameList：根据当前值获取的枚举选项显示名称列表（多选模式）。（`{ label: string; value: any }[] | undefined`）
+ displayNameListStr：枚举选项显示名称列表的字符串形式，用逗号分隔。（`string | undefined`）

## （十一）时间日期（Datetime）

### 1、DetailDateTimeFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Detail,
    ttype: ModelFieldType.DateTime
  })
)
export class DetailDateTimeFieldWidget extends FormFieldWidget
```

**属性**：

+ dateFormat：日期格式，支持表达式解析，默认使用资源配置。（`string | undefined`）
+ format：原始格式配置。（`string | undefined`）
+ hasDateFormat：是否包含日期格式，默认值为 `true`。（`boolean`）
+ hasTimeFormat：是否包含时间格式，默认值为 `true`。（`boolean`）
+ justifyContent：内容对齐方式。（`string | undefined`）
+ resourceDateTimeFormat：日期时间格式资源对象。（`IResourceDateTimeFormat`）
+ timeFormat：时间格式，支持表达式解析，默认使用资源配置。（`string | undefined`）
+ valueFormat：值格式。（`string | undefined`）

**方法**：

#### **convertDateFormat**

+ **功能描述**：转换日期格式为标准格式。
+ **类型**：`(format: string) => string | undefined`
+ **参数**：
  - `format`：待转换的日期格式。
+ **返回值**：转换后的日期格式或 `undefined`。

#### **convertFormat**

+ **功能描述**：转换通用格式为标准格式。
+ **类型**：`(format: string) => string | undefined`
+ **参数**：
  - `format`：待转换的通用格式。
+ **返回值**：转换后的格式或 `undefined`。

#### **convertTimeFormat**

+ **功能描述**：转换时间格式为标准格式。
+ **类型**：`(format: string) => string | undefined`
+ **参数**：
  - `format`：待转换的时间格式。
+ **返回值**：转换后的时间格式或 `undefined`。

### 2、DetailDateTimeRangeFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Detail,
    widget: 'DateTimeRangePicker'
  })
)
export class DetailDateTimeRangeFieldWidget extends FormRangeFieldsWidget<StandardString>
```

**属性**：

+ dateFormat：日期格式，支持表达式解析。（`string | undefined`）
+ defaultFormat：默认格式。（`string`）
+ emptyStyle：空值时的样式配置。（`unknown`）
+ format：原始格式配置。（`string | undefined`）
+ hasDateFormat：是否包含日期格式，默认值为 `true`。（`boolean`）
+ hasTimeFormat：是否包含时间格式，默认值为 `true`。（`boolean`）
+ timeFormat：时间格式，支持表达式解析。（`string | undefined`）
+ valueFormat：值格式，默认为 `defaultFormat`。（`string`）

**方法**：

#### **convertDateFormat**

+ **功能描述**：转换日期格式为标准格式。
+ **类型**：`(format: string) => string | undefined`
+ **参数**：
  - `format`：待转换的日期格式。
+ **返回值**：转换后的日期格式或 `undefined`。

#### **convertFormat**

+ **功能描述**：转换通用格式为标准格式。
+ **类型**：`(format: string) => string | undefined`
+ **参数**：
  - `format`：待转换的通用格式。
+ **返回值**：转换后的格式或 `undefined`。

#### **convertTimeFormat**

+ **功能描述**：转换时间格式为标准格式。
+ **类型**：`(format: string) => string | undefined`
+ **参数**：
  - `format`：待转换的时间格式。
+ **返回值**：转换后的时间格式或 `undefined`。

## （十二）日期（Date）

### 1、DetailDateFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Detail,
    ttype: ModelFieldType.Date
  })
)
export class DetailDateFieldWidget extends DetailDateTimeFieldWidget
```

**属性**：

+ defaultFormat：默认日期格式。（`string`）
+ hasTimeFormat：是否包含时间格式，默认值为 `false`。（`boolean`）
+ valueFormat：值格式，默认为 `defaultDateFormat`。（`string`）

**方法**：

#### **convertFormat**

+ **功能描述**：转换日期格式为标准格式。
+ **类型**：`(format: string) => string | undefined`
+ **参数**：
  - `format`：待转换的日期格式。
+ **返回值**：转换后的日期或 `undefined`。

### 2、DetailDateRangeFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Detail,
    widget: 'DateRangePicker'
  })
)
export class DetailDateRangeFieldWidget extends DetailDateTimeRangeFieldWidget
```

**属性**：

+ defaultFormat：默认日期格式。（`string`）
+ hasTimeFormat：是否包含时间格式，默认值为 `false`。（`boolean`）
+ valueFormat：值格式，默认为 `defaultDateFormat`。（`string`）

**方法**：

#### **convertFormat**

+ **功能描述**：转换日期格式为标准格式。
+ **类型**：`(format: string) => string | undefined`
+ **参数**：
  - `format`：待转换的日期格式。
+ **返回值**：转换后的日期或 `undefined`。

## （十三）时间（Time）

### 1、DetailTimeFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Detail,
    ttype: ModelFieldType.Time
  })
)
export class DetailTimeFieldWidget extends DetailDateTimeFieldWidget
```

**属性**：

+ defaultFormat：默认时间格式。（`string`）
+ hasDateFormat：是否包含日期格式，默认值为 `false`。（`boolean`）
+ valueFormat：值格式，默认为 `defaultTimeFormat`。（`string`）

**方法**：

#### **convertFormat**

+ **功能描述**：转换时间格式为标准格式。
+ **类型**：`(format: string) => string | undefined`
+ **参数**：
  - `format`：待转换的时间格式。
+ **返回值**：转换后的时间或 `undefined`。

### 2、DetailTimeRangeFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Detail,
    widget: 'TimeRangePicker'
  })
)
export class DetailTimeRangeFieldWidget extends DetailDateTimeRangeFieldWidget
```

**属性**：

+ defaultFormat：默认时间格式。（`string`）
+ hasDateFormat：是否包含日期格式，默认值为 `false`。（`boolean`）
+ valueFormat：值格式，默认为 `defaultTimeFormat`。（`string`）

**方法**：

#### **convertFormat**

+ **功能描述**：转换时间格式为标准格式。
+ **类型**：`(format: string) => string | undefined`
+ **参数**：
  - `format`：待转换的时间格式。
+ **返回值**：转换后的时间或 `undefined`。

## （十四）年份（Year）

### 1、DetailYearFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Detail,
    ttype: ModelFieldType.Year
  })
)
export class DetailYearFieldWidget extends DetailDateTimeFieldWidget
```

**属性**：

+ defaultFormat：默认年份格式。（`string`）
+ format：格式配置，取自 DSL 或默认格式。（`string | undefined`）
+ hasDateFormat：是否包含日期格式，默认值为 `false`。（`boolean`）
+ hasTimeFormat：是否包含时间格式，默认值为 `false`。（`boolean`）
+ valueFormat：值格式，默认为 `defaultYearValueFormat`。（`string`）

### 2、DetailYearRangeFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Detail,
    widget: 'YearRangePicker'
  })
)
export class DetailYearRangeFieldWidget extends DetailDateTimeRangeFieldWidget
```

**属性**：

+ defaultFormat：默认年份格式。（`string`）
+ format：格式配置，取自 DSL 或默认格式。（`string | undefined`）
+ hasDateFormat：是否包含日期格式，默认值为 `false`。（`boolean`）
+ hasTimeFormat：是否包含时间格式，默认值为 `false`。（`boolean`）
+ valueFormat：值格式，默认为 `defaultYearValueFormat`。（`string`）

## （十五）键值对（Map）

### 1、DetailMapFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Detail,
    ttype: ModelFieldType.Map
  })
)
export class DetailMapFieldWidget extends FormMapFieldWidget
```

## （十六）多对一（M2O）

### 1、DetailM2OSelectFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Detail],
    ttype: ModelFieldType.ManyToOne
  })
)
export class DetailM2OSelectFieldWidget extends DetailRelationSelectFieldWidget
```

### 2、DetailM2OUploadWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Detail],
    ttype: ModelFieldType.ManyToOne,
    widget: 'Upload'
  })
)
export class DetailM2OUploadWidget extends DetailRelationSelectFieldWidget
```

**属性**：

+ cdnKey：CDN 密钥。（`string | undefined`）
+ privateLink：是否使用私有链接。（`boolean`）

## （十七）一对多（O2M）

### 1、DetailO2MSelectFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Detail],
    ttype: ModelFieldType.OneToMany,
    widget: 'Select'
  })
)
export class DetailO2MSelectFieldWidget extends DetailRelationSelectFieldWidget<ActiveRecord[], RuntimeO2MField>
```

**属性**：

+ currentValue：当前值，对原始值进行标签处理后返回数组。（`any[]`）

### 2、DetailO2MTableFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Detail,
    ttype: ModelFieldType.OneToMany
  })
)
export class DetailO2MTableFieldWidget extends FormSubviewListFieldWidget<RuntimeO2MField>
```

**方法**：

#### **initSubviewData**

+ **功能描述**：初始化子视图数据，根据关联查询条件生成过滤条件并设置数据源。
+ **类型**：`() => ReturnPromise<void>`

#### **refreshValueProcess**

+ **功能描述**：刷新值处理，仅在数据源提供者模式下调用父类方法。
+ **类型**：`() => Promise<void>`

## （十八）多对多（M2M）

### 1、DetailM2MSelectFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Detail],
    ttype: ModelFieldType.ManyToMany,
    widget: 'Select'
  })
)
export class DetailM2MSelectFieldWidget extends DetailO2MSelectFieldWidget
```

### 2、DetailM2MTableFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Detail,
    ttype: ModelFieldType.ManyToMany
  })
)
export class DetailM2MTableFieldWidget extends FormSubviewListFieldWidget<RuntimeM2MField>
```

**方法**：

#### **initSubviewData**

+ **功能描述**：初始化子视图数据，根据多对多关联关系生成查询数据并设置数据源。
+ **类型**：`() => ReturnPromise<void>`

#### **refreshValueProcess**

+ **功能描述**：刷新值处理，仅在数据源提供者模式下调用父类方法。
+ **类型**：`() => Promise<void>`

## (十九）抽象基类

### 1、DetailRelationSelectFieldWidget

**继承**：BaseSelectFieldWidget

**属性**：

+ currentValue：当前值，通过 `handleTableLabel` 处理后的展示值。（`unknown`）
+ relationFieldKey：关联字段键，取自参考模型的主键或通过 `getRelationFieldKey` 生成。（`string | string[] | undefined`）

**方法**：

#### **handleTableLabel**

+ **功能描述**：处理表格标签，根据配置生成展示值。
+ **类型**：`(dataEntity: unknown) => unknown`
+ **参数**：
  - `dataEntity`：数据实体。
+ **返回值**：处理后的展示值。

