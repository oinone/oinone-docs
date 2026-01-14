---
title: Table Field
index: true
category:
  - 研发手册
  - Reference
  - 前端API
  - Widget
  - Field
order: 1
prev:
  text: Field
  link: /zh-cn/DevManual/Reference/Front-EndFramework/Widget/Field/README.md
---
# 一、Reference List

## （一）文本（String）

### 1、TableStringFieldWidget{#quote5}

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: [ModelFieldType.String, ModelFieldType.Phone, ModelFieldType.Email]
  })
)
export class TableStringFieldWidget extends BaseTableFieldWidget<string>
```

**属性**：

+ type：字段类型。（`string`）

**方法**：

#### **compute**

+ **功能描述**：根据上下文计算字段值，若类型为密码则进行加密处理。
+ **类型**：`(context: any) => string | undefined`
+ **参数**：
  - `context`：计算上下文。
+ **返回值**：计算后的字段值，若为密码类型则返回密文。

### 2、TableStringColorPickerFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: ModelFieldType.String,
    widget: 'ColorPicker'
  })
)
export class TableStringColorPickerFieldWidget extends BaseTableFieldWidget
```

**方法**：

#### **renderDefaultSlot**

+ **功能描述**：渲染默认插槽内容，基于计算值创建颜色选择器组件。
+ **类型**：`(context: any) => VNode[]`
+ **参数**：
  - `context`：计算上下文。
+ **返回值**：颜色选择器组件的 VNode 数组，若无值则返回空数组。

### 3、TableStringHyperlinksFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: ModelFieldType.String,
    widget: 'Hyperlinks'
  })
)
export class TableStringHyperlinksFieldWidget extends BaseTableFieldWidget
```

**属性**：

+ defaultValue：默认值。（`string`）
+ target：链接打开方式。（`RedirectTargetEnum`）
+ text：链接显示文本。（`string`）

**方法**：

#### **renderDefaultSlot**

+ **功能描述**：渲染默认插槽内容，创建带链接的文本元素。
+ **类型**：`(context: any) => VNode[] | string`
+ **参数**：
  - `context`：计算上下文。
+ **返回值**：包含链接元素的 VNode 数组。

### 4、TableStringMediaPlayerFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: ModelFieldType.String,
    widget: 'MediaPlayer'
  })
)
export class TableStringMediaPlayerFieldWidget extends TableStringFieldWidget
```

### 5、TableStringTagFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: [ModelFieldType.String, ModelFieldType.Text],
    multi: true
  })
)
export class TableStringTagFieldWidget extends BaseTableFieldWidget
```

**方法**：

#### **renderDefaultSlot**

+ **功能描述**：渲染默认插槽内容，将数组值转换为标签列表。
+ **类型**：`(context: any) => VNode[] | string`
+ **参数**：
  - `context`：计算上下文。
+ **返回值**：包含标签元素的 VNode 数组，若无值则返回空字符串。

### 6、TableStringUploadWidget{#quote1}

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: [ModelFieldType.String, ModelFieldType.Text],
    multi: false,
    widget: 'Upload'
  })
)
export class TableStringUploadWidget extends TableStringFieldWidget
```

**属性**：

+ cdnKey：CDN 密钥。（`string | undefined`）
+ privateLink：是否为私有链接。（`boolean`）

**方法**：

#### **renderDefaultSlot**

+ **功能描述**：渲染默认插槽内容，创建上传组件。
+ **类型**：`(context: any) => VNode[]`
+ **参数**：
  - `context`：计算上下文。
+ **返回值**：上传组件的 VNode 数组，若无值则返回空数组。

### 7、TableStringUploadImageFieldWidget{#quote2}

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    widget: 'UploadImg',
    ttype: [ModelFieldType.String, ModelFieldType.Text]
  })
)
export class TableStringUploadImageFieldWidget extends BaseTableFieldWidget
```

**方法**：

#### **renderDefaultSlot**

+ **功能描述**：渲染默认插槽内容，创建图片预览组件。
+ **类型**：`(context: any) => VNode[]`
+ **参数**：
  - `context`：计算上下文。
+ **返回值**：图片预览组件的 VNode 数组，若无值则返回空数组。

### 8、TableStringMultiUploadWidget{#quote3}

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: [ModelFieldType.String, ModelFieldType.Text],
    multi: true,
    widget: 'Upload'
  })
)
export class TableStringMultiUploadWidget extends TableStringTagFieldWidget
```

**属性**：

+ cdnKey：CDN 密钥。（`string | undefined`）
+ privateLink：是否为私有链接。（`boolean`）

**方法**：

#### **renderDefaultSlot**

+ **功能描述**：渲染默认插槽内容，创建多文件上传组件。
+ **类型**：`(context: any) => VNode[] | string`
+ **参数**：
  - `context`：计算上下文。
+ **返回值**：多文件上传组件的 VNode 数组，若无值则返回空数组。

### 9、TableStringMultiUploadImageFieldWidget{#quote4}

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: [ModelFieldType.String, ModelFieldType.Text],
    multi: true,
    widget: 'UploadImg'
  })
)
export class TableStringMultiUploadImageFieldWidget extends BaseTableFieldWidget
```

#### **renderDefaultSlot**

+ **功能描述**：渲染默认插槽内容，创建多图上传组件。
+ **类型**：`(context: any) => VNode[]`
+ **参数**：
  - `context`：计算上下文。
+ **返回值**：多图上传组件的 VNode 数组，若无值则返回空数组。

## （二）多行文本（Text）

### 1、TableTextFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: ModelFieldType.Text
  })
)
export class TableTextFieldWidget extends TableStringFieldWidget
```

