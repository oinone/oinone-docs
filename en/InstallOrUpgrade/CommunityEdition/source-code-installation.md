---
title: Source code installation
index: true
category:
  - Installation and Upgrade
order: 3
prev:
  text: Maven Installation and Precautions
  link: /en/InstallOrUpgrade/Dev-ENV/Maven-setup.md
next:
  text: Quick Experience:Installation in docker-full Mode
  link: /en/InstallOrUpgrade/EnterpriseEdition/docker-full-installation.md
---

# Ⅰ. Overview
:::info Note

This mode is only available for the open-source community edition. The enterprise edition supports installation via various other methods.

:::

The basic requirement is to prepare a Linux server with 4 CPU cores and 16GB of memory. The recommended operating system is CentOS 7.6 64-bit, which comes pre-installed with all dependencies required by the Oinone framework, along with common and useful utility packages.

This approach offers greater flexibility. For instance, it allows specific modules to be run according to business requirements. It is sufficient for module development and can serve as a foundation for production deployment. In actual use, middleware services such as Redis, Zookeeper, and RocketMQ can be deployed on independent servers. The deployment architecture is shown below:

![Deployment Structure](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Source-code-installation/bsjg.jpeg)

:::warning Tip

When modifying the Oinone framework source code during source code installation, you cannot directly switch from the community edition to the enterprise edition. However, for other versions, switching from the community edition to the enterprise edition is supported.

:::

# Ⅱ. Install MySQL Database

If you don't already have a database installed, you can download and install MySQL from the official website: [https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/).

Refer to [MySQL Installation and Precautions](/en/InstallOrUpgrade/Dev-ENV/MySQL-setup.md)

# Ⅲ. Deployment of Other Middleware

| Component  | Required | Version |
| ---------- | -------- | ------- |
| RocketMQ   | Yes      | Version 4.7.1 or higher |
| Redis      | Yes      | Version 5.0.2 or higher |
| Zookeeper  | Yes      | Version 3.5.8 or higher |

# Ⅳ. Introduction to Code Repositories

<table  cellspacing="0" cellpadding="8" style="border-collapse: collapse; width: 100%; max-width: 1400px; margin: 20px auto;">
  <thead>
    <tr style="background-color: #f5f5f5;">
      <th style="text-align: left; font-weight: bold;">Description</th>
      <th style="text-align: left; font-weight: bold;">Code Repository Path</th>
      <th style="text-align: left; font-weight: bold;">Remarks</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="3">Quick Start</td>
      <td>oinone/oinone-frontend-starter.git</td>
      <td>One-click startup for web front-end</td>
    </tr>
    <tr>
      <td>oinone/oinone-mobile-starter.git</td>
      <td>One-click startup for mobile front-end</td>
    </tr>
    <tr>
      <td>oinone/oinone-backend-starter.git</td>
      <td>One-click startup for back-end</td>
    </tr>
    <tr>
      <td rowspan="2">Tutorials</td>
      <td>oinone/oinone-frontend-tutorials.git</td>
      <td>Front-end tutorial project</td>
    </tr>
    <tr>
      <td>oinone/oinone-backend-tutorials.git</td>
      <td>Back-end tutorial project</td>
    </tr>
    <tr>
      <td rowspan="2">Examples</td>
      <td>oinone/oinone-frontend-examples.git</td>
      <td>Front-end sample project</td>
    </tr>
    <tr>
      <td>oinone/oinone-backend-examples.git</td>
      <td>Back-end sample project</td>
    </tr>
    <tr>
      <td>Documentation</td>
      <td>oinone/oinone-docs</td>
      <td>Technical documentation</td>
    </tr>
    <tr>
      <td rowspan="6">Back-end Core Packages</td>
      <td>oinone/oinone-pamirs/pamirs-spi.git</td>
      <td>Back-end SPI basic functionality package</td>
    </tr>
    <tr>
      <td>oinone/oinone-pamirs/pamirs-k2.git</td>
      <td>Back-end metadata core functionality</td>
    </tr>
    <tr>
      <td>oinone/oinone-pamirs/pamirs-framework-commons.git</td>
      <td>Back-end shared functionality core package</td>
    </tr>
    <tr>
      <td>oinone/oinone-pamirs/pamirs-framework.git</td>
      <td>Back-end core functionality package</td>
    </tr>
    <tr>
      <td>oinone/oinone-pamirs/pamirs-framework-adaptor.git</td>
      <td>Back-end core extension package</td>
    </tr>
    <tr>
      <td>oinone/oinone-pamirs/pamirs-boot.git</td>
      <td>Back-end application bootstrap package</td>
    </tr>
    <tr>
      <td>Back-end Utility Package</td>
      <td>oinone/oinone-pamirs/pamirs-core.git</td>
      <td>Back-end basic utility package</td>
    </tr>
    <tr>
      <td rowspan="7">Front-end Core Packages</td>
      <td>oinone/oinone-kunlun/kunlun-engine.git</td>
      <td>Front-end extended core functionality</td>
    </tr>
    <tr>
      <td>oinone/oinone-kunlun/kunlun-framework.git</td>
      <td>Front-end core functionality package</td>
    </tr>
    <tr>
      <td>oinone/oinone-kunlun/kunlun-boot.git</td>
      <td>Front-end PC bootstrap project</td>
    </tr>
    <tr>
      <td>oinone/oinone-kunlun/kunlun-mobile-boot.git</td>
      <td>Front-end mobile bootstrap project</td>
    </tr>
    <tr>
      <td>oinone/oinone-kunlun/kunlun-expression.git</td>
      <td>Front-end expression component library</td>
    </tr>
    <tr>
      <td>oinone/oinone-kunlun/kunlun-vue.git</td>
      <td>Front-end PC component library</td>
    </tr>
    <tr>
      <td>oinone/oinone-kunlun/kunlun-mobile-vue.git</td>
      <td>Front-end mobile component library</td>
    </tr>
  </tbody>
