---
title: 章节 2：创建甘特视图（Create a gantt view）
index: true
category:
  - 研发手册
  - 教程
  - 精通前端框架
order: 2

---
我们来看看如何完全从零开始创建一个新视图。从某种程度上来说，这样做并不是非常困难，但关于如何创建新视图，并没有真正优质的参考资料。需要注意的是，在大多数情况下，问题可以通过自定义现有视图或使用客户端操作来解决。

对于这个练习，我们假设想要创建一个甘特图视图，这种视图能让我们用一组包含名称和起止日期的数据来直观查看活动或计划的进度，这在大多数业务系统中是非常普遍的。

在本次练习中，我们以任务排期为例进行说明。一个任务项包含名称、任务开始时间、任务结束时间。让我们在甘特图中更直观的查看这些任务在一个月内的排期吧。

# 一、准备工作

在 Oinone 中，所有元数据都是围绕模型展开的。因此，我们需要准备一个简单的模型和一些视图，并且需要创建两个菜单，一个页面用于数据录入，另一个页面用于呈现甘特图。

好了，让我们先着手构建出这样的原始页面吧。

**甘特图数据录入：**

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-2/ready1.png)

**甘特图：**

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-2/ready2.png)

:::info 注意

对这些模型和视图的准备内容不理解的读者，可以在下一节理论中得到答案。

:::

:::warning 提示

这些准备工作并不是这个练习需要学习的内容，如果你对这些内容还不是很熟悉，这里有些学习内容供你参考：

[模型设计器使用手册](/zh/UserManual/Designers/ModelDesigner/README.md)

[界面设计器使用手册](/zh/UserManual/Designers/UIDesigner/README.md)

[后端框架（Back-End framework）](/zh/DevManual/Tutorials/Back-endFramework/README.md)

:::

## （一）准备模型（GanttDemoModel）

你可以用`模型设计器`创建一个模型，也可以通过`后端`创建一个模型。

这个模型里面有编码、名称、任务开始日期以及任务结束日期这四个字段。

下面列出了在本次练习中，用到的模型（`GanttDemoModel`）的字段信息：

| **名称**     | **API名称**   | **字段类型**   | **是否多值** | **长度（单值长度）** |
| ------------ | ------------- | -------------- | ------------ | -------------------- |
| 编码         | code          | 文本（String） | 否           | 128                  |
| 名称         | name          | 文本（String） | 否           | 128                  |
| 任务开始日期 | taskStartDate | 日期（Date）   | 否           | -                    |
| 任务结束日期 | taskEndDate   | 日期（Date）   | 否           | -                    |


:::warning 提示

任务开始日期和任务结束日期的字段类型在这个练习中，我们使用日期（Date）类型进行处理，你可以根据自己的业务需要使用其他字段类型。理论来说，只要这两个字段类型可以表示一个“区间”即可。

:::

## （二）准备视图

除了模型之外，我们还需要一些视图，并且通过跳转动作将他们连接起来。你可以用`界面设计器`来完成这一系列的操作，也可以通过`后端`完成。

首先，我们需要两个表格视图，和上面的示例一样，一个用于数据录入，一个用于接下来甘特图的展示。

其次，我们还需要一个表单视图，用于填写并创建一些测试数据。

最后，分别将两个表格绑定在对应的菜单上，让我们可以通过点击菜单看到这些视图，并录入一些必要数据。

# 二、切换自定义组件

## （一）通过 registerLayout 切换自定义组件

像我们之前在 “探索前端框架” 章节练习的那样，我们可以通过注册这样一个布局（Layout）来切换组件，让我们将 `widget="table"` 改为 `widget="Gantt"` 来完成组件的切换：

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
        <element widget="Gantt" slot="table" slotSupport="field">
            <element widget="expandColumn" slot="expandRow" />
            <xslot name="fields" slotSupport="field" />
            <element widget="rowActions" slot="rowActions" slotSupport="action" />
        </element>
    </pack>
</view>
```

## （二）通过后端 DSL 切换自定义组件

让我们在 `<template slot="table">` 上添加 `widget` 属性，并且指定组件为 `Gantt`。

``` xml
<view model="demo.GanttDemoModel" type="table">
    <template slot="table" widget="Gantt">
        <field data="id" invisible="true" />

        <field data="code" />
        <field data="name" />
        <field data="taskStartDate" label="任务开始日期" />
        <field data="taskEndDate" label="任务结束日期" />
    </template>
