---
title: Form Field
index: true
category:
  - R&D Manual
  - Reference
  - Frontend API
  - Widget
  - Field
order: 3

---
# Reference List

## (一) String

### 1、FormStringFieldWidget

**Inheritance**: FormInputAbstractFieldWidget

**Properties**:

+ clearSetEmpty: Whether to set empty when clearing, default value is `true`.（`boolean`）
+ crypto: Whether to enable encryption, default value is `false`.（`boolean`）
+ invisibleIcon: Invisible state icon, default value is `oinone-invisible`.（`string`）
+ maxLength: Maximum length, priority: DSL configuration > field storage configuration > default value `1024`.（`number`）
+ minLength: Minimum length, priority: DSL configuration > field configuration > default value `0`.（`number`）
+ pattern: Regular expression pattern.（`string | undefined`）
+ patternType: Pattern type, obtained through DSL expression calculation.（`any`）
+ showCount: Whether to display character count, default value is `false`.（`boolean`）
+ type: Input type, default value is `InputType.TEXT`.（`string`）
+ visibleIcon: Visible state icon, default value is `oinone-visible`.（`string`）

**Methods**:

#### **change**

+ **Function Description**: Value change processing, convert empty value to `null` and then trigger the parent class change logic.
+ **Type**: `(value: any) => void`
+ **Parameters**:
  - `value`: Value after change.

#### **validateLength**

+ **Function Description**: Verify whether the input value length meets the configured minimum/maximum length.
+ **Type**: `(realValue: string | undefined) => ValidatorInfo`
+ **Parameters**:
  - `realValue`: Input value to be verified.
+ **Return Value**: Validation result information.

#### **validator**

+ **Function Description**: Asynchronously validate the input value, first perform specific validation, then validate the length.
+ **Type**: `() => Promise<ValidatorInfo>`
+ **Return Value**: Validation result information.

### 2、FormStringInputFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search],
    ttype: ModelFieldType.String
  })
)
export class FormStringInputFieldWidget extends FormStringFieldWidget
```

**Properties**:

+ translation: Whether to enable translation.（`boolean`）

**Methods**:

#### **submit**

+ **Function Description**: Process form submission, encrypt the value of the encrypted field and then call the default submission processor.
+ **Type**: `(submitValue: SubmitValue) => any`
+ **Parameters**:
  - `submitValue`: Value to be submitted.
+ **Return Value**: Submission processing result.

#### **validator**

+ **Function Description**: Asynchronously validate the input value, inherit the parent class validation logic (specific validation and length validation).
+ **Type**: `() => Promise<ValidatorInfo>`
+ **Return Value**: Validation result information.

### 3、FormStringColorPickerFieldWidget

**Type Declaration**:

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

**Properties**:

+ predefine: Predefined color list, default value is `DEFAULT_PREDEFINE`.（`string[]`）

**Methods**:

#### **change**

+ **Function Description**: Value change processing, trigger the parent class change logic and lose focus.
+ **Type**: `(v: any) => void`
+ **Parameters**:
  - `v`: Value after change.

### 4、FormStringDownloadFieldWidget

**Type Declaration**:

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

**Properties**:

+ downloadFileName: Download file name, obtained by parsing the internationalization key configured in DSL.（`string`）
+ linkDisplayText: Download prompt text, default uses the field value.（`string`）
+ linkDisplayTextPrefix: Download prompt text prefix.（`string | undefined`）

**Methods**:

#### **onDownload**

+ **Function Description**: Process the download event, initiate a network request to obtain file data and trigger browser download.
+ **Type**: `(e: Event) => Promise<void>`
+ **Parameters**:
  - `e`: Event object.

### 5、FormStringEmailFieldWidget

**Type Declaration**:

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

**Type Declaration**:

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

**Properties**:

+ target: Hyperlink opening method, default value is `BLANK`.（`RedirectTargetEnum`）
+ text: Hyperlink display text.（`string | undefined`）

### 7、FormStringIconSelectFieldWidget

**Type Declaration**:

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

**Properties**:

+ icons: List of optional icons.（`any`）
+ modalTitle: Modal window title.（`string | undefined`）

### 8、FormStringIframeFieldWidget

**Type Declaration**:

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

**Type Declaration**:

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

**Properties**:

+ altKey: Form data field name associated with the Alt key.（`string | undefined`）
+ ctrlKey: Form data field name associated with the Ctrl key.（`string | undefined`）
+ displayValue: Displayed shortcut key combination text, format is "Ctrl + Alt + Key".（`string`）
+ shiftKey: Form data field name associated with the Shift key.（`string | undefined`）

**Methods**:

#### **change**

+ **Function Description**: Value change processing, convert empty value to `null` and clear the associated modifier key status.
+ **Type**: `(val: any) => void`
+ **Parameters**:
  - `val`: Value after change.

#### **onKeypress**

+ **Function Description**: Keyboard key event processing, update the value and associated modifier key status.
+ **Type**: `(message: KeyboardEventMessage) => void`
+ **Parameters**:
  - `message`: Keyboard event message object.

### 10、FormStringPasswordFieldWidget

**Type Declaration**:

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

**Methods**:

#### **submit**

+ **Function Description**: Process form submission, encrypt the value of the encrypted field and then call the default submission processor.
+ **Type**: `(submitValue: SubmitValue) => any`
+ **Parameters**:
  - `submitValue`: Value to be submitted.
+ **Return Value**: Submission processing result.

#### **validator**

+ **Function Description**: Asynchronously validate the input value, inherit the parent class validation logic (specific validation and length validation).
+ **Type**: `() => Promise<ValidatorInfo>`
+ **Return Value**: Validation result information.

### 11、FormStringPhoneFieldWidget

**Type Declaration**:

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

**Type Declaration**:

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

**Properties**:

+ clearButtonText: Clear button text, default value is `Clear`.（`string`）
+ clearFormStringSignatureFieldSubject: Event for clearing the signature drawing board flow.（`WidgetSubjection<Record<string, unknown>>`）
+ saveButtonText: Save button text, default value is `Save`.（`string`）
+ showClearButton: Whether to display the clear button, default value is `true`.（`boolean`）
+ showPlaceholder: Whether to display placeholder text, default value is `true`.（`boolean`）
+ showSaveButton: Whether to display the save button, default value is `true`.（`boolean`）
+ signatureBackGroundColor: Signature background panel color, default value is `white`.（`string`）
+ signatureFontColor: Signature text color, default value is `black`.（`string`）

**Methods**:

#### **getSmoothSignature**

+ **Function Description**: Get the signature drawing board object instance.
+ **Type**: `() => SmoothSignature | undefined`
+ **Return Value**: Signature drawing board object instance.

#### **onClear**

+ **Function Description**: Clear the signature content and reset the status.
+ **Type**: `() => void`

#### **onSaveSignature**

+ **Function Description**: Save the signature as a PNG image and upload it.
+ **Type**: `() => Promise<void>`

#### **onStart**

+ **Function Description**: Hide the placeholder prompt when starting to sign.
+ **Type**: `() => void`

#### **setSmoothSignature**

+ **Function Description**: Set the signature drawing board object instance.
+ **Type**: `(smoothSignature: SmoothSignature) => void`
+ **Parameters**:
  - `smoothSignature`: Signature drawing board object instance.

#### **submit**

+ **Function Description**: Process form submission, automatically save the signature and encrypt the value.
+ **Type**: `(submitValue: SubmitValue) => any`
+ **Parameters**:
  - `submitValue`: Value to be submitted.
+ **Return Value**: Submission processing result.

### 13、FormStringMultiTagFieldWidget

**Type Declaration**:

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

**Properties**:

+ allowRepeat: Whether to allow duplicate tags, default value is `false`.（`boolean`）
+ limit: Maximum number of tags, inherited from field configuration.（`number | undefined`）
+ unitValueLength: Tag value length, priority: DSL configuration > field attribute configuration.（`number | undefined`）

**Methods**:

#### **tagChange**

+ **Function Description**: Tag value change processing, convert empty array to `null` and then trigger change and lose focus.
+ **Type**: `(value: any) => void`
+ **Parameters**:
  - `value`: Array of tag values after change.

#### **validator**

+ **Function Description**: Asynchronously validate whether the number of tags exceeds the limit.
+ **Type**: `() => Promise<ValidatorInfo>`
+ **Return Value**: Validation result information.

### 14、FormStringTextAreaFieldWidget

**Type Declaration**:

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

**Type Declaration**:

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

**Properties**:

+ allLimitSize: Total file size limit.（`string`）
+ cdnKey: CDN key.（`string | undefined`）
+ chunkUploadThreshold: Chunk upload threshold, default value from configuration.（`number`）
+ defaultValidateTrigger: Default validation trigger timing, default value is `[ValidateTrigger.CHANGE]`.（`ValidateTrigger[]`）
+ fileDisplayPrefixText: File display prefix text, default value is `prefix：`.（`string`）
+ fileDisplayText: File display placeholder text, default value is `fileDisplayText`.（`string`）
+ limit: Upload file quantity limit, priority: DSL configuration > field configuration > default value `-1`.（`number`）
+ limitFileExtensions: Allowed file extensions.（`string | undefined`）
+ limitSize: Single file size limit.（`number`）
+ multiple: Whether to allow multiple file uploads.（`boolean`）
+ parallel: Number of parallel uploads, default value from configuration.（`number`）
+ partSize: Chunk size, default value from configuration.（`number`）
+ privateLink: Whether it is a private link.（`boolean`）
+ uploadIcon: Upload icon.（`string | undefined`）
+ uploadIconText: Upload icon text.（`string | undefined`）
+ uploadPlaceholder: Upload placeholder text.（`string | undefined`）

**Methods**:

#### **change**

+ **Function Description**: File value change processing, convert the value format according to single/multiple file scenarios and then trigger parent class change and lose focus.
+ **Type**: `(value: any) => void`
+ **Parameters**:
  - `value`: File value after change (array or object).

#### **remove**

+ **Function Description**: File deletion processing, update the file list and trigger parent class change and lose focus.
+ **Type**: `(value: any) => void`
+ **Parameters**:
  - `value`: File value to be deleted.

#### **validator**

+ **Function Description**: Asynchronously validate whether the total length of file links exceeds the field size limit.
+ **Type**: `() => Promise<ValidatorInfo>`
+ **Return Value**: Validation result information.

### 16、FormStringUploadImgFieldWidget

**Type Declaration**:

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

**Type Declaration**:

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

**Properties**:

+ draggableIcon: Drag and drop upload icon, default value is `oinone-shangchuan1`.（`string`）
+ draggableExtendsionsText: Allowed file type prompt text.（`string`）
+ draggableTipText: Drag and drop upload prompt, default value is `Click or drag files here to upload`.（`string`）
+ showDraggableExtendsionsText: Whether to display supported extensions, default value is `true`.（`boolean`）

### 18、FormStringVerificationCodeFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormStringFieldWidget.Token({
    viewType: ViewType.Form,
    widget: 'VerificationCode'
  })
)
export class FormStringVerificationCodeFieldWidget extends FormStringFieldWidget
```

