---
title: Form
index: true
category:
  - DevManual
  - Reference
  - User interface
  - View architectures
order: 2
---
# I. View Characteristics
- View Type: Form (FORM)
- Data Type: Object
- DSL Feature: Supports layout functionality.
- General Behaviors of Data Structure:
  - Query Behaviors: Page initialization, data population.
- Form Behaviors:
  - Interactive Behaviors: Data entry, data validation, data submission, etc.
  - Sub-table Query Behavior: Query via frontend pagination.
- Common Interfaces: (Default Data Manager Functions)
  - construct: Page initialization. (pk is null)
  - queryOne: Data population. (pk is not null)
  - create: Creation during new entry. (pk is null)
  - update: Update during editing. (pk is not null)


# II. DSL Structure
A simplified view can be written as follows: ("Simplified" means each tag has fewer attributes, not fewer nodes.)

```xml
<view type="FORM" model="demo.DemoModel" name="demo_form_view">
    <template slot="actions">
        <action name="$$internal_GotoListTableRouter" label="Return" type="default"/>
        <action name="create" validateForm="true" goBack="true"/>
        <action name="update" validateForm="true" goBack="true"/>
    </template>
    <template slot="fields">
        <field data="id" invisible="true"/>
        <field data="code"/>
        <field data="name"/>
    </template>
</view>
```

- In this DSL, **fields** and **actions** are defined based on the model `demo.DemoModel`, and placed in corresponding positions through **slots** provided by the **layout**.
- The **top-to-bottom order** of elements in the slot represents their relative positions; changing the **order** will change their rendered position on the page.
- The `action` tag uses the `validateForm` attribute to enable form submission validation, and the `goBack` attribute to automatically return to the previous page after successful submission.
- The return action is a client-side action, which is independent of the model and has no metadata.
- In the `fields` slot, you can use all `Pack components` to implement grid layout functionality.

:::warning Note

For more content related to Layout, please refer to: [Layout](/en/DevManual/Reference/Front-EndFramework/Widget/layout.md)

For more content related to DSL, please refer to: [DSL](/en/DevManual/Reference/Front-EndFramework/Widget/DSL.md)

For more content related to Pack components, please refer to: [Pack](/en/DevManual/Reference/Front-EndFramework/Widget/pack.md)

:::


# III. Default Field Components
In the above DSL, we did not specify the `widget` attribute. In this case, the Widget framework will obtain the corresponding **default component** based on the **field metadata attributes**. The following lists all default components currently used in the **Form** view:

<table border="1" style="border-collapse: collapse; width: 100%; text-align: left;">
  <thead>
    <tr>
      <th style="padding: 8px;">Field Type</th>
      <th style="padding: 8px;">Multi-value</th>
      <th style="padding: 8px;">Default Component</th>
      <th style="padding: 8px;">TypeScript Class</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2" style="padding: 8px; vertical-align: top;">Text (STRING)</td>
      <td style="padding: 8px;">No</td>
      <td style="padding: 8px;">Text (Input)</td>
      <td style="padding: 8px;">FormStringInputFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Yes</td>
      <td style="padding: 8px;">Tag (Tag)</td>
      <td style="padding: 8px;">FormStringMultiTagFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Multi-line Text (TEXT)</td>
      <td style="padding: 8px;">No</td>
      <td style="padding: 8px;">Multi-line Text (TextArea)</td>
      <td style="padding: 8px;">FormTextFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Rich Text (HTML)</td>
      <td style="padding: 8px;">No</td>
      <td style="padding: 8px;">Rich Text (RichText)</td>
      <td style="padding: 8px;">FormHtmlRichTextFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Phone (PHONE)</td>
      <td style="padding: 8px;">No</td>
      <td style="padding: 8px;">Phone (Phone)</td>
      <td style="padding: 8px;">FormPhoneFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Email (EMAIL)</td>
      <td style="padding: 8px;">No</td>
      <td style="padding: 8px;">Email (Email)</td>
      <td style="padding: 8px;">FormEmailFieldWidget</td>
    </tr>
    <tr>
      <td rowspan="2" style="padding: 8px; vertical-align: top;">Integer (INTEGER)</td>
      <td style="padding: 8px;">No</td>
      <td style="padding: 8px;">Integer (Integer)</td>
      <td style="padding: 8px;">FormIntegerFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Yes</td>
      <td style="padding: 8px;">Tag (Tag)</td>
      <td style="padding: 8px;">FormIntegerMultiFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Float (FLOAT)</td>
      <td style="padding: 8px;">No</td>
      <td style="padding: 8px;">Number (Float)</td>
      <td style="padding: 8px;">FormFloatFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Money (MONEY)</td>
      <td style="padding: 8px;">No</td>
      <td style="padding: 8px;">Currency (Currency)</td>
      <td style="padding: 8px;">FormMoneyFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Boolean (BOOLEAN)</td>
      <td style="padding: 8px;">No</td>
      <td style="padding: 8px;">Switch (Switch)</td>
      <td style="padding: 8px;">FormBooleanSwitchFieldWidget</td>
    </tr>
    <tr>
      <td rowspan="2" style="padding: 8px; vertical-align: top;">Enumeration (ENUM)</td>
      <td style="padding: 8px;">No</td>
      <td style="padding: 8px;">Dropdown Single-select (Select)</td>
      <td style="padding: 8px;">FormEnumFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Yes</td>
      <td style="padding: 8px;">Dropdown Multi-select (Select)</td>
      <td style="padding: 8px;">FormEnumMultiSelectFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Date Time (DATETIME)</td>
      <td style="padding: 8px;">No</td>
      <td style="padding: 8px;">Date Time (DateTimePicker)</td>
      <td style="padding: 8px;">FormDateTimeFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Date (DATE)</td>
      <td style="padding: 8px;">No</td>
      <td style="padding: 8px;">Date (DatePicker)</td>
      <td style="padding: 8px;">FormDateFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Time (TIME)</td>
      <td style="padding: 8px;">No</td>
      <td style="padding: 8px;">Time (TimePicker)</td>
      <td style="padding: 8px;">FormTimeFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Year (YEAR)</td>
      <td style="padding: 8px;">No</td>
      <td style="padding: 8px;">Year (YearPicker)</td>
      <td style="padding: 8px;">FormYearFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Key-Value Pair (MAP)</td>
      <td style="padding: 8px;">No</td>
      <td style="padding: 8px;">Key-Value Pair (Map)</td>
      <td style="padding: 8px;">FormMapFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Many-to-One (M2O)</td>
      <td style="padding: 8px;">No</td>
      <td style="padding: 8px;">Dropdown Single-select (Select)</td>
      <td style="padding: 8px;">FormM2OSelectFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">One-to-Many (O2M)</td>
      <td style="padding: 8px;">Yes</td>
      <td style="padding: 8px;">Dropdown Multi-select (Select)</td>
      <td style="padding: 8px;">FormO2MSelectFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Many-to-Many (M2M)</td>
      <td style="padding: 8px;">Yes</td>
      <td style="padding: 8px;">Dropdown Multi-select (Select)</td>
      <td style="padding: 8px;">FormM2MFieldSelectWidget</td>
    </tr>
  </tbody>
