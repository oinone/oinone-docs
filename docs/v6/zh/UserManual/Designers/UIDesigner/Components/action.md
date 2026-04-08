---
title: 动作
index: true
category:
  - 用户手册
  - 设计器
order: 4
next:
  text: 自定义组件
  link: /v6/zh/UserManual/Designers/UIDesigner/CustomizedComponents/README.md
---
# 一、操作栏
+ 样式：提供两种动作组件的展示样式：
  - **默认样式**：所有按钮按各自的预设样式显示。
  - **首按钮突出样式**：首个按钮以主要按钮样式展示，其余按钮显示为文字按钮。
  ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/1765366197643-11cf1654-1b01-4b68-a5f3-534b311c7805.png)
+ 动作区显示数量：可设置动作区中直接显示的按钮数量；当未选择“禁用折叠”时，可设置「更多」按钮的样式；若启用“禁用折叠”，则不显示「更多」按钮。

# 二、通用属性
+ 动作名称/按钮文字：组件在当前页面的展示名称。
+ 保留动作：开启此选项后，若删除该动作组件，它将会被保留在左侧工具区的模型动作列表中，便于后续继续使用。
+ 图标：支持为动作组件添加图标，以增强其可视化和识别度。
+ 是否隐藏：设为隐藏，在实际页面中，组件不可见，也不可编辑。若设置为条件隐藏，则在符合条件时隐藏。在设计页面时，设为隐藏的组件仍会展示。
+ 是否禁用：设为禁用，在实际页面中，组件可见，但不可编辑。若设置为条件禁用，则在符合条件时禁用。
+ 按钮样式：提供主要按钮和次要按钮两种选择。主要按钮设有底色，更加醒目突出；次要按钮则无底色设计。
+ 按钮类型：可为按钮设定不同类型，各类型按钮的底色各异，包括默认、成功、警告、危险、提示五种选项。
+ 显示设备：支持PC端、移动端与PAD端。
+ 快捷键：提供键盘自定义快捷键功能，可快速执行指定动作。
+ 触发范围：可为快捷键设定触发范围，包括当前视图与全局两种模式。选择当前视图时，快捷键仅在当前视图中有效；选择全局时，快捷键在整个平台中均可使用。
+ 二次确认：开启此功能后，在执行某一动作前，将弹出确认框进行二次确认。
    - 提示类型：指弹框的展示类型，包括气泡提示和对话框提示两种。
    - 提示方向：当提示类型为气泡提示时，显示该属性。可设置气泡的展示位置，选项包括按钮的上方、下方、左侧和右侧。

    :::info 注意

    若选择的方向页面位置不足，提示位置将自适应。

    :::

    - 提示文字：即确认框中显示的主体文字内容。
    - 确定按钮文字：支持自定义确定按钮的展示文字。
    - 取消按钮文字：支持自定义取消按钮的展示文字。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/action/ty1.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/action/ty2.png)

# 三、特有属性
## （一）提交动作
配置不同的服务器函数，可以执行不同的操作，适用于查询、删除、创建等多种场景。

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/action/tj1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/action/tj2.gif)

:::

提交动作特有属性：

+ 数据控制类型：即执行动作时控制的数据。包括处理单条数据、处理多条数据、处理单条或多条数据、不进行数据处理四种类型。
+ 服务器函数：即动作执行的函数，提供了多种函数，可根据实际需求选择。
+ 校验数据：开启此选项，在动作执行前会进行校验数据。
+ 返回上一页面：开启此选项，在动作执行后会直接返回上一页面。
+ 刷新主视图：开启此选项，在动作执行后会刷新主视图。
+ 刷新当前视图：开启此选项，在动作执行后会刷新当前视图。
+ 上下文：当数据在不同位置名称不一致，但实质上指代同一数据时，可通过配置上下文来实现数据的映射。

:::tip 举例

用户系统与销售系统：

+ 在用户系统中，用户的唯一标识可能被称为“用户ID”。
+ 在销售系统中，同一个用户的唯一标识可能被称为“客户ID”。

