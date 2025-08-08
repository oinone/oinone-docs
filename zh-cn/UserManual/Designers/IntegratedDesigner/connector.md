---
title: 连接器
index: true
category:
  - 用户手册
  - 设计器
order: 2
---
在着手处理集成事务之前，需先明确并定义可被集成的资源，待资源定义完毕后，方可进行集成数据的编排工作，如图：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/1.png)

所谓集成，是指平台应用与外部系统之间的对接，而平台内部应用之间则通过内部服务调用直接实现交互。连接器作为集成的重要组成部分，涵盖了应用、数据库与文件集三大类型资源：

+ 应用：指可被集成的应用资源；
+ 数据库：指可被集成的数据库资源。
+ 文件集：指可被引用的文件资源

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/2.png)

在连接器中，以卡片形式呈现组件列表。卡片上可预览到应用、数据库或文件集的基本信息：

+ 应用：图标、名称、业务域、描述、授权状态、包含API数量

:::info 注意

当创建应用时选择了某项认证方式时，此处的授权状态会对应状态。

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/3.png)

+ 数据库：名称、类型、描述、包含API数量

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/4.png)

+ 文件集：名称、类型、描述、包含文件数量

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/5.png)

# 一、切换资源类型
### 1.功能介绍
连接器中包含三大资源类型，分别为应用、数据库与文件集，可针对这三种资源分别进行独立的管理和操作。

### 2.操作方法
在Tab栏中点击对应资源类型即可切换

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/qh.png)

# 二、筛选
### 1.功能介绍
根据实际业务需求，可以定制应用、数据库与文件集的筛选条件。在当前的筛选条件下，将展示相应的应用、数据库与文件集列表，方便查看和编辑不同的应用、数据库与文件集。

### 2.操作方法
+ 筛选：在筛选区输入条件后点击「搜索」，即可对应用、数据库与文件集进行筛选。
+ 一键清除：点击「清除」图标，可一键清除当前筛选区中条件

![应用](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/sx1.png)

![数据库](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/sx2.png)

![文件集](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/sx3.png)

# 三、新增
### 1.功能介绍
支持自定义应用、数据库与文件集资源

+ 应用：可设置应用的名称、描述、图示、业务域、服务器地址、认证方式与加密方式
+ 数据库：可设置数据库的类型、名称、描述、连接地址、端口、扩展参数、源数据库名称、账号与密码。
+ 文件集：可设置文件集的名称、类型与描述。

:::info 注意

数据库资源中可以包含查询、插入、更新、删除等操作类资源，但不允许执行DDL

:::

:::warning 提示

当数据库信息填写完毕后，可对其连接进行测试。即使当前未成功连接，或未测试连接，仍可成功创建连接

:::

### 2.操作方法
+ 应用：点击「新增应用资源」，在弹出的页面中依据需求填写信息后保存，即可创建成功

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/xz1.png)

+ 数据库：点击「新增DB资源」，在弹出的页面中依据需求填写信息后保存，即可创建成功

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/xz2.png)

+ 文件集：点击「新增文件集」，在弹出的页面中依据需求填写信息后保存，即可创建成功

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/xz3.png)

# 四、编辑
### 1.功能介绍
成功创建的应用、数据库与文件集可以进行编辑

### 2.操作方法
点击「编辑」，即可在弹出的编辑页面中进行编辑（此处展示应用，数据库与文件集同理）

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/bj.png)

# 五、查看引用
### 1.功能介绍
可查看与该应用、数据库与文件集存在引用关系的各类元素。

### 2.操作方法
点击「查看引用」图标，即可查看引用信息。（此处展示应用，数据库与文件集同理）

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/yy.png)

# 六、删除
### 1.功能介绍
当应用、数据库与文件集不再使用时，可以选择将其删除。

:::info 注意

在删除前，需确保该应用、数据库与文件集未被引用，否则删除操作将无法进行。

:::

:::danger 警告

应用、数据库与文件集删除后无法恢复，请谨慎操作！

:::

### 2.操作方法
点击「删除」图标，确定删除后即可删除。（此处展示应用，数据库与文件集同理）

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/sc.png)

# 七、详情
### 1.功能介绍
一个应用或数据库中可以包含多个API，一个文件集可以包含多个文件，但在卡片中无法全部呈现。为了更全面地了解应用、数据库与文件集，支持查看其详情，既可以浏览应用、数据库与文件集的基本信息，又可以查看其所包含的所有API与文件的信息。

:::info 注意

若在创建应用时选择了某项认证方式，可在详情中添加其授权信息

:::

