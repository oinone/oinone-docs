---
title: 章节 1： 组件（Widget）
index: true
category:
  - 研发手册
  - 教程
  - 探索前端框架
order: 1
prev:
  text: 探索前端框架（Discover the Front-end Framework）
  link: /v6/zh-cn/DevManual/Tutorials/DiscoverTheFront-endFramework/README.md
---
本章介绍了 Widget 框架，它是为 Oinone 量身定制的组件系统。Widget 组件的主要组成部分是 `TypeScript` 组件和 `Vue` 组件。

在 Oinone 中，用户界面的每个部分都由一个组件来管理：这些组件承载着相关逻辑，并定义了用于呈现用户界面的模板。实际上，一个组件由一个继承自 “VueWidget” 类的小型 TypeScript 类来表示。

要开始学习，你需要有一个正在运行的 Oinone 服务以及已设置好的开发环境。在进行练习之前，请确保你已按照本教程设置指南中描述的所有步骤操作。

:::warning 提示

如果你使用谷歌浏览器（Chrome）作为你的网络浏览器，你可以安装 Vue 开发者工具扩展程序。这个扩展程序提供了许多功能，可帮助你理解和剖析任何基于 Vue 的应用程序。

更多 Vue 工具链：[浏览器开发者插件](https://cn.vuejs.org/guide/scaling-up/tooling.html#browser-devtools)

:::

在本章中，我们使用注册“布局（Layout）”的方式学习 Widget 组件的开发基本功能。目标是学习 Widget 组件本身，而不依赖 Oinone 服务端。

# 一、从“资源-国家分组”开始

在进行学习之前，我们需要切换至一个统一的页面，这样可以让我们更方便的学习 Widget 框架而不依赖后端或其他设计器。

从页面左上角的模块切换中选择“资源”，进入“资源”之后，在左侧菜单中选择“国家分组”，可以看到有如下所示页面，我们接下来所有的操作都在这一个页面完成。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/ExploreFrontendFramework/chapter-1/test1.gif)

接下来，我们来创建第一个组件吧！

# 二、以“计数器”组件为例

首先，让我们来看一个简单的例子。下面展示的计数器（Counter）组件是一个维护内部数值、显示该数值并且每当用户点击按钮时就更新该数值的组件。

:::info 目标：在本节结束时，应创建了一个 Widget 组件，但它还不能显示在页面上

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/ExploreFrontendFramework/chapter-1/info1.gif)

:::

如同 Vue 组件的常规做法，我们会借助一个 `.vue` 文件来创建用于渲染的组件。此组件仅接收两个属性：一个是用于展示的计数值 `value`，另一个是用于在按钮被点击时修改 `value` 值的 `onIncrement` 方法。

在 `template` 模板里，我们会使用 `value` 属性并将其显示在页面上，随后添加一个按钮。同时，在按钮上指定点击属性，这样每次点击按钮时就能触发 `onIncrement` 方法。

``` vue
<template>
  <div class="counter-demo">
    <span>计数: {{ value }}</span>
    <button @click="onIncrement">递增</button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Counter',
  components: {},
  inheritAttrs: false,
  props: {
    value: {
      type: Number
    },
    onIncrement: {
      type: Function
    }
  }
});
</script>
<style lang="scss">
.counter-demo {
  padding: 4px;

  button {
    margin-left: 10px;
  }
}
</style>
```

:::warning 提示

所有示例代码均基于Vue2+TS语法进行演示，习惯使用Vue3语法的读者，可以自行修改写法。

:::

我们开始创建 `Widget` 组件，需先选合适基础组件完成注册，此示例选用 `BaseElementWidget`。随后，用 `@SPI.ClassFactory` 装饰器注册该组件。接着，在 `initialize` 方法里，通过 `setComponent` 方法关联 Widget 与 Vue 组件。最后，用 `@Widget.Reactive` 和 `@Widget.Method` 装饰器为 Vue 组件提供 props。

``` typescript
import { BaseElementWidget, SPI, Widget } from '@oinone/kunlun-dependencies';
import Counter from './Counter.vue';

@SPI.ClassFactory(
  BaseElementWidget.Token({
    widget: 'Counter'
  })
)
export class CounterWidget extends BaseElementWidget {
  public initialize(props) {
    super.initialize(props);
    this.setComponent(Counter);
    return this;
  }

  @Widget.Reactive()
  public value: number = 0;

  @Widget.Method()
  public onIncrement() {
    this.value += 1;
  }
}
```

