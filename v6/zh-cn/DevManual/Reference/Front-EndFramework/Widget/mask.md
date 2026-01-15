---
title: Mask
index: true
category:
  - 研发手册
  - Reference
  - 前端API
  - Widget
order: 3

---
在 Oinone 客户端中的大多数界面都使用一种常见的布局：顶部是一个带有一些功能的控制组件，紧接着的下方区域分成了两部分，左侧是一个可以切换页面的菜单，右侧是一个主要内容区域。这是通过使用 `Mask` 渲染框架来实现的。

该框架提供两类内置母版：**默认母版**和 **多选项卡内联母版**。默认母版结构包括顶部栏（含应用切换、消息通知、语言切换、用户信息等组件）、侧边栏菜单、内容区的面包屑导航和主视图区域；多选项卡内联母版则将选项卡内联显示在内容区上方，其余布局与默认母版类似。

框架内的组件分为六类：

+ **导航组件**：包括面包屑、菜单、多选项卡，用于页面切换和路径导航；
+ **顶部栏组件**：包含应用切换、消息通知、语言切换、用户信息，提供界面顶层功能控制；
+ **布局组件**：如块级元素、容器、内容区、侧边栏等，负责界面结构划分；
+ **其他组件**：例如分割线，用于界面元素分隔；

此外，文档还列出了部分组件的类名、属性和方法（如公共组件的重新加载逻辑、导航组件的菜单处理等），为开发者调用和扩展组件功能提供了具体参考。

# 一、内置母版（Mask）

## （一）默认母版

``` xml
<mask>
    <multi-tabs />
    <header>
        <widget widget="app-switcher" />
        <block>
            <widget widget="notification" />
            <widget widget="divider" />
            <widget widget="language" />
            <widget widget="divider" />
            <widget widget="user" />
        </block>
    </header>
    <container>
        <sidebar>
            <widget widget="nav-menu" height="100%" />
        </sidebar>
        <content>
            <breadcrumb />
            <block width="100%">
                <widget width="100%" widget="main-view" />
            </block>
        </content>
    </container>
</mask>
```

## （二）多选项卡内联母版

``` xml
<mask>
    <header>
        <widget widget="app-switcher" />
        <block>
            <widget widget="notification" />
            <widget widget="divider" />
            <widget widget="language" />
            <widget widget="divider" />
            <widget widget="user" />
        </block>
    </header>
    <container>
        <sidebar>
            <widget widget="nav-menu" height="100%" />
        </sidebar>
        <block height="100%" flex="1 0 0" flexDirection="column" alignContent="flex-start" flexWrap="nowrap" overflow="hidden">
            <multi-tabs inline="true" />
            <content>
                <breadcrumb />
                <block width="100%">
                    <widget width="100%" widget="main-view" />
                </block>
            </content>
        </block>
    </container>
</mask>
```

# 二、母版组件

在母版中使用的组件我们称为 **母版组件**，按照功能和位置，我们将其分为导航组件、顶部栏组件、布局组件以及其他组件。下面我们列出来目前平台中已有的所有母版组件，并在本章的最后提供了 API 文档供读者查阅。

## （一）导航组件

| **组件名称** | **类名**         | **用法**                       |
| ------------ | ---------------- | ------------------------------ |
| 面包屑       | BreadcrumbWidget | `<breadcrumb />`               |
| 菜单         | MenuWidget       | `<widget widget="nav-menu" />` |
| 多选项卡     | MultiTabsWidget  | `<multi-tabs />`               |


## （二）顶部栏组件

| **组件名称** | **类名**           | **用法**                           |
| ------------ | ------------------ | ---------------------------------- |
| 应用切换     | AppSwitcherWidget  | `<widget widget="app-switcher" />` |
| 消息通知     | NotificationWidget | `<widget widget="notification" />` |
| 语言切换     | LanguageWidget     | `<widget widget="language" />`     |
| 用户信息     | UserWidget         | `<widget widget="user" />`         |


## （三）布局组件

| **组件名称** | **类名**            | **用法**                  |
| ------------ | ------------------- | ------------------------- |
| 块级元素     | MaskBlockWidget     | `<block></block>`         |
| 容器组件     | MaskContainerWidget | `<container></container>` |
| 内容布局     | MsakContentWidget   | `<content></content>`     |
| 顶部布局     | MaskHeaderWidget    | `<header></header>`       |
| 根组件       | MaskRootWidget      | `<mask></mask>`           |
| 侧边栏       | MaskSidebarWidget   | `<sidebar></sidebar>`     |


