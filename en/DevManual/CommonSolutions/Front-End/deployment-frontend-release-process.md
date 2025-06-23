---
title: Release:Frontend Release Process
index: true
category:
   - Frontend
order: 2
---
## I. Application Deployment
### (Ⅰ) Middleware and Resource Requirements
The backend of a business project developed with Oinone is essentially a Springboot project, and its deployment method is similar to other Springboot projects.

#### 1. Middleware and Versions
The minimum set for Oinone startup includes: Java, MySQL, zk, redis, and nginx (or other httpservers).

| **Middleware** | **Version** | **Description** |
| :---: | --- | --- |
| Java (JDK) | 1.8 | 1.8_221+, JCE needs to be overridden for versions below this |
| Redis | 4.x, 5.x |  |
| Nginx | No special version requirement |  |
| MySQL | 5.7.x, 8.0.x |  |
| zk | 3.4.x, 3.5.x |  |
| RocketMQ | 4.x, recommended 4.7+ | Install as needed |

#### 2. Hardware Resource Recommendations
> **The resource list listed here is only a recommended value; the actual situation needs to be comprehensively evaluated based on business data volume and user traffic.**

- Overall description: For online deployment, the database is strongly recommended to use cloud resources or public resources provided by the company, and a complete data backup strategy should be configured.
- Recommended indicators: Consider system margin (memory usage <=85%, hard disk usage <=80%).
- The middleware required for Oinone business application deployment is not much different from that of a standard SpringBoot project (with slightly higher performance requirements for Redis; other middleware can refer to the resources of project deployment). The resources listed below are estimated values, and actual projects can be adjusted accordingly based on traffic, etc.

| Component | CPU Cores | Memory | Hard Disk | Instances | Description |
| :---: | :---: | :---: | :---: | :---: | --- |
| Nginx | - | - | 5G | 2 | Static resources |
| zk | 2c | 1.5G+ | 20G | 3 | Cluster installation |
| Redis | 2c | 8G+ | 20G | 1 | Can use cloud resources |
| MySQL | 4c | 8G+ | 300G+ | 1 | Use existing resources/cloud resources, recommended to use cloud resources |
| OSS | 2c | 4G | - | 1 | Use cloud resources or build MINIO |
| Oinone Business Application | 4c | 8G | 50G | Deployment package count * 2+ |  |

### (Ⅱ) Backend Deployment
#### 1. Designer Page Data Export
> If the interface designer is not used to design pages in the project, ignore this step.

If the interface designer is used to design pages in the project, the design pages need to be exported first.

1. Export through the interface method, and save the result JSON data of the called page export.
   - First perform login:
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
   - Execute interface data export, request example:
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
   - For more export methods (such as exporting by menu or by page), refer to: [Import and Export of Interface Designer](/en/DevManual/CommonSolutions/Back-End/project-deployment-ui-designer-import-export.md)
2. Execute export in the application center:
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/FAQ/2025031808420511-1024x433.png)

After the export is successful, find the import record in the design export of the `application environment`, and save the exported JSON file.

#### 2. Designer Exists in the Target Environment
Data can be imported and exported visually through the application center for design data.

#### 3. Import Design Page Data into the Business Project
Import the page data of the interface designer into the backend project, and ignore it if no pages are designed through the interface designer.

