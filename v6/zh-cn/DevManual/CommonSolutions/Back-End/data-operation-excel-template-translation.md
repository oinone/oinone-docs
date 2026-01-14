---
title: 数据操作：Excel导入导出模板翻译
index: true
category:
  - 常见解决方案
order: 22
---

# 一、导出翻译项
与翻译的导出全部翻译项类似，只是该操作目前没有加入到页面交互中，需要通过工具发起后端服务请求，拿到导入导出翻译Excel模版，添加模版翻译项。（查看路径：文件--导出任务）

```graphql
mutation {
  excelExportTaskMutation {
    createExportTask(
      data: {
        workbookDefinition: {
          model: "file.ExcelWorkbookDefinition"
          name: "excelLocationTemplate"
        }
      }
    ) {
      name
    }
  }
}

variables:
{
  "path": "/file",
  "lang": "en-US"
}
```

:::warning 提示：

参数说明：（不在以下说明范围内的参数无需修改）

variables.lang：用于指定翻译项的目标语言编码，与【资源】-【语言】中的编码一致。

:::

# 二、导入翻译项
```graphql
mutation {
  excelImportTaskMutation {
    createImportTask(
      data: {
        workbookDefinition: {
          model: "file.ExcelWorkbookDefinition"
          name: "excelLocationTemplate"
        }
        file: {
          url: "翻译项URL链接"
        }
      }
    ) {
      name
    }
  }
}

variables:
{
  "path": "/file"
}
```

:::warning 提示：

将翻译项URL链接改为实际可访问的文件链接即可，可通过页面中任意文件上传的组件获取。

:::

