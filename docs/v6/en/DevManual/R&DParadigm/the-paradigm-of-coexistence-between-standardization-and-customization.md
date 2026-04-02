---
title: Software Companies:The Paradigm of Standardization and Customization Symbiosis
index: true
category:
  - Development Manual
  - Best Paradigms
order: 5
next:
  text: Global Layout:Custom Tree Component with Default First Value Selection
  link: /v6/en/DevManual/CommonSolutions/Front-End/global-layout-custom-tree-component-default-selection.md
---
# I. Introduction

Chinese software enterprises have long faced a dilemma between productization and projectization:

+ **Model 1: Copy Branch Delivery** (Project-based): Each customer deploys independent branch versions, leading to fragmented versions, difficult upgrades, high operation and maintenance costs, and inability to precipitate technical assets.
+ **Model 2: Unified Standard Product Delivery** (Product-based): Forcing standardized products into the market, yet falling into endless games between customer personalized needs and product universality, with serious demand backlogs and out-of-control delivery cycles.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/BestParadigm/1746582258145-54a27012-c76e-4dee-aede-400ebbff0b97.png)

Both models struggle to balance the contradiction between "large-scale replication" and "customer value realization". Building an enterprise-level productization engine based on Oinone may become the key to breaking this deadlock.

# II. Oinone's Symbiosis Paradigm

The value of Oinone does not lie in replacing existing systems of software companies but in providing a paradigm of "symbiosis between standardization and customization":

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/BestParadigm/1746582250592-d448ef90-c760-42f0-98c9-fcc1b5784fc6.png)

**(1) Modular Architecture: The Industrial Foundation for Standard Product R&D**

+ Loosely coupled design between modules supports a product portfolio strategy of "core standard products + pluggable extensions"

**(2) Low-Code Platform: The Efficiency Revolution for Project Delivery**

+ No-code designers enable no-code configuration (forms/processes/reports/system integration/AI integration customization) to meet rapid prototype verification
+ Low-code R&D framework based on Java+Vue supports in-depth development, improving complex business logic development efficiency by 50%

**(3) Symbiosis of Standardization and Customization: Cracking the Upgrade魔咒 (Curse)**

+ Physical isolation between customized modules and standard code ensures core system maintainability
+ Parallel development of customer customization and product evolution through inheritance systems

The essential value of the Oinone technical framework lies in **establishing the technical foundation for software industrialization**: When the technical architecture has the ability to continuously evolve, software companies can truly escape the "death spiral" where more projects mean heavier burdens and move towards a virtuous cycle of value growth.

# III. Oinone Implementation Roadmap

**(1) Technical Foundation Construction Stage**

+ Integrate the Oinone framework and combine third-party capabilities according to self-scene requirements
+ Add theme styles and frontend components that meet self-scene requirements based on Oinone

**(2) Standard Product Construction and Delivery System Reconstruction**

+ **R&D Model Upgrade**: Standardize functional module development (industrialized pipeline from requirement analysis→model definition→view design→permission configuration).
+ **Delivery System Reconstruction**: Three-level architecture of basic framework layer (Oinone enterprise exclusive) + business standard product layer (modular development) + customer customization layer (coverage inheritance)

**(3) Ecological System Formation Stage**

+ Expand organizational boundaries and establish localized sales and implementation teams
+ Expand ecological boundaries and build sales and implementation partner systems

# IV. Best Paradigms for Standard Product Development

## (Ⅰ) Best Paradigms for R&D Processes

Reference: Documents related to this topic can be found in "[Development Paradigm: R&D Process](/en/DevManual/R&DParadigm/R&D-paradigm-R&D-process.md)".

The Shushi Oinone framework optimizes the front-end and back-end separation development model. The front-end only intervenes when components fail to meet requirements or when developing featured components, reducing communication costs and improving overall efficiency.

**Problems with Traditional Models**: Tedious processes, high communication costs, excessive repetitive work, scattered R&D focus, and quality at each stage affecting system delivery.

**Advantages of Oinone's New Model**: Based on a low-code framework, the back-end focuses on business R&D and design, the front-end focuses on interactive component precipitation, and the front-end is decoupled from specific projects to become a public organization.

The core recommended process is as follows:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/BestParadigm/401a7d24389d02966575096c2312877c.svg)

## (Ⅱ) Best Paradigms for Module Design

Reference: Documents related to this topic can be found in "[Development Paradigm: Modular Design](/en/DevManual/R&DParadigm/R&D-paradigm-modular-design.md)".

