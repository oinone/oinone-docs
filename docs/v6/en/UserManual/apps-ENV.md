---
title: Apps ENV
index: true
category:
  - User Manual
order: 4
---
In the application environment, you can flexibly configure the deployment environment and support viewing the logs of application import/export and deployment. If there are issues during the process of importing/exporting applications or deploying the environment, the logs can provide detailed error information, helping users quickly locate the cause of the problem, conduct troubleshooting, and perform repairs, thus better managing the application lifecycle and ensuring the smooth operation and efficient maintenance of applications.

# I. Deployment Environment Configuration
### 1. Function Introduction
In the deployment environment configuration, you can conveniently manage various environments, including creating new environments, editing existing environments, deleting environments, and other functions. These configured deployment environments can be used during synchronous deployment in the application center.

:::info Note

+ The synchronous deployment function aims to achieve one-click synchronization of design data across different environments, that is, one-click deployment of design data such as models and interfaces designed in Environment A to Environment B.
+ When performing synchronous deployment of design data across multiple environments, you must correctly configure the initiating environment and the target environment.

:::

### 2. Operation Method
+ Create: Click "Create", fill in the environment information, and click "OK" to successfully create the environment.

:::info Note

+ If enabled, this deployment environment can be selected during synchronous deployment in the application center; if not enabled, it cannot be selected.
+ If set as the current deployment environment, this deployment environment will be the one currently used by the platform.

:::

+ Edit: Click "Edit" to modify the deployment environment information.
+ Details: Click "Details" to view the detailed information of the deployment environment.
+ Delete: Select the deployment environment to be deleted and click "Delete" to successfully delete it. Batch deletion is supported.

:::danger Warning

Once an environment is deleted, it cannot be restored. Please operate with caution!

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E7%8E%AF%E5%A2%83/%E9%83%A8%E7%BD%B2%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE.png)

:::tip Example

Configuring the deployment environment

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E7%8E%AF%E5%A2%83/%E9%85%8D%E7%BD%AE%E9%83%A8%E7%BD%B2%E7%8E%AF%E5%A2%83%E4%B8%BE%E4%BE%8B1.png)

To obtain the API Key and API Secret in the configuration environment, go to the "Integration Interface - Open Management - Applications" page, enter "Metadata" in the search box, and perform a search. The search results will list the relevant data. View the key section of the data to obtain the required API Key and API Secret.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E7%8E%AF%E5%A2%83/%E9%85%8D%E7%BD%AE%E9%83%A8%E7%BD%B2%E7%8E%AF%E5%A2%83%E4%B8%BE%E4%BE%8B2.png)
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E7%8E%AF%E5%A2%83/%E9%85%8D%E7%BD%AE%E9%83%A8%E7%BD%B2%E7%8E%AF%E5%A2%83%E4%B8%BE%E4%BE%8B3.png)
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E7%8E%AF%E5%A2%83/%E9%85%8D%E7%BD%AE%E9%83%A8%E7%BD%B2%E7%8E%AF%E5%A2%83%E4%B8%BE%E4%BE%8B4.png)

:::

# II. Design Import/Export
### 1. Function Introduction
Displays the design import/export logs in the application center. Through the logs, you can track the progress of application import/export in real-time, ensuring the smooth execution of application import/export. If there are issues during the import/export process, the logs can provide detailed error information, allowing you to quickly locate the cause of the problem and conduct troubleshooting.

### 2. Operation Method
Click "Details" to view the detailed information of import/export.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E7%8E%AF%E5%A2%83/%E8%AE%BE%E8%AE%A1%E5%AF%BC%E5%85%A5%E5%AF%BC%E5%87%BA.png)

# III. Deployment Tasks
### 1. Function Introduction
Displays the synchronous deployment logs in the application center. By viewing the logs, you can monitor the deployment status in real-time, ensuring the smooth progress of the deployment process. If there are issues during the deployment process, the logs can provide detailed error information, allowing you to quickly locate the cause of the problem, conduct troubleshooting, and perform repairs.

### 2. Operation Method
Click "Details" to view the detailed information of the deployment task.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E7%8E%AF%E5%A2%83/%E9%83%A8%E7%BD%B2%E4%BB%BB%E5%8A%A1.png)