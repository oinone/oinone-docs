---
title: EIP API
index: true
category:
  - Development Manual
  - Reference
  - Standard Modules
order: 6
next:
  text: Common Extension Points And SPI List
  link: /v6/en/DevManual/Reference/common-extension-points-and-SPI-list.md
---
# I. Overview

The Oinone integration platform provides flexible interface definition capabilities through the annotations `@Integrate` and `@Open`, supporting efficient integration of internal and external enterprise systems.

+ `@Open`: Used to declare open interfaces for external system invocation.
+ `@Integrate`: Used to declare integration interfaces for invoking external system interfaces.

This document details the configuration items, usage scenarios, and examples of these two annotations.

:::warning Note

This document helps you quickly grasp core concepts and basic logic. However, during actual development, using the designer for auxiliary development is highly recommended. The designer provides a visual operation interface, simplifies configuration processes, reduces coding complexity, helps you complete development tasks more efficiently and accurately, and significantly improves development efficiency and quality.

:::

# II. Preparation Work

## (Ⅰ) YAML Configuration

### 1. Open Platform Configuration

Related documentation on this topic can be found in "[Integration Platform Configuration](/en/DevManual/Reference/Back-EndFramework/module-API.md#xvi-integration-platform-configuration-pamirseip)".

### 2. Start the eip Module

``` yaml
pamirs
  boot:
    modules:
      - eip
      -eip_mcp #is added as needed. If eip_mcp is included here, pamirs-eip2-mcp should be included in the pom of boot
```

## (Ⅱ) Maven Dependencies

### 1. Add Relevant Dependencies to the api Project

Add the dependency on pamirs-eip2-api to xxxModule-api:

``` xml
<dependency>
  <groupId>pro.shushi.pamirs.core</groupId>
  <artifactId>pamirs-eip2-api</artifactId>
</dependency>
```

### 2. Add Relevant Dependencies to the Startup Project

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

<!-- Version 6.3.0 provides eip2-mcp, which can be added as needed. If this is added here, this starts modules by increasing eip_mcp -->
<dependency>
  <groupId>pro.shushi.pamirs.core</groupId>
  <artifactId>pamirs-eip2-mcp</artifactId>
</dependency>
```

## (Ⅲ) Add Module Dependencies to the Project's Module

Add dependency on EipModule to the xxxModule definition class:

``` java
@Module(dependencies = {EipModule.MODULE_MODULE})
```

# III. `@Open` Annotation

## (Ⅰ) Function Description

The `@Open` annotation defines open interfaces, allowing external systems to invoke them via HTTP requests. It supports configuring request methods, input/output converters, authentication processors, and other functions.

## (Ⅱ) Annotation Structure

``` java
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
public @interface Open {
    String name() default "";        // Interface display name
    Class<?> config() default Void.class; // Associated configuration class
    String path() default "";        // Interface path