</view>
```

# 三、理论：甘特图特征及方案设计

在动手开始本次练习之前，有一些必要的概念和设计需要明确提出来，这样可以方便我们接下来在实操过程中有一个基本的认识和理解。

## （一）甘特图

:::info 百度百科

甘特图（Gantt Chart）又称为横道图、条状图（Bar Chart），通过条状图来显示项目、进度和其他时间相关的系统进展的内在关系随着时间进展的情况。

:::

从甘特图所展示的内容来看，任何一个甘特图的数据都包含这些最基本的信息：名称和两个可以表示区间的值。这也就是我们在准备工作环节对模型设计的理论支持。

:::warning 提示

这篇文章在试图帮助读者理解任何一类视图在设计过程中的思考和见解，相同的方法论可以用在任何一类视图中，希望读者可以仔细体会整个通用视图的设计过程。

:::

## （二）视图类型和数据结构

在 Oinone 中，不同的视图类型处理了不同的数据结构和表现形式，其所采取的数据处理和渲染方式也是不同的。Widget 框架对数据结构主要分为列表（`List`）和对象（`Object`）两大类。

**视图类型选型依据参考**

<table>
	<tr>
	    <th>数据结构</th>
      <th>视图类型</th>
      <th>选型依据参考</th>
	</tr >
	<tr >
	    <td rowspan="2">列表（List）</td>
      <td>表格（TABLE）</td>
	    <td >根据视图配置的字段获取一组数据，且每条数据具有相同的数据结构<br/>不需要考虑字段在页面中的布局方式</td>

  </tr>
  <tr >
      <td>画廊（GALLERY）</td>
      <td >根据视图配置的字段获取一组数据，且每条数据具有相同的数据结构<br/>每条数据都可以渲染一个独立的区域，需要考虑在页面中的布局</td>

  </tr>
  <tr >
	    <td rowspan="2">对象（Object）</td>
      <td>表单（FORM）</td>
	    <td >根据视图配置的字段获取一条数据<br/>整个页面用于展示这一条数据的内容，需要考虑在页面中的布局<br/>这条数据的每个字段都可以进行编辑</td>

  </tr>
  <tr >
      <td>详情（DETAIL）</td>
      <td >根据视图配置的字段获取一条数据<br/>整个页面用于展示这一条数据的内容，需要考虑在页面中的布局<br/>这条数据的每个字段都不可以编辑，仅用于数据的查看</td>

  </tr>
</table>

:::warning 提示

更多关于视图类型和数据结构方面的内容请参考：[View architectures](/zh/DevManual/Reference/UserInterface/view-architectures.md)

:::

从视图类型来看，我们可以确定甘特图这类视图可以通过对表格（`TABLE`）视图进行改造，从而得到一个新的数据展示形式的视图类型——甘特图。这也就是我们在准备工作环节使用表格视图来呈现甘特图的理论支持。

## （三）技术选型

在做甘特图之前，我们需要选定一个前端组件库来支持我们的需求。如果可以自行实现的，也同样需要评估实现的难度和方案的可行性。

我们可以通过搜索或者询问 AI 等方式了解主流和热门的第三方组件库，下面是我们简要分析的关于甘特图的组件库对照表：

| **组件库名称**                   | **开源协议**                        | **技术栈** | **API是否易用** | **文档是否完善**   |
| -------------------------------- | ----------------------------------- | ---------- | --------------- | ------------------ |
| dhtmlxGantt                      | GPL V2                              | JS         | 是              | 是（可以付费支持） |
| gantt-elastic                    | MIT                                 | Vue + JS   | 否              | 否                 |
| gantt-schedule-timeline-calendar | NEURONET Free / Trial License Terms | Vue + TS   | 是              | 是（可以付费支持） |
| Vue-Ganttastic                   | MIT                                 | Vue + TS   | 是              | 是                 |


作为一个练习，我们对定制化开发的需求不高，并且可以保证快速上手即可。

因此我们可以选择 `Vue-Ganttastic` 组件库来实现我们的需求。

:::warning 提示

上面的组件库对照表只展示了针对本次练习需要关注的一些关键点，实际我们在技术选型时，可能还需要考虑到主题、美观度、国际化、更新周期等方面，这些参考维度可以根据实际情况进行调整。

:::

让我们通过官方文档尝试安装一下这个组件库吧。

官方文档：[https://zunnzunn.github.io/vue-ganttastic/getting-started.html](https://zunnzunn.github.io/vue-ganttastic/getting-started.html)

在本次练习中，我们使用 `"@infectoone/vue-ganttastic": "2.3.2"` 版本。

## （四）数据查询

根据甘特图的展示内容，我们发现在可视区域的数据总是在一个“区间”范围内的。以本次练习为例，我们在对任务进行排期的时候，是以精度为 “日” 的日期来表示一个“区间”的。

例如：我们需要查看从2025-05-01到2025-05-31区间内的任务项。

一个可能的查询条件可以是：

``` plain
taskStartDate >= '2025-05-01' and taskEndDate <= '2025-05-31'
```

:::warning 提示

在执行查询操作时，需要考虑时间格式、时间精度与区间连续性三个关键要素。在这个练习中，由于存储精度和查询精度一致，都是以“日”为精度，因此这三个要素是不需要考虑的。

下面让我们抛开这个练习内容，充分讨论一下这三个关键要素。

在 Oinone 中使用日期时间类型的字段进行传输时，无论用户在页面中选择何种格式的日期时间，均需要根据字段类型转换为标准的传输格式。如日期时间需要使用 “YYYY-MM-DD HH:mm:ss” 格式。

在 Oinone 中，我们对于日期时间类型的使用完全遵照数据库本身的设计，这也意味着当我们使用日期时间格式时，虽然在页面中可能无需选择 “秒” 这一项，但存储时仍然转换为例标准的传输格式，在查询时仍然需要考虑到 “秒级” 精度对数据集产生的影响。

当实际存储的数据精度与查询精度不一致时，区间连续性是一个必须考虑的因素。从用户视角来看，对于日期区间的常规认知为 “`左闭右闭`” 模式，这意味着在查询时，需确保 2025-05-31 当天的所有任务均被完整纳入。然而，为保证数据查询区间的连续性，我们实际执行查询时通常采用 “`左闭右开`” 区间规则。具体而言，需将日期范围向后顺延一天至 2025-06-01，且查询时间点不包含整点时刻，以此实现精准、完整的数据检索 。

在与上述正文中查询的数据集完全一致的情况下，一个可能的查询条件还可以是：

taskStartDate >= '2025-05-01 00:00:00' and taskEndDate < '2025-06-01 00:00:00'

:::

## （五）数据处理

在不经过排序和处理的情况下，我们在页面中拿到的原始数据可能是这样的：

``` json
[
    {
        "code": "T007",
        "name": "数据分析和报告制作",
        "taskStartDate": "2025-05-26",
        "taskEndDate": "2025-05-30",
        "id": "741211385631442610"
    },
    {
        "code": "T006",
        "name": "数据收集和录入",
        "taskStartDate": "2025-05-22",
        "taskEndDate": "2025-05-26",
        "id": "741211385631442591"
    },
    ...
]
```

根据我们的使用的第三方组件库对于数据结构的需求，我们需要按照一定的规则对数据进行处理。在这个练习中，我们简单的将所有任务根据开始时间升序排列，每行仅展示一个任务项，最终转换为组件所需的数据格式即可。

一个有效的数据格式可能是这样的：

``` json
[
    {
        "key": "1746783941876087636S8",
        "label": "项目立项调研",
        "bars": [
            {
                "barStart": "2025-04-30",
                "barEnd": "2025-05-05",
                "ganttBarConfig": {
                    "id": "1746783941876087636S8",
                    "label": "项目立项调研"
                }
            }
        ]
    },
    {
        "key": "17467839418760876YHTN",
        "label": "问卷设计",
        "bars": [
            {
                "barStart": "2025-04-30",
                "barEnd": "2025-05-01",
                "ganttBarConfig": {
                    "id": "17467839418760876YHTN",
                    "label": "问卷设计"
                }
            }
        ]
    }
    ...
]
```

# 四、理论：元素组件的注册

在之前创建仪表盘时，我们所创建的所有组件都属于元素组件（element），它们有一个共同的基类 `BaseElementWidget` ，并且它们的使用方式也都相对简单，没有任何框架约束，是一个可以完全自定义的组件。但元素组件并不止于此。

在 Widget 框架中，元素组件被定义为通用组件，它可以用来实现任何你想实现的功能，并把它放在页面中的任何地方。

## （一）元素组件的注册可选项

``` typescript
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

