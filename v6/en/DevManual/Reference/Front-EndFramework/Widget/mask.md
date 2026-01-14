---
title: Mask
index: true
category:
  - R&D Manual
  - Reference
  - Front-End API
  - Widget
order: 3

---
Most interfaces in the Oinone client use a common layout: a control component with some functions at the top, followed by a lower area divided into two parts, a menu on the left for switching pages, and a main content area on the right. This is achieved using the `Mask` rendering framework.

The framework provides two types of built-in masters: **Default Master** and **Multi-Tab Inline Master**. The default master structure includes a top bar (with application switching, message notifications, language switching, user information, etc.), a sidebar menu, a breadcrumb navigation in the content area, and a main view area; the multi-tab inline master displays tabs inline above the content area, with the rest of the layout similar to the default master.

Components in the framework are divided into six categories:

- **Navigation Components**: Including breadcrumbs, menus, and multi-tabs, used for page switching and path navigation;
- **Top Bar Components**: Including application switching, message notifications, language switching, and user information, providing top-level functional control for the interface;
- **Layout Components**: Such as block elements, containers, content areas, sidebars, etc., responsible for interface structure division;
- **Other Components**: Such as dividers, used for separating interface elements;

In addition, the document lists the class names, attributes, and methods of some components (such as the reload logic of public components, menu processing of navigation components, etc.), providing specific references for developers to call and extend component functions.

# I. Built-in Masks (Mask)

## (Ⅰ) Default Mask

```xml
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

## (Ⅱ) Inline Multi-Tab Mask

```xml
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

# II. Mask Components

Components used in masks are called **Mask Components**. According to their functions and positions, they are divided into navigation components, top bar components, layout components, and other components. Below we list all existing mask components in the platform, and provide API documentation at the end of this chapter for readers to refer to.

## (Ⅰ) Navigation Components

| **Component Name** | **ClassName**         | **Usage**                       |
| ------------ | ---------------- | ------------------------------ |
| Breadcrumb       | BreadcrumbWidget | `<breadcrumb />`               |
| Menu         | MenuWidget       | `<widget widget="nav-menu" />` |
| Multi-Tab     | MultiTabsWidget  | `<multi-tabs />`               |


## (Ⅱ) Top Bar Components

| **Component Name** | **ClassName**           | **Usage**                           |
| ------------ | ------------------ | ---------------------------------- |
| App Switcher     | AppSwitcherWidget  | `<widget widget="app-switcher" />` |
| Notification     | NotificationWidget | `<widget widget="notification" />` |
| Language Switcher     | LanguageWidget     | `<widget widget="language" />`     |
| User Info     | UserWidget         | `<widget widget="user" />`         |


## (Ⅲ) Layout Components

| **Component Name** | **ClassName**            | **Usage**                  |
| ------------ | ------------------- | ------------------------- |
| Block Element     | MaskBlockWidget     | `<block></block>`         |
| Container     | MaskContainerWidget | `<container></container>` |
| Content Layout     | MsakContentWidget   | `<content></content>`     |
| Top Layout     | MaskHeaderWidget    | `<header></header>`       |
| Root Component     | MaskRootWidget      | `<mask></mask>`           |
| Sidebar     | MaskSidebarWidget   | `<sidebar></sidebar>`     |


## (Ⅳ) Other Components

| **Component Name** | **ClassName**      | **Usage**                      |
| ------------ | ------------- | ----------------------------- |
| Divider       | DividerWidget | `<widget widget="divider" />` |


# Ⅲ. Registration of Mask Components

## (Ⅰ) Registration Options for Mask Components

```xml
/**
 * Mask component registration options
 */
export interface BaseMaskOptions extends SPIOptions {
  /**
   * Specify the XML tag
   */
  dslNodeType?: string;
  /**
   * Specify the component name
   */
  widget?: string | string[];
}
```

It is not difficult to find from the above type declaration that the registration of mask components only includes two attributes: `dslNodeType` and `widget`. Using different attributes will produce different performances, and we need to choose according to actual needs.

- dslNodeType: Corresponding to the XML tag, directly rendering the specified component.
- widget: Render the specified component through `MaskCommonWidget`.

Below, we introduce the components registered with these two attributes respectively.

## (Ⅱ) Registration Using dslNodeType

Take `MaskBlockWidget` as an example:

