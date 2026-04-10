---
title: R&D Paradigm:Modular Design
index: true
category:
  - Development Manual
  - Best Paradigms
order: 2

---
Based on Oinone as the business module division of the R&D framework, it should follow the principles of high cohesion and low coupling. Combined with the modular architecture characteristics of Oinone, the following is the best practice guide:

# I. Modular Architecture: The Core of High Cohesion and Low Coupling

The modular architecture of Oinone is the cornerstone of its technical system, emphasizing the design principle of "high cohesion, low coupling". Each module serves as an independent unit, encapsulating functional logic for specific domains. In business module division, this feature should be fully utilized to encapsulate different business functions in independent modules, with each module focusing on solving problems in specific business domains.

## (Ⅰ) Functional Independence

Each module should have independent business functions to avoid functional overlap and redundancy. For example, sales management, procurement management, inventory management, etc., are divided into different modules. Each module contains complete business logic, data models, and user interfaces. Through Oinone's module definition files, the dependency relationships and functional characteristics of modules can be clearly declared to ensure module independence and maintainability.

## (Ⅱ) Interface Design

Modules interact through well-defined interfaces rather than direct dependencies on internal implementations. Oinone complies with Java object-oriented and interface-oriented programming specifications, such as model inheritance, method overriding, RPC calls, etc. When dividing modules, public API interfaces should be designed to facilitate calling and extension by other modules. For example, a general "customer management" module can provide interfaces for creating, querying, and updating customer information for sales, service, and other modules to call, avoiding duplicate development. A simplified module directory structure is as follows:

``` java
Module
├── module-api  Module interface project
│   ├── model   Models
│   ├── api     Service interfaces
│   └── Module.java Module definition
└── module-core Module implementation project
    ├── action  Behaviors
    ├── service Service implementations
    └── init    Data initialization
```

## (Ⅲ) Dependency Management

Reasonably manage the dependency relationships between modules to avoid circular dependencies and excessive dependencies. Oinone's module loading mechanism automatically handles dependency relationships, but when designing modules, unnecessary dependencies should be minimized to ensure module pluggability. For example, a report generation module can depend on a basic data module but should not depend on specific business process modules to improve module versatility and reusability.

## (Ⅳ) Using Event Mechanisms and Hooks for Loosely Coupled Communication Between Modules

Oinone's event mechanism and Hook functions provide a loosely coupled solution for communication between modules. In business module division, through reasonable design of event trigger points, functional expansion and collaborative work between modules are realized. For example, in the order processing module, when the order status changes, corresponding events are triggered, such as the "order paid" event. The finance module can subscribe to this event to automatically generate financial vouchers, and the logistics module can also subscribe to this event to arrange product delivery.

## (Ⅴ) Modular Maturity Assessment System

| **Assessment Dimension**                                     | **Level 1**                                              | **Level 3**                                                | **Level 5**                                                  |
| ----------------------------------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------ |
| Module Independence  | Circular dependencies exist | Unidirectional dependencies      | Fully independent and deployable     |
| Change Impact Scope  | Affects multiple modules | Controlled within submodules | Fully closed-loop within the module   |
| Testing Efficiency   | Requires full regression | Module-level testing     | Independent automated verification   |
| Cognitive Load       | Requires global understanding | Module interface-level understanding | Focus on a single module即可           |


## (Ⅵ) Typical Error Patterns and Solutions

**Anti-pattern 1: Transaction-driven division**
✖ Taking the database transaction scope as the module boundary
✓ Adopting domain event eventual consistency to maintain business integrity

**Anti-pattern 2: Technical dimension cutting**
✖ Using Controller/Service/DAO layering as modules
✓ Establishing vertical business modules, each containing a complete hierarchical structure

**Anti-pattern 3: Over-decoupling trap**
✖ Treating each class as an independent module
✓ Following the "Common Closure Principle" to place classes that change together in the same module

# III. Understanding the "Link" Module

Reference: Related documentation on this topic can be found in "[Link Module](/en/DevManual/Tutorials/Back-endFramework/chapter13-interact-with-other-modules.md#30204371)".

Whenever we interact with other modules, we need to keep in mind Oinone's modular characteristics. Suppose you are working on both an expense management module and an accounting module. If we plan to sell the application to enterprise customers, some may need to transfer expense data to the accounting system for financial processing and generate corresponding accounting vouchers, while others may not.

For such use cases, a common practice is to create a "link" module. In our example, this module would depend on the `expenses` (expense management) module and the `account` (accounting) module, and contain the logic for creating accounting vouchers for reimbursement forms in expense management. In this way, the expense management module and the accounting module can be installed independently. When both modules are installed, installing the link module provides new functionality.

# IV. Progressive Expansion Capability

+ The inheritance mechanism allows extending existing modules through `inherit` instead of directly modifying the source code.
+ The extension point mechanism allows appending pre, post, and override through `Extpoint` to extend specific function logic.
+ The Hook mechanism allows adding general logic to the system in a切面 way through `HookBefore` and `HookAfter`.
+ The Upstream mechanism allows combining the entries of one or more modules and centrally managing extended logic in one module.

**Typical Scenarios for Progressive Expansion**

| **Stage**                                          | **Expansion Requirement**                              | **Implementation Method**                                              |
| -------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------ |
| Initial stage | Basic sales process | Enable the native `sale`<br/>module |
| Intermediate stage | Add contract management | Install the third-party `sale_contract`<br/>module |
| Later stage | Custom quotation approval | Develop the `custom_approval`<br/>module inheriting from `sale` |