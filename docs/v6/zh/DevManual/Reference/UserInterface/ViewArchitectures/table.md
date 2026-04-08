---
title: 表格（Table）
index: true
category:
  - 研发手册
  - Reference
  - User interface
  - View architectures
order: 1
prev:
  text: 视图架构（View architectures）
  link: /v6/zh/DevManual/Reference/UserInterface/ViewArchitectures/README.md
---
# 一、视图特征

+ 视图类型：表格（TABLE）
+ 数据类型：列表（List）
+ DSL 特征：仅表示元素间相对顺序，无布局功能。
+ 数据结构通用行为：
  - 查询行为：分页、排序、搜索。
  - 交互行为：单选、多选。
+ 表格行为：
  - 交互行为：行内编辑、树形表格、展开行等。
+ 常用接口：（默认数据管理器函数）
  - queryPage：支持分页、排序、搜索等查询功能。
  - create：行内编辑创建。（pk is null）
  - update：行内编辑更新。（pk is not null）
  - delete：删除动作。

# 二、DSL 结构

一个精简版视图可以是这样的：（“精简” 表示每个标签的属性数量少，而不是节点数量少。）

```xml
<view type="TABLE" model="demo.DemoModel" name="demo_table_view">
    <template slot="searchFields">
        <field data="code" />
        <field data="name" />
    </template>
    <template slot="actions">
        <action name="redirectCreatePage" label="创建" />
        <action name="delete" label="删除" />
    </template>
    <template slot="fields">
        <field data="id" invisible="true" />
        <field data="code" />
        <field data="name" />
    </template>
    <template slot="rowActions">
        <action name="redirectUpdatePage" label="编辑" />
        <action name="redirectDetailPage" label="详情" />
    </template>
</view>
```

+ 在这个 `DSL` 中，围绕着模型 `demo.DemoModel` 定义了**字段**和**动作**，并通过**布局**提供的**插槽**将其放在对应的位置。
+ 在插槽中的元素**从上到下**表示了其相对位置，改变**先后顺序**就可以改变其渲染在页面上的位置。
+ `field` 标签使用 `data` 属性声明模型对应的字段，其对应 `ModelField#field` 字段编码。
+ `action` 标签使用 `name` 属性声明模型对应的动作，其对应 `Action#name` 动作名称。所有类型的动作，都继承自 `Action` 模型。`label` 属性指定了动作在页面上展示的文本内容，在未定义的情况下，将按照顺序分别获取：`label > displayName > name`。

:::warning 提示

我们在 DSL 章节中对插槽以及布局和 DSL 的工作原理进行了详细的介绍，这里所有的插槽名称都来源于默认布局。

更多关于 布局 相关的内容请参考：[Layout](/zh/DevManual/Reference/Front-EndFramework/Widget/layout.md)

更多关于 DSL 相关的内容请参考：[DSL](/zh/DevManual/Reference/Front-EndFramework/Widget/DSL.md)

:::

# 三、默认字段组件

在上面的 `DSL` 中，我们并没有指定 `widget` 属性，那么在这种情况下，Widget 框架将根据**字段元数据属性**获取对应的**默认组件**。下面列举了目前**表格**视图中用到的所有默认组件：

