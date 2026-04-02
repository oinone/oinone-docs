---
title: Detail
index: true
category:
  - DevManual
  - Reference
  - User interface
  - View architectures
order: 3
---
# I. View Characteristics
- **View Type**: Detail (DETAIL)
- **Data Type**: Object
- **DSL Characteristics**: Supports layout functionality.
- **General Behaviors of Data Structure**:
  - Query Behavior: Data population.
- **Detail Behaviors**:
  - Interaction Behavior: All fields are displayed in **read-only** mode; no other interactions are available.
  - Sub-table Query Behavior: Queries are performed via backend pagination.
- **Common Interfaces**: (Default data manager functions)
  - `queryOne`: For data population. (Valid when `pk is not null`)
  - `queryPage`: For sub-table query behavior.


# II. DSL Structure
A simplified version of the view can be written as follows: (Here, "simplified" means each tag has fewer attributes, not fewer nodes.)

```xml
<view type="DETAIL" model="demo.DemoModel" name="demo_detail_view">
    <template slot="actions">
        <action name="$$internal_GotoListTableRouter" label="Back" type="default"/>
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

The detail view and form view both belong to the **Object**-type view, and their DSL structures are identical. The only differences between the two views lie in the **view type** and **name**.

:::warning Note
To understand the detail view, you can refer to the form view architecture. For more information, see: [Form (Form)](/en/DevManual/Reference/UserInterface/ViewArchitectures/form.md)
:::


# III. Default Field Components
In the above DSL, we did not specify the `widget` attribute. In this case, the Widget framework will retrieve the corresponding **default component** based on the **field metadata attributes**. The following table lists all default components currently used in the **detail** view:

<table style="border-collapse: collapse; width: 100%; border: 1px solid #ccc;">
  <thead>
    <tr style="background-color: #f5f5f5;">
      <th style="border: 1px solid #ccc; padding: 8px;">Field Type</th>
      <th style="border: 1px solid #ccc; padding: 8px;">Multi-value</th>
      <th style="border: 1px solid #ccc; padding: 8px;">Default Component</th>
      <th style="border: 1px solid #ccc; padding: 8px;">TypeScript Class</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2" style="border: 1px solid #ccc; padding: 8px;">Text (STRING)</td>
      <td style="border: 1px solid #ccc; padding: 8px;">No</td>
      <td style="border: 1px solid #ccc; padding: 8px;">Text (Input)</td>
      <td style="border: 1px solid #ccc; padding: 8px;">DetailStringFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px;">Yes</td>
      <td style="border: 1px solid #ccc; padding: 8px;">Tag (Tag)</td>
      <td style="border: 1px solid #ccc; padding: 8px;">DetailStringTagFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px;">Multi-line Text (TEXT)</td>
      <td style="border: 1px solid #ccc; padding: 8px;">No</td>
      <td style="border: 1px solid #ccc; padding: 8px;">Multi-line Text (TextArea)</td>
      <td style="border: 1px solid #ccc; padding: 8px;">DetailCommonFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px;">Rich Text (HTML)</td>
      <td style="border: 1px solid #ccc; padding: 8px;">No</td>
      <td style="border: 1px solid #ccc; padding: 8px;">Rich Text (RichText)</td>
      <td style="border: 1px solid #ccc; padding: 8px;">DetailHtmlFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px;">Phone (PHONE)</td>
      <td style="border: 1px solid #ccc; padding: 8px;">No</td>
      <td style="border: 1px solid #ccc; padding: 8px;">Phone (Phone)</td>
      <td style="border: 1px solid #ccc; padding: 8px;">DetailStringFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px;">Email (EMAIL)</td>
      <td style="border: 1px solid #ccc; padding: 8px;">No</td>
      <td style="border: 1px solid #ccc; padding: 8px;">Email (Email)</td>
      <td style="border: 1px solid #ccc; padding: 8px;">DetailStringFieldWidget</td>
    </tr>
    <tr>
      <td rowspan="2" style="border: 1px solid #ccc; padding: 8px;">Integer (INTEGER)</td>
      <td style="border: 1px solid #ccc; padding: 8px;">No</td>
      <td style="border: 1px solid #ccc; padding: 8px;">Integer (Integer)</td>
      <td style="border: 1px solid #ccc; padding: 8px;">DetailNumberWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px;">Yes</td>
      <td style="border: 1px solid #ccc; padding: 8px;">Tag (Tag)</td>
      <td style="border: 1px solid #ccc; padding: 8px;">DetailStringTagFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px;">Float (FLOAT)</td>
      <td style="border: 1px solid #ccc; padding: 8px;">No</td>
      <td style="border: 1px solid #ccc; padding: 8px;">Number (Float)</td>
      <td style="border: 1px solid #ccc; padding: 8px;">DetailNumberWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px;">Money (MONEY)</td>
      <td style="border: 1px solid #ccc; padding: 8px;">No</td>
      <td style="border: 1px solid #ccc; padding: 8px;">Currency (Currency)</td>
      <td style="border: 1px solid #ccc; padding: 8px;">DetailNumberWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px;">Boolean (BOOLEAN)</td>
      <td style="border: 1px solid #ccc; padding: 8px;">No</td>
      <td style="border: 1px solid #ccc; padding: 8px;">Switch (Switch)</td>
      <td style="border: 1px solid #ccc; padding: 8px;">DetailBooleanFieldWidget</td>
    </tr>
    <tr>
      <td rowspan="2" style="border: 1px solid #ccc; padding: 8px;">Enumeration (ENUM)</td>
      <td style="border: 1px solid #ccc; padding: 8px;">No</td>
      <td style="border: 1px solid #ccc; padding: 8px;">Dropdown Single-select (Select)</td>
      <td style="border: 1px solid #ccc; padding: 8px;">DetailEnumFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px;">Yes</td>
      <td style="border: 1px solid #ccc; padding: 8px;">Dropdown Multi-select (Select)</td>
      <td style="border: 1px solid #ccc; padding: 8px;">DetailEnumMultiFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px;">Date Time (DATETIME)</td>
      <td style="border: 1px solid #ccc; padding: 8px;">No</td>
      <td style="border: 1px solid #ccc; padding: 8px;">Date Time (DateTimePicker)</td>
      <td style="border: 1px solid #ccc; padding: 8px;">DetailDateTimeFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px;">Date (DATE)</td>
      <td style="border: 1px solid #ccc; padding: 8px;">No</td>
      <td style="border: 1px solid #ccc; padding: 8px;">Date (DatePicker)</td>
      <td style="border: 1px solid #ccc; padding: 8px;">DetailDateFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px;">Time (TIME)</td>
      <td style="border: 1px solid #ccc; padding: 8px;">No</td>
      <td style="border: 1px solid #ccc; padding: 8px;">Time (TimePicker)</td>
      <td style="border: 1px solid #ccc; padding: 8px;">DetailTimeFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px;">Year (YEAR)</td>
      <td style="border: 1px solid #ccc; padding: 8px;">No</td>
      <td style="border: 1px solid #ccc; padding: 8px;">Year (YearPicker)</td>
      <td style="border: 1px solid #ccc; padding: 8px;">DetailYearFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px;">Key-Value Pair (MAP)</td>
      <td style="border: 1px solid #ccc; padding: 8px;">No</td>
      <td style="border: 1px solid #ccc; padding: 8px;">Key-Value Pair (Map)</td>
      <td style="border: 1px solid #ccc; padding: 8px;">DetailMapFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px;">Many-to-One (M2O)</td>
      <td style="border: 1px solid #ccc; padding: 8px;">No</td>
      <td style="border: 1px solid #ccc; padding: 8px;">Dropdown Single-select (Select)</td>
      <td style="border: 1px solid #ccc; padding: 8px;">DetailM2OSelectFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px;">One-to-Many (O2M)</td>
      <td style="border: 1px solid #ccc; padding: 8px;">Yes</td>
      <td style="border: 1px solid #ccc; padding: 8px;">Dropdown Multi-select (Select)</td>
      <td style="border: 1px solid #ccc; padding: 8px;">DetailO2MSelectFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px;">Many-to-Many (M2M)</td>
      <td style="border: 1px solid #ccc; padding: 8px;">Yes</td>
      <td style="border: 1px solid #ccc; padding: 8px;">Dropdown Multi-select (Select)</td>
      <td style="border: 1px solid #ccc; padding: 8px;">DetailM2MSelectFieldWidget</td>
    </tr>
  </tbody>
</table>


# IV. Optional Field Components
For each field type, in addition to the corresponding default components mentioned above, there are other components that can be used by specifying the `widget` attribute. The following table lists all existing field components in the **detail** view:

<table style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #f5f5f5;">
      <th style="border: 1px solid #ccc; padding: 10px; font-weight: bold;">Field Type</th>
      <th style="border: 1px solid #ccc; padding: 10px; font-weight: bold; text-align: center;">Multi-value</th>
      <th style="border: 1px solid #ccc; padding: 10px; font-weight: bold;">Component</th>
      <th style="border: 1px solid #ccc; padding: 10px; font-weight: bold;">TypeScript Class</th>
    </tr>
  </thead>
  <tbody>
    <!-- Text (STRING) - No (8 rows) -->
    <tr>
      <td rowspan="10">Text (STRING)</td>
      <td rowspan="8">No</td>
      <td>Color (ColorPicker)</td>
      <td>DetailStringColorPickerFieldWidget</td>
    </tr>
    <tr>
      <td>Handwritten Signature (Signature)</td>
      <td>DetailStringSignatureFieldWidget</td>
    </tr>
    <tr>
      <td>File (Upload)</td>
      <td>DetailStringUploadFieldWidget</td>
    </tr>
    <tr>
      <td>Image (UploadImg)</td>
      <td>DetailStringUploadImgFieldWidget</td>
    </tr>
    <tr>
      <td>Embedded Webpage (Iframe)</td>
      <td>DetailStringIframeFieldWidget</td>
    </tr>
    <tr>
      <td>Hyperlink (Hyperlinks)</td>
      <td>DetailStringHyperlinksFieldWidget</td>
    </tr>
    <tr>
      <td>File Download (Download)</td>
      <td>DetailStringDownloadFieldWidget</td>
    </tr>
    <!-- Text (STRING) - No (8th row) -->
    <tr>
      <td>Media Player (MediaPlayer)</td>
      <td>DetailStringMediaPlayerFieldWidget</td>
    </tr>
    <!-- Text (STRING) - Yes (2 rows) -->
    <tr>
      <td rowspan="2">Yes</td>
      <td>File (Upload)</td>
      <td>DetailStringUploadFieldWidget</td>
    </tr>
    <tr>
      <td>Image (UploadImg)</td>
      <td>DetailStringUploadImgFieldWidget</td>
    </tr>
    <!-- Multi-line Text (TEXT) - No (4 rows) -->
    <tr>
      <td rowspan="4">Multi-line Text (TEXT)</td>
      <td rowspan="4">No</td>
      <td>Handwritten Signature (Signature)</td>
      <td>DetailStringSignatureFieldWidget</td>
    </tr>
    <tr>
      <td>File (Upload)</td>
      <td>DetailStringUploadFieldWidget</td>
    </tr>
    <tr>
      <td>Image (UploadImg)</td>
      <td>DetailStringUploadImgFieldWidget</td>
    </tr>
    <tr>
      <td>File Download (Download)</td>
      <td>DetailStringDownloadFieldWidget</td>
    </tr>
    <!-- Boolean (BOOLEAN) - No (3 rows) -->
    <tr>
      <td rowspan="3">Boolean (BOOLEAN)</td>
      <td rowspan="3">No</td>
      <td>Dropdown Single-select (Select)</td>
      <td>?</td>
    </tr>
    <tr>
      <td>Radio Button (Radio)</td>
      <td>?</td>
    </tr>
    <tr>
      <td>Checkbox (Checkbox)</td>
      <td>?</td>
    </tr>
    <!-- Many-to-One (M2O) - No (5 rows) -->
    <tr>
      <td rowspan="5">Many-to-One (M2O)</td>
      <td rowspan="5">No</td>
      <td>Radio Button (Radio)</td>
      <td>?</td>
    </tr>
    <tr>
      <td>Form (Form)</td>
      <td>FormM2OFormFieldWidget</td>
    </tr>
    <tr>
      <td>Drag-and-Drop Upload (UploadDraggable)</td>
      <td>FormM2OUploadDraggableFieldWidget</td>
    </tr>
    <tr>
      <td>File (Upload)</td>
      <td>DetailM2OUploadWidget</td>
    </tr>
    <tr>
      <td>Image (UploadImg)</td>
      <td>FormM2OUploadImgFieldWidget</td>
    </tr>
    <!-- One-to-Many (O2M) - Yes (5 rows) -->
    <tr>
      <td rowspan="5">One-to-Many (O2M)</td>
      <td rowspan="5">Yes</td>
      <td>Checkbox (Checkbox)</td>
      <td>?</td>
    </tr>
    <tr>
      <td>Table (Table)</td>
      <td>DetailO2MTableFieldWidget</td>
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
    <!-- Many-to-Many (M2M) - Yes (5 rows) -->
    <tr>
      <td rowspan="5">Many-to-Many (M2M)</td>
      <td rowspan="5">Yes</td>
      <td>Checkbox (Checkbox)</td>
      <td>?</td>
    </tr>
    <tr>
      <td>Table (Table)</td>
      <td>DetailM2MTableFieldWidget</td>
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
  </tbody>
</table>

# V. DSL Property Configuration

## (I) Detail Property Configuration

```xml
<element widget="Detail">
    ......