**Properties**:

+ imagePath: Verification code image interface path, default value is `/pamirs/api/refreshPicCode`.（`string`）
+ picCodeScene: Verification code scene parameter, appended to the image path.（`string`）

**Methods**:

#### **genPath**

+ **Function Description**: Generate the complete verification code image path with timestamp and scene parameters.
+ **Type**: `() => string`
+ **Return Value**: Complete URL of the verification code image.

### 19、FormStringSelectFieldWidget

**Type Declaration**:

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

**Methods**:

#### **handleOptions**

+ **Function Description**: Process enumeration options, map `displayName` to labels, and fill in `name` when the value is missing.
+ **Type**: `(ops: RuntimeEnumerationOption[]) => RuntimeEnumerationOption[]`
+ **Parameters**:
  - `ops`: Original enumeration option array.
+ **Return Value**: Processed enumeration option array.

### 20、FormStringMultiSelectFieldWidget

**Type Declaration**:

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

**Methods**:

#### **handleOptions**

+ **Function Description**: Process enumeration options, map `displayName` to labels, and fill in `name` when the value is missing.
+ **Type**: `(ops: RuntimeEnumerationOption[]) => RuntimeEnumerationOption[]`
+ **Parameters**:
  - `ops`: Original enumeration option array.
+ **Return Value**: Processed enumeration option array.

## (二) Text

### 1、FormTextFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search],
    ttype: ModelFieldType.Text
  })
)
export class FormTextFieldWidget extends FormStringFieldWidget
```

**Properties**:

+ maxLength: Maximum text length, priority: DSL configuration > field storage size > default value `16383`.（`number`）
+ rows: Number of text area rows, default value is `3` (takes effect when DSL configuration is not a number).（`number`）

**Methods**:

#### **validator**

+ **Function Description**: Asynchronously validate the input value, inherit the parent class validation logic (specific validation and length validation).
+ **Type**: `() => Promise<ValidatorInfo>`
+ **Return Value**: Validation result information.

## (三) Html

### 1、FormHtmlRichTextFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Form,
    ttype: ModelFieldType.HTML
  })
)
export class FormHtmlRichTextFieldWidget extends FormStringFieldWidget
```

**Properties**:

+ encode: Whether to perform URI encoding on the content, default value is `false`.（`boolean`）
+ height: Rich text editor height, automatically converted to pixel units (e.g., `'200'` is converted to `'200px'`).（`string | undefined`）

**Methods**:

#### **change**

+ **Function Description**: Value change processing, encode the content according to the `encode` configuration and then trigger the parent class change.
+ **Type**: `(val: string) => void`
+ **Parameters**:
  - `val`: Value after change.

#### **validator**

+ **Function Description**: Asynchronously validate the input value, perform length validation after automatically decoding the encoded content.
+ **Type**: `() => Promise<ValidatorInfo>`
+ **Return Value**: Validation result information.

## (四) Phone

### 1、FormPhoneFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search],
    ttype: ModelFieldType.Phone
  })
)
export class FormPhoneFieldWidget extends FormStringFieldWidget
```

**Methods**:

#### **validator**

+ **Function Description**: Asynchronously validate the phone number format, inherit the parent class validation logic and add phone number regular expression validation.
+ **Type**: `() => Promise<ValidatorInfo>`
+ **Return Value**: Validation result information.

## (五) Email

### 1、FormEmailFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search],
    ttype: ModelFieldType.Email
  })
)
export class FormEmailFieldWidget extends FormStringFieldWidget
```

**Methods**:

#### **validator**

+ **Function Description**: Asynchronously validate the email format, inherit the parent class validation logic and add email regular expression validation.
+ **Type**: `() => Promise<ValidatorInfo>`
+ **Return Value**: Validation result information.

## (六) Integer

### 1、FormIntegerFieldWidget

**Type Declaration**:

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

**Properties**:

+ addStep: Increment step.（`any`）
+ autocorrection: Whether to automatically correct the format, default value is `false`.（`boolean`）
+ max: Maximum value, priority: DSL expression calculation value > field configuration > automatic calculation value (based on length and precision) > maximum safe integer.（`string | number | undefined`）
+ maxSafeInteger: Maximum safe integer, default value is `9223372036854775807`.（`string | number`）
+ min: Minimum value, priority: DSL expression calculation value > field configuration > automatic calculation value (based on length and precision) > minimum safe integer.（`string | number | undefined`）
+ minSafeInteger: Minimum safe integer, default value is `-9223372036854775808`.（`string | number`）
+ reduceStep: Decrement step.（`any`）
+ step: Step size.（`any`）
+ unit: Unit.（`string | undefined`）

**Methods**:

#### **checkValue**

+ **Function Description**: Verify whether the value is within the legal range (minimum value/maximum value/safe integer).
+ **Type**: `(singleValue: any, res: ValidatorInfo) => ValidatorInfo`
+ **Parameters**:
  - `singleValue`: Value to be verified.
  - `res`: Current validation result.
+ **Return Value**: Updated validation result.

#### **validator**

+ **Function Description**: Asynchronously validate the input value, inherit the parent class validation logic and add integer format validation (error when not an integer).
+ **Type**: `() => Promise<ValidatorInfo>`
+ **Return Value**: Validation result information.

#### **rawValidator**

+ **Function Description**: Execute the parent class original validation logic (excluding custom integer validation).
+ **Type**: `() => Promise<ValidatorInfo>`
+ **Return Value**: Validation result information.

### 2、FormIntegerMultiFieldWidget

**Type Declaration**:

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

**Properties**:

+ allowRepeat: Whether to allow duplicate tags, default value is `false`.（`boolean`）
+ inputRegular: Input content regular expression matching rule, default value is `/\[^\d]/g` (filter non-numeric characters).（`RegExp`）
+ limit: Maximum number of tags, priority: field configuration > DSL configuration > default value `0`.（`number`）
+ unitValueLength: Tag value length, priority: DSL configuration > field attribute configuration.（`number | undefined`）

**Methods**:

#### **tagChange**

+ **Function Description**: Tag value change processing, convert empty array to `null` and then trigger change and lose focus.
+ **Type**: `(value: any) => void`
+ **Parameters**:
  - `value`: Array of tag values after change.

#### **validator**

+ **Function Description**: Asynchronously validate the number of tags and the validity of each tag value (inherit integer validation logic).
+ **Type**: `() => Promise<ValidatorInfo>`
+ **Return Value**: Validation result information.

### 3、FormIntegerTagFieldWidget

**Type Declaration**:

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

**Type Declaration**:

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

**Properties**:

+ direction: Slider direction, default value is `SliderDirection.HORIZONTAL`.（`string`）
+ hasTooltip: Whether to display tooltip, default value is `!!tooltipFormatter` (display when there is a formatting function).（`boolean`）
+ max: Maximum value, default value is `100` (takes effect when DSL configuration is empty).（`number`）
+ min: Minimum value, default value is `0` (takes effect when DSL configuration is empty).（`number`）
+ reverse: Whether to slide in reverse, default value is `false`.（`boolean`）
+ step: Slider step size, default value is `1` (takes effect when DSL configuration is empty).（`number`）
+ tooltipFormatter: Tooltip formatting function.（`string | undefined`）

## (七) Float

### 1、FormFloatFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search],
    ttype: [ModelFieldType.Float]
  })
)
export class FormFloatFieldWidget extends FormIntegerFieldWidget
```

**Properties**:

+ maxSafeInteger: Maximum safe integer, default value is `Number.MAX_SAFE_INTEGER`.（`number`）
+ minSafeInteger: Minimum safe integer, default value is `Number.MIN_SAFE_INTEGER`.（`number`）
+ precision: Decimal precision (inherited from the parent class, obtained through field configuration).（`number | undefined`）

**Methods**:

#### **change**

+ **Function Description**: Value change processing, mark the change status and then trigger the parent class change.
+ **Type**: `(value: any) => void`
+ **Parameters**:
  - `value`: Value after change.

#### **submit**

+ **Function Description**: Process form submission, automatically format the value (fill in zeros/convert to string).
+ **Type**: `(submitValue: SubmitValue) => any`
+ **Parameters**:
  - `submitValue`: Value to be submitted.
+ **Return Value**: Submission processing result.

#### **validator**

+ **Function Description**: Asynchronously validate the input value, add decimal format validation (prohibit pure decimal point at the beginning, limit the number of decimal places).
+ **Type**: `() => Promise<ValidatorInfo>`
+ **Return Value**: Validation result information.

### 2、FormFloatPlatFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: [ViewType.Form, ViewType.Detail],
    widget: 'Plat'
  })
)
export class FormFloatPlatFieldWidget extends FormRangeFieldsWidget<number>
```