从上述类型声明中不难发现，其分类维度涵盖以下多个方面：视图类型、组件名称、是否内联组件、模型编码以及视图名称。这些维度用于描述组件的使用位置。一般而言，位置描述得越“精确”，在相应位置进行渲染时，该组件所具备的优先级也就越高 。在完全相同的位置描述的情况下，后注册的组件会覆盖先注册的组件。

特别的是，在大多数情况下，元素组件通常我们仅使用组件名称就可以满足大多数场景的需求了，这是由于元素组件一般包含了对数据结构、特定视图类型甚至特定场景的功能支持，其复用度一般通过页面结构进行划分，因此在之前的学习中，我们也只用到了组件名称这个单一维度。

## （二）内置元素组件

在 Oinone 中，不同的视图类型处理了不同的数据结构和表现形式，其所采取的数据处理和渲染方式也是不同的。Widget 框架对数据结构主要分为 `列表（List）` 和 `对象（Object）` 两大类。

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
	    <td >TableWidget</td>
      <td rowspan="2">BaseElementListViewWidget</td>

  </tr>
  <tr >
      <td>画廊（GALLERY）</td>
      <td >GalleryWidget</td>

  </tr>
  <tr >
	    <td rowspan="2">对象（Object）</td>
      <td>表单（FORM）</td>
	    <td >FormWidget</td>
      <td rowspan="2">BaseElementObjectViewWidget</td>

  </tr>
  <tr >
      <td>详情（DETAIL）</td>
      <td >DetailWidget</td>

  </tr>
</table>


一般而言，我们对视图组件的定义都离不开对平台内置功能的灵活运用。

:::warning 提示

更多关于元素组件的内容请参考：[Element](/zh/DevManual/Reference/Front-EndFramework/Widget/element.md)

:::

# 五、创建一个 Gantt 组件

这一节内容结束后，你应该可以看到这样一个类似的页面，它是 `Vue Ganttastic` 官方提供的快速开始中的展示内容。

接下来，让我们一步一步实现它吧。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-2/gantt.png)

## （一）引入第三方组件库

和大多数 `Vue` 工程不同，在 Oinone 中，我们不再主动创建 `Vue` 的 `App` 对象以及挂载，而是在 `main.ts` 中使用 `VueOioProvider` 进行初始化。但获取 `Vue` 的 `App` 对象这一点并不困难，你可以像下面这样使用：

``` typescript
VueOioProvider({}, [
  () => {
    const app = RuntimeContextManager.createOrReplace().frameworkInstance as App;
    // do something.
  }
]);
```

