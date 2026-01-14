---
title: 认证集成：SSO单点登录
index: true
category:
  - 常见解决方案
order: 66
---
# 一、SSO相关

## （一）SSO 服务端操作

在应用系统中，寻找到【单点登录】功能模块，在此模块内创建一个应用标识。此应用标识将作为该应用在 SSO 体系中的唯一识别符号，用于后续的认证与授权流程。

## （二）SSO 登录认证操作

执行 SSO 登录认证时，需采用 `grant_type=password` 的认证方式，并在请求中附带用户名与密码信息。具体的请求链接如下（采用 POST 请求方式）：

```plain
http://127.0.0.1:8190/pamirs/sso/authorize?redirect_uri=http://127.0.0.1:8193/page;module=ysps;model=ysps.notify.ProjectPosting;action=homepage;scene=homepage;target=OPEN_WINDOW;path=/ysps/homepage&response_type=code&client_id=替换为已创建的应用唯一标识&grant_type=password&username=admin&password=admin
```

上述链接中各参数含义如下：

+ **redirect_uri**：此参数指定认证通过后用户将被重定向的目标地址。就当前场景而言，该参数可暂时忽略，无需进行特别配置。
+ **client_id**：务必将此参数替换为在【单点登录】页面所创建的应用唯一标识。此标识用于向 SSO 服务端明确发起认证请求的应用身份，是实现准确认证与授权的关键信息。
+ **grant_type**：认证方式设定为 `grant_type=password`，此为固定配置，表明采用基于用户名和密码的认证机制。在其后需紧跟实际的用户名和密码信息，以此完成身份验证流程。

# 二、操作步骤：

请求服务端工程 SSO 登录认证，会返回 token 信息，拿着这个信息去客户端工程访问即可。

1. 请求服务端工程返回token信息：

```http
curl --location --request POST 'http://127.0.0.1:8094/openapi/get/access-token' \
--header 'User-Agent: Apifox/1.0.0 (https://apifox.com)' \
--header 'Accept: */*' \
--header 'Host: 127.0.0.1:8094' \
--header 'Connection: keep-alive' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--header 'Cookie: pamirs_uc_session_id=88fd2459446a4a20ab0a505bdaf78ebe' \
--data-urlencode 'appkey=1d2195bac42e44e895ea8e030aaa4e52' \
--data-urlencode 'appSecret=JNEyibFBIb2N3tdLmW/M9bnpf120/I6fFMMf86OQlP/wlL5qhJCF3KdAKHlJT0jECmXmJRfTCSlnmB5cWHRsenNGND+TMoXObzDPK7umxazCnaZYiW7JDeuZUOzqskhBPkEJSURAZR5xu1c6UYv542BlHAPsEi+ujnKeCYcKiFHyw7fIB1aijNyCz8d9teUEGYYTtYTXoNp/4Ts8AIJn8xkTjvEq6V9uYOExDEuYGxMgN76ZaiwpbT5387eZy4XCDIy0XWfZo/kv7X+s+rjwlsxWA7jp1w5dDaRmSd4rPO2GSEcL64Pje/Ct5xznhNwH6T5KDd2BLfbZikonh624nqW4hdlVxx/EQUpYp6Yc4Wet6b/DkggCVIZPpcO9pSuRJoC2jGPMrGHM3vYR0YtfFqCJ2/x3m/lQr2v+bP4pGzcRuuCy2tyOZA1uurA23xlssehz4geGiJArkpAUKKUkcafx+dLWODHOcgBKBz6wY38PAcbLkgn6gK6lmmR7cUiDmzmEEor6pYb64YG6tPmpm4AQeBoQYrsyCorA4Ds08nAiPFWUCXcHQCVUbHPTOwHHChFO1lXH/VjkfDv0OI1CD8mZI7ZeK794aIBZdvQGCI+ayQU+5CD1asDNg/M01nnNdWKB7rS9rMvbUOlSNguboAgRbiz3pEAxGJrZUPvkDHM='
```

```json
{
    "access_token": "eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE3NDQyNTk2MTcsInN1YiI6IntcImNsaWVudElkXCI6XCJwYW1pcnNfMjc5YjcwMDBlNDE3NDMxMmFmNDAyMDM0YjhlZjFhOWRcIixcInJhbmRvbUFrSWRcIjpcIjM0MDBiYzY0Njk1MzQzODA4ZTlhNmZhNWRmZjU0MTc2XCIsXCJvcGVuSWRcIjpcIjEwMDAxXCJ9In0.iJ-meyxAGW189Y3aK9Z2rMbf9_MsTKVTfnf3XsDR4iq6qvCGYkiq5197r4A54wwdKAzPZ-iDgkQOjWDh8AYu4A",
    "token_type": null,
    "refresh_token": "eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE3NDQ4NTcyMTcsInN1YiI6IntcImRhdGVUaW1lXCI6XCIxNzQ0MjUyNDE3NDc3XCIsXCJjbGllbnRJZFwiOlwicGFtaXJzXzI3OWI3MDAwZTQxNzQzMTJhZjQwMjAzNGI4ZWYxYTlkXCIsXCJvcGVuSWRcIjpcIjEwMDAxXCJ9In0.TZaK8OuPKudd3YX6AF23m7aplJF7OQlBEDkj0AnPkQdw7aja2WhS7q-VwjPfhqSmfAp-oaaUIcN7Zlune9VLTA",
    "expires_in": 7200,
    "refresh_token_expiresIn": 604800
}
```