**Properties**:

+ defaultDecimal: Default number of decimal places, value is `6`.（`number`）
+ startFieldDecimal: Starting field decimal places, priority: starting field configuration > default value `6`.（`number`）
+ endFieldDecimal: Ending field decimal places, priority: ending field configuration > default value `6`.（`number`）

## (八) Money

### 1、FormMoneyFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search],
    ttype: ModelFieldType.Currency
  })
)
export class FormMoneyFieldWidget extends FormFloatFieldWidget
```

## (九) Boolean

### 1、FormBooleanSwitchFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Form,
    ttype: ModelFieldType.Boolean
  })
)
export class FormBooleanSwitchFieldWidget extends FormFieldWidget
```

**Methods**:

#### **validator**

+ **Function Description**: Asynchronously validate the input value, default returns successful validation.
+ **Type**: `() => Promise<ValidatorInfo>`
+ **Return Value**: Always successful validation information.

### 2、FormBooleanCheckboxFieldWidget

**Type Declaration**:

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

**Methods**:

#### **validator**

+ **Function Description**: Asynchronously validate the input value, skip validation by default.
+ **Type**: `() => Promise<ValidatorInfo>`
+ **Return Value**: Validation result.

### 3、FormBooleanRadioFieldWidget

**Type Declaration**:

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

**Properties**:

+ rowLimit: Number of radio buttons displayed per row.（`number | undefined`）

**Methods**:

#### **change**

+ **Function Description**: Value change processing, call the parent class change method.
+ **Type**: `(val: EnumerationValue | EnumerationValue[] | null | undefined) => void`
+ **Parameters**:
  - `val`: Value after change.

### 4、FormBooleanSelectFieldWidget

**Type Declaration**:

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

**Properties**:

+ value: Current value, automatically converted to string type (`'true'`/`'false'`).（`string | null | undefined`）

**Methods**:

#### **change**

+ **Function Description**: Value change processing, automatically convert the value to boolean type.
+ **Type**: `(val: EnumerationValue | EnumerationValue[] | null | undefined) => void`
+ **Parameters**:
  - `val`: Value after change.

#### **getAvailableOptions**

+ **Function Description**: Get available options, default returns `Yes` (`true`) and `No` (`false`) when there is no configuration.
+ **Type**: `() => RuntimeEnumerationOption[]`
+ **Return Value**: Option array.

#### **getMetaOptionNames**

+ **Function Description**: Get metadata option names, default returns `['true', 'false']`.
+ **Type**: `() => string[]`
+ **Return Value**: Option name array.

#### **submit**

+ **Function Description**: Process form submission, use the boolean value dedicated submission processor.
+ **Type**: `(submitValue: SubmitValue) => any`
+ **Parameters**:
  - `submitValue`: Value to be submitted.
+ **Return Value**: Submission processing result.

## (十) Enum

### 1、FormEnumFieldWidget

**Type Declaration**:

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

**Type Declaration**:

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

**Properties**:

+ allowClear: Whether to allow clearing the selection state, default value is `false`.（`boolean`）
+ autocorrection: Whether to automatically correct input, default value is `false`.（`boolean`）
+ rowLimit: Number of radio buttons displayed per row.（`number | undefined`）

### 3、FormEnumMultiSelectFieldWidget

**Type Declaration**:

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

**Type Declaration**:

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

**Properties**:

+ validateTrigger: Validation trigger timing, default value is `[ValidateTrigger.CHANGE]`.（`ValidateTrigger[]`）

## (十一) Datetime

### 1、FormDateTimeFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Search, ViewType.Form],
    ttype: ModelFieldType.DateTime
  })
)
export class FormDateTimeFieldWidget extends FormFieldWidget<string>
```

**Properties**:

+ allowClear: Whether to allow clearing, default value is `true`.（`boolean`）
+ dateFormat: Date formatting rule, priority: DSL expression > resource configuration > default value (`YYYY-MM-DD`).（`string | undefined`）
+ dateTimeFormat: Complete date and time format (combination of date format and time format).（`string | undefined`）
+ endDate: End date (original value), supports expressions.（`any`）
+ endDateOffset: End date offset, default value is `0`.（`number`）
+ endDateOffsetUnit: End date offset unit.（`string | undefined`）
+ format: Formatting rule configured in XML (highest priority).（`string | undefined`）
+ open: Whether the date selection panel is open.（`boolean`）
+ quickOptions: Quick selection options, supports converting comma-separated strings to arrays.（`DateQuickOption[]`）
+ realEndDate: Processed end date (including offset).（`string | undefined`）
+ realStartDate: Processed start date (including offset).（`string | undefined`）
+ resourceDateTimeFormat: Resource date and time format configuration.（`IResourceDateTimeFormat`）
+ showTimeDefaultValue: Time default value (`00:00:00`).（`Moment`）
+ startDate: Start date (original value), supports expressions.（`any`）
+ startDateOffset: Start date offset, default value is `0`.（`number`）
+ startDateOffsetUnit: Start date offset unit.（`string | undefined`）
+ timeFormat: Time formatting rule, priority: DSL expression > resource configuration > default value (`HH:mm:ss`).（`string | undefined`）
+ valueFormat: Field value formatting rule.（`string | undefined`）

**Methods**:

#### **changeOpenValue**

+ **Function Description**: Update the open state of the date selection panel.
+ **Type**: `(open: boolean) => void`
+ **Parameters**:
  - `open`: Panel open state.

#### **closePanelChange**

+ **Function Description**: Trigger when closing the date selection panel, process value change and lose focus logic.
+ **Type**: `() => Promise<void>`

#### **correctingStartShowTimeDefaultValue**

+ **Function Description**: Correct the start time default value to ensure it is not earlier than the processed start date.
+ **Type**: `(e: string | Date) => string | Date`
+ **Parameters**:
  - `e`: Original time value.

#### **disabledDate**

+ **Function Description**: Disable date verification, limit the selectable range according to the start and end dates (including offset).
+ **Type**: `(current: Moment) => boolean`
+ **Parameters**:
  - `current`: Current date.

#### **disabledTime**

+ **Function Description**: Disable time verification, limit the selectable time range according to the start and end dates (including offset).
+ **Type**: `(e: Moment) => Object`
+ **Parameters**:
  - `e`: Current time.

#### **openPanelChange**

+ **Function Description**: Trigger when opening the date selection panel, set the initial value.
+ **Type**: `() => void`

#### **quickChange**

+ **Function Description**: Process quick option switching, update the selected value.
+ **Type**: `(quickOption: DateQuickOption) => void`
+ **Parameters**:
  - `quickOption`: Quick option value.

#### **quickOptionsCompareDisable**

+ **Function Description**: Determine whether the quick option is disabled (exceeds the start and end date range).
+ **Type**: `(quickOption: DateQuickOption) => boolean`
+ **Parameters**:
  - `quickOption`: Quick option value.

#### **validator**

+ **Function Description**: Asynchronously validate the input value, verify whether the date is within the start and end range.
+ **Type**: `() => Promise<ValidatorInfo>`
+ **Return Value**: Validation result information.

### 2、FormDateTimeRangeFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Form,
    widget: 'DateTimeRangePicker'
  })
)
export class FormDateTimeRangeFieldWidget extends FormRangeFieldsWidget<StandardString>
```

**Properties**:

+ allowClear: Whether to allow clearing, default value is `true`.（`boolean`）
+ dateFormat: Date formatting rule, priority: DSL expression > resource configuration > default value (`YYYY-MM-DD`).（`string | undefined`）
+ defaultValidateTrigger: Validation trigger timing, fixed as `[ValidateTrigger.CHANGE]`.（`ValidateTrigger[]`）
+ endPlaceholder: End date placeholder.（`string | undefined`）
+ format: Formatting rule configured in XML (highest priority).（`string | undefined`）
+ resourceDateTimeFormat: Resource date and time format configuration.（`IResourceDateTimeFormat`）
+ showTimeDefaultValue: Time default value (`[00:00:00, 00:00:00]`).（`Moment[]`）
+ startPlaceholder: Start date placeholder.（`string | undefined`）
+ timeFormat: Time formatting rule, priority: DSL expression > resource configuration > default value (`HH:mm:ss`).（`string | undefined`）

**Methods**:

#### **change**

+ **Function Description**: Value change processing, trigger the parent class change logic and process panel closing.
+ **Type**: `(val: StandardString[] | null | undefined) => void`
+ **Parameters**:
  - `val`: Date range value after change.

#### **closePanelChange**

+ **Function Description**: Trigger when closing the date selection panel, process value change and lose focus logic.
+ **Type**: `() => Promise<void>`

#### **generatorConstructMirrorSubmitData**

+ **Function Description**: Generate a submission data mirror, map the start/end field values.
+ **Type**: `() => ActiveRecord`
+ **Return Value**: Object containing start and end field values.

#### **getInitializeComponent**

+ **Function Description**: Get the initialization component.
+ **Type**: `() => WidgetComponent`
+ **Return Value**: Date and time range picker component `DefaultDateTimeRangePicker`.

#### **openPanelChange**

+ **Function Description**: Trigger when opening the date selection panel, set the initial value.
+ **Type**: `() => void`

## (十二) Date

### 1、FormDateFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Search, ViewType.Form],
    ttype: ModelFieldType.Date
  })
)
export class FormDateFieldWidget extends FormDateTimeFieldWidget
```

**Methods**:

#### **change**

+ **Function Description**: Value change processing, call the parent class change method and trigger lose focus.
+ **Type**: `(v: string | null | undefined) => void`
+ **Parameters**:
  - `v`: Value after change.

#### **defaultConstructDataTrigger**

+ **Function Description**: Return the data construction trigger condition.
+ **Type**: `() => WidgetTrigger[]`
+ **Return Value**: Trigger condition array.

#### **defaultClearFieldsTrigger**

+ **Function Description**: Return the field clearing trigger condition.
+ **Type**: `() => WidgetTrigger[]`
+ **Return Value**: Trigger condition array.

#### **getInitializeComponent**

+ **Function Description**: Get the initialization component.
+ **Type**: `() => WidgetComponent`
+ **Return Value**: Date picker component `DefaultDatePicker`.

### 2、FormDateRangeFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Form,
    widget: 'DateRangePicker'
  })
)
export class FormDateRangeFieldWidget extends FormDateTimeRangeFieldWidget
```