## （四）其他组件

| **组件名称** | **类名**      | **用法**                      |
| ------------ | ------------- | ----------------------------- |
| 分割线       | DividerWidget | `<widget widget="divider" />` |


# 三、母版组件的注册

## （一）母版组件的注册可选项

``` xml
/**
 * Mask组件注册可选项
 */
export interface BaseMaskOptions extends SPIOptions {
  /**
   * 指定XML标签
   */
  dslNodeType?: string;
  /**
   * 指定组件名称
   */
  widget?: string | string[];
}
```

从上述类型声明中不难发现，母版组件的注册仅包含两个属性：`dslNodeType` 和 `widget` 。使用不同属性会产生不同的表现，我们需要根据实际需要进行选择。

+ dslNodeType：对应 XML 标签，直接渲染指定组件。
+ widget：通过 `MaskCommonWidget` 渲染指定组件。

下面，我们分别对这两个属性注册的组件进行介绍。

## （二）使用 dslNodeType 注册

以 `MaskBlockWidget` 为例：

``` typescript
@SPI.ClassFactory(
  MaskWidget.Token({
    dslNodeType: 'block'
  })
)
export class MaskBlockWidget extends BaseMaskLayoutWidget
```

对于这个组件，在 `mask` 中通过 `block` 标签使用：

``` xml
<block>
    ...
</block>
```

在浏览器中对应的 `DOM` 结构与 `Vue` 组件完全一致：

``` xml
<div class="k-layout-block">
    ...
</div>
```

## （三）使用 widget 注册

以 `AppSwitcherWidget` 为例：

``` typescript
@SPI.ClassFactory(
  MaskWidget.Token({
    widget: 'app-switcher'
  })
)
export class AppSwitcherWidget extends MaskWidget
```

对于这个组件，在 `mask` 中使用 `XML` 标签：

``` xml
<widget widget="app-switcher" />
```

在浏览器中对应的 `DOM` 结构会在 `Vue` 组件外侧包裹一个 `div` 标签，并且会声明 `class="k-layout-widget"` ：

``` xml
<div class="k-layout-widget">
    <div class="k-oinone-application">
        ...
    </div>
</div>
```

## （四）最佳实践

### 1、使用 dslNodeType 注册

+ 容器类组件。如：header、block、container、sidebar 等。
+ 不希望框架对组件产生副作用的独立组件。如：multi-tabs、breadcrumb 等。

### 2、使用 widget 注册

+ 在带有布局的容器组件中定义的子组件。如：notification、divider、language 等。

# 四、注册母版

与注册组件类似，母版可以通过注册的方式替换或者修改。

## （一）母版的注册可选项

``` typescript
/**
 * 布局注册可选项
 */
export interface LayoutRegisterOptions extends SPIOptions {
  // region view

  /**
   * 视图类型
   */
  viewType: ViewType;
  /**
   * 视图模型所在模块编码，一般是驼峰风格的英文 designerCommon
   */
  module?: string;
  /**
   * 视图模型所在模块名称，一般是下划线风格的英文 designer_common
   */
  moduleName?: string;
  /**
   * 布局名称，对应viewActionQuery.load.resView.baseLayoutName
   */
  layoutName?: string;
  /**
   * 视图的模型编码
   */
  model?: string;
  /**
   * 视图的模型名称
   */
  modelName?: string;
  /**
   * 视图的名称
   */
  viewName?: string;
  /**
   * 是否为内嵌视图(子视图特有)，表单页内有个o2m的子表格，该表格的inline为true
   */
  inline?: boolean;

  // endregion

  // region field

  /**
   * 模型字段类型(子视图特有)
   */
  ttype?: ModelFieldType;
  /**
   * 关联模型字段类型(子视图特有)
   */
  relatedTtype?: ModelFieldType;
  /**
   * 字段(子视图特有)
   */
  field?: string;

  // endregion

  // region action

  /**
   * 动作名称
   */
  actionName?: string;
  /**
   * 动作使用的组件名称
   */
  actionWidget?: string;

  // endregion
}
```

