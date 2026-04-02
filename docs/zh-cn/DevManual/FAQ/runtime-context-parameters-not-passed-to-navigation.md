---
title: 运行时：配置了上下文参数但是值未传到跳转页面
index: true
category:
- 常见问题（faq）
order: 21
next:
  text: 设计原理
  link: /zh-cn/DevManual/DesignPrinciple/README.md
---
# 一、场景复现
配置了上下文参数，但是跳转的页面没有拿到这个字段。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/FAQ/1748066709819-07086b4b-1bda-4012-affd-d5889f59a1a3.png)

# 二、解决方案
是因为跳转页面没有拖这个配置的 name 字段，把这个字段拖到跳转的页面上隐藏就好了。

