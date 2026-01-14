---
title: Pack
index: true
category:
  - 研发手册
  - Reference
  - 前端API
  - Widget
order: 8
prev:
  text: Tree
  link: /zh-cn/DevManual/Reference/Front-EndFramework/Widget/View/tree.md
---
通常我们将一些用来包裹其他组件的组件通过 Pack 组件进行注册，它们也被称为 `容器组件` 。在具备布局能力的视图中，这类组件通常是非常有意义的。

# 一、Pack 组件图谱

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/1748598541706-cbae0b31-5f6e-4ddb-adda-9ce3b47a481b.jpeg)

# 二、Pack 组件的注册

## （一）Pack 组件的注册可选项

```typescript
/**
 * Pack组件注册可选项
 */
export interface BasePackOptions extends SPIOptions {
  /**
   * 指定视图类型
   */
  viewType?: ViewType | ViewType[];
  /**
   * 指定组件名称或别称
   */
  widget?: string | string[];
  /**
   * 指定是否内敛组件
   */
  inline?: boolean;
  /**
   * 指定模型
   */
  model?: string | string[];
  /**
   * 指定视图名称
   */
  viewName?: string | string[];
}
```

从上述类型声明中不难发现，其分类维度涵盖以下多个方面：视图类型、组件名称、是否内联组件、模型编码以及视图名称。这些维度用于描述组件的使用位置。一般而言，位置描述得越“精确”，在相应位置进行渲染时，该组件所具备的优先级也就越高。在完全相同的位置描述的情况下，后注册的组件会覆盖先注册的组件。

## （二）注册组件

### 1、注册 Pack 默认组件

在不指定 `widget` 属性时，该组件将注册为 Pack 默认组件。以 `DefaultGroupWidget` 为例：

```typescript
@SPI.ClassFactory(BasePackWidget.Token({}))
export class DefaultGroupWidget extends BasePackWidget
```

对于这个组件，在 DSL 中通过 pack 标签使用：

```xml
<pack>
  ...
</pack>
```

### 2、注册指定名称的组件

对于其他组件，我们通过 `widget` 来指定组件名称，这样就可以和其他组件进行区分。以 `DefaultBlockWidget` 组件为例：

```typescript
@SPI.ClassFactory(
  BasePackWidget.Token({
    widget: 'block'
  })
)
export class DefaultBlockWidget extends BasePackWidget
```

对于这个组件，在 `DSL` 中通过 `pack` 标签使用，并指定 `widget` 属性：

```xml
<pack widget="block">
  ...
</pack>
```

# 三、常见布局和容器组件的使用

## （一）栅格布局

参考 [Antd Grid 栅格 For Vue](https://3x.antdv.com/components/grid-cn) ，Oinone 的栅格布局同样分为 `24` 栅格。下面我们来看一下栅格布局在 `DSL` 中的使用。

与原生组件支持的栅格布局不同，Oinone 提供了 `cols` 和 `span` 组合来灵活的处理栅格数。通过 `cols` 属性定义一行的栅格数，通过 `span` 属性决定单个栅格的跨度，默认跨度与栅格数一致。

**一行三列（1:1:1）**

```xml
<pack widget="row" cols="3">
    <pack widget="col" span="1"></pack>
    <pack widget="col" span="1"></pack>
    <pack widget="col" span="1"></pack>
</pack>
```

**1:3**

```xml
<pack widget="row" cols="4">
    <pack widget="col" span="1"></pack>
    <pack widget="col" span="3"></pack>
</pack>
```

**两行（自动换行）**

```xml
<pack widget="row" cols="3">
    <!-- 第一行 -->
    <pack widget="col" span="1"></pack>
    <pack widget="col" span="1"></pack>
    <pack widget="col" span="1"></pack>
    <!-- 第二行 -->
    <pack widget="col" span="1"></pack>
    <pack widget="col" span="3"></pack>
</pack>
```

## （二）标签页组件

参考 [Antd Tabs 标签页 For Vue](https://3x.antdv.com/components/tabs-cn) ，对于 `父子组合` 类型的组件，其使用方式与原生组件支持的使用方式类似，父子组件需要相邻定义。

**基本用法**

```xml
<pack widget="tabs">
    <pack widget="tab" title="Tab 1"></pack>
    <pack widget="tab" title="Tab 2"></pack>
    <pack widget="tab" title="Tab 3"></pack>
</pack>
```

## （三）内置栅格布局

在 Oinone 中，有一部分组件内置使用了栅格布局，你不需要显式定义栅格布局组件就可以直接使用。

**分组中使用栅格布局**

```xml
<pack title="基础信息" cols="3">
    <field data="code" label="编码" span="1" />
    <field data="name" label="名称" span="2" />
    <field data="description" label="描述" span="3" />
</pack>
```

上面的 `DSL` 与 下面的 `DSL` 是等价的：

```xml
<pack title="基础信息">
    <pack widget="row" cols="3">
        <pack widget="col" span="1">
            <field data="code" label="编码" />
        </pack>
        <pack widget="col" span="2">
            <field data="name" label="名称" />
        </pack>
        <pack widget="col" span="3">
            <field data="description" label="描述" />
        </pack>
    </pack>
</pack>
```

内置栅格布局是通过类似于 `组件混入` 的方式实现的，对于父组件来说，其混入了 `row` 组件的全部属性和功能，对于子组件来说，其混入了 `col` 组件的全部属性和功能，以此来简化 `DSL` 中对于栅格布局的使用。

# 四、Reference List

## （一）布局组件

### 1、DefaultBlockWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BasePackWidget.Token({
    widget: 'block'
  })
)
export class DefaultBlockWidget extends BasePackWidget
```

**属性**：

+ defaultGutter：默认间距。（`StandardGutterType`）
+ flex：是否为弹性布局。（`boolean`）
+ flexDirection：弹性布局方向。（`string | undefined`）
+ gutter：间距。（`number[]`）
+ inline：是否内联。（`boolean`）
+ layout：布局方式。（`string | undefined`）

### 2、DefaultRowWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BasePackWidget.Token({
    widget: 'row'
  })
)
export class DefaultRowWidget extends BasePackWidget
```