从上述类型声明中不难发现，其主要分为：视图（view）、字段（field）以及动作（action）三类，针对不同的元素，我们都提供了不同的参数用于描述母版的使用范围。与任何一个组件注册类似，使用范围描述的越 “精确”，在对应位置使用的母版优先级也就越高。

## （二）使用 registerMask 注册母版

下面是我们在 “[探索前端框架 - Build a dashboard](/zh-cn/DevManual/Tutorials/DiscoverTheFront-endFramework/chapter2-build-a-dashboard.md)” 中注册的母版：

``` typescript
import { registerMask, ViewType } from '@oinone/kunlun-dependencies';

registerMask(
  `<mask>
    <multi-tabs />
    <header>
        <widget widget="app-switcher" />
        <block>
            <widget widget="notification" />
            <widget widget="divider" />
            <widget widget="language" />
            <widget widget="divider" />
            <widget widget="user" />
        </block>
    </header>
    <container>
        <content>
            <block width="100%">
                <widget width="100%" widget="main-view" />
            </block>
        </content>
    </container>
</mask>`,
  {
    model: 'resource.ResourceCountryGroup',
    viewType: ViewType.Table
  }
);
```

按照之前内容的要求，我们移除了部分组件，并且给出了注册条件：

1. 保留顶部栏所有功能，移除左侧的导航菜单组件。
2. 移除面包屑组件，让我们的主内容分发区看起来更大一些。
3. 将这个母版应用于“国家分组”这个菜单项对应的页面上。

## （三）通过 MaskEditor 编辑母版

对于某些特定功能来说，使用不同的配置项，母版需要作出相应的变化。对于这样的需求，我们通过 `registerMask` 注册静态母版是没办法实现的。那么，有没有什么办法可以在页面运行时对母版进行编辑呢？答案是肯定的。

让我们来看一个实际业务中可能遇到的场景：当 `运行时配置` 中开启了 “组织切换” 功能时，需要在母版的顶部栏添加 `组织切换` 组件。

### 1、定义组织切换的运行时配置

让我们先通过 运行时配置 定义这样一个可以获取是否开启的运行时配置管理器：

（建议遵循 [Environment - 自定义运行时配置](/zh-cn/DevManual/Reference/Front-EndFramework/environment.md#三、自定义运行时配置) 章节中介绍的最佳实践进行定义）

``` typescript
/**
 * 组织切换配置
 */
export interface OrganizationSwitcherConfig extends RuntimeConfigOptions, EnabledConfig {
  /**
   * 是否启用
   */
  enabled?: boolean;
}

export class OrganizationSwitcherConfigManager {
  private constructor() {
    // reject create object
  }

  public static getConfig(): OrganizationSwitcherConfig {
    return ConfigHelper.getConfig(RuntimeConfig.getConfig('organizationSwitcher'));
  }

  public static isEnabled(): boolean {
    let { enabled } = OrganizationSwitcherConfigManager.getConfig();
    if (enabled == null) {
      enabled = false;
    }
    return enabled;
  }
}
```

### 2、通过 SPI 注册一个 MaskEditor 编辑器

一个可能的实现可以是这样的：

``` typescript
@SPI.Service(MaskEditorToken, { priority: 100 })
export class OrganizationSwitcherMaskEditor implements MaskEditor {
  @SPI.Autowired(MaskEditServiceToken)
  private maskEditService!: MaskEditService;

  public edit(context: Readonly<MaskEditorContext>, dsl: DslDefinition): DslDefinition {
    if (OrganizationSwitcherConfigManager.isEnabled()) {
      this.maskEditService
        .findTopBarWidgets(dsl)
        ?.splice(
          0,
          0,
          this.maskEditService.generatorWidget('organization-switcher'),
          this.maskEditService.generatorDivider()
        );
    }
    return dsl;
  }
}
```

+ 优先级 priority：决定了 `MaskEditor` 的执行顺序，通常我们建议使用 `100-999` 之间的值，其他值在内置编辑器中可能会被使用。
+ MaskEditService：定义了一些常用的编辑母版的方法和查找方法，通过 `SPI.Autowired` 注入即可。
+ findTopBarWidgets：只能查找 **内置母版** 的顶部栏组件列表，自定义模板需要根据数据结构自行查找。
+ generatorWidget：只能生成使用 `widget` 注册的组件，使用 `dslNodeType` 注册的组件需使用 `generatorWidgetByDslNodeType` 方法。

# 五、Reference List

## （一）公共组件

### 1、MaskWidget

**继承**：BaseMaskWidget

**属性**：

+ path：当前路径。（`string`）
+ reloadMaskCallChaining：重新加载遮罩的链式调用。（`CallChaining | undefined`）
+ reloadMainViewCallChaining：重新加载主视图的链式调用。（`CallChaining | undefined`）

**抽象方法**：

#### reloadMaskProcess

+ **功能描述**：重新加载遮罩的处理函数。
+ **类型**：`(reloadParameters: ReloadMaskCallChainingParameters) => ReturnPromise<void>`
+ **参数**：
  - `reloadParameters`：重新加载遮罩的参数。
+ **返回值**：异步操作结果。

#### reloadMainViewProcess

+ **功能描述**：重新加载主视图的处理函数。
+ **类型**：`(reloadParameters: ReloadMainViewCallChainingParameters) => ReturnPromise<void>`
+ **参数**：
  - `reloadParameters`：重新加载主视图的参数。
+ **返回值**：异步操作结果。

### 2、MaskCommonWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  MaskWidget.Token({
    dslNodeType: 'widget'
  })
)
export class MaskCommonWidget extends BaseMaskLayoutWidget<MaskCommonWidgetProps>
```

**属性**：

+ classNames：组件类名（自动拼接 `k-layout-widget`）。（`string[] | undefined`）

**方法**：

#### createOrUpdateWidget

+ **功能描述**：创建或更新子组件实例（根据 `widget` 属性匹配 `BaseMaskWidget` 或 `ViewWidget`）。
+ **类型**：`(props: Record<string, unknown>) => void`
+ **参数**：
  - `props`：组件配置参数。

## （二）导航组件

### 1、BreadcrumbWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  MaskWidget.Token({
    dslNodeType: 'breadcrumb'
  })
)
export class BreadcrumbWidget extends MaskWidget
```

