---
title: Vue UI
index: true
category:
  - R&D Manual
  - Reference
  - Oio Components
order: 3
next:
  text: Metadata Service
  link: /en/DevManual/Reference/Front-EndFramework/Services/metadata-service.md
---

In Oinone Kunlun, some components are implemented based on independent third-party component libraries, such as `Vxe-Table`, `vuedreggable`, etc. These components can be used not only for Widget components, but also directly for any Vue component using Vue native writing. This article will provide a detailed introduction to the usage and API definitions of these components.

# I. Import

``` typescript
import { OioTable } from '@oinone/kunlun-vue-ui';
```

# II. Reference List

## (I) Table

### Basic Usage

``` vue
<template>
  <oio-table :data="tableData">
    <oio-column label="Name" field="name" />
    <oio-column label="Description" field="description" />
  </oio-table>
</template>
<script lang="ts">
import { OioColumn, OioTable } from '@kunlun/dependencies';
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
        name: `Name ${i}`,
        description: `This is a description ${i}`
      });
    }

    return {
      tableData
    };
  }
});
</script>
```

### Fixed Header

``` vue
<template>
  <oio-table :data="tableData" height="100%">
    <oio-column label="Name" field="name" />
    <oio-column label="Description" field="description" />
  </oio-table>
</template>
```

### Grouped Header

``` vue
<template>
  <oio-table :data="tableData" height="100%">
    <oio-column label="Name" field="name" />
    <oio-column label="Description" field="description" />
    <oio-colgroup label="Address">
      <oio-column label="Province" field="address.province" />
      <oio-column label="City" field="address.city" />
      <oio-column label="District" field="address.district" />
    </oio-colgroup>
  </oio-table>
</template>
<script lang="ts">
import { OioColgroup, OioColumn, OioTable } from '@kunlun/dependencies';
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
        name: `Name ${i}`,
        description: `This is a description ${i}`,
        address: {
          province: 'Province',
          city: 'City',
          district: 'District'
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

### Frozen Action Column

``` vue
<template>
  <div style="width: 1000px; height: 800px">
    <oio-table :data="tableData" height="100%">
      <oio-column label="Name" field="name" width="200px" />
      <oio-column label="Description" field="description" min-width="300px" />
      <oio-column label="Gender" field="sex" min-width="300px" />
      <oio-column label="Age" field="age" min-width="300px" />
      <oio-column label="Actions" fixed="right" width="200px">
        <template #default>
          <div style="display: flex; column-gap: 16px">
            <oio-button type="link">Action 1</oio-button>
            <oio-button type="link">Action 2</oio-button>
          </div>
        </template>
      </oio-column>
    </oio-table>
  </div>
</template>
```

### Resizable Columns

``` vue
<template>
  <oio-table :data="tableData" height="100%" resizable>
    <oio-column label="Name" field="name" />
    <oio-column label="Description" field="description" />
  </oio-table>
</template>
```

### Full Border and Zebra Stripes

``` vue
<template>
  <oio-table :data="tableData" height="100%" border="full" stripe>
    <oio-column label="Name" field="name" />
    <oio-column label="Description" field="description" />
  </oio-table>
</template>
```

### Filter and Sort

``` vue
<template>
  <oio-table :data="tableData" height="100%" border="full" stripe>
    <oio-column label="Name" field="name" />
    <oio-column label="Description" field="description" />
    <oio-column
      label="Gender"
      field="sex"
      :component-data="{
        filters: sexFilters,
        filterMultiple: false
      }"
    />
    <oio-column label="Age" field="age" sortable />
  </oio-table>
</template>
<script lang="ts">
import { OioColgroup, OioColumn, OioTable } from '@kunlun/dependencies';
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
        name: `Name ${i}`,
        description: `This is a description ${i}`,
        age: random(100),
        sex: i % 3 === 0 ? 'woman' : 'man'
      });
    }

    const sexFilters: VxeColumnPropTypes.Filters = [
      { label: 'Male', value: 'man' },
      { label: 'Female', value: 'woman' }
    ];

    return {
      tableData,
      sexFilters
    };
  }
});
</script>
```

### Content Formatting

``` vue
<template>
  <oio-table :data="tableData" height="100%" border="full" stripe>
    <oio-column label="Name" field="name" />
    <oio-column label="Description" field="description" />
    <oio-column
      label="Gender"
      field="sex"
      :component-data="{
        formatter: sexFormatter
      }"
    />
    <oio-column
      label="Age"
      field="age"
      :component-data="{
        formatter: ageFormatter
      }"
    />
  </oio-table>
