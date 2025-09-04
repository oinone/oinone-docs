---
title: Startup:Scheduling Server Unassigned Task Queue Keeps Logging Continuously
index: true
category:
  - FAQs (Frequently Asked Questions)
order: 3
---
# I. Scenario Description
After startup, continuous logging occurs as shown below:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/FAQ/1748078917111-adf2f53b-1e40-4340-8992-9bf62cbd2e30.png)

# II. Solutions
The root cause of this issue lies in the fact that within the same ZooKeeper (zk) environment, two machines use identical paths, and the `schedule`'s `ownsign` is also completely the same. This situation leads to one of the task queues being unable to be scheduled at all. The solution to this problem is to modify the `ownsign` of the `schedule` to different values.

The specific operation is to modify `pamirs.event.schedule.ownSign` in the `yml` file and assign it a value of "xxx" (where "xxx" represents a customized different identifier).

It should be noted that the reason why the `rootpath` of `zk` cannot be modified is that the platform relies on distributed services. If the `rootpath` of `zk` is configured with different paths in the same environment, it will cause abnormalities in the distributed services, affecting the normal operation of the platform.