---
title: Git Installation and Precautions
index: true
category:
  - Installation and Upgrade
  - Environment Preparation
order: 4

---
## I. Install Git on macOS
Enter the following command in the command line:

```shell
xcode-select --install
```

:::warning Prompt

After entering the command, the system will pop up a prompt box. Please complete the installation operation according to the prompt.

:::

## II. Install Git on Linux


| yum Package Manager | yum install -y git | For example, CentOS system |
|---------------------|-------------------|---------------------------|
| apt Package Manager | apt-get install -y git | For example, Debian, Ubuntu systems |


:::warning Prompt

If you are using other Linux distributions or package managers, please install Git according to the system and package manager you are using.

:::

## III. Install Git on Windows
Download address: [https://git-scm.com/downloads/win](https://git-scm.com/downloads/win)

:::warning Prompt

When downloading, please pay attention to selecting the installation package corresponding to the CPU instruction set architecture (such as x64, arm64) of the current device.
After the download is complete, follow the instructions provided by the installation package to complete the installation.

:::

## IV. Extension
You can use other visualization tools to make Git more convenient to use. For example, [SourceTree](https://www.sourcetreeapp.com/)