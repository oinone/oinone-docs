---
title: 翻译
index: true
category:
  - 用户手册
order: 10
---
# 一、翻译管理
### 1.功能介绍
在翻译管理系统中，可以系统地管理和维护翻译项，这些规则以模型为基础，用于维护字段的翻译值，确保翻译的准确性和一致性。

### 2.操作方法
+ 筛选：根据实际场景需求，输入或选择相应的筛选条件，即可对翻译项进行筛选。
+ 创建：点击「创建」，输入所需的配置信息及翻译项的相关信息，即可成功创建新的翻译项。
+ 编辑：点击「编辑」，即可对翻译项的相关信息进行更新或修改。

:::info 注意

翻译应用范围即翻译生效后可覆盖的范围，包括源术语所在应用与全局：

+ 若选择“源术语所在应用”，则即该条规则仅作用于设置的“翻译所在应用”中
+ 若选择“全局”，则在整个系统中都可使用这条规则

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/translate/gl1.png)

:::

+ 刷新远程资源：当新增或编辑翻译项后，需点击「刷新远程资源」，以确保规则能够生效并应用到资源中。

:::info 注意

若未刷新远程资源，翻译项无法生效

:::

+ 详情：点击「详情」，可查看所选翻译项的详细信息。
+ 删除：选中某一翻译项后，点击「删除」，即可将该翻译项删除。
+ 激活：当某一翻译项状态为“未激活”时，可选中该规则，点击「激活」，以快速启用该规则

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/translate/gl2.png)

:::tip 举例

现有一表格在英文模式下为：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/translate/gl3.png)

为其“销售量”添加翻译项。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/translate/gl4.gif)

创建完成后点击「刷新远程资源」。带刷新完毕后查看效果，原“销售量”变为“sales volume”

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/translate/gl5.png)

:::

# 二、导入翻译文件
### 1.功能介绍
系统支持通过Excel文件一次性统一导入多条翻译项，提高翻译项管理的效率和便捷性。

:::info 注意

需使用平台提供的翻译模板文件，将模板文件填写完毕后进行上传

:::

### 2.操作方法
点击「下载翻译模板文件」，填写完毕后进行上传即可成功导入

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/translate/dr.png)

# 三、导出文件
### 1.功能介绍
支持导出已有翻译项，可自定义导出文件内所包含的内容

:::warning 提示

若一次性导出全部应用可能会因为数据过多而耗时较长，推荐按照源术语所属的应用进行导出

:::

### 2.操作方法
填写需要导出的翻译项的信息后，点击「导出文件」，即可成功导出

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/translate/dc.png)

# 四、更改翻译项
### 1.功能介绍
支持更改已有翻译项的信息

:::info 注意

需使用平台提供的翻译模板文件，将模板文件填写完毕后进行上传

:::

### 2.操作方法
点击「下载翻译模板文件」，填写完毕后进行上传即可成功更改

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/translate/gg.png)

