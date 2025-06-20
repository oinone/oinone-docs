---
title: Role and Permission
index: true
category:
  - User Manual
order: 4
next:
  text: Workflow
  link: /zh-cn/UserManual/StandardModules/workflow.md
---
# I. Role Types
### 1. Function Introduction
This function supports the classification and management of user roles and can be flexibly customized according to the company's business requirements, such as administrators, ordinary users, and guests.

### 2. Operation Methods
+ Filter: Enter or select the corresponding filter conditions according to the actual scenario requirements to filter role types.
+ Add: Click "Create", enter the required configuration information, and save it to successfully create a new role type.
+ Delete: Select a role type and click "Delete" to delete it.
+ Import: Support importing role type information using a file. You can download the import template. After filling in the information completely, upload the file to complete the import.
+ Export: Support exporting role types. You can choose to use the preset export template or customize the export fields according to actual needs.
+ Edit: Click "Edit" to update or modify the relevant information of the role type.
+ Details: Click "Details" to view the detailed information of the selected role type.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Management%20Center/Roles%20and%20Permissions/jslx.png)

# II. Role Management
### 1. Function Introduction
Role management is the core basic function of the permission system, responsible for the creation, maintenance, and management of specific roles. It supports detailed permission configuration for roles to ensure that each role has appropriate access and operation permissions.

:::info Note

To make the resource management permissions effective, the role needs to have access to the "Management Center" first.

:::

In the permission configuration, there are four major permissions, namely resource access permission, resource management permission, field permission, and data permission.

+ Resource Access Permission: Roles with access permission can access the selected applications or menus.

:::info Note

If only the permissions of the secondary menu are authorized without authorizing the corresponding primary menu, even if you have the permissions of the secondary menu, you cannot access it.

:::

+ Resource Management Permission: Roles with management permission can further authorize the management permission to other users and distribute it downward.

:::info Note

+ If the management permission is granted to an application, all menus under this application will also be granted the management permission. In addition, you can also grant the management permission to specific menus under an application separately.
+ The platform uses a permission control method that independently manages parent and child nodes, providing greater flexibility for users. Given the independent nature of parent and child nodes, the system has specially added a "Select All" function to simplify the permission configuration process, avoid the tedious operation of checking items one by one, and significantly improve the efficiency of permission configuration.
+ When we adjust the permissions for applications or menus in the "System Permissions", the changes will be synchronized to the permission configuration in the "Role Management". However, when we modify the permissions in the "Role Management", the system will not synchronize the changes to the permission configuration in the "System Permissions".

:::

:::tip Example

Select an application in the "System Permissions" menu and add a role named "Test Only" to the "Access Permission" permission group of this application. Then, go to the "Permission Configuration" module in the "Role Management" to make modifications and see what happens.

+ First, add the "Test Only" role to "Resource - Address Library - Region" in the "System Permissions".

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Management%20Center/Roles%20and%20Permissions/jsgl1.png)

+ Then, enter the "Role Management" module, find the "Test Only" role, and click "Permission Configuration". At this time, you can see that this role already has access to "Resource - Address Library - Region".

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Management%20Center/Roles%20and%20Permissions/jsgl2.png)

+ Next, make modifications in the "Role Management", such as checking the access permission of "Country Group". After completion, return to the "System Permissions" to view.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Management%20Center/Roles%20and%20Permissions/jsgl3.png)

+ It is found that the "Test Only" role just added has been removed from the "System Permissions".

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Management%20Center/Roles%20and%20Permissions/jsgl4.png)

This is because the system does not synchronize the permission modifications at the role level back to the menu level. Instead, it directly removes the role to ensure the accuracy and consistency of permission configuration.

:::

+ Field Permission: You can view and manage all models and their field permissions of a certain role. The system provides two search boxes for easy search:
    - Search Box 1: Allows users to quickly search by the model's code or name to locate specific models conveniently.
    - Search Box 2: Users can filter models by permission status, choosing to display models that the role has permissions for or view all models in the system.