**属性**：

+ currentViewTitle：当前视图标题。(`string | undefined`)
+ enabledHomepage：是否启用首页。(`boolean`)
+ items：面包屑项目列表。(`RuntimeMenu[]`)
+ menuNodes：菜单节点树。(`TreeNode<RuntimeMenu>[]`)
+ moduleName：当前模块名称。(`string | undefined`)

**方法**：

#### **executeAction**

+ **功能描述**：执行视图动作。
+ **类型**：`(action: RuntimeViewAction) => void`
+ **参数**：
  - `action`：运行时视图动作。

#### **onHomepage**

+ **功能描述**：导航到首页。
+ **类型**：`() => Promise<void>`

#### **onModuleChange**

+ **功能描述**：在模块发生改变时调用。
+ **类型**：`(moduleName: string) => Promise<void>`
+ **参数**：
  - `moduleName`：模块名称。

#### **refreshItems**

+ **功能描述**：刷新面包屑项目列表。
+ **类型**：`(model: string, action: string, parameters: MenuUrlParameters | undefined) => Promise<void>`
+ **参数**：
  - `model`：模型名称。
  - `action`：动作名称。
  - `parameters`：菜单 URL 参数（可选）。

#### **refreshViewTitle**

+ **功能描述**：刷新视图标题。
+ **类型**：`(model: string, action: string) => Promise<void>`
+ **参数**：
  - `model`：模型名称。
  - `action`：动作名称。

#### **reloadMaskProcess**

+ **功能描述**：重新加载遮罩层处理。
+ **类型**：`(reloadParameters: ReloadMaskCallChainingParameters) => Promise<void>`
+ **参数**：
  - `reloadParameters`：重新加载参数。

