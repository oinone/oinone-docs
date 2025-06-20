---
title: Dependency Configuration:How to Add Data Visualization Runtime Dependencies
index: true
category:
  - Common Solutions
order: 1
prev:
  text: Routing Extension:Add New Routes, Such as Overriding the Default Login Page
  link: /en/DevManual/CommonSolutions/Front-End/router-extension-add-new-route-override-login.md
---

# 一、Frontend
1. Add the dependency `@kunlun/data-designer-open-pc` in `package.json` with the same version as `@kunlun/dependencies`.
2. Import the dependency in `src/main.ts`:

```typescript
import 'reflect-metadata';
import { VueOioProvider } from '@kunlun/dependencies';

// START Import code after importing @kunlun/dependencies
import '@kunlun/data-designer-open-pc';
// END Import code before executing VueOioProvider()

VueOioProvider({
    // TODO
});
```

# 二、Backend
## （一）Add Dependencies to Parent pom
```xml
<!-- Platform Basics -->
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

## （二）Add Dependencies to pom of Boot Startup Project
```xml
<dependency>
    <groupId>pro.shushi.pamirs.data.visualization</groupId>
    <artifactId>pamirs-data-visualization-core</artifactId>
</dependency>
```

## （三）Add Dependencies to application.yml Configuration
```yaml
pamirs:
  boot:
    modules:
      - datavi
```

:::info Note:

The `datavi` module must use consistent data sources in both business projects and the designer.

:::