</element>
```

- layout: Form layout (`'horizontal' | 'vertical' | 'inline'`)
- cols: Number of row grids (`number`)
- filter: Invisible filter condition (`rsql`)
- domain: Visible filter condition (`rsql`)
- load: Loading function code, `FunctionDefinition#fun` (`string`)

## (II) Common Field Configuration

- invisible: Whether to hide (`boolean | expression`)
- usingLoading: Whether to use loading transition animation (`boolean`)
- layout: Form layout (`'horizontal' | 'vertical' | 'inline'`)
- label: Field title (`string | expression`)
- labelInvisible: Whether to hide the field title (`boolean`)
- help: Field help text (`string`)
- hint: Field prompt text (`string | expression`)
- required: Whether it is required (`boolean | expression`)
- requiredTips: Required prompt text (`string`)
- disabled<font style="color:#DF2A3F;">*</font>: Whether to disable (`boolean | expression`)
- emptyStyle<font style="color:#DF2A3F;">*</font>: Empty value style (`string | 'hyphen' | 'empty' | 'null'`)

:::warning Note

Properties marked with "<font style="color:#DF2A3F;">*</font>" are not completely universal properties. They depend on specific component implementations. If the component's interaction does not support or implement them, the configuration may be ineffective.

:::

## (III) Field Component Property Configuration

