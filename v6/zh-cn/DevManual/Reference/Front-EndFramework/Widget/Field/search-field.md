---
title: Search Field
index: true
category:
  - 研发手册
  - Reference
  - 前端API
  - Widget
  - Field
order: 2

---
# 一、Reference List

## （一）文本（String）

### 1、FormStringInputFieldWidget

**引用**：表单（Form）- 文本（String）- [FormStringInputFieldWidget](/zh-cn/DevManual/Reference/Front-EndFramework/Widget/Field/form-field.md#2、formstringinputfieldwidget)

### 2、SearchStringSearchInputFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Search,
    ttype: ModelFieldType.String,
    widget: 'SearchInput'
  })
)
export class SearchStringSearchInputFieldWidget extends FormStringInputFieldWidget
```

**方法**：

#### **onSearch**

+ **功能描述**：搜索事件处理函数，通过注入获取。
+ **类型**：`(() => void) | undefined`

### 3、SearchStringEmailFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Search,
    ttype: ModelFieldType.String,
    widget: 'Email'
  })
)
export class SearchStringEmailFieldWidget extends SearchEmailFieldWidget
```

### 4、SearchStringPhoneFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Search,
    ttype: ModelFieldType.String,
    widget: 'Phone'
  })
)
export class SearchStringPhoneFieldWidget extends SearchPhoneFieldWidget
```

### 5、SearchStringTagFieldWidget{#quote1}

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Search,
    ttype: [
      ModelFieldType.String,
      ModelFieldType.Text,
      ModelFieldType.HTML,
      ModelFieldType.Phone,
      ModelFieldType.Email
    ],
    widget: 'Tag'
  })
)
export class SearchStringTagFieldWidget extends FormStringMultiTagFieldWidget
```

## （二）多行文本（Text）

### 1、SearchTextFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Search,
    ttype: ModelFieldType.Text
  })
)
export class SearchTextFieldWidget extends FormStringFieldWidget
```

### 2、SearchStringTagFieldWidget

**引用**：文本（String）- [SearchStringTagFieldWidget](#quote1)

## （三）富文本（Html）

### 1、SearchHtmlFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Search,
    ttype: ModelFieldType.HTML
  })
)
export class SearchHtmlFieldWidget extends FormStringFieldWidget
```

### 2、SearchStringTagFieldWidget

**引用**：文本（String）- [SearchStringTagFieldWidget](#quote1)

## （四）手机（Phone）

### 1、SearchPhoneFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Search,
    ttype: ModelFieldType.Phone
  })
)
export class SearchPhoneFieldWidget extends FormStringFieldWidget
```

### 2、SearchStringTagFieldWidget

**引用**：文本（String）- [SearchStringTagFieldWidget](#quote1)

## （五）邮箱（Email）

### 1、SearchEmailFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Search,
    ttype: ModelFieldType.Email
  })
)
export class SearchEmailFieldWidget extends FormStringFieldWidget
```

### 2、SearchStringTagFieldWidget

**引用**：文本（String）- [SearchStringTagFieldWidget](#quote1)

## （六）整数（Integer）

### 1、FormIntegerFieldWidget

**引用**：表单（Form）- 整数（Integer）- [FormIntegerFieldWidget](/zh-cn/DevManual/Reference/Front-EndFramework/Widget/Field/form-field.md#1、formintegerfieldwidget)

### 2、SearchIntegerTagFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Search,
    ttype: ModelFieldType.Integer,
    widget: 'Tag'
  })
)
export class SearchIntegerTagFieldWidget extends FormIntegerMultiFieldWidget
```

### 3、SearchIntegerInputRangeFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Search,
    ttype: ModelFieldType.Integer,
    widget: 'InputRange'
  })
)
export class SearchIntegerInputRangeFieldWidget extends SearchNumberRangeFieldWidget
```

**属性**：

+ precision：精度，固定为 `0`（整数不保留小数）。（`number | null | undefined`）

## （七）浮点数（Float）

### 1、FormFloatFieldWidget

**引用**：表单（Form）- 浮点数（Float）- [FormFloatFieldWidget](/zh-cn/DevManual/Reference/Front-EndFramework/Widget/Field/form-field.md#1、formfloatfieldwidget)

### 2、SearchFloatTagFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Search,
    ttype: ModelFieldType.Float,
    widget: 'Tag'
  })
)
export class SearchFloatTagFieldWidget extends FormIntegerMultiFieldWidget
```

### 3、SearchFloatInputRangeFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Search,
    ttype: ModelFieldType.Float,
    widget: 'InputRange'
  })
)
export class SearchFloatInputRangeFieldWidget extends SearchNumberRangeFieldWidget
```

