---
title: 自定义视图
index: true
category:
  - 研发手册
  - 操作指南
order: 3

---
回想一下我们在 “[精通前端框架](/zh-cn/DevManual/Tutorials/MasterTheFront-endFramework/README.md)” 章节中的内容，我们简要提到过关于 `元素组件的注册` 相关内容，接下来让我们根据每个视图类型分别介绍内置视图组件的自定义方法。

`视图组件` 是一类特殊的 `元素组件`，它们通常在 `视图` 中作为 `数据源提供者` 存在的。它是整个视图运行的核心组件，对于视图组件运行逻辑的学习可以帮助我们更好的理解 Widget 框架提供的数据交互能力，并基于此创建更多可被抽象的视图展示形式，就像我们之前创建的甘特图视图那样。

在开始之前，我们先回顾一下 `元素组件的注册` 相关内容，接着动手做一些简单的练习，让我们可以对视图组件有更深刻的理解。

# 一、理论：元素组件的注册

在 Widget 框架中，元素组件被定义为通用组件，它可以用来实现任何你想实现的功能，并把它放在页面中的任何地方。

## （一）元素组件的注册可选项

```typescript
/**
 * Element组件注册可选项
 */
export interface BaseElementOptions extends SPIOptions {
  /**
   * 当前视图类型
   */
  viewType?: ViewType | ViewType[];
  /**
   * 组件名称
   */
  widget?: string | string[];
  /**
   * 内联组件
   */
  inline?: boolean;
  /**
   * 指定模型
   */
  model?: string | string[];
  /**
   * 指定视图
   */
  viewName?: string | string[];
}
```

从上述类型声明中不难发现，其分类维度涵盖以下多个方面：视图类型、组件名称、是否内联组件、模型编码以及视图名称。这些维度用于描述组件的使用位置。一般而言，位置描述得越“精确”，在相应位置进行渲染时，该组件所具备的优先级也就越高。在完全相同的位置描述的情况下，后注册的组件会覆盖先注册的组件。

特别的是，在大多数情况下，元素组件通常我们仅使用组件名称就可以满足大多数场景的需求了，这是由于元素组件一般包含了对数据结构、特定视图类型甚至特定场景的功能支持，其复用度一般通过页面结构进行划分，因此在之前的学习中，我们也只用到了组件名称这个单一维度。

## （二）内置元素组件

在 Oinone 中，不同的视图类型处理了不同的数据结构和表现形式，其所采取的数据处理和渲染方式也是不同的。Widget 框架对数据结构主要分为列表（`List`）和对象（`Object`）两大类。

下面根据数据结构和视图类型对一些组件进行了列举：
<table>
	<tr>
	    <th>数据结构</th>
      <th>视图类型</th>
      <th>组件</th>
      <th>基类</th>
	</tr >
	<tr >
	    <td rowspan="2">列表（List）</td>
      <td>表格（TABLE）</td>
      <td>TableWidget</td>
	    <td rowspan="2">BaseElementListViewWidget</td>

  </tr>
  <tr >
      <td>画廊（GALLERY）</td>
      <td>GalleryWidget</td>
  </tr>
  <tr >
	    <td rowspan="2">对象（Object）</td>
      <td>表单（FORM）</td>
      <td>FormWidget</td>
	    <td rowspan="2">BaseElementObjectViewWidget</td>

  </tr>
  <tr >
      <td>详情（DETAIL）</td>
      <td>DetailWidget</td>

  </tr>
</table>

一般而言，我们对视图组件的定义都离不开对平台内置功能的灵活运用。

:::warning 提示：

更多关于元素组件的内容请参考：[Element](/zh-cn/DevManual/Reference/Front-EndFramework/Widget/element.md)

:::

# 二、自定义表格组件

在这个练习中，我们将从零开始逐步实现一个表格组件，在这个过程中，可以让我们了解内置表格组件所提供的功能以及对一些标准组件的使用。

让我们开始动手吧～

## （一）创建 CustomTableWidget 组件

和所有的 `element` 组件一样，我们只需要继承 `TableWidget` 组件就可以获得默认表格组件的全部功能，就像这样：

```typescript
import CustomTable from './CustomTable.vue';

@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Table,
    widget: 'CustomTable'
  })
)
export class CustomTableWidget extends TableWidget {
  public initialize(props) {
    super.initialize(props);
    this.setComponent(CustomTable);
    return this;
  }
}
```

让我们先写一个 `hello world` 吧：