### 1. String (STRING)

#### DetailStringFieldWidget

```xml
<field data="stringField" />
```

- type: Input type (`'text' | 'password' | expression`)
- prefix: Prefix text (`string | icon`)
- prefixType: Prefix type (`'TEXT' | 'ICON'`)
- prefixStore: Whether the prefix is stored (`boolean`)
- suffix: Suffix text (`string | icon`)
- suffixType: Suffix type (`'TEXT' | 'ICON'`)
- suffixStore: Whether the suffix is stored (`boolean`)
- crypto: Encrypted storage (`boolean`)

#### DetailStringColorPickerFieldWidget

```xml
<field data="stringField" widget="ColorPicker" />
```

#### DetailStringSignatureFieldWidget

```xml
<field data="stringField" widget="Signature" />
```

- signatureFontColor: Signature text color (`color`)
- signatureBackGroundColor: Signature background panel color (`color`)

#### DetailStringUploadFieldWidget

```xml
<field data="stringField" widget="Upload" />
```

- cdnKey: Specify upload CDN key, used with backend OSS configuration (`string`)
- privateLink: Use backend for file upload/download, used when OSS direct upload from client is unavailable (`boolean`)

#### DetailStringUploadImgFieldWidget

```xml
<field data="stringField" widget="UploadImg" />
```

