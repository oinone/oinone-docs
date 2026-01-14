---
title: 自定义动作
index: true
category:
  - 研发手册
  - 操作指南
order: 2

---
动作组件涵盖了所有用户可能进行的操作，在 Oinone 中，将所有用户可能的操作分为了四类：

+ 跳转动作（ViewAction）：点击后将在应用内进行页面跳转。
+ 链接跳转（UrlAction）：点击后将跳转到指定的URL，相当于 `window.open` 。
+ 提交动作（ServerAction）：向后端发起请求，拿到返回结果后进行处理。
+ 客户端动作（ClientAction）：仅用于前端交互。理论来说，它可以做任何事情。

针对每一种动作我们都有一些内置组件为系统正常运行提供支持，但对于复杂多样的业务场景来说，我们内置的标准交互流程可能无法覆盖全部场景，此时，我们需要通过自定义对一些动作的行为做出修改，让它在点击前或者点击后做一些额外的事情，或者替换整个动作在点击后的效果。

回想一下我们在之前做过的练习，对你来说，元素组件可能已经很熟悉了，或者你也学习过一部分字段组件相关的知识。其实自定义动作组件与其他类型组件的注册、替换等方式大同小异，让我们快速学习一下这部分内容，然后动手开始一些简单的练习吧。

# 一、理论：动作组件的注册

Widget 框架对组件进行了分类，通过分类特征，我们在注册组件时可以根据这些特征来决定组件的使用范围，使用时可以在所有注册的组件中选择一个最合适的组件进行渲染。

在这里仅简要说明一下动作组件注册的基础内容，以确保我们在接下来的学习中可以较为容易的理解一些概念。更多组件注册的相关内容可参考：[Action](/zh-cn/DevManual/Reference/Front-EndFramework/Widget/action.md)

## （一）动作组件的注册可选项{#动作组件的注册可选项}

```typescript
/**
 * Action组件注册可选项
 */
export interface BaseActionOptions extends SPIOptions {
  /**
   * 指定动作类型
   */
  actionType?: ActionType | ActionType[];
  /**
   * 指定跳转动作路由类型
   */
  target?: ViewActionTarget | string | string[];
  /**
   * 指定动作名称
   */
  name?: string | string[];
  /**
   * 指定模型
   */
  model?: string[] | string;
  /**
   * 指定视图类型
   */
  viewType?: ViewType | ViewType[];
  /**
   * 指定视图名称
   */
  viewName?: string | string[];
  /**
   * 指定组件名称或别称
   */
  widget?: string[] | string;
}
```

从上述类型声明中不难发现，其分类维度涵盖以下多个方面：动作类型、路由类型（仅跳转动作可用）、动作名称、模型编码、视图类型以及视图名称。这些维度用于描述组件的使用位置。一般而言，位置描述得越“精确”，在相应位置进行渲染时，该组件所具备的优先级也就越高。在完全相同的位置描述的情况下，后注册的组件会覆盖先注册的组件。

以 `RouterViewActionWidget` 组件为例：

```typescript
@SPI.ClassFactory(
  ActionWidget.Token({
    actionType: ActionType.View,
    target: ViewActionTarget.Router
  })
)
export class RouterViewActionWidget extends ViewActionWidget {
  ...
}
```

从注册条件我们可以看出，这个组件是跳转动作，并且仅处理打开方式为当前窗口打开这一种方式。

## （二）不同类型的动作组件

在 Oinone 中，我们对元数据中定义的四类动作都分别提供了内置组件，并实现了对应的功能。

下面是根据动作类型对一些组件还有基类进行了列举：


<table>
	<tr>
	    <th>动作类型</th>
      <th>动作组件</th>
      <th>描述</th>
      <th>基类</th>
	</tr >
	<tr>
	    <td rowspan="4">ActionType.View</td>
	    <td>RouterViewActionWidget</td>
	    <td>在应用内进行页面跳转</td>
      <td>ViewActionWidget</td>
	</tr >
	<tr>
	    <td>OpenWindowViewActionWidget</td>
	    <td>在应用内通过打开新窗口进行页面跳转</td>
	    <td>RouterViewActionWidget</td>
	</tr>
	<tr>
	    <td>DialogViewActionWidget</td>
      <td>在应用内打开弹窗</td>
      <td rowspan="2">PopupActionWidget</td>
	</tr>
	<tr>
	    <td>DrawerViewActionWidget</td>
	    <td>在应用内打开抽屉</td>
	</tr>
	<tr>
	    <td>ActionType.URL</td>
	    <td>UrlActionWidget</td>
       <td>跳转到指定的URL</td>
       <td rowspan="8">ActionWidget</td>
	</tr>
	<tr>
       <td>ActionType.Server</td>
	    <td>ServerActionWidget</td>
       <td>向后端发起请求，拿到返回结果后进行处理</td>
	</tr>
	<tr>
	    <td rowspan="6">ActionType.Client</td>
	    <td>ValidateFormActionWidget</td>
      <td>数据校验，触发表单字段校验</td>
	</tr>
	<tr>
	    <td>BackActionWidget</td>
	    <td>在应用内使用合适的方式返回</td>
	</tr>
  <tr>
	    <td>ReloadViewActionWidget</td>
	    <td>刷新数据</td>
	</tr>
  <tr>
	    <td>DeleteOneActionWidget</td>
	    <td>删除数据</td>
	</tr>
  <tr>
	    <td>TableAddOneAction</td>
	    <td>添加一行数据</td>
	</tr>
  <tr>
	    <td>BackActionWidget</td>
	    <td>复制一行数据</td>
	</tr>
