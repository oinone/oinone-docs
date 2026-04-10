---
title: RSQL Service
index: true
category:
  - 研发手册
  - Reference
  - 前端API
  - Services
order: 6

---

RSQL 协议是 Oinone 中负责提供查询条件的标准协议，理解并学习 RSQL 的语法以及使用方法对学习 Oinone 是非常有意义的。

# 一、RSQL 协议

## （一）什么是 RSQL？

`RSQL` 是一种使用 “**类 SQL 语法**” 表示**条件表达式**的**查询语言**。`RSQL` 并没有和任何特定数据库或者存储引擎绑定，而是依靠你现有的代码和数据支撑。

更多参考资料：

+ [Oinone 网关协议 API](/zh/DevManual/Reference/Back-EndFramework/AdvanceAPI/protocol-API.md#da17c467)
+ [RSQL Parser（后端）](https://github.com/jirutka/rsql-parser)
+ [RSQL Parser（前端）](https://github.com/piotr-oles/rsql)

:::warning 提示

关于 RSQL 逻辑运算符和比较运算符的相关内容请参考：[Oinone 网关协议 API](/zh/DevManual/Reference/Back-EndFramework/AdvanceAPI/protocol-API.md#da17c467)

:::

## （二）为什么 Oinone 选择 RSQL？

+ 条件完备：对于标准数据类型来说，RSQL 提供的内置操作符足以适应各种业务场景的查询需求。
+ 操作符可扩展：对于特殊的二进制类型，Oinone 对其进行了操作符扩展，用于支持更多业务场景的查询需求。
+ 不与任何中间件直接通信：RSQL 语法支持的条件表达式会在实际运行中转换为 Oinone 支持的数据库查询语法、ES查询语法甚至直接执行对应表达式输出结果。其表达式执行的过程是可控的。

# 二、RSQL 工具类的使用

## （一）RSQLHelper

`RSQL` 表达式是 Oinone Kunlun 中使用的条件表达式协议，`RSQLHelper` 工具类将提供 `RSQL` 的解析、编辑以及计算等功能。下面是 `RSQLHelper` 工具类的常见用法使用示例。

### 1、RSQL 解析

```typescript
const root = RSQLHelper.parseRSQL("name =like= 'a'");
if (root) {
  console.log(RSQLHelper.toRSQL(root), root);
}

// 控制台输出
// name =like= 'a' TreeNode 结构化数据
```

### 2、RSQL 计算

```typescript
console.log(
  RSQLHelper.computeRSQL("name =like= 'a'", {
    name: 'abc'
  })
);

// 控制台输出
// true

console.log(
  RSQLHelper.computeRSQL("name =like= 'a'", {
    name: 'def'
  })
);

// 控制台输出
// false
```

### 3、RSQL 追加

配合 RSQLCondition 可继续处理 RSQL 表达式结构化数据。

```typescript
console.log(RSQLCondition.wrapper(RSQLHelper.parseRSQL("name =like= 'a'")).like('name', 'b').toString());

// 控制台输出
// name =like= 'a' and name =like= 'b'
```

## （二）Condition（旧版）

当我们需要构建一个 `RSQL` 表达式时，可以使用 `Condition` 类进行辅助构造。下面是 `Condition` 工具类的常见用法使用示例。

### 1、基本用法

```typescript
console.log(new Condition('name').like('demo').toString());

// 控制台输出
// name=like='demo'
```

### 2、逻辑操作符

```typescript
console.log(new Condition('name').like('demo').or(new Condition('name').like('test')).toString());

// 控制台输出
// (name=like='demo') or (name=like='test')
```

### 3、数字

```typescript
console.log(
  new Condition('count').greaterThanOrEuqalTo(1).and(new Condition('count').lessThanOrEqualTo(100)).toString()
);

// 控制台输出
// (count=ge=1) and (count=le=100)
```

### 4、枚举和日期

```typescript
console.log(
  new Condition('status')
    .equal('INSTALLED')
    .and(new Condition('createDate').greaterThanOrEuqalTo('2025-06-10 00:00:00'))
    .toString()
);

// 控制台输出
// (status=='INSTALL') and (createDate=ge='2025-06-10 00:00:00')
```

:::warning 提示

日期时间的具体格式需要按照 `值格式化字符串` 进行传递，`值格式化字符串` 与 `字段业务类型` 之间映射规则如下所示：

+ DATETIME：YYYY-MM-DD HH:mm:ss
+ DATE：YYYY-MM-DD
+ TIME：HH:mm:ss
+ YEAR：YYYY

:::

### 5、多值操作符（in, out...）

```typescript
console.log(new Condition('status').in(['INSTALLED', 'UPGRADED']).toString());

// 控制台输出
// status=in=(INSTALLED,UPGRADED)
```

## （三）RSQLCondition（新版）

为了配合 `RSQLHelper` 对于 `RSQL` 表达式的解析、编辑、计算等功能，`RSQLCondition` 工具类将逐步替换 `Condition` 工具类的所有功能，并新增了更加友好的 API 操作。

### 1、基本用法

```typescript
console.log(RSQLCondition.wrapper().like('name', 'demo').toString());

// 控制台输出
// name =like= 'demo'
```

### 2、逻辑操作符

```typescript
console.log(RSQLCondition.wrapper().like('name', 'demo').or().like('name', 'test').toString());

// 控制台输出
// name =like= 'demo' or name =like= 'test'

console.log(
  RSQLCondition.wrapper()
    .like('name', 'demo')
    .like('name', 'test')
    .or((condition) => condition.starts('code', 'demo_').ends('code', '_test'))
    .eq('status', 'INSTALLED')
    .toString()
);

// 控制台输出
// ((name =like= 'demo' and name =like= 'test') or (code =starts= 'demo_' and code =ends= '_test')) and status == 'INSTALLED'
```

:::warning 提示

相比于 Condition 工具类，RSQLCondition 对子表达式提供了更加友好的 API 操作。

:::

### 3、数字

```typescript
console.log(RSQLCondition.wrapper().ge('count', 1).le('count', 100).toString());

// 控制台输出
// count =ge= 1 and count =le= 100
```

:::warning 提示

与 `Condition` 工具类不同的是，逻辑操作符 `and` 将在运算操作符方法连续调用时自动进行拼接。

:::

### 4、枚举和日期

```typescript
console.log(RSQLCondition.wrapper().eq('status', 'INSTALLED').ge('createDate', '2025-06-10 00:00:00').toString());

// 控制台输出
// status == 'INSTALLED' and createDate =ge= '2025-06-10 00:00:00'
```

### 5、多值操作符（in, out...）

```typescript
console.log(RSQLCondition.wrapper().in('status', ['INSTALLED', 'UPGRADED']).toString());

// 控制台输出
// status =in= ('INSTALLED', 'UPGRADED')
```

