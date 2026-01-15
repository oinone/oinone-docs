---
title: Table
index: true
category:
  - DevManual
  - Reference
  - User interface
  - View architectures
order: 1
prev:
  text: View architectures
  link: /v6/en/DevManual/Reference/UserInterface/ViewArchitectures/README.md
---
# Ⅰ. View Characteristics
- View Type: TABLE
- Data Type: List
- DSL Feature: Only represents the relative order of elements; no layout functionality.
- Common Behaviors for Data Structures:
  - Query Behaviors: Pagination, sorting, searching.
  - Interaction Behaviors: Single selection, multiple selections.
- Table-Specific Behaviors:
  - Interaction Behaviors: Inline editing, tree table, expandable rows, etc.
- Common Interfaces: (Default Data Manager Functions)
  - queryPage: Supports query functions such as pagination, sorting, and searching.
  - create: Inline editing for creation. (pk is null)
  - update: Inline editing for updates. (pk is not null)
  - delete: Delete action.


# Ⅱ. DSL Structure
A simplified view can be structured as follows: ("Simplified" means each tag has fewer attributes, not fewer nodes.)

```xml
<view type="TABLE" model="demo.DemoModel" name="demo_table_view">
    <template slot="searchFields">
        <field data="code" />
        <field data="name" />
    </template>
    <template slot="actions">
        <action name="redirectCreatePage" label="创建" />
        <action name="delete" label="删除" />
    </template>
    <template slot="fields">
        <field data="id" invisible="true" />
        <field data="code" />
        <field data="name" />
    </template>
    <template slot="rowActions">
        <action name="redirectUpdatePage" label="编辑" />
        <action name="redirectDetailPage" label="详情" />
    </template>
</view>
```

- In this `DSL`, **fields** and **actions** are defined based on the `demo.DemoModel` model, and placed in corresponding positions through **slots** provided by the **layout**.
- The **top-to-bottom order** of elements in a slot represents their relative positions; changing the **sequence** will change their rendered position on the page.
- The `field` tag uses the `data` attribute to declare the model’s corresponding field, which maps to the `ModelField#field` field code.
- The `action` tag uses the `name` attribute to declare the model’s corresponding action, which maps to the `Action#name` action name. All action types inherit from the `Action` model. The `label` attribute specifies the text displayed for the action on the page; if not defined, the system retrieves the text in the following order: `label > displayName > name`.

:::warning Tip
The DSL chapter provides a detailed introduction to slots and the working principles of layouts and DSL. All slot names here are derived from the default layout.

For more information about Layouts, please refer to: [Layout](/en/DevManual/Reference/Front-EndFramework/Widget/layout.md)

For more information about DSL, please refer to: [DSL](/en/DevManual/Reference/Front-EndFramework/Widget/DSL.md)
:::


# Ⅲ. Default Field Components
In the above `DSL`, we did not specify the `widget` attribute. In this case, the Widget framework will obtain the corresponding **default component** based on the **field metadata attributes**. The following lists all default components currently used in **Table** views:

