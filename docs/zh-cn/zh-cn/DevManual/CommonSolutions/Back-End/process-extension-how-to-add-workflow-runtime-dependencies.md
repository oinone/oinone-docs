---
title: 流程扩展：如何添加工作流运行时依赖
index: true
category:
  - 常见解决方案
order: 51
---

# 一、前端
1. `package.json`中新增依赖 `@oinone/kunlun-workflow`,版本跟`@oinone/kunlun-dependencies`的填一样
2. `src/main.ts`内导入依赖

``` typescript
import 'reflect-metadata';
import { VueOioProvider } from '@oinone/kunlun-dependencies';

// START 导入代码放在导入@oinone/kunlun-dependencies之后
import '@oinone/kunlun-workflow/dist/kunlun-workflow.css';
import '@oinone/kunlun-workflow';
// END 导入代码放在VueOioProvider()方法执行前

VueOioProvider({
    // TODO
});
```

# 二、后端
## （一）父 pom 新增依赖，下面例子中的版本号仅供参考，请根据当前框架版本正确选择版本
``` xml
<!-- 平台基础 -->
<oinone.version>5.3.5</oinone.version>

<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>pro.shushi</groupId>
            <artifactId>oinone-bom</artifactId>
            <version>${oinone.version}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

## （二）boot启动工程的pom新增依赖
``` xml
<dependency>
    <groupId>pro.shushi.pamirs.core</groupId>
    <artifactId>pamirs-sql-record-core</artifactId>
</dependency>
<dependency>
    <groupId>pro.shushi.pamirs.core</groupId>
    <artifactId>pamirs-trigger-core</artifactId>
</dependency>
<dependency>
    <groupId>pro.shushi.pamirs.core</groupId>
    <artifactId>pamirs-trigger-bridge-tbschedule</artifactId>
</dependency>
<dependency>
    <groupId>pro.shushi.pamirs.core</groupId>
    <artifactId>pamirs-user-core</artifactId>
</dependency>
<dependency>
    <groupId>pro.shushi.pamirs.core</groupId>
    <artifactId>pamirs-user-view</artifactId>
</dependency>
<dependency>
    <groupId>pro.shushi.pamirs.core</groupId>
    <artifactId>pamirs-auth3-core</artifactId>
</dependency>
<dependency>
    <groupId>pro.shushi.pamirs.core</groupId>
    <artifactId>pamirs-auth3-view</artifactId>
</dependency>
<dependency>
    <groupId>pro.shushi.pamirs.core</groupId>
    <artifactId>pamirs-business-core</artifactId>
</dependency>
<dependency>
    <groupId>pro.shushi.pamirs.core</groupId>
    <artifactId>pamirs-business-view</artifactId>
</dependency>
<dependency>
    <groupId>pro.shushi.pamirs.workflow</groupId>
    <artifactId>pamirs-workflow-core</artifactId>
</dependency>
<dependency>
    <groupId>pro.shushi.pamirs.work.bench</groupId>
    <artifactId>pamirs-work-bench-core</artifactId>
</dependency>
<dependency>
    <groupId>pro.shushi.pamirs.work.bench</groupId>
    <artifactId>pamirs-work-bench-view</artifactId>
</dependency>

```

## （三）application.yml配置新增依赖
``` yaml
pamirs:
  boot:
    modules:
      - user
      - auth
      - business
      - sql_record
      - trigger
      - workflow
```

