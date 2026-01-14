---
title: 配置说明：Dubbo配置详解（改）
index: true
category:
  - 常见解决方案
order: 67
---

# 一、概述
Dubbo 作为一款具备高性能、轻量级特征的开源 Java RPC 框架，提供了三大核心功能：面向接口的远程方法调用、智能容错与负载均衡，以及服务自动注册与发现机制。

Oinone 平台默认采用`dubbo - v2.7.22`版本，本文将以该版本为基础展开阐述。

# 二、基本概念
Dubbo 在进行`provider/consumer`注册时，选用`Netty`作为 RPC 调用的核心服务，具备典型的`客户端/服务端（C/S）`架构特性。具体而言，`provider`承担`服务端`角色，`consumer`充当`客户端`角色。

当`客户端`经由`服务中心`发现存在可调用服务时，将借助`服务中心`提供的`服务端`调用信息，与`服务端`建立连接并发起请求，以此达成远程调用功能。

## （一）服务注册（绑定Host/Port）
JAVA程序启动时，需要将`provider`的信息注册到`服务中心`，并在当前环境为`Netty`服务开启`Host/Port`监听，以实现`服务注册`功能。

在下文中，我们通过`绑定Host/Port`表示`Netty`服务的访问地址，通过`注册Host/Port`表示客户端的访问地址。

## （二）使用yaml配置`绑定Host/Port`
:::info 注意：该配置可在多种环境中通用，改变部署方式无需修改此配置。

:::

```yaml
dubbo:
  protocol:
    name: dubbo
    # host: 0.0.0.0
    port: -1
```

假设当前环境可用 IP 为`192.168.1.100`，上述配置将使`Netty`服务默认绑定于`0.0.0.0:20880`地址，服务注册地址设定为`192.168.1.100:20880`。`客户端`将通过`192.168.1.100:20880`对服务端服务进行调用。

若出现 20880 端口被占用的情况，系统将自动向后搜寻可用端口，如 20881、20882 等。若当前可用端口为 20881，则上述配置将致使`Netty`服务默认绑定于`0.0.0.0:20881`地址，服务注册地址变为`192.168.1.100:20881`。

## （三）使用环境变量配置`注册Host/Port`
当服务端处于容器环境时，鉴于容器环境内部网络配置相对于宿主机的独立性，为确保客户端能够正常调用服务端，需在容器内配置环境变量，以保障客户端可通过指定的`注册Host/Port`实现访问。

以下示例针对无法使用 20880 端口的情形，将宿主机可访问端口由 20880 变更为 20881。

```shell
DUBBO_IP_TO_REGISTRY=192.168.1.100
DUBBO_PORT_TO_REGISTRY=20881
```

假设当前宿主机环境的可用IP为`192.168.1.100`。

以上配置将使得`Netty`服务默认绑定在`0.0.0.0:20881`地址，服务注册地址为`192.168.1.100:20881`。

`客户端`将通过`192.168.1.100:20881`调用服务端服务。

## （四）使用docker/docker-compose启动
需添加端口映射，将20881端口映射至宿主机20881端口。（此处容器内的端口发生变化，若需要了解具体原因，可参考题外话章节）

**docker-run**

```shell
IP=192.168.1.100

docker run -d --name designer-allinone-full \
-e DUBBO_IP_TO_REGISTRY=$IP \
-e DUBBO_PORT_TO_REGISTRY=20881 \
-p 20881:20881 \
```

**docker-compose**

```yaml
services:
  backend:
    container_name: designer-backend
    image: harbor.oinone.top/oinone/designer-backend-v5.0
    restart: always
    environment:
      DUBBO_IP_TO_REGISTRY: 192.168.1.100
      DUBBO_PORT_TO_REGISTRY: 20881
    ports:
     - 20881:20881 # dubbo端口
```

## （五）使用kubernetes启动
**工作负载（Deployment）**

```yaml
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

**服务（Services）**

```yaml
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

:::info 注意：此处的`targetPort`为对应`Deployment#spec. template.spec.containers.ports.name`配置的端口名称。若未配置，可使用`20881`直接指定对应容器的端口号。

:::

## （六）使用kubernetes其他暴露服务方式
在Kubernetes中部署服务，有多种配置方式均可用暴露服务。上述配置仅用于通过`Service/NodePort`将`20881`端口暴露至宿主机，其他服务可用通过任意Kubernetes节点IP进行调用。

