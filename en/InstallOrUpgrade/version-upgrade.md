---
title: Version Upgrade
index: true
category:
  - Installation and Upgrade
order: 5

---
# I. Overview
Upgrading involves moving Oinone Math from an old version to a new supported version (e.g., from Oinone Math 5.0.0 to Oinone Math 6.0.0). Regular upgrades are crucial because each version provides new features, bug fixes, and security patches. It is highly recommended to use ``:doc: `supported versions<supported_versions>` ``. Each major version has a support period of three years.

For Oinone Math:
+ If using a major version (e.g., 4.0.0, 5.0.0, 6.0.0), upgrade at least once every two years, typically one version per year.
+ If using a minor version (e.g., 5.1.0, 5.2.0, 5.4.0), upgrade within a few weeks after the next version is released. Minor versions are usually released every two months.
+ If using a patch version (e.g., 5.1.1, 5.1.2, 5.1.4), upgrade within one week after the next version is released. Patch versions are usually released every one to two weeks.

:::warning Prompt

You can use the same version indefinitely, even though it is not recommended. Note that the smaller the version gap, the easier the upgrade.

:::

Upgrades do not include:
+ Downgrading to a previous version of Oinone Math
+ Converting versions from the community edition to the enterprise edition
+ Migrating from another low-code system to Oinone Math

# II. Upgrade Steps
:::danger Warning

If your system includes custom modules, you will not be able to upgrade until the version of your custom module is available for the target version of Oinone Math.

:::

With each new version of Oinone Math, changes are introduced. These changes may affect modules with developed custom features. This is why upgrading custom modules requires additional steps to upgrade the source code.

The following steps should be followed to upgrade custom Oinone Math:

1. Stop development work and evaluate it.
2. Deploy the target version of Oinone Math in a brand-new environment where your modules can be installed normally.
3. In the original test environment, upgrade to the target version of Oinone Math, and your modules can start normally.
4. Conduct comprehensive testing and drills.
5. Upgrade the production environment.

# III. Regression Testing
The upgraded test application must be tested to ensure that daily activities are not disrupted by changes in views, behavior, or error messages after the upgrade is launched.

It is highly recommended to test as many business processes as possible to ensure they run normally and further familiarize yourself with the new version.

:::tip Example: Basic Test Checklist

+ Are there any views that are deactivated in the test environment but activated in the production environment?
+ Do your regular views still display correctly?
+ Are your data charts and data dashboard pages running normally?
+ Are your general functions such as workflows, data auditing, and permissions running normally?
+ Can you create and modify records? (Sales orders, invoices, purchases, users, contacts, companies, etc.)
+ Are there any issues with your print templates?
+ Are there any issues with saved translations?
+ Do your search filters still exist?
+ Can you import and export data?
+ Can the relevant designers run normally?

:::

During testing, you may encounter significant differences between standard views, functions, fields, and models. These changes cannot be restored one by one. However, if changes introduced in the new version break customizations, it is the responsibility of your custom module maintainer to make them compatible with the new version of Oinone Math.

:::warning Tip: Tips

Don't forget to test:
+ Integration with external software (electronic data interchange, application programming interfaces, etc.)
+ Workflows between different applications (e-commerce online sales, converting leads to sales orders, delivering products, etc.)
+ Data export
+ Scheduled tasks
+ Executing server actions in the operation menu of the form view, and executing server actions for multiple records selected in the list view

:::

# IV. Upgrading the Production Environment
Once testing is complete and you are confident that the upgraded system can be used in production without any issues, you can plan the activation date.

During the upgrade, we recommend performing it when system usage is minimal.

Since both the standard upgrade script and your database are constantly changing, it is recommended to frequently apply for another upgrade test database to ensure the upgrade process remains successful, especially if the upgrade takes a long time to complete. **It is also recommended to fully rehearse the upgrade process the day before upgrading the production database.**

:::danger Warning

Putting into production without complete testing may result in:
+ Users being unable to adapt to changes and new features
+ Business interruptions (e.g., no longer possible to verify operations)
+ Poor customer experience (e.g., website not functioning properly)

:::

:::danger Warning

Once an upgrade is requested, the database will be unavailable until the upgrade is complete. Once the upgrade is complete, it is impossible to revert to a previous version.

:::

If you encounter problems with your production database, you can contact Oinone Math after-sales staff for corresponding assistance.

# V. Common Upgrade Issues
## (一) Environment Runtime Jar Version Control
### Background
Oinone Math supports distributed deployment. Standard applications of Oinone Math and self-developed applications based on Oinone Math start independently. To avoid metadata confusion caused by different versions, `runtime Jar version checking` is implemented.

### Phenomenon
If the `Jar version` depended on by the current runtime is lower than the installed version, the following similar information will be prompted during startup:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Install-by-running-the-package/xx.png)

### Solution
Upgrade the `dependent Jar version` as prompted.

## (二) Rollback
### Background
Due to some uncontrollable factors during the upgrade, the upgrade cannot be completed within the specified time, and the upgraded system needs to be rolled back. However, Oinone Math defaults to Jar version control for the environment runtime, resulting in an inability to roll back.

### Solution
Force overwrite and install the current runtime version through the startup parameter `-PgoBack=true`:

```plain
java -jar xxx.jar -PgoBack=true [other parameters]
```

# VI. Service Level Agreement (SLA)
Using the Oinone Math enterprise edition, upgrading the database to the latest version of Oinone Math is completely **free**, including any support required to correct potential differences in the system after the upgrade.

## (一) Upgrade Services Covered by the Service Level Agreement
Upgrade services can be enjoyed at any time:
+ Upgrade all **standard applications**;
+ Upgrade all custom features **created using custom applications**, provided that the custom applications are still installed and the relevant authorizations are still active;
+ Upgrade all developments and customizations covered by the custom maintenance subscription.

Upgrade services are limited to the technical conversion and adjustment of the system (standard modules and data) to make them compatible with the upgrade target version.

## (二) Upgrade Services Not Covered by the Service Level Agreement
The following upgrade-related services are not included:
+ Clearing existing data and configurations during the upgrade;
+ Upgrading additional modules created internally or by third parties (including Oinone Math partners) that are not covered by the maintenance contract;
+ Training on using upgraded functions and workflows.