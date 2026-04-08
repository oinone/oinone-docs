---
title: Vue UI
index: true
category:
  - 研发手册
  - Reference
  - Oio 组件
order: 3
next:
  text: Metadata Service
  link: /zh/DevManual/Reference/Front-EndFramework/Services/metadata-service.md
---

在 Oinone Kunlun 中，有一部分组件是基于一些独立功能的第三方组件库实现的，比如：`Vxe-Table`、`vuedraggable` 等。这些组件不仅可以用于 Widget 组件，也可以直接通过 Vue 原生写法用于任何一个 Vue 组件。这篇文章将详细介绍这些组件的用法及 API 定义。

# 一、引入

``` typescript
import { OioTable } from '@oinone/kunlun-vue-ui';
```

# 二、Reference List

## （一）Table 表格

### 基础用法

``` vue
<template>
  <oio-table :data="tableData">
    <oio-column label="名称" field="name" />
    <oio-column label="描述" field="description" />
  </oio-table>
</template>
<script lang="ts">
import { OioColumn, OioTable } from '@oinone/kunlun-dependencies';
import { defineComponent, ref } from 'vue';

interface DataItem {
  name: string;
  description: string;
}

export default defineComponent({
  components: {
    OioTable,
    OioColumn
  },
  props: {},
  setup(props) {
    const tableData = ref<DataItem[]>([]);

    for (let i = 1; i <= 50; i++) {
      tableData.value.push({
        name: `名称${i}`,
        description: `这是一段描述 ${i}`
      });
    }

    return {
      tableData
    };
  }
});
</script>
```

### 固定表头

``` vue
<template>
  <oio-table :data="tableData" height="100%">
    <oio-column label="名称" field="name" />
    <oio-column label="描述" field="description" />
  </oio-table>
</template>
```

### 分组表头

``` vue
<template>
  <oio-table :data="tableData" height="100%">
    <oio-column label="名称" field="name" />
    <oio-column label="描述" field="description" />
    <oio-colgroup label="地址">
      <oio-column label="省" field="address.province" />
      <oio-column label="市" field="address.city" />
      <oio-column label="区" field="address.district" />
    </oio-colgroup>
  </oio-table>
</template>
<script lang="ts">
import { OioColgroup, OioColumn, OioTable } from '@oinone/kunlun-dependencies';
import { defineComponent, ref } from 'vue';

interface DataItem {
  name: string;
  description: string;
  address: {
    province: string;
    city: string;
    district: string;
  };
}

export default defineComponent({
  components: {
    OioTable,
    OioColumn,
    OioColgroup
  },
  props: {},
  setup(props) {
    const tableData = ref<DataItem[]>([]);

    for (let i = 1; i <= 50; i++) {
      tableData.value.push({
        name: `名称${i}`,
        description: `这是一段描述 ${i}`,
        address: {
          province: '省',
          city: '市',
          district: '区'
        }
      });
    }

    return {
      tableData
    };
  }
});
</script>
```

### 冻结操作列

``` vue
<template>
  <div style="width: 1000px; height: 800px">
    <oio-table :data="tableData" height="100%">
      <oio-column label="名称" field="name" width="200px" />
      <oio-column label="描述" field="description" min-width="300px" />
      <oio-column label="性别" field="sex" min-width="300px" />
      <oio-column label="年龄" field="age" min-width="300px" />
      <oio-column label="操作" fixed="right" width="200px">
        <template #default>
          <div style="display: flex; column-gap: 16px">
            <oio-button type="link">操作1</oio-button>
            <oio-button type="link">操作2</oio-button>
          </div>
        </template>
      </oio-column>
    </oio-table>
  </div>
</template>
```

### 可调整列宽

``` vue
<template>
  <oio-table :data="tableData" height="100%" resizable>
    <oio-column label="名称" field="name" />
    <oio-column label="描述" field="description" />
  </oio-table>
</template>
```

### 全边框样式和斑马纹

``` vue
<template>
  <oio-table :data="tableData" height="100%" border="full" stripe>
    <oio-column label="名称" field="name" />
    <oio-column label="描述" field="description" />
  </oio-table>
</template>
```

### 筛选和排序

