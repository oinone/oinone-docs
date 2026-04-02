---
title: 运行时：找不到字段：Unknown field ‘xx’
index: true
category:
- 常见问题（faq）
order: 17
---
# 一、报错信息
gql 请求或页面请求时，调用报错找不到字段。但是请求接口有这个字段返回 接口数据也返回了 返回给前端就报这个字段没有

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/FAQ/1748080212308-e1699354-4630-48ab-98fd-53a0b0563e3e.png)

# 二、解决方案
1. 检查当前页面有没有字段变更，但是界面设计器没有重新配置页面，导致该错误字段仍然存在于页面上。
解决：检查界面设计器中该页面是否需要变更。
2. 检查请求的模型和函数定义的模型是否一致。
+ 定义`@Action`或者`@Function`时，函数出入参必须是当前类注解定义的`@Model.model（）`的模型，或者被该模型字段全包含的的模型，比如它的父模型。
+ 页面调用使用的`@Action`或者`@Function`方法，出入参必须是 Oinone 的对象，且不能是基础的java 类型，因为 Oinone 的对象有元数据信息，这样才能完成前后端之间的自动交互

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/FAQ/1748080270866-421f0ff1-ffad-43a8-b5a1-cbe7bac5e6b3.png)