#### **renderDefaultSlot**

+ **功能描述**：渲染默认插槽内容，创建文本显示组件。
+ **类型**：`(context: RowContext) => VNode[] | string`
+ **参数**：
  - `context`：行上下文。
+ **返回值**：文本显示组件的 VNode 数组。

### 2、TableStringUploadWidget

**引用**：文本（String）- [TableStringUploadWidget](#quote1)

### 3、TableStringUploadImageFieldWidget

**引用**：文本（String）- [TableStringUploadImageFieldWidget](#quote2)

### 4、TableStringMultiUploadWidget

**引用**：文本（String）- [TableStringMultiUploadWidget](#quote3)

### 5、TableStringMultiUploadImageFieldWidget

**引用**：文本（String）- [TableStringMultiUploadImageFieldWidget](#quote4)

## （三）富文本（Html）

### 1、TableHtmlRichTextFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: ModelFieldType.HTML
  })
)
export class TableHtmlRichTextFieldWidget extends BaseTableFieldWidget
```

**属性**：

+ title：富文本标题。（`string`）

**方法**：

#### **renderDefaultSlot**

+ **功能描述**：渲染默认插槽内容，创建富文本显示组件。
+ **类型**：`(context: any) => VNode[]`
+ **参数**：
  - `context`：计算上下文。
+ **返回值**：富文本显示组件的 VNode 数组。

## （四）手机（Phone）

### 1、TableStringFieldWidget

**引用**：文本（String）- [TableStringFieldWidget](#quote5)

## （五）邮箱（Email）

### 1、TableStringFieldWidget

**引用**：文本（String）- [TableStringFieldWidget](#quote5)

## （六）整数（Integer）

### 1、TableNumberWidget{#quote6}

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: [ViewType.Table],
    ttype: [ModelFieldType.Integer, ModelFieldType.Long, ModelFieldType.Float]
  })
)
export class TableNumberWidget extends BaseTableFieldWidget<string | number, RuntimeNumberField>
```

**方法**：

#### **getPrecision**

+ **功能描述**：获取数值精度配置，优先使用 DSL 中的 decimal 配置，若未配置则尝试从字段属性中获取。
+ **类型**：`(context: RowContext) => number | null | undefined`
+ **参数**：
  - `context`：行上下文。
+ **返回值**：数值精度，可能为数字、`null` 或 `undefined`。

#### **getShowThousandth**

+ **功能描述**：获取是否显示千分位的配置，默认为 `false`。
+ **类型**：`(context: RowContext) => boolean`
+ **参数**：
  - `context`：行上下文。
+ **返回值**：是否显示千分位的布尔值。

#### **renderDefaultSlot**

+ **功能描述**：渲染默认插槽内容，对数值进行零填充和千分位格式化处理后显示。
+ **类型**：`(context: RowContext) => VNode[] | string`
+ **参数**：
  - `context`：行上下文。
+ **返回值**：格式化后的数字字符串或包含渲染节点的数组。

### 2、TableMultiNumberWidget{#quote7}

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: [ModelFieldType.Integer, ModelFieldType.Float, ModelFieldType.Currency],
    multi: true
  })
)
export class TableMultiNumberWidget extends TableStringTagFieldWidget
```

## （七）浮点数（Float）

### 1、TableNumberWidget

**引用**：整数（Integer）- [TableNumberWidget](#quote6)

### 2、TableMultiNumberWidget

**引用**：整数（Integer）- [TableMultiNumberWidget](#quote7)

## （八）金额（Money）

### 1、TableCurrencyFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: [ViewType.Table],
    ttype: [ModelFieldType.Currency]
  })
)
export class TableCurrencyFieldWidget extends TableNumberWidget
```

### 2、TableMultiNumberWidget

**引用**：整数（Integer）- [TableMultiNumberWidget](#quote7)

## （九）布尔（Boolean）

### 1、TableBooleanFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: ModelFieldType.Boolean
  })
)
export class TableBooleanFieldWidget extends BaseTableFieldWidget<boolean | string>
```

**方法**：

#### **renderDefaultSlot**

+ **功能描述**：渲染默认插槽内容，将布尔值转换为对应文本显示。
+ **类型**：`(context: RowContext) => VNode[] | string`
+ **参数**：
  - `context`：行上下文。
+ **返回值**：布尔值对应的文本描述，或根据选项配置转换后的标签。

### 2、TableBooleanSelectFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: ModelFieldType.Boolean,
    widget: ['Select', 'radio']
  })
)
export class TableBooleanSelectFieldWidget extends BaseTableFieldWidget<string | string[], RuntimeEnumerationField>
```

**属性**：

+ optionColor：是否启用彩色选项样式。（`boolean`）
+ optionColorStyle：选项颜色样式，默认为 `COLORFUL`。（`OptionColorStyle`）
+ options：选项列表。（`RuntimeEnumerationOption[]`）

**方法**：

#### **renderDefaultSlot**

+ **功能描述**：渲染默认插槽内容，创建枚举值显示组件。
+ **类型**：`(context: RowContext) => VNode[] | string`
+ **参数**：
  - `context`：行上下文。
