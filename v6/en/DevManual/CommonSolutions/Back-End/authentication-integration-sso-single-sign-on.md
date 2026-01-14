---
title: Authentication Integration:Single Sign-On (SSO)
index: true
category:
  - Common Solutions
order: 66
---
# I. SSO-Related

## (Ⅰ) SSO Server-side Operations
In the application system, locate the [Single Sign-On] functional module and create an application identifier within this module. This application identifier will serve as the unique identification symbol for the application in the SSO system, used for subsequent authentication and authorization processes.

## (Ⅱ) SSO Login Authentication Operations
When performing SSO login authentication, the `grant_type=password` authentication method should be adopted, and the username and password information should be included in the request. The specific request link is as follows (using the POST request method):

```plain
http://127.0.0.1:8190/pamirs/sso/authorize?redirect_uri=http://127.0.0.1:8193/page;module=ysps;model=ysps.notify.ProjectPosting;action=homepage;scene=homepage;target=OPEN_WINDOW;path=/ysps/homepage&response_type=code&client_id=Replace with the created application unique identifier&grant_type=password&username=admin&password=admin
```

The meanings of each parameter in the above link are as follows:

+ **redirect_uri**: This parameter specifies the target address to which the user will be redirected after successful authentication. In the current scenario, this parameter can be temporarily ignored without special configuration.
+ **client_id**: This parameter must be replaced with the application unique identifier created on the [Single Sign-On] page. This identifier is used to clarify the identity of the application initiating the authentication request to the SSO server and is a key information for achieving accurate authentication and authorization.
+ **grant_type**: The authentication method is set to `grant_type=password`, which is a fixed configuration, indicating the adoption of a username and password-based authentication mechanism. The actual username and password information should follow immediately to complete the identity verification process.

# II. Operation Steps:
Request SSO login authentication from the server-side project, which will return token information. You can use this information to access the client-side project.

1. Request the server-side project to return token information:

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

2. Initiate a client-side project request. Note: The token parameter information needs to be carried in the request Headers. The token is the token information returned by the server-side project, and the Authorization parameter needs to add the identifier Bearer + space when requesting.

```shell
curl --location --request POST 'http://127.0.0.1:8092/pamirs/base' \
--header 'loginType: OAUTH' \
--header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE3NDQyMDYwNjUsInN1YiI6IntcImNsaWVudElkXCI6XCJwYW1pcnNfMjc5YjcwMDBlNDE3NDMxMmFmNDAyMDM0YjhlZjFhOWRcIixcInJhbmRvbUFrSWRcIjpcImEzZWZkNjZkMDNlNjQ5MDY4OGU4Y2FhYmIwNjZmZGU4XCIsXCJvcGVuSWRcIjpcIjEwMDAxXCJ9In0.gapCpvM8PCit1oSHv-zJ2tATkCuVQBzqWGebvBcUX2O0bqP9aAhVqQxdNLM19vCqP5s3CXoNk-xzMUu-mo-hSg' \
--header 'User-Agent: Apifox/1.0.0 (https://apifox.com)' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"mutation {\n  teacherMutation {\n    queryTea(\n      data: {id: 672564120180166836, teacherName: \"`````\", readStatus: NO_READ, createDate: \"2024-11-05 11:30:36\", writeDate: \"2024-11-05 11:30:36\", createUid: 10001, writeUid: 10001}\n    ) {\n      id\n      teacherName\n      enumType\n      petStoreId\n      professionalId\n      professional {\n        professionalName\n        id\n      }\n      readStatus\n      nonStoredField\n      createDate\n      writeDate\n      createUid\n      writeUid\n    }\n  }\n}\n","variables":{}}'
```

# III. SSO Server-side Project (Supported by Version 5.3.X and Above)

## (Ⅰ) Server-side Project Dependencies

### 1. pom Dependencies

```xml
<dependency>
     <groupId>pro.shushi.pamirs.core</groupId>
     <artifactId>pamirs-sso-oauth2-server</artifactId>
</dependency>
```

### 2. Add the sso startup module to the application.yml configuration file.

```yaml
pamirs:
  boot:
    modules:
      - sso
```

# IV. SSO Client-side Project (Supported by Version 5.3.X and Above)

## (Ⅰ) Client-side Project Dependencies
The client-side project is the application that needs to join SSO.

### 1. pom Dependencies

```xml
<dependency>
  <groupId>pro.shushi.pamirs.core</groupId>
  <artifactId>pamirs-sso-oauth2-client</artifactId>
</dependency>
```

### 2. application.yml Configuration

```yaml
pamirs:
  sso:
    enabled: true
    client:
      # Provided by the SSO server
      client-id: pamirs_1fb51c50acbb4842b36844c5fbdc8d25
      # Provided by the SSO server
      client-secret: B3ySNQEJdD8kZXuwmtaUtbWTo1vlIevmd0t4MIqRHfuM8VXzkMcs6YOox6cPPIESAL3yd2xQa+SCBNbLwYchQYSJonGPpvAmqapc5ZdskPicNENc8T2vTAMkc/YgvgUUK4U+/OuP5PrtRKC536nNXIZy1VHdf+whi44qOgd4RQYN0sIrog70CXsDQP3/2CHkcXWVRCqvZa/4mFmL1SBhQ+TLAIQg0jXlWr4lThUdL/X9M0YFXBaLJPKTlKi9l7K/8kTdJL2IgvSpByU0kGXjk0O/jZRBq1bHd/ZsC3Rw4kjiygIdxfL7Q/lw1/WAZ5XXibc5dlylUsnSJBZ9I4ZeCWq7lEZj//ctR7WZJCCeqi8rmCu+N2FQvye7kgiFIoZTFMNSRhW7ZMBBrsoJuf6DGWGvXvBE9w3P/IVFJMDmsopNbbFYTRcmY5e5tc775OCGMQDrW6j8IitTrOdRYzie0S2Jj9+Xw+Va1sEQLXWj0tBNQ9Tzv7fnRr5D6EBNtXra1TntKrvH/quBI5ujncBZXZ2cfEoMjFSw38edoTA8WPJv10WUA5EZsvfxqJLEiXFriJ9nleUBbCvL3Zuggn64CW4cH8mxGk7qvHQvXmwmp8phKyoKa8UDfDD2x7eNW3oNcQUMz+gdGNF5dNXt4iArpYK5/xktpLxdCM5Yz7SpHoc=
      # Modify the login-url and logout-url according to the actual situation
      login-url: http://test1.oinone.top:9095/login
      logout-url: https://test1.oinone.top:9095/pamirs/sso/logout
      expires:
        expires-in: 72000 # Unit: second
        refresh-token-expires-in: 72000 # Unit: second
```