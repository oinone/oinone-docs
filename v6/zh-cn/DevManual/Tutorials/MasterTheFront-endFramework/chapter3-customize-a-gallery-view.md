---
title: 章节 3：自定义画廊视图（Customize a gallery view）
index: true
category:
  - 研发手册
  - 教程
  - 精通前端框架
order: 3
next:
  text: 模块数据初始化（Init Module Data）
  link: /v6/zh-cn/DevManual/Tutorials/init-module-data.md
---
在 Oinone 中，画廊视图是一种通过卡片形式展示数据的视图类型。通过`界面设计器`或后端 `DSL` 同样可以对卡片内容进行设计，但这有时并不能满足我们的业务场景，毕竟并不是所有卡片都设计的那么“整齐”。那么，对画廊视图的卡片进行定制化开发，从某种程度上来说，这是非常有必要的。

让我们先来看看这个练习最终展示的效果吧。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-3/result.png)

# 一、准备工作

在 Oinone 中，所有元数据都是围绕模型展开的。因此，我们需要准备一个简单的模型和一些视图，并且需要创建一个菜单，让我们可以在页面上展示这个模型的视图。

好了，让我们先着手构建出这样一个原始页面吧。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-3/origin.png)

:::warning 提示

这些准备工作并不是这个练习需要学习的内容，如果你对这些内容还不是很熟悉，这里有些学习内容供你参考：

[模型设计器使用手册](/zh-cn/UserManual/Designers/ModelDesigner/README.md)

[界面设计器使用手册](/zh-cn/UserManual/Designers/UIDesigner/README.md)

[后端框架（Back-End framework）](/zh-cn/DevManual/Tutorials/Back-endFramework/README.md)

:::

## （一）准备模型（GalleryDemoModel）

你可以用`模型设计器`创建一个模型，也可以通过`后端`创建一个模型。

这个模型里面有编码、名称、个性签名以及头像这四个字段。

下面列出了在本次练习中，用到的模型（`GalleryDemoModel`）的字段信息：

| **名称** | **API名称** | **字段类型**     | **是否多值** | **长度（单值长度）** |
| -------- | ----------- | ---------------- | ------------ | -------------------- |
| 编码     | code        | 文本（String）   | 否           | 128                  |
| 名称     | name        | 文本（String）   | 否           | 128                  |
| 个性签名 | description | 多行文本（Text） | 否           | -                    |
| 头像     | avatar      | 文本（String）   | 否           | 512                  |


:::warning 提示

这里需要注意头像字段在使用文本类型时需要指定字段长度为512或更大，否则在上传图片时可能会出现由于字段长度不足而无法正常保存的问题。

:::

## （二）准备视图

除了模型之外，我们还需要一些视图，并且通过跳转动作将他们连接起来。你可以用`界面设计器`来完成这一系列的操作，也可以通过`后端`完成。

首先，我们需要一个画廊视图，用于展示本次练习的成果。

其次，我们还需要一个表单视图，用于填写并创建一些测试数据。

最后将这个画廊视图绑定在菜单上，让我们可以通过点击菜单看到这个视图。

# 二、切换自定义组件

## （一）通过 registerLayout 切换自定义组件

像我们之前在 “探索前端框架” 章节练习的那样，我们可以通过注册这样一个布局（Layout）来切换组件，让我们将 `widget="card"` 改为 `widget="GalleryCustomCard"` 来完成组件的切换：

``` xml
<view type="gallery">
    <view type="search">
        <element slot="search" widget="search" />
    </view>
    <element widget="actionBar" slot="actionBar" />
    <element widget="gallery" slot="gallery">
        <element widget="GalleryCustomCard" slot="card">
            <template slot="title" />
            <template slot="content" />
            <template slot="rowActions" />
        </element>
    </element>
</view>
```

## （二）通过后端 DSL 切换自定义组件

让我们在 `<template slot="card">` 上添加 `widget="GalleryCustomCard"` 属性。一个可能的 `DSL` 模板如下所示：

``` xml
<view model="demo.GalleryDemoModel" type="gallery">
    <template slot="actionBar">
        <action name="redirectCreatePage" label="创建" />
    </template>
    <template slot="gallery">
        <template slot="card" widget="GalleryCustomCard">
            <template slot="content">
                <field data="id" invisible="true" />

                <field data="code" label="编码" />
                <field data="name" label="名称" />
                <field data="description" label="个性签名" />
                <field data="avatar" label="头像" widget="UploadImg" />
            </template>
            <template slot="rowActions">
                <action name="redirectUpdatePage" label="编辑" />
                <action label="删除" name="delete" />
            </template>
        </template>
    </template>
</view>
```

# 三、创建 GalleryCustomCard 组件

和我们之前接触到的组件类似，卡片是一个 `element` 组件，并且我们需要使用内置组件的部分功能。因此我们可以这样定义：

``` typescript
import GalleryCustomCard from './GalleryCustomCard.vue';

@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Gallery,
    widget: 'GalleryCustomCard'
  })
)
export class GalleryCustomCardWidget extends CardWidget {
  public initialize(props) {
    super.initialize(props);
    this.setComponent(GalleryCustomCard);
    return this;
  }
}
```

接下来，我们需要一个 Vue 组件模板来展示我们需要展示的信息，让我们先从一个最简单的展示开始吧。

``` vue
<template>
  <div class="gallery-custom-card-demo">
    <b>{{ formData.name }}({{ formData.code }})</b>
  </div>
</template>
```

