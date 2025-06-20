---
title: How to Configure Multi-value Fields and Field Default Values During Development
index: true
category:
  - FAQ (Frequently Asked Questions)
order: 4
---
# I. Multi-value Fields
Configure the field with `multi = true` and the field type as `List<>`.

```java
@Field.String
@Field(displayName ="Multi-value Field", multi = true)
private List<String> multivaluedField;
```

# II. Field Default Values
The `defaultValue` of a field can be a serialized value of a primitive type or a relationship type. For time types, you can use `format` to format time expressions or use long integers to set default values. For enumeration types, use the enumeration item value `value` to set the default value. If complex calculations are required, please use the `construct` constructor of the model for configuration.