    // Advanced configuration
    @interface Advanced {
        String httpMethod() default "post";                // HTTP method (default POST)
        String inOutConverterFun() default "";             // Input/output conversion function name
        String inOutConverterNamespace() default "";       // Input/output conversion function namespace
        String authenticationProcessorFun() default "";    // Authentication processing function name
        String authenticationProcessorNamespace() default ""; // Authentication processing function namespace
        String serializableFun() default "";               // Serialization function name
        String serializableNamespace() default "";         // Serialization function namespace
        String deserializationFun() default "";            // Deserialization function name
        String deserializationNamespace() default "";      // Deserialization function namespace
    }
}
```

Open

├── name Display name

├── config Configuration class

├── path Path

├── Advanced More configurations

│   ├── httpMethod Request method, default: post

│   ├── inOutConverterFun Input/output converter function name

│   ├── inOutConverterNamespace Input/output converter function namespace

│   ├── authenticationProcessorFun Authentication processor function name

│   ├── authenticationProcessorNamespace Authentication processor function namespace

│   ├── serializableFun Serialization function name

│   ├── serializableNamespace Serialization function namespace

│   ├── deserializationFun Deserialization function name

│   └── deserializationNamespace Deserialization function namespace

## (Ⅲ) Usage Example

``` java
@Fun(TestOpenApiModelService.FUN_NAMESPACE)
@Component
public class TestOpenApiModelServiceImpl implements TestOpenApiModelService {
    @Function
    @Open(
        name = "Query Open Interface Data",
        path = "queryById4Open",
        config = TestEipConfig.class
    )
    @Open.Advanced(
        httpMethod = "post",
        authenticationProcessorFun = EipFunctionConstant.DEFAULT_AUTHENTICATION_PROCESSOR_FUN,
        authenticationProcessorNamespace = EipFunctionConstant.FUNCTION_NAMESPACE
    )
    public OpenEipResult<TestOpenApiResponse> queryById4Open(IEipContext<SuperMap> context) {
        // Business logic
        return result;
    }
}
```

## (Ⅳ) Parameter Description

### 1. Member Variables

| **Variable Name**                                           | **Type**                                               | **Default Value**                                               | **Description**                                                     |
| ---------------------------------------------------- | ------------------------------------------------------ | -------------------------------------------------------- | ------------------------------------------------------------ |
| `name`   | `String`   | `""`         | Interface display name   |
| `config` | `Class<?>` | `Void.class` | Configuration class (needs to implement `IEipAnnotationSingletonConfig`<br/> interface) |
| `path`   | `String`   | `""`         | Interface request path   |


### 2. Nested Annotation `@Advanced`

Used to configure advanced options, can be annotated on methods or classes.

| **Variable Name**                                                   | **Type**                                             | **Default Value**                                       | **Description**                                                     |
| ------------------------------------------------------------ | ---------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------ |
| `httpMethod`     | `String` | `""` | HTTP request method (such as `POST`<br/>) |
| `inOutConverterFun` | `String` | `""` | Input/output converter function name |
| `inOutConverterNamespace` | `String` | `""` | Input/output converter namespace |
| `authenticationProcessorFun` | `String` | `""` | Authentication processor function name |
| `authenticationProcessorNamespace` | `String` | `""` | Authentication processor namespace |
| `serializableFun` | `String` | `""` | Serialization function name     |
| `serializableNamespace` | `String` | `""` | Serialization function namespace |
| `deserializationFun` | `String` | `""` | Deserialization function name   |
| `deserializationNamespace` | `String` | `""` | Deserialization function namespace |


# IV. `@Integrate` Annotation

## (Ⅰ) Function Description

The `@Integrate` annotation defines integrated interfaces, supporting invocation of external system open interfaces. It supports routing configuration, parameter conversion, exception handling, and other functions.

## (Ⅱ) Annotation Structure

``` java
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
public @interface Integrate {
    String name() default "";        // Interface display name
    Class<?> config();               // Associated configuration class (required)

    // Advanced configuration
    @interface Advanced {
        String host() default "";    // Target service domain name (e.g., "api.example.com")
        String path() default "";    // Target interface path (e.g., "/v1/data")
        String schema() default "";  // Protocol (e.g., "http" or "https")
        String httpMethod() default "post"; // HTTP method
    }

    // Request processor configuration
    @interface RequestProcessor {
        String finalResultKey() default "";  // Final request parameter key
        Integrate.ConvertParam[] convertParams() default {}; // Parameter mapping rules
        // Other configuration items (such as serialization, authentication processor, etc.)
    }

    // Response processor configuration
    @interface ResponseProcessor {
        String finalResultKey() default "";  // Final response result key
        // Other configuration items
    }

    // Exception processor configuration
    @interface ExceptionProcessor {
        String exceptionPredictFun() default "";     // Exception determination function name
        String exceptionPredictNamespace() default ""; // Exception determination function namespace
    }

