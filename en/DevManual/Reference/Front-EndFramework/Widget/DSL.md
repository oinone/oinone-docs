---
title: DSL
index: true
category:
  - R&D Manual
  - Reference
  - Front-End API
  - Widget
order: 5

---
In Oinone Kunlun, DSL is an important part that collaborates with **Layout**. It allows changes in layout content by defining **slot** fragments within the layout. How do DSL and layout work together? In this chapter, we will answer this question.

# I. Vue Slots

Before explaining DSL, let's briefly recall the use of slots in Vue.

## (Ⅰ) Default Slot

(The following example code is excerpted from the Vue slots official documentation)

A slot can be defined in the `FancyButton` component as follows:

``` vue
<button class="fancy-btn">
  <slot /><!-- Slot outlet -->
</button>
```

When using the `FancyButton` component anywhere, we can define the text in the button like this:

``` vue
<FancyButton>
  Click me! <!-- Slot content -->
</FancyButton>
```

The最终 rendered DOM is as follows:

``` html
<button class="fancy-btn">Click me!</button>
```

## (Ⅱ) Named Slots

(The following example code is excerpted from the Vue slots official documentation)

When a component contains multiple slots, named slots specify where to insert content into corresponding slots.

Three slots can be defined in the `BaseLayout` component as follows:

``` html
<div class="container">
  <div class="header">
    <slot name="header" />
  </div>
  <div class="content">
    <slot />
  </main>
  <div class="footer">
    <slot name="footer" />
  </div>
</div>
```

When using the `BaseLayout` component, we can determine which fragment inserts into which slot by specifying the slot name, just like this:

``` html
<BaseLayout>
  <template #default>
    content <!-- Content for the default slot goes here -->
  </template>
  <template #header>
    header <!-- Content for the header slot goes here -->
  </template>
  <template #footer>
    footer <!-- Content for the footer slot goes here -->
  </template>
</BaseLayout>
```

The最终 rendered DOM is as follows:

``` html
<div class="container">
  <div class="header">
    header
  </div>
  <div class="content">
    content
  </main>
  <div class="footer">
    footer
  </div>
</div>
```

:::warning
Tip:

