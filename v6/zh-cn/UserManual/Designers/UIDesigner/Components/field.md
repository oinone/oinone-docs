---
title: 字段
index: true
category:
  - 用户手册
  - 设计器
order: 2
---
# 一、通用属性
## 表单
+ 创建属性：同模型设计器创建字段，当创建一个字段类组件时，会在页面所在模型下新增一个对应的字段。
+ 标题：组件在当前页面的展示名称。
+ 隐藏标题：开启此选项后，组件的标题将被隐藏。
+ 占位提示：在输入框或选择框未填写内容时，显示的浅色提示文字，用于引导用户输入，但不会影响字段的实际值。
+ 描述说明：提供组件的描述信息，通常用于阐述字段的范围、注意事项等，帮助用户更好地理解和填写。对于字段类组件，描述说明将展示在组件的下方。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/tongyong1.png)

+ 默认值：在实际页面展示时，该字段将默认展示设定的值。若删除或更改字段，原默认值不会自动回填。
+ 计算公式：若计算值涉及变量，当变量变更时，计算值同步变化。

:::info 注意

若同时设置了默认值和计算公式，在实际页面中，默认值会先填入，后续字段值会根据计算函数变更

:::

:::warning 提示

有关计算公式中自定义表达式的填写，可以查看「自定义表达式」文档。

:::

+ 是否只读：设为只读，在实际页面中，字段可见，但不可编辑。若设置条件只读，则在符合条件时只读。
+ 是否禁用：设为禁用，在实际页面中，字段可见，但不可编辑。若设置条件禁用，则在符合条件时禁用。

:::warning 提示

一般为字段类组件设置是否只读，为动作型组件设置是否禁用。

:::

+ 是否隐藏：设为隐藏，在实际页面中，字段不可见，也不可编辑。若设置条件隐藏，则在符合条件时隐藏。在设计页面时，隐藏的组件仍会展示。
+ 是否必填：可以控制字段在当前页面是否必填，若设置为必填则会在标题前以*作为标识。若设置条件必填，则在符合条件时必填。
+ 数据校验：支持自定义校验规则，用于检验输入的数据是否符合设定的要求。

:::warning 提示

有关数据校验中自定义表达式的填写，可以查看「自定义表达式」文档。

:::

+ 校验未通过提示：当输入的数据未通过校验时，将显示相应的提示信息。
+ 提交数据：开关开启后，若当前字段变更，则根据提交函数，对提交方式所涵盖的数据范围进行变更
+ 清除数据：开关开启后，若当前字段变更，会清除所选字段范围。
+ 标题排列方式：即标题与其内容的排列，分为横向和纵向两种。
+ 宽度：即组件占所在行的大小
+ 显示设备：包括PC端、移动端与PAD端。

:::tip 举例

在设计PC端页面时，若组件的显示设备设置为仅移动端而未包含PC端，则在实际页面展示中，该组件及其所包含的其他组件均不会显示在PC端页面上。

:::

+ 显示清除按钮：开启此功能后，当输入框中有内容时，用户可一键清除已输入的内容。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/tongyong2.png)

## 表格
+ 标题：组件在当前页面的展示名称。
+ 计算公式：若计算值涉及变量，当变量变更时，计算值同步变化。
+ 是否隐藏：设为隐藏，在实际页面中，字段不可见，也不可编辑。若设置条件隐藏，则在符合条件时隐藏。在设计页面时，隐藏的组件仍会展示。
+ 行内编辑：启用后可在单元格中直接编辑字段内容。若设置条件启用，则在符合条件时支持编辑。
    - 是否必填：可以控制字段在当前页面是否必填，若设置为必填则会在标题前以*作为标识。若设置条件必填，则在符合条件时必填。
    - 数据校验：支持自定义校验规则，用于检验输入的数据是否符合设定的要求。
    - 校验未通过提示：当输入的数据未通过校验时，将显示相应的提示信息。
    - 二次确认：开启此功能后，在执行某一动作前，将弹出确认框进行二次确认。可自定义提示类型、方向、文字等弹框内容。
    - 支持前/后缀：支持为输入内容添加前后缀，前后缀类型可选择文字或图表。当选择文字类型时，可选择是否将前/后缀内容存储，以便在数据高度重合时简化操作流程。
+ 字段动作配置：启用此功能后，当点击字段数据时，即可执行预先配置好的动作。
    - 操作方式：即用于选择字段的操作方式，可选择单击或双击
    - 指定点击动作：可自定义点击字段时执行的具体动作，选择范围限定于当前表格行内已包含的动作选项。
+ 固定列宽：用于指定字段在表格中所在列的固定宽度。一旦设置了固定列宽，无论表格中包含多少列，该列的宽度都将保持恒定。
+ 最小列宽：用于设定字段在表格中所在列的最小宽度。当表格中的列宽度发生变化时，可缩小的最小值将受限于所设置的最小列宽。

:::info 注意

1. 若固定列宽的设置值小于最小列宽，则以最小列宽作为实际显示的列宽。
2. 手动调整表格列宽后，原先设置的固定列宽与最小列宽将不再有效。需通过表头设置恢复其默认值，方可使这些设置重新生效。

:::

+ 表头对齐方式：即表格中表头单元格内容的对齐方式，包括左对齐、居中对齐、右对齐。
+ 内容对齐方式：即表格中数据单元格内容的对齐方式，包括左对齐、居中对齐、右对齐。
+ 显示设备：包括PC端、移动端与PAD端。
+ 允许排序：启用此功能后，该字段所在列将显示排序图标，支持用户自定义选择升序或降序排序方式。

# 二、特有属性
## （一）单行文本
单行文本框，适用于记录名称、编码等简短文字内容。

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/danhang1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/danhang2.png)