+ **返回值**：枚举值显示组件的 VNode 数组。

### 3、TableBooleanSwitchFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: ModelFieldType.Boolean,
    widget: ['Switch', 'TableSwitch']
  })
)
export class TableBooleanSwitchFieldWidget extends BaseTableFieldWidget<boolean>
```

**属性**：

+ falsyAction：当值为 false 时执行的 action。（`any`）
+ truthyAction：当值为 true 时执行的 action。（`any`）
+ visiblePopconfirm：是否显示确认弹窗。（`boolean`）

**方法**：

#### **renderDefaultSlot**

+ **功能描述**：渲染默认插槽内容，生成开关组件并绑定状态切换逻辑，支持通过 Popconfirm 确认操作。
+ **类型**：`(context: RowContext) => VNode[]`
+ **参数**：
  - `context`：行上下文，包含当前行数据及索引信息。
+ **返回值**：包含开关组件和确认弹窗的 VNode 数组。

## （十）数据字典（Enum）

### 1、TableEnumFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: ModelFieldType.Enum
  })
)
export class TableEnumFieldWidget extends BaseTableFieldWidget<string | string[], RuntimeEnumerationField>
```

**属性**：

+ optionColor：是否启用彩色选项样式。（`boolean`）
+ optionColorStyle：选项颜色样式，默认值为 `OptionColorStyle.COLORFUL`。（`OptionColorStyle`）
+ options：枚举选项列表，默认空数组。（`RuntimeEnumerationOption[]`）

**方法**：

#### **getRenderOptions**

+ **功能描述**：解析枚举选项的显示名称和标签（若为表达式则动态计算），返回处理后的选项数组。
+ **类型**：`(context: RowContext) => RuntimeEnumerationOption[]`
+ **参数**：
  - `context`：行上下文，包含当前行数据。
+ **返回值**：处理后的枚举选项数组。

#### **renderDefaultSlot**

+ **功能描述**：渲染默认插槽内容，创建枚举组件并绑定值、选项及样式配置。
+ **类型**：`(context: RowContext) => VNode[] | string`
+ **参数**：
  - `context`：行上下文，包含当前行数据及索引信息。
+ **返回值**：枚举组件的 VNode 数组或字符串。

### 2、TableEnumSwitchFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: ModelFieldType.Enum,
    widget: ['TableSwitch', 'EipTableSwitchEnum']
  })
)
export class TableEnumSwitchFieldWidget extends BaseTableFieldWidget<boolean>
```

**属性**：

+ falsyAction：值为 `false` 时执行的 action。（`any`）
+ falsyValue：对应 `false` 状态的枚举值。（`any`）
+ truthyAction：值为 `true` 时执行的 action。（`any`）
+ truthyValue：对应 `true` 状态的枚举值。（`any`）
+ visiblePopconfirm：是否显示确认弹窗，响应式属性。（`boolean`）

**方法**：

#### **renderDefaultSlot**

+ **功能描述**：渲染默认插槽内容，生成开关组件并绑定枚举值切换逻辑，通过 Popconfirm 确认操作。
+ **类型**：`(context: RowContext) => VNode[]`。
+ **参数**：
  - `context`：行上下文，包含当前行数据及索引信息。
+ **返回值**：包含开关组件和确认弹窗的 VNode 数组。

## （十一）时间日期（Datetime）

### 1、TableDateTimeFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: ModelFieldType.DateTime
  })
)
export class TableDateTimeFieldWidget extends BaseTableFieldWidget<string | Date>
```

**属性**：

+ format：日期时间格式。（`string | undefined`）
+ hasDateFormat：是否包含日期格式，默认 `true`。（`boolean`）
+ hasTimeFormat：是否包含时间格式，默认 `true`。（`boolean`）
+ resourceDateTimeFormat：资源日期时间格式配置，初始化时异步获取。（`IResourceDateTimeFormat`）
+ valueFormat：值格式，默认使用 `defaultFormat`。（`string`）

**方法**：

#### **convertDateFormat**

+ **功能描述**：将日期格式转换为映射格式。
+ **类型**：`(format: string) => string | undefined`
+ **参数**：
  - `format`：待转换的日期格式字符串。
+ **返回值**：转换后的映射格式字符串，若未匹配则返回 `undefined`。

#### **convertFormat**

+ **功能描述**：将通用格式转换为映射格式。
+ **类型**：`(format: string) => string | undefined`
+ **参数**：
  - `format`：待转换的格式字符串。
+ **返回值**：转换后的映射格式字符串，若未匹配则返回 `undefined`。

#### **convertTimeFormat**

+ **功能描述**：将时间格式转换为映射格式。
+ **类型**：`(format: string) => string | undefined`
+ **参数**：
  - `format`：待转换的时间格式字符串。
+ **返回值**：转换后的映射格式字符串，若未匹配则返回 `undefined`。

#### **getDateFormat**

+ **功能描述**：通过表达式计算获取日期格式配置。
+ **类型**：`(context: RowContext) => string | undefined`
+ **参数**：
  - `context`：行上下文，包含当前行数据。
+ **返回值**：计算后的日期格式字符串，若未配置则返回 `undefined`。

#### **getDefaultDateFormat**

+ **功能描述**：获取默认日期格式（`defaultDateFormatKey`）。
+ **类型**：`() => string | undefined`
+ **返回值**：默认日期格式字符串。

#### **getDefaultTimeFormat**