```typescript
@SPI.ClassFactory(
  MaskWidget.Token({
    dslNodeType: 'block'
  })
)
export class MaskBlockWidget extends BaseMaskLayoutWidget
```

For this component, use the `block` tag in `mask`:

```xml
<block>
    ...
</block>
```

The corresponding `DOM` structure in the browser is completely consistent with the `Vue` component:

```xml
<div class="k-layout-block">
    ...
</div>
```

## (Ⅲ) Registration Using widget

Take `AppSwitcherWidget` as an example:

```typescript
@SPI.ClassFactory(
  MaskWidget.Token({
    widget: 'app-switcher'
  })
)
export class AppSwitcherWidget extends MaskWidget
```

For this component, use the `XML` tag in `mask`:

```xml
<widget widget="app-switcher" />
```

The corresponding `DOM` structure in the browser will wrap a `div` tag outside the `Vue` component and declare `class="k-layout-widget"`:

```xml
<div class="k-layout-widget">
    <div class="k-oinone-application">
        ...
    </div>
</div>
```

## (Ⅳ) Best Practices

### 1. Registration Using dslNodeType

- Container components, such as: header, block, container, sidebar, etc.
- Independent components that do not want the framework to have side effects, such as: multi-tabs, breadcrumb, etc.

### 2. Registration Using widget

- Sub-components defined in container components with layouts, such as: notification, divider, language, etc.

# Ⅳ. Registering Masks

Similar to component registration, masks can be replaced or modified through registration.

## (Ⅰ) Registration Options for Masks

```typescript
/**
 * Layout registration options
 */
export interface LayoutRegisterOptions extends SPIOptions {
  // region view

  /**
   * View type
   */
  viewType: ViewType;
  /**
   * The module code where the view model is located, generally camel-case English designerCommon
   */
  module?: string;
  /**
   * The module name where the view model is located, generally underscore-style English designer_common
   */
  moduleName?: string;
  /**
   * Layout name, corresponding to viewActionQuery.load.resView.baseLayoutName
   */
  layoutName?: string;
  /**
   * The model code of the view
   */
  model?: string;
  /**
   * The model name of the view
   */
  modelName?: string;
  /**
   * The name of the view
   */
  viewName?: string;
  /**
   * Whether it is an inline view (unique to sub-views). There is a sub-table of o2m in the form page, and the inline of this table is true
   */
  inline?: boolean;

  // endregion

  // region field

  /**
   * Model field type (unique to sub-views)
   */
  ttype?: ModelFieldType;
  /**
   * Associated model field type (unique to sub-views)
   */
  relatedTtype?: ModelFieldType;
  /**
   * Field (unique to sub-views)
   */
  field?: string;

  // endregion

  // region action

  /**
   * Action name
   */
  actionName?: string;
  /**
   * The component name used by the action
   */
  actionWidget?: string;

  // endregion
}
```

It can be seen from the above type declaration that it is mainly divided into three categories: view, field, and action. For different elements, we provide different parameters to describe the usage scope of the mask. Similar to any component registration, the more "precise" the description of the usage scope, the higher the priority of the mask used in the corresponding position.

## (Ⅱ) Registering a Mask Using registerMask

Below is the mask we registered in "[Explore the Front-end Framework - Build a dashboard](/en/DevManual/Tutorials/DiscoverTheFront-endFramework/chapter2-build-a-dashboard.md)":

```typescript
import { registerMask, ViewType } from '@kunlun/dependencies';

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

According to the requirements of the previous content, we removed some components and gave registration conditions:

1. Retain all top bar functions and remove the navigation menu component on the left.
2. Remove the breadcrumb component to make our main content distribution area look larger.
3. Apply this mask to the page corresponding to the "Country Group" menu item.

## (Ⅲ) Editing Masks via MaskEditor

For certain specific functions, the mask needs to change accordingly using different configuration items. For such requirements, it is impossible to achieve by registering a static mask through `registerMask`. So, is there a way to edit the mask at runtime? The answer is yes.

Let's look at a scenario that may be encountered in actual business: when the "Organization Switch" function is enabled in the `runtime configuration`, the `Organization Switch` component needs to be added to the top bar of the mask.

### 1. Define the Runtime Configuration for Organization Switch

Let's first define a runtime configuration manager that can obtain whether it is enabled through the runtime configuration:

(It is recommended to follow the best practices introduced in the [Environment - Custom Runtime Configuration](/en/DevManual/Reference/Front-EndFramework/environment.md#iii-custom-runtime-configuration) section for definition)

```typescript
/**
 * Organization switch configuration
 */