</table>


# IV. Optional Field Components
For each field type, in addition to the corresponding default components mentioned above, there are some components that can be used by specifying the `widget` attribute. The following lists the existing field components in the current **Form** view:

<table border="1" style="border-collapse: collapse; width: 100%; ">
  <thead>
    <tr>
      <th>Field Type</th>
      <th>Multi-value</th>
      <th>Component</th>
      <th>TypeScript Class</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="14">Text (STRING)</td>
      <td rowspan="11">No</td>
      <td>Color (ColorPicker)</td>
      <td>FormStringColorPickerFieldWidget</td>
    </tr>
    <tr>
      <td>Handwritten Signature (Signature)</td>
      <td>FormStringSignatureFieldWidget</td>
    </tr>
    <tr>
      <td>Drag-and-Drop Upload (UploadDraggable)</td>
      <td>FormStringUploadDraggableFieldWidget</td>
    </tr>
    <tr>
      <td>File (Upload)</td>
      <td>FormStringUploadFieldWidget</td>
    </tr>
    <tr>
      <td>Image (UploadImg)</td>
      <td>FormStringUploadImgFieldWidget</td>
    </tr>
    <tr>
      <td>Embedded Webpage (Iframe)</td>
      <td>FormStringIframeFieldWidget</td>
    </tr>
    <tr>
      <td>Hyperlink (Hyperlinks)</td>
      <td>FormStringHyperlinksFieldWidget</td>
    </tr>
    <tr>
      <td>File Download (Download)</td>
      <td>FormStringDownloadFieldWidget</td>
    </tr>
    <tr>
      <td>Media Player (MediaPlayer)</td>
      <td>FormStringMediaPlayerFieldWidget</td>
    </tr>
    <tr>
      <td>Phone (Phone)</td>
      <td>FormStringPhoneFieldWidget</td>
    </tr>
    <tr>
      <td>Email (Email)</td>
      <td>FormStringEmailFieldWidget</td>
    </tr>
    <tr>
      <td rowspan="3">Yes</td>
      <td>File (Upload)</td>
      <td>FormStringUploadFieldWidget</td>
    </tr>
    <tr>
      <td>Image (UploadImg)</td>
      <td>FormStringUploadImgFieldWidget</td>
    </tr>
    <tr>
      <td>Media Player (MediaPlayer)</td>
      <td>FormStringMediaPlayerFieldWidget</td>
    </tr>
    <tr>
      <td rowspan="5">Multi-line Text (TEXT)</td>
      <td rowspan="5">No</td>
      <td>Handwritten Signature (Signature)</td>
      <td>FormStringSignatureFieldWidget</td>
    </tr>
    <tr>
      <td>Drag-and-Drop Upload (UploadDraggable)</td>
      <td>FormStringUploadDraggableFieldWidget</td>
    </tr>
    <tr>
      <td>File (Upload)</td>
      <td>FormStringUploadFieldWidget</td>
    </tr>
    <tr>
      <td>Image (UploadImg)</td>
      <td>FormStringUploadImgFieldWidget</td>
    </tr>
    <tr>
      <td>File Download (Download)</td>
      <td>FormStringDownloadFieldWidget</td>
    </tr>
    <tr>
      <td rowspan="2">Integer (INTEGER)</td>
      <td>No</td>
      <td>Slider Input (Slider)</td>
      <td>FormIntegerSliderFieldWidget</td>
    </tr>
    <tr>
      <td>Yes</td>
      <td>Tag (Tag)</td>
      <td>FormIntegerTagFieldWidget</td>
    </tr>
    <tr>
      <td rowspan="3">Boolean (BOOLEAN)</td>
      <td rowspan="3">No</td>
      <td>Dropdown Single-select (Select)</td>
      <td>FormBooleanSelectFieldWidget</td>
    </tr>
    <tr>
      <td>Radio Button (Radio)</td>
      <td>FormBooleanRadioFieldWidget</td>
    </tr>
    <tr>
      <td>Checkbox (Checkbox)</td>
      <td>FormBooleanCheckboxFieldWidget</td>
    </tr>
    <tr>
      <td rowspan="2">Enumeration (ENUM)</td>
      <td>No</td>
      <td>Radio Button (Radio)</td>
      <td>FormEnumRadioWidget</td>
    </tr>
    <tr>
      <td>Yes</td>
      <td>Checkbox (Checkbox)</td>
      <td>FormEnumMultiCheckboxFieldWidget</td>
    </tr>
    <tr>
      <td rowspan="11">Many-to-One (M2O)</td>
      <td rowspan="11">No</td>
      <td>Radio Button (Radio)</td>
      <td>FormM2ORadioFieldWidget</td>
    </tr>
    <tr>
      <td>Form (Form)</td>
      <td>FormM2OFormFieldWidget</td>
    </tr>
    <tr>
      <td>Tree Selection (TreeSelect)</td>
      <td>FormM2OTreeSelectFieldWidget</td>
    </tr>
    <tr>
      <td>Cascading Selection (Cascader)</td>
      <td>FormM2OCascaderFieldWidget</td>
    </tr>
    <tr>
      <td>Drag-and-Drop Upload (UploadDraggable)</td>
      <td>FormM2OUploadDraggableFieldWidget</td>
    </tr>
    <tr>
      <td>File (Upload)</td>
      <td>FormM2OUploadFieldWidget</td>
    </tr>
    <tr>
      <td>Image (UploadImg)</td>
      <td>FormM2OUploadImgFieldWidget</td>
    </tr>
    <tr>
      <td>Address (Address)</td>
      <td>FormM2OAddressFieldWidget</td>
    </tr>
    <tr>
      <td>Company (Company)</td>
      <td>FormM2OCompanyFieldWidget</td>
    </tr>
    <tr>
      <td>Department (Department)</td>
      <td>FormM2ODepartmentFieldWidget</td>
    </tr>
    <tr>
      <td>Employee (Employee)</td>
      <td>FormM2OEmployeeFieldWidget</td>
    </tr>
    <tr>
      <td rowspan="8">One-to-Many (O2M)</td>
      <td rowspan="8">Yes</td>
      <td>Checkbox (Checkbox)</td>
      <td>FormO2MCheckboxFieldWidget</td>
    </tr>
    <tr>
      <td>Table (Table)</td>
      <td>FormO2MTableFieldWidget</td>
    </tr>
    <tr>
      <td>Tree Selection (TreeSelect)</td>
      <td>FormO2MTreeSelectFieldWidget</td>
    </tr>
    <tr>
      <td>Cascading Selection (Cascader)</td>
      <td>FormO2MCascaderFieldWidget</td>
    </tr>
    <tr>
      <td>Transfer Box (Transfer)</td>
      <td>FormTransferFieldWidget</td>
    </tr>
    <tr>
      <td>Drag-and-Drop Upload (UploadDraggable)</td>
      <td>FormO2MUploadDraggableFieldWidget</td>
    </tr>
    <tr>
      <td>File (Upload)</td>
      <td>FormO2MUploadFieldWidget</td>
    </tr>
    <tr>
      <td>Image (UploadImg)</td>
      <td>FormO2MUploadImgFieldWidget</td>
    </tr>
    <tr>
      <td rowspan="12">Many-to-Many (M2M)</td>
      <td rowspan="12">Yes</td>
      <td>Checkbox (Checkbox)</td>
      <td>FormM2MCheckboxFieldWidget</td>
    </tr>
    <tr>
      <td>Table (Table)</td>
      <td>FormM2MTableFieldWidget</td>
    </tr>
    <tr>
      <td>Tree Selection (TreeSelect)</td>
      <td>FormM2MTreeSelectFieldWidget</td>
    </tr>
    <tr>
      <td>Cascading Selection (Cascader)</td>
      <td>FormM2MCascaderFieldWidget</td>
    </tr>
    <tr>
      <td>Transfer Box (Transfer)</td>
      <td>FormTransferFieldWidget</td>
    </tr>
    <tr>
      <td>Tree (Tree)</td>
      <td>FormM2MTreeFieldWidget</td>
    </tr>
    <tr>
      <td>Drag-and-Drop Upload (UploadDraggable)</td>
      <td>FormM2MUploadDraggableFieldWidget</td>
    </tr>
    <tr>
      <td>File (Upload)</td>
      <td>FormM2MUploadFieldWidget</td>
    </tr>
    <tr>
      <td>Image (UploadImg)</td>
      <td>FormM2MUploadImgFieldWidget</td>
    </tr>
    <tr>
      <td>Company (Company)</td>
      <td>FormM2MCompanyFieldWidget</td>
    </tr>
    <tr>
      <td>Department (Department)</td>
      <td>FormM2MDepartmentFieldWidget</td>
    </tr>
    <tr>
      <td>Employee (Employee)</td>
      <td>FormM2MEmployeeFieldWidget</td>
    </tr>
  </tbody>