:::warning 提示

VueOioProvider 方法不能执行多次，这里只需要将现有的 VueOioProvider 添加第二个参数，通过回调函数就可以扩展一些加载逻辑。

更多关于 VueOioProvider 的内容请参考：[Context](/zh/DevManual/Reference/Front-EndFramework/context.md)

:::

## （二）定义 Widget 组件

和我们之前接触到的组件类似，表格是一个 `element` 组件，但是表格组件和甘特图看起来就不是一类组件，也就是说，我们不能通过继承 `TableWidget` 来完成这一功能，退而求其次，我们可以通过继承 `BaseElementListViewWidget` 获得自动获取元数据以及发起查询请求的功能。

``` typescript
import Gantt from './Gantt.vue';

@SPI.ClassFactory(
  BaseElementWidget.Token({
    viewType: ViewType.Table,
    widget: ['gantt', 'Gantt']
  })
)
export class GanttWidget extends BaseElementListViewWidget {
  public initialize(props) {
    super.initialize(props);
    this.setComponent(Gantt);
    return this;
  }
}
```

:::warning 提示

值得一提的是，由于本次练习中组件使用了单个单词进行命名，因此这里需要对 `viewType` 进行限定，否则在未来 Oinone 平台进行迭代过程中，可能会出现名称冲突的问题。

为了避免这些不必要的冲突，我们建议在使用 Oinone 平台过程中，所有组件都使用两个以上的单词进行命名。

组件名称使用多个时，意味着你可以使用任何一个组件名称来使用这个组件，这相当于给组件起了别称。

:::

这里不再赘述 `Vue` 组件的内容，这些你都可以在 `Vue Ganttastic` 官网文档中找到的。

:::warning 提示

Oinone 使用的技术栈是 `TypeScript` ，而大多数第三方组件库提供的都是基于 `JavaScript` 的示例，这里需要在 `script` 标签上添加 `lang="ts"` 来启用 `TypeScript` 语法支持。

:::

做到这里，你应该已经可以看到这一小节开头所展示的页面了。让我们继续吧。

# 六、数据结构的定义

在之前的教程中，我们没有对数据结构进行过多的解释，更多的是直接展示一段代码而已。但对于一个较为复杂的组件而言，通过 `types.ts` 文件单独定义数据结构类型是非常必要的，在一些更加大型的组件中，甚至是通过一个目录来对一系列类型进行定义的。

在我们初步了解了第三方组件的基础使用之后，我们可以直接根据第三方组件提供的可被渲染的数据结构进行定义，这样做也是最简单的，就像下面这样定义：

``` typescript
export interface GanttBars {
  key: string;
  label: string;
  bars: GanttBar[];
}

export interface GanttBar {
  barStart: Date;
  barEnd: Date;
  ganttBarConfig: {
    id: string;
    label: string;
  };
}
```

:::warning 提示

通常情况下，我们使用类型声明文件也可以解决同一数据结构在多个文件中使用的依赖问题。

还有一个关于设计的小思考：

我们发现，虽然在第三方组件中提供了 `bar-start` 和 `bar-end` 这两个字段用来声明动态字段的名称，但考虑到这个数据结构与我们拿到的原始数据结构差别较大，数据结构的转换是不可避免的，因此我们可以有取舍的对数据结构进行设计，并且放弃一部分第三方组件提供的功能。

在很多时候，我们在对 `Widget` 组件和 `Vue` 组件通信的数据结构上，大部分都倾向于使用第三方组件使用的数据结构。

但有时候，对于一组类似的 Vue 组件，我们可能会对 Vue 组件的属性和行为进行再次抽象，从而设计出一种适合多种 Vue 组件的数据结构，这也使得我们的数据转换需要进行两次。

其实，这就是执行效率和适配性之间的权衡，我们希望读者在设计组件适用的数据结构时可以有所考量。

:::

有了数据结构，我们就可以将 Vue 组件按照这个数据结构定义模板，一个可能的模板可以是这样：

``` vue
<template>
  <div class="gantt-demo">
    <g-gantt-chart
      :chart-start="chartStart"
      :chart-end="chartEnd"
      :date-format="false"
      :precision="precision"
      bar-start="barStart"
      bar-end="barEnd"
    >
      <g-gantt-row v-for="bars in ganttData" :key="bars.key" :label="bars.label" :bars="bars.bars" />
    </g-gantt-chart>
  </div>
</template>
```

对应的 props 声明可以是这样：

``` vue
props: {
  chartStart: {
    type: Date,
    required: true
  },
  chartEnd: {
    type: Date,
    required: true
  },
  precision: {
    type: String as PropType<GanttPrecision | keyof GanttPrecision | string>
  },
  ganttData: {
    type: Array as PropType<GanttBars[]>
  }
}
```

:::warning 提示

这里多了一个 GanttPrecision 枚举的类型声明，它是根据第三方组件提供的属性可选项进行定义的。当然了，你也可以不这样定义，使用字符串也是一样的。

:::

在 `GanttWidget` 组件中，我们会定义 `chartStart` 、 `chartEnd` 以及 `precision` 属性。这些属性可以在组件挂载前初始化或者直接使用计算属性进行定义。

让我们先使用固定值定义这些属性吧：

