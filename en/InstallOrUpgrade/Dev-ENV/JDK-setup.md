---
title: JDK Installation and Precautions
index: true
category:
  - Installation and Upgrade
  - Environment Setup
order: 1
prev:
  text: Environment Preparation
  link: /en/InstallOrUpgrade/Dev-ENV/README.md
---

# 1. Download the Installer

:::warning Tip

You may choose Oracle, OpenJDK, or other JDK distributions. The required version is 1.8_221 or higher. It is recommended to use Oracle or OpenJDK distributions.

Please ensure that the version you download matches your device's CPU architecture (e.g., x64, arm64).

:::

Oracle JDK Download Links:

| Platform | Download Link |
| --- | --- |
| Linux | [https://www.oracle.com/java/technologies/downloads/#java8-linux](https://www.oracle.com/java/technologies/downloads/#java8-linux) |
| macOS | [https://www.oracle.com/java/technologies/downloads/#java8-mac](https://www.oracle.com/java/technologies/downloads/#java8-mac) |
| Windows | [https://www.oracle.com/java/technologies/downloads/#java8-windows](https://www.oracle.com/java/technologies/downloads/#java8-windows) |
| Archive | [https://www.oracle.com/java/technologies/downloads/archive/](https://www.oracle.com/java/technologies/downloads/archive/) |

:::warning Tip

Downloading the Oracle JDK may require logging in to an Oracle account.

:::

:::info Note

When configuring environment variables, make sure to update the profile path according to your shell:

+ For Zsh, use `${HOME}/.zshrc`
+ For Bash, use `${HOME}/.bashrc`

:::

# 2. Installation

## (1) Install JDK on macOS

### 1. Configure Environment Variables

- Global installation directory for `.dmg`: `/Library/Java/JavaVirtualMachines/jdk-1.8.jdk`
- User-level installation directory for `.dmg`: `~/Library/Java/JavaVirtualMachines/jdk-1.8.jdk`
- Custom installation for `.tar.gz`: user-defined directory

Set environment variables:

```shell
cat >> REPLACE_WITH_SHELL_PROFILE_FILE << EOF
export JAVA_HOME="/Library/Java/JavaVirtualMachines/jdk-1.8.jdk/Contents/Home"
export PATH=\$JAVA_HOME/bin:\$PATH
EOF
```

### 2. Verify Installation

```shell
# Verify Java installation
/usr/libexec/java_home -V
```

```shell
# Sample verification output
1.8.0_451 (arm64) "Oracle Corporation" - "Java SE 8" /Library/Java/JavaVirtualMachines/jdk-1.8.jdk/Contents/Home
```

```shell
# Verify environment variable setup
java -version
```

```shell
# Sample environment variable output
% java -version
java version "1.8.0_451"
Java(TM) SE Runtime Environment (build 1.8.0_451-b10)
Java HotSpot(TM) 64-Bit Server VM (build 25.451-b10, mixed mode)
```

## (2) Install JDK on Windows

- Default install directory for `.exe`: `C:\Program Files\Java\jdk-1.8\`
- Custom install directory: user-defined
- Extracted from `.zip`: user-defined directory

### 1. Configure Environment Variables

You can choose one of the two methods below (visual or CLI). Only one is needed.

#### 1.1 Visual Method (User-Level Environment Variables)

Press `Win + R` to open the dialog shown below:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Preparing-the-development-environment/JDK/1.png)

Then enter:

```shell
# Open environment variables settings window
rundll32.exe sysdm.cpl,EditEnvironmentVariables
```

Set `JAVA_HOME` to:

```
C:\Program Files\Java\jdk-1.8
```

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Preparing-the-development-environment/JDK/image%20(2).png)

Append the following to `Path`: `;%JAVA_HOME%\bin`

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Preparing-the-development-environment/JDK/image%20(3).png)

#### 1.2 CLI Method (User-Level Environment Variables)

Open CMD, PowerShell, or Terminal:

```powershell
# Set JAVA_HOME
setx "JAVA_HOME" "C:\Program Files\Java\jdk-1.8"
```

```powershell
# Append to PATH
setx "Path" "%Path%;%JAVA_HOME%\bin"
```

### 2. Verify Installation

Open the terminal and run:

```shell
# Verify environment variable setup
java -version
```

```shell
# Sample output
java version "1.8.0_441"
Java(TM) SE Runtime Environment (build 1.8.0_441-b07)
Java HotSpot(TM) 64-Bit Server VM (build 25.441-b07, mixed mode)
```

If the output is similar, the JDK is installed successfully.

## (3) Install JDK on Linux

Oracle provides `.rpm` and `.tar.gz` formats for Linux.

### 1. Install via RPM (Red Hat Package Manager)

```shell
# RPM package installation
rpm -ivh jdk-8u441-linux-aarch64.rpm  # Actual filename may vary
```

### 2. Install via tar.gz

```shell
# Extract tar.gz to target directory
tar zxvf jdk-8u441-linux-aarch64.tar.gz -C "target-install-dir"
```

### 3. Configure Environment Variables

```shell
# Set JAVA_HOME and update PATH
cat >> REPLACE_WITH_SHELL_PROFILE_FILE << EOF
export JAVA_HOME="ACTUAL_JDK_INSTALL_DIR"
export PATH=\$JAVA_HOME/bin:\$PATH
EOF
```

### 4. Verify Installation

```shell
# Check Java version
java -version
```

```shell
# Sample output
java version "1.8.0_441"
Java(TM) SE Runtime Environment (build 1.8.0_441-b07)
Java HotSpot(TM) 64-Bit Server VM (build 25.441-b07, mixed mode)
```

If the output is similar, the JDK has been successfully installed.
