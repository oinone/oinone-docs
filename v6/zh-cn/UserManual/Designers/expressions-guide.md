---
title: 表达式的使用说明
index: true
category:
  - 用户手册
  - 设计器
order: 8
prev:
  text: 接口日志
  link: /v6/zh-cn/UserManual/Designers/AIIntegratedDesigner/api-logs.md
next:
  text: 标准模块
  link: /v6/zh-cn/UserManual/StandardModules/README.md
---
为了更好地满足用户在实际场景中的多样化配置需求，Oinone平台在多处提供了自定义表达式的功能。当用户发现平台的默认设置无法满足其特定需求时，可以利用这些自定义表达式进行灵活调整，以实现更贴合自身业务逻辑的配置。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Instructions%20for%20using%20expressions/1.png)

自定义表达式为用户提供了三种模式供选择：快捷、高级以及源码

+ 快捷模式：适用于进行一些简单的变量配置，操作便捷，快速满足基本需求。
+ 高级模式：提供更多高级配置选项，满足用户复杂的业务逻辑需求。
+ 源码模式：允许用户直接编辑表达式源码，实现最高级别的自定义和灵活性。

自定义表达式在平台中发挥着广泛而重要的作用。如在界面设计器中，组件属性的计算公式、数据校验等环节均支持使用自定义表达式，以实现更灵活、更精准的配置。或在流程设计器中，一些节点所需的表达式也可以通过自定义方式来满足不同的业务逻辑需求。自定义表达式的广泛应用，极大地提升了平台的灵活性和可扩展性。

# 一、 快捷模式
快捷模式适用于进行一些简单的变量配置，能够快速满足基本需求。 在快捷模式中，可以选择当前能够获取到的数据变量，并为其添加各种函数或表达式。

+ 函数：平台内置了丰富的函数库，涵盖了数学函数、文本处理函数、正则表达式函数、时间日期函数等九大类型，为用户提供了强大的数据处理和操作能力。
+ 表达式：支持自定义数据或使用当前系统中能够获取到的数据变量

此外，系统还支持在函数或表达式之间配置多种计算效果，包括加减乘除等十余种运算方式，充分满足用户在不同场景下的计算需求。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Instructions%20for%20using%20expressions/kj1.png)

:::tip 举例

以界面设计器中计算公式为例，当前页面中利润=销售额-广告投入，所以选中“利润”字段，为其配置计算公式

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Instructions%20for%20using%20expressions/kj2.gif)

发布当前页面后查看效果

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Instructions%20for%20using%20expressions/kj3.gif)

:::

# 二、 高级模式
高级模式在快捷模式的基础上，提供了更多高级配置选项，满足用户复杂的业务逻辑需求。提供两种配置模式：代码模式与文字模式

+ 代码模式：展示函数或表达式的代码字段名称
+ 文字模式：展示函数或表达式的文字名称，同快捷模式

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Instructions%20for%20using%20expressions/gj1.gif)

:::info 注意

高级模式提供了生效行的选择功能，用户可以选择需要生效的配置所在行。若某行配置未被选中，则即使进行了配置，也不会实际生效。用户能够更灵活地控制配置的应用范围，满足复杂的业务需求。

:::

:::tip 举例

以界面设计器中计算公式为例，当前页面中预估市场利润=（销售额-广告投入）÷市场份额，所以选中“预估市场利润”字段，为其配置计算公式

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Instructions%20for%20using%20expressions/gj2.gif)

发布当前页面后查看效果

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Instructions%20for%20using%20expressions/gj3.gif)

:::

# 三、 源码模式
源码模式允许用户直接编辑表达式源码，实现最高级别的自定义和灵活性。

:::warning 提示

字段编码可在模型设计器中进行查看

:::

:::tip 举例


以界面设计器中计算公式为例，当前页面中利润=销售额-广告投入，在源码中进行代码编写

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Instructions%20for%20using%20expressions/ym1.gif)

发布当前页面后查看效果

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Instructions%20for%20using%20expressions/ym2.gif)

:::

# 四、 函数介绍
自定义表达式中提供了九大类型的函数，分别为数学函数、文本函数、正则函数、时间函数、集合函数、键值对函数、对象函数、上下文函数、逻辑函数

