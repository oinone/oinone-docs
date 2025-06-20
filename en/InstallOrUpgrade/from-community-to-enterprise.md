---
title: From Community to Enterprise
index: true
category:
  - Installation and Upgrade
order: 4
prev:
  text: Installation via Running Package
  link: /en/InstallOrUpgrade/EnterpriseEdition/package-installation.md
---
When the Oinone framework source code has not been modified, you can switch from the Community Edition to the Enterprise Edition.

:::warning Tip

For information related to accounts, License permissions, etc., please contact Oinone staff.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/from-community-to-enterprise/1749644175194-053883e1-63e3-40ed-9f9f-9b9541ec832f.png)

:::

# I. Preparation

+ Back up your Community Edition application database (this step is optional)
+ Enterprise Edition Maven repository and account
+ Container image repository and account
+ Enterprise Edition license certificate

# II. Install Enterprise Edition

Refer to:

+ [Quick Experience: Installation via docker-full Method](/en/InstallOrUpgrade/EnterpriseEdition/docker-full-installation.md)
+ [Installation via docker-mini Method](/en/InstallOrUpgrade/EnterpriseEdition/docker-mini-installation.md)

# III. Upgrade Dependencies for Business Applications

Add business application dependency management:

```xml
<properties>
    <!-- Update the version according to Oinone release announcements (https://doc.oinone.top/category/version) -->
    <oinone.version>6.2.1</oinone.version>
</properties>

<dependencyManagement>
    <!-- Other dependency management -->
    <!-- ... -->
  
    <!-- Add oinone bom -->
    <dependency>
        <groupId>pro.shushi</groupId>
        <artifactId>oinone-bom</artifactId>
        <version>${oinone.version}</version>
        <type>pom</type>
        <scope>import</scope>
    </dependency>
</dependencyManagement>
```

Upgrade dependencies for business applications:

```xml
<!-- Common package - Enterprise Edition -->
<dependency>
  <groupId>pro.shushi.pamirs.core</groupId>
  <artifactId>pamirs-core-common-ee</artifactId>
</dependency>

<!-- Application Center - Enterprise Edition -->
<dependency>
  <groupId>pro.shushi.pamirs.core</groupId>
  <artifactId>pamirs-apps-ee</artifactId>
</dependency>

<!-- Permissions - Enterprise Edition -->
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
```



# IV. Launch/Experience

Now you can happily experience the Oinone Enterprise Edition 😀.