    // Parameter mapping rules
    @interface ConvertParam {
        String inParam();   // Input parameter key
        String outParam();  // Output parameter key
    }
}
```

Integrate

├── name Display name

├── config Configuration class

├── Advanced More configurations

│   ├── host Request domain name + port

│   ├── path Request path starting with "/"

│   ├── schema Request protocol http or https

│   └── httpMethod Request method, default post

├── ExceptionProcessor Exception configuration

│   ├── exceptionPredictFun Exception determination function name

│   ├── exceptionPredictNamespace Exception determination function namespace

│   ├── errorMsg Exception determination Msg key

│   └── errorCode Exception determination errorCode key

├── RequestProcessor Request processing configuration

│   ├── finalResultKey Final result key of the request

│   ├── inOutConverterFun Input/output converter function name

│   ├── inOutConverterNamespace Input/output converter function namespace

│   ├── paramConverterCallbackFun Parameter conversion callback function name

│   ├── paramConverterCallbackNamespace Parameter conversion callback function namespace

│   ├── authenticationProcessorFun Authentication processor function name

│   ├── authenticationProcessorNamespace Authentication processor function namespace

│   ├── serializableFun Serialization function name

│   ├── serializableNamespace Serialization function namespace

│   ├── deserializationFun Deserialization function name

│   ├── deserializationNamespace Deserialization function namespace

│   └── convertParams Parameter conversion collection

│        └──  ConvertParam Parameter conversion

│             ├── inParam Input parameter key

│             └── outParam Output parameter key

├── ResponseProcessor Request processing configuration

│   ├── finalResultKey Final result key of the response

│   ├── inOutConverterFun Input/output converter function name

│   ├── inOutConverterNamespace Input/output converter function namespace

│   ├── paramConverterCallbackFun Parameter conversion callback function name

│   ├── paramConverterCallbackNamespace Parameter conversion callback function namespace

│   ├── authenticationProcessorFun Authentication processor function name

│   ├── authenticationProcessorNamespace Authentication processor function namespace

│   ├── serializableFun Serialization function name

│   ├── serializableNamespace Serialization function namespace

│   ├── deserializationFun Deserialization function name

│   ├── deserializationNamespace Deserialization function namespace

│   └── convertParams Parameter conversion collection

│        └──  ConvertParam Parameter conversion

│             ├── inParam Input parameter key

│             └── outParam Output parameter key

## (Ⅲ) Usage Example

``` java
@Fun(TestIntegrateService.FUN_NAMESPACE)
@Component
public class TestIntegrateServiceImpl implements TestIntegrateService {
    @Override
    @Function
    @Integrate(
        name = "Invoke External Interface",
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
        return null; // Actually processed by the interceptor
    }
}
```

## (Ⅳ) Parameter Description

### 1. Member Variables

| **Variable Name**                                           | **Type**                                               | **Default Value**                                       | **Description**                                                     |
| ---------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------------------ |
| `name`   | `String`   | `""` | Interface display name   |
| `config` | `Class<?>` | None   | Configuration class (must implement `IEipAnnotationSingletonConfig`<br/> interface) |


### 2. Nested Annotations

#### `@Advanced`

Configures basic request information.

| **Variable Name**                                               | **Type**                                             | **Default Value**                                       | **Description**                                                     |
| -------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------ |
| `host`       | `String` | `""` | Target service domain name and port |
| `path`       | `String` | `""` | Request path         |
| `schema`     | `String` | `""` | Protocol type (such as `http`<br/> or `https`<br/>) |
| `httpMethod` | `String` | `""` | HTTP request method (such as `POST`<br/>) |


#### `@RequestProcessor`

Configures request processing logic.

| **Variable Name**                                                   | **Type**                                                     | **Default Value**                                       | **Description**                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------------------ |
| `finalResultKey` | `String`         | `""` | Final request parameter key |
| `convertParams`  | `ConvertParam[]` | `{}` | Parameter mapping rules     |


#### `@ConvertParam`

Defines parameter mapping rules.

| **Variable Name**                                             | **Type**                                             | **Description**                                                   |
| ------------------------------------------------------ | ---------------------------------------------------- | ---------------------------------------------------------- |
| `inParam`  | `String` | Input parameter key |
| `outParam` | `String` | Output parameter key |


# V. Core Processing Functions

The integration platform extends interface behavior through the following functions:

| **Function Type**                                                 | **Interface**                                                     | **Description**                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `inOutConverter` | `IEipInOutConverter` | Processes input/output conversion of request/response bodies |
| `authenticationProcessor` | `IEipAuthenticationProcessor` | Implements custom authentication logic (such as Token verification) |
| `serializable`   | `IEipSerializable` | Custom serialization methods (such as XML, JSON) |
| `exceptionProcessor` | `IEipExceptionPredict` | Custom exception determination logic |


# VI. Complete Call Flow

## (Ⅰ) Request Flow

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/StandardModule/BestParadigm/c8e20cfdb7698815f7ae55e1ab9893ed.svg)

## (Ⅱ) Response Flow

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/StandardModule/BestParadigm/a76a5527135a992ec7d7f3fbcdb0409e-20250529172921273.svg)

:::warning Note

Perform md5 and encryption/decryption processing in `IEipInOutConverter`

:::

# VII. Register Open and Integrated Interfaces

## (Ⅰ) Scan and Register All Interfaces Marked with `@Open` and `@Integrate`

Called during module startup lifecycle, related documentation on this topic can be found in "[Module Lifecycle](/en/DevManual/Reference/Back-EndFramework/module-API.md#Ⅲ、模块生命周期)".

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

# VIII. Examples

## (Ⅰ) Notes

:::info Note: config Configuration

+ **Open Interface**: `config = TestEipConfig.class` is used to set the general configuration class, where `@Open.Advanced` can be added, with priority lower than the annotation on the method.
+ **Integrated Interface**: Must use `config = TestEipConfig.class` to set the general configuration class, and `@Integrate.Advanced` can be added, with priority lower than the annotation on the method.

:::

:::info Note: Open Interface Fixed Path

http://localhost:8094/openapi/pamirs/yourPath

:::

## (Ⅱ) Open Interface Definition Examples

### 1. Basic Open Interface

**Function**: Define a query interface for external system invocation, supporting path parameters and basic authentication.
**Code Example**:

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

**Key Configurations**:

+ `@Open.path`: Interface path is `queryById4Open`.
+ `@Open.config`: Associated with configuration class `TestEipConfig`.
+ `@Open.Advanced.httpMethod`: Uses POST method.
+ `@Open.Advanced.authenticationProcessorFun`: Enables unencrypted authentication.

### 2. Interface Exception Response Format

**Function**: Define an open interface returning exception information for testing error handling.
**Code Example**:

``` java
@Function
@Open(path = "error")
@Open.Advanced(
    httpMethod = "post",
    authenticationProcessorFun = EipFunctionConstant.DEFAULT_NO_ENCRYPT_AUTHENTICATION_PROCESSOR_FUN
)
public OpenEipResult<TestOpenApiResponse> queryById4OpenError() {
    throw PamirsException.construct(EipExpEnumerate.SYSTEM_ERROR)
    .appendMsg("Test Exception")
    .errThrow();
}
```

**Response Format**:

``` plain
{
  "success": false,
  "errorCode": "20140000",
  "errorMsg": "System Exception, Test Exception"
}
```



## (Ⅲ) Integrated Interface Invocation Examples

### 1. Basic Integrated Interface

**Function**: Invoke external open interfaces, implementing parameter mapping and routing configuration.
**Code Example**:

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
        return null; // Actually processed by the interceptor
    }
}
```