+ **功能描述**：获取默认时间格式（`defaultTimeFormatKey`）。
+ **类型**：`() => string | undefined`
+ **返回值**：默认时间格式字符串。

#### **getTimeFormat**

+ **功能描述**：通过表达式计算获取时间格式配置。
+ **类型**：`(context: RowContext) => string | undefined`
+ **参数**：
  - `context`：行上下文，包含当前行数据。
+ **返回值**：计算后的时间格式字符串，若未配置则返回 `undefined`。

#### **renderDefaultSlot**

+ **功能描述**：渲染默认插槽内容，将日期时间值格式化为指定字符串，支持动态配置格式和资源格式化。
+ **类型**：`(context: RowContext) => string`
+ **参数**：
  - `context`：行上下文，包含当前行数据。
+ **返回值**：格式化后的日期时间字符串，值为空时返回空字符串。

### 2、TableDateTimeRangeFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Table,
    widget: 'DateTimeRangePicker'
  })
)
export class TableDateTimeRangeFieldWidget extends BaseTableQuickOperationColumnWidget
```

**属性**：

+ dateFormat：日期格式。（`string | undefined`）
+ endField：结束字段。（`RuntimeModelField`）
+ fieldWidgetMounted：组件挂载时的回调函数，通过依赖注入获取。（`(widget: BaseTableColumnWidget) => void | undefined`）
+ fieldWidgetUnmounted：组件卸载时的回调函数，通过依赖注入获取。（`(widget: BaseTableColumnWidget) => void | undefined`）
+ format：日期时间格式。（`string | undefined`）
+ hasDateFormat：是否包含日期格式，默认 `true`。（`boolean`）
+ hasTimeFormat：是否包含时间格式，默认 `true`。（`boolean`）
+ invisible：是否隐藏，取用户偏好或默认值。（`boolean`）
+ itemData：数据项标识。（`string`）
+ itemName：数据项名称。（`string`）
+ minWidth：最小宽度，默认为 `'120'`。（`string`）
+ separator：日期范围分隔符，默认为 `' ~ '`。（`string`）
+ startField：开始字段。（`RuntimeModelField`）
+ userPrefer：用户表格偏好配置。（`UserTablePrefer | undefined`）
+ userPreferInvisible：是否根据用户偏好隐藏。（`boolean`）
+ valueFormat：值格式，默认使用 `defaultFormat`。（`string`）

**方法**：

#### **convertDateFormat**

+ **功能描述**：将日期格式转换为映射格式。
+ **类型**：`(format: string) => string | undefined`
+ **参数**：
  - `format`：待转换的日期格式字符串。
+ **返回值**：转换后的映射格式字符串，若未匹配则返回 `undefined`。

#### **convertFormat**

+ **功能描述**：将通用格式转换为映射格式。
+ **类型**：`(format: string) => string | undefined`
+ **参数**：
  - `format`：待转换的格式字符串。
+ **返回值**：转换后的映射格式字符串，若未匹配则返回 `undefined`。

#### **convertTimeFormat**

+ **功能描述**：将时间格式转换为映射格式。
+ **类型**：`(format: string) => string | undefined`
+ **参数**：
  - `format`：待转换的时间格式字符串。
+ **返回值**：转换后的映射格式字符串，若未匹配则返回 `undefined`。

#### **formatValue**

+ **功能描述**：将日期值格式化为指定格式字符串。
+ **类型**：`(value: Date | string | undefined, format: string) => string`
+ **参数**：
  - `value`：待格式化的日期值。
  - `format`：目标格式字符串。
+ **返回值**：格式化后的字符串，值为空或无法识别时返回空字符串。

#### **renderDefaultSlot**

+ **功能描述**：渲染默认插槽内容，显示日期范围值，支持格式配置和分隔符显示。
+ **类型**：`(context: RowContext) => VNode[] | string`
+ **参数**：
  - `context`：行上下文，包含当前行数据及索引信息。
+ **返回值**：格式化后的日期范围字符串或 VNode 数组，字段为空时返回空字符串。

#### **renderEditSlot**

+ **功能描述**：渲染编辑插槽内容。
+ **类型**：`(context: RowContext) => VNode[] | string`
+ **参数**：
  - `context`：行上下文，包含当前行数据及索引信息。
+ **返回值**：编辑组件的 VNode 数组，不可见或无模板时返回空数组。

## （十二）日期（Date）

### 1、TableDateFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: ModelFieldType.Date
  })
)
export class TableDateFieldWidget extends TableDateTimeFieldWidget
```

**属性**：

+ defaultFormat：默认日期格式，默认为 `YYYY-MM-DD`。（`string`）
+ hasTimeFormat：是否包含时间格式，默认 `false`。（`boolean`）
+ valueFormat：值格式，默认为 `YYYY-MM-DD`。（`string`）

**方法**：

#### **convertFormat**

+ **功能描述**：将日期格式转换为映射格式（基于 `DateFormatMap`）。
+ **类型**：`(format: string) => string | undefined`
+ **参数**：
  - `format`：待转换的日期格式字符串。
+ **返回值**：转换后的映射格式字符串，若未匹配则返回 `undefined`。

#### **getDefaultTimeFormat**

+ **功能描述**：获取默认时间格式，始终返回 `undefined`（不包含时间格式）。
+ **类型**：`() => undefined`

#### **getTimeFormat**

