---
title: 自定义字段
index: true
category:
  - 研发手册
  - 操作指南
order: 1
prev:
  text: 调试工具（Debug Tools）
  link: /zh-cn/DevManual/Tutorials/debug-tools.md
---
回想一下我们在 “[探索前端框架](/zh-cn/DevManual/Tutorials/DiscoverTheFront-endFramework/chapter1-widget.md)” 章节中创建的组件，无一例外的都使用了一个被命名为 `BaseElementWidget` 的基类，并且它们的使用方式也都不尽相同。为了便于我们回忆之前的内容，下面是之前“计数器”组件的部分代码和它的使用方式。

```typescript
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
  ...
}
```

```xml
<element widget="Counter" />
```

# 一、对现有字段组件进行子类化

让我们来看一个例子。在这个例子中，我们想要定制化内置的 `FormBooleanSwitchFieldWidget` 组件，在开关内部添加一些文字提示。

未扩展之前在页面中的展示是这样的：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/OperationGuide/custom-field/before.gif)

扩展之后类似于下面展示的这样：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/OperationGuide/custom-field/after.gif)

:::warning 提示

布尔类型的字段在表单视图中可以使用开关组件，在开始练习之前，我们需要有一个可以看到原始效果的页面。如果在系统中没有找到现有的，可以用“界面设计器”设计一个对应页面用于此次练习。

[界面设计器使用手册](/zh-cn/UserManual/Designers/UIDesigner/README.md)

[更多 Oinone 内置组件](/zh-cn/DevManual/Reference/Front-EndFramework/Widget/Field/README.md)

:::

在`FormBooleanSwitchFieldWidget`组件中，我们提取出组件注册相关内容的代码，如下所示：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search],
    ttype: ModelFieldType.Boolean
  })
)
export class FormBooleanSwitchFieldWidget extends FormFieldWidget {
  ...
}
```

接下来，我们可以创建一个 `FormCustomSwitchFieldWidget` 组件，并继承 `FormBooleanSwitchFieldWidget` 组件，并保持注册条件完全一致，这样我们就可以得到内置组件的全部功能，并对其功能进行定制化。

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search],
    ttype: ModelFieldType.Boolean
  })
)
export class FormCustomSwitchFieldWidget extends FormBooleanSwitchFieldWidget {
  ...
}
```

:::warning 提示

通常情况下我们不会这样注册字段组件，但作为练习的一部分，这样做也没什么关系。

更多关于字段组件注册的内容可参考：[Field](/zh-cn/DevManual/Reference/Front-EndFramework/Widget/Field/README.md)

:::

接下来让我们声明两个属性 `checkedText` 和 `uncheckedText`，用来获取关闭时和开启时需要渲染的文本内容。

```typescript
@Widget.Reactive()
public get checkedText() {
  return this.getDsl().checkedText || '是';
}

@Widget.Reactive()
public get uncheckedText() {
  return this.getDsl().uncheckedText || '否';
}
```

与之前“计数器”组件类似，我们同样需要一个 `Vue` 组件使用这两个组件并展示在页面中。

特别的是，表单中的字段组件需要处理数据交互的相关内容，例如字段值的获取、变更等。

我们还可以使用内置的标准组件来实现这一功能，这样可以保持组件的主题和样式与平台完全一致。

一个有效的 `Vue` 组件模板可能是这样的：

```vue
<template>
  <oio-switch :checked="booleanValue" @change="onChange">
    <template v-if="checkedText" #checkedChildren>
      <span>{{ checkedText }}</span>
    </template>
    <template v-if="uncheckedText" #uncheckedChildren>
      <span>{{ uncheckedText }}</span>
    </template>
  </oio-switch>
</template>
```

在这个模板中，我们可以看到使用的组件、属性以及方法：

+ `booleanValue`：用于传递组件的值，在这里它可能是`true`或`false`。
+ `onChange`：用于在组件的值变更时进行一些处理，比如修改 `booleanValue`。
+ `checkedText` 和 `uncheckedText`：本次练习中新增的两个属性。

:::warning 提示

更多关于 Oinone 内置标准组件的内容可参考：[Oio Components](/zh-cn/DevManual/Reference/Front-EndFramework/OioComponents/README.md)

:::

接下来，我们需要声明 Widget 框架中对表单字段组件内置的数据交互属性。这些属性是任何一个表单字段组件的核心属性和方法。

+ value：当前字段值。
+ change：当字段值发生变更时调用，提交新的值。
+ focus：当组件获取聚焦时调用。
+ blur：当组件失去焦点时调用。

```typescript
props: {
  value: {
    type: [Boolean, String],
    default: undefined
  },
  change: {
    type: Function
  },
  focus: {
    type: Function
  },
  blur: {
    type: Function
  }
}
```

:::warning 提示