``` vue
<template>
  <oio-table :data="tableData" height="100%" border="full" stripe>
    <oio-column label="名称" field="name" />
    <oio-column label="描述" field="description" />
    <oio-column
      label="性别"
      field="sex"
      :component-data="{
        filters: sexFilters,
        filterMultiple: false
      }"
    />
    <oio-column label="年龄" field="age" sortable />
  </oio-table>
</template>
<script lang="ts">
import { OioColgroup, OioColumn, OioTable } from '@oinone/kunlun-dependencies';
import { random } from 'lodash-es';
import { defineComponent, ref } from 'vue';
import type { VxeColumnPropTypes } from 'vxe-table';

interface DataItem {
  name: string;
  description: string;
  age: number;
  sex: 'woman' | 'man';
}

export default defineComponent({
  components: {
    OioTable,
    OioColumn,
    OioColgroup
  },
  props: {},
  setup(props) {
    const tableData = ref<DataItem[]>([]);

    for (let i = 1; i <= 50; i++) {
      tableData.value.push({
        name: `名称${i}`,
        description: `这是一段描述 ${i}`,
        age: random(100),
        sex: i % 3 === 0 ? 'woman' : 'man'
      });
    }

    const sexFilters: VxeColumnPropTypes.Filters = [
      { label: '男', value: 'man' },
      { label: '女', value: 'woman' }
    ];

    return {
      tableData,
      sexFilters
    };
  }
});
</script>
```

### 格式化内容

``` vue
<template>
  <oio-table :data="tableData" height="100%" border="full" stripe>
    <oio-column label="名称" field="name" />
    <oio-column label="描述" field="description" />
    <oio-column
      label="性别"
      field="sex"
      :component-data="{
        formatter: sexFormatter
      }"
    />
    <oio-column
      label="年龄"
      field="age"
      :component-data="{
        formatter: ageFormatter
      }"
    />
  </oio-table>
</template>
<script lang="ts">
import { OioColgroup, OioColumn, OioTable } from '@oinone/kunlun-dependencies';
import { random } from 'lodash-es';
import { defineComponent, ref } from 'vue';
import type { RowVO, VxeColumnPropTypes } from 'vxe-table';

interface DataItem {
  name: string;
  description: string;
  age: number;
  sex: 'Woman' | 'Man';
}

export default defineComponent({
  components: {
    OioTable,
    OioColumn,
    OioColgroup
  },
  props: {},
  setup(props) {
    const tableData = ref<DataItem[]>([]);

    for (let i = 1; i <= 50; i++) {
      tableData.value.push({
        name: `名称${i}`,
        description: `这是一段描述 ${i}`,
        age: random(100),
        sex: i % 3 === 0 ? 'Woman' : 'Man'
      });
    }

    const sexFormatter: VxeColumnPropTypes.Formatter<RowVO> = ({ cellValue }) => {
      if (cellValue === 'Man') {
        return '男';
      }
      if (cellValue === 'Woman') {
        return '女';
      }
      return cellValue;
    };

    const ageFormatter: VxeColumnPropTypes.Formatter<RowVO> = ({ cellValue }) => {
      return `${cellValue}岁`;
    };

    return {
      tableData,
      sexFormatter,
      ageFormatter
    };
  }
});
</script>
```

### 复选框

``` vue
<template>
  <oio-table
    :data="tableData"
    height="100%"
    border="full"
    stripe
    @checked-all-change="onCheckedAllChange"
    @checked-change="onCheckedChange"
  >
    <oio-column type="checkbox" width="52" />
    <oio-column label="名称" field="name" />
    <oio-column label="描述" field="description" />
    <oio-column label="性别" field="sex" />
    <oio-column label="年龄" field="age" />
  </oio-table>
</template>
<script lang="ts">
import { CheckedChangeEvent, OioColgroup, OioColumn, OioTable } from '@oinone/kunlun-dependencies';
import { random } from 'lodash-es';
import { defineComponent, ref } from 'vue';

interface DataItem {
  name: string;
  description: string;
  age: number;
  sex: 'Woman' | 'Man';
}

export default defineComponent({
  components: {
    OioTable,
    OioColumn,
    OioColgroup
  },
  props: {},
  setup(props) {
    const tableData = ref<DataItem[]>([]);

    for (let i = 1; i <= 50; i++) {
      tableData.value.push({
        name: `名称${i}`,
        description: `这是一段描述 ${i}`,
        age: random(100),
        sex: i % 3 === 0 ? 'Woman' : 'Man'
      });
    }

    const onCheckedAllChange = (e: CheckedChangeEvent) => {
      console.log(e);
    };

    const onCheckedChange = (e: CheckedChangeEvent) => {
      console.log(e);
    };

    return {
      tableData,
      onCheckedAllChange,
      onCheckedChange
    };
  }
});
</script>
```

