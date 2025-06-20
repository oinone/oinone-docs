---
title: FileClient API
index: true
category:
  - Development Manual
  - Reference
  - Backend API
  - Advance API
order: 6

---
# I. Overview

`FileClient` is an abstract interface used to unify file operations for different object storage services (such as Alibaba Cloud OSS, Huawei Cloud OBS, Tencent Cloud COS, MinIO, Upyun, etc.). Instances are obtained through the factory class `FileClientFactory`, supporting multi-CDN configurations.

## (一) Obtaining Instances

```plain
// Get the default client
FileClient fileClient = FileClientFactory.getClient();

// Get a specific client by cdnKey (used in multi-CDN configurations)
FileClient fileClient = FileClientFactory.getClient("cdnKey");
```

## (二) Configuration Example: Taking Alibaba Cloud OSS as an Example

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
    validTime: 3600000  # Signature validity period (milliseconds)
    timeout: 600000     # Request timeout
    active: true
```

For more configuration references: [File Storage Configuration](/en/DevManual/Reference/Back-EndFramework/module-API.md#十四-文件存储配置-pamirs-file)

# II. Method Descriptions

## (一) Uploading Files

### 1、`upload(String fileName, byte[] data)`

+ **Description**: Uploads a byte array to OSS.
+ **Parameters**:
  - `fileName`: File name (including path)
  - `data`: Byte array of file content
+ **Returns**: `CdnFile` containing file metadata and access URL
+ **Example**:

```java
byte[] data = ...; // File content
CdnFile cdnFile = fileClient.upload("path/file.txt", data);
```

### 2、`upload(String fileName, InputStream inputStream)`

+ **Description**: Uploads a file via an input stream.
+ **Parameters**:
  - `fileName`: File name (including path)
  - `inputStream`: File input stream
+ **Returns**: `CdnFile`
+ **Example**:

```java
try (InputStream is = new FileInputStream("local.txt")) {
    CdnFile cdnFile = fileClient.upload("path/file.txt", is);
}
```

### 3、`uploadByFileName(String fileName, byte[] data)`

+ **Description**: Uploads a file and returns the download URL.
+ **Returns**: File download URL (String)
+ **Example**:

```java
String url = fileClient.uploadByFileName("path/image.png", imageData);
```

### 4、`uploadByFileName(String fileName, InputStream inputStream)`

+ **Description**: Uploads a file via an input stream and returns the download URL.
+ **Example**:

```java
String url = fileClient.uploadByFileName("path/image.png", inputStream);
```

## (二) Obtaining Download URLs

### 1、`getDownloadUrl(String fileName)`

+ **Description**: Obtains the download URL of a file uploaded via `uploadByFileName`.
+ **Parameters**: `fileName` - File name used during upload
+ **Returns**: Complete download URL
+ **Example**:

```java
String url = fileClient.getDownloadUrl("path/image.png");
```

## (三) Delete Operations

### 1、`deleteByFolder(String folder)`

+ **Description**: Deletes all files under the specified folder.
+ **Parameters**: `folder` - Folder path
+ **Example**:

```java
fileClient.deleteByFolder("temp/");
```

### 2、`deleteByFilename(String filename)`

+ **Description**: Deletes the specified file.
+ **Parameters**: `filename` - Complete file name (including path)
+ **Example**:

```java
fileClient.deleteByFilename("path/file.txt");
```

## (四) File Check

### 1、`isExistByFilename(String filename)`

+ **Description**: Checks if a file exists.
+ **Returns**: `true` if exists, `false` if not
+ **Example**:

```java
boolean exists = fileClient.isExistByFilename("path/file.txt");
```

## (五) Obtaining Static Resource URLs

### 1、`getStaticUrl()`

+ **Description**: Obtains the root URL for static resources, determining whether to use CDN based on configuration.
+ **Returns**: URL string
+ **Example**:

```java
String staticUrl = fileClient.getStaticUrl();
```

# III. Complete Example

Batch upload files and obtain URLs

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

# IV. Data Structure CdnFile

| **Field**                                         | **Type**                                           | **Description**                                                     |
| ------------------------------------------------ | -------------------------------------------------- | ------------------------------------------------------------ |
| name | String | File name           |
| size | Long   | File size (bytes) |
| type | String | File type         |
| url  | String | Complete access URL for the file |


# V. Notes

1. **Multi-CDN Configuration**: Use `FileClientFactory.getClient(String cdnKey)` to obtain a client with specified configuration.
2. **Path Specifications**: File names are recommended to include paths (e.g., `"images/avatar.jpg"`) to avoid using the root directory directly.

# VI. Supported Storage Services

| **Service Provider**                                            | **Type Identifier**                                              | **Implementation Class**                                                   |
| ----------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------ |
| Alibaba Cloud OSS | `OSS`         | `AliyunOSSClient` |
| Huawei Cloud OBS | `HUAWEI_OBS`  | `HuaweiOBSClient` |
| Local Storage  | `LOCAL`       | `LocalFileClient` |
| MinIO     | `MINIO`       | `MiniOssClient`  |
| Upyun    | `UPYUN`       | `UpyunOSSClient` |
| Tencent Cloud COS | `TENCENT_COS` | `TencentCosClient` |