<table border="1" style="border-collapse: collapse; width: 100%; text-align: left;">
  <thead>
    <tr>
      <th style="padding: 8px;">字段类型</th>
      <th style="padding: 8px;">是否多值</th>
      <th style="padding: 8px;">默认组件</th>
      <th style="padding: 8px;">只读态 TypeScript Class</th>
      <th style="padding: 8px;">编辑态 TypeScript Class</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2" style="padding: 8px; vertical-align: top;">文本（STRING）</td>
      <td style="padding: 8px;">否</td>
      <td style="padding: 8px;">文本（Input）</td>
      <td style="padding: 8px;">TableStringFieldWidget</td>
      <td style="padding: 8px;">FormStringInputFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">是</td>
      <td style="padding: 8px;">标签（Tag）</td>
      <td style="padding: 8px;">TableStringTagFieldWidget</td>
      <td style="padding: 8px;">FormStringMultiTagFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">多行文本（TEXT）</td>
      <td style="padding: 8px;">否</td>
      <td style="padding: 8px;">多行文本（TextArea）</td>
      <td style="padding: 8px;">TableTextFieldWidget</td>
      <td style="padding: 8px;">TableEditorTextFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">富文本（HTML）</td>
      <td style="padding: 8px;">否</td>
      <td style="padding: 8px;">富文本（RichText）</td>
      <td style="padding: 8px;">TableHtmlRichTextFieldWidget</td>
      <td style="padding: 8px;">FormHtmlRichTextFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">手机（PHONE）</td>
      <td style="padding: 8px;">否</td>
      <td style="padding: 8px;">手机（Phone）</td>
      <td style="padding: 8px;">TableStringFieldWidget</td>
      <td style="padding: 8px;">FormPhoneFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">邮箱（EMAIL）</td>
      <td style="padding: 8px;">否</td>
      <td style="padding: 8px;">邮箱（Email）</td>
      <td style="padding: 8px;">TableStringFieldWidget</td>
      <td style="padding: 8px;">FormEmailFieldWidget</td>
    </tr>
    <tr>
      <td rowspan="2" style="padding: 8px; vertical-align: top;">整数（INTEGER）</td>
      <td style="padding: 8px;">否</td>
      <td style="padding: 8px;">整数（Integer）</td>
      <td style="padding: 8px;">TableNumberWidget</td>
      <td style="padding: 8px;">FormIntegerFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">是</td>
      <td style="padding: 8px;">标签（Tag）</td>
      <td style="padding: 8px;">TableMultiNumberWidget</td>
      <td style="padding: 8px;">FormIntegerTagFieldWidget</td>
    </tr>
    <tr>
      <td rowspan="2" style="padding: 8px; vertical-align: top;">浮点数（FLOAT）</td>
      <td style="padding: 8px;">否</td>
      <td style="padding: 8px;">数字（Float）</td>
      <td style="padding: 8px;">TableNumberWidget</td>
      <td style="padding: 8px;">FormFloatFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">是</td>
      <td style="padding: 8px;">标签（Tag）</td>
      <td style="padding: 8px;">TableMultiNumberWidget</td>
      <td style="padding: 8px;">-</td>
    </tr>
    <tr>
      <td style="padding: 8px;">金额（MONEY）</td>
      <td style="padding: 8px;">否</td>
      <td style="padding: 8px;">货币（Currency）</td>
      <td style="padding: 8px;">TableCurrencyFieldWidget</td>
      <td style="padding: 8px;">FormMoneyFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">布尔（BOOLEAN）</td>
      <td style="padding: 8px;">否</td>
      <td style="padding: 8px;">文本（是/否）</td>
      <td style="padding: 8px;">TableBooleanFieldWidget</td>
      <td style="padding: 8px;">FormBooleanSwitchFieldWidget</td>
    </tr>
    <tr>
      <td rowspan="2" style="padding: 8px; vertical-align: top;">枚举（ENUM）</td>
      <td style="padding: 8px;">否</td>
      <td style="padding: 8px;">下拉单选（Select）</td>
      <td style="padding: 8px;">TableEnumFieldWidget</td>
      <td style="padding: 8px;">FormEnumFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">是</td>
      <td style="padding: 8px;">下拉多选（Select）</td>
      <td style="padding: 8px;">TableEnumFieldWidget</td>
      <td style="padding: 8px;">FormEnumMultiSelectFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">日期时间（DATETIME）</td>
      <td style="padding: 8px;">否</td>
      <td style="padding: 8px;">日期时间（DateTimePicker）</td>
      <td style="padding: 8px;">TableDateTimeFieldWidget</td>
      <td style="padding: 8px;">FormDateTimeFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">日期（DATE）</td>
      <td style="padding: 8px;">否</td>
      <td style="padding: 8px;">日期（DatePicker）</td>
      <td style="padding: 8px;">TableDateFieldWidget</td>
      <td style="padding: 8px;">FormDateFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">时间（TIME）</td>
      <td style="padding: 8px;">否</td>
      <td style="padding: 8px;">时间（TimePicker）</td>
      <td style="padding: 8px;">TableTimeFieldWidget</td>
      <td style="padding: 8px;">FormTimeFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">年份（YEAR）</td>
      <td style="padding: 8px;">否</td>
      <td style="padding: 8px;">年份（YearPicker）</td>
      <td style="padding: 8px;">TableYearFieldWidget</td>
      <td style="padding: 8px;">FormYearFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">键值对（MAP）</td>
      <td style="padding: 8px;">否</td>
      <td style="padding: 8px;">键值对（Map）</td>
      <td style="padding: 8px;">TableMapFieldWidget</td>
      <td style="padding: 8px;">FormMapFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">多对一（M2O）</td>
      <td style="padding: 8px;">否</td>
      <td style="padding: 8px;">下拉单选（Select）</td>
      <td style="padding: 8px;">TableM2OFieldWidget</td>
      <td style="padding: 8px;">FormM2OSelectFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">一对多（O2M）</td>
      <td style="padding: 8px;">是</td>
      <td style="padding: 8px;">下拉多选（Select）</td>
      <td style="padding: 8px;">TableO2MFieldWidget</td>
      <td style="padding: 8px;">FormO2MSelectFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">多对多（M2M）</td>
      <td style="padding: 8px;">是</td>
      <td style="padding: 8px;">下拉多选（Select）</td>
      <td style="padding: 8px;">TableM2MFieldWidget</td>
      <td style="padding: 8px;">FormM2MFieldSelectWidget</td>
    </tr>
  </tbody>
