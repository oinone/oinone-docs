---
title: Installation and Upgrade
index: false
category:
  - Installation and Upgrade
dir:
  link: true
  order: 1
next:
  text: Environment Preparation
  link: /v6/en/InstallOrUpgrade/Dev-ENV/README.md
---
These guides provide instructions on how to install, maintain, and upgrade Oinone products.

::: warning Tip

See also [Oinone Historical Version Overview](/en/InstallOrUpgrade/version-list.md)

:::

# I. Installation
There are multiple ways to install Oinone based on the intended usage scenario.

1. docker-full is the simplest way to use Oinone in a non-formal environment or for trials.
2. docker-mini is suitable for using Oinone in formal, R&D, and testing environments. After additional deployment and maintenance work, it can be used long-term.
3. Running the package is suitable for using Oinone in formal, R&D, and testing environments. After additional deployment and maintenance work, it can be used long-term.
4. Source code installation (**supports the community open-source edition**) provides greater flexibility. For example, it allows running specific ranges of modules according to business needs. This is sufficient for developing modules and can serve as the basis for production deployment.

# II. Editions
There are two different editions.

1. The Oinone Community Edition is the free open-source version of the software, licensed under the GNU AGPLv3 license. It is the foundation on which the Oinone Enterprise Edition is built.
2. The Oinone Enterprise Edition is the shared source code version of the software, providing access to more features, including functional support, upgrades, and expert support services.

:::warning Tip

You can switch from the Community Edition to the Enterprise Edition at any time (except when you have modified the Oinone kernel source code yourself)

:::