</template>
<script lang="ts">
import { OioColgroup, OioColumn, OioTable } from '@kunlun/dependencies';
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
        name: `Name ${i}`,
        description: `This is a description ${i}`,
        age: random(100),
        sex: i % 3 === 0 ? 'Woman' : 'Man'
      });
    }

    const sexFormatter: VxeColumnPropTypes.Formatter<RowVO> = ({ cellValue }) => {
      if (cellValue === 'Man') {
        return 'Male';
      }
      if (cellValue === 'Woman') {
        return 'Female';
      }
      return cellValue;
    };

    const ageFormatter: VxeColumnPropTypes.Formatter<RowVO> = ({ cellValue }) => {
      return `${cellValue} years old`;
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

### Checkbox

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
    <oio-column label="Name" field="name" />
    <oio-column label="Description" field="description" />
    <oio-column label="Gender" field="sex" />
    <oio-column label="Age" field="age" />
  </oio-table>
</template>
<script lang="ts">
import { CheckedChangeEvent, OioColgroup, OioColumn, OioTable } from '@kunlun/dependencies';
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
        name: `Name ${i}`,
        description: `This is a description ${i}`,
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

### Frontend Pagination Table

``` vue
<template>
  <div class="table-pagination-demo">
    <oio-table :data="showTableData" height="100%" :loading="loading">
      <oio-column type="checkbox" width="52" />
      <oio-column label="Name" field="name" />
      <oio-column label="Description" field="description" />
      <oio-column label="Gender" field="sex" />
      <oio-column label="Age" field="age" />
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
import { OioColgroup, OioColumn, OioTable } from '@kunlun/dependencies';
import { OioPagination } from '@kunlun/vue-ui-antd';
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
        name: `Name ${i}`,
        description: `This is a description ${i}`,
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

| **Property** | **Type** | **Default** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| size | string | `undefined`         | Table size, optional values are `TableSize` enum values (e.g., `'large'`, `'middle'`, `'small'`) |
| resizable | boolean | `undefined`         | Whether to allow column width adjustment |
| height | string   | number                                                | `undefined`         |
| border | boolean  | keyof typeof TableBorder                              | `undefined`         |
| stripe | boolean | `undefined`         | Whether to show zebra stripes |
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
| customConfig | Record<string, any> | `{}`                | Custom configuration |
| loading | boolean | `undefined`         | Whether to show loading state |
| wrapperClassName | string   | string[]                                              | `undefined`         |
| data | Record<string, unknown>[] | `[]`                | Table data |
| showOverflow | boolean  | keyof typeof TableOverflow                            | `undefined`         |
| showHeaderOverflow | boolean  | keyof typeof TableOverflow                            | `undefined`         |
| showFooterOverflow | boolean  | keyof typeof TableOverflow                            | `undefined`         |
| emptyText | string | `''`                | Empty data prompt text |
| emptyImage | string | `undefined`         | Empty data prompt image |
| rowConfig | `VxeTablePropTypes.RowConfig` | `undefined`         | Row configuration (such as row height, selection style, etc.), type is `VxeTable`<br/> Row configuration interface |
| columnConfig | `VxeTablePropTypes.ColumnConfig` | `undefined`         | Column configuration (such as alignment, sorting, etc.) |
| sortConfig | `VxeTablePropTypes.SortConfig` | `undefined`         | Sorting configuration |
| radioConfig | `VxeTablePropTypes.SortConfig` | `undefined`         | Radio button configuration |
| checkboxConfig | `VxeTablePropTypes.CheckboxConfig` | `undefined`         | Checkbox configuration |
| tooltipConfig | `VxeTablePropTypes.TooltipConfig` | `undefined`         | Tooltip configuration |
| expandConfig | `VxeTablePropTypes.ExpandConfig` | `undefined`         | Expand row configuration |
| editConfig | `VxeTablePropTypes.EditConfig` | `undefined`         | Editable configuration |
| treeConfig | `VxeTablePropTypes.TreeConfig` | `undefined`         | Tree table configuration |
| scrollX | `VxeTablePropTypes.ScrollX` | `undefined`         | Horizontal virtual scroll configuration |
| scrollY | `VxeTablePropTypes.ScrollY` | `undefined`         | Vertical virtual scroll configuration |
| showFooter | boolean | `undefined`         | Whether to show table footer |
| footerMethod | `VxeTablePropTypes.FooterMethod` | `undefined`         | Footer calculation method |
| spanMethod | `VxeTablePropTypes.SpanMethod` | `undefined`         | Cell merging method |
| mergeCells | `VxeTablePropTypes.MergeCells` | `[]`                | Cell merging configuration |
| componentData | `Record<string, unknown>` | `undefined`         | Third-party extension properties |


**Events**

| **Event** | **Parameters** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| sort-change | event: SortChangeEvent | Fired when the sorting state changes, returns an object containing the sorting field, direction, and original event |
| checked-change | event: CheckedChangeEvent | Fired when the checkbox state changes (row level), returns an object containing the selection state, row data, and original event |
| checked-all-change | event: CheckedChangeEvent | Fired when the all-selection checkbox state changes, returns an object containing the all-selection state, row data, and original event |
| radio-change | event: RadioChangeEvent | Fired when the radio button state changes, returns an object containing the old and new row data and the original event |
| cell-click | row: Record<string, unknown>, column: ColumnInfo, event: MouseEvent | Cell click event, returns row data, column information, and mouse event object |
| cell-dblclick | row: Record<string, unknown>, column: ColumnInfo, event: MouseEvent | Cell double-click event, returns row data, column information, and mouse event object |
| header-cell-click | column: ColumnInfo, event: MouseEvent | Header cell click event, returns column information and mouse event object |
| header-cell-dblclick | column: ColumnInfo, event: MouseEvent | Header cell double-click event, returns column information and mouse event object |
| toggle-row-expand | row: Record<string, unknown>, isExpand: boolean | Fired when the expand row state is toggled, returns row data and expand state |
| edit-actived | event: ActiveEditorContext | Fired when a cell enters edit state, returns the edit context object |
| edit-closed | event: ActiveEditorContext | Fired when cell editing ends, returns the edit context object |
| scroll | event: ScrollEvent | Fired when the table scrolls, returns the scroll event object |


**Slots**

| **Slot** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | Table body content (column definitions) |
| header | Custom header content |
| footer | Custom footer content |


**Methods**

| **Method** | **Parameters** | **Return Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| getOrigin | - | VxeTableInstance | Get the underlying `VxeTable`<br/> instance |
| setCurrentRow | row: Record<string, unknown> | void | Set the current row (radio state) |
| clearCurrentRow | - | void | Clear the current row (radio state) |
| setCheckboxRow | rows: Record<string, unknown>[], checked?: boolean | void | Set checkbox selected rows |
| clearCheckboxRow | - | void | Clear all checkbox selected rows |
| resetCheckboxRow | rows: Record<string, unknown>[] | void | Reset checkbox selected rows (clear then set) |
| setRadioRow | row: Record<string, unknown> | void | Set radio selected row |
| clearRadioRow | - | void | Clear radio selected row |
| getAllColumns | - | ColumnInfo[] | Get all column configurations |
| refreshColumn | - | void | Refresh column configurations |
| updateFooter | - | void | Refresh footer calculation |
| loadColumns | columns: ColumnInfo[] | void | Load column configurations (append mode) |
| reloadColumns | columns: ColumnInfo[] | void | Reload column configurations (overwrite mode) |
| setEditRow | row: Record<string, unknown> | void | Set editable row |
| getActiveEditorRecord | - | RowContext | undefined                                             |
| activeCellEditor | row: Record<string, unknown>, fieldOrColumn: string | ColumnInfo                                            | void |
| clearEditor | - | void | Clear all edit states |
| recalculate | refull?: boolean | void | Recalculate table layout (optional force refresh) |
| allRowExpand | - | Promise<`any`> | Expand all rows (returns Promise) |
| clearAllRowExpand | - | Promise<`any`> | Collapse all rows (returns Promise) |
| setRowExpand | row: Record<string, unknown>, isExpand: boolean | Promise<`any`> | Toggle row expand state (returns Promise) |
| sort | sortConfs: VxeTableDefines.SortConfs[] | Promise<`any`> | Manually trigger sorting (returns Promise) |


For more usage, please refer to: [vxe-table](https://vxetable.cn/v3/#/table/api)

#### oio-column

**Props**

| **Property** | **Type** | **Default** | **Description** |
| :----------------------------------------------------------- | ------------------------------------------------------------ | :----------------------------------------------------------- | :----------------------------------------------------------- |
| width | string   | number                                                | `undefined`         |
| minWidth | string   | number                                                | `undefined`         |
| label | string | `undefined`         | Column header text |
| className | string   | ((context: RenderCellContext) => string)              | `undefined`         |
| headerClassName | string   | ((context: RenderCellContext) => string)              | `undefined`         |
| footerClassName | string   | ((context: RenderCellContext) => string)              | `undefined`         |
| align | `ColumnAlignType`                                            | `'left'`            | Cell content alignment, optional values: `'left'`, `'center'`, `'right'` |
| headerAlign | `ColumnAlignType`                                            | `'left'`            | Header content alignment |
| footerAlign | `ColumnAlignType`                                            | `'left'`            | Footer content alignment |
| fixed | `ColumnFixedType`                                            | `undefined`         | Column fixed position, optional values: `'left'`, `'right'` or boolean (fixed left) |
| invisible | boolean | `false`             | Whether to hide the column |
| resizable | boolean | `undefined`         | Whether to allow column width adjustment |
| treeNode | boolean | `undefined`         | Whether to use as a node column in a tree table |
| editable | boolean | `false`             | Whether to enable cell editing |
| cellEditable | boolean  | ((context: RowContext) => boolean)                    | `undefined`         |
| editorTrigger | `TableEditorTrigger`                                         | `'manual'`          | Editing trigger mode, optional values: `'manual'` (manual), `'click'` (click) |
| editorMode | `TableEditorMode`                                            | `'cell'`            | Editing mode, optional values: `'cell'` (in-cell editing), `'row'` (row editing) |
| editorCloseTrigger | `TableEditorCloseTrigger`                                    | `'manual'`          | Editing close trigger mode, optional values: `'manual'` (manual), `'blur'` (blur) |
| disableEditorRender | boolean | `false`             | Whether to disable edit state rendering |
| rowEditorClosedByEnter | ((context: RowContext) => ReturnPromise<`boolean`>) | `undefined`         | Callback function when closing editing by pressing Enter (return `false` to prevent closing) |
| rowEditorClosedByCancel | ((context: RowContext) => ReturnPromise<`boolean`>) | `undefined`         | Callback function when closing editing by clicking cancel |
| editorConfirm | string   | ((context: RowContext) => string)                     | `undefined`         |
| editorConfirmPosition | PopconfirmPlacement | ((context: RowContext) => PopconfirmPlacement)        | `'top'`             |
| editorCondition | ((context: RowContext) => ReturnPromise<boolean | undefined>)                                           | `undefined`         |
| editorEnterText | string   | ((context: RowContext) => string)                     | `'Confirm'`         |
| editorCancelText | string   | ((context: RowContext) => string)                     | `'Cancel'`          |
| type | string | `undefined`         | Column type (e.g., `'seq'` for sequence column) |
| field | string | `undefined`         | Data field name (corresponds to the key in row data) |
| invisibleContent | boolean  | ((context: RowContext) => boolean)                    | `undefined`         |
| sortable | boolean | `undefined`         | Whether to enable sorting |
| renderDefaultSlot | `CellRenderFunction`                                         | `undefined`         | Custom cell content rendering function |
| renderEditSlot | `CellRenderFunction`                                         | `undefined`         | Custom cell rendering function in edit state |
| renderContentSlot | `CellRenderFunction`                                         | `undefined`         | Custom content area rendering function (backup) |
| renderHeaderSlot | `CellRenderFunction`                                         | `undefined`         | Custom header rendering function |
| componentData | `Record<string, unknown>`                                    | `undefined`         | Third-party extension properties |


**Slots**

| **Slot** | **Type** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | `(context: RenderRowContext) => VNode[]` | Custom cell content |
| edit | `(context: RenderRowContext) => VNode[]` | Custom cell content in edit state |
| header | `(context: RenderRowContext) => VNode[]` | Custom header content |


For more usage, please refer to: [vxe-column](https://vxetable.cn/v3/#/column/api)

#### oio-colgroup

**Props**

| **Property** | **Type** | **Default** | **Description** |
| :----------------------------------------------------------- | ------------------------------------------------------------ | :----------------------------------------------------------- | :----------------------------------------------------------- |
| width | string   | number                                                | `undefined`         |
| minWidth | string   | number                                                | `undefined`         |
| label | string | `undefined`         | Column group header text |
| className | string   | ((context: RenderCellContext) => string)              | `undefined`         |
| headerClassName | string   | ((context: RenderCellContext) => string)              | `undefined`         |
| footerClassName | string   | ((context: RenderCellContext) => string)              | `undefined`         |
| align | `ColumnAlignType`                                            | `undefined`         | Column group cell content alignment, optional values: `'left'`, `'center'`, `'right'` |
| headerAlign | `ColumnAlignType`                                            | `'center'`          | Column group header content alignment (default center) |
| footerAlign | `ColumnAlignType`                                            | `undefined`         | Column group footer content alignment |
| fixed | `ColumnFixedType`                                            | `undefined`         | Column group fixed position, optional values: `'left'`, `'right'` or boolean (fixed left) |
| invisible | boolean | `false`             | Whether to hide the column group |
| resizable | boolean | `undefined`         | Whether to allow column group width adjustment |
| treeNode | boolean | `undefined`         | Whether to use as a node column group in a tree table |
| field | string | `undefined`         | Data field name (used to associate with data source) |
| componentData | `Record<string, unknown>`                                    | `undefined`         | Third-party extension properties |


**Slots**

| **Slot** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| default | Column definitions contained in the column group |


For more usage, please refer to: [vxe-colgroup](https://vxetable.cn/v3/#/colgroup/api)