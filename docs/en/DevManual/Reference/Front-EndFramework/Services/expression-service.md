---
title: Expression Service
index: true
category:
  - DevManual
  - Reference
  - Front-EndFramework
  - Services
order: 10

---
In Oinone Kunlun, many component properties support "expression" configuration. This article will introduce detailed content related to "expressions".

# Ⅰ. Overview

You can use `Expression.run` anywhere to execute an expression and get its calculation result. The specific function signature is as follows:

```typescript
export interface ExpressionRunParam {
  activeRecords: Record<string, unknown>[];
  rootRecord: Record<string, unknown>;
  openerRecord: Record<string, unknown>;
  scene: string | null;
  activeRecord?: Record<string, unknown> | null;
  parentRecord?: Record<string, unknown> | null;
}

export class Expression {
  public static run<T>(param: ExpressionRunParam, expression: string, errorValue?: T): T | string | undefined;
}
```

`ExpressionRunParam` is the built-in context parameter provided when the expression is executed. The specific meanings are as follows:

+ activeRecords: Currently activated data source.
+ rootRecord: Root data source.
+ openerRecord: Form data source used in the pop-up window. (For example, when opening a pop-up window, the form data can be obtained in the pop-up window)
+ scene: Scene `Key`. Usually the `ViewAction#name` attribute corresponding to the current page.
+ activeRecord: The first object of the currently activated data source.
+ parentRecord: Parent data source.

# Ⅱ. Using Expressions in Widget Components

Normally, when using the expression service, we do not directly call it in the component, but encapsulate it twice according to the actual usage scenario of the current component. The passing of context parameters will be uniformly managed by this method. Take the built-in `executeExpression` method in `ActionWidget` as an example:

```typescript
public executeExpression<T>(expression: string, errorValue?: T): T | string | undefined {
  const activeRecords = this.activeRecords || [];
  const scene = this.scene;
  return Expression.run(
    {
      activeRecords,
      rootRecord: this.rootData?.[0] || {},
      openerRecord: this.openerActiveRecords?.[0] || {},
      scene,
      activeRecord: activeRecords[0] || {},
      parentRecord: this.parentViewActiveRecords?.[0] || []
    } as ExpressionRunParam,
    expression,
    errorValue
  );
}
```

When we use expressions, we only need to pass the expression:

```typescript
@Widget.Reactive()
public get disabled() {
  const dslDisabled = this.getDsl().disabled;
  if (isNil(dslDisabled)) {
    return false;
  }
  const disabled = BooleanHelper.toBoolean(dslDisabled);
  if (disabled != null) {
    return disabled;
  }
  return this.executeExpression(dslDisabled, false);
}
```

+ Get the `disabled` attribute from `DSL`.
+ When not configured, the default is `false`.
+ When configured as a `Boolean` type, the corresponding value is directly returned.
+ For other types, calculate according to the expression; if an exception occurs in the expression calculation, the default is `false`.

:::warning Note:

The data type of all attributes obtained in DSL is: `string | number | boolean | undefined`

In this example, the `Number` type can have the meaning of `Boolean` in `JavaScript`, so there is no need to process it.

:::

# Ⅲ. Expression Syntax

## (Ⅰ) Object Property Access

In an expression, you can use "." to access object data level by level. For example:

```typescript
activeRecord.partner.name
```

When the expression is passed an object with such a structure, the value of "name" can be obtained normally after the expression is executed:

```json
{
    "acitveRecord": {
        "partner": {
            "name": "Name"
        }
    }
}
```

## (Ⅱ) Array Property Access

In an expression, use the `LIST_GET` function to get an object according to the array index and continue to get values from the object. For example:

```typescript
LIST_GET(activeRecords, 0).partner.name
```

When the expression is passed an object with such a structure, the value of "name" can be obtained normally after the expression is executed:

```json
{
    "acitveRecords": [
        {
            "partner": {
                "name": "Name"
            }
        }
    ]
}
```

:::warning Note:

For more content about built-in functions, please refer to: [Function API](/en/DevManual/Reference/Back-EndFramework/functions-API.md#b2e5fbb6)

:::

## (Ⅲ) Use of Literals

In an expression, you can use the "+" operator to represent string concatenation, which has exactly the same function as the built-in function JOIN:

```typescript
// Use the "+" operator to concatenate strings
activeRecord.name + "_demo"

// Use the JOIN function to concatenate strings
JOIN(activeRecord.name, "_demo")
```

**Side Effects of the "+" Operator**

Since the "+" operator has two semantics: `numeric addition calculation` and `string concatenation`, we cannot accurately identify the numeric type through the `JavaScript` type (sometimes numbers are stored as strings). Therefore, when the expression calculation finds that both the left and right sides of the "+" operator are numbers, `addition calculation` will be performed:

```typescript
// Recognized as numeric addition calculation, the result is: 3
"1" + "2"
```

In this case, when you need to use the function of concatenating strings accurately, you can use the JOIN function to concatenate:

```typescript
// Use the JOIN function to concatenate strings, the result is: "12"
JOIN("1", "2")
```