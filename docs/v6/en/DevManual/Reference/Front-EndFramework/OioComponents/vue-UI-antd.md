---
title: Vue UI Antd
index: true
category:
  - R&D Manual
  - Reference
  - Oio Components
order: 1
prev:
  text: Gallery Field
  link: /v6/en/DevManual/Reference/Front-EndFramework/Widget/Field/gallery-field.md
---

In Oinone Kunlun, most components are implemented based on the third-party component library "[Ant Design Vue](https://3x.antdv.com/components/overview)". These components can be used not only for Widget components, but also directly for any Vue component using Vue native writing. This article will provide a detailed introduction to the usage and API definitions of these components.

# Ⅰ. Import

``` typescript
import { OioButton } from '@oinone/kunlun-vue-ui-antd';
```

# Ⅱ. Reference List

## (Ⅰ) General

### Button

#### Basic Usage

``` vue
<template>
  <oio-button>Default Button</oio-button>
  <oio-button type="primary">Primary Button</oio-button>
  <oio-button type="ghost">Ghost Button</oio-button>
  <oio-button type="link">Link Button</oio-button>
  <oio-button type="text">Text Button</oio-button>
</template>
```

#### Button with Icon

``` vue
<template>
  <oio-button icon="oinone-sousuo" icon-placement="before">Search</oio-button>
  <oio-button icon="oinone-xiazai2" icon-placement="after">Download</oio-button>
  <oio-button icon="oinone-bianji4" type="primary">Edit</oio-button>
</template>
```

#### Business Scene Button

``` vue
<template>
  <oio-button biz-style="success">Success Button</oio-button>
  <oio-button biz-style="warning">Warning Button</oio-button>
  <oio-button biz-style="danger">Danger Button</oio-button>
  <oio-button biz-style="info">Info Button</oio-button>

  <oio-button type="primary" biz-style="success">Success Button</oio-button>
  <oio-button type="primary" biz-style="warning">Warning Button</oio-button>
  <oio-button type="primary" biz-style="danger">Danger Button</oio-button>
  <oio-button type="primary" biz-style="info">Info Button</oio-button>
</template>
```

#### Loading State and Selected State

``` vue
<template>
  <oio-button async @click="onSubmit1">Built-in Loading State</oio-button>
  <oio-button :loading="loading" @click="onSubmit2">Control Loading State with loading Parameter</oio-button>
</template>
<script lang="ts">
import { OioButton } from '@oinone/kunlun-vue-ui-antd';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: {
    OioButton
  },
  props: {},
  setup(props) {
    const loading = ref(false);

    const onSubmit1 = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    };

    const onSubmit2 = () => {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
      }, 1000);
    };

    return {
      loading,
      onSubmit1,
      onSubmit2
    };
  }
});
</script>
```

#### API

**Props**

| **Property** | **Type** | **Default** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| type | `ButtonType`（`default`/`primary`/`ghost`/`link`/`text`） | `default`           | Button type |
| bizStyle | `ButtonBizStyle`（`default`/`success`/`warning`/`danger`/`info`） | `default`           | Business scene style |
| htmlType | string | `button`            | Native HTML type (e.g., `submit`/`reset`) |
| size | `ButtonSize`（`large`/`middle`/`small`） | `middle`            | Button size |
| block | boolean | `false`             | Whether to be a block-level button (occupy full parent width) |
| ghost | boolean | `false`             | Whether to be a ghost button (transparent background) |
| danger | boolean | `false`             | Whether to be a danger button (red warning) |
| href | string | - | Link address (converted to `<a>` tag, higher priority than `onClick`) |
| target | string | `_self`             | Link opening method (e.g., `_blank`/`_parent`) |
| async | boolean | `false`             | Whether to enable async mode (automatically handle loading state) |
| loading | boolean | `undefined`         | Loading state (`true` to show loading icon, `undefined` to use internal state) |
| disabled | boolean | `undefined`         | Disabled state |
| icon | string | - | Icon name (e.g., `search`/`download`, requires `OioIcon` component) |
| iconPlacement | `IconPlacement`（`before`/`after`） | `before`            | Icon position (before / after) |
| selected | boolean | `undefined`         | Selected state (only valid for `type="link"`) |


**Events**

| **Event** | **Parameters** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:loading | loading: boolean | Fired when loading state changes (for two-way binding) |
| update:selected | selected: boolean | Fired when selected state changes (for two-way binding) |
| click | event: MouseEvent | Click event (async mode automatically closes loading state after async operation completes) |


**Slots**

| **Slot** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | Button main content |
| icon | Custom icon (higher priority than `icon`<br/> prop) |


## (Ⅱ) Layout

### Divider

#### Basic Usage

``` vue
<template>
  <!-- Horizontal Divider -->
  <oio-divider />
  <!-- Horizontal Divider with Text (Centered) -->
  <oio-divider>Main Content</oio-divider>
</template>
```

#### Dashed Divider

``` vue
<template>
  <oio-divider dashed />
  <oio-divider dashed>Dashed Style</oio-divider>
</template>
```

#### Divider with Text Aligned Left/Right

``` vue
<template>
  <oio-divider orientation="left">Left Title</oio-divider>
  <oio-divider orientation="right">Right Description</oio-divider>
</template>
```

#### Vertical Divider

``` vue
<template>
  <div style="display: flex; column-gap: 16px; align-items: center">
    <span>Item 1</span>
    <oio-divider type="vertical" />
    <span>Item 2</span>
    <oio-divider type="vertical" />
    <span>Item 3</span>
  </div>
</template>
```

#### API

**Props**

| **Property** | **Type** | **Default** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| type | `DividerType`（`horizontal` | `vertical`） | `horizontal`        |
| dashed | boolean | `false`             | Whether to use dashed style |
| plain | boolean | `false`             | Whether to use plain style (text without background) |
| orientation | `DividerOrientation`（`center` | `left` | `right`） |


**Slots**

| **Slot** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | Text or custom content in the middle of the divider (such as icons, components, etc.) |


### Grid

#### Basic Usage

``` vue
<template>
  <oio-row>
    <oio-col :span="8">Column 1</oio-col>
    <oio-col :span="8">Column 2</oio-col>
    <oio-col :span="8">Column 3</oio-col>
  </oio-row>
</template>
```

#### Layout with Gutter

``` vue
<template>
  <oio-row :gutter="16">
    <oio-col :span="8">Gutter 16</oio-col>
    <oio-col :span="8">Gutter 16</oio-col>
    <oio-col :span="8">Gutter 16</oio-col>
  </oio-row>
</template>
```

#### Wrap Layout

``` vue
<template>
  <oio-row gutter="16" wrap>
    <oio-col :span="6" v-for="i in 5" :key="i">Wrap Item {{ i }}</oio-col>
  </oio-row>
</template>
```

#### API

##### oio-row

**Props**

| **Property** | **Type** | **Default** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| gutter | `CommonGutterType`（number | string                                                       | array                                                        |
| align | `FlexRowAlign`（`top`/`middle`/`bottom`/`baseline`/`stretch`） | - | Cross-axis alignment (vertical direction) |
| justify | `FlexRowJustify`（`start`/`end`/`center`/`space-between`/`space-around`） | - | Main-axis alignment (horizontal direction) |
| wrap | boolean | false | Whether to allow column wrapping |


**Slots**

| **Slot** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | Row content, including grid column components |


##### oio-col

**Props**

| **Property** | **Type** | **Default** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| flex | string   | number                                                | - |
| offset | number | - | Number of grid columns to offset |
| order | number | - | Column sorting order |
| pull | number | - | Number of grid columns to pull left |
| push | number | - | Number of grid columns to push right |
| span | number | - | Number of grid columns occupied (1-24) |
| xs | number   | object                                                | - |
| sm | number   | object                                                | - |
| md | number   | object                                                | - |
| lg | number   | object                                                | - |
| xl | number   | object                                                | - |
| xxl | number   | object                                                | - |
| fixed | boolean | false | Whether to be a fixed column, adding special style class |


**Slots**

| **Slot** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | Column content |


### Block

#### Basic Layout

``` vue
<template>
  <oio-block>
    <div>This is a piece of content</div>
  </oio-block>
</template>
```

#### Inline Layout

``` vue
<template>
  <oio-block>
    <oio-block inline>Inline Item 1</oio-block>
    <oio-block inline>Inline Item 2</oio-block>
  </oio-block>
</template>
```

#### Flex Layout (Row Direction)

``` vue
<template>
  <oio-block flex>
    <div>Item 1</div>
    <div>Item 2</div>
  </oio-block>
</template>
```

#### Flex Layout (Column Direction)

``` vue
<template>
  <oio-block flex flex-direction="column">
    <div>Item 1</div>
    <div>Item 2</div>
  </oio-block>
</template>
```

#### Flex Layout with Gutter

``` vue
<template>
  <oio-block flex gutter="16">
    <div>Item 1</div>
    <div>Item 2</div>
  </oio-block>
</template>
```

#### API

**Props**

| **Property** | **Type** | **Default** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| inline | boolean | false | Whether to be an inline element (`inline-block` or `inline-flex`) |
| flex | boolean | false | Whether to enable flex layout (`display: flex`) |
| flexDirection | `FlexDirection`（`Row`/`RowReverse`/`Column`/`ColumnReverse`） | `FlexDirection.Row` | Main axis direction of the flex container |
| gutter | string   | number                                                       | `StandardGutterType`（`[number, number]`） |


## (Ⅲ) Navigation

### Breadcrumb

#### Basic Usage

``` vue
<template>
  <oio-breadcrumb>
    <oio-breadcrumb-item>Home</oio-breadcrumb-item>
    <oio-breadcrumb-item>Category</oio-breadcrumb-item>
    <oio-breadcrumb-item>Product Details</oio-breadcrumb-item>
  </oio-breadcrumb>
</template>
```

#### Custom Separator

``` vue
<template>
  <oio-breadcrumb separator=">">
    <oio-breadcrumb-item>Home</oio-breadcrumb-item>
    <oio-breadcrumb-item>Category</oio-breadcrumb-item>
    <oio-breadcrumb-item>Product Details</oio-breadcrumb-item>
  </oio-breadcrumb>
</template>
```

#### API

##### oio-breadcrumb

**Props**

| **Property** | **Type** | **Default** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| separator | string | '/' | Global separator |


**Slots**

| **Slot** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | Breadcrumb navigation content |
| separator | Custom separator (higher priority than props) |
| itemRender | Custom list item rendering |


##### oio-breadcrumb-item

**Props**

| **Property** | **Type** | **Default** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| separator | string | '/' | Individual list item separator (higher priority than parent component) |


**Slots**

| **Slot** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | List item content |
| separator | Custom separator for the current item |
| overlay | Additional content for the list item (such as a hover layer) |


### Dropdown

