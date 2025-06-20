---
title: Vue UI El
index: true
category:
  - R&D Manual
  - Reference
  - Oio Components
order: 2

---
# 1. Reference List

## (1) Data Display

### ColorPicker Color Picker

#### Basic Usage

```vue
<template>
  <oio-color-picker v-model:value="value" />
</template>
```

#### Color Picker with Input Box

```vue
<template>
  <oio-color-picker v-model:value="value" has-input />
  <oio-color-picker v-model:value="value" has-input input-placement="prepend" />
</template>
```

#### Only Apply Oinone Theme Style

```vue
<template>
  <!-- Basic usage -->
  <div class="oio-color-picker">
    <el-color-picker popper-class="oio-color-picker-popper" v-model="value" />
  </div>
  <!-- Color picker with input box -->
  <div class="oio-color-picker">
    <el-input v-model="value" readonly>
      <template #append>
        <div class="oio-color-picker-inner">
          <el-color-picker popper-class="oio-color-picker-popper" v-model="value" />
        </div>
      </template>
    </el-input>
  </div>
</template>
```

For more usage methods, please refer to: [Element Plus ColorPicker Color Picker For Vue](https://cn.element-plus.org/en/component/color-picker.html)

#### **API**

**Props**

| **Parameter Name** | **Type** | **Default Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| value | string | - | Bound color value (two-way binding) |
| defaultValue | string | - | Initial color value |
| readonly | boolean | `false`             | Whether it is in read-only mode (prohibits color selection) |
| disabled | boolean | `false`             | Whether to disable the component |
| colorFormat | `ColorFormat`       | `ColorFormat.RGB`   | Color format (enum value or string, such as `'hex'`, `'hsl'`) |
| predefine | string[] | `DEFAULT_PREDEFINE` | Preset color list (supports RGB/HEX formats, automatically deduplicates and handles transparency) |
| showAlpha | boolean | `true`              | Whether to display the alpha adjustment slider |
| hasInput | boolean | `false`             | Whether to display the input box |
| inputPlacement | `ColorInputPlacement` | `ColorInputPlacement.BEFORE` | Input box position (enum value, controls before or after the color picker) |
| inputPlaceholder | string | `'Please select a color'`      | Input box placeholder text |
| inputReadonly | boolean | `true`              | Whether the input box is read-only (takes effect when `hasInput: true`) |
| disabledLastedColor | boolean | `false`             | Whether to disable the recently used colors function |
| lastedColorCount | number | 4                                                            | Number of recently used colors |


**Events**

| **Event Name** | **Parameter Type** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:value | string | Triggered when the color value changes (two-way binding) |
| change | string | Triggered when color selection is completed |