+ **功能描述**：获取时间格式配置，始终返回 `undefined`（不包含时间格式）。
+ **类型**：`(context: any) => undefined`

### 2、TableDateRangeFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Table,
    widget: 'DateRangePicker'
  })
)
export class TableDateRangeFieldWidget extends TableDateTimeRangeFieldWidget
```

**属性**：

+ defaultFormat：默认日期格式，默认为 `YYYY-MM-DD`。（`string`）
+ hasTimeFormat：是否包含时间格式，默认为 `false`。（`boolean`）
+ valueFormat：值格式，默认为 `YYYY-MM-DD`。（`string`）

**方法**：

#### **convertFormat**

+ **功能描述**：将日期格式转换为映射格式（基于 `DateFormatMap`）。
+ **类型**：`(format: string) => string | undefined`
+ **参数**：
  - `format`：待转换的日期格式字符串。
+ **返回值**：转换后的映射格式字符串，若未匹配则返回 `undefined`。

## （十三）时间（Time）

### 1、TableTimeFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(BaseFieldWidget.Token({ viewType: ViewType.Table, ttype: [ModelFieldType.Time] }))
export class TableTimeFieldWidget extends TableDateTimeFieldWidget
```

**属性**：

+ defaultFormat：默认时间格式，默认为 `YYYY-MM-DD`。（`string`）
+ hasDateFormat：是否包含日期格式，默认为`false`。（`boolean`）
+ valueFormat：值格式，默认为 `YYYY-MM-DD`。（`string`）

**方法**：

#### **convertTimeFormat**

+ **功能描述**：将时间格式转换为映射格式（基于 `TimeFormatMap`）。
+ **类型**：`(format: string) => string | undefined`
+ **参数**：
  - `format`：待转换的时间格式字符串。
+ **返回值**：转换后的映射格式字符串，若未匹配则返回 `undefined`。

#### **getDateFormat**

+ **功能描述**：获取日期格式。
+ **类型**：`(context: any) => undefined`

#### **getDefaultDateFormat**

+ **功能描述**：获取默认日期格式。
+ **类型**：`() => undefined`

### 2、TableTimeRangeFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Table,
    widget: 'TimeRangePicker'
  })
)
export class TableTimeRangeFieldWidget extends TableDateTimeRangeFieldWidget
```

**属性**：

+ defaultFormat：默认时间格式，默认为 `defaultTimeFormat`。（`string`）
+ hasDateFormat：是否包含日期格式，默认 `false`。（`boolean`）
+ valueFormat：值格式，默认为 `defaultTimeFormat`。（`string`）

**方法**：

#### **convertTimeFormat**

+ **功能描述**：将时间格式转换为映射格式（基于 `TimeFormatMap`）。
+ **类型**：`(format: string) => string | undefined`
+ **参数**：
  - `format`：待转换的时间格式字符串。
+ **返回值**：转换后的映射格式字符串，若未匹配则返回 `undefined`。

## （十四）年份（Year）

### 1、TableYearFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: [ModelFieldType.Year]
  })
)
export class TableYearFieldWidget extends TableDateTimeFieldWidget
```

**属性**：

+ defaultFormat：默认年份格式，默认为 `defaultYearFormat`。（`string`）
+ hasDateFormat：是否包含日期格式，默认为 `false`。（`boolean`）
+ hasTimeFormat：是否包含时间格式，默认为 `false`。（`boolean`）
+ valueFormat：值格式，默认为 `defaultYearValueFormat`。（`string`）

### 2、TableYearRangeFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Table,
    widget: 'YearRangePicker'
  })
)
export class TableYearRangeFieldWidget extends TableDateTimeRangeFieldWidget
```

**属性**：

+ defaultFormat：默认年份格式，默认为 `defaultYearFormat`。（`string`）
+ hasDateFormat：是否包含日期格式，默认为 `false`。（`boolean`）
+ hasTimeFormat：是否包含时间格式，默认为 `false`。（`boolean`）
+ valueFormat：值格式，默认为 `defaultYearValueFormat`。（`string`）

**方法**：

#### **formatValue**

+ **功能描述**：将年份值格式化为指定格式，支持数值类型自动转换为字符串。
+ **类型**：`(value: Date | string | number | undefined, format: string) => string`
+ **参数**：
  - `value`：待格式化的年份值（支持日期、字符串或数值类型）。
  - `format`：目标格式字符串。
+ **返回值**：格式化后的年份字符串，调用父类方法处理。

## （十五）键值对（Map）

### 1、TableMapFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: ModelFieldType.Map
  })
)
export class TableMapFieldWidget extends BaseTableFieldWidget
```

**方法**：

#### **handleValue**

+ **功能描述**：将映射类型的值转换为 `IValue` 数组格式。
+ **类型**：`(value: any) => IValue[]`
+ **参数**：
  - `value`：待转换的映射值。
+ **返回值**：转换后的 `IValue` 数组，每个元素包含 `name`（键）和 `value`（值）。

#### **renderDefaultSlot**

+ **功能描述**：渲染默认插槽内容，将映射值格式化为带样式的键值对列表。
+ **类型**：`(context: any) => VNode[] | string`
+ **参数**：
  - `context`：行上下文，包含当前行数据。
+ **返回值**：格式化后的 VNode 数组，或空字符串（值为空时）。

## （十六）多对一（M2O）

