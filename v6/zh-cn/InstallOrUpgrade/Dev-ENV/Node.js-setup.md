---
title: Node.js安装与注意事项
index: true
category:
  - 安装与升级
  - 环境准备
order: 2

---
# 一、下载安装包
:::warning 提示

下载时请注意选择与你的操作系统及 CPU 指令集架构（如 x64、arm64）相匹配的版本。
以下安装过程以版本号为 20.16.0、架构为 arm64 的版本为例进行说明。

:::



:::info 注意

在配置环境变量时，脚本中的配置路径需替换为对应 Shell 的 profile 文件路径：

+ 对于 Zsh，请使用 `${HOME}/.zshrc`
+ 对于 Bash，请使用 `${HOME}/.bashrc`

:::



Node.js下载地址：

[https://nodejs.org/dist/v20.16.0/](https://nodejs.org/dist/v20.16.0/)

# 二、安装
## （一）Linux/macOS安装Node.js
### 1、解压
可视化工具或者使用如下命令解压

```shell
# 解压命令
# tar.gz包
tar zxvf node-v20.16.0-darwin-arm64.tar.gz -C ./安装目录

# tar.xz包
tar Jxvf node-v20.16.0-darwin-arm64.tar.gz -C ./安装目录
```

### 2、配置环境变量
```shell
# 配置环境变量
cat >> 替换具体Shell配置文件 << EOF
export NODE_PATH="安装目录"
export PATH=\$NODE_PATH/bin:\$PATH
EOF
```

### 3、验证
使用终端输入 `node --version` 进行验证

```shell
# 验证环境变量
node --version
v20.16.0
```

## （二）Windows安装Node.js
### 1、解压
可视化工具或者使用Windows自带zip工具（鼠标选中文件，右键点击“全部解压缩”），提取压缩文件的内容

### 2、配置环境变量
键盘触发 `Win + R`出现以下界面

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Preparing-the-development-environment/node.js/1.png)

输入以下代码之后点击`确定`

```shell
# 呼出环境变量配置界面
rundll32.exe sysdm.cpl,EditEnvironmentVariables
```

配置`NODE_PATH`为node的安装目录，并把变量`%NODE_PATH%`添加到 `Path`中

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Preparing-the-development-environment/node.js/2.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Preparing-the-development-environment/node.js/3.png)

### 3、验证
使用Windows终端输入 `node --version` 进行验证

```shell
# 验证环境变量
node --version
v20.16.0
```

# 三、进阶
使用 nvm 管理不同版本的 Node.js。安装与使用方法可参考 nvm 官方网站：
[https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)

Vue.js 的开发工具为 Vue CLI，安装与使用方法可参考 Vue CLI 官方文档：
[https://cli.vuejs.org/zh/](https://cli.vuejs.org/zh/)