**Methods**:

#### **getInitializeComponent**

+ **Function Description**: Get the initialization component.
+ **Type**: `() => WidgetComponent`
+ **Return Value**: Date range picker component, default value is `DefaultDateRangePicker`.

## (十三) Time

### 1、FormTimeFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Search, ViewType.Form],
    ttype: ModelFieldType.Time
  })
)
export class FormTimeFieldWidget extends FormDateTimeFieldWidget
```

**Methods**:

#### **getInitializeComponent**

+ **Function Description**: Get the initialization component.
+ **Type**: `() => WidgetComponent`
+ **Return Value**: Time picker component, default value is `DefaultTimePicker`.

### 2、FormTimeRangeFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Form,
    widget: 'TimeRangePicker'
  })
)
export class FormTimeRangeFieldWidget extends FormDateTimeRangeFieldWidget
```

**Methods**:

#### **getInitializeComponent**

+ **Function Description**: Get the initialization component.
+ **Type**: `() => WidgetComponent`
+ **Return Value**: Time range picker component, default value is `DefaultTimeRangePicker`.

## (十四) Year

### 1、FormYearFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Search, ViewType.Form],
    ttype: ModelFieldType.Year
  })
)
export class FormYearFieldWidget extends FormDateTimeFieldWidget
```

**Methods**:

#### **change**

+ **Function Description**: Value change processing, call the parent class change method and trigger lose focus.
+ **Type**: `(v: string | null | undefined) => void`
+ **Parameters**:
  - `v`: Value after change.

#### **defaultConstructDataTrigger**

+ **Function Description**: Return the data construction trigger condition.
+ **Type**: `() => WidgetTrigger[]`
+ **Return Value**: Trigger condition array.

#### **defaultClearFieldsTrigger**

+ **Function Description**: Return the field clearing trigger condition.
+ **Type**: `() => WidgetTrigger[]`
+ **Return Value**: Trigger condition array.

#### **getInitializeComponent**

+ **Function Description**: Get the initialization component.
+ **Type**: `() => WidgetComponent`
+ **Return Value**: Year picker component, default value is `DefaultYearPicker`.

### 2、FormYearRangeFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Form,
    widget: 'YearRangePicker'
  })
)
export class FormYearRangeFieldWidget extends FormDateTimeRangeFieldWidget
```

**Methods**:

#### **getInitializeComponent**

+ **Function Description**: Get the initialization component.
+ **Type**: `() => WidgetComponent`
+ **Return Value**: Year range picker component, default value is `DefaultYearRangePicker`.

## (十五) Map

### 1、FormMapFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Form,
    ttype: ModelFieldType.Map
  })
)
export class FormMapFieldWidget extends FormFieldWidget<Record<string, string>>
```

**Properties**:

+ items: Map item array, default value is `[]`.（`MapItem[]`）
+ limit: Number of item limits (DSL configuration converted to number).（`number | undefined`）
+ mountedCallChaining: Mounted chaining call hook (injected attribute).（`CallChaining | undefined`）

**Methods**:

#### **addRecord**

+ **Function Description**: Add an empty map item.
+ **Type**: `() => void`

#### **generatorValue**

+ **Function Description**: Generate the key-value pair object corresponding to the current map item, ignoring empty items.
+ **Type**: `() => Record<string, string> | null | undefined`
+ **Return Value**: Key-value pair object or `null` (when there are no valid items).

#### **onHandleChange**

+ **Function Description**: Trigger when the map item changes, update the field value.
+ **Type**: `() => void`

#### **removeRecord**

+ **Function Description**: Delete the map item at the specified index, and trigger value change and lose focus.
+ **Type**: `(index: number) => void`
+ **Parameters**:
  - `index`: Index of the map item to be deleted.

#### **submit**

+ **Function Description**: Submit the field value, use the default submission processor.
+ **Type**: `(submitValue: SubmitValue) => Promise<any>`
+ **Parameters**:
  - `submitValue`: Submission value object.
+ **Return Value**: Submission processing result.

#### **validator**

+ **Function Description**: Asynchronously validate the field value, verify required items and key uniqueness.
+ **Type**: `() => Promise<ValidatorInfo>`
+ **Return Value**: Validation result information.
  
---
title: Form Field
index: true
category:
  - R&D Manual
  - Reference
  - Frontend API
  - Widget
  - Field
order: 3

---
# Reference List

## (十六) ManyToOne (M2O)

### 1、FormM2OSelectFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Form,
    ttype: ModelFieldType.ManyToOne
  })
)
export class FormM2OSelectFieldWidget extends FormSelectComplexFieldWidget<ActiveRecord, RuntimeM2OField>
```

**Properties**:

+ computeQueryOneKey: Key name for querying associated records.（`string | undefined`）
+ currentValueLabel: Label text of the currently selected value.（`string`）

**Methods**:

#### **change**

+ **Function Description**: Value change processing, supporting special cases such as empty values and empty objects.
+ **Type**: `(value: any) => void`
+ **Parameters**:
  - `value`: Value after change.

#### **computeQueryOneDefaultKey**

+ **Function Description**: Get the default query key name, default is `id`.
+ **Type**: `() => string`

#### **fillOptions**

+ **Function Description**: Fill option data (single-value mode).
+ **Type**: `(dataList: Record<string, unknown>[], insetDefaultValue?: boolean) => Promise<void>`
+ **Parameters**:
  - `dataList`: Option data list.
  - `insetDefaultValue`: Whether to insert default value.

#### **handleSelectedValueLabel**

+ **Function Description**: Process the label text of the selected value.
+ **Type**: `(val: any) => Promise<void>`
+ **Parameters**:
  - `val`: Selected value.

#### **m2oChange**

+ **Function Description**: ManyToOne relationship change, call the parent class change method.
+ **Type**: `(value: Record<string, unknown>) => void`
+ **Parameters**:
  - `value`: Value after change.

#### **mounted**

+ **Function Description**: Processing after component mounting, listening to value changes.
+ **Type**: `() => Promise<void>`

#### **submit**

+ **Function Description**: Submit ManyToOne relationship field data.
+ **Type**: `(submitValue: SubmitValue) => Promise<any>`
+ **Parameters**:
  - `submitValue`: Value to be submitted.

#### **updateM2oValue**

+ **Function Description**: Update ManyToOne relationship value, supporting expression calculation.
+ **Type**: `() => Promise<void>`

#### **watchM2OValue**

+ **Function Description**: Listen to form data changes, delay updating ManyToOne value.
+ **Type**: `() => Promise<void>`

### 2、FormM2ORadioFieldWidget

**Type Declaration**:

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

**Properties**:

+ selectedValues: ID array of currently selected values.（`string[] | undefined`）

**Methods**:

#### **submit**

+ **Function Description**: Submit ManyToOne relationship field data.
+ **Type**: `(submitValue: SubmitValue) => Promise<any>`
+ **Parameters**:
  - `submitValue`: Value to be submitted.

### 3、FormM2OTreeSelectFieldWidget

**Type Declaration**:

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

**Methods**:

#### **submit**

+ **Function Description**: Submit ManyToOne relationship field data.
+ **Type**: `(submitValue: SubmitValue) => Promise<any>`
+ **Parameters**:
  - `submitValue`: Value to be submitted.

### 4、FormM2OCascaderFieldWidget

**Type Declaration**:

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

**Methods**:

#### **submit**

+ **Function Description**: Submit ManyToOne relationship field data.
+ **Type**: `(submitValue: SubmitValue) => Promise<any>`
+ **Parameters**:
  - `submitValue`: Value to be submitted.

### 5、FormM2OUploadFieldWidget

**Type Declaration**:

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

**Methods**:

#### **change**

+ **Function Description**: Value change processing, supporting array to single value conversion.
+ **Type**: `(value: any) => void`
+ **Parameters**:
  - `value`: Value after change.

#### **getImportFile**

+ **Function Description**: Process imported files, update value to the first file or `null`.
+ **Type**: `(data: any[]) => void`
+ **Parameters**:
  - `data`: File data array.

#### **remove**

+ **Function Description**: Remove file, update value to `null`.
+ **Type**: `(file: any) => void`
+ **Parameters**:
  - `file`: File to be removed.

### 6、FormM2OUploadImgFieldWidget

**Type Declaration**:

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

**Properties**:

+ showPreviewTitle: Whether to display the preview title, priority: DSL configuration (boolean/string boolean) > default value `true`.（`boolean`）

**Methods**:

#### **change**

+ **Function Description**: Value change processing, supporting array to single value conversion, trigger lose focus.
+ **Type**: `(v: any) => void`
+ **Parameters**:
  - `v`: Value after change.

#### **getImportFile**

+ **Function Description**: Process imported image files, update value to the first file or `null`.
+ **Type**: `(data: any[]) => void`
+ **Parameters**:
  - `data`: Image data array.

#### **remove**

+ **Function Description**: Remove image file, update value to `null`, trigger lose focus.
+ **Type**: `(file: any) => void`
+ **Parameters**:
  - `file`: Image file to be removed.

### 7、FormM2OUploadDraggableFieldWidget

**Type Declaration**:

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

**Properties**:

+ draggableIcon: Drag and drop upload icon, default value is `oinone-shangchuan1`.（`string`）
+ draggableTipText: Drag and drop upload prompt, default value is `Click or drag files here to upload`.（`string`）
+ draggableExtendsionsText: Allowed file type prompt text, default value is `Support extensions: {extensions}`.（`string`）
+ showDraggableExtendsionsText: Whether to display supported extensions, default value is `true`.（`boolean`）

### 8、FormM2OCompanyFieldWidget

**Type Declaration**:

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

**Methods**:

#### **generatorDefaultTreeDefinition**

+ **Function Description**: Generate default company tree definition.
+ **Type**: `(props: any) => any`
+ **Parameters**:
  - `props`: Component properties.

### 9、FormM2ODepartmentFieldWidget

**Type Declaration**:

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

**Methods**:

#### **generatorDefaultTreeDefinition**

+ **Function Description**: Generate default department tree definition.
+ **Type**: `(props: any) => any`
+ **Parameters**:
  - `props`: Component properties.

### 10、FormM2OEmployeeFieldWidget

**Type Declaration**:

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

**Methods**:

#### **generatorDefaultTreeDefinition**

+ **Function Description**: Generate default employee tree definition.
+ **Type**: `(props: any) => any`
+ **Parameters**:
  - `props`: Component properties.

### 11、FormM2OAddressFieldWidget

**Type Declaration**:

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

**Properties**:

+ changeOnSelect: Whether to trigger change immediately when selecting a node, default value is `true` (DSL configuration converted to boolean).（`boolean`）

**Methods**:

#### **fetchBackfillData**

+ **Function Description**: Reverse query backfill data, generate backfill tree nodes based on current values and metadata.
+ **Type**: `(currentValues: ActiveRecord[], metadataList: TreeNodeMetadata[]) => Promise<TreeNodeResponseBody[] | undefined>`
+ **Parameters**:
  - `currentValues`: Current value list.
  - `metadataList`: Metadata list.
+ **Return Value**: Backfill tree node response body array, or `undefined` (when no matching data).

#### **generatorCompareRecords**

+ **Function Description**: Generate records for comparison, extract associated fields from current values.
+ **Type**: `(currentValues: ActiveRecord[], metadataList: TreeNodeMetadata[]) => ActiveRecord[] | undefined>`
+ **Parameters**:
  - `currentValues`: Current value list.
  - `metadataList`: Metadata list.
+ **Return Value**: Comparison record array, or `undefined` (when no valid records).

#### **generatorDefaultTreeDefinition**

+ **Function Description**: Generate default address tree definition.
+ **Type**: `(props: any) => any`
+ **Parameters**:
  - `props`: Component properties.
+ **Return Value**: Address tree definition object.

#### **getSubmitField**

+ **Function Description**: Get submit field mapping configuration, parsed from node metadata.
+ **Type**: `(metadata: TreeNodeMetadata) => Record<string, string> | undefined`
+ **Parameters**:
  - `metadata`: Node metadata.
+ **Return Value**: Submit field mapping object, or `undefined` (when no valid configuration).

#### **submit**

+ **Function Description**: Submit field data, use default submission processor.
+ **Type**: `(submitValue: SubmitValue) => Promise<any>`
+ **Parameters**:
  - `submitValue`: Value to be submitted.
+ **Return Value**: Submission processing result.

#### **$onSelectedChange**

+ **Function Description**: Trigger when selected nodes change, recursively process values of selected nodes and their parent nodes.
+ **Type**: `(selectedNodes: OioTreeNode<TreeData>[] | null | undefined) => void`
+ **Parameters**:
  - `selectedNodes`: Selected node list.

### 12、FormM2OFormFieldWidget

**Type Declaration**:

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

## (十七) OneToMany (O2M)

### 1、FormO2MSelectFieldWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search],
    ttype: ModelFieldType.OneToMany
  })
)
export class FormO2MSelectFieldWidget extends FormSelectComplexFieldWidget
```

**Properties**:

+ selectedValues: Current selected value array (inherited from parent class).（`any[]`）

**Methods**:

#### **change**

+ **Function Description**: Value change processing, filter invalid options and update parent class value.
+ **Type**: `(value: { value: string }[]) => void`
+ **Parameters**:
  - `value`: Changed option value array (with `value` attribute).

#### **fetchData**

+ **Function Description**: Get associated data (logic not fully implemented, includes commented query logic).
+ **Type**: `() => Promise<void>`

#### **fillOptions**

+ **Function Description**: Fill multi-option data, call parent class batch fill logic.
+ **Type**: `(dataList: Record<string, unknown>[], insetDefaultValue?: boolean) => Promise<void>`
+ **Parameters**:
  - `dataList`: Option data list.
  - `insetDefaultValue`: Whether to insert default value (default is `true`).

#### **loadOriginValue**

+ **Function Description**: Load original value after component mounting (inherited from parent class).
+ **Type**: `() => Promise<void>`

### 2、FormO2MCheckboxFieldWidget

**Type Declaration**:

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

**Methods**:

#### **submit**

+ **Function Description**: Submit OneToMany relationship field data.
+ **Type**: `(submitValue: SubmitValue) => Promise<any>`
+ **Parameters**:
  - `submitValue`: Value to be submitted.
+ **Return Value**: Submission processing result.

### 3、FormO2MCascaderFieldWidget

**Type Declaration**:

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

**Properties**:

+ selectMode: Selection mode, fixed as multi-select mode.（`SelectMode`）

**Methods**:

#### **submit**

+ **Function Description**: Submit OneToMany relationship field data.
+ **Type**: `(submitValue: SubmitValue) => Promise<any>`
+ **Parameters**:
  - `submitValue`: Value to be submitted.
+ **Return Value**: Submission processing result.

### 4、FormO2MTreeSelectFieldWidget

**Type Declaration**:

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

**Properties**:

+ selectMode: Selection mode, fixed as multi-select mode.（`SelectMode`）

**Methods**:

#### **submit**

+ **Function Description**: Submit OneToMany relationship field data.
+ **Type**: `(submitValue: SubmitValue) => Promise<any>`
+ **Parameters**:
  - `submitValue`: Value to be submitted.
+ **Return Value**: Submission processing result.

### 5、FormO2MUploadFieldWidget

**Type Declaration**:

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

**Properties**:

+ cdnKey: CDN key.（`string | undefined`）
+ privateLink: Whether it is a private link, convert DSL configuration to boolean.（`boolean`）

### 6、FormO2MUploadImgFieldWidget

**Type Declaration**:

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

**Type Declaration**:

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

**Properties**:

+ draggableIcon: Drag and drop upload icon, default value is `oinone-shangchuan1`.（`string`）
+ draggableTipText: Drag and drop upload prompt, default value is `Click or drag files here to upload`.（`string`）
+ draggableExtendsionsText: Allowed file type prompt text, format is `Support extensions: {extensions}`.（`string`）
+ showDraggableExtendsionsText: Whether to display supported extensions, default value is `true`.（`boolean`）

### 8、FormO2MTableFieldWidget

**Type Declaration**:

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

**Methods**:

#### **initSubviewData**

+ **Function Description**: Initialize subview data, generate OneToMany relationship query conditions.
+ **Type**: `() => ReturnPromise<void>`

#### **refreshValueProcess**

+ **Function Description**: Refresh value processing, reload cache when acting as data source provider.
+ **Type**: `() => Promise<void>`

#### **submit**

+ **Function Description**: Submit OneToMany relationship field data.
+ **Type**: `(submitValue: SubmitValue) => Promise<any>`
+ **Parameters**:
  - `submitValue`: Value to be submitted.
+ **Return Value**: Submission processing result.

## (十八) ManyToMany (M2M)

### 1、FormM2MFieldSelectWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search],
    ttype: ModelFieldType.ManyToMany
  })
)
export class FormM2MFieldSelectWidget extends FormSelectComplexFieldWidget<ActiveRecord[], RuntimeM2MField>
```

**Methods**:

#### **change**

+ **Function Description**: Value change processing, filter invalid options and update parent class value.
+ **Type**: `(value: any[]) => void`
+ **Parameters**:
  - `value`: Changed value array.

#### **fillOptions**

+ **Function Description**: Fill multi-option data, call parent class batch fill logic.
+ **Type**: `(dataList: Record<string, unknown>[], insetDefaultValue?: boolean) => Promise<void>`
+ **Parameters**:
  - `dataList`: Option data list.
  - `insetDefaultValue`: Whether to insert default value (default is `true`).

#### **submit**

+ **Function Description**: Submit ManyToMany relationship field data.
+ **Type**: `(submitValue: SubmitValue) => Promise<any>`
+ **Parameters**:
  - `submitValue`: Value to be submitted.
+ **Return Value**: Submission processing result.

### 2、FormM2MCheckboxFieldWidget

**Type Declaration**:

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

**Methods**:

#### **submit**

+ **Function Description**: Submit ManyToMany relationship field data.
+ **Type**: `(submitValue: SubmitValue) => Promise<any>`
+ **Parameters**:
  - `submitValue`: Value to be submitted.
+ **Return Value**: Submission processing result.

### 3、FormM2MTreeSelectFieldWidget

**Type Declaration**:

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

**Properties**:

+ selectMode: Selection mode, default is multi-select mode.（`SelectMode`）

**Methods**:

#### **submit**

+ **Function Description**: Submit ManyToMany relationship field data.
+ **Type**: `(submitValue: SubmitValue) => Promise<any>`
+ **Parameters**:
  - `submitValue`: Value to be submitted.
+ **Return Value**: Submission processing result.

### 4、FormM2MCascaderFieldWidget

**Type Declaration**:

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

**Properties**:

+ selectMode: Selection mode, default is multi-select mode.（`SelectMode`）

**Methods**:

#### **submit**

+ **Function Description**: Submit ManyToMany relationship field data.
+ **Type**: `(submitValue: SubmitValue) => Promise<any>`
+ **Parameters**:
  - `submitValue`: Value to be submitted.
+ **Return Value**: Submission processing result.

