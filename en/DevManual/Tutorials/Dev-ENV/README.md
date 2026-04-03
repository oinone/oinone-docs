---
title: Dev ENV
index: true
category:
  - Installation and Upgrade
  - Environment Preparation
dir:
  link: true
  order: 1
prev:
  text: Tutorials
  link: /en/DevManual/Tutorials/README.md
next:
  text: Git Installation and Precautions
  link: /en/DevManual/Tutorials/Dev-ENV/Git-setup.md
---
# I. Runtime Environment

<div style="display: flex; gap: 20px; margin: 20px 0;">

  <div style="flex: 1; background: #f8f9fa; border-radius: 8px; padding: 16px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Preparing-the-development-environment/jdk.png)

**JDK**<span style="background-color:#f8d7da; color:#721c24; padding:2px 6px; border-radius:4px;">Mandatory</span>
**Version**<span style="background-color:#d4edda; color:#155724; padding:2px 6px; border-radius:4px;">1.8 221+</span>

Java basic runtime environment. Used for compiling and starting the designer and business applications.

[Installation and Precautions](/en/DevManual/Tutorials/Dev-ENV/JDK-setup.md)
  </div>

  <div style="flex: 1; background: #f8f9fa; border-radius: 8px; padding: 16px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Preparing-the-development-environment/mysql.png)

**MySQL**<span style="background-color:#f8d7da; color:#721c24; padding:2px 6px; border-radius:4px;">Mandatory</span>
**Version**<span style="background-color:#d4edda; color:#155724; padding:2px 6px; border-radius:4px;">8.0.26+</span>

Used to store model-related metadata and business data.

[Installation and Precautions](/en/DevManual/Tutorials/Dev-ENV/MySQL-setup.md)
  </div>

  <div style="flex: 1; background: #f8f9fa; border-radius: 8px; padding: 16px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Preparing-the-development-environment/rocketMQ.png)

**RocketMQ**<span style="background-color:#f8d7da; color:#721c24; padding:2px 6px; border-radius:4px;">Mandatory</span>
**Version**<span style="background-color:#d4edda; color:#155724; padding:2px 6px; border-radius:4px;">4.7.1+</span>

A high-throughput, low-latency distributed message queue middleware developed by Apache. Used for scenarios such as asynchronous decoupling and event-driven.

[Installation and Precautions](/en/DevManual/Tutorials/Dev-ENV/RocketMQ-setup.md)
  </div>
</div>

<div style="display: flex; gap: 20px; margin: 20px 0;">

  <div style="flex: 1; background: #f8f9fa; border-radius: 8px; padding: 16px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Preparing-the-development-environment/redis.png?x-oss-process=image/resize,h_196)

**Redis**<span style="background-color:#f8d7da; color:#721c24; padding:2px 6px; border-radius:4px;">Mandatory</span>
**Version**<span style="background-color:#d4edda; color:#155724; padding:2px 6px; border-radius:4px;">5.0.2</span>

High-performance in-memory database, used for caching hot metadata and business data, and can also be used for distributed locks.

[Installation and Precautions](/en/DevManual/Tutorials/Dev-ENV/Redis-setup.md)
  </div>

  <div style="flex: 1; background: #f8f9fa; border-radius: 8px; padding: 16px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Preparing-the-development-environment/zookeeper.png?x-oss-process=image/resize,h_196)

**Zookeeper**<span style="background-color:#f8d7da; color:#721c24; padding:2px 6px; border-radius:4px;">Mandatory</span>
**Version**<span style="background-color:#d4edda; color:#155724; padding:2px 6px; border-radius:4px;">3.5.8+ </span>

Distributed coordination service. Used for scenarios such as registering and distributing remote services, distributed locks, and event listening.

[Installation and Precautions](/en/DevManual/Tutorials/Dev-ENV/Zookeeper-setup.md)
  </div>

</div>



# II. Development Environment
If developing a system in code form based on Oinone, based on the runtime environment, additionally install the environment involved in development.

## (I) Backend Basic Environment

<div style="display: flex; gap: 20px; margin: 20px 0;">

  <div style="flex: 1; background: #f8f9fa; border-radius: 8px; padding: 16px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">

  ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Preparing-the-development-environment/idea.png)

**IDEA**<span style="background-color:#f8d7da; color:#721c24; padding:2px 6px; border-radius:4px;">Mandatory</span>
**Version**<span style="background-color:#d4edda; color:#155724; padding:2px 6px; border-radius:4px;">Recommended 2020.3+</span>

