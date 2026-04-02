---
title: Configuration Instructions:Detailed Dubbo Configuration (Revised)
index: true
category:
  - Common Solutions
order: 67
---

# I. Overview
Dubbo, as a high-performance and lightweight open-source Java RPC framework, provides three core functions: interface-oriented remote method invocation, intelligent fault tolerance and load balancing, as well as automatic service registration and discovery mechanisms.

The Oinone platform uses the `dubbo-v2.7.22` version by default, and this document will elaborate based on this version.

# II. Basic Concepts
When Dubbo registers `provider/consumer`, it selects `Netty` as the core service for RPC calls, featuring a typical `Client/Server (C/S)` architecture. Specifically, the `provider` acts as the server, and the `consumer` acts as the client.

When the client discovers callable services through the service center, it establishes a connection with the server and initiates requests using the server's call information provided by the service center, thus achieving remote invocation.

## (Ⅰ) Service Registration (Binding Host/Port)
When a JAVA program starts, it needs to register the `provider` information with the `service center` and open `Host/Port` listening for the `Netty` service in the current environment to implement the `service registration` function.

In the following text, `binding Host/Port` denotes the access address of the Netty service, and `registering Host/Port` denotes the client's access address.

## (Ⅱ) Using YAML to Configure `Binding Host/Port`
:::info Note: This configuration is universal across multiple environments, and changing the deployment method does not require modifying this configuration.

:::

``` yaml
dubbo:
  protocol:
    name: dubbo
    # host: 0.0.0.0
    port: -1
```

Assuming the available IP in the current environment is `192.168.1.100`, the above configuration will bind the Netty service to `0.0.0.0:20880` by default, with the service registration address set to `192.168.1.100:20880`. The client will invoke the server's services via `192.168.1.100:20880`.

If port 20880 is occupied, the system will automatically search for the next available port, such as 20881, 20882, etc. If the current available port is 20881, the above configuration will bind the Netty service to `0.0.0.0:20881` by default, with the service registration address becoming `192.168.1.100:20881`.

## (Ⅲ) Using Environment Variables to Configure `Registered Host/Port`
When the server is in a container environment, due to the independence of the container's internal network configuration relative to the host, to ensure the client can normally invoke the server, environment variables need to be configured within the container to ensure the client can access via the specified `registered Host/Port`.

The following example changes the host's accessible port from 20880 to 20881 when port 20880 cannot be used.

``` shell
DUBBO_IP_TO_REGISTRY=192.168.1.100
DUBBO_PORT_TO_REGISTRY=20881
```

Assume the available IP in the current host environment is `192.168.1.100`.

The above configuration will bind the Netty service to `0.0.0.0:20881` by default, with the service registration address being `192.168.1.100:20881`.

The client will invoke the server's services via `192.168.1.100:20881`.

## (Ⅳ) Starting with Docker/Docker Compose
Port mapping needs to be added to map port 20881 to port 20881 on the host. (The port inside the container changes here; for the specific reason, refer to the Digression section.)

**docker-run**

``` shell
IP=192.168.1.100

docker run -d --name designer-allinone-full \
-e DUBBO_IP_TO_REGISTRY=$IP \
-e DUBBO_PORT_TO_REGISTRY=20881 \
-p 20881:20881 \
```

**docker-compose**

``` yaml
services:
  backend:
    container_name: designer-backend
    image: harbor.oinone.top/oinone/designer-backend-v5.0
    restart: always
    environment:
      DUBBO_IP_TO_REGISTRY: 192.168.1.100
      DUBBO_PORT_TO_REGISTRY: 20881
    ports:
     - 20881:20881 # dubbo port
```

## (Ⅴ) Starting with Kubernetes
**Workload (Deployment)**

``` yaml
kind: Deployment
apiVersion: apps/v1
spec:
  replicas: 1
  template:
    spec:
      containers:
        - name: designer-backend
          image: harbor.oinone.top/oinone/designer-backend-v5.0
          ports:
            - name: dubbo
              containerPort: 20881
              protocol: TCP
          env:
            - name: DUBBO_IP_TO_REGISTRY
              value: "192.168.1.100"
            - name: DUBBO_PORT_TO_REGISTRY
              value: "20881"
```

**Service (Services)**

``` yaml
kind: Service
apiVersion: v1
spec:
  type: NodePort
  ports:
    - name: dubbo
      protocol: TCP
      port: 20881
      targetPort: dubbo
      nodePort: 20881
```

:::info Note: The `targetPort` here corresponds to the port name configured in `Deployment#spec.template.spec.containers.ports.name`. If not configured, `20881` can be directly used to specify the corresponding container port number.

