---
title: 低无一体
index: true
category:
  - 用户手册
order: 5
next:
  text: 研发手册
  link: /zh-cn/DevManual/README.md
---
### 1.功能介绍
当利用平台无代码设计器生成的模块或应用无法满足实际需求时，可以利用低无一体功能为其完善与优化。低无一体是连接无代码设计器的桥梁，可以为一个模块或应用设计低代码的逻辑，可以在界面设计器或流程设计器等无代码设计器中使用。

### 2.操作方法
+ 在下拉菜单中选择需要低代码设计的模块或应用，选择完毕后会显示其模块信息

:::info 注意

下拉菜单中仅展示已在「应用中心」中安装的应用或模块。如需使用的应用或模块未在下拉菜单中显示，请前往「应用中心」进行安装后，再继续进行后续操作。

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/low-no-one/1.png)

+ 点击「生成SDK」，将选中模块或应用的当前模型状态生成为一个SDK包。提示“生成SDK成功”，表示操作完成

:::info 注意

在首次使用或模型发生变更时，均需生成SDK，否则在使用低无一体时会出现错误。

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/low-no-one/2.png)

+ 点击「下载扩展工程模板」，为SDK包与工程模板生成一个下载链接。提示“下载扩展工程模板成功”，表示操作完成

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/low-no-one/3.png)

:::info 注意

+ Oinone底层依赖版本与设计器和业务应用一致
+ 扩展工程如需独立启动, 手动修改`application.yml`中安装模块和`pom.xml`中模块jar的依赖配置

:::