### 2、MenuWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  MaskWidget.Token({
    widget: 'nav-menu'
  })
)
export class MenuWidget extends MaskWidget
```

**属性**：

+ collapsed：菜单折叠状态。（`boolean`）
+ collapsed$：菜单折叠状态的行为订阅。（`WidgetBehaviorSubjection<boolean>`）
+ menuTheme：当前菜单主题。（`SideBarTheme`）
+ menuThemeClass：当前菜单主题对应的类名。（`string`）
+ mode：菜单模式（水平或垂直）。（`'horizontal' | 'inline'`）
+ moduleName：当前模块名称。（`string | undefined`）
+ openKeys：展开的菜单键。（`string[] | undefined`）
+ router：路由实例。（`Router`）
+ selectedKeys：选中的菜单键。（`string[] | undefined`）
+ treeNodes：菜单树节点。（`TreeNode<RuntimeMenu>[]`）
+ $systemMajorConfig：系统配置订阅。（`Subscription`）

**方法**：

#### executeServerAction

+ **功能描述**：执行服务器动作。
+ **类型**：`(menu: RuntimeMenu, serverAction: IServerAction) => Promise<void>`
+ **参数**：
  - `menu`：菜单项。
  - `serverAction`：服务器动作。

#### executeUrlAction

+ **功能描述**：执行 URL 动作。
+ **类型**：`(menu: RuntimeMenu, urlAction: IURLAction) => void`
+ **参数**：
  - `menu`：菜单项。
  - `urlAction`：URL 动作。

#### executeViewAction

+ **功能描述**：执行视图动作。
+ **类型**：`(menu: RuntimeMenu, viewAction: IViewAction) => void`
+ **参数**：
  - `menu`：菜单项。
  - `viewAction`：视图动作。

#### handleMenuMapping

+ **功能描述**：处理菜单映射。
+ **类型**：`(mapping: Record<string, unknown>) => Record<string, unknown>`
+ **参数**：
  - `mapping`：映射对象。
+ **返回值**：处理后的映射对象。

#### onCollapsedChange

+ **功能描述**：处理菜单折叠状态变化。
+ **类型**：`(collapsed: boolean) => void`
+ **参数**：
  - `collapsed`：折叠状态。

#### onClick

+ **功能描述**：处理菜单项点击事件。
+ **类型**：`(node: TreeNode<RuntimeMenu>) => Promise<void>`
+ **参数**：
  - `node`：树节点。

#### onModuleChange

+ **功能描述**：处理模块变更事件。
+ **类型**：`(moduleName: string) => Promise<void>`
+ **参数**：
  - `moduleName`：模块名称。

#### onOpenChange

+ **功能描述**：处理菜单展开状态变化。
+ **类型**：`(openKeys: string[]) => void`
+ **参数**：
  - `openKeys`：展开的菜单键。

#### onSelect

+ **功能描述**：处理菜单项选择事件。
+ **类型**：`(node: TreeNode<RuntimeMenu>) => Promise<void>`
+ **参数**：
  - `node`：树节点。

#### refreshMenuUrlParameters

+ **功能描述**：刷新菜单 URL 参数。
+ **类型**：`(model: string, action: string) => void`
+ **参数**：
  - `model`：模型名称。
  - `action`：动作名称。

#### reloadMaskProcess

+ **功能描述**：重新加载遮罩处理函数。
+ **类型**：`(reloadParameters: ReloadMaskCallChainingParameters) => Promise<void>`
+ **参数**：
  - `reloadParameters`：重新加载参数。

### 3、MultiTabsWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  MaskWidget.Token({
    dslNodeType: 'multi-tabs'
  })
)
export class MultiTabsWidget extends MaskWidget
```

**属性**：

+ activeKey：当前激活标签页的键。（`string | undefined`）
+ draggable：标签页是否可拖拽。（`boolean`）
+ homepageTab：首页标签页。（`MultiTabItem | null | undefined`）
+ homepageType：首页类型。（`MultiTabType | undefined`）
+ inline：标签页是否内联显示。（`boolean`）
+ invisible：标签页是否不可见。（`boolean`）
+ isEnabledHomepage：是否启用首页。（`boolean | undefined`）
+ isEnabledModuleHomepage：是否启用模块首页。（`boolean`）
+ matched：路由匹配信息。（`Matched`）
+ multiTabConfig：多标签页配置。（`MultiTabConfig`）
+ router：路由实例。（`Router`）
+ showModuleLogo：是否显示模块图标。（`boolean`）
+ tabThemeClass：当前标签页的主题类名。（`string`）
+ tabs：标签页列表。（`MultiTabItem[]`）
+ $systemMajorConfig：系统主要配置的订阅。（`Subscription`）

**方法**：

#### closable

+ **功能描述**：判断标签页是否可关闭。
+ **类型**：`(tabs: MultiTabItem[], tab: MultiTabItem, index: number) => boolean`
+ **参数**：
  - `tabs`：标签页数组。
  - `tab`：当前标签页。
  - `index`：当前标签页在数组中的索引。
