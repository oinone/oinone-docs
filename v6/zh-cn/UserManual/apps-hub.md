---
title: 应用中心
index: true
category:
  - 用户手册
order: 3
prev:
  text: 集成应用
  link: /zh-cn/UserManual/StandardModules/integration-app.md
---
Oinone应用中心集成了多种应用和模块，旨在为用户提供丰富、多样化的功能选择，以满足在不同场景下的需求。这些应用覆盖了业务协同、数据分析、运营管理等多个领域。用户可以根据自己的实际需求，在应用中心中轻松找到所需应用，并通过简单的配置，即可快速投入到实际使用中。

# 一、App Finder
### 1.功能介绍
Oinone平台提供App Finder，展示已安装的应用，包括我收藏的应用、业务应用与设计器，支持搜索查找。

+ 业务应用：与业务相关、用户可操作的应用
+ 设计器：平台提供的设计器应用，即平台的无代码能力，包括：模型设计器、界面设计器、流程设计器、集成设计器、AI集成设计器、数据可视化、微流设计器
+ 我收藏的应用：在应用中心收藏的应用

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E4%B8%AD%E5%BF%83/APP%20Finder.png)

### 2.操作方法
在每个应用中点击蓝色区域可进入App Finder。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E4%B8%AD%E5%BF%83/%E8%BF%9B%E5%85%A5APP%20Finder.png)

# 二、应用列表
在应用列表中可管理平台中所有应用，提供搜索、创建、收藏、安装、卸载、编辑应用等功能。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E4%B8%AD%E5%BF%83/%E5%BA%94%E7%94%A8%E4%B8%AD%E5%BF%83%E5%88%97%E8%A1%A8.png)

## （一）查找
### 1.功能介绍
根据实际业务需求，可以定制应用或模块的筛选条件。在当前的筛选条件下，将展示相应的应用或模块列表，方便对不同的应用或模块进行设计。

:::warning 提示
对于常用的筛选项组合，可以将其收藏进筛选方案，之后可直接在筛选方案中一键选择对流程进行筛选。
:::

### 2.操作方法
+ 筛选：在筛选区选择或输入条件后点击「搜索」，即可对应用或模块进行筛选。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E4%B8%AD%E5%BF%83/%E7%AD%9B%E9%80%89.png)

+ 一键清除：点击「清除」图标，可一键清除当前筛选区中所有条件

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E4%B8%AD%E5%BF%83/%E4%B8%80%E9%94%AE%E6%B8%85%E9%99%A4.png)

+ 管理筛选方案：鼠标移动至「筛选方案」图标，即可管理筛选方案
    - 添加：在筛选区中选择或输入筛选条件后，点击「收藏当前条件」，在弹窗中输入方案名称，即可将当前筛选条件组合添加到筛选方案中
    - 查找：在输入框中输入方案名称
    - 修改：点击「筛选方案管理」后在弹窗中选择某项方案，点击方案名称，即可修改方案名称
    - 删除：在方案列表中选择某项方案，点击「删除」图标，即可删除该筛选方案

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E4%B8%AD%E5%BF%83/%E7%AE%A1%E7%90%86%E7%AD%9B%E9%80%89%E6%96%B9%E6%A1%88.png)

## （二）创建
### 1.功能介绍
支持依据具体业务需求创建应用或模块，可选择类型、定义应用名称、技术名称、依赖模块、上游模块、分类、客户端类型。

:::info  注意
+ 应用类型分为应用与模块，两者区别在于：
    - 应用有前台页面，可以在前台页面中操作数据
    - 模块没有前台页面，服务于其他应用或模块
+ 应用大多需依赖一些基本模块，如文件、资源等。依赖后可使用依赖应用/模块的能力，如依赖文件后可使用导入、导出能力
+ 上游模块仅允许选择依赖过的应用/模块，当被选择为上游模块后，上游模块将被整合至当前应用，可满足特定场景下的个性化需求。
+ 应用分类是按照所属业务域进行分类管理的，目前分类由平台提供，后续会开放给用户自行管理
+ 客户端类型分为PC端和移动端，可多选。若只选择一项，则只能在选中客户端类型中使用
:::

### 2.操作方法
点击「创建」，在弹出的页面中填写信息后确认，即可成功创建

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E4%B8%AD%E5%BF%83/%E5%88%9B%E5%BB%BA.png)

## （三）编辑
### 1.功能介绍
对于成功创建的应用或模块，可依据需求的变化对其信息进行编辑修改

:::info 注意

仅部分信息支持修改，部分信息在创建时即已固定，因此创建时需谨慎填写。

:::

### 2.操作方法
选定应用或模块点击「编辑」，在在弹出的页面中修改信息后确认，即可成功编辑

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E4%B8%AD%E5%BF%83/%E7%BC%96%E8%BE%91.png)