</table>



# 四、可选字段组件

针对每一种字段类型，除了上述对应的默认组件外，还有一些组件是通过指定 `widget` 属性进行使用的。下面列举了目前**表格**视图中现有的字段组件：

<table border="1" style="border-collapse: collapse; width: 100%; text-align: left;">
  <thead>
    <tr>
      <th style="padding: 8px;">字段类型</th>
      <th style="padding: 8px;">是否多值</th>
      <th style="padding: 8px;">组件</th>
      <th style="padding: 8px;">只读态 TypeScript Class</th>
      <th style="padding: 8px;">编辑态 TypeScript Class</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="7" style="padding: 8px; vertical-align: top;">文本（STRING）</td>
      <td rowspan="5" style="padding: 8px; vertical-align: top;">否</td>
      <td style="padding: 8px;">颜色（ColorPicker）</td>
      <td style="padding: 8px;">TableStringColorPickerFieldWidget</td>
      <td style="padding: 8px;">FormStringColorPickerFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">文件（Upload）</td>
      <td style="padding: 8px;">TableStringUploadWidget</td>
      <td style="padding: 8px;">FormStringUploadFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">图片（UploadImg）</td>
      <td style="padding: 8px;">TableStringUploadImageFieldWidget</td>
      <td style="padding: 8px;">FormStringUploadImgFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">超链接（Hyperlinks）</td>
      <td style="padding: 8px;">TableStringHyperlinksFieldWidget</td>
      <td style="padding: 8px;">FormStringHyperlinksFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">多媒体播放器（MediaPlayer）</td>
      <td style="padding: 8px;">TableStringMediaPlayerFieldWidget</td>
      <td style="padding: 8px;">FormStringMediaPlayerFieldWidget</td>
    </tr>
    <tr>
      <td rowspan="2" style="padding: 8px; vertical-align: top;">是</td>
      <td style="padding: 8px;">文件（Upload）</td>
      <td style="padding: 8px;">TableStringMultiUploadWidget</td>
      <td style="padding: 8px;">FormStringUploadFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">图片（UploadImg）</td>
      <td style="padding: 8px;">TableStringMultiUploadImageFieldWidget</td>
      <td style="padding: 8px;">FormStringUploadImgFieldWidget</td>
    </tr>
    <tr>
      <td rowspan="2" style="padding: 8px; vertical-align: top;">多行文本（TEXT）</td>
      <td rowspan="2" style="padding: 8px; vertical-align: top;">否</td>
      <td style="padding: 8px;">文件（Upload）</td>
      <td style="padding: 8px;">TableStringMultiUploadWidget</td>
      <td style="padding: 8px;">FormStringUploadFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">图片（UploadImg）</td>
      <td style="padding: 8px;">TableStringMultiUploadImageFieldWidget</td>
      <td style="padding: 8px;">FormStringUploadImgFieldWidget</td>
    </tr>
    <tr>
      <td rowspan="3" style="padding: 8px; vertical-align: top;">布尔（BOOLEAN）</td>
      <td rowspan="3" style="padding: 8px; vertical-align: top;">否</td>
      <td style="padding: 8px;">开关（Switch）</td>
      <td style="padding: 8px;">TableBooleanSwitchFieldWidget</td>
      <td style="padding: 8px;">FormBooleanSwitchFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">下拉单选（Select）</td>
      <td style="padding: 8px;">TableBooleanSelectFieldWidget</td>
      <td style="padding: 8px;">FormBooleanSelectFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">单选框（Radio）</td>
      <td style="padding: 8px;">TableBooleanRadioFieldWidget</td>
      <td style="padding: 8px;">FormBooleanRadioFieldWidget</td>
    </tr>
    <tr>
      <td rowspan="2" style="padding: 8px; vertical-align: top;">枚举（ENUM）</td>
      <td style="padding: 8px;">否</td>
      <td style="padding: 8px;">单选框（Radio）</td>
      <td style="padding: 8px;">TableEnumFieldWidget</td>
      <td style="padding: 8px;">FormEnumRadioWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">是</td>
      <td style="padding: 8px;">多选框（Checkbox）</td>
      <td style="padding: 8px;">TableEnumFieldWidget</td>
      <td style="padding: 8px;">FormEnumMultiCheckboxFieldWidget</td>
    </tr>
    <tr>
      <td rowspan="2" style="padding: 8px; vertical-align: top;">多对一（M2O）</td>
      <td rowspan="2" style="padding: 8px; vertical-align: top;">否</td>
      <td style="padding: 8px;">树选择（TreeSelect）</td>
      <td style="padding: 8px;">TableM2OFieldWidget</td>
      <td style="padding: 8px;">FormM2OTreeSelectFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">级联选择（Cascader）</td>
      <td style="padding: 8px;">TableM2OFieldWidget</td>
      <td style="padding: 8px;">FormM2OCascaderFieldWidget</td>
    </tr>
    <tr>
      <td rowspan="2" style="padding: 8px; vertical-align: top;">一对多（O2M）</td>
      <td rowspan="2" style="padding: 8px; vertical-align: top;">是</td>
      <td style="padding: 8px;">树选择（TreeSelect）</td>
      <td style="padding: 8px;">TableO2MFieldWidget</td>
      <td style="padding: 8px;">FormO2MTreeSelectFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">级联选择（Cascader）</td>
      <td style="padding: 8px;">TableO2MFieldWidget</td>
      <td style="padding: 8px;">FormO2MCascaderFieldWidget</td>
    </tr>
    <tr>
      <td rowspan="2" style="padding: 8px; vertical-align: top;">多对多（M2M）</td>
      <td rowspan="2" style="padding: 8px; vertical-align: top;">是</td>
      <td style="padding: 8px;">树选择（TreeSelect）</td>
      <td style="padding: 8px;">TableM2MFieldWidget</td>
      <td style="padding: 8px;">FormM2MTreeSelectFieldWidget</td>
    </tr>
    <tr>
      <td style="padding: 8px;">级联选择（Cascader）</td>
      <td style="padding: 8px;">TableM2MFieldWidget</td>
      <td style="padding: 8px;">FormM2MCascaderFieldWidget</td>
    </tr>
  </tbody>