</table>

# V. DSL Property Configuration
## (I) Form Property Configuration

```xml
<element widget="Form">
    ......
</element>
```

- layout: Form layout (`'horizontal' | 'vertical' | 'inline'`)
- cols: Number of grid columns per row (`number`)
- submitType: Submission type (`SubmitType`)
- relationUpdateType: Association update type (`RelationUpdateType`)
- filter: Invisible filter condition (`rsql`)
- domain: Visible filter condition (`rsql`)
- load: Loading function code, `FunctionDefinition#fun` (`string`)


## (II) General Field Configuration

- invisible: Whether to hide (`boolean | expression`)
- usingLoading: Whether to use loading transition animation (`boolean`)
- submitType: Submission type (`SubmitType`)
- relationUpdateType: Association update type (`RelationUpdateType`)
- layout: Form layout (`'horizontal' | 'vertical' | 'inline'`)
- label: Field title (`string | expression`)
- labelInvisible: Whether to hide the field title (`boolean`)
- help: Field help text (`string`)
- hint: Field prompt text (`string | expression`)
- required: Whether it is mandatory (`boolean | expression`)
- requiredTips: Mandatory prompt text (`string`)
- readonly<font style="color:#DF2A3F;">*</font>: Whether it is read-only (`boolean | expression`)
- disabled<font style="color:#DF2A3F;">*</font>: Whether it is disabled (`boolean | expression`)
- validateTrigger<font style="color:#DF2A3F;">*</font>: Validation trigger timing (`('change' | 'blur')[]`)
- validator: Validation expression (`expression`)
- validatorMessage: Prompt text when validation expression fails (`string`)
- patternType: Use built-in regex validation type for verification (`FieldStringPatternType | expression`)
- pattern: Regular expression (`RegExp`)
- tips: Prompt text when regex validation fails (`string | expression`)
- constructDataTrigger: Submission data trigger timing (`('change' | 'blur')[]`)
- constructFun: Submission data function code, `FunctionDefinition#fun` (`string`)
- constructSubmitType: Submission data type (`'CURRENT' | 'ROOT' | 'SELF' | 'CUSTOM'`)
- submitFields: Submission data fields, effective when `constructSubmitType="CUSTOM"` (`string[]`)
- clearFieldsTrigger: Field clearing trigger timing (`('change' | 'blur')[]`)
- clearFields: List of fields to clear after trigger (`string[]`)
- allowClear<font style="color:#DF2A3F;">*</font>: Allow clearing values (`boolean`)
- placeholder<font style="color:#DF2A3F;">*</font>: Placeholder prompt text (`string | expression`)
- emptyStyle<font style="color:#DF2A3F;">*</font>: Empty value style (`string | 'hyphen' | 'empty' | 'null'`)

:::warning Note

Properties marked with "<font style="color:#DF2A3F;">*</font>" are not fully universal; they depend on the implementation of specific components. If the component's own interaction does not support or implement the property, the configuration may be ineffective.

For example: The Checkbox component cannot implement the function of the `allowClear` property.

:::


## (III) Field Component Property Configuration
### 1. String (STRING)
#### FormStringInputFieldWidget

```xml
<field data="stringField" />
```

- type: Input type (`'text' | 'password' | expression`)
- prefix: Prefix text (`string | icon`)
- prefixType: Prefix type (`'TEXT' | 'ICON'`)
- prefixStore: Whether to store the prefix (`boolean`)
- suffix: Suffix text (`string | icon`)
- suffixType: Suffix type (`'TEXT' | 'ICON'`)
- suffixStore: Whether to store the suffix (`boolean`)
- minLength: Minimum length (`number | expression`)
- maxLength: Maximum length (`number | expression`)
- showCount: Display character counter (`boolean`)
- crypto: Encrypted storage (`boolean`)
- translation: Translate displayed value (`boolean`)