## （八）金额（Money）

### 1、FormMoneyFieldWidget

**引用**：表单（Form）- 金额（Money）- [FormMoneyFieldWidget](/zh-cn/DevManual/Reference/Front-EndFramework/Widget/Field/form-field.md#1、formmoneyfieldwidget)

### 2、SearchCurrencyTagFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Search,
    ttype: ModelFieldType.Currency,
    widget: 'Tag'
  })
)
export class SearchCurrencyTagFieldWidget extends FormIntegerMultiFieldWidget
```

### 3、SearchCurrencyInputRangeFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Search,
    ttype: ModelFieldType.Currency,
    widget: 'InputRange'
  })
)
export class SearchCurrencyInputRangeFieldWidget extends SearchFloatInputRangeFieldWidget
```

## （九）布尔（Boolean）

### 1、SearchBooleanSelectFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Search,
    ttype: ModelFieldType.Boolean
  })
)
export class SearchBooleanSelectFieldWidget extends FormFieldWidget
```

**属性**：

+ options：布尔选择框的选项列表，包含 `true` 和 `false` 及其翻译后的标签。（`{ value: boolean; label: string }[]`）

### 2、FormBooleanCheckboxFieldWidget

**引用**：表单（Form）- 布尔（Boolean）- [FormBooleanCheckboxFieldWidget](/zh-cn/DevManual/Reference/Front-EndFramework/Widget/Field/form-field.md#2、formbooleancheckboxfieldwidget)

## （十）数据字典（Enum）

### 1、FormEnumFieldWidget

**引用**：表单（Form）- 数据字典（Enum）- [FormEnumFieldWidget](/zh-cn/DevManual/Reference/Front-EndFramework/Widget/Field/form-field.md#1、formenumfieldwidget)

### 2、FormEnumMultiSelectFieldWidget

**引用**：表单（Form）- 数据字典（Enum）- [FormEnumMultiSelectFieldWidget](/zh-cn/DevManual/Reference/Front-EndFramework/Widget/Field/form-field.md#3、formenummultiselectfieldwidget)

### 3、SearchEnumCheckboxFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Search,
    ttype: ModelFieldType.Enum,
    widget: 'Checkbox'
  })
)
export class SearchEnumCheckboxFieldWidget extends FormEnumMultiCheckboxFieldWidget
```

### 4、SearchEnumMultiSelectFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Search,
    ttype: ModelFieldType.Enum,
    widget: 'MultiSelect'
  })
)
export class SearchEnumMultiSelectFieldWidget extends FormEnumMultiSelectFieldWidget
```

### 5、SearchEnumTabSelectFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Search,
    ttype: ModelFieldType.Enum,
    widget: 'TabSelect'
  })
)
export class SearchEnumTabSelectFieldWidget extends FormEnumFieldWidget
```

**方法**：

#### **change**

+ **功能描述**：值变更时调用，触发父类变更逻辑并执行搜索。
+ **类型**：`(value: any) => void`
+ **参数**：
  - `value`：变更后的值。

#### **onSearch**

+ **功能描述**：搜索事件处理函数，通过注入获取。
+ **类型**：`(() => void) | undefined`

### 6、SearchEnumTagSelectFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Search,
    ttype: ModelFieldType.Enum,
    widget: 'TagSelect'
  })
)
export class SearchEnumTagSelectFieldWidget extends FormEnumFieldWidget
```

**方法**：

#### **change**

+ **功能描述**：值变更时调用，触发父类变更逻辑并执行搜索。
+ **类型**：`(value: any) => void`
+ **参数**：
  - `value`：变更后的值。

#### **onSearch**

+ **功能描述**：搜索事件处理函数，通过注入获取。
+ **类型**：`(() => void) | undefined`

## （十一）时间日期（Datetime）

### 1、SearchDateTimeRangeFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Search,
    ttype: ModelFieldType.DateTime
  })
)
export class SearchDateTimeRangeFieldWidget extends SearchRangeFieldWidget<
  string | [string, string],
  RuntimeSearchField
>
```

**属性**：

+ dateFormat：日期部分格式，支持表达式和资源映射。（`string | undefined`）
+ format：日期时间显示格式。（`string | undefined`）
+ isSingle：是否为单值模式（非范围）。（`boolean`）
+ mountedCallChaining：挂载调用链，通过注入获取。（`CallChaining | undefined`）
+ placeholder：占位文本，单值模式下返回第一个占位符。（`string | string[]`）
+ resourceDateTimeFormat：日期时间格式资源。（`IResourceDateTimeFormat`）
+ value：获取当前值，单值模式下返回第一个值。（`string | [string, string]`）
+ valueFormat：值格式。（`string | undefined`）
+ timeFormat：时间部分格式，支持表达式和资源映射。（`string | undefined`）

