---
title: 项目部署：界面设计器的导入导出
index: true
category:
  - 常见解决方案
order: 81
next:
  text: 启动时：Oinone License 许可证使用常见问题
  link: /zh-cn/DevManual/FAQ/startup-oinone-license-usage-faq.md
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
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/81715839618_.pic_-20250530144827397.jpg)

## （一）按模块示例调用代码
```graphql
请求示例：
mutation {
    uiDesignerExportReqMutation {
        download/export(
            data: { module: "demo_core", fileName: "demo_meta", moduleBasics: false }
        ) {
            jsonUrl
        }
    }
}
```

+ **module 参数**：此参数代表模块编码，用于唯一标识特定的模块，在系统对不同模块进行区分与调用时发挥关键作用。
+ **fileName 参数**：该参数用于指定生成的 JSON 文件名称，通过明确文件名，方便对生成的文件进行识别、存储与管理。
+ **moduleBasics 参数**：此参数用于确定是否仅导出模块基础数据。若该参数取值为 `true`，系统将仅导出内置布局、模块菜单以及菜单关联的动作；若取值为 `false`，除上述基础数据外，还会导出模块内的所有页面，以及页面关联的动作元数据、页面设计数据等详细信息。该参数的默认值设定为 `false`。

## （二）按菜单导出
```graphql
mutation {
    uiDesignerExportReqMutation {
        download/export(
            data: {
                menu: { name: "uiMenu0000000000048001" }
                fileName: "demo_meta"
                relationViews: true
            }
        ) {
            jsonUrl
        }
    }
}
```

+ **menu 参数**：该参数为菜单对象，需指定菜单的 `name`。在此设定下，系统仅会导出所指定名称的菜单及其绑定页面，不会对其子菜单进行递归查询与导出。这一设置旨在精准获取特定菜单及其直接关联页面的数据，避免不必要的数据冗余，使数据导出更具针对性。
+ **fileName 参数**：此参数用于明确指定生成的 `json` 文件名称。通过准确命名，方便在后续操作中对该文件进行识别、定位和管理，确保数据存储与调用的高效性。
+ **relationViews 参数**：该参数用于确定是否导出关联页面。其默认值为 `false`，即默认情况下仅导出菜单关联的页面。若将此参数设置为 `true`，除了菜单关联的页面外，系统还会进一步导出该页面通过跳转动作关联的自定义页面。这一参数的设置为数据导出提供了灵活性，满足不同业务场景下对关联页面数据获取的需求。

## （三）指定页⾯导出
```graphql
mutation {
    uiDesignerExportReqMutation {
        download/export(
            data: {
                view: {
                    name: "xx_TABLE_0000000000119001"
                    model: "ui.designer.TestUiDesigner"
                }
                fileName: "demo_meta"
                relationViews: true
            }
        ) {
            jsonUrl
        }
    }
}
```

+ **view 参数**：此参数为视图对象，需明确指定视图的 `name` 和 `model`。通过给定这两个关键属性，能够精准定位和界定特定的视图，为后续的数据处理和操作提供明确的目标。
+ **fileName 参数**：用于指定生成的 `json` 文件名称。清晰准确的文件名有助于在系统中对生成的文件进行有效识别、存储与管理，方便后续对该文件内容的查找、调用及维护。
+ **relationViews 参数**：该参数用于确定是否导出关联页面。默认值设定为 `false`，这意味着在默认状态下，仅会导出与视图直接关联的菜单页面。若将此参数设置为 `true`，除了菜单关联的页面之外，还会进一步导出该页面通过跳转动作所关联的自定义页面。此参数设置为满足不同业务场景下对关联页面数据的差异化需求提供了灵活选择。

# 六、导出组件
## （一）导出全部组件数据
```graphql
mutation {
    uiDesignerExportReqMutation {
        downloadWidget/exportWidget(data: { fileName: "demo_widget" }) {
            jsonUrl
        }
    }
}

```

+ **fileName 参数**：该参数的作用是明确指定所生成的 `json` 文件的名称，通过精准设定文件名，能够便于对生成文件进行有效的识别、存储以及后续调用。
+ **注意事项**：需特别留意，自定义组件的元数据归属于页面设计器（`ui_designer`），这就表明在导入元数据时，其对应的模块（`module`）并非业务模块。鉴于此，在进行组件导入操作时，推荐采用 `pro.shushi.pamirs.metadata.manager.core.helper.WidgetInstallHelper`，以此确保组件导入过程的准确性与规范性。

## （二）导出全部组件⽂件
当开发环境与导入环境中的 OSS（对象存储服务）无法实现互通时，可借助以下方法导出自定义组件的 CSS 和 JS 文件压缩包。在导入过程中，系统支持指定 ZIP 文件上传至 OSS，并对导入组件数据中的 CSS 和 JS 文件路径进行相应替换。

```graphql
mutation {
    uiDesignerExportReqMutation {
        downloadWidgetFile/exportWidgetFile(data: { fileName: "demo_widget" }) {
            jsonUrl
        }
    }
}
```

# 七、业务工程中导入示例代码
导入元数据示例代码

```java
@Slf4j
@Order(Integer.MAX_VALUE-1)
@Component
public class DemoAppMetaInstall implements MetaDataEditor {

    @Autowired
    private ApplicationContext applicationContext;

    @Override
    public void edit(AppLifecycleCommand command, Map<String, Meta> metaMap) {
        if (!doImport()) {
            return;
        }
        log.info("[设计器业务元数据导⼊]");
        InitializationUtil bizInitializationUtil = InitializationUtil.get(metaMap, DemoModule.MODULE_MODULE/***改成⾃⼰的Module*/, DemoModule.MODULE_NAME/***改成⾃⼰的Module*/);
        DesignerInstallHelper.mateInitialization(bizInitializationUtil, "install/meta.json");

        log.info("[⾃定义组件元数据导⼊]");
        // 写法1: 将组件元数据导⼊到⻚⾯设计器. 只有在安装设计器的服务中执⾏才有效果
        WidgetInstallHelper.mateInitialization(metaMap, "install/widget.json");

        // 写法2: 与写法1相同效果. 只有在安装设计器的服务中执⾏才有效果
        //InitializationUtil uiInitializationUtil = InitializationUtil.get(metaMap, "ui_designer", "uiDesigner");
        //if (uiInitializationUtil != null) {
        //    DesignerInstallHelper.mateInitialization(uiInitializationUtil, "install/widget.json");
        //}
        // 写法3: 业务⼯程和设计器分布式部署,且希望通过业务⼯程导⼊⾃定义组件元数据. 业务模块需要依赖⻚⾯设计器模块,然后指定业务模块导⼊
        DesignerInstallHelper.mateInitialization(bizInitializationUtil, "install/widget.json");
    }

    private boolean doImport() {
        // ⾃定义导⼊判断. 避免⽤于设计的开发环境执⾏导⼊逻辑
        String[] envs = applicationContext.getEnvironment().getActiveProfiles();
        List<String> envList = Lists.newArrayList(envs);
        return CollectionUtils.isNotEmpty(envList) && (envList.contains("prod"));
    }
}

```