#### FormStringColorPickerFieldWidget

```xml
<field data="stringField" widget="ColorPicker" />
```

- predefine: Predefined colors (`JSON - string[]`)

#### FormStringSignatureFieldWidget<font style="color:#DF2A3F;">*</font>

```xml
<field data="stringField" widget="Signature" />
```

- showClearButton: Whether to display the clear button (`boolean`)
- clearButtonText: Text of the clear button (`string`)
- showSaveButton: Whether to display the save button (`boolean`)
- saveButtonText: Text of the save button (`string`)
- signatureFontColor: Signature text color (`color`)
- signatureBackGroundColor: Signature background panel color (`color`)

#### FormStringUploadDraggableFieldWidget

```xml
<field data="stringField" widget="UploadDraggable" />
```

- draggableIcon: Drag-and-drop upload icon (`icon`)
- draggableTipText: Drag-and-drop upload prompt text (`string`)
- showDraggableExtendsionsText: Whether to display supported file extensions (`boolean`)
- draggableExtendsionsText: Prompt text for allowed file types (`string`)
- partSize: Size of a single chunk (`number`: MB)
- chunkUploadThreshold: Chunk total threshold (`number`)
- parallel: Upload concurrency count (`number`)
- limit: Maximum number of uploads (`number`)
- limitSize: Maximum size of a single uploaded file (`number`: MB)
- limitFileExtensions: Restricted file extension types (`string`) `e.g.: '.jpg,.jpeg,.png'`

#### FormStringUploadFieldWidget

```xml
<field data="stringField" widget="Upload" />
```

- uploadPlaceholder: File upload prompt text (`string`)
- uploadIcon: File upload prompt icon (`icon`)
- partSize: Size of a single chunk (`number`: MB)
- chunkUploadThreshold: Chunk total threshold (`number`)
- parallel: Upload concurrency count (`number`)
- limit: Maximum number of uploads (`number`)
- limitSize: Maximum size of a single uploaded file (`number`: MB)
- limitFileExtensions: Restricted file extension types (`string`) `e.g.: '.jpg,.jpeg,.png'`
- cdnKey: Specify upload CDN key, used with backend OSS configuration (`string`)
- privateLink: Use backend for file upload/download, used when OSS direct upload from client is unavailable (`boolean`)

#### FormStringUploadImgFieldWidget

```xml
<field data="stringField" widget="UploadImg" />
```

- uploadPlaceholder: File upload prompt text (`string`)
- uploadIcon: File upload prompt icon (`icon`)
- uploadIconText: Upload icon prompt text (`string`)
- partSize: Size of a single chunk (`number`: MB)
- chunkUploadThreshold: Chunk total threshold (`number`)
- parallel: Upload concurrency count (`number`)
- limit: Maximum number of uploads (`number`)
- limitSize: Maximum size of a single uploaded file (`number`: MB)
- limitFileExtensions: Restricted file extension types (`string`) `e.g.: '.jpg,.jpeg,.png'`

#### FormStringIframeFieldWidget

```xml
<field data="stringField" widget="Iframe" />
```

- mode: Component mode (`'DYNAMIC' | 'STATIC'`)

:::warning Note

- When the component mode is `STATIC`, it can display an embedded web page.
- When the component mode is `DYNAMIC`, the configurable properties of the component are similar to those of the FormStringInputFieldWidget component.

:::

#### FormStringHyperlinksFieldWidget

```xml
<field data="stringField" widget="Hyperlinks" />
```

- target: Link opening method (`'OPEN_WINDOW' | 'ROUTER'`)
- text: Link display text (`string`)

#### FormStringDownloadFieldWidget

```xml
<field data="stringField" widget="Download" />
```

- linkDisplayTextPrefix: Download prompt text prefix (`string`)
- linkDisplayText: Download prompt text (`string`)
- downloadFileName: Name of the downloaded file (`string`)

#### FormStringMediaPlayerFieldWidget

```xml
<field data="stringField" widget="MediaPlayer" />
```

- mode: Component mode (`'DYNAMIC' | 'STATIC'`)
- fileSource: File source (`'UPLOAD' | 'INPUT'`)

:::warning Note

- When the component mode is `STATIC`, it can display a media player.
- When the component mode is `DYNAMIC`, the file source property takes effect:
  - When the file source is `UPLOAD`, the configurable properties of the component are similar to those of the FormStringUploadFieldWidget component.
  - When the file source is `INPUT`, the configurable properties of the component are similar to those of the FormStringInputFieldWidget component.

:::

#### FormStringPhoneFieldWidget

```xml
<field data="stringField" widget="Phone" />
```

- prefix: Prefix text (`string | icon`)
- prefixType: Prefix type (`'TEXT' | 'ICON'`)
- prefixStore: Whether to store the prefix (`boolean`)
- suffix: Suffix text (`string | icon`)
- suffixType: Suffix type (`'TEXT' | 'ICON'`)
- suffixStore: Whether to store the suffix (`boolean`)
- minLength: Minimum length (`number | expression`)
- maxLength: Maximum length (`number | expression`)
- showCount: Display character counter (`boolean`)

#### FormStringEmailFieldWidget

```xml
<field data="stringField" widget="Email" />
```

- prefix: Prefix text (`string | icon`)
- prefixType: Prefix type (`'TEXT' | 'ICON'`)
- prefixStore: Whether to store the prefix (`boolean`)
- suffix: Suffix text (`string | icon`)
- suffixType: Suffix type (`'TEXT' | 'ICON'`)
- suffixStore: Whether to store the suffix (`boolean`)
- minLength: Minimum length (`number | expression`)
- maxLength: Maximum length (`number | expression`)
- showCount: Display character counter (`boolean`)

#### FormStringMultiTagFieldWidget

```xml
<field data="stringMultiField" />
```

- allowRepeat: Whether to allow duplicates (`boolean`)
- unitValueLength: Maximum length of unit value (`number`)


### 2. Multi-Line Text (TEXT)
#### FormTextFieldWidget

```xml
<field data="textField" />
```

- minLength: Minimum length (`number | expression`)
- maxLength: Maximum length (`number | expression`)
- showCount: Display character counter (`boolean`)
- rows: Minimum number of rows (adjusts default input box height) (`number`)


### 3. Rich Text (HTML)
#### FormHtmlRichTextFieldWidget

```xml
<field data="htmlField" />
```

- height: Height (`string | number`)
- encode: Encrypted storage (`boolean`)


### 4. Phone (PHONE)
#### FormPhoneFieldWidget