For more content about slots, please refer to: [Vue Slots](https://cn.vuejs.org/guide/components/slots.html)

:::

# II. DSL Slots

In `Layout`, slots can be defined in two ways:

+ Declare slots using the xslot tag.
+ Declare slots using the slot attribute on any XML tag.

## (Ⅰ) xslot Tag

The xslot tag is the closest way to use Vue slots. Let's see how to use it in layouts and DSL, as well as the final merged result.

In `Layout`, we can define a `fields` slot as follows:

``` xml
<element widget="table">
    <xslot name="fields" />
</element>
```

In `DSL`, use the `template` tag to provide specific content for the slot:

``` xml
<template slot="fields">
    <field data="id" invisible="true" />
    <field data="code" />
    <field data="name" />
    <field data="countryList" />
</template>
```

The final merged `Template` is as follows:

``` xml
<element widget="table">
    <field data="id" invisible="true" />
    <field data="code" />
    <field data="name" />
    <field data="countryList" />
</element>
```

## (Ⅱ) slot Attribute

Since the Widget framework needs to adapt to more diversified page configurations, we usually want to add some attributes to components defined in the layout through DSL. Defining slots by adding the slot attribute to XML tags makes it easy to achieve `attribute merging`.

In `Layout`, we can define a `table` slot as follows:

``` xml
<element widget="table" slot="table" />
```

In `DSL`, use the `template` tag to provide specific content for the slot:

``` xml
<template slot="table" sortable="true">
    <field data="id" invisible="true" />
    <field data="code" />
    <field data="name" />
    <field data="countryList" />
</template>
```

The final merged `Template` is as follows:

``` xml
<element widget="table" sortable="true">
    <field data="id" invisible="true" />
    <field data="code" />
    <field data="name" />
    <field data="countryList" />
</element>
```

# III. DSL Merging

Like masks and layouts, DSL splits pages into orderable small units through XML tags to control the relative positions of page elements. However, it does not intuitively reflect the relative positions of elements in the entire page like masks and layouts, but only represents the relative positions of elements within a **slot** area.

## (Ⅰ) Standard Merging

Taking "Resource - Country Group" as an example, a possible `DSL` template should be:

``` xml
<view type="TABLE" model="resource.ResourceCountryGroup" title="国家分组" name="国家分组table">
    <template slot="actions">
        <action name="redirectCreatePage" label="创建"/>
        <action name="delete" label="删除"/>
    </template>
    <template slot="searchFields">
        <field data="code"/>
        <field data="name"/>
    </template>
    <template slot="fields">
        <field data="id" invisible="true"/>
        <field data="code"/>
        <field data="name"/>
        <field data="countryList"/>
    </template>
    <template slot="rowActions">
        <action name="redirectDetailPage" label="详情"/>
        <action name="redirectUpdatePage" label="编辑"/>
    </template>
</view>
```

In this `DSL` template, the `slot` attribute on the `template` tag is similar to Vue's `named slots`, which will be merged into slots defined in the layout through a series of rules during view rendering.

For this table view, it has a corresponding standard table view layout template:

``` xml
<view type="TABLE">
    <pack widget="group">
        <view type="SEARCH">
            <element widget="search" slot="search" slotSupport="field">
                <xslot name="searchFields" slotSupport="field" />
            </element>
        </view>
    </pack>
    <pack widget="group" slot="tableGroup">
        <element widget="actionBar" slot="actionBar" slotSupport="action">
            <xslot name="actions" slotSupport="action" />
        </element>
        <element widget="table" slot="table" slotSupport="field">
            <element widget="expandColumn" slot="expandRow" />
            <xslot name="fields" slotSupport="field" />
            <element widget="rowActions" slot="rowActions" slotSupport="action" />
        </element>
    </pack>
</view>
```

:::warning
Tip:

The layout template corresponding to any view can be viewed through the `viewAction#load` interface. If it is not returned by the interface, the default layout template will be used for rendering without custom registration.

For more content about Layout, please refer to: [Layout](/en/DevManual/Reference/Front-EndFramework/Widget/layout.md)

:::

According to the slot merging rules, let's try to merge them. Merge `actions`, `searchFields`, `fields`, and `rowActions` into the corresponding XML elements containing the `slot` attribute and `xslot` tag:

``` xml
<view type="TABLE">
    <pack widget="group">
        <view type="SEARCH">
            <element widget="search">
                <!-- slot="searchFields" -->
                <field data="code" />
                <field data="name" />
            </element>
        </view>
    </pack>
    <pack widget="group">
        <element widget="actionBar">
            <!-- slot="actions" -->
            <action name="redirectCreatePage" label="创建" />
            <action name="delete" label="删除" />
        </element>
        <element widget="table">
            <element widget="expandColumn" />
            <!-- slot="fields" -->
            <field data="id" invisible="true" />
            <field data="code" />
            <field data="name" />
            <field data="countryList" />
            <element widget="rowActions">
                <!-- slot="rowActions" -->
                <action name="redirectDetailPage" label="详情" />
                <action name="redirectUpdatePage" label="编辑" />
            </element>
        </element>
    </pack>
</view>
```

In this way, we obtain a complete page containing all elements.

## (Ⅱ) Attribute Merging

When merging `DSL` into `Layout`, we can not only replace or insert `child elements` but also merge attributes defined on the `template` tag into tags with the `slot` attribute.

Take the table component fragment in the layout as an example:

``` xml
<view type="TABLE">
    <element widget="table" slot="table" slotSupport="field">
        <element widget="expandColumn" slot="expandRow" />
        <xslot name="fields" slotSupport="field" />
        <element widget="rowActions" slot="rowActions" slotSupport="action" />
    </element>
</view>
```

If we have such a DSL fragment:

``` xml
<view type="TABLE">
    <template slot="table" sortable="true">
        <field data="id" invisible="true"/>
        <field data="code"/>
        <field data="name"/>
        <field data="countryList"/>
    </template>
    <template slot="rowActions">
        <action name="redirectDetailPage" label="详情" />
        <action name="redirectUpdatePage" label="编辑" />
    </template>
</view>
```

Then, the final merged result is:

``` xml
<view type="TABLE">
    <element widget="table" sortable="true">
        <field data="id" invisible="true" />
        <field data="code" />
        <field data="name" />
        <field data="countryList" />
    </element>
</view>
```

In this way, we can use the `sortable` attribute defined in DSL on the table component.

However, according to our previous standard merging rules, we have lost all child elements of the table component in the `original layout`, retaining only the fragment content in DSL. Obviously, the current table has lost the `rowActions` component, which is definitely not the result we want.

To solve this problem, we propose a more friendly solution - **Reverse merging**.

## (Ⅲ) Reverse Merging

**Forward merging** means that the layout controls the relative positions of all elements, and DSL only defines `attributes` and `child elements`. After merging, the relative positions of all elements remain unchanged based on the layout.

**Reverse merging** means that DSL controls the positions of elements containing the `slot` attribute in the layout, and the `attributes` and `child elements` defined by DSL take precedence over those defined in the layout. However, it cannot change the `tag (dslNodeType)` and `slot name (slot)` in the layout.

Take the table component fragment in the layout as an example:

``` xml
<view type="TABLE">
    <element widget="table" slot="table" slotSupport="field">
        <element widget="expandColumn" slot="expandRow" />
        <xslot name="fields" slotSupport="field" />
        <element widget="rowActions" slot="rowActions" slotSupport="action" />
    </element>
</view>
```

If we have such a DSL fragment:

``` xml
<view type="TABLE">
    <template slot="table">
        <field data="id" invisible="true" />
        <field data="code" />
        <field data="name" />
        <field data="countryList" />
        <template slot="rowActions" activeCount="3">
            <action name="redirectDetailPage" label="详情" />
            <action name="redirectUpdatePage" label="编辑" />
        </template>
    </template>
</view>
```

Then, the final merged result is:

``` xml
<view type="TABLE">
    <element widget="table">
        <field data="id" invisible="true" />
        <field data="code" />
        <field data="name" />
        <field data="countryList" />
        <element widget="rowActions" activeCount="3">
            <action name="redirectDetailPage" label="详情" />
            <action name="redirectUpdatePage" label="编辑" />
        </element>
    </element>
</view>
```

It can be seen that the `<element widget="rowActions">` defined in the `layout` is merged into the position of the `template` tag defined in DSL, preserving the `attributes` and `child elements` in DSL.

## (Ⅳ) Attribute Slots

If we only need to add some attributes to a tag without changing the content of internal child elements, we can define a `template` tag without child elements in DSL to achieve this.

For example:

``` xml
<view type="TABLE">
    <pack widget="group" slot="tableGroup">
        <element widget="table" slot="table" slotSupport="field">
            ...
        </element>
    </pack>
</view>
```

``` xml
<view type="TABLE">
    <template slot="tableGroup" title="标题" />
    <template slot="table">
        <field data="id" invisible="true"/>
        <field data="code"/>
        <field data="name"/>
        <field data="countryList"/>
    </template>
</view>
```

``` xml
<view type="TABLE">
    <pack widget="group" title="标题">
        <element widget="table">
            <field data="id" invisible="true" />
            <field data="code" />
            <field data="name" />
            <field data="countryList" />
        </element>
    </pack>
</view>
```

For the tag `<pack widget="group" title="标题">`, we successfully merged the `title` attribute in DSL into the layout without modifying any internal child elements.

# IV. Component Slots

In the Widget framework, the concept of slots is not only used for fragment replacement between `Layout` and `DSL`. To enable components to change according to DSL definitions, each component can use slots to provide specific content. This is very similar to the concept of Vue slots.

## (Ⅰ) Named Slots

Take a card as an example. We want to define the top (header), content (content), and bottom (footer) separately. In a Vue component, we can define the `Vue Template` as follows:

``` vue
<template>
  <div class="card-demo">
    <div class="card-demo-header">
      <slot name="header" />
    </div>
    <div class="card-demo-content">
      <slot name="content" />
    </div>
    <div class="card-demo-footer">
      <slot name="footer" />
    </div>
  </div>
</template>
```

This Vue component is bound to a `CardDemoWidget` component. Then, in `Layout`, we can use this card component in the following way:

``` vue
<element widget="CardDemo">
    <template slot="header" />
    <template slot="content" />
    <template slot="footer" />
</element>
```

Declare these three parts in `DSL` respectively:

``` vue
<view>
    <template slot="header">
        <field data="code" />
    </template>
    <template slot="content">
        <field data="name" />
        <field data="description" />
    </template>
    <template slot="footer">
        <action name="redirectDetailPage" label="详情" />
        <action name="redirectUpdatePage" label="编辑" />
    </template>
</view>
```

The final merged `Template` is as follows:

``` vue
<element widget="CardDemo">
    <template slot="header">
        <field data="code" />
    </template>
    <template slot="content">
        <field data="name" />
        <field data="description" />
    </template>
    <template slot="footer">
        <action name="redirectDetailPage" label="详情" />
        <action name="redirectUpdatePage" label="编辑" />
    </template>
</element>
```

In this merging process, it will fully follow the DSL merging rules and finally retain the `template` tag to provide specific content for Vue component slots.

## (Ⅱ) Default Slot

Let's remove the content slot name from the previous Vue Template, as follows:

``` vue
<template>
  <div class="card-demo">
    <div class="card-demo-header">
      <slot name="header" />
    </div>
    <div class="card-demo-content">
      <slot />
    </div>
    <div class="card-demo-footer">
      <slot name="footer" />
    </div>
  </div>
</template>
```

So, how should we use this unnamed slot in `Layout`? Since the final rendered Template is merged from `Layout` and `DSL`, we can use the default slot in two ways, which is exactly the same as the function of Vue slots.

### 1. Use the default named slot "default"

``` vue
<element widget="CardDemo">
    <template slot="header" />
    <template slot="default">
        <xslot name="content" />
    </template>
    <template slot="footer" />
</element>
```

The final merged `Template` is as follows:

``` vue
<element widget="CardDemo">
    <template slot="header">
        <field data="code" />
    </template>
    <template slot="default">
        <field data="name" />
        <field data="description" />
    </template>
    <template slot="footer">
        <action name="redirectDetailPage" label="详情" />
        <action name="redirectUpdatePage" label="编辑" />
    </template>
</element>
```

### 2. Automatically collect child elements into the default slot

``` vue
<element widget="CardDemo">
    <template slot="header" />
    <xslot name="content" />
    <template slot="footer" />
</element>
```

The final merged `Template` is as follows:

``` vue
<element widget="CardDemo">
    <template slot="header">
        <field data="code" />
    </template>
    <field data="name" />
    <field data="description" />
    <template slot="footer">
        <action name="redirectDetailPage" label="详情" />
        <action name="redirectUpdatePage" label="编辑" />
    </template>
</element>
```

Regardless of the method used, the slot content obtained in the Vue component is exactly the same.

# V. Differences Between Default View and Design View

Taking "Resource-Country Grouping" as an example, its default view may be as follows:

```xml
<view name="tableView" type="TABLE" cols="2" model="resource.ResourceCountryGroup" enableSequence="false">
  <template slot="actions" autoFill="true"/>
  <template slot="rowActions" autoFill="true"/>
  <template slot="fields">
    <field span="1" invisible="true" data="id" label="ID" readonly="true"/>
    <field span="1" data="code" label="编码"/>
    <field span="1" data="name" label="名称"/>
    <field data="countryList" label="国家列表">
      <options>
        <option references="resource.ResourceCountry" referencesModelName="resourceCountry" referencesModuleName="resource" referencesType="STORE" referencesPks="id" referencesUniques="code" referencesLabelFields="name">
          <field name="name" data="name" label="国家/地区名称" ttype="STRING" store="true" relationStore="false"/>
          <field name="id" data="id" label="ID" ttype="INTEGER" store="true" relationStore="false"/>
        </option>
      </options>
    </field>
    <field span="1" data="createDate" label="创建时间" readonly="true"/>
    <field span="1" data="writeDate" label="更新时间" readonly="true"/>
    <field span="1" data="createUid" label="创建人ID"/>
    <field span="1" data="writeUid" label="更新人ID"/>
  </template>
  <template slot="search" cols="4">
    <field span="1" invisible="true" data="id" label="ID" readonly="true"/>
    <field span="1" data="code" label="编码"/>
    <field span="1" data="name" label="名称"/>
    <field span="1" data="createDate" label="创建时间" readonly="true"/>
    <field span="1" data="writeDate" label="更新时间" readonly="true"/>
  </template>
</view>
```

The default view generated after selecting the country grouping model in the "Interface Designer" may be as follows:

```xml
<view model="resource.ResourceCountryGroup" type="table">
	<template slot="search">
		<field colSpan="QUARTER" data="code" widget="Input" />
		<field colSpan="QUARTER" data="name" widget="Input" />
		<field colSpan="QUARTER" data="createDate" widget="DateTimePicker" />
		<field colSpan="QUARTER" data="writeDate" widget="DateTimePicker" />
	</template>
	<template slot="tableGroup" />
	<template slot="actionBar">
		<action disabled="false" invisible="false" label="创建" name="redirectCreatePage" />
		<action disabled="!(context.activeRecords &amp;&amp; LIST_COUNT(context.activeRecords) &gt;= 1 &amp;&amp; LIST_AND(LIST_FIELD_NOT_IN(context.activeRecords, 'resource.ResourceCountryGroup','code',['Asia','Europe','Americas','Africa','Oceania'])))" invisible="false" label="删除" name="delete" />
	</template>
	<template slot="table">
		<field data="code" disabled="false" invisible="false" label="编码" readonly="false" required="true" widget="Input" />
		<field data="name" disabled="false" invisible="false" label="名称" readonly="false" required="true" widget="Input" />
		<field data="countryList" disabled="false" invisible="false" label="国家列表" readonly="false" required="false" widget="Select" />
		<field data="createDate" disabled="false" invisible="false" label="创建时间" readonly="true" required="false" widget="DateTimePicker" />
		<field data="writeDate" disabled="false" invisible="false" label="更新时间" readonly="true" required="false" widget="DateTimePicker" />
		<template slot="rowActions">
			<action disabled="false" invisible="false" label="详情" name="redirectDetailPage" />
			<action disabled="false" invisible="false" label="编辑" name="redirectUpdatePage" />
		</template>
		<field data="id" invisible="true" />
	</template>
</view>
```

After comparison, we can find the following differences between these two DSLs:

## (Ⅰ) Different slots are used

- In the default view, four slots: `actions`, `rowActions`, `fields`, and `search` are mainly used.
- In the design view, five slots: `actionBar`, `rowActions`, `table`, `search`, and `tableGroup` are mainly used.

**Reasons for Differences**

The default view mainly focuses on the dynamic generation of metadata and does not involve the property configuration of the components themselves. Without specific business scenarios, the property configuration of components cannot be predicted in advance. In contrast, the design view requires diversified configurations during page design, and these configurations need to be merged into the corresponding components through properties to ensure their proper functionality.

## (Ⅱ) Different filling methods for the action area

- In the default view, the `autoFill` property is used to dynamically add current model actions during view compilation.
- In the design view, the current model actions are pre-filled in the same way in advance.

**Reasons for Differences**

The default view is automatically generated based on the model used by the menu each time it starts. When actions change, the default view remains unchanged, which can minimize the number of database updates.

After the design view is generated, property configuration for actions is required, so the actions in the action area are pre-filled in the action area in advance.

:::warning Note

Only automatic filling of actions is implemented in the default view, and this design is mainly based on two considerations:

On one hand, we assume that the change frequency of model fields is lower than that of model actions. As the basic data structure of the model, fields are often relatively stable; while actions, as carriers of interaction logic, are more likely to be adjusted with business requirements. Therefore, only automatically filling actions that change more actively can not only ensure flexible response to needs but also avoid unnecessary resource consumption.

On the other hand, the default view includes three types: table, form, and detail. Among them, both form and detail views involve layout functions, and layout calculation will have a certain impact on runtime performance; in contrast, the metadata in the action area adopts a sequential filling mode, with simple logic and low calculation cost. Overall, only metadata such as that in the action area has the necessity of runtime automatic filling, thereby achieving a balance between functional integrity and performance optimization.

:::

## (Ⅲ) Different generation rules for metadata properties

- The metadata properties of the default view are automatically filled during compilation, such as required, invisible, etc.
- The metadata properties of the design view are automatically filled during generation.

**Reasons for Differences**

Similar to the automatic filling of actions, after the design view is generated, property configuration for fields is required, so some metadata properties are pre-filled in advance.

:::warning Note

It should be specially noted here that there is a difference between `metadata properties` and `Ux interaction properties`:

**Metadata properties** refer to some interaction properties stored in the metadata table, such as the `required` and `invisible` properties on the `Field` annotation.

**Ux interaction properties** refer to all properties on interaction API annotations such as `UxWidget`, and these property configurations are not reflected in the metadata table.

Therefore, when you use **Ux interaction annotations**, the generated default view will also be filled with these **Ux interaction properties**.

:::

## (Ⅳ) Different layout span attributes

- The default view uses the `cols` and `span` properties with numerical configurations to represent layout spans.
- The design view uses the `colSpan` property with enumeration configurations to represent layout spans.

**Reasons for Differences**

At the initial stage of DSL design, the `cols` and `span` properties were used to implement grid layout. However, during the design of the interface designer, it was considered that grid layouts with combined configurations are difficult for users to understand, and it is easier to configure the proportion of individual fields in the row dimension. Therefore, the design view uses the `colSpan` enumeration property for configuration.

## (Ⅴ) Whether to specify components

- The default view uses field metadata properties to automatically match default components.
- The design view needs to specify the `widget` property to determine the components used for fields during design.

**Reasons for Differences**

For convenience, the design view does not distinguish whether the current component is the default component when generating DSL, and uniformly marks the `widget` attribute on the `field` tag.
