---
title: 发布流程：后端发布流程
index: true
category:
   - 后端
order: 18
---
# 一、应用部署
## （一）中间件及资源要求
用 Oinone 开发的业务工程后端本质是一个 Springboot 工程，其部署方式与其他 Springboot 工程类似；

### 1、 中间件及版本
+ Oinone 启动最小集 包括：Java, MySQL、zk，redis 和 nginx (或其他 httpserver)

| **中间件** | **版本** | **说明** |
| :---: | --- | --- |
| Java(jdk) | 1.8 | 1.8_221+，低于这个版本需要覆盖JCE |
| Reids | 4.x、5.x |  |
| Nginx | 版本无特殊要求 |  |
| MySQL | 5.7.x,  8.0.x |  |
| zk | 3.4.x,  3.5.x |  |
| RocketMQ | 4.x，推荐4.7+ | 按需安装 |


### 2、硬件资源建议
> **这里列出的资源列表仅是建议值；实际情况需根据业务数据量和用户访问量进行综合评估。**
>

+ 总体说明：线上部署时数据库强烈建议使用云资源 或者 公司提供的公共资源，并配置完整的数据备份策略
+ 推荐指标：考虑系统余量(内存使用率<=85%，硬盘使用量<=80%)
+ Oinone 业务应用部署，所需要的中间件与用标准的 SpringBoot 工程相比，并无多大的区别（对Redis 性能要求稍等高点，其他的中间件参考项目部署的资源就可以）。下面列举出来的资源是预估值，实际项目可以根据访问量等做对应的调整。

| 组件 | CPU核数 | 内存 | 硬盘 | 实例数 | 说明 |
| :---: | :---: | :---: | :---: | :---: | --- |
| Nginx | - | - | 5G | 2 | 静态资源 |
| zk | 2c | 1.5G+ | 20G | 3 | 集群版安装 |
| Redis | 2c | 8G+ | 20G | 1 | 可以使用云上资源 |
| MySQL | 4c | 8G+ | 300G+ | 1 | 使用已有资源/云资源， 建议使用云资源 |
| OSS | 2c | 4G | - | 1. | 使用云上资源或搭建MINIO |
| Oinone业务应用 | 4c | 8G | 50G | 部署包数 * 2+ |  |


## （二）后端部署
### 1、设计器页面数据导出
> 若项目中没有用到界面设计器设计器页面，则忽略该步骤。
>

项目中有用到界面设计器设计器页面，首先需要把设计页面导出

1. 通过接口的方式执行导出, 并把调用页面导出的结果JSON数据保存下来；
+ 先执行登录

```graphql
mutation {
    pamirsUserTransientMutation {
        login(user: { login: "admin", password: "admin" }) {
            needRedirect
            broken
            errorMsg
            errorCode
            errorField
        }
    }
}
```

+ 执行界面数据导出，请求示例：

```graphql
mutation {
    uiDesignerExportReqMutation {
        export(
            data: { module: "demo_core", fileName: "demo_meta", moduleBasics: false }
        ) {
            jsonUrl
        }
    }
}
```

+ 更多导出方式(如：按菜单导出、按页面导出)，参考：[界面设计器的导入导出](/zh/DevManual/CommonSolutions/Back-End/project-deployment-ui-designer-import-export.md)
2. 在应用中心执行导出
   ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/FAQ/2025031808420511-1024x433.png)

导出成功后，在`应用环境`的设计导出中找到导入记录，把到处结果的 JSON 文件保存下来；

### 2、目标环境有设计器
数据数据在应用中心可视化的方式进行设计数据的导入和导出

### 3、业务工程中导入设计页面数据
后端工程中把界面设计器的页面数据导入，若无通过界面设计器设计页面时忽略

+ 把上面导出的页面数据(JSON文件)放入到 resources 目录下，如防止的位置：`resources/install/hr_demo_ui.json`
+ 业务工程中导入示例代码

