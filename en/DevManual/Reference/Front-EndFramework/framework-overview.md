---
title: Framework Overview
index: true
category:
  - Development Manual
  - Reference
  - Frontend API
order: 1
prev:
  text: General Tools API
  link: /en/DevManual/Reference/Back-EndFramework/AdvanceAPI/tools-API.md
---
The Oinone Kunlun framework provides a set of functionalities for Oinone Pamirs, aiding in building Oinone applications that run in browsers. As a single-page application (SPA), the Oinone Kunlun framework is based on the Vue framework and offers a set of features, commonly referred to as the Web client (accessible via URL/web).

At a high level, the Web client is an SPA: when users perform actions, it doesn't request a full page from the server each time but only fetches the required content and replaces/updates the current screen accordingly. It also manages URLs to keep them synchronized with the current state.

The Oinone Kunlun framework (in whole or part) can be used in other scenarios, but this document focuses on the Web client.

# I. Technical Stack Description

The Oinone Kunlun framework is implemented based on the `Vue` framework, with its underlying `Oio` component library built upon the `Ant Design Vue` and `Element Plus` component libraries.

# II. Code Structure

Similar to the common `Vue` framework structure, the `src` directory contains all `TypeScript` (along with `CSS` and `Vue` components) codebase. Below is a list of subfolders recommended by Oinone:

+ mask: Stores master definitions and registration-related code
+ layout: Stores layout definitions and registration-related code
+ types: Stores all possible public type definitions
+ field: Stores all field components
+ action: Stores all action components
+ view: Stores all view components
+ service: Stores all backend service request code (some frameworks suggest using an api directory)
+ theme: Stores all theme-related code

For the `field` subfolder, Oinone recommends classifying field components by `view type`, with possible subfolders including:

+ field/table: Stores table (TABLE) field components
+ field/form: Stores form (FORM) field components
+ field/detail: Stores detail (DETAIL) field components
+ field/gallery: Stores gallery (GALLERY) field components

For the field/table subfolder, Oinone suggests classifying field components by `field business type`, with possible subfolders such as:

+ field/table/string: Stores table text type (String) field components
+ field/table/integer: Stores table integer type (Integer) field components

A possible complete directory structure is:

``` plain
src
├─ mask
├─ layout
├─ field
│  ├─ table
│  │  ├─ integer
│  │  ├─ float
│  │  ├─ boolean
│  │  ├─ enum
│  │  ├─ string
│  │  ├─ text
│  │  ├─ html
│  │  ├─ datetime
│  │  ├─ date
│  │  ├─ time
│  │  ├─ year
│  │  ├─ money
│  │  ├─ map
│  │  ├─ m2o
│  │  ├─ o2m
│  │  └─ m2m
│  ├─ form
│  ├─ detail
│  └─ gallery
├─ action
├─ view
├─ types
├─ service
└─ theme
```

:::warning Note

For code structure division, we should select a structure suitable for the business project based on actual business needs, rather than adhering to a single structure. The above structure is just one example provided by Oinone for component standardization, which is suitable for beginners and aligns with Oinone metadata classification.

For more on R&D paradigms, refer to: [Widget Component Design Paradigm](/en/DevManual/R&DParadigm/R&D-paradigm-widget-design.md)

:::

# II. Web Client Architecture

As mentioned, the Web client is an application implemented via the Widget framework. Here's a simplified version of its default master:

``` xml
<mask>
    <header />
    <container>
        <nav-menu />
        <main-view />
    </container>
</mask>
```

It essentially consists of a top bar (header), navigation menu (nav-menu), and main content distribution area (main-view).

# III. Environment

As a Web client, Oinone Kunlun uses `dotenv-webpack` for `build-time` static environment variables and provides `RuntimeConfig` for `runtime` dynamic environment variables.

:::warning Note

For more on environment configuration, refer to: [Environment](/en/DevManual/Reference/Front-EndFramework/environment.md)

:::

# IV. Context

In Oinone Kunlun, "context" is a crucial concept: it provides components with rendering, configuration, metadata, and other information, enabling any system component to behave appropriately based on this information. In a sense, it's like an information package propagated everywhere, useful in scenarios where, for example, input fields need to behave differently in forms and details or activate/deactivate certain functions in components.

In any component, you can use these two context objects with code like:

``` typescript
protected doSomething() {
  const { metadataRuntimeContext, rootRuntimeContext } = this;
  // do something.
}
```

:::danger Warning

Never attempt to modify metadata-related properties; they must remain stable for retrieval in any component.

:::

:::warning Note

For more on context, refer to: [Context](/en/DevManual/Reference/Front-EndFramework/context.md)

:::

# V. Building Blocks

Web clients are typically built using several abstract types: Router, Render, Service, Widget, Component.

:::info Note

In Oinone Kunlun, Widget specifically refers to components defined by TypeScript Class and inheriting from VueWidget, also abbreviated as TS components; Component refers to Vue components defined via the Vue framework. (If Oinone Kunlun provides a React-based implementation, Component refers to React components defined via the React framework.)

:::

## (I) Router

In SPAs, the routing system essentially triggers a set of behaviors by modifying the browser URL. In Oinone Kunlun, the routing system, based on `rxjs`, is core to page updates. In any component, you can use all routing system functions via `useRouter` and `useMatched`.

Fetch browser variables:

``` typescript
useMatched().matched.segmentParams
```

Obtain the router instance and handle page parameter changes:

