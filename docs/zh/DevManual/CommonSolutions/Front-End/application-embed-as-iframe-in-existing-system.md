---
title: 应用：作为Iframe嵌入到已有系统中
index: true
category:
   - 前端
order: 5
---
# 一、场景概述
管理后台如何新增 Iframe 嵌入其他系统的界面：
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/Snipaste_2024-12-27_15-02-03.png)

# 二、解决方案
1. 新建一个模型。模型中有放【url】的字段
2. 拖入字段![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/51A4BA0B-9A6F-4716-8B74-15C13B76F00B.png)
3. 切换组件
   ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/94056A32-E728-46FB-8072-F6CBB8FC191F.png)
4. 点击发布
5. 测试环境验证下，后端那个字段返回嵌入的【url】就可以展示这个url的内容了
6. 最后效果如下：
   ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/01D2CD25-D3C7-4540-8FB6-ABE80147E6A3.png)