不要忘记声明`checkedText`和`uncheckedText`属性哦~

:::

在 `Vue` 组件模板中，我们使用了一些不在 `props` 中的属性和方法，显然我们需要通过 setup 声明这些属性和方法，用来实现我们的组件功能。

在 `FormBooleanSwitchFieldWidget` 组件中，它将 `value` 处理为 `Boolean` 或 `String`，并且有可能为空。但在 `oio-switch` 组件甚至很多第三方组件都不会接受这样的值，因此我们需要将 `props.value` 处理为 `booleanValue` 使得标准组件可以正常使用。用我们熟悉的 `computed` 声明一个`计算属性`来解决这个问题吧。

```typescript
const booleanValue = computed(() => BooleanHelper.toBoolean(props.value));
```

不仅如此，为了尽可能保留 Widget 框架提供的基础功能，我们需要在值发生变更时进行一些特殊处理。这些特殊处理在 Widget 框架中的一些特殊组件中也是比较常见的。

开关组件我们通常认为在值发生变更后就会立刻响应失焦方法，而不是在用户点击其他地方后通过浏览器发出的失焦事件来触发。因此我们需要包装变更方法，让它能像我们预期一样工作。

```typescript
const onChange = (val: boolean | undefined) => {
  props.change?.(val);
  props.blur?.();
};
```

:::warning 提示

一般的，我们认为所有组件的标准操作流程为：用户选中组件（聚焦） --> 用户进行输入（值变更） --> 用户结束输入（失焦）。

但在某些特殊组件中——例如上面提到的开关组件，还有日期/时间选择器组件、颜色选择器组件等等，我们不得不让这些组件在保证良好交互的同时，也能根据我们所设计的那样完成组件的标准操作流程。这样我们就可以对组件行为逻辑进行抽象，而不再关注具体组件。

:::

:::info 注意

到了这一步，你应该已经有一个看起来可以正常运行的定制化组件了。不过需要注意是，对内置组件的修改，通常我们建议参考内置 Widget 组件对应的 Vue 组件进行实现，甚至是通过拷贝代码的方式进行修改。这是由于 Vue 框架本身对于继承或者说扩展方面的限制，使我们不得不这样做。

内置代码参考：（此处缺少超链接）

FormBooleanSwitchFieldWidget.ts

Switch.vue

:::

# 二、理论：字段组件的注册

Widget 框架对组件进行了分类，通过分类特征，我们在注册组件时可以根据这些特征来决定组件的使用范围，使用时可以在所有注册的组件中选择一个最合适的组件进行渲染。

在这里仅简要说明一下字段组件注册的基础内容，以确保我们在接下来的学习中可以较为容易的理解一些概念。更多组件注册的相关内容可参考：[Field](/zh-cn/DevManual/Reference/Front-EndFramework/Widget/Field/README.md)

## （一）字段组件的注册可选项

```typescript
/**
 * Field组件注册可选项
 */
export interface BaseFieldOptions extends SPIOptions {
  /**
   * 当前视图类型
   */
  viewType?: ViewType | ViewType[];
  /**
   * 组件名称
   */
  widget?: string | string[];
  /**
   * 字段业务类型
   */
  ttype?: ModelFieldType | ModelFieldType[];
  /**
   * 是否多值
   */
  multi?: boolean;
  /**
   * 指定模型
   */
  model?: string | string[];
  /**
   * 指定视图名称
   */
  viewName?: string | string[];
  /**
   * 指定字段
   */
  name?: string;
}
```

从上述类型声明中不难发现，其分类维度涵盖以下多个方面：视图类型、组件名称、字段业务类型、是否多值、模型编码、字段名称以及视图名称。这些维度用于描述组件的使用位置。一般而言，位置描述得越“精确”，在相应位置进行渲染时，该组件所具备的优先级也就越高。在完全相同的位置描述的情况下，后注册的组件会覆盖先注册的组件。