```java
package pro.shushi.pamirs.hr.core.init;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import pro.shushi.pamirs.boot.common.api.command.AppLifecycleCommand;
import pro.shushi.pamirs.boot.common.extend.MetaDataEditor;
import pro.shushi.pamirs.core.common.InitializationUtil;
import pro.shushi.pamirs.hr.api.HrSimpleModule;
import pro.shushi.pamirs.meta.annotation.fun.extern.Slf4j;
import pro.shushi.pamirs.meta.api.dto.meta.Meta;
import pro.shushi.pamirs.metadata.manager.core.helper.DesignerInstallHelper;
import pro.shushi.pamirs.metadata.manager.core.helper.WidgetInstallHelper;

import java.util.Map;

@Slf4j
@Order(Integer.MAX_VALUE-1)
@Component
public class DemoAppMetaInstall implements MetaDataEditor {
    @Autowired
    private ApplicationContext applicationContext;

    @Override
    public void edit(AppLifecycleCommand command, Map<String, Meta> metaMap) {
        //关闭导入
        if (!doImport()) {
            return;
        }
        log.info("[设计器业务元数据导⼊]");
        InitializationUtil bizInitializationUtil = InitializationUtil.get(metaMap, HrSimpleModule.MODULE_MODULE/***改成⾃⼰的Module*/,
                                                                          HrSimpleModule.MODULE_NAME/***改成⾃⼰的Module*/);
        DesignerInstallHelper.mateInitialization(bizInitializationUtil, "install/hr_demo_ui.json");
        log.info("[⾃定义组件元数据导⼊]");
        // 写法1: 将组件元数据导⼊到⻚⾯设计器. 只有在安装设计器的服务中执⾏才有效果
        WidgetInstallHelper.mateInitialization(metaMap, "install/hr_demo_ui.json");
    }

    private boolean doImport() {
        // ⾃定义导⼊判断. 避免⽤于设计的开发环境执⾏导⼊逻辑
        // 开发环境即设计器页面的源环境不要安装
        // 开发环境即设计器页面的源环境不要安装
        /**
        String[] envs = applicationContext.getEnvironment().getActiveProfiles();
        List<String> envList = Lists.newArrayList(envs);
        return CollectionUtils.isNotEmpty(envList) && (envList.contains("prod"));
         **/
        return Boolean.FALSE;
    }
}
```

## （三）后端打包部署
1. 后端工程是标准的Springboot工程，部署方式也是类似
2. 部署方式
+ 可通过 `java -jar` 的方式部署
+ 可通过 `Docker`方式部署
+ 可打成 `war包`部署在tomcat或者国产化的 TongWeb 上
3. 后端工程也接入到自动化部署工具中，如 Jenkins 中；

# 二、应用升级
## （一）后端升级
1. 获取对应的版本信息；更新日志中的`后端版本包信息` 获取后端版本信息；通常只用关注oinone-bom的版本号

```xml
<!-- 平台基础 -->
<oinone.version>5.7.4.6</oinone.version>
```

2. 后端工程修改主`POM`中的`oinone.version`，修改后重新执行`maven`的更新即可

# 三、设计器升级
1. 获取对应的版本信息。更新日志中的`镜像说明`和 `镜像拉取` 获取镜像信息；
2. 在服务器找到 Docker 启动的结构包，通常是`oinone-op-ds-all-full`或者 `oinone-op-ds-all-mini`,修改`startup.sh`中的镜像版号，示例代码如下：

```bash
#!/bin/bash
configDir=$(pwd)
version=5.2.21.4
IP=192.168.0.121
docker run -d --name designer-allinone \
-e DUBBO_IP_TO_REGISTRY=$IP \
-e DUBBO_PORT_TO_REGISTRY=20880 \
-p 8099:8091 \
-p 88:80 \
-p 15555:15555 \
-p 20880:20880 \
-v $configDir/config/:/opt/pamirs/ext \
-v $configDir/nginx:/opt/pamirs/nginx/vhost \
-v $configDir/logs:/opt/pamirs/logs \
-v $configDir/lib:/opt/pamirs/outlib harbor.oinone.top/oinone/oinone-designer-mini-v5.2:$version
```

3. 设计器的 yml 文件，结构包中的 `config/application.yml`; 绝大多数情况升级不需要修改`application.yml`；只有在极少的情况下可能需要改`application.yml`，比如：新增加了模块。此时在设计器的版本更新日志中会有明确说明；
4. 实际项目中，设计器所链接的中间件都要求外置到容器外部，即部署`oinone-op-ds-all-mini`版本；
5. 如果包镜像名已经存在，还需要删除掉老版本的镜像;
6. 执行`startup.sh`