Java integrated development environment, which can choose Ultimate or Community version.

:::info Note

1. Disable the Lombok plugin

2. Install the oinone plugin
:::

[Installation and Precautions](/en/DevManual/Tutorials/setup-guide.md#appendix-1-idea-environment-configuration)
  </div>

  <div style="flex: 1; background: #f8f9fa; border-radius: 8px; padding: 16px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">

  ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Preparing-the-development-environment/git.png)

**Git**<span style="background-color:#f8d7da; color:#721c24; padding:2px 6px; border-radius:4px;">Mandatory</span>
**Version**<span style="background-color:#d4edda; color:#155724; padding:2px 6px; border-radius:4px;">Recommended 2020.3+</span>

Source code version management tool

[Installation and Precautions](/en/DevManual/Tutorials/Dev-ENV/Git-setup.md)

  </div>

  <div style="flex: 1; background: #f8f9fa; border-radius: 8px; padding: 16px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">

  ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Preparing-the-development-environment/maven.png)

**Maven**<span style="background-color:#f8d7da; color:#721c24; padding:2px 6px; border-radius:4px;">Mandatory</span>
**Version**<span style="background-color:#d4edda; color:#155724; padding:2px 6px; border-radius:4px;">Recommended 3.6+</span>

Project, build, and dependency management tool

[Installation and Precautions](/en/DevManual/Tutorials/Dev-ENV/Maven-setup.md)

  </div>

</div>

<div style="display: flex; gap: 20px; margin: 20px 0;">

  <div style="flex: 1; background: #f8f9fa; border-radius: 8px; padding: 16px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">

  ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Preparing-the-development-environment/mysql.png?x-oss-process=image/resize,h_196)

**DB GUI Tool**<span style="background-color:#e2e3e5; color:#383d41; padding:2px 6px; border-radius:4px;">Optional</span>

Datagrip, MySQL Workbench, DBeaver, or other tools that support发起SQL queries.

  </div>

  <div style="flex: 1; background: #f8f9fa; border-radius: 8px; padding: 16px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">

  ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Preparing-the-development-environment/graphQL.png?x-oss-process=image/resize,h_196)

**GraphQL Testing Tool**<span style="background-color:#e2e3e5; color:#383d41; padding:2px 6px; border-radius:4px;">Optional</span>

Insomnia, Postman, or other tools that support发起GQL requests.

  </div>

</div>



## (II) Frontend Basic Environment

<div style="display: flex; gap: 20px; margin: 20px 0;">

  <div style="flex: 1; background: #f8f9fa; border-radius: 8px; padding: 16px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">

  ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Preparing-the-development-environment/node.png)

**Node.js**<span style="background-color:#f8d7da; color:#721c24; padding:2px 6px; border-radius:4px;">Mandatory</span>
**Version**<span style="background-color:#d4edda; color:#155724; padding:2px 6px; border-radius:4px;">12.12.0+</span>

A high-performance JavaScript runtime based on the Chrome V8 engine, supporting non-blocking I/O, widely used to build highly concurrent backend services and microservice architectures.

[Installation and Precautions](/en/DevManual/Tutorials/Dev-ENV/Node.js-setup.md)

  </div>

  <div style="flex: 1; background: #f8f9fa; border-radius: 8px; padding: 16px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">

  ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Preparing-the-development-environment/vue-cli.png)

**vue-cli**<span style="background-color:#f8d7da; color:#721c24; padding:2px 6px; border-radius:4px;">Mandatory</span>

Vue scaffolding tool

The official scaffolding tool provided by Vue.js, which supports rapid project initialization, configuration management, and plugin extension, simplifying the development and construction process of Vue projects.

[Installation and Precautions](/en/DevManual/Tutorials/Dev-ENV/Node.js-setup.md#ⅲadvanced)

  </div>

  <div style="flex: 1; background: #f8f9fa; border-radius: 8px; padding: 16px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">

  ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Preparing-the-development-environment/nvm.png)

**nvm**<span style="background-color:#e2e3e5; color:#383d41; padding:2px 6px; border-radius:4px;">Optional</span>

Convenient Node.js version management

Node.js version management tool, which supports installing, switching, and managing multiple Node.js versions on the same device.

[Installation and Precautions](/en/DevManual/Tutorials/Dev-ENV/Node.js-setup.md#ⅲadvanced)

  </div>

</div>

:::info Note

For the enterprise version of mvn settings, please contact the Shushi Oinone assistant.

:::

:::info Note

For the enterprise version of npm source configuration, please contact the Shushi Oinone assistant.

:::