**属性**：

+ align：布局对齐方式。（`string`）
+ containersGutter：布局容器的栅格间隔。（`number[]`）
+ customDefaultGutter：自定义默认间距。（`StandardGutterType | undefined`）
+ defaultGutter：默认间距。（`StandardGutterType`）
+ flexDirection：弹性布局方向。（`string`）
+ flexLayout：弹性布局类型。（`string`）
+ gutter：栅格间隔。（`number[]`）
+ isCard：是否为卡片布局。（`boolean | undefined`）
+ justify：内容排列方式。（`string`）
+ wrap：是否换行。（`boolean | undefined`）

### 3、DefaultColWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BasePackWidget.Token({
    widget: 'col'
  })
)
export class DefaultColWidget extends BasePackWidget
```

**属性**：

+ maxWidth：最大宽度。（`any`）
+ minWidth：最小宽度。（`any`）
+ mode：布局模式。（`string | undefined`）
+ offset：栅格偏移量。（`number`）
+ span：栅格占位格数。（`number`）
+ width：宽度。（`any`）

### 4、DefaultContainersWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BasePackWidget.Token({
    widget: 'containers'
  })
)
export class DefaultContainersWidget extends DefaultRowWidget
```

**属性**：

+ border：是否显示边框。（`boolean`）
+ borderTop：是否显示上边框。（`boolean`）
+ borderBottom：是否显示下边框。（`boolean`）
+ borderLeft：是否显示左边框。（`boolean`）
+ borderRight：是否显示右边框。（`boolean`）
+ borderColor：边框颜色。（`string | undefined`）
+ borderSize：边框大小。（`string`）
+ borderStyle：边框样式。（`string | undefined`）
+ colGutter：列间距。（`string`）
+ currentGutter：当前栅格间隔。（`number[]`）
+ layout：布局方式。（`string | undefined`）
+ margin：外间距。（`string`）
+ marginBottom：底部外边距。（`string`）
+ marginLeft：左侧外边距。（`string`）
+ marginRight：右侧外边距。（`string`）
+ marginTop：顶部外边距。（`string`）
+ padding：内间距。（`string`）
+ paddingBottom：底部内边距。（`string`）
+ paddingLeft：左侧内边距。（`string`）
+ paddingRight：右侧内边距。（`string`）
+ paddingTop：顶部内边距。（`string`）
+ rowGutter：行间距。（`string`）
+ showInternalBorder：是否显示内部边框。（`boolean`）

