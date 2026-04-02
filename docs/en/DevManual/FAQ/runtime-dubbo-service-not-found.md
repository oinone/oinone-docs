---
title: Runtime:Dubbo Service Not Found
index: true
category:
  - FAQs (Frequently Asked Questions)
order: 12
---
# I. Error Caused by Accessing Unrelated Modules
## \(Ⅰ\) Error Message
In a newly deployed service system where the OA module is not enabled, there is a requirement to invoke OA services. What could be the reason behind this?

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/FAQ/1747642587890-2bebe93d-89ad-4965-965f-c70d382e4413.png)

## \(Ⅱ\) Solution
By examining the error stack trace, it is clear that the system invoked the `DefaultHookApi` service during runtime. Analysis reveals that this issue arises because the base library of the newly deployed project is shared with that of the OA project. Consequently, an OA-related hook was registered. To resolve this, simply delete the OA-related hook records from the `base_hook` table and restart the project.

# II. Startup Error: Dubbo Remote Invocation Cannot Find Service
## \(Ⅰ\) Error Message
``` dart
Caused by: org.apache.dubbo.rpc.RpcException: No provider available from registry 183.224.180.166:32182 for service pamirs/eip.oio.5000:1.0.0 on consumer 172.17.0.1 use dubbo version 2.7.22, please check status of providers(disabled, not registered or in blacklist).
    at org.apache.dubbo.registry.integration.DynamicDirectory.doList(DynamicDirectory.java:177) ~[dubbo-2.7.22.jar!/:2.7.22]
    at org.apache.dubbo.rpc.cluster.directory.AbstractDirectory.list(AbstractDirectory.java:99) ~[dubbo-2.7.22.jar!/:2.7.22]
```

## \(Ⅱ\) Solution
The error message indicates that the pamirs/eip service cannot be found. Therefore, check if the startup package includes a dependency on the eip package. Additionally, add `–eip` to the startup module configuration.

``` xml
<dependency>
  <groupId>pro.shushi.pamirs.core</groupId>
  <artifactId>pamirs-eip2-api</artifactId>
</dependency>
```

# III. Error: "not registered or in blacklist"
## \(Ⅰ\) Error Message
``` dart
Exception while fetching data(/manageEmployeeBaseQuery/queryPage) :
Noprovider available from registry 127.0.0.1:2181 for service
pamirs/AkdsjManage_core.oi0.5000:1.0.0 onconsumer 172.17.0.3 use dubbo version 2.7.22,
please check status of providers(disabled, not registered or in blacklist).
```

## \(Ⅱ\) Solution
**Error Symptom**: The consumer cannot resolve the service provider's interface.

1. Verify that both the consumer and provider use the same ZooKeeper instance.
2. Ensure network connectivity between the consumer and provider.
3. Confirm that the relevant services are registered with Dubbo.