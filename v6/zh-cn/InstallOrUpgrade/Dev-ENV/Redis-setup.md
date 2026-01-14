---
title: Redis安装与注意事项
index: true
category:
  - 安装与升级
  - 环境准备
order: 3

---
# 一、下载安装包
安装包下载地址

|  | 下载链接 |
| --- | --- |
| Linux | https://github.com/redis/redis/archive/refs/tags/.tar.gz |
| macOS | https://github.com/redis/redis/archive/refs/tags/.tar.gz |
| Windows | https://github.com/tporadowski/redis/releases |




:::warning 提示

Windows 系统没有 Redis 官方版本，当前提供的下载链接为社区维护的非官方版本。
对于 Linux 和 macOS 用户，在下载时需将链接中的 `<version>` 替换为实际的版本号。以 7.4.2 为例，下载链接为：
[https://github.com/redis/redis/archive/refs/tags/7.4.2.tar.gz](https://github.com/redis/redis/archive/refs/tags/7.4.2.tar.gz)

:::

# 二、安装
## （一）Linux、macOS安装
### 1、下载
```shell
curl -L https://github.com/redis/redis/archive/refs/tags/7.4.2.tar.gz -o redis-7.4.2.tar.gz
```

### 2、解压缩
```shell
tar zxvf redis-7.4.2.tar.gz -C ./
```

### 3、编译安装
```shell
# 编译
export REDIS_HOME=<替换为redis安装目录>
make PREFIX=${REDIS_HOME}
# 安装
make PREFIX=${REDIS_HOME} install
```

### 4、验证
命令行中输入

```shell
${REDIS_HOME}/bin/redis-server --version
```

输出，类似信息即为安装成功

```shell
Redis server v=7.4.2 sha=00000000:1 malloc=libc bits=64 build=2e82a5cbb28cb878
```

## （二）Windows安装
### 1、下载
```shell
Invoke-WebRequest -Uri "https://github.com/tporadowski/redis/releases/download/v5.0.14.1/Redis-x64-5.0.14.1.zip" -OutFile "Redis-x64-5.0.14.1.zip"
```

### 2、解压
可视化工具或者使用如下命令解压

```shell
# Windows
Expand-Archive Redis-x64-5.0.14.1.zip <Redis安装目录>\redis
```

## （三）配置
Linux/macOS安装参考配置，Windows版本可忽略

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

## （四）运行
### 1、启动
```properties
# Linux/macOS
nohup ./bin/redis-server redis.conf >> redis.nohup 2>&1 &
```

```shell
# Windows
Start-Process -FilePath ".\redis-server.exe" -WindowStyle Hidden
```

### 2、停止
```properties
# Linux/macOS
./bin/redis-cli -p 6379 shutdown
```

```shell
# Windows
.\redis-cli.exe -p 6379 shutdown
```





