---
title: RSQL Service
index: true
category:
  - DevManual
  - Reference
  - Front-EndFramework
  - Services
order: 6

---

The RSQL protocol is a standard protocol in Oinone that provides query conditions. Understanding and learning the syntax and usage of RSQL is very meaningful for learning Oinone.

# Ⅰ. RSQL Protocol

## (Ⅰ) What is RSQL?

`RSQL` is a **query language** that uses "**SQL-like syntax**" to represent **conditional expressions**. `RSQL` is not bound to any specific database or storage engine, but relies on your existing code and data.

For more reference materials:

+ [Oinone Gateway Protocol API](/en/DevManual/Reference/Back-EndFramework/AdvanceAPI/protocol-API.md#c3954c45)
+ [RSQL Parser (Backend)](https://github.com/jirutka/rsql-parser)
+ [RSQL Parser (Frontend)](https://github.com/piotr-oles/rsql)

:::warning Note

For information about RSQL logical operators and comparison operators, please refer to: [Oinone Gateway Protocol API](/en/DevManual/Reference/Back-EndFramework/AdvanceAPI/protocol-API.md#c3954c45)

:::

## (Ⅱ) Why Oinone Chooses RSQL?

+ Complete conditions: For standard data types, the built-in operators provided by RSQL are sufficient to meet the query needs of various business scenarios.
+ Extensible operators: For special binary types, Oinone has extended their operators to support query needs of more business scenarios.
+ No direct communication with any middleware: The conditional expressions supported by RSQL syntax will be converted into database query syntax supported by Oinone, ES query syntax, or even directly execute the corresponding expressions to output results during actual operation. The execution process of the expressions is controllable.

# Ⅱ. Usage of RSQL Tool Classes

## (Ⅰ) RSQLHelper

The `RSQL` expression is the conditional expression protocol used in Oinone Kunlun. The `RSQLHelper` tool class provides functions such as parsing, editing, and calculation of `RSQL`. The following are examples of common usages of the `RSQLHelper` tool class.

### 1. RSQL Parsing

```typescript
const root = RSQLHelper.parseRSQL("name =like= 'a'");
if (root) {
  console.log(RSQLHelper.toRSQL(root), root);
}

// Console output
// name =like= 'a' TreeNode structured data
```

### 2. RSQL Calculation

```typescript
console.log(
  RSQLHelper.computeRSQL("name =like= 'a'", {
    name: 'abc'
  })
);

// Console output
// true

console.log(
  RSQLHelper.computeRSQL("name =like= 'a'", {
    name: 'def'
  })
);

// Console output
// false
```

### 3. RSQL Appending

Cooperate with RSQLCondition to continue processing RSQL expression structured data.

```typescript
console.log(RSQLCondition.wrapper(RSQLHelper.parseRSQL("name =like= 'a'")).like('name', 'b').toString());

// Console output
// name =like= 'a' and name =like= 'b'
```

## (Ⅱ) Condition (Old Version)

When we need to construct an `RSQL` expression, we can use the `Condition` class for auxiliary construction. The following are examples of common usages of the `Condition` tool class.

### 1. Basic Usage

```typescript
console.log(new Condition('name').like('demo').toString());

// Console output
// name=like='demo'
```

### 2. Logical Operators

```typescript
console.log(new Condition('name').like('demo').or(new Condition('name').like('test')).toString());

// Console output
// (name=like='demo') or (name=like='test')
```

### 3. Numbers

```typescript
console.log(
  new Condition('count').greaterThanOrEqualTo(1).and(new Condition('count').lessThanOrEqualTo(100)).toString()
);

// Console output
// (count=ge=1) and (count=le=100)
```

### 4. Enums and Dates

```typescript
console.log(
  new Condition('status')
    .equal('INSTALLED')
    .and(new Condition('createDate').greaterThanOrEqualTo('2025-06-10 00:00:00'))
    .toString()
);

// Console output
// (status=='INSTALL') and (createDate=ge='2025-06-10 00:00:00')
```

:::warning Note

The specific format of the date and time needs to be passed according to the `value formatting string`. The mapping rules between the `value formatting string` and the `field business type` are as follows:

+ DATETIME: YYYY-MM-DD HH:mm:ss
+ DATE: YYYY-MM-DD
+ TIME: HH:mm:ss
+ YEAR: YYYY

:::

### 5. Multi - value Operators (in, out...)

```typescript
console.log(new Condition('status').in(['INSTALLED', 'UPGRADED']).toString());

// Console output
// status=in=(INSTALLED,UPGRADED)
```

## (Ⅲ) RSQLCondition (New Version)

In order to cooperate with the `RSQLHelper` for functions such as parsing, editing, and calculation of `RSQL` expressions, the `RSQLCondition` tool class will gradually replace all functions of the `Condition` tool class and add more user-friendly API operations.

### 1. Basic Usage

```typescript
console.log(RSQLCondition.wrapper().like('name', 'demo').toString());

// Console output
// name =like= 'demo'
```

### 2. Logical Operators

```typescript
console.log(RSQLCondition.wrapper().like('name', 'demo').or().like('name', 'test').toString());

// Console output
// name =like= 'demo' or name =like= 'test'

console.log(
  RSQLCondition.wrapper()
    .like('name', 'demo')
    .like('name', 'test')
    .or((condition) => condition.starts('code', 'demo_').ends('code', '_test'))
    .eq('status', 'INSTALLED')
    .toString()
);

// Console output
// ((name =like= 'demo' and name =like= 'test') or (code =starts= 'demo_' and code =ends= '_test')) and status == 'INSTALLED'
```

:::warning Note

Compared with the Condition tool class, RSQLCondition provides more user-friendly API operations for sub - expressions.

:::

### 3. Numbers

```typescript
console.log(RSQLCondition.wrapper().ge('count', 1).le('count', 100).toString());

// Console output
// count =ge= 1 and count =le= 100
```

:::warning Note

Different from the `Condition` tool class, the logical operator `and` will be automatically spliced when the operator methods are called continuously.

:::

### 4. Enums and Dates

```typescript
console.log(RSQLCondition.wrapper().eq('status', 'INSTALLED').ge('createDate', '2025-06-10 00:00:00').toString());

// Console output
// status == 'INSTALLED' and createDate =ge= '2025-06-10 00:00:00'
```

### 5. Multi - value Operators (in, out...)

```typescript
console.log(RSQLCondition.wrapper().in('status', ['INSTALLED', 'UPGRADED']).toString());

// Console output
// status =in= ('INSTALLED', 'UPGRADED')
```