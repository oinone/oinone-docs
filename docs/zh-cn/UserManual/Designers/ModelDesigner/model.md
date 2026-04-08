---
title: 模型
index: true
category:
  - 用户手册
  - 设计器
order: 1
prev:
  text: 模型设计器（Model Designer）
  link: /zh-cn/UserManual/Designers/ModelDesigner/README.md
---
在模型设计器的模型页面中，可以对分组、模型、字段进行管理

# 一、 分组管理
### 1. 功能介绍
可以利用分组功能对模型进行归类管理（包括添加、修改、删除），根据需要自定义添加最多15个分组。

### 2. 操作方法
+ 管理分组：单击「全部」，展开所有分组列表。展开后在分组右侧点击「管理分组」，在弹窗中对分组进行管理操作。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E5%88%86%E7%BB%84%E7%AE%A1%E7%90%86/%E5%88%86%E7%BB%84%E7%AE%A1%E7%90%86-%E7%AE%A1%E7%90%86%E5%88%86%E7%BB%841.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E5%88%86%E7%BB%84%E7%AE%A1%E7%90%86/%E5%88%86%E7%BB%84%E7%AE%A1%E7%90%86-%E7%AE%A1%E7%90%86%E5%88%86%E7%BB%842.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E5%88%86%E7%BB%84%E7%AE%A1%E7%90%86/%E5%88%86%E7%BB%84%E7%AE%A1%E7%90%86-%E7%AE%A1%E7%90%86%E5%88%86%E7%BB%843.png)

+ 添加分组：单击「+ 模型分组」，输入分组名称后回车；或选择其他应用中使用的分组。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E5%88%86%E7%BB%84%E7%AE%A1%E7%90%86/%E5%88%86%E7%BB%84%E7%AE%A1%E7%90%86-%E6%B7%BB%E5%8A%A0%E5%88%86%E7%BB%84.png)

+ 修改分组：双击分组标签，修改后回车即可保存。

:::info 注意

若该分组也被其他应用使用，名称同步变化。

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E5%88%86%E7%BB%84%E7%AE%A1%E7%90%86/%E5%88%86%E7%BB%84%E7%AE%A1%E7%90%86-%E4%BF%AE%E6%94%B9%E5%88%86%E7%BB%84.png)

+ 删除分组：单击分组后的「×」，即可删除分组。

:::info 注意

若该分组下存在模型，则无法删除。

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E5%88%86%E7%BB%84%E7%AE%A1%E7%90%86/%E5%88%86%E7%BB%84%E7%AE%A1%E7%90%86-%E5%88%A0%E9%99%A4%E5%88%86%E7%BB%84.png)

# 二、 模型管理
Oinone平台以模型为核心出发点，模型作为数据及行为的载体，对应用中需描述的实体进行必要简化，并通过适当的形式或规则展现其主要特征。模型由元信息、字段、数据管理器和自定义函数组成。本平台的设计器采用模型驱动方式，提供可视化配置方式，使用户能够快速设计模型。在模型设计器中，设计过程主要分为模型设计和模型所含字段设计两部分。

## （一） 管理模式
### 1. 功能介绍
模型设计器提供图管理模式和列表管理模式，用于展示和管理模型（下文简称图模式、表模式）。

根据使用场景不同，可切换至不同的管理模式：

+ 图模式：在模型操作区中展示当前模型，以及与当前模型有直接关联关系的模型关系图。可以在关注模型关联关系时使用
+ 表模式：展示详细的模型信息和字段信息，在模型列表中可快速切换不同模型。可以在关注模型基础信息时使用

### 2. 操作方法
点击页面右下角「切换管理模式」图标，可切换不同模式

![图模式](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E6%A8%A1%E5%9E%8B%E7%AE%A1%E7%90%86/%E7%AE%A1%E7%90%86%E6%A8%A1%E5%BC%8F%E5%9B%BE.png)

![表模式](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E6%A8%A1%E5%9E%8B%E7%AE%A1%E7%90%86/%E7%AE%A1%E7%90%86%E6%A8%A1%E5%BC%8F%E8%A1%A8.png)

## （二） 筛选
### 1. 功能介绍
根据实际需求，对应用/模块、模型类型及分组设置进行筛选条件的定制，以便对模型进行精准筛选，支持一键清除所有筛选条件。在当前筛选条件下，可展开模型列表切换不同模型；切换模型后，模型操作区将随之同步切换。

:::info 注意

在下拉选择应用/模块筛选项中，仅是对平台上的应用或模块进行了初步筛选。在实际筛选操作时，仍需进一步选择具体的应用或模块以完成配置。同理，只有当所有的筛选项都配置正确，才能筛选出正确的模型。

