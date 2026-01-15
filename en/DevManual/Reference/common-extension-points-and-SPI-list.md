---
title: Common Extension Points And SPI List
index: true
category:
  - Development Manual
  - Reference
order: 5
prev:
  text: EIP API
  link: /en/DevManual/Reference/StandardModule/EIP-API.md
---
# I. SPI Mechanism

## (Ⅰ) Pamirs SPI Framework

Integrates three service discovery mechanisms to support dynamic component extension:

+ **Annotation Rules**:
  - Interfaces specify default extension names (default is "pamirs") and loading factories via `@SPI`
  - Implementation classes set extension names via `@SPI.Service` (Spring SPI uses default Bean names, Java SPI uses full class names)
  - `@Order`/`@Priority` defines extension priority

## (Ⅱ) Configuration Methods

### 1. Java SPI

  - Interface: `public interface DemoApi { List<String> demo(); }`
  - Implementation: `@Order(10) public class DemoApiImpl implements DemoApi { ... }`
  - Configuration file: Write implementation class full path in `META-INF/services/interface full class name`

### 2. Annotation SPI

  - Interface: `@SPI("ext1") public interface DemoApi { ... }`
  - Implementation: `@SPI.Service("ext1") @Order(10) public class DemoApiImpl implements DemoApi { ... }`

### 3. Spring SPI

  - Implementation: `@Component("ext1") @Order(10) public class DemoApiImpl implements DemoApi { ... }`

### 4. Invocation Methods

``` java
// Invoke by specifying extension name
DemoApi ext = ExtensionServiceLoader.getExtension(DemoApi.class, "ext1");

// Get ordered list by priority
List<DemoApi> spis = ExtensionServiceLoader.getExtensionLoader(DemoApi.class).getOrderedExtensions();

// Shortcut (Spider utility class)
DemoApi ext = Spider.getExtension(DemoApi.class, "ext1");
```

# II. System Extension Points

## (Ⅰ) Framework Layer

| Extension Point        | Implementation Location                      | SPI  | Interface                                      |
| ---------------------- | -------------------------------------------- | ---- | --------------------------------------------- |
| Spring Type Converter  | *                                            | No   | SpringTypeConverterRegister<br/>#register      |
| SPI Loader Factory     | *                                            | Yes  | ServiceLoaderFactory                          |
| SPI Path Setting       | *                                            | Yes  | SpiClassPathApi                               |


## (Ⅱ) Metadata Scanning

| Extension Point                 | Implementation Location                      | SPI  | Interface                                                      |
| ------------------------------- | -------------------------------------------- | ---- | -------------------------------------------------------------- |
| Metadata Annotation Converter   | *                                            | No   | ModelConverter                                                 |
| Metadata Model Signer           | *                                            | No   | ModelSigner                                                    |
| Metadata Annotation Converter Whitelist | yaml:pamirs.configure.converter.annotation   | No   | ModelConverter interface implementation class name              |
| Metadata Model Signer Whitelist | yaml:pamirs.configure.signer                 | No   | ModelSigner interface implementation class name                 |
| Scan path configuration for meta models processed by annotation converters | yaml:pamirs.meta.meta-packages               | No   | Default:<br/>**pro.shushi.pamirs.meta.domain**<br/>**pro.shushi.pamirs.boot.base.model** |


## (Ⅲ) Metadata Calculation

| Extension Point          | Implementation Location                      | SPI  | Interface                  |
| ------------------------ | -------------------------------------------- | ---- | -------------------------- |
| Model Encoding Interface | *                                            | Yes  | ModelModelApi              |
| Model Calculation Interface | *                                            | Yes  | ModelComputeApi            |
| Model Validation Interface | *                                            | Yes  | ModelCheckApi              |
| Model Directive Interface | *                                            | Yes  | ModelDirectiveBatchApi     |
| ORM Conversion Interface | *                                            | Yes  | OrmApi                     |
| Type System Interface    | *                                            | Yes  | TypeProcessor              |
| Inheritance Processing Extension Logic | *                                            | Yes  | InheritedExtendProcessor   |
| Model Calculation Extension Logic | *                                            | Yes  | ModelExtendComputer        |
| Field Calculation Extension Logic | *                                            | Yes  | FieldExtendComputer        |
| Metadata Calculation Extension Logic | *                                            | Yes  | MetaDataExtendComputer     |


## (Ⅳ) API Layer

| Extension Point            | Implementation Location                      | SPI  | Interface               |
| -------------------------- | -------------------------------------------- | ---- | ----------------------- |
| Request Context Extension  | *                                            | Yes  | SessionPrepareApi       |
| Interceptor Construction Extension | *                                            | Yes  | InstrumentationApi      |
| Action Binding Extension   | *                                            | Yes  | ActionBinderApi         |
| Data Loader Registration Extension | *                                            | Yes  | DataLoaderRegistryApi   |


## (Ⅴ) FaaS Layer

| Extension Point              | Implementation Location                      | SPI  | Interface                 |
| ---------------------------- | -------------------------------------------- | ---- | ------------------------- |
| Assemble Expression Context  | *                                            | Yes  | SessionContextApi         |
| Business Function Extension  | *                                            | Yes  | BusinessFunctionsApi      |
| Context Function Extension   | *                                            | Yes  | ContextFunctionsApi       |
| Allowed/Blocked List for Executable Functions in Expressions | *                                            | Yes  | FaasScriptAllowListApi    |


## (Ⅵ) ORM Layer

| Extension Point            | Implementation Location                      | SPI  | Interface                      |
| -------------------------- | -------------------------------------------- | ---- | ------------------------------ |
| Front-end Field Processing Extension Logic | *                                            | Yes  | FrontEndFieldExtendConverter   |
| Front-end Field Calculation  | *                                            | No   | FieldValueComputer             |
| Back-end Field Processing Extension Logic | *                                            | Yes  | BackEndFieldExtendConverter    |
| Field Serialization API    | *                                            | No   | Serializer                     |


## (Ⅶ) Persistence Layer

| Extension Point               | Implementation Location                                                     | SPI  | Interface                                           |
| ----------------------------- | ------------------------------------------------------------ | ---- | ------------------------------------------------- |
| Data Source Routing           | pamirs-boot-*<br/>**yaml:pamirs.mapper.data-source-route-service** | Yes  | DataSourceRouteService#route                      |
| Unified Key Prefix Service for Data Frameworks | *                                                            | Yes  | DataApiKeyService                                 |
| Custom Parameters for Dynamic Data Source Routing | pamirs-boot-*<br/>**yaml:pamirs.mapper.dynamic-ds-key-computer** | Yes  | DynamicDsKeyComputer                              |
| Custom Parameters for Data Table Name Calculation | pamirs-boot-*<br/>**yaml:pamirs.mapper.table-name-computer** | Yes  | TableNameComputer#context                         |
| Fetch Logic Field Definitions | pamirs-connectors-data-*<br/>**yaml:pamirs.mapper.****logic-column-fetcher** | Yes  | LogicColumnFetcher<br/>#fetchLogicColumnDefinitions |
| Fetch Logic Fields            | pamirs-connectors-data-*<br/>**yaml:pamirs.mapper.****logic-column-fetcher** | Yes  | LogicColumnFetcher<br/>#fetchLogicColumns         |
| Universal Mapper              | *                                                            | No   | PamirsMapper                                      |