<table border="1" style="border-collapse: collapse; width: 100%; text-align: left;">
  <thead>
    <tr>
      <th style="padding: 8px;">Field Type</th>
      <th style="padding: 8px;">Multi-value</th>
      <th style="padding: 8px;">Default Component</th>
      <th style="padding: 8px;">Read-only TypeScript Class</th>
      <th style="padding: 8px;">Edit-mode TypeScript Class</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2" style="padding: 8px; vertical-align: top;">Text (STRING)</td>
      <td style="padding: 8px;">No</td>
      <td style="padding: 8px;">Text (Input)</td>
      <td style="padding: 8px;">TableStringFieldWidget</td>
      <td style="padding: 8px;">FormStringInputFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Yes</td>
      <td style="padding: 8px;">Tag (Tag)</td>
      <td style="padding: 8px;">TableStringTagFieldWidget</td>
      <td style="padding: 8px;">FormStringMultiTagFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Multi-line Text (TEXT)</td>
      <td style="padding: 8px;">No</td>
      <td style="padding: 8px;">Multi-line Text (TextArea)</td>
      <td style="padding: 8px;">TableTextFieldWidget</td>
      <td style="padding: 8px;">TableEditorTextFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Rich Text (HTML)</td>
      <td style="padding: 8px;">No</td>
      <td style="padding: 8px;">Rich Text (RichText)</td>
      <td style="padding: 8px;">TableHtmlRichTextFieldWidget</td>
      <td style="padding: 8px;">FormHtmlRichTextFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Phone (PHONE)</td>
      <td style="padding: 8px;">No</td>
      <td style="padding: 8px;">Phone (Phone)</td>
      <td style="padding: 8px;">TableStringFieldWidget</td>
      <td style="padding: 8px;">FormPhoneFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Email (EMAIL)</td>
      <td style="padding: 8px;">No</td>
      <td style="padding: 8px;">Email (Email)</td>
      <td style="padding: 8px;">TableStringFieldWidget</td>
      <td style="padding: 8px;">FormEmailFieldWidget</td>
    </tr>
    <tr>
      <td rowspan="2" style="padding: 8px; vertical-align: top;">Integer (INTEGER)</td>
      <td style="padding: 8px;">No</td>
      <td style="padding: 8px;">Integer (Integer)</td>
      <td style="padding: 8px;">TableNumberWidget</td>
      <td style="padding: 8px;">FormIntegerFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Yes</td>
      <td style="padding: 8px;">Tag (Tag)</td>
      <td style="padding: 8px;">TableMultiNumberWidget</td>
      <td style="padding: 8px;">FormIntegerTagFieldWidget</td>
    </tr>
    <tr>
      <td rowspan="2" style="padding: 8px; vertical-align: top;">Float (FLOAT)</td>
      <td style="padding: 8px;">No</td>
      <td style="padding: 8px;">Number (Float)</td>
      <td style="padding: 8px;">TableNumberWidget</td>
      <td style="padding: 8px;">FormFloatFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Yes</td>
      <td style="padding: 8px;">Tag (Tag)</td>
      <td style="padding: 8px;">TableMultiNumberWidget</td>
      <td style="padding: 8px;">-</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Money (MONEY)</td>
      <td style="padding: 8px;">No</td>
      <td style="padding: 8px;">Currency (Currency)</td>
      <td style="padding: 8px;">TableCurrencyFieldWidget</td>
      <td style="padding: 8px;">FormMoneyFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Boolean (BOOLEAN)</td>
      <td style="padding: 8px;">No</td>
      <td style="padding: 8px;">Text (Yes/No)</td>
      <td style="padding: 8px;">TableBooleanFieldWidget</td>
      <td style="padding: 8px;">FormBooleanSwitchFieldWidget</td>
    </tr>
    <tr>
      <td rowspan="2" style="padding: 8px; vertical-align: top;">Enumeration (ENUM)</td>
      <td style="padding: 8px;">No</td>
      <td style="padding: 8px;">Dropdown Single-select (Select)</td>
      <td style="padding: 8px;">TableEnumFieldWidget</td>
      <td style="padding: 8px;">FormEnumFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Yes</td>
      <td style="padding: 8px;">Dropdown Multi-select (Select)</td>
      <td style="padding: 8px;">TableEnumFieldWidget</td>
      <td style="padding: 8px;">FormEnumMultiSelectFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Date Time (DATETIME)</td>
      <td style="padding: 8px;">No</td>
      <td style="padding: 8px;">Date Time (DateTimePicker)</td>
      <td style="padding: 8px;">TableDateTimeFieldWidget</td>
      <td style="padding: 8px;">FormDateTimeFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Date (DATE)</td>
      <td style="padding: 8px;">No</td>
      <td style="padding: 8px;">Date (DatePicker)</td>
      <td style="padding: 8px;">TableDateFieldWidget</td>
      <td style="padding: 8px;">FormDateFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Time (TIME)</td>
      <td style="padding: 8px;">No</td>
      <td style="padding: 8px;">Time (TimePicker)</td>
      <td style="padding: 8px;">TableTimeFieldWidget</td>
      <td style="padding: 8px;">FormTimeFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Year (YEAR)</td>
      <td style="padding: 8px;">No</td>
      <td style="padding: 8px;">Year (YearPicker)</td>
      <td style="padding: 8px;">TableYearFieldWidget</td>
      <td style="padding: 8px;">FormYearFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Key-Value Pair (MAP)</td>
      <td style="padding: 8px;">No</td>
      <td style="padding: 8px;">Key-Value Pair (Map)</td>
      <td style="padding: 8px;">TableMapFieldWidget</td>
      <td style="padding: 8px;">FormMapFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Many-to-One (M2O)</td>
      <td style="padding: 8px;">No</td>
      <td style="padding: 8px;">Dropdown Single-select (Select)</td>
      <td style="padding: 8px;">TableM2OFieldWidget</td>
      <td style="padding: 8px;">FormM2OSelectFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">One-to-Many (O2M)</td>
      <td style="padding: 8px;">Yes</td>
      <td style="padding: 8px;">Dropdown Multi-select (Select)</td>
      <td style="padding: 8px;">TableO2MFieldWidget</td>
      <td style="padding: 8px;">FormO2MSelectFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Many-to-Many (M2M)</td>
      <td style="padding: 8px;">Yes</td>
      <td style="padding: 8px;">Dropdown Multi-select (Select)</td>
      <td style="padding: 8px;">TableM2MFieldWidget</td>
      <td style="padding: 8px;">FormM2MFieldSelectWidget</td>
    </tr>
  </tbody>
