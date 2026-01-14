---
title: MCP
index: true
category:
  - User Manual
  - Designer
order: 6
---
# 一、What is MCP?

Typically, the technical framework of MCP is built around three key components: **Host**, **Client**, and **Server**. These components work together to form an efficient and scalable ecosystem, providing a solid foundation for dynamic interactions between AI models and external resources. The MCP architecture is illustrated in the figure below:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/MCP/1745924941151-b60a4f65-981a-4297-afc9-cdf38daed0c7.png)

MCP (Model Context Protocol) serves as the de facto standard for interactions between intelligent agents and external systems. Through MCP, you can encapsulate Oinone's internal capabilities, integrated heterogeneous systems, and third-party platform APIs into standardized MCP services, which can be directly invoked by intelligent agents to accelerate R&D and innovation.


# 二、Use Cases

+ Integrate and expose heterogeneous capabilities (such as databases and legacy systems) as MCP services
+ Encapsulate third-party platform APIs into MCP services
+ Expose Oinone's native application capabilities as MCP services

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/MCP/1756781990989-65a484be-8e4a-41ad-acda-cd5dcc595fc3.png)


# 三、Functional Modules

Oinone's MCP functionality is primarily accessed via **[Integration Designer → MCP Module]**, which includes the following core modules:

1. **Connector**  
   Convert existing APIs into MCP Tools
2. **Open API (Open Platform)**  
   Convert external interfaces into MCP Tools
3. **Tools Management**  
   Manage and publish MCP Tools (APIs, manually added tools, etc.)
4. **Server (Application Management)**
   - Manage MCP applications and configure authentication, activation, and deactivation
   - Serve as the unified entry point for MCP usage


# 四、Operation Guide

## (I) Publish Application Connector as MCP Tool

**Operation Path**: **[Integration Designer → Connector → Select Application API → Publish as MCP Tool]**

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/MCP/1756782048040-d36e6582-b4cd-4e92-a5bc-f689a47b522f.png)

## (II) Publish Database Connector as MCP Tool

**Operation Path**: **[Integration Designer → Connector → Select Database API → Publish as MCP Tool]**

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/MCP/1756782068048-d662ec0c-0a49-45bd-af1d-4283dc52228e.png)

:::info **Key Notes:**
- Technical Name → MCP Tool Name
- API Description → MCP Tool Description
- Parameters → MCP InputSchema (Remarks are mapped to Parameter Descriptions)
- Parameters such as Query and Body are organized into objects and converted into MCP **InputSchema**. Among these, the **Parameter Remarks** are crucial and need to be used as descriptions for the properties of MCP.InputSchema.
:::

## (III) Publish Open Interface as MCP Tool

**Operation Path**: **[Integration Designer → Open Platform → Select Open Interface → Publish as MCP Tool]**

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/MCP/1756782100901-b8667ead-a892-402c-be14-94e53097a07d.png)

Example of Parameter Conversion:

```plain
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "tools": [
      {
        "name": "get_weather",
        "description": "Get current weather information for a location",
        "inputSchema": {
          "type": "object",
          "properties": {
            "location": {
              "type": "string",
              "description": "City name or zip code"
            }
          },
          "required": ["location"]
        }
      }
    ],
    "nextCursor": "next-page-cursor"
  }
}
```

## (IV) Create a New MCP Tool

**Operation Path**: **[Integration Designer → MCP → Tools → Create New Tool]**

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/MCP/1756782129918-dab8fd3d-4276-437b-9a8b-907300cc0190.png)

## (V) Create a New MCP Application (Server)

**Operation Path**: **[Integration Designer → MCP → Applications → Create New Application]**

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/MCP/1756782146808-1935e5a5-6e63-43d4-a2c4-d4b4dfb9d9f9.png)

:::info **Configuration Items**:
- Application Name (globally unique)
- URL (globally unique, external access path)
- Wire Protocols: Streamable HTTP (default)
- Authentication Method: None / Basic / Bearer / Custom Header
- Authorized Tool Scope: Supports searching by all MCP Tool names/descriptions
:::


# 五、Client Configuration Guide

## (I) Basic Connection Configuration

Configure in MCP Clients (e.g., Trae, Cursor, etc.):

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/MCP/1756782289667-707f725f-b015-48b1-a1b4-5618a72e3c6c.png)

```plain
{
  "mcpServers": {
    "testMcp": {
      "url": "http://sstest.oinone.top/openapi/mcp/test"
    }
  }
}
```

- `mcpServers`: Root object for MCP server configuration, supporting multiple server configurations
- `testMcp`: Server identifier (displayed in the editor)
- `url`: MCP application address (domain name + MCP application configuration path)

## (II) Authentication Configuration

**Basic Authentication**:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/MCP/1756783190436-ab3d637b-3fd1-49f3-ace1-15207e143683.png)

```plain
{
  "mcpServers": {
    "testMcp": {
      "url": "http://sstest.oinone.top/openapi/xiaoyantest/one",
      "headers": {
        "Authorization": "Basic dXNlcm5hbWU6dXBhc3N3b3J..."
      }
    }
  }
}
```

**Bearer Token Authentication**:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/MCP/1756783259053-966e4c2b-d016-4503-a9af-f8a2dfcd49eb.png)

```plain
{
  "mcpServers": {
    "myLocalMcp": {
      "url": "http://sstest.oinone.top/openapi/xiaoyantest/one",
      "headers": {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      }
    }
  }
}
```

**Custom Header Authentication**:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/MCP/1756783304791-19d2968a-0793-475f-96b6-feff5643869a.png)

```plain
{
  "mcpServers": {
    "myLocalMcp": {
      "url": "http://sstest.oinone.top/openapi/xiaoyantest/one",
      "headers": {
        "X-API-Key": "your-api-key-here"
      }
    }
  }
}
```


# 六、Usage Example

Assume the query interfaces for the order table, product table, and user table have been published as MCP Tools. After connecting, you can directly use natural language to query in the editor:

"Count the number of orders placed by regular users in July 2025, grouped by payment method."

The system will automatically invoke the corresponding MCP Tools and return the results.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/MCP/1756782357583-f51ed0e8-d61d-43bb-b258-e7e0dae0a07f.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/MCP/1756782372446-2a4c2e9e-d052-4364-917e-60c5d0805b06.png)


# 七、Summary

Through MCP, you can quickly encapsulate databases, legacy systems, third-party APIs, and Oinone's native capabilities into tools that can be directly invoked by intelligent agents.