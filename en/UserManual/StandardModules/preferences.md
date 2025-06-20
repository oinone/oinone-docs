---
title: System Configuration
index: true
category:
  - User Manual
order: 3
next:
  text: Users
  link: /en/UserManual/StandardModules/AdministrationCenter/user.md
---
The system configuration module provides a comprehensive and flexible solution for personalized and security management configuration on the enterprise platform. It aims to precisely meet various business needs and fully showcase the enterprise's cultural characteristics. This module consists of two core components: Global Configuration, used for unified management and setting of basic system-level configurations; and Application Configuration, used to enable the translation management function, allowing enterprises to manage multilingual content and improve their internationalization operation capabilities.

# I. Global Configuration
## (I) Login Page Configuration
### 1. Function Introduction
The login page supports personalized customization, offering a variety of page layout options. Enterprises can customize the page background and the logo on the login page according to their cultural characteristics. During the setting process, you can preview the configuration effects in real-time, making customization more intuitive and convenient.

### 2. Operation Method
Select or upload relevant configuration content, and it will take effect after publication.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/system%20configuration/dly.png)

## (II) Enterprise Image Configuration
### 1. Function Introduction
You can customize enterprise information, the logo of the business application navigation bar, and the browser logo.

:::warning Prompt
Enterprise information will be displayed in the lower area of the login page. Clicking on the relevant text will redirect you to the set enterprise official website link.
:::

:::info Note
The business application navigation logo is used for display in the left sidebar menu. It supports two aspect ratio formats: 3:1 and 1:1. The 3:1 aspect ratio format is suitable for display when the menu is expanded, while the 1:1 aspect ratio format is used for display when the menu is collapsed to meet the visual requirements in different states.
:::

### 2. Operation Method
Fill in or upload relevant configuration content, and it will take effect after publication.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/system%20configuration/qyxx.png)

## (III) System Style Configuration
### 1. Function Introduction
The system display style can be fully customized, including theme mode, size adjustment, sidebar color and style selection, and multi-tab bar style settings. During the setting process, you can preview the configuration effects in real-time, making the customization operation more intuitive and convenient. If the existing styles provided by the platform cannot meet your needs, you can also download the code for personalized style customization.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/system%20configuration/xtfg1.png)

### 2. Operation Method
+ Select relevant configuration content, and it will take effect after publication.
+ Click "Download" to download the system style code for customization.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/system%20configuration/xtfg2.png)

## (IV) Advanced Home Page Configuration
### 1. Function Introduction
Enterprises can customize the default page after user login according to different users and roles, meeting the requirement that different user groups enter different home pages.

### 2. Operation Method
+ Filter: You can filter configuration rules by application or status.
+ Add: Click "Add Configuration Rule", fill in relevant information and matching rules, and then confirm to save.
+ Delete: Click the "Delete" icon and confirm to delete the selected rule.
:::info Note
Multiple rules can be configured. You can drag the rules to adjust their priorities. The priority decreases in the order of arrangement.
+ When multiple matching rules cover the same user, the system will select the rule with the highest priority and apply it to the platform's home page display for that user.
:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/system%20configuration/gjsy.png)

# II. Application Configuration
## (I) Translation Management Configuration
### 1. Function Introduction
You can choose whether to enable the page toolbox. After enabling it, when the system language is set to a language other than Simplified Chinese, a toolbox will be displayed in the lower right corner of the page. This toolbox supports adding or modifying translation items, making the system's internationalization management more flexible and convenient, and efficiently meeting multilingual needs.

### 2. Operation Method
Select to enable it and then change the system language, and the page toolbox will be displayed.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/system%20configuration/fy1.png)

When using a language other than Simplified Chinese, if you need to add or change translation items, click the toolbox and select the corresponding translation item in the pop-up window for setting.

:::info Note
The scope of translation application refers to the scope that the translation can cover after it takes effect, including the application where the source term is located and globally:
+ If you select "Application where the source term is located", this translation item will only take effect in the set "Application where the translation is located".
+ If you select "Global", this rule can be used throughout the system.
:::

:::tip Example
In the "English" language environment, add a translation item for the incorrectly translated "Product Category".

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/system%20configuration/fy2.gif)
:::