</table>

:::warning Tip: Differences between `oinone-backend-starter.git` and `oinone-backend-tutorials.git`:

1. `starter` depends on all `oinone` modules, while `tutorials` depends on some modules.
2. `starter` requires `mysql`, `redis`, `zookeeper`, and `mq`; `tutorials` depends on `mysql` and `redis`, and other components will be gradually introduced when new features are added later.
3. Examples may be added to `oinone-backend-tutorials` in the future. Currently, we are quite hesitant about whether to include examples from the tutorials. The original intention of not adding examples now is to encourage learners to actually do it themselves.

:::

# Ⅴ. Obtain the Source Code

There are two ways to acquire the source code of Shushi Oinone: download the ZIP package or use Git. This documentation focuses on Git.

:::warning Tip

Please install [Git](https://git-scm.com/). We recommend having basic knowledge of Git commands.

:::

You can use either HTTPS or SSH to clone the Git repositories. HTTPS is recommended for most users. Use SSH if you want to contribute to the source code or follow the developer onboarding guide.

## (Ⅰ) Front-end

```bash
# Clone using HTTPS
git clone https://github.com/oinone/oinone-frontend-starter.git

# Clone using SSH
git clone git@github.com:oinone/oinone-frontend-starter.git
```

## (Ⅱ) Back-end

```bash
# Clone using HTTPS
git clone https://github.com/oinone/oinone-backend-starter.git

# Clone using SSH
git clone git@github.com:oinone/oinone-backend-starter.git
```

# Ⅵ. Run the Back-end

## (Ⅰ) Modify the `src/main/resources/config/application-dev.yml` file

If MySQL, Zookeeper, Redis, and RocketMQ are not on the same machine, you need to find the relevant code and modify IP, port, username, password, etc.

### MySQL

```yaml
# Modify the MySQL connection information
pamirs:
  datasource:
    pamirs:
      driverClassName: com.mysql.cj.jdbc.Driver
      type: com.alibaba.druid.pool.DruidDataSource
      url: jdbc:mysql://192.168.0.129:3306/demo_pamirs?...
      username: root
      password: shushi@2019
    base:
      driverClassName: com.mysql.cj.jdbc.Driver
      type: com.alibaba.druid.pool.DruidDataSource
      url: jdbc:mysql://192.168.0.129:3306/demo_base?...
      username: root
      password: shushi@2019
```

### Zookeeper

```yaml
dubbo:
  application:
    name: pamirs-designer
    version: 1.0.0
  registry:
    address: zookeeper://127.0.0.1:2181
  protocol:
    name: dubbo
    port: 20880
    serialization: pamirs
  ...
pamirs:
  zookeeper:
    zkConnectString: 127.0.0.1:2181
    zkSessionTimeout: 60000
    rootPath: /oinone
```

### Redis

```yaml
spring:
  redis:
    database: 0
    host: 127.0.0.1
    port: 6379
    timeout: 2000
    password: Abc@1234
    jedis:
      pool:
        max-idle: 16
        min-idle: 0
        max-active: 16
        max-wait: 3000
```

### RocketMQ

```yaml
spring:
  rocketmq:
    name-server: 127.0.0.1:9876
```

### File Storage OSS

```yaml
cdn:
  oss:
    name: MINIO
    type: MINIO
    bucket: pamirs
    uploadUrl: http://xxx.xxx.xxx.xxx:9000
    downloadUrl: http://xxx.xxx.xxx.xxx:9000
    accessKeyId: xxx
    accessKeySecret: xxx
    mainDir: upload/demo/
    validTime: 3600000
    timeout: 600000
    active: true
    referer:
    localFolderUrl: 
```

:::danger Warning

For enterprise edition trials, Shushi provides default CDN configuration. In production environments, you must replace it with your own CDN server. The test server will be periodically cleared, and file loss may occur.

:::

For more OSS configurations, see: [File Storage Configuration](/en/DevManual/Reference/Back-EndFramework/module-API.md#14-File-Storage-Configuration-pamirs-file)

## (Ⅱ) Start the Back-end Service

### 1. Use Maven

```bash
cd oinone-backend-starter/oinone-backend-starter-boot && \
mvn clean compile spring-boot:run \
    -Dspring-boot.run.profiles=dev
```

### 2. Use IntelliJ IDEA

Import the `oinone-backend-starter` project into IDEA and set `pro.shushi.pamirs.starter.OinoneBackendStarterApp` as the main class.

Successful startup message:

```bash
Oinone Backend Starter App started in 54.168926917 s
```

# Ⅶ. Run the Front-end

## (Ⅰ) Install Dependencies and Start

```bash
npm i
npm run dev
```

## (Ⅱ) Configure API Endpoint

1. **For Production**: Modify `API_BASE_URL` in `.env`
2. **For Development**: Modify `devServer.proxy.pamirs.target` in `vue.config.js`

> Method 1 has higher precedence than Method 2. To use Method 2, delete Method 1.

## (Ⅲ) Static Resources

```plaintext
├── public
└────static.zip
```

Extract `static.zip` into the `public` directory.

> It is recommended to upload static resources to OSS and set `STATIC_IMG` in `.env` to the OSS address.

## (Ⅳ) Directory Structure

```plaintext
├── public                Static resource directory (contains index.html)
│   └── static            Static assets
│
├── src                   Source code
│   └── main.ts           Entry file, registers `providers/application.ts`
├── .env                 Environment variables file
├── package.json         Project dependencies and scripts
├── tsconfig.json        TypeScript configuration
└── vue.config.js        Vue/Webpack configuration, including dev proxy
```