若其他服务也在Kubernetes中进行部署，则可以通过`Service/Service`方式进行调用。将`DUBBO_IP_TO_REGISTRY`配置为`${serviceName}.${namespace}`即可。

若其他服务无法直接访问Kubernetes的master服务，则可以通过`Ingress/Service`方式进行调用。将`DUBBO_IP_TO_REGISTRY`配置为`Ingress`可解析域名即可。

# 三、Dubbo调用链路图解
:::info 注意：`Consumer`的`绑定Host/Port`是其作为`Provider`使用的，下面所有图解仅演示单向的调用链路。

:::

**名词解释**

+ Provider: 服务提供者（JVM）
+ Physical Machine Provider: 服务提供者所在物理机
+ Provider Container: 服务提供者所在容器
+ Kubernetes Service: Kubernetes Service资源类型
+ Consumer: 服务消费者（JVM）
+ Registration Center: 注册中心；可以是`zookeeper`、`nacos`等。
+ bind: 服务`绑定Host/Port`到指定`ip:port`。
+ registry: 服务注册；`注册Host/Port`到注册中心的信息。
+ discovery: 服务发现；`注册Host/Port`到消费者的信息。
+ invoke: 服务调用；消费者通过注册中心提供的提供者信息向提供者发起服务调用。
+ forward: 网络转发；通常在容器环境需要进行必要的网络转发，以使得服务调用可以到达服务提供者。

### `物理机/物理机`调用链路
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/20250530145736.png)

:::info 注意：此处虚线部分表示提供者部署在物理机上，并不存在真实的网络处理。

:::

### `容器/物理机`调用链路
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/20250530145806.png)

:::info 注意：此处虚线部分表示提供者部署在容器中，并不存在真实的网络处理。

:::

### `Kubernetes/物理机`(Service/NodePort模式)调用链路
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/20250530145830.png)

:::info 注意：此处虚线部分表示提供者部署在容器中，并不存在真实的网络处理。

:::

# 四、题外话
在`dubbo-v2.7.22`源码中，作者发现`Host/Port`的获取方式并不对等，这里目前不太清楚是`dubbo`设计如此还是作者对`dubbo`设计理解不足。

+ 现象：
    - `DUBBO_IP_TO_REGISTRY`配置与`dubbo.protocol.host`无关。
    - `DUBBO_PORT_TO_REGISTRY`配置优先级高于`dubbo.protocol.port`配置。
+ 作者理解：
    - 客户端向服务端发起请求时，应使用`注册Host/Port`进行调用，只要该访问地址可以与服务端连通，则远程调用就可以正常运行。
    - `注册Host/Port`与`绑定Host/Port`应支持完全独立配置。当`注册Host/Port`与`绑定Host/Port`均被配置时，`注册Host`与`绑定Host`是独立生效的，但`绑定Port`却强制使用了`注册Port`。（这一点也是经常在容器环境中无法正常调用的主要原因）

# 五、常用配置
## （一）yaml配置
```yaml
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

+ dubbo.registry.address: 注册中心地址
+ dubbo.registry.group: 全局 group 配置
+ dubbo.registry.timeout: 全局超时时间配置
+ dubbo.protocol.name: 协议名称
+ dubbo.protocol.host: 绑定主机IP配置；默认：0.0.0.0
+ dubbo.protocol.port: 绑定主机端口配置；-1表示自动获取可用端口；默认：20880
+ dubbo.protocol.serialization: 序列化配置；Oinone平台必须使用`pamirs`作为序列化方式。
+ dubbo.protocol.payload: RPC调用数据大小限制；单位：字节(byte)
+ dubbo.scan.base-packages: provider/consumer 扫描包路径
+ dubbo.cloud.subscribed-services: 多提供者配置；示例中该参数配置为空是为了避免启动时的警告日志，一般无需配置。

## （二）环境变量配置
```shell
DUBBO_IP_TO_REGISTRY=127.0.0.1
DUBBO_PORT_TO_REGISTRY=20880
```

+ DUBBO_IP_TO_REGISTRY：注册Host配置
+ DUBBO_PORT_TO_REGISTRY：注册Port配置

# 六、源码参考
+ `org.apache.dubbo.config.ServiceConfig#findConfigedHosts`

```java
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

```java
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

```java
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

```java
public static String getSystemProperty(String key) {
    String value = System.getenv(key);
    if (StringUtils.isEmpty(value)) {
        value = System.getProperty(key);
    }
    return value;
}
```

