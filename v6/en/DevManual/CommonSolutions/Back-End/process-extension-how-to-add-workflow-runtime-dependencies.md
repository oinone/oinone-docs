---
title: Process Extension:How to Add Workflow Runtime Dependencies
index: true
category:
  - Common Solutions
order: 51
---

# I. Frontend
1. Add the dependency `@oinone/kunlun-workflow` in `package.json`, and use the same version as `@oinone/kunlun-dependencies`.
2. Import the dependency in `src/main.ts`.

```typescript
import 'reflect-metadata';
import { VueOioProvider } from '@oinone/kunlun-dependencies';

// START Import code after importing @oinone/kunlun-dependencies
import '@oinone/kunlun-workflow/dist/kunlun-workflow.css';
import '@oinone/kunlun-workflow';
// END Import code before executing the VueOioProvider() method

VueOioProvider({
    // TODO
});
```

# II. Backend

## (Ⅰ) Add Dependencies to Parent pom
The version numbers in the following example are for reference only. Please select the correct version according to the current framework version.

```xml
<!-- Platform foundation -->
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

## (Ⅱ) Add Dependencies to the pom of the Boot Startup Project

```xml
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

## (Ⅲ) Add Dependencies to application.yml Configuration

```yaml
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