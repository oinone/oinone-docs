---
title: Detail Field
index: true
category:
  - R&D Manual
  - Reference
  - Frontend API
  - Widget
  - Field
order: 4

---
# Reference List

## (一) String

### 1、DetailStringFieldWidget{#quote2}

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Detail,
    ttype: [ModelFieldType.String, ModelFieldType.Phone, ModelFieldType.Email]
  })
)
export class DetailStringFieldWidget extends FormInputAbstractFieldWidget
```

**Properties**:

+ currentValue: Current value, encrypted for password types.（`string | undefined`）
+ emptyStyle: Empty value style configuration.（`string | undefined`）

### 2、DetailStringColorPickerFieldWidget

**Type Declaration**:

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

**Properties**:

+ justifyContent: Content horizontal alignment configuration.（`string | undefined`）

### 3、DetailStringDownloadFieldWidget{#quote1}

**Type Declaration**:

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

**Type Declaration**:

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

**Properties**:

+ target: Link opening mode, supporting route redirection or new window opening, default value is `RedirectTargetEnum.BLANK`.（`RedirectTargetEnum`）
+ text: Hyperlink display text.（`string | undefined`）

### 5、DetailStringIframeFieldWidget

**Type Declaration**:

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

**Type Declaration**:

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

**Type Declaration**:

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

**Properties**:

+ showClearButton: Whether to display the clear button, default is `false`.（`boolean`）
+ showSaveButton: Whether to display the save button, default is `false`.（`boolean`）

### 8、DetailStringTagFieldWidget

**Type Declaration**:

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

**Properties**:

+ displayNameList: Displayed tag list, default is an empty array.（`string[] | { label: string }[]`）
+ optionColor: Whether to enable colorful tag styles, determined by `optionColorStyle`.（`boolean`）
+ optionColorStyle: Tag color style, default value is `OptionColorStyle.COLORFUL`.（`OptionColorStyle`）

### 9、DetailStringUploadFieldWidget

**Type Declaration**:

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

**Properties**:

+ cdnKey: CDN key (processed value).（`string | undefined`）
+ privateLink: Whether it is a private link.（`boolean`）

### 10、DetailStringUploadImgFieldWidget

**Type Declaration**:

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

## (二) Text

### 1、DetailCommonFieldWidget

**Type Declaration**:

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

**Reference**: String - [DetailStringDownloadFieldWidget](#quote1)

## (三) Html

### 1、DetailHtmlFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Detail],
    ttype: ModelFieldType.HTML
  })
)
export class DetailHtmlFieldWidget extends FormFieldWidget
```

**Properties**:

+ encode: Whether to encode HTML content, default value is `false`.（`boolean`）

## (四) Phone

### 1、DetailStringFieldWidget

**Reference**: String - [DetailStringFieldWidget](#quote2)

## (五) Email

### 1、DetailStringFieldWidget

**Reference**: String - [DetailStringFieldWidget](#quote2)

## (六) Integer

### 1、DetailNumberWidget{#quote3}

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Detail],
    ttype: [ModelFieldType.Integer, ModelFieldType.Long, ModelFieldType.Float, ModelFieldType.Currency]
  })
)
export class DetailNumberWidget extends FormNumberAbstractFieldWidget
```

**Properties**:

+ currentValue: Current value (processed), supporting zero padding and thousands formatting.（`string | undefined`）

## (七) Float

### 1、DetailNumberWidget

**Reference**: Integer - [DetailNumberWidget](#quote3)

## (八) Money

### 1、DetailNumberWidget

**Reference**: Integer - [DetailNumberWidget](#quote3)

## (九) Boolean

### 1、DetailBooleanFieldWidget

**Type Declaration**:

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

**Type Declaration**:

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

**Properties**:

+ displayNameList: Option display name list obtained based on the current value.（`{ label: string; value: any }[] | undefined`）
+ displayNameListStr: String form of the option display name list, separated by commas.（`string | undefined`）
+ optionColor: Whether to enable colorful option styles, determined by `optionColorStyle`.（`boolean`）
+ optionColorStyle: Option color style, default value is `OptionColorStyle.COLORFUL`.（`OptionColorStyle`）

## (十) Enum

### 1、DetailEnumFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Detail],
    ttype: ModelFieldType.Enum
  })
)
export class DetailEnumFieldWidget extends FormEnumFieldAbstractWidget<EnumerationValue>
```

**Properties**:

+ displayNameList: Enumeration option display name list obtained based on the current value.（`{ label: string; value: any }[] | undefined`）
+ displayNameListStr: String form of the enumeration option display name list, separated by commas.（`string | undefined`）

### 2、DetailEnumMultiFieldWidget

**Type Declaration**:

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

**Properties**:

+ displayNameList: Enumeration option display name list (multiple selection mode) obtained based on the current value.（`{ label: string; value: any }[] | undefined`）
+ displayNameListStr: String form of the enumeration option display name list, separated by commas.（`string | undefined`）

