---
title: Stream Service (peer to peer)
index: true
category:
  - 研发手册
  - Reference
  - 前端API
  - Services
order: 9

---
在 Oinone Kunlun 早期的实现中，我们使用了 `rxjs` 作为组件间通信的具体实现。在目前最新版本中，我们只保留了极少部分的功能使用 “点对点（P2P）” 方式进行通信，大部分都改为了 `Provide / Inject` 方式。

# 一、概述

在本章内容开篇，我们觉得有必要向读者解释一下这两种通信方式在自动化渲染场景中的利弊，以帮助读者可以在实现自定义组件时选择较为合适的通信方式来应对不同的应用场景。

## （一）RxJS

### 1、基本概念

+ Observable（可观察对象）：表示一个概念，这个概念是一个可调用的未来值或事件的集合。
+ Observer（观察者）：一个回调函数的集合，它知道如何去监听由 Observable 提供的值。
+ Subscription（订阅）：表示 Observable 的执行，主要用于取消 Observable 的执行。
+ Operators（操作符）：采用函数式编程风格的纯函数 (pure function)，使用像 map、filter、concat、flatMap 等这样的操作符来处理集合。
+ Subject（主体）：相当于 EventEmitter，并且是将值或事件多路推送给多个 Observer 的唯一方式。
+ Schedulers（调度器）：用来控制并发并且是中央集权的调度员，允许我们在发生计算时进行协调，例如 setTimeout 或 requestAnimationFrame 或其他。

:::warning 提示：