+ **返回值**：当前标签页是否可关闭。

#### findNextActiveTab

+ **功能描述**：查找下一个激活的标签页。
+ **类型**：`(tabs: MultiTabItem[], currentActiveIndex: number) => MultiTabItem`
+ **参数**：
  - `tabs`：标签页数组。
  - `currentActiveIndex`：当前激活标签页的索引。
+ **返回值**：下一个激活的标签页。

#### getTabs

+ **功能描述**：获取标签页列表。
+ **类型**：`() => MultiTabItem[]`
+ **返回值**：标签页列表。

#### isEnabled

+ **功能描述**：判断模块是否启用多标签页功能。
+ **类型**：`(module?: string) => boolean`
+ **参数**：
  - `module`：模块名称（可选）。
+ **返回值**：模块是否启用多标签页功能。

#### onClickTab

+ **功能描述**：处理标签页点击事件。
+ **类型**：`(tab: MultiTabItem) => void`
+ **参数**：
  - `tab`：被点击的标签页。

#### onCloseLeftTabs

+ **功能描述**：处理关闭左侧标签页的操作。
+ **类型**：`(tab: MultiTabItem) => void`
+ **参数**：
  - `tab`：当前标签页。

#### onCloseOtherTabs

+ **功能描述**：处理关闭其他标签页的操作。
+ **类型**：`(tab: MultiTabItem) => void`
+ **参数**：
  - `tab`：当前标签页。

#### onCloseRightTabs

+ **功能描述**：处理关闭右侧标签页的操作。
+ **类型**：`(tab: MultiTabItem) => void`
+ **参数**：
  - `tab`：当前标签页。

#### onCloseTab

+ **功能描述**：处理关闭标签页的操作。
+ **类型**：`(tab: MultiTabItem) => void`
+ **参数**：
  - `tab`：要关闭的标签页。

#### onMovedCallback

+ **功能描述**：处理标签页移动后的回调操作。
+ **类型**：`(tab: MultiTabItem) => void`
+ **参数**：
  - `tab`：移动后的标签页。

#### onMoveToSelfCallback

+ **功能描述**：处理标签页移动到自身的回调操作。
+ **类型**：`(dragTab: MultiTabItem, targetTab: MultiTabItem) => boolean`
+ **参数**：
  - `dragTab`：拖拽的标签页。
  - `targetTab`：目标标签页。
+ **返回值**：是否允许标签页移动到自身。

#### onOpenNewWindow

+ **功能描述**：在新窗口中打开标签页。
+ **类型**：`(tab: MultiTabItem) => Promise<void>`
+ **参数**：
  - `tab`：要在新窗口中打开的标签页。

#### onRefreshTab

+ **功能描述**：刷新标签页。
+ **类型**：`(tab: MultiTabItem) => void`
+ **参数**：
  - `tab`：要刷新的标签页。

#### reloadActiveTab

+ **功能描述**：重新加载当前激活的标签页。
+ **类型**：`() => Promise<void>`

#### reloadMainViewProcess

+ **功能描述**：重新加载主视图的处理过程。
+ **类型**：`(reloadParameters: ReloadMainViewCallChainingParameters) => Promise<void>`
+ **参数**：
  - `reloadParameters`：包含重新加载主视图所需参数的对象。

#### reloadTabs

+ **功能描述**：重新加载所有标签页。
+ **类型**：`() => Promise<void>`

## （三）顶部栏组件

