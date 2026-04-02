---
title: 系统配置
index: true
category:
  - 用户手册
order: 3
next:
  text: 用户
  link: /zh-cn/UserManual/StandardModules/AdministrationCenter/user.md
---
系统配置模块为企业平台提供了全面且灵活的个性化与安全管理配置方案，旨在精准契合各类业务需求，并充分彰显企业的文化特色。该模块包括两大核心组件：全局配置，用于统一管理和设定系统级别的基本配置；应用配置，用于启用翻译管理功能，使得企业能够管理多语言内容，提升国际化运营水平。

# 一、全局配置
## （一）登录页配置
### 1.功能介绍
登录页面支持个性化定制，提供多样化的页面布局选项，企业可根据自身文化特色自定义页面背景及登录页Logo。在设置过程中，可实时预览配置效果，让定制更加直观便捷。

### 2.操作方法
选择或上传相关配置内容，发布后即可生效

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/system%20configuration/dly.png)

## （二）企业形象配置
### 1.功能介绍
可自定义企业信息、业务应用导航栏logo与浏览器logo

:::warning 提示

企业信息将展示在登录页的下方区域，点击相关文字可跳转至设置的企业官网链接

:::

:::info 注意

业务应用导航Logo用于左侧菜单栏的展示，支持3:1和1:1两种比例格式。其中，3:1比例格式适用于菜单展开时的显示，而1:1比例格式则用于菜单收起时的呈现，以满足不同状态下的视觉需求。

:::

### 2.操作方法
填写或上传相关配置内容，发布后即可生效

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/system%20configuration/qyxx.png)

## （三）系统风格配置
### 1.功能介绍
系统展示风格可全面定制，包括主题模式、尺寸调整、侧边栏颜色与样式选择，以及多tab栏样式设置。在设置过程中，实时预览配置效果，让定制操作更加直观便捷。若平台提供的现有样式无法满足需求，还可下载代码进行个性化风格定制。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/system%20configuration/xtfg1.png)

### 2.操作方法
+ 选择相关配置内容，发布后即可生效
+ 点击“下载”，即可下载系统风格代码进行自定义

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/system%20configuration/xtfg2.png)

## （四）高级首页配置
### 1.功能介绍
企业可以根据不同用户与角色，定制用户登录后的默认页面，实现不同用户群体进入不同首页的需求

### 2.操作方法
+ 筛选：可根据应用或状态来筛选配置规则。
+ 添加：点击「添加配置规则」，填写相关信息与匹配规则后确定，即可保存
+ 删除：点击「删除」图标后确定，即可删除选中规则
:::info 注意

支持配置多条规则，可拖拽规则调整优先级，优先级按排列顺序依次降低。
+ 在多条匹配规则同时涵盖同一用户的情况下，针对该用户而言，系统将选取优先级最高的规则，并将其应用于平台的首页展示。
:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/system%20configuration/gjsy.png)

# 二、应用配置
## （一）翻译管理配置
### 1.功能介绍
可选择是否开启页面工具箱。开启后，当系统语言设置为非简体中文时，页面右下角将显示一个工具箱，该工具箱支持添加或修改翻译项，使得系统的国际化管理更加灵活便捷，高效满足多语言需求。

### 2.操作方法
选择开启后更改系统语言，将展示页面工具箱

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/system%20configuration/fy1.png)

当使用非简体中文语言时，若需添加或更改翻译项，点击工具箱，在弹窗中选择对应翻译项进行设置

:::info 注意

翻译应用范围即翻译生效后可覆盖的范围，包括源术语所在应用与全局：

+ 若选择“源术语所在应用”，则即该条翻译项仅作用于设置的“翻译所在应用”中
+ 若选择“全局”，则在整个系统中都可使用这条规则

:::

:::tip 举例

现在“English”语言环境下，为未正确翻译的“产品类别”添加翻译项。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/system%20configuration/fy2.gif)

:::

