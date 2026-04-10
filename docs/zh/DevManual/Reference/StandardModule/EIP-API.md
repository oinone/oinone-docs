---
title: 集成接口 API（EIP API）
index: true
category:
  - 研发手册
  - Reference
  - 标准模块
order: 6
next:
  text: 通用扩展点与平台SPI清单（Common Extension Points And SPI List）
  link: /zh/DevManual/Reference/common-extension-points-and-SPI-list.md
---
# 一、概述

Oinone 集成平台通过注解 `@Integrate` 和 `@Open` 提供灵活的接口定义能力，支持企业内外部系统的高效集成。

+ `@Open`：用于声明对外开放的接口（供外部系统调用）。
+ `@Integrate`：用于声明集成接口（调用外部系统的接口）。

本文档详细说明这两个注解的配置项、使用场景及示例。

:::warning 提示

本文档可助您快速掌握核心概念与基础逻辑。不过在实际开发过程中，强烈推荐使用设计器辅助开发。设计器能够提供可视化操作界面，简化配置流程、降低编码复杂度，帮助您更高效、精准地完成开发任务 ，显著提升开发效率与质量。

:::

# 二、准备工作

## （一）YAML配置

### 1、开放平台配置

与此主题相关的文档可在 “[集成平台配置](/zh/DevManual/Reference/Back-EndFramework/module-API.md#2d873280)” 中找到。

### 2、启动eip模块

``` yaml
pamirs:
	boot:
    modules:
      - eip
      - eip_mcp #按需增加，这里引入eip_mcp则boot的pom中需引入pamirs-eip2-mcp
```

## （二）maven依赖

### 1、api工程加入相关依赖包

在xxxModule-api中增加入pamirs-eip2-api的依赖

``` xml
<dependency>
  <groupId>pro.shushi.pamirs.core</groupId>
  <artifactId>pamirs-eip2-api</artifactId>
</dependency>
```

### 2、启动工程加入相关依赖包

``` xml
<dependency>
  <groupId>pro.shushi.pamirs.core</groupId>
  <artifactId>pamirs-eip2-core</artifactId>
</dependency>
<dependency>
  <groupId>pro.shushi.pamirs.core</groupId>
  <artifactId>pamirs-eip2-view</artifactId>
</dependency>
<dependency>
  <groupId>pro.shushi.pamirs.core</groupId>
  <artifactId>pamirs-eip2-designer</artifactId>
</dependency>

<!-- 6.3.0版本提供eip2-mcp，按需增加。如果这里增加了该报，这启动modules需增加eip_mcp -->
<dependency>
  <groupId>pro.shushi.pamirs.core</groupId>
  <artifactId>pamirs-eip2-mcp</artifactId>
</dependency>
```

## （三）项目的模块增加模块依赖

xxxModule的定义类增加对EipModule的依赖

``` java
@Module(dependencies = {EipModule.MODULE_MODULE})
```

# 三、`@Open` 注解

## （一） 功能说明

`@Open` 注解用于定义开放接口，允许外部系统通过 HTTP 请求调用。它支持配置请求方法、输入输出转换器、认证处理器等功能。

## （二）注解结构

``` java
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
public @interface Open {
    String name() default "";        // 接口显示名称
    Class<?> config() default Void.class; // 关联的配置类
    String path() default "";        // 接口路径

    // 高级配置
    @interface Advanced {
        String httpMethod() default "post";                // HTTP方法（默认POST）
        String inOutConverterFun() default "";             // 输入输出转换函数名
        String inOutConverterNamespace() default "";       // 输入输出转换函数命名空间
        String authenticationProcessorFun() default "";    // 认证处理函数名
        String authenticationProcessorNamespace() default ""; // 认证处理函数命名空间
        String serializableFun() default "";               // 序列化函数名
        String serializableNamespace() default "";         // 序列化函数命名空间
        String deserializationFun() default "";            // 反序列化函数名
        String deserializationNamespace() default "";      // 反序列化函数命名空间
    }
}
```

Open

├── name 显示名称

├── config 配置类

├── path 路径

├── Advanced 更多配置

│   ├── httpMethod 请求方法，默认：post

│   ├── inOutConverterFun 输入输出转换器函数名称

│   ├── inOutConverterNamespace 输入输出转换器函数命名空间

│   ├── authenticationProcessorFun 认证处理器函数名称

│   ├── authenticationProcessorNamespace 认证处理器函数命名空间

│   ├── serializableFun 序列化函数名称

│   ├── serializableNamespace 序列化函数命名空间

│   ├── deserializationFun 反序列化函数名称

│   └── deserializationNamespace 反序列化函数命名空间

## （三）使用示例

``` java
@Fun(TestOpenApiModelService.FUN_NAMESPACE)
@Component
public class TestOpenApiModelServiceImpl implements TestOpenApiModelService {
    @Function
    @Open(
        name = "查询开放接口数据",
        path = "queryById4Open",
        config = TestEipConfig.class
    )
    @Open.Advanced(
        httpMethod = "post",
        authenticationProcessorFun = EipFunctionConstant.DEFAULT_AUTHENTICATION_PROCESSOR_FUN,
        authenticationProcessorNamespace = EipFunctionConstant.FUNCTION_NAMESPACE
    )
    public OpenEipResult<TestOpenApiResponse> queryById4Open(IEipContext<SuperMap> context) {
        // 业务逻辑
        return result;
    }
}
```

## （四）参数说明

### 1、成员变量

| **变量名**                                           | **类型**                                               | **默认值**                                               | **描述**                                                     |
| ---------------------------------------------------- | ------------------------------------------------------ | -------------------------------------------------------- | ------------------------------------------------------------ |
| `name`   | `String`   | `""`         | 接口的显示名称   |
| `config` | `Class<?>` | `Void.class` | 配置类（需实现 `IEipAnnotationSingletonConfig`<br/> 接口） |
| `path`   | `String`   | `""`         | 接口的请求路径   |


### 2、嵌套注解 `@Advanced`

用于配置高级选项，可标注在方法或类上。

| **变量名**                                                   | **类型**                                             | **默认值**                                       | **描述**                                                     |
| ------------------------------------------------------------ | ---------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------ |
| `httpMethod`     | `String` | `""` | HTTP 请求方法（如 `POST`<br/>） |
| `inOutConverterFun` | `String` | `""` | 输入输出转换器的函数名 |
| `inOutConverterNamespace` | `String` | `""` | 输入输出转换器的命名空间 |
| `authenticationProcessorFun` | `String` | `""` | 认证处理器的函数名 |
| `authenticationProcessorNamespace` | `String` | `""` | 认证处理器的命名空间 |
| `serializableFun` | `String` | `""` | 序列化函数名     |
| `serializableNamespace` | `String` | `""` | 序列化函数的命名空间 |
| `deserializationFun` | `String` | `""` | 反序列化函数名   |
| `deserializationNamespace` | `String` | `""` | 反序列化函数的命名空间 |


# 四、`@Integrate` 注解

## （一）功能说明

`@Integrate` 注解用于定义集成接口，支持调用外部系统的开放接口。支持路由配置、参数转换、异常处理等功能。

## （二）注解结构

``` java
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
public @interface Integrate {
    String name() default "";        // 接口显示名称
    Class<?> config();               // 关联的配置类（必须）

    // 高级配置
    @interface Advanced {
        String host() default "";    // 目标服务域名（如 "api.example.com"）
        String path() default "";    // 目标接口路径（如 "/v1/data"）
        String schema() default "";  // 协议（如 "http" 或 "https"）
        String httpMethod() default "post"; // HTTP方法
    }

    // 请求处理器配置
    @interface RequestProcessor {
        String finalResultKey() default "";  // 最终请求参数的键
        Integrate.ConvertParam[] convertParams() default {}; // 参数映射规则
        // 其他配置项（如序列化、认证处理器等）
    }

    // 响应处理器配置
    @interface ResponseProcessor {
        String finalResultKey() default "";  // 最终响应结果的键
        // 其他配置项
    }

    // 异常处理器配置
    @interface ExceptionProcessor {
        String exceptionPredictFun() default "";     // 异常判定函数名
        String exceptionPredictNamespace() default ""; // 异常判定函数命名空间
    }

    // 参数映射规则
    @interface ConvertParam {
        String inParam();   // 输入参数键
        String outParam();  // 输出参数键
    }
}
```

Integrate

├── name 显示名称

├── config 配置类

├── Advanced 更多配置

│   ├── host 请求域名+端口

│   ├── path 请求路径 以“/”开头

│   ├── schema 请求协议 http或者https

│   └── httpMethod 请求方法，默认post

├── ExceptionProcessor 异常配置

│   ├── exceptionPredictFun 异常判定函数名

│   ├── exceptionPredictNamespace 异常判定函数命名空间

│   ├── errorMsg 异常判定Msg的键值

│   └── errorCode 异常判定errorCode的键值

├── RequestProcessor 请求处理配置

│   ├── finalResultKey 请求的最终结果键值

│   ├── inOutConverterFun 输入输出转换器函数名称

│   ├── inOutConverterNamespace 输入输出转换器函数命名空间

│   ├── paramConverterCallbackFun 参数转换回调函数名称

│   ├── paramConverterCallbackNamespace 参数转换回调函数命名空间

│   ├── authenticationProcessorFun 认证处理器函数名称

│   ├── authenticationProcessorNamespace 认证处理器函数命名空间

│   ├── serializableFun 序列化函数名称

│   ├── serializableNamespace 序列化函数命名空间

│   ├── deserializationFun 反序列化函数名称

│   ├── deserializationNamespace 反序列化函数命名空间

│   └── convertParams 参数转化集合

│        └──  ConvertParam 参数转化

│             ├── inParam  输入参数的键值

│             └── outParam  输出参数的键值

├── ResponseProcessor 请求处理配置

│   ├── finalResultKey 响应的最终结果键值

│   ├── inOutConverterFun 输入输出转换器函数名称

│   ├── inOutConverterNamespace 输入输出转换器函数命名空间

│   ├── paramConverterCallbackFun 参数转换回调函数名称

│   ├── paramConverterCallbackNamespace 参数转换回调函数命名空间

│   ├── authenticationProcessorFun 认证处理器函数名称

│   ├── authenticationProcessorNamespace 认证处理器函数命名空间

│   ├── serializableFun 序列化函数名称

│   ├── serializableNamespace 序列化函数命名空间

│   ├── deserializationFun 反序列化函数名称

│   ├── deserializationNamespace 反序列化函数命名空间

│   └── convertParams 参数转化集合

│        └──  ConvertParam 参数转化

│             ├── inParam  输入参数的键值

│             └── outParam  输出参数的键值

## （三）使用示例

``` java
@Fun(TestIntegrateService.FUN_NAMESPACE)
@Component
public class TestIntegrateServiceImpl implements TestIntegrateService {
    @Override
    @Function
    @Integrate(
        name = "调用外部接口",
        config = TestEipConfig.class
    )
    @Integrate.Advanced(
        host = "api.oinone.com",
        path = "/data",
        schema = "https"
    )
    @Integrate.RequestProcessor(
        convertParams = {
            @Integrate.ConvertParam(inParam = "data.id", outParam = "id")
        }
    )
    public EipResult<SuperMap> callExternalService(TestOpenApiModel data) {
        return null; // 实际执行由拦截器处理
    }
}
```

## （四）参数说明

### 1、成员变量

| **变量名**                                           | **类型**                                               | **默认值**                                       | **描述**                                                     |
| ---------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------------------ |
| `name`   | `String`   | `""` | 接口的显示名称   |
| `config` | `Class<?>` | 无   | 配置类（必须实现 `IEipAnnotationSingletonConfig`<br/> 接口） |


### 2、嵌套注解

#### `@Advanced`

配置请求的基础信息。

| **变量名**                                               | **类型**                                             | **默认值**                                       | **描述**                                                     |
| -------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------ |
| `host`       | `String` | `""` | 目标服务的域名和端口 |
| `path`       | `String` | `""` | 请求路径         |
| `schema`     | `String` | `""` | 协议类型（如 `http`<br/> 或 `https`<br/>） |
| `httpMethod` | `String` | `""` | HTTP 请求方法（如 `POST`<br/>） |


#### `@RequestProcessor`

配置请求处理逻辑。

| **变量名**                                                   | **类型**                                                     | **默认值**                                       | **描述**                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------------------ |
| `finalResultKey` | `String`         | `""` | 最终请求参数的键值 |
| `convertParams`  | `ConvertParam[]` | `{}` | 参数映射规则     |


#### `@ConvertParam`

定义参数映射规则。

| **变量名**                                             | **类型**                                             | **描述**                                                   |
| ------------------------------------------------------ | ---------------------------------------------------- | ---------------------------------------------------------- |
| `inParam`  | `String` | 输入参数的键值 |
| `outParam` | `String` | 输出参数的键值 |


# 五、核心处理函数

集成平台通过以下函数扩展接口行为：

| **函数类型**                                                 | **接口**                                                     | **说明**                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `inOutConverter` | `IEipInOutConverter` | 处理请求/响应体的输入输出转换 |
| `authenticationProcessor` | `IEipAuthenticationProcessor` | 实现自定义认证逻辑（如Token验证） |
| `serializable`   | `IEipSerializable` | 自定义序列化方式（如XML、JSON） |
| `exceptionProcessor` | `IEipExceptionPredict` | 自定义异常判定逻辑 |


# 六、完整调用流程

## （一）请求流程

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/StandardModule/BestParadigm/c8e20cfdb7698815f7ae55e1ab9893ed.svg)