:::

### 2. 操作方法
+ 在筛选区选择或输入条件，完成对模型的筛选

:::warning 提示

在图模式下，为了更大程度的保留模型展示区，模型列表默认不展示，当点击模型列表搜索区的任意位置，即可展示模型列表。

:::

![图模式](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E6%A8%A1%E5%9E%8B%E7%AE%A1%E7%90%86/%E7%AD%9B%E9%80%89%E5%9B%BE.png)

![表模式](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E6%A8%A1%E5%9E%8B%E7%AE%A1%E7%90%86/%E7%AD%9B%E9%80%89%E8%A1%A8.png)

+ 一键清除：点击「重置筛选」，清空所有已有筛选条件

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E6%A8%A1%E5%9E%8B%E7%AE%A1%E7%90%86/%E4%B8%80%E9%94%AE%E6%B8%85%E9%99%A4.png)

## （三） 导入模型
### 1. 功能介绍
导入模型是添加模型的一种高效方式。可以下载平台提供的导入模板，按照既定规则填写相关信息后，将文件导入系统，即可快速完成模型的添加。

+ 导入模板：平台提供模型的导入模板，不同的操作模式下提供的模板不同，可切换操作模式

:::info 注意

无代码模式与专家模式下提供的导入模板不同：

+ 在无代码模式下，模板仅提供基础的模型信息，数量较少，易于填写
+ 在专家模式下，模板提供丰富的模型信息，内容详尽，信息更具专业性

:::

+ 导入说明：详细阐述了导入模板中各项内容的含义及填写规则，可以帮助用户准确无误地填写导入文件。根据不同的操作模式，提供了相应的导入说明，以确保用户能够顺利完成导入过程。
+ 上传文件：仅支持上传扩展名为.xlsx、.xls、.xlsm的文件

:::info 注意

在上传文件时，应上传与当前操作模式对应的文件。

:::

### 2. 操作方法
+ 点击「导入模型」，选择所属应用

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E6%A8%A1%E5%9E%8B%E7%AE%A1%E7%90%86/%E5%AF%BC%E5%85%A5%E6%A8%A1%E5%9E%8B1.png)

+ 点击「当前模式」按钮，即可切换操作模式
+ 点击「点击下载导入模型模板」，即可下载对应模式下的导入模板
+ 点击「导入说明」，即可查看对应模式下的导入说明
+ 点击「点击上传」或拖拽文件至指定位置，即可上传文件

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E6%A8%A1%E5%9E%8B%E7%AE%A1%E7%90%86/%E5%AF%BC%E5%85%A5%E6%A8%A1%E5%9E%8B2.png)

## （四） 添加模型
### 1. 功能介绍
可通过模型设计器创建无代码模型，在创建时可编辑模型名称、模型类型以及父模型（仅专家模式下）

:::danger 警告

模型类型与父模型在创建后不可更改，请谨慎填写

:::

专家模式下支持4种类型的模型：存储模型、传输模型、抽象模型、代理模型（详见附件：名词解释）

无代码模式下支持2种类型的模型：存储模型、传输模型

在无代码模式下，无需选择且不展示父模型；在专家模式下，必须选择父模型

:::info 注意

+ 存储模型的父模型，默认为“基础存储模型”，支持切换为可见的抽象模型和存储模型
+ 传输模型的父模型，默认为“基础传输模型”，支持切换为可见的传输模型
+ 抽象模型的父模型，默认为“基础存储模型”，支持切换为可见的抽象模型
+ 代理模型的父模型，无默认值，需自己指定，支持切换为可见的存储模型和代理模型

:::

### 2. 操作方法
点击「添加模型」，选择所属应用/模块进行添加，点击「添加」后展示弹窗，填写完毕后点击「创建」即可成功创建模型。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E6%A8%A1%E5%9E%8B%E7%AE%A1%E7%90%86/%E6%B7%BB%E5%8A%A0%E6%A8%A1%E5%9E%8B1.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E6%A8%A1%E5%9E%8B%E7%AE%A1%E7%90%86/%E6%B7%BB%E5%8A%A0%E6%A8%A1%E5%9E%8B2.png)

## （五） 编辑模型
### 1. 功能介绍
成功创建的模型可以进行编辑

:::info 注意

仅部分信息支持修改，部分信息在创建时即已固定，因此创建时需谨慎填写。

:::

### 2. 操作方式
+ 图模式下，点击模型右侧的「编辑」图标，或展开模型列表点击「编辑」图标，即可在页面右侧弹出的编辑页面中进行编辑