### 2.操作方法
点击卡片，即可进入其详情页面（此处展示应用，数据库与文件集同理）

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/xq.png)

# 八、管理API
进入详情页面后，可对其包含的API与文件进行管理，包括新增、删除、编辑等操作

## （一）查询
### 1.功能介绍
根据实际业务需求，可以定制API或文件筛选条件。在设定好的筛选条件下，将展示相应的API或文件列表。

### 2.操作方法
在筛选区选择或输入条件，完成对API或文件的筛选（此处展示应用，数据库与文件集同理）

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/glAPI/cx.png)

## （二）新增
### 1.功能介绍
应用可依据业务需求新增API或WebService，数据库可新增API，文件集可新增文件

+ 新增API：可设置API基本信息、请求参数与响应结果
    - API URL支持：
        * 协议类型：HTTP/HTTPS
        * Verb：GET、POST、PUT、DELETE
    - 参数类型支持：Long、Double、String、Boolean、Integer、Date、Void、Object。
    - 内容类型支持：application/json、x-www-form-urlencoded 、multipart/form-data 、application/json + fhir
+ 新增WebService：可设置WebService基本信息、请求参数与响应结果（数据库不支持）
    - API URL支持：
        * 协议类型：HTTP/HTTPS
        * Verb：POST
    - 参数类型支持：Long、Double、String、Boolean、Integer、Date、Void、Object。

:::info 注意

若“忽略日志频率配置”开关未开启，系统将仅记录部分日志内容。在正常运行情况下，可关闭此配置以节省资源。若运行过程中出现问题，则可开启此配置，系统将完整记录接口日志的请求与响应详细信息，便于排查和查看。

:::

:::info 注意

API的路径不允许重复。

:::

+ 新增文件：可上传本地文件，设置其名称与描述。可预览文件中的已有数据，并根据解析出的数据更改数据类型。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/1754567980575-250b44e9-39e5-43e4-9da1-841751f4517c.png)

:::info 注意

支持上传的文件格式有xlsx、xls、csv，且需小于50M

:::

### 2.操作方法
+ 对于应用，点击「新增API」，选择「新增API」或「新增WebService」，在弹出的页面中填写信息后保存，即可新增成功。
+ 对于数据库，点击「新增API」，在弹出的页面中填写信息后保存，即可新增成功。
+ 对于文件集，点击「新增文件」，在弹出的页面中填写信息后保存，即可新增成功。

创建成功后会自动启用API与文件，启用后的API与文件可被引用。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/glAPI/xz.png)

## （三）编辑
### 1.功能介绍
成功创建的API或文件可对其进行编辑。

### 2.操作方法
点击「编辑」，即可在弹出的编辑页面中进行编辑。

:::info 注意

仅当API与文件处于未启用状态时，才允许对其进行编辑操作。一旦API与文件被启用，编辑按钮将被隐藏，以防止对正在使用的API与文件进行不当修改。

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/glAPI/bj.png)

## （四）详情
### 1.功能介绍
支持展示API与文件的详细信息

### 2.操作方法
点击「详情」，即可查看选中API与文件的详细信息

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/glAPI/xq.png)

## （五）复制
### 1.功能介绍
当API信息相似度较高的情况时，可使用复制功能，将生成一个“原API名称-复制”的新增页面，编辑内容后保存，方可成功复制（数据库与文件集不支持）

:::info 注意

API的路径不允许重复。

:::

### 2.操作方法
点击「复制」，在弹出页面中填写信息后保存，即可复制成功。

:::info 注意

当API未启用时，操作栏会呈现“编辑”按钮，“复制”会被收至“更多”中

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/glAPI/fz.png)
## （六）删除
### 1.功能介绍
当API与文件不再使用时，可以选择将其删除。

:::info 注意

当API与文件已被引用时，无法删除。

:::

:::danger 警告

API删除后无法恢复，请谨慎操作！

:::

### 2.操作方法
点击「删除」图标，确定删除后即可删除。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/glAPI/sc.png)

## （七）发布开放接口
### 1.功能介绍
支持将应用与数据库中的API发布为开放接口，设置为开放接口后可被外部系统使用。

:::info 注意

设为开放接口的API可在「开放平台」中查看

:::

### 2.操作方法
选定API，点击「发布开放接口」，即可成功发布

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/glAPI/fb.png)

## （八）导出API文档
### 1.功能介绍
支持将API的信息导出为文档格式

### 2.操作方法
选定API，点击「导出API文档」，即可成功导出

:::warning 提示

成功导出的文档，可前往「文件」-「导出任务」中下载

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/connector/glAPI/dc.png)