**Key Configurations**:

+ `@Integrate.config`: Associated with configuration class `TestEipConfig`.
+ `@Integrate.Advanced.path`: Target interface path.
+ `@Integrate.RequestProcessor.convertParams`: Maps `data.id` to request parameter `id`.

### 2. Exception Handling Integrated Interface

**Function**: Invoke interfaces that may return exceptions and configure custom exception determination logic.
**Code Example**:

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

**Custom Exception Determination Class**:

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
        return "false".equals(errorCode); // Determine as exception
    }
}
```

## (Ⅳ) Security Policy Configuration Examples

### 1. AccessToken Authentication

**Function**: Enable AccessToken authentication in open interfaces and automatically obtain tokens in integrated interfaces.
**Open Interface Configuration**:

``` java
@Open.Advanced(
    authenticationProcessorFun = TestAuthFunction.FUN,
    authenticationProcessorNamespace = TestAuthFunction.FUN_NAMESPACE
)
```

**Integrated Interface Authentication Processing Class**:

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
        // Get or apply for a new Token from Redis
        String token = redisTemplate.opsForValue().get("appKey");
        context.putInterfaceContextValue(IEipContext.HEADER_PARAMS_KEY + ".accessToken", token);
        return true;
    }
}
```

### 2. RSA Encrypted Communication

