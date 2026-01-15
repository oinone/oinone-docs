---
title: Global Layout:Custom Tree Component with Default First Value Selection
index: true
category:
  - Frontend
order: 1
prev:
  text: Software Companies:The Paradigm of Coexistence Between Standardization and Customization
  link: /en/DevManual/R&DParadigm/the-paradigm-of-coexistence-between-standardization-and-customization.md
---

In the Oinone platform architecture, the system预设 (predefines) a standard left-tree-right-table view mode, which provides users with a basic data display and interaction interface. Based on their business needs, users can use the Interface Designer provided by the platform for corresponding configurations. However, it should be recognized that this default tree view may not fully meet various complex business requirements in specific scenarios, especially when business logic involves highly customized function development or complex user interaction operations, the limitations of the default view become prominent.

Therefore, the Oinone platform enables users to achieve more flexible data presentation through custom views. This chapter will guide readers through a step-by-step approach to understand and master how to customize the tree component in the left-tree-right-table view.

# I. Custom Tree View
## (Ⅰ) Configuring the View Using the Interface Designer
First, the Interface Designer needs to be used to generate the basic architecture of the left-tree-right-table view. The Interface Designer has powerful functions, allowing users to flexibly configure through drag-and-drop operations according to diverse business needs, thereby quickly building a visual interface.

After completing the view configuration, we can rewrite the left-side tree component. In the Oinone platform, the default tree component is `TableSearchTreeWidget`, and through customization, we can implement more advanced features to meet specific business scenario requirements.

## (Ⅱ) Rewriting `TableSearchTreeWidget`
``` typescript
import { BaseElementWidget, SPI, TableSearchTreeWidget, ViewType } from '@oinone/kunlun-dependencies';
import CustomTableSearchTree from './CustomTableSearchTree.vue';

@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: [ViewType.Table, ViewType.Form],
    widget: 'tree',
    model: 'resource.k2.Model0000000100' // 改成自己的模型 (change to your own model)
  })
) 
  export class CustomTableSearchTreeWidget extends TableSearchTreeWidget {
    public initialize(props) {
      super.initialize(props);
      this.setComponent(CustomTableSearchTree);
      return this;
    }
  }
```

## (Ⅲ) Defining the Vue Tree Component
Next, we implement the `CustomTableSearchTree.vue` component, which will handle tree data loading, node selection, and other logic. You can modify the interaction logic or UI design according to project requirements.

``` vue
<template>
  <a-tree :load-data="onLoadData" :tree-data="treeData" @select="onSelected" />
</template>
<script lang="ts">
  import { OioTreeNode, TreeUtils } from '@oinone/kunlun-dependencies';
  import { computed, defineComponent } from 'vue';

  export default defineComponent({
    props: {
      rootNode: {
        type: Object
      },
      loadData: {
        type: Function,
        required: true
      },
      onSelected: {
        type: Function,
        required: true
      }
    },
    setup(props) {
      // // 计算树的数据源，使用 TreeUtils 处理 (Calculate the tree data source using TreeUtils)
      const treeData = computed(() => {
        return TreeUtils.fillLoadMoreAction([...(props.rootNode?.children || [])]);
      });

      // 异步加载子节点 (Asynchronously load child nodes)
      const onLoadData = async (node) => {
        return await props.loadData(node.dataRef);
      };

      // 处理节点选中事件 (Handle node selection events)
      const onSelected = (
        selectedKeys: string[],
        e: { nativeEvent: PointerEvent; node: { dataRef: OioTreeNode }; selected: boolean }
      ) => {
        props.onSelected?.(e.node.dataRef, e.selected);
      };

      return {
        treeData,

        onLoadData,
        onSelected
      };
    }
  });
</script>
```

## (Ⅳ) Custom UI
If you wish to modify the UI of the tree component, such as adjusting styles or interaction methods, you can make adjustments in the `CustomTableSearchTree.vue` file as needed. Through this custom component, you can flexibly control the appearance and behavior of the tree to meet specific business requirements.

# II. Default Selection of the First Data
In some cases, when using a tree structure, we want the first data to be selected by default after the page loads. To achieve this, we can listen for changes in `treeData` and automatically trigger the selection of the first record when the data loading is complete.

``` javascript
const stop = watch(
  () => treeData.value.length,
  async (len) => {
    if (!len) {
      return;
    }

    // Select the first record in the tree
    selectedKeys.value = [treeData.value[0].key];
    props.onSelected?.(treeData.value[0].value.metadata, true);
    stop(); // Stop listening
  },
  {
    immediate: true
  }
);
```

# III. New Button in Table to Get Selected Tree Node
In the application scenario of the tree component, there is a business requirement: when the user clicks the "New Button" above the right-side table, the system needs to obtain the current tree's ID and pass it to the backend as a condition. To achieve this, we need to use a custom `action` approach.

Specifically, on the left-tree-right-table page, when the user triggers the "New Button" operation on the table, the system needs to obtain the selected tree node information. The way to implement this function is through a custom `action`.

The operation step is to create a new `action` file named `TreeActionWidget.ts` as the basis for subsequent function development and logic writing.

``` typescript
import { ActionType, ActionWidget, SPI, ViewActionTarget, RouterViewActionWidget } from '@oinone/kunlun-dependencies';
import { OioNotification } from '@oinone/kunlun-vue-ui-antd';

@SPI.ClassFactory(
  ActionWidget.Token({
    actionType: [ActionType.View],
    target: [ViewActionTarget.Router],
    name: 'uiView0000000000079503' // action对应的name (corresponding name of the action)
  })
)
  export class TreeActionWidget extends RouterViewActionWidget {
  protected async clickAction() {
    const context = this.rootRuntimeContext.view.context || {};
    const activeTreeContext = context.activeTreeContext || null;

    if (!activeTreeContext) {
      // 没有选中左侧树 (No left tree selected)
      OioNotification.error('', '请选择左侧节点! (Please select a left node!)');
    } else {
      // 选中的时候 (When selected)
      (this.action as any).context = activeTreeContext;

      // 执行原先的action逻辑 (Execute the original action logic)
      super.clickAction();
    }
  }
}
```