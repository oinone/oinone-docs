---
title: 文件客户端 API（FileClient API）
index: true
category:
  - 研发手册
  - Reference
  - 后端API
  - Advance API
order: 6

---
# 一、概述

`FileClient` 是一个抽象接口，用于统一不同对象存储服务（如阿里云OSS、华为云OBS、腾讯云COS、MinIO、又拍云等）的文件操作。通过工厂类 `FileClientFactory` 获取实例，支持多CDN配置。

## （一）获取实例

```plain
// 获取默认客户端
FileClient fileClient = FileClientFactory.getClient();

// 根据cdnKey获取特定客户端（多CDN配置时使用）
FileClient fileClient = FileClientFactory.getClient("cdnKey");
```

## （二）配置示例：以阿里云OSS为例

```yaml
cdn:
  oss:
    name: 阿里云
    type: OSS
    bucket: your-bucket-name
    uploadUrl: oss-cn-hangzhou.aliyuncs.com
    downloadUrl: oss-cn-hangzhou.aliyuncs.com
    accessKeyId: your-access-key-id
    accessKeySecret: your-access-key-secret
    mainDir: upload/
    validTime: 3600000  # 签名有效期（毫秒）
    timeout: 600000     # 请求超时时间
    active: true
```

更多配置参考：[文件存储配置](/zh-cn/DevManual/Reference/Back-EndFramework/module-API.md#十四-文件存储配置-pamirs-file)

# 二、方法说明

## （一）上传文件

### 1、`upload(String fileName, byte[] data)`

+ **描述**: 上传字节数组到OSS。
+ **参数**:
  - `fileName`: 文件名（包含路径）
  - `data`: 文件内容的字节数组
+ **返回**: `CdnFile` 包含文件元数据和访问URL
+ **示例**:

```java
byte[] data = ...; // 文件内容
CdnFile cdnFile = fileClient.upload("path/file.txt", data);
```

### 2、`upload(String fileName, InputStream inputStream)`

+ **描述**: 通过输入流上传文件。
+ **参数**:
  - `fileName`: 文件名（包含路径）
  - `inputStream`: 文件输入流
+ **返回**: `CdnFile`
+ **示例**:

```java
try (InputStream is = new FileInputStream("local.txt")) {
    CdnFile cdnFile = fileClient.upload("path/file.txt", is);
}
```

### 3、`uploadByFileName(String fileName, byte[] data)`

+ **描述**: 上传文件并返回下载URL。
+ **返回**: 文件下载URL（String）
+ **示例**:

```java
String url = fileClient.uploadByFileName("path/image.png", imageData);
```

### 4、`uploadByFileName(String fileName, InputStream inputStream)`

+ **描述**: 通过输入流上传文件并返回下载URL。
+ **示例**:

```java
String url = fileClient.uploadByFileName("path/image.png", inputStream);
```

## （二）获取下载URL

### 1、`getDownloadUrl(String fileName)`

+ **描述**: 获取通过 `uploadByFileName` 上传的文件的下载URL。
+ **参数**: `fileName` - 上传时使用的文件名
+ **返回**: 完整的下载URL
+ **示例**:

```java
String url = fileClient.getDownloadUrl("path/image.png");
```

## （三）删除操作

### 1、`deleteByFolder(String folder)`

+ **描述**: 删除指定文件夹下的所有文件。
+ **参数**: `folder` - 文件夹路径
+ **示例**:

```java
fileClient.deleteByFolder("temp/");
```

### 2、`deleteByFilename(String filename)`

+ **描述**: 删除指定文件。
+ **参数**: `filename` - 完整文件名（含路径）
+ **示例**:

```java
fileClient.deleteByFilename("path/file.txt");
```

## （四）文件检查

### 1、`isExistByFilename(String filename)`

+ **描述**: 检查文件是否存在。
+ **返回**: `true` 存在，`false` 不存在
+ **示例**:

```java
boolean exists = fileClient.isExistByFilename("path/file.txt");
```

## （五）获取静态资源URL

### 1、`getStaticUrl()`

+ **描述**: 获取静态资源根URL，根据配置决定是否使用CDN。
+ **返回**: URL字符串
+ **示例**:

```java
String staticUrl = fileClient.getStaticUrl();
```

# 三、完整示例

批量上传文件并获取URL

```java
private static Map<String, String> uploadFiles(File directory) {
    Map<String, String> result = new HashMap<>();
    File[] files = directory.listFiles();
    if (files == null) return result;

    for (File file : files) {
        try (FileInputStream is = new FileInputStream(file)) {
            String fileName = "widget/" + file.getName();
            fileClient.uploadByFileName(fileName, is);
            String url = fileClient.getDownloadUrl(fileName);
            result.put(file.getName(), url);
        } catch (Exception e) {
            throw new RuntimeException("Upload failed", e);
        }
    }
    return result;
}
```

# 四、数据结构 CdnFile

| **字段**                                         | **类型**                                           | **描述**                                                     |
| ------------------------------------------------ | -------------------------------------------------- | ------------------------------------------------------------ |
| name | String | 文件名           |
| size | Long   | 文件大小（字节） |
| type | String | 文件类型         |
| url  | String | 文件完整访问URL  |


# 五、注意事项

1. **多CDN配置**: 使用 `FileClientFactory.getClient(String cdnKey)` 获取指定配置的客户端。
2. **路径规范**: 文件名建议包含路径（如 `"images/avatar.jpg"`），避免直接使用根目录。

# 六、支持的存储服务

| **服务商**                                            | **类型标识**                                              | **实现类**                                                   |
| ----------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------ |
| 阿里云OSS | `OSS`         | `AliyunOSSClient` |
| 华为云OBS | `HUAWEI_OBS`  | `HuaweiOBSClient` |
| 本地存储  | `LOCAL`       | `LocalFileClient` |
| MinIO     | `MINIO`       | `MiniOssClient`  |
| 又拍云    | `UPYUN`       | `UpyunOSSClient` |
| 腾讯云COS | `TENCENT_COS` | `TencentCosClient` |

