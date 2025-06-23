---
title: Vue UI El
index: true
category:
  - 研发手册
  - Reference
  - Oio 组件
order: 2

---

在 Oinone Kunlun 中，有一部分组件是基于第三方组件库 “[Element Plus](https://cn.element-plus.org/zh-CN/component/overview.html)” 实现的。这些组件不仅可以用于 Widget 组件，也可以直接通过 Vue 原生写法用于任何一个 Vue 组件。这篇文章将详细介绍这些组件的用法及 API 定义。

# 一、引入

``` typescript
import { OioColorPicker } from '@oinone/kunlun-vue-ui-el';
```

# 二、Reference List

## （一）数据展示

### ColorPicker 取色器

#### 基础用法

``` vue
<template>
  <oio-color-picker v-model:value="value" />
</template>
```

#### 带输入框的取色器

``` vue
<template>
  <oio-color-picker v-model:value="value" has-input />
  <oio-color-picker v-model:value="value" has-input input-placement="prepend" />
</template>
```

#### 仅应用 Oinone 主题样式

``` vue
<template>
  <!-- 基础用法 -->
  <div class="oio-color-picker">
    <el-color-picker popper-class="oio-color-picker-popper" v-model="value" />
  </div>
  <!-- 带输入框的取色器 -->
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

更多使用方式，可参考：[Element Plus ColorPicker 取色器 For Vue](https://cn.element-plus.org/zh-CN/component/color-picker.html)

#### **API**

**Props**

| **参数名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| value | string | - | 绑定的颜色值（双向绑定） |
| defaultValue | string | - | 初始颜色值 |
| readonly | boolean | `false`             | 是否为只读模式（禁止选择颜色） |
| disabled | boolean | `false`             | 是否禁用组件 |
| colorFormat | `ColorFormat`       | `ColorFormat.RGB`   | 颜色格式（枚举值或字符串，如 `'hex'`、`'hsl'`） |
| predefine | string[] | `DEFAULT_PREDEFINE` | 预设颜色列表（支持 RGB/HEX 格式，自动去重并处理透明度） |
| showAlpha | boolean | `true`              | 是否显示透明度调节滑块 |
| hasInput | boolean | `false`             | 是否显示输入框 |
| inputPlacement | `ColorInputPlacement` | `ColorInputPlacement.BEFORE` | 输入框位置（枚举值，控制在颜色选择器前或后） |
| inputPlaceholder | string | `'请选择颜色'`      | 输入框占位文本 |
| inputReadonly | boolean | `true`              | 输入框是否为只读（`hasInput: true` 时生效） |
| disabledLastedColor | boolean | `false`             | 是否禁用最近使用颜色功能 |
| lastedColorCount | number | 4                                                            | 最近使用颜色数量 |


**Events**

| **事件名** | **参数类型** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:value | string | 颜色值变化时触发（双向绑定） |
| change | string | 颜色选择完成时触发 |

