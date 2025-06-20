---
title: Workflow
index: true
category:
  - User Manual
order: 5
prev:
  text: Roles and Permissions
  link: /zh-cn/UserManual/StandardModules/AdministrationCenter/role-and-permission.md
---
# I. Workflow
Similar to the workbench, for details, please refer to the workbench documentation.

# II. Process Execution Records
Process execution records are used to record the execution status of workflows. Every time a workflow is executed, the system saves a corresponding execution record in the process execution records.

## (1) Filtering
### 1. Function Introduction
According to actual business requirements, you can customize the filtering conditions for process execution records. Under the current filtering conditions, the corresponding list of process execution records will be displayed, making it convenient to view different process execution records.

### 2. Operation Methods
+ Filter: After selecting or entering conditions in the filtering area, click "Search" to filter the process execution records.
+ Clear All at Once: Click the "Clear" icon to clear all conditions in the current filtering area at once.
+ Manage Filtering Schemes: Move the mouse over the "Filtering Scheme" icon to manage filtering schemes.
    - Add: After selecting or entering filtering conditions in the filtering area, click "Save Current Conditions". Enter the scheme name in the pop-up window to add the current combination of filtering conditions to the filtering scheme.
    - Search: Enter the scheme name in the input box.
    - Modify: After clicking "Manage Filtering Schemes", select a scheme in the pop-up window and click the scheme name to modify the scheme name.
    - Delete: Select a scheme in the scheme list and click the "Delete" icon to delete the filtering scheme.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Workflow/lcsx.png)

## (2) Details
### 1. Function Introduction
The system supports viewing the execution details of workflows. You can not only check the basic information of each node but also comprehensively understand the overall running status and detailed information of the workflow.

:::warning Tip
For workflows initiated by the currently logged-in user and still in the "In Progress" state, the user can initiate a reminder operation to speed up the process execution.
:::

### 2. Operation Methods
+ Click "Details" to jump to the process execution details page and view the detailed information of the workflow execution.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Workflow/lcxq.png)

# III. System Settings
## (1) SMS Channel Configuration
### 1. Function Introduction
Due to the specific requirements of different versions, services, or business scenarios, different SMS channels may need to be selected when configuring SMS templates. To meet these flexible configuration requirements, we provide an SMS channel configuration management interface to ensure the accuracy and efficiency of SMS services.

### 2. Operation Methods
+ Filter: Enter or select the corresponding filtering conditions according to actual scenario requirements to filter SMS channels.
+ Add: Click "Create", enter the required configuration information and save to successfully create a new SMS channel.
+ Edit: Click "Edit" to update or modify the relevant information of the SMS channel.
+ Details: Click "Details" to view the detailed information of the selected SMS channel, including configuration parameters and status.
+ Delete: Select an SMS channel and click "Delete" to delete the SMS channel.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Workflow/dxtd.png)

## (2) Email Server Configuration
### 1. Function Introduction
The system supports customizing email server configurations, allowing users to set various parameters of the email server according to actual needs to ensure that emails can be sent and received accurately and in a timely manner. Users can configure based on their own email service providers, server addresses, port numbers, etc., to meet the email sending requirements in different scenarios.

### 2. Operation Methods
+ Filter: Enter or select the corresponding filtering conditions according to actual scenario requirements to filter email servers.
+ Add: Click "Create", enter the required configuration information and save to successfully create a new email server.
+ Edit: Click "Edit" to update or modify the relevant information of the email server.
+ Details: Click "Details" to view the detailed information of the selected email server, including configuration parameters and status.
+ Delete: Select an email server and click "Delete" to delete the email server.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Workflow/yjfwq.png)

## (3) Email Signature Configuration
### 1. Function Introduction
The system supports the email signature configuration function. Users can customize the email signature content, including text, images, links, and other elements, according to the corporate or personal brand image. By configuring the email signature, not only the professionalism of the email is improved, but also the brand recognition is enhanced, enabling recipients to quickly identify the email source and improve communication efficiency.

### 2. Operation Methods
+ Filter: Enter or select the corresponding filtering conditions according to actual scenario requirements to filter email signatures.
+ Add: Click "Create", enter the required configuration information and save to successfully create a new email signature.
+ View: Click "View" to view the selected email signature.
+ Edit: Click "Edit" to update or modify the relevant information of the email signature.
+ Details: Click "Details" to view the detailed information of the selected email signature, including configuration parameters and status.
+ Delete: Select an email signature and click "Delete" to delete the email signature.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Workflow/yjqm.png)

## (4) SMS Templates
### 1. Function Introduction
In the "SMS" nodes of workflows, micro - flows, and data processes, you can select the configured SMS templates for use.

