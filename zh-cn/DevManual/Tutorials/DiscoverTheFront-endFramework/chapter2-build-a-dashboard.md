---
title: 章节 2：构建仪表盘（Build a dashboard）
index: true
category:
  - 研发手册
  - 教程
  - 探索前端框架
order: 2
next:
  text: 精通前段框架（Master the Front-End framework）
  link: /zh-cn/DevManual/Tutorials/MasterTheFront-endFramework/README.md
---
本教程的第一部分向你介绍了 Widget 框架的大部分理念。现在是时候更加深入的理解 Oinone 框架了，也就是 Web 客户端所使用的那个框架。

要开始学习，你需要运行着的 Oinone 服务以及已设置好的开发环境。在开始做练习之前，请确保你已按照本教程简介中描述的所有步骤进行操作。在本章中，我们将继续使用类似于上一章构建的简单的卡片（Card）组件，并使用 Oinone 框架逐步为其添加功能。

# 一、一个新的母版

在 Oinone 客户端中的大多数界面都使用一种常见的布局：顶部是一个带有一些功能的控制组件，紧接着的下方区域分成了两部分，左侧是一个可以切换页面的菜单，右侧是一个主要内容区域。这是通过使用 `Mask` 渲染框架来实现的。

还记得我们上一章内容中使用的 `registerLayout` 方法来注册布局吗？对于母版来说，也有一个对应的 `registerMask` 方法来注册母版。

下面是一个平台提供的默认母版，一般情况下，你只需要根据需要进行修改即可。

```xml
<mask>
    <multi-tabs />
    <header>
        <widget widget="app-switcher" />
        <block>
            <widget widget="notification" />
            <widget widget="divider" />
            <widget widget="language" />
            <widget widget="divider" />
            <widget widget="user" />
        </block>
    </header>
    <container>
        <sidebar>
            <widget widget="nav-menu" height="100%" />
        </sidebar>
        <content>
            <breadcrumb />
            <block width="100%">
                <widget width="100%" widget="main-view" />
            </block>
        </content>
    </container>
</mask>
```

在本章示例内容中，你需要对这个母版做一些变化：

1. 保留顶部栏所有功能，移除左侧的导航菜单组件。
2. 移除面包屑组件，让我们的主内容分发区看起来更大一些。
3. 将这个母版应用于“国家分组”这个菜单项对应的页面上。

作为第一个母版练习内容，让我们在位于 `oinone-frontend-tutorials/src/mask` 目录下创建 `register.ts` 文件，将修改好的母版进行注册。

```typescript
import { registerMask, ViewType } from '@oinone/kunlun-dependencies';

registerMask(
  `<mask>
    <multi-tabs />
    <header>
        <widget widget="app-switcher" />
        <block>
            <widget widget="notification" />
            <widget widget="divider" />
            <widget widget="language" />
            <widget widget="divider" />
            <widget widget="user" />
        </block>
    </header>
    <container>
        <content>
            <block width="100%">
                <widget width="100%" widget="main-view" />
            </block>
        </content>
    </container>
</mask>`,
  {
    viewType: ViewType.Table,
    model: 'resource.ResourceCountryGroup',
    actionName: 'resource#国家分组'
  }
);
```

根据要求，我们移除了 `nav-menu` 和 `breadcrumb` 组件，并将其注册条件使用 “资源-国家分组” 对应的条件参数。

做好这些修改之后，我们就可以继续接下来的学习内容了。

:::warning 提示：

更多关于母版（Mask）的内容请参考：[Mask](/zh-cn/DevManual/Reference/Front-EndFramework/Widget/mask.md)

:::

# 二、理论：发起一个后端请求

在实践中，每个组件都有可能向后端发起请求获取必要的数据以展示在页面中。这些请求我们通常将其管理在 `service`目录中，以便于在任何组件中使用它们。

Oinone 框架提供了统一的发送请求方法，我们可以像这样定义一个向后端发起的请求，以获得“国家分组”的数据统计结果：

```typescript
import { GenericFunctionService } from '@kunlun/dependencies';

const MODEL_MODEL = 'resource.ResourceCountryGroup';

export class ResourceCountryGroupService {
  public static async countByWrapper(rsql?: string): Promise<number> {
    const count = await GenericFunctionService.INSTANCE.simpleExecuteByName<number>(MODEL_MODEL, 'countByWrapper', {
      rsql
    });
    return Number(count || 0);
  }
}
```

:::warning 提示

更多关于自定义请求的内容请参考：[Customize GraphQL Request](/zh-cn/DevManual/OperationGuide/customize-graphQL-request.md)

:::

然后，我们可以在组件挂载时使用它，并将其获取的数据展示在页面中。

```typescript
@Widget.Reactive()
protected count: number = -1;

protected async mounted() {
  super.mounted();
  this.count = await ResourceCountryGroupService.countByWrapper();
}
```

如果需要携带查询条件，我们这样通过函数的入参 `rsql` 对数据集进行过滤，以获取我们所需的统计结果。

```typescript
protected async mounted() {
  super.mounted();
  this.count = await ResourceCountryGroupService.countByWrapper("code =like= 'a'");
}
```

:::warning 提示

更多关于 `RSQL` 的内容请参考：[RSQL Serivce](/zh-cn/DevManual/Reference/Front-EndFramework/Services/RSQL-service.md)

