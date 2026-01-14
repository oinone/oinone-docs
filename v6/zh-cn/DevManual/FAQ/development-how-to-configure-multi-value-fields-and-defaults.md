---
title: 开发中：多值字段、字段默认值如何配置
index: true
category:
  - 常见问题（faq）
order: 5
---
# 一、多值字段
字段配置 `multi = true` 字段类型为 `List<>`

```java
@Field.String
@Field(displayName ="多值字段", multi = true)
private List<String> multivaluedFile;
```

# 二、字段默认值
字段默认值`defaultValue`可以是基本类型或者关系类型的序列化值。时间类型可以使用`format`来格式化时间表达式或者使用长整数来设置默认值。枚举类型使用枚举项值`value`来设置默认值。如果需要进行复杂的计算请使用模型的`construct`构造函数来配置解决。

