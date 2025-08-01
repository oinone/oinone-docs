---
title: Chapter 1:Widget
index: true
category:
  - Development Manual
  - Tutorials
  - Discover the Front-end Framework
order: 1
prev:
  text: Discover the Front-end Framework
  link: /en/DevManual/Tutorials/DiscoverTheFront-endFramework/README.md
---
This chapter introduces the Widget framework, a component system tailored for Oinone. The main components of Widget are `TypeScript` components and `Vue` components.

In Oinone, every part of the user interface is managed by a component: these components carry relevant logic and define templates for presenting the UI. In practice, a component is represented by a small TypeScript class that inherits from the "VueWidget" class.

To start learning, you need a running Oinone service and a configured development environment. Before proceeding with the exercises, ensure you've followed all steps described in the setup guide of this tutorial.

:::warning Tip

If you use Google Chrome as your web browser, you can install the Vue DevTools extension. This extension provides many features to help you understand and剖析 any Vue-based application.

More Vue toolchain: [Browser Developer Plugins](https://cn.vuejs.org/guide/scaling-up/tooling.html#browser-devtools)

:::

In this chapter, we learn the basic functions of Widget component development by registering a "Layout," aiming to study Widget components themselves without relying on the Oinone server.

# I. Start with "Resource - Country Group"

Before learning, we need to switch to a unified page to facilitate learning the Widget framework without relying on the backend or other designers.

Select "Resources" from the module switch in the upper left corner of the page. After entering "Resources," choose "Country Groups" from the left menu to see the following page, where we'll complete all subsequent operations.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/ExploreFrontendFramework/chapter-1/test1.gif)

Next, let's create the first component!

# II. Take the "Counter" Component as an Example

First, let's look at a simple example. The counter component shown below is a component that maintains an internal value, displays the value, and updates the value whenever the user clicks a button.

:::info Objective: By the end of this section, a Widget component should be created, but it cannot be displayed on the page yet.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/ExploreFrontendFramework/chapter-1/info1.gif)

:::

As with conventional Vue components, we use a `.vue` file to create the component for rendering. This component receives two properties: a `value` for displaying the counter and an `onIncrement` method for modifying the `value` when the button is clicked.

In the `template`, we use the `value` property, display it on the page, and add a button. We also specify the click attribute on the button to trigger the `onIncrement` method each time the button is clicked.

``` vue
<template>
  <div class="counter-demo">
    <span>Count: {{ value }}</span>
    <button @click="onIncrement">Increment</button>
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

:::warning Tip

All sample codes are demonstrated based on Vue2+TS syntax. Readers accustomed to Vue3 syntax can modify the writing style accordingly.

:::

To create a `Widget` component, we first select an appropriate base component for registration; this example uses `BaseElementWidget`. Then, register the component with the `@SPI.ClassFactory` decorator. Next, in the `initialize` method, associate the Widget with the Vue component via the `setComponent` method. Finally, use the `@Widget.Reactive` and `@Widget.Method` decorators to provide props for the Vue component.

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

The directory structure under the `oinone-frontend-tutorials` project is as follows:

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

:::info Note

The `index.ts` under each directory exports files that need to be `exported` in the current directory, which are finally imported in `main.ts`.

:::

:::danger Warning

When importing in `main.ts`, the import directory needs to be placed after the import of `@oinone/kunlun-dependencies`; otherwise, the page will not render correctly.

The import order affects the component registration order. To override platform-built components, it is recommended to append the `import` statement after the last `import`.

:::

Next, we can use the component in a "Layout" as follows.

``` xml
<element widget="Counter"/>
```

:::warning Tips

For more information about element components, refer to: [Element](/en/DevManual/Reference/Front-EndFramework/Widget/element.md)

:::

# III. Display the "Counter" Component on the Page

As the first exercise, let's create a `register.ts` file in the `oinone-frontend-tutorials/src/layout` directory to insert the counter between two "groups".

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

Finally, we can see the following effect on the page:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/ExploreFrontendFramework/chapter-1/count.gif)

:::warning Tip

If the above effect is not visible, check if each relevant file is correctly imported via `main.ts` using `console.log`.

:::

:::info Note

The first two sections may be the only sections where you can see the complete component code. From this section onward, readers need to write practice codes independently for other sections.

:::

# IV. A Simple Card Component

Components are indeed the most natural way to divide complex UIs into reusable parts. But to make them truly useful, it's necessary to communicate information between them. Let's see how components provide information by using properties (most commonly props).

:::info Objective

The goal of this section's exercise is to create a Card component that accepts two properties: title and content.

:::

For example, here's how it's used:

``` xml
<element widget="SimpleCard" title="This is the title" content="This is the content" />
```

:::danger Warning

Since Oinone has a built-in card component, `card` cannot be used as the component name. The example component uses `SimpleCard` for illustration.

:::

The `template` of the Vue component in the above example is as follows:

``` typescript
<template>
  <div class="simple-card-demo">
    <h5 class="simple-card-demo-title">{{ title }}</h5>
    <p class="simple-card-demo-content">{{ content }}</p>
  </div>
