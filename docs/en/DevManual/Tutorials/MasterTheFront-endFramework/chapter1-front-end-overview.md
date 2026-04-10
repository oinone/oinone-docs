---
title: Chapter 1:Front-End Overview
index: true
category:
  - Development Manual
  - Tutorials
  - Master Frontend Framework
order: 1
prev:
  text: Master the Front-End framework
  link: /en/DevManual/Tutorials/MasterTheFront-endFramework/README.md
---

In Oinone, we have abstracted Web front-end pages and the routing relationships between them. The data used to describe pages and their contents (fields, actions) is called "metadata". Understanding how to obtain metadata and the relationships between them is essential.

This chapter contains many concepts and theoretical knowledge. We hope readers will take the time to go through it carefully.

# I. Start with "Resource - Country Groups"

Before we begin learning, we need to switch to a unified page to facilitate our discussion.

Select "Resources" from the module switcher in the upper-left corner of the page. After entering "Resources", choose "Country Groups" from the left menu. The resulting page is shown below, and all subsequent operations will be performed on this page.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-1/country.gif)

# II. GraphQL Protocol

In Oinone, all front-end to back-end interactions use GraphQL syntax to initiate HTTP requests. This differs from the RESTful API style commonly encountered in previous developments. Below is a brief introduction to the basic knowledge of GraphQL syntax.

:::warning Tip

Official Documentation: [Learn GraphQL](https://graphql.cn/learn)

For more information on the GraphQL protocol, refer to: [GraphQL Service](/en/DevManual/Reference/Front-EndFramework/Services/graphQL-service.md)

:::

Open the browser console (F12), switch to the "Network" tab, and filter requests by "Fetch/XHR". You will see a series of requests to the back-end, including requests for global configuration, top bars, current view compilation, switchable applications, etc. These requests are initiated independently by each component on the page to fetch necessary data for displaying content to the user.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-1/graphql.png)

Select the first request named "base", which retrieves global configuration. We will use this request as an example for explanation.

## Request

From the browser's "Payload", the request parameters include two valid components:

+ query: A string in GraphQL syntax.
+ variables: Values for the variable parameters in the GraphQL syntax.

Below is the `query` parameter content from the "get global configuration" request:

``` graphql
{
  appConfigQuery {
    queryListByWrapper(queryWrapper: {rsql: "1==1"}) {
      id
      browserTitle
      scope
      code
      app
      logo
      smallLogo
      partnerName
      officialWebsite
      slogan
      icpDesc
      appSideLogo
      favicon
      browserTitle
      loginPageLogo
      loginBackground
      loginLayoutType
      mode
      size
      sideBarTheme {
        mode
        theme
      }
      multiTabTheme {
        inline
        theme
      }
      extend
    }
  }
}
```

The `query` parameter follows a standard request format, declaring the signature, input parameters, and output parameters of any callable function on the back-end. Let's first gain a basic understanding of this data structure before delving deeper. Below is the standard format of GraphQL syntax:

``` graphql
${query/mutation} {
  ${modelName}${Query/Mutation} {
    ${functionName} (${arg1Name}: ${arg1Value}) {
      ${responseParameters}
    }
  }
}
```

In Oinone, any GraphQL request is one of two types: `Query` or `Mutation`, determined by how the back-end service defines the function. Generally, requests that do not manipulate data use `Query`, while others (create/update/delete, etc.) use `Mutation`.

**Parameter Meanings**

+ query/mutation: Specifies the GraphQL request type, defaulting to `query`.
+ modelName: Model name. In `appConfigQuery`, `appConfig` is the model name.
+ Query/Mutation: Uses different suffixes based on the GraphQL request type. In `appConfigQuery`, since the function is of `query` type, the `Query` suffix is used.
+ functionName: Function name.
+ arg1Name/arg1Value: Used to specify function input parameters, multiple parameters are separated by commas.
+ responseParameters: Response parameter definition, defining the interface response format in a "graph" form starting from the current model. Can be separated by line breaks or commas. When a field is an object or array, use "{}" to continue defining fields of the associated model. For example, the `sideBarTheme` field is an object containing `mode` and `theme` fields.

## Response

From the browser's "Preview", the request response is a standard format represented in JSON:

``` json
{
    "data": {
        "${modelName}${Query/Mutation}": {
            "${functionName}": [
                {
                    "id": "1"
                }
            ]
        }
    },
    "errors": [],
    "extensions": {
        "success": true
    }
}
```

