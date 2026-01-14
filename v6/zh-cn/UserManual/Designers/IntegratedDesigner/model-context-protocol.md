---
title: MCP
index: true
category:
  - 用户手册
  - 设计器
order: 6
---
# 一、什么是 MCP？

通常而言，MCP 的技术框架围绕三个关键组件构建：主机（Host）、客户端（Client）和服务器（Server）。这些组件共同协作，形成了一个高效、可扩展的生态系统，为 AI 模型与外部资源之间的动态交互提供了坚实的基础。MCP 架构如下图所示：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/MCP/1745924941151-b60a4f65-981a-4297-afc9-cdf38daed0c7.png)

MCP（Model Context Protocol）是智能体与外部系统进行交互的事实标准。通过 MCP，您可以将 Oinone 内部能力、集成的异构系统、以及第三方平台 API 封装为标准化 MCP 服务，供智能体直接调用，从而加速研发与创新。

# 二、使用场景

+ 将数据库、老系统等异构能力集成并开放为 MCP 服务
+ 将第三方平台 API 封装为 MCP 服务
+ 将 Oinone 原生应用能力开放为 MCP 服务

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/MCP/1756781990989-65a484be-8e4a-41ad-acda-cd5dcc595fc3.png)

# 三、功能模块

Oinone 的 MCP 功能主要通过【集成设计器 → MCP 模块】使用，包含以下核心模块：

1. **连接器（Connector）**  
   将已有 API 转换为 MCP Tool
2. **开放平台（Open API）**  
   将外部接口转换为 MCP Tool
3. **工具管理（Tools）**  
   管理并发布 MCP 工具（API、人工新增等）
4. **应用管理（Server）**

+ 管理 MCP 应用，配置鉴权与启用/停用
+ MCP 使用的统一入口

# 四、操作指南

## （一）应用连接器发布为 MCP 工具

**操作路径**：【集成设计器 → 连接器 → 选择 应用API → 发布为 MCP 工具】

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/MCP/1756782048040-d36e6582-b4cd-4e92-a5bc-f689a47b522f.png)

## （二）数据库连接器发布为 MCP 工具

**操作路径**：【集成设计器 → 连接器 → 选择 数据库API → 发布为 MCP 工具】

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/MCP/1756782068048-d662ec0c-0a49-45bd-af1d-4283dc52228e.png)

:::info **关键说明：**

+ 技术名称 → MCP 工具名称
+ API 描述 → MCP 工具描述
+ 参数 → MCP InputSchema（备注映射为参数描述）
+ Query、Body 等参数组织成为对象，转换成为 MCP 【InputSchema】，其中参数的【参数备注】至关重要，需要作为 MCP.InputSchema 属性的描述使用。

:::

## （三）开放接口发布为 MCP 工具

**操作路径**：【集成设计器 → 开放平台 → 选择 开放接口 → 发布为 MCP 工具】

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/MCP/1756782100901-b8667ead-a892-402c-be14-94e53097a07d.png)

参数转换示例：

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

## （四）新增 MCP 工具

**操作路径**：【集成设计器 → MCP → 工具 → 新增工具】

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/MCP/1756782129918-dab8fd3d-4276-437b-9a8b-907300cc0190.png)

## （五）新增 MCP 应用（Server）

**操作路径**：【集成设计器 → MCP → 应用 → 新增应用】

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/MCP/1756782146808-1935e5a5-6e63-43d4-a2c4-d4b4dfb9d9f9.png)

:::info **配置项**：

+ 应用名称（全局唯一）
+ URL（全局唯一，对外访问路径）
+ Wire Protocols：Streamable HTTP（默认）
+ 鉴权方式：无 / Basic / Bearer / Custom Header
+ 授权工具范围：支持搜索所有 MCP 工具名称/描述

:::

# 五、客户端配置指南

## （一）基础连接配置

在 MCP Clients（如 Trae、Cursor等）中配置：

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

+ `mcpServers`：MCP 服务器配置根对象，可配置多个服务器
+ `testMcp`：服务器标识名称（将在编辑器中显示）
+ `url`：MCP 应用地址（域名 + MCP 应用配置路径）

## （二）鉴权配置

**Basic 认证**：

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

**Bearer Token 认证**：

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

**Custom Header 认证**：

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

# 六、使用示例

假设已将订单表、商品表和用户表的查询接口发布为 MCP 工具，连接后可在编辑器中直接使用自然语言查询：

"统计 2025 年 7 月普通用户的订单中，各支付方式的数量。"

系统将自动调用相应的 MCP 工具并返回结果。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/MCP/1756782357583-f51ed0e8-d61d-43bb-b258-e7e0dae0a07f.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Integrated%20Designer/MCP/1756782372446-2a4c2e9e-d052-4364-917e-60c5d0805b06.png)

# 七、总结

通过 MCP，您可以快速将数据库、老系统、第三方 API 和 Oinone 原生能力封装为智能体可直接调用的工具。

