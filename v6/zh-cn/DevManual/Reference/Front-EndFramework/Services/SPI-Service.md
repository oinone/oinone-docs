---
title: SPI Service
index: true
category:
  - DevManual
  - Reference
  - 前端API
  - Services
order: 2

---
在 Oinone Kunlun 中，使用了大量的 SPI 机制。除了我们常用的组件注册外，还有很多功能的扩展都离不开 SPI 机制。这篇内容将对 Oinone SPI 进行较为全面的介绍。

:::warning 提示：

本章内容大多是对 Oinone SPI 实现原理与概念的讲解，通常在业务系统中使用到的频率并不高，重点在于帮助读者理解 Oinone Kunlun 的核心功能逻辑，以帮助读者可以在适当的时候更好的实现业务功能。

:::

# 一、概述

## （一）什么是 SPI ？

对于软件程序中使用到的 **SPI**，我们通常将其称为 **Service Provider Interface**，即**服务提供接口**。

对于使用方来说，我们通常只需要关心方法的入参和出参，而无需关心方法本身的实现。这样的一种编程方式也被称为**面向接口编程**。

## （二）什么是 IOC ？

**IOC** 不是一种技术，只是一种思想，一个重要的面向对象编程的法则，它能指导我们如何设计出**松耦合**，更优良的程序。传统应用程序都是由我们在类内部主动创建依赖对象，从而导致类与类之间高耦合，难于测试；有了IOC容器后，把**创建和查找依赖对象**的控制权交给了**容器**，由容器进行注入组合对象，所以对象与对象之间是松散耦合，这样也方便测试，利于功能复用，更重要的使程序的整个体系结构变得非常灵活。在运行期，在外部容器动态的将依赖对象注入组件，当外部容器启动后，外部容器就会初始化。创建并管理对象实例，以及销毁，这种应用本身不负责依赖对象的创建和维护，依赖对象的创建和维护是由外部容器负责的称为**控制反转**。

## （三）IOC（控制反转）和 DI（依赖注入）

**IOC（Inversion of Control, 控制反转）**：通过外部容器管理对象实例的一种思想。

**DI（Dependency Injection, 依赖注入）**：**IOC** 的一种实现方式。

## （四）Oinone SPI

IOC 是 Spring 框架（一种以 Java 为语言开发的框架）的核心，并贯穿始终。其面向接口的开发能力，使得服务调用方和服务提供方可以做到完全解耦，只要遵循接口定义的规则进行调用，具体服务的实现可以是多样化的。

对于前端，我们使用 `inversify` 进行了 **IOC** 的实现。其强大的解耦能力可以使得平台进行大量的抽象，而无需关系具体的实现。

接下来，我们将介绍 Oinone SPI 在开发中的基本运用。

# 二、SPI API

为了方便起见，我们将组件 SPI 与 IOC 相关功能的调用方式放在了一起。这些静态属性全部都是以 `装饰器` 函数的形式提供，下面会讲解一些基础用法。

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

# 三、使用 SPI Service 抽象业务逻辑

## （一）创建第一个服务

在使用 SPI 时，通常我们需要分别对接口和实现分离定义，这样才能使得业务逻辑不依托于具体实现，从而达到 “松耦合” 的目的。

下面以 “产品” 服务为例，来看看 SPI 是如何使用的。

**service/ProductService.ts**

```typescript
import { ServiceIdentifier } from '@oinone/kunlun-dependencies';

/**
 * 产品实体
 */
export interface Product {
  id: string;
  name: string;
}

/**
 * 产品服务
 */
export interface ProductService {
  /**
   * 获取产品列表
   */
  getProducts(): Promise<Product[]>;

  /**
   * 通过ID获取产品
   * @param id 产品ID
   */
  getProductById(id: string): Promise<Product | undefined>;
}

/**
 * 产品服务Token
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

## （二）在 Widget 组件使用服务

在任意 `Widget 组件` 中使用 `SPI.Instantiate` 装饰器注入 `ProductService`，并在合适的时机进行调用。以 “计数器组件” 为例：

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

// 控制台输出结果
// default product service getProducts
// default product service getProductById
```

