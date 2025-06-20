---
title: Application:Embedding as Iframe into Existing Systems
index: true
category:
   - Frontend
order: 5
---
# I. Scenario Overview
How to add an interface for embedding other systems via Iframe in the management background:
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/Snipaste_2024-12-27_15-02-03.png)

# II. Solutions
1. Create a new model with a field for [URL].
2. Drag and drop the field.
   ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/51A4BA0B-9A6F-4716-8B74-15C13B76F00B.png)
3. Switch components.
   ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/94056A32-E728-46FB-8072-F6CBB8FC191F.png)
4. Click **Publish**.
5. Verify in the test environment: if the backend returns the embedded [URL] for that field, the content of the URL will be displayed.
6. The final effect is as follows:
   ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/01D2CD25-D3C7-4540-8FB6-ABE80147E6A3.png)