For usage examples and `API`, please refer to: [Antd Dropdown for Vue](https://www.antdv.com/components/dropdown-cn)

#### Only Apply Oinone Theme Style

``` vue
<template>
  <a-dropdown class="oio-dropdown" overlay-class-name="oio-dropdown-overlay" />
</template>
```

### Pagination

#### Basic Usage

``` vue
<template>
  <oio-pagination
    :total="total"
    v-model:current-page="currentPage"
  />
</template>
```

#### Customize Items per Page

``` vue
<template>
  <oio-pagination
    :total="total"
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :page-size-options="[20, 50, 100]"
  />
</template>
```

#### Show Total and Quick Jump

``` vue
<template>
  <oio-pagination
    :total="total"
    v-model:current-page="currentPage"
    show-total
    show-jumper
  />
</template>
```

#### API

**Props**

| **Property** | **Type** | **Default** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| currentPage | number | - | Current page number (controlled mode) |
| defaultCurrentPage | number | 1 | Default page number (uncontrolled mode) |
| pageSize | number | - | Items per page (controlled mode) |
| defaultPageSize | number | 15 | Default items per page (uncontrolled mode) |
| pageSizeOptions | (number  | string)[]                                             | [10, 15, 30, 50, 100, 200] |
| total | number | 0 | Total number of data |
| showSizeChanger | boolean | true | Whether to show items per page selector |
| showTotal | boolean  | ((total: number, range) => string)                    | false |
| showJumper | boolean | false | Whether to show quick jump |
| disabled | boolean | false | Whether to disable pagination |
| showLastPage | boolean | true | Whether to show complete pagination (otherwise show simplified version) |


**Events**

| **Event** | **Parameters** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:current-page | currentPage: number | Fired when current page changes |
| update:page-size | pageSize: number | Fired when items per page changes |
| change | currentPage: number, pageSize: number | Fired when page number or items per page changes |


**Slots**

| **Slot** | **Parameters** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| pageSizeOption | { value: string } | Custom display content for items per page selector |


## (Ⅳ) Data Entry

### Cascader

#### Basic Usage

``` vue
<template>
  <oio-cascader v-model:value="selected" :options="options" placeholder="Please select cascade items" />
</template>
<script lang="ts">
import { OioCascader } from '@oinone/kunlun-vue-ui-antd';
import { defineComponent, ref } from 'vue';

interface Option {
  key: string;
  value: string;
  label: string;
  isLeaf: boolean;
  children?: Option[];
}

export default defineComponent({
  components: {
    OioCascader
  },
  props: {},
  setup(props) {
    const selected = ref();

    const options = ref<Option[]>([
      {
        key: '1',
        value: 'a',
        label: 'a',
        isLeaf: false,
        children: [
          {
            key: '1-1',
            value: 'a-1',
            label: 'a-1',
            isLeaf: true
          },
          {
            key: '1-2',
            value: 'a-2',
            label: 'a-2',
            isLeaf: true
          }
        ]
      },
      {
        key: '2',
        value: 'b',
        label: 'b',
        isLeaf: true
      }
    ]);

    return {
      selected,
      options
    };
  }
});
</script>
```

#### Asynchronous Loading of Cascade Data

``` vue
<template>
  <oio-cascader v-model:value="selected" :options="options" placeholder="Please select cascade items" :load-data="loadData" />
</template>
<script lang="ts">
import { CascaderItem, OioCascader } from '@oinone/kunlun-vue-ui-antd';
import { defineComponent, ref } from 'vue';

interface Option {
  key: string;
  value: string;
  label: string;
  isLeaf: boolean;
  loaded?: boolean;
  children?: Option[];
}

export default defineComponent({
  components: {
    OioCascader
  },
  props: {},
  setup(props) {
    const selected = ref();

    const options = ref<Option[]>([
      {
        key: '1',
        value: 'a',
        label: 'a',
        isLeaf: false
      },
      {
        key: '2',
        value: 'b',
        label: 'b',
        isLeaf: false
      }
    ]);

    const loadData = (selectedOptions: CascaderItem<Option>[]) => {
      const selectedOption = selectedOptions[selectedOptions.length - 1].data;
      if (!selectedOption.loaded) {
        selectedOption.loaded = true;
        setTimeout(() => {
          selectedOption.children = [
            {
              key: `${selectedOption.key}-1`,
              value: `${selectedOption.value}-1`,
              label: `${selectedOption.label}-1`,
              isLeaf: true
            },
            {
              key: `${selectedOption.key}-2`,
              value: `${selectedOption.value}-2`,
              label: `${selectedOption.label}-2`,
              isLeaf: true
            }
          ];
        }, 1000);
      }
    };
    return {
      selected,
      options,
      loadData
    };
  }
});
</script>
```

#### Custom Display Content

``` vue
<template>
  <oio-cascader
    v-model:value="selected"
    :options="options"
    placeholder="Please select cascade items"
    :display-render="displayRender"
  />
</template>
<script lang="ts">
import { OioCascader } from '@oinone/kunlun-vue-ui-antd';
import { defineComponent, ref } from 'vue';

interface Option {
  key: string;
  value: string;
  label: string;
  isLeaf: boolean;
  children?: Option[];
}

export default defineComponent({
  components: {
    OioCascader
  },
  props: {},
  setup(props) {
    const selected = ref();

    const options = ref<Option[]>([
      {
        key: '1',
        value: 'a',
        label: 'a',
        isLeaf: false,
        children: [
          {
            key: '1-1',
            value: 'a-1',
            label: 'a-1',
            isLeaf: true
          },
          {
            key: '1-2',
            value: 'a-2',
            label: 'a-2',
            isLeaf: true
          }
        ]
      },
      {
        key: '2',
        value: 'b',
        label: 'b',
        isLeaf: true
      }
    ]);

    const displayRender = ({ labels }: { labels: string[] }) => {
      return labels.join(' > ');
    };

    return {
      selected,
      options,
      displayRender
    };
  }
});
</script>
```

#### API

**Props**

| **Property** | **Type** | **Default** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| mode | `SelectMode`（`single`/`multiple`） | `single`            | Selection mode (single / multiple) |
| value | `string[]`| string[][]                                            | `undefined`         |
| options | `CascaderItem[]`    | `[]`                | Cascade data options |
| filterOption | `(inputValue, option) => boolean` | `undefined`         | Search filter function |
| properties | `CascaderProperties` | `{}`                | Cascade data property mapping (such as `childrenProp`<br/>/`isLeafProp`<br/>) |
| customFillProperties | `(option: CascaderItem<T>, index: number) => CascaderItem<T>` | `undefined`         | Custom data filling function |
| labelsSeparator | string | `' / '`             | Cascade label separator |
| displayRender | `CascaderDisplayRenderFunction` | Auto-splice labels | Custom display content rendering function |
| tagRender | `Function`          | `undefined`         | Tag rendering function in multiple selection mode |
| maxTagCount | number   |  `'responsive'` | `'responsive'`      |
| maxTagPlaceholder | string   |  `Function` | `'More tags'`        |
| multipleCheckedStrategy | `CascaderCheckedStrategy`（`SHOW_ALL`/`SHOW_CHILD`/`SHOW_PARENT`） | `SHOW_CHILD`        | Selection strategy in multiple selection mode |
| loading | boolean | `undefined`         | Loading state |
| loadData | `(selectedOptions: CascaderItem[]) => void` | `undefined`         | Asynchronous data loading function |
| autofocus | boolean | `false`             | Whether to autofocus |
| placeholder | string | `'Please select'`          | Placeholder text |
| allowClear | boolean | `false`             | Whether to show clear button |
| readonly | boolean | `false`             | Whether to be in read-only state |
| disabled | boolean | `undefined`         | Whether to disable |
| searchValue | string | `undefined`         | Search input value |
| enableSearch | boolean | `undefined`         | Whether to enable search function |
| dropdownClassName | string   | `string[]`                                             | `undefined`         |
| getTriggerContainer | `(triggerNode: Node | HTMLElement) => Node | HTMLElement` | `() => document.body` | Trigger container mounting node |
| changeOnSelect | boolean | `false`             | Whether to immediately trigger change event when selecting a child item in single selection mode |


**Events**

| **Event** | **Parameters** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:value | values: `string[]`| string[][]                                            |
| change | values: `string[]`| string[][], selectedOptions: CascaderItem[][]         |
| search | searchValue: string | Fired when search input changes |


### Checkbox

#### Basic Usage

``` vue
<template>
  <oio-checkbox v-model:checked="checked">Agree</oio-checkbox>
</template>
```

#### Intermediate State

``` vue
<template>
  <oio-checkbox indeterminate>Partially Selected</oio-checkbox>
</template>
```

#### Readonly and Disabled States

``` vue
<template>
  <oio-checkbox checked readonly>Readonly State (Checked)</oio-checkbox>
  <oio-checkbox readonly>Readonly State (Unchecked)</oio-checkbox>
  <oio-checkbox checked disabled>Disabled State (Checked)</oio-checkbox>
  <oio-checkbox disabled>Disabled State (Unchecked)</oio-checkbox>
</template>
```

#### API

**Props**

| **Property** | **Type** | **Default** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| autofocus | boolean | false | Whether to autofocus |
| indeterminate | boolean | undefined | Half-selected state (intermediate state) |
| checked | boolean | undefined | Selected state (two-way binding) |
| readonly | boolean | false | Whether to be in read-only state |
| disabled | boolean | false | Whether to disable |


**Events**

| **Event** | **Parameters** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:checked | checked: boolean | Fired when selected state changes (for two-way binding) |
| change | checked: boolean | Fired when selected state changes |


### DatePicker

#### Basic Usage

``` vue
<template>
  <oio-date-picker v-model:value="value" />
</template>
```

#### Only Apply Oinone Theme Style

``` vue
<template>
  <a-date-picker
    class="oio-date-time-picker"
    dropdown-class-name="oio-date-time-picker-popper"
    v-model:value="value"
  />
</template>
```

For more usage, please refer to: [Antd DatePicker for Vue](https://www.antdv.com/components/date-picker-cn)

#### API

**Props**

| **Property** | **Type** | **Default** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| placeholder | string | Mode-related default copy | Input box placeholder text |
| readonly | boolean | false | Whether to be in read-only mode (non-clickable) |
| disabled | boolean | false | Whether to disable the picker |
| format | string | - | Display format (e.g., `YYYY-MM-DD`) |
| valueFormat | string | `YYYY-MM-DD`        | Value format (for two-way binding) |
| allowClear | boolean | true | Whether to show clear button |
| open | boolean | undefined | Control pop-up display (controlled mode) |
| changeOpenValue | function | - | Callback when pop-up display state changes |
| locale | object | - | Internationalization configuration (e.g., week, month names) |
| dropdownClassName | string   | `string[]`                                             | - |
| openPanelChange | function | - | Callback when pop-up opens |
| closePanelChange | function | - | Callback when pop-up closes |
| getTriggerContainer | function | `() => document.body` | Pop-up mounting parent node |
| showToday | boolean | true | Whether to show "Today" button |
| value | Date     | string                                                | - |
| defaultValue | Date     | string                                                | - |
| disabledDate | (date) => boolean | - | Disabled date judgment function |


**Events**

| **Event** | **Parameters** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:value | value: string | Fired when selected value changes (two-way binding) |


**Slots**

| **Slot** | **Parameters** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| dateRender | { date } | Custom date cell content |
| renderExtraFooter | - | Custom pop-up footer content |


### DateRangePicker

#### Basic Usage

``` vue
<template>
  <oio-date-range-picker v-model:value="value" />
</template>
```

#### Only Apply Oinone Theme Style

``` vue
<template>
  <a-range-picker
    class="oio-date-time-range-picker oio-date-time-picker-range-date"
    dropdown-class-name="oio-date-time-range-picker-popper oio-date-time-range-picker-popper-date"
    v-model:value="value"
  />
</template>
```

For more usage, please refer to: [Antd DatePicker for Vue](https://www.antdv.com/components/date-picker-cn)

#### API

**Props**

| **Property** | **Type** | **Default** | **Description** |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| placeholder                                                  | [string, string]                                             | Mode-related default copy                                     | Input box placeholder text (start and end)                   |
| readonly                                                     | boolean                                                      | false                                                        | Whether to be in read-only mode (non-clickable)               |
| disabled                                                     | boolean                                                      | false                                                        | Whether to disable the picker                                 |
| format                                                       | string                                                       | -                                                            | Display format (e.g., `YYYY-MM-DD`)                          |
| valueFormat                                                  | string                                                       | `YYYY-MM-DD`                                                 | Value format (for two-way binding)                            |
| allowClear                                                   | boolean                                                      | true                                                         | Whether to show clear button                                  |
| dropdownClassName                                            | string                                                       | `string[]`                                                    | -                                                            |
| separator                                                    | string                                                       | `~`                                                          | Separator between start and end values                        |
| openPanelChange                                              | function                                                     | -                                                            | Callback when pop-up opens                                    |
| closePanelChange                                             | function                                                     | -                                                            | Callback when pop-up closes                                   |
| getTriggerContainer                                          | function                                                     | `() => document.body`                                        | Pop-up mounting parent node                                   |
| value | [Date    | string                                                       | undefined, Date                                              |
| defaultValue | [Date    | string                                                       | undefined, Date                                              |


**Events**

| **Event** | **Parameters** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:value | [start: string, end: string] | Fired when selected value changes (two-way binding) |


### DateTimePicker

#### Basic Usage

``` vue
<template>
  <oio-date-time-picker v-model:value="value" />
</template>
```

#### Only Apply Oinone Theme Style

``` vue
<template>
  <a-date-picker
    class="oio-date-time-picker"
    dropdown-class-name="oio-date-time-picker-popper"
    show-time
    v-model:value="value"
  />
</template>
```

For more usage, please refer to: [Antd DatePicker for Vue](https://www.antdv.com/components/date-picker-cn)

#### API

**Props**

| **Property** | **Type** | **Default** | **Description** |
| :----------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| placeholder | string | Mode-related default copy | Input box placeholder text |
| readonly | boolean | false | Whether to be in read-only mode (non-clickable) |
| disabled | boolean | false | Whether to disable the picker |
| format | string | - | Display format (e.g., `YYYY-MM-DD HH:mm:ss`)|
| valueFormat | string | `YYYY-MM-DD HH:mm:ss` | Value format |
| allowClear | boolean | true | Whether to show clear button |
| open | boolean | undefined | Control pop-up display (controlled mode) |
| changeOpenValue | function | - | Callback when pop-up display state changes |
| locale | object | - | Internationalization configuration (e.g., week, month names) |
| dropdownClassName | string   | `string[]`                                             | - |
| openPanelChange | function | - | Callback when pop-up opens |
| closePanelChange | function | - | Callback when pop-up closes |
| getTriggerContainer | function | `() => document.body` | Pop-up mounting parent node |
| showToday | boolean | true | Whether to show "Today" button |
| value | Date     | string                                                | - |
| defaultValue | Date     | string                                                | - |
| disabledDate | (date) => boolean | - | Disabled date judgment function |
| disabledTime | `(date) => { disabledHours: number[]; disabledMinutes: number[]; disabledSeconds: number[] }` | - | Disabled time configuration (function or object) |


**Events**

| **Event** | **Parameters** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:value | value: string | Fired when selected value changes (two-way binding) |


**Slots**

| **Slot** | **Parameters** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| dateRender | { date } | Custom date cell content |
| renderExtraFooter | - | Custom pop-up footer content |


### DateTimeRangePicker

#### Basic Usage

``` vue
<template>
  <oio-date-time-range-picker v-model:value="value" />
</template>
```

#### Only Apply Oinone Theme Style

``` vue
<template>
  <a-range-picker
    class="oio-date-time-range-picker oio-date-time-picker-range-datetime"
    dropdown-class-name="oio-date-time-range-picker-popper oio-date-time-range-picker-popper-datetime"
    show-time
    v-model:value="value"
  />
</template>
```

For more usage, please refer to: [Antd DatePicker for Vue](https://www.antdv.com/components/date-picker-cn)

#### API

**Props**

| **Property** | **Type** | **Default** | **Description** |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| placeholder                                                  | [string, string]                                             | Mode-related default copy                                     | Input box placeholder text (start and end)                   |
| readonly                                                     | boolean                                                      | false                                                        | Whether to be in read-only mode (non-clickable)               |
| disabled                                                     | boolean                                                      | false                                                        | Whether to disable the picker                                 |
| format                                                       | string                                                       | -                                                            | Display format (e.g., `YYYY-MM-DD HH:mm:ss`)|
| valueFormat                                                  | string                                                       | `YYYY-MM-DD HH:mm:ss`                                        | Value format (for two-way binding)                            |
| allowClear                                                   | boolean                                                      | true                                                         | Whether to show clear button                                  |
| dropdownClassName                                            | string                                                       | `string[]`                                                    | -                                                            |
| separator                                                    | string                                                       | `~`                                                          | Separator between start and end values                        |
| openPanelChange                                              | function                                                     | -                                                            | Callback when pop-up opens                                    |
| closePanelChange                                             | function                                                     | -                                                            | Callback when pop-up closes                                   |
| getTriggerContainer                                          | function                                                     | `() => document.body`                                        | Pop-up mounting parent node                                   |
| value | [Date    | string                                                       | undefined, Date                                              |
| defaultValue | [Date    | string                                                       | undefined, Date                                              |


**Events**

| **Event** | **Parameters** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:value | [start: string, end: string] | Fired when selected value changes (two-way binding) |


### Form

#### Basic Usage

``` vue
<template>
  <oio-form :data="data" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off">
    <oio-form-item label="Username" name="username" :rules="[{ required: true, message: 'Please enter username' }]">
      <oio-input v-model:value="data.username" />
    </oio-form-item>
    <oio-form-item label="Password" name="password" :rules="[{ required: true, message: 'Please enter password' }]">
      <oio-input-password v-model:value="data.password" />
    </oio-form-item>
  </oio-form>
</template>
<script lang="ts">
import { OioForm, OioFormItem, OioInput, OioInputPassword } from '@oinone/kunlun-vue-ui-antd';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: {
    OioForm,
    OioFormItem,
    OioInput,
    OioInputPassword
  },
  props: {},
  setup(props) {
    const data = ref({
      username: '',
      password: ''
    });

    return {
      data
    };
  }
});
</script>

```

#### Only Apply Oinone Theme Style

``` vue
<template>
  <a-form class="oio-form" :model="data" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off">
    <a-form-item
      class="oio-form-item oio-form-item-horizontal"
      label="Username"
      name="username"
      :rules="[{ required: true, message: 'Please input your username!' }]"
    >
      <a-input class="oio-input" v-model:value="data.username" />
    </a-form-item>
    <a-form-item
      class="oio-form-item oio-form-item-horizontal"
      label="Password"
      name="password"
      :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <a-input-password class="oio-input oio-input-password" v-model:value="data.password" />
    </a-form-item>
  </a-form>
</template>
```

For more usage, please refer to: [Antd Form for Vue](https://www.antdv.com/components/form-cn)

#### API

##### oio-form

**Props**

| **Property** | **Type** | **Default** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| name | string | - | Form name |
| rules | `Record<string, FormItemRule[]>` | - | Form validation rules |
| layout | `FormLayout`（`horizontal` | `vertical` | `inline`） |
| labelCol | `OioColModel`       | - | Label column grid configuration (for horizontal layout only) |
| wrapperCol | `OioColModel`       | - | Content column grid configuration (for horizontal layout only) |
| labelAlign | `FormLabelAlign`（`left` | `right`） | `left`              |
| colon | boolean | false | Whether to show label colon |
| validateTrigger | `ValidateTrigger` | `ValidateTrigger[]` | `['change', 'blur']` |
| validateOnRuleChange | boolean | true | Whether to trigger validation when rules change |
| loading | boolean | undefined | Whether to show loading state (inherited from `OioSpin`) |
| loadingIndicator | `VNode`             | - | Custom loading icon |
| wrapperClassName | string   | `string[]`                                             | - |
| data | object | - | Form data model |


**Events**

| **Event** | **Parameters** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| submit | `Event`             | Form submission event (triggered via `<form>` tag) |


**Methods**

| **Method** | **Parameters** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| validate | `names?: NamePath`  | Validate specified fields, return Promise |
| validateFields | `names?: NamePath`  | Validate all fields, return Promise |
| resetFields | `names?: NamePath`  | Reset specified field values and validation status |
| clearValidate | `names?: NamePath`  | Clear validation status of specified fields |
| scrollToField | `names?: NamePath`  | Scroll to specified field position |


##### oio-form-item

**Props**

| **Property** | **Type** | **Default** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| name | string | - | Field name (for form validation and data binding) |
| rules | `FormItemRule[]` | `FormItemRule` | - |
| autoLink | boolean | true | Whether to automatically associate `label` and `input`'s `for` attribute |
| colon | boolean | false | Whether to show label colon (higher priority than form-level configuration) |
| htmlFor | string | - | `id` of the `input` associated with the label |
| labelCol | `OioColModel`       | - | Label column grid configuration (only valid for horizontal layout) |
| wrapperCol | `OioColModel`       | - | Content column grid configuration (only valid for horizontal layout) |
| labelAlign | `FormLabelAlign`（`left` | `right`） | - |
| label | string | - | Label text |
| extra | string | - | Field extra description text |
| help | string | - | Field help text |
| required | boolean | - | Whether to be required (automatically generates asterisk) |
| disabled | boolean | - | Whether to disable the field |
| validateStatus | string | - | Validation status (`success`/`warning`/`error`/`validating`) |
| validateFirst | boolean | - | Whether to validate the first error rule first |
| validateTrigger | `(string | ValidateTrigger)[]` | `['change', 'blur']` | Field-level validation trigger timing |
| layout | `FormLayout`（`horizontal` | `vertical` | `inline`） |


**Slots**

| **Slot** | **Parameters** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | - | Field content (such as input boxes, selectors, etc.) |
| label | - | Custom label content |
| extra | - | Custom extra description content |
| help | - | Custom help text |


### Input

#### Basic Usage

``` vue
<template>
  <oio-input v-model:value="value" placeholder="Please enter" />
</template>
```

#### With Clear Icon

``` vue
<template>
  <oio-input v-model:value="value" placeholder="Please enter" allow-clear />
</template>
```

#### Prefix and Suffix

``` vue
<template>
  <oio-input v-model:value="value" placeholder="Please enter">
    <template #prefix>
      <oio-icon icon="oinone-a-zhanghaodenglu4x" />
    </template>
    <template #suffix>
      <oio-tooltip title="Extended Information">
        <oio-icon icon="oinone-wenhao1" />
      </oio-tooltip>
    </template>
  </oio-input>
  <oio-input v-model:value="value" placeholder="Please enter" prefix="¥" suffix="RMB" />
</template>
```

#### Number Input

``` vue
<template>
  <oio-input-number v-model:value="value" placeholder="Please enter" />
</template>
```

#### Password Input

``` vue
<template>
  <oio-input-password v-model:value="value" placeholder="Please enter" />
</template>
```

#### Search Input

``` vue
<template>
  <oio-input-search v-model:value="value" placeholder="Please enter" @search="onSearch" />
</template>
<script lang="ts">
import { InputSearchEvent, OioInputSearch } from '@oinone/kunlun-vue-ui-antd';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: {
    OioInputSearch
  },
  props: {},
  setup(props) {
    const value = ref();

    const onSearch = (e: InputSearchEvent) => {
      console.log(e.value);
    };

    return {
      value,
      onSearch
    };
  }
});
</script>
```

#### Input Group

``` vue
<template>
  <oio-input-group compact>
    <oio-input v-model:value="value1" style="flex: 1" />
    <oio-input v-model:value="value2" style="flex: 2" />
  </oio-input-group>
  <oio-input-group compact>
    <a-select class="oio-select" dropdown-class-name="oio-select-dropdown" style="flex: 1" v-model:value="value3">
      <a-select-option value="Zhejiang">Zhejiang</a-select-option>
      <a-select-option value="Jiangsu">Jiangsu</a-select-option>
    </a-select>
    <oio-input v-model:value="value4" style="flex: 2" />
  </oio-input-group>
</template>
```

#### Only Apply Oinone Theme Style

``` vue
<template>
  <!-- Basic Usage -->
  <a-input class="oio-input" v-model:value="value" placeholder="Please enter" />
  <!-- With Clear Icon -->
  <a-input class="oio-input oio-input-allow-clear" v-model:value="value" placeholder="Please enter" allow-clear />
  <!-- Number Input -->
  <a-input-number class="oio-input-number" v-model:value="value" placeholder="Please enter" />
  <!-- Password Input -->
  <a-input-password class="oio-input oio-input-password" v-model:value="value" placeholder="Please enter" />
</template>
```

For more usage, please refer to: [Antd Input for Vue](https://3x.antdv.com/components/input-cn)

#### API

##### oio-input

**Props**

| **Property** | **Type** | **Default** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| value | string | - | Input box value (two-way binding) |
| defaultValue | string | - | Default value of the input box |
| placeholder | string | - | Placeholder text |
| disabled | boolean | false | Whether to disable the input box |
| allowClear | boolean | false | Whether to show clear button |
| maxlength | number | - | Maximum input length |
| autocomplete | boolean  | string                                                | undefined |
| showCount | boolean | false | Whether to show character count, requires配合 maxlength use |
| readonly | boolean | false | Whether to be in read-only state |
| minlength | number | - | Minimum input length |
| autofocus | boolean | undefined | Whether to autofocus, takes effect after component mounting |


**Events**

| **Event** | **Parameters** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:value | value: string | undefined                                             |
| press-enter | event: KeyboardEvent | Fired when Enter key is pressed |


**Slots**

| **Slot** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| prepend | Input box prefix content, displayed before the input box |
| append | Input box suffix content, displayed after the input box |
| prefix | Input box prefix icon/content, displayed inside the input box on the left |
| suffix | Input box suffix icon/content, displayed inside the input box on the right |


**Methods**

| **Method** | **Parameters** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| focus | options?: FocusOptions | Focus the input box, can pass focus options (such as preventScroll) |
| blur | - | Remove focus from the input box |


##### oio-input-number

**Props**

| **Property** | **Type** | **Default** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| value | number   | string                                                | - |
| defaultValue | number   | string                                                | - |
| placeholder | string | - | Input box placeholder text |
| readonly | boolean | false | Whether to be in read-only mode (non-editable) |
| disabled | boolean | false | Whether to disable the input box |
| formatter | `(value: string) => string` | - | Format display value (prior to `showThousandth`) |
| parser | `(value: string) => string` | - | Parse input value (process formatted value) |
| min | number   | string                                                | - |
| max | number   | string                                                | - |
| step | number   | string                                                | `1`                 |
| addStep | number   | string                                                | `step`              |
| reduceStep | number   | string                                                | `step`              |
| precision | number | - | Number of decimal places to retain (automatically rounded, e.g., `2` for two decimal places) |
| unit | string | - | Input box suffix unit (e.g., `"Yuan"` `"%"` ) |
| hiddenStepHandle | boolean | false | Whether to hide up/down arrow buttons |
| showThousandth | boolean | false | Whether to show thousandth separators (e.g., `1,000.5` ) |
| autocorrection | boolean | false | Whether to automatically correct the value when blurring (correct to within `min/max` range) |


**Events**

| **Event** | **Parameters** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:value | value: string | Fired when value changes (two-way binding) |
| focus | `event: FocusEvent` | Fired when input box gains focus |
| blur | `event: FocusEvent` | Fired when input box loses focus |


**Slots**

| **Slot** | **Parameters** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| prepend | - | Input box prefix content (such as icons) |
| append | - | Input box suffix content (such as units) |
| prefix | - | Input box prefix (inside the input box on the left) |
| suffix | - | Input box suffix (inside the input box on the right) |


**Methods**

| **Method** | **Parameters** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| getRealValue | - | Get internal real value (`BigNumber`<br/> type) |
| setValue | val: number | string                                                |
| autocorrection | - | Manually trigger auto-correction (return corrected value) |


##### oio-input-password

**Props**

| **Property** | **Type** | **Default** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| value | string | - | Input box value (two-way binding) |
| defaultValue | string | - | Default value of the input box |
| placeholder | string | - | Placeholder text |
| disabled | boolean | false | Whether to disable the input box |
| allowClear | boolean | false | Whether to show clear button |
| maxlength | number | - | Maximum input length |
| autocomplete | boolean  | string                                                | 'new-password' |
| showCount | boolean | false | Whether to show character count |
| readonly | boolean | false | Whether to be in read-only state |
| minlength | number | - | Minimum input length |
| autofocus | boolean | - | Whether to autofocus after component mounting |
| showPassword | boolean | true | Whether to show button to toggle password visibility |


**Events**

| **Event** | **Parameters** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:value | string   | undefined                                             |


**Slots**

| **Slot** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| prepend | Input box prefix content |
| append | Input box suffix content |
| prefix | Input box prefix content |


##### oio-input-search

**Props**

| **Property** | **Type** | **Default** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| type | InputType | InputType.TEXT | Input box type, optional values: TEXT, PASSWORD |
| value | string | - | Input box value (two-way binding) |
| defaultValue | string | - | Default value of the input box |
| placeholder | string | - | Placeholder text |
| disabled | boolean | false | Whether to disable the input box |
| allowClear | boolean | false | Whether to show clear button |
| maxlength | number | - | Maximum input length |
| autocomplete | boolean  | string                                                | 'new-password' |
| showCount | boolean | false | Whether to show character count |
| readonly | boolean | false | Whether to be in read-only state |
| minlength | number | - | Minimum input length |
| autofocus | boolean | - | Whether to autofocus after component mounting |


**Events**

| **Event** | **Parameters** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:value | string   | undefined                                             |
| search | InputSearchEvent                                             | Fired when search button is clicked or Enter key is pressed |


**Slots**

| **Slot** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| prepend | Input box prefix content (left side) |
| append | Input box suffix content (right side) |
| prefix | Input box prefix icon/content |
| suffix | Input box suffix icon/content |
| enter | Custom search button content |


##### oio-input-group

**Props**

| **Property** | **Type** | **Default** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| compact | boolean | true | Whether to use compact mode for the input group |

**Slots**

| **Slot Name** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | Used to place the input box component |


### Select Selection Box

#### Only Apply Oinone Theme Style

``` vue
<template>
  <a-select class="oio-select" dropdown-class-name="oio-select-dropdown" />
</template>
```

For more usage methods, please refer to: [Antd Select Selection Box For Vue](https://www.antdv.com/components/select-cn)

### Slider Slider Input

#### Basic Usage

``` vue
<template>
  <oio-slider v-model:value="value" />
</template>
```

#### Vertical

``` vue
<template>
  <div style="height: 300px">
    <oio-slider v-model:value="value" direction="vertical" />
  </div>
</template>
```

#### Only Apply Oinone Theme Style

``` vue
<template>
  <!-- Basic Usage -->
  <a-slider class="oio-slider" v-model:value="value" :min="0" :max="100" :step="1" />
  <!-- Vertical -->
  <div style="height: 300px">
    <a-slider class="oio-slider" v-model:value="value" :min="0" :max="100" :step="1" vertical />
  </div>
</template>
```

For more usage methods, please refer to: [Antd Slider Slider Input For Vue](https://www.antdv.com/components/slider-cn)

#### API

**Props**

| **Parameter Name** | **Type** | **Default Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| value | number   | number[]                                              | - |
| defaultValue | number   | number[]                                              | - |
| readonly | boolean | false | Whether it is in read-only state |
| disabled | boolean | false | Whether to disable the slider |
| min | number | `0`                 | Minimum value |
| max | number | `100`               | Maximum value |
| step | number | `1`                 | Step size (the value must be a factor of `(max - min)`) |
| direction | `SliderDirection` | `'horizontal'` | `'vertical'` |
| marks | { [key: number]: string | VNode                                                        | { style?: CSSStyleDeclaration; label: string                 |
| dots | boolean | false | Whether to display scale points |
| reverse | boolean | false | Whether to slide in reverse |
| range | boolean | false | Whether to enable range selection mode |
| tooltipVisible | boolean | `undefined`         | Whether to display the tooltip (default follows interaction status) |
| tooltipPlacement | `OioTooltipPlacement` | -                                                            | Tooltip position, optional values see enum `OioTooltipPlacement` |
| tooltipFormatter | `(value: number) => string` | - | Tooltip content formatting function |
| getTooltipTriggerContainer | `(triggerNode: Node | HTMLElement) => Node | HTMLElement` | - | Tooltip container mounting point (default mounted to `body`) |


**Events**

| **Event Name** | **Parameters** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:value | number   | number[]                                              |


### Switch Toggle

#### Basic Usage

``` vue
<template>
  <oio-switch v-model:value="value" />
</template>
```

#### Toggle with Text

``` vue
<template>
  <oio-switch v-model:checked="value" checked-children="On" unchecked-children="Off" />
  <oio-switch v-model:checked="value">
    <template #checkedChildren>On</template>
    <template #uncheckedChildren>Off</template>
  </oio-switch>
</template>
```

#### Custom Toggle Values

``` vue
<template>
  <oio-switch v-model:checked="value" :checked-value="1" :unchecked-value="0" />
</template>
```

#### Only Apply Oinone Theme Style

``` vue
<template>
  <a-switch class="oio-switch" v-model:checked="value" />
</template>
```

For more usage methods, please refer to: [Antd Switch Toggle For Vue](https://www.antdv.com/components/switch-cn)

#### **API**

**Props**

| **Parameter Name** | **Type** | **Default Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| autofocus | boolean | false | Whether to automatically focus after component mounting |
| checked | boolean  | string                                                       | number                                                |
| loading | boolean | false | Whether to display the loading state |
| size | SwitchSize | 'default' | Toggle size, optional values: 'default', 'small' |
| disabled | boolean | false | Whether to disable the toggle |
| checkedValue | boolean  | string                                                       | number                                                |
| uncheckedValue | boolean  | string                                                       | number                                                |
| readonly | boolean | false | Whether it is in read-only state |


**Events**

| **Event Name** | **Parameters** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:checked | boolean | Triggered when the toggle state changes (two-way binding) |
| change | boolean | Triggered when the toggle state changes |


**Slots**

| **Slot Name** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| checkedChildren | Content displayed when the toggle is on |
| uncheckedChildren | Content displayed when the toggle is off |


### Textarea Multiline Input

#### Basic Usage

``` vue
<template>
  <oio-textarea v-model:value="value" placeholder="Please enter" />
</template>
```

#### With Remove Icon

``` vue
<template>
  <oio-textarea v-model:value="value" placeholder="Please enter" allow-clear />
</template>
```

#### Only Apply Oinone Theme Style

``` vue
<template>
  <!-- Basic Usage -->
  <a-textarea v-model:value="value" placeholder="Please enter" />
  <!-- With Remove Icon -->
  <a-textarea class="oio-textarea oio-textarea-allow-clear" v-model:value="value" placeholder="Please enter" allow-clear />
</template>
```

For more usage methods, please refer to: [Antd Input Input Box For Vue](https://www.antdv.com/components/input-cn)

#### **API**

**Props**

| **Parameter Name** | **Type** | **Default Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| value | string | - | Current value of the textarea (two-way binding) |
| defaultValue | string | - | Initial value |
| placeholder | string | - | Placeholder text |
| disabled | boolean | false | Whether to disable the textarea |
| allowClear | boolean | false | Whether to display the clear button |
| maxlength | number | - | Maximum number of input characters |
| autoSize | boolean  | TextareaSize                                          | false |
| showCount | boolean | false | Whether to display the character count |
| readonly | boolean | false | Whether it is in read-only state |
| minlength | number | - | Minimum number of input characters |


**Events**

| **Event Name** | **Parameters** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:value | string   | undefined                                             |
| change | string   | undefined                                             |


**Methods**

| **Method Name** | **Parameters** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| focus | - | Make the textarea gain focus |
| blur | - | Make the textarea lose focus |


### TimePicker Time Picker

#### Basic Usage

``` vue
<template>
  <oio-time-picker v-model:value="value" />
</template>
```

#### Only Apply Oinone Theme Style

``` vue
<template>
  <a-time-picker
    class="oio-date-time-picker"
    popup-class-name="oio-date-time-picker-popper"
    v-model:value="value"
  />
</template>
```

For more usage methods, please refer to: [Antd TimePicker Time Picker For Vue](https://www.antdv.com/components/time-picker-cn)

#### API

**Props**

| **Attribute Name** | **Type** | **Default Value** | **Description** |
| :----------------------------------------------------------- | ------------------------------------------------------------ | :----------------------------------------------------------- | :----------------------------------------------------------- |
| placeholder | string | Default copy related to the mode | Input box placeholder text |
| readonly | boolean | false | Whether it is in read-only mode (non-clickable) |
| disabled | boolean | false | Whether to disable the picker |
| format | string | - | Display format (such as `HH:mm:ss`) |
| valueFormat | string | `HH:mm:ss`          | Value format |
| allowClear | boolean | true | Whether to display the clear button |
| open | boolean | undefined | Control the pop-up layer display (controlled mode) |
| changeOpenValue | function | - | Callback when the pop-up layer display status changes |
| locale | object | - | Internationalization configuration (such as week, month names) |
| dropdownClassName | string   | `string[]`                                             | - |
| openPanelChange | function | - | Callback when the pop-up layer opens |
| closePanelChange | function | - | Callback when the pop-up layer closes |
| getTriggerContainer | function | `() => document.body` | Parent node where the pop-up layer is mounted |
| value | Date     | string                                                | - |
| defaultValue | Date     | string                                                | - |
| disabledTime | `(date) => { disabledHours: number[]; disabledMinutes: number[]; disabledSeconds: number[] }` | - | Disabled time configuration (function or object) |


### TimeRangePicker Time Range Picker

#### Basic Usage

``` vue
<template>
  <oio-time-range-picker v-model:value="value" />
</template>
```

#### Only Apply Oinone Theme Style

``` vue
<template>
  <a-time-range-picker
    class="oio-date-time-range-picker oio-date-time-picker-range-time"
    popup-class-name="oio-date-time-range-picker-popper oio-date-time-range-picker-popper-time"
    v-model:value="value"
  />
</template>
```

For more usage methods, please refer to: [Antd TimePicker Time Picker For Vue](https://www.antdv.com/components/time-picker-cn)

#### API

**Props**

| **Attribute Name** | **Type** | **Default Value** | **Description** |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| placeholder                                                  | [string, string]                                             | Default copy related to the mode                             | Input box placeholder text (start and end)                   |
| readonly                                                     | boolean                                                      | false                                                        | Whether it is in read-only mode (non-clickable)               |
| disabled                                                     | boolean                                                      | false                                                        | Whether to disable the picker                                |
| format                                                       | string                                                       | -                                                            | Display format (such as `YYYY-MM-DD HH:mm:ss`)               |
| valueFormat                                                  | string                                                       | `YYYY-MM-DD HH:mm:ss`                                        | Value format (used for two-way binding)                       |
| allowClear                                                   | boolean                                                      | true                                                         | Whether to display the clear button                          |
| dropdownClassName                                            | string                                                       | `string[]`                                                    | -                                                            |
| separator                                                    | string                                                       | `~`                                                          | Separator between start and end values                        |
| openPanelChange                                              | function                                                     | -                                                            | Callback when the pop-up layer opens                          |
| closePanelChange                                             | function                                                     | -                                                            | Callback when the pop-up layer closes                         |
| getTriggerContainer                                          | function                                                     | `() => document.body`                                        | Parent node where the pop-up layer is mounted                 |
| value | [Date    | string                                                       | undefined, Date                                              |
| defaultValue | [Date    | string                                                       | undefined, Date                                              |


**Events**

| **Event Name** | **Parameters** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:value | [start: string, end: string] | Triggered when the selected value changes (two-way binding) |


### TreeSelect Tree Selection

#### Only Apply Oinone Theme Style

``` vue
<template>
  <a-tree-select
    class="oio-select oio-tree-select"
    dropdown-class-name="oio-select-dropdown oio-tree-select-dropdown"
  />
</template>
```

For more usage methods, please refer to: [Antd Tree Select Tree Selection For Vue](https://3x.antdv.com/components/tree-select-cn)

### Upload Upload

#### Basic Usage

``` vue
<template>
  <oio-upload :upload-list="fileList" @success="onSuccess" @failure="onFailure">
    <oio-button>Click to Upload</oio-button>
  </oio-upload>
</template>
<script lang="ts">
import { FileModel, OioButton, OioUpload } from '@oinone/kunlun-vue-ui-antd';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: {
    OioButton,
    OioUpload
  },
  props: {},
  setup(props) {
    const fileList = ref<FileModel[]>([]);

    const onSuccess = (file: FileModel) => {
      fileList.value.push(file);
    };

    const onFailure = (file: FileModel) => {
      console.log(file);
    };

    return {
      fileList,
      onSuccess,
      onFailure
    };
  }
});
</script>
```

#### Upload Image

``` vue
<template>
  <oio-upload
    :upload-list="fileList"
    list-type="picture-card"
    :multiple="false"
    :show-upload-list="false"
    @success="onSuccess"
    @failure="onFailure"
  >
    <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
    <div v-else>
      <upload-outlined />
      <div>Click to Upload</div>
    </div>
  </oio-upload>
</template>
<script lang="ts">
import { UploadOutlined } from '@ant-design/icons-vue';
import { FileModel, OioUpload } from '@oinone/kunlun-vue-ui-antd';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: {
    OioUpload,
    UploadOutlined
  },
  props: {},
  setup(props) {
    const fileList = ref<FileModel[]>([]);
    const imageUrl = ref();

    const onSuccess = (file: FileModel) => {
      fileList.value = [file];
      imageUrl.value = file.url;
    };

    const onFailure = (file: FileModel) => {
      console.log(file);
    };

    return {
      fileList,
      imageUrl,
      onSuccess,
      onFailure
    };
  }
});
</script>
```

#### **API**

**Props**

| **Parameter Name** | **Type** | **Default Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| multiple | boolean | `true`              | Whether to support multi-file upload |
| limit | number | `-1`                | Maximum number of upload files (`-1` means no limit) |
| limitSize | number | `-1`                | Single file size limit (unit: MB, `-1` means no limit) |
| listType | string | `'text'`            | File list display type (`'text'`/`'picture'`/`'picture-card'`) |
| showUploadList | boolean  | `{ showPreviewIcon?: boolean; showRemoveIcon?: boolean }` | `undefined`         |
| disabled | boolean | `false`             | Whether to disable the upload function |
| beforeUpload | (file: FileItem, fileList: FileItem[]) => boolean | Promise<`boolean`>                                      | - |
| progress | Record<string, unknown> | - | Upload progress style configuration |
| onReject | (file: FileItem, fileList: FileItem[]) => void | - | Callback when file format or size validation fails |
| onDrop | (file: FileItem, event: Event) => void | - | Callback when file is dragged and dropped |
| customRequest | ({ file, onSuccess, onError, onProgress }) => void | - | Custom upload request function (overrides default request logic) |
| removeCallback | (file: FileItem) => Promise<`boolean`> | - | Callback when deleting a file (return `false` to prevent deletion) |
| readonly | boolean | `false`             | Whether it is in read-only mode (hides upload button and delete icon) |
| partSize | number | - | Size of each fragment for fragment upload (unit: MB) |
| chunkUploadThreshold | number | - | File size threshold for enabling fragment upload (unit: MB, fragment upload is enabled when the file is larger than this value) |
| parallel | number | - | Number of concurrent fragment uploads |
| accept | string   | `string[]`                                              | - |
| uploadList | FileModel[] | `[]`                | Upload file list (supports two-way binding) |
| managed | boolean | `false`             | Whether to enable file management mode (cooperates with the background to manage file status) |
| manual | boolean | `false`             | Whether to trigger upload manually (turns off auto-upload, requires calling the `handleUpload` method) |
| cdnKey | string | - | Resource key for CDN upload (used to generate upload address) |
| contentType | string | `''`                | Content-Type type of the upload request |


**Events**

| **Event Name** | **Parameter Type** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| success | `(file: FileModel) => void` | Triggered when file upload is successful |
| failure | `(error: Error, file: FileModel) => void` | Triggered when file upload fails |


**Slots**

| **Slot Name** | **Parameters** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | - | Custom upload trigger area |
| itemRender | `{ file: FileItem, onPreview, onRemove }` | Custom file list item |
| previewIcon | `{ file: FileItem, continuedUpload }` | Custom preview icon |
| removeIcon | `{ file: FileItem, continuedUpload }` | Custom delete icon |


### YearPicker Year Picker

#### Basic Usage

``` vue
<template>
  <oio-year-picker v-model:value="value" />
</template>
```

#### Only Apply Oinone Theme Style

``` vue
<template>
  <a-date-picker
    class="oio-date-time-picker"
    dropdown-class-name="oio-date-time-picker-popper"
    picker="year"
    v-model:value="value"
  />
</template>
```

For more usage methods, please refer to: [Antd DatePicker Date Picker For Vue](https://www.antdv.com/components/date-picker-cn)

#### API

**Props**

| **Attribute Name** | **Type** | **Default Value** | **Description** |
| :----------------------------------------------------------- | ------------------------------------------------------------ | :----------------------------------------------------------- | :----------------------------------------------------------- |
| placeholder | string | Default copy related to the mode | Input box placeholder text |
| readonly | boolean | false | Whether it is in read-only mode (non-clickable) |
| disabled | boolean | false | Whether to disable the picker |
| format | string | - | Display format (such as `YYYY`) |
| valueFormat | string | `YYYY`              | Value format |
| allowClear | boolean | true | Whether to display the clear button |
| open | boolean | undefined | Control the pop-up layer display (controlled mode) |
| changeOpenValue | function | - | Callback when the pop-up layer display status changes |
| locale | object | - | Internationalization configuration (such as week, month names) |
| dropdownClassName | string   | `string[]`                                             | - |
| openPanelChange | function | - | Callback when the pop-up layer opens |
| closePanelChange | function | - | Callback when the pop-up layer closes |
| getTriggerContainer | function | `() => document.body` | Parent node where the pop-up layer is mounted |
| showToday | boolean | true | Whether to display the "Today" button |
| value | Date     | string                                                | - |
| defaultValue | Date     | string                                                | - |
| disabledDate | (date) => boolean | - | Disabled date judgment function |
| disabledTime | `(date) => { disabledHours: number[]; disabledMinutes: number[]; disabledSeconds: number[] }` | - | Disabled time configuration (function or object) |


### YearRangePicker Year Range Picker

#### Basic Usage

``` vue
<template>
  <oio-year-range-picker v-model:value="value" />
</template>
```

#### Only Apply Oinone Theme Style

``` vue
<template>
  <a-range-picker
    class="oio-date-time-range-picker oio-date-time-picker-range-year"
    dropdown-class-name="oio-date-time-range-picker-popper oio-date-time-range-picker-popper-year"
    picker="year"
    v-model:value="value"
  />
</template>
```

For more usage methods, please refer to: [Antd DatePicker Date Picker For Vue](https://www.antdv.com/components/date-picker-cn)

#### API

**Props**

| **Attribute Name** | **Type** | **Default Value** | **Description** |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| placeholder                                                  | [string, string]                                             | Default copy related to the mode                             | Input box placeholder text (start and end)                   |
| readonly                                                     | boolean                                                      | false                                                        | Whether it is in read-only mode (non-clickable)               |
| disabled                                                     | boolean                                                      | false                                                        | Whether to disable the picker                                |
| format                                                       | string                                                       | -                                                            | Display format (such as `YYYY`)                            |
| valueFormat                                                  | string                                                       | `YYYY`                                                       | Value format (used for two-way binding)                       |
| allowClear                                                   | boolean                                                      | true                                                         | Whether to display the clear button                          |
| dropdownClassName                                            | string                                                       | `string[]`                                                    | -                                                            |
| separator                                                    | string                                                       | `~`                                                          | Separator between start and end values                        |
| openPanelChange                                              | function                                                     | -                                                            | Callback when the pop-up layer opens                          |
| closePanelChange                                             | function                                                     | -                                                            | Callback when the pop-up layer closes                         |
| getTriggerContainer                                          | function                                                     | `() => document.body`                                        | Parent node where the pop-up layer is mounted                 |
| value | [Date    | string                                                       | undefined, Date                                              |
| defaultValue | [Date    | string                                                       | undefined, Date                                              |


**Events**

| **Event Name** | **Parameters** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:value | [start: string, end: string] | Triggered when the selected value changes (two-way binding) |


## (V) Data Display

### Card Card

#### Basic Usage

``` vue
<template>
  <oio-card title="Title">
    <p>This is a paragraph of content</p>
  </oio-card>
</template>
```

#### Card with Action Buttons

``` vue
<template>
  <oio-card title="Title">
    <p>This is a paragraph of content</p>
    <template #titleToolbar>
      <oio-button>Title Bar Button</oio-button>
    </template>
    <template #toolbar>
      <oio-button type="link">Action Button 1</oio-button>
      <oio-button type="link">Action Button 2</oio-button>
      <oio-button type="link">Action Button 3</oio-button>
    </template>
  </oio-card>
</template>
```

#### API

**Props**

| **Parameter Name** | **Type** | **Default Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| title | string | - | Card title text |


**Slots**

| **Slot Name** | **Description** | **Parameters** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | Card content area | - |
| title | Custom title content | - |
| titleToolbar | Right toolbar of the title row | - |
| toolbar | Bottom toolbar of the card (automatically adds a separator) | - |


**Events**

| **Event Name** | **Parameters** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| click | MouseEvent | Triggered when the card is clicked |


### Collapse Collapsible Panel

#### Basic Usage

``` vue
<template>
  <oio-collapse v-model:activeKey="activeKey">
    <oio-collapse-panel key="1" header="Panel 1">
      <p>This is a paragraph of text</p>
    </oio-collapse-panel>
    <oio-collapse-panel key="2" header="Panel 2">
      <p>This is a paragraph of text</p>
    </oio-collapse-panel>
    <oio-collapse-panel key="3" header="Panel 3" disabled>
      <p>This is a paragraph of text</p>
    </oio-collapse-panel>
  </oio-collapse>
</template>
```

#### Accordion Mode

``` vue
<template>
  <oio-collapse v-model:activeKey="activeKey" accordion>
    <oio-collapse-panel key="1" header="Panel 1">
      <p>This is a paragraph of text</p>
    </oio-collapse-panel>
    <oio-collapse-panel key="2" header="Panel 2">
      <p>This is a paragraph of text</p>
    </oio-collapse-panel>
    <oio-collapse-panel key="3" header="Panel 3">
      <p>This is a paragraph of text</p>
    </oio-collapse-panel>
  </oio-collapse>
</template>
```

#### Zebra Striped Style

``` vue
<template>
  <oio-collapse v-model:activeKey="activeKey" type="stripe">
    <oio-collapse-panel key="1" header="Panel 1">
      <p>This is a paragraph of text</p>
    </oio-collapse-panel>
    <oio-collapse-panel key="2" header="Panel 2">
      <p>This is a paragraph of text</p>
    </oio-collapse-panel>
    <oio-collapse-panel key="3" header="Panel 3">
      <p>This is a paragraph of text</p>
    </oio-collapse-panel>
  </oio-collapse>
</template>
```

#### Only Apply Oinone Theme Style

``` vue
<template>
  <!-- Basic Usage -->
  <a-collapse class="oio-collapse" v-model:activeKey="activeKey">
    <a-collapse-panel class="oio-collapse-panel" key="1" header="Panel 1">
      <p>This is a paragraph of text</p>
    </a-collapse-panel>
    <a-collapse-panel class="oio-collapse-panel" key="2" header="Panel 2">
      <p>This is a paragraph of text</p>
    </a-collapse-panel>
    <a-collapse-panel class="oio-collapse-panel" key="3" header="Panel 3">
      <p>This is a paragraph of text</p>
    </a-collapse-panel>
  </a-collapse>
  <!-- Zebra Striped Style -->
  <a-collapse class="oio-collapse oio-collapse-stripe" v-model:activeKey="activeKey">
    <a-collapse-panel class="oio-collapse-panel" key="1" header="Panel 1">
      <p>This is a paragraph of text</p>
    </a-collapse-panel>
    <a-collapse-panel class="oio-collapse-panel" key="2" header="Panel 2">
      <p>This is a paragraph of text</p>
    </a-collapse-panel>
    <a-collapse-panel class="oio-collapse-panel" key="3" header="Panel 3">
      <p>This is a paragraph of text</p>
    </a-collapse-panel>
  </a-collapse>
</template>
```

For more usage methods, please refer to: [Antd Collapse Collapsible Panel For Vue](https://www.antdv.com/components/collapse-cn)

#### **API**

##### oio-collapse

**Props**

| **Parameter Name** | **Type** | **Default Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| activeKey | string   | `string[]`                                             | - |
| type | `OioCollapseType`   | `'bordered'`        | Collapsible panel type, optional values: `bordered`, `stripe`, `simple`, `ghost` |
| collapseMethod | `OioCollapseMethod` | `'default'`         | Collapse trigger method, optional values: `default` (click header), `header` (click title), `icon` (click icon) |
| accordion | boolean | false | Whether to enable accordion mode (only one panel is active at a time) |
| expandIconPosition | `OioCollapseExpandIconPosition` | `'right'`           | Expand icon position, optional values: `right` (right), `left` (left), `hidden` (hidden) |
| destroyInactivePanel | boolean | false | Whether to destroy the DOM nodes of inactive panels |
| layout | `FormLayout`        | - | Form layout |
| invisible | boolean | - | Whether to hide the component |
| disabled | boolean | - | Whether to disable all panels |
| componentData | Record<string, unknown> | - | Third-party extension attributes |


**Events**

| **Event Name** | **Parameter Type** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:active-key | string   | `string[]`                                             |


** Slots**

| **Slot Name** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | Panel content container |


**Methods**

| **Method Name** | **Parameters** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| getPanelKeys | - | Get the keys of all panels |


##### oio-collapse-panel

**Props**

| **Parameter Name** | **Type** | **Default Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| key | string | - | Unique panel identifier (required) |
| forceRender | boolean | - | Whether to force render the panel (even if inactive) |
| collapseMethod | `OioCollapseMethod` | Inherited from parent component | Collapse trigger method for a single panel (priority over parent component) |
| header | string   | VNode                                                 | `'Collapsible Panel Item'`      |
| showArrow | boolean | Inherited from parent component | Whether to display the expand icon (invalid if parent component `expandIconPosition` is `hidden`) |
| layout | `FormLayout`        | - | Form layout |
| invisible | boolean | - | Whether to hide the current panel |
| disabled | boolean | - | Whether to disable the current panel |
| componentData | Record<string, unknown> | - | Third-party extension attributes |


**Slots**

| **Slot Name** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | Panel content |
| header | Custom title content |
| extra | Additional content on the right side of the title |


### Empty Empty State

#### Basic Usage

``` vue
<template>
  <oio-empty-data />
</template>
```

#### Custom Description

``` vue
<template>
  <oio-empty-data description="Empty Description" />
  <oio-empty-data>
    <template #description>
      <span>Empty Description</span>
    </template>
  </oio-empty-data>
</template>
```

#### **API**

**Props**

| **Parameter Name** | **Type** | **Default Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| loading | boolean | `undefined`         | Whether to display the loading state (`true` displays loading animation, `false` displays empty state) |
| loadingIndicator | VNode | - | Custom loading icon |
| wrapperClassName | string   | `string[]`                                             | - |
| image | string | - | URL or path of the empty state image |
| description | string | `'No Data'`<br/>（obtained through `$translate`<br/>） | Empty state description text (if not passed and there is no `description`<br/> slot, the internationalized text is displayed by default) |


**Slots**

| **Slot Name** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| image | Custom empty state image content |
| description | Custom empty state description text |


### Gallery Gallery

#### Basic Usage

``` vue
<template>
  <oio-gallery :list="list" item-key="key">
    <template #default="{ key, data, index }">
      <oio-card :title="data.name">
        <p>{{ data.description }}</p>
      </oio-card>
    </template>
  </oio-gallery>
</template>
<script lang="ts">
import { OioCard, OioGallery } from '@oinone/kunlun-vue-ui-antd';
import { defineComponent, ref } from 'vue';

interface DataItem {
  key: string;
  name: string;
  description: string;
}

export default defineComponent({
  components: {
    OioCard,
    OioGallery
  },
  props: {},
  setup(props) {
    const list = ref<DataItem[]>([]);

    for (let i = 1; i <= 6; i++) {
      list.value.push({
        key: `${i}`,
        name: `Item ${i}`,
        description: `This is a description${i}`
      });
    }

    return {
      list
    };
  }
});
</script>
```

#### Custom Number of Columns and Spacing

``` vue
<template>
  <oio-gallery :list="list" item-key="key" :cols="3" gutter="24,24">
    <template #default="{ key, data, index }">
      <oio-card :title="data.name">
        <p>{{ data.description }}</p>
      </oio-card>
    </template>
  </oio-gallery>
</template>
```

#### **API**

**Props**

| **Parameter Name** | **Type** | **Default Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| loading | boolean | `undefined`         | Whether to display the loading state (`true`<br/> displays loading animation, `false`<br/> hides) |
| loadingIndicator | VNode | - | Custom loading icon |
| wrapperClassName | string   | `string[]`                                             | - |
| list | Record<string, unknown>[] | `required`          | Data list (each object needs to contain a unique identifier field) |
| itemKey | string | `'id'`              | Data item unique identifier field name |
| cols | number | `4`                 | Number of columns (number of items displayed per row) |
| gutter | CommonGutterType | - | Grid spacing (supports numeric, array, or object, such as `16`<br/>, `[16, 24]`<br/>) |
| itemClassName | string   | `string[]`                                             | - |
| itemStyle | CSSStyle | - | Data item container style |


**Slots**

| **Slot Name** | **Parameters** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | `{ key: string, data: Record<string, unknown>, index: number }` | Data item content |
| header | - | Header content |
| footer | - | Footer content |


### Group Group

#### Basic Usage

``` vue
<template>
  <oio-group title="Title">
    <p>This is a paragraph of content</p>
  </oio-group>
</template>
```

#### Group with Description and Help Prompt

``` vue
<template>
  <oio-group title="Title" description="This is the detailed description of the group" help="This is the help prompt content">
    <p>This is a paragraph of content</p>
  </oio-group>
</template>
```

#### Group with Toolbar

``` vue
<template>
  <oio-group title="Title">
    <p>This is a paragraph of content</p>
    <template #titleToolbar>
      <oio-button>Action Button</oio-button>
    </template>
  </oio-group>
</template>
```

#### **API**

**Props**

| **Parameter Name** | **Type** | **Default Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| title | string   | boolean                                               | undefined |
| description | string | - | Group description information |
| border | boolean | true | Whether to display a border |
| wrapperClassName | string   | `string[]`                                             | - |
| wrapperStyle | string   | CSSStyle                                              | - |
| toolbarClassName | string   | `string[]`                                             | - |
| toolbarStyle | string   | CSSStyle                                              | - |
| help | string | '' | Help prompt content |
| helpAdjustOverflow | boolean | true | Whether the help prompt automatically adjusts the position to avoid overflow |
| helpBgColor | string | - | Background color of the help prompt |
| helpPlacement | string | 'top' | Position of the help prompt, optional values: 'top', 'bottom', 'left', 'right', etc. |
| helpIcon | string | 'oinone-wenhao' | Class name of the help icon |
| helpIconColor | string | 'var(--oio-primary-color)' | Color of the help icon |
| helpIconSize | string | 'var(--oio-font-size)' | Size of the help icon |


**Slots**

| **Slot Name** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | Group content area |
| title | Custom title content |
| titleToolbar | Toolbar content on the right side of the title |


### Tabs Tabs

#### Basic Usage

``` vue
<template>
  <oio-tabs v-model:active-key="activeKey">
    <oio-tab key="1" tab="Tab 1">Content 1</oio-tab>
    <oio-tab key="2" tab="Tab 2">Content 2</oio-tab>
    <oio-tab key="3" tab="Tab 3" force-render>Content 3</oio-tab>
    <oio-tab key="4" tab="Tab 4" disabled>Content 4</oio-tab>
  </oio-tabs>
</template>
```

#### Centered

``` vue
<template>
  <oio-tabs v-model:active-key="activeKey" :component-data="{ centered: true }">
    <oio-tab key="1" tab="Tab 1">Content 1</oio-tab>
    <oio-tab key="2" tab="Tab 2">Content 2</oio-tab>
    <oio-tab key="3" tab="Tab 3">Content 3</oio-tab>
  </oio-tabs>
</template>
```

#### Tabs with Left and Right Action Buttons

``` vue
<template>
  <oio-tabs v-model:active-key="activeKey">
    <oio-tab key="1" tab="Tab 1">Content 1</oio-tab>
    <oio-tab key="2" tab="Tab 2">Content 2</oio-tab>
    <oio-tab key="3" tab="Tab 3">Content 3</oio-tab>
    <template #tabBarLeftExtraContent>
      <oio-button style="margin-right: 16px">Left Action Button</oio-button>
    </template>
    <template #tabBarExtraContent>
      <oio-button>Right Action Button</oio-button>
    </template>
  </oio-tabs>
</template>
```

#### Left Tabs

``` vue
<template>
  <oio-tabs v-model:active-key="activeKey" tab-position="left">
    <oio-tab key="1" tab="Tab 1">Content 1</oio-tab>
    <oio-tab key="2" tab="Tab 2">Content 2</oio-tab>
    <oio-tab key="3" tab="Tab 3">Content 3</oio-tab>
  </oio-tabs>
</template>
```

#### Card-style Tabs

``` vue
<template>
  <oio-tabs v-model:active-key="activeKey" type="card">
    <oio-tab key="1" tab="Tab 1">Content 1</oio-tab>
    <oio-tab key="2" tab="Tab 2">Content 2</oio-tab>
    <oio-tab key="3" tab="Tab 3">Content 3</oio-tab>
  </oio-tabs>
</template>
```

#### Editable Tabs

``` vue
<template>
  <oio-tabs v-model:active-key="activeKey" type="editable-card" @edit="onEdit">
    <oio-tab v-for="pane in panes" :key="pane.key" :tab="pane.title" :component-data="{ closable: pane.closable }">
      {{ pane.content }}
    </oio-tab>
  </oio-tabs>
</template>
<script lang="ts">
import { OioTab, OioTabs } from '@oinone/kunlun-vue-ui-antd';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: {
    OioTabs,
    OioTab
  },
  props: {},
  setup(props) {
    const activeKey = ref();

    const panes = ref<{ title: string; content: string; key: string; closable?: boolean }[]>([
      { title: 'Tab 1', content: 'Content 1', key: '1' },
      { title: 'Tab 2', content: 'Content 2', key: '2' },
      { title: 'Tab 3', content: 'Content 3', key: '3', closable: false }
    ]);

    const newTabIndex = ref(0);

    const add = () => {
      activeKey.value = `newTab${++newTabIndex.value}`;
      panes.value.push({ title: 'New Tab', content: 'New Tab Content', key: activeKey.value });
    };

    const remove = (targetKey: string) => {
      let lastIndex = 0;
      panes.value.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1;
        }
      });
      panes.value = panes.value.filter((pane) => pane.key !== targetKey);
      if (panes.value.length && activeKey.value === targetKey) {
        if (lastIndex >= 0) {
          activeKey.value = panes.value[lastIndex].key;
        } else {
          activeKey.value = panes.value[0].key;
        }
      }
    };

    const onEdit = (targetKey: string | MouseEvent, action: string) => {
      if (action === 'add') {
        add();
      } else {
        remove(targetKey as string);
      }
    };

    return {
      activeKey,
      panes,
      onEdit
    };
  }
});
</script>
```

#### **API**

##### oio-tabs

**Props**

| **Parameter Name** | **Type** | **Default Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| activeKey | string   | number                                                | - |
| tabPosition | `OioTabPosition`    | `'top'`             | Tab position, optional values: `top` (top), `bottom` (bottom), `left` (left), `right` (right) |
| verticalHeight | number   | string                                                | - |
| destroyInactiveTabPane | boolean | false | Whether to destroy the DOM nodes of inactive panes |
| type | `OioTabsType` | - | Tab type, optional values: `line` (default), `card` (card-style tabs), `editable-card` (editable tabs) |
| layout | `FormLayout`        | - | Form layout configuration |
| invisible | boolean | - | Whether to hide the entire tab container |
| disabled | boolean | false | Whether to disable all tabs (cannot be clicked to switch when disabled) |
| componentData | Record<string, unknown> | - | Third-party extension attributes (passed through to the underlying component) |


**Events**

| **Event Name** | **Parameter Type** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:active-key | string   | number                                                |


**Slots**

| **Slot Name** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | Tab panel content (contains `OioTab` child components) |
| tabBarLeftExtraContent                                       | Additional content on the left side of the tab bar (such as action buttons) |
| tabBarExtraContent | Additional content on the right side of the tab bar (such as action buttons) |


##### oio-tab

**Props**

| **Parameter Name** | **Type** | **Default Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| key | string | `required`          | Unique panel identifier (required, needs to correspond to the panel key of the parent component `OioTabs`<br/>) |
| tab | string   | VNode                                                 | - |
| forceRender | boolean | - | Whether to force render the panel (even if inactive) |
| layout | `FormLayout`        | - | Form layout configuration |
| invisible | boolean | - | Whether to hide the panel (cooperates with the hide logic of the parent component `OioTabs`) |
| disabled | boolean | - | Whether to disable the panel (disabled tabs cannot be clicked, and content cannot be interacted with) |
| componentData | Record<string, unknown> | - | Third-party extension attributes (passed through to the underlying component) |


**Slots**

| **Slot Name** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | Panel content |
| tab | Custom tab content |


### Tooltip Tooltip

#### Basic Usage

``` vue
<template>
  <oio-tooltip title="This is the tooltip content">hover trigger</oio-tooltip>
</template>
```

#### Click Trigger

``` vue
<template>
  <oio-tooltip title="This is the tooltip content" trigger="click">click trigger</oio-tooltip>
</template>
```

#### Tooltip on the Right

``` vue
<template>
  <oio-tooltip title="This is the tooltip content" placement="rm">hover trigger</oio-tooltip>
</template>
```

#### **API**

**Props**

| **Parameter Name** | **Type** | **Default Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| visible | boolean | `undefined`         | Whether to display the tooltip (two-way binding, invalid when `disabled` is `true`) |
| title | string | - | Tooltip content (supports strings, or custom through the `title`<br/> slot) |
| trigger | `PopperTrigger`     | `'hover'`           | Trigger method, optional values: `hover` (hover), `click` (click), `focus` (focus), `manual` (manual), `contextmenu` (right-click) |
| placement | `OioTooltipPlacement` | `'bm'` (bottom middle) | Tooltip position, optional values see enum `OioTooltipPlacement` |
| destroyOnHide | boolean | `true`              | Whether to destroy the tooltip DOM node when hidden |
| disabled | boolean | `false`             | Whether to disable the tooltip (cannot be triggered to display when disabled) |
| overlayClassName | string | - | Class name of the tooltip overlay |
| overlayStyle | string   | CSSStyle                                              | - |
| getTriggerContainer | (triggerNode: HTMLElement) => HTMLElement | - | Tooltip container mounting point (default mounted to `body`<br/>, can specify a parent container) |


**Events**

| **Event Name** | **Parameter Type** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:visible | boolean | Triggered when the display status changes (two-way binding) |


**Slots**

| **Slot Name** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | Content that triggers the tooltip (such as a button) |
| title | Custom tooltip content (supports HTML) |


### Tree Tree Control

#### Basic Usage

``` vue
<template>
  <oio-tree :data="treeData" />
</template>
<script lang="ts">
import { OioTree, OioTreeNode, TreeNodeSelectedEvent } from '@oinone/kunlun-vue-ui-antd';
import { defineComponent, ref } from 'vue';

interface DataItem {
  key: string;
  title: string;
  children?: DataItem[];
}

const convert = (data: DataItem[]): OioTreeNode<DataItem>[] => {
  return data.map((item) => {
    return {
      key: item.key,
      value: item,
      title: item.title,
      isLeaf: !item.children?.length,
      children: (item.children && convert(item.children)) || []
    } as OioTreeNode<DataItem>;
  });
};

export default defineComponent({
  components: {
    OioTree
  },
  props: {},
  setup(props) {
    const treeData = ref<OioTreeNode<DataItem>[]>(
      convert([
        {
          key: '1',
          title: 'a',
          children: [
            {
              key: '1-1',
              title: 'a-1'
            },
            {
              key: '1-2',
              title: 'a-2'
            }
          ]
        },
        {
          key: '2',
          title: 'b'
        }
      ])
    );

    return {
      treeData
    };
  }
});
</script>
```

#### Only Apply Oinone Theme Style

``` vue
<template>
  <a-tree class="oio-tree" :tree-data="treeData" />
</template>
```

For more usage methods, please refer to: [Antd Tree Tree Control For Vue](https://3x.antdv.com/components/tree-cn)

#### API

**Props**

| **Parameter Name** | **Type** | **Default Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| loading | boolean | `undefined`         | Whether to display the loading state (`true` displays loading animation) |
| wrapperClassName | string   | `string[]`                                             | - |
| data | OioTreeNode[] | - | Tree structure data |
| loadData | (node: OioTreeNode) => Promise<`void`> | - | Lazy loading data function (dynamic data, choose one with `data`<br/>) |
| loadedKeys | `string[]`| - | Keys of loaded nodes (maintained internally, supports two-way binding) |
| selectable | boolean | `undefined`         | Whether to allow node selection |
| selectedKeys | `string[]`| - | Keys of selected nodes (supports two-way binding) |
| expandedKeys | `string[]`| - | Keys of expanded nodes (supports two-way binding) |
| checkable | boolean | `undefined`         | Whether to enable the check function |
| checkedKeys | `string[]`| { checked: string[]; halfChecked: `string[]`}          | - |
| checkStrictly | boolean | `undefined`         | Whether to strictly follow the parent-child node association (whether to automatically uncheck child nodes when unchecking a parent node) |
| blockNode | boolean | `undefined`         | Whether to display as a block-level node (occupies the entire line) |
| showIcon | boolean | `undefined`         | Whether to display node icons |
| showLine | boolean | `undefined`         | Whether to display node connection lines |


**Events**

| **Event Name** | **Parameter Type** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:expandedKeys | `string[]`| Triggered when expanded nodes change (two-way binding) |
| update:selectedKeys | `string[]`| Triggered when selected nodes change (two-way binding) |
| update:checkedKeys | `string[]`| { checked: string[]; halfChecked: `string[]`}          |
| update:loadedKeys | `string[]`| Triggered when loaded nodes change (internal use) |
| selected | `TreeNodeSelectedEvent`                                      | Triggered when a node is selected / deselected |
| expanded | `TreeNodeExpandedEvent`                                      | Triggered when a node is expanded / collapsed |
| checked | `TreeNodeCheckedEvent`                                       | Triggered when a node's check status changes |


**Slots**

| **Slot Name** | **Parameters** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| title | `{ node: OioTreeNode }` | Custom node title |
| icon | `{ node: OioTreeNode }` | Custom node icon |
| switcherIcon | `{ node: OioTreeNode }` | Custom expand / collapse icon |


## (VI) Feedback

### Drawer Drawer

#### Basic Usage

``` vue
<template>
  <oio-button @click="showDrawer">Open Drawer</oio-button>
  <oio-drawer v-model:visible="visible" title="Basic Usage">
    <p>This is some content...</p>
    <p>This is some content...</p>
    <p>This is some content...</p>
  </oio-drawer>
</template>
<script lang="ts">
import { OioButton, OioDrawer } from '@oinone/kunlun-vue-ui-antd';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: {
    OioButton,
    OioDrawer
  },
  props: {},
  setup(props) {
    const visible = ref(false);

    const showDrawer = () => {
      visible.value = true;
    };

    return {
      visible,
      showDrawer
    };
  }
});
</script>
```

#### Add Help Copy

``` vue
<template>
  <oio-button @click="showDrawer">Open Drawer</oio-button>
  <oio-drawer v-model:visible="visible" title="Basic Usage" help="This is the simplest drawer">
    <p>This is some content...</p>
    <p>This is some content...</p>
    <p>This is some content...</p>
  </oio-drawer>
</template>
```

#### Add Some Action Buttons

``` vue
<template>
  <oio-button @click="showDrawer">Open Drawer</oio-button>
  <oio-drawer v-model:visible="visible" title="Basic Usage">
    <p>This is some content...</p>
    <p>This is some content...</p>
    <p>This is some content...</p>
    <template #footer>
      <oio-button type="primary">Confirm</oio-button>
      <oio-button>Cancel</oio-button>
    </template>
  </oio-drawer>
</template>
```

#### Drawer Close Callback

``` vue
<template>
  <oio-button @click="showDrawer">Open Drawer</oio-button>
  <oio-drawer v-model:visible="visible" title="Close Callback" :cancel-callback="cancelCallback">
    <p>This is some content...</p>
    <p>This is some content...</p>
    <p>This is some content...</p>
  </oio-drawer>
</template>
<script lang="ts">
import { OioButton, OioDrawer } from '@oinone/kunlun-vue-ui-antd';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: {
    OioButton,
    OioDrawer
  },
  props: {},
  setup(props) {
    const visible = ref(false);

    const showDrawer = () => {
      visible.value = true;
    };

    const cancelCallback = (): boolean => {
      console.log('drawer closed.');
      // Return true to close the drawer, otherwise do not close
      return true;
    };

    return {
      visible,
      showDrawer,
      cancelCallback
    };
  }
});
</script>
```

#### **API**

**Props**

| **Parameter Name** | **Type** | **Default Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| zIndex | number | `1000`              | Drawer stacking order (CSS z-index) |
| wrapperClassName | string   | `string[]`                                             | - |
| wrapperProps | object | - | Outer container attributes (passed through to DOM nodes) |
| mask | boolean | `undefined`         | Whether to display the mask layer |
| maskClosable | boolean | `undefined`         | Whether clicking the mask can close the drawer |
| title | string | `'Drawer'`            | Drawer title |
| help | string | - | Help prompt content on the right side of the title |
| placement | `DrawerPlacement`<br/>  | keyof typeof DrawerPlacement                          | `'right'`           |
| width | number   | string                                                       |  `DrawerWidth` |
| height | number   | string                                                       |  `DrawerHeight` |
| headerInvisible | boolean | `undefined`         | Whether to hide the header area |
| footerInvisible | boolean | `undefined`         | Whether to hide the footer area |
| visible | boolean | `undefined`         | Whether to display the drawer (two-way binding) |
| closable | boolean | `undefined`         | Whether to display the close icon |
| keyboard | boolean | `undefined`         | Whether to support closing with the ESC key |
| destroyOnClose | boolean | `true`              | Whether to destroy internal elements when closing |
| getTriggerContainer | (triggerNode: Node | HTMLElement) => Node                                         | HTMLElement                                           |
| cancelCallback | (event: PointerEvent, data: object) => Promise<boolean | void>                                                 | - |
| loading | boolean | `false`             | Whether to display the global loading state |

**Events**

| **Event Name** | **Parameter Type** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:visible | boolean | Triggered when the visibility status changes (two-way binding) |


**Slots**

| **Slot Name** | **Parameters** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | `{ data: object }`  | Drawer content area |
| title | - | Custom title content |
| header | - | Custom header area (higher priority than the `title` slot) |
| footer | - | Custom footer area |
| closeIcon | - | Custom close icon |


### Message Global Prompt

#### Basic Usage

``` vue
<template>
  <oio-button @click="openMessage">Open Message Prompt</oio-button>
</template>
<script lang="ts">
import { OioButton, OioMessage } from '@oinone/kunlun-vue-ui-antd';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    OioButton
  },
  props: {},
  setup(props) {
    const openMessage = () => {
      OioMessage.info('This is the message prompt content', {
        onClose: () => {
          console.log('Message closed.');
        }
      });
    };

    return {
      openMessage
    };
  }
});
</script>
```

For more usage methods, please refer to: [Antd Message Global Prompt For Vue](https://3x.antdv.com/components/message-cn)

#### API

##### OioMessage

| **Method Name** | **Parameter List** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| open | `(type: NotificationType, message: string, options?: OioNotificationOptions) => void` | General opening method, displays corresponding messages according to types |
| info | `(message: string, options?: OioNotificationOptions) => void` | Displays prompt-type messages |
| success | `(message: string, options?: OioNotificationOptions) => void` | Displays success-type messages |
| warning | `(message: string, options?: OioNotificationOptions) => void` | Displays warning-type messages |
| error | `(message: string, options?: OioNotificationOptions) => void` | Displays error-type messages |


##### OioNotificationOptions

| **Parameter Name** | **Type** | **Default Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| duration | number | `3`                 | Notification display duration (seconds), `0` <br/> for permanent display |
| class | string | - | Custom notification class name (base class name will be added automatically) |
| ... | ... | ... | Other third-party parameters |


### Modal Dialog Box

#### Basic Usage

``` vue
<template>
  <oio-button @click="showModal">Open Popup</oio-button>
  <oio-modal v-model:visible="visible" title="Basic Usage">
    <p>This is some content...</p>
    <p>This is some content...</p>
    <p>This is some content...</p>
  </oio-modal>
</template>
<script lang="ts">
import { OioButton, OioModal } from '@oinone/kunlun-vue-ui-antd';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: {
    OioButton,
    OioModal
  },
  props: {},
  setup(props) {
    const visible = ref(false);

    const showModal = () => {
      visible.value = true;
    };

    return {
      visible,
      showModal
    };
  }
});
</script>
```

#### Adding Help Copy

``` vue
<template>
  <oio-button @click="showModal">Open Popup</oio-button>
  <oio-modal v-model:visible="visible" title="Basic Usage" help="This is the simplest popup">
    <p>This is some content...</p>
    <p>This is some content...</p>
    <p>This is some content...</p>
  </oio-modal>
</template>
```

#### Popup Close Callback

``` vue
<template>
  <oio-button @click="showModal">Open Popup</oio-button>
  <oio-modal
    v-model:visible="visible"
    title="Close Callback"
    :enter-callback="enterCallback"
    :cancel-callback="cancelCallback"
  >
    <p>This is some content...</p>
    <p>This is some content...</p>
    <p>This is some content...</p>
  </oio-modal>
</template>
<script lang="ts">
import { OioButton, OioModal } from '@oinone/kunlun-vue-ui-antd';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: {
    OioButton,
    OioModal
  },
  props: {},
  setup(props) {
    const visible = ref(false);

    const showModal = () => {
      visible.value = true;
    };

    const enterCallback = (): boolean => {
      console.log('modal closed by enter button.');
      // Return true to close the popup, otherwise do not close
      return true;
    };

    const cancelCallback = (): boolean => {
      console.log('modal closed by cancel button.');
      // Return true to close the popup, otherwise do not close
      return true;
    };

    return {
      visible,
      showModal,
      enterCallback,
      cancelCallback
    };
  }
});
</script>
```

#### Rendering Forms and Data回填 (Data回填 should be "Data Backfill")

``` vue
<template>
  <oio-button @click="showModal">Open Popup</oio-button>
  <oio-modal
    v-model:visible="visible"
    title="Render Form"
    :data="formData"
    :enter-callback="enterCallback"
    :cancel-callback="cancelCallback"
  >
    <template #default="{ data }">
      <oio-form :data="data" layout="vertical">
        <oio-form-item label="Name">
          <oio-input v-model:value="data.name" />
        </oio-form-item>
        <oio-form-item label="Description">
          <oio-textarea v-model:value="data.description" />
        </oio-form-item>
      </oio-form>
    </template>
  </oio-modal>
</template>
<script lang="ts">
import { OioButton, OioForm, OioFormItem, OioInput, OioModal, OioTextarea } from '@oinone/kunlun-vue-ui-antd';
import { defineComponent, ref } from 'vue';

interface DataType {
  name: string;
  description: string;
}

export default defineComponent({
  components: {
    OioButton,
    OioForm,
    OioFormItem,
    OioInput,
    OioModal,
    OioTextarea
  },
  props: {},
  setup(props) {
    const visible = ref(false);

    const showModal = () => {
      visible.value = true;
    };

    const formData = ref<DataType>({
      name: 'Name',
      description: ''
    });

    const enterCallback = (e: PointerEvent, data: DataType): boolean => {
      // Save the current form data
      formData.value = data;
      console.log('modal closed by enter button.', data);
      // Return true to close the popup, otherwise do not close
      return true;
    };

    const cancelCallback = (e: PointerEvent, data: DataType): boolean => {
      console.log('modal closed by cancel button.', data);
      // Return true to close the popup, otherwise do not close
      return true;
    };

    return {
      visible,
      showModal,
      formData,
      enterCallback,
      cancelCallback
    };
  }
});
</script>
```

#### **API Definition**

**Props**

| **Parameter Name** | **Type** | **Default Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| zIndex | number | `1000`              | Modal dialog stacking order (CSS z-index) |
| wrapperClassName | string   | `string[]`                                             | - |
| wrapperProps | object | - | Outer container properties (passed through to DOM nodes) |
| mask | boolean | `undefined`         | Whether to display the mask layer |
| maskClosable | boolean | `undefined`         | Whether clicking the mask can close the modal dialog |
| title | string | `'Dialog Box'`          | Modal dialog title |
| help | string | - | Help prompt content on the right side of the title |
| width | number   | string                                                       |  `ModalWidthType` |
| height | number   | string                                                       |  `ModalWidthType` |
| headerInvisible | boolean | `undefined`         | Whether to hide the header area |
| footerInvisible | boolean | `undefined`         | Whether to hide the footer area |
| visible | boolean | `undefined`         | Whether to display the modal dialog (two-way binding) |
| closable | boolean | `undefined`         | Whether to display the close icon |
| keyboard | boolean | `undefined`         | Whether to support closing with the ESC key |
| destroyOnClose | boolean | `undefined`         | Whether to destroy internal elements when closing |
| getTriggerContainer | (triggerNode: Node | HTMLElement) => Node                                         | HTMLElement                                           |
| enterCallback | (event: PointerEvent, data: object) => Promise<boolean | void>                                                 | - |
| cancelCallback | (event: PointerEvent, data: object) => Promise<boolean | void>                                                 | - |
| loading | boolean | `undefined`         | Whether to display the global loading state |
| confirmLoading | boolean | `undefined`         | Confirm button loading state |
| draggable | boolean | `false`             | Whether to support dragging the modal dialog |
| enterText | string | `'Confirm'`            | Confirm button text |
| cancelText | string | `'Cancel'`            | Cancel button text |
| data | object | `{}`                | Custom data passed to the slot |
| copy | boolean | `true`              | Whether to deeply copy data (takes effect when `deep` is `true`) |
| deep | boolean | `false`             | Whether to deeply listen for data changes |


**Events**

| **Event Name** | **Parameter Type** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:visible | boolean | Triggered when the visibility status changes (two-way binding) |


**Slots**

| **Slot Name** | **Parameters** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | `{ data: object }`  | Modal dialog content area |
| title | - | Custom title content |
| header | - | Custom header area (higher priority than the `title` slot) |
| footer | - | Custom footer area |
| closeIcon | - | Custom close icon |


### Notification Reminder Box

#### Basic Usage

``` vue
<template>
  <oio-button @click="openNotification">Open Notification</oio-button>
</template>
<script lang="ts">
import { OioButton, OioNotification } from '@oinone/kunlun-vue-ui-antd';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    OioButton
  },
  props: {},
  setup(props) {
    const openNotification = () => {
      OioNotification.info('Title', 'This is the notification message content', {
        onClick: () => {
          console.log('Notification clicked.');
        },
        onClose: () => {
          console.log('Notification closed.');
        }
      });
    };

    return {
      openNotification
    };
  }
});
</script>
```

For more usage methods, please refer to: [Antd Notification Reminder Box For Vue](https://3x.antdv.com/components/notification-cn)

#### API

##### OioNotification

| **Method Name** | **Parameter List** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| open | `(type: NotificationType, title: string, message?: string, options?: OioNotificationOptions) => void` | General opening method, displays notifications with titles |
| info | `(title: string, message?: string, options?: OioNotificationOptions) => void` | Displays prompt-type notifications |
| success | `(title: string, message?: string, options?: OioNotificationOptions) => void` | Displays success-type notifications |
| warning | `(title: string, message?: string, options?: OioNotificationOptions) => void` | Displays warning-type notifications |
| error | `(title: string, message?: string, options?: OioNotificationOptions) => void` | Displays error-type notifications |


##### OioNotificationOptions

| **Parameter Name** | **Type** | **Default Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| duration | number | `3`                 | Notification display duration (seconds), `0` <br/> for permanent display |
| class | string | - | Custom notification class name (base class name will be added automatically) |
| ... | ... | ... | Other third-party parameters |


### Popconfirm Bubble Confirmation Box

#### Basic Usage

``` vue
<template>
  <oio-popconfirm text="Are you sure you want to delete this?" :confirm-callback="confirmCallback" :cancel-callback="cancelCallback">
    <oio-button type="primary" biz-style="danger">Delete</oio-button>
  </oio-popconfirm>
</template>
<script lang="ts">
import { OioButton, OioPopconfirm } from '@oinone/kunlun-vue-ui-antd';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    OioButton,
    OioPopconfirm
  },
  props: {},
  setup(props) {
    const confirmCallback = (): void => {
      console.log('confirm callback.');
    };

    const cancelCallback = (): void => {
      console.log('cancel callback.');
    };

    return {
      confirmCallback,
      cancelCallback
    };
  }
});
</script>
```

#### Conditional Triggering

``` vue
<template>
  <oio-popconfirm
    text="Are you sure you want to delete this?"
    :condition="condition"
    :confirm-callback="confirmCallback"
    :cancel-callback="cancelCallback"
  >
    <oio-button type="primary" biz-style="danger">Delete</oio-button>
  </oio-popconfirm>
</template>
<script lang="ts">
import { OioButton, OioPopconfirm } from '@oinone/kunlun-vue-ui-antd';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    OioButton,
    OioPopconfirm
  },
  props: {},
  setup(props) {
    let num = 1;
    const condition = (): boolean => {
      const res = num++ % 2 === 0;
      if (res) {
        console.log('confirm execution.');
      } else {
        console.log('execution.');
      }
      return res;
    };

    const confirmCallback = (): void => {
      console.log('confirm callback.');
    };

    const cancelCallback = (): void => {
      console.log('cancel callback.');
    };

    return {
      condition,
      confirmCallback,
      cancelCallback
    };
  }
});
</script>
```

#### **API**

**Props**

| **Parameter Name** | **Type** | **Default Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| visible | boolean | `undefined`         | Whether to display the popup (two-way binding, needs manual control when `manual` is `true`) |
| manual | boolean | `false`             | Whether to enable manual control mode (`true` means `visible` changes will not automatically show/hide) |
| destroyOnClose | boolean | `undefined`         | Whether to destroy the popup DOM node when closing |
| title | string | `'Warning'`            | Popup title |
| text | string | `'Are you sure you want to perform this operation?'` | Popup prompt text |
| overlayClassName | string | - | Class name of the popup overlay |
| placement | `PopconfirmPlacement` | `'tm'`                                                       | Popup position (enumeration values see above description, default top middle) |
| enterText | string | `'Confirm'`            | Confirm button text |
| cancelText | string | `'Cancel'`            | Cancel button text |
| condition | boolean  | () => boolean                                                | Promise<`boolean`>                                      |
| confirmCallback | () => void | - | Confirm button click callback |
| cancelCallback | () => void | - | Cancel button click callback |
| getTriggerContainer | (triggerNode: Node | HTMLElement) => Node                                         | HTMLElement                                           |


**Events**

| **Event Name** | **Parameter Type** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:visible | boolean | Triggered when the visibility status changes (two-way binding) |


**Slots**

| **Slot Name** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | Content that triggers the popup (such as a button) |
| title | Custom title content |
| icon | Custom icon on the left side of the title |


### Spin Loading

#### Basic Usage

``` vue
<template>
  <oio-spin />
</template>
```

#### Masking Any Element

``` vue
<template>
  <oio-spin>
    <div style="width: 300px; height: 300px">
      <h4>Title</h4>
      <p>This is a paragraph of content</p>
    </div>
  </oio-spin>
</template>
```

#### Various Sizes

``` vue
<template>
  <oio-spin size="small" />
  <oio-spin />
  <oio-spin size="large" />
</template>
```

#### Placing in a Container

``` vue
<template>
  <div style="padding: 30px 50px; background-color: rgba(0, 0, 0, 0.05); text-align: center">
    <oio-spin />
  </div>
</template>
```

#### Manually Controlling the Loading State

``` vue
<template>
  <div>
    <span>Loading status:</span>
    <oio-switch v-model:checked="loading" />
  </div>
  <oio-spin :loading="loading">
    <div style="width: 300px; height: 300px">
      <h4>Title</h4>
      <p>This is a paragraph of content</p>
    </div>
  </oio-spin>
</template>
```

#### **API**

**Props**

| **Parameter Name** | **Type** | **Default Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| loading | boolean | `undefined`         | Whether to display the loading state (`undefined` <br/> means display by default) |
| loadingIndicator | VNode | - | Custom loading icon (needs to pass a virtual node, such as `<LoadingOutlined />` <br/>) |
| wrapperClassName | string   | `string[]`                                             | - |
| size | `SpinSize`<br/>  | keyof typeof SpinSize                                        | number                                                |
| delay | number | - | Delay display time (milliseconds, displays the loading icon after `loading` <br/> is `true` <br/> for the specified time) |
| tip | string   | Slot                                                  | - |


**Slots**

| **Slot Name** | **Description** | **Parameters** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | Custom loading content | - |
| tip | Custom prompt text content | - |