### 5、DefaultContainerWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BasePackWidget.Token({
    widget: 'container'
  })
)
export class DefaultContainerWidget extends DefaultRowWidget
```

**属性**：

+ allInvisible：是否全部不可见。（`boolean`）
+ border：是否显示边框。（`boolean`）
+ borderTop：是否显示上边框。（`boolean`）
+ borderBottom：是否显示下边框。（`boolean`）
+ borderLeft：是否显示左边框。（`boolean`）
+ borderRight：是否显示右边框。（`boolean`）
+ borderColor：边框颜色。（`string | undefined`）
+ borderSize：边框大小。（`string`）
+ borderStyle：边框样式。（`string | undefined`）
+ colGutter：列间距。（`string`）
+ currentGutter：当前栅格间隔。（`number[]`）
+ layout：布局方式。（`string | undefined`）
+ margin：外间距。（`string`）
+ marginBottom：底部外边距。（`string`）
+ marginLeft：左侧外边距。（`string`）
+ marginRight：右侧外边距。（`string`）
+ marginTop：顶部外边距。（`string`）
+ padding：内间距。（`string`）
+ paddingBottom：底部内边距。（`string`）
+ paddingLeft：左侧内边距。（`string`）
+ paddingRight：右侧内边距。（`string`）
+ paddingTop：顶部内边距。（`string`）
+ rowGutter：行间距。（`string`）
+ showInternalBorder：是否显示内部边框。（`boolean`）
+ style：组件样式。（`CSSStyleDeclaration`）

## （二）容器组件

### 1、DefaultGroupWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BasePackWidget.Token({})
)
export class DefaultGroupWidget extends BasePackWidget
```

**属性**：

+ border：是否显示边框。（`boolean`）
+ description：描述文本。（`string`）
+ help：帮助内容。（`any`）
+ layout：布局方式。（`string | undefined`）
+ title：分组标题。（`string`）

### 2、DefaultTabsWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BasePackWidget.Token({
    widget: 'tabs'
  })
)
export class DefaultTabsWidget extends BasePackWidget
```

**属性**：

+ defaultActiveIndex：默认激活的标签索引。（`number | undefined`）
+ layout：布局方式。（`string | undefined`）
+ parentMountedCallChaining：父级挂载链式调用实例。（`CallChaining | undefined`）
+ tabAlign：标签对齐方式。（`string`）
+ tabPosition：标签位置。（`string`）

**方法**：

#### computeDefaultActiveKey

+ **功能描述**：计算默认激活的标签键（基于默认索引或报告的键）。
+ **类型**：`() => string | undefined`
+ **返回值**：默认激活的标签键。

#### findNextActiveIndex

+ **功能描述**：根据不可见标志和当前索引，查找下一个可见的标签索引（优先前后搜索）。
+ **类型**：`(invisibleFlags: boolean[], currentActiveIndex: number) => number`
+ **参数**：
  - `invisibleFlags`：子标签不可见状态数组。
  - `currentActiveIndex`：当前激活的标签索引。
+ **返回值**：下一个可见标签的索引，未找到则返回 `-1`。

#### getActiveKey

+ **功能描述**：获取当前激活的标签键。
+ **类型**：`() => string | undefined`
+ **返回值**：当前激活的标签键。

#### onActiveKeyChange

+ **功能描述**：处理标签激活状态变化，更新激活键。
+ **类型**：`(key: string) => void`
+ **参数**：
  - `key`：新激活的标签键。

#### resetInvisible

+ **功能描述**：重置标签可见性，自动切换到下一个可见标签（若当前标签不可见）。
+ **类型**：`() => void`

#### setActiveKey

+ **功能描述**：设置当前激活的标签键。
+ **类型**：`(key: string | undefined) => void`
+ **参数**：
  - `key`：待激活的标签键。

### 3、DefaultTabWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BasePackWidget.Token({
    widget: 'tab'
  })
)
export class DefaultTabWidget extends BasePackWidget
```

**属性**：

+ currentTabKey：当前标签键（基于当前句柄）。（`string`）
+ disabled：是否禁用（支持表达式）。（`boolean`）
+ forceRender：是否强制渲染。（`boolean`）
+ layout：布局方式。（`string | undefined`）
+ parentMountedCallChaining：父级挂载链式调用实例。（`CallChaining | undefined`）
+ title：标签标题（支持表达式，默认值为 `DEFAULT_TAB_TITLE`）。（`string`）

**方法**：

#### isDefaultActive

+ **功能描述**：判断是否为默认激活状态（基于 `dsl` 中的 `defaultActive` 配置）。
+ **类型**：`() => boolean`
+ **返回值**：返回是否默认激活状态。

### 4、DefaultMultiViewTabsWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BasePackWidget.Token({
    widget: 'MultiViewTabs'
  })
)
export class DefaultMultiViewTabsWidget extends DefaultTabsWidget
```

**属性**：

+ allInvisible：是否全部不可见。（`boolean | undefined`）
+ invisible：是否不可见。（`boolean`）
+ multiViewKeyCache：多视图键缓存实例。（`ReturnType<MultiViewKeyCache>`）

**方法**：

#### onActiveKeyChange

+ **功能描述**：处理激活键变化事件，更新多视图键缓存。
+ **类型**：`(tabKey: string) => void`
+ **参数**：
  - `tabKey`：新激活的标签键。

### 5、DefaultMultiViewTabWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BasePackWidget.Token({
    widget: 'MultiViewTab'
  })
)
export class DefaultMultiViewTabWidget extends DefaultTabWidget
```

