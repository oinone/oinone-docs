---
title: Project Deployment:Import and Export of UI Designer
index: true
category:
  - Common Solutions
order: 81
next:
  text: Startup:Common Issues with Oinone License Usage
  link: /en/DevManual/FAQ/startup-oinone-license-usage-faq.md
---

# I. Introduction
In oinone 5.1.0 and above, there are two ways to import and export designs:

1. Export design data and metadata from the designer to a file by calling the export interface, which provides `download/export` types of interfaces.
2. Use the metadata online publishing function provided by the platform.

# II. Dependency Package
``` xml
<dependency>
    <groupId>pro.shushi.pamirs.metadata.manager</groupId>
    <artifactId>pamirs-metadata-manager</artifactId>
</dependency>
```

# III. Install GraphQL Tool
Download address: [https://github.com/Kong/insomnia/releases](https://github.com/Kong/insomnia/releases)

# IV. Log in to GQL
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/71715839574_.pic_.jpg)

## (Ⅰ) Example Call Code
``` graphql
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

# V. Export to Generate JSON File
Execute GraphQL to directly return export data, suitable for downloading files through a browser.
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/81715839618_.pic_-20250530144827397.jpg)

## (Ⅰ) Example Call Code by Module
``` graphql
Request example:
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

- **module parameter**: This parameter represents the module code, used to uniquely identify a specific module, playing a key role in system differentiation and invocation of different modules.
- **fileName parameter**: This parameter is used to specify the name of the generated JSON file. By defining the file name, it facilitates the identification, storage, and management of the generated file.
- **moduleBasics parameter**: This parameter determines whether to export only module basic data. If the parameter value is `true`, the system will only export built-in layouts, module menus, and actions associated with menus. If the value is `false`, in addition to the above basic data, it will also export all pages within the module, as well as detailed information such as action metadata and page design data associated with the pages. The default value of this parameter is set to `false`.

## (Ⅱ) Export by Menu
``` graphql
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

- **menu parameter**: This parameter is a menu object, requiring the specification of the menu's `name`. Under this setting, the system will only export the specified named menu and its bound pages, without recursively querying and exporting its submenus. This setting aims to accurately obtain data for specific menus and their directly associated pages, avoiding unnecessary data redundancy and making data export more targeted.
- **fileName parameter**: This parameter is used to clearly specify the name of the generated `json` file. Accurate naming facilitates the identification, positioning, and management of the file in subsequent operations, ensuring the efficiency of data storage and invocation.
- **relationViews parameter**: This parameter determines whether to export associated pages, with a default value of `false`, meaning only pages associated with the menu are exported by default. If this parameter is set to `true`, in addition to the menu-associated pages, the system will further export custom pages associated with the page through jump actions. This parameter setting provides flexibility for data export to meet the needs of obtaining associated page data in different business scenarios.

## (Ⅲ) Specified Page Export
``` graphql
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

- **view parameter**: This parameter is a view object, requiring clear specification of the view's `name` and `model`. By providing these two key attributes, it can accurately locate and define a specific view, providing a clear target for subsequent data processing and operations.
- **fileName parameter**: Used to specify the name of the generated `json` file. A clear and accurate file name helps effectively identify, store, and manage the generated file in the system, facilitating subsequent searching, calling, and maintenance of the file content.
- **relationViews parameter**: This parameter determines whether to export associated pages, with the default value set to `false`, meaning that by default, only menu pages directly associated with the view are exported. If this parameter is set to `true`, in addition to menu-associated pages, it will further export custom pages associated with the page through jump actions. This parameter setting provides flexible choices to meet the differentiated needs of associated page data in different business scenarios.

# VI. Export Components

## (Ⅰ) Export All Component Data
``` graphql
mutation {
    uiDesignerExportReqMutation {
        downloadWidget/exportWidget(data: { fileName: "demo_widget" }) {
            jsonUrl
        }
    }
}
```

- **fileName parameter**: The role of this parameter is to clearly specify the name of the generated `json` file. By precisely setting the file name, it is convenient for effective identification, storage, and subsequent invocation of the generated file.
- **Note**: It should be particularly noted that the metadata of custom components belongs to the page designer (`ui_designer`), which means that when importing metadata, the corresponding module (`module`) is not a business module. In view of this, when importing components, it is recommended to use `pro.shushi.pamirs.metadata.manager.core.helper.WidgetInstallHelper` to ensure the accuracy and standardization of the component import process.

## (Ⅱ) Export All Component Files
When the OSS (Object Storage Service) in the development environment and the import environment cannot communicate with each other, the following method can be used to export the CSS and JS file compression packages of custom components. During the import process, the system supports specifying a ZIP file to upload to OSS and correspondingly replacing the CSS and JS file paths in the imported component data.

``` graphql
mutation {
    uiDesignerExportReqMutation {
        downloadWidgetFile/exportWidgetFile(data: { fileName: "demo_widget" }) {
            jsonUrl
        }
    }
}
```

# VII. Example Code for Import in Business Projects
Example code for importing metadata:

``` java
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
        log.info("[Import of designer business metadata]");
        InitializationUtil bizInitializationUtil = InitializationUtil.get(metaMap, DemoModule.MODULE_MODULE/***Change to your own Module*/, DemoModule.MODULE_NAME/***Change to your own Module*/);
        DesignerInstallHelper.mateInitialization(bizInitializationUtil, "install/meta.json");

        log.info("[Import of custom component metadata]");
        // Method 1: Import component metadata into the page designer. Only effective when executed in the service where the designer is installed
        WidgetInstallHelper.mateInitialization(metaMap, "install/widget.json");

        // Method 2: Same effect as Method 1. Only effective when executed in the service where the designer is installed
        //InitializationUtil uiInitializationUtil = InitializationUtil.get(metaMap, "ui_designer", "uiDesigner");
        //if (uiInitializationUtil != null) {
        //    DesignerInstallHelper.mateInitialization(uiInitializationUtil, "install/widget.json");
        //}
        // Method 3: Distributed deployment of business projects and designers, and希望通过业务工程导入自定义组件元数据. The business module needs to depend on the page designer module, then specify the business module for import
        DesignerInstallHelper.mateInitialization(bizInitializationUtil, "install/widget.json");
    }

    private boolean doImport() {
        // Custom import judgment to avoid executing import logic in the development environment for design
        String[] envs = applicationContext.getEnvironment().getActiveProfiles();
        List<String> envList = Lists.newArrayList(envs);
        return CollectionUtils.isNotEmpty(envList) && (envList.contains("prod"));
    }
}
```