### 1、TableM2ODownloadWidget{#quote8}

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: [ModelFieldType.ManyToOne, ModelFieldType.OneToMany, ModelFieldType.ManyToMany],
    widget: 'Upload'
  })
)
export class TableM2ODownloadWidget extends TableM2OFieldWidget
```

**方法**：

#### **renderDefaultSlot**

+ **功能描述**：渲染默认插槽内容，将关联资源转换为可下载的链接列表。
+ **类型**：`(context: RowContext) => VNode[] | string`
+ **参数**：
  - `context`：行上下文，包含当前行数据。
+ **返回值**：生成的链接组件 VNode 数组，或空数组（值为空时）。

### 2、TableM2OUploadImgFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: ModelFieldType.ManyToOne,
    widget: 'UploadImg'
  })
)
export class TableM2OUploadImgFieldWidget extends BaseTableFieldWidget
```

**方法**：

#### **renderDefaultSlot**

+ **功能描述**：渲染默认插槽内容，将多对一关联的图片资源转换为图片组件。
+ **类型**：`(context: any) => VNode[] | string`
+ **参数**：
  - `context`：行上下文，包含当前行数据。
+ **返回值**：生成的图片组件 VNode 数组，或空数组（值为空时）。

### 3、TableM2OAddressFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: ModelFieldType.ManyToOne,
    widget: 'Address'
  })
)
export class TableM2OAddressFieldWidget extends TableM2OFieldWidget
```

**方法**：

#### **renderDefaultSlot**

+ **功能描述**：渲染默认插槽内容，将地址信息格式化为层级分明的字符串。
+ **类型**：`(context: RowContext) => VNode[] | string`
+ **参数**：
  - `context`：行上下文，包含当前行数据。
+ **返回值**：格式化后的地址字符串（国家 / 省份 / 城市 / 区县 / 街道 / 详细地址），或空字符串（值为空时）。

## （十七）一对多（O2M）

### 1、TableM2ODownloadWidget

**引用**：多对一（M2O）- [TableM2ODownloadWidget](#quote8)

## （十八）多对多（M2M）

### 1、TableM2ODownloadWidget

**引用**：多对一（M2O）- [TableM2ODownloadWidget](#quote8)

### 2、TableM2MUploadImgFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: ModelFieldType.ManyToMany,
    widget: 'UploadImg'
  })
)
export class TableM2MUploadImgFieldWidget extends BaseTableFieldWidget
```

**方法**：

#### **renderDefaultSlot**

+ **功能描述**：渲染默认插槽内容，将多对多关联的图片资源转换为图片组件。
+ **类型**：`(context: any) => VNode[] | string`
+ **参数**：
  - `context`：行上下文，包含当前行数据。
+ **返回值**：生成的图片组件 VNode 数组，或空数组（值为空时）。

## （十九）行内编辑组件

### 1、TableEditorTextFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  EditorFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: ModelFieldType.Text
  })
)
export class TableEditorTextFieldWidget extends FormTextFieldWidget
```

**属性**：

+ rows：文本框的行数，默认为 `1`。（`number`）

### 2、TableEditorDateTimeRangeFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  EditorFieldWidget.Token({
    viewType: ViewType.Table,
    widget: 'DateTimeRangePicker'
  })
)
export class TableEditorDateTimeRangeFieldWidget extends FormDateTimeRangeFieldWidget
```

**方法**：

#### **getInitializeComponent**

+ **功能描述**：获取初始化时使用的组件，默认为 `DefaultEditorDateTimeRangePicker`。
+ **类型**：`() => WidgetComponent`
+ **返回值**：默认的日期时间范围选择器组件。

### 3、TableEditorDateRangeFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  EditorFieldWidget.Token({
    viewType: ViewType.Table,
    widget: 'DateRangePicker'
  })
)
export class TableEditorDateRangeFieldWidget extends FormDateRangeFieldWidget
```

**方法**：

#### **getInitializeComponent**

+ **功能描述**：获取初始化时使用的组件，默认为 `DefaultEditorDateRangePicker`。
+ **类型**：`() => WidgetComponent`
+ **返回值**：默认的日期范围选择器组件。

### 4、TableEditorTimeRangeFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  EditorFieldWidget.Token({
    viewType: ViewType.Table,
    widget: 'TimeRangePicker'
  })
)
export class TableEditorTimeRangeFieldWidget extends FormTimeRangeFieldWidget
```

**方法**：

#### **getInitializeComponent**

+ **功能描述**：获取初始化时使用的组件，默认为 `DefaultEditorTimeRangePicker`。
+ **类型**：`() => WidgetComponent`
+ **返回值**：默认的时间范围选择器组件。

### 5、TableEditorYearRangeFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  EditorFieldWidget.Token({
    viewType: ViewType.Table,
    widget: 'YearRangePicker'
  })
)
export class TableEditorYearRangeFieldWidget extends FormYearRangeFieldWidget
```

**方法**：

#### **getInitializeComponent**

+ **功能描述**：获取初始化时使用的组件，默认为 `DefaultEditorYearRangePicker`。
+ **类型**：`() => WidgetComponent`
+ **返回值**：默认的年份范围选择器组件。

### 6、TableEditorM2OAddressFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  EditorFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: ModelFieldType.ManyToOne,
    widget: 'Address'
  })
)
export class TableEditorM2OAddressFieldWidget extends FormM2OAddressFieldWidget
```

## （二十）列组件

