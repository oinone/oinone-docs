---
title: Environment Deployment:Deploying Oinone Projects on TongWeb and Tomcat
index: true
category:
  - Common Solutions
order: 59
---

# I. Scenario Description
Against the backdrop of localization and the trusted computing initiative, deploying projects on application servers like TongWeb (Oriental TongWeb) or Tomcat is often required for technical adaptation, security, and controllability. This article elaborates on the specific methods for deploying Oinone projects using TongWeb or Tomcat.

# II. What You Need to Know
+ A deep understanding of Tomcat container-related knowledge is required. Notably, TongWeb operations are highly similar to those of Tomcat.
+ You should clarify the differences between packaging projects as WAR packages and JAR packages.

# III. Packaging a Springboot Project as a WAR Package
For detailed steps, refer to: [https://www.cnblogs.com/memoa/p/10250553.html](https://www.cnblogs.com/memoa/p/10250553.html)

# IV. Deploying WAR Packages on TongWeb and Tomcat
+ TongWeb typically provides official operation manuals for WAR package deployment, so details are not repeated here.
+ Sufficient and detailed reference materials for deploying WAR packages on Tomcat are already available online, so this article does not duplicate them.
+ This article focuses on explaining the unique aspects of deploying WAR packages generated from Oinone projects.

# V. Deploying Oinone Project WAR Packages
## (一) Known Limitations
+ When deploying Oinone projects, specifying the lifecycle `-Plifecycle=INSTALL` is required.
+ TongWeb and Tomcat cannot set `Program arguments` in startup scripts.

## (二) Solution Approach
Parameters equivalent to `-Plifecycle=INSTALL` can be configured via YML file configuration:

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

## (三) Configuration Reference
Refer to `Module Startup Instructions` for configuration.

| Parameter | Name | Default Value | Description |
| --- | --- | --- | --- |
| -Plifecycle | Lifecycle Deployment Instruction | RELOAD | Options: None/INSTALL/PACKAGE/RELOAD/DDL |


### 1. Installation (INSTALL)
+ **install**: With a value of `AUTO`, it indicates that the installation process will execute according to the system's preset automated流程 (process).
+ **upgrade**: With a value of `FORCE`, it means the upgrade operation will be carried out forcefully, overriding existing configurations or files.
+ **profile**: With a value of `AUTO`, it means configuration file-related operations follow automated settings.

### 2. Packaging (PACKAGE)
+ **install**: With a value of `AUTO`, it indicates that during the installation phase, the packaging operation will be completed according to automated rules.
+ **upgrade**: With a value of `FORCE`, it means the packaging during the upgrade will be enforced to ensure the new version is fully packaged.
+ **profile**: With a value of `PACKAGE`, it indicates that configuration file-related operations will be executed in packaging mode.

### 3. Reload (RELOAD)
+ **install**, **upgrade**, **profile**: All with a value of `READONLY`, meaning that whether for installation, upgrade, or configuration file operations, they are in a read-only state during the reload process, and no modification operations are allowed.

### 4. Print Change DDL (DDL)
+ **install**: With a value of `AUTO`, it means that during the installation process, the operation of printing change Data Definition Language (DDL) will be executed automatically.
+ **upgrade**: With a value of `FORCE`, it indicates that the upgrade will force the printing of change DDL to ensure the data structure changes during the upgrade are clearly presented.
+ **profile**: With a value of `DDL`, it means configuration file-related operations will focus on printing change DDL.