#### DetailStringIframeFieldWidget

```xml
<field data="stringField" widget="Iframe" />
```

- crypto: Encrypted storage (`boolean`)

#### DetailStringHyperlinksFieldWidget

```xml
<field data="stringField" widget="Hyperlinks" />
```

- target: Link opening method (`'OPEN_WINDOW' | 'ROUTER'`)
- text: Link display text (`string`)

#### DetailStringDownloadFieldWidget

```xml
<field data="stringField" widget="Download" />
```

- linkDisplayTextPrefix: Download prompt text prefix (`string`)
- linkDisplayText: Download prompt text (`string`)
- downloadFileName: Name of the downloaded file (`string`)

#### DetailStringMediaPlayerFieldWidget

```xml
<field data="stringField" widget="MediaPlayer" />
```

#### DetailStringTagFieldWidget

```xml
<field data="stringMultiField" />
```

### 2. Multi-line Text (TEXT)

#### DetailCommonFieldWidget

```xml
<field data="textField" />
```

### 3. Rich Text (HTML)

#### DetailHtmlFieldWidget

```xml
<field data="htmlField" />
```

- encode: Encoded storage (`boolean`)

### 4. Integer (INTEGER)

#### DetailNumberWidget

```xml
<field data="integerField" />
```

- prefix: Prefix text (`string | icon`)
- prefixType: Prefix type (`'TEXT' | 'ICON'`)
- prefixStore: Whether the prefix is stored (`boolean`)
- suffix: Suffix text (`string | icon`)
- suffixType: Suffix type (`'TEXT' | 'ICON'`)
- suffixStore: Whether the suffix is stored (`boolean`)
- unit: Unit (`string | expression`)
- showThousandth: Whether to display thousandths (`boolean | expression`)

