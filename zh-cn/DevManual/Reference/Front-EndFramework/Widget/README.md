---
title: 组件（Widget）
index: true
category:
  - 研发手册
  - Reference
  - 前端API
  - Widget
dir:
  link: true
  order: 4
next:
  text: component-lifecycle
  link: /zh-cn/DevManual/Reference/Front-EndFramework/Widget/component-lifecycle.md
---
Oinone Kunlun 框架使用自研的 Widget 框架。它是一个声明式组件系统，其设计大致受到 `Vue` 和 `React` 的启发。组件通过 `TypeScript Class` 定义，并通过 `SPI` 装饰器进行组件注册。Widget 具备完整的与 Vue 框架类似的 `组件生命周期`、`属性`、`响应式属性`、`计算属性`等等。

:::warning 提示：

值的注意的是，文章中有一部分使用了 `Widget` 作为组件，有一部分使用了 `Component` 作为组件。在 Widget 框架中，这两个概念是有明确区分的。

+ Widget 组件：指通过 `TypeScript Class` 定义的组件。
+ Component 组件：与 `TypeScript Class` 绑定的实际渲染使用的组件。在使用 `Vue` 框架实现的组件中，通常指 `Vue` 组件。

:::

# 一、在 DSL 中使用 Widget 组件

你可以通过 Widget 框架提供的 `XML` 标签来使用 `Widget` 组件：

``` xml
<field data="code" widget="Input" />
```

此示例表明，Widget 组件只需通过 XML 模板进行定义并使用即可。

不仅如此，Widget 组件提供了一系列属性，这些属性仍然是通过 XML 模板进行定义并使用的：

``` xml
<field data="code" widget="Input" maxLength="100" />
```

此示例属性将限制输入框可输入的 `字符数` 在 `100` 位以内。

# 二、组件注册

