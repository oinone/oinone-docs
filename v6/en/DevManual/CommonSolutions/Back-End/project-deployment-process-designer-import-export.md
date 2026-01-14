---
title: Project Deployment:Import and Export of Workflow Designer
index: true
category:
  - Common Solutions
order: 80
---

# I. Introduction
In oinone 5.1.0 and above versions, there are two ways to import and export designs:

1. Export design data and metadata from the designer to a file by calling the export interface, which provides `download/export` two types of interfaces.
2. Use the metadata online publishing function provided by the platform.

# II. Dependency Package
```xml
<dependency>
    <groupId>pro.shushi.pamirs.metadata.manager</groupId>
    <artifactId>pamirs-metadata-manager</artifactId>
</dependency>
```

# III. Install GraphQL Tool
Download from the official website: [https://github.com/Kong/insomnia/releases](https://github.com/Kong/insomnia/releases)

# IV. Log in to GQL
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/71715839574_.pic_.jpg)

## (I) Example Call Code
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

# V. Export and Generate JSON File
Execute GraphQL to directly return export data, suitable for downloading files directly via browser.
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/91715840179_.pic_.jpg)

## (I) Specify Module Export
Request example:
```graphql
mutation {
    workflowDesignerExportReqMutation {
        export(data: { module: "demo_core", fileName: "workflow_meta" }) {
            jsonUrl
        }
    }
}
```

## (II) Specify Workflow Code Export
Request example:
```graphql
mutation {
    workflowDesignerExportReqMutation {
        export(data: { workflowCode: "WF0000000000132500", fileName: "workflow_meta" }) {
            jsonUrl
        }
    }
}
```

# VI. Import Example Code in Business Project
Example code for importing metadata:
```java
@Slf4j
@Order(Integer.MAX_VALUE-1)
@Component
public class DemoModuleAppInstall implements MetaDataEditor, LifecycleCompletedAllInit {
    // Workflow designer exported page metadata JSON
    private static final String INSTALL_WORKFLOW_META_PATH = "install/workflow_meta.json";

    @Override
    public void edit(AppLifecycleCommand command, Map<String, Meta> metaMap) {
        if(StringUtils.isBlank(INSTALL_WORKFLOW_META_PATH)) return;
        log.info("Starting installation - metadata");
        try {
            InitializationUtil util = InitializationUtil.get(metaMap, DemoModule.MODULE_MODULE, DemoModule.MODULE_NAME);
            if (null != util) {
                // Designer metadata
                if(StringUtils.isNotBlank(INSTALL_WORKFLOW_META_PATH)) {
                    log.info("Starting installation of workflow designer metadata");
                    DesignerInstallHelper.mateInitialization(util, INSTALL_WORKFLOW_META_PATH, DemoModule.MODULE_MODULE,
                                                             DemoModule.MODULE_NAME);
                }
            }
        } catch (Exception e) {
            log.error("Initialization workflow designer import exception", e);
        }
    }

    @Override
    public void process(AppLifecycleCommand command, Map<String, ModuleDefinition> runModuleMap) {
        if(StringUtils.isNotBlank(INSTALL_WORKFLOW_META_PATH)) {
            log.info("Starting installation - workflow designer data");
            // Support remote calls, but the executed lifecycle must be LifecycleCompletedAllInit or later. No requirement if the designer is installed locally
            DesignerInstallHelper.bizInitialization(INSTALL_WORKFLOW_META_PATH);
        }
    }
}
```

# VII. Start Designer in Production Environment
In the production environment, if the Docker image of the designer has not been deployed, you can download the `oinone-op-ds-all-mini-workflow` image provided by us to install the workflow designer separately.

Since the imported data is related to the workflow designer, the workflow needs to be edited within the workflow designer. During this process, relevant personnel information and custom functions should be properly set to ensure the smooth operation of the workflow and the effective realization of functions.