In Oinone, any GraphQL request returns data in this format.

**Parameter Meanings**

+ data: Fixed key.
+ modelName: Model name, same as request parameter.
+ Query/Mutation: Uses different suffixes based on the GraphQL request type, same as request parameter.
+ functionName: Function name, same as request parameter.
+ errors: Possible error information.
+ extensions: Extended information.

## Unified Terminology

To facilitate more convenient and accurate description of specific requests in all subsequent articles, we need to agree on terminology.

Taking the "get global configuration" interface as an example, we use the notation "`appConfig#queryListByWrapper` interface" to locate a request, which is more accurate and intuitive than Chinese descriptions.

Let's get accustomed to this notation with simple introductions to some of the requests we just saw:

+ topBarUserBlock#construct: Top bar - get user avatar and actions.
+ viewAction#load: Load page metadata.
+ model#loadModelField: Get model field metadata by model code.
+ module#load: Get by module code.
+ resourceCountryGroup#queryPage: Query country groups by pagination.

## Initiate Requests Using Visual Tools

Any back-end service request can be initiated using visual tools, such as:

+ Insomnia: [Download Here](https://insomnia.rest/download)
+ Postman: [Download Here](https://www.postman.com/downloads)

You can freely choose any visual tool that supports the GraphQL protocol.

### 1. Initiate Requests Using Insomnia

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-1/insomnia.png)

### 2. Initiate Requests Using Postman

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-1/postman.png)

### 3. Solving Login Issues in Visual Request Tools

When we initiated the "get global configuration" request above, we noticed no user login verification because this interface is still needed on the login page and thus does not verify user login. However, this is not the case for other interfaces, which you can verify using other requests in the browser.

So, how do we log in? It's simple: just initiate the login request from the login page in the request tool, as shown below:

``` graphql
mutation {
	pamirsUserTransientMutation {
		login(user: { login: "admin", password: "admin" }) {
			redirect {
				id
			}
			broken
			errorMsg
			errorCode
			errorField
		}
	}
}
```

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-1/login.png)

:::warning Tip

The password field of the login interface allows plaintext transmission for debugging convenience, but in the page, the password is transmitted in ciphertext.

:::

:::info Tip

Request Address: Obtain from `Headers - General - Request URL` in the browser.

Request Method: `POST` (most requests use this).

Obtaining the query parameter: Right-click the query, select "Copy value" to paste directly into the `Query` field of the visual request tool.

Obtaining the variables parameter: Right-click variables, select "Copy object" to paste directly into the `Variables` field of the visual request tool.

:::

### 4. Initiate Batch-Type Requests

In the browser, we also found a request named "batch", which represents a batch request. It can process a batch of unrelated GraphQL requests at once and return corresponding results separately.

In the request tool, we can initiate such requests using JSON format.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-1/batch.png)

:::warning Tip

Batch requests utilize the automatic batching capability provided by the `apollo-client` toolkit. When using `Promise` asynchronously, requests from the same module within the same clock cycle will be merged into such batch requests automatically.

For more information on `HTTP requests`, refer to: [HttpClient Service](/en/DevManual/Reference/Front-EndFramework/Services/httpclient-service.md)

:::

# III. Browser URL

For the "Resource - Country Groups" page, consider the following URL:

``` json
http://127.0.0.1:8080/page;module=resource;viewType=TABLE;model=resource.ResourceCountryGroup;action=resource%23%E5%9B%BD%E5%AE%B6%E5%88%86%E7%BB%84;scene=resource%23%E5%9B%BD%E5%AE%B6%E5%88%86%E7%BB%84;target=OPEN_WINDOW;menu=%7B%22selectedKeys%22:%5B%22%E5%9B%BD%E5%AE%B6%E5%88%86%E7%BB%84%22%5D,%22openKeys%22:%5B%22%E5%9C%B0%E5%9D%80%E5%BA%93%22,%22%E5%9C%B0%E5%8C%BA%22%5D%7D
```

This URL is the result of converting to ciphertext using the `encodeURIComponent` method. Open the browser console (F12), switch to the "Console" tab, and use the `decodeURIComponent` method to convert it to plaintext.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-1/url.png)

The converted URL:

``` json
http://127.0.0.1:8080/page;module=resource;viewType=TABLE;model=resource.ResourceCountryGroup;action=resource#国家分组;scene=resource#国家分组;target=OPEN_WINDOW;menu={"selectedKeys":["国家分组"],"openKeys":["地址库","地区"]}
```

