---
title: Connector
index: true
category:
  - User Manual
  - Designer
order: 2
---
Before starting to handle integration transactions, you need to clearly define the resources that can be integrated. After the resource definition is completed, you can proceed with the orchestration of integrated data, as shown in the figure:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/1.png)

Integration refers to the connection between platform applications and external systems, while internal applications within the platform interact directly through internal service calls. As an important part of integration, connectors cover three types of resources: applications, databases, and file sets.

+ Application: Refers to the application resources that can be integrated.
+ Database: Refers to the database resources that can be integrated.
+ File Set: Refers to the file resources that can be referenced.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/2.png)

In the connector, the component list is presented in the form of cards. You can preview the basic information of applications, databases, or file sets on the cards:

+ Application: Icon, name, business domain, description, authorization status, and the number of included APIs.

:::info Note

When a certain authentication method is selected during application creation, the authorization status here will correspond to the status.

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/3.png)

+ Database: Name, type, description, and the number of included APIs.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/4.png)

+ File Set: Name, type, description, and the number of included files.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/5.png)

# I. Switch Resource Types
### 1. Function Introduction
The connector contains three major resource types: applications, databases, and file sets. You can independently manage and operate these three types of resources.

### 2. Operation Method
Click the corresponding resource type in the Tab bar to switch.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/qh.png)

# II. Filtering
### 1. Function Introduction
According to actual business needs, you can customize the filtering conditions for applications, databases, and file sets. Under the current filtering conditions, the corresponding lists of applications, databases, and file sets will be displayed, which is convenient for viewing and editing different applications, databases, and file sets.

### 2. Operation Method
+ Filtering: Enter the conditions in the filtering area and click the "Search" button to filter applications, databases, and file sets.
+ One-Click Clear: Click the "Clear" icon to clear all the conditions in the current filtering area at once.

![Application](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/sx1.png)

![Database](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/sx2.png)

![File Set](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/sx3.png)

# III. New Addition
### 1. Function Introduction
It supports customizing application, database, and file set resources.

+ Application: You can set the application's name, description, icon, business domain, server address, authentication method, and encryption method.
+ Database: You can set the database's type, name, description, connection address, port, extended parameters, source database name, account, and password.
+ File Set: You can set the file set's name, type, and description.

:::info Note

Database resources can include operation resources such as queries, inserts, updates, and deletes, but DDL execution is not allowed.

:::

:::warning Tip

After filling in the database information, you can test its connection. Even if the current connection fails or the connection is not tested, the connection can still be successfully created.

:::

### 2. Operation Method
+ Application: Click the "New Application Resource" button, fill in the information according to your needs on the pop-up page, and then save to create it successfully.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/xz1.png)

+ Database: Click the "New DB Resource" button, fill in the information according to your needs on the pop-up page, and then save to create it successfully.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/xz2.png)

+ File Set: Click the "New File Set" button, fill in the information according to your needs on the pop-up page, and then save to create it successfully.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/xz3.png)

# IV. Editing
### 1. Function Introduction
Successfully created applications, databases, and file sets can be edited.

### 2. Operation Method
Click the "Edit" button, and you can edit on the pop-up editing page (the same applies to databases and file sets as shown here for applications).

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/bj.png)

# V. View References
### 1. Function Introduction
You can view various elements that have reference relationships with the application, database, or file set.

### 2. Operation Method
Click the "View References" icon to view the reference information. (The same applies to databases and file sets as shown here for applications).

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/yy.png)

# VI. Deletion
### 1. Function Introduction
When an application, database, or file set is no longer in use, you can choose to delete it.

:::info Note

Before deletion, ensure that the application, database, or file set is not being referenced; otherwise, the deletion operation will fail.

:::

:::danger Warning

Once an application, database, or file set is deleted, it cannot be recovered. Please operate with caution!

:::

### 2. Operation Method
Click the "Delete" icon, confirm the deletion, and it will be deleted. (The same applies to databases and file sets as shown here for applications).

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/sc.png)

