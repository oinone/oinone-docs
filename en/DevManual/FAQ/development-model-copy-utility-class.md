---
title: Under Development:Model Copy Tool Class
index: true
category:
  - Frequently Asked Questions (faq)
order: 6
---
# Ⅰ、Copy Tool Class
```java
KryoUtils.get().copy(modelData);

ArgUtils.convert(DataReport.MODEL_MODEL, DataDesignerReport.MODEL_MODEL, report);

pro.shushi.pamirs.framework.common.utils.ObjectUtils#clone(T)
```

Q: How to solve the shallow copy problem caused by values existing in _d objects when using `BeanUtils.copyProperties` for attribute copying?

A: When using `BeanUtils.copyProperties` for attribute copying, if values exist in _d objects, it belongs to shallow copy, resulting in unsuccessful copying.

It is recommended to use `BeanUtils.copyProperties(source, target, "name");` when copying models to prevent remote call exceptions for fields that do not exist in the target model.