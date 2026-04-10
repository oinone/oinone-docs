---
title: 章节 2：新建一个应用（A New Application）
index: true
category:
  - 研发手册
  - 教程
  - 后端框架
order: 2

---
# 一、概述
参考：与此主题相关的文档可在 “[模块定义](/zh/DevManual/Reference/Back-EndFramework/module-API.md#841e2484)” 中找到。

本章的目的是为创建一个全新的 Oinone 模块奠定基础。我们将从零开始，仅使用让 Oinone 识别我们模块所需的最少元素。在接下来的章节中，我们将逐步添加功能，以构建一个真实可行的业务案例。

# 二、费用管理模块（expenses）
我们的新模块将涵盖一个大家熟悉的业务领域，正因如此，它不在 Oinone 提供的基础模块集范围内，这个领域就是费用管理。值得注意的是，Oinone 不做上层业务场景，只提供与业务无关的基础能力。

以下是包含一些费用管理-项目信息的主列表视图概述：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-2/expenses1.png)

表单视图的顶部区域汇总了项目的重要信息，比如项目名称、状态、已经报销金额、项目等级等等。第一个标签页包含了描述该项目信息有关预算相关的信息：人员投入规模、人均预算、项目预算、开始时间等。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-2/expenses2.png)

第四个标签页列出了该项目关联的报销单。如费用项、事由、报销金额、报销状态等。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-2/expenses3.png)

# 三、如何新建费用模块
## （一）构建费用模块对应的java工程
### 1、构建父模块trutorials-expenses
在 `oinone-backend-tutorials` 目录中，在该目录下打开终端，执行以下命令创建新的模块，这里以 `trutorials-expenses` 为例：

``` bash
cd oinone-backend-tutorials
mvn archetype:generate -DgroupId=pro.shushi.oinone.trutorials -DartifactId=trutorials-expenses -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false -Dversion=1.0.0-SNAPSHOT
```

+ `groupId`：通常是公司或组织的域名倒写，这里使用 `pro.shushi.oinone.trutorials` 作为示例。
+ `artifactId`：模块的名称，即 `trutorials-expenses`。
+ `archetypeArtifactId`：使用 `maven-archetype-quickstart` 快速创建一个简单的 Maven 项目结构。

:::info 注意：提醒读者关注某一信息或细节

虽然默认的 `maven-archetype-quickstart` 骨架创建的是 `jar` 类型项目，但可以使用专门为聚合模块设计的骨架，不过 Maven 官方没有直接提供标准的聚合模块骨架，你可以自定义骨架或者搜索社区中可用的相关骨架。

这里我们手工配置下pom.xml文件

:::

### 2、配置父模块pom.xml文件
在 `trutorials-expenses` 目录下找到 `pom.xml` 文件，将其 `packaging` 标签设置为 `pom`，表示这是一个聚合模块。同时添加 `modules` 标签来包含子模块：

``` bash
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>pro.shushi.oinone.trutorials</groupId>
        <artifactId>oinone-trutorials</artifactId>
        <version>1.0.0-SNAPSHOT</version>
    </parent>
    <groupId>pro.shushi.oinone.trutorials</groupId>
    <artifactId>trutorials-expenses</artifactId>
    <version>1.0.0-SNAPSHOT</version>
    <packaging>pom</packaging>

    <modules>
    </modules>

</project>
```

:::info 注意

trutorials-expenses作为父模块即聚合模块，可以手动删除下无用的src文件夹

:::

### 3、创建子模块
在 `trutorials-expenses` 目录下，分别创建 `api` 和 `core` 子模块：

``` bash
cd trutorials-expenses
mvn archetype:generate -DgroupId=pro.shushi.oinone.trutorials -DartifactId=trutorials-expenses-api -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false -Dversion=1.0.0-SNAPSHOT
mvn archetype:generate -DgroupId=pro.shushi.oinone.trutorials -DartifactId=trutorials-expenses-core -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false -Dversion=1.0.0-SNAPSHOT
```

### 4、配置各个模块pom依赖

`oinone-backend-tutorials`  目录下找到 `pom.xml` 文件,在其`dependencyManagement` 标签下，增加依赖管理：`trutorials-expenses-api` 和`trutorials-expenses-core`
``` plain
<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>pro.shushi.oinone.trutorials</groupId>
      <artifactId>trutorials-expenses-api</artifactId>
      <version>${project.version}</version>
    </dependency>
    <dependency>
      <groupId>pro.shushi.oinone.trutorials</groupId>
      <artifactId>trutorials-expenses-core</artifactId>
      <version>${project.version}</version>
    </dependency>
  </dependencies>
</dependencyManagement>
```

`trutorials-expenses`  目录下找到 `pom.xml` 文件,在其`dependencyManagement` 标签下，增加依赖管理：`trutorials-expenses-api` 和`trutorials-expenses-core`
``` plain
<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>pro.shushi.oinone.trutorials</groupId>
      <artifactId>trutorials-expenses-api</artifactId>
      <version>${project.version}</version>
    </dependency>
    <dependency>
      <groupId>pro.shushi.oinone.trutorials</groupId>
      <artifactId>trutorials-expenses-core</artifactId>
      <version>${project.version}</version>
    </dependency>
  </dependencies>
</dependencyManagement>

```

 `trutorials-expenses-api`  目录下找到 `pom.xml` 文件,在其`dependencys` 标签下，增加依赖：`pamirs-base-standard`
 ``` plain
<dependencies>
    <dependency>
        <groupId>pro.shushi.pamirs.boot</groupId>
        <artifactId>pamirs-base-standard</artifactId>
    </dependency>
</dependencies>
```