内置组件中提供了 `formData` 属性，用于获取当前卡片数据，为了便于代码的维护，我们还需要声明其数据类型。

``` typescript
interface DemoData {
  code?: string;
  name?: string;
  description?: string;
  avatar?: string;
}

props: {
  formData: {
    type: Object as PropType<DemoData>
  }
}
```

为了让我们的页面好看一点，我们可以使用这样的 css 样式美化一下。

``` css
.gallery-custom-card-demo {
  background-color: #ffffff;
  border: 1px solid #e3e7ee;
  border-radius: 4px;
  padding: 16px;
}
```

这样我们就得到了一个自定义的简易卡片了。

:::warning 提示

更多关于卡片组件 API 的内容可参考：[Element](/zh-cn/DevManual/Reference/Front-EndFramework/Widget/element.md)

:::

# 四、使用 ActionBar 渲染底部动作区

从界面设计器或后端DSL定义的 `rowActions` 行内动作区，我们可以通过 `ActionBar` 组件将其渲染在页面上。

在 `Vue` 组件模板中，我们可以这样使用：

``` vue
<div class="default-card-row-actions">
  <action-bar widget="CardRowActions" inline :active-records="formData" :row-index="rowIndex">
    <slot name="rowActions" />
  </action-bar>
</div>
```

还需要在 `Vue` 中声明组件：

``` typescript
import { ActionBar } from '@oinone/kunlun-dependencies';

components: {
  ActionBar
}
```

:::warning 提示

这里使用的 `CardRowActions` 是内置组件，用于将动作渲染在页面上。

除了 `formData` 属性以外，这里还用到了 `rowIndex`，我们只需要在 `props` 中定义即可。它们都在 `CardWidget` 组件中被声明了。

为了保证样式完整，我们还需要使用 `div` 对这个组件进行包裹，并定义 `class` 为 `default-card-row-actions`。这些样式都是内置的，和原始页面完全一样。

:::

# 五、完善 GalleryCustomCard 组件

接下来，我们对这个卡片组件的一些样式进行完善，这一过程并没有一个标准答案，也不会有任何提示，你可以根据自己的想象力或者本章内容开头给出的图片继续将这个组件补充完整。

# 六、通过属性让组件变得通用

组件通用化是一门组件抽象哲学，一个好的属性设计可以让组件适应大多数的情况，但这是一个需要长久体会的过程。通过这一部分内容，我们希望读者可以对 Widget 框架提供的配置灵活使用，并逐步体会组件通用化这样的开发体验。

## （一）消除模型影响

要想将卡片组件变得通用，消除模型影响是必然的。说的简单一些，就是不能让数据结构限制组件的取值，我们通常的做法是将这些需要的字段通过配置映射的方式让它变得更加灵活。

以 `formData` 取值为例，使用 `formData.name` 这样的做法会让我们写代码时变得很顺利，也牺牲了组件的灵活性。我们可以通过使用 `formData[nameField]` 这样的方式进行取值，而 `nameField` 是一个可以被配置的变量，这样我们的卡片组件，在取值就会变得非常灵活。当然了，这也在一定程度上牺牲了我们的研发习惯。这总是需要权衡的。

在 `Widget` 组件中，我们通过获取 `DSL` 中的配置对属性进行定义：

``` typescript
@Widget.Reactive()
public get title() {
  return `${this.formData[this.nameField]}(${this.formData[this.codeField]})`;
}

@Widget.Reactive()
public get codeField() {
  return this.getDsl().codeField || 'code';
}

@Widget.Reactive()
public get nameField() {
  return this.getDsl().nameField || 'name';
}
```

这样，在 `Vue` 组件模板中，我们可以直接使用 `title` 属性，来完成我们的标题定义。类似的，对于其他属性我们也可以根据属性功能对其进行语义化的定义。在这里就不一一列举了，读者可以自行思考和探索。

:::warning 提示

如果可能的话，我们还希望可以通过表达式的方式配置标题格式，这样灵活性会更高。

更多关于表达式的内容可参考：[Expression Service](/zh-cn/DevManual/Reference/Front-EndFramework/Services/expression-service.md)

:::

## （二）一种很糟糕但更加通用的做法

当我们设计了一个需要复杂结构配置的属性时，通常我们可能无法通过 `DSL` 属性很好的配置，这里我们可以做一些取舍，在 `DSL` 可读性和功能性之间，我们选择功能性。

细心的读者可能已经发现，不论是通过界面设计器配置扩展属性，还是通过后端 DSL 配置扩展属性。由于 XML 语法本身的限制，我们只能配置简单值，对于结构化的复杂值我们只能通过约定来完成。

比如我们可以在卡片上设计一个 `contentLayout` 属性，这个属性接受的是一个 `JSON` 结构的数组，用它我们可以对中间内容区进行排版和布局。这一功能的实现可能会让我们“受益”终身，毕竟一个组件就可以涵盖多种布局方式，这样组件的复用程度也会显著提高。

但同样带来了一个问题，组件的维护难度也会显著提高，配置的难度也会显著提高。一个未经过设计的复杂结构配置会让这个组件变得无法长久的使用，甚至不可避免的成为不可迭代组件。

:::warning 提示

在这里虽然我们提及了这种“约定高于配置”的做法，也还是希望读者可以对组件通用化有进一步的了解。这只是一种“不得已而为之”的做法，并不建议使用。

:::