```vue
<template>
  <div class="custom-table-demo">hello world</div>
</template>
```

## （二）将 CustomTableWidget 显示在页面上

让我们通过 `registerLayout` 来切换组件，将 `widget="table"` 改为 `widget="CustomTable"` 来完成组件的切换：

```xml
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
        <element widget="CustomTable" slot="table" slotSupport="field">
            <element widget="expandColumn" slot="expandRow" />
            <xslot name="fields" slotSupport="field" />
            <element widget="rowActions" slot="rowActions" slotSupport="action" />
        </element>
    </pack>
</view>
```

:::warning 提示

关于内置布局的相关内容请参考：[Layout](/zh-cn/DevManual/Reference/Front-EndFramework/Widget/layout.md)

:::

好了，我们现在的页面应该是这样的：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/OperationGuide/custom-view/CustomTable.png)

## （三）使用 OioTable 组件

让我们对 Vue 组件模板进行一些修改：

```vue
<template>
  <div class="custom-table-demo">
    <oio-table
      ref="table"
      :data="showDataSource"
      border
      show-overflow
      :row-config="{ isCurrent: true, isHover: true }"
    >
      <slot />
    </oio-table>
  </div>
</template>
```

对应的 `props` 声明可以是这样：

```vue
props: {
  setTableInstance: {
    type: Function as PropType<(tableInstance: OioTableInstance | undefined) => void>
  },
  showDataSource: {
    type: Array as PropType<ActiveRecord[]>
  }
}
```

:::warning 提示

在 `BaseElementListViewWidget` 组件中提供了两个数据源对象：`dataSource` 和 `showDataSource`。

这两个数据源对象在不执行前端搜索和前端排序的情况下是完全一样的，在之前 [Create a gantt view](/zh-cn/DevManual/Tutorials/MasterTheFront-endFramework/chapter2-create-a-gantt-view.md)  教程中，我们已经使用过 `dataSource` 数据源对象，在这里我们使用另一个 `showDataSource` 数据源对象。

:::

在这里，我们要保证表格的功能不出问题，一定要使用 `setTableInstance` 方法将 `OioTable` 组件实例传递到 Widget 组件，这样就可以让 Widget 组件直接操作 `OioTable` 实例。这一点和我们在 [聚焦输入框](/zh-cn/DevManual/Tutorials/DiscoverTheFront-endFramework/chapter1-widget.md#九、聚焦输入框) 教程中的操作类似，都是为了将逻辑转移到 Widget 组件以此提供可被重写或继承的具体的功能。我们可以这样处理一下：

```vue
setup(props) {
  const table = ref<OioTableInstance | undefined>();

  onMounted(() => {
    props.setTableInstance?.(table.value);
  });

  return {
    table
  };
}
```

:::warning 提示

虽然不这样处理，我们也能看到页面被正常渲染了。但为了方便我们后续在某些功能上不出问题，在`挂载时`调用 `setTableInstance` 方法对 `TableWidget` 组件来说是十分必要的。

:::

到了这里，这样我们就能看到一个和默认表格的样式 “几乎” 完全一样的表格展示在页面上：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/OperationGuide/custom-view/oiotable.png)

Oops～，表格高度好像不太对，让我们写一个 `css` 调整一下：

```css
.custom-table-demo {
  height: 100%;
}
```

这样，我们的基础表格就完成啦～

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/OperationGuide/custom-view/chart.png)

## （四）使用 OioPagination 组件

让我们对 Vue 组件模板进行一些修改：

```vue
<template>
  <div class="custom-table-demo">
    ...
    <oio-pagination
      :page-size-options="pageSizeOptions"
      :current-page="pagination.current"
      :page-size="pagination.pageSize"
      :total="pagination.total"
      :show-total="true"
      :show-jumper="true"
      :show-last-page="true"
      @change="onPaginationChange"
    />
  </div>
</template>
```

对应的 `props` 声明可以是这样：

```typescript
props: {
  pageSizeOptions: {
    type: Array as PropType<(number | string)[]>
  },
  pagination: {
    type: Object as PropType<Pagination>,
    default: () => ({})
  },
  onPaginationChange: {
    type: Function as PropType<(currentPage: number, pageSize: number) => ReturnPromise<void>>
  }
}
```

这些属性有以下含义：

+ pageSizeOptions：分页大小可选项。
+ pagination：分页参数。包括当前页、分页大小、总页数、数据总大小。
+ onPaginationChange：在分页变更时调用。

