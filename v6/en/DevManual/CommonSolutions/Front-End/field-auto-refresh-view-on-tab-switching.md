---
title: Field:How to Automatically Refresh Views When Switching Between Multi-Tabs
index: true
category:
   - Frontend
order: 3
---
# I. Scenario Overview
In daily project development, the application scenario of multi-view tabs is quite common. In such scenarios, when users switch between different views, it is often necessary to refresh the view data or status within the currently active tab. This article will conduct a detailed analysis of the following code and explain how to precisely refresh the corresponding view during view switching with the help of this code. It should be particularly noted that the following code is located in the `main.ts` file of the `ss - boot` project.

```javascript
import { VueOioProvider } from '@kunlun/dependencies';
import { delay } from 'lodash-es';

VueOioProvider(
  {
    ... self-configuration
  },
  [
    () => {
      setTimeout(() => {
        subscribeRoute(
          (route) => {
            const page = route.segmentParams.page || {};

            // If it is not a table type, do not refresh (judge according to your own needs)
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

# II. VueOioProvider and Its Role
First, the code initializes the application or component through `VueOioProvider` and passes in two parts of parameters:

+ Configuration object: It can be customized according to actual business needs;
+ Callback function array: Here, an anonymous function is passed in to execute additional logic after the application is initialized.

# III. Delayed Execution and Route Listening
In the callback function, `setTimeout` is used to delay execution by 1000 milliseconds. The purpose is usually to ensure that other components or global states have been initialized before starting route listening.

Subsequently, the code calls `subscribeRoute` to listen for changes in the route. `subscribeRoute` accepts two parameters:

+ Callback function: This function will be triggered every time the route changes, and the latest `route` object will be passed to it;
+ Configuration object: Here, `{ distinct: true }` is used to avoid repeated triggers and improve performance.

# IV. Judging View Type
Inside the route callback function, the configuration information of the current page is first obtained through `route.segmentParams.page`. By judging whether `page.viewType` is equal to `ViewType.Table`, the code can determine whether the current view is of the "table type":

+ If it is not a table type: directly return without performing a refresh operation;
+ If it is a table type: continue to execute the subsequent refresh logic.

This judgment mechanism ensures that only specific types of views (such as tables) will trigger a refresh when switched, avoiding unnecessary operations.

# V. Refresh Logic for Multi-View Tabs
After confirming that the current view type is a table, the currently active tab needs to be obtained from `MultiTabsManager`. The specific operation is to call the `MultiTabsManager.INSTANCE.getActiveTab()` method, which will return the current active tab object.
Subsequently, a conditional judgment is made. If the `key` exists and the `action` stored inside the activated tab is consistent with the `url`, the `multiTabsManager.refresh(key)` method is called at this time to achieve the refresh operation of the view within the current tab.