---
title: Metadata Service
index: true
category:
  - 研发手册
  - Reference
  - 前端API
  - Services
order: 1
prev:
  text: Vue UI
  link: /zh/DevManual/Reference/Front-EndFramework/OioComponents/vue-UI.md
---
在 Oinone Kunlun 中，元数据是系统运行最重要的一部分。在 “[精通前端框架 - 前端框架概览](/zh/DevManual/Tutorials/MasterTheFront-endFramework/chapter1-front-end-overview.md#8c828a5f)” 中，我们已经对元数据概念有了初步的认识，在这一章节，我们将从前端框架的角度来进一步了解元数据在 Oinone 中的具体呈现。

# 一、元数据图示

在 Oinone Kunlun 中，元数据分为三类：

+ 标准元数据：与后端模型一一对应。
+ DSL 元数据：通过 `viewAction#load` 接口获取的 DSL 元数据。
+ 运行时元数据：通过标准元数据或 DSL 元数据转换后的统一元数据类型。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/1750494193269-de6c9cab-da3e-4c7e-9c3b-4b0d48f6eaf3.jpeg)

:::warning 提示：

在业务系统中，我们对元数据的获取和操作都应该围绕着 `运行时元数据` 展开，这样任何来源的元数据都可以通过一套逻辑完成。

:::

### 1、标准元数据图谱

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/1750497543186-db1c3631-324e-4593-8610-bf743226886e.jpeg)

### 2、运行时元数据图谱

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/1750497805714-2b47c02d-50f3-4267-a13a-7ba3fa3b7b8e.jpeg)

# 二、如何获取运行时元数据

## （一）使用 RuntimeContext 获取元数据

在具有 `RuntimeContext` 的组件中，我们可以根据页面结构使用 `rootRuntimeContext` 或 `metadataRuntimeContext` 获取对应模型的运行时元数据。

## （二）使用 ModelCache 获取模型元数据

```typescript
// 获取国家分组模型元数据
const model = await ModelCache.get('resource.ResourceCountryGroup');
```

:::warning
提示：