export interface OrganizationSwitcherConfig extends RuntimeConfigOptions, EnabledConfig {
  /**
   * Whether to enable
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

### 2. Register a MaskEditor via SPI

A possible implementation could be:

```typescript
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

- Priority priority: Determines the execution order of `MaskEditor`. It is generally recommended to use values between `100-999`, as other values may be used in built-in editors.
- MaskEditService: Defines some common methods for editing and finding masks, which can be injected via `SPI.Autowired`.
- findTopBarWidgets: Can only find the top bar component list of the **built-in mask**. Custom templates need to be found according to the data structure.
- generatorWidget: Can only generate components registered with `widget`. Components registered with `dslNodeType` need to use the `generatorWidgetByDslNodeType` method.

# Ⅴ. Reference List

## (Ⅰ) Public Components

### 1. MaskWidget

**Inheritance**: BaseMaskWidget

**Attributes**:

- path: Current path. (`string`)
- reloadMaskCallChaining: Chained call for reloading the mask. (`CallChaining | undefined`)
- reloadMainViewCallChaining: Chained call for reloading the main view. (`CallChaining | undefined`)

**Abstract Methods**:

#### reloadMaskProcess

- **Function Description**: Processing function for reloading the mask.
- **Type**: `(reloadParameters: ReloadMaskCallChainingParameters) => ReturnPromise<void>`
- **Parameters**:
  - `reloadParameters`: Parameters for reloading the mask.
- **Return Value**: Asynchronous operation result.

#### reloadMainViewProcess

- **Function Description**: Processing function for reloading the main view.
- **Type**: `(reloadParameters: ReloadMainViewCallChainingParameters) => ReturnPromise<void>`
- **Parameters**:
  - `reloadParameters`: Parameters for reloading the main view.
- **Return Value**: Asynchronous operation result.

### 2. MaskCommonWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  MaskWidget.Token({
    dslNodeType: 'widget'
  })
)
export class MaskCommonWidget extends BaseMaskLayoutWidget<MaskCommonWidgetProps>
```

**Attributes**:

- classNames: Component class names (automatically concatenated with `k-layout-widget`). (`string[] | undefined`)

**Methods**:

#### createOrUpdateWidget

- **Function Description**: Create or update a sub-component instance (match `BaseMaskWidget` or `ViewWidget` based on the `widget` attribute).
- **Type**: `(props: Record<string, unknown>) => void`
- **Parameters**:
  - `props`: Component configuration parameters.

## (Ⅱ) Navigation Components

### 1. BreadcrumbWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  MaskWidget.Token({
    dslNodeType: 'breadcrumb'
  })
)
export class BreadcrumbWidget extends MaskWidget
```

**Attributes**:

- currentViewTitle: Current view title. (`string | undefined`)
- enabledHomepage: Whether to enable the homepage. (`boolean`)
- items: Breadcrumb item list. (`RuntimeMenu[]`)
- menuNodes: Menu node tree. (`TreeNode<RuntimeMenu>[]`)
- moduleName: Current module name. (`string | undefined`)

**Methods**:

#### executeAction

- **Function Description**: Execute a view action.
- **Type**: `(action: RuntimeViewAction) => void`
- **Parameters**:
  - `action`: Runtime view action.

#### onHomepage

- **Function Description**: Navigate to the homepage.
- **Type**: `() => Promise<void>`

#### onModuleChange

- **Function Description**: Called when the module changes.
- **Type**: `(moduleName: string) => Promise<void>`
- **Parameters**:
  - `moduleName`: Module name.

#### refreshItems

- **Function Description**: Refresh the breadcrumb item list.
- **Type**: `(model: string, action: string, parameters: MenuUrlParameters | undefined) => Promise<void>`
- **Parameters**:
  - `model`: Model name.
  - `action`: Action name.
  - `parameters`: Menu URL parameters (optional).

#### refreshViewTitle

- **Function Description**: Refresh the view title.
- **Type**: `(model: string, action: string) => Promise<void>`
- **Parameters**:
  - `model`: Model name.
  - `action`: Action name.

#### reloadMaskProcess

- **Function Description**: Reload mask layer processing.
- **Type**: `(reloadParameters: ReloadMaskCallChainingParameters) => Promise<void>`
- **Parameters**:
  - `reloadParameters`: Reload parameters.

### 2. MenuWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  MaskWidget.Token({
    widget: 'nav-menu'
  })
)
export class MenuWidget extends MaskWidget
```

**Attributes**:

- collapsed: Menu collapse status. (`boolean`)
- collapsed$: Behavior subscription for menu collapse status. (`WidgetBehaviorSubjection<boolean>`)
- menuTheme: Current menu theme. (`SideBarTheme`)
- menuThemeClass: Class name corresponding to the current menu theme. (`string`)
- mode: Menu mode (horizontal or vertical). (`'horizontal' | 'inline'`)
- moduleName: Current module name. (`string | undefined`)
- openKeys: Expanded menu keys. (`string[] | undefined`)
- router: Routing instance. (`Router`)
- selectedKeys: Selected menu keys. (`string[] | undefined`)
- treeNodes: Menu tree nodes. (`TreeNode<RuntimeMenu>[]`)
- $systemMajorConfig: System configuration subscription. (`Subscription`)

**Methods**:

#### executeServerAction

- **Function Description**: Execute a server action.
- **Type**: `(menu: RuntimeMenu, serverAction: IServerAction) => Promise<void>`
- **Parameters**:
  - `menu`: Menu item.
  - `serverAction`: Server action.

#### executeUrlAction

- **Function Description**: Execute a URL action.
- **Type**: `(menu: RuntimeMenu, urlAction: IURLAction) => void`
- **Parameters**:
  - `menu`: Menu item.
  - `urlAction`: URL action.

#### executeViewAction

- **Function Description**: Execute a view action.
- **Type**: `(menu: RuntimeMenu, viewAction: IViewAction) => void`
- **Parameters**:
  - `menu`: Menu item.
  - `viewAction`: View action.

#### handleMenuMapping

- **Function Description**: Process menu mapping.
- **Type**: `(mapping: Record<string, unknown>) => Record<string, unknown>`
- **Parameters**:
  - `mapping`: Mapping object.
- **Return Value**: Processed mapping object.

#### onCollapsedChange

- **Function Description**: Handle menu collapse status change.
- **Type**: `(collapsed: boolean) => void`
- **Parameters**:
  - `collapsed`: Collapse status.

#### onClick

- **Function Description**: Handle menu item click event.
- **Type**: `(node: TreeNode<RuntimeMenu>) => Promise<void>`
- **Parameters**:
  - `node`: Tree node.

#### onModuleChange

- **Function Description**: Handle module change event.
- **Type**: `(moduleName: string) => Promise<void>`
- **Parameters**:
  - `moduleName`: Module name.

#### onOpenChange

- **Function Description**: Handle menu expansion status change.
- **Type**: `(openKeys: string[]) => void`
- **Parameters**:
  - `openKeys`: Expanded menu keys.

#### onSelect

- **Function Description**: Handle menu item selection event.
- **Type**: `(node: TreeNode<RuntimeMenu>) => Promise<void>`
- **Parameters**:
  - `node`: Tree node.

#### refreshMenuUrlParameters

- **Function Description**: Refresh menu URL parameters.
- **Type**: `(model: string, action: string) => void`
- **Parameters**:
  - `model`: Model name.
  - `action`: Action name.

#### reloadMaskProcess

- **Function Description**: Reload mask processing function.
- **Type**: `(reloadParameters: ReloadMaskCallChainingParameters) => Promise<void>`
- **Parameters**:
  - `reloadParameters`: Reload parameters.

### 3. MultiTabsWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  MaskWidget.Token({
    dslNodeType: 'multi-tabs'
  })
)
export class MultiTabsWidget extends MaskWidget
```

**Attributes**:

- activeKey: Key of the currently active tab. (`string | undefined`)
- draggable: Whether tabs are draggable. (`boolean`)
- homepageTab: Homepage tab. (`MultiTabItem | null | undefined`)
- homepageType: Homepage type. (`MultiTabType | undefined`)
- inline: Whether tabs are displayed inline. (`boolean`)
- invisible: Whether tabs are invisible. (`boolean`)
- isEnabledHomepage: Whether to enable the homepage. (`boolean | undefined`)
- isEnabledModuleHomepage: Whether to enable the module homepage. (`boolean`)
- matched: Routing matching information. (`Matched`)
- multiTabConfig: Multi-tab configuration. (`MultiTabConfig`)
- router: Routing instance. (`Router`)
- showModuleLogo: Whether to display the module icon. (`boolean`)
- tabThemeClass: Theme class name of the current tab. (`string`)
- tabs: Tab list. (`MultiTabItem[]`)
- $systemMajorConfig: Subscription to system main configuration. (`Subscription`)

**Methods**:

#### closable

- **Function Description**: Determine if a tab is closable.
- **Type**: `(tabs: MultiTabItem[], tab: MultiTabItem, index: number) => boolean`
- **Parameters**:
  - `tabs`: Tab array.
  - `tab`: Current tab.
  - `index`: Index of the current tab in the array.
- **Return Value**: Whether the current tab is closable.

#### findNextActiveTab

- **Function Description**: Find the next active tab.
- **Type**: `(tabs: MultiTabItem[], currentActiveIndex: number) => MultiTabItem`
- **Parameters**:
  - `tabs`: Tab array.
  - `currentActiveIndex`: Index of the current active tab.
- **Return Value**: Next active tab.

#### getTabs

- **Function Description**: Get the tab list.
- **Type**: `() => MultiTabItem[]`
- **Return Value**: Tab list.

#### isEnabled

- **Function Description**: Determine if the module enables the multi-tab function.
- **Type**: `(module?: string) => boolean`
- **Parameters**:
  - `module`: Module name (optional).
- **Return Value**: Whether the module enables the multi-tab function.

#### onClickTab

- **Function Description**: Handle tab click event.
- **Type**: `(tab: MultiTabItem) => void`
- **Parameters**:
  - `tab`: Clicked tab.

#### onCloseLeftTabs

- **Function Description**: Handle the operation of closing left tabs.
- **Type**: `(tab: MultiTabItem) => void`
- **Parameters**:
  - `tab`: Current tab.

#### onCloseOtherTabs

- **Function Description**: Handle the operation of closing other tabs.
- **Type**: `(tab: MultiTabItem) => void`
- **Parameters**:
  - `tab`: Current tab.

#### onCloseRightTabs

- **Function Description**: Handle the operation of closing right tabs.
- **Type**: `(tab: MultiTabItem) => void`
- **Parameters**:
  - `tab`: Current tab.

#### onCloseTab

- **Function Description**: Handle the operation of closing a tab.
- **Type**: `(tab: MultiTabItem) => void`
- **Parameters**:
  - `tab`: Tab to be closed.

#### onMovedCallback

- **Function Description**: Handle the callback operation after a tab is moved.
- **Type**: `(tab: MultiTabItem) => void`
- **Parameters**:
  - `tab`: Moved tab.

#### onMoveToSelfCallback

- **Function Description**: Handle the callback operation when a tab is moved to itself.
- **Type**: `(dragTab: MultiTabItem, targetTab: MultiTabItem) => boolean`
- **Parameters**:
  - `dragTab`: Dragged tab.
  - `targetTab`: Target tab.
- **Return Value**: Whether to allow the tab to move to itself.

#### onOpenNewWindow

- **Function Description**: Open the tab in a new window.
- **Type**: `(tab: MultiTabItem) => Promise<void>`
- **Parameters**:
  - `tab`: Tab to be opened in a new window.

#### onRefreshTab

- **Function Description**: Refresh the tab.
- **Type**: `(tab: MultiTabItem) => void`
- **Parameters**:
  - `tab`: Tab to be refreshed.

#### reloadActiveTab

- **Function Description**: Reload the currently active tab.
- **Type**: `() => Promise<void>`

#### reloadMainViewProcess

- **Function Description**: Processing process for reloading the main view.
- **Type**: `(reloadParameters: ReloadMainViewCallChainingParameters) => Promise<void>`
- **Parameters**:
  - `reloadParameters`: Object containing parameters required to reload the main view.

#### reloadTabs

- **Function Description**: Reload all tabs.
- **Type**: `() => Promise<void>`

## (Ⅲ) Top Bar Components

### 1. AppSwitcherWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  MaskWidget.Token({
    widget: 'app-switcher'
  })
)
export class AppSwitcherWidget extends MaskWidget
```

**Attributes**:

- apps: Current application list. (`IModule[] | undefined`)
- collapsed: Collapsed status. (`boolean`)
- collapsed$: Subscription to collapsed status. (`WidgetSubjection<boolean>`)
- collapsedLogo: Logo when collapsed. (`string`)
- currentPageUrl: Current page URL parameters. (`Record<string, any>`)
- likeApp: List of favorite applications. (`IModule[]`)
- logo: Application logo. (`string`)
- majorConfig: Main configuration. (`MajorConfig`)
- module: Current module. (`IModule | undefined`)
- router: Routing instance. (`Router`)

**Methods**:

#### initApps

- **Function Description**: Initialize the application list.
- **Type**: `() => Promise<void>`

#### initCurrentModule

- **Function Description**: Initialize the current module.
- **Type**: `(moduleName: string) => Promise<boolean>`
- **Parameters**:
  - `moduleName`: Module name.
- **Return Value**: Whether initialization was successful.

#### onCollectionClick

- **Function Description**: Handle favorite application click event.
- **Type**: `(item: any) => Promise<void>`
- **Parameters**:
  - `item`: Clicked application item.

#### onSwitchApp

- **Function Description**: Handle application switching event.
- **Type**: `(app: IModule) => Promise<void>`
- **Parameters**:
  - `app`: Application to switch to.

#### reloadMaskProcess

- **Function Description**: Reload mask processing.
- **Type**: `(reloadParameters: ReloadMaskCallChainingParameters) => Promise<void>`
- **Parameters**:
  - `reloadParameters`: Reload parameters.

### 2. NotificationWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  MaskWidget.Token({
    widget: 'notification'
  })
)
export class NotificationWidget extends MaskWidget
```

**Attributes**:

- beforeClickMap: Callback function mapping before clicking.
- confirmModalTitle: Confirm modal title. (`string`)
- currentMessage: Current message. (`any`)
- currentMessageId: Current message ID. (`string`)
- isShowConfirmModal: Whether to show the confirm modal. (`boolean`)
- messageInfo: Information of the current message type.
- messageList: Message list. (`PamirsMessage[]`)
- messageTextMap: Message type text mapping.
- messageType: Current message type. (`NotificationTypeEnum`)
- msgDelay: Polling interval (seconds). (`number`)
- msgTotal: Total number of unread messages. (`number`)
- resourceDateTimeFormat: Resource date-time format. (`IResourceDateTimeFormat`)

**Methods**:

#### beforeClick

- **Function Description**: Set the callback function before clicking.
- **Type**: `(args: BeforeClickMapKey | Partial<Record<BeforeClickMapKey, ReturnBeforeClick>>, cb?: ReturnBeforeClick) => Promise<void>`
- **Parameters**:
  - `args`: Callback function name before clicking or callback function mapping.
  - `cb`: Callback function (optional).

#### changeMessageType

- **Function Description**: Change the message type.
- **Type**: `(type: NotificationTypeEnum) => void`
- **Parameters**:
  - `type`: New message type.

#### formatDateTime

- **Function Description**: Format the date-time.
- **Type**: `(value: string) => string`
- **Parameters**:
  - `value`: Date-time string to be formatted.
- **Return Value**: Formatted date-time string.

#### getMessageInfo

- **Function Description**: Get message information.
- **Type**: `() => Promise<void>`

#### getMsgTotal

- **Function Description**: Get the total number of unread messages.
- **Type**: `() => Promise<void>`

#### onDetail

- **Function Description**: Handle message detail click event.
- **Type**: `(message: any, messageInfo: any) => Promise<void>`
- **Parameters**:
  - `message`: Message object.
  - `messageInfo`: Message information object.

#### onWorkflowUserTask

- **Function Description**: Handle workflow user task click event.
- **Type**: `() => Promise<void>`

#### readMessage

- **Function Description**: Read a message.
- **Type**: `(msgId: string) => Promise<void>`
- **Parameters**:
  - `msgId`: Message ID.

#### toggleDialog

- **Function Description**: Toggle the display status of the confirm modal.
- **Type**: `() => void`

### 3. LanguageWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  MaskWidget.Token({
    widget: 'language'
  })
)
export class LanguageWidget extends MaskWidget
```

**Attributes**:

- currentLanguage: Current language configuration. (`RuntimeLanguage | undefined`)
- languages: Language list. (`RuntimeLanguage[] | undefined`)
- matched: Routing matching information. (`Matched`)
- router: Routing instance. (`Router`)

**Methods**:

#### initCurrentLanguage

- **Function Description**: Initialize the current language configuration.
- **Type**: `(code: string) => void`
- **Parameters**:
  - `code`: Language code (e.g., `zh-CN`, `en-US`).

#### initLanguages

- **Function Description**: Load the language list and supplement icon configuration (default English/Chinese icons).
- **Type**: `() => Promise<void>`

#### onChange

- **Function Description**: Triggered when switching languages, updates the current language and refreshes the page.
- **Type**: `(value: RuntimeLanguage) => void`
- **Parameters**:
  - `value`: Selected language object.

#### reloadMaskProcess

- **Function Description**: Reload language component logic, initialize the language list and current language.
- **Type**: `(reloadParameters: ReloadMaskCallChainingParameters) => Promise<void>`
- **Parameters**:
  - `reloadParameters`: Reload parameters.

### 4. UserWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  MaskWidget.Token({
    widget: 'user'
  })
)
export class UserWidget extends MaskWidget
```

**Attributes**:

- matched: Routing matching information. (`Matched`)
- pamirsUser$: User information subscription object. (`WidgetSubjection<PamirsUser>`)
- router: Routing instance. (`Router`)
- userInfo: User information (including basic information and user details). (`UserInfo | undefined`)

**Methods**:

#### executeAction

- **Function Description**: Execute user-related operations (view actions, server actions, URL actions, client actions).
- **Type**: `(action: RuntimeAction) => Promise<void>`
- **Parameters**:
  - `action`: Runtime action object, including action type, model, name, etc.

#### fetchUserInfo

- **Function Description**: Get user basic information.
- **Type**: `() => Promise<UserInfo>`
- **Return Value**: User information Promise object.

#### initUserInfo

- **Function Description**: Initialize user information, fetch from the server if not loaded.
- **Type**: `() => Promise<void>`

#### logout

- **Function Description**: User logout operation.
- **Type**: `() => void`

#### reloadMaskProcess

- **Function Description**: Reload user component logic, initialize user information.
- **Type**: `(reloadParameters: ReloadMaskCallChainingParameters) => Promise<void>`
- **Parameters**:
  - `reloadParameters`: Reload parameters.

## (Ⅳ) Layout Components

### 1. MaskBlockWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  MaskWidget.Token({
    dslNodeType: 'block'
  })
)
export class MaskBlockWidget extends BaseMaskLayoutWidget
```

**Attributes**:

- classNames: Class name array of the component, inherited from the parent class and appended with `['k-layout-block']`. (`string[] | undefined`)

### 2. MaskContainerWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  MaskWidget.Token({
    dslNodeType: 'container'
  })
)
export class MaskContainerWidget extends BaseMaskLayoutWidget
```

**Attributes**:

- classNames: Class name array of the component, inherited from the parent class and appended with `['k-layout-container', 'oio-scrollbar']`. (`string[] | undefined`)

### 3. MaskContentWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  MaskWidget.Token({
    dslNodeType: 'content'
  })
)
export class MaskContentWidget extends BaseMaskLayoutWidget
```

**Attributes**:

- classNames: Class name array of the component, inherited from the parent class and appended with `['k-layout-content oio-scrollbar']`. (`string[] | undefined`)

### 4. MaskHeaderWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  MaskWidget.Token({
    dslNodeType: 'header'
  })
)
export class MaskHeaderWidget extends BaseMaskLayoutWidget
```

**Attributes**:

- classNames: Class name array of the component, inherited from the parent class and appended with `['k-layout-header']`. (`string[] | undefined`)

### 5. MaskRootWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  MaskWidget.Token({
    dslNodeType: 'mask'
  })
)
export class MaskRootWidget extends BaseMaskLayoutWidget
```

**Attributes**:

- classNames: Class name array of the component, inherited from the parent class and appended with `['k-layout-mask']`. (`string[] | undefined`)

### 6. MaskSidebarWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  MaskWidget.Token({
    dslNodeType: 'sidebar'
  })
)
export class MaskSidebarWidget extends BaseMaskLayoutWidget
```

**Attributes**:

- classNames: Class name array of the component, inherited from the parent class and appended with `['k-layout-sidebar']`, and when `mode` is `horizontal`, append `['k-layout-sidebar-horizontal']`. (`string[] | undefined`)
- mode: Sidebar display mode, optional: `horizontal`, `inline`. Default: `inline`. (`horizontal | inline`)

## (Ⅴ) Other Components

### 1. DividerWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  MaskWidget.Token({
    widget: 'divider'
  })
)
export class DividerWidget extends BaseMaskWidget
```