### 1、TableCheckboxColumnWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    widget: ['checkbox-column', 'CheckboxColumn', 'checkboxColumn']
  })
)
export class TableCheckboxColumnWidget extends BaseTableColumnWidget
```

**属性**：

+ align：列对齐方式，默认为 `center`。（`string`）
+ columnType：列类型，默认为 `checkbox`。（`string`）
+ fixed：列固定位置，默认为 `left`。（`string`）
+ minWidth：列最小宽度，默认为 `52`。（`number`）
+ width：列宽度，默认为 `52`。（`number`）

**方法**：

#### **className**

+ **功能描述**：获取单元格的类名。
+ **类型**：`(context: RenderCellContext) => string`
+ **参数**：
  - `context`：渲染单元格的上下文信息。
+ **返回值**：单元格的类名，默认为 `table-column-checkbox`。

#### **headerClassName**

+ **功能描述**：获取表头单元格的类名。
+ **类型**：`(context: RenderCellContext) => string`
+ **参数**：
  - `context`：渲染单元格的上下文信息。
+ **返回值**：表头单元格的类名，默认为 `table-header-column-checkbox`。

### 2、TableColgroupColumnWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    widget: ['colgroup']
  })
)
export class TableColgroupColumnWidget extends BaseElementWidget
```

**属性**：

+ align：列对齐方式。（`string`）
+ columnType：列类型。（`string`）
+ existExpandRow：是否存在展开行，通过注入获取。（`boolean | undefined`）
+ fixed：列固定位置。（`string | boolean | undefined`）
+ footerAlign：页脚对齐方式。（`string`）
+ headerAlign：表头对齐方式。（`string`）
+ invisible：列是否不可见，基于客户端支持和 DSL 配置。（`boolean`）
+ label：列标签。（`string`）
+ minWidth：列最小宽度。（`string | number | undefined`）
+ required：列是否为必填项。（`boolean`）
+ width：列宽度。（`string | number | undefined`）
+ clientInvisible：客户端是否不支持当前列，值为 `!this.isSupportCurrentClient`。（`boolean`）

**方法**：

#### **className**

+ **功能描述**：获取单元格的类名。
+ **类型**：`(context: RenderCellContext) => string | string[] | undefined`
+ **参数**：
  - `context`：渲染单元格的上下文信息。
+ **返回值**：单元格的类名。

#### **footerClassName**

+ **功能描述**：获取页脚单元格的类名。
+ **类型**：`(context: RenderCellContext) => string | string[] | undefined`
+ **参数**：
  - `context`：渲染单元格的上下文信息。
+ **返回值**：页脚单元格的类名。

#### **headerClassName**

+ **功能描述**：获取表头单元格的类名。
+ **类型**：`(context: RenderCellContext) => string | string[] | undefined`
+ **参数**：
  - `context`：渲染单元格的上下文信息。
+ **返回值**：表头单元格的类名。

### 3、TableExpandColumnWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    widget: ['expand-column', 'ExpandColumn', 'expandColumn']
  })
)
export class TableExpandColumnWidget extends BaseTableColumnWidget
```

**属性**：

+ align：列对齐方式，默认为 `center`。（`string`）
+ columnType：列类型，默认为  `expand`。（`string`）
+ defaultAllInvisible：默认所有行不可见，值为 `true`。（`boolean`）
+ expandContext：展开上下文，通过注入获取。（`Record<string, unknown> | undefined`）
+ expandDslDefinition：展开 DSL 定义。（`DslDefinition | undefined`）
+ expandField：展开字段。（`RuntimeRelationField | undefined`）
+ expandModel：展开模型。（`RuntimeModel | undefined`）
+ expandOperationField：展开操作字段。（`string | undefined`）
+ fixed：列固定位置，默认为 `left`。（`string`）
+ invisible：列是否不可见，基于父级不可见状态或无展开 DSL 定义。（`boolean`）
+ minWidth：列最小宽度，默认为 `52`。（`number`）
+ parentRefreshCallChaining：父级刷新钩子，通过注入获取。（`CallChaining | undefined`）
+ resizable：列是否可调整宽度，存在展开操作字段时为 `false`。（`boolean | undefined`）
+ width：列宽度，存在展开操作字段时为 `0`，否则默认为 `52`。（`number`）
+ mountedCallChaining：挂载钩子，提供响应式注入。（`CallChaining | undefined`）
+ refreshCallChaining：刷新钩子，提供响应式注入。（`CallChaining | undefined`）
+ dataSource：数据源，默认为 `undefined`。（`undefined`）

**方法**：

#### **className**

+ **功能描述**：获取单元格类名，包含展开列样式及操作字段隐藏逻辑。
+ **类型**：`(context: RenderCellContext) => string`
+ **参数**：
  - `context`：渲染单元格的上下文信息。
+ **返回值**：拼接后的类名字符串。

#### **executeExpressionByParameters**

+ **功能描述**：根据参数执行表达式。
+ **类型**：`<T>(parameters: Partial<ExpressionRunParam>, expression: string, errorValue?: T) => T | string | undefined`
+ **参数**：
  - `parameters`：表达式运行参数。
  - `expression`：待执行的表达式字符串。
  - `errorValue`：表达式执行失败时的默认值。
+ **返回值**：表达式执行结果或默认值。

#### **getExpandDslDefinition**

+ **功能描述**：获取展开 DSL 定义。
+ **类型**：`(context?: RowContext) => DslDefinition | undefined`
+ **参数**：
  - `context`：行上下文（可选）。
+ **返回值**：展开 DSL 定义或 `undefined`。

#### **getExpandModel**

+ **功能描述**：获取展开模型，默认返回当前模型。
+ **类型**：`() => RuntimeModel`
+ **返回值**：展开模型实例。

#### **getExpandField**

+ **功能描述**：获取展开字段。
+ **类型**：`() => RuntimeRelationField | undefined`
+ **返回值**：展开字段或 `undefined`。

#### **loadData**

+ **功能描述**：加载展开行数据，处理关联字段数据格式。
+ **类型**：`(context: RowContext) => ExpandColumnLoadedData`
+ **参数**：
  - `context`：行上下文。
+ **返回值**：包含数据源和记录的对象。

#### **renderContentSlot**

+ **功能描述**：渲染展开列内容插槽，基于展开 DSL 定义生成 VNode。
+ **类型**：`(context: RowContext) => VNode[] | string`
+ **参数**：
  - `context`：行上下文。
+ **返回值**：生成的 VNode 数组或空字符串。

#### **setExpandDslDefinition**

+ **功能描述**：设置展开 DSL 定义。
+ **类型**：`(expandDslDefinition: DslDefinition | undefined) => void`
+ **参数**：
  - `expandDslDefinition`：待设置的 DSL 定义。

#### **setExpandModel**

+ **功能描述**：设置展开模型。
+ **类型**：`(expandModel: RuntimeModel | undefined) => void`
+ **参数**：
  - `expandModel`：待设置的模型实例。

#### **setExpandField**

+ **功能描述**：设置展开字段。
+ **类型**：`(expandField: RuntimeRelationField | undefined) => void`
+ **参数**：
  - `expandField`：待设置的展开字段。

### 4、TableOperationColumnWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    widget: ['operation-column', 'OperationColumn', 'OperationColumn', 'TableOperationColumnWidget']
  })
)
export class TableOperationColumnWidget extends BaseTableColumnWidget
```