## （一）数学函数
| 函数 | 说明 |
| :---: | --- |
| <div style="width:100px;">相减差非负</div> | <div style="width:600px;">函数示例：NNZ_SUBTRACT(A,B)<br/>函数说明：A与B相减的绝对值</div> |
| 向上取整 | 函数示例: CEIL(number)<br/>函数说明: 对number向上取整 |
| 向下取整 | 函数示例: FLOOR(number)<br/>函数说明: 对number向下取整 |
| 取平均值 | 函数示例: AVG(collection)<br/>函数说明: 返回集合的平均值，参数collection为集合或数组 |
| 乘积 | 函数示例: MULTIPLY(A,B)<br/>函数说明: A与B相乘 |
| 相加 | 函数示例: ADD(A,B)<br/>函数说明: A与B相加 |
| 绝对值 | 函数示例: ABS(number)<br/>函数说明: 获取number的绝对值 |
| 四舍五入 | 函数示例: ROUND(number)<br/>函数说明: 对number四舍五入 |
| 相减 | 函数示例: SUBTRACT(A,B)<br/>函数说明: A与B相减 |
| 大写金额 | 函数示例: UPPER_MONEY(number)<br/>函数说明: 返回金额的大写，参数number为数值或数值类型的字符串 |
| 余弦 | 函数示例: COS(number)<br/>函数说明: 对number取余弦 |
| 圆周率 | 函数示例: PI() <br/>函数说明: 圆周率 |
| 计数 | 函数示例: COUNT(collection)<br/>函数说明: 返回集合的总数，参数collection为集合或数组 |
| 取余 | 函数示例: MOD(A,B)<br/>函数说明: A对B取余 |
| 取最大值 | 函数示例: MAX(collection) <br/>函数说明: 返回集合中的最大值，参数collection为集合或数组 |
| 取最小值 | 函数示例: MIN(collection) <br/>函数说明: 返回集合中的最小值，参数collection为集合或数组 |
| 相除 | 函数示例: DIVIDE(A,B)<br/>函数说明: A与B相除 |
| 平方根 | 函数示例: SQRT(number) <br/>函数说明: 对number平方根 |
| 正弦 | 函数示例: SIN(number)<br/>函数说明: 对number取正弦 |
| 求和 | 函数示例: SUM(collection)<br/>函数说明: 返回对集合的求和，参数collection为集合或数组 |
| 幂运算 | 函数示例: POW(number1,number2)<br/>函数说明: 返回number1的number2次幂 |
| 对数运算 | 函数示例: LOG(number1,number2)<br/>函数说明: 返回以number1为底的number2的对数 |


## （二）文本函数
| 函数 | 说明 |
| :---: | --- |
| 反序列化JSON字符串 | 函数示例: PARSE(text)<br/>函数说明: 将JSON文本字符串text反序列化为集合或者map |
| 替换字符串 | 函数示例: REPLACE(text,oldtext,newtext)<br/>函数说明: 使用文本字符串newtext替换文本字符串text中的文本字符串oldtext |
| 小写 | 函数示例: LOWER(text)<br/>函数说明: 小写文本字符串text，文本为空时，按照空字符串处理 |
| 包含 | 函数示例: CONTAINS(text,subtext)<br/>函数说明: 判断文本字符串text是否包含文本字符串subtext，文本text为空时，按照空字符串处理 |
| 大写 | 函数示例: UPPER(text)<br/>函数说明: 大写文本字符串text，文本为空时，按照空字符串处理 |
| 是否以指定字符串结束 | 函数示例: ENDS_WITH(text,start)<br/>函数说明: 判断文本字符串text是否以文本字符串end结束，文本为空时，按照空字符串处理 |
| 获取字符串长度 | 函数示例: LEN(text)<br/>函数说明: 获取文本字符串text的长度，文本为空时，按照空字符串处理 |
| 连接字符串 | 函数示例: JOIN(text,join)<br/>函数说明: 将文本字符串text连接文本字符串join，文本为空时，按照空字符串处理 |
| 是否以指定字符串开始 | 函数示例: STARTS_WITH(text,start)<br/>函数说明: 判断文本字符串text是否以文本字符串start开始，文本为空时，按照空字符串处理 |
| 是否为空字符串 | 函数示例: IS_BLANK(text)<br/>函数说明: 判断文本字符串text是否为空 |
| 将记录序列化为JSON字符串 | 函数示例: JSON(object)<br/>函数说明: 将记录object序列化为JSON字符串 |
| 过滤首尾空格 | 函数示例: TRIM(text)<br/>函数说明: 去掉文本字符串text中的首尾空格，文本为空时，返回空字符串 |
| 不包含 | 函数示例: NOT_CONTAINS(text,subtext)<br/>函数说明: 判断文本字符串text是否不包含文本字符串subtext，文本text为空时，按照空字符串处理 |  
| 从指定位置截取子字符串 | 函数示例: SUBSTRING(text,begin,end)<br/>函数说明: 从指定位置截取子字符串，返回从text中begin-end位置的子字符串 |
| 按分割符分割字符串为集合 | 函数示例: SPLIT(text,subtext)<br/>函数说明: 返回按subtext分割text的集合 |
| 返回子串首次出现的位置 | 函数示例: INDEXOF(text,subtext)<br/>函数说明: 返回subtext首次在text出现的位置 |

