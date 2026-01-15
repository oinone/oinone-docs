---
title: JDK安装与注意事项
index: true
category:
  - 安装与升级
  - 环境准备
order: 1
prev:
  text: 环境准备
  link: /v6/zh-cn/InstallOrUpgrade/Dev-ENV/README.md
---
# 一、下载安装包
:::warning 提示

你可以选择使用 Oracle、OpenJDK 或其他 JDK 发行版，版本需为 1.8_221 或更高。推荐使用 Oracle 或 OpenJDK 发行版。
下载时请注意选择与当前设备 CPU 指令集架构（如 x64、arm64）相匹配的版本。

:::

Oracle JDK下载链接：

|  | 下载链接 |
| --- | --- |
| Linux | [https://www.oracle.com/java/technologies/downloads/#java8-linux](https://www.oracle.com/java/technologies/downloads/#java8-linux) |
| macOS | [https://www.oracle.com/java/technologies/downloads/#java8-mac](https://www.oracle.com/java/technologies/downloads/#java8-mac) |
| Windows | [https://www.oracle.com/java/technologies/downloads/#java8-windows](https://www.oracle.com/java/technologies/downloads/#java8-windows) |
| 历史版本 | [https://www.oracle.com/java/technologies/downloads/archive/](https://www.oracle.com/java/technologies/downloads/archive/) |


:::warning 提示

下载Oracle JDK可能需要验证Oracle帐号。

:::



:::info 注意

在配置环境变量时，脚本中的配置路径需替换为对应 Shell 的 profile 文件路径：

+ 对于 Zsh，请使用 `${HOME}/.zshrc`
+ 对于 Bash，请使用 `${HOME}/.bashrc`

:::

# 二、安装
## （一）macOS安装JDK
### 1、配置环境变量
dmg包全局安装目录: `/Library/Java/JavaVirtualMachines/jdk-1.8.jdk`

dmg包用户安装目录: `~/Library/Java/JavaVirtualMachines/jdk-1.8.jdk`

tar.gz解压安装: 自定义目录

 配置环境变量:

``` shell
cat >> 替换具体Shell配置文件 << EOF
export JAVA_HOME="/Library/Java/JavaVirtualMachines/jdk-1.8.jdk/Contents/Home"
export PATH=\$JAVA_HOME/bin:\$PATH
EOF
```

### 2、验证
``` shell
#验证Java安装
/usr/libexec/java_home -V
```

``` shell
#验证Java安装验证结果示例
1.8.0_451 (arm64) "Oracle Corporation" - "Java SE 8" /Library/Java/JavaVirtualMachines/jdk-1.8.jdk/Contents/Home
```

``` shell
#环境变量验证结果示例
java -version
```

``` shell
#验证环境变量
% java -version
java version "1.8.0_451"
Java(TM) SE Runtime Environment (build 1.8.0_451-b10)
Java HotSpot(TM) 64-Bit Server VM (build 25.451-b10, mixed mode)
```

## （二）Windows安装JDK
exe默认安装目录:  `C:\Program Files\Java\jdk-1.8\`

exe自定义安装目录: 自定义目录

zip解压安装:  自定义目录

### 1、配置环境变量
以下提供两种配置环境变量的方式：可视化界面配置和命令行配置。任选其中一种方式进行配置即可，无需同时使用。

#### 1.1 可视化界面方式设置用户级别环境变量
键盘触发 `Win + R`出现以下界面

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Preparing-the-development-environment/JDK/1.png)

输入以下代码之后点击`确定`

``` shell
#呼出环境变量配置界面
rundll32.exe sysdm.cpl,EditEnvironmentVariables
```

设置`JAVA_HOME`为`C:\Program Files\Java\jdk-1.8`

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Preparing-the-development-environment/JDK/image%20(2).png)

追加`Path` `;%JAVA_HOME%\bin`

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Preparing-the-development-environment/JDK/image%20(3).png)

#### 1.2 命令行方式设置用户级别环境变量
运行CMD或者Powershell或者Terminal

``` powershell
# 设置JAVA_HOME
# 设置JAVA_HOME为默认安装目录绝对路径或者自定义目录绝对路径
setx "JAVA_HOME" "C:\Program Files\Java\jdk-1.8"
```

``` powershell
# 追加PATH
setx "Path" "%Path%;%JAVA_HOME%\bin"
```

### 2、验证
打开命令行输入以下代码

``` shell
# 验证环境变量
java -version
```

``` shell
# 环境变量验证结果示例
java version "1.8.0_441"
Java(TM) SE Runtime Environment (build 1.8.0_441-b07)
Java HotSpot(TM) 64-Bit Server VM (build 25.441-b07, mixed mode)
```

输出类似以下代码即为成功安装JDK。

## （三）Linux安装JDK
在Linux环境下，Oracle提供了`rpm`与`tar.gz`两种形式安装包。

### 1、支持RPM（Red Hat Package Manager）包格式的Linux发行版安装
``` shell
# rpm包安装
rpm -ivh jdk-8u441-linux-aarch64.rpm # 具体文件名会有编码
```

### 2、tar.gz包格式安装
``` shell
# tar.gz包安装
tar zxvf jdk-8u441-linux-aarch64.tar.gz -C "目标安装目录"  # 具体文件名会有编码
```

### 3、配置环境变量
``` shell
# tar.gz包安装
cat >> 替换具体Shell配置文件 << EOF
export JAVA_HOME="JDK具体安装目录"
export PATH=\$JAVA_HOME/bin:\$PATH
EOF
```

### 4、验证

:::info 注意

在修改完环境变量配置后，需要重新打开一个终端会话，以使新的环境变量生效。

:::


打开命令行输入以下代码

``` shell
# 验证环境变量
java -version
```

``` shell
# 环境变量验证结果示例
java version "1.8.0_441"
Java(TM) SE Runtime Environment (build 1.8.0_441-b07)
Java HotSpot(TM) 64-Bit Server VM (build 25.441-b07, mixed mode)
```

输出类似以下代码即为成功安装JDK。







