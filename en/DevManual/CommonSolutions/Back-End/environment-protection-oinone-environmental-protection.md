---
title: Environmental Protection:Oinone Environmental Protection (above v5.2.3)
index: true
category:
  - Common Solutions
order: 57
---

# 1. Overview
The Oinone platform provides partners with an environmental protection function to ensure that deployment operations such as modifying configuration files and starting multiple JVMs can be carried out under relatively safe conditions in **a single environment**.

This chapter mainly introduces the startup parameters related to the environmental protection function.

# 2. Nomenclature
- **Local development environment**: The environment where developers start the business project locally.
- **Public environment**: The environment including the designer image and business project.

# 3. Introduction to Environmental Protection Parameters
## (1) `-PenvProtected=${value}`
Whether to enable environmental protection, with the default being `true`.

Environmental protection works by comparing with the data recently saved in the `base_platform_environment` table of the database and judging according to the configuration characteristics of each parameter. Errors will be printed in the startup log to help developers troubleshoot problems.

Additionally, the environmental protection function provides some optimization suggestions for production configurations. Developers can pay attention to these logs during startup to optimize the configurations of the production environment.

## (2) `-PsaveEnvironments=${value}`
Whether to save the environmental parameters of this startup to the database, with the default being `true`.

In some special cases, to avoid unnecessary changes to the protection parameters in the public environment, we can choose not to save the configuration parameters of this startup to the database, so as not to affect the startup of other JVMs due to failed validation.

## (3) `-PstrictProtected=${value}`
Whether to use the strict validation mode, with the default being `false`.

It is generally recommended to enable the strict validation mode in the public environment to maximize the protection of the public environment's metadata from interference by other environments.

:::info Note:

When enabling the strict validation mode, avoid scenarios where different connection addresses are used for internal and external networks. If this cannot be avoided, the strict validation mode cannot be enabled.

:::

# 4. Common Issues
## (1) How to migrate the database and change the database connection address?
1. Migrate the original database to the new database.
2. Modify the database connection address in the configuration file.
3. Add `-PenvProtected=false` to the startup script to disable environmental protection.
4. Start the JVM service. Error logs will be prompted, but the current startup will not be interrupted.
5. Remove `-PenvProtected=false` from the startup script or change the value to `true`. Environmental protection checks will continue at the next startup.
6. Check that the corresponding database connection configuration in the `base_platform_environment` table has been modified. If other JVMs do not modify it correctly before startup, they will fail to start.

## (2) How to modify the Redis connection address to the local one during local development without affecting the public environment?
:::info Note:

Since the metadata cache in Redis is synchronized based on database deltas, this operation will cause the public environment to fail to correctly refresh the metadata cache in Redis during startup. It needs to be operated with the `pamirs.distribution.session.allMetaRefresh` parameter. Unless necessary, we do not recommend using this form for collaborative development, as multiple configuration modifications will increase the probability of errors.

:::
1. When starting the local environment for the first time, in addition to modifying the Redis-related configurations, also configure `pamirs.distribution.session.allMetaRefresh=true` to initialize the locally connected Redis.
2. When starting locally, add the startup parameters `-PenvProtected=false -PsaveEnvironments=false` to ensure that the local startup does not modify the public environment's configurations and can pass the environmental protection check normally.
3. After the local environment is successfully started and the function is developed normally, when publishing to the public environment for testing, first modify the `pamirs.distribution.session.allMetaRefresh=true` configuration in the public environment's business project, and then start the business project.
4. After starting the business project once, restore the configuration to `pamirs.distribution.session.allMetaRefresh=false`.