## （三）正则函数
| 函数 | 说明 |
| :---: | --- |
| 验证是否是中文格式 | 函数示例: CHECK_CHINESE(text)<br/>函数说明: 校验是否为中文文本 |
| 验证是否是两位小数 | 函数示例: CHECK_TWO_DIG(text)<br/>函数说明: 校验是否两位小数 |
| 强密码校验 | 函数示例: CHECK_PWD(text)<br/>函数说明: 判断密码是否满足强弱校验 |
| 校验用户名 | 函数示例: CHECK_USER_NAME(text)<br/>函数说明: 校验用户名是否正确 |
| 校验URL格式 | 函数示例: CHECK_URL(text)<br/>函数说明: 校验URL是否正确 |
| 校验邮箱的格式 | 函数示例: CHECK_EMAIL(text)<br/>函数说明: 校验邮箱是否正确 |
| 校验字符范围 | 函数示例：CHECK_SIZE_RANGE(text, min,max)<br/>函数说明：校验长度范围 |
| 校验手机号 | 函数示例: CHECK_PHONE(text)<br/>函数说明: 校验手机号是否正确 |
| 校验字符范围 | 函数示例: CHECK_SIZE(text, length)<br/>函数说明: 校验长度 |
| IP地址校验 | 函数示例: CHECK_IP(text)<br/>函数说明: 校验IP地址是否正确 |
| 校验字符范围 | 函数示例: CHECK_MIN_SIZE(text,n)<br/>函数说明: 至少输入n个字符 |
| 校验中国身份证格式 | 函数示例: CHECK_ID_CARD(text)<br/>函数说明: 校验身份证是否正确 |
| 校验数字格式 | 函数示例: CHECK_NUMBER(text)<br/>函数说明: 校验是否为纯数字 |
| 校验格式 | 函数示例: CHECK_ENG_NUM(text)<br/>函数说明: 只能包含英文和数字 |
| 正则匹配 | 函数示例: MATCHES(text,regex)<br/>函数说明: 校验字符串是否满足正则匹配，例如regex为[a-zA-Z][a-zA-Z0-9]*$，来校验text是否匹配 |
| 是否包含中文校验 | 函数示例: CHECK_CONTAINS_CHINESE(text)<br/>函数说明: 校验是否包含中文 |
| 校验编码 | 函数示例: CHECK_CODE(text)<br/>函数说明: 只能由英文、数字、下划线组成 |
| 校验整数格式 | 函数示例: CHECK_INTEGER(text)<br/>函数说明: 校验是否为整数 |
| 校验字符范围 | 函数示例: CHECK_MAX_SIZE(text,n)<br/>函数说明: 只能输入n个字符 |


