---
title: Gallery Field
index: true
category:
  - 研发手册
  - Reference
  - 前端API
  - Widget
  - Field
order: 5
next:
  text: Router
  link: /v6/zh-cn/DevManual/Reference/Front-EndFramework/Widget/router.md
---
# 一、Reference List

## （一）文本（String）

### 1、GalleryStringFieldWidget{#quote1}

**类型声明**：

``` typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Gallery],
    ttype: [ModelFieldType.String, ModelFieldType.Phone, ModelFieldType.Email]
  })
)
export class GalleryStringFieldWidget extends DetailStringFieldWidget
```

**属性**：

+ justifyContent：内容对齐方式。（`string | undefined`）

### 2、GalleryStringColorPickerFieldWidget

**类型声明**：

``` typescript
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

**类型声明**：

``` typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Gallery],
    ttype: ModelFieldType.String,
    widget: 'Hyperlinks'
  })
)
export class GalleryStringHyperlinksFieldWidget extends FormStringHyperlinksFieldWidget
```

**属性**：

+ target：链接打开方式。（`RedirectTargetEnum`）
+ text：链接文本。（`string | undefined`）

### 4、GalleryStringIframeFieldWidget

**类型声明**：

``` typescript
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

**类型声明**：

``` typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Gallery],
    ttype: [ModelFieldType.String],
    widget: 'MediaPlayer'
  })
)
export class GalleryStringMediaPlayerWidget extends FormInputAbstractFieldWidget
```

**属性**：

+ justifyContent：内容对齐方式。（`string | undefined`）

### 6、GalleryStringUploadFieldWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Gallery,
    ttype: [ModelFieldType.String, ModelFieldType.Text],
    widget: 'Upload'
  })
)
export class GalleryStringUploadFieldWidget extends DetailStringUploadFieldWidget
```

**属性**：

+ cdnKey：CDN 密钥。（`string | undefined`）
+ privateLink：是否使用私有链接。（`boolean`）

### 7、GalleryStringUploadImgFieldWidget

**类型声明**：

``` typescript
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

**类型声明**：

``` typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Gallery],
    ttype: [ModelFieldType.String, ModelFieldType.Integer],
    multi: true
  })
)
export class GalleryStringTagFieldWidget extends DetailStringTagFieldWidget
```

**属性**：

+ displayNameList：标签显示列表，从值数组转换而来。（`{ label: string }[]`）

## （二）多行文本（Text）

### 1、GalleryCommonFieldWidget

**类型声明**：

``` typescript
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

**属性**：

+ justifyContent：内容对齐方式。（`string | undefined`）

## （三）富文本（Html）

### 1、GalleryHtmlFieldWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Gallery],
    ttype: ModelFieldType.HTML
  })
)
export class GalleryHtmlFieldWidget extends DetailHtmlFieldWidget
```

**属性**：

+ showHeight：显示高度。（`number | undefined`）

## （四）手机（Phone）

### 1、GalleryStringFieldWidget

**引用**：文本（String）- [GalleryStringFieldWidget](#quote1)

## （五）邮箱（Email）

### 1、GalleryStringFieldWidget

**引用**：文本（String）- [GalleryStringFieldWidget](#quote1)

## （六）整数（Integer）

### 1、GalleryNumberWidget{#quote2}

**类型声明**：

``` typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Gallery,
    ttype: [ModelFieldType.Integer, ModelFieldType.Long, ModelFieldType.Float, ModelFieldType.Currency]
  })
)
export class GalleryNumberWidget extends DetailNumberWidget
```

## （七）浮点数（Float）

### 1、GalleryNumberWidget

**引用**：整数（Integer）- [GalleryNumberWidget](#quote2)

## （八）金额（Money）

### 1、GalleryNumberWidget

**引用**：整数（Integer）- [GalleryNumberWidget](#quote2)

## （九）布尔（Boolean）

### 1、GalleryBooleanFieldWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Gallery],
    ttype: ModelFieldType.Boolean
  })
)
export class GalleryBooleanFieldWidget extends DetailBooleanFieldWidget
```

### 2、GalleryBooleanSelectFieldWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Gallery],
    ttype: [ModelFieldType.Boolean],
    widget: ['Select', 'Radio']
  })
)
export class GalleryBooleanSelectFieldWidget extends DetailBooleanSelectFieldWidget
```

## （十）数据字典（Enum）

### 1、GalleryEnumFieldWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Gallery,
    ttype: ModelFieldType.Enum
  })
)
export class GalleryEnumFieldWidget extends DetailEnumFieldWidget
```

**属性**：

+ justifyContent：内容对齐方式。（`string | undefined`）

### 2、GalleryEnumTagFieldWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Gallery],
    ttype: ModelFieldType.Enum,
    widget: ['Tag', 'TagEnum']
  })
)
export class GalleryEnumTagFieldWidget extends DetailEnumFieldWidget
```