以`FormBooleanSwitchFieldWidget`组件为例：

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search],
    ttype: ModelFieldType.Boolean
  })
)
export class FormBooleanSwitchFieldWidget extends FormFieldWidget {
  ...
}
```

从注册条件我们可以看出，这个组件是在表单视图和搜索视图中使用的，并且只能在字段业务类型为布尔的字段中使用。

## （二）不同视图类型的字段组件

在 Oinone 中，不同的视图类型处理了不同的数据结构和表现形式，其所采取的数据处理和渲染方式也是不同的。Widget 框架对数据结构主要分为列表（`List`）和对象（`Object`）两大类。

下面根据数据结构和视图类型对一些基类进行了列举：

<table>
  <tr>
    <th>数据结构</th>
    <th>视图类型</th>
    <th>基类</th>
  </tr>
  <tr>
    <td rowspan="2">列表（List）</td>
    <td>表格视图（TABLE）  </td>
    <td>BaseTableFieldWidget</td>
  </tr>
  <tr>
    <td>画廊视图（GALLERY）</td>
    <td rowspan="3">FormFieldWidget</td>
  </tr>
  <tr>
    <td>对象（Object）</td>
    <td rowspan="3">表单视图（FORM）<br/>详情视图（DETAIL）<br/>搜索视图（SEARCH）</td>
  </tr>
</table>

:::warning 提示

只有使用相同基类的字段组件才可能出现在多个视图中，常见的视图类型的注册组合是：

+ viewType: ViewType.Table
+ viewType: [ViewType.Form, ViewType.Search]（可编辑）
+ viewType: [ViewType.Detail, ViewType.Gallery]（不可编辑）

更多关于内置字段组件的内容请参考：[Field](/zh-cn/DevManual/Reference/Front-EndFramework/Widget/Field/README.md)

:::

:::info 注意

所有字段组件的注册 Token 都来自于 BaseFieldWidget 组件，在内置组件中你可能看到过类似于开关组件使用了 FormFieldWidget 组件，其实它是因为继承了 BaseFieldWidget 组件，从而拥有了注册 Token 的方法。

:::

# 三、创建一个新的表单字段组件

在学习了对现有组件进行定制化后，让我们来创建一个显示红色文本的输入框组件吧。

在这个例子中，我们希望这个组件有以下一些特征和功能：

+ 只能用在表单视图中
+ 它是一个文本输入框
+ 用户输入的文本内容是用红色字体显示的

## （一）确定组件的基类和注册条件

```typescript
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

## （二）使用 oio-input 实现 Vue 组件

一个有效的 `Vue` 组件模板可能是这样的：

```vue
<template>
  <oio-input class="red-input-demo" :value="value" @update:value="change" @focus="focus" @blur="blur" />
</template>
```

:::warning 提示

更多关于 Oinone 内置标准组件的内容可参考：[Oio Components](/zh-cn/DevManual/Reference/Front-EndFramework/OioComponents/README.md)

:::

由于 css 作用域的问题可能使得我们的样式生效不那么容易，你可以用下面这段 css 让输入框的内容变成红色：

```css
.red-input-demo.oio-input .ant-input {
  color: red;
}
```

## （三）在 DSL 中使用 RedInput 组件

```xml
<field data="name" widget="RedInput" />
```

:::warning 提示

更多关于表单字段组件的 API 内容可参考：[Form Field](/zh-cn/DevManual/Reference/Front-EndFramework/Widget/Field/form-field.md)

:::

# 四、创建一个新的表格字段组件

在这个例子中，我们希望这个组件有以下一些特征和功能：

+ 只能用在表格视图中
+ 它仅用于显示文本
+ 文本内容是用红色字体显示的

## （一）确定组件的基类和注册条件

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: ViewType.Table,
    ttype: ModelFieldType.String,
    widget: 'RedInput'
  })
)
export class TableRedInputWidget extends BaseTableFieldWidget<string> {
  ...
}
```

## （二）重写 renderDefaultSlot 方法定制单元格渲染内容

```typescript
@Widget.Method()
public renderDefaultSlot(context: RowContext): VNode[] | string {
  const currentValue = this.compute(context);
  return [createVNode('span', { class: 'red-input-demo' }, currentValue)];
}
```

:::warning 提示

由于表格字段是以列作为一个字段进行定义的，因此 renderDefaultSlot 会在表格每一行渲染时都会调用，并且在 RowContext 中包含了当前渲染时这一行的上下文内容。

:::

## （三）实现 red-input-demo 的 css 样式

```css
.oio-column-wrapper > .red-input-demo {
  color: red;
}
```

:::warning 提示

与之前不同的是，我们无法确定这个组件被使用在什么地方，甚至无法确定被怎样嵌套使用。因此，我们在写 css 样式时，应尽量缩小 css 样式的作用域，最好将其控制在单个组件内部。否则会产生无法预知的副作用。

:::

## （四）在 DSL 中使用 RedInput 组件

```xml
<field data="name" widget="RedInput" />
```

:::warning 提示

更多关于表格字段组件的 API 内容可参考：[Table Field](/zh-cn/DevManual/Reference/Front-EndFramework/Widget/Field/table-field.md)

:::

# 五、更进一步

如果你有时间的话，这里有一些你可以尝试进行的练习内容：

1. 在详情和画廊中定义一个红色的只读输入框组件，并在页面中使用它。
2. 结合界面设计器的自定义组件，将我们在本次练习中实现的组件作为自定义组件，让它可以用界面设计器放置在任何有效字段上进行使用。参考：[自定义组件与设计器结合 - 字段组件](/zh-cn/DevManual/OperationGuide/combination-of-customized-widget-and-designer.md#二、自定义字段组件)