## （四）时间函数
| 函数 | 说明 |
| :---: | --- |
| 时间相减（得到秒） | 函数示例：SUB_DATETIME_TO_SECOND(datetime1,datetime2)<br/>函数说明：两个时间相减，结果以秒表示 |
| 时间相减（得到：DD天HH时MM分SS秒） | 函数示例：SUB_DATETIME_TO_DDHHMMSS(datetime1,datetime2)<br/>函数说明：两个时间相减，结果以DD天HH时MM分SS秒表示 |
| 日期相隔天数 | 函数示例：COUNT_DAY（date1,date2）<br/>函数说明：返回两个日期相隔的天数 |
| 工作日加减天数（跳过周末） | 函数示例: ADD_WORK_DAY(date,days)<br/>函数说明: 将指定工作日加/减指定天数(跳过周末)，date为指定日期，days为指定天数，当为负数时在date上减去此天数 |
| 小于等于 | 函数示例：LESS_EQUA(datetime1,datetime2)<br/>函数说明：判断datetime1是否小于等于datetime2，返回布尔值 |
| 大于等于 | 函数示例：GREATER_EQUAL(datetime1,datetime2)<br/>函数说明：判断datetime1是否大于等于datetime2，返回布尔值 |
| 转换为时间 | 函数示例: TO_DATE(date,pattern)<br/>函数说明: 将date字符串按格式转换为时间 |
| 加减指定月数 | 函数示例: ADD_MONTH(date,months)<br/>函数说明: 将指定日期加/减指定月数，date为指定日期，months为指定月数，当为负数时在此date上减去此月数 |
| 加减指定年数 | 函数示例: ADD_YEAR(date,years)<br/>函数说明: 将指定日期加/减指定年数，date为指定日期，years为指定年数，当为负数时在此date上减去此年数 |
| 返回今天的日期字符串 | 函数示例: TODAY_STR()<br/>函数说明: 返回今天的日期字符串，精确到天，格式为yyyy-MM-dd |
| 等于 | 函数示例：DATE_EQUALS(datetime1,datetime2)<br/>函数说明：判断datetime1是否等于datetime2，返回布尔值 |
| 小于 | 函数示例：LESS_THAN(datetime1,datetime2)<br/>函数说明：判断datetime1是否小于datetime2，返回布尔值 |
| 返回当前时间 | 函数示例: NOW()<br/>函数说明: 返回当前时间 |
| 大于 | 函数示例：GREATER_THAN(datetime1,datetime2)<br/>函数说明：判断datetime1是否大于datetime2，返回布尔值 |
| 加减指定天数 | 函数示例: ADD_DAY(date,days)<br/>函数说明: 将指定日期加/减指定天数，date为指定日期，days为指定天数，当为负数时在date上减去此天数 |
| 返回当前时间字符串 | 函数示例: NOW_STR()<br/>函数说明: 返回当前时间字符串，精确到时分秒，格式为yyyy-MM-dd hh:mm:ss |
| 提取年 | 函数示例: YEAR(date)<br/>函数说明: 返回当前日期的年份部分 |
| 提取月 | 函数示例: MONTH(date)<br/>函数说明: 返回当前日期的月份部分 |
| 提取日 | 函数示例: DAY(date)<br/>函数说明: 返回当前日期的日期部分 |

## （五）集合函数
| 函数 | 说明 |
| :---: | --- |
| 移除集合（或数组中的元素） | 函数示例: LIST_REMOVE(list,item)<br/>函数说明: 从集合list中移除元素item |
| 将一个布尔集合进行逻辑或运算 | 函数示例: LIST_OR(list)<br/>函数说明: 将一个布尔集合进行逻辑或运算，返回布尔值 |
| 将元素添加到集合（或数组） | 函数示例: LIST_ADD(list,item)<br/>函数说明: 将元素item添加到集合list |
| 判断集合（或数组是否包含元素） | 函数示例: LIST_CONTAINS(list,item)<br/>函数说明: 判断集合list是否包含元素item |
| 判断对象集合（或数组中属性值是否不在指定集合（或数组）中） | 函数示例: LIST_FIELD_NOT_IN(list,model,field,list)<br/>函数说明: 判断对象集合(或数组)中属性值是否不在指定集合(或数组)中，返回布尔集合 |
| 获取集合（或数组元素数量） | 函数示例: LIST_COUNT(list)<br/>函数说明: 传入一个对象集合，获取集合元素数量 |
| 获取集合中的所有id | 函数示例: LIST_IDS(list)<br/>函数说明: 传入一个对象集合，获取集合中的所有id组成的列表 |
| 获取集合（或数组元素） | 函数示例: LIST_GET(list,index)<br/>函数说明: 获取集合list中索引为数字index的元素 |
| 将一个布尔集合进行逻辑与运算 | 函数示例: LIST_AND(list)<br/>函数说明: 将一个布尔集合进行逻辑与运算，返回布尔值 |
| 将对象集合转化为属性集合 | 函数示例: LIST_FIELD_VALUES(list,model,field)<br/>函数说明: 传入一个对象集合，该对象的模型和属性字段，返回属性值集合 |
| 判断对象集合（或数组中属性值匹配情况） | 函数示例: LIST_FIELD_EQUALS(list,model,field,value)<br/>函数说明: 判断对象集合(或数组)中属性值匹配情况，返回布尔集合 |
| 将元素添加到集合（或数组的指定位置） | 函数示例: LIST_ADD_BY_INDEX(list,index,item)<br/>函数说明: 将元素item添加到集合list的索引index处 |
| 判断对象集合（或数组中属性值不匹配情况） | 函数示例: LIST_FIELD_NOT_EQUALS(list,model,field,value)<br/>函数说明: 判断对象集合(或数组)中属性值不匹配情况，返回布尔集合 |
| 判断对象集合（或数组中属性值是否在指定集合（或数组）中） | 函数示例: LIST_FIELD_IN(list,model,field,list)<br/>函数说明: 判断对象集合(或数组)中属性值是否在指定集合(或数组)中，返回布尔集合 |
| 判断集合（或数组是否为空） | 函数示例: LIST_IS_EMPTY(list)<br/>函数说明: 传入一个对象集合，判断是否为空 |