### 5、FormM2MUploadFieldWidget

**Type Declaration**:

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

**Properties**:

+ cdnKey: CDN key.（`string | undefined`）
+ privateLink: Whether it is a private link.（`boolean`）

### 6、FormM2MUploadImgFieldWidget

**Type Declaration**:

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

**Type Declaration**:

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

**Properties**:

+ draggableIcon: Drag and drop upload icon, default value is `oinone-shangchuan1`.（`string`）
+ draggableTipText: Drag and drop upload prompt, default value is `Click or drag files here to upload`.（`string`）
+ draggableExtendsionsText: Allowed file type prompt text, default value is `Support extensions: {extensions}`.（`string`）
+ showDraggableExtendsionsText: Whether to display supported extensions, default value is `true`.（`boolean`）

### 8、FormM2MTreeFieldWidget

**Type Declaration**:

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

**Properties**:

+ selectMode: Selection mode, default is multi-select mode.（`SelectMode`）

**Methods**:

#### **submit**

+ **Function Description**: Submit ManyToMany relationship field data.
+ **Type**: `(submitValue: SubmitValue) => Promise<any>`
+ **Parameters**:
  - `submitValue`: Value to be submitted.
+ **Return Value**: Submission processing result.

### 9、FormM2MCompanyFieldWidget

**Type Declaration**:

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

**Methods**:

#### **generatorDefaultTreeDefinition**

+ **Function Description**: Generate default company tree structure definition.
+ **Type**: `(props: any) => any`
+ **Parameters**:
  - `props`: Component properties.

### 10、FormM2MDepartmentFieldWidget

**Type Declaration**:

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

**Methods**:

#### **generatorDefaultTreeDefinition**

+ **Function Description**: Generate default department tree structure definition.
+ **Type**: `(props: any) => any`
+ **Parameters**:
  - `props`: Component properties.

### 11、FormM2MEmployeeFieldWidget

**Type Declaration**:

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

**Methods**:

#### **generatorDefaultTreeDefinition**

+ **Function Description**: Generate default employee tree structure definition.
+ **Type**: `(props: any) => any`
+ **Parameters**:
  - `props`: Component properties.

### 12、FormM2MTableFieldWidget

**Type Declaration**:

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

**Methods**:

#### **initSubviewData**

+ **Function Description**: Initialize subview data, generate ManyToMany relationship query conditions.
+ **Type**: `() => ReturnPromise<void>`

#### **refreshValueProcess**

+ **Function Description**: Refresh value processing, reload cache when acting as data source provider.
+ **Type**: `() => Promise<void>`

#### **submit**

+ **Function Description**: Submit ManyToMany relationship field data.
+ **Type**: `(submitValue: SubmitValue) => Promise<any>`
+ **Parameters**:
  - `submitValue`: Value to be submitted.
+ **Return Value**: Submission processing result.

## (十九) Abstract Base Classes

### 1、FormInputAbstractFieldWidget

**Inheritance**: FormFieldWidget

**Properties**:

+ inputRealValue: Actual input value.（`unknown`）
+ independentlyEditable: Whether it can be edited independently.（`boolean`）
+ mode: Input mode, default is dynamic mode.（`InputMediaMode`）
+ prefix: Prefix content.（`string`）
+ prefixStore: Whether the prefix is stored.（`boolean`）
+ prefixType: Prefix type.（`InputPreSuffixType`）
+ prefixes: Prefix list.（`string[] | undefined`）
+ prefixesValue: Currently selected prefix value.（`unknown`）
+ showPrefix: Whether to display the prefix.（`boolean`）
+ showSuffix: Whether to display the suffix.（`boolean`）
+ suffix: Suffix content.（`string`）
+ suffixStore: Whether the suffix is stored.（`boolean`）
+ suffixType: Suffix type.（`InputPreSuffixType`）
+ type: Input type.（`unknown`）

**Methods**:

#### **addPrefixSuffix**

+ **Function Description**: Add prefix and suffix to the input value.
+ **Type**: `(e: string) => string`
+ **Parameters**:
  - `e`: Input value.
+ **Return Value**: Processed value with prefix and suffix added.

#### **changeInputRealValue**

+ **Function Description**: Change the actual input value and trigger the change event.
+ **Type**: `(val: unknown) => void`
+ **Parameters**:
  - `val`: New actual value.

#### **changePrefixesValue**

+ **Function Description**: Change the prefix value and trigger the change event.
+ **Type**: `(val: unknown) => void`
+ **Parameters**:
  - `val`: New prefix value.

#### **removePrefixSuffix**

+ **Function Description**: Remove prefix and suffix from the input value.
+ **Type**: `(e: string) => string`
+ **Parameters**:
  - `e`: Input value.
+ **Return Value**: Processed value with prefix and suffix removed.

### 2、FormNumberAbstractFieldWidget

**Type Declaration**:

```typescript
export class FormNumberAbstractFieldWidget<
  Value extends NumberValue | NumberValue[] = NumberValue | NumberValue[]
> extends FormInputAbstractFieldWidget<Value, RuntimeNumberField>
```

**Properties**:

+ hiddenStepHandle: Whether to hide step operations.（`boolean`）
+ precision: Numeric precision (number of decimal places).（`number | null | undefined`）
+ size: Input box size.（`unknown`）
+ showThousandth: Whether to display thousandth separators.（`boolean`）
+ unit: Numeric unit.（`string`）

### 3、FormEnumFieldAbstractWidget

**Inheritance**: FormFieldWidget

**Properties**:

+ autocorrection: Whether to enable auto-correction.（`boolean`）
+ internalSelectedOptions: Array of internally selected option values.（`string[]`）
+ maxNumber: Maximum number of selections, default is infinity.（`number`）
+ minNumber: Minimum number of selections, default is negative infinity.（`number`）
+ optionColor: Whether options use colorful styles.（`boolean`）
+ optionColorStyle: Option color style, default is colorful style.（`OptionColorStyle`）
+ options: List of available options.（`RuntimeEnumerationOption[]`）
+ orientation: Arrangement direction.（`string | undefined`）
+ radioMode: Radio mode.（`string | undefined`）
+ renderOnParent: Whether to render in the parent container.（`boolean`）

**Methods**:

#### **defaultConstructDataTrigger**

+ **Function Description**: Get the trigger events for default construct data.
+ **Type**: `() => WidgetTrigger[]`
+ **Return Value**: Array of trigger events (including `CHANGE`).

#### **defaultClearFieldsTrigger**

+ **Function Description**: Get the trigger events for default clear fields.
+ **Type**: `() => WidgetTrigger[]`
+ **Return Value**: Array of trigger events (including `CHANGE`).

#### **fetchLabelByValue**

+ **Function Description**: Get the option label based on the value.
+ **Type**: `(value: EnumerationValue | EnumerationValue[]) => string`
+ **Parameters**:
  - `value`: Option value.
+ **Return Value**: Corresponding label string.

#### **getAvailableOptions**

+ **Function Description**: Get the list of available options, handling configuration and metadata matching, visibility, and auto-correction logic.
+ **Type**: `() => RuntimeEnumerationOption[]`
+ **Return Value**: Filtered option array.

#### **getPopupContainer**

+ **Function Description**: Get the rendering position of the popup container, return the parent node or document body if `renderOnParent` is configured.
+ **Type**: `() => ((triggerNode: HTMLElement) => HTMLElement) | null`
+ **Return Value**: Popup container positioning function or `null`.

#### **handleOptions**

+ **Function Description**: Process the option list, filter options not present in metadata and supplement default values.
+ **Type**: `(ops: RuntimeEnumerationOption[]) => RuntimeEnumerationOption[]`
+ **Parameters**:
  - `ops`: Original option array.
+ **Return Value**: Processed option array.

#### **getMetaOptionNames**

+ **Function Description**: Get the list of option names in the metadata.
+ **Type**: `() => string[] | undefined`
+ **Return Value**: Option name array or `undefined`.

#### **validator**

+ **Function Description**: Validate enumeration values, checking requiredness, quantity range, and option validity.
+ **Type**: `() => Promise<ValidatorInfo>`
+ **Return Value**: Validation result information (success or error).

#### **compute**

+ **Function Description**: Compute the component value, inherit parent class logic and return the result.
+ **Type**: `() => boolean | Value`
+ **Return Value**: Computed valid value or boolean result.

### 4、FormRelationFieldCheckboxWidget

**Inheritance**: FormComplexFieldWidget

**Properties**:

+ autocorrection: Whether to enable auto-correction.（`boolean`）
+ fullOptions: Complete option list.（`SelectItem<ActiveRecord>[] | undefined`）
+ fullOptionsMap: Complete option mapping table.（`Map<string, SelectItem<ActiveRecord>> | undefined`）
+ loadFullOptions: Whether to load full options.（`boolean | undefined`）
+ loadMaxTotalPage: Maximum load total pages, default is -1.（`number`）
+ loadPageSize: Pagination load size, default is 100.（`number`）
+ maxNumber: Maximum number of selections, default is infinity.（`number`）
+ minNumber: Minimum number of selections, default is negative infinity.（`number`）
+ optionLabel: Option label expression.（`string | undefined`）
+ orientation: Arrangement direction.（`string | undefined`）
+ options: List of available options.（`SelectItem<ActiveRecord>[]`）
+ selectedValues: Array of selected option key values.（`string[] | undefined`）

**Methods**:

#### **backfillSelectedValues**

+ **Function Description**: Backfill the selected option key values based on the current value.
+ **Type**: `() => void`

#### **defaultConstructDataTrigger**

+ **Function Description**: Get the trigger events for default construct data.
+ **Type**: `() => WidgetTrigger[]`
+ **Return Value**: Array of trigger events (including `CHANGE`).

#### **defaultClearFieldsTrigger**

+ **Function Description**: Get the trigger events for default clear fields.
+ **Type**: `() => WidgetTrigger[]`
+ **Return Value**: Array of trigger events (including `CHANGE`).