**属性**：

+ displayName：当前选中项的标签文本。（`string | null`）
+ optConfig：选项配置，包含背景色、图标等信息。（`Record<string, any>`）

### 3、GalleryEnumMultiFieldWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Gallery,
    ttype: ModelFieldType.Enum,
    multi: true
  })
)
export class GalleryEnumMultiFieldWidget extends DetailEnumMultiFieldWidget
```

**属性**：

+ justifyContent：内容对齐方式。（`string | undefined`）

## （十一）时间日期（Datetime）

### 1、GalleryDateTimeFieldWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Gallery,
    ttype: ModelFieldType.DateTime
  })
)
export class GalleryDateTimeFieldWidget extends DetailDateTimeFieldWidget
```

### 2、GalleryDateTimeCountdownWidget

**类型声明**：

``` typescript
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

**类型声明**：

``` typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Gallery,
    widget: 'DateTimeRangePicker'
  })
)
export class GalleryDateTimeRangeFieldWidget extends DetailDateTimeRangeFieldWidget
```

## （十二）日期（Date）

### 1、GalleryDateFieldWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Gallery,
    ttype: ModelFieldType.Date
  })
)
export class GalleryDateFieldWidget extends DetailDateFieldWidget
```

### 2、GalleryDateCountdownWidget

**类型声明**：

``` typescript
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

**类型声明**：

``` typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Gallery,
    widget: 'DateRangePicker'
  })
)
export class GalleryDateRangeFieldWidget extends DetailDateRangeFieldWidget
```

## （十三）时间（Time）

### 1、GalleryTimeFieldWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Gallery,
    ttype: ModelFieldType.Time
  })
)
export class GalleryTimeFieldWidget extends DetailTimeFieldWidget
```

### 2、GalleryTimeRangeFieldWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Gallery,
    widget: 'TimeRangePicker'
  })
)
export class GalleryTimeRangeFieldWidget extends DetailTimeRangeFieldWidget
```

## （十四）年份（Year）

### 1、GalleryYearFieldWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Gallery,
    ttype: ModelFieldType.Year
  })
)
export class GalleryYearFieldWidget extends DetailYearFieldWidget
```

### 2、GalleryYearRangeFieldWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Gallery,
    widget: 'YearRangePicker'
  })
)
export class GalleryYearRangeFieldWidget extends DetailYearRangeFieldWidget
```

## （十五）键值对（Map）

### 1、GalleryMapFieldWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Gallery,
    ttype: ModelFieldType.Map
  })
)
export class GalleryMapFieldWidget extends DetailMapFieldWidget
```

## （十六）多对一（M2O）

### 1、GalleryM2OSelectFieldWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Gallery],
    ttype: ModelFieldType.ManyToOne
  })
)
export class GalleryM2OSelectFieldWidget extends DetailM2OSelectFieldWidget
```

## （十七）一对多（O2M）

### 1、GalleryO2MSelectFieldWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Gallery],
    ttype: ModelFieldType.OneToMany
  })
)
export class GalleryO2MSelectFieldWidget extends DetailO2MSelectFieldWidget
```

**属性**：

+ currentValueStr：当前选中值的标签文本，用逗号连接。（`string`）

## （十八）多对多（M2M）

### 1、GalleryM2MSelectFieldWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Gallery],
    ttype: ModelFieldType.ManyToMany
  })
)
export class GalleryM2MSelectFieldWidget extends GalleryO2MSelectFieldWidget
```

