---
title: View
index: true
category:
  - R&D Manual
  - Reference
  - Frontend API
  - Widget
  - View
dir:
  link: true
  order: 6
prev:
  text: DSL
  link: /en/DevManual/Reference/Front-EndFramework/Widget/DSL.md
next:
  text: Table
  link: /en/DevManual/Reference/Front-EndFramework/Widget/View/table.md

---
In the "[Master the Front-end Framework - Front-end Framework Overview](/en/DevManual/Tutorials/MasterTheFront-endFramework/chapter1-front-end-overview.md)" chapter we studied earlier, we have already provided a brief overview of all metadata in Oinone. In this chapter, we will provide a more comprehensive introduction to the "view" class of components.

# Ⅰ、View Components
In Oinone, different view types handle different data structures and presentation forms, and the data processing and rendering methods they adopt are also different. The Widget framework mainly classifies data structures into two categories: `List` and `Object`.

The following lists some components based on data structures and view types:

<table cellspacing="0" cellpadding="8" style="border-collapse: collapse; width: 100%; max-width: 1200px; margin: 20px auto;">
  <thead>
    <tr style="background-color: #f5f5f5;">
      <th style="text-align: left; font-weight: bold;">Data Structure</th>
      <th style="text-align: left; font-weight: bold;">View Type</th>
      <th style="text-align: left; font-weight: bold;">Component</th>
      <th style="text-align: left; font-weight: bold;">Base Class</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="3">List</td>
      <td>TABLE</td>
      <td>TableView</td>
      <td rowspan="3">BaseListView</td>
    </tr>
    <tr>
      <td>GALLERY</td>
      <td>GalleryView</td>
    </tr>
    <tr>
      <td>TREE</td>
      <td>TreeView</td>
    </tr>
    <tr>
      <td rowspan="2">Object</td>
      <td>FORM</td>
      <td>FormView</td>
      <td rowspan="2">BaseObjectView</td>
    </tr>
    <tr>
      <td>DETAIL</td>
      <td>DetailView</td>
    </tr>
  </tbody>
</table>

Generally, you don't need to care specially about view components. They mainly play the role of a "bridge" in the page - they can complete the collaborative work between components without deep intervention in their implementation details. In addition, views also act as scope units for metadata isolation - **the metadata within each view is expanded based on the field topology of a specific model**, ensuring the consistency of data description and the clarity of scope boundaries.

This design makes the view the smallest logical unit for metadata organization. All data definitions within it are strictly anchored to the field hierarchy of a single model, avoiding cross-model data mixing and logical conflicts.

:::info Note:

In Oinone, there are two types of view components: `View` view components and `Element` view components. It is necessary to distinguish the concepts of these two view components:

`View` view components: View components used for view type definition and data structure definition.

`Element` view components: View components that provide data sources and specific presentation forms in `View` view components.

In this chapter, all view components mentioned are `View` view components.

:::

# Ⅱ、Data Interaction Design

## （Ⅰ）Data Structure Design
Data structures are divided into three categories: `List`, `Object`, and `Popup`.

- List: Used for displaying multiple data items, mainly including `search (client-side)`, `custom conditions (product-side)`, `sorting`, `pagination`, `data selection`, `data submission`, and `data validation` functions.
- Object: Used for displaying a single data item, mainly including `data submission` and `data validation` functions.
- Popup: Used to display corresponding types of data in an independent space.

:::info Note:

Strictly speaking, popups should not be called data structures, but in Oinone's entire automated rendering and data interaction framework, popups have their unique features, which force us to handle them independently.

:::

## （Ⅱ）Data Source Design
In a single view, there are only two data structures: `List` and `Object`.

To handle them uniformly, we can regard `Object` as a `List` with one and only one item.

Therefore, in any component that contains a `data source`, we can obtain three `common properties`:

- rootData: Root data source
- dataSource: Current data source
- activeRecords: Current active data source

And they all have a unified type: `ActiveRecord[]`

In view types with different data structures, these data sources have different meanings:

- List: `dataSource` is the current data source of the list, and `activeRecords` are the selected data in the list. Specifically, `showDataSource` is the current displayed data source, which is the data source processed by search, sorting, pagination, etc., and is also the data source we actually use in the component.
- Object: `dataSource` and `activeRecords` are always completely consistent, and their length is always `1`. Therefore, we sometimes define a `formData` property in the component and provide a default implementation: `this.activeRecords?.[0] || {}`.

## （Ⅲ）Component Lifecycle and Component Behavior
During `automated rendering`, we usually cannot clearly know the specific interaction between the `current component and child components` or the `current component and adjacent components`. Even when defining the `current component`, we do not need to care (and in some cases may not be able to care) about the specific situation of the `child components`. This also determines that we cannot completely encapsulate all the functional logic required for the page in a single component as we do when using the native `Vue` framework.

When we use the native `Vue` framework to build pages, we usually initiate a backend request in the `beforeMount` or `mounted` lifecycle of the `outermost component` to obtain data. However, if the component is handed over to the `automated rendering` mechanism, changes in the `XML structure` will lead to changes in the `component topology structure`. To cope with this series of changes, we have proposed some concepts:

- Data source provider: A component used to provide a data source in a view is called a `data source provider`. Usually an `Element` view component.
- Data source holder: A component used to save a data source in a view is called a `data source holder`. Usually a `View` view component.
- CallChaining: Chained calls, which mount methods to the corresponding function chain through the `component lifecycle` for processing, and can be initiated in any component.

**Data Source Provider and Data Source Holder**

In the processing of view data sources, we hope that there can be a specific component that initiates a request to the backend to obtain data, and this component also assumes the responsibility of displaying these data. Obviously, in our `XML structure`, the outermost component is a View view component, which only assumes the data structure definition and metadata processing capabilities without specific data display capabilities. Since we cannot do this through the outermost component, we need to hand it over to a more intuitive Element view component.

Take the rendering of a table view as an example: When `TableView` is mounted, we cannot determine how to correctly load the data, so we need to hand it over to a specific `TableWidget` to complete this function. When the component corresponding to `TableWidget` changes, it only needs to submit the data source to `TableView` according to the established `reload` method.

**CallChaining**

To ensure the final consistency of component behavior, we need some behaviors to achieve `component autonomy` in the implementation of each component. Moreover, since the XML structure can be dynamically adjusted, we cannot fully trust the processing order of component lifecycles by third-party frameworks. Therefore, we also need to further `orderly` process component behaviors.

Take the loading of a table view as an example: We always want the processing of `search conditions` to be completed before `loading data`, which can ensure that the `search conditions` processed by the search view can be obtained when `loading data`, and this feature does not change with changes in the `XML structure`.

The above description may be too abstract. Let's look at the behavior timing diagram of each related component when a standard table view is rendered:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/40867a7713480ec9ff5a51f49a8f8d2b-20250604141240832.svg)

In the above figure, we can see that `mountedCallChaining` is initiated by the uppermost `TableView` after all components are rendered and mounted, and finally executes the `mounted hook function` implemented by each component in the预定 priority order.

**Built-in Priority Constants**

- VIEW_WIDGET_PRIORITY (`0`): View component priority.
- FETCH_DATA_WIDGET_PRIORITY (`100`): Data provider component priority.
- SUBVIEW_WIDGET_PRIORITY (`200`): Subview component priority.

Hooks without setting priority will be executed last. In general, there is no need to care about the priority issue.

In addition to `mountedCallChaining`, Oinone also has some built-in `CallChaining`, which preset some common behaviors.

**Built-in CallChaining**

- mountedCallChaining: During mounting.
- refreshCallChaining: During refreshing.
- submitCallChaining: During submission.
- validatorCallChaining: During validation.

The operation of the data source is the same. We cannot know how to load the data source and which component should correctly save the data source. We can preset such a scenario:

When the `SearchWidget` component executes the `mounted hook function`, it will obtain the required `searchBody` and `searchConditions` attributes from the `URL parameters` and submit these two parameters to `TableView` through the `flushSearchParameters` method.