到了这里，我们发现分页器虽然已经渲染出来了，但样式又出了一点问题。现在我们希望表格可以按屏幕撑开，分页器总是在页面的最下方。我们可以用 `flex` 布局调整一下：

```css
.custom-table-demo {
  height: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 16px;

  .oio-table {
    flex: 1;
    position: relative;

    .oio-table-content-wrapper {
      width: 100%;
      height: 100%;
      position: absolute;
    }
  }
}
```

由于 `vxe-table` 第三方组件的高度实现问题，表格组件在高度控制有些特殊，除了上面的 `css` 需要调整，我们还需要在 `OioTable` 组件上增加 `height="100%"` 属性，这样才可以让表格高度变得正常。

现在，我们的页面是这样的：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/OperationGuide/custom-view/oiopagination.png)

:::danger 警告

在上面我们给出了一个表格高度的解决方案，读者还可以自行解决表格高度的问题。

在自行解决高度问题时，需要考虑当表格数据量超过一个屏幕时出现的超出屏幕范围的问题。为了便于观察，我们可以将分页器改为 `30条/页` 这样就会让表格的高度撑开超出屏幕范围。

在上面我们给出的 `css` 样式中，`position: relative;` 和 `position: absolute;` 组合是解决高度问题的关键，利用脱离文档流的高度控制让表格高度限制在外层 div 的最大高度，使得表格组件的高度计算不会超出外层 div 的最大高度。

:::

为了让我们能快速测试一下分页功能，我们将 `分页大小可选项（pageSizeOptions）` 参数调整一下，把它改成 `[1, 2, 3, 4, 5]` 数组。我们还需要调整一下 `默认分页大小（defaultPageSize）` 参数，这样我们在首次进入页面的时候才可以选中对应的 `分页大小` 选项。

遵循我们对 Widget 组件和 Vue 组件的职责划分，我们应当在 `CustomTableWidget` 中调整这些参数，就像下面这样：

```typescript
@Widget.Reactive()
protected get pageSizeOptions(): number[] {
  return [1, 2, 3, 4, 5];
}

@Widget.Reactive()
protected get defaultPageSize(): number {
  return 2;
}
```

让我们来试试分页器是否正常工作吧。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/OperationGuide/custom-view/page.gif)

看起来我们的分页器已经可以正常工作了。让我们继续练习实现其他功能吧～

:::warning 提示

虽然我们对于分页功能的开发过程到这里已经结束了，但有一个变化需要我们明确提出来。

默认分页变更（`onPaginationChange`）方法会同步修改浏览器 `URL` 参数，追加 `currentPage` 和 `pageSize` 两个参数，用来保存当前页面的状态。

当页面被刷新时或 `URL` 被复制到其他地方的时候，会优先使用浏览器 `URL` 参数作为当前页面的分页参数。

:::

## （五）启用 Checkbox 功能

在表格首列，我们发现缺少了默认表格的 Checkbox 选中功能，让我们尝试还原一下这个功能吧。

让我们对 Vue 组件模板进行一些修改：

```vue
<template>
  <div class="custom-table-demo">
    <oio-table
      ref="table"
      :data="showDataSource"
      height="100%"
      border
      show-overflow
      :row-config="{ isCurrent: true, isHover: true }"
      :checkbox-config="{ trigger: 'row', highlight: true, checkMethod }"
      @checked-change="onCheckedChange"
      @checked-all-change="onCheckedAllChange"
    >
      <oio-column
        type="checkbox"
        class-name="table-column-checkbox"
        haader-class-name="table-header-column-checkbox"
        :width="52"
        align="center"
        fixed="left"
      />
      <slot />
    </oio-table>
    ...
  </div>
</template>
```

对应的 `props` 声明可以是这样：

```vue
props: {
  checkMethod: {
    type: Function
  },
  onCheckedChange: {
    type: Function as PropType<(data: ActiveRecords, event?: CheckedChangeEvent) => void>
  },
  onCheckedAllChange: {
    type: Function as PropType<(selected: boolean, data: ActiveRecord[], event?: CheckedChangeEvent) => void>
  }
}
```

到了这里，在不做任何其他处理的情况下，我们会发现这些方法并不能正常工作。这是因为 `OioTable` 组件发出的事件并不能直接被 `TableWidget` 组件进行处理。我们还需要在 `setup` 中做一个 “桥接” 处理，使得这些方法可以正常工作。对于具体方法的处理方式不同，我们需要根据 API 文档灵活处理。对于我们现在这个功能来说，我们可以像下面这样处理：