From the converted URL, we can obtain the following information:

+ module: Module name.
+ viewType: Current view type, `TABLE` for table view.
+ model: Model code of the current navigation action.
+ action: Name of the current navigation action.
+ scene: Same as action, name of the current navigation action.
+ target: Page opening method.
+ menu: Menu selection and expansion node data for retaining menu state.

:::warning Tip

This content should be studied in conjunction with the introduction to [ViewAction](#b68ecb57) in the theoretical section of Section IV to better understand the meaning of these parameters.

:::

# IV. Page Rendering

Take "Resource - Country Groups" as an example. How is this page loaded and rendered? The standard process for page rendering is as shown in the following diagram:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-1/mind.jpeg)

In the previous section, we introduced the `browser URL`. Next, let's look at the metadata structure obtained from the `viewAction#load` request:

``` json
{
    "data": {
        "viewActionQuery": {
            "load": {
                "id": "701175233800832367",
                "model": "resource.ResourceCountryGroup",
                "modelName": "resourceCountryGroup",
                "name": "resource#国家分组",
                "contextType": "CONTEXT_FREE",
                "viewType": "TABLE",
                "target": "ROUTER",
                "module": "resource",
                "moduleName": "resource",
                "resModel": "resource.ResourceCountryGroup",
                "resViewName": "国家分组table",
                "resView": {
                    "id": "701175268160570558",
                    "model": "resource.ResourceCountryGroup",
                    "name": "国家分组table",
                    "title": "国家分组",
                    "type": "TABLE",
                    "template": ""
                }
            }
        }
    },
    "errors": [],
    "extensions": {
        "success": true
    }
}
```

This is not a complete response; we have cropped the content. The `resView.template` content is separately displayed in `JSON` format below:

``` json
{
    "dslNodeType": "view",
    "type": "TABLE",
    "title": "国家分组",
    "model": "resource.ResourceCountryGroup",
    "name": "国家分组table",
    "modelName": "resourceCountryGroup",
    "modelType": "STORE",
    "moduleName": "resource",
    "ordering": "createDate DESC, id DESC",
    "pk": [
        "id"
    ],
    "uniques": [
        "code"
    ],
    "widgets": [
        {
            "dslNodeType": "template",
            "slot": "actions",
            "widgets": [
                {
                    "actionType": "VIEW",
                    "contextType": "CONTEXT_FREE",
                    "displayName": "创建",
                    "dslNodeType": "action",
                    "label": "创建",
                    "model": "resource.ResourceCountryGroup",
                    "name": "redirectCreatePage",
                    "resModel": "resource.ResourceCountryGroup",
                    "resModelName": "resourceCountryGroup",
                    "target": "ROUTER",
                    "viewType": "FORM"
                }
            ]
        },
        {
            "dslNodeType": "template",
            "slot": "searchFields",
            "widgets": [
                {
                    "data": "code",
                    "dslNodeType": "field",
                    "exactTtype": "STRING",
                    "index": false,
                    "invisible": "false",
                    "label": "编码",
                    "model": "resource.ResourceCountryGroup",
                    "multi": false,
                    "name": "code",
                    "required": "true",
                    "size": "128",
                    "store": true,
                    "ttype": "STRING",
                    "unique": true
                },
                {
                    "data": "name",
                    "dslNodeType": "field",
                    "exactTtype": "STRING",
                    "index": false,
                    "invisible": "false",
                    "label": "名称",
                    "model": "resource.ResourceCountryGroup",
                    "multi": false,
                    "name": "name",
                    "required": "true",
                    "size": "128",
                    "store": true,
                    "ttype": "STRING",
                    "unique": false
                }
            ]
        },
        {
            "dslNodeType": "template",
            "slot": "fields",
            "widgets": [
                {
                    "data": "id",
                    "dslNodeType": "field",
                    "exactTtype": "INTEGER",
                    "index": false,
                    "invisible": "true",
                    "label": "ID",
                    "max": "Infinity",
                    "min": "-Infinity",
                    "model": "resource.ResourceCountryGroup",
                    "multi": false,
                    "name": "id",
                    "required": "false",
                    "size": "20",
                    "store": true,
                    "ttype": "INTEGER",
                    "unique": false
                },
                {
                    "data": "code",
                    "dslNodeType": "field",
                    "exactTtype": "STRING",
                    "index": false,
                    "invisible": "false",
                    "label": "编码",
                    "model": "resource.ResourceCountryGroup",
                    "multi": false,
                    "name": "code",
                    "required": "true",
                    "size": "128",
                    "store": true,
                    "ttype": "STRING",
                    "unique": true
                },
                {
                    "data": "name",
                    "dslNodeType": "field",
                    "exactTtype": "STRING",
                    "index": false,
                    "invisible": "false",
                    "label": "名称",
                    "model": "resource.ResourceCountryGroup",
                    "multi": false,
                    "name": "name",
                    "required": "true",
                    "size": "128",
                    "store": true,
                    "ttype": "STRING",
                    "unique": false
                }
            ]
        },
        {
            "dslNodeType": "template",
            "slot": "rowActions",
            "widgets": [
                {
                    "actionType": "VIEW",
                    "contextType": "SINGLE",
                    "displayName": "详情",
                    "dslNodeType": "action",
                    "label": "详情",
                    "model": "resource.ResourceCountryGroup",
                    "name": "redirectDetailPage",
                    "resModel": "resource.ResourceCountryGroup",
                    "resModelName": "resourceCountryGroup",
                    "target": "ROUTER",
                    "viewType": "DETAIL"
                },
                {
                    "actionType": "VIEW",
                    "contextType": "SINGLE",
                    "displayName": "编辑",
                    "dslNodeType": "action",
                    "label": "编辑",
                    "model": "resource.ResourceCountryGroup",
                    "name": "redirectUpdatePage",
                    "resModel": "resource.ResourceCountryGroup",
                    "resModelName": "resourceCountryGroup",
                    "target": "ROUTER",
                    "viewType": "FORM"
                }
            ]
        }
    ]
}
```

