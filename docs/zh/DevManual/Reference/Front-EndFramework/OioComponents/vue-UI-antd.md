---
title: Vue UI Antd
index: true
category:
  - 研发手册
  - Reference
  - Oio 组件
order: 1
prev:
  text: Gallery Field
  link: /zh/DevManual/Reference/Front-EndFramework/Widget/Field/gallery-field.md
---

在 Oinone Kunlun 中，大部分组件都是基于第三方组件库 “[Ant Design Vue](https://3x.antdv.com/components/overview-cn)” 实现的。这些组件不仅可以用于 Widget 组件，也可以直接通过 Vue 原生写法用于任何一个 Vue 组件。这篇文章将详细介绍这些组件的用法及 API 定义。

# 一、引入

``` typescript
import { OioButton } from '@oinone/kunlun-vue-ui-antd';
```

# 二、Reference List

## （一）通用

### Button 按钮

#### 基础用法

``` vue
<template>
  <oio-button>默认按钮</oio-button>
  <oio-button type="primary">主按钮</oio-button>
  <oio-button type="ghost">幽灵按钮</oio-button>
  <oio-button type="link">链接按钮</oio-button>
  <oio-button type="text">文字按钮</oio-button>
</template>
```

#### 带图标按钮

``` vue
<template>
  <oio-button icon="oinone-sousuo" icon-placement="before">搜索</oio-button>
  <oio-button icon="oinone-xiazai2" icon-placement="after">下载</oio-button>
  <oio-button icon="oinone-bianji4" type="primary">编辑</oio-button>
</template>
```

#### 业务场景按钮

``` vue
<template>
  <oio-button biz-style="success">成功按钮</oio-button>
  <oio-button biz-style="warning">警告按钮</oio-button>
  <oio-button biz-style="danger">危险按钮</oio-button>
  <oio-button biz-style="info">信息按钮</oio-button>

  <oio-button type="primary" biz-style="success">成功按钮</oio-button>
  <oio-button type="primary" biz-style="warning">警告按钮</oio-button>
  <oio-button type="primary" biz-style="danger">危险按钮</oio-button>
  <oio-button type="primary" biz-style="info">信息按钮</oio-button>
</template>
```

#### 加载状态与选中状态

``` vue
<template>
  <oio-button async @click="onSubmit1">内置加载状态</oio-button>
  <oio-button :loading="loading" @click="onSubmit2">带loading参数控制加载状态</oio-button>
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

| **属性名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| type | `ButtonType`（`default`/`primary`/`ghost`/`link`/`text`） | `default`           | 按钮类型 |
| bizStyle | `ButtonBizStyle`（`default`/`success`/`warning`/`danger`/`info`） | `default`           | 业务场景样式 |
| htmlType | string | `button`            | 原生 HTML 类型（如 `submit`/`reset`） |
| size | `ButtonSize`（`large`/`middle`/`small`） | `middle`            | 按钮尺寸 |
| block | boolean | `false`             | 是否为块级按钮（占满父容器宽度） |
| ghost | boolean | `false`             | 是否为幽灵按钮（透明背景） |
| danger | boolean | `false`             | 是否为危险按钮（红色警示） |
| href | string | - | 链接地址（转为 `<a>` 标签，优先级高于 `onClick`） |
| target | string | `_self`             | 链接打开方式（如 `_blank`/`_parent`） |
| async | boolean | `false`             | 是否开启异步模式（自动处理加载状态） |
| loading | boolean | `undefined`         | 加载状态（`true` 显示加载图标，`undefined` 时使用内部状态） |
| disabled | boolean | `undefined`         | 禁用状态 |
| icon | string | - | 图标名称（如 `search`/`download`，需配合 `OioIcon` 组件） |
| iconPlacement | `IconPlacement`（`before`/`after`） | `before`            | 图标位置（前置 / 后置） |
| selected | boolean | `undefined`         | 选中状态（仅 `type="link"` 时有效） |


**Events**

| **事件名** | **参数** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:loading | loading: boolean | 加载状态变化时触发（双向绑定用） |
| update:selected | selected: boolean | 选中状态变化时触发（双向绑定用） |
| click | event: MouseEvent | 点击事件（`async` 模式下异步操作完成后自动关闭加载状态） |


**Slots**

| **插槽名** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | 按钮主体内容 |
| icon | 自定义图标（优先级高于 `icon`<br/> prop） |


## （二）布局

### Divider 分割线

#### 基础用法

``` vue
<template>
  <!-- 水平分割线 -->
  <oio-divider />
  <!-- 带文字的水平分割线（居中） -->
  <oio-divider>主要内容</oio-divider>
</template>
```

#### 虚线分割线

``` vue
<template>
  <oio-divider dashed />
  <oio-divider dashed>虚线样式</oio-divider>
</template>
```

#### 文字居左 / 居右分割线

``` vue
<template>
  <oio-divider orientation="left">左侧标题</oio-divider>
  <oio-divider orientation="right">右侧说明</oio-divider>
</template>
```

#### 垂直分割线

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

| **属性名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| type | `DividerType`（`horizontal` | `vertical`） | `horizontal`        |
| dashed | boolean | `false`             | 是否为虚线样式 |
| plain | boolean | `false`             | 是否为简洁样式（文字无背景） |
| orientation | `DividerOrientation`（`center` | `left` | `right`） |


**Slots**

| **插槽名** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | 分割线中间的文字或自定义内容（如图标、组件等） |


### Grid 栅格

#### 基础用法

``` vue
<template>
  <oio-row>
    <oio-col :span="8">Column 1</oio-col>
    <oio-col :span="8">Column 2</oio-col>
    <oio-col :span="8">Column 3</oio-col>
  </oio-row>
</template>
```

#### 带间距的布局

``` vue
<template>
  <oio-row :gutter="16">
    <oio-col :span="8">Gutter 16</oio-col>
    <oio-col :span="8">Gutter 16</oio-col>
    <oio-col :span="8">Gutter 16</oio-col>
  </oio-row>
</template>
```

#### 换行布局

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

| **属性名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| gutter | `CommonGutterType`（number | string                                                       | array                                                        |
| align | `FlexRowAlign`（`top`/`middle`/`bottom`/`baseline`/`stretch`） | - | 侧轴对齐方式（垂直方向） |
| justify | `FlexRowJustify`（`start`/`end`/`center`/`space-between`/`space-around`） | - | 主轴对齐方式（水平方向） |
| wrap | boolean | false | 是否允许列换行 |


**Slots**

| **插槽名** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | 行内容，包含栅格列组件 |


##### oio-col

**Props**

| **属性名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| flex | string   | number                                                | - |
| offset | number | - | 列偏移的栅格数 |
| order | number | - | 列的排序顺序 |
| pull | number | - | 列向左拉动的栅格数 |
| push | number | - | 列向右推动的栅格数 |
| span | number | - | 列占据的栅格数（1-24） |
| xs | number   | object                                                | - |
| sm | number   | object                                                | - |
| md | number   | object                                                | - |
| lg | number   | object                                                | - |
| xl | number   | object                                                | - |
| xxl | number   | object                                                | - |
| fixed | boolean | false | 是否为固定列，添加特殊样式类 |


**Slots**

| **插槽名** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | 列内容 |


### Block 块级元素

#### 基础布局

``` vue
<template>
  <oio-block>
    <div>这是一段内容</div>
  </oio-block>
</template>
```

#### 行内布局

``` vue
<template>
  <oio-block>
    <oio-block inline>Inline Item 1</oio-block>
    <oio-block inline>Inline Item 2</oio-block>
  </oio-block>
</template>
```

#### 弹性布局（行方向）

``` vue
<template>
  <oio-block flex>
    <div>Item 1</div>
    <div>Item 2</div>
  </oio-block>
</template>
```

#### 弹性布局（列方向）

``` vue
<template>
  <oio-block flex flex-direction="column">
    <div>Item 1</div>
    <div>Item 2</div>
  </oio-block>
</template>
```

#### 带间距的弹性布局

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

| **属性名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| inline | boolean | false | 是否为行内元素（`inline-block` 或 `inline-flex`） |
| flex | boolean | false | 是否开启弹性布局（`display: flex`） |
| flexDirection | `FlexDirection`（`Row`/`RowReverse`/`Column`/`ColumnReverse`） | `FlexDirection.Row` | 弹性容器的主轴方向 |
| gutter | string   | number                                                       | `StandardGutterType`（`[number, number]`） |


## （三）导航

### Breadcrumb 面包屑

#### 基础用法

``` vue
<template>
  <oio-breadcrumb>
    <oio-breadcrumb-item>首页</oio-breadcrumb-item>
    <oio-breadcrumb-item>分类</oio-breadcrumb-item>
    <oio-breadcrumb-item>商品详情</oio-breadcrumb-item>
  </oio-breadcrumb>
</template>
```

#### 自定义分隔符

``` vue
<template>
  <oio-breadcrumb separator=">">
    <oio-breadcrumb-item>首页</oio-breadcrumb-item>
    <oio-breadcrumb-item>分类</oio-breadcrumb-item>
    <oio-breadcrumb-item>商品详情</oio-breadcrumb-item>
  </oio-breadcrumb>
</template>
```

#### API

##### oio-breadcrumb

**Props**

| **属性名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| separator | string | '/' | 全局分隔符 |


**Slots**

| **插槽名** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | 面包屑导航内容 |
| separator | 自定义分隔符（优先级高于 props） |
| itemRender | 自定义列表项渲染 |


##### oio-breadcrumb-item

**Props**

| **属性名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| separator | string | '/' | 单个列表项分隔符（优先级高于父组件） |


**Slots**

| **插槽名** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | 列表项内容 |
| separator | 自定义当前项分隔符 |
| overlay | 列表项额外内容（如悬浮层） |


### Dropdown 下拉菜单

使用示例及 `API` 请参考：[Antd Dropdown 下拉菜单 For Vue](https://www.antdv.com/components/dropdown-cn)

#### 仅应用 Oinone 主题样式

``` vue
<template>
  <a-dropdown class="oio-dropdown" overlay-class-name="oio-dropdown-overlay" />
</template>
```

### Pagination 分页

#### 基础用法

``` vue
<template>
  <oio-pagination
    :total="total"
    v-model:current-page="currentPage"
  />
</template>
```

#### 自定义每页数量

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

#### 显示总数与快速跳转

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

| **属性名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| currentPage | number | - | 当前页码（受控模式） |
| defaultCurrentPage | number | 1 | 默认页码（非受控模式） |
| pageSize | number | - | 每页显示条数（受控模式） |
| defaultPageSize | number | 15 | 默认每页显示条数（非受控模式） |
| pageSizeOptions | (number  | string)[]                                             | [10, 15, 30, 50, 100, 200] |
| total | number | 0 | 数据总数 |
| showSizeChanger | boolean | true | 是否显示每页条数选择器 |
| showTotal | boolean  | ((total: number, range) => string)                    | false |
| showJumper | boolean | false | 是否显示快速跳转 |
| disabled | boolean | false | 是否禁用分页 |
| showLastPage | boolean | true | 是否显示完整分页（否则显示简化版） |


**Events**

| **事件名** | **参数** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:current-page | currentPage: number | 当前页码变化时触发 |
| update:page-size | pageSize: number | 每页显示条数变化时触发 |
| change | currentPage: number, pageSize: number | 页码或每页显示条数变化时触发 |


**Slots**

| **插槽名** | **参数** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| pageSizeOption | { value: string } | 自定义每页条数选择器的显示内容 |


## （四）数据录入

### Cascader 级联选择

#### 基础用法

``` vue
<template>
  <oio-cascader v-model:value="selected" :options="options" placeholder="请选择级联项" />
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

#### 异步加载级联数据

``` vue
<template>
  <oio-cascader v-model:value="selected" :options="options" placeholder="请选择级联项" :load-data="loadData" />
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

#### 自定义显示内容

``` vue
<template>
  <oio-cascader
    v-model:value="selected"
    :options="options"
    placeholder="请选择级联项"
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

| **属性名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| mode | `SelectMode`（`single`/`multiple`） | `single`            | 选择模式（单选 / 多选） |
| value | `string[]`| string[][]                                            | `undefined`         |
| options | `CascaderItem[]`    | `[]`                | 级联数据选项 |
| filterOption | `(inputValue, option) => boolean` | `undefined`         | 搜索过滤函数 |
| properties | `CascaderProperties` | `{}`                | 级联数据属性映射（如 `childrenProp`<br/>/`isLeafProp`<br/>） |
| customFillProperties | `(option: CascaderItem<T>, index: number) => CascaderItem<T>` | `undefined`         | 自定义数据填充函数 |
| labelsSeparator | string | `' / '`             | 级联标签分隔符 |
| displayRender | `CascaderDisplayRenderFunction` | 自动拼接标签 | 自定义显示内容渲染函数 |
| tagRender | `Function`          | `undefined`         | 多选模式下标签渲染函数 |
| maxTagCount | number   |  `'responsive'` | `'responsive'`      |
| maxTagPlaceholder | string   |  `Function` | `'更多标签'`        |
| multipleCheckedStrategy | `CascaderCheckedStrategy`（`SHOW_ALL`/`SHOW_CHILD`/`SHOW_PARENT`） | `SHOW_CHILD`        | 多选时的选中策略 |
| loading | boolean | `undefined`         | 加载状态 |
| loadData | `(selectedOptions: CascaderItem[]) => void` | `undefined`         | 异步加载数据函数 |
| autofocus | boolean | `false`             | 是否自动聚焦 |
| placeholder | string | `'请选择'`          | 占位文本 |
| allowClear | boolean | `false`             | 是否显示清除按钮 |
| readonly | boolean | `false`             | 是否为只读状态 |
| disabled | boolean | `undefined`         | 是否禁用 |
| searchValue | string | `undefined`         | 搜索输入值 |
| enableSearch | boolean | `undefined`         | 是否启用搜索功能 |
| dropdownClassName | string   | `string[]`                                             | `undefined`         |
| getTriggerContainer | `(triggerNode: Node | HTMLElement) => Node | HTMLElement` | `() => document.body` | 触发容器挂载节点 |
| changeOnSelect | boolean | `false`             | 单选模式下选择子项时是否立即触发 change 事件 |


**Events**

| **事件名** | **参数** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:value | values: `string[]`| string[][]                                            |
| change | values: `string[]`| string[][], selectedOptions: CascaderItem[][]         |
| search | searchValue: string | 搜索输入变化时触发 |


### Checkbox 多选框

#### 基础用法

``` vue
<template>
  <oio-checkbox v-model:checked="checked">同意</oio-checkbox>
</template>
```

#### 中间状态

``` vue
<template>
  <oio-checkbox indeterminate>部分选中</oio-checkbox>
</template>
```

#### 只读与禁用状态

``` vue
<template>
  <oio-checkbox checked readonly>只读状态(勾选)</oio-checkbox>
  <oio-checkbox readonly>只读状态(非勾选)</oio-checkbox>
  <oio-checkbox checked disabled>禁用状态(勾选)</oio-checkbox>
  <oio-checkbox disabled>禁用状态(非勾选)</oio-checkbox>
</template>
```

#### API

**Props**

| **属性名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| autofocus | boolean | false | 是否自动聚焦 |
| indeterminate | boolean | undefined | 半选状态（中间态） |
| checked | boolean | undefined | 选中状态（双向绑定） |
| readonly | boolean | false | 是否为只读状态 |
| disabled | boolean | false | 是否禁用 |


**Events**

| **事件名** | **参数** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:checked | checked: boolean | 选中状态变化时触发（双向绑定用） |
| change | checked: boolean | 选中状态变化时触发 |


### DatePicker 日期选择框

#### 基础用法

``` vue
<template>
  <oio-date-picker v-model:value="value" />
</template>
```

#### 仅应用 Oinone 主题样式

``` vue
<template>
  <a-date-picker
    class="oio-date-time-picker"
    dropdown-class-name="oio-date-time-picker-popper"
    v-model:value="value"
  />
</template>
```

更多使用方式，可参考：[Antd DatePicker 日期选择框 For Vue](https://www.antdv.com/components/date-picker-cn)

#### API

**Props**

| **属性名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| placeholder | string | 模式相关默认文案 | 输入框占位文本 |
| readonly | boolean | false | 是否为只读模式（不可点击） |
| disabled | boolean | false | 是否禁用选择器 |
| format | string | - | 显示格式（如 `YYYY-MM-DD`） |
| valueFormat | string | `YYYY-MM-DD`        | 值格式（用于双向绑定） |
| allowClear | boolean | true | 是否显示清除按钮 |
| open | boolean | undefined | 控制弹出层显示（受控模式） |
| changeOpenValue | function | - | 弹出层显示状态变化时的回调 |
| locale | object | - | 国际化配置（如星期、月份名称） |
| dropdownClassName | string   | `string[]`                                             | - |
| openPanelChange | function | - | 弹出层打开时的回调 |
| closePanelChange | function | - | 弹出层关闭时的回调 |
| getTriggerContainer | function | `() => document.body` | 弹出层挂载的父节点 |
| showToday | boolean | true | 是否显示 “今天” 按钮 |
| value | Date     | string                                                | - |
| defaultValue | Date     | string                                                | - |
| disabledDate | (date) => boolean | - | 禁用日期的判断函数 |


**Events**

| **事件名** | **参数** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:value | value: string | 选中值变化时触发（双向绑定） |


**Slots**

| **插槽名** | **参数** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| dateRender | { date } | 自定义日期单元格内容 |
| renderExtraFooter | - | 自定义弹出层底部内容 |


### DateRangePicker 日期范围选择框

#### 基础用法

``` vue
<template>
  <oio-date-range-picker v-model:value="value" />
</template>
```

#### 仅应用 Oinone 主题样式

``` vue
<template>
  <a-range-picker
    class="oio-date-time-range-picker oio-date-time-picker-range-date"
    dropdown-class-name="oio-date-time-range-picker-popper oio-date-time-range-picker-popper-date"
    v-model:value="value"
  />
</template>
```

更多使用方式，可参考：[Antd DatePicker 日期选择框 For Vue](https://www.antdv.com/components/date-picker-cn)

#### API

**Props**

| **属性名** | **类型** | **默认值** | **描述** |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| placeholder                                                  | [string, string]                                             | 模式相关默认文案                                             | 输入框占位文本（开始和结束）                                 |
| readonly                                                     | boolean                                                      | false                                                        | 是否为只读模式（不可点击）                                   |
| disabled                                                     | boolean                                                      | false                                                        | 是否禁用选择器                                               |
| format                                                       | string                                                       | -                                                            | 显示格式（如 `YYYY-MM-DD`）                                  |
| valueFormat                                                  | string                                                       | `YYYY-MM-DD`                                                 | 值格式（用于双向绑定）                                       |
| allowClear                                                   | boolean                                                      | true                                                         | 是否显示清除按钮                                             |
| dropdownClassName                                            | string                                                       | `string[]`                                                    | -                                                            |
| separator                                                    | string                                                       | `~`                                                          | 开始和结束值之间的分隔符                                     |
| openPanelChange                                              | function                                                     | -                                                            | 弹出层打开时的回调                                           |
| closePanelChange                                             | function                                                     | -                                                            | 弹出层关闭时的回调                                           |
| getTriggerContainer                                          | function                                                     | `() => document.body`                                        | 弹出层挂载的父节点                                           |
| value | [Date    | string                                                       | undefined, Date                                              |
| defaultValue | [Date    | string                                                       | undefined, Date                                              |


**Events**

| **事件名** | **参数** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:value | [start: string, end: string] | 选中值变化时触发（双向绑定） |


### DateTimePicker 日期时间选择框

#### 基础用法

``` vue
<template>
  <oio-date-time-picker v-model:value="value" />
</template>
```

#### 仅应用 Oinone 主题样式

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

更多使用方式，可参考：[Antd DatePicker 日期选择框 For Vue](https://www.antdv.com/components/date-picker-cn)

#### API

**Props**

| **属性名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | ------------------------------------------------------------ | :----------------------------------------------------------- | :----------------------------------------------------------- |
| placeholder | string | 模式相关默认文案 | 输入框占位文本 |
| readonly | boolean | false | 是否为只读模式（不可点击） |
| disabled | boolean | false | 是否禁用选择器 |
| format | string | - | 显示格式（如 `YYYY-MM-DD HH:mm:ss`） |
| valueFormat | string | `YYYY-MM-DD HH:mm:ss` | 值格式 |
| allowClear | boolean | true | 是否显示清除按钮 |
| open | boolean | undefined | 控制弹出层显示（受控模式） |
| changeOpenValue | function | - | 弹出层显示状态变化时的回调 |
| locale | object | - | 国际化配置（如星期、月份名称） |
| dropdownClassName | string   | `string[]`                                             | - |
| openPanelChange | function | - | 弹出层打开时的回调 |
| closePanelChange | function | - | 弹出层关闭时的回调 |
| getTriggerContainer | function | `() => document.body` | 弹出层挂载的父节点 |
| showToday | boolean | true | 是否显示 “今天” 按钮 |
| value | Date     | string                                                | - |
| defaultValue | Date     | string                                                | - |
| disabledDate | (date) => boolean | - | 禁用日期的判断函数 |
| disabledTime | `(date) => { disabledHours: number[]; disabledMinutes: number[]; disabledSeconds: number[] }` | - | 禁用时间的配置（函数或对象） |


**Events**

| **事件名** | **参数** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:value | value: string | 选中值变化时触发（双向绑定） |


**Slots**

| **插槽名** | **参数** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| dateRender | { date } | 自定义日期单元格内容 |
| renderExtraFooter | - | 自定义弹出层底部内容 |


### DateTimeRangePicker 日期时间范围选择框

#### 基础用法

``` vue
<template>
  <oio-date-time-range-picker v-model:value="value" />
</template>
```

#### 仅应用 Oinone 主题样式

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

更多使用方式，可参考：[Antd DatePicker 日期选择框 For Vue](https://www.antdv.com/components/date-picker-cn)

#### API

**Props**

| **属性名** | **类型** | **默认值** | **描述** |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| placeholder                                                  | [string, string]                                             | 模式相关默认文案                                             | 输入框占位文本（开始和结束）                                 |
| readonly                                                     | boolean                                                      | false                                                        | 是否为只读模式（不可点击）                                   |
| disabled                                                     | boolean                                                      | false                                                        | 是否禁用选择器                                               |
| format                                                       | string                                                       | -                                                            | 显示格式（如 `YYYY-MM-DD HH:mm:ss`）                         |
| valueFormat                                                  | string                                                       | `YYYY-MM-DD HH:mm:ss`                                        | 值格式（用于双向绑定）                                       |
| allowClear                                                   | boolean                                                      | true                                                         | 是否显示清除按钮                                             |
| dropdownClassName                                            | string                                                       | `string[]`                                                    | -                                                            |
| separator                                                    | string                                                       | `~`                                                          | 开始和结束值之间的分隔符                                     |
| openPanelChange                                              | function                                                     | -                                                            | 弹出层打开时的回调                                           |
| closePanelChange                                             | function                                                     | -                                                            | 弹出层关闭时的回调                                           |
| getTriggerContainer                                          | function                                                     | `() => document.body`                                        | 弹出层挂载的父节点                                           |
| value | [Date    | string                                                       | undefined, Date                                              |
| defaultValue | [Date    | string                                                       | undefined, Date                                              |


**Events**

| **事件名** | **参数** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:value | [start: string, end: string] | 选中值变化时触发（双向绑定） |


### Form 表单

#### 基础用法

``` vue
<template>
  <oio-form :data="data" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off">
    <oio-form-item label="用户名" name="username" :rules="[{ required: true, message: '请输入用户名' }]">
      <oio-input v-model:value="data.username" />
    </oio-form-item>
    <oio-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入密码' }]">
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

#### 仅应用 Oinone 主题样式

``` vue
<template>
  <a-form class="oio-form" :model="data" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off">
    <a-form-item
      class="oio-form-item oio-form-item-horizontal"
      label="用户名"
      name="username"
      :rules="[{ required: true, message: 'Please input your username!' }]"
    >
      <a-input class="oio-input" v-model:value="data.username" />
    </a-form-item>
    <a-form-item
      class="oio-form-item oio-form-item-horizontal"
      label="密码"
      name="password"
      :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <a-input-password class="oio-input oio-input-password" v-model:value="data.password" />
    </a-form-item>
  </a-form>
</template>
```

更多使用方式，可参考：[Antd Form 表单 For Vue](https://www.antdv.com/components/form-cn)

#### API

##### oio-form

**Props**

| **属性名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| name | string | - | 表单名称 |
| rules | `Record<string, FormItemRule[]>` | - | 表单验证规则 |
| layout | `FormLayout`（`horizontal` | `vertical` | `inline`） |
| labelCol | `OioColModel`       | - | 标签列栅格配置（水平布局专用） |
| wrapperCol | `OioColModel`       | - | 内容列栅格配置（水平布局专用） |
| labelAlign | `FormLabelAlign`（`left` | `right`） | `left`              |
| colon | boolean | false | 是否显示标签冒号 |
| validateTrigger | `ValidateTrigger` | `ValidateTrigger[]` | `['change', 'blur']` |
| validateOnRuleChange | boolean | true | 规则变化时是否触发验证 |
| loading | boolean | undefined | 是否显示加载状态（继承自 `OioSpin`） |
| loadingIndicator | `VNode`             | - | 自定义加载图标 |
| wrapperClassName | string   | `string[]`                                             | - |
| data | object | - | 表单数据模型 |


**Events**

| **事件名** | **参数** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| submit | `Event`             | 表单提交事件（通过 `<form>` 标签触发） |


**Methods**

| **方法名** | **参数** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| validate | `names?: NamePath`  | 验证指定字段，返回 Promise |
| validateFields | `names?: NamePath`  | 验证所有字段，返回 Promise |
| resetFields | `names?: NamePath`  | 重置指定字段值及验证状态 |
| clearValidate | `names?: NamePath`  | 清除指定字段的验证状态 |
| scrollToField | `names?: NamePath`  | 滚动到指定字段位置 |


##### oio-form-item

**Props**

| **属性名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| name | string | - | 字段名（用于表单验证和数据绑定） |
| rules | `FormItemRule[]` | `FormItemRule` | - |
| autoLink | boolean | true | 是否自动关联 `label` 和 `input` 的 `for` 属性 |
| colon | boolean | false | 是否显示标签冒号（优先级高于表单级配置） |
| htmlFor | string | - | 标签关联的 `input` 的 `id` |
| labelCol | `OioColModel`       | - | 标签列栅格配置（仅水平布局有效） |
| wrapperCol | `OioColModel`       | - | 内容列栅格配置（仅水平布局有效） |
| labelAlign | `FormLabelAlign`（`left` | `right`） | - |
| label | string | - | 标签文本 |
| extra | string | - | 字段额外说明文本 |
| help | string | - | 字段帮助文本 |
| required | boolean | - | 是否必填（会自动生成星号） |
| disabled | boolean | - | 是否禁用字段 |
| validateStatus | string | - | 验证状态（`success`/`warning`/`error`/`validating`） |
| validateFirst | boolean | - | 是否优先验证第一个错误规则 |
| validateTrigger | `(string | ValidateTrigger)[]` | `['change', 'blur']` | 字段级验证触发时机 |
| layout | `FormLayout`（`horizontal` | `vertical` | `inline`） |


**Slots**

| **插槽名** | **参数** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | - | 字段内容（如输入框、选择器等） |
| label | - | 自定义标签内容 |
| extra | - | 自定义额外说明内容 |
| help | - | 自定义帮助文本 |


### Input 输入框

#### 基础用法

``` vue
<template>
  <oio-input v-model:value="value" placeholder="请输入" />
</template>
```

#### 带移除图标

``` vue
<template>
  <oio-input v-model:value="value" placeholder="请输入" allow-clear />
</template>
```

#### 前缀和后缀

``` vue
<template>
  <oio-input v-model:value="value" placeholder="请输入">
    <template #prefix>
      <oio-icon icon="oinone-a-zhanghaodenglu4x" />
    </template>
    <template #suffix>
      <oio-tooltip title="扩展信息">
        <oio-icon icon="oinone-wenhao1" />
      </oio-tooltip>
    </template>
  </oio-input>
  <oio-input v-model:value="value" placeholder="请输入" prefix="¥" suffix="RMB" />
</template>
```

#### 数字输入框

``` vue
<template>
  <oio-input-number v-model:value="value" placeholder="请输入" />
</template>
```

#### 密码输入框

``` vue
<template>
  <oio-input-password v-model:value="value" placeholder="请输入" />
</template>
```

#### 搜索输入框

``` vue
<template>
  <oio-input-search v-model:value="value" placeholder="请输入" @search="onSearch" />
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

#### 输入框组合

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

#### 仅应用 Oinone 主题样式

``` vue
<template>
  <!-- 基础用法 -->
  <a-input class="oio-input" v-model:value="value" placeholder="请输入" />
  <!-- 带移除图标 -->
  <a-input class="oio-input oio-input-allow-clear" v-model:value="value" placeholder="请输入" allow-clear />
  <!-- 数字输入框 -->
  <a-input-number class="oio-input-number" v-model:value="value" placeholder="请输入" />
  <!-- 密码输入框 -->
  <a-input-password class="oio-input oio-input-password" v-model:value="value" placeholder="请输入" />
</template>
```

更多使用方式，可参考：[Antd Input 输入框 For Vue](https://3x.antdv.com/components/input-cn)

#### API

##### oio-input

**Props**

| **属性名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| value | string | - | 输入框的值（双向绑定） |
| defaultValue | string | - | 输入框的默认值 |
| placeholder | string | - | 占位文本 |
| disabled | boolean | false | 是否禁用输入框 |
| allowClear | boolean | false | 是否显示清除按钮 |
| maxlength | number | - | 最大输入长度 |
| autocomplete | boolean  | string                                                | undefined |
| showCount | boolean | false | 是否显示字数统计，需要配合 maxlength 使用 |
| readonly | boolean | false | 是否为只读状态 |
| minlength | number | - | 最小输入长度 |
| autofocus | boolean | undefined | 是否自动聚焦，组件挂载后生效 |


**Events**

| **事件名** | **参数** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:value | value: string | undefined                                             |
| press-enter | event: KeyboardEvent | 按下回车键时触发 |


**Slots**

| **插槽名** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| prepend | 输入框前置内容，显示在输入框前 |
| append | 输入框后置内容，显示在输入框后 |
| prefix | 输入框前缀图标 / 内容，显示在输入框内部左侧 |
| suffix | 输入框后缀图标 / 内容，显示在输入框内部右侧 |


**Methods**

| **方法名** | **参数** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| focus | options?: FocusOptions | 聚焦输入框，可传入聚焦选项（如 preventScroll） |
| blur | - | 取消输入框聚焦 |


##### oio-input-number

**Props**

| **属性名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| value | number   | string                                                | - |
| defaultValue | number   | string                                                | - |
| placeholder | string | - | 输入框占位文本 |
| readonly | boolean | false | 是否为只读模式（不可编辑） |
| disabled | boolean | false | 是否禁用输入框 |
| formatter | `(value: string) => string` | - | 格式化显示值（优先于 `showThousandth`） |
| parser | `(value: string) => string` | - | 解析输入值（处理格式化后的值） |
| min | number   | string                                                | - |
| max | number   | string                                                | - |
| step | number   | string                                                | `1`                 |
| addStep | number   | string                                                | `step`              |
| reduceStep | number   | string                                                | `step`              |
| precision | number | - | 保留小数位数（自动四舍五入，如 `2` 表示保留两位小数） |
| unit | string | - | 输入框后缀单位（如 `"元"` `"%"` ） |
| hiddenStepHandle | boolean | false | 是否隐藏上下箭头按钮 |
| showThousandth | boolean | false | 是否显示千分位分隔符（如 `1,000.5` ） |
| autocorrection | boolean | false | 失焦时是否自动修正值（修正到 `min/max` 范围内） |


**Events**

| **事件名** | **参数** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:value | value: string | 值变化时触发（双向绑定） |
| focus | `event: FocusEvent` | 输入框获得焦点时触发 |
| blur | `event: FocusEvent` | 输入框失去焦点时触发 |


**Slots**

| **插槽名** | **参数** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| prepend | - | 输入框前置内容（如图标） |
| append | - | 输入框后置内容（如单位） |
| prefix | - | 输入框前缀（在输入框内左侧） |
| suffix | - | 输入框后缀（在输入框内右侧） |


**Methods**

| **方法名** | **参数** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| getRealValue | - | 获取内部真实值（`BigNumber`<br/> 类型） |
| setValue | val: number | string                                                |
| autocorrection | - | 手动触发自动修正（返回修正后的值） |


##### oio-input-password

**Props**

| **参数名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| value | string | - | 输入框的值（双向绑定） |
| defaultValue | string | - | 输入框的默认值 |
| placeholder | string | - | 占位文本 |
| disabled | boolean | false | 是否禁用输入框 |
| allowClear | boolean | false | 是否显示清除按钮 |
| maxlength | number | - | 最大输入长度 |
| autocomplete | boolean  | string                                                | 'new-password' |
| showCount | boolean | false | 是否显示字数统计 |
| readonly | boolean | false | 是否为只读状态 |
| minlength | number | - | 最小输入长度 |
| autofocus | boolean | - | 组件挂载后是否自动聚焦 |
| showPassword | boolean | true | 是否显示切换密码可见性的按钮 |


**Events**

| **事件名** | **参数** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:value | string   | undefined                                             |


**Slots**

| **插槽名** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| prepend | 输入框前置内容 |
| append | 输入框后置内容 |
| prefix | 输入框前缀内容 |


##### oio-input-search

**Props**

| **参数名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| type | InputType | InputType.TEXT | 输入框类型，可选值：TEXT, PASSWORD |
| value | string | - | 输入框的值（双向绑定） |
| defaultValue | string | - | 输入框的默认值 |
| placeholder | string | - | 占位文本 |
| disabled | boolean | false | 是否禁用输入框 |
| allowClear | boolean | false | 是否显示清除按钮 |
| maxlength | number | - | 最大输入长度 |
| autocomplete | boolean  | string                                                | 'new-password' |
| showCount | boolean | false | 是否显示字数统计 |
| readonly | boolean | false | 是否为只读状态 |
| minlength | number | - | 最小输入长度 |
| autofocus | boolean | - | 组件挂载后是否自动聚焦 |


**Events**

| **事件名** | **参数** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:value | string   | undefined                                             |
| search | InputSearchEvent                                             | 点击搜索按钮或按下回车键时触发 |


**Slots**

| **插槽名** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| prepend | 输入框前置内容（左侧） |
| append | 输入框后置内容（右侧） |
| prefix | 输入框前缀图标 / 内容 |
| suffix | 输入框后缀图标 / 内容 |
| enter | 自定义搜索按钮内容 |


##### oio-input-group

**Props**

| **参数名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| compact | boolean | true | 是否使用紧凑模式显示输入框组 |


**Slots**

| **插槽名** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | 用于放置输入框组件 |


### Select 选择框

#### 仅应用 Oinone 主题样式

``` vue
<template>
  <a-select class="oio-select" dropdown-class-name="oio-select-dropdown" />
</template>
```

更多使用方式，可参考：[Antd Select 选择框 For Vue](https://www.antdv.com/components/select-cn)

### Slider 滑动输入条

#### 基础用法

``` vue
<template>
  <oio-slider v-model:value="value" />
</template>
```

#### 垂直

``` vue
<template>
  <div style="height: 300px">
    <oio-slider v-model:value="value" direction="vertical" />
  </div>
</template>
```

#### 仅应用 Oinone 主题样式

``` vue
<template>
  <!-- 基础用法 -->
  <a-slider class="oio-slider" v-model:value="value" :min="0" :max="100" :step="1" />
  <!-- 垂直 -->
  <div style="height: 300px">
    <a-slider class="oio-slider" v-model:value="value" :min="0" :max="100" :step="1" vertical />
  </div>
</template>
```

更多使用方式，可参考：[Antd Slider 滑动输入条 For Vue](https://www.antdv.com/components/slider-cn)

#### API

**Props**

| **参数名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| value | number   | number[]                                              | - |
| defaultValue | number   | number[]                                              | - |
| readonly | boolean | false | 是否为只读状态 |
| disabled | boolean | false | 是否禁用滑动条 |
| min | number | `0`                 | 最小值 |
| max | number | `100`               | 最大值 |
| step | number | `1`                 | 步长（取值必须为 `(max - min)` 的因数） |
| direction | `SliderDirection` | `'horizontal'` | `'vertical'` |
| marks | { [key: number]: string | VNode                                                        | { style?: CSSStyleDeclaration; label: string                 |
| dots | boolean | false | 是否显示刻度点 |
| reverse | boolean | false | 是否反向滑动 |
| range | boolean | false | 是否开启范围选择模式 |
| tooltipVisible | boolean | `undefined`         | 是否显示提示框（默认跟随交互状态） |
| tooltipPlacement | `OioTooltipPlacement` | -                                                            | 提示框位置，可选值见枚举 `OioTooltipPlacement` |
| tooltipFormatter | `(value: number) => string` | - | 提示框内容格式化函数 |
| getTooltipTriggerContainer | `(triggerNode: Node | HTMLElement) => Node | HTMLElement` | - | 提示框容器挂载点（默认挂载到 `body`） |


**Events**

| **事件名** | **参数** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:value | number   | number[]                                              |


### Switch 开关

#### 基础用法

``` vue
<template>
  <oio-switch v-model:value="value" />
</template>
```

#### 带文字的开关

``` vue
<template>
  <oio-switch v-model:checked="value" checked-children="开" unchecked-children="关" />
  <oio-switch v-model:checked="value">
    <template #checkedChildren>开</template>
    <template #uncheckedChildren>关</template>
  </oio-switch>
</template>
```

#### 自定义开关值

``` vue
<template>
  <oio-switch v-model:checked="value" :checked-value="1" :unchecked-value="0" />
</template>
```

#### 仅应用 Oinone 主题样式

``` vue
<template>
  <a-switch class="oio-switch" v-model:checked="value" />
</template>
```

更多使用方式，可参考：[Antd Switch 开关 For Vue](https://www.antdv.com/components/switch-cn)

#### **API**

**Props**

| **参数名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| autofocus | boolean | false | 组件挂载后是否自动聚焦 |
| checked | boolean  | string                                                       | number                                                |
| loading | boolean | false | 是否显示加载状态 |
| size | SwitchSize | 'default' | 开关尺寸，可选值：'default', 'small' |
| disabled | boolean | false | 是否禁用开关 |
| checkedValue | boolean  | string                                                       | number                                                |
| uncheckedValue | boolean  | string                                                       | number                                                |
| readonly | boolean | false | 是否为只读状态 |


**Events**

| **事件名** | **参数** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:checked | boolean | 开关状态变化时触发（双向绑定） |
| change | boolean | 开关状态变化时触发 |


**Slots**

| **插槽名** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| checkedChildren | 开关打开时显示的内容 |
| uncheckedChildren | 开关关闭时显示的内容 |


### Textarea 多行输入框

#### 基础用法

``` vue
<template>
  <oio-textarea v-model:value="value" placeholder="请输入" />
</template>
```

#### 带移除图标

``` vue
<template>
  <oio-textarea v-model:value="value" placeholder="请输入" allow-clear />
</template>
```

#### 仅应用 Oinone 主题样式

``` vue
<template>
  <!-- 基础用法 -->
  <a-textarea v-model:value="value" placeholder="请输入" />
  <!-- 带移除图标 -->
  <a-textarea class="oio-textarea oio-textarea-allow-clear" v-model:value="value" placeholder="请输入" allow-clear />
</template>
```

更多使用方式，可参考：[Antd Input 输入框 For Vue](https://www.antdv.com/components/input-cn)

#### **API**

**Props**

| **参数名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| value | string | - | 文本域当前值（双向绑定） |
| defaultValue | string | - | 初始值 |
| placeholder | string | - | 占位文本 |
| disabled | boolean | false | 是否禁用文本域 |
| allowClear | boolean | false | 是否显示清除按钮 |
| maxlength | number | - | 最大输入字符数 |
| autoSize | boolean  | TextareaSize                                          | false |
| showCount | boolean | false | 是否显示字数统计 |
| readonly | boolean | false | 是否为只读状态 |
| minlength | number | - | 最小输入字符数 |


**Events**

| **事件名** | **参数** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:value | string   | undefined                                             |
| change | string   | undefined                                             |


**Methods**

| **方法名** | **参数** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| focus | - | 使文本域聚焦 |
| blur | - | 使文本域失焦 |


### TimePicker 时间选择框

#### 基础用法

``` vue
<template>
  <oio-time-picker v-model:value="value" />
</template>
```

#### 仅应用 Oinone 主题样式

``` vue
<template>
  <a-time-picker
    class="oio-date-time-picker"
    popup-class-name="oio-date-time-picker-popper"
    v-model:value="value"
  />
</template>
```

更多使用方式，可参考：[Antd TimePicker 时间选择框 For Vue](https://www.antdv.com/components/time-picker-cn)

#### API

**Props**

| **属性名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | ------------------------------------------------------------ | :----------------------------------------------------------- | :----------------------------------------------------------- |
| placeholder | string | 模式相关默认文案 | 输入框占位文本 |
| readonly | boolean | false | 是否为只读模式（不可点击） |
| disabled | boolean | false | 是否禁用选择器 |
| format | string | - | 显示格式（如 `HH:mm:ss`） |
| valueFormat | string | `HH:mm:ss`          | 值格式 |
| allowClear | boolean | true | 是否显示清除按钮 |
| open | boolean | undefined | 控制弹出层显示（受控模式） |
| changeOpenValue | function | - | 弹出层显示状态变化时的回调 |
| locale | object | - | 国际化配置（如星期、月份名称） |
| dropdownClassName | string   | `string[]`                                             | - |
| openPanelChange | function | - | 弹出层打开时的回调 |
| closePanelChange | function | - | 弹出层关闭时的回调 |
| getTriggerContainer | function | `() => document.body` | 弹出层挂载的父节点 |
| value | Date     | string                                                | - |
| defaultValue | Date     | string                                                | - |
| disabledTime | `(date) => { disabledHours: number[]; disabledMinutes: number[]; disabledSeconds: number[] }` | - | 禁用时间的配置（函数或对象） |


### TimeRangePicker 时间范围选择框

#### 基础用法

``` vue
<template>
  <oio-time-range-picker v-model:value="value" />
</template>
```

#### 仅应用 Oinone 主题样式

``` vue
<template>
  <a-time-range-picker
    class="oio-date-time-range-picker oio-date-time-picker-range-time"
    popup-class-name="oio-date-time-range-picker-popper oio-date-time-range-picker-popper-time"
    v-model:value="value"
  />
</template>
```

更多使用方式，可参考：[Antd TimePicker 时间选择框 For Vue](https://www.antdv.com/components/time-picker-cn)

#### API

**Props**

| **属性名** | **类型** | **默认值** | **描述** |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| placeholder                                                  | [string, string]                                             | 模式相关默认文案                                             | 输入框占位文本（开始和结束）                                 |
| readonly                                                     | boolean                                                      | false                                                        | 是否为只读模式（不可点击）                                   |
| disabled                                                     | boolean                                                      | false                                                        | 是否禁用选择器                                               |
| format                                                       | string                                                       | -                                                            | 显示格式（如 `YYYY-MM-DD HH:mm:ss`）                         |
| valueFormat                                                  | string                                                       | `YYYY-MM-DD HH:mm:ss`                                        | 值格式（用于双向绑定）                                       |
| allowClear                                                   | boolean                                                      | true                                                         | 是否显示清除按钮                                             |
| dropdownClassName                                            | string                                                       | `string[]`                                                    | -                                                            |
| separator                                                    | string                                                       | `~`                                                          | 开始和结束值之间的分隔符                                     |
| openPanelChange                                              | function                                                     | -                                                            | 弹出层打开时的回调                                           |
| closePanelChange                                             | function                                                     | -                                                            | 弹出层关闭时的回调                                           |
| getTriggerContainer                                          | function                                                     | `() => document.body`                                        | 弹出层挂载的父节点                                           |
| value | [Date    | string                                                       | undefined, Date                                              |
| defaultValue | [Date    | string                                                       | undefined, Date                                              |


**Events**

| **事件名** | **参数** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:value | [start: string, end: string] | 选中值变化时触发（双向绑定） |


### TreeSelect 树选择

#### 仅应用 Oinone 主题样式

``` vue
<template>
  <a-tree-select
    class="oio-select oio-tree-select"
    dropdown-class-name="oio-select-dropdown oio-tree-select-dropdown"
  />
</template>
```

更多使用方式，可参考：[Antd Tree Select 树选择 For Vue](https://3x.antdv.com/components/tree-select-cn)

### Upload 上传

#### 基础用法

``` vue
<template>
  <oio-upload :upload-list="fileList" @success="onSuccess" @failure="onFailure">
    <oio-button>点击上传</oio-button>
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

#### 上传图片

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
      <div>点击上传</div>
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

| **参数名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| multiple | boolean | `true`              | 是否支持多文件上传 |
| limit | number | `-1`                | 最大上传文件数量（`-1` 表示无限制） |
| limitSize | number | `-1`                | 单个文件大小限制（单位：MB，`-1` 表示无限制） |
| listType | string | `'text'`            | 文件列表展示类型（`'text'`/`'picture'`/`'picture-card'`） |
| showUploadList | boolean  | `{ showPreviewIcon?: boolean; showRemoveIcon?: boolean }` | `undefined`         |
| disabled | boolean | `false`             | 是否禁用上传功能 |
| beforeUpload | (file: FileItem, fileList: FileItem[]) => boolean | Promise<`boolean`>                                      | - |
| progress | Record<string, unknown> | - | 上传进度样式配置 |
| onReject | (file: FileItem, fileList: FileItem[]) => void | - | 文件格式或大小校验失败时的回调 |
| onDrop | (file: FileItem, event: Event) => void | - | 文件拖拽上传时的回调 |
| customRequest | ({ file, onSuccess, onError, onProgress }) => void | - | 自定义上传请求函数（覆盖默认请求逻辑） |
| removeCallback | (file: FileItem) => Promise<`boolean`> | - | 删除文件时的回调（返回 `false` 可阻止删除） |
| readonly | boolean | `false`             | 是否为只读模式（隐藏上传按钮和删除图标） |
| partSize | number | - | 分片上传时每个分片的大小（单位：MB） |
| chunkUploadThreshold | number | - | 开启分片上传的文件大小阈值（单位：MB，文件大于此值时启用分片） |
| parallel | number | - | 分片上传的并发数量 |
| accept | string   | `string[]`                                              | - |
| uploadList | FileModel[] | `[]`                | 上传文件列表（支持双向绑定） |
| managed | boolean | `false`             | 是否启用文件管理模式（配合后台管理文件状态） |
| manual | boolean | `false`             | 是否手动触发上传（关闭自动上传，需调用 `handleUpload` 方法） |
| cdnKey | string | - | CDN 上传时的资源键（用于生成上传地址） |
| contentType | string | `''`                | 上传请求的 Content-Type 类型 |


**Events**

| **事件名** | **参数类型** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| success | `(file: FileModel) => void` | 文件上传成功时触发 |
| failure | `(error: Error, file: FileModel) => void` | 文件上传失败时触发 |


**Slots**

| **插槽名** | **参数** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | - | 自定义上传触发区域 |
| itemRender | `{ file: FileItem, onPreview, onRemove }` | 自定义文件列表项 |
| previewIcon | `{ file: FileItem, continuedUpload }` | 自定义预览图标 |
| removeIcon | `{ file: FileItem, continuedUpload }` | 自定义删除图标 |


### YearPicker 年份选择框

#### 基础用法

``` vue
<template>
  <oio-year-picker v-model:value="value" />
</template>
```

#### 仅应用 Oinone 主题样式

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

更多使用方式，可参考：[Antd DatePicker 日期选择框 For Vue](https://www.antdv.com/components/date-picker-cn)

#### API

**Props**

| **属性名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | ------------------------------------------------------------ | :----------------------------------------------------------- | :----------------------------------------------------------- |
| placeholder | string | 模式相关默认文案 | 输入框占位文本 |
| readonly | boolean | false | 是否为只读模式（不可点击） |
| disabled | boolean | false | 是否禁用选择器 |
| format | string | - | 显示格式（如 `YYYY`） |
| valueFormat | string | `YYYY`              | 值格式 |
| allowClear | boolean | true | 是否显示清除按钮 |
| open | boolean | undefined | 控制弹出层显示（受控模式） |
| changeOpenValue | function | - | 弹出层显示状态变化时的回调 |
| locale | object | - | 国际化配置（如星期、月份名称） |
| dropdownClassName | string   | `string[]`                                             | - |
| openPanelChange | function | - | 弹出层打开时的回调 |
| closePanelChange | function | - | 弹出层关闭时的回调 |
| getTriggerContainer | function | `() => document.body` | 弹出层挂载的父节点 |
| showToday | boolean | true | 是否显示 “今天” 按钮 |
| value | Date     | string                                                | - |
| defaultValue | Date     | string                                                | - |
| disabledDate | (date) => boolean | - | 禁用日期的判断函数 |
| disabledTime | `(date) => { disabledHours: number[]; disabledMinutes: number[]; disabledSeconds: number[] }` | - | 禁用时间的配置（函数或对象） |


### YearRangePicker 年份范围选择框

#### 基础用法

``` vue
<template>
  <oio-year-range-picker v-model:value="value" />
</template>
```

#### 仅应用 Oinone 主题样式

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

更多使用方式，可参考：[Antd DatePicker 日期选择框 For Vue](https://www.antdv.com/components/date-picker-cn)

#### API

**Props**

| **属性名** | **类型** | **默认值** | **描述** |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| placeholder                                                  | [string, string]                                             | 模式相关默认文案                                             | 输入框占位文本（开始和结束）                                 |
| readonly                                                     | boolean                                                      | false                                                        | 是否为只读模式（不可点击）                                   |
| disabled                                                     | boolean                                                      | false                                                        | 是否禁用选择器                                               |
| format                                                       | string                                                       | -                                                            | 显示格式（如 `YYYY`）                                        |
| valueFormat                                                  | string                                                       | `YYYY`                                                       | 值格式（用于双向绑定）                                       |
| allowClear                                                   | boolean                                                      | true                                                         | 是否显示清除按钮                                             |
| dropdownClassName                                            | string                                                       | `string[]`                                                    | -                                                            |
| separator                                                    | string                                                       | `~`                                                          | 开始和结束值之间的分隔符                                     |
| openPanelChange                                              | function                                                     | -                                                            | 弹出层打开时的回调                                           |
| closePanelChange                                             | function                                                     | -                                                            | 弹出层关闭时的回调                                           |
| getTriggerContainer                                          | function                                                     | `() => document.body`                                        | 弹出层挂载的父节点                                           |
| value | [Date    | string                                                       | undefined, Date                                              |
| defaultValue | [Date    | string                                                       | undefined, Date                                              |


**Events**

| **事件名** | **参数** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:value | [start: string, end: string] | 选中值变化时触发（双向绑定） |


## （五）数据展示

### Card 卡片

#### 基础用法

``` vue
<template>
  <oio-card title="标题">
    <p>这是一段内容</p>
  </oio-card>
</template>
```

#### 带操作按钮的卡片

``` vue
<template>
  <oio-card title="标题">
    <p>这是一段内容</p>
    <template #titleToolbar>
      <oio-button>标题栏按钮</oio-button>
    </template>
    <template #toolbar>
      <oio-button type="link">操作栏按钮1</oio-button>
      <oio-button type="link">操作栏按钮2</oio-button>
      <oio-button type="link">操作栏按钮3</oio-button>
    </template>
  </oio-card>
</template>
```

#### API

**Props**

| **参数名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| title | string | - | 卡片标题文本 |


**Slots**

| **插槽名** | **描述** | **参数** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | 卡片内容区域 | - |
| title | 自定义标题内容 | - |
| titleToolbar | 标题行右侧工具栏 | - |
| toolbar | 卡片底部工具栏（自动添加分隔符） | - |


**Events**

| **事件名** | **参数** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| click | MouseEvent | 卡片被点击时触发 |


### Collapse 折叠面板

#### 基础用法

``` vue
<template>
  <oio-collapse v-model:activeKey="activeKey">
    <oio-collapse-panel key="1" header="面板1">
      <p>这是一段文本</p>
    </oio-collapse-panel>
    <oio-collapse-panel key="2" header="面板2">
      <p>这是一段文本</p>
    </oio-collapse-panel>
    <oio-collapse-panel key="3" header="面板3" disabled>
      <p>这是一段文本</p>
    </oio-collapse-panel>
  </oio-collapse>
</template>
```

#### 手风琴模式

``` vue
<template>
  <oio-collapse v-model:activeKey="activeKey" accordion>
    <oio-collapse-panel key="1" header="面板1">
      <p>这是一段文本</p>
    </oio-collapse-panel>
    <oio-collapse-panel key="2" header="面板2">
      <p>这是一段文本</p>
    </oio-collapse-panel>
    <oio-collapse-panel key="3" header="面板3">
      <p>这是一段文本</p>
    </oio-collapse-panel>
  </oio-collapse>
</template>
```

#### 斑马纹风格

``` vue
<template>
  <oio-collapse v-model:activeKey="activeKey" type="stripe">
    <oio-collapse-panel key="1" header="面板1">
      <p>这是一段文本</p>
    </oio-collapse-panel>
    <oio-collapse-panel key="2" header="面板2">
      <p>这是一段文本</p>
    </oio-collapse-panel>
    <oio-collapse-panel key="3" header="面板3">
      <p>这是一段文本</p>
    </oio-collapse-panel>
  </oio-collapse>
</template>
```

#### 仅应用 Oinone 主题样式

``` vue
<template>
  <!-- 基础用法 -->
  <a-collapse class="oio-collapse" v-model:activeKey="activeKey">
    <a-collapse-panel class="oio-collapse-panel" key="1" header="面板1">
      <p>这是一段文本</p>
    </a-collapse-panel>
    <a-collapse-panel class="oio-collapse-panel" key="2" header="面板2">
      <p>这是一段文本</p>
    </a-collapse-panel>
    <a-collapse-panel class="oio-collapse-panel" key="3" header="面板3">
      <p>这是一段文本</p>
    </a-collapse-panel>
  </a-collapse>
  <!-- 斑马纹风格 -->
  <a-collapse class="oio-collapse oio-collapse-stripe" v-model:activeKey="activeKey">
    <a-collapse-panel class="oio-collapse-panel" key="1" header="面板1">
      <p>这是一段文本</p>
    </a-collapse-panel>
    <a-collapse-panel class="oio-collapse-panel" key="2" header="面板2">
      <p>这是一段文本</p>
    </a-collapse-panel>
    <a-collapse-panel class="oio-collapse-panel" key="3" header="面板3">
      <p>这是一段文本</p>
    </a-collapse-panel>
  </a-collapse>
</template>
```

更多使用方式，可参考：[Antd Collapse 折叠面板 For Vue](https://www.antdv.com/components/collapse-cn)

#### **API**

##### oio-collapse

**Props**

| **参数名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| activeKey | string   | `string[]`                                             | - |
| type | `OioCollapseType`   | `'bordered'`        | 折叠面板类型，可选值：`bordered`、`stripe`、`simple`、`ghost` |
| collapseMethod | `OioCollapseMethod` | `'default'`         | 折叠触发方式，可选值：`default`（点击头部）、`header`（点击标题）、`icon`（点击图标） |
| accordion | boolean | false | 是否开启手风琴模式（每次仅激活一个面板） |
| expandIconPosition | `OioCollapseExpandIconPosition` | `'right'`           | 展开图标位置，可选值：`right`（右侧）、`left`（左侧）、`hidden`（隐藏） |
| destroyInactivePanel | boolean | false | 是否销毁未激活面板的 DOM 节点 |
| layout | `FormLayout`        | - | 表单布局 |
| invisible | boolean | - | 是否隐藏组件 |
| disabled | boolean | - | 是否禁用所有面板 |
| componentData | Record<string, unknown> | - | 第三方扩展属性 |


**Events**

| **事件名** | **参数类型** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:active-key | string   | `string[]`                                             |


** Slots**

| **插槽名** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | 面板内容容器 |


**Methods**

| **方法名** | **参数** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| getPanelKeys | - | 获取所有面板的键 |


##### oio-collapse-panel

**Props**

| **参数名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| key | string | - | 面板唯一标识（必填） |
| forceRender | boolean | - | 是否强制渲染面板（即使未激活） |
| collapseMethod | `OioCollapseMethod` | 继承自父组件 | 单个面板的折叠触发方式（优先级高于父组件） |
| header | string   | VNode                                                 | `'折叠面板项'`      |
| showArrow | boolean | 继承自父组件 | 是否显示展开图标（若父组件 `expandIconPosition` 为 `hidden`，则无效） |
| layout | `FormLayout`        | - | 表单布局 |
| invisible | boolean | - | 是否隐藏当前面板 |
| disabled | boolean | - | 是否禁用当前面板 |
| componentData | Record<string, unknown> | - | 第三方扩展属性 |


**Slots**

| **插槽名** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | 面板内容 |
| header | 自定义标题内容 |
| extra | 标题右侧附加内容 |


### Empty 空状态

#### 基础用法

``` vue
<template>
  <oio-empty-data />
</template>
```

#### 自定义描述

``` vue
<template>
  <oio-empty-data description="空描述" />
  <oio-empty-data>
    <template #description>
      <span>空描述</span>
    </template>
  </oio-empty-data>
</template>
```

#### **API**

**Props**

| **参数名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| loading | boolean | `undefined`         | 是否显示加载状态（`true` 显示加载动画，`false` 显示空状态） |
| loadingIndicator | VNode | - | 自定义加载图标 |
| wrapperClassName | string   | `string[]`                                             | - |
| image | string | - | 空状态图片的 URL 或路径 |
| description | string | `'暂无数据'`<br/>（通过 `$translate`<br/> 获取） | 空状态描述文本（若未传入且无 `description`<br/> 插槽，默认显示国际化文本） |


**Slots**

| **插槽名** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| image | 自定义空状态图片内容 |
| description | 自定义空状态描述文本 |


### Gallery 画廊

#### 基础用法

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
        description: `这是一段描述${i}`
      });
    }

    return {
      list
    };
  }
});
</script>
```

#### 自定义列数和间距

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

| **参数名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| loading | boolean | `undefined`         | 是否显示加载状态（`true`<br/> 显示加载动画，`false`<br/> 隐藏） |
| loadingIndicator | VNode | - | 自定义加载图标 |
| wrapperClassName | string   | `string[]`                                             | - |
| list | Record<string, unknown>[] | `required`          | 数据列表（每个对象需包含唯一标识字段） |
| itemKey | string | `'id'`              | 数据项唯一标识字段名 |
| cols | number | `4`                 | 列数（每行显示的项目数） |
| gutter | CommonGutterType | - | 网格间距（支持数值、数组或对象，如 `16`<br/>、`[16, 24]`<br/>） |
| itemClassName | string   | `string[]`                                             | - |
| itemStyle | CSSStyle | - | 数据项容器的样式 |


**Slots**

| **插槽名** | **参数** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | `{ key: string, data: Record<string, unknown>, index: number }` | 数据项内容 |
| header | - | 头部内容 |
| footer | - | 底部内容 |


### Group 分组

#### 基础用法

``` vue
<template>
  <oio-group title="标题">
    <p>这是一段内容</p>
  </oio-group>
</template>
```

#### 带描述和帮助提示的分组

``` vue
<template>
  <oio-group title="标题" description="这是分组的详细描述" help="这是帮助提示内容">
    <p>这是一段内容</p>
  </oio-group>
</template>
```

#### 带工具栏的分组

``` vue
<template>
  <oio-group title="标题">
    <p>这是一段内容</p>
    <template #titleToolbar>
      <oio-button>操作按钮</oio-button>
    </template>
  </oio-group>
</template>
```

#### **API**

**Props**

| **参数名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| title | string   | boolean                                               | undefined |
| description | string | - | 分组描述信息 |
| border | boolean | true | 是否显示边框 |
| wrapperClassName | string   | `string[]`                                             | - |
| wrapperStyle | string   | CSSStyle                                              | - |
| toolbarClassName | string   | `string[]`                                             | - |
| toolbarStyle | string   | CSSStyle                                              | - |
| help | string | '' | 帮助提示内容 |
| helpAdjustOverflow | boolean | true | 帮助提示是否自动调整位置避免溢出 |
| helpBgColor | string | - | 帮助提示的背景色 |
| helpPlacement | string | 'top' | 帮助提示的位置，可选值：'top', 'bottom', 'left', 'right' 等 |
| helpIcon | string | 'oinone-wenhao' | 帮助图标的类名 |
| helpIconColor | string | 'var(--oio-primary-color)' | 帮助图标的颜色 |
| helpIconSize | string | 'var(--oio-font-size)' | 帮助图标的大小 |


**Slots**

| **插槽名** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | 分组内容区域 |
| title | 自定义标题内容 |
| titleToolbar | 标题右侧工具栏内容 |


### Tabs 标签页

#### 基础用法

``` vue
<template>
  <oio-tabs v-model:active-key="activeKey">
    <oio-tab key="1" tab="标签1">内容1</oio-tab>
    <oio-tab key="2" tab="标签2">内容2</oio-tab>
    <oio-tab key="3" tab="标签3" force-render>内容3</oio-tab>
    <oio-tab key="4" tab="标签4" disabled>内容4</oio-tab>
  </oio-tabs>
</template>
```

#### 居中

``` vue
<template>
  <oio-tabs v-model:active-key="activeKey" :component-data="{ centered: true }">
    <oio-tab key="1" tab="标签1">内容1</oio-tab>
    <oio-tab key="2" tab="标签2">内容2</oio-tab>
    <oio-tab key="3" tab="标签3">内容3</oio-tab>
  </oio-tabs>
</template>
```

#### 页签左右附加操作按钮

``` vue
<template>
  <oio-tabs v-model:active-key="activeKey">
    <oio-tab key="1" tab="标签1">内容1</oio-tab>
    <oio-tab key="2" tab="标签2">内容2</oio-tab>
    <oio-tab key="3" tab="标签3">内容3</oio-tab>
    <template #tabBarLeftExtraContent>
      <oio-button style="margin-right: 16px">左侧操作按钮</oio-button>
    </template>
    <template #tabBarExtraContent>
      <oio-button>右侧操作按钮</oio-button>
    </template>
  </oio-tabs>
</template>
```

#### 左侧页签

``` vue
<template>
  <oio-tabs v-model:active-key="activeKey" tab-position="left">
    <oio-tab key="1" tab="标签1">内容1</oio-tab>
    <oio-tab key="2" tab="标签2">内容2</oio-tab>
    <oio-tab key="3" tab="标签3">内容3</oio-tab>
  </oio-tabs>
</template>
```

#### 卡片式页签

``` vue
<template>
  <oio-tabs v-model:active-key="activeKey" type="card">
    <oio-tab key="1" tab="标签1">内容1</oio-tab>
    <oio-tab key="2" tab="标签2">内容2</oio-tab>
    <oio-tab key="3" tab="标签3">内容3</oio-tab>
  </oio-tabs>
</template>
```

#### 可编辑页签

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
      { title: '标签1', content: '内容1', key: '1' },
      { title: '标签2', content: '内容2', key: '2' },
      { title: '标签3', content: '内容3', key: '3', closable: false }
    ]);

    const newTabIndex = ref(0);

    const add = () => {
      activeKey.value = `newTab${++newTabIndex.value}`;
      panes.value.push({ title: '新页签', content: '新页签内容', key: activeKey.value });
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

| **参数名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| activeKey | string   | number                                                | - |
| tabPosition | `OioTabPosition`    | `'top'`             | 标签位置，可选值：`top`（顶部）、`bottom`（底部）、`left`（左侧）、`right`（右侧） |
| verticalHeight | number   | string                                                | - |
| destroyInactiveTabPane | boolean | false | 是否销毁未激活面板的 DOM 节点 |
| type | `OioTabsType` | - | 标签页类型，可选值：`line`（默认）、`card`（卡片式页签）、`editable-card`（可编辑页签） |
| layout | `FormLayout`        | - | 表单布局配置 |
| invisible | boolean | - | 是否隐藏整个标签页容器 |
| disabled | boolean | false | 是否禁用所有标签（禁用后无法点击切换） |
| componentData | Record<string, unknown> | - | 第三方扩展属性（透传给底层组件） |


**Events**

| **事件名** | **参数类型** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:active-key | string   | number                                                |


**Slots**

| **插槽名** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | 标签面板内容（包含 `OioTab` 子组件） |
| tabBarLeftExtraContent                                       | 标签栏左侧附加内容（如操作按钮） |
| tabBarExtraContent | 标签栏右侧附加内容（如操作按钮） |


##### oio-tab

**Props**

| **参数名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| key | string | `required`          | 面板唯一标识（必填，需与父组件 `OioTabs`<br/> 的面板键对应） |
| tab | string   | VNode                                                 | - |
| forceRender | boolean | - | 是否强制渲染面板（即使未激活） |
| layout | `FormLayout`        | - | 表单布局配置 |
| invisible | boolean | - | 是否隐藏面板（配合父组件 `OioTabs` 的隐藏逻辑） |
| disabled | boolean | - | 是否禁用面板（禁用后标签不可点击，内容不可交互） |
| componentData | Record<string, unknown> | - | 第三方扩展属性（透传给底层组件） |


**Slots**

| **插槽名** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | 面板内容 |
| tab | 自定义标签内容 |


### Tooltip 文字提示

#### 基础用法

``` vue
<template>
  <oio-tooltip title="这是提示内容">hover trigger</oio-tooltip>
</template>
```

#### 点击触发

``` vue
<template>
  <oio-tooltip title="这是提示内容" trigger="click">click trigger</oio-tooltip>
</template>
```

#### 提示在右侧

``` vue
<template>
  <oio-tooltip title="这是提示内容" placement="rm">hover trigger</oio-tooltip>
</template>
```

#### **API**

**Props**

| **参数名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| visible | boolean | `undefined`         | 是否显示提示框（双向绑定，`disabled` 为 `true` 时无效） |
| title | string | - | 提示内容（支持字符串，或通过 `title`<br/> 插槽自定义） |
| trigger | `PopperTrigger`     | `'hover'`           | 触发方式，可选值：`hover`（悬停）、`click`（点击）、`focus`（聚焦）、`manual`（手动）、`contextmenu`（右键） |
| placement | `OioTooltipPlacement` | `'bm'`（底部中间） | 提示框位置，可选值见枚举 `OioTooltipPlacement` |
| destroyOnHide | boolean | `true`              | 隐藏时是否销毁提示框 DOM 节点 |
| disabled | boolean | `false`             | 是否禁用提示框（禁用后无法触发显示） |
| overlayClassName | string | - | 提示框浮层的类名 |
| overlayStyle | string   | CSSStyle                                              | - |
| getTriggerContainer | (triggerNode: HTMLElement) => HTMLElement | - | 提示框容器挂载点（默认挂载到 `body`<br/>，可指定父级容器） |


**Events**

| **事件名** | **参数类型** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:visible | boolean | 显示状态变化时触发（双向绑定） |


**Slots**

| **插槽名** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | 触发提示的内容（如按钮） |
| title | 自定义提示内容（支持 HTML） |


### Tree 树形控件

#### 基础用法

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

#### 仅应用 Oinone 主题样式

``` vue
<template>
  <a-tree class="oio-tree" :tree-data="treeData" />
</template>
```

更多使用方式，可参考：[Antd Tree 树形控件 For Vue](https://3x.antdv.com/components/tree-cn)

#### API

**Props**

| **参数名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| loading | boolean | `undefined`         | 是否显示加载状态（`true` 显示加载动画） |
| wrapperClassName | string   | `string[]`                                             | - |
| data | OioTreeNode[] | - | 树结构数据 |
| loadData | (node: OioTreeNode) => Promise<`void`> | - | 懒加载数据函数（动态数据，与 `data`<br/> 二选一） |
| loadedKeys | `string[]`| - | 已加载节点的键（内部维护，支持双向绑定） |
| selectable | boolean | `undefined`         | 是否允许节点选择 |
| selectedKeys | `string[]`| - | 选中节点的键（支持双向绑定） |
| expandedKeys | `string[]`| - | 展开节点的键（支持双向绑定） |
| checkable | boolean | `undefined`         | 是否启用勾选功能 |
| checkedKeys | `string[]`| { checked: string[]; halfChecked: `string[]`}          | - |
| checkStrictly | boolean | `undefined`         | 是否严格遵循父子节点关联（取消勾选父节点时是否自动取消子节点） |
| blockNode | boolean | `undefined`         | 是否以块级节点展示（占据整行） |
| showIcon | boolean | `undefined`         | 是否显示节点图标 |
| showLine | boolean | `undefined`         | 是否显示节点连接线 |


**Events**

| **事件名** | **参数类型** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:expandedKeys | `string[]`| 展开节点变化时触发（双向绑定） |
| update:selectedKeys | `string[]`| 选中节点变化时触发（双向绑定） |
| update:checkedKeys | `string[]`| { checked: string[]; halfChecked: `string[]`}          |
| update:loadedKeys | `string[]`| 已加载节点变化时触发（内部使用） |
| selected | `TreeNodeSelectedEvent`                                      | 节点选中 / 取消选中时触发 |
| expanded | `TreeNodeExpandedEvent`                                      | 节点展开 / 收起时触发 |
| checked | `TreeNodeCheckedEvent`                                       | 节点勾选状态变化时触发 |


**Slots**

| **插槽名** | **参数** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| title | `{ node: OioTreeNode }` | 自定义节点标题 |
| icon | `{ node: OioTreeNode }` | 自定义节点图标 |
| switcherIcon | `{ node: OioTreeNode }` | 自定义展开 / 收起图标 |


## （六）反馈

### Drawer 抽屉

#### 基础用法

``` vue
<template>
  <oio-button @click="showDrawer">打开抽屉</oio-button>
  <oio-drawer v-model:visible="visible" title="基础用法">
    <p>这是一些内容...</p>
    <p>这是一些内容...</p>
    <p>这是一些内容...</p>
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

#### 添加帮助文案

``` vue
<template>
  <oio-button @click="showDrawer">打开抽屉</oio-button>
  <oio-drawer v-model:visible="visible" title="基础用法" help="这是最简单的抽屉">
    <p>这是一些内容...</p>
    <p>这是一些内容...</p>
    <p>这是一些内容...</p>
  </oio-drawer>
</template>
```

#### 添加一些操作按钮

``` vue
<template>
  <oio-button @click="showDrawer">打开抽屉</oio-button>
  <oio-drawer v-model:visible="visible" title="基础用法">
    <p>这是一些内容...</p>
    <p>这是一些内容...</p>
    <p>这是一些内容...</p>
    <template #footer>
      <oio-button type="primary">确定</oio-button>
      <oio-button>取消</oio-button>
    </template>
  </oio-drawer>
</template>
```

#### 关闭抽屉回调

``` vue
<template>
  <oio-button @click="showDrawer">打开抽屉</oio-button>
  <oio-drawer v-model:visible="visible" title="关闭回调" :cancel-callback="cancelCallback">
    <p>这是一些内容...</p>
    <p>这是一些内容...</p>
    <p>这是一些内容...</p>
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
      // 返回 true 则关闭抽屉，否则不关闭
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

| **参数名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| zIndex | number | `1000`              | 抽屉层叠顺序（CSS z-index） |
| wrapperClassName | string   | `string[]`                                             | - |
| wrapperProps | object | - | 外层容器属性（透传给 DOM 节点） |
| mask | boolean | `undefined`         | 是否显示遮罩层 |
| maskClosable | boolean | `undefined`         | 点击遮罩是否可关闭抽屉 |
| title | string | `'抽屉'`            | 抽屉标题 |
| help | string | - | 标题右侧帮助提示内容 |
| placement | `DrawerPlacement`<br/>  | keyof typeof DrawerPlacement                          | `'right'`           |
| width | number   | string                                                       |  `DrawerWidth` |
| height | number   | string                                                       |  `DrawerHeight` |
| headerInvisible | boolean | `undefined`         | 是否隐藏头部区域 |
| footerInvisible | boolean | `undefined`         | 是否隐藏底部区域 |
| visible | boolean | `undefined`         | 是否显示抽屉（双向绑定） |
| closable | boolean | `undefined`         | 是否显示关闭图标 |
| keyboard | boolean | `undefined`         | 是否支持键盘 ESC 关闭 |
| destroyOnClose | boolean | `true`              | 关闭时是否销毁内部元素 |
| getTriggerContainer | (triggerNode: Node | HTMLElement) => Node                                         | HTMLElement                                           |
| cancelCallback | (event: PointerEvent, data: object) => Promise<boolean | void>                                                 | - |
| loading | boolean | `false`             | 是否显示全局加载状态 |


**Events**

| **事件名** | **参数类型** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:visible | boolean | 显示状态变化时触发（双向绑定） |


**Slots**

| **插槽名** | **参数** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | `{ data: object }`  | 抽屉内容区域 |
| title | - | 自定义标题内容 |
| header | - | 自定义头部区域（优先级高于 `title` 插槽） |
| footer | - | 自定义底部区域 |
| closeIcon | - | 自定义关闭图标 |


### Message 全局提示

#### 基础用法

``` vue
<template>
  <oio-button @click="openMessage">打开消息提示</oio-button>
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
      OioMessage.info('这是消息提示内容', {
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

更多使用方式，可参考：[Antd Message 全局提示 For Vue](https://3x.antdv.com/components/message-cn)

#### API

##### OioMessage

| **方法名** | **参数列表** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| open | `(type: NotificationType, message: string, options?: OioNotificationOptions) => void` | 通用打开方法，根据类型显示对应消息 |
| info | `(message: string, options?: OioNotificationOptions) => void` | 显示提示类型消息 |
| success | `(message: string, options?: OioNotificationOptions) => void` | 显示成功类型消息 |
| warning | `(message: string, options?: OioNotificationOptions) => void` | 显示警告类型消息 |
| error | `(message: string, options?: OioNotificationOptions) => void` | 显示错误类型消息 |


##### OioNotificationOptions

| **参数名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| duration | number | `3`                 | 通知显示时长（秒），`0`<br/> 为永久显示 |
| class | string | - | 自定义通知类名（会自动添加基础类名） |
| ... | ... | ... | 其他第三方参数 |


### Modal 对话框

#### 基础用法

``` vue
<template>
  <oio-button @click="showModal">打开弹窗</oio-button>
  <oio-modal v-model:visible="visible" title="基础用法">
    <p>这是一些内容...</p>
    <p>这是一些内容...</p>
    <p>这是一些内容...</p>
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

#### 添加帮助文案

``` vue
<template>
  <oio-button @click="showModal">打开弹窗</oio-button>
  <oio-modal v-model:visible="visible" title="基础用法" help="这是最简单的弹窗">
    <p>这是一些内容...</p>
    <p>这是一些内容...</p>
    <p>这是一些内容...</p>
  </oio-modal>
</template>
```

#### 关闭弹窗回调

``` vue
<template>
  <oio-button @click="showModal">打开弹窗</oio-button>
  <oio-modal
    v-model:visible="visible"
    title="关闭回调"
    :enter-callback="enterCallback"
    :cancel-callback="cancelCallback"
  >
    <p>这是一些内容...</p>
    <p>这是一些内容...</p>
    <p>这是一些内容...</p>
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
      // 返回 true 则关闭弹窗，否则不关闭
      return true;
    };

    const cancelCallback = (): boolean => {
      console.log('modal closed by cancel button.');
      // 返回 true 则关闭弹窗，否则不关闭
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

#### 渲染表单及数据回填

``` vue
<template>
  <oio-button @click="showModal">打开弹窗</oio-button>
  <oio-modal
    v-model:visible="visible"
    title="渲染表单"
    :data="formData"
    :enter-callback="enterCallback"
    :cancel-callback="cancelCallback"
  >
    <template #default="{ data }">
      <oio-form :data="data" layout="vertical">
        <oio-form-item label="名称">
          <oio-input v-model:value="data.name" />
        </oio-form-item>
        <oio-form-item label="描述">
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
      name: '名称',
      description: ''
    });

    const enterCallback = (e: PointerEvent, data: DataType): boolean => {
      // 保存当前表单数据
      formData.value = data;
      console.log('modal closed by enter button.', data);
      // 返回 true 则关闭弹窗，否则不关闭
      return true;
    };

    const cancelCallback = (e: PointerEvent, data: DataType): boolean => {
      console.log('modal closed by cancel button.', data);
      // 返回 true 则关闭弹窗，否则不关闭
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

#### **API 定义**

**Props**

| **参数名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| zIndex | number | `1000`              | 模态框层叠顺序（CSS z-index） |
| wrapperClassName | string   | `string[]`                                             | - |
| wrapperProps | object | - | 外层容器属性（透传给 DOM 节点） |
| mask | boolean | `undefined`         | 是否显示遮罩层 |
| maskClosable | boolean | `undefined`         | 点击遮罩是否可关闭模态框 |
| title | string | `'对话框'`          | 模态框标题 |
| help | string | - | 标题右侧帮助提示内容 |
| width | number   | string                                                       |  `ModalWidthType` |
| height | number   | string                                                       |  `ModalWidthType` |
| headerInvisible | boolean | `undefined`         | 是否隐藏头部区域 |
| footerInvisible | boolean | `undefined`         | 是否隐藏底部区域 |
| visible | boolean | `undefined`         | 是否显示模态框（双向绑定） |
| closable | boolean | `undefined`         | 是否显示关闭图标 |
| keyboard | boolean | `undefined`         | 是否支持键盘 ESC 关闭 |
| destroyOnClose | boolean | `undefined`         | 关闭时是否销毁内部元素 |
| getTriggerContainer | (triggerNode: Node | HTMLElement) => Node                                         | HTMLElement                                           |
| enterCallback | (event: PointerEvent, data: object) => Promise<boolean | void>                                                 | - |
| cancelCallback | (event: PointerEvent, data: object) => Promise<boolean | void>                                                 | - |
| loading | boolean | `undefined`         | 是否显示全局加载状态 |
| confirmLoading | boolean | `undefined`         | 确认按钮加载状态 |
| draggable | boolean | `false`             | 是否支持拖拽模态框 |
| enterText | string | `'确定'`            | 确认按钮文本 |
| cancelText | string | `'取消'`            | 取消按钮文本 |
| data | object | `{}`                | 传递给插槽的自定义数据 |
| copy | boolean | `true`              | 是否深度复制数据（`deep` 为 `true` 时生效） |
| deep | boolean | `false`             | 是否深度监听数据变化 |


**Events**

| **事件名** | **参数类型** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:visible | boolean | 显示状态变化时触发（双向绑定） |


**Slots**

| **插槽名** | **参数** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | `{ data: object }`  | 模态框内容区域 |
| title | - | 自定义标题内容 |
| header | - | 自定义头部区域（优先级高于 `title` 插槽） |
| footer | - | 自定义底部区域 |
| closeIcon | - | 自定义关闭图标 |


### Notification 通知提醒框

#### 基础用法

``` vue
<template>
  <oio-button @click="openNotification">打开通知</oio-button>
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
      OioNotification.info('标题', '这是通知消息内容', {
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

更多使用方式，可参考：[Antd Notification 通知提醒框 For Vue](https://3x.antdv.com/components/notification-cn)

#### API

##### OioNotification

| **方法名** | **参数列表** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| open | `(type: NotificationType, title: string, message?: string, options?: OioNotificationOptions) => void` | 通用打开方法，显示带标题的通知 |
| info | `(title: string, message?: string, options?: OioNotificationOptions) => void` | 显示提示类型通知 |
| success | `(title: string, message?: string, options?: OioNotificationOptions) => void` | 显示成功类型通知 |
| warning | `(title: string, message?: string, options?: OioNotificationOptions) => void` | 显示警告类型通知 |
| error | `(title: string, message?: string, options?: OioNotificationOptions) => void` | 显示错误类型通知 |


##### OioNotificationOptions

| **参数名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| duration | number | `3`                 | 通知显示时长（秒），`0`<br/> 为永久显示 |
| class | string | - | 自定义通知类名（会自动添加基础类名） |
| ... | ... | ... | 其他第三方参数 |


### Popconfirm 气泡确认框

#### 基础用法

``` vue
<template>
  <oio-popconfirm text="你确认要删除吗？" :confirm-callback="confirmCallback" :cancel-callback="cancelCallback">
    <oio-button type="primary" biz-style="danger">删除</oio-button>
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

#### 条件触发

``` vue
<template>
  <oio-popconfirm
    text="你确认要删除吗？"
    :condition="condition"
    :confirm-callback="confirmCallback"
    :cancel-callback="cancelCallback"
  >
    <oio-button type="primary" biz-style="danger">删除</oio-button>
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

| **参数名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| visible | boolean | `undefined`         | 是否显示弹出框（双向绑定，`manual` 为 `true` 时需手动控制） |
| manual | boolean | `false`             | 是否开启手动控制模式（`true` 时 `visible` 变化不会自动显示 / 隐藏） |
| destroyOnClose | boolean | `undefined`         | 关闭时是否销毁弹出框 DOM 节点 |
| title | string | `'警告'`            | 弹出框标题 |
| text | string | `'确定是否执行此操作?'` | 弹出框提示文本 |
| overlayClassName | string | - | 弹出框浮层的类名 |
| placement | `PopconfirmPlacement` | `'tm'`                                                       | 弹出框位置（枚举值见上方说明，默认顶部中间） |
| enterText | string | `'确定'`            | 确认按钮文本 |
| cancelText | string | `'取消'`            | 取消按钮文本 |
| condition | boolean  | () => boolean                                                | Promise<`boolean`>                                      |
| confirmCallback | () => void | - | 确认按钮点击回调 |
| cancelCallback | () => void | - | 取消按钮点击回调 |
| getTriggerContainer | (triggerNode: Node | HTMLElement) => Node                                         | HTMLElement                                           |


**Events**

| **事件名** | **参数类型** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| update:visible | boolean | 显示状态变化时触发（双向绑定） |


**Slots**

| **插槽名** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | 触发弹出框的内容（如按钮） |
| title | 自定义标题内容 |
| icon | 自定义标题左侧图标 |


### Spin 加载中

#### 基础用法

``` vue
<template>
  <oio-spin />
</template>
```

#### 遮罩任意元素

``` vue
<template>
  <oio-spin>
    <div style="width: 300px; height: 300px">
      <h4>标题</h4>
      <p>这是一段内容</p>
    </div>
  </oio-spin>
</template>
```

#### 各种大小

``` vue
<template>
  <oio-spin size="small" />
  <oio-spin />
  <oio-spin size="large" />
</template>
```

#### 放入容器中

``` vue
<template>
  <div style="padding: 30px 50px; background-color: rgba(0, 0, 0, 0.05); text-align: center">
    <oio-spin />
  </div>
</template>
```

#### 手动控制加载状态

``` vue
<template>
  <div>
    <span>加载状态:</span>
    <oio-switch v-model:checked="loading" />
  </div>
  <oio-spin :loading="loading">
    <div style="width: 300px; height: 300px">
      <h4>标题</h4>
      <p>这是一段内容</p>
    </div>
  </oio-spin>
</template>
```

#### **API**

**Props**

| **参数名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| loading | boolean | `undefined`         | 是否显示加载状态（`undefined`<br/> 时默认显示） |
| loadingIndicator | VNode | - | 自定义加载图标（需传入虚拟节点，如 `<LoadingOutlined />`<br/>） |
| wrapperClassName | string   | `string[]`                                             | - |
| size | `SpinSize`<br/>  | keyof typeof SpinSize                                        | number                                                |
| delay | number | - | 延迟显示时间（毫秒，`loading`<br/> 为 `true`<br/> 后延迟指定时间显示加载图标） |
| tip | string   | Slot                                                  | - |


**Slots**

| **插槽名** | **描述** | **参数** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | 自定义加载内容 | - |
| tip | 自定义提示文本内容 | - |

