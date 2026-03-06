---
title: JDK安装与注意事项
index: true
category:
  - 安装与升级
  - 环境准备
order: 2

---
# 一、确认 JDK 版本

从 **v7.0** 开始，Oinone 全面支持 JDK 17，并将之前的版本限定在使用 JDK 8。

+ 当你使用最新版本的 Oinone 或 v7.0 以上的任意版本，应安装 JDK 17
+ 当你使用 v7.0 之前或更早的版本，应安装 JDK 8

# 二、下载安装包

:::warning 提示

你可以选择使用 Oracle、OpenJDK 或其他 JDK 发行版，版本需为 1.8_221 或更高。推荐使用 Oracle 或 OpenJDK 发行版。

下载时请注意选择与当前设备 CPU 指令集架构（如 x86_64、arm64）相匹配的版本。

:::

Oracle JDK 下载：

+ JDK 8 下载地址：[Java SE 8 (8u211 and later)](https://www.oracle.com/java/technologies/javase/javase8u211-later-archive-downloads.html)
+ JDK 17 下载地址：[Java SE 17 (17.0.13 and later)](https://www.oracle.com/java/technologies/javase/jdk17-0-13-later-archive-downloads.html)

:::warning 提示

下载 Oracle JDK 可能需要验证 Oracle 帐号。

:::

# 三、安装

:::info 注意

在配置环境变量时，脚本中的配置路径需替换为对应 Shell 的 profile 文件路径：

+ 对于 Zsh，请使用 `${HOME}/.zshrc`
+ 对于 Bash，请使用 `${HOME}/.bashrc`

:::

## （一）MacOS 安装 JDK

PS：JDK 17 和 JDK 8 安装步骤大致相同，只是目录名称不同。

### 1.DMG 安装

安装后的目录信息如下所示：

JDK 8：

+ dmg 包全局安装目录: `/Library/Java/JavaVirtualMachines/jdk-1.8.jdk`
+ dmg 包用户安装目录: `~/Library/Java/JavaVirtualMachines/jdk-1.8.jdk`

JDK 17：

+ dmg 包全局安装目录: `<font style="color:#000000;">/Library/Java/JavaVirtualMachines/jdk-17.jdk</font>`
+ dmg 包用户安装目录: `~/Library/Java/JavaVirtualMachines/<font style="color:#000000;">jdk-17.jdk</font>`

### 2.配置环境变量

```shell
# write properties to .zshrc
cat >> ~/.zshrc << EOF
export JAVA_HOME="/Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home"
export PATH=\$JAVA_HOME/bin:\$PATH
EOF

# refresh
source ~/.zshrc
```

### 3.验证

```shell
/usr/libexec/java_home -V

# --- output ---

Matching Java Virtual Machines (2):
    17.0.15 (arm64) "Oracle Corporation" - "Java SE 17.0.15" /Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home
    1.8.0_451 (arm64) "Oracle Corporation" - "Java SE 8" /Library/Java/JavaVirtualMachines/jdk-1.8.jdk/Contents/Home
```

```shell
java -version

# --- output ---

# jdk 8
java version "1.8.0_451"
Java(TM) SE Runtime Environment (build 1.8.0_451-b10)
Java HotSpot(TM) 64-Bit Server VM (build 25.451-b10, mixed mode)

# jdk 17
java version "17.0.15" 2025-04-15 LTS
Java(TM) SE Runtime Environment (build 17.0.15+9-LTS-241)
Java HotSpot(TM) 64-Bit Server VM (build 17.0.15+9-LTS-241, mixed mode, sharing)
```

## （二）Windows安装JDK

PS：JDK 17 和 JDK 8 安装步骤大致相同，只是目录名称不同。

exe默认安装目录:  `C:\Program Files\Java\jdk-1.8\`

exe自定义安装目录: 自定义目录

zip解压安装:  自定义目录

### 1.配置环境变量

以下提供两种配置环境变量的方式：可视化界面配置和命令行配置。任选其中一种方式进行配置即可，无需同时使用。

#### 1.1 可视化界面方式设置用户级别环境变量

键盘触发 `Win + R`出现以下界面



![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Preparing-the-development-environment/JDK/1745227034479-e62953c3-027b-457b-acdf-2534da06213b.png)

输入以下代码之后点击`确定`

```shell
rundll32.exe sysdm.cpl,EditEnvironmentVariables
```

设置`JAVA_HOME`为`C:\Program Files\Java\jdk-1.8`



![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Preparing-the-development-environment/JDK/1745227138527-3336aa57-4742-48dd-a8a1-f2c58427b592.png)

追加`Path` `;%JAVA_HOME%\bin`



![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Preparing-the-development-environment/JDK/1745227232611-bdf7dabf-9fb2-4606-b92c-a5f4f6fc0959.png)

#### 1.2 命令行方式设置用户级别环境变量

运行CMD或者Powershell或者Terminal

```powershell
# 设置JAVA_HOME为默认安装目录绝对路径或者自定义目录绝对路径
setx "JAVA_HOME" "C:\Program Files\Java\jdk-1.8"
```

```powershell
setx "Path" "%Path%;%JAVA_HOME%\bin"
```

### 2.验证

通过 CMD 或 Powershell 进行验证

```shell
java -version

# --- output ---

# jdk 8
java version "1.8.0_451"
Java(TM) SE Runtime Environment (build 1.8.0_451-b10)
Java HotSpot(TM) 64-Bit Server VM (build 25.451-b10, mixed mode)

# jdk 17
java version "17.0.15" 2025-04-15 LTS
Java(TM) SE Runtime Environment (build 17.0.15+9-LTS-241)
Java HotSpot(TM) 64-Bit Server VM (build 17.0.15+9-LTS-241, mixed mode, sharing)
```

## （三）Linux安装JDK

PS：JDK 17 和 JDK 8 安装步骤大致相同，只是目录名称不同。

在Linux环境下，Oracle提供了`rpm`与`tar.gz`两种形式安装包。

### 1.使用 RPM<font style="color:rgb(51, 51, 51);">（Red Hat Package Manager）</font>包格式的Linux发行版安装（二选一）

```shell
rpm -ivh jdk-8u441-linux-aarch64.rpm # 具体文件名会有编码
```

### 2.使用 tar.gz 包格式安装（二选一）

```shell
tar zxvf jdk-8u441-linux-aarch64.tar.gz -C "目标安装目录"  # 具体文件名会有编码

# write properties to .bash_profile
cat >> .bash_profile << EOF
export JAVA_HOME="JDK具体安装目录"
export PATH=\$JAVA_HOME/bin:\$PATH
EOF

# refresh
source .bash_profile
```

### 3.验证

```shell
java -version

# --- output ---

# jdk 8
java version "1.8.0_441"
Java(TM) SE Runtime Environment (build 1.8.0_441-b07)
Java HotSpot(TM) 64-Bit Server VM (build 25.441-b07, mixed mode)

# jdk 17
java version "17.0.15" 2025-04-15 LTS
Java(TM) SE Runtime Environment (build 17.0.15+9-LTS-241)
Java HotSpot(TM) 64-Bit Server VM (build 17.0.15+9-LTS-241, mixed mode, sharing)
```