```vue
setup(props) {
  const onCheckedChange = (event: CheckedChangeEvent) => {
    const { records } = event;
    props.onCheckedChange?.(records, event);
  };

  const onCheckedAllChange = (event: CheckedChangeEvent) => {
    const { checked, records } = event;
    props.onCheckedAllChange?.(checked, records, event);
  };

  return {
    onCheckedChange,
    onCheckedAllChange
  };
}
```

:::warning 提示

在 `setup` 中使用与 `props` 声明的同名方法时，在 `setup` 中的优先级高于 `props` 声明。

:::

:::warning 提示

值得一提的是，在 Oinone 中，类似于 `onCheckedChange` 和 `onCheckedAllChange` 方法这样的设计还有很多。这样做的目的是，在组件抽象过程中，我们尽可能的不过多暴露标准组件事件参数的太多细节，在 Vue 组件中将一类行为的可处理参数从事件参数中进行分离，并且在内置 Widget 组件中尽可能少的使用组件的事件参数，这样可以最大化的保证一类行为的通用性。

当然，这也有一些例外，由于每个开发人员对于这样的抽象过程理解不同，最终也会定义一些未经过抽象、抽象程度不足或者过度抽象的方法。之前我们在 “教程” 中有多次提到过组件通用化是一门组件抽象哲学，这也就导致了在不同时期或者使用不同的第三方组件库都会导致对之前抽象行为的重新评估，希望读者在学习 Oinone 的过程中，可以总结出自己对于组件抽象的理解，以此更好的使用 Oinone 。

:::

在上面我们使用 `OioColumn` 组件添加了 `Checkbox` 列。除此之外，我们还可以通过在 `布局（Layout）` 中使用 `widget="checkbox-column"` 组件来添加 `Checkbox` 列，也可以达到相同的效果。

```xml
<element widget="checkbox-column" />
```

:::danger 警告

在测试 Checkbox 功能时，我们可能发现 “删除” 按钮并没有变为 “可点击” 状态，这是由于 “资源-国家分组” 这个页面在 “删除” 动作上配置了 “disabled” 属性，它是一个表达式，不允许用户删除指定的几个的国家分组，我们可以通过 “创建” 功能新建一个用于测试的国家分组数据进行 “删除” 功能的测试。

:::

## （六）更进一步

如果你有时间的话，这里有一些你可以尝试进行的练习内容：

1. 使用内置 API 启用 Radio 单选功能替换 Checkbox 多选功能。
2. 使用内置 API 启用排序功能。
3. 使用内置 API 启用行内编辑功能。

# 三、自定义表单组件

在这个练习中，我们将从零开始逐步实现一个表单组件，在这个过程中，可以让我们了解内置表单组件所提供的功能以及对一些标准组件的使用。

让我们开始动手吧～

## （一）创建 CustomFormWidget 组件

和自定义表格组件类似，我们可以通过继承 `FormWidget` 组件来创建 `CustomFormWidget` 组件来完成我们的练习内容。就像下面这样：

```typescript
import CustomForm from './CustomForm.vue';

@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Form,
    widget: 'CustomForm'
  })
)
export class CustomFormWidget extends FormWidget {
  public initialize(props) {
    super.initialize(props);
    this.setComponent(CustomForm);
    return this;
  }
}
```

在之后的小节中不再提供 `registerLayout` 方法使用的模板，读者可以根据 [Layout](/zh-cn/DevManual/Reference/Front-EndFramework/Widget/layout.md) 文章中提供的默认布局自行完成 `布局（Layout）` 注册和组件的切换。和上面创建 自定义表格组件 类似，我们先用 `hello world` 看到组件切换的效果页面：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/OperationGuide/custom-view/CustomFormWidget.png)

## （二）使用 OioForm 组件

相比于表格组件，`OioForm` 组件使用起来就比较简单，功能也没有表格组件那么复杂。让我们对 Vue 组件模板进行一些修改：

```vue
<template>
  <div class="custom-form-demo">
    <oio-form ref="form" class="oio-default-form" :layout="layout" :label-col="labelCol" :wrapper-col="wrapperCol">
      <pack widget="row">
        <slot />
      </pack>
    </oio-form>
  </div>
</template>
```

:::warning 提示

这里用到了 Pack 组件，它和我们在 布局（Layout） 中使用的 XML 定义 pack 标签是完全一样的。你可以在 布局（Layout） 中使用，也可以在 Vue 组件模板中使用。