</table>


# 五、DSL 属性配置

## （一）表格属性配置

```xml
<element widget="Table">
    ......
</element>
```

### 1、外观属性

+ emptyText：空数据提示文本（`string`）
+ emptyImage：空数据提示图片（`url`）
+ height：高度（`string | number`）
+ minHeight：最小高度（`string | number`）
+ maxHeight：最大高度（`string | number`）
+ lineHeight：行高（`number`）
+ minLineHeight：最小行高（`number`）
+ autoLineHeight：自动行高（`boolean`）
+ activeCount：行内动作数量（`number`）
+ operatorColumnDirection：操作列动作排列方向（`'horizontal' | 'vertical'`）
+ operatorColumnWidth：操作列宽度（`string | number`）
+ operatorColumnButtonType：操作列动作类型（`ButtonType`）
+ usingSimpleUserPrefer：使用简易风格用户偏好（`boolean`）

### 2、控制属性

#### 交互属性

+ sortable：允许排序（`boolean`）
+ ordering：排序规则（`string`）`eg：'field1 asc, field2 desc'`
+ showPagination：显示分页（`boolean`）
+ paginationStyle：分页样式（`'STANDARD' | 'SIMPLE'`）
+ pageSizeOptions：分页数可选项（`number[]`）`eg：'10,15,30,50,100,200'`
+ defaultPageSize：默认分页数，应出现在分页数可选项中（`number`）
+ filter：不可视过滤条件（`rsql`）
+ domain：可视过滤条件（`rsql`）
+ load：加载函数函数编码， `FunctionDefinition#fun`（`string`）
+ selectMode：选择模式，需配合对应列类型使用（`'checkbox' | 'radio'`）

