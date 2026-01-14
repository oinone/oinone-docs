---
title: Maven安装与注意事项
index: true
category:
  - 安装与升级
  - 环境准备
order: 8
next:
  text: 源码安装
  link: /zh-cn/InstallOrUpgrade/CommunityEdition/source-code-installation.md
---
# 一、下载安装包
下载地址 [https://maven.apache.org/download.cgi](https://maven.apache.org/download.cgi)

历史版本下载地址 [https://maven.apache.org/docs/history.html](https://maven.apache.org/docs/history.html)

推荐选择`3.8.x`、`3.9.x`系列版本进行安装。

:::info 注意

+ 安装过程中使用3.9.9版本作为示例
+ 在 Linux/macOS 系统中，请使用默认终端；在 Windows 系统中，请使用 PowerShell。

:::

# 二、安装
## （一）下载
```shell
# Linux/macOS
curl -L https://dlcdn.apache.org/maven/maven-3/3.9.9/binaries/apache-maven-3.9.9-bin.tar.gz -o apache-maven-3.9.9-bin.tar.gz
```

```shell
# Windows
Invoke-WebRequest -Uri "https://dlcdn.apache.org/maven/maven-3/3.9.9/binaries/apache-maven-3.9.9-bin.zip" -OutFile "apache-maven-3.9.9-bin.zip"
```

## （二）解压
可视化工具或者使用如下命令解压

```shell
# Linux/macOS
tar zxvf apache-maven-3.9.9-bin.tar.gz -C <Maven安装目录>
```

```shell
# Windows
Expand-Archive apache-maven-3.9.9-bin.zip <Maven安装目录>
```

建立软链(可选)

```shell
# Linux/macOS
ln -s apache-maven-3.9.9 maven
```

```powershell
# Windows
New-Item -Path .\maven\ -ItemType SymbolicLink -Target .\apache-maven-3.9.9
```

## （三）配置环境变量
### 1、Linux/macOS配置环境变量
:::info 注意

在配置环境变量时，脚本中的配置路径需替换为对应 Shell 的 profile 文件路径：

+ 对于 Zsh，请使用 `${HOME}/.zshrc`
+ 对于 Bash，请使用 `${HOME}/.bashrc`

:::

```shell
# Linux/macOS
cat >> 替换具体Shell配置文件 << EOF
export M2_HOME="<Maven安装目录>"
export PATH=\$M2_HOME/bin:\$PATH
EOF
```

以下提供两种配置环境变量的方式：可视化界面配置和命令行配置。任选其中一种方式进行配置即可，无需同时使用。

### 2、Windows配置环境变量
+ 可视化界面方式设置用户级别环境变量

键盘触发 `Win + R`出现以下界面

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Preparing-the-development-environment/maven/1.png)

输入以下代码之后点击`确定`

```shell
# 呼出环境变量配置界面
rundll32.exe sysdm.cpl,EditEnvironmentVariables
```

设置`M2_HOME`为`C:\Users\yakir\Developer\apache-maven-3.9.9\`

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Preparing-the-development-environment/maven/2.png)

追加`Path` `;%M2_HOME%\bin`

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Preparing-the-development-environment/maven/3.png)



+ 命令行方式设置用户级别环境变量_**<u>(可选)</u>**_

运行CMD或者Powershell或者Terminal

```powershell
# 设置M2_HOME
# 设置M2_HOME为默认安装目录绝对路径或者自定义目录绝对路径
setx "M2_HOME" "<Maven安装目录>"
# 例如 setx "M2_HOME" C:\Users\yakir\Developer\apache-maven-3.9.9\
```

```powershell
# 追加PATH
setx "Path" "%Path%;%M2_HOME%\bin"
```

# 三、验证
命令行输入

`mvn --version`

```powershell
# Linux/macOS
Apache Maven 3.9.9 (8e8579a9e76f7d015ee5ec7bfcdc97d260186937)
Maven home: /Users/yakir/local/maven
Java version: 1.8.0_452, vendor: BellSoft, runtime: /Library/Java/JavaVirtualMachines/liberica-jdk-8-full.jdk/Contents/Home/jre
Default locale: zh_CN, platform encoding: UTF-8
OS name: "mac os x", version: "15.3.2", arch: "aarch64", family: "mac"
```

```powershell
# Windows
Apache Maven 3.9.9 (8e8579a9e76f7d015ee5ec7bfcdc97d260186937)
Maven home: C:\Users\yakir\Developer\apache-maven-3.9.9
Java version: 1.8.0_441, vendor: Oracle Corporation, runtime: C:\Program Files\Java\jdk-1.8\jre
Default locale: zh_CN, platform encoding: GBK
OS name: "windows 11", version: "10.0", arch: "amd64", family: "windows"
```

出现类似输出表示Maven安装成功

