---
title: Expression Service
index: true
category:
  - 研发手册
  - Reference
  - 前端API
  - Services
order: 10

---
在 Oinone Kunlun 中，由很多组件的属性都支持 “表达式” 配置，这篇文章将介绍 “表达式” 相关的详细内容。

# 一、概述

你可以在任何地方使用 `Expression.run` 执行一段表达式，并获得其计算结果。具体的函数签名如下：

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

`ExpressionRunParam` 是表达式在执行时提供的内置上下文参数，具体含义如下：

+ activeRecords：当前激活数据源。
+ rootRecord：根数据源。
+ openerRecord：弹窗中使用的表单数据源。（如打开弹窗时，在弹窗中可获得表单数据）
+ scene：场景 `Key` 。通常为当前页面对应的 `ViewAction#name` 属性。
+ activeRecord：当前激活数据源首个对象。
+ parentRecord：父数据源。

# 二、在 Widget 组件中使用表达式

通常我们在使用表达式服务时，并不会在组件中直接调用，而是根据当前组件实际使用的场景进行二次封装，上下文参数的传入将被该方法统一管理。以 `ActionWidget` 中内置的 `executeExpression` 方法为例：

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

在我们使用表达式时，只需要将表达式传入即可：

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

+ 从 `DSL` 中获取 `disabled` 属性。
+ 当未配置时，默认为 `false` 。
+ 当配置为 `Boolean` 类型时，则直接返回对应值。
+ 对于其他类型，则根据表达式进行计算；若表达式计算出现异常，默认为 `false` 。

:::warning 提示：

在 DSL 中获取的所有属性的数据类型为：`string | number | boolean | undefined`

对于这个例子中，`Number` 类型在 `JavaScript` 中可以有 `Boolean` 的含义，因此无需处理。

:::

# 三、表达式语法

## （一）对象属性获取

在表达式中，可以使用 “.” 分隔逐级获取对象数据。如：

```typescript
activeRecord.partner.name
```

当表达式传入这样结构的对象时，表达式执行后可正常获取 “名称” 这个值：

```json
{
    "acitveRecord": {
        "partner": {
            "name": "名称"
        }
    }
}
```

## （二）数组属性获取

在表达式中，使用 `LIST_GET` 函数根据数组索引获取对象并继续从对象中取值。如：

```typescript
LIST_GET(activeRecords, 0).partner.name
```

当表达式传入这样结构的对象时，表达式执行后可正常获取 “名称” 这个值：

```json
{
    "acitveRecords": [
        {
            "partner": {
                "name": "名称"
            }
        }
    ]
}
```

:::warning 提示：

更多 内置函数 的内容请参考：[函数 API](/zh-cn/DevManual/Reference/Back-EndFramework/functions-API.md#五、内置函数)

:::

## （三）字面量的使用

在表达式中，可以使用 “+” 运算符来表示字符串的拼接，这与内置函数 JOIN 的功能完全相同：

```typescript
// 使用 “+” 运算符拼接字符串
activeRecord.name + "_demo"

// 使用 JOIN 函数拼接字符串
JOIN(activeRecord.name, "_demo")
```

**“+” 操作符的副作用**

由于 “+” 操作符承载了 `数字加法计算` 和 `拼接字符串` 两种语义，我们无法通过 `JavaScript` 类型精准的识别数字类型（有时数字是通过字符串存储的），因此，当表达式计算时发现 “+” 操作符的左侧与右侧都是数字时，将会进行 `加法计算`：

```typescript
// 被识别为数字加法计算，结果为: 3
"1" + "2"
```

在这种情况下，需要准确的使用 拼接字符串 的功能时，可以使用 JOIN 函数进行拼接：

```typescript
// 使用 JOIN 函数拼接字符串，结果为: "12"
JOIN("1", "2")
```