#### 行内编辑

+ editable：允许行内编辑（`boolean`）
+ editorTrigger：行内编辑触发方式（`'manual' | 'click' | 'dblclick'`）
+ editorMode：行内编辑模式（`'row' | 'cell'`）
+ editorCloseTrigger：行内编辑关闭触发方式（`'manual' | 'auto'`）
+ editorShowIcon：表头是否显示可编辑图标（`boolean`）
+ rowEditorCreateFun：行内编辑创建函数函数编码， `FunctionDefinition#fun`（`string`）
+ rowEditorUpdateFun：行内编辑更新函数函数编码， `FunctionDefinition#fun`（`string`）

#### 统计

+ showFooter：显示表尾统计行，需配合字段统计属性使用（`boolean`）
+ statisticsLabel：表尾统计标题文本（`string`）
+ emptyStatisticsText：空统计内容（`string`）
+ statisticsFun：指定服务端统计函数函数编码， `FunctionDefinition#fun`（`string`）
+ refreshRemoteStatistics：搜索或分页时刷新统计行数据（`boolean`）

#### 展开行

（需配合展开列使用）

+ expandAccordion：展开行使用手风琴模式（`boolean`）
+ expandAll：展开行首次加载时是否全部展开（`boolean`）
+ expandOperationField：指定展开行展开图标所在字段名（`string`）

#### 行点击

+ allowRowClick：启用行点击（`boolean`）
+ rowClickMode：行点击模式（`('click' | dblclick)[]`）`eg：'click,dblclick'`
+ rowClickActionName：指定单击行动作名称，需配合 `click` 插槽配置 `action` 标签使用（`string`）
+ rowDblClickActionName：指定双击行动作名称，需配合 `click` 插槽配置 `action` 标签使用（`string`）

#### 树形表格

+ enabledTreeConfig：启用树形表格（`boolean`）
+ treeRelationField：树形表格关联字段（`string`）
+ treeExpandAll：树形表格首次加载时是否展开全部（`boolean`）
+ treeLazy：树形表格启用懒加载（`boolean`）
+ treeHasChildField：树形表格判断是否有子节点的字段名（`string`）`eg：hasChild`
+ expandTreeField：指定树形表格展开图标所在字段名（`string`）

## （二）通用列属性配置

+ label：标题（`string`）
+ columnType：列类型（`'checkbox' | 'radio' | 'seq' | 'expand'`）
+ width：宽度（`string | number`）
+ minWidth：最小宽度（`string | number`）
+ resizable：允许拖动调整列宽（`boolean`）
+ align：水平对齐方式（`'left' | 'center' | 'right'`）
+ headerAlign：表头对齐方式（`'left' | 'center' | 'right'`）
+ footerAlign：表尾对齐方式（`'left' | 'center' | 'right'`）
+ fixed：固定列（`'left' | 'right'`）
+ className：单元格附加 className（`string`）
+ headerClassName：表头单元格附加 className（`string`）
+ footerClassName：表尾单元格附加 className（`string`）

## （三）功能列属性配置

### 1、复选框列（checkbox）

```xml
<element widget="Table" checkbox="false">
    <element widget="checkbox-column" />
</element>
```

继承自 [通用列属性配置](/zh/DevManual/Reference/UserInterface/ViewArchitectures/README.md)，`columnType` 固定为 `checkbox`。

:::warning 提示

由于历史原因，表格上 `checkbox` 属性在之前的设计中会自动追加复选框列，在 DSL 中显式声明复选框列时，需要将 `checkbox` 属性设置为 `false`，否则会出现多个复选框列。

