---
title: Runtime:Context Parameters Configured but Values Not Passed to Redirected Page
index: true
category:
- FAQs (Frequently Asked Questions)
order: 21
next:
  text: Design Principles
  link: /en/DevManual/DesignPrinciple/README.md
---
# I. Scenario Reproduction
Context parameters are configured, but the redirected page fails to receive these values.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/FAQ/1748066709819-07086b4b-1bda-4012-affd-d5889f59a1a3.png)

# II. Solution
This occurs because the redirected page does not include the configured `name` field. Simply drag and drop this field onto the redirected page and set it to hidden.