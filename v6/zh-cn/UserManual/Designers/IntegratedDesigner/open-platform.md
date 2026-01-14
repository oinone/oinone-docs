---
title: 开放平台
index: true
category:
  - 用户手册
  - 设计器
order: 5
---
开放平台支持将Oinone系统的能力对外进行开放，具体包括但不限于商品信息查询接口、发货单查询接口等关键业务接口。该平台不仅实现了开放接口的统一管理与维护，还支持将多个接口整合至一个应用中对外开放，为用户提供了便捷、高效的开放途径。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/Open%20Platform/1.png)

# 一、开放接口
## （一）筛选
### 1.功能介绍
根据实际业务需求，可以定制对开放接口的筛选条件。在当前的筛选条件下，将展示相应的开放接口列表，方便查看和编辑不同的开放接口。

### 2.操作方法
+ 筛选：在筛选区输入条件后点击「搜索」，即可对开放接口进行筛选。
+ 一键清除：点击「清除」图标，可一键清除当前筛选区中条件

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/Open%20Platform/jk/sx.png)

## （二）新增API
### 1.功能介绍
可依据业务需求新增API，可设置API基本信息、请求参数与响应结果

+ 请求路径支持：GET、POST、PUT、DELETE

:::info 注意

若“忽略日志频率配置”开关未开启，系统将仅记录部分日志内容。在正常运行情况下，可关闭此配置以节省资源。若运行过程中出现问题，则可开启此配置，系统将完整记录接口日志的请求与响应详细信息，便于排查和查看。

:::

### 2.操作方法
点击「新增API」，在弹出的页面中填写信息后保存，即可新增成功。

创建成功后会自动启用API，启用后的API可被引用。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/Open%20Platform/jk/xz.png)

## （三）编辑API
### 1.功能介绍
成功创建的API可对其进行编辑。

### 2.操作方法
点击「编辑」，即可在弹出的编辑页面中进行编辑。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/Open%20Platform/jk/bj.png)

## （四）查看详情
### 1.功能介绍
支持展示API的详细信息

### 2.操作方法
点击「详情」，即可查看选中API的详细信息

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/Open%20Platform/jk/xq.png)

## （五）导出API文档
### 1.功能介绍
支持将API的信息导出为文档格式

### 2.操作方法
选定API，点击「导出API文档」，即可成功导出

:::warning 提示

成功导出的文档，可前往「文件」-「导出任务」中下载

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/Open%20Platform/jk/dc.png)

# 二、应用
## （一）筛选
### 1.功能介绍
根据实际业务需求，可以定制对应用的筛选条件。在当前的筛选条件下，将展示相应的应用列表，方便查看和编辑不同的应用。

### 2.操作方法
+ 筛选：在筛选区输入条件后点击「搜索」，即可对应用进行筛选。
+ 一键清除：点击「清除」图标，可一键清除当前筛选区中条件

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/Open%20Platform/yy/sx.png)

## （二）新增应用
### 1.功能介绍
可依据业务需求新增应用，可设置应用基本信息与授权API范围

:::info 注意

+ 在授权API范围中，包含了具备开放接口的业务域。可以根据实际需求，选择授权整个业务域，或者仅选择其中的特定开放接口进行授权。
+ IP白名单配置可限制允许访问的地址，若未进行设置（或设置为0.0.0.0/0）表示允许全部地址，否则仅添加的地址可访问。

:::

### 2.操作方法
点击「新增应用」，在弹出的页面中填写信息后保存，即可新增成功。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/Open%20Platform/yy/xz.png)

## （三）查看密钥
### 1.功能介绍
对于已创建的应用，可以查看其密钥，密钥依据创建应用时设置的数据传输加密算法生成，包含API Key，API Secret与数据传输加密密钥

### 2.操作方法
点击「查看密钥」，即可在弹出的页面中查看密钥

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/Open%20Platform/yy/my.png)

## （四）授权调整
### 1.功能介绍
支持对已创建的应用修改授权API的范围

### 2.操作方法
点击「授权调整」，即可在弹出的页面中为应用修改授权范围

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/Open%20Platform/yy/sq.png)

