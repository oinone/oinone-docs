---
title: 视图：表格列合并
index: true
category:
   - 前端
order: 12
---
# 一、场景概述
本文将讲解如何通过自定义实现表格支持单元格合并和表头分组。
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/2025010912371117.png)

# 二、代码示例
[点击下载对应的代码](https://doc.oinone.top/wp-content/uploads/2025/01/merg-table.zip)

# 三、操作步骤
## （一）自定义 `widget`
创建自定义的 `MergeTableWidget`，用于支持合并单元格和表头分组。

```typescript
// MergeTableWidget.ts
import { BaseElementWidget, SPI, ViewType, TableWidget, Widget, DslRender } from '@oinone/kunlun-dependencies';
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
   * 表格展示字段
   */
    @Widget.Reactive()
    public get currentModelFields() {
      return this.metadataRuntimeContext.model.modelFields.filter((f) => !f.invisible);
    }

    /**
   * 渲染行内动作VNode
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

## （二）创建对应的 Vue 组件
定义一个支持合并单元格与表头分组的 Vue 组件。

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
    <!-- 渲染界面设计器配置的字段 -->
    <vxe-column
      v-for="field in currentModelFields"
      :key="field.name"
      :field="field.name"
      :title="field.label"
      ></vxe-column>
    <!-- 表头分组  https://vxetable.cn/v4.6/#/table/base/group -->
    <vxe-colgroup title="更多信息">
      <vxe-column field="role" title="Role"></vxe-column>
      <vxe-colgroup title="详细信息">
        <vxe-column field="sex" title="Sex"></vxe-column>
        <vxe-column field="age" title="Age"></vxe-column>
      </vxe-colgroup>
    </vxe-colgroup>
    <vxe-column title="操作" width="120">
      <template #default="{ row, $rowIndex }">
        <!-- 渲染界面设计器配置的行内动作 -->
        <row-action-render
          :renderRowActionVNodes="renderRowActionVNodes"
          :row="row"
          :rowIndex="$rowIndex"
          :parentHandle="currentHandle"
          ></row-action-render>
      </template>
    </vxe-column>
  </vxe-table>
  <!-- 分页 -->
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
  import { CheckedChangeEvent } from '@oinone/kunlun-vue-ui';
  import { ActiveRecord, ActiveRecords, ManualWidget, Pagination, RuntimeModelField } from '@oinone/kunlun-dependencies';
  import { ListPaginationStyle, OioPagination, OioSpin, ReturnPromise } from '@oinone/kunlun-vue-ui-antd';
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
      // 表格展示的数据
      showDataSource: {
        type: Array as PropType<ActiveRecord[]>
          },

      // 分页
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

      // 修改分页
      onPaginationChange: {
        type: Function as PropType<(currentPage: number, pageSize: number) => ReturnPromise<void>>
          },

          // 表格选中
          onCheckedChange: {
            type: Function as PropType<(data: ActiveRecords, event?: CheckedChangeEvent) => void>
              },

              // 表格全选
              onCheckedAllChange: {
                type: Function as PropType<(selected: boolean, data: ActiveRecord[], event?: CheckedChangeEvent) => void>
                  },

                  // 展示字段
                  currentModelFields: {
                    type: Array as PropType<RuntimeModelField[]>
                  },

                  // 渲染行内动作
                  renderRowActionVNodes: {
                    type: Function as PropType<(row: any) => any>,
        required: true
      }
    },
    setup(props, ctx) {
      /**
     * 单元格合并
     * https://vxetable.cn/v4.6/#/table/advanced/span
     */
      const mergeCells = ref([
        { row: 1, col: 1, rowspan: 3, colspan: 3 },
        { row: 5, col: 0, rowspan: 2, colspan: 2 }
      ]);

      // 单选
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

      // 全选
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

## （三）创建行内动作
```vue
<script lang="ts">
  import { ActionBar, RowActionBarWidget } from '@oinone/kunlun-dependencies';
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

## （四）注册布局
```javascript
// registry.ts

import { registerLayout, ViewType } from '@oinone/kunlun-dependencies';

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
    model: '模型',
    viewType: ViewType.Table,
    actionName: '动作名称'
  }
);

```

通过上述步骤，自定义表格可以实现单元格合并和表头分组功能，同时支持动态渲染界面设计器配置的字段和动作。