:::

## (Ⅵ) Other Service Exposure Methods in Kubernetes
When deploying services in Kubernetes, multiple configuration methods can expose services. The above configuration only uses `Service/NodePort` to expose port `20881` to the host, and other services can be invoked via any Kubernetes node IP.

If other services are also deployed in Kubernetes, they can be invoked via the `Service/Service` method. Set `DUBBO_IP_TO_REGISTRY` to `${serviceName}.${namespace}`.

If other services cannot directly access the Kubernetes master service, they can be invoked via the `Ingress/Service` method. Set `DUBBO_IP_TO_REGISTRY` to a resolvable domain name for Ingress.

# III. Dubbo Call Chain Diagram
:::info Note: The `binding Host/Port` of the `Consumer` is used as a `Provider`, and all diagrams below only demonstrate unidirectional call chains.

:::

**Noun Explanation**

+ Provider: Service provider (JVM)
+ Physical Machine Provider: Physical machine where the service provider resides
+ Provider Container: Container where the service provider resides
+ Kubernetes Service: Kubernetes Service resource type
+ Consumer: Service consumer (JVM)
+ Registration Center: Registration center; can be `zookeeper`, `nacos`, etc.
+ bind: Bind the service `Host/Port` to the specified `ip:port`.
+ registry: Service registration; register `Host/Port` information with the registration center.
+ discovery: Service discovery; register `Host/Port` information with the consumer.
+ invoke: Service invocation; the consumer initiates service calls to the provider using the provider information provided by the registration center.
+ forward: Network forwarding; necessary network forwarding is usually required in container environments to ensure service calls reach the service provider.

### `Physical Machine/Physical Machine` Call Chain
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/20250530145736.png)

:::info Note: The dashed line here indicates the provider is deployed on a physical machine, with no actual network processing involved.

:::

### `Container/Physical Machine` Call Chain
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/20250530145806.png)

:::info Note: The dashed line here indicates the provider is deployed in a container, with no actual network processing involved.

:::

### `Kubernetes/Physical Machine` (Service/NodePort Mode) Call Chain
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/20250530145830.png)

:::info Note: The dashed line here indicates the provider is deployed in a container, with no actual network processing involved.

:::

# IV. Digression
In the source code of `dubbo-v2.7.22`, the author found that the way `Host/Port` is obtained is not symmetrical, and it is currently unclear whether this is by design in Dubbo or due to the author's insufficient understanding of Dubbo's design.

+ Phenomena:
    - The `DUBBO_IP_TO_REGISTRY` configuration is independent of `dubbo.protocol.host`.
    - The `DUBBO_PORT_TO_REGISTRY` configuration takes precedence over the `dubbo.protocol.port` configuration.
+ Author's Understanding:
    - When the client initiates a request to the server, it should use the `registered Host/Port` for invocation. As long as this access address can connect to the server, remote invocation can proceed normally.
    - `Registered Host/Port` and `bound Host/Port` should support fully independent configuration. When both `registered Host/Port` and `bound Host/Port` are configured, `registered Host` and `bound Host` take effect independently, but `bound Port` forcibly uses `registered Port`. (This is also the main reason for failed invocations in container environments.)

# V. Common Configurations
## (Ⅰ) YAML Configuration
``` yaml
dubbo:
  application:
    name: pamirs-test
    version: 1.0.0
  registry:
    address: zookeeper://127.0.0.1:2181
    # group: demo
    # timeout: 5000
  protocol:
    name: dubbo
    # host: 0.0.0.0
    port: -1
    serialization: pamirs
    payload: 104857600
  scan:
    base-packages: pro.shushi
  cloud:
    subscribed-services:

```

+ dubbo.registry.address: Registration center address
+ dubbo.registry.group: Global group configuration
+ dubbo.registry.timeout: Global timeout configuration
+ dubbo.protocol.name: Protocol name
+ dubbo.protocol.host: Bound host IP configuration; default: 0.0.0.0
+ dubbo.protocol.port: Bound host port configuration; -1 indicates automatically acquiring an available port; default: 20880
+ dubbo.protocol.serialization: Serialization configuration; The Oinone platform must use `pamirs` as the serialization method.
+ dubbo.protocol.payload: RPC call data size limit; unit: byte
+ dubbo.scan.base-packages: Provider/consumer scan package path
+ dubbo.cloud.subscribed-services: Multi-provider configuration; The parameter is configured as empty in the example to avoid warning logs during startup, and generally does not require configuration.

## (Ⅱ) Environment Variable Configuration
``` shell
DUBBO_IP_TO_REGISTRY=127.0.0.1
DUBBO_PORT_TO_REGISTRY=20880
```

