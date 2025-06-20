---
title: Runtime:Export Task Stuck in "Processing" State
index: true
category:
- FAQs (Frequently Asked Questions)
order: 16
---
# I. Scenario Reproduction
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/1747645017593-f6f4aa80-42c4-49dc-b1cf-63808021591b.jpeg)

# II. Solution
Export tasks are executed asynchronously. If the `taskItems` configuration in the `schedule.json` file is set to `0`, only one machine will handle the task during execution. In this scenario, if the `rootPath` of `zk` (Zookeeper) is the same as in other environments, there is a risk that the task may be assigned to and executed by another environment.

When multiple different projects share the same Zookeeper instance, the Zookeeper root directories used by each project should not have parent-child relationships. Even for different instances of the same project (such as separately deployed test, development, and pre-production environments), they must use different root directories that do not have parent-child relationships. Therefore, in the `yml` file of the startup project, the following two configurations must differ from those of other environments or the designer:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/FAQ/1747645034191-eebf5d3b-be5d-4f16-9037-77ea860290ac.png)