![图模式](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E6%A8%A1%E5%9E%8B%E7%AE%A1%E7%90%86/%E7%BC%96%E8%BE%91%E6%A8%A1%E5%9E%8B1.png)

+ 表模式下，直接点击需编辑的模型信息，或点击模型列表中的「编辑」图标，即可对模型进行编辑

![表模式](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E6%A8%A1%E5%9E%8B%E7%AE%A1%E7%90%86/%E7%BC%96%E8%BE%91%E6%A8%A1%E5%9E%8B2.png)

## （六） 模型分组
### 1. 功能介绍
每个模型可以设置所属分组，设置后通过分组进行筛选时，模型即展示在所属分组下。

:::warning 提示

模型添加成功后，默认无所属分组。若在添加模型时选择某一分组，则模型添加成功后直接加入该分组

:::

### 2. 操作方法
点击模型信息顶部「模型分组」图标，即可设置或修改分组

![图模式](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E6%A8%A1%E5%9E%8B%E7%AE%A1%E7%90%86/%E6%A8%A1%E5%9E%8B%E5%88%86%E7%BB%84%E5%9B%BE.png)

![表模式](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E6%A8%A1%E5%9E%8B%E7%AE%A1%E7%90%86/%E6%A8%A1%E5%9E%8B%E5%88%86%E7%BB%84%E8%A1%A8.png)

## （七） 继承关系
### 1. 功能介绍
模型的继承关系展示与当前模型存在父子关系的模型关系图。

页面初始只展示一层父模型与一层子模型，可向上展开一层或收起本模型，当只有最后一层父模型时不允许收起。支持缩放关系图或全屏展示

:::warning 提示

若点击非当前模型，会打开新窗口跳转至点击模型的模型设计器页面，新页面满足点击模型的筛选条件

:::

### 2. 操作方法
+ 点击模型信息顶部「继承关系」图标，即可展示模型继承关系图

![图模式](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E6%A8%A1%E5%9E%8B%E7%AE%A1%E7%90%86/%E7%BB%A7%E6%89%BF%E5%9B%BE.png)

![表模式](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E6%A8%A1%E5%9E%8B%E7%AE%A1%E7%90%86/%E7%BB%A7%E6%89%BF%E8%A1%A8.png)

+ 在模型继承关系图中，点击「展开」，向上展开父模型
+ 在模型继承关系图中，点击「收起」，收起本模型

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E6%A8%A1%E5%9E%8B%E7%AE%A1%E7%90%86/%E7%BB%A7%E6%89%BF3.png)

## （八） 查看引用关系
### 1. 功能介绍
利用查看引用功能，可深入了解模型之间的层次结构和依赖关系，全面掌握整个应用的数据流动和交互方式。通过此功能，可以查看到与该模型存在引用关系的各类元素，包括其他模型、页面、流程以及图表。每种关系通过列表展示，列表项为链接，可链接到对应的设计页面；内容为对应内容。

:::tip 举例

存在引用关系的流程的列表项显示的是流程的名称，列表项链接到对应流程的设计页面。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E6%A8%A1%E5%9E%8B%E7%AE%A1%E7%90%86/%E5%BC%95%E7%94%A8%E4%B8%BE%E4%BE%8B.png)

:::

### 2. 操作方法
+ 在模型或模型列表点击「查看引用」，即可查看所有引用。
+ 在模型顶部提供两个快捷查看入口，点击「查看页面引用」图标和「查看图表引用」图标，分别可以查看页面引用和图表引用

![图模式](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E6%A8%A1%E5%9E%8B%E7%AE%A1%E7%90%86/%E5%BC%95%E7%94%A8%E5%9B%BE1.png)

![图模式-模型列表](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E6%A8%A1%E5%9E%8B%E7%AE%A1%E7%90%86/%E5%BC%95%E7%94%A8%E5%9B%BE2.png)

![表模式](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E6%A8%A1%E5%9E%8B%E7%AE%A1%E7%90%86/%E5%BC%95%E7%94%A8%E8%A1%A8.png)

## （九） 废弃/可用模型
### 1. 功能介绍
对于当前暂不使用的模型，可以执行废弃操作。若日后需要，只需将废弃的模型设置为可用状态，即可重新投入使用。此外，废弃后的模型仍支持对其进行编辑等操作

:::info 注意

废弃后的模型，在选择父模型或其他设计器中引用时，将不再显示在可选列表中。

:::

### 2. 操作方法
在模型或模型列表点击「废弃」，模型设置为废弃状态，按钮变为「设为可用」；再次点击，模型设置为可用状态

![图模式](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E6%A8%A1%E5%9E%8B%E7%AE%A1%E7%90%86/%E5%BA%9F%E5%BC%83%E5%9B%BE1.png)

