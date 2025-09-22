---
title: 从社区版转向企业版
index: true
category:
  - 安装与升级
order: 4
prev:
  text: 运行程序包方式安装
  link: /zh-cn/InstallOrUpgrade/EnterpriseEdition/package-installation.md
---
在未自行修改 Oinone 框架源码的情况下，可以从社区版转向企业版。

:::warning 提示

文中涉及帐号、License许可等相关信息可联系数式Oinone员工。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/from-community-to-enterprise/1749644175194-053883e1-63e3-40ed-9f9f-9b9541ec832f.png)

:::

# 一、准备

+ 备份您的社区版应用数据库(可自行选择执行该步骤)
+ 企业版Maven仓库及帐号
+ 容器镜像仓库及帐号
+ 企业版许可证书

# 二、安装企业版

参考:

+  [快速体验：docker-full方式安装](/zh-cn/InstallOrUpgrade/EnterpriseEdition/docker-full-installation.md)
+  [docker-mini方式安装](/zh-cn/InstallOrUpgrade/EnterpriseEdition/docker-mini-installation.md)

# 三、业务应用升级依赖

（一）添加业务应用依赖管理(主pom)

```xml
<properties>
    <!-- 可根据Oinone发布公告(https://doc.oinone.top/category/version)更新版本 -->
    <!-- 版本号需与部署企业版版本号保持一致，有疑问可联系数式Oinone员工 -->
    <oinone-bom.version>6.2.10</oinone-bom.version>
</properties>

<dependencyManagement>
    <!-- 去掉开源版本pro.shushi.pamirs的依赖 -->
    <!-- 统一替换下面的oinone bom依赖 -->
    <!-- 注意MySQL驱动的依赖不要去掉 -->
  
    <!-- 添加oinone bom-->
    <dependency>
        <groupId>pro.shushi</groupId>
        <artifactId>oinone-bom</artifactId>
        <version>${oinone-bom.version}</version>
        <type>pom</type>
        <scope>import</scope>
    </dependency>
  
    <!-- 其他依赖管理 -->
    <!-- ... -->
</dependencyManagement>
```

（二）升级业务应用的依赖（boot工程的pom）

1. 企业版需要引入的基础包

```xml
<!-- 公共包 - 企业版 -->
<dependency>
  <groupId>pro.shushi.pamirs.core</groupId>
  <artifactId>pamirs-core-common-ee</artifactId>
</dependency>

<!-- 应用中心 - 企业版 -->
<dependency>
  <groupId>pro.shushi.pamirs.core</groupId>
  <artifactId>pamirs-apps-ee</artifactId>
</dependency>

<!-- 权限 - 企业版 -->
<dependency>
  <groupId>pro.shushi.pamirs.core</groupId>
  <artifactId>pamirs-auth3-ee-core</artifactId>
</dependency>
<dependency>
  <groupId>pro.shushi.pamirs.core</groupId>
  <artifactId>pamirs-auth3-ee-view</artifactId>
</dependency>
<dependency>
  <groupId>pro.shushi.pamirs.core</groupId>
  <artifactId>pamirs-auth3-ee-rbac-core</artifactId>
</dependency>
<dependency>
  <groupId>pro.shushi.pamirs.core</groupId>
  <artifactId>pamirs-auth3-ee-rbac-view</artifactId>
</dependency>

<!-- 远程调用(发布和订阅Dubbo服务) -->
<dependency>
    <groupId>pro.shushi.pamirs.distribution</groupId>
    <artifactId>pamirs-distribution-faas</artifactId>
</dependency>
```

2. 启动加速包，用于提升启动速度

```xml
<!-- 启动加速 -->
<dependency>
    <groupId>pro.shushi.pamirs.framework</groupId>
    <artifactId>pamirs-framework-turbo-ee</artifactId>
</dependency>
```

3. 分布式缓存相关的包，引入后元数据走Redis缓存，适用于本地项目和设计器实时联动的场景

```xml
<!-- 分布式缓存 -->
<dependency>
    <groupId>pro.shushi.pamirs.distribution</groupId>
    <artifactId>pamirs-distribution-gateway</artifactId>
</dependency>
<dependency>
    <groupId>pro.shushi.pamirs.distribution</groupId>
    <artifactId>pamirs-distribution-session</artifactId>
</dependency>
<dependency>
    <groupId>pro.shushi.pamirs.distribution</groupId>
    <artifactId>pamirs-distribution-session-cd</artifactId>
</dependency>
```

# 四、IDEA开发验证

验证IDEA开发证书

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/from-community-to-enterprise/1751511410221-7ea9c089-6599-4467-b44b-a4167c04885a.png)

:::warning 提示

Windows操作系统下IDEA插件若激活失败(包括点击激活无反应)，可以预先判断下wmic是否激活；若未激活可参照下面图中说明进行wmic的安装和激活。

:::

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/from-community-to-enterprise/1756949752012-9224cc42-e42e-46ac-b306-084cfd8f5c1d.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/from-community-to-enterprise/1756949757891-a09cade0-0909-4439-8e76-91e50d9ec1f5.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/from-community-to-enterprise/1756949763318-31436010-2a10-43df-91e3-60d006cd2d77.png)

# 五、业务应用YAML修改

（一）、增加license的配置

License文件在数式发布的企业版部署包中license文件夹下，yml文件中配置参考“部署说明.md”；

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/from-community-to-enterprise/1756949792869-e9614909-6733-49ef-8d29-8bcc6cce38ff.png)

（二）、业务应用中间件配置

  业务系统的**中间件(zk/redis/rocketmq)配置和部署的企业版设计器中间件保持一致**；

（三）、业务应用数据库配置

  业务系统的数据库配置**和部署的企业版设计器数据库保持一致**；

（四）、业务工程新增配置

```plain
logging:
  level:
    org.apache.dubbo.registry.client.metadata.store.RemoteMetadataServiceImpl: off
```

:::warning 提示

同base库同Redis下中间件和版本不一致会导致启动校验失败。

:::

# 六、启动/体验

至此开心的体验Oinone企业版啦😀。

# 七、参考资料

[后端部署启动常见问题](/zh-cn/DevManual/FAQ/startup-frequently-asked-questions-about-backend-startup.md)