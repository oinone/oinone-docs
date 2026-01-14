---
title: 文件存储：MINIO无公网访问地址下OSS的配置
index: true
category:
  - 常见解决方案
order: 42
---

在实际项目里，时常会出现 MINIO 外网无法访问的状况，必须通过应用的域名（或 IP）进行转发，方可实现访问。这篇文章主要就是针对解决此类场景问题而作。

:::warning  提示：

若 MINIO 外网能够直接访问，正常对 MINIO 进行 OSS 配置即可。

:::

# 一、阅读之前
+ 需了解 MINIO 对于 endpoint（端点）存在特定限制， `As per S3 specification, path in the endpoint is not supported.`  也就是说，MINIO 的请求地址不能包含路径。

详细参考：  
[https://github.com/minio/minio-java/issues/1476](https://github.com/minio/minio-java/issues/1476)
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/minIo-1024x667-20250530144824786.png)

# 二、解决办法
+  在项目中，需为 MINIO 配置一个可访问的外网地址。同时，于网络层（NGINX）进行设置，将此外网地址映射至 MINIO 的内网地址。
+ 鉴于 MINIO 对 endpoint 的限制，其仅支持 “IP + 端口” 的形式，既不允许包含路径（path），亦无法通过配置路径的方式实现转发。因此，必须提供一个以 “IP（或域名） + 端口” 形式呈现的外部地址。

# 三、详细配置步骤
## （一）项目中OSS的配置
将 uploadUrl 与 downloadUrl 配置设定为外网可访问的地址，此地址并非 MINIO 的实际地址。也就是说，针对 MINIO 的访问操作，需借助一个能够从外部进行访问的地址来实现转换。

```yaml
cdn:
  oss:
    name: MINIO
    type: MINIO
    bucket: pamirs
    # uploadUrl 和 downloadUrl配置为外网可访问的地址，非实际的MINIO地址
    uploadUrl: http://127.0.0.1:8083
    downloadUrl: http://127.0.0.1:8083
    accessKeyId: xxx
    accessKeySecret: xxx
    mainDir: assert/demo
    validTime: 3600000A
    timeout: 600000
    active: true
    referer:
    localFolderUrl:
```

## （二）NGINX配置（MINIO配置）

```nginx
upstream minio {
  #真实的MINIO的地址
  server xxx.xxx.xxx.xxx:9000 weight=100 max_fails=2 fail_timeout=30s;
}

server {
  listen 8083;
  server_name 127.0.0.1;

  location / {
    proxy_set_header Host $http_host;
    proxy_set_header X-Forwarded-For $remote_addr;
    client_body_buffer_size 10M;
    client_max_body_size 50M;
    proxy_buffers 1024 4k;
    proxy_read_timeout 3000;
    proxy_next_upstream error timeout http_404;

    proxy_pass http://minio;
  }
}
```