</table>


## (三）在 DSL 中使用 Action 组件

```typescript
<action name="redirectCreatePage" />
```

:::warning 提示

关于动作组件的更多内容请参考：[Action](/zh-cn/DevManual/Reference/Front-EndFramework/Widget/action.md)

:::

# 二、通过注册组件替换页面上的动作

一般情况下，我们对动作组件的处理几乎都是逻辑上的变化，这一切都可以在 Widget 组件中完成。在极少数情况下我们才会对 Vue 组件进行修改。

让我们来看看如何通过 SPI 注册的方式替换页面上的动作组件，并且添加一些可能的处理逻辑吧。

## （一）使用 Vue DevTools 查看动作元数据信息

使用 `Vue DevTools` 选中指定动作，在 Components 区域选中 Action 组件下的第一个 Widget 组件，我们可以看到如下信息：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/OperationGuide/custom-field/vue-devtools.png)

从 Components 区域的组件结构来看，我们任何一个动作组件都包含了三个部分：

**Action 组件 - Widget 组件 - Vue 组件**

这三个组件在本质上都是 Vue 组件的实现，便于区分和解释，我们起了这样三个名字：

+ Action 组件：用于 `XML` 中 `action` 标签的渲染，并根据配置使用 SPI 查找相应的 Widget 组件。
+ Widget 组件：也就是由 Widget 框架提供的使用 `TypeScript Class` 声明的组件。
+ Vue 组件：在 Widget 组件的 `initialize` 方法中通过 `setComponent` 方法设置的组件。

再来看右侧部分，里面包含了当前选中的 Vue 组件所有可视信息：`props`、`attrs`、`setup` 等。通过过滤条件，我们仅查看 “template” 相关的内容，可以看到有这样两个属性：`action` 和 `template` 。

+ action：动作元数据。根据 template 属性经过转换和处理的对象。`TypeScript` 类型为 `RuntimeAction` 及其子类。非响应式对象。
+ template：由`XML`转换为 `JSON` 格式的原始数据对象。`TypeScript` 类型为 `DslDefinition` 及其子类。

## （二）通过模型和动作名称替换组件

通过 `Vue DevTools` 我们看到对应的 Widget 组件为 `RouterViewActionWidget` ，并且 `action` 属性中 `model` 属性为 `resource.ResourceCountryGroup`，`name` 属性为 `redirectCreatePage`。

让我们继承 `RouterViewActionWidget` 创建 `CustomRouterViewActionWidget` 并注册来完成我们的替换，就像下面这样：

```typescript
@SPI.ClassFactory(
  ActionWidget.Token({
    actionType: ActionType.View,
    target: ViewActionTarget.Router,
    model: 'resource.ResourceCountryGroup',
    name: 'redirectCreatePage'
  })
)
export class CustomRouterViewActionWidget extends RouterViewActionWidget {
  ...
}
```

这样我们就可以替换 `resource.ResourceCountryGroup` 模型下所有名称为 `redirectCreatePage` 的动作了。

:::warning 提示

一般情况下，我们通过模型和动作名称替换组件就可以达到我们的目的。对于一个模型的所有动作来说，名称相同的动作意味着具备相同的功能。在某些特殊情况下，相同的动作，根据放置的位置不同，而具备不同功能，这也是有可能出现的，但我们无法举出比较合适的例子来解释这个问题。

出现这个问题时，我们需要根据 [动作组件注册可选项](#动作组件的注册可选项) 中的其他参数来灵活解决这个问题，在下一小节中提供了 [通过视图名称和动作名称替换组件](#通过视图名称和动作名称替换组件) 的方式。

:::

替换后通过 `Vue DevTools` 再查看这个动作，我们可以发现对应的 Widget 组件已经替换为 `CustomRouterViewActionWidget` 组件了。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/OperationGuide/custom-field/CustomRouterViewActionWidget.png)

## （三）通过视图名称和动作名称替换组件{#通过视图名称和动作名称替换组件}

使用模型和动作名称替换组件有一个不可避免的问题：在其他页面中也使用这个动作的情况下，可能会导致意料之外的替换。那么，如何解决这个问题呢？