``` typescript
@Widget.Reactive()
protected get chartStart(): Date {
  return DateUtil.toDate('2025-04-28', 'YYYY-MM-DD');
}

@Widget.Reactive()
protected get chartEnd(): Date {
  return DateUtil.toDate('2025-06-03', 'YYYY-MM-DD');
}

@Widget.Reactive()
protected get precision(): GanttPrecision | keyof GanttPrecision | string | undefined {
  return GanttPrecision.day;
}
```

接下来，我们还差最后一步，通过 `GanttWidget` 组件定义 `ganttData` 属性并赋值。

# 七、数据结构转换

数据是如何被查询获取的呢？在回答这个问题之前，我们可以打开浏览器的控制台查看网络请求。可以发现，虽然我们将表格组件换成了一个没有功能的甘特图示例，但和表格一样，它也同样会发起一个 `queryPage` 的请求，并且默认获取了第一页的数据返回到前端，这一系列的行为都在 `BaseElementListViewWidget` 基类中被定义，默认的表格组件也仅仅只是这些数据展示的载体而已。

那么，我们应该在什么时机获取到这些数据，并且追加转换逻辑呢？

在 `BaseElementListViewWidget` 基类提供了一个挂载时处理函数（`mountedProcess`），我们可以在调用父类方法后通过 `dataSource` 获取到这些数据，并把它转换为我们所需要的 `ganttData` 。就像下面这样做：

``` typescript
@Widget.Reactive()
protected ganttData: GanttBars[] | undefined;

protected async mountedProcess(): Promise<void> {
  await super.mountedProcess();
  this.ganttData = this.convertGanttData(this.dataSource || []);
}
```

这里我们为读者提供了一段实现参考，里面用到了一些内置工具类和内置属性。当然了，你并不一定只能这样做，根据数据特征我们还可以有其他实现方式。

``` typescript
protected convertGanttData(list: ActiveRecord[]): GanttBars[] {
  const dateFormat = 'YYYY-MM-DD';
  const ganttData: GanttBars[] = [];
  for (const data of list) {
    const key = this.generatorKey(data);
    let barStartVal = data.taskStartDate as string | undefined;
    if (!barStartVal) {
      continue;
    }
    let barEndVal = data.taskEndDate as string | undefined;
    if (!barEndVal) {
      continue;
    }
    const barStart = DateUtil.toDate(barStartVal, dateFormat);
    if (!barStart) {
      continue;
    }
    const barEnd = DateUtil.toDate(barEndVal, dateFormat);
    if (!barEnd) {
      continue;
    }
    const label = (data.name as string) || '';
    ganttData.push({
      key,
      label,
      bars: [
        {
          barStart,
          barEnd,
          ganttBarConfig: {
            id: key,
            label
          }
        }
      ]
    });
  }
  return ganttData;
}

protected generatorKey(data: ActiveRecord) {
  return data.__draftId || this.model.pks?.map((pk) => data[pk])?.join('-') || uniqueKeyGenerator();
}
```

:::warning 提示

对于 `generatorKey` 方法，我们有必要对其进行一些解释。在任何一个 `ActiveRecord` 对象中，都会存在一个 `__draftId` 属性作为这条数据的唯一标识，但并不是任何情况下都存在的。因此我们还需要通过其他方式生成一个唯一标识。

在大多数情况下，模型的主键有且仅有一个，那就是 `id` ，但有时也会出现多个字段作为联合主键的情况，因此我们需要简单处理一下。

还有一个极其特殊的情况，使用这个组件的页面对应的模型没有任何一个主键，这时候我们需要随机生成一个，以保证这个组件可以正常运行。虽然这种情况很少发生，但也是我们需要考虑的一个关键点。

特别的是，如果这个唯一标识被用来做选中或其他操作，当 ActiveRecord 中不存在 `__draftId` 时，我们通过其他方式生成的唯一标识必须回填到 ActiveRecord 对象中，以保证它在更新渲染时不会发生变化，导致选中态丢失。

:::

做到这一步，我们终于可以看到一个包含真实数据的甘特图页面啦～

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-2/real-gantt.png)

Oops～，中间两条数据的展示出现了问题，不仅如此，其他数据展示的长度好像都差了一天。让我们观察一下丢失的这两条数据，不难发现 `taskStartDate` 和 `taskEndDate` 是相同的。我们已经明确了问题，这是由于第三方组件在渲染的时候是根据具体时间进行渲染的，两个相同的值中间是没有间隔的，因此我们可以统一将 `taskEndDate` 向后推一天，以此来修复这个 BUG。

我们可以这样处理一下 `taskEndDate` 的转换：

``` typescript
const barEndDate = moment(barEndVal, dateFormat);
barEndDate.add(1, 'day');
const barEnd = barEndDate.toDate();
```

:::warning 提示

在日期计算这里，Oinone 默认使用 moment 工具对日期时间进行处理，我们建议对于不一样的第三方组件库，使用相同的日期处理工具，这样可以保证日期时间的转换在各个地方的使用是完全一致的。在自定义组件中，读者也可以使用自己习惯的日期时间处理工具。

:::

好了，我们现在的页面应该是这样的：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-2/real-gantt2.png)

# 八、处理数据查询