更多关于 获取运行时元数据方法 的内容请参考：[API](#42fbc059)

:::

# 三、Reference List

## （一）标准元数据

### 1、模块（IModule）

**属性**：

+ id：模块的唯一标识符。（`string`）
+ name：模块的 API 名称。（`string`）
+ module：模块的技术名称。（`string`）
+ displayName：模块的显示名称，用于 UI 展示。（`string`）
+ logo：模块的图标 URL。（`string`）
+ homePage：模块的主页视图配置。（`IViewAction`）
+ allMenus：模块的所有菜单配置。（`IMenu[]`）
+ priority：模块的显示优先级。（`number`）
+ application：标识是否为独立应用。（`boolean`）
+ like：标识是否为用户收藏。（`boolean`）
+ urlHomePage：模块的 URL 主页配置。（`IURLAction`）

### 2、模型（IModel）

**属性**：

+ id：模型的唯一标识符。（`string`）
+ pk：主键字段列表。（`string[]`）
+ model：模型的技术名称。（`string`）
+ name：模型的内部名称。（`string`）
+ type：模型的类型。（`ModelType`）
+ module：所属模块的标识符。（`string`）
+ moduleName：所属模块的名称。（`string`）
+ modelFields：模型字段定义列表。（`IModelField[]`）
+ displayName：模型的显示名称。（`string`）
+ labelFields：用于显示标签的字段列表。（`string[]`）
+ label：模型的标签表达式。（`string`）
+ progressField：进度字段名称。（`string`）
+ masterFieldStr：主字段字符串。（`string`）
+ progressFieldStr：进度字段字符串。（`string`）
+ viewActionList：视图动作列表。（`IViewAction[]`）
+ serverActionList：服务器动作列表。（`IServerAction[]`）
+ urlActionList：URL 动作列表。（`IURLAction[]`）
+ clientActionList：客户端动作列表。（`IClientAction[]`）
+ functions：模型函数列表。（`IModelFunc[]`）
+ modelActions：模型动作集合。（`(IClientAction | IURLAction | IServerAction | IViewAction)[]`）
+ viewList：视图定义列表。（`IView[]`）
+ uniqueList：唯一约束定义列表。（`{ fieldList: IModelField[]; fields: string }[]`）
+ uniques：唯一约束字段列表。（`string[]`）
+ indexes：索引字段列表。（`string[]`）
+ indexList：索引定义列表。（`{ fieldList: IModelField[]; fields: string[] }[]`）
+ ordering：排序规则。（`string`）
+ attributes：模型属性配置。（`object`）
  - requiredCondition：必填条件表达式。（`string`）
  - invisibleCondition：不可见条件表达式。（`string`）
  - readonlyCondition：只读条件表达式。（`string`）
  - layoutGrid：布局网格大小。（`number`）
  - layoutGroup：布局分组名称。（`string`）

### 3、模型字段（IModelField）

**属性**：

+ id：字段的唯一标识符。（`string`）
+ data：兼容 v3 新版字段的数据标识。（`string`）
+ name：字段 API 名称。（`string`）
+ limit：关联关系数量限制，针对 xxx2many 字段的可选数量约束。（`number`）
+ load：数据加载函数。（`string`）
+ ttype：模型字段类型枚举。（`ModelFieldType`）
+ model：关联模型的名称。（`string`）
+ displayName：字段的显示名称。（`string`）
+ max：数值字段的最大值限制。（`string`）
+ min：数值字段的最小值限制。（`string`）
+ sys：标识是否为系统字段。（`boolean`）
+ systemSource：系统来源枚举。（`SystemSource`）
+ size：数值字段的长度。（`number`）
+ decimal：数值字段的精度。（`number`）
+ options：枚举类型的选项列表。（`IModelFieldOption[]`）
+ index：标识是否为索引字段。（`boolean`）
+ unique：标识是否为唯一索引字段。（`boolean`）
+ translate：标识是否需要翻译。（`boolean`）
+ label：字段的临时标签。（`string`）
+ references：关联的对方模型（原 relation）。（`string`）
+ through：m2m 关联关系的中间模型。（`string`）
+ relationFields：自身模型的关联字段。（`string[]`）
+ referenceFields：关联模型的关联字段。（`string[]`）
+ throughRelationFields：中间模型里当前模型的关联字段。（`string[]`）
+ throughReferenceFields：中间模型里关联模型的关联字段。（`string[]`）
+ invisible：默认可见性（布尔值或表达式）。（`boolean | string`）
+ priority：字段排序优先级。（`BIGINT`）
+ compute：计算表达式。（`string`）
+ relatedTtype：关联字段的类型。（`ModelFieldType`）
+ widget：字段使用的组件类型。（`string`）
+ field：字段关联的属性名。（`string`）
+ sortable：是否可排序（XML 配置字段，非后端模型字段）。（`boolean`）
+ hint：字段提示信息（XML 配置字段，非后端模型字段）。（`string`）
+ patternType：正则校验类型（XML 配置字段，非后端模型字段）。（`string`）
+ pattern：正则校验表达式。（`string`）
+ validation：表达式校验规则。（`string`）
+ tips：校验失败的提示消息。（`string`）
+ independentlyEditable：是否开启行内编辑。（`boolean`）
+ related：关联字段列表。（`string[]`）
+ store：是否需要存储字段值。（`boolean`）
+ relationStore：关联关系是否存储。（`boolean`）
+ storeSerialize：存储序列化函数类型（NON/JSON/COMMA/DOT）。（`ModelFieldSerializeType`）
+ domain：字段值域范围。（`string`）
+ isUnique：是否全局唯一（默认 false）。（`boolean`）
+ required：是否必填（默认 false，支持表达式）。（`boolean | string`）
+ requiredTips：必填校验的提示文案。（`string`）
+ domainSize：后端备选项分页数量。（`string`）
+ readonly：是否只读（新增可编辑，修改不可编辑，默认 false）。（`boolean`）
+ multi：字段返回值是否为数组。（`boolean`）
+ format：字段格式规则。（`string`）
+ defaultValue：字段默认值。（`string`）
+ attributes：字段属性配置。（`object`）
  - requiredCondition：必填条件表达式。（`string`）
  - invisibleCondition：不可见条件表达式。（`string`）
  - readonlyCondition：只读条件表达式。（`string`）
  - layoutGrid：布局网格大小。（`number`）
  - layoutGroup：布局分组名称。（`string`）
  - layoutTab：布局标签页。（`string`）
  - layoutTabs：布局标签页列表。（`string`）
+ modelFields：嵌套的子字段列表（避免与服务端 children 字段冲突）。（`IModelField[]`）

### 4、IBaseAbstractAction

**属性**：

+ title：动作标题。（`string`）
+ displayName：动作显示名称。（`string`）
+ label：动作标签。（`string`）
+ model：关联模型名称。（`string`）
+ rule：过滤规则（已废弃）。（`string`）
+ invisible：按钮显隐规则。（`string`）

### 5、IBaseAction

**属性**：

+ id：动作唯一标识。（`string`）
+ name：动作名称。（`string`）
+ model：关联模型名称。（`string`）
+ modelDefinition：模型定义对象。（`IModel`）
+ bindingType：动作绑定的视图类型列表。（`string[]`）
+ bindingViewName：动作仅显示的指定视图名称。（`string`）
+ actionType：动作类型枚举。（`ActionType`）
+ contextType：动作上下文类型枚举。（`ActionContextType`）
+ usageDesc：动作使用说明。（`string`）
+ groups：动作所属群组。（`any[]`）
+ builtIn：是否为内置动作。（`boolean`）
+ skipCheck：是否跳过动作策略筛选（临时解决方案）。（`boolean`）
+ config：动作配置参数。（`Record<string, unknown>`）
+ confirm：确认提示信息。（`string`）
+ priority：动作优先级。（`number`）
+ sessionPath：会话路径。（`string`）

### 6、跳转动作（IViewAction）

**继承**：`IBaseAction`

**属性**：

+ actionType：固定为视图动作类型。（`ActionType.View`）
+ target：目标窗口类型。（`ViewActionTarget`）
+ resModel：目标模型名称。（`string`）
+ resModelDefinition：目标模型定义对象。（`IModel`）
+ resViewName：目标视图名称。（`string`）
+ bindingViewName：绑定的 XML 视图名称。（`string`）
+ queryType：查询类型。（`QueryType`）
+ apiProtocol：API 协议类型。（`ApiProtocol`）
+ viewMode：可切换的视图类型列表（逗号分隔）。（`string`）
+ viewType：默认打开的视图类型。（`ViewType`）
+ dataType：视图数据分类。（`DataType`）
+ domain：列表视图附带的查询条件（用户可见）。（`string`）
+ filter：列表视图附带的查询条件（用户不可见）。（`string`）
+ load：数据加载方式。（`string`）
+ loadFunction：数据加载函数。（`IModelFunc`）
+ context：上下文变量。（`Record<string, unknown>`）
+ moduleName：模块短标识（前端用）。（`string`）
+ page：视图动作页面配置。（`ViewActionPage`）
+ resView：目标视图对象。（`IView`）
+ module：模块标识。（`string`）
+ resModule：目标模块标识。（`string`）
+ resModuleName：目标模块名称。（`string`）
+ resModuleDefinition：目标模块定义对象。（`IModule`）
+ moduleDefinition：模块定义对象。（`IModule`）
+ maskDefinition：遮罩层定义。（`{ name: string; template: string; }`）
+ theme：主题样式。（`string`）

### 7、分享跳转动作（ISharedViewAction）

**继承**：`IViewAction`

**属性**：

+ sharedCode：共享码。（`string`）
+ authorizationCode：授权码。（`string`）
+ sharedParameters：共享参数。（`string`）
+ browserTitle：浏览器标题。（`string`）
+ language：语言。（`string`）
+ languageIsoCode：语言 ISO 代码。（`string`）

### 8、提交动作（IServerAction）

**继承**：`IBaseAction`

**属性**：

+ actionType：固定为提交动作类型。（`ActionType.Server`）
+ functionDefinition：模型函数定义对象。（`IModelFunc`）
+ function：模型函数对象。（`IModelFunc`）
+ module：模块标识。（`string`）

### 9、链接动作（IURLAction）

**继承**：`IBaseAction`

**属性**：

+ url：目标 URL 地址。（`string`）
+ compute：URL 计算表达式。（`string`）
+ target：目标窗口类型。（`ViewActionTarget`）
+ confirm：确认提示信息。（`string`）
+ module：模块标识。（`string`）
+ context：上下文变量。（`Record<string, unknown>`）

### 10、客户端动作（IClientAction）

**继承**：`IBaseAbstractAction`

**属性**：

+ actionType：固定为客户端动作类型。（`ActionType.Client`）
+ name：客户端动作名称或自定义字符串。（`ClientActionName | string`）
+ bindingType：动作绑定的视图类型列表。（`string[]`）
+ id：动作唯一标识（可选）。（`string`）
+ contextType：动作上下文类型枚举。（`ActionContextType`）
+ confirm：确认提示信息。（`string`）
+ priority：动作优先级。（`number`）
+ tag：动作标签。（`string`）
+ fun：客户端函数名称。（`string`）

## （二）运行时元数据

### 1、模块（RuntimeModule）

**属性**：

+ module：模块编码，用于唯一标识模块。（`string`）
+ name：模块名称，通常是程序内部使用的标识。（`string`）
+ displayName：模块显示名称，用于界面展示。（`string`）

### 2、模型（RuntimeModel）

**属性**：

+ id：模型 id。（`string`）
+ model：模型编码。（`string`）
+ name：技术名称。（`string`）
+ modelFields：模型字段。（`RuntimeModelField[]`）
+ modelActions：模型动作。（`RuntimeAction[]`）
+ type：模型类型。（`ModelType`）
+ module：模块编码。（`string`）
+ moduleName：模块名称。（`string`）
+ moduleDefinition：模块定义。（`RuntimeModule`）
+ pks：主键。（`string[]`）
+ uniques：唯一键。（`string[][]`）
+ indexes：索引。（`string[][]`）
+ sorting：排序。（`string`）
+ label：显示标题。（`string`）
+ labelFields：标题字段。（`string[]`）

### 3、BaseRuntimeModelMetadata

**描述**：运行时模型元数据抽象定义。

**属性**：

+ id：元数据 id。（`string`）
+ model：模型编码。（`string`）
+ modelName：模型名称。（`string`）
+ modelDefinition：模型定义。（`RuntimeModel`）
+ __index：元数据索引，与 dsl 中的__metadata_index 匹配。（`number`）

### 4、母版（RuntimeMaskDefinition）

**属性**：

+ name：母版名称。（`string`）
+ template：母版模板。（`string`）

### 5、布局（RuntimeLayoutDefinition）

**属性**：

+ name：布局名称。（`string`）
+ template：布局模板。（`string`）

### 6、视图（RuntimeView）

**继承**：`BaseRuntimeModelMetadata`

**属性**：

+ name：视图名称。（`string`）
+ title：视图标题。（`string`）
+ type：视图类型。（`ViewType`）
+ module：视图模块编码。（`string`）
+ moduleName：视图模块名称。（`string`）
+ layoutName：布局名称。（`string`）
+ layout：布局 dsl。（`string | DslDefinition`）
+ dsl：模板 dsl。（`string | DslDefinition`）
+ template：最终执行 dsl。（`string | DslDefinition`）
+ filter：不可视过滤条件。（`string`）
+ domain：可视过滤条件。（`string`）
+ initialValue：视图初始值。（`Record<string, unknown>[]`）
+ context：上下文。（`Record<string, unknown>`）
+ extension：扩展属性。（`Record<string, unknown>`）

### 7、模型字段（RuntimeModelField）

**继承**：`BaseRuntimeModelMetadata`

**属性**：

+ template：原始 dsl。（`FieldDslDefinition`）
+ data：属性名称。（`string`）
+ name：API 名称。（`string`）
+ ttype：字段业务类型。（`ModelFieldType`）
+ multi：是否多值。（`boolean`）
+ defaultValue：默认值。（`unknown`）
+ store：是否存储。（`boolean`）
+ sortable：是否排序。（`boolean`）
+ storeSerialize：存储序列化方式。（`ModelFieldSerializeType`）
+ displayName：字段显示名称。（`string`）
+ label：字段页面显示名称（优先于 displayName）。（`string`）
+ required：必填规则。（`boolean | string`）
+ readonly：只读规则。（`boolean | string`）
+ invisible：隐藏规则。（`boolean | string`）
+ disabled：禁用规则。（`boolean | string`）
+ compute：计算表达式。（`string`）
+ submitType：提交类型。（`SubmitType`）
+ isVirtual：是否为虚拟字段。（`boolean`）
+ translate：是否需要翻译。（`boolean`）

### 8、文本字段（RuntimeStringField）

**继承**：`RuntimeModelField`

**属性**：

+ size：大小。（`string | number`）
+ limit：限制。（`string | number`）
+ max：最大值。（`string | number`）
+ min：最小值。（`string | number`）

### 9、数字字段（RuntimeNumberField）

**继承**：`RuntimeModelField`

**属性**：

+ size：大小。（`string | number`）
+ decimal：小数位数。（`string | number`）
+ max：最大值。（`string | number`）
+ min：最小值。（`string | number`）
+ limit：限制数量。（`string | number`）

### 10、布尔字段（RuntimeBooleanField）

**继承**：`RuntimeModelField`

**属性**：

+ options：选项。（`[RuntimeEnumerationOption, RuntimeEnumerationOption]`）

### 11、枚举字段（RuntimeEnumerationField）

**继承**：`RuntimeModelField`

**属性**：

+ options：选项列表。（`RuntimeEnumerationOption[]`）

### 12、日期时间字段（RuntimeDateTimeField）

**继承**：`RuntimeModelField`

**属性**：

+ format：日期时间格式化字符串。（`string`）
+ valueFormat：值的格式化字符串。（`string`）
+ dateFormat：日期部分的格式化字符串。（`string`）
+ timeFormat：时间部分的格式化字符串。（`string`）

### 13、日期字段（RuntimeDateField）

**继承**：`RuntimeModelField`

**属性**：

+ format：格式化字符串。（`string`）
+ valueFormat：值的格式化字符串。（`string`）
+ dateFormat：日期部分的格式化字符串。（`string`）

### 14、时间字段（RuntimeTimeField）

**继承**：`RuntimeModelField`

**属性**：

+ format：格式化字符串。（`string`）
+ valueFormat：值的格式化字符串。（`string`）
+ timeFormat：时间部分的格式化字符串。（`string`）

### 15、年份字段（RuntimeYearField）

**继承**：`RuntimeModelField`

**属性**：

+ format：格式化字符串。（`string`）
+ valueFormat：值的格式化字符串。（`string`）

### 16、关系字段（RuntimeRelationField）

**继承**：`RuntimeModelField`

**属性**：

+ relationStore：是否关系存储。（`boolean`）
+ references：关联模型编码。（`string`）
+ referencesModel：关联模型。（`RuntimeModel`）
+ relationFields：关系字段（在当前模型中的字段）。（`string[]`）
+ referenceFields：关联字段（在关联模型中的字段）。（`string[]`）
+ filter：不可视过滤条件。（`string`）
+ domain：可视过滤条件。（`string`）
+ relationUpdateType：关联关系更新类型。（`RelationUpdateType`）
+ submitCache：提交缓存。（`SubmitCacheManager`）
+ sortFields：排序字段。（`string[]`）

### 17、一对多关系字段（RuntimeO2MField）

**继承**：`RuntimeRelationField`

**属性**：

+ limit：限制数量。（`number | string`）

### 18、多对一关系字段（RuntimeM2OField）

**继承**：`RuntimeRelationField`

**属性**：同 `RuntimeRelationField`

### 19、多对多关系字段（RuntimeM2MField）

**继承**：`RuntimeRelationField`

**属性**：

+ through：多对多中间模型编码。（`string`）
+ throughRelationFields：多对多中间模型关系字段（与关系字段对应）。（`string[]`）
+ throughReferenceFields：多对多中间模型关联字段（与关联字段对应）。（`string[]`）
+ limit：限制数量。（`string | number`）

### 20、引用字段（RuntimeRelatedField）

**继承**：`RuntimeModelField`

**属性**：

+ relatedTtype：引用业务类型。（`ModelFieldType`）
+ related：引用属性。（`string[]`）

### 21、搜索模型字段（RuntimeSearchField）

**继承**：`RuntimeModelField`

**属性**：

+ operator：操作符。（`string`）
+ allowSearch：是否允许搜索。（`boolean`）

### 22、动作（RuntimeAction）

**继承**：`BaseRuntimeModelMetadata`

**属性**：

+ template：原始 dsl。（`ActionDslDefinition`）
+ name：动作名称。（`string`）
+ widget：动作组件。（`string`）
+ actionType：动作类型。（`ActionType`）
+ contextType：动作上下文类型（用于控制数据提交方式）。（`ActionContextType`）
+ bindingType：绑定视图类型（表示该按钮仅在对应视图类型中显示）。（`ViewType[]`）
+ bindingViewName：绑定视图名称（表示该按钮仅在指定名称的视图中显示）。（`string`）
+ priority：优先级。（`number`）
+ invisible：隐藏规则。（`boolean | string`）
+ disabled：禁用规则。（`boolean | string`）
+ displayName：字段显示名称。（`string`）
+ label：动作页面显示名称（优先于 displayName）。（`string`）
+ mapping：数据映射。（`Record<string, unknown>`）
+ context：上下文。（`Record<string, unknown>`）
+ sessionPath：会话路径。（`string`）

### 23、跳转动作（RuntimeViewAction）

**继承**：`RuntimeAction`

**属性**：

+ title：跳转动作标题。（`string`）
+ target：跳转类型。（`ViewActionTarget`）
+ filter：不可视过滤条件。（`string`）
+ domain：可视过滤条件。（`string`）
+ module：当前模块编码。（`string`）
+ moduleName：当前模块名称。（`string`）
+ moduleDefinition：当前模块定义。（`RuntimeModule`）
+ maskDefinition：母版定义。（`RuntimeMaskDefinition`）
+ viewLayout：当前视图布局定义。（`RuntimeLayoutDefinition`）
+ viewName：当前视图名称。（`string`）
+ viewType：当前视图类型。（`ViewType`）
+ viewMode：当前视图模式。（`ViewMode`）
+ resModel：目标模型编码。（`string`）
+ resModelName：目标模型名称。（`string`）
+ resModelDefinition：目标模型定义。（`RuntimeModel`）
+ resModule：目标模块编码。（`string`）
+ resModuleName：目标模块名称。（`string`）
+ resModuleDefinition：目标模块定义。（`RuntimeModule`）
+ resMaskDefinition：母版定义。（`RuntimeMaskDefinition`）
+ resViewLayout：目标视图布局定义。（`RuntimeLayoutDefinition`）
+ resViewName：目标视图名称。（`string`）
+ resViewType：目标视图类型。（`ViewType`）
+ resViewMode：目标视图模式。（`ViewMode`）
+ resView：目标视图定义。（`RuntimeView`）
+ theme：主题。（`string`）
+ load：加载函数名称。（`string`）
+ loadFunctionDefinition：加载函数定义。（`RuntimeFunctionDefinition`）

### 24、分享跳转动作（SharedRuntimeViewAction）

**继承**：`RuntimeViewAction`

**属性**：

+ sharedCode：分享码。（`string`）
+ authorizationCode：授权码。（`string`）
+ sharedParameters：分享参数。（`Record<string, unknown>`）
+ browserTitle：浏览器标题。（`string`）
+ language：当前语言。（`string`）
+ languageIsoCode：当前语言 ISO 编码。（`string`）

### 25、提交动作（RuntimeServerAction）

**继承**：`RuntimeAction`

**属性**：

+ fun：函数名称。（`string`）
+ functionDefinition：函数定义。（`RuntimeFunctionDefinition`）

### 26、链接动作（RuntimeUrlAction）

**继承**：`RuntimeAction`

**属性**：

+ url：跳转 url。（`string`）
+ target：打开方式。（`ViewActionTarget`）
+ computeFunction：计算函数。（`RuntimeFunctionDefinition`）
+ compute：计算函数 Fun。（`string`）

### 27、客户端动作（RuntimeClientAction）

**继承**：`RuntimeAction`

**属性**：

+ fun：客户端动作名。（`string`）

### 28、函数（RuntimeFunctionDefinition）

**属性**：

+ type：函数类型。（`FunctionType[]`）
+ namespace：函数命名空间。（`string | FunctionSelfFlagType`）
+ fun：函数编码。（`string`）
+ name：API 名称。（`string`）
+ argumentList：参数列表。（`RuntimeFunctionArgument[]`）
+ returnType：返回类型。（`RuntimeFunctionReturnType`）

## （三）枚举

### 1、模型类型（ModelType）

+ `STORE`：存储型模型，数据会持久化存储。
+ `TRANSIENT`：临时型模型，数据不持久化。
+ `ABSTRACT`：抽象型模型，用于继承。
+ `PROXY`：代理型模型，用于远程数据访问。

### 2、字段业务类型（ModelFieldType）

+ `STRING`：字符串类型。
+ `TEXT`：文本类型。
+ `HTML`：HTML 类型。
+ `PHONE`：电话类型。
+ `EMAIL`：邮箱类型。
+ `INTEGER`：整数类型。
+ `LONG`：长整型。
+ `FLOAT`：浮点数类型。
+ `MONEY`：货币类型。
+ `DATETIME`：日期时间类型。
+ `DATE`：日期类型。
+ `TIME`：时间类型。
+ `YEAR`：年份类型。
+ `BOOLEAN`：布尔类型。
+ `ENUM`：枚举类型。
+ `MAP`：映射类型。
+ `RELATED`：关联类型。
+ `O2O`：一对一关系。
+ `O2M`：一对多关系。
+ `M2O`：多对一关系。
+ `M2M`：多对多关系。
+ `OBJ`：对象类型。

### 3、数据来源（SystemSource）

+ `SYSTEM`：内核系统生成。
+ `BASE`：系统原生字段。
+ `MANUAL`：手工新增字段。
+ `UI`：界面新增字段。
+ `RELATION`：关联关系生成字段。
+ `ABSTRACT_INHERITED`：抽象继承而来。
+ `TRANSIENT_INHERITED`：临时继承而来。
+ `EXTEND_INHERITED`：同表继承而来。
+ `MULTI_TABLE_INHERITED`：多表继承而来。
+ `PROXY_INHERITED`：代理继承而来。

## （四）获取运行时元数据方法

### 1、ModuleCache

**方法**：

#### get

+ **功能描述**：获取指定模块名称的缓存，可选择是否强制获取（忽略缓存）。
+ **类型**：`(moduleName: string, force?: boolean) => Promise<IModule | undefined>`
+ **参数**：
  - `moduleName`：模块名称。
  - `force`：强制查询，默认值 `false`。
+ **返回值**：模块元数据。

### 2、ModelCache

**方法**：

#### get

+ **功能描述**：通过模型编码获取模型。
+ **类型**：`(model: string, force?: boolean) => Promise<RuntimeModel | undefined>`
+ **参数**：
  - `model`：模型编码。
  - `force`：强制查询，默认值 `false`。
+ **返回值**：模型元数据。

### 3、ViewActionCache

**方法**：

#### get

+ **功能描述**：通过模型编码和跳转动作名称获取视图动作。
+ **类型**：`(model: string, name: string, force?: boolean) => Promise<RuntimeViewAction | undefined>`
+ **参数**：
  - `model`：模型编码。
  - `name`：跳转动作名称。
  - `force`：强制查询，默认值 `false`。
+ **返回值**：跳转动作元数据。

#### getOrThrow

+ **功能描述**：通过模型编码和跳转动作名称获取跳转动作，若不存在则抛出异常。
+ **类型**：`(model: string, name: string, force?: boolean) => Promise<RuntimeViewAction | undefined>`
+ **参数**：
  - `model`：模型编码。
  - `name`：跳转动作名称。
  - `force`：强制查询，默认值 `false`。
+ **返回值**：跳转动作元数据。

#### getHomepage

+ **功能描述**：获取模块首页跳转动作。
+ **类型**：`(module?: string, force?: boolean) => Promise<RuntimeViewAction | undefined>`
+ **参数**：
  - `module`：模块编码，可选。
  - `force`：强制查询，默认值 `false`。
+ **返回值**：首页跳转动作。

#### getSharedAction

+ **功能描述**：通过分享码获取分享跳转动作。
+ **类型**：`(sharedCode: string, force?: boolean) => Promise<RuntimeViewAction | undefined>`
+ **参数**：
  - `sharedCode`：分享码。
  - `force`：强制查询，默认值 `false`。
+ **返回值**：分享跳转动作。

#### set

+ **功能描述**：设置跳转动作。
+ **类型**：`(action: RuntimeViewAction) => Promise<void>`
+ **参数**：
  - `action`：跳转动作。

### 4、ServerActionCache

**方法**：

#### get

+ **功能描述**：通过模型编码和名称获取提交动作。
+ **类型**：`(model: string, name: string, force?: boolean) => Promise<RuntimeServerAction | undefined>`
+ **参数**：
  - `model`：模型编码。
  - `name`：名称。
  - `force`：强制查询，默认值 `false`。
+ **返回值**：提交动作元数据。

### 5、UrlActionCache

#### get

+ **功能描述**：通过模型编码和名称获取链接动作。
+ **类型**：`(model: string, name: string, force?: boolean) => Promise<RuntimeUrlAction | undefined>`
+ **参数**：
  - `model`：模型编码。
  - `name`：名称。
  - `force`：强制查询，默认值 `false`。
+ **返回值**：链接动作元数据。

### 6、FunctionCache

#### get

+ **功能描述**：通过函数技术名称获取函数。
+ **类型**：`(namespace: string, fun: string) => Promise<RuntimeFunctionDefinition | undefined>`
+ **参数**：
  - `namespace`：命名空间。
  - `fun`：技术名称。
+ **返回值**：函数元数据。

#### getByName

+ **功能描述**：通过函数名称获取函数（此方式不安全，请尽可能使用`FunctionCache.get`方式）。
+ **类型**：`(namespace: string, name: string) => Promise<RuntimeFunctionDefinition | undefined>`
+ **参数**：
  - `namespace`：命名空间。
  - `name`：名称。
+ **返回值**：函数元数据。

