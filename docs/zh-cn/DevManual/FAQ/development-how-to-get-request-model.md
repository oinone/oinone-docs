---
title: 开发中：如何获取请求的模型
index: true
category:
  - 常见问题（faq）
order: 5
---
一、问题
要获取请求的模型，模块编及方法名，有现成的方法吗？
二、解决方案
1. 获取模块:
`PamirsSession.getServApp()`
2. 获取请求信息:
   请求信息，里面有模型，方法名等
   `PamirsSession.getRequestVariables().getRequestInfoMap()`