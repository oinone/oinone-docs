---
title: Runtime:How to Properly Initiate Requests Using GQL Tools
index: true
category:
- FAQs (Frequently Asked Questions)
order: 14
---
# I. Introduction
This article explains how to properly initiate GraphQL (GQL) requests and addresses common issues encountered when using GQL tools.

# II. Parameter Guide
1. **Request URL and Method**  
   Find the request `URL` and HTTP method in the browser's request headers. Ensure the GQL tool uses the exact same `URL` and method as the browser request to communicate with the server correctly.

   ![Request Headers](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/FAQ/Snipaste_2024-10-25_15-09-01.jpg)

2. **Query and Variables**  
   Each GQL request consists of two main parts:  
   - **Query**: Defines the structure of the data to retrieve.  
   - **Variables**: Dynamic parameters for the query (optional).  

   To replicate a request:  
   - Right-click on `Query` and `Variables` in the browser developer tools.  
   - Select "Copy Value" and paste them into your GQL tool.

   ![Copy Query and Variables](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/FAQ/Snipaste_2024-10-25_15-13-50.jpg)

:::info **Important Note**:  
- **Admin Accounts**: When logged in as an admin, you can omit the `Variables` parameter because admin users bypass permission checks.  
- **Regular Users**: Always include the `Variables` parameter. Omitting it will result in permission errors.  
:::