---
title: Component Lifecycle
index: true
category:
  - 研发手册
  - Reference
  - 前端API
  - Widget
order: 1
prev:
  text: 组件（Widget）
  link: /zh-cn/DevManual/Reference/Front-EndFramework/Widget/README.md
---
在 Oinone Kunlun 中，其组件的生命周期完全遵照 Vue 框架提供的 Vue 组件生命周期进行实现。不仅如此，由于 Oinone Kunlun 是一套基于 DSL Render 实现的渲染框架，其管理范围不仅仅止步于 “组件”。它还需要对数据获取、数据渲染、数据提交等诸多数据行为进行处理，因此，我们还对其组件生命周期进行了扩展，以此来更好的支持整个系统的运行。

# 一、Vue 组件生命周期

在了解 Widget 组件生命周期之前，我们先来回顾一下 Vue 组件生命周期。下面是单个组件实例生命周期的图表：（图片来源：Vue 官方文档 - 生命周期）

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/1747724752703-357b528d-6310-4364-9426-66d6c1796bc8.png)

在这里我们只需要对 Vue 组件生命周期进行简单的介绍，以便于对照介绍我们接下来的内容。对于生命周期钩子 `API` ，在 Widget 组件中的定义也是几乎一样的。让我们继续往下看。

:::warning 提示

更多关于 Vue 组件生命周期的内容请参考：[Vue 生命周期](https://cn.vuejs.org/guide/essentials/lifecycle.html)

:::

# 二、Widget 生命周期

基于 Vue 框架实现的 Widget 组件，其本质也是一个 Vue 组件。那么，其生命周期与 Vue 组件生命周期必然也是完全一致的。例如：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/1745394198621-ed2b7449-6301-4051-89ac-8b1a92ef879d.jpeg)

一个 Widget 组件会经历很多阶段：它可以被实例化、渲染、挂载、更新、分离、销毁…… 这就是组件的生命周期。上面的图展示了一个组件生命周期中最重要的事件。大致来说，一个组件先被创建，然后被更新（可能会更新很多次），最后被销毁。

Widget 框架提供了各种各样的内置函数。所有这些函数都在`VueWidget`基类中被声明。例如，如果你想在组件挂载时执行一些代码，你可以在当前组件重写`mounted`函数：

```typescript
protected mounted() {
  super.mounted();
  // do something.
}
```

:::info 注意

Widget 框架使用面向对象继承的特性，因此无法避免的是，部分内置方法被暴露在自定义组件中。为了避免自定义组件对内核功能造成不必要的影响，Widget 框架使用 “$$” 前缀作为框架内置方法进行声明，如无特殊必要，它不应该被自定义组件重写或使用。

:::

# 三、Reference List

## （一）标准生命周期函数

### 1、beforeCreated

**功能描述**

在实例创建完成前被调用。（在新版 Vue 生命周期中已经合并到 `setup` 中）

**函数签名**

```typescript
protected beforeCreated(): void
```

**使用示例**

```typescript
protected beforeCreated() {
  // do something.
}
```

### 2、created

**功能描述**

在实例创建完成后被调用。（在新版 Vue 生命周期中已经合并到 `setup` 中）

**函数签名**

```typescript
protected created(): void
```

**使用示例**

```typescript
protected created() {
  // do something.
}
```

### 3、beforeMount

**功能描述**

在挂载开始之前被调用。

**函数签名**

```typescript
protected beforeMount(): void
```

**使用示例**

```typescript
protected beforeMount() {
  // do something.
}
```

### 4、mounted

**功能描述**

组件挂载到 DOM 后调用。

**函数签名**

```typescript
protected mounted(): void
```

**使用示例**

```typescript
protected mounted() {
  // do something.
}
```

### 5、beforeUpdate

**功能描述**

数据更新导致组件重新渲染之前调用。此时组件的状态（`data`、`props`）已更新，但尚未重新渲染 DOM，可获取更新前的状态。

**函数签名**

```typescript
protected beforeUpdate(): void
```

**使用示例**

```typescript
protected beforeUpdate() {
  // do something.
}
```

### 6、updated

**功能描述**

组件重新渲染并更新 DOM 后调用。此时可访问更新后的 DOM 元素，完成基于新 DOM 的操作。

**函数签名**

```typescript
protected updated(): void
```

**详细信息**

+ 避免在此钩子中进行**重复渲染操作**，适合执行依赖 DOM 更新的回调（如重置滚动条位置）。
+ 若组件更新多次，`updated` 会在所有子组件更新完毕后调用。

**使用示例**

```typescript
protected updated() {
  // do something.
}
```

### 7、beforeUnmount

**功能描述**

组件卸载前调用。此时组件仍处于挂载状态，可执行**销毁前的清理操作**（如取消订阅、清除定时器）。

**函数签名**

```typescript
protected beforeUnmount(): void
```

**使用示例**

```typescript
protected beforeUnmount() {
  // do something.
}
```

### 8、unmounted

**功能描述**

组件卸载后调用。此时组件的 DOM 已被移除，实例即将被销毁，无法再访问组件状态或 DOM。

**函数签名**

```typescript
protected unmounted(): void
```

**使用示例**

```typescript
protected unmounted() {
  // do something.
}
```

### 9、activated

**功能描述**

当组件被**激活**时调用（适用于 `keep-alive` 缓存的组件）。例如，从缓存中切回该组件时触发。

**函数签名**

```typescript
protected activated(): void
```

**详细信息**

+ 用于**恢复组件状态**或**重新初始化资源**（如定时器、事件监听）。
+ 仅在组件被 `keep-alive` 包裹时生效。

**使用示例**

```typescript
protected activated() {
  // do something.
}
```

### 10、deactivated

**功能描述**

当组件被**停用时**调用（适用于 `keep-alive` 缓存的组件）。例如，切换到其他组件时触发。

**函数签名**

```typescript
protected deactivated(): void
```

**详细信息**

+ 用于**释放资源**，避免内存泄漏（如清除定时器、解绑事件）。
+ 组件实例不会被销毁，状态会被保留。

**使用示例**

```typescript
protected deactivated() {
  // do something.
}
```

# （二）Widget 组件扩展函数

### 1、initialize

**功能描述**

组件初始化，在 `TypeScript Class` 创建时被调用，优先于 `setup` 生命周期。

**函数签名**

```typescript
protected initialize(props: VueProps): this
```

**详细信息**

+ 用于 DSL 编辑
+ 用于 Widget 组件绑定对应的 Vue 组件
+ 用于获取插槽参数（`slotContext`）

**使用示例**

```typescript
protected initialize(props) {
  super.initialize(props);
  // do something.
  return this;
}
```

### 2、setComponent

**功能描述**

Widget 组件绑定对应的 Vue 组件，只能在 `initialize` 中使用。

**函数签名**

```typescript
public setComponent(component: WidgetComponent): void
```

**使用示例**

```typescript
protected initialize(props) {
  super.initialize(props);
  this.setComponent(RedInput);
  return this;
}
```

### 3、dispose

**功能描述**

组件销毁，用于手动创建 Widget 组件时需要手动销毁的场景。

**函数签名**

```typescript
public dispose(): void
```

**使用示例**

```typescript
this.formWidget.dispose();
```