通过上下文配置，可以将这两个不同系统中的名称映射为同一个实际数据，即用户ID和客户ID指向的是同一数据。

:::

## （二）跳转动作
支持跳转至某页面，适用于页面导航、提交确认等场景。

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/action/tz1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/action/tz2.gif)

:::

跳转动作特有属性：

+ 数据控制类型：即执行动作时控制的数据。包括处理单条数据、处理多条数据、处理单条或多条数据、不进行数据处理四种类型。
+ 打开方式：设置跳转页面的打开方式，包括当前窗口打开、新窗口打开、弹窗打开、抽屉打开四种方式。
  :::warning 提示

    当设置跳转页面为弹窗或抽屉时，可以配置其页面属性：
    - 标题：可输入用于显示在弹窗页面上的标题
    - 开启动态标题：开启时，可按设定规则动态展示标题；关闭则固定显示默认标题。
    - 弹窗高度/弹窗宽度：可选择不同尺寸规格。
    - 标题排列方式：可设置弹窗标题的排列样式，包括横向与纵向。
    - 允许拖拽：开启后可自由拖拽弹窗位置。
    - 添加显示遮罩：可选择是否显示遮罩，用于在弹窗弹出时，使背景内容虚化，突出弹窗内容。
    - 允许关闭：可设置是否显示关闭按钮。
    - 点击遮罩关闭：可设置当用户点击遮罩区域时，弹窗是否关闭。
    - 切换全屏：启用此功能后，用户在实际运行的页面中可将弹窗/抽屉切换为全屏状态
    ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/1765354301076-e71e3a43-7462-46a6-9bff-db801c50fa06.gif)
    - 弹窗/抽屉切换：启用此功能后，用户在实际运行的页面中，可以随意切换展示形式（弹窗或抽屉）
    ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/1765354213913-a74a7d99-8228-487d-9032-46fe6ff912f4.gif)
    + 记录切换：启用此功能后，用户在实际运行的页面中可快捷切换页面中展示的数据
    ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/1765354394985-23e30334-7172-4531-8342-cbcdef20c93d.gif)
  :::
+ 页面内容：指定跳转的页面内容，既可以选择绑定已有的页面，也可以创建新的页面。当选择创建新页面时，当前组件属性栏中将新增新建页面的相关属性，便于快速创建并设置新页面。
+ 绑定页面：当选择绑定已有的页面时，显示此属性。可选择在界面设计器中已发布的页面。
+ 禁用数据加载：开启此选项后，将不执行数据加载函数。
+ 加载函数：若开启禁用数据加载，不显示该属性。在实际页面中选择某一选项值时，将执行该函数加载数据。

:::info 注意

当指定加载函数时，将不再自动识别加载函数。

:::

+ 强制刷新标签页：开启此选项，每次切换到此标签页时页面内容会自动刷新。
+ 上下文：当数据在不同位置名称不一致，但实质上指代同一数据时，可通过配置上下文来实现数据的映射。

:::tip 举例

用户系统与销售系统：

+ 在用户系统中，用户的唯一标识可能被称为“用户ID”。
+ 在销售系统中，同一个用户的唯一标识可能被称为“客户ID”。

通过上下文配置，可以将这两个不同系统中的名称映射为同一个实际数据，即用户ID和客户ID指向的是同一数据。

:::

+ 设计跳转页面：提供快捷方式，方便用户快速设计跳转页面。

## （三）链接动作
支持链接到其他网页中，适用于快速导航到相关页面等场景。

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/action/lj1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/action/lj2.gif)

:::

链接动作特有属性：

+ 数据控制类型：即执行动作时控制的数据。包括处理单条数据、处理多条数据、处理单条或多条数据、不进行数据处理四种类型。
+ 链接到URL：指定跳转的目标链接URL。
:::info 注意

支持动态URL配置机制，允许用户根据需求自定义链接中的动态参数，实现基于不同数据的灵活链接跳转。

