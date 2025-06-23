---
title: Gallery Field
index: true
category:
  - Development Manual
  - Reference
  - Front-end API
  - Widget
  - Field
order: 5
next:
  text: Vue UI Antd
  link: /en/DevManual/Reference/Front-EndFramework/OioComponents/vue-UI-antd.md
---
# Ⅰ、Reference List

## （Ⅰ）Text (String)

### 1、GalleryStringFieldWidget{#quote1}

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Gallery],
    ttype: [ModelFieldType.String, ModelFieldType.Phone, ModelFieldType.Email]
  })
)
export class GalleryStringFieldWidget extends DetailStringFieldWidget
```

**Properties**:

+ justifyContent: Content alignment. (`string | undefined`)

### 2、GalleryStringColorPickerFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Gallery,
    ttype: ModelFieldType.String,
    widget: 'ColorPicker'
  })
)
export class GalleryStringColorPickerFieldWidget extends DetailStringColorPickerFieldWidget
```

### 3、GalleryStringHyperlinksFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Gallery],
    ttype: ModelFieldType.String,
    widget: 'Hyperlinks'
  })
)
export class GalleryStringHyperlinksFieldWidget extends FormStringHyperlinksFieldWidget
```

**Properties**:

+ target: Link opening method. (`RedirectTargetEnum`)
+ text: Link text. (`string | undefined`)

### 4、GalleryStringIframeFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Gallery],
    ttype: ModelFieldType.String,
    widget: ['Iframe']
  })
)
export class GalleryStringIframeFieldWidget extends DetailStringIframeFieldWidget
```

### 5、GalleryStringMediaPlayerWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Gallery],
    ttype: [ModelFieldType.String],
    widget: 'MediaPlayer'
  })
)
export class GalleryStringMediaPlayerWidget extends FormInputAbstractFieldWidget
```

**Properties**:

+ justifyContent: Content alignment. (`string | undefined`)

### 6、GalleryStringUploadFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Gallery,
    ttype: [ModelFieldType.String, ModelFieldType.Text],
    widget: 'Upload'
  })
)
export class GalleryStringUploadFieldWidget extends DetailStringUploadFieldWidget
```

**Properties**:

+ cdnKey: CDN key. (`string | undefined`)
+ privateLink: Whether to use a private link. (`boolean`)

### 7、GalleryStringUploadImgFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Gallery,
    ttype: [ModelFieldType.String, ModelFieldType.Text],
    widget: 'UploadImg'
  })
)
export class GalleryStringUploadImgFieldWidget extends DetailStringUploadImgFieldWidget
```

### 8、GalleryStringTagFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Gallery],
    ttype: [ModelFieldType.String, ModelFieldType.Integer],
    multi: true
  })
)
export class GalleryStringTagFieldWidget extends DetailStringTagFieldWidget
```

**Properties**:

+ displayNameList: Tag display list converted from the value array. (`{ label: string }[]`)

## （Ⅱ）Multiline Text (Text)

### 1、GalleryCommonFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Gallery],
    ttype: [
      ModelFieldType.String,
      ModelFieldType.Text,
      ModelFieldType.Phone,
      ModelFieldType.Email,
      ModelFieldType.Related
    ]
  })
)
export class GalleryCommonFieldWidget extends DetailCommonFieldWidget
```

**Properties**:

+ justifyContent: Content alignment. (`string | undefined`)

## （Ⅲ）Rich Text (Html)

### 1、GalleryHtmlFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Gallery],
    ttype: ModelFieldType.HTML
  })
)
export class GalleryHtmlFieldWidget extends DetailHtmlFieldWidget
```

**Properties**:

+ showHeight: Display height. (`number | undefined`)

## （Ⅳ）Phone (Phone)

### 1、GalleryStringFieldWidget

**Reference**: Text (String) - [GalleryStringFieldWidget](#quote1)

## （Ⅴ）Email (Email)

### 1、GalleryStringFieldWidget

**Reference**: Text (String) - [GalleryStringFieldWidget](#quote1)

## （Ⅵ）Integer (Integer)

### 1、GalleryNumberWidget{#quote2}

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Gallery,
    ttype: [ModelFieldType.Integer, ModelFieldType.Long, ModelFieldType.Float, ModelFieldType.Currency]
  })
)
export class GalleryNumberWidget extends DetailNumberWidget
```

## （Ⅶ）Floating Point (Float)

### 1、GalleryNumberWidget

**Reference**: Integer (Integer) - [GalleryNumberWidget](#quote2)

## （Ⅷ）Amount (Money)

### 1、GalleryNumberWidget

**Reference**: Integer (Integer) - [GalleryNumberWidget](#quote2)

## （Ⅸ）Boolean (Boolean)

### 1、GalleryBooleanFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Gallery],
    ttype: ModelFieldType.Boolean
  })
)
export class GalleryBooleanFieldWidget extends DetailBooleanFieldWidget
```

