---
title: 开发中：获取当前登录用户信息
index: true
category:
  - 常见问题（faq）
order: 8
---
# 一、从session中获取用户ID和用户名
`PamirsSession.getUserId()`

`PamirsSession.getUserName()`

# 二、如果需要获取更多的用户信息，则需要查表
```java
// 带缓存，30秒被动失效（建议使用）
PamirsUser user = UserInfoCache.queryUserById(PamirsSession.getUserId());
// 不带缓存，从DB中获取
PamirsUser dbUser = new PamirsUser().queryById(PamirsSession.getUserId());
```