![图模式-模型列表](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E6%A8%A1%E5%9E%8B%E7%AE%A1%E7%90%86/%E5%BA%9F%E5%BC%83%E5%9B%BE2.png)

![表模式](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E6%A8%A1%E5%9E%8B%E7%AE%A1%E7%90%86/%E5%BA%9F%E5%BC%83%E8%A1%A8.png)

## （十） 删除模型
### （1） 功能介绍
当模型不再使用时，可以选择将其删除。

:::info 注意

在删除前，需确保该模型未被其他设计器引用，否则删除操作将无法进行。

:::

:::danger 警告

删除后的模型将不再出现在模型列表中，且此操作不可恢复，请务必谨慎执行。

:::

### 2.1（2） 操作方法
+ 在模型列表或模型顶部，点击「删除」，即可删除模型

![图模式](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E6%A8%A1%E5%9E%8B%E7%AE%A1%E7%90%86/%E5%88%A0%E9%99%A4%E5%9B%BE1.png)

![图模式-模型列表](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E6%A8%A1%E5%9E%8B%E7%AE%A1%E7%90%86/%E5%88%A0%E9%99%A4%E5%9B%BE2.png)

![表模式](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E6%A8%A1%E5%9E%8B%E7%AE%A1%E7%90%86/%E5%88%A0%E9%99%A4%E8%A1%A8.png)

+ 删除失败时，点击「查看模型引用」，可查看当前模型引用关系

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E6%A8%A1%E5%9E%8B%E7%AE%A1%E7%90%86/%E5%88%A0%E9%99%A44.png)

# 三、 字段管理
模型中的字段是构成模型的核心要素之一，它对应于数据库中表的一列，用于存储特定类型的数据信息。平台提供了丰富的业务类型字段，涵盖基本类型和关系类型等多种选择。在模型设计器中，可以轻松对字段进行增加、删除、修改和查询等基础管理操作。在无代码模式下，模型仅展示无代码字段；在专家模式下，模型展示无代码字段与低代码字段，低代码字段仅做展示，无法对其编辑或删除。

## （一） 添加字段
### 1. 功能介绍
一个模型可以添加多个字段，在模型设计器中手动添加的字段属于无代码字段。在创建时可以编辑字段名称、业务类型、是否为多值字段、存储类型以及字段长度（仅在专家模式下）。

字段支持两种存储类型，分别为存储字段和传输字段（详见附件：名词解释）

:::info 注意

多值字段表示该字段可以存储或传输多个该业务类型的数据，非多值字段只能存储或传输单个该业务类型的数据

:::

平台提供丰富的字段业务类型，包括16种基本类型与3种关系类型，可以根据实际需要选择对应类型。

+ 基本类型：用户ID、整数、浮点数、金额、布尔型、文本、多行文本、富文本、日期时间、年份、日期、时间、数据字典、键值对、手机、邮箱
+ 关系类型：多对一、一对多、多对多

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E5%AD%97%E6%AE%B5%E7%AE%A1%E7%90%86/%E6%B7%BB%E5%8A%A01.png)

::: tip 举例
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E5%AD%97%E6%AE%B5%E7%AE%A1%E7%90%86/%E6%B7%BB%E5%8A%A0%E4%B8%BE%E4%BE%8B.png)

:::

### 2. 操作方法
+ 图模式下，点击「添加字段」，即可添加字段。另外平台提供添加关系的快捷方式，点击「添加关系」，可直接添加关系类型的字段

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E5%AD%97%E6%AE%B5%E7%AE%A1%E7%90%86/%E6%B7%BB%E5%8A%A0%E5%9B%BE.png)

+ 表模式下，点击字段列表右上角的「添加字段」，即可添加字段

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E5%AD%97%E6%AE%B5%E7%AE%A1%E7%90%86/%E6%B7%BB%E5%8A%A0%E8%A1%A8.png)

## （二） 编辑字段
### 1. 功能介绍
成功创建的字段可以进行编辑，但需注意，仅部分信息支持修改，部分信息在创建时即已固定，因此创建时需谨慎填写。

:::info 注意

字段长度和精度只能由小往大改，不能由大往小改

:::

### 2. 操作方法
+ 图模式下，点击字段列表所在行右侧的「编辑字段」图标，即可在弹出的编辑页面编辑字段信息

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E5%AD%97%E6%AE%B5%E7%AE%A1%E7%90%86/%E7%BC%96%E8%BE%91%E5%9B%BE1.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E5%AD%97%E6%AE%B5%E7%AE%A1%E7%90%86/%E7%BC%96%E8%BE%91%E5%9B%BE2.png)

