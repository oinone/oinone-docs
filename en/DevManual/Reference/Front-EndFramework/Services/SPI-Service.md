---
title: SPI Service
index: true
category:
  - DevManual
  - Reference
  - Front-EndFramework
  - Services
order: 2

---
In Oinone Kunlun, a large number of SPI mechanisms are used. In addition to the component registration we commonly use, many function extensions are also inseparable from the SPI mechanism. This content will provide a relatively comprehensive introduction to Oinone SPI.

:::warning Note:

Most of the content in this chapter explains the implementation principles and concepts of Oinone SPI, which are not frequently used in business systems. The focus is to help readers understand the core functional logic of Oinone Kunlun, so that readers can better implement business functions when appropriate.

:::

# Ⅰ. Overview

## (Ⅰ) What is SPI?

For **SPI** used in software programs, we usually refer to it as **Service Provider Interface**.

For users, we usually only need to care about the input and output parameters of the method, without caring about the implementation of the method itself. This kind of programming method is also called **interface-oriented programming**.

## (Ⅱ) What is IOC?

**IOC** is not a technology, but a thought, an important object-oriented programming principle. It can guide us how to design **loosely coupled** and better programs. In traditional applications, we actively create dependent objects inside the class, resulting in high coupling between classes and difficulty in testing. With the IOC container, the control of **creating and finding dependent objects** is handed over to the **container**, and the container injects and combines objects. Therefore, objects are loosely coupled, which also facilitates testing, is conducive to function reuse, and more importantly, makes the entire architecture of the program very flexible. During runtime, the dependent objects are dynamically injected into the components by the external container. When the external container starts, the external container will initialize, create and manage object instances, and destroy them. This application itself is not responsible for the creation and maintenance of dependent objects. The creation and maintenance of dependent objects are handled by the external container, which is called **Inversion of Control**.

## (Ⅲ) IOC (Inversion of Control) and DI (Dependency Injection)

**IOC (Inversion of Control)**: A thought of managing object instances through an external container.

**DI (Dependency Injection)**: An implementation way of **IOC**.

## (Ⅳ) Oinone SPI

IOC is the core of the Spring framework (a framework developed in Java) and runs through it. Its interface-oriented development capability enables service callers and service providers to achieve complete decoupling. As long as the calls follow the rules defined by the interface, the specific service implementations can be diversified.

For the front-end, we use `inversify` to implement **IOC**. Its powerful decoupling capability allows the platform to perform a large number of abstractions without caring about specific implementations.

Next, we will introduce the basic application of Oinone SPI in development.

# Ⅱ. SPI API

For convenience, we have grouped the calling methods of component SPI and IOC-related functions together. These static properties are all provided in the form of `decorator` functions, and some basic usages will be explained below.

```typescript
export class SPI {
  /**
   * generator spi storage
   */
  public static Base;

  /**
   * register target to token storage
   */
  public static ClassFactory;

  /**
   * register singleton service
   */
  public static Service;

  /**
   * autowired service property/parameter in service
   */
  public static Autowired;

  /**
   * service construct after execute method
   */
  public static PostConstruct;

  /**
   * autowired service in widget
   */
  public static Instantiate;

  /**
   * autowired services in widget
   */
  public static Instantiates;

  /**
   * service construct after execute method in widget
   */
  public static InstantiatePostConstruct;
}
```

# Ⅲ. Using SPI Service to Abstract Business Logic

## (Ⅰ) Create the First Service

When using SPI, we usually need to separate the definition of interfaces and implementations, so that business logic does not rely on specific implementations, so as to achieve "loose coupling".

Take the "product" service as an example to see how SPI is used.

**service/ProductService.ts**

```typescript
import { ServiceIdentifier } from '@oinone/kunlun-dependencies';

/**
 * Product entity
 */
export interface Product {
  id: string;
  name: string;
}

/**
 * Product service
 */
export interface ProductService {
  /**
   * Get product list
   */
  getProducts(): Promise<Product[]>;

  /**
   * Get product by ID
   * @param id Product ID
   */
  getProductById(id: string): Promise<Product | undefined>;
}

/**
 * Product service Token
 */
export const ProductServiceToken = ServiceIdentifier<ProductService>('ProductService');

```

