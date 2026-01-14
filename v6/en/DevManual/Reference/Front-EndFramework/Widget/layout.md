---
title: Layout
index: true
category:
  - Development Manual
  - Reference
  - Frontend API
  - Widget
order: 4

---
In Oinone Kunlun, `Layout` performs `secondary layout` in the `main content area` of the `Mask`. Its main function is similar to that of the mask, splitting the page into orderable small units (such as containers, elements, slots, etc.) through `XML` tags to control the relative positions of page elements.

# I. Built-in Layouts

## (Ⅰ) Table View Layouts

### 1. Standard Table

```xml
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

### 2. Inline Table (Sub-table View)

```xml
<view type="TABLE">
    <view type="SEARCH">
        <element widget="search" slot="search" slotSupport="field">
            <xslot name="searchFields" slotSupport="field" />
        </element>
    </view>
    <element widget="actionBar" slot="actionBar" slotSupport="action">
        <xslot name="actions" slotSupport="action" />
    </element>
    <element widget="table" slot="table">
        <element widget="expandColumn" slot="expandRow" />
        <xslot name="fields" slotSupport="field" />
        <element widget="rowActions" slot="rowActions" />
    </element>
</view>
```

### 3. Tree on Left, Table on Right

```xml
<view type="TABLE">
    <pack title="" widget="group">
        <view type="search">
            <element slot="search" widget="search"/>
        </view>
    </pack>
    <pack title="" widget="group">
        <pack widget="row" wrap="false">
            <pack widget="col" width="257">
                <pack title="" widget="group">
                    <pack widget="col">
                        <element slot="tree" widget="tree"/>
                    </pack>
                </pack>
            </pack>
            <pack mode="full" widget="col">
                <pack widget="row">
                    <element justify="START" slot="actionBar" widget="actionBar"/>
                    <element slot="table" widget="table">
                        <element slot="expandRow" widget="expandColumn"/>
                        <element slot="rowActions" widget="rowActions"/>
                    </element>
                </pack>
            </pack>
        </pack>
    </pack>
</view>
```

### 4. Cascader on Left, Table on Right

```xml
<view type="table">
    <pack title="" widget="group">
        <view type="search">
            <element slot="search" widget="search"/>
        </view>
    </pack>
    <pack title="" widget="group">
        <pack widget="row" wrap="false">
            <pack mode="auto" widget="col">
                <element slot="cardCascader" widget="cardCascader"/>
            </pack>
            <pack mode="full" widget="col">
                <pack widget="row">
                    <element justify="START" slot="actionBar" widget="actionBar"/>
                    <element slot="table" widget="table">
                        <element slot="expandRow" widget="expandColumn"/>
                        <element slot="rowActions" widget="rowActions"/>
                    </element>
                </pack>
            </pack>
        </pack>
    </pack>
</view>
```

## (Ⅱ) Form View Layouts

### 1. Standard Form

```xml
<view type="FORM">
    <element widget="actionBar" slot="actionBar" slotSupport="action">
        <xslot name="actions" slotSupport="action" />
    </element>
    <element widget="form" slot="form">
        <xslot name="fields" slotSupport="pack,field" />
    </element>
</view>
```

### 2. Inline Form (Sub-form View)

```xml
<view type="FORM">
    <element widget="form" slot="form">
        <xslot name="fields" slotSupport="pack,field" />
    </element>
</view>
```

## (Ⅲ) Detail View Layouts

### 1. Standard Detail

```xml
<view type="DETAIL">
    <element widget="actionBar" slot="actionBar" slotSupport="action">
        <xslot name="actions" slotSupport="action" />
    </element>
    <element widget="detail" slot="detail">
        <xslot name="fields" slotSupport="pack,field" />
    </element>
</view>
```

### 2. Inline Detail (Sub-detail View)

```xml
<view type="DETAIL">
    <element widget="detail" slot="detail">
        <xslot name="fields" slotSupport="pack,field" />
    </element>