**方法**：

#### **getInitializeComponent**

+ **功能描述**：获取初始化的组件。
+ **类型**：`() => WidgetComponent`
+ **返回值**：初始化的组件实例。

#### **mountedProcess**

+ **功能描述**：初始化表单数据的默认值。
+ **类型**：`() => void`

### 2、SearchDateTimeDateRangeFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Search,
    ttype: ModelFieldType.DateTime,
    widget: 'DatePicker'
  })
)
export class SearchDateTimeDateRangeFieldWidget extends SearchDateRangeFieldWidget
```

### 3、SearchDateTimeRangeElementWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Search,
    widget: 'DateTimeRangePicker'
  })
)
export class SearchDateTimeRangeElementWidget extends FormRangeFieldsWidget<[string, string], RuntimeSearchField>
```

**属性**：

+ allowClear：是否允许清空值，默认为 `true`。（`boolean`）
+ dateFormat：日期部分格式，支持表达式和资源映射。（`string | undefined`）
+ defaultValidateTrigger：默认的验证触发方式，默认为 `CHANGE`。（`ValidateTrigger[]`）
+ endPlaceholder：结束时间的占位文本。（`string | undefined`）
+ format：日期时间显示格式。（`string | undefined`）
+ operator：操作符，默认为 `>=,<`。（`string | undefined`）
+ resourceDateTimeFormat：日期时间格式资源。（`IResourceDateTimeFormat`）
+ showTimeDefaultValue：时间选择器的默认值。（`[Moment, Moment]`）
+ startPlaceholder：开始时间的占位文本。（`string | undefined`）
+ timeFormat：时间部分格式，支持表达式和资源映射。（`string | undefined`）

**方法**：

#### **getInitializeComponent**

+ **功能描述**：获取初始化的组件。
+ **类型**：`() => WidgetComponent`
+ **返回值**：初始化的组件实例。

## （十二）日期（Date）

### 1、SearchDateRangeFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Search,
    ttype: ModelFieldType.Date
  })
)
export class SearchDateRangeFieldWidget extends SearchDateTimeRangeFieldWidget
```

**方法**：

#### **getInitializeComponent**

+ **功能描述**：获取初始化的日期范围选择组件。
+ **类型**：`() => WidgetComponent`
+ **返回值**：`DefaultDateRangePicker` 组件实例。

### 2、SearchDateRangeElementWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Search,
    widget: 'DateRangePicker'
  })
)
export class SearchDateRangeElementWidget extends SearchDateTimeRangeElementWidget
```

**方法**：

#### **getInitializeComponent**

+ **功能描述**：获取初始化的日期范围选择组件。
+ **类型**：`() => WidgetComponent`
+ **返回值**：`DefaultDateRangePicker` 组件实例。

## （十三）时间（Time）

### 1、SearchTimeRangeFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Search,
    ttype: ModelFieldType.Time
  })
)
export class SearchTimeRangeFieldWidget extends SearchDateTimeRangeFieldWidget
```

**方法**：

#### **getInitializeComponent**

+ **功能描述**：获取初始化的时间范围选择组件。
+ **类型**：`() => WidgetComponent`
+ **返回值**：`DefaultTimeRangePicker` 组件实例。

### 2、SearchTimeRangeElementWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Search,
    widget: 'TimeRangePicker'
  })
)
export class SearchTimeRangeElementWidget extends SearchDateTimeRangeElementWidget
```

**方法**：

#### **getInitializeComponent**

+ **功能描述**：获取初始化的时间范围选择组件。
+ **类型**：`() => WidgetComponent`
+ **返回值**：`DefaultTimeRangePicker` 组件实例。

## （十四）年份（Year）

### 1、SearchYearRangeFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Search,
    ttype: ModelFieldType.Year
  })
)
export class SearchYearRangeFieldWidget extends SearchDateTimeRangeFieldWidget
```

**方法**：

#### **getInitializeComponent**

+ **功能描述**：获取初始化的年份范围选择组件。
+ **类型**：`() => WidgetComponent`
+ **返回值**：`DefaultYearRangePicker` 组件实例。

### 2、SearchYearRangeElementWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Search,
    widget: 'YearRangePicker'
  })
)
export class SearchYearRangeElementWidget extends SearchDateTimeRangeElementWidget
```

