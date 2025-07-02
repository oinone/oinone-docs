---
title: Translate Service
index: true
category:
  - DevManual
  - Reference
  - Front-EndFramework
  - Services
order: 11
next:
  text: User & Business API
  link: /en/DevManual/Reference/StandardModule/user-business-API.md
---
In Oinone Kunlun, a "translation" module is built - in. Combined with the front - end "buried point" translation function, it can realize the translation function for any language. This article will introduce the use of the "translation" function and its implementation details.

:::warning Note:

This chapter does not involve the specific operations and usage of the "translation" module, but only introduces the front - end translation function and implementation details. For content related to the operation of the "translation" module, please refer to: [User Manual - Translation](/en/UserManual/StandardModules/translation.md)

:::

# Ⅰ. Using the Translation Function in Widget Components

When declaring some properties input by users, we can process the corresponding content through the `translateValueByKey` method, so that the specified content can be translated into other languages. As shown below:

```typescript
@Widget.Reactive()
public get title(): string {
  return translateValueByKey((this.getDsl().title as string) || 'Title');
}
```

:::warning Note:

When using the translation function, it can only be used normally after the `VueOioProvider` finishes loading the language. Therefore, we cannot use the translation function when defining global variables, but use it through initialization or reactive properties in the component.

:::

# Ⅱ. Using the Translation Function in Vue Template

To make it more convenient to use the translation function in `Vue Template`, we have registered a global `$translate` method, whose internal implementation is exactly the same as the `translateValueByKey` method. As shown below:

```typescript
<span>{{ $translate(title) }}</span>
```

**Solving TypeScript Type Declaration Issues**

For custom global methods, to be used normally in `Vue Template` without causing TypeScript type checking errors, we need to add a type declaration file `shim-translate.d.ts` in the `src` directory to solve the TypeScript type declaration problem.

```typescript
export {};

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $translate<T extends string | null | undefined = string | null | undefined>(text: T): T;
  }
}
```

:::warning Note:

Although the two methods can achieve exactly the same function, we prefer to recommend using the translation function in Vue Template. This way, the translation function will not fail due to the inheritance and rewriting of the Widget component.

But this is just a recommended usage. If it involves translation functions for different business logics, you need to decide where to use the translation function according to the actual situation.

:::

# Ⅲ. Variable Handling

What if the text to be translated contains variables? Here we provide some implementation methods, and readers can choose the most appropriate variable handling method according to the usage habits of the target users.

## (Ⅰ) Simple Variable Replacement

Replace in order through "{}" placeholders, as shown below:

```typescript
export function translateFormat(text: string, ...args: string[]): string {
  for (const arg of args) {
    text = text.replace('{}', arg);
  }
  return text;
}
```

**Usage Example**

```typescript
const errorMessage = 'Import failed, {} is not allowed to be empty';
console.log(translateFormat(translateValueByKey(errorMessage), translateValueByKey('Name')));

// Console output in Chinese
// 导入失败，名称 不允许为空

// Console output in English
// Import Failed, The name cannot be empty.
```

In this example, we only need to add two translation items:

| **Original Value**                | **Target Value**                             |
| --------------------------------- | -------------------------------------------- |
| 导入失败，{} 不允许为空           | Import Failed, The {} cannot be empty.       |
| 名称                              | name                                          |


## (Ⅱ) Functional Replacement

Use variable names for global replacement, as shown below:

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

**Usage Example**

```typescript
const errorMessage = 'Import failed, $field is not allowed to be empty';
console.log(
  translateFormat(translateValueByKey(errorMessage), {
    field: translateValueByKey('Name')
  })
);

// Console output in Chinese
// 导入失败，名称 不允许为空

// Console output in English
// Import Failed, The name cannot be empty.
```

In this example, we only need to add two translation items:

| **Original Value**                    | **Target Value**                                 |
| ------------------------------------- | ------------------------------------------------ |
| 导入失败，$field 不允许为空           | Import Failed, The $field cannot be empty.       |
| 名称                                  | name                                             |


## (Ⅲ) Using the Third - Party Library mustache.js for Template Replacement

**Install Third - Party Library Dependencies**

```typescript
npm install mustache@4.2.0
```

Use `mustache` for template replacement, as shown below:

```typescript
export function translateFormat(text: string, args?: Record<string, any>): string {
  if (args) {
    return mustache.render(text, args);
  }
  return text;
}
```

**Usage Example**

```typescript
const errorMessage = 'Import failed, {{field}} is not allowed to be empty';
console.log(
  translateFormat(translateValueByKey(errorMessage), {
    field: translateValueByKey('Name')
  })
);

// Console output in Chinese
// 导入失败，名称 不允许为空

// Console output in English
// Import Failed, The name cannot be empty.
```

In this example, we only need to add two translation items:

| **Original Value**                       | **Target Value**                                    |
| ---------------------------------------- | --------------------------------------------------- |
| 导入失败，{{field}} 不允许为空           | Import Failed, The {{field}} cannot be empty.       |
| 名称                                      | name                                                |


:::warning Note:

For more information about mustache, please refer to: [mustache.js](https://github.com/janl/mustache.js)

:::

# Ⅳ. Obtaining the Translation File Address Format

The "translation" module will save the translation files in the file system through the "refresh remote resources" action. The front - end will obtain the remote translation resource files during system initialization according to the module name and save them in the cache. The following is the translation file address format:

```typescript
`${runtimeConfig.I18N_OSS_URL || process.env.I18N_OSS_URL || ''}/translate/${moduleName}/i18n_${langCode}.js`
```

+ runtimeConfig.I18N_OSS_URL: Configure the address prefix through the runtime configuration `I18N_OSS_URL`.
+ process.env.I18N_OSS_URL: Configure the address prefix through the compile - time configuration `I18N_OSS_URL`.
+ moduleName: The module name. The login page uses `common` as the module name, that is, the global translation items.
+ langCode: ISO language code.

:::warning Note:

If there is a scenario where the translation is missing or incorrect, you can generally determine whether the configuration is correct through the translation file address.

You can first check whether the module name and ISO language code match the current page for troubleshooting.

:::