+ DUBBO_IP_TO_REGISTRY: Registered host configuration
+ DUBBO_PORT_TO_REGISTRY: Registered port configuration

# VI. Source Code Reference
+ `org.apache.dubbo.config.ServiceConfig#findConfigedHosts`

``` java
private String findConfigedHosts(ProtocolConfig protocolConfig,
                                 List<URL> registryURLs,
                                 Map<String, String> map) {
    boolean anyhost = false;

    String hostToBind = getValueFromConfig(protocolConfig, DUBBO_IP_TO_BIND);
    if (hostToBind != null && hostToBind.length() > 0 && isInvalidLocalHost(hostToBind)) {
        throw new IllegalArgumentException("Specified invalid bind ip from property:" + DUBBO_IP_TO_BIND + ", value:" + hostToBind);
    }

    // if bind ip is not found in environment, keep looking up
    if (StringUtils.isEmpty(hostToBind)) {
        hostToBind = protocolConfig.getHost();
        if (provider != null && StringUtils.isEmpty(hostToBind)) {
            hostToBind = provider.getHost();
        }
        if (isInvalidLocalHost(hostToBind)) {
            anyhost = true;
            logger.info("No valid ip found from environment, try to get local host.");
            hostToBind = getLocalHost();
        }
    }

    map.put(BIND_IP_KEY, hostToBind);

    // registry ip is not used for bind ip by default
    String hostToRegistry = getValueFromConfig(protocolConfig, DUBBO_IP_TO_REGISTRY);
    if (hostToRegistry != null && hostToRegistry.length() > 0 && isInvalidLocalHost(hostToRegistry)) {
        throw new IllegalArgumentException(
                "Specified invalid registry ip from property:" + DUBBO_IP_TO_REGISTRY + ", value:" + hostToRegistry);
    } else if (StringUtils.isEmpty(hostToRegistry)) {
        // bind ip is used as registry ip by default
        hostToRegistry = hostToBind;
    }

    map.put(ANYHOST_KEY, String.valueOf(anyhost));

    return hostToRegistry;
}
```

+ `org.apache.dubbo.config.ServiceConfig#findConfigedPorts`

``` java
private Integer findConfigedPorts(ProtocolConfig protocolConfig,
                                  String name,
                                  Map<String, String> map, int protocolConfigNum) {
    Integer portToBind = null;

    // parse bind port from environment
    String port = getValueFromConfig(protocolConfig, DUBBO_PORT_TO_BIND);
    portToBind = parsePort(port);

    // if there's no bind port found from environment, keep looking up.
    if (portToBind == null) {
        portToBind = protocolConfig.getPort();
        if (provider != null && (portToBind == null || portToBind == 0)) {
            portToBind = provider.getPort();
        }
        final int defaultPort = ExtensionLoader.getExtensionLoader(Protocol.class).getExtension(name).getDefaultPort();
        if (portToBind == null || portToBind == 0) {
            portToBind = defaultPort;
        }
        if (portToBind <= 0) {
            portToBind = getRandomPort(name);
            if (portToBind == null || portToBind < 0) {
                portToBind = getAvailablePort(defaultPort);
                putRandomPort(name, portToBind);
            }
        }
    }

    // registry port, not used as bind port by default
    String key = DUBBO_PORT_TO_REGISTRY;
    if (protocolConfigNum > 1) {
        key = getProtocolConfigId(protocolConfig).toUpperCase() + "_" + key;
    }
    String portToRegistryStr = getValueFromConfig(protocolConfig, key);
    Integer portToRegistry = parsePort(portToRegistryStr);
    if (portToRegistry != null) {
        portToBind = portToRegistry;
    }

    // save bind port, used as url's key later
    map.put(BIND_PORT_KEY, String.valueOf(portToBind));

    return portToBind;
}
```

+ `org.apache.dubbo.config.ServiceConfig#getValueFromConfig`

``` java
private String getValueFromConfig(ProtocolConfig protocolConfig, String key) {
    String protocolPrefix = protocolConfig.getName().toUpperCase() + "_";
    String value = ConfigUtils.getSystemProperty(protocolPrefix + key);
    if (StringUtils.isEmpty(value)) {
        value = ConfigUtils.getSystemProperty(key);
    }
    return value;
}
```

+ `org.apache.dubbo.common.utils.ConfigUtils#getSystemProperty`

``` java
public static String getSystemProperty(String key) {
    String value = System.getenv(key);
    if (StringUtils.isEmpty(value)) {
        value = System.getProperty(key);
    }
    return value;
}
```