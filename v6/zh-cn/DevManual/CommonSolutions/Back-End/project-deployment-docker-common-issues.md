---
title: 项目部署：Docker部署常见问题
index: true
category:
  - 常见解决方案
order: 75
---

# 一、容器启动异常：
容器启动出现`library initialization failed - unable to allocate file descriptor table - out of memory`异常如何处理？

## （一）原因
不同操作系统安装 Docker 后，容器运行环境并不一致，需要对 Docker 运行参数进行调整。

## （二）解决方案
+ 编辑`/etc/systemd/system/docker.service`文件， 有些系统该文件位置：`/lib/systemd/system/docker.service`

查看 docker 的 systemd（docker.service）配置位置

```shell
systemctl status docker
```

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/2025032602015086-1024x237-20250530144825593.jpg)

查看 docker 的 systemd 配置位置

+ 将下列参数进行修改

```xml
LimitNOFILE=65535
LimitNPROC=65535
LimitCORE=65535
```

+ 执行以下脚本

```shell
systemctl daemon-reload
systemctl restart docker
```

# 二、容器启动异常二：
容器启动出现`library initialization failed - unable to allocate file descriptor table - out of memorypanic: signal: aborted (core dumped)`异常如何处理？

## （一）问题现象
1、 按照【问题1】的设置进行配置后，仍然不生效；

2、 尝试修改宿主机系统内核的 ulimits，重启 docker 仍报错。修改 docker.service（文件位置：`/etc/systemd/system/docker.service`文件， 有些系统该文件位置：`/lib/systemd/system/docker.service`）

## （二）解决方案
查看 docker 的 systemd（docker.service）配置位置【问题1】中的办法

在 ExecStart 命令后加上创建容器的默认 ulimit 配置，如下，设置容器启动时的 ulimit 为65535:65535

```plain
--default-ulimit nofile=65535:65535
```

配置好后：

```plain
ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock --default-ulimit nofile=65535:65535
```

执行以下脚本

```shell
systemctl daemon-reload
systemctl restart docker
```

资料参考：[https://blog.csdn.net/weixin_42241322/article/details/137122868](https://blog.csdn.net/weixin_42241322/article/details/137122868)

# 三、拉取设计器镜像报错：
报错信息，拉取镜像 harbor.oinone.top 连不上。

```plain
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

排查过程：
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/Snipaste_2024-11-14_10-10-46-20250530144822471.jpg)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/Snipaste_2025-03-11_18-49-23-20250530144827227.jpg)

排除到后面发现原因是 DNS 配置的问题，换了一个阿里云的 IP 就可以了