### 前端分页表格

``` vue
<template>
  <div class="table-pagination-demo">
    <oio-table :data="showTableData" height="100%" :loading="loading">
      <oio-column type="checkbox" width="52" />
      <oio-column label="名称" field="name" />
      <oio-column label="描述" field="description" />
      <oio-column label="性别" field="sex" />
      <oio-column label="年龄" field="age" />
      <template #footer>
        <oio-pagination
          :total="total"
          v-model:current-page="currentPage"
          v-model:page-size="currentPageSize"
          @change="onPaginationChange"
        />
      </template>
    </oio-table>
  </div>
</template>
<script lang="ts">
import { OioColgroup, OioColumn, OioTable } from '@oinone/kunlun-dependencies';
import { OioPagination } from '@oinone/kunlun-vue-ui-antd';
import { random } from 'lodash-es';
import { defineComponent, ref } from 'vue';

interface DataItem {
  name: string;
  description: string;
  age: number;
  sex: 'Woman' | 'Man';
}

export default defineComponent({
  components: {
    OioTable,
    OioColumn,
    OioColgroup,
    OioPagination
  },
  props: {},
  setup(props) {
    const allTableData = ref<DataItem[]>([]);
    const showTableData = ref<DataItem[]>([]);
    const loading = ref(false);

    const total = 50;
    const currentPage = ref(1);
    const currentPageSize = ref(15);

    const onPaginationChange = (currentPage: number, pageSize: number) => {
      loading.value = true;
      setTimeout(() => {
        showTableData.value = allTableData.value.slice((currentPage - 1) * pageSize, currentPage * pageSize);
        loading.value = false;
      }, 200);
    };

    for (let i = 1; i <= total; i++) {
      allTableData.value.push({
        name: `名称${i}`,
        description: `这是一段描述 ${i}`,
        age: random(100),
        sex: i % 3 === 0 ? 'Woman' : 'Man'
      });
    }

    onPaginationChange(1, currentPageSize.value);

    return {
      allTableData,
      showTableData,
      loading,
      total,
      currentPage,
      currentPageSize,
      onPaginationChange
    };
  }
});
</script>
<style lang="scss">
.table-pagination-demo {
  height: 500px;
  width: 800px;

  .oio-table-wrapper {
    height: 100%;

    & > .ant-spin-container {
      height: 100%;
    }
  }
}
</style>
```

### API

#### oio-table

**Props**

