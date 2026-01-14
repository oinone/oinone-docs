---
title: 通用扩展点与平台SPI清单（Common Extension Points And SPI List）
index: true
category:
  - 研发手册
  - Reference
order: 5
prev:
  text: 集成接口 API（EIP API）
  link: /zh-cn/DevManual/Reference/StandardModule/EIP-API.md
---
# 一、SPI 机制

## （一）Pamirs SPI 框架

整合三种服务发现机制，支持组件动态扩展：

+ **注解规则**：
  - 接口通过`@SPI`指定默认扩展名（默认为 "pamirs"）和加载工厂
  - 实现类通过`@SPI.Service`设置扩展名（Spring SPI 默认 Bean 名称，Java SPI 为全类名）
  - `@Order`/`@Priority`定义扩展优先级

## （二）配置方式

### 1、Java SPI

  - 接口：`public interface DemoApi { List<String> demo(); }`
  - 实现类：`@Order(10) public class DemoApiImpl implements DemoApi { ... }`
  - 配置文件：`META-INF/services/接口全类名` 写入实现类全路径

### 2、Annotation SPI

  - 接口：`@SPI("ext1") public interface DemoApi { ... }`
  - 实现类：`@SPI.Service("ext1") @Order(10) public class DemoApiImpl implements DemoApi { ... }`

### 3、Spring SPI

  - 实现类：`@Component("ext1") @Order(10) public class DemoApiImpl implements DemoApi { ... }`

### 4、调用方式

```java
// 指定扩展名调用
DemoApi ext = ExtensionServiceLoader.getExtension(DemoApi.class, "ext1");

// 按优先级获取列表
List<DemoApi> spis = ExtensionServiceLoader.getExtensionLoader(DemoApi.class).getOrderedExtensions();

// 快捷方式（Spider工具类）
DemoApi ext = Spider.getExtension(DemoApi.class, "ext1");
```

# 二、系统扩展点

## （一）框架层

| 扩展点           | 实现位置 | SPI  | 接口                                      |
| ---------------- | -------------------------------------------- | ---- | ----------------------------------------- |
| Spring类型转换器 | *                                            | 否   | SpringTypeConverterRegister<br/>#register |
| SPI加载器工厂    | *                                            | 是   | ServiceLoaderFactory                      |
| SPI路径设置      | *                                            | 是   | SpiClassPathApi                           |


## （二）元数据扫描

| 扩展点                               | 实现位置 | SPI  | 接口                                                         |
| ------------------------------------ | -------------------------------------------- | ---- | ------------------------------------------------------------ |
| 元数据注解转换器                     | *                                            | 否   | ModelConverter                                               |
| 元数据模型签名器                     | *                                            | 否   | ModelSigner                                                  |
| 元数据注解转换器白名单               | yaml:pamirs.configure.converter.annotation   | 否   | ModelConverter接口实现类名                                   |
| 元数据模型签名器白名单               | yaml:pamirs.configure.signer                 | 否   | ModelSigner接口实现类名                                      |
| 注解转化器处理的元模型的扫描路径配置 | yaml:pamirs.meta.meta-packages               | 否   | 默认：<br/>**pro.shushi.pamirs.meta.domain**<br/>**pro.shushi.pamirs.boot.base.model** |


## （三）元数据计算

| 扩展点             | 实现位置 | SPI  | 接口                     |
| ------------------ | -------------------------------------------- | ---- | ------------------------ |
| 模型编码接口       | *                                            | 是   | ModelModelApi            |
| 模型运算接口       | *                                            | 是   | ModelComputeApi          |
| 模型校验接口       | *                                            | 是   | ModelCheckApi            |
| 模型指令接口       | *                                            | 是   | ModelDirectiveBatchApi   |
| ORM转换接口        | *                                            | 是   | OrmApi                   |
| 类型系统接口       | *                                            | 是   | TypeProcessor            |
| 继承处理扩展逻辑   | *                                            | 是   | InheritedExtendProcessor |
| 模型计算扩展逻辑   | *                                            | 是   | ModelExtendComputer      |
| 字段计算扩展逻辑   | *                                            | 是   | FieldExtendComputer      |
| 元数据计算扩展逻辑 | *                                            | 是   | MetaDataExtendComputer   |


## （四）API层

| 扩展点               | 实现位置 | SPI  | 接口                  |
| -------------------- | -------------------------------------------- | ---- | --------------------- |
| 请求上下文扩展点     | *                                            | 是   | SessionPrepareApi     |
| 拦截器构建扩展点     | *                                            | 是   | InstrumentationApi    |
| 动作绑定扩展点       | *                                            | 是   | ActionBinderApi       |
| 数据加载器注册扩展点 | *                                            | 是   | DataLoaderRegistryApi |


## （五）FaaS层

| 扩展点                   | 实现位置 | SPI  | 接口                   |
| ------------------------ | -------------------------------------------- | ---- | ---------------------- |
| 组装表达式上下文         | *                                            | 是   | SessionContextApi      |
| 商业函数扩展点           | *                                            | 是   | BusinessFunctionsApi   |
| 上下文函数扩展点         | *                                            | 是   | ContextFunctionsApi    |
| 表达式可执行函数黑白名单 | *                                            | 是   | FaasScriptAllowListApi |


## （六）ORM层

| 扩展点               | 实现位置 | SPI  | 接口                         |
| -------------------- | -------------------------------------------- | ---- | ---------------------------- |
| 前端字段处理扩展逻辑 | *                                            | 是   | FrontEndFieldExtendConverter |
| 前端字段计算         | *                                            | 否   | FieldValueComputer           |
| 后端字段处理扩展逻辑 | *                                            | 是   | BackEndFieldExtendConverter  |
| 字段序列化api        | *                                            | 否   | Serializer                   |


## （七）持久层

| 扩展点                    | 实现位置                                                     | SPI  | 接口                                                |
| ------------------------- | ------------------------------------------------------------ | ---- | --------------------------------------------------- |
| 数据源路由                | pamirs-boot-*<br/>**yaml:pamirs.mapper.data-source-route-service** | 是   | DataSourceRouteService#route                        |
| 数据框架的统一key前缀服务 | *                                                            | 是   | DataApiKeyService                                   |
| 动态数据源路由自定义参数  | pamirs-boot-*<br/>**yaml:pamirs.mapper.dynamic-ds-key-computer** | 是   | DynamicDsKeyComputer                                |
| 数据表名计算自定义参数    | pamirs-boot-*<br/>**yaml:pamirs.mapper.table-name-computer** | 是   | TableNameComputer#context                           |
| 获取逻辑字段定义          | pamirs-connectors-data-*<br/>**yaml:pamirs.mapper.****logic-column-fetcher** | 是   | LogicColumnFetcher<br/>#fetchLogicColumnDefinitions |
| 获取逻辑字段              | pamirs-connectors-data-*<br/>**yaml:pamirs.mapper.****logic-column-fetcher** | 是   | LogicColumnFetcher<br/>#fetchLogicColumns           |
| 通用mapper                | *                                                            | 否   | PamirsMapper                                        |