:::

### 2、单选框列（radio）

```xml
<element widget="Table" checkbox="false">
    <element widget="radio-column" />
</element>
```

继承自 [通用列属性配置](/zh/DevManual/Reference/UserInterface/ViewArchitectures/README.md)，`columnType` 固定为 `radio`。

### 3、序号列（seq）

```xml
<element widget="sequence-column" />
```

继承自 [通用列属性配置](/zh/DevManual/Reference/UserInterface/ViewArchitectures/README.md)，`columnType` 固定为 `seq`。

### 4、操作列（operation）

```xml
<element widget="operation-column" />
```

继承自 [通用列属性配置](/zh/DevManual/Reference/UserInterface/ViewArchitectures/README.md)

:::warning 提示

默认布局提供的 `rowActions` 实际上与上述提到的 `operation-column` 找到的 `TypeScript Class` 都是 `TableOperationColumnWidget` 组件。`rowActions` 有计划将在未来高版本中移除。

:::

### 5、展开行列（expand）

```xml
<element widget="expand-column" />
```

继承自 [通用列属性配置](/zh/DevManual/Reference/UserInterface/ViewArchitectures/README.md)

#### 示例：展开行设置当前视图

使用 `fields` 和 `expandRow` 插槽进行配置：

```xml
<view type="TABLE" model="demo.DemoModel" name="demo_table_view">
	<template slot="fields">
		<field data="id" invisible="true" />
		<field data="code" />
		<field data="name" />
	</template>
	<template slot="expandRow">
		<view type="DETAIL">
			<template slot="fields">
				<field data="id" invisible="true" />
				<field data="code" />
				<field data="name" />
			</template>
		</view>
	</template>
</view>
```

使用 `table` 和 `expandRow` 插槽进行配置：

```xml
<view type="TABLE" model="demo.DemoModel" name="demo_table_view">
	<template slot="table">
		<template slot="expandRow">
			<view type="DETAIL">
				<template slot="fields">
					<field data="id" invisible="true" />
					<field data="code" />
					<field data="name" />
				</template>
			</view>
		</template>
		<field data="id" invisible="true" />
		<field data="code" />
		<field data="name" />
	</template>
</view>

```

:::warning 提示

这两种方式最终渲染的结果是完全相同的，对布局和 DSL 插槽不熟悉的读者可参考：[DSL](/zh/DevManual/Reference/Front-EndFramework/Widget/DSL.md)

:::

#### 示例：展开行设置关联模型

使用**多对一字段**配置展开行视图时，只能配置**表单或详情**这类使用对象（Object）数据结构的视图类型。这样展开行视图就会自动通过多对一字段的关联关系发起 `queryOne` 查询。如下所示：

```xml
<view type="TABLE" model="demo.DemoModel" name="demo_table_view">
	<template slot="table" expandOperationField="code">
		<template slot="expandRow" />
		<field data="id" invisible="true" />
		<field data="code" />
		<field data="name" />
		<field data="m2o">
			<view type="DETAIL">
				<template slot="fields">
					<field data="id" invisible="true" />
					<field data="code" />
					<field data="name" />
				</template>
			</view>
		</field>
	</template>
</view>
```

使用**一对多字段**配置展开行视图时，只能配置**表格**这类使用列表（List）数据结构的视图类型。这样展开行视图就会自动通过一对多字段的关联关系发起 `queryPage` 查询。如下所示：

```xml
<view type="TABLE" model="demo.DemoModel" name="demo_table_view">
	<template slot="table" expandOperationField="code">
		<template slot="expandRow" />
		<field data="id" invisible="true" />
		<field data="code" />
		<field data="name" />
		<field data="o2m">
			<view type="TABLE">
				<template slot="fields">
					<field data="id" invisible="true" />
					<field data="code" />
					<field data="name" />
				</template>
			</view>
		</field>
	</template>
</view>
```

:::warning 提示

在这两个示例中，我们使用了 `expandOperationField` 属性来配置展开行展开图标所在字段名，由于我们使用了 `table` 插槽，因此还需要保留 `expandRow` 插槽用来保证展开行组件在合并布局和 DSL 后还可以正常运行。

:::

## （四）字段通用属性配置

### 1、外观属性