### 1、AppSwitcherWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  MaskWidget.Token({
    widget: 'app-switcher'
  })
)
export class AppSwitcherWidget extends MaskWidget
```

**属性**：

+ apps：当前应用列表。（`IModule[] | undefined`）
+ collapsed：折叠状态。（`boolean`）
+ collapsed$：折叠状态的订阅。（`WidgetSubjection<boolean>`）
+ collapsedLogo：折叠时的 logo。（`string`）
+ currentPageUrl：当前页面 URL 参数。（`Record<string, any>`）
+ likeApp：收藏的应用列表。（`IModule[]`）
+ logo：应用 logo。（`string`）
+ majorConfig：主要配置。（`MajorConfig`）
+ module：当前模块。（`IModule | undefined`）
+ router：路由实例。（`Router`）

**方法**：

#### initApps

+ **功能描述**：初始化应用列表。
+ **类型**：`() => Promise<void>`

#### initCurrentModule

+ **功能描述**：初始化当前模块。
+ **类型**：`(moduleName: string) => Promise<boolean>`
+ **参数**：
  - `moduleName`：模块名称。
+ **返回值**：是否成功初始化。

#### onCollectionClick

+ **功能描述**：处理收藏应用点击事件。
+ **类型**：`(item: any) => Promise<void>`
+ **参数**：
  - `item`：点击的应用项。

#### onSwitchApp

+ **功能描述**：处理切换应用事件。
+ **类型**：`(app: IModule) => Promise<void>`
+ **参数**：
  - `app`：要切换到的应用。

#### reloadMaskProcess

+ **功能描述**：重新加载遮罩处理。
+ **类型**：`(reloadParameters: ReloadMaskCallChainingParameters) => Promise<void>`
+ **参数**：
  - `reloadParameters`：重新加载参数。

### 2、NotificationWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  MaskWidget.Token({
    widget: 'notification'
  })
)
export class NotificationWidget extends MaskWidget
```

**属性**：

+ beforeClickMap：点击前的回调函数映射。
+ confirmModalTitle：确认模态框标题。（`string`）
+ currentMessage：当前消息。（`any`）
+ currentMessageId：当前消息 ID。（`string`）
+ isShowConfirmModal：是否显示确认模态框。（`boolean`）
+ messageInfo：当前消息类型的信息。
+ messageList：消息列表。（`PamirsMessage[]`）
+ messageTextMap：消息类型文本映射。
+ messageType：当前消息类型。（`NotificationTypeEnum`）
+ msgDelay：轮询间隔时间（秒）。（`number`）
+ msgTotal：未读消息总数。（`number`）
+ resourceDateTimeFormat：资源日期时间格式。（`IResourceDateTimeFormat`）

**方法**：

#### beforeClick

+ **功能描述**：设置点击前的回调函数。
+ **类型**：`(args: BeforeClickMapKey | Partial<Record<BeforeClickMapKey, ReturnBeforeClick>>, cb?: ReturnBeforeClick) => Promise<void>`
+ **参数**：
  - `args`：点击前的回调函数名称或回调函数映射。
  - `cb`：回调函数（可选）。

#### changeMessageType

+ **功能描述**：更改消息类型。
+ **类型**：`(type: NotificationTypeEnum) => void`
+ **参数**：
  - `type`：新的消息类型。

#### formatDateTime

+ **功能描述**：格式化日期时间。
+ **类型**：`(value: string) => string`
+ **参数**：
  - `value`：要格式化的日期时间字符串。
+ **返回值**：格式化后的日期时间字符串。

#### getMessageInfo

+ **功能描述**：获取消息信息。
+ **类型**：`() => Promise<void>`

#### getMsgTotal

+ **功能描述**：获取未读消息总数。
+ **类型**：`() => Promise<void>`

#### onDetail

+ **功能描述**：处理消息详情点击事件。
+ **类型**：`(message: any, messageInfo: any) => Promise<void>`
+ **参数**：
  - `message`：消息对象。
  - `messageInfo`：消息信息对象。

#### onWorkflowUserTask

+ **功能描述**：处理工作流用户任务点击事件。
+ **类型**：`() => Promise<void>`

#### readMessage

+ **功能描述**：读取消息。
+ **类型**：`(msgId: string) => Promise<void>`
+ **参数**：
  - `msgId`：消息 ID。

#### toggleDialog

+ **功能描述**：切换确认模态框的显示状态。
+ **类型**：`() => void`

### 3、LanguageWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  MaskWidget.Token({
    widget: 'language'
  })
)
export class LanguageWidget extends MaskWidget
```

**属性**：

+ currentLanguage：当前语言配置。（`RuntimeLanguage | undefined`）
+ languages：语言列表。（`RuntimeLanguage[] | undefined`）
+ matched：路由匹配信息。（`Matched`）
+ router：路由实例。（`Router`）

**方法**：

#### initCurrentLanguage

+ **功能描述**：初始化当前语言配置。
+ **类型**：`(code: string) => void`
+ **参数**：
  - `code`：语言代码（如 `zh-CN`、`en-US`）。

#### initLanguages

+ **功能描述**：加载语言列表并补充图标配置（默认英文 / 中文图标）。
+ **类型**：`() => Promise<void>`

#### onChange

+ **功能描述**：切换语言时触发，更新当前语言并刷新页面。
+ **类型**：`(value: RuntimeLanguage) => void`
+ **参数**：
  - `value`：选中的语言对象。

#### reloadMaskProcess

+ **功能描述**：重新加载语言组件逻辑，初始化语言列表和当前语言。
+ **类型**：`(reloadParameters: ReloadMaskCallChainingParameters) => Promise<void>`
+ **参数**：
  - `reloadParameters`：重新加载参数。

### 4、UserWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  MaskWidget.Token({
    widget: 'user'
  })
)
export class UserWidget extends MaskWidget
```