:::

单行文本特有属性：

+ 创建属性
    - 字段业务类型：仅支持文本类型
+ 文本类型：包含文本与密码，默认为文本。若设置为文本，则输入时内容可见；若设置为密码，则输入时内容不可见。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/danhang3.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/danhang4.png)

+ 最大/小长度：可设定输入内容的长度范围，包括最大长度和最小长度，以限制用户输入。
+ 输入格式：提供多种输入格式限制选项，包括无限制、网址、身份证和自定义。选择自定义时，可通过正则表达式定义具体格式，并设置格式不符时的提示内容。
+ 是否支持前/后缀：支持为输入内容添加前后缀，前后缀类型可选择文字或图标。当选择文字类型时，可选择是否将前/后缀内容存储，以便在数据高度重合时简化操作流程。
+ 显示计数器：若用户需要关注输入内容的长度，可开启显示计数器功能，在输入时将实时看到当前内容的长度。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/danhang5.png)

## （二）多行文本
多行文本框，适用于记录意见、备注等较长文字内容。

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/duohang1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/duohang2.png)

:::

多行文本特有属性：

+ 创建属性
    - 字段业务类型：仅支持多行文本类型
+ 最大/小长度：可设定输入内容的长度范围，包括最大长度和最小长度，以限制用户输入。
+ 显示计数器：若用户需要关注输入内容的长度，可开启显示计数器功能，在输入时将实时看到当前内容的长度。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/duohang3.png)

## （三）富文本
一种可内嵌于浏览器的所见即所得文本编辑器，功能类似Word，适用于编辑篇幅较长的说明性文字，支持改变字体样式、插入图片等操作。

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/fuwenben1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/fuwenben2.png)

:::

富文本特有属性：

+ 创建属性
    - 字段业务类型：仅支持富文本类型
+ 高度：指组件在实际页面中展示的尺寸大小。

## （四）整数
仅允许输入整数，适用于输入天数、数量等整数型数据。

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/zhengshu1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/zhengshu2.png)

:::

整数特有属性：

+ 创建属性
    - 字段业务类型：仅支持整数类型
+ 最大/小值：可设定输入内容的值范围，包括最大值和最小值，以限制用户输入。
+ 是否支持前后缀：支持为输入内容添加前后缀，前后缀类型可选择文字或图标。当选择文字类型时，可选择是否将前/后缀内容存储，以便在数据高度重合时简化操作流程。
+ 显示千分位：开启此功能，当输入数值较大时，以千分位格式展示。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/zhengshu3.png)

## （五）小数
仅允许输入小数，适用于输入金额、温度等小数型数据。

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/xiaoshu1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/xiaoshu2.png)

:::

小数特有属性：

+ 创建属性
    - 字段业务类型：仅支持浮点数类型
    - 精度：限制小数的精度范围，其值需介于1至2之间。
+ 最大/小值：可设定输入内容的值范围，包括最大值和最小值，以限制用户输入。
+ 保留小数位数：其值需在创建组件时设置的精度范围内。
+ 是否支持前/后缀：支持为输入内容添加前后缀，前后缀类型可选择文字或图标。当选择文字类型时，可选择是否将前/后缀内容存储，以便在数据高度重合时简化操作流程。
+ 显示千分位：开启此功能，当输入数值较大时，以千分位格式展示。

## （六）下拉单选/表格下拉单选/弹窗单选
可从多个选项中下拉选择一个数据值，选项为可关联模型数据、数据字典或布尔型数据，适用于单一选择场景。

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/xldx1.png)

展示页面：  
标准下拉单选：
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/xldx2.gif)

表格下拉单选：
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/1765420449613-62a91cd6-4b1d-403c-850e-2141d4020aaf.gif)

弹窗单选：
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/1765420674694-0337bdeb-0d2d-4f52-aa00-4b915779aaeb.gif)

:::

下拉单选特有属性：

+ 创建属性
    - 字段业务类型：支持布尔型、数据字典、多对一

:::info 注意

+ 数据字典需选择已有数据字典
+ 多对一需设置关联模型
+ 表格下拉单选与弹窗单选仅支持多对一类型

:::

+ 选项类型：即创建时的字段业务类型，不可更改。
+ 自动填充数据字典可选项：当字段业务类型为数据字典时，显示该属性。若开启此选项，则在数据字典中增添字典项会同步更新。
+ 选项字段：当字段业务为多对一时，显示该属性。可选择特定字段作为选项值，当进行多选时，这些选项值将被拼接起来显示。默认选项字段为名称。

:::warning 提示

可以在选项字段之间设置常量内容作为间隔，如「-」、「/」等。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/xldx3.png)![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/xldx4.png)

:::

+ 搜索字段：当字段业务为多对一时，显示该属性。 用户在输入框中输入内容时，若所输入内容包含在搜索字段中，则这些包含内容的值将被作为搜索内容展示出来。默认情况下，所有选项字段均设为搜索字段，可根据需要选择是否使用已有的搜索条件。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/xldx5.png)

+ 透出字段：当字段业务为多对一时，显示该属性。选择范围限定为组件所绑定的模型字段，当某个字段被设定为透出字段时，即表示该字段可在当前视图中被选用。
+ 查询条件：当字段业务为多对一时，显示该属性。在实际页面展示中，会按照配置的查询条件展示数据。

:::warning 提示

有关查询条件中自定义表达式的填写，可以查看「自定义表达式」文档。

:::