更多关于 Pack 组件相关的内容请参考：[Pack](/zh-cn/DevManual/Reference/Front-EndFramework/Widget/pack.md)

:::

对应的 `props` 声明可以是这样：

```vue
props: {
  setFormInstance: {
    type: Function as PropType<(instance: OioFormInstance | undefined) => void>
  },
  layout: {
    type: [String, Object] as PropType<FormLayout>
  },
  labelCol: {
    type: Object as PropType<OioColModel>
  },
  wrapperCol: {
    type: Object as PropType<OioColModel>
  }
}
```

与表格组件类似，我们要保证表单的功能不出问题，一定要使用 `setFormInstance` 方法将 `OioForm` 组件实例传递到 Widget 组件，这样就可以让 Widget 组件直接操作 `OioForm` 实例。

接着，我们使用 `Pack` 组件、 `class="oio-default-form"` 和其他三个布局属性是为了让表单字段的布局样式和默认表单的保持一致。

到了这里，我们就完成了这一小节的练习内容。

:::warning 提示

更多关于 Form 相关的内容请参考：[Form](/zh-cn/DevManual/Reference/Front-EndFramework/Widget/View/form.md)

:::

# 四、自定义画廊组件

让我们回想一下在 “[Customize a gallery view](/zh-cn/DevManual/Tutorials/MasterTheFront-endFramework/chapter3-customize-a-gallery-view.md)” 中学习的关于自定义卡片组件的案例。在那个案例中，我们通过自定义画廊视图中的卡片组件完成了对画廊视图的自定义需求。

接下来，让我们创建一个画廊组件，用更加灵活的方式对画廊视图进行自定义吧。

在这个练习中，你将通过将表格视图转换为画廊视图进行展示，而不是直接使用画廊视图。并完成画廊布局的自定义以及卡片样式的自定义。

## （一）创建 CustomGalleryWidget 组件

和自定义表格组件类似，我们可以通过继承 `GalleryWidget` 组件创建 `CustomGalleryWidget` 组件来完成我们的练习内容。就像下面这样：

```typescript
import CustomGallery from './CustomGallery.vue';

@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Table,
    widget: 'CustomGallery'
  })
)
export class CustomGalleryWidget extends GalleryWidget {
  public initialize(props) {
    super.initialize(props);
    this.setComponent(CustomGallery);
    return this;
  }
}
```

:::warning 提示

需要注意的是，这里我们使用的视图类型是 `表格（TABLE）`，而不是 `画廊（GALLERY）`。

:::

## （二）使用 OioGallery 组件

让我们把 “[Customize a gallery view](/zh-cn/DevManual/Tutorials/MasterTheFront-endFramework/chapter3-customize-a-gallery-view.md)” 中实现的卡片 “摘抄” 过来，对应的 Vue 组件模板应该是这样的：

```vue
<template>
  <div class="custom-gallery-demo">
    <oio-gallery
      :list="showDataSource"
      item-key="__draftId"
      wrapperClassName="oio-scrollbar"
      :cols="cols"
      :gutter="gutter"
    >
      <template #default="{ key, data, index }">
        <div class="custom-card-demo" :key="key">
          <div class="custom-card-title">
            <b>{{ data.name }}({{ data.code }})</b>
          </div>
          <div class="custom-card-content">This is a content area.</div>
          <div class="default-card-row-actions">
            <action-bar widget="CardRowActions" inline :active-records="data" :row-index="index">
              <slot name="rowActions" />
            </action-bar>
          </div>
        </div>
      </template>
    </oio-gallery>
  </div>
</template>
```

对应的 `props` 声明可以是这样：

```vue
props: {
  showDataSource: {
    type: Array as PropType<ActiveRecord[]>
  },
  cols: {
    type: Number
  },
  gutter: {
    type: [Number, String, Array, Object] as PropType<CommonGutterType>
  }
}
```

再 “摘抄” 一部分 `css` 样式：

```css
.custom-card-demo {
  background-color: #ffffff;
  border: 1px solid #e3e7ee;
  border-radius: 4px;

  .custom-card-title {
    border-bottom: 1px solid #e3e7ee;
    text-align: center;
    padding: 16px 0;
  }

  .custom-card-content {
    padding: 16px;
    text-align: center;
  }
}
```

我们现在我们看到的页面是这样的：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/OperationGuide/custom-view/oioogallery.png)

:::warning 提示

结合 Vue 组件模板的定义，如果你没有在 `布局（Layout）` 中处理 `rowActions` 插槽的内容，那么，你可能无法正常看到卡片上的动作。关于这个问题，你可以在下一节中找到答案。