| **属性名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| size | string | `undefined`         | 表格尺寸，可选值为 `TableSize` 枚举值（如 `'large'`、`'middle'`、`'small'`） |
| resizable | boolean | `undefined`         | 是否允许列宽调整 |
| height | string   | number                                                | `undefined`         |
| border | boolean  | keyof typeof TableBorder                              | `undefined`         |
| stripe | boolean | `undefined`         | 是否显示斑马纹 |
| rowClassName | string   | (row: Record<string, unknown>, rowIndex: number) => string | `undefined`         |
| cellClassName | string   | (row: Record<string, unknown>, column: ColumnInfo, rowIndex: number, columnIndex: number) => string | `undefined`         |
| headerRowClassName | string   | (column: ColumnInfo, columnIndex: number) => string   | `undefined`         |
| headerCellClassName | string   | (column: ColumnInfo, columnIndex: number) => string   | `undefined`         |
| footerRowClassName | string   | Function                                              | `undefined`         |
| footerCellClassName | string   | Function                                              | `undefined`         |
| rowStyle | Object   | (row: Record<string, unknown>, rowIndex: number) => Object | `undefined`         |
| headerRowStyle | Object   | Function                                              | `undefined`         |
| cellStyle | Object   | (row: Record<string, unknown>, column: ColumnInfo, rowIndex: number, columnIndex: number) => Object | `undefined`         |
| headerCellStyle | Object   | Function                                              | `undefined`         |
| customConfig | Record<string, any> | `{}`                | 自定义配置 |
| loading | boolean | `undefined`         | 是否显示加载状态 |
| wrapperClassName | string   | string[]                                              | `undefined`         |
| data | Record<string, unknown>[] | `[]`                | 表格数据 |
| showOverflow | boolean  | keyof typeof TableOverflow                            | `undefined`         |
| showHeaderOverflow | boolean  | keyof typeof TableOverflow                            | `undefined`         |
| showFooterOverflow | boolean  | keyof typeof TableOverflow                            | `undefined`         |
| emptyText | string | `''`                | 空数据提示文本 |
| emptyImage | string | `undefined`         | 空数据提示图片 |
| rowConfig | `VxeTablePropTypes.RowConfig` | `undefined`         | 行配置（如行高、选中样式等），类型为 `VxeTable`<br/> 行配置接口 |
| columnConfig | `VxeTablePropTypes.ColumnConfig` | `undefined`         | 列配置（如对齐方式、排序等） |
| sortConfig | `VxeTablePropTypes.SortConfig` | `undefined`         | 排序配置 |
| radioConfig | `VxeTablePropTypes.SortConfig` | `undefined`         | 单选框配置 |
| checkboxConfig | `VxeTablePropTypes.CheckboxConfig` | `undefined`         | 复选框配置 |
| tooltipConfig | `VxeTablePropTypes.TooltipConfig` | `undefined`         | Tooltip 配置 |
| expandConfig | `VxeTablePropTypes.ExpandConfig` | `undefined`         | 展开行配置 |
| editConfig | `VxeTablePropTypes.EditConfig` | `undefined`         | 可编辑配置 |
| treeConfig | `VxeTablePropTypes.TreeConfig` | `undefined`         | 树形表格配置 |
| scrollX | `VxeTablePropTypes.ScrollX` | `undefined`         | 横向虚拟滚动配置 |
| scrollY | `VxeTablePropTypes.ScrollY` | `undefined`         | 纵向虚拟滚动配置 |
| showFooter | boolean | `undefined`         | 是否显示表尾 |
| footerMethod | `VxeTablePropTypes.FooterMethod` | `undefined`         | 表尾计算方法 |
| spanMethod | `VxeTablePropTypes.SpanMethod` | `undefined`         | 单元格合并方法 |
| mergeCells | `VxeTablePropTypes.MergeCells` | `[]`                | 单元格合并配置 |
| componentData | `Record<string, unknown>` | `undefined`         | 第三方扩展属性 |


**Events**

| **事件名** | **参数** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| sort-change | event: SortChangeEvent | 排序状态变化时触发，返回包含排序字段、方向及原始事件的对象 |
| checked-change | event: CheckedChangeEvent | 复选框状态变化时触发（行级），返回包含选中状态、行数据及原始事件的对象 |
| checked-all-change | event: CheckedChangeEvent | 全选复选框状态变化时触发，返回包含全选状态、行数据及原始事件的对象 |
| radio-change | event: RadioChangeEvent | 单选框状态变化时触发，返回包含新旧行数据及原始事件的对象 |
| cell-click | row: Record<string, unknown>, column: ColumnInfo, event: MouseEvent | 单元格点击事件，返回行数据、列信息及鼠标事件对象 |
| cell-dblclick | row: Record<string, unknown>, column: ColumnInfo, event: MouseEvent | 单元格双击事件，返回行数据、列信息及鼠标事件对象 |
| header-cell-click | column: ColumnInfo, event: MouseEvent | 表头单元格点击事件，返回列信息及鼠标事件对象 |
| header-cell-dblclick | column: ColumnInfo, event: MouseEvent | 表头单元格双击事件，返回列信息及鼠标事件对象 |
| toggle-row-expand | row: Record<string, unknown>, isExpand: boolean | 展开行状态切换时触发，返回行数据及展开状态 |
| edit-actived | event: ActiveEditorContext | 单元格进入编辑状态时触发，返回编辑上下文对象 |
| edit-closed | event: ActiveEditorContext | 单元格编辑结束时触发，返回编辑上下文对象 |
| scroll | event: ScrollEvent | 表格滚动时触发，返回滚动事件对象 |


