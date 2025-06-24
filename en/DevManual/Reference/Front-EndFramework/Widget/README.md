---
title: Widget
index: true
category:
  - R&D Manual
  - Reference
  - Front-End API
  - Widget
dir:
  link: true
  order: 4
next:
  text: component-lifecycle
  link: /en/DevManual/Reference/Front-EndFramework/Widget/component-lifecycle.md
---
The Oinone Kunlun framework uses a self-developed Widget framework. It is a declarative component system whose design is roughly inspired by `Vue` and `React`. Components are defined through `TypeScript Class` and registered via `SPI` decorators. Widgets feature a complete `component lifecycle`, `properties`, `reactive properties`, `computed properties`, etc., similar to the Vue framework.

:::warning Note:

It is important to note that part of the article uses `Widget` as the component, and part uses `Component` as the component. In the Widget framework, these two concepts are clearly distinguished.

+ Widget: Refers to components defined through `TypeScript Class`.
+ Component: The actual rendering component bound to `TypeScript Class`. In components implemented using the `Vue` framework, it usually refers to `Vue` components.

:::

# I. Using Widget Components in DSL

You can use `Widget` components through the `XML` tags provided by the Widget framework:

``` xml
<field data="code" widget="Input" />
```

This example shows that Widget components only need to be defined and used through XML templates.

Moreover, Widget components provide a series of attributes, which are still defined and used through XML templates:

``` xml
<field data="code" widget="Input" maxLength="100" />
```

This example attribute will limit the number of `characters` that can be entered in the input box to within `100`.

# II. Component Registration