:::
+ 计算函数：即动作执行的函数，可依据实际需求自定义函数。
:::info 注意

计算函数：即动作执行的函数，可依据实际需求自定义函数

:::
+ 打开方式：设置链接页面的打开方式。

## （四）客户端动作
依据不同的客户端行为，可以执行不同的操作，适用于返回、刷新、更新数据等场景。

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/action/khd1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/action/khd2.gif)

:::

客户端特有属性：

+ 客户端行为：根据客户端的行为配置动作。
  + 返回上一个页面：若页面存在上一页面时，可返回至上一页面
  + 刷新数据：可刷新该页面所展示的数据信息
  + 批量更新：需与批量动作结合使用，用于在批量跳转的页面中更新多条数据
  + 删除数据：选中所需删除的数据后，即可执行删除操作
  + 添加一行数据：无需跳转页面，即可在表格直接添加一行数据
  + 复制一行数据：选中任意一条数据后，即可快速复制该数据。
  + 保存为草稿：将当前填写内容临时保存，不会提交为正式数据
  ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/1765419181775-cb54a6d5-d605-45bb-903c-133917bedfe6.gif)

## （五）批量动作
跳转动作处理多条数据的快捷方式，可对选中数据集内的数据进行批量修改的行为。

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/action/pl1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/action/pl2gif)

:::

批量动作特有属性：

+ 打开方式：设置批量动作的打开方式，包括弹窗打开、抽屉打开两种方式。
+ 页面模型：即执行批量动作时所跳转页面所绑定的模型
+ 设计弹窗/抽屉：可设计批量动作所跳转的页面。

:::info 注意

为批量动作设置弹窗/抽屉页面时，需使用“客户端动作-批量更新”动作来提交相关数据

:::

## （六）工作流
支持手动触发工作流。

:::info 注意

工作流动作需要在页面所属应用下依赖“工作流”应用后，才会在组件库中显示。

:::

:::tip 举例

设计示例：

本示例选取工作流：触发流程后将发送一个站内信，内容为“这是由工作流动作触发的流程”

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/action/gzl1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/action/gzl2.gif)

:::

工作流特有属性：

+ 执行函数：执行动作时调用的函数。
+ 工作流：可选定当前页面所属模型下包含的需模型触发的流程。
+ 校验数据：开启此选项，在动作执行前会进行校验数据。
+ 返回上一页面：开启此选项，在动作执行后会直接返回上一页面。
+ 刷新主视图：开启此选项，在动作执行后会刷新主视图。
+ 刷新当前视图：开启此选项，在动作执行后会刷新当前视图。
+ 提交数据：若开启此选项，可配置参数映射。即当数据在不同位置名称不一致，但实质上指代同一数据时，可通过配置参数映射来实现。
+ 上下文：当数据在不同位置名称不一致，但实质上指代同一数据时，可通过配置上下文来实现数据的映射。

## （七）微流
支持手动触发微流。

:::info 注意

微流动作需要在页面所属应用下依赖“工作流”应用后，才会在组件库中显示。

:::

:::tip 举例

设计示例：

本示例选取微流：触发流程后将发送一个站内信，内容为“这是由微流动作触发的微流”

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/action/wl1.png)

展示示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/action/wl2.gif)

:::

微流特有属性：

+ 执行函数：执行动作时调用的函数。
+ 工作流：可选定当前页面所属模型下包含的需模型触发的流程。
+ 校验数据：开启此选项，在动作执行前会进行校验数据。
+ 返回上一页面：开启此选项，在动作执行后会直接返回上一页面。
+ 刷新主视图：开启此选项，在动作执行后会刷新主视图。
+ 刷新当前视图：开启此选项，在动作执行后会刷新当前视图。
+ 提交数据：若开启此选项，可配置参数映射。即当数据在不同位置名称不一致，但实质上指代同一数据时，可通过配置参数映射来实现。
+ 上下文：当数据在不同位置名称不一致，但实质上指代同一数据时，可通过配置上下文来实现数据的映射。

