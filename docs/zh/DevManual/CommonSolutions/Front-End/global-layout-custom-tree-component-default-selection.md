---
title: 全局layout：自定义树形组件，树形组件默认选中第一个值
index: true
category:
  - 前端
order: 1
prev:
  text: 软件公司：标准化与定制化共生的范式
  link: /zh/DevManual/R&DParadigm/the-paradigm-of-coexistence-between-standardization-and-customization.md
---
在 Oinone 平台架构体系下，系统预设了标准的左树右表视图模式，此模式为用户提供了基础的数据展示与交互界面。用户基于自身业务需求，可借助平台所提供的界面设计器进行相应配置。然而，应当认识到，该默认的树视图在某些特定场景下，难以全方位满足各类复杂的业务需求。特别是当业务逻辑涉及到高度定制化的功能开发，或是需要实现复杂的用户交互操作时，默认视图的局限性便凸显出来。

鉴于此，Oinone 平台赋予用户通过自定义视图来达成更为灵活的数据展现形式的能力。本篇章将以循序渐进的方式，引导读者深入了解并掌握如何针对左树右表视图中的树组件进行个性化定制。

# 一、自定义树视图
## （一）使用界面设计器配置视图
首先，需借助界面设计器生成左树右表视图的基础架构。界面设计器具备强大功能，它允许用户依据多样化的业务需求，以拖拽的便捷方式进行灵活配置，从而快速搭建可视化界面。

完成视图配置后，我们能够对左侧的树组件进行重写操作。在 Oinone 平台中，默认的树组件为 `TableSearchTreeWidget`，通过运用自定义手段，我们能够实现更为高级的功能特性，以契合特定的业务场景需求。

## （二）重写 `TableSearchTreeWidget`
``` typescript
import { BaseElementWidget, SPI, TableSearchTreeWidget, ViewType } from '@oinone/kunlun-dependencies';
import CustomTableSearchTree from './CustomTableSearchTree.vue';

@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: [ViewType.Table, ViewType.Form],
    widget: 'tree',
    model: 'resource.k2.Model0000000100' // 改成自己的模型
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

## （三）定义 Vue 树组件
接下来，我们来实现 `CustomTableSearchTree.vue` 组件。这个组件将处理树的数据加载、节点选中等逻辑。你可以根据项目的需要修改其中的交互逻辑或 UI 设计。

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
      // // 计算树的数据源，使用 TreeUtils 处理
      const treeData = computed(() => {
        return TreeUtils.fillLoadMoreAction([...(props.rootNode?.children || [])]);
      });

      // 异步加载子节点
      const onLoadData = async (node) => {
        return await props.loadData(node.dataRef);
      };

      // 处理节点选中事件
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

## （四）自定义 UI
如果你希望修改树组件的 UI，比如调整样式或交互方式，可以在 `CustomTableSearchTree.vue` 文件中根据需要进行调整。通过这个自定义组件，你可以灵活地控制树的外观和行为，满足具体的业务需求。

# 二、默认选择第一条数据
有时在使用树结构时，我们希望页面加载后默认选中第一条数据。为此，我们可以监听 `treeData` 的变化，并在数据加载完成时，自动触发选中第一条记录的操作。

``` javascript
const stop = watch(
  () => treeData.value.length,
  async (len) => {
    if (!len) {
      return;
    }

    // 选中树中的第一条记录
    selectedKeys.value = [treeData.value[0].key];
    props.onSelected?.(treeData.value[0].value.metadata, true);
    stop(); // 停止监听
  },
  {
    immediate: true
  }
);
```

# 三、表格的新建按钮，获取选中的树节点
在树组件的应用场景中，存在这样一种业务需求：当用户点击右侧表格上方的 “新建按钮” 时，系统需获取当前树的 ID，并将其作为条件传递至后端。为达成此目标，我们需采用自定义 `action` 的方式来加以实现。

具体而言，在左树右表页面，当用户触发表格的 “新建按钮” 操作时，系统需获取用户所选中的树节点信息。而实现这一功能的途径，便是通过自定义 `action`。

操作步骤为，新建一个名为 `TreeActionWidget.ts` 的 `action` 文件，以此为基础展开后续的功能开发与逻辑编写。

``` typescript

import { ActionType, ActionWidget, SPI, ViewActionTarget, RouterViewActionWidget } from '@oinone/kunlun-dependencies';
import { OioNotification } from '@oinone/kunlun-vue-ui-antd';

@SPI.ClassFactory(
  ActionWidget.Token({
    actionType: [ActionType.View],
    target: [ViewActionTarget.Router],
    name: 'uiView0000000000079503' // action对应的name
  })
)
  export class TreeActionWidget extends RouterViewActionWidget {
  protected async clickAction() {
    const context = this.rootRuntimeContext.view.context || {};
    const activeTreeContext = context.activeTreeContext || null;

    if (!activeTreeContext) {
      // 没有选中左侧树
      OioNotification.error('', '请选择左侧节点!');
    } else {
      // 选中的时候
      (this.action as any).context = activeTreeContext;

      // 执行原先的action逻辑
      super.clickAction();
    }
  }
}


```

