---
title: 启动时：调度服务器未分配任务队列一直刷日志
index: true
category:
  - 常见问题（faq）
order: 3
---
# 一、场景描述
启动完成之后一直刷日志：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/FAQ/1748078917111-adf2f53b-1e40-4340-8992-9bf62cbd2e30.png)

# 二、解决方案
出现该问题的根源在于，同一 ZooKeeper（zk）环境下，两台机器采用了相同的路径，并且 `schedule` 的 `ownsign` 也完全一致。这种情况致使其中一个任务队列始终无法得到调度。解决此问题的方法是，将 `schedule` 的 `ownsign` 修改为不同的值。

具体操作方式为，在 `yml` 文件中，对 `pamirs.event.schedule.ownSign` 进行修改，赋值为 “xxx”（此处 “xxx” 代表自定义的不同标识）。

需要注意的是，之所以不能对 `zk` 的 `rootpath` 进行修改，是因为平台依赖分布式服务。若在同一环境中，将 `zk` 的 `rootpath` 配置为不同路径，会引发分布式服务出现异常状况，影响平台的正常运行。