</table>


# Ⅳ. Optional Field Components
For each field type, in addition to the corresponding default components mentioned above, there are additional components that can be used by specifying the `widget` attribute. The following lists the existing field components currently used in **Table** views:


<table border="1" style="border-collapse: collapse; width: 100%; text-align: left;">
  <thead>
    <tr>
      <th style="padding: 8px;">Field Type</th>
      <th style="padding: 8px;">Multi-value</th>
      <th style="padding: 8px;">Component</th>
      <th style="padding: 8px;">Read-only TypeScript Class</th>
      <th style="padding: 8px;">Edit-mode TypeScript Class</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="7" style="padding: 8px; vertical-align: top;">Text (STRING)</td>
      <td rowspan="5" style="padding: 8px; vertical-align: top;">No</td>
      <td style="padding: 8px;">Color (ColorPicker)</td>
      <td style="padding: 8px;">TableStringColorPickerFieldWidget</td>
      <td style="padding: 8px;">FormStringColorPickerFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">File (Upload)</td>
      <td style="padding: 8px;">TableStringUploadWidget</td>
      <td style="padding: 8px;">FormStringUploadFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Image (UploadImg)</td>
      <td style="padding: 8px;">TableStringUploadImageFieldWidget</td>
      <td style="padding: 8px;">FormStringUploadImgFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Hyperlink (Hyperlinks)</td>
      <td style="padding: 8px;">TableStringHyperlinksFieldWidget</td>
      <td style="padding: 8px;">FormStringHyperlinksFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Media Player (MediaPlayer)</td>
      <td style="padding: 8px;">TableStringMediaPlayerFieldWidget</td>
      <td style="padding: 8px;">FormStringMediaPlayerFieldWidget</td>
    </tr>
    <tr>
      <td rowspan="2" style="padding: 8px; vertical-align: top;">Yes</td>
      <td style="padding: 8px;">File (Upload)</td>
      <td style="padding: 8px;">TableStringMultiUploadWidget</td>
      <td style="padding: 8px;">FormStringUploadFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Image (UploadImg)</td>
      <td style="padding: 8px;">TableStringMultiUploadImageFieldWidget</td>
      <td style="padding: 8px;">FormStringUploadImgFieldWidget</td>
    </tr>
    <tr>
      <td rowspan="2" style="padding: 8px; vertical-align: top;">Multi-line Text (TEXT)</td>
      <td rowspan="2" style="padding: 8px; vertical-align: top;">No</td>
      <td style="padding: 8px;">File (Upload)</td>
      <td style="padding: 8px;">TableStringMultiUploadWidget</td>
      <td style="padding: 8px;">FormStringUploadFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Image (UploadImg)</td>
      <td style="padding: 8px;">TableStringMultiUploadImageFieldWidget</td>
      <td style="padding: 8px;">FormStringUploadImgFieldWidget</td>
    </tr>
    <tr>
      <td rowspan="3" style="padding: 8px; vertical-align: top;">Boolean (BOOLEAN)</td>
      <td rowspan="3" style="padding: 8px; vertical-align: top;">No</td>
      <td style="padding: 8px;">Switch (Switch)</td>
      <td style="padding: 8px;">TableBooleanSwitchFieldWidget</td>
      <td style="padding: 8px;">FormBooleanSwitchFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Dropdown Single-select (Select)</td>
      <td style="padding: 8px;">TableBooleanSelectFieldWidget</td>
      <td style="padding: 8px;">FormBooleanSelectFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Radio Button (Radio)</td>
      <td style="padding: 8px;">TableBooleanRadioFieldWidget</td>
      <td style="padding: 8px;">FormBooleanRadioFieldWidget</td>
    </tr>
    <tr>
      <td rowspan="2" style="padding: 8px; vertical-align: top;">Enumeration (ENUM)</td>
      <td style="padding: 8px;">No</td>
      <td style="padding: 8px;">Radio Button (Radio)</td>
      <td style="padding: 8px;">TableEnumFieldWidget</td>
      <td style="padding: 8px;">FormEnumRadioWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Yes</td>
      <td style="padding: 8px;">Checkbox (Checkbox)</td>
      <td style="padding: 8px;">TableEnumFieldWidget</td>
      <td style="padding: 8px;">FormEnumMultiCheckboxFieldWidget</td>
    </tr>
    <tr>
      <td rowspan="2" style="padding: 8px; vertical-align: top;">Many-to-One (M2O)</td>
      <td rowspan="2" style="padding: 8px; vertical-align: top;">No</td>
      <td style="padding: 8px;">Tree Selection (TreeSelect)</td>
      <td style="padding: 8px;">TableM2OFieldWidget</td>
      <td style="padding: 8px;">FormM2OTreeSelectFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Cascading Selection (Cascader)</td>
      <td style="padding: 8px;">TableM2OFieldWidget</td>
      <td style="padding: 8px;">FormM2OCascaderFieldWidget</td>
    </tr>
    <tr>
      <td rowspan="2" style="padding: 8px; vertical-align: top;">One-to-Many (O2M)</td>
      <td rowspan="2" style="padding: 8px; vertical-align: top;">Yes</td>
      <td style="padding: 8px;">Tree Selection (TreeSelect)</td>
      <td style="padding: 8px;">TableO2MFieldWidget</td>
      <td style="padding: 8px;">FormO2MTreeSelectFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Cascading Selection (Cascader)</td>
      <td style="padding: 8px;">TableO2MFieldWidget</td>
      <td style="padding: 8px;">FormO2MCascaderFieldWidget</td>
    </tr>
    <tr>
      <td rowspan="2" style="padding: 8px; vertical-align: top;">Many-to-Many (M2M)</td>
      <td rowspan="2" style="padding: 8px; vertical-align: top;">Yes</td>
      <td style="padding: 8px;">Tree Selection (TreeSelect)</td>
      <td style="padding: 8px;">TableM2MFieldWidget</td>
      <td style="padding: 8px;">FormM2MTreeSelectFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Cascading Selection (Cascader)</td>
      <td style="padding: 8px;">TableM2MFieldWidget</td>
      <td style="padding: 8px;">FormM2MCascaderFieldWidget</td>
    </tr>
  </tbody>