### 2、GalleryBooleanSelectFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Gallery],
    ttype: [ModelFieldType.Boolean],
    widget: ['Select', 'Radio']
  })
)
export class GalleryBooleanSelectFieldWidget extends DetailBooleanSelectFieldWidget
```

## （Ⅹ）Data Dictionary (Enum)

### 1、GalleryEnumFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Gallery,
    ttype: ModelFieldType.Enum
  })
)
export class GalleryEnumFieldWidget extends DetailEnumFieldWidget
```

**Properties**:

+ justifyContent: Content alignment. (`string | undefined`)

### 2、GalleryEnumTagFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Gallery],
    ttype: ModelFieldType.Enum,
    widget: ['Tag', 'TagEnum']
  })
)
export class GalleryEnumTagFieldWidget extends DetailEnumFieldWidget
```

**Properties**:

+ displayName: Label text of the currently selected item. (`string | null`)
+ optConfig: Option configuration, including background color, icon, etc. (`Record<string, any>`)

### 3、GalleryEnumMultiFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Gallery,
    ttype: ModelFieldType.Enum,
    multi: true
  })
)
export class GalleryEnumMultiFieldWidget extends DetailEnumMultiFieldWidget
```

**Properties**:

+ justifyContent: Content alignment. (`string | undefined`)

## （Ⅺ）Time and Date (Datetime)

### 1、GalleryDateTimeFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Gallery,
    ttype: ModelFieldType.DateTime
  })
)
export class GalleryDateTimeFieldWidget extends DetailDateTimeFieldWidget
```

### 2、GalleryDateTimeCountdownWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Gallery,
    ttype: ModelFieldType.DateTime,
    widget: 'DateTimeCountdown'
  })
)
export class GalleryDateTimeCountdownWidget extends GalleryDateTimeFieldWidget
```

### 3、GalleryDateTimeRangeFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Gallery,
    widget: 'DateTimeRangePicker'
  })
)
export class GalleryDateTimeRangeFieldWidget extends DetailDateTimeRangeFieldWidget
```

## （Ⅻ）Date (Date)

### 1、GalleryDateFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Gallery,
    ttype: ModelFieldType.Date
  })
)
export class GalleryDateFieldWidget extends DetailDateFieldWidget
```

### 2、GalleryDateCountdownWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Gallery,
    ttype: ModelFieldType.Date,
    widget: 'DateCountdown'
  })
)
export class GalleryDateCountdownWidget extends GalleryDateFieldWidget
```

### 3、GalleryDateRangeFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Gallery,
    widget: 'DateRangePicker'
  })
)
export class GalleryDateRangeFieldWidget extends DetailDateRangeFieldWidget
```

## （XIII）Time (Time)

### 1、GalleryTimeFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Gallery,
    ttype: ModelFieldType.Time
  })
)
export class GalleryTimeFieldWidget extends DetailTimeFieldWidget
```

### 2、GalleryTimeRangeFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Gallery,
    widget: 'TimeRangePicker'
  })
)
export class GalleryTimeRangeFieldWidget extends DetailTimeRangeFieldWidget
```

## （XIV）Year (Year)

### 1、GalleryYearFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Gallery,
    ttype: ModelFieldType.Year
  })
)
export class GalleryYearFieldWidget extends DetailYearFieldWidget
```

### 2、GalleryYearRangeFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Gallery,
    widget: 'YearRangePicker'
  })
)
export class GalleryYearRangeFieldWidget extends DetailYearRangeFieldWidget
```

## （XV）Key-Value Pair (Map)

### 1、GalleryMapFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Gallery,
    ttype: ModelFieldType.Map
  })
)
export class GalleryMapFieldWidget extends DetailMapFieldWidget
```

## （XVI）Many-to-One (M2O)

### 1、GalleryM2OSelectFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Gallery],
    ttype: ModelFieldType.ManyToOne
  })
)
export class GalleryM2OSelectFieldWidget extends DetailM2OSelectFieldWidget
```

## （XVII）One-to-Many (O2M)

### 1、GalleryO2MSelectFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Gallery],
    ttype: ModelFieldType.OneToMany
  })
)
export class GalleryO2MSelectFieldWidget extends DetailO2MSelectFieldWidget
```

**Properties**:

+ currentValueStr: Label text of the currently selected values, separated by commas. (`string`)

## （XVIII）Many-to-Many (M2M)

### 1、GalleryM2MSelectFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Gallery],
    ttype: ModelFieldType.ManyToMany
  })
)
export class GalleryM2MSelectFieldWidget extends GalleryO2MSelectFieldWidget
```