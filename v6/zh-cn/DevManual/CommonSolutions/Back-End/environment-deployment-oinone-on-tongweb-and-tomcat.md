---
title: 环境部署：东方通Web和Tomcat部署Oinone项目
index: true
category:
  - 常见解决方案
order: 59
---

# 一、场景描述
在国产化及信创体系的建设背景下，出于技术适配、安全可控等多方面考量，常要求采用东方通 Web 服务器（TongWeb）或者 Tomcat 等应用服务器来部署项目。本文将详尽阐述运用 TongWeb 或 Tomcat 对 Oinone 项目进行部署的具体方法。

# 二、你需要了解
+ 需深入知悉 Tomcat 容器相关知识。值得注意的是，TongWeb 在操作层面与 Tomcat 具有较高相似性。
+ 应明晰项目分别打包为 war 包与 Jar 包所存在的差异。

# 三、Springboot 项目打成 war 包
详细步骤参考：[https://www.cnblogs.com/memoa/p/10250553.html](https://www.cnblogs.com/memoa/p/10250553.html)

# 四、TongWeb 和 Tomcat 部署 War 包
+ TongWeb 在部署 war 包时，通常官方会提供相应的操作手册，故在此不再赘述。
+ 关于 Tomcat 部署 war 包，网络上已有丰富且详尽的参考资料，本文亦不再重复阐述。
+ 本文着重聚焦于说明部署由 Oinone 项目打成的 War 包所存在的独特之处。

# 五、Oinone 项目 War 包部署
## （一）已知限制
+ Oinone 项目在部署时，需要指定生命周期`-Plifecycle=INSTALL`等
+ 而 TongWeb 和 Tomcat 无法在启动脚本中设置`Program arguments`

## （二）解法办法
通过 yml 文件的配置，可以配置等同于`-Plifecycle=INSTALL`的参数

```yaml
pamirs:
  boot:
    init: true
    sync: true
    profile: AUTO
    install: AUTO
    upgrade: FORCE
    modules:
```

## （三）配置参考
配置参考 `模块之启动指令`

| 参数 | 名称 | 默认值 | 说明 |
| --- | --- | --- | --- |
| -Plifecycle | 生命周期部署指令 | RELOAD | 可选项：无/INSTALL/PACKAGE/RELOAD/DDL |


### 1、安装（INSTALL）
+ **install**：取值为 `AUTO`，表明安装过程将按照系统预设的自动化流程执行。
+ **upgrade**：取值为 `FORCE`，意味着升级操作会以强制方式进行，覆盖现有相关配置或文件。
+ **profile**：取值为 `AUTO`，即配置文件相关操作遵循自动化设定。

### 2、打包（PACKAGE）
+ **install**：取值为 `AUTO`，说明在安装环节，打包操作将依据自动化规则完成。
+ **upgrade**：取值为 `FORCE`，表明升级时的打包会强制进行，确保新版本完整打包。
+ **profile**：取值为 `PACKAGE`，表示配置文件相关操作以打包模式执行。

### 3、重启（RELOAD）
+ **install**、**upgrade**、**profile**：取值均为 `READONLY`，即无论是安装、升级还是配置文件操作，在重启过程中都仅为只读状态，不允许进行更改操作。

### 4、打印变更 DDL（DDL）
+ **install**：取值为 `AUTO`，意味着在安装过程中，打印变更数据定义语言（DDL）的操作将自动执行。
+ **upgrade**：取值为 `FORCE`，表示升级时会强制打印变更 DDL，确保升级过程中的数据结构变化清晰呈现。
+ **profile**：取值为 `DDL`，说明配置文件相关操作将围绕打印变更 DDL 展开。