在这个例子中，`ProductService` 和 `ProductServiceToken` 作为**服务提供方**和**服务调用方**之间的桥梁存在。

`ProductServiceImpl` 通过 `ProductServiceToken` 进行服务注册，为 `ProductService` 接口提供了一种可能的功能实现。

`CounterWidget` 通过 `ProductServiceToken` 将一种 “有效” 的功能实现进行注入，并且在 `onIncrement` 方法中对其进行了调用。

## （三）扩展或替换

当我们在业务工程中需要对 ProductService 服务进行扩展或替换时，可通过 priority 属性定义扩展服务的优先级，这样在获取单个实例时，将优先使用。优先级以降序排列，数字越大，优先级越高。在上一小节的基础上，我们可以再注册一个扩展产品服务来替换默认服务，如下所示：

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

// “计数器” 组件在不修改的情况下，继续调用 onIncrement 方法
// 控制台输出结果
// extend product service getProducts
// extend product service getProductById
```

## （四）服务调用服务

在服务中调用其他服务时，需要使用 `SPI.Autowired` 装饰器注入对应服务。如下所示：

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

:::warning 提示：

`UserService` 是 Oinone 内置的用户信息服务，用于获取用户头像相关信息。

:::

# 四、使用 SPI Storage 进行维度存储

## （一）基本概念

**维度存储**的本质是通过**多叉树结构**将数据分布在各个**维度节点**进行存储的一种方式。在获取时通过**有权重的最长路径匹配**算法获取对应维度节点上的数据。

下面是维度存储中用到的一些基本概念介绍：

+ 存储实例：用于声明一个用来存储数据的实例对象，其包含 `StorageKey` 和 `MatchKeys` 两个属性。
+ 存储 Key：每个存储实例具备一个全局唯一的存储标识。
+ 匹配 Keys：在存储实例中用于决定存储维度的所有键值，允许指定权重。
+ 维度注册：通过提供存储 Key 、维度值以及存储数据进行注册的方法。
+ 维度匹配：通过提供存储 Key 和维度值获取存储数据的方法。

## （二）以 BaseFieldWidget 为例

### 1、声明一个存储实例

在开始之前，我们先来看一下 `BaseFieldWidget` 是如何声明一个存储实例的。如下所示：

```typescript
/**
 * Field组件注册可选项
 */
export interface BaseFieldOptions extends SPIOptions {
  /**
   * 指定视图类型
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

在这个示例中，通过 `SPI.Base` 装饰器创建了一个存储实例，其对应的 `存储 Key` 和 `匹配 Keys` 都以入参的方式进行了定义。装饰器执行后，`Token` 和 `Selector` 两个属性将被赋予对应类型的函数，接下来就可以在任何地方使用这个存储实例进行注册和获取了。

### 2、注册三个字段组件

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

### 3、存储结构

当上述组件全部按顺序注册在 `BaseFieldWidget` 这个 `SPI Token` 组件中时，将形成一个以 `BaseFieldWidget` 为根节点的树：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/4c23f0130c8f78b0d25a0b37687739d4.svg)

上述形成的组件树实际并非真实的存储结构，真实的存储结构是通过维度进行存储的，如下图所示：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/977182723a509a39add0f57dd30185a1.svg)

PS：圆角矩形表示维度上的属性和值，矩形表示对应的组件。

## （三）有权重的最长路径匹配

当我们需要使用 `FormStringHyperlinksFieldWidget` 组件时，在 `DSL` 中会这样定义：

```xml
<view type="FORM" title="演示表单" name="演示模型form" model="demo.DemoModel">
    <template slot="fields">
        <field data="name" widget="Hyperlinks" />
    </template>
</view>
```

在 Widget 框架运行时，我们将使用 `BaseFieldWidget.Selector` 获取具体组件。类似于这样：

```typescript
const widgetConstructor = BaseFieldWidget.Selector({
  viewType: ViewType.Form,
  ttype: ModelFieldType.String,
  multi: false,
  widget: 'Hyperlinks',
  model: 'demo.DemoModel',
  viewName: '演示模型form',
  name: 'name'
});
```

此时，将按照有权重的最长路径匹配算法按维度获取对应的组件，一个大致的匹配过程为：

+ 匹配第一层 `viewType` 为 `FORM` 或包含 `FORM` 的节点。
+ 匹配第二层 `ttype` 为 `STRING` 或包含 `STRING` 的节点。（此时，`FormStringInputFieldWidget` 被插入到**待返回队列**首位）
+ 匹配第三层 `multi` 为 `false` 的节点。（此时，没有任何节点匹配，继续匹配当前层）
+ 匹配第三层 `widget` 为 `Hyperlinks` 的节点。（此时，`FormStringHyperlinksFieldWidget` 被插入到**待返回队列**首位）
+ 第四层为空，不再继续向下查找。
+ 返回待返回队列首项。

# 五、使用 SPIOperator 进行维度存储

## （一）API

`SPI.Base` 和 `SPI.ClassFactory` 本质上是对 `SPIOperator` 操作的封装，使其具备装饰器创建和注册的能力。但有时使用装饰器进行操作并不是特别方便，这时就需要直接使用 `SPIOperator` 进行一些封装。

```typescript
/**
 * SPI 操作器
 */
export class SPIOperator {