#### **executeExpressionByItem**

+ **Function Description**: Execute expressions based on data items, supporting translation and dynamic calculation.
+ **Type**: `(item: ActiveRecord, expression: string, errorValue?: T) => T | string | undefined`
+ **Parameters**:
  - `item`: Data item object.
  - `expression`: Expression string.
  - `errorValue`: Default value when expression execution fails (optional).
+ **Return Value**: Expression execution result or default value.

#### **fillFullOptionsForAll**

+ **Function Description**: Load and fill complete option data for all pages.
+ **Type**: `(firstPage: QueryPageResult<ActiveRecord>, pageSize: number) => Promise<void>`
+ **Parameters**:
  - `firstPage`: First page query result.
  - `pageSize`: Pagination size.

#### **fillFullOptionsForFirstPage**

+ **Function Description**: Fill option data for the first page and backfill selected values.
+ **Type**: `(firstPage: QueryPageResult<ActiveRecord>) => void`
+ **Parameters**:
  - `firstPage`: First page query result.

#### **generatorFullOptions**

+ **Function Description**: Generate complete option list and mapping table based on data records.
+ **Type**: `(activeRecords: ActiveRecord[]) => void`
+ **Parameters**:
  - `activeRecords`: Data record array.

#### **generatorKey**

+ **Function Description**: Generate a unique key value based on data records (based on primary key).
+ **Type**: `(activeRecord: ActiveRecord) => string | undefined`
+ **Parameters**:
  - `activeRecord`: Data record object.
+ **Return Value**: Composite primary key string or `undefined`.

#### **getAvailableOptions**

+ **Function Description**: Get the list of available options (directly return complete options).
+ **Type**: `() => SelectItem<ActiveRecord>[]`
+ **Return Value**: Option array.

#### **mountedProcess**

+ **Function Description**: Processing logic after mounting, load option data.
+ **Type**: `() => Promise<void>`

#### **onSelectedChange**

+ **Function Description**: Process selection change events, update selected values and trigger parent class changes.
+ **Type**: `(keys: string[] | undefined) => void`
+ **Parameters**:
  - `keys`: Array of selected key values or `undefined`.

#### **queryPage**

+ **Function Description**: Pagination query related data.
+ **Type**: `(option: Omit<QueryPageOptions, 'requestFields'>) => Promise<QueryPageResult<T>>`
+ **Parameters**:
  - `option`: Pagination query options (excluding request fields).
+ **Return Value**: Pagination query result.

#### **validator**

+ **Function Description**: Validate whether the number of selected items meets the range requirement.
+ **Type**: `() => Promise<ValidatorInfo>`
+ **Return Value**: Validation result information (success or error).

### 5、FormRelationFieldRadioWidget

**Inheritance**: FormComplexFieldWidget

**Properties**:

+ autocorrection: Whether to enable auto-correction.（`boolean`）
+ fullOptions: Complete option list.（`SelectItem<ActiveRecord>[] | undefined`）
+ fullOptionsMap: Complete option mapping table.（`Map<string, SelectItem<ActiveRecord>> | undefined`）
+ loadFullOptions: Whether to load full options.（`boolean | undefined`）
+ loadMaxTotalPage: Maximum load total pages, default is -1.（`number`）
+ loadPageSize: Pagination load size, default is 100.（`number`）
+ optionLabel: Option label expression.（`string | undefined`）
+ orientation: Arrangement direction.（`string | undefined`）
+ options: List of available options.（`SelectItem<ActiveRecord>[]`）
+ selectedValue: Selected option key value.（`string | undefined`）

**Methods**:

#### **backfillSelectedValues**

+ **Function Description**: Backfill the selected option key values based on the current value.
+ **Type**: `() => void`

#### **defaultConstructDataTrigger**

+ **Function Description**: Get the trigger events for default construct data.
+ **Type**: `() => WidgetTrigger[]`
+ **Return Value**: Array of trigger events (including `CHANGE`).

#### **defaultClearFieldsTrigger**

+ **Function Description**: Get the trigger events for default clear fields.
+ **Type**: `() => WidgetTrigger[]`
+ **Return Value**: Array of trigger events (including `CHANGE`).

#### **executeExpressionByItem**

+ **Function Description**: Execute expressions based on data items, supporting translation and dynamic calculation.
+ **Type**: `(item: ActiveRecord, expression: string, errorValue?: T) => T | string | undefined`
+ **Parameters**:
  - `item`: Data item object.
  - `expression`: Expression string.
  - `errorValue`: Default value when expression execution fails (optional).
+ **Return Value**: Expression execution result or default value.

#### **fillFullOptionsForAll**

+ **Function Description**: Load and fill complete option data for all pages.
+ **Type**: `(firstPage: QueryPageResult<ActiveRecord>, pageSize: number) => Promise<void>`
+ **Parameters**:
  - `firstPage`: First page query result.
  - `pageSize`: Pagination size.

#### **fillFullOptionsForFirstPage**

+ **Function Description**: Fill option data for the first page and backfill selected values.
+ **Type**: `(firstPage: QueryPageResult<ActiveRecord>) => void`
+ **Parameters**:
  - `firstPage`: First page query result.

#### **generatorFullOptions**

+ **Function Description**: Generate complete option list and mapping table based on data records.
+ **Type**: `(activeRecords: ActiveRecord[]) => void`
+ **Parameters**:
  - `activeRecords`: Data record array.

#### **generatorKey**

+ **Function Description**: Generate a unique key value based on data records (based on primary key).
+ **Type**: `(activeRecord: ActiveRecord) => string | undefined`
+ **Parameters**:
  - `activeRecord`: Data record object.
+ **Return Value**: Composite primary key string or `undefined`.

#### **getAvailableOptions**

+ **Function Description**: Get the list of available options (directly return complete options).
+ **Type**: `() => SelectItem<ActiveRecord>[]`
+ **Return Value**: Option array.

#### **mountedProcess**

+ **Function Description**: Processing logic after mounting, load option data.
+ **Type**: `() => Promise<void>`

#### **onSelectedChange**

+ **Function Description**: Process selection change events, update selected values and trigger parent class changes.
+ **Type**: `(key: string | undefined) => void`
+ **Parameters**:
  - `key`: Selected key value or `undefined`.

#### **queryPage**

+ **Function Description**: Pagination query related data.
+ **Type**: `(option: Omit<QueryPageOptions, 'requestFields'>) => Promise<QueryPageResult<T>>`
+ **Parameters**:
  - `option`: Pagination query options (excluding request fields).
+ **Return Value**: Pagination query result.

#### **validator**

+ **Function Description**: Validate whether a required item is selected.
+ **Type**: `() => Promise<ValidatorInfo>`
+ **Return Value**: Validation result information (success or error).

### 6、AbstractFormM2OUploadFieldWidget

**Inheritance**: FormM2OFieldWidget

**Properties**:

+ allLimitSize: Total file size limit configuration.（`string`）
+ chunkUploadThreshold: Chunk upload threshold, default is `defaultMultiPartConfig.chunkUploadThreshold`.（`number`）
+ cdnKey: CDN key (processed value).（`string | undefined`）
+ limit: File quantity limit, default is 1.（`number`）
+ limitFileExtensions: Restricted file extensions.（`string | undefined`）
+ limitSize: Single file size limit, default is -1 (unlimited).（`number`）
+ parallel: Number of parallel uploads, default is `defaultMultiPartConfig.parallel`.（`number`）
+ partSize: Chunk size, default is `defaultMultiPartConfig.partSize`.（`number`）
+ privateLink: Whether it is a private link.（`boolean`）

### 7、FormO2MFieldUploadBaseWidget

**Inheritance**: FormO2MFieldWidget

**Properties**:

+ allLimitSize: Total file size limit configuration, default is empty string.（`string`）
+ chunkUploadThreshold: Chunk upload threshold, default is `defaultMultiPartConfig.chunkUploadThreshold`.（`number`）
+ limit: File quantity limit, default is -1 (unlimited).（`number`）
+ limitFileExtensions: Restricted file extensions.（`string | undefined`）
+ limitSize: Single file size limit.（`number | undefined`）
+ multiple: Whether to support multiple file uploads, based on `multi` configuration.（`boolean`）
+ parallel: Number of parallel uploads, default is `defaultMultiPartConfig.parallel`.（`number`）
+ partSize: Chunk size, default is `defaultMultiPartConfig.partSize`.（`number`）

**Methods**:

#### **change**

+ **Function Description**: Update file list data, supporting `null` to clear data.
+ **Type**: `(data: ActiveRecord[] | null) => void`
+ **Parameters**:
  - `data`: File data array or `null`.

#### **remove**

+ **Function Description**: Remove specified file from file list.
+ **Type**: `(file: ActiveRecord) => void`
+ **Parameters**:
  - `file`: File object to be removed (matched by `id`).

### 8、FormM2MFieldUploadBaseWidget

**Inheritance**: FormM2MFieldWidget

**Properties**:

+ allLimitSize: Total file size limit configuration, default is empty string.（`string`）
+ chunkUploadThreshold: Chunk upload threshold, default is `defaultMultiPartConfig.chunkUploadThreshold`.（`number`）
+ limit: File quantity limit, default is -1 (unlimited).（`number`）
+ limitFileExtensions: Restricted file extensions.（`string | undefined`）
+ limitSize: Single file size limit.（`number | undefined`）
+ multiple: Whether to support multiple file uploads, based on `multi` configuration.（`boolean`）
+ parallel: Number of parallel uploads, default is `defaultMultiPartConfig.parallel`.（`number`）
+ partSize: Chunk size, default is `defaultMultiPartConfig.partSize`.（`number`）

**Methods**:

#### **change**

+ **Function Description**: Update file list data, supporting `null` to clear data.
+ **Type**: `(data: ActiveRecord[] | null) => void`
+ **Parameters**:
  - `data`: File data array or `null`.