+ 展示字段：可勾选关联模型中的字段，下拉展开时将以这些字段作为列展示在表格/弹窗中  
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/1765420289390-ef5f9181-8609-4c39-bc2b-eb51cf0b4bda.png)
+ 数据加载函数：当字段业务为多对一时，显示该属性。在实际页面中选择某一选项值时，将执行该函数加载数据。
+ 选项配置：当字段业务为布尔型或数据字典时，显示该属性。
    - 选中选项行后，直接拖动即可更改其排列位置。
    - 点击选项前的单选框，即可将该选项设置为下拉单选的默认值，实际页面展示时将直接显示此默认值。
    - 点击「编辑」图标，可修改该选项的显示值，使同一数据字典或布尔值在不同场景下均能适用。
    - 点击「隐藏/可见」，可控制该选项在运行时是否可见。所有字典项默认均为可见状态。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/xldx6.png)

## （七）下拉多选/表格下拉多选/弹窗多选
可从多个选项中下拉选择多个数据值，选项为可关联模型数据、数据字典或布尔型数据，适用于多重选择场景。

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/xlduox1.png)

展示页面：  
标准下拉多选
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/xlduox2.gif)

表格下拉多选
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/1765422303664-17e34588-43e1-42f0-9332-1cd4430c6177.gif)

弹窗多选
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/1765422641485-78c03988-320e-4be6-999c-f2afc2adf59b.gif)

:::

下拉多选特有属性：

+ 创建属性
    - 字段业务类型：支持数据字典、一对多、多对多

:::info 注意

+ 数据字典需选择已有数据字典
+ 一对多、多对多需设置关联模型
+ 表格下拉多选与弹窗多选仅支持一对多、多对多类型

:::

+ 选项类型：即创建时的字段业务类型，不可更改。
+ 自动填充数据字典可选项：当字段业务类型为数据字典时，显示该属性。若开启此选项，则在数据字典中增添字典项会同步更新。
+ 选项配置：当字段业务为数据字典时，显示该属性。
    - 选中选项行后，直接拖动即可更改其排列位置。
    - 点击选项前的单选框，即可将该选项设置为下拉单选的默认值，实际页面展示时将直接显示此默认值。
    - 点击「编辑」图标，可修改该选项的显示值，使同一数据字典或布尔值在不同场景下均能适用。
    - 点击「隐藏/可见」，可控制该选项在运行时是否可见。所有字典项默认均为可见状态。
+ 选项字段：当字段业务为一对多或多对多时，显示该属性。可选择特定字段作为选项值，当进行多选时，这些选项值将被拼接起来显示。默认选项字段为名称。

:::warning 提示

可以在选项字段之间设置常量内容作为间隔，如「-」、「/」等。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/xlduox3.png)![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/xlduox4.png)

:::

+ 搜索字段：当字段业务为一对多或多对多时，显示该属性。 用户在输入框中输入内容时，若所输入内容包含在搜索字段中，则这些包含内容的值将被作为搜索内容展示出来。默认情况下，所有选项字段均设为搜索字段，可根据需要选择是否使用已有的搜索条件。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/xlduox5.png)

+ 透出字段：当字段业务为一对多或多对多时，显示该属性。选择范围限定为组件所绑定的模型字段，当某个字段被设定为透出字段时，即表示该字段可在当前视图中被选用。
+ 查询条件：当字段业务为一对多或多对多时，显示该属性。在实际页面展示中，会按照配置的查询条件展示数据。

:::warning 提示

有关查询条件中自定义表达式的填写，可以查看「自定义表达式」文档。

:::

+ 展示字段：可勾选关联模型中的字段，下拉展开时将以这些字段作为列展示在表格/弹窗中
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/1765420289390-ef5f9181-8609-4c39-bc2b-eb51cf0b4bda-20251211152308988.png)
+ 数据加载函数：当字段业务为一对多或多对多时，显示该属性。在实际页面中选择某一选项值时，将执行该函数加载数据。
+ 最多/少选择个数：可限制选择个数范围，包括最多选择个数和最少选择个数，以限制用户输入。

## （八）单选框
在直接展示的选项中只能选择一个值，适用于如性别选择等单一选项场景。

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/dxk1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/dxk2.gif)

:::

单选框特有属性：

+ 创建属性
    - 字段业务类型：支持布尔型、数据字典、多对一

:::info 注意

+ 数据字典需选择已有数据字典
+ 多对一需设置关联模型

:::

+ 选项类型：即创建时的字段业务类型，不可更改。
+ 自动填充数据字典可选项：当字段业务类型为数据字典时，显示该属性。若开启此选项，则在数据字典中增添字典项会同步更新。
+ 选项字段：同下拉单选。
+ 透出字段：同下拉单选。
+ 查询条件：同下拉单选。
+ 数据加载函数：同下拉单选。
+ 样式：当字段业务为布尔型或数据字典时，显示该属性。提供两种显示样式供选择：默认样式与分段选择器。

:::info 注意

+ 当选用默认样式时，可根据实际需求设置选项排列方式，包括横向与纵向。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/dxk3.png)![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/dxk4.png)

+ 当选用分段选择器时，可根据实际需求设置单行最多显示的选项数量。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/dxk5.png)

:::

+ 选项配置：同下拉单选。

## （九）复选框
在直接展示的选项中可选择多个值，适用于如课程选择等多重选项场景。

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/fxk1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/fxk2.gif)

:::

复选框特有属性：

+ 创建属性
    - 字段业务类型：支持数据字典、一对多、多对多

:::info 注意

+ 数据字典需选择已有数据字典
+ 一对多、多对多需设置关联模型

:::

+ 选项类型：即创建时的字段业务类型，不可更改。
+ 自动填充数据字典可选项：当字段业务类型为数据字典时，显示该属性。若开启此选项，则在数据字典中增添字典项会同步更新。
+ 排列方式：同下拉多选。
+ 选项配置：同下拉多选。
+ 选项字段：同下拉多选。
+ 透出字段：同下拉多选。
+ 查询条件：同下拉多选。
+ 数据加载函数：同下拉多选。
+ 最多/少选择个数：同下拉多选。