# VII. Details
### 1. Function Introduction
An application or database can contain multiple APIs, and a file set can contain multiple files, but not all of them can be presented on the card. To understand applications, databases, and file sets more comprehensively, you can view their details, including browsing the basic information of applications, databases, and file sets, as well as the information of all the included APIs and files.

:::info Note

If a certain authentication method is selected during application creation, you can add its authorization information in the details.

:::

### 2. Operation Method
Click the card to enter its details page (the same applies to databases and file sets as shown here for applications).

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/xq.png)

# VIII. Manage APIs
After entering the details page, you can manage the included APIs and files, including operations such as addition, deletion, and editing.

## (I) Query
### 1. Function Introduction
According to actual business needs, you can customize the filtering conditions for APIs or files. Under the set filtering conditions, the corresponding lists of APIs or files will be displayed.

### 2. Operation Method
Select or enter conditions in the filtering area to filter APIs or files (the same applies to databases and file sets as shown here for applications).

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/glAPI/cx.png)

## (II) New Addition
### 1. Function Introduction
Applications can add new APIs or WebServices according to business needs, databases can add new APIs, and file sets can add new files.

+ New API: You can set the basic information of the API, request parameters, and response results.
    - API URL support:
        * Protocol type: HTTP/HTTPS
        * Verb: GET, POST, PUT, DELETE
    - Parameter type support: Long, Double, String, Boolean, Integer, Date, Void, Object.
    - Content types supported: application/json, x-www-form-urlencoded, multipart/form-data, application/json + fhir
+ New WebService: You can set the basic information of the WebService, request parameters, and response results (not supported for databases).
    - API URL support:
        * Protocol type: HTTP/HTTPS
        * Verb: POST
    - Parameter type support: Long, Double, String, Boolean, Integer, Date, Void, Object.

:::info Note

If the "Ignore Log Frequency Configuration" switch is not enabled, the system will only record part of the log content. Under normal operation, you can turn off this configuration to save resources. If a problem occurs during operation, you can turn on this configuration, and the system will completely record the detailed request and response information of the interface logs, which is convenient for troubleshooting and viewing.

:::

:::info Note

The paths of APIs are not allowed to be repeated.

:::

+ New File: You can upload local files, set their names and descriptions. You can preview the existing data in the files, and modify the data types according to the parsed data.
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/1754567980575-250b44e9-39e5-43e4-9da1-841751f4517c.png)

:::info Note

Supported file formats for upload are xlsx, xls, csv, and the file size should be less than 50M.

:::

### 2. Operation Method
+ For applications, click the "New API" button, select "New API" or "New WebService", fill in the information on the pop-up page, and then save to add it successfully.
+ For databases, click the "New API" button, fill in the information on the pop-up page, and then save to add it successfully.
+ For file sets, click the "New File" button, fill in the information on the pop-up page, and then save to add it successfully.

After successful creation, the APIs and files will be automatically enabled. The enabled APIs and files can be referenced.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/glAPI/xz.png)

## (III) Editing
### 1. Function Introduction
Successfully created APIs or files can be edited.

### 2. Operation Method
Click the "Edit" button, and you can edit on the pop-up editing page.

:::info Note

Editing operations are only allowed when APIs and files are in the disabled state. Once APIs and files are enabled, the edit button will be hidden to prevent improper modifications to the APIs and files in use.

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/glAPI/bj.png)  

In the SQL input area of the database API, a toggle button for 「Format」 and 「Compress」 is provided to help users view and edit SQL statements more clearly.

+ Format: After entering or pasting SQL in the input box, click 「Format」. The system will format the current SQL. Without changing the meaning of the SQL, it will re - format the SQL text to make it easier to read and maintain.
+ Compress: After entering or pasting SQL in the input box, click 「Compress」. The system will compress the current SQL. Without changing the meaning of the SQL, it will remove redundant spaces, line breaks, and indentations, and merge it into one line or very few lines.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/Process%20log/1767922157116-f6a72f64-66d3-44c4-b532-a26c078f91b4.gif)

## (IV) Integrated Interface Testing