```xml
<field data="phoneField" />
```

- prefix: Prefix text (`string | icon`)
- prefixType: Prefix type (`'TEXT' | 'ICON'`)
- prefixStore: Whether to store the prefix (`boolean`)
- suffix: Suffix text (`string | icon`)
- suffixType: Suffix type (`'TEXT' | 'ICON'`)
- suffixStore: Whether to store the suffix (`boolean`)
- minLength: Minimum length (`number | expression`)
- maxLength: Maximum length (`number | expression`)
- showCount: Display character counter (`boolean`)


### 5. Email (EMAIL)
#### FormEmailFieldWidget

```xml
<field data="emailField" />
```

- prefix: Prefix text (`string | icon`)
- prefixType: Prefix type (`'TEXT' | 'ICON'`)
- prefixStore: Whether to store the prefix (`boolean`)
- suffix: Suffix text (`string | icon`)
- suffixType: Suffix type (`'TEXT' | 'ICON'`)
- suffixStore: Whether to store the suffix (`boolean`)
- minLength: Minimum length (`number | expression`)
- maxLength: Maximum length (`number | expression`)
- showCount: Display character counter (`boolean`)


### 6. Integer (INTEGER)
#### FormIntegerFieldWidget

```xml
<field data="integerField" />
```

- prefix: Prefix text (`string | icon`)
- prefixType: Prefix type (`'TEXT' | 'ICON'`)
- prefixStore: Whether to store the prefix (`boolean`)
- suffix: Suffix text (`string | icon`)
- suffixType: Suffix type (`'TEXT' | 'ICON'`)
- suffixStore: Whether to store the suffix (`boolean`)
- unit: Unit (`string | expression`)
- showThousandth: Whether to display thousand separators (`boolean | expression`)
- size: Number of integer digits (`number | expression`)
- min: Minimum value (`number | expression`)
- max: Maximum value (`number | expression`)
- step: Increment or decrement step (`number`)
- addStep: Increment step (takes precedence over the `step` property) (`number`)
- reduceStep: Decrement step (takes precedence over the `step` property) (`number`)
- autocorrection: Auto-correction after losing focus (`boolean`)

#### FormIntegerSliderFieldWidget

```xml
<field data="integerField" widget="Slider" />
```

- min: Minimum value (`number | expression`)
- max: Maximum value (`number | expression`)
- step: Increment or decrement step (`number`)
- direction: Slider direction (`'horizontal' | 'vertical'`)
- reverse: Reverse the coordinate axis (flip the slider) (`boolean`)
- hasTooltip: Display prompt bubble (`boolean`)

#### FormIntegerMultiFieldWidget

```xml
<field data="integerMultiField" />
```

- allowRepeat: Whether to allow duplicates (`boolean`)
- unitValueLength: Maximum length of unit value (`number`)
- limit: Maximum number of tags (`number`)
- min: Minimum value of a single number (`number | expression`)
- max: Maximum value of a single number (`number | expression`)

#### FormIntegerTagFieldWidget

```xml
<field data="integerMultiField" widget="Tag" />
```

- allowRepeat: Whether to allow duplicates (`boolean`)
- unitValueLength: Maximum length of unit value (`number`)


### 7. Float (FLOAT)
#### FormFloatFieldWidget

```xml
<field data="floatField" />
```

- prefix: Prefix text (`string | icon`)
- prefixType: Prefix type (`'TEXT' | 'ICON'`)
- prefixStore: Whether to store the prefix (`boolean`)
- suffix: Suffix text (`string | icon`)
- suffixType: Suffix type (`'TEXT' | 'ICON'`)
- suffixStore: Whether to store the suffix (`boolean`)
- unit: Unit (`string | expression`)
- showThousandth: Whether to display thousand separators (`boolean | expression`)
- size: Number of integer digits (`number | expression`)
- precision: Number of decimal places (`number | expression`)
- min: Minimum value (`number | expression`)
- max: Maximum value (`number | expression`)
- step: Increment or decrement step (`number`)
- addStep: Increment step (takes precedence over the `step` property) (`number`)
- reduceStep: Decrement step (takes precedence over the `step` property) (`number`)
- autocorrection: Auto-correction after losing focus (`boolean`)


### 8. Money (MONEY)
#### FormMoneyFieldWidget

```xml
<field data="moneyField" />
```

Same properties as the `FormFloatFieldWidget` component.


### 9. Boolean (BOOLEAN)
#### FormBooleanSwitchFieldWidget

```xml
<field data="booleanField" />
```

#### FormBooleanSelectFieldWidget

```xml
<field data="booleanField" widget="Select" />
```

- maxNumber: Maximum number of selections (`number`)
- minNumber: Minimum number of selections (`number`)

#### FormBooleanRadioFieldWidget

```xml
<field data="booleanField" widget="Select" />
```

- maxNumber: Maximum number of selections (`number`)
- minNumber: Minimum number of selections (`number`)
- orientation: Arrangement direction (`'TRANSVERSE' | 'VERTICAL'`)
- radioMode: Option style (`'BUTTON'`)
- rowLimit: Number of options displayed per row (`number`)
- autocorrection: Auto-correction after losing focus (`boolean`)

#### FormBooleanCheckboxFieldWidget

```xml
<field data="booleanField" widget="Checkbox" />
```

# V. DSL Property Configuration (Continued)
### 10. Enumeration (ENUM)
#### FormEnumFieldWidget
```xml
<field data="enumField" />
```
- maxNumber: Maximum number of selections (`number`)
- minNumber: Minimum number of selections (`number`)

#### FormEnumRadioWidget
```xml
<field data="enumField" widget="Radio" />
```
- maxNumber: Maximum number of selections (`number`)
- minNumber: Minimum number of selections (`number`)
- orientation: Arrangement direction (`'TRANSVERSE' | 'VERTICAL'`)
- radioMode: Option style (`'BUTTON'`)
- rowLimit: Number of options displayed per row (`number`)
- autocorrection: Auto-correction after losing focus (`boolean`)

#### FormEnumMultiSelectFieldWidget
```xml
<field data="enumMultiField" />
```
- maxNumber: Maximum number of selections (`number`)
- minNumber: Minimum number of selections (`number`)

#### FormEnumMultiCheckboxFieldWidget
```xml
<field data="enumMultiField" widget="Checkbox" />
```
- maxNumber: Maximum number of selections (`number`)
- minNumber: Minimum number of selections (`number`)
- orientation: Arrangement direction (`'TRANSVERSE' | 'VERTICAL'`)


### 11. Date-Time (DATETIME)
#### FormDateTimeFieldWidget
```xml
<field data="datetimeField" />
```
- format: Date-time formatting text (`string`)