组件在`oinone-frontend-tutorials`工程下的目录结构如下：

``` plain
oinone-frontend-tutorials
└── src
    ├── layout
    │   ├── index.ts
    │   └── register.ts
    ├── main.ts
    └── widgets
        ├── counter
        │   ├── Counter.vue
        │   ├── CounterWidget.ts
        │   └── index.ts
        └── index.ts
```

:::info 注意

每个目录下的`index.ts`将导出当前目录下需要`export`的文件，并最终通过`main.ts`中进行导入。

:::

:::danger 警告

在`main.ts`中导入时，需要将导入目录放置在`@oinone/kunlun-dependencies`的导入之后，否则将导致页面无法正常渲染。

导入顺序将影响组件注册顺序，如需覆盖平台内置组件，建议将`import`语句在最后一个`import`后进行追加。

:::

接下来，我们可以使用如下方式在“布局（Layout）”中使用该组件。

``` xml
<element widget="Counter"/>
```

:::warning 提示s

更多关于元素组件的内容请参考：[Element](/zh-cn/DevManual/Reference/Front-EndFramework/Widget/element.md)

:::

# 三、将“计数器”组件显示在页面上

作为第一个练习，让我们在位于 `oinone-frontend-tutorials/src/layout` 目录下创建 `register.ts` 文件，将计数器插入到两个“分组”的中间。

``` typescript
import { registerLayout, ViewType } from '@oinone/kunlun-dependencies';

registerLayout(
  `<view type="TABLE">
    <pack widget="group">
        <view type="SEARCH">
            <element widget="search" slot="search" slotSupport="field">
                <xslot name="searchFields" slotSupport="field" />
            </element>
        </view>
    </pack>
    <element widget="Counter" />
    <pack widget="group" slot="tableGroup">
        <element widget="actionBar" slot="actionBar" slotSupport="action">
            <xslot name="actions" slotSupport="action" />
        </element>
        <element widget="table" slot="table" slotSupport="field">
            <element widget="expandColumn" slot="expandRow" />
            <xslot name="fields" slotSupport="field" />
            <element widget="rowActions" slot="rowActions" slotSupport="action" />
        </element>
    </pack>
</view>`,
  {
    model: 'resource.ResourceCountryGroup',
    viewType: ViewType.Table
  }
);
```

最终我们可以在页面上看到如下效果：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/ExploreFrontendFramework/chapter-1/count.gif)

:::warning 提示

如果无法看到以上效果，可以通过使用 `console.log`检查每个相关文件是否正确通过 `main.ts`进行导入。

:::

:::info 注意

前面两节内容可能是你唯一可以看到完整组件代码的小节，从这一小节之后的其他小节内容都需要读者自行编写练习代码。

:::

# 四、理论：布局的注册

从上面我们使用的 `registerLayout` 方法来看，有两个必要的参数：布局模板和布局可选项。

通常情况下，布局模板我们可以基于默认布局模板进行修改，以达到业务需求，也可以在学习了更多内容之后自由使用，总而言之，布局模板是用来描述一个页面的主要组件和组件与组件之间的相对位置的。

对于布局可选项，它是注册布局的条件参数，只有在满足条件的页面中才可以使用对应的布局模板。常见的布局可选项有：

+ viewType：视图类型
+ model：模型编码
+ actionName：动作名称
+ viewName：视图名称

上面的示例中，我们用到了其中三个，视图类型 `Table` ，模型编码 `resource.ResourceCountryGroup`以及动作名称 `resource#国家分组`。

在这里我们不需要了解过多参数的含义，只需要学会通过浏览器的地址栏获取 `URL` 对应的参数值进行注册即可。

以 “资源-国家分组” 页面为例，`URL` 可以是：

```javascript
/page;module=resource;viewType=TABLE;model=resource.ResourceCountryGroup;action=resource%23国家分组;scene=resource%23国家分组;target=OPEN_WINDOW;menu=%7B"selectedKeys":%5B"国家分组"%5D,"openKeys":%5B"地址库","地区"%5D%7D
```

通过 `decodeURIComponent` 对地址进行解码，可以得到：