## (十一) Datetime

### 1、DetailDateTimeFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Detail,
    ttype: ModelFieldType.DateTime
  })
)
export class DetailDateTimeFieldWidget extends FormFieldWidget
```

**Properties**:

+ dateFormat: Date format, supporting expression parsing, default uses resource configuration.（`string | undefined`）
+ format: Original format configuration.（`string | undefined`）
+ hasDateFormat: Whether it contains a date format, default value is `true`.（`boolean`）
+ hasTimeFormat: Whether it contains a time format, default value is `true`.（`boolean`）
+ justifyContent: Content alignment.（`string | undefined`）
+ resourceDateTimeFormat: Date and time format resource object.（`IResourceDateTimeFormat`）
+ timeFormat: Time format, supporting expression parsing, default uses resource configuration.（`string | undefined`）
+ valueFormat: Value format.（`string | undefined`）

**Methods**:

#### **convertDateFormat**

+ **Function Description**: Convert the date format to a standard format.
+ **Type**: `(format: string) => string | undefined`
+ **Parameters**:
  - `format`: Date format to be converted.
+ **Return Value**: Converted date format or `undefined`.

#### **convertFormat**

+ **Function Description**: Convert the general format to a standard format.
+ **Type**: `(format: string) => string | undefined`
+ **Parameters**:
  - `format`: General format to be converted.
+ **Return Value**: Converted format or `undefined`.

#### **convertTimeFormat**

+ **Function Description**: Convert the time format to a standard format.
+ **Type**: `(format: string) => string | undefined`
+ **Parameters**:
  - `format`: Time format to be converted.
+ **Return Value**: Converted time format or `undefined`.

### 2、DetailDateTimeRangeFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Detail,
    widget: 'DateTimeRangePicker'
  })
)
export class DetailDateTimeRangeFieldWidget extends FormRangeFieldsWidget<StandardString>
```

**Properties**:

+ dateFormat: Date format, supporting expression parsing.（`string | undefined`）
+ defaultFormat: Default format.（`string`）
+ emptyStyle: Style configuration when empty.（`unknown`）
+ format: Original format configuration.（`string | undefined`）
+ hasDateFormat: Whether it contains a date format, default value is `true`.（`boolean`）
+ hasTimeFormat: Whether it contains a time format, default value is `true`.（`boolean`）
+ timeFormat: Time format, supporting expression parsing.（`string | undefined`）
+ valueFormat: Value format, default is `defaultFormat`.（`string`）

**Methods**:

#### **convertDateFormat**

+ **Function Description**: Convert the date format to a standard format.
+ **Type**: `(format: string) => string | undefined`
+ **Parameters**:
  - `format`: Date format to be converted.
+ **Return Value**: Converted date format or `undefined`.

#### **convertFormat**

+ **Function Description**: Convert the general format to a standard format.
+ **Type**: `(format: string) => string | undefined`
+ **Parameters**:
  - `format`: General format to be converted.
+ **Return Value**: Converted format or `undefined`.

#### **convertTimeFormat**

+ **Function Description**: Convert the time format to a standard format.
+ **Type**: `(format: string) => string | undefined`
+ **Parameters**:
  - `format`: Time format to be converted.
+ **Return Value**: Converted time format or `undefined`.

## (十二) Date

### 1、DetailDateFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Detail,
    ttype: ModelFieldType.Date
  })
)
export class DetailDateFieldWidget extends DetailDateTimeFieldWidget
```

**Properties**:

+ defaultFormat: Default date format.（`string`）
+ hasTimeFormat: Whether it contains a time format, default value is `false`.（`boolean`）
+ valueFormat: Value format, default is `defaultDateFormat`.（`string`）

**Methods**:

#### **convertFormat**

+ **Function Description**: Convert the date format to a standard format.
+ **Type**: `(format: string) => string | undefined`
+ **Parameters**:
  - `format`: Date format to be converted.
+ **Return Value**: Converted date or `undefined`.

### 2、DetailDateRangeFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Detail,
    widget: 'DateRangePicker'
  })
)
export class DetailDateRangeFieldWidget extends DetailDateTimeRangeFieldWidget
```

**Properties**:

+ defaultFormat: Default date format.（`string`）
+ hasTimeFormat: Whether it contains a time format, default value is `false`.（`boolean`）
+ valueFormat: Value format, default is `defaultDateFormat`.（`string`）

**Methods**:

#### **convertFormat**

+ **Function Description**: Convert the date format to a standard format.
+ **Type**: `(format: string) => string | undefined`
+ **Parameters**:
  - `format`: Date format to be converted.
+ **Return Value**: Converted date or `undefined`.

## (十三) Time

