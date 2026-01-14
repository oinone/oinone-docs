---
title: 环境准备：windows环境npm安装依赖提示无权限
index: true
category:
  - 常见问题（faq）
order: 9
---

# 一、场景描述
遇到 “The operation was rejected by your operating system” 的错误信息通常意味着操作系统的权限设置阻止了 npm 执行某些操作，如文件或目录的写入。这个问题可能由多种原因引起，以下是一些常见的解决步骤：

# 二、解决方案
## （一）以管理员身份运行命令行
确保你在以管理员权限运行命令行工具。在 Windows 上，你可以右击命令提示符或 PowerShell 图标，然后选择“以管理员身份运行”。

## （二）清除 npm 缓存
有时，npm 缓存中的问题会导致安装失败。尝试清除 npm 缓存：

```bash
npm cache clean –force
```

然后重新尝试安装：

```bash
npm install
```

## （三）检查磁盘空间
确保你的磁盘上有足够的空间来安装新的包及其依赖项。

## （四）更改 npm 配置
如果你的 npm 配置中设置了 `unsafe-perm` 或 `_authToken`，这可能会影响安装。尝试更改 npm 的配置，禁用 `unsafe-perm`：

```bash
npm config set unsafe-perm false
```

## （五）检查防火墙和杀毒软件
某些防火墙或杀毒软件可能会阻止 npm 的网络请求或文件写入操作。检查这些安全软件的设置，确保它们没有阻止 npm 的正常工作。

## （六）修复 npm
有时候，npm 自身的问题可能导致安装失败。尝试重新安装 Node.js 和 npm，或使用 nvm（Node Version Manager）来管理多个 Node.js 版本。

## （七）检查文件或目录权限
如果错误信息中提到了特定的文件或目录，检查这些文件或目录的权限设置。你可能需要修改权限，或移动项目到另一个位置，以获得足够的权限。

## （八）更新 Node.js 和 npm
确保你正在使用最新版本的 Node.js 和 npm。旧版本可能包含已知的 bug 或兼容性问题。

## （九）检查 npm 日志
查看 npm 的日志文件，这可以帮助你找到更详细的错误信息。日志文件的位置可以通过以下命令查询：

```bash
npm config get cache
```

日志文件通常位于 `.npm/_logs` 目录下。

## （十）文件夹下的.npmrc文件按如下配置
`@kunlun:registry=http://nexus.shushi.pro/repository/kunlun/`

<span style="color:rgb(26, 26, 26);">更多参考文章：</span>
[**npm 或 yarn安装依赖报错 EPERM**](https://www.cnblogs.com/caihongmin/p/18203392){ style="color:rgb(19, 99, 251);" target="_blank" }