---
title: Startup:Issues with Startup Dependency Errors
index: true
category:
  - Frequently Asked Questions (FAQ)
order: 2
---
# I. Scenario
The following error messages may appear during startup:
- The startup module contains JAR packages or modules that do not exist in the database.
- The startup module contains non-existent modules.
- The startup module's mutually exclusive modules include installed modules.

# II. Troubleshooting Items
1. Ensure that the modules listed in the `pamirs.boot.modules` configuration item of the `application.yml` file for the startup project have their corresponding JAR packages depended on in the `pom.xml` file.
2. Ensure that the path definitions in the `packagePrefix` method of the problematic module's definition file are correct. These paths can be multiple but must include all sub-project paths under the module, such as `api` sub-projects and `core` projects. Additionally, these paths should not overlap, intersect, or include paths from other modules (e.g., if module A uses `aa.bb.cc` and module B uses `aa.bb`, module B's path would include module A's).
   ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/FAQ/WX20240718-195049@2x-1024x632.png)
3. The `@ComponentScan.basePackages` annotation in the startup class (a Spring-built annotation) must include the paths of all dependent modules.
   ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/FAQ/WX20240718-195713@2x-1024x682.png)
4. When creating a code-free application, if a dependent module is configured but not locally installed, the module will encounter issues. Resolve this by either removing the dependency or adding the dependency to the code.