</template>
```

Similar to the "Counter" component, we need to create a Widget component for registration and associate it with the corresponding Vue component.

Different from before, we need to obtain the title and content from the "Layout" and use the corresponding values in the Vue component.

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

:::warning Tip

When developing `Widget` components, novices often forget to export components in `index.ts` of the current directory. This is a key step in component registration; without it, the component cannot be used normally in "Layout".

:::

We can continue to modify `oinone-frontend-tutorials/src/layout/register.ts` to use this card component.

In the "Layout", wrap the four card components using a `div` tag and declare a `class` name to specify the `css` style.

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
        <element widget="SimpleCard" title="This is title 1" content="This is content 1" />
        <element widget="SimpleCard" title="This is title 2" content="This is content 2" />
        <element widget="SimpleCard" title="This is title 3" content="This is content 3" />
        <element widget="SimpleCard" title="This is title 4" content="This is content 4" />
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

To make our cards look better, we just need to use the following style definition in the `SimpleCard.vue` file:

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

Finally, we can see the following effect on the page:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/ExploreFrontendFramework/chapter-1/card.png)

# V. Universal Card with Slots

In a previous exercise, we built a simple Card component. But to be honest, its functionality is quite limited. What if we want to display arbitrary content in the card, such as a subcomponent? Well, that won't work because the card's content is described with a string. However, it would be very convenient if we could describe the content as a template.

This is precisely the original intention of the Widget framework's slot system: to allow writing universal components.

Let's modify the Card component to use slots:

1. Use the default slot to define the card's main content below the `content` property content.
2. Insert a component with arbitrary content, such as a Counter component.
3. Add a counter component to the first card in the previous exercise, while leaving the other cards unchanged.

Finally, we can see the following effect on the page:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/ExploreFrontendFramework/chapter-1/card2.png)

Okay, let's get started!

In the `template` of the Vue component, we can use Vue's native `slot` tag to continue rendering subcomponents downward to achieve our goal. The sample code is as follows:

``` vue
<template>
  <div class="simple-card-demo">
    <h5 class="simple-card-demo-title">{{ title }}</h5>
    <p class="simple-card-demo-content">{{ content }}</p>
    <slot />
  </div>
</template>
```

Correspondingly, we also need to modify the "Layout" to place a Counter component inside the first Card, as shown in the sample code below:

``` xml
<div class="simple-card-demo-groups">
    <element widget="SimpleCard" title="This is title 1" content="This is content 1">
        <element widget="Counter" />
    </element>
    <element widget="SimpleCard" title="This is title 2" content="This is content 2" />
    <element widget="SimpleCard" title="This is title 3" content="This is content 3" />
    <element widget="SimpleCard" title="This is title 4" content="This is content 4" />
