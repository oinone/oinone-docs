---
title: Runtime:Unable to Select Models in Interface Designer
index: true
category:
- FAQs (Frequently Asked Questions)
order: 19
---
# I. Scenario Reproduction
![](http://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/FAQ/1748058278545-4e74dfd9-2a2e-4758-b6e5-8236404ca11e.png)

# II. Solutions
1. **Module Dependency Check**  
   If the target model belongs to a different module, add a dependency to that module in your current project configuration.

2. **`@Base` Annotation Filtering**  
   Models annotated with `@Base` are excluded from the interface designer's selection by default. Remove this annotation if the model needs to be selectable.

3. **Collaborative Development Workaround**  
   When working in a collaborative development environment, use the **model code** (not the display name) to search for and select models.