`trutorials-expenses-core`  目录下找到 `pom.xml` 文件,在其`dependencys` 标签下，增加依赖：`trutorials-expenses-api`
``` plain
<dependencies>
  <dependency>
    <groupId>pro.shushi.oinone.trutorials</groupId>
    <artifactId>trutorials-expenses-api</artifactId>
  </dependency>
</dependencies>
```
`trutorials-boot`  目录下找到 `pom.xml` 文件,在其`dependencys` 标签下，增加依赖：`trutorials-expenses-core`
``` plain
<dependencies>
  <dependency>
      <groupId>pro.shushi.oinone.trutorials</groupId>
      <artifactId>trutorials-expenses-core</artifactId>
  </dependency>
</dependencies>
```

到此expenses模块对应的工程都建完了，它跟普通的java工程无异。

## （二）定义Oinone的费用模块
### 1、创建 `package`
在 `trutorials-expenses-api`  模块的 `src/main/java` 目录下，按照 `pro/shushi/oinone/trutorials/expenses/api` 的层级结构创建文件夹，以构建指定的 `package`。

### 2、创建 `ExpensesModule` 类
在 `pro.shushi.oinone.trutorials.expenses.api` 这个 `package` 下创建 `ExpensesModule` 类，下面是完整的代码：

``` java
package pro.shushi.oinone.trutorials.expenses.api;

import org.springframework.stereotype.Component;
import pro.shushi.pamirs.meta.annotation.Module;
import pro.shushi.pamirs.meta.base.PamirsModule;
import pro.shushi.pamirs.meta.common.constants.ModuleConstants;

@Component
@Module(
    name = ExpensesModule.MODULE_NAME,
    displayName = "费用管理",
    version = "1.0.0",
    priority = 1,
    dependencies = {ModuleConstants.MODULE_BASE}
)
@Module.module(ExpensesModule.MODULE_MODULE)
@Module.Advanced(selfBuilt = true, application = true)
public class ExpensesModule implements PamirsModule {

    public static final String MODULE_MODULE = "expenses";

    public static final String MODULE_NAME = "expenses";

    @Override
    public String[] packagePrefix() {
        return new String[]{
            "pro.shushi.oinone.trutorials.expenses"
        };
    }
}
```

代码解释

+ **`package`声明**：`package pro.shushi.oinone.trutorials.expenses.api;` 明确了该类所属的 `package`。
+ **导入必要的类**：引入了 Spring 的 `@Component` 注解以及自定义模块相关的注解和接口。
+ **类定义**：`ExpensesModule` 类实现了 `PamirsModule` 接口。
+ **注解使用**：
    - `@Component`：将该类标记为 Spring 的组件，以便 Spring 能够自动扫描并管理它。
    - `@Module`：用于定义模块的元数据，包含模块名称、显示名称、版本、优先级和依赖项等信息。
    - `@Module.module`：指定模块的标识。
    - `@Module.Advanced`：设置模块的高级属性，如是否为自建模块、是否为应用模块。
+ **常量定义**：定义了 `MODULE_MODULE` 和 `MODULE_NAME` 常量，分别表示模块的标识和名称。

| 属性 | 默认取值规则 | 命名规范 |
| --- | --- | --- |
| module | 无默认值<br/>开发人员定义规范示例：<br/>{项目名称}_\{模块功能示意名称\} | 1. 使用下划线命名法<br/>2. 仅支持数字、大写或小写字母、下划线<br/>3. 必须以字母开头<br/>4. 不能以下划线结尾<br/>5. 长度必须大于等4且小于等于128个字符 |
| name | 无默认值 | 1. 使用大驼峰命名法<br/>2. 仅支持数字、字母<br/>3. 必须以字母开头<br/>4. 长度必须小于等于128个字符 |


+ **方法实现**：`packagePrefix()` 方法返回该模块所包含的 `package` 前缀数组。

:::info 注意

@Module.Advanced的application属性配置模块是否为应用（具有视觉交互页面的模块）。非应用模块没有交互入口。

:::

:::danger 警告

模块包路径由packagePrefix方法返回，如果不同Oinone模块包含相同的包路径，会导致元数据加载出问题。

:::

## （三）配置启动工程的YAML文件
在 `trutorials-boot`  工程的 `src/main/resource/config` 目录下提供的 `application-dev.yml` 配置文件中添加与 `expenses` 模块相关的配置。在 `pamirs.boot.modules` 列表里追加引入`expenses` 模块，同时在 `pamirs.framework.data.ds-map` 中也追加对应的数据源映射。

``` java
pamirs:
  framework:
    data:
      ds-map:
        expenses: biz
  boot:
    modules:
      - expenses
```

:::info 注意

通过trutorials-boot启动前，注意检查应用的端口号与中间件的ip。参考[安装与升级](/zh/InstallOrUpgrade/README.md)章节对应安装模式中关于YAML文件的配置内容

:::

系统重启会安装这个模块！但很明显它只是一个空壳，所以不会出现任何菜单。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-2/null.png)

:::warning 提示

默认管理员的登陆账号与密码为：admin\admin

:::

:::danger 警告

如果启动报错，请优先检查数据库安装是否正确，[数据库配置常见问题](/zh/InstallOrUpgrade/Dev-ENV/MySQL-setup.md)

:::

一切都没问题了吗？如果是，那么让我们来创建我们的第一个模型吧！