**service/impl/ProductServiceImpl.ts**

```typescript
@SPI.Service(ProductServiceToken)
export class ProductServiceImpl implements ProductService {
  public async getProducts(): Promise<Product[]> {
    // request api get products
    console.log('default product service getProducts');
    return [];
  }

  public async getProductById(id: string): Promise<Product | undefined> {
    // request api get product by id
    console.log('default product service getProductById');
    return undefined;
  }
}

```

## (Ⅱ) Using Services in Widget Components

Inject `ProductService` using the `SPI.Instantiate` decorator in any `Widget component` and call it at the appropriate time. Take the "counter component" as an example:

```typescript
@SPI.ClassFactory(
  BaseElementWidget.Token({
    widget: 'Counter'
  })
)
export class CounterWidget extends BaseElementWidget {
  @SPI.Instantiate(ProductServiceToken)
  protected productService: ProductService | undefined;

  public initialize(props) {
    super.initialize(props);
    this.setComponent(Counter);
    return this;
  }

  @Widget.Reactive()
  public value: number = 0;

  @Widget.Method()
  public async onIncrement() {
    this.value += 1;
    await this.productService?.getProducts();
    await this.productService?.getProductById('1');
  }
}

// Console output results
// default product service getProducts
// default product service getProductById
```

In this example, `ProductService` and `ProductServiceToken` act as a bridge between the **service provider** and the **service caller**.

`ProductServiceImpl` registers the service through `ProductServiceToken` and provides a possible functional implementation for the `ProductService` interface.

`CounterWidget` injects an "effective" functional implementation through `ProductServiceToken` and calls it in the `onIncrement` method.

## (Ⅲ) Extension or Replacement

When we need to extend or replace the ProductService in the business project, we can define the priority of the extended service through the priority attribute, so that when obtaining a single instance, it will be used first. Priorities are sorted in descending order; the larger the number, the higher the priority. On the basis of the previous section, we can register an extended product service to replace the default service, as shown below:

**service/impl/ExtendProductServiceImpl.ts**

```typescript
@SPI.Service(ProductServiceToken, { priority: 55 })
export class ExtendProductServiceImpl implements ProductService {
  public async getProducts(): Promise<Product[]> {
    // request api get products
    console.log('extend product service getProducts');
    return [];
  }

  public async getProductById(id: string): Promise<Product | undefined> {
    // request api get product by id
    console.log('extend product service getProductById');
    return undefined;
  }
}

// The "counter" component continues to call the onIncrement method without modification
// Console output results
// extend product service getProducts
// extend product service getProductById
```

## (Ⅳ) Service Calling Service

When calling other services in a service, you need to use the `SPI.Autowired` decorator to inject the corresponding service. As shown below:

```typescript
import { SPI, UserService, UserServiceToken } from '@oinone/kunlun-dependencies';
import { Product, ProductService, ProductServiceToken } from '../ProductService';

@SPI.Service(ProductServiceToken, { priority: 55 })
export class ExtendProductServiceImpl implements ProductService {
  @SPI.Autowired(UserServiceToken)
  protected userService!: UserService;

  public async getProducts(): Promise<Product[]> {
    // request api get products
    console.log('extend product service getProducts');
    const userInfo = await this.userService.getUserInfo();
    console.log('user info: ', userInfo);
    return [];
  }

  public async getProductById(id: string): Promise<Product | undefined> {
    // request api get product by id
    console.log('extend product service getProductById');
    return undefined;
  }
}

```

:::warning Note:

`UserService` is a built-in user information service of Oinone, used to obtain user avatar and related information.

:::

# Ⅳ. Using SPI Storage for Dimension Storage

## (Ⅰ) Basic Concepts

The essence of **dimension storage** is a way of storing data in various **dimension nodes** through a **multi - fork tree structure**. When retrieving data, the corresponding data on the dimension nodes is obtained through a **weighted longest path matching** algorithm.

Here are some basic concepts used in dimension storage:

- Storage instance: It is used to declare an instance object for storing data, which contains two properties: `StorageKey` and `MatchKeys`.
- Storage Key: Each storage instance has a globally unique storage identifier.
- Match Keys: All key - value pairs used to determine the storage dimension in the storage instance, and weights can be specified for them.
- Dimension registration: A method for registering by providing the storage Key, dimension values, and stored data.
- Dimension matching: A method for obtaining stored data by providing the storage Key and dimension values.