## （八）集成连接器
支持手动对其他应用或数据库发起集成连接。

:::info 注意

集成连接器动作需要在页面所属应用下依赖“集成接口”应用后，才会在组件库中显示。

:::

:::tip 举例

设计示例：

本示例选取连接器：触发集成连接后将执行接口（接口日志可在「集成设计器」-「接口日志」中查看）

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/action/jc1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/action/jc2.gif)

:::

集成连接器特有属性：

+ 执行函数：执行动作时调用的函数。
+ 连接器类型：可选择连接器的类型，包括应用或数据库两种。
+ 应用/数据库：可从集成设计器中已存在的应用或数据库中进行选择。
+ Api资源：展示所选应用或数据库中包含的API资源。
+ 校验数据：开启此选项，在动作执行前会进行校验数据
+ 返回上一页面：开启此选项，在动作执行后会直接返回上一页面。
+ 刷新主视图：开启此选项，在动作执行后会刷新主视图。
+ 刷新当前视图：开启此选项，在动作执行后会刷新当前视图。
+ 提交数据：若开启此选项，可配置参数映射。即当数据在不同位置名称不一致，但实质上指代同一数据时，可通过配置参数映射来实现。
+ 上下文：当数据在不同位置名称不一致，但实质上指代同一数据时，可通过配置上下文来实现数据的映射。

## （九）数据流程
支持手动触发数据流程。

:::info 注意

数据流程动作需要在页面所属应用下依赖“集成接口”应用后，才会在组件库中显示。

:::

:::tip 举例

设计示例：

本示例选取数据流程：触发流程后将发送一个站内信，内容为“流程已执行完毕”

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/action/sjlc1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/action/sjlc2.gif)

:::

数据流程特有属性：

+ 执行函数：执行动作时调用的函数。
+ 数据流程：可选定当前页面所属模型下包含的需模型触发的数据流程。
+ 校验数据：开启此选项，在动作执行前会进行校验数据。
+ 返回上一页面：开启此选项，在动作执行后会直接返回上一页面。
+ 刷新主视图：开启此选项，在动作执行后会刷新主视图。
+ 刷新当前视图：开启此选项，在动作执行后会刷新当前视图。
+ 提交数据：若开启此选项，可配置参数映射。即当数据在不同位置名称不一致，但实质上指代同一数据时，可通过配置参数映射来实现。
+ 上下文：当数据在不同位置名称不一致，但实质上指代同一数据时，可通过配置上下文来实现数据的映射。

:::warning 提示

模型中的动作是上述动作的快捷操作方式，其具体属性可直接参照上述动作的属性进行查看。

:::

## （十）AI
支持将已完成配置的 AI 连接器与当前页面的各类字段进行绑定与关联，通过数据映射快速构建定制化的 AI 产品解决方案。

:::info 注意

AI动作需要在页面所属应用下依赖“AI”应用后，才会在组件库中显示。

:::

:::tip 举例

设计示例：

通过用户输入的文本，生成对应的图片

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/action/AI1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/action/AI2.gif)

:::

AI特有属性：
+ AI连接器：可选择已成功发布的AI连接器，系统将依据选择的连接器配置的字段与大模型顺序完成数据的交互。
+ Body参数映射：指将当前页面的字段与AI连接器的输入字段建立关系。
+ 响应参数映射：指将当前页面的字段与AI连接器的输出字段建立关系。
+ 返回上一页面：开启此选项，在动作执行后会直接返回上一页面。
+ 刷新主视图：开启此选项，在动作执行后会刷新主视图。
+ 刷新当前视图：开启此选项，在动作执行后会刷新当前视图。
+ 提交数据：若开启此选项，可配置参数映射。即当数据在不同位置名称不一致，但实质上指代同一数据时，可通过配置参数映射来实现。
+ 上下文：当数据在不同位置名称不一致，但实质上指代同一数据时，可通过配置上下文来实现数据的映射。