You can use these two search boxes to quickly find and modify the permissions of relevant models or fields, including read and write permissions.

+ Data Permission: Refers to setting data permission items for specific roles. You can filter fields in the model according to actual needs, allowing users of different roles to obtain different information.

:::info Note

Data permission items can be managed and maintained in "Management Center - Role and Permission - Data Permission Items".

:::

:::warning Tip

The system provides two ways to set data permissions for roles:

+ In "Role Management", you can configure data permission items for specific roles in "Permission Configuration - Data Permission".
+ In "Data Permission", you can quickly configure data permission items for one or more users.

:::

### 2. Operation Methods
+ Filter: Enter or select the corresponding filter conditions according to the actual scenario requirements to filter specific roles.
+ Add: Click "Create", enter the required configuration information, and save it to successfully create a new specific role.
+ Edit: Click "Edit" to update or modify the relevant information of the specific role.
+ Disable/Enable: When a role is no longer in use, click "Disable" to deactivate it. When you need to use it again, click "Enable" to restore it.
+ User Management: Click "User Management" or select a role and click "Bind Users" to configure multiple users for the selected role uniformly.
+ Permission Configuration: Click "Permission Configuration" to view and configure various permissions of the role.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Management%20Center/Roles%20and%20Permissions/jsgl5.png)

# III. System Permissions
### 1. Function Introduction
In permission management, you can configure permissions for applications or menus, including management permissions and access permissions.

+ Management Permission: Grants the selected role full management permissions for the current application/menu, including the ability to distribute permissions downward, ensuring that the role can fully manage and maintain the application/menu.
+ Access Permission: Allows the selected role to access the current application/menu, ensuring that it can perform corresponding operations and functions. Multiple permission groups can be configured for access permissions, and different permission groups can be authorized to different roles.

:::info Note

+ When you have the management permission for an application, all menus under this application will also be granted the management permission. In addition, you can also grant the management permission to specific menus under an application separately.
+ When a role with the resource management permission is specified for a menu, even if the role does not have the management permission for the application to which the menu belongs, it can still further distribute subordinate permissions for the menu in the management center.
+ Having access permission does not mean having management permission. Similarly, having management permission does not mean having access permission. These two permissions need to be authorized separately and have no direct relationship.

:::

+ Collect Permission Items: When there are new or upgraded functions in the major designers provided by the platform (including model designer, interface designer, process designer, integration designer, data visualization, and microflow designer), you can grant new function permissions to the user designers with one click.

:::info Note

Only platform designers support collecting permission items. Other applications or modules do not support it for now.

:::

### 2. Operation Methods
+ Application
    - Configure Management Permission: Select an application, add the corresponding role in "Manage Application", and the added role will have the management permission for this application.
    - Configure Access Permission: Select an application, add the corresponding role in "Access Application", and the added role will have the access permission for this application.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Management%20Center/Roles%20and%20Permissions/xt1.png)

+ Menu
    - Configure Management Permission: Select a menu, add the corresponding role in "Manage Resource", and the added role will have the management permission for this menu.
    - Configure Access Permission:
        * Add: Select a menu, add a permission group for it. In the permission group, you can set the action permissions, field permissions, and data permissions for the menu. After configuration, click "OK" to add a permission group. Add roles to this permission group, and the added roles will have the permissions configured in the permission group.
        :::info Note
        1. Action Permission: You can customize which action operation permissions are included in the menu under this permission group. Actions that do not follow Oinone's Action R & D specification will not be subject to permission control.
        2. Field Permission: You can customize the field permissions of the main model associated with the menu. It should be noted that only after turning off the corresponding switch in the "All" option, the specific permission settings of the following fields will take effect.

        ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Management%20Center/Roles%20and%20Permissions/xtqx-zdqx.png)

        3. Data Permission: You can customize the filtering conditions to set the data permissions that the current permission group has. If not set, it will be considered to have all data permissions. The data permission items automatically generated here can be viewed in the bound roles (Role Management - Permission Configuration - Data Permission).

        :::
        * Edit: Support updating and modifying the relevant information and permissions of existing permission groups.
        * Delete: Support deleting permission groups that are no longer needed.
        * Disable/Enable: When a permission group is no longer in use, turn off the switch to deactivate it. When you need to use it again, turn on the switch to restore it.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Management%20Center/Roles%20and%20Permissions/xt2.png)

