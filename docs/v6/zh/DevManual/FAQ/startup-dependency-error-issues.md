---
title: 启动时：启动依赖错误的问题
index: true
category:
  - 常见问题（faq）
order: 2
---
# 一、场景
启动的时候可能会出现以下错误提示

+ 启动模块中包含 jar 包或者数据库中不存在的模块
+ 启动模块中包含不存在的模块
+ 启动模块互斥模块中包含已安装模块

# 二、排查项
1. 确保启动工程的`application.yml`中的启动模块`pamirs.boot.modules`配置项内的模块在`pom.xml`内依赖了对应模块的jar包
2. 确保出问题的模块的定义文件内的包扫描前缀`packagePrefix`方法内的路径定义正确，该路径可以是多个，但是一定要包含模块下所有子工程的路径，包括但不限于`api`子工程、`core`工程等，另外该路径也不能和其他模块的配置有重复、交集、包含关系（例如：a模块是 `aa.bb.cc`, b模块是`aa.bb`，这样b模块的路径就包含了a模块的）
   ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/FAQ/WX20240718-195049@2x-1024x632.png)
3. 启动类里`spring`自带的`@ComponentScan.basePackages`注解项需要包含所有依赖模块的路径
   ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/FAQ/WX20240718-195713@2x-1024x682.png)
4. 无代码应用创建的时候，配置了依赖模块。但这个依赖没有被本地安装，该模块就会出问题，要么删除该依赖，要么在代码里添加该依赖。