**属性**：

+ direction：操作列方向，优先从 DSL 配置获取，否则使用注入值。（`OperationColumnDirection | undefined`）
+ invisible：操作列是否不可见，基于 DSL 配置或模板是否有操作。（`boolean`）
+ itemData：固定为 `$$internalOperator`。（`string`）
+ minWidth：最小宽度，默认获取主题配置值 `120`。（`string | number | undefined`）
+ operatorColumnDirection：操作列方向，通过注入获取。（`OperationColumnDirection | undefined`）
+ operatorColumnWidth：操作列宽度，通过注入获取。（`number | string | undefined`）
+ userPrefer：用户表格偏好配置，通过注入获取。（`UserTablePrefer | undefined`）
+ width：列宽度，优先用户配置，否则基于注入值或主题配置 `165`。（`number`）

**方法**：

#### **headerClassName**

+ **功能描述**：获取表头单元格类名，拼接基础类名与父类结果。
+ **类型**：`(context: RenderCellContext) => string | string[] | undefined`
+ **参数**：
  - `context`：渲染单元格的上下文信息。
+ **返回值**：拼接后的类名数组或字符串。

### 5、TableRadioColumnWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    widget: ['radio-column', 'RadioColumn', 'radioColumn']
  })
)
export class TableRadioColumnWidget extends BaseTableColumnWidget
```

**属性**：

+ align：列对齐方式，默认为 `center`。（`string`）
+ columnType：列类型，默认为 `radio`。（`string`）
+ fixed：列固定位置，默认为 `left`。（`string`）
+ minWidth：列最小宽度，默认为 `52`。（`number`）
+ width：列宽度，默认为 `52`。（`number`）

**方法**：

#### **className**

+ **功能描述**：获取单元格的类名。
+ **类型**：`(context: RenderCellContext) => string`
+ **参数**：
  - `context`：渲染单元格的上下文信息。
+ **返回值**：单元格的类名，默认为 `table-column-radio`。

#### **headerClassName**

+ **功能描述**：获取表头单元格的类名。
+ **类型**：`(context: RenderCellContext) => string`
+ **参数**：
  - `context`：渲染单元格的上下文信息。
+ **返回值**：表头单元格的类名，默认为 `table-header-column-radio`。

### 6、TableSequenceColumnWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    widget: ['sequence-column', 'SequenceColumn', 'sequenceColumn']
  })
)
export class TableSequenceColumnWidget extends BaseTableColumnWidget
```

**属性**：

+ align：列对齐方式，默认为 `center`。（`string`）
+ columnType：列类型，默认为 `seq`。（`string`）
+ fixed：列固定位置，默认为 `left`。（`string`）
+ label：列标签，默认为翻译后的「序号」。（`string`）
+ minWidth：列最小宽度，默认为 `52`。（`number`）
+ width：列宽度，默认为 `52`。（`number`）

**方法**：

#### **className**

+ **功能描述**：获取单元格的类名。
+ **类型**：`(context: RenderCellContext) => string`
+ **参数**：
  - `context`：渲染单元格的上下文信息。
+ **返回值**：单元格的类名，默认为 `table-column-sequence`。

#### **headerClassName**

+ **功能描述**：获取表头单元格的类名。
+ **类型**：`(context: RenderCellContext) => string`
+ **参数**：
  - `context`：渲染单元格的上下文信息。
+ **返回值**：表头单元格的类名，默认为 `table-header-column-sequence`。

