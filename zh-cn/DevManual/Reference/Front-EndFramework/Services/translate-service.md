---
title: Translate Service
index: true
category:
  - 研发手册
  - Reference
  - 前端API
  - Services
order: 11
next:
  text: 用户与商业主体 API（User & Business API）
  link: /zh-cn/DevManual/Reference/StandardModule/user-business-API.md
---
在 Oinone Kunlun 中，内置了 “翻译” 模块，其配合前端 “埋点” 翻译函数可以实现任何语言的翻译功能。这篇文章将介绍 “翻译” 函数的使用以及其实现细节。

:::warning 提示：

本章内容不涉及 “翻译” 模块的具体操作和使用，仅介绍前端翻译功能和实现细节。需要了解 “翻译” 模块相关操作的内容请参考：[用户手册 - 翻译](/zh-cn/UserManual/StandardModules/translation.md)

:::

# 一、在 Widget 组件中使用翻译函数

在声明一些用户输入的属性时，我们可以通过 `translateValueByKey` 方法处理对应的内容，这样就可以将指定内容翻译为其他语言了。如下所示：

```typescript
@Widget.Reactive()
public get title(): string {
  return translateValueByKey((this.getDsl().title as string) || '标题');
}
```

:::warning 提示：

在使用翻译函数时，需要在 `VueOioProvider` 加载语言结束后才可以正常使用。因此我们不能在定义全局变量时使用翻译函数，而是在组件内通过初始化或响应式属性使用翻译函数。

:::

# 二、在 Vue Template 中使用翻译函数

为了更方便的在 `Vue Template` 中使用翻译函数，我们注册了全局的 `$translate` 方法，其内部实现与 `translateValueByKey` 方法完全一样。如下所示：

```typescript
<span>{{ $translate(title) }}</span>
```

**解决 TypeScript 类型声明问题**

对于自定义的全局方法，要想在 `Vue Template` 中正常使用而不引起 `TypeScript` 类型检查报错，我们还需要在 `src` 目录下新增类型声明文件 `shim-transalte.d.ts` ，以此来解决 `TypeScript` 类型声明问题。

```typescript
export {};

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $translate<T extends string | null | undefined = string | null | undefined>(text: T): T;
  }
}
```

:::warning 提示：

虽然两种方式可以实现完全相同的功能，但我们更倾向于推荐在 Vue Template 中使用翻译函数，这样翻译功能就不会因为 Widget 组件的继承重写导致翻译失效了。

但这只是推荐用法，如果涉及到不同业务逻辑的翻译功能，还需结合实际情况决定在哪里使用翻译函数。

:::

# 三、变量处理

如果在需要翻译的文本中包含了变量该如何处理呢？下面我们提供了一些实现方法，读者可根据受众用户的使用习惯使用最合适的变量处理方法。

## （一）简易变量替换

通过 “{}” 占位符按顺序进行替换，如下所示：

```typescript
export function translateFormat(text: string, ...args: string[]): string {
  for (const arg of args) {
    text = text.replace('{}', arg);
  }
  return text;
}
```

**使用示例**

```typescript
const errorMessage = '导入失败，{} 不允许为空';
console.log(translateFormat(translateValueByKey(errorMessage), translateValueByKey('名称')));

// 控制台输出中文
// 导入失败，名称 不允许为空

// 控制台输出英文
// Import Failed, The name cannot be empty.
```

在这个示例中，我们只需要添加两个翻译项即可：

| **原值**                | **目标值**                             |
| ----------------------- | -------------------------------------- |
| 导入失败，{} 不允许为空 | Import Failed, The {} cannot be empty. |
| 名称                    | name                                   |


## （二）函数式替换

使用变量名称进行全局替换，如下所示：

```typescript
export interface TranslateVariable {
  [key: string]: string | (() => string);
}

export function translateFormat(text: string, args?: TranslateVariable): string {
  if (args) {
    return text.replace(/\$(\w+)/g, (_, varName) => {
      const val = args[varName];
      if (val instanceof Function) {
        return val() || _;
      }
      return val || _;
    });
  }
  return text;
}
```

**使用示例**

```typescript
const errorMessage = '导入失败，$field 不允许为空';
console.log(
  translateFormat(translateValueByKey(errorMessage), {
    field: translateValueByKey('名称')
  })
);

// 控制台输出中文
// 导入失败，名称 不允许为空

// 控制台输出英文
// Import Failed, The name cannot be empty.
```

在这个示例中，我们只需要添加两个翻译项即可：

| **原值**                    | **目标值**                                 |
| --------------------------- | ------------------------------------------ |
| 导入失败，$field 不允许为空 | Import Failed, The $field cannot be empty. |
| 名称                        | name                                       |


## （三）使用第三方库 mustache.js 实现模版替换

**安装第三方库依赖**

```typescript
npm install mustache@4.2.0
```

使用 `mustache` 进行模板替换，如下所示：

```typescript
export function translateFormat(text: string, args?: Record<string, any>): string {
  if (args) {
    return mustache.render(text, args);
  }
  return text;
}
```

**使用示例**

```typescript
const errorMessage = '导入失败，{{field}} 不允许为空';
console.log(
  translateFormat(translateValueByKey(errorMessage), {
    field: translateValueByKey('名称')
  })
);

// 控制台输出中文
// 导入失败，名称 不允许为空

// 控制台输出英文
// Import Failed, The name cannot be empty.
```

在这个示例中，我们只需要添加两个翻译项即可：

| **原值**                       | **目标值**                                    |
| ------------------------------ | --------------------------------------------- |
| 导入失败，{{field}} 不允许为空 | Import Failed, The {{field}} cannot be empty. |
| 名称                           | name                                          |


:::warning 提示：

更多关于 mustache 的内容请参考：[mustache.js](https://github.com/janl/mustache.js)

:::

# 四、获取翻译文件地址格式

在 “翻译” 模块通过 “刷新远程资源” 动作会将翻译文件保存在文件系统中。前端将根据模块名称在初始化系统时获取远程翻译资源文件，并将其保存在缓存中。下面是翻译文件地址格式：

```typescript
`${runtimeConfig.I18N_OSS_URL || process.env.I18N_OSS_URL || ''}/translate/${moduleName}/i18n_${langCode}.js`
```

+ runtimeConfig.I18N_OSS_URL：通过运行时配置 `I18N_OSS_URL` 配置地址前缀。
+ process.env.I18N_OSS_URL：通过编译时配置 `I18N_OSS_URL` 配置地址前缀。
+ moduleName：模块名称，登录页使用 `common` 作为模块名称，即全局翻译项。
+ langCode：ISO 语言编码。

:::warning 提示：

若出现未翻译或翻译错误的场景，一般可通过翻译文件地址来确定配置是否正确。

可优先检查模块名称和ISO语言编码是否与当前页面匹配进行排查。

:::