到目前为止，虽然我们可以看到这些数据了，但我们没有对数据的查询做任何处理，这也就意味着，在我们的甘特图中，将根据创建时间倒序，并仅展示前15条数据的内容。这就是我们列表（`List`）数据结构对应的默认查询规则。

:::warning 提示

默认排序规则可以通过后端定义模型时进行修改，以上所说的排序规则是在没有任何指定的情况下的默认排序规则。

:::

很显然，这和我们的甘特图默认查询规则不太符合，在这个练习中，我们希望可以有以下查询规则：

+ 查询一个日期区间的数据，并且不进行分页。
+ 按照`任务开始时间`升序排列；若任务开始时间相同，再按照`任务结束时间`降序排列。

那么，要想达到这一目的，我们可以通过重写 `BaseElementListViewWidget` 组件提供的 `queryPage` 方法，在查询之前对查询条件，分页，排序等参数进行处理。

就像下面这样：

``` typescript
public async queryPage<T = ActiveRecord>(
  condition: Condition,
  pagination: Pagination,
  sort: ISort[],
  variables: QueryVariables,
  context: QueryContext
): Promise<QueryPageResult<T>> {
  const dateFormat = 'YYYY-MM-DD';
  const { chartStart, chartEnd } = this;
  // 不使用分页
  pagination.pageSize = -1;

  // 追加查询条件
  condition.and(
    new Condition('taskStartDate')
      .greaterThanOrEuqalTo(DateUtil.dateFormat(chartStart, dateFormat))
      .and(new Condition('taskEndDate').lessThanOrEqualTo(DateUtil.dateFormat(chartEnd, dateFormat)))
  );

  // 追加排序规则
  sort.push(
    {
      sortField: 'taskStartDate',
      direction: EDirection.ASC
    },
    {
      sortField: 'taskEndDate',
      direction: EDirection.DESC
    }
  );
  return super.queryPage<T>(condition, pagination, sort, variables, context);
}
```

到目前为止，我们初步的功能就已经全部做完了，我们现在的页面应该是这样的：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-2/real-gantt3.png)

接下来，我们希望我们的组件可以用在任何需要使用的地方，这就离不开我们的 `DSL` 配置。那么，如何通过属性让组件变得通用呢？让我们继续往下看。

# 九：通过属性让组件变得通用

组件通用化是一门组件抽象哲学，一个好的属性设计可以让组件适应大多数的情况，但这是一个需要长久体会的过程。通过这一部分内容，我们希望读者可以对 Widget 框架提供的配置灵活使用，并逐步体会组件通用化这样的开发体验。

这一节内容在理论方面的讨论较多，旨在帮助读者可以构建一个组件通用化的思想和一些必要的权衡，希望读者可以耐心看完，并对组件通用化有自己的见解。在 Oinone 中，每个组件都经历了这样的抽象过程，它也是未来我们在使用 Oinone 过程中的“重要基石”。

## （一）消除模型影响和配置项提取

要想让甘特图适应更多模型，被更多视图所使用，消除模型影响和配置提取是必然的。说的简单一些，就是不能让数据结构限制组件的取值，我们通常的做法是将这些需要的字段通过配置映射的方式让它变得更加灵活。

在我们实现这一个组件的过程中，我们发现有一些属性是可以被提取出来作为配置的，就像我们之前定义的那些固定值，这就是一些可以被配置的属性：

+ chartStart：甘特图展示内容的开始日期。
+ chartEnd：甘特图展示内容的结束日期。
+ precision：甘特图展示的日期时间精度。

不仅如此，我们还发现，在数据结构转换的过程中，我们该从数据集中知道哪些字段可以用来表示标题，哪些字段可以用来表示每个任务项的开始日期和结束日期？

由此，我们可以定义这样三个配置，让取值不受模型影响的约束：

+ labelField：标题字段。
+ startField：开始日期字段。
+ endField：结束日期字段。

仅仅将数据取出来还不够，我们还需要一个字段来表示日期时间的格式：

+ dateFormat：日期时间格式

到了这里，我们是不是就可以开始动手了呢？显然还不够，我们还需要更近一步的思考。

## （二）更近一步的思考

在我们完成了配置项的提取后，将这些配置通过从 `DSL` 读取的方式让它变得看起来可以配置，但有一些问题是我们无法解决的，对于这些问题，我们也给出了一些参考答案：

1. 用户进入视图时，难道每一次看到的都是固定日期范围的任务项吗？显然不是的，我们需要根据当前时间展示当前月的任务计划，这样才更可能符合用户需求。
2. 标题字段用简单的字段表示可以满足多少场景？有没有可能标题是通过多个字段拼接的形式进行展示呢？针对这个问题，我们可以使用表达式将标题进行处理，以此来达到更加灵活的目的。
3. 让用户直接配置日期时间格式显然不是一个有效的做法，它和我们使用的日期时间处理工具是完全匹配的。当我们的处理工具发生变动时，我们将无法有效的兼容以往存在的旧功能进行平滑过渡。我们可以通过一些枚举项来表示格式，这样就可以和具体的日期时间格式解耦。就像我们的模型元数据设计的那样，对于日期时间我们有四种字段业务类型：日期时间（`DATETIME`）、日期（`DATE`）、时间（`TIME`）、年份（`YEAR`），我们的枚举项也可以是这些。