### 2. Operation Methods
+ Filter: Enter or select the corresponding filtering conditions according to actual scenario requirements to filter SMS templates.
+ Add: Click "Create", enter the required configuration information and save to successfully create a new SMS template.
+ Edit: Click "Edit" to update or modify the relevant information of the SMS template.
+ Details: Click "Details" to view the detailed information of the selected SMS template, including configuration parameters and status.
+ Delete: Select an SMS template and click "Delete" to delete the SMS template.
+ Submit for Review: For SMS templates in the pending review state or that have failed the review, click "Submit for Review". After the review is approved, you can use the SMS node for relevant operations normally.

:::info Note
For SMS templates that have been approved or are under review, editing or resubmitting for review is not allowed.
:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Workflow/dxmb.png)

## (5) Email Templates
### 1. Function Introduction
The system supports custom email templates, allowing users to flexibly design email layouts, colors, and fonts according to brand, marketing, or communication needs, meeting diverse email sending requirements and improving email communication efficiency.

:::info Note
Email templates are not directly applied in the designer but are used during the code - writing process.
:::

### 2. Operation Methods
+ Filter: Enter or select the corresponding filtering conditions according to actual scenario requirements to filter email templates.
+ Add: Click "Create", enter the required configuration information and save to successfully create a new email template.
+ Edit: Click "Edit" to update or modify the relevant information of the email template.
+ Details: Click "Details" to view the detailed information of the selected email template, including configuration parameters and status.
+ Delete: Select an email template and click "Delete" to delete the email template.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Workflow/yjmb.png)

# IV. Micro - flow Execution Records
Micro - flow execution records are used to record the execution status of micro - flows. Every time a micro - flow is executed, the system saves a corresponding execution record in the micro - flow execution records.

## (1) Filtering
### 1. Function Introduction
According to actual business requirements, you can customize the filtering conditions for micro - flow execution records. Under the current filtering conditions, the corresponding list of micro - flow execution records will be displayed, making it convenient to view different micro - flow execution records.

### 2. Operation Methods
+ Filter: After selecting or entering conditions in the filtering area, click "Search" to filter the micro - flow execution records.
+ Clear All at Once: Click the "Clear" icon to clear all conditions in the current filtering area at once.
+ Manage Filtering Schemes: Move the mouse over the "Filtering Scheme" icon to manage filtering schemes.
    - Add: After selecting or entering filtering conditions in the filtering area, click "Save Current Conditions". Enter the scheme name in the pop - up window to add the current combination of filtering conditions to the filtering scheme.
    - Search: Enter the scheme name in the input box.
    - Modify: After clicking "Manage Filtering Schemes", select a scheme in the pop - up window and click the scheme name to modify the scheme name.
    - Delete: Select a scheme in the scheme list and click the "Delete" icon to delete the filtering scheme.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Workflow/wlsx.png)

## (2) Details
### 1. Function Introduction
The system supports viewing the execution details of micro - flows. You can not only check the basic information of each node but also comprehensively understand the overall running status and detailed information of the micro - flow.

### 2. Operation Methods
+ Click "Details" to jump to the micro - flow execution details page and view the detailed information of the micro - flow execution.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Workflow/wlxq.png)

# V. Dynamic Forms
## (1) Dynamic Form Tasks
### 1. Function Introduction
In dynamic form tasks, users can customize the process name. When a task node uses the process name set in the dynamic form task, you can trigger the dynamic form task to perform corresponding testing operations on the node.

### 2. Operation Methods
+ Filter: Enter or select the corresponding filtering conditions according to actual scenario requirements to filter task nodes.
+ Add: Click "Create", enter the required configuration information and save to successfully create a new task node.
+ Edit: Click "Edit" to update or modify the relevant information of the task node.
+ Details: Click "Details" to view the detailed information of the selected task node.
+ Trigger: Click "Trigger" to trigger the task nodes included in the dynamic form task.
+ Delete: Select a task node and click "Delete" to delete the task node.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Workflow/dtbd.png)

## (2) Task Node Configuration
### 1. Function Introduction
You can flexibly configure the task nodes of dynamic forms. When they match the names of approval or filling nodes in the process designer, they can be automatically connected to the corresponding task nodes and then jump to the corresponding dynamic forms.

:::warning Tip
When the processes of approval/filling nodes of different models are the same, dynamic forms can be used. By setting the node name and binding the view, different views can be achieved for the same process, thereby reducing redundant configuration work and improving development efficiency.
:::

### 2. Operation Methods
+ Filter: Enter or select the corresponding filtering conditions according to actual scenario requirements to filter task nodes.
+ Add: Click "Create", enter the required configuration information and save to successfully create a new task node.
+ Edit: Click "Edit" to update or modify the relevant information of the task node.
+ Details: Click "Details" to view the detailed information of the selected task node.
+ Delete: Select a task node and click "Delete" to delete the task node.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Workflow/rwjd.png)