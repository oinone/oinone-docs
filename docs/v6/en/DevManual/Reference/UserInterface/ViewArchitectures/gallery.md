---
title: Gallery
index: true
category:
  - DevManual
  - Reference
  - User interface
  - View architectures
order: 4
---
# I. View Characteristics
- **View Type**: Gallery (GALLERY)
- **Data Type**: List
- **DSL Characteristics**: Supports layout functionality.
- **General Behaviors of Data Structure**:
  - Query Behaviors: Pagination, sorting, searching.
  - Interaction Behaviors: Single selection, multiple selections.
- **Common Interfaces**: (Default data manager functions)
  - `queryPage`: Supports query functions such as pagination, sorting, and searching.
  - `create`: Inline editing for creation. (When `pk is null`)
  - `update`: Inline editing for updates. (When `pk is not null`)
  - `delete`: Delete operation.


# II. DSL Structure
A simplified version of the view can be written as follows: ("Simplified" means each tag has fewer attributes, not fewer nodes.)

```xml
<view type="GALLERY" model="demo.DemoModel" name="demo_gallery_view">
	<template slot="searchFields">
		<field data="code" />
		<field data="name" />
	</template>
	<template slot="actions">
		<action name="redirectCreatePage" label="Create" />
		<action name="delete" label="Delete" />
	</template>
	<template slot="gallery">
    <field data="id" invisible="true" />
		<template slot="card">
			<template slot="title">
				<field data="name" labelInvisible="true" justifyContent="center" />
			</template>
			<template slot="content">
				<field data="code" />
			</template>
			<template slot="rowActions">
				<action name="redirectUpdatePage" label="Edit" />
				<action name="redirectDetailPage" label="Detail" />
			</template>
		</template>
	</template>
</view>
```

Overall, the gallery view is similar to the table view, while the content in the `title` and `content` slots supports layout functionality.

The gallery view has a DSL structure designed based on view characteristics. It possesses the features of a List data structure and also supports layout functionality in the local cards.

In terms of component division of labor:
- The **Gallery component** is used to render Card components in a loop, enabling each Card component to have an independent dataset and the ability to render a single piece of data.
- Each **Card component** is divided into three parts: title area, content area, and action area, which are used to display business data and action behaviors.


# III. Default Field Components
In the above DSL, we did not specify the `widget` attribute. In this case, the Widget framework will retrieve the corresponding **default component** based on the **field metadata attributes**. The following table lists all default components currently used in the **gallery** view:

<table style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #f5f5f5;">
      <th style="border: 1px solid #ccc; padding: 10px; font-weight: bold;">Field Type</th>
      <th style="border: 1px solid #ccc; padding: 10px; font-weight: bold; text-align: center;">Multi-value</th>
      <th style="border: 1px solid #ccc; padding: 10px; font-weight: bold;">Default Component</th>
      <th style="border: 1px solid #ccc; padding: 10px; font-weight: bold;">TypeScript Class</th>
    </tr>
  </thead>
  <tbody>
    <!-- Text (STRING) - Merged 2 rows -->
    <tr>
      <td rowspan="2" style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">Text (STRING)</td>
      <td style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">No</td>
      <td style="border: 1px solid #ccc; padding: 10px;">Text (Input)</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryStringFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">Yes</td>
      <td style="border: 1px solid #ccc; padding: 10px;">Tag (Tag)</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryStringTagFieldWidget</td>
    </tr>
    <!-- Single-row Field Types -->
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">Multi-line Text (TEXT)</td>
      <td style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">No</td>
      <td style="border: 1px solid #ccc; padding: 10px;">Multi-line Text (TextArea)</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryCommonFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">Rich Text (HTML)</td>
      <td style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">No</td>
      <td style="border: 1px solid #ccc; padding: 10px;">Rich Text (RichText)</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryHtmlFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">Phone (PHONE)</td>
      <td style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">No</td>
      <td style="border: 1px solid #ccc; padding: 10px;">Phone (Phone)</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryStringFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">Email (EMAIL)</td>
      <td style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">No</td>
      <td style="border: 1px solid #ccc; padding: 10px;">Email (Email)</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryStringFieldWidget</td>
    </tr>
    <!-- Integer (INTEGER) - Merged 2 rows -->
    <tr>
      <td rowspan="2" style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">Integer (INTEGER)</td>
      <td style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">No</td>
      <td style="border: 1px solid #ccc; padding: 10px;">Integer (Integer)</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryNumberWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">Yes</td>
      <td style="border: 1px solid #ccc; padding: 10px;">Tag (Tag)</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryStringTagFieldWidget</td>
    </tr>
    <!-- Single-row Field Types -->
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">Float (FLOAT)</td>
      <td style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">No</td>
      <td style="border: 1px solid #ccc; padding: 10px;">Number (Float)</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryNumberWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">Money (MONEY)</td>
      <td style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">No</td>
      <td style="border: 1px solid #ccc; padding: 10px;">Currency (Currency)</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryNumberWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">Boolean (BOOLEAN)</td>
      <td style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">No</td>
      <td style="border: 1px solid #ccc; padding: 10px;">Text (Yes/No)</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryBooleanFieldWidget</td>
    </tr>
    <!-- Enumeration (ENUM) - Merged 2 rows -->
    <tr>
      <td rowspan="2" style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">Enumeration (ENUM)</td>
      <td style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">No</td>
      <td style="border: 1px solid #ccc; padding: 10px;">Tag (Tag)</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryEnumFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">Yes</td>
      <td style="border: 1px solid #ccc; padding: 10px;">Tag (Tag)</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryEnumMultiFieldWidget</td>
    </tr>
    <!-- Single-row Field Types (Date/Time Related) -->
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">Date Time (DATETIME)</td>
      <td style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">No</td>
      <td style="border: 1px solid #ccc; padding: 10px;">Date Time (DateTimePicker)</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryDateTimeFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">Date (DATE)</td>
      <td style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">No</td>
      <td style="border: 1px solid #ccc; padding: 10px;">Date (DatePicker)</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryDateFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">Time (TIME)</td>
      <td style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">No</td>
      <td style="border: 1px solid #ccc; padding: 10px;">Time (TimePicker)</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryTimeFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">Year (YEAR)</td>
      <td style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">No</td>
      <td style="border: 1px solid #ccc; padding: 10px;">Year (YearPicker)</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryYearFieldWidget</td>
    </tr>
    <!-- Single-row Field Types (Relationship Related) -->
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">Key-Value Pair (MAP)</td>
      <td style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">No</td>
      <td style="border: 1px solid #ccc; padding: 10px;">Key-Value Pair (Map)</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryMapFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">Many-to-One (M2O)</td>
      <td style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">No</td>
      <td style="border: 1px solid #ccc; padding: 10px;">Dropdown Single-select (Select)</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryM2OSelectFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">One-to-Many (O2M)</td>
      <td style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">Yes</td>
      <td style="border: 1px solid #ccc; padding: 10px;">Dropdown Multi-select (Select)</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryO2MSelectFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">Many-to-Many (M2M)</td>
      <td style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">Yes</td>
      <td style="border: 1px solid #ccc; padding: 10px;">Dropdown Multi-select (Select)</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryM2MSelectFieldWidget</td>
    </tr>
  </tbody>
</table>


# IV. Optional Field Components
For each field type, in addition to the corresponding default components mentioned above, there are other components that can be used by specifying the `widget` attribute. The following table lists all existing field components in the **gallery** view:

<table style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #f5f5f5;">
      <th style="border: 1px solid #ccc; padding: 10px; font-weight: bold;">Field Type</th>
      <th style="border: 1px solid #ccc; padding: 10px; font-weight: bold; text-align: center;">Multi-value</th>
      <th style="border: 1px solid #ccc; padding: 10px; font-weight: bold;">Default Component</th>
      <th style="border: 1px solid #ccc; padding: 10px; font-weight: bold;">TypeScript Class</th>
    </tr>
  </thead>
  <tbody>
    <!-- Text (STRING) - No (7 rows) -->
    <tr>
      <td rowspan="9" style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">Text (STRING)</td>
      <td rowspan="7" style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">No</td>
      <td style="border: 1px solid #ccc; padding: 10px;">Color (ColorPicker)</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryStringColorPickerFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px;">File (Upload)</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryStringUploadFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px;">Image (UploadImg)</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryStringUploadImgFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px;">Embedded Webpage (Iframe)</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryStringIframeFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px;">Hyperlink (Hyperlinks)</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryStringHyperlinksFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px;">File Download (Download)</td>
      <td style="border: 1px solid #ccc; padding: 10px;">?</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px;">Media Player (MediaPlayer)</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryStringMediaPlayerWidget</td>
    </tr>
    <!-- Text (STRING) - Yes (2 rows) -->
    <tr>
      <td rowspan="2" style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">Yes</td>
      <td style="border: 1px solid #ccc; padding: 10px;">File (Upload)</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryStringUploadFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px;">Image (UploadImg)</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryStringUploadImgFieldWidget</td>
    </tr>
    <!-- Multi-line Text (TEXT) - No (5 rows) -->
    <tr>
      <td rowspan="5" style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">Multi-line Text (TEXT)</td>
      <td rowspan="5" style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">No</td>
      <td style="border: 1px solid #ccc; padding: 10px;">Handwritten Signature (Signature)</td>
      <td style="border: 1px solid #ccc; padding: 10px;">?</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px;">Drag-and-Drop Upload (UploadDraggable)</td>
      <td style="border: 1px solid #ccc; padding: 10px;">?</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px;">File (Upload)</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryStringUploadFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px;">Image (UploadImg)</td>
      <td style="border: 1px solid #ccc; padding: 10px;">GalleryStringUploadImgFieldWidget</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px;">File Download (Download)</td>
      <td style="border: 1px solid #ccc; padding: 10px;">?</td>
    </tr>
    <!-- Boolean (BOOLEAN) - No (3 rows) -->
    <tr>
      <td rowspan="3" style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">Boolean (BOOLEAN)</td>
      <td rowspan="3" style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">No</td>
      <td style="border: 1px solid #ccc; padding: 10px;">Dropdown Single-select (Select)</td>
      <td style="border: 1px solid #ccc; padding: 10px;"><span style="color:#080808;background-color:#ffffff;">?</span></td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px;">Radio Button (Radio)</td>
      <td style="border: 1px solid #ccc; padding: 10px;"><span style="color:#080808;background-color:#ffffff;">?</span></td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px;">Checkbox (Checkbox)</td>
      <td style="border: 1px solid #ccc; padding: 10px;">?</td>
    </tr>
    <!-- Many-to-One (M2O) - No (4 rows) -->
    <tr>
      <td rowspan="4" style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">Many-to-One (M2O)</td>
      <td rowspan="4" style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">No</td>
      <td style="border: 1px solid #ccc; padding: 10px;">Radio Button (Radio)</td>
      <td style="border: 1px solid #ccc; padding: 10px;">?</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px;">Drag-and-Drop Upload (UploadDraggable)</td>
      <td style="border: 1px solid #ccc; padding: 10px;"><span style="color:#080808;background-color:#ffffff;">FormM2OUploadDraggableFieldWidget</span></td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px;">File (Upload)</td>
      <td style="border: 1px solid #ccc; padding: 10px;"><span style="color:#080808;background-color:#ffffff;">FormM2OUploadFieldWidget</span></td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px;">Image (UploadImg)</td>
      <td style="border: 1px solid #ccc; padding: 10px;">?</td>
    </tr>
    <!-- One-to-Many (O2M) - Yes (4 rows) -->
    <tr>
      <td rowspan="4" style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">One-to-Many (O2M)</td>
      <td rowspan="4" style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">Yes</td>
      <td style="border: 1px solid #ccc; padding: 10px;">Checkbox (Checkbox)</td>
      <td style="border: 1px solid #ccc; padding: 10px;">?</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px;">Drag-and-Drop Upload (UploadDraggable)</td>
      <td style="border: 1px solid #ccc; padding: 10px;"><span style="color:#080808;background-color:#ffffff;">FormO2MUploadDraggableFieldWidget</span></td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px;">File (Upload)</td>
      <td style="border: 1px solid #ccc; padding: 10px;"><span style="color:#080808;background-color:#ffffff;">FormO2MUploadFieldWidget</span></td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px;">Image (UploadImg)</td>
      <td style="border: 1px solid #ccc; padding: 10px;">?</td>
    </tr>
    <!-- Many-to-Many (M2M) - Yes (3 rows) -->
    <tr>
      <td rowspan="3" style="border: 1px solid #ccc; padding: 10px; vertical-align: middle;">Many-to-Many (M2M)</td>
      <td rowspan="3" style="border: 1px solid #ccc; padding: 10px; text-align: center; vertical-align: middle;">Yes</td>
      <td style="border: 1px solid #ccc; padding: 10px;">Drag-and-Drop Upload (UploadDraggable)</td>
      <td style="border: 1px solid #ccc; padding: 10px;"><span style="color:#080808;background-color:#ffffff;">FormM2MUploadDraggableFieldWidget</span></td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px;">File (Upload)</td>
      <td style="border: 1px solid #ccc; padding: 10px;"><span style="color:#080808;background-color:#ffffff;">FormM2MUploadFieldWidget</span></td>
    </tr>
    <tr>
      <td style="border: 1px solid #ccc; padding: 10px;">Image (UploadImg)</td>
      <td style="border: 1px solid #ccc; padding: 10px;">?</td>
    </tr>
  </tbody>