## （十）开关
常用于在是/否两种对立选项中进行选择。

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/kg1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/kg2.gif)

:::

开关特有属性：

+ 创建属性
    - 字段业务类型：仅支持布尔型类型

## （十一）年份
提供年份选择器功能，适用于选择出生年份等需要指定年份的场景。

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/nf1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/nf2.gif)

:::

年份特有属性：

+ 创建属性
    - 字段业务类型：仅支持年份类型

## （十二）日期
提供年-月-日的选择器，适用于需要精确到日期的字段，如入职日期、出生日期等。

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/rq1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/rq2.gif)

:::

日期特有属性：

+ 创建属性
    - 字段业务类型：仅支持日期类型
+ 日期格式：提供多样化的日期格式选项，可根据实际需求选择合适的日期格式。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/rq3.png)

+ 起始日期：用于限定可选日期的最早开始时间。
+ 结束日期：用于限定可选日期的最晚结束时间。
+ 偏移量：可设置偏移量，使起始日期或结束日期相应地前进或后退指定时间。
+ 快捷选项：用于快速指定可选时间。

## （十三）日期时间
提供年-月-日、时-分-秒的全面选择器，适用于需要精确到具体时间的字段，如下单时间、发货时间等。

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/rqsj1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/rqsj2.gif)

:::

日期时间特有属性：

+ 创建属性
    - 字段业务类型：仅支持日期时间类型
+ 日期格式：提供多样化的日期格式选项，可根据实际需求选择合适的日期格式。
+ 时间格式：提供多样化的时间格式选项，可根据实际需求选择合适的时间格式。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/rqsj3.png)![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/rqsj4.png)

+ 起始日期：用于限定可选日期的最早开始时间。
+ 结束日期：用于限定可选日期的最晚结束时间。
+ 偏移量：可设置偏移量，使起始日期或结束日期相应地前进或后退指定时间。
+ 快捷选项：用于快速指定可选时间。

## （十四）时间
提供时-分-秒的选择器，适用于仅涉及时间而不涉及日期的字段，如提交时间、上班时间等。

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/sj1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/sj2gif)

:::

时间特有属性：

+ 创建属性
    - 字段业务类型：仅支持时间类型
+ 时间格式：提供多样化的时间格式选项，可根据实际需求选择合适的时间格式。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/sj3.png)

## （十五）颜色选择器
提供自定义颜色功能，适用于设置标签颜色、进行主题定制时选择所需色彩等场景。

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/ys1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/ys2.gif)

:::

颜色特有属性：

+ 创建属性
    - 文本字段业务类型：仅支持文本类型

## （十六）文件上传
支持上传多种格式的文件，包括文档、图片、视频等，适用于上传附件。

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/wj1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/wj2.gif)

:::

文件上传特有属性：

+ 创建属性
    - 字段业务类型：支持文本、多行文本、一对多、多对一、多对多

:::info 注意

当字段业务类型为一对多、多对一、多对多时，关联模型仅能关联文件

:::

+ 最大上传文件个数：当字段业务为一对多或多对多时，显示该属性。限制可上传文件的最大数量。
+ 最大上传文件体积：限制单个上传文件的大小。
+ 限制上传文件类型：限制文件的上传格式，支持图片、文档、音频、视频等多种类型，同时也提供自定义选项。在自定义时，需输入所支持文件的格式后缀。

:::info 注意

若设置了允许某个格式，则在选择文件的弹框中其他格式的文件无法选中。

:::

+ CDN配置：支持配置CDN。
+ 私有链接：可选择是否为私有链接。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/wj3.png)

## （十七）图片上传
支持上传图片文件，适用于上传示意图、照片、头像等场景。

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/tp1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/tp2.gif)

:::

:::warning 提示

当在上传图片时若显示链接长度过大，可在模型设计器中修改该组件字段的长度。

:::

图片特有属性：

+ 创建属性
    - 字段业务类型：支持文本、多行文本、一对多、多对一、多对多

:::info 注意

当字段业务类型为一对多、多对一、多对多时，关联模型仅能关联文件

:::

+ 最大上传图片个数：当字段业务为一对多或多对多时，显示该属性。限制可上传图片的最大数量。
+ 最大上传图片体积：限制单个上传图片的大小。
+ 限制上传文件类型：限制文件的上传格式，支持图片与自定义选项。在自定义时，需输入所支持文件的格式后缀。

:::info 注意

若设置了允许某个格式，则在选择文件的弹框中其他格式的文件无法选中。

:::

## （十八）标签
允许输入并保存多个值，适用于保存标记用户的标签。

:::info 注意

标签的值不允许重复

:::

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/bq1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/bq2.gif)

:::

标签特有属性：

+ 创建属性
    - 字段业务类型：支持整数、文本
    - 字段类型为存储字段时，还可为其设置数量限制与单值长度

:::info 注意

+ 数量限制：可存储标签的最大数量，其值不能小于1。
+ 单值长度：单个标签的长度，其值不能小于1。

:::

+ 数量限制：同创建属性中的数量限制，可存储标签的最大数量，其值不能小于1。

## （十九）级联选择
通过逐级选择来筛选和定位所需的数据，适用于地区选择、分类筛选等场景。

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/jl1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/jl2.gif)

:::

级联特有属性：

+ 创建属性
    - 字段业务类型：支持一对多、多对一、多对多