**方法**：

#### **getInitializeComponent**

+ **功能描述**：获取初始化的年份范围选择组件。
+ **类型**：`() => WidgetComponent`
+ **返回值**：`DefaultYearRangePicker` 组件实例。

## （十五）多对一（M2O）

### 1、SearchM2OSelectFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Search,
    ttype: ModelFieldType.ManyToOne
  })
)
export class SearchM2OSelectFieldWidget extends FormM2OSelectFieldWidget
```

**属性**：

+ defaultSearchTrigger：默认的搜索触发方式，默认为 `MANUAL`。（`SearchTrigger[]`）
+ searchTrigger：搜索触发方式，支持配置多个触发方式。（`SearchTrigger[]`）

**方法**：

#### **change**

+ **功能描述**：值变更时调用，触发父类变更逻辑，并根据配置决定是否触发搜索。
+ **类型**：`(value: any) => void`
+ **参数**：
  - `value`：变更后的值。

#### **onSearch**

+ **功能描述**：搜索事件处理函数，通过注入获取。
+ **类型**：`(() => void) | undefined`

### 2、SearchM2OMultiSelectFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Search,
    ttype: ModelFieldType.ManyToOne,
    widget: 'MultiSelect'
  })
)
export class SearchM2OMultiSelectFieldWidget extends FormM2MFieldSelectWidget
```

**方法**：

#### **submit**

+ **功能描述**：提交表单值，处理多对一场景的数据提交。
+ **类型**：`(submitValue: SubmitValue) => Promise<any>`
+ **参数**：
  - `submitValue`：待提交的值。
+ **返回值**：处理后的提交结果。

### 3、SearchM2OTreeSelectFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Search,
    ttype: ModelFieldType.ManyToOne,
    widget: 'TreeSelect'
  })
)
export class SearchM2OTreeSelectFieldWidget extends FormTreeSelectFieldWidget<
  ActiveRecord | ActiveRecord[],
  RuntimeM2OField & RuntimeSearchField
>
```

**属性**：

+ multipleCheckedStrategy：多选时的选中节点显示策略，默认为 `SHOW_ALL`。（`TreeSelectCheckedStrategy`）
+ operator：操作符，继承自字段配置。（`string | undefined`）
+ selectMode：选择模式，根据操作符自动判断为单选或多选。（`SelectMode`）
+ treeCheckStrictly：父子节点是否关联，默认为 `false`。（`boolean`）

**方法**：

#### **submit**

+ **功能描述**：根据选择模式处理多对一场景的数据提交。
+ **类型**：`(submitValue: SubmitValue) => Promise<any>`
+ **参数**：
  - `submitValue`：待提交的值。
+ **返回值**：处理后的提交结果。

### 4、SearchM2OCascaderFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Search,
    ttype: ModelFieldType.ManyToOne,
    widget: 'Cascader'
  })
)
export class SearchM2OCascaderFieldWidget extends FormCascaderFieldWidget<
  ActiveRecord | ActiveRecord[],
  RuntimeM2OField & RuntimeSearchField
>
```

**属性**：

+ multipleCheckedStrategy：多选时的选中节点显示策略，默认为 `SHOW_ALL`。（`CascaderCheckedStrategy`）
+ operator：操作符，继承自字段配置。（`string | undefined`）
+ selectMode：选择模式，根据操作符自动判断为单选或多选。（`SelectMode`）

**方法**：

#### **submit**

+ **功能描述**：根据选择模式处理多对一场景的数据提交。
+ **类型**：`(submitValue: SubmitValue) => Promise<any>`
+ **参数**：
  - `submitValue`：待提交的值。
+ **返回值**：处理后的提交结果。

### 5、SearchM2OCheckboxFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Search,
    ttype: ModelFieldType.ManyToOne,
    widget: 'Checkbox'
  })
)
export class SearchM2OCheckboxFieldWidget extends FormM2MCheckboxFieldWidget
```

**方法**：

#### **submit**

+ **功能描述**：处理多对一场景下的复选框表单提交。
+ **类型**：`(submitValue: SubmitValue) => Promise<any>`
+ **参数**：
  - `submitValue`：待提交的值。
+ **返回值**：处理后的提交结果。

### 6、SearchM2OAddressFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Search,
    ttype: ModelFieldType.ManyToOne,
    widget: 'Address'
  })
)
export class SearchM2OAddressFieldWidget extends FormM2OAddressFieldWidget
```

**属性**：