- Put the exported page data (JSON file) into the resources directory, such as the location: `resources/install/hr_demo_ui.json`
- Example code for import in the business project:
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
        // Close import
        if (!doImport()) {
            return;
        }
        log.info("[Designer business metadata import]");
        InitializationUtil bizInitializationUtil = InitializationUtil.get(metaMap, HrSimpleModule.MODULE_MODULE/***改成⾃⼰的Module*/,
                                                                          HrSimpleModule.MODULE_NAME/***改成⾃⼰的Module*/);
        DesignerInstallHelper.mateInitialization(bizInitializationUtil, "install/hr_demo_ui.json");
        log.info("[Custom component metadata import]");
        // Writing 1: Import component metadata into the page designer. Only effective when executed in the service installing the designer
        WidgetInstallHelper.mateInitialization(metaMap, "install/hr_demo_ui.json");
    }

    private boolean doImport() {
        // Custom import judgment. Avoid executing import logic in the development environment used for design
        // The development environment, i.e., the source environment of the designer page, should not be installed
        // The development environment, i.e., the source environment of the designer page, should not be installed
        /**
        String[] envs = applicationContext.getEnvironment().getActiveProfiles();
        List<String> envList = Lists.newArrayList(envs);
        return CollectionUtils.isNotEmpty(envList) && (envList.contains("prod"));
         **/
        return Boolean.FALSE;
    }
}
```

### (Ⅲ) Backend Packaging and Deployment
1. The backend project is a standard Springboot project, and the deployment method is similar.
2. Deployment methods:
   - Can be deployed via `java -jar`.
   - Can be deployed via `Docker`.
   - Can be packaged into a `war package` and deployed on tomcat or domestic TongWeb.
3. The backend project is also connected to an automated deployment tool, such as Jenkins.

### (Ⅳ) Frontend Deployment
The frontend is essentially a VUE project, and the corresponding deployment method is similar to that of a general frontend project written in VUE. Deployment steps:

1. Packaging: Execute the packaging command in the frontend boot project (e.g., ss-boot): `pnpm run build`
2. Upload the packaged dist package to the server and start it with nginx.
3. When starting with nginx, the nginx configuration is as follows:
```nginx
server {
  # Modify according to actual details
  listen 8090;
  # Modify according to actual details
  server_name 127.0.0.1;

  location / {
    # Modify according to actual details (path corresponding to frontend dist file)
    root /Users/wangxian/nginx/html/mis/v3/dist;
    try_files $uri $uri/ /index.html;
    index  index.html index.htm;
  }

  location /pamirs {
    # Modify according to actual details (backend interface address)
    proxy_pass http://127.0.0.1:8191;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
```
4. After modifying and saving the configuration, execute startup or restart to take effect.

# II. Application Upgrade
## (Ⅰ) Backend Upgrade
1. Obtain the corresponding version information; get the backend version information from the `backend version package information` in the update log. Usually, only the version number of oinone-bom needs to be concerned.
```xml
<!-- Platform foundation -->
<oinone.version>5.7.4.6</oinone.version>
```
2. Modify the `oinone.version` in the main `POM` of the backend project, and re-execute the `maven` update after modification.

## (Ⅱ) Frontend Upgrade
1. Obtain the corresponding version information; get the frontend version information from the `frontend version package information` in the update log.
2. Upgrade steps:
   Modify the version number of the `oinone` dependency in `package.json` and reinstall it.
   1. Modify the version of packages prefixed with `@kunlun` in `package.json` of `ss-admin-widget`, `ss-boot`, `ss-oinone`, `ss-project` (or more custom extended projects) to the version to be upgraded.
3. Finally, in the outermost package `ss-front-modules`, execute `pnpm run clean` to clear dependencies, and `pnpm install` to reinstall dependencies.

# III. Designer Upgrade
1. Obtain the corresponding version information; get the image information from the `image description` and `image pull` in the update log.
2. Find the Docker startup package on the server, usually `oinone-op-ds-all-full` or `oinone-op-ds-all-mini`, and modify the image version number in `startup.sh`. Example code is as follows:
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
3. The yml file of the designer is `config/application.yml` in the package. In most cases, upgrading does not require modifying `application.yml`; only in very few cases may it be necessary to modify `application.yml`, such as when a new module is added. In this case, the designer's version update log will have a clear description.
4. In actual projects, the middleware linked by the designer is required to be外置 (externalized) to the outside of the container, that is, deploy the `oinone-op-ds-all-mini` version.
5. If the package image name already exists, the old version of the image also needs to be deleted.
6. Execute `startup.sh`.