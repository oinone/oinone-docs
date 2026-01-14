---
title: 项目部署：流程设计器的导入导出
index: true
category:
  - 常见解决方案
order: 80
---

# 一、简介
在 oinone 5.1.0 及以上版本有两种方式进行设计的导入导出

1. 通过调用导出接口，将设计器的设计数据与元数据打包导出到文件中。
提供了`download/export`两类接口。
2. 使用平台提供的元数据在线发布功能。

# 二、依赖包
```xml
<dependency>
    <groupId>pro.shushi.pamirs.metadata.manager</groupId>
    <artifactId>pamirs-metadata-manager</artifactId>
</dependency>
```

# 三、安装GraphQL的工具
下载官网地址：[https://github.com/Kong/insomnia/releases](https://github.com/Kong/insomnia/releases)

# 四、登录gql
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/71715839574_.pic_.jpg)

## （一）示例调用代码
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

# 五、导出生成json文件
执行GraphQL，直接返回导出数据。适用于通过浏览器直接下载文件。
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/91715840179_.pic_.jpg)

## （一）指定模块导出
请求示例：

```graphql
mutation {
    workflowDesignerExportReqMutation {
        export(data: { module: "demo_core", fileName: "workflow_meta" }) {
            jsonUrl
        }
    }
}
```

## （二）指定流程编码导出
请求示例：

```graphql
mutation {
    workflowDesignerExportReqMutation {
        export(data: { workflowCode: "WF0000000000132500", fileName: "workflow_meta" }) {
            jsonUrl
        }
    }
}
```

# 六、业务工程中导入示例代码
导入元数据示例代码

```java
@Slf4j
@Order(Integer.MAX_VALUE-1)
@Component
public class DemoModuleAppInstall implements MetaDataEditor, LifecycleCompletedAllInit {
    //流程设计器导出的页面元数据json
    private static final String INSTALL_WORKFLOW_META_PATH = "install/workflow_meta.json";

    @Override
    public void edit(AppLifecycleCommand command, Map<String, Meta> metaMap) {
        if(StringUtils.isBlank(INSTALL_WORKFLOW_META_PATH)) return;
        log.info("开始安装-元数据");
        try {
            InitializationUtil util = InitializationUtil.get(metaMap, DemoModule.MODULE_MODULE, DemoModule.MODULE_NAME);
            if (null != util) {
                // 设计器的元数据
                if(StringUtils.isNotBlank(INSTALL_WORKFLOW_META_PATH)) {
                    log.info("开始安装流程设计器元数据");
                    DesignerInstallHelper.mateInitialization(util, INSTALL_WORKFLOW_META_PATH, DemoModule.MODULE_MODULE,
                                                             DemoModule.MODULE_NAME);
                }
            }
        } catch (Exception e) {
            log.error("初始化流程设计器导入异常", e);
        }
    }

    @Override
    public void process(AppLifecycleCommand command, Map<String, ModuleDefinition> runModuleMap) {
        if(StringUtils.isNotBlank(INSTALL_WORKFLOW_META_PATH)) {
            log.info("开始安装-流程设计器数据");
            // 支持远程调用,但是执行的生命周期必须是LifecycleCompletedAllInit或之后. 本地如果安装了设计器,则没有要求
            DesignerInstallHelper.bizInitialization(INSTALL_WORKFLOW_META_PATH);
        }
    }
}
```

# 七、生产环境使用启动设计器
在生产环境中，若尚未部署设计器的 Docker 镜像，可下载我方提供的 `oinone - op - ds - all - mini - workflow` 镜像，以此来单独安装流程设计器。

鉴于此次导入的数据为流程设计器相关数据，因此需在流程设计器内对流程进行编辑操作。在此过程中，应妥善设置相关人员信息以及自定义函数，以确保流程的顺畅运行与功能的有效实现。