**Slots**

| **插槽名** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | 表格主体内容（列定义） |
| header | 自定义表头内容 |
| footer | 自定义表尾内容 |


**Methods**

| **方法名** | **参数** | **返回值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| getOrigin | - | VxeTableInstance | 获取底层 `VxeTable`<br/> 实例 |
| setCurrentRow | row: Record<string, unknown> | void | 设置当前行（单选状态） |
| clearCurrentRow | - | void | 清除当前行（单选状态） |
| setCheckboxRow | rows: Record<string, unknown>[], checked?: boolean | void | 设置复选框选中行 |
| clearCheckboxRow | - | void | 清除所有复选框选中行 |
| resetCheckboxRow | rows: Record<string, unknown>[] | void | 重置复选框选中行（先清除再设置） |
| setRadioRow | row: Record<string, unknown> | void | 设置单选框选中行 |
| clearRadioRow | - | void | 清除单选框选中行 |
| getAllColumns | - | ColumnInfo[] | 获取所有列配置 |
| refreshColumn | - | void | 刷新列配置 |
| updateFooter | - | void | 刷新表尾计算 |
| loadColumns | columns: ColumnInfo[] | void | 加载列配置（追加模式） |
| reloadColumns | columns: ColumnInfo[] | void | 重新加载列配置（覆盖模式） |
| setEditRow | row: Record<string, unknown> | void | 设置可编辑行 |
| getActiveEditorRecord | - | RowContext | undefined                                             |
| activeCellEditor | row: Record<string, unknown>, fieldOrColumn: string | ColumnInfo                                            | void |
| clearEditor | - | void | 清除所有编辑状态 |
| recalculate | refull?: boolean | void | 重新计算表格布局（可选强制刷新） |
| allRowExpand | - | Promise<`any`> | 展开所有行（返回 Promise） |
| clearAllRowExpand | - | Promise<`any`> | 收起所有行（返回 Promise） |
| setRowExpand | row: Record<string, unknown>, isExpand: boolean | Promise<`any`> | 切换行展开状态（返回 Promise） |
| sort | sortConfs: VxeTableDefines.SortConfs[] | Promise<`any`> | 手动触发排序（返回 Promise） |