本节内容大多是对 RxJS 一些基本概念的引入和解释，更多关于 RxJS 的内容请参考：[RxJS](https://cn.rx.js.org/manual/index.html)

:::

### 2、Subject（主体）

`RxJS Subject` 是一种特殊类型的 `Observable`，它允许将值多播给多个观察者。如下所示：

```typescript
import { Subject } from '@oinone/kunlun-dependencies';

const subject = new Subject<string>();
subject.subscribe((v) => {
  console.log(`subscribe 1: ${v}`);
});
subject.subscribe((v) => {
  console.log(`subscribe 2: ${v}`);
});
subject.next('1');
subject.next('2');
subject.next('3');

// 控制台输出
// subscribe 1: 1
// subscribe 2: 1
// subscribe 1: 2
// subscribe 2: 2
// subscribe 1: 3
// subscribe 2: 3
```

:::warning 提示：

更多关于 RxJS Subject 的内容请参考：[RxJS Subject](https://cn.rx.js.org/manual/overview.html#h15)

:::

### 3、BehaviorSubject

`Subject` 的其中一个变体就是 `BehaviorSubject`，它有一个 “当前值” 的概念。它保存了发送给消费者的最新值。并且当有新的观察者订阅时，会立即从 `BehaviorSubject` 那接收到 “当前值”。

```typescript
import { BehaviorSubject } from '@oinone/kunlun-dependencies';

const subject = new BehaviorSubject<string | null>(null);
subject.subscribe((v) => {
  console.log(`subscribe 1: ${v}`);
});
subject.next('1');
subject.next('2');
subject.subscribe((v) => {
  console.log(`subscribe 2: ${v}`);
});
subject.next('3');

// 控制台输出
// subscribe 1: null
// subscribe 1: 1
// subscribe 1: 2
// subscribe 2: 2 // 新的订阅产生
// subscribe 1: 3
// subscribe 2: 3
```

:::warning 提示：

更多关于 RxJS BehaviorSubject 的内容请参考：[RxJS BehaviorSubject](https://cn.rx.js.org/manual/overview.html#h15)

:::

## （二）Provide / Inject

### 1、Vue Provide / Inject 机制

正如 Vue 官方解释的那样，**Provide / Inject** 是为了解决 “**Prop 逐级透传**” 这一问题。一个父组件相对于其所有的后代组件，会作为**依赖提供者**。任何后代的组件树，无论层级有多深，都可以**注入**由父组件提供给整条链路的依赖。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/1750666448580-d9c4d9e6-cc46-4266-b7a7-a910493357ec.png)

:::warning 提示：

更多 Provide / Inject 的内容请参考：[Vue 依赖注入](https://cn.vuejs.org/guide/components/provide-inject)

:::

### 2、基本用法

对于父子组件，在 Provide / Inject 机制的说明中，父组件通常被称为供给方组件，子组件通常被称为注入方组件。下面是 Vue 官方提供的国际化示例代码：（为了更好的说明下一小节的内容，示例代码有做一些修改）

```typescript
<!-- 在供给方组件内 -->
<script setup>
import { provide, ref } from 'vue';

const location = ref('North Pole');

function updateLocation(value) {
  location.value = value;
}

provide('location', {
  location,
  updateLocation
});
</script>
```

```typescript
<!-- 在注入方组件 -->
<script setup>
import { inject } from 'vue';

const { location, updateLocation: parentUpdateLocation } = inject('location');

const updateLocation = () => {
  parentUpdateLocation('South Pole');
};
</script>

<template>
  <button @click="updateLocation">{{ location }}</button>
</template>
```

:::warning 提示：

值得一提的是，此示例提供了 `updateLocation` 方法让注入方组件不会直接修改 `location` 响应式对象，并保证了数据流单向传递和单向修改的基本原则。读者在实际使用过程中，也应当注意这一点。

:::

### 3、作用域隔离及事件冒泡

由于 `Provide / Inject` 实现的机制原理，任何**依赖提供者**所提供的**属性或方法**只能在**子组件**中进行获取，即两个组件需要具备**父子关系**才能进行通信。

那么，只要我们在父子组件之间任意组件重新提供新的属性或方法，则可以产生作用域隔离以及事件冒泡的一种新的通信方式。这也是 Oinone 在实现过程中最终采用的一种通信方式。

让我们在上面的供给方和注入方中间新添加一个供给方，这个供给方将重新提供新的更新方式，以便在子组件触发 `updateLocation` 方法时提供新的能力。

```typescript
<!-- 在新的供给方组件内 -->
<script setup>
import { inject, provide } from 'vue';

const locationInject = inject('location');
const { updateLocation: parentUpdateLocation } = locationInject;

function updateLocation(value) {
  // do something.
  parentUpdateLocation(value);
}

provide('location', {
  ...locationInject,
  updateLocation
});
</script>
```

此时，当注入方组件调用 `updateLocation` 方法时，其中间层将可以对数据进行监听、修改等操作。如时序图所示：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/daa897310d468c3b1302a5248d8029ab.svg)

:::warning 提示：

上面的例子仅用于说明当新的供给方组件加入到父子组件之间时的一种实现方式。在 Oinone 中，表单字段组件的 `formData` 其本质也是通过这一原理递归实现的。

:::

## （三）适用场景

### 1、RxJS 适用场景

+ 两个需要通信的组件均为自定义组件，可自行决定发布/订阅。
+ 组件层级不明确或脱离 VDOM 文档流。如：通过 `executeViewAction` 方法打开的弹窗。
+ 场景单一，使用时不存在递归渲染产生的副作用。

### 2、Provide / Inject 适用场景

+ 每个组件不关心其所处位置，只需保证父子关系即可。如：`FormWidget` 与 `FormFieldWidget` 之间永远是父子关系。
+ 场景通用，允许通过外部提供者对子组件产生影响，使其具有相似功能但可以产生不同的结果。适合于递归渲染场景。如：输入框组件可用于任何模型中类型是文本的组件而无需关心具体层级。

# 二、在 Widget 组件中使用 RxJS

## （一）在 Widget 组件中使用 Subject

+ 定义一个用于通信的 `Key`，使得发布方和订阅方使用相同的 `Subject` 对象。

```typescript
export const subContextSymbol = Symbol('subContext');
```

+ 在订阅方组件中发起订阅：

```typescript
@Widget.SubContext(subContextSymbol)
protected subContext$!: WidgetSubjection<boolean>;

protected doSubject() {
  this.subContext$.subscribe((value) => {
    console.log(this.currentHandle, value);
  });
}

protected mounted() {
  // 组件挂载时发起订阅
  this.doSubject();
}
```

:::warning 提示：

此处使用 `this.subContext$.subscribe` 订阅方法和 `this.subContext$.subject.subscribe` 订阅方法是有区别的：

+ this.subContext$.subscribe：Widget 框架封装订阅方法，组件卸载时自动取消订阅。
+ this.subContext$.subject.subscribe：RxJS 原生订阅方法，需自行取消订阅。

:::

+ 在发布方组件中发布一个新值触发所有订阅：

```typescript
@Widget.SubContext(subContextSymbol)
protected subContext$!: WidgetSubjection<boolean>;

protected doPublish() {
  this.subContext$.subject.next(true);
}
```

:::warning 提示：

发布方重复发布相同的 “新值” 时，订阅方会根据订阅逻辑决定是否接收重复值，默认的订阅逻辑是允许接收重复值的。这一点与 RxJS 默认实现完全一致。

:::

## （二）在 Widget 组件中使用 BehaviorSubject

将 `Widget.SubContext` 装饰器改为 `Widget.BehaviorSubContext` 即可使用 `BehaviorSubject` 特性的发布订阅功能：

```typescript
@Widget.BehaviorSubContext(behaviorSubContextSymbol)
protected behaviorSubContext$!: WidgetBehaviorSubjection<boolean>;
```

:::danger 警告：

同一个 Symbol 需要在每个 Widget 组件中使用相同的装饰器进行处理，否则会订阅无效的问题。

:::