Taking field components as an example, we can register a special input box via SPI, where the entered content will be displayed in red font: (This is the example in the [Customize a field widget](/en/DevManual/OperationGuide/customize-a-field-widget.md#iii-creating-a-new-form-field-widget) section)

``` typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Form,
    ttype: ModelFieldType.String,
    widget: 'RedInput'
  })
)
export class FormRedInputWidget extends FormFieldWidget<string> {
  ...
}
```

# III. Reactive Variables

We can define a property in a Widget component and decorate it with the `@Widget.Reactive` decorator to define a reactive variable:

``` typescript
@Widget.Reactive()
public title: string | undefined;
```

This is equivalent to defining a variable using the `ref` method in the Vue framework:

``` typescript
const title = ref<string | undefined>();
```

We can also assign a default value to the variable:

``` typescript
@Widget.Reactive()
public title: string = 'Title';
```

This is equivalent to defining a variable with a default value using the `ref` method in the Vue framework:

``` typescript
const title = ref<string>('Title');
```

# IV. Computed Properties

We can define a `get` method property in a Widget component and decorate it with the `@Widget.Reactive` decorator to define a computed property:

``` typescript
@Widget.Reactive()
public get title() {
  return this.getDsl().title || 'Title';
}
```

This is equivalent to defining a computed property using the `computed` method in the Vue framework:

``` typescript
const title = computed(() => this.getDsl().title || 'Title');
```

:::danger Warning

This code cannot run normally in a Vue component; it is only shown here as an example.

:::

:::warning Tip

The Widget framework currently does not support defining `set` method properties at the same time. Computed properties in the Widget framework are currently all `read-only`. This is because they are ultimately passed to Vue components via `props`, and as is well known, `props` in Vue components are not allowed to be modified.

:::

# V. Methods

We can define a method in a Widget component and decorate it with the `@Widget.Method` decorator to pass it into the `props` of a Vue component for use:

``` typescript
@Widget.Reactive()
public title: string = 'Title';

@Widget.Method()
public setTitle(title: string) {
  this.title = title;
}
```

# VI. Provide / Inject

We can use a combination of the `@Widget.Provide` and `@Widget.Inject` decorators in Widget components to pass properties and methods between parent and child components.

For example, for the design of the minimum width property, we can configure the minimum width for each child component in the parent component, or directly configure the minimum width in the child component, with the child component's value taking precedence over the parent component's value. We can implement this as follows:

**Parent Component**:

``` typescript
@Widget.Provide()
@Widget.Reactive()
public get minWidth(): number | null | undefined {
  return NumberHelper.toNumber(this.getDsl().minWidth);
}
```

**Child Component**:

``` typescript
@Widget.Inject('minWidth')
@Widget.Reactive()
public parentMinWidth: number | null | undefined;

@Widget.Reactive()
public get minWidth(): number | null | undefined {
  let minWidth = NumberHelper.toNumber(this.getDsl().minWidth);
  if (minWidth == null) {
    minWidth = this.parentMinWidth;
  }
  return minWidth;
}
```

:::warning Tip

The Provide / Inject used in Widget components is implemented based on Vue. It is exactly the same as Vue's dependency injection in terms of principles and operating results.

For more content on Provide / Inject, please refer to: [Vue Dependency Injection](https://cn.vuejs.org/guide/components/provide-inject)

:::

# VII. Watch

We can use the `@Widget.Watch` decorator to modify methods in Widget components to implement listening for changes in reactive properties. For example, in a form, we can listen for changes in the code and perform some processing:

``` typescript
@Widget.Watch('formData.code')
protected watchCode(newVal: string | null | undefined, oldVal: string | null | undefined) {
  // do something.
}
```

Similar to Vue's watch method, `@Widget.Watch` also provides support for `deep` and `immediate` properties. For example, listening for any data changes in a form and performing some processing:

``` typescript
@Widget.Watch('formData', { deep: true, immediate: true })
protected watchFormData(newVal: ActiveRecord | undefined, oldVal: ActiveRecord | undefined) {
  // do something.
}
```

:::warning Tip

`@Widget.Watch` only provides listening based on reactive properties, and the hierarchy can be deepened to a certain property of an object through dot (.) separation.

For more information on Vue Watch, please refer to: [Vue Watch](https://cn.vuejs.org/api/reactivity-core.html#watch)

:::

# VIII. SubContext / BehaviorSubContext

We can conveniently use the `publish/subscribe` mechanism implemented based on `rxjs` in Widget components. Let's take a look at how the `publish/subscribe` mechanism is used in Widget components.

Define a `Symbol` constant in `stream.ts` to declare the `key` corresponding to the observer, which will be used in both the "publisher" and "subscriber":

``` typescript
const subContextSymbol = Symbol('subContext');
```

First, define a "subscriber" component (`Widget1.ts`):

``` typescript
@Widget.SubContext(subContextSymbol)
protected subContext$!: WidgetSubjection<boolean>;

protected doSubject() {
  this.subContext$.subscribe((value) => {
    // do something.
  });
}

protected mounted() {
  // Initiate subscription during component mounted
  this.doSubject();
}
```

Then define a "publisher" component (`Widget2.ts`):

``` typescript
@Widget.SubContext(subContextSymbol)
protected subContext$!: WidgetSubjection<boolean>;

protected doPublish() {
  this.subContext$.subject.next(true);
}
```

When we call the `doSomething` method in the `Widget2.ts` component, the corresponding subscription method in the `Widget1.ts` component will be executed, and the latest value can be obtained.

`BehaviorSubContext` is almost identical to `SubContext` in usage, with the only difference being that when subscribing for the first time, it will trigger a `subscription function`. This feature is similar to the functionality of the `immediate` property in `watch`.

:::warning Tip:

The `publish/subscribe` mechanism is a `point-to-point (P2P)` communication method provided by Widget components. It does not need to care about component hierarchy issues. As long as the "publisher" and "subscriber" exist simultaneously on a page, communication between the two components can be achieved.

For more information on rxjs, please refer to: [RxJS](https://cn.rx.js.org/manual/index.html)

:::

# IX. Inheritance and Polymorphism

The Widget framework uses `TypeScript Class` to define components, inherently possessing the three major characteristics of `object-oriented programming`: encapsulation, inheritance, and polymorphism.

Through `inheritance`, you can obtain all the properties, methods, and functions of the `parent component`, while supporting customized development through the `override` mechanism. This is one of the core features that distinguish the Widget framework from other front-end frameworks.

Taking the `RedInput` component as an example, if you need to adjust the font style of the input content and the built-in component does not provide this functionality, you can `inherit` from the parent component `FormStringFieldSingleWidget` to extend the font style customization logic while retaining the original functionality.

``` typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Form,
    ttype: ModelFieldType.String,
    widget: 'RedInput'
  })
)
export class FormStringRedInputWidget extends FormStringFieldSingleWidget {
  ...
}
```

:::warning Tip

Regrettably, Vue components do not have a well-supported inheritance mechanism. Sometimes, to make minor modifications to built-in components, we have to copy the entire built-in Vue component into the project and modify it.

:::