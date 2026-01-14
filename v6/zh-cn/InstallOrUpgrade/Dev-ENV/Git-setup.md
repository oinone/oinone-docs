---
title: Git安装与注意事项
index: true
category:
  - 安装与升级
  - 环境准备
order: 4

---
## 一、macOS安装Git
命令行中输入一下命令

```shell
xcode-select --install
```

:::warning 提示

输入命令后，系统将弹出提示框。请根据提示完成安装操作。

:::

## 二、Linux安装Git


<table>
  <tr>
    <td>yum包管理器</td>
    <td>yum install -y git</td>
    <td>例如 CentOS系统</td>
  </tr>
  <tr>
    <td>apt包管理器</td>
    <td>apt-get install -y git</td>
    <td>例如 Debian、Ubuntu系统</td>
  </tr>
</table>



:::warning 提示

如果你使用的是其他 Linux 发行版或包管理器，请根据所使用的系统和包管理器的方式安装 Git。

:::

## 三、Windows安装Git
下载地址: [https://git-scm.com/downloads/win](https://git-scm.com/downloads/win)

:::warning 提示

下载时请注意选择与当前设备 CPU 指令集架构（如 x64、arm64）相对应的安装包。
下载完成后，按照安装包提供的指引完成安装即可。

:::

## 四、扩展
可以利用其他可视化工具，让`Git`使用更方便。例如 [SourceTree](https://www.sourcetreeapp.com/)