+ label：标题（`string`）
+ width：宽度（`string | number`）
+ minWidth：最小宽度（`string | number`）
+ resizable：允许拖动调整列宽（`boolean`）
+ align：水平对齐方式（`'left' | 'center' | 'right'`）
+ headerAlign：表头对齐方式（`'left' | 'center' | 'right'`）
+ footerAlign：表尾对齐方式（`'left' | 'center' | 'right'`）
+ fixed：固定列（`'left' | 'right'`）
+ className：单元格附加 className（`string`）
+ headerClassName：表头单元格附加 className（`string`）
+ footerClassName：表尾单元格附加 className（`string`）

### 2、控制属性

#### 只读态控制属性

+ sortable：允许排序（`boolean`）
+ invisible：列隐藏（`boolean | expression`）
+ invisibleContent：单元格内容隐藏（`boolean | expression`）
+ enableClick：启用单元格内容点击功能（`boolean`）
+ clickMethod：单元格内容点击方式（`'click' | 'dblclick'`）
+ clickActionName：指定单元格内容点击的行内动作名称（`string`）

#### 编辑态控制属性

+ editable：允许行内编辑（`boolean`）
+ required：必填（`boolean | expression`）
+ editorConfirm：二次确认文本内容（`string`）
+ editorConfirmType：二次确认类型（`'popper' | 'modal'`）
+ editorConfirmPosition：二次确认弹出气泡位置（`PopconfirmPlacement`）
+ editorEnterText：二次确认【确定】按钮文本（`string`）
+ editorCancelText：二次确认【取消】按钮文本（`string`）

## （五）字段组件属性配置

### 1、文本（STRING）

#### TableStringFieldWidget

```xml
<field data="stringField" />
```

+ type：字符串类型（`'text' | 'password'`）

#### TableStringColorPickerFieldWidget

```xml
<field data="stringField" widget="ColorPicker" />
```

#### TableStringUploadWidget

```xml
<field data="stringField" widget="Upload" />
```

+ cdnKey：指定上传 cdnKey，配合后端 OSS 配置使用（`string`）
+ privateLink：使用后端上传/下载文件，当 OSS 无法通过客户端直传时使用（`boolean`）

#### TableStringUploadImageFieldWidget

```xml
<field data="stringField" widget="UploadImg" />
```

#### TableStringHyperlinksFieldWidget

```xml
<field data="stringField" widget="Hyperlinks" />
```

+ target：链接打开方式（`'OPEN_WINDOW' | 'ROUTER'`）
+ text：链接显示文本（`string`）
+ defaultValue：链接显示默认文本（`string`）

#### TableStringMediaPlayerFieldWidget

```xml
<field data="stringField" widget="MediaPlayer" />
```

#### TableStringTagFieldWidget

```xml
<field data="stringMultiField" />
```

#### TableStringMultiUploadWidget

```xml
<field data="stringMultiField" widget="Upload" />
```

#### TableStringMultiUploadImageFieldWidget

```xml
<field data="stringMultiField" widget="UploadImg" />
```

### 2、多行文本（TEXT）

#### TableTextFieldWidget

```xml
<field data="textField" />
```

#### TableStringMultiUploadWidget

```xml
<field data="textMultiField" widget="Upload" />
```

#### TableStringMultiUploadImageFieldWidget

```xml
<field data="textMultiField" widget="UploadImg" />
```

### 3、富文本（HTML）

#### TableHtmlRichTextFieldWidget

```xml
<field data="htmlField" />
```

### 4、手机（PHONE）

#### TableStringFieldWidget

```xml
<field data="phoneField" />
```

### 5、邮箱（EMAIL）

#### TableStringFieldWidget

```xml
<field data="emailField" />
```

### 6、整数（INTEGER）

#### TableNumberWidget

```xml
<field data="integerField" />
```

+ showThousandth：显示千分位（`boolean | expression`）

#### TableMultiNumberWidget

```xml
<field data="integerMultiField" />
```

### 7、浮点数（FLOAT）

#### TableNumberWidget

```xml
<field data="floatField" />
```

+ showThousandth：显示千分位（`boolean | expression`）
+ decimal：小数位数（`number | expression`）

#### TableMultiNumberWidget

```xml
<field data="floatMultiField" />
```

