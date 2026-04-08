---
title: How to Obtain the Requested Model During Development
index: true
category:
  - FAQ (Frequently Asked Questions)
order: 5
---

## I. Problem
Is there a ready-made method to obtain the requested model, module, and method name?

## II. Solution
1. **Obtain the module**:
   `PamirsSession.getServApp()`

2. **Obtain request information**:
   Request information includes the model, method name, etc.
   `PamirsSession.getRequestVariables().getRequestInfoMap()`