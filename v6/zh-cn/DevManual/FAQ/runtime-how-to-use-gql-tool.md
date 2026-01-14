---
title: 运行时：如何使用 GQL 工具正确发起请求
index: true
category:
- 常见问题（faq）
order: 14
---
# 一、简介
本文将讲解一下如何正确发起 GQL 请求和 GQL 工具使用过程中的常见问题。

# 二、参数介绍
在浏览器的请求标头中，能够查找到请求的 `URL` 以及请求方法。在发起请求时，确保所使用的请求 `URL` 与请求方法和浏览器请求标头中的信息保持一致，这样便能够向服务端正常发送请求。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/FAQ/Snipaste_2024-10-25_15-09-01.jpg)

每一项请求均涵盖两个部分的内容：其一为 “Query”，其二为 “Variables”。若要实现正常请求操作，仅需在相应位置右键点击 “Query” 与 “Variables”，选择复制值选项，随后将所复制的值直接粘贴至相关工具中即可。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/FAQ/Snipaste_2024-10-25_15-13-50.jpg)

:::info 注意：

如果使用 admin 账号登录，请求的时候可以不携带 Variables 参数，因为 admin 没有权限控制，如果使用其他用户，就必须携带 Variables 参数，否则会被权限拦截。

:::