### 1、DetailTimeFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Detail,
    ttype: ModelFieldType.Time
  })
)
export class DetailTimeFieldWidget extends DetailDateTimeFieldWidget
```

**Properties**:

+ defaultFormat: Default time format.（`string`）
+ hasDateFormat: Whether it contains a date format, default value is `false`.（`boolean`）
+ valueFormat: Value format, default is `defaultTimeFormat`.（`string`）

**Methods**:

#### **convertFormat**

+ **Function Description**: Convert the time format to a standard format.
+ **Type**: `(format: string) => string | undefined`
+ **Parameters**:
  - `format`: Time format to be converted.
+ **Return Value**: Converted time or `undefined`.

### 2、DetailTimeRangeFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Detail,
    widget: 'TimeRangePicker'
  })
)
export class DetailTimeRangeFieldWidget extends DetailDateTimeRangeFieldWidget
```

**Properties**:

+ defaultFormat: Default time format.（`string`）
+ hasDateFormat: Whether it contains a date format, default value is `false`.（`boolean`）
+ valueFormat: Value format, default is `defaultTimeFormat`.（`string`）

**Methods**:

#### **convertFormat**

+ **Function Description**: Convert the time format to a standard format.
+ **Type**: `(format: string) => string | undefined`
+ **Parameters**:
  - `format`: Time format to be converted.
+ **Return Value**: Converted time or `undefined`.

## (十四) Year

### 1、DetailYearFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Detail,
    ttype: ModelFieldType.Year
  })
)
export class DetailYearFieldWidget extends DetailDateTimeFieldWidget
```

**Properties**:

+ defaultFormat: Default year format.（`string`）
+ format: Format configuration, taken from DSL or default format.（`string | undefined`）
+ hasDateFormat: Whether it contains a date format, default value is `false`.（`boolean`）
+ hasTimeFormat: Whether it contains a time format, default value is `false`.（`boolean`）
+ valueFormat: Value format, default is `defaultYearValueFormat`.（`string`）

### 2、DetailYearRangeFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Detail,
    widget: 'YearRangePicker'
  })
)
export class DetailYearRangeFieldWidget extends DetailDateTimeRangeFieldWidget
```

**Properties**:

+ defaultFormat: Default year format.（`string`）
+ format: Format configuration, taken from DSL or default format.（`string | undefined`）
+ hasDateFormat: Whether it contains a date format, default value is `false`.（`boolean`）
+ hasTimeFormat: Whether it contains a time format, default value is `false`.（`boolean`）
+ valueFormat: Value format, default is `defaultYearValueFormat`.（`string`）

## (十五) Map

### 1、DetailMapFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Detail,
    ttype: ModelFieldType.Map
  })
)
export class DetailMapFieldWidget extends FormMapFieldWidget
```

## (十六) M2O

### 1、DetailM2OSelectFieldWidget

**Type Declaration**:

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

**Type Declaration**:

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

**Properties**:

+ cdnKey: CDN key.（`string | undefined`）
+ privateLink: Whether to use a private link.（`boolean`）

## (十七) O2M

### 1、DetailO2MSelectFieldWidget

**Type Declaration**:

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

**Properties**:

+ currentValue: Current value, an array returned after label processing of the original value.（`any[]`）

### 2、DetailO2MTableFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Detail,
    ttype: ModelFieldType.OneToMany
  })
)
export class DetailO2MTableFieldWidget extends FormSubviewListFieldWidget<RuntimeO2MField>
```

**Methods**:

#### **initSubviewData**

+ **Function Description**: Initialize subview data, generate filter conditions based on associated query conditions and set the data source.
+ **Type**: `() => ReturnPromise<void>`

#### **refreshValueProcess**

+ **Function Description**: Refresh value processing, only call the parent class method in data source provider mode.
+ **Type**: `() => Promise<void>`

## (十八) M2M

### 1、DetailM2MSelectFieldWidget

**Type Declaration**:

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

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Detail,
    ttype: ModelFieldType.ManyToMany
  })
)
export class DetailM2MTableFieldWidget extends FormSubviewListFieldWidget<RuntimeM2MField>
```

**Methods**:

#### **initSubviewData**

+ **Function Description**: Initialize subview data, generate query data based on many-to-many association and set the data source.
+ **Type**: `() => ReturnPromise<void>`

#### **refreshValueProcess**

+ **Function Description**: Refresh value processing, only call the parent class method in data source provider mode.
+ **Type**: `() => Promise<void>`

## (十九) Abstract Base Class

### 1、DetailRelationSelectFieldWidget

**Inheritance**: BaseSelectFieldWidget

**Properties**:

+ currentValue: Current value, display value processed by `handleTableLabel`.（`unknown`）
+ relationFieldKey: Associated field key, taken from the primary key of the reference model or generated by `getRelationFieldKey`.（`string | string[] | undefined`）

**Methods**:

#### **handleTableLabel**

+ **Function Description**: Process table labels and generate display values according to configuration.
+ **Type**: `(dataEntity: unknown) => unknown`
+ **Parameters**:
  - `dataEntity`: Data entity.
+ **Return Value**: Processed display value.