The content displayed in `resView.template` is actually the result of DSL conversion and compilation. This process is complex; for now, it's sufficient to know that it converts `XML` to `JSON` according to certain rules:

Let's compare the provided `DSL` with a similar data structure:

``` json
{
    "dslNodeType": "VIEW",
    "type": "TABLE",
    ...,
    "widgets": [
        {
            "dslNodeType": "TEMPLATE",
            "slot": "searchFields",
            "widgets": [
                ...
            ]
        },
        {
            "dslNodeType": "TEMPLATE",
            "slot": "fields",
            "widgets": [
                ...
            ]
        },
        {
            "dslNodeType": "TEMPLATE",
            "slot": "actions",
            "widgets": [
                ...
            ]
        }
    ]
}
```

A simple rule can be described as:

+ `XML` tags are converted to `dslNodeType` attributes, `XML sub-tags` are converted to `widgets` attributes, and other attributes remain unchanged.
+ Metadata of the current model is added to the `view` tag. As shown above, the `model` will supplement metadata attributes such as model name, model type, module name, sorting rules, primary key `pk`, unique key `uniques`, etc.
+ Metadata of the field is added to the `field` tag. As shown above, we only defined the `data` attribute of the field, but the returned `JSON` contains all metadata of the `field`. The `field` will supplement metadata attributes such as field type, display name, and whether to store.
+ Metadata of the action is added to the `action` tag. As shown above, we only defined the `name` attribute of the action, but the returned `JSON` contains all metadata of the `action`. The `action` will supplement metadata attributes such as action type and display name.

:::warning Tip

For more information on page rendering, refer to: [DSL](/en/DevManual/Reference/Front-EndFramework/Widget/DSL.md)

:::

# V. Theory: Metadata Overview

The Oinone platform contains much metadata, which completely describes all aspects of an `application` including storage structure, page display, and user interaction.

First, let's look at a "metadata family diagram":

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-1/mind2.jpeg)

Below, we will explain these metadata contents one by one.

:::warning Tip

For Oinone beginners, we recommend not delving too deeply into the details of metadata but only gaining a preliminary understanding of the overall concept based on this article.

For more information on metadata, refer to: [Metadata Service](/en/DevManual/Reference/Front-EndFramework/Services/metadata-service.md)

:::

## (I) Modules and Applications

A module (`Module`) is the smallest unit divided and managed by business domain, a collection of functions and interfaces.

When the `application` attribute on a module is `true`, the module is marked as an application. In simple terms, what is visible on all pages is called an application, while what provides functions and services behind the scenes is called a module.

Regarding modules, several important attributes must be understood and remembered:

+ Module code (module): The module code is used everywhere the module is referenced on the back-end.
+ Module name (name): The module name is used everywhere the module is referenced on the front-end.

The content displayed in the module switcher in the upper-left corner of the page are applications.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-1/application.png)

## (II) Data Dictionary

A data dictionary (DataDictionary) is the enumeration type in code, referred to as a data dictionary in metadata. It lists all members of a finite sequence set.

## (III) Model

The model is the most important metadata in Oinone. Fields, functions, actions, and views in Oinone are all defined around the model.

Regarding the model, several important attributes must be understood and remembered:

+ Model code (model): The unique identifier of the model.
+ Model name (name): Generally generated from the model code, can be customized on the back-end.
+ Primary key (pks): The primary key of model data, unique, most often `id` (same concept as database primary key).

### 1. Fields

Fields are the basic elements used by the model to describe data structures.

Regarding fields, several important attributes must be understood and remembered:

+ Model code (model): The model code to which the field belongs.
+ Field name (data): The unique identifier of the field in the model, unique in combination with the model code.
+ Field business type (ttype): Used to define the type of data structure. When the field business type is `String`, the corresponding type declaration in TypeScript may be `string | null | undefined`.
+ Multi-value (multi): Combined with the field business type, determines if the type declaration is an array. When the field business type is `String` and `multi` is `true`, the corresponding type declaration in TypeScript is `string[] | null | undefined`.

:::warning Tip

For more information on fields, refer to: [Field](/en/DevManual/Reference/Front-EndFramework/Widget/Field/README.md)

:::

### 2. Functions

Functions are the FAAS (Function as a service) capability provided by Oinone. For the front-end, we only need to care that any function with an open level (openLevel) including API can be called by the front-end. Other concepts of functions are for back-end learning.

Regarding functions, several important attributes must be understood and remembered:

+ Namespace: Usually the model code for model functions, as defined by the back-end for other functions.
+ Function code (fun): Same as the method name, unique in combination with the namespace, can be customized by the back-end.
+ Function name (name): Same as the method name, can be customized by the back-end.

Let's briefly understand functions using TypeScript syntax:

``` typescript
countByWrapper(queryWrapper: { rsql: string }): Promise<number>
```

Like the `countByWrapper` function, it has a method name, input parameters, and output parameters, almost identical to the input/output parameter types defined by the back-end.

:::warning Tip

For more information on custom requests, refer to: [Customize GraphQL Request](/en/DevManual/OperationGuide/customize-graphQL-request.md)

:::

### 3. Actions

Actions are buttons that can be rendered on the page for user clicks. In Oinone, all possible user operations are divided into four categories:

+ ViewAction: Clicking will navigate to another page within the application.
+ UrlAction: Clicking will navigate to a specified URL, similar to `window.open`.
+ ServerAction: Sends a request to the back-end and processes the returned result.
+ ClientAction: For front-end interaction only; theoretically, it can do anything.

Any type of action has several important attributes that must be understood and remembered:

+ Model code (model): Model code.
+ Action name (name): The unique identifier of the action in the model, unique in combination with the model code.
+ Action type (actionType): Four types: view action (VIEW), URL action (URL), server action (SERVER), and client action (CLIENT).
+ Context type (contextType): The way the action processes data, including processing single data, multiple data, single or multiple data, and no data processing.

Each specific type of action described below `inherits` from the action base class and possesses these attributes.

:::warning Tip

It is worth mentioning that a service call (ServerAction) is actually a function behind the scenes, and the type of this function is usually Mutation.

:::

:::warning Tip

For more information on actions, refer to: [Action](/en/DevManual/Reference/Front-EndFramework/Widget/action.md)

:::

### 4. ViewAction {#viewaction}

As one of the most important metadata for the front-end, ViewAction contains all the content of a page and the relationships between pages.

Regarding ViewAction, several important attributes must be understood and remembered:

+ Model code (model): The model code corresponding to the view.
+ Action name (name): The unique identifier of the action in the model, unique in combination with the model code.
+ View type (viewType): Target view type.
+ Target model code (resModel): The model code of the current view.
+ Target view name (resViewName): The name of the current view.
+ Open method (target): The method of navigating from one page to another, including open in current window, open in new window, open in pop-up, and open in drawer.

Taking the "Resource - Country Groups" table as an example, there is a "Create" action above the table. The metadata corresponding to this "Create" action is as follows (for ease of understanding, we only show the content introduced above):