```javascript
// 浏览器控制台（console）输入
decodeURIComponent('/page;module=resource;viewType=TABLE;model=resource.ResourceCountryGroup;action=resource%23国家分组;scene=resource%23国家分组;target=OPEN_WINDOW;menu=%7B"selectedKeys":%5B"国家分组"%5D,"openKeys":%5B"地址库","地区"%5D%7D')

// 执行结果
'/page;module=resource;viewType=TABLE;model=resource.ResourceCountryGroup;action=resource#国家分组;scene=resource#国家分组;target=OPEN_WINDOW;menu={"selectedKeys":["国家分组"],"openKeys":["地址库","地区"]}'
```

从解码的结果来看，我们可以得到以下这些内容：（为了方便起见，我们将参数转换为 JSON 格式进行查看）

```json
{
    "module": "resource",
    "viewType": "TABLE",
    "model": "resource.ResourceCountryGroup",
    "action": "resource#国家分组",
    "target": "OPEN_WINDOW",
    "menu": {
        "selectedKeys": [
            "国家分组"
        ],
        "openKeys": [
            "地址库",
            "地区"
        ]
    }
}
```

其中，`viewType` 参数是视图类型，在代码中通过 `ViewType`枚举进行使用；`model` 参数是模型编码，同布局可选项中的 `model` 属性；`action` 参数是动作名称，同布局可选项中的 `actionName` 属性。

在 Oinone 中，大多数的页面都可以通过这样的方式找到对应的注册条件，以达到修改页面布局的目的。但实际上注册条件的查找逻辑相对比较复杂，对于刚接触 Oinone 前端框架的读者来说不太容易理解，让我们先用这种较为简单的方式做起来。

:::warning 提示

更多关于 布局 相关的内容请参考：[Layout](/zh-cn/DevManual/Reference/Front-EndFramework/Widget/layout.md)

:::

# 五、一个简单的卡片组件

组件确实是将复杂的用户界面划分为多个可重用部分的最自然的方法。但是，为了使它们真正有用，有必要能够在它们之间传达一些信息。让我们看看组件如何通过使用属性（最常见的是props）提供信息。

:::info 目标

本节练习的目标是创建一个卡片（Card）组件，该组件接受两个属性：标题（title）和内容（content）。

:::

例如，下面是它的使用方式：

``` xml
<element widget="SimpleCard" title="这是标题" content="这是内容" />
```

:::danger 警告

由于 Oinone 内置了卡片组件，因此不能使用 `card` 作为组件名称，示例组件中使用 `SimpleCard` 进行说明。

:::

上述示例使用 Vue 组件的`template`模板如下所示：

``` typescript
<template>
  <div class="simple-card-demo">
    <h5 class="simple-card-demo-title">{{ title }}</h5>
    <p class="simple-card-demo-content">{{ content }}</p>
  </div>
</template>
```

与“计数器”组件类似，我们同样需要创建一个 Widget 组件进行注册，并关联对应的 Vue 组件。

与之前不同的是，我们需要从“布局（Layout）”中获取标题（title）和内容（content），并将对应的值在 Vue 组件中进行使用。

``` typescript
@Widget.Reactive()
public get title() {
  return this.getDsl().title;
}

@Widget.Reactive()
public get content() {
  return this.getDsl().content;
}
```

:::warning 提示

开发 `Widget` 组件时，新手经常忘记在当前目录的 `index.ts` 中导出组件。而这是实现组件注册的关键步骤，少了它，组件将无法在“布局（Layout）”中被正常使用。

:::

我们可以继续修改位于`oinone-frontend-tutorials/src/layout/register.ts`来使用这个卡片组件。

在“布局（Layout）”中，使用 `div` 标签将四个卡片组件进行包裹，并且声明一个 `class` 名称用于指定 `css` 样式。

``` xml
<view type="TABLE">
    <pack widget="group">
        <view type="SEARCH">
            <element widget="search" slot="search" slotSupport="field">
                <xslot name="searchFields" slotSupport="field" />
            </element>
        </view>
    </pack>
    <div class="simple-card-demo-groups">
        <element widget="SimpleCard" title="这是标题1" content="这是内容1" />
        <element widget="SimpleCard" title="这是标题2" content="这是内容2" />
        <element widget="SimpleCard" title="这是标题3" content="这是内容3" />
        <element widget="SimpleCard" title="这是标题4" content="这是内容4" />
    </div>
    <pack widget="group" slot="tableGroup">
        <element widget="actionBar" slot="actionBar" slotSupport="action">
            <xslot name="actions" slotSupport="action" />
        </element>
        <element widget="table" slot="table" slotSupport="field">
            <element widget="expandColumn" slot="expandRow" />
            <xslot name="fields" slotSupport="field" />
            <element widget="rowActions" slot="rowActions" slotSupport="action" />
        </element>
    </pack>
</view>
```

