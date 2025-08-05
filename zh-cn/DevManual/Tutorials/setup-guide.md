---
title: 设置指南（Setup Guide）
index: true
category:
  - 研发手册
  - 教程
order: 1
prev:
  text: 教程（Tutorials）
  link: /zh-cn/DevManual/Tutorials/README.md
---
# 一、概述
根据预期的使用场景，安装数式Oinone有多种方式。对于数式Oinone的开发者以及数式Oinone员工来说，首选的方式还是用源码安装。

# 二、为教程适配环境
## （一）后端研发
那么，让我们把你的更改推送到教程代码库中：`oinone/oinone-backend-tutorials`。和oinone/oinone-backend-starter代码库一样，它将独立启动并成为整体的一部分。

:::warning 提示：模块独立启动

数式Oinone的模块支持独立运行，且不依赖Oinone的设计器模块。

:::

按照与 `oinone/oinone-backend-starter` 代码库相同的流程，在你的机器上克隆 `oinone/oinone-backend-tutorials` 代码库，命令如下：

```shell
git clone git@github.com:oinone/oinone-backend-tutorials.git
```

配置你的派生仓库和 Git，以便将更改推送到你的派生仓库，而不是主代码库。

将 Git 与你的派生仓库关联
访问 `github.com/oinone/oinone-backend-tutorials`，然后点击 “派生（Fork）” 按钮，在你的账户上创建该代码库的一个派生仓库。

在下面的命令中，将 `<your_github_account>` 替换为你创建派生仓库时所使用的 GitHub 账户名。

```shell
cd /TutorialsPath
git remote add dev git@github.com:<your_github_account>/oinone-backend-tutorials.git
```

就是这样！现在你的环境已准备好从源代码运行 Oinone，并且你已成功创建了一个代码库。这将使你能够将你的工作推送到 GitHub 上。

## （二）前端研发
那么，让我们把你的更改推送到教程代码库中：`oinone/oinone-frontend-tutorials`。和oinone/oinone-frontend-starter代码库一样，它可独立启动并代替oinone-frontend-starter提供前端服务。

按照与 `oinone/oinone-frontend-starter` 代码库相同的流程，在你的机器上克隆 `oinone/oinone-frontend-tutorials` 代码库，命令如下：

```shell
git clone git@github.com:oinone/oinone-frontend-tutorials.git
```

配置你的派生仓库和 Git，以便将更改推送到你的派生仓库，而不是主代码库。

将 Git 与你的派生仓库关联
访问 `github.com/oinone/oinone-frontend-tutorials`，然后点击 “派生（Fork）” 按钮，在你的账户上创建该代码库的一个派生仓库。

在下面的命令中，将 `<your_github_account>` 替换为你创建派生仓库时所使用的 GitHub 账户名。

```shell
cd /TutorialsPath
git remote add dev git@github.com:<your_github_account>/oinone-frontend-tutorials.git
```

就是这样！现在你的环境已准备好从源代码运行 Oinone，并且你已成功创建了一个代码库。这将使你能够将你的工作推送到 GitHub 上。

# 三、后端额外工具
## （一）IDEA工具以及插件安装
### 1、请根据各自Idea版本下载对应插件

| IDEA版本 | 对应插件                                                     |
| -------- | ------------------------------------------------------------ |
| 2023.2   | [pamirs-intellij-plugin-2023.2.zip](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-3/pamirs-intellij-plugin-2023.2.zip) |
| 2023.3   | [pamirs-intellij-plugin-2023.3.zip](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-3/pamirs-intellij-plugin-2023.3.zip) |
| 2024.1   | [pamirs-intellij-plugin-2024.1.zip](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-3/pamirs-intellij-plugin-2024.1.zip) |
| 2024.2   | [pamirs-intellij-plugin-2024.2.zip](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-3/pamirs-intellij-plugin-2024.2.zip) |
| 2024.3   | [pamirs-intellij-plugin-2024.3.zip](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-3/pamirs-intellij-plugin-2024.3.zip) |
| 2025.1   | [pamirs-intellij-plugin-2025.1.zip](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-3/pamirs-intellij-plugin-2025.1.zip) |
| 2025.2   | [pamirs-intellij-plugin-2025.2.zip](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-3/pamirs-intellij-plugin-2025.2.zip)  |


<div style="display: flex; gap: 20px; margin: 20px 0;">

  <div style="flex: 1; background: #f8f9fa; border-radius: 8px; padding: 16px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">

  Mac：点击Preferences菜单（快捷键 comand+,）

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/setup-guide/mac.png)

  </div>

  <div style="flex: 1; background: #f8f9fa; border-radius: 8px; padding: 16px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">

  Windows：点击菜单项File => Settings => Plugins

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/setup-guide/Windows.png)

  </div>

</div>

:::warning 提示

安装插件的时候，选择.zip文件，不需要解压

:::

## （二）DB GUI工具
数据库管理工具很多人喜欢用Datagrip、MySQLWorkbench、DBEaver，你可以根据自己喜好选择一款。

## （三）Maven工具
### 1、安装
参照[Maven安装与注意事项](/zh-cn/InstallOrUpgrade/Dev-ENV/Maven-setup.md)

### 2、配置
建议将Maven配置文件 `settings.xml` 文件放置在用户目录下的 `.m2` 文件夹中。

如果没有用户级别的maven配置，可能需要在IDEA中配置maven的偏好设置。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/setup-guide/Maven.png)

## （四）GraphQL API 调试工具
常用的 GraphQL 调试工具包括 Postman、Insomnia 等。
在使用这些工具时，可以结合 Environment（环境）与占位符功能，方便进行接口调试。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/setup-guide/Graph.gif)

#  四、前端额外工具
参照前端[环境配置之进阶](/zh-cn/InstallOrUpgrade/Dev-ENV/Node.js-setup.md#三、进阶)