+ 设置联动关系：即组件中需展示的模型字段。
    - 模型：需展示字段所在模型。

    :::info 注意

    该模型需与创建级联组件时所选关联模型一致，否则无法构成完整联动关系。

    :::

    - 数据标题：即选项值名称，当进行多选时，这些数据将被拼接起来显示。默认选项字段为名称。

    :::warning 提示

    可以在选项字段之间设置常量内容作为间隔，如「-」、「/」等。

    :::

    - 筛选条件：在实际页面展示中，会按照配置的筛选条件展示数据。

    :::warning 提示

    有关筛选条件中自定义表达式的填写，可以查看「自定义表达式」文档。

    :::

    - 自关联关系字段：即所选模型中关联关系字段，且此字段的模型与所选模型一致。

    :::info 注意

    该关系字段是用于级联选择时设定层级的字段。

    :::

+ 最多/少选择个数：当字段业务类型为一对多或多对多时，显示该属性。可限制选择个数范围，包括最多选择个数和最少选择个数，以限制用户输入。
+ 选择即改变：若启用此功能，则在选择任意层级时均可作为结束点，即当选定某一项后，若该项下存在子级选项，则直接全部选中。若未开启此选项，则只能选择最末级的子选项。

:::info 注意

仅当字段业务类型为多对一时，该功能生效。选择时只能选择单值。

:::

+ 展示选择路径：当字段业务类型为一对多或多对多时，显示该属性。若启用此功能，则在选中某选项后，将展示其完整的选择路径。

:::info 注意

当字段业务为多对一时，自动启用此功能。

:::

## （二十）树选择
通过逐级选择来筛选和定位所需的数据，适用于地区选择、分类筛选等场景。

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/shu1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/shu2.gif)
:::

树选择特有属性：

+ 创建属性
    - 字段业务类型：支持一对多、多对一、多对多
+ 设置联动关系：即组件中需展示的模型字段。
    - 模型：需展示字段所在模型。
    - 数据标题：即选项值名称，当进行多选时，这些数据将被拼接起来显示。默认选项字段为名称。

    :::warning 提示

    可以在选项字段之间设置常量内容作为间隔，如「-」、「/」等。

    :::

    - 筛选条件：在实际页面展示中，会按照配置的筛选条件展示数据。

    :::warning 提示

    有关筛选条件中自定义表达式的填写，可以查看「自定义表达式」文档。

    :::

    - 自关联关系字段：即所选模型中关联关系字段，且此字段的模型与所选模型一致。
+ 最多/少选择个数：当字段业务类型为一对多或多对多时，显示该属性。可限制选择个数范围，包括最多选择个数和最少选择个数，以限制用户输入。

## （二十一）键值对
以清晰直观的方式展示结构化信息，非常适用于产品详情展示、用户配置选项设置等场景。

:::info 注意

字段不允许有重复的key

:::

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/jzd1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/jzd2.gif)

:::

键值对特有属性：

+ 创建属性
    - 字段业务类型：仅支持键值对。
    - 字段类型为存储字段时，还可为其设置数量限制、键长度与值长度。

:::info 注意

+ 数量限制：可存储标签的最大数量，其值不能小于1。
+ 键长度：限制键值的长度，其值不能小于1。
+ 值长度：限制值的长度，其值不能小于1。

:::

## （二十二）范围
支持为时间指定一段范围，便于在时间区间提示等场景中灵活应用。

:::info 注意

结束日期的选择必须位于开始日期之后。

:::

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/fw1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/fw2.gif)

:::

范围特有属性：

+ 创建属性
    - 字段业务类型：支持年份、日期、日期时间、时间。
+ 起始占位提示：起始时间输入框或选择框未填写内容时，显示的浅色提示文字，用于引导用户输入，但不会影响字段的实际值。
+ 结束占位提示：结束时间输入框或选择框未填写内容时，显示的浅色提示文字，用于引导用户输入，但不会影响字段的实际值。
+ 起始默认值：在实际页面展示时，该字段将默认展示设定的起始时间。
+ 结束默认值：在实际页面展示时，该字段将默认展示设定的结束时间。
+ 日期格式：当字段业务为日期或日期时间时，显示该属性。
+ 时间格式：当字段业务为日期时间或时间时，显示该属性。

## （二十三）手机
专用于存储或展示手机号码类型的数据。

:::info 注意

输入规则：以数字1开头，第二位数字范围是3～9,共是11位数字。

:::

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/phone1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/phone2gif)

:::

手机特有属性：

+ 创建属性
    - 字段业务类型：仅支持手机。
+ 支持前/后缀：支持为输入内容添加前后缀，前后缀类型可选择文字或图标。当选择文字类型时，可选择是否将前/后缀内容存储，以便在数据高度重合时简化操作流程。

## （二十四）货币
用于存储或展示金额类型的数据，允许输入整数或小数，小数位数需精确到两位以内。

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/hb1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/hb2.gif)

:::

货币特有属性：

+ 创建属性
    - 字段业务类型：仅支持金额
    - 字段类型为存储字段时，还可为其设置长度与精度。

:::info 注意

+ 长度：限制数值的长度范围，其值需大于等于1且小于等于15。
+ 精度：限制小数的精度范围，其值需大于等于1且小于等于6。

:::

+ 最大/小值：可设定输入内容的值范围，包括最大值和最小值，以限制用户输入。
+ 保留小数位数：其值需在创建组件时设置的精度范围内。
+ 支持前/后缀：支持为输入内容添加前后缀，前后缀类型可选择文字或图标。当选择文字类型时，可选择是否将前/后缀内容存储，以便在数据高度重合时简化操作流程。
+ 显示千分位：开启此功能，当输入数值较大时，以千分位格式展示。

