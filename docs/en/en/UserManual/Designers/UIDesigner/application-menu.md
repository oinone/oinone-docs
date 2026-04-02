---
title: Application Menu
index: true
category:
  - User Manual
  - Designer
order: 2
---
The data dictionary is a collection of fixed dictionary items that can be used as options for multiple-choice or single-choice selections.
# Ⅰ. Filter
### 1. Function Introduction
According to actual needs, select applications/modules, data dictionary types, or enter names to customize filter conditions to accurately filter data dictionaries. It supports one-click clearing of all filter conditions.
:::info Note
In the drop-down selection of application/module filter items, it is only a preliminary filter for the applications or modules on the platform. In the actual filtering operation, you still need to further select specific applications or modules to complete the configuration. Similarly, only when all filter items are configured correctly can the correct data dictionary be filtered out.
:::
### 2. Operation Method
+ Select or enter conditions in the filter area to complete the filtering of the data dictionary
+ Click "Reset Filter" to clear all existing filter conditions
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%95%B0%E6%8D%AE%E5%AD%97%E5%85%B8/%E7%AD%9B%E9%80%89.png)
# Ⅱ. Import Data Dictionary
### 1. Function Introduction
Importing a data dictionary is an efficient way to add a data dictionary. You can download the import template provided by the platform, fill in the relevant information according to the established rules, and import the file into the system to quickly complete the addition of the data dictionary.
+ Import Template: The platform provides a model import template, and the templates provided under different operation modes are different, and the operation mode can be switched
:::info Note
The import templates provided in No-Code Mode and Expert Mode are different:
+ In No-Code Mode, the template only provides basic model information, with a small quantity and easy to fill in
+ In Expert Mode, the template provides rich model information, detailed content, and more professional information
:::
+ Import Instructions: It elaborates the meaning and filling rules of each item in the import template, which can help users fill in the import file accurately. According to different operation modes, corresponding import instructions are provided to ensure that users can successfully complete the import process.
+ Upload File: Only files with extensions .xlsx, .xls, .xlsm are supported
:::info Note
When uploading a file, you should upload a file corresponding to the current operation mode.
:::
### 2. Operation Method
+ Click "Import Data Dictionary" and select the所属 application
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%95%B0%E6%8D%AE%E5%AD%97%E5%85%B8/%E5%AF%BC%E5%85%A51.png)
+ Click the "Current Mode" button to switch the operation mode
+ Click "Click to Download Import Data Dictionary Template" to download the import template in the corresponding mode
+ Click "Import Instructions" to view the import instructions in the corresponding mode
+ Click "Click to Upload" or drag the file to the specified location to upload the file
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%95%B0%E6%8D%AE%E5%AD%97%E5%85%B8/%E5%AF%BC%E5%85%A52.png)
# Ⅲ. Add Data Dictionary
### 1. Function Introduction
You can create a no-code dictionary through the model designer. Adding a data dictionary in Expert Mode and No-Code Mode is different:
+ Adding a data dictionary in Expert Mode: You need to fill in the dictionary name, dictionary code, dictionary item type, and add dictionary items. Other filling contents can be left blank, and some contents will be assigned default values by the system
:::info Note
+ There are three types of dictionary items, namely: Binary, Text, and Integer.
    - When selecting Binary, the dictionary item value needs to select which bit is stored in the database binary. The system will find the dictionary item name according to the dictionary item value area, so the dictionary item values cannot be repeated.
    - When selecting Text/Integer, the data dictionary item value can only input text/integer
+ The dictionary code can set an English-led code in Expert Mode, and the default in No-Code Mode is "Module Code.k2.Dick + ten-digit number"
:::
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%95%B0%E6%8D%AE%E5%AD%97%E5%85%B8/%E6%B7%BB%E5%8A%A01.png)
+ Adding a data dictionary in No-Code Mode: Fill in the dictionary name and add dictionary items
:::info Note
The system will automatically set the dictionary item type to "Binary" and set the number of digits of the dictionary item value in the order of creation
:::
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%95%B0%E6%8D%AE%E5%AD%97%E5%85%B8/%E6%B7%BB%E5%8A%A02.png)
### 2. Operation Method
Click "Add Data Dictionary", select the所属 application/module to add, click "Add" to display the pop-up window, and click "OK" after filling in to successfully create the data dictionary.
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%95%B0%E6%8D%AE%E5%AD%97%E5%85%B8/%E6%B7%BB%E5%8A%A03.png)
:::info Note
When adding data dictionary items, there are at most 30 items
:::
# Ⅳ. Modify Data Dictionary
### 1. Function Introduction
The successfully created data dictionary can be modified
:::info Note
+ Only part of the information supports modification, and part of the information is fixed when created, so please fill in carefully when creating
+ If the data dictionary has been referenced, the dictionary items cannot be deleted
:::
### 2. Operation Method
Click the "Modify Icon" to modify the data dictionary
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%95%B0%E6%8D%AE%E5%AD%97%E5%85%B8/%E4%BF%AE%E6%94%B9.png)
# Ⅴ. View Reference Relationship
### 1. Function Introduction
Through this function, you can view various elements that have a reference relationship with the data dictionary, including other fields and views. Each relationship is displayed through a list, and the list items are links that can be linked to the corresponding design page; the content is the corresponding content.
:::tip Example
The list items of the fields with reference relationships display the names of the fields, and the list items link to the design page of the corresponding field.
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%95%B0%E6%8D%AE%E5%AD%97%E5%85%B8/%E5%BC%95%E7%94%A81.png)
:::
### 2. Operation Method
Click the "View Referenced Information" icon to view the reference relationship
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%95%B0%E6%8D%AE%E5%AD%97%E5%85%B8/%E5%BC%95%E7%94%A82.png)
# Ⅵ. Discard/Enable Data Dictionary
### 1. Function Introduction
For data dictionaries that are not currently in use, you can perform the discard operation. If needed in the future, you only need to set the discarded data dictionary to the available state to put it back into use. In addition, the discarded data dictionary still supports operations such as editing.
:::info Note
The discarded data dictionary will no longer be displayed in the optional list when referenced by other designers.
:::
### 2. Operation Method
Click "Discard" to set the data dictionary to the discarded state, and the button becomes "Set to Available"; click again to set the data dictionary to the available state
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%95%B0%E6%8D%AE%E5%AD%97%E5%85%B8/%E5%BA%9F%E5%BC%83.png)
# Ⅶ. Delete Data Dictionary
### 1. Function Introduction
When the data dictionary is no longer used, you can choose to delete it. Low-code dictionaries are not allowed to be deleted.
:::info Note
Before deleting, make sure that the data dictionary is not referenced by other designers, otherwise the deletion operation will not be possible.
:::
:::danger Warning
The deleted data dictionary will no longer appear in the dictionary list, and this operation is irreversible. Please perform it with caution!
:::
### 2. Operation Method
Click "Delete" to delete the data dictionary.
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%95%B0%E6%8D%AE%E5%AD%97%E5%85%B8/%E5%88%A0%E9%99%A4.png)
# Ⅷ. Attachment: Noun Explanation
| Noun | Description |
| --- | --- |
| No-Code Dictionary | A dictionary designed through a no-code designer (such as a model designer, interface designer) is called a no-code dictionary |
| Low-Code Dictionary | A dictionary written through a low-code R&D framework or automatically generated during no-code design is called a low-code dictionary |