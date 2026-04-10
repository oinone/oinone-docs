---
title: Init Module Data
index: true
category:
  - Development Manual
  - Tutorials
order: 6

---
:::warning Tip

This tutorial extends the "Back-end Framework Tutorial". Please ensure you have completed that tutorial and use the "Expense Management (expenses)" module you built as the basis for this tutorial's exercises.

:::

# I. Business Data Initialization

Reference: Documentation related to this topic can be found in "[Module Lifecycle](/en/DevManual/Reference/Back-EndFramework/module-API.md#86204319)".

:::info Objectives: By the end of this section:

1. Add a fixed record to the table view of the `expenses.ProjectType` model for project types.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/module-data-initialization/result.png)

:::

Master data typically forms part of a module's technical or business requirements. In other words, such data is often critical for the normal operation of the module, installed alongside the module itself. We have previously encountered technical data when defining views and actions, which constitutes a type of master data. In addition to technical data, business data can also be defined, such as countries, currencies, units of measurement, and complete national localization data (statutory reports, tax definitions, chart of accounts), etc. For example:

``` java
@Component
public class ExpensesModuleBizDataInit implements InstallDataInit, UpgradeDataInit, ReloadDataInit {

    /**
     * Execution logic for the installation command
     * @param command Application lifecycle command
     * @param version Current version number
     * @return Whether the installation operation was successful
     */
    @Override
    public boolean init(AppLifecycleCommand command, String version) {
        // Throws an exception here; replace with specific installation logic as needed
        throw PamirsException.construct(ExpensesExpEnum.SYSTEM_ERROR).appendMsg("ExpensesModuleBizDataInit: install").errThrow();
        // Example: Installation command execution logic
        // return Boolean.TRUE;
    }

    /**
     * Execution logic for the reload command
     * @param command Application lifecycle command
     * @param version Current version number
     * @return Whether the reload operation was successful
     */
    @Override
    public boolean reload(AppLifecycleCommand command, String version) {
        // Throws an exception here; replace with specific reload logic as needed
        throw PamirsException.construct(ExpensesExpEnum.SYSTEM_ERROR).appendMsg("ExpensesModuleBizDataInit: reload").errThrow();
        // Example: Reload command execution logic
        // return Boolean.TRUE;
    }

    /**
     * Execution logic for the upgrade command
     * @param command Application lifecycle command
     * @param version Current version number
     * @param existVersion Existing version number
     * @return Whether the upgrade operation was successful
     */
    @Override
    public boolean upgrade(AppLifecycleCommand command, String version, String existVersion) {
        // Throws an exception here; replace with specific upgrade logic as needed
        throw PamirsException.construct(ExpensesExpEnum.SYSTEM_ERROR).appendMsg("ExpensesModuleBizDataInit: upgrade").errThrow();
        // Example: Upgrade command execution logic
        // return Boolean.TRUE;
    }

    /**
     * Specifies the modules matched by this initialization class
     * @return List of matched module codes
     */
    @Override
    public List<String> modules() {
        return Collections.singletonList(ExpensesModule.MODULE_MODULE);
    }

    /**
     * Sets the execution priority
     * @return Execution priority
     */
    @Override
    public int priority() {
        return 0;
    }
}
```

This class implements the `InstallDataInit`, `UpgradeDataInit`, and `ReloadDataInit` interfaces, which correspond to different business initialization scenarios:

+ The `InstallDataInit` interface corresponds to the installation (`init`) operation.
+ The `UpgradeDataInit` interface corresponds to the upgrade (`upgrade`) operation.
+ The `ReloadDataInit` interface corresponds to the reload (`reload`) operation.

Additionally, the `modules` method specifies which modules this initialization class matches, based on module codes, while the `priority` method sets the execution priority.

> **Exercise**
>
> Create data for the `expenses.ProjectType` model and add a record with the name "Capital Construction".