</table>



# Ⅴ. DSL Attribute Configuration
## (Ⅰ) Table Attribute Configuration
```xml
<element widget="Table">
    ......
</element>
```

### 1. Appearance Attributes
- emptyText: Empty data prompt text (`string`)
- emptyImage: Empty data prompt image (`url`)
- height: Height (`string | number`)
- minHeight: Minimum height (`string | number`)
- maxHeight: Maximum height (`string | number`)
- lineHeight: Row height (`number`)
- minLineHeight: Minimum row height (`number`)
- autoLineHeight: Automatic row height (`boolean`)
- activeCount: Number of inline actions (`number`)
- operatorColumnDirection: Arrangement direction of actions in the operation column (`'horizontal' | 'vertical'`)
- operatorColumnWidth: Width of the operation column (`string | number`)
- operatorColumnButtonType: Action type in the operation column (`ButtonType`)
- usingSimpleUserPrefer: Use simple-style user preferences (`boolean`)

### 2. Control Attributes
#### Interaction Attributes
- sortable: Allow sorting (`boolean`)
- ordering: Sorting rule (`string`) Example: `'field1 asc, field2 desc'`
- showPagination: Display pagination (`boolean`)
- paginationStyle: Pagination style (`'STANDARD' | 'SIMPLE'`)
- pageSizeOptions: Optional page sizes (`number[]`) Example: `'10,15,30,50,100,200'`
- defaultPageSize: Default page size (must be included in page size options) (`number`)
- filter: Invisible filter condition (`rsql`)
- domain: Visible filter condition (`rsql`)
- load: Loading function code, `FunctionDefinition#fun` (`string`)
- selectMode: Selection mode (must be used with the corresponding column type) (`'checkbox' | 'radio'`)

