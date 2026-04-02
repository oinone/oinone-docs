---
title: 自定义组件-元件信息
index: true
category:
  - 用户手册
  - 设计器
order: 2
---
&emsp;&emsp;一个组件内部可以包含多个元件，这些元件是根据不同的字段业务类型自行设计的属性页面。在设计页面时，为组件选定字段业务类型的过程，实际上就是选择不同的元件来构建组件。

&emsp;&emsp;在页面设计器中，元件默认以卡片的形式呈现为元件列表，方便用户浏览和选择。元件卡片上展示了元件的基本信息，包括元件名称、API名称、支持字段业务类型、是否支持多值、支持视图类型与元件描述，以便用户快速了解元件的功能和用途。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Custom%20Components/Component%20information/1.png)

# 一、筛选
### 1.功能介绍
根据实际业务需求，可以定制元件筛选条件，包括选择是否隐藏与输入元件名称，以便对元件进行精确筛选。在设定好的筛选条件下，将展示相应的元件列表，方便对元件进行查看和编辑操作。

### 2.操作方法
在筛选区选择或输入条件，完成对元件的筛选。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Custom%20Components/Component%20information/sx.png)

# 二、添加元件
### 1.功能介绍
利用界面设计器创建元件，在创建过程中可以编辑元件信息。完成创建并发布的元件可以在配置组件时使用。

### 2.操作方法
点击「添加元件」，在弹窗页面中正确填写信息后，点击「确定」后即可成功创建。

:::info 注意

+ 在可支持的视图类型中，用户可以选择并使用该元件；而在不支持的视图类型中，该元件将不会显示。
+ 多值字段表示该字段可以存储或传输多个该业务类型的数据，非多值字段只能存储或传输单个该业务类型的数据

:::

:::tip 举例

创建一个“下拉选”的组件，其中可以包含“下拉单选”“下拉多选”两个元件。“下拉选”组件从组件库中拖入时，设置单值时使用“下拉单选”元件，设置多值时使用“下拉多选”元件。

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Custom%20Components/Component%20information/tj1.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Custom%20Components/Component%20information/tj2.png)

# 三、编辑元件
### 1.功能介绍
成功创建的元件可对其进行编辑。

:::info 注意

仅部分信息支持修改，部分信息在创建时即已固定，因此创建时需谨慎填写。

:::

### 2.操作方法
点击「编辑」，即可在弹出的编辑页面中进行编辑。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Custom%20Components/Component%20information/bj.png)

# 四、设计元件
### 1.功能介绍
在设计元件时，可以通过使用各种组件，对元件进行个性化的设计布局，以满足不同的需求和风格。（详情见元件设计文档）

### 2.操作方法
点击元件卡片主体部分，或点击「设计页面」图标，即可进入设计元件界面。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Custom%20Components/Component%20information/sjyj.png)

# 五、查看引用信息
### 1.功能介绍
通过此功能，可以查看到与该元件存在引用关系的页面。关系通过列表展示，列表项为链接，可链接到对应的设计页面，内容为对应内容。

### 2.操作方法
点击「查看引用信息」图标，即可查看引用信息。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Custom%20Components/Component%20information/yy.png)

# 六、作废/可用元件
### 1.功能介绍
对于当前暂不使用的元件，可以执行作废操作。若日后需要，只需将作废的元件设置为可用状态，即可重新投入使用。

### 2.操作方法
点击「作废」，组件设置为作废状态，按钮变为「可用」；再次点击，元件设置为可见状态。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Custom%20Components/Component%20information/zf.png)

# 七、删除元件
### 1.功能介绍
当元件不再使用时，可以选择将其删除。若不确定组元件是否需要删除，可以先将其作废。

:::info 注意

在删除前，需确保该组件未被其他页面引用，否则删除操作将无法进行。

:::

:::danger 警告

页面删除后无法恢复，请谨慎操作！

:::

### 2.操作方法
点击「删除」图标，确定删除后即可删除

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Custom%20Components/Component%20information/sc.png)

# 八、附件：名词解释
| 名词 | 描述 |
| :---: | --- |
| 元件 | 依据不同的字段业务类型而设计的属性页面。 |
| API名称 | 应用程序编程接口（API）的名称，用于标识和调用特定的API。 |
| 视图类型 | 页面展示数据的各种方式布局。 |


