---
title: 开发模式：协同开发（改）
index: true
category:
  - 常见解决方案
order: 11
---

Oinone平台为开发人员提供了`本地环境 - 测试环境`之间的协同开发模式，可以使得开发人员在`本地环境`中设计的模型、函数等元数据实时被`测试环境`使用并设计。开发人员开发完成对应页面和功能后，可以部署至`测试环境`直接进行测试。

本篇文章将详细介绍协同开发模式在实际开发中的应用及相关内容。

:::info 目标：在本节结束时：

你应该可以熟练掌握`本地环境 - 测试环境`之间的协同开发模式，做到多个开发人员之前协同开发。

:::

名词解释：

| 名词 | 描述 |
| :--- | :--- |
| 本地环境 | 开发人员的本地启动环境 |
| 测试环境 | 在测试服务器上部署的业务测试环境，`业务工程服务`和`设计器服务`共用中间件 |
| 业务工程服务 | 在测试服务器上部署的业务工程 |
| 设计器服务 | 在测试服务器上部署的设计器镜像 |
| 一套环境 | 以`测试环境`为例，`业务工程服务`和`设计器服务`共同组成`一套环境` |
| 生产环境 | 在生产服务器上部署的业务生产环境 |


# 一、环境准备
+ 部署了一个可用的`设计器服务`，并能正常访问。（需参照下文`启动设计器环境`内容进行相应修改）。
+ 准备一个用于开发的java工程。
+ 准备一个用于部署测试环境的服务器。

# 二、协同参数介绍
## （一）用于`测试环境`的参数
`-PmetaProtected=${value}`

启用元数据保护，只有配置相同启动参数的服务才允许对元数据进行更新。通常该命令用于`设计器服务`和`业务工程服务`，并且两个环境需使用相同的`元数据保护标记（value）`进行启动。`本地环境`不使用该命令，以防止本地环境在协同开发时意外修改测试环境元数据，导致元数据混乱。

```java
java -jar boot.jar -PmetaProtected=pamirs
```

## （二）用于`本地环境`的参数
### 1、使用命令配置ownSign（推荐）
```java
java -jar boot.jar --pamirs.distribution.session.ownSign=demo
```

### 2、使用yaml配置ownSign
```yaml
pamirs:
  distribution:
    session:
      allMetaRefresh: false # 启用元数据全量刷新（备用配置，如遇元数据错误或混乱，启用该配置可进行恢复，使用一次后关闭即可）
      ownSign: demo # 协同开发元数据隔离标记，用于区分不同开发人员的本地环境，其他环境不允许使用
```

# 三、启动设计器环境
## （一）docker-run启动
```java
-e PROGRAM_ARGS=-PmetaProtected=pamirs
```

## （二）docker-compose启动
```yaml
services:
  backend:
    container_name: designer-backend
    image: harbor.oinone.top/oinone/designer-backend-v5.0
    restart: always
    environment:
      # 指定spring.profiles.active
      ARG_ENV: dev
      # 指定-Plifecycle
      ARG_LIFECYCLE: INSTALL
      # jvm参数
      JVM_OPTIONS: ""
      # 程序参数
      PROGRAM_ARGS: "-PmetaProtected=pamirs"
```

:::info 注意：
java [JVM_OPTIONS?] -jar boot.jar [PROGRAM_ARGS?]

:::

# 四、开发流程示例图
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/1746513506595-f26f0ef6-76b7-45a2-946c-b5e9b691054c-20250530144829686.png)

# 五、协同开发支持
## （一）版本支持
4.7.x版本 已经包含分布式支持。

## （二）使用步骤
### 1、业务后端boot工程引入协同开发包
```java
<dependency>
    <groupId>pro.shushi.pamirs.distribution</groupId>
    <artifactId>pamirs-distribution-session-cd</artifactId>
</dependency>
```

### 2、yml文件配置ownSign
```yaml
pamirs:
  distribution:
    session:
      allMetaRefresh: false
      ownSign: demo
```

注：更多 YAML 配置请前往 [Module API](/zh-cn/DevManual/Reference/Back-EndFramework/module-API.md) 查阅。

配置说明：

allMetaRefresh，全量刷新 Redis 中的元数据，绝大多数情况下都不需要配置；

+ 第一次启动或者 Redis 的缓存被清空后，会自动进行全量。
+ 配置为 true 表示强制进行全量，一般都不需要配置。
+ 【推荐】默认增量的方式(即 allMetaRefresh: false)写入 Redis 的数据更少，相应的启动速度也更快。
+ 【强制】ownSign 是环境隔离的设置，同一个项目组不同的开发人员之间，ownSign 配置成不同的（即各自配置成各自的，达到互不干扰）。

### 3、业务系统DB和缓存的约束
+ 【强制要求】业务库与设计器须共用 Redis，其中 Redis 的前缀、租户以及系统隔离键均需保持一致（这三个值会对 RedisKey 的拼接产生影响）。
+ 【强制规定】base 库的业务系统与设计器应实现共用。
+ 【强制要求】公共库即 pamirs（包含资源 - resource、用户 - user、权限 - auth、文件 - file 等方面）需实现共用。
+ 【强制约束】「业务库」数据源的别名必须统一，每位开发人员都应将其配置到本地，或者为远程库添加后缀以作区分。

### 4、如何使用协同
开发人员在各自访问设计器时，于 URL 末尾添加 “;ownSign=yexiu”，随后回车确认。此时，ownSign 相关信息将被存储至浏览器缓存内。在后续访问其他 URL 时，无需重复输入该内容。若开发人员希望移除 ownSign 的值，仅需直接删除界面上的悬浮窗即可。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/1746514437967-d2e85798-ab22-4a43-af60-c4b9bc9528e2-20250530144829753.png)

:::info 注意：

访问设计 URL 上增加的 ownSign 需要与开发各自本地项目 yml 文件中 ownSign 的值相同。（每个开发人员各自用各自的 ownSign）

:::