#### Inline Editing
- editable: Allow inline editing (`boolean`)
- editorTrigger: Inline editing trigger method (`'manual' | 'click' | 'dblclick'`)
- editorMode: Inline editing mode (`'row' | 'cell'`)
- editorCloseTrigger: Inline editing close trigger method (`'manual' | 'auto'`)
- editorShowIcon: Whether to display the editable icon in the header (`boolean`)
- rowEditorCreateFun: Inline editing creation function code, `FunctionDefinition#fun` (`string`)
- rowEditorUpdateFun: Inline editing update function code, `FunctionDefinition#fun` (`string`)

#### Statistics
- showFooter: Display footer statistics row (must be used with field statistics attributes) (`boolean`)
- statisticsLabel: Footer statistics title text (`string`)
- emptyStatisticsText: Empty statistics content (`string`)
- statisticsFun: Specify server-side statistics function code, `FunctionDefinition#fun` (`string`)
- refreshRemoteStatistics: Refresh statistics row data during search or pagination (`boolean`)

#### Expandable Rows
(To be used with expandable columns)
- expandAccordion: Use accordion mode for expandable rows (`boolean`)
- expandAll: Expand all rows on initial load (`boolean`)
- expandOperationField: Specify the field name where the expand icon for expandable rows is located (`string`)

#### Row Click
- allowRowClick: Enable row click (`boolean`)
- rowClickMode: Row click mode (`('click' | dblclick)[]`) Example: `'click,dblclick'`
- rowClickActionName: Specify the single-click row action name (must be used with the `action` tag configured in the `click` slot) (`string`)
- rowDblClickActionName: Specify the double-click row action name (must be used with the `action` tag configured in the `click` slot) (`string`)

#### Tree Table
- enabledTreeConfig: Enable tree table (`boolean`)
- treeRelationField: Tree table relation field (`string`)
- treeExpandAll: Expand all tree nodes on initial load (`boolean`)
- treeLazy: Enable lazy loading for tree table (`boolean`)
- treeHasChildField: Field name used to determine if a tree node has children (`string`) Example: `hasChild`
- expandTreeField: Specify the field name where the expand icon for the tree table is located (`string`)

## (Ⅱ) Common Column Attribute Configuration
- label: Header (`string`)
- columnType: Column type (`'checkbox' | 'radio' | 'seq' | 'expand'`)
- width: Width (`string | number`)
- minWidth: Minimum width (`string | number`)
- resizable: Allow drag-and-drop to adjust column width (`boolean`)
- align: Horizontal alignment (`'left' | 'center' | 'right'`)
- headerAlign: Header alignment (`'left' | 'center' | 'right'`)
- footerAlign: Footer alignment (`'left' | 'center' | 'right'`)
- fixed: Fixed column (`'left' | 'right'`)
- className: Additional className for cells (`string`)
- headerClassName: Additional className for header cells (`string`)
- footerClassName: Additional className for footer cells (`string`)

## (Ⅲ) Functional Column Attribute Configuration
### 1. Checkbox Column (checkbox)
```xml
<element widget="Table" checkbox="false">
    <element widget="checkbox-column" />
</element>
```
Inherits from [Common Column Attribute Configuration](/en/DevManual/Reference/UserInterface/ViewArchitectures/README.md), with `columnType` fixed as `checkbox`.

:::warning Tip
Due to historical design reasons, the `checkbox` attribute on the table would automatically add a checkbox column. When explicitly declaring a checkbox column in the DSL, set the `checkbox` attribute to `false` to avoid duplicate checkbox columns.
:::

### 2. Radio Column (radio)
```xml
<element widget="Table" checkbox="false">
    <element widget="radio-column" />
</element>
```
Inherits from [Common Column Attribute Configuration](/en/DevManual/Reference/UserInterface/ViewArchitectures/README.md), with `columnType` fixed as `radio`.

