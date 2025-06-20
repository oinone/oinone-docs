---
title: Data Operation：Excel Import/Export Template Translation
index: true
category:
  - Common Solutions
order: 22
---

# 1. Export Translation Items
Similar to exporting all translation items for translation, this operation is not currently integrated into the page interaction. You need to initiate a backend service request through a tool to obtain the Excel template for import/export translations and then add template translation items. (View path: File --> Export Task)

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

:::warning Note:

Parameter Description: (Parameters not within the scope of the following description do not need to be modified)

variables.lang: Used to specify the target language code for translation items, which should be consistent with the codes in 【Resources】-【Languages】.

:::

# 2. Import Translation Items
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
          url: "Translation Item URL Link"
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

:::warning Note:

Replace the "Translation Item URL Link" with an actual accessible file link, which can be obtained through any file upload component on the page.

:::