2. 发起客户端工程请求。注意：请求 Headers 中需携带 token 参数信息，token 为服务端工程返回token 信息，且请求时 Authorization 参数需加上标识 Bearer+空格。

```shell
curl --location --request POST 'http://127.0.0.1:8092/pamirs/base' \
--header 'loginType: OAUTH' \
--header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE3NDQyMDYwNjUsInN1YiI6IntcImNsaWVudElkXCI6XCJwYW1pcnNfMjc5YjcwMDBlNDE3NDMxMmFmNDAyMDM0YjhlZjFhOWRcIixcInJhbmRvbUFrSWRcIjpcImEzZWZkNjZkMDNlNjQ5MDY4OGU4Y2FhYmIwNjZmZGU4XCIsXCJvcGVuSWRcIjpcIjEwMDAxXCJ9In0.gapCpvM8PCit1oSHv-zJ2tATkCuVQBzqWGebvBcUX2O0bqP9aAhVqQxdNLM19vCqP5s3CXoNk-xzMUu-mo-hSg' \
--header 'User-Agent: Apifox/1.0.0 (https://apifox.com)' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"mutation {\n  teacherMutation {\n    queryTea(\n      data: {id: 672564120180166836, teacherName: \"`````\", readStatus: NO_READ, createDate: \"2024-11-05 11:30:36\", writeDate: \"2024-11-05 11:30:36\", createUid: 10001, writeUid: 10001}\n    ) {\n      id\n      teacherName\n      enumType\n      petStoreId\n      professionalId\n      professional {\n        professionalName\n        id\n      }\n      readStatus\n      nonStoredField\n      createDate\n      writeDate\n      createUid\n      writeUid\n    }\n  }\n}\n","variables":{}}'
```

# 三、SSO服务端工程（5.3.X以上版本支持）

## （一）服务端工程依赖

### 1、pom 依赖

```xml
<dependency>
     <groupId>pro.shushi.pamirs.core</groupId>
     <artifactId>pamirs-sso-oauth2-server</artifactId>
</dependency>
```

### 2、application.yml 配置文件里面添加 sso 启动模块。

```yaml
pamirs:
  boot:
    modules:
      - sso
```

# 四、SSO客户端工程（5.3.X以上版本支持）

## （一）客户端工程依赖

客户端工程即需要加入 SSO 的应用

### 1、pom 依赖

```xml
<dependency>
  <groupId>pro.shushi.pamirs.core</groupId>
  <artifactId>pamirs-sso-oauth2-client</artifactId>
</dependency>
```

### 2、application.yml 配置

```yaml
pamirs:
  sso:
    enabled: true
    client:
      # SSO服务端提供
      client-id: pamirs_1fb51c50acbb4842b36844c5fbdc8d25
      # SSO服务端提供
      client-secret: B3ySNQEJdD8kZXuwmtaUtbWTo1vlIevmd0t4MIqRHfuM8VXzkMcs6YOox6cPPIESAL3yd2xQa+SCBNbLwYchQYSJonGPpvAmqapc5ZdskPicNENc8T2vTAMkc/YgvgUUK4U+/OuP5PrtRKC536nNXIZy1VHdf+whi44qOgd4RQYN0sIrog70CXsDQP3/2CHkcXWVRCqvZa/4mFmL1SBhQ+TLAIQg0jXlWr4lThUdL/X9M0YFXBaLJPKTlKi9l7K/8kTdJL2IgvSpByU0kGXjk0O/jZRBq1bHd/ZsC3Rw4kjiygIdxfL7Q/lw1/WAZ5XXibc5dlylUsnSJBZ9I4ZeCWq7lEZj//ctR7WZJCCeqi8rmCu+N2FQvye7kgiFIoZTFMNSRhW7ZMBBrsoJuf6DGWGvXvBE9w3P/IVFJMDmsopNbbFYTRcmY5e5tc775OCGMQDrW6j8IitTrOdRYzie0S2Jj9+Xw+Va1sEQLXWj0tBNQ9Tzv7fnRr5D6EBNtXra1TntKrvH/quBI5ujncBZXZ2cfEoMjFSw38edoTA8WPJv10WUA5EZsvfxqJLEiXFriJ9nleUBbCvL3Zuggn64CW4cH8mxGk7qvHQvXmwmp8phKyoKa8UDfDD2x7eNW3oNcQUMz+gdGNF5dNXt4iArpYK5/xktpLxdCM5Yz7SpHoc=
      # login-url和login-url根据实际情况修改
      login-url: http://test1.oinone.top:9095/login
      logout-url: https://test1.oinone.top:9095/pamirs/sso/logout
      expires:
        expires-in: 72000 #单位秒
        refresh-token-expires-in: 72000 #单位秒
```