``` typescript
protected $router!: Router;

protected doSomething() {
  this.$router.push({
    segments: [
      {
        path: 'page',
        parameters: {
          ...
        }
      }
    ]
  });
}

protected beforeMount() {
  this.$router = useRouter().router;
}
```

Subscribe to routing changes:

``` typescript
protected watchRouter() {
  useMatched()
    .getMatched$()
    .subscribe((matched: Matched) => {
      // do something.
    });
}

protected beforeMount() {
  this.watchRouter();
}
```

:::warning Note

For more on routing, refer to: [Router Service](/en/DevManual/Reference/Front-EndFramework/Services/router-service.md)

:::

## (II) Render

Oinone Kunlun provides a rendering function based on JSON data structures, handling structures like:

``` json
{
    "dslNodeType": "",
    ...,
    "widgets": [
        {
            "dslNodeType": "",
            "widgets": [
                ...
            ]
        },
        ...
    ]
}
```

Under this structure, each node is converted to VNode for processing and rendering via the Vue framework.

:::warning Note

For more on rendering, refer to: [View](/en/DevManual/Reference/Front-EndFramework/Widget/View/README.md)

:::

## (III) Service

Oinone Kunlun uses the `GraphQL` protocol for `front-end to back-end interaction`. `HttpClient` is implemented based on `apollo-client`, allowing requests to the backend from anywhere. For example:

``` typescript
export class ResourceCountryGroupService {
  public static async queryListByWrapper(): Promise<ResourceCountryGroup[]> {
    const gql = `{
  resourceCountryGroupQuery {
    queryListByWrapper(queryWrapper: {rsql: "1==1"}) {
      id
      code
      name
    }
  }
}`;
    const res = await http.query<ResourceCountryGroup[]>(MODULE_NAME, gql);
    return res.data['resourceCountryGroupQuery']['queryListByWrapper'];
  }
}
```

:::warning Note

For more on HTTP requests, refer to: [HttpClient Service](/en/DevManual/Reference/Front-EndFramework/Services/httpclient-service.md)

:::

## (IV) Widget

In Oinone Kunlun, the `Widget` framework is the core module. All visible components on the page are defined via the `Widget` framework and rendered in the page.

Registration and lookup of `Widget` components are done using the `SPI` framework, which essentially stores a multi-fork tree via predefined dimensions and searches using a weighted longest path matching algorithm.

Each component type has abstract dimensions, all describing the component's usage location. Generally, the more "precise" the location description, the higher the priority of the component when rendered in that location. Components registered later will overwrite those registered earlier with identical location descriptions.

In the Widget framework, different `dslNodeType` uses different `SPI.Token` for registration and usage:

| **dslNodeType** | **SPI.Token**     | **Related Documentation**                                             |
| --------------- | ----------------- | ------------------------------------------------------------ |
| view            | BaseView          | [View](/en/DevManual/Reference/Front-EndFramework/Widget/View/README.md) |
| element         | BaseElementWidget | [Element](/en/DevManual/Reference/Front-EndFramework/Widget/element.md) |
| pack            | BasePackWidget    | [Pack](/en/DevManual/Reference/Front-EndFramework/Widget/pack.md) |
| action          | BaseActionWidget  | [Action](/en/DevManual/Reference/Front-EndFramework/Widget/action.md) |
| field           | BaseFieldWidget   | [Field](/en/DevManual/Reference/Front-EndFramework/Widget/Field/README.md) |


## (V) Component

In Oinone Kunlun, the Widget framework provides component registration and lookup, but specific page rendering is done via Component. Oinone Kunlun implements a set of components corresponding to the Widget framework based on the Vue framework. Additionally, Component provides a set of `Oio` component libraries for standard components, handling `standard API` and `theme`-related content.

During Oinone usage, you can directly use `Oio` components for secondary development without worrying about styles, themes, etc. For example, an input box can use `oio-input`:

``` vue
<oio-input v-model:value="value" />
```

:::warning Note

For more on Oio Component, refer to: [Vue UI Antd](/en/DevManual/Reference/Front-EndFramework/OioComponents/vue-UI-antd.html)

:::

# VI. Expression

Oinone Kunlun includes a built-in small expression interpreter for evaluating small expressions (single-line expressions), crucial because most DSL configurations support attribute calculation using expressions.

For example:

``` xml
<field data="phoneCode" label="国家码" />
<field data="phoneNumber" label="手机号" />
<field data="phone" compute="activeRecord.phoneCode + ' ' + activeRecord.phoneNumber" />
```

:::warning Note

Almost all expressions include context variables like `activeRecord`, `rootRecord`, and `openerRecord`, but their meanings vary across components and views. You can also use some built-in Oinone functions for advanced calculations in expressions or even define custom functions for use in expressions.

For more on expressions, refer to: [Expression Service](/en/DevManual/Reference/Front-EndFramework/Services/expression-service.md)

For more on built-in functions, refer to: [Function API - Built-in Functions](/en/DevManual/Reference/Back-EndFramework/functions-API.md#五、内置函数)

:::

# VII. Domains

Broadly speaking, domains in Oinone Kunlun represent sets of records meeting specific conditions.

RSQL Expression is the syntax for domains, similar to SQL condition expressions. Allowed operators vary by field business type, determined by data storage structure.

In Oinone Kunlun, we divide domains into visible domains (domain) and invisible domains (filter), a division that helps present valid record sets to users in practice.

For example, in a `many-to-one (M2O)` `select box (Select)` component, we can use `domain` to show users the set of `active` records for selection:

``` xml
<field data="relationOne" widget="Select" domain="state == ACTIVED" />
```