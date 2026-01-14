---
title: 项目部署：数据可视化的导入导出
index: true
category:
  - 常见解决方案
order: 79
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
执行 GraphQL，直接返回导出数据。适用于通过浏览器直接下载文件。
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/91715840179_.pic_.jpg)

## （一）全部导出
请求示例：

```graphql
mutation {
    dataDesignerExportReqMutation {
        export(data: { fileName: "datavi_data" }) {
            jsonUrl
        }
    }
}
```

## （二）指定图表导出
请求示例：

```graphql
mutation {
    dataDesignerExportReqMutation {
        export(data: { chartCode: "CT00000000002000", fileName: "datavi_data" }) {
            jsonUrl
        }
    }
}
```

对应chartCode为图表的编码code，可通过查询数据库来获得
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/211716342220_.pic_-20250530144824320.jpg)

## （三）指定报表导出
请求示例：

```graphql
mutation {
    dataDesignerExportReqMutation {
        export(data: { reportCode: "RP00001000", fileName: "datavi_data" }) {
            jsonUrl
        }
    }
}
```

对应`reportCode`为报表的编码`code`，可通过查询数据库来获得
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/221716342429_.pic_-20250530144824441.jpg)

## （四）指定业务大屏导出
请求示例：

```graphql
mutation {
    dataDesignerExportReqMutation {
        export(data: { screenCode: "DS00001000", fileName: "datavi_data" }) {
            jsonUrl
        }
    }
}
```

对应`screenCode`为数据大屏的编码`code`，可通过查询数据库来获得
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/231716342583_.pic_-20250530144824507.jpg)

# 六、业务工程中导入示例代码
导入元数据示例代码

```java
@Slf4j
@Order(Integer.MAX_VALUE-1)
@Component
public class DemoModuleAppInstall implements MetaDataEditor, LifecycleCompletedAllInit {

    //流程设计器导出的页面元数据json
    private static final String INSTALL_DATAVI_META_PATH = "install/datavi_data.json";

    @Override
    public void edit(AppLifecycleCommand command, Map<String, Meta> metaMap) {
        if(StringUtils.isBlank(INSTALL_DATAVI_META_PATH)) return;
        log.info("开始安装-元数据");
        try {
            InitializationUtil util = InitializationUtil.get(metaMap, DemoModule.MODULE_MODULE, DemoModule.MODULE_NAME);
            if (null != util) {
                // 设计器的元数据
                if(StringUtils.isNotBlank(INSTALL_DATAVI_META_PATH)) {
                    log.info("开始安装图表元数据");
                    DesignerInstallHelper.mateInitialization(util, INSTALL_DATAVI_META_PATH, DemoModule.MODULE_MODULE,
                                                             DemoModule.MODULE_NAME);
                }
            }
        } catch (Exception e) {
            log.error("图表设计器元数据导入异常", e);
        }
    }

    @Override
    public void process(AppLifecycleCommand command, Map<String, ModuleDefinition> runModuleMap) {
        if(StringUtils.isNotBlank(INSTALL_DATAVI_META_PATH)) {
            log.info("开始安装-【图表】设计器数据");
            // 支持远程调用,但是执行的生命周期必须是LifecycleCompletedAllInit或之后. 本地如果安装了设计器,则没有要求
            DesignerInstallHelper.bizInitialization(INSTALL_DATAVI_META_PATH);
        }
    }
}
```