+ 表模式下，点击字段列表所在行右侧的「编辑字段」图标，或直接点击字段信息，即可在字段列表中编辑字段信息。可点击「展开」图标，编辑更多字段信息

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E5%AD%97%E6%AE%B5%E7%AE%A1%E7%90%86/%E7%BC%96%E8%BE%91%E8%A1%A81.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E5%AD%97%E6%AE%B5%E7%AE%A1%E7%90%86/%E7%BC%96%E8%BE%91%E8%A1%A82.png)

## （三） 查看引用关系
### 1. 功能介绍
通过查看引用功能，可以查看到与该模型存在引用关系的各类元素，包括其他模型、页面、流程以及图表。

### 2. 操作方法
点击「查看引用」，即可查看所有引用，包括模型、页面、流程以及图表。

![图模式](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E5%AD%97%E6%AE%B5%E7%AE%A1%E7%90%86/%E5%BC%95%E7%94%A8%E5%9B%BE.png)

![表模式](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E5%AD%97%E6%AE%B5%E7%AE%A1%E7%90%86/%E5%BC%95%E7%94%A8%E8%A1%A8.png)

## （四） 废弃/可用字段
### 1. 功能介绍
对于当前暂不使用的字段，可以执行废弃操作。若日后需要，只需将废弃的字段设置为可用状态，即可重新投入使用。此外，废弃后的字段仍支持对其进行编辑等操作

:::info 注意

废弃后的字段，在其他设计器中引用时，将不再显示在可选列表中。

:::

### 2. 操作方法
点击「废弃」，字段设置为废弃状态，按钮变为「设为可用」；再次点击，字段设置为可用状态

![图模式](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E5%AD%97%E6%AE%B5%E7%AE%A1%E7%90%86/%E5%BA%9F%E5%BC%83%E5%9B%BE.png)

![表模式](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E5%AD%97%E6%AE%B5%E7%AE%A1%E7%90%86/%E5%BA%9F%E5%BC%83%E8%A1%A8.png)

## （五） 删除字段
### 1. 功能介绍
当字段不再使用时，可以选择将其删除。

:::info 注意

在删除前，需确保该字段未被其他设计器引用，否则删除操作将无法进行。

:::

:::danger 警告
删除后的字段将不再出现在字段列表中，且此操作不可恢复，请务必谨慎执行。

:::

删除失败，将直接展示字段引用关系

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E5%AD%97%E6%AE%B5%E7%AE%A1%E7%90%86/%E5%88%A0%E9%99%A41.png)

### 2. 操作方法
+ 点击字段列表所在行右侧的「删除」，即可删除字段

![图模式](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E5%AD%97%E6%AE%B5%E7%AE%A1%E7%90%86/%E5%88%A0%E9%99%A4%E5%9B%BE.png)

![表模式](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/%E6%A8%A1%E5%9E%8B%E8%AE%BE%E8%AE%A1%E5%99%A8/%E6%A8%A1%E5%9E%8B/%E5%AD%97%E6%AE%B5%E7%AE%A1%E7%90%86/%E5%88%A0%E9%99%A4%E8%A1%A8.png)

# 四、 附件：名词解释
|<div style="width:70px;"> 名词 </div>| 描述 |
| :---: | --- |
| 存储模型 | 用于存储数据的模型，可以生成前后端交互协议、数据表、数据构造器和数据管理器 |
| 抽象模型 | 用于配置多个子模型的公用字段和函数的模型，不会生成前后端交互协议、数据表、数据构造器和数据管理器 |
| 传输模型 | 用于数据传输的模型，可以生成前后端交互协议和数据构造器，不会生成数据表和数据管理器 |
| 代理模型 | 用于以代理的方式扩展存储模型的模型，可以在存储模型的基础上增加传输字段和函数，与被代理的存储模型共用相同的数据管理器 |
| 无代码模型 | 通过无代码设计器（如模型设计器、界面设计器）设计的模型称之为无代码模型 |
| 低代码模型 | 通过低代码研发框架编写代码或无代码设计时系统自动生成的模型称之为低代码模型 |
| 抽象继承 | 继承抽象模型 |
| 扩展继承 | 存储模型间继承默认为扩展继承。扩展继承的子模型与父模型数据表相同，子模型继承父模型的字段与函数 |
| 代理继承 | 为原模型创建代理，可以增删改查代理模型的实体数据 |
| 传输继承 | 将父模型作为传输模型使用，并可以添加传输字段 |
| 存储字段 | 用于查询和存储字段 |
| 传输字段 | 仅用于数据的组装和存储 |


