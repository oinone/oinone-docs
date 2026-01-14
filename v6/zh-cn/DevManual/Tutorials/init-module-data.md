---
title: 模块数据初始化（Init Module Data）
index: true
category:
  - 研发手册
  - 教程
order: 5

---
:::warning 提示

本教程是 “后端框架教程” 的延伸。请确保你已完成该教程，并以你构建的 “费用管理（expenses）” 模块作为本教程练习的基础。

:::

# 一、业务数据初始化

参考：与此主题相关的文档可在 “[模块生命周期](/zh-cn/DevManual/Reference/Back-EndFramework/module-API.md#三、模块生命周期)” 中找到。

:::info 目标：在本节结束时：

1. 项目类型 `expenses.ProjectType` 模型的表格视图中增加一条固定记录。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/module-data-initialization/result.png)

:::

主数据通常是模块技术或业务需求的一部分。换句话说，这类数据对于模块的正常运行往往至关重要。在安装模块时，这些数据会一同被安装。我们之前定义视图和动作时已经接触过技术数据，它们就是主数据的一种。除了技术数据，还可以定义业务数据，例如国家、货币、计量单位，以及完整的国家本地化数据（法定报告、税收定义、会计科目表）等等。例如：

```java
@Component
public class ExpensesModuleBizDataInit implements InstallDataInit, UpgradeDataInit, ReloadDataInit {

    /**
     * 安装指令执行逻辑
     * @param command 应用生命周期命令
     * @param version 当前版本号
     * @return 安装操作是否成功
     */
    @Override
    public boolean init(AppLifecycleCommand command, String version) {
        // 此处抛出异常，可根据实际需求替换为具体的安装逻辑
        throw PamirsException.construct(ExpensesExpEnum.SYSTEM_ERROR).appendMsg("ExpensesModuleBizDataInit: install").errThrow();
        // 示例：安装指令执行逻辑
        // return Boolean.TRUE;
    }

    /**
     * 重新加载指令执行逻辑
     * @param command 应用生命周期命令
     * @param version 当前版本号
     * @return 重新加载操作是否成功
     */
    @Override
    public boolean reload(AppLifecycleCommand command, String version) {
        // 此处抛出异常，可根据实际需求替换为具体的重新加载逻辑
        throw PamirsException.construct(ExpensesExpEnum.SYSTEM_ERROR).appendMsg("ExpensesModuleBizDataInit: reload").errThrow();
        // 示例：重启指令执行逻辑
        // return Boolean.TRUE;
    }

    /**
     * 升级指令执行逻辑
     * @param command 应用生命周期命令
     * @param version 当前版本号
     * @param existVersion 现有版本号
     * @return 升级操作是否成功
     */
    @Override
    public boolean upgrade(AppLifecycleCommand command, String version, String existVersion) {
        // 此处抛出异常，可根据实际需求替换为具体的升级逻辑
        throw PamirsException.construct(ExpensesExpEnum.SYSTEM_ERROR).appendMsg("ExpensesModuleBizDataInit: upgrade").errThrow();
        // 示例：升级指令执行逻辑
        // return Boolean.TRUE;
    }

    /**
     * 指定该初始化类匹配的模块
     * @return 匹配的模块编码列表
     */
    @Override
    public List<String> modules() {
        return Collections.singletonList(ExpensesModule.MODULE_MODULE);
    }

    /**
     * 设置执行优先级
     * @return 执行优先级
     */
    @Override
    public int priority() {
        return 0;
    }
}
```

该类实现 `InstallDataInit`、`UpgradeDataInit` 和 `ReloadDataInit` 接口。这三个接口分别对应不同的业务初始化场景：

+ `InstallDataInit` 接口对应安装（`init`）操作。
+ `UpgradeDataInit` 接口对应升级（`upgrade`）操作。
+ `ReloadDataInit` 接口对应重新加载（`reload`）操作。

此外，`modules` 方法用于指定该初始化类与哪些模块匹配，匹配依据为模块编码；`priority` 方法用于设置执行优先级。

> **练习（Exercise）**
>
> 为 `expenses.ProjectType` 模型，并添加一条数据记录，其名称为“基建类”