## （二十五）邮箱
用于存储或展示符合邮箱格式（xx@xx.xx）的数据，方便用户进行信息交流和管理。

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/yx1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/yx2.gif)

:::

邮箱特有属性：

+ 创建属性
    - 字段业务类型：仅支持金额
    - 字段类型为存储字段时，还可为其设置长度

:::info 注意

+ 长度：限制数值的长度范围，其值需大于等于3且小于等于256。

:::

+ 支持前/后缀：支持为输入内容添加前后缀，前后缀类型可选择文字或图标。当选择文字类型时，可选择是否将前/后缀内容存储，以便在数据高度重合时简化操作流程。

## （二十六）他表字段
可以从关联关系字段中取出对应字段，并平铺在当前模型中的特殊字段。适用于生成复杂报表时引用相关表中数据信息。

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/tb1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/tb2.png)

:::

他表字段特有属性：

+ 创建属性
    - 字段业务类型：仅支持他表字段
    - 关联字段：即当前页面所在模型下的存在关联关系的字段。
    - 显示字段：选中关联字段所在模型下存在的字段。

## （二十七）段落
允许在页面中展示一段完整的文字内容，适用于对产品进行详细解释、说明或阐述等场景。

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/dl1.png)

展示页面：  

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/dl2.png)

:::

段落特有属性：

+ 文本：提供一个功能丰富的富文本编辑器，可输入并编辑内容。
+ 边框样式：支持为段落设置多样化的边框样式，包括无边框、实线边框、虚线边框三种样式。

## （二十八）嵌入网页
支持在页面中嵌入指定的网页，使用户在设计页面中即可直接访问和浏览其他网页内容。

:::tip 举例

设计示例：

静态：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/qrwy1.png)

动态：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/qrwy2.png)

展示页面：

静态：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/qrwy3.gif)

动态：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/qrwy4.gif)

:::

嵌入网页特有属性：

+ 创建属性
    - 字段业务类型：仅支持文本
+ 组件类型：包含动态与静态两种类型。动态组件在表单中为输入态，静态组件在表单中为只读态。

:::info 注意

+ 组件类型为动态时，支持设置可选前缀，包括http://、https://、ftp://、sftp://四种常用前缀。
+ 组件类型为静态时，输入网页链接，即可在实际页面中直接展示该链接对应的页面内容。若无法展示，请检查网页是否允许被嵌入。

:::

## （二十九）超链接
支持在页面中展示超链接，用户只需点击超链接即可轻松跳转至对应的页面，实现页面间的便捷导航。

:::tip 举例

设计示例：

静态：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/clj1.png)

动态：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/1750213786284-806d5bf9-abc6-4cdb-bebc-355162b76bf1.png)

展示页面：

静态：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/clj2.gif)

动态：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/1750214026006-b724a184-b4ae-429d-9d9c-a9af03e19d1e.gif)

:::

超链接特有属性：

+ 创建属性
    - 字段业务类型：仅支持文本
+ 组件类型：包含动态与静态两种类型。动态组件在表单中为输入态，静态组件在表单中为只读态。

:::info 注意

+ 组件类型为动态时，支持设置可选前缀，包括http://、https://、ftp://、sftp://四种常用前缀。
+ 组件类型为静态时，输入网页链接，即可在实际页面中展示链接，点击即可跳转至链接页面。
    - 链接：需输入有效的网页链接。
    - 链接文字：设置链接的展示文字。若未设置，默认直接展示网页链接。
    - 打开方式：包含当前窗口打开和新窗口打开两种方式。

:::

## （三十）穿梭框
穿梭框是一个左右分栏的选择框，左侧显示可选字段，右侧显示已选字段。可以通过穿梭框选择或取消字段，适用于选择展示字段等场景。

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/csk1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/csk2.gif)

:::

穿梭框特有属性：

+ 创建属性
    - 字段业务类型：支持一对多与多对多
    - 关联模型：需设置当前组件的关联模型
+ 选项类型：即创建时的指定的关联模型字段，不可更改。
+ 选项字段：可选择特定字段作为选项值，当进行多选时，这些选项值将被拼接起来显示。默认选项字段为名称。
+ 搜索字段： 用户在输入框中输入内容时，若所输入内容包含在搜索字段中，则这些包含内容的值将被作为搜索内容展示出来。默认情况下，所有选项字段均设为搜索字段，可根据需要选择是否使用已有的搜索条件。
+ 透出字段：选择范围限定为组件所绑定的模型字段，当某个字段被设定为透出字段时，即表示该字段可在当前视图中被选用。
+ 查询条件：在实际页面中，会按照配置的查询条件展示数据。

:::warning 提示

有关查询条件中自定义表达式的填写，可以查看「自定义表达式」文档。

:::

+ 选项框展示形式：提供列表与表格两种展示方式。当选择表格展示时，可进一步设置选项框字段定义，即定义表格的表头内容。
+ 结果框展示形式：同选项框展示形式。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/csk3.png)

+ 最多/少选择个数：可限制选择个数范围，包括最多选择个数和最少选择个数，以限制用户输入。

## （三十一）公司
提供快捷方式，可直接选择在系统已录入的公司。

:::info 注意

+ 创建的字段业务类型多对一时，实际应用中为下拉单选。
+ 创建的字段业务类型多对多时，实际应用中为下拉多选。

:::

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/gs1.png)

:::

公司特有属性：

+ 创建属性
    - 字段业务类型：支持多对一与多对多。
    - 关联模型：需设置当前组件的关联模型，该组件仅支持关联“公司”模型
