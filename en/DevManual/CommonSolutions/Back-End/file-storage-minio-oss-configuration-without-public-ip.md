---
title: File Storage：OSS Configuration for MINIO Without Public Network Access
index: true
category:
  - Common Solutions
order: 42
---

In practical projects, there are often situations where MINIO cannot be accessed from the public network, and access can only be achieved through the application's domain name (or IP) forwarding. This article is mainly written to solve such scenario problems.

:::warning Tip:

If MINIO can be directly accessed from the public network, you can normally configure OSS for MINIO.

:::

# Ⅰ. Before Reading
+ It should be noted that MINIO has specific restrictions on the endpoint, `As per S3 specification, path in the endpoint is not supported.` That is to say, the MINIO request address cannot contain a path.

For detailed reference:  
[https://github.com/minio/minio-java/issues/1476](https://github.com/minio/minio-java/issues/1476)
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/minIo-1024x667-20250530144824786.png)

# Ⅱ. Solution
+ In the project, a accessible public network address needs to be configured for MINIO. At the same time, set up in the network layer (NGINX) to map this public network address to the internal network address of MINIO.
+ Due to MINIO's restrictions on the endpoint, it only supports the form of "IP + port", neither allowing the inclusion of a path (path) nor achieving forwarding through path configuration. Therefore, an external address in the form of "IP (or domain name) + port" must be provided.

# Ⅲ. Detailed Configuration Steps
## \(Ⅰ\) OSS Configuration in the Project
Configure the uploadUrl and downloadUrl as public network accessible addresses, which are not the actual addresses of MINIO. That is to say, for MINIO access operations, a externally accessible address needs to be used for conversion.

```yaml
cdn:
  oss:
    name: MINIO
    type: MINIO
    bucket: pamirs
    # uploadUrl and downloadUrl are configured as public network accessible addresses, not the actual MINIO addresses
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

## \(Ⅱ\) NGINX Configuration (MINIO Configuration)

```nginx
upstream minio {
  # Real MINIO address
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