让我们修改一下注册条件，来通过视图名称和动作名称替换组件：

```typescript
@SPI.ClassFactory(
  ActionWidget.Token({
    actionType: ActionType.View,
    target: ViewActionTarget.Router,
    viewName: '国家分组table',
    name: 'redirectCreatePage'
  })
)
export class CustomRouterViewActionWidget extends RouterViewActionWidget {
  ...
}
```

这样我们就可以替换 `国家分组table` 视图下所有名称为 `redirectCreatePage` 的动作了。

## （四）如何获取视图名称

之前我们已经使用 `Vue DevTools` 找到了 `RouterViewActionWidget` 组件，现在可能已经变成了 `CustomRouterViewActionWidget` 组件。让我们以这个组件为起点，向父组件的方向查找 `View` 组件，遇到的第一个最近的 View 组件就是我们的目标组件，如下图所示：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/OperationGuide/custom-field/viewname.png)

由此我们可以看到视图的名称为 `国家分组table`，这和我们之前注册条件中填写的一致。

# 三、在跳转动作执行之前处理

在上一节中，我们已经通过 `CustomRouterViewActionWidget` 组件替换了一个跳转动作，接下来，让我们在动作执行之前做点处理。

我们可以通过重写 `RouterViewActionWidget` 组件提供的 `executeAction` 方法追加逻辑。就像下面这样：

```typescript
protected executeAction(action: RuntimeViewAction, parameters: UrlQueryParameters): void {
  // do something.
  super.executeAction(action, parameters);
}
```

:::warning 提示

这里需要注意的一点是，跳转动作的打开方式不同，其处理数据的方式也不同。这里我们仅列举了通过 `当前窗口打开` 这种打开方式的跳转动作在代码中追加逻辑。

这里需要注意的一点是，在跳转动作执行后页面会发生卸载，不要把追加的逻辑放在跳转动作执行之后。

:::

# 四、在提交动作执行之前处理

让我们通过重写 “删除” 按钮看看如何在提交动作之前进行一些处理。

用上面提到的替换方法，让我们继承 `ServerActionWidget` 组件创建 `CustomServerActionWidget` 组件并注册来完成我们的替换，就像下面这样：

```typescript
@SPI.ClassFactory(
  ActionWidget.Token({
    actionType: ActionType.Server,
    model: 'resource.ResourceCountryGroup',
    name: 'delete'
  })
)
export class CustomServerActionWidget extends ServerActionWidget {
  ...
}
```

我们可以通过 `ServerActionWidget` 组件中提供的 `executeAction` 方法追加逻辑。就像下面这样：

```typescript
protected async executeAction(action: RuntimeServerAction, submitValue: SubmitValue): Promise<ClickResult> {
  // do something before execute action.
  const res = await super.executeAction(action, submitValue);
  // do something after execute action.
  return res;
}
```

# 六、创建一个客户端动作

由于客户端动作的特殊性，我们无法像其他动作那样提供一些默认功能，但动作最终呈现在页面上的按钮样式是一致的。那么，我们可以通过继承 `ActionWidget` 组件来实现这个动作，就像下面这样：

```typescript
@SPI.ClassFactory(
  ActionWidget.Token({
    name: 'custom-action'
  })
)
export class CustomClientActionWidget extends ActionWidget {
  ...
}
```

我们可以通过 `ActionWidget` 组件提供的 `clickAction` 方法实现任何逻辑。就像下面这样：

```typescript
protected clickAction(): ReturnPromise<ClickResult> {
  // do something.
  return true;
}
```

# 七、理论：动作的点击流程

在动作点击时，我们通常按以下流程执行：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/OperationGuide/custom-field/click.jpeg)

在 Vue 组件中渲染在页面上的 `OioButton` 组件发出的 `@click事件` 通过调用 Widget 组件提供的 `validateAndClick` 方法执行标准的点击流程。

+ validatorForm：表单验证结果。当验证通过，则继续执行，否则中断。未配置验证表单时默认通过。
+ validateConfirm：二次确认结果。当用户在二次确认框中点击 “确定” 时表示通过，则继续执行，否则中断。未配置二次确认时默认通过。
+ clickAction：执行一段逻辑。当返回 `false` 时中断，否则继续执行。
+ clickActionAfter：在动作执行成功后执行。

# 八、理论：ClickResult 类型

让我们先来看一下在 `TypeScript` 中 `ClickResult` 类型定义：

```typescript
export type ReturnVoid = null | undefined | void;

export type ClickResult = ReturnVoid | boolean | Record<string, unknown> | Record<string, unknown>[];
```

对于不同的动作，点击结果的返回值可能有：

+ ReturnVoid：任意空值或无返回值。
+ boolean：用于判定是否执行点击后执行的操作。
+ 对象或对象数组：在调用 `ServerAction#executeAction` 后可能返回其中一种类型的数据，取决于后端接口的定义。