以字段组件为例，我们可以通过 SPI 注册一个特殊的输入框，用它输入的内容将以红色字体展示：（这就是我们在 [Customize a field widget](/zh-cn/DevManual/OperationGuide/customize-a-field-widget.md#三、创建一个新的表单字段组件) 章节中的示例）

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

# 三、响应式变量

我们可以在 Widget 组件中定义一个属性，并通过 `@Widget.Reactive` 装饰器修饰，以此来定义一个响应式变量：

``` typescript
@Widget.Reactive()
public title: string | undefined;
```

这相当于 Vue 框架中使用 `ref` 方法定义变量：

``` typescript
const title = ref<string | undefined>();
```

也可以这样给变量赋予一个默认值：

``` typescript
@Widget.Reactive()
public title: string = '标题';
```

这相当于 Vue 框架中使用 `ref` 方法定义变量并赋予默认值：

``` typescript
const title = ref<string>('标题');
```

# 四、计算属性

我们可以在 Widget 组件中定义一个 `get` 方法属性，并通过 `@Widget.Reactive` 装饰器修饰，以此来定义一个计算属性：

``` typescript
@Widget.Reactive()
public get title() {
  return this.getDsl().title || '标题';
}
```

这相当于 Vue 框架中使用 `computed` 方法定义计算属性：

``` typescript
const title = computed(() => this.getDsl().title || '标题');
```

:::danger 警告

这段代码并不能在 Vue 组件中正常运行，它仅仅作为一个示例内容展示在这里。

:::

:::warning 提示

Widget 框架目前还不支持同时定义 `set` 方法属性，计算属性在 Widget 框架中目前都是 `只读` 的。因为它们最终都通过 `props` 传递到 Vue 组件中进行使用，众所周知，Vue 组件的 `props` 是不允许被修改的。

:::

# 五、方法

我们可以在 Widget 组件中定义一个方法，并通过 `@Widget.Method` 装饰器修饰，以此将其传入 Vue 组件的 `props` 进行使用：

``` typescript
@Widget.Reactive()
public title: string = '标题';

@Widget.Method()
public setTitle(title: string) {
  this.title = title;
}
```

# 六、Provide / Inject

我们可以在 Widget 组件使用 `@Widget.Provide` 和 `@Widget.Inject` 装饰器的组合，在父子组件之间进行属性和方法的传递。

例如：对于最小宽度的属性设计，我们可以在父组件为每一个子组件配置最小宽度，也可以在子组件直接配置最小宽度，并且子组件的值优先于父组件的值。我们可以这样实现：

**父组件**：

``` typescript
@Widget.Provide()
@Widget.Reactive()
public get minWidth(): number | null | undefined {
  return NumberHelper.toNumber(this.getDsl().minWidth);
}
```

**子组件**：

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

:::warning 提示

Widget 组件使用的 Provide / Inject 是基于 Vue 实现的。它与 Vue 依赖注入的原理和运行结果是完全一样。

更多 Provide / Inject 的内容请参考：[Vue 依赖注入](https://cn.vuejs.org/guide/components/provide-inject)

:::

# 七、Watch

我们可以在 Widget 组件中使用 `@Widget.Watch` 装饰器修饰方法，用于实现对响应式属性变化的监听。例如在表单中我们可以监听编码变化进行一些处理：

``` typescript
@Widget.Watch('formData.code')
protected watchCode(newVal: string | null | undefined, oldVal: string | null | undefined) {
  // do something.
}
```

与 Vue 的 watch 方法类似，@Widget.Watch 同样提供了 `deep` 和 `immediate` 属性支持。例如在表单中监听任意数据变化进行一些处理：

``` typescript
@Widget.Watch('formData', { deep: true, immediate: true })
protected watchFormData(newVal: ActiveRecord | undefined, oldVal: ActiveRecord | undefined) {
  // do something.
}
```

:::warning 提示

@Widget.Watch 仅提供了基于响应式属性的监听，层级可通过 “.” 分隔深入到对象的某个属性。

更多关于 Vue Watch 的内容请参考：[Vue Watch](https://cn.vuejs.org/api/reactivity-core.html#watch)

:::

# 八、SubContext / BehaviorSubContext

我们可以在 Widget 组件中方便的使用基于 `rxjs` 实现的 `发布/订阅` 机制。下面让我们来看一下 `发布/订阅` 机制在 Widget 组件中的使用方法。

在 `stream.ts` 定义 `Symbol` 常量，用于声明可观测者对应的 `key`，它会分别在 “发布方” 和 “订阅方” 使用：

``` typescript
const subContextSymbol = Symbol('subContext');
```

先定义一个 “订阅方” 组件（`Widget1.ts`）：

``` typescript
@Widget.SubContext(subContextSymbol)
protected subContext$!: WidgetSubjection<boolean>;

protected subContextSubscription: Subscription | undefined;

protected doSubject() {
  this.subContextSubscription = this.subContext$.subject.subscribe((value) => {
    console.log(this.currentHandle, value);
  });
}

protected mounted() {
  // 组件挂载时发起订阅
  this.doSubject();
}

protected unmounted() {
  // 组件卸载时取消订阅
  this.subContextSubscription?.unsubscribe();
}
```

再定义一个 “发布方” 组件（`Widget2.ts`）：

``` typescript
@Widget.SubContext(subContextSymbol)
protected subContext$!: WidgetSubjection<boolean>;

protected doSomething() {
  this.subContext$.subject.next(true);
}
```

当我们在 `Widget2.ts` 组件中调用 `doSomething` 方法时，`Widget1.ts` 组件中对应的订阅方法就会执行，并且可以获取到最新的值。

`BehaviorSubContext` 与 `SubContext` 在使用方式上几乎完全一样，唯一的区别是，在首次订阅时，会触发一次 `订阅函数` 。这个特性类似于 `watch` 的 `immediate` 属性的功能。

:::warning 提示：

`发布/订阅` 机制是 Widget 组件提供的 `点对点（P2P）` 通信方式。它无需关心组件层级问题，只要 “发布方” 和 “订阅方” 在一个页面中同时存在，就可以实现两个组件之间的通信。

更多关于 rxjs 的内容请参考：[RxJS](https://cn.rx.js.org/manual/index.html)

:::

# 九、继承和多态

Widget 框架使用 `TypeScript Class` 定义组件，天生具备 `面向对象` 的三大特性：封装、继承和多态。

通过 `继承` 可以获取 `父组件` 的全部属性、方法与功能，同时支持通过 `重载（Override）` 机制进行定制化开发。这正是 Widget 框架区别于其他前端框架的核心特性之一。

以 `RedInput` 组件为例，若需调整输入内容的字体样式，而内置组件未提供此功能，可以通过 `继承` 父组件 `FormStringFieldSingleWidget` ，在保留原有功能的基础上，针对性地扩展字体样式定制逻辑。

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

:::warning 提示

令人遗憾的是，Vue 组件并不具备很好的继承机制，有时为了在内置组件上进行少量修改，我们不得不将内置的 Vue 组件全部复制到项目中加以修改。

:::





