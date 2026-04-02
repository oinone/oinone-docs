---
title: 运行时：界面设计器选不到模型
index: true
category:
- 常见问题（faq）
order: 19
---
# 一、场景复现
![](http://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/FAQ/1748058278545-4e74dfd9-2a2e-4758-b6e5-8236404ca11e.png)

# 二、解决方案
1. 查询的模型模型不属于该模块，要在该模块里依赖查询模型所属模块
2. 如果模型配置添加了`@Base`注解，则查询时该模型会被过滤掉
3. 如果使用了协同开发，则必须使用模型编码的方式搜索