``` json
{
    "actionType": "VIEW",
    "model": "resource.ResourceCountryGroup",
    "name": "redirectCreatePage",
    "viewType": "FORM",
    "resModel": "resource.ResourceCountryGroup",
    "target": "ROUTER",
    "contextType": "CONTEXT_FREE"
}
```

From the metadata of this action, we can see that this is a ViewAction named `redirectCreatePage` (`actionType: VIEW`), which can appear in any view with the model code `resource.ResourceCountryGroup`. When clicked, it opens a new page in the `current window` without carrying any context parameters. The target view has the model `resource.ResourceCountryGroup` and view type `FORM` (form).

:::warning Tip

We did not obtain the value of the `resViewName` field here because on the table page, we only need to see this button and be able to click it. `resViewName` is a value to care about when entering the next page.

In the following sections, we will introduce how to view metadata and its data structure based on page rendering, and then you will know the source of this action metadata.

:::

When we click this action, let's observe the change in the `browser URL`.

Before clicking: (same as the result of `decodeURIComponent` in Section III's browser URL)

``` json
http://127.0.0.1:8080/page;module=resource;viewType=TABLE;model=resource.ResourceCountryGroup;action=resource#国家分组;scene=resource#国家分组;target=OPEN_WINDOW;menu={"selectedKeys":["国家分组"],"openKeys":["地址库","地区"]}
```

After clicking:

``` json
http://127.0.0.1:8080/page;module=resource;viewType=FORM;model=resource.ResourceCountryGroup;action=redirectCreatePage;scene=redirectCreatePage;target=ROUTER;menu={"selectedKeys":["国家分组"],"openKeys":["地址库","地区"]};path=/resource/国家分组/ACTION#resource.ResourceCountryGroup#redirectCreatePage
```

By observing the URL before and after clicking, we can see that the current page has switched from `TABLE` to `FORM`, and the loaded action has switched from `resource#国家分组` to `redirectCreatePage`. Other parameters have also changed accordingly.

:::warning Tip

The `path` parameter is not involved here; it is a permission-related parameter. For more information on permissions, refer to: [Security in Oinone](/en/DevManual/Reference/Back-EndFramework/security-in-oinone.md)

:::

## (IV) View

In Oinone, any page is rendered through a view. The `mask` defined by the ViewAction, the `layout` defined by the view, and the `DSL` are superimposed to form a complete page.

Whether it is `mask`, `layout`, or `DSL`, we use XML syntax for definition. Compared with `JSON` or other languages, `XML` better provides `structured` representation.

During rendering, we first render the entire page framework through the `mask`, then merge the `layout` and `DSL` through `slots`, rendering them in the `main-view` area to finally display a complete page.

Below, we introduce the relevant contents of `mask`, `layout`, and `DSL`.

### 1. Mask

Most interfaces in the Oinone client use a common layout: the top contains a control component with some functions, and the area below is divided into two parts: a menu for switching pages on the left and a main content area on the right.

Like this:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-1/mask.png)

It is rendered through the following default mask:

``` xml
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

In this template, the elements included are:

+ mask: Root tag of the mask, fixed tag.
+ multi-tabs: Multi-tab.
+ header: Top bar.
+ container: Container.
+ sldebar: Sidebar.
  - nav-menu: Navigation menu.
+ content: Main content.
  - breadcrumb: Breadcrumb.
  - block: A component similar to a div block.
  - main-view: Main view; used to render layout, DSL, and other related content.

:::warning Tip

For more information on masks, refer to: [Mask](/en/DevManual/Reference/Front-EndFramework/Widget/mask.md)

:::

### 2. Layout

Layouts use different default layouts based on view type and display position. Take "Resource - Country Groups" as an example; it is a table view containing only three components: search, action bar, and table.

Layouts only arrange components to apply to multiple models. Different models with different fields and actions can be inserted through slots.

Like this:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-1/layout.png)

It is rendered through the following default layout:

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

In this template, the elements included are:

+ view: Root tag of the layout, fixed tag.
+ pack: Container-type component.
+ element: Element component; search component, action bar, and table component are all element components, which are core components providing specific functions for the view.
+ slot and xslot: DSL slots; template fragments defined in the DSL will be inserted into slots with the same name, similar to the `slot` tag provided by `Vue`.

:::warning Tip

For more information on layouts, refer to: [Layout](/en/DevManual/Reference/Front-EndFramework/Widget/layout.md)

For more information on element components, refer to: [Element](/en/DevManual/Reference/Front-EndFramework/Widget/element.md)

:::

### 3. DSL

In the layout (Layout) we saw above, we reserved some slots (Slot). Next, we need to populate these slots with relevant metadata according to the model corresponding to the current view.

We can define a DSL as follows:

``` xml
<view type="TABLE" model="resource.ResourceCountryGroup" title="国家分组" name="国家分组table">
    <template slot="actions">
        <action name="redirectCreatePage" label="创建" />
        <action name="delete" label="删除" />
    </template>
    <template slot="searchFields">
        <field data="code" />
        <field data="name" />
    </template>
    <template slot="fields">
        <field data="id" invisible="true" />
        <field data="code" />
        <field data="name" />
        <field data="countryList" />
    </template>
    <template slot="rowActions">
        <action name="redirectDetailPage" label="详情" />
        <action name="redirectUpdatePage" label="编辑" />
    </template>
