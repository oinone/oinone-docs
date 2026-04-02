---
title: Workflow Management
index: true
category:
  - User Manual
  - Designer
order: 1
prev:
  text: Process Designer
  link: /v6/en/UserManual/Designers/WorkflowDesigner/README.md
---
The process designer supports a series of convenient operations such as adding, editing, and deleting processes. Using different display modes can meet users' different view preferences and management needs, realizing users' flexible and diverse process management requirements.

:::warning Tip
After the process takes effect successfully, it will be automatically executed according to the set trigger conditions. To view the execution status of the process, you can go to the "Workflow" - "Process Execution Records" page, which will display the detailed running status of the process. If an exception occurs in the process, you can view the exception information on this page and improve and optimize the process based on the exception information.

In addition, if the process contains approval or filling nodes, you can go to the "Workflow" - "Workflows" page to view the specific execution status of the approval or filling, so as to keep abreast of the process progress and handle relevant affairs in a timely manner.
:::

# I. Filtering
### 1. Function Introduction
According to actual business needs, you can customize process filtering conditions, including the associated application, process name, trigger method, enabled status, and update status. Under the current filtering conditions, the corresponding process list will be displayed, facilitating the design and editing of different processes.

:::warning Tip
For commonly used combinations of filter options, you can save them as filter schemes. Subsequently, you can directly select a scheme from the filter schemes to filter the processes with a single click.
:::

### 2. Operation Method
+ Filtering: After selecting or entering conditions in the filter area, click the "Search" button to filter the processes.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/process%20management/sx1.png)

+ One-click Clear: Click the "Clear" icon to clear all conditions in the current filter area with a single click.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/process%20management/sx2.png)

+ Manage Filter Schemes: Move the mouse over the "Filter Schemes" icon to manage the filter schemes.
    - Add: After selecting or entering filter conditions in the filter area, click "Save Current Conditions". Enter a scheme name in the pop-up window to add the current filter condition combination to the filter schemes.
    - Search: Enter the scheme name in the input box.
    - Modify: Click "Manage Filter Schemes", select a scheme in the pop-up window, and click the scheme name to modify it.
    - Delete: Select a scheme from the scheme list and click the "Delete" icon to delete the filter scheme.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/process%20management/sx3.png)

# II. Display Modes
### 1. Function Introduction
The process designer provides two modes for displaying processes: Tile Mode and List Mode. The default mode is Tile Mode.

+ Tile Mode: Displays process information intuitively in card form, including the process name, a brief schematic diagram of the process, and the publishing and enabling status.
+ List Mode: Lists process information in detail in tabular form, covering key elements such as the process name, process description, and trigger method.

### 2. Operation Method
+ Click the "List Mode" icon to switch the current page to List Mode.
+ Click the "Tile Mode" icon to switch the current page to Tile Mode.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/process%20management/zs.png)

# III. Create a Process
### 1. Function Introduction
You can use the process designer to create processes. After being triggered, the created processes will be automatically executed.

### 2. Operation Method
Click "Create Process", select the associated application, and then click "Create". You will be redirected to the process design page. Click "Save Draft" or "Publish" to successfully create the process.

:::info Note
If you do not click the "Save Draft" or "Publish" button, the process created this time will not be saved.
:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/process%20management/cj1.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/process%20management/cj2.png)

# IV. Design a Process
### 1. Function Introduction
When designing a process, you can use various node actions to layout the process to meet different actual business process requirements.

### 2. Operation Method
+ In Tile Mode, click the "Design Process" icon to enter the process design interface.
+ In List Mode, click "Edit" to enter the process design interface. (See the process design documentation for details.)
:::warning Reminder
When there are multiple manual nodes (approval/filling nodes) in a process, and the views bound to these nodes are changed, click the "Refresh" button in the upper right corner of the property panel to batch synchronize and obtain the latest data permissions.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/process%20management/1754031932389-0f0d7bb8-46ed-4fb1-bf27-b6da6e760d50.png)
:::

![Tile Mode](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/process%20management/sj1.png)

![List Mode](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/process%20management/sj2.png)

# V. Disable/Enable a Process
### 1. Function Introduction
When a process needs to be updated or is temporarily not in use, you can disable it. After a process is disabled, it will no longer be executed. Ongoing processes will not be affected by the disabling and will continue to execute until completion.

When you need to execute a process, you can enable it. After a process is enabled, it will be automatically executed according to the trigger method. Additionally, you can manually trigger an enabled process by selecting it in the workflow action component on the page designer.

:::info Note
+ A newly published process is automatically enabled.
+ A process with incomplete node configurations cannot be enabled.
:::

### 2. Operation Method
+ In Tile Mode, click the "Disable/Enable" icon to change the process status.
+ In List Mode, click "Disable/Enable" to change the process status.

![Tile Mode](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/process%20management/ty1.png)

![List Mode](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/process%20management/ty2.png)

:::warning Tip
In List Mode, the "Delete" option will appear after a process is disabled. To enable a disabled process, find the enable button in the "More" option.
:::

# VI. Copy a Process
### 1. Function Introduction
When the node actions in processes are highly similar, you can use the copy function. A new process named "Original Process Name - Copy" will be generated, and you will automatically enter the design interface of the new process. Similar to creating a process, you need to click "Save Draft" or "Publish" to successfully generate the copied process.

### 2. Operation Method
+ In Tile Mode, click the "Copy" icon. You will be redirected to the process design page. Click "Save Draft" or "Publish" to successfully copy the process.
+ In List Mode, click "Copy". You will be redirected to the process design page. Click "Save Draft" or "Publish" to successfully copy the process.

![Tile Mode](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/process%20management/fz1.png)

![List Mode](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/process%20management/fz2.png)

# VII. Delete a Process
### 1. Function Introduction
When a process is no longer needed, you can choose to delete it. If you are unsure whether a process needs to be deleted, you can disable it first.

:::info Note
+ A process that is in the enabled state cannot be deleted.
+ A process that has been executed and generated instances cannot be deleted before deletion.
:::

:::danger Warning
Once a process is deleted, it cannot be recovered. Please operate with caution!
:::

### 2. Operation Method
In Tile Mode, click the "Delete" icon to delete the process.

In List Mode, click "Delete" to delete the process.

:::info Note
In List Mode, the "Delete" option will only appear after the process is disabled.
:::

![Tile Mode](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/process%20management/sc1.png)

![List Mode](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/process%20management/sc2.png)