### 1. Feature Introduction
Previously, after users configured an interface in the connector, they still needed to use external tools such as **data flows**, **Postman**, or **curl** for verification. This approach led to fragmented operations and low efficiency. Now, we have directly integrated the interface testing function into the platform, enabling a one-stop development and debugging experience.


### 2. Operation Methods
#### API:
##### Usage Example
The following takes the **DingTalk Open Platform - Create User Interface** as an example to demonstrate the workflow of interface testing.

###### Obtain Interface Information
On the DingTalk Open Platform, we can find the relevant information about this interface:
- **Request Method**: POST
- **Request URL**: `https://oapi.dingtalk.com/topapi/v2/user/create`

**Query Parameters**
```json
{
  "access_token": "d13ad96bbfd73d61a737ed2673e6bfa9"
}
```

**Body Parameters**
```json
{
  "userid": "002",
  "name": "小钉",
  "mobile": "18546673752",
  "title": "教职人员",
  "job_number": "100828",
  "work_place": "未来park",
  "senior_mode": "false",
  "dept_id_list": "1"
}
```

###### Operations on Our Platform:
1. Enter the **Connector** module and create a new API interface named 【Create User】.

:::warning Tips
Creating an API is not a mandatory step. If there is an available API already in the platform, you can directly perform testing on it.
:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/1756196514227-f6a82607-2bf9-4217-84b4-e5ec14612329-20250827110934173.png)

2. After creation, click **Test** in the operation bar.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/1756196559965-6e19b376-80c0-4b02-9c22-2a889f38c74f-20250827110939341.png)

3. Fill in the request method, URL, and parameter information obtained in the previous step into the corresponding fields.
4. Click the **Test** button to immediately verify whether the interface works properly.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/1756197885555-61b80280-6ac3-4c9d-a9a9-c5fcd75d128a-20250827110943601.png)


#### WebService:
##### Usage Example
The following takes the [WebService Weather Query Interface](http://www.webxml.com.cn/WebServices/WeatherWebService.asmx?op=getSupportCity) as an example to demonstrate the workflow of interface testing.

###### Obtain Interface Information
- **Method**: `getSupportCity`
- **Function**: Query information about supported domestic and international cities.
- **Input Parameters**:
  - `byProvinceName`: Specified province. Pass `ALL` or leave it empty to return all cities.
- **Return Result**:
  - A one-dimensional string array `String[]`, with content in the format of `City Name (City Code)`.

###### Common Calling Methods
```plain
# SOAP 1.1 Request Example
POST /WebServices/WeatherWebService.asmx HTTP/1.1
Host: www.webxml.com.cn
Content-Type: text/xml; charset=utf-8
SOAPAction: "http://WebXml.com.cn/getSupportCity"

<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
               xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
               xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <getSupportCity xmlns="http://WebXml.com.cn/">
      <byProvinceName>北京</byProvinceName>
    </getSupportCity>
  </soap:Body>
</soap:Envelope>
```

```plain
# HTTP GET Request Example
GET /WebServices/WeatherWebService.asmx/getSupportCity?byProvinceName=北京 HTTP/1.1
Host: www.webxml.com.cn
```

```plain
# Return Result (Example):
<ArrayOfString xmlns="http://WebXml.com.cn/">
  <string>北京(101010100)</string>
  <string>昌平(101010700)</string>
</ArrayOfString>
```

###### Operations on Our Platform:
1. Enter the **Connector** module and create a new API interface named 【Query Weather】.

:::warning Tips
Creating a WebService is not a mandatory step. If there is an available API already in the platform, you can directly perform testing on it.
:::

If the method name can be correctly parsed at the request parameter position, there is no need to add the additional parameter `op=methodName`.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/1756261554190-95087607-82dc-4745-8c44-2d2d28706291-20250827111614053.png)

2. After creation, click **Test** in the operation bar.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/1756261373805-472e9462-a222-4e94-a4d7-414cb4abcbe4.png)