- 下拉样式：支持两种下拉展示样式：精简样式 与 详细样式。
  - 精简样式：以更紧凑的方式展示公司信息，适用于空间有限或只需要快速选择公司的场景。
  - 详细样式：提供更多维度的信息，适用于选择公司时需了解更多背景信息的场景。
  ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/1765363997364-3d03203f-dcca-4702-a6c0-c7c6ec3fed3c.png)
+ 最多/少选择个数：可限制选择个数范围，包括最多选择个数和最少选择个数，以限制用户输入。

## （三十二）部门
在使用部门组件时，系统会根据当前登录用户自动识别相关组织信息，并根据配置的部门范围展示可选部门

:::info 注意

+ 创建的字段业务类型多对一时，实际应用中为下拉单选。
+ 创建的字段业务类型多对多时，实际应用中为下拉多选。

:::

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/1765364697825-5f96bc3a-415f-4abd-bba6-a767387698f1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/1765364767620-b63184c5-a639-4dae-a7f1-78d91ed3b11e.png)

:::

部门特有属性：

+ 创建属性
    - 字段业务类型：支持多对一与多对多。
    - 关联模型：需设置当前组件的关联模型，该组件仅支持关联“部门”模型
- 可选范围：包括全部部门与自定义，未手动勾选指定部门则为全部部门
  - 全部部门：可选择系统内全部已创建的部门。
  - 自定义：可手动勾选指定部门，提供快捷选项：
    * 当前用户所在公司的所有部门：当前用户绑定的所有员工身份所属的公司下的全部部门
    * 当前用户所在部门：当前用户绑定的所有员工身份所属的全部部门
    * 当前用户所在部门及下级部门：当前用户绑定的所有员工身份所属的全部部门及其所有子部门
+ 最多/少选择个数：可限制选择个数范围，包括最多选择个数和最少选择个数，以限制用户输入。

## （三十三）角色
在使用角色组件时，系统会根据当前登录用户自动识别相关信息，并根据配置的角色范围展示可选角色

:::info 注意

+ 创建的字段业务类型多对一时，实际应用中为下拉单选。
+ 创建的字段业务类型多对多时，实际应用中为下拉多选。

:::

:::tip 举例

+ 设计示例：  
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/1765365093274-7f6fb97c-4c1b-40d9-862d-7a29fe602807.png)
+ 展示页面：  
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/1765365138239-975b488b-97ae-4335-ae33-e1744c4131d3.png)
:::
角色特有属性：
+ 创建属性
  + 字段业务类型：支持多对一与多对多。
  + 关联模型：需设置当前组件的关联模型，该组件仅支持关联“角色”模型
+ 可选范围：包括全部部门与自定义，未手动勾选指定角色则为全部角色
  + 全部角色：可选择系统内全部已创建的角色。
  + 自定义：可手动勾选指定角色，提供快捷选项：
    + 当前用户所绑定角色：当前登录用户所绑定的所有角色
+ 最多/少选择个数：可限制选择个数范围，包括最多选择个数和最少选择个数，以限制用户输入。

## （三十四）员工
在使用员工组件时，系统会根据当前登录用户自动识别相关信息，并根据配置的员工范围展示员工

:::info 注意

+ 创建的字段业务类型多对一时，实际应用中为下拉单选。
+ 创建的字段业务类型多对多时，实际应用中为下拉多选。

:::

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/1765365605324-7752c1e2-1624-46a5-9bac-52040446365c.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/1765365605324-7752c1e2-1624-46a5-9bac-52040446365c.png)

:::

员工特有属性：

+ 创建属性
    - 字段业务类型：支持多对一与多对多。
    - 关联模型：需设置当前组件的关联模型，该组件仅支持关联“员工”模型
- 可选范围：包括全部员工与自定义，未手动勾选指定员工则为全部员工
  - 全部员工：可选择系统内全部已创建的员工。
  - 自定义：可手动勾选指定员工，提供快捷选项：
    * **当前用户所绑定员工**：指当前用户绑定的所有员工身份。
    * **当前用户所在部门中的员工**：指该员工所属部门内的所有员工。
    * **当前用户所在部门及下级部门中的员工**：指该员工所属部门及其所有子部门内的全部员工。
+ 最多/少选择个数：可限制选择个数范围，包括最多选择个数和最少选择个数，以限制用户输入。

## （三十五）地址
提供地址选择器功能，适用于选择家庭住址等场景。

:::info 注意

允许选择止于任何一层。

:::

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/dz1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/dz2.gif)

:::

地址特有功能：

+ 创建属性
    - 字段业务类型：支持多对一。
    - 关联模型：需设置当前组件的关联模型，该组件仅支持关联“地址”模型

## （三十六）表单
支持在页面中内嵌表单，适用于设计复杂页面，满足页面多样化需求。

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/bd1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/bd2.png)

:::

表单特有属性：

+ 创建属性
    - 字段业务类型：支持多对一。
    - 关联模型：需设置当前组件的关联模型
- 布局类型：提供两种表单布局格式：普通布局与 word 布局
  + 普通布局：  
    ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/1765366674096-3aa354fa-49b7-4406-8850-6df4b7ada136.png)

  + word 布局：  
    ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/1765366705144-93e94233-7450-4fca-97fa-a8918ebf4e83.png)

+ 空值展示样式：用于设定当表单中的某些字段值为空时的展示方式。

## （三十七）表格
支持在页面中内嵌表格，适用于展示列表或数据的场景。

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/bg1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/bg2.png)

:::

表格特有属性：

+ 创建属性
    - 字段业务类型：支持一对多和多对多。
    - 关联模型：需设置当前组件的关联模型
+ 一对多表格：可设置快捷操作，包括创建、编辑、删除、行内编辑、添加一行、快速填报。开启后会在表格中显示对应动作![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/1765360427623-bd85620e-3b20-4b1f-9a47-46b8be9b30bf.png)

