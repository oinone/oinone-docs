---
title: Views:Table Column Merging
index: true
category:
   - Frontend
order: 12
---

# I. Scenario Overview
This article explains how to implement table cell merging and header grouping through customization.
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/2025010912371117.png)

# II. Code Example
[Click to download the corresponding code](https://doc.oinone.top/wp-content/uploads/2025/01/merg-table.zip)

# III. Operation Steps
## (一) Customize `widget`
Create a custom `MergeTableWidget` to support cell merging and header grouping.

```typescript
// MergeTableWidget.ts
import { BaseElementWidget, SPI, ViewType, TableWidget, Widget, DslRender } from '@kunlun/dependencies';
import MergeTable from './MergeTable.vue';

@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Table,
    widget: 'MergeTableWidget'
  })
)
export class MergeTableWidget extends TableWidget {
  public initialize(props) {
    super.initialize(props);
    this.setComponent(MergeTable);
    return this;
  }

  /**
   * Table display fields
   */
  @Widget.Reactive()
  public get currentModelFields() {
    return this.metadataRuntimeContext.model.modelFields.filter((f) => !f.invisible);
  }

  /**
   * Render in-row action VNodes
   */
  @Widget.Method()
  protected renderRowActionVNodes() {
    const table = this.metadataRuntimeContext.viewDsl!;

    const rowAction = table?.widgets.find((w) => w.slot === 'rowActions');
    if (rowAction) {
      return rowAction.widgets.map((w) => DslRender.render(w));
    }

    return null;
  }
}
```

## (二) Create Corresponding Vue Component
Define a Vue component that supports cell merging and header grouping.

```vue
<!-- MergeTable.vue -->
<template>
  <vxe-table
    border
    height="500"
    :column-config="{ resizable: true }"
    :merge-cells="mergeCells"
    :data="showDataSource"
    @checkbox-change="checkboxChange"
    @checkbox-all="checkedAllChange"
    >
    <vxe-column type="checkbox" width="50"></vxe-column>
    <!-- Render fields configured in the interface designer -->
    <vxe-column
      v-for="field in currentModelFields"
      :key="field.name"
      :field="field.name"
      :title="field.label"
      ></vxe-column>
    <!-- Header grouping  https://vxetable.cn/v4.6/#/table/base/group -->
    <vxe-colgroup title="More Information">
      <vxe-column field="role" title="Role"></vxe-column>
      <vxe-colgroup title="Detailed Information">
        <vxe-column field="sex" title="Sex"></vxe-column>
        <vxe-column field="age" title="Age"></vxe-column>
      </vxe-colgroup>
    </vxe-colgroup>
    <vxe-column title="Operations" width="120">
      <template #default="{ row, $rowIndex }">
        <!-- Render in-row actions configured in the interface designer -->
        <row-action-render
          :renderRowActionVNodes="renderRowActionVNodes"
          :row="row"
          :rowIndex="$rowIndex"
          :parentHandle="currentHandle"
          ></row-action-render>
      </template>
    </vxe-column>
  </vxe-table>
  <!-- Pagination -->
  <oio-pagination
    :pageSizeOptions="pageSizeOptions"
    :currentPage="pagination.current"
    :pageSize="pagination.pageSize"
    :total="pagination.total"
    show-total
    :showJumper="paginationStyle != ListPaginationStyle.SIMPLE"
    :showLastPage="paginationStyle != ListPaginationStyle.SIMPLE"
    :onChange="onPaginationChange"
    ></oio-pagination>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { CheckedChangeEvent } from '@kunlun/vue-ui';
import { ActiveRecord, ActiveRecords, ManualWidget, Pagination, RuntimeModelField } from '@kunlun/dependencies';
import { ListPaginationStyle, OioPagination, OioSpin, ReturnPromise } from '@kunlun/vue-ui-antd';
import RowActionRender from './RowActionRender.vue';

export default defineComponent({
  mixins: [ManualWidget],
  components: {
    OioSpin,
    OioPagination,
    RowActionRender
  },
  inheritAttrs: false,
  props: {
    currentHandle: {
      type: String,
      required: true
    },
    // loading
    loading: {
      type: Boolean,
      default: undefined
    },
    // Table display data
    showDataSource: {
      type: Array as PropType<ActiveRecord[]>
    },

    // Pagination
    pagination: {
      type: Object as PropType<Pagination>,
      required: true
    },

    pageSizeOptions: {
      type: Array as PropType<(number | string)[]>,
      required: true
    },

    paginationStyle: {
      type: String as PropType<ListPaginationStyle>
    },

    // Modify pagination
    onPaginationChange: {
      type: Function as PropType<(currentPage: number, pageSize: number) => ReturnPromise<void>>
    },

    // Table selection
    onCheckedChange: {
      type: Function as PropType<(data: ActiveRecords, event?: CheckedChangeEvent) => void>
    },

    // Table full selection
    onCheckedAllChange: {
      type: Function as PropType<(selected: boolean, data: ActiveRecord[], event?: CheckedChangeEvent) => void>
    },

    // Display fields
    currentModelFields: {
      type: Array as PropType<RuntimeModelField[]>
    },

    // Render in-row actions
    renderRowActionVNodes: {
      type: Function as PropType<(row: any) => any>,
      required: true
    }
  },
  setup(props, ctx) {
    /**
     * Cell merging
     * https://vxetable.cn/v4.6/#/table/advanced/span
     */
    const mergeCells = ref([
      { row: 1, col: 1, rowspan: 3, colspan: 3 },
      { row: 5, col: 0, rowspan: 2, colspan: 2 }
    ]);

    // Single selection
    const checkboxChange = (e) => {
      const { checked, record, records } = e;
      const event: CheckedChangeEvent = {
        checked,
        record,
        records,
        origin: e
      };

      props.onCheckedChange?.(records, event);
    };

    // Full selection
    const checkedAllChange = (e) => {
      const { checked, record, records } = e;
      const event: CheckedChangeEvent = {
        checked,
        record,
        records,
        origin: e
      };

      props.onCheckedAllChange?.(checked, records, event);
    };

    return {
      mergeCells,
      ListPaginationStyle,
      checkboxChange,
      checkedAllChange
    };
  }
});
</script>
<style lang="scss"></style>
```

## (三) Create In-Row Actions
```vue
<script lang="ts">
import { ActionBar, RowActionBarWidget } from '@kunlun/dependencies';
import { debounce } from 'lodash-es';
import { createVNode, defineComponent } from 'vue';

export default defineComponent({
  inheritAttrs: false,
  props: {
    row: {
      type: Object,
      required: true
    },
    rowIndex: {
      type: Number,
      required: true
    },
    renderRowActionVNodes: {
      type: Function,
      required: true
    },
    parentHandle: {
      type: String,
      required: true
    }
  },
  render() {
    const vnode = this.renderRowActionVNodes();

    return createVNode(
      ActionBar,
      {
        widget: 'rowAction',
        parentHandle: this.parentHandle,
        inline: true,
        activeRecords: this.row,
        rowIndex: this.rowIndex,
        key: this.rowIndex,
        refreshWidgetRecord: debounce((widget?: RowActionBarWidget) => {
          if (widget) {
            widget.setCurrentActiveRecords(this.row);
          }
        })
      },
      {
        default: () => vnode
      }
    );
  }
});
</script>
```

## (四) Register Layout
```javascript
// registry.ts

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
    <pack widget="group" slot="tableGroup">
        <element widget="actionBar" slot="actionBar" slotSupport="action">
            <xslot name="actions" slotSupport="action" />
        </element>
        <element widget="MergeTableWidget" slot="table" slotSupport="field">
            <element widget="expandColumn" slot="expandRow" />
            <xslot name="fields" slotSupport="field" />
            <element widget="rowActions" slot="rowActions" slotSupport="action" />
        </element>
    </pack>
</view>`,
  {
    model: 'Model',
    viewType: ViewType.Table,
    actionName: 'Action Name'
  }
);
```

Through the above steps, the custom table can achieve cell merging and header grouping functions, while supporting dynamic rendering of fields and actions configured in the interface designer.