+ Batch Authorization: Click "Batch Settings", select single or multiple applications or menus, and add roles to them to grant corresponding access permissions. After the addition is completed, click "Cancel Batch".

:::info Note

+ Batch authorization can only add access permissions to applications or menus.
+ During the batch authorization process, the platform will automatically create a default permission group. This permission group gives users the ability to manage all data and all management permissions under the current menu.
+ The default permission group will only follow the action permission rules at the time of the first creation. If batch operations are performed again later, the default permission group will not be created again, but the default permission group created for the first time will be used, and the previous action permissions will be followed.

:::

+ Collect New Permissions: Click "Collect New Permissions" to add new function permissions to the designer.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Management%20Center/Roles%20and%20Permissions/xt3.png)

# IV. Data Permissions
### 1. Function Introduction
You can set data permission items for roles, filter fields in the model according to actual needs, and allow users of different roles to obtain different information.

:::info Note

+ Roles can be managed and maintained in "Management Center - Role and Permission - Role Management".
+ Data permission items can be managed and maintained in "Management Center - Role and Permission - Data Permission Items".

:::

### 2. Operation Methods
+ Filter: Enter or select the corresponding filter conditions according to the actual scenario requirements to filter data permissions.
+ Add: Click "Create", enter the required configuration information, and save it to successfully create new data permissions.
+ Edit: Click "Edit" to update or modify the relevant information of data permissions.
+ Details: Click "Details" to view the detailed information of the selected data permissions.
+ Disable/Enable: When data permissions are no longer in use, click "Disable" to deactivate them. When you need to use them again, click "Enable" to restore them.
+ Delete: Select a data permission and click "Delete" to delete it.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Management%20Center/Roles%20and%20Permissions/sjqx.png)

# V. Data Permission Items
### 1. Function Introduction
You can configure specific filtering conditions for fields in the model to determine their data permission scope.

### 2. Operation Methods
+ Filter: Enter or select the corresponding filter conditions according to the actual scenario requirements to filter data permissions.
+ Add: Click "Create", enter the required configuration information, and save it to successfully create new data permissions.
+ Edit: Click "Edit" to update or modify the relevant information of data permissions.
+ Details: Click "Details" to view the detailed information of the selected data permissions.
+ Delete: Select a data permission and click "Delete" to delete it.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Management%20Center/Roles%20and%20Permissions/sjqxx.png)

# VI. Role Permission Example
Configure a "Sub - Administrator" role with the following functions:

+ Ability to Distribute Management Permissions Downward: Sub - administrators can distribute management permissions downward, including granting or revoking the management permissions of an application, menu, or homepage to other roles.
+ Access Permission: Sub - administrators are granted access permissions to access specified applications, menus, or the homepage on the platform.

:::info Note

Sub - administrators must have management and access permissions to the "Management Center".

:::

1. Create a role named "Sub - Administrator".

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Management%20Center/Roles%20and%20Permissions/sl1.png)

2. Bind the "Sub - Administrator" role to a user so that the user has the corresponding permissions.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Management%20Center/Roles%20and%20Permissions/sl2.png)

3. Assign the management permission of an application to the "Sub - Administrator".

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Management%20Center/Roles%20and%20Permissions/sl3.png)
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Management%20Center/Roles%20and%20Permissions/sl4.png)

4. Log in as the user belonging to the "Sub - Administrator" and continue to distribute management and access permissions downward.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Management%20Center/Roles%20and%20Permissions/sl5.png)

At this point, the role permission configuration for the "Sub - Administrator" is successfully completed. The "Sub - Administrator" can continue to distribute permissions downward following the same steps.