---
title: Setup Guide
index: true
category:
  - Development Manual
  - Tutorials
order: 2
prev:
  text: Node.js Setup
  link: /en/DevManual/Tutorials/Dev-ENV/Node.js-setup.md
---
# I. Overview

The content of this chapter will guide developers to set up a local development environment and complete the main content of `collaborative development` with the Oinone Designer, ensuring that subsequent learning steps can proceed smoothly.

:::warning Tip:

Before starting the tutorial in this chapter, you need to have at least installed the Docker environment on your machine and successfully deployed the Oinone Designer.

+ [Run Oinone Using Docker Compose](/en/InstallOrUpgrade/CommunityEdition.md#3cb40e95)

:::

# II. Enable Access to the Oinone Designer Service

Since there are too many middleware required to set up the backend development environment, for convenience, we only need to simply configure to **share** the environment already set up by the Designer to quickly start the development work of the `front-end/back-end`.

## (I) Configure the HOST_IP Parameter

Add the following parameters to the `.env` file to enable access to the `dubbo` and `rocketmq` services:

```shell
HOST_IP=192.168.1.100
```

:::warning Tip:

+ 192.168.1.100: The IP address of your host machine

For more information about the `.env` file, please refer to: [Oinone Designer Configuration Guide](/en/InstallOrUpgrade/setup-oinone-designer.md)

:::

## (II) Use the Front-End of the Oinone Designer to Access the Back-End of the Business Project

Add the following parameters to the `.env` file to enable access to the `business project` service:

```shell
# oinone biz service expose port in the browser
OINONE_BIZ_PORT=89
OINONE_BIZ_BACKEND_SERVER=http://192.168.1.100:8191
OINONE_BIZ_OPENAPI_SERVER=http://192.168.1.100:8193
```

:::warning Tip:

+ 192.168.1.100: The IP address of your host machine
+ 8191: The default port of the Spring Server for the business project
+ 8193: The default port of the EIP for the business project

The default ports can be obtained from the `application.yml` configuration in the [backend project provided in the tutorial](#49c0cf29).

For more information about the `.env` file, please refer to: [Oinone Designer Configuration Guide](/en/InstallOrUpgrade/setup-oinone-designer.md)

:::

## (III) Restart the Oinone Designer

```shell
# MacOS/Linux
docker compose down -v
docker compose up -d

# Windows
docker compose -p oinone down -v
docker compose -p oinone up -d
```

# III. Set Up the Backend Development Environment

## (I) Obtain the Backend Project Provided in the Tutorial

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

## (II) Modify the application-dev.yml Configuration File

### 1. Use the OSS Directory Provided by the Oinone Designer (Optional)

```yaml
cdn:
  oss:
    # The access path for the Designer images
    downloadUrl: http://127.0.0.1:88
    # The absolute path of the OSS directory for the Designer images
    localFolderUrl: <path-to-oss>
```

### 2. Configure the Connection Information for the Middleware (Optional)

If the port information of the already started Oinone Designer has not been modified, there is no need to make any changes.

**Zookeeper Connection Configuration**

```yaml
dubbo:
  registry:
    address: zookeeper://127.0.0.1:2182
pamirs:
  zookeeper:
    zkConnectString: 127.0.0.1:2182
```

**Redis Connection Configuration**

```yaml
spring:
  data:
    redis:
      database: 0
      host: 127.0.0.1
      port: 6378
      password: Abc@1234
```

**MySQL Connection Configuration**

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

:::warning Note

When sharing the Designer environment for development, the `base`, `pamirs`, and `biz_data` corresponding to the data sources cannot be deleted or modified. Only the connection configurations of `url`, `username`, and `password` need to be modified.

:::

**RocketMQ Connection Configuration**

```yaml
spring:
  rocketmq:
    name-server: 127.0.0.1:19876
```

## (III) Start the Backend Service

### 1. Add JVM Parameters for IDEA Startup

:::warning Tip

After opening the project in IDEA for the first time, you need to configure Maven, JDK, etc. You can refer to: [Appendix 1: IDEA Environment Configuration](#159a112f)

After the configuration is completed, open `TutorialsApplication.java` in IDEA and click the startup icon on the left to run `Run 'TutorialsAppli....main()'`. However, it cannot be started normally in this way.

Click `Edit Configurations` -> `Modify Options` -> `Add VM options` in sequence.

Add the following content to the VM options input box that appears.

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

### 2. Start the Backend Service of the Business Project

You can start it normally in IDEA like a `Spring Boot` project.

## (IV) Access the Oinone Business Project

Open the following URL in your **browser**: http://127.0.0.1:89

Enter the username/password: admin/admin

At this point, you can start learning all the content of the backend framework.

:::warning Note

+ 89: The port configured in [Use the Front-End of the Oinone Designer to Connect to the Back-End of the Business Project](#b97e2274)

:::

# IV. Set Up the Front-End Development Environment

## (I) Obtain the Front-End Project Provided in the Tutorial

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

:::warning Tip

After opening the project in WebStorm for the first time, you need to configure Prettier, ESLint, etc. You can refer to: [Appendix 2: WebStorm Environment Configuration](#ee0e1c96)

:::

## (II) Configure vue.config.js to Access the Oinone Designer (Optional)

If the port information of the already started Designer has not been modified, there is no need to make any changes.

```javascript
devServer: {
  port: 8080,
  allowedHosts: 'all',
  compress: false,
  proxy: {
    '/pamirs': {
      changeOrigin: true,
      // Request the backend address
      target: 'http://127.0.0.1:8091'
      // The demonstration environment address provided by Oinone
      // target: 'https://demo.oinone.top'
    }
  }
}
```

## (III) Obtain Static Resources

Copy or create a symbolic link of the `oss` directory from the `volumes` directory of the Oinone Designer to the `public` directory.

The directory structure is as follows:

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

:::warning Tip:

If you use a symbolic link to map the `oss` directory to the `public` directory, the static resources will be upgraded synchronously with the Designer.

Example: `ln -s /<path-to-oss> oss`

:::

## (IV) Start the Front-End Service

PS: Users in China can enable the `taobao registry` by modifying the built-in `.npmrc` to speed up the installation.

```shell
npm install && npm run dev
```

## (V) Access the Front-End Service

Open the following URL in your **browser**: http://127.0.0.1:8080

Enter the username/password: admin/admin

At this point, you can start learning all the content of the front-end framework.

:::warning Note

+ 8080: The port configured in `vue.config.js`

:::

# Appendix 1: IDEA Environment Configuration

## (I) Install IDEA Plugins

### 1. Download the Corresponding Plugin According to the IDEA Version

| IDEA Version | Corresponding Plugin                                                     |
| -------- | ------------------------------------------------------------ |
| 2023.2   | [pamirs-intellij-plugin-2023.2.zip](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-3/pamirs-intellij-plugin-2023.2.zip) |
| 2023.3   | [pamirs-intellij-plugin-2023.3.zip](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-3/pamirs-intellij-plugin-2023.3.zip) |
| 2024.1   | [pamirs-intellij-plugin-2024.1.zip](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-3/pamirs-intellij-plugin-2024.1.zip) |
| 2024.2   | [pamirs-intellij-plugin-2024.2.zip](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-3/pamirs-intellij-plugin-2024.2.zip) |
| 2024.3   | [pamirs-intellij-plugin-2024.3.zip](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-3/pamirs-intellij-plugin-2024.3.zip) |
| 2025.1   | [pamirs-intellij-plugin-2025.1.zip](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-3/pamirs-intellij-plugin-2025.1.zip) |
| 2025.2   | [pamirs-intellij-plugin-2025.2.zip](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/MasterFrontendFramework/chapter-3/pamirs-intellij-plugin-2025.2.zip)  |

:::warning Tip:

If there is a new version of IDEA but Oinone has not provided the corresponding plugin in time, you can contact us for support.

:::

### 2. Install the Plugin in IDEA Plugins

Mac: Click the Preferences menu (shortcut key: command + ,)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/setup-guide/1745741523459-718ba8a8-7067-4ffd-a7ab-0e7232ef1de4.png)

Windows: Click the menu item File => Settings => Plugins

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/setup-guide/1742286915686-cb6a642a-cefe-4ece-85df-c0ac2be46210.png)

:::warning Tip:

When installing the plugin, select the `.zip` file without unzipping it.

:::

## (II) DB GUI Tool

Many people like to use Datagrip, MySQLWorkbench, or DBeaver as database management tools. You can choose one according to your preference.

## (III) Maven Tool

### 1. Installation

Refer to: [Maven Installation and Precautions](/en/DevManual/Tutorials/Dev-ENV/Maven-setup.md)

### 2. Configuration

It is recommended to place the Maven configuration file `settings.xml` in the `.m2` folder under the user directory.

If there is no user-level Maven configuration, you may need to configure the Maven preferences in IDEA.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/setup-guide/1745741868765-5d90977f-3682-4524-8159-cc74d328411f.png)

## (IV) GraphQL API Debugging Tool

Commonly used GraphQL debugging tools include Postman, Insomnia, etc.
When using these tools, you can combine the Environment and placeholder functions to facilitate interface debugging.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/setup-guide/1745747071233-dc005dd1-cd4f-4575-9971-03ff25d89ade.gif)

# Appendix 2: WebStorm Environment Configuration

## Node.js Configuration

Versions above 7.0.0 use **v22.13.0** for development.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/setup-guide/1766573771785-cdd03491-315c-4fe0-9bd5-30dd977f3295.png)

## TypeScript Configuration

```shell
# Install typescript 4.x
npm install -g typescript@^4
```

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/setup-guide/1769056873508-41dd7dff-7d11-4e02-8d3e-534c4a7b1056.png)

## Vue Configuration

```shell
# Install Vue Language Server 3.x
npm install -g @vue/language-server@^3
```

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/setup-guide/1769056887976-2dfebcfc-d4bf-436c-a55d-bd108798d1aa.png)

## Prettier Configuration

+ **Run for files**: `**/*.{js,ts,jsx,tsx,cjs,cts,mjs,mts,vue,astro,json,md,,css,less,scss}`

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/setup-guide/1769057015152-bfa60514-c72d-4503-9312-6988ec0880fa.png)

## ESLint Configuration

+ **Run for files**: `**/*.{js,ts,jsx,tsx,cjs,cts,mjs,mts,html,vue}`

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/setup-guide/1769056965557-1e219817-e1e6-438f-838e-bd950c7d8611.png)