  /**
   * 创建存储实例
   * @param options 可选项
   */
  public static createStorage(options: CreateStorageOptions): boolean;

  /**
   * 注册存储数据
   * @param store 存储 Key
   * @param options 维度值
   * @param value 存储数据
   * @param replace 是否允许替换；默认覆盖旧数据；
   */
  public static register<V = unknown>(store: SPIStorageKey, options: SPIOptions, value: V, replace = true): boolean;

  /**
   * 获取与维度值匹配度最高的存储数据
   * @param store 存储 Key
   * @param options 维度值
   */
  public static selector<V = unknown>(store: SPIStorageKey, options: SPIOptions): V | undefined;

  /**
   * 获取与维度值相关的所有存储数据集合，并根据匹配度进行排序
   * @param store 存储 Key
   * @param options 维度值
   */
  public static selectors<V = unknown>(store: SPIStorageKey, options: SPIOptions): V[];
}
```

## （二）最佳实践

让我们模拟一下第四节 `BaseFieldWidget` 的声明维度存储以及注册的过程，以 `string` 代替具体组件，来看看 `SPIOperator` 在实际使用中的最佳实践案例。一段可能的实现如下所示：

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

+ CUSTOM_STORAGE_KEY：声明 `SPIStorageKey` 。
+ CustomStorageOptions：声明维度可选项。需要根据实际场景决定每个参数是否支持多值注册。
+ registerCustomBody：注册方法，需明确所有类型声明。
+ selectorCustomBody：获取最佳匹配的一项。
+ selectorsCustomBody：获取所有相关数据集，按匹配度排序。

:::warning 提示：

在使用时需要注意 `export` 关键字的使用，不要让外部直接操作存储实例。

:::

**测试代码**

```typescript
// 模拟注册 FormStringInputFieldWidget 组件
registerCustomBody(
  {
    viewType: [ViewType.Form, ViewType.Search],
    ttype: ModelFieldType.String
  },
  'FormStringInputFieldWidget'
);

// 模拟注册 FormStringMultiTagFieldWidget 组件
registerCustomBody(
  {
    viewType: [ViewType.Form, ViewType.Search],
    ttype: ModelFieldType.String,
    multi: true
  },
  'FormStringMultiTagFieldWidget'
);

// 模拟注册 FormStringHyperlinksFieldWidget 组件
registerCustomBody(
  {
    viewType: ViewType.Form,
    ttype: ModelFieldType.String,
    widget: 'Hyperlinks'
  },
  'FormStringHyperlinksFieldWidget'
);

// 模拟获取 FormStringHyperlinksFieldWidget 组件
console.log(
  selectorCustomBody({
    viewType: ViewType.Form,
    ttype: ModelFieldType.String,
    widget: 'Hyperlinks'
  })
);

// 控制台输出
// FormStringHyperlinksFieldWidget

// 模拟获取所有相关组件
console.log(
  selectorsCustomBody({
    viewType: ViewType.Form,
    ttype: ModelFieldType.String,
    widget: 'Hyperlinks'
  })
);

// 控制台输出
// ['FormStringHyperlinksFieldWidget', 'FormStringInputFieldWidget']
```

