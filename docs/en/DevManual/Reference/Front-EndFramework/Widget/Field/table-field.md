---
title: Table Field
index: true
category:
  - R&D Manual
  - Reference
  - Front-end API
  - Widget
  - Field
order: 1
prev:
  text: Field
  link: /en/DevManual/Reference/Front-EndFramework/Widget/Field/README.md
---
# Ⅰ、Reference List

## （Ⅰ）Text (String)

### 1、TableStringFieldWidget{#quote5}

**Type Declaration**:

``` typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: [ModelFieldType.String, ModelFieldType.Phone, ModelFieldType.Email]
  })
)
export class TableStringFieldWidget extends BaseTableFieldWidget<string>
```

**Properties**:

+ type: Field type. (`string`)

**Methods**:

#### **compute**

+ **Function Description**: Calculate the field value based on the context, and encrypt it if the type is a password.
+ **Type**: `(context: any) => string | undefined`
+ **Parameters**:
  - `context`: Calculation context.
+ **Return Value**: The calculated field value, or ciphertext if it is a password type.

### 2、TableStringColorPickerFieldWidget

**Type Declaration**:

``` typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: ModelFieldType.String,
    widget: 'ColorPicker'
  })
)
export class TableStringColorPickerFieldWidget extends BaseTableFieldWidget
```

**Methods**:

#### **renderDefaultSlot**

+ **Function Description**: Render the default slot content and create a color picker component based on the calculated value.
+ **Type**: `(context: any) => VNode[]`
+ **Parameters**:
  - `context`: Calculation context.
+ **Return Value**: An array of VNodes for the color picker component, or an empty array if there is no value.

### 3、TableStringHyperlinksFieldWidget

**Type Declaration**:

``` typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: ModelFieldType.String,
    widget: 'Hyperlinks'
  })
)
export class TableStringHyperlinksFieldWidget extends BaseTableFieldWidget
```

**Properties**:

+ defaultValue: Default value. (`string`)
+ target: Link opening method. (`RedirectTargetEnum`)
+ text: Link display text. (`string`)

**Methods**:

#### **renderDefaultSlot**

+ **Function Description**: Render the default slot content and create a text element with a link.
+ **Type**: `(context: any) => VNode[] | string`
+ **Parameters**:
  - `context`: Calculation context.
+ **Return Value**: An array of VNodes containing the link element.

### 4、TableStringMediaPlayerFieldWidget

**Type Declaration**:

``` typescript
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

**Type Declaration**:

``` typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: [ModelFieldType.String, ModelFieldType.Text],
    multi: true
  })
)
export class TableStringTagFieldWidget extends BaseTableFieldWidget
```

**Methods**:

#### **renderDefaultSlot**

+ **Function Description**: Render the default slot content and convert the array value into a tag list.
+ **Type**: `(context: any) => VNode[] | string`
+ **Parameters**:
  - `context`: Calculation context.
+ **Return Value**: An array of VNodes containing tag elements, or an empty string if there is no value.

### 6、TableStringUploadWidget{#quote1}

**Type Declaration**:

``` typescript
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

**Properties**:

+ cdnKey: CDN key. (`string | undefined`)
+ privateLink: Whether it is a private link. (`boolean`)

**Methods**:

#### **renderDefaultSlot**

+ **Function Description**: Render the default slot content and create an upload component.
+ **Type**: `(context: any) => VNode[]`
+ **Parameters**:
  - `context`: Calculation context.
+ **Return Value**: An array of VNodes for the upload component, or an empty array if there is no value.

### 7、TableStringUploadImageFieldWidget{#quote2}

**Type Declaration**:

``` typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    widget: 'UploadImg',
    ttype: [ModelFieldType.String, ModelFieldType.Text]
  })
)
export class TableStringUploadImageFieldWidget extends BaseTableFieldWidget
```

**Methods**:

#### **renderDefaultSlot**

+ **Function Description**: Render the default slot content and create an image preview component.
+ **Type**: `(context: any) => VNode[]`
+ **Parameters**:
  - `context`: Calculation context.
+ **Return Value**: An array of VNodes for the image preview component, or an empty array if there is no value.

### 8、TableStringMultiUploadWidget{#quote3}

**Type Declaration**:

``` typescript
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

**Properties**:

+ cdnKey: CDN key. (`string | undefined`)
+ privateLink: Whether it is a private link. (`boolean`)

**Methods**:

#### **renderDefaultSlot**

+ **Function Description**: Render the default slot content and create a multi-file upload component.
+ **Type**: `(context: any) => VNode[] | string`
+ **Parameters**:
  - `context`: Calculation context.
+ **Return Value**: An array of VNodes for the multi-file upload component, or an empty array if there is no value.

### 9、TableStringMultiUploadImageFieldWidget{#quote4}

**Type Declaration**:

``` typescript
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

+ **Function Description**: Render the default slot content and create a multi-image upload component.
+ **Type**: `(context: any) => VNode[]`
+ **Parameters**:
  - `context`: Calculation context.
+ **Return Value**: An array of VNodes for the multi-image upload component, or an empty array if there is no value.

## （Ⅱ）Multi-line Text (Text)

### 1、TableTextFieldWidget

**Type Declaration**:

``` typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: ModelFieldType.Text
  })
)
export class TableTextFieldWidget extends TableStringFieldWidget
```

#### **renderDefaultSlot**

+ **Function Description**: Render the default slot content and create a text display component.
+ **Type**: `(context: RowContext) => VNode[] | string`
+ **Parameters**:
  - `context`: Row context.
