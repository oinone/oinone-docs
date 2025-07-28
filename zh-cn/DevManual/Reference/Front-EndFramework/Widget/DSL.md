---
title: DSL
index: true
category:
  - 研发手册
  - Reference
  - 前端API
  - Widget
order: 5

---
在 Oinone Kunlun 中，DSL 是与 布局（Layout） 协同的重要部分，它通过定义一些布局中存在的 **插槽** 片段让布局中的内容有所变化。那么，DSL 与布局是如何协同工作的呢？在本章内容中，我们将对这一问题作出解答。

# 一、Vue 插槽

在解释 DSL 之前，让我们先简单回想一下 Vue 中对于插槽的使用。

## （一）默认插槽

（以下示例代码摘自 Vue 插槽官方文档）

可以这样在 `FancyButton` 组件中定义一个插槽：

``` vue
<button class="fancy-btn">
  <slot /><!-- 插槽出口 -->
</button>
```

对于 `FancyButton` 组件在任何地方使用的时候，我们可以这样定义按钮中的文本：

``` vue
<FancyButton>
  Click me! <!-- 插槽内容 -->
</FancyButton>
```

最终渲染出的 DOM 是这样的：

``` html
<button class="fancy-btn">Click me!</button>
```

## （二）具名插槽

（以下示例代码摘自 Vue 插槽官方文档）

当一个组件包含多个插槽时，具名插槽将指定内容插入到对应的插槽中。

可以这样在 `BaseLayout` 组件中定义这样三个插槽：

``` html
<div class="container">
  <div class="header">
    <slot name="header" />
  </div>
  <div class="content">
    <slot />
  </main>
  <div class="footer">
    <slot name="footer" />
  </div>
</div>
```

当我们在使用 `BaseLayout` 组件时，可以通过指定插槽名称来决定哪一部分片段需要插入到哪个插槽中，就像这样：

``` html
<BaseLayout>
  <template #default>
    content <!-- 默认插槽的内容放这里 -->
  </template>
  <template #header>
    header <!-- header 插槽的内容放这里 -->
  </template>
  <template #footer>
    footer <!-- footer 插槽的内容放这里 -->
  </template>
</BaseLayout>
```

最终渲染出的 DOM 是这样的：

``` html
<div class="container">
  <div class="header">
    header
  </div>
  <div class="content">
    content
  </main>
  <div class="footer">
    footer
  </div>
</div>
```

:::warning
提示：