### 3. Sequence Column (seq)

```xml
<element widget="sequence-column" />
```

Inherits from [General Column Property Configuration](/en/DevManual/Reference/UserInterface/ViewArchitectures/README.md), with `columnType` fixed as `seq`.

### 4. Operation Column (operation)

```xml
<element widget="operation-column" />
```

Inherits from [General Column Property Configuration](/en/DevManual/Reference/UserInterface/ViewArchitectures/README.md)

:::warning Note

The `rowActions` provided in the default layout and the `TypeScript Class` associated with the aforementioned `operation-column` are actually the same `TableOperationColumnWidget` component. `rowActions` is planned to be removed in future major versions.

:::

### 5. Expand Row Column (expand)

```xml
<element widget="expand-column" />
```

Inherits from [General Column Property Configuration](/en/DevManual/Reference/UserInterface/ViewArchitectures/README.md)

#### Example: Configure Expand Row to Set Current View

Configure using `fields` and `expandRow` slots:

```xml
<view type="TABLE" model="demo.DemoModel" name="demo_table_view">
	<template slot="fields">
		<field data="id" invisible="true" />
		<field data="code" />
		<field data="name" />
	</template>
	<template slot="expandRow">
		<view type="DETAIL">
			<template slot="fields">
				<field data="id" invisible="true" />
				<field data="code" />
				<field data="name" />
			</template>
		</view>
	</template>
</view>
```

Configure using `table` and `expandRow` slots:

```xml
<view type="TABLE" model="demo.DemoModel" name="demo_table_view">
	<template slot="table">
		<template slot="expandRow">
			<view type="DETAIL">
				<template slot="fields">
					<field data="id" invisible="true" />
					<field data="code" />
					<field data="name" />
				</template>
			</view>
		</template>
		<field data="id" invisible="true" />
		<field data="code" />
		<field data="name" />
	</template>
</view>

```

:::warning Note

The final rendered results of these two methods are identical. For readers unfamiliar with layout and DSL slots, please refer to: [DSL](/en/DevManual/Reference/Front-EndFramework/Widget/DSL.md)

:::

#### Example: Configure Expand Row to Set Associated Model

When configuring an expand row view using a **Many-to-One (M2O) field**, you can only configure view types that use an Object data structure, such as **Form or Detail**. This allows the expand row view to automatically initiate a `queryOne` request through the association of the M2O field. As shown below:

```xml
<view type="TABLE" model="demo.DemoModel" name="demo_table_view">
	<template slot="table" expandOperationField="code">
		<template slot="expandRow" />
		<field data="id" invisible="true" />
		<field data="code" />
		<field data="name" />
		<field data="m2o">
			<view type="DETAIL">
				<template slot="fields">
					<field data="id" invisible="true" />
					<field data="code" />
					<field data="name" />
				</template>
			</view>
		</field>
	</template>
</view>
```

When configuring an expand row view using a **One-to-Many (O2M) field**, you can only configure view types that use a List data structure, such as **Table**. This allows the expand row view to automatically initiate a `queryPage` request through the association of the O2M field. As shown below:

```xml
<view type="TABLE" model="demo.DemoModel" name="demo_table_view">
	<template slot="table" expandOperationField="code">
		<template slot="expandRow" />
		<field data="id" invisible="true" />
		<field data="code" />
		<field data="name" />
		<field data="o2m">
			<view type="TABLE">
				<template slot="fields">
					<field data="id" invisible="true" />
					<field data="code" />
					<field data="name" />
				</template>
			</view>
		</field>
	</template>
</view>
```

:::warning Note

In these two examples, we use the `expandOperationField` attribute to configure the field name where the expand row icon is located. Since we use the `table` slot, we also need to retain the `expandRow` slot to ensure the expand row component works properly after merging the layout and DSL.

:::

## (Ⅳ) General Field Property Configuration

### 1. Appearance Properties