**属性**：

+ activeRecords：当前激活记录。（`ActiveRecord[] | undefined`）
+ allInvisible：是否全部不可见。（`boolean | undefined`）
+ dataSource：数据源。（`ActiveRecord[] | undefined`）
+ forceRender：是否强制渲染。（`boolean`）
+ invisible：是否不可见。（`boolean`）
+ metadataViewWidget：元数据视图组件实例。（`MetadataViewWidget | undefined`）
+ runtimeView：运行时视图。（`RuntimeView | undefined`）
+ runtimeViewContext：运行时视图上下文。（`RuntimeContext | undefined`）
+ viewName：视图名称。（`string | undefined`）
+ viewModel：视图模型名称。（`string | undefined`）

**方法**：

#### createMetadataViewWidget

+ **功能描述**：创建元数据视图组件实例（带唯一句柄和配置）。
+ **类型**：`() => MetadataViewWidget`
+ **返回值**：元数据视图组件实例。

#### initRuntimeContext

+ **功能描述**：通过元数据子视图和运行时视图初始化上下文。
+ **类型**：`(metadataSubviewWidget: MetadataViewWidget, view: RuntimeView) => RuntimeContext`
+ **参数**：
  - `metadataSubviewWidget`：元数据子视图组件。
  - `view`：运行时视图实例。
+ **返回值**：运行时上下文。

#### initView

+ **功能描述**：异步加载运行时视图并初始化上下文和属性。
+ **类型**：`async () => void`

#### initViewAfterProperties

+ **功能描述**：视图属性初始化后的钩子函数（空实现，供子类扩展）。
+ **类型**：`() => void`

#### reloadActiveRecords

+ **功能描述**：重新加载激活记录并更新当前状态。
+ **类型**：`(records: ActiveRecords | undefined) => void`
+ **参数**：
  - `records`：新的激活记录数据（可选）。

#### reloadDataSource

+ **功能描述**：重新加载数据源并更新当前状态。
+ **类型**：`(records: ActiveRecords | undefined) => void`
+ **参数**：
  - `records`：新的数据源数据（可选）。

### 6、DefaultCollapseWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BasePackWidget.Token({
    widget: 'collapse'
  })
)
export class DefaultCollapseWidget extends BasePackWidget
```

**属性**：

+ accordion：是否为手风琴模式。（`boolean | undefined`）
+ collapseMethod：折叠方法。（`string`）
+ expandAll：是否全部展开（默认 `true`）。（`boolean | undefined`）
+ expandIconPosition：展开图标位置（默认 `right`）。（`string`）
+ layout：布局方式。（`string | undefined`）
+ type：折叠类型（默认 `bordered`）。（`string`）

**方法**：

#### getActiveKey

+ **功能描述**：获取当前激活的键。
+ **类型**：`() => string | string[] | undefined`
+ **返回值**：当前激活键。

#### onActiveKeyChange

+ **功能描述**：处理激活键变化，更新激活状态。
+ **类型**：`(key: string | string[]) => void`
+ **参数**：
  - `key`：新激活的键。

#### setActiveKey

+ **功能描述**：设置当前激活的键。
+ **类型**：`(key: string | string[] | undefined) => void`
+ **参数**：
  - `key`：待激活的键。

### 7、DefaultCollapsePanelWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BasePackWidget.Token({
    widget: ['collapsePanel', 'collapse-panel', 'CollapsePanel']
  })
)
export class DefaultCollapsePanelWidget extends BasePackWidget
```

**属性**：

+ currentTabKey：当前标签键。（`string`）
+ disabled：是否禁用。（`boolean`）
+ forceRender：是否强制渲染。（`boolean`）
+ layout：布局方式。（`string | undefined`）
+ title：标题。（`string`）

## （三）其他组件

### 1、DefaultSpinWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  BasePackWidget.Token({
    widget: 'spin'
  })
)
export class DefaultSpinWidget extends BasePackWidget
```

**属性**：

+ delay：延迟时间（毫秒）。（`number | undefined`）
+ loadingIndicator：自定义加载指示器。（`VNode | undefined`）
+ size：加载图标大小。（`string | undefined`）
+ tip：加载提示文本。（`string | undefined`）
+ wrapperClassName：外层容器类名。（`string | string[] | undefined`）

**方法**：

#### load

+ **功能描述**：执行异步操作并显示加载状态。
+ **类型**：`async <R>(fn: (...args: any[]) => R, ...args: any[]) => Promise<R>`
+ **参数**：
  - `fn`：要执行的异步函数。
  - `...args`：传递给异步函数的参数。
+ **返回值**：异步函数的返回结果。