## (Ⅱ) Take BaseFieldWidget as an Example

### 1. Declare a Storage Instance

Before starting, let's take a look at how `BaseFieldWidget` declares a storage instance. As shown below:

```typescript
/**
 * Optional items for Field component registration
 */
export interface BaseFieldOptions extends SPIOptions {
  /**
   * Specify the view type
   */
  viewType?: ViewType | ViewType[];
  ...
}

@SPI.Base('Field', ['viewType', 'ttype', 'multi', { key: 'widget', weight: 999 }, 'model', 'viewName', 'name'])
export class BaseFieldWidget {
  public static Token: SPITokenFactory<BaseFieldOptions>;

  public static Selector: SPISingleSelector<BaseFieldOptions, Constructor<BaseFieldWidget>>;
}
```

In this example, a storage instance is created through the `SPI.Base` decorator. The corresponding `storage Key` and `match Keys` are defined as input parameters. After the decorator is executed, the two properties `Token` and `Selector` will be assigned functions of the corresponding types, and then this storage instance can be used for registration and retrieval anywhere.

### 2. Register Three Field Components

**FormStringInputFieldWidget**

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search],
    ttype: ModelFieldType.String
  })
)
export class FormStringInputFieldWidget
```

**FormStringMultiTagFieldWidget**

```typescript
@SPI.ClassFactory(
  BaseFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search],
    ttype: ModelFieldType.String,
    multi: true
  })
)
export class FormStringMultiTagFieldWidget
```

**FormStringHyperlinksFieldWidget**

```typescript
@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: ViewType.Form,
    ttype: ModelFieldType.String,
    widget: 'Hyperlinks'
  })
)
export class FormStringHyperlinksFieldWidget
```

### 3. Storage Structure

When all the above components are registered in the `SPI Token` component of `BaseFieldWidget` in sequence, a tree with `BaseFieldWidget` as the root node will be formed:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/4c23f0130c8f78b0d25a0b37687739d4.svg)

The component tree formed above is not the actual storage structure. The actual storage structure is stored by dimension, as shown in the following figure:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/977182723a509a39add0f57dd30185a1.svg)

PS: Rounded rectangles represent attributes and values on the dimension, and rectangles represent corresponding components.

## (Ⅲ) Weighted Longest Path Matching

When we need to use the `FormStringHyperlinksFieldWidget` component, it will be defined like this in the `DSL`:

```xml
<view type="FORM" title="Demo Form" name="Demo Model form" model="demo.DemoModel">
    <template slot="fields">
        <field data="name" widget="Hyperlinks" />
    </template>
</view>
```

When the Widget framework is running, we will use `BaseFieldWidget.Selector` to obtain the specific component. It is similar to this:

```typescript
const widgetConstructor = BaseFieldWidget.Selector({
  viewType: ViewType.Form,
  ttype: ModelFieldType.String,
  multi: false,
  widget: 'Hyperlinks',
  model: 'demo.DemoModel',
  viewName: 'Demo Model form',
  name: 'name'
});
```

At this time, the corresponding component will be obtained by dimension according to the weighted longest path matching algorithm. A general matching process is as follows:

- Match the first - layer nodes where `viewType` is `FORM` or contains `FORM`.
- Match the second - layer nodes where `ttype` is `STRING` or contains `STRING`. (At this time, `FormStringInputFieldWidget` is inserted at the top of the **to - return queue**)
- Match the third - layer nodes where `multi` is `false`. (At this time, no nodes match, and continue to match the current layer)
- Match the third - layer nodes where `widget` is `Hyperlinks`. (At this time, `FormStringHyperlinksFieldWidget` is inserted at the top of the **to - return queue**)
- The fourth layer is empty, and no further search is performed downward.
- Return the first item of the to - return queue.

# Ⅴ. Using SPIOperator for Dimension Storage

## (Ⅰ) API

`SPI.Base` and `SPI.ClassFactory` are essentially encapsulations of `SPIOperator` operations, enabling them to have the ability of decorator creation and registration. But sometimes, it is not very convenient to use decorators for operations. At this time, it is necessary to directly use `SPIOperator` for some encapsulation.

```typescript
/**
 * SPI operator
 */