## （六）键值对函数
| 函数 | 说明 |
| :---: | --- |
| <div style="width:180px;">从键值对中获取指定键的值</div> | <div style="width:500px;">函数示例: MAP_GET(map,key)<br/>函数说明: 从键值对中获取键为key的值</div> |
| 移除键值对中的元素 | 函数示例: MAP_REMOVE(map,key)<br/>函数说明: 从键值对map中移除键key |
| 判断键值对是否为空 | 函数示例: MAP_IS_EMPTY(map)<br/>函数说明: 判断键值对map是否为空 |
| 判断键值对中是否包含键 | 函数示例：MAP_CONTAINS_KEY（map,key）<br/>函数说明：判断键值对中是否包含key |
| 获取键值数量 | 函数示例: MAP_COUNT(map)<br/>函数说明: 获取键值对map的键值数量 |
| 向键值对中添加键值 | 函数示例: MAP_PUT(map,key,value)<br/>函数说明: 将键为key的值为value添加到键值对map中 |


## （七）对象函数
| 函数 | 说明 |
| :---: | --- |
| 获取对象属性值 | 函数示例: GET(object, path)<br/>函数说明: 根据指定字段路径获取值 |
| 根据字段编码获取对象属性 | 函数示例：FIELD_GET(object, model, path)<br/>函数说明：根据指定字段路径获取值 |
| 判断是否为空 | 函数示例: IS_NULL(文本或控件)<br/>函数说明: 判断对象是否为空，为空则返回true，不为空则返回false，可用于判断具体值或者控件 |
| 判断是否相等 | 函数示例: EQUALS(A,B)<br/>函数说明: 判断A和B是否相等 |


## （八）上下文函数
| 函数 | 说明 |
| :---: | --- |
| <div style="width:180px;">获取当前用户的部门</div> | <div style="width:500px;">函数示例：CURRENT_DEPARTMENT()<br/>函数说明：获取当前用户的部门</div> |
| 获取当前用户部门编码 | 函数示例：CURRENT_DEPARTMENT_CODE()<br/>函数说明：获取当前用户部门编码 |
| 获取当前用户的合作伙伴id | 函数示例: CURRENT_PARTNER_ID()<br/>函数说明: 获取当前用户的合作伙伴id |
| 获取当前用户的公司id | 函数示例: CURRENT_CORP_ID()<br/>函数说明: 获取当前用户的公司id |
| 获取当前用户的公司 | 函数示例: CURRENT_CORP()<br/>函数说明: 获取当前用户的公司 |
| 获取当前用户名 | 函数示例: CURRENT_USER_NAME()<br/>函数说明: 获取当前用户的用户名 |
| 获取当前用户id | 函数示例: CURRENT_UID()<br/>函数说明: 获取当前用户id |
| 获取当前用户的店铺 | 函数示例: CURRENT_SHOP()<br/>函数说明: 获取当前用户的店铺 |
| 获取当前用户的角色id列表 | 函数示例: CURRENT_ROLE_IDS()<br/>函数说明: 获取当前用户的角色id列表 |
| 获取当前用户的店铺id | 函数示例: CURRENT_SHOP_ID()<br/>函数说明: 获取当前用户的店铺id |
| 获取当前用户的角色列表 | 函数示例: CURRENT_ROLES()<br/>函数说明: 获取当前用户的角色列表 |
| 获取当前用户 | 函数示例: CURRENT_USER()<br/>函数说明: 获取当前用户 |
| 获取当前用户的合作伙伴 | 函数示例: CURRENT_PARTNER()<br/>函数说明: 获取当前用户的合作伙伴 |


## （九）逻辑函数
| 函数 | 说明 |
| :---: | --- |
| <div style="width:100px;">逻辑与</div> | <div style="width:600px;">函数示例: AND(A,B)<br/>函数说明: 返回 条件A 逻辑与 条件B 的值</div> |
| 条件函数 | 函数示例: IF(A,B,C)<br/>函数说明: 如果F满足条件A，则返回B，否则返回C，支持多层嵌套IF函数 |
| 逻辑或 | 函数示例: OR(A,B)<br/>函数说明: 返回 条件A 逻辑或 条件B 的值 |
| 逻辑非 | 函数示例: NOT(A)<br/>函数说明: 返回 逻辑非 条件A 的值 |