作为一个练习，我们对每个问题都给出了一个我们认为比较可行的实现方案供读者参考，这些实现方案中也包含了一些 Oinone 的内置功能和工具，在未来使用 Oinone 的过程中也可以提高我们的开发效率。

:::info 注意

在这里我们需要特别提醒一下读者，针对任何一个自定义组件，在设计和实现的过程中，你需要想象一下，如果你是这个组件的使用者，你会如何评价这个组件定义的 `API` 呢？

这和大多数第三方组件库的开发是类似的，大多数组件库的 `API` 都是经过仔细考虑后向外提供的。

:::

## （三）实现日期时间格式配置

让我们先来看这样的一种实现方式：

``` typescript
export enum GanttDateType {
  datetime = 'datetime',
  date = 'date',
  time = 'time',
  year = 'year'
}
```

``` typescript
import { defaultDateFormat, defaultFormat, defaultTimeFormat, defaultYearValueFormat } from '@oinone/kunlun-dependencies';

@Widget.Reactive()
protected get dateType(): GanttDateType {
  return this.getDsl().dateType || GanttDateType.date;
}

@Widget.Reactive()
protected get dateFormat(): string {
  const { dateFormat } = this.getDsl();
  if (dateFormat) {
    return dateFormat;
  }
  switch (this.dateType) {
    case GanttDateType.datetime:
      return defaultFormat;
    case GanttDateType.date:
      return defaultDateFormat;
    case GanttDateType.time:
      return defaultTimeFormat;
    case GanttDateType.year:
      return defaultYearValueFormat;
    default:
      return defaultDateFormat;
  }
}
```

在这个实现方式中，我们首先定义了一个表示日期时间类型的枚举 `GanttDateType` 让用户可以通过 `dateType` 这个配置来实现对日期时间格式的配置。不仅如此，我们还可以让用户通过 `dateFormat` 直接配置不在默认格式化类型中的其他格式，这样做的话，就能适应较多的场景了。

:::warning 提示

在 Oinone 中，我们将一个组件可能涉及到的值类型进行了区分：

+ 默认值：组件在未获取到配置的情况下使用的值，一般为空时也会使用默认值。
+ 初始值：组件通过配置可以对其进行修改，甚至可以置空。
+ 真实值：在运行时保存在组件中，可能被其他任何地方使用的值。
+ 显示值：将真实值通过一定格式或方法转换后的值。
+ 提交值：在表单字段中，将真实值转换后提交到后端的值。

例如对于日期时间类型来说，保存在组件中的真实值类型可能是 `JavaScript` 提供的 `Date` 类型，显示在页面上的值可能是 “2025年05月01日 00:00:00”，提交到后端值可能是 “2025-05-01 00:00:00”。

:::

## （四）实现标题表达式配置

让我们先来看这样的一种实现方式：

``` typescript
protected get labelField(): string | undefined {
  return this.getDsl().labelField;
}

protected get barLabel(): string | undefined {
  return this.getDsl().barLabel;
}

protected get defaultLabelValue() {
  return '未命名';
}

protected executeExpression<T>(
  activeRecord: ActiveRecord,
  expression: string,
  errorValue?: T
): T | string | undefined {
  return Expression.run(
    {
      activeRecords: [activeRecord],
      rootRecord: this.rootData?.[0] || {},
      openerRecord: this.openerActiveRecords?.[0] || {},
      scene: this.scene
    } as ExpressionRunParam,
    expression,
    errorValue
  );
}

protected computeBarLabel(data: ActiveRecord): string {
  const { labelField, barLabel, defaultLabelValue } = this;
  if (barLabel) {
    return this.executeExpression(data, barLabel, defaultLabelValue) || defaultLabelValue;
  }
  if (labelField) {
    return toString(data[labelField]);
  }
  return defaultLabelValue;
}
```

在这个实现方式中，我们允许用户通过 `labelField` 标题字段来配置标题，也可以让用户通过 `barLabel` 配置表达式来计算标题。

在没有配置或者表达式计算错误的情况下，我们也提供了默认标题，但这个属性好像没有配置的必要，先用固定值处理吧。

然后我们需要使用 Oinone 提供的 `Expression.run` 方法来计算表达式，由于这个表达式的入参较多，并且可能被其他方法重复使用，我们通过定义 `executeExpression` 方法来封装这样的入参结构，方便我们在其他方法中使用。

最后就是标题的计算逻辑了。我们先判断是否需要通过表达式计算标题，这种方式的灵活性最高，因此它的优先级也最高。在没有配置表达式但配置了标题字段的情况下，我们通过标题字段直接获取标题的值。最后如果配置的有问题，我们使用默认标题向用户展示。

:::warning 提示

更多关于表达式的内容请参考：[Expression Service](/zh/DevManual/Reference/Front-EndFramework/Services/expression-service.md)

:::

## （五）根据当前时间计算展示范围

让我们先来看这样的一种实现方式：