### 12. Date (DATE)
#### FormDateFieldWidget
```xml
<field data="dateField" />
```
- format: Date formatting text (`string`)


### 13. Time (TIME)
#### FormTimeFieldWidget
```xml
<field data="timeField" />
```
- format: Time formatting text (`string`)


### 14. Year (YEAR)
#### FormYearFieldWidget
```xml
<field data="yearField" />
```
- format: Year formatting text (`string`)


### 15. Key-Value Pair (MAP)
#### FormMapFieldWidget
```xml
<field data="mapField" />
```
- limit: Limit the number of key-value pairs (`number`)


### 16. Many-to-One (M2O)
#### FormM2OSelectFieldWidget
```xml
<field data="m2oField" />
```
- maxNumber: Maximum number of selections (`number`)
- minNumber: Minimum number of selections (`number`)
- load: Loading function code, `FunctionDefinition#fun` (`string`)
- showSearch: Whether to allow searching (`boolean`)
- searchFields: Search fields (`string[]`)
- optionLabel: Option title (`expression`)

#### FormM2ORadioFieldWidget
```xml
<field data="m2oField" widget="Radio" />
```
- orientation: Arrangement direction (`'TRANSVERSE' | 'VERTICAL'`)
- optionLabel: Option title (`expression`)

#### FormM2OFormFieldWidget
```xml
<field data="m2oField" widget="Form">
	<view type="FORM">
		<template slot="fields">
			<field data="id" invisible="true" />
			<field data="code" />
			<field data="name" />
		</template>
	</view>
</field>
```

#### FormM2OTreeSelectFieldWidget
```xml
<!-- references="business.PamirsEmployee" -->
<field data="m2oField" widget="TreeSelect">
	<nodes>
		<node model="business.PamirsCompany" label="activeRecord.name" labelFields="name" selfReferences="parent" />
		<node model="business.PamirsDepartment" label="activeRecord.name" labelFields="name" references="company" selfReferences="parent" />
		<node model="business.PamirsEmployee" label="activeRecord.name" labelFields="name" references="departmentList" />
	</nodes>
</field>
```
- onlySelectedLeaf: Only allow selecting leaf node data (`boolean`)
- enableSearch: Whether to allow searching (`boolean`)
- fetchAll: Fetch all data at once (`boolean`)
- node.model: Hierarchical model code (`string`)
- node.label: Hierarchical option title (`expression`)
- node.labelFields: Hierarchical title fields (`string[]`)
- node.references: Hierarchical associated model code (`string`)
- node.selfReferences: Self-association field code (`string`)

#### FormM2OCascaderFieldWidget
```xml
<!-- references="business.PamirsEmployee" -->
<field data="m2oField" widget="Cascader">
	<nodes>
		<node model="business.PamirsCompany" label="activeRecord.name" labelFields="name" selfReferences="parent" />
		<node model="business.PamirsDepartment" label="activeRecord.name" labelFields="name" references="company" selfReferences="parent" />
		<node model="business.PamirsEmployee" label="activeRecord.name" labelFields="name" references="departmentList" />
	</nodes>
</field>
```
- changeOnSelect: Change on selection (`boolean`)
- showPath: Display selected path (`boolean`)
- labelsSeparator: Title text separator (`string`)
- enableSearch: Whether to allow searching (`boolean`)
- fetchAll: Fetch all data at once (`boolean`)
- node.model: Hierarchical model code (`string`)
- node.label: Hierarchical option title (`expression`)
- node.labelFields: Hierarchical title fields (`string[]`)
- node.references: Hierarchical associated model code (`string`)
- node.selfReferences: Self-association field code (`string`)

#### FormM2OUploadDraggableFieldWidget
```xml
<field data="m2oField" widget="UploadDraggable" />
```
- draggableIcon: Drag-and-drop upload icon (`icon`)
- draggableTipText: Drag-and-drop upload prompt text (`string`)
- showDraggableExtendsionsText: Whether to display supported file extensions (`boolean`)
- draggableExtendsionsText: Prompt text for allowed file types (`string`)
- partSize: Size of a single chunk (`number`: MB)
- chunkUploadThreshold: Chunk total threshold (`number`)
- parallel: Upload concurrency count (`number`)
- limitSize: Maximum size of a single uploaded file (`number`: MB)
- limitFileExtensions: Restricted file extension types (`string`) `e.g.: '.jpg,.jpeg,.png'`

#### FormM2OUploadFieldWidget
```xml
<!-- references="base.PamirsFile" -->
<field data="m2oField" widget="Upload" />
```
- uploadPlaceholder: File upload prompt text (`string`)
- uploadIcon: File upload prompt icon (`icon`)
- partSize: Size of a single chunk (`number`: MB)
- chunkUploadThreshold: Chunk total threshold (`number`)
- parallel: Upload concurrency count (`number`)
- limitSize: Maximum size of a single uploaded file (`number`: MB)
- limitFileExtensions: Restricted file extension types (`string`) `e.g.: '.jpg,.jpeg,.png'`
- cdnKey: Specify upload CDN key, used with backend OSS configuration (`string`)
- privateLink: Use backend for file upload/download, used when OSS direct upload from client is unavailable (`boolean`)

#### FormM2OUploadImgFieldWidget
```xml
<!-- references="base.PamirsFile" -->
<field data="m2oField" widget="UploadImg" />
```
- uploadPlaceholder: File upload prompt text (`string`)
- uploadIcon: File upload prompt icon (`icon`)
- uploadIconText: Upload icon prompt text (`string`)
- partSize: Size of a single chunk (`number`: MB)
- chunkUploadThreshold: Chunk total threshold (`number`)
- parallel: Upload concurrency count (`number`)
- limitSize: Maximum size of a single uploaded file (`number`: MB)
- limitFileExtensions: Restricted file extension types (`string`) `e.g.: '.jpg,.jpeg,.png'`

#### FormM2OAddressFieldWidget
```xml
<!-- references="resource.ResourceAddress" -->
<field data="m2oField" widget="Address" />
```
- changeOnSelect: Change on selection (`boolean`)
- showPath: Display selected path (`boolean`)
- labelsSeparator: Title text separator (`string`)
- enableSearch: Whether to allow searching (`boolean`)
- fetchAll: Fetch all data at once (`boolean`)

#### FormM2OCompanyFieldWidget
```xml
<!-- references="business.PamirsCompany" -->
<field data="m2oField" widget="Company" />
```

#### FormM2ODepartmentFieldWidget
```xml
<!-- references="business.PamirsDepartment" -->
<field data="m2oField" widget="Department" />
```