更多关于 插槽 的内容请参考：[Vue 插槽](https://cn.vuejs.org/guide/components/slots.html)

:::

# 二、DSL 插槽

在 `布局（Layout）` 中可以使用两种方式定义插槽：

+ 使用 xslot 标签声明插槽。
+ 在任何 XML 标签上使用 slot 属性声明插槽。

## （一）xslot 标签

xslot 标签是最接近 Vue 插槽的一种使用方式，下面我们来看一下如何在布局以及DSL中使用，以及最终合并的结果。

在 `布局（Layout）` 中我们可以像下面这样来定义一个 `fields` 插槽：

``` xml
<element widget="table">
    <xslot name="fields" />
</element>
```

在 `DSL` 中使用 `template` 标签为插槽提供具体的内容：

``` xml
<template slot="fields">
    <field data="id" invisible="true" />
    <field data="code" />
    <field data="name" />
    <field data="countryList" />
</template>
```

最终合并得到的 `Template` 模板是这样的：

``` xml
<element widget="table">
    <field data="id" invisible="true" />
    <field data="code" />
    <field data="name" />
    <field data="countryList" />
</element>
```

## （二）slot 属性

由于 Widget 框架需要适应更多元化的页面配置，通常我们希望在 DSL 中可以对 布局（Layout） 中定义的组件添加一些属性，那么通过在 XML 标签上添加 slot 属性来定义插槽，这样就可以很容易实现 `属性合并` 这一功能。

在 `布局（Layout）` 中我们可以像下面这样来定义一个 `table` 插槽：

``` xml
<element widget="table" slot="table" />
```

在 `DSL` 中使用 `template` 标签为插槽提供具体的内容：

``` xml
<template slot="table" sortable="true">
    <field data="id" invisible="true" />
    <field data="code" />
    <field data="name" />
    <field data="countryList" />
</template>
```

最终合并得到的 `Template` 模板是这样的：

``` xml
<element widget="table" sortable="true">
    <field data="id" invisible="true" />
    <field data="code" />
    <field data="name" />
    <field data="countryList" />
</element>
```

# 三、DSL 合并

DSL 与母版和布局一样，它们都是通过 XML 标签将页面拆分为可顺序排列的小单元，用于控制页面元素的相对位置。但它并不像母版和布局那样直观的体现整个页面中元素的相对位置，它仅仅用于表示一个 **插槽** 区域内元素的相对位置。

## （一）标准合并

以 “资源-国家分组” 为例，一个可能的 `DSL` 模板应该是这样的：

``` xml
<view type="TABLE" model="resource.ResourceCountryGroup" title="国家分组" name="国家分组table">
    <template slot="actions">
        <action name="redirectCreatePage" label="创建"/>
        <action name="delete" label="删除"/>
    </template>
    <template slot="searchFields">
        <field data="code"/>
        <field data="name"/>
    </template>
    <template slot="fields">
        <field data="id" invisible="true"/>
        <field data="code"/>
        <field data="name"/>
        <field data="countryList"/>
    </template>
    <template slot="rowActions">
        <action name="redirectDetailPage" label="详情"/>
        <action name="redirectUpdatePage" label="编辑"/>
    </template>
</view>
```

在这个 `DSL` 模板中，`template` 标签上的 `slot` 属性类似于 Vue 的 `具名插槽`，它们会在视图渲染的时候通过一系列的规则合并到事先在布局中定义的插槽中。

对于这个表格视图来说，它有一个对应的标准表格视图布局模板：

``` xml
<view type="TABLE">
    <pack widget="group">
        <view type="SEARCH">
            <element widget="search" slot="search" slotSupport="field">
                <xslot name="searchFields" slotSupport="field" />
            </element>
        </view>
    </pack>
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

:::warning
提示：

任何一个视图对应的布局模板都可以通过 `viewAction#load` 接口进行查看，如果不是通过接口返回的，那么在没有自定义注册的情况下，将使用默认布局模板进行渲染。

更多关于布局（Layout）的内容请参考：[Layout](/zh-cn/DevManual/Reference/Front-EndFramework/Widget/layout.md)

:::

按照插槽的合并规则，让我们尝试合并一下。将 `actions`、`searchFields`、`fields`、`rowActions` 分别合并到对应的包含 `slot` 属性和 `xslot` 标签的 XML 元素中：

``` xml
<view type="TABLE">
    <pack widget="group">
        <view type="SEARCH">
            <element widget="search">
                <!-- slot="searchFields" -->
                <field data="code" />
                <field data="name" />
            </element>
        </view>
    </pack>
    <pack widget="group">
        <element widget="actionBar">
            <!-- slot="actions" -->
            <action name="redirectCreatePage" label="创建" />
            <action name="delete" label="删除" />
        </element>
        <element widget="table">
            <element widget="expandColumn" />
            <!-- slot="fields" -->
            <field data="id" invisible="true" />
            <field data="code" />
            <field data="name" />
            <field data="countryList" />
            <element widget="rowActions">
                <!-- slot="rowActions" -->
                <action name="redirectDetailPage" label="详情" />
                <action name="redirectUpdatePage" label="编辑" />
            </element>
        </element>
    </pack>
</view>
```

这样，我们就得到了包含所有元素的一个完整页面。

## （二）属性合并

在 `DSL` 合并到 `布局（Layout）` 时，我们不仅可以将 `子元素` 进行替换或插入，也可以将 `template` 标签上定义的属性合并到具有 `slot` 属性的标签上。

以布局中的表格组件片段为例：

``` xml
<view type="TABLE">
    <element widget="table" slot="table" slotSupport="field">
        <element widget="expandColumn" slot="expandRow" />
        <xslot name="fields" slotSupport="field" />
        <element widget="rowActions" slot="rowActions" slotSupport="action" />
    </element>
</view>
```

如果我们有这样一个 DSL 片段：

``` xml
<view type="TABLE">
    <template slot="table" sortable="true">
        <field data="id" invisible="true"/>
        <field data="code"/>
        <field data="name"/>
        <field data="countryList"/>
    </template>
    <template slot="rowActions">
        <action name="redirectDetailPage" label="详情" />
        <action name="redirectUpdatePage" label="编辑" />
    </template>
</view>
```

那么，最终合并的结果是这样的：

``` xml
<view type="TABLE">
    <element widget="table" sortable="true">
        <field data="id" invisible="true" />
        <field data="code" />
        <field data="name" />
        <field data="countryList" />
    </element>
</view>
```

这样，我们就可以在表格组件上使用 `DSL` 中定义的 `sortable` 属性了。

但按照我们之前的标准合并规则，我们丢失了 `原布局` 中表格组件的所有子元素，只保留了 DSL 中的片段内容。显而易见的是，现在的表格已经将 `行内动作（rowActions）` 组件丢掉了，这一定不是我们想要的结果。

为了解决这个问题，我们提出了一个较为友好的解决方式——**逆向合并**。

## （三）逆向合并

**正向合并** 是指，通过 `布局` 控制所有元素相对位置，`DSL` 仅定义 `属性` 和 `子元素`，合并后所有元素的相对位置以 `布局` 为准不发生变化。

**逆向合并** 是指，通过 `DSL` 控制 布局 中包含 `slot` 属性的元素位置 ，`DSL` 定义的 `属性` 和 `子元素` 优先于 `布局` 中定义的 `属性` 和 `子元素`。但无法改变布局中的 `标签（dslNodeType）` 和 `插槽名（slot）`。

以布局中的表格组件片段为例：

``` xml
<view type="TABLE">
    <element widget="table" slot="table" slotSupport="field">
        <element widget="expandColumn" slot="expandRow" />
        <xslot name="fields" slotSupport="field" />
        <element widget="rowActions" slot="rowActions" slotSupport="action" />
    </element>
</view>
```

如果我们有这样一个 DSL 片段：

``` xml
<view type="TABLE">
    <template slot="table">
        <field data="id" invisible="true" />
        <field data="code" />
        <field data="name" />
        <field data="countryList" />
        <template slot="rowActions" activeCount="3">
            <action name="redirectDetailPage" label="详情" />
            <action name="redirectUpdatePage" label="编辑" />
        </template>
    </template>
</view>
```

那么，最终合并的结果是这样的：

``` xml
<view type="TABLE">
    <element widget="table">
        <field data="id" invisible="true" />
        <field data="code" />
        <field data="name" />
        <field data="countryList" />
        <element widget="rowActions" activeCount="3">
            <action name="redirectDetailPage" label="详情" />
            <action name="redirectUpdatePage" label="编辑" />
        </element>
    </element>
</view>
```

可以看出，在 `布局` 中定义的 `<element widget="rowActions">` 被合并到 `DSL` 定义的 `template` 标签位置，并且保留了 `DSL` 中的 `属性` 和 `子元素`。

## （四）属性插槽

如果我们仅需要为某个标签添加一些属性而不改变内部的子元素内容，我们可以在 DSL 中定义一个没有子元素的 template 标签来实现这个功能。

例如：

``` xml
<view type="TABLE">
    <pack widget="group" slot="tableGroup">
        <element widget="table" slot="table" slotSupport="field">
            ...
        </element>
    </pack>
</view>
```

``` xml
<view type="TABLE">
    <template slot="tableGroup" title="标题" />
    <template slot="table">
        <field data="id" invisible="true"/>
        <field data="code"/>
        <field data="name"/>
        <field data="countryList"/>
    </template>
</view>
```

``` xml
<view type="TABLE">
    <pack widget="group" title="标题">
        <element widget="table">
            <field data="id" invisible="true" />
            <field data="code" />
            <field data="name" />
            <field data="countryList" />
        </element>
    </pack>
</view>
```

对于 `<pack widget="group" title="标题">` 这个标签，我们成功将 `DSL` 中的 `title` 属性合并到布局中，并且没有修改任何内部子元素。

# 四、组件插槽

在 Widget 框架中，插槽这一概念不仅仅用于 `布局（Layout）` 与 `DSL` 之间进行片段的替换。为了让组件可以根据 DSL 定义产生变化，针对每个组件，我们都可以使用插槽这一功能为组件提供具体内容。这一点与 Vue 插槽的概念非常相似。

## （一）具名插槽

以卡片为例，我们希望可以分别定义顶部（header）、内容（content）以及底部（footer），在 Vue 组件中我们可以这样来定义 `Vue Template` 模板：

``` vue
<template>
  <div class="card-demo">
    <div class="card-demo-header">
      <slot name="header" />
    </div>
    <div class="card-demo-content">
      <slot name="content" />
    </div>
    <div class="card-demo-footer">
      <slot name="footer" />
    </div>
  </div>
</template>
```

这个 Vue 组件被绑定在一个 `CardDemoWidget` 组件上，那么，我们在 `布局（Layout）` 中可以通过这样的方式使用这个卡片组件：

``` vue
<element widget="CardDemo">
    <template slot="header" />
    <template slot="content" />
    <template slot="footer" />
</element>
```

在 `DSL` 中分别对这三部分内容进行声明：

``` vue
<view>
    <template slot="header">
        <field data="code" />
    </template>
    <template slot="content">
        <field data="name" />
        <field data="description" />
    </template>
    <template slot="footer">
        <action name="redirectDetailPage" label="详情" />
        <action name="redirectUpdatePage" label="编辑" />
    </template>
</view>
```

最终合并得到的 `Template` 模板是这样的：

``` vue
<element widget="CardDemo">
    <template slot="header">
        <field data="code" />
    </template>
    <template slot="content">
        <field data="name" />
        <field data="description" />
    </template>
    <template slot="footer">
        <action name="redirectDetailPage" label="详情" />
        <action name="redirectUpdatePage" label="编辑" />
    </template>
</element>
```

在这个合并过程中，将完全遵循 DSL 合并的规则，并最终保留 tempalte 标签为 Vue 组件插槽提供具体内容。

## （二）默认插槽

让我们将之前的 Vue Template 模板的 content 插槽名去掉，就像下面这样：

``` vue
<template>
  <div class="card-demo">
    <div class="card-demo-header">
      <slot name="header" />
    </div>
    <div class="card-demo-content">
      <slot />
    </div>
    <div class="card-demo-footer">
      <slot name="footer" />
    </div>
  </div>
</template>
```

那么，对于这个没有名称的插槽，在 `布局（Layout）` 中应该如何使用呢？由于最终渲染的 Template 模板是通过 `布局（Layout）` 和 `DSL` 合并得到的，我们可以有两种方式使用默认插槽，这一点与 Vue 插槽的功能是完全一样的。

### 1、使用 default 默认具名插槽

``` vue
<element widget="CardDemo">
    <template slot="header" />
    <template slot="default">
        <xslot name="content" />
    </template>
    <template slot="footer" />
</element>
```

最终合并得到的 `Template` 模板是这样的：

``` vue
<element widget="CardDemo">
    <template slot="header">
        <field data="code" />
    </template>
    <template slot="default">
        <field data="name" />
        <field data="description" />
    </template>
    <template slot="footer">
        <action name="redirectDetailPage" label="详情" />
        <action name="redirectUpdatePage" label="编辑" />
    </template>
</element>
```

### 2、自动收集子元素到默认插槽

``` vue
<element widget="CardDemo">
    <template slot="header" />
    <xslot name="content" />
    <template slot="footer" />
</element>
```

最终合并得到的 `Template` 模板是这样的：

``` vue
<element widget="CardDemo">
    <template slot="header">
        <field data="code" />
    </template>
    <field data="name" />
    <field data="description" />
    <template slot="footer">
        <action name="redirectDetailPage" label="详情" />
        <action name="redirectUpdatePage" label="编辑" />
    </template>
</element>
```

不论使用哪种方式，在 Vue 组件中获取到的插槽内容都是完全一样的。

# 五、默认视图与设计视图的区别

以“资源-国家分组”为例，其默认视图可能为：

```xml
<view name="tableView" type="TABLE" cols="2" model="resource.ResourceCountryGroup" enableSequence="false">
  <template slot="actions" autoFill="true"/>
  <template slot="rowActions" autoFill="true"/>
  <template slot="fields">
    <field span="1" invisible="true" data="id" label="ID" readonly="true"/>
    <field span="1" data="code" label="编码"/>
    <field span="1" data="name" label="名称"/>
    <field data="countryList" label="国家列表">
      <options>
        <option references="resource.ResourceCountry" referencesModelName="resourceCountry" referencesModuleName="resource" referencesType="STORE" referencesPks="id" referencesUniques="code" referencesLabelFields="name">
          <field name="name" data="name" label="国家/地区名称" ttype="STRING" store="true" relationStore="false"/>
          <field name="id" data="id" label="ID" ttype="INTEGER" store="true" relationStore="false"/>
        </option>
      </options>
    </field>
    <field span="1" data="createDate" label="创建时间" readonly="true"/>
    <field span="1" data="writeDate" label="更新时间" readonly="true"/>
    <field span="1" data="createUid" label="创建人ID"/>
    <field span="1" data="writeUid" label="更新人ID"/>
  </template>
  <template slot="search" cols="4">
    <field span="1" invisible="true" data="id" label="ID" readonly="true"/>
    <field span="1" data="code" label="编码"/>
    <field span="1" data="name" label="名称"/>
    <field span="1" data="createDate" label="创建时间" readonly="true"/>
    <field span="1" data="writeDate" label="更新时间" readonly="true"/>
  </template>
</view>
```

在“界面设计器”选择国家分组模型后生成的默认视图可能为：

```xml
<view model="resource.ResourceCountryGroup" type="table">
	<template slot="search">
		<field colSpan="QUARTER" data="code" widget="Input" />
		<field colSpan="QUARTER" data="name" widget="Input" />
		<field colSpan="QUARTER" data="createDate" widget="DateTimePicker" />
		<field colSpan="QUARTER" data="writeDate" widget="DateTimePicker" />
	</template>
	<template slot="tableGroup" />
	<template slot="actionBar">
		<action disabled="false" invisible="false" label="创建" name="redirectCreatePage" />
		<action disabled="!(context.activeRecords &amp;&amp; LIST_COUNT(context.activeRecords) &gt;= 1 &amp;&amp; LIST_AND(LIST_FIELD_NOT_IN(context.activeRecords, 'resource.ResourceCountryGroup','code',['Asia','Europe','Americas','Africa','Oceania'])))" invisible="false" label="删除" name="delete" />
	</template>
	<template slot="table">
		<field data="code" disabled="false" invisible="false" label="编码" readonly="false" required="true" widget="Input" />
		<field data="name" disabled="false" invisible="false" label="名称" readonly="false" required="true" widget="Input" />
		<field data="countryList" disabled="false" invisible="false" label="国家列表" readonly="false" required="false" widget="Select" />
		<field data="createDate" disabled="false" invisible="false" label="创建时间" readonly="true" required="false" widget="DateTimePicker" />
		<field data="writeDate" disabled="false" invisible="false" label="更新时间" readonly="true" required="false" widget="DateTimePicker" />
		<template slot="rowActions">
			<action disabled="false" invisible="false" label="详情" name="redirectDetailPage" />
			<action disabled="false" invisible="false" label="编辑" name="redirectUpdatePage" />
		</template>
		<field data="id" invisible="true" />
	</template>
</view>
```

经过对比，我们可以发现这两个 DSL 之间存在下面这些差异：

+ 使用的插槽不同
  - 在默认视图中主要用到了 `actions`、`rowActions`、`fields`、`search` 这四个插槽。
  - 在设计视图中主要用到了 `actionBar`、`rowActions`、`table`、`search` 以及 `tableGroup` 这五个插槽。

**差异原因**

默认视图主要是对元数据的动态生成，不涉及组件本身的属性配置，在没有具体的业务场景时，组件的属性配置是无法提前预知的。而设计视图需要在设计页面时对其进行多样化的配置，这些配置需要使用属性合并到对应组件上让它们可以正常使用。

+ 动作区的填充方式不同
  - 在默认视图中使用 `autoFill` 属性在视图编译时动态添加当前模型动作。
  - 在设计视图中将当前模型动作按相同方式提前进行了填充。

**差异原因**

默认视图在每次启动时根据菜单用到的模型会自动生成，当动作发生变更时，默认视图是不会发生变化的，这样就可以尽可能的减少数据库的更新次数。

设计视图在生成后需要对动作进行属性配置，因此动作区的动作也就被提前填充在动作区了。

:::warning 提示

默认视图中仅实现了动作的自动填充，这一设计主要基于两方面考量：

一方面，我们假定模型字段的变化频率低于模型动作。字段作为模型的基础数据结构，往往相对稳定；而动作作为交互逻辑的载体，更易随业务需求调整。因此，仅针对变化更活跃的动作进行自动填充，既能保障灵活响应需求，又能避免不必要的资源消耗。

另一方面，默认视图包含表格、表单、详情三种类型。其中，表单与详情视图均涉及布局功能，而布局计算会对运行时性能产生一定影响；相比之下，动作区的元数据采用顺序填充模式，逻辑简单且计算成本低。综合来看，只有动作区这类元数据具备运行时自动填充的必要性，从而在功能完整性与性能优化间取得平衡。

:::

+ 元数据属性生成规则不同
  - 默认视图的元数据属性是在编译时自动填充的，比如必填（required）、隐藏（invisible）等。
  - 设计视图的元数据属性是在生成时自动填充的。

**差异原因**

与动作的自动填充类似，设计视图在生成后需要对字段进行属性配置，因此部分元数据属性也就被提前填充了。

:::warning 提示

这里需要特别指出 `元数据属性` 和 `Ux 交互属性` 之间的区别：

**元数据属性**是指保存在元数据表中的部分交互属性，如 `Field` 注解上的 `required`、`invisible` 属性等。

**Ux 交互属性**是指通过 `UxWidget` 等交互 API 注解上的所有属性，这些属性配置是不体现在元数据表中的。

因此，当你使用了 **Ux 交互注解**时，生成的默认视图也会填充这些 **Ux 交互属性**。

:::

+ `span` 和 `colSpan` 不同
  - 默认视图使用 `cols` 和 `span` 属性配置数字来表示布局跨度。
  - 设计视图使用 `colSpan` 属性配置枚举来表示布局跨度。

**差异原因**

在 DSL 设计之初使用的是 `cols` 和 `span` 属性配置实现栅格布局的，但界面设计器在设计时认为组合配置的栅格对用户来说较难理解，以行维度进行单个字段配置比例是较为容易的，因此设计视图便使用了 `colSpan` 枚举属性进行配置。