``` typescript
@Widget.Reactive()
protected chartStart: Date = new Date();

@Widget.Reactive()
protected chartEnd: Date = new Date();

protected beforeMount() {
  const currentMonthVal = moment(new Date());
  currentMonthVal.startOf('month');
  this.chartStart = currentMonthVal.subtract(3, 'day').toDate();
  this.chartEnd = currentMonthVal.add(3, 'day').add(1, 'month').add(3, 'day').toDate();
}
```

我们通过 `moment` 工具将当前日期时间变为可编辑的对象，使用相关的 `API` 进行编辑即可。

:::warning 提示

这里我们先将时间改为当前月的第一天，再减去三天作为甘特图的起始日期，再加一个月零六天作为甘特图的结束日期。这样就可以做到以当前月为基准，前后多三天来展示甘特图了。

更多 `moment` 工具 `API` 请参考：[https://momentjs.com/docs](https://momentjs.com/docs)

:::

## （六）实现其他配置

``` typescript
@Widget.Reactive()
protected get precision(): GanttPrecision | keyof GanttPrecision | string | undefined {
  return this.getDsl().precision || GanttPrecision.date;
}
```

## （七）应用这些配置到方法中

至此，我们已经对目前我们能想到的所有配置项完成了初步的实现。还差最后一步，将这些配置项使用在组件的各个地方，并在`界面设计器`或后端 `DSL` 中配置它们吧。

让我们看一下一个配置了表达式的效果图：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-2/tygantt.png)

在 `XML` 中配置的属性是这样的：

``` xml
<element widget="Gantt"
    barLabel="activeRecord.name + '(' + activeRecord.code + ')'"
    startField="taskStartDate"
    endField="taskEndDate" />
```

到了这里，我们已经达到让任何一个可以展示为甘特图的模型都可以展示成甘特图的目的了。

但这个视图看起来还缺了点什么，比如：分页。让我们继续往下看。

# 十、通过分页查看数据

甘特图的分页与表格的分页是完全不同的，在表格中我们可以使用 `OioPagination` 来实现分页功能，但甘特图显然是不可以直接使用的。

作为一个练习，我们可以简单的通过两个按钮进行月份的切换操作即可，正如下面所展示的这样：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-2/page-gantt.gif)

在上一小节中，我们已经实现了进入页面时根据当前时间计算展示范围的功能。在此基础上，我们可以发现月份的切换可以是基于当前月份的偏移量，根据这个偏移量，我们就可以将展示范围以月为单位进行更改，这样就实现了按月查看的分页效果。

一个可能的实现可以是这样的：

``` typescript
@Widget.Reactive()
protected monthOffset: number = 0;

@Widget.Method()
public async onMonthOffsetChange(monthOffset: number) {
  this.monthOffset = monthOffset;
  const { chartStart, chartEnd } = this.computeChartRange(monthOffset);
  this.chartStart = chartStart;
  this.chartEnd = chartEnd;
  await this.refreshProcess();
}

protected computeChartRange(offset?: number) {
  const currentMonthVal = moment(new Date());
  currentMonthVal.startOf('month');
  offset = offset || 0;
  if (offset !== 0) {
    currentMonthVal.add(offset, 'month');
  }
  return {
    chartStart: currentMonthVal.subtract(3, 'day').toDate(),
    chartEnd: currentMonthVal.add(3, 'day').add(1, 'month').add(3, 'day').toDate()
  };
}
```

接下来，我们只需要在 `Vue` 组件中定义两个按钮，并且通过调用 `onMonthOffsetChange` 方法就可以实现分页功能了。

这里将之前定义在 `beforeMount` 中的初始化方法单独定义为 `computeChartRange` 方法，并且添加了一个偏移量的入参，用来计算甘特图的展示范围。

:::warning 提示

需要注意的一点是，在 `onMonthOffsetChange` 方法中，我们通过调用 `refreshProcess` 方法来实现数据的重新获取，这个方法在 `BaseElementListViewWidget` 基类提供的，它用于描述一系列的刷新行为逻辑。

在 Oinone 中，任何影响页面数据的参数发生变化后，只需要刷新组件就可以做到根据参数变化重新获取数据的功能。例如：分页参数、搜索条件、排序等。

:::

Oops～，切换分页的过程中，虽然页面上的甘特图展示范围发生了变化，但页面数据好像还是和之前的完全一样。通过 `Vue DevTools` 我们发现，`ganttData` 属性在切换分页时并没有发生变化，原来我们忘记了在切换分页过程中调用的是 `refreshProcess` 方法，可以影响 `ganttData` 属性变化的地方只有 `mountedProcess` 方法。遵循相同的思路，我们重写 `refreshProcess` ，并在调用父类方法之后重新对 `ganttData` 进行赋值即可，就像这样：

``` typescript
protected async refreshProcess(condition?: Condition): Promise<void> {
  await super.refreshProcess(condition);
  this.ganttData = this.convertGanttData(this.dataSource || []);
}
```

再切换一下分页试试看，我们发现数据也随着展示范围发生了变化。到了这里，这个练习也就告一段落了。

# 十一、更进一步

如果你有时间的话，这里有一些你可以尝试进行的练习内容：

1. 模仿甘特图的实现过程，完成一个通用的日历组件。
2. 使用 `vxe-table` 第三方组件库自行实现一个可以被配置的表格。（有点难）
3. 通过自定义画廊组件，让卡片渲染成自己想要的样子。

