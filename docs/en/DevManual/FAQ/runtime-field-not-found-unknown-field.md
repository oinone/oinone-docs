---
title: Runtime:Field Not Found - Unknown field ‘xx’
index: true
category:
- FAQs (Frequently Asked Questions)
order: 17
---
# I. Error Message
During a GraphQL or page request, the system throws an error indicating that a field cannot be found. However, the requested API does return this field, and the interface data is successfully retrieved but fails to reach the frontend due to this missing field error.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/FAQ/1748080212308-e1699354-4630-48ab-98fd-53a0b0563e3e.png)

# II. Solutions
1. **Check for Page Field Changes Without Interface Designer Updates**
   - This error may occur if fields on the current page have been modified, but the Interface Designer was not updated to reflect these changes, causing outdated fields to remain in the page configuration.
   - **Solution**: Verify and update the page configuration in the Interface Designer to ensure alignment with the current fields.

2. **Ensure Consistency Between Requested and Defined Models**
   - **For `@Action` or `@Function` Definitions**:
     - The input and output parameters of these methods must either match the model specified in the `@Model.model()` annotation of the current class or be a model fully contained within it (e.g., a parent model).
   - **For Page Invocations**:
     - The `@Action` or `@Function` methods invoked by the page must use Oinone objects as input and output parameters. Basic Java types are not supported because Oinone objects carry metadata essential for automatic frontend-backend interaction.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/FAQ/1748080270866-421f0ff1-ffad-43a8-b5a1-cbe7bac5e6b3.png)