</view>
```

In this template, the elements included are:

+ view: Root tag of the DSL, fixed tag.
+ template: A template fragment inserted into the DSL slot, similar to the `template` tag provided by `Vue` for slots.
+ field: Field metadata tag.
+ action: Action metadata tag.

:::warning Tip

For more information on DSL, refer to: [DSL](/en/DevManual/Reference/Front-EndFramework/Widget/DSL.md)

:::

### 4. ViewType

The view type is an important attribute of a view, used to determine data structure, data processing, rendering method, and final presentation. The flow between pages is essentially a switch between view types.

Taking "Resource - Country Groups" as an example, each ViewAction connects various view types to implement data maintenance functions around the model. The standard process of page flow is as shown in the following diagram:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-1/mind3.jpeg)

The above shows the standard "CRUD" process for table, form, and detail views. That is: enter the `table view (TABLE)` through the "menu"; the `table view (TABLE)` contains three actions: "create", "edit", and "detail"; navigate to the same `form view (FORM)` through "create" and "edit"; navigate to the `detail view (DETAIL)` through "detail".

### 5. Data Structure

In Oinone, different view types handle different data structures. The Widget framework classifies data structures into two main categories: `List` and `Object`.

Below is a list of data structures and view types:
<table>
	<tr>
	    <th>Data Structure</th>
      <th>View Type</th>
      <th>Base Class</th>
	</tr >
	<tr >
	    <td rowspan="2">List</td>
      <td>Table (TABLE)</td>
	    <td rowspan="2">BaseElementListViewWidget</td>
  </tr>
  <tr >
      <td>Gallery (GALLERY)</td>
  </tr>
  <tr >
	    <td rowspan="2">Object</td>
      <td>Form (FORM)</td>
	    <td rowspan="2">BaseElementObjectViewWidget</td>
  </tr>
  <tr >
      <td>Detail (DETAIL)</td>
  </tr>
</table>

+ For the `List` data structure, the `BaseElementListViewWidget` base class defines common behaviors such as `query`, `pagination`, `sorting`, and `submission`.
+ For the `Object` data structure, the `BaseElementObjectViewWidget` base class defines common behaviors such as `query`, `validation`, and `submission`.

### 6. Data Interaction

So, how do they communicate and interact with each other? Let's look at the standard process of data interaction:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-1/mind4.jpeg)

1. After entering the table view, load data through `queryPage` and update the table view.
2. Click the create button; the action's data control type is `no data processing`, so no data is carried to the form view. When the form view does not receive a `primary key`, it loads data through `construct` and updates the form view.
3. Click the delete button; the action's data control type is `process single or multiple data`, so the selected data rows in the table are submitted to the back-end.
4. Click the edit button; the action's data control type is `process single data`, so the `primary key` of the `current row data` is carried to the form view. The form view finds the incoming `primary key`, loads data through `queryOne`, and updates the form view.
5. Click the detail button; the action's data control type is `process single data`, so the `primary key` of the `current row data` is carried to the detail view. The detail view processes data in the same way as the form view, loading data through `queryOne` and updating the detail view.

# VI. Conclusion

So far, we have briefly introduced all the key information and metadata involved in the following chapters. Understanding Oinone metadata, rendering, and interaction is not achieved overnight; it is a long process that continues with future use of Oinone.

Learning Oinone is an interesting process that contains many design concepts and philosophies. We hope this article has laid a solid foundation for your Oinone learning journey.

Let's continue learning~