## （四）安装与卸载
### 1.功能介绍
对于已经创建的应用或模块，可以根据实际需求选择是否进行安装。安装完成后，即可开始使用该应用或模块所提供的各项功能。若日后不再需要使用，也可随时选择卸载，以便更好地管理和优化自己的应用环境。

:::info 注意

+ 卸载后的应用不会在App Finder中展示，无法进入、不可使用。
+ 卸载后的应用或模块可重新安装。
+ 仅无代码应用或模块允许安装与卸载。

:::

### 2.操作方法
+ 安装：在应用列表中，选定要安装的应用或模块，点击「安装」，即可安装成功。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E4%B8%AD%E5%BF%83/%E5%AE%89%E8%A3%85.png)

+ 卸载：在应用列表中，选定要卸载的应用或模块，点击「卸载」，即可成功卸载

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E4%B8%AD%E5%BF%83/%E5%8D%B8%E8%BD%BD.png)

## （五）收藏
### 1.功能介绍
对于经常使用的应用，可以选择将其收藏起来。收藏后的应用将会统一出现在App Finder的“我收藏的应用”板块以及工作台的收藏展示区中，便于更快速地找到所需应用，节省寻找时间，提高工作效率。

:::info 注意

只有在应用被成功安装之后，方可使用该功能。

:::

![App Finder](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E4%B8%AD%E5%BF%83/%E6%94%B6%E8%97%8F-APP%20Finder.png)

![工作台](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E4%B8%AD%E5%BF%83/%E6%94%B6%E8%97%8F-%E5%B7%A5%E4%BD%9C%E5%8F%B0.png)

### 2.操作方法
选定应用，点击应用卡片右上角的星标，即可收藏/取消收藏应用

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E4%B8%AD%E5%BF%83/%E6%94%B6%E8%97%8F.png)

## （六）设置首页
### 1.功能介绍
可为应用设置首页，提供两种方式：

1. 绑定菜单：首页即为绑定菜单的页面
2. 绑定视图：选择模型和模型下的视图，首页即为选定的视图。若可作为首页的视图不存在，可通过提供的快捷入口进入界面设计器创建
3. 绑定url：支持输入 URL ，在打开应用时自动跳转至该 URL 。提供以下两种跳转方式:
   a. 页内路由：应用打开时，在当前窗口展示目标 URL 内容。
   b. 打开新窗口：应用打开时，在新窗口中展示目标 URL 内容。

### 2.操作方法
选定应用，点击「设置首页」，即可为应用设置首页

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E4%B8%AD%E5%BF%83/%E8%AE%BE%E7%BD%AE%E9%A6%96%E9%A1%B5.png)

## （七）快捷入口
### 1.功能介绍
为了全面展现应用的功能特性，需要为应用构建模型与设计页面。当无代码开发方式在应对某些特殊场景时无法满足开发需求时，可以采用低代码与无代码融合的技术方案（即低无一体）来对应用进行深度优化和完善。为此，应用中心提供了快捷入口，方便用户直接进入模型设计器、界面设计器以及低无一体开发环境，对应用进行全方位的调整和完善。

### 2.操作方法
选定应用，点击「设计页面」，进入界面设计器；

选定应用，点击「设计模型」，进入模型设计器；

选定应用，点击「低无一体」，进入低无一体。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E4%B8%AD%E5%BF%83/%E5%BF%AB%E6%8D%B7%E5%85%A5%E5%8F%A3.png)

## （八）设计导入/导出
### 1.功能介绍
支持导入/导出应用的元数据，如模型、界面、流程、微流、集成、数据可视化的文件。在导出中，可选择筛选导出或一键导出

+ 筛选导出：可有选择的对文件进行导出
+ 一键导出：即直接导出的所有文件。

:::info 注意

+ 导出可分为迁移导出和标品导出，二者区别在于：
    - 迁移导出：将原应用迁移至新环境，在新环境中可对其进行编辑修改等操作
    - 标品导出：将原应用导出至新环境，在新环境中除标品升级外不可对其更改
+ 对于导出类型为‘迁移导出’的设计元数据，可以在不同环境，通过应用中心——>已安装应用——>设计导入（迁移），实现设计数据导入
+ 对于导出类型为‘标品导出’的设计元数据，目前只支持通过技术接口形式完成导入，暂不支持界面进行可视化导入操作

:::

:::warning 提示

对于已经执行的导入/导出任务，可在「应用环境-设计导入/设计导出」中进行查看

:::

### 2.操作方法
选定应用，在「设计导入（迁移）」或「设计导出」中选择某一项，即导入/导出相应文件

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E4%B8%AD%E5%BF%83/%E8%AE%BE%E8%AE%A1%E5%AF%BC%E5%85%A5%EF%BC%88%E8%BF%81%E7%A7%BB%EF%BC%89.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E4%B8%AD%E5%BF%83/%E8%AE%BE%E8%AE%A1%E5%AF%BC%E5%87%BA.png)

