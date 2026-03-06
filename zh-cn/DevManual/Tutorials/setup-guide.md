---
title: 设置指南（Setup Guide）
index: true
category:
  - 研发手册
  - 教程
order: 2
prev:
  text: Node.js安装与注意事项
  link: /zh-cn/DevManual/Tutorials/Dev-ENV/Node.js-setup.md
---
# 一、概述

本章内容将引导开发者搭建本地开发环境，并完成与 Oinone 设计器之间 `协同开发` 的主要内容，以此保障后续的学习步骤可以顺利进行。

:::warning 提示：

在开启本章教程之前，你至少需要安装 Docker 环境在你的机器上，并且成功部署了 Oinone 设计器。

+ [使用 Docker Compose 运行 Oinone](/zh-cn/InstallOrUpgrade/CommunityEdition.md#一-特别说明)

:::

# 二、开启 Oinone 设计器服务的访问

由于搭建后端开发环境所需的中间件过多，为了方便起见，我们只需要通过简单的配置 **共用** 设计器已经搭建好的环境，即可快速开始 `前端/后端` 的开发工作。

## （一）配置 HOST_IP 参数

在 `.env` 文件中添加以下参数开启 `dubbo`、`rocketmq` 服务的访问：

```shell
HOST_IP=192.168.1.100
```

:::warning 提示：

+ 192.168.1.100：你的宿主机IP地址

更多关于 `.env` 文件的信息，可参考：[Oinone 设计器配置指南](/zh-cn/InstallOrUpgrade/setup-oinone-designer.md)

:::

## （二）使用 Oinone 设计器的前端访问业务工程后端

在 `.env` 文件中添加以下参数开启 `业务工程` 服务的访问：

```shell
# oinone biz service expose port in the browser
OINONE_BIZ_PORT=89
OINONE_BIZ_BACKEND_SERVER=http://192.168.1.100:8191
OINONE_BIZ_OPENAPI_SERVER=http://192.168.1.100:8193
```

:::warning 提示：

+ 192.168.1.100：你的宿主机IP地址
+ 8191：业务工程 Spring Server 默认端口
+ 8193：业务工程 EIP 默认端口

默认端口可通过 [教程提供的后端工程](#三、搭建后端开发环境) 中的 `application.yml` 配置获取。

更多关于 `.env` 文件的信息，可参考：[Oinone 设计器配置指南](/zh-cn/InstallOrUpgrade/setup-oinone-designer.md)

:::

## （三）重启 Oinone 设计器

```shell
# MacOS/Linux
docker compose down -v
docker compose up -d

# Windows
docker compose -p oinone down -v
docker compose -p oinone up -d
```

# 三、搭建后端开发环境

## （一）获取教程提供的后端工程

**Github**

```shell
# clone with https
git clone https://github.com/oinone/oinone-backend-tutorials.git

# clone with ssh
git clone git@github.com:oinone/oinone-backend-tutorials.git
```

**Gitee**

```shell
# clone with https
git clone https://gitee.com/oinone/oinone-backend-tutorials.git

# clone with ssh
git clone git@gitee.com:oinone/oinone-backend-tutorials.git
```

## （二）修改 application-dev.yml 配置文件

### 1.使用 Oinone 设计器提供的 OSS 目录（可选）

```yaml
cdn:
  oss:
    # 设计器镜像访问路径
    downloadUrl: http://127.0.0.1:88
    # 设计器镜像 oss 目录路径（绝对路径）
    localFolderUrl: <path-to-oss>
```

### 2.配置中间件连接信息（可选）

若已经启动的 Oinone 设计器没有修改过任何端口信息，可无需修改。

**zookeeper 连接配置**

```yaml
dubbo:
  registry:
    address: zookeeper://127.0.0.1:2182
pamirs:
  zookeeper:
    zkConnectString: 127.0.0.1:2182
```

**redis 连接配置**

```yaml
spring:
  data:
    redis:
      database: 0
      host: 127.0.0.1
      port: 6378
      password: Abc@1234
```

**mysql 连接配置**

```yaml
pamirs:
  datasource:
    base:
      driverClassName: com.mysql.cj.jdbc.Driver
      url: jdbc:mysql://127.0.0.1:3307/oinone_base?useSSL=false&allowPublicKeyRetrieval=true&useServerPrepStmts=true&cachePrepStmts=true&useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai&autoReconnect=true&allowMultiQueries=true
      username: root
      password: Abc@1234
    pamirs:
      driverClassName: com.mysql.cj.jdbc.Driver
      url: jdbc:mysql://127.0.0.1:3307/oinone_pamirs?useSSL=false&allowPublicKeyRetrieval=true&useServerPrepStmts=true&cachePrepStmts=true&useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai&autoReconnect=true&allowMultiQueries=true
      username: root
      password: Abc@1234
    biz_data:
      driverClassName: com.mysql.cj.jdbc.Driver
      url: jdbc:mysql://127.0.0.1:3307/oinone_biz_data?useSSL=false&allowPublicKeyRetrieval=true&useServerPrepStmts=true&cachePrepStmts=true&useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai&autoReconnect=true&allowMultiQueries=true
      username: root
      password: Abc@1234
```

:::warning 注意

共用设计器环境进行开发时，数据源对应的 `base`、`pamirs`、`biz_data` 不可删减或修改，只需修改 `url`、`username`、`password` 连接配置即可。

:::

**rocketmq 连接配置**

```yaml
spring:
  rocketmq:
    name-server: 127.0.0.1:19876
```

## （三）启动后端服务

### 1.添加 IDEA 启动 JVM 参数

:::warning 小贴士

首次使用 IDEA 打开工程后，需要配置 Maven、JDK 等内容，可参考：[附录1：IDEA 环境配置](#附录1-idea-环境配置)

配置完成后，通过 IDEA 打开 `TutorialsApplication.java` 左侧启动图标点击运行 `Run 'TutorialsAppli....main()'`，但是这样直接运行是无法正常启动的。

依次点击 `Edit Configurations` -> `Modify Options` -> `Add VM options`

在出现的 VM options 输入框中添加以下内容。

:::

```shell
--add-opens=jdk.compiler/com.sun.tools.javac.api=ALL-UNNAMED
--add-opens=jdk.compiler/com.sun.tools.javac.code=ALL-UNNAMED
--add-opens=jdk.compiler/com.sun.tools.javac.comp=ALL-UNNAMED
--add-opens=jdk.compiler/com.sun.tools.javac.file=ALL-UNNAMED
--add-opens=jdk.compiler/com.sun.tools.javac.jvm=ALL-UNNAMED
--add-opens=jdk.compiler/com.sun.tools.javac.launcher=ALL-UNNAMED
--add-opens=jdk.compiler/com.sun.tools.javac.main=ALL-UNNAMED
--add-opens=jdk.compiler/com.sun.tools.javac.model=ALL-UNNAMED
--add-opens=jdk.compiler/com.sun.tools.javac.parser=ALL-UNNAMED
--add-opens=jdk.compiler/com.sun.tools.javac.platform=ALL-UNNAMED
--add-opens=jdk.compiler/com.sun.tools.javac.processing=ALL-UNNAMED
--add-opens=jdk.compiler/com.sun.tools.javac.resources=ALL-UNNAMED
--add-opens=jdk.compiler/com.sun.tools.javac.tree=ALL-UNNAMED
--add-opens=jdk.compiler/com.sun.tools.javac.util=ALL-UNNAMED
--add-opens=jdk.compiler/com.sun.source.tree=ALL-UNNAMED
--add-opens=java.base/java.lang=ALL-UNNAMED
--add-opens=java.base/java.lang.annotation=ALL-UNNAMED
--add-opens=java.base/java.lang.constant=ALL-UNNAMED
--add-opens=java.base/java.lang.invoke=ALL-UNNAMED
--add-opens=java.base/java.lang.module=ALL-UNNAMED
--add-opens=java.base/java.lang.ref=ALL-UNNAMED
--add-opens=java.base/java.lang.reflect=ALL-UNNAMED
--add-opens=java.base/java.lang.runtime=ALL-UNNAMED
--add-opens=java.base/java.io=ALL-UNNAMED
--add-opens=java.base/java.lang=ALL-UNNAMED
--add-opens=java.base/java.math=ALL-UNNAMED
--add-opens=java.base/java.net=ALL-UNNAMED
--add-opens=java.base/java.nio=ALL-UNNAMED
--add-opens=java.base/java.security=ALL-UNNAMED
--add-opens=java.base/java.text=ALL-UNNAMED
--add-opens=java.base/java.time=ALL-UNNAMED
--add-opens=java.base/java.util=ALL-UNNAMED
--add-opens=java.xml/com.sun.org.apache.xpath.internal.jaxp=ALL-UNNAMED
--add-opens=java.base/jdk.internal.access=ALL-UNNAMED
```

### 2.启动业务工程后端服务

像 `Spring Boot` 工程一样使用 IDEA 正常启动即可。

## （四）访问 Oinone 业务工程

在 **浏览器** 中打开：http://127.0.0.1:89

输入用户名/密码：admin/admin

至此，你已经可以开始学习后端框架的所有内容了。

:::warning 注意

+ 89：在 [使用 Oinone 设计器的前端连接业务工程后端](#二-使用-oinone-设计器的前端访问业务工程后端) 中配置的端口

:::

# 四、搭建前端开发环境

## （一）获取教程提供的前端工程

**Github**

```shell
# clone with https
git clone https://github.com/oinone/oinone-frontend-tutorials.git

# clone with ssh
git clone git@github.com:oinone/oinone-frontend-tutorials.git
```

**Gitee**

```shell
# clone with https
git clone https://gitee.com/oinone/oinone-frontend-tutorials.git

# clone with ssh
git clone git@gitee.com:oinone/oinone-frontend-tutorials.git
```

:::warning 小贴士

首次使用 WebStorm 打开工程后，需要配置 Prettier、ESLint 等内容，可参考：[附录2：WebStorm 环境配置](#附录2-webstorm-环境配置)

:::

## （二）配置 vue.config.js 访问 Oinone 设计器（可选）

若已经启动的设计器没有修改过任何端口信息，可无需修改。

```javascript
devServer: {
  port: 8080,
  allowedHosts: 'all',
  compress: false,
  proxy: {
    '/pamirs': {
      changeOrigin: true,
      // 请求后端地址
      target: 'http://127.0.0.1:8091'
      // Oinone 提供的演示环境地址
      // target: 'https://demo.oinone.top'
    }
  }
}
```

## （三）获取静态资源

从 Oinone 设计器的 `挂载卷（volumes）` 目录，将 `oss` 目录 **复制/软链** 到 `public` 目录下即可。

目录结构如下所示：

```shell
.
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── oss
│       ├── images
│       └── oinone
├── src
│   ├── main.ts
│   ├── shim-translate.d.ts
│   ├── shim-vue.d.ts
│   └── shim-widget.d.ts
├── package.json
├── playwright.config.ts
├── tsconfig.json
├── vue.config.js
├── LICENSE
└── README.MD

```

:::warning 提示：

如果使用软链接的形式映射 `oss` 目录到 `public` 目录下，静态资源则会跟着设计器升级同步升级。

示例：`ln -s /<path-to-oss> oss`

:::

## （四）启动前端服务

PS：国内用户可通过修改内置 `.npmrc` 启用 `taobao registry` 加速安装。

```shell
npm install && npm run dev
```

## （五）访问前端服务

在 **浏览器** 中打开：http://127.0.0.1:8080

输入用户名/密码：admin/admin

至此，你已经可以开始学习前端框架的所有内容了。

:::warning 注意

+ 8080：在 `vue.config.js` 中配置的端口

:::

# 附录1：IDEA 环境配置

## （一）IDEA 插件安装

### 1.根据 IDEA 版本下载对应插件

| IDEA版本 | 对应插件                                                     |
| -------- | ------------------------------------------------------------ |
| 2023.2   | [pamirs-intellij-plugin-2023.2.zip](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-3/pamirs-intellij-plugin-2023.2.zip) |
| 2023.3   | [pamirs-intellij-plugin-2023.3.zip](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-3/pamirs-intellij-plugin-2023.3.zip) |
| 2024.1   | [pamirs-intellij-plugin-2024.1.zip](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-3/pamirs-intellij-plugin-2024.1.zip) |
| 2024.2   | [pamirs-intellij-plugin-2024.2.zip](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-3/pamirs-intellij-plugin-2024.2.zip) |
| 2024.3   | [pamirs-intellij-plugin-2024.3.zip](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-3/pamirs-intellij-plugin-2024.3.zip) |
| 2025.1   | [pamirs-intellij-plugin-2025.1.zip](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-3/pamirs-intellij-plugin-2025.1.zip) |
| 2025.2   | [pamirs-intellij-plugin-2025.2.zip](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-3/pamirs-intellij-plugin-2025.2.zip)  |


:::warning 提示：

如 IDEA 出现最新版本，但 Oinone 未及时提供的，可联系我们提供支持。

:::

### 2.在 IDEA Plugins 中安装插件

mac：点击Preferences菜单（快捷键 comand+,）



![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/setup-guide/1745741523459-718ba8a8-7067-4ffd-a7ab-0e7232ef1de4.png)

windwos：点击菜单项File => Settings => Plugins



![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/setup-guide/1742286915686-cb6a642a-cefe-4ece-85df-c0ac2be46210.png)

:::warning 提示：

安装插件的时候，选择 `.zip` 文件，不需要解压。

:::

## （二）DB GUI 工具

数据库管理工具很多人喜欢用Datagrip、MySQLWorkbench、DBEaver，你可以根据自己喜好选择一款。

## （三）Maven 工具

### 1.安装

参考：[Maven安装与注意事项](/zh-cn/DevManual/Tutorials/Dev-ENV/Maven-setup.md)

### 2.配置

建议将Maven配置文件 `settings.xml` 文件放置在用户目录下的 `.m2` 文件夹中。

如果没有用户级别的maven配置，可能需要在IDEA中配置maven的偏好设置。
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/setup-guide/1745741868765-5d90977f-3682-4524-8159-cc74d328411f.png)

## （四）GraphQL API 调试工具

常用的 GraphQL 调试工具包括 Postman、Insomnia 等。  
在使用这些工具时，可以结合 Environment（环境）与占位符功能，方便进行接口调试。



![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/setup-guide/1745747071233-dc005dd1-cd4f-4575-9971-03ff25d89ade.gif)

# 附录2：WebStorm 环境配置

## Node.js 配置

7.0.0版本以上统一使用 **v22.13.0** 版本进行开发



![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/setup-guide/1766573771785-cdd03491-315c-4fe0-9bd5-30dd977f3295.png)

## TypeScript 配置

```shell
# 安装 typescript 4.x
npm install -g typescript@^4
```



![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/setup-guide/1769056873508-41dd7dff-7d11-4e02-8d3e-534c4a7b1056.png)

## Vue 配置

```shell
# 安装 Vue Language Server 3.x
npm install -g @vue/language-server@^3
```



![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/setup-guide/1769056887976-2dfebcfc-d4bf-436c-a55d-bd108798d1aa.png)

## Prettier 配置

+ **Run for files**：`**/*.{js,ts,jsx,tsx,cjs,cts,mjs,mts,vue,astro,json,md,,css,less,scss}`



![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/setup-guide/1769057015152-bfa60514-c72d-4503-9312-6988ec0880fa.png)

## ESLint 配置

+ **Run for files**：`**/*.{js,ts,jsx,tsx,cjs,cts,mjs,mts,html,vue}`



![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/setup-guide/1769056965557-1e219817-e1e6-438f-838e-bd950c7d8611.png)