+ changeOnSelect：选择时是否触发变更，默认为 `true`。（`boolean`）

## （十六）一对多（O2M）

### 1、FormO2MSelectFieldWidget

**引用**：表单（Form）- 一对多（O2M）- [FormO2MSelectFieldWidget](/zh-cn/DevManual/Reference/Front-EndFramework/Widget/Field/form-field.md#1、formo2mselectfieldwidget)

### 2、SearchO2MTreeSelectFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Search,
    ttype: ModelFieldType.OneToMany,
    widget: 'TreeSelect'
  })
)
export class SearchO2MTreeSelectFieldWidget extends FormO2MTreeSelectFieldWidget
```

### 3、SearchO2MCascaderFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Search,
    ttype: ModelFieldType.OneToMany,
    widget: 'Cascader'
  })
)
export class SearchO2MCascaderFieldWidget extends FormO2MCascaderFieldWidget
```

### 4、SearchO2MCheckboxFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Search,
    ttype: ModelFieldType.OneToMany,
    widget: 'Checkbox'
  })
)
export class SearchO2MCheckboxFieldWidget extends FormO2MCheckboxFieldWidget
```

## （十七）多对多（M2M）

### 1、FormM2MFieldSelectWidget

**引用**：表单（Form）- 一对多（O2M）- [FormM2MFieldSelectWidget](/zh-cn/DevManual/Reference/Front-EndFramework/Widget/Field/form-field.md#1、formm2mfieldselectwidget)

### 2、SearchM2MTreeSelectFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Search,
    ttype: ModelFieldType.ManyToMany,
    widget: 'TreeSelect'
  })
)
export class SearchM2MTreeSelectFieldWidget extends FormM2MTreeSelectFieldWidget
```

### 3、SearchM2MCascaderFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Search,
    ttype: ModelFieldType.ManyToMany,
    widget: 'Cascader'
  })
)
export class SearchM2MCascaderFieldWidget extends FormM2MCascaderFieldWidget
```

### 4、SearchM2MCheckboxFieldWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Search,
    ttype: ModelFieldType.ManyToMany,
    widget: 'Checkbox'
  })
)
export class SearchM2MCheckboxFieldWidget extends FormM2MCheckboxFieldWidget
```

### 5、FormM2MCompanyFieldWidget

**引用**：表单（Form）- 一对多（O2M）- [FormM2MCompanyFieldWidget](/zh-cn/DevManual/Reference/Front-EndFramework/Widget/Field/form-field.md#9、formm2mcompanyfieldwidget)

### 6、FormM2MDepartmentFieldWidget

**引用**：表单（Form）- 一对多（O2M）- [FormM2MDepartmentFieldWidget](/zh-cn/DevManual/Reference/Front-EndFramework/Widget/Field/form-field.md#10、formm2mdepartmentfieldwidget)

### 7、FormM2MEmployeeFieldWidget

**引用**：表单（Form）- 一对多（O2M）- [FormM2MEmployeeFieldWidget](/zh-cn/DevManual/Reference/Front-EndFramework/Widget/Field/form-field.md#11、formm2memployeefieldwidget)

## （十八）抽象基类

### 1、SearchRangeFieldWidget

**继承**：FormFieldWidget

**属性**：

+ allowClear：是否允许清空值，默认为 `true`。（`boolean`）
+ endDefaultValue：结束值的默认值。（`any`）
+ endPlaceholder：结束输入框的占位文本。（`string | undefined`）
+ operator：操作符，继承自字段配置。（`string | undefined`）
+ startDefaultValue：开始值的默认值。（`any`）
+ startPlaceholder：开始输入框的占位文本。（`string | undefined`）

**方法**：

#### **getInitializeComponent**

+ **功能描述**：获取初始化的组件实例。
+ **类型**：`() => WidgetComponent`
+ **返回值**：初始化的组件实例。

### 2、SearchNumberRangeFieldWidget

**继承**：SearchRangeFieldWidget

**属性**：

+ maxSafeInteger：JavaScript 中的最大安全整数。（`number`）
+ minSafeInteger：JavaScript 中的最小安全整数。（`number`）
+ precision：数值精度，可通过 DSL 配置或继承字段配置。（`number | null | undefined`）
+ showThousandth：是否显示千分位分隔符，默认为 `false`。（`boolean`）

**方法**：

#### **getInitializeComponent**

+ **功能描述**：获取初始化的数值范围输入组件。
+ **类型**：`() => WidgetComponent`
+ **返回值**：默认返回 `DefaultNumberInputRange` 组件。

