---
title: Redis Installation and Precautions
index: true
category:
  - Installation and Upgrade
  - Environment Preparation
order: 3

---
# 一、Download Installation Package
Installation package download address  

|  | Download Link |
| --- | --- |
| Linux | https://github.com/redis/redis/archive/refs/tags/.tar.gz |
| macOS | https://github.com/redis/redis/archive/refs/tags/.tar.gz |
| Windows | https://github.com/tporadowski/redis/releases |




:::warning Tip

There is no official version of Redis for Windows systems, and the provided download link is a community-maintained unofficial version.  
For Linux and macOS users, replace `<version>` in the link with the actual version number when downloading. Taking 7.4.2 as an example, the download link is:  
[https://github.com/redis/redis/archive/refs/tags/7.4.2.tar.gz](https://github.com/redis/redis/archive/refs/tags/7.4.2.tar.gz)

:::

# 二、Installation
## （一）Linux/macOS Installation
### 1、Download
```shell
curl -L https://github.com/redis/redis/archive/refs/tags/7.4.2.tar.gz -o redis-7.4.2.tar.gz
```

### 2、Unzip
```shell
tar zxvf redis-7.4.2.tar.gz -C ./
```

### 3、Compile and Install
```shell
# Compile
export REDIS_HOME=<replace with Redis installation directory>
make PREFIX=${REDIS_HOME}
# Install
make PREFIX=${REDIS_HOME} install
```

### 4、Verification
Enter in the command line  

```shell
${REDIS_HOME}/bin/redis-server --version
```

Output similar information indicates successful installation  

```shell
Redis server v=7.4.2 sha=00000000:1 malloc=libc bits=64 build=2e82a5cbb28cb878
```

## （二）Windows Installation
### 1、Download
```shell
Invoke-WebRequest -Uri "https://github.com/tporadowski/redis/releases/download/v5.0.14.1/Redis-x64-5.0.14.1.zip" -OutFile "Redis-x64-5.0.14.1.zip"
```

### 2、Unzip
Use a visualization tool or the following command to unzip  

```shell
# Windows
Expand-Archive Redis-x64-5.0.14.1.zip <Redis installation directory>\redis
```

## （三）Configuration
Reference configuration for Linux/macOS installation (Windows version can be ignored)  

```properties
# redis.conf
bind * -::*
port 6379
timeout 0
logfile "redis_log.log"
dbfilename dump.rdb
appendonly no
appendfilename "appendonly.aof"
```

## （四）Run
### 1、Start
```properties
# Linux/macOS
nohup ./bin/redis-server redis.conf >> redis.nohup 2>&1 &
```

```shell
# Windows
Start-Process -FilePath ".\redis-server.exe" -WindowStyle Hidden
```

### 2、Stop
```properties
# Linux/macOS
./bin/redis-cli -p 6379 shutdown
```

```shell
# Windows
.\redis-cli.exe -p 6379 shutdown
```