+ label: Header (```string```)
+ width: Width (```string | number```)
+ minWidth: Minimum Width (```string | number```)
+ resizable: Allow Drag-to-Resize Column Width (```boolean```)
+ align: Horizontal Alignment (```'left' | 'center' | 'right'```)
+ headerAlign: Header Alignment (```'left' | 'center' | 'right'```)
+ footerAlign: Footer Alignment (```'left' | 'center' | 'right'```)
+ fixed: Fixed Column (```'left' | 'right'```)
+ className: Additional CSS Class for Cell (```string```)
+ headerClassName: Additional CSS Class for Header Cell (```string```)
+ footerClassName: Additional CSS Class for Footer Cell (```string```)

### 2. Control Properties

#### Read-Only Mode Control Properties

+ sortable: Allow Sorting (```boolean```)
+ invisible: Column Hidden (```boolean | expression```)
+ invisibleContent: Cell Content Hidden (```boolean | expression```)
+ enableClick: Enable Cell Content Click Functionality (```boolean```)
+ clickMethod: Cell Content Click Method (```'click' | 'dblclick'```)
+ clickActionName: Specify Inline Action Name for Cell Content Click (```string```)

#### Edit Mode Control Properties

+ editable: Allow Inline Editing (```boolean```)
+ required: Mandatory (```boolean | expression```)
+ editorConfirm: Secondary Confirmation Text Content (```string```)
+ editorConfirmType: Secondary Confirmation Type (```'popper' | 'modal'```)
+ editorConfirmPosition: Secondary Confirmation Popover Position (```PopconfirmPlacement```)
+ editorEnterText: Text for Secondary Confirmation [Confirm] Button (```string```)
+ editorCancelText: Text for Secondary Confirmation [Cancel] Button (```string```)

## (V) Field Component Property Configuration

### 1. String (STRING)

#### TableStringFieldWidget

```xml
<field data="stringField" />
```

+ type: String Type (```'text' | 'password'```)

#### TableStringColorPickerFieldWidget

```xml
<field data="stringField" widget="ColorPicker" />
```

#### TableStringUploadWidget

```xml
<field data="stringField" widget="Upload" />
```

+ cdnKey: Specify Upload CDN Key, used with Backend OSS Configuration (```string```)
+ privateLink: Use Backend for File Upload/Download, used when OSS Direct Upload from Client is Not Available (```boolean```)

#### TableStringUploadImageFieldWidget

```xml
<field data="stringField" widget="UploadImg" />
```

#### TableStringHyperlinksFieldWidget

```xml
<field data="stringField" widget="Hyperlinks" />
```

+ target: Link Opening Method (```'OPEN_WINDOW' | 'ROUTER'```)
+ text: Link Display Text (```string```)
+ defaultValue: Default Display Text for Link (```string```)

#### TableStringMediaPlayerFieldWidget

```xml
<field data="stringField" widget="MediaPlayer" />
```

#### TableStringTagFieldWidget

```xml
<field data="stringMultiField" />
```

#### TableStringMultiUploadWidget

```xml
<field data="stringMultiField" widget="Upload" />
```

#### TableStringMultiUploadImageFieldWidget

```xml
<field data="stringMultiField" widget="UploadImg" />
```

### 2. Multi-Line Text (TEXT)

#### TableTextFieldWidget

```xml
<field data="textField" />
```

#### TableStringMultiUploadWidget

```xml
<field data="textMultiField" widget="Upload" />
```

#### TableStringMultiUploadImageFieldWidget

```xml
<field data="textMultiField" widget="UploadImg" />
```

### 3. Rich Text (HTML)

#### TableHtmlRichTextFieldWidget

```xml
<field data="htmlField" />
```

### 4. Phone (PHONE)

#### TableStringFieldWidget

```xml
<field data="phoneField" />
```

### 5. Email (EMAIL)

#### TableStringFieldWidget

```xml
<field data="emailField" />
```

### 6. Integer (INTEGER)

#### TableNumberWidget

```xml
<field data="integerField" />
```

+ showThousandth: Display Thousand Separators (```boolean | expression```)

#### TableMultiNumberWidget

```xml
<field data="integerMultiField" />
```

### 7. Float (FLOAT)

#### TableNumberWidget

```xml
<field data="floatField" />
```

+ showThousandth: Display Thousand Separators (```boolean | expression```)
+ decimal: Number of Decimal Places (```number | expression```)

#### TableMultiNumberWidget

```xml
<field data="floatMultiField" />
```

### 8. Money (MONEY)