</div>
```

:::info Extended Content

In "Layout", the rendering of sub-tags fully follows Vue's slot rendering method, so you can use Widget slots just like Vue slots.

For `named slots`, in the Vue component, you can use `<slot name="content" />` to declare a `named slot`, and in the "Layout", you can use `<template slot="content"></template>` to provide rendering content for this `named slot`.

:::

:::warning Tip

For more information about Layout, refer to: [Layout](/en/DevManual/Reference/Front-EndFramework/Widget/layout.md)

:::

# VI. Minimize Card Content

Finally, let's add a feature to the Card component to make it more interesting: we want a button to toggle the display state of the card content (show or hide).

1. Add a state to the card component to track whether the card is open (default) or closed.
2. Add a `v-if` directive in the Vue component template to conditionally render the content.
3. Add a button to the card header and modify the code to flip the state when the button is clicked.
4. (Bonus) Use animation effects to fold or unfold the card content.

# VII. Theory: Component Lifecycle and Lifecycle Functions

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/ExploreFrontendFramework/chapter-1/mind.jpeg)

A Widget component goes through many stages: it can be instantiated, rendered, mounted, updated, separated, destroyed... This is the component lifecycle. The diagram above shows the most important events in a component's lifecycle. Roughly speaking, a component is first created, then updated (possibly many times), and finally destroyed.

The Widget framework provides various built-in functions, all declared in the `VueWidget` base class. For example, if you want to execute some code when the component is mounted, you can override the `mounted` function in the current component:

``` typescript
protected mounted() {
  super.mounted();
  // do something.
}
```

:::info Note

The Widget framework uses the characteristics of object-oriented inheritance. Thus, it is inevitable that some built-in methods are exposed in custom components. To prevent custom components from causing unnecessary impacts on kernel functions, the Widget framework uses the "$$" prefix to declare framework-built methods, which should not be overridden or used by custom components unless specially necessary.

:::

:::warning Tip

For more information about component lifecycles, refer to: [Component Lifecycle](/en/DevManual/Reference/Front-EndFramework/Widget/component-lifecycle.md)

:::

# VIII. Theory: The Relationship Between Widget Components and Vue Components

At the implementation level, a Widget component is essentially a Vue component. When mounted on a page, they have a `parent-child component` relationship. That is, the Widget component, as the parent component, provides props to the Vue component. This can also be viewed in the browser using the `Vue DevTools` plugin.

Therefore, combining the lifecycles of the two components, the lifecycle execution process of a complete Widget component during rendering is as shown in the following figure:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/ExploreFrontendFramework/chapter-1/mind2.jpeg)

# IX. Focus on Input Box

:::info Objective

Complete the function of an input box that `automatically focuses` when `mounted` by following the knowledge points and tips provided below, and truly experience the relationship between Widget components and Vue components.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/ExploreFrontendFramework/chapter-1/input.png)

:::

Like any Vue component, we can use `ref` to access the Document Object Model (DOM) in the Vue component. So, let's see how to use `ref` to access the DOM in a Widget component. The main idea is that you need to mark the target element with `ref` in the Vue component template:

``` vue
<template>
  <div ref="divDom">hello world</div>
</template>
```

Then you can define and access it using the `ref` method in `TypeScript`. However, upon careful consideration, there's an issue: when the component is created, the actual HTML element corresponding to the component does not exist. It only exists when the component is mounted. So we need to define an object using `ref` in the `setup` method, which contains a key named `value` (representing the element), and this key is only defined when the component is mounted.

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

At this point, you should be able to create an input box in the Vue component that automatically focuses when mounted, similar to the following effect:

But this is not enough. To better understand the use of Widget components in real-world scenarios, we hope to implement this function in a Widget component and freely and flexibly customize this function through object-oriented inheritance.

We can provide a `setDivDom` method from the Widget component via `props` and pass the Document Object Model (DOM) obtained in the Vue component to the Widget component through the method.

Then, we can execute similar logic through the `mounted` lifecycle function provided by the Widget component to achieve an input box that automatically focuses when mounted.

:::warning Tip

Using the `@Widget.Reactive` decorator can pass Widget component properties to the Vue component. For the performance of the Vue Patch algorithm, we recommend using the decorator to declare a property only when it needs to be used in the Vue component's `props`.

:::

:::info Thinking: What responsibilities do Widget components and Vue components each undertake in the Widget framework?

Widget components, by virtue of object-oriented characteristics, can extremely conveniently extend or modify specific component functions. Compared with extension features such as混入 (mixins) and functional programming provided by Vue components, this advantage of Widget components is more significant. Precisely because of this, when developing with the Widget framework, it is very necessary to clearly divide the responsibilities of Widget components and Vue components. Specifically:
Widget components mainly undertake the important responsibility of providing properties and methods.
Vue components are mainly responsible for rendering properties and calling and triggering methods.
Although this division of responsibilities will affect the programming habits of R&D personnel to a certain extent, from an overall and long-term perspective, it is more conducive to achieving page componentization, thereby effectively improving development efficiency and promoting the smooth progress of projects.

:::