为了让我们的卡片看起来不那么难看，我们只需要在 `SimpleCard.vue` 文件中使用如下的样式定义：

``` typescript
<style lang="scss">
.simple-card-demo-groups {
  display: flex;
  column-gap: 8px;
}

.simple-card-demo {
  flex: 1;
  background-color: #ffffff;
  border: 1px solid #e3e7ee;
  border-radius: 4px;
  padding: 16px;
}
</style>
```

最终我们可以在页面上看到如下效果：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/ExploreFrontendFramework/chapter-1/card.png)

# 六、带插槽的通用卡片

在之前的一个练习中，我们构建了一个简单的卡片（Card）组件。但说实话，它的功能相当有限。要是我们想在卡片里显示一些任意内容，比如一个子组件，那该怎么办呢？嗯，这是行不通的，因为卡片的内容是用一个字符串来描述的。不过，如果我们能够将内容描述为一段模板，那就会非常方便了。

这恰恰就是 Widget 框架的插槽系统的设计初衷：允许编写通用组件。

让我们修改卡片（Card）组件以使用插槽：

1. 使用默认插槽在 `content` 属性内容下方来定义卡片的主体内容。
2. 插入带有任意内容的组件，比如一个计数器（Counter）组件。
3. 在上一个练习的第一个卡片中添加一个计数器组件，而其他的卡片保持不变。

最终我们可以在页面上看到如下效果：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/ExploreFrontendFramework/chapter-1/card2.png)

好了，让我们开始动手吧！

在 Vue 组件的`template`模板中我们可以使用 Vue 原生的 `slot` 插槽标签继续向下渲染子组件，以达到我们的目的，示例代码如下所示：

``` vue
<template>
  <div class="simple-card-demo">
    <h5 class="simple-card-demo-title">{{ title }}</h5>
    <p class="simple-card-demo-content">{{ content }}</p>
    <slot />
  </div>
</template>
```

与之对应的，我们还需要修改“布局（Layout）”，将一个计数器（Counter）组件放在第一个卡片（Card）的里面，示例代码如下所示：

``` xml
<div class="simple-card-demo-groups">
    <element widget="SimpleCard" title="这是标题1" content="这是内容1">
        <element widget="Counter" />
    </element>
    <element widget="SimpleCard" title="这是标题2" content="这是内容2" />
    <element widget="SimpleCard" title="这是标题3" content="这是内容3" />
    <element widget="SimpleCard" title="这是标题4" content="这是内容4" />
</div>
```

:::info 拓展内容

在“布局（Layout）”中，子标签的渲染完全遵循 Vue 插槽的渲染方式，因此你可以像使用 Vue 插槽一样来使用 Widget 插槽。

对于`具名插槽`，在 Vue 组件中可以使用`<slot name="content" />`来声明一个`具名插槽`，在“布局（Layout）”中可以使用`<template slot="content"></template>`为这个`具名插槽`提供渲染内容。

:::

:::warning 提示

更多关于布局（Layout）的内容请参考：[Layout](/zh-cn/DevManual/Reference/Front-EndFramework/Widget/layout.md)

:::

# 七、最小化卡片内容

最后，让我们给卡片（Card）组件添加一个功能，使其更有趣些：我们想要一个按钮来切换卡片内容的显示状态（显示或隐藏内容）。

1. 给卡片组件添加一个状态，用于跟踪卡片是处于打开状态（默认情况）还是关闭状态。
2. 在 Vue 组件模板中添加一个 `v-if` 指令，以便有条件地渲染内容。
3. 在卡片头部添加一个按钮，并修改代码，使得在点击按钮时能够翻转状态。
4. （加分项）使用动画效果将卡片内容进行折叠或展开。

# 八、理论：组件生命周期和生命周期函数

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/ExploreFrontendFramework/chapter-1/mind.jpeg)

一个 Widget 组件会经历很多阶段：它可以被实例化、渲染、挂载、更新、分离、销毁…… 这就是组件的生命周期。上面的图展示了一个组件生命周期中最重要的事件。大致来说，一个组件先被创建，然后被更新（可能会更新很多次），最后被销毁。