</view>
```

## (Ⅳ) Gallery View Layout

### 1. Standard Gallery View

```xml
<view type="gallery">
    <view type="search">
        <element slot="search" widget="search" />
    </view>
    <element slot="actionBar" widget="actionBar" />
    <element slot="gallery" widget="gallery">
        <element slot="card" widget="card">
            <template slot="title" />
            <template slot="content" />
            <template slot="rowActions" />
        </element>
    </element>
</view>
```

## (Ⅴ) Tree View Layout

### 1. Standard Tree View

```xml
<view type="tree">
    <pack title="" widget="group">
        <element widget="actionBar" slot="actionBar" />
        <element widget="tree" slot="tree" />
    </pack>
</view>
```

# II. Layout Components

Generally, in layouts, we mainly use three types of components for definition: `View`, `Layout`, and `Pack`, and typically do not use `Action` or `Field` components related to metadata.

For API documentation on **layout components**, please refer to:

+ [View](/en/DevManual/Reference/Front-EndFramework/Widget/View/README.md)
+ [Element](/en/DevManual/Reference/Front-EndFramework/Widget/element.md)
+ [Pack](/en/DevManual/Reference/Front-EndFramework/Widget/pack.md)

# III. Slots

In layouts, metadata fragments defined in `DSL` can be inserted into corresponding positions by defining the `slot` attribute and `xslot` tags, which is also known as **slots**.

For information on **slots**, please refer to: [DSL](/en/DevManual/Reference/Front-EndFramework/Widget/DSL.md)

# IV. Registering Layouts

Similar to component registration, layouts can also be replaced through registration.

## (Ⅰ) Layout Registration Options

```typescript
/**
 * Layout registration options
 */
export interface LayoutRegisterOptions extends SPIOptions {
  // region view

  /**
   * View type
   */
  viewType: ViewType;
  /**
   * Module code where the view model is located, typically camel-case English designerCommon
   */
  module?: string;
  /**
   * Module name where the view model is located, typically underscore-case English designer_common
   */
  moduleName?: string;
  /**
   * Layout name, corresponding to viewActionQuery.load.resView.baseLayoutName
   */
  layoutName?: string;
  /**
   * Model code of the view
   */
  model?: string;
  /**
   * Model name of the view
   */
  modelName?: string;
  /**
   * View name
   */
  viewName?: string;
  /**
   * Whether it is an inline view (specific to sub-views), such as an o2m sub-table in a form page with inline set to true
   */
  inline?: boolean;

  // endregion

  // region field

  /**
   * Model field type (specific to sub-views)
   */
  ttype?: ModelFieldType;
  /**
   * Related model field type (specific to sub-views)
   */
  relatedTtype?: ModelFieldType;
  /**
   * Field (specific to sub-views)
   */
  field?: string;

  // endregion

  // region action

  /**
   * Action name
   */
  actionName?: string;
  /**
   * Component name used by the action
   */
  actionWidget?: string;

  // endregion
}
```

From the above type declaration, it can be seen that it is mainly divided into three categories: view, field, and action. For different elements, we provide different parameters to describe the usage scope of the layout. Similar to any component registration, the more "precise" the description of the usage scope, the higher the priority of the layout in the corresponding position.

## (Ⅱ) Registering Layouts with registerLayout

Below is the layout registered in "[Exploring the Frontend Framework - Components](/en/DevManual/Tutorials/DiscoverTheFront-endFramework/chapter1-widget.md)":

```typescript
import { registerLayout, ViewType } from '@kunlun/dependencies';

registerLayout(
  `<view type="TABLE">
    <pack widget="group">
        <view type="SEARCH">
            <element widget="search" slot="search" slotSupport="field">
                <xslot name="searchFields" slotSupport="field" />
            </element>
        </view>
    </pack>
    <element widget="Counter" />
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
</view>`,
  {
    model: 'resource.ResourceCountryGroup',
    viewType: ViewType.Table
  }
);
```

As required in the previous content, a counter component is added between the search area and the table area.