Oinone's modular architecture is the cornerstone of its technical system, emphasizing the design principle of "high cohesion, low coupling". Each module serves as an independent unit encapsulating functional logic for specific domains. In business module division, this feature should be fully utilized to encapsulate different business functions in independent modules, with each module focusing on solving problems in specific business domains.

## (Ⅲ) Best Paradigms for Model Design

Reference: Documents related to this topic can be found in "[Development Paradigm: Model Design](/en/DevManual/R&DParadigm/R&D-paradigm-model-design.md)".

As a specific business system or framework, the quality of model design in Oinone directly affects system performance and extensibility. The Third Normal Form (3NF) of database design is a proven data modeling criterion. Integrating 3NF into Oinone model design helps construct a clear, efficient, and stable model system to better meet business needs. Practical recommendations are as follows:

**Scenarios to Prioritize 3NF Compliance**:

+ Core master data (such as customers, products) must strictly avoid redundancy.
+ Fields with high-frequency write operations (such as inventory quantity) need to ensure consistency.

**Scenarios for Reasonable Denormalization**:

+ Report fields with high-frequency read operations (such as statistical amounts).
+ Business logic requiring simplified complex queries (such as merging commonly associated fields).
+ Historical data archive tables (such as log records allowing redundancy).

# V. Project Delivery - Formulating Best Paradigms for Secondary Development

Design specific standard product secondary development solutions for customer personalized needs, including新增 (addition) or modification of functional modules, optimization of business processes, and customized interface design. Solution design must follow Oinone's development specifications and best practices to ensure the secondary developed system is stable, reliable, and easy to maintain.

## (Ⅰ) Applicable During Standard Product Construction

**Delivery System**: Three-level architecture of basic framework layer (Oinone enterprise exclusive) + business standard product layer (modular development) + customer customization layer (coverage inheritance)

#### Step 1: Create a Customized Module to Extend Business Logic

In code mode: Create a customized module, use Oinone's upstream feature to copy standard product menus, take the customized module as the access entry to facilitate comparison of differences between standard products and personalized features, and follow Oinone's development specifications to develop customized logic using features such as inheritance, extension points, and hooks.

:::warning Tip

At the technical layer, Oinone greatly reduces requirements for customized development. Functions like interfaces, processes, data visualization, and even integration can be configured through no-code designers.

At the business product layer: The higher the maturity, the higher the degree of business configuration, and the fewer requirements for customized development.

:::

#### Step 2: Extend Logic with Interface Designer, Process Designer, and Data Visualization

[New] Add new pages, processes, and data visualizations for modules.  
[Modify] First copy original page, process, and data visualization content, then modify, and finally bind triggers. This complies with the开闭原则 (Open-Closed Principle) to ensure symbiosis between standard products and customization. Oinone's designer cannot directly modify standard product content.

:::warning Tip

In this mode, model addition or extension is done through code rather than no-code mode.

:::

#### Step 3: Expand System Boundaries with API and Integration Capabilities

Oinone's integration designer supports rich connector types, such as applications (WebService and RESTful API), databases (SQL), files, etc., enabling integration between systems and external applications.

## (Ⅱ) Applicable During Ecological System Formation Stage

:::warning Tip

Compared with the previous secondary development solution, the superiority of this model is based on: most customers do not require development intervention.

:::

#### Step 1: Create a Customized Module via the Application Center

In no-code mode: Create a customized module in the application center, configure the upstream feature, copy standard product menus, and use the customized module as the access entry to facilitate comparison of differences between standard products and personalized features.

#### Step 2: Extend Logic with Model Designer, Interface Designer, Process Designer, and Data Visualization

[New] Add new model fields, pages, processes, and data visualizations for modules.  
[Modify] First copy original page, process, and data visualization content, then modify, and finally bind triggers. This complies with the Open-Closed Principle to ensure symbiosis between standard products and customization. Oinone's designer cannot directly modify standard product content.

#### Step 3: Expand System Boundaries with API and Integration Capabilities

Oinone's integration designer supports rich connector types, such as applications (WebService and RESTful API), databases (SQL), files, etc., enabling integration between systems and external applications.

#### Step 4: Leverage Oinone's Low-Code and No-Code Integration Feature

Reference: Documents related to this topic can be found in "[User Manual: Low-Code and No-Code Integration](/en/UserManual/low-code-no-code-integration.md)".

When special logic arises, use low-code and no-code integration to reversely generate Oinone's code project, and then follow Oinone's development specifications to develop customized logic using features such as inheritance, extension points, and hooks.