#### **remove**

+ **Function Description**: Remove specified file from file list.
+ **Type**: `(file: ActiveRecord) => void`
+ **Parameters**:
  - `file`: File object to be removed (matched by `id`).

### 9、FormRangeFieldsWidget

**Inheritance**: BaseFormItemWidget

**Properties**:

+ endField: End field object.（`Field`）
+ endDefaultValue: Default value of the end field.（`unknown`）
+ itemData: Item data identifier, default is combination of start and end field data.（`string`）
+ itemName: Item name, default is combination of start and end field names.（`string`）
+ startField: Start field object.（`Field`）
+ startDefaultValue: Default value of the start field.（`unknown`）

**Methods**:

#### **getValue**

+ **Function Description**: Get the value of the range field, return an array of start and end values.
+ **Type**: `() => [Value, Value] | null | undefined`
+ **Return Value**: Array containing start and end values, or `null`, or `undefined`.

#### **setValue**

+ **Function Description**: Set the value of the range field.
+ **Type**: `(value: [Value, Value] | null | undefined) => void`
+ **Parameters**:
  - `value`: Value to be set, can be an array of start and end values, `null`, or `undefined`.

#### **submit**

+ **Function Description**: Submit range field data, return an object containing start and end field names and values.
+ **Type**: `() => Record<string, unknown>`
+ **Return Value**: Object containing field names and values.

#### **validator**

+ **Function Description**: Validate the value of the range field.
+ **Type**: `() => Promise<ValidatorInfo>`
+ **Return Value**: Validation result information.

## (二十) Component Base Classes

### 1、FormTreeSelectFieldWidget

**Inheritance**: AbstractTreeFieldWidget

**Properties**:

+ multipleCheckedStrategy: Multi-select validation strategy, refer to `TreeSelectCheckedStrategy`.（`string | undefined`）
+ onlySelectedLeaf: Whether to only select leaf nodes, default is `false`.（`boolean`）
+ selectedValue: Value of selected tree nodes.（`SimpleTreeSelected | SimpleTreeSelected[] | undefined`）
+ treeCheckStrictly: Whether to strictly follow parent-child node selection status, default converted from configuration.（`boolean | undefined`）

**Methods**:

#### **backfillDataProcess**

+ **Function Description**: Backfill data processing logic, generate selected values based on selected nodes.
+ **Type**: `({ selectedNodes }: { selectedNodes: OioTreeNode<TreeData>[] }) => void`
+ **Parameters**:
  - `selectedNodes`: Array of selected tree nodes.

#### **clearBackfillDataProcess**

+ **Function Description**: Clear backfill data, reset root node, expansion status, and selected values.
+ **Type**: `() => void`

#### **collectionSelectedNodes**

+ **Function Description**: Collect selected tree nodes, supporting single-select and multi-select modes.
+ **Type**: `(selectedValue: SimpleTreeSelected | SimpleTreeSelected[]) => OioTreeNode<TreeData>[]`
+ **Parameters**:
  - `selectedValue`: Selected node value (single or array).
+ **Return Value**: Array of selected tree nodes.

#### **collectionSelectedValues**

+ **Function Description**: Extract selected value objects from tree nodes.
+ **Type**: `(node: OioTreeNode<TreeData> | undefined) => SimpleTreeSelected | undefined`
+ **Parameters**:
  - `node`: Tree node object or `undefined`.
+ **Return Value**: Selected value object or `undefined`.

#### **convertBackfillData**

+ **Function Description**: Convert backfill data, supporting custom node creation and update callbacks.
+ **Type**: `(currentValues: ActiveRecord[], metadataList: TreeNodeMetadata[], list: TreeNodeResponseBody[], customCreateNodeCallback?: (node: OioTreeNode<TreeData>, value: TreeData | undefined) => void, customUpdateNodeCallback?: (node: OioTreeNode<TreeData>, value: TreeData) => void) => BackfillDataParameters | undefined`
+ **Parameters**:
  - `currentValues`: Current data value array.
  - `metadataList`: Tree metadata list.
  - `list`: Tree node response data list.
  - `customCreateNodeCallback`: Custom create node callback (optional).
  - `customUpdateNodeCallback`: Custom update node callback (optional).
+ **Return Value**: Backfill data parameters or `undefined`.

#### **generatorNewTreeNode**

+ **Function Description**: Generate new tree node, and process node attributes.
+ **Type**: `(parent: OioTreeNode<TreeData>, key: string, title: string | undefined, metadata: TreeNodeMetadata, data: ActiveRecord) => OioTreeNode<TreeData>`
+ **Parameters**:
  - `parent`: Parent node object.
  - `key`: Node key value.
  - `title`: Node title.
  - `metadata`: Node metadata.
  - `data`: Node associated data record.
+ **Return Value**: Generated tree node object.

#### **getSelectedNodes**

+ **Function Description**: Filter and get selected nodes associated with the current model.
+ **Type**: `(selectedValue: SimpleTreeSelected | SimpleTreeSelected[]) => OioTreeNode<TreeData>[] | undefined`
+ **Parameters**:
  - `selectedValue`: Selected node value (single or array).
+ **Return Value**: Filtered tree node array or `undefined`.

#### **onSelectedChange**

+ **Function Description**: Process selected value change event, validate and update selection status.
+ **Type**: `(selectedValue: SimpleTreeSelected | SimpleTreeSelected[], event: TreeSelectNodeChangeEvent) => void`
+ **Parameters**:
  - `selectedValue`: Selected node value (single or array).
  - `event`: Node change event object.

#### **validatorSelectedValue**

+ **Function Description**: Validate whether the selected value meets the rules (such as only leaf nodes, model matching, etc.).
+ **Type**: `(selectedValue: SimpleTreeSelected | SimpleTreeSelected[], selectedNodes: OioTreeNode<TreeData>[]) => boolean | SimpleTreeSelected | SimpleTreeSelected[] | undefined`
+ **Parameters**:
  - `selectedValue`: Selected node value (single or array).
  - `selectedNodes`: Array of selected tree nodes.
+ **Return Value**: Validation result (boolean, processed selected value, or `undefined`).

### 2、FormCascaderFieldWidget

**Inheritance**: AbstractTreeFieldWidget

**Properties**:

+ changeOnSelect: Whether to trigger change immediately when selecting, default is `false`.（`boolean`）
+ labelsSeparator: Label separator.（`string | undefined`）
+ multipleCheckedStrategy: Multi-select validation strategy, refer to `CascaderCheckedStrategy`.（`string | undefined`）
+ selectedLabels: Label array of selected nodes (multi-level format).（`string[] | string[][] | undefined`）
+ selectedValue: Key value array of selected nodes (multi-level format).（`string[] | string[][] | undefined`）
+ showPath: Whether to display the path, default is `false`.（`boolean`）

**Methods**:

#### **backfillDataProcess**

+ **Function Description**: Backfill data processing logic, generate key value and label arrays based on selected nodes.
+ **Type**: `({ selectedNodes }: { selectedNodes: OioTreeNode<TreeData>[] }) => void`
+ **Parameters**:
  - `selectedNodes`: Array of selected tree nodes.

#### **clearBackfillDataProcess**

+ **Function Description**: Clear backfill data, reset root node, expansion status, and selected values.
+ **Type**: `() => void`

#### **collectionSelectedLabels**

+ **Function Description**: Recursively collect labels from tree nodes upwards, generate hierarchical label array.
+ **Type**: `(selectedNode: OioTreeNode<TreeData> | undefined) => string[]`
+ **Parameters**:
  - `selectedNode`: Tree node object or `undefined`.
+ **Return Value**: Hierarchical label array.

#### **collectionSelectedValues**

+ **Function Description**: Recursively collect key values from tree nodes upwards, generate hierarchical key value array.
+ **Type**: `(selectedNode: OioTreeNode<TreeData> | undefined) => string[]`
+ **Parameters**:
  - `selectedNode`: Tree node object or `undefined`.
+ **Return Value**: Hierarchical key value array.

#### **fetchBackfillData**

+ **Function Description**: Get backfill data, supporting full load or reverse query.
+ **Type**: `(currentValues: ActiveRecord[], metadataList: TreeNodeMetadata[]) => Promise<TreeNodeResponseBody[] | undefined>`
+ **Parameters**:
  - `currentValues`: Current data value array.
  - `metadataList`: Tree metadata list.
+ **Return Value**: Tree node response data array or `undefined`.

#### **getSelectedNodes**

+ **Function Description**: Generate corresponding tree node array based on selected values and options, supporting multi-select strategy and selection mode.
+ **Type**: `(selectedValue: string[] | string[][], selectedOptions: CascaderItemType[] | CascaderItemType[][]) => OioTreeNode<TreeData>[] | undefined`
+ **Parameters**:
  - `selectedValue`: Selected key value array (single or multi-level).
  - `selectedOptions`: Selected option array (single or multi-level).
+ **Return Value**: Tree node array or `undefined`.

#### **onSelectedChange**

+ **Function Description**: Process selected value change event, validate and update selection status and labels.
+ **Type**: `(selectedValue: string[] | string[][], selectedOptions: CascaderItemType[] | CascaderItemType[][]) => void`
+ **Parameters**:
  - `selectedValue`: Selected key value array (single or multi-level).
  - `selectedOptions`: Selected option array (single or multi-level).

#### **validatorSelectedValue**

+ **Function Description**: Validate whether the selected value meets the rules (such as level matching, multi-select strategy, etc.).
+ **Type**: `(selectedValue: string[] | string[][], selectedNodes: OioTreeNode<TreeData>[]) => boolean | string[] | string[][]`
+ **Parameters**:
  - `selectedValue`: Selected key value array (single or multi-level).
  - `selectedNodes`: Array of selected tree nodes.
+ **Return Value**: Validation result (boolean or processed key value array).