## （二）响应流程

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/StandardModule/BestParadigm/a76a5527135a992ec7d7f3fbcdb0409e-20250529172921273.svg)

:::warning 提示

在`IEipInOutConverter`中做 md5 和加解密处理

:::

# 七、注册开放和集成接口

## （一）扫描并注册所有标注 `@Open` 和 `@Integrate` 的接口

在模块启动生命周期中调用，与此主题相关的文档可在 “[模块生命周期](/zh/DevManual/Reference/Back-EndFramework/module-API.md#05780b76)” 中找到。

``` java
EipResolver.resolver(TestModule.MODULE_MODULE,null);
```

``` java
@Component
public class SecondModuleBizInit implements InstallDataInit, UpgradeDataInit, ReloadDataInit {

    @Override
    public boolean init(AppLifecycleCommand command, String version) {
        initEip();
        return Boolean.TRUE;
    }

    @Override
    public boolean reload(AppLifecycleCommand command, String version) {
        initEip();
        return Boolean.TRUE;
    }

    @Override
    public boolean upgrade(AppLifecycleCommand command, String version, String existVersion) {
        initEip();
        return Boolean.TRUE;
    }

    @Override
    public List<String> modules() {
        return Collections.singletonList(TestModule.MODULE_MODULE);
    }

    @Override
    public int priority() {
        return 0;
    }

    private void initEip() {
        EipResolver.resolver(TestModule.MODULE_MODULE,null);
    }
}
```

# 八、示例

## （一）注意事项

:::info 注意：config配置

+ **开放接口**：`config = TestEipConfig.class`用于设置通用配置类，可在其中加`@Open.Advanced`，其优先级低于方法上的注解。
+ **集成接口**：必须用`config = TestEipConfig.class`设置通用配置类，可加`@Integrate.Advanced`，优先级低于方法上的注解。

:::

:::info 注意：开放接口固定路径

http://localhost:8094/openapi/pamirs/yourPath

:::

## （二）开放接口定义示例

### 1、基本开放接口

**功能**：定义一个供外部系统调用的查询接口，支持路径参数和基本认证。
**代码示例**：

``` java
@Fun(TestOpenApiModelService.FUN_NAMESPACE)
@Component
public class TestOpenApiModelServiceImpl implements TestOpenApiModelService {

    @Function
    @Open(
        path = "queryById4Open",
        config = TestEipConfig.class
    )
    @Open.Advanced(
        httpMethod = "post",
        authenticationProcessorFun = EipFunctionConstant.DEFAULT_NO_ENCRYPT_AUTHENTICATION_PROCESSOR_FUN,
        authenticationProcessorNamespace = EipFunctionConstant.FUNCTION_NAMESPACE
    )
    public OpenEipResult<TestOpenApiResponse> queryById4Open(IEipContext<SuperMap> context) {
        String id = context.getInterfaceContext().getIteration("id");
        TestOpenApiModel model = queryById(Long.valueOf(id));
        TestOpenApiResponse response = convertToResponse(model);
        return new OpenEipResult<>(response);
    }
}
```

**关键配置**：

+ `@Open.path`：接口路径为 `queryById4Open`。
+ `@Open.config`：关联配置类 `TestEipConfig`。
+ `@Open.Advanced.httpMethod`：使用 POST 方法。
+ `@Open.Advanced.authenticationProcessorFun`：启用无加密认证。

### 2、接口异常响应格式

**功能**：定义一个返回异常信息的开放接口，用于测试错误处理。
**代码示例**：

``` java
@Function
@Open(path = "error")
@Open.Advanced(
    httpMethod = "post",
    authenticationProcessorFun = EipFunctionConstant.DEFAULT_NO_ENCRYPT_AUTHENTICATION_PROCESSOR_FUN
)
public OpenEipResult<TestOpenApiResponse> queryById4OpenError() {
    throw PamirsException.construct(EipExpEnumerate.SYSTEM_ERROR)
    .appendMsg("测试异常")
    .errThrow();
}
```

**响应格式**：

``` plain
{
  "success": false,
  "errorCode": "20140000",
  "errorMsg": "系统异常, 测试异常"
}
```



## （三）集成接口调用示例

### 1、基本集成接口

**功能**：调用外部开放接口，实现参数映射和路由配置。
**代码示例**：

``` java
@Fun(TestIntegrateService.FUN_NAMESPACE)
@Component
public class TestIntegrateServiceImpl implements TestIntegrateService {

    @Override
    @Function
    @Integrate(config = TestEipConfig.class)
    @Integrate.Advanced(
        path = "/openapi/pamirs/queryById4Open",
        schema = "http",
        host = "127.0.0.1:8094"
    )
    @Integrate.RequestProcessor(
        convertParams = {
            @ConvertParam(inParam = "data.id", outParam = "id")
        }
    )
    public EipResult<SuperMap> callQueryByData(TestOpenApiModel data) {
        return null; // 实际由拦截器处理
    }
}
```

**关键配置**：

+ `@Integrate.config`：关联配置类 `TestEipConfig`。
+ `@Integrate.Advanced.path`：目标接口路径。
+ `@Integrate.RequestProcessor.convertParams`：将 `data.id` 映射到请求参数 `id`。

### 2、异常处理集成接口

**功能**：调用可能返回异常的接口，并配置自定义异常判定逻辑。
**代码示例**：

``` java
@Function
@Integrate(config = TestEipConfig.class)
@Integrate.Advanced(path = "/openapi/pamirs/error?tenant=pamirs")
@Integrate.ExceptionProcessor(
    exceptionPredictFun = TestExceptionPredictFunction.FUN,
    exceptionPredictNamespace = TestExceptionPredictFunction.FUN_NAMESPACE
)
public EipResult<SuperMap> callQueryByIdError(TestOpenApiModel data) {
return null;
}
```

**自定义异常判定类**：

``` java
@Fun(TestExceptionPredictFunction.FUN_NAMESPACE)
public class TestExceptionPredictFunction implements IEipExceptionPredict<SuperMap> {
    public static final String FUN_NAMESPACE ="test.TestExceptionPredictFunction";
    public static final String FUN ="testFunction";

    @Override
    @Function
    @Function.fun(FUN)
    public boolean test(IEipContext<SuperMap> context) {
        String errorCode = context.getExecutorContextValue("success");
        return "false".equals(errorCode); // 判定为异常
    }
}
```

## （四）安全策略配置示例

### 1、AccessToken 认证

**功能**：在开放接口中启用 AccessToken 认证，并在集成接口中自动获取 Token。
**开放接口配置**：

``` java
@Open.Advanced(
    authenticationProcessorFun = TestAuthFunction.FUN,
    authenticationProcessorNamespace = TestAuthFunction.FUN_NAMESPACE
)
```

**集成接口认证处理类**：

``` java
@Component
@Fun(TestAuthFunction.FUN_NAMESPACE)
public class TestAuthFunction implements IEipAuthenticationProcessor<SuperMap> {
    public static final String FUN_NAMESPACE ="test.TestAuthFunction";
    public static final String FUN ="testAuthentication";

    @Override
    @Function
    @Function.fun(FUN)
    public boolean authentication(IEipContext<SuperMap> context,ExtendedExchange exchange) {
        // 从 Redis 获取或申请新 Token
        String token = redisTemplate.opsForValue().get("appKey");
        context.putInterfaceContextValue(IEipContext.HEADER_PARAMS_KEY + ".accessToken", token);
        return true;
    }
}
```

### 2、RSA 加密通信

**功能**：在集成接口中对请求参数进行 RSA 加密。
**代码示例**：

``` java
@Integrate.RequestProcessor(
    inOutConverterFun = RSAInOutConverter.FUN,
    inOutConverterNamespace = RSAInOutConverter.FUN_NAMESPACE
)
public EipResult<EncryptedData> sendData(SensitiveRequest request) {
return null;
}
```

**加密处理类**：

``` java
@Fun(RSAInOutConverter.FUN_NAMESPACE)
@Component
public class RSAInOutConverter implements IEipInOutConverter {
    public static final String FUN_NAMESPACE ="test.RSAInOutConverter";
    public static final String FUN ="exchangeObject";

    @Override
    @Function
    @Function.fun(FUN)
    public Object exchangeObject(ExtendedExchange exchange, Object inObject) throws Exception{
        String encrypted = EncryptHelper.encryptByKey(publicKey, inObject.toString());
        return "{\"result\":\"" + encrypted + "\"}";
    }
}
```

## （五）自定义序列化示例

### 1、XML 序列化

**功能**：实现 XML 格式的响应数据解析。
**代码示例**：

``` java
@Integrate.ResponseProcessor(
    serializableFun = TestSerializableFunction.FUN,
    serializableNamespace = TestSerializableFunction.FUN_NAMESPACE
)
public EipResult<XmlData> parseXmlResponse() {
    return null;
}
```

**XML 序列化类**：

``` java
public class TestSerializableFunction implements IEipSerializable<SuperMap> {
    public static final String FUN_NAMESPACE ="test.TestSerializableFunction";
    public static final String FUN ="xmlParser";

    @Override
    @Function.Advanced(displayName = "自定义xml序列化方式")
    @Function.fun(FUN)
    public SuperMap serializable(Object inObject) {
        if (inObject == null) {
            return new SuperMap();
        } else {
            SuperMap result;
            if (inObject instanceof String) {
                String inObjectString = (String)inObject;
                if (StringUtils.isNotBlank(inObjectString)) {
                    result = this.stringToSuperMap(inObjectString);
                } else {
                    result = new SuperMap();
                }
            } else if (inObject instanceof InputStream) {
                result = this.inputStreamToString((InputStream)inObject);
            } else if (inObject instanceof SuperMap) {
                result = (SuperMap) inObject;
            }
            else{
                result = new SuperMap();
            }
            return result;
        }
    }

    protected SuperMap inputStreamToString(InputStream inputStream) {
        StringBuilder sb = new StringBuilder();
        String line;
        try (BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream))) {
            while ((line = bufferedReader.readLine()) != null) {
                sb.append(line);
            }
            return serializable(sb.toString());
        } catch (IOException e) {
            return new SuperMap();
        }
    }


    protected SuperMap stringToSuperMap(String s) {
        SuperMap result = new SuperMap();
        try {
            Document document = DocumentHelper.parseText(s);
            Element root = document.getRootElement();
            iterateNodes(root, result);
            return result;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    public static void iterateNodes(Element node, SuperMap superMap){
        //获取当前元素的名称
        String nodeName = node.getName();
        if(superMap.containsKey(nodeName)){
            //该元素在同级下有多个
            Object object = superMap.getIteration(nodeName);
            List<Object> list = Lists.newArrayList();
            if(object instanceof JSONArray){
                list = (List) object;
            }else {
                list = Lists.newArrayList();
                list.add(object);
            }
            //获取该元素下所有子元素
            List<Element> listElement = node.elements();
            if(listElement.isEmpty()){
                //该元素无子元素，获取元素的值
                String nodeValue = node.getTextTrim();
                list.add(nodeValue);
                superMap.putIteration(nodeName, list);
                return;
            }
            //有子元素
            SuperMap subMap = new SuperMap();
            //遍历所有子元素
            for(Element e:listElement){
                //递归
                iterateNodes(e, subMap);
            }
            list.add(subMap);
            subMap.putIteration(nodeName, list);
            return;
        }
        List<Element> listElement = node.elements();
        if(listElement.isEmpty()){
            //该元素无子元素，获取元素的值
            String nodeValue = node.getTextTrim();
            superMap.putIteration(nodeName, nodeValue);
            return;
        }
        //有子节点，新建一个JSONObject来存储该节点下子节点的值
        SuperMap subMap = new SuperMap();
        //遍历所有一级子节点
        for(Element e:listElement){
            //递归
            iterateNodes(e, subMap);
        }
        superMap.putIteration(nodeName, subMap);
    }

}
```

:::info 注意：示例中加入了dom4j的依赖

<dependency>

    <groupId>dom4j</groupId>

    <artifactId>dom4j</artifactId>

    <version>1.1</version>

</dependency>

:::