**属性**：

+ matched：路由匹配信息。（`Matched`）
+ pamirsUser$：用户信息订阅对象。（`WidgetSubjection<PamirsUser>`）
+ router：路由实例。（`Router`）
+ userInfo：用户信息（包含基础信息和用户信息）。（`UserInfo | undefined`）

**方法**：

#### executeAction

+ **功能描述**：执行用户相关操作（视图动作、服务器动作、URL 动作、客户端动作）。
+ **类型**：`(action: RuntimeAction) => Promise<void>`
+ **参数**：
  - `action`：运行时动作对象，包含动作类型、模型、名称等信息。

#### fetchUserInfo

+ **功能描述**：获取用户基础信息。
+ **类型**：`() => Promise<UserInfo>`
+ **返回值**：用户信息 Promise 对象。

#### initUserInfo

+ **功能描述**：初始化用户信息，若未加载则从服务端获取。
+ **类型**：`() => Promise<void>`

#### logout

+ **功能描述**：用户登出操作。
+ **类型**：`() => void`

#### reloadMaskProcess

+ **功能描述**：重新加载用户组件逻辑，初始化用户信息。
+ **类型**：`(reloadParameters: ReloadMaskCallChainingParameters) => Promise<void>`
+ **参数**：
  - `reloadParameters`：重新加载参数。

## （四）布局组件

### 1、MaskBlockWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  MaskWidget.Token({
    dslNodeType: 'block'
  })
)
export class MaskBlockWidget extends BaseMaskLayoutWidget
```

**属性**：

+ classNames：组件的类名数组，继承自父类并追加 `['k-layout-block']`。（`string[] | undefined`）

### 2、MaskContainerWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  MaskWidget.Token({
    dslNodeType: 'container'
  })
)
export class MaskContainerWidget extends BaseMaskLayoutWidget
```

**属性**：

+ classNames：组件的类名数组，继承自父类并追加 `['k-layout-container', 'oio-scrollbar']`。（`string[] | undefined`）

### 3、MaskContentWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  MaskWidget.Token({
    dslNodeType: 'content'
  })
)
export class MaskContentWidget extends BaseMaskLayoutWidget
```

**属性**：

+ classNames：组件的类名数组，继承自父类并追加 `['k-layout-content oio-scrollbar']`。（`string[] | undefined`）

### 4、MaskHeaderWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  MaskWidget.Token({
    dslNodeType: 'header'
  })
)
export class MaskHeaderWidget extends BaseMaskLayoutWidget
```

**属性**：

+ classNames：组件的类名数组，继承自父类并追加 `['k-layout-header']`。（`string[] | undefined`）

### 5、MaskRootWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  MaskWidget.Token({
    dslNodeType: 'mask'
  })
)
export class MaskRootWidget extends BaseMaskLayoutWidget
```

**属性**：

+ classNames：组件的类名数组，继承自父类并追加 `['k-layout-mask']`。（`string[] | undefined`）

### 6、MaskSidebarWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  MaskWidget.Token({
    dslNodeType: 'sidebar'
  })
)
export class MaskSidebarWidget extends BaseMaskLayoutWidget
```

**属性**：

+ classNames：组件的类名数组，继承自父类并追加 `['k-layout-sidebar']`，当 `mode` 为 `horizontal` 时，再追加 `['k-layout-sidebar-horizontal']` 。（`string[] | undefined`）
+ mode：侧边栏显示模式，可选：`horizontal`、`inline`。默认： `inline` 。（`horizontal | inline`）

## （五）其他组件

### 1、DividerWidget

**类型声明**：

``` typescript
@SPI.ClassFactory(
  MaskWidget.Token({
    widget: 'divider'
  })
)
export class DividerWidget extends BaseMaskWidget
```



