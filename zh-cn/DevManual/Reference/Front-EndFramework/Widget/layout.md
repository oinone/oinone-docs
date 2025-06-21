---
title: Layout
index: true
category:
  - 研发手册
  - Reference
  - 前端API
  - Widget
order: 4

---

在 Oinone Kunlun 中，`布局（Layout）` 是在 `母版（Mask）` 的 `主要内容区域` 中进行 `二次布局` 。其主要功能与母版类似，都是通过 `XML` 标签将页面拆分为可顺序排列的小单元（如容器、元素、插槽等），用于控制页面元素的相对位置。

# 一、内置布局

## （一）表格视图布局

### 1、标准表格

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

### 2、内联表格（子表格视图）

``` xml
<view type="TABLE">
    <view type="SEARCH">
        <element widget="search" slot="search" slotSupport="field">
            <xslot name="searchFields" slotSupport="field" />
        </element>
    </view>
    <element widget="actionBar" slot="actionBar" slotSupport="action">
        <xslot name="actions" slotSupport="action" />
    </element>
    <element widget="table" slot="table">
        <element widget="expandColumn" slot="expandRow" />
        <xslot name="fields" slotSupport="field" />
        <element widget="rowActions" slot="rowActions" />
    </element>
</view>
```

### 3、左树右表

``` xml
<view type="TABLE">
    <pack title="" widget="group">
        <view type="search">
            <element slot="search" widget="search"/>
        </view>
    </pack>
    <pack title="" widget="group">
        <pack widget="row" wrap="false">
            <pack widget="col" width="257">
                <pack title="" widget="group">
                    <pack widget="col">
                        <element slot="tree" widget="tree"/>
                    </pack>
                </pack>
            </pack>
            <pack mode="full" widget="col">
                <pack widget="row">
                    <element justify="START" slot="actionBar" widget="actionBar"/>
                    <element slot="table" widget="table">
                        <element slot="expandRow" widget="expandColumn"/>
                        <element slot="rowActions" widget="rowActions"/>
                    </element>
                </pack>
            </pack>
        </pack>
    </pack>
</view>
```

### 4、左级联右表格

``` xml
<view type="table">
    <pack title="" widget="group">
        <view type="search">
            <element slot="search" widget="search"/>
        </view>
    </pack>
    <pack title="" widget="group">
        <pack widget="row" wrap="false">
            <pack mode="auto" widget="col">
                <element slot="cardCascader" widget="cardCascader"/>
            </pack>
            <pack mode="full" widget="col">
                <pack widget="row">
                    <element justify="START" slot="actionBar" widget="actionBar"/>
                    <element slot="table" widget="table">
                        <element slot="expandRow" widget="expandColumn"/>
                        <element slot="rowActions" widget="rowActions"/>
                    </element>
                </pack>
            </pack>
        </pack>
    </pack>
</view>
```

## （二）表单视图布局

### 1、标准表单

``` xml
<view type="FORM">
    <element widget="actionBar" slot="actionBar" slotSupport="action">
        <xslot name="actions" slotSupport="action" />
    </element>
    <element widget="form" slot="form">
        <xslot name="fields" slotSupport="pack,field" />
    </element>
</view>
```

### 2、内联表单（子表单视图）

``` xml
<view type="FORM">
    <element widget="form" slot="form">
        <xslot name="fields" slotSupport="pack,field" />
    </element>
</view>
```

## （三）详情视图布局

### 1、标准详情

``` xml
<view type="DETAIL">
    <element widget="actionBar" slot="actionBar" slotSupport="action">
        <xslot name="actions" slotSupport="action" />
    </element>
    <element widget="detail" slot="detail">
        <xslot name="fields" slotSupport="pack,field" />
    </element>
</view>
```

### 2、内联详情（子详情视图）

``` xml
<view type="DETAIL">
    <element widget="detail" slot="detail">
        <xslot name="fields" slotSupport="pack,field" />
    </element>
</view>
```

## （四）画廊视图布局

### 1、标准画廊视图

