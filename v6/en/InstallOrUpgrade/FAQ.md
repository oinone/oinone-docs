---
title: FAQ
index: true
category:
  - Installation and Upgrade
order: 7
prev:
  text: Maven Installation and Precautions
  link: /en/InstallOrUpgrade/Dev-ENV/Maven-setup.md
next:
  text: User Manual
  link: /en/UserManual/README.md
---
# I. Network Unreachable: Check Firewall (Take CentOS7 as an Example)
## (I) Check if the Firewall is Enabled
```shell
# Check firewall status
systemctl status firewalld
```

## (II) If the Firewall is Enabled, There are Two Handling Methods
### 1. Stop the Firewall
```shell
# Stop the firewall
systemctl stop firewalld
```

### 2. Open Ports Exposed by Middleware Built in the Docker Image
+ 88: Web access port
+ 8099: Backend Java service port
+ 19876: RocketMQ namesrv port
+ 6378: Cache Redis port
+ 3307: Database MySQL port
+ 2182: Zookeeper port
+ 20880: Dubbo communication port
+ 15555: Reserved Java debug port
+ 10991: RocketMQ broker port

:::tip Example

**Take adding port 88 as an example, you can execute the following command. After execution, you can use the telnet command from the outside to check if the port is successfully opened, such as telnet 192.168.0.121 3307**

:::

```plain
# Example of adding an open port in the firewall:
firewall-cmd --permanent --zone=public --add-port=88/tcp
# After adding, the firewall needs to be reloaded to take effect
systemctl reload firewalld
# Check if the port is successfully opened
firewall-cmd --list-ports
```



# II. InvalidKeyException: Illegal key size During Runtime
## (I) Cause
If the key is larger than 128, a java.security.InvalidKeyException: Illegal key size exception will be thrown. This is because the key length is restricted, and the Java runtime environment reads a restricted policy file located in ${java_home}/jre/lib/security. This restriction is due to U.S. export controls on software.

## (II) Solution
The basic Java runtime environment requires a version higher than 1.8_221. For versions lower than this, the JCE needs to be overwritten.

### 1. Download the JCE Unlimited Permission Policy File from the Official Website.

<table>
  <tr>
    <td>JDK8 JCE Unlimited Permission Policy File Download Address</td>
    <td><a href="http://www.oracle.com/technetwork/java/javase/downloads/jce8-download-2133166.html">http://www.oracle.com/technetwork/java/javase/downloads/jce8-download-2133166.html</a></td>
  </tr>

</table>

### 2. Overwrite JRE or JDK Files
After downloading and unzipping, you can see local_policy.jar and US_export_policy.jar as well as readme.txt.
- If JRE is installed, place the two jar files in the %JRE_HOME%\lib\security directory to overwrite the original files.
- If JDK is installed, also place the two jar files in the %JDK_HOME%\jre\lib\security directory to overwrite the original files.