When the `TableWidget` component executes the `mounted hook function`, it will execute the data loading-related functions and submit the data source to `TableView` through the `reloadDataSource` and `reloadActiveRecords` methods.

This scenario is also the loading scenario used by the standard table view. Let's look at the behavior timing diagram when loading data:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/51df8aef9f7f73da8ba26e6b39ffafc4-20250604141245615.svg)

Here, the component lifecycle and component behavior are introduced. I hope this content can help you use Oinone to do more interesting things in the future.

The following is the existing behavior interaction timing diagram in the table view, which can better help you understand the application of these designs in actual pages:

**Click Search**

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/%E4%B8%8B%E8%BD%BD.svg)

**Sort/Paginate**

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/%E4%B8%8B%E8%BD%BD%20(1).svg)

**Table Check**

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/c57184b3bfd76b9b8eb8169fed4f4353.svg)

## （Ⅳ）Data Submission
For form views, the data submission of a form is crucial to the business system.

Before discussing data submission, we have clear definitions of the field values at different stages:

- Real value: The field value stored in the component.
- Submission value: The value passed into the request during data submission.
- Display value: The value displayed on the page after calculation processing.
- Default value: The value when the creation page is first loaded, and the edit page does not回填.

Take a password field as an example: When a user enters some text on the page, the text is stored in the component intact; the display on the page is replaced with "*"; and the submission to the backend request is processed by encryption.

Let's look at the basic logic of data submission: When the `submit action (ServerAction)` is ready to initiate a request to the backend, it will call the corresponding `submit` method of all field components through `submitCallChaining`, and the `submit` of each field component will provide the current field name and field value. After collection, the submit action sends these data to the backend for processing through a GQL request. This process is the standard data submission process.

The following is the interaction timing diagram between the submit action and the backend after the user clicks:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/4826e0236d1be7ade1b56bd42e360131.svg)

:::warning Tip:

Not only does the data submission of forms follow this process, but almost all data submissions follow this process. For example, when editing in a table row, we can regard the edit state of a row of data as a "form", and each field in it can be regarded as a field in the form. In this way, the in-line editing function of the table can also fully follow this process.

:::

## （Ⅴ）Conclusion
The entire page is split into independent components, which are finally assembled on the page to form a complete page. It is unavoidable that we need to focus on the complete design of data interaction to ensure that it can cope with more changes, which undoubtedly increases the understanding burden of developers. In the process of implementing the entire Widget framework, we try to use simple methods to allow developers to focus on the development of individual independent components without particularly caring about the mechanisms of these data interactions. Especially as introduced in the "[Customize a Field](/en/DevManual/OperationGuide/customize-a-field-widget.md)" chapter, a single field component is nothing more than two parts: rendering and data submission, and most of the repetitive development work is handled built-in.

Although it无形中 increases the development difficulty, it also brings some conveniences: the reusability of individual components is improved, and developers can provide independent components one by one for business personnel to use like any third-party component library. This is undoubtedly a significant improvement in a management information system with a unified interaction style.

<div style="display: none">

# Ⅲ、Working Principle of View Components
As seen in the example in the component lifecycle and component behavior section, it is meaningless to introduce the working principle of View view components alone. Each type of view needs to rely on an Element view component for specific display. For the working principle of each type of view, please refer to the following contents:

+ [Table](/en/DevManual/Reference/Front-EndFramework/Widget/View/table.md)
+ [Form](/en/DevManual/Reference/Front-EndFramework/Widget/View/form.md)
+ [Detail](/en/DevManual/Reference/Front-EndFramework/Widget/View/detail.md)
+ [Gallery](/en/DevManual/Reference/Front-EndFramework/Widget/View/gallery.md)
+ [Tree](/en/DevManual/Reference/Front-EndFramework/Widget/View/tree.md)
+ [Element View Component API](/en/DevManual/Reference/Front-EndFramework/Widget/element.md)

</div>

# Ⅲ、Reference List

## （Ⅰ）Abstract Base Classes

### 1、BaseObjectView

**Inheritance**: BaseView

**Properties**:

- cols: The number of columns in the current view, preferentially obtained from the DSL configuration. If not set, it takes `parentCols`. If `parentCols` is also not set, it defaults to `1`. (`number`)
- parentCols: The number of columns in the parent view. (`number | undefined`)

### 2、BaseListView

**Inheritance**: BaseView

**Properties**:

- checkboxAllCallChaining: Chaining call object for selecting all checkboxes. (`CallChaining | undefined`)
- searchBody: Search form data. (`ActiveRecord | undefined`)
- searchConditions: Advanced search condition expressions. (`QueryExpression[] | undefined`)
- selectMode: Selection mode. (`SelectMode | undefined`)
- selectModeCallChaining: Chaining call object for the selection mode. (`CallChaining | undefined`)

**Methods**:

#### **flushSearchParameters**

- **Function Description**: Refreshes search parameters, updating search form data and search condition expressions.
- **Type**: `(searchBody, searchConditions?) => void`
- **Parameters**:
  - `searchBody`: Search form data object.
  - `searchConditions`: Advanced search condition expression array (optional).

## （Ⅱ）View Components

### 1、TableView

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  BaseView.Token({
    type: ViewType.Table
  })
)
export class TableView extends BaseListView
```

**Properties**:

- editRowCallChaining: Chaining call object for editing rows. (`CallChaining<[string, ActiveRecords]> | undefined`)

### 2、SearchView

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  BaseView.Token({
    type: ViewType.Search
  })
)
export class SearchView extends BaseObjectView
```

**Properties**:

- submitCallChaining: Chaining call object for data submission. (`CallChaining<SubmitValue> | undefined`)
- validatorCallChaining: Chaining call object for data validation. (`CallChaining<boolean> | undefined`)
- viewMode: The current view mode, preferentially obtained from the DSL configuration, with a default value of `ViewMode.Create`. (`ViewMode`)

**Methods**:

#### **deleteDataSource**

- **Function Description**: Deletes records in the data source (by index).
- **Type**: `(recordIndexes: number[]) => void`
- **Parameters**:
  - `recordIndexes`: Index array of records to be deleted.

#### **deleteDataSourceByEntity**

- **Function Description**: Deletes records in the data source according to the entity.
- **Type**: `(records: ActiveRecords, predict?: DeleteActiveRecordsByEntityPredict) => void`
- **Parameters**:
  - `records`: Entity records to be deleted.
  - `predict`: Delete prediction parameters (optional).

#### **pushDataSource**

- **Function Description**: Adds new records to the data source.
- **Type**: `(records: ActiveRecords, predict?: PushActiveRecordsPredict) => void`
- **Parameters**:
  - `records`: Records to be added.
  - `predict`: Add prediction parameters (optional).

#### **reloadDataSource**

- **Function Description**: Reloads the data source.
- **Type**: `(records?: ActiveRecords) => void`
- **Parameters**:
  - `records`: Records to be reloaded (optional).

#### **updateDataSource**

- **Function Description**: Updates records in the data source (by entity array).
- **Type**: `(records: UpdateEntity[]) => void`
- **Parameters**:
  - `records`: Entity array to be updated.

#### **updateDataSourceByEntity**

- **Function Description**: Updates records in the data source according to the entity.
- **Type**: `(records: ActiveRecords, predict?: UpdateActiveRecordsByEntityPredict) => void`
- **Parameters**:
  - `records`: Entity records to be updated.
  - `predict`: Update prediction parameters (optional).

### 3、FormView

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  BaseView.Token({
    type: ViewType.Form
  })
)
export class FormView extends BaseObjectView
```

**Properties**:

- formValidateCallChaining: Chaining call object for form validation. (`CallChaining<FormValidateResult[]> | undefined`)

### 4、DetailView

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  BaseView.Token({
    type: ViewType.Detail
  })
)
export class DetailView extends BaseObjectView
```

### 5、GalleryView

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  BaseView.Token({
    type: ViewType.Gallery
  })
)
export class GalleryView extends BaseListView
```

### 6、TreeView

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  BaseView.Token({
    type: ViewType.Tree
  })
)
export class TreeView extends BaseListView
```