---
title: 文件存储：OSS(CDN)配置和文件系统的一些操作
index: true
category:
  - 常见解决方案
order: 43
---

# 一、目前Oinone支持的OSS类型
| 类型 | 服务 |
| --- | --- |
| OSS | 阿里云OSS |
| UPYUN | 又拍云 |
| MINIO | MinIO |
| HUAWEI_OBS | 华为云OBS |
| LOCAL | 本地NGINX文件存储 |
| TENCENT_COS | 腾讯云COS |


# 二、OSS通用yaml配置
```yaml
cdn:
  oss:
    name: # 名称
    type: # 类型
    bucket:
    uploadUrl: # 上传URL
    downloadUrl: # 下载URL
    accessKeyId:
    accessKeySecret:
    mainDir: # 主目录
    validTime: 3600000
    timeout: 600000
    active: true
    referer:
    localFolderUrl:
    others:
      [key]:
        name: # 名称
        type: # 类型
        bucket:
        uploadUrl: # 上传URL
        downloadUrl: # 下载URL
        accessKeyId:
        accessKeySecret:
        mainDir: # 主目录
        validTime: 3600000
        timeout: 600000
        active: true
        referer:
        localFolderUrl:
```

:::info 注意：

`others`中使用自定义`key`来指定OSS服务进行文件上传/下载功能。上传/下载必须匹配，否则无法正常使用。

:::

# 三、OSS 配置示例
## （一）阿里云OSS
```yaml
cdn:
  oss:
    name: 阿里云
    type: OSS
    bucket: pamirs(根据实际情况修改)
    uploadUrl: oss-cn-hangzhou.aliyuncs.com
    downloadUrl: oss-cn-hangzhou.aliyuncs.com
    accessKeyId: 你的accessKeyId
    accessKeySecret: 你的accessKeySecret
    # 根据实际情况修改
    mainDir: upload/
    validTime: 3600000
    timeout: 600000
    active: true
    imageResizeParameter:
    referer:
```

## （二）华为云OBS
```yaml
cdn:
  oss:
    name: 华为云
    type: HUAWEI_OBS
    bucket: pamirs(根据实际情况修改)
    uploadUrl: obs.cn-east-2.myhuaweicloud.com
    downloadUrl: obs.cn-east-2.myhuaweicloud.com
    accessKeyId: 你的accessKeyId
    accessKeySecret: 你的accessKeySecret
    # 根据实际情况修改
    mainDir: upload/
    validTime: 3600000
    timeout: 600000
    active: true
    allowedOrigin: http://192.168.95.31:8888,https://xxxx.xxxxx.com
    referer:
```

华为云 OBS 需要在启动工程增加以下依赖

```xml
<okhttp3.version>4.9.3</okhttp3.version>
<dependency>
    <groupId>com.squareup.okhttp3</groupId>
    <artifactId>okhttp</artifactId>
    <version>${okhttp3.version}</version>
</dependency>

```

:::info 注意：

华为云 OBS 的防盗链配置，仅允许携带特定 referer 的才可以，而 excel 导入后端处理的逻辑匿名读的时候是不带 referer 的，所以会被拒绝

:::

## （三）MINIO
```yaml
文件系统，mino的配置：
cdn:
  oss:
    name: minio
    type: MINIO
    bucket: pamirs(根据实际情况修改)
    uploadUrl: http://192.168.243.6:32190(根据实际情况修改)
    downloadUrl: http://192.168.243.6:9000(根据实际情况修改)
    accessKeyId: 你的accessKeyId
    accessKeySecret: 你的accessKeySecret
    # 根据实际情况修改
    mainDir: upload/
    validTime: 3600000
    timeout: 600000
    active: true
    referer:
    localFolderUrl:
```

## （四）又拍云
```yaml
cdn:
  oss:
    name: 又拍云
    type: UPYUN
    bucket: pamirs(根据实际情况修改)
    uploadUrl: v0.api.upyun.com
    downloadUrl: v0.api.upyun.com
    accessKeyId: 你的accessKeyId
    accessKeySecret: 你的accessKeySecret
    # 根据实际情况修改
    mainDir: upload/
    validTime: 3600000
    timeout: 600000
    active: true
    referer:
```

## （五）本地文件存储
```yaml
cdn:
  oss:
    name: 本地文件NG系统
    type: LOCAL
    # uploadUrl 这个是Oinone后端服务地址和端口
    uploadUrl: http://127.0.0.1:8091
    # downloadUrl前端地址，即直接映射在nginx的静态资源的路径和端口
    downloadUrl: http://127.0.0.1:8081
    validTime: 3600000
    timeout: 600000
    active: true
    referer:
    # 本地Nginx静态资源目录
    localFolderUrl: /Users/wangxian/nginx/html/designer/static
```

## （六）腾讯云COS
```yaml
cdn:
  oss:
    name: TENCENT_COS
    type: TENCENT_COS
    bucket: cos-dcode-prod-1252296671
    uploadUrl: cos.ap-shanghai.myqcloud.com
    downloadUrl: cos.ap-shanghai.myqcloud.com
    accessKeyId: 你的accessKeyId
    accessKeySecret: 你的accessKeySecret
    mainDir: upload/demo/
    validTime: 3600000
    timeout: 600000
    active: true
    image-resize-parameter:
    allowedOrigin: https://test.oinone.com,http://127.0.0.1:88
    referer:
```

注：更多 YAML 配置请前往 [Module API](/zh-cn/DevManual/Reference/Back-EndFramework/module-API.md) 查阅。

# 四、OSS代码示例
后台要直接上传文件到 OSS，通过`FileClientFactory.getClient()`获取系统配置的文件系统的客户端

```java
// 获取文件客户端
// 1、获取默认的文件客户端
FileClient fileClient = FileClientFactory.getClient();
// 2、根据cdnKey获取文件客户端（多CDN配置下使用）
FileClient fileClient = FileClientFactory.getClient(resourceFileForm.getCdnKey());

// 示例1
CdnFile cdnFile = FileClientFactory.getClient().upload(fileName, data/**byte[]*/);

//示例2
String fileName = "路径名/" + file.getName();
FileClientFactory.getClient().uploadByFileName(fileName, is/**InputStream*/);
```

一个完整的示例：

```java
private static Map<String, String> uploadFiles(File unzipDirectory) {
    Map<String, String> result = new HashMap<>();
    File[] files = unzipDirectory.listFiles();
    if (files == null) {
        return result;
    }
    for (File file : files) {
        try (FileInputStream is = new FileInputStream(file)) {
            // 文件名拼接fileName仅是一个示例，根据实际情况修改
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