export class SPIOperator {

  /**
   * Create a storage instance
   * @param options Optional items
   */
  public static createStorage(options: CreateStorageOptions): boolean;

  /**
   * Register stored data
   * @param store Storage Key
   * @param options Dimension values
   * @param value Stored data
   * @param replace Whether to allow replacement; overwrite old data by default;
   */
  public static register<V = unknown>(store: SPIStorageKey, options: SPIOptions, value: V, replace = true): boolean;

  /**
   * Get the stored data with the highest matching degree to the dimension values
   * @param store Storage Key
   * @param options Dimension values
   */
  public static selector<V = unknown>(store: SPIStorageKey, options: SPIOptions): V | undefined;

  /**
   * Get all stored data sets related to the dimension values and sort them according to the matching degree
   * @param store Storage Key
   * @param options Dimension values
   */
  public static selectors<V = unknown>(store: SPIStorageKey, options: SPIOptions): V[];
}
```

## (Ⅱ) Best Practices

Let's simulate the process of declaring dimension storage and registration for `BaseFieldWidget` in Section 4, and use `string` instead of specific components to see the best practice cases of `SPIOperator` in actual use. A possible implementation is as follows:

```typescript
const CUSTOM_STORAGE_KEY = Symbol('CUSTOM_STORAGE_KEY');

export interface CustomStorageOptions extends SPIOptions {
  viewType: ViewType | ViewType[];
  ttype: ModelFieldType | ModelFieldType[];
  multi?: boolean;
  widget?: string | string[];
}

SPIOperator.createStorage({
  key: CUSTOM_STORAGE_KEY,
  matchKeys: ['viewType', 'ttype', 'multi', 'widget']
});

export function registerCustomBody(options: CustomStorageOptions, value: string) {
  return SPIOperator.register(CUSTOM_STORAGE_KEY, options, value);
}

export function selectorCustomBody(options: CustomStorageOptions): string | undefined {
  return SPIOperator.selector(CUSTOM_STORAGE_KEY, options);
}

export function selectorsCustomBody(options: CustomStorageOptions): string[] {
  return SPIOperator.selectors(CUSTOM_STORAGE_KEY, options);
}
```

- CUSTOM_STORAGE_KEY: Declare `SPIStorageKey`.
- CustomStorageOptions: Declare optional dimension items. It is necessary to determine whether each parameter supports multi - value registration according to the actual scenario.
- registerCustomBody: The registration method, which needs to clearly declare all types.
- selectorCustomBody: Get the best - matched item.
- selectorsCustomBody: Get all related data sets, sorted by matching degree.

:::warning Note:

When using, pay attention to the use of the `export` keyword, and do not allow external parties to directly operate the storage instance.

:::

**Test Code**

```typescript
// Simulate registering the FormStringInputFieldWidget component
registerCustomBody(
  {
    viewType: [ViewType.Form, ViewType.Search],
    ttype: ModelFieldType.String
  },
  'FormStringInputFieldWidget'
);

// Simulate registering the FormStringMultiTagFieldWidget component
registerCustomBody(
  {
    viewType: [ViewType.Form, ViewType.Search],
    ttype: ModelFieldType.String,
    multi: true
  },
  'FormStringMultiTagFieldWidget'
);

// Simulate registering the FormStringHyperlinksFieldWidget component
registerCustomBody(
  {
    viewType: ViewType.Form,
    ttype: ModelFieldType.String,
    widget: 'Hyperlinks'
  },
  'FormStringHyperlinksFieldWidget'
);

// Simulate getting the FormStringHyperlinksFieldWidget component
console.log(
  selectorCustomBody({
    viewType: ViewType.Form,
    ttype: ModelFieldType.String,
    widget: 'Hyperlinks'
  })
);

// Console output
// FormStringHyperlinksFieldWidget

// Simulate getting all related components
console.log(
  selectorsCustomBody({
    viewType: ViewType.Form,
    ttype: ModelFieldType.String,
    widget: 'Hyperlinks'
  })
);

// Console output
// ['FormStringHyperlinksFieldWidget', 'FormStringInputFieldWidget']
```