:::tip 举例

设计导出某一应用的模型（其他元数据同理）

1. 操作菜单选择“模型导出”：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E4%B8%AD%E5%BF%83/%E5%AF%BC%E5%87%BA%E4%B8%BE%E4%BE%8B1.png)

2. 在弹窗中选择导出类型，此处选择“迁移导出”

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E4%B8%AD%E5%BF%83/%E5%AF%BC%E5%87%BA%E4%B8%BE%E4%BE%8B2.png)

3. 若选择“一键导出”：开始导出，并在右上角展示提示信息

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E4%B8%AD%E5%BF%83/%E5%AF%BC%E5%87%BA%E4%B8%BE%E4%BE%8B3.png)

4. 若选择“筛选导出”，可进入无代码模型导出筛选页，依据实际选择模型后导出，会在右上角展示提示信息

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E4%B8%AD%E5%BF%83/%E5%AF%BC%E5%87%BA%E4%B8%BE%E4%BE%8B4.png)![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E4%B8%AD%E5%BF%83/%E5%AF%BC%E5%87%BA%E4%B8%BE%E4%BE%8B5.png)

:::

:::tip 举例

设计导入某一模型（其他元数据同理）

1. 操作菜单选择“模型导入”：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E4%B8%AD%E5%BF%83/%E5%AF%BC%E5%85%A5%E4%B8%BE%E4%BE%8B1.png)

2. 在弹窗中上传需要导入的文件

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E4%B8%AD%E5%BF%83/%E5%AF%BC%E5%85%A5%E4%B8%BE%E4%BE%8B2.png)

如果选择的导入文件类型为非迁移导出文件，则右上方提示（其它设计类型迁移导入文件类型同此）：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E4%B8%AD%E5%BF%83/%E5%AF%BC%E5%85%A5%E4%B8%BE%E4%BE%8B3.png)

3. 导入文件正确后会在右上角展示提示信息

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E4%B8%AD%E5%BF%83/%E5%AF%BC%E5%85%A5%E4%B8%BE%E4%BE%8B4.png)

:::

## （九）同步部署
### 1.功能介绍
支持将模型、界面、流程、微流、集成、数据可视化的文件同步部署至某个环境中，可选择筛选部署或一键部署

+ 筛选部署：可有选择的对文件进行部署
+ 一键部署：即直接将所有文件部署至某环境。

:::warning 提示

环境可在应用环境中进行设置。

:::

### 2.操作方法
选定应用，在「同步部署」中选择某一项，即可将相应的文件同步部署至某环境

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E4%B8%AD%E5%BF%83/%E5%90%8C%E6%AD%A5%E9%83%A8%E7%BD%B2.png)

::: tip 举例

设计部署某一模型（其他元数据同理）

1. 操作菜单选择“模型部署”：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E4%B8%AD%E5%BF%83/%E9%83%A8%E7%BD%B2%E4%B8%BE%E4%BE%8B1.png)

2. 在弹窗中选择部署环境

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E4%B8%AD%E5%BF%83/%E9%83%A8%E7%BD%B2%E4%B8%BE%E4%BE%8B2.png)

3. 若选择“一键部署”，会在页面右上角展示提示信息

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E4%B8%AD%E5%BF%83/%E9%83%A8%E7%BD%B2%E4%B8%BE%E4%BE%8B3.png)

4. 若选择“筛选部署”，进入无代码模型导出筛选页，依据实际选择模型后同步，会在右上角展示提示信息

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E4%B8%AD%E5%BF%83/%E9%83%A8%E7%BD%B2%E4%B8%BE%E4%BE%8B4.png)

:::

## （十）应用详情
### 1.功能介绍
支持查看应用的详细信息，包括应用的基础信息、依赖与互斥的模块或应用

### 2.操作方法
点击「了解更多」，可进入应用详情

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E4%B8%AD%E5%BF%83/%E5%BA%94%E7%94%A8%E8%AF%A6%E6%83%85.png)

# 三、应用大屏
### 1.功能介绍
应用大屏依据分类来展示各类应用，对于未设置应用分类的应用，将无法在应用大屏中进行展示。对于在应用大屏中展示的应用，可查看应用之间的关联关系

### 2.操作方法
点击应用，可查看应用之间的关联关系

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E4%B8%AD%E5%BF%83/%E5%BA%94%E7%94%A8%E5%A4%A7%E5%B1%8F1.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E4%B8%AD%E5%BF%83/%E5%BA%94%E7%94%A8%E5%A4%A7%E5%B1%8F2.png)

# 四、技术可视化
### 1.功能介绍
在技术可视化页面，展示已安装模块的元数据，并进行分类呈现

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E5%BA%94%E7%94%A8%E4%B8%AD%E5%BF%83/%E6%8A%80%E6%9C%AF%E5%8F%AF%E8%A7%86%E5%8C%96.png)







