---
title: How to Obtain Current Logged-in User Information During Development
index: true
category:
  - FAQ (Frequently Asked Questions)
order: 8
---

# I. Get User ID and User Name from Session
`PamirsSession.getUserId()`

`PamirsSession.getUserName()`


# II. If More User Information Is Needed, Query the Database
``` java
// With caching, passive expiration in 30 seconds (recommended)
PamirsUser user = UserInfoCache.queryUserById(PamirsSession.getUserId());
// Without caching, get from DB
PamirsUser dbUser = new PamirsUser().queryById(PamirsSession.getUserId());
```