#### FormM2OEmployeeFieldWidget
```xml
<!-- references="business.PamirsEmployee" -->
<field data="m2oField" widget="Employee" />
```


### 17. One-to-Many (O2M)
#### FormO2MSelectFieldWidget
```xml
<field data="o2mField" />
```
- maxNumber: Maximum number of selections (`number`)
- minNumber: Minimum number of selections (`number`)
- load: Loading function code, `FunctionDefinition#fun` (`string`)
- showSearch: Whether to allow searching (`boolean`)
- searchFields: Search fields (`string[]`)
- optionLabel: Option title (`expression`)

#### FormO2MCheckboxFieldWidget
```xml
<field data="o2mField" widget="Checkbox" />
```
- maxNumber: Maximum number of selections (`number`)
- minNumber: Minimum number of selections (`number`)
- load: Loading function code, `FunctionDefinition#fun` (`string`)
- optionLabel: Option title (`expression`)

#### FormO2MTableFieldWidget
```xml
<field data="o2mField" widget="Table">
	<view type="TABLE">
		<template slot="fields">
			<field data="id" invisible="true" />
			<field data="code" />
			<field data="name" />
		</template>
	</view>
</field>
```

#### FormO2MTreeSelectFieldWidget
```xml
<!-- references="business.PamirsEmployee" -->
<field data="o2mField" widget="TreeSelect">
	<nodes>
		<node model="business.PamirsCompany" label="activeRecord.name" labelFields="name" selfReferences="parent" />
		<node model="business.PamirsDepartment" label="activeRecord.name" labelFields="name" references="company" selfReferences="parent" />
		<node model="business.PamirsEmployee" label="activeRecord.name" labelFields="name" references="departmentList" />
	</nodes>
</field>
```
- onlySelectedLeaf: Only allow selecting leaf node data (`boolean`)
- enableSearch: Whether to allow searching (`boolean`)
- fetchAll: Fetch all data at once (`boolean`)
- node.model: Hierarchical model code (`string`)
- node.label: Hierarchical option title (`expression`)
- node.labelFields: Hierarchical title fields (`string[]`)
- node.references: Hierarchical associated model code (`string`)
- node.selfReferences: Self-association field code (`string`)

#### FormO2MCascaderFieldWidget
```xml
<!-- references="business.PamirsEmployee" -->
<field data="o2mField" widget="Cascader">
	<nodes>
		<node model="business.PamirsCompany" label="activeRecord.name" labelFields="name" selfReferences="parent" />
		<node model="business.PamirsDepartment" label="activeRecord.name" labelFields="name" references="company" selfReferences="parent" />
		<node model="business.PamirsEmployee" label="activeRecord.name" labelFields="name" references="departmentList" />
	</nodes>
</field>
```
- changeOnSelect: Change on selection (`boolean`)
- enableSearch: Whether to allow searching (`boolean`)
- fetchAll: Fetch all data at once (`boolean`)
- node.model: Hierarchical model code (`string`)
- node.label: Hierarchical option title (`expression`)
- node.labelFields: Hierarchical title fields (`string[]`)
- node.references: Hierarchical associated model code (`string`)
- node.selfReferences: Self-association field code (`string`)

#### FormO2MUploadDraggableFieldWidget
```xml
<field data="o2mField" widget="UploadDraggable" />
```
- draggableIcon: Drag-and-drop upload icon (`icon`)
- draggableTipText: Drag-and-drop upload prompt text (`string`)
- showDraggableExtendsionsText: Whether to display supported file extensions (`boolean`)
- draggableExtendsionsText: Prompt text for allowed file types (`string`)
- partSize: Size of a single chunk (`number`: MB)
- chunkUploadThreshold: Chunk total threshold (`number`)
- parallel: Upload concurrency count (`number`)
- limit: Maximum number of uploads (`number`)
- limitSize: Maximum size of a single uploaded file (`number`: MB)
- limitFileExtensions: Restricted file extension types (`string`) `e.g.: '.jpg,.jpeg,.png'`

#### FormO2MUploadFieldWidget
```xml
<field data="o2mField" widget="Upload" />
```
- uploadPlaceholder: File upload prompt text (`string`)
- uploadIcon: File upload prompt icon (`icon`)
- partSize: Size of a single chunk (`number`: MB)
- chunkUploadThreshold: Chunk total threshold (`number`)
- parallel: Upload concurrency count (`number`)
- limit: Maximum number of uploads (`number`)
- limitSize: Maximum size of a single uploaded file (`number`: MB)
- limitFileExtensions: Restricted file extension types (`string`) `e.g.: '.jpg,.jpeg,.png'`
- cdnKey: Specify upload CDN key, used with backend OSS configuration (`string`)
- privateLink: Use backend for file upload/download, used when OSS direct upload from client is unavailable (`boolean`)

#### FormO2MUploadImgFieldWidget
```xml
<field data="o2mField" widget="UploadImg" />
```
- uploadPlaceholder: File upload prompt text (`string`)
- uploadIcon: File upload prompt icon (`icon`)
- uploadIconText: Upload icon prompt text (`string`)
- partSize: Size of a single chunk (`number`: MB)
- chunkUploadThreshold: Chunk total threshold (`number`)
- parallel: Upload concurrency count (`number`)
- limit: Maximum number of uploads (`number`)
- limitSize: Maximum size of a single uploaded file (`number`: MB)
- limitFileExtensions: Restricted file extension types (`string`) `e.g.: '.jpg,.jpeg,.png'`


### 18. Many-to-Many (M2M)
#### FormM2MFieldSelectWidget
```xml
<field data="m2mField" />
```
- maxNumber: Maximum number of selections (`number`)
- minNumber: Minimum number of selections (`number`)
- load: Loading function code, `FunctionDefinition#fun` (`string`)
- showSearch: Whether to allow searching (`boolean`)
- searchFields: Search fields (`string[]`)
- optionLabel: Option title (`expression`)

#### FormM2MCheckboxFieldWidget
```xml
<field data="m2mField" widget="Checkbox" />
```
- maxNumber: Maximum number of selections (`number`)
- minNumber: Minimum number of selections (`number`)
- load: Loading function code, `FunctionDefinition#fun` (`string`)
- optionLabel: Option title (`expression`)

#### FormM2MTableFieldWidget
```xml
<field data="m2mField" widget="Table">
	<view type="TABLE">
		<template slot="fields">
			<field data="id" invisible="true" />
			<field data="code" />
			<field data="name" />
		</template>
	</view>
</field>
```