更多使用方式，可参考：[vxe-table](https://vxetable.cn/v3/#/table/api)

#### oio-column

**Props**

| **属性名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | ------------------------------------------------------------ | :----------------------------------------------------------- | :----------------------------------------------------------- |
| width | string   | number                                                | `undefined`         |
| minWidth | string   | number                                                | `undefined`         |
| label | string | `undefined`         | 列标题文本 |
| className | string   | ((context: RenderCellContext) => string)              | `undefined`         |
| headerClassName | string   | ((context: RenderCellContext) => string)              | `undefined`         |
| footerClassName | string   | ((context: RenderCellContext) => string)              | `undefined`         |
| align | `ColumnAlignType`                                            | `'left'`            | 单元格内容对齐方式，可选值：`'left'`、`'center'`、`'right'` |
| headerAlign | `ColumnAlignType`                                            | `'left'`            | 表头内容对齐方式 |
| footerAlign | `ColumnAlignType`                                            | `'left'`            | 表尾内容对齐方式 |
| fixed | `ColumnFixedType`                                            | `undefined`         | 列固定位置，可选值：`'left'`、`'right'` 或布尔值（固定左侧） |
| invisible | boolean | `false`             | 是否隐藏列 |
| resizable | boolean | `undefined`         | 是否允许调整列宽 |
| treeNode | boolean | `undefined`         | 是否作为树形表格的节点列 |
| editable | boolean | `false`             | 是否开启单元格编辑功能 |
| cellEditable | boolean  | ((context: RowContext) => boolean)                    | `undefined`         |
| editorTrigger | `TableEditorTrigger`                                         | `'manual'`          | 编辑触发方式，可选值：`'manual'`（手动）、`'click'`（点击） |
| editorMode | `TableEditorMode`                                            | `'cell'`            | 编辑模式，可选值：`'cell'`（单元格内编辑）、`'row'`（行编辑） |
| editorCloseTrigger | `TableEditorCloseTrigger`                                    | `'manual'`          | 编辑关闭触发方式，可选值：`'manual'`（手动）、`'blur'`（失焦） |
| disableEditorRender | boolean | `false`             | 是否禁用编辑状态渲染 |
| rowEditorClosedByEnter | ((context: RowContext) => ReturnPromise<`boolean`>) | `undefined`         | 按回车键关闭编辑时的回调函数（返回 `false` 可阻止关闭） |
| rowEditorClosedByCancel | ((context: RowContext) => ReturnPromise<`boolean`>) | `undefined`         | 点击取消按钮关闭编辑时的回调函数 |
| editorConfirm | string   | ((context: RowContext) => string)                     | `undefined`         |
| editorConfirmPosition | PopconfirmPlacement | ((context: RowContext) => PopconfirmPlacement)        | `'top'`             |
| editorCondition | ((context: RowContext) => ReturnPromise<boolean | undefined>)                                           | `undefined`         |
| editorEnterText | string   | ((context: RowContext) => string)                     | `'确认'`            |
| editorCancelText | string   | ((context: RowContext) => string)                     | `'取消'`            |
| type | string | `undefined`         | 列类型（如 `'seq'` 表示序号列） |
| field | string | `undefined`         | 数据字段名（对应行数据的键） |
| invisibleContent | boolean  | ((context: RowContext) => boolean)                    | `undefined`         |
| sortable | boolean | `undefined`         | 是否开启排序功能 |
| renderDefaultSlot | `CellRenderFunction`                                         | `undefined`         | 自定义单元格内容渲染函数 |
| renderEditSlot | `CellRenderFunction`                                         | `undefined`         | 自定义编辑状态下单元格渲染函数 |
| renderContentSlot | `CellRenderFunction`                                         | `undefined`         | 自定义内容区域渲染函数（备用） |
| renderHeaderSlot | `CellRenderFunction`                                         | `undefined`         | 自定义表头渲染函数 |
| componentData | `Record<string, unknown>`                                    | `undefined`         | 第三方扩展属性 |


**Slots**

| **插槽名** | **类型** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | `(context: RenderRowContext) => VNode[]` | 自定义单元格内容 |
| edit | `(context: RenderRowContext) => VNode[]` | 自定义编辑状态单元格内容 |
| header | `(context: RenderRowContext) => VNode[]` | 自定义表头内容 |


更多使用方式，可参考：[vxe-column](https://vxetable.cn/v3/#/column/api)

#### oio-colgroup

**Props**

| **属性名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | ------------------------------------------------------------ | :----------------------------------------------------------- | :----------------------------------------------------------- |
| width | string   | number                                                | `undefined`         |
| minWidth | string   | number                                                | `undefined`         |
| label | string | `undefined`         | 列组标题文本 |
| className | string   | ((context: RenderCellContext) => string)              | `undefined`         |
| headerClassName | string   | ((context: RenderCellContext) => string)              | `undefined`         |
| footerClassName | string   | ((context: RenderCellContext) => string)              | `undefined`         |
| align | `ColumnAlignType`                                            | `undefined`         | 列组单元格内容对齐方式，可选值：`'left'`、`'center'`、`'right'` |
| headerAlign | `ColumnAlignType`                                            | `'center'`          | 列组表头内容对齐方式（默认居中） |
| footerAlign | `ColumnAlignType`                                            | `undefined`         | 列组表尾内容对齐方式 |
| fixed | `ColumnFixedType`                                            | `undefined`         | 列组固定位置，可选值：`'left'`、`'right'` 或布尔值（固定左侧） |
| invisible | boolean | `false`             | 是否隐藏列组 |
| resizable | boolean | `undefined`         | 是否允许调整列组宽度 |
| treeNode | boolean | `undefined`         | 是否作为树形表格的节点列组 |
| field | string | `undefined`         | 数据字段名（用于关联数据源） |
| componentData | `Record<string, unknown>`                                    | `undefined`         | 第三方扩展属性 |


**Slots**

| **插槽名** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | 列组包含的列定义 |


更多使用方式，可参考：[vxe-colgroup](https://vxetable.cn/v3/#/colgroup/api)

