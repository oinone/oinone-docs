---
title: Workflow Design
index: true
category:
  - User Manual
  - Designer
order: 2
---
In the process design page, comprehensive process design and process configuration can be carried out.
Process design is mainly divided into four functional areas, namely: Operation Bar, Toolbar, Process Design Area, and Property Panel
+ Operation Bar: Provides a series of common operation buttons and menu options, allowing operations such as modifying the process name, saving, and publishing.
+ Toolbar: Provides a series of common node actions for the process.
+ Process Design Area: The main area for process design, where node actions can be added to improve the process by dragging and dropping or directly adding them in the process.
+ Property Panel: Displays when a node action is clicked. Relevant attributes of the node can be adjusted in this panel.
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/Process%20Design/1.png)
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/Process%20Design/2.png)
Process configuration is mainly divided into two functional areas, the Operation Bar and the Process Configuration Area
+ Operation Bar: Consistent with the operation bar of process design.
+ Process Configuration Area: Here, process parameters can be configured as temporary fields, or the application to which the process belongs can be changed.
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/Process%20Design/3.png)
# I. Process Design
## (一) Operation Bar
### 1. Edit Process Name and Description
#### I. Function Introduction
The name and description of the process can be edited on the left side of the operation bar. The modified name and description will be displayed in the process list or card.
:::info Note
After editing the name or description, it needs to be saved temporarily or published; otherwise, the changes cannot be saved.
:::
#### II. Operation Method
+ Edit Name: Click the "Edit" icon, enter the name in the input box, and click anywhere outside the input box to complete the editing.
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/Process%20Design/bj1.png)
+ Edit Description: Click the description area under the name, enter the description in the pop-up window, and click "OK" to complete the editing.
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/Process%20Design/bj2.png)
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/Process%20Design/bj3.png)
### 2. Switch Menus
#### I. Function Introduction
When designing a process, if temporary parameters or changes to the application to which the process belongs are required, the menu can be switched in the operation bar to complete the operation.
#### II. Operation Method
Click the menu area in the operation bar to switch between process design and process configuration.
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/Process%20Design/qh.png)
### 3. Save Draft
#### I. Function Introduction
Supports archiving and saving the process design. Even if the process design is not complete, you can choose to save the current design progress temporarily. When entering the process design page next time, the system will automatically load and display the previously saved design page, facilitating the continuation of the process improvement.
:::warning Tip
When the process design is complete but not yet published, you can choose to enable the process directly. The enable operation will automatically trigger the release process of the current version, making the design take effect immediately and put into use.
:::
#### II. Operation Method
Click "Save Draft" to archive and save the current design progress.
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/Process%20Design/zc.png)
### 4. Publish/Update Publish
#### I. Function Introduction
After the process design is completed, it can be published to make the process officially take effect and put into use. For processes that have not been published before, the publish button will display the word "Publish". For processes that have been published, the publish button will change to "Update Publish".
:::info Note
After modifying a published and enabled process, before updating and publishing, these modifications will not affect the currently used process version.
+ In tile mode, the process card will prompt "There are unpublished changes".
+ In list mode, the update status will show "Not updated".
Only after completing all modifications and performing an update publish will the new process version officially take effect and replace the previous version.
:::
:::info Note
When publishing a process, it is necessary to ensure that there is at least one valid node between the trigger node and the end node, and all nodes have been configured. If these conditions are not met, the process cannot be published.
:::
#### II. Operation Method
Click the "Publish/Update Publish" button to publish the current process design.
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/Process%20Design/fb.png)
## (二) Toolbar
### 1. Function Introduction
The toolbar integrates various node actions required for process design, and the node actions in the toolbar can be placed at the specified position of the process.
### 2. Operation Method
Node actions in the toolbar can be dragged, or the "+" sign between nodes in the process can be clicked to place the nodes at the specified positions.
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/Process%20Design/gjl.png)
## (三) Process Design Area
### 1. Function Introduction
After adding nodes to the process, their names can be modified, descriptions can be edited, and unnecessary nodes can be deleted to better carry out process design.
:::danger Warning
Once a node is deleted, it cannot be recovered. Please operate with caution!
:::
### 2. Operation Method
+ Click the "Node Name" to modify the name in the input box.
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/Process%20Design/sj1.png)
+ Click the "Node Description" icon, enter the node description in the pop-up window, and click "OK" to successfully edit the node description.
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/Process%20Design/sj2.png)
+ Click the "Delete" icon, and in the pop-up window, click "OK" to delete the node.
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/Process%20Design/sj3.png)
## (四) Property Panel
### 1. Function Introduction
In the property panel, various attributes can be configured for node actions.
### 2. Operation Method
Click the main body of the node, configure the attributes in the pop-up window on the right according to business requirements, and click "Save".
:::info Note
Required information in the attributes must be filled in; otherwise, saving will not be possible.
:::
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/Process%20Design/sxmb.png)
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/Process%20Design/sxmb2.png)
# II. Process Configuration
## (一) Parameter Configuration
### 1. Function Introduction
In process design, process parameters can be used as a temporary field to store a field value, calculation result, or accept values passed from other processes. Temporary parameters support four data types: text, number, date, and boolean to meet the needs of different scenarios.
:::info Note
Once a process parameter is referenced in the process, it cannot be modified or deleted.
:::
:::warning Tip
In the process, "Update Process Parameters" can be used to store data using the configured parameters.
:::
### 2. Operation Method
Under parameter configuration, click "Add New Parameter", select the parameter type, enter the parameter name, and click "Save" to successfully add the parameter.
:::info Note
Parameter name rules: The parameter name must start with a letter, support numbers and underscores, and does not support Chinese characters.
:::
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/Process%20Design/cs.png)
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/Process%20Design/cs2.png)
## (二) Process Configuration
### 1. Function Introduction
In process configuration, it is supported to change the application to which the process belongs and the rollback type when the process has an exception.
+ The application to which it belongs has been selected when creating the process. If the application selection is found to be incorrect or needs to be changed, editing operations can be performed here.
:::info Note
When viewing process instances in "Workflow" - "Process Operation Records":
+ If process instances have been generated before the application change, these instances will continue to be stored in the pre-change application.
+ New instances generated after the application change will be stored in the post-change application.
:::
+ The exception type can be set to "Node Exception Termination" or "Node Exception Rollback"
    - Node Exception Termination: When a node has an exception, the process will be terminated.
    - Node Exception Rollback: When a node has an exception, the node status will be rolled back to the unexecuted state.
:::info Note
This exception handling mechanism is only applicable to manual nodes.
:::
### 2. Operation Method
+ Under process configuration, select the application and click "Save" to successfully modify the application.
+ Under process configuration, the exception rollback type can be selected from the drop-down menu, including Node Exception Termination and Node Exception Rollback.
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/ProcessDesiner/Process%20Design/ychglx.png)