:::info
快速填报：允许用户通过复制 Excel 内容或批量编辑方式，高效录入或更新子表数据。
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/%E5%8A%A8%E5%9B%BE.gif)

1. 模式说明

该功能包含“新增数据”与“编辑已有数据”两种模式，适用于多种字段类型，并会在录入时自动校验数据格式与字段规则。

+ 新增数据模式：适用于批量导入数据：
  - 可将 Excel 内容直接粘贴到填报区域。
  - 粘贴的数据将以追加方式写入子表中对应字段。
  - 仅展示 **支持粘贴** 且 **开启行内编辑** 的字段列。
  - 若粘贴过程中包含空行，提交时会自动过滤并忽略空行。
+ 编辑已有数据模式：适用于快速修改子表中已有的数据：
  - 可直接对已有值进行批量编辑或粘贴替换。
  - 对于仅可见但不可编辑的字段，会在填报页面显示为灰色，不可修改；粘贴数据时会**自动跳过这些字段**，对应列的数据会被舍弃。

 2. 字段列选择

填报页支持在表头通过下拉方式选择字段：

+ 可选择子表模型中支持的其他字段。
+ 每个字段列可设置为 **“不粘贴”**，表示粘贴内容不会写入该列。

注意：未设置为“不粘贴”的字段列不能重复。若通过调整字段出现重复，系统会自动将原字段列改为“不粘贴”。

3. 数据填报

系统会依据表头字段的类型对粘贴数据进行判断：

+ 当数据格式不符合字段类型时，系统会标红提示。
+ 若用户未更正并选择“继续填报”，系统将自动清空不符合格式的数据，并以空值写入子表。
+ 提交数据时，若子表中存在依赖当前字段的计算公式，系统将自动根据用户填写的数据计算并回填其他字段的结果。

4. 特殊字段：

+ 下拉选择：通过“选项字段”判断填报值是否合法；若填报值不在可选范围内，会标红提示并显示下拉组件供用户选择正确项
+ 日期与时间：系统会按字段设置的日期或时间格式进行回填
  - 日期支持以下格式识别：`2000/01/01`、`2000-01-01`、`2000.01.01`
  - 时间支持 `00:00:00` 格式。
+ 组织类字段（公司/部门/员工/角色）：若输入名称不在可选范围内或出现重名，会标红提示并提供组件以供选择正确值
+ 地址字段：填报时系统会将地址拆分为多个单元格（国家-省/州-市-区/县-街道）；系统会按顺序验证国家 → 省 → 市 → 区 → 街道是否符合真实地址数据

:::

+ 多对多表格：可设置快捷操作，包括添加、删除、行内删除。开启后会在表格中显示对应动作  
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/1765360107018-0dae0594-b8df-42f3-aedf-6eaaff763822.png)
+ 数据提交类型：指定数据提交时所采用的提交方式，当前仅支持全量提交。
+ 关联关系更新类型：当表格中的关联关系字段更新时数据的提交方式，包括全量提交与差量提交。

:::info 注意

+ 全量提交：提交全部数据。
+ 差量提交：仅提交有更新的数据。

:::
## （三十八）文件下载
支持将数据封装为一个文件进行下载，适用于批量获取数据进行后续分析。

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/wjxz1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/wjxz2.png)

:::

文件下载特有属性：

+ 下载提示文本前缀：用于在下载提示信息前面添加一段引导性或说明性文字。
+ 下载提示文本：下载提示信息的主体内容部分。可以在此输入具体告知用户的信息，明确下载内容。
+ 下载的文件名：用于指定下载文件在用户设备上保存时显示的文件名。

## （三十九）拖拽上传
用于把文件拖入指定区域完成上传，同样支持点击上传。

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/tzsc1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/tzsc2.png)

:::

拖拽上传特有属性：

+ 拖拽上传提示词：用于设置在拖拽上传区域显示的提示性文字。
+ 拖拽上传图标：支持选择合适的图标来展示在拖拽上传区域，起到视觉引导和美化作用
+ 展示所支持拓展名：开启时，会在拖拽上传区域展示该组件支持上传的文件扩展名

:::info 注意

此处展示的扩展名，为“限制上传文件类型”属性中所选文件格式的后缀。

:::

+ 最大上传文件个数：当字段业务为一对多或多对多时，显示该属性。限制可上传文件的最大数量。
+ 最大上传文件体积：限制单个上传文件的大小。
+ 限制上传文件类型：限制文件的上传格式，支持图片、文档、音频、视频等多种类型，同时也提供自定义选项。在自定义时，需输入所支持文件的格式后缀。

:::info 注意

若设置了允许某个格式，则在选择文件的弹框中其他格式的文件无法选中。

:::

+ CDN配置：支持配置CDN。
+ 私有链接：可选择是否为私有链接。

## （四十）手写签名
支持在网页上实现手写签名，适用于在线合同签署、电子表格签名等。

:::tip 举例

设计示例：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/sxqm1.png)

展示页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/field/sxqm2.gif)

:::

手写签名特有属性：

+ 是否展示清除按钮：开启时，手写签名组件界面会显示清除按钮，可点击该按钮清除已有的手写签名内容；关闭时，清除按钮不会出现在界面上 。
+ 清除按钮文字：用于设置清除按钮上显示的文本内容
+ 是否展示保存按钮：开启时，手写签名组件界面会呈现保存按钮，方便用户保存手写签名；关闭则不显示保存按钮。
+ 保存按钮文字：用来设定保存按钮上呈现的文字
+ 签字文字颜色：用于设置手写签名后，签名笔迹所呈现的颜色 。
+ 签名背景面板颜色：用于设置手写签名区域背景颜色