``` xml
<view type="gallery">
    <view type="search">
        <element slot="search" widget="search" />
    </view>
    <element slot="actionBar" widget="actionBar" />
    <element slot="gallery" widget="gallery">
        <element slot="card" widget="card">
            <template slot="title" />
            <template slot="content" />
            <template slot="rowActions" />
        </element>
    </element>
</view>
```

## （五）树视图布局

### 1、标准树视图

``` xml
<view type="tree">
    <pack title="" widget="group">
        <element widget="actionBar" slot="actionBar" />
        <element widget="tree" slot="tree" />
    </pack>
</view>
```

# 二、布局组件

一般而言，在布局中我们主要使用 `View`、`Layout`、`Pack` 这三类组件进行定义，通常不会使用任何与元数据相关的 `Action` 和 `Field` 这两类组件。

关于 **布局组件** 相关的 API 请参考：

+ [View](/zh-cn/DevManual/Reference/Front-EndFramework/Widget/View/README.md)
+ [Element](/zh-cn/DevManual/Reference/Front-EndFramework/Widget/element.md)
+ [Pack](/zh-cn/DevManual/Reference/Front-EndFramework/Widget/pack.md)

# 三、插槽

在布局中通过定义 `slot` 属性以及 `xslot` 标签可以将 `DSL` 中定义的元数据片段插入到相应的位置，这也称为 **插槽** 。

关于 **插槽** 相关介绍请参考：[DSL](/zh-cn/DevManual/Reference/Front-EndFramework/Widget/DSL.md)

# 四、注册布局

与注册组件类似，布局也可以通过注册的方式替换。

## （一）布局的注册可选项

``` typescript
/**
 * 布局注册可选项
 */
export interface LayoutRegisterOptions extends SPIOptions {
  // region view

  /**
   * 视图类型
   */
  viewType: ViewType;
  /**
   * 视图模型所在模块编码，一般是驼峰风格的英文 designerCommon
   */
  module?: string;
  /**
   * 视图模型所在模块名称，一般是下划线风格的英文 designer_common
   */
  moduleName?: string;
  /**
   * 布局名称，对应viewActionQuery.load.resView.baseLayoutName
   */
  layoutName?: string;
  /**
   * 视图的模型编码
   */
  model?: string;
  /**
   * 视图的模型名称
   */
  modelName?: string;
  /**
   * 视图的名称
   */
  viewName?: string;
  /**
   * 是否为内嵌视图(子视图特有)，表单页内有个o2m的子表格，该表格的inline为true
   */
  inline?: boolean;

  // endregion

  // region field

  /**
   * 模型字段类型(子视图特有)
   */
  ttype?: ModelFieldType;
  /**
   * 关联模型字段类型(子视图特有)
   */
  relatedTtype?: ModelFieldType;
  /**
   * 字段(子视图特有)
   */
  field?: string;

  // endregion

  // region action

  /**
   * 动作名称
   */
  actionName?: string;
  /**
   * 动作使用的组件名称
   */
  actionWidget?: string;

  // endregion
}
```

从上述类型声明中不难发现，其主要分为：视图（view）、字段（field）以及动作（action）三类，针对不同的元素，我们都提供了不同的参数用于描述布局的使用范围。与任何一个组件注册类似，使用范围描述的越 “精确”，在对应位置使用的布局优先级也就越高。

## （二）使用 registerLayout 注册布局

下面是我们在 “[探索前端框架 - 组件](/zh-cn/DevManual/Tutorials/DiscoverTheFront-endFramework/chapter1-widget.md)” 中注册的布局：

``` typescript
import { registerLayout, ViewType } from '@kunlun/dependencies';

registerLayout(
  `<view type="TABLE">
    <pack widget="group">
        <view type="SEARCH">
            <element widget="search" slot="search" slotSupport="field">
                <xslot name="searchFields" slotSupport="field" />
            </element>
        </view>
    </pack>
    <element widget="Counter" />
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
</view>`,
  {
    model: 'resource.ResourceCountryGroup',
    viewType: ViewType.Table
  }
);
```

按照之前内容的要求，我们在搜索区域和表格区域中间增加了一个计数器组件。

