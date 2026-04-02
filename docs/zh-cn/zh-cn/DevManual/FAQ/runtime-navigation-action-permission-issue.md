---
title: 运行时：跳转动作无权限问题排查
index: true
category:
- 常见问题（faq）
order: 20
---
# 一、场景描述
配置了一个跳转动作，并配置了加载函数。点击跳转到另一个页面，发现弹出“无权限进行该操作”错误。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/FAQ/Snipaste_2024-10-29_14-41-25-scaled.jpg)

# 二、分析原因
权限那边配置动作权限也都给了权限，但是为什么会出现这种情况呢？大概率是因为没有配置加载函数的权限，导致报错。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/FAQ/Snipaste_2024-10-29_15-01-47.jpg)

# 三、排查路径
5.0.X 以上版本权限控制是通过请求载荷里面的`variables`参数携带的`path`路径进行鉴权的。这个`path`路径是通过菜单名字一层一层拼接的。这个报错的根本原因就是因为这个无权限的请求的`path`路径下，没有这个加载函数的权限。所以要解决问题很简单，只需要在这个路径下配置上这个加载函数的权限就可以了。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/FAQ/Snipaste_2024-10-29_14-50-48.jpg)

1. 跳转页面是弹窗打开或抽屉打开：这种情况新打开的页面的`path`路径是不会变的，所使用的还是外面表格页面的路径，所以只需要把该加载函数配置到外面表格页面并隐藏掉，然后在权限那边配置上该动作权限问题就解决了。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/FAQ/Snipaste_2024-10-29_14-56-27.jpg)

2. 跳转页面是新窗口打开，这个时候新打开的页面的`path`路径是会变成新窗口所在的路径，所以只需要把该加载函数配置到跳转页面上，并隐藏掉，然后在权限那边配置上该动作权限问题也可以解决。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/FAQ/Snipaste_2024-10-29_15-00-44-1-20250529202453394.jpg)

3. 如果这个加载函数不需要有页面交互，或者页面和函数不属于同一个模型，则可以直接把这个函数改为`Function`绕过权限验证就好。