:::

## （三）修复卡片动作

按之前的方法直接切换组件的话，这里可能会丢失卡片中渲染的动作。有可能你是这样做的：

```xml
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
        <element widget="CustomGallery" slot="table" slotSupport="field">
            <element widget="expandColumn" slot="expandRow" />
            <xslot name="fields" slotSupport="field" />
            <element widget="rowActions" slot="rowActions" slotSupport="action" />
        </element>
    </pack>
</view>
```

其他地方的定义不变，让我们把 `CustomGallery` 这一段定义提取出来：

```xml
<element widget="CustomGallery" slot="table" slotSupport="field">
    <element widget="expandColumn" slot="expandRow" />
    <xslot name="fields" slotSupport="field" />
    <element widget="rowActions" slot="rowActions" slotSupport="action" />
</element>
```

现在，让我们回想一下 “[带插槽的通用卡片](/zh-cn/DevManual/Tutorials/DiscoverTheFront-endFramework/chapter1-widget.md#五、带插槽的通用卡片)” 一节，在 `布局（Layout）` 中，我们使用了 `插槽（Slot）` 以及在 `拓展内容` 部分提及的 `具名插槽` 相关内容。一个正确的定义应该是这样的：

```xml
<element widget="CustomGallery" slot="table" slotSupport="field">
    <xslot name="fields" slotSupport="field" />
    <template slot="rowActions" />
</element>
```

最终合并 DSL 后的结果可能是这样的：

```xml
<element widget="CustomGallery" slot="table" slotSupport="field">
    <field data="code" />
    <field data="name" />
    <template slot="rowActions">
        <action name="redirectDetailPage" />
        <action name="redirectUpdatePage" />
    </template>
</element>
```

:::warning 提示

在 `布局（Layout）` 和 `DSL` 进行合并时，只要布局中的 `XML` 标签上存在 `slot` 属性，那么在 `DSL` 中同名的 `template` 片段，属性会合并到对应标签上，子标签会插入到对应 `XML` 标签下。对于 `xslot` 标签的处理，则是完整的片段替换。这样也就得到了我们上面看到的最终合并 DSL 后的 `XML` 片段。

更多关于 DSL 的内容请参考：[DSL](/zh-cn/DevManual/Reference/Front-EndFramework/Widget/DSL.md)

:::

## （四）更多布局形式

在使用 `OioGallery` 组件时，我们只能做到按 `栅格布局` 顺序渲染的一种布局形式。要想自定义画廊的布局，我们可以通过 `v-for` 语句循环处理数据集，以此来实现更多可能的布局形式。

为了简单起见，我们在不使用 `OioGallery` 组件的情况下渲染出相同的页面，这样我们的 Vue 组件模板可以是这样的：

```vue
<template>
  <div class="custom-gallery-demo">
    <div class="custom-card-demo" v-for="(data, index) in showDataSource" :key="data.__draftId">
      <div class="custom-card-title">
        <b>{{ data.name }}({{ data.code }})</b>
      </div>
      <div class="custom-card-content">This is a content area.</div>
      <div class="default-card-row-actions">
        <action-bar widget="CardRowActions" inline :active-records="data" :row-index="index">
          <slot name="rowActions" />
        </action-bar>
      </div>
    </div>
  </div>
</template>
```

之前的页面是通过 `oio-row` 和 `oio-col` 的组合实现的 `栅格布局` ，每行四个卡片。为了达到相同效果，让我们添加这样一段 css 样式来看看效果：

```css
.custom-gallery-demo {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 16px;

  .custom-card-demo {
    flex-basis: calc((100% - 48px) / 4);
  }
}
```

:::warning 提示

在这个示例内容中，我们需要关心是对 `showDataSource` 属性的使用以及 `rowActions` 插槽的渲染，而不是最终展示的页面效果。再结合我们之前 “[Customize a gallery view](/zh-cn/DevManual/Tutorials/MasterTheFront-endFramework/chapter3-customize-a-gallery-view.md)” 章节的内容，我们同样可以达到自定义卡片样式的效果以及实现组件通用化。值得一提的是，相比于仅自定义卡片的方式，在这个示例内容中，我们可以有更多的属性来表示更多功能的变化。

:::

## （五）更进一步

如果你有时间的话，这里有一些你可以尝试进行的小改进：

1. 为我们的自定义画廊增加分页器。
2. 在卡片上增加 Checkbox，可以让用户进行选中操作。









