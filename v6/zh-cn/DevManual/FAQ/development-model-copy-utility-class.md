---
title: 开发中：模型拷贝工具类
index: true
category:
  - 常见问题（faq）
order: 6
---
# 一、拷贝工具类
```java
KryoUtils.get().copy(modelData);

ArgUtils.convert(DataReport.MODEL_MODEL, DataDesignerReport.MODEL_MODEL, report);

pro.shushi.pamirs.framework.common.utils.ObjectUtils#clone(T)
```

问：如何解决使用`BeanUtils.copyProperties`进行属性拷贝时，由于值在_d对象导致的浅拷贝问题？

答：`BeanUtils.copyProperties`拷贝属性问题，值在_d对象，属于浅拷贝，导致拷贝不成功

建议使用`BeanUtils.copyProperties(source, target, "name");`在拷贝模型时把目标模型不存在的字段防止远程调用异常。