#### FormM2MTreeSelectFieldWidget
```xml
<!-- references="business.PamirsEmployee" -->
<field data="m2mField" widget="TreeSelect">
	<nodes>
		<node model="business.PamirsCompany" label="activeRecord.name" labelFields="name" selfReferences="parent" />
		<node model="business.PamirsDepartment" label="activeRecord.name" labelFields="name" references="company" selfReferences="parent" />
		<node model="business.PamirsEmployee" label="activeRecord.name" labelFields="name" references="departmentList" />
	</nodes>
</field>
```
- onlySelectedLeaf: Only allow selecting leaf node data (`boolean`)
- enableSearch: Whether to allow searching (`boolean`)
- fetchAll: Fetch all data at once (`boolean`)
- node.model: Hierarchical model code (`string`)
- node.label: Hierarchical option title (`expression`)
- node.labelFields: Hierarchical title fields (`string[]`)
- node.references: Hierarchical associated model code (`string`)
- node.selfReferences: Self-association field code (`string`)

#### FormM2MCascaderFieldWidget
```xml
<!-- references="business.PamirsEmployee" -->
<field data="m2mField" widget="Cascader">
	<nodes>
		<node model="business.PamirsCompany" label="activeRecord.name" labelFields="name" selfReferences="parent" />
		<node model="business.PamirsDepartment" label="activeRecord.name" labelFields="name" references="company" selfReferences="parent" />
		<node model="business.PamirsEmployee" label="activeRecord.name" labelFields="name" references="departmentList" />
	</nodes>
</field>
```
- changeOnSelect: Change on selection (`boolean`)
- enableSearch: Whether to allow searching (`boolean`)
- fetchAll: Fetch all data at once (`boolean`)
- node.model: Hierarchical model code (`string`)
- node.label: Hierarchical option title (`expression`)
- node.labelFields: Hierarchical title fields (`string[]`)
- node.references: Hierarchical associated model code (`string`)
- node.selfReferences: Self-association field code (`string`)

#### FormTransferFieldWidget
```xml
<field data="m2mField" widget="Transfer" />
```
- maxNumber: Maximum number of selections (`number`)
- minNumber: Minimum number of selections (`number`)
- optionLabel: Option title (`expression`)
- enableSearch: Whether to enable searching (`boolean`)
- sortable: Whether to enable sorting (`boolean`)
- leftDisplayType: Left display type (`'LIST' | 'TABLE'`)
- leftFields: Left table display fields, effective when `leftDisplayType="TABLE"` (`string[]`)
- rightDisplayType: Right display type (`'LIST' | 'TABLE'`)
- rightFields: Right table display fields, effective when `rightDisplayType="TABLE"` (`string[]`)

#### FormM2MTreeFieldWidget
```xml
<!-- references="business.PamirsEmployee" -->
<field data="m2mField" widget="Tree">
	<nodes>
		<node model="business.PamirsCompany" label="activeRecord.name" labelFields="name" selfReferences="parent" />
		<node model="business.PamirsDepartment" label="activeRecord.name" labelFields="name" references="company" selfReferences="parent" />
		<node model="business.PamirsEmployee" label="activeRecord.name" labelFields="name" references="departmentList" />
	</nodes>
</field>
```
- onlySelectedLeaf: Only allow selecting leaf node data (`boolean`)
- checkStrictly: Parent-child node selection status association when selected (`boolean`)
- nodeCheckedAll: Allow node selection of all (`boolean`)
- nodeCheckedAllLabel: Select all title text (`string`)
- nodeUncheckedAllLabel: Deselect all title text (`string`)
- fetchAll: Fetch all data at once (`boolean`)
- node.model: Hierarchical model code (`string`)
- node.label: Hierarchical option title (`expression`)
- node.labelFields: Hierarchical title fields (`string[]`)
- node.references: Hierarchical associated model code (`string`)
- node.selfReferences: Self-association field code (`string`)

#### FormM2MUploadDraggableFieldWidget
```xml
<field data="m2mField" widget="UploadDraggable" />
```
- draggableIcon: Drag-and-drop upload icon (`icon`)
- draggableTipText: Drag-and-drop upload prompt text (`string`)
- showDraggableExtendsionsText: Whether to display supported file extensions (`boolean`)
- draggableExtendsionsText: Prompt text for allowed file types (`string`)
- partSize: Size of a single chunk (`number`: MB)
- chunkUploadThreshold: Chunk total threshold (`number`)
- parallel: Upload concurrency count (`number`)
- limit: Maximum number of uploads (`number`)
- limitSize: Maximum size of a single uploaded file (`number`: MB)
- limitFileExtensions: Restricted file extension types (`string`) `e.g.: '.jpg,.jpeg,.png'`

#### FormM2MUploadFieldWidget
```xml
<field data="m2mField" widget="Upload" />
```
- uploadPlaceholder: File upload prompt text (`string`)
- uploadIcon: File upload prompt icon (`icon`)
- partSize: Size of a single chunk (`number`: MB)
- chunkUploadThreshold: Chunk total threshold (`number`)
- parallel: Upload concurrency count (`number`)
- limit: Maximum number of uploads (`number`)
- limitSize: Maximum size of a single uploaded file (`number`: MB)
- limitFileExtensions: Restricted file extension types (`string`) `e.g.: '.jpg,.jpeg,.png'`
- cdnKey: Specify upload CDN key, used with backend OSS configuration (`string`)
- privateLink: Use backend for file upload/download, used when OSS direct upload from client is unavailable (`boolean`)

#### FormM2MUploadImgFieldWidget
```xml
<field data="m2mField" widget="UploadImg" />
```
- uploadPlaceholder: File upload prompt text (`string`)
- uploadIcon: File upload prompt icon (`icon`)
- uploadIconText: Upload icon prompt text (`string`)
- partSize: Size of a single chunk (`number`: MB)
- chunkUploadThreshold: Chunk total threshold (`number`)
- parallel: Upload concurrency count (`number`)
- limit: Maximum number of uploads (`number`)
- limitSize: Maximum size of a single uploaded file (`number`: MB)
- limitFileExtensions: Restricted file extension types (`string`) `e.g.: '.jpg,.jpeg,.png'`

#### FormM2MCompanyFieldWidget
```xml
<!-- references="business.PamirsCompany" -->
<field data="m2mField" widget="Company" />
```

#### FormM2MDepartmentFieldWidget
```xml
<!-- references="business.PamirsDepartment" -->
<field data="m2mField" widget="Department" />
```

#### FormM2MEmployeeFieldWidget
```xml
<!-- references="business.PamirsEmployee" -->
<field data="m2mField" widget="Employee" />
```