### 8、金额（MONEY）

#### TableCurrencyFieldWidget

```xml
<field data="moneyField" />
```

### 9、布尔（BOOLEAN）

#### TableBooleanFieldWidget

```xml
<field data="booleanField" />
```

#### TableBooleanSwitchFieldWidget

```xml
<field data="booleanField" widget="Switch" />
```

+ truthyAction：切换为打开时执行的提交动作名称（`string`）
+ falsyAction：切换为关闭时执行的提交动作名称（`string`）

#### TableBooleanSelectFieldWidget

```xml
<field data="booleanField" widget="Select" />
```

+ optionColorStyle：可选项颜色样式（`'COLORFUL' | 'SIMPLICITY'`）
+ option.name：固定值（`'true' | 'false'`）
+ option.label：显示文本（`string`）
+ option.color：字体色（`color`）
+ option.backgroundColor：背景色（`color`）
+ option.borderColor：边框色（`color`）

**示例：可选项添加颜色配置**

```xml
<field data="booleanField" widget="Select">
  <options>
    <option name="true" label="是" color="#035dff" backgroundColor="#035dff1a" />
    <option name="false" label="否" color="#6dd400" backgroundColor="#6dd4001a" />
  </options>
</field>
```

#### TableBooleanRadioFieldWidget

```xml
<field data="booleanField" widget="Radio" />
```

+ optionColorStyle：可选项颜色样式（`'COLORFUL' | 'SIMPLICITY'`）
+ option.name：固定值（`'true' | 'false'`）
+ option.label：显示文本（`string`）
+ option.color：字体色（`color`）
+ option.backgroundColor：背景色（`color`）
+ option.borderColor：边框色（`color`）

### 10、枚举（ENUM）

#### TableEnumFieldWidget

```xml
<field data="enumField" />
```

+ optionColorStyle：可选项颜色样式（`'COLORFUL' | 'SIMPLICITY'`）
+ option.name：枚举名称（`string`）
+ option.label：显示文本（`string`）
+ option.color：字体色（`color`）
+ option.backgroundColor：背景色（`color`）
+ option.borderColor：边框色（`color`）

### 11、日期时间类

#### TableDateTimeFieldWidget

```xml
<field data="datetimeField" />
```

+ format：日期时间格式化文本（`string`）

#### TableDateFieldWidget

```xml
<field data="dateField" />
```

+ format：日期格式化文本（`string`）

#### TableTimeFieldWidget

```xml
<field data="timeField" />
```

+ format：时间格式化文本（`string`）

#### TableYearFieldWidget

```xml
<field data="yearField" />
```

+ format：年份格式化文本（`string`）

### 12、键值对（MAP）

#### TableMapFieldWidget

```xml
<field data="mapField" />
```

### 13、多对一（M2O）

#### TableM2OFieldWidget

```xml
<field data="m2oField" />
```

+ optionLabel：显示文本（`string | expression`）

### 14、一对多（O2M）

#### TableO2MFieldWidget

```xml
<field data="o2mField" />
```

+ optionLabel：显示文本（`string | expression`）
+ separator：分隔符，未配置 optionLabel 时拼接 labelFields 有效（`string`）

### 15、多对多（M2M）

#### TableM2MFieldWidget

```xml
<field data="m2mField" />
```

+ optionLabel：显示文本（`string | expression`）
+ separator：分隔符，未配置 optionLabel 时拼接 labelFields 有效（`string`）

## （六）复合列属性配置

### 1、TableDateTimeRangeFieldWidget

```xml
<element widget="DateTimeRangePicker">
  <field data="start" />
  <field data="end" />
</element>
```

+ separator：分隔符（`string`）

### 2、TableDateRangeFieldWidget

```xml
<element widget="DateRangePicker">
  <field data="start" />
  <field data="end" />
</element>
```

+ separator：分隔符（`string`）

### 3、TableTimeRangeFieldWidget

```xml
<element widget="TimeRangePicker">
  <field data="start" />
  <field data="end" />
</element>
```

+ separator：分隔符（`string`）

### 4、TableYearRangeFieldWidget

```xml
<element widget="YearRangePicker">
  <field data="start" />
  <field data="end" />
</element>
```

+ separator：分隔符（`string`）

