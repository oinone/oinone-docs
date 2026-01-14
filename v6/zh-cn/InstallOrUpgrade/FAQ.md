---
title: 常见问题
index: true
category:
  - 安装与升级
order: 7
prev:
  text: Maven安装与注意事项
  link: /zh-cn/InstallOrUpgrade/Dev-ENV/Maven-setup.md
next:
  text: 用户手册
  link: /zh-cn/UserManual/README.md
---
# 一、网络不通：检查防火墙（以CentOS7为例）
## （一）查看防火墙是否开启
```shell
# 查看防火墙状态
systemctl status firewalld
```

## （二）如防火墙处于开启状态，有两种处理方式
### 1、停止防火墙
```shell
# 停止防火墙
systemctl stop firewalld
```

### 2、开放docker镜像内置中间件透出的端口
+ 88：web访问端口
+ 8099：后端Java服务端口
+ 19876：rocketmq的namesrv端口：
+ 6378：缓存redis的端口
+ 3307：数据库mysql的端口
+ 2182：zookeeper的端口
+ 20880：dubbo的通信端口
+ 15555：预留Java的debug端口
+ 10991：rocketmq的broker端口

:::tip 举例

**以增加88端口为例子，可执行以下命令。执行完成可以从外部使用telnet命令检查端口是否开放成功，如telnet 192.168.0.121 3307**

:::

```plain
# 防火墙新增开放端口示例：
firewall-cmd --permanent --zone=public --add-port=88/tcp
#新增以后生效需要重新加载防火墙
systemctl reload firewalld
#查看端口是否开放成功
firewall-cmd --list-ports
```



# 二、运行时报 InvalidKeyException: Illegal key size
## （一）原因
如果密钥大于128, 会抛出java.security.InvalidKeyException: Illegal key size 异常. 因为密钥长度是受限制的, java运行时环境读到的是受限的policy文件. 文件位于${java_home}/jre/lib/security, 这种限制是因为美国对软件出口的控制.

## （二）解决方案
java的基础运行环境, 要求高于1.8_221以上，低于这个版本需要覆盖jce。

### 1. 去官方下载JCE无限制权限策略文件。

<table>
  <tr>
    <td>JDK8的JCE无限制权限策略文件下载地址:</td>
    <td><a href="http://www.oracle.com/technetwork/java/javase/downloads/jce8-download-2133166.html">http://www.oracle.com/technetwork/java/javase/downloads/jce8-download-2133166.html</a></td>
  </tr>

</table>



### 2. 覆盖JRE或JDK文件
下载后解压可以看到local_policy.jar和US_export_policy.jar以及readme.txt
如果安装了JRE，将两个jar文件放到%JRE_HOME%\lib\security目录下覆盖原来的文件
如果安装了JDK，还要将两个jar文件也放到%JDK_HOME%\jre\lib\security目录下覆盖原来文件。