### 5. Boolean (BOOLEAN)

#### DetailBooleanFieldWidget

```xml
<field data="booleanField" />
```

### 6. Enum (ENUM)

#### DetailEnumFieldWidget

```xml
<field data="enumField" />
```

#### DetailEnumMultiFieldWidget

```xml
<field data="enumMultiField" />
```

### 7. Date-Time (DATETIME)

#### DetailDateTimeFieldWidget

```xml
<field data="datetimeField" />
```

- format: Date-time formatting text (`string`)

### 8. Date (DATE)

#### DetailDateFieldWidget

```xml
<field data="dateField" />
```

- format: Date formatting text (`string`)

### 9. Time (TIME)

#### DetailTimeFieldWidget

```xml
<field data="timeField" />
```

- format: Time formatting text (`string`)

### 10. Year (YEAR)

#### DetailYearFieldWidget

```xml
<field data="yearField" />
```

- format: Year formatting text (`string`)

### 11. Key-Value Pair (MAP)

#### DetailMapFieldWidget

```xml
<field data="mapField" />
```

### 12. Many-to-One (M2O)

#### DetailM2OSelectFieldWidget

```xml
<field data="m2oField" />
```

- optionLabel: Option title (`expression`)

#### DetailM2OUploadWidget

```xml
<field data="m2oField" widget="Upload" />
```

- cdnKey: Specify upload CDN key, used with backend OSS configuration (`string`)
- privateLink: Use backend for file upload/download, used when OSS direct upload from client is unavailable (`boolean`)

### 13. One-to-Many (O2M)

#### DetailO2MSelectFieldWidget

```xml
<field data="o2mField" />
```

- optionLabel: Option title (`expression`)

#### DetailO2MTableFieldWidget

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

### 14. Many-to-Many (M2M)

#### DetailM2MSelectFieldWidget

```xml
<field data="m2mField" />
```

- optionLabel: Option title (`expression`)

#### DetailM2MTableFieldWidget

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