**Function**: Encrypt request parameters in integrated interfaces using RSA.
**Code Example**:

``` java
@Integrate.RequestProcessor(
    inOutConverterFun = RSAInOutConverter.FUN,
    inOutConverterNamespace = RSAInOutConverter.FUN_NAMESPACE
)
public EipResult<EncryptedData> sendData(SensitiveRequest request) {
return null;
}
```

**Encryption Processing Class**:

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

## (Ⅴ) Custom Serialization Examples

### 1. XML Serialization

**Function**: Implement parsing of response data in XML format.
**Code Example**:

``` java
@Integrate.ResponseProcessor(
    serializableFun = TestSerializableFunction.FUN,
    serializableNamespace = TestSerializableFunction.FUN_NAMESPACE
)
public EipResult<XmlData> parseXmlResponse() {
    return null;
}
```

**XML Serialization Class**:

``` java
public class TestSerializableFunction implements IEipSerializable<SuperMap> {
    public static final String FUN_NAMESPACE ="test.TestSerializableFunction";
    public static final String FUN ="xmlParser";

    @Override
    @Function.Advanced(displayName = "Custom XML Serialization Method")
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
        //Get the name of the current element
        String nodeName = node.getName();
        if(superMap.containsKey(nodeName)){
            //There are multiple instances of this element at the same level
            Object object = superMap.getIteration(nodeName);
            List<Object> list = Lists.newArrayList();
            if(object instanceof JSONArray){
                list = (List) object;
            }else {
                list = Lists.newArrayList();
                list.add(object);
            }
            //Get all sub-elements under this element
            List<Element> listElement = node.elements();
            if(listElement.isEmpty()){
                //This element has no sub-elements, get the element's value
                String nodeValue = node.getTextTrim();
                list.add(nodeValue);
                superMap.putIteration(nodeName, list);
                return;
            }
            //Has sub-elements
            SuperMap subMap = new SuperMap();
            //Traverse all sub-elements
            for(Element e:listElement){
                //Recursion
                iterateNodes(e, subMap);
            }
            list.add(subMap);
            subMap.putIteration(nodeName, list);
            return;
        }
        List<Element> listElement = node.elements();
        if(listElement.isEmpty()){
            //This element has no sub-elements, get the element's value
            String nodeValue = node.getTextTrim();
            superMap.putIteration(nodeName, nodeValue);
            return;
        }
        //Has child nodes, create a new JSONObject to store the values of the child nodes under this node
        SuperMap subMap = new SuperMap();
        //Traverse all first-level child nodes
        for(Element e:listElement){
            //Recursion
            iterateNodes(e, subMap);
        }
        superMap.putIteration(nodeName, subMap);
    }

}
```

:::info Note: The example includes the dom4j dependency

<dependency>

    <groupId>dom4j</groupId>

    <artifactId>dom4j</artifactId>

    <version>1.1</version>

</dependency>

:::