#### TableCurrencyFieldWidget

```xml
<field data="moneyField" />
```

### 9. Boolean (BOOLEAN)

#### TableBooleanFieldWidget

```xml
<field data="booleanField" />
```

#### TableBooleanSwitchFieldWidget

```xml
<field data="booleanField" widget="Switch" />
```

+ truthyAction: Submit Action Name Executed When Toggled to On (```string```)
+ falsyAction: Submit Action Name Executed When Toggled to Off (```string```)

#### TableBooleanSelectFieldWidget

```xml
<field data="booleanField" widget="Select" />
```

+ optionColorStyle: Option Color Style (```'COLORFUL' | 'SIMPLICITY'```)
+ option.name: Fixed Value (```'true' | 'false'```)
+ option.label: Display Text (```string```)
+ option.color: Font Color (```color```)
+ option.backgroundColor: Background Color (```color```)
+ option.borderColor: Border Color (```color```)

**Example: Add Color Configuration for Options**

```xml
<field data="booleanField" widget="Select">
  <options>
    <option name="true" label="Yes" color="#035dff" backgroundColor="#035dff1a" />
    <option name="false" label="No" color="#6dd400" backgroundColor="#6dd4001a" />
  </options>
</field>
```

#### TableBooleanRadioFieldWidget

```xml
<field data="booleanField" widget="Radio" />
```

+ optionColorStyle: Option Color Style (```'COLORFUL' | 'SIMPLICITY'```)
+ option.name: Fixed Value (```'true' | 'false'```)
+ option.label: Display Text (```string```)
+ option.color: Font Color (```color```)
+ option.backgroundColor: Background Color (```color```)
+ option.borderColor: Border Color (```color```)

### 10. Enumeration (ENUM)

#### TableEnumFieldWidget

```xml
<field data="enumField" />
```

+ optionColorStyle: Option Color Style (```'COLORFUL' | 'SIMPLICITY'```)
+ option.name: Enum Name (```string```)
+ option.label: Display Text (```string```)
+ option.color: Font Color (```color```)
+ option.backgroundColor: Background Color (```color```)
+ option.borderColor: Border Color (```color```)

### 11. Date and Time Types

#### TableDateTimeFieldWidget

```xml
<field data="datetimeField" />
```

+ format: DateTime Format Text (```string```)

#### TableDateFieldWidget

```xml
<field data="dateField" />
```

+ format: Date Format Text (```string```)

#### TableTimeFieldWidget

```xml
<field data="timeField" />
```

+ format: Time Format Text (```string```)

#### TableYearFieldWidget

```xml
<field data="yearField" />
```

+ format: Year Format Text (```string```)

### 12. Key-Value Pair (MAP)

#### TableMapFieldWidget

```xml
<field data="mapField" />
```

### 13. Many-to-One (M2O)

#### TableM2OFieldWidget

```xml
<field data="m2oField" />
```

+ optionLabel: Display Text (```string | expression```)

### 14. One-to-Many (O2M)

#### TableO2MFieldWidget

```xml
<field data="o2mField" />
```

+ optionLabel: Display Text (```string | expression```)
+ separator: Separator, effective when concatenating labelFields without configuring optionLabel (```string```)

### 15. Many-to-Many (M2M)

#### TableM2MFieldWidget

```xml
<field data="m2mField" />
```

+ optionLabel: Display Text (```string | expression```)
+ separator: Separator, effective when concatenating labelFields without configuring optionLabel (```string```)

## (Ⅵ) Composite Column Property Configuration

### 1. TableDateTimeRangeFieldWidget

```xml
<element widget="DateTimeRangePicker">
  <field data="start" />
  <field data="end" />
</element>
```

+ separator: Separator (```string```)

### 2. TableDateRangeFieldWidget

```xml
<element widget="DateRangePicker">
  <field data="start" />
  <field data="end" />
</element>
```

+ separator: Separator (```string```)

### 3. TableTimeRangeFieldWidget

```xml
<element widget="TimeRangePicker">
  <field data="start" />
  <field data="end" />
</element>
```

+ separator: Separator (```string```)

### 4. TableYearRangeFieldWidget

```xml
<element widget="YearRangePicker">
  <field data="start" />
  <field data="end" />
</element>
```

+ separator: Separator (```string```)