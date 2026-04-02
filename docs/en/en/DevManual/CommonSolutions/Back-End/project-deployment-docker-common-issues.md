---
title: Project Deployment:Common Issues in Docker Deployment
index: true
category:
  - Common Solutions
order: 75
---

# I. Container Startup Exception:
How to handle the exception `library initialization failed - unable to allocate file descriptor table - out of memory` during container startup?

## (I) Cause
After installing Docker on different operating systems, the container runtime environments are inconsistent, requiring adjustments to Docker runtime parameters.

## (II) Solution
+ Edit the `/etc/systemd/system/docker.service` file. In some systems, the file is located at `/lib/systemd/system/docker.service`.

View the location of Docker's systemd (docker.service) configuration:
``` shell
systemctl status docker
```

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/2025032602015086-1024x237-20250530144825593.jpg)

+ Modify the following parameters:
``` xml
LimitNOFILE=65535
LimitNPROC=65535
LimitCORE=65535
```

+ Execute the following scripts:
``` shell
systemctl daemon-reload
systemctl restart docker
```

# II. Container Startup Exception II:
How to handle the exception `library initialization failed - unable to allocate file descriptor table - out of memorypanic: signal: aborted (core dumped)` during container startup?

## (I) Problem Symptoms
1. The configuration based on [Issue 1] still does not take effect.
2. Attempts to modify the ulimits of the host system kernel and restart Docker still result in errors. Modify docker.service (file location: `/etc/systemd/system/docker.service` or `/lib/systemd/system/docker.service` in some systems).

## (II) Solution
View the location of Docker's systemd (docker.service) configuration using the method in [Issue 1].

Add the default ulimit configuration for container creation after the ExecStart command, as follows, setting the container's ulimit to 65535:65535 when starting:
``` plain
--default-ulimit nofile=65535:65535
```

After configuration:
``` plain
ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock --default-ulimit nofile=65535:65535
```

Execute the following scripts:
``` shell
systemctl daemon-reload
systemctl restart docker
```

Reference: [https://blog.csdn.net/weixin_42241322/article/details/137122868](https://blog.csdn.net/weixin_42241322/article/details/137122868)

# III. Error Pulling Designer Image:
Error message: Failed to connect to the image harbor.oinone.top.

``` plain
docker login --username=schhsw_oinone harbor.oinone.top

i Info → A Personal Access Token (PAT) can be used instead.
          To create a PAT, visit https://app.docker.com/settings


Password:
time="2025-02-27T11:24:58+08:00" level=info msg="Error logging in to endpoint, trying next endpoint" error="Get \"https://harbor.oinone.top/v2/\": dial tcp 0.0.0.0:443: connect: connection refused"
Get "https://harbor.oinone.top/v2/": dial tcp 0.0.0.0:443: connect: connection refused
kfpt@kfpt-virtual-machine:~$ sudo  -i
root@kfpt-virtual-machine:~# docker login --username=schhsw_oinone harbor.oinone.top

i Info → A Personal Access Token (PAT) can be used instead.
          To create a PAT, visit https://app.docker.com/settings


Password:
Error response from daemon: Get "https://harbor.oinone.top/v2/": dial tcp 0.0.0.0:443: connect: connection refused
```

Troubleshooting process:
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/Snipaste_2024-11-14_10-10-46-20250530144822471.jpg)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/Snipaste_2025-03-11_18-49-23-20250530144827227.jpg)

After troubleshooting, the cause was found to be a DNS configuration issue. Changing to an Alibaba Cloud IP resolved the problem.