3. Fill in the request method, URL, and parameter information obtained in the previous step into the corresponding fields.
4. Click the **Test** button to immediately verify whether the interface works properly.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/1756261453261-39386670-fad2-437f-9b03-bf35a16761fa.png)


#### Database:
##### Usage Example: Database Query Interface
The following takes the **Database Query Interface** as an example to demonstrate how to perform interface testing on the Oinone platform.

###### Obtain Interface Information
- **Operation Type**: SQL Query
- **Function**: Query student information based on the specified `id`.
- **Input Parameters**:
  - `id`: Student ID (required).
- **SQL Statement**:
```sql
select name,
       code,
       gender,
       age,
       create_time,
       enu,
       is_off
  from xs.test
 where id = {id};
```
- **Return Result**:
  - Tabular data containing fields such as `name, code, gender, age, create_time, enu, is_off`.

###### Operations on Our Platform:
1. Enter the **Connector** module and create a new database API interface named 【Query Student Information】.

:::warning Tips
Creating an API is not a mandatory step. If there is an available database API already in the platform, you can directly perform testing on it.
:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/1756261870239-976c9ca8-29f4-4d45-bbc8-ff8764f1f112.png)

2. After creation, click **Test** in the operation bar.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/1756262164666-fef63bf1-a33e-4823-bd59-383f3b6de35f.png)

3. Fill in the SQL statement and parameters (e.g., `id=1`) obtained in the previous step into the corresponding fields.
4. Click the **Test** button to immediately verify whether the query result is returned normally.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/1756262216261-0ac3a3ed-0cda-45f0-94bd-5255cdef6211.png)


In this way, users can quickly complete interface configuration and debugging within Oinone without switching to external tools, improving integration efficiency and user experience.  
In addition, both API and database interfaces can be directly tested in 【Integrated Application → Integrated Interface】, enabling seamless connection between interface debugging and application integration.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/1756198182893-13ace4a6-4717-48bd-a4ff-61ad0d78d4c5-20250827111023473.png)

## (Ⅴ) Details
### 1. Function Introduction
It supports displaying the detailed information of APIs and files.

### 2. Operation Method
Click the "Details" button to view the detailed information of the selected API or file.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/glAPI/xq.png)

## (Ⅵ) Copy
### 1. Function Introduction
When the API information has a high degree of similarity, you can use the copy function to generate a new page named "Original API Name - Copy". Edit the content and save it to successfully copy (not supported for databases and file sets).

:::info Note

The paths of APIs are not allowed to be repeated.

:::

### 2. Operation Method
Click the "Copy" button, fill in the information on the pop-up page, and then save to copy successfully.

:::info Note

When an API is not enabled, the "Edit" button will be displayed in the operation bar, and the "Copy" option will be hidden under the "More" menu.

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/glAPI/fz.png)

## (Ⅶ) Deletion
### 1. Function Introduction
When an API or file is no longer in use, you can choose to delete it.

:::info Note

APIs and files that are being referenced cannot be deleted.

:::

:::danger Warning

Once an API is deleted, it cannot be recovered. Please operate with caution!

:::

### 2. Operation Method
Click the "Delete" icon, confirm the deletion, and it will be deleted.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/glAPI/sc.png)

## (Ⅷ) Publish Open APIs
### 1. Function Introduction
It supports publishing APIs in applications and databases as open APIs. After being set as open APIs, they can be used by external systems.

:::info Note

APIs set as open APIs can be viewed in the "Open Platform".

:::

### 2. Operation Method
Select an API and click the "Publish Open API" button to publish it successfully.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/glAPI/fb.png)

## (Ⅸ) Export API Documentation
### 1. Function Introduction
It supports the export of API information in applications and databases into document format. The document adopts a uniform structure, and different types display different information according to their own characteristics, which is used to describe the configured interface capabilities under an application, including interface purpose, call mode, parameter description and return data structure

### 2. Operation Method
Select an API and click the "Export API Documentation" button to export it successfully.

:::warning Tip

The successfully exported documentation can be downloaded in "Files" - "Export Tasks".

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/glAPI/dc.png)