:::

# 三、添加一个统计数量的卡片

接下来，我们将通过实现一个统计数量的卡片来完成一个简易仪表盘，这是最终的页面效果：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/ExploreFrontendFramework/chapter-2/card.png)

请根据以下提示内容，尝试完成这样的练习内容：

1. 使用 `registerMask` 移除左侧菜单和面包屑。（与第一小节内容完全一样）
2. 创建一个 `StatisticsCard` 组件，分别发起指定模型的统计请求并展示在页面上。这个组件有三个可配置的参数标题（title）、模型编码（modelModel）以及过滤表达式（rsql）。
3. 使用 `registerLayout` 将组件渲染在页面的`主内容分发区`。向用户展示“国家的总数”、“国家分组的总数”、“语言种类”、“系统用户数”、“系统角色数”这些信息。

:::warning 提示

国家、国家分组、语言这些数据可以在“资源”进行维护。

用户、角色这些数据可以在“管理中心”进行维护。

由于我们在“国家分组”页面进行练习，读者可以先将自定义注册的 `母版（Mask）` 和 `布局（Layout）` 相关代码进行注释，维护数据后再继续练习内容。

:::

一个看起来可行的布局（Layout）模板可以定义成这样：

```xml
<view type="TABLE">
    <div class="statistics-card-demo-groups">
        <element widget="StatisticsCard" title="国家的总数" modelModel="resource.ResourceCountry" />
        <element widget="StatisticsCard" title="国家分组的总数" modelModel="resource.ResourceCountryGroup" />
        <element widget="StatisticsCard" title="语言种类" modelModel="resource.ResourceLang" />
    </div>
    <div class="statistics-card-demo-groups">
        <element widget="StatisticsCard" title="系统用户数" modelModel="user.PamirsUser" rsql="source == 'BUILD_IN'" />
        <element widget="StatisticsCard" title="非系统用户数" modelModel="user.PamirsUser" rsql="source != 'BUILD_IN'" />
        <element widget="StatisticsCard" title="系统角色数" modelModel="auth.AuthRole" rsql="source == 'BUILD_IN'" />
        <element widget="StatisticsCard" title="非系统角色数" modelModel="auth.AuthRole" rsql="source != 'BUILD_IN'" />
    </div>
    <div />
</view>
```

:::warning 提示

在表格视图中，最后一个 `div` 标签被处理为根据屏幕高度进行撑开，这是由于内置 `css` 样式带来的副作用问题。

使用不同的视图类型都有可能会出现内置 `css` 样式影响当前页面展示的副作用问题，读者需要根据实际情况对这些问题进行妥善处理。

上述提供的布局（Layout）通过一个空的 `div` 标签来解决这个问题。

:::

# 四、显示一个饼图

每个人都喜欢图表(!)，所以，让我们在仪表盘中添加一个饼图吧。它将显示系统用户（`source == 'BUILD_IN'`）和非系统用户（`source != 'BUILD_IN'`）在整个系统中的占比。

为了让我们的饼图组件看起来更加的通用，读者可以自行探索实现一个较为通用的饼图，它将显示系统角色和非系统角色在整个系统中的占比。这是最终的页面效果：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/ExploreFrontendFramework/chapter-2/piechart.png)

请根据以下提示内容，尝试完成这样的练习内容：

1. 创建一个 `PieChart` 组件，根据配置的统计纬度（系列）向用户展示一个饼图。
2. 使用 `ECharts` 第三方图表插件实现饼图的展示。
3. 由于请求和渲染有先后顺序问题，在 `mounted` 方法中发起请求，通过 `Vue` 提供的 `watch` 方法对数据变更进行监听，最终实现数据变更后重新渲染饼图组件。
4. 在 `onUnmounted` 钩子中调用 `ECharts` 组件实例提供的 `dispose` 方法对其进行销毁。
5. （加分项）使用 `Loading` 动画效果处理在网络请求较慢时的加载过程。
6. （加分项）设计注册的 `Layout` 结构，使得 `Layout` 具有一定的可读性。

为了让读者更好的理解 `Layout` 的可读性，这一小节我们给出了一个较为合理的定义方式。

对于结构化数据，在 `XML` 中的表现通常为多个相同子标签进行定义，一个看起来可行的布局（Layout）模板可以定义成这样：

```xml
<element widget="PieChart" title="用户统计" modelModel="user.PamirsUser">
    <series name="系统用户数" rsql="source == 'BUILD_IN'" />
    <series name="非系统用户数" rsql="source != 'BUILD_IN'" />
</element>
```

:::warning 提示

布局（Layout）中定义的子标签可以在 `initialize` 方法中使用 `this.template.widgets` 获取，用于解析组件可用的维度（系列）定义部分。

:::

# 五、更进一步

如果你有时间的话，这里有一些你可以尝试进行的小改进：

1. 确保你的页面可以进行翻译（在 Vue 模板中使用 `$translate` 对静态文本进行翻译，在 `TypeScript` 中使用 `translateValueByKey` 对静态文本进行翻译）
2. 实现点击饼图的某一部分跳转到对应模型数据的列表页面，并展示全部数据。
3. 创建一个仪表盘组件，可以对仪表盘的内容进行配置，并将其保存在用户偏好中。

