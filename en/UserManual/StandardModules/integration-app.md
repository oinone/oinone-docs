---
title: Integration Interfaces
index: true
category:
  - User Manual
order: 11
next:
  text: Application Center
  link: /zh-cn/UserManual/apps-hub.md
---
# I. Integration Management
## (I) Integration Interfaces
### 1. Function Introduction
The integration interfaces comprehensively display all the APIs included in the connectors in the integration designer, including interface information and call status. It provides a convenient management method to achieve unified management of all interfaces.

### 2. Operation Methods
+ Filtering: Input or select the corresponding filtering conditions according to the actual scenario requirements to filter the integration interfaces.
+ Enabling: Change the enabling status of the interface by controlling the state of the switch.
+ Ignoring Log Frequency Configuration: Change the log frequency of the interface by controlling the state of the switch.

:::info Note
If the "Ignore Log Frequency Configuration" switch is not enabled, the system will only record partial log content. Under normal operating conditions, this configuration can be turned off to save resources. If a problem occurs during operation, this configuration can be enabled, and the system will fully record the detailed request and response information of the interface logs, facilitating troubleshooting and viewing.
:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/integration%20interface/jc.png)

## (II) Circuit Breaker Configuration
### 1. Function Introduction
It supports the configuration function of circuit breaker rules. When the error rate of a specific interface exceeds the preset threshold or the response delay exceeds the critical value, the system will automatically trigger the circuit breaker mechanism to temporarily block calls to this interface. This mechanism can effectively provide a dynamic protection barrier for system stability.

### 2. Operation Methods
+ Filtering: Input or select the corresponding filtering conditions according to the actual scenario requirements to filter the circuit breaker rules.
+ Creation: Click "Create", input the required configuration information and save it to successfully create a circuit breaker rule.

:::info Tip
Two types of circuit breakers are supported: slow call circuit breaker and exception circuit breaker.
+ Slow Call Circuit Breaker: It is a circuit breaker mechanism for interfaces with excessively high response delays. By monitoring the response time of interface calls, when the ratio of slow calls (i.e., calls with a response time exceeding the preset threshold) reaches the trigger condition, calls to this interface will be temporarily blocked.
+ Exception Circuit Breaker: It is a circuit breaker mechanism for interfaces with an excessively high proportion of exceptions (errors) in calls. By monitoring the error rate of interface calls, when the exception proportion exceeds the threshold, calls to this interface will be temporarily blocked.
:::

+ Editing: Click "Edit" to modify the existing rule configuration.

:::info Tip
When the circuit breaker rule is updated, the interfaces that are already in the circuit breaker state will be reset to the available state.
:::

+ Deletion: Click "Delete" to delete the existing circuit breaker rule.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/integration%20interface/rdpz.png)

## (III) Circuit Breaker Records
### 1. Function Introduction
Circuit breaker records are used to detail the information of interface circuit breaker events. When an interface call triggers the preset circuit breaker rule, the system will automatically generate a circuit breaker record. It supports real - time tracing of details such as the circuit breaker time of the corresponding interface through this record, providing data support for fault analysis and strategy optimization.

### 2. Operation Methods
+ Filtering: Input or select the corresponding filtering conditions according to the actual scenario requirements to filter the circuit breaker records.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/integration%20interface/rdjl.png)

# II. Open Management
## (I) Open Interfaces
### 1. Function Introduction
It supports opening the system's capabilities externally, specifically including but not limited to key business interfaces such as product information query interfaces and shipping order query interfaces. It facilitates the unified management and maintenance of open interfaces.

:::warning Tip
For more information about open interfaces, please refer to the "Integration Designer - Open Platform" document.
:::

### 2. Operation Methods
+ Filtering: Input or select the corresponding filtering conditions according to the actual scenario requirements to filter the open interfaces.
+ Enabling: Change the enabling status of the interface by controlling the state of the switch.
+ Ignoring Log Frequency Configuration: Change the log frequency of the interface by controlling the state of the switch.

:::info Note
If the "Ignore Log Frequency Configuration" switch is not enabled, the system will only record partial log content. Under normal operating conditions, this configuration can be turned off to save resources. If a problem occurs during operation, this configuration can be enabled, and the system will fully record the detailed request and response information of the interface logs, facilitating troubleshooting and viewing.
:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/integration%20interface/kfjk.png)

## (II) Applications
### 1. Function Introduction
It supports opening the system's capabilities externally, allowing multiple interfaces to be integrated into an application for external access, providing users with a convenient and efficient way to open up.

:::warning Tip
For more information about applications, please refer to the "Integration Designer - Open Platform" document.
:::

### 2. Operation Methods
+ Filtering: Input or select the corresponding filtering conditions according to the actual scenario requirements to filter the applications.
+ Adding: Click "New Application", input the required configuration information and save it to successfully create a new application.
+ Enabling: Change the enabling status of the application by controlling the state of the switch.
+ Viewing Keys: Click "View Key" to view the key of this application.
+ Authorization Adjustment: Click "Authorization Adjustment" to adjust the scope of interfaces allowed to be opened in the application.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/integration%20interface/yy.png)

# III. Interface Logs
### (I) Function Introduction
Interface logs are used to record interface call status. When connecting to integration resources and using interfaces, you can check whether the interface is successfully called in the interface logs and make corresponding adjustments and optimizations according to the execution status of the interface.

:::warning Tip
For more information about interface logs, please refer to the "Integration Designer - Interface Logs" document.
:::

### (II) Operation Methods
+ Filtering: Input or select the corresponding filtering conditions according to the actual scenario requirements to filter the interface logs.
+ Details: Click "Details" to view the detailed information of the selected application log, including basic information, execution information, and parameter information.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/integration%20interface/rz.png)

# IV. Basic Data
## (I) Business Domains
### 1. Function Introduction
It can systematically classify and manage integrated applications and open interfaces according to business domains to improve the efficiency and accuracy of management.

:::warning Tip
For more information about business domains, please refer to the "Integration Designer - Business Domains" document.
:::

### 2. Operation Methods
+ Filtering: Input or select the corresponding filtering conditions according to the actual scenario requirements to filter the business domains.
+ Adding: Click "Create", input the required configuration information and save it to successfully create a new business domain.
+ Deletion: After selecting a business domain, click "Delete" to delete this business domain.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/integration%20interface/ywy.png)