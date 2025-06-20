---
title: File Storage:OSS (CDN) Configuration and File System Operations
index: true
category:
  - Common Solutions
order: 43
---

# 一、OSS Types Supported by Oinone
| Type | Service |
| --- | --- |
| OSS | Alibaba Cloud OSS |
| UPYUN | Upyun |
| MINIO | MinIO |
| HUAWEI_OBS | Huawei Cloud OBS |
| LOCAL | Local NGINX File Storage |
| TENCENT_COS | Tencent Cloud COS |


# 二、OSS Universal YAML Configuration
```yaml
cdn:
  oss:
    name: # Name
    type: # Type
    bucket:
    uploadUrl: # Upload URL
    downloadUrl: # Download URL
    accessKeyId:
    accessKeySecret:
    mainDir: # Main directory
    validTime: 3600000
    timeout: 600000
    active: true
    referer:
    localFolderUrl:
    others:
      [key]:
        name: # Name
        type: # Type
        bucket:
        uploadUrl: # Upload URL
        downloadUrl: # Download URL
        accessKeyId:
        accessKeySecret:
        mainDir: # Main directory
        validTime: 3600000
        timeout: 600000
        active: true
        referer:
        localFolderUrl:
```

:::info Note:

In `others`, use a custom `key` to specify the OSS service for file upload/download functions. Upload/download configurations must match; otherwise, the functions cannot be used normally.

:::

# 三、OSS Configuration Examples
## （一）Alibaba Cloud OSS
```yaml
cdn:
  oss:
    name: Alibaba Cloud
    type: OSS
    bucket: pamirs (modify according to actual situation)
    uploadUrl: oss-cn-hangzhou.aliyuncs.com
    downloadUrl: oss-cn-hangzhou.aliyuncs.com
    accessKeyId: Your accessKeyId
    accessKeySecret: Your accessKeySecret
    # Modify according to actual situation
    mainDir: upload/
    validTime: 3600000
    timeout: 600000
    active: true
    imageResizeParameter:
    referer:
```

## （二）Huawei Cloud OBS
```yaml
cdn:
  oss:
    name: Huawei Cloud
    type: HUAWEI_OBS
    bucket: pamirs (modify according to actual situation)
    uploadUrl: obs.cn-east-2.myhuaweicloud.com
    downloadUrl: obs.cn-east-2.myhuaweicloud.com
    accessKeyId: Your accessKeyId
    accessKeySecret: Your accessKeySecret
    # Modify according to actual situation
    mainDir: upload/
    validTime: 3600000
    timeout: 600000
    active: true
    allowedOrigin: http://192.168.95.31:8888,https://xxxx.xxxxx.com
    referer:
```

Huawei Cloud OBS requires adding the following dependencies to the startup project:

```xml
<okhttp3.version>4.9.3</okhttp3.version>
<dependency>
    <groupId>com.squareup.okhttp3</groupId>
    <artifactId>okhttp</artifactId>
    <version>${okhttp3.version}</version>
</dependency>
```

:::info Note:

For Huawei Cloud OBS anti-leech configuration, only requests with specific referers are allowed. However, when processing Excel imports anonymously in the backend, no referer is carried, resulting in rejection.

:::

## （三）MINIO
```yaml
File system, MinIO configuration:
cdn:
  oss:
    name: minio
    type: MINIO
    bucket: pamirs (modify according to actual situation)
    uploadUrl: http://192.168.243.6:32190 (modify according to actual situation)
    downloadUrl: http://192.168.243.6:9000 (modify according to actual situation)
    accessKeyId: Your accessKeyId
    accessKeySecret: Your accessKeySecret
    # Modify according to actual situation
    mainDir: upload/
    validTime: 3600000
    timeout: 600000
    active: true
    referer:
    localFolderUrl:
```

## （四）Upyun
```yaml
cdn:
  oss:
    name: Upyun
    type: UPYUN
    bucket: pamirs (modify according to actual situation)
    uploadUrl: v0.api.upyun.com
    downloadUrl: v0.api.upyun.com
    accessKeyId: Your accessKeyId
    accessKeySecret: Your accessKeySecret
    # Modify according to actual situation
    mainDir: upload/
    validTime: 3600000
    timeout: 600000
    active: true
    referer:
```

## （五）Local File Storage
```yaml
cdn:
  oss:
    name: Local File NG System
    type: LOCAL
    # uploadUrl is the Oinone backend service address and port
    uploadUrl: http://127.0.0.1:8091
    # downloadUrl is the frontend address, i.e., the path and port directly mapped to Nginx static resources
    downloadUrl: http://127.0.0.1:8081
    validTime: 3600000
    timeout: 600000
    active: true
    referer:
    # Local Nginx static resource directory
    localFolderUrl: /Users/wangxian/nginx/html/designer/static
```

## （六）Tencent Cloud COS
```yaml
cdn:
  oss:
    name: TENCENT_COS
    type: TENCENT_COS
    bucket: cos-dcode-prod-1252296671
    uploadUrl: cos.ap-shanghai.myqcloud.com
    downloadUrl: cos.ap-shanghai.myqcloud.com
    accessKeyId: Your accessKeyId
    accessKeySecret: Your accessKeySecret
    mainDir: upload/demo/
    validTime: 3600000
    timeout: 600000
    active: true
    image-resize-parameter:
    allowedOrigin: https://test.oinone.com,http://127.0.0.1:88
    referer:
```

Note: For more YAML configurations, please refer to [Module API](/en/DevManual/Reference/Back-EndFramework/module-API.md).

# 四、OSS Code Examples
To directly upload files to OSS in the background, obtain the file system client through `FileClientFactory.getClient()`:

```java
// Get the file client
// 1. Get the default file client
FileClient fileClient = FileClientFactory.getClient();
// 2. Get the file client by cdnKey (used in multi-CDN configurations)
FileClient fileClient = FileClientFactory.getClient(resourceFileForm.getCdnKey());

// Example 1
CdnFile cdnFile = FileClientFactory.getClient().upload(fileName, data/**byte[]*/);

// Example 2
String fileName = "pathname/" + file.getName();
FileClientFactory.getClient().uploadByFileName(fileName, is/**InputStream*/);
```

A complete example:

```java
private static Map<String, String> uploadFiles(File unzipDirectory) {
    Map<String, String> result = new HashMap<>();
    File[] files = unzipDirectory.listFiles();
    if (files == null) {
        return result;
    }
    for (File file : files) {
        try (FileInputStream is = new FileInputStream(file)) {
            // The file name concatenation is just an example; modify it according to actual needs
            String fileName = "widgetFile/" + file.getName();
            FileClientFactory.getClient().uploadByFileName(fileName, is);
            String url = FileClientFactory.getClient().getDownloadUrl(fileName);
            result.put(file.getName(), url);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    return result;
}
```