+ **Return Value**: An array of VNodes for the text display component.

### 2、TableStringUploadWidget

**Reference**: Text (String) - [TableStringUploadWidget](#quote1)

### 3、TableStringUploadImageFieldWidget

**Reference**: Text (String) - [TableStringUploadImageFieldWidget](#quote2)

### 4、TableStringMultiUploadWidget

**Reference**: Text (String) - [TableStringMultiUploadWidget](#quote3)

### 5、TableStringMultiUploadImageFieldWidget

**Reference**: Text (String) - [TableStringMultiUploadImageFieldWidget](#quote4)

## （Ⅲ）Rich Text (Html)

### 1、TableHtmlRichTextFieldWidget

**Type Declaration**:

``` typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: ModelFieldType.HTML
  })
)
export class TableHtmlRichTextFieldWidget extends BaseTableFieldWidget
```

**Properties**:

+ title: Rich text title. (`string`)

**Methods**:

#### **renderDefaultSlot**

+ **Function Description**: Render the default slot content and create a rich text display component.
+ **Type**: `(context: any) => VNode[]`
+ **Parameters**:
  - `context`: Calculation context.
+ **Return Value**: An array of VNodes for the rich text display component.

## （Ⅳ）Phone (Phone)

### 1、TableStringFieldWidget

**Reference**: Text (String) - [TableStringFieldWidget](#quote5)

## （Ⅴ）Email (Email)

### 1、TableStringFieldWidget

**Reference**: Text (String) - [TableStringFieldWidget](#quote5)

## （Ⅵ）Integer (Integer)

### 1、TableNumberWidget{#quote6}

**Type Declaration**:

``` typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: [ViewType.Table],
    ttype: [ModelFieldType.Integer, ModelFieldType.Long, ModelFieldType.Float]
  })
)
export class TableNumberWidget extends BaseTableFieldWidget<string | number, RuntimeNumberField>
```

**Methods**:

#### **getPrecision**

+ **Function Description**: Get the numeric precision configuration, giving priority to the decimal configuration in the DSL. If not configured, try to get it from the field properties.
+ **Type**: `(context: RowContext) => number | null | undefined`
+ **Parameters**:
  - `context`: Row context.
+ **Return Value**: Numeric precision, which may be a number, `null`, or `undefined`.

#### **getShowThousandth**

+ **Function Description**: Get the configuration of whether to display thousandths, with the default being `false`.
+ **Type**: `(context: RowContext) => boolean`
+ **Parameters**:
  - `context`: Row context.
+ **Return Value**: A boolean value indicating whether to display thousandths.

#### **renderDefaultSlot**

+ **Function Description**: Render the default slot content, display the numeric value after zero padding and thousandth formatting.
+ **Type**: `(context: RowContext) => VNode[] | string`
+ **Parameters**:
  - `context`: Row context.
+ **Return Value**: A formatted numeric string or an array of rendering nodes.

### 2、TableMultiNumberWidget{#quote7}

**Type Declaration**:

``` typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: [ModelFieldType.Integer, ModelFieldType.Float, ModelFieldType.Currency],
    multi: true
  })
)
export class TableMultiNumberWidget extends TableStringTagFieldWidget
```

## （Ⅶ）Floating Point (Float)

### 1、TableNumberWidget

**Reference**: Integer (Integer) - [TableNumberWidget](#quote6)

### 2、TableMultiNumberWidget

**Reference**: Integer (Integer) - [TableMultiNumberWidget](#quote7)

## （Ⅷ）Amount (Money)

### 1、TableCurrencyFieldWidget

**Type Declaration**:

``` typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: [ViewType.Table],
    ttype: [ModelFieldType.Currency]
  })
)
export class TableCurrencyFieldWidget extends TableNumberWidget
```

### 2、TableMultiNumberWidget

**Reference**: Integer (Integer) - [TableMultiNumberWidget](#quote7)

## （Ⅸ）Boolean (Boolean)

### 1、TableBooleanFieldWidget

**Type Declaration**:

``` typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: ModelFieldType.Boolean
  })
)
export class TableBooleanFieldWidget extends BaseTableFieldWidget<boolean | string>
```

**Methods**:

#### **renderDefaultSlot**

+ **Function Description**: Render the default slot content and convert the boolean value into corresponding text for display.
+ **Type**: `(context: RowContext) => VNode[] | string`
+ **Parameters**:
  - `context`: Row context.
+ **Return Value**: The text description corresponding to the boolean value, or a tag converted according to the option configuration.

### 2、TableBooleanSelectFieldWidget

**Type Declaration**:

``` typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: ModelFieldType.Boolean,
    widget: ['Select', 'radio']
  })
)
export class TableBooleanSelectFieldWidget extends BaseTableFieldWidget<string | string[], RuntimeEnumerationField>
```

**Properties**:

+ optionColor: Whether to enable the colorful option style. (`boolean`)
+ optionColorStyle: Option color style, with the default being `COLORFUL`. (`OptionColorStyle`)
+ options: Option list. (`RuntimeEnumerationOption[]`)

**Methods**:

#### **renderDefaultSlot**

+ **Function Description**: Render the default slot content and create an enumeration value display component.
+ **Type**: `(context: RowContext) => VNode[] | string`
+ **Parameters**:
  - `context`: Row context.
+ **Return Value**: An array of VNodes for the enumeration value display component.

### 3、TableBooleanSwitchFieldWidget

**Type Declaration**:

``` typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: ModelFieldType.Boolean,
    widget: ['Switch', 'TableSwitch']
  })
)
export class TableBooleanSwitchFieldWidget extends BaseTableFieldWidget<boolean>
```

**Properties**:

+ falsyAction: Action to execute when the value is false. (`any`)
+ truthyAction: Action to execute when the value is true. (`any`)
+ visiblePopconfirm: Whether to display a confirmation pop-up window. (`boolean`)

**Methods**:

#### **renderDefaultSlot**

+ **Function Description**: Render the default slot content, generate a switch component and bind the state switching logic, supporting confirmation operations through Popconfirm.
+ **Type**: `(context: RowContext) => VNode[]`
+ **Parameters**:
  - `context`: Row context, including current row data and index information.
+ **Return Value**: An array of VNodes containing the switch component and confirmation pop-up window.

## （Ⅹ）Data Dictionary (Enum)

### 1、TableEnumFieldWidget

**Type Declaration**:

``` typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: ModelFieldType.Enum
  })
)
export class TableEnumFieldWidget extends BaseTableFieldWidget<string | string[], RuntimeEnumerationField>
```

**Properties**:

+ optionColor: Whether to enable the colorful option style. (`boolean`)
+ optionColorStyle: Option color style, with the default value being `OptionColorStyle.COLORFUL`. (`OptionColorStyle`)
+ options: Enumeration option list, with the default being an empty array. (`RuntimeEnumerationOption[]`)

**Methods**:

#### **getRenderOptions**

+ **Function Description**: Parse the display names and tags of enumeration options (dynamically calculate if they are expressions), and return the processed option array.
+ **Type**: `(context: RowContext) => RuntimeEnumerationOption[]`
+ **Parameters**:
  - `context`: Row context, including current row data.
+ **Return Value**: The processed enumeration option array.

#### **renderDefaultSlot**

+ **Function Description**: Render the default slot content and create an enumeration component bound to values, options, and style configurations.
+ **Type**: `(context: RowContext) => VNode[] | string`
+ **Parameters**:
  - `context`: Row context, including current row data and index information.
+ **Return Value**: An array of VNodes or a string for the enumeration component.

### 2、TableEnumSwitchFieldWidget

**Type Declaration**:

``` typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: ModelFieldType.Enum,
    widget: ['TableSwitch', 'EipTableSwitchEnum']
  })
)
export class TableEnumSwitchFieldWidget extends BaseTableFieldWidget<boolean>
```

**Properties**:

+ falsyAction: Action executed when the value is `false`. (`any`)
+ falsyValue: Enumeration value corresponding to the `false` state. (`any`)
+ truthyAction: Action executed when the value is `true`. (`any`)
+ truthyValue: Enumeration value corresponding to the `true` state. (`any`)
+ visiblePopconfirm: Whether to display a confirmation pop-up window, a responsive property. (`boolean`)

**Methods**:

#### **renderDefaultSlot**

+ **Function Description**: Render the default slot content, generate a switch component and bind the enumeration value switching logic, and confirm the operation through Popconfirm.
+ **Type**: `(context: RowContext) => VNode[]`
+ **Parameters**:
  - `context`: Row context, including current row data and index information.
+ **Return Value**: An array of VNodes containing the switch component and confirmation pop-up window.

## （Ⅺ）Time and Date (Datetime)

### 1、TableDateTimeFieldWidget

**Type Declaration**:

``` typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: ModelFieldType.DateTime
  })
)
export class TableDateTimeFieldWidget extends BaseTableFieldWidget<string | Date>
```

**Properties**:

+ format: Date and time format. (`string | undefined`)
+ hasDateFormat: Whether it includes the date format, with the default being `true`. (`boolean`)
+ hasTimeFormat: Whether it includes the time format, with the default being `true`. (`boolean`)
+ resourceDateTimeFormat: Resource date and time format configuration, asynchronously obtained during initialization. (`IResourceDateTimeFormat`)
+ valueFormat: Value format, with the default using `defaultFormat`. (`string`)

**Methods**:

#### **convertDateFormat**

+ **Function Description**: Convert the date format to the mapped format.
+ **Type**: `(format: string) => string | undefined`
+ **Parameters**:
  - `format`: The date format string to be converted.
+ **Return Value**: The converted mapped format string, or `undefined` if no match is found.

#### **convertFormat**

+ **Function Description**: Convert the general format to the mapped format.
+ **Type**: `(format: string) => string | undefined`
+ **Parameters**:
  - `format`: The format string to be converted.
+ **Return Value**: The converted mapped format string, or `undefined` if no match is found.

#### **convertTimeFormat**

+ **Function Description**: Convert the time format to the mapped format.
+ **Type**: `(format: string) => string | undefined`
+ **Parameters**:
  - `format`: The time format string to be converted.
+ **Return Value**: The converted mapped format string, or `undefined` if no match is found.

#### **getDateFormat**

+ **Function Description**: Obtain the date format configuration through expression calculation.
+ **Type**: `(context: RowContext) => string | undefined`
+ **Parameters**:
  - `context`: Row context, including current row data.
+ **Return Value**: The calculated date format string, or `undefined` if not configured.

#### **getDefaultDateFormat**

+ **Function Description**: Get the default date format (`defaultDateFormatKey`).
+ **Type**: `() => string | undefined`
+ **Return Value**: The default date format string.

#### **getDefaultTimeFormat**

+ **Function Description**: Get the default time format (`defaultTimeFormatKey`).
+ **Type**: `() => string | undefined`
+ **Return Value**: The default time format string.

#### **getTimeFormat**

+ **Function Description**: Obtain the time format configuration through expression calculation.
+ **Type**: `(context: RowContext) => string | undefined`
+ **Parameters**:
  - `context`: Row context, including current row data.
+ **Return Value**: The calculated time format string, or `undefined` if not configured.

#### **renderDefaultSlot**

+ **Function Description**: Render the default slot content, format the date and time value into a specified string, supporting dynamic format configuration and resource formatting.
+ **Type**: `(context: RowContext) => string`
+ **Parameters**:
  - `context`: Row context, including current row data.
+ **Return Value**: The formatted date and time string, or an empty string if the value is empty.

### 2、TableDateTimeRangeFieldWidget

**Type Declaration**:

``` typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Table,
    widget: 'DateTimeRangePicker'
  })
)
export class TableDateTimeRangeFieldWidget extends BaseTableQuickOperationColumnWidget
```

**Properties**:

+ dateFormat: Date format. (`string | undefined`)
+ endField: End field. (`RuntimeModelField`)
+ fieldWidgetMounted: Callback function when the component is mounted, obtained through dependency injection. (`(widget: BaseTableColumnWidget) => void | undefined`)
+ fieldWidgetUnmounted: Callback function when the component is unmounted, obtained through dependency injection. (`(widget: BaseTableColumnWidget) => void | undefined`)
+ format: Date and time format. (`string | undefined`)
+ hasDateFormat: Whether it includes the date format, with the default being `true`. (`boolean`)
+ hasTimeFormat: Whether it includes the time format, with the default being `true`. (`boolean`)
+ invisible: Whether to hide, taking the user preference or default value. (`boolean`)
+ itemData: Data item identifier. (`string`)
+ itemName: Data item name. (`string`)
+ minWidth: Minimum width, with the default being `'120'`. (`string`)
+ separator: Date range separator, with the default being `' ~ '`. (`string`)
+ startField: Start field. (`RuntimeModelField`)
+ userPrefer: User table preference configuration. (`UserTablePrefer | undefined`)
+ userPreferInvisible: Whether to hide according to user preferences. (`boolean`)
+ valueFormat: Value format, with the default using `defaultFormat`. (`string`)

**Methods**:

#### **convertDateFormat**

+ **Function Description**: Convert the date format to the mapped format.
+ **Type**: `(format: string) => string | undefined`
+ **Parameters**:
  - `format`: The date format string to be converted.
+ **Return Value**: The converted mapped format string, or `undefined` if no match is found.

#### **convertFormat**

+ **Function Description**: Convert the general format to the mapped format.
+ **Type**: `(format: string) => string | undefined`
+ **Parameters**:
  - `format`: The format string to be converted.
+ **Return Value**: The converted mapped format string, or `undefined` if no match is found.

#### **convertTimeFormat**

+ **Function Description**: Convert the time format to the mapped format.
+ **Type**: `(format: string) => string | undefined`
+ **Parameters**:
  - `format`: The time format string to be converted.
+ **Return Value**: The converted mapped format string, or `undefined` if no match is found.

#### **formatValue**

+ **Function Description**: Format the date value into a specified format string.
+ **Type**: `(value: Date | string | undefined, format: string) => string`
+ **Parameters**:
  - `value`: The date value to be formatted.
  - `format`: The target format string.
+ **Return Value**: The formatted string, or an empty string if the value is empty or unrecognizable.

#### **renderDefaultSlot**

+ **Function Description**: Render the default slot content, display the date range value, and support format configuration and separator display.
+ **Type**: `(context: RowContext) => VNode[] | string`
+ **Parameters**:
  - `context`: Row context, including current row data and index information.
+ **Return Value**: The formatted date range string or VNode array, or an empty string if the field is empty.

#### **renderEditSlot**

+ **Function Description**: Render the edit slot content.
+ **Type**: `(context: RowContext) => VNode[] | string`
+ **Parameters**:
  - `context`: Row context, including current row data and index information.
+ **Return Value**: An array of VNodes for the edit component, or an empty array if invisible or without a template.

## （Ⅻ）Date (Date)

### 1、TableDateFieldWidget

**Type Declaration**:

``` typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: ModelFieldType.Date
  })
)
export class TableDateFieldWidget extends TableDateTimeFieldWidget
```

**Properties**:

+ defaultFormat: Default date format, with the default being `YYYY-MM-DD`. (`string`)
+ hasTimeFormat: Whether it includes the time format, with the default being `false`. (`boolean`)
+ valueFormat: Value format, with the default being `YYYY-MM-DD`. (`string`)

**Methods**:

#### **convertFormat**

+ **Function Description**: Convert the date format to the mapped format (based on `DateFormatMap`).
+ **Type**: `(format: string) => string | undefined`
+ **Parameters**:
  - `format`: The date format string to be converted.
+ **Return Value**: The converted mapped format string, or `undefined` if no match is found.

#### **getDefaultTimeFormat**

+ **Function Description**: Get the default time format, always returning `undefined` (does not include time format).
+ **Type**: `() => undefined`

#### **getTimeFormat**

+ **Function Description**: Get the time format configuration, always returning `undefined` (does not include time format).
+ **Type**: `(context: any) => undefined`

### 2、TableDateRangeFieldWidget

**Type Declaration**:

``` typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Table,
    widget: 'DateRangePicker'
  })
)
export class TableDateRangeFieldWidget extends TableDateTimeRangeFieldWidget
```

**Properties**:

+ defaultFormat: Default date format, with the default being `YYYY-MM-DD`. (`string`)
+ hasTimeFormat: Whether it includes the time format, with the default being `false`. (`boolean`)
+ valueFormat: Value format, with the default being `YYYY-MM-DD`. (`string`)

**Methods**:

#### **convertFormat**

+ **Function Description**: Convert the date format to the mapped format (based on `DateFormatMap`).
+ **Type**: `(format: string) => string | undefined`
+ **Parameters**:
  - `format`: The date format string to be converted.
+ **Return Value**: The converted mapped format string, or `undefined` if no match is found.

## （XIII）Time (Time)

### 1、TableTimeFieldWidget

**Type Declaration**:

``` typescript
@SPI.ClassFactory(BaseFieldWidget.Token({ viewType: ViewType.Table, ttype: [ModelFieldType.Time] }))
export class TableTimeFieldWidget extends TableDateTimeFieldWidget
```

**Properties**:

+ defaultFormat: Default time format, with the default being `YYYY-MM-DD`. (`string`)
+ hasDateFormat: Whether it includes the date format, with the default being `false`. (`boolean`)
+ valueFormat: Value format, with the default being `YYYY-MM-DD`. (`string`)

**Methods**:

#### **convertTimeFormat**

+ **Function Description**: Convert the time format to the mapped format (based on `TimeFormatMap`).
+ **Type**: `(format: string) => string | undefined`
+ **Parameters**:
  - `format`: The time format string to be converted.
+ **Return Value**: The converted mapped format string, or `undefined` if no match is found.

#### **getDateFormat**

+ **Function Description**: Get the date format.
+ **Type**: `(context: any) => undefined`

#### **getDefaultDateFormat**

+ **Function Description**: Get the default date format.
+ **Type**: `() => undefined`

### 2、TableTimeRangeFieldWidget

**Type Declaration**:

``` typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Table,
    widget: 'TimeRangePicker'
  })
)
export class TableTimeRangeFieldWidget extends TableDateTimeRangeFieldWidget
```

**Properties**:

+ defaultFormat: Default time format, with the default being `defaultTimeFormat`. (`string`)
+ hasDateFormat: Whether it includes the date format, with the default being `false`. (`boolean`)
+ valueFormat: Value format, with the default being `defaultTimeFormat`. (`string`)

**Methods**:

#### **convertTimeFormat**

+ **Function Description**: Convert the time format to the mapped format (based on `TimeFormatMap`).
+ **Type**: `(format: string) => string | undefined`
+ **Parameters**:
  - `format`: The time format string to be converted.
+ **Return Value**: The converted mapped format string, or `undefined` if no match is found.

## （XIV）Year (Year)

### 1、TableYearFieldWidget

**Type Declaration**:

``` typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: [ModelFieldType.Year]
  })
)
export class TableYearFieldWidget extends TableDateTimeFieldWidget
```

**Properties**:

+ defaultFormat: Default year format, with the default being `defaultYearFormat`. (`string`)
+ hasDateFormat: Whether it includes the date format, with the default being `false`. (`boolean`)
+ hasTimeFormat: Whether it includes the time format, with the default being `false`. (`boolean`)
+ valueFormat: Value format, with the default being `defaultYearValueFormat`. (`string`)

### 2、TableYearRangeFieldWidget

**Type Declaration**:

``` typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Table,
    widget: 'YearRangePicker'
  })
)
export class TableYearRangeFieldWidget extends TableDateTimeRangeFieldWidget
```

**Properties**:

+ defaultFormat: Default year format, with the default being `defaultYearFormat`. (`string`)
+ hasDateFormat: Whether it includes the date format, with the default being `false`. (`boolean`)
+ hasTimeFormat: Whether it includes the time format, with the default being `false`. (`boolean`)
+ valueFormat: Value format, with the default being `defaultYearValueFormat`. (`string`)

**Methods**:

#### **formatValue**

+ **Function Description**: Format the year value into a specified format, supporting automatic conversion of numeric types to strings.
+ **Type**: `(value: Date | string | number | undefined, format: string) => string`
+ **Parameters**:
  - `value`: The year value to be formatted (supports date, string, or numeric types).
  - `format`: The target format string.
+ **Return Value**: The formatted year string, processed by calling the parent class method.

## （XV）Key-Value Pair (Map)

### 1、TableMapFieldWidget

**Type Declaration**:

``` typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: ModelFieldType.Map
  })
)
export class TableMapFieldWidget extends BaseTableFieldWidget
```

**Methods**:

#### **handleValue**

+ **Function Description**: Convert the mapped type value into an array format of `IValue`.
+ **Type**: `(value: any) => IValue[]`
+ **Parameters**:
  - `value`: The mapped value to be converted.
+ **Return Value**: The converted array of `IValue`, each element containing `name` (key) and `value` (value).

#### **renderDefaultSlot**

+ **Function Description**: Render the default slot content and format the mapped value into a styled key-value pair list.
+ **Type**: `(context: any) => VNode[] | string`
+ **Parameters**:
  - `context`: Row context, including current row data.
+ **Return Value**: The formatted array of VNodes, or an empty string (when the value is empty).

## （XVI）Many-to-One (M2O)

### 1、TableM2ODownloadWidget{#quote8}

**Type Declaration**:

``` typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: [ModelFieldType.ManyToOne, ModelFieldType.OneToMany, ModelFieldType.ManyToMany],
    widget: 'Upload'
  })
)
export class TableM2ODownloadWidget extends TableM2OFieldWidget
```

**Methods**:

#### **renderDefaultSlot**

+ **Function Description**: Render the default slot content and convert associated resources into a list of downloadable links.
+ **Type**: `(context: RowContext) => VNode[] | string`
+ **Parameters**:
  - `context`: Row context, including current row data.
+ **Return Value**: The generated link component VNode array, or an empty array (when the value is empty).

### 2、TableM2OUploadImgFieldWidget

**Type Declaration**:

``` typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: ModelFieldType.ManyToOne,
    widget: 'UploadImg'
  })
)
export class TableM2OUploadImgFieldWidget extends BaseTableFieldWidget
```

**Methods**:

#### **renderDefaultSlot**

+ **Function Description**: Render the default slot content and convert the many-to-one associated image resources into image components.
+ **Type**: `(context: any) => VNode[] | string`
+ **Parameters**:
  - `context`: Row context, including current row data.
+ **Return Value**: The generated image component VNode array, or an empty array (when the value is empty).

### 3、TableM2OAddressFieldWidget

**Type Declaration**:

``` typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: ModelFieldType.ManyToOne,
    widget: 'Address'
  })
)
export class TableM2OAddressFieldWidget extends TableM2OFieldWidget
```

**Methods**:

#### **renderDefaultSlot**

+ **Function Description**: Render the default slot content and format the address information into a hierarchical string.
+ **Type**: `(context: RowContext) => VNode[] | string`
+ **Parameters**:
  - `context`: Row context, including current row data.
+ **Return Value**: The formatted address string (Country / Province / City / District / Street / Detailed Address), or an empty string (when the value is empty).

## （XVII）One-to-Many (O2M)

### 1、TableM2ODownloadWidget

**Reference**: Many-to-One (M2O) - [TableM2ODownloadWidget](#quote8)

## （XVIII）Many-to-Many (M2M)

### 1、TableM2ODownloadWidget

**Reference**: Many-to-One (M2O) - [TableM2ODownloadWidget](#quote8)

### 2、TableM2MUploadImgFieldWidget

**Type Declaration**:

``` typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: ModelFieldType.ManyToMany,
    widget: 'UploadImg'
  })
)
export class TableM2MUploadImgFieldWidget extends BaseTableFieldWidget
```

**Methods**:

#### **renderDefaultSlot**

+ **Function Description**: Render the default slot content and convert the many-to-many associated image resources into image components.
+ **Type**: `(context: any) => VNode[] | string`
+ **Parameters**:
  - `context`: Row context, including current row data.
+ **Return Value**: The generated image component VNode array, or an empty array (when the value is empty).

## （XIX）Inline Editing Components

### 1、TableEditorTextFieldWidget

**Type Declaration**:

``` typescript
@SPI.ClassFactory(
  EditorFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: ModelFieldType.Text
  })
)
export class TableEditorTextFieldWidget extends FormTextFieldWidget
```

**Properties**:

+ rows: Number of rows in the text box, with the default being `1`. (`number`)

### 2、TableEditorDateTimeRangeFieldWidget

**Type Declaration**:

``` typescript
@SPI.ClassFactory(
  EditorFieldWidget.Token({
    viewType: ViewType.Table,
    widget: 'DateTimeRangePicker'
  })
)
export class TableEditorDateTimeRangeFieldWidget extends FormDateTimeRangeFieldWidget
```

**Methods**:

#### **getInitializeComponent**

+ **Function Description**: Get the component used during initialization, which is `DefaultEditorDateTimeRangePicker` by default.
+ **Type**: `() => WidgetComponent`
+ **Return Value**: The default date and time range picker component.

### 3、TableEditorDateRangeFieldWidget

**Type Declaration**:

``` typescript
@SPI.ClassFactory(
  EditorFieldWidget.Token({
    viewType: ViewType.Table,
    widget: 'DateRangePicker'
  })
)
export class TableEditorDateRangeFieldWidget extends FormDateRangeFieldWidget
```

**Methods**:

#### **getInitializeComponent**

+ **Function Description**: Get the component used during initialization, which is `DefaultEditorDateRangePicker` by default.
+ **Type**: `() => WidgetComponent`
+ **Return Value**: The default date range picker component.

### 4、TableEditorTimeRangeFieldWidget

**Type Declaration**:

``` typescript
@SPI.ClassFactory(
  EditorFieldWidget.Token({
    viewType: ViewType.Table,
    widget: 'TimeRangePicker'
  })
)
export class TableEditorTimeRangeFieldWidget extends FormTimeRangeFieldWidget
```

**Methods**:

#### **getInitializeComponent**

+ **Function Description**: Get the component used during initialization, which is `DefaultEditorTimeRangePicker` by default.
+ **Type**: `() => WidgetComponent`
+ **Return Value**: The default time range picker component.

### 5、TableEditorYearRangeFieldWidget

**Type Declaration**:

``` typescript
@SPI.ClassFactory(
  EditorFieldWidget.Token({
    viewType: ViewType.Table,
    widget: 'YearRangePicker'
  })
)
export class TableEditorYearRangeFieldWidget extends FormYearRangeFieldWidget
```

**Methods**:

#### **getInitializeComponent**

+ **Function Description**: Get the component used during initialization, which is `DefaultEditorYearRangePicker` by default.
+ **Type**: `() => WidgetComponent`
+ **Return Value**: The default year range picker component.

### 6、TableEditorM2OAddressFieldWidget

**Type Declaration**:

``` typescript
@SPI.ClassFactory(
  EditorFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: ModelFieldType.ManyToOne,
    widget: 'Address'
  })
)
export class TableEditorM2OAddressFieldWidget extends FormM2OAddressFieldWidget
```

## （XX）Column Components

### 1、TableCheckboxColumnWidget

**Type Declaration**:

``` typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    widget: ['checkbox-column', 'CheckboxColumn', 'checkboxColumn']
  })
)
export class TableCheckboxColumnWidget extends BaseTableColumnWidget
```

**Properties**:

+ align: Column alignment, with the default being `center`. (`string`)
+ columnType: Column type, with the default being `checkbox`. (`string`)
+ fixed: Column fixed position, with the default being `left`. (`string`)
+ minWidth: Minimum column width, with the default being `52`. (`number`)
+ width: Column width, with the default being `52`. (`number`)

**Methods**:

#### **className**

+ **Function Description**: Get the class name of the cell.
+ **Type**: `(context: RenderCellContext) => string`
+ **Parameters**:
  - `context`: Context information for rendering the cell.
+ **Return Value**: The class name of the cell, which is `table-column-checkbox` by default.

#### **headerClassName**

+ **Function Description**: Get the class name of the header cell.
+ **Type**: `(context: RenderCellContext) => string`
+ **Parameters**:
  - `context`: Context information for rendering the cell.
+ **Return Value**: The class name of the header cell, which is `table-header-column-checkbox` by default.

### 2、TableColgroupColumnWidget

**Type Declaration**:

``` typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    widget: ['colgroup']
  })
)
export class TableColgroupColumnWidget extends BaseElementWidget
```

**Properties**:

+ align: Column alignment. (`string`)
+ columnType: Column type. (`string`)
+ existExpandRow: Whether there is an expandable row, obtained through injection. (`boolean | undefined`)
+ fixed: Column fixed position. (`string | boolean | undefined`)
+ footerAlign: Footer alignment. (`string`)
+ headerAlign: Header alignment. (`string`)
+ invisible: Whether the column is invisible, based on client support and DSL configuration. (`boolean`)
+ label: Column label. (`string`)
+ minWidth: Minimum column width. (`string | number | undefined`)
+ required: Whether the column is a required field. (`boolean`)
+ width: Column width. (`string | number | undefined`)
+ clientInvisible: Whether the client does not support the current column, with the value being `!this.isSupportCurrentClient`. (`boolean`)

**Methods**:

#### **className**

+ **Function Description**: Get the class name of the cell.
+ **Type**: `(context: RenderCellContext) => string | string[] | undefined`
+ **Parameters**:
  - `context`: Context information for rendering the cell.
+ **Return Value**: The class name of the cell.

#### **footerClassName**

+ **Function Description**: Get the class name of the footer cell.
+ **Type**: `(context: RenderCellContext) => string | string[] | undefined`
+ **Parameters**:
  - `context`: Context information for rendering the cell.
+ **Return Value**: The class name of the footer cell.

#### **headerClassName**

+ **Function Description**: Get the class name of the header cell.
+ **Type**: `(context: RenderCellContext) => string | string[] | undefined`
+ **Parameters**:
  - `context`: Context information for rendering the cell.
+ **Return Value**: The class name of the header cell.

### 3、TableExpandColumnWidget

**Type Declaration**:

``` typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    widget: ['expand-column', 'ExpandColumn', 'expandColumn']
  })
)
export class TableExpandColumnWidget extends BaseTableColumnWidget
```

**Properties**:

+ align: Column alignment, with the default being `center`. (`string`)
+ columnType: Column type, with the default being `expand`. (`string`)
+ defaultAllInvisible: Default all rows are invisible, with the value being `true`. (`boolean`)
+ expandContext: Expand context, obtained through injection. (`Record<string, unknown> | undefined`)
+ expandDslDefinition: Expand DSL definition. (`DslDefinition | undefined`)
+ expandField: Expand field. (`RuntimeRelationField | undefined`)
+ expandModel: Expand model. (`RuntimeModel | undefined`)
+ expandOperationField: Expand operation field. (`string | undefined`)
+ fixed: Column fixed position, with the default being `left`. (`string`)
+ invisible: Whether the column is invisible, based on the parent's invisible state or the absence of an expand DSL definition. (`boolean`)
+ minWidth: Minimum column width, with the default being `52`. (`number`)
+ parentRefreshCallChaining: Parent refresh hook, obtained through injection. (`CallChaining | undefined`)
+ resizable: Whether the column is resizable, with `false` when there is an expand operation field. (`boolean | undefined`)
+ width: Column width, with `0` when there is an expand operation field, otherwise the default is `52`. (`number`)
+ mountedCallChaining: Mounting hook, providing responsive injection. (`CallChaining | undefined`)
+ refreshCallChaining: Refresh hook, providing responsive injection. (`CallChaining | undefined`)
+ dataSource: Data source, with the default being `undefined`. (`undefined`)

**Methods**:

#### **className**

+ **Function Description**: Get the cell class name, including expand column styles and operation field hiding logic.
+ **Type**: `(context: RenderCellContext) => string`
+ **Parameters**:
  - `context`: Context information for rendering the cell.
+ **Return Value**: The concatenated class name string.

#### **executeExpressionByParameters**

+ **Function Description**: Execute the expression based on the parameters.
+ **Type**: `<T>(parameters: Partial<ExpressionRunParam>, expression: string, errorValue?: T) => T | string | undefined`
+ **Parameters**:
  - `parameters`: Expression operation parameters.
  - `expression`: The expression string to be executed.
  - `errorValue`: Default value when the expression execution fails.
+ **Return Value**: Expression execution result or default value.

#### **getExpandDslDefinition**

+ **Function Description**: Get the expand DSL definition.
+ **Type**: `(context?: RowContext) => DslDefinition | undefined`
+ **Parameters**:
  - `context`: Row context (optional).
+ **Return Value**: Expand DSL definition or `undefined`.

#### **getExpandModel**

+ **Function Description**: Get the expand model, which returns the current model by default.
+ **Type**: `() => RuntimeModel`
+ **Return Value**: Expand model instance.

#### **getExpandField**

+ **Function Description**: Get the expand field.
+ **Type**: `() => RuntimeRelationField | undefined`
+ **Return Value**: Expand field or `undefined`.

#### **loadData**

+ **Function Description**: Load expand row data and process the data format of related fields.
+ **Type**: `(context: RowContext) => ExpandColumnLoadedData`
+ **Parameters**:
  - `context`: Row context.
+ **Return Value**: An object containing the data source and records.

#### **renderContentSlot**

+ **Function Description**: Render the expand column content slot and generate VNodes based on the expand DSL definition.
+ **Type**: `(context: RowContext) => VNode[] | string`
+ **Parameters**:
  - `context`: Row context.
+ **Return Value**: The generated array of VNodes or an empty string.

#### **setExpandDslDefinition**

+ **Function Description**: Set the expand DSL definition.
+ **Type**: `(expandDslDefinition: DslDefinition | undefined) => void`
+ **Parameters**:
  - `expandDslDefinition`: The DSL definition to be set.

#### **setExpandModel**

+ **Function Description**: Set the expand model.
+ **Type**: `(expandModel: RuntimeModel | undefined) => void`
+ **Parameters**:
  - `expandModel`: The model instance to be set.

#### **setExpandField**

+ **Function Description**: Set the expand field.
+ **Type**: `(expandField: RuntimeRelationField | undefined) => void`
+ **Parameters**:
  - `expandField`: The expand field to be set.

### 4、TableOperationColumnWidget

**Type Declaration**:

``` typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    widget: ['operation-column', 'OperationColumn', 'OperationColumn', 'TableOperationColumnWidget']
  })
)
export class TableOperationColumnWidget extends BaseTableColumnWidget
```

**Properties**:

+ direction: Operation column direction, preferentially obtained from the DSL configuration, otherwise using the injected value. (`OperationColumnDirection | undefined`)
+ invisible: Whether the operation column is invisible, based on the DSL configuration or whether there are operations in the template. (`boolean`)
+ itemData: Fixed as `$$internalOperator`. (`string`)
+ minWidth: Minimum width, by default obtaining the theme configuration value `120`. (`string | number | undefined`)
+ operatorColumnDirection: Operation column direction, obtained through injection. (`OperationColumnDirection | undefined`)
+ operatorColumnWidth: Operation column width, obtained through injection. (`number | string | undefined`)
+ userPrefer: User table preference configuration, obtained through injection. (`UserTablePrefer | undefined`)
+ width: Column width, preferentially using user configuration, otherwise based on the injected value or theme configuration `165`. (`number`)

**Methods**:

#### **headerClassName**

+ **Function Description**: Get the header cell class name, concatenating the base class name with the parent class result.
+ **Type**: `(context: RenderCellContext) => string | string[] | undefined`
+ **Parameters**:
  - `context`: Context information for rendering the cell.
+ **Return Value**: The concatenated class name array or string.

### 5、TableRadioColumnWidget

**Type Declaration**:

``` typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    widget: ['radio-column', 'RadioColumn', 'radioColumn']
  })
)
export class TableRadioColumnWidget extends BaseTableColumnWidget
```

**Properties**:

+ align: Column alignment, with the default being `center`. (`string`)
+ columnType: Column type, with the default being `radio`. (`string`)
+ fixed: Column fixed position, with the default being `left`. (`string`)
+ minWidth: Minimum column width, with the default being `52`. (`number`)
+ width: Column width, with the default being `52`. (`number`)

**Methods**:

#### **className**

+ **Function Description**: Get the class name of the cell.
+ **Type**: `(context: RenderCellContext) => string`
+ **Parameters**:
  - `context`: Context information for rendering the cell.
+ **Return Value**: The class name of the cell, which is `table-column-radio` by default.

#### **headerClassName**

+ **Function Description**: Get the class name of the header cell.
+ **Type**: `(context: RenderCellContext) => string`
+ **Parameters**:
  - `context`: Context information for rendering the cell.
+ **Return Value**: The class name of the header cell, which is `table-header-column-radio` by default.

### 6、TableSequenceColumnWidget

**Type Declaration**:

``` typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    widget: ['sequence-column', 'SequenceColumn', 'sequenceColumn']
  })
)
export class TableSequenceColumnWidget extends BaseTableColumnWidget
```

**Properties**:

+ align: Column alignment, with the default being `center`. (`string`)
+ columnType: Column type, with the default being `seq`. (`string`)
+ fixed: Column fixed position, with the default being `left`. (`string`)
+ label: Column label, with the default being the translated "Serial Number". (`string`)
+ minWidth: Minimum column width, with the default being `52`. (`number`)
+ width: Column width, with the default being `52`. (`number`)

**Methods**:

#### **className**

+ **Function Description**: Get the class name of the cell.
+ **Type**: `(context: RenderCellContext) => string`
+ **Parameters**:
  - `context`: Context information for rendering the cell.
+ **Return Value**: The class name of the cell, which is `table-column-sequence` by default.

#### **headerClassName**

+ **Function Description**: Get the class name of the header cell.
+ **Type**: `(context: RenderCellContext) => string`
+ **Parameters**:
  - `context`: Context information for rendering the cell.
+ **Return Value**: The class name of the header cell, which is `table-header-column-sequence` by default.