Widget 框架提供了各种各样的内置函数。所有这些函数都在`VueWidget`基类中被声明。例如，如果你想在组件挂载时执行一些代码，你可以在当前组件重写`mounted`函数：

``` typescript
protected mounted() {
  super.mounted();
  // do something.
}
```

:::info 注意

Widget 框架使用面向对象继承的特性，因此无法避免的是，部分内置方法被暴露在自定义组件中。为了避免自定义组件对内核功能造成不必要的影响，Widget 框架使用 “$$” 前缀作为框架内置方法进行声明，如无特殊必要，它不应该被自定义组件重写或使用。

:::

:::warning 提示

更多关于组件生命周期的内容请参考：[Component Lifecycle](/zh-cn/DevManual/Reference/Front-EndFramework/Widget/component-lifecycle.md)

:::

# 九、理论：Widget 组件与 Vue 组件的关系

Widget 组件在实现层面，其本质也是一个 Vue 组件。挂载在页面中时，它们之间是`父子组件`的关系。即 Widget 组件作为父组件向 Vue 组件提供 props。这一点也可以通过 `Vue DevTools` 插件在浏览器中可以查看。

因此，将两个组件的生命周期结合之后，一个完整的 Widget 组件在渲染时的生命周期执行过程如下图所示：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/ExploreFrontendFramework/chapter-1/mind2.jpeg)

# 十、聚焦输入框

:::info 目标

通过下述内容提供的知识点和提示信息，自行完成`挂载时` `自动聚焦`的输入框功能，并切实体会 Widget 组件与 Vue 组件的关系。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/ExploreFrontendFramework/chapter-1/input.png)

:::

和任何一个 Vue 组件相同，我们可以使用 `ref` 在 Vue 组件中访问文档对象模型（DOM）。那么，让我们看看如何使用 `ref` 在 Widget 组件中访问文档对象模型（DOM）。其主要思路是，你需要在 Vue 组件模板中用 `ref` 标记目标元素：

``` vue
<template>
  <div ref="divDom">hello world</div>
</template>
```

然后你可以在 `TypeScript` 中使用 `ref` 方法定义并访问它。然而，仔细想想会发现这里存在一个问题：当组件被创建时，该组件对应的实际 HTML 元素是不存在的。只有当组件被挂载时，它才会存在。所以我们需要在 `setup` 方法中使用`ref` 定义一个对象，该对象包含一个名为 `value`（代表元素）的键，而这个键只有在组件挂载时才会被定义。

``` vue
setup() {
  const divDom = ref<HTMLElement | undefined>();

  onMounted(() => {
    console.log(divDom.value?.textContent);
  });

  return {
    divDom
  };
}
```

至此，你应该已经可以在 Vue 组件中做出一个在挂载时自动聚焦的输入框了。类似于如下效果：

但是这还不够，为了更好的理解 Widget 组件在真实场景中的使用，我们希望将这个功能在 Widget 组件中进行实现，并可以通过面向对象继承的方式自由灵活的对这一功能进行定制。

我们可以通过 `props` 从 Widget 组件提供一个 `setDivDom` 方法，将 Vue 组件中获取的文档对象模型（DOM）通过方法传递给 Widget 组件。

然后，我们可以通过 Widget 组件提供的 `mounted` 生命周期函数执行类似的逻辑，以此实现在挂载时自动聚焦的输入框。

:::warning 提示

使用`@Widget.Reactive`装饰器可以将 Widget 组件属性向 Vue 组件传递，出于 Vue Patch 算法的性能考虑，我们建议当且仅当这个属性需要在 Vue 组件的 `props` 中使用时，再使用装饰器进行声明。

:::

:::info 思考：Widget 组件和 Vue 组件在 Widget 框架中分别承担了怎样的职责？

Widget 组件借助面向对象的特性，能够极为便捷地对组件的特定功能实现扩展或修改操作。相较于 Vue 组件所提供的混入、函数式编程等扩展特性而言，Widget 组件的这一优势更为显著。正因如此，当我们运用 Widget 框架进行开发时，对 Widget 组件与 Vue 组件的职责予以清晰划分是十分必要的。具体而言：
Widget 组件主要承担着提供属性和方法的重要职责。
Vue 组件则主要负责对属性进行渲染，以及对方法进行调用和触发。
尽管这样的职责划分在一定程度上会对研发人员的编程习惯带来影响，然而从整体和长远来看，它更有利于实现页面的组件化，进而有效地提升开发效率，促进项目的顺利推进。

:::