</table>


# V. DSL Property Configuration
## (I) Gallery Property Configuration
```xml
<element widget="Gallery">
    ......
</element>
```

- cols: Number of cards per row (`number`)
- gutter: Spacing between cards (`gutter`)

## (II) Card Property Configuration
```xml
<element widget="Card">
    ......
</element>
```

- width: Width (`number | string`)
- minWidth: Minimum width (`number | string`)
- maxWidth: Maximum width (`number | string`)
- height: Height (`number | string`)
- minHeight: Minimum height (`number | string`)
- maxHeight: Maximum height (`number | string`)
- allowClick: Whether the card allows clicking (requires configuring the `action` in the `click` slot) (`boolean`)
- inlineActiveCount: Number of actions displayed in the bottom action area (`number`)

## (III) Common Field Configuration
- justifyContent<font style="color:#DF2A3F;">*</font>: Horizontal alignment (`FlexRowJustify`)
- emptyStyle<font style="color:#DF2A3F;">*</font>: Empty value style (`string | 'hyphen' | 'empty' | 'null'`)

:::warning Note
Properties marked with "<font style="color:#DF2A3F;">*</font>" are not completely universal. They depend on specific component implementations. If the component's interaction does not support or implement these properties, the configuration may be ineffective.
:::

## (IV) Field Component Property Configuration
### 1. String (STRING)
#### GalleryStringFieldWidget
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
- crypto: Encrypted storage (`boolean`)

#### GalleryStringColorPickerFieldWidget
```xml
<field data="stringField" widget="ColorPicker" />
```

#### GalleryStringUploadFieldWidget
```xml
<field data="stringField" widget="Upload" />
```
- cdnKey: Specify the upload CDN key (used with backend OSS configuration) (`string`)
- privateLink: Use backend for file upload/download (used when OSS direct upload from the client is unavailable) (`boolean`)

#### GalleryStringUploadImgFieldWidget
```xml
<field data="stringField" widget="UploadImg" />
```

#### GalleryStringIframeFieldWidget
```xml
<field data="stringField" widget="Iframe" />
```
- crypto: Encrypted storage (`boolean`)

#### GalleryStringHyperlinksFieldWidget
```xml
<field data="stringField" widget="Hyperlinks" />
```
- target: Link opening method (`'OPEN_WINDOW' | 'ROUTER'`)
- text: Link display text (`string`)

#### GalleryStringMediaPlayerWidget
```xml
<field data="stringField" widget="MediaPlayer" />
```

#### GalleryStringTagFieldWidget
```xml
<field data="stringMultiField" />
```

### 2. Multi-line Text (TEXT)
#### GalleryCommonFieldWidget
```xml
<field data="textField" />
```

### 3. Rich Text (HTML)
#### GalleryHtmlFieldWidget
```xml
<field data="htmlField" />
```
- showHeight: Display height (`number | string`)

### 4. Integer (INTEGER)
#### GalleryNumberWidget
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
- showThousandth: Whether to display thousandths (`boolean | expression`)

### 5. Boolean (BOOLEAN)
#### GalleryBooleanFieldWidget
```xml
<field data="booleanField" />
```

### 6. Enum (ENUM)
#### GalleryEnumFieldWidget
```xml
<field data="enumField" />
```

#### GalleryEnumMultiFieldWidget
```xml
<field data="enumMultiField" />
```

### 7. Date-Time (DATETIME)
#### GalleryDateTimeFieldWidget
```xml
<field data="datetimeField" />
```
- format: Date-time formatting text (`string`)

### 8. Date (DATE)
#### GalleryDateFieldWidget
```xml
<field data="dateField" />
```
- format: Date formatting text (`string`)

### 9. Time (TIME)
#### GalleryTimeFieldWidget
```xml
<field data="timeField" />
```
- format: Time formatting text (`string`)

### 10. Year (YEAR)
#### GalleryYearFieldWidget
```xml
<field data="yearField" />
```
- format: Year formatting text (`string`)

### 11. Key-Value Pair (MAP)
#### GalleryMapFieldWidget
```xml
<field data="mapField" />
```

### 12. Many-to-One (M2O)
#### GalleryM2OSelectFieldWidget
```xml
<field data="m2oField" />
```
- optionLabel: Option title (`expression`)

### 13. One-to-Many (O2M)
#### GalleryO2MSelectFieldWidget
```xml
<field data="o2mField" />
```
- optionLabel: Option title (`expression`)

### 14. Many-to-Many (M2M)
#### GalleryM2MSelectFieldWidget
```xml
<field data="m2mField" />
```
- optionLabel: Option title (`expression`)