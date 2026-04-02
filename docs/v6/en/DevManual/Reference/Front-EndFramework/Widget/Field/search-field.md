---  
title: Search Field  
index: true  
category:  
  - R&D Manual  
  - Reference  
  - Front-end API  
  - Widget  
  - Field  
order: 2  

---  

# I. Reference List  

## (Ⅰ) Text (String)  

### 1、FormStringInputFieldWidget  
**Reference**: Form - Text (String) - [FormStringInputFieldWidget](/en/DevManual/Reference/Front-EndFramework/Widget/Field/form-field.md#2、formstringinputfieldwidget)  

### 2、SearchStringSearchInputFieldWidget  
**Type Declaration**:  

``` typescript  
@SPI.ClassFactory(  
  FormFieldWidget.Token({  
    viewType: ViewType.Search,  
    ttype: ModelFieldType.String,  
    widget: 'SearchInput'  
  })  
)  
export class SearchStringSearchInputFieldWidget extends FormStringInputFieldWidget  
```

**Methods**:  

#### **onSearch**  
- **Function Description**: Search event handler, obtained via injection.  
- **Type**: `(() => void) | undefined`  


### 3、SearchStringEmailFieldWidget  
**Type Declaration**:  

``` typescript  
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
**Type Declaration**:  

``` typescript  
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
**Type Declaration**:  

``` typescript  
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


## (Ⅱ) Multi-line Text (Text)  

### 1、SearchTextFieldWidget  
**Type Declaration**:  

``` typescript  
@SPI.ClassFactory(  
  FormFieldWidget.Token({  
    viewType: ViewType.Search,  
    ttype: ModelFieldType.Text  
  })  
)  
export class SearchTextFieldWidget extends FormStringFieldWidget  
```


### 2、SearchStringTagFieldWidget  
**Reference**: Text (String) - [SearchStringTagFieldWidget](#quote1)  


## (Ⅲ) Rich Text (Html)  

### 1、SearchHtmlFieldWidget  
**Type Declaration**:  

``` typescript  
@SPI.ClassFactory(  
  FormFieldWidget.Token({  
    viewType: ViewType.Search,  
    ttype: ModelFieldType.HTML  
  })  
)  
export class SearchHtmlFieldWidget extends FormStringFieldWidget  
```


### 2、SearchStringTagFieldWidget  
**Reference**: Text (String) - [SearchStringTagFieldWidget](#quote1)  


## (Ⅳ) Phone  

### 1、SearchPhoneFieldWidget  
**Type Declaration**:  

``` typescript  
@SPI.ClassFactory(  
  FormFieldWidget.Token({  
    viewType: ViewType.Search,  
    ttype: ModelFieldType.Phone  
  })  
)  
export class SearchPhoneFieldWidget extends FormStringFieldWidget  
```


### 2、SearchStringTagFieldWidget  
**Reference**: Text (String) - [SearchStringTagFieldWidget](#quote1)  


## (Ⅴ) Email  

### 1、SearchEmailFieldWidget  
**Type Declaration**:  

``` typescript  
@SPI.ClassFactory(  
  FormFieldWidget.Token({  
    viewType: ViewType.Search,  
    ttype: ModelFieldType.Email  
  })  
)  
export class SearchEmailFieldWidget extends FormStringFieldWidget  
```


### 2、SearchStringTagFieldWidget  
**Reference**: Text (String) - [SearchStringTagFieldWidget](#quote1)  


## (Ⅵ) Integer  

### 1、FormIntegerFieldWidget  
**Reference**: Form - Integer - [FormIntegerFieldWidget](/en/DevManual/Reference/Front-EndFramework/Widget/Field/form-field.md#1、formintegerfieldwidget)  


### 2、SearchIntegerTagFieldWidget  
**Type Declaration**:  

``` typescript  
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
**Type Declaration**:  

``` typescript  
@SPI.ClassFactory(  
  FormFieldWidget.Token({  
    viewType: ViewType.Search,  
    ttype: ModelFieldType.Integer,  
    widget: 'InputRange'  
  })  
)  
export class SearchIntegerInputRangeFieldWidget extends SearchNumberRangeFieldWidget  
```

**Attributes**:  
- precision: Precision, fixed at `0` (integers do not retain decimals). (`number | null | undefined`)  


## (Ⅶ) Float  

### 1、FormFloatFieldWidget  
**Reference**: Form - Float - [FormFloatFieldWidget](/en/DevManual/Reference/Front-EndFramework/Widget/Field/form-field.md#1、formfloatfieldwidget)  


### 2、SearchFloatTagFieldWidget  
**Type Declaration**:  

``` typescript  
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
**Type Declaration**:  

``` typescript  
@SPI.ClassFactory(  
  FormFieldWidget.Token({  
    viewType: ViewType.Search,  
    ttype: ModelFieldType.Float,  
    widget: 'InputRange'  
  })  
)  
export class SearchFloatInputRangeFieldWidget extends SearchNumberRangeFieldWidget  
```


## (Ⅷ) Money  

### 1、FormMoneyFieldWidget  
**Reference**: Form - Money - [FormMoneyFieldWidget](/en/DevManual/Reference/Front-EndFramework/Widget/Field/form-field.md#1、formmoneyfieldwidget)  


### 2、SearchCurrencyTagFieldWidget  
**Type Declaration**:  

``` typescript  
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
**Type Declaration**:  

``` typescript  
@SPI.ClassFactory(  
  FormFieldWidget.Token({  
    viewType: ViewType.Search,  
    ttype: ModelFieldType.Currency,  
    widget: 'InputRange'  
  })  
)  
export class SearchCurrencyInputRangeFieldWidget extends SearchFloatInputRangeFieldWidget  
```


## (Ⅸ) Boolean  

### 1、SearchBooleanSelectFieldWidget  
**Type Declaration**:  

``` typescript  
@SPI.ClassFactory(  
  FormFieldWidget.Token({  
    viewType: ViewType.Search,  
    ttype: ModelFieldType.Boolean  
  })  
)  
export class SearchBooleanSelectFieldWidget extends FormFieldWidget  
```

**Attributes**:  
- options: Option list for boolean selection, including `true` and `false` with translated labels. (`{ value: boolean; label: string }[]`)  


### 2、FormBooleanCheckboxFieldWidget  
**Reference**: Form - Boolean - [FormBooleanCheckboxFieldWidget](/en/DevManual/Reference/Front-EndFramework/Widget/Field/form-field.md#2、formbooleancheckboxfieldwidget)  


## (Ⅹ) Enum (Data Dictionary)  

### 1、FormEnumFieldWidget  
**Reference**: Form - Enum - [FormEnumFieldWidget](/en/DevManual/Reference/Front-EndFramework/Widget/Field/form-field.md#1、formenumfieldwidget)  


### 2、FormEnumMultiSelectFieldWidget  
**Reference**: Form - Enum - [FormEnumMultiSelectFieldWidget](/en/DevManual/Reference/Front-EndFramework/Widget/Field/form-field.md#3、formenummultiselectfieldwidget)  


### 3、SearchEnumCheckboxFieldWidget  
**Type Declaration**:  

``` typescript  
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
**Type Declaration**:  

``` typescript  
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
**Type Declaration**:  

``` typescript  
@SPI.ClassFactory(  
  FormFieldWidget.Token({  
    viewType: ViewType.Search,  
    ttype: ModelFieldType.Enum,  
    widget: 'TabSelect'  
  })  
)  
export class SearchEnumTabSelectFieldWidget extends FormEnumFieldWidget  
```

**Methods**:  

#### **change**  
- **Function Description**: Called when the value changes, triggers parent class change logic and executes search.  
- **Type**: `(value: any) => void`  
- **Parameters**:  
  - `value`: The new value after the change.  

#### **onSearch**  
- **Function Description**: Search event handler, obtained via injection.  
- **Type**: `(() => void) | undefined`  


### 6、SearchEnumTagSelectFieldWidget  
**Type Declaration**:  

``` typescript  
@SPI.ClassFactory(  
  FormFieldWidget.Token({  
    viewType: ViewType.Search,  
    ttype: ModelFieldType.Enum,  
    widget: 'TagSelect'  
  })  
)  
export class SearchEnumTagSelectFieldWidget extends FormEnumFieldWidget  
```

**Methods**:  

#### **change**  
- **Function Description**: Called when the value changes, triggers parent class change logic and executes search.  
- **Type**: `(value: any) => void`  
- **Parameters**:  
  - `value`: The new value after the change.  

#### **onSearch**  
- **Function Description**: Search event handler, obtained via injection.  
- **Type**: `(() => void) | undefined`  


## (Ⅺ) Datetime  

### 1、SearchDateTimeRangeFieldWidget  
**Type Declaration**:  

``` typescript  
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

**Attributes**:  
- dateFormat: Date format, supports expressions and resource mapping. (`string | undefined`)  
- format: Datetime display format. (`string | undefined`)  
- isSingle: Whether it is in single-value mode (non-range). (`boolean`)  
- mountedCallChaining: Mounting call chain, obtained via injection. (`CallChaining | undefined`)  
- placeholder: Placeholder text, returns the first placeholder in single-value mode. (`string | string[]`)  
- resourceDateTimeFormat: Datetime format resource. (`IResourceDateTimeFormat`)  
- value: Gets the current value, returns the first value in single-value mode. (`string | [string, string]`)  
- valueFormat: Value format. (`string | undefined`)  
- timeFormat: Time format, supports expressions and resource mapping. (`string | undefined`)  

**Methods**:  

#### **getInitializeComponent**  
- **Function Description**: Gets the initialized component.  
- **Type**: `() => WidgetComponent`  
- **Return Value**: Initialized component instance.  

#### **mountedProcess**  
- **Function Description**: Initializes the default value of form data.  
- **Type**: `() => void`  


### 2、SearchDateTimeDateRangeFieldWidget  
**Type Declaration**:  

``` typescript  
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
**Type Declaration**:  

``` typescript  
@SPI.ClassFactory(  
  BaseElementWidget.Token({  
    viewType: ViewType.Search,  
    widget: 'DateTimeRangePicker'  
  })  
)  
export class SearchDateTimeRangeElementWidget extends FormRangeFieldsWidget<[string, string], RuntimeSearchField>  
```

**Attributes**:  
- allowClear: Whether to allow clearing the value, default is `true`. (`boolean`)  
- dateFormat: Date format, supports expressions and resource mapping. (`string | undefined`)  
- defaultValidateTrigger: Default validation trigger, default is `CHANGE`. (`ValidateTrigger[]`)  
- endPlaceholder: Placeholder text for the end time. (`string | undefined`)  
- format: Datetime display format. (`string | undefined`)  
- operator: Operator, inherited from field configuration. (`string | undefined`)  
- resourceDateTimeFormat: Datetime format resource. (`IResourceDateTimeFormat`)  
- showTimeDefaultValue: Default value for the time picker. (`[Moment, Moment]`)  
- startPlaceholder: Placeholder text for the start time. (`string | undefined`)  
- timeFormat: Time format, supports expressions and resource mapping. (`string | undefined`)  

**Methods**:  

#### **getInitializeComponent**  
- **Function Description**: Gets the initialized component.  
- **Type**: `() => WidgetComponent`  
- **Return Value**: Initialized component instance.  


## (Ⅻ) Date  

### 1、SearchDateRangeFieldWidget  
**Type Declaration**:  

``` typescript  
@SPI.ClassFactory(  
  FormFieldWidget.Token({  
    viewType: ViewType.Search,  
    ttype: ModelFieldType.Date  
  })  
)  
export class SearchDateRangeFieldWidget extends SearchDateTimeRangeFieldWidget  
```

**Methods**:  

#### **getInitializeComponent**  
- **Function Description**: Gets the initialized date range picker component.  
- **Type**: `() => WidgetComponent`  
- **Return Value**: `DefaultDateRangePicker` component instance.  


### 2、SearchDateRangeElementWidget  
**Type Declaration**:  

``` typescript  
@SPI.ClassFactory(  
  BaseElementWidget.Token({  
    viewType: ViewType.Search,  
    widget: 'DateRangePicker'  
  })  
)  
export class SearchDateRangeElementWidget extends SearchDateTimeRangeElementWidget  
```

**Methods**:  

#### **getInitializeComponent**  
- **Function Description**: Gets the initialized date range picker component.  
- **Type**: `() => WidgetComponent`  
- **Return Value**: `DefaultDateRangePicker` component instance.  


## (XIII) Time  

### 1、SearchTimeRangeFieldWidget  
**Type Declaration**:  

``` typescript  
@SPI.ClassFactory(  
  FormFieldWidget.Token({  
    viewType: ViewType.Search,  
    ttype: ModelFieldType.Time  
  })  
)  
export class SearchTimeRangeFieldWidget extends SearchDateTimeRangeFieldWidget  
```

**Methods**:  

#### **getInitializeComponent**  
- **Function Description**: Gets the initialized time range picker component.  
- **Type**: `() => WidgetComponent`  
- **Return Value**: `DefaultTimeRangePicker` component instance.  


### 2、SearchTimeRangeElementWidget  
**Type Declaration**:  

``` typescript  
@SPI.ClassFactory(  
  BaseElementWidget.Token({  
    viewType: ViewType.Search,  
    widget: 'TimeRangePicker'  
  })  
)  
export class SearchTimeRangeElementWidget extends SearchDateTimeRangeElementWidget  
```

**Methods**:  

#### **getInitializeComponent**  
- **Function Description**: Gets the initialized time range picker component.  
- **Type**: `() => WidgetComponent`  
- **Return Value**: `DefaultTimeRangePicker` component instance.  


## (XIV) Year  

### 1、SearchYearRangeFieldWidget  
**Type Declaration**:  

``` typescript  
@SPI.ClassFactory(  
  FormFieldWidget.Token({  
    viewType: ViewType.Search,  
    ttype: ModelFieldType.Year  
  })  
)  
export class SearchYearRangeFieldWidget extends SearchDateTimeRangeFieldWidget  
```

**Methods**:  

#### **getInitializeComponent**  
- **Function Description**: Gets the initialized year range picker component.  
- **Type**: `() => WidgetComponent`  
- **Return Value**: `DefaultYearRangePicker` component instance.  


### 2、SearchYearRangeElementWidget  
**Type Declaration**:  

``` typescript  
@SPI.ClassFactory(  
  BaseElementWidget.Token({  
    viewType: ViewType.Search,  
    widget: 'YearRangePicker'  
  })  
)  
export class SearchYearRangeElementWidget extends SearchDateTimeRangeElementWidget  
```

**Methods**:  

#### **getInitializeComponent**  
- **Function Description**: Gets the initialized year range picker component.  
- **Type**: `() => WidgetComponent`  
- **Return Value**: `DefaultYearRangePicker` component instance.  


## (XV) Many-to-One (M2O)  

### 1、SearchM2OSelectFieldWidget  
**Type Declaration**:  

``` typescript  
@SPI.ClassFactory(  
  FormFieldWidget.Token({  
    viewType: ViewType.Search,  
    ttype: ModelFieldType.ManyToOne  
  })  
)  
export class SearchM2OSelectFieldWidget extends FormM2OSelectFieldWidget  
```

**Attributes**:  
- defaultSearchTrigger: Default search trigger, default is `MANUAL`. (`SearchTrigger[]`)  
- searchTrigger: Search triggers, supports configuring multiple triggers. (`SearchTrigger[]`)  

**Methods**:  

#### **change**  
- **Function Description**: Called when the value changes, triggers parent class change logic and decides whether to trigger search based on configuration.  
- **Type**: `(value: any) => void`  
- **Parameters**:  
  - `value`: The new value after the change.  

#### **onSearch**  
- **Function Description**: Search event handler, obtained via injection.  
- **Type**: `(() => void) | undefined`  


### 2、SearchM2OMultiSelectFieldWidget  
**Type Declaration**:  

``` typescript  
@SPI.ClassFactory(  
  FormFieldWidget.Token({  
    viewType: ViewType.Search,  
    ttype: ModelFieldType.ManyToOne,  
    widget: 'MultiSelect'  
  })  
)  
export class SearchM2OMultiSelectFieldWidget extends FormM2MFieldSelectWidget  
```

**Methods**:  

#### **submit**  
- **Function Description**: Submits form values, handles data submission in many-to-one scenarios.  
- **Type**: `(submitValue: SubmitValue) => Promise<any>`  
- **Parameters**:  
  - `submitValue`: Value to be submitted.  
- **Return Value**: Processed submission result.  


### 3、SearchM2OTreeSelectFieldWidget  
**Type Declaration**:  

``` typescript  
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

**Attributes**:  
- multipleCheckedStrategy: Display strategy for selected nodes in multi-select mode, default is `SHOW_ALL`. (`TreeSelectCheckedStrategy`)  
- operator: Operator, inherited from field configuration. (`string | undefined`)  
- selectMode: Selection mode, automatically determined as single or multi-select based on the operator. (`SelectMode`)  
- treeCheckStrictly: Whether parent and child nodes are associated, default is `false`. (`boolean`)  

**Methods**:  

#### **submit**  
- **Function Description**: Handles data submission in many-to-one scenarios based on the selection mode.  
- **Type**: `(submitValue: SubmitValue) => Promise<any>`  
- **Parameters**:  
  - `submitValue`: Value to be submitted.  
- **Return Value**: Processed submission result.  


### 4、SearchM2OCascaderFieldWidget  
**Type Declaration**:  

``` typescript  
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

**Attributes**:  
- multipleCheckedStrategy: Display strategy for selected nodes in multi-select mode, default is `SHOW_ALL`. (`CascaderCheckedStrategy`)  
- operator: Operator, inherited from field configuration. (`string | undefined`)  
- selectMode: Selection mode, automatically determined as single or multi-select based on the operator. (`SelectMode`)  

**Methods**:  

#### **submit**  
- **Function Description**: Handles data submission in many-to-one scenarios based on the selection mode.  
- **Type**: `(submitValue: SubmitValue) => Promise<any>`  
- **Parameters**:  
  - `submitValue`: Value to be submitted.  
- **Return Value**: Processed submission result.  


### 5、SearchM2OCheckboxFieldWidget  
**Type Declaration**:  

``` typescript  
@SPI.ClassFactory(  
  FormFieldWidget.Token({  
    viewType: ViewType.Search,  
    ttype: ModelFieldType.ManyToOne,  
    widget: 'Checkbox'  
  })  
)  
export class SearchM2OCheckboxFieldWidget extends FormM2MCheckboxFieldWidget  
```

**Methods**:  

#### **submit**  
- **Function Description**: Handles checkbox form submission in many-to-one scenarios.  
- **Type**: `(submitValue: SubmitValue) => Promise<any>`  
- **Parameters**:  
  - `submitValue`: Value to be submitted.  
- **Return Value**: Processed submission result.  


### 6、SearchM2OAddressFieldWidget  
**Type Declaration**:  

``` typescript  
@SPI.ClassFactory(  
  FormFieldWidget.Token({  
    viewType: ViewType.Search,  
    ttype: ModelFieldType.ManyToOne,  
    widget: 'Address'  
  })  
)  
export class SearchM2OAddressFieldWidget extends FormM2OAddressFieldWidget  
```

**Attributes**:  
- changeOnSelect: Whether to trigger changes when selecting, default is `true`. (`boolean`)  


## (XVI) One-to-Many (O2M)  

### 1、FormO2MSelectFieldWidget  
**Reference**: Form - One-to-Many (O2M) - [FormO2MSelectFieldWidget](/en/DevManual/Reference/Front-EndFramework/Widget/Field/form-field.md#1、formo2mselectfieldwidget)  


### 2、SearchO2MTreeSelectFieldWidget  
**Type Declaration**:  

``` typescript  
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
**Type Declaration**:  

``` typescript  
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
**Type Declaration**:  

``` typescript  
@SPI.ClassFactory(  
  FormFieldWidget.Token({  
    viewType: ViewType.Search,  
    ttype: ModelFieldType.OneToMany,  
    widget: 'Checkbox'  
  })  
)  
export class SearchO2MCheckboxFieldWidget extends FormO2MCheckboxFieldWidget  
```


## (XVII) Many-to-Many (M2M)  

### 1、FormM2MFieldSelectWidget  
**Reference**: Form - One-to-Many (O2M) - [FormM2MFieldSelectWidget](/en/DevManual/Reference/Front-EndFramework/Widget/Field/form-field.md#1、formm2mfieldselectwidget)  


### 2、SearchM2MTreeSelectFieldWidget  
**Type Declaration**:  

``` typescript  
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
**Type Declaration**:  

``` typescript  
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
**Type Declaration**:  

``` typescript  
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
**Reference**: Form - One-to-Many (O2M) - [FormM2MCompanyFieldWidget](/en/DevManual/Reference/Front-EndFramework/Widget/Field/form-field.md#9、formm2mcompanyfieldwidget)  


### 6、FormM2MDepartmentFieldWidget  
**Reference**: Form - One-to-Many (O2M) - [FormM2MDepartmentFieldWidget](/en/DevManual/Reference/Front-EndFramework/Widget/Field/form-field.md#10、formm2mdepartmentfieldwidget)  


### 7、FormM2MEmployeeFieldWidget  
**Reference**: Form - One-to-Many (O2M) - [FormM2MEmployeeFieldWidget](/en/DevManual/Reference/Front-EndFramework/Widget/Field/form-field.md#11、formm2memployeefieldwidget)  


## (XVIII) Abstract Base Classes  

### 1、SearchRangeFieldWidget  
**Inheritance**: FormFieldWidget  

**Attributes**:  
- allowClear: Whether to allow clearing the value, default is `true`. (`boolean`)  
- endDefaultValue: Default value for the end value. (`any`)  
- endPlaceholder: Placeholder text for the end input. (`string | undefined`)  
- operator: Operator, inherited from field configuration. (`string | undefined`)  
- startDefaultValue: Default value for the start value. (`any`)  
- startPlaceholder: Placeholder text for the start input. (`string | undefined`)  

**Methods**:  

#### **getInitializeComponent**  
- **Function Description**: Gets the initialized component instance.  
- **Type**: `() => WidgetComponent`  
- **Return Value**: Initialized component instance.  


### 2、SearchNumberRangeFieldWidget  
**Inheritance**: SearchRangeFieldWidget  

**Attributes**:  
- maxSafeInteger: The maximum safe integer in JavaScript. (`number`)  
- minSafeInteger: The minimum safe integer in JavaScript. (`number`)  
- precision: Numeric precision, configurable via DSL or inherited from field configuration. (`number | null | undefined`)  
- showThousandth: Whether to display thousandth separators, default is `false`. (`boolean`)  

**Methods**:  

#### **getInitializeComponent**  
- **Function Description**: Gets the initialized numeric range input component.  
- **Type**: `() => WidgetComponent`  
- **Return Value**: By default, returns the `DefaultNumberInputRange` component.