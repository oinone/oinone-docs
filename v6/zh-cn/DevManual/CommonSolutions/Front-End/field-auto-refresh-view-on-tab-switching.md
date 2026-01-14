---
title: 字段：如何在多标签页切换时自动刷新视图
index: true
category:
   - 前端
order: 3
---
# 一、场景概述
在日常的项目开发进程中，多视图（Multi - View）标签的应用场景屡见不鲜。在此类场景下，当用户于不同视图间进行切换操作时，往往需要对当前处于活动状态标签内的视图数据或状态予以刷新。本文将对如下代码展开详尽剖析，并阐释如何借助这段代码，实现在视图切换之际，对相应视图进行精准刷新。需特别说明的是，下述代码位于 `ss - boot` 项目中的 `main.ts` 文件内。

```javascript
import { VueOioProvider } from '@kunlun/dependencies';
import { delay } from 'lodash-es';

VueOioProvider(
  {
    ... 自己的配置
  },
  [
    () => {
      setTimeout(() => {
        subscribeRoute(
          (route) => {
            const page = route.segmentParams.page || {};

            // 如果不是表格类型，则不刷新(根据自己的需求判断)
            if (page.viewType !== ViewType.Table) {
              return;
            }

            const { model, action } = page;

            const multiTabsManager = MultiTabsManager.INSTANCE;

            delay(() => {
              const tab = multiTabsManager.getActiveTab();

              if (tab?.key && tab.stack.some((s) => s.parameters?.model === model && s.parameters?.action === action)) {
                multiTabsManager.refresh(tab.key);
              }
            }, 200);
          },
          { distinct: true }
        );
      }, 1000);
    }
  ]
);
```

# 二、VueOioProvider 及其作用
首先，代码通过 `VueOioProvider` 初始化应用程序或组件，并传入两部分参数：

+ 配置对象：可以根据实际业务需求进行自定义配置；
+ 回调函数数组：这里传入了一个匿名函数，用于在应用初始化后执行额外的逻辑

# 三、延时执行与路由监听
在回调函数中，使用了 setTimeout 延时 1000 毫秒执行，目的通常是为了确保其他组件或全局状态已经初始化完毕，再开始进行路由监听。

随后，代码调用 `subscribeRoute` 来监听路由的变化。`subscribeRoute` 接收两个参数：

+ 回调函数：每次路由变化时都会触发该函数，并将最新的 route 对象传递给它；
+ 配置对象：此处使用 `{ distinct: true }` 来避免重复的触发，提高性能。

# 四、判断视图类型
在路由回调函数内部，首先通过 `route.segmentParams.page` 获取当前页面的配置信息。通过判断 `page.viewType` 是否等于 `ViewType.Table`，代码可以确定当前视图是否为“表格类型”：

+ 如果不是表格类型：则直接返回，不做刷新操作；
+ 如果是表格类型：则继续执行后续刷新逻辑。

这种判断机制保证了只有特定类型的视图（例如表格）在切换时才会触发刷新，避免了不必要的操作

# 五、多视图标签的刷新逻辑
在确认当前视图类型为表格后，需从 `MultiTabsManager` 中获取当前处于活动状态的标签。具体操作为调用 `MultiTabsManager.INSTANCE.getActiveTab()` 方法，该方法将返回当前活动的标签对象。
随后，进行条件判断。若 `key` 存在，且激活标签内部所存储的 `action` 与 `url` 保持一致，此时则调用 `multiTabsManager.refresh(key)` 方法，以此实现对当前标签内视图的刷新操作。

